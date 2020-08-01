/**
 * 如何监听鼠标事件 mousedown mousemove mouseup
 * 如何监听触控事件 touchstart touchmove touchend touchcancel
 * tap
 * pan -> panstart panmove panend
 * flick 快速扫动的行为
 * press -> pressstart pressend
 * 
 * 转换关系 
 * quick touch -> start -> end ：很快的 end 就是一个事件
 * long touch -> start -> end
 */

export function enableGesture(element) {
  // 全局状态定义
  let contexts = Object.create(null)
  let MOUSE_SYMBOL = Symbol("mouse")
  // 判断移动端 还是 PC 若有此值 document.ontouchstart 则代表为移动端 非移动端 使用下面条件
  if (document.ontouchstart !== null)
    element.addEventListener("mousedown", e => {
      contexts[MOUSE_SYMBOL] = Object.create(null)
      start(e, contexts[MOUSE_SYMBOL])

      let mousemove = e => {
        move(e, contexts[MOUSE_SYMBOL])
      }
      let mouseup = e => {
        end(e, contexts[MOUSE_SYMBOL])
        document.removeEventListener("mousemove", mousemove)
        document.removeEventListener("mouseup", mouseup)
      }

      document.addEventListener("mousemove", mousemove)
      document.addEventListener("mouseup", mouseup)
    })

  // touch event 天生就绑定了触发目标 identify 用来标识 到底是那个手指出发的
  element.addEventListener("touchstart", e => {
    // 多指触发
    for (let touch of e.changedTouches) {
      contexts[touch.identifier] = Object.create(null)
      start(touch, contexts[touch.identifier])
    }
  })

  element.addEventListener("touchmove", e => {
    for (let touch of e.changedTouches)
      move(touch, contexts[touch.identifier])
  })

  element.addEventListener("touchend", e => {
    for (let touch of e.changedTouches)
      end(touch, contexts[touch.identifier])
  })

  // 屏幕上突然弹窗 会导致touch cancel
  element.addEventListener("touchcancel", e => {
    for (let touch of e.changedTouches)
      cancel(touch, contexts[touch.identifier])
  })


  // 自定义发送事件
  const emit = ({
    type,
    point,
    context,
    extra = {}
  }) => {
    if (!type || !point || !context) throw new TypeError("type | point | context is required parameter")
    element.dispatchEvent(new CustomEvent(type, {
      detail: Object.assign({
        clientX: point.clientX,
        clientY: point.clientY,
        startX: context.startX,
        startY: context.startY
      }, extra)
    }))
  }
  // 写一个 鼠标 和 触屏都支持的事件
  let start = (point, context) => {
    // 初始化状态
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
      emit({ type: "pressstart", point, context })
    }, 500)
    emit({ type: "start", point, context })
  }

  let move = (point, context) => {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY
    // pan 不能多次触发 一般触发 10px业界 有时也需要结合 dpr 来辅佐计算  因为现在的移动设备 @2x @3x 很多 这样的话 10px就显得有点太容易触发了
    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      if (context.isPress)
        emit({ type: "presscancel", point, context })
      context.isTap = false
      context.isPan = true
      context.isPress = false
      emit({ type: "panstart", point, context })
    }

    if (context.isPan) {
      context.moves.push({ dx, dy, t: Date.now() })
      // 过滤过长的停留的记录 （大于300ms）
      context.moves = context.moves.filter(record => Date.now() - record.t < 300)
      emit({ type: "pan", point, context })
    }
  }

  let end = (point, context) => {
    if (context.isPan) {
      let dx = point.clientX - context.startX,
        dy = point.clientY - context.startY;
      let record = context.moves[0]
      // 快速扫过的速度 看离开的速度
      let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t)
      console.log('speed', speed)
      let isFlick = speed > 2.5
      isFlick && emit({ type: "flick", point, context, extra: { speed } })
      emit({ type: "panend", point, context, extra: { speed, isFlick } })
    }
    context.isTap && emit({ type: "tap", point, context })
    context.isPress && emit({ type: "pressend", point, context })
    clearTimeout(context.timeoutHandler)
  }
  let cancel = (point, context) => {
    emit({ type: "cancel", point, context })
    clearTimeout(context.timeoutHandler)
  }
}