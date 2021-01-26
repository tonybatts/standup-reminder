if (document.querySelector("#sound").checked === true || document.querySelector("#sound").checked === null) {
  document.querySelector("#sound").checked = true
}

chrome.storage.local.get(["sound"], (result) => {
  if (result.sound === true) {
    document.querySelector("#sound").checked = true
  }
})


chrome.storage.local.get(["state"], (result) => {
  let button = document.querySelector(".start-button")
  if (result.state === "Stop") {
    button.textContent = "Stop"
    button.classList.add("red")
  } else {
    button.textContent = "Start"
    if (button.classList.contains("red")) {
      button.classList.remove("red")
    }
  }
})


const toggleButton = () => {

  chrome.storage.local.get(["state"], (result) => {
    state = result.state

    if (state === "Start" || state === null || state === undefined) {
      button.textContent = "Stop"
      chrome.storage.local.set({ "state": "Stop" })
      button.classList.add("red")
    } else {
      button.textContent = "Start"
      chrome.storage.local.set({ "state": "Start" });
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

document.querySelector("#sound").addEventListener("change", (e) => {
  chrome.storage.local.set({ "sound": e.target.checked })
})

