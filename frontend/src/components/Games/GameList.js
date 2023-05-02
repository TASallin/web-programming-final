import React from 'react';

import GameItem from './GameItem';
import './GameList.css';

//The list of games as displayed on screen 
const GameList = props => {

  const playGameHandler = async (path) => {
    props.playGameHandler(path);
  }

  let content;
  if (!props.items || props.items.length === 0) {
    content = <p>Could not find any games due to an unknown error</p>;
  } else {
    content = (
      <li className="game-list">
        {props.items.map(p => (
          <GameItem playGame={playGameHandler} key={p.id} name={p.name} text={p.text} link={p.link} thumbnail={p.thumbnail} />
        ))}
      </li>
    );
  }

  return <section id="games">{content}</section>;
};

export default GameList;
