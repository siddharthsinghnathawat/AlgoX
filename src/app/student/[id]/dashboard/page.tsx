import { StudentDashboard } from '@/components/student-dashboard';
import { getStudentById } from '@/app/actions';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const student = await getStudentById(params.id);
  const studentName = student?.realName || 'Student';
  
  return {
    title: `${studentName}'s Dashboard`,
    description: `Problem solving progress and stats for ${studentName}.`,
  }
}

export default async function DashboardPage({ params }: { params: { id:string } }) {
    const student = await getStudentById(params.id);

    if (!student) {
        notFound();
    }
    
    return <StudentDashboard student={student} />;
}
