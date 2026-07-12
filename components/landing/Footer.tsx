"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "DSA Practice", href: "/problems/dsa" },
        { label: "SQL Playground", href: "/problems/sql" },
        { label: "Interactive Compiler", href: "/compiler" },
        { label: "Global Calendar", href: "/contests" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Company Sheets", href: "/sheets" },
        { label: "Topic Outlines", href: "/topics" },
        { label: "Classrooms", href: "/classrooms" },
        { label: "Help Documentation", href: "/docs" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Brand Kit", href: "/brand" },
        { label: "Contact Sales", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Security Policy", href: "/security" },
      ],
    },
  ];

  return (
    <footer className="bg-white dark:bg-[#1D1E23] border-t border-gray-150 dark:border-white/5 py-16 sm:py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16">
        
        {/* Left Column: Brand & Newsletter */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-black">
              AF
            </span>
            <span className="font-extrabold text-gray-950 dark:text-white tracking-tight">
              Algo-fox
            </span>
          </div>

          <p className="text-xs leading-relaxed text-gray-400 dark:text-gray-500 font-medium max-w-sm">
            Elevate your coding capabilities and share your verified portfolio with prospective recruiters. Master DSA and SQL schemas seamlessly.
          </p>

          {/* Newsletter Subscribe */}
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              Subscribe to newsletter
            </span>
            <div className="flex max-w-sm">
              <input
                type="email"
                placeholder="you@domain.com"
                className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-white/3 border border-gray-200 dark:border-white/5 rounded-l-xl text-xs font-semibold focus:outline-none focus:border-orange-500/50 dark:text-white"
              />
              <button className="px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-r-xl transition-colors flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Columns: Links */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                {section.title}
              </span>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 sm:mt-24 pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-semibold text-gray-400 dark:text-gray-500">
        <span>© {new Date().getFullYear()} Algo-fox. All rights reserved.</span>
        
        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {[
            { icon: TwitterIcon, href: "https://twitter.com" },
            { icon: LinkedinIcon, href: "https://linkedin.com" },
            { icon: GithubIcon, href: "https://github.com" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
