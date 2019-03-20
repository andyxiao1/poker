import React from 'react';
import '../styles/Player.css';
import Card from './Card';

const Player = props => {
  const { isCurrPlayer, name, stack, cards } = props;
  if (isCurrPlayer) {
    return (
      <div className="player">
        <div className="player-info">
          <p>{name}</p>
          <p>${stack}</p>
        </div>
        <Card card={cards[0]} />
        <Card card={cards[1]} />
        <div className="player-actions">
          <button>Fold</button>
          <button>Call/Check</button>
          <button>Raise</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="player">
        <div className="player-info">
          <p>{name}</p>
          <p>${stack}</p>
        </div>
        {cards ? (
          <Card card={cards[0]} isOpponentCard="true" />
        ) : (
          <Card isFaceDown="true" />
        )}
        {cards ? (
          <Card card={cards[1]} isOpponentCard="true" />
        ) : (
          <Card isFaceDown="true" />
        )}
      </div>
    );
  }
};

export default Player;
