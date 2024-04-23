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

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.state === "Start" || request.message === "create-alarm") {
    const alarm = await chrome.alarms.get("standup");
    console.log("alarm at start", alarm);
    if (!alarm) {
      chrome.alarms.create("standup", { periodInMinutes: 1 });
      chrome.alarms.onAlarm.addListener(onAlarm);
    }
  }
  if (request.message === "stop-alarm" || request.state === "Stop") {
    const alarm = await chrome.alarms.get("standup");
    console.log("alarm at stop", alarm);
    if (alarm) {
      chrome.alarms.clear("standup");
      chrome.alarms.onAlarm.removeListener(onAlarm);
    }
  }
});
