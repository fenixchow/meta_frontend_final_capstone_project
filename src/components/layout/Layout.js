import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Link to="#main-content" className="skip-link">
        Skip to main content
      </Link>
      <Header />
      <main id="main-content" role="main">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
