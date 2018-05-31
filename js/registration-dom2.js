var registrationElem2 = document.querySelector('.registrationNumTwo');
var addBtnElem2 = document.querySelector('.addRegBtnTwo');
var townSelect2 = document.querySelector('.selectWhichTownTwo');
var clearButton2 = document.querySelector('.clearRegBtnTwo');
var counter2 = document.querySelector('.registrationCountTwo');
var display2 = document.querySelector('.displayFieldTwo')

// referencing the template from HTML
var regTemplateSource = document.querySelector('.regNumberTemplate').innerHTML;
var registrationTemplate = Handlebars.compile(regTemplateSource);
var displayElem2 = document.querySelector('.displayFieldTwo');

// Store into localStorage
var storage2 = localStorage.getItem("REG_NUMBERS_TWO") ? JSON.parse(localStorage.getItem("REG_NUMBERS_TWO")) : {};
var callFactory2 = RegistrationFactory(storage2);
counter2.innerHTML = Object.keys(storage2).length

function displayRegistrationTwo(){
  var inputValue2 = registrationElem2.value.trim().toUpperCase();
  registrationElem2.value = '';

  if (callFactory2.additionReg(inputValue2)) {
    // document.querySelector('.alertTwo').innerHTML = '';
    localStorage.setItem("REG_NUMBERS_TWO", JSON.stringify(callFactory2.mapRegistration()));
    display2.innerHTML = registrationTemplate({
      regList : callFactory2.mapRegistration()
    });
  }
  else {
    document.querySelector('.alertTwo').innerHTML = "Please enter a valid registration of available towns only. <br> <code> e.g : CA 123-542 or ca 123. Only from: 'CA, CY, CL & CJ'. " ;
  }
  counter2.innerHTML = callFactory2.regCounter();
}

addBtnElem2.addEventListener('click', function(){
  displayRegistrationTwo();
  registrationElem.innerHTML = '';
});

clearButton2.addEventListener('click', function(){
  localStorage.removeItem('REG_NUMBERS_TWO');
  document.querySelector('.alertTwo').innerHTML = '';
  counter2.innerHTML = 0;
  window.location.reload();
  registrationElem.innerHTML = '';
})

window.addEventListener('load', function(){
  display2.innerHTML = registrationTemplate({
    regList : callFactory2.mapRegistration()
  });
})

townSelect2.addEventListener('change', function(){
  display2.innerHTML = '';
  var optionValue = callFactory2.filterByTown(townSelect2.value);

  display2.innerHTML = registrationTemplate({
    regList : optionValue
  })
  if (optionValue.length > 0) {
    document.querySelector('.alertTwo').innerHTML = '';
  }
  else {
    document.querySelector('.alertTwo').innerHTML = 'Sorry, nothing to display for selected town! <br> <code> Add Registration '
  }
})
registrationElem2.addEventListener('click', function(){
  document.querySelector('.alertTwo').innerHTML = '';
})
