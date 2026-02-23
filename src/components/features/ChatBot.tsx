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
    const [isMounted, setIsMounted] = useState(false);
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

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    if (!isMounted) return null;

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
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[2000] font-sans pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 sm:mb-6 w-[calc(100vw-40px)] sm:w-[380px] h-[550px] max-h-[85vh] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-gray-100 relative pointer-events-auto"
                    >
                        {/* Background Branding */}
                        <div className="absolute inset-0 opacity-[0.5] pointer-events-none z-0">
                            <Image
                                src="/images/lotus-tower.png"
                                alt="Branding"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Glass Header */}
                        <div className="bg-white/60 backdrop-blur-xl p-6 text-[#1B362D] relative z-20 border-b border-gray-100/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-xl bg-[#1B362D] flex items-center justify-center shadow-lg">
                                            <Bot className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-black text-sm uppercase tracking-tight text-[#1B362D]">Ceylon Assistant</h3>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-green-600">Online Now</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-9 h-9 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors text-[#1B362D]"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide relative z-10">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${msg.sender === "user"
                                        ? "bg-[#1B362D] text-white rounded-br-none"
                                        : "bg-gray-50 text-[#1B362D] border border-gray-100 rounded-bl-none font-medium"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1 items-center shadow-sm">
                                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
                                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 sm:p-6 bg-white border-t border-gray-50 relative z-20">
                            <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-1.5 border border-gray-200 focus-within:border-[#1B362D]/30 transition-all">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Ask about your trip..."
                                    className="flex-1 bg-transparent border-none outline-none text-sm text-[#1B362D] py-2 placeholder:text-gray-400"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim()}
                                    className="w-10 h-10 bg-[#1B362D] text-white flex items-center justify-center rounded-xl hover:bg-[#1B362D]/90 disabled:opacity-30 disabled:hover:bg-[#1B362D] transition-all"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AI Toggle Button */}
            {!isOpen && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1B362D] rounded-2xl shadow-[0_15px_30px_rgba(27,54,45,0.4)] flex items-center justify-center text-white relative pointer-events-auto border-2 border-white/20"
                >
                    <Bot className="w-7 h-7 sm:w-8 sm:h-8" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse" />
                </motion.button>
            )}
        </div>
    );
};
