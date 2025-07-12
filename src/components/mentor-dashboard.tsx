
'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Problem, Student } from '@/lib/types';
import { AddProblemDialog } from './add-problem-dialog';
import { BookUser, Flame, Trophy, ListChecks, Link as LinkIcon, Search } from 'lucide-react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';

type MentorDashboardProps = {
    initialStudents: Student[];
    initialProblems: Problem[];
}

export function MentorDashboard({ initialStudents, initialProblems }: MentorDashboardProps) {
  const [students] = useState<Student[]>(initialStudents);
  const [problems, setProblems] = useState<Problem[]>(initialProblems);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddProblem = (newProblem: Problem) => {
    setProblems(prev => [...prev, newProblem]);
  };

  const topPerformer = students.length > 0 ? [...students].sort((a,b) => b.totalSolved - a.totalSolved)[0] : null;
  const avgStreak = Math.round(students.reduce((acc, s) => acc + s.streak, 0) / (students.length || 1));

  const filteredProblems = problems.filter(problem => 
    problem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
              <h1 className="text-2xl font-bold">Mentor Dashboard</h1>
              <p className="text-muted-foreground">Oversee your students' progress and assign problems.</p>
          </div>
          <div className="flex gap-2">
              <AddProblemDialog onAddProblem={handleAddProblem} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <BookUser className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">{students.length}</div>
                  <p className="text-xs text-muted-foreground">students currently enrolled</p>
              </CardContent>
          </Card>
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Streak</CardTitle>
                  <Flame className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">{avgStreak} Days</div>
                  <p className="text-xs text-muted-foreground">across all students</p>
              </CardContent>
          </Card>
          <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">{topPerformer ? topPerformer.realName : 'N/A'}</div>
                  <p className="text-xs text-muted-foreground">by problems solved</p>
              </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2">
                  <ListChecks className="text-primary h-5 w-5" />
                  Assigned Problems
              </CardTitle>
              <CardDescription>
                  A list of all problems assigned to students. Search by title.
              </CardDescription>
          </CardHeader>
          <CardContent>
              <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                      type="search"
                      placeholder="Search problems..."
                      className="pl-8 sm:w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Platform</TableHead>
                          <TableHead>Difficulty</TableHead>
                          <TableHead className="text-right">Link</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {filteredProblems.length > 0 ? filteredProblems.map((problem) => (
                          <TableRow key={problem.id}>
                              <TableCell className="font-medium">{problem.title}</TableCell>
                              <TableCell>{problem.platform}</TableCell>
                              <TableCell>
                                <Badge variant={
                                  problem.difficulty === 'Easy' ? 'secondary' :
                                  problem.difficulty === 'Medium' ? 'default' :
                                  'destructive'
                                } className={cn(
                                  problem.difficulty === "Easy" && "bg-green-600/20 text-green-600 border-green-600/20",
                                  problem.difficulty === "Medium" && "bg-yellow-600/20 text-yellow-600 border-yellow-600/20",
                                  problem.difficulty === "Hard" && "bg-red-600/20 text-red-600 border-red-600/20"
                                )}>
                                  {problem.difficulty}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                  <Link href={problem.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center justify-end gap-1">
                                      <LinkIcon className="h-3 w-3"/>
                                      View
                                  </Link>
                              </TableCell>
                          </TableRow>
                      )) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-muted-foreground">
                                No problems found matching your search.
                            </TableCell>
                        </TableRow>
                      )}
                  </TableBody>
              </Table>
          </CardContent>
      </Card>

      </div>
    </>
  );
}
