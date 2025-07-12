import { MentorStudentsList } from '@/components/mentor-students-list';
import { getAllStudents } from '@/app/actions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Students',
};

export default async function StudentsPage() {
    const students = await getAllStudents();
    return <MentorStudentsList initialStudents={students} />;
}
