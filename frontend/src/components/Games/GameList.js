import React from 'react';

import GameItem from './GameItem';
import './GameList.css';

const GameList = props => {

  const playGameHandler = async (path) => {
    props.playGameHandler(path);
  }

  let content;
  if (!props.items || props.items.length === 0) {
    content = <p>Could not find any games due to an unknown error</p>;
  } else {
    content = (
      <ul className="game-list">
        {props.items.map(p => (
          <GameItem playGame={playGameHandler} key={p.id} name={p.name} text={p.text} link={p.link} thumbnail={p.thumbnail} />
        ))}
      </ul>
    );
  }

  return <section id="games">{content}</section>;
};

export default GameList;
