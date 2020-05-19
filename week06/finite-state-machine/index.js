/**
 * 状态机范式
 function match(string) {
   let state = start
   for (const c in string) {
   state = state(c)
   }
   return state === end
 }
 function start(c) {
   if (c === "a") {
     return foundA
   } else {
     return start
   }
 }
 function end() {
   return end
 }
 */

/**
 * 简单 匹配 abc
 * 作业：使用状态机完成“abababx”的处理
 */
function match(string) {
  let state = start
  for (const c of string) {
    console.log(c)
    state = state(c)
  }
  return state === end
}

function start(c) {
  return c === "a" ? foundA : start
}

function end() {
  return end
}

function foundA(c) {
  return c === 'b' ? foundB : start(c)
}

function foundB(c) {
  return c === 'a' ? foundA2 : start(c)
}

function foundA2(c) {
  return c === 'b' ? foundB2 : start(c)
}

function foundB2(c) {
  return c === 'a' ? foundA3 : start(c)
}

function foundA3(c) {
  return c === 'b' ? foundB3 : start(c)
}

function foundB3(c) {
  return c === 'x' ? end : foundB2(c)
}


console.log(match('abababc'))