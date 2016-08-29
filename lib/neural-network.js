var Layer = require('./layer.js').Layer;

exports.NeuralNetwork = function() {

};

exports.NeuralNetwork.prototype.feed = function (inputs) {
    for (var i = 0; i < this.layers.length; i++) {
        inputs = this.layers[i].propagate(inputs);
    }
    return inputs;
};

exports.NeuralNetwork.prototype.init = function (layerDef, isLoaded, minWeight, maxWeight) {
    console.log('init');
    this.layers = layerDef;
    if (!isLoaded) {
        this.layers[0].initWeights({},0,0);
        for (var i = 1; i < layerDef.length; i++) {
            this.layers[i].initWeights(this.layers[i-1], minWeight, maxWeight);
        }
    }
};

exports.NeuralNetwork.prototype.train = function (momentum, trainingStep, maxIter, minAmse, trainingSet) {
    console.log('train');
    var iter = 0;
    var amse = 1;
    var mse = 0;
    while (iter < maxIter && amse > minAmse) {
        this.feed(trainingSet[iter%trainingSet.length].inputs);
        mse += this.layers[this.layers.length - 1].meanSquareError(trainingSet[iter%trainingSet.length].expected);
        this.layers[this.layers.length - 1].computeDelta({}, trainingSet[iter%trainingSet.length].expected);
        for (var i = this.layers.length - 2; i >= 0; i--) {
            this.layers[i].computeDelta(this.layers[i+1], trainingSet[iter%trainingSet.length].expected);
        }
        for (var j = 1; j < this.layers.length; j++) {
            this.layers[j].adjustWeights(momentum, trainingStep, this.layers[j - 1]);
        }
        for (var j = 0; j < this.layers.length; j++) {
            this.layers[j].step();
        }
        iter++;
        amse = mse / iter;
        if (iter%1000 == 0) {
            console.log('iter : ' , iter, ' , amse : ', amse);
        }

    }
};

exports.NeuralNetwork.prototype.validate = function (validationSet, targetAmse) {
    console.log('validate');
    var amse = 0;
    for (var i = 0; i < validationSet.length; i++) {
        this.feed(validationSet[i].inputs)
        console.log(validationSet[i].expected, this.layers[this.layers.length - 1].outputs() );
        amse += this.layers[this.layers.length - 1].meanSquareError(validationSet[i].expected);
    }
    amse = amse / validationSet.length;
    console.log('validation result: ', amse);
    return amse <= targetAmse;
};