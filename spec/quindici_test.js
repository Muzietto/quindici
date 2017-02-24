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
      it('can build models', function() {
        expect(JSON.stringify(QD.buildModel().v)).to.be.eql('[[1,5,9,13],[2,6,10,14],[3,7,11,15],[4,8,12,0]]');
      });
      it('can move tiles right', function() {
        var model = QD.buildModel()
        ;
        expect(JSON.stringify(QD.moveRight(model.h,2,3))).to.be.eql('[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,0,15]]');
        expect(JSON.stringify(QD.moveRight(model.h,0,3))).to.be.eql('[[1,2,3,4],[5,6,7,8],[9,10,11,12],[0,13,14,15]]');
      });
      it('can move tiles left', function() {
        var model = QD.buildModel(),
        shifted = QD.moveRight(model.h,0,3)
        ;
        expect(JSON.stringify(QD.moveLeft(shifted,1,3))).to.be.eql('[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,0,14,15]]');
        expect(JSON.stringify(QD.moveLeft(shifted,3,3))).to.be.eql('[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]]');
      });
      it('can assign complex moves right', function() {
        var model = QD.buildModel()
        ;
        expect(JSON.stringify(QD.move(model,'03r').h)).to.be.eql('[[1,2,3,4],[5,6,7,8],[9,10,11,12],[0,13,14,15]]');
        expect(JSON.stringify(QD.move(model,'23r').h)).to.be.eql('[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,0,15]]');
      });
      it('can assign complex moves left', function() {
        var model = QD.buildModel(),
        shifted = QD.move(model,'03r')
        ;
        expect(JSON.stringify(QD.move(shifted,'03l').h)).to.be.eql('[[1,2,3,4],[5,6,7,8],[9,10,11,12],[0,13,14,15]]');
        expect(JSON.stringify(QD.move(shifted,'23l').h)).to.be.eql('[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,0,15]]');
      });
      it('can assign complex moves down', function() {
        var model = QD.buildModel()
        ;
        expect(JSON.stringify(QD.move(model,'30d').h)).to.be.eql('[[1,2,3,0],[5,6,7,4],[9,10,11,8],[13,14,15,12]]');
        expect(JSON.stringify(QD.move(model,'32d').h)).to.be.eql('[[1,2,3,4],[5,6,7,8],[9,10,11,0],[13,14,15,12]]');
      });
    });
      it('can assign complex moves up', function() {
        var model = QD.buildModel(),
        shifted = QD.move(model,'30d')
        ;
        expect(JSON.stringify(QD.move(shifted,'33u').h)).to.be.eql('[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]]');
        expect(JSON.stringify(QD.move(shifted,'32u').h)).to.be.eql('[[1,2,3,4],[5,6,7,8],[9,10,11,0],[13,14,15,12]]');
      });
  });
})();