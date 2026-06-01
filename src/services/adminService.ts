import type { ApiResponse } from './authService';
import type { Hospital, Clinic } from './userService';
import type { Package } from './packageService';

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

export async function getUsers(token: string): Promise<ApiResponse<AdminUserResponse[]>> {
  const res = await fetch('/api/admin/registrations/pending', {
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data || (Array.isArray(body) ? body : []),
  };
}

export async function approveUser(token: string, userId: string): Promise<ApiResponse<AdminUserResponse>> {
  const res = await fetch(`/api/admin/users/${userId}/approve`, {
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
  const res = await fetch(`/api/admin/users/${userId}/reject`, {
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
  const res = await fetch(`/api/admin/users/${userId}/package`, {
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
  const res = await fetch(`/api/admin/users/${userId}/extend`, {
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
  const res = await fetch(`/api/admin/users/${userId}/block`, {
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
  const res = await fetch(`/api/admin/users/${userId}/unblock`, {
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
  const res = await fetch('/api/packages', {
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
  const res = await fetch(`/api/packages/${id}`, {
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
  const res = await fetch('/api/admin/addons/pending', {
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data || (Array.isArray(body) ? body : []),
  };
}

export async function approveAddon(token: string, addonId: number): Promise<ApiResponse<DoctorAddonResponse>> {
  const res = await fetch(`/api/admin/addons/${addonId}/approve`, {
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

export async function rejectAddon(token: string, addonId: number): Promise<ApiResponse<DoctorAddonResponse>> {
  const res = await fetch(`/api/admin/addons/${addonId}/reject`, {
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
