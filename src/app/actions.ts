
'use server';
import { executeCode } from '@/ai/flows/compiler';
import { getStreakTips } from '@/ai/flows/streak';
import type { CodeExecutionRequest, CodeExecutionResponse, Student, Problem, Mentor, StudentProblem } from '@/lib/types';
import { 
    students,
    problems,
    mentors,
    studentProblems,
    findStudentById,
    findStudentByUsername,
    addStudent as addLocalStudent,
    removeStudent as removeLocalStudent,
    addProblem as addLocalProblem,
    setProblemSolved as setLocalProblemSolved,
    findMentorByUsername
} from '@/lib/data';

export async function getStreakTipsAction() {
    return await getStreakTips();
}

export async function executeCodeAction(request: CodeExecutionRequest): Promise<CodeExecutionResponse> {
    return await executeCode(request);
}

// --- Local Data Actions ---

// Student Actions
export async function getStudentById(studentId: string): Promise<Student | null> {
    const student = findStudentById(studentId);
    return student ? { ...student } : null; // Return a copy
}

export async function getAllStudents(): Promise<Student[]> {
    return JSON.parse(JSON.stringify(students)); // Return a deep copy
}

export async function getStudentForLogin(username: string, password: string):Promise<Student | null> {
    const student = findStudentByUsername(username);
    if (student && student.password === password) {
        return { ...student };
    }
    return null;
}

export async function addStudent(studentData: Omit<Student, 'id' | 'created_at' | 'solvedData' | 'totalSolved' | 'streak' | 'badges'>): Promise<Student | null> {
    const newStudent = addLocalStudent(studentData);
    return { ...newStudent };
}

export async function removeStudent(studentId: string): Promise<boolean> {
    return removeLocalStudent(studentId);
}

// Problem Actions
export async function getAllProblems(): Promise<Problem[]> {
    return JSON.parse(JSON.stringify(problems)); // Return a deep copy
}

export async function getStudentProblems(studentId: string): Promise<StudentProblem[]> {
    const solvedProblemLinks = studentProblems.filter(sp => sp.student_id === studentId);
    const solvedProblemIds = new Set(solvedProblemLinks.map(link => link.problem_id));
    
    return problems.map(problem => ({
        problem: { ...problem },
        isSolved: solvedProblemIds.has(problem.id)
    }));
}


export async function addProblem(problemData: Omit<Problem, 'id' | 'created_at'>): Promise<Problem | null> {
    const newProblem = addLocalProblem(problemData);
    return { ...newProblem };
}

export async function setProblemSolvedStatus(studentId: string, problemId: string, isSolved: boolean): Promise<boolean> {
    return setLocalProblemSolved(studentId, problemId, isSolved);
}


// Mentor Actions
export async function getMentorForLogin(username: string, password: string):Promise<Mentor | null> {
    const mentor = findMentorByUsername(username);
     if (mentor && mentor.password === password) {
        return { ...mentor };
    }
    return null;
}
