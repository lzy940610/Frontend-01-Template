// let add = require('../dist/add.js')
// let assert = require('assert');
// // import { add } from '../src/add.js'
// // import assert from 'assert'
// // mocha 都是跑的 node 环境 src里面一般放ES6

// describe('add', function() {
//   it('add(3, 4) shuold be 7', function() {
//     assert.equal(add.add(3, 4), 7);
//   });
// });

const test = require('ava');
let mod = require('../dist/add')
// import { add } from '../src/add'

test('foo', t => {
    if(mod.add(3, 4) === 7)
      t.pass();
});