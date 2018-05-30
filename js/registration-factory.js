function RegistrationFactory(stored){
  var registry = '';
  var mapOfReg = {};
  var regCount = 0;

  if (stored) {
    for (var i = 0; i < stored.length; i++) {
      var Now = stored[i];
      mapOfReg[Now] = 0;
    }
  }

  function additionReg(reg){
    var listOfRegs = [ 'CA ', 'CJ ', 'CY ', 'CAW ']

    if (reg != ''){
      if (mapOfReg[reg] === undefined) {
        for (var i = 0; i < listOfRegs.length; i++) {
          if (reg.startsWith(listOfRegs[i])) {

            mapOfReg[reg] = 0;
            return true;
          }
        }
      }
      return false;
    }
  }

  function getRegistry(){
    return registry;
  }

  function filterByTown(town){

    var registrationNums = Object.keys(mapOfReg);

    if (town === "Filter ") {
      var nothing = registrationNums.clear();

      return nothing;
    }

    if (town === "All ") {
      return registrationNums;
    }
    var filterTown = registrationNums.filter(function(Num, storedNum){

      return Num.startsWith(town)
    });
    location.hash = town;

    return filterTown;
  }

  function mapRegistration() {
    return Object.keys(mapOfReg);
  }

  function regCounter() {
    return Object.keys(mapOfReg).length;
  }

  return {
    additionReg,
    getRegistry,
    filterByTown,
    mapRegistration,
    regCounter
  }
}
