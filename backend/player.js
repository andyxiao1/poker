class Player {
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
    this.chips = options.chips;
    this.game = null;
    this.firstCard = {};
    this.secondCard = {};
    this.bet = 0;
    this.lastAction = '';
    this.hasActed = false; // acted for one round (call/check/raise)
    this.hasDone = false; // finish acted for one game (fold/allin)

    this.fold = this.fold.bind(this);
    this.allin = this.allin.bind(this);
    this.callOrCheck = this.callOrCheck.bind(this);
    this.raise = this.raise.bind(this);
    this.addBet = this.addBet.bind(this);
  }

  fold() {
    this.lastAction = 'fold';
    this.hasDone = true;

    this.game.incrementPlayerTurn();
    this.game.checkForNextRound();
  }

  allin() {
    this.lastAction = 'allin';
    this.hasDone = true;

    this.addBet(this.chips);
    this.game.incrementPlayerTurn();
    this.game.checkForNextRound();
  }

  callOrCheck() {
    this.hasActed = true;

    const diff = this.game.getHighestBet() - this.bet;
    this.addBet(diff);

    if (diff > 0) {
      this.lastAction = 'call';
    } else {
      this.lastAction = 'check';
    }
    this.game.incrementPlayerTurn();
    this.game.checkForNextRound();
  }

  raise() {
    this.hasActed = true;

    var diff = this.game.getHighestBet() - this.bet;
    this.addBet(diff);

    if (diff > 0) {
      this.lastAction = 'call';
    } else {
      this.lastAction = 'check';
    }
    this.game.incrementPlayerTurn();
    this.game.checkForNextRound();
  }

  addBet() {
    if (this.chips < amount) {
      return 'error - not enough chips';
    }
    this.chips -= amount;
    this.bet += amount;
  }

  reset() {
    this.firstCard = {};
    this.secondCard = {};
    this.bet = 0;

    this.lastAction = '';
    this.hasActed = false;
    this.hasDone = false;
  }
}

export default Player;
