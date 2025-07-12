
'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import type { SolvedData } from '@/lib/types';
import { subWeeks, format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { useMemo } from 'react';
import { Activity } from 'lucide-react';

type ConsistencyChartProps = {
  data: SolvedData[];
};

const chartConfig = {
  solved: {
    label: 'Problems Solved',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function ConsistencyChart({ data }: ConsistencyChartProps) {
  const weeklyData = useMemo(() => {
    if (!data) return [];
    const today = new Date();
    // Generate the last 12 weeks, including the current one.
    return Array.from({ length: 12 }).map((_, i) => {
      const targetDate = subWeeks(today, 11 - i);
      const weekStart = startOfWeek(targetDate, { weekStartsOn: 1 }); // Monday
      const weekEnd = endOfWeek(targetDate, { weekStartsOn: 1 }); // Sunday

      const solvedInWeek = data.reduce((acc, curr) => {
        const currDate = new Date(curr.date);
         if (isWithinInterval(currDate, { start: weekStart, end: weekEnd })) {
          return acc + curr.count;
        }
        return acc;
      }, 0);

      return {
        date: format(weekStart, 'MMM d'),
        solved: solvedInWeek,
      };
    });
  }, [data]);

  return (
     <Card className="lg:col-span-4">
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="text-primary" /> Weekly Consistency</CardTitle>
            <CardDescription>A time series graph of problems solved over the last 12 weeks.</CardDescription>
        </CardHeader>
        <CardContent>
             <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <LineChart
                    accessibilityLayer
                    data={weeklyData}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        allowDecimals={false}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                    />
                    <Line
                        dataKey="solved"
                        type="monotone"
                        stroke="var(--color-solved)"
                        strokeWidth={2}
                        dot={true}
                    />
                </LineChart>
            </ChartContainer>
        </CardContent>
    </Card>
  );
}
