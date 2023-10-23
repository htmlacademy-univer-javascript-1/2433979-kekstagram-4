//Функция для проверки длины строки.
const checkStringLength = (string, maxLength) => string.length <= maxLength;

//Функция для проверки, является ли строка палиндромом.
const isPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ','').toLowerCase();
  const reverseString = normalizedString.split('').reverse().join('');
  return normalizedString === reverseString;
};

