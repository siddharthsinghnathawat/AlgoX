
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';

// Note: In a real application, you'd have a server action to create a mentor.
// For this prototype, we'll simulate it and show a message.

export default function MentorSignupPage() {
  const [username, setUsername] = useState('');
  const [realName, setRealName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In this prototype, we will just display a success message
    // as there's no backend function to actually create a mentor.
    setIsSuccess(true);
    setIsLoading(false);
  };

  if (isSuccess) {
      return (
           <main className="flex min-h-screen flex-col items-center justify-center bg-black p-8">
                <Card className="w-full max-w-md border-neutral-800 bg-neutral-950 text-white shadow-2xl shadow-blue-500/10">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold">Request Submitted</CardTitle>
                        <CardDescription className="text-neutral-400 pt-2">
                            Thank you for your interest. Mentor sign-up is currently by invitation only. We will review your request.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button onClick={() => router.push('/')} className="w-full bg-white text-black hover:bg-neutral-200">
                            Return to Home
                        </Button>
                    </CardContent>
                </Card>
           </main>
      )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-8">
      <Card className="w-full max-w-md border-neutral-800 bg-neutral-950 text-white shadow-2xl shadow-blue-500/10">
        <CardHeader className="text-center">
           <div className="mx-auto mb-4">
            <Logo height={64} width={64} />
           </div>
          <CardTitle className="text-3xl font-bold">Mentor Sign Up</CardTitle>
          <CardDescription className="text-neutral-400">Request an account to manage students.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="realName">Full Name</Label>
              <Input
                id="realName"
                placeholder="e.g., Grace Hopper"
                required
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                disabled={isLoading}
                className="bg-neutral-900 border-neutral-700"
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="e.g., grace_hopper"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="bg-neutral-900 border-neutral-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a secure password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="bg-neutral-900 border-neutral-700"
              />
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <Button type="submit" className="w-full bg-white text-black hover:bg-neutral-200" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Request Account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-neutral-400 flex justify-center">
            Already have an account?&nbsp;
            <Link href="/mentor/login" className="font-semibold text-white hover:underline">
                Login
            </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
