import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CourseCardData {
  id: string;
  category: 'foundational' | 'inspection' | 'bvlos' | 'cinematography';
  badge: string;
  duration: string;
  level: string;
  title: string;
  description: string;
  modules: string[];
  schedule: string;
  seats: string;
}

export const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const courses: CourseCardData[] = [
    {
      id: 'part107-foundations',
      category: 'foundational',
      badge: 'Level 1 Core',
      duration: '4 Weeks (Flexible)',
      level: 'Foundational',
      title: 'Commercial Remote Pilot Fundamentals (Part 107 / DGCA)',
      description:
        'Comprehensive ground school and flight simulation covering airspace classifications, aeronautical decision-making, weather charts, and FAA/DGCA examination preparation.',
      modules: [
        'Aviation Weather Assessment & Micro-met Telemetry',
        'National Airspace System (NAS) & Controlled Corridors',
        'Radio Communications & Airport Flight Protocols',
        'Emergency Failsafe & Crew Resource Management',
      ],
      schedule: 'Starts: 1st & 15th of Every Month',
      seats: '8 Seats Open',
    },
    {
      id: 'industrial-thermography',
      category: 'inspection',
      badge: 'Level 2 Professional',
      duration: '6 Weeks',
      level: 'Intermediate',
      title: 'Industrial Thermal & Sensor Payload Inspection',
      description:
        'Advanced radiometric FLIR workflows, emissivity calibration, delta-T quantification, and high-altitude utility tower non-destructive scanning.',
      modules: [
        'Radiometric Thermography & Heat Sink Profiling',
        'High-Voltage Substation Standoff Verification',
        'Solar Farm Defect Automated Classification',
        'BIM Integration & CAD Overlay Reporting',
      ],
      schedule: 'Cohort 24-Q3: Enrolling Now',
      seats: '5 Seats Open',
    },
    {
      id: 'bvlos-autonomy',
      category: 'bvlos',
      badge: 'Level 3 Advanced',
      duration: '8 Weeks',
      level: 'Advanced Masterclass',
      title: 'BVLOS Tactical Operations & Corridor Autonomy',
      description:
        'Beyond Visual Line of Sight mission management, ADS-B integration, satellite telemetry link failsafes, and multi-drone fleet orchestration.',
      modules: [
        'Long-Range Microwave & Cellular C2 Link Architectures',
        'Detect-and-Avoid (DAA) Radar Integration Protocols',
        'Emergency Ballistic Parachute Telemetry Triggers',
        'Autonomous Docking Station Mission Programming',
      ],
      schedule: 'Cohort Starts Next Monday',
      seats: '3 Seats Remaining',
    },
    {
      id: 'cinematic-fpv-master',
      category: 'cinematography',
      badge: 'Specialized Track',
      duration: '5 Weeks',
      level: 'Creative / Pro',
      title: 'High-Velocity Cinematic FPV & Gimbal Arrays',
      description:
        'Dynamic high-speed vehicle tracking, Acro flight mechanics, dual-operator master wheels coordination, and 8K raw sensor post-production pipelines.',
      modules: [
        'Acro Mode Manual Stick Physics & Muscle Memory',
        'High-Speed Vehicle & Action Sports Pursuit',
        'Dual-Operator Master Wheels Coordination',
        'Gyroflow Stabilization & 12-bit RAW Color Grading',
      ],
      schedule: 'Weekend Intensive Labs Available',
      seats: '6 Seats Open',
    },
    {
      id: 'lidar-mapping-spec',
      category: 'inspection',
      badge: 'Level 2 Specialized',
      duration: '4 Weeks',
      level: 'Geospatial Specialist',
      title: 'LiDAR Topography & Point Cloud Engineering',
      description:
        'High-density LiDAR calibration, triple-return canopy penetration, RTK/PPK base station setup, and CAD-ready digital surface model creation.',
      modules: [
        'Point Cloud Density & Classification Pipelines',
        'RTK/PPK Differential Base Station Logistics',
        'Volumetric Stockpile Calculation Protocols',
        'GIS Shapefile & GeoTIFF Orthomosaic Exports',
      ],
      schedule: 'Monthly Batches',
      seats: '4 Seats Open',
    },
    {
      id: 'hardware-maintenance',
      category: 'foundational',
      badge: 'Technical Workshop',
      duration: '3 Weeks',
      level: 'Avionics Engineer',
      title: 'UAV Assembly, PX4 Firmware & Field Repair',
      description:
        'Hands-on soldering, ESC calibration, PX4/ArduPilot tuning, brushless motor vibration analysis, and field crash diagnostic procedures.',
      modules: [
        'Carbon Airframe Assembly & CNC Customization',
        'Flight Controller Architecture (Pixhawk / STM32)',
        'PID Control Loop Tuning & Telemetry Sensors',
        'Bench Test Soldering & Field Repair Drills',
      ],
      schedule: 'Weekend Sessions Available',
      seats: '7 Seats Open',
    },
  ];

  const filterTabs = [
    { key: 'all', label: 'All Courses' },
    { key: 'foundational', label: 'Foundational (Core/DGCA)' },
    { key: 'inspection', label: 'Industrial Inspection' },
    { key: 'bvlos', label: 'BVLOS & Autonomy' },
    { key: 'cinematography', label: 'Cinematography & FPV' },
  ];

  const filtered =
    activeFilter === 'all'
      ? courses
      : courses.filter((c) => c.category === activeFilter);

  const handleRegister = (title: string) => {
    navigate(`/contact?interest=${encodeURIComponent(title)}&userType=Student`);
  };

  return (
    <div className="flex flex-col w-full bg-canvas">
      {/* Header Context Zone */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 pb-8 w-full">
        <div className="space-y-4 max-w-3xl pb-8 border-b border-hairline">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-surface-container-lowest border border-hairline text-mute">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-body">
              Aero Academy // Flight Training Division
            </span>
            <span className="text-hairline">|</span>
            <span className="font-mono text-[11px] text-mute uppercase">FAA &amp; DGCA READY</span>
          </div>
          <h1 className="text-[34px] sm:text-[44px] md:text-[50px] font-semibold text-ink tracking-[-0.04em] leading-[1.1]">
            Drone Training &amp; Courses
          </h1>
          <p className="text-[15px] sm:text-[16px] text-body max-w-2xl leading-relaxed">
            Industry-accredited flight academy curricula designed for aspiring operators and enterprise flight crews. Master tactical telemetry, autonomous BVLOS protocols, and cinematic precision.
          </p>

          {/* Key Academy Micro-Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-4">
            <div className="p-4 sm:p-5 rounded-xl bg-surface-container-lowest border border-hairline text-left shadow-2xs">
              <div className="font-mono text-[11px] text-mute uppercase tracking-wider">
                Fleet Certifications
              </div>
              <div className="text-[22px] sm:text-[24px] font-semibold text-ink mt-1 tracking-tight">1,480+</div>
              <div className="text-[12px] text-body flex items-center gap-1 mt-1 font-mono">
                <span className="text-emerald-500 font-medium">100%</span> Passing Rate
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-surface-container-lowest border border-hairline text-left shadow-2xs">
              <div className="font-mono text-[11px] text-mute uppercase tracking-wider">
                Simulated Hours
              </div>
              <div className="text-[22px] sm:text-[24px] font-semibold text-ink mt-1 tracking-tight">42,500 hrs</div>
              <div className="text-[12px] text-mute flex items-center gap-1 mt-1 font-mono">
                Low-Latency Labs
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-surface-container-lowest border border-hairline text-left shadow-2xs">
              <div className="font-mono text-[11px] text-mute uppercase tracking-wider">
                Instructor Ratio
              </div>
              <div className="text-[22px] sm:text-[24px] font-semibold text-ink mt-1 tracking-tight">1 : 4 Max</div>
              <div className="text-[12px] text-body flex items-center gap-1 mt-1 font-mono">
                Master Pilots
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-surface-container-lowest border border-hairline text-left shadow-2xs">
              <div className="font-mono text-[11px] text-mute uppercase tracking-wider">
                Deployment Speed
              </div>
              <div className="text-[22px] sm:text-[24px] font-semibold text-ink mt-1 tracking-tight">&lt; 14 Days</div>
              <div className="text-[12px] text-mute flex items-center gap-1 mt-1 font-mono">
                Fast Accreditation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TRAINING AREA (Hero Highlight Card) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest border border-hairline p-6 sm:p-8 lg:p-12 shadow-xs">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Card Left */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-full bg-ink text-canvas font-mono text-[11px] uppercase tracking-wider font-medium">
                  Featured Track
                </span>
                <span className="px-2.5 py-1 rounded-full bg-surface-container-low border border-hairline text-body font-mono text-[11px] uppercase tracking-wider">
                  Cohort 24-Q3 Open
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  4 SEATS REMAINING
                </span>
              </div>

              <div>
                <h2 className="text-[26px] sm:text-[30px] md:text-[32px] font-semibold text-ink tracking-tight leading-tight">
                  Commercial Multi-Rotor Masterclass
                </h2>
                <p className="font-mono text-[13px] text-mute mt-1">Level 3 Accreditation</p>
              </div>

              <p className="text-[14.5px] sm:text-[15px] text-body leading-relaxed">
                The definitive multi-rotor flight program engineered for high-consequence operations. Bridge rigorous dual-command ground telemetry with live beyond-visual-line-of-sight industrial corridors.
              </p>

              {/* Highlight Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-1">
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-low border border-hairline">
                  <div className="w-6 h-6 rounded-full bg-surface-container-lowest border border-hairline flex items-center justify-center shrink-0 mt-0.5 text-ink">
                    <span className="material-symbols-outlined text-[15px]">videogame_asset</span>
                  </div>
                  <div>
                    <span className="font-medium text-ink text-[13px] block">
                      Dual-Command Simulator
                    </span>
                    <span className="text-[12px] text-mute">Sub-millisecond physical cockpits</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-low border border-hairline">
                  <div className="w-6 h-6 rounded-full bg-surface-container-lowest border border-hairline flex items-center justify-center shrink-0 mt-0.5 text-ink">
                    <span className="material-symbols-outlined text-[15px]">satellite_alt</span>
                  </div>
                  <div>
                    <span className="font-medium text-ink text-[13px] block">
                      Real-World BVLOS Flight
                    </span>
                    <span className="text-[12px] text-mute">Live corridor navigation up to 15km</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-low border border-hairline">
                  <div className="w-6 h-6 rounded-full bg-surface-container-lowest border border-hairline flex items-center justify-center shrink-0 mt-0.5 text-ink">
                    <span className="material-symbols-outlined text-[15px]">warning</span>
                  </div>
                  <div>
                    <span className="font-medium text-ink text-[13px] block">
                      Emergency Procedures
                    </span>
                    <span className="text-[12px] text-mute">Motor kill recovery &amp; parachute deploy</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-low border border-hairline">
                  <div className="w-6 h-6 rounded-full bg-surface-container-lowest border border-hairline flex items-center justify-center shrink-0 mt-0.5 text-ink">
                    <span className="material-symbols-outlined text-[15px]">cloud</span>
                  </div>
                  <div>
                    <span className="font-medium text-ink text-[13px] block">
                      Weather Telemetry Matrix
                    </span>
                    <span className="text-[12px] text-mute">Microburst &amp; gust shear adaptation</span>
                  </div>
                </div>
              </div>

              {/* Specs Metadata Strip */}
              <div className="flex flex-wrap items-center gap-5 sm:gap-6 pt-1 text-body">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-mute">schedule</span>
                  <span className="font-mono text-[12px]">8 Weeks (Hybrid)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-mute">equalizer</span>
                  <span className="font-mono text-[12px]">Advanced Level</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-mute">event_available</span>
                  <span className="font-mono text-[12px]">Next: Upcoming Batch</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleRegister('Commercial Multi-Rotor Masterclass')}
                  className="px-6 py-2.5 rounded-full bg-ink text-canvas font-medium text-[13px] hover:opacity-90 transition-opacity flex items-center gap-2 shadow-xs"
                >
                  <span>Register Interest</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Card Right: Visual Radar / Fleet Telemetry Card */}
            <div className="lg:col-span-5 relative">
              <div className="w-full rounded-lg overflow-hidden bg-surface-container-low border border-hairline relative flex flex-col">
                <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-surface-container">
                  <img
                    className="w-full h-full object-cover grayscale-[30%] contrast-[1.05]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMRktcZQHSMclLtggtBGRziKKf7HSanMCJPpvYoj9IXCOT_nxiiEnfvLy-E4fGJQ0ZVAO9swib50PIelGzoTojEnc17HQK-YR00NRJsPx7-ndqZj87OeeIk-HxweEpVsPUk3rDVWhRatsdtS9MWdvP0djX89TvNzkoNDiS4WPKPicz0ozJTiIL16r9qZCHsfmhmOwvi8FoBV4UIqESOkVyiXDsdJYeGCyfq-4854sO"
                    alt="High-tech flight training lab"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-surface-container-lowest/95 px-2.5 py-1 rounded border border-hairline font-mono text-[10px] text-ink font-semibold">
                    SIM-BAY // COCKPIT 01
                  </div>
                </div>

                <div className="p-4 bg-surface-container-lowest space-y-2 border-t border-hairline">
                  <div className="flex items-center justify-between text-[12px] font-mono">
                    <span className="text-mute">RADAR PROTOCOL:</span>
                    <span className="text-ink font-semibold">BVLOS LEVEL-3 VERIFIED</span>
                  </div>
                  <div className="flex items-center justify-between text-[12px] font-mono">
                    <span className="text-mute">CONCESSIONS:</span>
                    <span className="text-emerald-500 font-semibold">15% STUDENT DISCOUNT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 w-full scroll-mt-16" id="courses-grid-section">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-1.5 rounded-full font-button-md text-[13px] transition-colors shrink-0 ${
                activeFilter === tab.key
                  ? 'bg-ink text-canvas border border-ink font-medium'
                  : 'bg-surface-container-lowest text-body hover:text-ink hover:border-body border border-hairline'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <div
              key={course.id}
              className="p-5 sm:p-6 rounded-xl bg-surface-container-lowest border border-hairline hover:border-body transition-all flex flex-col justify-between shadow-2xs group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 rounded bg-surface-container-low font-mono-eyebrow text-[10px] text-ink border border-hairline">
                    {course.badge}
                  </span>
                  <span className="font-mono text-xs text-mute">{course.duration}</span>
                </div>

                <h3 className="font-heading-md text-[17px] font-semibold text-ink mb-2 leading-snug">
                  {course.title}
                </h3>
                <p className="font-body-sm text-[13px] text-body mb-5 leading-relaxed">
                  {course.description}
                </p>

                {/* Modules Checklist */}
                <div className="space-y-2 mb-6 p-3 rounded-lg bg-surface-container-low border border-hairline">
                  <span className="font-mono text-[10px] uppercase text-mute tracking-wider block">
                    Core Curriculum Modules
                  </span>
                  {course.modules.map((mod, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[12px] text-body">
                      <span className="material-symbols-outlined text-[15px] text-ink">
                        arrow_right
                      </span>
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-hairline space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-mute">
                  <span>{course.schedule}</span>
                  <span className="text-ink font-semibold">{course.seats}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRegister(course.title)}
                  className="w-full py-2.5 rounded-full bg-ink hover:opacity-90 text-canvas font-button-md text-[13px] transition-opacity text-center shadow-xs"
                >
                  Register Interest
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
