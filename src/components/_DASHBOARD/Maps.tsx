import React from "react";
import {
    Calendar,
    MapPin,
    User,
    Tag,
    MessageSquare,
    MoreHorizontal,
    CheckCircle2,
    Clock,
    AlertCircle,
    ArrowRight,
    Share2,
    Printer
} from "lucide-react";

// --- Components ---

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
        "Resolved": "bg-green-100 text-green-700 border-green-200",
        "Pending": "bg-yellow-100 text-yellow-700 border-yellow-200",
    };

    // Default to In Progress style if not found
    const style = styles[status as keyof typeof styles] || styles["In Progress"];

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${style}`}>
            {status}
        </span>
    );
};

const TimelineStep = ({
    title,
    date,
    icon: Icon,
    isActive,
    isCompleted,
    isLast
}: {
    title: string;
    date: string;
    icon: any;
    isActive?: boolean;
    isCompleted?: boolean;
    isLast?: boolean;
}) => {
    let circleClass = "bg-slate-100 text-slate-400 border-slate-200";
    let textClass = "text-slate-400";
    let titleClass = "text-slate-500";

    if (isCompleted) {
        circleClass = "bg-green-500 text-white border-green-500";
        textClass = "text-green-600";
        titleClass = "text-slate-900 font-medium";
    } else if (isActive) {
        circleClass = "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200";
        textClass = "text-blue-600";
        titleClass = "text-slate-900 font-medium";
    }

    return (
        <div className="flex flex-col items-center relative flex-1">
            {/* Connector Line */}
            {!isLast && (
                <div className={`absolute top-3 left-1/2 w-full h-[2px] -z-10 ${isCompleted ? 'bg-green-200' : 'bg-slate-100'}`} />
            )}

            {/* Circle Icon */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 mb-3 ${circleClass}`}>
                <Icon size={14} strokeWidth={3} />
            </div>

            {/* Text */}
            <div className="text-center">
                <p className={`text-xs mb-1 ${titleClass}`}>{title}</p>
                <p className={`text-[10px] ${textClass}`}>{date}</p>
            </div>
        </div>
    );
};

const CommentItem = ({
  name,
  time,
  text,
  avatarUrl,
  avatarColor
}: {
  name: string;
  time: string;
  text: string;
  avatarUrl?: string;
  avatarColor?: string;
}) => (
  <div className="flex gap-4 p-4 hover:bg-slate-100/50 transition-colors rounded-lg">
    {/* Avatar */}
    {avatarUrl ? (
      <img
        src={avatarUrl}
        alt={name}
        className="w-9 h-9 rounded-full object-cover border border-slate-200 flex-shrink-0"
      />
    ) : (
      <div className={`w-9 h-9 rounded-full ${avatarColor || "bg-slate-200"} flex items-center justify-center text-white text-xs font-bold border border-slate-200 flex-shrink-0`}>
        {name.charAt(0)}
      </div>
    )}

    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline mb-1">
        <h4 className="text-sm font-bold text-slate-900 truncate">{name}</h4>
        <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{time}</span>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed break-words">
        {text}
      </p>
    </div>
  </div>
);
// --- Main Page Component ---

export default function IssueDetails() {
    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl font-bold text-slate-900">Severe Pothole on Maple Ave</h1>
                            <StatusBadge status="In Progress" />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span className="font-mono bg-slate-200 px-1.5 py-0.5 rounded text-slate-700 text-xs">ID: CV-8492</span>
                            <span>•</span>
                            <span>Reported by <strong className="text-slate-700">Julian Thorne</strong></span>
                            <span>•</span>
                            <span>Ward 4</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
                            <User size={16} />
                            Assign Team
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                            <MessageSquare size={16} />
                            Message
                        </button>
                        <button className="p-2 bg-white border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 hover:text-slate-900">
                            <Share2 size={18} />
                        </button>
                        <button className="p-2 bg-white border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 hover:text-slate-900">
                            <Printer size={18} />
                        </button>
                    </div>
                </header>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column (Main Content) */}
                    <div className="lg:col-span-2 space-y-6">



                        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 group relative">
                            {/* ✅ এখানে img ট্যাগ বসান */}
                            <img
                                src="/maps.svg" // 👈 আপনার ছবির লোকেশন দিন (public ফোল্ডারে থাকলে / দিয়ে শুরু করুন)
                                alt="Severe Pothole on Maple Ave"
                                className="w-[900px] h-[380px] object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                        </div>

                        {/* Resolution Timeline */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-6">Resolution Timeline</h3>
                            <div className="flex justify-between items-start px-2">
                                <TimelineStep
                                    title="Pending"
                                    date="Oct 12, 09:15 AM"
                                    icon={Clock}
                                    isCompleted
                                />
                                <TimelineStep
                                    title="Assigned"
                                    date="Oct 12, 02:30 PM"
                                    icon={CheckCircle2}
                                    isCompleted
                                />
                                <TimelineStep
                                    title="In Progress"
                                    date="Oct 13, 08:00 AM"
                                    icon={User}
                                    isActive
                                />
                                <TimelineStep
                                    title="Resolved"
                                    date="Target Oct 15"
                                    icon={CheckCircle2}
                                    isLast
                                />
                            </div>
                        </div>

           {/* Citizen Discussion Section - Exact Figma Match */}
<div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
  
  {/* Header */}
  <div className="px-6 py-4 border-b border-slate-200/60 flex justify-between items-center bg-slate-50">
    <h3 className="text-base font-bold text-slate-900">Citizen Discussion</h3>
    <span className="text-[10px] font-bold tracking-wide uppercase text-slate-500 bg-slate-200/50 px-2.5 py-1 rounded-md">
      24 Comments
    </span>
  </div>

  {/* Comments List */}
  <div className="flex flex-col">
    <CommentItem 
      name="Sarah Jenkins"
      time="2 hours ago"
      text="I drove past this morning and saw the maintenance crew marking the area. Great to see the quick response!"
      // আপনি চাইলে এখানে avatarUrl="/path/to/image.jpg" দিতে পারেন
    />
    
    <CommentItem 
      name="Marcus Chen"
      time="5 hours ago"
      text="Be careful if you are cycling. The patch is wider than it looks in the photo."
    />
  </div>

  {/* Footer / View All Button */}
  <div className="px-6 py-3 bg-slate-50 border-t border-slate-200/60">
    <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
      VIEW ALL COMMENTS
      <ArrowRight size={12} strokeWidth={3} />
    </button>
  </div>
</div>

                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="space-y-6">

                        {/* Report Details Card */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Report Details</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Tag size={18} className="text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Category</p>
                                        <p className="text-sm font-medium text-slate-900">Road Maintenance</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <User size={18} className="text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Reporter</p>
                                        <p className="text-sm font-medium text-slate-900">Julian Thorne</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Calendar size={18} className="text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Submitted</p>
                                        <p className="text-sm font-medium text-slate-900">Oct 12, 2023</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin size={18} className="text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold">District</p>
                                        <p className="text-sm font-medium text-slate-900">Ward 4, North District</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Impact Score Card */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Impact Score</h3>
                                <AlertCircle size={16} className="text-red-500" />
                            </div>

                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-4xl font-bold text-slate-900">8.4</span>
                                <span className="text-sm font-bold text-red-600 uppercase tracking-wide">Critical</span>
                            </div>

                            <p className="text-xs text-slate-500 mb-4">Calculated based on traffic volume and safety risks.</p>

                            {/* Progress Bar */}
                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                <div className="bg-gradient-to-r from-orange-400 to-red-600 h-2.5 rounded-full" style={{ width: '84%' }}></div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
                            {/* ✅ এখানে img ট্যাগ বসান */}
                            <img
                                src="/location2.png" // 👈 আপনার ম্যাপের ছবির লোকেশন দিন
                                alt="Location Map"
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-4">
                                <h4 className="text-sm font-bold text-slate-900 mb-1">Maple Avenue & 4th Cross</h4>
                                <p className="text-xs text-slate-500 font-mono">40.7128° N, 74.0060° W</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}