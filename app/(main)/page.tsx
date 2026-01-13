import Link from "next/link";

const codeSnippets = [
  {
    language: "typescript",
    code: `function twoSum(nums: number[], target: number) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    position: { top: "10%", left: "5%", delay: "0s" }
  },
  {
    language: "python",
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    position: { top: "60%", right: "8%", delay: "1s" }
  },
  {
    language: "sql",
    code: `SELECT u.name, COUNT(s.id) as submissions
FROM users u
LEFT JOIN submissions s ON u.id = s.userId
WHERE s.status = 'ACCEPTED'
GROUP BY u.id, u.name
ORDER BY submissions DESC
LIMIT 10;`,
    position: { top: "35%", left: "55%", delay: "2s" }
  },
  {
    language: "javascript",
    code: `const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
};`,
    position: { bottom: "15%", left: "10%", delay: "0.5s" }
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans pt-20 transition-colors relative overflow-hidden">
      {/* Animated Code Snippets Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.08]">
        {codeSnippets.map((snippet, index) => (
          <div
            key={index}
            className="absolute font-mono text-xs md:text-sm animate-float max-w-[400px] hidden md:block"
            style={{
              top: snippet.position.top,
              left: snippet.position.left,
              right: snippet.position.right,
              bottom: snippet.position.bottom,
              animationDelay: snippet.position.delay,
            }}
          >
            <div className="bg-white/50 rounded-lg p-4 border-2 border-orange-500/30 backdrop-blur-[2px] shadow-lg">
              <div className="text-orange-500 mb-2 text-xs font-bold uppercase tracking-wider">
                {snippet.language}
              </div>
              <pre className="text-black/70 whitespace-pre-wrap leading-relaxed">
                <code>{snippet.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8">
            Master Coding. <br />
            <span className="text-orange-500 dark:text-orange-400">Unleash Potential.</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl">
            The ultimate platform for competitive programming and interview preparation.
            Join thousands of developers leveling up their skills daily.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-orange-500 dark:bg-orange-600 text-white text-lg font-semibold rounded-xl hover:bg-orange-600 dark:hover:bg-orange-700 transition-all shadow-xl shadow-orange-500/20 text-center hover:scale-105 transform"
            >
              Start Coding Now
            </Link>
            <Link
              href="/problems"
              className="px-8 py-4 bg-black text-white text-lg font-semibold rounded-xl hover:bg-gray-900 transition-all border-2 border-black text-center hover:scale-105 transform"
            >
              Explore Problems
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
