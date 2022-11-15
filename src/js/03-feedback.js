import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[type="email"]'),
  message: document.querySelector('textarea[name="message"]'),
};

refs.form.addEventListener('submit', onSumbit);
refs.form.addEventListener('input', throttle(onInput, 500));

function onSumbit(e) {
  e.preventDefault();
  consoleFormData(e.currentTarget);
  e.currentTarget.reset();
  localStorage.removeItem('email');
  localStorage.removeItem('message');
}

function onInput(e) {
  if (e.target.name === 'email') localStorage.setItem('email', e.target.value);
  if (e.target.name === 'message')
    localStorage.setItem('message', e.target.value);
}

function getLocalStorageItems(e) {
  if (localStorage.getItem('email')) {
    refs.email.value = localStorage.getItem('email');
  }
  if (localStorage.getItem('message')) {
    refs.message.value = localStorage.getItem('message');
  }
}

function consoleFormData(form) {
  const feedbackData = {};
  new FormData(form).forEach((value, key) => (feedbackData[key] = value));
  console.log('feedbackData', feedbackData);
}
