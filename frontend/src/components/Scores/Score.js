import React from 'react';

import './Score.css';

const Score = props => {
  return (
    <li className="Score">
      <h5>Game: {props.game}</h5>
      <h5>Player: {props.player}</h5>
      <p>Score: {props.score}</p>
    </li>
  )
//   const playGame = event => {
//     console.log("Hi!");
//     console.log(props.link);
//     props.playGame(props.link);
//   }

//   return (
//     <li className="product-item">
//       <a href={props.link}>{props.name}</a>
//       <p>Description: {props.text}</p>
//       <button type='button' className="play-button" onClick={() => playGame(props.link)}>Play!</button>
//     </li>
//   );
};

export default Score;
