chrome.storage.local.get(["state"], (result) => {
  let button = document.querySelector(".start-button")
  if (result.state === "STOP") {
    button.textContent = "STOP"
    button.classList.add("red")
  } else {
    button.textContent = "START"
    if (button.classList.contains("red")) {
      button.classList.remove("red")
    }
  }
})


const toggleButton = () => {

  chrome.storage.local.get(["state"], (result) => {
    state = result.state

    if (state === "START" || state === null || state === undefined) {
      button.textContent = "STOP"
      chrome.storage.local.set({ "state": "STOP" });
      button.classList.add("red")
    } else {
      button.textContent = "START"
      chrome.storage.local.set({ "state": "START" });
      if (button.classList.contains("red")) {
        button.classList.remove("red")
      }
    }
  })


}

const setTimer = (buttonState) => {
  chrome.runtime.sendMessage({ state: buttonState })
  chrome.runtime.getBackgroundPage(function (backgroundPage) {
    console = backgroundPage.console;
  })
}


let button = document.querySelector(".start-button")
button.addEventListener("click", () => {
  toggleButton()
  button = document.querySelector("button")
  setTimer(button.textContent)
})