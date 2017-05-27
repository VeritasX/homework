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