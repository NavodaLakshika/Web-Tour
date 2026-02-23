"use client";

import { useState } from "react";
import { Hero } from "@/components/shared/Hero";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { ProjectShowcase } from "@/components/features/ProjectShowcase";
import { DestinationCard } from "@/components/features/DestinationCard";
import { GallerySection } from "@/components/features/GallerySection";
import { GeometricGallery } from "@/components/features/GeometricGallery";
import { TestimonialSection } from "@/components/features/TestimonialSection";
import { destinations, experiences } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, MapPin, Compass,
  Calendar, Heart, Sparkles,
  ShieldCheck, Palmtree, Users,
  Newspaper, Navigation, Landmark,
  ChevronLeft, ChevronRight, PlusCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useEffect, useMemo } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All Wonders');
  const [liveDestinations, setLiveDestinations] = useState<any[]>([]);

  useEffect(() => {
    const fetchLiveDestinations = async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*');

      if (!error && data) {
        // Filter out destinations that already exist in static data by slug to avoid duplicates
        const staticSlugs = destinations.map(d => d.slug);
        const uniqueLive = data.filter(d => !staticSlugs.includes(d.slug));
        setLiveDestinations(uniqueLive);
      }
    };

    fetchLiveDestinations();
  }, []);

  const allDestinations = useMemo(() => {
    return [...destinations, ...liveDestinations];
  }, [liveDestinations]);

  // Mapping categories to filtering logic
  const filteredDestinations = allDestinations.filter(dest => {
    if (activeCategory === 'All Wonders') return true;
    if (activeCategory === 'Cultural Triangle') return dest.interest === 'Cultural';
    if (activeCategory === 'Southern Coast') return dest.region === 'South';
    if (activeCategory === 'Hill Country') return dest.region === 'Central' && dest.interest === 'Nature';
    if (activeCategory === 'Wildlife Safari') return dest.interest === 'Wildlife';
    if (activeCategory === 'Eastern Beaches') return dest.region === 'East';
    if (activeCategory === 'Central Heritage') return dest.region === 'Central';
    return true;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);

  // Always get exactly 10 items for the current page, using placeholders if needed
  const rawPaginated = filteredDestinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginatedDestinations = [
    ...rawPaginated,
    ...Array(Math.max(0, 10 - rawPaginated.length)).fill({ isPlaceholder: true })
  ];

  // EXPERIENCE SECTION LOGIC
  const [expPage, setExpPage] = useState(1);
  const [expCategory, setExpCategory] = useState('All');
  const expItemsPerPage = 6;

  const filteredExperiences = experiences.filter(exp => {
    if (expCategory === 'All') return true;
    return exp.category === expCategory;
  });

  const totalExpPages = Math.ceil(filteredExperiences.length / expItemsPerPage);
  const paginatedExperiences = filteredExperiences.slice(
    (expPage - 1) * expItemsPerPage,
    expPage * expItemsPerPage
  );

  const finalExperiences = [
    ...paginatedExperiences,
    ...Array(Math.max(0, 6 - paginatedExperiences.length)).fill({ isPlaceholder: true })
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-primary selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION (Kept as requested) */}
      <Hero />

      {/* 2. GALLERY SECTION - "Create Memories With Ceylon Trips" */}
      <GallerySection />

      {/* 3. INTRODUCTION / WELCOME SECTION */}
      <section className="bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Left Content Section - Widened to ensure 3-line fitting */}
            <div className="w-full lg:w-[50%] space-y-12 relative z-50">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <div className="flex flex-col items-start lg:translate-x-[-10px]">
                    <div className="overflow-hidden">
                      <motion.span
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="font-heading font-black text-3xl md:text-5xl text-gray-900 uppercase tracking-tight leading-[1.1] mb-2 block"
                      >
                        &ldquo;Discover Tales of Ceylon&rdquo;
                      </motion.span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <p className="text-gray-600 font-art capitalize tracking-tight text-sm md:text-2xl leading-relaxed max-w-none">
                    <span className="lg:whitespace-nowrap block">Discover 2,500 years of sacred heritage through the monarchic eras of the Cultural</span>
                    <span className="lg:whitespace-nowrap block">Triangle and the coastal colonial forts of the south. Journey from the misty tea</span>
                    <span className="lg:whitespace-nowrap block">highlands to the leopard-ruled wilds of Yala, exploring ancient myths that breathe</span>
                    <span className="lg:whitespace-nowrap block">life into this pearl of the ocean. Our curated tales narrate a land of vibrant</span>
                    <span className="lg:whitespace-nowrap block">festivals, architectural marvels, and timeless hospitality in legendary Ceylon.</span>
                  </p>
                </div>

                <div className="pt-4">
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.4em] bg-black text-white px-14 py-8 rounded-none hover:bg-secondary hover:text-primary transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      Discover Our Story
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </span>
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Image Section - Refined Size */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-[65%] relative z-30 lg:mt-0 lg:mb-0 lg:-mr-32 xl:-mr-40"
            >
              <div className="relative">
                <Image
                  src="/images/DaladaMaligawa.jpg"
                  alt="Beautiful Sri Lanka"
                  width={2000}
                  height={2400}
                  className="w-full h-auto transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. SIGNATURE DESTINATIONS - Luxury Nusa Style */}
      <section className="py-22 bg-[#FDFBF7] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-16">

          <div className="flex flex-col items-center text-center mb-16 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-black text-black uppercase tracking-tight">
                <div className="overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    Signature Destinations
                  </motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="text-gray-600 italic font-art lowercase tracking-normal block"
                  >
                    of Sri Lanka
                  </motion.span>
                </div>
              </h2>
              <p className="text-gray-500 text-sm max-w-2xl mx-auto font-light leading-relaxed">Explore handpicked destinations across the island — from ancient wonders to tropical beaches and wildlife safaris.</p>
            </motion.div>

            {/* Sharp Professional Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap justify-center gap-3 mt-4"
            >
              {[
                'All Wonders', 'Cultural Triangle', 'Southern Coast', 'Hill Country', 'Wildlife Safari', 'Eastern Beaches', 'Central Heritage'
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-6 py-3 rounded-none text-[10px] font-black uppercase tracking-widest border transition-all ${activeCategory === cat ? 'bg-black text-white border-black shadow-xl scale-105' : 'bg-transparent text-black border-black/10 hover:border-black'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          <div className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + currentPage}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[280px]"
              >
                {/* Left Stack - Fly in from Left */}
                <div className="md:col-span-4 lg:col-span-3 grid grid-rows-2 gap-4">
                  {paginatedDestinations.slice(0, 2).map((dest, i) => (
                    <motion.div
                      key={dest.isPlaceholder ? `placeholder-left-${i}` : dest.id}
                      variants={{
                        hidden: { opacity: 0, x: -100, scale: 0.9 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          scale: 1,
                          transition: { type: "spring", damping: 20, stiffness: 100 }
                        },
                        exit: { opacity: 0, x: -50, scale: 0.9 }
                      }}
                      className={`relative group rounded-2xl overflow-hidden shadow-sm transition-all duration-500 ${dest.isPlaceholder ? 'bg-black/5 border border-dashed border-black/10 flex items-center justify-center' : 'hover:shadow-2xl'}`}
                    >
                      {!dest.isPlaceholder ? (
                        <>
                          <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-[11px] font-black text-black z-10">{dest.rating}</div>
                          <div className="absolute bottom-6 left-6 text-white pr-4">
                            <span className="text-xl font-black block leading-none mb-1 tracking-tighter opacity-60">SL</span>
                            <span className="text-lg font-black uppercase tracking-tight block">{dest.name}</span>
                            <div className="h-1 w-8 bg-white mt-2 transition-all duration-500 group-hover:w-16" />
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-8 opacity-20">
                          <PlusCircle className="w-8 h-8 mx-auto mb-2" />
                          <span className="text-[10px] font-black uppercase tracking-widest block">Exploring More...</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Middle Pillar - Fly in from Bottom */}
                <div className="md:col-span-4 lg:col-span-4">
                  {!paginatedDestinations[2].isPlaceholder ? (
                    <motion.div
                      key={paginatedDestinations[2].id}
                      variants={{
                        hidden: { opacity: 0, y: 150, scale: 0.9 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: { type: "spring", damping: 20, stiffness: 100 }
                        },
                        exit: { opacity: 0, y: 50, scale: 0.9 }
                      }}
                      className="relative group rounded-3xl overflow-hidden h-full shadow-md hover:shadow-2xl transition-all duration-500"
                    >
                      <Image src={paginatedDestinations[2].image} alt={paginatedDestinations[2].name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white shadow-xl flex items-center justify-center text-sm font-black text-black z-10">{paginatedDestinations[2].rating}</div>
                      <div className="absolute bottom-10 left-10 text-white pr-6">
                        <span className="text-4xl font-black block leading-none mb-2 tracking-tighter opacity-50">SL</span>
                        <span className="text-2xl font-black uppercase tracking-tight block">{paginatedDestinations[2].name}</span>
                        <p className="text-white/70 text-xs mt-3 max-w-xs font-light line-clamp-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          Experience the timeless beauty of {paginatedDestinations[2].name}, a signature destination of Ceylon.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full bg-black/5 rounded-3xl border border-dashed border-black/10 flex items-center justify-center">
                      <div className="text-center opacity-20">
                        <Compass className="w-12 h-12 mx-auto mb-4 animate-spin-slow" />
                        <span className="text-sm font-black uppercase tracking-[0.3em]">New Discovery Coming Soon</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Stack - Fly in from Right */}
                <div className="md:col-span-4 lg:col-span-5 grid grid-rows-2 gap-4">
                  {!paginatedDestinations[3].isPlaceholder ? (
                    <motion.div
                      key={paginatedDestinations[3].id}
                      variants={{
                        hidden: { opacity: 0, x: 100, scale: 0.9 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          scale: 1,
                          transition: { type: "spring", damping: 20, stiffness: 100 }
                        },
                        exit: { opacity: 0, x: 50, scale: 0.9 }
                      }}
                      className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                    >
                      <Image src={paginatedDestinations[3].image} alt={paginatedDestinations[3].name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-[11px] font-black text-black z-10">{paginatedDestinations[3].rating}</div>
                      <div className="absolute bottom-6 left-6 text-white flex flex-col">
                        <span className="text-2xl font-black block leading-none mb-1 tracking-tighter opacity-60">SL</span>
                        <span className="text-lg font-black uppercase tracking-tight">{paginatedDestinations[3].name}</span>
                        <div className="h-1 w-8 bg-white mt-2 transition-all duration-500 group-hover:w-16" />
                      </div>
                    </motion.div>
                  ) : (
                    <div className="bg-black/5 rounded-2xl border border-dashed border-black/10 flex items-center justify-center">
                      <div className="text-center opacity-20">
                        <Sparkles className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-[10px] font-black uppercase tracking-widest block">Coming Soon</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {paginatedDestinations.slice(4, 6).map((dest, i) => (
                      <motion.div
                        key={dest.isPlaceholder ? `placeholder-right-bottom-${i}` : dest.id}
                        variants={{
                          hidden: { opacity: 0, y: 50, scale: 0.9 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { type: "spring", damping: 20, stiffness: 100 }
                          },
                          exit: { opacity: 0, y: 30, scale: 0.9 }
                        }}
                        className={`relative group rounded-2xl overflow-hidden shadow-sm transition-all duration-500 ${dest.isPlaceholder ? 'bg-black/5 border border-dashed border-black/10 flex items-center justify-center' : 'hover:shadow-2xl'}`}
                      >
                        {!dest.isPlaceholder ? (
                          <>
                            <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[10px] font-black text-black z-10">{dest.rating}</div>
                            <div className="absolute bottom-4 left-4 text-white">
                              <span className="text-sm font-black block leading-none mb-1 tracking-tighter opacity-60">SL</span>
                              <span className="text-xs font-black uppercase tracking-tight block">{dest.name}</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-center opacity-10">
                            <MapPin className="w-4 h-4 mx-auto" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Secondary Row for More Destinations (Items 7-10) */}
              {paginatedDestinations.length > 6 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4"
                >
                  {paginatedDestinations.slice(6, 10).map((dest, i) => (
                    <motion.div
                      key={dest.isPlaceholder ? `placeholder-bottom-${i}` : dest.id}
                      variants={{
                        hidden: { opacity: 0, y: 30, scale: 0.95 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: { type: "spring", damping: 25, stiffness: 120 }
                        },
                        exit: { opacity: 0, y: 20, scale: 0.95 }
                      }}
                      className={`relative group rounded-xl overflow-hidden shadow-sm transition-all duration-500 h-[220px] ${dest.isPlaceholder ? 'bg-black/5 border border-dashed border-black/10 flex items-center justify-center' : 'hover:shadow-xl'}`}
                    >
                      {!dest.isPlaceholder ? (
                        <>
                          <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <span className="text-[10px] font-black block leading-none mb-1 tracking-tighter opacity-70">SL</span>
                            <span className="text-sm font-black uppercase tracking-tight block">{dest.name}</span>
                            <div className="flex items-center gap-1 mt-1">
                              <div className="h-[2px] w-4 bg-primary" />
                              <span className="text-[10px] font-bold text-white/80">{dest.category}</span>
                            </div>
                          </div>
                          <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {dest.rating} Rating
                          </div>
                        </>
                      ) : (
                        <div className="text-center opacity-10">
                          <Heart className="w-5 h-5 mx-auto mb-2" />
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] block">Your Next Favorite</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Premium Pagination - Destinations Style */}
          {totalPages > 1 && (
            <div className="mt-20 flex justify-center items-center gap-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${currentPage === 1
                  ? 'border-black/5 text-black/20 cursor-not-allowed'
                  : 'border-black/10 text-black hover:border-black hover:bg-black hover:text-white'
                  }`}
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>

              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 text-[11px] font-black transition-all ${currentPage === i + 1
                      ? 'text-black border-b-2 border-secondary'
                      : 'text-black/30 hover:text-black'
                      }`}
                  >
                    {(i + 1).toString().padStart(2, '0')}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${currentPage === totalPages
                  ? 'border-black/5 text-black/20 cursor-not-allowed'
                  : 'border-black/10 text-black hover:border-black hover:bg-black hover:text-white'
                  }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="mt-20 text-center">
            <Link href="/destinations">
              <Button variant="outline" className="rounded-none border-black text-black px-16 py-8 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-black hover:text-white transition-all group">
                Explore All Destinations
                <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* 6. EXPERIENCES - Vertical Strip Slider (Reference Inspired) */}
      <section className="pt-18 pb-12 bg-[#FDFBF7] relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.5em] block">Curated Series</span>              <h2 className="text-3xl md:text-5xl font-heading font-black text-black uppercase tracking-tighter leading-tight">
                <div className="overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    Experience the
                  </motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="text-gray-600 italic font-art lowercase tracking-normal block"
                  >
                    Eternal Legend
                  </motion.span>
                </div>
              </h2>
            </motion.div>

            {/* Experience Categories - Light Theme */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2"
            >
              {['All', 'Adventure', 'Culinary', 'Wildlife', 'Heritage'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setExpCategory(cat);
                    setExpPage(1);
                  }}
                  className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${expCategory === cat ? 'bg-black text-white border-black shadow-xl' : 'bg-transparent text-black border-black/10 hover:border-black'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          <div className="relative h-[650px] overflow-hidden group/container bg-white shadow-2xl rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={expCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col md:flex-row h-full gap-0 md:gap-[2px]"
              >
                {filteredExperiences.slice(0, 6).map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    initial={{ flex: 1 }}
                    whileHover={{ flex: 2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative h-full overflow-hidden cursor-pointer border-r border-white/5"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 transition-transform duration-1000 scale-105 group-hover:scale-110">
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        className="object-cover transition-all duration-700 brightness-[0.7] group-hover:brightness-100"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                    {/* Content Section */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                      <div className="space-y-2">
                        <span className="text-[12px] font-black opacity-60 block leading-none tracking-tighter drop-shadow-lg">
                          {String(i + 1).padStart(2, '0')}.
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-none drop-shadow-xl max-w-[200px]">
                          {exp.title}
                        </h3>
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary">
                          {exp.category}
                        </span>
                      </div>

                      {/* Detail revealed on hover or fixed on desktop */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-6 pt-6 border-t border-white/10 hidden md:block overflow-hidden"
                      >
                        <p className="text-[11px] font-medium text-white/50 leading-relaxed max-w-[250px] line-clamp-2">
                          {exp.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Side Label (Vertical) */}
                    <div className="absolute top-12 left-8 md:origin-left md:-rotate-90 md:translate-y-24">
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 whitespace-nowrap">
                        Tales of Ceylon
                      </span>
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex justify-between items-center text-gray-400">
            <span className="text-[10px] font-bold tracking-widest uppercase">Select an experience to explore more</span>
            <div className="flex gap-4">
              <div className="h-[2px] w-24 bg-black/5 relative overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-black/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE CEYLON TRIPS SECTION (Premium Redesign) */}
      <section className="pt-12 pb-32 bg-[#FDFBF7] relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 lg:px-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl"
            >
              <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] block mb-4">The Ceylon Trips Difference</span>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-black uppercase tracking-tighter leading-none mb-6">
                <div className="overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    Redefining
                  </motion.span>
                </div>
                <div className="overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="text-gray-600 italic font-art lowercase tracking-normal block"
                  >
                    your journey
                  </motion.span>
                </div>
              </h2>
              <p className="text-gray-600 text-sm md:text-2xl font-art leading-relaxed max-w-none">
                <span className="lg:whitespace-nowrap block">We believe travel should be more than just visiting places;</span>
                <span className="lg:whitespace-nowrap block">it should be about creating legends and stories that last a lifetime.</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-[45%] relative"
            >
              <div className="relative">
                <Image
                  src="/images/travelsec.png"
                  alt="Ceylon Experience"
                  width={1200}
                  height={1500}
                  className="w-full h-auto transition-transform duration-1000 group-hover:scale-105 mix-blend-multiply"
                />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Landmark className="w-6 h-6" />,
                title: "Local Expertise",
                desc: "Deep-rooted knowledge of hidden gems and authentic cultural connections across the island."
              },
              {
                icon: <Navigation className="w-6 h-6" />,
                title: "Private Chauffeur Guides",
                desc: "Travel in comfort with our certified, multi-lingual guides who double as your private drivers."
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                title: "Custom Itineraries",
                desc: "100% personalized travel plans designed around your pace, interests, and budget requirements."
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Luxury Partnerships",
                desc: "Exclusive access to Sri Lanka's finest boutique villas, heritage hotels, and premium resorts."
              }
            ].map((usp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white p-10 rounded-[2.5rem] shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
              >
                {/* Decorative Number */}
                <span className="absolute -top-3 -right-1 text-5xl font-black text-black/[0.03] select-none group-hover:text-primary/[0.05] transition-colors duration-500">
                  0{i + 1}
                </span>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#FDFBF7] rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-[10deg] shadow-inner">
                    {usp.icon}
                  </div>
                  <h3 className="text-lg font-black text-black uppercase tracking-tight mb-4 group-hover:text-primary transition-colors duration-500">{usp.title}</h3>
                  <div className="h-[2px] w-8 bg-primary/20 mb-6 group-hover:w-16 transition-all duration-500" />
                  <p className="text-gray-500 font-light text-[13px] leading-relaxed group-hover:text-gray-700 transition-colors duration-500">{usp.desc}</p>
                </div>

                {/* Bottom Highlight */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <TestimonialSection />

      {/* 9. LATEST UPDATES / BLOG SECTION (Hidden until content is ready) */}
      {/*
      <section className="py-24 bg-[#FDFBF7]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div className="text-center md:text-left">
              <span className="text-secondary font-bold uppercase tracking-widest text-sm block mb-2">Island News</span>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-primary uppercase">Latest <span className="text-secondary italic font-serif lowercase tracking-normal">Travel Stories</span></h2>
            </div>
            <Link href="/blog">
              <div className="flex items-center gap-2 font-bold text-primary group cursor-pointer">
                Browse the Blog <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "The Ultimate Guide to Kandy Perahera 2026",
                date: "Aug 12, 2025",
                img: "/images/kandy.jpg",
                tag: "Festival"
              },
              {
                title: "Finding Serenity: Top 5 Silent Beaches in Trincomalee",
                date: "July 28, 2025",
                img: "/images/beach.jpg",
                tag: "Beaches"
              }
            ].map((blog, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-[3rem] shadow-sm border border-sand group cursor-pointer"
              >
                <div className="relative w-full md:w-56 h-56 rounded-[2.5rem] overflow-hidden flex-shrink-0">
                  <Image src={blog.img} alt={blog.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-secondary/10 text-secondary rounded-full">{blog.tag}</span>
                    <span className="text-xs text-gray-400 font-medium">{blog.date}</span>
                  </div>
                  <h4 className="text-2xl font-bold font-heading text-primary leading-tight group-hover:text-secondary transition-colors">{blog.title}</h4>
                  <p className="text-gray-500 text-sm font-light">Read more about this journey through the heart of Ceylon...</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* 11. FOOTER */}
      <Footer />
    </main>
  );
}
