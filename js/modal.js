const errorModalTemplate = document.querySelector('#error');
const successModalTemplate = document.querySelector('#success');

const clickHandler = (event) => {
  const modalElement = document.querySelector('.error, .success');
  if (event.target === modalElement) {
    // eslint-disable-next-line no-use-before-define
    closeModal();
  }
};

const keyDownHandler = (event) => {
  if (event.key === 'Escape') {
    // eslint-disable-next-line no-use-before-define
    closeModal();
  }
};

const closeModal = () => {
  const modalElement = document.querySelector('.error, .success');

  modalElement.remove();
  document.body.removeEventListener('click', clickHandler);
  document.body.removeEventListener('keydown', keyDownHandler);
};

const openErrorModal = (messageText, buttonText, onClick) => {
  const modal = errorModalTemplate.content
    .querySelector('.error')
    .cloneNode(true);

  const text = modal.querySelector('.error__message');
  const closeButton = modal.querySelector('.error__button');

  if (messageText) {
    text.textContent = messageText;
  }

  if (buttonText) {
    closeButton.textContent = buttonText;
  }

  if (onClick) {
    closeButton.addEventListener('click', onClick);
  }

  closeButton.addEventListener('click', () => {
    closeModal(modal);
  });

  document.body.appendChild(modal);

  document.body.addEventListener('click', clickHandler);
  document.body.addEventListener('keydown', keyDownHandler);
};

const openSuccessModal = () => {
  const modal = successModalTemplate.content
    .querySelector('.success')
    .cloneNode(true);

  document.body.appendChild(modal);

  document.body.addEventListener('click', clickHandler);
  document.body.addEventListener('keydown', keyDownHandler);

};

export { openErrorModal, openSuccessModal };
