import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AvionicsHudCanvas } from '../components/home/AvionicsHudCanvas';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleQuickPrompt = (prompt: string) => {
    navigate(`/chat?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Atmospheric Canvas */}
      <div className="relative w-full border-b border-hairline bg-canvas">
        {/* SECTION 1: HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Copy Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest border border-hairline mb-6 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-ink"></span>
                <span className="font-mono-eyebrow text-xs text-body uppercase tracking-wider">
                  AEROSPACE AUTONOMY &amp; ACADEMY v2.4
                </span>
              </div>

              {/* Hero Headline */}
              <h1 className="font-display-xl text-[34px] sm:text-[46px] lg:text-[50px] tracking-[-2px] text-ink mb-6 font-semibold leading-[1.12]">
                Drone Services &amp; Training,{' '}
                <span className="text-body font-normal">Simplified.</span>
              </h1>

              {/* Hero Supporting Paragraph */}
              <p className="font-body-lg text-[15px] sm:text-[16px] text-body max-w-2xl mb-8 leading-relaxed">
                Enterprise aerial intelligence, multispectral surveying, and pilot accreditation powered by next-generation autonomous flight systems and guided support.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 mb-10">
                <Link
                  to="/chat"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-ink text-canvas font-button-md text-[14px] hover:opacity-90 transition-opacity shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px] mr-2">chat_bubble</span>
                  Start Conversation
                </Link>

                <a
                  href="#services-matrix"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-surface-container-lowest border border-hairline text-ink font-button-md text-[14px] hover:bg-surface-container-low transition-colors shadow-xs"
                >
                  Explore Services
                  <span className="material-symbols-outlined text-[16px] ml-1.5 text-mute">
                    arrow_downward
                  </span>
                </a>
              </div>

              {/* Micro Telemetry Chips */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-hairline w-full">
                <div className="flex items-center gap-2">
                  <span className="font-mono-eyebrow text-xs text-mute">AIRSPACE:</span>
                  <span className="font-mono-eyebrow text-xs text-ink font-semibold">
                    CLASS G/E ACTIVE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono-eyebrow text-xs text-mute">LATENCY:</span>
                  <span className="font-mono-eyebrow text-xs text-ink font-semibold">
                    12.4ms DIRECT
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono-eyebrow text-xs text-mute">ENCRYPTION:</span>
                  <span className="font-mono-eyebrow text-xs text-ink font-semibold">
                    AES-256-GCM
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Visual: Avionics HUD & Telemetry Screen (5 cols) */}
            <div className="lg:col-span-5 relative w-full">
              <AvionicsHudCanvas />
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 2: 3-PILLAR FOUNDATION CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Link
            to="/services"
            className="p-6 sm:p-7 rounded-xl bg-surface-container-lowest border border-hairline hover:border-body transition-colors flex flex-col justify-between group shadow-xs"
          >
            <div>
              <div className="w-10 h-10 rounded-md bg-surface-container-low border border-hairline flex items-center justify-center text-ink mb-6">
                <span className="material-symbols-outlined text-xl">sensors</span>
              </div>
              <div className="font-mono-eyebrow text-xs text-mute uppercase tracking-wider mb-2">
                OPERATIONS DIVISION
              </div>
              <h3 className="font-heading-md text-[18px] font-semibold text-ink mb-2">Drone Services</h3>
              <p className="font-body-md text-[14px] text-body leading-relaxed">
                Enterprise sensor payloads, precision photogrammetry, and automated site capture optimized for infrastructure longevity and audit integrity.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between text-mute group-hover:text-ink transition-colors">
              <span className="font-mono-eyebrow text-xs">SPEC: PAYLOAD READY</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>

          {/* Card 2 */}
          <Link
            to="/courses"
            className="p-6 sm:p-7 rounded-xl bg-surface-container-lowest border border-hairline hover:border-body transition-colors flex flex-col justify-between group shadow-xs"
          >
            <div>
              <div className="w-10 h-10 rounded-md bg-surface-container-low border border-hairline flex items-center justify-center text-ink mb-6">
                <span className="material-symbols-outlined text-xl">school</span>
              </div>
              <div className="font-mono-eyebrow text-xs text-mute uppercase tracking-wider mb-2">
                CERTIFICATION TRACK
              </div>
              <h3 className="font-heading-md text-[18px] font-semibold text-ink mb-2">Professional Training</h3>
              <p className="font-body-md text-[14px] text-body leading-relaxed">
                Structured flight training curriculum from foundational spatial maneuvering to advanced commercial licensing and BVLOS compliance.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between text-mute group-hover:text-ink transition-colors">
              <span className="font-mono-eyebrow text-xs">CURRICULUM: FAA/DGCA STANDARD</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>

          {/* Card 3 */}
          <Link
            to="/chat"
            className="p-6 sm:p-7 rounded-xl bg-surface-container-lowest border border-hairline hover:border-body transition-colors flex flex-col justify-between group shadow-xs"
          >
            <div>
              <div className="w-10 h-10 rounded-md bg-surface-container-low border border-hairline flex items-center justify-center text-ink mb-6">
                <span className="material-symbols-outlined text-xl">support_agent</span>
              </div>
              <div className="font-mono-eyebrow text-xs text-mute uppercase tracking-wider mb-2">
                INTELLIGENT TELEMETRY
              </div>
              <h3 className="font-heading-md text-[18px] font-semibold text-ink mb-2">Expert Support</h3>
              <p className="font-body-md text-[14px] text-body leading-relaxed">
                AI-assisted diagnostic guidance, systematic flight logs review, and direct mission specialist dispatch for rapid incident resolution.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between text-mute group-hover:text-ink transition-colors">
              <span className="font-mono-eyebrow text-xs">STATUS: 24/7 ASSIST ACTIVE</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* SECTION 3: CORE SERVICES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16 w-full border-t border-hairline scroll-mt-16" id="services-matrix">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="font-mono-eyebrow text-xs text-mute tracking-wider uppercase mb-2">
              ENTERPRISE SOLUTIONS
            </div>
            <h2 className="font-heading-lg text-[26px] sm:text-[28px] font-semibold text-ink">
              Autonomous Aerial Services
            </h2>
          </div>
          <p className="font-body-md text-[14px] text-body max-w-md mt-3 md:mt-0">
            Engineered for industrial accuracy across utility, geospatial, cinematic, and physical protection verticals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Service 1 */}
          <div className="rounded-xl bg-surface-container-lowest border border-hairline p-6 flex flex-col justify-between hover:border-body transition-colors shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-9 h-9 rounded-md bg-surface-container-low border border-hairline flex items-center justify-center text-ink">
                  <span className="material-symbols-outlined text-lg">domain</span>
                </div>
                <span className="px-2 py-0.5 rounded font-mono-eyebrow text-[10px] bg-surface-container-low text-mute border border-hairline uppercase">
                  UTILITY
                </span>
              </div>
              <h4 className="font-heading-md text-base text-ink font-semibold mb-2">
                Infrastructure &amp; Asset Inspection
              </h4>
              <p className="font-body-sm text-[12px] text-body mb-6 leading-relaxed">
                Non-destructive structural scanning of power grids, wind turbines, bridges, and high-altitude cell towers.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center text-xs font-mono-eyebrow text-ink hover:text-body group"
            >
              <span>Learn More</span>
              <span className="material-symbols-outlined text-xs ml-1 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Service 2 */}
          <div className="rounded-xl bg-surface-container-lowest border border-hairline p-6 flex flex-col justify-between hover:border-body transition-colors shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-9 h-9 rounded-md bg-surface-container-low border border-hairline flex items-center justify-center text-ink">
                  <span className="material-symbols-outlined text-lg">agriculture</span>
                </div>
                <span className="px-2 py-0.5 rounded font-mono-eyebrow text-[10px] bg-surface-container-low text-mute border border-hairline uppercase">
                  GEOSPATIAL
                </span>
              </div>
              <h4 className="font-heading-md text-base text-ink font-semibold mb-2">
                Precision Ag &amp; Multispectral
              </h4>
              <p className="font-body-sm text-[12px] text-body mb-6 leading-relaxed">
                NDVI crop health analytics, volumetric terrain profiling, and high-resolution spatial drainage models.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center text-xs font-mono-eyebrow text-ink hover:text-body group"
            >
              <span>Learn More</span>
              <span className="material-symbols-outlined text-xs ml-1 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Service 3 */}
          <div className="rounded-xl bg-surface-container-lowest border border-hairline p-6 flex flex-col justify-between hover:border-body transition-colors shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-9 h-9 rounded-md bg-surface-container-low border border-hairline flex items-center justify-center text-ink">
                  <span className="material-symbols-outlined text-lg">videocam</span>
                </div>
                <span className="px-2 py-0.5 rounded font-mono-eyebrow text-[10px] bg-surface-container-low text-mute border border-hairline uppercase">
                  BROADCAST
                </span>
              </div>
              <h4 className="font-heading-md text-base text-ink font-semibold mb-2">
                Cinematography &amp; Capture
              </h4>
              <p className="font-body-sm text-[12px] text-body mb-6 leading-relaxed">
                High-framerate 8K raw aerial capture, dynamic FPV tracking, and cinematic dual-operator gimbal arrays.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center text-xs font-mono-eyebrow text-ink hover:text-body group"
            >
              <span>Learn More</span>
              <span className="material-symbols-outlined text-xs ml-1 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Service 4 */}
          <div className="rounded-xl bg-surface-container-lowest border border-hairline p-6 flex flex-col justify-between hover:border-body transition-colors shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-9 h-9 rounded-md bg-surface-container-low border border-hairline flex items-center justify-center text-ink">
                  <span className="material-symbols-outlined text-lg">shield</span>
                </div>
                <span className="px-2 py-0.5 rounded font-mono-eyebrow text-[10px] bg-surface-container-low text-mute border border-hairline uppercase">
                  SECURITY
                </span>
              </div>
              <h4 className="font-heading-md text-base text-ink font-semibold mb-2">
                Autonomous Perimeter Security
              </h4>
              <p className="font-body-sm text-[12px] text-body mb-6 leading-relaxed">
                Continuous dock-based patrols, thermal intruder vectoring, and instantaneous facility intrusion warnings.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center text-xs font-mono-eyebrow text-ink hover:text-body group"
            >
              <span>Learn More</span>
              <span className="material-symbols-outlined text-xs ml-1 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: TRAINING & CERTIFICATION TRACKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16 w-full">
        <div className="p-6 sm:p-8 md:p-10 rounded-xl bg-surface-container-lowest border border-hairline shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="font-mono-eyebrow text-xs text-mute tracking-wider uppercase mb-2">
                ACADEMY &amp; RATINGS
              </div>
              <h2 className="font-heading-lg text-[26px] sm:text-[28px] font-semibold text-ink">
                Professional Pilot Curriculums
              </h2>
            </div>
            <span className="font-mono-eyebrow text-xs text-mute mt-2 md:mt-0">
              STANDARDIZED FLIGHT INSTRUCTION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Course 1 */}
            <div className="p-6 rounded-lg bg-surface-container-low border border-hairline flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-mono-eyebrow text-[10px] text-ink border border-hairline">
                    FOUNDATION
                  </span>
                  <span className="font-mono-eyebrow text-xs text-mute">4 WEEKS</span>
                </div>
                <h4 className="font-heading-md text-base text-ink mb-2 font-semibold">
                  Commercial Drone Pilot Fundamentals
                </h4>
                <p className="font-body-sm text-[12px] text-body mb-6 leading-relaxed">
                  Airspace law, pre-flight telemetry verification, emergency failsafe execution, and standard certification preparation.
                </p>
              </div>
              <Link
                to="/contact?interest=Commercial%20Drone%20Pilot%20Fundamentals&userType=Student"
                className="w-full py-2 rounded-md bg-surface-container-lowest border border-hairline text-ink font-button-md text-xs hover:border-body transition-colors text-center inline-block shadow-2xs"
              >
                Register Interest
              </Link>
            </div>

            {/* Course 2 */}
            <div className="p-6 rounded-lg bg-surface-container-low border border-hairline flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-mono-eyebrow text-[10px] text-ink border border-hairline">
                    ADVANCED
                  </span>
                  <span className="font-mono-eyebrow text-xs text-mute">6 WEEKS</span>
                </div>
                <h4 className="font-heading-md text-base text-ink mb-2 font-semibold">
                  Advanced Thermography &amp; LiDAR Ops
                </h4>
                <p className="font-body-sm text-[12px] text-body mb-6 leading-relaxed">
                  Industrial point-cloud synthesis, radiometric calibration, thermal delta indexing, and high-precision spatial surveys.
                </p>
              </div>
              <Link
                to="/contact?interest=Advanced%20Thermography%20%26%20LiDAR%20Ops&userType=Student"
                className="w-full py-2 rounded-md bg-surface-container-lowest border border-hairline text-ink font-button-md text-xs hover:border-body transition-colors text-center inline-block shadow-2xs"
              >
                Register Interest
              </Link>
            </div>

            {/* Course 3 */}
            <div className="p-6 rounded-lg bg-surface-container-low border border-hairline flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-mono-eyebrow text-[10px] text-ink border border-hairline">
                    CERTIFICATION
                  </span>
                  <span className="font-mono-eyebrow text-xs text-mute">3 WEEKS</span>
                </div>
                <h4 className="font-heading-md text-base text-ink mb-2 font-semibold">
                  Night Flight &amp; BVLOS Safety Standards
                </h4>
                <p className="font-body-sm text-[12px] text-body mb-6 leading-relaxed">
                  Beyond Visual Line of Sight protocol management, anti-collision strobe configurations, and sensory loss contingencies.
                </p>
              </div>
              <Link
                to="/contact?interest=Night%20Flight%20%26%20BVLOS%20Safety%20Standards&userType=Student"
                className="w-full py-2 rounded-md bg-surface-container-lowest border border-hairline text-ink font-button-md text-xs hover:border-body transition-colors text-center inline-block shadow-2xs"
              >
                Register Interest
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: VALUE PROPOSITION / SPEC GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16 w-full border-t border-hairline">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="font-mono-eyebrow text-xs text-mute tracking-wider uppercase mb-2">
            MISSION ARCHITECTURE
          </div>
          <h2 className="font-heading-lg text-[26px] sm:text-[28px] font-semibold text-ink">
            Enterprise Grade Operational Standards
          </h2>
          <p className="font-body-md text-[14px] text-body mt-2">
            Every airborne flight hour is regulated by hardened hardware and strict procedural verification.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-surface-container-lowest border border-hairline shadow-xs">
            <div className="font-mono-eyebrow text-xs text-mute mb-3">SEC // 01</div>
            <h4 className="font-heading-md text-base text-ink mb-2 font-semibold">
              Standardized Flight Protocols
            </h4>
            <p className="font-body-sm text-[12px] text-body">
              Algorithmic pre-flight audits ensuring absolute zero-deviation flight plans under standard aviation guidelines.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface-container-lowest border border-hairline shadow-xs">
            <div className="font-mono-eyebrow text-xs text-mute mb-3">SEC // 02</div>
            <h4 className="font-heading-md text-base text-ink mb-2 font-semibold">
              Dual-Redundant Sensor Safety
            </h4>
            <p className="font-body-sm text-[12px] text-body">
              Secondary optical and barometric telemetry failsafes automatically trigger return-to-base in signal degradation scenarios.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface-container-lowest border border-hairline shadow-xs">
            <div className="font-mono-eyebrow text-xs text-mute mb-3">SEC // 03</div>
            <h4 className="font-heading-md text-base text-ink mb-2 font-semibold">
              Secure Data Telemetry
            </h4>
            <p className="font-body-sm text-[12px] text-body">
              Real-time point-to-point hardware level encryption safeguarding proprietary aerial data and surveying files.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface-container-lowest border border-hairline shadow-xs">
            <div className="font-mono-eyebrow text-xs text-mute mb-3">SEC // 04</div>
            <h4 className="font-heading-md text-base text-ink mb-2 font-semibold">
              ISO Compliant Workflows
            </h4>
            <p className="font-body-sm text-[12px] text-body">
              Auditable quality management and aerial data retention processes tailored for industrial tier regulatory compliance.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: EVALUATION SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="p-6 sm:p-8 md:p-10 rounded-xl bg-surface-container-lowest border border-hairline shadow-xs">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-ink"></span>
            <span className="font-mono-eyebrow text-xs text-mute uppercase tracking-wider">
              EXTERNAL SYSTEM EVALUATIONS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg bg-surface-container-low border border-hairline flex flex-col justify-between">
              <p className="font-body-md text-[14px] text-ink leading-relaxed mb-6">
                “Autonomous flight coordination algorithms delivered millimeter-level photogrammetric accuracy across extensive infrastructure inspections without telemetry drift.”
              </p>
              <div className="flex items-center justify-between border-t border-hairline pt-4">
                <div>
                  <div className="font-body-md text-xs font-semibold text-ink">
                    Enterprise Operations Partner
                  </div>
                  <div className="font-mono-eyebrow text-[11px] text-mute">
                    Aero-Utility Sector Evaluation
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded font-mono-eyebrow text-[10px] bg-surface-container-lowest text-body border border-hairline">
                  VERIFIED
                </span>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-surface-container-low border border-hairline flex flex-col justify-between">
              <p className="font-body-md text-[14px] text-ink leading-relaxed mb-6">
                “The training matrix provided unprecedented clarity for commercial operations, reducing initial training friction and accelerating regulatory licensing protocols.”
              </p>
              <div className="flex items-center justify-between border-t border-hairline pt-4">
                <div>
                  <div className="font-body-md text-xs font-semibold text-ink">
                    Aviation Training Directorate
                  </div>
                  <div className="font-mono-eyebrow text-[11px] text-mute">
                    Flight Operations Oversight
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded font-mono-eyebrow text-[10px] bg-surface-container-lowest text-body border border-hairline">
                  VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: INTERACTIVE CTA BANNER / ASSISTANT DISPATCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-20 w-full">
        <div className="rounded-xl bg-surface-container-lowest border border-hairline p-6 sm:p-8 md:p-12 shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface-container-low border border-hairline mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="font-mono-eyebrow text-[11px] text-mute uppercase tracking-wider">
                  REAL-TIME COPILOT READY
                </span>
              </div>

              <h2 className="font-heading-lg text-[24px] sm:text-[26px] font-semibold text-ink mb-3">
                Have a question? Talk to our assistant.
              </h2>
              <p className="font-body-md text-[14px] text-body leading-relaxed mb-6">
                Instant mission scoping, flight curriculum matching, and technical requirements analysis powered by our aerospace knowledge node.
              </p>

              {/* Prompt Quick-Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickPrompt('What courses / training are available?')}
                  className="px-3 py-1.5 rounded-full bg-surface-container-low border border-hairline font-mono-eyebrow text-xs text-body hover:text-ink hover:border-body transition-colors"
                >
                  "Recommend a course for LiDAR inspection"
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPrompt('I am interested in a service.')}
                  className="px-3 py-1.5 rounded-full bg-surface-container-low border border-hairline font-mono-eyebrow text-xs text-body hover:text-ink hover:border-body transition-colors"
                >
                  "Request industrial survey consultation"
                </button>
              </div>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
              <Link
                to="/chat"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-ink text-canvas font-button-md text-[14px] hover:opacity-90 transition-opacity shadow-xs"
              >
                <span className="material-symbols-outlined text-lg">smart_toy</span>
                <span>Launch Mission Chat</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
