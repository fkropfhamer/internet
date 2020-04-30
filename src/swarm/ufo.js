import { rotatePointAroundPoint, euklidianDistance2D } from '../util/math';

export default class Ufo {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx  
     */
    render(ctx) {
        ctx.fillStyle = "#ffde82";
        ctx.beginPath();

        const a = {x: this.x + 25, y: this.y};
        const b = {x: this.x - 25, y: this.y - 15};
        const c = {x: this.x - 15, y: this.y};
        const d = {x: this.x - 25, y: this.y + 15};

        const ra = rotatePointAroundPoint(a, this, this.angle);
        const rb = rotatePointAroundPoint(b, this, this.angle);
        const rc = rotatePointAroundPoint(c, this, this.angle);
        const rd = rotatePointAroundPoint(d, this, this.angle);


        ctx.lineTo(ra.x, ra.y);
        ctx.lineTo(rb.x, rb.y);
        ctx.lineTo(rc.x, rc.y);
        ctx.lineTo(rd.x, rd.y);
        ctx.closePath();

        ctx.lineWidth = 2
        ctx.stroke();
    
        ctx.fill();
    }

    update(speed, maxX, maxY, otherUfos) {
        otherUfos.forEach(ufo => {
            const distance = euklidianDistance2D(ufo, this);

            if (distance < 15) {
                this.angle += (Math.random() - 0.5) * Math.PI / 2
            }
        });

        this.x += speed * Math.cos(this.angle);
        this.y += speed * Math.sin(this.angle);

        this.x = this.x < 0 ? maxX : this.x % maxX;
        this.y = this.y < 0 ? maxY : this.y % maxY;


    }
}