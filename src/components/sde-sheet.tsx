
'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { sdeSheetTopics, loveBabbarDsaSheetTopics, type SdeTopic } from '@/lib/sde-sheet-data';
import type { Student } from '@/lib/types';
import { BookOpenCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { updateStudentProgress } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';

type SdeSheetProps = {
  student: Student;
};

function SheetContent({ topic, solvedProblems, onToggle }: { topic: SdeTopic, solvedProblems: Set<string>, onToggle: (problemId: string, isSolved: boolean) => void }) {
    return (
        <ul className="space-y-3 pl-4">
            {topic.problems.map((problem) => (
                <li key={problem.id} className="flex items-center gap-3">
                    <Checkbox
                        id={problem.id}
                        checked={solvedProblems.has(problem.id)}
                        onCheckedChange={(checked) => onToggle(problem.id, !!checked)}
                    />
                    <label
                        htmlFor={problem.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        <a href={problem.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {problem.title}
                        </a>
                    </label>
                </li>
            ))}
        </ul>
    );
}


function SheetAccordion({ sheet, solvedProblems, onToggle }: { sheet: SdeTopic[], solvedProblems: Set<string>, onToggle: (problemId: string, isSolved: boolean) => void }) {
    return (
        <Accordion type="multiple" className="w-full">
            {sheet.map((topic, index) => (
              <AccordionItem value={`item-${index}`} key={topic.topicName}>
                <AccordionTrigger>
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>{topic.topicName}</span>
                    <span className="text-sm text-muted-foreground">
                      {topic.problems.filter(p => solvedProblems.has(p.id)).length} / {topic.problems.length}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <SheetContent topic={topic} solvedProblems={solvedProblems} onToggle={onToggle} />
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
    );
}

export function SdeSheet({ student }: SdeSheetProps) {
  const [striverSolved, setStriverSolved] = React.useState<Set<string>>(new Set());
  const [babbarSolved, setBabbarSolved] = React.useState<Set<string>>(new Set());
  const router = useRouter();
  const { toast } = useToast();

  const STRIVER_STORAGE_KEY = `striver-solved-${student.id}`;
  const BABBAR_STORAGE_KEY = `babbar-solved-${student.id}`;

  React.useEffect(() => {
    try {
        const storedStriver = localStorage.getItem(STRIVER_STORAGE_KEY);
        if (storedStriver) {
            setStriverSolved(new Set(JSON.parse(storedStriver)));
        }
        const storedBabbar = localStorage.getItem(BABBAR_STORAGE_KEY);
        if (storedBabbar) {
            setBabbarSolved(new Set(JSON.parse(storedBabbar)));
        }
    } catch (error) {
        console.error("Failed to load SDE sheet progress from localStorage", error);
    }
  }, [student.id, STRIVER_STORAGE_KEY, BABBAR_STORAGE_KEY]);

  const createToggleHandler = (
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    storageKey: string
  ) => async (problemId: string, isSolved: boolean) => {
    
    // --- Optimistic UI Update for localStorage and component state ---
    const newSet = new Set(setter(prev => {
        const current = new Set(prev);
        if (isSolved) {
            current.add(problemId);
        } else {
            current.delete(problemId);
        }
        localStorage.setItem(storageKey, JSON.stringify(Array.from(current)));
        return current;
    }));

    // --- Call server action to update global stats ---
    const success = await updateStudentProgress(student.id, isSolved);

    if (success) {
        toast({
            title: "Progress Updated!",
            description: `Dashboard stats have been updated.`,
        });
        router.refresh();
    } else {
        // --- Revert UI on failure ---
        setter(prev => {
            const reverted = new Set(prev);
            if (isSolved) {
                reverted.delete(problemId); // It was added, so we remove it
            } else {
                reverted.add(problemId); // It was removed, so we add it back
            }
            localStorage.setItem(storageKey, JSON.stringify(Array.from(reverted)));
            return reverted;
        });

        toast({
            variant: "destructive",
            title: "Update Failed",
            description: "Could not update your dashboard stats. Please try again.",
        });
    }
  };
  
  const handleToggleStriver = createToggleHandler(setStriverSolved, STRIVER_STORAGE_KEY);
  const handleToggleBabbar = createToggleHandler(setBabbarSolved, BABBAR_STORAGE_KEY);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">DSA Sheets</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BookOpenCheck className="text-primary"/>Curated Problem Lists</CardTitle>
          <CardDescription>
            Select a sheet and track your progress. Problems are grouped by topic to guide your learning. Your dashboard stats will update as you solve problems.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="striver">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="striver">Striver's SDE Sheet</TabsTrigger>
                    <TabsTrigger value="babbar">Love Babbar DSA Sheet</TabsTrigger>
                </TabsList>
                <TabsContent value="striver" className="mt-4">
                    <SheetAccordion sheet={sdeSheetTopics} solvedProblems={striverSolved} onToggle={handleToggleStriver} />
                </TabsContent>
                <TabsContent value="babbar" className="mt-4">
                    <SheetAccordion sheet={loveBabbarDsaSheetTopics} solvedProblems={babbarSolved} onToggle={handleToggleBabbar} />
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
