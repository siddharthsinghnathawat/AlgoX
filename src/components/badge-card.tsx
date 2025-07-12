import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

type BadgeCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  earned: boolean;
  color?: string;
};

export function BadgeCard({ icon: Icon, title, description, earned, color }: BadgeCardProps) {
  return (
    <div className={cn('flex flex-col items-center text-center p-4 rounded-lg transition-all', earned ? 'bg-card' : 'bg-muted/50 opacity-60')}>
      <div className={cn(
        'flex h-16 w-16 items-center justify-center rounded-full mb-4',
         earned ? (color ? color : 'bg-primary/10 text-primary') : 'bg-muted-foreground/20 text-muted-foreground'
      )}>
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
}
