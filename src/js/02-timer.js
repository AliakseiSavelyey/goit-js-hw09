import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const wdays = document.querySelector('[data-days]');
const whours = document.querySelector('[data-hours]');
const wminutes = document.querySelector('[data-minutes]');
const wseconds = document.querySelector('[data-seconds]');
let selectedTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      alert('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      selectedTime=selectedDates[0];
    }
  },
};
flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

class Timer {
  constructor() {
    this.timerID = null;
    this.isActive = false;
    // startBtn.disabled = true;
  }

  startTimer() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.timerID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      const componentsTimer = convertMs(deltaTime);
      this.updateComponentsTimer(componentsTimer);
      if (deltaTime <= 0) {
        this.stopTimer();
      }
    }, 1000);
  }
  updateComponentsTimer({ days, hours, minutes, seconds }) {
    wdays.textContent = days;
    whours.textContent = hours;
    wminutes.textContent = minutes;
    wseconds.textContent = seconds;
  }

  stopTimer() {
    clearInterval(this.timerID);
  }
}
const timer = new Timer();
flatpickr(input, options);
startBtn.addEventListener('click', () => timer.startTimer());