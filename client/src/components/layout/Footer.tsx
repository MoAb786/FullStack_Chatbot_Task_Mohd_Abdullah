import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-hairline transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-heading-md text-base text-ink font-semibold">
                DroneTV Aero
              </span>
            </Link>
            <p className="font-body-sm text-[13px] text-body leading-relaxed">
              Autonomous flight operations, technical telemetry, and mission-critical AI assistance infrastructure.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="font-mono-eyebrow text-[11px] text-mute uppercase">
                Telemetry Node US-EAST-1 Active
              </span>
            </div>
          </div>

          {/* Architecture */}
          <div>
            <div className="font-mono-eyebrow text-[11px] text-ink uppercase mb-3 tracking-wider font-semibold">
              Architecture
            </div>
            <ul className="space-y-2 font-body-sm text-[13px]">
              <li className="text-body hover:text-ink transition-colors">
                <Link to="/services">Flight Operations</Link>
              </li>
              <li className="text-body hover:text-ink transition-colors">
                <Link to="/chat">AI Lead Matrix</Link>
              </li>
              <li className="text-body hover:text-ink transition-colors">
                <Link to="/services">Avionics API</Link>
              </li>
              <li className="text-body hover:text-ink transition-colors">
                <Link to="/services">Signal Monitoring</Link>
              </li>
            </ul>
          </div>

          {/* Academy & Support */}
          <div>
            <div className="font-mono-eyebrow text-[11px] text-ink uppercase mb-3 tracking-wider font-semibold">
              Academy &amp; Support
            </div>
            <ul className="space-y-2 font-body-sm text-[13px]">
              <li className="text-body hover:text-ink transition-colors">
                <Link to="/courses">Pilot Certifications</Link>
              </li>
              <li className="text-body hover:text-ink transition-colors">
                <Link to="/courses">Autonomous Safety Specs</Link>
              </li>
              <li className="text-body hover:text-ink transition-colors">
                <Link to="/contact">Developer Manuals</Link>
              </li>
              <li className="text-body hover:text-ink transition-colors">
                <Link to="/contact">Incident Response</Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Specs */}
          <div>
            <div className="font-mono-eyebrow text-[11px] text-ink uppercase mb-3 tracking-wider font-semibold">
              Compliance &amp; Specs
            </div>
            <div className="font-mono-eyebrow text-[11px] text-mute bg-surface-container-low p-3 rounded-md border border-hairline space-y-1">
              <div>ID: DTV-CORP-SYS</div>
              <div>ENCRYPT: AES-256-GCM</div>
              <div>LATENCY: 14ms RT</div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-hairline flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-body-sm text-[12px] text-mute">
            © {new Date().getFullYear()} DroneTV Systems Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6 font-body-sm text-[12px] text-mute">
            <Link to="/contact" className="hover:text-ink transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-ink transition-colors">
              Terms of Aerospace Service
            </Link>
            <Link to="/admin/login" className="hover:text-ink transition-colors">
              Admin Gateway
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
