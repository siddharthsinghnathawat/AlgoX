
import { StudentProblemsList } from '@/components/student-problems-list';
import { getStudentById, getStudentProblems } from '@/app/actions';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const student = await getStudentById(params.id);
  const studentName = student?.realName || 'Student';
  
  return {
    title: `Problems for ${studentName}`,
    description: `Assigned problems for ${studentName}.`,
  }
}

export default async function ProblemsPage({ params }: { params: { id:string } }) {
    const student = await getStudentById(params.id);

    if (!student) {
        notFound();
    }

    const studentProblems = await getStudentProblems(student.id);
    
    return <StudentProblemsList student={student} studentProblems={studentProblems} />;
}
