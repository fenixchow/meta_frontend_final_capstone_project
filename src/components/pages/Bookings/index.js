import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { fetchAPI, submitAPI } from '../../../utils/fakeAPI';
import pages from '../../../utils/pages';
import BookingForm from './BookingForm';

const updateTimes = (availableTimes, date) => {
  try {
    const response = fetchAPI(new Date(date));
    return (response && response.length !== 0) ? response : availableTimes;
  } catch (error) {
    console.error('Error fetching available times:', error);
    return availableTimes;
  }
};

const initializeTimes = initialAvailableTimes => {
  try {
    const todayTimes = fetchAPI(new Date());
    return (todayTimes && todayTimes.length > 0) 
      ? [...initialAvailableTimes, ...todayTimes] 
      : initialAvailableTimes;
  } catch (error) {
    console.error('Error initializing times:', error);
    return initialAvailableTimes;
  }
};

const Bookings = () => {
  const [
    availableTimes, 
    dispatchOnDateChange
  ] = useReducer(updateTimes, [], initializeTimes);
  const navigate = useNavigate();

  const submitData = formData => {
    try {
      const response = submitAPI(formData);
      if (response) {
        navigate(pages.get('confirmedBooking').path);
      } else {
        // Handle submission failure
        alert('Failed to submit reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  }; 

  return (
    <div className="bookings">
      <h2>Table reservation</h2>
      <BookingForm 
        availableTimes={availableTimes || []} 
        dispatchOnDateChange={dispatchOnDateChange} 
        submitData={submitData} 
      />
    </div>
  );
};

export default Bookings;
