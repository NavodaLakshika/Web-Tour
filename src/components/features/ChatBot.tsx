"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    MessageSquare, X, Send, Bot, User,
    Sparkles
} from "lucide-react";

import { destinations, experiences } from "@/lib/data";

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
            text: "Ayubowan! I'm your Ceylon Guide. I can tell you about our beautiful destinations, the best time to visit, or help you plan your adventure. What's on your mind?",
            sender: "bot"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();

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

    if (!isMounted || pathname?.startsWith('/admin')) return null;

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

        // 1. Check for specific destinations
        const matchedDest = destinations.find(d =>
            input.includes(d.name.toLowerCase()) ||
            input.includes(d.slug.toLowerCase())
        );

        if (matchedDest) {
            if (input.includes("attraction") || input.includes("visit") || input.includes("see") || input.includes("do") || input.includes("more")) {
                const attractionsList = matchedDest.attractions?.join(", ");
                return attractionsList
                    ? `In ${matchedDest.name}, you should definitely see: ${attractionsList}. ${matchedDest.description} The best time to visit is ${matchedDest.bestTime}.`
                    : `${matchedDest.name} has so many beautiful spots! ${matchedDest.description} The best time to visit is ${matchedDest.bestTime}.`;
            }
            return `${matchedDest.name} is a fantastic choice! It's located in the ${matchedDest.region} and is famous for ${matchedDest.interest.toLowerCase()}. ${matchedDest.description} Would you like to know about the top attractions there?`;
        }

        // 2. Check for specific experiences
        const matchedExp = experiences.find(e =>
            input.includes(e.title.toLowerCase()) ||
            input.includes(e.category.toLowerCase())
        );
        if (matchedExp) {
            return `The ${matchedExp.title} is a must-do! It takes about ${matchedExp.duration} and is best enjoyed during ${matchedExp.bestTime}. ${matchedExp.description} It's currently priced around ${matchedExp.price}.`;
        }

        // 3. Transportation & Getting Around
        if (input.includes("train") || input.includes("railway") || input.includes("ticket")) {
            return "Sri Lanka has one of the world's most scenic rail networks! The Kandy-to-Ella route is iconic. You can book reserved seats in advance or take the local 2nd/3rd class for an authentic experience. Pro tip: Sit on the right side from Kandy to Ella for the best views!";
        }
        if (input.includes("tuk") || input.includes("taxi") || input.includes("uber") || input.includes("pickme") || input.includes("drive")) {
            return "Tuk-tuks are everywhere! For fair pricing, use 'PickMe' or 'Uber' apps in cities. For longer distances, hiring a private driver is common and convenient. Just remember, we drive on the left side of the road!";
        }

        // 4. Cultural Etiquette & Dress Code
        if (input.includes("dress") || input.includes("clothes") || input.includes("wear") || input.includes("temple") || input.includes("etiquette")) {
            return "When visiting temples or sacred sites, please dress modestly. Shoulders and knees must be covered. It's best to wear white or light colors as a sign of respect. You'll also need to remove your shoes and hats before entering.";
        }

        // 5. Festivals & Events
        if (input.includes("festival") || input.includes("event") || input.includes("celebrate") || input.includes("perahera") || input.includes("vesak")) {
            return "Our festivals are vibrant! The 'Kandy Esala Perahera' (July/August) is a world-class spectacle with dancer and elephants. 'Vesak' (May) turns the island into a sea of lanterns. The Sinhala & Tamil New Year (April) is full of traditional games and sweets.";
        }

        // 6. Hidden Gems & Off-path
        if (input.includes("hidden") || input.includes("secret") || input.includes("crowd") || input.includes("off the beaten")) {
            return "Looking to escape the crowds? Check out the Knuckles Mountain Range for trekking, Mannar Island for its baobab trees and flamingos, or the Jaffna Peninsula for its unique Northern culture and limestone wells.";
        }

        // 7. Safety & Practicalities
        if (input.includes("safe") || input.includes("emergency") || input.includes("police") || input.includes("hospital")) {
            return "Sri Lanka is generally very safe for tourists. In case of emergency, dial 119 for Police or 1990 for Ambulance service. There is also a dedicated Tourist Police (011-2421052). Avoid drinking tap water—stick to bottled mineral water!";
        }
        if (input.includes("sim") || input.includes("internet") || input.includes("wifi") || input.includes("data")) {
            return "You can get a tourist SIM card right at the Colombo Airport (Dialog and Mobitel are the best). Data is very affordable, and coverage is surprisingly good even in the mountains!";
        }

        // 8. Category based responses (Original refined)
        if (input.includes("beach") || input.includes("coast") || input.includes("sea")) {
            return "Our coastlines are diverse! Arugam Bay for surfing, Mirissa for whale watching, Unawatuna for swimming, and Trincomalee for pure white sands. If you like it quiet, try Hiriketiya or Tangalle.";
        }
        if (input.includes("wildlife") || input.includes("animal") || input.includes("safari") || input.includes("elephant")) {
            return "Sri Lanka is a wildlife 'Hotspot'. Yala for Leopards, Minneriya for the Elephant Gathering, and Kumana for birds. Always choose eco-friendly safari operators who respect the animals' space!";
        }

        // 9. Practical Information (Original refined)
        if (input.includes("best time") || input.includes("weather") || input.includes("rain") || input.includes("monsoon")) {
            return "We have two monsoons! West/South Coast is best from Dec to April. East Coast is dry and sunny from May to September. The Hill Country can be chilly, so bring a light sweater!";
        }
        if (input.includes("food") || input.includes("eat") || input.includes("curry")) {
            return "Food is our passion! Try 'Pol Sambol', 'Egg Hoppers', and 'Kottu Roti'. If you're near the coast, the fresh seafood is world-class. Don't forget to wash it down with a King Coconut (Thambili)!";
        }

        // 10. Contact Information
        if (input.includes("contact") || input.includes("expert") || input.includes("agent") || input.includes("call") || input.includes("email") || input.includes("help")) {
            return "Our island experts are ready to help! You can email Navoda at navoda991@gmail.com or call us directly at +94 72 122 0008. We're available 24/7 to help you plan your journey!";
        }

        // 11. General Greeting & Fallback
        if (input.includes("hi") || input.includes("hello") || input.includes("ayubowan")) {
            return "Ayubowan! I'm ready to help. Want to know about transport, local festivals, temple dress codes, or our secret hidden gems?";
        }
        if (input.includes("thanks") || input.includes("thank you")) {
            return "You're very welcome! If you have any more questions about the Pearl of the Indian Ocean, just ask. Stuti (Thank you)!";
        }

        return "I'm still learning the many tales of Ceylon! I can help with specific cities (like Kandy or Sigiriya), transport, safety tips, food, or festivals. What's on your mind?";
    };

    return (
        <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999] font-sans pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 sm:mb-6 w-[calc(100vw-40px)] sm:w-[340px] h-[500px] max-h-[85vh] bg-white rounded-[2rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-gray-100 relative pointer-events-auto"
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
                    className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1B362D] rounded-2xl shadow-[0_15px_30px_rgba(27,54,45,0.4)] flex items-center justify-center text-white relative pointer-events-auto border-2 border-white/40 active:scale-95 transition-all"
                >
                    <Bot className="w-7 h-7 sm:w-8 sm:h-8" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse" />
                </motion.button>
            )}
        </div>
    );
};
