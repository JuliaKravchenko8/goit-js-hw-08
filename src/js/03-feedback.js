import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[type="email"]'),
  message: document.querySelector('textarea[name="message"]'),
};

refs.form.addEventListener('submit', onSumbit);
refs.form.addEventListener('input', throttle(onInput, 500));

const STORAGE_KEY = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

populateData();

function onInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSumbit(e) {
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}
function populateData() {
  const storageItem = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log('storageItem', storageItem);
  console.log(storageItem);
  if (storageItem) {
    refs.email.value = storageItem.email || '';
    refs.message.value = storageItem.message || '';
  }
}
