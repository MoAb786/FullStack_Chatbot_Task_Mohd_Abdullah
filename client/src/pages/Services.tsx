import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ServiceCardData {
  id: string;
  category: 'infrastructure' | 'surveying' | 'specialized' | 'environmental';
  badge: string;
  badgeColor: string;
  node: string;
  image: string;
  imageAlt: string;
  icon: string;
  title: string;
  description: string;
  deliverables: string[];
  specs: string;
}

export const Services: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeSpecModal, setActiveSpecModal] = useState<{ title: string; specs: string } | null>(null);

  const services: ServiceCardData[] = [
    {
      id: 'infra-inspection',
      category: 'infrastructure',
      badge: 'Infrastructure',
      badgeColor: 'bg-emerald-500',
      node: 'SYS-NODE // 01',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAc88A-0liKraiQp9yQSABW95VqW2v2HYoz9jIH_dfyxWKllAo1AjnRLQOXbz1oxErvL73FVwbtafKvC9TsotgQLUiOPErRpsUSA-rTpPQDnA77rQIQX2wvOcx27Ba87I_L-giKLoqu6-W5CLajGYXr2l3A966au2DHuU3n7pXQWb9wR6xQ2yqQKgE_il8xgOsoIs010g0ooDmeXN45KiXVyKYs0VgLKtau1tInHhyI',
      imageAlt: 'High-altitude industrial inspection quadcopter examining utility transmission tower',
      icon: 'troubleshoot',
      title: 'Critical Infrastructure Inspection',
      description:
        'High-resolution thermal and visual defect mapping for energy grids, wind turbines, substations, and civil utilities with micro-crack detection.',
      deliverables: [
        'High-Fidelity CAD & BIM Defect Exports',
        'Radiometric FLIR Inspection Packages',
        'Sub-millimeter Visual Defect Classification',
      ],
      specs: 'FLIR Vue Pro R 640, 100MP Phase One RGB, IP55 Harsh Weather Rating, Real-time centimeter RTK correction.',
    },
    {
      id: 'lidar-survey',
      category: 'surveying',
      badge: 'Surveying',
      badgeColor: 'bg-blue-500',
      node: 'SYS-NODE // 02',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCG6QQZAZ_BEI2zQ_mdrA6Nq171ufiEW-cAIzDQlfnc-0f193dYBkdBvY1vqzjp4HvlX_N7E8UFKN0OBWGsf_HIhXzcz1bCu7CzI9WrrOZiCCVKgCAsxfMvKGlziAiwCdi1ya17FWx_RlkQMDl6QltxTFwuaLgFO78SlJI4hP2DapfrNh-vsRnrDPpX1YOuRcP7WVcq-dsYVC1DLZIceVr40VXFpVaiN5l29_jyO4iQ',
      imageAlt: 'Dense 3D point cloud elevation model showing topographic contours scanned by surveying drone',
      icon: 'polyline',
      title: 'Precision LiDAR & Topographic Surveying',
      description:
        'Millimeter-accurate point cloud generation, volumetric analysis, and digital elevation modeling for civil engineering and mining.',
      deliverables: [
        'Classified LAS/LAZ Point Cloud Datasets',
        'Sub-centimeter Digital Elevation Models (DEM)',
        'Cut-and-Fill Volumetric Stockpile Reporting',
      ],
      specs: 'Hesai XT32 LiDAR Sensor, Triple Return Mode, 1.2M pts/sec capture rate, integrated dual-antenna GNSS RTK.',
    },
    {
      id: 'perimeter-security',
      category: 'specialized',
      badge: 'Specialized',
      badgeColor: 'bg-purple-500',
      node: 'SYS-NODE // 03',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBC20_8_jX4s28_qX9z5Ld7sB1x5W72vY1wXyKllAo1AjnRLQOXbz1oxErvL73FVwbtafKvC9TsotgQLUiOPErRpsUSA-rTpPQDnA77rQIQX2wvOcx27Ba87I_L-giKLoqu6-W5CLajGYXr2l3A966au2DHuU3n7pXQWb9wR6xQ2yqQKgE_il8xgOsoIs010g0ooDmeXN45KiXVyKYs0VgLKtau1tInHhyI',
      imageAlt: 'Tactical long-range security drone operating in nocturnal environment',
      icon: 'shield',
      title: 'Autonomous Security & Thermal Perimeter',
      description:
        'Dock-based continuous perimeter patrol, thermal intruder recognition, automated vector pursuit, and direct intrusion alert relays.',
      deliverables: [
        '24/7 Continuous Automated Docking Patrols',
        'Low-Latency Encrypted Video Stream Integration',
        'AI Object & Perimeter Breach Classification',
      ],
      specs: 'Radiometric Dual-Sensor Gimbal, 30x Optical Zoom, Integrated Docking Station with rapid battery cycle.',
    },
    {
      id: 'agri-multispectral',
      category: 'environmental',
      badge: 'Environmental',
      badgeColor: 'bg-emerald-600',
      node: 'SYS-NODE // 04',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD9_3k1_jX4s28_qX9z5Ld7sB1x5W72vY1wXyKllAo1AjnRLQOXbz1oxErvL73FVwbtafKvC9TsotgQLUiOPErRpsUSA-rTpPQDnA77rQIQX2wvOcx27Ba87I_L-giKLoqu6-W5CLajGYXr2l3A966au2DHuU3n7pXQWb9wR6xQ2yqQKgE_il8xgOsoIs010g0ooDmeXN45KiXVyKYs0VgLKtau1tInHhyI',
      imageAlt: 'Agricultural drone conducting multispectral vegetative health analysis over crops',
      icon: 'agriculture',
      title: 'Multispectral Agricultural Analytics',
      description:
        'NDVI and NDRE vegetation indexing, stress zone mapping, soil moisture profiling, and targeted automated crop health diagnosis.',
      deliverables: [
        'Calibrated NDVI & NDRE Orthomosaic Maps',
        'Variable Rate Application (VRA) Prescription Shapefiles',
        'High-Resolution Canopy Spatial Audits',
      ],
      specs: 'MicaSense RedEdge-P Dual Payload, 5 Discrete Spectral Bands + Panchromatic, Downwelling Light Sensor.',
    },
    {
      id: 'heavy-lift',
      category: 'specialized',
      badge: 'Specialized',
      badgeColor: 'bg-amber-500',
      node: 'SYS-NODE // 05',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAc88A-0liKraiQp9yQSABW95VqW2v2HYoz9jIH_dfyxWKllAo1AjnRLQOXbz1oxErvL73FVwbtafKvC9TsotgQLUiOPErRpsUSA-rTpPQDnA77rQIQX2wvOcx27Ba87I_L-giKLoqu6-W5CLajGYXr2l3A966au2DHuU3n7pXQWb9wR6xQ2yqQKgE_il8xgOsoIs010g0ooDmeXN45KiXVyKYs0VgLKtau1tInHhyI',
      imageAlt: 'Heavy multi-rotor industrial drone with modular payload bay',
      icon: 'local_shipping',
      title: 'Heavy-Lift Cargo & Delivery Logistics',
      description:
        'Specialized heavy-payload operations up to 40kg for remote medical logistics, emergency utility parts, and ship-to-shore deliveries.',
      deliverables: [
        'Point-to-point BVLOS Autonomous Corridors',
        'Winch Release & Precision Drop Telemetry',
        'Redundant Parachute Safety Integration',
      ],
      specs: 'Octocopter Coaxial Powertrain, Dual 44Ah Solid-State LiPo, Fail-Safe Ballistic Recovery Chute.',
    },
    {
      id: 'cinematic-fpv',
      category: 'specialized',
      badge: 'Broadcast',
      badgeColor: 'bg-indigo-500',
      node: 'SYS-NODE // 06',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCG6QQZAZ_BEI2zQ_mdrA6Nq171ufiEW-cAIzDQlfnc-0f193dYBkdBvY1vqzjp4HvlX_N7E8UFKN0OBWGsf_HIhXzcz1bCu7CzI9WrrOZiCCVKgCAsxfMvKGlziAiwCdi1ya17FWx_RlkQMDl6QltxTFwuaLgFO78SlJI4hP2DapfrNh-vsRnrDPpX1YOuRcP7WVcq-dsYVC1DLZIceVr40VXFpVaiN5l29_jyO4iQ',
      imageAlt: 'Dynamic high-speed FPV cinema rig during vehicle tracking shoot',
      icon: 'videocam',
      title: 'Cinematic 8K Aerial Production & FPV',
      description:
        'Cinema-grade aerial filming, dynamic high-speed vehicle pursuit, dual-operator master wheels control, and raw color workflows.',
      deliverables: [
        '8K ProRes RAW & CinemaDNG Telemetry Logs',
        'Sub-second Acrobatic FPV Chase Sequences',
        'DGCA Airspace Authorization Protocol Filings',
      ],
      specs: 'RED V-Raptor / ARRI Alexa Mini LF Payload, 3-Axis Carbon Gimbal, 140km/h top velocity FPV airframes.',
    },
  ];

  const filterTabs = [
    { key: 'all', label: 'All Services', count: 6 },
    { key: 'infrastructure', label: 'Inspection & Asset Audit' },
    { key: 'surveying', label: 'Mapping & Photogrammetry' },
    { key: 'specialized', label: 'Specialized Payloads' },
    { key: 'environmental', label: 'Environmental Monitoring' },
  ];

  const filtered =
    activeFilter === 'all'
      ? services
      : services.filter((s) => s.category === activeFilter);

  const handleEnquireNow = (title: string) => {
    navigate(`/contact?interest=${encodeURIComponent(title)}&userType=Customer`);
  };

  return (
    <div className="flex flex-col w-full bg-canvas">
      {/* Header & Page Context Zone */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 pb-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-hairline">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-surface-container-lowest border border-hairline text-mute">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="font-mono-eyebrow text-[12px] text-ink font-medium tracking-wide uppercase">
                OPERATIONAL DEPLOYMENT FLEET // V3.8
              </span>
              <span className="text-hairline">|</span>
              <span className="font-mono-eyebrow text-[12px] text-mute uppercase">
                ALL SENSORS CALIBRATED
              </span>
            </div>
            <h1 className="font-display-xl text-[34px] sm:text-[44px] lg:text-[48px] font-semibold text-ink tracking-[-2px] leading-tight">
              Our Services
            </h1>
            <p className="font-body-lg text-[15px] sm:text-[16px] text-body max-w-2xl leading-relaxed">
              Specialized enterprise unmanned aerial solutions tailored for industrial precision, critical infrastructure, and spatial analysis.
            </p>
          </div>

          {/* Telemetry Status Ribbon Widget */}
          <div className="flex items-center gap-4 sm:gap-5 p-3 sm:p-3.5 px-4 sm:px-5 rounded-lg bg-surface-container-lowest border border-hairline">
            <div className="space-y-0.5">
              <div className="font-mono-eyebrow text-[11px] text-mute uppercase tracking-wider">
                Global Readiness
              </div>
              <div className="font-code text-[13px] text-ink font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-ink text-[16px]">cell_tower</span>
                RTK-ENABLED 99.9%
              </div>
            </div>
            <div className="h-7 w-px bg-hairline"></div>
            <div className="space-y-0.5">
              <div className="font-mono-eyebrow text-[11px] text-mute uppercase tracking-wider">
                Avg Response
              </div>
              <div className="font-code text-[13px] text-ink font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-ink text-[16px]">timer</span>
                &lt; 3.4 HRS RAPID
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-1 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-1.5 rounded-full font-button-md text-[13px] transition-colors flex items-center gap-2 shrink-0 ${
                activeFilter === tab.key
                  ? 'bg-ink text-canvas border border-ink font-medium'
                  : 'bg-surface-container-lowest text-body hover:text-ink hover:border-body border border-hairline'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[11px] font-mono-eyebrow ${
                    activeFilter === tab.key ? 'bg-canvas/20 text-canvas' : 'bg-surface-container-low text-mute'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Professional Service Grid (6 Comprehensive Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4 pb-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => (
            <article
              key={service.id}
              className="flex flex-col justify-between p-5 sm:p-6 rounded-xl bg-surface-container-lowest border border-hairline hover:border-body transition-all duration-200 group shadow-2xs"
            >
              <div>
                {/* Visual Media Container */}
                <div className="relative w-full h-44 rounded-lg overflow-hidden bg-surface-container-low mb-5 border border-hairline">
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-lowest/95 backdrop-blur-xs border border-hairline shadow-2xs">
                    <span className={`w-1.5 h-1.5 rounded-full ${service.badgeColor}`}></span>
                    <span className="font-mono-eyebrow text-[11px] text-ink uppercase tracking-wide">
                      {service.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-3 font-mono-eyebrow text-[11px] text-canvas bg-ink/80 px-2 py-0.5 rounded backdrop-blur-xs">
                    {service.node}
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded bg-surface-container-low border border-hairline flex items-center justify-center text-ink shrink-0">
                    <span className="material-symbols-outlined text-[18px]">{service.icon}</span>
                  </div>
                  <h2 className="font-heading-md text-[17px] sm:text-[18px] font-semibold text-ink tracking-tight">
                    {service.title}
                  </h2>
                </div>

                <p className="font-body-md text-[13.5px] sm:text-[14px] text-body mb-5 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 mb-6 p-3.5 rounded-lg bg-surface-container-low border border-hairline">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 font-body-sm text-[12.5px] sm:text-[13px] text-body">
                      <span className="material-symbols-outlined text-ink text-[16px] shrink-0">
                        check_circle
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-hairline flex items-center justify-between gap-3">
                <button
                  onClick={() => handleEnquireNow(service.title)}
                  className="flex-1 py-2 px-4 rounded-full bg-ink text-canvas font-button-md text-[13px] hover:opacity-90 transition-opacity text-center shadow-xs"
                  type="button"
                >
                  Enquire Now
                </button>
                <button
                  onClick={() => setActiveSpecModal({ title: service.title, specs: service.specs })}
                  className="py-2 px-3 rounded-md border border-hairline bg-surface-container-lowest hover:bg-surface-container-low text-body hover:text-ink font-mono-eyebrow text-[11px] flex items-center gap-1 transition-colors"
                  type="button"
                >
                  <span>SPECS</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Spec Sheet Modal */}
      {activeSpecModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-surface-container-lowest border border-hairline rounded-xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-ink text-[20px]">tune</span>
                <h3 className="font-heading-md text-[16px] font-semibold text-ink">
                  Hardware Specifications
                </h3>
              </div>
              <button
                onClick={() => setActiveSpecModal(null)}
                className="text-mute hover:text-ink p-1 rounded-md"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div>
              <p className="font-semibold text-[14px] text-ink mb-1">{activeSpecModal.title}</p>
              <div className="p-3.5 rounded bg-surface-container-low border border-hairline font-mono text-[12px] text-body leading-relaxed">
                {activeSpecModal.specs}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveSpecModal(null)}
                className="px-4 py-2 rounded-md bg-surface-container-lowest border border-hairline text-[13px] text-body hover:text-ink transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = activeSpecModal.title;
                  setActiveSpecModal(null);
                  handleEnquireNow(title);
                }}
                className="px-4 py-2 rounded-md bg-ink text-canvas text-[13px] font-medium hover:opacity-90 transition-opacity shadow-xs"
              >
                Request Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
