var math = require('mathjs');

var NeuralNetwork = require('./neural-network.js').NeuralNetwork;
var Layer = require('./layer.js').Layer;

var neuralTest = new NeuralNetwork();
var inputLayer = new Layer();
inputLayer.create('input', 2, 0);
var h1 = new Layer();
h1.create('tanh', 20, 1);
var h2 = new Layer();
h2.create('tanh', 20, 2);
var outputLayer = new Layer();
outputLayer.create('output', 2, 3);
var lastLayer = new Layer();
lastLayer.create('max', 2, 4);

var layerDef = [];
layerDef.push(inputLayer);
layerDef.push(h1);
layerDef.push(h2);
layerDef.push(outputLayer);
layerDef.push(lastLayer);

neuralTest.init(layerDef, false, -1, 1);
var trainingSet = [];
var x = 0; var y = 0;
for (var i = 0;i <= 10; i++) {
    for (var j = 0;j <= 10; j++) {
        var xa = x+i*0.1;
        var ya = y+j*0.1;
        trainingSet.push({inputs:[xa,ya],
            expected:[(0.5*(xa+1)*(xa+1) - 3*(ya)*(ya) > 1 || 0.5*(ya+1)*(ya+1) - 3*(xa)*(xa) > 1)?1:0,
                      (0.5*(xa+1)*(xa+1) - 3*(ya)*(ya) > 1 || 0.5*(ya+1)*(ya+1) - 3*(xa)*(xa) > 1)?0:1]});
    }
}
neuralTest.train(0.1, 0.01, 500000, 0.01, trainingSet);
var validationSet = [];
var x = 0; var y = 0;
for (var i = 0;i <= 5; i++) {
    for (var j = 0;j <= 5; j++) {
        var xa = math.random();
        var ya = math.random();
        validationSet.push({inputs:[xa,ya],
            expected:[(0.5*(xa+1)*(xa+1) - 3*(ya)*(ya) > 1 || 0.5*(ya+1)*(ya+1) - 3*(xa)*(xa) > 1)?1:0,
                (0.5*(xa+1)*(xa+1) - 3*(ya)*(ya) > 1 || 0.5*(ya+1)*(ya+1) - 3*(xa)*(xa) > 1)?0:1]});
    }
}
var validated = neuralTest.validate(validationSet,0.05);
console.log('this neuralNetwork is validated? ', validated);