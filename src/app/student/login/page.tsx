
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getStudentForLogin } from '@/app/actions';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
        const student = await getStudentForLogin(username, password);

        if (student) {
          toast({
            title: 'Login Successful!',
            description: `Welcome back, ${student.realName}!`,
          });
          router.push(`/student/${student.id}/dashboard`);
        } else {
          setError('Invalid username or password. Please try again.');
        }
    } catch (e) {
        setError('An error occurred during login. Please try again.');
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
          <CardTitle className="text-3xl font-bold">Student Login</CardTitle>
          <CardDescription className="text-neutral-400">Enter your credentials to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
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
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="bg-neutral-900 border-neutral-700"
              />
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <Button type="submit" className="w-full bg-white text-black hover:bg-neutral-200" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
         <CardFooter className="text-center text-sm text-neutral-400 flex justify-center">
            Don't have an account?&nbsp;
            <Link href="/student/signup" className="font-semibold text-white hover:underline">
                Sign Up
            </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
