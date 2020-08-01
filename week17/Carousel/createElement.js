import { enableGesture } from "./gesture"

export function createElement(Cls, attributes, ...children) {
  // console.log('arguments', arguments)
  let o

  if (typeof Cls === "string") {
    o = new Wrapper(Cls)
  } else {
    o = new Cls({
      timer: {}
    })
  }

  for (const name in attributes) {
    // o[name] = attributes[name]
    // o[name] = attributes[name]
    o.setAttribute(name, attributes[name])
  }

  let visit = (children) => {
    for (let child of children) {
      // 如果是数组 则递归访问
      if (typeof child === "object" && child instanceof Array) {
        visit(child)
        continue
      }
      if (typeof child === "string")
        child = new Text(child)
      
      o.appendChild(child)
    }
  }

  visit(children)
 

  // 在JSX中父子组件的构建顺序为 ： 先子后父

  // console.log('children', children)
  return o
}

export class Text {
  constructor(text) {
    this.root = document.createTextNode(text)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
  getAttribute(name) {
    return this.root.getAttribute(name)
  }
}

export class Wrapper {
  constructor(type) {
    this.children = []
    this.root = document.createElement(type)
  }
  setAttribute(name, value) { // attribute
    // console.log('setAttribute :', name, value)
    this.root.setAttribute(name, value)

    if (name.match(/^on([\s\S]+)$/)) {
      // 首字母小写
      let eventName = RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase())
      // console.log('eventName', eventName)
      this.root.addEventListener(eventName, value)
    }

    if (name === "enableGesture") {
      // 根据属性 进行特殊处理与回应
      enableGesture(this.root)
    }
  }
  getAttribute(name) {
    return this.root.getAttribute(name)
  }
  appendChild(child) { // children
    this.children.push(child)
  }
  addEventListener() {
    this.root.addEventListener(...arguments)
  }

  get style() {
    return this.root.style
  }

  get classList() {
    return this.root.classList
  }

  set innerText(text) {
    return this.root.innerText = text
  }
  mountTo(parent) { // mount 是生命周期 一些DOM挂载最好也放入里面
    parent.appendChild(this.root)
    for (const child of this.children) {
      child.mountTo(this.root)  
    }
  }
}
