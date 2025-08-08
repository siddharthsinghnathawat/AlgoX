
import { LearnDsa } from '@/components/learn-dsa';
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
    title: `${studentName} - Learn DSA`,
    description: 'Learn Data Structures and Algorithms.',
  }
}

export default async function LearnPage({ params }: { params: Promise<{ id:string }> }) {
    const { id } = await params;
    const student = await getStudentById(id);

    if (!student) {
        notFound();
    }

    return <LearnDsa />;
}
