"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, User, Search, Phone, Facebook, Instagram, Youtube, LayoutDashboard } from "lucide-react"; // Added Social Icons
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { SocialIcon } from "./SocialIcon";

// Define the shape of our navigation items
type NavItem = {
    name: string;
    href: string;
    // Optional mega-menu content
    megaMenu?: {
        categories: {
            title: string;
            items: { label: string; href: string }[];
        }[];
        featured: {
            title: string;
            description?: string;
            image: string;
            href: string;
        }[];
    };
};

const navLinks: NavItem[] = [
    { name: "HOME", href: "/" },
    { name: "DESTINATIONS", href: "/destinations", },
    { name: "EXPERIENCES", href: "/experiences", },
    { name: "PLAN YOUR VISIT", href: "/plan" },
    { name: "CONTACT", href: "/contact" },
];

import { supabase } from "@/lib/supabase";
import Cookies from "js-cookie";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(Cookies.get('isLoggedIn') === 'true');

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Helper to clear hover state safely
    const handleMouseLeave = () => {
        setHoveredLink(null);
    };

    // Derived state for styling
    const isGlass = isScrolled || hoveredLink;
    const textColorClass = isGlass ? "text-[#1B362D]" : "text-white";
    const logoColorClass = isGlass ? "text-[#1B362D]" : "text-white";
    const hoverColorClass = isGlass ? "text-[#D4AF37]" : "text-white";

    return (
        <>
            <nav
                onMouseLeave={handleMouseLeave}
                className={cn(
                    "fixed top-0 left-0 w-full z-[999] transition-all duration-500 ease-in-out font-sans",
                    isGlass
                        ? "bg-white/95 backdrop-blur-lg py-8 border-b border-gray-200/50 shadow-xl"
                        : "bg-transparent py-7"
                )}
            >
                <div className="w-full px-4 sm:px-6 md:px-12 flex items-center justify-between relative">
                    {/* Left: Login/Dashboard Icon - Always visible to ensure mobile accessibility */}
                    <div className="flex items-center z-[1001]">
                        <SocialIcon
                            icon={isLoggedIn ? LayoutDashboard : User}
                            label={isLoggedIn ? "Portal" : "Sign In"}
                            color="#D4AF37"
                            href={isLoggedIn ? "/admin" : "/login"}
                            tooltipPosition="bottom"
                            className="scale-90 sm:scale-100"
                        />
                    </div>

                    {/* Center: Logo */}
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2 group">
                        <span className={cn(
                            "font-heading font-bold text-2xl md:text-3xl tracking-[0.2em] transition-colors",
                            logoColorClass,
                            `group-hover:${isGlass ? "text-[#1B362D]/80" : "text-white/80"}`
                        )}>
                            CEYLON<span className="text-[#D4AF37] font-light">TRIPS</span>
                        </span>
                    </Link>

                    {/* Right: Desktop Links & Mobile Toggle */}
                    <div className="flex items-center gap-2 sm:gap-8 ml-auto">
                        {/* Desktop Navigation Links */}
                        <div className="hidden xl:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <div
                                    key={link.name}
                                    onMouseEnter={() => setHoveredLink(link.name)}
                                    className="relative"
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-[13px] font-bold uppercase tracking-widest transition-colors py-2 block whitespace-nowrap",
                                            hoveredLink === link.name ? (isGlass ? "text-[#D4AF37]" : "text-[#D4AF37]") : textColorClass,
                                            isGlass ? "hover:text-[#D4AF37]" : "hover:text-[#D4AF37]"
                                        )}
                                    >
                                        {link.name}
                                        <motion.span
                                            initial={{ width: 0 }}
                                            animate={{ width: hoveredLink === link.name ? "100%" : "0%" }}
                                            className="absolute bottom-0 left-0 h-[2px] bg-[#D4AF37]"
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Toggle Button */}
                        <button
                            className={cn(
                                "group flex items-center gap-3 transition-colors focus:outline-none z-[1001]",
                                textColorClass,
                                `hover:${hoverColorClass}`
                            )}
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open Menu"
                        >
                            <div className={cn(
                                "relative w-10 h-10 sm:w-12 sm:h-12 flex flex-col justify-center items-center gap-1.5 p-1 border rounded-full transition-all duration-300",
                                isGlass
                                    ? "border-[#1B362D]/30 group-hover:border-[#D4AF37] group-hover:bg-[#1B362D]/5"
                                    : "border-white/30 group-hover:border-[#D4AF37] group-hover:bg-white/10"
                            )}>
                                <span className={cn("w-5 sm:w-6 h-0.5 block group-hover:w-4 transition-all bg-current")} />
                                <span className={cn("w-3 sm:w-4 h-0.5 block group-hover:w-6 transition-all bg-current")} />
                                <span className={cn("w-5 sm:w-6 h-0.5 block group-hover:w-4 transition-all bg-current")} />
                            </div>
                        </button>
                    </div>

                    {/* Desktop Mega Menu Overlay */}
                    <AnimatePresence>
                        {hoveredLink && navLinks.find(l => l.name === hoveredLink)?.megaMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 15 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="absolute top-[90%] left-1/2 -translate-x-1/2 w-[95vw] max-w-4xl bg-white text-black shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] rounded-[2.5rem] border border-gray-100 overflow-hidden z-[1001]"
                                onMouseEnter={() => setHoveredLink(hoveredLink)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* Top Accent Line */}
                                <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                                <div className="px-8 py-10">
                                    <div className="grid grid-cols-12 gap-8">
                                        {/* Left Column: Categories */}
                                        <div className="col-span-4 border-r border-gray-50 pr-8">
                                            <div className="mb-10">
                                                <span className="text-[#D4AF37] font-art text-2xl block mb-1">Explore</span>
                                                <h3 className="font-heading text-4xl font-black text-[#1B362D] uppercase tracking-tighter leading-[0.8]">
                                                    {hoveredLink === "DESTINATIONS" ? "Ceylon" : "Tales"}
                                                </h3>
                                            </div>

                                            <div className="space-y-8">
                                                {navLinks.find(l => l.name === hoveredLink)?.megaMenu?.categories.map((category, idx) => (
                                                    <div key={idx} className="space-y-4">
                                                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-[#1B362D]/30">{category.title}</h4>
                                                        <ul className="space-y-2">
                                                            {category.items.map((item, i) => (
                                                                <li key={i}>
                                                                    <Link
                                                                        href={item.href}
                                                                        className="text-gray-500 hover:text-[#1B362D] transition-all duration-300 block text-xs font-bold flex items-center gap-3 group/item uppercase tracking-widest"
                                                                    >
                                                                        <div className="w-1.5 h-1.5 rounded-full border border-[#D4AF37] group-hover:bg-[#D4AF37] transition-all duration-300" />
                                                                        {item.label}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right Column: Featured Cards */}
                                        <div className="col-span-8">
                                            <div className="flex justify-between items-center mb-8">
                                                <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-[#1B362D]/30">Curated Highlights</h4>
                                                <Link
                                                    href={navLinks.find(l => l.name === hoveredLink)?.href || "#"}
                                                    className="group/all flex items-center gap-2"
                                                >
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1B362D] group-hover/all:text-[#D4AF37] transition-colors">View All</span>
                                                    <div className="w-6 h-6 rounded-full border border-[#1B362D]/10 flex items-center justify-center group-hover/all:border-[#D4AF37] group-hover/all:bg-[#D4AF37] transition-all duration-300">
                                                        <ArrowRight className="w-3 h-3 group-hover/all:text-white transition-colors" />
                                                    </div>
                                                </Link>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4">
                                                {navLinks.find(l => l.name === hoveredLink)?.megaMenu?.featured.map((feature, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href={feature.href}
                                                        className="group/card block relative overflow-hidden rounded-[1.5rem] aspect-[4/5] shadow-sm hover:shadow-2xl transition-all duration-700"
                                                    >
                                                        <Image
                                                            src={feature.image}
                                                            alt={feature.title}
                                                            fill
                                                            className="object-cover transition-transform duration-1000 group-hover/card:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B362D] via-[#1B362D]/20 to-transparent opacity-90" />
                                                        <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                                            <h5 className="text-white font-heading font-bold text-lg leading-tight mb-1 group-hover/card:text-[#D4AF37] transition-colors">
                                                                {feature.title}
                                                            </h5>
                                                            <p className="text-white/60 text-[9px] leading-relaxed line-clamp-2 transform translate-y-2 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500 font-medium">
                                                                {feature.description}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[1000] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white">
                            <div className="absolute inset-0 opacity-15 pointer-events-none">
                                <Image src="/images/colombo_line.jpg" alt="Colombo Line Art" fill className="object-cover object-center" />
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-col h-full text-[#1B362D]">
                            <div className="flex justify-between items-center p-6 border-b border-gray-200/50">
                                <span className="font-heading font-bold text-3xl tracking-widest text-[#1B362D]">MENU</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 hover:bg-[#1B362D]/10 rounded-full transition-colors"
                                >
                                    <X className="h-8 w-8" />
                                </button>
                            </div>

                            <div className="flex-1 container mx-auto px-6 py-12 overflow-y-auto">
                                <div className="flex flex-col gap-8">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + index * 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                className="font-heading text-4xl md:text-6xl font-bold text-[#1B362D]/60 hover:text-[#1B362D] transition-all block mb-4"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {link.name}
                                            </Link>

                                            {link.megaMenu && (
                                                <div className="pl-6 border-l-2 border-[#1B362D]/20 space-y-3">
                                                    {link.megaMenu.categories.map((cat, i) => (
                                                        <div key={i}>
                                                            <h5 className="text-sm uppercase tracking-widest text-[#D4AF37] mb-2">{cat.title}</h5>
                                                            <div className="flex flex-col gap-2">
                                                                {cat.items.slice(0, 3).map((item, j) => (
                                                                    <Link
                                                                        key={j}
                                                                        href={item.href}
                                                                        className="text-[#1B362D]/50 text-base hover:text-[#1B362D] transition-colors"
                                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                                    >
                                                                        {item.label}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}

                                    {/* Dedicated Account Link for Mobile */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + navLinks.length * 0.1 }}
                                        className="mt-6 pt-6 border-t border-gray-100"
                                    >
                                        <Link
                                            href={isLoggedIn ? "/admin" : "/login"}
                                            className="font-heading text-4xl md:text-6xl font-bold text-[#D4AF37] hover:text-[#1B362D] transition-all block"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {isLoggedIn ? "DASHBOARD" : "SIGN IN"}
                                        </Link>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1B362D]/30 mt-2">
                                            {isLoggedIn ? "Manage Heritage Assets" : "Access your account"}
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="pt-8 flex justify-center items-center gap-4 border-t border-gray-200/50 mt-4 flex-wrap"
                                    >
                                        <SocialIcon
                                            icon={isLoggedIn ? LayoutDashboard : User}
                                            label={isLoggedIn ? "Dashboard" : "Login"}
                                            color="#D4AF37"
                                            href={isLoggedIn ? "/admin" : "/login"}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            tooltipPosition="top"
                                        />
                                        <SocialIcon icon={Phone} label="Call Us" color="#22c55e" href="tel:+94777183746" tooltipPosition="top" />
                                        <div className="w-px h-6 bg-gray-200/50 mx-2 hidden sm:block" />
                                        <SocialIcon icon={Facebook} label="Facebook" color="#1877F2" href="#" tooltipPosition="top" />
                                        <SocialIcon icon={Instagram} label="Instagram" color="#E1306C" href="#" tooltipPosition="top" />
                                        <SocialIcon icon={Youtube} label="YouTube" color="#FF0000" href="#" tooltipPosition="top" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
