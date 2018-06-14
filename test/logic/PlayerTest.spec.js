describe('Player:', () => {
  let player;
  beforeEach(() => {
    player = new Player("Xerxes", "x");
  });
  it('should have a name field', () => {
    expect(player.name).toBeDefined();
  })
  it('should have a mark field', () => {
    expect(player.mark).toBeDefined();
  })
  it('should have a score field', () => {
    expect(player.score).toBeDefined();
  })
  describe('increaseScore()', () => {
    it('should increase the score by 1 ', () => {
      let origin = player.score;
      player.increaseScore();
      expect(player.score - origin).toEqual(1);
    });
  });
  describe('setName(name)', () => {
    it('should change the name field of the player to the received argument', () => {
      player.setName("Odin");
      expect(player.name).toEqual("Odin");
    });
  });
  describe('setMark(mark)', () => {
    it('should change the mark field of the player to the received argument', () => {
      player.setMark("o");
      expect(player.name).toEqual("o");
    });
  });
})