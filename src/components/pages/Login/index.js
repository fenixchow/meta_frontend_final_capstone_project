import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import pages from '../../../utils/pages';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would check credentials here
      // For demo purposes, we'll just navigate to home
      alert('Login successful! Welcome back.');
      navigate(pages.get('home').path);
    }, 1000);
  };

  return (
    <div className="login-page">
      <section className="login-hero">
        <div className="container">
          <h1>Welcome Back</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>
      </section>

      <section className="login-content">
        <div className="container">
          <div className="login-card">
            <form onSubmit={handleSubmit} className="login-form" noValidate>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <span id="email-error" className="error-message" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                {errors.password && (
                  <span id="password-error" className="error-message" role="alert">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="button-primary login-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="login-divider">
                <span>or</span>
              </div>

              <div className="social-login">
                <button type="button" className="social-btn google-btn">
                  <span>🔍</span>
                  Continue with Google
                </button>
                <button type="button" className="social-btn facebook-btn">
                  <span>📘</span>
                  Continue with Facebook
                </button>
              </div>

              <p className="signup-link">
                Don't have an account?{' '}
                <Link to={pages.get('home').path}>Sign up here</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

