import React from 'react';

import Score from './Score';
import './Leaderboard.css';

const Leaderboard = props => {
  let content;
  if(!props.items || props.items.length === 0) {
    content = <p>Could not find any high scores. Maybe get good?</p>;
  } else {
    content = (
      <ul className="Leaderboard">
        {props.items.map(p => (
          <Score key={p.id} game={p.game} player={p.player} score={p.score} />
        ))}
      </ul>
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

export default Leaderboard;
