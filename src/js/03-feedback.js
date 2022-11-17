import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[type="email"]'),
  message: document.querySelector('textarea[name="message"]'),
};

refs.form.addEventListener('submit', onSumbit);
refs.form.addEventListener('input', throttle(onInput, 500));

const formData = {};

function onInput(e) {
  // if (e.target.name === 'email') localStorage.setItem('email', e.target.value);
  // if (e.target.name === 'message')
  //   localStorage.setItem('message', e.target.value);
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onSumbit(e) {
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

// function getLocalStorageItems(e) {
//   // if (localStorage.getItem('email')) {
//   //   refs.email.value = localStorage.getItem('email');
//   // }
//   // if (localStorage.getItem('message')) {
//   //   refs.message.value = localStorage.getItem('message');
//   // }
// }

// function consoleFormData(form) {
//   const feedbackData = {};
//   new FormData(form).forEach((value, key) => (feedbackData[key] = value));
//   console.log('feedbackData', feedbackData);
// }

(function dataFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (data) {
    refs.email.value = data.email;
    refs.message.value = data.message;
  }
})();
