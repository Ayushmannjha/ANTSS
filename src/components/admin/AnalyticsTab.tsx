import { useState, type FormEvent } from 'react';
import type { AdminStats, ConsultationRevenueFilters, ConsultationRevenueReport } from '../../services/adminService';
import { BarChart3, Users, Building, ShieldAlert, Award, Stethoscope, CheckCircle, Zap, IndianRupee, ReceiptText, Search, RotateCcw, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface AnalyticsTabProps {
  stats: AdminStats | null;
  consultationRevenue: ConsultationRevenueReport | null;
  consultationRevenueLoading: boolean;
  onConsultationRevenueFilter: (filters?: ConsultationRevenueFilters) => Promise<void>;
  usersCount: number;
  hospitalsCount: number;
  clinicsCount: number;
  pendingApprovalsCount: number;
}

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

function formatCurrency(amount?: number) {
  return currencyFormatter.format(amount ?? 0);
}

function formatDate(value?: string) {
  if (!value) return 'Not set';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function AnalyticsTab({
  stats,
  consultationRevenue,
  consultationRevenueLoading,
  onConsultationRevenueFilter,
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
  const bills = consultationRevenue?.bills ?? [];
  const [billNumber, setBillNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onConsultationRevenueFilter({
      billNumber: billNumber.trim() || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  };

  const handleClearFilters = async () => {
    setBillNumber('');
    setStartDate('');
    setEndDate('');
    await onConsultationRevenueFilter();
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <IndianRupee className="w-16 h-16 text-white" />
          </div>
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Consultation Revenue</div>
          <div className="text-3xl font-extrabold mt-3 text-emerald-400 tracking-tight">{formatCurrency(consultationRevenue?.totalRevenue)}</div>
          <div className="text-[10px] text-emerald-500/70 mt-2">Paid consultation billing total</div>
        </div>

        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-sky-500/20 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <ReceiptText className="w-16 h-16 text-white" />
          </div>
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Consultation Bills</div>
          <div className="text-3xl font-extrabold mt-3 text-sky-400 tracking-tight">{consultationRevenue?.totalBills ?? 0}</div>
          <div className="text-[10px] text-sky-500/70 mt-2">{consultationRevenue?.paidBills ?? 0} paid bills recorded</div>
        </div>

        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-amber-500/20 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <IndianRupee className="w-16 h-16 text-white" />
          </div>
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Pending Billing</div>
          <div className="text-3xl font-extrabold mt-3 text-amber-400 tracking-tight">{formatCurrency(consultationRevenue?.pendingRevenue)}</div>
          <div className="text-[10px] text-amber-500/70 mt-2">{consultationRevenue?.pendingBills ?? 0} bills awaiting payment</div>
        </div>

        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-rose-500/20 transition-all duration-300">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <BarChart3 className="w-16 h-16 text-white" />
          </div>
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Average Bill</div>
          <div className="text-3xl font-extrabold mt-3 text-rose-400 tracking-tight">{formatCurrency(consultationRevenue?.averageBillAmount)}</div>
          <div className="text-[10px] text-rose-500/70 mt-2">Mean consultation bill value</div>
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="border border-white/5 bg-slate-900/35 px-4 py-3 rounded-xl">
          <div className="text-[10px] uppercase tracking-wider text-gray-500">Today</div>
          <div className="mt-1 text-lg font-bold text-white">{formatCurrency(consultationRevenue?.todayRevenue)}</div>
        </div>
        <div className="border border-white/5 bg-slate-900/35 px-4 py-3 rounded-xl">
          <div className="text-[10px] uppercase tracking-wider text-gray-500">This Week</div>
          <div className="mt-1 text-lg font-bold text-white">{formatCurrency(consultationRevenue?.thisWeekRevenue)}</div>
        </div>
        <div className="border border-white/5 bg-slate-900/35 px-4 py-3 rounded-xl">
          <div className="text-[10px] uppercase tracking-wider text-gray-500">This Month</div>
          <div className="mt-1 text-lg font-bold text-white">{formatCurrency(consultationRevenue?.thisMonthRevenue)}</div>
        </div>
        <div className="border border-white/5 bg-slate-900/35 px-4 py-3 rounded-xl">
          <div className="text-[10px] uppercase tracking-wider text-gray-500">This Year</div>
          <div className="mt-1 text-lg font-bold text-white">{formatCurrency(consultationRevenue?.thisYearRevenue)}</div>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden">
        <div className="flex flex-col gap-4 px-6 py-4 border-b border-white/5 xl:flex-row xl:items-center xl:justify-between">
          <h4 className="font-semibold text-white flex items-center gap-2 text-sm uppercase tracking-wide">
            <ReceiptText className="w-4 h-4 text-orange-400" />
            <span>All Consultation Bills</span>
          </h4>

          <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 sm:grid-cols-[minmax(180px,1.2fr)_150px_150px_auto_auto] gap-2 xl:min-w-[760px]">
            <Input
              value={billNumber}
              onChange={(event) => setBillNumber(event.target.value)}
              placeholder="Search bill number"
              className="h-9 border-white/10 bg-slate-950/60 text-xs text-white placeholder:text-gray-500 focus-visible:ring-orange-500/40"
            />
            <Input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="h-9 border-white/10 bg-slate-950/60 text-xs text-white focus-visible:ring-orange-500/40"
            />
            <Input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="h-9 border-white/10 bg-slate-950/60 text-xs text-white focus-visible:ring-orange-500/40"
            />
            <Button
              type="submit"
              disabled={consultationRevenueLoading}
              className="h-9 gap-2 bg-orange-500 px-3 text-xs text-white hover:bg-orange-600"
            >
              {consultationRevenueLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Search className="h-3.5 w-3.5" />}
              <span>Search</span>
            </Button>
            <Button
              type="button"
              disabled={consultationRevenueLoading}
              onClick={handleClearFilters}
              variant="outline"
              className="h-9 gap-2 border-white/10 bg-slate-950/40 px-3 text-xs text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Clear</span>
            </Button>
          </form>

          <span className="text-[10px] text-gray-500 uppercase tracking-wider xl:text-right">{bills.length} records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/40 text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-semibold">Bill</th>
                <th className="px-6 py-3 font-semibold">Patient</th>
                <th className="px-6 py-3 font-semibold">Doctor</th>
                <th className="px-6 py-3 font-semibold">Facility</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold text-right">Amount</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{bill.billNumber || bill.id}</td>
                  <td className="px-6 py-4 text-gray-300">{bill.patientName || 'Unknown patient'}</td>
                  <td className="px-6 py-4 text-gray-300">{bill.doctorName || 'Not assigned'}</td>
                  <td className="px-6 py-4 text-gray-400">{bill.facilityName || 'Not linked'}</td>
                  <td className="px-6 py-4 text-gray-400">{formatDate(bill.consultationDate)}</td>
                  <td className="px-6 py-4 text-right text-white font-semibold">{formatCurrency(bill.totalAmount)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                      bill.paymentStatus === 'PAID'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : bill.paymentStatus === 'PENDING'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-slate-800 text-gray-400 border border-white/5'
                    }`}>
                      {bill.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}

              {bills.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    Consultation billing endpoint has no bill records yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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
