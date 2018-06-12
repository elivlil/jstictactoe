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
      this.gameCells[i].addEventListener("click", () => this.putMark(i));
    }
  }

  putMark(i) {
    //TODO refactor this
    //TODO move the marks into separate functions
    if (this.game.isValidPosition(Math.floor(i / 3), (i) % 3) && !this.game.winner) {
      if (this.game.currentMark() === "o") {
        this.gameCells[i].innerHTML = '<svg>' +
          '<circle cx="50" cy="50" r="40" stroke="#fff" fill="transparent" stroke-width="3"/>' +
          '</svg>';
        this.game.play(Math.floor(i / 3), (i) % 3);
      }else{
        this.gameCells[i].innerHTML = '<svg>' +
          '<line x1="20" x2="80" y1="20" y2="80" stroke="#fff" stroke-width="3"/>' +
          '<line x1="80" x2="20" y1="20" y2="80" stroke="#fff" stroke-width="3"/>' +
          '</svg>';
        this.game.play(Math.floor(i / 3), (i) % 3);
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
