(function init() {
    var select = document.getElementsByTagName("select");
    var inputAge = document.getElementsByName("age")[0];
    var inputSmoking = document.getElementsByName("smoker")[0];
    var addButton = document.querySelector('.add');
    var divs = document.getElementsByTagName('div');

    addButton.type = 'button';

    function resetCurrentData() {
        currentData.age = 0;
        currentData.rel = '';
        currentData.smoker = false;
        inputAge.value = '';
        select.rel.value = '';
        inputSmoking.checked = false;
    }

    inputAge.onblur = function getAge() {
        var age = parseInt(inputAge.value);
        if (!isNaN(age) && age >= 1) {
            currentData.age = age;
        }
        console.log(currentData);
    };
    select.rel.onchange = function checkSelectValue() {
        var currentValue = select.rel.value;
        if (select.rel.value) {
            currentData.rel = currentValue;
        }
        console.log(currentData);
    };
    inputSmoking.onchange = function checkSmoking() {
        var smokingIsTrue = inputSmoking.checked;
        currentData.smoker = smokingIsTrue;
        console.log(currentData);
    };

    addButton.onclick = function AddToSubmitedData() {
        if (currentData.age > 0 && currentData.rel) {
            var dataToPush = {
                age: currentData.age,
                rel: currentData.rel,
                smoker: currentData.smoker
            }
            submittedData.push(dataToPush);
            resetCurrentData();
            console.log(submittedData);

        }

    }



})();

var currentData = {
    age: 0,
    rel: '',
    smoker: false
};

var submittedData = [];