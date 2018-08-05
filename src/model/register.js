/* global firebase */
let config = {
  apiKey: 'AIzaSyCGQvJrcWt8bQ7wB3A2AXqkHqld-NYAVJw',
  authDomain: 'social-network-967b3.firebaseapp.com',
  databaseURL: 'https://social-network-967b3.firebaseio.com',
  projectId: 'social-network-967b3',
  storageBucket: 'social-network-967b3.appspot.com',
  messagingSenderId: '25029310975'
};
firebase.initializeApp(config);
/* *****************************************************Variables************************************************************************/
const refPicturesBd = firebase.database().ref('pictures');
const camera = document.getElementById('video');
const currentimg = document.getElementById('img');
const canvas = document.getElementById('canvas');
/* ***************************************************Acceso a la cámara***************************************************************/
navigator.mediaDevices.getUserMedia({ 
  audio: false, 
  video: true 
}).then((stream) => {
  camera.srcObject = stream;
  camera.onloadedmetadata = () => camera.play();
}).catch((error) => {
  console.log(error);
});
/* ******************************************************Toma fotos**********************************************************************/
window.takePicture = () => {
  canvas.getContext('2d').drawImage(camera, 0, 0, 300, 150);
  let img = canvas.toDataURL('image/png');
  refPicturesBd.push({
    url: img
  });
  currentimg.setAttribute('src', img);
};
/* *********************************************borra fotos**********************/
const remove = (keyImagen) => {
  refPicturesBd.child(keyImagen).remove();
};

/* **************************************Muestra fotos*********************************************************/
refPicturesBd.on('value', (snapshot) => {
  document.getElementById('divImagenes').innerHTML = '';
  snapshot.forEach(element => {
    if (element.val().url) {
      document.getElementById('divImagenes').innerHTML += `
      <div>
      <img src=${element.val().url}/><br/>
      <button id="${element.key}" onclick="remove('${element.key}')">Borrar</button>
      </div>`;
    }
  });
});

