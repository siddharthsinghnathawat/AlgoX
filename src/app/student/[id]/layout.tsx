
'use client'
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, Home, BarChart3, ListChecks, BookOpenCheck, Terminal, BookOpen, LayoutGrid, Map, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';
import { notFound, usePathname, useParams } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { getStudentById } from '@/app/actions';
import { useEffect, useState } from 'react';
import type { Student } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Preloader } from '@/components/preloader';

function LayoutSkeleton() {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <Logo />
                </SidebarHeader>
                <SidebarContent>
                    <div className="p-2 space-y-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </div>
                </SidebarContent>
                 <SidebarFooter>
                    <div className="p-2 space-y-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                         <Skeleton className="h-8 w-full" />
                    </div>
                </SidebarFooter>
            </Sidebar>
             <SidebarInset>
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
                    <SidebarTrigger className="md:hidden"/>
                </header>
                <main className="flex-1 p-6">
                    <Skeleton className="h-[200px] w-full" />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}


export default function StudentLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const params = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/student/login");
        return;
      }
      
      // If user is authenticated but trying to access a different user's dashboard,
      // redirect them to their own dashboard
      if (user.uid !== params.id) {
        router.replace(`/student/${user.uid}/dashboard`);
        return;
      }
      
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [params.id, router]);

  useEffect(() => {
    if (params.id) {
      getStudentById(params.id)
        .then((data) => {
          setStudent(data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [params.id]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/student/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading || !authChecked) {
    return <Preloader isLoading={true} />;
  }

  if (!student) {
    notFound();
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-semibold">AlgoX</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.endsWith('/dashboard')}>
                <Link href={`/student/${params.id}/dashboard`}>
                  <Home />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.endsWith('/problems')}>
                <Link href={`/student/${params.id}/problems`}>
                  <ListChecks />
                  Problems
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.endsWith('/problem-set')}>
                <Link href={`/student/${params.id}/problem-set`}>
                  <LayoutGrid />
                  Problem Set
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.endsWith('/playground')}>
                <Link href={`/student/${params.id}/playground`}>
                  <Terminal />
                  Playground
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.endsWith('/sde-sheet')}>
                <Link href={`/student/${params.id}/sde-sheet`}>
                  <BookOpenCheck />
                  SDE Sheet
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.endsWith('/preparation')}>
                <Link href={`/student/${params.id}/preparation`}>
                  <ClipboardCheck />
                  Preparation
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.endsWith('/roadmap')}>
                <Link href={`/student/${params.id}/roadmap`}>
                  <Map />
                  Roadmap
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.endsWith('/learn')}>
                <Link href={`/student/${params.id}/learn`}>
                  <BookOpen />
                  Learn
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.endsWith('/ranking')}>
                <Link href={`/student/${params.id}/ranking`}>
                  <BarChart3 />
                  Ranking
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                 <SidebarMenuItem>
                     <SidebarMenuButton>
                        <Settings />
                        Settings
                    </SidebarMenuButton>
                 </SidebarMenuItem>
                 <SidebarMenuItem>
                     <SidebarMenuButton asChild>
                        <button onClick={handleLogout} className="w-full text-left">
                            <LogOut />
                            Logout
                        </button>
                     </SidebarMenuButton>
                 </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={student?.avatarUrl ?? undefined} alt={student?.username ?? 'Student'} data-ai-hint="person" />
                            <AvatarFallback>{student?.username.charAt(0).toUpperCase() || 'S'}</AvatarFallback>
                        </Avatar>
                        <span>{student.username}</span>
                    </SidebarMenuButton>
                 </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
            <SidebarTrigger className="md:hidden"/>
            <div className="flex-1">
                {/* Header content for mobile or right side content can go here */}
            </div>
        </header>
        <main className="flex-1 p-6">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
