import React from 'react';

import './ProductItem.css';

const ProductItem = props => {

  const playGame = event => {
    props.playGame(props.link);
  }

  return (
    <li className="product-item">
      <img src={props.thumbnail} alt="game thumbnail"/>
      <a href={props.link}>{props.name}</a>
      <p>Description: {props.text}</p>
      <button type='button' className="play-button" onClick={() => playGame(props.link)}>Play!</button>
    </li>
  );
};

export default ProductItem;
