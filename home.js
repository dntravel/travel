const destinations = [
  { link: "barcelona1", id: "1", display: "Barcelona" },
  { link: "venice1", id: "2", display: "Venice" },
  { link: "paris1", id: "3", display: "Paris" },
];

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

const welcomeBack = (n) => {
  const message = document.getElementById("welcome-back");
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
  console.log("retuser");
  firebaseCall()
    .pull()
    .then((exps) => {
      const tripIds = trips(exps);
      destinationList(tripIds);
      loadingDiv.style.display = "none";
      returnDiv.style.display = "block";
      user.experiences = exps;
      user.name = Auth.currentUser.displayName
        ? Auth.currentUser.displayName
        : "";
      localStorage.setItem("User", JSON.stringify(user));
      sessionStorage.setItem("Authenticated", JSON.stringify(true));
    });
};

const returnHome = () => {
  console.log("rethome");
  const experiences = user.experiences;
  const tripIds = trips(experiences);
  destinationList(tripIds);
  loadingDiv.style.display = "none";
  returnDiv.style.display = "block";
};

const newUser = () => {
  loadingDiv.style.display = "none";
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
