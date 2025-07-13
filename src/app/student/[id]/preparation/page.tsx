
import { PreparationDashboard } from '@/components/preparation-dashboard';
import { getAssessments } from '@/lib/assessment-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interview Preparation',
  description: 'Company-wise timed assessments to prepare for your interviews.',
};

export default function PreparationPage() {
    const assessments = getAssessments();
    return <PreparationDashboard assessments={assessments} />;
}
