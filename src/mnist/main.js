import * as tf from '@tensorflow/tfjs';
import { indexOfMax } from '../util/util';
import { normalize } from './normalize';
import Draw from 'draw-on-canvas';

async function loadModel() {
    const model = await tf.loadLayersModel('models/mnist/model.json');

    return model;
}

async function predict(model, inputTensor) {
    const reshapedInput = inputTensor.reshape([1, 28, 28, 1]);
    const prediction = model.predict(reshapedInput);
    const predictionArray = await prediction.array();
    const predictedNumber = indexOfMax(predictionArray[0]);
    
    return predictedNumber;
}

async function main() {
    const model = await loadModel();
    
    const root = document.getElementById('root');

    const draw = new Draw(root, 256, 256);

    const resetButton = document.getElementById('reset');
    const predictButton = document.getElementById('predict');
    const outputElement = document.getElementById('output');

    resetButton.onclick = () => {
        draw.reset();
        outputElement.innerHTML = '';
    }

    predictButton.onclick = async () => {
        const normalizedContext = normalize(draw.ctx);

        const pixelArray = Array.from(Draw.getGreyScalePixelArray(normalizedContext));
        const inputTensor = tf.tensor(pixelArray)

        const predicition = await predict(model, inputTensor);

        outputElement.innerHTML = `predicted ${predicition}`;
    }
}

main();
