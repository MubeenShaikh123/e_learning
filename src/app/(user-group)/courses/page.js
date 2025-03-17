import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Course = ({ isHome }) => {

    const courses = [{
        "_id": "66b0614fe62c16a46fe8a151",
        "title": "Full Stack Web Development",
        "description": "Learn to build complete web applications from scratch using modern technologies like React, Node.js, and MongoDB.",
        "price": 299,
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
        "createdAt": "2024-08-05T12:00:00Z"
    },
    {
        "_id": "2",
        "title": "Data Science and Machine Learning",
        "description": "Master the art of data analysis and machine learning with Python and its powerful libraries.",
        "price": 399,
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
                    "Data Analysis with Pandas",
                    "Data Visualization with Matplotlib"
                ]
            },
            {
                "title": "Statistics for Data Science",
                "description": "Learn essential statistics concepts that are crucial for data analysis.",
                "duration": 120,
                "content": [
                    "Descriptive Statistics",
                    "Probability Distributions",
                    "Hypothesis Testing",
                    "Correlation and Regression"
                ]
            },
            {
                "title": "Machine Learning Algorithms",
                "description": "Dive deep into machine learning algorithms like linear regression, decision trees, and more.",
                "duration": 150,
                "content": [
                    "Introduction to Machine Learning",
                    "Supervised vs. Unsupervised Learning",
                    "Linear Regression",
                    "Decision Trees and Random Forests",
                    "Clustering Algorithms"
                ]
            },
            {
                "title": "Capstone Project",
                "description": "Apply your knowledge by working on a real-world data science project.",
                "duration": 200,
                "content": [
                    "Problem Identification",
                    "Data Collection and Preprocessing",
                    "Model Building and Evaluation",
                    "Project Presentation and Documentation"
                ]
            }
        ],
        "createdAt": "2024-08-06T10:00:00Z"
    },
    {
        "_id": "3",
        "title": "Mobile App Development with Flutter",
        "description": "Learn to build beautiful and responsive mobile applications for Android and iOS using Flutter.",
        "price": 349,
        "instructor": "Michael Johnson",
        "category": "Mobile Development",
        "modules": [
            {
                "title": "Getting Started with Flutter",
                "description": "Introduction to Flutter and setting up your development environment.",
                "duration": 60,
                "content": [
                    "Introduction to Flutter",
                    "Setting up Flutter SDK",
                    "Creating Your First Flutter App",
                    "Understanding the Widget Tree"
                ]
            },
            {
                "title": "Building User Interfaces",
                "description": "Learn how to design and build user-friendly interfaces in Flutter.",
                "duration": 120,
                "content": [
                    "Building Layouts with Flutter",
                    "Working with Material and Cupertino Widgets",
                    "Handling User Input",
                    "Managing State with Provider"
                ]
            },
            {
                "title": "Connecting to the Backend",
                "description": "Learn how to connect your Flutter app to a backend service using REST APIs.",
                "duration": 150,
                "content": [
                    "Introduction to REST APIs",
                    "Making HTTP Requests in Flutter",
                    "Parsing JSON Data",
                    "Handling Authentication"
                ]
            },
            {
                "title": "Deploying Your App",
                "description": "Learn how to publish your app on the Google Play Store and Apple App Store.",
                "duration": 100,
                "content": [
                    "Preparing Your App for Release",
                    "Publishing on Google Play Store",
                    "Publishing on Apple App Store",
                    "Maintaining and Updating Your App"
                ]
            }
        ],
        "createdAt": "2024-08-07T15:00:00Z"
    },
    {
        "_id": "4",
        "title": "Cybersecurity Essentials",
        "description": "Understand the fundamentals of cybersecurity and learn how to protect systems from cyber threats.",
        "price": 259,
        "instructor": "Sarah Connor",
        "category": "Cybersecurity",
        "modules": [
            {
                "title": "Introduction to Cybersecurity",
                "description": "Learn the basics of cybersecurity, including key concepts and terminology.",
                "duration": 60,
                "content": [
                    "What is Cybersecurity?",
                    "Understanding Threats and Vulnerabilities",
                    "Cybersecurity Frameworks and Standards",
                    "Introduction to Ethical Hacking"
                ]
            },
            {
                "title": "Network Security",
                "description": "Protect your network from unauthorized access and cyber attacks.",
                "duration": 120,
                "content": [
                    "Introduction to Network Security",
                    "Firewalls and Intrusion Detection Systems",
                    "VPNs and Secure Communication",
                    "Network Monitoring and Incident Response"
                ]
            },
            {
                "title": "Application Security",
                "description": "Learn how to secure web and mobile applications from common vulnerabilities.",
                "duration": 150,
                "content": [
                    "Understanding Application Security",
                    "Common Web Application Vulnerabilities",
                    "OWASP Top Ten",
                    "Securing APIs"
                ]
            },
            {
                "title": "Security Best Practices",
                "description": "Implement security best practices to protect your systems and data.",
                "duration": 100,
                "content": [
                    "User Authentication and Authorization",
                    "Data Encryption Techniques",
                    "Security Policies and Procedures",
                    "Regular Security Audits and Penetration Testing"
                ]
            }
        ],
        "createdAt": "2024-08-08T09:00:00Z"
    },
    {
        "_id": "5",
        "title": "Artificial Intelligence with Python",
        "description": "Learn to build intelligent systems and applications using Python and machine learning algorithms.",
        "price": 499,
        "instructor": "Albert Newton",
        "category": "Artificial Intelligence",
        "modules": [
            {
                "title": "Introduction to Artificial Intelligence",
                "description": "Understand the basics of AI and its applications in various industries.",
                "duration": 90,
                "content": [
                    "What is Artificial Intelligence?",
                    "AI vs. Machine Learning vs. Deep Learning",
                    "Applications of AI in Industry",
                    "Getting Started with Python for AI"
                ]
            },
            {
                "title": "Machine Learning Foundations",
                "description": "Learn the fundamentals of machine learning algorithms and how to implement them in Python.",
                "duration": 150,
                "content": [
                    "Supervised Learning Algorithms",
                    "Unsupervised Learning Algorithms",
                    "Reinforcement Learning",
                    "Model Evaluation and Optimization"
                ]
            },
            {
                "title": "Deep Learning with TensorFlow",
                "description": "Dive into deep learning and build neural networks using TensorFlow.",
                "duration": 180,
                "content": [
                    "Introduction to Neural Networks",
                    "Building and Training Deep Learning Models",
                    "Convolutional Neural Networks",
                    "Natural Language Processing with RNNs"
                ]
            },
            {
                "title": "AI Capstone Project",
                "description": "Apply your AI knowledge to solve a complex problem in a real-world scenario.",
                "duration": 200,
                "content": [
                    "Project Ideation and Planning",
                    "Data Collection and Preprocessing",
                    "Model Development and Evaluation",
                    "Deploying AI Models in Production"
                ]
            }
        ],
        "createdAt": "2024-08-09T11:00:00Z"
    }
    ]

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Expert-Led Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover a wide range of courses designed to help you excel in your career. From beginner to advanced levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div 
              key={course._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  fill
                  alt={course.title}
                  className="object-cover"
                  src="/bg4.jfif"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              </div>
              
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <Link href={`/courses/${course._id}`} className="hover:text-indigo-600 transition-colors">
                    {course.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">4.8</span>
                    <span className="text-gray-500">(1.2k)</span>
                  </div>
                  <span className="text-lg font-bold text-indigo-600">₹{course.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isHome && (
          <div className="mt-12 text-center">
            <Link href="/courses" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
              View All Courses
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default Course