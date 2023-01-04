// Создание промиса
// -Класс Promise
// -resolve
// -reject
// -Promise.prototype.then(onResolve, onReject)

// const promise = new Promise((resolve, reject) => {
//   const canFulfill = Math.random() > 0.5;

//   setTimeout(() => {
//     if (canFulfill) {
//       resolve('Промис выполнился успешно, с результатом (исполнен, fulfilled)');
//     }
//     reject('Промис выполнился с ошибкой (отклонен, rejected)');
//   }, 1000);
// });

// promise.then(onFulfilled, onRejected);

// function onFulfilled(result) {
//   console.log(result);
// }
// function onRejected(error) {
//   console.log(error);
// }

// Цепочки промисов(chaining)
// Promise.prototype.catch(error)
// Promise.prototype.finally()

// promise
//   .then(onFulfilled)
//   .then(х => {
//     console.log(х);
//     return 10;
//   })
//   .then(y => {
//     console.log(y);
//     return 5;
//   })
//   .catch(error => console.log(error))
//   .finally(() => console.log('я буду выполнен в любом случае'));

// ===============================================================
// Промисификация:
// -Проблема доступа к результату промиса с колбеком
// -Функция которая возвращает промис

// const makeOrder = dish => {
//   const DELAY = 1000;

//   return new Promise((resolve, reject) => {
//     const passed = Math.random() > 0.5;
//     setTimeout(() => {
//       if (passed) {
//         resolve(`Вот ваш заказ: ${dish}`);
//       }
//       reject(`у нас закончились продукты`);
//     }, DELAY);
//   });
// };

// makeOrder('пирожок').then(onMakeOrderSuccess).catch(onMakeOrderError);

// function onMakeOrderSuccess(result) {
//   console.log('onMakeOrderSuccess');
//   console.log(result);
// }
// function onMakeOrderError(error) {
//   console.log('onMakeOrderError');
//   console.log(error);
// }

// ========================================================
// Промисификация "синхронных" функций
// -Promise.resolve()
// -Promise.reject()

// делаем такие же промисы только без сеттаймаута и быстрее с помощью методов:

// const makeOrder = dish => {
//   return Promise.resolve(`вот ваш заказ${dish}`)
// }

// makeOrder('пирожок').then(onMakeOrderSuccess)

// function onMakeOrderSuccess(result) {
//   console.log('onMakeOrderSuccess');
//   console.log(result);
// }
// function onMakeOrderError(error) {
//   console.log('onMakeOrderError');
//   console.log(error);
// }

// =======================================================
// работа с бэкэндом
// запрос на сервер(или возвращает какой то результат или будет какая то ошибка)
// функция получает url и возвращает promise
// получаем покемона(его информацию)
// fetch('https://pokeapi.co/api/v2/pokemon/1')
//   .then(r => r.json())
//   .then(pokemon => {
//   console.log(pokemon);
//   })
//   // если пришла ошибка выполняется блок catch
//   .catch(error => {
//     console.log(error);
//   })

// ======================================================
// делаем тоже самое только с помощью функции, т.к. запросов может быть много и делаем функцию
// которая просто фетчит(функция которая бегает на сервер и берет данные)
// const fetchPokemonById = id => {
//   // тут функция возвращает промис
//   return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r=>r.json())
// };

// // тут функция отдает промис и мы к ней цепляемся
// fetchPokemonById(1).then(onFetchSuccess).catch(onFetchError);
// fetchPokemonById(2).then(onFetchSuccess).catch(onFetchError);
// fetchPokemonById(3).then(onFetchSuccess).catch(onFetchError);

// function onFetchSuccess(pokemon) {
//   console.log(pokemon);
// }
// function onFetchError(error) {
//   console.log(error);
// }

// =============================================================
// Закрепляем материал

// const makePromise = () => {
//   return new Promise((resolve, reject) => {
//     const passed = Math.random() > 0.5;
//     if (passed) {
//       resolve('получите распишитесь');
//     }
//     reject('получите ошибку');
//   });
// };

// makePromise().then(result => console.log(result))
//   .catch(error => console.log(error));

// ============================================================
// Пишем Ипподром

// const horses = ['one', 'two', 'three', 'four', 'five'];

// const refs = {
//   startBtn: document.querySelector('.js-start-race'),
//   winnerField: document.querySelector('.js-winner'),
//   progressField: document.querySelector('.js-progress'),
//   tableBody: document.querySelector('.js-results-table > tbody'),
// };
// let raceCounter = 0;

// refs.startBtn.addEventListener('click', onStart);

// function onStart() {
//   raceCounter += 1;
//   const promises = horses.map(run);

//   updateWinnerField('');
//   updateProgressField('заезд начался, ставки не принимаются');
//   determineWinner(promises);
//   waitForAll(promises);
// }

// function determineWinner(horsesP) {
//   Promise.race(horsesP).then(({ horse, time }) => {
//     updateWinnerField(`Победил ${horse}, финишировав за ${time} времени`);
//     updateResultsTable({ horse, time, raceCounter });
//   });
// }

// function waitForAll(horsesP) {
//   Promise.all(horsesP).then(() => {
//     updateProgressField('заезд окончен, принимаются ставки');
//   });
// }

// function updateWinnerField(message) {
//   refs.winnerField.textContent = message;
// }
// function updateProgressField(message) {
//   refs.progressField.textContent = message;
// }

// function updateResultsTable({ horse, time, raceCounter }) {
//   const tr = `<tr><td>${raceCounter}</td><td>${horse}</td><td>${time}</td></tr>`;
//   refs.tableBody.insertAdjacentHTML('beforeend', tr);
// }

// function getRandomTime(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }
// function run(horse) {
//   return new Promise((resolve, reject) => {
//     const time = getRandomTime(2000, 3500);
//     setTimeout(() => {
//       resolve({ horse, time });
//     }, time);
//   });
// }

// ==============================================================
// тот же иподром только с пояснениями

// function run(horse) {
//   return new Promise((resolve, reject) => {
//     const time = getRandomTime(2000, 3500);
//     setTimeout(() => {
//       resolve({horse, time})
//     }, time)
//   })
// }

// отслеживаем один промис(лошадь)
// run('qwe').then(x => console.log(x)).catch(e => console.log(e));

// отслеживаем коллекцию промисов
// const promises = horses.map(run);
// console.log(promises);

// // Метод Promise.race([])-для ожидания первого выполневшегося промиса(первой пришедшей лошади)
// Promise.race(promises).then(({ horse, time }) =>
//   console.log(`Победил ${horse}, финишировав за ${time} времени`)
// );

// // Метод Promise.all([])-для ожидания всех промисов
// Promise.all(promises).then(x => {
//   console.log(x);
//   console.log('заезд окончен, принимаются ставки');
// })

// function getRandomTime(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }
