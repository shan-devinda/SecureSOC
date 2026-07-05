"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, Eye, EyeOff, Lock } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('admin@securesoc.com');
  const [password, setPassword] = useState('password');

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: 'var(--soc-bg-dark)' }}>
      {/* Background Grid Pattern */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59,130,246,0.1) 1px, transparent 0)',
        backgroundSize: '30px 30px'
      }} />
      {/* Glow */}
      <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)', zIndex: 0 }} />

      <div className="position-relative" style={{ zIndex: 1, width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
            style={{ width: '64px', height: '64px', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.4)' }}>
            <ShieldAlert size={32} className="text-primary" />
          </div>
          <h3 className="fw-bold text-white mb-1">Secure<span className="text-primary">SOC</span></h3>
          <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Security Operations Center</p>
        </div>

        {/* Card */}
        <div className="soc-card p-4">
          <h5 className="fw-bold text-white mb-1">Sign In</h5>
          <p className="text-muted mb-4" style={{ fontSize: '0.85rem' }}>Enter your credentials to access the platform</p>

          <div className="mb-3">
            <label className="form-label text-muted mb-1" style={{ fontSize: '0.85rem' }}>Email Address</label>
            <input
              type="email"
              className="form-control bg-dark border-secondary text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="analyst@organization.com"
            />
          </div>
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <label className="form-label text-muted mb-0" style={{ fontSize: '0.85rem' }}>Password</label>
              <a href="#" className="text-primary text-decoration-none" style={{ fontSize: '0.8rem' }}>Forgot password?</a>
            </div>
            <div className="position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control bg-dark border-secondary text-white pe-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0 bg-transparent text-muted"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="mb-4 d-flex align-items-center justify-content-between">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="remember" />
              <label className="form-check-label text-muted" htmlFor="remember" style={{ fontSize: '0.85rem' }}>Remember me</label>
            </div>
            <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '0.8rem' }}>
              <Lock size={13} /> MFA Enabled
            </div>
          </div>

          <Link href="/" className="btn btn-primary w-100 fw-semibold">Sign In to Dashboard</Link>

          <div className="mt-4 p-3 rounded" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <p className="text-muted mb-1" style={{ fontSize: '0.75rem', fontWeight: 600 }}>DEMO CREDENTIALS</p>
            <div className="text-muted" style={{ fontSize: '0.78rem' }}>
              <div>👑 Super Admin: admin@securesoc.com</div>
              <div>🔍 Analyst: analyst@securesoc.com</div>
              <div>👁 Viewer: viewer@securesoc.com</div>
            </div>
          </div>
        </div>

        <p className="text-center text-muted mt-3" style={{ fontSize: '0.78rem' }}>
          © 2026 SecureSOC Platform · v2.1.0 · <span className="text-success">All Systems Operational</span>
        </p>
      </div>
    </div>
  );
}
