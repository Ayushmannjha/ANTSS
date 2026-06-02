import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowLeft, KeyRound } from 'lucide-react';
import { loginUser, forgotPassword, resetPassword } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type AuthView = 'login' | 'forgot' | 'reset';

export function LoginPage() {
  const [view, setView] = useState<AuthView>('login');
  
  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Forgot / Reset fields
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await loginUser(email, password);
      if (res.success && res.data) {
        login({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          role: res.data.user.role,
          userId: res.data.user.id,
          email: res.data.user.email,
          fullName: res.data.user.fullName,
          status: res.data.user.status,
          userType: res.data.user.userType,
        });

        // Redirect based on role
        if (res.data.user.role === 'ROLE_ADMIN') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(res.message ?? 'Invalid email or password');
      }
    } catch (err: any) {
      setError(err?.message ?? 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await forgotPassword(email);
      if (res.success) {
        setSuccess(res.message || 'Reset token sent to your email.');
        // Switch to reset password view automatically
        setTimeout(() => {
          setView('reset');
          setSuccess('');
        }, 3000);
      } else {
        setError(res.message || 'Failed to send reset link.');
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetToken.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await resetPassword(resetToken, newPassword, confirmPassword);
      if (res.success) {
        setSuccess(res.message || 'Password reset successfully.');
        setTimeout(() => {
          setView('login');
          setResetToken('');
          setNewPassword('');
          setConfirmPassword('');
          setSuccess('');
        }, 3000);
      } else {
        setError(res.message || 'Failed to reset password.');
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-955 flex items-center justify-center px-4 overflow-hidden">
      {/* Background shape overlays */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Login / Recovery Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
          
          {/* Header depending on View */}
          {view === 'login' && (
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                Sign in to manage your medical entities and subscriptions.
              </p>
            </div>
          )}

          {view === 'forgot' && (
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Forgot Password
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                Enter your registered email below to receive a password reset token.
              </p>
            </div>
          )}

          {view === 'reset' && (
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Reset Password
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                Enter your reset token and configure your new password.
              </p>
            </div>
          )}

          {/* Feedback Messages */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm text-center animate-shake">
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-sm text-center">
              ✓ {success}
            </div>
          )}

          {/* Views render */}
          {view === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email Address
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <Mail className="w-5 h-5" />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@hospital.com"
                    className="w-full pl-10 pr-4 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={() => {
                      setView('forgot');
                      setError('');
                      setSuccess('');
                    }}
                    className="text-xs text-orange-400 hover:text-orange-300 transition-colors font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <Lock className="w-5 h-5" />
                  </span>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 text-white"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all border-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </Button>
            </form>
          )}

          {view === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="forgot-email" className="text-sm font-medium text-gray-300">
                  Registered Email Address
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <Mail className="w-5 h-5" />
                  </span>
                  <Input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@hospital.com"
                    className="w-full pl-10 pr-4 text-white"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all border-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Token...</span>
                  </>
                ) : (
                  <span>Send Reset Token</span>
                )}
              </Button>

              <div className="flex flex-col gap-2.5 pt-2 text-center text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setView('login');
                    setError('');
                    setSuccess('');
                  }}
                  className="text-gray-400 hover:text-white flex items-center justify-center gap-1.5 font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setView('reset');
                    setError('');
                    setSuccess('');
                  }}
                  className="text-orange-400 hover:text-orange-300 text-xs font-semibold"
                >
                  Already have a token? Reset Password
                </button>
              </div>
            </form>
          )}

          {view === 'reset' && (
            <form onSubmit={handleResetSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="reset-token" className="text-sm font-medium text-gray-300">
                  Reset Token
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <KeyRound className="w-5 h-5" />
                  </span>
                  <Input
                    id="reset-token"
                    type="text"
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    placeholder="Enter reset token from email"
                    className="w-full pl-10 pr-4 text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-sm font-medium text-gray-300">
                  New Password
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <Lock className="w-5 h-5" />
                  </span>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full pl-10 pr-4 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <Lock className="w-5 h-5" />
                  </span>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full pl-10 pr-4 text-white"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all border-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <span>Reset Password</span>
                )}
              </Button>

              <div className="flex flex-col gap-2.5 pt-2 text-center text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setView('login');
                    setError('');
                    setSuccess('');
                  }}
                  className="text-gray-400 hover:text-white flex items-center justify-center gap-1.5 font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Cancel & Back to Sign In
                </button>
              </div>
            </form>
          )}

          {view === 'login' && (
            <div className="text-center mt-6 text-sm text-gray-500">
              Need an account?{' '}
              <Link to="/" className="text-orange-400 hover:text-orange-300 font-medium underline">
                Register now
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
