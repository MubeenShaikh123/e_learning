import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Enrollment from '@/models/course/enrollmentModel';
import Video from '@/models/course/videoModel';
import CourseVideoClient from './CourseVideoClient';
import connectDB from '@/middleware/connectDB';

// Server Component
const CourseVideos = async ({ params }) => {
  const { id } = params;

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

    // Fetch videos directly from database
    const videos = await Video.find({ courseId: id }).lean();

    // Convert MongoDB ObjectIds to strings for client component
    const serializedVideos = videos.map(video => ({
      ...video,
      _id: video._id.toString(),
      courseId: video.courseId.toString(),
      createdAt: video.createdAt?.toISOString(),
      updatedAt: video.updatedAt?.toISOString()
    }));

    // Pass data to client component for interactivity
    return <CourseVideoClient videos={serializedVideos} courseId={id} />;

  } catch (error) {
    console.error("Error fetching course data:", error);
    redirect('/not-found');
  }
};

export default CourseVideos;