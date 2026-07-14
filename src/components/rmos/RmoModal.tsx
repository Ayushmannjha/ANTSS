import { useEffect, useState, type FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import {
  addRmo,
  updateRmo,
  type Clinic,
  type Hospital,
  type Rmo,
  type RmoRole,
  type UpdateRmoPayload,
} from '../../services/userService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getApiErrorMessage, getRequestErrorMessage } from '@/lib/apiErrors';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RmoModalProps {
  token: string;
  hospitals: Hospital[];
  clinics: Clinic[];
  editingRmo: Rmo | null;
  onClose: () => void;
  onSuccess: (rmo: Rmo, isNew: boolean) => void;
}

const roles: RmoRole[] = ['RMO', 'NURSE', 'RECEPTIONIST', 'STAFF'];
const mobilePattern = /^[6-9][0-9]{9}$/;

export default function RmoModal({
  token,
  hospitals,
  clinics,
  editingRmo,
  onClose,
  onSuccess,
}: RmoModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<RmoRole>('RMO');
  const [facility, setFacility] = useState('none');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!editingRmo) return;

    setName(editingRmo.rmoName ?? '');
    setEmail(editingRmo.email ?? '');
    setMobileNumber(editingRmo.mobileNumber ?? '');
    setEmployeeCode(editingRmo.employeeCode ?? '');
    setRole(roles.includes(editingRmo.role as RmoRole) ? editingRmo.role as RmoRole : 'RMO');
    if (editingRmo.hospitalId) setFacility(`hospital:${editingRmo.hospitalId}`);
    else if (editingRmo.clinicId) setFacility(`clinic:${editingRmo.clinicId}`);
    else setFacility('none');
  }, [editingRmo]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMobile = mobileNumber.trim();
    const trimmedEmployeeCode = employeeCode.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedEmployeeCode) {
      setError('Name, email, and employee code are required.');
      return;
    }
    if (!editingRmo && !trimmedPassword) {
      setError('Password is required when creating an RMO or staff member.');
      return;
    }
    if (trimmedName.length > 100 || trimmedEmail.length > 254 || trimmedEmployeeCode.length > 50) {
      setError('One or more fields exceed the allowed length.');
      return;
    }
    if (trimmedMobile && !mobilePattern.test(trimmedMobile)) {
      setError('Mobile number must be a valid 10-digit Indian mobile number.');
      return;
    }

    const payload: UpdateRmoPayload = {
      rmoName: trimmedName,
      email: trimmedEmail,
      mobileNumber: trimmedMobile || undefined,
      employeeCode: trimmedEmployeeCode,
      role,
    };

    if (facility.startsWith('hospital:')) payload.hospitalId = Number(facility.split(':')[1]);
    if (facility.startsWith('clinic:')) payload.clinicId = Number(facility.split(':')[1]);

    setError('');
    setSubmitting(true);

    try {
      const response = editingRmo
        ? await updateRmo(token, editingRmo.id, payload)
        : await addRmo(token, { ...payload, password });

      if (response.success && response.data) {
        onSuccess(response.data, !editingRmo);
        onClose();
      } else {
        setError(getApiErrorMessage(response, `Failed to ${editingRmo ? 'update' : 'add'} staff member.`));
      }
    } catch (requestError) {
      setError(getRequestErrorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <h3 className="mb-1 text-xl font-bold text-white">{editingRmo ? 'Edit' : 'Add'} RMO / Staff</h3>
        <p className="mb-5 text-xs text-gray-400">Enter the staff details and optionally assign a hospital or clinic.</p>

        {error && (
          <div className="mb-4 whitespace-pre-line rounded border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm text-red-400" role="alert">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="rmoName" className="text-xs font-semibold uppercase text-gray-400">Name *</Label>
            <Input id="rmoName" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} className="text-white" placeholder="John Doe" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rmoEmail" className="text-xs font-semibold uppercase text-gray-400">Email *</Label>
            <Input id="rmoEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={254} className="text-white" placeholder="staff@example.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rmoMobile" className="text-xs font-semibold uppercase text-gray-400">Mobile Number</Label>
            <Input id="rmoMobile" type="tel" inputMode="numeric" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} pattern="[6-9][0-9]{9}" className="text-white" placeholder="9876543210" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employeeCode" className="text-xs font-semibold uppercase text-gray-400">Employee Code *</Label>
            <Input id="employeeCode" value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value)} maxLength={50} className="text-white" placeholder="EMP-001" required />
          </div>

          {!editingRmo && (
            <div className="space-y-2">
              <Label htmlFor="rmoPassword" className="text-xs font-semibold uppercase text-gray-400">Password *</Label>
              <Input id="rmoPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" className="text-white" placeholder="Create a login password" required />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="rmoRole" className="text-xs font-semibold uppercase text-gray-400">Role *</Label>
            <Select value={role} onValueChange={(value) => setRole(value as RmoRole)}>
              <SelectTrigger id="rmoRole" className="w-full text-white"><SelectValue /></SelectTrigger>
              <SelectContent>
                {roles.map((item) => <SelectItem key={item} value={item}>{item.replace('_', ' ')}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rmoFacility" className="text-xs font-semibold uppercase text-gray-400">Facility</Label>
            <Select value={facility} onValueChange={setFacility}>
              <SelectTrigger id="rmoFacility" className="w-full text-white"><SelectValue placeholder="Select a facility" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No facility assignment</SelectItem>
                {hospitals.map((hospital) => <SelectItem key={`hospital-${hospital.id}`} value={`hospital:${hospital.id}`}>Hospital — {hospital.hospitalName}</SelectItem>)}
                {clinics.map((clinic) => <SelectItem key={`clinic-${clinic.id}`} value={`clinic:${clinic.id}`}>Clinic — {clinic.clinicName}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-white/5 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white" disabled={submitting}>Cancel</Button>
          <Button type="submit" disabled={submitting} className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow hover:opacity-95">
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>{editingRmo ? 'Save Changes' : 'Add Staff Member'}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
