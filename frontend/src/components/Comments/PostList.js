import React from 'react';

import Post from './Post';
import './Post.css';

//The list of comments as displayed on screen
const PostList = props => {
  let content;
  if(!props.items || props.items.length === 0) {
    content = <p>No comments created yet.</p>;
  } else {
    content = (
      <li className="PostList">
        {props.items.map(p => (
          <Post key={p.id} game={p.game} author={p.author} comment={p.comment} />
        ))}
      </li>
    );
  }

  return <section id="products">{content}</section>;
};

export default PostList;
