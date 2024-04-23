let timeEl = document.querySelector(".time");
let time = 60;

const onAlarm = () => {
  chrome.storage.sync.get(["sound"], (result) => {
    if (result.sound === true) {
      const ding = new Audio("sound/notification_sound.mp3");
      ding.volume = 0.7;
      ding.play();
    }
  });
};

onAlarm();

const countdownInterval = () => {
  if (time >= 1) {
    timeEl.textContent = time - 1;
    time = time - 1;
  } else {
    clearInterval(countdownInterval);
    window.close();
  }
};

setTimeout(function () {
  document.querySelector("#popup").remove();
  setInterval(countdownInterval, 1000);
}, 3000);
