import { submitAddForm } from './rest.js';
import { openSuccessModal, openErrorModal } from './modal.js';
import { resetMap } from './map.js';

const addForm = document.querySelector('.ad-form');
const titleInput = addForm.querySelector('[id="title"]');
const priceInput = addForm.querySelector('[id="price"]');
const roomsInput = addForm.querySelector('[id="room_number"]');
const typeInput = addForm.querySelector('[id="type"]');
const capacityInput = addForm.querySelector('[id="capacity"]');
const resetButton = addForm.querySelector('.ad-form__reset');
const timeFieldSet = addForm.querySelector('[id="timein"]').parentNode;
const addressInput = addForm.querySelector('[id="address"]');
const photoPickers = document.querySelectorAll('input[type="file"]');
const avatarPreview = document.querySelector('.ad-form-header__preview > img');
const offerPhoto = document.querySelector('.ad-form__photo');

const TITLE_MIN_LENGTH = titleInput.minLength !== -1 ? titleInput.minLength : 30;
const TITLE_MAX_LENGTH = titleInput.maxLength !== -1 ? titleInput.maxLength : 100;
const MAX_PRICE = 1000000;
const MIN_PRICES = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const ROOM_CAPACITY = {
  '1': {
    capacityOptions: ['1'],
    errorMessage: 'Только для одного гостя',
  },
  '2': {
    capacityOptions: ['1', '2'],
    errorMessage: 'Не больше двух гостей',
  },
  '3': {
    capacityOptions: ['1', '2', '3'],
    errorMessage: 'Не больше трех гостей',
  },
  '100': {
    capacityOptions: ['0'],
    errorMessage: 'Выбранное количество комнат подходит только для "Не для гостей"',
  },
};
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'] ;

// Валидация полей
const isTitleValid = () => {
  const titleLength = titleInput.value.length;
  const isValid = titleLength >= TITLE_MIN_LENGTH && titleLength <= TITLE_MAX_LENGTH;

  const validity = titleInput.validity;

  if (validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else if (validity.tooShort) {
    titleInput.setCustomValidity(`Минимум ${TITLE_MIN_LENGTH} символов, нехватает ${TITLE_MIN_LENGTH - titleLength}`);
  } else if (validity.tooLong) {
    titleInput.setCustomValidity(`Максимум ${TITLE_MAX_LENGTH} символов`);
  } else {
    titleInput.setCustomValidity('');
  }

  return isValid;
};

const isPriceValid = () => {
  const minPrice = MIN_PRICES[typeInput.value];
  let isValid = true;

  if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле');
    isValid = false;
  } else if (minPrice > priceInput.value) {
    priceInput.setCustomValidity(`Минимальная цена для этого типа жилья: ${minPrice}₽`);
    isValid = false;
  } else if (priceInput.value > MAX_PRICE) {
    priceInput.setCustomValidity(`Максимальная цена для этого типа жилья: ${MAX_PRICE}₽`);
    isValid = false;
  } else {
    priceInput.setCustomValidity('');
  }

  return isValid;
};

const isCapacityValid = () => {
  const rooms = roomsInput.value;
  const capacity = capacityInput.value;
  const isValid = ROOM_CAPACITY[rooms].capacityOptions.includes(capacity);

  if (!isValid) {
    capacityInput.setCustomValidity(ROOM_CAPACITY[rooms].errorMessage);
  } else {
    capacityInput.setCustomValidity('');
  }

  return isValid;
};

const isFormValid = () => {
  let isValid = true;

  if (!isTitleValid()) {
    isValid = false;
  }

  if (!isPriceValid()) {
    isValid = false;
  }

  if (!isCapacityValid()) {
    isValid = false;
  }

  return isValid;
};


// Обработка событий ввода
const handleTitleInput = () => {
  isTitleValid();
};

titleInput.addEventListener('input', handleTitleInput);

const handleTypeInput = () => {
  const selected = typeInput.value;
  const minPrice = MIN_PRICES[selected];

  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
  isPriceValid();
  priceInput.reportValidity();
};

typeInput.addEventListener('input', handleTypeInput);

const handlePriceInput = () => {
  isPriceValid();
  priceInput.reportValidity();
};

priceInput.addEventListener('input', handlePriceInput);

const handleRoomsInput = () => {
  const roomsAmount = roomsInput.value;
  const capacityOptions = capacityInput.querySelectorAll('option');

  for (const option of capacityOptions) {
    if (ROOM_CAPACITY[roomsAmount].capacityOptions.includes(option.value)) {
      option.disabled = false;
    } else {
      option.disabled = true;
    }
  }
  isCapacityValid();
  capacityInput.reportValidity();
};

roomsInput.addEventListener('input', handleRoomsInput);

const handleCapacityChange = () => {
  isCapacityValid();
};

capacityInput.addEventListener('change', handleCapacityChange);

const handleTimeInput = (event) => {
  const timeInSelect = timeFieldSet.querySelector('[id="timein"]');
  const timeOutSelect = timeFieldSet.querySelector('[id="timeout"]');

  const selectToUpdate =
    event.target === timeInSelect ? timeOutSelect : timeInSelect;

  selectToUpdate.value = event.target.value;
};

timeFieldSet.addEventListener('change', handleTimeInput);

const resetForm = () => {
  addForm.reset();
  resetMap();
};

const handleErrorSubmit = () => {
  openErrorModal();
};

const handleSuccessfullySubmit = () => {
  resetForm();
  openSuccessModal();
};

const handleSubmit = async (event) => {
  event.preventDefault();
  if (!isFormValid()) {
    addForm.reportValidity();
    return;
  }

  const formData = new FormData(event.target);

  await submitAddForm(handleSuccessfullySubmit, handleErrorSubmit, formData);
};

resetButton.addEventListener('click', resetForm);

addForm.addEventListener('submit', handleSubmit);

addressInput.classList.add('ad-form--disabled');

const setAddressInputValue = (newValue) => {
  addressInput.value = newValue;
};

const createPreview = (image, inputElement) => {

  if (inputElement.id === 'avatar') {
    avatarPreview.src = image;
    return;
  }

  const previewImage = document.createElement('img');
  previewImage.src = image;
  previewImage.alt = 'Фотография жилья';
  previewImage.width = 70;
  previewImage.height = 70;
  if (offerPhoto.firstChild) {
    offerPhoto.replaceChild(previewImage, offerPhoto.firstChild);
  }
  offerPhoto.appendChild(previewImage);
};

const handlePhotoChange = (event) => {

  const file = event.target.files[0];

  if (file) {
    const fileName = file.name.toLowerCase();
    const match = FILE_TYPES.some((extension) => fileName.endsWith(extension));

    if (match) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        createPreview(reader.result, event.target);
      });

      reader.readAsDataURL(file);
    }
  }
};

photoPickers.forEach((element) => element.addEventListener('change', handlePhotoChange));

export { setAddressInputValue };
