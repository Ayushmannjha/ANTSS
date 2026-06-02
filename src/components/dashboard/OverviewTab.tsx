import { User, Phone, Building2, CheckCircle, Clock } from 'lucide-react';
import { type Hospital, type Clinic, type Doctor } from '../../services/userService';

interface OverviewTabProps {
  profile: any;
  hospitals: Hospital[];
  clinics: Clinic[];
  doctors: Doctor[];
  userStatus: string;
}

export default function OverviewTab({
  profile,
  hospitals,
  clinics,
  doctors,
  userStatus
}: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Account Status Card */}
      <div className="md:col-span-2 bg-slate-900/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Account Profile</h3>
          <div className="space-y-3 mt-4 text-sm">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-400 flex items-center gap-2">
                <User className="w-4 h-4 text-orange-400" /> Full Name:
              </span>
              <span className="text-white font-medium">{profile?.fullName || 'Clinic Administrator'}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-400 flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400" /> Mobile:
              </span>
              <span className="text-white font-medium">{profile?.mobileNumber || 'Not provided'}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-400 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-orange-400" /> Entity Name:
              </span>
              <span className="text-white font-medium">{profile?.entityName || 'Default Clinic'}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          {userStatus === 'APPROVED' ? (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-xl text-sm font-medium">
              <CheckCircle className="w-5 h-5" />
              <span>Approved Account</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-2 rounded-xl text-sm font-medium">
              <Clock className="w-5 h-5 animate-pulse" />
              <span>Pending Approval</span>
            </div>
          )}
        </div>
      </div>

      {/* Stat Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <h3 className="text-gray-400 text-sm uppercase tracking-widest">At A Glance</h3>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Hospitals Added:</span>
              <span className="text-2xl font-bold text-white">{hospitals.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Clinics Added:</span>
              <span className="text-2xl font-bold text-white">{clinics.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Active Doctors:</span>
              <span className="text-2xl font-bold text-white">{doctors.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
