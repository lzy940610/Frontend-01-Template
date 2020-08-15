const http = require('http')
const querystring = require('querystring')
const { fstat } = require('fs')
const fs = require('fs')
const archiver = require('archiver');

let packname = './package'

fs.stat(packname, (error, stat) => {
    const options = {
        hostname: 'localhost',
        port: 8081,
        path: `/?filename=${packname}.zip`,
        method: 'POST',
        headers: {
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
    })


    // Write data to request body
    // let readStream = fs.createReadStream('./' + filename)
    // readStream.pipe(req)
    // readStream.on('end', () => {
    //     req.end()
    // })
    // req.write(postData);
    // req.end();
})




// !!!!!!!!!!!!!!!!!!

// const postData = querystring.stringify({
//     'msg': 'Hello World!'
// });

// const options = {
//     hostname: 'www.google.com',
//     port: 80,
//     path: '/upload',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Length': Buffer.byteLength(postData)
//     }
// };

// const req = http.request(options, (res) => {
//     console.log(`STATUS: ${res.statusCode}`);
//     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//     res.setEncoding('utf8');
//     res.on('data', (chunk) => {
//         console.log(`BODY: ${chunk}`);
//     });
//     res.on('end', () => {
//         console.log('No more data in response.');
//     });
// });

// req.on('error', (e) => {
//     console.error(`problem with request: ${e.message}`);
// });

// // Write data to request body
// req.write(postData);
// req.end();