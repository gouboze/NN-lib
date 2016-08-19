var Weight = require('./weight.js').Weight;
var math = require('mathjs');

exports.Neuron = function() {};

exports.Neuron.prototype.propagate = function (input) {
  var sum = 0;
  for (var i = 0; i < inputs.length;i++) {
    sum += this.curWeights[i] * inputs[i];
  }
  this.outputValue = this.transitionFunction(sum);
  return this.outputValue;
};


exports.Neuron.prototype.computeWeights = function (momentum, trainingStep, prevLayer) {
  if (prevLayer !== {}) {
    for ( var i = 0; i < this.curWeights.length; i++) {
      this.nextWeigths[i] = this.curWeights[i] + momentum * (this.curWeights[i] - this.prevWeights[i]) + trainingStep * this.delta * prevLayer.neurons[i].outputValue;
    }
  }
};

exports.Neuron.prototype.computeDelta = function (nextLayer, expectedResults) {
  if (nextLayer === {}) {
    this.delta = (expectedResults[this.index] - this.outputValue) * derivatedFunction(this.outputValue);
  } else {
    var sum = 0;
    for (var i = 0; i < nextLayer.nbNeurons;i++) {
      sum += nextLayer.neurons[i].delta * nextLayer.neurons[i].curWeights[this.index];
    }
    this.delta = sum * derivatedFunction(this.outputValue);
  }
  return this.delta;
};

exports.Neuron.prototype.create = function (transitionFunction, derivatedFunction, index) {
  this.transitionFunction = transitionFunction;
  this.derivatedFunction = derivatedFunction;
  this.index = index;
};

exports.Neuron.prototype.load = function (transitionFunction, derivatedFunction, index, weights) {
  this.transitionFunction = transitionFunction;
  this.derivatedFunction = derivatedFunction;
  this.index = index;
  this.curWeights = [];
  this.prevWeights = [];
  for (var i = 0; i < weights.length;i++) {
    var w = weights[i];
    this.curWeights.push(new Weight(w.index, w.value));
    this.prevWeights.push(new Weight(w.index, w.value));
  }  
};

exports.Neuron.prototype.initWeights = function (prevLayerSize, min, max) {
  this.curWeights = [];
  this.prevWeights = [];
  for (var i; i < prevLayerSize; i++) {
    var w = new Weight(i, 0);
    w.rand(min, max);
    curWeights.push(w);
    prevWeights.push(w);
  }
};
