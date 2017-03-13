(function() {
  'use strict';
  function denormalize(obj) {
    return denorm(serialize(obj), {}, {});
  }

  function serialize(obj) {
    var result = []
    ;
    Object.keys(obj).forEach(key => result.push([key,obj[key]]));
    return result;
  }

  function denorm(arra, acc) {
    if (arra.length === 0) return acc;
    var result = _clone(acc),
    input = _clone(arra),
    emp = arra[0][0],
    boss = arra[0][1],
    relationship = {},
    currentTopDog
    ;
    if (Object.keys(result).length === 0) { // acc === {}
      relationship[emp] = [];
      result[boss] = [relationship];
      return denorm(input.slice(1), result);
    }
    currentTopDog = Object.keys(result)[0];
    if (currentTopDog === boss) {
      relationship[emp] = [];
      result[boss].push(relationship);
      return denorm(input.slice(1), result);
    }
    if (emp === currentTopDog) {
      relationship[boss] = [result];
      return denorm(input.slice(1), relationship);
    }
    if (result[currentTopDog].length === 0) { // backtrack
      return denorm(input, topmost);
    }
    relationship[currentTopDog] = result[currentTopDog]
      .map(function(potentialBossObj) {
        return denorm(input, potentialBossObj);
      });
    return relationship;
  }

  function _clone(thing) {
    return JSON.parse(JSON.stringify(thing));
  }

  define([], function() {
    return {
      denormalize: denormalize,
      serialize: serialize
    };
  });
})();