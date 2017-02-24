(function() {
  'use strict';

  define(['quindici', 'chai'], function(QD, chai) {
    var expect  = chai.expect;

    describe('qd', function() {
      it('can find empty slots', function() {
        expect(QD.emptySlot([0,2,10,1])).to.be.eql(0);
        expect(QD.emptySlot([1,2,0,1])).to.be.eql(2);
      });
      it('can slide tiles right to fill empty slots', function() {
        expect(QD.slideRight([1,2,0,10],0)).to.be.eql([0,1,2,10]);
        expect(QD.slideRight([1,2,0,10],1)).to.be.eql([1,0,2,10]);
      });
      it('can slide tiles left to fill empty slots', function() {
        expect(QD.slideLeft([0,2,10,1],2)).to.be.eql([2,10,0,1]);
        expect(QD.slideLeft([0,2,10,1],1)).to.be.eql([2,0,10,1]);
        expect(QD.slideLeft([0,2,10,1],3)).to.be.eql([2,10,1,0]);
      });
    });
  });
})();