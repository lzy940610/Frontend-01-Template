const net = require('net');
/**
 * Request
 */
/**
 * Response
 */
// ResponseParse 用来产生 Response这个class
class ResponseParser {
  /**
   * 格式
   * status line
   *  HTTP/1.1 200 OK
   * 
   * headers
   *  Content-Type: text/html
   *  Date: Mon, 23 Dec 2019 06:46:19 GMT
   *  Connection: keep-alive
   *  Transfer-Encoding: chunked
   *  X-Foo: bar
   * 
   * body
   *   26 字符长度
   *    <html><body>Hello World</body></html> // 字符
   *  
   *   0
   * 有限状态机 Finite-state machin
   *    状态总数（state）是有限的
   *    任一时刻，只处在一种状态之中
   *    某种条件下，会从一种状态转变（transition）到另一种状态
   * 
   * \r 分界符号
   * \n 换行符
   */

  constructor() {
    this.WAITING_STATUS_LINE = 0 // init status
    this.WAITING_STATUS_LINE_END = 1 // meet a '\r'
    this.WAITING_HEADER_NAME = 2 // meet a ':'
    this.WAITING_HEADER_SPACE = 3 // headerName after need a space
    this.WAITING_HEADER_VALUE = 4
    this.WAITING_HEADER_LINE_END = 5 // one 'key-value' end
    this.WAITING_HEADER_BLOCK_END = 6 // header meet \r end
    this.WAITING_HEADER_BODY = 7 // body start

    this.current = this.WAITING_STATUS_LINE
    this.statusLine = ""
    this.headers = {}
    this.headerName = ""
    this.headerValue = ""
    this.bodyParser = null // 在解析完headers再创建的 等Transfer-Encoding

  }
  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished
  }
  get response() {
    console.log('this.statusLine :', this.statusLine);
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }
  receive(string) {
    for (let i = 0; i < string.length; i++) {
      // charAt
      this.receiveChar(string.charAt(i))
    }
  }
  receiveChar(char) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_STATUS_LINE_END
      } else if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      } else {
        this.statusLine += char
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      this.current = this.WAITING_HEADER_NAME
    } else if (this.current === this.WAITING_HEADER_NAME) {
      // 以冒号结束
      if (char === ':') {
        this.current = this.WAITING_HEADER_SPACE
      } else if (char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END
        // header parse end then create bodyParser
        if (this.headers["Transfer-Encoding"] === 'chunked') {
          this.bodyParser = new TrunkedBodyParse()
        }
      } else {
        this.headerName += char
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.WAITING_HEADER_VALUE
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END
        // 存储key-value到headers
        this.headers[this.headerName] = this.headerValue
        // 初始化 headerName and headerValue
        this.headerName = ""
        this.headerValue = ""
      } else {
        this.headerValue += char
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_BODY
      }
    } else if (this.current === this.WAITING_HEADER_BODY) {
      this.bodyParser.receiveChar(char)
    }

  }

}

class TrunkedBodyParse {
  constructor() {
    this.WAITING_LENGTH = 0
    this.WAITING_LENGTH_LINE_END = 1
    this.READING_TRUNK = 2
    this.WAITING_NEW_LINE = 3
    this.WAITING_NEW_LINE_END = 4

    this.length = 0
    this.content = []
    this.isFinished = false
    this.current = this.WAITING_LENGTH
  }
  receiveChar(char) {
    if (this.current === this.WAITING_LENGTH) {
      if (char === '\r') {
        if (this.length === 0) {
          this.isFinished = true
        }
        this.current = this.WAITING_LENGTH_LINE_END
      } else {
        this.length *= 10
        this.length += char.charCodeAt(0) - '0'.charCodeAt(0) // 这里为什么这么写？
        // this.length += char.charCodeAt(0) - '0'.charCodeAt(0)
      }
    } else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (char === '\n') {
        this.current = this.READING_TRUNK
      }
    } else if (this.current === this.READING_TRUNK) {
      this.content.push(char)
      this.length--
      if (this.length === 0) {
        this.current = this.WAITING_NEW_LINE
      }
    } else if (this.current === this.WAITING_NEW_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_NEW_LINE_END
      }
    } else if (this.current === this.WAITING_NEW_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_LENGTH
      }
    }
  }
}

class Request {
  constructor(options) {
    this.method = options.method || "GET"
    this.host = options.host
    this.path = options.path || "/"
    this.port = options.port || 80
    this.body = options.body || {}
    this.headers = options.headers || {}
    // 要根据 content-type 去编码它的文字

    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoed"
    }

    if (this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body)
    } else if (this.headers["Content-Type"] === "application/x-www-form-urlencoed") {
      /**
       * 注意 使用encodeURLComponent 对key值编码一下
       * encodeURIComponent（）函数通过 用表示字符的UTF-8编码的一个，两个，三个或四个
       * 转义序列 替换 某些字符的 每个实例 来对 URI进行编码
       */
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
    }
    // 计算content-length
    this.headers["Content-Length"] = this.bodyText.length
  }
  toString() {
    // ⚠️ \r\n 不是 \n\r
    return `
${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
  }
  send(connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser()
      if (connection) {
        connection.write(this.toString())
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString())
        })
      }
      // 监听连接的成功与失败回调 使用promise resolve 和reject接受
      // on('data') 触发多少次 并不是一个固定的值 因为返回的是流数据 中断也没关系
      // 触发时机 buffer满了 或 服务端的IP包已经收到 TCP认为是流 断在哪无所谓 服务端不保证有多少个包
      // 只保证顺序 一部分一部分注入parse 然后再吐出来一个response
      connection.on('data', (data) => {
        parser.receive(data.toString()) // 将返回的data 传递给parser
        if (parser.isFinished) {
          resolve(parser.response)
        }
        connection.end()
      })
      connection.on('error', err => {
        reject(err)
        connection.end()
      })
    })

  }

}

void async function() {
  const request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    path: "/",
    port: 8088,
    headers: {
      ["X-Foo2"]: "customed"
    },
    body: {
      name: "winter"
    }
  })

  const response = await request.send()
  console.log('response :', response);
}()