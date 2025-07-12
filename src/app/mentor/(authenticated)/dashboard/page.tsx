import { MentorDashboard } from '@/components/mentor-dashboard';
import { getAllProblems, getAllStudents } from '@/app/actions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentor Dashboard',
};

export default async function DashboardPage() {
    const students = await getAllStudents();
    const problems = await getAllProblems();
    return <MentorDashboard initialStudents={students} initialProblems={problems} />;
}
