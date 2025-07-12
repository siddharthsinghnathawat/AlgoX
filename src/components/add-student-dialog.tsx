
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { UserPlus } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { useToast } from "./ui/use-toast"
import type { Student } from "@/lib/types"
import { addStudent } from "@/app/actions"

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  realName: z.string().min(2, "Real name must be at least 2 characters."),
  password: z.string().min(6, "Password must be at least 6 characters."),
})

type AddStudentDialogProps = {
  onAddStudent: (newStudent: Student) => void;
};

export function AddStudentDialog({ onAddStudent }: AddStudentDialogProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      realName: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const studentData = {
        username: values.username,
        realName: values.realName,
        password: values.password,
        avatarUrl: `https://placehold.co/100x100.png`
    }
    const newStudent = await addStudent(studentData);

    if (newStudent) {
        onAddStudent(newStudent);
        toast({
          title: "Student Added!",
          description: `${values.realName} has been added to your roster.`,
        });
        setOpen(false)
        form.reset()
    } else {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to add student. The username might already be taken.'
        })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Add a new student to your roster to begin tracking their progress.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ada_lovelace" className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="realName"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Real Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Ada Lovelace" className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add Student</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
