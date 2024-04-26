// PersonalityHobbyPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PersonalityHobbyPage = () => {
  return (
    <div>
      <h1>Personality and Hobby Picker</h1>
      {/* Your personality and hobby selection form */}
      <Link to="/character">Previous</Link>
      <br></br>
      <Link to="/career">Next</Link>
      {/* <Link to="/career">Career Picker</Link> */}

    </div>
  );
};

export default PersonalityHobbyPage;
