
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
    setAssignedProblemSolved as setLocalAssignedProblemSolved,
    findMentorByUsername,
    updateStudentProgress as localUpdateStudentProgress,
    findStudentByEmail
} from '@/lib/data';
import { 
    getStudentProfile, 
    getStudentByEmail as getFirebaseStudentByEmail,
    getAllStudents as getFirebaseAllStudents,
    updateStudentProgress as updateFirebaseStudentProgress,
    deleteStudentProfile as deleteFirebaseStudentProfile
} from '@/lib/firebase-data';

export async function getStreakTipsAction() {
    return await getStreakTips();
}

export async function executeCodeAction(request: CodeExecutionRequest): Promise<CodeExecutionResponse> {
    return await executeCode(request);
}

// --- Firebase Data Actions ---

// Student Actions
export async function getStudentById(studentId: string): Promise<Student | null> {
    // Try Firebase first, then fallback to local data
    const student = await getStudentProfile(studentId);
    if (student) return student;
    
    // Fallback to local data
    const localStudent = findStudentById(studentId);
    return localStudent ? { ...localStudent } : null;
}

export async function getAllStudents(): Promise<Student[]> {
    // Try Firebase first, then fallback to local data
    try {
        return await getFirebaseAllStudents();
    } catch (error) {
        console.error('Error getting Firebase students, falling back to local:', error);
        return JSON.parse(JSON.stringify(students)); // Return a deep copy
    }
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
    // Try Firebase first, then fallback to local
    try {
        const success = await deleteFirebaseStudentProfile(studentId);
        if (success) return true;
    } catch (error) {
        console.error('Error deleting Firebase student, falling back to local:', error);
    }
    
    // Fallback to local data
    return removeLocalStudent(studentId);
}

// Get detailed student data for mentor view
export async function getDetailedStudentData(studentId: string): Promise<Student | null> {
    // Try Firebase first, then fallback to local data
    const student = await getStudentProfile(studentId);
    if (student) return student;
    
    // Fallback to local data
    const localStudent = findStudentById(studentId);
    return localStudent ? { ...localStudent } : null;
}

// This action is for SDE sheets and Problem Sets where problems aren't formally "assigned"
export async function updateStudentProgress(studentId: string, solved: boolean): Promise<boolean> {
    // Try Firebase first, then fallback to local
    try {
        return await updateFirebaseStudentProgress(studentId, solved);
    } catch (error) {
        console.error('Error updating Firebase progress, falling back to local:', error);
        return localUpdateStudentProgress(studentId, solved);
    }
}

export async function getStudentByEmail(email: string): Promise<Student | null> {
    // Try Firebase first, then fallback to local data
    try {
        const student = await getFirebaseStudentByEmail(email);
        if (student) return student;
    } catch (error) {
        console.error('Error getting Firebase student by email, falling back to local:', error);
    }
    
    // Fallback to local data
    const student = findStudentByEmail(email);
    return student ? { ...student } : null;
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

// This action is specifically for the "Assigned Problems" list.
export async function setProblemSolvedStatus(studentId: string, problemId: string, isSolved: boolean): Promise<boolean> {
    return setLocalAssignedProblemSolved(studentId, problemId, isSolved);
}

// Mentor Actions
export async function getMentorForLogin(username: string, password: string):Promise<Mentor | null> {
    const mentor = findMentorByUsername(username);
     if (mentor && mentor.password === password) {
        return { ...mentor };
    }
    return null;
}
