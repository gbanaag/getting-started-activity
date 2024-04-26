import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import CharacterCreatorPage from './components/CharacterCreatorPage';
import PersonalityHobbyPage from './components/PersonalityHobbyPage';
import CareerPickerPage from './components/CareerPickerPage';
import { DiscordSDK } from '@discord/embedded-app-sdk';
import './style.css';

const App = () => {
  const [discordSdk, setDiscordSdk] = useState(null);
  const [isReady, setIsReady] = useState(true);

  // Set up Discord SDK when component mounts
  useEffect(() => {
    console.log('useEffect hook called');
    async function setupDiscordSdk() {
      console.log('setupDiscordSdk called');
      try {
        const sdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
        await sdk.ready();
        console.log('Discord SDK ready');
        setDiscordSdk(sdk);
        setIsReady(true);
      } catch (error) {
        console.error('Error setting up Discord SDK:', error);
        // Handle error (e.g., display error message)
      }
    }
    setupDiscordSdk();
  }, []);  

  return (
    <div>
      <BrowserRouter>
        <Routes> {/* Wrap your Route components with Routes */}
          <Route exact path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/character" element={<CharacterCreatorPage />} />
          <Route path="/personality-hobby" element={<PersonalityHobbyPage />} />
          <Route path="/career" element={<CareerPickerPage />} />
        </Routes>
      </BrowserRouter>
      {!isReady && <div>Loading...</div>}
    </div>
  );
};

// Render the application
ReactDOM.render(<App />, document.getElementById('app'));
