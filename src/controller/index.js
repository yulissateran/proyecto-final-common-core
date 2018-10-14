const camera = document.getElementById('video');
const canvas = document.getElementById('canvas');
const visitorInformation = {};

document.addEventListener('DOMContentLoaded', () => {
  window.accessTheCamera(camera);
});

document.getElementById('continueRegistration').addEventListener('click', (event) => {
  event.preventDefault();
  visitorInformation.name = document.getElementById('nameVisitor').value,
  visitorInformation.id = document.getElementById('idVisitor').value;
  visitorInformation.host = document.getElementById('host').value;
  const img = window.takePicture(canvas, camera);
  visitorInformation.picture = img;

  if (window.validateFormVisitor(visitorInformation)) {
    document.getElementById('continueRegistration').disabled = true;
    window.registerVisitorInFirebase(window.referenceDatabase, visitorInformation, window.newDate)
      .then(() => {
       const data = window.writeDataAjax(visitorInformation);
       window.sendEmail(data);
      }).then(()=>{
        document.getElementById('FormDataVisitor').classList.add('d-none');
        document.getElementById('sectionRegisterOk').classList.remove('d-none');
      });
  } else {
    document.getElementById('invalidFeedbackName').classList.add('d-block');
    document.getElementById('invalidFeedbackId').classList.add('d-block');
    document.getElementById('invalidFeedback').classList.add('d-block');
  }
});

document.getElementById('goAdministration').addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById('body').classList.remove('bg-main-img');
  document.getElementById('sectionRegisterVisitor').classList.remove('d-flex');
  document.getElementById('sectionRegisterVisitor').classList.add('d-none');
  document.getElementById('sectionAdministrator').classList.remove('d-none');
  document.getElementById('goVisitor').classList.remove('d-none');
  document.getElementById('goAdministration').classList.add('d-none');
  window.showDashboardAdmin(document.getElementById('containerVisits'));
});

document.getElementById('goVisitor').addEventListener('click', ()=>{
  event.preventDefault();
  document.getElementById('goAdministration').classList.remove('d-none');
  document.getElementById('goVisitor').classList.add('d-none');
  document.getElementById('body').classList.add('bg-main-img');
  document.getElementById('sectionRegisterVisitor').classList.add('d-flex');
  document.getElementById('sectionRegisterVisitor').classList.remove('d-none');
  document.getElementById('sectionAdministrator').classList.add('d-none');
  document.getElementById('goVisitor').classList.add('d-none');
  document.getElementById('goAdministration').classList.remove('d-none');
});


document.getElementById('acept').addEventListener('click', ()=>{
  location.reload();
});

// let date = new Date();
// const urlDataComunal = '../companys/comunal.json';
// document.getElementById('date').innerHTML = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;


// document.addEventListener('DOMContentLoaded', window.showDashboardAdmin(document.getElementById('containerVisits')));
// document.getElementById('saveVisit').addEventListener('click', () => {
//   window.infoVisit = {
//     identificador: document.getElementById('identification').value,
//     visitedCompany: document.getElementById('comunalOffices').value,
//     visited: document.getElementById('employees').value,
//   };
//   window.addVisit(window.infoVisit, window.newDate, window.searchEmail, urlDataComunal);
//   setTimeout(() => {
//     const dataEmail = window.writeDataAjax(window.infoVisit);
//     window.sendEmail(dataEmail), document.getElementById('infoModal').style.display = 'none';
//   }, 4000);
// });

