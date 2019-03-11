import Player from './player';
import Deck from './deck';
import PokerEvaluator from 'poker-evaluator';

class Game {
  constructor() {
    this.BET = 2000;
    this.players = []; // array of Player object, represents all players in this game
    this.round = 'idle'; // current round in a game
    this.dealerPos = 0; // to determine the dealer position for each game, incremented by 1 for each end game
    this.turnPos = 0; // to determine whose turn it is in a playing game
    this.pot = 0; // accumulated chips in center of the table
    this.communityCards = []; // array of Card object, five cards in center of the table
    this.deck = new Deck(); // deck of playing cards

    this.addPlayer = this.addPlayer.bind(this);
    this.reset = this.reset.bind(this);
    this.start = this.start.bind(this);
    this.incrementPlayerTurn = this.incrementPlayerTurn.bind(this);
    this.isEndRound = this.isEndRound.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.checkForNextRound = this.checkForNextRound.bind(this);
    this.flop = this.flop.bind(this);
    this.turn = this.turn.bind(this);
    this.river = this.river.bind(this);
    this.showdown = this.showdown.bind(this);
    this.getHighestBet = this.getHighestBet.bind(this);
    this.gatherBets = this.gatherBets.bind(this);
    this.getCurrentPlayer = this.getCurrentPlayer.bind(this);
    this.requestPlayerAction = this.requestPlayerAction.bind(this);
  }

  addPlayer(attr) {
    const newPlayer = new Player(attr);
    newPlayer.game = this;
    this.players.push(newPlayer);
  }

  reset() {
    this.round = 'idle';
    this.communityCards = []; // clear cards on board
    this.pot = 0; // clear pots on board
    this.deck = new Deck(); // use new deck of cards
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].reset();
    }
  }

  start() {
    this.reset();

    // deal two cards to each players
    for (let i = 0; i < this.players.length; i++) {
      const c1 = this.deck.drawCard();
      const c2 = this.deck.drawCard();
      this.players[i].firstCard = c1;
      this.players[i].secondCard = c2;
    }

    // determine smallBlind and bigBlind pos
    const smallBlindPos = (this.dealerPos + 1) % this.players.length;
    const bigBlindPos = (this.dealerPos + 2) % this.players.length;

    // small and big pays blind
    this.players[smallBlindPos].addBet((1 / 2) * this.BET);
    this.players[bigBlindPos].addBet(this.BET);

    // determine whose turn it is
    this.turnPos = (bigBlindPos + 1) % this.players.length;

    // begin game, start 'deal' Round
    this.round = 'deal';
  }

  incrementPlayerTurn() {
    do {
      this.turnPos = (this.turnPos + 1) % this.players.length;
    } while (this.players[this.turnPos].hasDone);
  }

  isEndRound() {
    let endOfRound = true;
    //For each player, check
    for (let i = 0; i < this.players.length; i++) {
      let player = this.players[i];
      if (!player.hasActed && !player.hasDone) {
        endOfRound = false;
      }
    }
    return endOfRound;
  }

  nextRound() {
    if (this.round === 'idle') {
      this.start();
    } else if (this.round === 'deal') {
      this.gatherBets();
      this.flop();
    } else if (this.round === 'flop') {
      this.gatherBets();
      this.turn();
    } else if (this.round === 'turn') {
      this.gatherBets();
      this.river();
    } else if (this.round === 'river') {
      this.gatherBets();
      this.showdown();
    } else {
      this.start();
    }
  }

  checkForNextRound() {
    if (this.isEndRound()) {
      logd('begin next round');
      this.nextRound();
    } else {
      logd('cannot begin next round');
    }
  }

  // hhhh

  flop() {
    logd('========== Round FLOP ==========');
    this.round = 'flop';
    // deal three cards in board
    this.communityCards[0] = this.deck.drawCard();
    this.communityCards[1] = this.deck.drawCard();
    this.communityCards[2] = this.deck.drawCard();
    // begin betting
    logd(
      'Community cards : ' +
        this.communityCards[0] +
        ', ' +
        this.communityCards[1] +
        ', ' +
        this.communityCards[2]
    );
    // other players must act
    this.requestPlayerAction();
  }

  turn() {
    logd('========== Round TURN ==========');
    this.round = 'turn';
    // deal fourth card
    this.communityCards[3] = this.deck.drawCard();
    // begin betting
    logd(
      'Community cards : ' +
        this.communityCards[0] +
        ', ' +
        this.communityCards[1] +
        ', ' +
        this.communityCards[2] +
        ', ' +
        this.communityCards[3]
    );
    // other players must act
    this.requestPlayerAction();
  }

  /**
   * Starts the 'river' Round
   */
  river() {
    logd('========== Round RIVER ==========');
    this.round = 'river';
    // deal fifth card
    this.communityCards[4] = this.deck.drawCard();
    // begin betting
    logd(
      'Community cards : ' +
        this.communityCards[0] +
        ', ' +
        this.communityCards[1] +
        ', ' +
        this.communityCards[2] +
        ', ' +
        this.communityCards[3] +
        ', ' +
        this.communityCards[4]
    );
    // other players must act
    this.requestPlayerAction();
  }

  /**
   * Starts the 'showdown' Round
   */
  showdown() {
    logd('========== SHOWDOWN ==========');
    this.round = 'showdown';
    // gather all hands
    let hands = [];
    for (var i = 0; i < this.players.length; i++) {
      hands.push([
        this.players[i].firstCard,
        this.players[i].secondCard,
        this.communityCards[0],
        this.communityCards[1],
        this.communityCards[2],
        this.communityCards[3],
        this.communityCards[4]
      ]);
    }
    // evaluate all cards
    let evalHands = [];
    for (i = 0; i < hands.length; i++) {
      evalHands.push(PokerEvaluator.evalHand(hands[i]));
    }
    logd(
      'Community cards : ' +
        this.communityCards[0] +
        ', ' +
        this.communityCards[1] +
        ', ' +
        this.communityCards[2] +
        ', ' +
        this.communityCards[3] +
        ', ' +
        this.communityCards[4]
    );
    // get highest value
    let highestVal = -9999;
    let highestIndex = -1;
    for (i = 0; i < evalHands.length; i++) {
      logd(
        'Player ' +
          this.players[i].name +
          ' : ' +
          this.players[i].firstCard +
          ', ' +
          this.players[i].secondCard +
          ' | strength : ' +
          evalHands[i].value +
          ' | ' +
          evalHands[i].handName
      );
      if (highestVal < evalHands[i].value) {
        highestVal = evalHands[i].value;
        highestIndex = i;
      }
    }
    logd(
      'Player ' +
        this.players[highestIndex].name +
        ' wins with ' +
        evalHands[highestIndex].handName
    );
  }

  /**
   * Get the highest bet from all players
   * @returns {number} highestBet
   */
  getHighestBet() {
    let highestBet = -999;
    for (let i = 0; i < this.players.length; i++) {
      if (highestBet < this.players[i].bet) {
        highestBet = this.players[i].bet;
      }
    }
    return highestBet;
  }

  /**
   * Collect all bets from players to the board's pot
   */
  gatherBets() {
    for (var i = 0; i < this.players.length; i++) {
      this.pot += this.players[i].bet;
      this.players[i].bet = 0;
    }
    logd('Total Pot : ' + this.pot);
  }

  /**
   * returns the player whose current turn it is
   * @returns {Player}
   */
  getCurrentPlayer() {
    return this.players[this.turnPos];
  }

  /**
   * Sets all players' hasActed to false
   */
  requestPlayerAction() {
    for (let i = 0; i < this.players.length; i++) {
      if (!this.players[i].hasDone) {
        this.players[i].hasActed = false;
      }
    }
  }
}

export default Game;
