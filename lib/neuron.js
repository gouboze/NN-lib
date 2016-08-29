var Weight = require('./weight.js').Weight;
var math = require('mathjs');

exports.Neuron = function() {};

exports.Neuron.prototype.propagate = function (inputs) {
  this.outputValue = this.transitionFunction(inputs);
  return this.outputValue;
};


exports.Neuron.prototype.adjustWeights = function (momentum, trainingStep, prevLayer) {
    this.nextWeights = [];
  if (Object.keys(prevLayer).length !== 0) {
    for ( var i = 0; i < this.curWeights.length; i++) {
        if (this.type == 'softmax' || this.type == 'max') {
            this.nextWeights[i] = new Weight(i, this.curWeights[i].value);
        } else {
            this.nextWeights[i]= new Weight(i, this.curWeights[i].value + momentum * (this.prevWeights[i].value - this.curWeights[i].value) + trainingStep * this.delta * prevLayer.neurons[i].outputValue);
        }
    }
  }
};

exports.Neuron.prototype.computeDelta = function (nextLayer, expectedResults) {
  if (Object.keys(nextLayer).length === 0) {
      this.delta = this.derivatedFunction(this.outputValue, expectedResults[this.index]);
      //console.log(this.outputValue, expectedResults[this.index], this.delta);
  } else {
    var sum = 0;
    for (var i = 0; i < nextLayer.nbNeurons;i++) {
      sum += nextLayer.neurons[i].delta * nextLayer.neurons[i].curWeights[this.index].value;
    }
    this.delta = sum * this.derivatedFunction(this.outputValue, expectedResults[this.index]);
  }
  return this.delta;
};

exports.Neuron.prototype.create = function (type, index) {
    this.type = type;
    this.index = index;
    if (this.type === 'input') {
        this.transitionFunction = function(inputs) {
            return inputs[this.index];
        };
        this.derivatedFunction = function(val) {
            return 0;
        }
    } else if (this.type === 'sigmoid') {
        this.transitionFunction = function(inputs) {
            var sum = 0;
            for (var i = 0; i < inputs.length;i++) {
                sum += this.curWeights[i].value * inputs[i];
            }
            return 1 / (1 + math.exp(-sum));
        };
        this.derivatedFunction = function(val) {
            return 1 / (1 + math.exp(-val)) * ( 1 - 1 / (1 + math.exp(-val)));
        }
    } else if (this.type === 'output') {
        this.transitionFunction = function(inputs) {
            var sum = 0;
            for (var i = 0; i < inputs.length;i++) {
                sum += this.curWeights[i].value * inputs[i];
            }
            return 1 / (1 + math.exp(-sum));
        };
        this.derivatedFunction = function(val) {
            return 1 / (1 + math.exp(-val)) * ( 1 - 1 / (1 + math.exp(-val)));
        }
    } else if (this.type === 'tanh') {
        this.transitionFunction = function(inputs) {
            var sum = 0;
            for (var i = 0; i < inputs.length;i++) {
                sum += this.curWeights[i].value * inputs[i];
            }
            return math.tanh(sum);
        };
        this.derivatedFunction = function(val) {
            return 1 - math.tanh(val) * math.tanh(val);
        }
    } else if (this.type === 'softmax') {
        this.transitionFunction = function(inputs) {
            var sum = 0;
            for (var i = 0; i < inputs.length;i++) {
                sum += inputs[i];
            }
            return inputs[this.index] / sum;
        };
        this.derivatedFunction = function(val, expected) {

            return expected - val;
        }
    } else if (this.type === 'max') {
        this.transitionFunction = function(inputs) {
            var max = inputs[0];
            for (var i = 0; i < inputs.length;i++) {
                if (inputs[i] > max) {
                    max = inputs[i];
                }
            }
            return (max == inputs[this.index])?1:0;
        };
        this.derivatedFunction = function(val, expected) {
            return expected - val;
        }
    }


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
    var w;
      if( this.type === 'softmax' || this.type === 'max') {
          w = new Weight(i,(i==this.index)?1:0);
      } else {
          w = new Weight(i,0);
          w.rand(min, max);

      }
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