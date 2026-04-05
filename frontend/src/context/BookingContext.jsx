import { createContext, useState, useContext, useEffect } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState(() => {
    const saved = localStorage.getItem('hc_current_booking');
    return saved ? JSON.parse(saved) : null;
  });

  const setBookingData = (data) => {
    setCurrentBooking(data);
    localStorage.setItem('hc_current_booking', JSON.stringify(data));
  };

  const clearBooking = () => {
    setCurrentBooking(null);
    localStorage.removeItem('hc_current_booking');
  };

  return (
    <BookingContext.Provider value={{ currentBooking, setBookingData, clearBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
