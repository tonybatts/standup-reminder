// when the alarm fires show a popup with a countdown timer to tell the user to stand up for 60 seconds
const onAlarm = () => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
    chrome.windows.create({
      url: "timer.html",
      type: "popup",
      height: 180,
      width: 180
    });
  });
};

// when the service worker launches or "wakes up" attach the listener so the alarm is fired
// NOTE: if we don't do this at the top level then the alarm does not work if the periodInMinutes is over 30 seconds
chrome.alarms.onAlarm.addListener(onAlarm);

chrome.runtime.onMessage.addListener(async (request) => {
  // upsert alarm
  if (request.state === "Start" || request.message === "create-alarm") {
    const alarm = await chrome.alarms.get("standup");
    if (!alarm) {
      chrome.alarms.create("standup", { periodInMinutes: 60 });
    }
  }
  // remove alarm
  if (request.message === "stop-alarm" || request.state === "Stop") {
    const alarm = await chrome.alarms.get("standup");
    if (alarm) {
      chrome.alarms.clearAll();
    }
  }
});
