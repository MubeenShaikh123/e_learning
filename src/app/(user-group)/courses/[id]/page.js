import Image from 'next/image';
import { notFound } from 'next/navigation';
import Details from './details/details';

const CoursePage = async ({ params }) => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/get/${params.id}`);
  // const { data: course } = await res.json();
  // if (!course) {
  //   notFound();
  // }

  const courses = [
    {
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
        }
      ],
      "reviews": [
        {
          "_id": "1",
          "reviewerName": "Alice Johnson",
          "rating": 5,
          "comment": "An excellent course that covers everything you need to know about full-stack development. Highly recommended!"
        }
      ],
      "createdAt": "2024-08-05T12:00:00Z"
    },
    {
      "_id": "2",
      "title": "Data Science and Machine Learning",
      "description": "Master the art of data analysis and machine learning with Python and its powerful libraries.",
      "price": 399,
      "duration": 3,
      "startingFrom": '10 Aug 2024',
      "instructor": "Jane Smith",
      "category": "Data Science",
      "modules": [
        {
          "title": "Introduction to Data Science",
          "description": "Get started with data science by learning about data analysis, Python, and key libraries.",
          "duration": 90,
          "content": [
            "What is Data Science?",
            "Introduction to Python",
            "Data Analysis with Pandas"
          ]
        }
      ],
      "reviews": [
        {
          "_id": "2",
          "reviewerName": "Bob Smith",
          "rating": 4,
          "comment": "Great content and practical examples, but the pace could be a bit faster. Overall, very informative."
        }
      ],
      "createdAt": "2024-08-06T10:00:00Z"
    },
    {
      "_id": "3",
      "title": "Mobile App Development with Flutter",
      "description": "Learn to build beautiful and responsive mobile applications for Android and iOS using Flutter.",
      "price": 349,
      "duration": 2.5,
      "startingFrom": '15 Aug 2024',
      "instructor": "Michael Johnson",
      "category": "Mobile Development",
      "modules": [
        {
          "title": "Getting Started with Flutter",
          "description": "Introduction to Flutter and setting up your development environment.",
          "duration": 60,
          "content": [
            "Introduction to Flutter",
            "Setting up Flutter SDK"
          ]
        }
      ],
      "reviews": [
        {
          "_id": "3",
          "reviewerName": "Charlie Brown",
          "rating": 4,
          "comment": "Good course with a lot of valuable information. The project at the end was especially helpful for understanding how to apply the concepts."
        }
      ],
      "createdAt": "2024-08-07T15:00:00Z"
    },
    {
      "_id": "4",
      "title": "Cybersecurity Essentials",
      "description": "Understand the fundamentals of cybersecurity and learn how to protect systems from cyber threats.",
      "price": 259,
      "duration": 1.5,
      "startingFrom": '20 Aug 2024',
      "instructor": "Sarah Connor",
      "category": "Cybersecurity",
      "modules": [
        {
          "title": "Introduction to Cybersecurity",
          "description": "Learn the basics of cybersecurity, including key concepts and terminology.",
          "duration": 60,
          "content": [
            "What is Cybersecurity?",
            "Understanding Threats and Vulnerabilities"
          ]
        }
      ],
      "reviews": [
        {
          "_id": "4",
          "reviewerName": "David Lee",
          "rating": 5,
          "comment": "Highly detailed and well-organized. A must for anyone interested in cybersecurity."
        }
      ],
      "createdAt": "2024-08-08T09:00:00Z"
    },
    {
      "_id": "5",
      "title": "Artificial Intelligence with Python",
      "description": "Learn to build intelligent systems and applications using Python and machine learning algorithms.",
      "price": 499,
      "duration": 3,
      "startingFrom": '25 Aug 2024',
      "instructor": "Albert Newton",
      "category": "Artificial Intelligence",
      "modules": [
        {
          "title": "Introduction to Artificial Intelligence",
          "description": "Understand the basics of AI and its applications in various industries.",
          "duration": 90,
          "content": [
            "What is Artificial Intelligence?",
            "AI vs. Machine Learning vs. Deep Learning"
          ]
        }
      ],
      "reviews": [
        {
          "_id": "5",
          "reviewerName": "Eva Adams",
          "rating": 5,
          "comment": "Very detailed and insightful course. The TensorFlow section was especially useful."
        }
      ],
      "createdAt": "2024-08-09T11:00:00Z"
    }
  ];

  // ✅ Match course with `params.id`
  const course = courses.find(c => c._id === params.id);

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