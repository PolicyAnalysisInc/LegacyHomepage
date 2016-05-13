"use strict";

var r2d3 = r2d3 || {};

/**
 * Expand a dataset to include additional records to match those of another dataset.
 * @param {Array} data: dataset to expand.
 * @param {Number} key: key for position column of dataset.
 * @return {Number} value: values of position column of other dataset.
 * @return {Array} new dataset with addiional points to match those of other dataset.
 */
r2d3.copyNearest = function(data, key, value){
    var distance = 0,
        minDistance = Number.MAX_VALUE,
        minIndex = 0,
        outObj = {},
        keys = [];
    for(var i = 0; i < data.length; i ++){
      distance = Math.abs(data[i][key] - value);
      if(distance < minDistance){
        minIndex = i;
        minDistance = distance;
      }
    }
    keys = Object.keys(data[minIndex]);
    for(var j = 0; j < keys.length; j++){
      outObj[keys[j]] = data[minIndex][keys[j]];
    }
    return outObj;
  };

// Add points that weren't in previous dataset
r2d3.tweenAreaStart = function(dataOld, dataNew, key){
  var newLength = dataNew.length,
      oldValues = d3.set(dataOld.map(function(d) { return d[key]; })),
      dataTween = dataOld.slice();

  for(var i = 0; i < newLength; i++){
    if(!oldValues.has(dataNew[i][key])){
      dataTween.push(r2d3.copyNearest(dataOld, key, dataNew[i][key]));
    }
  }
  dataTween.sort(function(a, b){ return d3.ascending(a[key], b[key]); });
  return dataTween;
};

// Add points that aren't in new dataset
r2d3.tweenAreaEnd = function(dataOld, dataNew, key){

  var oldLength = dataOld.length,
      newValues = d3.set(dataNew.map(function(d) { return d[key]; })),
      dataTween = dataNew.slice();

  for(var i = 0; i < oldLength; i++){
    if(!newValues.has(dataOld[i][key])){
      dataTween.push(r2d3.copyNearest(dataNew, key, dataOld[i][key]));
    }
  }
  dataTween.sort(function(a, b){ return d3.ascending(a[key], b[key]); });

  return dataTween;
};
