import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans pt-20">

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8">
            Master Coding. <br />
            <span className="text-orange-500">Unleash Potential.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
            The ultimate platform for competitive programming and interview preparation.
            Join thousands of developers leveling up their skills daily.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 text-center">
              Start Coding Now
            </Link>
            <Link href="/problems" className="px-8 py-4 bg-gray-50 text-black text-lg font-semibold rounded-xl hover:bg-gray-100 transition-all border border-gray-200 text-center">
              Explore Problems
            </Link>
          </div>
        </div>
      </div>

      
      
    </div>
  );
}
