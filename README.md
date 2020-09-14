# 图片验证码生成器

## 安装

```
yarn add GVCode
```

## 使用

```
import gvcode from 'gccdoe'

const instance = gvcode({
    wdith: 100,
    height: 30,
});
const code = instance.value() // 获得图片验证码base64数据
```

## props

| 属性名 | 说明                     | 类型   | 可选值                         | 默认值        |
| ------ | ------------------------ | ------ | ------------------------------ | ------------- |
| width  | 图片验证码的宽度         | numner |                                | 100           |
| height | 图片验证码的高度         | numner |                                | 30            |
| type   | 图片验证码中字符串的类型 | string | letter(字母)/digital(数字 0-9) | -(数字和字母) |
| type   | 图片验证码中字符串的类型 | string | letter(字母)/digital(数字 0-9) | -(数字和字母) |

## methods

| 方法名  | 说明                       |
| ------- | -------------------------- |
| refresh | 刷新验证码                 |
| value   | 获取图片验证的 base64 数据 |

## changeLog

### V1.0.0

feat:

    - 生成验证码
    - 刷新验证码
    — 获取验证码

### V1.0.1

fix：

    - 修复刷新验证码没有返回的 bug

### V1.0.2

fix：

    - 修复typeOf方法错误

### V1.0.3

fix：

    - 优化传值不是object类型时的错误提示

### V1.0.3

fix：

    - 修复type传值无效的问题
