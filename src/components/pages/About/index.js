import './index.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About Little Lemon</h1>
          <p className="about-subtitle">A Family Tradition Since 1995</p>
        </div>
      </section>

      <section className="about-story">
        <div className="container grid">
          <div className="about-content">
            <h2>Our Story</h2>
            <p>
              Little Lemon was founded in 1995 by the Andoni family, who brought 
              their cherished Mediterranean recipes from their homeland to Chicago. 
              What started as a small family restaurant has grown into a beloved 
              neighborhood institution, serving authentic Mediterranean cuisine with 
              a modern twist.
            </p>
            <p>
              Our commitment to using fresh, locally-sourced ingredients and traditional 
              cooking methods has remained unchanged for nearly three decades. Every dish 
              tells a story of family, tradition, and the love of good food.
            </p>
          </div>
          <div className="about-image-placeholder">
            <div className="placeholder-content">
              <span className="placeholder-icon">🍋</span>
              <p>Family Photo</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-mission">
        <div className="container">
          <h2>Our Mission</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <h3>Fresh Ingredients</h3>
              <p>We source the finest ingredients daily, ensuring every dish is made with the highest quality produce, meats, and spices.</p>
            </div>
            <div className="mission-card">
              <h3>Traditional Recipes</h3>
              <p>Our recipes have been passed down through generations, preserving the authentic flavors of the Mediterranean.</p>
            </div>
            <div className="mission-card">
              <h3>Modern Twist</h3>
              <p>While honoring tradition, we also embrace innovation, creating unique dishes that surprise and delight our guests.</p>
            </div>
            <div className="mission-card">
              <h3>Community Focus</h3>
              <p>We're proud to be part of the Chicago community, supporting local farmers and creating a welcoming space for all.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-avatar">👨‍🍳</div>
              <h3>Mario Andoni</h3>
              <p className="team-role">Head Chef & Co-Owner</p>
              <p className="team-bio">With over 30 years of experience, Mario brings passion and expertise to every dish.</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">👩‍🍳</div>
              <h3>Adrian Andoni</h3>
              <p className="team-role">Pastry Chef & Co-Owner</p>
              <p className="team-bio">Adrian's desserts are legendary, combining traditional techniques with creative flair.</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">👨‍💼</div>
              <h3>Luigi Andoni</h3>
              <p className="team-role">Restaurant Manager</p>
              <p className="team-bio">Luigi ensures every guest feels at home, creating memorable dining experiences.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

