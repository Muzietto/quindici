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


    function reverseModel(model) {
      
    }

    function move(model, str) { // e.g. '1,2,r'
      var pieces = str.split(','),
      x = pieces[0],
      y = pieces[1],
      dir = pieces[2]
      ;
      return {
        r: moveRight(model.h,x,y),
        l: moveLeft(model.h,x,y),
        u: moveRight(model.v,y,x),
        d: moveLeft(model.v,y,x)        
      }[dir];
    }

    function moveRight(model) {
      
    }

    function moveLeft(model) {
      
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
      reverseModel: reverseModel
    };
  });
  
})();