
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Logo } from '@/components/logo';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getStudentByEmail } from '@/lib/firebase-data';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User logged in successfully:', user);

      // Get student data from Firestore
      const student = await getStudentByEmail(email);
      
      if (student) {
        console.log('Student found:', student);
        toast({
          title: "Login Successful!",
          description: `Welcome back, ${student.realName}!`,
        });
        router.push(`/student/${student.id}/dashboard`);
      } else {
        console.log('Student not found for email:', email);
        setError("Student profile not found. Please contact support.");
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/user-not-found') {
        setError("No account found with this email. Please sign up first.");
      } else if (error.code === 'auth/wrong-password') {
        setError("Incorrect password. Please try again.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Invalid email address. Please check your email.");
      } else {
        setError(error.message || "An error occurred during login. Please try again.");
      }
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
          <CardDescription className="text-neutral-400">Sign in with your email and password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          Don&apos;t have an account?&nbsp;
          <Link href="/student/signup" className="font-semibold text-white hover:underline">
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
