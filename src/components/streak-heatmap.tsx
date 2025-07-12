
'use client';

import React, { useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { format, getMonth, getYear, startOfYear, endOfYear, eachDayOfInterval, getDay, startOfMonth, getDate } from 'date-fns';

type HeatmapProps = {
  data: { date: string; count: number }[];
  year: number;
};

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getColor = (count: number) => {
  if (count === 0) return 'bg-muted/50';
  if (count <= 1) return 'bg-primary/20';
  if (count <= 3) return 'bg-primary/40';
  if (count <= 5) return 'bg-primary/70';
  return 'bg-primary';
};

const DayCell = ({ date, count }: { date: Date, count: number }) => (
    <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
            <div className={cn('h-4 w-4 rounded-sm', getColor(count))} />
        </TooltipTrigger>
        <TooltipContent>
            <p className="text-sm">
                {count} contribution{count !== 1 ? 's' : ''} on {format(date, 'MMM d, yyyy')}
            </p>
        </TooltipContent>
    </Tooltip>
);

export function StreakHeatmap({ data, year }: HeatmapProps) {
  const [mounted, setMounted] = useState(false);
  const [monthlyData, setMonthlyData] = useState<Date[][]>([]);
  const [dataMap, setDataMap] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const yearStartDate = startOfYear(new Date(year, 0, 1));
    const yearEndDate = endOfYear(new Date(year, 0, 1));
    const allDates = eachDayOfInterval({ start: yearStartDate, end: yearEndDate });
    
    const newMonthlyData = Array.from({ length: 12 }, (_, monthIndex) => {
        return allDates.filter(date => getMonth(date) === monthIndex);
    });

    const generatedDataMap = new Map(data.map(item => [format(new Date(item.date), 'yyyy-MM-dd'), item.count]));
    
    setMonthlyData(newMonthlyData);
    setDataMap(generatedDataMap);
    setMounted(true);
  }, [data, year]);

  if (!mounted) {
    return <div className="h-[128px] w-full animate-pulse rounded-md bg-muted" />;
  }

  return (
    <TooltipProvider>
        <div className="flex justify-start overflow-x-auto pb-2 gap-3">
            {monthlyData.map((monthDates, monthIndex) => {
                if (monthDates.length === 0) return null;
                const firstDayOfMonth = getDay(monthDates[0]); // 0 = Sunday, 1 = Monday...

                return (
                    <div key={monthIndex} className="flex flex-col items-center">
                        <div className="text-xs text-muted-foreground mb-2">{MONTH_LABELS[monthIndex]}</div>
                        <div className="grid grid-flow-col grid-rows-7 gap-1">
                            {/* Empty cells for padding before the 1st day of the month */}
                            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                                <div key={`pad-${i}`} className="h-4 w-4" />
                            ))}
                            {monthDates.map((date) => {
                                const dateString = format(date, 'yyyy-MM-dd');
                                const count = dataMap.get(dateString) || 0;
                                return <DayCell key={dateString} date={date} count={count} />;
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    </TooltipProvider>
  );
}
