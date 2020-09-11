import {
  randomNum,
  randomColor,
  getBase,
  createCode,
  mergeObject,
} from "./utils";

interface opts {
  id: string;
  width?: string;
  height?: string;
  type?: string;
  code?: string;
}

export function GVerify(options: opts | string): any {
  //创建一个图形验证码对象，接收options对象为参数
  this.options = {
    //默认options参数值
    id: "", //容器Id
    canvasId: "verifyCanvas", // canvas的ID
    width: "100", // 默认canvas宽度
    height: "30", // 默认canvas高度
    type: "blend", // 图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
    code: "",
  };

  if (Object.prototype.toString.call(options) === "[object Object]") {
    //判断传入参数类型
    mergeObject(this.options, options);
  } else {
    this.options.id = options;
  }

  const base = getBase();
  this.options.code = createCode(base, 4);

  this._init();
  this.refresh();
}

const prototype = Object.freeze({
  /**版本号**/
  version: "1.0.0",

  /**初始化方法**/
  _init: function () {
    var con = document.getElementById(this.options.id);
    var canvas = document.createElement("canvas");
    canvas.id = this.options.canvasId;
    canvas.width = this.options.width;
    canvas.height = this.options.height;
    canvas.style.cursor = "pointer";
    canvas.innerHTML = "您的浏览器版本不支持canvas";
    con.appendChild(canvas);
    var parent = this;
    canvas.onclick = function () {
      parent.refresh(canvas);
    };
  },

  /**生成验证码**/
  refresh: function (canvas: HTMLCanvasElement) {
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
    }
    ctx.textBaseline = "middle";

    ctx.fillStyle = randomColor(180, 240);
    ctx.fillRect(0, 0, this.options.width, this.options.height);

    for (var i = 1; i <= 4; i++) {
      var txt = this.options.code[i - 1];

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
  },

  /**验证验证码**/
  validate: function (code: string) {
    var verifyCode = code.toLowerCase();
    var v_code = this.options.code.toLowerCase();
    if (verifyCode == v_code) {
      return true;
    } else {
      return false;
    }
  },
});

GVerify.prototype = prototype;
