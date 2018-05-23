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
    var listOfRegs = [ 'CA ', 'CJ ', 'CY ', 'CAW ']

    if (mapOfReg[reg] === undefined) {
      for (var i = 0; i < listOfRegs.length; i++) {
        if (reg.startsWith(listOfRegs[i])) {

          mapOfReg[reg] = 0;
          return true;
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

    if (town === "All") {
      return registrationNums;
    }
    var filterTown = registrationNums.filter(function(Num, storedNum){

      return Num.startsWith(town)
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
    filterByTown,
    regMap
  }
}
