(function() {
  'use strict';

  define(['hyera', 'chai'], function(HY, chai) {
    var expect  = chai.expect,
    js = JSON.stringify
    ;
    describe('HY', function() {

      describe('can find nodes', function() {
        it('at the top of a depth-1 tree', function() {
          expect(HY.found('a',{'a':[]}))
            .to.be.true;
          expect(HY.found('b',{'a':[]}))
            .to.be.false;
        });
        it('at level 1 of a depth-2 tree', function() {
          expect(HY.found('b',{'a':[{'b':[]}]}))
            .to.be.true;
        });
        it('at level 2 of a depth-3 tree', function() {
          expect(HY.found('c',{'a':[{'b':[{'c':[]}]}]}))
            .to.be.true;
        });
        it('inside a multiple-branch tree (1)', function() {
          expect(HY.found('c',{'a':[{'b':[]},{'c':[]}]}))
            .to.be.true;
          expect(HY.found('d',{'a':[{'b':[]},{'c':[]}]}))
            .to.be.false;
        });
        it('inside a multiple-branch tree (2)', function() {
          expect(HY.found('d',{'a':[{'b':[]},{'c':[{'d':[]}]}]}))
            .to.be.true;
          expect(HY.found('e',{'a':[{'b':[]},{'c':[{'d':[]}]}]}))
            .to.be.false;
        });
      });

      describe('can append leaves', function() {
        it('to the top node of a depth-1 tree', function() {
          expect(HY.append('c','a',{'a':[]}))
            .to.be.eql({'a':[{'c':[]}]});
        });
        it('to the top node of a depth-2 tree', function() {
          expect(HY.append('c','a',{'a':[{'b':[]}]}))
            .to.be.eql({'a':[{'b':[]},{'c':[]}]});
        });
        it('to the inner node of a depth-2 tree (1)', function() {
          expect(HY.append('c','b',{'a':[{'b':[]}]}))
            .to.be.eql({'a':[{'b':[{'c':[]}]}]});
        });
        it('to the inner node of a depth-2 tree (2)', function() {
          expect(HY.append('d','b',{'a':[{'b':[{'c':[]}]}]}))
            .to.be.eql({'a':[{'b':[{'c':[]},{'d':[]}]}]});
        });
      });

      describe('can serialize', function() {
        it('empty objects', function() {
          expect(HY.serialize({}))
            .to.be.eql([]);
        });
        it('objects by their keys', function() {
          expect(HY.serialize({'pete':'nick','barbara':'nick'}))
            .to.be.eql([['pete','nick'],['barbara','nick']]);
        });
      });

      describe('can solve', function() {
        it('empty hierarchies', function() {
          expect(HY.denormalize({}))
            .to.be.eql({});
        });
        it('single hierarchies', function() {
          expect(HY.denormalize({'pete':'nick'}))
            .to.be.eql({'nick':[{'pete':[]}]});
        });
        it('multiple hierarchies 1', function() {
          expect(HY.denormalize({'pete':'nick','barbara':'nick'}))
            .to.be.eql({'nick':[{'pete':[]},{'barbara':[]}]});
        });
        it('multiple hierarchies 2', function() {
          expect(HY.denormalize({'pete':'nick','barbara':'nick','philip':'nick'}))
            .to.be.eql({'nick':[{'pete':[]},{'barbara':[]},{'philip':[]}]});
        });
        it('chained hierarchies 1', function() {
          expect(HY.denormalize({'pete':'nick','nick':'sophie'}))
            .to.be.eql({'sophie':[{'nick':[{'pete':[]}]}]});
        });
        it('chained hierarchies 2', function() {
          expect(HY.denormalize({'nick':'sophie','pete':'nick'}))
            .to.be.eql({'sophie':[{'nick':[{'pete':[]}]}]});
        });
        it('chained hierarchies 3', function() {
          expect(HY.denormalize({'barbara':'nick','nick':'sophie','pete':'nick'}))
            .to.be.eql({'sophie':[{'nick':[{'barbara':[]},{'pete':[]}]}]});
        });
        it('chained hierarchies 4', function() {
          expect(HY.denormalize({'pete':'nick','nick':'sophie','sophie':'jonas'}))
            .to.be.eql({'jonas':[{'sophie':[{'nick':[{'pete':[]}]}]}]});
        });
        it('chained hierarchies 5', function() {
          expect(_clone(HY.denormalize({'nick':'sophie','pete':'nick','sophie':'jonas'})))
            .to.be.eql(_clone({'jonas':[{'sophie':[{'nick':[{'pete':[]}]}]}]}));
        });
        it('complex cases 1', function() {
          expect(HY.denormalize({'pete':'nick','nick':'sophie','sophie':'jonas','barbara':'nick'}))
            .to.be.eql({'jonas':[{'sophie':[{'nick':[{'pete':[]},{'barbara':[]}]}]}]});
        });
        it('complex cases 2 - layers of bosses', function() {
          expect(HY.denormalize({'pete':'nick','nick':'sophie','luke':'sophie','sophie':'jonas','barbara':'nick'}))
            .to.be.eql({'jonas':[{'sophie':[{'nick':[{'pete':[]},{'barbara':[]}]},{'luke':[]}]}]});
        });
        it('complex cases 2 - given testcase', function() {
          expect(HY.denormalize({'pete':'nick','barbara':'nick','nick':'sophie','sophie':'jonas'}))
            .to.be.eql({'jonas':[{'sophie':[{'nick': [{'pete':[]},{'barbara':[]}]}]}]});
        });
        it('complex cases 3 - temporary inconsistencies', function() {
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

    function _clone(thing) {
      return JSON.stringify(thing);
    }
  });
})();