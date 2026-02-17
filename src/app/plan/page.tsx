"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
    Info, Calendar, Map, ArrowRight, Plane, CheckCircle2,
    FileText, Sun, Cloud, Umbrella, Train, Bus, Car,
    Hotel, Utensils, ShieldCheck, HeartPulse, Wallet,
    Languages, Download, MapPin, Clock, Camera, Compass, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PlanPage() {
    const [activeItinerary, setActiveItinerary] = useState(0);

    const PLACES = [
        {
            title: "SIGIRIYA",
            subtitle: "Ancient Rock Fortress",
            time: "3-4 Hours",
            tag: "UNESCO",
            image: "/images/sigiriya.jpg",
            delay: 0
        },
        {
            title: "ELLA ROCK",
            subtitle: "Scenic Mountain Hike",
            time: "4-5 Hours",
            tag: "ADVENTURE",
            image: "/images/ella.jpg",
            delay: 0.1
        },
        {
            title: "GALLE FORT",
            subtitle: "Dutch Colonial Heritage",
            time: "Full Day",
            tag: "HISTORY",
            image: "/images/galle.jpg",
            delay: 0.2
        },
        {
            title: "NINE ARCH",
            subtitle: "Railway Architecture",
            time: "1-2 Hours",
            tag: "ICONIC",
            image: "/images/nine-arch-bridge.jpg",
            delay: 0.3
        },
        {
            title: "MIRISSA",
            subtitle: "Beach & Whale Watching",
            time: "2-3 Days",
            tag: "COASTAL",
            image: "/images/mirissa.jpg",
            delay: 0.4
        },
        {
            title: "KANDY",
            subtitle: "Temple of the Tooth",
            time: "1-2 Days",
            tag: "SACRED",
            image: "/images/kandy.jpg",
            delay: 0.5
        }
    ];

    const ITINERARIES = [
        {
            duration: "3 DAYS",
            title: "The Cultural Triangle",
            route: "Colombo → Sigiriya → Kandy",
            description: "Perfect for short trips focusing on history and spiritual heritage.",
            activities: ["Climb Sigiriya", "Temple of the Tooth", "Dambulla Caves"],
            icon: <Map className="w-5 h-5" />
        },
        {
            duration: "7 DAYS",
            title: "The Classic Island Loop",
            route: "Colombo → Kandy → Ella → Mirissa",
            description: "The essential Sri Lankan experience covering hills and beaches.",
            activities: ["Blue Train Ride", "Tea Plantations", "Whale Watching"],
            icon: <Compass className="w-5 h-5" />
        },
        {
            duration: "10 DAYS",
            title: "Deep South & Wild East",
            route: "Galle → Yala → Arugam Bay → Trinco",
            description: "For wildlife lovers and surfers seeking the ultimate island life.",
            activities: ["Leopard Safari", "Surfing Lessons", "Snorkeling"],
            icon: <Plane className="w-5 h-5" />
        }
    ];

    return (
        <main className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-primary selection:text-white">
            <Navbar />

            {/* 1. HERO & INTRODUCTION */}
            <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/mirissa-clear.jpg"
                        alt="Plan Your Visit"
                        fill
                        className="object-cover object-center scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-bold tracking-[0.3em] uppercase mb-6 backdrop-blur-sm bg-white/10">
                            The Ultimate Guide
                        </span>
                        <h1 className="font-heading font-black text-6xl md:text-8xl mb-8 leading-tight drop-shadow-2xl">
                            PLAN YOUR <br />
                            <span className="text-secondary italic font-serif lowercase tracking-normal">adventure</span>
                        </h1>
                        <p className="text-lg md:text-xl font-light tracking-wide max-w-3xl mx-auto text-white/90 mb-10 leading-relaxed">
                            Sri Lanka is a land of vibrant contrasts. Whether you seek the mist-covered peaks of the central highlands or the sun-drenched shores of the south, our comprehensive guide helps you craft the perfect journey.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Button className="rounded-full bg-secondary hover:bg-secondary-dark text-primary font-bold px-8 py-6">
                                Start Planning
                            </Button>
                            <Button variant="outline" className="rounded-full border-white text-white hover:bg-white/10 px-8 py-6">
                                View Map
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. SUGGESTED ITINERARIES Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">CURATED JOURNEYS</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary">Suggested Itineraries</h2>
                            <p className="text-gray-500 mt-4 text-lg">Choose a plan that fits your time and interests. From quick escapes to deep explorations.</p>
                        </div>
                        <div className="flex gap-2 bg-sand/20 p-1.5 rounded-full border border-sand">
                            {ITINERARIES.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveItinerary(idx)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeItinerary === idx ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-primary'}`}
                                >
                                    {item.duration}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 space-y-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeItinerary}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-4 text-secondary">
                                        {ITINERARIES[activeItinerary].icon}
                                        <span className="font-bold tracking-widest uppercase text-sm">{ITINERARIES[activeItinerary].title}</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary">
                                        {ITINERARIES[activeItinerary].route}
                                    </h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {ITINERARIES[activeItinerary].description}
                                    </p>
                                    <ul className="space-y-4 pt-4">
                                        {ITINERARIES[activeItinerary].activities.map((act, i) => (
                                            <li key={i} className="flex items-center gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-secondary" />
                                                <span className="font-medium text-gray-700">{act}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className="rounded-full px-10 py-6 mt-6 bg-primary">Full Itinerary Details</Button>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="lg:col-span-7 relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
                            <Image
                                src={`/images/${activeItinerary === 0 ? 'sigiriya' : activeItinerary === 1 ? 'train' : 'yala'}.jpg`}
                                alt="Route Preview"
                                fill
                                className="object-cover transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-10 left-10 text-white">
                                <div className="flex items-center gap-3 mb-2">
                                    <MapPin className="w-5 h-5 text-secondary" />
                                    <span className="uppercase tracking-[0.2em] font-bold text-xs text-white/80">Interactive Route</span>
                                </div>
                                <div className="h-1 w-32 bg-secondary rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. BEST TIME TO VISIT & WEATHER */}
            <section className="py-24 bg-sand/10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative h-[600px] rounded-[3rem] overflow-hidden">
                            <Image src="/images/mirissa-beach.jpg" alt="Weather in Sri Lanka" fill className="object-cover" />
                            <div className="absolute top-10 left-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50">
                                <div className="flex items-center gap-4 mb-4">
                                    <Sun className="w-10 h-10 text-orange-400" />
                                    <div>
                                        <span className="block font-bold text-2xl text-primary">28°C</span>
                                        <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Average Temp</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center gap-8 border-b border-gray-100 pb-2">
                                        <span className="text-sm font-medium text-gray-600">Humidity</span>
                                        <span className="text-sm font-bold text-primary">75%</span>
                                    </div>
                                    <div className="flex justify-between items-center gap-8">
                                        <span className="text-sm font-medium text-gray-600">Sunshine</span>
                                        <span className="text-sm font-bold text-primary">8h/Day</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">SEASONS & WEATHER</span>
                                <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary">When to Visit?</h2>
                                <p className="text-gray-600 mt-4 text-lg">Sri Lanka is a year-round destination, but the weather depends on which coast you explore.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="p-8 bg-white rounded-3xl border border-sand shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                                            <Cloud className="w-6 h-6" />
                                        </div>
                                        <h4 className="font-bold text-primary text-xl">The Dry Season (Peak)</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-1">South & West</span>
                                            <span className="font-bold text-secondary">Dec – Mar</span>
                                        </div>
                                        <div>
                                            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block mb-1">East & North</span>
                                            <span className="font-bold text-secondary">May – Sep</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 bg-blue-50/30 rounded-3xl border border-blue-100 italic">
                                    <div className="flex items-center gap-3 mb-2 text-blue-600">
                                        <Umbrella className="w-5 h-5" />
                                        <span className="font-bold uppercase tracking-widest text-xs">Pro Tip</span>
                                    </div>
                                    <p className="text-gray-600 text-sm">Monsoon seasons alternate. When it's raining in the South, the East is perfectly sunny. You can always find sunshine somewhere on the island!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4 & 5. ENTRY & TRANSPORTATION Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Entry Requirements */}
                        <div className="space-y-8 p-12 bg-[#FDFBF7] rounded-[3rem] border border-sand shadow-sm">
                            <div className="flex items-center gap-4">
                                <FileText className="w-10 h-10 text-secondary" />
                                <h3 className="text-3xl font-heading font-bold text-primary">Entry Requirements</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold flex-shrink-0">1</div>
                                    <div>
                                        <h5 className="font-bold text-primary">Electronic Travel Authorization (ETA)</h5>
                                        <p className="text-gray-500 text-sm">Apply online at eta.gov.lk. Typically processed within 24-48 hours. Valid for 30 days initially.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold flex-shrink-0">2</div>
                                    <div>
                                        <h5 className="font-bold text-primary">Passport Validity</h5>
                                        <p className="text-gray-500 text-sm">Your passport must be valid for at least 6 months from the date of arrival.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold flex-shrink-0">3</div>
                                    <div>
                                        <h5 className="font-bold text-primary">Travel Insurance</h5>
                                        <p className="text-gray-500 text-sm">Highly recommended. Standard policies usually cover medical emergencies and flight cancellations.</p>
                                    </div>
                                </div>
                            </div>
                            <Link href="https://eta.gov.lk" target="_blank" className="inline-block">
                                <Button className="rounded-full bg-primary gap-2">Apply for Visa <ArrowRight className="w-4 h-4" /></Button>
                            </Link>
                        </div>

                        {/* Getting Around */}
                        <div className="space-y-8 p-12 bg-white rounded-[3rem] border border-gray-100 shadow-xl">
                            <div className="flex items-center gap-4">
                                <Train className="w-10 h-10 text-secondary" />
                                <h3 className="text-3xl font-heading font-bold text-primary">Getting Around</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <div className="flex items-center gap-3 mb-2 text-primary">
                                        <Train className="w-5 h-5" />
                                        <span className="font-bold">Trains</span>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed">The Kandy-Ella link is world-famous. Book seats in advance for 1st or 2nd class.</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <div className="flex items-center gap-3 mb-2 text-primary">
                                        <Bus className="w-5 h-5" />
                                        <span className="font-bold">Buses</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Cheap and frequent. Standard buses for locals, AC mini-vans for tourists.</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <div className="flex items-center gap-3 mb-2 text-primary">
                                        <Car className="w-5 h-5" />
                                        <span className="font-bold">Tuk-Tuks</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Use apps like **PickMe** or **Uber** for fixed, fair pricing in cities.</p>
                                </div>
                                <div className="p-4 bg-secondary/10 rounded-2xl">
                                    <div className="flex items-center gap-3 mb-2 text-secondary">
                                        <HelpCircle className="w-5 h-5" />
                                        <span className="font-bold">Driving</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Requires an International Driving Permit. We recommend hiring a car with a driver.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. ACCOMMODATION Section */}
            <section className="py-24 bg-primary text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">WHERE TO STAY</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold">Accommodation Styles</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Boutique Hotels", desc: "Converted tea bungalows and colonial villas offering high-end luxury.", icon: <Hotel className="w-8 h-8" />, color: "bg-white/5" },
                            { title: "Guesthouses", desc: "Authentic, family-run stays. Best way to experience local hospitality.", icon: <HeartPulse className="w-8 h-8" />, color: "bg-white/10" },
                            { title: "Eco-Resorts", desc: "Sustainable stays near national parks or hidden in deep jungles.", icon: <Sun className="w-8 h-8" />, color: "bg-white/5" }
                        ].map((item, i) => (
                            <div key={i} className={`p-10 rounded-[2.5rem] ${item.color} border border-white/10 hover:border-white/30 transition-all group`}>
                                <div className="text-secondary mb-6 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                                <h4 className="text-2xl font-heading font-bold mb-4">{item.title}</h4>
                                <p className="text-gray-300 leading-relaxed font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. ACTIVITIES & ATTRACTIONS (The Poster Grid Refined) */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">MUST-SEE DESTINATIONS</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary">Top Attractions</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {PLACES.map((place, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative aspect-[4/5] group overflow-hidden cursor-pointer rounded-[3rem] shadow-xl"
                            >
                                <Image src={place.image} alt={place.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest">
                                    {place.tag}
                                </div>

                                <div className="absolute bottom-8 left-8 text-white">
                                    <h3 className="text-4xl font-heading font-black uppercase leading-none mb-1">{place.title}</h3>
                                    <p className="text-white/80 font-medium text-sm mb-4">{place.subtitle}</p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase bg-primary/40 backdrop-blur-sm w-fit px-3 py-1 rounded-full">
                                        <Clock className="w-3 h-3" />
                                        <span>Est. {place.time}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. TRAVEL TIPS & LOCAL CUSTOMS */}
            <section className="py-24 bg-[#FDFBF7]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-1">
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">ESSENTIAL GUIDE</span>
                            <h2 className="text-4xl font-heading font-bold text-secondary mb-6">Local Wisdom</h2>
                            <p className="text-gray-500 mb-8">Respect the culture, stay safe, and navigate the island like a pro with these essential tips.</p>
                            <div className="p-6 bg-white rounded-3xl border border-sand shadow-sm">
                                <h5 className="font-bold text-primary mb-4 flex items-center gap-2"><Languages className="w-5 h-5 text-secondary" /> Language Basics</h5>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p><span className="font-bold">Ayubowan:</span> Hello / Long Life</p>
                                    <p><span className="font-bold">Isthuthi:</span> Thank You</p>
                                    <p><span className="font-bold">Kohomada:</span> How are you?</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm flex gap-6">
                                <Utensils className="w-10 h-10 text-secondary flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-primary text-xl mb-2">Dining Etiquette</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">It's common to eat with your right hand. Tap water is generally not for drinking; stick to bottled or filtered water.</p>
                                </div>
                            </div>
                            <div className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm flex gap-6">
                                <ShieldCheck className="w-10 h-10 text-secondary flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-primary text-xl mb-2">Temple Dress Code</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">Always cover your shoulders and knees. Remove shoes and hats before entering sacred grounds.</p>
                                </div>
                            </div>
                            <div className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm flex gap-6">
                                <Wallet className="w-10 h-10 text-secondary flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-primary text-xl mb-2">Money & Paying</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">Sri Lankan Rupee (LKR). Cards are accepted in major hotels and malls, but carry cash for smaller shops and tuk-tuks.</p>
                                </div>
                            </div>
                            <div className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm flex gap-6">
                                <HeartPulse className="w-10 h-10 text-secondary flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-primary text-xl mb-2">Emergency Numbers</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">Tourist Police: 1912. General Emergency: 119. Ambulance: 1990. Keep these saved in your phone.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9 & 10. INTERACTIVE TOOLS & RESOURCES */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="bg-secondary rounded-[4rem] p-12 lg:p-20 text-white relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Tools for the Perfect Trip</h2>
                                <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                                    Download our expert-crafted resources to help you stay organized on the go. From packing lists to festival calendars.
                                </p>
                                <div className="space-y-4">
                                    <button className="w-full flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <Download className="w-6 h-6 text-secondary" />
                                            <span className="font-bold">Sri Lanka Travel Guide PDF</span>
                                        </div>
                                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <Calendar className="w-6 h-6 text-secondary" />
                                            <span className="font-bold">2024 Festival Calendar</span>
                                        </div>
                                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
                                    </button>
                                    <button className="w-full flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <CheckCircle2 className="w-6 h-6 text-secondary" />
                                            <span className="font-bold">Essential Packing Checklist</span>
                                        </div>
                                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-[3rem] p-10 text-primary shadow-2xl relative">
                                <div className="absolute -top-6 -right-6 w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                                    <MapPin className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-heading font-bold mb-6">Quick Trip Planner</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Interest</label>
                                        <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-secondary transition-all">
                                            <option>Beach & Relaxation</option>
                                            <option>Wildlife & Safari</option>
                                            <option>Cultural Heritage</option>
                                            <option>Adventure & Hiking</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Duration</label>
                                        <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-secondary transition-all">
                                            <option>1-3 Days</option>
                                            <option>4-7 Days</option>
                                            <option>8-14 Days</option>
                                            <option>14+ Days</option>
                                        </select>
                                    </div>
                                    <Button className="w-full py-8 rounded-2xl bg-primary text-white text-lg font-bold shadow-lg mt-4">Personalize My Trip</Button>
                                    <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest mt-4">Get a customized itinerary in seconds</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 11. FINAL CALL TO ACTION */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <span className="text-secondary font-bold uppercase tracking-[0.3em] text-sm mb-6 block">Ready for the Journey?</span>
                        <h2 className="text-5xl md:text-7xl font-heading font-bold text-primary mb-10">Start your Tales of Ceylon today.</h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Button className="bg-primary hover:bg-primary-dark text-white rounded-full px-12 py-8 text-xl shadow-xl transition-all hover:scale-105">Book a Tour</Button>
                            <Button variant="outline" className="border-primary text-primary rounded-full px-12 py-8 text-xl hover:bg-primary/5 transition-all">Contact Expert</Button>
                        </div>
                        <div className="mt-16 flex items-center justify-center gap-8 text-gray-400">
                            {[
                                { label: "SAFE TRAVELS", val: "100%" },
                                { label: "LOCAL EXPERTS", val: "50+" },
                                { label: "HAPPY TRAVELERS", val: "10K+" }
                            ].map((stat, i) => (
                                <div key={i} className="text-center px-8 border-r last:border-0 border-gray-100">
                                    <span className="block font-black text-2xl text-secondary">{stat.val}</span>
                                    <span className="text-[10px] font-bold tracking-widest uppercase">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
