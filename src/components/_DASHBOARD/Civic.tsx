import { useState } from "react";

// ─── TYPES ───────────────────────────────────────────────────────────────────

type BadgeVariant = "trend" | "action" | "field" | "check";
type Status = "Pending" | "In Progress" | "Resolved";
type Impact = "High" | "Med" | "Low";
type Category = "Infrastructure" | "Sanitation";
type ModType = "flagged" | "duplicate";

interface StatCard {
  label: string;
  value: string;
  badge: string;
  badgeVariant: BadgeVariant;
  resolved?: boolean;
}

interface ModerationItem {
  id: number;
  title: string;
  sub: string;
  type: ModType;
}

interface ActivityReport {
  id: number;
  emoji: string;
  name: string;
  meta: string;
  category: Category;
  status: Status;
  impact: Impact;
}

// ─── DATA ───────────────────────────────────────────────────────────────────

const statsData: StatCard[] = [
  { label: "Total Reports", value: "2,842", badge: "↑ 12%",        badgeVariant: "trend"  },
  { label: "Pending",       value: "142",   badge: "Action Needed", badgeVariant: "action" },
  { label: "In Progress",   value: "89",    badge: "In Field",      badgeVariant: "field"  },
  { label: "Resolved",      value: "2,611", badge: "✓",             badgeVariant: "check", resolved: true },
];

const moderationData: ModerationItem[] = [
  { id: 284, title: "Flagged Content #284", sub: "Potentially inappropriate image in pothole report.", type: "flagged"   },
  { id: 285, title: "Duplicate Check",      sub: "3 similar reports for 'Broken Streetlight' in 200m.", type: "duplicate" },
];

const activityData: ActivityReport[] = [
  { id: 1, emoji: "🚧", name: "Pavement Crack – Oak St",     meta: "Submitted 2h ago by J. Doe",    category: "Infrastructure", status: "Pending",     impact: "High" },
  { id: 2, emoji: "🗑️", name: "Overflowing Trash Bin",      meta: "Submitted 4h ago by Citizen99",  category: "Sanitation",     status: "In Progress", impact: "Low"  },
  { id: 3, emoji: "💡", name: "Broken Street Light",         meta: "Submitted 6h ago by A. Rahman",  category: "Infrastructure", status: "Resolved",    impact: "High" },
  { id: 4, emoji: "🌊", name: "Water Logging – Main Rd",    meta: "Submitted 8h ago by M. Hasan",   category: "Infrastructure", status: "Pending",     impact: "Med"  },
  { id: 5, emoji: "🗑️", name: "Illegal Dumping – Park Ave", meta: "Submitted 10h ago by S. Islam",  category: "Sanitation",     status: "In Progress", impact: "Med"  },
  { id: 6, emoji: "🚧", name: "Pothole – Bridge Rd",         meta: "Submitted 12h ago by T. Ali",    category: "Infrastructure", status: "Resolved",    impact: "Low"  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

const statusStyles: Record<Status, string> = {
  "Pending":     "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-700",
  "Resolved":    "bg-green-100 text-green-700",
};

const impactStyles: Record<Impact, string> = {
  High: "text-red-500 font-semibold",
  Med:  "text-orange-500 font-semibold",
  Low:  "text-slate-400 font-semibold",
};

const impactLabel: Record<Impact, string> = {
  High: "⚡ High",
  Med:  "▲ Med",
  Low:  "↓ Low",
};

const badgeStyles: Record<BadgeVariant, string> = {
  trend:  "text-green-500 text-xs font-semibold",
  action: "bg-red-100 text-red-700 text-[10px] font-semibold px-2 py-0.5 rounded-full",
  field:  "bg-green-100 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded-full",
  check:  "w-6 h-6 rounded-full bg-white/10 flex items-center justify-center",
};

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function StatCardItem({ card }: { card: StatCard }) {
  return (
    <div
      className={cn(
        "rounded-[12px] p-6 transition-shadow hover:shadow-md flex flex-col justify-between",
        card.resolved
          ? "bg-gradient-to-br from-[#001340] to-[#00256C] text-white border-none"
          : "bg-white border border-slate-200"
      )}
      // Increased width from 280px to 320px for more space
      style={{ width: "320px", height: "112px" }} 
    >
      {/* Label */}
      <p className={cn(
        "text-[10px] font-bold tracking-[0.2em] uppercase",
        card.resolved ? "text-white/60" : "text-slate-400"
      )}>
        {card.label}
      </p>
      
      {/* Value + Badge Row */}
      <div className="flex items-center gap-3">
        <span className={cn(
          "font-bold leading-none",
          card.resolved ? "text-[32px] tracking-tight" : "text-[28px] text-slate-900"
        )}>
          {card.value}
        </span>
        
        {/* Check Badge (Resolved Card) */}
        {card.badgeVariant === "check" && card.resolved && (
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-green-600">
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-green-400"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
        
        {/* Other Badges (Trend/Action/Field) */}
        {card.badgeVariant !== "check" && (
          <span className={cn(
            "flex-shrink-0",
            badgeStyles[card.badgeVariant]
          )}>
            {card.badge}
          </span>
        )}
      </div>
    </div>
  );
}
function ComplaintMap() {
  const [active, setActive] = useState<"Infrastructure" | "Sanitation">("Infrastructure");

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="flex items-start justify-between px-5 pt-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">Complaint Density</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">Real-time civic impact map</p>
        </div>
        <div className="flex gap-2">
          {(["Infrastructure", "Sanitation"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={cn(
                "text-[11px] font-semibold px-3 py-1 rounded-full border transition-all",
                active === f
                  ? "bg-[#0f1b2d] text-white border-transparent"
                  : "border-slate-200 text-slate-500 hover:bg-slate-50"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Map Image Container */}
      <div className="relative mt-3 bg-[#0a1628] h-[500px] overflow-hidden">
        {/* Replace this src with your Figma map image */}
        <img
          src="/banner.svg"
          alt="Complaint Density Map"
          className="w-full h-full object-cover"
        />
        
        {/* Tooltip - Overlay */}
        <div className="absolute bottom-5 right-5 bg-white rounded-xl px-4 py-3 shadow-xl min-w-[160px]">
          <p className="text-[12px] font-bold text-slate-800 mb-1.5">Hotspot: River North</p>
          <div className="h-1 bg-slate-100 rounded-full mb-1.5">
            <div className="h-1 w-4/5 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full" />
          </div>
          <p className="text-[10px] text-slate-400">80% resolving faster than avg</p>
        </div>
      </div>
    </div>
  );
}

function LiveModeration() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-slate-900">Live Moderation</h2>
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {moderationData.map((item) => (
          <div 
            key={item.id} 
            className={cn(
              "bg-white rounded-xl p-4 border-l-4 shadow-sm",
              item.type === "flagged" ? "border-l-red-500 border border-slate-100" : "border-l-blue-500 border border-slate-100"
            )}
          >
            <p className="text-sm font-semibold text-slate-900 mb-1.5">{item.title}</p>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">{item.sub}</p>
            {item.type === "flagged" ? (
              <div className="flex gap-2">
                <button className="text-xs font-semibold bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
                  Dismiss
                </button>
                <button className="text-xs font-semibold bg-[#0f1b2d] text-white px-3 py-1.5 rounded-lg hover:bg-[#1a2d45] transition-colors">
                  Review
                </button>
              </div>
            ) : (
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
                Merge Reports
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskAssignment() {
  const [worker, setWorker] = useState("");
  const [problem, setProblem] = useState("");

  return (
    <div className="bg-[#00256C] rounded-2xl p-6 text-blue-400">
      <h2 className="text-sm font-semibold mb-5 text-white/90">Task Assignment</h2>

    <select
  value={worker}
  onChange={(e) => setWorker(e.target.value)}
  className="w-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/70 text-sm rounded-xl px-4 py-3 mb-4 outline-none appearance-none cursor-pointer"
  style={{
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1) inset'
  }}
>
  <option value="" className="bg-[#00256C] text-white/70">Select Worker</option>
  <option value="w1" className="bg-[#00256C] text-white/70">John Doe</option>
  <option value="w2" className="bg-[#00256C] text-white/70">A. Rahman</option>
  <option value="w3" className="bg-[#00256C] text-white/70">M. Hasan</option>
</select>

      <div className="flex items-center bg-[#163a82] rounded-xl px-4 py-3 mb-5 gap-2">
        <input
          type="text"
          placeholder="Search Problem"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className="flex-1 bg-transparent text-white/60 text-sm outline-none placeholder:text-white/40"
        />
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span className="w-2 h-2 rounded-full bg-white/60" />
          <span className="w-2 h-2 rounded-full bg-white/60" />
        </div>
      </div>

      <button className="w-full bg-white text-[#00256C] font-bold text-sm py-3.5 rounded-xl hover:bg-white/95 transition-colors">
        Assign
      </button>
    </div>
  );
}

function ActivityTable() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">Recent Activity</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">Detailed log of citizen submissions</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 text-[11px] font-semibold border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors text-slate-600">
            ⚙ Filter
          </button>
          <button className="flex items-center gap-1.5 text-[11px] font-semibold border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors text-slate-600">
            ↓ Export CSV
          </button>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-100">
            {["Report Details", "Category", "Status", "Impact", "Actions"].map((h) => (
              <th key={h} className="text-left text-[10px] font-bold tracking-widest uppercase text-slate-400 pb-3 px-2">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {activityData.map((row) => (
            <tr key={row.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td className="py-3 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-lg flex-shrink-0">
                    {row.emoji}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-slate-800">{row.name}</p>
                    <p className="text-[11px] text-slate-400">{row.meta}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-2 text-[13px] text-slate-600">{row.category}</td>
              <td className="py-3 px-2">
                <span className={cn("text-[11px] font-semibold px-3 py-1 rounded-full", statusStyles[row.status])}>
                  {row.status}
                </span>
              </td>
              <td className="py-3 px-2">
                <span className={cn("text-[12px]", impactStyles[row.impact])}>
                  {impactLabel[row.impact]}
                </span>
              </td>
              <td className="py-3 px-2">
                <button className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md px-2 py-1 text-lg transition-colors">
                  ⋮
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────────────

export default function CivicDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans">
      <div className="max-w-full mx-auto flex flex-col gap-4">

        {/* Stats */}
        <div className="max-w-11/12  grid grid-cols-4 

     
        gap-[50px]">
          {statsData.map((card) => (
            <StatCardItem key={card.label} card={card} />
          ))}
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-[1fr_340px] gap-4">
          <ComplaintMap />
          <div className="flex flex-col gap-4">
            <LiveModeration />
            <TaskAssignment />
          </div>
        </div>

        {/* Activity Table */}
        <ActivityTable />

      </div>
    </div>
  );
}