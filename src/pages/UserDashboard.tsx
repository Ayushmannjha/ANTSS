import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getProfile,
  getHospitals,
  getClinics,
  getDoctors,
  getRmos,
  type Hospital,
  type Clinic,
  type Doctor,
  type Rmo
} from '../services/userService';
import {
  Building2,
  Stethoscope,
  Users,
  CreditCard,
  LogOut,
  Clock,
  Shield,
  Loader2,
  UserRoundCog
} from 'lucide-react';
import OverviewTab from '../components/dashboard/OverviewTab';
import HospitalTab from '../components/hospitals/HospitalTab';
import ClinicTab from '../components/clinics/ClinicTab';
import DoctorTab from '../components/doctors/DoctorTab';
import RmoTab from '../components/rmos/RmoTab';
import SubscriptionTab from '../components/subscriptions/SubscriptionTab';

type Tab = 'overview' | 'hospitals' | 'clinics' | 'doctors' | 'rmos' | 'subscription';

export function UserDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [profile, setProfile] = useState<any>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [rmos, setRmos] = useState<Rmo[]>([]);
  const [loading, setLoading] = useState(true);
  
  const token = user?.accessToken || '';

  const fetchData = async () => {
    setLoading(true);
    try {
      const [profRes, hospRes, clinRes, docRes, rmoRes] = await Promise.all([
        getProfile(token),
        getHospitals(token),
        getClinics(token),
        getDoctors(token),
        getRmos(token)
      ]);

      if (profRes.success) setProfile(profRes.data);
      if (hospRes.success && hospRes.data) setHospitals(hospRes.data);
      if (clinRes.success && clinRes.data) setClinics(clinRes.data);
      if (docRes.success && docRes.data) setDoctors(docRes.data);
      if (rmoRes.success && rmoRes.data) setRmos(rmoRes.data);
    } catch (err) {
      console.error("Error fetching dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
        <p className="text-gray-400">Loading your profile & medical entities...</p>
      </div>
    );
  }

  const userStatus = user?.status || 'APPROVED';

  if (userStatus === 'PENDING') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white px-4">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl max-w-md text-center shadow-2xl">
          <Clock className="w-16 h-16 text-amber-500 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold mb-2">Awaiting Approval</h2>
          <p className="text-gray-400 mb-8 text-sm">
            Your registration is currently under manual review by our administration team. 
            Once verified, your access credentials and workspace will be unlocked.
          </p>
          <button 
            onClick={logout} 
            className="w-full bg-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-xl transition-all"
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center font-bold text-white shadow-lg">
              A
            </div>
            <div>
              <h1 className="font-semibold text-white tracking-wide">ANTSS Client</h1>
              <p className="text-xs text-gray-500">User Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-sm ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-white font-medium'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('hospitals')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-sm ${
              activeTab === 'hospitals'
                ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-white font-medium'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span>Hospitals</span>
          </button>

          <button
            onClick={() => setActiveTab('clinics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-sm ${
              activeTab === 'clinics'
                ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-white font-medium'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Stethoscope className="w-5 h-5" />
            <span>Clinics</span>
          </button>

          <button
            onClick={() => setActiveTab('doctors')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-sm ${
              activeTab === 'doctors'
                ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-white font-medium'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Doctors</span>
          </button>

          <button
            onClick={() => setActiveTab('rmos')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-sm ${
              activeTab === 'rmos'
                ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-white font-medium'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <UserRoundCog className="w-5 h-5" />
            <span>RMO & Staff</span>
          </button>

          <button
            onClick={() => setActiveTab('subscription')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-sm ${
              activeTab === 'subscription'
                ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-white font-medium'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span>Subscription</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-8 border-b border-white/5 pb-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white capitalize">
              {activeTab} Management
            </h2>
            <p className="text-sm text-gray-400">
              Manage details, view statistics, and adjust parameters.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Welcome, {user?.email}</span>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-semibold border border-white/10">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Dynamic Tab Render */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <OverviewTab
              profile={profile}
              hospitals={hospitals}
              clinics={clinics}
              doctors={doctors}
              userStatus={userStatus}
            />
          )}

          {activeTab === 'hospitals' && (
            <HospitalTab
              hospitals={hospitals}
              token={token}
              onHospitalsUpdate={setHospitals}
            />
          )}

          {activeTab === 'clinics' && (
            <ClinicTab 
              clinics={clinics} 
              token={token} 
              onClinicsUpdate={setClinics} 
            />
          )}

          {activeTab === 'doctors' && (
            <DoctorTab
              doctors={doctors}
              token={token}
              onDoctorsUpdate={setDoctors}
            />
          )}

          {activeTab === 'rmos' && (
            <RmoTab
              rmos={rmos}
              hospitals={hospitals}
              clinics={clinics}
              token={token}
              onRmosUpdate={setRmos}
            />
          )}

          {activeTab === 'subscription' && (
            <SubscriptionTab
              token={token}
              hospitals={hospitals}
              clinics={clinics}
            />
          )}
        </div>
      </main>
    </div>
  );
}
