import { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { getSubscriptionSummary } from '../../services/subscriptionService';
import type { IUserSubscriptionSummary } from '../../interfaces/IUserSubscriptionSummary';

interface Props {
  token: string;
  userId: string;
  open: boolean;
  onClose: () => void;
}

export default function SubscriptionSummaryModal({ token, userId, open, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<IUserSubscriptionSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let mounted = true;
    setLoading(true);
    setError(null);
    setSummary(null);

    getSubscriptionSummary(token, userId)
      .then((resp) => {
        if (!mounted) return;
        if (resp.success && resp.data) setSummary(resp.data as IUserSubscriptionSummary);
        else setError(resp.message ?? 'Failed to load subscription summary');
      })
      .catch((err) => {
        if (!mounted) return;
        setError(String(err));
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, [open, token, userId]);

  if (!open) return null;

  const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });
  const formatDate = (s?: string) => s ? new Date(s).toLocaleDateString() : '—';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative max-w-3xl w-full bg-slate-900/90 border border-white/10 rounded-2xl p-6 text-white z-10">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded hover:bg-white/5">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-semibold mb-4">Subscription Summary</h3>

        {loading && (
          <div className="flex items-center gap-3 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading summary...
          </div>
        )}

        {error && (
          <div className="text-sm text-rose-400">{error}</div>
        )}

        {summary && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-400">Package</div>
                <div className="text-white font-medium">{summary.packageName || '—'}</div>
              </div>
              <div>
                <div className="text-gray-400">Duration</div>
                <div className="text-white font-medium">{summary.durationType || '—'}</div>
              </div>
              <div>
                <div className="text-gray-400">Validity</div>
                <div className="text-white font-medium">{formatDate(summary.subscriptionStartDate)} to {formatDate(summary.subscriptionEndDate)}</div>
              </div>
              <div>
                <div className="text-gray-400">Days remaining</div>
                <div className="text-white font-medium">{typeof summary.daysRemaining !== 'undefined' ? summary.daysRemaining : '—'}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-400">Base package price</div>
                <div className="text-white font-medium">{typeof summary.basePackagePrice === 'number' ? currency.format(summary.basePackagePrice) : '—'}</div>
              </div>
              <div>
                <div className="text-gray-400">Extra doctor price (per year)</div>
                <div className="text-white font-medium">{typeof summary.extraDoctorPrice === 'number' ? currency.format(summary.extraDoctorPrice) : '—'}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-400">Doctors (used / allowed)</div>
                <div className="text-white font-medium">{summary.usedDoctors ?? 0} / {summary.allowedDoctors ?? 0}</div>
              </div>
              <div>
                <div className="text-gray-400">Available slots</div>
                <div className="text-white font-medium">{summary.availableDoctorSlots ?? '—'}</div>
              </div>
            </div>

            {summary.packageFeatures && (
              <div>
                <div className="text-gray-400">Package features</div>
                <div className="text-white font-medium">{summary.packageFeatures}</div>
              </div>
            )}

            <div>
              <div className="text-gray-400 mb-2">Addons</div>
              {summary.addons && summary.addons.length > 0 ? (
                <ul className="space-y-2">
                  {summary.addons.map((a, idx) => (
                    <li key={idx} className="p-3 bg-slate-800/40 rounded">
                      <div className="flex justify-between">
                        <div className="font-medium">+{a.additionalDoctors} doctors</div>
                        <div className="text-gray-400">{a.approvalStatus}</div>
                      </div>
                      <div className="text-xs text-gray-400">{formatDate(a.startDate)} → {formatDate(a.endDate)} • {typeof a.prorataAmount === 'number' ? currency.format(a.prorataAmount) : '—'}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-400">No addons</div>
              )}
            </div>

            <div>
              <div className="text-gray-400 mb-2">Allocated Doctors</div>
              {summary.allocatedDoctors && summary.allocatedDoctors.length > 0 ? (
                <ul className="space-y-2">
                  {summary.allocatedDoctors.map((d, idx) => (
                    <li key={idx} className="p-3 bg-slate-800/40 rounded">
                      <div className="font-medium">{d.doctorName}</div>
                      <div className="text-xs text-gray-400">{d.specialization} • {d.allocationType}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-400">No allocated doctors</div>
              )}
            </div>

            <div>
              <div className="text-gray-400 mb-2">Facilities</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-white font-medium">Hospitals: {summary.hospitals?.length ?? 0}</div>
                </div>
                <div>
                  <div className="text-white font-medium">Clinics: {summary.clinics?.length ?? 0}</div>
                </div>
              </div>
              {typeof summary.totalAddonCost === 'number' && (
                <div className="mt-3 text-sm text-gray-300">Total addon cost: {currency.format(summary.totalAddonCost)}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
