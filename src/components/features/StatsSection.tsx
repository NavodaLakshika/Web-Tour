"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInView, motion, useSpring, useTransform } from "framer-motion";

const StatItem = ({ end, label, suffix = "" }: { end: number, label: string, suffix?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const spring = useSpring(0, { stiffness: 50, damping: 20 });
    const rounded = useTransform(spring, (latest) => Math.round(latest));
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            spring.set(end);
        }
    }, [isInView, spring, end]);

    useEffect(() => {
        const unsubscribe = rounded.on("change", (v) => {
            setDisplayValue(v);
        });
        return () => unsubscribe();
    }, [rounded]);

    return (
        <div ref={ref} className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-primary/10">
            <span className="text-5xl md:text-6xl font-bold font-heading text-primary mb-2">
                {displayValue}{suffix}
            </span>
            <span className="text-gray-600 font-medium text-lg uppercase tracking-wide">{label}</span>
        </div>
    );
};

export const StatsSection = () => {
    return (
        <section className="py-20 -mt-20 relative z-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatItem end={25000} label="Happy Travelers" suffix="+" />
                    <StatItem end={150} label="Destinations" suffix="+" />
                    <StatItem end={15} label="Years Experience" suffix="+" />
                </div>
            </div>
        </section>
    );
};
