import React from 'react';

import './Post.css';

//A comment as its displayed on screen, showing the game, player, and content of the comment
const Post = props => {
  return (
    <ul className="Post">
      <h5>Game: {props.game}</h5>
      <h5>Author: {props.author}</h5>
      <p>Comment: {props.comment}</p>
    </ul>
  )
};

export default Post;
