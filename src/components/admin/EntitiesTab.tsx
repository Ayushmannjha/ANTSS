import { useState } from 'react';
import type { Hospital, Clinic } from '../../services/userService';
import { Building2, Stethoscope, Search, Mail, Phone, MapPin, Hash, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface EntitiesTabProps {
  hospitals: Hospital[];
  clinics: Clinic[];
}

export function EntitiesTab({ hospitals, clinics }: EntitiesTabProps) {
  const [hospSearch, setHospSearch] = useState('');
  const [clinicSearch, setClinicSearch] = useState('');

  const filteredHospitals = hospitals.filter(h =>
    h.hospitalName.toLowerCase().includes(hospSearch.toLowerCase()) ||
    (h.hospitalCode || '').toLowerCase().includes(hospSearch.toLowerCase()) ||
    (h.city || '').toLowerCase().includes(hospSearch.toLowerCase())
  );

  const filteredClinics = clinics.filter(c =>
    c.clinicName.toLowerCase().includes(clinicSearch.toLowerCase()) ||
    (c.clinicCode || '').toLowerCase().includes(clinicSearch.toLowerCase()) ||
    (c.city || '').toLowerCase().includes(clinicSearch.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Hospitals Section */}
      <div className="space-y-4 bg-slate-900/20 p-6 rounded-2xl border border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
            <Building2 className="w-5 h-5 text-orange-400" />
            <span>Hospitals ({filteredHospitals.length})</span>
          </h3>
          {/* Hosp Search */}
          <div className="relative max-w-xs w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Search className="w-3.5 h-3.5" />
            </span>
            <Input
              type="text"
              value={hospSearch}
              onChange={(e) => setHospSearch(e.target.value)}
              placeholder="Search hospitals..."
              className="w-full pl-9 pr-3 text-xs text-white"
            />
          </div>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {filteredHospitals.length === 0 ? (
            <div className="text-center py-12 text-xs text-gray-500 bg-slate-950/20 rounded-xl border border-white/5">
              No hospitals registered.
            </div>
          ) : (
            filteredHospitals.map(hosp => (
              <div
                key={hosp.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between text-xs space-y-3 relative overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-white">{hosp.hospitalName}</h4>
                      <span className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
                        <Hash className="w-3 h-3 text-orange-500/60" /> {hosp.hospitalCode || `ID: ${hosp.id}`}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 uppercase">
                      {hosp.status || 'ACTIVE'}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/5 text-gray-400">
                    <span className="flex items-center gap-1.5 truncate"><Mail className="w-3.5 h-3.5 text-gray-600 shrink-0" /> {hosp.email || 'No email'}</span>
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-600 shrink-0" /> {hosp.mobileNumber || 'No phone'}</span>
                    {hosp.city && (
                      <span className="flex items-start gap-1.5 sm:col-span-2 leading-relaxed">
                        <MapPin className="w-3.5 h-3.5 text-gray-600 shrink-0 mt-0.5" />
                        {hosp.addressLine1 ? `${hosp.addressLine1}, ` : ''}{hosp.city}, {hosp.state} {hosp.pincode}
                      </span>
                    )}
                  </div>
                </div>

                {/* Foot stats */}
                <div className="pt-3 border-t border-white/5 flex items-center gap-4 text-[10px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-orange-400/80" />
                    Doctors Limit: <strong className="text-white ml-0.5">{hosp.maxDoctorLimit ?? 0}</strong>
                  </span>
                  <span>•</span>
                  <span>Active Dr: <strong className="text-white">{hosp.activeDoctorCount ?? 0}</strong></span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Clinics Section */}
      <div className="space-y-4 bg-slate-900/20 p-6 rounded-2xl border border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
            <Stethoscope className="w-5 h-5 text-red-400" />
            <span>Clinics ({filteredClinics.length})</span>
          </h3>
          {/* Clinic Search */}
          <div className="relative max-w-xs w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Search className="w-3.5 h-3.5" />
            </span>
            <Input
              type="text"
              value={clinicSearch}
              onChange={(e) => setClinicSearch(e.target.value)}
              placeholder="Search clinics..."
              className="w-full pl-9 pr-3 text-xs text-white"
            />
          </div>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {filteredClinics.length === 0 ? (
            <div className="text-center py-12 text-xs text-gray-500 bg-slate-950/20 rounded-xl border border-white/5">
              No clinics registered.
            </div>
          ) : (
            filteredClinics.map(clinic => (
              <div
                key={clinic.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between text-xs space-y-3 relative overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-white">{clinic.clinicName}</h4>
                      <span className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
                        <Hash className="w-3 h-3 text-red-500/60" /> {clinic.clinicCode || `ID: ${clinic.id}`}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 uppercase">
                      {clinic.status || 'ACTIVE'}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/5 text-gray-400">
                    <span className="flex items-center gap-1.5 truncate"><Mail className="w-3.5 h-3.5 text-gray-600 shrink-0" /> {clinic.email}</span>
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-600 shrink-0" /> {clinic.mobileNumber || 'No phone'}</span>
                    {clinic.city && (
                      <span className="flex items-start gap-1.5 sm:col-span-2 leading-relaxed">
                        <MapPin className="w-3.5 h-3.5 text-gray-600 shrink-0 mt-0.5" />
                        {clinic.addressLine1 ? `${clinic.addressLine1}, ` : ''}{clinic.city}, {clinic.state} {clinic.pincode}
                      </span>
                    )}
                  </div>
                </div>

                {/* Foot stats */}
                <div className="pt-3 border-t border-white/5 flex items-center gap-4 text-[10px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-red-400/80" />
                    Doctors Limit: <strong className="text-white ml-0.5">{clinic.maxDoctorLimit ?? 0}</strong>
                  </span>
                  <span>•</span>
                  <span>Active Dr: <strong className="text-white">{clinic.activeDoctorCount ?? 0}</strong></span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
