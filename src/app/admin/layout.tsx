"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BarChart3,
    Settings,
    User,
    LogOut,
    Menu,
    X,
    Bell,
    Globe,
    Zap,
    Briefcase,
    Shield,
    ChevronDown,
    Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import Image from "next/image";

const navGroups = [
    {
        title: "Analytics",
        links: [
            { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
            { name: "Stats", href: "/admin/stats", icon: BarChart3 },
            { name: "Advertising", href: "/admin/advertising", icon: Zap },
        ]
    },
    {
        title: "Setups",
        links: [
            { name: "Customizations", href: "/admin/customizations", icon: Settings },
            { name: "Integrations", href: "/admin/integrations", icon: Globe },
            { name: "Add Domain", href: "/admin/domain", icon: Plus },
        ]
    }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLogout = () => {
        Cookies.remove("isLoggedIn");
        window.location.replace("/login");
    };

    if (!isMounted) return null;

    return (
        <div className="relative min-h-screen w-full flex bg-[#E6EEF8] text-[#556987] font-sans selection:bg-[#4D7CFF]/20">
            {/* 1. NEUMORPHIC SIDEBAR */}
            <aside className="w-[280px] h-screen bg-[#E6EEF8] border-r border-white/40 flex flex-col py-8 px-6 sticky top-0">
                {/* Logo Area */}
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4D7CFF] to-[#80A4FF] flex items-center justify-center shadow-[4px_4px_10px_rgba(77,124,255,0.3)]">
                        <Shield className="text-white" size={20} />
                    </div>
                    <span className="font-bold text-slate-800 text-lg tracking-tight">Mysite.com</span>
                </div>

                {/* Navigation Groups */}
                <div className="flex-1 space-y-10 overflow-y-auto scrollbar-hide">
                    {navGroups.map((group) => (
                        <div key={group.title} className="space-y-4">
                            <h3 className="px-4 text-[11px] font-black uppercase tracking-[0.2em] text-[#556987]/60">{group.title}</h3>
                            <div className="space-y-1">
                                {group.links.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${isActive
                                                    ? "bg-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),4px_4px_15px_rgba(255,255,255,0.8)] text-[#4D7CFF]"
                                                    : "hover:bg-white/40 text-[#556987] hover:text-[#4D7CFF]"
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <link.icon size={18} className={isActive ? "text-[#4D7CFF]" : "group-hover:scale-110 transition-transform"} />
                                                <span className="text-sm font-bold">{link.name}</span>
                                            </div>
                                            {isActive && (
                                                <motion.div layoutId="nav-pill" className="w-1 h-1 bg-[#4D7CFF] rounded-full shadow-[0_0_8px_#4D7CFF]" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    <div className="pt-4 border-t border-white/20">
                        <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-[#556987] hover:bg-white/40 hover:text-[#4D7CFF] transition-all group">
                            <div className="relative">
                                <Bell size={18} />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#4D7CFF] rounded-full border-2 border-[#E6EEF8]" />
                            </div>
                            <span className="text-sm font-bold">Notifications</span>
                            <span className="ml-auto bg-[#D8E6FF] text-[#4D7CFF] text-[10px] font-black px-2 py-0.5 rounded-full">12</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 p-4 rounded-2xl text-[#556987] hover:text-red-500 hover:bg-red-50/50 transition-all group mt-2"
                        >
                            <LogOut size={18} />
                            <span className="text-sm font-bold">Logout</span>
                        </button>
                    </div>
                </div>

                {/* Profile Section At Bottom */}
                <div className="mt-8 pt-8 border-t border-white/20">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full p-1 bg-white shadow-xl mb-4 relative group">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#E6EEF8]">
                                <Image
                                    src="/images/user.jpg" // Note: Ensure you have a placeholder or existing image
                                    alt="Admin"
                                    width={80}
                                    height={80}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <h4 className="text-sm font-black text-slate-800 leading-none">Admin User</h4>
                        <p className="text-[10px] font-medium text-[#556987]/60 mt-1 mb-4">admin@ceylontrips.com</p>

                        <div className="w-full bg-white/60 p-4 rounded-[2rem] shadow-inner mb-6">
                            <p className="text-[#4D7CFF] text-[10px] font-black uppercase tracking-widest">Standard Plan</p>
                            <p className="text-[8px] text-[#556987]/40 mt-1">Next payment: March 21</p>
                        </div>

                        <button className="w-full py-3.5 bg-[#4D7CFF] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-[0_10px_20px_rgba(77,124,255,0.2)] hover:bg-[#3b66e0] transition-all active:scale-95">
                            Upgrade your plan
                        </button>
                    </div>
                </div>
            </aside>

            {/* 2. MAIN CONTENT AREA */}
            <main className="flex-1 p-10 h-screen overflow-y-auto scrollbar-hide">
                <div className="max-w-[1400px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
