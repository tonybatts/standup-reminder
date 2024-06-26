const startStopButton = document.querySelector(".start-button");

// when the pop up opens set the checkbox state
chrome.storage.sync.get(["sound"], (result) => {
  if (result.sound === true) {
    document.querySelector("#sound").checked = true;
  }
  document.querySelector(".switch").classList.add("show");
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

// when the pop up is opened set the button styles based on the saved alarm state
chrome.storage.sync.get(["state"], (result) => {
  updateButtonUI(result.state);
});

// when the pop up is opened set the button styles based on the saved alarm state
chrome.storage.sync.get(["time"], (result) => {
  const timeEl = document.querySelector("time");
  chrome.storage.sync.get(["state"], (result) => {
    if (result.state === "Stop") {
      timeEl.classList.add("disabled");
    }
  });
  timeEl.textContent = result.time ?? 60;
  timeEl.classList.add("show");
});

// toggles the button between "Start" and "Stop" states
const toggleButton = () => {
  chrome.storage.sync.get(["state"], (result) => {
    if (result?.state === "Start") {
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

// tells the service worker to either remove the current alarm, or create a new one
const setTimer = (buttonState) => {
  chrome.runtime.sendMessage({ state: buttonState });
};

startStopButton.addEventListener("click", toggleButton);

// update the saved user selection of having a sound on or off for the alarm
document.querySelector("#sound").addEventListener("change", (e) => {
  chrome.storage.sync.set({ sound: e.target.checked });
});

chrome.storage.sync.onChanged.addListener((changes, namespace) => {
  if (changes.time?.newValue) {
    document.querySelector("time").textContent = changes.time.newValue;
  }
  if (changes.state?.newValue === "Stop") {
    document.querySelector("time").classList.add("disabled");
  }
  if (changes.state?.newValue === "Start") {
    document.querySelector("time").classList.remove("disabled");
  }
});
