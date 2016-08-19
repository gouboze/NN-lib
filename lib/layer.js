var Neuron = require('./neuron.js').Neuron;

exports.Layer = function() {

};

exports.Layer.prototype.propagate = function (inputs) {
  var layerOutputs = [];
  for (var i = 0; i < nbNeurons;i++) {
    if (this.type === 'input') {
      neurons[i].outputValue = inputs[i];
      layerOutputs.push(inputs[i]);
    } else {
      layerOutputs.push(neurons[i].propagate);
    }
  }
  return layerOutputs;
};

exports.Layer.prototype.computeDelta = function (nextLayer) {

};

exports.Layer.prototype.adjustWeights = function (momentum, trainingStep, prevLayer) {

};

exports.Layer.prototype.create = function (type, nbNeurons) {

};

exports.Layer.prototype.load = function (type, neurons) {

};

exports.Layer.prototype.step = function() {

};

exports.Layer.prototype.initWeights = function (prevLayer) {
  if (prevLayer === {}) {
    
  }
};

