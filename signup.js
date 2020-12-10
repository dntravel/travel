const signup2HTML = `<div id="firebase-auth">
  <div id="firebaseui-auth-container">
    <h3 id="auth-titile">
      See all experiences and create your amazing holiday!
    </h3>
    <ul id="authMethods">
      <li
        class="firebaseui-list-item auth-button email-next"
        style="display: none"
      >
        <input type="email" id="email-input" placeholder="Email" />
      </li>
      <li
        class="firebaseui-list-item auth-button email-next"
        style="display: none"
      >
        <input type="password" id="password-input" placeholder="Password" />
      </li>

      <li
        id="email"
        class="firebaseui-list-item auth-button"
        style="display: none"
      >
        <button
          class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button"
          data-provider-id="password"
          style="background-color: #db4437"
          data-upgraded=",MaterialButton"
        >
          <span class="firebaseui-idp-icon-wrapper"
            ><img
              class="firebaseui-idp-icon"
              alt=""
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg" /></span
          ><span class="firebaseui-idp-text firebaseui-idp-text-long"
            >Sign in with email</span
          ><span class="firebaseui-idp-text firebaseui-idp-text-short"
            >Email</span
          >
        </button>
      </li>
      <li id="email-click" class="firebaseui-list-item auth-button">
        <button
          class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button"
          data-provider-id="password"
          style="background-color: #db4437"
          data-upgraded=",MaterialButton"
        >
          <span class="firebaseui-idp-icon-wrapper"
            ><img
              class="firebaseui-idp-icon"
              alt=""
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg" /></span
          ><span class="firebaseui-idp-text firebaseui-idp-text-long"
            >Sign in with email</span
          ><span class="firebaseui-idp-text firebaseui-idp-text-short"
            >Email</span
          >
        </button>
      </li>
      <li id="google" class="firebaseui-list-item auth-button">
        <button
          class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button"
          data-provider-id="google.com"
          style="background-color: #ffffff"
          data-upgraded=",MaterialButton"
        >
          <span class="firebaseui-idp-icon-wrapper"
            ><img
              class="firebaseui-idp-icon"
              alt=""
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" /></span
          ><span class="firebaseui-idp-text firebaseui-idp-text-long"
            >Sign in with Google</span
          ><span class="firebaseui-idp-text firebaseui-idp-text-short"
            >Google</span
          >
        </button>
      </li>
      <li id="facebook" class="firebaseui-list-item auth-button">
        <button
          class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-facebook firebaseui-id-idp-button"
          data-provider-id="facebook.com"
          style="background-color: #3b5998"
          data-upgraded=",MaterialButton"
        >
          <span class="firebaseui-idp-icon-wrapper"
            ><img
              class="firebaseui-idp-icon"
              alt=""
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" /></span
          ><span class="firebaseui-idp-text firebaseui-idp-text-long"
            >Sign in with Facebook</span
          ><span class="firebaseui-idp-text firebaseui-idp-text-short"
            >Facebook</span
          >
        </button>
      </li>
    </ul>
  </div>
</div>
`;

const createSignUpWindow2 = (() => {
  const parent = document.querySelector(".parent");
  const createSignUp2 = document.createElement("div");
  createSignUp2.classList.add("signup2-section");
  createSignUp2.innerHTML = signup2HTML;
  createSignUp2.setAttribute("hidden", "");
  parent.appendChild(createSignUp2);

  next.addEventListener("click", () => {
    if (!Auth.currentUser) {
      loadLogInEventListeners(true);
      createSignUp2.removeAttribute("hidden");
    }
  });
})();

// SESSION STORAGE FUNCTIONS
const authenticated = () => JSON.parse(sessionStorage.getItem("Authenticated"));

// LOCAL STORAGE FUNCTIONS
const localStorageFunction = (() => {
  const getLocalUser = () => JSON.parse(localStorage.getItem("User"));
  const setLocalUser = () =>
    localStorage.setItem("User", JSON.stringify(localUser));

  const localUser = getLocalUser()
    ? getLocalUser()
    : {
        email: "",
        uid: "",
        photoURL: "",
        experiences: [],
        viewed: [],
      };

  const setUser = (result) => {
    localUser.email = result.email;
    localUser.uid = result.uid;
    localUser.photoURL = result.photoURL;
    setLocalUser();
  };

  const setExperience = (arr) => {
    localUser.experiences = arr;
    setLocalUser();
  };

  const editExperience = (but) => {
    let exp = {
      tripID: experience.tripID(but),
      expID: experience.expID(but),
    };

    let inx = experience.experiencePrevSelected(
      localUser.experiences,
      exp.tripID,
      exp.expID
    );

    inx === -1
      ? localUser.experiences.push(exp)
      : localUser.experiences.splice(inx, 1);

    localUser.experiences.sort((a, b) => {
      let tripA = Number(a.tripID),
        tripB = Number(b.tripID),
        expA = Number(a.expID),
        expB = Number(b.expID);

      if (tripA < tripB) return -1;
      if (tripA > tripB) return 1;

      if (expA < expB) return -1;
      if (expA > expB) return 1;
    });

    setLocalUser();
  };

  const tripsViewed = () => {
    let tripID = document
      .querySelector(".itin-exp-btns_txt")
      .getAttribute("data-tripid");

    let viewed = localUser.viewed;

    if (!viewed) {
      viewed = [tripID];
    } else {
      if (viewed.indexOf(tripID) === -1) {
        viewed.push(tripID);
      } else return;
    }

    localUser.viewed = viewed;

    setLocalUser();
  };

  return {
    localUser,
    getLocalUser,
    setLocalUser,
    setUser,
    setExperience,
    editExperience,
    tripsViewed,
  };
})();

// SIGN IN CREDENTIALS
const credentialAuth = (() => {
  const local = localStorageFunction.localUser;
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");

  let email = "";
  let password = "";

  const emailChangeOnInput = () => {
    if (/@gmail.com$/.test(emailInput.value)) {
      email = normalizeGmail(emailInput.value);
    } else {
      email = emailInput.value;
    }
  };

  const inputEventListeners = (boo) => {
    if (boo) {
      emailInput.addEventListener("input", () => emailChangeOnInput());
      passwordInput.addEventListener(
        "input",
        () => (password = passwordInput.value)
      );
    } else {
      emailInput.removeEventListener("input", () => emailChangeOnInput());
      passwordInput.removeEventListener(
        "input",
        () => (password = passwordInput.value)
      );
    }
  };

  const normalizeGmail = (str) => {
    const inx = str.indexOf("@");
    return str.substring(0, inx).replace(".", "") + str.substring(inx);
  };

  const signIn = async () => {
    await Auth.signInWithEmailAndPassword(email, password).catch(() =>
      signUp()
    );
  };

  const signUp = async () => {
    await Auth.createUserWithEmailAndPassword(email, password).catch(
      (error) => {
        // ADD IF EMAIL USED IS IN DB
        const enteredEmailStored = email === local.email;
        if (error.code === "auth/email-already-in-use" || enteredEmailStored) {
          link();
        }
      }
    );
  };

  const link = async () => {
    const credentials = await firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    await providerAuth.LogInToLink();
    await Auth.currentUser
      .linkWithCredential(await credentials)
      .then((result) => {
        if (!local.photoURL) {
          local.photoURL = result.user.photoURL;
        }
      })
      .catch();
  };

  return {
    signIn,
    inputEventListeners,
  };
})();

// SIGN IN PROVIDER
const providerAuth = (() => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const authMethods = [googleProvider, facebookProvider];

  const assign = (button) => {
    button.id === "google" ? signIn(googleProvider) : signIn(facebookProvider);
  };

  const signIn = (provider) => {
    return Auth.signInWithPopup(provider)
      .then((result) => {
        if (result) return true;
      })
      .catch();
  };

  const linkWithProvider = (provider) => {
    return Auth.currentUser
      .linkWithPopup(provider)
      .catch(() => linkWithProvider(provider));
  };

  const LogInToLink = async () => {
    for (i = 0; i < authMethods.length - 1; i++) {
      if (await signIn(authMethods[i])) {
        break;
      }
    }
  };

  return {
    assign,
    signIn,
    LogInToLink,
  };
})();

// EXPERIENCE BUTTON CONTROLS
const experience = (() => {
  const expID = (but) => but.getAttribute("data-experienceid");
  const tripID = (but) => but.getAttribute("data-tripid");

  const showSelectedExperience = (but, boolean) => {
    but.setAttribute("data-experience-selected", `${boolean}`);
    but.innerHTML = boolean
      ? `<i class="fa fa-heart" aria-hidden="true"></i>  REMOVE FROM LIST`
      : `<i class="fa fa-heart-o" aria-hidden="true"></i>  ADD TO LIST`;
  };

  const toggle = (but) => {
    const expSelected = but.getAttribute("data-experience-selected");
    expSelected === "false"
      ? showSelectedExperience(but, true)
      : showSelectedExperience(but, false);

    bubble.edit(but);
    localStorageFunction.editExperience(but);
  };

  const initializeButton = (but, trip, exp) => {
    but.setAttribute("data-experience-selected", "false");
    but.setAttribute("data-tripid", trip);
    but.setAttribute("data-experienceid", exp);
    but.addEventListener("click", () => {
      toggle(but);
      if (!Auth.currentUser) {
        showSignIn(true);
      }
    });
  };
  const buttonInfo = (but) => {
    const experienceInfo = but
      .closest(".w-dyn-item")
      .querySelector("[data-gallery='true']");
    const trip = tripID(experienceInfo);
    const exp = expID(experienceInfo);
    initializeButton(but, trip, exp);
  };

  const experiencePrevSelected = (arr, trip, exp) => {
    return arr.findIndex((x) => x.tripID === trip && x.expID === exp);
  };

  const experienceButtons = document.querySelectorAll(".itin-exp-btns_txt");

  experienceButtons.forEach((but) => {
    buttonInfo(but);
  });

  const expButtons = async (arr) => {
    experienceButtons.forEach(async (but) => {
      let tripId = tripID(but);
      let expId = expID(but);
      if (Auth.currentUser || authenticated()) {
        if (experiencePrevSelected(arr, tripId, expId) >= 0) {
          showSelectedExperience(but, true);
        }
      } else {
        showSelectedExperience(but, false);
      }
    });
  };

  return {
    expID,
    tripID,
    toggle,
    expButtons,
    experiencePrevSelected,
  };
})();

const bubble = (() => {
  let userId = localStorageFunction.localUser.uid;

  const pull = async () => {
    const getExperiences = await Functions.httpsCallable("getExperiences");
    const userExp = await getExperiences({
      uid: userId,
    })
      .then((data) => data)
      .catch();

    const experienceArray = await userExp.data.experiences;

    return await experienceArray;
  };

  const edit = async (but) => {
    if (!Auth.currentUser) return;

    const editExperiences = Functions.httpsCallable("editExperience");

    editExperiences({
      userID: userId,
      tripID: experience.tripID(but),
      experienceID: experience.expID(but),
    }).catch();
  };

  const register = async (user) => {
    const signUp = Functions.httpsCallable("signUp");

    signUp({
      email: user.email,
      userID: userId,
    }).catch();
  };

  const connect = async (user) => {
    const getUser = Functions.httpsCallable("getUser");
    const currentUser = await getUser({ email: user.email })
      .then((res) => res.data.userFound)
      .catch();

    if (await currentUser.count) {
      userId = currentUser.results[0].UserID;
      await pull()
        .then((arr) => {
          sessionStorage.setItem("Authenticated", "true");
          experience.expButtons(arr);
          localStorageFunction.setExperience(arr);
        })
        .catch();
    } else {
      await register(user)
        .then(() => {
          edit(document.querySelector("[data-experience-selected='true']"));
          sessionStorage.setItem("Authenticated", "true");
        })
        .catch();
    }
  };

  return {
    edit,
    pull,
    connect,
  };
})();

// const toggleSignIn = (boolean) => {
//   const logInOutDiv = document.getElementById("signin");

//   if (boolean) {
//     logInOutDiv.innerHTML = `<a id="log-in" href="#" class="nav-link w-nav-link">Sign In</a>`;
//     const logInButton = document.getElementById("log-in");
//     logInButton.addEventListener("click", () => showSignIn(true));
//   } else {
//     logInOutDiv.innerHTML = `<div id="user-pic" class="nav-link w-nav-link" ></div>`;
//     const userPic = document.getElementById("user-pic");
//     userPic.style.backgroundImage = `url("${Auth.currentUser.photoURL}")`;
//   }
// };

const signup1 = document.querySelector(".signup1-section");
const signup2 = document.querySelector(".signup2-section");

const loadLogInEventListeners = (boo) => {
  const google = document.querySelectorAll("#google");
  const facebook = document.querySelectorAll("#facebook");
  const emailAuth = document.getElementById("email");
  const emailNext = [...document.querySelectorAll(".email-next")];
  const emailClick = document.getElementById("email-click");
  const providers = [...google, ...facebook];

  if (boo) {
    credentialAuth.inputEventListeners(true);
    emailAuth.addEventListener("click", () => credentialAuth.signIn());
    emailClick.addEventListener("click", () => {
      emailNext.forEach((elm) => (elm.style.display = "block"));
      providers.forEach((elm) => (elm.style.display = "none"));
      emailClick.style.display = "none";
      emailAuth.style.display = "block";
    });
    providers.forEach((but) => {
      but.addEventListener("click", () => providerAuth.assign(but));
    });
  } else {
    credentialAuth.inputEventListeners(false);
    emailAuth.removeEventListener("click", () => credentialAuth.signIn());
    emailNext.forEach((elm) => (elm.style.display = "none"));
    providers.forEach((but) => {
      but.removeEventListener("click", () => providerAuth.assign(but));
      but.style.display = "block";
    });
    emailClick.style.display = "block";
    emailAuth.style.display = "none";
  }
};

const showSignIn = (boo) => {
  if (boo) {
    loadLogInEventListeners(true);
    signup1.style.display = "block";
    signup1.style.zIndex = 99;
  } else {
    loadLogInEventListeners(false);
    signup1.style.display = "none";
    signup2.setAttribute("hidden", "");
  }
};

if (authenticated()) {
  const exps = localStorageFunction.localUser.experiences;
  experience.expButtons(exps);
} else {
  Auth.onAuthStateChanged((user) => {
    if (user) {
      localStorageFunction.setUser(user);
      showSignIn(false);
      bubble.connect(user);
    }
  });
}

localStorageFunction.tripsViewed();
