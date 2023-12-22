const Effects = {
  ORIGINAl: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const Filters = {
  [Effects.CHROME]: {
    style: 'grayscale',
    unit: ''
  },
  [Effects.SEPIA]: {
    style: 'sepia',
    unit: ''
  },
  [Effects.MARVIN]: {
    style: 'invert',
    unit: '%'
  },
  [Effects.PHOBOS]: {
    style: 'blur',
    unit: 'px'
  },
  [Effects.HEAT]: {
    style: 'brightness',
    unit: ''
  }
};

const SliderSettings ={
  [Effects.ORIGINAl]: {
    min: 0,
    max: 100,
    step: 1
  },
  [Effects.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effects.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effects.MARVIN]: {
    min: 0,
    max: 100,
    step: 1
  },
  [Effects.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1
  },
  [Effects.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1
  }
};

const modal = document.querySelector('.img-upload');
const image = modal.querySelector('.img-upload__preview img');
const effectsTypes = modal.querySelector('.effects');
const slider = modal.querySelector('.effect-level__slider');
const sliderContainer = modal.querySelector('.img-upload__effect-level');
const effectLevel = modal.querySelector('.effect-level__value');

let activeEffect  = Effects.ORIGINAl;

const setImageStyle = () => {
  if (activeEffect === Effects.ORIGINAl){
    image.style.filter = null;
    return;
  }

  const { value } = effectLevel;
  const { style, unit } = Filters[activeEffect];
  image.style.filter = `${style}`(`${value}${unit}`);
};

const onSliderUpdate = () => {
  effectLevel.value = slider.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(slider, {
    range: {min, max},
    step,
    start: max,
    connect: 'lower'
  });
  slider.noUiSlider.on('update', onSliderUpdate);
};

const sliderShow = () => {
  sliderContainer.classList.remove('hidden');
};

const sliderHide = () => {
  sliderContainer.classList.add('hidden');
};

const destroySlider = () => {
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }
  setImageStyle();
};

const buildSlider = () => {
  destroySlider();
  sliderHide();

  if (activeEffect !== Effects.ORIGINAl){
    createSlider(SliderSettings[activeEffect]);
    sliderShow();
  }
};

const setEffct = (effect) => {
  activeEffect = effect;
  buildSlider();
};

const resetEffect = () => {
  setEffct(Effects.ORIGINAl);
};

const onEffectsChange = (evt) => {
  setEffct(evt.target.value);
};

function init() {
  buildSlider();
  effectsTypes.addEventListener('change', onEffectsChange);
}

export {resetEffect, init};
