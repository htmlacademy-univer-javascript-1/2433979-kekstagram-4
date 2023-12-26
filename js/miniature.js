import { showFullPhoto } from './full-photo.js';
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createThumbnail = ({url, description, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode('true');

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const removeThumbnails = () => {
  document.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  removeThumbnails();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      showFullPhoto(picture);
    });
    fragment.append(thumbnail);
  });

  picturesContainer.append(fragment);
};

export { renderThumbnails, removeThumbnails };
