import { getRandomTestData } from './test-data.js';
import { getOfferCards } from './getOfferCards.js';
import { setPageActive } from './pageState.js';
import { } from './addForm.js';

const FORM_CHANGE_STATE_DELAY = 5000;

setPageActive(false);

setTimeout(() => setPageActive(true), FORM_CHANGE_STATE_DELAY);

const data = getRandomTestData(10);

const map = document.querySelector('#map-canvas');
const offers = getOfferCards(data);
map.appendChild(offers.firstChild);
