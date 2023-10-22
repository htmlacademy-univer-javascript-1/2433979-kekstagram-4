const SIMILAR_OBJECT_COUNT = 25;
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
      let currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

//функция для получения случайного элемента массива
const getRandomArrayElement = (elements) => {
  return (elements[getRandomInteger(0, elements.length - 1)])
};
const descriptions = ['Как дела дорогие подписчики?', 'Всем хорошего дня!', 'Я на пляже в Дубае'];

//формирует текст комментария посредством взятия одного или двух случайных предложений из представленных в messages
const createMessage = () => {
  const messages = ['Всё отлично', 'В целом всё неплохо.', 'Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.','В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают.', 'Как можно было поймать такой неудачный момент?!'];
  const indexMessage = getRndIntWithoutRepeat(0, messages.length - 1);
  return getRandomInteger(1,2) === 1 ? messages[indexMessage()] : messages[indexMessage()] + ' ' + messages[indexMessage()]
}

//создает комментарий
const createComment = () => {
  const names = ['Алена', 'Максим', 'Коля', 'Женя', 'Вася', 'Лена', 'Ксюша', 'Антон', 'Катя', 'Илья'];
  const idComment = getRndIntWithoutRepeat(0, 30);
  return {
    id: idComment(),//любое число. Идентификаторы не должны повторяться,
    avatar: `img/avatar-${getRandomInteger(1,6)}.svg`, //это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg,
    message: createMessage(),//вам необходимо взять одно или два случайных предложения из представленных ниже,
    name: getRandomArrayElement(names)//Имена авторов также должны быть случайными. Подставляйте случайное имя в поле,
  };
};

const similarComments = Array.from({length: getRandomInteger(0,30)}, createComment);
const createObject = () => {
  const idObject = getRndIntWithoutRepeat(1, SIMILAR_OBJECT_COUNT);
  const urlObject = getRndIntWithoutRepeat(1, SIMILAR_OBJECT_COUNT);
  return {
    id: idObject(), //идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться
    url: `photos/${urlObject()}.jpg`, //{{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
    description: getRandomArrayElement(descriptions), //строка — описание фотографии. Описание придумайте самостоятельно
    likes: getRandomInteger(15, 200), //Случайное число от 15 до 200.
    comments: similarComments /*массив объектов — список комментариев, оставленных другими пользователями к этой фотографии.
     Количество комментариев к каждой фотографии — случайное число от 0 до 30.
     Все комментарии генерируются случайным образом.*/
  };
};

const similarObjects = Array.from({length: SIMILAR_OBJECT_COUNT}, createObject);
