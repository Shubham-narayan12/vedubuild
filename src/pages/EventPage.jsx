import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllEvents } from "../api/eventApi";

const EventPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Date formatter function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString('en-US', options);
  };

  // Time formatter function
  const formatTime = (timeString) => {
    if (!timeString) return '';
    
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const minute = parseInt(minutes);
      
      const period = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      
      return `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
    } catch (error) {
      return timeString;
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getAllEvents();
        
        if (response.data.success) {
          setEvents(response.data.events);
        } else {
          setError('Failed to fetch events');
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#3B3B3B] mb-4">
              Upcoming Events
            </h1>
            <div className="w-32 h-1 bg-lime-500 mx-auto rounded-full mb-4"></div>
            <p className="text-xl text-[#3B3B3B] max-w-3xl mx-auto">
              Loading events...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#3B3B3B] mb-4">
              Upcoming Events
            </h1>
            <div className="w-32 h-1 bg-lime-500 mx-auto rounded-full mb-4"></div>
            <p className="text-xl text-red-600 max-w-3xl mx-auto">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#3B3B3B] mb-4">
              Upcoming Events
            </h1>
            <div className="w-32 h-1 bg-lime-500 mx-auto rounded-full mb-4"></div>
            <p className="text-xl text-[#3B3B3B] max-w-3xl mx-auto">
              No upcoming events at the moment. Please check back later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Back Button */}
        <div className="mb-8">
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
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
            >
              <div className="p-6 md:flex md:items-center md:justify-between gap-6">
                {/* Event Details */}
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-[#3B3B3B] mb-2">
                    {event.title}
                  </h3>

                  <p className="text-[#3B3B3B] mb-4">
                    {event.description || "No description available."}
                  </p>

                  {/* Event Info Icons */}
                  <div className="flex flex-wrap gap-4 text-sm text-[#3B3B3B]">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-[#FF6B00] mr-2" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-[#FF6B00] mr-2" />
                      {formatTime(event.time)}
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