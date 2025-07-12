
'use client';

import type { Student } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Crown, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type RankingDashboardProps = {
    allStudents: Student[];
    currentStudentId: string;
}

export function StudentRankingDashboard({ allStudents, currentStudentId }: RankingDashboardProps) {
    const sortedStudents = [...allStudents].sort((a, b) => b.totalSolved - a.totalSolved);
    const currentUserRank = sortedStudents.findIndex(s => s.id === currentStudentId) + 1;
    const currentStudent = allStudents.find(s => s.id === currentStudentId);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Student Leaderboard</h1>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
                    <Crown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        #{currentUserRank > 0 ? currentUserRank : 'N/A'}
                        <span className="text-base font-normal text-muted-foreground">
                            {' '}out of {sortedStudents.length} students
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Keep pushing to climb the ranks!</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Trophy className="text-primary h-5 w-5" />
                        Overall Rankings
                    </CardTitle>
                    <CardDescription>
                        Based on the total number of problems solved.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Rank</TableHead>
                                <TableHead>Student</TableHead>
                                <TableHead className="text-right">Problems Solved</TableHead>
                                <TableHead className="text-right">Current Streak</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedStudents.map((student, index) => (
                                <TableRow 
                                    key={student.id} 
                                    className={cn(student.id === currentStudentId && "bg-primary/10 hover:bg-primary/20")}
                                >
                                    <TableCell className="font-bold text-lg">#{index + 1}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={student.avatarUrl ?? undefined} alt={student.username} data-ai-hint="person" />
                                                <AvatarFallback>{student.username.charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{student.id === currentStudentId ? `${student.username} (You)` : student.username}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-lg">{student.totalSolved}</TableCell>
                                    <TableCell className="text-right font-mono text-lg">{student.streak} days</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
