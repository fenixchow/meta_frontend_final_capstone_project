import { useState, useEffect } from 'react';
import FormField from './FormField';

const BookingForm = ({
  availableTimes,
  dispatchOnDateChange,
  submitData
}) => {
  const minimumDate = new Date().toISOString().split('T')[0];
  const minimumNumberOfGuests = 1;
  const maximumNumberOfGuests = 10;
  const occasions = ['Birthday', 'Anniversary'];
  const invalidDateErrorMessage = 'Please choose a valid date';
  const invalidTimeErrorMessage = 'Please choose a valid time';
  const invalidOccasionErrorMessage = 'Please choose a valid occasion';
  const invalidNumberOfGuestsErrorMessage = 
    'Please enter a number between 1 and 10';

  const [date, setDate] = useState(minimumDate);
  const [time, setTime] = useState('');
  const [
    numberOfGuests, 
    setNumberGuests
  ] = useState(minimumNumberOfGuests);
  const [occasion, setOccasion] = useState(occasions[0]);
  const [touched, setTouched] = useState({});

  // Update time when availableTimes changes
  useEffect(() => {
    if (availableTimes && availableTimes.length > 0) {
      // If current time is not in available times, set to first available
      if (!time || !availableTimes.includes(time)) {
        setTime(availableTimes[0]);
      }
    } else {
      setTime('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableTimes]);

  const isDateValid = () => {
    if (!date) return false;
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  const isTimeValid = () => {
    return time !== '' && availableTimes && availableTimes.includes(time);
  };

  const isNumberOfGuestsValid = () => {
    const num = Number(numberOfGuests);
    return num >= minimumNumberOfGuests && num <= maximumNumberOfGuests;
  };

  const isOccasionValid = () => {
    return occasion !== '' && occasions.includes(occasion);
  };

  const areAllFieldsValid = () => 
    isDateValid() 
    && isTimeValid() 
    && isNumberOfGuestsValid() 
    && isOccasionValid();
  
  const handleDateChange = e => {
    const newDate = e.target.value;
    setDate(newDate);
    setTouched(prev => ({ ...prev, date: true }));
    dispatchOnDateChange(newDate);
    // Reset time when date changes
    setTime('');
  };

  const handleTimeChange = e => {
    setTime(e.target.value);
    setTouched(prev => ({ ...prev, time: true }));
  };

  const handleNumberOfGuestsChange = e => {
    setNumberGuests(e.target.value);
    setTouched(prev => ({ ...prev, numberOfGuests: true }));
  };

  const handleOccasionChange = e => {
    setOccasion(e.target.value);
    setTouched(prev => ({ ...prev, occasion: true }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (areAllFieldsValid()) {
      submitData({ date, time, numberOfGuests, occasion });
    }
  };

  return (
    <form onSubmit={handleFormSubmit} noValidate aria-label="Reservation form">
      <FormField 
        label="Date" 
        htmlFor="booking-date" 
        hasError={touched.date && !isDateValid()} 
        errorMessage={invalidDateErrorMessage}
      >
        <input 
          type="date" 
          id="booking-date" 
          name="booking-date" 
          min={minimumDate} 
          value={date} 
          required={true} 
          onChange={handleDateChange}
          onBlur={() => handleBlur('date')}
          aria-invalid={touched.date && !isDateValid()}
          aria-describedby={touched.date && !isDateValid() ? 'date-error' : undefined}
        />
      </FormField>
      <FormField 
        label="Time" 
        htmlFor="booking-time" 
        hasError={touched.time && !isTimeValid()} 
        errorMessage={availableTimes && availableTimes.length === 0 ? 'No available times for this date' : invalidTimeErrorMessage}
      >
        <select 
          id="booking-time" 
          name="booking-time" 
          value={time} 
          required={true} 
          onChange={handleTimeChange}
          onBlur={() => handleBlur('time')}
          disabled={!availableTimes || availableTimes.length === 0}
          aria-invalid={touched.time && !isTimeValid()}
          aria-describedby={touched.time && !isTimeValid() ? 'time-error' : undefined}
        >
          {(!availableTimes || availableTimes.length === 0) ? (
            <option value="">No times available</option>
          ) : (
            <>
              <option value="">Select a time</option>
              {availableTimes.map(times => 
                <option data-testid="booking-time-option" key={times} value={times}>
                  {times}
                </option>
              )}
            </>
          )}
        </select>
      </FormField>
      <FormField 
        label="Number of guests" 
        htmlFor="booking-number-guests" 
        hasError={touched.numberOfGuests && !isNumberOfGuestsValid()} 
        errorMessage={invalidNumberOfGuestsErrorMessage}
      >
        <input 
          type="number" 
          id="booking-number-guests" 
          name="booking-number-guests" 
          value={numberOfGuests} 
          min={minimumNumberOfGuests} 
          max={maximumNumberOfGuests} 
          required={true} 
          onChange={handleNumberOfGuestsChange}
          onBlur={() => handleBlur('numberOfGuests')}
          aria-invalid={touched.numberOfGuests && !isNumberOfGuestsValid()}
          aria-describedby={touched.numberOfGuests && !isNumberOfGuestsValid() ? 'guests-error' : undefined}
        />
      </FormField>
      <FormField 
        label="Occasion" 
        htmlFor="booking-occasion" 
        hasError={touched.occasion && !isOccasionValid()} 
        errorMessage={invalidOccasionErrorMessage}
      >
        <select 
          id="booking-occasion" 
          name="booking-occasion" 
          value={occasion} 
          required={true} 
          onChange={handleOccasionChange}
          onBlur={() => handleBlur('occasion')}
          aria-invalid={touched.occasion && !isOccasionValid()}
          aria-describedby={touched.occasion && !isOccasionValid() ? 'occasion-error' : undefined}
        >
          {occasions.map(occ => 
            <option data-testid="booking-occasion-option" key={occ} value={occ}>
              {occ}
            </option>
          )}
        </select>
      </FormField>
      <button 
        className="button-primary" 
        type="submit" 
        disabled={!areAllFieldsValid()}
        aria-label="Submit reservation form"
      >
        Make your reservation
      </button>
    </form>
  );
};

export default BookingForm;
