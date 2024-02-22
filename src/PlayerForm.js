// src/PlayerForm.js

import React, { useState, useContext,useEffect } from 'react';
import { GameContext } from './GameContext';
import './PlayerForm.css';

const PlayerForm = () => {

  const { addPlayer, roles } = useContext(GameContext);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Villager');

  useEffect(() => {
    if (roles.length > 0 && !roles.includes(role)) {
      setRole(roles[0]); // Set to the first available role
    }
  }, [roles, role]);


  const handleNameChange = (e) => setName(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      addPlayer({ name, role });
      setName('');
      setRole('Villager');
    }
  };

  return (
      <div className="player-form-container">
        <form onSubmit={handleSubmit} className="player-form">
          <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter player's name"
              className="player-input"
          />
          <select value={role} onChange={handleRoleChange} className="player-select">
            {roles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
            ))}
          </select>
          <button type="submit" className="submit-button">Add Player</button>
        </form>
      </div>
  );
};

export default PlayerForm;