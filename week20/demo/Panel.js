export class Panel {
  constructor() {
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
  }
  setAttribute(name, value) { // attribute
    this[name] = value
  }
  appendChild(child) {
    this.children.push(child)
  }
  render() {
    return <div class="panel" style="border: solid 1px lightgreen;width: 300px;" >
      <h1 style="background-color: lightgreen;width: 300px;margin: 0;">{this.title}</h1>
      <div style="width: 300px;min-height: 300px;">
        {this.children}
      </div>
    </div>

  }
  mountTo(parent) { // mount 是生命周期 一些DOM挂载最好也放入里面
    this.render().mountTo(parent)
  }
}