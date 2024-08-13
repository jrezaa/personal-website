"use client";

import { useSearchParams } from "next/navigation";
import LeetcodeTypePage from "../../../components/LeetcodeTypePage";
import { Suspense } from "react";

const problemsData = {
  arrays: {
    title: "Arrays",
    introduction:
      "Here you will find a collection of problems related to arrays. These problems will help you understand the core concepts of arrays.",
    problems: [
      {
        id: 1,
        title: "Two Sum",
        link: "https://leetcode.com/problems/two-sum/",
        code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
        tests: [
          { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
          { input: [[3, 2, 4], 6], expected: [1, 2] },
          { input: [[3, 3], 6], expected: [0, 1] },
        ],
      },
      {
        id: 2,
        title: "Best Time to Buy and Sell Stock",
        link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        code: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }
  return maxProfit;
}`,
        tests: [
          { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
          { input: [[7, 6, 4, 3, 1]], expected: 0 },
        ],
      },
      // Add more problems here
    ],
  },
  strings: {
    title: "Strings",
    introduction:
      "Here you will find a collection of problems related to strings. These problems will help you understand the core concepts of strings.",
    problems: [
      {
        id: 1,
        title: "Longest Substring Without Repeating Characters",
        link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        code: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0;
  let maxLength = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(map.get(s[right]) + 1, left);
    }
    map.set(s[right], right);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}`,
        tests: [
          { input: ["abcabcbb"], expected: 3 },
          { input: ["bbbbb"], expected: 1 },
          { input: ["pwwkew"], expected: 3 },
        ],
      },
      {
        id: 2,
        title: "Valid Anagram",
        link: "https://leetcode.com/problems/valid-anagram/",
        code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }
  return count.every(c => c === 0);
}`,
        tests: [
          { input: ["anagram", "nagaram"], expected: true },
          { input: ["rat", "car"], expected: false },
        ],
      },
      // Add more problems here
    ],
  },
  // Add more types here
};

export default function QuestionTypePage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const pageData = problemsData[type as keyof typeof problemsData];

  if (!pageData) {
    return <div>Type not found</div>;
  }

  return (
    <Suspense fallback={<div>LOADING...</div>}>
      <LeetcodeTypePage
        title={pageData.title}
        introduction={pageData.introduction}
        problems={pageData.problems}
        additionalSections={
          <div>Additional content can be added here if needed</div>
        }
      />
    </Suspense>
  );
}
