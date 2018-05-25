describe('Test Registration Numbers Widget', function(){
  it('should return true if registration matches given prefix for Cape Town', function(){
    var callReg = RegistrationFactory();

    assert.equal(callReg.additionReg('CA 9870'), true);
  });
  it('should return true if town matches given prefix for Bellville', function(){
    var callReg = RegistrationFactory();

    assert.equal(callReg.additionReg('CY 1254'), true);
  });
  it('should return true if town matches given prefix for George', function(){
    var callReg = RegistrationFactory();

    assert.equal(callReg.additionReg('CAW 8745'), true)
  });
  it('should return true if town matches given prefix for Paarl', function(){
    var callReg = RegistrationFactory();

    assert.equal(callReg.additionReg('CJ 8457'), true);
  });
  it('should return false if registration is from another town and not from selected towns', function(){
    var callReg = RegistrationFactory();

    callReg.additionReg('CZ 48636');

    assert.equal(false, callReg.getRegistry());
  });
  it('should return true for registration of filtered town on display', function(){
    var callReg = RegistrationFactory();
    var callReg2 = RegistrationFactory();
    var callReg3 = RegistrationFactory();

    callReg.filterByTown("Cape Town");
    callReg2.filterByTown("Geeorge");
    callReg3.filterByTown("Paarl");

    assert.equal(true, callReg.additionReg('CA 1234'));
    assert.equal(true, callReg2.additionReg('CAW 125'));
    assert.equal(true, callReg3 .additionReg('CJ 87945'));
  })
  it('sets the registration numbers and adds them to a map and return the map ', function(){
    var callReg = RegistrationFactory();

    callReg.additionReg("CA 123");
    callReg.additionReg("CY 321")

    assert.deepEqual(['CA 123', 'CY 321'], callReg.regMap());
  });
  it('should return all registration numbers when filtering "ALL" ', function(){
    var callReg =RegistrationFactory();

    callReg.additionReg('CA 123');
    callReg.additionReg('CAW 123');
    callReg.additionReg('CY 123');
    callReg.additionReg('CJ 123');

    assert.deepEqual(callReg.filterByTown('All'), ['CA 123', 'CAW 123', 'CY 123', 'CJ 123'])
  });
  it('should not include a registration twice into the map ', function(){
    var callReg = RegistrationFactory();

    callReg.additionReg("CA 123");
    callReg.additionReg("CA 123");

    var callReg2 = RegistrationFactory();

    callReg2.additionReg("CY 123")
    callReg2.additionReg("CY 123")
    callReg2.additionReg("CY 321")

    assert.deepEqual(['CA 123'], callReg.regMap());
    assert.deepEqual(['CY 123', 'CY 321'], callReg2.regMap());
  });
});
describe('Initializing the Map Registration Numbers', function(){
  it('should return initialized map of registrations', function(){

    var callReg = RegistrationFactory(['CA 123',
      'CY 321',
      'CJ 451',
      'CAW 4123']);

    assert.deepEqual(callReg.regMap(), ['CA 123',
      'CY 321',
      'CJ 451',
      'CAW 4123'])
  })
})
