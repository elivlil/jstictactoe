describe('Ai:', () => {
  let game;
  let ai;
  beforeEach(() => {
    game = new Game(3);
  });
  describe('evaluatePosition(game,x,y)', () => {
    it('should return -10 if Ai loses in any child scenario', () => {
      game.play(0, 2);
      game.play(0, 0);
      game.play(0, 1);
      game.play(1, 1);
      game.play(1, 0);
      game.play(2, 0);
      game.play(2, 2);
      game.play(2, 1);
      ai = new Ai(game);
      expect(ai.evaluatePosition(game)).toEqual(-10);
    });
    it('should return 0 if the AI would draw in all child scenarios', () => {
      game.play(0, 2);
      game.play(0, 0);
      game.play(0, 1);
      game.play(1, 1);
      game.play(1, 0);
      game.play(2, 0);
      game.play(2, 2);
      game.play(1, 2);
      ai = new Ai(game);
      expect(ai.evaluatePosition(game)).toEqual(0);
    });
    it('should return 10 if the AI would win in any child scenarios', () => {
      game.play(0, 1);
      game.play(0, 0);
      game.play(1, 0);
      game.play(1, 1);
      game.play(1, 2);
      game.play(2, 0);
      game.play(2, 2);
      ai = new Ai(game);
      expect(ai.evaluatePosition(game)).toEqual(10);
    });
  });
  describe('getMove()', () => {
    it('should return a Position instance that is the most optimal move based on evaluatePosition() rules', () => {
      game.play(0, 2);
      game.play(0, 0);
      game.play(0, 1);
      game.play(1, 1);
      game.play(1, 0);
      game.play(2, 0);
      game.play(2, 2);
      ai = new Ai(game);
      aiMove = ai.getMove();
      console.log(aiMove);
      expect(aiMove.pos.row).toEqual(1);
      expect(aiMove.pos.col).toEqual(2);
    });
  });
})