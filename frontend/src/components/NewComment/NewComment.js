import React, { useState } from 'react';
import './NewComment.css';

const NewComment = props => {
  
  const [enteredText, setEnteredText] = useState("");
  const [enteredName, setEnteredName] = useState("");

  const textChangeHandler = event => {
    setEnteredText(event.target.value);
  }
 
  const nameChangeHandler = event => {
    setEnteredName(event.target.value);
  }

  const addCommentHandler = event => {
    event.preventDefault();

    const newComment = {
        text: enteredText,
        name: enteredName
    };

    setEnteredText('');

    props.onAddComment(newComment);
  }

  //comment form is pretty basic and vertically has entries for the comment text and the author's name
  return (
    <div className="new-comment">
      <form className='new-comment' class='form-control' onSubmit={addCommentHandler}>
        <div/>
        <input type='text' className="comment-form" value={enteredText} onChange={textChangeHandler} />
        <p>Comment</p>
        <div/>
        <input type='text' className="comment-form" value={enteredName} onChange={nameChangeHandler} /> 
        <p>Your Name</p>
        <div/>
        <button type='submit'>Add Comment</button>
      </form>

    </div>
  );
};

export default NewComment;