import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Quizz = ({ isHome }) => {
    const quizzes = [
        {
            _id: "66bce68f317341e67df79f10", // Dummy ObjectId for the quiz
            title: "Python Programming Basics",
            description: "An introductory quiz on Python programming.",
            category: "Programming",
            instructor: "Alice Johnson",
            price: 12.99,
            timeLimit: 35, // in minutes
            questions: [
                {
                    _id: "64d223456789abcd01234576", // Dummy ObjectId for the question
                    text: "Which of the following is a valid variable name in Python?",
                    type: "multiple-choice",
                    options: [
                        "2variable",
                        "variable_2",
                        "variable-2",
                        "var 2"
                    ],
                    correctAnswer: "variable_2"
                },
                {
                    _id: "64d223456789abcd01234577", // Dummy ObjectId for the question
                    text: "Python supports both procedural and object-oriented programming.",
                    type: "true-false",
                    options: ["True", "False"],
                    correctAnswer: "True"
                },
                {
                    _id: "64d223456789abcd01234578", // Dummy ObjectId for the question
                    text: "What keyword is used to define a function in Python?",
                    type: "short-answer",
                    correctAnswer: "def"
                }
            ],
            createdAt: "2024-08-08T14:00:00Z", // Dummy creation date
            updatedAt: "2024-08-08T14:00:00Z"  // Dummy updated date
        },
        {
            _id: "64d123456789abcd01234579", // Dummy ObjectId for the quiz
            title: "Data Structures & Algorithms",
            description: "Test your knowledge of common data structures and algorithms.",
            category: "Computer Science",
            instructor: "Robert Lee",
            price: 15.99,
            timeLimit: 45, // in minutes
            questions: [
                {
                    _id: "64d223456789abcd01234580", // Dummy ObjectId for the question
                    text: "Which of the following data structures uses the Last In First Out (LIFO) principle?",
                    type: "multiple-choice",
                    options: [
                        "Queue",
                        "Stack",
                        "Array",
                        "Linked List"
                    ],
                    correctAnswer: "Stack"
                },
                {
                    _id: "64d223456789abcd01234581", // Dummy ObjectId for the question
                    text: "A binary search tree is a tree where each node has at most two children.",
                    type: "true-false",
                    options: ["True", "False"],
                    correctAnswer: "True"
                },
                {
                    _id: "64d223456789abcd01234582", // Dummy ObjectId for the question
                    text: "What is the time complexity of binary search?",
                    type: "short-answer",
                    correctAnswer: "O(log n)"
                }
            ],
            createdAt: "2024-08-07T10:15:00Z", // Dummy creation date
            updatedAt: "2024-08-07T10:15:00Z"  // Dummy updated date
        },
        {
            _id: "64d123456789abcd01234583", // Dummy ObjectId for the quiz
            title: "React.js Fundamentals",
            description: "A quiz on the basics of React.js and its core concepts.",
            category: "Web Development",
            instructor: "Emily White",
            price: 9.99,
            timeLimit: 30, // in minutes
            questions: [
                {
                    _id: "64d223456789abcd01234584", // Dummy ObjectId for the question
                    text: "Which of the following is a hook in React?",
                    type: "multiple-choice",
                    options: [
                        "useState",
                        "useVar",
                        "useLoop",
                        "useData"
                    ],
                    correctAnswer: "useState"
                },
                {
                    _id: "64d223456789abcd01234585", // Dummy ObjectId for the question
                    text: "React components can be stateful or stateless.",
                    type: "true-false",
                    options: ["True", "False"],
                    correctAnswer: "True"
                },
                {
                    _id: "64d223456789abcd01234586", // Dummy ObjectId for the question
                    text: "What keyword is used to import React in a file?",
                    type: "short-answer",
                    correctAnswer: "import"
                }
            ],
            createdAt: "2024-08-06T16:45:00Z", // Dummy creation date
            updatedAt: "2024-08-06T16:45:00Z"  // Dummy updated date
        },
        {
            _id: "64d123456789abcd01234587", // Dummy ObjectId for the quiz
            title: "Database Management Systems",
            description: "Test your understanding of database concepts and SQL.",
            category: "Database",
            instructor: "Michael Brown",
            price: 13.99,
            timeLimit: 40, // in minutes
            questions: [
                {
                    _id: "64d223456789abcd01234588", // Dummy ObjectId for the question
                    text: "Which SQL command is used to retrieve data from a database?",
                    type: "multiple-choice",
                    options: [
                        "INSERT",
                        "UPDATE",
                        "SELECT",
                        "DELETE"
                    ],
                    correctAnswer: "SELECT"
                },
                {
                    _id: "64d223456789abcd01234589", // Dummy ObjectId for the question
                    text: "A primary key can be NULL.",
                    type: "true-false",
                    options: ["True", "False"],
                    correctAnswer: "False"
                },
                {
                    _id: "64d223456789abcd01234590", // Dummy ObjectId for the question
                    text: "What is the SQL command used to create a table?",
                    type: "short-answer",
                    correctAnswer: "CREATE TABLE"
                }
            ],
            createdAt: "2024-08-05T11:30:00Z", // Dummy creation date
            updatedAt: "2024-08-05T11:30:00Z"  // Dummy updated date
        },
        {
            _id: "64d123456789abcd01234591", // Dummy ObjectId for the quiz
            title: "Network Security Basics",
            description: "A quiz on fundamental concepts in network security.",
            category: "Cybersecurity",
            instructor: "Sarah Green",
            price: 14.99,
            timeLimit: 50, // in minutes
            questions: [
                {
                    _id: "64d223456789abcd01234592", // Dummy ObjectId for the question
                    text: "Which of the following is a type of malware?",
                    type: "multiple-choice",
                    options: [
                        "Firewall",
                        "Antivirus",
                        "Trojan",
                        "VPN"
                    ],
                    correctAnswer: "Trojan"
                },
                {
                    _id: "64d223456789abcd01234593", // Dummy ObjectId for the question
                    text: "Encryption is the process of converting data into a readable format.",
                    type: "true-false",
                    options: ["True", "False"],
                    correctAnswer: "False"
                },
                {
                    _id: "64d223456789abcd01234594", // Dummy ObjectId for the question
                    text: "What is the most common port used for HTTP?",
                    type: "short-answer",
                    correctAnswer: "80"
                }
            ],
            createdAt: "2024-08-04T09:00:00Z", // Dummy creation date
            updatedAt: "2024-08-04T09:00:00Z"  // Dummy updated date
        }
    ];

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Test Your Knowledge with Our Quizzes</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Challenge yourself with our expertly crafted quizzes. Whether you're brushing up on the basics or testing advanced concepts, our quizzes are designed to reinforce your learning and boost your confidence in applying new skills.</p>
                </div>
                <div className="flex flex-wrap -m-4">
                    {quizzes.map((quizz) => {
                        return (
                            <div key={quizz._id} className="lg:w-1/3 sm:w-1/2 p-4">
                                <div className="flex relative group">
                                    <Image width={1470} height={436} alt="gallery" className="hue-rotate-[323deg] absolute inset-0 w-full h-full object-cover object-center" src="/bg4.jfif" />
                                    <Link href={`./quizzes/${quizz._id}`} className='bg-transparent z-50'>
                                        <div className=" transition-opacity hover:duration-1000 duration-0 px-8 py-10 relative z-10 w-full border-4 border-gray-200 text-white backdrop-brightness-75 opacity-0 hover:opacity-100">
                                            <h1 className="title-font text-lg font-medium text-white mb-3">{quizz.title}</h1>
                                            <p className="leading-relaxed">{`${quizz.description.substring(0, 115)}...`} &nbsp;</p>
                                        </div>
                                    </Link>
                                    <span className='block group-hover:hidden bg-transparent backdrop-blur-lg backdrop-brightness-90 border-t absolute top-full translate-y-[-100%] left-0 w-full px-4 py-2'>
                                        <h1 className="title-font text-lg font-medium text-white mb-3">
                                            {quizz.title}
                                        </h1>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {isHome && <Link href={'./quizzes'} className='text-xl block mt-4 float-left underline px-2 hover:no-underline text-slate-600'>view all &gt;</Link>}
            </div>
        </section>
    )
}

export default Quizz
