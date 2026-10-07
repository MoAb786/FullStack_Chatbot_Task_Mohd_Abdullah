import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authStorage } from '../../lib/api';
import { useTheme } from '../../context/ThemeContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = authStorage.isAuthenticated();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Courses', path: '/courses' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    authStorage.removeToken();
    navigate('/admin/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-canvas/85 dark:bg-canvas/90 backdrop-blur-md border-b border-hairline transition-colors duration-200">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Brand + Telemetry Badge */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-canvas shadow-xs group-hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-[18px]">flight_takeoff</span>
            </div>
            <span className="font-heading-md font-semibold text-[17px] text-ink tracking-tight">
              DroneTV Aero
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface-container-low border border-hairline">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono-eyebrow text-[11px] text-mute uppercase tracking-wider">
              SYS // ONLINE 99.98%
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8 h-16">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`h-full inline-flex items-center font-button-md text-[14px] transition-colors border-b-2 ${
                isActive(link.path)
                  ? 'text-ink border-ink font-medium'
                  : 'text-body hover:text-ink border-transparent'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg border border-hairline bg-surface-container-low hover:bg-surface-container text-ink flex items-center justify-center transition-colors"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle dark mode"
          >
            <span className="material-symbols-outlined text-[18px]">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 font-mono-eyebrow text-[12px] text-ink bg-surface-container-low hover:bg-surface-container px-3 py-1.5 rounded-md border border-hairline uppercase tracking-wider transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">dashboard</span>
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="font-mono-eyebrow text-[12px] text-mute hover:text-error uppercase tracking-wider transition-colors px-2 py-1"
                title="Logout"
              >
                Exit
              </button>
            </div>
          ) : (
            <Link
              to="/admin/login"
              className="hidden sm:inline-flex items-center font-mono-eyebrow text-[12px] text-mute hover:text-ink uppercase tracking-wider transition-colors px-2 py-1"
            >
              Admin
            </Link>
          )}

          <Link
            to="/chat"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-ink text-canvas font-button-md text-[13px] hover:opacity-90 transition-opacity shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="hidden sm:inline">Chat with Assistant</span>
            <span className="sm:hidden">Assistant</span>
          </Link>

          <Link
            to="/admin"
            className="w-8 h-8 rounded-full bg-surface-container-low border border-hairline flex items-center justify-center text-ink hover:bg-surface-container transition-colors"
            title="User Profile / Admin"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-body hover:text-ink rounded-md"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-hairline bg-surface-container-lowest px-6 py-4 space-y-2 animate-in fade-in duration-150">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-[14px] font-medium ${
                isActive(link.path) ? 'text-ink font-semibold' : 'text-body hover:text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-hairline flex items-center justify-between">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[13px] font-mono-eyebrow uppercase tracking-wider text-mute hover:text-ink"
            >
              Admin Portal
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[13px] text-ink font-medium"
            >
              Enquire
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
