"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search } from "lucide-react";
import Sidebar, { navItems } from "./Sidebar"; // Import navItems if you want to sync titles

// Import your components
import CivicDashboard from "./Civic"; 
import Analytics from "./Analytices";
import UserDirectory from "./User";
import IssueDetails from "./Maps";
// import AnalyticsComponent from "./Analytics"; // Example
// import UsersComponent from "./Users";         // Example

export default function Dashboard() {
  // 1. State lives here in the parent
  const [activeTab, setActiveTab] = useState("dashboard");

  // 2. Map IDs to Components
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <CivicDashboard />;
      case "analytics":
        return <Analytics></Analytics> ;
      case "users":
        return <UserDirectory></UserDirectory>;
      case "Maps":
        return <IssueDetails></IssueDetails>;
      default:
        return <CivicDashboard />;
    }
  };

  // Optional: Get the label for the header dynamically
  const activeLabel = navItems.find(n => n.id === activeTab)?.label || "Dashboard";

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* 3. Pass state and setter to Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main content */}
      <main className="flex-1 ml-[230px] p-6 overflow-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-between mb-6"
        >
          <h1 className="text-[22px] text-[#1E3A8A] font-bold leading-[20px] tracking-[0.5px]">
            Admin {activeLabel} {/* Dynamic Title */}
          </h1>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                className="bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-[12px] text-gray-600 placeholder-gray-400 focus:outline-none focus:border-blue-300 w-52 transition-all"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              />
            </div>

            {/* Bell */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:border-gray-300 transition-colors"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </motion.button>

{/* Avatar with Image */}
<motion.div
  whileHover={{ scale: 1.05 }}
  className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 cursor-pointer shadow-sm"
>
  <img 
    src="/man.png" // 👈 এখানে আপনার ছবির পাথ দিন (যেমন: /images/admin.png)
    alt="Admin Avatar" 
    className="w-full h-full object-contain"
  />
</motion.div>
          </div>
        </motion.div>

        {/* 4. Render Content Dynamically with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab} // Key change triggers exit/enter animation
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

      </main>
    </div>
  );
}