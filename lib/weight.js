var math = require('mathjs');

exports.Weight = function(index, value) {
  this.index = index;
  this.value = value;
};

exports.Weight.prototype.rand = function (min, max) {
  this.value = math.random(min, max);
};

