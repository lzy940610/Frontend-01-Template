/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/createElement.js":
/*!******************************!*\
  !*** ./lib/createElement.js ***!
  \******************************/
/*! exports provided: createElement, Text, Wrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Wrapper\", function() { return Wrapper; });\n/* harmony import */ var _gesture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gesture.js */ \"./lib/gesture.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\nfunction createElement(Cls, attributes) {\n  // console.log('arguments', arguments)\n  var o;\n\n  if (typeof Cls === \"string\") {\n    o = new Wrapper(Cls);\n  } else {\n    o = new Cls({\n      timer: {}\n    });\n  }\n\n  for (var name in attributes) {\n    // o[name] = attributes[name]\n    // o[name] = attributes[name]\n    o.setAttribute(name, attributes[name]);\n  }\n\n  var visit = function visit(children) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        // 如果是数组 则递归访问\n        if (_typeof(child) === \"object\" && child instanceof Array) {\n          visit(child);\n          continue;\n        }\n\n        if (typeof child === \"string\") child = new Text(child);\n        o.appendChild(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  };\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  visit(children); // 在JSX中父子组件的构建顺序为 ： 先子后父\n  // console.log('children', children)\n\n  return o;\n}\nvar Text = /*#__PURE__*/function () {\n  function Text(text) {\n    _classCallCheck(this, Text);\n\n    this.root = document.createTextNode(text);\n  }\n\n  _createClass(Text, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      return this.root.getAttribute(name);\n    }\n  }]);\n\n  return Text;\n}();\nvar Wrapper = /*#__PURE__*/function () {\n  function Wrapper(type) {\n    _classCallCheck(this, Wrapper);\n\n    this.children = [];\n    this.root = document.createElement(type);\n  }\n\n  _createClass(Wrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      // attribute\n      // console.log('setAttribute :', name, value)\n      this.root.setAttribute(name, value);\n\n      if (name.match(/^on([\\s\\S]+)$/)) {\n        // 首字母小写\n        var eventName = RegExp.$1.replace(/^[\\s\\S]/, function (c) {\n          return c.toLowerCase();\n        }); // console.log('eventName', eventName)\n\n        this.root.addEventListener(eventName, value);\n      }\n\n      if (name === \"enableGesture\") {\n        // 根据属性 进行特殊处理与回应\n        Object(_gesture_js__WEBPACK_IMPORTED_MODULE_0__[\"enableGesture\"])(this.root);\n      }\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      return this.root.getAttribute(name);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      // children\n      this.children.push(child);\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener() {\n      var _this$root;\n\n      (_this$root = this.root).addEventListener.apply(_this$root, arguments);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      // mount 是生命周期 一些DOM挂载最好也放入里面\n      parent.appendChild(this.root);\n\n      var _iterator2 = _createForOfIteratorHelper(this.children),\n          _step2;\n\n      try {\n        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n          var child = _step2.value;\n          child.mountTo(this.root);\n        }\n      } catch (err) {\n        _iterator2.e(err);\n      } finally {\n        _iterator2.f();\n      }\n    }\n  }, {\n    key: \"style\",\n    get: function get() {\n      return this.root.style;\n    }\n  }, {\n    key: \"classList\",\n    get: function get() {\n      return this.root.classList;\n    }\n  }, {\n    key: \"innerText\",\n    set: function set(text) {\n      return this.root.innerText = text;\n    }\n  }]);\n\n  return Wrapper;\n}();\n\n//# sourceURL=webpack:///./lib/createElement.js?");

/***/ }),

/***/ "./lib/gesture.js":
/*!************************!*\
  !*** ./lib/gesture.js ***!
  \************************/
/*! exports provided: enableGesture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"enableGesture\", function() { return enableGesture; });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n/**\n * 如何监听鼠标事件 mousedown mousemove mouseup\n * 如何监听触控事件 touchstart touchmove touchend touchcancel\n * tap\n * pan -> panstart panmove panend\n * flick 快速扫动的行为\n * press -> pressstart pressend\n * \n * 转换关系 \n * quick touch -> start -> end ：很快的 end 就是一个事件\n * long touch -> start -> end\n */\nfunction enableGesture(element) {\n  // 全局状态定义\n  var contexts = Object.create(null);\n  var MOUSE_SYMBOL = Symbol(\"mouse\"); // 判断移动端 还是 PC 若有此值 document.ontouchstart 则代表为移动端 非移动端 使用下面条件\n\n  if (document.ontouchstart !== null) element.addEventListener(\"mousedown\", function (e) {\n    contexts[MOUSE_SYMBOL] = Object.create(null);\n    start(e, contexts[MOUSE_SYMBOL]);\n\n    var mousemove = function mousemove(e) {\n      move(e, contexts[MOUSE_SYMBOL]);\n    };\n\n    var mouseup = function mouseup(e) {\n      end(e, contexts[MOUSE_SYMBOL]);\n      document.removeEventListener(\"mousemove\", mousemove);\n      document.removeEventListener(\"mouseup\", mouseup);\n    };\n\n    document.addEventListener(\"mousemove\", mousemove);\n    document.addEventListener(\"mouseup\", mouseup);\n  }); // touch event 天生就绑定了触发目标 identify 用来标识 到底是那个手指出发的\n\n  element.addEventListener(\"touchstart\", function (e) {\n    // 多指触发\n    var _iterator = _createForOfIteratorHelper(e.changedTouches),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var touch = _step.value;\n        contexts[touch.identifier] = Object.create(null);\n        start(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  });\n  element.addEventListener(\"touchmove\", function (e) {\n    var _iterator2 = _createForOfIteratorHelper(e.changedTouches),\n        _step2;\n\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var touch = _step2.value;\n        move(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n  });\n  element.addEventListener(\"touchend\", function (e) {\n    var _iterator3 = _createForOfIteratorHelper(e.changedTouches),\n        _step3;\n\n    try {\n      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n        var touch = _step3.value;\n        end(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator3.e(err);\n    } finally {\n      _iterator3.f();\n    }\n  }); // 屏幕上突然弹窗 会导致touch cancel\n\n  element.addEventListener(\"touchcancel\", function (e) {\n    var _iterator4 = _createForOfIteratorHelper(e.changedTouches),\n        _step4;\n\n    try {\n      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n        var touch = _step4.value;\n        cancel(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _iterator4.e(err);\n    } finally {\n      _iterator4.f();\n    }\n  }); // 自定义发送事件\n\n  var emit = function emit(_ref) {\n    var type = _ref.type,\n        point = _ref.point,\n        context = _ref.context,\n        _ref$extra = _ref.extra,\n        extra = _ref$extra === void 0 ? {} : _ref$extra;\n    if (!type || !point || !context) throw new TypeError(\"type | point | context is required parameter\");\n    element.dispatchEvent(new CustomEvent(type, {\n      detail: Object.assign({\n        clientX: point.clientX,\n        clientY: point.clientY,\n        startX: context.startX,\n        startY: context.startY\n      }, extra)\n    }));\n  }; // 写一个 鼠标 和 触屏都支持的事件\n\n\n  var start = function start(point, context) {\n    // 初始化状态\n    context.startX = point.clientX;\n    context.startY = point.clientX;\n    context.moves = [];\n    context.isTap = true;\n    context.isPan = false;\n    context.isPress = false;\n    context.timeoutHandler = setTimeout(function () {\n      // pan的 优先级高 会取消掉\n      if (context.isPress) return;\n      context.isTap = false;\n      context.isPan = false;\n      context.isPress = true;\n      emit({\n        type: \"pressstart\",\n        point: point,\n        context: context\n      });\n    }, 500);\n    emit({\n      type: \"start\",\n      point: point,\n      context: context\n    });\n  };\n\n  var move = function move(point, context) {\n    var dx = point.clientX - context.startX,\n        dy = point.clientY - context.startY; // pan 不能多次触发 一般触发 10px业界 有时也需要结合 dpr 来辅佐计算  因为现在的移动设备 @2x @3x 很多 这样的话 10px就显得有点太容易触发了\n\n    if (Math.pow(dx, 2) + Math.pow(dy, 2) > 100 && !context.isPan) {\n      if (context.isPress) emit({\n        type: \"presscancel\",\n        point: point,\n        context: context\n      });\n      context.isTap = false;\n      context.isPan = true;\n      context.isPress = false;\n      emit({\n        type: \"panstart\",\n        point: point,\n        context: context\n      });\n    }\n\n    if (context.isPan) {\n      context.moves.push({\n        dx: dx,\n        dy: dy,\n        t: Date.now()\n      }); // 过滤过长的停留的记录 （大于300ms）\n\n      context.moves = context.moves.filter(function (record) {\n        return Date.now() - record.t < 300;\n      });\n      emit({\n        type: \"pan\",\n        point: point,\n        context: context\n      });\n    }\n  };\n\n  var end = function end(point, context) {\n    if (context.isPan) {\n      var dx = point.clientX - context.startX,\n          dy = point.clientY - context.startY;\n      var record = context.moves[0]; // 快速扫过的速度 看离开的速度\n\n      var speed = Math.sqrt(Math.pow(record.dx - dx, 2) + Math.pow(record.dy - dy, 2)) / (Date.now() - record.t);\n      console.log('speed', speed);\n      var isFlick = speed > 2.5;\n      isFlick && emit({\n        type: \"flick\",\n        point: point,\n        context: context,\n        extra: {\n          speed: speed\n        }\n      });\n      emit({\n        type: \"panend\",\n        point: point,\n        context: context,\n        extra: {\n          speed: speed,\n          isFlick: isFlick\n        }\n      });\n    }\n\n    context.isTap && emit({\n      type: \"tap\",\n      point: point,\n      context: context\n    });\n    context.isPress && emit({\n      type: \"pressend\",\n      point: point,\n      context: context\n    });\n    clearTimeout(context.timeoutHandler);\n  };\n\n  var cancel = function cancel(point, context) {\n    emit({\n      type: \"cancel\",\n      point: point,\n      context: context\n    });\n    clearTimeout(context.timeoutHandler);\n  };\n}\n\n//# sourceURL=webpack:///./lib/gesture.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/createElement */ \"./lib/createElement.js\");\n // let component = <Carousel data = {\n//   [\n//     \"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg\",\n//     \"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg\",\n//     \"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg\",\n//     \"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg\",\n//   ]\n// }\n\nvar component = Object(_lib_createElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"div\", null, \"Hello world!\");\ncomponent.mountTo(document.body); // let panel = <Panel title=\"this is panel\" title=\"this is title\">\n//   <span >this is children1</span>\n// </Panel> \n// panel.mountTo(document.body)\n// let tabPanel = <TabPanel title=\"this is panel\">\n//   <span title=\"title1\">this is children1</span>\n//   <span title=\"title2\">this is children2</span>\n//   <span title=\"title3\">this is children3</span>\n//   <span title=\"title4\">this is children4</span>\n// </TabPanel> \n// tabPanel.mountTo(document.body)\n// let data = [\n//   { title: \"蓝猫\", url: \"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg\" },\n//   { title: \"橘猫加白\", url: \"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg\" },\n//   { title: \"狸花加白\", url: \"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg\" },\n//   { title: \"橘猫\", url: \"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg\" }\n// ]\n// let list = <ListView data={data} >\n//   {\n//     item => <figure>\n//       <img src={item.url} />\n//       <figcaption>{item.title}</figcaption>\n//     </figure>\n//   }\n// </ListView>\n// list.mountTo(document.body)\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });