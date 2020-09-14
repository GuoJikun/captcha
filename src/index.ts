import { GVerify, opts } from "./captcha";

export default function createCaptcha(opts: opts): any {
  return new GVerify(opts);
}
