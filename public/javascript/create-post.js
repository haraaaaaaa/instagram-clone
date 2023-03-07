const homePage = document.getElementById("home-page");

const gotoHomePage = async (event) => {
  event.preventDefault();

  window.location.replace("/");
};

homePage.addEventListener("click", gotoHomePage);

// Modal 

// Selectors
const btnShare = document.getElementById('share');
const modal = document.getElementById('modal');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

// Event Listeners
btnShare.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

yesBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

noBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});
