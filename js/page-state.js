const disableAddForm = () => {
  const form = document.querySelector('.ad-form');
  const fildsets = form.querySelectorAll('fieldset');

  form.classList.add('ad-form--disabled');
  fildsets.forEach((fieldset) => fieldset.disabled = true);
};

const enableAddForm = () => {
  const form = document.querySelector('.ad-form');
  const fildsets = form.querySelectorAll('fieldset');

  form.classList.remove('ad-form--disabled');
  fildsets.forEach((fieldset) => fieldset.disabled = false);
};

const disableFilterForm = () => {
  const form = document.querySelector('.map__filters');
  const inputs = form.querySelectorAll('.map__filter, .map__features');

  form.classList.add('map__filters--disabled');
  inputs.forEach((fieldset) => fieldset.disabled = true);
};

const enableFilterForm = () => {
  const form = document.querySelector('.map__filters');
  const inputs = form.querySelectorAll('.map__filter, .map__features');

  form.classList.remove('map__filters--disabled');
  inputs.forEach((fieldset) => fieldset.disabled = false);
};

const setPageActive = (isActive) => {
  if (isActive) {
    enableAddForm();
    enableFilterForm();
    return;
  }

  disableAddForm();
  disableFilterForm();
};

export { setPageActive };
