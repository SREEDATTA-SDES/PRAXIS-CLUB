import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { COLLEGE_BRAND } from '../../data/initialData';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);

    // Trim trailing/leading spaces from password to avoid accidental errors
    const res = await login(username.trim(), password.trim());
    setLoading(false);

    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message || 'Authentication failed. Please verify credentials.');
    }
  };



  return (
    <div className="min-h-screen bg-[#07090D] flex flex-col justify-center items-center p-4 relative">
      {/* Background illumination */}
      <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none" />

      {/* Back to public site */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-xs uppercase tracking-widest text-praxis-secondary hover:text-white flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Website
      </Link>

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img src={COLLEGE_BRAND.logoUrl} alt="SDES Logo" className="h-10 w-auto object-contain" />
            <div className="h-6 w-[1px] bg-praxis-border" />
            <img src={COLLEGE_BRAND.praxisLogoUrl} alt="PRAXIS Logo" className="h-9 w-auto object-contain" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-praxis-cyan block">
            SDES CSE-ALLIED &bull; SECURE CONSOLE
          </span>
          <h1 className="text-2xl font-bold uppercase text-white font-display tracking-wider">
            PRAXIS Admin Portal
          </h1>
          <p className="text-xs text-praxis-secondary">
            Secure Console for Ecosystem Administrators
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-xl bg-praxis-card border border-praxis-border shadow-2xl">
          {error && (
            <div className="mb-4 p-3 rounded bg-red-950/60 border border-red-500/50 text-red-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-praxis-secondary font-semibold uppercase tracking-wider mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-praxis-muted" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin username"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-praxis-surface border border-praxis-border text-white placeholder-praxis-muted focus:outline-none focus:border-praxis-cyan text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-praxis-secondary font-semibold uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-praxis-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secret password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-praxis-surface border border-praxis-border text-white placeholder-praxis-muted focus:outline-none focus:border-praxis-cyan text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-praxis-muted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white uppercase font-bold tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-cinematic-blue disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In To Console'}</span>
              <ArrowRight size={14} />
            </button>
          </form>



        </div>

      </div>
    </div>
  );
};
