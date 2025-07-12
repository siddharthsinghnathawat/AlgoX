
'use client';

import type { Student } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Trophy } from "lucide-react";

type RankingDashboardProps = {
    allStudents: Student[];
}

export function MentorRankingDashboard({ allStudents }: RankingDashboardProps) {
    const sortedStudents = [...allStudents].sort((a, b) => b.totalSolved - a.totalSolved);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Student Leaderboard</h1>
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
                                <TableRow key={student.id}>
                                    <TableCell className="font-bold text-lg">#{index + 1}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={student.avatarUrl ?? undefined} alt={student.username} data-ai-hint="person" />
                                                <AvatarFallback>{student.realName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{student.realName}</div>
                                                <div className="text-xs text-muted-foreground">@{student.username}</div>
                                            </div>
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
