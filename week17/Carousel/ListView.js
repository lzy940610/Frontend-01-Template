export class ListView {
  constructor() {
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
    this.state = Object.create(null)
  }
  setAttribute(name, value) { // attribute
    this[name] = value
  }
  getAttribute(name) {
    return this[name]
  }
  appendChild(child) {
    this.children.push(child)
  }
  render() {
    let data = this.getAttribute('data')
    // 一定要用一个function去承载这些变化的
    return <div class="list-view" style="width: 300px;">
      {
        data.map(this.children[0])  
      }
    </div>

  }
  mountTo(parent) { // mount 是生命周期 一些DOM挂载最好也放入里面
    this.render().mountTo(parent)
  }
}