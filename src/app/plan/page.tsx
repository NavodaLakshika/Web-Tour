"use client";

import React, { useState, useMemo } from "react";
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
import { supabase } from "@/lib/supabase";
import emailjs from "@emailjs/browser";

export default function PlanPage() {
    const [activeItinerary, setActiveItinerary] = useState(0);
    const [dbItineraries, setDbItineraries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [tripForm, setTripForm] = useState({
        focus: "Adventure",
        duration: "1-7 Days",
        accommodation: [] as string[]
    });

    React.useEffect(() => {
        const fetchItineraries = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('itineraries')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data && data.length > 0) {
                setDbItineraries(data);
            }
            setIsLoading(false);
        };

        fetchItineraries();
    }, []);

    const toggleAccommodation = (type: string) => {
        setTripForm(prev => {
            const current = [...prev.accommodation];
            if (current.includes(type)) {
                return { ...prev, accommodation: current.filter(t => t !== type) };
            } else {
                return { ...prev, accommodation: [...current, type] };
            }
        });
    };

    const handleTripSubmit = async () => {
        setIsSubmitting(true);
        try {
            // 1. Save to Supabase (Admin Dashboard)
            const { error } = await supabase
                .from('trip_requests')
                .insert([tripForm]);

            if (error) throw error;

            // 2. Send Email Alert via EmailJS
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    from_name: "Guest Interested in " + tripForm.focus,
                    from_email: "Trip Planner Request",
                    message: `Focus: ${tripForm.focus}\nDuration: ${tripForm.duration}\nAccommodation: ${tripForm.accommodation.join(', ')}`,
                    to_email: "navoda991@gmail.com",
                    subject: "New Trip Planning Request!"
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            alert("Your journey request has been received! Our experts will contact you within 12 hours.");
            setTripForm({ focus: "Adventure", duration: "1-7 Days", accommodation: [] });
        } catch (error: any) {
            console.error("EmailJS Error:", error);
            alert("Request saved, but email notification failed. We will contact you soon!");
        } finally {
            setIsSubmitting(false);
        }
    };

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

    const allItineraries = useMemo(() => {
        return [...ITINERARIES, ...dbItineraries];
    }, [dbItineraries]);

    return (
        <main className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-primary selection:text-white">
            <Navbar />

            {/* 1. PREMIUM HERO SECTION */}
            <section className="relative h-screen w-full overflow-hidden bg-white text-foreground selection:bg-primary selection:text-white">
                {/* Full Bleed Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <div className="relative w-full h-full overflow-hidden">
                        <Image
                            src="/images/plane-travel.jpg"
                            alt="Plan Your Adventure"
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
                                    <span className="hover:text-white transition-colors cursor-default">Plan</span>
                                </div>

                                <h1 className="font-heading text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                                    Plan Your <br />
                                    <span className="text-white text-3xl md:text-5xl italic font-art lowercase tracking-normal">Adventure</span>
                                </h1>

                                <div className="flex flex-col gap-6 mt-12">
                                    <p className="text-white/95 text-sm md:text-lg font-art leading-relaxed max-w-2xl">
                                        Sri Lanka is a land of vibrant contrasts. Whether you seek the mist-covered peaks of the central highlands or the sun-drenched shores of the south, our comprehensive guide helps you craft the perfect journey.
                                    </p>

                                    <div className="flex flex-wrap gap-6 pt-4">
                                        <div className="flex flex-col">
                                            <span className="text-white font-black text-3xl tracking-tighter">04+</span>
                                            <span className="text-white/40 text-[10px] uppercase font-black tracking-widest">Main Regions</span>
                                        </div>
                                        <div className="h-12 w-px bg-white/20 hidden md:block" />
                                        <div className="flex flex-col">
                                            <span className="text-white font-black text-3xl tracking-tighter">All</span>
                                            <span className="text-white/40 text-[10px] uppercase font-black tracking-widest">Seasons covered</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. HOW TO PLAN YOUR ADVENTURE */}
            <section className="py-24 bg-white border-b border-gray-100">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] block">
                                    A Simple Guide
                                </span>
                                <h2 className="font-heading text-4xl md:text-5xl font-black text-black uppercase tracking-tighter leading-[0.9]">
                                    How to Plan <br /> Your Journey
                                </h2>
                                <p className="text-gray-500 text-lg font-art leading-relaxed max-w-lg">
                                    Planning a trip to Sri Lanka is an exciting process. Here's how we recommend scheduling your island gateway.
                                </p>
                            </div>

                            <div className="space-y-12 pt-8">
                                {[
                                    { step: "01", title: "Select Your Season", desc: "Choose December to March for the South/West or May to September for the East Coast." },
                                    { step: "02", title: "Apply for Visa (ETA)", desc: "Quick online process via eta.gov.lk. Most citizens get approval within 48 hours." },
                                    { step: "03", title: "Identify Your Hubs", desc: "Decide if you want a mix of hills (Ella/Kandy) and beach (Galle/Mirissa) or focus on one." },
                                    { step: "04", title: "Book Key Transport", desc: "The Kandy-Ella train is a highlight—book your tickets at least 30 days in advance." }
                                ].map((step, idx) => (
                                    <div key={idx} className="flex gap-8 group">
                                        <span className="text-3xl font-heading font-black text-secondary/30 group-hover:text-secondary transition-colors duration-500">{step.step}</span>
                                        <div className="space-y-2">
                                            <h4 className="font-heading text-xl font-black text-black uppercase tracking-tight">{step.title}</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative p-8 bg-[#FDFBF7] border border-black/[0.03] rounded-[3rem]">
                            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] shadow-2xl">
                                <Image
                                    src="/images/moody-mountains.jpg"
                                    alt="Planning View"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-10 left-10 right-10">
                                    <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                                        <span className="text-white/60 text-[10px] uppercase font-black tracking-widest block mb-2">Pro Tip</span>
                                        <p className="text-white text-sm italic font-art leading-relaxed">
                                            "Don't try to see the whole island in one week. Focus on 2-3 regions to truly soak in the culture and the pace of island life."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. LOCATION EXPLORER (MAP) */}
            <section className="py-24 bg-gray-50/50">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="text-center space-y-4 mb-16">
                        <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] block">
                            Discover the Geography
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl font-black text-black uppercase tracking-tighter">
                            Island <span className="text-secondary italic font-art lowercase tracking-normal">Explorer</span>
                        </h2>
                    </div>

                    <div className="w-full h-[600px] bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-black/5 relative grayscale hover:grayscale-0 transition-all duration-1000">
                        {/* Placeholder for Google Map - I'll use a real iframe if provided, or a high-quality stylized embed */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4047231.841578!2d78.4617!3d7.8731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe1348b930b0363b!2sSri%20Lanka!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="opacity-80 hover:opacity-100 transition-opacity duration-1000"
                        ></iframe>

                        <div className="absolute top-10 right-10 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-black/5 max-w-xs pointer-events-none">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-black">Live Exploration</span>
                            </div>
                            <p className="text-gray-500 text-xs italic font-art">
                                Zoom in to explore the hidden gems across the Cultural Triangle, the Hill Country, and our pristine Southern beaches.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SUGGESTED ITINERARIES Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">CURATED JOURNEYS</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary">Suggested Itineraries</h2>
                            <p className="text-gray-500 mt-4 text-lg">Choose a plan that fits your time and interests. From quick escapes to deep explorations.</p>
                        </div>
                        <div className="flex gap-2 bg-sand/20 p-1.5 rounded-full border border-sand">
                            {allItineraries.map((item, idx) => (
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
                                        <Compass className="w-5 h-5" />
                                        <span className="font-bold tracking-widest uppercase text-sm">{allItineraries[activeItinerary]?.title}</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary">
                                        {allItineraries[activeItinerary]?.route}
                                    </h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {allItineraries[activeItinerary]?.description}
                                    </p>
                                    <ul className="space-y-4 pt-4">
                                        {allItineraries[activeItinerary]?.activities?.map((act: string, i: number) => (
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
                                src={allItineraries[activeItinerary]?.image || "/images/sigiriya.jpg"}
                                alt="Route Preview"
                                fill
                                className="object-cover transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-10 left-10 text-white">
                                <div className="flex items-center gap-3 mb-2">
                                    <MapPin className="w-5 h-5 text-secondary" />
                                    <span className="uppercase tracking-[0.2em] font-bold text-xs text-white/80">Route Preview</span>
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

            {/* 6. PLAN YOUR VISIT (INTERACTIVE FORM) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="bg-black/95 rounded-[4rem] p-12 lg:p-24 relative overflow-hidden shadow-2xl">
                        {/* Decorative Background Blur */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] block">
                                        Personalized Journey
                                    </span>
                                    <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                                        Plan Your <br /> <span className="text-secondary italic font-art lowercase tracking-normal">Visit</span>
                                    </h2>
                                    <p className="text-gray-400 text-lg font-art leading-relaxed max-w-lg">
                                        Tell us your dream island escape, and our local experts will craft a journey that resonates with your soul.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { icon: <MapPin className="w-5 h-5" />, label: "Tailor-made Routes", desc: "No two journeys are the same. We build from scratch." },
                                        { icon: <Clock className="w-5 h-5" />, label: "24/7 Local Support", desc: "Always here to guide you during your island stay." },
                                        { icon: <Compass className="w-5 h-5" />, label: "Secret Locations", desc: "Access spots that don't appear in guidebooks." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-6 items-start">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                                                {item.icon}
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="text-white font-black uppercase text-xs tracking-widest">{item.label}</h4>
                                                <p className="text-gray-500 text-xs font-art">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-3xl p-10 lg:p-14 rounded-[3rem] border border-white/10 shadow-2xl space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Your Focus</label>
                                        <select
                                            value={tripForm.focus}
                                            onChange={(e) => setTripForm({ ...tripForm, focus: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-secondary transition-all appearance-none"
                                        >
                                            <option className="bg-black">Adventure</option>
                                            <option className="bg-black">Wellness</option>
                                            <option className="bg-black">Heritage</option>
                                            <option className="bg-black">Wildlife</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Duration</label>
                                        <select
                                            value={tripForm.duration}
                                            onChange={(e) => setTripForm({ ...tripForm, duration: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm outline-none focus:border-secondary transition-all appearance-none"
                                        >
                                            <option className="bg-black">1-7 Days</option>
                                            <option className="bg-black">8-14 Days</option>
                                            <option className="bg-black">15-30 Days</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Accommodation Preferred</label>
                                    <div className="flex flex-wrap gap-2">
                                        {["Boutique", "Resort", "Guesthouse"].map(type => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => toggleAccommodation(type)}
                                                className={`px-4 py-2 rounded-xl text-[10px] font-black border transition-all uppercase ${tripForm.accommodation.includes(type) ? 'border-secondary bg-secondary text-black' : 'border-white/10 text-white/60 hover:border-secondary hover:text-white'}`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2 pt-4">
                                    <button
                                        onClick={handleTripSubmit}
                                        disabled={isSubmitting}
                                        className="w-full py-6 bg-secondary hover:bg-white text-black font-black uppercase tracking-[0.3em] text-xs rounded-2xl transition-all duration-500 shadow-[0_20px_40px_rgba(212,175,55,0.2)] disabled:opacity-50"
                                    >
                                        {isSubmitting ? "TRANSMITTING..." : "Start Your Journey"}
                                    </button>
                                    <p className="text-center text-[9px] text-white/30 uppercase tracking-[0.2em]">Response within 12 hours guaranteed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
