
'use server';
/**
 * @fileOverview A simple flow to get a motivational tip for maintaining a coding streak.
 * 
 * - getStreakTips - A function that returns a coding tip.
 * - GetStreakTipsOutput - The return type for the getStreakTips function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GetStreakTipsOutputSchema = z.object({ 
    success: z.boolean(), 
    tips: z.string().optional(), 
    error: z.string().optional() 
});
export type GetStreakTipsOutput = z.infer<typeof GetStreakTipsOutputSchema>;

export async function getStreakTips(): Promise<GetStreakTipsOutput> {
    return getStreakTipsFlow();
}

const getStreakTipsFlow = ai.defineFlow(
  {
    name: 'getStreakTipsFlow',
    inputSchema: z.void(),
    outputSchema: GetStreakTipsOutputSchema,
  },
  async () => {
    try {
        const { text } = await ai.generate({
            prompt: `As a coding mentor, provide one concise, actionable tip for a student to maintain their daily coding problem-solving streak. The tip should be encouraging and under 200 characters. Examples: "Stuck on a problem? Try explaining it to a rubber duck. The simple act of explaining can reveal the solution!", "Feeling burnt out? Switch topics! If you've been doing arrays, try a simple tree problem to refresh your mind."`,
        });

        const tips = text;
        return { success: true, tips };
    } catch (e: any) {
        console.error('Error generating streak tips:', e);
        return { success: false, error: 'Could not generate tips at this moment.' };
    }
  }
);
