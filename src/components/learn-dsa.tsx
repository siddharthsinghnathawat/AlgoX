
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const dsaSeries = [
    {
        title: "Love Babbar's DSA Playlist",
        description: "A complete Data Structures and Algorithms playlist in C++ by Love Babbar, covering everything from basics to advanced topics.",
        link: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "code youtube"
    },
    {
        title: "Apna College's DSA Playlist",
        description: "Learn Data Structures & Algorithms from scratch with this comprehensive playlist by Shraddha Kapoor (Apna College).",
        link: "https://www.youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "programming tutorial"
    },
    {
        title: "Chai aur Code Web Development",
        description: "A comprehensive playlist for full-stack web development, covering JavaScript, React, Node.js, and more by Chai aur Code.",
        link: "https://www.youtube.com/playlist?list=PLu71Vw8Lgzn0-GT9e_tRR4v2-2igTQla8",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "web development"
    },
    {
        title: "Apna College's C Language Playlist",
        description: "Learn the fundamentals of C programming from the ground up with this detailed tutorial series from Apna College.",
        link: "https://www.youtube.com/watch?v=irqbmMNs2Bo",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "c programming"
    },
    {
        title: "CodeWithHarry's Python Playlist",
        description: "A complete Python tutorial playlist by CodeWithHarry, perfect for beginners and experienced programmers alike.",
        link: "https://www.youtube.com/watch?v=7wnove7K-ZQ&list=PLu0W_9lII9agwh1XjRt242xIpHhPT2llg",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "python code"
    }
]

export function LearnDsa() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Learn to Code</h1>
        <p className="text-muted-foreground">Curated playlists from top educators to help you master your skills.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {dsaSeries.map((series) => (
            <Card key={series.title} className="flex flex-col">
                <CardHeader>
                    <div className="relative h-40 w-full mb-4">
                        <Image
                            src={series.imageUrl}
                            alt={series.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                            data-ai-hint={series.imageHint}
                        />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="text-primary"/> 
                        {series.title}
                    </CardTitle>
                    <CardDescription>{series.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    {/* Additional content can go here if needed */}
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={series.link} target="_blank" rel="noopener noreferrer">
                            <Youtube className="mr-2 h-4 w-4"/>
                            Watch on YouTube
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
