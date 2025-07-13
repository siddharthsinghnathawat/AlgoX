
import { Roadmap } from '@/components/roadmap';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DSA Learning Roadmap',
  description: 'A guided roadmap for learning Data Structures and Algorithms from basic to advanced.',
};

export default function RoadmapPage() {
    return <Roadmap />;
}
