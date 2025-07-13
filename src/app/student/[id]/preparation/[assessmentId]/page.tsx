
import { AssessmentView } from '@/components/assessment-view';
import { getAssessmentById } from '@/lib/assessment-data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: { assessmentId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const assessment = getAssessmentById(params.assessmentId);
  const assessmentName = assessment?.company || 'Assessment';
  
  return {
    title: `${assessmentName} Assessment`,
    description: `Timed coding assessment for ${assessmentName}.`,
  }
}

export default function AssessmentPage({ params }: Props) {
    const assessment = getAssessmentById(params.assessmentId);

    if (!assessment || assessment.problems.length === 0) {
        notFound();
    }
    
    return <AssessmentView assessment={assessment} />;
}

    