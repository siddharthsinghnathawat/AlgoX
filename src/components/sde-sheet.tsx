
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

  // In a real app, you would fetch and persist this state from/to your database.
  // For now, it's just client-side state.
  const handleToggleStriver = (problemId: string, isSolved: boolean) => {
    setStriverSolved((prev) => {
      const newSet = new Set(prev);
      if (isSolved) newSet.add(problemId);
      else newSet.delete(problemId);
      return newSet;
    });
  };

  const handleToggleBabbar = (problemId: string, isSolved: boolean) => {
    setBabbarSolved((prev) => {
      const newSet = new Set(prev);
      if (isSolved) newSet.add(problemId);
      else newSet.delete(problemId);
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">DSA Sheets</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BookOpenCheck className="text-primary"/>Curated Problem Lists</CardTitle>
          <CardDescription>
            Select a sheet and track your progress. Problems are grouped by topic to guide your learning.
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
