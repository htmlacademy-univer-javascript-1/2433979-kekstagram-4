//import {similarObjects} from './data.js';
import {renderThumbnails} from './miniature.js';
//import './form-photo-upload.js';
import { hideForm, setOnSubmit } from './form-photo-upload.js';
import { showSuccess, showError } from './message.js';
import { getData, sendData } from './api.js';
import { showSections } from './sort.js';
import { showAlert } from './util.js';

setOnSubmit(async (data) => {
  try{
    await sendData(data);
    hideForm();
    showSuccess();
  } catch(err){
    showError();
  }
});

let pictures = [];

const addPictures = (newPictures) => {
  pictures = newPictures.slice();
  renderThumbnails(pictures);
};

getData()
  .then((newPictures) => addPictures(newPictures))
  .catch((err) => showAlert(err.message));
showSections();

export {pictures};
