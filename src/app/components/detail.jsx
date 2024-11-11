//React Component to view the details of the Event 
import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import api from '../utils/api.js';
const EventDetailsModal = ({ visible, eventId, onCancel }) => {
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && eventId) {
      fetchEventDetails();
    }
    
  }, [visible, eventId]);
// Function to fetch event details from the API based on eventId
  const fetchEventDetails = async () => {
    console.log("Fetching event details...");
    setLoading(true);
    try {
      const response = await api({
        url: `/api/Events/${eventId}`,
        method: "GET",
      });
      setEventDetails(response.data);
      console.log('Event Details Response:', response.data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Event Details"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      {loading ? (
        <p>Loading event details...</p>
      ) : eventDetails ? (
        <div>
          <p><strong>Title:</strong> {eventDetails.title}</p>
          <p><strong>Description:</strong> {eventDetails.description}</p>
          <p><strong>Start Date:</strong> {new Date(eventDetails.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(eventDetails.endDate).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>No event details available.</p>
      )}
    </Modal>
  );
};

export default EventDetailsModal;
