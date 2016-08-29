var Neuron = require('./neuron.js').Neuron;
var math = require('mathjs');

exports.Layer = function() {

};

exports.Layer.prototype.propagate = function (inputs) {
  var layerOutputs = [];
  for (var i = 0; i < this.nbNeurons;i++) {
      layerOutputs.push(this.neurons[i].propagate(inputs));
  }
  return layerOutputs;
};

exports.Layer.prototype.computeDelta = function (nextLayer, expectedResults) {
    for (var i = 0; i < this.nbNeurons; i++) {
        this.neurons[i].computeDelta(nextLayer, expectedResults);
    }
};

exports.Layer.prototype.adjustWeights = function (momentum, trainingStep, prevLayer) {
    for (var i = 0; i < this.nbNeurons; i++) {
        this.neurons[i].adjustWeights(momentum, trainingStep, prevLayer);
    }
};

exports.Layer.prototype.create = function (type, nbNeurons, index) {
    this.nbNeurons = nbNeurons;
    this.type = type;
    this.index = index;
    this.neurons = [];

    for (var i = 0; i < this.nbNeurons; i++) {
        var n = new Neuron();
        n.create(this.type, i);
        this.neurons[i] = n;
    }
};

exports.Layer.prototype.load = function (type, neurons, index) {
    this.type = type;
    this.index = index;
    this.neurons = neurons;
    this.nbNeurons = neurons.length;
};

exports.Layer.prototype.step = function() {
    for (var i = 0; i < this.nbNeurons; i++) {
        this.neurons[i].step();
    }
};

exports.Layer.prototype.initWeights = function (prevLayer, min, max) {
    if (prevLayer !== {}) {
      for (var i = 0; i < this.nbNeurons; i++) {
          this.neurons[i].initWeights(prevLayer.nbNeurons, min, max);
      }
  }
};

exports.Layer.prototype.meanSquareError = function (expectedResults) {
    var sum = 0.0;
    for (var i = 0; i < this.nbNeurons; i++) {
        sum += (expectedResults[i] - this.neurons[i].outputValue) * (expectedResults[i] - this.neurons[i].outputValue);
    }
    return sum / this.nbNeurons;
};

exports.Layer.prototype.outputs = function () {
    var out = [];
    for (var i = 0; i < this.nbNeurons; i++) {
        out.push(this.neurons[i].outputValue);
    }
    return out;
};