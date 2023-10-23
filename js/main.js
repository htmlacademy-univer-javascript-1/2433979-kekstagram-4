const SIMILAR_OBJECT_COUNT = 25;
const AVATAR_MIN_COUNT = 1;
const AVATAR_MAX_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_MIN_COUNT = 0;
const COMMENT_MAX_COUNT = 30;
const MESSAGE_MIN_COUNT = 1;
const MESSAGE_MAX_COUNT = 2;
const MESSAGES = [
  'Всё отлично', 'В целом всё неплохо.', 'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Алена',
  'Максим',
  'Коля',
  'Женя',
  'Вася',
  'Лена',
  'Ксюша',
  'Антон',
  'Катя',
  'Илья'
];
const DESCRIPTIONS = [
  'Как дела дорогие подписчики?',
  'Всем хорошего дня!',
  'Я на пляже в Дубае',
  'Ставь лайк если любишь маму',
  'Как у вас дела?',
  'Сегодня отличная погода',
];
//функция для получения случайного числа из диапазона
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

//функция для получения случайного числа из диапазона без повторений
const getRndIntWithoutRepeat = (min, max) => {
  const previousValues = [];

  return function() {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= max - min + 1){
      return null;
    }
    while(previousValues.includes(currentValue)){
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

//функция для получения случайного элемента массива
const getRandomArrayElement = (elements) => (
  (elements[getRandomInteger(0, elements.length - 1)])
);

//формирует текст комментария посредством взятия одного или двух случайных предложений из представленных в messages
const createMessage = () => {
  const indexMessage = getRndIntWithoutRepeat(0, MESSAGES.length - 1);
  return getRandomInteger(MESSAGE_MIN_COUNT,MESSAGE_MAX_COUNT) === 1 ? MESSAGES[indexMessage()] : MESSAGES[indexMessage()] + ' ' + MESSAGES[indexMessage()]
};

const idComment = getRndIntWithoutRepeat(COMMENT_MIN_COUNT, COMMENT_MAX_COUNT);
//создает комментарий
const createComment = () => ({
  id: idComment(),
  avatar: `img/avatar-${getRandomInteger(AVATAR_MIN_COUNT,AVATAR_MAX_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES)
});

const idObject = getRndIntWithoutRepeat(1, SIMILAR_OBJECT_COUNT);
const urlObject = getRndIntWithoutRepeat(1, SIMILAR_OBJECT_COUNT);
const createObject = () => ({
  id: idObject(),
  url: `photos/${urlObject()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({length: getRandomInteger(0,30)}, createComment)
});

const similarObjects = Array.from({length: SIMILAR_OBJECT_COUNT}, createObject);

