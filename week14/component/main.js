import { createElement, Text, Wrapper } from './createElement'

class Carousel {
  constructor(config) {
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
  }
  setAttribute(name, value) { // attribute
    this[name] = value
  }
  addEventListener() {
    this.root.addEventListener(...arguments)
  }
  render() {
    let position = 0

    let nextPic = () => {
      // loop 技巧 整数范围内的循环
      let nextPosition = (position + 1) % this.data.length

      let current = this.root.childNodes[position]
      let next = this.root.childNodes[nextPosition]

      current.style.transition = "ease 0s"
      next.style.transition = "ease 0s"

      current.style.transform = `translateX(${- 100 * position}%)`
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`

      // 使用Broswer的 setTimeout延时执行
      setTimeout(() => {

        current.style.transition = "" // means use css rule
        next.style.transition = ""
        current.style.transform = `translateX(${- 100 - 100 * position}%)`
        next.style.transform = `translateX(${- 100 * nextPosition}%)`

        position = nextPosition

      }, 16)

      setTimeout(nextPic, 3000)

    }

    return <div class = "carousel" >
      {
        this.data.map(url => {
          let element = < img src = { url }
          />
          element.root.addEventListener("dragstart", e => e.preventDefault())
          return element
        })
      } </div>
  }
  mountTo(parent) { // mount 是生命周期 一些DOM挂载最好也放入里面
    this.render().mountTo(parent)
  }
}


let component = < Carousel data = {
  [
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
  ]
}
/>
// let component = <div id="a" class="b" />

component.mountTo(document.body)
console.log(component)