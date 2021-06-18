import { getRandomTestData } from './test-data.js';
import { getOfferCards } from './getOfferCards.js';

const data = getRandomTestData(10);

const map = document.querySelector('#map-canvas');
const offers = getOfferCards(data);
map.appendChild(offers.firstChild);
