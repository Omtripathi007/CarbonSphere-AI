"use client";

import { motion } from "framer-motion";
import { Leaf, Mail, Lock, User, Briefcase, GraduationCap, Shield } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState("citizen");

    return (
        <div className="min-h-screen eco-gradient flex items-center justify-center p-6 text-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card w-full max-w-md p-8 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Leaf size={120} />
                </div>

                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-500/20">
                            <Leaf size={32} />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold">CarbonSphere AI</h1>
                    <p className="text-gray-400 mt-2">
                        {isLogin ? "Welcome back to the net-zero future." : "Join the national carbon movement."}
                    </p>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                    </div>

                    {!isLogin && (
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { id: "citizen", label: "Citizen", icon: <User size={16} /> },
                                { id: "company", label: "Industry", icon: <Briefcase size={16} /> },
                                { id: "government", label: "Govt", icon: <Shield size={16} /> },
                                { id: "admin", label: "Admin", icon: <GraduationCap size={16} /> }
                            ].map((r) => (
                                <button
                                    key={r.id}
                                    onClick={() => setRole(r.id)}
                                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-sm font-bold ${role === r.id ? "bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/20" : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                                        }`}
                                >
                                    {r.icon}
                                    {r.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <Link
                    href={isLogin ? `/${role === 'company' ? 'industrial' : role === 'government' ? 'government' : 'personal'}` : "#"}
                    className="w-full py-4 bg-emerald-500 rounded-xl font-bold text-center block shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-transform active:scale-95 mb-6"
                >
                    {isLogin ? "Sign In" : "Create Account"}
                </Link>

                <div className="text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                    >
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
