function RegistrationFactory(stored){
  var registry = '';
  var mapOfReg = {};

  if (stored) {
    for (var i = 0; i < stored.length; i++) {
      var Now = stored[i];
      mapOfReg[Now] = 0;
    }
  }

 function additionReg(reg){
  var listOfRegs = [ 'CA ', 'CJ ', 'CX ', 'CY ', 'CAW ']

    if (mapOfReg[reg] === undefined) {
      for (var i = 0; i < listOfRegs.length; i++) {
        if (reg.startsWith(listOfRegs[i])) {
  
          mapOfReg[reg] = 0;
          return true;
        }
      }
    }
  }

  function getRegistry(){
    return registry;
  }

  function selectTown(town){

    var registrationNums = Object.keys(mapOfReg);

    if (town === "All") {
      return registrationNums;
    }
    var filterTown = registrationNums.filter(function(Num, storedNum){

    return registrationNums.startsWith(town)
    });
    location.hash = town;

    return filterTown;
  }

  function regMap() {
    return Object.keys(mapOfReg);
    }



  return {
    additionReg,
    getRegistry,
    selectTown,
    regMap,
  }
}
