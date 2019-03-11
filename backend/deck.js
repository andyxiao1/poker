class Deck {
  constructor() {
    this.suits = ['s', 'h', 'd', 'c'];
    this.ranks = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'T',
      'J',
      'Q',
      'K',
      'A'
    ];
    this.cards = [];
    this.makeDeck();
    this.shuffle();
    this.drawCard = this.drawCard.bind(this);
  }

  makeDeck() {
    for (let i = 0; i < this.suits.length; i++) {
      for (let j = 0; j < this.ranks.length; j++) {
        this.cards.push(this.ranks[j] + this.suits[i]);
      }
    }
  }

  /**
   * Fisher-Yates Shuffle
   * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   */
  shuffle() {
    let currentIndex = this.cards.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
  }

  drawCard() {
    return this.cards.pop();
  }
}

export default Deck;
