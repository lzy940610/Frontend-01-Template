# 每周总结可以写在这里

## 组件 TabPanel & ListView

## 工具链 


### 工具
jenkins
git
webpack
travis
babel
eslint
gulp
create-react-app
umi
gitlab
vscode
mocha
http-server
rollup
vue-cli
grunt
mock
husky
prettier
axios
yeoman
postman
dva
lerna
jest
postman
maven
easymock
swagger
wireshark
charis
charles

#### 工具分类

#### 在没有函数名字的函数里面实现递归 recursion

```
let y = g => 
    (f => f(f))(
      self =>
        g( (...args) => self(self).apply(this, args) )
    )

    
let f = y(self => {
  return n => n > 0 ? self(n - 1) + n : 0
})

f(100)
```
