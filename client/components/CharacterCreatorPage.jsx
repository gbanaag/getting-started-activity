import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/onboarding.css'; // Import CSS for styling


const CharacterCreatorPage = () => {
  const [activeTab, setActiveTab] = useState('hair');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="character-creator">
      <div className="tabs">
        <button className={activeTab === 'hair' ? 'active' : ''} onClick={() => handleTabChange('hair')}>Hair</button>
        <button className={activeTab === 'eyes' ? 'active' : ''} onClick={() => handleTabChange('eyes')}>Eyes</button>
        {/* Add more buttons for other traits */}
      </div>
      <div className="windows">
        {activeTab === 'hair' && (
          <div className="window">
            {/* Hair customization options */}
            <h2>Hair Color:</h2>
            <button>Button 1</button>
            <button>Button 2</button>
            {/* Add more buttons for hair customization */}
          </div>
        )}
        {activeTab === 'eyes' && (
          <div className="window">
            {/* Eye customization options */}
            <h2>Eye Color:</h2>
            <button>Button 1</button>
            <button>Button 2</button>
            {/* Add more buttons for eye customization */}
          </div>
        )}
        {/* Add more windows for other traits */}
      </div>
      <Link to="/about">Previous</Link>
      <br></br>
      <Link to="/personality-hobby">Next</Link>
    </div>
  );
};

export default CharacterCreatorPage;
