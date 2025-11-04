import React from 'react'
import { ChevronRightCircle, ChevronRight } from 'lucide-react'
import { scholarships } from '../data/scholarships'
import { useNavigate } from "react-router-dom";


export const ScholarshipPage = () => {
    const navigate = useNavigate();


    return (
        <section id="scholarships" className="py-20 bg-[#f9f9f9]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#3B3B3B] mb-2">Available Scholarships</h2>
                    <div className="w-32 h-1 bg-lime-500 mx-auto rounded-full"></div>
                    <p className="text-xl text-[#3B3B3B] max-w-3xl mx-auto mt-4">
                        Explore financial support tailored to your academic path, career goals, and personal journey.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {scholarships.map((scholarship) => (
                        <div
                            key={scholarship.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="inline-block bg-[#FFF3E0] text-[#FF6B00] text-xs px-3 py-1 rounded-full font-semibold">
                                        {scholarship.category}
                                    </span>
                                    <span className="text-xl font-bold text-[#51A545]">{scholarship.enrollmentFee}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-[#3B3B3B] mb-2">{scholarship.title}</h3>
                                <p className="text-[#3B3B3B] mb-4">{scholarship.shortDescription}</p>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-[#3B3B3B] mb-2">Requirements:</h4>
                                        <ul className="space-y-1">
                                            {scholarship.requirements.map((req, reqIndex) => (
                                                <li key={reqIndex} className="text-sm text-[#3B3B3B] flex items-center">
                                                    <ChevronRightCircle className="h-4 w-4 text-[#FF6B00] mr-2" />
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t">
                                        <span className="text-sm text-gray-500">Deadline: {scholarship.deadline}</span>
                                        <button onClick={() => navigate(`/scholarship/${scholarship.id}`)} className="bg-[#FF6B00] hover:bg-orange-600 text-white px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                
            </div>
        </section>
    )
}
