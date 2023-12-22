const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const modalElem = document.querySelector('.img-upload');
const decreaseButton = modalElem.querySelector('.scale__control--smaller');
const increaseButton = modalElem.querySelector('.scale__control--bigger');
const scaleInput = modalElem.querySelector('.scale__control--value');
const image = modalElem.querySelector('.img-upload__preview img');

const scaleImge = (value) => {
  image.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const resetScale = () => scaleImge(MAX_SCALE);

const onDecrease = () =>{
  scaleImge(
    Math.max(parseInt(scaleInput.value, 10) - SCALE_STEP, MIN_SCALE)
  );
};

const onIncrease = () =>{
  scaleImge(
    Math.min(parseInt(scaleInput.value, 10) + SCALE_STEP, MAX_SCALE)
  );
};

decreaseButton.addEventListener('click', onDecrease);
increaseButton.addEventListener('click', onIncrease);

export {resetScale};
