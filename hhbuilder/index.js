(function init() {
    var validation = (function () {
        function validationInit(ageInput, select) {
            ageInput.innerHTML += '<p id="ageValidate" style="color:red;"></p>';
            select.innerHTML += '<p id="selectValidate" style="color:red;"></p>';

        }

        function checkSelf(arrayOfItems) {
            var self = arrayOfItems.map(function (item) {
                if (item.rel === 'self') {
                    return true;
                }

            });
            return self;
        }
        return {
            validationInit: validationInit,
            checkSelf: checkSelf
        }
    })();
    var ui = (function uiMethods() {
        function createComponent(age, relation, smoker) {
            var ageValue = age,
                relValue = relation,
                smokeValue = smoker,
                domElement = document.querySelector('.household');

            if (smokeValue && relValue === 'self') {
                smokeValue = 'Are You a smoker? Yes.';
            } else if (!smokeValue && relValue === 'self') {
                smokeValue = 'Are You a smoker? No.'
            } else if (smokeValue && relValue !== 'self') {
                smokeValue = 'Are they a smoker? Yes.';
            } else if (!smokeValue && relValue !== 'self') {
                smokeValue = 'Are they a smoker? No.';
            }

            domElement.innerHTML += '<ul><li>' + relation + '</li><li>' + age + '</li><li>' + smokeValue + '</li></ul>';


        }

        return {
            createComponent: createComponent
        }
    })();
    var select = document.getElementsByTagName("select");
    var inputAge = document.getElementsByTagName("input");
    var inputSmoking = document.getElementsByName("smoker")[0];
    var addButton = document.querySelector('.add');
    var selectBox = select.rel.parentElement.parentElement;
    var inputBox = inputAge.age.parentElement.parentElement;
    var buttonBox = addButton.parentElement;
    console.log(buttonBox);
    addButton.type = 'button';
    validation.validationInit(inputBox, selectBox);
    console.log(inputAge)


    addButton.type = 'button';

    function resetCurrentData() {
        currentData.age = 0;
        currentData.rel = '';
        currentData.smoker = false;
        inputAge.value = '';
        select.rel.value = '';
        inputSmoking.checked = false;
    }

    inputAge.age.onblur = function getAge() {
        var age = parseInt(inputAge.age.value);
        if (!isNaN(age) && age >= 1) {
            currentData.age = age;
            console.log(currentData);
        }

    };
    select.rel.onchange = function checkSelectValue() {
        var currentValue = select.rel.value;
        if (select.rel.value) {
            currentData.rel = currentValue;
            console.log(currentData);
        }

    };
    inputSmoking.onchange = function checkSmoking() {
        var smokingIsTrue = inputSmoking.checked;
        currentData.smoker = smokingIsTrue;
        console.log(currentData)
    };
    console.log(addButton);
    addButton.onclick = function AddToSubmitedData() {

        if (currentData.age > 0 && currentData.rel) {
            var dataToPush = {
                age: currentData.age,
                rel: currentData.rel,
                smoker: currentData.smoker
            }
            ui.createComponent(dataToPush.age, dataToPush.rel,
                dataToPush.smoker);
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