(function() {
  'use strict';
  function denormalize(obj) {
    if (Object.keys(obj).length === 0) return {};
    var input = serialize(obj),
    firstBossName = input[0][1],
    firstEmployeeName = input[0][0],
    firstBossObj = {},
    firstEmpObj = {}
    ;
    firstEmpObj[firstEmployeeName] = [];
    firstBossObj[firstBossName] = [firstEmpObj];
    if (Object.keys(obj).length === 1) return firstBossObj;
    return denorm(input.slice(1), firstBossObj, firstBossObj);
  }

  function denorm(relationships, resultTree) {
    if (relationships.length === 0) return resultTree;
    var bossName = relationships[0][1],
    employeeName = relationships[0][0],
    topDogName = label(resultTree),
    nextResultTree,
    nextRelationship = {}
    ;
    if (topDogName === employeeName) {
      nextRelationship[bossName] = [_clone(resultTree)];
      return denorm(relationships.slice(1), nextRelationship);
    }
    nextResultTree = append(employeeName, bossName, resultTree);
    return denorm(relationships.slice(1), nextResultTree);
  }

  function serialize(obj) {
    var result = []
    ;
    Object.keys(obj).forEach(key => result.push([key,obj[key]]));
    // TODO - put array ordering here
    return result;
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