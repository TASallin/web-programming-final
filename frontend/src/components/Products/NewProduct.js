import React, { useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import './NewProduct.css';

const NewProduct = props => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredPrice, setEnteredPrice] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');

  const titleChangeHandler = event => {
    setEnteredTitle(event.target.value);
  };

  const priceChangeHandler = event => {
    setEnteredPrice(event.target.value);
  };

  const descriptionChangeHandler = event => {
    setEnteredDescription(event.target.value);
  };

  const submitProductHandler = event => {
    event.preventDefault();
    console.log("adding new product");
    props.onAddProduct(enteredTitle, enteredPrice, enteredDescription);
  };

  return (
    <section id="new-product">
      <h2>Add Your Comments</h2>
      <form onSubmit={submitProductHandler}>
        <Input
          type="text"
          label="Name"
          id="title"
          value={enteredTitle}
          onChange={titleChangeHandler}
        />
        {/* <Input
          type="number"
          label="Price"
          step={0.01}
          id="price"
          value={enteredPrice}
          onChange={priceChangeHandler}
        /> */}
        <Input
          type="text"
          label="Comments"
          id="description"
          value={enteredDescription}
          onChange={descriptionChangeHandler}
        />
        <Button type="submit">Comment</Button>
      </form>
    </section>
  );
};

export default NewProduct;
