"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Button, Input, Textarea } from "@/components/ui";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Globe, Send, Search, Users } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#FDFBF7] font-sans relative text-[#1B362D]">
            <Navbar />

            {/* 1. HERO SECTION */}
            <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center">
                {/* Hero Background */}
                <Image
                    src="/images/sigiriya-vibrant.jpg"
                    alt="Contact Hero"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Overlay - Adjusted for Light Theme */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase mb-4 block animate-pulse font-sans">
                            Get In Touch
                        </span>
                        <h1 className="font-heading text-6xl md:text-8xl font-bold text-white uppercase tracking-wider mb-6 drop-shadow-lg">
                            Contact Us
                        </h1>
                        <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full" />
                    </motion.div>
                </div>
            </section>

            {/* 2. MAIN CONTENT SECTION */}
            <section className="relative z-20 -mt-20 px-4 pb-0 container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-34">

                    {/* Left Column: Contact Info Grid */}
                    {/* Reduced padding to move text up slightly as requested: pt-20 lg:pt-32 */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 pt-20 lg:pt-32 text-[#1B362D] space-y-12"
                    >
                        <div>
                            {/* Changed to Text White for visibility on overlap */}
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-[#1B362D]">We'd love to hear from you</h2>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-xl font-sans">
                                Whether you're planning a trip or just have a question, our team is ready to help you craft the perfect Sri Lankan experience.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Phone */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#FDFBF7] text-[#1B362D] mb-4 group-hover:scale-110 transition-transform">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-xl mb-1 font-heading text-[#1B362D]">Phone Number</h4>
                                <p className="text-gray-500 text-sm font-sans">+94 77 718 3746</p>
                            </div>

                            {/* Email */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#FDFBF7] text-[#1B362D] mb-4 group-hover:scale-110 transition-transform">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-xl mb-1 font-heading text-[#1B362D]">Email Address</h4>
                                <p className="text-gray-500 text-sm font-sans">hello@ceylontrips.com</p>
                            </div>

                            {/* Website */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#FDFBF7] text-[#1B362D] mb-4 group-hover:scale-110 transition-transform">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-xl mb-1 font-heading text-[#1B362D]">Websites</h4>
                                <p className="text-gray-500 text-sm font-sans">www.ceylontrips.com</p>
                            </div>

                            {/* Address */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#FDFBF7] text-[#1B362D] mb-4 group-hover:scale-110 transition-transform">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-xl mb-1 font-heading text-[#1B362D]">Address</h4>
                                <p className="text-gray-500 text-sm font-sans">123 Temple Road, Colombo</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Floating Form Card */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-2xl relative z-20"
                        >
                            <div className="mb-8">
                                <h3 className="text-3xl font-bold text-[#1B362D] mb-2 font-heading">Send Message</h3>
                                <p className="text-gray-500 text-sm font-sans">Fill out the form and we'll be in touch soon.</p>
                            </div>

                            <form className="space-y-5">
                                <div className="space-y-2">
                                    <Input
                                        className="bg-gray-50 border-gray-200 text-[#1B362D] placeholder:text-gray-400 h-12 rounded-lg focus:border-[#D4AF37] focus:ring-0 font-sans"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        type="email"
                                        className="bg-gray-50 border-gray-200 text-[#1B362D] placeholder:text-gray-400 h-12 rounded-lg focus:border-[#D4AF37] focus:ring-0 font-sans"
                                        placeholder="Your Email"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        className="bg-gray-50 border-gray-200 text-[#1B362D] placeholder:text-gray-400 h-12 rounded-lg focus:border-[#D4AF37] focus:ring-0 font-sans"
                                        placeholder="Your Subject"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Textarea
                                        className="bg-gray-50 border-gray-200 text-[#1B362D] placeholder:text-gray-400 min-h-[140px] rounded-lg focus:border-[#D4AF37] focus:ring-0 resize-none font-sans"
                                        placeholder="Your Messages"
                                    />
                                </div>

                                <Button className="w-full bg-[#1B362D] hover:bg-[#2C5545] text-white font-bold h-12 rounded-lg text-sm tracking-widest uppercase transition-all shadow-lg hover:shadow-xl mt-4 group font-sans">
                                    Send Message <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. MAP SECTION */}
            <section className="relative h-[80vh] w-full bg-[#FDFBF7] overflow-hidden -mt-24 z-10 border-t border-gray-200 shadow-md">

                {/* Top Blend Gradient (Light Theme) */}
                <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#FDFBF7] to-transparent z-10 pointer-events-none" />

                {/* 1. Floating Search Pill - Top Center */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-24 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-4"
                >
                    <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-full p-2 flex items-center shadow-xl">
                        <div className="flex-1 px-6 border-r border-gray-200">
                            <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1 font-sans">Location</span>
                            <span className="text-sm font-bold text-[#1B362D] block font-heading">Colombo, LK</span>
                        </div>
                        <div className="hidden md:block flex-1 px-6 border-r border-gray-200">
                            <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1 font-sans">Type</span>
                            <span className="text-sm font-bold text-[#1B362D] block font-heading">Head Office</span>
                        </div>
                        <div className="p-2">
                            <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-white shadow-md">
                                <Search className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 2. Central Floating Property Card */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transform"
                >
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden w-[300px] group hover:-translate-y-2 transition-transform duration-300">
                        {/* Card Image */}
                        <div className="relative h-40 w-full">
                            <Image src="/images/galle.jpg" fill alt="Office" className="object-cover" />
                            <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-md text-[10px] font-bold text-[#1B362D] uppercase tracking-wider font-sans">
                                HQ
                            </div>
                        </div>
                        {/* Card Content */}
                        <div className="p-5">
                            <h4 className="text-[#1B362D] font-bold text-lg mb-1 font-heading">Ceylon Trips HQ</h4>
                            <p className="text-gray-500 text-xs flex items-center gap-1 mb-4 font-sans">
                                <MapPin className="w-3 h-3" /> Colombo 07, Sri Lanka
                            </p>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                                <div className="text-gray-400 text-xs font-medium flex items-center gap-2 font-sans">
                                    <Users className="w-4 h-4 text-[#D4AF37]" /> Support Team
                                </div>
                                <button className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider hover:text-[#1B362D] transition-colors font-sans">
                                    Visit Now
                                </button>
                            </div>
                        </div>
                        {/* Arrow Indicator */}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-r border-b border-gray-200 rotate-45" />
                    </div>
                </motion.div>

                {/* 3. Decorative Pins Scattered */}
                {[
                    { top: '30%', left: '25%', img: '/images/ella.jpg' },
                    { top: '60%', left: '75%', img: '/images/cooking.jpg' },
                    { top: '40%', left: '80%', img: '/images/sigiriya.jpg' },
                    { top: '70%', left: '20%', img: '/images/train.jpg' },
                ].map((pin, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                        className="absolute z-20 w-12 h-12 p-1 bg-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform border border-gray-100"
                        style={{ top: pin.top, left: pin.left }}
                    >
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                            <Image src={pin.img} fill alt="Pin" className="object-cover" />
                        </div>
                    </motion.div>
                ))}

                {/* The Map Itself (Clean Light style) */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.63229712771!2d79.81368625293297!3d6.921837369335836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838!2sColombo!5e0!3m2!1sen!2slk!4v1708150000000!5m2!1sen!2slk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="relative z-0"
                />

                {/* Bottom Blend to white background (Light Gradient) */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FDFBF7] to-transparent z-10 pointer-events-none" />
            </section>

            {/* Animated Text Marquee Section (Replaces Spacer) */}
            <section className="w-full bg-[#FDFBF7] py-6 overflow-hidden flex items-center">
                <div className="w-full border-y border-gray-100 py-4 bg-white/50 backdrop-blur-sm">
                    <motion.div
                        className="flex whitespace-nowrap w-max"
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                    >
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span className="text-3xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1B362D]/10 to-[#1B362D]/20 uppercase tracking-tight">
                                    Let's Create Memories
                                </span>
                                <span className="text-2xl text-[#D4AF37]">•</span>
                                <span className="text-3xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1B362D]/10 to-[#1B362D]/20 uppercase tracking-tight">
                                    Plan Your Journey
                                </span>
                                <span className="text-2xl text-[#D4AF37]">•</span>
                                <span className="text-3xl md:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1B362D]/10 to-[#1B362D]/20 uppercase tracking-tight">
                                    Get In Touch
                                </span>
                                <span className="text-2xl text-[#D4AF37]">•</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <div className="bg-black relative z-20">
                <Footer />
            </div>
        </main>
    );
}
