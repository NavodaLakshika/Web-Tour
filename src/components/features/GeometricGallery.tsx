"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, Globe } from "lucide-react";

const categories = [
    {
        id: "hills",
        title: "HILLS",
        image: "/images/ella.jpg", // Greenery/Tea
        color: "from-green-900/40"
    },
    {
        id: "cultural",
        title: "CULTURAL",
        image: "/images/sigiriya-vibrant.jpg", // Ancient
        color: "from-orange-900/40"
    },
    {
        id: "city",
        title: "CITY TOURS",
        image: "/images/galle.jpg", // Fort/City
        color: "from-blue-900/40"
    },
    {
        id: "wildlife",
        title: "WILDLIFE",
        image: "/images/yala.jpg", // Safari
        color: "from-amber-900/40"
    },
    {
        id: "beach",
        title: "BEACH",
        image: "/images/mirissa-clear.jpg", // Coast
        color: "from-cyan-900/40"
    },
];

export const GeometricGallery = () => {
    return (
        <section className="bg-black text-white py-0 relative overflow-hidden font-sans">

            {/* Main Strip Layout */}
            <div className="flex flex-col md:flex-row h-[800px] w-full">
                {categories.map((cat, index) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="relative flex-1 group min-h-[160px] md:min-h-full border-b md:border-b-0 md:border-r border-black/20 overflow-hidden cursor-pointer"
                    >
                        {/* Background Image */}
                        <Image
                            src={cat.image}
                            alt={cat.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />

                        {/* Gradient Overlay for Text Readability */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-transparent to-black/30 group-hover:opacity-80 transition-opacity`} />

                        {/* Vertical Text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                            {/* Mobile: Horizontal, Desktop: Vertical */}
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest text-white uppercase drop-shadow-lg md:[writing-mode:vertical-rl] md:rotate-180 opacity-90 group-hover:opacity-100 group-hover:tracking-[0.2em] transition-all duration-500">
                                {cat.title}
                            </h2>
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
};
