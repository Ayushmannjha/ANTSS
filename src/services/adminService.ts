import type { ApiResponse } from './authService';
import type { Hospital, Clinic } from './userService';
import type { Package } from './packageService';
import { API_BASE } from '@/lib/apiClient';

export interface AdminUserResponse {
  id: string; // backend uses UUID
  fullName: string;
  email: string;
  mobileNumber: string;
  userType: 'HOSPITAL' | 'CLINIC' | 'DOCTOR';
  entityName?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  pincode?: string;
  allowedDoctors?: number;
  usedDoctors?: number;
  availableDoctorSlots?: number;
  allowedHospitals?: number;
  allowedClinics?: number;
  packageName?: string;
  subscriptionId?: string;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  daysRemaining?: number;
  subscriptionStatus?: string;
  paymentStatus?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'INACTIVE' | 'EXPIRED';
  active: boolean;
}

export interface DoctorAddonResponse {
  id: number;
  userSubscriptionId: string;
  additionalDoctors: number;
  addonPrice: number;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestedAt: string;
  approvedByUserId?: string;
  approvedAt?: string;
  // Let's add extra display helpers
  entityName?: string;
  userEmail?: string;
  yearlyPricePerDoctor?: number;
  remainingMonths?: number;
  prorataAmount?: number;
  // Additional fields returned by backend for pending addon requests
  username?: string;
  entityType?: string;
  state?: string;
  city?: string;
  address?: string;
}

export interface AdminStats {
  totalUsers: number;
  pendingApprovals: number;
  totalHospitals: number;
  totalClinics: number;
  activePackages: number;
}

function getHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

function unwrapList<T = any>(body: any): T[] {
  const raw = body?.data ?? body;
  return Array.isArray(raw) ? raw : [];
}

function normalizeAdminStatus(subscriptionStatus?: string): AdminUserResponse['status'] {
  if (subscriptionStatus === 'ACTIVE') return 'APPROVED';
  if (subscriptionStatus === 'EXPIRED') return 'EXPIRED';
  if (subscriptionStatus === 'PENDING') return 'PENDING';
  if (subscriptionStatus === 'CANCELLED' || subscriptionStatus === 'SUSPENDED') return 'INACTIVE';
  return 'INACTIVE';
}

function mapAdminUser(it: any): AdminUserResponse {
  const subscriptionStatus = it.subscriptionStatus ? String(it.subscriptionStatus) : undefined;
  const allowedDoctors = Number(it.allowedDoctors ?? it.allowedDoctorLimit ?? 0);
  const usedDoctors = Number(it.usedDoctors ?? 0);

  return {
    id: String(it.userId || it.id || ''),
    fullName: it.fullName || it.userFullName || it.name || '',
    email: it.email || it.userEmail || '',
    mobileNumber: it.mobileNumber || it.mobile || '',
    userType: (it.userType || it.role || it.userRole || 'USER') as any,
    entityName: it.entityName || it.packageName || undefined,
    addressLine1: it.addressLine1,
    city: it.city,
    state: it.state,
    pincode: it.pincode,
    allowedDoctors,
    usedDoctors,
    availableDoctorSlots: Number(it.availableDoctorSlots ?? Math.max(0, allowedDoctors - usedDoctors)),
    allowedHospitals: Number(it.allowedHospitals ?? 0),
    allowedClinics: Number(it.allowedClinics ?? 0),
    packageName: it.packageName,
    subscriptionId: it.subscriptionId,
    subscriptionStartDate: it.subscriptionStartDate || it.startDate,
    subscriptionEndDate: it.subscriptionEndDate || it.endDate,
    daysRemaining: typeof it.daysRemaining === 'number' ? it.daysRemaining : undefined,
    subscriptionStatus,
    paymentStatus: it.paymentStatus ? String(it.paymentStatus) : undefined,
    status: normalizeAdminStatus(subscriptionStatus),
    active: subscriptionStatus === 'ACTIVE' && it.paymentStatus === 'PAID',
  };
}

function mapPendingRegistration(it: any): AdminUserResponse {
  return {
    id: String(it.id || it.userId || ''),
    fullName: it.fullName || '',
    email: it.email || '',
    mobileNumber: it.mobileNumber || it.mobile || '',
    userType: (it.userType || 'USER') as any,
    entityName: it.entityName,
    addressLine1: it.addressLine1,
    city: it.city,
    state: it.state,
    pincode: it.pincode,
    status: (it.status || 'PENDING') as AdminUserResponse['status'],
    active: false,
  };
}

function mapPendingAddon(summary: any, addon: any): DoctorAddonResponse {
  const remainingMonths = summary.daysRemaining != null
    ? Math.max(0, Math.ceil(Number(summary.daysRemaining) / 30))
    : undefined;

  return {
    id: Number(addon.addonId ?? addon.id),
    userSubscriptionId: String(summary.subscriptionId || addon.userSubscriptionId || ''),
    additionalDoctors: Number(addon.additionalDoctors ?? 0),
    addonPrice: Number(addon.prorataAmount ?? addon.addonPrice ?? 0),
    paymentStatus: (addon.paymentStatus || 'PENDING') as DoctorAddonResponse['paymentStatus'],
    approvalStatus: (addon.approvalStatus || 'PENDING') as DoctorAddonResponse['approvalStatus'],
    requestedAt: addon.startDate || '',
    approvedByUserId: addon.approvedByUserId,
    approvedAt: addon.approvedAt,
    entityName: summary.packageName || addon.facilityType || 'Subscription Addon',
    userEmail: summary.userEmail,
    yearlyPricePerDoctor: Number(summary.extraDoctorPrice ?? 0),
    remainingMonths,
    prorataAmount: Number(addon.prorataAmount ?? 0),
    username: summary.userFullName,
    entityType: addon.facilityType,
    state: addon.state,
    city: addon.city,
    address: addon.address,
  };
}



/**
 * getAllUsers
 * GET /api/user/subscriptions/get-all-users
 * Returns a list of all users (admin-only endpoint)
 */
export async function getAllUsers(token: string): Promise<ApiResponse<AdminUserResponse[]>> {
  const res = await fetch(`${API_BASE}/user/subscriptions/get-all-users`, {
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  // backend returns user objects with `userId` and subscription-related fields —
  // map them to AdminUserResponse expected by the UI
  const mapped = unwrapList(body).map(mapAdminUser).filter((user) => user.id);

  return {
    success: res.ok,
    message: body.message,
    data: mapped,
  };
}

export async function getUsers(token: string): Promise<ApiResponse<AdminUserResponse[]>> {
  const res = await fetch(`${API_BASE}/admin/registrations/pending`, {
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: unwrapList(body).map(mapPendingRegistration).filter((user) => user.id),
  };
}

export async function approveUser(token: string, userId: string): Promise<ApiResponse<AdminUserResponse>> {
  const res = await fetch(`${API_BASE}/admin/users/${userId}/approve`, {
    method: 'POST',
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data,
  };
}

export async function rejectUser(token: string, userId: string): Promise<ApiResponse<AdminUserResponse>> {
  const res = await fetch(`${API_BASE}/admin/users/${userId}/reject`, {
    method: 'POST',
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data,
  };
}

export async function modifyUserPackage(token: string, userId: string, packageId: number): Promise<ApiResponse<AdminUserResponse>> {
  const res = await fetch(`${API_BASE}/admin/users/${userId}/package`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify({ packageId }),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data,
  };
}

export async function extendUserValidity(token: string, userId: string, days: number): Promise<ApiResponse<AdminUserResponse>> {
  const res = await fetch(`${API_BASE}/admin/users/${userId}/extend`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify({ days }),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data,
  };
}

export async function blockUser(token: string, userId: string): Promise<ApiResponse<AdminUserResponse>> {
  const res = await fetch(`${API_BASE}/admin/users/${userId}/block`, {
    method: 'PUT',
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data,
  };
}

export async function unblockUser(token: string, userId: string): Promise<ApiResponse<AdminUserResponse>> {
  const res = await fetch(`${API_BASE}/admin/users/${userId}/unblock`, {
    method: 'PUT',
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data,
  };
}

export async function getAdminHospitals(_token: string): Promise<ApiResponse<Hospital[]>> {
  // Gracefully fallback to empty array since the backend lacks a list-all-hospitals admin endpoint
  return {
    success: true,
    data: [],
  };
}

export async function getAdminClinics(_token: string): Promise<ApiResponse<Clinic[]>> {
  // Gracefully fallback to empty array since the backend lacks a list-all-clinics admin endpoint
  return {
    success: true,
    data: [],
  };
}

export async function createAdminPackage(token: string, pkg: Omit<Package, 'id'>): Promise<ApiResponse<Package>> {
  const res = await fetch(`${API_BASE}/packages`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(pkg),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data || body,
  };
}

export async function updateAdminPackage(token: string, id: number, pkg: Partial<Package>): Promise<ApiResponse<Package>> {
  const res = await fetch(`${API_BASE}/packages/${id}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(pkg),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data || body,
  };
}

export async function getAdminStats(_token: string): Promise<ApiResponse<AdminStats>> {
  // Gracefully fallback to mock stats since the backend lacks a system stats admin endpoint
  return {
    success: true,
    data: {
      totalUsers: 0,
      pendingApprovals: 0,
      totalHospitals: 0,
      totalClinics: 0,
      activePackages: 3,
    },
  };
}

export async function getPendingAddons(token: string): Promise<ApiResponse<DoctorAddonResponse[]>> {
  const res = await fetch(`${API_BASE}/user/subscriptions/pending-addons`, {
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  const mapped = unwrapList(body).flatMap((summary: any) =>
    Array.isArray(summary.addons)
      ? summary.addons
          .filter((addon: any) => addon.approvalStatus === 'PENDING')
          .map((addon: any) => mapPendingAddon(summary, addon))
      : []
  );

  return {
    success: res.ok,
    message: body.message,
    data: mapped,
  };
}

export async function approveAddon(token: string, addonId: number, approvedBy: string): Promise<ApiResponse<DoctorAddonResponse>> {
  const res = await fetch(`${API_BASE}/user/subscriptions/addons/${addonId}/approve?approvedBy=${encodeURIComponent(approvedBy)}`, {
    method: 'POST',
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data,
  };
}

export async function rejectAddon(token: string, addonId: number, rejectedBy: string, reason = 'Rejected by admin'): Promise<ApiResponse<DoctorAddonResponse>> {
  const params = new URLSearchParams({ rejectedBy, reason });
  const res = await fetch(`${API_BASE}/user/subscriptions/addons/${addonId}/reject?${params.toString()}`, {
    method: 'POST',
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data,
  };
}
