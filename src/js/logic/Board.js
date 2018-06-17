class Position {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}

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
    if (this.isValidPosition(x, y)) {
      this.boardArray[x][y] = mark;
      return this.searchWinner(x, y, mark);
    } else {
      throw new Error("Invalid position");
    }
  }

  isValidPosition(x, y) {
    return (x < this.size && y < this.size && 0 <= x && 0 <= y && this.boardArray[x][y] === "-");
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

  boardIsFull() {
    return !(this.boardArray.join().includes("-"));
  }

  checkRowOfArray(x, mark) {
    let i = this.size;
    while (i--) {
      if (this.boardArray[x][i] !== mark) return false;
    }
    return true;
  }

  checkColumnOfArray(y, mark) {
    let i = this.size;
    while (i--) {
      if (this.boardArray[i][y] !== mark) return false;
    }
    return true;
  }

  checkLeftDiagonalOfArray(mark) {
    let i = this.size;
    while (i--) {
      if (this.boardArray[i][i] !== mark) return false;
    }
    return true;
  }

  checkRightDiagonalOfArray(mark) {
    let i = this.size;
    while (i--) {
      if (this.boardArray[this.size - 1 - i][i] !== mark) return false;
    }
    return true;
  }

  * getRows() {
    let i = 0;
    for (let row of this.boardArray) {
      yield {data: row, index: i++, type: 'row'}
    }
  }

  * getCols() {
    let col = 0;
    let row = [];
    for (let i = 0; i < this.size; i++) {
      row.push(this.boardArray[i][col]);
    }
    yield {data: row, index: col++, type: 'col'};
  }

  *getEmptyPositions() {
    let array = this.boardArray.join().split(",");
    let i = 0;
    while (array.indexOf('-', i) >= 0) {
      let index = array.indexOf('-', i);
      yield new Position(Math.floor(index / 3), index % 3);
      i = index+1;
    }
  }
}
