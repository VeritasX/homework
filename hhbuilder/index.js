(function init() {
  var select = document.getElementsByTagName("select");
  var inputAge = document.getElementsByName("age")[0];
  var inputSmoking = document.getElementsByName("smoker")[0];
  console.log(inputAge);
  var errMessage;

  inputAge.onblur = function getAge() {
    var age = inputAge.value;
    if (!isNaN(age)) {
      currentData.age = age;
    }
    console.log(currentData);
  };
  select.rel.onchange = function checkSelectValue() {
    var currentValue = select.rel.value;
    if (select.rel.value) {
      currentData.relationship = currentValue;
    }
    console.log(currentData);
  };
  inputSmoking.onchange = function checkSmoking() {
    var smokingIsTrue = inputSmoking.checked;
    currentData.smoker = smokingIsTrue;
    console.log(currentData);
  };
})();

var currentData = {
  age: 0,
  relationship: "",
  smoker: false
};

var submittedData = {};
