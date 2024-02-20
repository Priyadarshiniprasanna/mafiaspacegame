// src/PlayerList.js

import React, { useContext } from 'react';
import { GameContext } from './GameContext';
import './PlayerList.css';

const PlayerList = () => {
  const { players, deletePlayer } = useContext(GameContext);

  return (
    <ul className="player-list">
      {players.map((player, index) => (
        <li key={index}>
          {player.name} - {player.role}
          <button onClick={() => deletePlayer(player.name)}>Delete</button>
        </li>
      ))}
    </ul>
  );
  
};

export default PlayerList;
