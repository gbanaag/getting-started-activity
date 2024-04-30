import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import CharacterCreatorPage from './components/CharacterCreatorPage';
import PersonalityHobbyPage from './components/PersonalityHobbyPage';
import CareerPickerPage from './components/CareerPickerPage';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { DiscordSDK } from '@discord/embedded-app-sdk';

import './style.css';

const firebaseConfig = {
  apiKey: String(import.meta.env.REACT_APP_FIREBASE_API_KEY),
  authDomain: String(import.meta.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
  databaseURL: "https://abode-4584f-default-rtdb.firebaseio.com",
  projectId: String(import.meta.env.REACT_APP_FIREBASE_PROJECT_ID),
  storageBucket: String(import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(import.meta.env.REACT_APP_FIREBASE_APP_ID),
  measurementId: String(import.meta.env.REACT_APP_FIREBASE_MEASUREMENT_ID)
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const App = () => {
  const [discordUserId, setDiscordUserId] = useState(null); // State for discordUserId
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for authentication status

  useEffect(() => {
    async function setupDiscordSdk() {
      try {
        const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
        await discordSdk.ready();
        setDiscordUserId(discordSdk.getCurrentUserId());
        setIsAuthenticated(true);

        // Authorize with Discord Client
        const { code } = await discordSdk.commands.authorize({
          client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
          response_type: 'code',
          state: '',
          prompt: 'none',
          scope: ['identify', 'guilds', 'rpc.voice.read'],
        });

        // Retrieve an access_token from your activity's server
        const response = await fetch('/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
          }),
        });
        const { access_token } = await response.json();

        // Authenticate with Discord client (using the access_token)
        const auth = await discordSdk.commands.authenticate({
          access_token,
        });

        if (auth == null) {
          throw new Error('Authenticate command failed');
        }
        
        // Render the voice channel name and guild avatar
        appendVoiceChannelName(discordSdk);
        appendGuildAvatar(auth);
      } catch (error) {
        console.error('Error setting up Discord SDK:', error);
      }
    }

    setupDiscordSdk().then(() => {
      console.log("Discord SDK is authenticated");

      appendVoiceChannelName();
      appendGuildAvatar();
    });
  }, []);  

  async function appendVoiceChannelName(discordSdk) {
    const app = document.querySelector('#app');

    let activityChannelName = 'Unknown';

    if (discordSdk.channelId != null && discordSdk.guildId != null) {
      const channel = await discordSdk.commands.getChannel({channel_id: discordSdk.channelId});
      if (channel.name != null) {
        activityChannelName = channel.name;
      }
    }

    const textTagString = `Activity Channel: "${activityChannelName}"`;
    const textTag = document.createElement('p');
    textTag.textContent = textTagString;
    app.appendChild(textTag);
  }

  async function appendGuildAvatar(auth) {
    const app = document.querySelector('#app');
    
    const guilds = await fetch(`https://discord.com/api/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
        'Content-Type': 'application/json',
      },
    }).then((reply) => reply.json());  

    const currentGuild = guilds.find((g) => g.id === discordSdk.guildId);
    if (currentGuild != null) {
      document.getElementById("guild").innerHTML = {currentGuild};
      const guildImg = document.createElement('img');
      guildImg.setAttribute(
        'src',
        `https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}.webp?size=128`,
      );
      guildImg.setAttribute('width', '128px');
      guildImg.setAttribute('height', '128px');
      guildImg.setAttribute('style', 'border-radius: 50%;');
      app.appendChild(guildImg);
    }

    else {
      document.getElementById("guild").innerHTML = "didn't work";
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Pass discordUserId as a prop to CharacterCreatorPage if authenticated */}
          <Route path="/character" element={ <CharacterCreatorPage discordUserId={discordUserId} />} />
          <Route path="/personality-hobby" element={<PersonalityHobbyPage />} />
          <Route path="/career" element={<CareerPickerPage />} />
        </Routes>
      </BrowserRouter>

      <div>
        <img src="${rocketLogo}" class="logo" alt="Discord" />
        <h1 id="guild"> aaaa </h1>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
