<<<<<<< HEAD

=======
>>>>>>> 683d5674b8ec1b932bab6a22a39edb87dade6295
//Функция для проверки длины строки.
const checkStringLength = (string, maxLength) => string.length <= maxLength;

//Функция для проверки, является ли строка палиндромом.
const isPalindrome = (string) => {
<<<<<<< HEAD
  const normalizedString = string.replaceAll(' ','').toLowerCase();
  const reverseString = normalizedString.split('').reverse().join('');
  return (normalizedString === reverseString);
}
=======
  const normalizedString = string.replaceAll().toLowerCase();
  const reverseString = normalizedString.split().reverse().join();
  return normalizedString === reverseString;
};
>>>>>>> 683d5674b8ec1b932bab6a22a39edb87dade6295
