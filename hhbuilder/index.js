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
        function createComponent(age, relation, smoker, id) {
            var ageValue = age,
                idValue = id,
                relValue = relation,
                smokeValue = smoker,
                domElement = document.querySelector('.household'),
                mainDiv = document.createElement('div'),
                removeButton = document.createElement('button'),
                mainUl = document.createElement('ul'),
                relLi = document.createElement('li'),
                ageLi = document.createElement('li'),
                smokeLi = document.createElement('li');

            if (smokeValue && relValue === 'self') {
                smokeValue = 'Are You a smoker? Yes.';
            } else if (!smokeValue && relValue === 'self') {
                smokeValue = 'Are You a smoker? No.'
            } else if (smokeValue && relValue !== 'self') {
                smokeValue = 'Are they a smoker? Yes.';
            } else if (!smokeValue && relValue !== 'self') {
                smokeValue = 'Are they a smoker? No.';
            }

            domElement.appendChild(mainDiv);

            console.log(document.getElementById(idValue));
        }

        function removeItems(id) {
            var thisID = id.toString();
            var elementToRemove = document.getElementById(thisID);
            elementToRemove.remove();

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
        function generateId() {
            return '$' + Math.random().toString(30).substr(2, 7);
        }
        var newId = generateId();
        var checkID = setInterval(function () {
            if (newId) {
                if (currentData.age > 0 && currentData.rel) {
                    var dataToPush = {
                        id: newId,
                        age: currentData.age,
                        rel: currentData.rel,
                        smoker: currentData.smoker
                    }

                    ui.createComponent(dataToPush.age, dataToPush.rel,
                        dataToPush.smoker, dataToPush.id);
                    submittedData.push(dataToPush);
                    resetCurrentData();
                    console.log(submittedData);
                    clearInterval(checkID);
                }
            }
        }, 200);
    }



})();

var currentData = {
    age: 0,
    rel: '',
    smoker: false
};

var submittedData = [];