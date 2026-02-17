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

      {/* 2. GALLERY SECTION - "Create Memories With Ceylon Trips" (Kept as requested) */}
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
            <span className="text-secondary font-bold uppercase tracking-[0.3em] text-sm block">Welcome to Paradise</span>
            <h2 className="text-4xl md:text-6xl font-heading font-black text-primary leading-tight uppercase">
              Discover the Soul of <br /> <span className="text-secondary italic font-serif lowercase tracking-normal">Sri Lanka</span>
            </h2>
            <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed">
              Sri Lanka is an island of endless diversity. From the emerald tea plantations of the central highlands to the sapphire waters of the southern coast, every corner tells a story of ancient kings, vibrant culture, and breathtaking nature.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <div className="w-12 h-1 bg-secondary rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. PROJECT SHOWCASE (Kept as requested) */}
      <ProjectShowcase />

      {/* 5. FEATURED DESTINATIONS / REGIONS */}
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

      {/* 6. EXPERIENCES / ACTIVITIES HIGHLIGHTS */}
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

      {/* 7. SUGGESTED ITINERARIES Section */}
      <section className="py-24 bg-secondary text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-sand font-bold uppercase tracking-widest text-sm block">Travel Smarter</span>
              <h2 className="text-4xl md:text-6xl font-heading font-black leading-tight uppercase">Ready-Made <br /> <span className="text-sand italic font-serif lowercase tracking-normal">Itineraries</span></h2>
              <p className="text-white/60 text-lg font-light leading-relaxed">
                Don't know where to start? We've designed three perfect loops to help you see the best of the island, whether you have a weekend or a whole week.
              </p>

              <div className="space-y-6 pt-4">
                {[
                  { days: "3 Days", title: "Cultural Triangle", icon: <Landmark className="w-5 h-5" /> },
                  { days: "7 Days", title: "The Southern Loop", icon: <Compass className="w-5 h-5" /> },
                  { days: "10 Days", title: "The Ultimate Adventure", icon: <Palmtree className="w-5 h-5" /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-sand text-primary flex items-center justify-center font-bold">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-sand/60 block uppercase tracking-widest">{item.days}</span>
                      <h4 className="text-xl font-bold">{item.title}</h4>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5 text-sand" />
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/plan" className="inline-block mt-6">
                <Button className="rounded-full bg-sand hover:bg-sand/90 text-primary font-bold px-10 py-7 text-lg shadow-2xl">
                  Explore Full Plans
                </Button>
              </Link>
            </div>

            <div className="relative h-[650px] rounded-[4rem] overflow-hidden shadow-2xl border border-white/10">
              <Image src="/images/sigiriya-vibrant.jpg" fill alt="Itinerary" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <div className="flex items-center gap-2 text-sand mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Interactive Maps</span>
                </div>
                <h4 className="text-3xl font-heading font-bold uppercase mb-4">Visualize Your Route</h4>
                <div className="h-1.5 w-full bg-white/10 rounded-full">
                  <div className="h-full w-1/3 bg-sand rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY VISIT SRI LANKA / UNIQUE SELLING POINTS */}
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

      {/* 9. TESTIMONIALS (Kept existing section as requested) */}
      <TestimonialSection />

      {/* 10. LATEST UPDATES / BLOG SECTION */}
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
                title: "The Ultimate Guide to Kandy Perahera 2024",
                date: "Aug 12, 2024",
                img: "/images/kandy.jpg",
                tag: "Festival"
              },
              {
                title: "Finding Serenity: Top 5 Silent Beaches in Trincomalee",
                date: "July 28, 2024",
                img: "/images/mirissa-clear.jpg",
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

      {/* 11. QUICK LINKS / NAVIGATION HIGHLIGHTS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-black text-primary uppercase mb-16">Quick <span className="text-secondary italic font-serif lowercase tracking-normal">Navigation</span></h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Plan Trip", path: "/plan", icon: <Calendar className="w-5 h-5" /> },
              { label: "Destinations", path: "/destinations", icon: <MapPin className="w-5 h-5" /> },
              { label: "Experiences", path: "/experiences", icon: <Compass className="w-5 h-5" /> },
              { label: "About Us", path: "/about", icon: <Users className="w-5 h-5" /> },
              { label: "Contact", path: "/contact", icon: <Navigation className="w-5 h-5" /> }
            ].map((link, i) => (
              <Link key={i} href={link.path}>
                <div className="p-8 rounded-[2rem] bg-[#FDFBF7] border border-sand hover:bg-primary hover:text-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                  <div className="mb-4 text-secondary group-hover:text-sand transition-colors flex justify-center">{link.icon}</div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em]">{link.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Lifestyle (Kept existing section as requested) */}
      <GeometricGallery />

      {/* 12. FOOTER (Kept existing section as requested) */}
      <Footer />
      <ChatBot />
    </main>
  );
}
