// CareerPickerPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CareerPickerPage = () => {
  return (
    <div>
      <h1>Career Picker</h1>
      {/* Your career selection form */}
      <Link to="/personality-hobby">Previous</Link>
    </div>
  );
};

export default CareerPickerPage;
