import React from 'react';

import './Post.css';

const Post = props => {
  return (
    <li className="Post">
      <h5>Game: {props.game}</h5>
      <h5>Author: {props.author}</h5>
      <p>Comment: {props.comment}</p>
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

export default Post;
