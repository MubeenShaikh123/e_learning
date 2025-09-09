import Image from 'next/image';
import { notFound } from 'next/navigation';
import Details from './details/details';
import { BookOpen } from 'lucide-react';
import Course from '@/models/course/courseModel';
import connectDB from '@/middleware/connectDB';

// Direct database query - no API needed!
const fetchCourse = async (id) => {
  try {
    // Connect to database
    await connectDB();
    
    // Direct MongoDB query
    const course = await Course.findById(id).lean(); // .lean() for better performance
    
    if (!course) {
      return null;
    }
    
    // Convert MongoDB _id to string for Next.js serialization
    return {
      ...course,
      _id: course._id.toString(),
    };
  } catch (error) {
    console.error('Database error:', error.message);
    return null;
  }
};

const CoursePage = async ({ params }) => {
  const course = await fetchCourse(params.id);

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-200/10 to-blue-200/10 rounded-full blur-2xl animate-pulse delay-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl overflow-hidden">
          {course.image ? (
            <div className="relative h-96 overflow-hidden">
              <Image
                fill
                alt={course.title}
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                src={course.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
            </div>
          ) : (
            <div className="relative h-96 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-white opacity-90" />
              </div>
              <div className="absolute top-6 right-6">
                <div className="w-4 h-4 bg-white/60 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-6 left-6">
                <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse delay-1000"></div>
              </div>
            </div>
          )}

          <div className="relative backdrop-blur-sm bg-white/50 z-10 px-6 sm:px-8 lg:px-12 py-8">
            <Details course={course} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default CoursePage