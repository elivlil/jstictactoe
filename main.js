window.onload = function main() {
  const gameClient = new GameClient();
  gameClient.addGameCellListener();
  gameClient.addReplayListener();
  createResetButton();
};