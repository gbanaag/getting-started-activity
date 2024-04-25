import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import { DiscordSDK } from '@discord/embedded-app-sdk';
import './style.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [discordSdk, setDiscordSdk] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // Set up Discord SDK when component mounts
  useEffect(() => {
    async function setupDiscordSdk() {
      const sdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
      await sdk.ready();
      setDiscordSdk(sdk);
      setIsReady(true);
    }
    setupDiscordSdk();
  }, []);

  // if (!isReady) {
  //   return React.createElement('div', null, 'Loading...');
  // }

  // Function to render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage discordSdk={discordSdk} />;
      case 'about':
        return <AboutPage discordSdk={discordSdk} />;
      default:
        return <div>Page not found</div>;
    }
  };

  // Function to handle page navigation
  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Navigation */}
      <nav>
        <button onClick={() => navigateToPage('home')}>Home</button>
        <button onClick={() => navigateToPage('about')}>About</button>
      </nav>

      {/* Render current page */}
      {renderPage()}
    </div>
  );
};

// Render the application
ReactDOM.render(<App />, document.getElementById('app'));
