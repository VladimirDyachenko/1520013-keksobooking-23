const getRandomFloat = (min, max, precision = 6) => {
  if (min > max || min < 0) {
    throw new Error('Min must be greater than 0 and max must be greater than min');
  }

  if (precision < 0 || precision > 16) {
    throw new Error('Precision must be between 0 and 16');
  }

  let result = (Math.random() * (max - min) + min).toFixed(precision);
  // toFixed возвращает строчку, приходится делать это
  result = result * 100 / 100;
  return result;
};

getRandomFloat(0.6, 11.9, 15);
