// src/Gameplay.js

import React, { useContext, useState } from 'react';
import { GameContext } from './GameContext';
import './GamePlay.css';

const Gameplay = ({ goBackToSetup }) => {
  const {
    players, eliminatePlayer, voteCounts, recordVote, resetVotes, currentRound, setCurrentRound
  } = useContext(GameContext);
  
  const [votingRound, setVotingRound] = useState(1);

  const handleVote = (voter, votedAgainst) => {
    recordVote(voter, votedAgainst);
  };

  const isVoted = (voter, candidate) => {
    return voteCounts[candidate] && voteCounts[candidate].voters.includes(voter);
  };

  const displayVotingResults = () => {
    return Object.entries(voteCounts).map(([player, info]) => (
      <div key={player} className="voting-result">
        {player} has been voted by {info.voters.join(", ")} (Total Votes: {info.totalVotes})
      </div>
    ));
  };

  const countAlivePlayersByRole = (role) => {
    return players.filter(player => {
      const isMafia = role === 'Mafia' && player.role.includes('Mafia');
      const isVillager = role === 'Villager' && !player.role.includes('Mafia');
      return (isMafia || isVillager) && !player.eliminated;
    }).length;
  };

  const goToSecondRound = () => {
    setVotingRound(2);
  };

  const initiateNextRound = () => {
    resetVotes();
    setCurrentRound(currentRound + 1); // This is assuming setCurrentRound is a function provided via context to update the currentRound state.
    setVotingRound(1);
  };

  return (
    <div className="gameplay-container">
    <h2>Gameplay - Game Round {currentRound}, Voting Round {votingRound}</h2>
    {players.map((player) => (
      <div key={player.name} className={`player ${player.eliminated ? 'eliminated' : ''}`}>
        <p>
          {player.name} - {player.role}
          {player.eliminated && ` - Eliminated by ${player.eliminationMethod} in round ${player.eliminationRound}`}
        </p>
        {!player.eliminated && (
          <div className="voting-buttons">
            {players.filter(p => !p.eliminated && p.name !== player.name).map((p) => (
              <button key={p.name} onClick={() => handleVote(player.name, p.name)}
                      className={isVoted(player.name, p.name) ? 'voted' : ''}>
                Vote {p.name}
              </button>
              ))}
            </div>
          )}
          {!player.eliminated && (
            <div className="elimination-methods">
              <button onClick={() => eliminatePlayer(player.name, 'Mafia', currentRound)} className="eliminate-button mafia">Killed by Mafia</button>
              <button onClick={() => eliminatePlayer(player.name, 'Vote', currentRound)} className="eliminate-button vote-out">Voted Out</button>
              <button onClick={() => eliminatePlayer(player.name, 'Assassin', currentRound)} className="eliminate-button assassin">Killed by Assassin</button>
            </div>
          )}
        </div>
      ))}
      {votingRound === 1 && <button onClick={goToSecondRound} className="round-button">Go to Second Round</button>}
      <button onClick={initiateNextRound} className="round-button">Go Next Round</button>
      <button onClick={goBackToSetup} className="setup-button">Back to Setup</button>
      <div className="voting-results">{displayVotingResults()}</div>
      <div className="player-counts">
        <p>Mafia Count: {countAlivePlayersByRole('Mafia')}</p>
        <p>Villager Count: {countAlivePlayersByRole('Villager')}</p>
      </div>
      {/* Add your existing styles below and include the new styles for the updated classes */}

    </div>
  );
};

export default Gameplay;
