import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoImage from './assets/logo.png';
import './Header.css';
import pages from '../../utils/pages';

const navLinks = Array.from(pages.values()).filter(page => page.anchorable);

const Header = () => {
  const { pathname } = useLocation();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Close menu when route changes
  useEffect(() => {
    setIsNavExpanded(false);
  }, [pathname]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isNavExpanded) {
        setIsNavExpanded(false);
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isNavExpanded]);

  // Trap focus in mobile menu
  useEffect(() => {
    if (isNavExpanded && navRef.current) {
      const navElement = navRef.current;
      const focusableElements = navElement.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      navElement.addEventListener('keydown', handleTabKey);
      firstElement?.focus();

      return () => {
        navElement.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [isNavExpanded]);

  const handleMenuToggle = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  const handleLinkClick = () => {
    setIsNavExpanded(false);
  };

  return (
    <header role="banner">
      <nav className="container grid nav-bar" aria-label="Main navigation">
        <Link 
          className="nav-bar-logo" 
          to={pages.get('home').path}
          aria-label="Little Lemon - Home"
        >
          <img 
            src={logoImage} 
            alt="Little Lemon logo" 
            width="200"
            height="60"
            loading="eager"
          />
        </Link>
        <button 
          ref={hamburgerRef}
          className="nav-bar-hamburger" 
          type="button"
          aria-expanded={isNavExpanded}
          aria-controls="main-navigation"
          aria-label={isNavExpanded ? 'Close menu' : 'Open menu'}
          onClick={handleMenuToggle}
        >
          {isNavExpanded ?
            <FontAwesomeIcon icon={faXmark} size="2x" aria-hidden="true" /> : 
            <FontAwesomeIcon icon={faBars} size="2x" aria-hidden="true" />}
        </button>
        <ul 
          ref={navRef}
          id="main-navigation"
          className={isNavExpanded ? 'nav-bar-links expanded' : 'nav-bar-links'} 
          onClick={handleLinkClick}
        >
          {navLinks.map((navLink) => 
            <li key={navLink.path}>
              <Link 
                className={pathname === navLink.path ? 'current-location' : ''} 
                to={navLink.path}
                aria-current={pathname === navLink.path ? 'page' : undefined}
              >
                {navLink.name}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
