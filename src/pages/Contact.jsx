import React, { useState } from 'react'
import { MailCheck, MapPinCheck, PhoneIncoming } from 'lucide-react'
import toast from 'react-hot-toast'
import { createEnquiry } from '../api/enquiryApi'

export const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        message: ''
    })

    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email || !formData.message) {
            toast.error("Please fill in all the required fields");
            return;
        }

        try {
            await createEnquiry(formData);

            toast.success("Enquiry submitted successfully!");
            setSuccess(true);
            setFormData({
                fullName: '',
                phone: '',
                email: '',
                message: ''
            });
        } catch (error) {
            console.error("Enquiry error:", error);
            toast.error(error.response?.data?.message || "Failed to submit enquiry");
        }
    };



    return (
        <section id="contact" className="py-20 bg-gradient-to-br from-white to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Let’s Connect</h2>
                    <div className="w-32 h-1 bg-lime-500 mx-auto rounded-full"></div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
                        Whether you’re a student, parent, or partner organization — we're here to support and guide you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Contact Info Box */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8 border border-blue-100">
                        <div>
                            <h3 className="text-2xl font-bold text-blue-700 mb-4">Contact Information</h3>
                            <div className="space-y-4 text-gray-700">
                                <div className="flex items-center space-x-3">
                                    <MailCheck className="h-6 w-6 text-blue-500" />
                                    <span>info@vedubuild.org</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <PhoneIncoming className="h-6 w-6 text-blue-500" />
                                    <span>+91 63669 79913</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <MapPinCheck className="h-6 w-6 text-blue-500" />
                                    <span>H.O-VRSDC|#01 3rd floor|Dhanyan Manor|Udhayaravi road|Kuvempunagar|Mysuru-570023</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Office Hours</h4>
                            <ul className="space-y-1 text-gray-600">
                                <li>Mon - Fri: 9:00 AM - 6:00 PM</li>
                                <li>Saturday: 10:00 AM - 4:00 PM</li>
                                <li>Sunday: Closed</li>
                            </ul>
                        </div>

                        <blockquote className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 text-sm text-blue-800 italic shadow-inner">
                            “Education is the most powerful weapon which you can use to change the world.”
                        </blockquote>
                    </div>

                    {/* Form Box */}
                    <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
                        <h3 className="text-2xl font-semibold text-purple-700 mb-2">Send us a Message</h3>
                        <p className="text-gray-600 mb-6">We’ll respond within 24 hours. Your information is safe with us.</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+91 9876543210"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="john@example.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>


                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="How can we help you?"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-lime-300 to-lime-800 hover:from-amber-400 hover:to-amber-600 text-white py-2 rounded-md font-medium transition-colors"
                            >
                                Send Message
                            </button>

                            {success && (
                                <p className="text-green-600 text-sm mt-3">
                                    ✅ Thank you! We'll get back to you shortly.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
