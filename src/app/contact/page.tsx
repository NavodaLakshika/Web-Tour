"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
            <Navbar />

            {/* 1. PREMIUM HERO SECTION */}
            <section className="relative h-screen w-full overflow-hidden bg-white text-foreground selection:bg-primary selection:text-white">
                {/* Full Bleed Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <div className="relative w-full h-full overflow-hidden">
                        <Image
                            src="/images/contact.jpg"
                            alt="Contact Us"
                            fill
                            className="object-cover"
                            priority
                            quality={100}
                        />

                        {/* Atmospheric Overlay */}
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                    </div>
                </div>

                <div className="relative z-10 w-full h-full flex items-center">
                    <div className="container mx-auto px-6 lg:px-16 pt-20">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center gap-4 text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                    <span>/</span>
                                    <span className="hover:text-white transition-colors cursor-default">Contact</span>
                                </div>

                                <h1 className="font-heading text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                                    Get In <br />
                                    <span className="text-white text-3xl md:text-5xl italic font-art lowercase tracking-normal">Touch</span>
                                </h1>

                                <div className="flex flex-col gap-6 mt-12">
                                    <p className="text-white/95 text-sm md:text-lg font-art leading-relaxed max-w-2xl">
                                        Have a question about your upcoming island adventure? Our local experts are ready to help you craft the perfect itinerary tailored to your soul.
                                    </p>

                                    <div className="flex flex-wrap gap-6 pt-4">
                                        <div className="flex flex-col">
                                            <span className="text-white font-black text-3xl tracking-tighter">24/7</span>
                                            <span className="text-white/40 text-[10px] uppercase font-black tracking-widest">Global Support</span>
                                        </div>
                                        <div className="h-12 w-px bg-white/20 hidden md:block" />
                                        <div className="flex flex-col">
                                            <span className="text-white font-black text-3xl tracking-tighter">Local</span>
                                            <span className="text-white/40 text-[10px] uppercase font-black tracking-widest">Island Experts</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. CONTACT DETAILS & FORM */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                        {/* Left: Contact Info */}
                        <div className="lg:col-span-5 space-y-16">
                            <div className="space-y-4">
                                <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] block">
                                    Reach Out
                                </span>
                                <h2 className="font-heading text-4xl md:text-5xl font-black text-black uppercase tracking-tighter leading-[0.9]">
                                    We're Here to <br /> Help You
                                </h2>
                                <p className="text-gray-500 text-lg font-art leading-relaxed">
                                    Whether it's a quick question or a detailed itinerary request, we're just a message away.
                                </p>
                            </div>

                            <div className="space-y-10">
                                <div className="flex gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-secondary border border-black/5 group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Call Us</span>
                                        <p className="text-xl font-heading font-black text-black">+94 11 234 5678</p>
                                        <p className="text-sm text-gray-400 font-art">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-secondary border border-black/5 group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Email Us</span>
                                        <p className="text-xl font-heading font-black text-black">hello@ceylontrips.com</p>
                                        <p className="text-sm text-gray-400 font-art">We reply within 12 hours</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-secondary border border-black/5 group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Our Office</span>
                                        <p className="text-xl font-heading font-black text-black">Colombo 07, Sri Lanka</p>
                                        <p className="text-sm text-gray-400 font-art">The heart of the island Capital</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="lg:col-span-1" /> {/* Spacer */}

                        <div className="lg:col-span-6 relative">
                            {/* Decorative Background Element for Glass Visibility */}
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse" />
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10" />

                            <div className="bg-white/40 backdrop-blur-xl p-10 lg:p-14 rounded-[3rem] border border-white/40 shadow-xl space-y-8 relative overflow-hidden">
                                {/* Subtle Inner Glow */}
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                                <div className="space-y-2">
                                    <h3 className="font-heading text-2xl font-black text-black uppercase tracking-tight flex items-center gap-3">
                                        <MessageSquare className="w-6 h-6 text-secondary" />
                                        Send a Message
                                    </h3>
                                    <p className="text-gray-500 text-sm font-art">Leave your details and message below.</p>
                                </div>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 ml-1">Full Name</label>
                                            <Input className="bg-white/60 backdrop-blur-sm border-white/20 rounded-2xl px-6 py-4 h-auto text-sm text-black outline-none focus:border-secondary focus-visible:ring-0 focus-visible:ring-offset-0 transition-all placeholder:text-black/30" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 ml-1">Email Address</label>
                                            <Input className="bg-white/60 backdrop-blur-sm border-white/20 rounded-2xl px-6 py-4 h-auto text-sm text-black outline-none focus:border-secondary focus-visible:ring-0 focus-visible:ring-offset-0 transition-all placeholder:text-black/30" placeholder="john@example.com" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 ml-1">Message</label>
                                        <Textarea className="bg-white/60 backdrop-blur-sm border-white/20 rounded-2xl px-6 py-5 min-h-[160px] text-sm text-black outline-none focus:border-secondary focus-visible:ring-0 focus-visible:ring-offset-0 transition-all resize-none placeholder:text-black/30" placeholder="How can we help you plan your journey?" />
                                    </div>

                                    <div className="pt-4">
                                        <button className="w-full py-6 bg-secondary hover:bg-black text-black hover:text-white font-black uppercase tracking-[0.3em] text-xs rounded-2xl transition-all duration-500 shadow-[0_20px_40px_rgba(212,175,55,0.15)] flex items-center justify-center gap-4 focus:outline-none group">
                                            Send Message
                                            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </button>
                                        <div className="flex items-center justify-center gap-4 mt-8 opacity-60">
                                            <Clock className="w-3 h-3 text-secondary" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-black/50">Average response: 6 hours</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
