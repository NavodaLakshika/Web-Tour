"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (error) setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Demo Login Logic
        setTimeout(() => {
            if (formData.email === "admin@ceylontrips.com" && formData.password === "admin") {
                // Set cookie for authentication
                Cookies.set("isLoggedIn", "true", { expires: 1 }); // Expires in 1 day
                window.location.replace("/admin"); // Redirect to admin
            } else {
                setError("Invalid credentials. Try our demo login.");
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
            {/* 1. BACKGROUND IMAGE */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/nature.jpg"
                    alt="Nature Background"
                    fill
                    className="object-cover scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
            </div>

            {/* 2. BACK BUTTON */}
            <Link href="/" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-white/70 hover:text-white transition-all group">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowLeft size={18} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden md:block">Back to Explore</span>
            </Link>

            {/* 3. LOGIN CARD */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-[420px] px-6"
            >
                <div className="relative bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden pt-16 pb-12 px-10">

                    {/* Header Tab Style */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-white/20 backdrop-blur-md rounded-b-3xl flex items-center justify-center border-x border-b border-white/10">
                        <span className="text-white text-sm font-black uppercase tracking-[0.3em]">Login</span>
                    </div>

                    {/* Logo/Icon */}
                    <div className="flex justify-center mb-10">
                        <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
                            <User className="text-white w-8 h-8" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/20 border border-red-500/30 p-4 rounded-2xl text-center"
                            >
                                <p className="text-white text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                                    {error}
                                </p>
                            </motion.div>
                        )}

                        {/* Email Input */}
                        <div className="space-y-1 relative group">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-1">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/20 pb-4 pt-1 text-white text-sm outline-none focus:border-white transition-all placeholder:text-white/20 font-medium"
                                    placeholder="Enter your email"
                                    required
                                />
                                <Mail className="absolute right-0 top-1 text-white/30 group-focus-within:text-white transition-colors" size={18} />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1 relative group">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/20 pb-4 pt-1 text-white text-sm outline-none focus:border-white transition-all placeholder:text-white/20 font-medium"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-1 text-white/30 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Lock size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div
                                    onClick={() => setRememberMe(!rememberMe)}
                                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${rememberMe ? "bg-white border-white" : "border-white/30 group-hover:border-white"
                                        }`}
                                >
                                    {rememberMe && <CheckCircle2 className="text-black w-3 h-3" />}
                                </div>
                                <span className="text-[10px] font-bold text-white/50 group-hover:text-white transition-colors uppercase tracking-widest">Remember Me</span>
                            </label>
                            <Link href="#" className="text-[10px] font-bold text-white/50 hover:text-white transition-colors uppercase tracking-widest">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            disabled={isLoading}
                            className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.4em] text-xs rounded-2xl hover:bg-secondary transition-all duration-500 shadow-2xl shadow-black/20 overflow-hidden relative group disabled:opacity-50"
                        >
                            <span className="relative z-10">{isLoading ? "Verifying..." : "Login"}</span>
                            <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>

                        <div className="text-center">
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                                Don't have an account?{" "}
                                <Link href="#" className="text-white hover:text-secondary transition-colors underline underline-offset-4 decoration-white/20">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Footer Info */}
                <p className="text-center mt-8 text-white/20 text-[9px] font-black uppercase tracking-[0.5em]">
                    &copy; Tales of Ceylon Trip Management
                </p>
            </motion.div>
        </div>
    );
}
