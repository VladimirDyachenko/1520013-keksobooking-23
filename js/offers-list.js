import { getOffersFromServer } from './rest.js';
import { addOffersToMap } from './map.js';
import { openErrorModal } from './modal.js';

let offers = [];

const setOffersList = (offersLis) => {
  offers = offersLis;
  addOffersToMap(offers, true);
};

const getOffersList = () => [...offers];

(async () => {
  await getOffersFromServer(
    (offersList) => setOffersList(offersList),
    () => openErrorModal('Не удалось загрузить объявления', 'Перезагрузить', () => document.location.reload()),
  );

})();

export { setOffersList, getOffersList };
