class Ai {
  constructor(game){
    this.emptyPositionIterator = null;//game.getEmptyPositions()
  }

  resetIterator(game) {
    this.emptyPositionIterator = game.getEmptyPositions();
  }

  evaluatePosition(game,x,y){

  }


  putMark(game) {
    this.evaluatePosition(game.board.boardArray)
  }
}
