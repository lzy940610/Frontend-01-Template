let pattern = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0
]

let color = 2 // 谁先手 2 ⭕️ 1 ❌

let gameOver = false

function render() {
  let board = document.getElementById('board')
  board.innerText = ''
  pattern.forEach((item, i) => {
    let cell = document.createElement('div')
    cell.classList.add('cell')
    cell.innerHTML = item == 2 ? '⭕️' : item == 1 ? '❌' : ''
    cell.addEventListener('click', () => userMove(i))
    board.append(cell)
  })

}

function userMove(i) {
  pattern[i] = color
  if (check(pattern, color)) {
    alert(color == 2 ? '⭕️ is winner!' : '❌ is winner!')
  }
  color = 3 - color
  render()
  computerMove()
}

function computerMove() {
  let choice = bestChoice(pattern, color)
  if (choice.point) {
    let [x, y] = choice.point
    pattern[x * 3 + y] = color
  }
  if (check(pattern, color)) {
    alert(color == 2 ? '⭕️ is winner!' : '❌ is winner!')
  }
  color = 3 - color
  render()
}


function check(pattern, color) {
  // 纵向 3种
  for (let x = 0; x < 3; x++) {
    let win = true
    for (let y = 0; y < 3; y++) {
      if (pattern[x * 3 + y] !== color) {
        win = false
        break
      }
    }
    if (win) return true
  }
  // 横向 3种
  for (let x = 0; x < 3; x++) {
    let win = true
    for (let y = 0; y < 3; y++) {
      if (pattern[y * 3 + x] !== color) {
        win = false
        break
      }
    }
    if (win) return true
  }

  // 斜向 2种
  {
    let win = true
    for (let i = 0; i < 3; i++) {
      if (pattern[i * 3 + i] !== color) {
        win = false
        break
      }
    }
    if (win) return true
  }

  {
    let win = true
    for (let i = 0; i < 3; i++) {
      if (pattern[i * 3 + (2 - i)] !== color) {
        win = false
        break
      }
    }
    if (win) return true
  }

}

function clone(pattern) {
  return Object.create(pattern)

}

function willWin(pattern, color) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[i * 3 + j]) continue

      let tmp = clone(pattern)
      tmp[i * 3 + j] = color
      if (check(tmp, color)) {
        return [i, j]
      }
      return null
    }
  }
}

function bestChoice(pattern, color) {

  let point = willWin(pattern, color)
  if (point) {
    return {
      point: point,
      result: 1
    }
  }

  // 检查每个可能点 找到对手最坏的情况 就是自己的最好的
  let result = -1

  outer: for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (pattern[x * 3 + y]) continue

      let tmp = clone(pattern)
      tmp[x * 3 + y] = color
      let opp = bestChoice(tmp, 3 - color)
      if (-opp.result >= result) {
        point = [x, y]
        result = -opp.result
      }
      if (result == 1) {
        break outer;
      }
    }
  }


  return {
    point: point,
    result: point ? result : 0 // -1 输 0 平 1 赢
  }
}

render()