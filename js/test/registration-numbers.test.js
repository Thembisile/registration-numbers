describe('Test Registration Numbers Widget', function(){
  it('should return true if registration matches given prefix for Cape Town', function(){
    var callReg = RegistrationFactory();

    assert.equal(callReg.addReg('CA 9870'), true);
  })
  it('should return true if town matches given prefix for Bellville', function(){
    var callReg = RegistrationFactory();

    assert.equal(callReg.addReg('CY 1254'), true);
  })
  it('should return true if town matches given prefix for Plettenrburg', function(){
    var callReg = RegistrationFactory();

    assert.equal(callReg.addReg('CX 0125'), true)
  })
  it('should return true if town matches given prefix for George', function(){
    var callReg = RegistrationFactory();

    assert.equal(callReg.addReg('CAW 8745'), true)
  });
  it('should return true if town matches given prefix for Paarl', function(){
    var callReg = RegistrationFactory();

    assert.equal(callReg.addReg('CJ 8457'), true);
  })
  it('should return false if registration is from another town and not from selected towns', function(){
    var callReg = RegistrationFactory();

    callReg.addReg('CZ 48636');

    assert.equal(false, callReg.getReg());
  })
});
