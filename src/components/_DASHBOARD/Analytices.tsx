"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface WeekData {
  week: string;
  value: number;
  isHighlighted: boolean;
}

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface WardData {
  name: string;
  activeIssues: number;
  avgResponse: string;
  satisfaction: number;
  trend: "up" | "down" | "stable";
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const weekData: WeekData[] = [
  { week: "Week 1", value: 45, isHighlighted: false },
  { week: "Week 2", value: 58, isHighlighted: false },
  { week: "Week 3", value: 94, isHighlighted: true },
  { week: "Week 4", value: 52, isHighlighted: false },
];

const donutSegments: DonutSegment[] = [
  { label: "Infrastructure", value: 45, color: "#001F54" },
  { label: "Sanitation", value: 25, color: "#7C3AED" },
  { label: "Safety", value: 18, color: "#22C55E" },
  { label: "Other", value: 12, color: "#E2E8F0" },
];

const wardData: WardData[] = [
  { name: "North Hills District", activeIssues: 142, avgResponse: "14.2 Hours", satisfaction: 88, trend: "up" },
  { name: "Central Metro", activeIssues: 403, avgResponse: "8.4 Hours", satisfaction: 96, trend: "up" },
  { name: "Riverside South", activeIssues: 211, avgResponse: "32.1 Hours", satisfaction: 62, trend: "down" },
  { name: "Oakwood Ridge", activeIssues: 89, avgResponse: "22.8 Hours", satisfaction: 79, trend: "stable" },
];

const satisfactionColors: Record<number, string> = {
  88: "bg-green-500",
  96: "bg-[#001F54]",
  62: "bg-red-500",
  79: "bg-blue-400",
};

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function ResolutionRateCard() {
  const maxValue = 100;

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
    >
      <div className="mb-4">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          Resolution Rate
        </h3>
      </div>

      <div className="flex items-baseline gap-3 mb-8">
        <motion.span
          className="text-[48px] font-extrabold text-slate-900 leading-none tracking-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          94.2%
        </motion.span>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="bg-green-100 text-green-700 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          </svg>
          +2.4%
        </motion.div>
      </div>

      {/* Bar Chart Container */}
      <div className="relative h-[140px] mb-3">
        <div className="flex items-end justify-between gap-3 h-full">
          {weekData.map((item, index) => {
            const heightPercent = (item.value / maxValue) * 100;
            
            return (
              <div key={item.week} className="flex-1 flex flex-col justify-end h-full">
                {/* Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${item.isHighlighted ? heightPercent : heightPercent * 0.4}%` }}
                  transition={{ 
                    delay: 0.3 + index * 0.1, 
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                  className={`w-full rounded-t-md ${
                    item.isHighlighted ? "bg-[#001F54]" : "bg-slate-100"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Week Labels */}
      <div className="flex justify-between pt-4 border-t border-slate-100">
        {weekData.map((item, index) => (
          <motion.div
            key={item.week}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex-1 text-center"
          >
            <span className={`text-[10px] font-bold uppercase tracking-[0.1em] ${
              item.isHighlighted ? "text-[#001F54]" : "text-slate-400"
            }`}>
              {item.week}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function DonutChart() {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-[160px] h-[160px] flex-shrink-0">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          {donutSegments.map((seg, i) => {
            const segLen = (seg.value / 100) * circumference;
            const currentOffset = offset;
            offset += segLen;
            return (
              <motion.circle
                key={seg.label}
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth="12"
                strokeDasharray={`${segLen} ${circumference - segLen}`}
                strokeDashoffset={-currentOffset}
                strokeLinecap="butt"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: -currentOffset }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-[28px] font-bold text-slate-900"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            1.2k
          </motion.span>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
            Reports
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {donutSegments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-[12px] font-medium text-slate-600">{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IssueCategoriesCard() {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
    >
      <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-6">
        Issue Categories
      </h3>
      <div className="flex items-center justify-center">
        <DonutChart />
      </div>
    </motion.div>
  );
}

function WardPerformanceTable() {
  const trendIcons = {
    up: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    down: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
      </svg>
    ),
    stable: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="15 8 19 12 15 16" />
      </svg>
    ),
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h3 className="text-[15px] font-bold text-slate-800">
          Ward Performance Index
        </h3>
        <motion.button
          whileHover={{ x: 3 }}
          className="text-[12px] font-semibold text-[#1E3A8A] hover:underline"
        >
          View All Data →
        </motion.button>
      </div>

      <div className="grid grid-cols-[2fr_1fr_1fr_1.5fr_0.5fr] px-6 py-3 bg-slate-50 border-b border-slate-100">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Ward Name</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Active Issues</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Avg. Response</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Satisfaction</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Trend</span>
      </div>

      {wardData.map((ward, i) => (
        <motion.div
          key={ward.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
          className="grid grid-cols-[2fr_1fr_1fr_1.5fr_0.5fr] px-6 py-4 border-b border-slate-50 last:border-b-0 hover:bg-slate-50/50 transition-colors items-center"
        >
          <span className="text-[13px] font-semibold text-slate-800">{ward.name}</span>
          <span className="text-[13px] font-semibold text-slate-600">{ward.activeIssues}</span>
          <span className="text-[13px] font-medium text-slate-500">{ward.avgResponse}</span>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${satisfactionColors[ward.satisfaction] || "bg-blue-500"}`}
                initial={{ width: 0 }}
                animate={{ width: `${ward.satisfaction}%` }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
              />
            </div>
            <span className="text-[12px] font-bold text-slate-700 w-8 text-right">
              {ward.satisfaction}%
            </span>
          </div>

          <div className="flex justify-center">
            {trendIcons[ward.trend]}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function Analytics() {
  const [dateRange, setDateRange] = useState("Oct 1, 2023 — Oct 31, 2023");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[#F8FAFC] p-6"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-5">

        {/* Top Bar */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 bg-white rounded-lg px-4 py-2.5 border border-slate-200 shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="text-[13px] font-medium text-slate-700 bg-transparent outline-none cursor-pointer appearance-none pr-4"
            >
              <option>Oct 1, 2023 — Oct 31, 2023</option>
              <option>Sep 1, 2023 — Sep 30, 2023</option>
              <option>Aug 1, 2023 — Aug 31, 2023</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[12px] font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              CSV
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-[#001F54] hover:bg-[#002B7A] text-white text-[12px] font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Export PDF Report
            </motion.button>
          </div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-5">
          <ResolutionRateCard />
          <IssueCategoriesCard />
        </div>

        {/* Ward Performance Table */}
        <WardPerformanceTable />

      </div>
    </motion.div>
  );
}