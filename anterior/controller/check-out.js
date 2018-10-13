document.getElementById('back').addEventListener('click', () => {
  window.location.href = '../index.html';
});

document.getElementById('send').addEventListener('click', () => {
  // aquí función que registra la salida
  const infoVisit = {
    identificador: document.getElementById('dniOut').value,
  };
  window.checkOut(infoVisit, window.newDate);
  document.getElementById('visitOut').style.display = 'none';
  document.getElementById('confirmContainer').style.display = 'inherit';
});

document.getElementById('close').addEventListener('click', () => {
  window.location.href = '../index.html';
  document.getElementById('visitOut').style.display = 'inherit';
  document.getElementById('confirmContainer').style.display = 'none';
});
