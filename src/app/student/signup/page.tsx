
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { addStudent } from '@/app/actions';
import { Logo } from '@/components/logo';

export default function StudentSignupPage() {
  const [username, setUsername] = useState('');
  const [realName, setRealName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }
    setError('');
    setIsLoading(true);

    try {
        const newStudent = await addStudent({
            username,
            realName,
            password,
            avatarUrl: `https://placehold.co/100x100.png`
        });

        if (newStudent) {
          toast({
            title: 'Account Created!',
            description: 'You can now log in with your new credentials.',
          });
          router.push('/student/login');
        } else {
          setError('This username might already be taken. Please try another.');
        }
    } catch (e) {
        setError('An error occurred during sign up. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-8">
      <Card className="w-full max-w-md border-neutral-800 bg-neutral-950 text-white shadow-2xl shadow-blue-500/10">
        <CardHeader className="text-center">
           <div className="mx-auto mb-4">
            <Logo height={64} width={64} />
           </div>
          <CardTitle className="text-3xl font-bold">Create Student Account</CardTitle>
          <CardDescription className="text-neutral-400">Join AlgoX and start your coding journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="realName">Full Name</Label>
              <Input
                id="realName"
                placeholder="e.g., Ada Lovelace"
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
                placeholder="e.g., ada_lovelace"
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
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-neutral-400 flex justify-center">
            Already have an account?&nbsp;
            <Link href="/student/login" className="font-semibold text-white hover:underline">
                Login
            </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
