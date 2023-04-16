import React from 'react';

import './Post.css';

const Post = props => {
  return (
    <li className="Post">
      <h2>Name: {props.title} props.title</h2>
      <p>Comment: {props.description}</p>
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
