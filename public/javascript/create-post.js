const homePage = document.getElementById("home-page");

const gotoHomePage = async (event) => {
  event.preventDefault();

  window.location.replace("/");
};

homePage.addEventListener("click", gotoHomePage);
