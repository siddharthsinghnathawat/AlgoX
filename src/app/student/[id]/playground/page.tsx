
import { Compiler } from '@/components/compiler';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Code Playground',
  description: 'A code compiler and playground to test your solutions.',
};

export default function PlaygroundPage() {
    return <Compiler />;
}
