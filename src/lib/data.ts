
import type { Student, Problem, Mentor, SolvedData, StudentProblemLink } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { format, subDays, differenceInCalendarDays, parseISO } from 'date-fns';

// Helper to generate some fake historical data
const generateSolvedData = (days: number, maxSolved: number): SolvedData[] => {
    return Array.from({ length: days }).map((_, i) => {
        const date = subDays(new Date(), i);
        const shouldHaveData = Math.random() > 0.4; // 60% chance of having data on a given day
        if (shouldHaveData) {
            return {
                date: format(date, 'yyyy-MM-dd'),
                count: Math.floor(Math.random() * maxSolved) + 1,
            };
        }
        return null;
    }).filter(Boolean).sort((a,b) => new Date(a!.date).getTime() - new Date(b!.date).getTime()) as SolvedData[];
}


export let students: Student[] = [
    {
        id: '1',
        username: 'Alice',
        realName: 'Alice Smith',
        password: 'password123',
        avatarUrl: 'https://placehold.co/100x100.png',
        email: 'alice@example.com',
        leetcodeId: 'alice_smith',
        totalSolved: 88,
        streak: 12,
        badges: 3,
        created_at: new Date().toISOString(),
        solvedData: generateSolvedData(365, 3)
    },
    {
        id: '2',
        username: 'Bob',
        realName: 'Bob Johnson',
        password: 'password123',
        avatarUrl: 'https://placehold.co/100x100.png',
        email: 'bob@example.com',
        leetcodeId: 'bob_johnson',
        totalSolved: 152,
        streak: 29,
        badges: 5,
        created_at: new Date().toISOString(),
        solvedData: generateSolvedData(365, 4)
    },
    {
        id: '3',
        username: 'Charlie',
        realName: 'Charlie Brown',
        password: 'password123',
        avatarUrl: 'https://placehold.co/100x100.png',
        email: 'charlie@example.com',
        leetcodeId: 'charlie_brown',
        totalSolved: 45,
        streak: 3,
        badges: 1,
        created_at: new Date().toISOString(),
        solvedData: generateSolvedData(180, 2)
    }
];

export let problems: Problem[] = [
    {
        id: 'p1',
        title: 'Two Sum',
        platform: 'LeetCode',
        link: 'https://leetcode.com/problems/two-sum/',
        difficulty: 'Easy',
        tags: ['Array', 'Hash Table'],
        created_at: new Date().toISOString()
    },
    {
        id: 'p2',
        title: 'Add Two Numbers',
        platform: 'LeetCode',
        link: 'https://leetcode.com/problems/add-two-numbers/',
        difficulty: 'Medium',
        tags: ['Linked List', 'Math'],
        created_at: new Date().toISOString()
    },
    {
        id: 'p3',
        title: 'Longest Substring Without Repeating Characters',
        platform: 'LeetCode',
        link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        difficulty: 'Medium',
        tags: ['Hash Table', 'String', 'Sliding Window'],
        created_at: new Date().toISOString()
    }
];

export let mentors: Mentor[] = [
    {
        id: 'm1',
        username: 'mentor',
        realName: 'The Mentor',
        password: 'password123',
        created_at: new Date().toISOString(),
    }
];

export let studentProblems: StudentProblemLink[] = [
    { id: 'sp1', student_id: '1', problem_id: 'p1', created_at: new Date().toISOString() },
    { id: 'sp2', student_id: '1', problem_id: 'p2', created_at: new Date().toISOString() },
];

// --- Data Manipulation Functions ---

export function findStudentById(id: string): Student | undefined {
    return students.find(s => s.id === id);
}

export function findStudentByUsername(username: string): Student | undefined {
    return students.find(s => s.username === username);
}

export function findStudentByEmail(email: string): Student | undefined {
    return students.find(s => s.email === email);
}

export function findMentorByUsername(username: string): Mentor | undefined {
    return mentors.find(m => m.username === username);
}

export function addStudent(studentData: Omit<Student, 'id' | 'created_at' | 'solvedData' | 'totalSolved' | 'streak' | 'badges'>): Student {
    const newStudent: Student = {
        id: uuidv4(),
        ...studentData,
        totalSolved: 0,
        streak: 0,
        badges: 0,
        solvedData: [],
        created_at: new Date().toISOString(),
    };
    students.push(newStudent);
    return newStudent;
}

export function removeStudent(studentId: string): boolean {
    const initialLength = students.length;
    students = students.filter(s => s.id !== studentId);
    return students.length < initialLength;
}

export function addProblem(problemData: Omit<Problem, 'id' | 'created_at'>): Problem {
    const newProblem: Problem = {
        id: uuidv4(),
        ...problemData,
        created_at: new Date().toISOString()
    };
    problems.push(newProblem);
    return newProblem;
}

// Recalculates streak based on sorted solvedData
const calculateStreak = (solvedData: SolvedData[]): number => {
    if (solvedData.length === 0) return 0;

    const today = new Date();
    const sortedDates = solvedData.map(d => parseISO(d.date)).sort((a,b) => b.getTime() - a.getTime());

    let streak = 0;
    let lastDate = today;

    // Check if there is a solve today or yesterday to start the streak
    const lastSolveDiff = differenceInCalendarDays(today, sortedDates[0]);
    if (lastSolveDiff > 1) return 0; // No activity today or yesterday, streak is 0.
    
    // Account for if the last solve was today or yesterday
    streak = 1;
    lastDate = sortedDates[0];

    for (let i = 1; i < sortedDates.length; i++) {
        const diff = differenceInCalendarDays(lastDate, sortedDates[i]);
        if (diff === 1) {
            streak++;
            lastDate = sortedDates[i];
        } else if (diff > 1) {
            break; // Gap in days, streak ends.
        }
        // if diff is 0, it's the same day, continue.
    }
    
    return streak;
};

// Central function to update all student stats.
function updateStudentStats(student: Student, solved: boolean) {
    if (solved) {
        student.totalSolved++;
    } else {
        student.totalSolved = Math.max(0, student.totalSolved - 1);
    }
    
    // Update solvedData for today
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    let todayData = student.solvedData.find(d => d.date === todayStr);

    if (solved) {
        if (todayData) {
            todayData.count++;
        } else {
            student.solvedData.push({ date: todayStr, count: 1 });
        }
    } else {
        if (todayData) {
            todayData.count--;
            if (todayData.count <= 0) {
                // Remove the entry if count is 0 or less
                student.solvedData = student.solvedData.filter(d => d.date !== todayStr);
            }
        }
    }

    // Sort data by date before calculating streak
    student.solvedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Recalculate streak
    student.streak = calculateStreak(student.solvedData);
}

// This function is for SDE sheets and Problem Sets, where we just need to update stats, not track specific problems.
export function updateStudentProgress(studentId: string, solved: boolean): boolean {
    const student = findStudentById(studentId);
    if (!student) return false;

    updateStudentStats(student, solved);
    return true;
}


export function setAssignedProblemSolved(studentId: string, problemId: string, isSolved: boolean): boolean {
    const student = findStudentById(studentId);
    if (!student) return false;

    const linkExists = studentProblems.some(sp => sp.student_id === studentId && sp.problem_id === problemId);

    if (isSolved && !linkExists) {
        studentProblems.push({
            id: uuidv4(),
            student_id: studentId,
            problem_id: problemId,
            created_at: new Date().toISOString()
        });
        updateStudentStats(student, true);
    } else if (!isSolved && linkExists) {
        studentProblems = studentProblems.filter(sp => !(sp.student_id === studentId && sp.problem_id === problemId));
        updateStudentStats(student, false);
    }

    return true;
}
