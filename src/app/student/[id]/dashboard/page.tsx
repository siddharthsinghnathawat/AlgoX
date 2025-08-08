import { StudentDashboard } from '@/components/student-dashboard';
import { getStudentById } from '@/app/actions';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getStudentProfile } from '@/lib/firebase-data';

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const student = await getStudentProfile(id);
  const studentName = student?.realName || 'Student';
  
  return {
    title: `${studentName}'s Dashboard`,
    description: `Problem solving progress and stats for ${studentName}.`,
  }
}

export default async function DashboardPage({ params }: { params: Promise<{ id:string }> }) {
    const { id } = await params;
    let student = await getStudentProfile(id);

    // If no student found in Firestore, try local data as fallback
    if (!student) {
      student = await getStudentById(id);
    }

    if (!student) {
        notFound();
    }
    
    return <StudentDashboard student={student} />;
}
