class GameClient {
  constructor() {
    this.playerx = new Player('Xerxes', "x");
    this.playero = new Player('Odin', "o");
    this.game = new Game(3);
    this.timer = new Timer();
    this.gameCells = document.getElementsByClassName("game__cell");
    this.gameEvent = document.getElementsByClassName("game-event")[0];
    this.gameScore = document.getElementsByClassName("score")[0];

    this.gameEvent.innerHTML = `${this.playerx.name} is up!`;
    this.gameScore.innerHTML =
      `<p><strong>${this.playerx.name}:</strong> ${this.playerx.score}</p>
       <p><strong>${this.playero.name}:</strong> ${this.playero.score}</p>`;
  }

  addReplayListener() {
    let replayButton = document.getElementsByClassName("new-round")[0];
    replayButton.addEventListener("click", () => this.startNewGame());
  }

  addGameCellListener() {
    for (let i = 0; i < this.gameCells.length; i++) {
      this.gameCells[i].addEventListener("click", (event) => this.putMark(event.currentTarget));
    }
  }

  putMark(target) {
    this.checkGameStatus();
    let row = target.dataset.row;
    let col = target.dataset.col;
    try {
      let mark = this.game.currentMark();
      this.game.play(row, col);
      this.drawMarkInCell(target,mark);
    } catch (e) {
      console.log('The game has ended.');
    }
    this.writeEvent();
  }
  drawMarkInCell(target,mark){
    if (mark === "o") {
      target.innerHTML =
        `<svg>
          <circle cx="50" cy="50" r="40" stroke="#fff" fill="transparent" stroke-width="3"/>
          </svg>`;
    } else {
      target.innerHTML =
        `<svg>
          <line x1="20" x2="80" y1="20" y2="80" stroke="#fff" stroke-width="3"/>
          <line x1="80" x2="20" y1="20" y2="80" stroke="#fff" stroke-width="3"/>
          </svg>`;
    }
  }

  writeEvent() {
    if (this.game.winner) {
      this.timer.stopTimer();
      if (this.game.winner === "draw") {
        this.gameEvent.innerHTML = `It's a ${this.game.winner}!`;
      } else {
        let name = this.getPlayerNameMatchingTheMark(this.game.winner);
        this.gameEvent.innerHTML = `${name} has won!`;
        this.increaseWinnersScore();
      }
    } else {
      let name = this.getPlayerNameMatchingTheMark(this.game.currentMark());
      this.gameEvent.innerHTML = `${name} is up!`;
    }
  }

  getPlayerNameMatchingTheMark(mark) {
    if (mark === "x") {
      return this.playerx.name
    }
    {
      return this.playero.name;
    }
  }

  checkGameStatus() {
    if (this.timer.status === "OFF") {
      throw new Error("New match has not started yet");
    }
  }

  startNewGame() {
    this.clearBoard();
    this.game = new Game(3);
    this.timer = new Timer();
    this.gameEvent.innerHTML = `${this.playerx.name} is up!`;
  }

  clearBoard() {
    for (let i = 0; i < this.gameCells.length; i++) {
      this.gameCells[i].innerHTML = '';
    }
  }

  increaseWinnersScore() {
    if (this.game.winner === "x") {
      this.playerx.score++;
    } else if (this.game.winner === "o") {
      this.playero.score++;
    }
    this.upDateScore();
  }

  upDateScore() {
    this.gameScore.innerHTML =
      `<p><strong>${this.playerx.name}</strong>: ${this.playerx.score}</p>
       <p><strong>${this.playero.name}</strong>: ${this.playero.score}</p>`;
  }

}
