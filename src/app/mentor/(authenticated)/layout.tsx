
'use client'
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, User, Home, Users, BarChart3, PanelLeft } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
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

export default function MentorAuthenticatedLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

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
              <SidebarMenuButton asChild isActive={pathname === '/mentor/dashboard'}>
                <Link href="/mentor/dashboard">
                  <Home />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/mentor/students')}>
                 <Link href="/mentor/students">
                  <Users />
                  Students
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/mentor/ranking')}>
                <Link href="/mentor/ranking">
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
                        <Link href="/">
                            <LogOut />
                            Logout
                        </Link>
                    </SidebarMenuButton>
                 </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://placehold.co/100x100.png" alt="Mentor" data-ai-hint="person" />
                            <AvatarFallback>M</AvatarFallback>
                        </Avatar>
                        <span>My Account</span>
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
