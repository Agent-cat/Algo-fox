import Link from "next/link";
import Image from "next/image";
import { TypewriterEffect } from "./components/TypewriterEffect";

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
    position: { top: "5%", left: "2%", delay: "0s" }
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
    position: { top: "45%", right: "2%", delay: "1s" }
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
    position: { top: "25%", left: "45%", delay: "2s" }
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
    position: { bottom: "5%", left: "5%", delay: "0.5s" }
  },
  {
    language: "java",
    code: `class Solution {
    public int ClimbingStairs(int n) {
        if (n <= 2) return n;
        int[] dp = new int[n + 1];
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}`,
    position: { top: "8%", right: "5%", delay: "1.5s" }
  },
  {
    language: "sql",
    code: `SELECT * FROM orders
WHERE amount > 100
AND status = 'shipped'
ORDER BY created_at DESC;`,
    position: { bottom: "12%", left: "40%", delay: "3s" }
  },
  {
    language: "rust",
    code: `struct Node {
    val: i32,
    next: Option<Box<Node>>,
}

impl Node {
    fn new(val: i32) -> Self {
        Node { val, next: None }
    }
}`,
    position: { bottom: "10%", right: "35%", delay: "2.5s" }
  },
  {
    language: "swift",
    code: `func fetchData(url: String) async throws -> Data {
    guard let url = URL(string: url) else {
        throw URLError(.badURL)
    }
    let (data, _) = try await URLSession.shared.data(from: url)
    return data
}`,
    position: { top: "50%", left: "12%", delay: "2.2s" }
  },
  {
    language: "sql",
    code: `INSERT INTO users (name, email, role)
VALUES 
    ('Alex', 'alex@example.com', 'user'),
    ('Sarah', 'sarah@test.com', 'admin'),
    ('Mike', 'mike@dev.io', 'user');`,
    position: { bottom: "35%", left: "5%", delay: "0.8s" }
  },
  {
    language: "python",
    code: `def reverse_string(s):
    return s[::-1]

# Example
# Input: "hello"
# Output: "olleh"`,
    position: { top: "80%", right: "5%", delay: "1.2s" }
  },
  {
    language: "go",
    code: `func factorial(n int) int {
    if n == 0 {
        return 1
    }
    return n * factorial(n-1)
}`,
    position: { top: "15%", left: "25%", delay: "1.8s" }
  },
  {
    language: "csharp",
    code: `var query = from c in customers
            where c.City == "London"
            select c;
            
foreach (var item in query) {
    Console.WriteLine(item.Name);
}`,
    position: { top: "35%", right: "20%", delay: "2.8s" }
  },
  {
    language: "ruby",
    code: `5.times do |i|
  puts "Hello #{i}"
end

users.each do |user|
  puts user.name
end`,
    position: { top: "65%", left: "25%", delay: "1.9s" }
  },
  {
    language: "css",
    code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}`,
    position: { bottom: "50%", right: "10%", delay: "3.2s" }
  },
  {
    language: "bash",
    code: `for file in *.txt; do
    echo "Processing $file"
    cat "$file" >> merged.txt
done`,
    position: { top: "5%", left: "45%", delay: "2.1s" }
  },
  {
    language: "html",
    code: `<div class="card">
  <h2>Title</h2>
  <p>Content goes here...</p>
  <button>Click Me</button>
</div>`,
    position: { bottom: "25%", right: "45%", delay: "1.4s" }
  },
  {
    language: "json",
    code: `{
  "name": "algofox",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}`,
    position: { top: "30%", left: "15%", delay: "1.6s" }
  },
  {
    language: "yaml",
    code: `name: Deploy
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run build`,
    position: { top: "40%", right: "25%", delay: "2.3s" }
  },
  {
    language: "graphql",
    code: `query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
    submissions {
      id
      status
      createdAt
    }
  }
}`,
    position: { top: "55%", left: "35%", delay: "2.9s" }
  },
  {
    language: "perl",
    code: `print "Hello World\\n";
my $name = "Dev";
print "Welcome $name";`,
    position: { top: "2%", left: "30%", delay: "3.1s" },
    noAnimation: true
  },
  {
    language: "lua",
    code: `function fact(n)
  if n == 0 then
    return 1
  else
    return n * fact(n-1)
  end
end`,
    position: { top: "3%", right: "30%", delay: "2.4s" },
    noAnimation: true
  },
  {
    language: "scala",
    code: `val x = 10
def square(a: Int): Int = {
  return a * a
}
println(square(x))`,
    position: { top: "12%", right: "15%", delay: "1.7s" },
    noAnimation: true
  },
  {
    language: "dockerfile",
    code: `FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]`,
    position: { top: "18%", left: "55%", delay: "2.6s" },
    noAnimation: true
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans pt-20 transition-colors relative overflow-hidden">
      {/* Animated Code Snippets Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.12]">
        {codeSnippets.map((snippet, index) => (
          <div
            key={index}
            className={`absolute font-mono text-xs md:text-sm max-w-[400px] hidden md:block pointer-events-auto hover:z-50 transition-all duration-300 ${
              // @ts-ignore
              snippet.noAnimation ? "" : "animate-float"
              }`}
            style={{

              top: snippet.position.top,
              left: snippet.position.left,
              right: snippet.position.right,
              bottom: snippet.position.bottom,
              animationDelay: snippet.position.delay,
            }}
          >
            <div className="bg-white/50 rounded-lg p-4 border-2 border-orange-500/30 backdrop-blur-[2px] shadow-lg group opacity-0 hover:opacity-100 hover:bg-white/90 hover:scale-110 hover:shadow-orange-500/40 hover:shadow-2xl transition-all duration-300">
              <div className="text-orange-600 mb-2 text-xs font-bold uppercase tracking-wider group-hover:text-orange-900 transition-colors duration-300">
                {snippet.language}
              </div>
              <pre className="text-black/80 whitespace-pre-wrap leading-relaxed group-hover:text-orange-800 transition-colors duration-300">
                <code>{snippet.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Hero */}
      <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-12">
          {/* Text Content */}
          <div className="max-w-4xl flex-1 pointer-events-none text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-8 pointer-events-auto leading-tight">
              <TypewriterEffect text="Master Coding." /> <br />
              <TypewriterEffect
                text="Build Real Skills."
                className="text-orange-500 dark:text-orange-400"
                delay={0.8}
              />
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 md:mb-10 leading-relaxed max-w-3xl pointer-events-auto mx-auto md:mx-0">
              A complete practice platform for DSA, SQL, and Web Development—designed for interviews and real-world problem solving.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pointer-events-auto justify-center md:justify-start">
              <Link
                href="/dashboard"
                className="px-6 py-3 md:px-10 md:py-5 bg-orange-500 dark:bg-orange-600 text-white text-lg md:text-xl font-semibold rounded-xl hover:bg-orange-600 dark:hover:bg-orange-700 transition-all shadow-xl shadow-orange-500/20 text-center hover:scale-105 transform"
              >
                Start Coding Now
              </Link>
              <Link
                href="/problems"
                className="px-6 py-3 md:px-10 md:py-5 bg-black text-white text-lg md:text-xl font-semibold rounded-xl hover:bg-gray-900 transition-all border-2 border-black text-center hover:scale-105 transform"
              >
                Explore Problems
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 w-full max-w-[350px] md:max-w-[1000px] flex justify-center md:justify-end pointer-events-none mt-8 md:mt-0">
            <Image
              src="/Hero-image.png"
              alt="Hero Image"
              width={1000}
              height={666}
              className="w-full h-auto object-contain animate-float pointer-events-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
