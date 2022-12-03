const isValidEmail = function (value) {
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,3}))$/

  if (emailRegex.test(value)) return true;
};

const isValidString = function (value) {
  if (typeof value === 'undefined' || value === null) return false;
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true;
}

const isValidPhone = function (value) {
  let phoneRegex = /^([+]\d{2})?\d{10}$/
  if (phoneRegex.test(value)) return true
}

const isValidName = function (str) {
  let nameRegex = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/i
  if (typeof str === "undefined" || str === null) return false;
  if (typeof str === "string" && str.trim().length === 0) return false;
  if (nameRegex.test(str)) return true;
}


const captilize = function (str) {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const isValidPassword = function (pw) {
  let pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/;
  if (pass.test(pw)) return true;
};

const isValidPincode = function (num) {
  const reg = /^[0-9]{6}$/;
  return reg.test(String(num));
}

const isValidISBN = function (num) {
  const reg = /^[0-9]{10,13}$/;
  return reg.test(String(num));
}

const idCharacterValid = function (value) {
  //return mongoose.Types.ObjectId.isValid(value);
  let validId = /^[a-fA-F0-9]{24}$/
  if (validId.test(value)) return true;
};

const isValidDate = function(date){
  let dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/gm
  if (dateRegex.test(date)) return true
}


module.exports = {
  isValidEmail,
  isValidName,
  captilize,
  isValidPhone,
  isValidPassword,
  isValidString,
  isValidPincode,
  isValidISBN,
  idCharacterValid,
  isValidDate
}