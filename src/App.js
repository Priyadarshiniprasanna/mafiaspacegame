// src/App.js

import React, { useState } from 'react';
import { GameProvider } from './GameContext';
import PlayerForm from './PlayerForm';
import PlayerList from './PlayerList';
import RoleManagement from './RoleManagement';
import GameStats from './GameStats';
import Gameplay from './Gameplay'; // Make sure to create this component
import './App.css';

const App = () => {
  const [isGameplay, setIsGameplay] = useState(false); // State to toggle views

  const startGame = () => {
    setIsGameplay(true); // Change view to gameplay when Start Game is clicked
  };

  const goToSetup = () => {
    setIsGameplay(false); // Optional: Button in Gameplay to return to setup
  };

  return (
    <GameProvider>
      <div className="App">
        {isGameplay ? (
          <Gameplay goBackToSetup={goToSetup} />
        ) : (
          <>
            <h1>Game Setup</h1>
            <PlayerForm />
            <PlayerList />
            <RoleManagement />
            <GameStats />
            <button className="start-game-button" onClick={startGame}>Start Game</button>
          </>
        )}
      </div>
        
        
    </GameProvider>
  );
};

export default App;
