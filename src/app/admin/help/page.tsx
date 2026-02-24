"use client";

import React from "react";
import {
    HelpCircle,
    Book,
    FileText,
    Settings,
    Shield,
    Database,
    Mail,
    ChevronRight,
    Search,
    Info,
    AlertCircle,
    CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";

const supportCategories = [
    {
        title: "Platform Overview",
        description: "General workflows, portal navigation, and core registry management concepts.",
        icon: Info,
        color: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        title: "Content Management",
        description: "Guides on creating destinations, experiences, and managing high-res media.",
        icon: FileText,
        color: "text-accent",
        bg: "bg-orange-50"
    },
    {
        title: "System Integration",
        description: "Configuring Supabase, database syncing, and real-time alert systems.",
        icon: Database,
        color: "text-green-500",
        bg: "bg-green-50"
    },
    {
        title: "Security & Standards",
        description: "Heritage standards, portal visibility, and administrative access controls.",
        icon: Shield,
        color: "text-red-500",
        bg: "bg-red-50"
    }
];

const faqs = [
    {
        q: "How do I update the portal accent color?",
        a: "Navigate to 'Portal Settings' in the sidebar. You can choose from presets or enter a custom hex code to align with seasonal branding."
    },
    {
        q: "Where do uploaded images go?",
        a: "Images are securely stored in the Supabase 'media' bucket. The registry automatically generates a public URL for use across the website."
    },
    {
        q: "Can I undo a 'Delete Site' operation?",
        a: "No, deletions are permanent. We recommend using the 'Archived Sites' feature instead if you want to temporarily hide content."
    },
    {
        q: "How often does analytics data refresh?",
        a: "The Overview Portal uses real-time sync with Supabase. Changes are visible instantly as transmissions are received."
    }
];

export default function RegistryHelp() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-primary tracking-tight uppercase">Registry <span className="text-accent underline decoration-primary/10 underline-offset-[12px]">Help Center</span></h1>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="bg-primary/5 px-3 py-1.5 rounded-[8px] border border-primary/5 flex items-center gap-2">
                            <Book size={14} className="text-accent" />
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Internal Documentation</span>
                        </div>
                        <p className="text-primary/40 font-bold text-xs uppercase tracking-wider">Version 2.4.0-Registry</p>
                    </div>
                </div>
            </div>

            {/* Quick Search */}
            <div className="relative group max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-accent transition-colors" size={20} />
                <input
                    type="text"
                    placeholder="Search manuals, guides, or system logs..."
                    className="w-full bg-white border border-primary/5 rounded-[8px] pl-12 pr-6 py-5 text-sm font-medium outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/30 transition-all shadow-md"
                />
            </div>

            {/* Support Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {supportCategories.map((cat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-[8px] border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                    >
                        <div className={`w-12 h-12 ${cat.bg} ${cat.color} rounded-[8px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <cat.icon size={24} />
                        </div>
                        <h4 className="text-sm font-bold text-primary uppercase tracking-tight mb-2">{cat.title}</h4>
                        <p className="text-xs text-primary/40 leading-relaxed font-medium">
                            {cat.description}
                        </p>
                        <button className="mt-6 flex items-center gap-2 text-[10px] font-bold text-accent uppercase tracking-widest hover:gap-3 transition-all">
                            <span>Browse Category</span>
                            <ChevronRight size={12} />
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* FAQ Section */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xs font-bold text-primary/30 uppercase tracking-[0.2em] mb-4">Registry Frequency Asked Questions</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white p-6 rounded-[8px] border border-primary/5 shadow-sm">
                                <h4 className="text-sm font-bold text-primary mb-3 flex items-start gap-3">
                                    <span className="text-accent">Q:</span>
                                    {faq.q}
                                </h4>
                                <p className="text-sm text-primary/60 pl-8 leading-relaxed font-medium">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status & Support Card */}
                <div className="space-y-6">
                    <h3 className="text-xs font-bold text-primary/30 uppercase tracking-[0.2em] mb-4">System Status</h3>
                    <div className="bg-primary text-white p-8 rounded-[8px] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Settings size={120} />
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                <span className="text-xs font-bold uppercase tracking-widest">Heritage Engine Online</span>
                            </div>

                            <div>
                                <h4 className="text-xl font-bold uppercase tracking-tight mb-2">Need Direct Support?</h4>
                                <p className="text-xs text-white/60 leading-relaxed">
                                    Can't find what you're looking for? Contact the System Administrator for high-priority technical issues.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full bg-white text-primary py-3 rounded-[8px] text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/20">
                                    <Mail size={14} />
                                    <span>Open Support Ticket</span>
                                </button>
                                <button className="w-full bg-white/5 border border-white/10 text-white py-3 rounded-[8px] text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                    <AlertCircle size={14} className="text-accent" />
                                    <span>Emergency Protocols</span>
                                </button>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-primary bg-accent/20 flex items-center justify-center text-[10px] font-bold bg-secondary">
                                            A{i}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-[9px] font-bold uppercase text-white/30">3 Support Agents Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Documentation Link */}
                    <div className="bg-accent/10 border border-accent/20 p-6 rounded-[8px] flex items-center justify-between group cursor-pointer hover:bg-accent/20 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-accent rounded-[8px] flex items-center justify-center text-primary shadow-lg shadow-accent/20">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none">Download PDF Manual</h4>
                                <p className="text-[9px] font-bold text-primary/40 uppercase mt-1 tracking-widest">Version FEB-2026.01</p>
                            </div>
                        </div>
                        <ChevronRight className="text-primary/20 group-hover:text-primary transition-colors" size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
}
