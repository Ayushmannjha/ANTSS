import { useState } from 'react';
import { Building2, Plus, Edit2, MapPin, Phone, Mail } from 'lucide-react';
import { type Hospital } from '../../services/userService';
import HospitalModal from './HospitalModal';

interface HospitalTabProps {
  hospitals: Hospital[];
  token: string;
  onHospitalsUpdate: (hospitals: Hospital[]) => void;
}

const renderStatusBadge = (status?: string) => {
  if (status === 'APPROVED' || status === 'ACTIVE') {
    return <span className="text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">APPROVED</span>;
  }
  if (status === 'REJECTED') {
    return <span className="text-red-400 font-medium bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">REJECTED</span>;
  }
  return <span className="text-amber-400 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase">Pending Approval</span>;
};

export default function HospitalTab({ hospitals, token, onHospitalsUpdate }: HospitalTabProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);

  const openAddModal = () => {
    setEditingHospital(null);
    setShowModal(true);
  };

  const openEditModal = (hospital: Hospital) => {
    setEditingHospital(hospital);
    setShowModal(true);
  };

  const handleSaveSuccess = (updatedHospital: Hospital, isNew: boolean) => {
    if (isNew) {
      onHospitalsUpdate([...hospitals, updatedHospital]);
    } else {
      onHospitalsUpdate(hospitals.map((h) => (h.id === updatedHospital.id ? updatedHospital : h)));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Registered Hospitals</h3>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-4 py-2 rounded-lg font-medium text-sm transition-all text-white"
        >
          <Plus className="w-4 h-4" /> Add Hospital
        </button>
      </div>

      {hospitals.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-white/5">
          <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No hospitals added yet. Create one now!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hospitals.map((hosp) => (
            <div key={hosp.id} className="bg-slate-900/60 border border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-orange-500/30 transition-colors">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-lg text-white">{hosp.hospitalName}</h4>
                  <button
                    onClick={() => openEditModal(hosp)}
                    className="p-1.5 rounded-lg bg-slate-800 text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-400">
                  {hosp.mobileNumber && (
                    <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-orange-400" /> {hosp.mobileNumber}</div>
                  )}
                  {hosp.email && (
                    <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-orange-400" /> {hosp.email}</div>
                  )}
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span>{hosp.addressLine1 || 'No address'}, {hosp.city}, {hosp.state} {hosp.pincode}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-gray-500">Allowed Doctors Limit: {hosp.maxDoctorLimit ?? '-'}</span>
                {renderStatusBadge(hosp.status)}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <HospitalModal
          token={token}
          editingHospital={editingHospital}
          onClose={() => setShowModal(false)}
          onSuccess={handleSaveSuccess}
        />
      )}
    </div>
  );
}
