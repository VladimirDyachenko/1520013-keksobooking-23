import { getAllOffers, renderOffers } from './offers-list.js';
import { debounce } from './utils/debounce.js';

const PriceCategories = {
  'low': (price) => price <= 10000,
  'middle': (price) => price >= 10000 && price <= 50000,
  'high': (price) => price >= 50000,
};

const filterForm = document.querySelector('.map__filters');
const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const featuresFilter = document.querySelector('#housing-features');

const getSelectedFeatures = () => {
  const selectedFeatures = featuresFilter.querySelectorAll('input');
  const features = [];

  for (const option of selectedFeatures.values()) {
    if (option.checked) {
      features.push(option.value);
    }
  }

  return features.length > 0 ? features : false;
};

const filterOffers = () => {
  const offers = getAllOffers();

  const filterConditions = {
    type: {
      value: typeFilter.value !== 'any' ? typeFilter.value : false,
      filterFunction: (offerValue, filterValue) => offerValue === filterValue,
    },
    price: {
      value: priceFilter.value !== 'any' ? priceFilter.value : false,
      filterFunction: (offerValue, filterValue) => PriceCategories[filterValue](offerValue),
    },
    rooms: {
      value: roomsFilter.value !== 'any' ? roomsFilter.value : false,
      filterFunction: (offerValue, filterValue) => offerValue === parseInt(filterValue, 10),
    },
    guests: {
      value: guestsFilter.value !== 'any' ? guestsFilter.value : false,
      filterFunction: (offerValue, filterValue) => {
        if (filterValue === '0' && offerValue > 2) {
          return true;
        }

        if (offerValue === parseInt(filterValue, 10)) {
          return true;
        }

        return false;
      },
    },
    features: {
      value: getSelectedFeatures(),
      filterFunction: (offerFeatures, selectedFilterFeatures) => {

        if (offerFeatures === undefined) {
          return false;
        }

        for (const feature of selectedFilterFeatures) {
          if (!offerFeatures.includes(feature)) {
            return false;
          }
        }
        return true;
      },
    },
  };

  const filtredList = offers.filter(({ offer }) => {
    for (const condition in filterConditions) {
      let check = true;
      if (filterConditions[condition].value) {
        check = filterConditions[condition].filterFunction(offer[condition], filterConditions[condition].value);
      }
      if (check === false) {
        return false;
      }
    }

    return true;
  });

  renderOffers(filtredList);
};

filterForm.addEventListener('change', debounce(() => filterOffers()));
