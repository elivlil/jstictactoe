class Game {
  constructor(size) {
    console.log("Game started");
    this.board = new Board(size);
    this.round = 0;
    this.winner = null;
  }

  currentMark() {
    if (this.round & 1) {
      return "o"
    } else {
      return "x"
    }
  }

  play(x, y) {
    if (!(this.winner) && this.winner != "draw") {
      if (this.isValidPosition(x, y)) {
        this.board.put(x, y, this.currentMark());
        console.log("\n\tRound ", this.round);
        this.board.show();
        if (!this.winner) this.winner = this.board.searchWinner(x, y, this.currentMark());
        this.displayWinner();
        (this.winner) ? this.round = -1 : this.round++;
      } else {
        console.log("Invalid position");
      }
    } else {
      console.log("Game has ended");
    }
  }

  isValidPosition(x, y) {
    if (x < this.board.size && y < this.board.size && 0 <= x && 0 <= y && this.board.board[x][y] === "-") {
      return true;
    } else {
      return false;
    }
  }

  displayWinner() {
    this.winner ? console.log("\n\tWinner: ", this.winner) : console.log("\n\tNo winner")
  }
}


