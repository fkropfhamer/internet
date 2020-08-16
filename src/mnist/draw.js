class Draw {
    constructor(element, length, width) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.drawing = [[]];

        this.length = length;
        this.width = width;
    }

    reset() {
        this.drawing = [[]];
        this.ctx.clearRect()
    }
}