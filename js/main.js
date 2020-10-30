const cartButton = document.getElementById('cart-button');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.getElementById('logInForm');
const loginInput = document.getElementById('login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');


let login = localStorage.getItem('deliveryUser');

const toggleModal = () => {
  modal.classList.toggle('is-open');
};

cartButton.addEventListener('click', toggleModal);
close.addEventListener('click', toggleModal);


const toogleModalAuth = () => {
  modalAuth.classList.toggle('is-open');
  if (modalAuth.classList.contains('is-open')) {
    disableScroll();
  } else {
    enableScroll();
  }
};

const authorized = () => {
  const logOut = () => {
    login = null;
    localStorage.removeItem('deliveryUser');

    buttonOut.removeEventListener('click', logOut);

    checkAuth();

    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
  };

  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);
};

const notAuthorized = () => {
  const logIn = (event) => {
    event.preventDefault();

    if (loginInput.value.trim()) {
    login = loginInput.value;
    toogleModalAuth();

    localStorage.setItem('deliveryUser', login);

    buttonAuth.removeEventListener('click' , toogleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    buttonAuth.removeEventListener('click', clearForm);
    modalAuth.removeEventListener('click', (event) => {
      if (event.target.classList.contains('is-open')) {
        toogleModalAuth();
      }
    });
    checkAuth();
  } else {
    loginInput.style.backgroundColor = '#ff1e0c87';
    loginInput.placeholder = 'enter login';
    loginInput.value = '';
  }

};

  
  buttonAuth.addEventListener('click' , toogleModalAuth);
  closeAuth.addEventListener('click' , toogleModalAuth);
  buttonAuth.addEventListener('click', clearForm);
  modalAuth.addEventListener('click', (event) => {
    if (event.target.classList.contains('is-open')) {
      toogleModalAuth();
    }
  });
  logInForm.addEventListener('submit', logIn);
};

const clearForm = () => {
  loginInput.style.backgroundColor = '';
  loginInput.placeholder = '';
  logInForm.reset();

};


const checkAuth = () => { // TODO: сделать самовызывающейся;
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
};

checkAuth();