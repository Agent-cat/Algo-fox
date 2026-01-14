import Link from "next/link";
import { ShieldAlert, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BannedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-lg w-full">
        <div className="relative mb-8 mx-auto w-32 h-32">
          <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse opacity-50"></div>
          <div className="relative z-10 w-32 h-32 bg-red-50 rounded-full flex items-center justify-center">
            <ShieldAlert className="w-16 h-16 text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Account Suspended</h1>

        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8 text-left">
          <h3 className="text-red-800 font-semibold mb-2">Why am I seeing this?</h3>
          <p className="text-red-700/80 text-sm leading-relaxed">
            Your account has been flagged for violating our community guidelines or terms of service. Access to your account has been temporarily or permanently restricted.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-500 text-sm">
            If you believe this is a mistake, please contact our support team for a review.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="mailto:support@algofox.dev">
              <Button className="w-full sm:w-auto bg-gray-900 text-white hover:bg-gray-800">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 text-xs text-gray-400">
          Error Code: ACCESS_DENIED_BANNED
        </div>
      </div>
    </div>
  );
}
