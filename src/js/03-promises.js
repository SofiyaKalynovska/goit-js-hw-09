import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {

      if (shouldResolve) {
        resolve({ position, delay })
      }
        else {
          reject({ position, delay })
      }

    }, delay)
  })
}

refs.form.addEventListener('submit', onFormSubmit)

function onFormSubmit(e) {
  e.preventDefault();

  const formInputs = e.currentTarget.elements;
  const delay = parseInt(formInputs.delay.value);
  const amount = parseInt(formInputs.amount.value);
  const step = parseInt(formInputs.step.value);

  for (let position = 1; position <= amount; position += 1) {
    
    let currentDelay = step * (position - 1) + delay;

    createPromise(position, currentDelay)
      
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      })
      
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      })
  }
}
