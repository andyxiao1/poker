import React from 'react';
import './Card.css';

const Card = props => {
  const { isFaceDown, isTableCard, isOpponentCard, card } = props;
  if (isFaceDown && isTableCard) {
    return (
      <div className="wrapper">
        <div className="card big" />
      </div>
    );
  } else if (isFaceDown) {
    return (
      <div className="wrapper">
        <div className="card small" />
      </div>
    );
  }

  const rank = card.charAt(0);
  const suit = card.charAt(1);

  const suitMap = {
    s: 'Spades',
    h: 'Hearts',
    c: 'Clubs',
    d: 'Diamonds'
  };

  const rankMap = {
    A: 'Ace',
    '2': 'Deuce',
    '3': 'Three',
    '4': 'Four',
    '5': 'Five',
    '6': 'Six',
    '7': 'Seven',
    '8': 'Eight',
    '9': 'Nine',
    T: 'Ten',
    J: 'Jack',
    Q: 'Queen',
    K: 'King'
  };

  if (isOpponentCard) {
    return (
      <div className="wrapper">
        <div className="card small">
          <div className={`${suit} mark dark`}>{rank}</div>
          <div className={`${suit} mark upside-down`}>{rank}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="wrapper">
        <div className="card big">
          <div className={`${suit} mark dark`}>{rank}</div>
          <div className="content ">
            <h1>{rankMap[rank]}</h1>
            <h2>
              <sup>OF</sup>
              <span className="dark">{suitMap[suit]}</span>
            </h2>
          </div>
          <div className={`${suit} mark upside-down`}>{rank}</div>
        </div>
      </div>
    );
  }
};

export default Card;
