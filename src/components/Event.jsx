import React from 'react'
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react'
import { getAllEvents } from '../api/eventApi'
import { useNavigate } from 'react-router-dom'

export const Event = () => {
    const events = [
        {
            title: "Scholarship Application Workshop",
            date: "February 15, 2024",
            time: "2:00 PM - 4:00 PM",
            location: "Main Campus Auditorium",
            description: "Learn how to write compelling scholarship applications",
        },
        {
            title: "Financial Aid Information Session",
            date: "February 28, 2024",
            time: "6:00 PM - 7:30 PM",
            location: "Virtual Event",
            description: "Understanding financial aid options and requirements",
        },
        {
            title: "Scholarship Awards Ceremony",
            date: "May 20, 2024",
            time: "7:00 PM - 9:00 PM",
            location: "Grand Ballroom",
            description: "Celebrating our scholarship recipients",
        },
    ]
    const navigate = useNavigate();

    return (
        <section id="events" className="py-20 bg-[#f9f9f9]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#3B3B3B] mb-2">Upcoming Events</h2>
                    <div className="w-32 h-1 bg-lime-500 mx-auto rounded-full"></div>
                    <p className="text-xl text-[#3B3B3B] max-w-3xl mx-auto mt-4">
                        Join workshops, webinars, and ceremonies that help you grow and succeed in your academic journey.
                    </p>
                </div>

                <div className="space-y-6 mb-12">
                    {events.map((event, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
                        >
                            <div className="p-6 md:flex md:items-center md:justify-between gap-6">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-semibold text-[#3B3B3B] mb-2">{event.title}</h3>
                                    <p className="text-[#3B3B3B] mb-4">{event.description}</p>
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
                                <div className="mt-6 md:mt-0 md:ml-6 text-center md:text-right">
                                    <button className="bg-[#FF6B00] hover:bg-orange-600 text-white px-5 py-2.5 rounded-md text-sm font-medium transition">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* More Events Button */}
                <div className="text-center">
                    <button onClick={() => navigate("/events")} className="inline-flex items-center bg-[#3B3B3B] hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition duration-300">
                        More Events
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </div>
        </section>
    )
}