'use strict';

describe('Controller: LibCtrl', function () {

  // load the controller's module
  beforeEach(module('lmsApp'));

  var LibCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LibCtrl = $controller('LibCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
