// on page load check if the alarm should be active and remind the service worker
const checkAlarmState = async () => {
  const alarmState = await chrome.storage.sync.get(["state"]);
  console.log("alarm state at load", alarmState);

  if (alarmState?.state === "Start") {
    chrome.runtime.sendMessage({ message: "create-alarm" });
  }
};

checkAlarmState();
