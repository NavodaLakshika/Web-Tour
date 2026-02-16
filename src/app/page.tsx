import { Hero } from "@/components/shared/Hero";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { StatsSection } from "@/components/features/StatsSection";
import { DestinationCard } from "@/components/features/DestinationCard";
import { destinations, experiences } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Instagram } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-sand/10">
      <Navbar />
      <Hero />
      <StatsSection />

      {/* Featured Destinations */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">CULTURE & NATURE</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary">Popular Destinations</h2>
          </div>
          <Link href="/destinations" className="hidden md:block">
            <Button variant="outline" className="rounded-full gap-2 px-6">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.slice(0, 3).map((dest) => (
            <DestinationCard key={dest.id} {...dest} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/destinations">
            <Button variant="outline" className="rounded-full w-full py-6 text-lg">
              View All Destinations
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Sri Lanka */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] rounded-3xl overflow-hidden group shadow-2xl">
            <Image
              src="/images/sigiriya.jpg"
              alt="Reason to visit"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="space-y-8">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">WHY VISIT</span>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-secondary text-gradient leading-tight">
                Experience the <br /> Wonder of Asia
              </h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              From golden sandy beaches to mist-covered mountains, Sri Lanka offers a diverse landscape packed into a small island. Discover ancient ruins, witness majestic elephants in the wild, and experience the warmth of our hospitality in a journey that will stay with you forever.
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-4">
              {/* Features */}
              {['Pristine Beaches', 'Ancient Heritage', 'Wildlife Safari', 'Scenic Trains', 'Spicy Cuisine', 'Warm Hospitality'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="font-heading font-semibold text-secondary text-lg">{item}</span>
                </div>
              ))}
            </div>
            <Link href="/plan" className="inline-block mt-4">
              <Button size="lg" className="rounded-full px-10 py-6 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">Start Planning</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cultural Highlights (Experiences) */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <span className="text-sand font-bold uppercase tracking-widest text-sm block">UNFORGETTABLE MOMENTS</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">Curated Experiences</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Go beyond the ordinary with our hand-picked collection of unique activities and tours designed to immerse you in the local culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group cursor-pointer hover:border-white/20 hover:shadow-2xl">
                <div className="relative h-56 w-full rounded-xl overflow-hidden mb-6 shadow-md">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <span className="text-sand text-xs font-bold uppercase tracking-wider mb-2 block">{exp.category}</span>
                <h3 className="text-2xl font-bold font-heading mb-3 group-hover:text-primary-300 transition-colors">{exp.title}</h3>
                <p className="text-gray-300 text-sm mb-6 line-clamp-2 leading-relaxed">{exp.description}</p>
                <div className="flex justify-between items-center py-4 border-t border-white/10 mt-auto">
                  <span className="font-bold text-xl text-sand">{exp.price}</span>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                    {exp.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/experiences">
              <Button variant="glass" className="rounded-full px-8 border-white/30 hover:bg-white hover:text-secondary">View All Experiences</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials (Simple Slider Placeholder) */}
      <section className="py-24 bg-sand/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-12">Traveler Stories</h2>
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl relative">
            <div className="text-4xl text-primary absolute top-6 left-8 opacity-20">"</div>
            <p className="text-xl md:text-2xl text-gray-700 italic mb-6 leading-relaxed font-light">
              "Sri Lanka was absolutely magical! From the elephant safari in Yala to the sunset in Mirissa, every moment was picture perfect. The people are so warm and welcoming."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-12 w-12 rounded-full run bg-gray-200 overflow-hidden relative">
                {/* Placeholder avatar */}
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center text-primary font-bold">JD</div>
              </div>
              <div className="text-left">
                <div className="font-bold text-secondary">Jane Doe</div>
                <div className="text-sm text-gray-500">United Kingdom</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Integration Mockup */}
      <section className="py-24 container mx-auto px-4 text-center">
        <div className="flex flex-col items-center mb-12">
          <Instagram className="h-10 w-10 text-primary mb-4" />
          <h2 className="text-3xl font-heading font-bold text-secondary mb-2">@CeylonTrips</h2>
          <p className="text-gray-600 text-lg">Follow our journey and tag us in your memories #VisitSriLanka</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all">
              <Image
                src={`/images/${['sigiriya', 'ella', 'galle', 'yala'][i - 1]}.jpg`}
                alt="Instagram post"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <Instagram className="text-white h-8 w-8 scale-0 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
