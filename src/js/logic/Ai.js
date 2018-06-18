class Ai {
  //The AI always plays with o and the player always plays with x.
  constructor(game) {
    this.realGame = game;
  }

  evaluatePosition(game) {
    //this is a recursive function
    if (game.round === -1) {
      return this.getScore(game);
    } else if (game.currentMark() === "o") {
      return this.evalChild(game, -Infinity, Math.max);
    } else {
      return this.evalChild(game, Infinity, Math.min);
    }
  }

  evalChild(game, defaultValue, selectorFunction) {
    let bestValue = defaultValue;
    let iterator = game.board.getEmptyPositions();
    let nextEmptyPosition = iterator.next();
    while (!nextEmptyPosition.done) {
      let x = nextEmptyPosition.value.row;
      let y = nextEmptyPosition.value.col;
      let childGame = game.copy();
      childGame.play(x, y);
      //recursion occurs here
      let childResult = this.evaluatePosition(childGame);
      bestValue = selectorFunction(bestValue, childResult);
      nextEmptyPosition = iterator.next();
    }
    return bestValue;
  }

  getScore(game) {
    if (game.winner === "x") {
      return -10 * game.weight;
    } else if (game.winner === "o") {
      return 10 * (10 - game.weight);
    } else {
      return 0;
    }
  }

  getMove() {
    let iterator = this.realGame.board.getEmptyPositions();
    let moves = [];
    let nextEmptyPosition = iterator.next();
    while (!nextEmptyPosition.done) {
      let x = nextEmptyPosition.value.row;
      let y = nextEmptyPosition.value.col;
      let newGame = this.realGame.copy()
      newGame.play(x, y);
      //calls recursive function
      let val = this.evaluatePosition(newGame);
      moves.push({pos: new Position(x, y), score: val});
      nextEmptyPosition = iterator.next();
    }
    moves.sort((move1, move2) => move2.score - move1.score);
    return moves[0];
  }
}