const fullPhoto = document.querySelector('.big-picture');
const commentList = fullPhoto.querySelector('.social__comments');
const cancelButton = fullPhoto.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('.social__comment');
const bodyElement = document.querySelector('body');
const commentsLoader = fullPhoto.querySelector('.comments-loader');
const countComments = fullPhoto.querySelector('.social__comment-count');
const commentsCounter = fullPhoto.querySelector('.comments-count');
const loaderCommentsButton = fullPhoto.querySelector('.social__comments-loader');
const COMMENTS_STEP = 5;
let allComments;
let commentsShow = 0;


const createComment = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode('true');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    commentList.append(comment);
  });

  commentList.append(fragment);
};

function loadComments () {
  const newPortion = allComments.slice(commentsShow, commentsShow + COMMENTS_STEP);
  commentsShow += newPortion.length;
  renderComments(newPortion);
  if(commentsShow >= allComments.length){
    loaderCommentsButton.classList.add('hidden');
  } else{
    loaderCommentsButton.classList.remove('hidden');
  }
  countComments.innerHTML = `${commentsShow} из <span class="comments-count">${allComments.length}</span> комментариев`;
}

loaderCommentsButton.addEventListener('click', (evt) => {
  evt.preventDefault();

});

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
  commentList.innerHTML = '';
  fullPhoto.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);

  getDetailsFullPhoto(picture);
  allComments = picture.comments;
  loadComments();
  cancelButton.addEventListener('click', onCancelButtonClick);
};

export { showFullPhoto };
