
'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Student } from '@/lib/types';
import { Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { AddStudentDialog } from './add-student-dialog';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';
import { removeStudent } from '@/app/actions';

type MentorStudentsListProps = {
    initialStudents: Student[];
}

export function MentorStudentsList({ initialStudents }: MentorStudentsListProps) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [studentToRemove, setStudentToRemove] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleAddStudent = (newStudent: Student) => {
    setStudents(prev => [...prev, newStudent]);
  };

  const handleRemoveStudent = async () => {
    if (!studentToRemove) return;
    
    const success = await removeStudent(studentToRemove.id);
    
    if (success) {
        setStudents(prev => prev.filter(s => s.id !== studentToRemove.id));
        toast({
          title: "Student Removed",
          description: `${studentToRemove.realName} has been removed from your roster.`,
        });
    } else {
        toast({
            variant: "destructive",
            title: "Error",
            description: `Failed to remove ${studentToRemove.realName}.`,
        });
    }
    
    setStudentToRemove(null);
  };

  const filteredStudents = students.filter(student =>
    student.realName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">Manage Students</h1>
                <p className="text-muted-foreground">Add, view, and remove students from your roster.</p>
            </div>
            <AddStudentDialog onAddStudent={handleAddStudent} />
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Student Roster</CardTitle>
                <CardDescription>
                A summary of each student's performance. Search by real name.
                </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                      type="search"
                      placeholder="Search students..."
                      className="pl-8 sm:w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
            </CardContent>
          </Card>

        <div className="space-y-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <Card key={student.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                      <Avatar>
                          <AvatarImage src={student.avatarUrl ?? undefined} alt={student.username} data-ai-hint="person" />
                          <AvatarFallback>{student.realName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.realName}</div>
                        <div className="text-xs text-muted-foreground">@{student.username}</div>
                      </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setStudentToRemove(student)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove student</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Problems Solved</TableHead>
                        <TableHead className="text-center">Current Streak</TableHead>
                        <TableHead className="text-center">Badges</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-center font-mono">{student.totalSolved}</TableCell>
                        <TableCell className="text-center font-mono">{student.streak} days</TableCell>
                        <TableCell className="text-center font-mono">{student.badges}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No students found matching your search.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <AlertDialog open={!!studentToRemove} onOpenChange={(open) => !open && setStudentToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove{" "}
              <strong>{studentToRemove?.realName}</strong> from your roster.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setStudentToRemove(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveStudent}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
