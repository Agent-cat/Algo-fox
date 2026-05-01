import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] py-24 px-6 md:px-12">
            <div className="max-w-5xl mx-auto">
                {/* Back Link */}
                <Link
                    href="/signin"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-16 text-sm font-medium group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Return to Authentication
                </Link>

                {/* Header */}
                <header className="border-b border-gray-100 dark:border-white/5 pb-12 mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-950 dark:text-white tracking-tighter mb-6">
                        Terms of Service
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-500 uppercase tracking-widest font-bold">
                        <span>Version 1.2.0</span>
                        <span className="hidden md:block text-gray-200 dark:text-white/10">|</span>
                        <span>Effective Date: May 01, 2026</span>
                    </div>
                </header>

                {/* Introduction */}
                <div className="prose prose-gray dark:prose-invert max-w-none mb-20">
                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                        Welcome to Algo-fox. These Terms of Service ("Terms") govern your access to and use of the Algo-fox website, services, and applications (the "Service"). By accessing or using the Service, you agree to be bound by these Terms and by our Privacy Policy. If you are using the Service on behalf of an organization, you are agreeing to these Terms for that organization and promising that you have the authority to bind that organization to these terms. In that case, "you" and "your" will refer to that organization.
                    </p>
                </div>

                {/* Detailed Sections */}
                <div className="space-y-24">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-8 pb-4 border-b border-gray-100 dark:border-white/5 uppercase tracking-tight">
                            1. Provision of Service
                        </h2>
                        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-loose text-justify">
                            <p>
                                Algo-fox is a specialized educational platform designed to facilitate coding education, automated assessment, and classroom management. The Service includes access to coding problems, real-time code execution environments, performance tracking, and communication tools between instructors and students.
                            </p>
                            <p>
                                We are constantly changing and improving our Services. We may add or remove functionalities or features, and we may suspend or stop a Service altogether. We reserve the right to modify the Service at any time, with or without notice, including the right to limit access to certain features based on subscription status or institutional affiliation.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-8 pb-4 border-b border-gray-100 dark:border-white/5 uppercase tracking-tight">
                            2. User Responsibilities & Registration
                        </h2>
                        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-loose text-justify">
                            <p>
                                To use most aspects of the Service, you must register for and maintain an active personal user account ("Account"). You must be at least 13 years of age, or the age of legal majority in your jurisdiction, to obtain an Account. Account registration requires you to submit certain personal information, such as your name and email address. You agree to maintain accurate, complete, and up-to-date information in your Account.
                            </p>
                            <p>
                                You are responsible for all activity that occurs under your Account, and you agree to maintain the security and secrecy of your Account username and password at all times. Unless otherwise permitted by Algo-fox in writing, you may only possess one Account. You may not authorize third parties to use your Account.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-8 pb-4 border-b border-gray-100 dark:border-white/5 uppercase tracking-tight">
                            3. Acceptable Use Policy
                        </h2>
                        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-loose text-justify">
                            <p>
                                The Service is intended for educational and professional development purposes. Users must adhere to high standards of academic integrity. Prohibited activities include, but are not limited to:
                            </p>
                            <ul className="list-disc pl-6 space-y-4">
                                <li>Attempting to bypass automated assessment anti-cheat mechanisms or submitting code that is not your own without proper attribution.</li>
                                <li>Interfering with the operation of the Service, including attempting to overload our infrastructure or reverse-engineer our proprietary scoring algorithms.</li>
                                <li>Using the Service for any illegal activities or to promote discriminatory, defamatory, or harassing content.</li>
                                <li>Creating multiple accounts to manipulate leaderboard standings or circumvent problem-solving restrictions.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-8 pb-4 border-b border-gray-100 dark:border-white/5 uppercase tracking-tight">
                            4. Intellectual Property Rights
                        </h2>
                        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-loose text-justify">
                            <p>
                                All content provided on Algo-fox, including problem statements, test data, platform architecture, and branding, is the exclusive property of Algo-fox or its content providers and is protected by international copyright, trademark, and other intellectual property laws.
                            </p>
                            <p>
                                You retain ownership of any code you write and submit on the platform. However, by submitting content, you grant Algo-fox a worldwide, non-exclusive, royalty-free license to use, host, store, reproduce, and modify that content solely for the purpose of providing, promoting, and improving our Services (such as running test cases or providing feedback).
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-8 pb-4 border-b border-gray-100 dark:border-white/5 uppercase tracking-tight">
                            5. Disclaimers & Limitation of Liability
                        </h2>
                        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-loose text-justify">
                            <p>
                                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." ALGO-FOX DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES, EXPRESS, IMPLIED, OR STATUTORY, NOT EXPRESSLY SET OUT IN THESE TERMS, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                            </p>
                            <p>
                                ALGO-FOX SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS, LOST DATA, OR PERSONAL INJURY RELATED TO, IN CONNECTION WITH, OR OTHERWISE RESULTING FROM ANY USE OF THE SERVICES.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-8 pb-4 border-b border-gray-100 dark:border-white/5 uppercase tracking-tight">
                            6. Termination
                        </h2>
                        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-loose text-justify">
                            <p>
                                We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact our support team.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Footer Legal */}
                <footer className="mt-32 pt-12 border-t border-gray-100 dark:border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="space-y-2">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">Algo-fox Education Systems</p>
                            <p className="text-xs text-gray-500">Regulated under the Digital Services Act 2024</p>
                        </div>
                        <div className="text-xs text-gray-400 max-w-sm text-justify md:text-right">
                            For further inquiries regarding these terms, please reach out to our compliance department at legal@algofox.com.
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
