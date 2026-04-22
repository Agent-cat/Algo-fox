import CourseForm from "@/components/admin/CourseForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditCoursePage({ params }: { params: { id: string } }) {
    const { id } = await params;

    const course = await prisma.course.findUnique({
        where: { id }
    });

    if (!course) notFound();

    return <CourseForm course={course} isEdit />;
}
