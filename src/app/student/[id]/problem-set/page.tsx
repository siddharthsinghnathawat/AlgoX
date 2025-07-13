
import { ProblemSet } from '@/components/problem-set';
import { getProblemSet } from '@/lib/problem-set-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AX Problem Set',
  description: 'A curated list of over 500 problems to practice.',
};

export default function ProblemSetPage({ params }: { params: { id: string } }) {
    const problems = getProblemSet();
    return <ProblemSet problems={problems} studentId={params.id} />;
}
