// Метод window.setTimeout(callback, delay, args)
// setTimeout:
// вызывает определенную функцию через определенное время
// const logMessage = () => {
// console.log('лог при вызове callback-функции через 3 секи');
// };
// console.log('до вызова setTimeout');
// setTimeout(() => {
//   console.log('Внутри callback для setTimeout');
// }, 2000);
// console.log('После вызова setTimeout');

// ===
// останавливаем setTimeout
// const logger = time => {
//   console.log(`лог через ${time}ms, потому что не отменили таймаут`);
// };
// const timerId = setTimeout(logger, 2000, 2000);
// console.log(timerId);

// const shouldCancelTimer = Math.random() > 0.3;
// console.log(shouldCancelTimer);

// if (shouldCancelTimer) {
//   clearTimeout(timerId);
// }

// ======================================================
// Метод setInterval(callback, delay, args)
// -вызывает функцию с переодичностью в какое то время, пока не отменишь его
// const logger = time => console.log(`Лог каждые${time}ms - ${Date.now()}`);
// console.log('До вызова setInterval');
// setInterval(logger, 2000, 2000);
// console.log('После вызова setInterval');

// ===
// Останавливаем интервал с clearInterval(intervalId)
// const intervalId = setInterval(logger, 2000, 2000);
// const shouldCancelInterval = Math.random() > 0.3;
// console.log(shouldCancelInterval);
// if (shouldCancelInterval) {
//   clearInterval(intervalId)
// }

// ============================================================
// Уведомлялка
// -Показываем и скрываем добавляя\удаляя класс is-visible
// -Скрываем через определенное время
// -Скрываем при клике
// -Не забываем чистить таймер

// const NOTIFICATION_DELAY = 3000;
// let timeoutId = null;
// const refs = {
//   notification: document.querySelector('.js-alert'),
// };
// refs.notification.addEventListener('click', onNotificationClick);
// showNotification();

// // Функции:
// function onNotificationClick() {
//   hideNotification();
//   // очищаем setTimeout если был клик по уведомлялке
//   clearTimeout(timeoutId);
// }

// function showNotification() {
//   refs.notification.classList.add('is-visible');

//   timeoutId=setTimeout(() => {
//     console.log('закрываем автоматически, если не было клика');
//     // --закрываем уведомлялку автоматически через 3секи
//     hideNotification();
//   }, NOTIFICATION_DELAY);
// };
// // --функция закрытия уведомлялки
// function hideNotification() {
//   refs.notification.classList.remove('is-visible');
// };

// ===========================================================
// ===Модальное окно надоедалки через интервал
// import BSN from 'bootstrap.native';
// const refs = {
//   modal: document.querySelector('.modal'),
//   subscribeBtn:document.querySelector('.btn-primary'),
// };
// let promptCounter = 0;
// let hasSubscribed = false;
// const PROMPT_DELAY = 1000;
// const MAX_PROMPT_ATTEMPTS = 3;
// const modal = new BSN.Modal('.modal');

// // открываем модалку при открытии страницы
// openModal();
// // hide.bs.modal событие с бутстрапа для модалки
// refs.modal.addEventListener('hide.bs.modal', () => {
//   openModal()
// })
// // при клике на подписаться, делаем переменную тру и закрываем окно
// refs.subscribeBtn.addEventListener('click', () => {
//   hasSubscribed = true;
//   modal.hide();

// })
// // если достигли лимита открытий модалки или переменная тру, то ретерн и больше не открываем
// function openModal() {
//   if (promptCounter === MAX_PROMPT_ATTEMPTS || hasSubscribed) {
//     return;
//   }
//     setTimeout(() => {
//       console.log('открываем надоедалку');
//       modal.show();
//       promptCounter += 1;
//     }, PROMPT_DELAY);
// }

// ===Надоедалка
// let promptCounter = 0;
// let hasSubscribed = false;

// const intervalId=setInterval(() => {
//   if (promptCounter === MAX_PROMPT_ATTEMPTS || hasSubscribed) {
//     console.log('нужно оставновить интервал');
//     clearInterval(intervalId);
//     // --ретерн тут нужен что бы функция остановилась
//     return;
//   }
//     console.log('PODPISHIS-' + Date.now());
//   promptCounter += 1;
// }, PROMPT_DELAY);

// ==============================================================
// Дата и время
// -Создание
// -Unix-время
// -Методы
// -Разница времени
// -Date.now()

// // Unix-время это точка отсчета от которой компьютеры считают время 1 января 1970года 00:00
// const date = new Date();
// console.log(date.getTime());

// ищем разницу во времени, запоминаем одно время, потом вызываем функцию и запоминаем второе время и записываем эти данные
// const date1 = Date.now();
// setTimeout(() => {
//   const date2 = Date.now();
//   console.log(date2 - date1);
// },3000)

// ============================================================
// Делаем Таймер
const refs = {
  startBtn: document.querySelector('button[data-action-start]'),
  stopBtn: document.querySelector('button[data-action-stop]'),
  clockface: document.querySelector('.js-clockface'),
};

// const timer = {
//   intervalId: null,
//   isActive: false,
//   start() {
//     if (this.isActive) {
//       return;
//     }
//     const startTime = Date.now();
//     this.isActive = true;
//     // Вызываем запланированную функцию каждый раз с интервалом в 1секу
//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       // получаем разницу во времени
//       const deltaTime = currentTime - startTime;

//       // получаем время в функции getTimeComponents которая возвращает время в своем формате
//       const time = getTimeComponents(deltaTime);

//       // через функцию updateClockface которая деструктуризирует и выводит время в формате который нам нужен и рисует нам интерфейс
//       updateClockface(time);
//     }, 1000);
//   },
//   stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//   },
// };
// автоматически запускает таймер:
// timer.start()

// // Запускает таймер при Клике
// refs.startBtn.addEventListener('click', () => {
//   timer.start();
// });
// // Останавливает таймер при клике
// refs.stopBtn.addEventListener('click', () => {
//   timer.stop();
// });

// // -Принимает время в миллисекундах
// // -Высчитывает сколько в них вмещается часов\минут\секунд
// // -Рисует интерфейс
// function updateClockface({ hours, mins, secs }) {
//   refs.clockface.textContent = `${hours}:${mins}:${secs}`;
// }

// // Принимает число, приводит к строке и добавляе в начало 0 если число меньше 2х знаков
// function pad(value) {
//   return String(value).padStart(2, '0');
// }

// // -Принимает время в миллисекундах
// // - Высчитывает сколько в них вмещается часов\минут\секунд
// // - Возвращает обьект со свойствами hours, mins, secs
// // - Адская копипаста со стека
// function getTimeComponents(time) {
//   const hours = pad(
//     Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//   );
//   const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//   const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
//   return { hours, mins, secs };
// }

// Делаем таймер через класс==============================================
class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;

    // отображение циферблата
    this.init();
  };

  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }
  
  start() {
    if (this.isActive) {
      return;
    }
    const startTime = Date.now();
    this.isActive = true;
    // Вызываем запланированную функцию каждый раз с интервалом в 1секу
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      // получаем разницу во времени
      const deltaTime = currentTime - startTime;

      // получаем время в функции getTimeComponents которая возвращает время в своем формате
      const time = this.getTimeComponents(deltaTime);
      this.onTick(time);
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;

    // при нажатии на стоп, очищаем поле
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  // Принимает число, приводит к строке и добавляе в начало 0 если число меньше 2х знаков
  pad(value) {
    return String(value).padStart(2, '0');
  }

  // -Принимает время в миллисекундах
  // - Высчитывает сколько в них вмещается часов\минут\секунд
  // - Возвращает обьект со свойствами hours, mins, secs
  // - Адская копипаста со стека
  getTimeComponents(time) {
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { hours, mins, secs };
  }
}
const timer = new Timer({
  onTick: updateClockface,
});

// Запускает таймер при Клике
refs.startBtn.addEventListener('click', () => {
  timer.start();
});
// Останавливает таймер при клике
refs.stopBtn.addEventListener('click', () => {
  timer.stop();
});

// -Принимает время в миллисекундах
// -Высчитывает сколько в них вмещается часов\минут\секунд
// -Рисует интерфейс
function updateClockface({ hours, mins, secs }) {
  refs.clockface.textContent = `${hours}:${mins}:${secs}`;
}