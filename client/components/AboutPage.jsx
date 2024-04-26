import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div>
      <h1>About Us</h1>
      <p>Learn more about our Discord application and what we offer.</p>
      <Link to="/character">Character Creator</Link>
    </div>
  );
};

export default AboutPage;
