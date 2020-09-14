import { randomNum, randomColor, getBase, createCode, typeOf } from "./utils";

export interface opts {
  width?: number;
  height?: number;
  type?: string;
  len?: number;
}

export class GVerify {
  // 创建一个图形验证码对象，接收opts对象为参数
  options: opts = {
    width: 100,
    height: 30,
    len: 4,
  };
  instance: HTMLCanvasElement;
  private baseChart: Array<string>;
  imageData: string;
  code: string;

  constructor(opts?: opts) {
    if (opts !== undefined) {
      if (typeOf(opts) === "object") {
        // 判断传入参数类型
        Object.assign(this.options, opts);
      } else {
        throw `[warn]: Invalid opts: type check failed for opts "type". Expected Object with value "${opts}", got ${typeOf(
          opts
        )} with value ${opts}.`;
      }
    }
    this.baseChart = getBase(this.options.type);
    this.code = createCode(this.baseChart, this.options.len);
    this._init();
  }
  // 版本号
  version: "1.0.4";

  // 初始化方法
  private _init() {
    let canvas = document.createElement("canvas");
    canvas.width = this.options.width;
    canvas.height = this.options.height;
    // canvas.hidden = true;
    // document.body.appendChild(canvas);
    this.instance = canvas;
    this.imageData = this.createCode(canvas);
  }
  refresh() {
    this.code = createCode(this.baseChart, this.options.len);
    return this.createCode(this.instance);
  }

  /**生成验证码**/
  private createCode(canvas: HTMLCanvasElement) {
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
    }
    ctx.textBaseline = "middle";

    ctx.fillStyle = randomColor(180, 240);
    ctx.fillRect(0, 0, this.options.width, this.options.height);

    for (var i = 1; i <= 4; i++) {
      var txt = this.code[i - 1];

      ctx.font = "20px SimHei";
      ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
      ctx.shadowBlur = randomNum(-3, 3);
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      var x = (this.options.width / 5) * i;
      var y = this.options.height / 2;
      var deg = randomNum(-30, 30);
      /**设置旋转角度和坐标原点**/
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(txt, 0, 0);
      /**恢复旋转角度和坐标原点**/
      ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    }
    /**绘制干扰线**/
    for (var i = 0; i < 4; i++) {
      ctx.strokeStyle = randomColor(40, 180);
      ctx.beginPath();
      ctx.moveTo(
        randomNum(0, this.options.width / 2),
        randomNum(0, this.options.height / 2)
      );
      ctx.lineTo(
        randomNum(0, this.options.width / 2),
        randomNum(0, this.options.height)
      );
      ctx.stroke();
    }
    /**绘制干扰点**/
    for (var i = 0; i < this.options.width / 4; i++) {
      ctx.fillStyle = randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(
        randomNum(0, this.options.width),
        randomNum(0, this.options.height),
        1,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
    const imageData = canvas.toDataURL("image/png");
    return imageData;
  }

  /**验证验证码**/
  validate(code: string) {
    var verifyCode = code.toLowerCase();
    var v_code = this.code.toLowerCase();
    if (verifyCode == v_code) {
      return true;
    } else {
      return false;
    }
  }
  private value() {
    return this.imageData;
  }
}
