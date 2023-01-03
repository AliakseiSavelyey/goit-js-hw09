const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body');
let interval;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  startBtn.style.backgroundColor = 'green';
  interval=setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(interval);
  startBtn.disabled = false;
  startBtn.style.backgroundColor = 'white';
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};