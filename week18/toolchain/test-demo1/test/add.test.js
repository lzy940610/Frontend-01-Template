// const mol = require('../src/add.js')
// const assert = require('assert')

// // antipattern
// it('add(3, 4) shuold be 7', () => {
//   assert.equal(mol.add(3, 4), 7);
// });

import { add } from '../src/add.js'
const assert = require('assert')

// antipattern
it('add(3, 4) shuold be 7', () => {
  assert.equal(add(3, 4), 7);
});
