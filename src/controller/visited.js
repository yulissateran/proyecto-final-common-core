let date = new Date();
document.getElementById('date').innerHTML = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;

document.getElementById('register').addEventListener('click', () => {
  document.getElementById('infoModal').style.display = 'inherit';
});

document.getElementById('closeButton').addEventListener('click', () => {
  document.getElementById('infoModal').style.display = 'none';
});
document.addEventListener('DOMContentLoaded', window.showDashboardAdmin(document.getElementById('containerVisits')));
document.getElementById('saveVisit').addEventListener('click', ()=>{
  const infoVisit = {
    identificador: document.getElementById('identification').value,
    visitedCompany: document.getElementById('comunalOffices').value,
    visited: document.getElementById('employees').value,
  };
  window.addVisit(infoVisit, window.newDate);
});