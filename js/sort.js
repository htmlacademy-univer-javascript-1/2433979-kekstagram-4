import { renderThumbnails } from './miniature.js';
import { debounce } from './util.js';
import { pictures } from './main.js';
const FILTER_PICTURES_COUNT = 10;
const sections = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

let currentFilter = document.querySelector('.img-filters__button--active');

const sortRandomly = () => Math.random() - 0.5;
const sortByComments = (firstPicture, secondPicture) => secondPicture.comments.length - firstPicture.comments.length;

const sectionsFuncs = {
  'filter-default': () => {
    renderThumbnails(pictures);
  },

  'filter-random': () => {
    renderThumbnails(pictures.slice(0, FILTER_PICTURES_COUNT).sort(sortRandomly));
  },

  'filter-discussed': () => {
    renderThumbnails(pictures.slice().sort(sortByComments));
  }
};

const onFilterUpdate = debounce((event) => {
  sectionsFuncs[event.target.id]();
  currentFilter.classList.remove('img-filters__button--active');
  currentFilter = event.target;
  currentFilter.classList.add('img-filters__button--active');
});

const showSections = () => {
  sections.classList.remove('img-filters--inactive');

  filterButtons.forEach((filter) => {
    filter.addEventListener('click', onFilterUpdate);
  });
};

export { showSections };
