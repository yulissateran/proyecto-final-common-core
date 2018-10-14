/* *******************************************FUNCIONES DE VALIDACIÓN*******************************/
window.validatorName = (name) => {
  if (/^([A-Za-zñÑáéíóúÁÉÍÓÚ\s]{7,})+$/g.test(name)) return true;
  return false;
};
window.validatorIdentification = (identification) => {
  if (/^([0-9]{8,8})+$/g.test(identification)) return true;
  return false;
};

window.validateFormVisitor = (valuesFormVisitor) => {
  const nameValidation = window.validatorName(valuesFormVisitor.name);
  const idValidation = window.validatorIdentification(valuesFormVisitor.id);
  if (nameValidation && idValidation) return true;
  return false;
};

window.newDate = () => {
  const date = new Date();
  const mounthVisit = date.getMonth() + 1;
  const objectDate = {
    dateFormat:`${date.getFullYear()}/${mounthVisit}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${+ date.getSeconds()}`,
    dateVisit: `${date.getFullYear()}${mounthVisit}${date.getDate()} `
  };

  return objectDate;
};
