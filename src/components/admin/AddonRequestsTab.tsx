import { useState } from 'react';
import type { DoctorAddonResponse } from '../../services/adminService';
import { Search, ShieldAlert, Check, X, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AddonRequestsTabProps {
  addons: DoctorAddonResponse[];
  onApproveAddon: (id: number) => Promise<void>;
  onRejectAddon: (id: number) => Promise<void>;
  actionLoading: boolean;
}

export function AddonRequestsTab({ addons, onApproveAddon, onRejectAddon, actionLoading }: AddonRequestsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const pendingAddons = addons.filter(addon => addon.approvalStatus === 'PENDING');

  const filteredAddons = pendingAddons.filter(addon =>
    (addon.entityName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (addon.userEmail || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    addon.userSubscriptionId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-white/5">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search addon requests..."
            className="w-full pl-10 pr-4 text-white"
          />
        </div>
        <div className="text-sm text-gray-400 bg-slate-950/40 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-orange-500" />
          <span>Pending Addons: <strong className="text-white">{filteredAddons.length}</strong></span>
        </div>
      </div>

      {/* Requests Grid */}
      {filteredAddons.length === 0 ? (
        <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mx-auto mb-4 border border-white/5">
            <ShieldAlert className="w-6 h-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-white mb-1">No Pending Addon Requests</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            There are currently no active requests for additional doctor licenses.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAddons.map((addon) => (
            <div
              key={addon.id}
              className="bg-slate-900/60 border border-white/5 hover:border-white/10 p-6 rounded-2xl flex flex-col justify-between transition-all group hover:translate-y-[-2px] duration-300 relative overflow-hidden"
            >
              {/* Top colored accent indicator */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 via-orange-600 to-red-600" />

                <div>
                {/* Header info */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-base text-white group-hover:text-orange-400 transition-colors">
                      {addon.entityName || 'Subscription Addon'}
                    </h4>
                    <div className="text-xs text-gray-400 mt-1">
                      <div>{addon.username ? `${addon.username}` : (addon.userEmail || 'Subscription owner')}</div>
                      {addon.entityType && <div className="uppercase text-[10px] mt-1 text-gray-500">Type: {addon.entityType}</div>}
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    +{addon.additionalDoctors} Doctors
                  </span>
                </div>

                {/* Sub info */}
                <div className="space-y-2.5 my-4 pt-3 border-t border-white/5 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Subscription ID:</span>
                    <span className="font-mono text-[10px] text-gray-500">{addon.userSubscriptionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Yearly Price Per Doctor:</span>
                    <span className="text-white">₹{(addon.yearlyPricePerDoctor || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining Months:</span>
                    <span className="text-white">{addon.remainingMonths} Months</span>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t border-white/5">
                    <span className="text-gray-300 font-medium">Prorated Cost (Payment Status):</span>
                    <span className="text-white font-bold text-sm">
                      ₹{(addon.prorataAmount || 0).toLocaleString()} 
                      <span className="text-[10px] ml-1 font-normal text-gray-400 bg-slate-950 px-1.5 py-0.5 rounded border border-white/5">
                        {addon.paymentStatus}
                      </span>
                    </span>
                  </div>
                  {/* Additional address/state/city info from backend */}
                  {(addon.state || addon.city || addon.address) && (
                    <div className="mt-2 text-xs text-gray-400 border-t border-white/5 pt-2">
                      {addon.address && <div className="truncate">{addon.address}</div>}
                      <div className="flex gap-2 mt-1">
                        {addon.city && <div className="uppercase text-[11px] text-gray-500">{addon.city}</div>}
                        {addon.state && <div className="uppercase text-[11px] text-gray-500">{addon.state}</div>}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/5">
                <Button
                  onClick={() => onRejectAddon(addon.id)}
                  disabled={actionLoading}
                  variant="destructive"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reject Request</span>
                </Button>
                <Button
                  onClick={() => onApproveAddon(addon.id)}
                  disabled={actionLoading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm border-0"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve & Add License</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
