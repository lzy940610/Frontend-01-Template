export class Timeline {
  constructor() {
    this.animations = new Set()
    this.finishedAnimations = new Set()
    this.addTimes = new Map()
    this.requestID = null
    this.state = "inited"
    this.tick = () => {
      let t = Date.now() - this.startTime

      for (let animation of this.animations) {
        let { object, property, template, start, end, timeingFunction, delay, duration } = animation

        let addTime = this.addTimes.get(animation)

        let progression = timeingFunction((t - delay - addTime) / duration) // 0 - 1 之间的数

        // 保证结束时一致
        if (t > duration + delay + addTime) {
          progression = 1
          this.animations.delete(animation)
          this.finishedAnimations.add(animation)
        }

        let value = animation.valueFromProgression(progression)

        object[property] = template(value)

      }
      if (this.animations.size)
        this.requestID = requestAnimationFrame(this.tick)
      else
        this.requestID = null
    }
  }
  pause() {
    // cancel next tick
    if (this.state !== "playing") return

    this.state = "paused"
    this.pauseTime = Date.now()
    if (this.requestID !== null) {
      cancelAnimationFrame(this.requestID)
      this.requestID = null
    }

  }
  resume() {
    // 读档
    if (this.state !== "paused") return
    this.state = "playing"
    this.startTime += Date.now() - this.pauseTime
    this.tick()
  }
  start() {
    if (this.state !== "inited") return
    this.state = "playing"
    this.startTime = Date.now()
    this.tick()
  }
  reset() {
    if (this.state === "playing")
      this.pause()
    this.animations = new Set()
    this.finishedAnimations = new Set()
    this.addTimes = new Map()
    this.requestID = null
    this.startTime = Date.now()
    this.pauseTime = null
    this.state = "inited"
  }
  restart() {
    if (this.state === "playing")
      this.pause()

    // 将停止动画
    for (let animation of this.finishedAnimations) 
      this.animations.add(animation)
    
    this.finishedAnimations = new Set()
    this.requestID = null
    this.state = "playing"
    this.startTime = Date.now()
    this.pauseTime = null
    this.tick()

  }
  add(animation, addTime) {
    this.animations.add(animation)

    if (this.state === "playing" && !this.requestID) this.tick()

    if (this.state === "playing")
      this.addTimes.set(animation, addTime !== void 0 ? addTime : Date.now() - this.startTime)
    else
      this.addTimes.set(animation, addTime !== void 0 ? addTime : 0)

  }
}

export class Animation {
  constructor(object, property, start, end, duration, delay, timeingFunction, template) {
    this.object = object
    this.property = property
    this.template = template
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay || 0
    this.timeingFunction = timeingFunction || ((start, end) => {
      return t => start + (t / duration) * (end - start)
    })
    // ease linear easeIn easeOut
  }
  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start)
  }
}


export class ColorAnimation {
  constructor(object, property, start, end, duration, delay, timeingFunction, template) {
    this.object = object
    this.property = property
    this.template = template || (v => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a} )`)
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay || 0
    this.timeingFunction = timeingFunction || ((start, end) => {
      return t => start + (t / duration) * (end - start)
    })
    // ease linear easeIn easeOut
  }
  valueFromProgression(progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a),
    }
  }
}
/*

Q: 为什么需要使用timeline
  管理多个动画 
  游戏中：控制多个时间线 植物大战僵尸 点了暂停 还是头在摇晃 多条时间线并行
  
Q: 用户会如何使用？（设计）
 new Animation
 
 let animation = new Animation(object, property, start, end, duration, delay, timeingFunction)
 let animation2 = new Animation(object, property, start, end, duration, delay, timeingFunction)

 let timeline = new Timeline()

 timeline.add(animation)
 timeline.add(animation2)

 timeline.start()
 timeline.pause()
 timeline.resume()
 timeline.stop()
 
 setTimeout
 setInterval
 requestAnimationFrame


 */