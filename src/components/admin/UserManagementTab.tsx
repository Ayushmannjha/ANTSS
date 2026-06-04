import { useState } from 'react';
import type { AdminUserResponse } from '../../services/adminService';
import type { Package } from '../../services/packageService';
import { Search, ShieldCheck, Edit, Calendar, Ban, CheckCircle, Mail, Phone, Building } from 'lucide-react';
import SubscriptionSummaryModal from '../subscriptions/SubscriptionSummaryModal';
import { isSubscriptionValid, getRemainingDoctorSlots } from '../../services/subscriptionService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserManagementTabProps {
  users: AdminUserResponse[];
  packages: Package[];
  token: string;
  onBlock: (id: string) => Promise<void>;
  onUnblock: (id: string) => Promise<void>;
  onModifyPackage: (id: string, packageId: number) => Promise<void>;
  onExtendValidity: (id: string, days: number) => Promise<void>;
  actionLoading: boolean;
}

export function UserManagementTab({
  users,
  packages,
  token,
  onBlock,
  onUnblock,
  onModifyPackage,
  onExtendValidity,
  actionLoading
}: UserManagementTabProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedUser, setSelectedUser] = useState<AdminUserResponse | null>(null);
  const [showPkgModal, setShowPkgModal] = useState(false);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [showSummaryFor, setShowSummaryFor] = useState<string | null>(null);
  const [checkingUserId, setCheckingUserId] = useState<string | null>(null);
  const [userValidityMap, setUserValidityMap] = useState<Record<string, boolean | null>>({});
  const [userRemainingSlotsMap, setUserRemainingSlotsMap] = useState<Record<string, number | null>>({});

  // Form states
  const [selectedPkgId, setSelectedPkgId] = useState<number>(0);
  const [extendDays, setExtendDays] = useState<number>(30);

  // Filter out pending and administrators
  const registeredUsers = users.filter(u => u.status !== 'PENDING');

  const filteredUsers = registeredUsers.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.entityName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openPkgModal = (user: AdminUserResponse) => {
    setSelectedUser(user);
    setSelectedPkgId(packages[0]?.id || 0);
    setShowPkgModal(true);
  };

  const openExtendModal = (user: AdminUserResponse) => {
    setSelectedUser(user);
    setExtendDays(30);
    setShowExtendModal(true);
  };

  const openSummary = (userId: string) => {
    // debug: log so we can see click activity in browser console
    // this helps diagnose when the modal doesn't open
    // eslint-disable-next-line no-console
    console.log('[Admin] openSummary clicked for', userId);
    setShowSummaryFor(userId);
  };

  const handlePkgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !selectedPkgId) return;
    await onModifyPackage(selectedUser.id, selectedPkgId);
    setShowPkgModal(false);
    setSelectedUser(null);
  };

  const handleExtendSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !extendDays || extendDays <= 0) return;
    await onExtendValidity(selectedUser.id, extendDays);
    setShowExtendModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-white/5">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search registered users..."
            className="w-full pl-10 pr-4 text-white"
          />
        </div>
        <div className="text-xs text-gray-400 bg-slate-950/40 px-3.5 py-2 rounded-xl border border-white/5">
          Showing {filteredUsers.length} of {registeredUsers.length} users
        </div>
      </div>

      {/* Table / List */}
      <div className="bg-slate-900/60 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-slate-950/60 text-xs font-semibold uppercase text-gray-400">
                <th className="p-4">Name / Contacts</th>
                <th className="p-4">Entity Type</th>
                <th className="p-4">Subscription Status</th>
                <th className="p-4">Doctors Limit</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500">
                    No matching users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-white">{u.fullName}</div>
                      <div className="flex flex-col gap-0.5 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-gray-600" /> {u.email}</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-gray-600" /> {u.mobileNumber}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-white flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-orange-500/80" />
                        {u.entityName || 'Individual'}
                      </div>
                      <span className="inline-block mt-1 text-[9px] uppercase font-bold tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/10">
                        {u.userType}
                      </span>
                    </td>
                    <td className="p-4">
                      {u.status === 'APPROVED' && (
                        <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full text-xs font-medium border border-emerald-500/10">
                          <ShieldCheck className="w-3.5 h-3.5" /> Active
                        </span>
                      )}
                      {u.status === 'INACTIVE' && (
                        <span className="inline-flex items-center gap-1 text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-full text-xs font-medium border border-red-500/10">
                          <Ban className="w-3.5 h-3.5" /> Blocked
                        </span>
                      )}
                      {/* Validity check result (admin) */}
                      {typeof userValidityMap[u.id] !== 'undefined' && (
                        <div className="mt-2 text-xs">
                          {userValidityMap[u.id] ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-xs font-medium">Valid</span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded text-xs font-medium">Invalid</span>
                          )}
                        </div>
                      )}
                      {u.status === 'EXPIRED' && (
                        <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full text-xs font-medium border border-amber-500/10">
                          <Calendar className="w-3.5 h-3.5" /> Expired
                        </span>
                      )}
                      {u.status === 'REJECTED' && (
                        <span className="inline-flex items-center gap-1 text-gray-400 bg-gray-500/10 px-2.5 py-0.5 rounded-full text-xs font-medium border border-white/5">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-semibold text-white">
                      {u.allowedDoctors ?? 0} Limit
                      {userRemainingSlotsMap[u.id] != null && (
                        <div className="text-xs text-gray-400 mt-1">Slots: {userRemainingSlotsMap[u.id]}</div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Modify Package */}
                        <button
                          onClick={() => openPkgModal(u)}
                          disabled={actionLoading || u.status === 'REJECTED'}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-gray-300 hover:text-white hover:bg-slate-700 transition-all text-xs font-medium flex items-center gap-1 disabled:opacity-40"
                          title="Change Package"
                        >
                          <Edit className="w-3.5 h-3.5 text-orange-400" />
                          <span>Package</span>
                        </button>

                        {/* Extend Validity */}
                        <button
                          onClick={() => openExtendModal(u)}
                          disabled={actionLoading || u.status === 'REJECTED'}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-gray-300 hover:text-white hover:bg-slate-700 transition-all text-xs font-medium flex items-center gap-1 disabled:opacity-40"
                          title="Extend validity days"
                        >
                          <Calendar className="w-3.5 h-3.5 text-teal-400" />
                          <span>Extend</span>
                        </button>

                        {/* Block/Unblock */}
                        {u.status === 'APPROVED' ? (
                          <button
                            onClick={() => onBlock(u.id)}
                            disabled={actionLoading}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                            title="Block User"
                          >
                            <Ban className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          u.status === 'INACTIVE' && (
                            <button
                              onClick={() => onUnblock(u.id)}
                              disabled={actionLoading}
                              className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                              title="Unblock User"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                          )
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <button
                          onClick={() => openSummary(u.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-gray-300 hover:text-white hover:bg-slate-700 transition-all text-xs font-medium"
                        >
                          View Summary
                        </button>

                        <button
                          onClick={async () => {
                            setCheckingUserId(u.id);
                            try {
                              const resp = await isSubscriptionValid(token, u.id);
                              setUserValidityMap(prev => ({ ...prev, [u.id]: resp.success ? !!resp.data : null }));
                              if (!resp.success) alert(resp.message || 'Failed to check validity');
                            } catch (err) {
                              console.error(err);
                              alert('Error checking validity');
                            } finally {
                              setCheckingUserId(null);
                            }
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-gray-300 hover:text-white hover:bg-slate-700 transition-all text-xs font-medium"
                        >
                          {checkingUserId === u.id ? 'Checking...' : 'Check Valid'}
                        </button>

                        <button
                          onClick={async () => {
                            try {
                              const resp = await getRemainingDoctorSlots(token, u.id);
                              setUserRemainingSlotsMap(prev => ({ ...prev, [u.id]: resp.success && typeof resp.data === 'number' ? resp.data : null }));
                              if (!resp.success) alert(resp.message || 'Failed to fetch slots');
                            } catch (err) {
                              console.error(err);
                              alert('Error fetching slots');
                            }
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-gray-300 hover:text-white hover:bg-slate-700 transition-all text-xs font-medium"
                        >
                          Slots
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Package Modifier Modal */}
      {showPkgModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowPkgModal(false)} />
          <form onSubmit={handlePkgSubmit} className="relative z-10 bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-2xl max-w-md w-full">
            <h3 className="text-lg font-bold text-white mb-1">Modify Subscription Package</h3>
            <p className="text-xs text-gray-400 mb-4">
              Select a new package plan for <strong className="text-white">{selectedUser.fullName}</strong>.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pkg-select" className="text-xs font-semibold text-gray-400 uppercase">Package Selection</Label>
                <Select value={selectedPkgId.toString()} onValueChange={(val) => setSelectedPkgId(Number(val))}>
                  <SelectTrigger id="pkg-select" className="w-full text-white">
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent>
                    {packages.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.id.toString()}>
                        {pkg.packageName} ({pkg.durationType}) — ₹{pkg.packagePrice}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 border-t border-white/5 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowPkgModal(false)}
                className="text-gray-400 hover:text-white"
                disabled={actionLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={actionLoading}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-sm font-semibold shadow hover:opacity-95 border-0"
              >
                Update Package
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Extend Validity Modal */}
      {showExtendModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowExtendModal(false)} />
          <form onSubmit={handleExtendSubmit} className="relative z-10 bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-2xl max-w-md w-full">
            <h3 className="text-lg font-bold text-white mb-1">Extend Account Validity</h3>
            <p className="text-xs text-gray-400 mb-4">
              Extend subscription validity for <strong className="text-white">{selectedUser.fullName}</strong>.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="extend-days" className="text-xs font-semibold text-gray-400 uppercase">Days to Extend</Label>
                <Input
                  id="extend-days"
                  type="number"
                  value={extendDays}
                  onChange={(e) => setExtendDays(Number(e.target.value))}
                  className="text-white animate-none"
                  min={1}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 border-t border-white/5 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowExtendModal(false)}
                className="text-gray-400 hover:text-white"
                disabled={actionLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={actionLoading}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-sm font-semibold shadow hover:opacity-95 border-0"
              >
                Extend Validity
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Admin view: subscription summary modal for a specific user */}
      {showSummaryFor && (
        <SubscriptionSummaryModal
          token={token}
          userId={showSummaryFor}
          open={!!showSummaryFor}
          onClose={() => setShowSummaryFor(null)}
        />
      )}
    </div>
  );
}
