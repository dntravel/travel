const firebaseConfig = {
  apiKey: "AIzaSyBRZfDCC3YyZutj-lOnDxhq4n7u9AtOkCs",
  authDomain: "travel-895d5.firebaseapp.com",
  databaseURL: "https://travel-895d5.firebaseio.com",
  projectId: "travel-895d5",
  storageBucket: "travel-895d5.appspot.com",
  messagingSenderId: "74709196792",
  appId: "1:74709196792:web:d37d5c4069c2191b46c00d",
};
// FIREBASE INIT
firebase.initializeApp(firebaseConfig);
const Auth = firebase.auth();
const Functions = firebase.functions();

// FACEBOOK INIT
const facebookInit = () => {
  window.fbAsyncInit = function () {
    FB.init({
      appId: 185191803291906,
      cookie: true,
      xfbml: true,
      version: "v9.0",
    });

    FB.AppEvents.logPageView();
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};
