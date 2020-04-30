export function sum(arr) {
        return arr.reduce((a, b) => a + b, 0);
}

export function rotatePointAroundPoint(p1, p2, angle) {
        const rotatedX = Math.cos(angle) * (p1.x - p2.x) - Math.sin(angle) * (p1.y - p2.y) + p2.x;
        const rotatedY = Math.sin(angle) * (p1.x - p2.x) + Math.cos(angle) * (p1.y - p2.y) + p2.y;
        return { x: Math.round(rotatedX), y: Math.round(rotatedY) };
}

export function euklidianDistance2D(p1, p2) {
        return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}