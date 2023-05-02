import React from 'react';

import './GameItem.css';

//A clickable game element as displayed on screen showing the title, description, and play button
const GameItem = props => {

  const playGame = event => {
    props.playGame(props.link);
  }

  return (
    <li className="game-item">
      <img src={props.thumbnail} alt="game thumbnail"/>
      <h2>{props.name}</h2>
      <p>{props.text}</p>
      <button type='button' className="play-button" onClick={() => playGame(props.link)}>Play!</button>
    </li>
  );
};

export default GameItem;
