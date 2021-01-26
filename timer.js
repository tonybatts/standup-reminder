let timeEl = document.querySelector(".time")
let time = 60



let interval = function () {
  if (time >= 1) {
    timeEl.textContent = time - 1
    time = time - 1
  } else {
    clearInterval(interval)
    window.close()
  }
}

setTimeout(function () {
  document.querySelector("#popup").remove()
  setInterval(interval, 1000);
}, 3000);
