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
}

export class Wrapper {
  constructor(type) {
    this.children = []
    this.root = document.createElement(type)
    // console.log('config', config)
  }
  setAttribute(name, value) { // attribute
    // console.log('setAttribute :', name, value)
    this.root.setAttribute(name, value)
  }
  appendChild(child) { // children
    // console.log('appendChild :', child)
    // child.mountTo(this.root)
    this.children.push(child)
  }
  mountTo(parent) { // mount 是生命周期 一些DOM挂载最好也放入里面
    parent.appendChild(this.root)
    for (const child of this.children) {
      child.mountTo(this.root)  
    }
  }
}
