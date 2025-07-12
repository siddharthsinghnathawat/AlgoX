
'use client';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useState } from "react"
import { useToast } from "./ui/use-toast"
import type { Problem } from "@/lib/types"
import { addProblem } from "@/app/actions"

const formSchema = z.object({
  title: z.string().min(1, "Title is required."),
  platform: z.enum(["LeetCode", "GeeksforGeeks"], { required_error: "Platform is required." }),
  link: z.string().url("Please enter a valid URL."),
  difficulty: z.enum(["Easy", "Medium", "Hard"], { required_error: "Difficulty is required." }),
  tags: z.string().optional(),
})

type AddProblemDialogProps = {
  onAddProblem: (newProblem: Problem) => void;
};

export function AddProblemDialog({ onAddProblem }: AddProblemDialogProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      link: "",
      tags: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const problemData = {
      ...values,
      tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
    };
    const newProblem = await addProblem(problemData);
    
    if (newProblem) {
        onAddProblem(newProblem);
        toast({
          title: "Problem Added!",
          description: `"${values.title}" has been added.`,
        });
        setOpen(false)
        form.reset()
    } else {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to add the new problem."
        })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Problem
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Problem</DialogTitle>
          <DialogDescription>
            Add a new coding problem for your students.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Two Sum" className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Platform</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a platform" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LeetCode">LeetCode</SelectItem>
                      <SelectItem value="GeeksforGeeks">GeeksforGeeks</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Difficulty</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="Array, Hash Table, ..." className="col-span-3" {...field} />
                  </FormControl>
                   <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add Problem</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
