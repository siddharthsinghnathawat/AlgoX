
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { Preloader } from '@/components/preloader';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Since we are using client-side state for the preloader, we can't export metadata directly.
// In a real app, you might handle this differently, but for this context, we can define it here.
const metadata: Metadata = {
  metadataBase: new URL('https://algox.example.com'), // Replace with your actual domain
  title: {
    default: 'AlgoX',
    template: '%s | AlgoX',
  },
  description: 'Track your Code. Build your Streak. Level up your Skills.',
  openGraph: {
    title: 'AlgoX',
    description: 'Track your Code. Build your Streak. Level up your Skills.',
    images: ['/og-image.png'], // Add a path to an OG image
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlgoX',
    description: 'Track your Code. Build your Streak. Level up your Skills.',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // This effect runs once on the client after initial mount.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Preloader duration

    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures it runs only once

  useEffect(() => {
    // This effect handles the "logout on reload" logic.
    const isReload = sessionStorage.getItem('reloaded') === null;
    if (isReload) {
      sessionStorage.setItem('reloaded', 'true');
      if (pathname.startsWith('/student/') || pathname.startsWith('/mentor/')) {
        // If on a protected route on initial load, redirect to home.
        if (pathname !== '/student/login' && pathname !== '/mentor/login') {
            router.replace('/');
        }
      }
    }
    
    // Clean up session storage when the tab is closed
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('reloaded');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };

  }, [pathname, router]);


  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} dark`}>
       <head>
        {/* We can manually add title and meta tags here */}
        <title>AlgoX</title>
        <meta name="description" content="Track your Code. Build your Streak. Level up your Skills." />
      </head>
      <body className="antialiased">
        <Preloader isLoading={isLoading} />
        <div className={isLoading ? 'hidden' : 'block'}>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
