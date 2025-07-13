
import type { Assessment, AssessmentProblem } from './types';

const allProblems: AssessmentProblem[] = [
    { id: 'ps-1', title: 'Two Sum', link: 'https://leetcode.com/problems/two-sum' },
    { id: 'ps-3', title: 'Valid Anagram', link: 'https://leetcode.com/problems/valid-anagram' },
    { id: 'ps-4', title: 'Group Anagrams', link: 'https://leetcode.com/problems/group-anagrams' },
    { id: 'ps-6', title: 'Product of Array Except Self', link: 'https://leetcode.com/problems/product-of-array-except-self' },
    { id: 'ps-11', title: 'Container With Most Water', link: 'https://leetcode.com/problems/container-with-most-water' },
    { id: 'ps-12', title: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water' },
    { id: 'ps-13', title: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock' },
    { id: 'ps-14', title: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters' },
    { id: 'ps-18', title: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses' },
    { id: 'ps-28', title: 'Search in Rotated Sorted Array', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array' },
    { id: 'ps-32', title: 'Reverse Linked List', link: 'https://leetcode.com/problems/reverse-linked-list' },
    { id: 'ps-33', title: 'Merge Two Sorted Lists', link: 'https://leetcode.com/problems/merge-two-sorted-lists' },
    { id: 'ps-40', title: 'LRU Cache', link: 'https://leetcode.com/problems/lru-cache' },
    { id: 'ps-41', title: 'Merge k Sorted Lists', link: 'https://leetcode.com/problems/merge-k-sorted-lists' },
    { id: 'ps-42', title: 'Reverse Nodes in k-Group', link: 'https://leetcode.com/problems/reverse-nodes-in-k-group' },
    { id: 'ps-50', title: 'Binary Tree Level Order Traversal', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal' },
    { id: 'ps-53', title: 'Validate Binary Search Tree', link: 'https://leetcode.com/problems/validate-binary-search-tree' },
    { id: 'ps-56', title: 'Lowest Common Ancestor of a Binary Tree', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree' },
    { id: 'ps-58', title: 'Serialize and Deserialize Binary Tree', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree' },
    { id: 'ps-59', title: 'Implement Trie (Prefix Tree)', link: 'https://leetcode.com/problems/implement-trie-prefix-tree' },
    { id: 'ps-78', title: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands' },
    { id: 'ps-83', title: 'Rotting Oranges', link: 'https://leetcode.com/problems/rotting-oranges' },
    { id: 'ps-85', title: 'Course Schedule', link: 'https://leetcode.com/problems/course-schedule' },
    { id: 'ps-90', title: 'Word Ladder', link: 'https://leetcode.com/problems/word-ladder' },
    { id: 'ps-98', title: 'Climbing Stairs', link: 'https://leetcode.com/problems/climbing-stairs' },
    { id: 'ps-105', title: 'Coin Change', link: 'https://leetcode.com/problems/coin-change' },
    { id: 'ps-108', title: 'Longest Increasing Subsequence', link: 'https://leetcode.com/problems/longest-increasing-subsequence' },
    { id: 'ps-121', title: 'Maximum Subarray', link: 'https://leetcode.com/problems/maximum-subarray' },
    { id: 'ps-130', title: 'Merge Intervals', link: 'https://leetcode.com/problems/merge-intervals' },
    { id: 'ps-142', title: 'Rotate Image', link: 'https://leetcode.com/problems/rotate-image' },
    { id: 'ps-31', title: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays' },
    { id: 'ps-57', title: 'Binary Tree Maximum Path Sum', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum' },
    { id: 'ps-61', title: 'Word Search II', link: 'https://leetcode.com/problems/word-search-ii' },
    { id: 'ps-68', title: 'Find Median from Data Stream', link: 'https://leetcode.com/problems/find-median-from-data-stream' },
    { id: 'ps-100', title: 'House Robber', link: 'https://leetcode.com/problems/house-robber' },
];

const assessments: Assessment[] = [
    {
        id: 'google-1',
        company: 'Google',
        type: 'SDE-1 Screening',
        logoUrl: 'https://placehold.co/64x64.png',
        timeLimitMinutes: 90,
        problems: [
            allProblems.find(p => p.id === 'ps-78')!, // Number of Islands
            allProblems.find(p => p.id === 'ps-90')!, // Word Ladder
            allProblems.find(p => p.id === 'ps-57')!, // Binary Tree Maximum Path Sum
        ]
    },
    {
        id: 'amazon-1',
        company: 'Amazon',
        type: 'SDE-1 Online Assessment',
        logoUrl: 'https://placehold.co/64x64.png',
        timeLimitMinutes: 90,
        problems: [
            allProblems.find(p => p.id === 'ps-1')!,  // Two Sum
            allProblems.find(p => p.id === 'ps-41')!, // Merge k Sorted Lists
            allProblems.find(p => p.id === 'ps-83')!, // Rotting Oranges
        ]
    },
    {
        id: 'microsoft-1',
        company: 'Microsoft',
        type: 'SDE-1 Screening',
        logoUrl: 'https://placehold.co/64x64.png',
        timeLimitMinutes: 60,
        problems: [
            allProblems.find(p => p.id === 'ps-32')!, // Reverse Linked List
            allProblems.find(p => p.id === 'ps-142')!, // Rotate Image
        ]
    },
    {
        id: 'atlassian-1',
        company: 'Atlassian',
        type: 'P4 Screening',
        logoUrl: 'https://placehold.co/64x64.png',
        timeLimitMinutes: 90,
        problems: [
            allProblems.find(p => p.id === 'ps-68')!, // Find Median from Data Stream
            allProblems.find(p => p.id === 'ps-40')!, // LRU Cache
        ]
    },
    {
        id: 'flipkart-1',
        company: 'Flipkart',
        type: 'SDE-1 Machine Coding',
        logoUrl: 'https://placehold.co/64x64.png',
        timeLimitMinutes: 120,
        problems: [
             allProblems.find(p => p.id === 'ps-58')!, // Serialize and Deserialize Binary Tree
             allProblems.find(p => p.id === 'ps-42')!, // Reverse Nodes in k-Group
        ]
    },
    {
        id: 'walmart-1',
        company: 'Walmart',
        type: 'SDE-2 Online Assessment',
        logoUrl: 'https://placehold.co/64x64.png',
        timeLimitMinutes: 90,
        problems: [
            allProblems.find(p => p.id === 'ps-108')!, // Longest Increasing Subsequence
            allProblems.find(p => p.id === 'ps-105')!, // Coin Change
            allProblems.find(p => p.id === 'ps-11')!,  // Container with most water
        ]
    },
    {
        id: 'oracle-1',
        company: 'Oracle',
        type: 'MTS Screening',
        logoUrl: 'https://placehold.co/64x64.png',
        timeLimitMinutes: 60,
        problems: [
            allProblems.find(p => p.id === 'ps-53')!, // Validate Binary Search Tree
            allProblems.find(p => p.id === 'ps-6')!,  // Product of Array Except Self
        ]
    },
    {
        id: 'infosys-1',
        company: 'Infosys',
        type: 'HackWithInfy Style',
        logoUrl: 'https://placehold.co/64x64.png',
        timeLimitMinutes: 120,
        problems: [
            allProblems.find(p => p.id === 'ps-13')!, // Best Time to Buy and Sell Stock
            allProblems.find(p => p.id === 'ps-100')!,// House Robber
            allProblems.find(p => p.id === 'ps-98')!, // Climbing Stairs
        ]
    },
    {
        id: 'tcs-1',
        company: 'TCS',
        type: 'Digital Profile',
        logoUrl: 'https://placehold.co/64x64.png',
        timeLimitMinutes: 60,
        problems: [
            allProblems.find(p => p.id === 'ps-3')!, // Valid Anagram
            allProblems.find(p => p.id === 'ps-121')!,// Maximum Subarray
        ]
    },
    {
        id: 'wipro-1',
        company: 'Wipro',
        type: 'Turbo Hiring',
        logoUrl: 'https://placehold.co/64x64.png',
        timeLimitMinutes: 60,
        problems: [
            allProblems.find(p => p.id === 'ps-32')!, // Reverse Linked List
            allProblems.find(p => p.id === 'ps-18')!, // Valid Parentheses
        ]
    },
    {
        id: 'accenture-1',
        company: 'Accenture',
        type: 'ACE Hiring',
        logoUrl: 'https://placehold.co/64x64.png',
        timeLimitMinutes: 90,
        problems: [
            allProblems.find(p => p.id === 'ps-1')!,  // Two Sum
            allProblems.find(p => p.id === 'ps-14')!, // Longest Substring Without Repeating Characters
            allProblems.find(p => p.id === 'ps-33')!, // Merge Two Sorted Lists
        ]
    }
];

export function getAssessments(): Assessment[] {
    return JSON.parse(JSON.stringify(assessments));
}

export function getAssessmentById(id: string): Assessment | undefined {
    // Filter out any potential undefined problems before returning
    const assessment = assessments.find(a => a.id === id);
    if (assessment) {
        assessment.problems = assessment.problems.filter(p => p !== undefined && p !== null);
    }
    return assessment;
}

    