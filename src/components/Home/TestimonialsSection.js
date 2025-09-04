'use client';

import { useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Testimonial Card Component
const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-3xl p-8 transition-all duration-500 hover:shadow-3xl hover:bg-white/80 w-full h-full flex flex-col min-h-[350px]">
      <div className="flex mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-6 h-6 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill={i < testimonial.rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      
      <blockquote className="text-gray-700 mb-8 italic flex-grow text-lg leading-relaxed">
        "{testimonial.content}"
      </blockquote>
      
      <div className="flex items-center mt-auto">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg">
          {testimonial.author?.charAt(0)}
        </div>
        <div className="ml-4">
          <p className="font-bold text-gray-900 text-lg">{testimonial.author}</p>
          <p className="text-gray-600 font-medium">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [swiperRef, setSwiperRef] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonial/get', {
          cache: 'no-store'
        });
        const data = await res.json();
        setTestimonials(data.data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const goNext = () => {
    if (swiperRef) swiperRef.slideNext();
  };

  const goPrev = () => {
    if (swiperRef) swiperRef.slidePrev();
  };

  return (
    <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
          What Our Students Say
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join our community of successful learners who've transformed their careers
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-teal-400 rounded-full animate-spin animate-reverse"></div>
          </div>
          <p className="mt-6 text-center text-gray-600 font-medium">Loading student stories...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <div className="backdrop-blur-xl bg-red-50/80 border border-red-200/50 rounded-3xl p-8 max-w-md mx-auto">
            <p className="text-red-600 text-lg font-medium">Failed to load testimonials. Please try again later.</p>
          </div>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center">
          <div className="backdrop-blur-xl bg-gray-50/80 border border-gray-200/50 rounded-3xl p-8 max-w-md mx-auto">
            <p className="text-gray-600 text-lg">No testimonials available at the moment.</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Custom Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-10">
            <button
              onClick={goPrev}
              className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-lg rounded-2xl p-3 hover:bg-white/80 transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-emerald-600" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-10">
            <button
              onClick={goNext}
              className="backdrop-blur-xl bg-white/70 border border-white/50 shadow-lg rounded-2xl p-3 hover:bg-white/80 transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-emerald-600" />
            </button>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            onSwiper={setSwiperRef}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-emerald-500 !opacity-50',
              bulletActiveClass: 'swiper-pagination-bullet-active !opacity-100 !bg-emerald-600'
            }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={testimonials.length > 1}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
              1024: {
                slidesPerView: testimonials.length >= 3 ? 3 : testimonials.length,
                spaceBetween: 32,
              },
            }}
            className="!pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id || testimonial.id} className="!h-auto">
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-2xl px-6 py-4">
                <div className="text-2xl font-bold text-emerald-600">4.9/5</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-2xl px-6 py-4">
                <div className="text-2xl font-bold text-emerald-600">50K+</div>
                <div className="text-sm text-gray-600">Happy Students</div>
              </div>
              <div className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-2xl px-6 py-4">
                <div className="text-2xl font-bold text-emerald-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;