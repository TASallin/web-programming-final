import React from 'react';

import './GameItem.css';

const GameItem = props => {

  const playGame = event => {
    props.playGame(props.link);
  }

  return (
    <li className="game-item">
      <img src={props.thumbnail} alt="game thumbnail"/>
      <a href={props.link}>{props.name}</a>
      <p>{props.text}</p>
      <button type='button' className="play-button" onClick={() => playGame(props.link)}>Play!</button>
    </li>
  );
};

export default GameItem;
