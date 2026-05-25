import type { ApiResponse } from './authService';

export interface Hospital {
  id: number;
  hospitalName: string;
  mobileNumber?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  pincode?: string;
  allowedDoctors?: number;
  active?: boolean;
}

export interface Clinic {
  id: number;
  clinicName: string;
  mobileNumber?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  pincode?: string;
  allowedDoctors?: number;
  active?: boolean;
}

export interface Doctor {
  id: number;
  fullName: string;
  email: string;
  mobileNumber?: string;
  specialization?: string;
  active?: boolean;
}

function getHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

export async function getProfile(token: string): Promise<ApiResponse> {
  const res = await fetch('/api/user/profile', {
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data || body,
  };
}

export async function getHospitals(token: string): Promise<ApiResponse<Hospital[]>> {
  const res = await fetch('/api/user/hospitals', {
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data || (Array.isArray(body) ? body : []),
  };
}

export async function addHospital(token: string, hospital: Omit<Hospital, 'id'>): Promise<ApiResponse<Hospital>> {
  const res = await fetch('/api/user/hospitals', {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(hospital),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data || body,
  };
}

export async function updateHospital(token: string, id: number, hospital: Partial<Hospital>): Promise<ApiResponse<Hospital>> {
  const res = await fetch(`/api/user/hospitals/${id}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(hospital),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data || body,
  };
}

export async function getClinics(token: string): Promise<ApiResponse<Clinic[]>> {
  const res = await fetch('/api/user/clinics', {
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data || (Array.isArray(body) ? body : []),
  };
}

export async function addClinic(token: string, clinic: Omit<Clinic, 'id'>): Promise<ApiResponse<Clinic>> {
  const res = await fetch('/api/user/clinics', {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(clinic),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data || body,
  };
}

export async function updateClinic(token: string, id: number, clinic: Partial<Clinic>): Promise<ApiResponse<Clinic>> {
  const res = await fetch(`/api/user/clinics/${id}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(clinic),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data || body,
  };
}

export async function getDoctors(token: string): Promise<ApiResponse<Doctor[]>> {
  const res = await fetch('/api/user/doctors', {
    headers: getHeaders(token),
  });
  const body = await res.json().catch(() => ({}));
  return {
    success: res.ok,
    message: body.message,
    data: body.data || (Array.isArray(body) ? body : []),
  };
}
