const startStopButton = document.querySelector(".start-button");

chrome.storage.sync.get(["sound"], (result) => {
  if (result.sound === true) {
    document.querySelector("#sound").checked = true;
  }
});

const updateButtonUI = (state) => {
  if (state === "Start") {
    startStopButton.textContent = "Stop";
    startStopButton.classList.add("red");
  } else {
    startStopButton.textContent = "Start";
    if (startStopButton.classList.contains("red")) {
      startStopButton.classList.remove("red");
    }
  }
};

chrome.storage.sync.get(["state"], (result) => {
  updateButtonUI(result.state);
});

const toggleButton = () => {
  chrome.storage.sync.get(["state"], (result) => {
    if (result?.state === "Start" || !result?.state) {
      chrome.storage.sync.set({ state: "Stop" });
      setTimer("Stop");
      updateButtonUI("Stop");
    } else {
      chrome.storage.sync.set({ state: "Start" });
      setTimer("Start");
      updateButtonUI("Start");
    }
  });
};

const setTimer = (buttonState) => {
  console.log("sending to service worker", buttonState);
  chrome.runtime.sendMessage({ state: buttonState });
};

startStopButton.addEventListener("click", toggleButton);

document.querySelector("#sound").addEventListener("change", (e) => {
  chrome.storage.sync.set({ sound: e.target.checked });
});
