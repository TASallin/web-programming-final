import React, { useState } from 'react';
import './PortfolioList.css';
//import { ReactSortable } from "react-sortablejs";

const PortfolioList = props => {
  
  //List of games does not use the server and instead is controlled with react-sortablejs
  const [games, setGames] = useState([
    { id: 'game1', text: 'Platformer a team of us created during the apocalypse game jam', link: 'https://mysticfroggames.itch.io/after-the-flood', name: 'After The Flood' },
    { id: 'game2', text: 'My final project for game prototyping, where you steal coffee from your boss', link: 'https://tasallin.github.io/game601-fall2022/final/index.html', name: 'Coffee Thief' },
    { id: 'game3', text: 'A project during game development featuring Unity pro-builder and terrain', link: 'https://tasallin.github.io/game615-spring2023-05/exercise05/play/', name: 'Wesker Orders a Pizza' },
  ]);
  /*
  return (
    <ReactSortable className="portfolio-list" list={games} setList={setGames} >
      {games.map((game) => (
        <div className="game" key={game.id}>
          <a href={game.link}>{game.name}</a>
          <p>{game.text}</p>
        </div>
      ))}
    </ReactSortable>
  );
  */
};

export default PortfolioList;