(function() {
  'use strict';
  
  define([], function() {
    var size = 4,
    N = size - 1,
    model = {
      h: null,
      v: null
    }
    ;

    function buildModel() {
      var modelH = rndBidimArray(size),
      modelV = reverseModel(modelH)
      ;
      return {
        h: modelH,
        v: modelV
      };
    }

    function rndBidimArray(size) {
      return [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
    }

    function reverseModel(model) {
      var result = []
      ;
      for (var i = 0; i < size; i++) {
        result[i] = [];
        for (var j = 0; j < size; j++) {
          result[i][j] = model[j][i];
        }
      }
      return result;
    }

    function move(model, str) { // str e.g. '1,2,r'
      var pieces = str.split(','),
      x = pieces[0],
      y = pieces[1],
      dir = pieces[2]
      ;
      return {
        r: moveRight(model.h, x, y),
        l: moveLeft(model.h, x, y),
        u: moveRight(model.v, y, x),
        d: moveLeft(model.v, y, x)        
      }[dir];
    }

    function moveRight(model, x, y) {
      var result = clone(model)
      ;
      result[y] = slideRight(model[y], x);
      return result;
    }

    function moveLeft(model, x, y) {
      var result = clone(model)
      ;
      result[y] = slideLeft(model[y], x);
      return result;
    }

    function clone(arr) {
      return JSON.parse(JSON.stringify(arr));
    }

    function emptySlot(arr) {
      return arr.findIndex(elem => (elem === 0));
    }

    function slideRight(input, startPos) {
      var arr = clone(input),
      es = emptySlot(arr),
      i
      ;
      for (i = es; i > startPos; i--) {
        arr[i] = arr[i - 1];
      }
      arr[i] = 0;
      return arr;
    }

    function slideLeft(input, startPos) {
      var arr = clone(input),
      es = emptySlot(arr),
      i
      ;
      for (i = es; i < startPos; i++) {
        arr[i] = arr[i + 1];
      }
      arr[i] = 0;
      return arr;
    }

    return {
      emptySlot: emptySlot,
      slideRight: slideRight,
      slideLeft: slideLeft,
      move: move,
      moveRight: moveRight,
      moveLeft: moveLeft,
      buildModel: buildModel
    };
  });
  
})();