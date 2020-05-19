const css = require('css') // Accepts a CSS string and returns an AST object
const EOF = Symbol("EOF") // EOF:  End Of File 使用symbol作为唯一特殊标识

let currentToken = null
let currentAttribute = null
let stack = [{ type: "document", children: [] }]
let currentTextNode = null
let rules = [] // 加入一个新的函数, addCSSRules，这里我们把CSS规则暂存到一个数组里

function addCSSRules(text) {
  let ast = css.parse(text)
  rules.push(...ast.stylesheet.rules)
}

function match(element, selector) {
  if (!selector || !element.attributes) return false
  if (selector.charAt(0) === "#") {
    let attr = element.attributes.filter(attr => attr.name === "id")[0]
    if (attr && attr.value === selector.replace("#", "")) return true
  } else if (selector.charAt(0) === ".") {
    let attr = element.attributes.filter(attr => attr.name === "class")[0]
    if (attr && attr.value === selector.replace(".", "")) return true
  } else {
    if (element.tagName === selector) return true
  }
}

function specificity(selector) {
  let p = [0, 0, 0, 0]
  let selectorParts = selector.split(" ")
  for (const part of selectorParts) {
    if (part.charAt(0) === "#") {
      p[1] += 1
    } else if (part.charAt(0) === ".") {
      p[2] += 1
    } else {
      p[3] += 1
    }
  }
  return p
}

function compare(sp1, sp2) {
  // 从高位一次对比 算法基数排序
  if (sp1[0] - sp2[0]) return sp1[0] - sp2[0]
  if (sp1[1] - sp2[1]) return sp1[1] - sp2[1]
  if (sp1[2] - sp2[2]) return sp1[2] - sp2[2]
  return sp1[3] - sp2[3]
}

function computeCSS(element) {
  // console.log("compute CSS for Element", element);
  let elements = stack.slice().reverse()
  // 拆分选择器
  if (!element.computedStyle)
    element.computedStyle = {}

  for (let rule of rules) {
    let selectorParts = rule.selectors[0].split(" ").reverse()
    // 第一个都没匹配就继续
    if (!match(element, selectorParts[0]))
      continue

    let matched = false

    let j = 1
    for (let i = 0; i < elements.length; i++) {
      if (match(elements[i], selectorParts[j])) {
        j++
      }

    }

    if (j >= selectorParts.length)
      matched = true

    if (matched) {
      let sp = specificity(rule.selectors[0])
      let computedStyle = element.computedStyle

      for (let declaration of rule.declarations) {
        // 得到CSS Key-Value 对
        if (!computedStyle[declaration.property])
          computedStyle[declaration.property] = {}

        // 计算CSS Specificity 权重
        if (!computedStyle[declaration.property].specificity) {
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
          computedStyle[declaration.property].value = declaration.value
          computedStyle[declaration.property].specificity = sp
        }
      }
      // console.log('element computedStyle :', JSON.stringify(element.computedStyle, null, "  "))
      // console.log("Element :", JSON.stringify(element, null, "  "), "matched rule :", JSON.stringify(rule, null, "  "))
    }
  }
}

function emit(token) {
  let top = stack[stack.length - 1]
  if (token.type === "startTag") {
    let element = {
      type: "element",
      children: [],
      attributes: []
    }
    element.tagName = token.tagName

    for (let p in token) {
      if (p !== "type" || p !== "tagName") {
        // 将非type 和 tagName的属性 入队element的attributes数组中
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }

    /**
     * 当我们创建一个元素后 立即计算CSS
     * 理论上 当我们分析一个元素时 所有CSS规则已经收集完毕
     */
    computeCSS(element)

    top.children.push(element) // 往栈顶元素的children属性插入element
    // element.parent = top // 新增当前元素的父级元素属性

    // 非自封闭标签入栈
    if (!token.isSelfClosing)
      stack.push(element)

    currentTextNode = null

  } else if (token.type === "endTag") {
    if (top.tagName !== token.tagName) {
      throw new Error("Tag start end doesn't match!")
    } else {
      /**
       * 遇到style标签时 执行添加CSS规格的操作
       */
      if (top.tagName === "style") {
        addCSSRules(top.children[0].content)
      }
      stack.pop() // 开始结束标签名一致则出栈
    }
    currentTextNode = null // 初始化当前文本节点
  } else if (token.type === "text") {
    if (!currentTextNode) {
      currentTextNode = {
        type: "text",
        content: ""
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }
}

function data(c) {
  if (c === "<") {
    return tagOpen
  } else if (c === EOF) {
    emit({
      type: "EOF"
    })
    return
  } else {
    emit({
      type: "text",
      content: c
    })
    return data
  }
}

function tagOpen(c) {
  if (c === "/") {
    return endTagOpen
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "startTag",
      tagName: ""
    }
    return tagName(c)
  } else {
    emit({
      type: "text",
      content: c
    })
    return
  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === "/") {
    return selfClosingStartTag
  } else if (c.match(/^[A-Z]$/)) {
    currentToken.tagName += c
    return tagName
  } else if (c === ">") {
    emit(currentToken)
    return data
  } else {
    currentToken.tagName += c
    return tagName
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === "/" || c === ">" || c === EOF) {
    return afterAttributeName(c)
  } else if (c === "=") {
    // 
  } else {
    currentAttribute = {
      name: "",
      value: ""
    }
    return attributeName(c)
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
    return afterAttributeName(c)
  } else if (c === "=") {
    return beforeAttributeValue
  } else if (c === "\u0000") {
    // 
  } else if (c === "\"" || c === "'" || c === "<") {
    // 
  } else {
    currentAttribute.name += c
    return attributeName
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
    return beforeAttributeValue
  } else if (c === "\"") {
    return doubleQuotedAttributeValue
  } else if (c === "\'") {
    return singleQuotedAttributeValue
  } else if (c === ">") {
    return data
  } else {
    return UnquotedAttributeValue(c)
  }
}

function doubleQuotedAttributeValue(c) {
  if (c === "\"") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (c === "\u0000") {
    // 
  } else if (c === EOF) {
    //
  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}

function singleQuotedAttributeValue(c) {
  if (c === "\'") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if (c === "\u0000") {
    // 
  } else if (c === EOF) {
    //
  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}

function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === "/") {
    return selfClosingStartTag
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === EOF) {
    //
  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}

function UnquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value
    return beforeAttributeName
  } else if (c === "/") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return selfClosingStartTag
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === "/\u0000") {
    // 
  } else if (c == "\"" || c == "'" || c == "<" || c == "=" || c == "`") {
    // 
  } else if (c === EOF) {
    // 
  } else {
    currentAttribute.value += c
    return UnquotedAttributeValue
  }
}

function selfClosingStartTag(c) {
  if (c === ">") {
    currentToken.isSelfClosing = true
    emit(currentToken)
    return data
  } else if (c === "EOF") {
    // 
  } else {
    // 
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: ""
    }
    return tagName(c)
  } else if (c === ">") {
    //
  } else if (c === EOF) {
    // 
  } else {
    // 
  }
}

function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName
  } else if (c === "/") {
    return selfClosingStartTag
  } else if (c === "=") {
    return beforeAttributeValue
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === EOF) {

  } else {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = {
      name: "",
      value: ""
    }
    return attributeName(c)
  }
}

module.exports.parseHTML = function parseHTML(html) {
  /**
   * 解析html返回DOM
   * 创建状态机
   * 返回DOM
   */
  /**
   * 1、构建状态机
   * 2、解析标签
   * 3、创建元素
   */
  let state = data
  for (let c of html) {
    state = state(c)
  }
  state = state(EOF)
  return stack[0]

}