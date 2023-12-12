import {isEscKey} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const formToEditPhoto = uploadForm.querySelector('.img-upload__overlay');
const closeFormButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const MAX_COMMENT_LENGTH = 140;
const MAX_COUNT_HASHTAGS = 5;
const hashtagFormat = /^#[a-zа-яё0-9]{1,19}$/i;

const closeByEscape = (evt) => evt.stopPropagation();
hashtagInput.addEventListener('keydown', closeByEscape);
commentInput.addEventListener('keydown', closeByEscape);

const closeForm = () => {
  formToEditPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeFormButton.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', closeFormByEsc);

  uploadForm.reset();
};

function closeFormByEsc (evt) {
  if (isEscKey(evt)) {
    closeForm();
  }
}

const openForm = () => {
  formToEditPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeFormButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeFormByEsc);
};

uploadInput.addEventListener('change', openForm);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validHashtag = (value) => {
  const hashtagsArray = value.toLowerCase().trim().split(/\s+/);
  return !(hashtagsArray.find((item) => !hashtagFormat.test(item))) &&
        !(hashtagsArray.length > MAX_COUNT_HASHTAGS) &&
        (new Set(hashtagsArray).size === hashtagsArray.length);
};

const getMessageOfHashtagError = () => {
  const hashtagsArray = hashtagInput.value.toLowerCase().trim().split(/\s+/);
  if (hashtagsArray.length > MAX_COUNT_HASHTAGS) {
    return 'Превышено количество хэш-тегов';
  }
  if (hashtagsArray.find((item) => !hashtagFormat.test(item))) {
    return 'Введён невалидный хэш-тег';
  }
  if (new Set(hashtagsArray).size !== hashtagsArray.length) {
    return 'Хэш-теги не должны повторяться';
  }
};

pristine.addValidator(hashtagInput, validHashtag, getMessageOfHashtagError);

const validComment = (value) => value.length < MAX_COMMENT_LENGTH;

pristine.addValidator(commentInput, validComment, `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`);

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
