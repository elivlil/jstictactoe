describe('Board Class', () => {
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
      board.put(0, 0);
      expect(() => board.put(0, 0)).toThrowError(Error, "Invalid position");
    });
  });

  describe('searchWinner(x, y, mark)', () => {
    it('should check if the player has won after putting a mark - case: no win', () => {
      board.put(0, 0);
      let winner = board.searchWinner(0, 0, "x");
      expect(winner).toEqual(null);
    });
    it('should check if the player has won after putting a mark - case: row win', () => {
      board.put(0, 0, "x");
      board.put(0, 1, "x");
      board.put(0, 2, "x");
      let winner = board.searchWinner(0, 2, "x");
      expect(winner).toEqual("x");
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
})