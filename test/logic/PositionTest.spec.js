describe('Position:', () => {
  let position;
  beforeEach(() => {
    position = new Position(2, 3);
  });
  describe('constuctor', () => {
    it('create a row and column field with given parameters', () => {
      expect(position.row).toEqual(2);
      expect(position.col).toEqual(3);
    });
  });
})