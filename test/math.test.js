import { sum, rotatePointAroundPoint, euklidianDistance2D } from '../src/util/math';

describe("math", () => {
    it('calculates the sum right', () => {
        expect(sum([1,2,3])).toBe(6);
        expect(sum([])).toBe(0);
    });

    it('rotates a point correct', () => {
        expect(rotatePointAroundPoint({x: -1, y: 0}, {x: 0, y: 0}, -Math.PI)).toEqual({x: 1, y: 0});
        expect(rotatePointAroundPoint({x: -1, y: 0}, {x: 0, y: 0}, Math.PI / 2)).toEqual({x: -0, y: -1});
        expect(rotatePointAroundPoint({x: -1, y: 0}, {x: 0, y: 0}, -Math.PI * 1.5)).toEqual({x: 0, y: -1});
    });

    it('calculates point distance correct', () => {
        expect(euklidianDistance2D({x: 0, y: 0}, {x: 0, y: 0})).toBe(0);
        expect(euklidianDistance2D({x: 1, y: 0}, {x: 0, y: 0})).toBe(1);
        expect(euklidianDistance2D({x: 0, y: 0}, {x: 0, y: 100})).toBe(100);
        expect(euklidianDistance2D({x: 2, y: 4}, {x: -2, y: 4})).toBe(4);

    })
});