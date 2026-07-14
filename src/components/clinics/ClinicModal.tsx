import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { type Clinic, addClinic, updateClinic } from '../../services/userService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getApiErrorMessage, getRequestErrorMessage } from '@/lib/apiErrors';

interface ClinicModalProps {
  token: string;
  editingClinic: Clinic | null;
  onClose: () => void;
  onSuccess: (clinic: Clinic, isNew: boolean) => void;
}

export default function ClinicModal({ token, editingClinic, onClose, onSuccess }: ClinicModalProps) {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formState, setFormState] = useState('');
  const [formPincode, setFormPincode] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingClinic) {
      setFormName(editingClinic.clinicName);
      setFormEmail(editingClinic.email || '');
      setFormPhone(editingClinic.mobileNumber || '');
      setFormAddress(editingClinic.addressLine1 || '');
      setFormCity(editingClinic.city || '');
      setFormState(editingClinic.state || '');
      setFormPincode(editingClinic.pincode || '');
    }
  }, [editingClinic]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formPhone.trim()) {
      setError('Name, Email, and Mobile Number are required.');
      return;
    }
    setError('');
    setActionLoading(true);

    const payload = {
      clinicName: formName,
      email: formEmail,
      mobileNumber: formPhone,
      addressLine1: formAddress,
      city: formCity,
      state: formState,
      pincode: formPincode,
    };

    try {
      if (editingClinic) {
        const res = await updateClinic(token, editingClinic.id, payload);
        if (res.success && res.data) {
          onSuccess(res.data, false);
          onClose();
        } else {
          setError(getApiErrorMessage(res, 'Failed to update clinic.'));
        }
      } else {
        const res = await addClinic(token, payload);
        if (res.success && res.data) {
          onSuccess(res.data, true);
          onClose();
        } else {
          setError(getApiErrorMessage(res, 'Failed to add clinic.'));
        }
      }
    } catch (err: unknown) {
      setError(getRequestErrorMessage(err));
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={handleFormSubmit} className="relative z-10 bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-1 text-white capitalize">
          {editingClinic ? 'Edit' : 'Add'} Clinic
        </h3>
        <p className="text-xs text-gray-400 mb-5">Provide correct parameters for the clinic.</p>

        {error && (
          <div className="whitespace-pre-line bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded mb-4 text-sm" role="alert">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clinicName" className="text-xs font-semibold text-gray-400 uppercase">Clinic Name *</Label>
            <Input
              id="clinicName"
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="text-white"
              placeholder="LifeCare Clinic"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              className="text-white"
              placeholder="contact@lifecare.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobileNumber" className="text-xs font-semibold text-gray-400 uppercase">Mobile Number *</Label>
            <Input
              id="mobileNumber"
              type="text"
              value={formPhone}
              onChange={(e) => setFormPhone(e.target.value)}
              className="text-white"
              placeholder="+91 9988776655"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressLine1" className="text-xs font-semibold text-gray-400 uppercase">Street Address</Label>
            <Input
              id="addressLine1"
              type="text"
              value={formAddress}
              onChange={(e) => setFormAddress(e.target.value)}
              className="text-white"
              placeholder="Plot 42, Green Avenue"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="city" className="text-xs font-semibold text-gray-400 uppercase">City / Town</Label>
              <Input
                id="city"
                type="text"
                value={formCity}
                onChange={(e) => setFormCity(e.target.value)}
                className="text-white"
                placeholder="Mumbai"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode" className="text-xs font-semibold text-gray-400 uppercase">Pincode</Label>
              <Input
                id="pincode"
                type="text"
                value={formPincode}
                onChange={(e) => setFormPincode(e.target.value)}
                className="text-white"
                placeholder="400001"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-xs font-semibold text-gray-400 uppercase">State</Label>
            <Input
              id="state"
              type="text"
              value={formState}
              onChange={(e) => setFormState(e.target.value)}
              className="text-white"
              placeholder="Maharashtra"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 border-t border-white/5 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            disabled={actionLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={actionLoading}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow hover:opacity-95"
          >
            {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{editingClinic ? 'Save Changes' : 'Create Clinic'}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
