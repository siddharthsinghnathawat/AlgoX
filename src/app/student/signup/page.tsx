
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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createStudentProfile } from '@/lib/firebase-data';

export default function StudentSignupPage() {
  const [codername, setCodername] = useState("");
  const [realName, setRealName] = useState("");
  const [leetcodeId, setLeetcodeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!codername.trim()) {
      setError("Codername is required.");
      return;
    }
    if (!realName.trim()) {
      setError("Real name is required.");
      return;
    }
    if (!leetcodeId.trim()) {
      setError("LeetCode ID is required.");
      return;
    }

    setIsLoading(true);
    try {
      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('Firebase user created successfully:', user);

      // Create student profile in Firestore
      const student = await createStudentProfile({
        uid: user.uid,
        codername,
        realName,
        email,
        leetcodeId,
        avatarUrl: `https://placehold.co/100x100.png`,
      });

      console.log('Student profile created:', student);

      toast({
        title: "Account Created!",
        description: "Your account has been created successfully. Welcome!",
      });

      // Redirect to the student's dashboard
      router.push(`/student/${user.uid}/dashboard`);
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError("This email is already registered. Please use a different email or login.");
      } else if (error.code === 'auth/weak-password') {
        setError("Password is too weak. Please choose a stronger password.");
      } else {
        setError(error.message || "An error occurred during sign up. Please try again.");
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
          <CardTitle className="text-3xl font-bold">Create Student Account</CardTitle>
          <CardDescription className="text-neutral-400">Join AlgoX and start your coding journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="codername">Codername *</Label>
              <Input
                id="codername"
                placeholder="e.g., code_master_123"
                required
                value={codername}
                onChange={(e) => setCodername(e.target.value)}
                disabled={isLoading}
                className="bg-neutral-900 border-neutral-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="realName">Real Name *</Label>
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
              <Label htmlFor="leetcodeId">LeetCode ID *</Label>
              <Input
                id="leetcodeId"
                placeholder="e.g., ada_lovelace"
                required
                value={leetcodeId}
                onChange={(e) => setLeetcodeId(e.target.value)}
                disabled={isLoading}
                className="bg-neutral-900 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
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
              <Label htmlFor="password">Password *</Label>
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
              {isLoading ? "Creating Account..." : "Sign Up"}
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
