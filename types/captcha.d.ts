export interface opts {
    width?: number;
    height?: number;
    type?: string;
    len?: number;
}
export declare class GVerify {
    options: opts;
    instance: HTMLCanvasElement;
    private baseChart;
    imageData: string;
    code: string;
    constructor(opts?: opts);
    version: "1.0.4";
    private _init;
    refresh(): string;
    /**生成验证码**/
    private createCode;
    /**验证验证码**/
    validate(code: string): boolean;
    private value;
}
