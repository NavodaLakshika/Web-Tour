"use client";
import React from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";

export default function PlanPage() {
    return (
        <main className="min-h-screen bg-sand/10">
            <Navbar />
            <div className="pt-32 container mx-auto px-4 pb-20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-secondary">Plan Your Dream Trip</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">Tell us your preferences and let our travel experts craft a personalized itinerary just for you.</p>
                </div>

                <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent" />

                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Full Name</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
                                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="john@example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Destination Interest</label>
                            <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-600">
                                <option>Where would you like to go?</option>
                                <option>Sigiriya & Cultural Triangle</option>
                                <option>Ella & Hill Country</option>
                                <option>Southern Coast & Beaches</option>
                                <option>Wildlife Parks</option>
                                <option>All of the above (Round Tour)</option>
                                <option>Not sure, surprise me!</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Tentative Date</label>
                                <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-600" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Duration (Days)</label>
                                <input type="number" min="1" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="7" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Message / Special Requests</label>
                            <textarea rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="Tell us more about your travel style, budget, or any specific requirements..."></textarea>
                        </div>

                        <div className="pt-4">
                            <Button size="lg" className="w-full py-6 text-lg rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">Submit Trip Request</Button>
                            <p className="text-center text-xs text-gray-400 mt-4">We'll get back to you within 24 hours with a custom itinerary.</p>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
}
