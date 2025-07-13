
'use client';

import type { Assessment } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Clock, FileQuestion, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

type PreparationDashboardProps = {
  assessments: Assessment[];
};

export function PreparationDashboard({ assessments }: PreparationDashboardProps) {
  const params = useParams();
  const studentId = params.id;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Interview Preparation</h1>
        <p className="text-muted-foreground">Timed assessments from top companies to get you interview-ready.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                 <Image src={assessment.logoUrl} alt={`${assessment.company} logo`} width={48} height={48} className="rounded-full" data-ai-hint="logo" />
                 <div>
                    <CardTitle>{assessment.company}</CardTitle>
                    <CardDescription>{assessment.type}</CardDescription>
                 </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileQuestion className="h-4 w-4" />
                    <span>{assessment.problems.length} Problems</span>
                </div>
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{assessment.timeLimitMinutes} Minutes</span>
                </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/student/${studentId}/preparation/${assessment.id}`}>
                  Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
