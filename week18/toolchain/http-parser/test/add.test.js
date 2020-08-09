import { add } from '../src/add'
let assert = require('assert') 

it('add(3, 4) is 7', () => {
  assert.equal(add(3, 4), 7)
});