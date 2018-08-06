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
window.referenceDatabase = firebase.database();

window.visitorInformation = {
  nameVisitor: null,
  lastNameVisitor: null,
  identificationVisitor: null,
  pictureVisitor: null,
  visitOf: {
    ofice: null,
    nameVisited: null
  }

};

window.validateFormVisitor = (valuesFormVisitor, visitorInformation) => {
  console.log(window.visitorInformation);
  valuesFormVisitor.messageErrorName.innerHTML = '';
  valuesFormVisitor.messageErrorLastName.innerHTML = '';
  valuesFormVisitor.messageErrorIdentification.innerHTML = '';
  const nameValidation = window.validatorName(valuesFormVisitor.name);
  const lastNameValidation = window.validatorName(valuesFormVisitor.lastName);
  const identificationValidation = window.validatorIdentification(valuesFormVisitor.identification);

  if (nameValidation && lastNameValidation && identificationValidation) {
    window.writeDataVisitorInObject(valuesFormVisitor, visitorInformation);
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('photoRegisterContainer').style.display = 'inherit';
    return true;
  } else if (!nameValidation) {
    valuesFormVisitor.messageErrorName.innerHTML = '<em>Este campo debe tener mas de 7 letras</em>';
    return false;
  } else if (!lastNameValidation) {
    valuesFormVisitor.messageErrorLastName.innerHTML = '<em>Este campo debe tener mas de 7 letras</em>';
    return false;
  } else if (!identificationValidation) {
    valuesFormVisitor.messageErrorIdentification.innerHTML = '<em>Este campo debería tener 8 números</em>';
    return false;
  }
};

window.writeDataVisitorInObject = (valuesFormVisitor, visitorInformation) => {
  console.log(window.visitorInformation);
  visitorInformation.nameVisitor = valuesFormVisitor.name;
  visitorInformation.lastNameVisitor = valuesFormVisitor.lastName;
  visitorInformation.identificationVisitor = valuesFormVisitor.identification;
  visitorInformation.visitOf.ofice = valuesFormVisitor.visitOf.ofice;
  visitorInformation.visitOf.nameVisited = valuesFormVisitor.visitOf.employe;
  console.log(window.visitorInformation);
  window.accessTheCamera();
  return visitorInformation;
};

/* ***************************************************Acceso a la cámara***************************************************************/
window.accessTheCamera = (camera) => {
  console.log(window.visitorInformation);
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  }).then((stream) => {
    camera.srcObject = stream;
    camera.onloadedmetadata = () => camera.play();
  }).catch((error) => {
    console.log(error);
  });
};

/* ******************************************************Toma fotos**********************************************************************/
window.takePicture = (currentImg, canvas, camera, visitorInformation) => {
  canvas.getContext('2d').drawImage(camera, 0, 0, 250, 250);
  let img = canvas.toDataURL('image/jgeg', 0.65);
  visitorInformation.pictureVisitor = img;
  console.log(window.visitorInformation);
  currentImg.setAttribute('src', img);
  return img;
};
/* *************************************Escribe datos en firebase*********************************************+ */
const newDate = () => {
  const date = new Date();
  const mounthVisitor = date.getMonth() + 1;
  const dateVisitor = `
          ${date.getFullYear()}/
          ${mounthVisitor}/
          ${date.getDate()} 
          ${date.getHours()}:
          ${date.getMinutes()}:
          ${+ date.getSeconds()}`;
  return dateVisitor;
};

window.registerVisitorInFirebase = (referenceDatabase, visitorInformation) => {
  console.log(window.visitorInformation);
  referenceDatabase.ref('visitors/').once('value', (snapshot) => {
    snapshot.val().forEach(element => {
      if (element === window.visitorInformation.identificationVisitor) {
        console.log('ya estas registrado');
      } else {
        referenceDatabase.ref('visitors/' + visitorInformation.identificationVisitor).set({
          name: visitorInformation.nameVisitor,
          lastName: visitorInformation.lastNameVisitor,
        }).then(() => {
          referenceDatabase.ref('visitors/' + visitorInformation.identificationVisitor + '/visits').push({
            ofice: visitorInformation.visitOf.ofice,
            nameVisited: visitorInformation.visitOf.nameVisited,
            active: true,
            photoVisitor: visitorInformation.pictureVisitor,
            entry: newDate(),
          });
        }).then(() => {
          referenceDatabase.ref('visitors/' + visitorInformation.identificationVisitor).once('value', (snapshot) => {
            const isActive = snapshot.val().active;
            if (isActive) {
              console.log('firebase');
            }
          });
        });
      }
    });
  });
};
window.frequentVisitor = (referenceDatabase, visitorInformation) => {
  console.log(window.visitorInformation);
  referenceDatabase.ref('visitors/').once('value', (snapshot) => {
    snapshot.val().forEach(element => {
      if (element !== window.visitorInformation.identificationVisitor) {
        console.log('No estas registrado');
      } else {
        referenceDatabase.ref('visitors/' + visitorInformation.identificationVisitor + '/visits').push({
          ofice: visitorInformation.visitOf.ofice,
          nameVisited: visitorInformation.visitOf.nameVisited,
          active: true,
          photoVisitor: visitorInformation.pictureVisitor,
          status: 'pending'
        }).then(() => {
          referenceDatabase.ref('visitors/' + visitorInformation.identificationVisitor).once('value', (snapshot) => {
            const isActive = snapshot.val().active;
            if (isActive) {
              console.log('firebase');
            }
          });
        });
      }
    });
  });
};


const refPicturesBd = firebase.database().ref('pictures');
/* *********************************************borra fotos**********************/
// const remove = (keyImagen) => {
//   refPicturesBd.child(keyImagen).remove();
// };

/* **************************************Muestra fotos*********************************************************/
// window.fotos = () =>{
//   refPicturesBd.on('value', (snapshot) => {
//     document.getElementById('divImagenes').innerHTML = '';
//     snapshot.forEach(element => {
//       if (element.val().url) {
//         document.getElementById('divImagenes').innerHTML += `
//         <div>
//         <img src="${element.val().url}"/><br/>
//         <button id="${element.key}" onclick="remove('${element.key}')">Borrar</button>
//         </div>`;
//       }
//     });
//   }); 
// }
