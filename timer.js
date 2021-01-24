let timeEl = document.querySelector(".time")
let time = 61

let interval = function () {
  if (time >= 1) {
    timeEl.textContent = time - 1
    time = time - 1
  } else {
    clearInterval(interval)
    window.close()
  }
}

setInterval(interval, 1000);