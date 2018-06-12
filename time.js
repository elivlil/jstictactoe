const start = new Date().getTime();
setInterval(()=>{
    let now = new Date().getTime();
    let distance = now - start;
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);  
    document.getElementsByClassName("timer")[0].innerHTML = minutes + "m " + seconds + "s ";
}, 1000);