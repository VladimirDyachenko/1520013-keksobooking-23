import { getRandomTestData } from './test-data.js';
import { getOfferCards } from './getOfferCards.js';
import { setPageActive } from './pageState.js';

setPageActive(false);

setTimeout(() => setPageActive(true), 5000);

const data = getRandomTestData(10);

const map = document.querySelector('#map-canvas');
const offers = getOfferCards(data);
map.appendChild(offers.firstChild);
