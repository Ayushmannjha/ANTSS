import { useState } from 'react';
import type { AdminUserResponse } from '../../services/adminService';
import { Search, Check, X, ShieldAlert, Clock, Mail, Phone, MapPin, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UserRequestsTabProps {
  users: AdminUserResponse[];
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
  actionLoading: boolean;
}

export function UserRequestsTab({ users, onApprove, onReject, actionLoading }: UserRequestsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const pendingUsers = users.filter(u => u.status === 'PENDING');

  const filteredUsers = pendingUsers.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.entityName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-white/5">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pending requests..."
            className="w-full pl-10 pr-4 text-white"
          />
        </div>
        <div className="text-sm text-gray-400 bg-slate-950/40 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Pending Approvals: <strong className="text-white">{filteredUsers.length}</strong></span>
        </div>
      </div>

      {/* Grid List */}
      {filteredUsers.length === 0 ? (
        <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mx-auto mb-4 border border-white/5">
            <ShieldAlert className="w-6 h-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-white mb-1">No Pending Requests</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            There are currently no registration requests awaiting administrative approval.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredUsers.map((u) => (
            <div
              key={u.id}
              className="bg-slate-900/60 border border-white/5 hover:border-white/10 p-6 rounded-2xl flex flex-col justify-between transition-all group hover:translate-y-[-2px] duration-300 relative overflow-hidden"
            >
              {/* Decorative top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20" />

              <div>
                {/* Header: Name and UserType */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-base text-white group-hover:text-orange-400 transition-colors">
                      {u.fullName}
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                        {u.userType}
                      </span>
                      {u.entityName && (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                          <Building className="w-3 h-3" /> {u.entityName}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 bg-slate-950 px-2.5 py-1 rounded-lg border border-white/5">
                    New Request
                  </span>
                </div>

                {/* Contact & Address details */}
                <div className="space-y-2.5 my-4 pt-3 border-t border-white/5 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <span className="truncate">{u.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <span>{u.mobileNumber}</span>
                  </div>
                  {u.city && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        {u.addressLine1 ? `${u.addressLine1}, ` : ''}
                        {u.city}, {u.state} {u.pincode}
                      </span>
                    </div>
                  )}
                  {u.allowedDoctors && (
                    <div className="flex items-center gap-2 pt-1.5 border-t border-white/5">
                      <span className="text-gray-500">Requested Doctors:</span>
                      <strong className="text-white font-semibold">{u.allowedDoctors}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/5">
                <Button
                  onClick={() => onReject(u.id)}
                  disabled={actionLoading}
                  variant="destructive"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </Button>
                <Button
                  onClick={() => onApprove(u.id)}
                  disabled={actionLoading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm border-0"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
