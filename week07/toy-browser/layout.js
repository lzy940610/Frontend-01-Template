function getStyle(element) {
  if (!element.style)
    element.style = {}

  for (let p in element.computeStyle) {
    // 将computeStyle中样式注入到style中
    element.style[p] = element.computeStyle[p].value

    // 兼容px、%、.等单位
    if (element.computeStyle[p].toString().match(/px$/)) {
      element.style[p] = parseInt(element.style[p])
    }

    if (element.computeStyle[p].toString().match(/^[0-9\.]+$/)) {
      element.style[p] = parseInt(element.style[p])
    }

  }

  return element.style

}

function layout(element) {
  if (!element.computeStyle) return

  // 得到样式obj
  let elementStyle = getStyle(element)

  // 不处理非display为flex的layout
  if (elementStyle.display !== 'flex') return

  // 过滤出元素children中的element节点
  let items = element.children.filter(e => e.type === 'element')

  // 通过flex子项item中的order值进行升序排序（从小到大）
  items.sort((a, b) => {
    return (a.order || 0) - (b.order || 0)
  })

  // 对width与height进行初始化处理
  ['width', 'height'].forEach(size => {
    // 当width/height为 auto 或 ‘’ 时 其默认值设为null
    if (style[size] === 'auto' || style[size] === '') {
      style[size] = null
    }
  })

  // 定一个style 便于下方操作 取elementStyle值
  let style = elementStyle

  // 给flex container的各个属性定义默认值
  if (!style.flexDirection || style.flexDirection === 'auto')
    style.flexDirection = 'row'
  if (!style.alignItems || style.alignItems === 'auto')
    style.alignItems = 'stretch'
  if (!style.justifyContent || style.justifyContent === 'auto')
    style.justifyContent = 'flex-start'
  if (!style.flexWrap || style.flexWrap === 'auto')
    style.flexWrap = 'nowrap'
  if (!style.alignContent || style.alignContent === 'auto')
    style.alignContent = 'stretch'


  /**
   * 重头戏 引入 main axis 与 cross axis 主轴、交叉轴概念以及两组属性
   * main axis : mainSize  mainStart  mainEnd  mainSign  mainBase
   * cross axis: crossSize crossStart crossEnd crossSign crossBase
   * size:  轴空间大小
   * start: 轴开始方向
   * end:   轴终止方向
   * sign:  轴初始方向 +1 -1 （使用+1 -1 还可以参与计算 比boolean值拥有更好的表达与计算能力）
   * base:  轴初始起点
   */

  let mainSize, mainStart, mainEnd, mainSign, mainBase,
    crossSize, crossStart, crossEnd, crossSign, crossBase;

  if (style.flexDirection === 'row') {
    mainSize = 'width'
    mainStart = 'left'
    mainEnd = 'right'
    mainSign = +1
    mainBase = 0

    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }

  if (style.flexDirection === 'row-reverse') {
    mainSize = 'width'
    mainStart = 'right'
    mainEnd = 'left'
    mainSign = -1
    mainBase = style.width

    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }


  if (style.flexDirection === 'column') {
    mainSize = 'height'
    mainStart = 'top'
    mainEnd = 'bottom'
    mainSign = +1
    mainBase = 0

    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }


  if (style.flexDirection === 'column-reverse') {
    mainSize = 'height'
    mainStart = 'bottom'
    mainEnd = 'top'
    mainSign = -1
    mainBase = style.height

    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }


  if (style.flexWrap === 'wrap-reverse') {
    let tmp = crossStart
    crossStart = crossEnd
    crossEnd = tmp
    crossSign = -1
  } else {
    crossSign = +1
    crossBase = 0
  }

  /**
   * 第二步：收集元素入行
   * 根据主轴尺寸，把元素 分配到 行内
   * 若设置了nowrap则强制 分配进第一行
   */

  // 主轴是否为自适应尺寸
  let isAutoMainSize = false
  if (!style[mainSize]) { // auto sizing
    elementStyle[mainSize] = 0
    // 遍历item元素的元素空间 并累加得出单行元素空间大小 mainSpace
    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      let itemStyle = getStyle(item)
      if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
        elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize]
      }
    }
    isAutoMainSize = true
  }

  // 定义分配入行相关参数
  let flexLine = [], // flex单行
    flexLines = [flexLine], // flex多行
    mainSpace = elementStyle[mainSize], // 主轴剩余空间
    crossSpace = 0; // 交叉轴空间

  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    let itemStyle = getStyle(item)

    // 给定itemStyle默认值
    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0
    }

    // ⚠️核心代码部分⚠️
    if (itemStyle.flex) {
      // flex有值则直接插入
      flexLine.push(item)
    } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
      // 不换行 并且 为自动宽度
      // 递减mainSpace 会有负数出现
      mainSpace -= itemStyle[mainSize]
      // 当有crossSize时 取 当前crossSpace 与 itemStyle[crossSize] 中的最大值 遍历到最后即为cross最大值
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0))
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
      // 将元素入队flexLine中
      flexLine.push(item)
    } else {
      // 当前为可换行条件

      // 当item的mainSize大于 元素的mainSize则将item设为元素mainSize的值
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize]
      }

      if (mainSpace < itemStyle[mainSize]) {
        // 当可用空间不足放下下一个元素 新增一行
        flexLine.mainSpace = mainSpace
        flexLine.crossSpace = crossSpace
        flexLine = [item]
        flexLines.push(flexLine)

        // 重置 主轴与交叉轴
        mainSpace = style[isAutoMainSize]
        crossSpace = 0
      } else {
        flexLine.push(item)
      }

      // 更新crossSpace
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0))
        crossSpace = Math.max(crossSpace, itemStyle[crossSpace])

      // 更新mainSpace
      mainSpace -= itemStyle[mainSize]

    }

  }

  // 将mainSpace值挂载到flexLine的mainSpace上
  flexLine.mainSpace = mainSpace

  console.log('items :', items)
  /**
   * 第三步：计算主轴方向
   * 找出所有flex元素
   * 把主轴方向的剩余尺寸按比列分配给这些元素
   * 若剩余空间为负数，所有flex元素为0 等比压缩剩余元素
   */

  // 存储crossSpace 交叉轴剩余空间
  if (style.flexWrap === 'nowrap' || isAutoMainSize) {
    flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace
  } else {
    flexLine.crossSpace = crossSpace
  }

  // 主轴剩余空间
  if (mainSpace < 0) {
    // overflow (happens only if container is single line ), scale every item
    let scale = style[mainStyle] / (style[mainSize] - mainSpace) // 伸缩比列
    let currentMain = mainBase // 当前item主轴起点 暂存值

    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      let itemStyle = getStyle(item)

      if (itemStyle.flex) {
        itemStyle[mainSize] = 0
      }

      itemStyle[mainSize] = itemStyle[mainSize] * scale

      // flex item每一项的mainStart 与 mainEnd
      itemStyle[mainStart] = currentMain
      itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
      currentMain = itemStyle[mainEnd]

    }

  } else {
    // process each flex line
    flexLines.forEach((items) => {
      let mainSpace = items.mainSpace
      let flexTotal = 0

      // 遍历找寻flex元素 并计算得到 比列总和 flexTotal
      for (let i = 0; i < items.length; i++) {
        let item = items[i]
        let itemStyle = getStyle(item)

        // 更新flexTotal 得到比列总和
        if ((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
          flexTotal += itemStyle.flex
          continue
        }

      }

      // 处理有flexTotal有值的情况
      if (flexTotal > 0) {
        // Threr is flexible flex items
        let currentMain = mainBase

        for (let i = 0; i < items.length; i++) {
          let item = items[i]
          let itemStyle = getStyle(item)

          // 按比列分配mainSpace 剩余空间
          if (itemStyle.flex) {
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex
          }

          // 更新flex item每一项的mainStart 与 mainEnd
          itemStyle[mainStart] = currentMain
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
          currentMain = itemStyle[mainEnd]

        }
      } else {
        // 处理flexTotal没有的情况 即一个flex元素都木有
        // There is "No" flexible flex items, which means, justifyContent should work
        let currentMain, step = 0;
        if (style.justifyContent === 'flex-start') {
          currentMain = mainBase
          step = 0
        }

        if (style.justifyContent === 'flex-end') {
          currentMain = mainSpace * mainSign + mainBase
          step = 0
        }

        if (style.justifyContent === 'center') {
          currentMain = mainSpace / 2 * mainSign + mainBase
          step = 0
        }

        if (style.justifyContent === 'space-between') {
          step = mainSpace / (items.length - 1) * mainSign
          currentMain = mainBase
        }

        if (style.justifyContent === 'space-around') {
          step = mainSpace / items.length * mainSign
          currentMain = step / 2 + mainBase
        }

        for (let i = 0; i < items.length; i++) {
          let item = items[i]
          let itemStyle = getStyle(item)

          itemStyle[mainStart] = currentMain
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
          currentMain = itemStyle[mainEnd] + step
        }


      }

    })
  }


  /**
   * 第三步：计算交叉轴 compute the cross axis sizes
   * align-items align-self
   * 根据每一行中最大元素尺寸计算行高
   * 根据行高flex-align和item-align 确定元素具体位置
   */

  // let crossSpace // 交叉轴剩余空间

  if (!style[crossSize]) { // auto sizing
    crossSpace = 0
    elementStyle[crossSize] = 0
    for (let i = 0; i < flexLines.length; i++)
      elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace

  } else {
    crossSpace = style[crossSize]
    for (let i = 0; i < flexLines.length; i++)
      crossSpace -= flexLines[i].crossSpace

  }

  // 交换轴位置
  if (style.flexWrap === 'flex-reverse') {
    crossBase = style[crossSize]
  } else {
    crossBase = 0
  }

  let lineSize = style[crossSize] / flexLines.length // 每行平均高度
  let step

  if (style.alignContent === 'flex-start') {
    crossBase += 0
    step = 0
  }

  if (style.alignContent === 'flex-end') {
    crossBase += crossSize * crossSpace
    step = 0
  }

  if (style.alignContent === 'center') {
    crossBase += crossSign * crossSpace / 2
    step = 0
  }
  if (style.alignContent === 'space-between') {
    crossBase += 0
    step = crossSpace / (flexLines.length - 1)
  }
  if (style.alignContent === 'space-around') {
    step = crossSpace / flexLines.length
    crossBase += crossSign * step / 2
  }
  if (style.alignContent === 'stretch') {
    crossBase += 0
    step = 0
  }

  flexLines.forEach((items) => {
    let lineCrossSize = style.alignContent === 'stretch' ?
      items.crossSpace + crossSpace / flexLines.length :
      items.crossSpace

    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      let itemStyle = getStyle(item)

      let align = itemStyle.alignSelf || style.alignItems

      if (itemStyle[crossSize] === null)
        itemStyle[crossSize] = align === 'stretch' ? lineCrossSize : 0

      if (align === 'flex-start') {
        itemStyle[crossStart] = crossBase
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSize * itemStyle[crossSize]

      }

      if (align === 'flex-end') {
        itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize
        itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize]
      }

      if (align === 'center') {
        itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize])
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize]
      }

      if (align === 'stretch') {
        itemStyle[crossStart] = crossBase
        itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) ? itemStyle[crossSize] : lineCrossSize)
        itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
      }
    }
    crossBase += crossSign * (lineCrossSize + step)
  })

}

module.exports = layout