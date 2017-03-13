(function() {
  'use strict';

  define(['hyera', 'chai'], function(HY, chai) {
    var expect  = chai.expect,
    js = JSON.stringify
    ;
    describe('HY', function() {

  function _clone(thing) {
    return JSON.stringify(thing);
  }
      it('can serialize empty objects', function() {
        expect(HY.serialize({}))
          .to.be.eql([]);
      });
      it('can serialize objects by their keys', function() {
        expect(HY.serialize({'pete':'nick','barbara':'nick'}))
          .to.be.eql([['pete','nick'],['barbara','nick']]);
      });
      it('can solve empty hierarchies', function() {
        expect(HY.denormalize({}))
          .to.be.eql({});
      });
      it('can solve single hierarchies', function() {
        expect(HY.denormalize({'pete':'nick'}))
          .to.be.eql({'nick':[{'pete':[]}]});
      });
      it('can solve multiple hierarchies 1', function() {
        expect(HY.denormalize({'pete':'nick','barbara':'nick'}))
          .to.be.eql({'nick':[{'pete':[]},{'barbara':[]}]});
      });
      it('can solve multiple hierarchies 2', function() {
        expect(HY.denormalize({'pete':'nick','barbara':'nick','philip':'nick'}))
          .to.be.eql({'nick':[{'pete':[]},{'barbara':[]},{'philip':[]}]});
      });
      it('can solve chained hierarchies 1', function() {
        expect(HY.denormalize({'pete':'nick','nick':'sophie'}))
          .to.be.eql({'sophie':[{'nick':[{'pete':[]}]}]});
      });
      it('can solve chained hierarchies 2', function() {
        expect(HY.denormalize({'nick':'sophie','pete':'nick'}))
          .to.be.eql({'sophie':[{'nick':[{'pete':[]}]}]});
      });
      it('can solve chained hierarchies 3', function() {
        expect(HY.denormalize({'barbara':'nick','nick':'sophie','pete':'nick'}))
          .to.be.eql({'sophie':[{'nick':[{'barbara':[]},{'pete':[]}]}]});
      });
      it('can solve chained hierarchies 4', function() {
        expect(HY.denormalize({'pete':'nick','nick':'sophie','sophie':'jonas'}))
          .to.be.eql({'jonas':[{'sophie':[{'nick':[{'pete':[]}]}]}]});
      });
      it('can solve chained hierarchies 5', function() {
        expect(_clone(HY.denormalize({'nick':'sophie','pete':'nick','sophie':'jonas'})))
          .to.be.eql(_clone({'jonas':[{'sophie':[{'nick':[{'pete':[]}]}]}]}));
      });
      it('can solve complex cases 1', function() {
        expect(HY.denormalize({'pete':'nick','nick':'sophie','sophie':'jonas','barbara':'nick'}))
          .to.be.eql({'jonas':[{'sophie':[{'nick':[{'pete':[]},{'barbara':[]}]}]}]});
      });
      it('can solve complex cases 2 - layers of bosses', function() {
        expect(HY.denormalize({'pete':'nick','nick':'sophie','luke':'sophie','sophie':'jonas','barbara':'nick'}))
          .to.be.eql({'jonas':[{'sophie':[{'nick':[{'pete':[]},{'barbara':[]}]},{'luke':[]}]}]});
      });
      it('can solve complex cases 2 - given testcase', function() {
        expect(HY.denormalize({'pete':'nick','barbara':'nick','nick':'sophie','sophie':'jonas'}))
          .to.be.eql({'jonas':[{'sophie':[{'nick': [{'pete':[]},{'barbara':[]}]}]}]});
      });
      it('can solve complex cases 3 - temporary inconsistencies', function() {
        expect(HY.denormalize({'pete':'nick','barbara':'nick','sophie':'jonas','nick':'sophie'}))
          .to.be.eql({'jonas':[{'sophie':[{'nick': [{'pete':[]},{'barbara':[]}]}]}]});
      });
      xit('can detect people with two bosses', function() {
        expect(() => HY.denormalize({'pete':'nick','pete':'sophie'}))
          .to.throw;
      });
      xit('can detect circular relationships', function() {
        expect(() => HY.denormalize({'pete':'nick','nick':'sophie','sophie':'jonas','jonas':'pete'}))
          .to.throw;
      });
    });
  });
})();