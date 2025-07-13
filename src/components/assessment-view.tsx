
'use client';

import { useState, useEffect } from 'react';
import type { Assessment } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Clock, Code, Link as LinkIcon, Flag } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type AssessmentViewProps = {
  assessment: Assessment;
};

export function AssessmentView({ assessment }: AssessmentViewProps) {
  const [timeLeft, setTimeLeft] = useState(assessment.timeLimitMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if(interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const startTimer = () => setIsActive(true);

  if (!isActive) {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <CardTitle className="text-2xl">{assessment.company} Assessment</CardTitle>
                    <CardDescription>You have {assessment.timeLimitMinutes} minutes to solve {assessment.problems.length} problems.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mb-6 text-muted-foreground">The timer will start as soon as you click the button below. Good luck!</p>
                    <Button onClick={startTimer} size="lg">
                        <Flag className="mr-2 h-5 w-5" />
                        Start Assessment
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                 <h1 className="text-2xl font-bold">{assessment.company} Assessment</h1>
                 <p className="text-muted-foreground">Solve the problems below within the time limit.</p>
            </div>
            <Card className="w-full md:w-auto">
                <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                        <Clock className="h-6 w-6 text-destructive animate-pulse" />
                        <span className="text-2xl font-mono font-bold text-destructive">{formatTime(timeLeft)}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      
        <div className="space-y-4">
            {assessment.problems.map((problem, index) => (
                <Card key={problem.id}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Code className="text-primary"/> 
                            Problem {index + 1}: {problem.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <a href={problem.link} target="_blank" rel="noopener noreferrer">
                                <LinkIcon className="mr-2 h-4 w-4"/>
                                Solve on LeetCode
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>

        <div className="flex justify-end">
             <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">End Assessment</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to end the assessment?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. You will not be able to continue once you end it.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => { setTimeLeft(0); setIsActive(false); }}>End Now</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    </div>
  );
}
