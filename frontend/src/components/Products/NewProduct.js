import React, { useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import './NewProduct.css';

const NewProduct = props => {
  const [enteredComment, setEnteredComment] = useState('');

  const commentChangeHandler = event => {
    setEnteredComment(event.target.value);
  };

  const submitProductHandler = event => {
    event.preventDefault();
    console.log("adding new comment");
    props.onAddComment(enteredComment);
  };

  return (
    <section id="new-product">
      <h2>Add Your Comments</h2>
      <form onSubmit={submitProductHandler}>
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

export default NewProduct;
