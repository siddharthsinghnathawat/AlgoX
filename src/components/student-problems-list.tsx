
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Student, StudentProblem } from '@/lib/types';
import { ListChecks } from 'lucide-react';
import { useToast } from './ui/use-toast';
import { Checkbox } from './ui/checkbox';
import { setProblemSolvedStatus } from '@/app/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type StudentProblemsListProps = {
  student: Student;
  studentProblems: StudentProblem[];
};

export function StudentProblemsList({ student, studentProblems: initialStudentProblems }: StudentProblemsListProps) {
  const [studentProblems, setStudentProblems] = useState(initialStudentProblems);
  const { toast } = useToast();
  const router = useRouter();


  const handleToggleProblemStatus = async (problemId: string, isNowSolved: boolean) => {
    const problem = studentProblems.find(p => p.problem.id === problemId)?.problem;
    if (!problem) return;
    
    // Optimistically update UI
    setStudentProblems(currentProblems => currentProblems.map(p => 
        p.problem.id === problemId ? { ...p, isSolved: isNowSolved } : p
    ));

    const success = await setProblemSolvedStatus(student.id, problemId, isNowSolved);

    if (success) {
        toast({
            title: "Progress Updated!",
            description: `"${problem.title}" marked as ${isNowSolved ? 'solved' : 'unsolved'}.`,
        });
        // router.refresh() re-fetches data for the current route and re-renders Server Components.
        // This will update the dashboard and other parts of the layout with fresh data.
        router.refresh(); 
    } else {
        // Revert UI on failure
        setStudentProblems(currentProblems => currentProblems.map(p => 
            p.problem.id === problemId ? { ...p, isSolved: !isNowSolved } : p
        ));
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: `Could not update status for "${problem.title}". Please try again.`,
        });
    }
  };

  return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold">Assigned Problems</h1>
        <Card>
           <CardHeader>
            <div>
              <CardTitle className="flex items-center gap-2"><ListChecks className="text-primary" /> Problems List</CardTitle>
              <CardDescription>Problems assigned by your mentor. Check the box to mark as complete.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {studentProblems.map(({ problem, isSolved }) => (
                <li key={problem.id} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                     <Checkbox
                        id={`problem-${problem.id}`}
                        checked={isSolved}
                        onCheckedChange={(checked) => handleToggleProblemStatus(problem.id, !!checked)}
                        aria-label={`Mark ${problem.title} as solved`}
                      />
                    <div>
                      <label htmlFor={`problem-${problem.id}`} className="font-medium hover:underline cursor-pointer">
                        <a href={problem.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          {problem.title}
                        </a>
                      </label>
                      <div className="text-sm text-muted-foreground">{problem.platform} &middot; {problem.difficulty}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
    </div>
  );
}
