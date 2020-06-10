const match = (selector, element) => {
  // 定义变量
  const idArr = selector.match(/(#\w+)+/g)
  const classArr = selector.match(/(\.\w+)/g)
  const parentArr = selector.match(/\[(.+?)\]/g)
  const elementArr = selector.split(' ').filter(s => !['#', '.', '['].includes(s.charAt(0)))

  // 判断逻辑
  let matched = false

  if (idArr && idArr[0].charAt(0) === "#") {
    if (element.attributes["id"].value === idArr[0].substring(1)) {
      matched = true
    }
  }
  if (classArr && classArr[0].charAt(0) === ".") {
    let class_name = element.attributes["class"].value;
    if (class_name && class_name === classArr[0].substring(1)) {
      matched = true
    }
  }
  if (parentArr) {
    const split_parentheses = parentArr[0]
      .substring(1, parentArr[0].length - 1)
      .split("=")
    if (
      element.attributes[split_parentheses[0]].value === split_parentheses[1]
    ) {
      matched = true
    }
  }
  if (elementArr[0] === element.tagName.toLowerCase()) {
    matched = true
  }

  return matched

}
match('div #div.class', document.getElementById('id'))