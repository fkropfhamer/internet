export default class Draw {
    /**
     * 
     * @param {HTMLElement} element 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(element, width, height) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.backgroundColor = 'cyan'

        element.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");
        this.drawing = [[]];

        this.height = height;
        this.width = width;

        this.canvas.addEventListener("mousemove", (event) => {
            const x = event.offsetX;
            const y = event.offsetY;
            if (this.mouseIsDown) {
                this.drawing[this.drawing.length - 1].push({x, y});
                this.draw();
            }
        });
        
        window.addEventListener("mousedown", () => {
            this.mouseIsDown = true;
        });
        
        window.addEventListener("mouseup", () => {
            if (this.drawing[this.drawing.length - 1].length > 0) {
                this.drawing.push([])
            }
            this.mouseIsDown = false;
        })
    }

    reset() {
        this.drawing = [[]];
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    draw() {
        this.drawing.forEach((stroke) => {
            this.drawPoints(stroke);
        });
    }

    drawPoints(points) {
        if (points.length === 0) {
            return;
        }

        // draw a basic circle instead
        if (points.length < 6) {
            const b = points[0];
            this.ctx.beginPath();
            this.ctx.arc(b.x, b.y, this.ctx.lineWidth / 2, 0, Math.PI * 2, !0);
            this.ctx.closePath(); 
            this.ctx.fill();
            return
        }

        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        // draw a bunch of quadratics, using the average of two points as the control point
        
        let i;

        for (i = 1; i < points.length - 2; i++) {
            const c = (points[i].x + points[i + 1].x) / 2;
            const d = (points[i].y + points[i + 1].y) / 2;
            this.ctx.quadraticCurveTo(points[i].x, points[i].y, c, d)
        }

        this.ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
        this.ctx.stroke();
    }
}