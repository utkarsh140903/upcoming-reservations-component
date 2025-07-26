import React from 'react';

// Static JSON data as provided 
const reservationsData = [
  { 
    "id": 1, 
    "venueName": "The Grand Cafe", 
    "date": "2024-08-15", 
    "time": "19:00",
    "partySize": 2, 
    "status": "Confirmed" 
  },
  { 
    "id": 2, 
    "venueName": "Ocean's Breeze", 
    "date": "2024-08-22", 
    "time": "20:30",
    "partySize": 4, 
    "status": "Confirmed" 
  },
  { 
    "id": 3, 
    "venueName": "The Rooftop Grill", 
    "date": "2024-09-01", 
    "time": "18:00",
    "partySize": 5, 
    "status": "Pending" 
  }
];

/**
 * Formats a date string into a more readable format
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

/**
 * Formats a time string into 12-hour format
 * @param {string} timeString - Time in HH:MM format
 * @returns {string} Formatted time string
 */
const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

/**
 * Individual reservation card component
 * @param {Object} reservation - Reservation object
 * @param {Function} onCancel - Cancel handler function
 */
const ReservationCard = ({ reservation, onCancel }) => {
  const { id, venueName, date, time, partySize, status } = reservation;

  return (
    <div className="reservation-card">
      <div className="card-content">
        <div className="card-info">
          <h3 className="venue-name">{venueName}</h3>
          
          <div className="reservation-details">
            <div className="detail-item">
              <span className="detail-label">Date</span>
              <span className="detail-value">{formatDate(date)}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Time</span>
              <span className="detail-value">{formatTime(time)}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Party Size</span>
              <span className="detail-value">{partySize} {partySize === 1 ? 'guest' : 'guests'}</span>
            </div>
          </div>
          
          <div className={`status-badge ${status.toLowerCase() === 'confirmed' ? 'status-confirmed' : 'status-pending'}`}>
            {status}
          </div>
        </div>
        
        <div className="card-actions">
          <button 
            className="cancel-button"
            onClick={() => onCancel(id)}
            aria-label={`Cancel reservation at ${venueName}`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Main Reservations component that displays all upcoming reservations
 */
const Reservations = () => {
  /**
   * Handles the cancellation of a reservation
   * @param {number} reservationId - ID of the reservation to cancel
   */
  const handleCancel = (reservationId) => {
    console.log("Cancel reservation:", reservationId);
  };

  return (
    <div className="reservations-container">
      <header className="reservations-header">
        <h1 className="reservations-title">Upcoming Reservations</h1>
        <p className="reservations-subtitle">
          View and manage your upcoming dining reservations
        </p>
      </header>
      
      <div className="reservations-grid">
        {reservationsData.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            onCancel={handleCancel}
          />
        ))}
      </div>
    </div>
  );
};

export default Reservations;
