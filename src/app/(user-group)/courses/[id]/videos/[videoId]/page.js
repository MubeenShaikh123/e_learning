import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Enrollment from '@/models/course/enrollmentModel';
import Video from '@/models/course/videoModel';
import connectDB from '@/middleware/connectDB';

const VideoPlayer = async ({ params }) => {
  const { id, videoId } = params;

  // Get user session
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/not-found');
  }

  // Connect to database
  await connectDB();

  try {
    // Check enrollment directly from database
    const enrollment = await Enrollment.findOne({ 
      userId: session.user.email, 
      courseId: id 
    }).lean();

    if (!enrollment) {
      redirect('/not-found');
    }

    // Fetch specific video directly from database
    const video = await Video.findOne({ 
      _id: videoId, 
      courseId: id 
    }).lean();

    if (!video) {
      redirect('/not-found');
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="fixed bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-200/10 to-blue-200/10 rounded-full blur-2xl animate-pulse delay-500"></div>

        <div className="max-w-6xl mx-auto p-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              {video.title}
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl overflow-hidden p-8">
            <div className="relative overflow-hidden rounded-2xl w-full aspect-video shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-2xl"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );

  } catch (error) {
    console.error("Error fetching video:", error);
    redirect('/not-found');
  }
};

export default VideoPlayer;