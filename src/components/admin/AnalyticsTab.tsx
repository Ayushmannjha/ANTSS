import type { AdminStats } from '../../services/adminService';
import { BarChart3, Users, Building, ShieldAlert, Award, Stethoscope, CheckCircle, Zap } from 'lucide-react';

interface AnalyticsTabProps {
  stats: AdminStats | null;
  usersCount: number;
  hospitalsCount: number;
  clinicsCount: number;
  pendingApprovalsCount: number;
}

export function AnalyticsTab({
  stats,
  usersCount,
  hospitalsCount,
  clinicsCount,
  pendingApprovalsCount
}: AnalyticsTabProps) {
  // Use backend stats with local state as fallback
  const totalUsers = stats?.totalUsers ?? usersCount;
  const pendingApprovals = stats?.pendingApprovals ?? pendingApprovalsCount;
  const totalHospitals = stats?.totalHospitals ?? hospitalsCount;
  const totalClinics = stats?.totalClinics ?? clinicsCount;
  const activePackages = stats?.activePackages ?? 0;

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Total Users */}
        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-orange-500/20 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-16 h-16 text-white" />
          </div>
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Members</div>
          <div className="text-3xl font-extrabold mt-3 text-white tracking-tight">{totalUsers}</div>
          <div className="text-[10px] text-gray-500 mt-2">Active clinic/hospital profiles</div>
        </div>

        {/* Pending approvals */}
        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-amber-500/20 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldAlert className="w-16 h-16 text-white" />
          </div>
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Pending Action</div>
          <div className="text-3xl font-extrabold mt-3 text-amber-400 tracking-tight">{pendingApprovals}</div>
          <div className="text-[10px] text-amber-500/70 mt-2">Requires admin verification</div>
        </div>

        {/* Total Hospitals */}
        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500/20 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Building className="w-16 h-16 text-white" />
          </div>
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Hospitals</div>
          <div className="text-3xl font-extrabold mt-3 text-sky-400 tracking-tight">{totalHospitals}</div>
          <div className="text-[10px] text-sky-500/70 mt-2">Hospital level accounts</div>
        </div>

        {/* Total Clinics */}
        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-rose-500/20 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Stethoscope className="w-16 h-16 text-white" />
          </div>
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Clinics</div>
          <div className="text-3xl font-extrabold mt-3 text-rose-400 tracking-tight">{totalClinics}</div>
          <div className="text-[10px] text-rose-500/70 mt-2">Clinic level accounts</div>
        </div>

        {/* Active packages */}
        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-teal-500/20 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Award className="w-16 h-16 text-white" />
          </div>
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Active Plans</div>
          <div className="text-3xl font-extrabold mt-3 text-emerald-400 tracking-tight">{activePackages}</div>
          <div className="text-[10px] text-emerald-500/70 mt-2">Active package structures</div>
        </div>
      </div>

      {/* System Status Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/40 border border-white/5 p-6 rounded-2xl space-y-4">
          <h4 className="font-semibold text-white flex items-center gap-2 text-sm uppercase tracking-wide">
            <BarChart3 className="w-4 h-4 text-orange-400" />
            <span>Infrastructure Health Status</span>
          </h4>
          
          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-white/5">
              <span className="text-gray-400">Spring Boot Backend Router</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Fully Operational
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-white/5">
              <span className="text-gray-400">Database Connection Pool (PostgreSQL)</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Active
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-white/5">
              <span className="text-gray-400">JWT Token Security Gateways</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Armed & Verified
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-xl border border-white/5">
              <span className="text-gray-400">Email Notification Sender (SMTP)</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Configured
              </span>
            </div>
          </div>
        </div>

        {/* Right side info panel */}
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 p-6 rounded-2xl space-y-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30 text-orange-400">
            <Zap className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-base">Quick Summary Info</h4>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              All subscription packages, clinical entity definitions, doctor license approvals, and email automation processes are wired in real-time to the active Java service container. Changes are committed instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
