import type { ApiResponse } from './authService';
import type { Hospital, Clinic } from './userService';
import type { Package } from './packageService';

export interface AdminUserResponse {
  id: number;
  fullName: string;
  email: string;
  mobileNumber: string;
  userType: 'HOSPITAL' | 'CLINIC' | 'DOCTOR';
  entityName: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  pincode?: string;
  allowedDoctors?: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  active: boolean;
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
  const res = await fetch('/api/admin/users', {
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data || (Array.isArray(body) ? body : []),
  };
}

export async function approveUser(token: string, userId: number): Promise<ApiResponse<void>> {
  const res = await fetch(`/api/admin/users/${userId}/approve`, {
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

export async function rejectUser(token: string, userId: number): Promise<ApiResponse<void>> {
  const res = await fetch(`/api/admin/users/${userId}/reject`, {
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

export async function getAdminHospitals(token: string): Promise<ApiResponse<Hospital[]>> {
  const res = await fetch('/api/admin/hospitals', {
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data || (Array.isArray(body) ? body : []),
  };
}

export async function getAdminClinics(token: string): Promise<ApiResponse<Clinic[]>> {
  const res = await fetch('/api/admin/clinics', {
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data || (Array.isArray(body) ? body : []),
  };
}

export async function createAdminPackage(token: string, pkg: Omit<Package, 'id'>): Promise<ApiResponse<Package>> {
  const res = await fetch('/api/admin/packages', {
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
  const res = await fetch(`/api/admin/packages/${id}`, {
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

export async function getAdminStats(token: string): Promise<ApiResponse<AdminStats>> {
  const res = await fetch('/api/admin/stats', {
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data || body,
  };
}
