import { useState } from 'react';
import type { Package, DurationType } from '../../services/packageService';
import { Plus, Edit2, ShieldCheck, ShieldAlert, Award, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PackagesTabProps {
  packages: Package[];
  onAddPackage: (pkg: Omit<Package, 'id'>) => Promise<void>;
  onUpdatePackage: (id: number, pkg: Partial<Package>) => Promise<void>;
  actionLoading: boolean;
}

export function PackagesTab({ packages, onAddPackage, onUpdatePackage, actionLoading }: PackagesTabProps) {
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingPkg, setEditingPkg] = useState<Package | null>(null);

  // Form fields state
  const [name, setName] = useState('');
  const [duration, setDuration] = useState<DurationType>('ONE_YEAR');
  const [limit, setLimit] = useState(1);
  const [price, setPrice] = useState(15000);
  const [extraPrice, setExtraPrice] = useState(5000);
  const [features, setFeatures] = useState('');
  const [isActive, setIsActive] = useState(true);

  const openAddModal = () => {
    setEditingPkg(null);
    setName('');
    setDuration('ONE_YEAR');
    setLimit(1);
    setPrice(15000);
    setExtraPrice(5000);
    setFeatures('');
    setIsActive(true);
    setShowModal(true);
  };

  const openEditModal = (pkg: Package) => {
    setEditingPkg(pkg);
    setName(pkg.packageName);
    setDuration(pkg.durationType);
    setLimit(pkg.baseDoctorLimit);
    setPrice(pkg.packagePrice);
    setExtraPrice(pkg.extraDoctorPrice);
    setFeatures(pkg.features || '');
    setIsActive(pkg.active);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      packageName: name,
      durationType: duration,
      baseDoctorLimit: limit,
      packagePrice: price,
      extraDoctorPrice: extraPrice,
      features,
      active: isActive
    };

    if (editingPkg) {
      await onUpdatePackage(editingPkg.id, payload);
    } else {
      await onAddPackage(payload);
    }

    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top action block */}
      <div className="flex justify-between items-center bg-slate-900/40 p-4 rounded-2xl border border-white/5">
        <div>
          <h3 className="text-lg font-semibold text-white">Pricing & Plans</h3>
          <p className="text-xs text-gray-400">Add, edit, or configure membership subscription options.</p>
        </div>
        <Button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg hover:shadow-orange-500/20 text-white border-0"
        >
          <Plus className="w-4 h-4" /> 
          <span>Create Package</span>
        </Button>
      </div>

      {/* Grid of packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-slate-900/60 border ${
              pkg.active ? 'border-white/5' : 'border-red-500/20 bg-red-950/[0.02]'
            } hover:border-orange-500/30 p-6 rounded-2xl flex flex-col justify-between transition-all group duration-300`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-orange-400">
                    <Award className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-white">{pkg.packageName}</h4>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-bold mt-0.5">{pkg.durationType}</span>
                  </div>
                </div>
                <button
                  onClick={() => openEditModal(pkg)}
                  className="p-2 rounded-xl bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Edit Plan"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Price Tag */}
              <div className="my-5 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                <div className="text-2xl font-bold text-white">
                  ₹{Number(pkg.packagePrice).toLocaleString()}
                  <span className="text-xs text-gray-500 font-normal"> / base plan</span>
                </div>
                <div className="text-xs text-gray-400 mt-2 flex justify-between">
                  <span>Base Doctor Limit:</span>
                  <span className="text-white font-semibold">{pkg.baseDoctorLimit} Dr.</span>
                </div>
                <div className="text-xs text-gray-400 mt-1 flex justify-between">
                  <span>Prorated Extra Doctor:</span>
                  <span className="text-white font-semibold">₹{Number(pkg.extraDoctorPrice).toLocaleString()}/yr</span>
                </div>
              </div>

              {/* Features List */}
              {pkg.features && (
                <div className="space-y-2 mt-4">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <FileText className="w-3 h-3 text-orange-400" />
                    <span>Included Features</span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1.5 pl-1.5">
                    {pkg.features.split(',').map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                        <span>{feat.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Status bar */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
              <span>ID: #{pkg.id}</span>
              {pkg.active ? (
                <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                  <ShieldCheck className="w-3 h-3" /> Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 font-medium">
                  <ShieldAlert className="w-3 h-3" /> Inactive
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Creator/Editor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <form onSubmit={handleSubmit} className="relative z-10 bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-2xl max-w-lg w-full">
            <h3 className="text-lg font-bold text-white mb-1">
              {editingPkg ? 'Edit Subscription Package' : 'Create Subscription Package'}
            </h3>
            <p className="text-xs text-gray-400 mb-5">Configure subscription plan properties & pricing rules.</p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pkg-name" className="text-xs font-semibold text-gray-400 uppercase">Package Name</Label>
                <Input
                  id="pkg-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-white"
                  placeholder="Premium Enterprise Plan"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-xs font-semibold text-gray-400 uppercase">Billing Duration</Label>
                  <Select value={duration} onValueChange={(value) => setDuration(value as DurationType)}>
                    <SelectTrigger id="duration" className="w-full text-white">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MONTHLY">MONTHLY</SelectItem>
                      <SelectItem value="QUARTERLY">QUARTERLY</SelectItem>
                      <SelectItem value="SIX_MONTH">SIX_MONTH</SelectItem>
                      <SelectItem value="ONE_YEAR">ONE_YEAR</SelectItem>
                      <SelectItem value="TWO_YEAR">TWO_YEAR</SelectItem>
                      <SelectItem value="LIFETIME">LIFETIME</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limit" className="text-xs font-semibold text-gray-400 uppercase">Base Doctor Limit</Label>
                  <Input
                    id="limit"
                    type="number"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="text-white"
                    min={1}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-xs font-semibold text-gray-400 uppercase">Base Plan Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="text-white"
                    min={0}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="extraPrice" className="text-xs font-semibold text-gray-400 uppercase">Extra Doctor Cost (₹/yr)</Label>
                  <Input
                    id="extraPrice"
                    type="number"
                    value={extraPrice}
                    onChange={(e) => setExtraPrice(Number(e.target.value))}
                    className="text-white"
                    min={0}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="features" className="text-xs font-semibold text-gray-400 uppercase">Features Description</Label>
                <Textarea
                  id="features"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  className="h-20 text-white resize-none"
                  placeholder="E.g., High-speed prescription printing, Clinic-wide reports, Custom prescription header templates"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">Separate multiple features by comma (`,`).</span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  id="pkg-active"
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4.5 h-4.5 rounded border-white/10 text-orange-500 focus:ring-orange-500 bg-slate-950 focus:ring-offset-slate-900"
                />
                <label htmlFor="pkg-active" className="text-xs font-semibold text-gray-400 uppercase cursor-pointer select-none">
                  Available for new signups
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 border-t border-white/5 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
                disabled={actionLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={actionLoading}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow hover:opacity-95 border-0"
              >
                {editingPkg ? 'Save Changes' : 'Create Package'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
