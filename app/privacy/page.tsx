import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
                        Privacy Policy
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-500 uppercase tracking-widest font-bold">
                        <span>Document ID: PRIV-2026-A</span>
                        <span className="hidden md:block text-gray-200 dark:text-white/10">|</span>
                        <span>Revised: May 01, 2026</span>
                    </div>
                </header>

                {/* Introduction */}
                <div className="prose prose-gray dark:prose-invert max-w-none mb-20">
                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                        At Algo-fox, we understand that your privacy is of paramount importance. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or use our platform. We are committed to protecting your personal data and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact our Data Protection Officer.
                    </p>
                </div>

                {/* Detailed Sections */}
                <div className="space-y-24">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-8 pb-4 border-b border-gray-100 dark:border-white/5 uppercase tracking-tight">
                            1. Information Collection
                        </h2>
                        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-loose text-justify">
                            <p>
                                When you use our platform, we collect certain information necessary to provide the service. This include information you provide directly to us, such as when you create an account using third-party authentication services (Google or Microsoft). This data typically includes your name, email address, and profile picture.
                            </p>
                            <p>
                                Additionally, as you interact with Algo-fox, we automatically collect information about your device, including your IP address, browser type, and interaction logs. For students, we collect academic data such as problem submissions, execution logs, and classroom participation metrics to facilitate the educational experience.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-8 pb-4 border-b border-gray-100 dark:border-white/5 uppercase tracking-tight">
                            2. Utilization of Data
                        </h2>
                        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-loose text-justify">
                            <p>
                                We use the information we collect for various purposes, including to provide and maintain our Service, to notify you about changes to our Service, and to allow you to participate in interactive features when you choose to do so. For instructors, we provide processed analytics and progress reports based on student submissions to assist in educational assessment.
                            </p>
                            <p>
                                We may also use your information to provide customer care and support, to gather analysis or valuable information so that we can improve our Service, and to monitor the usage of our Service to detect, prevent and address technical issues.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-8 pb-4 border-b border-gray-100 dark:border-white/5 uppercase tracking-tight">
                            3. Data Retention & Security
                        </h2>
                        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-loose text-justify">
                            <p>
                                Algo-fox will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
                            </p>
                            <p>
                                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, including end-to-end encryption for submissions and secure session management, we cannot guarantee its absolute security.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-8 pb-4 border-b border-gray-100 dark:border-white/5 uppercase tracking-tight">
                            4. Disclosure of Data
                        </h2>
                        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-loose text-justify">
                            <p>
                                We do not sell your personal data to third parties. We may disclose your personal information only in specific circumstances: (i) to comply with a legal obligation, (ii) to protect and defend the rights or property of Algo-fox, (iii) to prevent or investigate possible wrongdoing in connection with the Service, or (iv) to protect the personal safety of users of the Service or the public.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-8 pb-4 border-b border-gray-100 dark:border-white/5 uppercase tracking-tight">
                            5. Your Data Protection Rights
                        </h2>
                        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-loose text-justify">
                            <p>
                                Depending on your location, you may have certain data protection rights. Algo-fox aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.
                            </p>
                            <p>
                                In certain circumstances, you have the following data protection rights: the right to access, the right of rectification, the right to object, the right of restriction, the right to data portability and the right to withdraw consent.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-8 pb-4 border-b border-gray-100 dark:border-white/5 uppercase tracking-tight">
                            6. Changes to This Privacy Policy
                        </h2>
                        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-loose text-justify">
                            <p>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "revised" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Footer Legal */}
                <footer className="mt-32 pt-12 border-t border-gray-100 dark:border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="space-y-2">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">Privacy Department</p>
                            <p className="text-xs text-gray-500">Global Data Protection Regulation (GDPR) Compliant</p>
                        </div>
                        <div className="text-xs text-gray-400 max-w-sm text-justify md:text-right">
                            If you have any questions about this Privacy Policy, please contact us by email: privacy@algofox.com.
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
