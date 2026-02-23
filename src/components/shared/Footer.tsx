"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Facebook, Linkedin, Youtube, Phone, ArrowRight, MessageCircle, Mail, MapPin } from "lucide-react";
import { SocialIcon } from "./SocialIcon";

export const Footer = () => {
    return (
        <footer className="relative w-full overflow-hidden flex items-end">
            {/* 1. Background Image with Minimal Overlays for Maximum Visibility */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/ceylon-footer-bg.png"
                    alt="Tales of Ceylon Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Subtle dark gradient at bottom for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            <div className="relative z-10 w-full pt-32 pb-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

                        {/* Column 1: Brand & Story */}
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <Link href="/" className="inline-block group">
                                    <span className="font-art text-5xl text-accent block transition-transform group-hover:scale-105 duration-500">Tales of Ceylon</span>
                                    <div className="flex items-center gap-3">
                                        <div className="h-px w-8 bg-accent/30" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Luxury Expeditions</span>
                                    </div>
                                </Link>
                            </div>
                            <p className="text-[11px] font-medium leading-relaxed text-white/80 max-w-xs uppercase tracking-widest shadow-sm">
                                Curating extraordinary journeys through the legendary landscapes of Sri Lanka. From ancient myths to pristine shores, we bring the island's richest stories to life.
                            </p>
                            <div className="flex gap-4 pt-2">
                                <SocialIcon icon={Facebook} label="Facebook" color="#1877F2" href="#" tooltipPosition="top" />
                                <SocialIcon icon={Linkedin} label="LinkedIn" color="#0077B5" href="#" tooltipPosition="top" />
                                <SocialIcon icon={MessageCircle} label="WhatsApp" color="#25D366" href="#" tooltipPosition="top" />
                                <SocialIcon icon={Mail} label="Email" color="#EA4335" href="mailto:navoda991@gmail.com" tooltipPosition="top" />
                                <SocialIcon icon={Youtube} label="YouTube" color="#FF0000" href="#" tooltipPosition="top" />
                            </div>
                        </div>

                        {/* Column 2: Quick Navigation */}
                        <div className="space-y-8">
                            <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-accent">Navigation</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: "Home", href: "/" },
                                    { name: "About Ceylon", href: "/about" },
                                    { name: "Destinations", href: "/destinations" },
                                    { name: "Experiences", href: "/experiences" },
                                    { name: "Plan Your Visit", href: "/plan" },
                                    { name: "Contact Us", href: "/contact" },
                                ].map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-[11px] font-bold tracking-[0.2em] text-white/70 hover:text-accent transition-all duration-300 flex items-center group/nav"
                                        >
                                            <div className="w-0 h-px bg-accent group-hover/nav:w-4 transition-all mr-0 group-hover/nav:mr-3" />
                                            {link.name.toUpperCase()}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Contact Details */}
                        <div className="space-y-8">
                            <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-accent">Contact Details</h4>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-4 h-4 text-accent/80 mt-0.5" />
                                    <div className="text-[11px] font-bold text-white/70 leading-relaxed uppercase tracking-wider">
                                        419, Battaramulla,<br />
                                        Pannipitiya Rd, 12138<br />
                                        Sri Lanka
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="w-4 h-4 text-accent/80" />
                                    <span className="text-[11px] font-bold text-white/70 tracking-wider">+94 72 122 0008</span>
                                </div>
                                <div className="flex items-center gap-4 group/mail">
                                    <Mail className="w-4 h-4 text-accent/80" />
                                    <a href="mailto:navoda991@gmail.com" className="text-[11px] font-bold text-white/70 group-hover/mail:text-accent transition-colors tracking-wider">
                                        NAVODA991@GMAIL.COM
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Column 4: Newsletter */}
                        <div className="space-y-8">
                            <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-accent">Newsletter</h4>
                            <p className="text-[11px] font-medium text-white/60 leading-relaxed uppercase tracking-widest">
                                Join our inner circle for seasonal stories and exclusive updates.
                            </p>
                            <div className="relative pt-2">
                                <input
                                    type="email"
                                    placeholder="YOUR EMAIL ADDRESS"
                                    className="w-full h-12 bg-white/10 border border-white/20 rounded-none px-4 text-[10px] font-bold tracking-[0.2em] text-white placeholder:text-white/40 focus:outline-none focus:border-accent/60 transition-all shadow-lg"
                                />
                                <button className="absolute right-0 top-2 h-12 w-12 flex items-center justify-center text-accent hover:text-white transition-colors group/btn">
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase">
                            © 2026 CEYLON TRIPS (PVT) LTD. ALL RIGHTS RESERVED.
                        </div>
                        <div className="text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase">
                            CONCEPT BY <span className="text-white/50 hover:text-accent cursor-pointer transition-colors">NAVODA LAKSHIKA</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
