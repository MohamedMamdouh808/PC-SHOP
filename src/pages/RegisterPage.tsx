import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icons } from '../components/Icons';
import '../styles/pages/RegisterPage.css';
import { api } from '../lib/api';
import { registerSchema } from 'shared';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate Match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    // Validate Schema
    const validation = registerSchema.safeParse({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      await api.post('/auth/register', validation.data);
      setSuccess(true);
    } catch (err: any) {
      let message = 'Registration failed. Please try again.';
      if (err.response?.data?.errors?.[0]?.message) {
        message = err.response.data.errors[0].message;
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message === 'Network Error') {
        message = 'Cannot connect to server. Please make sure the backend is running (npm run dev).';
      }
      setError(message);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-70px)] flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
          <div className="glass rounded-3xl p-10 text-center shadow-2xl">
            <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icons.CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>
            <p className="text-white/60 mb-8 leading-relaxed">
              We've sent a verification link to <span className="text-white font-medium">{formData.email}</span>. 
              Please verify your account to continue.
            </p>
            <Link 
              to="/login" 
              className="inline-block bg-brand-primary hover:bg-brand-secondary py-3.5 px-8 rounded-2xl font-bold transition-all hover:scale-105"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24 mt-16">
      <div className="w-full max-w-xl animate-slide-up">
        <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/20 blur-3xl rounded-full" />
          
          <div className="relative">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-white/60 mb-10">Join the elite PC building community</p>

            {error && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 ml-1">First Name</label>
                  <div className="relative group">
                    <Icons.User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-brand-primary transition-colors" />
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all hover:bg-white/10 hover:border-white/20 hover:placeholder-white/70"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 ml-1">Last Name</label>
                  <div className="relative group">
                    <Icons.User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-brand-primary transition-colors" />
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all hover:bg-white/10 hover:border-white/20 hover:placeholder-white/70"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 ml-1">Email Address</label>
                <div className="relative group">
                  <Icons.Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-brand-primary transition-colors" />
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all hover:bg-white/10 hover:border-white/20 hover:placeholder-white/70"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 ml-1">Password</label>
                  <div className="relative group">
                    <Icons.Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-brand-primary transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all hover:bg-white/10 hover:border-white/20 hover:placeholder-white/70"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors focus:outline-none"
                      tabIndex={-1}
                    >
                      {showPassword ? <Icons.EyeOff className="w-5 h-5" /> : <Icons.Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-white/40 ml-1">Min 8 chars, 1 uppercase, 1 lowercase, 1 number</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 ml-1">Confirm Password</label>
                  <div className="relative group">
                    <Icons.Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-brand-primary transition-colors" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all hover:bg-white/10 hover:border-white/20 hover:placeholder-white/70"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors focus:outline-none"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <Icons.EyeOff className="w-5 h-5" /> : <Icons.Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-primary hover:bg-brand-secondary py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <Icons.Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <Icons.ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-white/60 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-secondary font-bold hover:text-white hover:underline transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
