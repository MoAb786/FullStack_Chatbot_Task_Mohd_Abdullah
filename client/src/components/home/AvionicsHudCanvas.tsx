import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface Waypoint {
  x: number;
  y: number;
  z: number;
  label: string;
}

export const AvionicsHudCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Interactive HUD States
  const [viewMode, setViewMode] = useState<'3D' | 'RADAR'>('3D');
  const [swarmMode, setSwarmMode] = useState(false);
  const [liveAltitude, setLiveAltitude] = useState(120.4);
  const [liveVelocity, setLiveVelocity] = useState(18.2);
  const [livePitch, setLivePitch] = useState(2.4);
  const [liveRoll, setLiveRoll] = useState(-1.8);
  const [batteryState] = useState(94.8);

  // Mouse / Touch Rotation and Parallax
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovered: false });

  // Waypoints in local coordinate space
  const waypoints: Waypoint[] = [
    { x: -110, y: 50, z: -30, label: 'WP: ALPHA-1' },
    { x: -40, y: -40, z: 20, label: 'WP: BRAVO-2' },
    { x: 50, y: 20, z: -10, label: 'WP: CHARLIE-3' },
    { x: 120, y: -70, z: 40, label: 'WP: DELTA-4' },
  ];

  useEffect(() => {
    // Live telemetry subtle fluctuation
    const telemetryInterval = setInterval(() => {
      setLiveAltitude((prev) => +(120 + Math.sin(Date.now() / 1500) * 2.4).toFixed(1));
      setLiveVelocity((prev) => +(18 + Math.cos(Date.now() / 2000) * 1.6).toFixed(1));
    }, 400);

    return () => clearInterval(telemetryInterval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const handleResize = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      time += 0.025;
      const container = containerRef.current;
      if (!container || !canvas) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      setLivePitch(+((mouseRef.current.y * 14) + Math.sin(time) * 1.5).toFixed(1));
      setLiveRoll(+((mouseRef.current.x * -18) + Math.cos(time * 0.8) * 1.2).toFixed(1));

      ctx.clearRect(0, 0, width, height);

      // Theme Colors
      const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');
      const primaryColor = isDark ? '#ededed' : '#171717';
      const hairlineColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
      const accentCyan = isDark ? '#00e5ff' : '#0070f3';
      const accentGreen = '#10b981';
      const gridColor = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)';

      // 1. TOPOLOGICAL BACKGROUND GRID
      const gridSize = 32;
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. RADAR HUD RINGS & SWEEP
      ctx.save();
      ctx.translate(centerX, centerY);

      // Radar Concentric Circles
      const maxRadius = Math.min(width, height) * 0.42;
      [0.35, 0.65, 0.95].forEach((fraction, i) => {
        const r = maxRadius * fraction;
        ctx.strokeStyle = hairlineColor;
        ctx.lineWidth = 1;
        ctx.setLineDash(i === 0 ? [2, 4] : i === 1 ? [4, 6] : []);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Axis crosshairs
      ctx.strokeStyle = hairlineColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-maxRadius * 0.98, 0);
      ctx.lineTo(maxRadius * 0.98, 0);
      ctx.moveTo(0, -maxRadius * 0.98);
      ctx.lineTo(0, maxRadius * 0.98);
      ctx.stroke();

      // Rotating Radar Sweep Ray
      const sweepAngle = time * 0.8;
      const grad = ctx.createConicGradient(sweepAngle, 0, 0);
      grad.addColorStop(0, isDark ? 'rgba(0, 229, 255, 0.16)' : 'rgba(0, 112, 243, 0.12)');
      grad.addColorStop(0.12, 'transparent');
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, maxRadius * 0.95, 0, Math.PI * 2);
      ctx.fill();

      // Radar sweep leading edge line
      ctx.strokeStyle = isDark ? 'rgba(0, 229, 255, 0.4)' : 'rgba(0, 112, 243, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(sweepAngle) * maxRadius * 0.95, Math.sin(sweepAngle) * maxRadius * 0.95);
      ctx.stroke();

      // Compass Bearing Ticks (N, E, S, W)
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = isDark ? '#737373' : '#8f8f8f';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('000° N', 0, -maxRadius * 0.95 + 12);
      ctx.fillText('090° E', maxRadius * 0.95 - 16, 0);
      ctx.fillText('180° S', 0, maxRadius * 0.95 - 12);
      ctx.fillText('270° W', -maxRadius * 0.95 + 16, 0);

      // 3. FLIGHT PATH & WAYPOINTS
      const rotX = mouseRef.current.y * 0.4 + (viewMode === '3D' ? 0.35 : 0);
      const rotY = mouseRef.current.x * 0.6 + time * 0.1;

      // Project 3D coordinate to 2D
      const project = (x: number, y: number, z: number) => {
        if (viewMode === 'RADAR') {
          return { px: x, py: y };
        }
        // 3D Isometric projection with rotation
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);

        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        const scale = 280 / (280 + z2 * 0.4);
        return {
          px: x1 * scale,
          py: y1 * scale,
        };
      };

      // Draw Flight Path Trajectory Line
      ctx.beginPath();
      waypoints.forEach((wp, idx) => {
        const { px, py } = project(wp.x, wp.y, wp.z);
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 1.75;
      ctx.stroke();

      // Animated Signal Pulse Traveling along Flight Path
      const pulseProgress = (time * 0.4) % 1;
      const totalSegments = waypoints.length - 1;
      const currentSegment = Math.min(Math.floor(pulseProgress * totalSegments), totalSegments - 1);
      const segProgress = (pulseProgress * totalSegments) - currentSegment;

      const p1 = waypoints[currentSegment];
      const p2 = waypoints[currentSegment + 1];
      const pulseX = p1.x + (p2.x - p1.x) * segProgress;
      const pulseY = p1.y + (p2.y - p1.y) * segProgress;
      const pulseZ = p1.z + (p2.z - p1.z) * segProgress;
      const pulse2D = project(pulseX, pulseY, pulseZ);

      // Glow pulse packet
      ctx.fillStyle = accentCyan;
      ctx.beginPath();
      ctx.arc(pulse2D.px, pulse2D.py, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Waypoint Nodes
      waypoints.forEach((wp, idx) => {
        const { px, py } = project(wp.x, wp.y, wp.z);
        const isSelected = idx === 0;

        ctx.fillStyle = isSelected ? primaryColor : isDark ? '#a1a1a1' : '#666666';
        ctx.beginPath();
        ctx.arc(px, py, isSelected ? 4.5 : 3, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing ring on active waypoint
        if (isSelected) {
          const pulseR = 4.5 + (Math.sin(time * 3) + 1) * 3;
          ctx.strokeStyle = accentCyan;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(px, py, pulseR, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Waypoint Label
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = isDark ? '#a1a1a1' : '#4d4d4d';
        ctx.textAlign = 'left';
        ctx.fillText(wp.label, px + 7, py - 4);
      });

      // 4. MAIN QUADCOPTER DRONE (3D Wireframe at Center)
      const droneHoverY = Math.sin(time * 2.2) * 5;
      const droneHoverX = Math.cos(time * 1.5) * 4;
      const droneCenter = project(droneHoverX, droneHoverY, 0);

      // Drone Arms
      const armLength = 26;
      const angles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
      const rotorPositions = angles.map((ang) => {
        const x = Math.cos(ang + (viewMode === '3D' ? rotY * 0.4 : 0)) * armLength;
        const y = Math.sin(ang) * armLength * (viewMode === '3D' ? 0.6 : 1);
        return project(droneHoverX + x, droneHoverY + y, 0);
      });

      // Draw Drone Frame Body Cross
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      rotorPositions.forEach((rp, i) => {
        if (i % 2 === 0) {
          ctx.moveTo(droneCenter.px, droneCenter.py);
          ctx.lineTo(rp.px, rp.py);
        } else {
          ctx.moveTo(droneCenter.px, droneCenter.py);
          ctx.lineTo(rp.px, rp.py);
        }
      });
      ctx.stroke();

      // Draw Spinning Propeller Discs
      rotorPositions.forEach((rp) => {
        const propSpin = time * 24;
        ctx.strokeStyle = isDark ? 'rgba(0, 229, 255, 0.6)' : 'rgba(0, 112, 243, 0.6)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(rp.px, rp.py, 8, 4, propSpin, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = primaryColor;
        ctx.beginPath();
        ctx.arc(rp.px, rp.py, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Central Flight Controller Core
      ctx.fillStyle = isDark ? '#121212' : '#ffffff';
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(droneCenter.px, droneCenter.py, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Heading Vector Indicator Arrow
      const headingLength = 16;
      const headingAngle = -Math.PI / 2 + mouseRef.current.x * 0.5;
      ctx.strokeStyle = accentGreen;
      ctx.lineWidth = 1.75;
      ctx.beginPath();
      ctx.moveTo(droneCenter.px, droneCenter.py);
      ctx.lineTo(
        droneCenter.px + Math.cos(headingAngle) * headingLength,
        droneCenter.py + Math.sin(headingAngle) * headingLength
      );
      ctx.stroke();

      // 5. OPTIONAL SWARM WINGMEN BLIPS
      if (swarmMode) {
        [
          { x: -70, y: -60, z: -10, id: 'UAV-02' },
          { x: 80, y: 70, z: 20, id: 'UAV-03' },
        ].forEach((sw) => {
          const swHover = project(sw.x + Math.sin(time + sw.x) * 3, sw.y + Math.cos(time) * 3, sw.z);
          ctx.fillStyle = accentCyan;
          ctx.beginPath();
          ctx.arc(swHover.px, swHover.py, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = accentCyan;
          ctx.lineWidth = 0.8;
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.arc(swHover.px, swHover.py, 7, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillStyle = isDark ? '#a1a1a1' : '#4d4d4d';
          ctx.fillText(sw.id, swHover.px + 9, swHover.py);
        });
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, viewMode, swarmMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseRef.current.targetX = nx;
    mouseRef.current.targetY = ny;
    mouseRef.current.isHovered = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
    mouseRef.current.isHovered = false;
  };

  return (
    <div className="relative rounded-2xl bg-surface-container-lowest border border-hairline p-5 shadow-xs overflow-hidden">
      {/* HUD Header Bar */}
      <div className="flex items-center justify-between pb-3.5 border-b border-hairline mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono-eyebrow text-[11px] text-body uppercase tracking-wider font-semibold">
            HUD // VECTOR TELEMETRY
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <button
            type="button"
            onClick={() => setViewMode((m) => (m === '3D' ? 'RADAR' : '3D'))}
            className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-container-low hover:bg-ink hover:text-canvas text-ink border border-hairline transition-colors"
          >
            VIEW: {viewMode}
          </button>
          <button
            type="button"
            onClick={() => setSwarmMode((s) => !s)}
            className={`font-mono text-[10px] px-2 py-0.5 rounded border transition-colors ${
              swarmMode
                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 font-semibold'
                : 'bg-surface-container-low text-mute border-hairline hover:text-ink'
            }`}
          >
            SWARM: {swarmMode ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Vector Radar Interactive Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-square rounded-xl bg-canvas border border-hairline flex items-center justify-center overflow-hidden cursor-crosshair group"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />

        {/* Central HUD Status Badge */}
        <div className="relative z-10 flex flex-col items-center justify-center p-2.5 rounded-lg bg-surface-container-lowest/90 backdrop-blur-xs border border-hairline shadow-xs pointer-events-none transition-transform duration-100 group-hover:scale-105">
          <span className="material-symbols-outlined text-ink text-lg">flight_takeoff</span>
          <span className="font-mono text-[10px] text-body mt-0.5 font-medium">UAV-01 LOCKED</span>
        </div>

        {/* Waypoint Overlay Chips */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-surface-container-lowest/90 backdrop-blur-xs border border-hairline shadow-xs pointer-events-none">
          <span className="font-mono text-[11px] text-mute">
            PITCH/ROLL: <span className="text-ink font-semibold">{livePitch}° / {liveRoll}°</span>
          </span>
        </div>

        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-surface-container-lowest/90 backdrop-blur-xs border border-hairline shadow-xs pointer-events-none">
          <span className="font-mono text-[11px] text-mute">
            LINK: <span className="text-emerald-500 font-semibold">RTK SECURE 99.8%</span>
          </span>
        </div>

        {/* Hover guidance tooltip */}
        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-surface-container-lowest/80 text-[10px] font-mono text-mute border border-hairline opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Interactive Gyro Scope
        </div>
      </div>

      {/* Telemetry Matrix Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 mt-2">
        <div className="p-2.5 rounded-lg bg-surface-container-low border border-hairline text-center">
          <div className="font-mono-eyebrow text-[10px] text-mute uppercase">ALTITUDE</div>
          <div className="font-mono text-xs text-ink font-semibold mt-0.5">{liveAltitude}M</div>
        </div>
        <div className="p-2.5 rounded-lg bg-surface-container-low border border-hairline text-center">
          <div className="font-mono-eyebrow text-[10px] text-mute uppercase">VELOCITY</div>
          <div className="font-mono text-xs text-ink font-semibold mt-0.5">{liveVelocity}M/S</div>
        </div>
        <div className="p-2.5 rounded-lg bg-surface-container-low border border-hairline text-center">
          <div className="font-mono-eyebrow text-[10px] text-mute uppercase">SAT-LOCK</div>
          <div className="font-mono text-xs text-ink font-semibold mt-0.5">24 POS</div>
        </div>
        <div className="p-2.5 rounded-lg bg-surface-container-low border border-hairline text-center">
          <div className="font-mono-eyebrow text-[10px] text-mute uppercase">BATTERY</div>
          <div className="font-mono text-xs text-emerald-500 font-semibold mt-0.5">{batteryState}%</div>
        </div>
      </div>
    </div>
  );
};
