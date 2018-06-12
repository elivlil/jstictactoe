window.onload = function main() {
  const gameClient = new GameClient();
  gameClient.addGameCellListener();
  createResetButton();
};