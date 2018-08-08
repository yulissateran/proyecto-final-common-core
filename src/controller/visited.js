let date = new Date();
const urlDataComunal = '../companys/comunal.json';
document.getElementById('date').innerHTML = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;

document.getElementById('register').addEventListener('click', () => {
  document.getElementById('infoModal').style.display = 'inherit';
});

document.getElementById('closeButton').addEventListener('click', () => {
  document.getElementById('infoModal').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', window.showDashboardAdmin(document.getElementById('containerVisits')));
document.getElementById('saveVisit').addEventListener('click', () => {
  window.infoVisit = {
    identificador: document.getElementById('identification').value,
    visitedCompany: document.getElementById('comunalOffices').value,
    visited: document.getElementById('employees').value,
  };
  window.addVisit(window.infoVisit, window.newDate, window.searchEmail, urlDataComunal);
  setTimeout(() => {
    const dataEmail = window.writeDataAjax(window.infoVisit);
    window.sendEmail(dataEmail), document.getElementById('infoModal').style.display = 'none';
  }, 4000);
});
