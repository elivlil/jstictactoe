class Board {
  constructor(size) {
    this.size = size;
    this.boardArray = [];

    while (size--) this.boardArray.push([]);
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.boardArray[i][j] = "-";
      }
    }
  }

  put(x, y, mark) {
    if(this.isValidPosition(x, y)){
      this.boardArray[x][y] = mark;
      return this.searchWinner(x, y, mark);
    }else{
      throw new Error("Invalid position");
    }
  }

  searchWinner(x, y, mark) {
    if (this.checkRowOfArray(x, mark) ||
      this.checkColumnOfArray(y, mark) ||
      this.checkLeftDiagonalOfArray(mark) ||
      this.checkRightDiagonalOfArray(mark)) {
      return mark;
    } else if (this.boardIsFull()) {
      return "draw";
    }
    return null;
  }

  isValidPosition(x, y) {
    return (x < this.size && y < this.size && 0 <= x && 0 <= y && this.boardArray[x][y] === "-");
  }

  boardIsFull() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        //TODO refactor this with contains
        if (this.boardArray[i][j] === "-") return false;
      }
    }
    return true;
  }

  checkRowOfArray(x, mark) {
    let i = this.size;
    while (i--) {
      if (this.boardArray[x][i] !== mark) return null;
    }
    return mark;
  }

  checkColumnOfArray(y, mark) {
    let i = this.size;
    while (i--) {
      if (this.boardArray[i][y] !== mark) return null;
    }
    return mark;
  }

  checkLeftDiagonalOfArray(mark) {
    let i = this.size;
    while (i--) {
      if (this.boardArray[i][i] !== mark) return null;
    }
    return mark;
  }

  checkRightDiagonalOfArray(mark) {
    let i = this.size;
    while (i--) {
      if (this.boardArray[this.size - 1 - i][i] !== mark) return null;
    }
    return mark;
  }
}
