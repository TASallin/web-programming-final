import React, { useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import './NewComment.css';

//The input form for adding a new comment
const NewComment = props => {
  const [enteredComment, setEnteredComment] = useState(''); //The other information like game and player are stored at the app level, so only the comment itself is needed

  const commentChangeHandler = event => {
    setEnteredComment(event.target.value);
  };

  const submitCommentHandler = event => {
    event.preventDefault();
    props.onAddComment(enteredComment);
  };

  //Has a simple header, input field, and button for submission
  return (
    <section id="new-comment">
      <h2>Add Your Comments</h2>
      <form onSubmit={submitCommentHandler}>
        <Input
          type="text"
          label="Comments"
          id="Comment"
          value={enteredComment}
          onChange={commentChangeHandler}
        />
        <Button type="submit">Comment</Button>
      </form>
    </section>
  );
};

export default NewComment;
