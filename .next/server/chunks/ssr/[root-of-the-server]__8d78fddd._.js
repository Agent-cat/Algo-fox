module.exports=[193695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},70864,a=>{a.n(a.i(233290))},565897,a=>{a.n(a.i(396647))},102894,a=>{a.n(a.i(666188))},13718,a=>{a.n(a.i(685523))},118198,a=>{a.n(a.i(545518))},262212,a=>{a.n(a.i(866114))},379156,a=>{a.n(a.i(766062))},778552,a=>{"use strict";var b=a.i(907997),c=a.i(395936);let d=[{language:"typescript",code:`function twoSum(nums: number[], target: number) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,position:{top:"10%",left:"5%",delay:"0s"}},{language:"python",code:`def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,position:{top:"60%",right:"8%",delay:"1s"}},{language:"sql",code:`SELECT u.name, COUNT(s.id) as submissions
FROM users u
LEFT JOIN submissions s ON u.id = s.userId
WHERE s.status = 'ACCEPTED'
GROUP BY u.id, u.name
ORDER BY submissions DESC
LIMIT 10;`,position:{top:"35%",left:"55%",delay:"2s"}},{language:"javascript",code:`const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
};`,position:{bottom:"15%",left:"10%",delay:"0.5s"}}];function e(){return(0,b.jsxs)("div",{className:"min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white font-sans pt-20 relative overflow-hidden",children:[(0,b.jsx)("div",{className:"absolute inset-0 overflow-hidden pointer-events-none opacity-[0.08] dark:opacity-[0.12]",children:d.map((a,c)=>(0,b.jsx)("div",{className:"absolute font-mono text-xs md:text-sm animate-float max-w-100 hidden md:block",style:{top:a.position.top,left:a.position.left,right:a.position.right,bottom:a.position.bottom,animationDelay:a.position.delay},children:(0,b.jsxs)("div",{className:"bg-white/50 dark:bg-[#1a1a1a]/50 rounded-lg p-4 border-2 border-orange-500/30 backdrop-blur-[2px] shadow-lg",children:[(0,b.jsx)("div",{className:"text-orange-500 mb-2 text-xs font-bold uppercase tracking-wider",children:a.language}),(0,b.jsx)("pre",{className:"text-black/70 dark:text-white/70 whitespace-pre-wrap leading-relaxed",children:(0,b.jsx)("code",{children:a.code})})]})},c))}),(0,b.jsx)("div",{className:"max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10",children:(0,b.jsxs)("div",{className:"max-w-3xl",children:[(0,b.jsxs)("h1",{className:"text-6xl md:text-7xl font-bold tracking-tight mb-8",children:["Master Coding. ",(0,b.jsx)("br",{}),(0,b.jsx)("span",{className:"text-orange-500 dark:text-orange-400",children:"Unleash Potential."})]}),(0,b.jsx)("p",{className:"text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl",children:"The ultimate platform for competitive programming and interview preparation. Join thousands of developers leveling up their skills daily."}),(0,b.jsxs)("div",{className:"flex flex-col sm:flex-row gap-4",children:[(0,b.jsx)(c.default,{href:"/contests",className:"px-8 py-4 bg-orange-500 dark:bg-orange-600 text-white text-lg font-semibold rounded-xl hover:bg-orange-600 dark:hover:bg-orange-700 transition-all shadow-xl shadow-orange-500/20 text-center hover:scale-105 transform",children:"Explore Contests"}),(0,b.jsx)(c.default,{href:"/problems",className:"px-8 py-4 bg-black dark:bg-white text-white dark:text-black text-lg font-semibold rounded-xl hover:bg-gray-900 dark:hover:bg-gray-100 transition-all border-2 border-black dark:border-white text-center hover:scale-105 transform",children:"Explore Problems"})]})]})})]})}a.s(["default",()=>e])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__8d78fddd._.js.map