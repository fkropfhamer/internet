import { indexOfMax, chunkArray } from "../../src/util/util";

describe("util.indexOfMax", () =>  {
    it('returns -1 if array is empty', () => {
        expect(indexOfMax([])).toBe(-1);
    });

    it('returns the index of the max value', () => {
        expect(indexOfMax([1,2,3])).toBe(2);
        expect(indexOfMax([4,2,3,-9,0])).toBe(0);
    })
});

describe("util.chunkArray", () => {
    it('chunks array correct', () => {
        expect(chunkArray([1,2,3], 3)).toEqual([[1,2,3]]);
        expect(chunkArray([1,2,3], 1)).toEqual([[1],[2],[3]]);
    });
});
