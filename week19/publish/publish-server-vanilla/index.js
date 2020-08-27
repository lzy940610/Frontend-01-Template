const http = require('http');
const fs = require('fs')
const unzipper = require('unzipper')
const https = require('https')
// Create an HTTP server
const server = http.createServer((req, res) => {
  // let matched = req.url.match(/filename=([^&]+)/)
  // let filename = matched && matched[1]
  // if (!filename) return

  // oauth
  if (req.url.match(/^\/auth/)) {
    return auth(req, res)
  }

  if (!req.url.match(/^\/?/)) {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    })
    res.end('not found')
    return
  }

  // 调用github api
  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/user',
    method: 'GET',
    headers: {
      Authorization: `token ${req.headers.token}`,
      "User-Agent": "toy-publish-server"
    }
  };

  const request = https.request(options, (response) => {
    // console.log('statusCode:', res.statusCode);
    // console.log('headers:', res.headers);
    // 会分段 所以会接受多次
    let body = ""
    response.on('data', (d) => {
      body += d.toString()
    });
    response.on('end', () => {
      let user = JSON.parse(body)
      console.log(user)
      // 权限检查
      // do something
      // 开始接收数据
      let writeStream = unzipper.Extract({ path: '../server/public' })
      req.pipe(writeStream)
      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('okay')
      })

    })
  });

  request.on('error', (e) => {
    console.error(e);
  });
  request.end();

});

function auth(req, res) {
  // 授权
  let code = req.url.match(/code=([^&]+)/)[1]
  let state = "abc123"
  let client_secret = "cdb35c308952e58da220f8a367b47c7350bbd458"
  let client_id = "Iv1.86ec739f37e5fa74"
  let redirect_uri = encodeURIComponent("http://localhost:8081/auth")

  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`
  let url = `https://github.com/login/oauth/access_token?${params}`
  const options = {
    hostname: 'github.com',
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    method: 'POST'
  };

  const request = https.request(options, (response) => {
    // console.log('statusCode:', res.statusCode);
    // console.log('headers:', res.headers);

    response.on('data', (d) => {
      console.log(d.toString())
      // process.stdout.write(d);
      let result = d.toString().match(/access_token=([^&]+)/)
      if (result) {
        let token = result[1]
        res.writeHead(200, {
          'access_token': token,
          'Content-Type': 'text/html'
        })
        // res.end('okay')
        res.end(`<a href="http://localhost:8080/publish?token=${token}">publish</a>`)
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/plan'
        })
        res.end('error')
      }

    });

  });

  request.on('error', (e) => {
    console.error(e);
  });
  request.end();
}

server.listen(8081)