
document.getElementsByClassName('nextButton')[0].addEventListener('click', () => {
  document.getElementById('registerContainer').style.display = 'none';
  document.getElementById('photoRegisterContainer').style.display = 'inherit';
});

document.getElementById('takePicture').addEventListener('click', () => {
  // document.getElementById('photoContainer').style.display = 'inherit';
  // document.getElementById('cameraContainer').style.display = 'none';
  // Aquí va la funcion que toma la foto 
  window.takePicture();
});


document.getElementById('anotherPic').addEventListener('click', () => {
  document.getElementById('cameraContainer').style.display = 'inherit';
  document.getElementById('photoContainer').style.display = 'none';
});

