import { Component } from 'react';
import { Link } from 'react-router-dom';
import pages from '../utils/pages';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          minHeight: '31.25rem',
          padding: '1.875rem 0',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center'
        }} role="alert">
          <h2>Something went wrong</h2>
          <p>We're sorry, but something unexpected happened.</p>
          <button
            className="button-primary"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
          >
            Reload Page
          </button>
          <Link 
            to={pages.get('home').path} 
            className="button-primary"
            style={{ backgroundColor: 'transparent', borderColor: '#495E57' }}
          >
            Return to Home
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

