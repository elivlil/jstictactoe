class Timer {
  constructor() {
    this.start = new Date().getTime();
    this.timer = this.startTimer();
    this.status = "ON";
  }

  startTimer() {
    return setInterval(() => {
      let now = new Date().getTime();
      let diff = now - this.start;
      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((diff % (1000 * 60)) / 1000);
      document.getElementsByClassName("timer")[0].innerHTML = minutes + "m " + seconds + "s ";
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.status = "OFF";
  }
}