const METHODS = {
  GET: 'GET',
  POST: 'POST',
};

const OFFERS_URL = 'https://23.javascript.pages.academy/keksobooking/data';

const sendRequest = (url, method) => fetch(url, { method, credentials: 'same-origin' });

const getOffersFromServer = (onSuccess, onError) => sendRequest(OFFERS_URL, METHODS.GET)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((json) => {
    onSuccess(json);
  })
  .catch((error) => {
    onError(error);
  });

export { getOffersFromServer };
