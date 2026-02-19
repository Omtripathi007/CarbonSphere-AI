"use client";

import { motion } from "framer-motion";
import { Banknote, TrendingDown, CheckCircle, Info, Radio, Zap } from "lucide-react";

export default function GreenLoans() {
    return (
        <div className="px-8 pb-8 eco-gradient text-white">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold flex items-center gap-3">
                        <Banknote className="text-emerald-500" />
                        Green Loan & Subsidy Eligibility
                    </h1>
                    <p className="text-gray-400 mt-2">AI-driven financial incentives for verified carbon reduction performance.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="glass-card p-8">
                            <h3 className="text-2xl font-bold mb-6">Eligibility Status</h3>
                            <div className="flex items-center gap-4 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-6">
                                <CheckCircle className="text-emerald-500" size={40} />
                                <div>
                                    <p className="text-lg font-bold text-emerald-400">Highly Eligible for SBI Green Loan</p>
                                    <p className="text-sm text-gray-400">Based on your 22% reduction in Scope 2 emissions.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">Reduction Performance</span>
                                    <span className="text-emerald-500 font-bold">Excellent</span>
                                </div>
                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-emerald-500" />
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">Data Reliability (IoT Verified)</span>
                                    <span className="text-sky-500 font-bold">100%</span>
                                </div>
                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full bg-sky-500" />
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-8">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Radio className="text-sky-500 animate-pulse" />
                                IoT + Satellite Link
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <p className="text-xs text-gray-400 mb-1 uppercase">Smart Meter</p>
                                    <p className="text-xl font-bold">Connected</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <p className="text-xs text-gray-400 mb-1 uppercase">Sentinel-5P</p>
                                    <p className="text-xl font-bold">Active Synch</p>
                                </div>
                            </div>
                            <p className="mt-6 text-sm text-gray-400 italic">
                                *Your data is cross-verified via satellite pollution mapping to ensure loan compliance.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold">Recommended Financial Products</h3>
                        {[
                            {
                                bank: "State Bank of India",
                                product: "Green Micro-Enterprise Loan",
                                rate: "6.5% p.a.",
                                saving: "2.5% below market",
                                icon: <Zap className="text-amber-500" />
                            },
                            {
                                bank: "HDFC Bank",
                                product: "Solar Infrastructure Grant",
                                rate: "15% Subsidy",
                                saving: "Up to ₹50 Lakhs",
                                icon: <TrendingDown className="text-emerald-500" />
                            }
                        ].map((loan, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                className="glass-card p-6 border-l-4 border-emerald-500 hover:border-sky-500 transition-colors cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white/5 rounded-xl">{loan.icon}</div>
                                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">AI Recommended</span>
                                </div>
                                <h4 className="font-bold text-lg">{loan.product}</h4>
                                <p className="text-sm text-gray-400 mb-4">{loan.bank}</p>
                                <div className="grid grid-cols-2 border-t border-white/10 pt-4">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Effective Rate</p>
                                        <p className="text-lg font-bold text-emerald-400">{loan.rate}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Est. Saving</p>
                                        <p className="text-lg font-bold text-sky-400">{loan.saving}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        <div className="p-6 bg-white/5 border border-dashed border-white/20 rounded-2xl flex items-center gap-4 text-gray-500">
                            <Info size={20} />
                            <p className="text-sm">More offers will unlock as you further reduce Scope 3 emissions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
