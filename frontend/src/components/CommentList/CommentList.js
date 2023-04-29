import React, { useState } from 'react';
import './CommentList.css';

const CommentList = props => {
  
  //List of comments shows the text, author, a section for the likes including two buttons
  return (
    <li className='comment-list'>
      {props.comments.map(comment => {
        return <li key={comment.id}>
        <p>{comment.text}</p>
        <p>by {comment.name}</p>
        <button className='like-button' type='button' onClick={() => props.onClick(comment.id, 1)}>Like</button>
        <span>{comment.likes}</span>
        <button className='dislike-button' type='button' onClick={() => props.onClick(comment.id, -1)}>Dislike</button></li>
      } )}
    </li>
  );
};

export default CommentList;