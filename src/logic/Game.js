class Game {
  constructor(size) {
    this.board = new Board(size);
    this.round = 0;
    this.winner = null;
  }

  currentMark() {
    return (this.round & 1) ? "o" : "x";
  }

  play(x, y) {
    if (this.round>-1) {
      this.board.put(x, y, this.currentMark());
      if (!this.winner) this.winner = this.board.searchWinner(x, y, this.currentMark());
      (this.winner) ? this.round = -1 : this.round++;
    }
  }
}


