describe('Player', () => {
  it('should have a name field', () => {
    let player = new Player("lali");
    expect(player.name).toBeDefined();
  })
  it('should have a mark field', () => {
    let player = new Player("lali","x");
    expect(player.mark).toBeDefined();
  })
  it('should have a score field', () => {
    let player = new Player();
    expect(player.score).toBeDefined();
  })
})