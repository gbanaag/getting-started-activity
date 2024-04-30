import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';
import '../assets/onboarding.css'; // Import CSS for styling

const CharacterCreatorPage = ({ discordUserId }) => {
    const [hairColor, setHairColor] = useState('#000000');
    const [eyeColor, setEyeColor] = useState('#0000FF');

    const handleSaveCharacter = () => {
        // Get a reference to the Firebase Realtime Database
        const db = getDatabase();

        // Define the data to be saved
        const characterData = {
            hairColor: hairColor,
            eyeColor: eyeColor,
            // Add other character traits, hobbies, and careers here
        };

        // Set the character data in the database
        set(ref(db, `characters/${discordUserId}`), characterData)
            .then(() => {
                console.log('Character data saved successfully!');
            })
            .catch((error) => {
                console.error('Error saving character data:', error);
            });
    };

    const handleHairColorChange = (event) => {
        setHairColor(event.target.value);
    };

    const handleEyeColorChange = (event) => {
        setEyeColor(event.target.value);
    };

    return (
        <div>
            <h1>Character Creator</h1>
            <div className="options-container">
                {/* Hair Color Selector */}
                <div className="option">
                    <label>
                        Hair Color:
                        <input type="color" value={hairColor} onChange={handleHairColorChange} />
                    </label>
                </div>
                {/* Eye Color Selector */}
                <div className="option">
                    <label>
                        Eye Color:
                        <input type="color" value={eyeColor} onChange={handleEyeColorChange} />
                    </label>
                </div>
            </div>
            <div className="character-preview">
                <svg width="200" height="200">
                    {/* Hair */}
                    <circle cx="100" cy="50" r="40" fill={hairColor} />
                    {/* Eyes */}
                    <circle cx="70" cy="80" r="10" fill={eyeColor} />
                    <circle cx="130" cy="80" r="10" fill={eyeColor} />
                    {/* Mouth */}
                    <ellipse cx="100" cy="130" rx="30" ry="10" fill="none" stroke="#000000" strokeWidth="2" />
                </svg>
            </div>
            <button onClick={handleSaveCharacter}>Save Character</button>
            <Link to="/about">Previous</Link>
            <br />
            <Link to="/personality-hobby">Next</Link>
        </div>
    );
};

export default CharacterCreatorPage;
