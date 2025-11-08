import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  Plus,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import {
  createEvent,
  getAllEvents,
  editEvent,
  deleteEvent,
} from "../../api/eventApi";
import toast from "react-hot-toast";

const Events = () => {
  const [formData, setformData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const [events, setEvents] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getAllEvents();
        setEvents(res.data.events);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch enquiries");
      }
    };
    fetchEvents();
  }, []);

  const handleInputChange = (field, value) => {
    setformData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddEvent = async () => {
    // Basic validation
    if (
      !formData.title ||
      !formData.date ||
      !formData.time ||
      !formData.location
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      // Prepare data for API
      const eventData = {
        title: formData.title,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        description: formData.description || "",
      };

      // Call API
      const response = await createEvent(eventData);
      // Reset form
      setformData({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
      });

      toast.success(response.message || "Event added successfully!");
    } catch (error) {
      console.error("Error adding event:", error);

      // Handle different error types
      if (error.response) {
        // Server responded with error status
        const errorMessage =
          error.response.data.message || "Failed to add event";
        toast.error(errorMessage);
      } else if (error.request) {
        // Network error
        toast.error("Network error. Please check your connection.");
      } else {
        // Other errors
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // Open Edit Modal
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsEditModalOpen(true);
  };

  // Close Edit Modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingEvent(null);
  };

  // Update Event
  const handleUpdateEvent = async () => {
    if (
      !editingEvent.title ||
      !editingEvent.date ||
      !editingEvent.time ||
      !editingEvent.location
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      // Prepare data for API
      const eventData = {
        title: editingEvent.title,
        date: editingEvent.date,
        time: editingEvent.time,
        location: editingEvent.location,
        description: editingEvent.description,
      };

      // Call API - event ID aur data bhejo
      const response = await editEvent(editingEvent.id, eventData);

      if (response.data.success) {
        // Update local state with updated event from API
        setEvents((prev) =>
          prev.map((event) =>
            event.id === editingEvent.id ? response.data.event : event
          )
        );

        handleCloseEditModal();
        toast.success(response.data.message || "Event updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);

      // Handle different error types
      if (error.response) {
        const errorMessage =
          error.response.data.message || "Failed to update event";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // Delete Event
  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      const response = await deleteEvent(eventId);

      if (response.data.success) {
        // Remove from local state
        setEvents((prev) => prev.filter((event) => event.id !== eventId));
        toast.success(response.data.message || "Event deleted successfully!");
      } else {
        toast.error(response.data.message || "Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);

      if (error.response) {
        const errorMessage =
          error.response.data.message || "Failed to delete event";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  // Handle Edit Input Change
  const handleEditInputChange = (field, value) => {
    setEditingEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Events component ke andar
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };

  // Events component ke andar
  const formatTime = (timeString) => {
    if (!timeString) return "";

    try {
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours);
      const minute = parseInt(minutes);

      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;

      return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
    } catch (error) {
      return timeString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Events Management
          </h1>
          <p className="text-gray-600">Add and manage your events</p>
        </div>

        {/* Event Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Plus className="h-5 w-5 text-[#FF6B00]" />
            Add New Event
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Event Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  placeholder="Enter event title"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                />
              </div>
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                />
              </div>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  placeholder="Enter event location"
                />
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                  rows="4"
                  placeholder="Enter event description"
                />
              </div>
            </div>
          </div>

          {/* Add Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleAddEvent}
              className="px-6 py-3 bg-[#FF6B00] text-white rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-2 flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add Event
            </button>
          </div>
        </div>

        {/* Events List */}
        {events.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Added Events
            </h2>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(event.time)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      {event.description && (
                        <p className="mt-2 text-gray-600">
                          {event.description}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Event"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Event Modal */}
        {isEditModalOpen && editingEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Edit className="h-5 w-5 text-[#FF6B00]" />
                  Edit Event
                </h2>
                <button
                  onClick={handleCloseEditModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Event Title */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Title *
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={editingEvent.title}
                        onChange={(e) =>
                          handleEditInputChange("title", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                        placeholder="Enter event title"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        value={editingEvent.date}
                        onChange={(e) =>
                          handleEditInputChange("date", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="time"
                        value={editingEvent.time}
                        onChange={(e) =>
                          handleEditInputChange("time", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={editingEvent.location}
                        onChange={(e) =>
                          handleEditInputChange("location", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                        placeholder="Enter event location"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <textarea
                        value={editingEvent.description}
                        onChange={(e) =>
                          handleEditInputChange("description", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
                        rows="4"
                        placeholder="Enter event description"
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                  <button
                    onClick={handleCloseEditModal}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateEvent}
                    className="px-6 py-3 bg-[#FF6B00] text-white rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-2 flex items-center gap-2"
                  >
                    <Edit className="h-5 w-5" />
                    Update Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
