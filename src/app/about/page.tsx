"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { motion } from "framer-motion";
import {
    Star, Shield, Heart, Eye, Target,
    Leaf, Users, MapPin, Award, ArrowRight,
    Quote, Compass, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-primary selection:text-white">
            <Navbar />

            {/* 1. HERO & INTRODUCTION */}
            <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
                <Image
                    src="/images/sigiriya-vibrant.jpg"
                    alt="About Tales of Ceylon"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-secondary text-sm md:text-base font-bold tracking-[0.4em] uppercase mb-4 block drop-shadow-md">
                            Our Legacy
                        </span>
                        <h1 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-wider mb-6 leading-tight">
                            TALES OF <br /> <span className="text-secondary italic font-serif lowercase tracking-normal">Ceylon</span>
                        </h1>
                        <p className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto text-white/90 mb-10 leading-relaxed">
                            We are more than a travel company; we are storytellers of an island paradise, dedicated to showing you the hidden gems and rich culture of Sri Lanka.
                        </p>
                        <div className="w-24 h-1.5 bg-secondary mx-auto mb-6 rounded-full" />
                    </motion.div>
                </div>
            </section>

            {/* 2. COMPANY / TEAM STORY */}
            <section className="py-24 px-4 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="relative z-10 p-4 bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-3xl"
                            >
                                <div className="relative h-[600px] w-full overflow-hidden rounded-2xl">
                                    <Image src="/images/ella.jpg" fill alt="Our Founding Story" className="object-cover" />
                                </div>
                            </motion.div>
                            {/* Decoration */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
                            <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-primary text-white p-8 rounded-3xl shadow-2xl z-20 max-w-[200px] hidden lg:block">
                                <span className="text-4xl font-black block mb-2">12+</span>
                                <span className="text-xs uppercase tracking-widest font-bold opacity-70">Years of local expertise</span>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <span className="text-secondary text-sm font-bold tracking-widest uppercase block">Our Journey</span>
                                <h2 className="text-4xl md:text-5xl font-heading font-black text-primary leading-tight uppercase">How It All <span className="text-secondary font-serif italic lowercase">started</span></h2>
                            </div>
                            <p className="text-gray-600 text-lg leading-loose font-light">
                                Born from a decade of backpacking through the misty hills of Kandy and the golden shores of Mirissa, Tales of Ceylon was founded in 2012 by a group of local explorers who believed that typical tours were missing the true soul of the island.
                            </p>
                            <p className="text-gray-600 text-lg leading-loose font-light italic">
                                "Our dream was to move away from the tourist traps and instead, guide travelers into the living, breathing heart of Sri Lankan culture, where every meal has a story and every trail leads to wonder."
                            </p>

                            <div className="flex items-center gap-6 pt-6">
                                <div className="h-16 w-16 rounded-full bg-gray-200 relative overflow-hidden border-2 border-secondary p-1">
                                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center text-primary font-bold">NL</div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary text-xl">Navoda Lakshika</h4>
                                    <p className="text-sm text-gray-500 uppercase tracking-widest">Founder & Lead Explorer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. MISSION, VISION, VALUES */}
            <section className="py-24 bg-[#FDFBF7]">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-[3rem] shadow-sm border border-sand hover:shadow-xl transition-all"
                        >
                            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8">
                                <Target className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-heading font-black text-primary mb-4 uppercase tracking-tighter">Our Mission</h3>
                            <p className="text-gray-500 leading-relaxed font-light">
                                To craft authentic, high-end travel experiences that empower local communities and create lasting emotional connections for every traveler.
                            </p>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-10 rounded-[3rem] shadow-sm border border-sand hover:shadow-xl transition-all"
                        >
                            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8">
                                <Eye className="w-8 h-8 text-secondary" />
                            </div>
                            <h3 className="text-2xl font-heading font-black text-primary mb-4 uppercase tracking-tighter">Our Vision</h3>
                            <p className="text-gray-500 leading-relaxed font-light">
                                To be the global bridge to Sri Lanka's soul, recognized for setting the gold standard in sustainable, luxury narrative travel in South Asia.
                            </p>
                        </motion.div>

                        {/* Values */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-10 rounded-[3rem] shadow-sm border border-sand hover:shadow-xl transition-all"
                        >
                            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8">
                                <Leaf className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-heading font-black text-primary mb-4 uppercase tracking-tighter">Our Values</h3>
                            <ul className="space-y-2 text-gray-500 text-sm font-light">
                                <li className="flex items-center gap-2 tracking-wide">• 100% Sustainable Operations</li>
                                <li className="flex items-center gap-2 tracking-wide">• Respect for Indigenous Heritage</li>
                                <li className="flex items-center gap-2 tracking-wide">• Transparent Ethical Pricing</li>
                                <li className="flex items-center gap-2 tracking-wide">• Radical Customer Care</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. SERVICES OVERVIEW */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-secondary text-sm font-bold tracking-widest uppercase mb-4 block">Tailored for You</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-primary uppercase">What We <span className="text-secondary italic font-serif lowercase">offer</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group relative overflow-hidden rounded-[2.5rem] bg-sand/10 p-12 transition-all hover:bg-white hover:shadow-2xl hover:border-sand border border-transparent">
                            <div className="flex justify-between items-start mb-8">
                                <Compass className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                                <Link href="/plan">
                                    <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </Link>
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-primary mb-4">Bespoke Itineraries</h3>
                            <p className="text-gray-500 leading-relaxed font-light mb-6">Truly personalized trip planning that aligns with your specific interests, pace, and luxury preferences.</p>
                            <p className="text-xs font-bold text-secondary tracking-widest uppercase">Learn More</p>
                        </div>

                        <div className="group relative overflow-hidden rounded-[2.5rem] bg-primary text-white p-12 transition-all hover:shadow-2xl">
                            <div className="flex justify-between items-start mb-8">
                                <Users className="w-12 h-12 text-secondary group-hover:scale-110 transition-transform" />
                                <Link href="/destinations">
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all cursor-pointer">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </Link>
                            </div>
                            <h3 className="text-2xl font-heading font-bold mb-4">Expert Local Guides</h3>
                            <p className="text-white/60 leading-relaxed font-light mb-6">Our guides aren't just experts; they are friends of the local communities who open doors no one else can.</p>
                            <p className="text-xs font-bold text-secondary tracking-widest uppercase">Explore Guides</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. WHY CHOOSE US / UNIQUE SELLING POINTS */}
            <section className="py-24 bg-secondary">
                <div className="container mx-auto px-4 max-w-6xl text-primary">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-heading font-black uppercase leading-tight">Why Choose <br /> <span className="italic font-serif lowercase tracking-normal">Tales of Ceylon?</span></h2>
                            <p className="text-primary/70 text-lg font-light leading-relaxed">We take pride in being different from the corporate travel chains. Here is why thousands of travelers trust us with their dreams.</p>

                            <div className="space-y-6">
                                {[
                                    { title: "Personalized to the Soul", desc: "No cookie-cutter plans. Your itinerary starts with a personal chat." },
                                    { title: "Deep Local Roots", desc: "We support over 200 family-run businesses across the island." },
                                    { title: "24/7 Guardian Service", desc: "Always on call. We are your local friends, not just your agency." }
                                ].map((usp, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="w-6 h-6 rounded-full border border-primary flex items-center justify-center flex-shrink-0 mt-1">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-xl mb-1">{usp.title}</h5>
                                            <p className="text-primary/60 text-sm font-light">{usp.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 h-[500px]">
                            <div className="rounded-[3rem] overflow-hidden relative translate-y-12 shadow-2xl">
                                <Image src="/images/sigiriya.jpg" fill alt="Experience" className="object-cover" />
                            </div>
                            <div className="rounded-[3rem] overflow-hidden relative -translate-y-6 shadow-2xl">
                                <Image src="/images/mirissa-clear.jpg" fill alt="Experience" className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. TESTIMONIALS (Social Proof) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <Quote className="w-12 h-12 text-secondary/20 mx-auto mb-8" />
                    <h2 className="text-3xl md:text-4xl font-heading font-black text-primary uppercase mb-12">Voices of <span className="text-secondary italic font-serif lowercase">travelers</span></h2>

                    <div className="max-w-4xl mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="space-y-8"
                        >
                            <p className="text-2xl md:text-3xl text-gray-700 italic font-light leading-relaxed">
                                "The level of personalization was unlike anything we've experienced. We didn't just see Sri Lanka; we felt its pulse. The secret trail in Ella remains our favorite memory."
                            </p>
                            <div className="flex flex-col items-center">
                                <div className="h-16 w-16 rounded-full bg-sand/30 flex items-center justify-center font-bold text-primary mb-4 border border-sand">SM</div>
                                <h4 className="font-bold text-primary text-xl">Sarah & Mark Johnson</h4>
                                <p className="text-sm text-gray-400 uppercase tracking-widest">Travelers from Sydney</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 7. PARTNERSHIPS / AFFILIATIONS */}
            <section className="py-16 border-t border-sand bg-[#FDFBF7]">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-40 grayscale">
                        {/* Placeholder Partner Logos */}
                        {["Eco-Tourism Board", "Heritage Hotels", "Lanka Air", "Sustainable Trips", "Globe Trotters"].map((partner, i) => (
                            <span key={i} className="font-heading font-bold text-2xl text-primary tracking-widest">{partner}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. CALL TO ACTION */}
            <section className="py-24 bg-primary text-white text-center">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-4xl mx-auto space-y-10"
                    >
                        <h2 className="text-5xl md:text-7xl font-heading font-black uppercase leading-tight">Ready to live <br /> your <span className="text-secondary italic font-serif lowercase tracking-normal">own tale?</span></h2>
                        <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                            Start planning your dream trip to Sri Lanka today. Our explorers are ready to guide you home.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link href="/plan">
                                <Button className="rounded-full bg-secondary hover:bg-secondary/90 text-primary font-bold px-12 py-8 text-xl shadow-2xl transition-all hover:scale-105">Start Planning</Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/5 px-12 py-8 text-xl shadow-xl transition-all hover:scale-105">Contact Us</Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
