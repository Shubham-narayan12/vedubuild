import axios from "./axiosInstance";

export const createEvent = (formData) => {
  return axios.post("/events/create", formData);
};

export const getAllEvents = ()=>{
    return axios.get("/events/get-all-events");
};

export const editEvent = (eventId, formData) => { 
  return axios.put(`/events/${eventId}`, formData); 
};

export const deleteEvent = (eventId)=>{
    return axios.delete(`/events/${eventId}`);
}
