/* global firebase */
// Initialize Firebase
let config = {
  apiKey: 'AIzaSyCGQvJrcWt8bQ7wB3A2AXqkHqld-NYAVJw',
  authDomain: 'social-network-967b3.firebaseapp.com',
  databaseURL: 'https://social-network-967b3.firebaseio.com',
  projectId: 'social-network-967b3',
  storageBucket: 'social-network-967b3.appspot.com',
  messagingSenderId: '25029310975'
};
firebase.initializeApp(config);
/* *****************************************************************Variables************************************************************************/
let TablaDeBaseDatos = firebase.database().ref('pictures');
let video = document.getElementById('video');
let currentimg = document.getElementById('img');
let button = document.getElementById('button');
let canvas = document.getElementById('canvas');
/* ***************************************************************Acceso a la cámara***************************************************************/
navigator.mediaDevices.getUserMedia({ 
  audio: false, 
  video: true 
}).then((stream) => {
  let video = document.getElementById('video');
  video.src = window.URL.createObjectURL(stream);
  video.onloadedmetadata = () => video.play();
  video.addEventListener('loadedmetadata', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  });
}).catch((error) => {
  console.log(error);
});
/* **********************************************************************Redimensiona fotos*************************************************************/
const redimensionar = (srcData, width, height) => {
  let imageObj = new Image();
  imageObj.src = srcData;
  let canvas = document.createElement('canvas');
  let canvasGetContext = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  let xStart = 0;
  let yStart = 0;
  let aspectRadio = imageObj.height / imageObj.width;
  let newWidth;
  let newHeight;
  if (imageObj.height < imageObj.width) {
    aspectRadio = imageObj.width / imageObj.height;
    newHeight = height;
    newWidth = aspectRadio * height;
    xStart = -(newWidth - width) / 2;
  } else {
    newWidth = width,
    newHeight = aspectRadio * width;
    yStart = -(newHeight - height) / 2;
  }
  canvasGetContext.drawImage(imageObj, xStart, yStart, newWidth, newHeight);
  return canvas.toDataURL('image/jpeg', 0.75);
};
/* *********************************************************************Toma fotos**********************************************************************/
const tomarFoto = () => {
  canvas.getContext('2d').drawImage(video, 0, 0);
  const imgData = canvas.toDataURL('image/png');
  let img = redimensionar(imgData, 300, 300);
  let imgLarge = redimensionar(imgData, 590, 590);
  TablaDeBaseDatos.push({
    urlLarge: imgLarge,
    url: img
  });
  currentimg.setAttribute('src', imgData);
};

/* **********************************************************************borra fotos**********************/
const remove = (keyImagen) => {
  TablaDeBaseDatos.child(keyImagen).remove();
};
/* ************************************************************************Muestra fotos*********************************************************/
TablaDeBaseDatos.on('value', (snapshot) => {
  console.log('bd activa');
  document.getElementById('divImagenes').innerHTML = '';
  snapshot.forEach(element => {
    if (element.val().url) {
      document.getElementById('divImagenes').innerHTML += `
      <div>
      <img src="${redimensionar(element.val().url, 300, 300)}"/>
      <br/>
      <button id="${element.key}" onclick="remove('${element.key}')">Borrar</button>
      </div>`;
    }
  });
});

button.addEventListener('click', tomarFoto);