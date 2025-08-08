
import { z } from 'zod';

// --- Genkit / API Types ---

export const CodeExecutionRequestSchema = z.object({
  language: z.string().describe('The programming language of the code.'),
  code: z.string().describe('The source code to execute.'),
  stdin: z.string().optional().describe('Standard input for the code.'),
});
export type CodeExecutionRequest = z.infer<typeof CodeExecutionRequestSchema>;

export const CodeExecutionResponseSchema = z.object({
  success: z.boolean(),
  output: z.string().optional(),
  error: z.string().optional(),
});
export type CodeExecutionResponse = z.infer<typeof CodeExecutionResponseSchema>;

// Types for Judge0 API
export type Judge0SubmissionStatus = {
    id: number;
    description: string;
}

export type Judge0Submission = {
    token: string;
    stdout: string | null;
    stderr: string | null;
    compile_output: string | null;
    message: string | null;
    status: Judge0SubmissionStatus;
    time: string | null;
    memory: number | null;
}

// --- Local Data Types ---

export type Student = {
    id: string;
    username: string;
    realName: string;
    password: string;
    avatarUrl: string | null;
    leetcodeId?: string;
    email?: string;
    totalSolved: number;
    streak: number;
    badges: number;
    solvedData: SolvedData[];
    created_at: string;
};

export type Problem = {
    id: string;
    title: string;
    platform: string;
    link: string;
    difficulty: string;
    tags: string[] | null;
    created_at: string;
};

export type Mentor = {
    id: string;
    username: string;
    realName: string;
    password: string;
    created_at: string;
};

export type StudentProblemLink = {
    id: string;
    student_id: string;
    problem_id: string;
    created_at: string;
}

// Custom Application Types
export type SolvedData = { date: string; count: number };

export type StudentProblem = {
  problem: Problem;
  isSolved: boolean;
};

export type ProblemSetItem = {
    id: string;
    title: string;
    link: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    topic: string;
    companies: string[];
};

export type AssessmentProblem = {
    id: string;
    title: string;
    link: string;
}

export type Assessment = {
    id: string;
    company: string;
    type: string;
    logoUrl: string;
    timeLimitMinutes: number;
    problems: AssessmentProblem[];
};
