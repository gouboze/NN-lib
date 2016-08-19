var math = require('mathjs');

var NeuralNetwork = require('./neural-network.js').NeuralNetwork;
var Layer = require('./layer.js').Layer;

var neuralTest = new NeuralNetwork();
var inputLayer = new Layer();
inputLayer.create('input', 2, 0);
var outputLayer = new Layer();
outputLayer.create('output', 3, 1);
var layerDef = [];
layerDef.push(inputLayer);
layerDef.push(outputLayer);
console.log(layerDef);
neuralTest.init(layerDef, false, -0.5, 0.5);
console.log(neuralTest.feed([4,8]));
console.log('MSE: ', outputLayer.meanSquareError([1,0,1]));

