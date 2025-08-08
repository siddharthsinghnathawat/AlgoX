
import { SdeSheet } from '@/components/sde-sheet';
import { getStudentById } from '@/app/actions';
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
    title: `${studentName} - SDE Sheet`,
    description: 'SDE Interview Preparation Sheet.',
  }
}

export default async function SdeSheetPage({ params }: { params: Promise<{ id:string }> }) {
    const { id } = await params;
    const student = await getStudentById(id);

    if (!student) {
        notFound();
    }

    return <SdeSheet student={student} />;
}
