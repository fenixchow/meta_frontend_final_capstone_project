import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pages from '../../../utils/pages';

const ConfirmedBooking = () => {
  useEffect(() => {
    // Focus on the heading for screen readers
    const heading = document.querySelector('.confirmed-booking h2');
    if (heading) {
      heading.focus();
      heading.setAttribute('tabIndex', '-1');
    }
  }, []);

  return (
    <div className="container confirmed-booking" role="status" aria-live="polite">
      <FontAwesomeIcon icon={faCircleCheck} size="3x" aria-hidden="true" />
      <h2>Your reservation has been confirmed.</h2>
      <p>You will receive an email with all the details.</p>
      <Link 
        to={pages.get('home').path} 
        className="button-primary"
        aria-label="Return to home page"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default ConfirmedBooking;
