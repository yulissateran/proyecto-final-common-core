/* global $ */
/* global Promise*/


const getDataComunal = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        reject('No se ha podido acceder a ese recurso. Status: ' + response.status);
      })
      .then(texto => resolve(texto))
      .catch(err => reject(err));
  });
};
window.searchEmail = (infoVisit, url) => {
  const data = getDataComunal(url).then((response) => {
    const employe = response.filter((element) => element.name === infoVisit.visited);
    infoVisit.emailVisited = employe[0].email;
    console.log(employe[0].email, infoVisit.emailVisited)
  });
  console.log(data);
  return data;
};
window.writeDataAjax = (infoVisit)=>{
  const data = {
    key:'ZGiSDAUGJIgaCMIqm9ysPA',
    message: {
      html: `<div>
              <span>Hola! ${infoVisit.visited} , ${infoVisit.nameVisitor} quiere visitarte hoy
              comunicate con nosotros para confirmar su ingreso :) </span></div>`,
      'text': 'contactate con nosotros: 456765',
      'subject': 'tienes una visita nueva',
      'from_email': 'yuli@laboratoria.la',
      'from_name': 'Comunal coworking',
      'to': [
        {
          'email': infoVisit.emailVisited,
          'name': infoVisit.visited,
          'type': 'to'
        }
      ],
      'headers': {
        'Reply-To': 'yuli@laboratoria.la'
      }
    }
  };
  console.log(JSON.stringify(data));
  return JSON.stringify(data);
};

window.sendEmail = (data) => {
  $.ajax({
    type: 'POST',
    url: 'https://mandrillapp.com/api/1.0/messages/send.json',
    data
  })
    .then((response) => {
      console.log(response);
    });
};


window.showDashboardAdmin = (containerVisits) => {
  
  window.referenceDatabase.ref('visitors/').on('value', (snapshot) => {
    containerVisits.innerHTML = '';
    snapshot.forEach(element => { 
      containerVisits.innerHTML += `
    <div>
      <span>Nombre:${element.val().name}</span>
      <div><img src="${element.val().picture}"/></div>
      <ul>
        <li>Identificación${element.key}</li>
      </ul>
    </div>`;
    });
  });
};

window.addVisit = (infoVisit, newDate, callback, url) => {
  const currentVisitor = window.referenceDatabase.ref('visitors/' + infoVisit.identificador);
  currentVisitor.update({active: true});
  currentVisitor.once('value', (snapshot)=>{
    infoVisit.picture = snapshot.val().picture;
    infoVisit.nameVisitor = snapshot.val().name;
  });
  const refVisits = window.referenceDatabase.ref('visitors/' + infoVisit.identificador + '/visits');
  refVisits.push({
    active: true,
    entry: newDate(),
    company: infoVisit.visitedCompany,
    visited: infoVisit.visited
  }).then(() => {
    if (window.referenceDatabase.ref('visitors/' + infoVisit.identificadoractive)) {
      console.log('agregado a firebase');
      callback(infoVisit, url);
    }
  });
  
};


