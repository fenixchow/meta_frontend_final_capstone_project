import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faLocationDot,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './Footer.css';
import logoWhiteImage from './assets/logo-white.png';
import pages from '../../utils/pages';

const contacts = [
  { icon: faLocationDot, info: '678 Pisa Ave, Chicago, IL 60611', },
  { icon: faPhone, info: '(312) 593-2744', },
  { icon: faEnvelope, info: 'customer@littlelemon.com', },
];

const socials = [
  { icon: faFacebook, name: 'facebook', },
  { icon: faTwitter, name: 'twitter', },
  { icon: faInstagram, name: 'instagram', },
  { icon: faYoutube, name: 'youtube', },
];

const navLinks = Array.from(pages.values()).filter(page => page.anchorable);

const Footer = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container grid">
        <img 
          className="site-footer-logo" 
          src={logoWhiteImage} 
          alt="Little Lemon" 
          width="96"
          height="96"
          loading="lazy"
        />
        <nav className="site-footer-nav" aria-label="Footer navigation">
          <h4>Sitemap</h4>
          <ul>
            {navLinks.map((navLink) => 
              <li key={navLink.path}>
                <Link to={navLink.path}>{navLink.name}</Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="site-footer-contact">
          <h4>Contact us</h4>
          <address>
          {contacts.map((contact, index) => 
            <p key={`contact-${index}`}>
              <FontAwesomeIcon icon={contact.icon} aria-hidden="true" /> 
              <span>{contact.info}</span>
            </p>
          )}
          </address>
        </div>
        <div className="site-footer-social">
          <h4>Connect with us</h4>
          <div role="list" aria-label="Social media links">
            {socials.map((social) => 
              <a 
                key={social.name} 
                href={`https://www.${social.name}.com`} 
                target="_blank" 
                rel="noreferrer"
                aria-label={`Visit our ${social.name} page`}
              >
                <FontAwesomeIcon icon={social.icon} size="lg" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
