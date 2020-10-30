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
  loginInput.style.backgroundColor = ''; // не должны быть здесь
  loginInput.placeholder = ''; // не должны быть здесь

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

    if (loginInput.value) {
    login = loginInput.value;
    toogleModalAuth();

    localStorage.setItem('deliveryUser', login);

    buttonAuth.removeEventListener('click' , toogleModalAuth);

    document.removeEventListener('click', (event) => { //TODO: доделать
      const { target } = event;
      console.log(target.closest);
      if (target=== modalAuth || target === closeAuth) {
        toogleModalAuth();
      }
    })
    
    logInForm.removeEventListener('submit', logIn);
    checkAuth();
  }
  else {
    loginInput.style.backgroundColor = '#ff1e0c87';
    loginInput.placeholder = 'enter login';
  }
  logInForm.reset();
};

document.addEventListener('click', (event) => { //TODO: доделать
  const { target } = event;
  console.log(target);
  if (target=== modalAuth || target === closeAuth) {
    toogleModalAuth();
  }
})
  
  buttonAuth.addEventListener('click' , toogleModalAuth);
  // closeAuth.addEventListener('click' , toogleModalAuth);
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