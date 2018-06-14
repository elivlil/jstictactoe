describe('Board:', () => {
  let board;
  beforeEach(() => {
    board = new Board(3);
  });
  it('should create a 3x3 array filled up with "-"', () => {
    const emptyBoardArray = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"]
    ];
    expect(board.boardArray).toEqual(emptyBoardArray);
  });

  describe('put(x, y, mark)', () => {
    it('should throw an error when row and column coordinates are out of bound [0,3]', () => {
      expect(() => board.put(4, 0,"x")).toThrowError(Error, "Invalid position");
    });
    it('should throw an error when the selected cell is not empty', () => {
      board.put(0, 0,"x");
      expect(() => board.put(0, 0,"o")).toThrowError(Error, "Invalid position");
    });
  });

  describe('searchWinner(x, y, mark)', () => {
    it('should check if the player has won after putting a mark - case: no win', () => {
      board.put(0, 0, "x");
      let winner = board.searchWinner(0, 0, "x");
      expect(winner).toEqual(null);
    });
    it('should check if the player has won after putting a mark - case: row win', () => {
      board.put(0, 0, "x");
      board.put(0, 1, "x");
      board.put(0, 2, "x");
      let winner = board.checkRowOfArray(0, "x");
      expect(winner).toEqual(true);
    });
    it('should check if the player has won after putting a mark - case: column win', () => {
      board.put(0, 0, "x");
      board.put(1, 0, "x");
      board.put(2, 0, "x");
      let winner = board.searchWinner(2, 0, "x");
      expect(winner).toEqual("x");
    });
    it('should check if the player has won after putting a mark - case: left diagonal win', () => {
      board.put(0, 0, "x");
      board.put(1, 1, "x");
      board.put(2, 2, "x");
      let winner = board.searchWinner(2, 2, "x");
      expect(winner).toEqual("x");
    });
    it('should check if the player has won after putting a mark - case: right diagonal win', () => {
      board.put(0, 2, "x");
      board.put(1, 1, "x");
      board.put(2, 0, "x");
      let winner = board.searchWinner(0, 0, "x");
      expect(winner).toEqual("x");
    });
    it('should end with draw when the board is filled and no player has won the game', () => {
      board.put(0, 0, "x");board.put(1, 0, "o");
      board.put(0, 1, "x");board.put(1, 1, "o");
      board.put(1, 2, "x");board.put(0, 2, "o");
      board.put(2, 0, "x");board.put(2, 2, "o");
      board.put(2, 1, "x");
      let winner = board.searchWinner(0, 0, "x");
      expect(winner).toEqual("draw");
    });
  });
  describe('isValidPosition(x, y)', () => {
    it('should return false when called with x coordinate that is out of upper-bound', () => {
      expect(board.isValidPosition(4, 0)).toBe(false);
    });
    it('should return false when called with x coordinate that is out of lower-bound', () => {
      expect(board.isValidPosition(-1, 0)).toBe(false);
    });
    it('should return false when called with y coordinate that is out of upper-bound', () => {
      expect(board.isValidPosition(0, 4)).toBe(false);
    });
    it('should return false when called with y coordinate that is out of lower-bound', () => {
      expect(board.isValidPosition(0, -1)).toBe(false);
    });
    it('should return false when called with coordinate that points to and occupied position', () => {
      board.put(0,0,"x");
      expect(board.isValidPosition(0, 0)).toBe(false);
    });
    it('should return true when called with valid coordinates', () => {
      expect(board.isValidPosition(0, 0)).toBe(true);
    });
  });
  describe('boardIsFull()', () => {
    it('should return true when the board is full', () => {
      board.put(0, 0, "x");board.put(1, 0, "o");
      board.put(0, 1, "x");board.put(1, 1, "o");
      board.put(1, 2, "x");board.put(0, 2, "o");
      board.put(2, 0, "x");board.put(2, 2, "o");
      board.put(2, 1, "x");
      expect(board.boardIsFull()).toBe(true);
    });
    it('should return false when the board is not full yet', () => {
      board.put(0, 0, "x");board.put(1, 0, "o");
      board.put(0, 1, "x");board.put(1, 1, "o");
      board.put(1, 2, "x");board.put(0, 2, "o");
      board.put(2, 0, "x");
      expect(board.boardIsFull()).toBe(false);
    });
  });
  describe('checkRowOfArray(x, mark)', () => {
    it('should return false if the xth row does not contain three of the given mark', () => {
      board.put(0, 0, "x");
      board.put(0, 1, "o");
      board.put(0, 2, "x");
      expect(board.checkRowOfArray(0, "x")).toBe(false);
    });
    it('should return true if the xth row contains three of the given mark', () => {
      board.put(0, 0, "x");
      board.put(0, 1, "x");
      board.put(0, 2, "x");
      expect(board.checkRowOfArray(0, "x")).toBe(true);
    });
  });
  describe('checkColumnOfArray(y, mark)', () => {
    it('should return false if the yth column does not contain three of the given mark', () => {
      board.put(0, 0, "x");
      board.put(1, 0, "o");
      board.put(2, 0, "x");
      expect(board.checkColumnOfArray(0, "x")).toBe(false);
    });
    it('should return true if the yth column contains three of the given mark', () => {
      board.put(0, 0, "x");
      board.put(1, 0, "x");
      board.put(2, 0, "x");
      expect(board.checkColumnOfArray(0, "x")).toBe(true);
    });
  });
  describe('checkLeftDiagonalOfArray(mark)', () => {
    it('should return false if the diagonal does not contain three of the given mark', () => {
      board.put(0, 0, "x");
      board.put(1, 1, "o");
      board.put(2, 2, "x");
      expect(board.checkLeftDiagonalOfArray("x")).toBe(false);
    });
    it('should return true if the diagonal contains three of the given mark', () => {
      board.put(0, 0, "x");
      board.put(1, 1, "x");
      board.put(2, 2, "x");
      expect(board.checkLeftDiagonalOfArray("x")).toBe(true);
    });
  });
  describe('checkRightDiagonalOfArray(mark)', () => {
    it('should return false if the backwards-diagonal does not contain three of the given mark', () => {
      board.put(0, 2, "x");
      board.put(1, 1, "o");
      board.put(2, 0, "x");
      expect(board.checkRightDiagonalOfArray("x")).toBe(false);
    });
    it('should return true if the backwards-diagonal contains three of the given mark', () => {
      board.put(0, 2, "x");
      board.put(1, 1, "x");
      board.put(2, 0, "x");
      expect(board.checkRightDiagonalOfArray("x")).toBe(true);
    });
  });
  describe('getRows()', () => {
    it('should return the first row of the board', () => {
      board.boardArray=[['x','o','-'],['x','-','-'],['-','-','-']];
      let rowIterator = board.getRows();
      const next = rowIterator.next();
      expect(next.value).toEqual({data:['x','o','-'], index:0, type:'row'});
      expect(next.done).toBe(false);
    });
  });
  describe('getCols()', () => {
    it('should return the first col of the board', () => {
      board.boardArray=[['x','o','-'],['x','-','-'],['-','-','-']];
      let colIterator = board.getCols();
      const next = colIterator.next();
      expect(next.value).toEqual({data:['x','x','-'], index:0, type:'col'});
      expect(next.done).toBe(false);
    });
  });
})
