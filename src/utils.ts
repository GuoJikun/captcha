export function randomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function createCode(base: Array<any>, size?: number): string {
  if (size === undefined) {
    size = 4;
  }
  let code: string = "";
  for (let i = 0; i < size; i++) {
    code += base[randomNum(0, base.length)];
  }
  return code;
}
/**
 * 生成code的基础数组
 * @param type
 */
export function getBase(type?: string): Array<string> {
  const letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digital = "0123456789";

  if (type === "letter") {
    return letter.split("");
  } else if (type === "digital") {
    return digital.split("");
  } else {
    return (letter + digital).split("");
  }
}

/**
 * 生成随机颜色
 * @param min
 * @param max
 */
export function randomColor(min: number, max: number): string {
  var r = randomNum(min, max);
  var g = randomNum(min, max);
  var b = randomNum(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
}

export function mergeObject(target: object, clone: object): object {
  return Object.assign(target, clone);
}

export function typeOf(val: any): string {
  const type = Object.prototype.toString.call(val);
  const parseType = type
    .replace(/(^\[object )([a-zA-Z]+)(\]$)/, "$2")
    .toLowerCase();
  return parseType;
}
