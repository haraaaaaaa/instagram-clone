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
modal.classList.add('hidden');

btnShare.addEventListener('click', (event) => {
  event.preventDefault();
  modal.classList.remove('hidden');
});

noBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});
