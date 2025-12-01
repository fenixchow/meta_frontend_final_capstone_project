import { Link } from 'react-router-dom';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import pages from '../../../utils/pages';

const UnderConstruction = () => {
  return (
    <div className="container under-construction" role="main">
      <FontAwesomeIcon icon={faPersonDigging} size="3x" aria-hidden="true" />
      <h2>Page under construction</h2>
      <p>We're working hard to bring you this feature. Please check back soon!</p>
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

export default UnderConstruction;
