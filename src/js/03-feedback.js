import throttle from 'lodash.throttle';

const form = document.querySelector('form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

form.addEventListener('submit', onFormSumbit);
form.addEventListener('input', throttle(onInput, 500));

const STORAGE_KEY = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

getLocalStorageItems();

function onFormSumbit(e) {
  e.preventDefault();

  if (e.target.elements.email.value && e.target.elements.message.value) {
    // consoleFormData(e.currentTarget);
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData = {};
  } else {
    alert('заповни всі поля форми!');
  }
}

function onInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function getLocalStorageItems() {
  const storageItem = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (storageItem) {
    input.value = storageItem.email || '';
    textarea.value = storageItem.message || '';
  }
}
