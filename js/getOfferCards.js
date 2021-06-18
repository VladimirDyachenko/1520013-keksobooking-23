const OFFER_TYPES_ENUM = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом ',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};
const CARD_TEMPLATE = document.querySelector('#card');

const getOfferCards = (offerData) => {

  const cards = new DocumentFragment();

  for (let item = 0; item < offerData.length; item++) {

    const card = CARD_TEMPLATE.content
      .querySelector('.popup')
      .cloneNode(true);

    const title = card.querySelector('.popup__title');
    const address = card.querySelector('.popup__text--address');
    const price = card.querySelector('.popup__text--price');
    const type = card.querySelector('.popup__type');
    const capacity = card.querySelector('.popup__text--capacity');
    const time = card.querySelector('.popup__text--time');
    const features = card.querySelector('.popup__features');
    const description = card.querySelector('.popup__description');
    const photos = card.querySelector('.popup__photos');
    const avatar = card.querySelector('.popup__avatar');

    const { author, offer } = offerData[item];

    title.textContent = offer.title;

    address.textContent = offer.address;

    if (offer.price) {
      price.textContent = `${offer.price} ₽/ночь`;
    } else {
      price.style.opacity = 0;
    }

    type.textContent = OFFER_TYPES_ENUM[offer.type];

    if (offer.rooms && offer.guests) {
      capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    } else {
      capacity.style.opacity = 0;
    }

    if (offer.checkin && offer.checkout) {
      time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    } else {
      time.style.opacity = 0;
    }

    description.textContent = offer.description;

    const featureList = Array.from(features.children)
      .filter((featureItem) => {
        let check = false;
        for (const offerFeature of offer.features) {
          if (featureItem.classList.contains(`popup__feature--${offerFeature}`)) {
            check = true;
            break;
          }
        }
        return check;
      });
    features.replaceChildren(...featureList);

    photos.replaceChildren();
    offer.photos.forEach((photoUrl) => {
      photos.insertAdjacentHTML('beforeend', `<img src="${photoUrl}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    });

    avatar.src = author.avatar;

    cards.appendChild(card);
  }

  return cards;
};

export { getOfferCards };
