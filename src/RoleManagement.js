// src/RoleManagement.js

import React, { useContext } from 'react';
import { GameContext } from './GameContext';
import './RoleManagement.css';

const RoleManagement = () => {
  const { shuffleRoles, clearAll } = useContext(GameContext);

  return (
    <div className="role-management">
      <button className={shuffleRoles}>Shuffle Roles</button>
      <button className="clear-btn"  onClick={clearAll}>Clear All</button>
    </div>
  );
};

export default RoleManagement;
