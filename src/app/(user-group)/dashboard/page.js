// app/dashboard/page.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import connectDB from "@/middleware/connectDB";
import Enrollment from '@/models/course/enrollmentModel';
import Course from "@/models/course/courseModel";
import QuizSubmission from "@/models/quizz/quizSubmissionModel";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic"; // avoid caching

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <div>Please login to access dashboard</div>;
  }

  await connectDB();

  // Fetch courses
  const enrolledCourses = await fetchEnrolledCourses(session.user.email);
  const recommendedCourses = await fetchRecommendedCourses();

  // Fetch quizzes
  const quizzSubmissions = await fetchQuizSubmissions(session.user.email);

  // Example badges data (static for now, but can query DB later)
  const badges = [
    { id: 1, name: "First Course", description: "Completed your first course", date: "Jan 15, 2025" },
    { id: 2, name: "Perfect Score", description: "Achieved 100% on a quiz", date: "Feb 3, 2025" },
  ];

  return (
    <DashboardClient
      user={JSON.parse(JSON.stringify(session.user))}
      enrolledCourses={JSON.parse(JSON.stringify(enrolledCourses))}
      recommendedCourses={JSON.parse(JSON.stringify(recommendedCourses))}
      quizzSubmissions={JSON.parse(JSON.stringify(quizzSubmissions))}
      badges={JSON.parse(JSON.stringify(badges))}
    />
  );
}

// ----- Example DB query helpers -----
async function fetchEnrolledCourses(userId) {
  console.log(`userId: ${userId}`)
  return Enrollment.find({ userId }).populate('courseId', 'title description').lean();
}

async function fetchRecommendedCourses() {
  return Course.find({}).limit(2).lean();
}

async function fetchQuizSubmissions(userId) {
  return QuizSubmission.find({ userId }).populate("quizId").lean();
}
