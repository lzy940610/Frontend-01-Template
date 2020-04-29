# 第三周作业
## stringToNumber
```js
const convertStringToNumber = (string, radix = 10) => {
  if(radix > 10) throw new Error(`raxix cann't more than ten`)
  let result = 0
  const isFlag = /e|E/.test(string)
  if(isFlag) {
    const log = Number(string.match(/\d+$/)[0]);
    const number = string.match(/^[\d\.]+/)[0].replace(/\./, '');
    result =  /e-|E-/.test(string) ?  Number(number.padEnd(log + 1, 0)) : Number(number.padStart(log + number.length, 0).replace(/^0/, '0.'));
    return result
  }
  const chars = string.split('')
  const chartLen = chars.length
  let number = 0, i = 0
  while (i < chartLen && chars[i] !== '.') {
    number = number * radix
    number += chars[i].codePointAt(0) - '0'.codePointAt(0)
    i++
  }
  chars[i] === '.' && i++
  let fraction = 1
  while (i < chartLen) {
    fraction /= radix;
    number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
    i++
  }
  return result
}
```

## numberToString

```js
const convertNumberToString = (number, radix) => {
    const hasFraction = String(number).test(/\.\d+$/)
    const fraction = hasFraction ? String(number).match(/\.\d+$/)[0].replace('.', '') : 0
    let result = '', int = Math.floor(number)
    while(int > 0){
       string = String(int % radix) + string
       int = Math.floor(int / radix)
    }
    return hasFraction ? `${result}.${fraction}` : result
}
```

## js中特殊对象

- Function Object

  - [[call]]  视为函数Function
  - [[Construct]] 可以被new 操作符调用，根据new的规则返回对象。

- Array Object

  - [[DefineOwnProperty]] 

    - Property == length

      设置对象的length属性，根据length的变化对对象进行操作

      newLength > length 用空扩充数组

      newLength < length 截取数组

- String Object

  string的length是不可写不可配的。

- Arguments Object

  [[callee]] 视为函数参数对对象，伪数组 caller

- Object

  [[Get]] property被访问时调用  get

  [[Set]] property被赋值时调用 set

  [[GetPrototypeOf]] 对应getPrototypeOf方法 获取对象原型

  [[SetPrototypeOf]] 对应setPrototypeOf方法 设置对象原型

  [[GetOwnProperty]] getOwnPropertyDescriptor 获取对象私有属性的描述列表

  [[HasProperty]] hasOwnProperty 私有属性判断

  [[IsExtensible]] isExtensible对象是否可扩展

  [[PreventExtensions]] preventExtension控制对象是否可以添加属性

  [[DefineOwnProperty]] defineProperty 定义对象属性

  [[Delete]] delete 操作符

  [[OwnPropertyKeys]] Object.keys() Object.entries() Object.values()

  [[Call]] 能够调用call 

- Module Namespece

  [[Module]] 视为一个引入的模块

  [[Exports]] 视为一个导出的模块