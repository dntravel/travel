const tripUrlSection = document.getElementById("TRIPID-URLS");
const tripUrlElements =
  tripUrlSection.firstElementChild.firstElementChild.children;

const destinations = [...tripUrlElements].map((elm) => {
  let display = elm.firstElementChild.innerHTML;
  let id = elm.firstElementChild.nextElementSibling.innerHTML;
  let url = elm.lastElementChild.innerHTML.trim();
  let link = url.substr(url.lastIndexOf("/"));

  return {
    link,
    id,
    display,
  };
});

let user = JSON.parse(localStorage.getItem("User"));

const authenticated = () => JSON.parse(sessionStorage.getItem("Authenticated"));
const trips = (exp) => [...new Set(exp.map((exp) => exp.tripID))];

const returnDiv = document.querySelector(".home-return-sect");
const loadingDiv = document.querySelector(".home-loading-sect");
const newDiv = document.querySelector(".home-1stvisit-sect");

const firebaseCall = () => {
  const pull = async () => {
    const getExperiences = await Functions.httpsCallable("getExperiences");
    const userExp = await getExperiences({
      uid: user.uid,
    })
      .then((data) => data)
      .catch();

    const experienceArray = await userExp.data.experiences;

    return await experienceArray;
  };

  return {
    pull,
  };
};

const home = async (exps) => {
  const tripIds = exps.length ? trips(exps) : user.viewed;
  destinationList(tripIds);
  loadingDiv.style.display = "none";
  newDiv.style.display = "none ";
  returnDiv.style.display = "block";
  user.experiences = exps;
  localStorage.setItem("User", JSON.stringify(user));
};

const welcomeBack = (n) => {
  const message = document.querySelector(".home-return-welcome_txt");
  const name = " " + n[0].toUpperCase() + n.substring(1, n.indexOf(" "));
  message.innerHTML = `Welcome Back${name}!`;
};

const destinationList = (arr) => {
  const locationList = document.getElementById("destinations");
  if (user.name) welcomeBack(user.name);

  arr.forEach((desId) => {
    let trip = destinations.find((obj) => obj.id === desId);
    let listitem = document.createElement("li");

    let link = document.createElement("a");
    link.href = trip.link;
    link.classList.add("homepage-link", "w-inline-block");
    link.innerText = trip.display;

    listitem.appendChild(link);
    locationList.appendChild(listitem);
  });
};

const returnUser = () => {
  firebaseCall()
    .pull()
    .then((exps) => {
      home(exps);
      sessionStorage.setItem("Authenticated", JSON.stringify(true));
    });
};

const returnHome = () => {
  const exps = user.experiences;
  home(exps);
};

const newUser = () => {
  loadingDiv.style.display = "none";
  returnDiv.style.display = "none";
  newDiv.style.display = "block ";
};

if (authenticated()) {
  returnHome();
} else {
  Auth.onAuthStateChanged((user) => {
    if (user) {
      returnUser();
    } else {
      newUser();
    }
  });
}
