describe('Game', () => {
  describe('play(x, y)', () => {
    let game;
    beforeEach(() => {
      game = new Game(3);
    });
    it('should put x first when the game starts', () => {
      game.play(0,0);
      expect(game.board.boardArray[0][0]).toEqual("x");
    });
    it('should alternate the players, so when someone places an x the next mark should be o', () => {
      game.play(0,0);
      expect(game.currentMark()).toEqual("o");
    });
    it('should stop placing marks when the game has ended', () => {
      game.play(0,0);game.play(0,1);
      game.play(1,1);game.play(1,2);
      game.play(2,2);//x wins
      expect(() => game.play(2,1)).toThrowError(Error, "Game ended");
    })
  });
});