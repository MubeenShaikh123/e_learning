import { StarIcon } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      content: "SkillUp transformed my career path. The courses are practical and taught by industry experts. I landed a job within 3 months of completing my certification!",
      author: "Alex Morgan",
      role: "Software Developer",
      rating: 5,
    },
    {
      id: 2,
      content: "The interactive quizzes and hands-on projects make learning engaging. I've tried other platforms but none compare to the quality of content here.",
      author: "Sarah Chen",
      role: "Digital Marketing Specialist",
      rating: 5,
    },
    {
      id: 3,
      content: "As someone switching careers, SkillUp provided exactly what I needed - structured learning paths with real-world applications. Highly recommend!",
      author: "Michael Torres",
      role: "Data Analyst",
      rating: 4,
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">What Our Students Say</h2>
          <p className="mt-4 text-xl text-gray-600">Join our community of successful learners</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill={i < testimonial.rating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-12 text-center">
          <a href="#" className="text-indigo-600 font-medium hover:text-indigo-500 flex items-center justify-center">
            View more success stories
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default TestimonialsSection;