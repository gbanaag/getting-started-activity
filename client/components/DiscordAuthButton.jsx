import React from 'react';

const DiscordAuthButton = () => {
    const handleDiscordAuth = async () => {
        try {
            // Generate OAuth2 URL with appropriate scopes
            const oauthUrl = "https://discord.com/oauth2/authorize?client_id=1231743801731846144&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2F&scope=identify"; 
            window.location.href = oauthUrl;
        } catch (error) {
            console.error('Error initiating Discord OAuth2:', error);
            // Handle error (e.g., display error message)
        }
    };

    return (
        <button onClick={handleDiscordAuth}>Login with Discord</button>
    );
};

export default DiscordAuthButton;
