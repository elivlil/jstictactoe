describe('Game:', () => {
  let game;
  beforeEach(() => {
    game = new Game(3);
  });
  it('should have board field initialized', () => {
    expect(game.board).toBeDefined();
  });
  it('should have winner field initialized', () => {
    expect(game.winner).toBeDefined();
  });
  it('should have round field initialized to 0', () => {
    expect(game.round).toEqual(0);
  });
  describe('currentMark()', () => {
    it('should return x when the the number of rounds in the current game is even', () => {
      game.round = 2132138;
      expect(game.currentMark()).toEqual("x");
    });
    it('should return o when the the number of rounds in the current game is odd', () => {
      game.round = 2132131;
      expect(game.currentMark()).toEqual("o");
    });
  });
  describe('play(x, y)', () => {
    it('should put x first when the game starts', () => {
      game.play(0,0);
      expect(game.board.boardArray[0][0]).toEqual("x");
    });
    it('should alternate the players, so when someone places an x the next mark should be o', () => {
      game.play(0,0);
      expect(game.currentMark()).toEqual("o");
    });
    it('should throw error when placing is attempted in a game that has already ended', () => {
      game.play(0,0);game.play(0,1);
      game.play(1,1);game.play(1,2);
      game.play(2,2);//x wins
      expect(() => game.play(2,1)).toThrowError(Error, "Game ended");
    })
    it('should increment the rounds by one when there is no winner', () => {
      let roundBefore = game.round;
      game.play(0,0);
      expect(game.round-roundBefore).toEqual(1);
    });
    it('should set the rounds to -1 when the game ends', () => {
      game.play(0, 0);game.play(1, 0);
      game.play(0, 1);game.play(1, 1);
      game.play(1, 2);game.play(0, 2);
      game.play(2, 0);game.play(2, 2);
      game.play(2, 1);
      expect(game.round).toEqual(-1);
    });
  });
});