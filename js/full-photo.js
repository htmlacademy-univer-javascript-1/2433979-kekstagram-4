const fullPicture = document.querySelector('.big-picture');
const commentList = fullPicture.querySelector('.social__comments');
const cancelButton = fullPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('.social__comment');
const bodyElement = document.querySelector('body');
const commentsLoader = fullPicture.querySelector('.comments-loader');
const countComments = fullPicture.querySelector('.social__comment-count');


const createFullPhoto = ({url, description, likes}) => {

  fullPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  fullPicture.querySelector('.big-picture__img').querySelector('img').alt = description;
  fullPicture.querySelector('.likes-count').textContent = likes;
  fullPicture.querySelector('.social__caption').textContent = description;
};

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

const hideFullPicture = () => {
  bodyElement.classList.remove('.modal-open');
  fullPicture.classList.add('.hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

//используем функциональное выражение, а не стрелочное, т.к. при записи функции в
// переменную к ней можно обратиться только после обЪявления, а нам нужно использовать ее
// при удалении обработчика в функции выше
function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape'){
    evt.preventDafault();
    hideFullPicture();
  }
}

const onCancelButtonClick = () => {
  hideFullPicture();
};

cancelButton.addEventListener('click', onCancelButtonClick);

const showFullPicture = (data) => {
  bodyElement.classList.add('.modal-open');
  fullPicture.classList.remove('.hidden');
  document.addEventListener('keydown', onDocumentKeyDown);
  commentsLoader.classList.add('hidden');
  countComments.classList.add('hidden');

  createFullPhoto(data);
  renderComments(data.comments);
};

export { showFullPicture };
