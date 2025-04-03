import Image from 'next/image';
import { notFound } from 'next/navigation';
import Details from './details/details';

const CoursePage = async ({ params }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/get/${params.id}`,{
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
          <div className="relative h-96">
            <Image
              fill
              alt={course.title}
              className="object-cover"
              src="/bg4.jfif"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent" />
          </div>

          <div className="relative bg-transparent z-10 px-6 sm:px-8 lg:px-12 py-8">
            <Details course={course} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default CoursePage