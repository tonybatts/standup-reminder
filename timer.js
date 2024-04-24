let timeEl = document.querySelector(".time");
let time = 60;

// when the alarm fires if the user has selected to have sound on play the alarm chime
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

// show a countdown from 60 to 0
const countdownInterval = () => {
  if (time >= 1) {
    timeEl.textContent = time - 1;
    time = time - 1;
  } else {
    // once countdown reaches 0 cleanup and close the window
    clearInterval(countdownInterval);
    window.close();
  }
};

setTimeout(function () {
  document.querySelector("#popup").remove();
  setInterval(countdownInterval, 1000);
}, 3000);
