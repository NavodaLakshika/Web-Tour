"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Phone, ArrowRight, Twitter } from "lucide-react";
import { SocialIcon } from "./SocialIcon";

export const Footer = () => {
    return (
        <footer className="relative w-full overflow-hidden bg-black flex items-end">


            <div className="relative z-10 w-full pt-12 pb-6">
                <div className="container mx-auto px-6 flex flex-col items-center">

                    {/* 1. Newsletter Section */}
                    <div className="w-full max-w-xl mb-10 text-center space-y-3">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-white/60 uppercase">Sign Up For Updates</span>
                        <div className="relative max-w-xl mx-auto">
                            <input
                                type="email"
                                placeholder="ENTER YOUR EMAIL ADDRESS"
                                className="w-full h-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-8 text-center text-[10px] font-bold tracking-widest text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-all"
                            />
                            <button className="absolute right-1 top-1 h-10 w-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform group">
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>

                    {/* 2. Navigation Horizontal Links */}
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
                        {[
                            { name: "HOME", href: "/" },
                            { name: "ABOUT US", href: "/about" },
                            { name: "DESTINATIONS", href: "/destinations" },
                            { name: "EXPERIENCES", href: "/experiences" },
                            { name: "PLAN YOUR VISIT", href: "/plan" },
                            { name: "CONTACT US", href: "/contact" },
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[10px] font-bold tracking-[0.2em] text-white/80 hover:text-white transition-colors uppercase"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* 3. Three-Column Grid */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-10 border-t border-white/10 pt-10">

                        {/* Connect */}
                        <div className="flex flex-col items-center space-y-6">
                            <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">Connect With Us</span>
                            <div className="flex gap-4">
                                <SocialIcon icon={Facebook} label="Facebook" color="#1877F2" href="#" tooltipPosition="top" />
                                <SocialIcon icon={Instagram} label="Instagram" color="#E1306C" href="#" tooltipPosition="top" />
                                <SocialIcon icon={Twitter} label="Twitter" color="#1DA1F2" href="#" tooltipPosition="top" />
                                <SocialIcon icon={Youtube} label="YouTube" color="#FF0000" href="#" tooltipPosition="top" />
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col items-center text-center space-y-4">
                            <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">Contact Us</span>
                            <div className="text-[10px] font-bold tracking-[0.1em] text-white space-y-1 uppercase leading-relaxed max-w-[200px]">
                                <p>Ceylon Trips (Pvt) Ltd</p>
                                <p className="text-white/60">419, Battaramulla, Pannipitiya Rd, 12138</p>
                                <p className="text-white/60">Sri Lanka</p>
                            </div>
                        </div>

                        {/* Direct Contact */}
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="flex items-center gap-2 text-white">
                                <Phone className="w-3.5 h-3.5 text-white/40" />
                                <span className="text-[11px] font-bold tracking-[0.2em]">+94 77 718 3746</span>
                            </div>
                            <a href="mailto:hello@ceylontrips.com" className="text-[10px] font-bold tracking-[0.2em] text-white/60 hover:text-white transition-colors uppercase">
                                hello@ceylontrips.com
                            </a>
                        </div>
                    </div>

                    {/* 4. Copyright Bar */}
                    <div className="w-full text-center space-y-2 pb-4">
                        <p className="text-[8px] font-light tracking-[0.3em] text-white/20 uppercase">
                            Concept and Design by Navoda Lakshika
                        </p>
                        <p className="text-[8px] font-light tracking-[0.3em] text-white/20 uppercase">
                            © 2026 Ceylon Trips (Private) Limited. All rights reserved.
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
};
