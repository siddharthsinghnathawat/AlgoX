
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-8 text-white">
      <div className="text-center mb-12">
        <div className="inline-block mb-6">
          <Logo height={80} width={80} />
        </div>
        <h1 className="text-5xl font-bold">Welcome to AlgoX</h1>
        <p className="text-xl text-neutral-400 mt-4">
          Track your Code. Build your Streak. Level up your Skills.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <Card className="w-full max-w-sm border-neutral-800 bg-neutral-950 text-white shadow-2xl shadow-blue-500/10 hover:border-blue-500/50 transition-all">
          <CardHeader>
            <CardTitle className="text-2xl">For Students</CardTitle>
            <CardDescription className="text-neutral-400">
              Start your journey, solve problems, and climb the ranks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-white text-black hover:bg-neutral-200">
              <Link href="/student/login">
                Student Portal <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="w-full max-w-sm border-neutral-800 bg-neutral-950 text-white shadow-2xl shadow-purple-500/10 hover:border-purple-500/50 transition-all">
          <CardHeader>
            <CardTitle className="text-2xl">For Mentors</CardTitle>
            <CardDescription className="text-neutral-400">
              Assign problems, track progress, and guide your students.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full border-neutral-700 hover:bg-neutral-900 hover:text-white">
               <Link href="/mentor/login">
                Mentor Portal <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
