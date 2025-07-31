import Image from 'next/image';
import { notFound } from 'next/navigation';
import Details from './details/details';
import { BookOpen } from 'lucide-react';

const CoursePage = async ({ params }) => {
  const res = await fetch(`/api/courses/get/${params.id}`, {
    cache: "no-store",
  });
  const jsonResponse = await res.json();
  const { data: course } = jsonResponse;
  if (!course) {
    notFound();
  }

  // ✅ If course not found, show 404
  if (!course) {
    notFound();
  }
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {course.image ? (<div className="relative h-96 overflow-hidden rounded-t-xl">
            <Image
              fill
              alt={course.title}
              className="object-cover"
              src={course.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          </div>) : (
            // Course Image Placeholder
            <div className="relative h-96 overflow-hidden rounded-t-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white opacity-90" />
              </div>
            </div>
          )}

          <div className="relative bg-transparent z-10 px-6 sm:px-8 lg:px-12 py-8">
            <Details course={course} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default CoursePage