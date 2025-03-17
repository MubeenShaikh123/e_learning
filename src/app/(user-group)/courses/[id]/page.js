import Image from 'next/image';
import { notFound } from 'next/navigation';
import Details from './details/details';

const CoursePage = async ({ params }) => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/get/${params.id}`);
  // const { data: course } = await res.json();
  // if (!course) {
  //   notFound();
  // }

  const course = {
    "_id": "66b0614fe62c16a46fe8a151",
    "title": "Full Stack Web Development",
    "description": "Learn to build complete web applications from scratch using modern technologies like React, Node.js, and MongoDB.",
    "price": 299,
    "duration": 2,
    "startingFrom": '2 Aug 2024',
    "instructor": "John Doe",
    "category": "Web Development",
    "modules": [
      {
        "title": "Introduction to Web Development",
        "description": "An overview of web development, including the basics of HTML, CSS, and JavaScript.",
        "duration": 60,
        "content": [
          "What is Web Development?",
          "Introduction to HTML, CSS, and JavaScript",
          "Setting up a Development Environment"
        ]
      },
      {
        "title": "Frontend Development with React",
        "description": "Learn how to create dynamic and interactive user interfaces using React.",
        "duration": 120,
        "content": [
          "Introduction to React",
          "Components and Props",
          "State Management with Hooks",
          "Building a Simple React Application"
        ]
      },
      {
        "title": "Backend Development with Node.js",
        "description": "Learn how to create server-side applications using Node.js and Express.",
        "duration": 150,
        "content": [
          "Introduction to Node.js",
          "Setting up an Express Server",
          "Building RESTful APIs",
          "Connecting to a MongoDB Database"
        ]
      },
      {
        "title": "Full Stack Project",
        "description": "Build a full-stack web application using the skills you've learned in this course.",
        "duration": 180,
        "content": [
          "Project Planning and Setup",
          "Building the Frontend with React",
          "Creating the Backend with Node.js and Express",
          "Connecting the Frontend and Backend",
          "Deploying the Application"
        ]
      }
    ],
    "reviews": [
      {
        "_id": "1",
        "reviewerName": "Alice Johnson",
        "rating": 5,
        "comment": "An excellent course that covers everything you need to know about full-stack development. Highly recommended!"
      },
      {
        "_id": "2",
        "reviewerName": "Bob Smith",
        "rating": 4,
        "comment": "Great content and practical examples, but the pace could be a bit faster. Overall, very informative."
      },
      {
        "_id": "3",
        "reviewerName": "Charlie Brown",
        "rating": 4,
        "comment": "Good course with a lot of valuable information. The project at the end was especially helpful for understanding how to apply the concepts."
      }
    ],
    "createdAt": "2024-08-05T12:00:00Z"
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