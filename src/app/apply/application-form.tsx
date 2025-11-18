'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { handleResumeUpload } from './actions';
import { useState, useRef } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  experience: z.string().min(20, { message: 'Please summarize your experience.' }),
  skills: z.string().min(3, { message: 'Please list at least one skill.' }),
});

type FormData = z.infer<typeof formSchema>;

export function ApplicationForm() {
  const { toast } = useToast();
  const [isAiLoading, setIsAiLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      experience: '',
      skills: '',
    },
  });

  async function onSubmit(data: FormData) {
    toast({
      title: 'Application Submitted!',
      description: `Thank you, ${data.name}. We've received your application.`,
    });
    form.reset();
  }

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.type !== 'application/pdf') {
      toast({
        variant: 'destructive',
        title: 'Invalid File Type',
        description: 'Please upload a PDF file.',
      });
      return;
    }
    
    setIsAiLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const resumeDataUri = reader.result as string;
      const result = await handleResumeUpload(resumeDataUri);

      if (result.success && result.data) {
        form.setValue('name', result.data.name);
        form.setValue('email', result.data.email);
        form.setValue('phone', result.data.phone);
        form.setValue('experience', result.data.experience);
        form.setValue('skills', result.data.skills);
        toast({
          title: 'AI Auto-fill Complete',
          description: 'Your information has been extracted from the resume.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'AI Error',
          description: result.error || 'Could not process the resume.',
        });
      }
      setIsAiLoading(false);
       // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.onerror = () => {
      toast({
        variant: 'destructive',
        title: 'File Read Error',
        description: 'Could not read the uploaded file.',
      });
      setIsAiLoading(false);
    };
  };

  return (
    <Card className="mt-8 border-primary/20 bg-card">
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle className="font-headline text-2xl text-primary">Application Form</CardTitle>
                <CardDescription>Fill in your details to apply.</CardDescription>
            </div>
            <div>
                <Input
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    onChange={onFileChange}
                    accept=".pdf"
                    ref={fileInputRef}
                    disabled={isAiLoading}
                />
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isAiLoading}
                    >
                    {isAiLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Sparkles className="mr-2 h-4 w-4 text-primary" />
                    )}
                    Auto-fill with Resume AI
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Summarize your professional experience..."
                      className="resize-none"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React, Project Management, Figma" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full md:w-auto">Submit Application</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
