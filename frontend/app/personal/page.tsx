"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Zap, Car, Plane, ShoppingBag, Trash2, MessageSquare, Sparkles, Send } from "lucide-react";
import { useState } from "react";

export default function PersonalCalculator() {
    const [activeTab, setActiveTab] = useState("calculator");
    const [emissions, setEmissions] = useState({
        electricity: 0,
        fuel: 0,
        flights: 0,
        shopping: 0
    });

    const totalEmissions =
        emissions.electricity * 0.82 +
        emissions.fuel * 2.31 +
        emissions.flights * 0.15 +
        emissions.shopping * 0.5;

    return (
        <div className="px-8 pb-8 eco-gradient text-white">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold flex items-center gap-3">
                            <User className="text-emerald-500" />
                            Personal footprint
                        </h1>
                        <p className="text-gray-400 mt-2">Track and reduce your daily carbon impact.</p>
                    </div>
                    <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
                        {["calculator", "coach"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full capitalize transition-all ${activeTab === tab ? "bg-emerald-500 font-bold shadow-lg" : "hover:text-emerald-400"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {activeTab === "calculator" ? (
                        <motion.div
                            key="calc"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                        >
                            <div className="space-y-6">
                                {[
                                    { icon: <Zap />, label: "Electricity (kWh)", key: "electricity", color: "text-amber-400" },
                                    { icon: <Car />, label: "Petrol/Diesel (Liters)", key: "fuel", color: "text-sky-400" },
                                    { icon: <Plane />, label: "Flight Hours", key: "flights", color: "text-indigo-400" },
                                    { icon: <ShoppingBag />, label: "Online Shopping (orders)", key: "shopping", color: "text-rose-400" }
                                ].map((input) => (
                                    <div key={input.key} className="glass-card p-6 flex items-center gap-6">
                                        <div className={`${input.color} p-3 bg-white/5 rounded-xl`}>{input.icon}</div>
                                        <div className="flex-1">
                                            <label className="text-sm text-gray-400 block mb-1">{input.label}</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={emissions[input.key as keyof typeof emissions]}
                                                onChange={(e) => setEmissions({ ...emissions, [input.key]: parseFloat(e.target.value) || 0 })}
                                                className="bg-transparent text-2xl font-bold w-full focus:outline-none border-b border-white/10 focus:border-emerald-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col justify-center items-center">
                                <div className="relative w-80 h-80 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="160" cy="160" r="140"
                                            stroke="currentColor" strokeWidth="20"
                                            fill="transparent"
                                            className="text-white/5"
                                        />
                                        <motion.circle
                                            cx="160" cy="160" r="140"
                                            stroke="currentColor" strokeWidth="20"
                                            fill="transparent"
                                            strokeDasharray={2 * Math.PI * 140}
                                            initial={{ strokeDashoffset: 2 * Math.PI * 140 }}
                                            animate={{ strokeDashoffset: 2 * Math.PI * 140 * (1 - Math.min(totalEmissions / 1000, 1)) }}
                                            className="text-emerald-500"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-black">{totalEmissions.toFixed(1)}</span>
                                        <span className="text-gray-400 font-mono text-sm uppercase">kg CO2e</span>
                                    </div>
                                </div>
                                <div className="mt-8 text-center bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl">
                                    <p className="text-emerald-400 font-medium">Your footprint is 15% lower than national average.</p>
                                    <button className="mt-4 px-8 py-3 bg-emerald-500 rounded-full font-bold shadow-xl shadow-emerald-500/20 hover:scale-105 transition-transform">
                                        Save Record
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="glass-card max-w-4xl mx-auto h-[600px] flex flex-col overflow-hidden"
                        >
                            <div className="p-6 border-b border-white/10 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold">AI Carbon Coach</h3>
                                    <p className="text-xs text-emerald-400">Online | Personalized for you</p>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                        <Sparkles size={16} />
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-lg border border-white/10">
                                        Hello! I've analyzed your current footprint of {totalEmissions.toFixed(1)}kg.
                                        I recommend switching to an EV for your commute — it could save you about 1.2 tons of CO2 per year!
                                        How else can I help you today?
                                    </div>
                                </div>

                                <div className="flex gap-4 flex-row-reverse">
                                    <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-500">
                                        <User size={16} />
                                    </div>
                                    <div className="bg-sky-500/20 p-4 rounded-2xl rounded-tr-none max-w-lg border border-sky-500/20">
                                        Is buying an EV better than using CNG for my city?
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-black/20 border-t border-white/10 flex gap-4">
                                <input
                                    placeholder="Ask about solar, EVs, or reduction tips..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                                <button className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <Send size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
