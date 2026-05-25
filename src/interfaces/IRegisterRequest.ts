export interface IRegisterRequest {
  fullName: string;
  clinicName: string;
  email: string;
  mobile: string;

  address?: string;
  city?: string;
  state?: string;
  country?: string;

  packageId: number;
  numDoctors: number;

  password: string;
  confirmPassword: string;
}
