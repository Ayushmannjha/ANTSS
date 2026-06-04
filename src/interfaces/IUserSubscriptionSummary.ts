export interface IUserSubscriptionSummary {
  // User info
  userId: string;
  userFullName?: string;
  userEmail?: string;
  userRole?: string;

  // Active subscription
  subscriptionId?: string;
  packageName?: string;
  durationType?: 'MONTHLY' | 'YEARLY' | string;
  subscriptionStartDate?: string; // ISO date
  subscriptionEndDate?: string; // ISO date
  daysRemaining?: number;
  subscriptionExpired?: boolean;
  subscriptionStatus?: string;
  paymentStatus?: string;

  // Doctor quota
  baseDoctorLimit?: number;
  allowedDoctors?: number;
  usedDoctors?: number;
  availableDoctorSlots?: number;

  // Facility quota
  allowedHospitals?: number;
  allowedClinics?: number;

  // Pricing
  basePackagePrice?: number; // decimal
  extraDoctorPrice?: number;

  // Package features
  packageFeatures?: string;

  // Addons
  addons?: IUserSubscriptionSummaryDoctorAddon[];
  totalApprovedAddonDoctors?: number;
  totalAddonCost?: string;

  // Doctor allocations
  allocatedDoctors?: IUserSubscriptionSummaryDoctorAllocation[];

  // Facilities
  hospitals?: IUserSubscriptionSummaryFacility[];
  clinics?: IUserSubscriptionSummaryFacility[];
}

export interface IUserSubscriptionSummaryDoctorAddon {
  addonId?: number;
  additionalDoctors?: number;
  prorataAmount?: number; // numeric amount
  startDate?: string;
  endDate?: string;
  approvalStatus?: string;
  paymentStatus?: string;
  approvedAt?: string | null;
  approvedByName?: string | null;
}

export interface IUserSubscriptionSummaryDoctorAllocation {
  doctorId?: string;
  doctorName?: string;
  specialization?: string;
  qualification?: string;
  allocationType?: string;
  allocationStatus?: string;
  allocatedAt?: string; // ISO datetime
}

export interface IUserSubscriptionSummaryFacility {
  facilityId?: number;
  facilityName?: string;
  facilityCode?: string;
  city?: string;
  state?: string;
  status?: string;
  maxDoctorLimit?: number;
  activeDoctorCount?: number;
}
