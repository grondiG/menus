export class ArrayUtils {
  static isEmpty(arr: any[]): boolean {
    return !Array.isArray(arr) || arr.length === 0;
  }

  static isNotEmpty(arr: any[]): boolean {
    return !ArrayUtils.isEmpty(arr);
  }
}
