import { resetScale } from './scaling.js';
import { resetEffect, init } from './effects.js';
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const pictureInput = uploadForm.querySelector('input[name="filename"]');
const imageOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const counter = uploadForm.querySelector('.counter-text__current');

const MAX_LENGTH_COMMENT = 140;
const MAX_COUNT_HASHTAGS = 5;
const hashtagFormat = /^#[a-zа-яё0-9]{1,19}$/i;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикация...'
};

function isTextFieldsFocused(){
  return document.activeElement === hashtagsField ||
    document.activeElement === commentField;
}
const closeByEscape = (evt) => evt.stopPropagation();
hashtagsField.addEventListener('keydown', closeByEscape);
commentField.addEventListener('keydown', closeByEscape);

function onInput(evt) {
  const length = evt.target.value.length;
  counter.textContent = length;
}

commentField.addEventListener('input', onInput);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const hideForm = () => {
  if (isTextFieldsFocused()){
    return;
  }
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  cancelButton.removeEventListener('click', hideForm);
  document.removeEventListener('keydown', onFormKeydown);

  pristine.reset();
  pictureInput.value = '';
  resetScale();
  resetEffect();
};

function onFormKeydown (evt) {
  if (evt.key === 'Escape') {
    hideForm();
  }
}

const showForm = () => {
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  cancelButton.addEventListener('click', hideForm);
  document.addEventListener('keydown', onFormKeydown);
  init();
};

uploadInput.addEventListener('change', showForm);

const isValidHashtag = (value) => {
  const hashtagsArray = value.toLowerCase().trim().split(/\s+/);
  return !(hashtagsArray.find((item) => !hashtagFormat.test(item))) &&
        !(hashtagsArray.length > MAX_COUNT_HASHTAGS) &&
        (new Set(hashtagsArray).size === hashtagsArray.length);
};

const getMessageHashtagError = () => {
  const hashtagsArray = hashtagsField.value.toLowerCase().trim().split(/\s+/);
  if (hashtagsArray.length > MAX_COUNT_HASHTAGS) {
    return 'Количество хэш-тегов достигло максимума';
  }
  if (hashtagsArray.find((item) => !hashtagFormat.test(item))) {
    return 'Неверный формат хэш-тега';
  }
  if (new Set(hashtagsArray).size !== hashtagsArray.length) {
    return 'Хэш-теги не должны повторяться';
  }
};

pristine.addValidator(hashtagsField, isValidHashtag, getMessageHashtagError);

const isValidComment = (value) => value.length < MAX_LENGTH_COMMENT;

pristine.addValidator(commentField, isValidComment, `Длина комментария больше ${MAX_LENGTH_COMMENT} символов`);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setOnSubmit = (callback) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if(pristine.validate()){
      blockSubmitButton();
      await callback(new FormData(uploadForm));
      unblockSubmitButton();
    }
  });
};

export {hideForm, setOnSubmit};
