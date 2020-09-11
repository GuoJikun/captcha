import { GVerify } from "./captcha";

export default function createCaptcha(opts: object | string) {
  return new GVerify(opts);
}
