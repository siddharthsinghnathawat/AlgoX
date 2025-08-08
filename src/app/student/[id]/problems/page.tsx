
import { StudentProblemsList } from '@/components/student-problems-list';
import { getStudentById, getStudentProblems } from '@/app/actions';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const student = await getStudentById(id);
  const studentName = student?.username || 'Student';

  return {
    title: `${studentName} - Problems`,
    description: 'All assigned problems.',
  }
}

export default async function ProblemsPage({ params }: { params: Promise<{ id:string }> }) {
    const { id } = await params;
    const student = await getStudentById(id);

    if (!student) {
        notFound();
    }

    const studentProblems = await getStudentProblems(student.id);
    
    return <StudentProblemsList student={student} studentProblems={studentProblems} />;
}
