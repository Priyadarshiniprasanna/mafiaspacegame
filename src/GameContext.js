// src/GameContext.js

import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [players, setPlayers] = useState([]); // Define players state
  const [currentRound, setCurrentRound] = useState(1); // Added state to track the current round
  const [roles, setRoles] = useState([ // Define roles state
    'HeadMafia', 'Mafia', 'Block Mafia', 'Assassin', 'Bard', 'Doctor', 'Knight', 'Police', 'Revealer', 'Villager'
  ]);
  const [availableRoles, setAvailableRoles] = useState([
    'HeadMafia', 'Mafia', 'Block Mafia', 'Assassin', 'Bard', 'Doctor', 'Knight', 'Police', 'Revealer', 'Villager'
  ]);
  const [eliminations, setEliminations] = useState({});
  const [voteCounts, setVoteCounts] = useState({});

  const resetVotes = () => {
    setVoteCounts({});
  };

  const addPlayer = (player) => {
    setPlayers(prevPlayers => [...prevPlayers, player]);

    // Remove the assigned role from availableRoles if it's not 'mafia' or 'villager'
    if (player.role !== 'Mafia' && player.role !== 'Villager') {
      setAvailableRoles(prevAvailableRoles =>
          prevAvailableRoles.filter(role => role !== player.role)
      );
    }
  };

  const deletePlayer = (playerName) => {
    const playerToDelete = players.find(player => player.name === playerName);
    setPlayers(prevPlayers => prevPlayers.filter(player => player.name !== playerName));

    // Add the role back to availableRoles if it's not 'mafia' or 'villager'
    if (playerToDelete && playerToDelete.role !== 'Mafia' && playerToDelete.role !== 'Villager') {
      setAvailableRoles(prevAvailableRoles => [...prevAvailableRoles, playerToDelete.role]);
    }
  };

  const shuffleRoles = () => {
    // Extract the current roles assigned to players
    let assignedRoles = players.map(player => player.role);

    // Shuffle the assignedRoles array
    for (let i = assignedRoles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [assignedRoles[i], assignedRoles[j]] = [assignedRoles[j], assignedRoles[i]];
    }

    // Assign the shuffled roles back to the players
    const shuffledPlayers = players.map((player, index) => {
      return { ...player, role: assignedRoles[index] };
    });

    setPlayers(shuffledPlayers);
  };

  const clearAll = () => {
    setPlayers([]);
    setEliminations({});
    setVoteCounts({});
    setCurrentRound(1); // Reset the round when clearing all
    // Reset availableRoles to the full list of roles
    setAvailableRoles([...roles]);
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
        players, roles :availableRoles, addPlayer, deletePlayer, shuffleRoles, clearAll, addRole,
        eliminations, eliminatePlayer, voteCounts, recordVote, resetVotes,
        currentRound, setCurrentRound,setPlayers,setAvailableRoles // Expose the currentRound and its setter
      }}>
        {children}
      </GameContext.Provider>
  );
};