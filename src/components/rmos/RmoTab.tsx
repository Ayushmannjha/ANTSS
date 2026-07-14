import { useState } from 'react';
import { BadgeCheck, Edit2, Mail, Phone, Plus, UserRoundCog } from 'lucide-react';
import { type Clinic, type Hospital, type Rmo } from '../../services/userService';
import RmoModal from './RmoModal';

interface RmoTabProps {
  rmos: Rmo[];
  hospitals: Hospital[];
  clinics: Clinic[];
  token: string;
  onRmosUpdate: (rmos: Rmo[]) => void;
}

const renderStatusBadge = (status?: string) => {
  if (status === 'APPROVED' || status === 'ACTIVE') {
    return <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-400">ACTIVE</span>;
  }
  if (status === 'REJECTED' || status === 'INACTIVE') {
    return <span className="rounded border border-red-500/20 bg-red-500/10 px-2 py-0.5 font-medium text-red-400">{status}</span>;
  }
  return <span className="rounded border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 font-medium uppercase text-amber-400">Pending</span>;
};

export default function RmoTab({ rmos, hospitals, clinics, token, onRmosUpdate }: RmoTabProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingRmo, setEditingRmo] = useState<Rmo | null>(null);

  const openAddModal = () => {
    setEditingRmo(null);
    setShowModal(true);
  };

  const openEditModal = (rmo: Rmo) => {
    setEditingRmo(rmo);
    setShowModal(true);
  };

  const handleSaveSuccess = (savedRmo: Rmo, isNew: boolean) => {
    onRmosUpdate(isNew ? [...rmos, savedRmo] : rmos.map((rmo) => rmo.id === savedRmo.id ? savedRmo : rmo));
  };

  const facilityName = (rmo: Rmo) => {
    if (rmo.hospitalId) return hospitals.find((item) => item.id === rmo.hospitalId)?.hospitalName ?? `Hospital #${rmo.hospitalId}`;
    if (rmo.clinicId) return clinics.find((item) => item.id === rmo.clinicId)?.clinicName ?? `Clinic #${rmo.clinicId}`;
    return 'Unassigned';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">RMO & Staff Members</h3>
        <button onClick={openAddModal} className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:from-orange-600 hover:to-red-600">
          <Plus className="h-4 w-4" /> Add RMO / Staff
        </button>
      </div>

      {rmos.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-slate-900/40 py-12 text-center">
          <UserRoundCog className="mx-auto mb-3 h-12 w-12 text-gray-600" />
          <p className="text-sm text-gray-400">No RMO or staff members added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rmos.map((rmo) => (
            <div key={rmo.id} className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition-colors hover:border-orange-500/30">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{rmo.rmoName}</h4>
                    <p className="mt-1 text-xs font-medium text-orange-400">{rmo.role.replace('_', ' ')}</p>
                  </div>
                  <button onClick={() => openEditModal(rmo)} aria-label={`Edit ${rmo.rmoName}`} className="rounded-lg bg-slate-800 p-1.5 text-gray-400 transition-colors hover:text-white">
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-orange-400" /> {rmo.email}</div>
                  {rmo.mobileNumber && <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-orange-400" /> {rmo.mobileNumber}</div>}
                  <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-orange-400" /> {facilityName(rmo)}</div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-3 text-xs">
                <span className="text-gray-500">Employee: {rmo.employeeCode}</span>
                {renderStatusBadge(rmo.status)}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <RmoModal token={token} hospitals={hospitals} clinics={clinics} editingRmo={editingRmo} onClose={() => setShowModal(false)} onSuccess={handleSaveSuccess} />
      )}
    </div>
  );
}
