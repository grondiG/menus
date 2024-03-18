import { ArrayUtils } from './array-utils';

describe('ArrayUtils', () => {
  describe('isEmpty', () => {
    it('should return true if array is empty', () => {
      const arr = [];
      const result: boolean = ArrayUtils.isEmpty(arr);

      expect(result).toBe(true); // ==
      expect(result).toEqual(true); // ===
    });

    it('should return true if array is empty', () => {
      const arr = [];
      const result: boolean = ArrayUtils.isEmpty(arr);

      expect(result).toBe(true); // ==
      expect(result).toEqual(true); // ===
    });
  });

  describe('isNotEmpty', () => {
    it('should ', () => {

    });
  });
});
