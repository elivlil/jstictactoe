class GameClient {
  constructor() {
    this.playerx = new Player('Player', "x");
    this.playero = new Player('AI', "o");
    this.game = new Game(3);
    this.timer = new Timer();
    this.gameCells = document.getElementsByClassName("game__cell");
    this.gameEvent = document.getElementsByClassName("game-event")[0];
    this.gameScore = document.getElementsByClassName("score")[0];

    this.gameEvent.innerHTML = ``;
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
    if (this.checkGameStatus()) {
      let row = target.dataset.row;
      let col = target.dataset.col;
      try {
        this.game.play(row, col);
        target.innerHTML =
          `<svg>
          <line x1="20" x2="80" y1="20" y2="80" stroke="#fff" stroke-width="3"/>
          <line x1="80" x2="20" y1="20" y2="80" stroke="#fff" stroke-width="3"/>
          </svg>`;
        //Immediately calls Ai player to move
        if (this.checkGameStatus()) {
          let ai = new Ai(this.game);
          let move = ai.getMove();
          let x = move.pos.row;
          let y = move.pos.col;
          this.game.play(x, y);
          this.drawO(this.gameCells[x * 3 + y]);
          // this.writeEvent();
        }
      } catch (e) {
        console.log("Game ended");
      }
      this.writeEvent();
    }

  }

  drawX(target) {
    target.innerHTML =
      `<svg>
          <line x1="20" x2="80" y1="20" y2="80" stroke="#fff" stroke-width="3"/>
          <line x1="80" x2="20" y1="20" y2="80" stroke="#fff" stroke-width="3"/>
          </svg>`;
  }
  drawO(target) {
    target.innerHTML =
      `<svg>
          <circle cx="50" cy="50" r="40" stroke="#fff" fill="transparent" stroke-width="3"/>
          </svg>`;
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
    }
  }

  getPlayerNameMatchingTheMark(mark) {
    if (mark === "x") {
      return this.playerx.name
    } {
      return this.playero.name;
    }
  }

  checkGameStatus() {
    return (this.timer.status === "ON")
  }

  startNewGame() {
    if (!this.checkGameStatus()) {
      this.clearBoard();
      this.game = new Game(3);
      this.timer = new Timer();
      this.gameEvent.innerHTML = ``;
    }
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