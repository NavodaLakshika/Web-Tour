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
import { ChatBot } from "@/components/features/ChatBot";
import { destinations, experiences } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, MapPin, Compass,
  Calendar, Heart, Sparkles,
  ShieldCheck, Palmtree, Users,
  Newspaper, Navigation, Landmark,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All Wonders');

  // Mapping categories to filtering logic
  const filteredDestinations = destinations.filter(dest => {
    if (activeCategory === 'All Wonders') return true;
    if (activeCategory === 'Cultural Triangle') return dest.interest === 'Cultural';
    if (activeCategory === 'Southern Coast') return dest.region === 'South';
    if (activeCategory === 'Hill Country') return dest.region === 'Central' && dest.interest === 'Nature';
    if (activeCategory === 'Wildlife Safari') return dest.interest === 'Wildlife';
    if (activeCategory === 'Eastern Beaches') return dest.region === 'East';
    if (activeCategory === 'Central Heritage') return dest.region === 'Central';
    return true;
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-primary selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION (Kept as requested) */}
      <Hero />

      {/* 2. GALLERY SECTION - "Create Memories With Ceylon Trips" */}
      <GallerySection />

      {/* 3. INTRODUCTION / WELCOME SECTION */}
      <section className="py-24 bg-white relative">
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
                  <div className="pt-4 flex flex-col items-start translate-x-[-10px]">
                    <span className="font-heading font-black text-3xl md:text-5xl text-gray-900 uppercase tracking-tight leading-[1.1] md:leading-[0.9] mb-6 block whitespace-nowrap">
                      &ldquo;Discover Tales of Ceylon&rdquo;
                    </span>

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
                    className="group inline-flex items-center gap-6 text-[12px] md:text-sm font-art capitalize tracking-widest bg-black text-white px-12 py-6 rounded-none hover:bg-secondary hover:text-primary transition-all shadow-2xl"
                  >
                    Discover Our Story
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Image Section - Maximum Size with Top & Bottom Overlap */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-[85%] relative z-30 lg:-mt-64 lg:-mb-64 lg:-mr-64 xl:-mr-80"
            >
              <div className="relative">
                <Image
                  src="/images/about-srilanka.png"
                  alt="Beautiful Sri Lanka"
                  width={2000}
                  height={2400}
                  className="w-full h-auto scale-125 transition-transform duration-1000 group-hover:scale-135 "
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. SIGNATURE DESTINATIONS - Luxury Nusa Style */}
      <section className="py-32 bg-[#FDFBF7] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-16">

          <div className="flex flex-col items-center text-center mb-16 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-5xl md:text-6xl font-heading font-black text-black uppercase tracking-tight">Signature Destinations <br /><span className="text-gray-400 italic font-serif lowercase tracking-normal">of Sri Lanka</span></h2>
              <p className="text-secondary font-bold text-xs uppercase tracking-[0.4em]">Where heritage, nature, and luxury meet.</p>
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

          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 auto-rows-[250px]">

            {/* Left Stack */}
            <div className="md:col-span-3 grid grid-rows-2 gap-2 row-span-2">
              {paginatedDestinations.slice(0, 2).map((dest, i) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative group rounded-none overflow-hidden"
                >
                  <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 h-9 w-9 rounded-full bg-white flex items-center justify-center text-[9px] font-black text-black">{dest.rating}</div>
                  <div className="absolute bottom-6 left-6 text-white pr-4">
                    <span className="text-xl font-black block leading-none mb-1">SL</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest block">{dest.name}</span>
                  </div>
                </motion.div>
              ))}
              {/* Fallback empty cards if data < 2 */}
              {paginatedDestinations.length < 1 && <div className="bg-gray-50 border border-dashed border-gray-200" />}
            </div>

            {/* Middle Pillar */}
            <div className="md:col-span-3 row-span-2">
              {paginatedDestinations[2] ? (
                <motion.div
                  key={paginatedDestinations[2].id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative group rounded-none overflow-hidden h-full"
                >
                  <Image src={paginatedDestinations[2].image} alt={paginatedDestinations[2].name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute top-6 left-6 h-10 w-10 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-black">{paginatedDestinations[2].rating}</div>
                  <div className="absolute bottom-10 left-10 text-white pr-6">
                    <span className="text-4xl font-black block leading-none mb-2">SL</span>
                    <span className="text-xs font-bold uppercase tracking-widest block">{paginatedDestinations[2].name}</span>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full bg-gray-50 border border-dashed border-gray-200" />
              )}
            </div>

            {/* Right Group */}
            <div className="md:col-span-6 grid grid-rows-2 gap-2 row-span-2">
              {paginatedDestinations[3] ? (
                <motion.div
                  key={paginatedDestinations[3].id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative group rounded-none overflow-hidden"
                >
                  <Image src={paginatedDestinations[3].image} alt={paginatedDestinations[3].name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 h-9 w-9 rounded-full bg-white flex items-center justify-center text-[9px] font-black text-black">{paginatedDestinations[3].rating}</div>
                  <div className="absolute bottom-6 left-6 text-white flex flex-col">
                    <span className="text-2xl font-black block leading-none mb-1">SL</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest">{paginatedDestinations[3].name}</span>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-gray-50 border border-dashed border-gray-200" />
              )}

              <div className="grid grid-cols-2 gap-2">
                {paginatedDestinations.slice(4, 6).map((dest, i) => (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="relative group rounded-none overflow-hidden"
                  >
                    <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 h-8 w-8 rounded-full bg-white flex items-center justify-center text-[8px] font-black text-black">{dest.rating}</div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-sm font-black block leading-none mb-1">SL</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest block">{dest.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Professional Pagination - Light Style */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-3 rounded-none bg-white border border-gray-200 text-gray-500 font-bold text-[10px] uppercase tracking-widest hover:bg-gray-50 disabled:opacity-30 transition-all"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-12 h-12 rounded-none flex items-center justify-center font-bold text-xs transition-all border ${currentPage === num
                  ? 'bg-black text-white border-black shadow-lg scale-110 z-10'
                  : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
                  }`}
              >
                {num}
              </button>
            ))}
            {totalPages > 6 && <div className="w-12 h-12 flex items-center justify-center text-gray-400 text-xs">...</div>}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-6 py-3 rounded-none bg-white border border-gray-200 text-gray-500 font-bold text-[10px] uppercase tracking-widest hover:bg-gray-50 disabled:opacity-30 transition-all"
            >
              Next
            </button>
          </div>

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


      {/* 6. EXPERIENCES */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <span className="text-secondary font-bold uppercase tracking-widest text-sm block">Feel the Energy</span>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-primary uppercase">Curated <span className="text-secondary italic font-serif lowercase tracking-normal">Experiences</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
              Go beyond the ordinary with our unique activities designed to immerse you in local life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.slice(0, 3).map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-[#FDFBF7] rounded-[2.5rem] overflow-hidden border border-sand hover:bg-white hover:shadow-2xl transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image src={exp.image} alt={exp.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {exp.category}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold font-heading text-primary mb-3">{exp.title}</h3>
                  <p className="text-gray-500 text-sm font-light mb-6 line-clamp-2">{exp.description}</p>
                  <Link href="/experiences" className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-2 group-hover:gap-4 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/experiences">
              <Button variant="outline" className="rounded-full border-primary text-primary px-12 py-7 text-lg hover:bg-primary hover:text-white transition-all">
                View All Experiences
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE CEYLON TRIPS SECTION (Focus on Brand Value) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm block mb-2">The Ceylon Trips Difference</span>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-secondary uppercase">Why Choose <span className="text-primary italic font-serif lowercase tracking-normal">Ceylon Trips?</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: <Landmark className="w-8 h-8" />,
                title: "Local Expertise",
                desc: "Deep-rooted knowledge of hidden gems and authentic cultural connections across the island."
              },
              {
                icon: <Navigation className="w-8 h-8" />,
                title: "Private Chauffeur Guides",
                desc: "Travel in comfort with our certified, multi-lingual guides who double as your private drivers."
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Custom Itineraries",
                desc: "100% personalized travel plans designed around your pace, interests, and budget requirements."
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Luxury Partnerships",
                desc: "Exclusive access to Sri Lanka's finest boutique villas, heritage hotels, and premium resorts."
              }
            ].map((usp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto bg-sand/20 rounded-3xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-2">
                  {usp.icon}
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">{usp.title}</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">{usp.desc}</p>
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
      <ChatBot />
    </main>
  );
}
