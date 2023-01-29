import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const formData = {};
const inputEl = document.querySelector('.feedback-form input');
const textareaEl = document.querySelector('.feedback-form textarea');

const STORAGE_KEY = 'feedback-form-state';
preFillForm();

formEl.addEventListener('input', throttle(handlInput, 500));

formEl.addEventListener('submit', handlSubmit);

function handlInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function preFillForm() {
  const savedForm = localStorage.getItem(STORAGE_KEY);
  const parsedForm = JSON.parse(savedForm);

  if (parsedForm) {
    inputEl.value = parsedForm.email;
    textareaEl.value = parsedForm.message;
  }
}

function handlSubmit(e) {
  e.preventDefault();

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
}
