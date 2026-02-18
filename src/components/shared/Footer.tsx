"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Phone, ArrowUpRight, Globe } from "lucide-react";
import { SocialIcon } from "./SocialIcon";

export const Footer = () => {
    return (
        <footer className="relative w-full bg-white text-slate-900 overflow-hidden py-24 border-t border-gray-100">
            {/* Background Image / Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/images/Beautiful-footer.png"
                    alt="Footer Background"
                    fill
                    className="object-contain opacity-30"
                />
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <div className="flex flex-col items-center">
                    {/* Newsletter Signup */}
                    <div className="w-full max-w-2xl mb-24 text-center">
                        <h3 className="text-xl font-black tracking-[0.3em] uppercase text-primary mb-10 font-heading">Join the Adventure</h3>
                        <div className="relative max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="ENTER YOUR EMAIL ADDRESS"
                                className="w-full h-16 rounded-full bg-white border-2 border-slate-100 px-10 text-center text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-black tracking-widest text-xs uppercase shadow-lg shadow-black/5"
                            />
                            <button className="absolute right-2 top-2 h-12 w-12 bg-primary rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-xl shadow-primary/20">
                                <ArrowUpRight className="h-6 w-6 rotate-45" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 mb-24">
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
                                className="text-[13px] font-black tracking-[0.25em] text-slate-900 hover:text-primary transition-all uppercase relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </div>

                    {/* Contact Grid */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-20 border-t-2 border-slate-100 pt-20">

                        {/* Social Icons */}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <h4 className="text-xs font-black tracking-[0.3em] text-primary uppercase mb-10">Connect With Us</h4>
                            <div className="flex gap-6">
                                <SocialIcon icon={Facebook} label="Facebook" color="#1877F2" href="#" />
                                <SocialIcon icon={Instagram} label="Instagram" color="#E1306C" href="#" />
                                <SocialIcon icon={Youtube} label="YouTube" color="#FF0000" href="#" />
                                <SocialIcon icon={Globe} label="Website" color="#D4AF37" href="#" />
                            </div>
                        </div>

                        {/* Location / Address */}
                        <div className="flex flex-col items-center">
                            <h4 className="text-xs font-black tracking-[0.3em] text-primary uppercase mb-10">Our Location</h4>
                            <div className="space-y-3 text-sm font-black tracking-wide text-slate-600">
                                <p className="uppercase text-slate-900 text-lg mb-4">Ceylon Trips (Pvt) Ltd</p>
                                <p className="hover:text-primary transition-colors cursor-default">419, 1, Battaramulla,</p>
                                <p className="hover:text-primary transition-colors cursor-default">Pannipitiya Rd, 12138</p>
                                <p className="uppercase text-primary text-lg mt-4">Sri Lanka</p>
                            </div>
                        </div>

                        {/* Direct Contact */}
                        <div className="flex flex-col items-center md:items-end justify-center h-full text-center md:text-right">
                            <div className="flex flex-col gap-6">
                                <a href="tel:+94777183746" className="text-2xl font-heading font-black tracking-wider hover:text-primary transition-transform hover:scale-105 flex items-center justify-center md:justify-end gap-3 text-slate-900">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <Phone className="h-6 w-6 text-primary" />
                                    </div>
                                    +94 77 718 3746
                                </a>
                                <a href="mailto:hello@ceylontrips.com" className="text-sm font-black tracking-widest uppercase hover:text-primary transition-colors text-slate-900 decoration-primary/30 underline underline-offset-8 decoration-2">
                                    hello@ceylontrips.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Copyright Section */}
                    <div className="mt-20 pt-10 border-t border-slate-100 w-full text-center">
                        <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                            Copyright © 2026 Ceylon Trips (Private) Limited. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
