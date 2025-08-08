
'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Student } from '@/lib/types';
import { Search, Trash2, Eye, Calendar, Trophy, Target, Mail, User } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';
import { removeStudent } from '@/app/actions';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

type MentorStudentsListProps = {
    initialStudents: Student[];
}

export function MentorStudentsList({ initialStudents }: MentorStudentsListProps) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [studentToRemove, setStudentToRemove] = useState<Student | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
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
    student.realName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
                A comprehensive view of each student's performance. Search by name, username, or email.
                </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                      type="search"
                      placeholder="Search students by name, username, or email..."
                      className="pl-8 sm:w-[400px]"
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
                        <div className="text-xs text-muted-foreground">{student.email}</div>
                      </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => setSelectedStudent(student)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View student details</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setStudentToRemove(student)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove student</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{student.totalSolved}</div>
                      <div className="text-xs text-muted-foreground">Problems Solved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{student.streak}</div>
                      <div className="text-xs text-muted-foreground">Day Streak</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{student.badges}</div>
                      <div className="text-xs text-muted-foreground">Badges Earned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{student.leetcodeId}</div>
                      <div className="text-xs text-muted-foreground">LeetCode ID</div>
                    </div>
                  </div>
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

      {/* Detailed Student View Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>
              Comprehensive information about {selectedStudent?.realName}
            </DialogDescription>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedStudent.avatarUrl ?? undefined} alt={selectedStudent.username} />
                      <AvatarFallback className="text-lg">{selectedStudent.realName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="text-xl font-semibold">{selectedStudent.realName}</div>
                      <div className="text-sm text-muted-foreground">@{selectedStudent.username}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {selectedStudent.email}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        LeetCode: {selectedStudent.leetcodeId}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{selectedStudent.totalSolved}</div>
                      <div className="text-xs text-muted-foreground">Total Solved</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{selectedStudent.streak}</div>
                      <div className="text-xs text-muted-foreground">Current Streak</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{selectedStudent.badges}</div>
                      <div className="text-xs text-muted-foreground">Badges</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {selectedStudent.solvedData.length}
                      </div>
                      <div className="text-xs text-muted-foreground">Active Days</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Progress Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Problem Solving Progress</span>
                      <span>{selectedStudent.totalSolved} problems</span>
                    </div>
                    <Progress value={Math.min((selectedStudent.totalSolved / 100) * 100, 100)} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Consistency Streak</span>
                      <span>{selectedStudent.streak} days</span>
                    </div>
                    <Progress value={Math.min((selectedStudent.streak / 30) * 100, 100)} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Activity History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedStudent.solvedData.length > 0 ? (
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground mb-3">
                        Last 10 activity days:
                      </div>
                      {selectedStudent.solvedData
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .slice(0, 10)
                        .map((data, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">{formatDate(data.date)}</span>
                            <Badge variant="secondary">{data.count} problems</Badge>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No activity data available</p>
                  )}
                </CardContent>
              </Card>

              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Student ID:</span>
                    <span className="text-sm font-mono">{selectedStudent.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Joined:</span>
                    <span className="text-sm">{formatDate(selectedStudent.created_at)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Remove Student Confirmation */}
      <AlertDialog open={!!studentToRemove} onOpenChange={(open) => !open && setStudentToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove{" "}
              <strong>{studentToRemove?.realName}</strong> from your roster and delete all their data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setStudentToRemove(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveStudent} className="bg-red-600 hover:bg-red-700">
              Delete Student
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
