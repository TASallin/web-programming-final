import React from 'react';

import './Score.css';

//A highscore as it is displayed on screen, showing the game, player, and score
const Score = props => {
  return (
    <li className="Score">
      <h5>Game: {props.game}</h5>
      <h5>Player: {props.player}</h5>
      <p>Score: {props.score}</p>
    </li>
  )
};

export default Score;
