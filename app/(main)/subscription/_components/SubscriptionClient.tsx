"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Rocket, Zap, Crown, Shield, ArrowRight, Circle } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Start your journey today",
    features: [
      "Practice problems",
      "Community support",
      "Standard analytics"
    ],
    cta: "Current Plan",
    popular: false,
    theme: "gray",
  },
  {
    name: "Pro Premium",
    price: "499",
    period: "/month",
    description: "For serious developers",
    features: [
      "Access to all Premium Courses",
      "Enter any Private Contest",
      "Full Classroom & Hub Access",
      "Advanced Learning Analytics",
      "Priority Tech Support",
    ],
    cta: "Upgrade Now",
    popular: true,
    theme: "orange",
  },
  {
    name: "Institution",
    price: "Custom",
    description: "Built for organizations",
    features: [
      "Everything in Pro Premium",
      "Unlimited Students",
      "Organization Dashboard",
      "Personal Account Manager",
    ],
    cta: "Contact Sales",
    popular: false,
    theme: "rose",
  },
];

export default function SubscriptionClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Simple Header */}
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Pricing Plans
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto font-medium">
            Unlock the full potential of your coding career with our professional plans.
          </p>
        </div>

        {/* Improved Cards UI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative flex flex-col p-8 rounded-4xl border transition-all duration-300 ${
                plan.popular
                  ? "bg-white dark:bg-[#1a1a1a] border-orange-500 shadow-xl shadow-orange-500/10 z-10 scale-[1.02]"
                  : "bg-gray-50 dark:bg-white/2 border-gray-200 dark:border-white/5"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                    {plan.popular && <Sparkles className="w-5 h-5 text-orange-500" />}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-black text-gray-900 dark:text-white">₹{plan.price}</span>
                    {plan.period && <span className="text-gray-400 text-sm font-medium">{plan.period}</span>}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{plan.description}</p>
              </div>

              <div className="flex-1 space-y-4 mb-10">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${plan.popular ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-700"}`} />
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all active:scale-[0.98] ${
                plan.popular
                  ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
                  : plan.name === "Free"
                    ? "bg-gray-200 dark:bg-white/10 text-gray-400 cursor-not-allowed"
                    : "bg-gray-900 dark:bg-white text-white dark:text-black hover:opacity-90"
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Simple Trust Footer */}
        <div className="pt-10 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-gray-400 dark:text-gray-600">
                <Shield className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Safe & Secure Checkout</span>
            </div>
            <div className="flex gap-6 opacity-40 grayscale font-black text-sm text-gray-500">
                <span>VISA</span>
                <span>MASTERCARD</span>
                <span>UPI</span>
            </div>
        </div>
      </div>
    </div>
  );
}
