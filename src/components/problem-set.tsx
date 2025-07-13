
'use client';

import type { ProblemSetItem } from '@/lib/types';
import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LayoutGrid, Link as LinkIcon, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { updateStudentProgress } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

type ProblemSetProps = {
    problems: ProblemSetItem[];
    studentId: string;
};

export function ProblemSet({ problems, studentId }: ProblemSetProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [topicFilter, setTopicFilter] = useState('all');
    const [companyFilter, setCompanyFilter] = useState('all');
    const [solvedFilter, setSolvedFilter] = useState('all'); // 'all', 'solved', 'unsolved'
    const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());

    const router = useRouter();
    const { toast } = useToast();

    const STORAGE_KEY = `problem-set-solved-${studentId}`;

    useEffect(() => {
        try {
            const storedSolved = localStorage.getItem(STORAGE_KEY);
            if (storedSolved) {
                setSolvedProblems(new Set(JSON.parse(storedSolved)));
            }
        } catch (error) {
            console.error("Failed to load problem set progress from localStorage", error);
        }
    }, [STORAGE_KEY]);


    const handleToggleSolved = async (problemId: string, isSolved: boolean) => {
        const newSet = new Set(solvedProblems);
        if (isSolved) {
            newSet.add(problemId);
        } else {
            newSet.delete(problemId);
        }
        setSolvedProblems(newSet);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newSet)));

        const success = await updateStudentProgress(studentId, isSolved);
        if (success) {
            toast({
                title: "Progress Updated!",
                description: `Dashboard stats have been updated.`,
            });
            router.refresh();
        } else {
            // Revert on failure
             const revertedSet = new Set(solvedProblems);
             if (isSolved) {
                revertedSet.delete(problemId);
            } else {
                revertedSet.add(problemId);
            }
            setSolvedProblems(revertedSet);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(revertedSet)));
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: "Could not update your dashboard stats. Please try again.",
            });
        }
    };

    const topics = useMemo(() => ['all', ...Array.from(new Set(problems.map(p => p.topic)))], [problems]);
    const companies = useMemo(() => ['all', ...Array.from(new Set(problems.flatMap(p => p.companies)))], [problems]);

    const filteredProblems = useMemo(() => {
        return problems.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDifficulty = difficultyFilter === 'all' || p.difficulty.toLowerCase() === difficultyFilter;
            const matchesTopic = topicFilter === 'all' || p.topic.toLowerCase() === topicFilter;
            const matchesCompany = companyFilter === 'all' || p.companies.map(c => c.toLowerCase()).includes(companyFilter);
            const matchesSolved = solvedFilter === 'all' || (solvedFilter === 'solved' ? solvedProblems.has(p.id) : !solvedProblems.has(p.id));

            return matchesSearch && matchesDifficulty && matchesTopic && matchesCompany && matchesSolved;
        });
    }, [problems, searchTerm, difficultyFilter, topicFilter, companyFilter, solvedFilter, solvedProblems]);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">AX Problem Set</h1>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <LayoutGrid className="text-primary"/>
                        Problem Explorer
                    </CardTitle>
                    <CardDescription>
                        Search and filter through our curated list of problems to hone your skills.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative">
                         <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by problem title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8 w-full"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Difficulties</SelectItem>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                         <Select value={topicFilter} onValueChange={setTopicFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by topic" />
                            </SelectTrigger>
                            <SelectContent>
                                {topics.map(topic => (
                                    <SelectItem key={topic} value={topic.toLowerCase()}>{topic.charAt(0).toUpperCase() + topic.slice(1)}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                         <Select value={companyFilter} onValueChange={setCompanyFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by company" />
                            </SelectTrigger>
                            <SelectContent>
                                {companies.map(company => (
                                    <SelectItem key={company} value={company.toLowerCase()}>{company.charAt(0).toUpperCase() + company.slice(1)}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <RadioGroup
                            defaultValue="all"
                            onValueChange={setSolvedFilter}
                            className="flex items-center space-x-2 justify-around rounded-md border p-2 bg-background"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="r-all" />
                                <Label htmlFor="r-all">All</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="solved" id="r-solved" />
                                <Label htmlFor="r-solved">Solved</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="unsolved" id="r-unsolved" />
                                <Label htmlFor="r-unsolved">Unsolved</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[60px]">Status</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Difficulty</TableHead>
                                    <TableHead>Topic</TableHead>
                                    <TableHead className="text-right">Link</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProblems.length > 0 ? (
                                    filteredProblems.map((problem) => (
                                        <TableRow key={problem.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={solvedProblems.has(problem.id)}
                                                    onCheckedChange={(checked) => handleToggleSolved(problem.id, !!checked)}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{problem.title}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={cn(
                                                    problem.difficulty === "Easy" && "border-green-600 text-green-600",
                                                    problem.difficulty === "Medium" && "border-yellow-600 text-yellow-600",
                                                    problem.difficulty === "Hard" && "border-red-600 text-red-600"
                                                )}>
                                                    {problem.difficulty}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">{problem.topic}</TableCell>
                                            <TableCell className="text-right">
                                                 <Button variant="ghost" size="sm" asChild>
                                                    <Link href={problem.link} target="_blank" rel="noopener noreferrer">
                                                        Solve <LinkIcon className="ml-2 h-3 w-3" />
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                            No problems found matching your filters.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
