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

  function denorm(relsArray, accObj, previousObj) {
    if (relsArray.length === 0) return accObj;
    var result = _clone(accObj),
    previous = _clone(previousObj)
    rels = _clone(relsArray),
    employee = rels[0][0],
    boss = rels[0][1],
    relationship = {},
    currentBoss,
    previousBoss
    ;
    if (Object.keys(result).length === 0) { // accObj, previousObj === {}
      relationship[employee] = [];
      result[boss] = [relationship];
      return denorm(rels.slice(1), result, result);
    }
    currentBoss = name(result);
    if (currentBoss === boss) { // push new employee && backtrack
      relationship[employee] = [];
      //result[boss].push(relationship);
      previousBoss = name(previous);
      previous[previousBoss].filter(empObj => name(empObj) === boss)[0][boss].push(relationship);
      return denorm(rels.slice(1), previous, previous);
    }
    if (currentBoss === employee) {
      relationship[boss] = [result];
      return denorm(rels.slice(1), relationship);
    }
    if (result[currentBoss].length === 0) { // backtrack
      return denorm(rels, topmost);
    }
    relationship[currentBoss] = result[currentBoss]
      .map(function(potentialBossObj) {
        return denorm(rels, potentialBossObj);
      });
    return relationship;
  }

  function found(newLabel, node) {
    if (label(node) === newLabel) return true;
    return children(node).some(function(sub) {
      return found(newLabel, sub);
    });
  }

  function append(newLabel, parentLabel, node) {
    var result = _clone(node),
    newNode = {}
    ;
    newNode[newLabel] = [];
    if (label(node) === parentLabel) {
      children(result).push(newNode);
      return result;
    }
    result[label(node)] = children(node).map(function(n) {
      if (found(parentLabel, n)) {
        return append(newLabel, parentLabel, n);
      }
      return _clone(n);
    });
    return result;
  }

  function label(node) {
    return Object.keys(node)[0];
  }

  function children(node) {
    return node[label(node)];
  }

  function _clone(thing) {
    return JSON.parse(JSON.stringify(thing));
  }

  define([], function() {
    return {
      denormalize: denormalize,
      serialize: serialize,
      append: append,
      found: found
    };
  });
})();