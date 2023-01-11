import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('.form'),
  submit: document.querySelector('.form > button'),
};

refs.form.addEventListener('input', onFormInput);
refs.submit.addEventListener('click', onSubmit);

let firstDelay;
let stepDelay;
let amountPromises;

function onFormInput(e) {
  firstDelay = Number(e.currentTarget.elements.delay.value);
  stepDelay = Number(e.currentTarget.elements.step.value);
  amountPromises = Number(e.currentTarget.elements.amount.value);
};

function onSubmit(e) {
  e.preventDefault();

  let delay = firstDelay;

  for (let i = 1; i <= amountPromises; i += 1) {
     createPromise(i, delay)
       .then(({ position, delay }) => {
         Notiflix.Notify.success(
           `✅ Fulfilled promise ${position} in ${delay}ms`
         );
       })
       .catch(({ position, delay }) => {
         Notiflix.Notify.failure(
           `❌ Rejected promise ${position} in ${delay}ms`
         );
       });
    delay = delay + stepDelay;
  }
}
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
