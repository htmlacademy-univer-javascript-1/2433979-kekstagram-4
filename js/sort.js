import { renderThumbnails, removeThumbnails } from './miniature.js';
import { debounce, TIMEOUT_DELAY } from './util.js';
import { pictures } from './main.js';

const sections = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

let currentFilter = document.querySelector('.img-filters__button--active');
const sectionsFuncs = {
  'filter-default': () => {
    removeThumbnails();
    renderThumbnails(pictures);
  },

  'filter-random': () => {
    removeThumbnails();
    renderThumbnails(pictures.toSorted(() => Math.random() - 0.5).slice(0, 10));
  },

  'filter-discussed': () => {
    removeThumbnails();
    renderThumbnails(pictures.toSorted((first, second) => second.comments.length - first.comments.length));
  }
};

const onFilterUpdate = debounce((event) => {
  sectionsFuncs[event.target.id]();
  currentFilter.classList.remove('img-filters__button--active');
  currentFilter = event.target;
  currentFilter.classList.add('img-filters__button--active');
}, TIMEOUT_DELAY);

const showSections = () => {
  sections.classList.remove('img-filters--inactive');

  filterButtons.forEach((filter) => {
    filter.addEventListener('click', onFilterUpdate);
  });
};

export { showSections };

