"use client";

import { motion } from "framer-motion";
import { Landmark, Map as MapIcon, BarChart, Users, AlertCircle, ShieldCheck } from "lucide-react";
import { BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const stateData = [
    { name: 'Maharashtra', score: 85, color: '#10b981' },
    { name: 'Gujarat', score: 78, color: '#10b981' },
    { name: 'Karnataka', score: 72, color: '#0ea5e9' },
    { name: 'Tamil Nadu', score: 68, color: '#0ea5e9' },
    { name: 'Delhi', score: 45, color: '#f59e0b' },
    { name: 'UP', score: 38, color: '#ef4444' },
];

export default function GovernmentDashboard() {
    return (
        <div className="px-8 pb-8 eco-gradient text-white">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-10"
            >
                <h1 className="text-4xl font-bold flex items-center gap-3">
                    <Landmark className="text-sky-500" />
                    National Carbon Intelligence
                </h1>
                <p className="text-gray-400 mt-2">Strategic oversight and net-zero progress tracking at national scale.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <div className="lg:col-span-2 glass-card p-0 overflow-hidden min-h-[400px] flex flex-col">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center">
                        <h3 className="font-bold flex items-center gap-2">
                            <MapIcon className="text-emerald-500" size={18} />
                            Geographic Carbon Heatmap
                        </h3>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-500 rounded text-xs">Low Risk</span>
                            <span className="px-3 py-1 bg-amber-500/20 text-amber-500 rounded text-xs">Moderate</span>
                            <span className="px-3 py-1 bg-red-500/20 text-red-500 rounded text-xs">Critical</span>
                        </div>
                    </div>
                    <div className="flex-1 bg-black/40 relative group cursor-crosshair">
                        {/* Heatmap Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <MapIcon size={120} className="text-gray-600" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-gray-500 font-mono text-sm">Mapbox Component Initializing...</p>
                        </div>

                        {/* Mock Hotspots */}
                        <div className="absolute top-1/4 left-1/3 w-12 h-12 bg-red-500/40 rounded-full animate-ping" />
                        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-amber-500/30 rounded-full" />
                        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-red-500/40 rounded-full animate-ping" />
                    </div>
                </div>

                <div className="glass-card p-6 flex flex-col">
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                        <BarChart className="text-sky-500" size={18} />
                        State Ranking Leaderboard
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {stateData.map((state, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="flex justify-between text-sm">
                                    <span>{state.name}</span>
                                    <span className="font-bold">{state.score}%</span>
                                </div>
                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${state.score}%` }}
                                        className="h-full"
                                        style={{ backgroundColor: state.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-6 w-full py-2 bg-white/5 hover:bg-white/10 rounded font-medium transition-colors">
                        View Regional Details
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: <ShieldCheck className="text-emerald-500" />, label: "ESG Compliance", val: "92%", color: "emerald" },
                    { icon: <AlertCircle className="text-red-500" />, label: "Fraud Alerts", val: "4", color: "red" },
                    { icon: <Users className="text-sky-500" />, label: "Citizen Engagement", val: "1.2M", color: "sky" },
                    { icon: <Landmark className="text-amber-500" />, label: "Tax Revenue (Est.)", val: "₹140Cr", color: "amber" }
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 border-l-4" style={{ borderColor: `var(--${stat.color})` }}>
                        <div className="mb-4">{stat.icon}</div>
                        <div className="text-2xl font-bold">{stat.val}</div>
                        <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
