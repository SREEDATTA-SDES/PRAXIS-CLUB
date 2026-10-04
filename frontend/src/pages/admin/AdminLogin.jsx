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
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src={COLLEGE_BRAND.logoUrl} alt="SDES Logo" className="h-12 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
            <div className="h-8 w-[1px] bg-praxis-border/50" />
            <img src="https://ik.imagekit.io/SDES/LOGOS/Grunge%20PRAXIS%20Typography%20with%20Butterflies.png" alt="PRAXIS Logo" className="h-12 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] translate-x-2" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-praxis-cyan block bg-praxis-cyan/10 py-1.5 px-4 rounded-full inline-block border border-praxis-cyan/20">
            SDES CSE-ALLIED &bull; SECURE CONSOLE
          </span>
          <h1 className="text-3xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 font-display tracking-widest drop-shadow-lg">
            PRAXIS Admin Portal
          </h1>
          <p className="text-xs text-praxis-secondary uppercase tracking-[0.2em]">
            Restricted Access
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 md:p-10 rounded-[2rem] liquid-glass-elevated border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-praxis-cyan via-praxis-glow to-praxis-accent opacity-70" />
          
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-cinematic uppercase tracking-widest text-center flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
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
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-praxis-muted/50 focus:outline-none focus:border-praxis-cyan focus:bg-black/60 transition-all text-xs font-cinematic tracking-wider"
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
                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-praxis-muted/50 focus:outline-none focus:border-praxis-cyan focus:bg-black/60 transition-all text-xs font-cinematic tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-praxis-muted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-praxis-cyan via-blue-600 to-praxis-accent hover:opacity-90 text-white uppercase font-bold tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_30px_rgba(0,242,254,0.5)] disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Initialize Console'}</span>
              <ArrowRight size={16} />
            </button>
          </form>



        </div>

      </div>
    </div>
  );
};
