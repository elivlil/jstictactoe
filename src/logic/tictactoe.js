const readline = require('readline');

class Game{
  constructor(size){
    this.board = new Board(size);
    this.round = 0;
    this.winner = null;
  }

  currentMark(){
    if(this.round&1){
      return "o"
    }else{
      return "x"
    }
  }

  play(x,y){
    x--;y--;
    if(!(this.winner)&&this.winner!="draw"){
      if(this.isValidPosition(x,y)){
        this.board.put(x,y,this.currentMark());
        console.log("\n\tRound ",this.round);
        this.board.show();
        if(!this.winner)this.winner = this.board.searchWinner(x,y,this.currentMark());
        this.displayWinner();
        (this.winner)?this.round=-1:this.round++;
      }else{
        console.log("Invalid position");
      }
    }else{
      console.log("Game has ended");
    }
  }

  isValidPosition(x,y){
    if(x<this.board.size && y<this.board.size && 0<=x && 0<=y && this.board.board[x][y]==="-"){
      return true;
    }else{
      return false;
    }
  }

  displayWinner(){
    this.winner?console.log("\n\tWinner: ",this.winner):console.log("\n\tNo winner")
  }
}

class Board{
  constructor(size) {
    this.size = size;
    this.board = [];
    while(size--) this.board.push([]);
    for(let i=0;i<this.size;i++){
      for(let j=0;j<this.size;j++){
        this.board[i][j]="-";
      }
    }
  }

  searchWinner(x,y,mark){
    if(this.checkRowOfArray(x,mark) ||
      this.checkColumnOfArray(y,mark) ||
      this.checkLeftDiagonalOfArray(mark)||
      this.checkRightDiagonalOfArray(mark)){
      return mark;
    }else if(this.boardIsFull()){
      return "draw";
    }
    return null;
  }

  put(x,y,mark){
    this.board[x][y] = mark;
  }

  show(){
    let res="";
    for(let i=0;i<this.size;i++){
      res+="\n\t ";
      for(let j=0;j<this.size;j++){
        res+=this.board[i][j]+" ";
      }
    }
    console.log(res);
  }

  boardIsFull(){
    for(let i=0;i<this.size;i++){
      for(let j=0;j<this.size;j++){
        if(this.board[i][j]==="-") return false;
      }
    }
    return true;
  }

  checkRowOfArray(x,mark){
    let i = this.size;
    while(i--){
      if(this.board[x][i]!==mark) return null;
    }
    return mark;
  }

  checkColumnOfArray(y,mark){
    let i = this.size;
    while(i--){
      if(this.board[i][y]!==mark) return null;
    }
    return mark;
  }

  checkLeftDiagonalOfArray(mark){
    let i = this.size;
    while(i--){
      if(this.board[i][i]!==mark) return null;
    }
    return mark;
  }

  checkRightDiagonalOfArray(mark){
    let i = this.size;
    while(i--){
      if(this.board[this.size-1-i][i]!==mark) return null;
    }
    return mark;
  }
}

class Client{
  constructor(){
    this.game = new Game(5);
  }

  parseInput(input){
    let arr = input.split("");
    arr[0] = parseInt(arr[0]);
    arr[1] = parseInt(arr[1]);
    return arr;
  }

  run(){
    const read = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    read.on('line', (input) => {
      if(input==="exit" || this.game.round===-1){
        read.close();
      }else{
        let coords = this.parseInput(input);
        if(coords.length === 2){
          this.game.play(coords[0],coords[1]);
          console.log("Enter your move:", this.game.round);
        }else{
          console.log("Enter two numbers, example: 23");
        }
      }
    });
  }
}

new Client().run();
