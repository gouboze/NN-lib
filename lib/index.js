var math = require('mathjs');

var NeuralNetwork = require('./neural-network.js').NeuralNetwork;

var neuralTest = new NeuralNetwork();
neuralTest.train('ert', 1, 2, 3, 4);
neuralTest.init('array');
neuralTest.feed([0,5,3,4]);
neuralTest.validate('setset', 0.5);
