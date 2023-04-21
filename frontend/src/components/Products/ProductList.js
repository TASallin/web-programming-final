import React from 'react';

import ProductItem from './ProductItem';
import './ProductList.css';

const ProductList = props => {

  const playGameHandler = async (path) => {
    props.playGameHandler(path);
  }

  let content;
  if (!props.items || props.items.length === 0) {
    content = <p>Could not find any products. Maybe create one?</p>;
  } else {
    content = (
      <ul className="product-list">
        {props.items.map(p => (
          <ProductItem playGame={playGameHandler} key={p.id} name={p.name} text={p.text} link={p.link} thumbnail={p.thumbnail} />
        ))}
      </ul>
    );
  }

  return <section id="products">{content}</section>;
};

export default ProductList;
