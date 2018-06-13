class Player{
  constructor(name, mark){
    this.name = name;
    this.mark = mark;
    this.score = 0;
  }

  increaseScore(){
    this.score++;
  }

  setName(name){
    this.name = name;
  }
  setMark(mark){
    this.name = mark;
  }

  resetScore(){
    this.score=0;
  }
}