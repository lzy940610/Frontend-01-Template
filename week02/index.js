// 
/**
 * 写一个正则表达式 匹配所有 Number 直接量
 * true 0 1 2 3 4 5 6 7 8 9 10 11
 * false 01 02 0o
 * 各类进制直接量 
 * 二进制 0b/0B 开头后面跟随二进制数值直接量
 * 八进制 0 开头后面跟随八进制数值直接量
 * 十进制 默认表示 
 * 十六进制 0x/0X 开头 后面跟随十六进制数值直接量
 */
const numberReg = /\^0(0|1)*/g
const verifyNumber = (val) => numberReg.test(val)
console.log('verifyNumber result :', verifyNumber(0))
// 写一个 UTF-8 Encoding 的函数


// 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号