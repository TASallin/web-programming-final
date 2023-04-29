import React from 'react';

import Post from './Post';
import './Post.css';

const PostList = props => {
  let content;
  if(!props.items || props.items.length === 0) {
    content = <p>Could not find any comments. Maybe create one?</p>;
  } else {
    content = (
      <li className="PostList">
        {props.items.map(p => (
          <Post key={p.id} game={p.game} author={p.author} comment={p.comment} />
        ))}
      </li>
    );
  }
  

  {/* // const playGameHandler = async (path) => { */}
  {/* //   console.log("Le boom boom boom");
  //   console.log(path);
  //   props.playGameHandler(path);
  // }

  // let content;
  // if (!props.items || props.items.length === 0) { */}
  {/* //   content = <p>Could not find any products. Maybe create one?</p>;
  // } else { */}
  {/* //   content = (
  //     <ul className="product-list">
  //       {props.items.map(p => ( */}
  {/* //         <ProductItem playGame={playGameHandler} key={p.id} name={p.name} text={p.text} link={p.link} />
  //       ))}
  //     </ul> */}
  {/* //   );
  // } */}

  return <section id="products">{content}</section>;
};

export default PostList;
