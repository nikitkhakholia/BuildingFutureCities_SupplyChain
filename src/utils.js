exports.numberOnly = (element) => {
  var regex = /[^0-9]/gi;
  element.target.value = element.target.value.replace(regex, "");
};

exports.showSuccessAlert = (text) => {
  var success = document.getElementById("alert-success");
  var successMessage = document.getElementById("alert-success-msg");

  success.classList.remove("d-none");
  successMessage.innerText = text;
  setTimeout(() => {
    success.classList.add("d-none");
  }, 5000);
};
exports.showErrorAlert = (text) => {
  var failure = document.getElementById("alert-failure");
  var failureMessage = document.getElementById("alert-failure-msg");

  failure.classList.remove("d-none");
  failureMessage.innerText = text;
  setTimeout(() => {
    failure.classList.add("d-none");
  }, 5000);
};
exports.showLoading=()=>{
    document.getElementById('loading-icon').classList.remove('d-none');
    document.getElementById('page').classList.add('blur');
}
exports.hideLoading=()=>{
    document.getElementById('loading-icon').classList.add('d-none');
    document.getElementById('page').classList.remove('blur');
}