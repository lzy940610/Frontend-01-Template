const http = require('http')
const querystring = require('querystring')
const { fstat } = require('fs')
const fs = require('fs')
const archiver = require('archiver');
const child_process = require('child_process')

let packname = './package'
/**
 * Iv1.86ec739f37e5fa74
 * cdb35c308952e58da220f8a367b47c7350bbd458
 */
let client_id = 'Iv1.86ec739f37e5fa74'
let client_secret = 'cdb35c308952e58da220f8a367b47c7350bbd458'
let redirect_uri = encodeURIComponent("http://localhost:8081/auth")
child_process.exec(`open https://github.com/login/oauth/authorize?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}`)
// fs.stat(packname, (error, stat) => {
const server = http.createServer((request, res) => {
    let token = request.url.match(/token=([^&]+)/)[1]
    console.log('real publish!!')
    const options = {
        hostname: 'localhost',
        port: 8081,
        path: `/?filename=package.zip`,
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/octet-stream'
        }
    };

    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });

    archive.directory(packname, false);

    archive.finalize()

    archive.pipe(req)

    archive.on('end', () => {
        req.end()
        console.log('publish success!')
        server.close()
    })

})

server.listen(8080)


