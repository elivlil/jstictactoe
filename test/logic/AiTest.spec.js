describe('Ai', () => {
  let game;
  let ai;
  beforeEach(() => {
    ai= new Ai();
    game = new Game(3);
    game.play(0,0);game.play(0,1);
    game.play(1,1);game.play(2,2);
    game.play(1,2);
  });
  describe('evaluatePosition(game,x,y)', () => {
    it('should return negative integer if the AI would lose in the scenario', () => {
      expect(ai.evaluatePosition(game,0,2)).toBeLessThan(0);
    });
    it('should return positive integer if the AI would win in the scenario', () => {
      game = new Game(3);
      game.play(0,1);game.play(0,0);
      game.play(1,2);game.play(1,1);
      game.play(0,2);
      expect(ai.evaluatePosition(game,2,2)).toBeGreaterThan(0);
    });
    it('should return zero if the match cannot be evaluated in the scenario', () => {
      expect(ai.evaluatePosition(game,1,0)).toEqual(0);
    });
  });
})