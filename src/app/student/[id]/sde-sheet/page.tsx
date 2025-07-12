
import { SdeSheet } from '@/components/sde-sheet';
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
    title: `DSA Sheets for ${studentName}`,
    description: `Striver's & Love Babbar's DSA Sheet problem tracker for ${studentName}.`,
  }
}

export default async function SdeSheetPage({ params }: { params: { id:string } }) {
    const student = await getStudentById(params.id);

    if (!student) {
        notFound();
    }
    
    return <SdeSheet student={student} />;
}
