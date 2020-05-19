const EOF = Symbol("EOF") // EOF:  End Of File

let currentToken = null

function emit(params) {
  
}

function data(c) {
  if (c === "<") {
    return tagOpen
  } else if (c === "EOF") {
    return
  } else {
    return data
  }
}

function tagOpen(c) {
  if (c === "/") {
    return endTagOpen(c)
  } else if (/^[a-zA-Z]$/) {
    return tagName(c)
  } else {
    return
  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f] /$)) {
    return beforeAttributeName
  } else if(c == "/"){
    currentToken.tagName += c.toLowerCase()
  }
}


module.exports.parserHTML = function parserHTML(html) {
  /**
   * 解析html返回DOM
   * 创建状态机
   * 返回DOM
   */
  /**
   * 构建状态机
   */
  let state = data
  for (let c of html) {
    state = data(c)
  }
  /**
   * 3、解析标签
   */
  state = state(EOF)

  /**
   * 4、创建元素
   */
}