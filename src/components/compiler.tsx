
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Terminal, Play, LoaderCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { executeCodeAction } from '@/app/actions';
import { useToast } from './ui/use-toast';

const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c++', label: 'C++' },
];

export function Compiler() {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [stdin, setStdin] = useState('');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleRunCode = async () => {
        if (!code.trim()) {
            toast({
                variant: 'destructive',
                title: 'No code to run!',
                description: 'Please write some code before executing.',
            });
            return;
        }

        setIsLoading(true);
        setOutput('');

        try {
            const result = await executeCodeAction({ language, code, stdin });
            if (result.success) {
                setOutput(result.output || '');
            } else {
                setOutput(`Error:\n${result.error}`);
            }
        } catch (e) {
            toast({
                variant: 'destructive',
                title: 'Execution Failed',
                description: 'An unexpected error occurred while running the code.',
            });
            setOutput('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Playground</h1>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Terminal className="text-primary" />
                        Code Compiler
                    </CardTitle>
                    <CardDescription>
                        Write, run, and test your code in different languages.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-3 space-y-2">
                            <Label htmlFor="code-editor">Code</Label>
                            <Textarea
                                id="code-editor"
                                placeholder="Write your code here..."
                                className="h-96 font-mono"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                        <div className="md:col-span-1 space-y-2">
                             <Label htmlFor="language-select">Language</Label>
                             <Select value={language} onValueChange={setLanguage}>
                                <SelectTrigger id="language-select">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {languages.map((lang) => (
                                        <SelectItem key={lang.value} value={lang.value}>
                                            {lang.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                             </Select>
                             <Button onClick={handleRunCode} disabled={isLoading} className="w-full mt-4">
                                {isLoading ? (
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Play className="mr-2 h-4 w-4" />
                                )}
                                Run Code
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Tabs defaultValue="output">
                            <TabsList>
                                <TabsTrigger value="output">Output</TabsTrigger>
                                <TabsTrigger value="input">Standard Input (stdin)</TabsTrigger>
                            </TabsList>
                            <TabsContent value="output" className="mt-2">
                                <Label htmlFor="output-area">Output</Label>
                                 <Textarea
                                    id="output-area"
                                    readOnly
                                    placeholder="Your code's output will appear here..."
                                    className="h-40 font-mono bg-muted"
                                    value={output}
                                />
                            </TabsContent>
                            <TabsContent value="input" className="mt-2">
                                <Label htmlFor="input-area">Input</Label>
                                 <Textarea
                                    id="input-area"
                                    placeholder="Enter standard input for your code here..."
                                    className="h-40 font-mono"
                                    value={stdin}
                                    onChange={(e) => setStdin(e.target.value)}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
