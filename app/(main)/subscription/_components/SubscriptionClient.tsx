"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Rocket, Zap, Crown, Shield, ArrowRight, Circle, Mail, MessageCircle, HelpCircle, Lock, RefreshCcw, CreditCard } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    monthlyPrice: "0",
    yearlyPrice: "0",
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
    monthlyPrice: "499",
    yearlyPrice: "4790",
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
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
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
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Simple Header */}
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Pricing Plans
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto font-medium text-base">
            Unlock the full potential of your coding career with our professional plans.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-12">
          <div
            role="radiogroup"
            aria-label="Billing cycle"
            className="relative flex items-center p-1 bg-gray-100 dark:bg-white/5 rounded-xl w-fit border border-gray-200 dark:border-white/10"
          >
            <button
              role="radio"
              aria-checked={billingCycle === "monthly"}
              tabIndex={billingCycle === "monthly" ? 0 : -1}
              onClick={() => setBillingCycle("monthly")}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setBillingCycle("yearly");
              }}
              className={`relative px-6 py-2 text-sm font-bold transition-all duration-300 z-10 focus:outline-none ${
                billingCycle === "monthly" ? "text-white" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Monthly
            </button>
            <button
              role="radio"
              aria-checked={billingCycle === "yearly"}
              tabIndex={billingCycle === "yearly" ? 0 : -1}
              onClick={() => setBillingCycle("yearly")}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") setBillingCycle("monthly");
              }}
              className={`relative px-6 py-2 text-sm font-bold transition-all duration-300 z-10 focus:outline-none ${
                billingCycle === "yearly" ? "text-white" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-orange-500 text-[9px] text-white px-1.5 py-0.5 rounded-full">
                -20%
              </span>
            </button>
            <motion.div
              layoutId="activeCycle"
              className="absolute h-[calc(100%-8px)] rounded-lg bg-orange-500 shadow-lg shadow-orange-500/20"
              initial={false}
              animate={{
                left: billingCycle === "monthly" ? 4 : "51%",
                width: billingCycle === "monthly" ? "calc(50% - 4px)" : "calc(50% - 4px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        {/* Improved Cards UI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative flex flex-col p-8 rounded-xl border transition-all duration-500 ${
                plan.popular
                  ? "bg-white dark:bg-[#1a1a1a] border-orange-500 shadow-xl shadow-orange-500/10 z-10 scale-[1.03]"
                  : "bg-gray-50 dark:bg-white/2 border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={billingCycle}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-4xl font-black text-gray-900 dark:text-white"
                    >
                      {plan.monthlyPrice === "Custom"
                        ? "Custom"
                        : billingCycle === "monthly"
                        ? `₹${plan.monthlyPrice}`
                        : `₹${plan.yearlyPrice}`}
                    </motion.span>
                  </AnimatePresence>
                  {plan.monthlyPrice !== "Custom" && (
                    <span className="text-gray-400 text-sm font-medium">
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{plan.description}</p>
              </div>

              <div className="flex-1 space-y-4 mb-10">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3">
                    <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${plan.popular ? "bg-orange-500" : "bg-orange-200 dark:bg-orange-900/30"}`} />
                    <span className="text-base text-gray-600 dark:text-gray-300 font-medium leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                disabled={plan.name === "Free"}
                className={`w-full py-4 rounded-lg font-bold text-sm transition-all active:scale-[0.98] ${
                  plan.popular
                    ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
                    : plan.name === "Free"
                    ? "bg-gray-200 dark:bg-white/10 text-gray-400 cursor-not-allowed opacity-60"
                    : "bg-gray-900 dark:bg-white text-white dark:text-black hover:opacity-90"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-32 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500 dark:text-gray-400">Everything you need to know about our plans and pricing.</p>
          </div>
          <div className="space-y-6">
            {[
              { q: "Can I cancel my subscription any time?", a: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period." },
              { q: "Do you offer student discounts?", a: "We sure do! Contact our support team with your student ID to get a 50% discount on the Pro plan." },
              { q: "What happens after my Pro plan expires?", a: "Your account will be moved to the Free tier. All your progress will be saved, but some features will be restricted." }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{faq.q}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

