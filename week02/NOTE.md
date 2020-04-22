# 第二周作业
## 写一个正则表达式 匹配所有Number直接量
  ### 思路 先拆再整
  - 整数
    ```javascript
      /^-?\d+$/
    ```
  - 浮点数
    ```javascript
        /^(-?\d+)(\\.\\d+)?$/
      ```
  - 二进制
    ```javascript
     /^[01]+$/
    ```
  - 八进制
    ```javascript
      /^[0-7]+$/
    ```
  - 十六进制
    ```javascript
      /(^0x[a-f0-9]{1,2}$)|(^0X[A-F0-9]{1,2}$)|(^[A-F0-9]{1,2}$)|(^[a-f0-9]{1,2}$)/
    ```
  - 综上 
    ```javascript
      /(^-?\d+$)|(^(-?\\d+)(\\.\\d+)?$)|(^[01]+$)|(^[0-7]+$)|((^0x[a-f0-9]{1,2}$)|(^0X[A-F0-9]{1,2}$)|(^[A-F0-9]{1,2}$)|(^[a-f0-9]{1,2}$))/
    ```
    
## 写一个UTF-8 Encoding的函数
    ```javascript
    const encodeUTF8 = (str) => {
      const code = encodeURIComponent(str)
      const len = code.length
      let bytes = []
      for(let i = 0; i < len; i++ ){
        const chart = code.charCodeAt(i)
        if(c === '%'){
          const hex = code.charAt(i + 1) + code.charAt(i + 2);
          const hexVal = parseInt(hex, 16);
          bytes.push(hexVal);
          i += 2;
        }else{
          bytes.push(c.charCodeAt(0))
        }
      }
      return bytes
    }
    ```
## 写一个正则表达式，匹配所有的字符串直接量
### 思路 先拆再整 同上上
  - unicode
    ```javascript
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E])[\u0021-\u007E]{6,16}$/
    ```
  - ASCII
    ```javascript
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])[\x21-\x7E]{6,16}$/
      ```
  - 单双引号
    ```javascript
     /(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*/
    ```
  - 综上
    ```javascript
    /(^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E])[\u0021-\u007E]{6,16}$)|(^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])[\x21-\x7E]{6,16}$)|((?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*)/
    ```