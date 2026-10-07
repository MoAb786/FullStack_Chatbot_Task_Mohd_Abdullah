import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api, authStorage } from '../lib/api';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@dronetv.in');
  const [password, setPassword] = useState('Admin@DroneTV2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStorage.isAuthenticated()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      await api.login(email.trim(), password);
      navigate('/admin');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Invalid credentials or expired cryptographic token. Clearance logged to audit log #TK-8492.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-10 px-4 sm:px-6 bg-canvas">
      <div className="w-full max-w-[480px] bg-surface-container-lowest border border-hairline rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Terminal Header Info */}
        <div className="flex items-center justify-between pb-6 border-b border-hairline mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-ink text-canvas flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">flight_takeoff</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading-md text-[15px] font-semibold text-ink tracking-tight">
                DroneTV Aero
              </span>
              <span className="font-mono-eyebrow text-[10px] text-mute uppercase">
                SECURITY GATEWAY // NODE 04
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-low border border-hairline">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono-eyebrow text-[10px] text-ink uppercase">RESTRICTED</span>
          </div>
        </div>

        {/* Headline */}
        <div className="mb-6">
          <h1 className="font-heading-lg text-[22px] sm:text-[24px] font-semibold text-ink tracking-tight mb-2">
            Flight Operations Portal
          </h1>
          <p className="font-body-md text-[13.5px] sm:text-[14px] text-body">
            Restricted access for certified personnel, ground flight engineers &amp; autonomous swarm directors.
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="mb-6 p-3 rounded-lg bg-surface-container-low border border-hairline flex items-center justify-between text-[12px]">
          <div className="font-mono text-mute">
            <span className="text-ink font-semibold">Demo:</span> admin@dronetv.in / Admin@DroneTV2026
          </div>
          <button
            type="button"
            onClick={() => {
              setEmail('admin@dronetv.in');
              setPassword('Admin@DroneTV2026');
            }}
            className="text-ink font-medium hover:underline text-[11px] font-mono uppercase"
          >
            Fill
          </button>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 animate-in fade-in duration-150">
            <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-xl shrink-0 mt-0.5">
              error_outline
            </span>
            <div className="flex-1">
              <p className="font-button-md text-[13px] text-red-600 dark:text-red-400 font-semibold">
                Security Clearance Rejected
              </p>
              <p className="font-body-sm text-[12px] text-body mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Form Terminal */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-mono-eyebrow text-[11px] uppercase tracking-wider text-body">
                Operational Email
              </label>
              <span className="font-mono-eyebrow text-[11px] text-mute">TAC-ID FORMAT</span>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-mute text-lg pointer-events-none">
                alternate_email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dronetv.in"
                className="w-full bg-surface-container-low text-ink placeholder:text-mute font-body-md text-[13px] pl-9 pr-4 py-2.5 border border-hairline rounded-lg transition-colors focus:outline-hidden focus:border-ink"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-mono-eyebrow text-[11px] uppercase tracking-wider text-body">
                Security Passcode / Token
              </label>
              <span className="font-mono-eyebrow text-[11px] text-ink">YUBIKEY READY</span>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-mute text-lg pointer-events-none">
                key
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full bg-surface-container-low text-ink placeholder:text-mute font-body-md text-[13px] pl-9 pr-10 py-2.5 border border-hairline rounded-lg transition-colors focus:outline-hidden focus:border-ink"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 text-mute hover:text-ink transition-colors p-1"
                aria-label="Toggle password visibility"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Remember Terminal */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-hairline text-ink focus:ring-ink cursor-pointer accent-ink"
              />
              <span className="font-body-sm text-[12px] text-body group-hover:text-ink transition-colors">
                Remember terminal for 12 hours
              </span>
            </label>
            <span className="font-mono-eyebrow text-[10px] text-mute">SESSION: 720m</span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-ink hover:opacity-90 text-canvas font-button-md text-[14px] py-2.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-opacity shadow-xs disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block h-4 w-4 border-2 border-canvas border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Telemetry Clearance...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Sign In to Flight Terminal</span>
                  <span className="material-symbols-outlined text-lg">flight_takeoff</span>
                </span>
              )}
            </button>
          </div>
        </form>

        {/* Footer Badges */}
        <div className="mt-8 pt-6 space-y-4 border-t border-hairline">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 rounded-lg border border-hairline bg-surface-container-low flex items-center gap-2.5">
              <span className="material-symbols-outlined text-ink text-base">shield_lock</span>
              <div className="flex flex-col">
                <span className="font-mono-eyebrow text-[10px] text-ink uppercase font-semibold">
                  TLS 1.3 / AES-256
                </span>
                <span className="font-body-sm text-[11px] text-mute">Air-Gapped Relay</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-hairline bg-surface-container-low flex items-center gap-2.5">
              <span className="material-symbols-outlined text-ink text-base">satellite_alt</span>
              <div className="flex flex-col">
                <span className="font-mono-eyebrow text-[10px] text-ink uppercase font-semibold">
                  Telemetry Synced
                </span>
                <span className="font-body-sm text-[11px] text-mute">Low-Orbit Ping 12ms</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 pt-2 text-center">
            <Link
              to="/"
              className="font-body-sm text-[12px] text-body hover:text-ink transition-colors flex items-center gap-1"
            >
              ← Return to public website
            </Link>
            <p className="font-mono-eyebrow text-[10px] text-mute uppercase tracking-wider">
              DRONETV AI AVIONICS // ORBITAL SUITE // RESTRICTED FLIGHT OPERATIONS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
