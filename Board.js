class Board {
  constructor(size) {
    this.size = size;
    this.board = [];
    while (size--) this.board.push([]);
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.board[i][j] = "-";
      }
    }
    this.show();
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

  put(x, y, mark) {
    this.board[x][y] = mark;
  }

  show() {
    let res = "";
    for (let i = 0; i < this.size; i++) {
      res += "\n\t ";
      for (let j = 0; j < this.size; j++) {
        res += this.board[i][j] + " ";
      }
    }
    console.log(res);
  }

  boardIsFull() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j] === "-") return false;
      }
    }
    return true;
  }

  checkRowOfArray(x, mark) {
    let i = this.size;
    while (i--) {
      if (this.board[x][i] !== mark) return null;
    }
    return mark;
  }

  checkColumnOfArray(y, mark) {
    let i = this.size;
    while (i--) {
      if (this.board[i][y] !== mark) return null;
    }
    return mark;
  }

  checkLeftDiagonalOfArray(mark) {
    let i = this.size;
    while (i--) {
      if (this.board[i][i] !== mark) return null;
    }
    return mark;
  }

  checkRightDiagonalOfArray(mark) {
    let i = this.size;
    while (i--) {
      if (this.board[this.size - 1 - i][i] !== mark) return null;
    }
    return mark;
  }
}
