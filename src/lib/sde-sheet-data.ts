
export type SdeProblem = {
  id: string;
  title: string;
  link: string;
};

export type SdeTopic = {
  topicName: string;
  problems: SdeProblem[];
};

export const sdeSheetTopics: SdeTopic[] = [
  {
    topicName: "Day 1: Arrays",
    problems: [
      { id: "d1p1", title: "Set Matrix Zeroes", link: "https://leetcode.com/problems/set-matrix-zeroes/" },
      { id: "d1p2", title: "Pascal's Triangle", link: "https://leetcode.com/problems/pascals-triangle/" },
      { id: "d1p3", title: "Next Permutation", link: "https://leetcode.com/problems/next-permutation/" },
      { id: "d1p4", title: "Kadane's Algorithm (Max Subarray)", link: "https://leetcode.com/problems/maximum-subarray/" },
      { id: "d1p5", title: "Sort Colors (0s, 1s, 2s)", link: "https://leetcode.com/problems/sort-colors/" },
      { id: "d1p6", title: "Best Time to Buy and Sell Stock", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
    ],
  },
  {
    topicName: "Day 2: Arrays Part-II",
    problems: [
        { id: "d2p1", title: "Rotate Image", link: "https://leetcode.com/problems/rotate-image/" },
        { id: "d2p2", title: "Merge Overlapping Subintervals", link: "https://leetcode.com/problems/merge-intervals/" },
        { id: "d2p3", title: "Merge Two Sorted Arrays", link: "https://www.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/" },
        { id: "d2p4", title: "Find the duplicate in an array of N+1 integers", link: "https://leetcode.com/problems/find-the-duplicate-number/" },
        { id: "d2p5", title: "Find the repeating and missing numbers", link: "https://www.geeksforgeeks.org/problems/find-missing-and-repeating2512/" },
        { id: "d2p6", title: "Inversion of Array (Pre-req: Merge Sort)", link: "https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/" },
    ]
  },
  {
    topicName: "Day 3: Arrays Part-III",
    problems: [
        { id: "d3p1", title: "Search in a 2D Matrix", link: "https://leetcode.com/problems/search-a-2d-matrix/" },
        { id: "d3p2", title: "Pow(x, n)", link: "https://leetcode.com/problems/powx-n/" },
        { id: "d3p3", title: "Majority Element (>N/2 times)", link: "https://leetcode.com/problems/majority-element/" },
        { id: "d3p4", title: "Majority Element II (>N/3 times)", link: "https://leetcode.com/problems/majority-element-ii/" },
        { id: "d3p5", title: "Grid Unique Paths", link: "https://leetcode.com/problems/unique-paths/" },
        { id: "d3p6", title: "Reverse Pairs (Pre-req: Merge Sort)", link: "https://leetcode.com/problems/reverse-pairs/" },
    ]
  },
  {
    topicName: "Day 4: Arrays Part-IV",
    problems: [
      { id: "d4p1", title: "2-Sum Problem", link: "https://leetcode.com/problems/two-sum/" },
      { id: "d4p2", title: "4-Sum Problem", link: "https://leetcode.com/problems/4sum/" },
      { id: "d4p3", title: "Longest Consecutive Sequence", link: "https://leetcode.com/problems/longest-consecutive-sequence/" },
      { id: "d4p4", title: "Largest subarray with 0 sum", link: "https://www.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1" },
      { id: "d4p5", title: "Count number of subarrays with given Xor K", link: "https://www.geeksforgeeks.org/problems/subarrays-with-xor-k/1" },
      { id: "d4p6", title: "Longest Substring without repeat", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    ]
  },
  {
    topicName: "Day 5: Linked List",
    problems: [
      { id: "d5p1", title: "Reverse a LinkedList", link: "https://leetcode.com/problems/reverse-linked-list/" },
      { id: "d5p2", title: "Find the middle of a LinkedList", link: "https://leetcode.com/problems/middle-of-the-linked-list/" },
      { id: "d5p3", title: "Merge two sorted Linked Lists", link: "https://leetcode.com/problems/merge-two-sorted-lists/" },
      { id: "d5p4", title: "Remove N-th node from back of LinkedList", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
      { id: "d5p5", title: "Add two numbers as a LinkedList", link: "https://leetcode.com/problems/add-two-numbers/" },
      { id: "d5p6", title: "Delete a given Node in a LinkedList", link: "https://leetcode.com/problems/delete-node-in-a-linked-list/" },
    ]
  },
  {
    topicName: "Day 6: Linked List Part-II",
    problems: [
        { id: "d6p1", title: "Find intersection point of two Linked Lists", link: "https://leetcode.com/problems/intersection-of-two-linked-lists/" },
        { id: "d6p2", title: "Detect a cycle in a Linked List", link: "https://leetcode.com/problems/linked-list-cycle/" },
        { id: "d6p3", title: "Reverse a LinkedList in groups of size k", link: "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
        { id: "d6p4", title: "Check if a LinkedList is palindrome or not", link: "https://leetcode.com/problems/palindrome-linked-list/" },
        { id: "d6p5", title: "Find the starting point of the Loop of a LinkedList", link: "https://leetcode.com/problems/linked-list-cycle-ii/" },
        { id: "d6p6", title: "Flattening of a LinkedList", link: "https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1" },
    ]
  },
  {
    topicName: "Day 7: Two pointer approach",
    problems: [
      { id: "d7p1", title: "3 Sum", link: "https://leetcode.com/problems/3sum/" },
      { id: "d7p2", title: "Trapping Rain Water", link: "https://leetcode.com/problems/trapping-rain-water/" },
      { id: "d7p3", title: "Remove Duplicates from Sorted Array", link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
      { id: "d7p4", title: "Max Consecutive Ones", link: "https://leetcode.com/problems/max-consecutive-ones/" },
    ]
  },
  {
    topicName: "Day 8: Greedy",
    problems: [
      { id: "d8p1", title: "N meetings in one room", link: "https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1" },
      { id: "d8p2", title: "Minimum number of platforms required for a railway", link: "https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1" },
      { id: "d8p3", title: "Job Sequencing Problem", link: "https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1" },
      { id: "d8p4", title: "Fractional Knapsack", link: "https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1" },
    ]
  },
  {
    topicName: "Day 9: Recursion",
    problems: [
      { id: "d9p1", title: "Subset Sums", link: "https://www.geeksforgeeks.org/problems/subset-sums2234/1" },
      { id: "d9p2", title: "Combination Sum", link: "https://leetcode.com/problems/combination-sum/" },
      { id: "d9p3", title: "Combination Sum II", link: "https://leetcode.com/problems/combination-sum-ii/" },
      { id: "d9p4", title: "Palindrome Partitioning", link: "https://leetcode.com/problems/palindrome-partitioning/" },
    ]
  },
  {
    topicName: "Day 10: Backtracking",
    problems: [
      { id: "d10p1", title: "Permutations", link: "https://leetcode.com/problems/permutations/" },
      { id: "d10p2", title: "N-Queens", link: "https://leetcode.com/problems/n-queens/" },
      { id: "d10p3", title: "Sudoku Solver", link: "https://leetcode.com/problems/sudoku-solver/" },
      { id: "d10p4", title: "Rat in a Maze", link: "https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1" },
    ]
  },
  {
    topicName: "Day 11: Binary Search",
    problems: [
      { id: "d11p1", title: "The N-th root of an integer", link: "https://www.geeksforgeeks.org/problems/find-nth-root-of-m5843/1" },
      { id: "d11p2", title: "Median of two sorted arrays", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
      { id: "d11p3", title: "Single Element in a Sorted Array", link: "https://leetcode.com/problems/single-element-in-a-sorted-array/" },
      { id: "d11p4", title: "Search in Rotated Sorted Array", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
    ]
  },
];


export const loveBabbarDsaSheetTopics: SdeTopic[] = [
  {
    topicName: "Arrays",
    problems: [
      { id: "lb1p1", title: "Reverse the array", link: "https://www.geeksforgeeks.org/problems/reverse-a-string/1" },
      { id: "lb1p2", title: "Find the maximum and minimum element in an array", link: "https://www.geeksforgeeks.org/problems/find-minimum-and-maximum-element-in-an-array4428/1" },
      { id: "lb1p3", title: "Find the 'Kth' max and min element of an array", link: "https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1" },
      { id: "lb1p4", title: "Sort an array of 0s, 1s and 2s", link: "https://leetcode.com/problems/sort-colors/" },
      { id: "lb1p5", title: "Move all the negative elements to one side of the array", link: "https://www.geeksforgeeks.org/problems/move-all-negative-elements-to-end1813/1" },
      { id: "lb1p6", title: "Find the Union and Intersection of the two sorted arrays", link: "https://www.geeksforgeeks.org/problems/union-of-two-sorted-arrays-1587115621/1" },
      { id: "lb1p7", title: "Cyclically rotate an array by one", link: "https://www.geeksforgeeks.org/problems/cyclically-rotate-an-array-by-one2614/1" },
      { id: "lb1p8", title: "Find Largest sum contiguous Subarray (Kadane's)", link: "https://leetcode.com/problems/maximum-subarray/" },
      { id: "lb1p9", title: "Minimize the Heights II", link: "https://www.geeksforgeeks.org/problems/minimize-the-heights3351/1" },
      { id: "lb1p10", title: "Minimum number of jumps", link: "https://leetcode.com/problems/jump-game/" },
      { id: "lb1p11", title: "Find the Duplicate Number", link: "https://leetcode.com/problems/find-the-duplicate-number/" },
      { id: "lb1p12", title: "Merge Without Extra Space", link: "https://www.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/1" },
      { id: "lb1p13", title: "Kadane's Algorithm", link: "https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1" },
      { id: "lb1p14", title: "Merge Intervals", link: "https://leetcode.com/problems/merge-intervals/" },
      { id: "lb1p15", title: "Next Permutation", link: "https://leetcode.com/problems/next-permutation/" },
      { id: "lb1p16", title: "Count Inversions", link: "https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1" },
      { id: "lb1p17", title: "Best Time to Buy and Sell Stock", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      { id: "lb1p18", title: "Count pairs with given sum", link: "https://www.geeksforgeeks.org/problems/count-pairs-with-given-sum1546/1" },
      { id: "lb1p19", title: "Common elements", link: "https://www.geeksforgeeks.org/problems/common-elements1132/1" },
      { id: "lb1p20", title: "Rearrange array in alternating positive & negative items", link: "https://www.geeksforgeeks.org/problems/array-of-alternate-ve-and-ve-nos1401/1" },
      { id: "lb1p21", title: "Subarray with 0 sum", link: "https://www.geeksforgeeks.org/problems/subarray-with-0-sum-1587115621/1" },
      { id: "lb1p22", title: "Factorials of large numbers", link: "https://www.geeksforgeeks.org/problems/factorials-of-large-numbers2508/1" },
      { id: "lb1p23", title: "Maximum Product Subarray", link: "https://leetcode.com/problems/maximum-product-subarray/" },
      { id: "lb1p24", title: "Longest consecutive subsequence", link: "https://leetcode.com/problems/longest-consecutive-sequence/" },
      { id: "lb1p25", title: "Maximum profit by buying and selling a share at most twice", link: "https://www.geeksforgeeks.org/problems/buy-and-sell-a-stock-at-most-twice/1" },
      { id: "lb1p26", title: "Array Subset of another array", link: "https://www.geeksforgeeks.org/problems/array-subset-of-another-array2317/1" },
      { id: "lb1p27", title: "Triplet Sum in Array", link: "https://www.geeksforgeeks.org/problems/triplet-sum-in-array-1587115621/1" },
      { id: "lb1p28", title: "Trapping Rain Water", link: "https://leetcode.com/problems/trapping-rain-water/" },
      { id: "lb1p29", title: "Chocolate Distribution Problem", link: "https://www.geeksforgeeks.org/problems/chocolate-distribution-problem3825/1" },
      { id: "lb1p30", title: "Smallest subarray with sum greater than x", link: "https://www.geeksforgeeks.org/problems/smallest-subarray-with-sum-greater-than-x5651/1" },
      { id: "lb1p31", title: "Three way partitioning", link: "https://www.geeksforgeeks.org/problems/three-way-partitioning/1" },
      { id: "lb1p32", title: "Minimum Swaps to Sort", link: "https://www.geeksforgeeks.org/problems/minimum-swaps/1" },
    ],
  },
  {
    topicName: "Matrix",
    problems: [
        { id: "lb2p1", title: "Spiral traversal on a Matrix", link: "https://leetcode.com/problems/spiral-matrix/" },
        { id: "lb2p2", title: "Search an element in a matriix", link: "https://leetcode.com/problems/search-a-2d-matrix/" },
        { id: "lb2p3", title: "Find median in a row wise sorted matrix", link: "https://www.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1" },
        { id: "lb2p4", title: "Find row with maximum no. of 1's", link: "https://www.geeksforgeeks.org/problems/row-with-max-1s0023/1" },
        { id: "lb2p5", title: "Print elements in sorted order using row-column wise sorted matrix", link: "https://www.geeksforgeeks.org/problems/sorted-matrix2326/1" },
        { id: "lb2p6", title: "Maximum size rectangle", link: "https://leetcode.com/problems/maximal-rectangle/" },
        { id: "lb2p7", title: "Rotate Image", link: "https://leetcode.com/problems/rotate-image/" },
        { id: "lb2p8", title: "Common elements in all rows of a given matrix", link: "https://www.geeksforgeeks.org/problems/common-elements1132/1" },
        { id: "lb2p9", title: "Kth smallest element in a row-wise and column-wise sorted matrix", link: "https://www.geeksforgeeks.org/problems/kth-element-in-matrix/1" },
    ]
  },
  {
    topicName: "String",
    problems: [
        { id: "lb3p1", title: "Reverse a String", link: "https://leetcode.com/problems/reverse-string/" },
        { id: "lb3p2", title: "Check whether a String is Palindrome or not", link: "https://leetcode.com/problems/valid-palindrome/" },
        { id: "lb3p3", title: "Find Duplicate characters in a string", link: "https://www.geeksforgeeks.org/problems/duplicate-characters-in-a-string/1" },
        { id: "lb3p4", title: "Write a Code to check if two strings are Anagrams of each other", link: "https://leetcode.com/problems/valid-anagram/" },
        { id: "lb3p5", title: "Longest Repeating Subsequence", link: "https://www.geeksforgeeks.org/problems/longest-repeating-subsequence/1" },
        { id: "lb3p6", title: "Print all Subsequences of a string", link: "https://www.geeksforgeeks.org/problems/power-set4302/1" },
        { id: "lb3p7", title: "Longest Palindromic Substring", link: "https://leetcode.com/problems/longest-palindromic-substring/" },
        { id: "lb3p8", title: "String to Integer (atoi)", link: "https://leetcode.com/problems/string-to-integer-atoi/" },
        { id: "lb3p9", title: "Longest Repeating Character Replacement", link: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
        { id: "lb3p10", title: "Group Anagrams", link: "https://leetcode.com/problems/group-anagrams/" },
        { id: "lb3p11", title: "Implement strstr", link: "https://www.geeksforgeeks.org/problems/implement-strstr/1" },
        { id: "lb3p12", title: "Rabin-Karp Algorithm", link: "https://www.geeksforgeeks.org/problems/rabin-karp-pattern-searching/1" },
        { id: "lb3p13", title: "KMP Algorithm", link: "https://www.geeksforgeeks.org/problems/kmp-pattern-searching/1" },
        { id: "lb3p14", title: "Minimum characters to be added at front to make string palindrome", link: "https://www.geeksforgeeks.org/problems/minimum-characters-to-be-added-at-front-to-make-string-palindrome/1" },
        { id: "lb3p15", title: "Smallest window in a string containing all the characters of another string", link: "https://leetcode.com/problems/minimum-window-substring/" },
        { id: "lb3p16", title: "Generate Parentheses", link: "https://leetcode.com/problems/generate-parentheses/" },
    ]
  },
  {
    topicName: "Searching & Sorting",
    problems: [
        { id: "lb4p1", title: "Find first and last occurrences of an element in a sorted array", link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/" },
        { id: "lb4p2", title: "Find a Fixed Point (Value equal to index) in a given array", link: "https://www.geeksforgeeks.org/problems/value-equal-to-index-value1330/1" },
        { id: "lb4p3", title: "Search in a Rotated Sorted Array", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
        { id: "lb4p4", title: "Square root of an integer", link: "https://leetcode.com/problems/sqrtx/" },
        { id: "lb4p5", title: "Find a pair with a given difference", link: "https://www.geeksforgeeks.org/problems/find-pair-given-difference1559/1" },
        { id: "lb4p6", title: "Merge two sorted arrays", link: "https://leetcode.com/problems/merge-sorted-array/" },
        { id: "lb4p7", title: "Product array puzzle", link: "https://www.geeksforgeeks.org/problems/product-array-puzzle4525/1" },
        { id: "lb4p8", title: "Sort by Set Bit Count", link: "https://www.geeksforgeeks.org/problems/sort-by-set-bit-count1158/1" },
        { id: "lb4p9", title: "Find four elements that sum to a given value", link: "https://leetcode.com/problems/4sum/" },
        { id: "lb4p10", title: "Stickler Thief", link: "https://www.geeksforgeeks.org/problems/stickler-theif-1587115621/1" },
        { id: "lb4p11", title: "Aggressive Cows", link: "https://www.spoj.com/problems/AGGRCOW/" },
        { id: "lb4p12", title: "Book Allocation Problem", link: "https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages/1" },
        { id: "lb4p13", title: "EKO - Eko", link: "https://www.spoj.com/problems/EKO/" },
        { id: "lb4p14", title: "Painters Partition Problem", link: "https://www.geeksforgeeks.org/problems/the-painters-partition-problem1535/1" },
    ],
  },
  {
    topicName: "Linked List",
    problems: [
        { id: "lb5p1", title: "Reverse a Linked List in groups of given size", link: "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
        { id: "lb5p2", title: "Detect Loop in a linked list", link: "https://leetcode.com/problems/linked-list-cycle/" },
        { id: "lb5p3", title: "Remove Loop in a linked list", link: "https://www.geeksforgeeks.org/problems/remove-loop-in-linked-list/1" },
        { id: "lb5p4", title: "Find the starting point of the loop", link: "https://leetcode.com/problems/linked-list-cycle-ii/" },
        { id: "lb5p5", title: "Move last element to front of a given Linked List", link: "https://www.geeksforgeeks.org/problems/move-last-element-to-front-of-a-given-linked-list/1" },
        { id: "lb5p6", title: "Add 1 to a number represented as linked list", link: "https://www.geeksforgeeks.org/problems/add-1-to-a-number-represented-as-linked-list/1" },
        { id: "lb5p7", title: "Intersection of two sorted Linked Lists", link: "https://www.geeksforgeeks.org/problems/intersection-of-two-sorted-linked-lists/1" },
        { id: "lb5p8", title: "Merge K sorted linked lists", link: "https://leetcode.com/problems/merge-k-sorted-lists/" },
        { id: "lb5p9", title: "Flattening a Linked List", link: "https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1" },
        { id: "lb5p10", title: "Rotate a Linked List", link: "https://www.geeksforgeeks.org/problems/rotate-a-linked-list/1" },
        { id: "lb5p11", title: "Clone a linked list with next and random pointer", link: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
        { id: "lb5p12", title: "LRU Cache", link: "https://leetcode.com/problems/lru-cache/" },
    ],
  },
    {
    topicName: "Stacks & Queues",
    problems: [
        { id: "lb6p1", title: "Implement Stack from scratch", link: "https://www.geeksforgeeks.org/problems/implement-stack-using-array/1" },
        { id: "lb6p2", title: "Implement Queue from scratch", link: "https://www.geeksforgeeks.org/problems/implement-queue-using-array/1" },
        { id: "lb6p3", title: "Implement 2 Stacks in an array", link: "https://www.geeksforgeeks.org/problems/implement-two-stacks-in-an-array/1" },
        { id: "lb6p4", title: "Find the middle element of a stack", link: "https://www.geeksforgeeks.org/problems/delete-middle-element-of-a-stack/1" },
        { id: "lb6p5", title: "Implement Stack using Queues", link: "https://leetcode.com/problems/implement-stack-using-queues/" },
        { id: "lb6p6", title: "Valid Parentheses", link: "https://leetcode.com/problems/valid-parentheses/" },
        { id: "lb6p7", title: "Next Greater Element", link: "https://leetcode.com/problems/next-greater-element-i/" },
        { id: "lb6p8", title: "The Celebrity Problem", link: "https://www.geeksforgeeks.org/problems/the-celebrity-problem/1" },
        { id: "lb6p9", title: "Largest Rectangle in Histogram", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
        { id: "lb6p10", title: "Rotting Oranges", link: "https://leetcode.com/problems/rotting-oranges/" },
        { id: "lb6p11", title: "Implement a Deque", link: "https://www.geeksforgeeks.org/problems/deque-implementations/1" },
        { id: "lb6p12", title: "Stack using two queues", link: "https://www.geeksforgeeks.org/problems/stack-using-two-queues/1" },
        { id: "lb6p13", title: "Queue using two Stacks", link: "https://www.geeksforgeeks.org/problems/queue-using-two-stacks/1" },
        { id: "lb6p14", title: "First non-repeating character in a stream", link: "https://www.geeksforgeeks.org/problems/first-non-repeating-character-in-a-stream1216/1" },
    ]
  },
  {
    topicName: "Binary Trees",
    problems: [
        { id: "lb7p1", title: "Level order traversal", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
        { id: "lb7p2", title: "Reverse Level Order traversal", link: "https://www.geeksforgeeks.org/problems/reverse-level-order-traversal/1" },
        { id: "lb7p3", title: "Height of a tree", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
        { id: "lb7p4", title: "Diameter of a tree", link: "https://leetcode.com/problems/diameter-of-binary-tree/" },
        { id: "lb7p5", title: "Check for Balanced Tree", link: "https://leetcode.com/problems/balanced-binary-tree/" },
        { id: "lb7p6", title: "Inorder Traversal", link: "https://leetcode.com/problems/binary-tree-inorder-traversal/" },
        { id: "lb7p7", title: "Preorder Traversal", link: "https://leetcode.com/problems/binary-tree-preorder-traversal/" },
        { id: "lb7p8", title: "Postorder Traversal", link: "https://leetcode.com/problems/binary-tree-postorder-traversal/" },
        { id: "lb7p9", title: "Left View of a tree", link: "https://www.geeksforgeeks.org/problems/left-view-of-binary-tree/1" },
        { id: "lb7p10", title: "Right View of a tree", link: "https://www.geeksforgeeks.org/problems/right-view-of-binary-tree/1" },
        { id: "lb7p11", title: "Top View of a tree", link: "https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1" },
        { id: "lb7p12", title: "Bottom View of a tree", link: "https://www.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1" },
        { id: "lb7p13", title: "Zig-Zag traversal of a binary tree", link: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/" },
        { id: "lb7p14", title: "Boundary traversal of a binary tree", link: "https://www.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1" },
        { id: "lb7p15", title: "Construct Binary Tree from String with bracket representation", link: "https://www.geeksforgeeks.org/problems/construct-binary-tree-from-string-with-bracket-representation/1" },
        { id: "lb7p16", title: "Convert Binary Tree to Doubly Linked List", link: "https://www.geeksforgeeks.org/problems/binary-tree-to-dll/1" },
        { id: "lb7p17", title: "Lowest Common Ancestor in a Binary Tree", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/" },
    ]
  },
  {
    topicName: "Binary Search Trees",
    problems: [
        { id: "lb8p1", title: "Find a value in a BST", link: "https://leetcode.com/problems/search-in-a-binary-search-tree/" },
        { id: "lb8p2", title: "Deletion of a node in a BST", link: "https://leetcode.com/problems/delete-node-in-a-bst/" },
        { id: "lb8p3", title: "Find min and max value in a BST", link: "https://www.geeksforgeeks.org/problems/minimum-element-in-bst/1" },
        { id: "lb8p4", "title": "Check if a tree is a BST or not", link: "https://leetcode.com/problems/validate-binary-search-tree/" },
        { id: "lb8p5", title: "Lowest Common Ancestor of a BST", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
        { id: "lb8p6", title: "Construct BST from preorder traversal", link: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/" },
        { id: "lb8p7", title: "Convert a normal BST to Balanced BST", link: "https://www.geeksforgeeks.org/problems/normal-bst-to-balanced-bst/1" },
        { id: "lb8p8", title: "Kth largest element in BST", link: "https://www.geeksforgeeks.org/problems/kth-largest-element-in-bst/1" },
        { id: "lb8p9", title: "Kth smallest element in BST", link: "https://www.geeksforgeeks.org/problems/kth-smallest-element-in-bst/1" },
        { id: "lb8p10", title: "Merge two BSTs", link: "https://www.geeksforgeeks.org/problems/merge-two-bst-s/1" },
        { id: "lb8p11", title: "Find the inorder predecessor/successor of a given Key in BST.", link: "https://www.geeksforgeeks.org/problems/predecessor-and-successor/1" },
    ]
  },
  {
    topicName: "Greedy",
    problems: [
        { id: "lb9p1", title: "Activity Selection Problem", link: "https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1" },
        { id: "lb9p2", title: "Job Sequencing Problem", link: "https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1" },
        { id: "lb9p3", title: "Huffman Coding", link: "https://www.geeksforgeeks.org/problems/huffman-encoding/0" },
        { id: "lb9p4", title: "Water Connection Problem", link: "https://www.geeksforgeeks.org/problems/water-connection-problem/0" },
        { id: "lb9p5", title: "Fractional Knapsack Problem", link: "https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1" },
        { id: "lb9p6", title: "Minimum Platforms", link: "https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1" },
        { id: "lb9p7", title: "Shop in Candy Store", link: "https://www.geeksforgeeks.org/problems/shop-in-candy-store/0" },
        { id: "lb9p8", title: "Gas Station", link: "https://leetcode.com/problems/gas-station/" },
        { id: "lb9p9", title: "DEFKIN - Defense of a Kingdom", link: "https://www.spoj.com/problems/DEFKIN/" },
        { id: "lb9p10", title: "Minimum Cost of ropes", link: "https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes/1" },
    ]
  },
  {
    topicName: "Backtracking",
    problems: [
        { id: "lb10p1", title: "Rat in a maze Problem", link: "https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1" },
        { id: "lb10p2", title: "N-Queen Problem", link: "https://leetcode.com/problems/n-queens/" },
        { id: "lb10p3", title: "Word Break Problem", link: "https://www.geeksforgeeks.org/problems/word-break-part-2/0" },
        { id: "lb10p4", title: "Remove Invalid Parentheses", link: "https://leetcode.com/problems/remove-invalid-parentheses/" },
        { id: "lb10p5", title: "Sudoku Solver", link: "https://leetcode.com/problems/sudoku-solver/" },
        { id: "lb10p6", title: "Permutations of a given string", link: "https://www.geeksforgeeks.org/problems/permutations-of-a-given-string/0" },
        { id: "lb10p7", title: "Combination Sum", link: "https://leetcode.com/problems/combination-sum/" },
        { id: "lb10p8", title: "Largest number in K swaps", link: "https://www.geeksforgeeks.org/problems/largest-number-in-k-swaps/0" },
        { id: "lb10p9", title: "M-Coloring Problem", link: "https://www.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1" },
        { id: "lb10p10", title: "Find all possible palindromic partitions of a String", link: "https://www.geeksforgeeks.org/problems/find-all-possible-palindromic-partitions-of-a-string/1" },
    ]
  },
  {
    topicName: "Dynamic Programming",
    problems: [
        { id: "lb11p1", title: "Coin Change Problem", link: "https://leetcode.com/problems/coin-change/" },
        { id: "lb11p2", title: "0-1 Knapsack Problem", link: "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem/0" },
        { id: "lb11p3", title: "Edit Distance", link: "https://leetcode.com/problems/edit-distance/" },
        { id: "lb11p4", title: "Longest Common Subsequence", link: "https://leetcode.com/problems/longest-common-subsequence/" },
        { id: "lb11p5", title: "Longest Increasing Subsequence", link: "https://leetcode.com/problems/longest-increasing-subsequence/" },
        { id: "lb11p6", title: "Matrix Chain Multiplication", link: "https://www.geeksforgeeks.org/problems/matrix-chain-multiplication/0" },
        { id: "lb11p7", title: "Word Wrap", link: "https://www.geeksforgeeks.org/problems/word-wrap/0" },
        { id: "lb11p8", title: "Climbing Stairs", link: "https://leetcode.com/problems/climbing-stairs/" },
        { id: "lb11p9", title: "Maximum sum increasing subsequence", link: "https://www.geeksforgeeks.org/problems/maximum-sum-increasing-subsequence/0" },
        { id: "lb11p10", title: "Longest Common Substring", link: "https://www.geeksforgeeks.org/problems/longest-common-substring/0" },
        { id: "lb11p11", title: "Subset Sum Problem", link: "https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1" },
        { id: "lb11p12", title: "Partition Equal Subset Sum", link: "https://leetcode.com/problems/partition-equal-subset-sum/" },
        { id: "lb11p13", title: "Rod Cutting", link: "https://www.geeksforgeeks.org/problems/rod-cutting/0" },
        { id: "lb11p14", title: "Egg Dropping Puzzle", link: "https://www.geeksforgeeks.org/problems/egg-dropping-puzzle/0" },
        { id: "lb11p15", title: "Word Break", link: "https://leetcode.com/problems/word-break/" },
        { id: "lb11p16", title: "Palindrome Partitioning", link: "https://leetcode.com/problems/palindrome-partitioning-ii/" },
        { id: "lb11p17", title: "Optimal Strategy for a Game", link: "https://www.geeksforgeeks.org/problems/optimal-strategy-for-a-game/0" },
        { id: "lb11p18", title: "Boolean Parenthesization", link: "https://www.geeksforgeeks.org/problems/boolean-parenthesization/0" },
        { id: "lb11p19", title: "Mobile numeric keypad", link: "https://www.geeksforgeeks.org/problems/mobile-numeric-keypad/0" },
        { id: "lb11p20", title: "Gold Mine Problem", link: "https://www.geeksforgeeks.org/problems/gold-mine-problem/0" },
    ]
  }
];
