"use client";

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
  Newspaper, Navigation, Landmark
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-primary selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION (Kept as requested) */}
      <Hero />

      {/* 2. GALLERY SECTION - "Create Memories With Ceylon Trips" */}
      <GallerySection />

      {/* 3. INTRODUCTION / WELCOME SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-secondary font-art text-3xl tracking-normal block mb-2 capitalize">Welcome to Paradise</span>
            <h2 className="text-4xl md:text-6xl font-heading font-black text-primary leading-tight uppercase">
              Discover the Soul of <br /> <span className="text-secondary font-art lowercase tracking-normal text-5xl md:text-7xl">Sri Lanka</span>
            </h2>
            <p className="text-gray-600 text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto italic opacity-90">
              "Sri Lanka is an island of endless diversity. From the emerald tea plantations of the central highlands to the sapphire waters of the southern coast, every corner tells a story of ancient kings, vibrant culture, and breathtaking nature."
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <div className="w-12 h-1 bg-secondary rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. ABOUT SECTION (Refined in ProjectShowcase) */}
      <ProjectShowcase />

      {/* 5. FEATURED DESTINATIONS */}
      <section className="py-24 bg-[#FDFBF7]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Our Top Destinations</span>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-secondary uppercase">Explore the <span className="text-primary-700">Must-Sees</span></h2>
            </div>
            <Link href="/destinations">
              <Button className="rounded-full bg-primary hover:bg-primary-dark text-white px-10 py-6 mb-2">
                View All Destinations
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {destinations.slice(0, 3).map((dest, idx) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <DestinationCard {...dest} />
              </motion.div>
            ))}
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

      {/* 7. WHY VISIT SRI LANKA SECTION (Keep 4 icons as requested) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm block mb-2">The Wonder of Asia</span>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-secondary uppercase">Why Choose <span className="text-primary italic font-serif lowercase tracking-normal">Sri Lanka?</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: <Landmark className="w-8 h-8" />,
                title: "Rich Heritage",
                desc: "8 UNESCO World Heritage sites including ancient kingdoms and colonial forts."
              },
              {
                icon: <Palmtree className="w-8 h-8" />,
                title: "Breathtaking Nature",
                desc: "From golden beaches and misty mountains to dense tropical jungles."
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Wildlife Safaris",
                desc: "One of the best places in the world to see leopards, elephants, and blue whales."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Warm Hospitality",
                desc: "Experience the genuine smiles and legendary warmth of the Sri Lankan people."
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

      {/* 9. CALL TO ACTION SECTION (Strong CTA) */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/sigiriya-vibrant.jpg" fill alt="CTA BG" className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-8 uppercase leading-tight">
            Ready to Start Your <br />
            <span className="text-sand font-art lowercase tracking-normal text-5xl md:text-8xl">Ceylon Adventure?</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-light italic">
            "Our experts are ready to curate the perfect journey tailored specifically to your dreams."
          </p>
          <Link href="/contact">
            <Button className="rounded-full bg-sand hover:bg-white text-primary font-bold px-12 py-8 text-xl shadow-2xl transition-all hover:scale-105">
              Contact Us Today <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>



      {/* 10. LATEST UPDATES / BLOG SECTION (Condensed to 2 posts) */}
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

      {/* 11. FOOTER */}
      <Footer />
      <ChatBot />
    </main>
  );
}
