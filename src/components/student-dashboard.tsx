
'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Student, SolvedData } from '@/lib/types';
import {
  Award,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Crown,
  Flame,
  Gem,
  Lightbulb,
  Medal,
  Trophy,
} from 'lucide-react';
import { StreakHeatmap } from './streak-heatmap';
import { BadgeCard } from './badge-card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { getStreakTipsAction } from '@/app/actions';
import { useToast } from './ui/use-toast';
import { subDays, isWithinInterval, getYear } from 'date-fns';
import { ConsistencyChart } from './consistency-chart';


type StudentDashboardProps = {
  student: Student;
};

export function StudentDashboard({ student }: StudentDashboardProps) {
  const [tips, setTips] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { toast } = useToast();
  const [today, setToday] = useState(new Date());
  
  // State for heatmap year
  const [currentYear, setCurrentYear] = useState(getYear(new Date()));
  const [displayYear, setDisplayYear] = useState(getYear(new Date()));

  useEffect(() => {
    // This effect ensures date-dependent calculations are only run on the client
    const now = new Date();
    setToday(now);
    const year = getYear(now);
    setCurrentYear(year);
    setDisplayYear(year);
  }, []);

  const solvedData: SolvedData[] = Array.isArray(student.solvedData) ? student.solvedData : [];

  const badges = [
    { id: '1', title: 'Silver', description: 'Solve 50 problems.', icon: Medal, earned: student.totalSolved >= 50, color: 'text-slate-400 bg-slate-400/10' },
    { id: '2', title: 'Gold', description: 'Solve 100 problems.', icon: Trophy, earned: student.totalSolved >= 100, color: 'text-yellow-500 bg-yellow-500/10' },
    { id: '3', title: 'Platinum', description: 'Solve 200 problems.', icon: Award, earned: student.totalSolved >= 200, color: 'text-cyan-400 bg-cyan-400/10' },
    { id: '4', title: 'Diamond', description: 'Solve 300 problems.', icon: Gem, earned: student.totalSolved >= 300, color: 'text-blue-500 bg-blue-500/10' },
    { id: '5', title: 'Ace', description: 'Solve 500 problems.', icon: Crown, earned: student.totalSolved >= 500, color: 'text-purple-500 bg-purple-500/10' },
  ];
  
  const weekStart = subDays(today, 6); // Last 7 days including today
  const problemsSolvedThisWeek = solvedData.reduce((acc, curr) => {
    const currDate = new Date(curr.date);
    if (isWithinInterval(currDate, { start: weekStart, end: today })) {
      return acc + curr.count;
    }
    return acc;
  }, 0);


  const handleGetTips = async () => {
    setIsLoading(true);
    setTips('');
    try {
      const result = await getStreakTipsAction();
      if (result.success && result.tips) {
        setTips(result.tips);
        setIsAlertOpen(true);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to get tips.",
        });
      }
    } catch (error) {
       toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred.",
        });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle>Welcome back, {student.username}!</CardTitle>
              <CardDescription>
                You're in the top 10% this week. Keep up the great work!
              </CardDescription>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" onClick={handleGetTips} disabled={isLoading} className="w-full md:w-auto">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  {isLoading ? 'Getting Tips...' : 'Get Streak Tips'}
              </Button>
            </div>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader>
            <CardDescription className="flex items-center gap-2"><Flame className="text-primary" /> Current Streak</CardDescription>
            <CardTitle className="text-4xl">{student.streak} Days</CardTitle>
          </CardHeader>
          <CardFooter><p className="text-xs text-muted-foreground">Based on daily solved problems</p></CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardDescription className="flex items-center gap-2"><Trophy className="text-primary" /> Weekly Goal</CardDescription>
            <CardTitle>{problemsSolvedThisWeek} / 35 Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={(problemsSolvedThisWeek / 35) * 100} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardDescription className="flex items-center gap-2"><CheckCircle2 className="text-primary" /> Total Solved</CardDescription>
            <CardTitle className="text-4xl">{student.totalSolved} Problems</CardTitle>
          </CardHeader>
          <CardFooter><p className="text-xs text-muted-foreground">From assigned problems list</p></CardFooter>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader>
             <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2"><Calendar className="text-primary" /> Solving Streak</CardTitle>
                  <CardDescription>Your activity for {displayYear}.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setDisplayYear(displayYear - 1)}
                    disabled={displayYear <= currentYear - 2}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous Year</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setDisplayYear(displayYear + 1)}
                    disabled={displayYear >= currentYear}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next Year</span>
                  </Button>
                </div>
             </div>
          </CardHeader>
          <CardContent>
            <StreakHeatmap data={solvedData} year={displayYear} />
          </CardContent>
        </Card>

        <ConsistencyChart data={solvedData} />
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Medal className="text-primary" /> Your Badges</CardTitle>
            <CardDescription>Achievements you've unlocked.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {badges.map(badge => <BadgeCard key={badge.id} {...badge} />)}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
          <AlertDialogTitle>AI-Powered Streak Tips!</AlertDialogTitle>
          <AlertDialogDescription>
              {tips}
          </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
          <AlertDialogAction>Got it!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
