let timeinterval = null;
let endtime = localStorage.getItem("date");
if (endtime !== null) {
  initializeClock(endtime);
}

function formatDate() {
  let inputDate = document.querySelector("#date");
  let dateNow = Date.now();
  let endtime = inputDate.value;
  if (inputDate.valueAsNumber > dateNow) {
    localStorage.setItem(`date`, `${endtime}`);
    reset();
    initializeClock(endtime);
  }
  else {
    alert("It's too early!")
    return;
  }
}

function getTimeRemaining(endtime) {
  let t = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function initializeClock(endtime) {
  function updateClock() {
    const t = getTimeRemaining(endtime);
    document.querySelector(".timer__days").innerHTML = t.days;
    document.querySelector(".timer__hours").innerHTML = ("0" + t.hours).slice(-2);
    document.querySelector(".timer__minutes").innerHTML = ("0" + t.minutes).slice(-2);
    document.querySelector(".timer__seconds").innerHTML = ("0" + t.seconds).slice(-2);
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  timeinterval = setInterval(updateClock, 1000);
}

function reset() {
  clearInterval(timeinterval);
}