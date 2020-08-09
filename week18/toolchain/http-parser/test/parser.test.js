
import { parseHTML } from '../src/parser.js'
// let mod = require('./src/parser.js')
let assert = require('assert') 

// let parseHTML = mod.parseHTML
it('parse a single element', () => {
  let doc = parseHTML("<div></div>")
  let div = doc.children[0]
  assert.equal(div.tagName, "div")
  assert.equal(div.children.length, 0)
  assert.equal(div.type, "element")
  assert.equal(div.attributes.length, 2)
});

it('parse a single element with text content', () => {
  let doc = parseHTML("<div>hello</div>")
  let text = doc.children[0].children[0]
  assert.equal(text.type, "text")
  assert.equal(div.content, "hello")
});

it('tag mismatch', () => {
  try {
    let doc = parseHTML("<div>a < b </div>")
  } catch (e) {
    assert.equal(e.message, "Tag start end doesn't match!")
    
  }
});

it('text with <', () => {

});

it('with property', () => {
  let doc = parseHTML("<div id=a class='cls' data=\"abc\"></div>")
  let div = doc.children[0]

  let count = 0
  for (let attr of div.attributes) {
    if (attr.name === "id") {
      count++
      assert.equal(attr.value, "a")
    }
    if (attr.name === "cls") {
      count++
      assert.equal(attr.value, "cls")
    }
    if (attr.name === "data") {
      count++
      assert.equal(attr.value, "abc")
    }
  }
  assert.ok(count === 3)
});

it('with property 2', () => {
  let doc = parseHTML("<div id=a class='cls' data=\"abc\"></div>")
  let div = doc.children[0]

  let count = 0
  for (let attr of div.attributes) {
    if (attr.name === "id") {
      count++
      assert.equal(attr.value, "a")
    }
    if (attr.name === "cls") {
      count++
      assert.equal(attr.value, "cls")
    }
    if (attr.name === "data") {
      count++
      assert.equal(attr.value, "abc")
    }
  }
  assert.ok(count === 3)
});

it('with property 3', () => {
  let doc = parseHTML("<div id=a class='cls' data=\"abc\" />")
  let div = doc.children[0]

  let count = 0
  for (let attr of div.attributes) {
    if (attr.name === "id") {
      count++
      assert.equal(attr.value, "a")
    }
    if (attr.name === "cls") {
      count++
      assert.equal(attr.value, "cls")
    }
    if (attr.name === "data") {
      count++
      assert.equal(attr.value, "abc")
    }
  }
  assert.ok(count === 3)
});

it('script', () => {
  let content = `
    <div>abcd</div>
    <span>x</span>
    /script>
    <script>
    <
    </
    </s
    </sc
    </scr
    </scri
    </srip
    </script

  `
  let doc = parseHTML(`<script>${content}</script>`)
  let text = doc.children[0].children[0]

  assert.equal(text.content, content)
  assert.equal(text.type, content)


  
});

it('attribute with no value', () => {
  let doc = parseHTML("<div class />")
});


it('attribute with no value 1', () => {
  let doc = parseHTML("<div class id/>")
});

it('attribute with no value', () => {
  let doc = parseHTML("<div/>")
});
