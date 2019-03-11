import React from 'react';
import './Table.css';
import Card from './Card';

const Table = props => {
  const { state, cards } = props;
  if (state === 'preflop') {
    return <div className="table" />;
  }
  return (
    <div className="table">
      {state === 'flop' || state === 'turn' || state === 'river' ? (
        <Card card={cards[0]} />
      ) : (
        <Card isFaceDown="true" isTableCard="true" />
      )}
      {state === 'flop' || state === 'turn' || state === 'river' ? (
        <Card card={cards[1]} />
      ) : (
        <Card isFaceDown="true" isTableCard="true" />
      )}
      {state === 'flop' || state === 'turn' || state === 'river' ? (
        <Card card={cards[2]} />
      ) : (
        <Card isFaceDown="true" isTableCard="true" />
      )}
      {state === 'turn' || state === 'river' ? (
        <Card card={cards[3]} />
      ) : (
        <Card isFaceDown="true" isTableCard="true" />
      )}
      {state === 'river' ? (
        <Card card={cards[4]} />
      ) : (
        <Card isFaceDown="true" isTableCard="true" />
      )}
    </div>
  );
};

export default Table;
