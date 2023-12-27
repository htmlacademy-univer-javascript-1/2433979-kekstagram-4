const body = document.querySelector('body');

const successMesagge = document
  .querySelector('#success')
  .content.querySelector('.success');

const errorMessage = document
  .querySelector('#error')
  .content.querySelector('.error');

function hideAnyMessage() {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.removeEventListener('keydown', onEscape);
  body.removeEventListener('click', onBody);
}

function onBody(evt) {
  if (evt.target.closest('.successinner') || evt.target.closest('.errorinner')){
    return;
  }
  hideAnyMessage();
}

function onEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideAnyMessage();
  }
}

const showMessage = (messageElement, closeButtonClass) => {
  body.append(messageElement);
  document.addEventListener('keydown', onEscape);
  body.addEventListener('click', onBody);
  messageElement
    .querySelector(closeButtonClass)
    .addEventListener('click', hideAnyMessage);
};

const showSuccess = () => {
  showMessage(successMesagge, '.success__button');
};

const showError = () => {
  showMessage(errorMessage, '.error__button');
};

export {showSuccess, showError};
