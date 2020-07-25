import { createElement, Text, Wrapper } from './createElement'
// import { Carousel } from './Carousel.js'
import { Animation, Timeline } from '../animation/animation'
import { ease } from '../animation/cubicBezier'
import { enableGesture } from './gesture'

export class Carousel {
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
      let element = <img src={ url } enableGesture={true} onStart={() => timeline.pause() } />
      element.root.addEventListener("dragstart", e => e.preventDefault())
      return element
    })

    let root = <div class="carousel">{ children }</div>

    let position = 0

    // 引入 Timeline
    let timeline = new Timeline
    // window.xtimeline = timeline
    timeline.start()


    let nextPic = () => {
      // loop 技巧 整数范围内的循环
      let nextPosition = (position + 1) % this.data.length

      let current = children[position].root
      let next = children[nextPosition].root

      // object, property, start, end, duration, delay, timeingFunction, template
      let currentAnimation = new Animation(
        current.style,
        "transform",
        - 100 * position,
        -100 - 100 * position,
        500,
        0,
        ease,
        v => `translateX(${v}%)`
      )

      let nextAnimation = new Animation(
        next.style,
        "transform",
        100 -100 * nextPosition,
        - 100 * nextPosition,
        500,
        0,
        ease,
        v => `translateX(${v}%)`
      )

      timeline.add(currentAnimation)
      timeline.add(nextAnimation)

      position = nextPosition

      setTimeout(nextPic, 3000)
      // window.xstophandle = setTimeout(nextPic, 3000)


    }

    setTimeout(nextPic, 3000)

    console.log('root', root)

    return root
  }
  mountTo(parent) { // mount 是生命周期 一些DOM挂载最好也放入里面
    this.render().mountTo(parent)
  }
}

let component = <Carousel data = {
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
// console.log(component)
