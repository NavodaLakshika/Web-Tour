"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { DestinationCard } from "@/components/features/DestinationCard";
import { destinations } from "@/lib/data";
import { Search } from "lucide-react";
import Image from "next/image";

const categories = ["All", "Beaches", "Mountains", "Cultural", "Wildlife", "Cities"];

export default function DestinationsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredDestinations = destinations.filter((dest) => {
        const matchesCategory = activeCategory === "All" || dest.category === activeCategory;
        const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dest.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="min-h-screen bg-sand/10">
            <Navbar />

            {/* Header */}
            <div className="relative h-[50vh] bg-secondary flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/sigiriya.jpg"
                    alt="Destinations Header"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
                <div className="relative z-10 text-center text-white p-4 pt-20">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 drop-shadow-xl">Explore Destinations</h1>
                    <p className="text-xl text-gray-100 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                        Find your perfect getaway in the paradise island. From ancient ruins to golden beaches.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 -mt-20 relative z-20">
                {/* Filters & Search Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${activeCategory === cat
                                            ? "bg-primary text-white border-primary shadow-lg scale-105"
                                            : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-80 flex-shrink-0">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search destinations..."
                                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gray-50 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="flex items-center gap-2 mb-8 text-gray-500 font-medium px-2">
                    Showing <span className="text-primary font-bold">{filteredDestinations.length}</span> destinations
                    {activeCategory !== "All" && <span>in <span className="text-secondary font-bold">{activeCategory}</span></span>}
                </div>

                {/* Grid */}
                {filteredDestinations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDestinations.map((dest) => (
                            <DestinationCard key={dest.id} {...dest} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <Search className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No destinations found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                        <button
                            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                            className="mt-6 text-primary font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
