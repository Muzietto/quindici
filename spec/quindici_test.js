(function() {
  'use strict';

  define(['quindici', 'chai'], function(QD, chai) {
    var expect  = chai.expect;

    describe('qd', function() {
      it('xxx', function() {

        expect(QD.pippo).to.be.eql(12);
      });
    });
  });
})();