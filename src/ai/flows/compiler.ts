
'use server';
/**
 * @fileOverview A flow to execute code using the Judge0 API.
 * 
 * - executeCode - A function that takes code, language, and input and returns the output.
 */

import { ai } from '@/ai/genkit';
import type { CodeExecutionRequest, CodeExecutionResponse, Judge0Submission, Judge0SubmissionStatus } from '@/lib/types';
import { CodeExecutionRequestSchema, CodeExecutionResponseSchema } from '@/lib/types';
import axios from 'axios';

const JUDGE0_API_URL = 'https://judge0-ce.eng.unice.fr';

// Helper to map our languages to Judge0's language IDs.
const getLanguageId = (language: string): number => {
    switch (language.toLowerCase()) {
        case 'javascript': return 93; // Node.js
        case 'python': return 92;     // Python 3
        case 'java': return 1004;    // Java (OpenJDK 17)
        case 'c++': return 54;       // C++ (GCC 9.2.0)
        default: return 93; // Default to JavaScript
    }
}

// Helper to decode base64 strings
const decodeBase64 = (str: string | null | undefined): string => {
    if (!str) return '';
    try {
        return Buffer.from(str, 'base64').toString('utf-8');
    } catch (e) {
        return 'Error decoding output.';
    }
}

export async function executeCode(request: CodeExecutionRequest): Promise<CodeExecutionResponse> {
    return executeCodeFlow(request);
}

const executeCodeFlow = ai.defineFlow(
  {
    name: 'executeCodeFlow',
    inputSchema: CodeExecutionRequestSchema,
    outputSchema: CodeExecutionResponseSchema,
  },
  async (request) => {
    try {
      // Step 1: Create a submission
      const createResponse = await axios.post(`${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=false`, {
        language_id: getLanguageId(request.language),
        source_code: Buffer.from(request.code).toString('base64'),
        stdin: Buffer.from(request.stdin || '').toString('base64'),
      });
      
      const { token } = createResponse.data;
      if (!token) {
        return { success: false, error: 'Failed to create submission.' };
      }

      // Step 2: Poll for the result
      let result: Judge0Submission;
      const maxRetries = 10;
      let retries = 0;

      while (retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second

        const getResponse = await axios.get(`${JUDGE0_API_URL}/submissions/${token}?base64_encoded=true&fields=*`);
        result = getResponse.data;
        
        // Statuses: 1-In Queue, 2-Processing. Anything else means it's done.
        if (result.status.id > 2) {
          break;
        }
        retries++;
      }

      const compileErrors = decodeBase64(result!.compile_output);
      const runErrors = decodeBase64(result!.stderr);
      const message = decodeBase64(result!.message);

      if (compileErrors || runErrors || result!.status.id > 3) {
          const fullError = (compileErrors || runErrors || message || 'An unknown execution error occurred.').trim();
          return { success: false, error: fullError };
      }

      const output = decodeBase64(result!.stdout);

      return { success: true, output };
    } catch (e: any) {
      console.error('Error executing code via Judge0 API:', e);
      const errorMsg = e.response?.data?.message || e.message || 'An unexpected error occurred.';
      return { success: false, error: errorMsg };
    }
  }
);
