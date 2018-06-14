function createResetButton() {
  let reset = document.getElementsByClassName("reset")[0];
  reset.addEventListener("click", function () {
    location = location;
  });
}

function addWindowCloseListener(){
	let closebtn = document.getElementsByClassName("close-btn")[0];
	closebtn.addEventListener("click", () => window.close());
}