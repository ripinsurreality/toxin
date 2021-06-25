/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\n\n//# sourceURL=webpack://toxin/./node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/***/ ((module) => {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\n\n//# sourceURL=webpack://toxin/./node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("function _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\nmodule.exports = _defineProperty;\n\n//# sourceURL=webpack://toxin/./node_modules/@babel/runtime/helpers/defineProperty.js?");

/***/ }),

/***/ "./src/modules/doughnut/Controller.ts":
/*!********************************************!*\
  !*** ./src/modules/doughnut/Controller.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DoughnutController\": () => /* binding */ DoughnutController\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar DoughnutController = function DoughnutController(model, view, items) {\n  var _this = this;\n\n  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DoughnutController);\n\n  this.model = model;\n  this.view = view;\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"updateModel\", function (options) {\n    if (options.type === \"title\") {}\n\n    if (options.type === \"item\") {\n      _this.view.doughnut.addItem(options.index, options.value, options.title, options.color, _this.model.sum);\n\n      _this.view.list.addItem(options.title, options.color);\n\n      _this.view.number.title = _this.model.title;\n      _this.view.number.number = String(_this.model.sum);\n    }\n  });\n\n  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, \"updateView\", function (options) {\n    if (options.type === \"view\") {\n      _this.view.draw();\n    }\n  });\n\n  this.model.sub(this);\n  this.view.sub(this);\n  this.model.setTotalName([\"голос\", \"голоса\", \"голосов\"]);\n  items.forEach(function (item) {\n    _this.model.addItem(item);\n  });\n};\n\n//# sourceURL=webpack://toxin/./src/modules/doughnut/Controller.ts?");

/***/ }),

/***/ "./src/modules/doughnut/Model.ts":
/*!***************************************!*\
  !*** ./src/modules/doughnut/Model.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DoughnutModel\": () => /* binding */ DoughnutModel,\n/* harmony export */   \"DoughnutItem\": () => /* binding */ DoughnutItem\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar DoughnutModel = /*#__PURE__*/function () {\n  function DoughnutModel() {\n    var _this = this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DoughnutModel);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_totalName\", [\"\", \"\", \"\"]);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_items\", []);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"observers\", []);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"update\", function (options) {\n      _this.observers.forEach(function (o) {\n        return o.updateModel(options);\n      });\n    });\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DoughnutModel, [{\n    key: \"addItem\",\n    value: function addItem(item) {\n      var newIndex = this._items.length;\n      var newItem = new DoughnutItem(item.value, item.color, item.title, newIndex);\n\n      this._items.push(newItem);\n\n      this.updateItem(newIndex);\n    }\n  }, {\n    key: \"setTotalName\",\n    value: function setTotalName(totalNames) {\n      this._totalName = totalNames;\n      this.update({\n        type: \"title\",\n        title: this.title\n      });\n    }\n  }, {\n    key: \"getWordForm\",\n    value: function getWordForm(value, forms) {\n      var cases = [2, 0, 1, 1, 1, 2];\n      return forms[value % 100 > 4 && value % 100 < 20 ? 2 : cases[value % 10 < 5 ? value % 10 : 5]];\n    }\n  }, {\n    key: \"updateItem\",\n    value: function updateItem(index) {\n      if (typeof this._items[index] === \"undefined\") {\n        throw new Error(\"Model update error: wrong index, item doesn't exist\");\n      }\n\n      var _this$_items$index = this._items[index],\n          color = _this$_items$index.color,\n          title = _this$_items$index.title,\n          value = _this$_items$index.value;\n      this.update({\n        type: \"item\",\n        index: index,\n        color: color,\n        title: title,\n        value: value\n      });\n    }\n  }, {\n    key: \"sub\",\n    value: function sub(o) {\n      this.observers.push(o);\n    }\n  }, {\n    key: \"unsub\",\n    value: function unsub(o) {\n      this.observers.filter(function (ob) {\n        return o !== ob;\n      });\n    }\n  }, {\n    key: \"sum\",\n    get: function get() {\n      var values = this._items.map(function (i) {\n        return i.value;\n      });\n\n      return values.length > 0 ? values.reduce(function (prev, curr) {\n        return prev + curr;\n      }) : 0;\n    }\n  }, {\n    key: \"title\",\n    get: function get() {\n      return this.getWordForm(this.sum, this._totalName);\n    }\n  }]);\n\n  return DoughnutModel;\n}();\nvar DoughnutItem = /*#__PURE__*/function () {\n  function DoughnutItem(_value, _color, _title, _index) {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DoughnutItem);\n\n    this._value = _value;\n    this._color = _color;\n    this._title = _title;\n    this._index = _index;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DoughnutItem, [{\n    key: \"value\",\n    get: function get() {\n      return this._value;\n    }\n  }, {\n    key: \"color\",\n    get: function get() {\n      return this._color;\n    }\n  }, {\n    key: \"title\",\n    get: function get() {\n      return this._title;\n    }\n  }]);\n\n  return DoughnutItem;\n}();\n\n//# sourceURL=webpack://toxin/./src/modules/doughnut/Model.ts?");

/***/ }),

/***/ "./src/modules/doughnut/View.ts":
/*!**************************************!*\
  !*** ./src/modules/doughnut/View.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DoughnutView\": () => /* binding */ DoughnutView\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);\n/* provided dependency */ var $ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n\n\n\nvar DoughnutView = /*#__PURE__*/function () {\n  function DoughnutView() {\n    var _this = this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DoughnutView);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$body\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"canvas\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"ctx\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"doughnut\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"number\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"list\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"observers\", []);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"update\", function (options) {\n      _this.observers.forEach(function (o) {\n        return o.updateView(options);\n      });\n    });\n\n    this.$body = $(\"<div class=\\\"doughnut\\\"></div>\");\n    this.canvas = document.createElement(\"canvas\");\n    this.canvas.width = 120;\n    this.canvas.height = 120;\n    this.ctx = this.canvas.getContext(\"2d\");\n    this.doughnut = new Doughnut(this.ctx, this.update, this.canvas.width / 2);\n    this.number = new DoughnutNumber(this.ctx, this.update);\n    this.list = new DoughnutList();\n    this.$body.append(this.canvas, this.list.render);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DoughnutView, [{\n    key: \"draw\",\n    value: function draw() {\n      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n      this.doughnut.draw();\n      this.number.draw();\n    }\n  }, {\n    key: \"sub\",\n    value: function sub(o) {\n      this.observers.push(o);\n    }\n  }, {\n    key: \"unsub\",\n    value: function unsub(o) {\n      this.observers.filter(function (ob) {\n        return o !== ob;\n      });\n    }\n  }, {\n    key: \"render\",\n    get: function get() {\n      return this.$body;\n    }\n  }]);\n\n  return DoughnutView;\n}();\n\nvar Doughnut = /*#__PURE__*/function () {\n  function Doughnut(ctx, update, radius) {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Doughnut);\n\n    this.ctx = ctx;\n    this.update = update;\n    this.radius = radius;\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"items\", []);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"min\", 0.03);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Doughnut, [{\n    key: \"setItems\",\n    value: function setItems(sum) {\n      var _this2 = this;\n\n      var acc = [0];\n      var percentages = this.items.map(function (item, i) {\n        return item.value / sum;\n      });\n      percentages.forEach(function (p, i) {\n        if (p === 0 || p > _this2.min) {\n          return;\n        }\n\n        acc.push(_this2.min - p);\n        percentages[i] = _this2.min;\n      });\n      var accSum = acc.reduce(function (prev, curr) {\n        return prev + curr / (percentages.length - (acc.length - 1));\n      });\n      percentages.forEach(function (p, i) {\n        var percent = p > _this2.min ? p - accSum : p;\n\n        _this2.setItem(i, percent);\n      });\n    }\n  }, {\n    key: \"addItem\",\n    value: function addItem(index, value, title, color, sum) {\n      var newItem = new DoughnutPiece(this.ctx, value, title);\n      newItem.radius = this.radius;\n      newItem.color = color;\n      this.items[index] = newItem;\n      this.setItems(sum);\n      this.update({\n        type: \"view\"\n      });\n    }\n  }, {\n    key: \"setItem\",\n    value: function setItem(index, percentage) {\n      var item = this.items[index];\n\n      if (percentage === 0) {\n        return;\n      }\n\n      var radius = this.radius - 5;\n      var width = 4;\n      var gap = this.toRadian(1);\n      var angle = percentage * 2 * Math.PI - gap;\n      var lastAngle = typeof this.items[index - 1] === \"undefined\" ? this.toRadian(90) : this.items[index - 1].endAngle + gap;\n      var startAngle = lastAngle;\n      var endAngle = angle + lastAngle;\n      var x = this.radius;\n      var y = this.radius;\n      item.setBody(x, y, radius, startAngle, endAngle, width);\n    }\n  }, {\n    key: \"toRadian\",\n    value: function toRadian(angle) {\n      return Math.PI / 180 * angle;\n    }\n  }, {\n    key: \"draw\",\n    value: function draw() {\n      this.items.forEach(function (item) {\n        item.draw();\n      });\n    }\n  }]);\n\n  return Doughnut;\n}();\n\nvar DoughnutPiece = /*#__PURE__*/function () {\n  function DoughnutPiece(ctx, _value, _title) {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DoughnutPiece);\n\n    this.ctx = ctx;\n    this._value = _value;\n    this._title = _title;\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_x\", 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_y\", 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_radius\", 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_startAngle\", 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_endAngle\", 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_color\", \"\");\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_width\", 0);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DoughnutPiece, [{\n    key: \"setBody\",\n    value: function setBody(x, y, radius, startAngle, endAngle, width) {\n      this._x = x;\n      this._y = y;\n      this._radius = radius;\n      this._startAngle = startAngle;\n      this._endAngle = endAngle;\n      this._width = width;\n    }\n  }, {\n    key: \"draw\",\n    value: function draw() {\n      this.ctx.beginPath();\n      this.ctx.arc(this._x, this._y, this._radius, this._startAngle, this._endAngle);\n      this.ctx.strokeStyle = this._color;\n      this.ctx.lineWidth = this._width;\n      this.ctx.stroke();\n    }\n  }, {\n    key: \"value\",\n    get: function get() {\n      return this._value;\n    }\n  }, {\n    key: \"endAngle\",\n    get: function get() {\n      return this._endAngle;\n    }\n  }, {\n    key: \"radius\",\n    set: function set(r) {\n      this._radius = r;\n    }\n  }, {\n    key: \"color\",\n    set: function set(c) {\n      if (Array.isArray(c)) {\n        var gradient = this.ctx.createLinearGradient(this._radius, 0, this._radius, this._radius * 2);\n        c.forEach(function (color, i) {\n          return gradient.addColorStop(i / (color.length - 1), color);\n        });\n        this._color = gradient;\n        return;\n      }\n\n      this._color = c;\n    }\n  }]);\n\n  return DoughnutPiece;\n}();\n\nvar DoughnutNumber = /*#__PURE__*/function () {\n  function DoughnutNumber(ctx, update) {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DoughnutNumber);\n\n    this.ctx = ctx;\n    this.update = update;\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_number\", \"260\");\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_title\", \"ГОЛОСОВ\");\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_numberFont\", \"700 24px Montserrat\");\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_titleFont\", \"700 12px Montserrat\");\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_color\", \"#BC9CFF\");\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_x\", 60);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_y\", 40);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DoughnutNumber, [{\n    key: \"draw\",\n    value: function draw() {\n      this.ctx.font = this._numberFont;\n      this.ctx.fillStyle = this._color;\n      this.ctx.textBaseline = \"top\";\n      var width = this.ctx.measureText(this._number).width;\n      this.ctx.fillText(this._number, this._x - width / 2, this._y);\n      this.ctx.font = this._titleFont;\n      var width2 = this.ctx.measureText(this._title).width;\n      this.ctx.fillText(this._title, this._x - width2 / 2, this._y + 30, 120);\n    }\n  }, {\n    key: \"number\",\n    set: function set(number) {\n      this._number = number;\n      this.update({\n        type: \"view\"\n      });\n    }\n  }, {\n    key: \"title\",\n    set: function set(title) {\n      this._title = title.toUpperCase();\n      this.update({\n        type: \"view\"\n      });\n    }\n  }]);\n\n  return DoughnutNumber;\n}();\n\nvar DoughnutList = /*#__PURE__*/function () {\n  function DoughnutList() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DoughnutList);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$body\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"_items\", []);\n\n    this.$body = $(\"<ul class=\\\"doughnut__list\\\"></ul>\");\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DoughnutList, [{\n    key: \"addItem\",\n    value: function addItem(title, color) {\n      this._items.push(new DoughnutListItem(title, color));\n\n      this.$body.append(this._items.map(function (item) {\n        return item.render;\n      }));\n    }\n  }, {\n    key: \"render\",\n    get: function get() {\n      return this.$body;\n    }\n  }]);\n\n  return DoughnutList;\n}();\n\nvar DoughnutListItem = /*#__PURE__*/function () {\n  function DoughnutListItem(_title, _color) {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DoughnutListItem);\n\n    this._title = _title;\n    this._color = _color;\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$body\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$color\", void 0);\n\n    this.$body = $(\"<li class=\\\"doughnut__item\\\"></li>\");\n    this.$body.text(this._title);\n    this.$color = $(\"<div class=\\\"doughnut__color\\\"></div>\");\n    this.$color.css(\"background\", typeof this._color === \"string\" ? this._color : \"linear-gradient(\".concat(this._color.join(), \")\"));\n    this.$body.prepend(this.$color);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DoughnutListItem, [{\n    key: \"render\",\n    get: function get() {\n      return this.$body;\n    }\n  }]);\n\n  return DoughnutListItem;\n}();\n\n//# sourceURL=webpack://toxin/./src/modules/doughnut/View.ts?");

/***/ }),

/***/ "./src/modules/doughnut/doughnut.ts":
/*!******************************************!*\
  !*** ./src/modules/doughnut/doughnut.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controller */ \"./src/modules/doughnut/Controller.ts\");\n/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Model */ \"./src/modules/doughnut/Model.ts\");\n/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./View */ \"./src/modules/doughnut/View.ts\");\n/* harmony import */ var _doughnut_sass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./doughnut.sass */ \"./src/modules/doughnut/doughnut.sass\");\n/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n\n\n\n\n\n(function ($) {\n  $.fn.doughnut = function (items) {\n    var view = new _View__WEBPACK_IMPORTED_MODULE_2__.DoughnutView();\n    var model = new _Model__WEBPACK_IMPORTED_MODULE_1__.DoughnutModel();\n    var controller = new _Controller__WEBPACK_IMPORTED_MODULE_0__.DoughnutController(model, view, items);\n    this.append(view.render);\n    return this;\n  };\n})(jQuery);\n\n//# sourceURL=webpack://toxin/./src/modules/doughnut/doughnut.ts?");

/***/ }),

/***/ "./src/modules/nav/nav.ts":
/*!********************************!*\
  !*** ./src/modules/nav/nav.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n;\n\n(function ($) {\n  var modal = $(\".nav-modal\");\n  var items = $(\".nav__items\");\n  var burger = $(\".nav__burger\");\n  var burgerLines = $(\".nav__burger-line\");\n  burger.on(\"click\", toggleNav);\n  modal.on(\"click\", toggleNav);\n\n  function toggleNav() {\n    modal.toggleClass(\"nav-modal--active\");\n    items.toggleClass(\"nav__items--active\");\n    burgerLines.each(function () {\n      $(this).toggleClass(\"nav__burger-line--active\");\n    });\n  }\n\n  var listItems = $(\".nav__item--list\");\n  listItems.each(function (i, listItem) {\n    var li = $(listItem);\n    var list = li.find(\".nav__list\");\n\n    var onLiClick = function onLiClick(e) {\n      list.toggleClass(\"nav__list--open\");\n    };\n\n    var onDocumentClick = function onDocumentClick(e) {\n      if (!(e.target instanceof HTMLElement)) {\n        return;\n      }\n\n      if (li.has(e.target).length > 0) {\n        return;\n      }\n\n      var open = list.hasClass(\"nav__list--open\");\n      open && list.removeClass(\"nav__list--open\");\n    };\n\n    li.on(\"click\", onLiClick);\n    $(document).on(\"click\", onDocumentClick);\n  });\n})(jQuery);\n\n//# sourceURL=webpack://toxin/./src/modules/nav/nav.ts?");

/***/ }),

/***/ "./src/pages/details/index.ts":
/*!************************************!*\
  !*** ./src/pages/details/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.sass */ \"./src/pages/details/index.sass\");\n/* harmony import */ var _modules_doughnut_doughnut__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @modules/doughnut/doughnut */ \"./src/modules/doughnut/doughnut.ts\");\n/* harmony import */ var _modules_nav_nav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @modules/nav/nav */ \"./src/modules/nav/nav.ts\");\n/* harmony import */ var _modules_nav_nav__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_nav_nav__WEBPACK_IMPORTED_MODULE_2__);\n/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n\n\n\n\n(function ($, window, document) {\n  $(function () {\n    var items = [{\n      value: 130,\n      color: [\"#FFBA9C\", \"#FFE39C\"],\n      title: \"Великолепно\"\n    }, {\n      value: 65,\n      color: [\"#66D2EA\", \"#6FCF97\"],\n      title: \"Хорошо\"\n    }, {\n      value: 65,\n      color: [\"#8BA4F9\", \"#BC9CFF\"],\n      title: \"Удовлетворительно\"\n    }, {\n      value: 0,\n      color: [\"#3D4975\", \"#909090\"],\n      title: \"Разочарован\"\n    }];\n    $(\".details__doughnut\").doughnut(items);\n  });\n})(jQuery, window, document);\n\n//# sourceURL=webpack://toxin/./src/pages/details/index.ts?");

/***/ }),

/***/ "./src/modules/doughnut/doughnut.sass":
/*!********************************************!*\
  !*** ./src/modules/doughnut/doughnut.sass ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://toxin/./src/modules/doughnut/doughnut.sass?");

/***/ }),

/***/ "./src/pages/details/index.sass":
/*!**************************************!*\
  !*** ./src/pages/details/index.sass ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://toxin/./src/pages/details/index.sass?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {}
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"details": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/pages/details/index.ts","vendors-node_modules_jquery_dist_jquery_js"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktoxin"] = self["webpackChunktoxin"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;