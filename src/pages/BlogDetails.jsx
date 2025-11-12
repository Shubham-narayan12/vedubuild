import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BlogDetails() {
  const blog = {
    title: "Vedubuild Scholarship Exam 2025 Highlights",
    date: "November 5, 2025",
    author: "Vedubuild Team",
    images: [
      "https://images.unsplash.com/photo-1584697964192-9a6ae8a0b5b5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1200&q=80",
    ],
    content: `
      The Vedubuild Scholarship Exam 2025 marked another milestone in our mission 
      to promote accessible education across India. Conducted across 50+ centers, 
      the exam saw participation from over 10,000 students.

      This year, we introduced a digital verification system to make the registration 
      and admit card process faster and more transparent. The exam consisted of 
      sections covering Aptitude, Logical Reasoning, and General Knowledge.

      Top performers will receive scholarships up to 100% for their academic 
      courses, along with exclusive mentorship sessions conducted by industry experts.

      Vedubuild continues its mission to empower every student, regardless of 
      financial background, to achieve their educational dreams.
    `,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{blog.title}</h1>
        <p className="text-gray-500 text-sm">
          {blog.date} • By <span className="font-semibold">{blog.author}</span>
        </p>
      </div>

      {/* Image Slider */}
      <div className="max-w-5xl mx-auto mb-10">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          {blog.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-[450px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 leading-relaxed">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          About the Event
        </h2>
        <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>

        {/* Bottom Highlights Section */}
        <div className="border-t mt-8 pt-6 text-sm text-gray-500 flex justify-between flex-wrap">
          <p>Category: Scholarship Event</p>
          <p>Last Updated: November 7, 2025</p>
        </div>
      </div>
    </div>
  );
}
