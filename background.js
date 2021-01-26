const ding = new Audio('sound/notification_sound.mp3')
ding.volume = 0.7

const checkSound = () => {
  chrome.storage.local.get(["sound"], (result) => {
    if (result.sound === true) {
      ding.play()
    }
  })
}

const onAlarm = () => {
  checkSound()
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
    if (request.state === "Stop") {
      chrome.alarms.clear("standup")
      chrome.alarms.onAlarm.removeListener(onAlarm);
    } else {
      chrome.alarms.create("standup", { periodInMinutes: 60.0 })
      chrome.alarms.onAlarm.addListener(onAlarm);
    }
  }
);




