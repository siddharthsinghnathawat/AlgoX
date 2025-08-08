
import { ProblemSet } from '@/components/problem-set';
import { getProblemSet } from '@/lib/problem-set-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AX Problem Set',
  description: 'A curated list of over 500 problems to practice.',
};

export default async function ProblemSetPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const problems = getProblemSet();
    return <ProblemSet problems={problems} studentId={id} />;
}
