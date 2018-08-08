window.visitorInformation = {
  nameVisitor: null,
  identificationVisitor: null,
  pictureVisitor: null,
};

window.validateFormVisitor = (valuesFormVisitor, visitorInformation) => {
  console.log(window.visitorInformation);
  valuesFormVisitor.messageErrorName.innerHTML = '';
  valuesFormVisitor.messageErrorIdentification.innerHTML = '';
  const nameValidation = window.validatorName(valuesFormVisitor.name);
  const identificationValidation = window.validatorIdentification(valuesFormVisitor.identification);

  if (nameValidation && identificationValidation) { 
    window.writeDataVisitorInObject(valuesFormVisitor, visitorInformation);
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('photoRegisterContainer').style.display = 'inherit';
    return true;
  } else if (!nameValidation) {
    valuesFormVisitor.messageErrorName.innerHTML = '<em>Este campo debe tener mas de 7 letras</em>';
    return false;
  } else if (!identificationValidation) {
    valuesFormVisitor.messageErrorIdentification.innerHTML = '<em>Este campo debería tener 8 números</em>';
    return false;
  }
};

window.writeDataVisitorInObject = (valuesFormVisitor, visitorInformation) => {
  console.log(window.visitorInformation);
  visitorInformation.nameVisitor = valuesFormVisitor.name;
  visitorInformation.identificationVisitor = valuesFormVisitor.identification;
  visitorInformation.company = valuesFormVisitor.company;
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


window.registerVisitorInFirebase = (referenceDatabase, visitorInformation, newDate) => {
  console.log(window.visitorInformation);
  referenceDatabase.ref('visitors/' + visitorInformation.identificationVisitor).update({
    name: visitorInformation.nameVisitor,
    company: visitorInformation.company,
    picture: visitorInformation.pictureVisitor,
    dateRegister: newDate()
  }).then(() => {
    referenceDatabase.ref('visitors/' + visitorInformation.identificationVisitor).once('value', (snapshot) => {
      const savedName = snapshot.val().name;
      if (savedName) {
        console.log('firebase');
      }
    });
  });
};

// const refPicturesBd = firebase.database().ref('pictures');
/* *********************************************borra fotos**********************/
// const remove = (keyImagen) => {
//   refPicturesBd.child(keyImagen).remove();
// };

/* **************************************Muestra fotos*********************************************************/
// window.fotos = () =>{
//   refPicturesBd.on('value', (snapshot) => {
//     document.getElementById('divImagenes').innerHTML = '';;
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