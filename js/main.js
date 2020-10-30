const cartButton = document.querySelector('#cart-button');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
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
    loginInput.style.backgroundColor = '';
    loginInput.placeholder = '';

    if (loginInput.value) {
    login = loginInput.value;
    toogleModalAuth();

    localStorage.setItem('deliveryUser', login);

    buttonAuth.removeEventListener('click' , toogleModalAuth);
    closeAuth.removeEventListener('click' , toogleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();
  }
  else {
    loginInput.style.backgroundColor = '#ff1e0c87';
    loginInput.placeholder = 'enter login';
  }
  checkAuth();
}
  
  buttonAuth.addEventListener('click' , toogleModalAuth);
  closeAuth.addEventListener('click' , toogleModalAuth);
  logInForm.addEventListener('submit', logIn);
};

const checkAuth = () => { // TODO: сделать самовызывающейся;
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
};

checkAuth();