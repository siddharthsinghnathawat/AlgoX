
import { LearnDsa } from '@/components/learn-dsa';
import { getStudentById } from '@/app/actions';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const student = await getStudentById(params.id);
  const studentName = student?.username || 'Student';
  
  return {
    title: `Learn`,
    description: `Curated learning resources for ${studentName}.`,
  }
}

export default async function LearnPage({ params }: { params: { id:string } }) {
    const student = await getStudentById(params.id);

    if (!student) {
        notFound();
    }
    
    return <LearnDsa />;
}
