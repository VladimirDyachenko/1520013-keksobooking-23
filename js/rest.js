const METHODS = {
  GET: 'GET',
  POST: 'POST',
};

const OFFERS_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const CREATE_OFFER_URL = 'https://23.javascript.pages.academy/keksobooking';

const sendRequest = (url, method, body) => fetch(url, { method, credentials: 'same-origin', body });

const getOffersFromServer = (onSuccess, onError) => sendRequest(OFFERS_URL, METHODS.GET)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((json) => onSuccess(json))
  .catch((error) => onError(error));

const submitAddForm = (onSuccess, onError, formData) => sendRequest(CREATE_OFFER_URL, METHODS.POST, formData)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(response);
  })
  .then((json) => onSuccess(json))
  .catch((error) => onError(error));

export { getOffersFromServer, submitAddForm };
