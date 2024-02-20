// src/GameContext.js

import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [currentRound, setCurrentRound] = useState(1); // Added state to track the current round
  const [roles, setRoles] = useState([
    'HeadMafia', 'Mafia', 'Block Mafia', 'Assassin', 'Bard', 'Doctor', 'Knight', 'Police', 'Revealer', 'Villager'
  ]);
  const [eliminations, setEliminations] = useState({});
  const [voteCounts, setVoteCounts] = useState({});

  const resetVotes = () => {
    setVoteCounts({});
  };

  const addPlayer = (player) => {
    setPlayers(prevPlayers => [...prevPlayers, player]);
  };

  const deletePlayer = (playerName) => {
    setPlayers(prevPlayers => prevPlayers.filter(player => player.name !== playerName));
  };

  const shuffleRoles = () => {
    let shuffledPlayers = [...players];
    let assignedRoles = players.map(player => player.role);

    for (let i = assignedRoles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [assignedRoles[i], assignedRoles[j]] = [assignedRoles[j], assignedRoles[i]];
    }

    shuffledPlayers = shuffledPlayers.map((player, index) => ({
      ...player,
      role: assignedRoles[index]
    }));

    setPlayers(shuffledPlayers);
  };

  const clearAll = () => {
    setPlayers([]);
    setEliminations({});
    setVoteCounts({});
    setCurrentRound(1); // Reset the round when clearing all
  };

  const addRole = (newRole) => {
    if (!roles.includes(newRole)) {
      setRoles(prevRoles => [...prevRoles, newRole]);
    }
  };

  const eliminatePlayer = (playerName, method) => {
    setPlayers(prevPlayers => prevPlayers.map(player =>
      player.name === playerName ? { ...player, eliminated: true, eliminationMethod: method, eliminationRound: currentRound } : player
    ));
  };

  const recordVote = (voter, votedAgainst) => {
    // Clear previous vote
    Object.entries(voteCounts).forEach(([key, value]) => {
      if (value.voters.includes(voter)) {
        value.voters = value.voters.filter(v => v !== voter);
        value.totalVotes = value.voters.length;
      }
    });

    if (!voteCounts[votedAgainst]) {
      voteCounts[votedAgainst] = { totalVotes: 0, voters: [] };
    }
    voteCounts[votedAgainst].voters.push(voter);
    voteCounts[votedAgainst].totalVotes = voteCounts[votedAgainst].voters.length;

    setVoteCounts({ ...voteCounts });
  };

  return (
    <GameContext.Provider value={{
      players, roles, addPlayer, deletePlayer, shuffleRoles, clearAll, addRole,
      eliminations, eliminatePlayer, voteCounts, recordVote, resetVotes, 
      currentRound, setCurrentRound // Expose the currentRound and its setter
    }}>
      {children}
    </GameContext.Provider>
  );
};
