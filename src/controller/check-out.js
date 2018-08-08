document.getElementById('back').addEventListener('click' , ()=>{
  window.location.href = "../index.html";
});

document.getElementById('send').addEventListener('click' , ()=>{
  document.getElementById('visitOut').style.display = 'none';
  document.getElementById('confirmContainer').style.display = 'inherit';
});

document.getElementById('close').addEventListener('click' , ()=>{
  //aquí función que registra la salida
  window.location.href = "../index.html";
  document.getElementById('visitOut').style.display = 'inherit';
  document.getElementById('confirmContainer').style.display = 'none';

});




