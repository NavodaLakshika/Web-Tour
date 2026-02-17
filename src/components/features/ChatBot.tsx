"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare, X, Send, Bot, User,
    MoreHorizontal, Minimize2, Sparkles
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
                        className="mb-4 w-64 md:w-72 h-[420px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
                    >
                        {/* Simple Header */}
                        <div className="bg-primary p-5 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm tracking-wide">Ceylon Assistant</h3>
                                    <span className="text-[10px] text-white/60 font-medium">Online now</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/30 scrollbar-hide">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.sender === "user"
                                        ? "bg-primary text-white rounded-tr-none"
                                        : "bg-white text-gray-700 border border-gray-100 shadow-sm rounded-tl-none"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Simple Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Ask me anything..."
                                    className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 py-2"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim()}
                                    className="p-2 text-primary hover:text-primary-dark disabled:opacity-30 transition-all"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Simple Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-primary rounded-full shadow-xl flex items-center justify-center text-white relative"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
                {!isOpen && (
                    <span className="absolute top-0 right-0 h-4 w-4 bg-secondary border-2 border-white rounded-full"></span>
                )}
            </motion.button>
        </div>
    );
};
