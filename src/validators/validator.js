
const isValidEmail = function (value) {
    let emailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,3}))$/
     
    if (emailRegex.test(value)) return true;
  };

  const isValidPhone = function(value){
    let phoneRegex = /^([+]\d{2})?\d{10}$/
    if (phoneRegex.test(value)) return true
  }

const isValidName = function(str){
    let nameRegex = /^([a-zA-Z'-.]+(?: [a-zA-Z'-.]+)?)$/
    if (typeof str === "undefined" || str === null) return false;
    if (typeof str === "string" && str.trim().length === 0) return false;
    if (nameRegex.test(str)) return true;
}


const captilize = function(str) {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const isValidPassword = function (pw) {
  let pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/;
  if (pass.test(pw)) return true;
};


module.exports = {isValidEmail, isValidName, captilize, isValidPhone, isValidPassword}