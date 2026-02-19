"use client";

import { motion } from "framer-motion";
import { Factory, AlertTriangle, FileText, TrendingUp, Cpu } from "lucide-react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = [
    { name: 'Jan', emissions: 400 },
    { name: 'Feb', emissions: 300 },
    { name: 'Mar', emissions: 200 },
    { name: 'Apr', emissions: 278 },
    { name: 'May', emissions: 189 },
    { name: 'Jun', emissions: 239 },
    { name: 'Jul', emissions: 349 },
];

export default function IndustrialCompliance() {
    const [isLive, setIsLive] = useState(false);

    return (
        <div className="px-8 pb-8 eco-gradient text-white">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-10"
            >
                <div>
                    <h1 className="text-4xl font-bold flex items-center gap-3">
                        <Factory className="text-emerald-500" />
                        Industrial Compliance
                    </h1>
                    <p className="text-gray-400 mt-2">Manage Scope 1, 2, and 3 emissions for your facility.</p>
                </div>
                <button
                    onClick={() => setIsLive(!isLive)}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${isLive ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-gray-700'
                        }`}
                >
                    <Cpu className={isLive ? 'animate-pulse' : ''} />
                    {isLive ? 'Live Sensor Data: ON' : 'Live Sensor Data: OFF'}
                </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="glass-card p-6">
                    <div className="flex items-center gap-2 text-emerald-400 mb-4">
                        <TrendingUp size={20} />
                        <h3 className="font-bold">Total Emissions</h3>
                    </div>
                    <div className="text-4xl font-extrabold">2,450 <span className="text-sm font-normal text-gray-400">tCO2e</span></div>
                    <p className="text-emerald-500 text-sm mt-2">↓ 12% from last month</p>
                </div>

                <div className="glass-card p-6">
                    <div className="flex items-center gap-2 text-sky-400 mb-4">
                        <FileText size={20} />
                        <h3 className="font-bold">Compliance Score</h3>
                    </div>
                    <div className="text-4xl font-extrabold">A+</div>
                    <p className="text-gray-400 text-sm mt-2">Next Audit: 15 March 2024</p>
                </div>

                <div className="glass-card p-6">
                    <div className="flex items-center gap-2 text-amber-500 mb-4">
                        <AlertTriangle size={20} />
                        <h3 className="font-bold">Active Alerts</h3>
                    </div>
                    <div className="text-4xl font-extrabold text-amber-500">2</div>
                    <p className="text-gray-400 text-sm mt-2">Anomaly detected in Chimney #4</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8">
                    <h3 className="text-xl font-bold mb-6">Emission Trend Analysis</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dummyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="emissions"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    dot={{ r: 6, fill: '#10b981' }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card p-8">
                    <h3 className="text-xl font-bold mb-6">AI Optimization Recommendations</h3>
                    <div className="space-y-4">
                        {[
                            "Upgrade to variable frequency drives on motor #12",
                            "Shift production to off-peak hours (11 PM - 5 AM)",
                            "Install heat recovery system on Boiler A",
                            "Switch to carbon-neutral shipping partners"
                        ].map((rec, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">
                                    {i + 1}
                                </div>
                                <p className="flex-1 text-gray-300">{rec}</p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 btn-secondary">Generate PDF Report</button>
                </div>
            </div>
        </div>
    );
}
