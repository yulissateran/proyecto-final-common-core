/* global firebase */
let config = {
  apiKey: "AIzaSyDcmv64tywumjoGgm_AJlqzplMAD1bZOwQ",
  authDomain: "registro-de-visitantes-a36f9.firebaseapp.com",
  databaseURL: "https://registro-de-visitantes-a36f9.firebaseio.com",
  projectId: "registro-de-visitantes-a36f9",
  storageBucket: "registro-de-visitantes-a36f9.appspot.com",
  messagingSenderId: "1006043359936"
};
firebase.initializeApp(config);
window.referenceDatabase = firebase.database();
