export class TabPanel {
  constructor() {
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
    this.state = Object.create(null)
  }
  setAttribute(name, value) { // attribute
    this[name] = value
  }
  appendChild(child) {
    this.children.push(child)
  }
  select(i) {
    for (const view of this.childViews) {
      view.style.display = "none"
    }
    this.childViews[i].style.display = "" // display设置为 “” 就是 采用默认显示模式

    for (const view of this.titleViews) {
      view.classList.remove('selected')
    }
    this.titleViews[i].classList.add('selected')

  }
  render() {

    this.childViews = this.children.map(child => <div >{child}</div>)
    this.titleViews = this.children.map((child, i) => <span
      onClick={() => this.select(i)}
    >
      {child.getAttribute('title')}
    </span>)
    

    setTimeout(() => this.select(0), 16)
    return <div class="tab-panel">
      <h1  class="tab-panel-title">{this.titleViews}</h1>
      <div class="tab-panel-content" >
        {this.childViews}
      </div>
    </div>

  }
  mountTo(parent) { // mount 是生命周期 一些DOM挂载最好也放入里面
    this.render().mountTo(parent)
  }
}