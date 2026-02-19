"use client";

import { motion } from "framer-motion";
import { Coins, ArrowUpRight, ArrowDownLeft, ShieldCheck, History, TrendingUp } from "lucide-react";

const marketplaceItems = [
    { type: 'Earn', action: 'EV Usage', credits: '+45.0', date: 'Today', status: 'Verified' },
    { type: 'Earn', action: 'Solar Installation', credits: '+120.0', date: '2 days ago', status: 'Pending' },
    { type: 'Trade', action: 'Sold to Tata Steel', credits: '-50.0', price: '₹7,500', date: 'Yesterday', status: 'Completed' },
    { type: 'Earn', action: 'Energy Reduction', credits: '+12.5', date: 'Weekly', status: 'Verified' },
];

export default function CarbonMarketplace() {
    return (
        <div className="px-8 pb-8 eco-gradient text-white">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold flex items-center gap-3">
                        <Coins className="text-amber-500" />
                        Carbon Credit Marketplace
                    </h1>
                    <p className="text-gray-400 mt-2">Earn credits for green actions and trade them on the national exchange.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="glass-card p-8 bg-gradient-to-br from-amber-500/10 to-transparent">
                        <p className="text-sm text-amber-500 font-bold uppercase tracking-widest mb-2">Available Balance</p>
                        <div className="text-5xl font-black flex items-end gap-2">
                            248.5
                            <span className="text-lg text-gray-500 font-normal mb-2">tCO2e</span>
                        </div>
                        <p className="text-gray-400 mt-4">Estimated Value: <span className="text-white font-bold">₹37,275</span></p>
                        <button className="w-full mt-6 btn-secondary bg-amber-600 hover:bg-amber-700 shadow-amber-900/40">
                            List for Sale
                        </button>
                    </div>

                    <div className="lg:col-span-2 glass-card p-8 overflow-hidden relative">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <TrendingUp className="text-emerald-500" />
                            Credit Price Trend (National Exchange)
                        </h3>
                        <div className="h-32 flex items-end gap-2">
                            {[40, 45, 38, 52, 60, 58, 65, 70, 68].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/40 rounded-t-sm transition-colors"
                                />
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs text-gray-500 font-mono">
                            <span>01 FEB</span>
                            <span>15 FEB</span>
                            <span>TODAY</span>
                        </div>
                        <div className="absolute top-8 right-8 text-right">
                            <div className="text-2xl font-bold text-emerald-500">₹150.00</div>
                            <div className="text-xs text-emerald-500/50">per credit</div>
                        </div>
                    </div>
                </div>

                <div className="glass-card overflow-hidden">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                        <h3 className="font-bold flex items-center gap-2">
                            <History size={18} className="text-sky-500" />
                            Transaction Ledger
                        </h3>
                        <span className="text-xs font-mono text-gray-500">Blockchain Verified</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-gray-400 text-sm">
                                    <th className="p-6 font-medium">Action</th>
                                    <th className="p-6 font-medium">Credits</th>
                                    <th className="p-6 font-medium">Values</th>
                                    <th className="p-6 font-medium">Status</th>
                                    <th className="p-6 font-medium">Verification</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marketplaceItems.map((item, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${item.type === 'Earn' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                                    {item.type === 'Earn' ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                                                </div>
                                                <div>
                                                    <p className="font-bold">{item.action}</p>
                                                    <p className="text-xs text-gray-500">{item.date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`p-6 font-mono font-bold ${item.credits.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {item.credits}
                                        </td>
                                        <td className="p-6 text-gray-300">
                                            {item.price || '--'}
                                        </td>
                                        <td className="p-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-500' :
                                                item.status === 'Completed' ? 'bg-sky-500/20 text-sky-500' :
                                                    'bg-amber-500/20 text-amber-500'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <ShieldCheck size={18} className="text-emerald-500/50" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
