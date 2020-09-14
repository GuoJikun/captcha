export declare function randomNum(min: number, max: number): number;
export declare function createCode(base: Array<any>, size?: number): string;
/**
 * 生成code的基础数组
 * @param type
 */
export declare function getBase(type?: string): Array<string>;
/**
 * 生成随机颜色
 * @param min
 * @param max
 */
export declare function randomColor(min: number, max: number): string;
export declare function mergeObject(target: object, clone: object): object;
export declare function typeOf(val: any): string;
