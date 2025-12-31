import { PrismaClient, Difficulty, ProblemType } from '@prisma/client';

const prisma = new PrismaClient();

const problems = [
    {
        title: "Two Sum",
        slug: "two-sum",
        description: `
Given an array of integers \`nums\` and an integer \`target\`, print indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the *same* element twice.

You can print the answer in any order.

## Example 1:

**Input:** nums = [2,7,11,15], target = 9
**Output:** 0 1
**Explanation:** Because nums[0] + nums[1] == 9, we print 0 1.

## Example 2:

**Input:** nums = [3,2,4], target = 6
**Output:** 1 2

## Example 3:

**Input:** nums = [3,3], target = 6
**Output:** 0 1

## Constraints:

*   \`2 <= nums.length <= 10^4\`
*   \`-10^9 <= nums[i] <= 10^9\`
*   \`-10^9 <= target <= 10^9\`
*   **Only one valid answer exists.**
`,
        difficulty: Difficulty.EASY,
        score: 10,
        testCases: [
            { input: "4\n2 7 11 15\n9", output: "0 1", hidden: false },
            { input: "3\n3 2 4\n6", output: "1 2", hidden: false },
            { input: "2\n3 3\n6", output: "0 1", hidden: true },
            { input: "4\n0 4 3 0\n0", output: "0 3", hidden: true },
            { input: "5\n-1 -2 -3 -4 -5\n-8", output: "2 4", hidden: true }
        ]
    },
    {
        title: "Valid Palindrome",
        slug: "valid-palindrome",
        description: `
A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, print \`true\` *if it is a palindrome, or* \`false\` *otherwise*.

## Example 1:

**Input:** s = "A man, a plan, a canal: Panama"
**Output:** true
**Explanation:** "amanaplanacanalpanama" is a palindrome.

## Example 2:

**Input:** s = "race a car"
**Output:** false
**Explanation:** "raceacar" is not a palindrome.

## Example 3:

**Input:** s = " "
**Output:** true
**Explanation:** s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.

## Constraints:

*   \`1 <= s.length <= 2 * 10^5\`
*   \`s\` consists only of printable ASCII characters.
`,
        difficulty: Difficulty.EASY,
        score: 10,
        testCases: [
            { input: `"A man, a plan, a canal: Panama"`, output: "true", hidden: false },
            { input: `"race a car"`, output: "false", hidden: false },
            { input: `" "`, output: "true", hidden: true },
            { input: `"ab_a"`, output: "true", hidden: true },
            { input: `"0P"`, output: "false", hidden: true }
        ]
    },
    {
        title: "Maximum Subarray",
        slug: "maximum-subarray",
        description: `
Given an integer array \`nums\`, find the subarray with the largest sum, and print *its sum*.

## Example 1:

**Input:** nums = [-2,1,-3,4,-1,2,1,-5,4]
**Output:** 6
**Explanation:** The subarray [4,-1,2,1] has the largest sum 6.

## Example 2:

**Input:** nums = [1]
**Output:** 1
**Explanation:** The subarray [1] has the largest sum 1.

## Example 3:

**Input:** nums = [5,4,-1,7,8]
**Output:** 23
**Explanation:** The subarray [5,4,-1,7,8] has the largest sum 23.

## Constraints:

*   \`1 <= nums.length <= 10^5\`
*   \`-10^4 <= nums[i] <= 10^4\`
`,
        difficulty: Difficulty.MEDIUM,
        score: 20,
        testCases: [
            { input: "9\n-2 1 -3 4 -1 2 1 -5 4", output: "6", hidden: false },
            { input: "1\n1", output: "1", hidden: false },
            { input: "5\n5 4 -1 7 8", output: "23", hidden: false },
            { input: "1\n-1", output: "-1", hidden: true },
            { input: "2\n-2 -1", output: "-1", hidden: true },
            { input: "2\n-2 1", output: "1", hidden: true }
        ]
    },
    {
        title: "Valid Anagram",
        slug: "valid-anagram",
        description: `
Given two strings \`s\` and \`t\`, print \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

## Example 1:

**Input:** s = "anagram", t = "nagaram"
**Output:** true

## Example 2:

**Input:** s = "rat", t = "car"
**Output:** false

## Constraints:

*   \`1 <= s.length, t.length <= 5 * 10^4\`
*   \`s\` and \`t\` consist of lowercase English letters.
`,
        difficulty: Difficulty.EASY,
        score: 10,
        testCases: [
            { input: `"anagram"\n"nagaram"`, output: "true", hidden: false },
            { input: `"rat"\n"car"`, output: "false", hidden: false },
            { input: `"test"\n"state"`, output: "false", hidden: true },
            { input: `"ab"\n"a"`, output: "false", hidden: true },
            { input: `"listen"\n"silent"`, output: "true", hidden: true }
        ]
    },
    {
        title: "Contains Duplicate",
        slug: "contains-duplicate",
        description: `
Given an integer array \`nums\`, print \`true\` if any value appears **at least twice** in the array, and print \`false\` if every element is distinct.

## Example 1:

**Input:** nums = [1,2,3,1]
**Output:** true

## Example 2:

**Input:** nums = [1,2,3,4]
**Output:** false

## Constraints:

*   \`1 <= nums.length <= 10^5\`
*   \`-10^9 <= nums[i] <= 10^9\`
`,
        difficulty: Difficulty.EASY,
        score: 10,
        testCases: [
            { input: "4\n1 2 3 1", output: "true", hidden: false },
            { input: "4\n1 2 3 4", output: "false", hidden: false },
            { input: "10\n1 1 1 3 3 4 3 2 4 2", output: "true", hidden: true },
            { input: "1\n1", output: "false", hidden: true },
            { input: "4\n10 20 30 10", output: "true", hidden: true }
        ]
    },
    {
        title: "Reverse String",
        slug: "reverse-string",
        description: `
Write a function that reverses a string. The input string is given as an array of characters \`s\`. Print the reversed string.

You must do this by modifying the input array in-place with \`O(1)\` extra memory.

## Example 1:

**Input:** s = ["h","e","l","l","o"]
**Output:** o l l e h

## Example 2:

**Input:** s = ["H","a","n","n","a","h"]
**Output:** h a n n a H

## Constraints:

*   \`1 <= s.length <= 10^5\`
*   \`s[i]\` is a printable ascii character.
`,
        difficulty: Difficulty.EASY,
        score: 10,
        testCases: [
            { input: `5\nh e l l o`, output: `o l l e h`, hidden: false },
            { input: `6\nH a n n a h`, output: `h a n n a H`, hidden: false },
            { input: `1\nA`, output: `A`, hidden: true },
            { input: `2\na b`, output: `b a`, hidden: true },
            { input: `3\n1 2 3`, output: `3 2 1`, hidden: true }
        ]
    },
    {
        title: "Product of Array Except Self",
        slug: "product-of-array-except-self",
        description: `
Given an integer array \`nums\`, print *an array* \`answer\` *such that* \`answer[i]\` *is equal to the product of all the elements of* \`nums\` *except* \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in \`O(n)\` time and without using the division operation.

## Example 1:

**Input:** nums = [1,2,3,4]
**Output:** 24 12 8 6

## Example 2:

**Input:** nums = [-1,1,0,-3,3]
**Output:** 0 0 9 0 0

## Constraints:

*   \`2 <= nums.length <= 10^5\`
*   \`-30 <= nums[i] <= 30\`
*   The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.
`,
        difficulty: Difficulty.MEDIUM,
        score: 20,
        testCases: [
            { input: "4\n1 2 3 4", output: "24 12 8 6", hidden: false },
            { input: "5\n-1 1 0 -3 3", output: "0 0 9 0 0", hidden: false },
            { input: "2\n1 1", output: "1 1", hidden: true },
            { input: "3\n4 0 4", output: "0 16 0", hidden: true },
            { input: "3\n1 2 3", output: "6 3 2", hidden: true }
        ]
    },
    {
        title: "Group Anagrams",
        slug: "group-anagrams",
        description: `
Given an array of strings \`strs\`, group **the anagrams** together. You can print the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

## Example 1:

**Input:** strs = ["eat","tea","tan","ate","nat","bat"]
**Output:** [["bat"],["nat","tan"],["ate","eat","tea"]]

## Example 2:

**Input:** strs = [""]
**Output:** [[""]]

## Example 3:

**Input:** strs = ["a"]
**Output:** [["a"]]

## Constraints:

*   \`1 <= strs.length <= 10^4\`
*   \`0 <= strs[i].length <= 100\`
*   \`strs[i]\` consists of lowercase English letters.
`,
        difficulty: Difficulty.MEDIUM,
        score: 20,
        testCases: [
            { input: `6\neat tea tan ate nat bat`, output: `[["bat"],["nat","tan"],["ate","eat","tea"]]`, hidden: false },
            { input: `1\n""`, output: `[[""]]`, hidden: false },
            { input: `1\na`, output: `[["a"]]`, hidden: true },
            { input: `3\nabc cba bca`, output: `[["abc", "cba", "bca"]]`, hidden: true },
            { input: `2\nbdddddddddd bbbbbbbbbbc`, output: `[["bbbbbbbbbbc"],["bdddddddddd"]]`, hidden: true }
        ]
    },
    {
        title: "Longest Consecutive Sequence",
        slug: "longest-consecutive-sequence",
        description: `
Given an unsorted array of integers \`nums\`, print *the length of the longest consecutive elements sequence*.

You must write an algorithm that runs in \`O(n)\` time.

## Example 1:

**Input:** nums = [100,4,200,1,3,2]
**Output:** 4
**Explanation:** The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

## Example 2:

**Input:** nums = [0,3,7,2,5,8,4,6,0,1]
**Output:** 9

## Constraints:

*   \`0 <= nums.length <= 10^5\`
*   \`-10^9 <= nums[i] <= 10^9\`
`,
        difficulty: Difficulty.MEDIUM,
        score: 20,
        testCases: [
            { input: "6\n100 4 200 1 3 2", output: "4", hidden: false },
            { input: "10\n0 3 7 2 5 8 4 6 0 1", output: "9", hidden: false },
            { input: "3\n1 2 3", output: "3", hidden: true },
            { input: "5\n5 4 3 2 1", output: "5", hidden: true },
            { input: "3\n10 100 200", output: "1", hidden: true }
        ]
    },
    {
        title: "Container With Most Water",
        slug: "container-with-most-water",
        description: `
You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Print *the maximum amount of water a container can store*.

**Notice** that you may not slant the container.

## Example 1:

**Input:** height = [1,8,6,2,5,4,8,3,7]
**Output:** 49
**Explanation:** The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

## Example 2:

**Input:** height = [1,1]
**Output:** 1

## Constraints:

*   \`n == height.length\`
*   \`2 <= n <= 10^5\`
*   \`0 <= height[i] <= 10^4\`
`,
        difficulty: Difficulty.MEDIUM,
        score: 20,
        testCases: [
            { input: "9\n1 8 6 2 5 4 8 3 7", output: "49", hidden: false },
            { input: "2\n1 1", output: "1", hidden: false },
            { input: "5\n4 3 2 1 4", output: "16", hidden: true },
            { input: "3\n1 2 1", output: "2", hidden: true },
            { input: "3\n10 9 8", output: "18", hidden: true }
        ]
    },
    {
        title: "Trapping Rain Water",
        slug: "trapping-rain-water",
        description: `
Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.

## Example 1:

**Input:** height = [0,1,0,2,1,0,1,3,2,1,2,1]
**Output:** 6
**Explanation:** The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

## Example 2:

**Input:** height = [4,2,0,3,2,5]
**Output:** 9

## Constraints:

*   \`n == height.length\`
*   \`1 <= n <= 2 * 10^4\`
*   \`0 <= height[i] <= 10^5\`
`,
        difficulty: Difficulty.HARD,
        score: 30,
        testCases: [
            { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", output: "6", hidden: false },
            { input: "6\n4 2 0 3 2 5", output: "9", hidden: false },
            { input: "3\n1 0 1", output: "1", hidden: true },
            { input: "4\n5 4 1 2", output: "1", hidden: true },
            { input: "3\n2 0 2", output: "2", hidden: true }
        ]
    },
    {
        title: "Median of Two Sorted Arrays",
        slug: "median-of-two-sorted-arrays",
        description: `
Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, print **the median** of the two sorted arrays.

The overall run time complexity should be \`O(log (m+n))\`.

## Example 1:

**Input:** nums1 = [1,3], nums2 = [2]
**Output:** 2.00000
**Explanation:** merged array = [1,2,3] and median is 2.

## Example 2:

**Input:** nums1 = [1,2], nums2 = [3,4]
**Output:** 2.50000
**Explanation:** merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

## Constraints:

*   \`nums1.length == m\`
*   \`nums2.length == n\`
*   \`0 <= m <= 1000\`
*   \`0 <= n <= 1000\`
*   \`1 <= m + n <= 2000\`
*   \`-10^6 <= nums1[i], nums2[i] <= 10^6\`
`,
        difficulty: Difficulty.HARD,
        score: 30,
        testCases: [
            { input: "2\n1 3\n1\n2", output: "2.00000", hidden: false },
            { input: "2\n1 2\n2\n3 4", output: "2.50000", hidden: false },
            { input: "0\n\n0\n", output: "0.00000", hidden: true }, // Empty input arrays
            { input: "0\n\n1\n1", output: "1.00000", hidden: true },
            { input: "1\n2\n0\n", output: "2.00000", hidden: true }
        ]
    },
    {
        title: "Merge k Sorted Lists",
        slug: "merge-k-sorted-lists",
        description: `
You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.

*Merge all the linked-lists into one sorted linked-list and print it.*

## Example 1:

**Input:** lists = [[1,4,5],[1,3,4],[2,6]]
**Output:** 1 1 2 3 4 4 5 6
**Explanation:** The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6

## Example 2:

**Input:** lists = []
**Output:**

## Example 3:

**Input:** lists = [[]]
**Output:**

## Constraints:

*   \`k == lists.length\`
*   \`0 <= k <= 10^4\`
*   \`0 <= lists[i].length <= 500\`
*   \`-10^4 <= lists[i][j] <= 10^4\`
*   \`lists[i]\` is sorted in **ascending order**.
*   The sum of \`lists[i].length\` will not exceed \`10^4\`.
`,
        difficulty: Difficulty.HARD,
        score: 30,
        testCases: [
            { input: `3\n3 1 4 5\n3 1 3 4\n2 2 6`, output: `1 1 2 3 4 4 5 6`, hidden: false },
            { input: `0`, output: ``, hidden: false }, // K=0
            { input: `1\n0`, output: ``, hidden: true }, // K=1, list size 0
            { input: `2\n1 1\n1 0`, output: `0 1`, hidden: true },
            { input: `3\n1 1\n1 2\n1 3`, output: `1 2 3`, hidden: true }
        ]
    }
];

async function main() {
    console.log('Start seeding...');

    for (const problem of problems) {
        console.log(`Upserting problem: ${problem.title}`);

        // Create or update the problem
        const upsertedProblem = await prisma.problem.upsert({
            where: { slug: problem.slug },
            update: {
                title: problem.title,
                description: problem.description,
                difficulty: problem.difficulty,
                score: problem.score,
                type: ProblemType.PRACTICE,
                hidden: false,
            },
            create: {
                title: problem.title,
                slug: problem.slug,
                description: problem.description,
                difficulty: problem.difficulty,
                score: problem.score,
                type: ProblemType.PRACTICE,
                hidden: false,
            },
        });

        console.log(`  Problem ID: ${upsertedProblem.id}`);

        // clear existing test cases
        await prisma.problemTestCase.deleteMany({
            where: { problemId: upsertedProblem.id }
        });

        // Create test cases
        console.log(`  Creating ${problem.testCases.length} test cases...`);
        for (const testCase of problem.testCases) {
            await prisma.problemTestCase.create({
                data: {
                    problemId: upsertedProblem.id,
                    input: testCase.input,
                    output: testCase.output,
                    hidden: testCase.hidden,
                },
            });
        }
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
