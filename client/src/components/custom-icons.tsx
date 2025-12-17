import React from "react";

export const IconBase = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`w-full h-full ${className}`}
  >
    {children}
  </svg>
);

export const MultiColorChart = ({ size = 24 }: { size?: number }) => (
  <div style={{ width: size, height: size }}>
    <IconBase>
      <path d="M3 3v18h18" className="text-slate-400" strokeWidth="1.5" />
      <path d="M18 17V9" className="text-indigo-500" />
      <path d="M13 17V5" className="text-blue-500" />
      <path d="M8 17v-3" className="text-sky-400" />
      <circle cx="13" cy="5" r="1" className="text-amber-400 fill-amber-400 stroke-none" />
    </IconBase>
  </div>
);

export const MultiColorBuilding = ({ size = 24 }: { size?: number }) => (
  <div style={{ width: size, height: size }}>
    <IconBase>
      <rect x="4" y="2" width="16" height="20" rx="2" className="text-slate-700 dark:text-slate-300" strokeWidth="1.5" />
      <path d="M9 22v-4h6v4" className="text-slate-400" />
      <path d="M8 6h.01" className="text-blue-500" strokeWidth="3" />
      <path d="M16 6h.01" className="text-blue-500" strokeWidth="3" />
      <path d="M8 10h.01" className="text-indigo-500" strokeWidth="3" />
      <path d="M16 10h.01" className="text-indigo-500" strokeWidth="3" />
      <path d="M8 14h.01" className="text-sky-500" strokeWidth="3" />
      <path d="M16 14h.01" className="text-sky-500" strokeWidth="3" />
    </IconBase>
  </div>
);

export const MultiColorUsers = ({ size = 24 }: { size?: number }) => (
  <div style={{ width: size, height: size }}>
    <IconBase>
      {/* Back Person */}
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" className="text-blue-600" />
      <circle cx="9" cy="7" r="4" className="text-blue-400" />
      {/* Front/Interaction Element */}
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" className="text-emerald-500" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" className="text-emerald-400" />
    </IconBase>
  </div>
);

export const MultiColorHandshake = ({ size = 24 }: { size?: number }) => (
  <div style={{ width: size, height: size }}>
    <IconBase>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" className="text-blue-500" />
      <path d="m9 20 2-2-5-5a4 4 0 0 1 0-5.66l.7-.7a4 4 0 0 1 5.67 0" className="text-indigo-500" />
      <path d="m13 14 1 1" className="text-slate-300" />
      <path d="m14.83 9.17a4 4 0 1 1 5.66 5.66l-5 5-2-2" className="text-emerald-500" />
    </IconBase>
  </div>
);

export const MultiColorZap = ({ size = 24 }: { size?: number }) => (
  <div style={{ width: size, height: size }}>
    <IconBase>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" className="text-amber-500" strokeWidth="2" fill="rgba(245, 158, 11, 0.1)" />
      <path d="M12 10v4" className="text-amber-600" strokeWidth="1" />
    </IconBase>
  </div>
);

export const MultiColorStethoscope = ({ size = 24 }: { size?: number }) => (
  <div style={{ width: size, height: size }}>
    <IconBase>
      <path d="M4.8 2.3A.3.3 0 0 1 5 2h14a.3.3 0 0 1 .2.3v3.4a3 3 0 0 1-3 3v0a3 3 0 0 1-3-3V2" className="text-slate-400" />
      <path d="M13.2 5.3a3 3 0 0 1-3 3v8.4a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V11" className="text-slate-500" />
      <circle cx="12" cy="19" r="3" className="text-rose-500" fill="rgba(244, 63, 94, 0.1)" />
      <path d="M12 19h.01" className="text-rose-600" strokeWidth="4" />
    </IconBase>
  </div>
);

export const MultiColorActivity = ({ size = 24 }: { size?: number }) => (
  <div style={{ width: size, height: size }}>
    <IconBase>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" className="text-rose-500" strokeWidth="2" />
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" className="text-slate-200" strokeWidth="1.5" strokeDasharray="4 4" />
    </IconBase>
  </div>
);

export const MultiColorDollar = ({ size = 24 }: { size?: number }) => (
  <div style={{ width: size, height: size }}>
    <IconBase>
      <rect x="2" y="5" width="20" height="14" rx="2" className="text-emerald-600" />
      <line x1="2" y1="10" x2="22" y2="10" className="text-emerald-500/30" />
      <circle cx="12" cy="12" r="2" className="text-emerald-400" fill="currentColor" />
    </IconBase>
  </div>
);

export const MultiColorClock = ({ size = 24 }: { size?: number }) => (
  <div style={{ width: size, height: size }}>
    <IconBase>
      <circle cx="12" cy="12" r="10" className="text-slate-300" />
      <polyline points="12 6 12 12 16 14" className="text-orange-500" strokeWidth="2" />
      <circle cx="12" cy="12" r="1" className="text-orange-600 fill-orange-600 stroke-none" />
    </IconBase>
  </div>
);

export const MultiColorTrendUp = ({ size = 24 }: { size?: number }) => (
  <div style={{ width: size, height: size }}>
    <IconBase>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" className="text-slate-300" />
      <polyline points="17 6 23 6 23 12" className="text-green-500" />
      <path d="M23 6 13.5 15.5" className="text-green-500" strokeWidth="2" />
    </IconBase>
  </div>
);

export const MultiColorX = ({ size = 24 }: { size?: number }) => (
  <div style={{ width: size, height: size }}>
    <IconBase>
      <circle cx="12" cy="12" r="10" className="text-red-100" fill="rgba(254, 226, 226, 0.5)" stroke="none" />
      <path d="M15 9l-6 6" className="text-red-500" strokeWidth="2" />
      <path d="M9 9l6 6" className="text-red-500" strokeWidth="2" />
    </IconBase>
  </div>
);

export const MultiColorKey = ({ size = 24 }: { size?: number }) => (
  <div style={{ width: size, height: size }}>
    <IconBase>
      <circle cx="7.5" cy="15.5" r="5.5" className="text-amber-500" fill="rgba(245, 158, 11, 0.2)" />
      <path d="m21 2-9.6 9.6" className="text-amber-600" strokeWidth="2" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" className="text-amber-400" strokeWidth="2" />
    </IconBase>
  </div>
);
