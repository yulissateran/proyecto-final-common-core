/* *******************************************FUNCIONES DE VALIDACIÓN*******************************/
window.validatorName = (name) => {
  if ((/^([A-Za-z\s]{7,})+$/g.test(name))) {
    return true;
  } else {
    return false;
  }
};
// window.validatorEmail = (email) => {
//   if (/^([a-zA-Z0-9._-]{3,})+@([a-zA-Z0-9.-]{5,})+\.([a-zA-Z]{2,})+$/.test(email)) {
//     return true;
//   } else {
//     return false;
//   }
// };
// window.validatorPassword = (password) => {
//   if (/^([A-Za-z0-9]{8,})+$/g.test(password)) {
//     return true;
//   } else {
//     return false;
//   }
// };
window.validatorIdentification = (identification) => {
  if (/^([0-9]{8,8})+$/g.test(identification)) {
    return true;
  } else {
    return false;
  }
};
