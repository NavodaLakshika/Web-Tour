"use client";

import Link from "next/link";

import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Phone, ArrowUpRight, Globe } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="relative w-full bg-gray-900 text-white overflow-hidden py-24 border-t border-gray-800">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/footer-bg.jpg"
                    alt="Misty Sri Lanka Landscape"
                    fill
                    className="object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">

                {/* Newsletter Signup */}
                <div className="w-full max-w-2xl mb-20">
                    <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 mb-8">Sign Up For Updates</h3>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="ENTER YOUR EMAIL ADDRESS"
                            className="w-full h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-8 text-center text-white placeholder:text-white/40 mb-4 focus:outline-none focus:bg-white/20 transition-all font-bold tracking-widest text-xs uppercase"
                        />
                        <button className="absolute right-2 top-2 h-12 w-12 bg-black rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                            <ArrowUpRight className="h-5 w-5 rotate-45" />
                        </button>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-20">
                    {[
                        { name: "HOME", href: "/" },
                        { name: "ABOUT US", href: "/about" },
                        { name: "DESTINATIONS", href: "/destinations" },
                        { name: "EXPERIENCES", href: "/experiences" },
                        { name: "PLAN YOUR VISIT TO SRI LANKA", href: "/plan" }, // Matching the request "PLAN YOUR VISIT..."
                        { name: "CONTACT US", href: "/contact" },
                    ].map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xs font-bold tracking-widest text-gray-300 hover:text-white transition-colors uppercase"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Contact Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16">

                    {/* Socials */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-6">Connect With Us</h4>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Youtube, Globe].map((Icon, idx) => (
                                <a key={idx} href="#" className="h-10 w-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex flex-col items-center">
                        <h4 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-6">Contact Us</h4>
                        <div className="space-y-1 text-xs font-medium tracking-wide text-gray-300">
                            <p className="uppercase">Ceylon Trips (Pvt) Ltd</p>
                            <p>419, 1, Battaramulla,</p>
                            <p>Pannipitiya Rd, 12138</p>
                            <p className="uppercase">Sri Lanka</p>
                        </div>
                    </div>

                    {/* Direct Contact */}
                    <div className="flex flex-col items-center md:items-end justify-center h-full">
                        <div className="flex flex-col gap-2 text-right">
                            <a href="tel:+94777183746" className="text-lg font-heading font-bold tracking-wider hover:text-primary transition-colors flex items-center justify-end gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                +94 77 718 3746
                            </a>
                            <a href="mailto:hello@ceylontrips.com" className="text-xs font-bold tracking-widest uppercase hover:text-primary transition-colors">
                                hello@ceylontrips.com
                            </a>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="mt-20 pt-8 border-t border-white/5 w-full">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-gray-600 uppercase">
                        Concept and Design by Antyra Solutions <br />
                        Copyrights 2026 - Ceylon Trips (Private) Limited
                    </p>
                </div>

            </div>
        </footer>
    );
};
