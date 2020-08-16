import * as tf from '@tensorflow/tfjs';
import { chunkArray, indexOfMax } from '../util/util';
import Draw from './draw';

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

function normalize(ctx) {
    const boundBox = getMinBoundBox(ctx);

    const boundBoxHeight = boundBox.maxPoint.y - boundBox.minPoint.y;
    const boundBoxWidth = boundBox.maxPoint.x - boundBox.minPoint.x;

    const x = boundBoxHeight > boundBoxWidth ? boundBoxHeight : boundBoxWidth;

    const normalizedCanvas = document.createElement("canvas");
    normalizedCanvas.width = 20;
    normalizedCanvas.height = 20;
    const context = normalizedCanvas.getContext("2d");

    context.drawImage(ctx.canvas, boundBox.minPoint.x, boundBox.minPoint.y, x, x, 0, 0, 20, 20);

    const pm = Draw.getPixelMatrix(context);

    const centerOfMass = getCenterOfMass(pm);

    const normalizedCanvas2 = document.createElement("canvas");

    normalizedCanvas2.width = 28;
    normalizedCanvas2.height = 28;
    const normalizedContext = normalizedCanvas2.getContext("2d");

    const halfSize = 28 / 2;

    normalizedContext.drawImage(normalizedCanvas, halfSize - centerOfMass.x, halfSize - centerOfMass.y);

    return normalizedContext;
}

function getCenterOfMass(pixelMatrix) {
    let numPixels = 0;
    let sumX = 0;
    let sumY = 0;
    pixelMatrix.forEach((ys, y) => {
        ys.forEach((pixel, x) => {
            const weight = (pixel / 255)
            sumX += (x * weight);
            sumY += (y * weight);
            numPixels += weight;
        })
    })

    const x = sumX / numPixels;
    const y = sumY / numPixels;

    return { x, y };
}

function getMinBoundBox(ctx) {
    const height = ctx.canvas.height;
    const width = ctx.canvas.width;

    const pixelArray = Draw.getGreyScalePixelArray(ctx);
    const pixelMatrix = chunkArray(pixelArray, width);

    let minY = Infinity;
    let minX = Infinity;
    let maxY = -Infinity;
    let maxX = -Infinity;


    for (let y = 0; y < height; y++) {
        for (let x = 0; x < height; x++) {
            const pixel = pixelMatrix[y][x];
            if (pixel > 0) {
                if (minX > x) {
                    minX = x;
                }
                if (minY > y) {
                    minY = y;
                }
                if (maxX < x) {
                    maxX = x;
                }
                if (maxY < y) {
                    maxY = y;
                }
            } 
        }
    } 

    return { minPoint: { x: minX, y: minY }, maxPoint: { x: maxX, y: maxY } };
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

        console.log(normalizedContext);

        const pixelArray = Array.from(Draw.getGreyScalePixelArray(normalizedContext));

        const inputTensor = tf.tensor(pixelArray)

        const predicition = await predict(model, inputTensor);

        console.log('predicted', predicition);

        outputElement.innerHTML = `predicted ${predicition}`;
    }
}

main().then(() => console.log("finished"));
