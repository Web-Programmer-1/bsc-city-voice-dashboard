import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  TrendingUp,
  Users,
  Star,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  MoreVertical,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

// --- Types ---

interface User {
  id: number;
  name: string;
  email: string;
  role: "CITIZEN" | "FIELD WORKER" | "ADMIN";
  civicScore: number;
  reports: number;
  status: "Active" | "Flagged";
  avatarUrl: string;
}

// --- Mock Data ---

const users: User[] = [
  {
    id: 1,
    name: "Marcus Holloway",
    email: "marcus.h@cityvoter.gov",
    role: "CITIZEN",
    civicScore: 842,
    reports: 28,
    status: "Active",
    avatarUrl: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    email: "e.rodriguez@field.gov",
    role: "FIELD WORKER",
    civicScore: 915,
    reports: 156,
    status: "Active",
    avatarUrl: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: 3,
    name: "Lillian Thorne",
    email: "j.thorne@community.org",
    role: "CITIZEN",
    civicScore: 312,
    reports: 4,
    status: "Flagged",
    avatarUrl: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: 4,
    name: "Sarah Lenkins",
    email: "s.lenkins@city.gov",
    role: "ADMIN",
    civicScore: 0,
    reports: 0,
    status: "Active",
    avatarUrl: "https://i.pravatar.cc/150?u=4",
  },
];

// --- Sub Components ---

const StatCard = ({
  title,
  value,
  icon,
  iconColor,
  footer,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconColor: string;
  footer: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-3"
  >
    <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
      {title}
    </span>
    <div className="flex items-center gap-3">
      <span className={`text-3xl font-bold text-slate-900`}>{value}</span>
      <span className={`p-2 rounded-lg ${iconColor}`}>{icon}</span>
    </div>
    <div className="text-xs text-slate-500 mt-auto pt-2 border-t border-slate-100 flex items-center gap-1">
      {footer}
    </div>
  </motion.div>
);

const RoleBadge = ({ role }: { role: string }) => {
  const colors: Record<string, string> = {
    CITIZEN: "bg-slate-100 text-slate-600",
    "FIELD WORKER": "bg-blue-50 text-blue-600 border border-blue-100",
    ADMIN: "bg-slate-800 text-white",
  };
  return (
    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${colors[role] || colors.CITIZEN}`}>
      {role}
    </span>
  );
};

// Modal Component
const UserActionModal = ({
  user,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}: {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (user: User) => void;
  onDelete: (user: User) => void;
}) => {
  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 w-full max-w-md p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                Manage User
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-slate-50 rounded-lg">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-slate-900">{user.name}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => onUpdate(user)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors group"
              >
                <Pencil size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">Update User</span>
              </button>

              <button
                onClick={() => onDelete(user)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors group"
              >
                <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">Delete User</span>
              </button>
            </div>

            {/* Cancel Button */}
            <button
              onClick={onClose}
              className="w-full mt-4 px-4 py-2.5 text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main Component ---

export default function UserDirectory() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const handleUpdate = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setMenuOpen(null);
  };

  const handleDelete = (user: User) => {
    console.log("Deleting user:", user.name);
    // Add your delete logic here (API call, state update, etc.)
    setMenuOpen(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-11/12 mx-auto space-y-8">

        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-3xl font-bold tracking-tight">User Directory</h1>
          <p className="text-slate-500 max-w-xl text-sm leading-relaxed">
            Manage access levels, monitor civic engagement scores, and oversee
            community contributions across the city ecosystem.
          </p>
        </motion.header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Residents"
            value="12,482"
            icon={<TrendingUp size={16} />}
            iconColor="bg-emerald-50 text-emerald-600"
            footer={<span className="text-emerald-600 font-medium">↗ +12% from last month</span>}
          />
          <StatCard
            title="Field Workers"
            value="142"
            icon={<Users size={16} />}
            iconColor="bg-blue-50 text-blue-600"
            footer={<span>Active across 12 sectors</span>}
          />
          <StatCard
            title="Avg Civic Score"
            value="782"
            icon={<Star size={16} />}
            iconColor="bg-slate-100 text-slate-600"
            footer={<span>Community Excellence</span>}
          />
          <StatCard
            title="Flagged Accounts"
            value="24"
            icon={<AlertCircle size={16} />}
            iconColor="bg-red-50 text-red-600"
            footer={<span className="text-red-600 font-medium">Requires Immediate Action</span>}
          />
        </div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
        >
          {/* Toolbar */}
          <div className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center border-b border-slate-100">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search by name, email or ID..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                All Roles <ChevronDown size={14} />
              </button>
              <button className="p-2 text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors">
                <Filter size={16} />
              </button>
              <button className="p-2 text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors">
                <Download size={16} />
              </button>
            </div>
          </div>

          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-4 px-6">User</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Civic Score</th>
                  <th className="py-4 px-6">Reports</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="group border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                        />
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            {user.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col items-start">
                        <span className={`text-sm font-bold ${user.civicScore > 500 ? 'text-slate-900' : 'text-slate-600'}`}>
                          {user.civicScore > 0 ? user.civicScore : "--"}
                        </span>
                        {user.civicScore > 0 && (
                          <div className="w-12 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                user.civicScore > 800
                                  ? "bg-emerald-500"
                                  : user.civicScore > 500
                                  ? "bg-blue-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${Math.min(user.civicScore / 10, 100)}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-slate-600">
                      {user.reports}
                    </td>
                    <td className="py-4 px-6">
                      <div
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            user.status === "Active" ? "bg-emerald-500" : "bg-red-500"
                          }`}
                        />
                        {user.status}
                      </div>
                    </td>

                    {/* ACTIONS COLUMN WITH DROPDOWN */}
                    <td className="py-4 px-6 text-right relative">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setMenuOpen(menuOpen === user.id ? null : user.id)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-slate-700"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {menuOpen === user.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setMenuOpen(null)}
                              />
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-20"
                              >
                                <button
                                  onClick={() => handleUpdate(user)}
                                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                  <Pencil size={16} />
                                  Update
                                </button>
                                <button
                                  onClick={() => handleDelete(user)}
                                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <Trash2 size={16} />
                                  Delete
                                </button>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Governance Audit Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden"
          >
             <div className="absolute right-[-20px] bottom-[-20px] opacity-5">
               <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
               </svg>
             </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Governance Audit required
            </h3>
            <p className="text-sm text-slate-500 mb-6 max-w-md">
              Four accounts have been flagged for repeated report cancellations.
              High priority review is recommended to maintain community trust.
            </p>
            <button className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-slate-900/10">
              Review Flagged Activity
            </button>
          </motion.div>

          {/* Citizen Milestones Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-[#7FFC97] rounded-xl text-black">
                <CheckCircle2 size={24} />
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Citizen Milestones
            </h3>
            <p className="text-sm text-slate-500 mb-6 max-w-md">
              85 users reached 'Ambassador' status this week by contributing to
              the Green Corridor initiative.
            </p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1 transition-colors group">
              VIEW HONORS LIST 
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>

        {/* MODAL COMPONENT */}
        <UserActionModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          onUpdate={(user) => {
            console.log("Updating user:", user);
            setIsModalOpen(false);
          }}
          onDelete={(user) => {
            console.log("Deleting user:", user);
            setIsModalOpen(false);
          }}
        />

      </div>
    </div>
  );
}