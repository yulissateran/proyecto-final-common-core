/* *******************************************FUNCIONES DE VALIDACIÓN*******************************/
window.validatorName = (name) => {
  if ((/^([A-Za-z\s]{7,})+$/g.test(name))) {
    return true;
  } else {
    return false;
  }
};
window.validatorIdentification = (identification) => {
  if (/^([0-9]{8,})+$/g.test(identification)) {
    return true;
  } else {
    return false;
  }
};
