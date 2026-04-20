"use client";
import { motion } from "framer-motion";
import { LayoutDashboard, BarChart2, Users, LogOut } from "lucide-react";

// Define the structure of a nav item so we can reuse it in Dashboard.tsx too if needed
export const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "analytics", icon: BarChart2, label: "Analytics" },
  { id: "users", icon: Users, label: "Users" },
  { id: "Maps", icon: Users, label: "Maps" },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-[230px] min-h-screen bg-white border-r border-gray-100 flex flex-col py-5 px-3 fixed left-0 top-0 z-20"
      style={{ boxShadow: "2px 0 12px rgba(0,0,0,0.04)" }}
    >
      {/* Logo */}
      <div className="px-2 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <h1 className="text-[#1E3A8A] text-[24px] font-extrabold">
            CityVoiceAdmin
          </h1>
        </motion.div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item, i) => {
          // Check if this item is the active one based on ID
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * (i + 1) + 0.2 }}
              whileHover={{ x: 3 }}
              onClick={() => onTabChange(item.id)} // Call the function passed from parent
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all w-full text-left ${
                isActive
                  ? "bg-[#e8f0fe] text-[#1e5fff]"
                  : "text-[#64748b] hover:bg-gray-50 hover:text-[#0f1b3d]"
              }`}
            >
              <item.icon size={16} strokeWidth={isActive ? 2.5 : 2} />
              {item.label}
            </motion.button>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="mt-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 px-2 mb-3"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
            AC
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#0f1b3d]">Admin Central</p>
            <p className="text-[10px] text-gray-400">Systems Lead</p>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#1E3A8A] text-white text-[12px] font-semibold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#162040] transition-colors"
        >
          <LogOut size={13} />
          Logout
        </motion.button>
      </div>
    </motion.aside>
  );
}