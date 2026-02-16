"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" },
    { name: "DESTINATIONS", href: "/destinations" },
    { name: "EXPERIENCES", href: "/experiences" },
    { name: "PLAN YOUR VISIT TO SRI LANKA", href: "/plan" },
    { name: "CONTACT US", href: "/contact" },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out",
                isScrolled
                    ? "bg-black/90 backdrop-blur-md py-4 border-b border-white/10"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">

                <button
                    className="group flex items-center gap-3 text-white hover:text-primary transition-colors focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <div className="relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 p-1 border border-white/30 rounded-full group-hover:border-primary transition-colors">
                        <span className="w-3 h-0.5 bg-current block group-hover:w-4 transition-all" />
                        <span className="w-4 h-0.5 bg-current block group-hover:w-3 transition-all" />
                    </div>
                </button>


                {/* Center: Brand (Simple) */}
                <Link href="/" className="absolute left-1/2 -translate-x-1/2 xl:static xl:translate-x-0 group">
                    <span
                        className="font-heading font-bold text-2xl tracking-[0.2em] text-white group-hover:text-white/80 transition-colors"
                    >
                        CEYLON<span className="text-primary font-light">TRIPS</span>
                    </span>
                </Link>

                {/* Right: Links (Desktop) */}
                <div className="flex items-center gap-8">
                    <div className="hidden xl:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/70">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="hover:text-white transition-colors">{link.name}</Link>
                        ))}
                    </div>

                    <Link href="/login" className="hidden lg:block">
                        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                            <User className="w-4 h-4" />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Full Screen Menu Overlay (Dark Theme) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col text-white"
                    >
                        {/* Close Button Header */}
                        <div className="flex justify-between items-center p-6 border-b border-white/10">
                            <span className="font-heading font-bold text-2xl tracking-widest text-white">MENU</span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                            >
                                <X className="h-8 w-8" />
                            </button>
                        </div>

                        <div className="flex-1 container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Links */}
                            <div className="space-y-6 flex flex-col justify-center">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="font-heading text-4xl lg:text-6xl font-bold text-white/50 hover:text-white hover:pl-4 transition-all duration-300 block"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="pt-8 flex gap-8"
                                >
                                    <Link href="/login" className="text-sm font-bold uppercase tracking-widest text-white/50 hover:text-primary">Login</Link>
                                    <Link href="/register" className="text-sm font-bold uppercase tracking-widest text-white/50 hover:text-primary">Register</Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
