import { hideFullPhoto } from './full-photo.js';
import { hideForm} from './form-photo-upload.js';

const ALERT_SHOW_TIME = 5000;

//функция для получения случайного числа из диапазона
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

//функция для получения случайного числа из диапазона без повторений
const getRndIntWithoutRepeat = (min, max) => {
  const previousValues = [];

  return function() {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= max - min + 1){
      return null;
    }
    while(previousValues.includes(currentValue)){
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    if (document.body.lastElementChild.className !== 'error'){
      hideFullPhoto();
      hideForm();
    }
  }
});

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '10px';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '26px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'red';
  alertContainer.style.fontWeight = 700;

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

//функция для получения случайного элемента массива
const getRandomArrayElement = (elements) => (
  (elements[getRandomInteger(0, elements.length - 1)])
);

export {getRandomInteger, getRndIntWithoutRepeat, getRandomArrayElement, showAlert};
