function createResetButton() {
  let reset = document.getElementsByClassName("reset")[0];
  reset.addEventListener("click", function () {
    location = location;
  });
}
