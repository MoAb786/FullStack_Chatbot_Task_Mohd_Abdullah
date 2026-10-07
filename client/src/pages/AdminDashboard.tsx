import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api, authStorage } from '../lib/api';
import type { Enquiry, EnquiryStats, EnquiryStatus, UserType } from '../types';
import { EnquiryDetailModal } from '../components/admin/EnquiryDetailModal';
import { DeleteConfirmModal } from '../components/admin/DeleteConfirmModal';
import { StatusBadge } from '../components/admin/StatusBadge';
import { matchChatIntent } from '../data/chatbot';

type AdminTab = 'enquiries' | 'fleet' | 'training' | 'copilot' | 'system';

interface DroneUnit {
  id: string;
  callsign: string;
  model: string;
  payload: string;
  status: 'Ready' | 'On Mission' | 'Maintenance' | 'Standby';
  battery: number;
  flightHours: number;
  signalLatency: string;
  lastMaintenance: string;
}

interface AcademyCohort {
  id: string;
  title: string;
  code: string;
  duration: string;
  enrolled: number;
  capacity: number;
  startDate: string;
  instructor: string;
  status: 'Enrolling' | 'In Session' | 'Graduated';
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('enquiries');

  // Enquiries Tab State
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<EnquiryStats>({
    total: 0,
    new: 0,
    contacted: 0,
    inProgress: 0,
    closed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUserType, setFilterUserType] = useState<UserType | 'All'>('All');
  const [filterStatus, setFilterStatus] = useState<EnquiryStatus | 'All'>('All');

  // Modal states
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fleet Operations State
  const [fleet, setFleet] = useState<DroneUnit[]>([
    {
      id: 'UAV-01',
      callsign: 'Alpha Horizon',
      model: 'Matrice 350 RTK Industrial',
      payload: 'Hesai XT32 LiDAR + 100MP RGB',
      status: 'Ready',
      battery: 98,
      flightHours: 342,
      signalLatency: '11.4ms',
      lastMaintenance: '2026-09-28',
    },
    {
      id: 'UAV-02',
      callsign: 'Thermal Sentry',
      model: 'Inspire 3 Dual-Gimbal',
      payload: 'FLIR Vue Pro R 640 Radiometric',
      status: 'On Mission',
      battery: 84,
      flightHours: 512,
      signalLatency: '14.2ms',
      lastMaintenance: '2026-10-02',
    },
    {
      id: 'UAV-03',
      callsign: 'Falcon Heavy-Lift',
      model: 'Octocopter Coaxial X8',
      payload: '40kg Cargo Winch + Ballistic Parachute',
      status: 'Ready',
      battery: 100,
      flightHours: 198,
      signalLatency: '9.8ms',
      lastMaintenance: '2026-09-15',
    },
    {
      id: 'UAV-04',
      callsign: 'Spectra Agronomy',
      model: 'WingtraOne GEN II VTOL',
      payload: 'MicaSense RedEdge-P 5-Band Multispectral',
      status: 'Standby',
      battery: 92,
      flightHours: 276,
      signalLatency: '16.0ms',
      lastMaintenance: '2026-09-22',
    },
    {
      id: 'UAV-05',
      callsign: 'Acro CineMaster',
      model: 'Cinewhoop Custom Carbon 8S',
      payload: 'RED V-Raptor 8K VV + Master Wheels RX',
      status: 'Ready',
      battery: 76,
      flightHours: 145,
      signalLatency: '6.2ms',
      lastMaintenance: '2026-10-04',
    },
    {
      id: 'UAV-06',
      callsign: 'Perimeter Dock-X',
      model: 'Skydio X2D Autonomous Autonomous',
      payload: '360° Computer Vision + Thermal Strobe',
      status: 'On Mission',
      battery: 61,
      flightHours: 680,
      signalLatency: '12.8ms',
      lastMaintenance: '2026-10-01',
    },
  ]);
  const [fleetNotification, setFleetNotification] = useState<string | null>(null);

  // Training Tracks State
  const [cohorts, setCohorts] = useState<AcademyCohort[]>([
    {
      id: 'COH-101',
      title: 'Commercial Remote Pilot Fundamentals',
      code: 'PART-107-DGCA',
      duration: '4 Weeks',
      enrolled: 16,
      capacity: 20,
      startDate: '2026-10-15',
      instructor: 'Capt. Marcus Vance',
      status: 'Enrolling',
    },
    {
      id: 'COH-102',
      title: 'Advanced Industrial Thermography & LiDAR',
      code: 'THERMO-LIDAR-L2',
      duration: '6 Weeks',
      enrolled: 12,
      capacity: 12,
      startDate: '2026-10-01',
      instructor: 'Dr. Elena Rostova',
      status: 'In Session',
    },
    {
      id: 'COH-103',
      title: 'BVLOS Tactical Autonomy & Corridor Management',
      code: 'BVLOS-AUTO-L3',
      duration: '8 Weeks',
      enrolled: 8,
      capacity: 10,
      startDate: '2026-10-20',
      instructor: 'Cmdr. Neil Thorne',
      status: 'Enrolling',
    },
    {
      id: 'COH-104',
      title: 'High-Velocity Cinematic FPV & Raw Workflows',
      code: 'CINE-FPV-PRO',
      duration: '5 Weeks',
      enrolled: 14,
      capacity: 14,
      startDate: '2026-09-15',
      instructor: 'Julian Kross (FPV Lead)',
      status: 'In Session',
    },
  ]);
  const [trainingNotification, setTrainingNotification] = useState<string | null>(null);

  // AI Copilot Test Simulator State
  const [copilotTestQuery, setCopilotTestQuery] = useState('How do I register for commercial pilot course?');
  const [copilotTestResult, setCopilotTestResult] = useState<{
    response: string;
    action?: { type: string; payload?: string; label: string };
    latency: number;
  }>({
    response: "You can register directly through our online intake desk. Would you like me to take you to the registration portal?",
    action: { type: 'enquiry', payload: 'Commercial Remote Pilot Fundamentals', label: 'Go to Registration Desk' },
    latency: 18,
  });

  const fetchEnquiriesAndStats = useCallback(async () => {
    try {
      setLoading(true);
      const [enquiriesRes, statsRes] = await Promise.all([
        api.getEnquiries({
          search: searchTerm,
          userType: filterUserType,
          status: filterStatus,
        }),
        api.getEnquiryStats(),
      ]);

      if (enquiriesRes.data) {
        setEnquiries(enquiriesRes.data);
      }
      if (statsRes.data) {
        setStats(statsRes.data);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes('401')) {
        authStorage.removeToken();
        navigate('/admin/login');
      } else {
        console.error('Error fetching dashboard data:', err);
      }
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterUserType, filterStatus, navigate]);

  useEffect(() => {
    if (!authStorage.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    fetchEnquiriesAndStats();
  }, [fetchEnquiriesAndStats, navigate]);

  const handleStatusUpdate = async (id: string, newStatus: EnquiryStatus) => {
    try {
      const res = await api.updateEnquiryStatus(id, newStatus);
      if (res.data) {
        setEnquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        const statsRes = await api.getEnquiryStats();
        if (statsRes.data) setStats(statsRes.data);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update enquiry status.');
    }
  };

  const handleOpenDelete = (id: string) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      setIsDeleting(true);
      await api.deleteEnquiry(deletingId);
      setEnquiries((prev) => prev.filter((item) => item._id !== deletingId));
      if (selectedEnquiry && selectedEnquiry._id === deletingId) {
        setIsDetailOpen(false);
        setSelectedEnquiry(null);
      }
      setIsDeleteModalOpen(false);
      setDeletingId(null);
      const statsRes = await api.getEnquiryStats();
      if (statsRes.data) setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to delete enquiry:', error);
      alert('Failed to delete enquiry.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExportCSV = () => {
    if (enquiries.length === 0) {
      alert('No enquiries to export.');
      return;
    }
    const headers = ['ID', 'Name', 'Email', 'Phone', 'UserType', 'Interest', 'Status', 'CreatedAt', 'Message'];
    const rows = enquiries.map((e) => [
      e._id,
      `"${e.name.replace(/"/g, '""')}"`,
      e.email,
      `"${e.phone}"`,
      e.userType,
      `"${e.interest.replace(/"/g, '""')}"`,
      e.status,
      e.createdAt,
      `"${e.message.replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dronetv_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDroneStatusChange = (droneId: string, newStatus: DroneUnit['status']) => {
    setFleet((prev) =>
      prev.map((d) => (d.id === droneId ? { ...d, status: newStatus } : d))
    );
    setFleetNotification(`Status of ${droneId} updated to "${newStatus}" successfully.`);
    setTimeout(() => setFleetNotification(null), 3500);
  };

  const handleRunDiagnostics = (droneId: string) => {
    setFleetNotification(`Running full avionics & RTK diagnostics for ${droneId}... All 14 subsystems OK (99.8% readiness).`);
    setTimeout(() => setFleetNotification(null), 4500);
  };

  const handleIssueCertificate = (cohortCode: string) => {
    setTrainingNotification(`DGCA/FAA Accredited certificates batch generated and digitally signed for cohort [${cohortCode}].`);
    setTimeout(() => setTrainingNotification(null), 4500);
  };

  const handleRunCopilotTest = (query: string) => {
    const start = performance.now();
    const match = matchChatIntent(query);
    const latency = Math.round(performance.now() - start + 12);
    setCopilotTestResult({
      response: match.response,
      action: match.action,
      latency,
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="w-full bg-canvas min-h-screen p-3 sm:p-6 flex flex-col justify-start items-center">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 min-h-[920px]">
        {/* LEFT SIDEBAR NAVIGATION */}
        <aside className="w-full lg:w-64 bg-surface-container-lowest border border-hairline rounded-2xl p-4 flex flex-col justify-between shrink-0 shadow-xs">
          <div className="flex flex-col gap-6">
            {/* Logo & Version */}
            <div className="flex items-center gap-3 px-1 py-1">
              <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center p-1 text-canvas shadow-xs">
                <span className="material-symbols-outlined text-[18px]">flight_takeoff</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading-md text-[16px] text-ink tracking-tight font-semibold">
                  DroneTV Aero
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="font-mono-eyebrow text-[11px] text-mute uppercase">OPS OS v2.4</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex flex-col gap-1.5">
              {/* Public Portal Link */}
              <Link
                to="/"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-body hover:text-ink hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-faint">home</span>
                <span className="font-label-sm text-[13px]">Public Portal</span>
              </Link>

              {/* Tab 1: Enquiries */}
              <button
                type="button"
                onClick={() => setActiveTab('enquiries')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                  activeTab === 'enquiries'
                    ? 'bg-surface-container-low text-ink font-semibold border border-hairline shadow-2xs'
                    : 'text-body hover:text-ink hover:bg-surface-container-low/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px]">radar</span>
                  <span className="font-label-sm text-[13px]">Flight Enquiries</span>
                </div>
                <span className="font-mono-eyebrow text-[11px] px-2 py-0.5 rounded-full bg-ink text-canvas font-semibold">
                  {stats.total}
                </span>
              </button>

              {/* Tab 2: Fleet Operations */}
              <button
                type="button"
                onClick={() => setActiveTab('fleet')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                  activeTab === 'fleet'
                    ? 'bg-surface-container-low text-ink font-semibold border border-hairline shadow-2xs'
                    : 'text-body hover:text-ink hover:bg-surface-container-low/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px]">flight_takeoff</span>
                  <span className="font-label-sm text-[13px]">Fleet Operations</span>
                </div>
                <span className="font-mono-eyebrow text-[10px] px-1.5 py-0.5 rounded bg-surface-container text-body">
                  6 UAVs
                </span>
              </button>

              {/* Tab 3: Training Tracks */}
              <button
                type="button"
                onClick={() => setActiveTab('training')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                  activeTab === 'training'
                    ? 'bg-surface-container-low text-ink font-semibold border border-hairline shadow-2xs'
                    : 'text-body hover:text-ink hover:bg-surface-container-low/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px]">school</span>
                  <span className="font-label-sm text-[13px]">Training Academies</span>
                </div>
                <span className="font-mono-eyebrow text-[10px] px-1.5 py-0.5 rounded bg-surface-container text-body">
                  4 Tracks
                </span>
              </button>

              {/* Tab 4: AI Copilot Engine */}
              <button
                type="button"
                onClick={() => setActiveTab('copilot')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                  activeTab === 'copilot'
                    ? 'bg-surface-container-low text-ink font-semibold border border-hairline shadow-2xs'
                    : 'text-body hover:text-ink hover:bg-surface-container-low/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                  <span className="font-label-sm text-[13px]">AI Copilot Engine</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </button>

              {/* Tab 5: System Health */}
              <button
                type="button"
                onClick={() => setActiveTab('system')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                  activeTab === 'system'
                    ? 'bg-surface-container-low text-ink font-semibold border border-hairline shadow-2xs'
                    : 'text-body hover:text-ink hover:bg-surface-container-low/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px]">hub</span>
                  <span className="font-label-sm text-[13px]">Telemetry &amp; Nodes</span>
                </div>
                <span className="font-mono-eyebrow text-[10px] text-mute">SYS-OK</span>
              </button>
            </nav>
          </div>

          {/* Bottom Profile Panel */}
          <div className="mt-8 border-t border-hairline pt-3.5 flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-8 h-8 rounded-full bg-surface-container flex items-center justify-center shrink-0 border border-hairline">
                <span className="font-code text-xs text-ink font-semibold">D4</span>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-surface-container-lowest"></span>
              </div>
              <div className="flex flex-col min-w-0 truncate">
                <span className="font-body-sm text-[12px] text-ink font-medium truncate">Flight Director</span>
                <span className="font-mono-eyebrow text-[10px] text-mute uppercase tracking-wider">admin@dronetv.in</span>
              </div>
            </div>
            <button
              onClick={() => {
                authStorage.removeToken();
                navigate('/admin/login');
              }}
              className="text-faint hover:text-red-500 transition-colors p-1"
              title="Sign Out"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </aside>

        {/* MAIN DASHBOARD CONTENT */}
        <section className="flex-1 flex flex-col gap-5 min-w-0">
          {/* ========================================================================= */}
          {/* TAB 1: FLIGHT ENQUIRIES & LEADS PIPELINE */}
          {/* ========================================================================= */}
          {activeTab === 'enquiries' && (
            <>
              {/* Top Bar */}
              <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-hairline shadow-xs">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-mute font-mono-eyebrow text-[11px]">
                    <span>OPERATIONS</span>
                    <span className="text-outline-variant">/</span>
                    <span className="text-ink">ENQUIRIES PIPELINE</span>
                  </div>
                  <h1 className="font-heading-lg text-[20px] sm:text-[24px] text-ink tracking-tight font-semibold">
                    Mission Enquiries &amp; Lead Pipeline
                  </h1>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-hairline bg-surface-container-lowest hover:bg-surface-container-low text-body hover:text-ink font-button-md text-xs transition-all shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-base text-faint">download</span>
                    <span>Export CSV</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => fetchEnquiriesAndStats()}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-hairline bg-surface-container-lowest hover:bg-surface-container-low text-body hover:text-ink font-button-md text-xs transition-all shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-base text-faint">refresh</span>
                    <span>Sync Node</span>
                  </button>
                </div>
              </header>

              {/* 5 Metric Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5">
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Total Enquiries</span>
                    <span className="material-symbols-outlined text-faint text-lg">analytics</span>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="font-heading-lg text-[26px] font-semibold text-ink">{stats.total}</span>
                    <span className="font-mono-eyebrow text-[11px] text-body">100%</span>
                  </div>
                  <span className="text-body-sm text-[11px] text-mute mt-1">Telemetry intake stream</span>
                </div>

                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-eyebrow text-[11px] text-mute uppercase">New Leads</span>
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="font-heading-lg text-[26px] font-semibold text-ink">{stats.new}</span>
                    <span className="font-mono-eyebrow text-[11px] px-1.5 py-0.5 rounded bg-surface-container text-body">
                      Needs Review
                    </span>
                  </div>
                  <span className="text-body-sm text-[11px] text-mute mt-1">Awaiting dispatch</span>
                </div>

                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Contacted</span>
                    <span className="material-symbols-outlined text-faint text-lg">outgoing_mail</span>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="font-heading-lg text-[26px] font-semibold text-ink">{stats.contacted}</span>
                    <span className="font-mono-eyebrow text-[11px] text-mute">Active Relay</span>
                  </div>
                  <span className="text-body-sm text-[11px] text-mute mt-1">First contact logged</span>
                </div>

                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline flex flex-col justify-between shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-eyebrow text-[11px] text-mute uppercase">In Progress</span>
                    <span className="material-symbols-outlined text-faint text-lg">pending_actions</span>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="font-heading-lg text-[26px] font-semibold text-ink">{stats.inProgress}</span>
                    <span className="font-mono-eyebrow text-[11px] text-mute">In Evaluation</span>
                  </div>
                  <span className="text-body-sm text-[11px] text-mute mt-1">Evaluating telemetry</span>
                </div>

                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline flex flex-col justify-between col-span-2 md:col-span-1 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Closed / Enrolled</span>
                    <span className="material-symbols-outlined text-faint text-lg">verified</span>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="font-heading-lg text-[26px] font-semibold text-ink">{stats.closed}</span>
                    <span className="font-mono-eyebrow text-[11px] text-mute">Completed</span>
                  </div>
                  <span className="text-body-sm text-[11px] text-mute mt-1">Resolved missions</span>
                </div>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-hairline flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between shadow-2xs">
                <div className="relative flex-1 min-w-[240px]">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-faint text-lg">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by pilot name, email, or mission scope..."
                    className="w-full bg-surface-container-low border border-hairline text-ink placeholder:text-faint font-body-md text-sm pl-9 pr-3 py-1.5 rounded-lg focus:outline-hidden focus:border-ink transition-colors"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center bg-surface-container-low rounded-lg p-0.5 border border-hairline overflow-x-auto">
                    {(['All', 'Student', 'Customer', 'Other'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFilterUserType(type)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                          filterUserType === type ? 'bg-surface-container-lowest text-ink shadow-xs' : 'text-body hover:text-ink'
                        }`}
                      >
                        {type === 'All' ? 'All Types' : type === 'Customer' ? 'Enterprise' : type}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center bg-surface-container-low rounded-lg p-0.5 border border-hairline overflow-x-auto">
                    {(['All', 'New', 'Contacted', 'In Progress', 'Closed'] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFilterStatus(status)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                          filterStatus === status ? 'bg-surface-container-lowest text-ink shadow-xs' : 'text-body hover:text-ink'
                        }`}
                      >
                        {status === 'In Progress' ? 'Progress' : status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-surface-container-lowest rounded-2xl border border-hairline overflow-hidden flex flex-col shadow-xs">
                {loading ? (
                  <div className="p-12 text-center text-mute space-y-2">
                    <span className="inline-block h-6 w-6 border-2 border-ink border-t-transparent rounded-full animate-spin" />
                    <p className="text-[13px]">Streaming telemetry records...</p>
                  </div>
                ) : enquiries.length === 0 ? (
                  <div className="p-16 text-center text-mute space-y-3">
                    <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-surface-container text-mute">
                      <span className="material-symbols-outlined text-[26px]">inbox</span>
                    </div>
                    <h3 className="text-[16px] font-semibold text-ink">No telemetry records found</h3>
                    <p className="text-[13px] max-w-sm mx-auto text-body">
                      No matching enquiries found for the selected filters.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-surface-container-low/70 border-b border-hairline text-mute font-mono-eyebrow text-[11px] uppercase tracking-wider">
                          <th className="py-3 px-4 font-medium">Lead / Contact</th>
                          <th className="py-3 px-4 font-medium">Contact Channels</th>
                          <th className="py-3 px-4 font-medium">User Type</th>
                          <th className="py-3 px-4 font-medium">Requested Track</th>
                          <th className="py-3 px-4 font-medium">Status</th>
                          <th className="py-3 px-4 font-medium">Received</th>
                          <th className="py-3 px-4 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-hairline text-[13px]">
                        {enquiries.map((enquiry) => (
                          <tr
                            key={enquiry._id}
                            className="hover:bg-surface-container-low/50 transition-colors cursor-pointer group"
                            onClick={() => {
                              setSelectedEnquiry(enquiry);
                              setIsDetailOpen(true);
                            }}
                          >
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-surface-container text-ink font-code flex items-center justify-center font-medium text-xs border border-hairline shrink-0">
                                  {getInitials(enquiry.name)}
                                </div>
                                <div>
                                  <span className="font-medium text-ink block group-hover:text-blue-500 transition-colors">
                                    {enquiry.name}
                                  </span>
                                  <span className="text-[11px] text-mute font-code">
                                    ID-{enquiry._id.slice(-4).toUpperCase()}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="flex flex-col text-xs font-code">
                                <span className="text-ink">{enquiry.email}</span>
                                <span className="text-mute">{enquiry.phone}</span>
                              </div>
                            </td>

                            <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                              <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium border border-hairline bg-surface-container-low text-ink">
                                {enquiry.userType}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 max-w-[200px]">
                              <span className="text-ink font-medium text-xs truncate block" title={enquiry.interest}>
                                {enquiry.interest}
                              </span>
                            </td>

                            <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-2">
                                <StatusBadge status={enquiry.status} size="sm" />
                                <select
                                  value={enquiry.status}
                                  onChange={(e) =>
                                    handleStatusUpdate(enquiry._id, e.target.value as EnquiryStatus)
                                  }
                                  className="bg-surface-container-lowest border border-hairline text-xs text-body py-1 px-1.5 rounded focus:outline-hidden cursor-pointer"
                                >
                                  <option value="New">New</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Closed">Closed</option>
                                </select>
                              </div>
                            </td>

                            <td className="py-3.5 px-4 text-xs font-code text-mute whitespace-nowrap">
                              {new Date(enquiry.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </td>

                            <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedEnquiry(enquiry);
                                    setIsDetailOpen(true);
                                  }}
                                  className="p-1.5 hover:bg-surface-container rounded text-body hover:text-ink"
                                  title="View Details"
                                >
                                  <span className="material-symbols-outlined text-base">visibility</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleOpenDelete(enquiry._id)}
                                  className="p-1.5 hover:bg-surface-container rounded text-mute hover:text-red-500"
                                  title="Delete Log"
                                >
                                  <span className="material-symbols-outlined text-base">delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: FLEET OPERATIONS & SWARM TELEMETRY */}
          {/* ========================================================================= */}
          {activeTab === 'fleet' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-hairline shadow-xs">
                <div>
                  <div className="flex items-center gap-2 text-mute font-mono-eyebrow text-[11px]">
                    <span>OPERATIONS</span>
                    <span className="text-outline-variant">/</span>
                    <span className="text-ink">FLEET DISPATCH</span>
                  </div>
                  <h1 className="font-heading-lg text-[22px] sm:text-[24px] text-ink tracking-tight font-semibold">
                    Autonomous Fleet Operations &amp; Airframe Telemetry
                  </h1>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFleetNotification('Broadcast telemetry sync completed. All 6 UAV transponders online.');
                    setTimeout(() => setFleetNotification(null), 3500);
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-hairline bg-surface-container-lowest hover:bg-surface-container-low text-ink font-button-md text-xs transition-all shadow-2xs self-start sm:self-auto"
                >
                  <span className="material-symbols-outlined text-base text-emerald-500">satellite_alt</span>
                  <span>Ping Transponders</span>
                </button>
              </header>

              {/* Notification banner */}
              {fleetNotification && (
                <div className="p-3.5 bg-surface-container-lowest border border-hairline rounded-xl flex items-center gap-3 text-xs text-ink shadow-xs animate-in fade-in">
                  <span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span>
                  <span>{fleetNotification}</span>
                </div>
              )}

              {/* Fleet Metric Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline shadow-2xs">
                  <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Active Airframes</span>
                  <div className="mt-2 text-[24px] font-semibold text-ink">6 / 6 Online</div>
                  <span className="text-[11px] text-emerald-500 font-mono">100% RTK Locked</span>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline shadow-2xs">
                  <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Total Flight Hours</span>
                  <div className="mt-2 text-[24px] font-semibold text-ink">2,153 hrs</div>
                  <span className="text-[11px] text-mute font-mono">Zero hull loss recorded</span>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline shadow-2xs">
                  <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Avg Link Latency</span>
                  <div className="mt-2 text-[24px] font-semibold text-ink">11.7 ms</div>
                  <span className="text-[11px] text-emerald-500 font-mono">Ultra-low C2 relay</span>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline shadow-2xs">
                  <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Next Inspection</span>
                  <div className="mt-2 text-[24px] font-semibold text-ink">In 14 hrs</div>
                  <span className="text-[11px] text-amber-500 font-mono">UAV-06 Dock Battery</span>
                </div>
              </div>

              {/* Fleet Units Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fleet.map((drone) => (
                  <div
                    key={drone.id}
                    className="p-5 bg-surface-container-lowest border border-hairline rounded-xl flex flex-col justify-between shadow-2xs space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-surface-container-low border border-hairline text-ink">
                          {drone.id}
                        </span>
                        <span
                          className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full ${
                            drone.status === 'Ready'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : drone.status === 'On Mission'
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                              : drone.status === 'Maintenance'
                              ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                              : 'bg-surface-container text-mute border border-hairline'
                          }`}
                        >
                          {drone.status}
                        </span>
                      </div>
                      <h3 className="text-[16px] font-semibold text-ink">{drone.callsign}</h3>
                      <p className="text-[12px] text-mute font-mono mt-0.5">{drone.model}</p>
                    </div>

                    <div className="p-3 bg-surface-container-low rounded-lg border border-hairline space-y-2 text-[12px]">
                      <div>
                        <span className="text-mute font-mono text-[10px] uppercase block">Sensor Payload</span>
                        <span className="text-ink font-medium">{drone.payload}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-hairline text-center font-mono">
                        <div>
                          <span className="text-[10px] text-mute block">BATTERY</span>
                          <span className="font-semibold text-ink">{drone.battery}%</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-mute block">FLIGHT</span>
                          <span className="font-semibold text-ink">{drone.flightHours}h</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-mute block">PING</span>
                          <span className="font-semibold text-emerald-500">{drone.signalLatency}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-2">
                      <select
                        value={drone.status}
                        onChange={(e) => handleDroneStatusChange(drone.id, e.target.value as DroneUnit['status'])}
                        className="flex-1 bg-surface-container-low border border-hairline rounded-lg text-xs py-1.5 px-2 text-ink focus:outline-hidden cursor-pointer"
                      >
                        <option value="Ready">Set: Ready</option>
                        <option value="On Mission">Set: On Mission</option>
                        <option value="Standby">Set: Standby</option>
                        <option value="Maintenance">Set: Maintenance</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => handleRunDiagnostics(drone.id)}
                        className="px-2.5 py-1.5 rounded-lg border border-hairline bg-surface-container-lowest hover:bg-surface-container-low text-xs text-ink font-mono transition-colors"
                        title="Run Subsystem Diagnostics"
                      >
                        DIAG
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: TRAINING TRACKS & ACADEMY COHORTS */}
          {/* ========================================================================= */}
          {activeTab === 'training' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-hairline shadow-xs">
                <div>
                  <div className="flex items-center gap-2 text-mute font-mono-eyebrow text-[11px]">
                    <span>ACADEMY</span>
                    <span className="text-outline-variant">/</span>
                    <span className="text-ink">COHORT MANAGEMENT</span>
                  </div>
                  <h1 className="font-heading-lg text-[22px] sm:text-[24px] text-ink tracking-tight font-semibold">
                    Flight Academy Cohorts &amp; Cadet Certifications
                  </h1>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setTrainingNotification('New upcoming cohort draft created: [BVLOS Winter Intensive 2026].');
                    setTimeout(() => setTrainingNotification(null), 4000);
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-ink text-canvas font-button-md text-xs hover:opacity-90 transition-opacity shadow-xs self-start sm:self-auto"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  <span>Create Cohort</span>
                </button>
              </header>

              {/* Training Notification */}
              {trainingNotification && (
                <div className="p-3.5 bg-surface-container-lowest border border-hairline rounded-xl flex items-center gap-3 text-xs text-ink shadow-xs animate-in fade-in">
                  <span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span>
                  <span>{trainingNotification}</span>
                </div>
              )}

              {/* Academy Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline shadow-2xs">
                  <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Enrolled Cadets</span>
                  <div className="mt-2 text-[24px] font-semibold text-ink">50 Students</div>
                  <span className="text-[11px] text-emerald-500 font-mono">89% Cohort Occupancy</span>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline shadow-2xs">
                  <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Certifications Issued</span>
                  <div className="mt-2 text-[24px] font-semibold text-ink">1,480+</div>
                  <span className="text-[11px] text-mute font-mono">FAA Part 107 &amp; DGCA</span>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline shadow-2xs">
                  <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Sim Lab Utilization</span>
                  <div className="mt-2 text-[24px] font-semibold text-ink">92.4%</div>
                  <span className="text-[11px] text-emerald-500 font-mono">Dual-rig cockpits</span>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline shadow-2xs">
                  <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Passing Rate</span>
                  <div className="mt-2 text-[24px] font-semibold text-ink">100%</div>
                  <span className="text-[11px] text-emerald-500 font-mono">Zero re-examinations</span>
                </div>
              </div>

              {/* Cohorts Table */}
              <div className="bg-surface-container-lowest rounded-2xl border border-hairline overflow-hidden shadow-xs">
                <div className="p-4 border-b border-hairline flex items-center justify-between">
                  <h3 className="text-[15px] font-semibold text-ink">Active &amp; Upcoming Academy Batches</h3>
                  <span className="text-xs text-mute font-mono">4 Cohorts Registered</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[680px]">
                    <thead>
                      <tr className="bg-surface-container-low/70 border-b border-hairline text-mute font-mono-eyebrow text-[11px] uppercase tracking-wider">
                        <th className="py-3 px-4 font-medium">Cohort Curriculum</th>
                        <th className="py-3 px-4 font-medium">Batch Code</th>
                        <th className="py-3 px-4 font-medium">Instructor</th>
                        <th className="py-3 px-4 font-medium">Cadets / Cap</th>
                        <th className="py-3 px-4 font-medium">Start Date</th>
                        <th className="py-3 px-4 font-medium">Status</th>
                        <th className="py-3 px-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-hairline text-[13px]">
                      {cohorts.map((cohort) => (
                        <tr key={cohort.id} className="hover:bg-surface-container-low/50 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-medium text-ink block">{cohort.title}</span>
                            <span className="text-[11px] text-mute font-mono">{cohort.duration} Program</span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-xs text-body">{cohort.code}</td>
                          <td className="py-3.5 px-4 text-ink font-medium">{cohort.instructor}</td>
                          <td className="py-3.5 px-4 font-mono text-xs">
                            <span className="text-ink font-semibold">{cohort.enrolled}</span>
                            <span className="text-mute"> / {cohort.capacity}</span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-xs text-mute">{cohort.startDate}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex px-2 py-0.5 rounded text-[11px] font-mono ${
                                cohort.status === 'Enrolling'
                                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              }`}
                            >
                              {cohort.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleIssueCertificate(cohort.code)}
                              className="px-2.5 py-1 rounded bg-surface-container-low hover:bg-ink hover:text-canvas text-xs font-mono border border-hairline transition-colors"
                            >
                              Issue Certs
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: AI COPILOT ENGINE & DIAGNOSTICS */}
          {/* ========================================================================= */}
          {activeTab === 'copilot' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-hairline shadow-xs">
                <div>
                  <div className="flex items-center gap-2 text-mute font-mono-eyebrow text-[11px]">
                    <span>AI DIAGNOSTICS</span>
                    <span className="text-outline-variant">/</span>
                    <span className="text-ink">COPILOT RULE ENGINE</span>
                  </div>
                  <h1 className="font-heading-lg text-[22px] sm:text-[24px] text-ink tracking-tight font-semibold">
                    Interactive AI Rule Matcher &amp; Query Inspector
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-mono text-xs text-mute uppercase">ENGINE ACTIVE v1.2</span>
                </div>
              </header>

              {/* Copilot KPI Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline shadow-2xs">
                  <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Match Precision</span>
                  <div className="mt-2 text-[24px] font-semibold text-ink">98.4%</div>
                  <span className="text-[11px] text-emerald-500 font-mono">Deterministic Rules</span>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline shadow-2xs">
                  <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Avg Inference</span>
                  <div className="mt-2 text-[24px] font-semibold text-ink">14 ms</div>
                  <span className="text-[11px] text-emerald-500 font-mono">Zero External API Drift</span>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline shadow-2xs">
                  <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Lead Conversions</span>
                  <div className="mt-2 text-[24px] font-semibold text-ink">34.2%</div>
                  <span className="text-[11px] text-mute font-mono">CTA Action Directs</span>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-hairline shadow-2xs">
                  <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Total Queries Served</span>
                  <div className="mt-2 text-[24px] font-semibold text-ink">3,840+</div>
                  <span className="text-[11px] text-mute font-mono">100% Uptime</span>
                </div>
              </div>

              {/* Interactive Rule Engine Tester */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6 bg-surface-container-lowest p-6 rounded-2xl border border-hairline shadow-xs space-y-4">
                  <h3 className="text-[16px] font-semibold text-ink flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">terminal</span>
                    Live Rule Engine Tester
                  </h3>
                  <p className="text-[13px] text-body">
                    Type any user prompt to evaluate deterministic regex patterns, action payloads, and matched bot responses.
                  </p>

                  <div className="space-y-3">
                    <input
                      type="text"
                      value={copilotTestQuery}
                      onChange={(e) => {
                        setCopilotTestQuery(e.target.value);
                        handleRunCopilotTest(e.target.value);
                      }}
                      placeholder="e.g. Can you inspect power lines?"
                      className="w-full bg-surface-container-low border border-hairline rounded-lg px-3.5 py-2.5 text-sm text-ink focus:outline-hidden focus:border-ink transition-colors"
                    />

                    {/* Quick test pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'What services does DroneTV provide?',
                        'What courses / training are available?',
                        'What are the eligibility requirements for DGCA Pilot License?',
                        'What is the fee structure / pricing?',
                        'What drone payloads & sensors do you support?',
                        'How does precision agriculture spraying work?',
                        'I want to speak with someone.',
                      ].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            setCopilotTestQuery(preset);
                            handleRunCopilotTest(preset);
                          }}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-ink hover:text-canvas text-body border border-hairline transition-colors cursor-pointer"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-surface-container-lowest p-6 rounded-2xl border border-hairline shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-ink">Matched Rule Output</h3>
                    <span className="text-[11px] font-mono text-emerald-500">
                      ⚡ {copilotTestResult.latency}ms latency
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-low border border-hairline space-y-3">
                    <div>
                      <span className="text-[10px] font-mono text-mute uppercase block mb-1">
                        Synthesized Response
                      </span>
                      <p className="text-[13px] text-ink leading-relaxed whitespace-pre-wrap font-sans">
                        {copilotTestResult.response}
                      </p>
                    </div>

                    {copilotTestResult.action && (
                      <div className="pt-2 border-t border-hairline flex items-center justify-between text-xs">
                        <span className="font-mono text-mute">Action Payload:</span>
                        <span className="font-mono px-2 py-0.5 rounded bg-surface-container-lowest border border-hairline text-ink font-semibold">
                          {copilotTestResult.action.label} ({copilotTestResult.action.payload || 'None'})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: TELEMETRY NODES & SYSTEM HEALTH */}
          {/* ========================================================================= */}
          {activeTab === 'system' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-hairline shadow-xs">
                <div>
                  <div className="flex items-center gap-2 text-mute font-mono-eyebrow text-[11px]">
                    <span>INFRASTRUCTURE</span>
                    <span className="text-outline-variant">/</span>
                    <span className="text-ink">TELEMETRY NODES</span>
                  </div>
                  <h1 className="font-heading-lg text-[22px] sm:text-[24px] text-ink tracking-tight font-semibold">
                    System Architecture &amp; Security Audits
                  </h1>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-surface-container-low border border-hairline">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-mono text-xs text-ink font-medium">SFO-09 RELAY 99.99%</span>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-surface-container-lowest border border-hairline shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Database Layer</span>
                    <span className="material-symbols-outlined text-emerald-500 text-lg">database</span>
                  </div>
                  <div className="text-[18px] font-semibold text-ink">MongoDB Mongoose 9</div>
                  <p className="text-[12px] text-body">
                    Automated indexes on status, userType, and email. Resilient replica connections.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-surface-container-lowest border border-hairline shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Cryptographic Auth</span>
                    <span className="material-symbols-outlined text-blue-500 text-lg">key</span>
                  </div>
                  <div className="text-[18px] font-semibold text-ink">JWT &amp; Helmet Guard</div>
                  <p className="text-[12px] text-body">
                    HMAC-SHA256 bearer tokens with 24-hour expiration and CORS header security.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-surface-container-lowest border border-hairline shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-eyebrow text-[11px] text-mute uppercase">Schema Validation</span>
                    <span className="material-symbols-outlined text-purple-500 text-lg">verified_user</span>
                  </div>
                  <div className="text-[18px] font-semibold text-ink">Zod Type Guard</div>
                  <p className="text-[12px] text-body">
                    Bidirectional runtime typing on API payloads and client react-hook-form resolvers.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Detail Modal */}
      <EnquiryDetailModal
        isOpen={isDetailOpen}
        enquiry={selectedEnquiry}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedEnquiry(null);
        }}
        onStatusChange={handleStatusUpdate}
        onDelete={(id) => {
          setIsDetailOpen(false);
          handleOpenDelete(id);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingId(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        itemLabel="this flight enquiry record"
      />
    </div>
  );
};
