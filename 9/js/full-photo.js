const fullPhoto = document.querySelector('.big-picture');
const commentList = fullPhoto.querySelector('.social__comments');
const cancelButton = fullPhoto.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('.social__comment');
const bodyElement = document.querySelector('body');
const commentsLoader = fullPhoto.querySelector('.comments-loader');
const countComments = fullPhoto.querySelector('.social__comment-count');


const createComment = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode('true');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  commentList.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.forEach((item) => {
    const comment = createComment(item);
    commentList.append(comment);
  });

  commentList.append(fragment);
};

const hideFullPhoto = () => {
  fullPhoto.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

//используем функциональное выражение, а не стрелочное, т.к. при записи функции в
// переменную к ней можно обратиться только после обЪявления, а нам нужно использовать ее
// при удалении обработчика в функции выше
function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape'){
    evt.preventDafault();
    hideFullPhoto();
  }
}

const onCancelButtonClick = () => {
  hideFullPhoto();
};

const getDetailsFullPhoto = ({url, description, likes}) => {
  fullPhoto.querySelector('.big-picture__img').querySelector('img').src = url;
  fullPhoto.querySelector('.big-picture__img').querySelector('img').alt = description;
  fullPhoto.querySelector('.likes-count').textContent = likes;
  fullPhoto.querySelector('.social__caption').textContent = description;
};

const showFullPhoto = (picture) => {
  fullPhoto.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  countComments.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeyDown);

  getDetailsFullPhoto(picture);
  renderComments(picture.comments);
  cancelButton.addEventListener('click', onCancelButtonClick);
};

export { showFullPhoto };
