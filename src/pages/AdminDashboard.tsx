import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchPackages, type Package } from '../services/packageService';
import {
  getAllUsers,
  approveUser,
  rejectUser,
  modifyUserPackage,
  extendUserValidity,
  blockUser,
  unblockUser,
  getAdminHospitals,
  getAdminClinics,
  createAdminPackage,
  updateAdminPackage,
  getAdminStats,
  getPendingAddons,
  approveAddon,
  rejectAddon,
  type AdminUserResponse,
  type DoctorAddonResponse,
  type AdminStats
} from '../services/adminService';
import type { Hospital, Clinic } from '../services/userService';

// Tab Subcomponents
import { UserRequestsTab } from '../components/admin/UserRequestsTab';
import { UserManagementTab } from '../components/admin/UserManagementTab';
import { AddonRequestsTab } from '../components/admin/AddonRequestsTab';
import { PackagesTab } from '../components/admin/PackagesTab';
import { EntitiesTab } from '../components/admin/EntitiesTab';
import { AnalyticsTab } from '../components/admin/AnalyticsTab';

import {
  Users,
  Clock,
  Package as PackageIcon,
  Building2,
  BarChart3,
  LogOut,
  Loader2,
  FileSpreadsheet,
  Settings
} from 'lucide-react';

type AdminTab = 'requests' | 'registered' | 'addons' | 'packages' | 'entities' | 'analytics';

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('requests');
  
  // Data States
  const [usersList, setUsersList] = useState<AdminUserResponse[]>([]);
  const [packagesList, setPackagesList] = useState<Package[]>([]);
  const [addonsList, setAddonsList] = useState<DoctorAddonResponse[]>([]);
  const [hospitalsList, setHospitalsList] = useState<Hospital[]>([]);
  const [clinicsList, setClinicsList] = useState<Clinic[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);

  // Loading States
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const token = user?.accessToken || '';

  const loadData = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
    const [uRes, pList, aRes, hRes, cRes, sRes] = await Promise.all([
      // fetch full user list from subscriptions controller
      getAllUsers(token),
        fetchPackages(),
        getPendingAddons(token),
        getAdminHospitals(token),
        getAdminClinics(token),
        getAdminStats(token)
      ]);

      if (uRes.success && uRes.data) setUsersList(uRes.data);
      setPackagesList(pList || []);
      if (aRes.success && aRes.data) setAddonsList(aRes.data);
      if (hRes.success && hRes.data) setHospitalsList(hRes.data);
      if (cRes.success && cRes.data) setClinicsList(cRes.data);
      if (sRes.success && sRes.data) setStats(sRes.data);
    } catch (err) {
      console.error('Error loading admin dashboard details', err);
      setErrorMessage('Failed to connect to backend controllers. Please verify the Java service is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  // Actions
  const handleApproveUser = async (userId: string) => {
    setActionLoading(true);
    try {
      const res = await approveUser(token, userId);
      if (res.success) {
        setUsersList(prev => prev.map(u => u.id === userId ? { ...u, status: 'APPROVED' } : u));
        refreshStats();
      } else {
        alert(res.message || 'Verification approval failed.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectUser = async (userId: string) => {
    setActionLoading(true);
    try {
      const res = await rejectUser(token, userId);
      if (res.success) {
        setUsersList(prev => prev.map(u => u.id === userId ? { ...u, status: 'REJECTED' } : u));
        refreshStats();
      } else {
        alert(res.message || 'Verification rejection failed.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleBlockUser = async (userId: string) => {
    setActionLoading(true);
    try {
      const res = await blockUser(token, userId);
      if (res.success) {
        setUsersList(prev => prev.map(u => u.id === userId ? { ...u, status: 'INACTIVE' } : u));
      } else {
        alert(res.message || 'Failed to block user.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnblockUser = async (userId: string) => {
    setActionLoading(true);
    try {
      const res = await unblockUser(token, userId);
      if (res.success) {
        setUsersList(prev => prev.map(u => u.id === userId ? { ...u, status: 'APPROVED' } : u));
      } else {
        alert(res.message || 'Failed to unblock user.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleModifyUserPackage = async (userId: string, packageId: number) => {
    setActionLoading(true);
    try {
      const res = await modifyUserPackage(token, userId, packageId);
      if (res.success && res.data) {
        setUsersList(prev => prev.map(u => u.id === userId ? { ...u, allowedDoctors: res.data?.allowedDoctors } : u));
        alert('Subscription package updated successfully!');
      } else {
        alert(res.message || 'Failed to update user package.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleExtendUserValidity = async (userId: string, days: number) => {
    setActionLoading(true);
    try {
      const res = await extendUserValidity(token, userId, days);
      if (res.success && res.data) {
        setUsersList(prev => prev.map(u => u.id === userId ? { ...u, status: res.data?.status || 'APPROVED' } : u));
        alert(`Account validity successfully extended by ${days} days!`);
      } else {
        alert(res.message || 'Failed to extend account validity.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleApproveAddon = async (addonId: number) => {
    setActionLoading(true);
    try {
      const res = await approveAddon(token, addonId);
      if (res.success) {
        setAddonsList(prev => prev.filter(addon => addon.id !== addonId));
  // Reload users list to show updated allowedDoctor counts
  const uRes = await getAllUsers(token);
  if (uRes.success && uRes.data) setUsersList(uRes.data);
        alert('Doctor license addon successfully approved and applied!');
      } else {
        alert(res.message || 'Addon approval failed.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectAddon = async (addonId: number) => {
    setActionLoading(true);
    try {
      const res = await rejectAddon(token, addonId);
      if (res.success) {
        setAddonsList(prev => prev.filter(addon => addon.id !== addonId));
        alert('Doctor license addon request rejected.');
      } else {
        alert(res.message || 'Addon rejection failed.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddPackage = async (pkgData: Omit<Package, 'id'>) => {
    setActionLoading(true);
    try {
      const res = await createAdminPackage(token, pkgData);
      if (res.success && res.data) {
        setPackagesList(prev => [...prev, res.data!]);
        refreshStats();
        alert('New membership package created successfully!');
      } else {
        alert(res.message || 'Package creation failed.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdatePackage = async (id: number, pkgData: Partial<Package>) => {
    setActionLoading(true);
    try {
      const res = await updateAdminPackage(token, id, pkgData);
      if (res.success && res.data) {
        setPackagesList(prev => prev.map(p => p.id === id ? res.data! : p));
        alert('Membership package saved successfully!');
      } else {
        alert(res.message || 'Package update failed.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const refreshStats = async () => {
    const sRes = await getAdminStats(token);
    if (sRes.success && sRes.data) setStats(sRes.data);
  };

  // Helper counts
  const pendingRequestsCount = usersList.filter(u => u.status === 'PENDING').length;
  const pendingAddonsCount = addonsList.filter(a => a.approvalStatus === 'PENDING').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
        <p className="text-gray-400 text-sm">Validating administrative sessions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/20">
              A
            </div>
            <div>
              <h1 className="font-bold text-sm text-white tracking-wide">ANTSS Admin</h1>
              <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Root Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          {/* Tab: User Requests */}
          <button
            onClick={() => setActiveTab('requests')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left text-sm ${
              activeTab === 'requests'
                ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-white font-medium shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4" />
              <span>Verify Registrations</span>
            </div>
            {pendingRequestsCount > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500 text-white font-bold">
                {pendingRequestsCount}
              </span>
            )}
          </button>

          {/* Tab: Registered Users */}
          <button
            onClick={() => setActiveTab('registered')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-sm ${
              activeTab === 'registered'
                ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-white font-medium shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Manage Accounts</span>
          </button>

          {/* Tab: Addon Requests */}
          <button
            onClick={() => setActiveTab('addons')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left text-sm ${
              activeTab === 'addons'
                ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-white font-medium shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-4 h-4" />
              <span>License Addons</span>
            </div>
            {pendingAddonsCount > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500 text-white font-bold">
                {pendingAddonsCount}
              </span>
            )}
          </button>

          {/* Tab: Packages */}
          <button
            onClick={() => setActiveTab('packages')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-sm ${
              activeTab === 'packages'
                ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-white font-medium shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <PackageIcon className="w-4 h-4" />
            <span>Pricing Packages</span>
          </button>

          {/* Tab: Entities */}
          <button
            onClick={() => setActiveTab('entities')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-sm ${
              activeTab === 'entities'
                ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-white font-medium shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Hospitals & Clinics</span>
          </button>

          {/* Tab: Analytics */}
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-sm ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-white font-medium shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Infrastructure Stats</span>
          </button>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-white/5 space-y-3 bg-slate-950/40">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 text-xs font-semibold text-orange-400">
              AD
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-white truncate">{user?.fullName || 'System Admin'}</div>
              <div className="text-[10px] text-gray-500 truncate">{user?.email || 'admin@antss.com'}</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left text-xs font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        {/* Panel Header */}
        <header className="flex justify-between items-center mb-8 border-b border-white/5 pb-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white capitalize flex items-center gap-2">
              <span>{activeTab === 'requests' ? 'Verify Registrations' : activeTab === 'registered' ? 'Manage Accounts' : activeTab === 'addons' ? 'License Addons' : activeTab === 'packages' ? 'Pricing Packages' : activeTab === 'entities' ? 'Hospitals & Clinics' : 'Infrastructure Stats'}</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              System dashboard synced to core controllers.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-white/5 px-3 py-1.5 rounded-xl text-xs text-gray-400">
            <Settings className="w-3.5 h-3.5 text-gray-500 animate-spin-slow" />
            <span>Version 1.0.4 (Live)</span>
          </div>
        </header>

        {errorMessage && (
          <div className="bg-red-500/15 border border-red-500/20 text-red-400 px-5 py-3 rounded-2xl text-xs mb-6">
            {errorMessage}
          </div>
        )}

        {/* Tab Components */}
        <div className="space-y-6">
          {activeTab === 'requests' && (
            <UserRequestsTab
              users={usersList}
              onApprove={handleApproveUser}
              onReject={handleRejectUser}
              actionLoading={actionLoading}
            />
          )}

          {activeTab === 'registered' && (
            <UserManagementTab
              users={usersList}
              packages={packagesList}
              token={token}
              onBlock={handleBlockUser}
              onUnblock={handleUnblockUser}
              onModifyPackage={handleModifyUserPackage}
              onExtendValidity={handleExtendUserValidity}
              actionLoading={actionLoading}
            />
          )}

          {activeTab === 'addons' && (
            <AddonRequestsTab
              addons={addonsList}
              onApproveAddon={handleApproveAddon}
              onRejectAddon={handleRejectAddon}
              actionLoading={actionLoading}
            />
          )}

          {activeTab === 'packages' && (
            <PackagesTab
              packages={packagesList}
              onAddPackage={handleAddPackage}
              onUpdatePackage={handleUpdatePackage}
              actionLoading={actionLoading}
            />
          )}

          {activeTab === 'entities' && (
            <EntitiesTab
              hospitals={hospitalsList}
              clinics={clinicsList}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsTab
              stats={stats}
              usersCount={usersList.filter(u => u.status !== 'PENDING').length}
              hospitalsCount={hospitalsList.length}
              clinicsCount={clinicsList.length}
              pendingApprovalsCount={pendingRequestsCount}
            />
          )}
        </div>
      </main>
    </div>
  );
}
