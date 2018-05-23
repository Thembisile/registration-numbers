var registrationElem = document.querySelector('.registrationNum');
var addBtnElem = document.querySelector('.addRegBtn');
var townSelect = document.querySelector('.selectWhichTown');
var displayElem = document.querySelector('.displayField');
var clearButton = document.querySelector('.clearRegBtn')

var storage = localStorage.getItem("REG_NUMBERS") ? JSON.parse(localStorage.getItem("REG_NUMBERS")) : {};
var callFactory = RegistrationFactory(storage);

function regCreate(registration){
  var createList = document.createElement('li');
  createList.textContent = registration;
  displayElem.appendChild(createList);
}

function displayRegistration(){
  var inputValue = registrationElem.value.trim();
  registrationElem.value = '';

  if (callFactory.additionReg(inputValue)) {
    document.querySelector('.alert').innerHTML = '';
    localStorage.setItem('REG_NUMBERS', JSON.stringify(callFactory.regMap()));
    regCreate(inputValue);
  }
  else {
    document.querySelector('.alert').innerHTML = "Enter a valid registration number";
  }
}

addBtnElem.addEventListener('click', function(){
  displayRegistration();
});

clearButton.addEventListener('click', function(){
  displayElem.innerHTML = '';
  localStorage.clear();
})

window.addEventListener('load', function(){
  var loadMap = callFactory.regMap();

  for (var i = 0; i < loadMap.length; i++) {
    regCreate(loadMap[i])
  }
});

townSelect.addEventListener('change', function(){
  var selectValue = callFactory.filterByTown(townSelect.value);
  displayElem.innerHTML = '';
  if (selectValue.length > 0) {
    for (var i = 0; i < selectValue.length; i++) {
      regCreate(selectValue[i]);
    }
  }
})
