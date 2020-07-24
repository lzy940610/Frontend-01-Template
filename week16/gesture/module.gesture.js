export class Gesture {
  /**
   * 1、绑定元素
   * 2、兼容PC 与 移动端手势
   * 3、start、move、end、cancel几个状态
   * 3、监听元素的 tap、press、cancel、flick 的事件
   * 4、分发事件
   * 
   */
  constructor(options) {
    // 注入 options 
    for (const [key, value] of Object.entries(options)) 
      this[key] = value
    // 检查必要options file
    if (!this.el || typeof this.el !== 'object') throw new Error("el is a required field and is an object")
    if (!this.events || typeof this.el !== 'object') throw new Error("events is a required field")

    this.contexts = {} // 作用域
    this.MOUSE_SYMBOL = Symbol("mouse")
    this.mount()
  }
  disableNativeGestures() {
    // 禁用右键菜单
    window.addEventListener("contextmenu", e => e.preventDefault())
    // 禁用复制选择
    document.addEventListener("selectstart", e => e.preventDefault)
    // 禁用移动端滚屏
    document.addEventListener("touchmove", e => e.preventDefault, { passive: false })
  }
  listenMobileGesture() {
    this.el.addEventListener("touchstart", e => {
      for (const touch of e.changedTouches) {
        this.contexts[touch.identifier] = Object.create(null)
        this.start(touch, this.contexts[touch.identifier])
      }
    })

    this.el.addEventListener("touchmove", e => {
      for (const touch of e.changedTouches)
        this.move(touch, this.contexts[touch.identifier])
    })

    this.el.addEventListener("touchend", e => {
      for (const touch of e.changedTouches)
        this.end(touch, this.contexts[touch.identifier])
    })

    this.el.addEventListener("touchcancel", e => {
      for (const touch of e.changedTouches)
        this.cancel(touch, this.contexts[touch.identifier])
    })
  }
  listenPCGesture() {
    document.addEventListener("mousedown", e => {
      this.contexts[this.MOUSE_SYMBOL] = Object.create(null)
      this.start(e, this.contexts[this.MOUSE_SYMBOL])

      let mousemove = e => {
        this.move(e, this.contexts[this.MOUSE_SYMBOL])
      }
      let mouseup = e => {
        this.end(e, this.contexts[this.MOUSE_SYMBOL])
        document.removeEventListener("mousemove", mousemove)
        document.removeEventListener("mouseup", mouseup)
      }

      document.addEventListener("mousemove", mousemove)
      document.addEventListener("mouseup", mouseup)
    })
  }
  start(point, context) {
    context.startX = point.clientX
    context.startY = point.clientX
    context.moves = []
    context.isTap = true
    context.isPan = false
    context.isPress = false
    context.timeoutHandler = setTimeout(() => {
      // pan的 优先级高 会取消掉
      if (context.isPress) return
      context.isTap = false
      context.isPan = false
      context.isPress = true
      this.emit({ type: "pressstart", point, context })
    }, 500)
    this.emit({ type: "start", point, context })
  }
  move(point, context) {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY
    // pan 不能多次触发 一般触发 10px业界 有时也需要结合 dpr 来辅佐计算  因为现在的移动设备 @2x @3x 很多 这样的话 10px就显得有点太容易触发了
    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      if (context.isPress)
        this.emit({ type: "presscancel", point, context })
      context.isTap = false
      context.isPan = true
      context.isPress = false
      this.emit({ type: "panstart", point, context })
    }

    if (context.isPan) {
      context.moves.push({ dx, dy, t: Date.now() })
      // 过滤过长的停留的记录 （大于300ms）
      context.moves = context.moves.filter(record => Date.now() - record.t < 300)
      this.emit({ type: "pan", point, context })
    }

  }
  end(point, context) {
    if (context.isPan) {
      let dx = point.clientX - context.startX,
        dy = point.clientY - context.startY;
      let record = context.moves[0]
      // 快速扫过的速度 看离开的速度
      let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t)
      let isFlick = speed > 2.5
      isFlick && emit({ type: "flick", point, context, extra: { speed } })
      this.emit({ type: "panend", point, context, extra: { speed, isFlick } })
    }
    context.isTap && this.emit({ type: "tap", point, context })
    context.isPress && this.emit({ type: "pressend", point, context })
    clearTimeout(context.timeoutHandler)
  }
  cancel(point, context) {
    this.emit({ type: "cancel", point, context })
    clearTimeout(context.timeoutHandler)
  }
  emit({
    type,
    point,
    context,
    extra = {}
  }) {
    if (!type || !point || !context) throw new TypeError("type | point | context is required parameter")
    this.el.dispatchEvent(new CustomEvent(type, {
      detail: Object.assign({
        clientX: point.clientX,
        clientY: point.clientY,
        startX: context.startX,
        startY: context.startY
      }, extra)
    }))
  }
  mount() {
    // 禁用部分原生手势
    this.disableNativeGestures()
    // 移动端 触控事件监听
    this.listenMobileGesture()
    // PC端 鼠标监听部分
    !document.ontouchstart && this.listenPCGesture()
    // 监听自定义事件
    for (const [type, handler] of Object.entries(this.events)) {
      this.el.addEventListener(type, e => handler.call(this, e))
    }
  }

}