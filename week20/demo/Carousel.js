import { createElement, Text, Wrapper } from './createElement'
import { Animation, Timeline } from './animation'
import { ease } from './cubicBezier'

// css-loader
import css from "./carousel.css"

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
    // 引入 Timeline
    let timeline = new Timeline
    let position = 0
    let nextPicStopHandler = null
    timeline.start()


    let children = this.data.map((url, currentPositon) => {
      let lastPosition = (currentPositon - 1 + this.data.length) % this.data.length
      let nextPosition = (currentPositon + 1 + this.data.length) % this.data.length
      let offset = 0

      let onStart = () => {
        console.log("start")
        timeline.pause()
        clearTimeout(nextPicStopHandler)

        let currentElement = children[currentPositon].root
        let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1])
        console.log('currentTransformValue', currentTransformValue)
        offset = currentTransformValue + 500 * currentPositon
      }

      let onPan = e => {
        console.log("pan")
        let lastElement = children[lastPosition].root
        let currentElement = children[currentPositon].root
        let nextElement = children[nextPosition].root

        let currentTransformValue = -500 * currentPositon + offset
        let lastTransformValue = -500 - 500 * lastPosition + offset
        let nextTransformValue = 500 - 500 * nextPosition + offset

        let dx = e.detail.clientX - e.detail.startX


        lastElement.style.transform = `translateX(${lastTransformValue + dx}px)`
        currentElement.style.transform = `translateX(${currentTransformValue + dx}px)`
        nextElement.style.transform = `translateX(${nextTransformValue + dx}px)`

      }

      let onPanend = e => {
        console.log("panend")
        let direction = 0
        let dx = e.detail.clientX - e.detail.startX

        console.log('e.isFlick', e.detail.isFlick)
        

        if (dx + offset > 250 || dx > 0 && e.detail.isFlick) {
          direction = 1
        } else if (dx + offset < - 250 || dx < 0 && e.detail.isFlick) {
          direction = -1
        }

        timeline.reset()
        timeline.start()

        let lastElement = children[lastPosition].root
        let currentElement = children[currentPositon].root
        let nextElement = children[nextPosition].root

        let lastAnimation = new Animation(lastElement.style, "transform",
          - 500 - 500 * lastPosition + offset + dx, - 500 - 500 * lastPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`)

        let currentAnimation = new Animation(currentElement.style, "transform",
          - 500 * currentPositon + offset + dx, - 500 * currentPositon + direction * 500, 500, 0, ease, v => `translateX(${v}px)`)

        let nextAnimation = new Animation(nextElement.style, "transform",
          500 - 500 * nextPosition + offset + dx, 500 - 500 * nextPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`)

        timeline.add(lastAnimation)
        timeline.add(currentAnimation)
        timeline.add(nextAnimation)

        position = (position - direction + this.data.length) % this.data.length

        nextPicStopHandler = setTimeout(nextPic, 3000)

      }

      let element = < img src = { url } enableGesture = { true } onStart = { onStart } onPan = { onPan } onPanend = { onPanend }
      />
      element.root.style.transform = "translateX(0px)"
      element.root.addEventListener("dragstart", e => e.preventDefault())
      return element
    })




    let nextPic = () => {
      // loop 技巧 整数范围内的循环
      let nextPosition = (position + 1) % this.data.length

      let current = children[position].root
      let next = children[nextPosition].root

      // object, property, start, end, duration, delay, timeingFunction, template
      let currentAnimation = new Animation(
        current.style,
        "transform",
        -100 * position,
        -100 - 100 * position,
        500,
        0,
        ease,
        v => `translateX(${5 * v}px)`
      )

      let nextAnimation = new Animation(
        next.style,
        "transform",
        100 - 100 * nextPosition,
        -100 * nextPosition,
        500,
        0,
        ease,
        v => `translateX(${5 * v}px)`
      )

      timeline.add(currentAnimation)
      timeline.add(nextAnimation)

      position = nextPosition

      nextPicStopHandler = setTimeout(nextPic, 3000)
    }

    nextPicStopHandler = setTimeout(nextPic, 3000)

    return <div class = "carousel" > { children } </div>

  }
  mountTo(parent) { // mount 是生命周期 一些DOM挂载最好也放入里面
    this.render().mountTo(parent)
  }
}