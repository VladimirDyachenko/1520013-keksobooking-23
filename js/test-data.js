import { getRandomPositiveFloat, getRandomPositiveInteger } from './utils/utils.js';

const getRandomTestData = (amount) => {
  const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
  const CHECK_OPTIONS = ['12:00', '13:00', '14:00'];
  const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const PHOTO_URLS = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];

  const testData = [];

  const getAvatarPath = (function() {
    let count = 0;

    const increment = function() {
      count++;
      return count <= 9 ? `img/avatars/user/0${count}.png` : `img/avatars/user/${count}.png`;
    };

    return increment;
  })();

  const getRandomArrayElement = (arr) => arr[getRandomPositiveInteger(0, arr.length - 1)];

  const getRandomArray = (length, dataSource) => {
    const temp = [];

    for(let index = 0; index < length; index++) {
      temp.push(getRandomArrayElement(dataSource));
    }

    return temp;
  };

  const getFeatures = () => [...new Set(getRandomArray(getRandomPositiveInteger(1, OFFER_FEATURES.length), OFFER_FEATURES))];

  const lat = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const lng = getRandomPositiveFloat(139.70000, 139.80000, 5);

  for (let index = 0; index < amount; index++) {
    testData.push({
      author: {
        avatar: getAvatarPath(),
      },
      offer: {
        title: 'Title',
        address: `${lat}, ${lng}`,
        price: getRandomPositiveInteger(2500, 50000),
        type: getRandomArrayElement(OFFER_TYPES),
        rooms: getRandomPositiveInteger(1, 8),
        guests: getRandomPositiveInteger(1, 8),
        checkin:  getRandomArrayElement(CHECK_OPTIONS),
        checkout: getRandomArrayElement(CHECK_OPTIONS),
        features: getFeatures(),
        description: 'description',
        photos: getRandomArray(getRandomPositiveInteger(1, 8), PHOTO_URLS),
      },
      location: {
        lat,
        lng,
      },
    });
  }

  return testData;
};

export { getRandomTestData };
