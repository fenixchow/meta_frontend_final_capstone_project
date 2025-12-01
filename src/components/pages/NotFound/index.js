import { Link } from 'react-router-dom';
import './index.css';
import pages from '../../../utils/pages';

const NotFound = () => {
  return (
    <div className="container page-not-found" role="main">
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>The page you're looking for doesn't exist.</p>
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

export default NotFound;
