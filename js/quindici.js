(function() {
  'use strict';
  
  define([], function() {
    var size = 4,
    N = size - 1
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

    // for the moment it produces [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
    function rndBidimArray(size) {
      var result = [],
      count = 0
      ;
      for (var i = 0; i < size; i++) {
        result[i] = [];
        for (var j = 0; j < size; j++) {
          result[i][j] = ++count;
        }
      }
      result[size-1][size-1] = 0;
      return result;
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

    function move(model, str) { // str e.g. '12r'
      var result = clone(model),
      pieces = str.split(''),
      x = parseInt(pieces[0]),
      y = parseInt(pieces[1]),
      dir = pieces[2]
      ;
      switch (dir) {
        case 'r': {
          result.h = moveRight(model.h, x, y);
          result.v = reverseModel(result.h);
          break;
        }
        case 'l': {
          result.h = moveLeft(model.h, x, y);
          result.v = reverseModel(result.h);
          break;
        }
        case 'd': {
          result.v = moveRight(model.v, y, x);
          result.h = reverseModel(result.v);
          break;
        }
        case 'u': {
          result.v = moveLeft(model.v, y, x);
          result.h = reverseModel(result.v);
          break;
        }
      }
      return result;
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