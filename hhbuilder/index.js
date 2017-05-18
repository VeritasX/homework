(function init() {
    var select = document.getElementsByTagName('select');
    var inputAge = document.getElementsByName('age');
    var errMessage;

    inputAge.onblur = function getAge() {

    }
    select.rel.onchange = function checkSelectValue() {
        var currentValue = select.rel.value;
        if (select.rel.value) {
            currentData.relationship = currentValue;
        }
        console.log(currentData);
    }


})();

var currentData = {
    age: 0,
    relationship: '',
    smoker: false
}

var submittedData = {};