import React from "react";

import { useNavigate } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Vedubuild Scholarship Exam 2025 Successfully Conducted",
    date: "November 5, 2025",
    image:
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1200&q=80",
    description:
      "Vedubuild successfully organized the 2025 Scholarship Exam across 50+ centers in India, helping students achieve their academic dreams.",
  },
  {
    id: 2,
    title: "Coding Workshop for High School Students",
    date: "October 28, 2025",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    description:
      "A 2-day hands-on workshop conducted by Vedubuild focusing on introducing programming concepts to school students in a fun way.",
  },
  {
    id: 3,
    title: "Digital Learning Initiative Launched",
    date: "September 15, 2025",
    image:
      "https://images.unsplash.com/photo-1584697964192-9a6ae8a0b5b5?auto=format&fit=crop&w=1200&q=80",
    description:
      "Vedubuild launched a new initiative providing free access to online learning materials for rural students under its scholarship program.",
  },
];

export default function BlogPage() {

    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-20">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Vedubuild Blog & Events
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay updated with all the latest activities, events, and announcements
          from Vedubuild. Our journey towards empowering education continues!
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-56 object-cover rounded-t-2xl"
            />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h2 className="text-xl font-semibold text-gray-800 mb-3 hover:text-blue-600 transition">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm mb-5">{post.description}</p>
              <button onClick={()=>{navigate("/blogdetails")}} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
