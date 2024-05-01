// when the alarm fires show a popup with a countdown timer to tell the user to stand up for 60 seconds
const onAlarm = () => {
  chrome.storage.sync.get(['time'], (result) => {
    // when 60 mins are up show the stand up reminder
    if (result.time === 0) {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tab) => {
        chrome.windows.create({
          url: 'timer.html',
          type: 'popup',
          height: 180,
          width: 180,
        });
      });
      // reset the time left indicator in the popup
      chrome.storage.sync.set({ time: 60 });
    }
    // decrement the time left indicator every minute
    if (result.time > 0) {
      chrome.storage.sync.set({ time: result.time - 1 });
    }
  });
};

// when the service worker launches or "wakes up" attach the listener so the alarm is fired
// NOTE: if we don't do this at the top level then the alarm does not work if the periodInMinutes is over 30 seconds
chrome.alarms.onAlarm.addListener(onAlarm);

const upsertAlarm = async () => {
  const alarm = await chrome.alarms.get('standup');
  if (!alarm) {
    chrome.alarms.create('standup', { periodInMinutes: 1 });
    chrome.storage.sync.set({ time: 60 });
  }
};

chrome.runtime.onMessage.addListener(async (request) => {
  // upsert alarm
  if (request.state === 'Start' || request.message === 'create-alarm') {
    upsertAlarm();
  }
  // remove alarm
  if (request.message === 'stop-alarm' || request.state === 'Stop') {
    const alarm = await chrome.alarms.get('standup');
    if (alarm) {
      chrome.alarms.clearAll();
      chrome.storage.sync.set({ time: 60 });
    }
  }
});

// when the users machine wakes up or is turned on check if the alarm is still on if it should be
chrome.idle.onStateChanged.addListener(async (newState) => {
  if (newState === 'active') {
    const result = await chrome.storage.sync.get(['state']);

    if (result.state === 'Start') {
      upsertAlarm();
    }
  }
});
