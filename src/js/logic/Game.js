class Game {
  constructor(size) {
    this.board = new Board(size);
    this.round = 0;
    this.weight = 1;
    this.winner = null;
  }

  currentMark() {
    return (this.round & 1) ? "o" : "x";
  }

  play(x, y) {
    if (this.round > -1) { 
      this.weight++;
      this.winner = this.board.put(x, y, this.currentMark());
      (this.winner) ? this.round = -1 : this.round++;
    } else {
      throw new Error("Game ended");
    }
  }

  copy(){
    let result = new Game(this.board.size);
    result.board.boardArray = this.board.size;
    result.board.boardArray = [];
    result.round = this.round;
    result.weight = this.weight;
    result.winner = this.winner;
    (this.board.boardArray).map((e)=>(result.board.boardArray).push([...e]));
    return result;
  }
}


