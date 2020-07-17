import { createElement, Text, Wrapper } from './createElement'

class Carousel {
  constructor() {
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
    let children = this.data.map(url => {
      let element = <img src={ url } />
      element.root.addEventListener("dragstart", e => e.preventDefault())
      return element
    })

    let root = <div class="carousel">{ children }</div>

    let position = 0

    let nextPic = () => {
      // loop 技巧 整数范围内的循环
      let nextPosition = (position + 1) % this.data.length

      let current = children[position].root
      let next = children[nextPosition].root

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

    setTimeout(nextPic, 3000)

    console.log('root', root)
    // drag function
    /*
    root.addEventListener("mousedown", e => {
      let { clientX: startX, clientY: startY } = event
      let lastPosition = (position - 1 + this.data.length) % this.data.length
      let nextPosition = (position + 1) % this.data.length

      let current = this.root.childNodes[position]
      let last = this.root.childNodes[lastPosition]
      let next = this.root.childNodes[nextPosition]

      current.style.transition = "ease 0s"
      last.style.transition = "ease 0s"
      next.style.transition = "ease 0s"

      current.style.transform = `translateX(${e.clientX - startX - 500 * position}px)`
      last.style.transform = `translateX(${e.clientX - startX - 500 - 500 * lastPosition}px)`
      next.style.transform = `translateX(${e.clientX - startX + 500 - 500 * nextPosition}px)`

      const move = e => {
        current.style.transform = `translateX(${e.clientX - startX - 500 * position}px)`
        last.style.transform = `translateX(${e.clientX - startX - 500 - 500 * lastPosition}px)`
        next.style.transform = `translateX(${e.clientX - startX + 500 - 500 * nextPosition}px)`

        // console.log(e.clientX - startX, e.clientY - startY)
      }

      const up = e => {
        let offset = 0

        if (e.clientX - startX > 250) {
          offset = 1
        } else if (e.clientX - startX < -250) {
          offset = -1
        }


        current.style.transition = ""
        last.style.transition = ""
        next.style.transition = ""

        current.style.transform = `translateX(${ offset * 500 - 500 * position}px)`
        last.style.transform = `translateX(${ offset * 500 - 500 - 500 * lastPosition}px)`
        next.style.transform = `translateX(${ offset * 500 + 500 - 500 * nextPosition}px)`

        position = (position - offset + this.data.length) % this.data.length 

        // 鼠标释放时 销毁对 DOM 鼠标 移动 与 释放的监听
        document.removeEventListener("mousemove", move)
        document.removeEventListener("mouseup", up)
      }

      // 监听在 dragable内的鼠标 移动与 释放
      document.addEventListener("mousemove", move)
      document.addEventListener("mouseup", up)
    })
    */

    return root
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