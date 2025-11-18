'use server';

import { resumeAutoFill, ResumeAutoFillOutput } from '@/ai/flows/resume-auto-fill';

type ActionResult = {
  success: boolean;
  data?: ResumeAutoFillOutput;
  error?: string;
};

export async function handleResumeUpload(resumeDataUri: string): Promise<ActionResult> {
  try {
    const result = await resumeAutoFill({ resumeDataUri });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error processing resume with AI:', error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred while processing the resume.' };
  }
}
