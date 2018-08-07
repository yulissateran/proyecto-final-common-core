const camera = document.getElementById('video');
const currentImg = document.getElementById('img');
const canvas = document.getElementById('canvas');

document.getElementById('back').addEventListener('click', () => {
  window.location.href = '../index.html';
});

document.getElementById('next').addEventListener('click', () => {
  const valuesFormVisitor = {
    name: document.getElementById('name').value,
    identification: document.getElementById('identification').value,
    company: document.getElementById('company').value || '_',
    validatorName: window.validatorName,
    validatorIdentification: window.validatorIdentification,
    messageErrorName: document.getElementById('msgErrorName'),
    messageErrorIdentification: document.getElementById('msgErrorIdentification'),
  };
  window.validateFormVisitor(valuesFormVisitor, window.visitorInformation);
  window.accessTheCamera(camera);
});


document.getElementById('takePicture').addEventListener('click', () => {
  document.getElementById('photoContainer').style.display = 'inherit';
  document.getElementById('cameraContainer').style.display = 'none';
  // Aquí va la funcion que toma la foto 
  window.takePicture(currentImg, canvas, camera, window.visitorInformation);
});


document.getElementById('anotherPic').addEventListener('click', () => {
  document.getElementById('cameraContainer').style.display = 'inherit';
  document.getElementById('photoContainer').style.display = 'none';
});
document.getElementById('nextStep').addEventListener('click', ()=>{
  window.registerVisitorInFirebase(window.referenceDatabase, window.visitorInformation, window.newDate);
});
