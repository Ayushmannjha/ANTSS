import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { register } from '@/services/authService';
import type { IRegisterRequest } from '@/interfaces/IRegisterRequest';
import { fetchPackages, type Package } from '@/services/packageService';

export function Prescription() {
  // ── Package data from API ─────────────────────────────────────────────────
  const [pkg, setPkg] = useState<Package | null>(null);
  const [pkgLoading, setPkgLoading] = useState(true);
  const [pkgError, setPkgError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setPkgLoading(true);
    fetchPackages(controller.signal)
      .then((packages) => {
        // Pick first active package (the Prescription package)
        const active = packages.find((p) => p.active) ?? packages[0] ?? null;
        setPkg(active);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setPkgError('Could not load package info. Using default pricing.');
        }
      })
      .finally(() => setPkgLoading(false));

    return () => controller.abort();
  }, []);

  // Derive prices: fall back to hardcoded defaults if API is unreachable
  const BASE_PRICE = pkg ? Number(pkg.packagePrice) : 15000;
  const PER_DOCTOR = pkg ? Number(pkg.extraDoctorPrice) : 5000;
  const RMO_PRICE = 5000;
  const PACKAGE_ID = pkg?.id ?? 1;

  const [doctors, setDoctors] = useState<number>(1);
  const [rmo, setRmo] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  // form fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [hospital, setHospital] = useState<string>('');
  const [hospitalPhone, setHospitalPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [stateField, setStateField] = useState<string>('');

  const handleDoctorsChange = (value: number) => {
    if (value < 1) value = 1;
    setDoctors(value);
  };

  const total = BASE_PRICE + Math.max(0, doctors - 1) * PER_DOCTOR + (rmo ? RMO_PRICE : 0);

  const formatted = (n: number) => n.toLocaleString();

  const handleRegister = () => {
    setShowForm(true);
  };

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [serverMessage, setServerMessage] = useState<string>('');
  const submitControllerRef = useRef<AbortController | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !hospital.trim() || !address.trim() || !city.trim() || !stateField.trim()) {
      alert('Please fill name, email, phone, hospital/clinic and complete address (address, city, state)');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    const controller = new AbortController();
    const { signal } = controller;
    submitControllerRef.current = controller;

    const generatedPassword = `P@ss${Math.random().toString(36).slice(-10)}`;

    const payload: IRegisterRequest = {
      fullName: name,
      clinicName: hospital,
      email,
      mobile: phone,
      address: address || '',
      city: city || '',
      state: stateField || '',
      country: '',
      packageId: PACKAGE_ID,   // ← real package id from API
      numDoctors: doctors,
      password: generatedPassword,
      confirmPassword: generatedPassword,
    };

    register(payload, { signal })
      .then((res) => {
        if (!res.success) {
          setSubmitError(res.message ?? 'Registration failed');
          return;
        }
        setConfirmed(true);
        setShowForm(false);
        setServerMessage(res.message ?? 'Registered successfully');
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          setSubmitError('Request cancelled');
          return;
        }
        setSubmitError(err?.message ?? 'Network error');
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => {
          window.scrollTo({ top: document.getElementById('prescription')?.offsetTop || 0, behavior: 'smooth' });
        }, 100);
      });
  };


  return (
    <section id="prescription" className="py-20 bg-slate-800">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-4">Prescription Package</h2>
        <p className="text-gray-300 mb-6">Register a Prescription package. Choose how many doctors you want and whether to add the RMO app.</p>

        <div className="bg-slate-900 p-6 rounded-lg shadow-md">

          {/* Package error notice */}
          {pkgError && (
            <div className="mb-4 text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded px-3 py-2">
              ⚠ {pkgError}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm text-gray-400">Package</label>
            {pkgLoading ? (
              <div className="mt-1 h-5 w-40 rounded bg-slate-700 animate-pulse" />
            ) : (
              <div className="mt-1 text-white font-medium">
                {pkg?.packageName ?? 'Prescription'}
                {pkg?.durationType && (
                  <span className="ml-2 text-xs text-orange-400 font-normal">{pkg.durationType}</span>
                )}
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-400">Base price</div>
            {pkgLoading ? (
              <div className="mt-1 h-8 w-32 rounded bg-slate-700 animate-pulse" />
            ) : (
              <div className="text-2xl font-bold">
                ₹ {formatted(BASE_PRICE)}
                <span className="text-sm text-gray-400 ml-2">
                  + ₹{formatted(PER_DOCTOR)} per extra doctor
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleRegister}
              disabled={pkgLoading}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-md shadow-md hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {pkgLoading ? 'Loading...' : 'Register for Product'}
            </button>

            <div className="text-sm text-gray-400">
              {pkg ? `Package: ${pkg.packageName}` : 'Prescription package'}
            </div>
          </div>


          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <div className="absolute inset-0 bg-black/60" onClick={() => {
                // abort any in-flight submit when closing the modal
                if (submitControllerRef.current) {
                  submitControllerRef.current.abort();
                }
                setShowForm(false);
              }} />
              <form onSubmit={handleSubmit} className="relative z-10 bg-gradient-to-b from-slate-900/95 to-slate-900 p-6 rounded-xl shadow-2xl max-w-2xl w-full">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Complete Registration</h3>
                    <p className="text-sm text-gray-400">Fill details to register for the Prescription package.</p>
                  </div>
                  <button type="button" onClick={() => { if (submitControllerRef.current) submitControllerRef.current.abort(); setShowForm(false); }} className="text-gray-400 hover:text-white rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {submitError && <div className="mb-4 text-sm text-red-300">{submitError}</div>}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Name</label>
                    <input className="w-full mb-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400" value={name} onChange={(e) => setName(e.target.value)} />

                    <label className="block text-sm text-gray-400 mb-1">Email</label>
                    <input className="w-full mb-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label className="block text-sm text-gray-400 mb-1">Phone</label>
                    <input className="w-full mb-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Hospital / Clinic</label>
                    <input className="w-full mb-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400" value={hospital} onChange={(e) => setHospital(e.target.value)} />

                    <label className="block text-sm text-gray-400 mb-1">Hospital phone</label>
                    <input className="w-full mb-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400" value={hospitalPhone} onChange={(e) => setHospitalPhone(e.target.value)} />

                    <label className="block text-sm text-gray-400 mb-1">Address</label>
                    <input className="w-full mb-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">City</label>
                    <input className="w-full mb-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400" value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-gray-400 mb-1">State</label>
                    <input className="w-full mb-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400" value={stateField} onChange={(e) => setStateField(e.target.value)} />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 mt-4">
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-300 mr-2">Number of doctors</label>
                    <div className="flex items-center gap-2 bg-slate-800 p-1 rounded">
                      <button type="button" className="px-2 py-1 bg-slate-700 rounded text-white" onClick={() => handleDoctorsChange(doctors - 1)}>-</button>
                      <input type="number" min={1} value={doctors} onChange={(e) => handleDoctorsChange(Number(e.target.value))} className="w-16 text-center bg-slate-800 border border-slate-700 rounded px-2 py-1" />
                      <button type="button" className="px-2 py-1 bg-orange-500 text-white rounded" onClick={() => handleDoctorsChange(doctors + 1)}>+</button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input id="rmo-form" type="checkbox" checked={rmo} onChange={(e) => setRmo(e.target.checked)} className="w-4 h-4" />
                    <label htmlFor="rmo-form" className="text-sm text-gray-300">Add RMO App ({formatted(RMO_PRICE)})</label>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <div className="text-sm text-gray-400">Total price</div>
                    <div className="text-2xl font-bold">₹ {formatted(total)}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => { if (submitControllerRef.current) submitControllerRef.current.abort(); setShowForm(false); }} className="px-4 py-2 rounded border border-slate-700">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded shadow">
                      {isSubmitting ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                      ) : null}
                      {isSubmitting ? 'Registering...' : 'Complete Registration'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {confirmed && (
            <div className="mt-6 p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-100 backdrop-blur-md shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="font-semibold text-lg flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Registration Successfully Submitted!
                </div>
                <div className="text-sm text-emerald-200/90">
                  You registered the Prescription package for <strong className="text-white">{doctors}</strong> doctor(s){rmo ? ' with RMO App' : ''}. Total: <strong className="text-white">₹{formatted(total)}</strong>.
                </div>
                {serverMessage && <div className="text-xs text-emerald-300 bg-emerald-900/40 px-2 py-1 rounded inline-block mt-1">Status: {serverMessage}</div>}
                <div className="text-xs text-emerald-400/80 border-t border-emerald-500/20 pt-2 mt-2">
                  <div>Hospital/Clinic: {hospital}</div>
                  <div>Address: {address}, {city}, {stateField}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <p className="text-xs text-emerald-300/80 text-center">Approved by admin? Login here:</p>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium px-6 py-2.5 rounded-lg shadow-lg hover:shadow-orange-500/20 transition-all text-center"
                >
                  Log In to Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
