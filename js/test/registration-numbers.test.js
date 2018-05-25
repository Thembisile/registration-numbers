describe('Registration Numbers', function(){
  it('should return true if registration matches given prefix for Cape Town', function(){
    var callReg = RegistrationFactory();

    assert.equal(callReg.additionReg('CA 9870'), true);
  });
  it('should return true if registration matches given prefix for Bellville', function(){
    var callReg = RegistrationFactory();

    assert.equal(callReg.additionReg('CY 1254'), true);
  });
  it('should return true if registration matches given prefix for George', function(){
    var callReg = RegistrationFactory();

    assert.equal(callReg.additionReg('CAW 8745'), true)
  });
  it('should return true if registration matches given prefix for Paarl', function(){
    var callReg = RegistrationFactory();

    assert.equal(callReg.additionReg('CJ 8457'), true);
  });
  it('should return false if registration is from another town and not from selected towns', function(){
    var callReg = RegistrationFactory();

    callReg.additionReg('CZ 48636');

    assert.equal(false, callReg.getRegistry());
  });
})
describe('Filtering registration for Selected Town', function(){
  it('should return true for registration of filtered town on display', function(){
    var callReg = RegistrationFactory();
    var callReg2 = RegistrationFactory();
    var callReg3 = RegistrationFactory();

    callReg.filterByTown("CA ");
    callReg2.filterByTown("CAW ");
    callReg3.filterByTown("CJ ");

    assert.equal(true, callReg.additionReg('CA 1234'));
    assert.equal(true, callReg2.additionReg('CAW 125'));
    assert.equal(true, callReg3 .additionReg('CJ 87945'));
  });
  it('should return all registration numbers when filtering "ALL" ', function(){
    var callReg =RegistrationFactory();

    callReg.additionReg('CA 123');
    callReg.additionReg('CAW 123');
    callReg.additionReg('CY 123');
    callReg.additionReg('CJ 123');

    assert.deepEqual(callReg.filterByTown('All'), ['CA 123', 'CAW 123', 'CY 123', 'CJ 123'])
  });
  it('should return CJ registrations only, if filtered for Paarl, and CAW registrations if filtered for George', function(){
    var callReg = RegistrationFactory();

    callReg.additionReg("CJ 1235");
    callReg.additionReg("CAW 2659");

    var callReg2 = RegistrationFactory();

    callReg2.additionReg('CAW 123');
    callReg2.additionReg('CY 541')

    assert.deepEqual(callReg.filterByTown('CJ '), ['CJ 1235']);
    assert.deepEqual(callReg2.filterByTown('CAW '), ['CAW 123'])
  })
  it('should return filtered registration for George', function(){
    var callReg2 = RegistrationFactory();

    callReg2.additionReg('CAW 123');
    callReg2.additionReg('CA 123');
    callReg2.additionReg('CAW 321');

    assert.deepEqual(callReg2.filterByTown("CAW "), ['CAW 123', 'CAW 321'])
  })
});
describe('Mapping of Registrations numbers', function(){
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
  it('should map registrations from CA, CJ, CAW & CY only', function(){
    var callReg = RegistrationFactory()

    callReg.additionReg("CA 123")
    callReg.additionReg("CZ 123")

    assert.deepEqual(callReg.regMap(), ['CA 123'])

    var callReg2 = RegistrationFactory();

    callReg2.additionReg("CY 156")
    callReg2.additionReg("CV 124")

    assert.deepEqual(callReg2 .regMap(), ['CY 156'])
  });
});
describe('Initializing Map Registration Numbers', function(){
  it('should return initialized map of All registrations', function(){

    var callReg = RegistrationFactory(['CA 123',
      'CY 321',
      'CJ 451',
      'CAW 4123']);

    assert.deepEqual(callReg.regMap(), ['CA 123',
      'CY 321',
      'CJ 451',
      'CAW 4123'])
  })
  it('should return the counter of available towns in registration map and exclude other towns ', function(){
    var callReg = RegistrationFactory({'CA 123' : 0});

    callReg.additionReg("CA 123")
    callReg.additionReg("CY 123")

    var callReg2 = RegistrationFactory();

    callReg2.additionReg("CV 123")
    callReg2.additionReg("CJ 542")
    callReg2.additionReg("CAW 845")

    assert.deepEqual(callReg.regCounter(), 2);
    assert.deepEqual(callReg2.regCounter(), 2)

  })
});
