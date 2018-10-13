const camera = document.getElementById('video');
const canvas = document.getElementById('canvas');
const visitorInformation = {};

document.addEventListener('DOMContentLoaded', () => {
  window.accessTheCamera(camera);
  console.log(new Date().getFullYear() ,new Date().getMonth() , new Date().getDate())
});

document.getElementById('continueRegistration').addEventListener('click', (event) => {
  event.preventDefault();
  visitorInformation.name = document.getElementById('nameVisitor').value,
  visitorInformation.id = document.getElementById('idVisitor').value;
  visitorInformation.host = document.getElementById('host').value;
  const img = window.takePicture(canvas, camera);
  visitorInformation.picture = img;

  if (window.validateFormVisitor(visitorInformation)) {
    console.log('valid');
    console.log(visitorInformation)
    window.registerVisitorInFirebase(window.referenceDatabase, visitorInformation, window.newDate)
      .then(() => {
        console.log('registrado');
        document.getElementById('sectionRegisterOk').classList.remove('d-none');
        document.getElementById('FormDataVisitor').classList.remove('d-flex');
        document.getElementById('FormDataVisitor').classList.add('d-none');
      });
  } else {
    console.log('invalid')
    document.getElementById('invalidFeedbackName').classList.add('d-block');
    document.getElementById('invalidFeedbackId').classList.add('d-block');
  }
});

document.getElementById('goAdministration').addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById('sectionRegisterVisitor').classList.remove('d-flex');
  document.getElementById('sectionRegisterVisitor').classList.add('d-none');
  document.getElementById('sectionAdministrator').classList.remove('d-none');
});

document.getElementById('acept').addEventListener(()=>{
  
})

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

