import { setPageActive } from './page-state.js';
import { setAddressInputValue } from './add-form.js';
import { getOfferCard } from './get-offer-card.js';

const Leaflet = window.L;

const INITIAL_MAP_OPTIONS = {
  lat: 35.680725,
  lng: 139.755707,
  zoomLevel: 14,
};

const ADDRESS_SELECT_ICON = Leaflet.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const OFFER_ICON = Leaflet.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

setPageActive(false);

const map = Leaflet
  .map('map-canvas')
  .on('load', () => setPageActive(true))
  .setView(
    {
      lat: INITIAL_MAP_OPTIONS.lat,
      lng: INITIAL_MAP_OPTIONS.lng,
    },
    INITIAL_MAP_OPTIONS.zoomLevel,
  );

Leaflet.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://openstreetmap.org/copyright"> OpenStreetMap</a> contributors',
  },
).addTo(map);

const addressSelect = Leaflet.marker(
  {
    lat: INITIAL_MAP_OPTIONS.lat,
    lng: INITIAL_MAP_OPTIONS.lng,
  },
  {
    draggable: true,
    icon: ADDRESS_SELECT_ICON,
  },
).addTo(map);

addressSelect.on('moveend', (event) => {
  const { lat, lng } = event.target.getLatLng();
  setAddressInputValue(`${lat}, ${lng}`);
});

const offerMarkersGroup = Leaflet.layerGroup().addTo(map);

const addOffersToMap = (data) => {

  for (const offerObject of data) {
    const { lat, lng } = offerObject.location;

    const marker = Leaflet.marker(
      {
        lat,
        lng,
      }, {
        icon: OFFER_ICON,
      },
    );

    marker
      .addTo(offerMarkersGroup)
      .bindPopup(getOfferCard(offerObject));
  }
};

const resetMap = () => {
  map.setView(
    {
      lat: INITIAL_MAP_OPTIONS.lat,
      lng: INITIAL_MAP_OPTIONS.lng,
    },
    INITIAL_MAP_OPTIONS.zoomLevel,
  );

  addressSelect.setLatLng(
    {
      lat: INITIAL_MAP_OPTIONS.lat,
      lng: INITIAL_MAP_OPTIONS.lng,
    },
  );

};

export { addOffersToMap, resetMap };
