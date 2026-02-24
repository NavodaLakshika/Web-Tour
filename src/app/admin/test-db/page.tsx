"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Database, Server, CheckCircle2, AlertCircle } from "lucide-react";

export default function TestDBPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [data, setData] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    const testConnection = async () => {
        setStatus("loading");
        try {
            const { data: destinations, error } = await supabase
                .from("destinations")
                .select("*")
                .limit(5);

            if (error) throw error;

            setData(destinations || []);
            setStatus("success");
        } catch (err: any) {
            console.error("Connection Error:", err);
            setErrorMessage(err.message || "Failed to connect to Supabase");
            setStatus("error");
        }
    };

    useEffect(() => {
        testConnection();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h1 className="text-3xl font-heading font-black text-primary tracking-tight uppercase">Database <span className="text-accent">Connectivity</span></h1>
                <p className="text-primary/40 font-bold text-[11px] uppercase tracking-widest mt-2">Verifying bridge between Next.js and Supabase</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. Status Card */}
                <div className="bg-white p-8 rounded-[24px] border border-primary/5 shadow-xl shadow-primary/5">
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-[8px] flex items-center justify-center ${status === "success" ? "bg-green-500 text-white" :
                                status === "error" ? "bg-red-500 text-white" : "bg-primary text-accent"
                            }`}>
                            {status === "loading" ? <Server className="animate-bounce" size={24} /> :
                                status === "success" ? <CheckCircle2 size={24} /> :
                                    status === "error" ? <AlertCircle size={24} /> : <Database size={24} />}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em] leading-none mb-1">Current State</p>
                            <h3 className="text-xl font-heading font-black text-primary uppercase">
                                {status === "loading" ? "Probing Server..." :
                                    status === "success" ? "Network Online" :
                                        status === "error" ? "Connection Failed" : "Awaiting Probe"}
                            </h3>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-[#FAF9F6] rounded-[8px] border border-primary/5">
                            <p className="text-[10px] font-black text-primary/20 uppercase tracking-widest mb-1">Bridge URL</p>
                            <p className="text-xs font-bold text-primary truncate">https://aykbufsdffuvvpjioylq.supabase.co</p>
                        </div>

                        {status === "error" && (
                            <div className="p-4 bg-red-50 rounded-[8px] border border-red-100">
                                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Error Diagnostics</p>
                                <p className="text-xs font-bold text-red-600">{errorMessage}</p>
                            </div>
                        )}

                        <button
                            onClick={testConnection}
                            disabled={status === "loading"}
                            className="w-full py-4 bg-primary text-white rounded-[8px] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                        >
                            Reconnect to Portal
                        </button>
                    </div>
                </div>

                {/* 2. Data Preview Card */}
                <div className="bg-white p-8 rounded-[24px] border border-primary/5 shadow-xl shadow-primary/5 overflow-hidden">
                    <div className="mb-6">
                        <p className="text-[10px] font-black text-primary/30 uppercase tracking-[0.2em] leading-none mb-1">Select Result</p>
                        <h3 className="text-xl font-heading font-black text-primary uppercase">Raw Data Feed</h3>
                    </div>

                    <div className="h-[200px] overflow-y-auto scrollbar-hide bg-[#FAF9F6] rounded-[8px] border border-primary/5 p-4 font-mono text-[10px] text-primary/60">
                        {status === "loading" ? (
                            <div className="flex items-center justify-center h-full">Fetching packet details...</div>
                        ) : status === "success" ? (
                            data.length > 0 ? (
                                <pre>{JSON.stringify(data, null, 2)}</pre>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
                                    <AlertCircle className="text-accent" size={24} />
                                    <p>Connection works, but your "destinations" table is empty!</p>
                                    <p className="text-[9px] text-primary/30 uppercase">Run seed.sql in Supabase SQL Editor</p>
                                </div>
                            )
                        ) : (
                            <div className="flex items-center justify-center h-full">No feed available.</div>
                        )}
                    </div>

                    <p className="mt-4 text-[9px] font-black text-primary/20 uppercase tracking-widest text-center">Data is fetched live from Supabase PostgreSQL</p>
                </div>
            </div>
        </div>
    );
}
