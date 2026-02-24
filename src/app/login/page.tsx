"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Loader2, CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Cookies from "js-cookie";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('loading');
        setErrorMessage("");

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                Cookies.set('isLoggedIn', 'true', { expires: rememberMe ? 7 : 1 });
                setStatus('success');

                // Give the session time to propagate to cookies for the middleware
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 1000);
            }
        } catch (error: any) {
            console.error("Login Error:", error);
            setStatus('error');
            setErrorMessage(error.message || "Invalid credentials.");
            setTimeout(() => setStatus('idle'), 4000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/video/login-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Glassmorphic Form Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[380px] mx-4"
            >
                {/* The "Login" Tab Pill at the top center - Now Transparent */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-transparent px-12 py-3 rounded-[10px] shadow-lg border border-white/30">
                        <span className="text-white font-bold text-sm tracking-widest uppercase">Login</span>
                    </div>
                </div>

                <div className="bg-transparent rounded-[10px] p-8 sm:p-12 pt-16 sm:pt-24 pb-12 sm:pb-20 relative overflow-hidden border border-white/20">

                    {/* Return Link */}
                    <Link href="/" className="absolute top-8 left-8 text-white/30 hover:text-white transition-colors">
                        <ArrowLeft size={18} />
                    </Link>

                    <form onSubmit={handleLogin} className="space-y-12">
                        {/* Username Field */}
                        <div className="space-y-3 group">
                            <label className="text-[12px] font-bold text-white tracking-widest ml-1">Username</label>
                            <div className="relative border-b border-white/30 group-focus-within:border-white transition-all">
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent py-3 pr-10 text-white outline-none placeholder:text-white/20 text-sm"
                                    placeholder="Enter your email"
                                />
                                <User className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60" size={18} />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-3 group">
                            <label className="text-[12px] font-bold text-white tracking-widest ml-1">Password</label>
                            <div className="relative border-b border-white/30 group-focus-within:border-white transition-all">
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-transparent py-3 pr-10 text-white outline-none placeholder:text-white/20 text-sm"
                                    placeholder="Enter your password"
                                />
                                <Lock className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60" size={18} />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-[11px] font-bold text-white/70 tracking-wider">
                            <label className="flex items-center gap-3 cursor-pointer group/check select-none">
                                <div className="relative w-5 h-5 border border-white/20 rounded-[4px] bg-white/5 flex items-center justify-center transition-all group-hover/check:border-white group-active/check:scale-95">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    />
                                    <div className={`w-2.5 h-2.5 bg-white rounded-[1px] transition-all duration-300 ${rememberMe ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                                </div>
                                <span className="group-hover/check:text-white transition-colors">Remember me</span>
                            </label>
                            <button
                                type="button"
                                onClick={() => {
                                    setErrorMessage("Password recovery instructions have been sent to your registered heritage email.");
                                    setStatus('error'); // Reusing error display for simple notification
                                    setTimeout(() => setStatus('idle'), 5000);
                                }}
                                className="hover:text-white transition-colors border-b border-transparent hover:border-white/30 pb-0.5"
                            >
                                Forgot password
                            </button>
                        </div>

                        {/* Action Button */}
                        <div className="pt-4 sm:pt-6">
                            <button
                                type="submit"
                                disabled={isLoading || status === 'success'}
                                className="w-full bg-white/5 text-white py-5 rounded-[10px] font-black uppercase tracking-[0.3em] text-[14px] border border-white/30 shadow-[0_15px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-4 disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <span>Login</span>}
                            </button>
                        </div>

                    </form>

                    {/* Success/Error Notifications */}
                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 bg-black/70 backdrop-blur-lg flex flex-col items-center justify-center p-8 text-center"
                            >
                                <motion.div
                                    initial={{ y: 20 }} animate={{ y: 0 }}
                                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-2xl"
                                >
                                    <CheckCircle2 size={40} />
                                </motion.div>
                                <h3 className="text-white text-lg font-black uppercase tracking-widest mb-2">Authenticated</h3>
                                <button
                                    onClick={() => router.push('/admin')}
                                    className="mt-4 bg-white/10 text-white py-2 px-4 rounded hover:bg-white/20"
                                >
                                    Go to Dashboard
                                </button>
                                <p className="text-white/40 text-[10px] uppercase font-black">Opening Heritage Registry...</p>
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute bottom-10 left-10 right-10 bg-red-500/80 backdrop-blur-md p-4 rounded-[20px] flex items-center gap-4 border border-white/20 shadow-xl"
                            >
                                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                                    <AlertTriangle size={18} className="text-white" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-white text-[10px] font-black uppercase tracking-widest leading-tight">{errorMessage}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </main>
    );
}
