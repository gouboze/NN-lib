var Weight = require('./weight.js').Weight;

exports.Neuron = function() {};

exports.Neuron.prototype.propagate = function (inputs) {
  var sum = 0;
  for (var i = 0; i < inputs.length;i++) {
    sum += this.curWeights[i].value * inputs[i];
  }
    
  this.outputValue = this.transitionFunction(sum);
  return this.outputValue;
};


exports.Neuron.prototype.adjustWeights = function (momentum, trainingStep, prevLayer) {
    this.nextWeights = [];
  if (prevLayer !== {}) {

    for ( var i = 0; i < this.curWeights.length; i++) {

      this.nextWeights[i]= new Weight(i, this.curWeights[i].value + momentum * (this.prevWeights[i].value - this.curWeights[i].value) + trainingStep * this.delta * prevLayer.neurons[i].outputValue);
    }
  }
};

exports.Neuron.prototype.computeDelta = function (nextLayer, expectedResults) {
  if (Object.keys(nextLayer).length === 0) {
    this.delta = (expectedResults[this.index] - this.outputValue) * this.derivatedFunction(this.outputValue);
  } else {
    var sum = 0;
    for (var i = 0; i < nextLayer.nbNeurons;i++) {
      sum += nextLayer.neurons[i].delta * nextLayer.neurons[i].curWeights[this.index].value;
    }
    this.delta = sum * this.derivatedFunction(this.outputValue);
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
  for (var i = 0; i < prevLayerSize; i++) {
    var w = new Weight(i, 0);
    w.rand(min, max);
    this.curWeights.push(w);
    this.prevWeights.push(w);
  }
};

exports.Neuron.prototype.step = function() {
  this.prevWeights = [];
  for (var i = 0; i < this.curWeights.length;i++) {
    this.prevWeights[i] = new Weight(this.curWeights[i].index, this.curWeights[i].value);
    this.curWeights[i] = new Weight(this.nextWeights[i].index, this.nextWeights[i].value);
  }
};