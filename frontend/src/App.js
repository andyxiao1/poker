import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import Player from './Player';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="other-players">
          <Player name="Opponent" stack={5.25} cards={['As', 'Ah']} />
          {/* <Player name="Derek" stack={5.25} cards={['As', 'Ah']} />
          <Player name="Ben" stack={5.25} cards={['2c', '2h']} />
          <Player name="Petr" stack={5.25} />
          <Player name="Daniel" stack={5.25} />
          <Player name="Josh" stack={5.25} /> */}
        </div>
        <Table state="river" cards={['Ks', 'Jh', 'Qc', '3s', '3c']} />
        <Player
          isCurrPlayer="true"
          name="Andy"
          stack="25.25"
          cards={['3h', 'Ts']}
        />
      </div>
    );
  }
}

export default App;
