'use server';

/**
 * @fileOverview A resume autofill AI agent.
 *
 * - resumeAutoFill - A function that handles the resume parsing and field filling process.
 * - ResumeAutoFillInput - The input type for the resumeAutoFill function.
 * - ResumeAutoFillOutput - The return type for the resumeAutoFill function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeAutoFillInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "The resume file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ResumeAutoFillInput = z.infer<typeof ResumeAutoFillInputSchema>;

const ResumeAutoFillOutputSchema = z.object({
  name: z.string().describe('The name of the applicant.'),
  email: z.string().email().describe('The email address of the applicant.'),
  phone: z.string().describe('The phone number of the applicant.'),
  experience: z.string().describe('A summary of the applicant\'s experience.'),
  skills: z.string().describe('A comma-separated list of the applicant\'s skills.'),
});
export type ResumeAutoFillOutput = z.infer<typeof ResumeAutoFillOutputSchema>;

export async function resumeAutoFill(input: ResumeAutoFillInput): Promise<ResumeAutoFillOutput> {
  return resumeAutoFillFlow(input);
}

const resumeAutoFillPrompt = ai.definePrompt({
  name: 'resumeAutoFillPrompt',
  input: {schema: ResumeAutoFillInputSchema},
  output: {schema: ResumeAutoFillOutputSchema},
  prompt: `You are an AI assistant designed to extract information from resumes to pre-fill job application forms. Extract the applicant's name, email address, phone number, a summary of their experience, and a comma-separated list of their skills.

Resume Data: {{media url=resumeDataUri}}`,
});

const resumeAutoFillFlow = ai.defineFlow(
  {
    name: 'resumeAutoFillFlow',
    inputSchema: ResumeAutoFillInputSchema,
    outputSchema: ResumeAutoFillOutputSchema,
  },
  async input => {
    const {output} = await resumeAutoFillPrompt(input);
    return output!;
  }
);
