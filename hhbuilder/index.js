(function init() {
    var validation = (function () {
        function validationInit(domElement, customId) {
            var validation = document.createElement('p');
            validation.id = customId;
            validation.style.color = 'red';
            domElement.appendChild(validation);
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
                removeId = 'removeElement_' + idValue,
                mainUlId = 'ulId_' + idValue,
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

            function createMainDiv() {
                var breakTag = document.createElement('br');
                var mainDiv = document.createElement('div');
                mainDiv.id = idValue;
                mainDiv.width = '100%';
                domElement.appendChild(breakTag);
                domElement.appendChild(mainDiv);

            }

            function createButton() {
                var thisDiv = document.getElementById(idValue);
                var removeButton = document.createElement('button');
                removeButton.textContent = 'remove';
                removeButton.type = 'button';
                removeButton.id = removeId;
                thisDiv.appendChild(removeButton);
            }

            function addOnClick() {
                var thisRemoveButton = document.getElementById(removeId);
                var thisDiv = document.getElementById(idValue);
                thisRemoveButton.onclick = function removeElement() {
                    domElement.removeChild(thisDiv);
                    submittedData = submittedData.filter(function (item) {
                        return item.id !== idValue;
                    });
                    console.log(submittedData);
                }
            }

            function addUl() {
                var thisDiv = document.getElementById(idValue);
                var mainUl = document.createElement('ul');
                mainUl.id = mainUlId;
                thisDiv.appendChild(mainUl);
            }

            function createLiIElement(data) {
                var thisUL = document.getElementById(mainUlId);
                var liElement = document.createElement('li');
                liElement.textContent = data;
                liElement.style.listStyle = 'none';
                thisUL.appendChild(liElement);
            }

            function AddData() {
                var ageData = 'Age: ' + ageValue;
                var relData = 'Relation: ' + relValue;
                var smokerData = smokeValue;
                createLiIElement(relData);
                createLiIElement(ageData);
                createLiIElement(smokerData);
            }

            createMainDiv();
            addUl();
            AddData();
            createButton();
            addOnClick();
        }
        return {
            createComponent: createComponent
        }
    })();

    var select = document.getElementsByTagName("select");
    var inputAge = document.getElementsByName("age")[0];
    var inputSmoking = document.getElementsByName("smoker")[0];
    var addButton = document.querySelector('.add');
    var selectBox = select.rel.parentElement.parentElement;
    var inputBox = inputAge.parentElement.parentElement;
    var buttonBox = addButton.parentElement;
    console.log(buttonBox);
    addButton.type = 'button';
    validation.validationInit(inputBox, 'inputValidation');
    validation.validationInit(selectBox, 'selectBoxValidation');



    inputAge.onblur = function getAge() {
        var age = parseInt(inputAge.value);
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


    function resetData() {
        currentData.age = 0;
        currentData.rel = '';
        currentData.smoker = false;

        inputAge.value = '';
        select.rel.value = '';
        inputSmoking.checked = false;
        console.log(inputAge);
    }
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
                    resetData();
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