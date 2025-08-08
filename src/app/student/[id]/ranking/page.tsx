
import { StudentRankingDashboard } from '@/components/student-ranking-dashboard';
import { getAllStudents, getStudentById } from '@/app/actions';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Student Rankings',
  description: 'See your ranking among all students.',
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function RankingPage({ params }: Props) {
    const { id } = await params;
    const allStudents = await getAllStudents();
    const currentStudent = await getStudentById(id);

    if (!currentStudent) {
        notFound();
    }

    return <StudentRankingDashboard allStudents={allStudents} currentStudentId={currentStudent.id} />;
}
