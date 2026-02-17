"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    MessageSquare, X, Send, Bot, User,
    Sparkles
} from "lucide-react";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
}

export const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Ayubowan! I'm your Ceylon travel assistant. How can I help you today?",
            sender: "bot"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user"
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: getResponse(inputValue),
                sender: "bot"
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const getResponse = (text: string) => {
        const input = text.toLowerCase();
        if (input.includes("hi") || input.includes("hello")) return "Ayubowan! Are you planning a trip to the beaches or the mountains?";
        if (input.includes("beach")) return "The Southern beaches like Mirissa and Unawatuna are beautiful this time of year!";
        if (input.includes("mountain") || input.includes("ella")) return "Ella and Nuwara Eliya offer stunning views and cool climates.";
        return "That sounds interesting! I can help you with more details or connect you with our travel experts.";
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-6 w-[350px] h-[500px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden border border-gray-100 relative"
                    >
                        {/* Full-path Background Branding */}
                        <div className="absolute inset-0 opacity-[0.7] pointer-events-none z-0">
                            <Image
                                src="/images/lotus-tower.png"
                                alt="Full Background"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Premium Glass Header */}
                        <div className="bg-white/20 backdrop-blur-3xl p-6 text-[#1B362D] relative z-20 border-b border-white/20">
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />

                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-2xl bg-white/40 flex items-center justify-center border-2 border-white/60 shadow-lg relative backdrop-blur-sm">
                                            <Bot className="w-6 h-6 text-[#1B362D]" />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-lg tracking-tight leading-tight text-[#1B362D]">Ceylon Guide</h3>
                                        <div className="flex items-center gap-1.5 text-[#1B362D]/80">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                                            <span className="text-[11px] font-bold uppercase tracking-widest font-black">Active Assistant</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-white/40 rounded-2xl transition-all active:scale-95 text-[#1B362D] shadow-sm"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-transparent scrollbar-hide relative z-10">
                            <div className="relative z-10 w-full space-y-5">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                        {msg.sender === "bot" && (
                                            <div className="w-8 h-8 rounded-lg bg-white overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm flex items-center justify-center">
                                                <Sparkles className="w-4 h-4 text-[#1B362D]" />
                                            </div>
                                        )}
                                        <div className={`max-w-[75%] px-5 py-3.5 rounded-3xl text-[13px] leading-relaxed shadow-sm relative overflow-hidden ${msg.sender === "user"
                                            ? "bg-[#1B362D] text-white rounded-br-none"
                                            : "bg-white text-[#1B362D] border border-gray-100 rounded-bl-none font-medium"
                                            }`}>
                                            <span className="relative z-10">{msg.text}</span>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex items-end gap-2 justify-start">
                                        <div className="w-8 h-8 rounded-lg bg-white overflow-hidden flex-shrink-0 border border-gray-100 flex items-center justify-center">
                                            <Sparkles className="w-4 h-4 text-gray-300" />
                                        </div>
                                        <div className="bg-white border border-gray-100 px-5 py-4 rounded-3xl rounded-bl-none flex gap-1.5 items-center shadow-sm">
                                            <div className="w-1.5 h-1.5 bg-[#1B362D]/40 rounded-full animate-bounce" />
                                            <div className="w-1.5 h-1.5 bg-[#1B362D]/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                                            <div className="w-1.5 h-1.5 bg-[#1B362D] rounded-full animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        <div className="p-6 bg-transparent relative z-10">
                            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl px-4 py-2 hover:border-[#1B362D]/30 transition-colors group">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Write a message..."
                                    className="flex-1 bg-transparent border-none outline-none text-sm text-[#1B362D] py-2 placeholder:text-gray-400 font-medium"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim()}
                                    className="w-10 h-10 bg-[#1B362D] text-white flex items-center justify-center rounded-xl hover:bg-[#1B362D]/90 disabled:bg-gray-200 disabled:text-gray-400 transition-all active:scale-90"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Premium Toggle Button */}
            {!isOpen && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="group relative"
                >
                    <div className="relative">
                        <div className="w-16 h-16 bg-[#1B362D] rounded-2xl shadow-2xl flex items-center justify-center text-white relative overflow-hidden">
                            <Bot className="w-8 h-8" />
                        </div>

                        {/* Unread indicator dot */}
                        <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-bounce" />
                    </div>
                </motion.button>
            )}
        </div>
    );
};
