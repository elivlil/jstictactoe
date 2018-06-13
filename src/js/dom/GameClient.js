class GameClient {
  constructor() {
    this.timer = new Timer();
    this.game = new Game(3);
    this.gameCells = document.getElementsByClassName("game__cell");
    document.getElementsByClassName("game-event")[0].innerHTML =
    `${this.game.currentMark()} is up!`;
  }

  addGameCellListener() {
    for (let i = 0; i < this.gameCells.length; i++) {
      //TODO remove i and use target
      this.gameCells[i].addEventListener("click", (event) => this.putMark(i, event.currentTarget));
    }
  }

  putMark(i, target) {
    let row = target.dataset.row;
    let col = target.dataset.col;
    if (this.game.board.isValidPosition(row, col) && this.game.round>-1) {
      if (this.game.currentMark() === "o") {
        target.innerHTML =
          `<svg>
          <circle cx="50" cy="50" r="40" stroke="#fff" fill="transparent" stroke-width="3"/>
          </svg>`;
        this.game.play(row, col);
      }else{
        target.innerHTML =
          `<svg>
          <line x1="20" x2="80" y1="20" y2="80" stroke="#fff" stroke-width="3"/>
          <line x1="80" x2="20" y1="20" y2="80" stroke="#fff" stroke-width="3"/>
          </svg>`;
        this.game.play(row, col);
      }
    }
    this.writeEvent();
  }

  writeEvent(){
    let event=document.getElementsByClassName("game-event")[0];
    if(this.game.winner){
      this.timer.stopTimer();
      if(this.game.winner==="draw"){
        event.innerHTML = `It's a ${this.game.winner}!`;
      }else{
        event.innerHTML = `${this.game.winner} has won!`;
      }
    }else{
      event.innerHTML = `${this.game.currentMark()} is up!`;
    }  
  }

}
