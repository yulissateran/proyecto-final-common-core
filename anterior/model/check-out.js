window.checkOut = (infoVisit, newDate) => {
  window.referenceDatabase.ref().child('visitors/' + infoVisit.identificador + '/visits').on('value', snap => {
    const visits = snap.val();
    for (const key in visits) {
      if (visits[key].active) {
        const refCurrentVisitor = window.referenceDatabase.ref('visitors/' + infoVisit.identificador + '/visits/' + key);
        refCurrentVisitor.update({
          active: false,
          out: newDate(),
        });
      }
    }
  });
  window.referenceDatabase.ref().child('visitors/' + infoVisit.identificador).update({active: false});
};

