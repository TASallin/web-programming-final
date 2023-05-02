import React from 'react';

import Score from './Score';
import './Leaderboard.css';

//The list of highscores as displayed on screen. Scores are ordered from highest to lowest
const Leaderboard = props => {
  let content;
  if(!props.items || props.items.length === 0) {
    content = <p>No highscores recorded</p>;
  } else {
    content = (
      <ul className="Leaderboard">
        {props.items.map(p => (
          <Score key={p.id} game={p.game} player={p.player} score={p.score} />
        ))}
      </ul>
    );
  }

  return <section id="products">{content}</section>;
};

export default Leaderboard;
