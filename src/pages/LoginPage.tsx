import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icons } from '../components/Icons';
import '../styles/pages/LoginPage.css';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { loginSchema } from '../shared/src/schemas';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validate
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.accessToken, res.data.user);
      navigate('/');
    } catch (err: any) {
      const message = err.response?.data?.errors?.[0]?.message || 'Login failed. Please check your credentials.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24 mt-16">
      <div className="w-full max-w-md animate-slide-up">
        <div className="glass rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Decorative Gradient Blob */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-primary/20 blur-3xl rounded-full" />
          
          <div className="relative">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-white/60 mb-8">Sign in to your PC Shop account</p>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 ml-1">Email Address</label>
                <div className="relative group">
                  <Icons.Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-brand-primary transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all hover:bg-white/10 hover:border-white/20 hover:placeholder-white/70"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-medium text-white/80">Password</label>
                  <Link to="/forgot-password" className="text-xs text-brand-secondary hover:text-white hover:underline transition-colors">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <Icons.Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-brand-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all hover:bg-white/10 hover:border-white/20 hover:placeholder-white/70"
                    placeholder="••••••••"
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
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-primary hover:bg-brand-secondary py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <Icons.Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <Icons.ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-white/60 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-brand-secondary font-bold hover:text-white hover:underline transition-colors">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
