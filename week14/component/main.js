function createElement(Cls, attributes, ...children) {
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

  for (let child of children) {
    if (typeof child === "string")
      child = new Text(child)
    o.appendChild(child)
  }

  // 在JSX中父子组件的构建顺序为 ： 先子后父

  // console.log('children', children)
  return o
}

class Text {
  constructor(text) {
    this.root = document.createTextNode(text)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class Wrapper {
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

class MyComponent {
  constructor(config) {
    this.children = []
    // this.slot = document.createElement("div")
    // console.log('config', config)
  }
  setAttribute(name, value) { // attribute
    // console.log('setAttribute :', name, value)
    this.root.setAttribute(name, value)
  }
  appendChild(child) { // children
    // console.log('appendChild :', child)
    // child.mountTo(this.root)
    // this.children.push(child)
    // this.slot.appendChild(child)
    this.children.push(child)
  }
  render() {
    return <article>
      <header>I'am a header</header>
      {this.slot}
      <footer>I'm a footer</footer>
    </article>
  }
  mountTo(parent) { // mount 是生命周期 一些DOM挂载最好也放入里面
    this.slot = <div></div>
    // parent.appendChild(this.root)
    for (let child of this.children) {
      // child.mountTo(this.root)  
      this.slot.appendChild(child)
    }
    this.render().mountTo(parent)

  }
}


let component = <MyComponent>text text text</MyComponent>
// let component = <div id="a" class="b" />

component.mountTo(document.body)
console.log(component)

