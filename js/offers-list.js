import { getOffersFromServer } from './rest.js';
import { addOffersToMap } from './map.js';
import { openErrorModal } from './modal.js';

let cachedOffers = [];

const renderOffers = (offersLis) => addOffersToMap(offersLis, true);

const getAllOffers = () => [...cachedOffers];

(async () => {
  await getOffersFromServer(
    (offersList) => {
      cachedOffers = offersList;
      renderOffers(offersList);
    },
    () => openErrorModal('Не удалось загрузить объявления', 'Перезагрузить страницу', () => document.location.reload()),
  );
})();

export { renderOffers, getAllOffers };
