//import {similarObjects} from './data.js';
import {renderThumbnails} from './miniature.js';
//import './form-photo-upload.js';
import { hideForm, setOnSubmit } from './form-photo-upload.js';
import { showSuccess, showError } from './message.js';
import { getData, sendData } from './api.js'
import { showAlert } from './util.js';
//renderThumbnails(similarObjects());
setOnSubmit(async (data) => {
  try{
    await sendData(data);
    hideForm();
    showSuccess();
  } catch{
    showError();
  }
});

try{
  const data = await getData();
  renderThumbnails(data);
} catch(err){
  showAlert(err.message);
}
