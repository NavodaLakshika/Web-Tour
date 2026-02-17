"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, User, Search, Phone, Facebook, Instagram, Youtube } from "lucide-react"; // Added Social Icons
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
    { name: "ABOUT", href: "/about" },
    {
        name: "DESTINATIONS",
        href: "/destinations",
        megaMenu: {
            categories: [
                {
                    title: "By Region",
                    items: [
                        { label: "Coastal Belt", href: "/destinations/coastal" },
                        { label: "Hill Country", href: "/destinations/hill-country" },
                        { label: "Cultural Triangle", href: "/destinations/cultural-triangle" },
                        { label: "Northern Peninsula", href: "/destinations/north" },
                    ],
                },
                {
                    title: "Popular Cities",
                    items: [
                        { label: "Colombo", href: "/destinations/colombo" },
                        { label: "Kandy", href: "/destinations/kandy" },
                        { label: "Galle", href: "/destinations/galle" },
                        { label: "Ella", href: "/destinations/ella" },
                    ],
                },
            ],
            featured: [
                {
                    title: "Galle Fort",
                    description: "Historic charm meets coastal beauty.",
                    image: "/images/galle.jpg",
                    href: "/destinations/galle",
                },
                {
                    title: "Sigiriya Rock",
                    description: "Ancient fortress in the sky.",
                    image: "/images/sigiriya.jpg",
                    href: "/destinations/sigiriya",
                },
                {
                    title: "Ella Gap",
                    description: "Breathtaking mountain views.",
                    image: "/images/ella.jpg",
                    href: "/destinations/ella",
                },
            ],
        },
    },
    {
        name: "EXPERIENCES",
        href: "/experiences",
        megaMenu: {
            categories: [
                {
                    title: "Adventure",
                    items: [
                        { label: "Surfing", href: "/experiences/surfing" },
                        { label: "Hiking", href: "/experiences/hiking" },
                        { label: "Wildlife Safari", href: "/experiences/safari" },
                    ],
                },
                {
                    title: "Culture & Relax",
                    items: [
                        { label: "Ayurveda Spa", href: "/experiences/spa" },
                        { label: "Cooking Classes", href: "/experiences/cooking" },
                        { label: "Tea Tasting", href: "/experiences/tea" },
                    ],
                },
            ],
            featured: [
                {
                    title: "Scenic Train",
                    description: "One of the world's most beautiful rides.",
                    image: "/images/train.jpg",
                    href: "/experiences/train",
                },
                {
                    title: "Wellness",
                    description: "Rejuvenate your mind and body.",
                    image: "/images/spa.jpg",
                    href: "/experiences/wellness",
                },
                {
                    title: "Cooking",
                    description: "Traditional Sri Lankan flavors.",
                    image: "/images/cooking.jpg",
                    href: "/experiences/cooking",
                },
            ],
        },
    },
    { name: "PLAN YOUR VISIT", href: "/plan" },
    { name: "CONTACT", href: "/contact" },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
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
        <nav
            onMouseLeave={handleMouseLeave}
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out font-sans",
                isGlass
                    ? "bg-white/80 backdrop-blur-md py-10 border-b border-gray-200/50 shadow-sm"
                    : "bg-transparent py-7"
            )}
        >
            <div className="container mx-auto px-6 h-full flex flex-col justify-center">
                {/* Top Bar: Interaction Area */}
                <div className="flex items-center justify-between relative z-50">

                    {/* Toggle Menu Button - Using SocialIcon Style */}
                    <div className="mr-4">
                        {/* Circle Button Back to Custom, Not Social Style */}
                        <button
                            className={cn(
                                "group flex items-center gap-3 transition-colors focus:outline-none",
                                textColorClass,
                                `hover:${hoverColorClass}`
                            )}
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <div className={cn(
                                "relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 p-1 border rounded-full transition-colors",
                                isGlass ? "border-[#1B362D]/30 group-hover:border-[#D4AF37]" : "border-white/30 group-hover:border-[#D4AF37]"
                            )}>
                                <span className={cn("w-3 h-0.5 block group-hover:w-4 transition-all bg-current")} />
                                <span className={cn("w-4 h-0.5 block group-hover:w-3 transition-all bg-current")} />
                            </div>
                        </button>
                    </div>

                    {/* Logo */}
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2 xl:static xl:translate-x-0 xl:ml-12 group">
                        <span className={cn(
                            "font-heading font-bold text-2xl tracking-[0.2em] transition-colors",
                            logoColorClass,
                            `group-hover:${isGlass ? "text-[#1B362D]/80" : "text-white/80"}`
                        )}>
                            CEYLON<span className="text-[#D4AF37] font-light">TRIPS</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden xl:flex items-center gap-8 h-full ml-auto mr-12">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="h-full flex items-center"
                                onMouseEnter={() => setHoveredLink(link.name)}
                            >
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "text-[11px] font-bold uppercase tracking-widest transition-colors py-4 relative group",
                                        hoveredLink === link.name ? (isGlass ? "text-[#D4AF37]" : "text-[#D4AF37]") : textColorClass,
                                        isGlass ? "hover:text-[#D4AF37]" : "hover:text-white"
                                    )}
                                >
                                    {link.name}
                                    {/* Active Indicator Line */}
                                    {link.megaMenu && (
                                        <motion.span
                                            initial={{ width: 0 }}
                                            animate={{ width: hoveredLink === link.name ? "100%" : "0%" }}
                                            className="absolute bottom-2 left-0 h-[2px] bg-[#D4AF37]"
                                        />
                                    )}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Right Side Icons - Hidden on Mobile */}
                    <div className="hidden lg:flex items-center gap-6">

                        {/* Search Bar */}
                        <div className="relative flex items-center">
                            <AnimatePresence>
                                {isSearchOpen && (
                                    <motion.div
                                        initial={{ width: 0, opacity: 0, marginRight: 0 }}
                                        animate={{ width: 200, opacity: 1, marginRight: 8 }}
                                        exit={{ width: 0, opacity: 0, marginRight: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className={cn(
                                                "bg-transparent border-b  px-2 py-1 text-sm w-full focus:outline-none",
                                                isGlass ? "border-[#1B362D]/50 text-[#1B362D] placeholder:text-[#1B362D]/50 focus:border-[#D4AF37]" : "border-white/50 text-white placeholder:text-white/50 focus:border-[#D4AF37]"
                                            )}
                                            autoFocus
                                            onBlur={() => setIsSearchOpen(false)}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className={cn(
                                    "transition-colors focus:outline-none p-1",
                                    textColorClass,
                                    isGlass ? "hover:text-[#D4AF37]" : "hover:text-[#D4AF37]"
                                )}
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Phone Number */}
                        <div className="hidden xl:block">
                            <SocialIcon
                                icon={Phone}
                                label="+94 77 718 3746"
                                color="#22c55e"
                                href="tel:+94777183746"
                                tooltipPosition="bottom"
                            />
                        </div>

                        {/* Login Icon */}
                        <SocialIcon
                            icon={User}
                            label="Login"
                            color="#D4AF37"
                            href="/login"
                            tooltipPosition="bottom"
                        />
                    </div>
                </div>

                {/* Desktop Mega Menu Overlay */}
                <AnimatePresence>
                    {hoveredLink && navLinks.find(l => l.name === hoveredLink)?.megaMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 w-full bg-white text-black shadow-2xl border-t border-gray-100 overflow-hidden"
                            // Keep menu open when hovering over it
                            onMouseEnter={() => setHoveredLink(hoveredLink)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="container mx-auto px-6 py-8">
                                <div className="grid grid-cols-12 gap-8">
                                    {/* Left Column: Categories */}
                                    <div className="col-span-3 border-r border-gray-100 pr-8">
                                        <h3 className="font-heading text-2xl font-bold mb-6 text-[#1B362D]">
                                            {hoveredLink === "DESTINATIONS" ? "Explore Destinations" : "Curated Experiences"}
                                        </h3>
                                        <div className="space-y-6">
                                            {navLinks.find(l => l.name === hoveredLink)?.megaMenu?.categories.map((category, idx) => (
                                                <div key={idx}>
                                                    <h4 className="font-bold text-xs uppercase tracking-widest text-[#1B362D]/70 mb-3">{category.title}</h4>
                                                    <ul className="space-y-2">
                                                        {category.items.map((item, i) => (
                                                            <li key={i}>
                                                                <Link
                                                                    href={item.href}
                                                                    className="text-gray-600 hover:text-[#D4AF37] hover:translate-x-1 transition-all duration-200 block text-sm font-medium"
                                                                >
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
                                    <div className="col-span-9 pl-4">
                                        <div className="flex justify-between items-end mb-6">
                                            <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400">Featured Highlights</h4>
                                            <Link href={navLinks.find(l => l.name === hoveredLink)?.href || "#"} className="text-[#1B362D] text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1 group/link">
                                                View All <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                                            </Link>
                                        </div>
                                        <div className="grid grid-cols-3 gap-6">
                                            {navLinks.find(l => l.name === hoveredLink)?.megaMenu?.featured.map((feature, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={feature.href}
                                                    className="group/card block relative overflow-hidden rounded-lg aspect-[4/3] shadow-md hover:shadow-xl transition-shadow duration-300"
                                                >
                                                    <Image
                                                        src={feature.image}
                                                        alt={feature.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                                                        <h5 className="text-white font-heading font-bold text-xl mb-1 group-hover/card:text-[#D4AF37] transition-colors">
                                                            {feature.title}
                                                        </h5>
                                                        {feature.description && (
                                                            <p className="text-white/80 text-xs font-medium line-clamp-2 transform translate-y-2 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300">
                                                                {feature.description}
                                                            </p>
                                                        )}
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

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[60] overflow-hidden"
                    >
                        {/* Background with Blur */}
                        <div className="absolute inset-0">
                            <Image
                                src="/images/sigiriya.jpg"
                                alt="Menu Background"
                                fill
                                className="object-cover object-center blur-md scale-110 opacity-30"
                            />
                            <div className="absolute inset-0 bg-white/90 backdrop-blur-md" />
                        </div>

                        {/* Menu Content */}
                        <div className="relative z-10 flex flex-col h-full text-[#1B362D]">
                            <div className="flex justify-between items-center p-6 border-b border-gray-200/50">
                                <span className="font-heading font-bold text-2xl tracking-widest text-[#1B362D]">MENU</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 hover:bg-[#1B362D]/10 rounded-full transition-colors text-[#1B362D]"
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
                                                className="font-heading text-4xl font-bold text-[#1B362D]/60 hover:text-[#1B362D] transition-all block mb-4"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {link.name}
                                            </Link>

                                            {/* Mobile Submenu Preview */}
                                            {link.megaMenu && (
                                                <div className="pl-6 border-l-2 border-[#1B362D]/20 space-y-3">
                                                    {link.megaMenu.categories.map((cat, i) => (
                                                        <div key={i}>
                                                            <h5 className="text-xs uppercase tracking-widest text-[#D4AF37] mb-2">{cat.title}</h5>
                                                            <div className="flex flex-col gap-2">
                                                                {cat.items.slice(0, 3).map((item, j) => (
                                                                    <Link
                                                                        key={j}
                                                                        href={item.href}
                                                                        className="text-[#1B362D]/50 text-sm hover:text-[#1B362D] transition-colors"
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

                                    {/* Mobile Bottom Icons - FULL SOCIAL ICON SET */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="pt-8 flex flex-col items-center gap-6 border-t border-gray-200/50 mt-4"
                                    >
                                        {/* Action Icons */}
                                        <div className="flex gap-4">
                                            <SocialIcon
                                                icon={Search}
                                                label="Search"
                                                color="#D4AF37"
                                                onClick={() => { setIsSearchOpen(true); setIsMobileMenuOpen(false); }}
                                                tooltipPosition="top"
                                            />
                                            <SocialIcon
                                                icon={Phone}
                                                label="Call Us"
                                                color="#22c55e"
                                                href="tel:+94777183746"
                                                tooltipPosition="top"
                                            />
                                            <SocialIcon
                                                icon={User}
                                                label="Login"
                                                color="#D4AF37"
                                                href="/login"
                                                tooltipPosition="top"
                                            />
                                        </div>

                                        {/* Social Media Icons (From Hero) */}
                                        <div className="flex gap-4 opacity-80">
                                            <SocialIcon icon={Facebook} label="Facebook" color="#1877F2" href="#" tooltipPosition="top" />
                                            <SocialIcon icon={Instagram} label="Instagram" color="#E1306C" href="#" tooltipPosition="top" />
                                            <SocialIcon icon={Youtube} label="YouTube" color="#FF0000" href="#" tooltipPosition="top" />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
