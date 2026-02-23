"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    Users,
    Wallet,
    User,
    HelpCircle,
    LogOut,
    Menu,
    X,
    Bell,
    ExternalLink,
    ChevronDown,
    Plus,
    Search,
    MessageSquare,
    ChevronLeft,
    Compass,
    Map,
    Database
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface NavItem {
    name: string;
    href: string;
    icon?: any;
    badge?: number | string;
    subItems?: Array<{
        name: string;
        href: string;
        active?: boolean;
        badge?: number | string;
    }>;
}

interface NavSection {
    section: string;
    items: NavItem[];
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [alertCount, setAlertCount] = useState(0);
    const [accentColor, setAccentColor] = useState("#D4AF37");
    const pathname = usePathname();

    const fetchAlerts = async () => {
        const { count: msgCount } = await supabase
            .from('contact_messages')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending');

        const { count: reqCount } = await supabase
            .from('trip_requests')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending');

        setAlertCount((msgCount || 0) + (reqCount || 0));
    };

    useEffect(() => {
        setIsMounted(true);

        // Load accent color preference
        const savedColor = localStorage.getItem('admin_accent_color');
        if (savedColor) setAccentColor(savedColor);

        // 🛡️ Client-side Security Guard
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                console.warn("🔐 Unauthorized access detected. Returning to login.");
                Cookies.remove('isLoggedIn');
                window.location.replace('/login');
            }
        };

        checkSession();
        fetchAlerts();

        // Subscribe to real-time changes
        const channel = supabase
            .channel('admin-alerts')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, () => fetchAlerts())
            .on('postgres_changes', { event: '*', schema: 'public', table: 'trip_requests' }, () => fetchAlerts())
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const navItems: NavSection[] = [
        {
            section: "Registry", items: [
                { name: "Portal Overview", href: "/admin", icon: LayoutDashboard },
                {
                    name: "Destinations",
                    href: "/admin/destinations",
                    icon: Compass,
                    subItems: [
                        { name: "Active Sites", href: "/admin/destinations", active: pathname === "/admin/destinations" },
                        { name: "Pending", href: "/admin/destinations" },
                    ]
                },
                {
                    name: "Experiences",
                    href: "/admin/experiences",
                    icon: Briefcase,
                    subItems: [
                        { name: "Active Series", href: "/admin/experiences", active: pathname === "/admin/experiences" },
                        { name: "Drafts", href: "/admin/experiences" },
                    ]
                },
                {
                    name: "Itineraries",
                    href: "/admin/itineraries",
                    icon: Map,
                    subItems: [
                        { name: "Global Routes", href: "/admin/itineraries", active: pathname === "/admin/itineraries" },
                        { name: "Guest Requests", href: "/admin/requests", active: pathname === "/admin/requests", badge: alertCount > 0 ? alertCount : undefined },
                    ]
                },
                { name: "Inquiries", href: "/admin/messages", icon: MessageSquare, badge: alertCount > 0 ? alertCount : undefined },
                { name: "Heritage Managers", href: "/admin/team", icon: Users },
                { name: "Revenue", href: "/admin/payment", icon: Wallet },
                { name: "My Profile", href: "/admin/profile", icon: User },
                { name: "Portal Settings", href: "/admin/settings", icon: HelpCircle },
            ]
        },
        {
            section: "System", items: [
                { name: "Database Test", href: "/admin/test-db", icon: Database },
                { name: "Registry Help", href: "/admin/help", icon: HelpCircle },
            ]
        }
    ];

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        Cookies.remove("isLoggedIn");
        window.location.replace("/login");
    };

    if (!isMounted) return null;

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-[#FAF9F6] lg:bg-transparent">
            {/* Logo area */}
            <div className="flex items-center justify-between px-6 py-8 pb-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <Compass className="text-accent" size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-primary tracking-tight leading-none uppercase">Tales of</span>
                        <span className="text-xs font-bold text-accent uppercase tracking-wider mt-1">Ceylon Admin</span>
                    </div>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden p-2 text-primary/40 hover:text-primary transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Sidebar Search */}
            <div className="px-6 py-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/30" size={14} />
                    <input
                        type="text"
                        placeholder="Search Portal..."
                        className="w-full bg-white border border-primary/5 rounded-lg pl-9 pr-4 py-2 text-sm outline-none placeholder:text-primary/20 font-medium"
                    />
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-2 pb-10">
                {navItems.map((section) => (
                    <div key={section.section} className="mb-8">
                        <p className="px-6 text-xs font-bold text-primary/30 uppercase tracking-wider mb-4">{section.section}</p>
                        <div className="space-y-0.5">
                            {section.items.map((item) => (
                                <div key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[14px] font-semibold transition-all ${pathname === item.href ? "text-primary bg-primary/5 shadow-sm border border-primary/5" : "text-primary/70 hover:text-primary hover:bg-primary/[0.03]"}`}
                                    >
                                        <item.icon size={17} className={pathname === item.href ? "text-accent" : "text-primary/30"} />
                                        <span>{item.name}</span>
                                        {item.badge && (
                                            <span className="ml-auto w-5 h-5 flex items-center justify-center bg-accent text-primary text-[10px] font-bold rounded-full shadow-lg shadow-accent/20">
                                                {item.badge}
                                            </span>
                                        )}
                                        {item.subItems && !item.badge && (
                                            <ChevronDown size={14} className="ml-auto text-primary/20" />
                                        )}
                                    </Link>
                                    {item.subItems && pathname.startsWith(item.href) && (
                                        <div className="ml-11 mt-1.5 space-y-1">
                                            {item.subItems.map(sub => (
                                                <Link key={sub.name} href="#" className="flex items-center justify-between py-1 group">
                                                    <span className={`text-xs font-bold tracking-wide uppercase ${sub.active ? "text-accent bg-primary px-3 py-1.5 rounded-md shadow-md" : "text-primary/40 group-hover:text-primary/70 px-3 py-1.5 transition-colors"}`}>{sub.name}</span>
                                                    {sub.badge && (
                                                        <div className="mr-4 px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-[9px] font-bold text-accent">{sub.badge}</div>
                                                    )}
                                                    {sub.name === "Pending" && !sub.badge && <div className="w-1 h-1 rounded-full bg-accent mr-4" />}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Logout */}
            <div className="px-2 pb-8">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl text-[14px] font-semibold text-primary/60 hover:text-red-600 hover:bg-red-50 transition-all w-full text-left"
                >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );

    return (
        <div
            className="relative min-h-screen w-full flex bg-[#FAF9F6] text-primary selection:bg-accent/20 admin-font"
            style={{
                "--color-accent": accentColor,
                fontFamily: "'Inter', sans-serif",
                "--font-sans": "'Inter', sans-serif",
                "--font-heading": "'Inter', sans-serif"
            } as any}
        >
            {/* DESKTOP SIDEBAR */}
            <aside className="hidden lg:flex w-64 h-screen bg-white border-r border-primary/5 flex-col sticky top-0 z-50">
                <SidebarContent />
            </aside>

            {/* MOBILE SIDEBAR */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-[100] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-72 bg-white z-[110] p-0 shadow-2xl lg:hidden"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-[72px] px-8 flex items-center bg-white border-b border-primary/5 z-40 shrink-0">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden p-2 -ml-2 mr-2 text-primary/50 hover:bg-primary/5 rounded-lg transition-all"
                    >
                        <Menu size={20} />
                    </button>

                    <div className="flex-1 flex items-center justify-between">
                        {/* Left Side: Back Link */}
                        <Link href="/" className="flex items-center gap-2 text-primary/40 hover:text-primary transition-colors">
                            <ChevronLeft size={16} />
                            <span className="text-[11px] font-black uppercase tracking-widest">Back to Website</span>
                        </Link>

                        {/* Right Side: Global Actions */}
                        <div className="flex items-center gap-2 sm:gap-5">
                            <button className="hidden sm:block text-primary/40 hover:text-primary transition-colors"><MessageSquare size={18} /></button>
                            <div className="relative">
                                <button className="text-primary/40 hover:text-primary transition-colors"><Bell size={18} /></button>
                                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-accent border-2 border-white text-[9px] font-black text-white flex items-center justify-center shadow-sm">2</span>
                            </div>
                            <div className="hidden sm:block h-6 w-[1px] bg-primary/10 mx-1" />
                            <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/10 hover:bg-primary/5 transition-all text-primary/70 text-[11px] font-black uppercase tracking-wider">
                                <Users size={16} className="text-accent" />
                                <span>Registry</span>
                            </button>
                            <button className="bg-primary text-white p-2.5 sm:px-5 sm:py-2.5 rounded-lg font-black text-[11px] uppercase tracking-widest flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                <Plus size={16} className="text-accent" />
                                <span className="hidden sm:inline">Create Entry</span>
                            </button>
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-accent shadow-md cursor-pointer ml-1">
                                <Image src="/images/user.jpg" alt="Admin" width={36} height={36} className="object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto px-8 lg:px-12 py-10 bg-[#FAF9F6]">
                    <div className="max-w-[1400px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
