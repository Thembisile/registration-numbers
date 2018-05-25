var registrationElem = document.querySelector('.registrationNum');
var addBtnElem = document.querySelector('.addRegBtn');
var townSelect = document.querySelector('.selectWhichTown');
var displayElem = document.querySelector('.displayField');
var clearButton = document.querySelector('.clearRegBtn')
var counter = document.querySelector('.registrationCount')

var storage = localStorage.getItem("REG_NUMBERS") ? JSON.parse(localStorage.getItem("REG_NUMBERS")) : {};
var callFactory = RegistrationFactory(storage);
counter.innerHTML = Object.keys(storage).length

function regCreate(registration){
  var createList = document.createElement('li');
  createList.textContent = registration;
  displayElem.appendChild(createList);
}

function displayRegistration(){
  var inputValue = registrationElem.value.trim().toUpperCase();
  registrationElem.value = '';

  if (callFactory.additionReg(inputValue)) {
    document.querySelector('.alert').innerHTML = '';
    localStorage.setItem('REG_NUMBERS', JSON.stringify(callFactory.regMap()));
    regCreate(inputValue);
  }
  else {
    document.querySelector('.alert').innerHTML = "Please enter a valid registration, <br> <code> e.g : CA 123-542 or ca 123."
  }
  counter.innerHTML = callFactory.regCounter();
}

addBtnElem.addEventListener('click', function(){
  displayRegistration();
});

clearButton.addEventListener('click', function(){
  displayElem.innerHTML = '';
  localStorage.clear();
  document.querySelector('.alert').innerHTML = '';
  counter.innerHTML = 0;
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
    document.querySelector('.alert').innerHTML = '';
  }
  else {
    document.querySelector('.alert').innerHTML = 'Sorry, nothing to display for selected town! <br> <code> Add Registration ';
  }
})
