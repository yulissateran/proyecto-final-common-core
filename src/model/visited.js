window.showDashboardAdmin = (containerVisits) => {
  window.referenceDatabase.ref('visitors/').on('value', (snapshot) => {
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

window.addVisit = (infoVisit, newDate) => {
  const refCurrentVisitor = window.referenceDatabase.ref('visitors/' + infoVisit.identificador + '/visits');
  refCurrentVisitor.push({
    active: true,
    entry: newDate(),
    company: infoVisit.visitedCompany,
    visited: infoVisit.visited
  }).then(() => {
    if (window.referenceDatabase.ref('visitors/' + infoVisit.identificadoractive)) {
      console.log('agregado a firebase');
    }
  });
};
