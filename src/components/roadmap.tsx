
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Map, GitBranch, Binary, BrainCircuit, Bot } from 'lucide-react';

const roadmapData = [
  {
    title: 'Phase 1: Foundations',
    icon: GitBranch,
    description: 'Master the building blocks of programming and problem-solving.',
    topics: [
      {
        name: 'Basic Programming Concepts',
        details: 'Variables, data types, loops, conditionals, functions. Pick a language like Python, Java, or C++ and get comfortable with its syntax.',
      },
      {
        name: 'Complexity Analysis',
        details: 'Understand Big O, Big Omega, and Big Theta notation. Learn to analyze the time and space complexity of your code.',
      },
      {
        name: 'Arrays & Strings',
        details: 'Learn to manipulate arrays and strings. Practice problems involving sorting, searching, two pointers, and sliding windows.',
      },
    ],
  },
  {
    title: 'Phase 2: Core Data Structures',
    icon: Binary,
    description: 'Learn the essential data structures used in almost every tech interview.',
    topics: [
      {
        name: 'Linked Lists',
        details: 'Singly, Doubly, and Circular Linked Lists. Practice reversal, cycle detection, and merging.',
      },
      {
        name: 'Stacks & Queues',
        details: 'Understand LIFO and FIFO principles. Implement them using arrays or linked lists and solve problems like valid parentheses and BFS.',
      },
      {
        name: 'Trees (Binary & BST)',
        details: 'Learn about traversals (Inorder, Preorder, Postorder, Level Order), properties of Binary Search Trees (BST), and solving problems recursively.',
      },
      {
        name: 'Heaps / Priority Queues',
        details: 'Understand Min-Heap and Max-Heap. Use them for problems involving finding Kth largest/smallest elements and scheduling.',
      },
      {
        name: 'Hash Tables (Hash Maps & Sets)',
        details: 'The most important data structure for interviews. Master its O(1) average time complexity for lookups, insertions, and deletions.',
      },
    ],
  },
  {
    title: 'Phase 3: Advanced Topics',
    icon: BrainCircuit,
    description: 'Tackle more complex data structures and algorithms.',
    topics: [
      {
        name: 'Graphs',
        details: 'Learn graph representations (Adjacency List/Matrix). Master traversal algorithms like Breadth-First Search (BFS) and Depth-First Search (DFS).',
      },
      {
        name: 'Advanced Trees (Tries, AVLs)',
        details: 'Explore Tries (Prefix Trees) for string problems and understand the concepts behind self-balancing trees like AVL trees.',
      },
      {
        name: 'Backtracking',
        details: 'A powerful recursive technique for solving problems like N-Queens, Sudoku, and generating subsets/permutations.',
      },
      {
        name: 'Greedy Algorithms',
        details: 'Learn when to make the locally optimal choice to find a global optimum. Problems include scheduling, Huffman coding, and Dijkstra\'s algorithm (as a greedy approach).',
      },
    ],
  },
  {
    title: 'Phase 4: Dynamic Programming & Beyond',
    icon: Bot,
    description: 'Unlock the ability to solve the toughest optimization problems.',
    topics: [
      {
        name: 'Dynamic Programming (DP)',
        details: 'The most feared but powerful topic. Start with identifying DP problems (overlapping subproblems and optimal substructure). Master memoization and tabulation (bottom-up DP).',
      },
       {
        name: 'Advanced Graph Algorithms',
        details: 'Learn Dijkstra\'s Shortest Path, Floyd-Warshall, and Minimum Spanning Tree algorithms (Prim\'s and Kruskal\'s).',
      },
      {
        name: 'Bit Manipulation',
        details: 'Understand how to use bitwise operators (AND, OR, XOR, NOT, shifts) to solve problems efficiently.',
      },
    ],
  },
];


export function Roadmap() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">DSA Learning Roadmap</h1>
        <p className="text-muted-foreground">Your step-by-step guide to mastering Data Structures and Algorithms.</p>
      </div>

      <div className="space-y-8">
        {roadmapData.map((phase, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <phase.icon className="h-6 w-6 text-primary" />
                {phase.title}
              </CardTitle>
              <CardDescription>{phase.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {phase.topics.map((topic, topicIndex) => (
                  <AccordionItem value={`topic-${topicIndex}`} key={topicIndex}>
                    <AccordionTrigger className="text-base">
                      <div className="flex items-center gap-2">
                         <CheckCircle className="h-4 w-4 text-green-500" />
                        {topic.name}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-8 text-muted-foreground">
                      {topic.details}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
