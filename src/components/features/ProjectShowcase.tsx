"use client";

import React from "react";
import Image from "next/image";
import { Check, Star, Download, MapPin, Shield, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const ProjectShowcase = () => {
    return (
        <section className="relative bg-white py-24 overflow-hidden">

            {/* ---------------- SECTION 1: ABOUT (Text Left, Grid Right) ---------------- */}
            <div className="container mx-auto px-6 lg:px-12 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                                <Image src="/images/sigiriya.jpg" alt="icon" width={20} height={20} className="rounded-full object-cover w-full h-full p-1" />
                            </div>
                            <span className="font-bold text-sm uppercase tracking-widest text-primary">About Ceylon Trips</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary leading-tight">
                            Curating Unforgettable <br /> Sri Lankan Journeys
                        </h2>

                        <p className="text-gray-600 text-lg leading-relaxed">
                            Experience the pearl of the Indian Ocean with our bespoke travel packages.
                            We combine luxury, adventure, and culture to create memories that last a lifetime.
                        </p>

                        <ul className="space-y-4 mt-6">
                            {[
                                "Personalized itineraries tailored to your interests",
                                "Expert local guides with deep cultural knowledge",
                                "24/7 dedicated support throughout your trip"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-secondary flex items-center justify-center text-white flex-shrink-0">
                                        <Check className="h-3 w-3" />
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4">
                            <div className="inline-flex items-center gap-4 bg-sand/20 px-6 py-3 rounded-full">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                                            {/* Placeholder avatars */}
                                            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm font-bold text-secondary">
                                    <span className="text-primary">10k+</span> Happy Travelers
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Grid (Bento Style) */}
                    <div className="relative">
                        {/* Main Image */}
                        <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
                            <Image
                                src="/images/sigiriya.jpg"
                                alt="Sri Lanka Nature"
                                fill
                                className="object-cover"
                            />

                            {/* Floating Stats Card 1 */}
                            <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20 max-w-[180px]">
                                <div className="flex items-center gap-2 mb-2">
                                    <Star className="text-yellow-500 w-5 h-5 fill-current" />
                                    <span className="font-bold text-secondary">4.9/5</span>
                                </div>
                                <p className="text-xs text-gray-600 leading-tight">Rated excellent by travelers worldwide</p>
                            </div>

                            {/* Floating Stats Card 2 */}
                            <div className="absolute bottom-8 left-8 bg-secondary text-white p-5 rounded-2xl shadow-lg max-w-[200px]">
                                <div className="text-3xl font-bold mb-1">15+</div>
                                <div className="text-xs font-medium opacity-80 uppercase tracking-wider mb-2">Years Experience</div>
                                <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-primary rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* ---------------- SECTION 2: PRESENTATTION / FORM (Slanted Style) ---------------- */}
            <div className="container mx-auto px-6 lg:px-12 mb-32">
                <div className="bg-secondary rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-white">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute right-[-20%] top-[-20%] w-[800px] h-[800px] rounded-full border-[100px] border-white/20 blur-3xl" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                        {/* Left: Form */}
                        <div>
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm">
                                <Download className="text-primary w-6 h-6" />
                            </div>

                            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                                Get Your Free <br /> Travel Guide
                            </h2>

                            <p className="text-gray-300 text-lg mb-10 max-w-md">
                                Download our comprehensive guide to exploring Sri Lanka, featuring exclusive tips and hidden gems.
                            </p>

                            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 max-w-md">
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
                                    />
                                    <Button className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl py-6 text-lg font-bold shadow-lg shadow-primary/25">
                                        Get Access Now
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Right: Slanted Image (The "Book" Look) */}
                        <div className="relative h-[500px] flex items-center justify-center lg:justify-end perspective-1000">
                            <motion.div
                                initial={{ rotateY: -15, rotateX: 5, scale: 0.9 }}
                                whileHover={{ rotateY: 0, rotateX: 0, scale: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="relative w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-white transform hover:z-20 transition-all duration-500"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <Image
                                    src="/images/ella.jpg"
                                    alt="Travel Guide Cover"
                                    fill
                                    className="object-cover"
                                />

                                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                                    <h4 className="text-3xl font-heading font-bold text-white mb-2">Sri Lanka</h4>
                                    <p className="text-white/80 text-sm uppercase tracking-widest">Travel Edition 2026</p>
                                </div>
                            </motion.div>

                            {/* Decorative Elements behind */}
                            <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[350px] h-[480px] bg-white/10 rounded-2xl -z-10 rotate-6" />
                            <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[350px] h-[460px] bg-white/5 rounded-2xl -z-20 rotate-12" />
                        </div>

                    </div>
                </div>
            </div>


            {/* ---------------- SECTION 3: FEATURES (Unique Location) ---------------- */}
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-4">Unique Experiences</h2>
                    <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: MapPin,
                            title: "Prime Locations",
                            desc: "Stay in the heart of nature, from beachfront villas to misty mountain cabins.",
                            image: "/images/mirissa-beach.jpg"
                        },
                        {
                            icon: Shield,
                            title: "Safe & Secure",
                            desc: "Your safety is our priority. We ensure secure transport and verified accommodations.",
                            image: "/images/galle.jpg"
                        },
                        {
                            icon: Clock,
                            title: "24/7 Support",
                            desc: "Our dedicated team is available around the clock to assist you with any needs.",
                            image: "/images/sigiriya.jpg"
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="group bg-gray-50 rounded-3xl p-2 hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="bg-white rounded-[1.2rem] p-8 h-full flex flex-col items-center text-center border border-gray-100 group-hover:border-transparent transition-colors">
                                <div className="w-16 h-16 bg-sand/30 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    {feature.desc}
                                </p>
                                <div className="mt-auto w-full h-32 rounded-xl overflow-hidden relative">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};
