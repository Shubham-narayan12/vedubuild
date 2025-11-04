import React from "react";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const navigate = useNavigate();

  const events = [
    {
      title: "Scholarship Application Workshop",
      date: "February 15, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Main Campus Auditorium",
      description:
        "Learn how to write compelling scholarship applications and increase your chances of securing educational funding. Our experts will guide you through the entire process.",
    },
    {
      title: "Financial Aid Information Session",
      date: "February 28, 2024",
      time: "6:00 PM - 7:30 PM",
      location: "Virtual Event",
      description:
        "Understanding financial aid options and requirements for various educational programs.",
    },
    {
      title: "Scholarship Awards Ceremony",
      date: "May 20, 2024",
      time: "7:00 PM - 9:00 PM",
      location: "Grand Ballroom",
      description:
        "Celebrating our scholarship recipients and their academic achievements.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f9] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#FF6B00] hover:text-orange-600 font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#3B3B3B] mb-4">
              Upcoming Events
            </h1>
            <div className="w-32 h-1 bg-lime-500 mx-auto rounded-full mb-4"></div>
            <p className="text-xl text-[#3B3B3B] max-w-3xl mx-auto">
              Join our workshops, webinars, and ceremonies designed to support
              your academic and professional growth.
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="space-y-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
            >
              <div className="p-6 md:flex md:items-center md:justify-between gap-6">
                {/* Event Details */}
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-[#3B3B3B] mb-2">
                    {event.title}
                  </h3>

                  <p className="text-[#3B3B3B] mb-4">{event.description}</p>

                  {/* Event Info Icons */}
                  <div className="flex flex-wrap gap-4 text-sm text-[#3B3B3B]">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-[#FF6B00] mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-[#FF6B00] mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-[#FF6B00] mr-2" />
                      {event.location}
                    </div>
                  </div>
                </div>

                {/* Register Button Only */}
                <div className="mt-6 md:mt-0 md:ml-6 text-center md:text-right">
                  <button className="bg-[#FF6B00] hover:bg-orange-600 text-white px-5 py-2.5 rounded-md text-sm font-medium transition">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#3B3B3B] mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-[#3B3B3B] text-lg mb-6 max-w-2xl mx-auto">
              Contact our events team for more information about upcoming events
              or to suggest new event ideas.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="bg-lime-500 hover:bg-lime-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Events Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
