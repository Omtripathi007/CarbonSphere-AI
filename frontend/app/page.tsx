"use client";

import { motion } from "framer-motion";
import { Leaf, BarChart3, Globe, Shield, Zap, TrendingDown } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-4 md:px-24 md:pb-24 eco-gradient">
      {/* Hero Section */}
      <div className="relative z-10 w-full max-w-7xl items-center justify-between font-mono text-sm lg:flex">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed left-0 top-0 flex w-full justify-center border-b border-white/10 bg-black/20 backdrop-blur-2xl pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4"
        >
          <span className="flex items-center gap-2 text-xl font-bold text-white">
            <Leaf className="text-emerald-500" />
            CarbonSphere <span className="text-emerald-500">AI</span>
          </span>
        </motion.div>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-black via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Link href="/login" className="btn-primary">
            Get Started
          </Link>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          National <span className="text-gradient">Carbon Intelligence</span> <br />
          & Reduction Platform
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10"
        >
          Empowering citizens, industries, and governments to achieve net-zero with
          AI-driven insights and real-world calculation.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mt-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            {
              title: "AI Forecasting",
              desc: "Predict future emissions with LSTM-powered models and optimize usage.",
              icon: <Zap className="w-8 h-8 text-emerald-500" />,
            },
            {
              title: "Carbon Credit Economy",
              desc: "Earn and trade tokenized carbon credits for sustainable actions.",
              icon: <Globe className="w-8 h-8 text-sky-500" />,
            },
            {
              title: "Policy Simulation",
              desc: "Simulate carbon tax impacts and regional net-zero progress.",
              icon: <Shield className="w-8 h-8 text-amber-500" />,
            }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-8 text-left hover:border-white/20 transition-colors group">
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
      >
        {[
          { label: "India Avg Emission", value: "0.82 kg", unit: "per kWh" },
          { label: "Net-Zero Target", value: "2070", unit: "" },
          { label: "Verified Industries", value: "1,240+", unit: "" },
          { label: "Credits Traded", value: "2.4M", unit: "CO2e" }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-bold text-gradient">{stat.value}</div>
            <div className="text-sm text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
            <div className="text-xs text-emerald-500/50">{stat.unit}</div>
          </div>
        ))}
      </motion.div>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[128px]" />
      </div>
    </main>
  );
}
