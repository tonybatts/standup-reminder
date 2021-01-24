const onAlarm = () => {
  chrome.windows.create({
    url: "timer.html",
    type: "popup",
    height: 180,
    width: 180
  });
}

chrome.runtime.onMessage.addListener(
  function (request) {
    console.log(request.state)
    if (request.state === "STOP") {
      chrome.alarms.clear("standup")
      chrome.alarms.onAlarm.removeListener(onAlarm);
    } else {
      chrome.alarms.create("standup", { periodInMinutes: 60.0 })
      chrome.alarms.onAlarm.addListener(onAlarm);
    }
  }
);




