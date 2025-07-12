import { MentorRankingDashboard } from '@/components/mentor-ranking-dashboard';
import { getAllStudents } from '@/app/actions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Rankings',
  description: 'Leaderboard of all students by problems solved.',
}

export default async function RankingPage() {
    const allStudents = await getAllStudents();

    return <MentorRankingDashboard allStudents={allStudents} />;
}
