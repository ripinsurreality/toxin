/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunktoxin"] = self["webpackChunktoxin"] || []).push([["src_modules_dropdown_dropdown_ts"],{

/***/ "./src/modules/dropdown/dropdown.ts":
/*!******************************************!*\
  !*** ./src/modules/dropdown/dropdown.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dropdownView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dropdownView */ \"./src/modules/dropdown/dropdownView.ts\");\n/* harmony import */ var _dropdownModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropdownModel */ \"./src/modules/dropdown/dropdownModel.ts\");\n/* harmony import */ var _dropdownController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dropdownController */ \"./src/modules/dropdown/dropdownController.ts\");\n/* harmony import */ var _dropdown_sass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropdown.sass */ \"./src/modules/dropdown/dropdown.sass\");\n/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n\n\n\n\n\n(function ($) {\n  $.fn.dropdown = function (type, values) {\n    var model = new _dropdownModel__WEBPACK_IMPORTED_MODULE_1__.DropdownModel();\n    var view = new _dropdownView__WEBPACK_IMPORTED_MODULE_0__.DropdownView();\n    var controller = new _dropdownController__WEBPACK_IMPORTED_MODULE_2__.DropdownController({\n      model: model,\n      view: view,\n      type: type,\n      values: values\n    });\n    this.append(controller.render);\n    return this;\n  };\n})(jQuery);\n\n//# sourceURL=webpack://toxin/./src/modules/dropdown/dropdown.ts?");

/***/ }),

/***/ "./src/modules/dropdown/dropdownController.ts":
/*!****************************************************!*\
  !*** ./src/modules/dropdown/dropdownController.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DropdownController\": () => /* binding */ DropdownController\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar DropdownController = /*#__PURE__*/function () {\n  function DropdownController(_ref) {\n    var view = _ref.view,\n        model = _ref.model,\n        type = _ref.type,\n        values = _ref.values;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DropdownController);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"view\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"model\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"comfortDefault\", \"Какие удобства\");\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"comfort\", [[\"Спальня\", \"Спальни\", \"Спален\"], [\"Кровать\", \"Кровати\", \"Кроватей\"], [\"Ванная комната\", \"Ванные комнаты\", \"Ванных комнат\"]]);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"guestsDefault\", \"Сколько гостей\");\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"guestsCollectiveTitle\", [\"гость\", \"гостя\", \"гостей\"]);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"guests\", [\"Взрослые\", \"Дети\", \"Младенцы\"]);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"type\", void 0);\n\n    this.view = view;\n    this.model = model;\n    this.type = type;\n    this.view.sub(this);\n    this.model.sub(this);\n    this.initModel(values);\n    this.initView();\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DropdownController, [{\n    key: \"initModel\",\n    value: function initModel(values) {\n      var _this = this;\n\n      var setModelItems = function setModelItems(items) {\n        items.forEach(function (item, i) {\n          var newItem = values && values[i] ? {\n            title: item,\n            value: values[i]\n          } : item;\n\n          _this.model.addItem(newItem);\n        });\n      };\n\n      if (this.type === \"guests\") {\n        this.model.defaultItem = this.guestsDefault;\n        this.model.collectiveTitle = this.guestsCollectiveTitle;\n        setModelItems(this.guests);\n        return;\n      }\n\n      this.model.defaultItem = this.comfortDefault;\n      setModelItems(this.comfort);\n    }\n  }, {\n    key: \"initView\",\n    value: function initView() {\n      var _this2 = this;\n\n      this.view.label = this.model.numberOfItems;\n      this.model.items.forEach(function (item, i) {\n        _this2.view.addItem();\n\n        _this2.view.bottom.items[i].value = item.value;\n        _this2.view.bottom.items[i].title = item.getTitle();\n      });\n      this.type === \"guests\" && this.view.bottom.initControl();\n    }\n  }, {\n    key: \"updateView\",\n    value: function updateView(options) {\n      if (options.type === \"dispatchValue\") {\n        this.model.items[options.index].dispatchValue(options.payload);\n      }\n    }\n  }, {\n    key: \"updateModel\",\n    value: function updateModel(options) {\n      if (options.type === \"dispatchValue\") {\n        this.view.bottom.items[options.index].value = options.value;\n        this.view.bottom.items[options.index].title = options.title;\n        this.view.label = this.model.numberOfItems;\n      }\n    }\n  }, {\n    key: \"render\",\n    get: function get() {\n      return this.view.render;\n    }\n  }]);\n\n  return DropdownController;\n}();\n\n//# sourceURL=webpack://toxin/./src/modules/dropdown/dropdownController.ts?");

/***/ }),

/***/ "./src/modules/dropdown/dropdownModel.ts":
/*!***********************************************!*\
  !*** ./src/modules/dropdown/dropdownModel.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DropdownModel\": () => /* binding */ DropdownModel,\n/* harmony export */   \"Item\": () => /* binding */ Item\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar DropdownModel = /*#__PURE__*/function () {\n  function DropdownModel() {\n    var _this = this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DropdownModel);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"defaultItem\", \"\");\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"collectiveTitle\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"items\", []);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"observers\", []);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"update\", function (options) {\n      _this.observers.forEach(function (o) {\n        return o.updateModel(options);\n      });\n    });\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DropdownModel, [{\n    key: \"addItem\",\n    value: function addItem(item) {\n      var newItem = new Item(item, this.items.length, this.update, this.getWordForm);\n      this.items.push(newItem);\n    }\n  }, {\n    key: \"getCollectiveTitle\",\n    value: function getCollectiveTitle(value) {\n      return this.collectiveTitle && this.getWordForm(this.collectiveTitle, value);\n    }\n  }, {\n    key: \"getWordForm\",\n    value: function getWordForm(titles, value) {\n      var cases = [2, 0, 1, 1, 1, 2];\n      return titles[value % 100 > 4 && value % 100 < 20 ? 2 : cases[value % 10 < 5 ? value % 10 : 5]];\n    }\n  }, {\n    key: \"sub\",\n    value: function sub(o) {\n      this.observers.push(o);\n    }\n  }, {\n    key: \"unsub\",\n    value: function unsub(o) {\n      this.observers.filter(function (ob) {\n        return o !== ob;\n      });\n    }\n  }, {\n    key: \"numberOfItems\",\n    get: function get() {\n      if (this.collectiveTitle) {\n        var sum = this.items.map(function (item) {\n          return item.value;\n        }).reduce(function (prev, curr) {\n          return prev + curr;\n        });\n        return sum > 0 ? \"\".concat(sum, \" \").concat(this.getCollectiveTitle(sum)) : this.defaultItem;\n      }\n\n      return this.items.map(function (item) {\n        if (item.value === 0) {\n          return \"\";\n        }\n\n        return \"\".concat(item.value, \" \").concat(item.getTitle());\n      }).filter(function (item) {\n        if (item) return item;\n      }).join(\", \") || this.defaultItem;\n    }\n  }]);\n\n  return DropdownModel;\n}();\nvar Item = /*#__PURE__*/function () {\n  function Item(item, index, update, getWordForm) {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Item);\n\n    this.index = index;\n    this.update = update;\n    this.getWordForm = getWordForm;\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"value\", 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"title\", \"\");\n\n    this.init(item);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Item, [{\n    key: \"init\",\n    value: function init(item) {\n      if (typeof item === \"string\" || Array.isArray(item)) {\n        this.setTitle(item);\n        return;\n      }\n\n      this.value = item.value < 0 ? 0 : item.value;\n      this.setTitle(item.title);\n    }\n  }, {\n    key: \"setTitle\",\n    value: function setTitle(t) {\n      if (typeof t === \"string\") {\n        this.title = t.toLowerCase();\n        return;\n      }\n\n      this.title = [t[0].toLowerCase(), t[1].toLowerCase(), t[2].toLowerCase()];\n    }\n  }, {\n    key: \"dispatchValue\",\n    value: function dispatchValue(type) {\n      var newValue;\n\n      switch (type) {\n        case \"+\":\n          {\n            newValue = this.value + 1;\n            break;\n          }\n\n        case \"-\":\n          {\n            newValue = this.value;\n\n            if (this.value > 0) {\n              newValue = this.value - 1;\n            }\n\n            break;\n          }\n\n        default:\n          {\n            newValue = 0;\n            break;\n          }\n      }\n\n      if (newValue !== this.value) {\n        this.value = newValue;\n        this.update({\n          type: \"dispatchValue\",\n          value: this.value,\n          index: this.index,\n          title: this.getTitle()\n        });\n      }\n    }\n  }, {\n    key: \"getTitle\",\n    value: function getTitle(plural) {\n      if (typeof this.title === \"string\") {\n        return this.title;\n      }\n\n      if (plural) {\n        return this.title[1];\n      }\n\n      return this.getWordForm(this.title, this.value);\n    }\n  }]);\n\n  return Item;\n}();\n\n//# sourceURL=webpack://toxin/./src/modules/dropdown/dropdownModel.ts?");

/***/ }),

/***/ "./src/modules/dropdown/dropdownView.ts":
/*!**********************************************!*\
  !*** ./src/modules/dropdown/dropdownView.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DropdownView\": () => /* binding */ DropdownView\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);\n/* provided dependency */ var $ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n\n\n\nvar DropdownView = /*#__PURE__*/function () {\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DropdownView, [{\n    key: \"label\",\n    set: function set(t) {\n      this.$label.text(t);\n    }\n  }]);\n\n  function DropdownView() {\n    var _this = this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DropdownView);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$dropdown\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$input\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$label\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$arrow\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"bottom\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"switchDropdown\", function (on) {\n      switch (on) {\n        case true:\n          {\n            !_this.$dropdown.hasClass(\"dropdown--open\") && _this.$dropdown.addClass(\"dropdown--open\");\n            break;\n          }\n\n        case false:\n          {\n            _this.$dropdown.hasClass(\"dropdown--open\") && _this.$dropdown.removeClass(\"dropdown--open\");\n            break;\n          }\n\n        default:\n          {\n            _this.$dropdown.toggleClass(\"dropdown--open\");\n\n            break;\n          }\n      }\n\n      _this.bottom.switchItemsTabIndex(on);\n    });\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"observers\", []);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"update\", function (options) {\n      _this.observers.forEach(function (o) {\n        return o.updateView(options);\n      });\n    });\n\n    /* INITS */\n    this.$dropdown = $(\"<div class='dropdown'></div>\").attr(\"tabindex\", 0);\n    this.$input = $(\"<div class='dropdown__input'></div>\");\n    this.$label = $(\"<div class='dropdown__label'></div>\");\n    this.$arrow = $(\"<div class='dropdown__arrow'></div>\");\n    this.bottom = new DropdownBottom(this.update, this.switchDropdown);\n    /* EVENTS */\n\n    this.$dropdown.on({\n      click: function click(e) {\n        if (e.target.contains(_this.$label.get(0)) || e.target.contains(_this.$arrow.get(0))) {\n          _this.switchDropdown();\n        }\n      },\n      focusout: function focusout(e) {\n        if (e.relatedTarget instanceof HTMLElement && !_this.$dropdown.get(0).contains(e.relatedTarget) || !e.relatedTarget) {\n          _this.switchDropdown(false);\n        }\n      },\n      keydown: function keydown(e) {\n        if (e.code === \"Space\" && e.target instanceof HTMLElement && e.target === _this.$dropdown.get(0)) {\n          e.preventDefault();\n\n          _this.switchDropdown();\n        }\n      }\n    });\n    /* APPENDS */\n\n    this.$dropdown.append(this.$input.append(this.$label, this.$arrow), this.bottom.render);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DropdownView, [{\n    key: \"addItem\",\n    value: function addItem() {\n      this.bottom.addItem();\n    }\n  }, {\n    key: \"sub\",\n    value: function sub(o) {\n      this.observers.push(o);\n    }\n  }, {\n    key: \"unsub\",\n    value: function unsub(o) {\n      this.observers.filter(function (ob) {\n        return o !== ob;\n      });\n    }\n  }, {\n    key: \"render\",\n    get: function get() {\n      return this.$dropdown;\n    }\n  }]);\n\n  return DropdownView;\n}();\n\nvar DropdownBottom = /*#__PURE__*/function () {\n  function DropdownBottom(update, switchDropdown) {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DropdownBottom);\n\n    this.update = update;\n    this.switchDropdown = switchDropdown;\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"items\", []);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$body\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$ul\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$control\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$clear\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$accept\", void 0);\n\n    /* INITS */\n    this.$body = $(\"<div class='dropdown__bottom'></div>\");\n    this.$ul = $(\"<ul class='dropdown__options'></ul>\");\n    /* APPENDS */\n\n    this.$body.append(this.$ul);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DropdownBottom, [{\n    key: \"initControl\",\n    value: function initControl() {\n      var _this2 = this;\n\n      this.$control = $(\"<div class='dropdown__control'></div>\");\n      this.$clear = $(\"<h3 class='dropdown__clear'>Очистить</h3>\");\n      this.$accept = $(\"<h3 class='dropdown__accept'>Применить</h3>\");\n      this.$clear.on({\n        click: function click(e) {\n          _this2.resetItems();\n        }\n      });\n      this.$accept.on({\n        click: function click() {\n          _this2.switchDropdown(false);\n        }\n      });\n      this.$body.append(this.$control.append(this.$clear, this.$accept));\n    }\n  }, {\n    key: \"addItem\",\n    value: function addItem() {\n      var newItem = new DropdownItem(this.update, this.items.length);\n      this.items.push(newItem);\n      this.$ul.append(newItem.render);\n    }\n  }, {\n    key: \"resetItems\",\n    value: function resetItems() {\n      this.items.forEach(function (item) {\n        item.dispatchValue();\n      });\n    }\n  }, {\n    key: \"switchItemsTabIndex\",\n    value: function switchItemsTabIndex(on) {\n      this.items.forEach(function (item) {\n        item.switchTabIndex(on);\n      });\n    }\n  }, {\n    key: \"render\",\n    get: function get() {\n      return this.$body;\n    }\n  }]);\n\n  return DropdownBottom;\n}();\n\nvar DropdownItem = /*#__PURE__*/function () {\n  function DropdownItem(update, index) {\n    var _this3 = this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DropdownItem);\n\n    this.update = update;\n    this.index = index;\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$body\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$title\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$control\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$btnMinus\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$value\", void 0);\n\n    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, \"$btnPlus\", void 0);\n\n    /* INITS */\n    this.$body = $(\"<li class='dropdown-item'></li>\");\n    this.$title = $(\"<h3 class='dropdown-item__title'></h3>\");\n    this.$control = $(\"<div class='dropdown-item__control'></div>\");\n    this.$btnMinus = $(\"<div class='dropdown-item__button'></div>\").text(\"-\");\n    this.$value = $(\"<h3 class='dropdown-item__value'></h3>\");\n    this.$btnPlus = $(\"<div class='dropdown-item__button'></div>\").text(\"+\");\n    /* EVENTS */\n\n    this.$body.on({\n      wheel: function wheel(e) {\n        e.preventDefault();\n        var oE = e.originalEvent;\n        var direction = -Math.sign(oE.deltaY) > 0 ? \"+\" : \"-\";\n\n        _this3.dispatchValue(direction);\n      },\n      keydown: function keydown(e) {\n        if (e.key === \"+\" || e.key === \"-\") {\n          _this3.dispatchValue(e.key);\n        }\n      }\n    });\n    this.$btnMinus.on({\n      click: function click() {\n        _this3.dispatchValue(\"-\");\n      },\n      focus: function focus(e) {\n        e.preventDefault();\n      }\n    });\n    this.$btnPlus.on({\n      click: function click() {\n        _this3.dispatchValue(\"+\");\n      },\n      focus: function focus(e) {\n        e.preventDefault();\n      }\n    });\n    /* APPENDS */\n\n    this.$body.append(this.$title, this.$control.append(this.$btnMinus, this.$value, this.$btnPlus));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DropdownItem, [{\n    key: \"dispatchValue\",\n    value: function dispatchValue(type) {\n      this.update({\n        type: \"dispatchValue\",\n        payload: type,\n        index: this.index\n      });\n    }\n  }, {\n    key: \"switchTabIndex\",\n    value: function switchTabIndex(on) {\n      switch (on) {\n        case true:\n          {\n            this.$body.attr(\"tabindex\", 0);\n            break;\n          }\n\n        case false:\n          {\n            this.$body.removeAttr(\"tabindex\");\n            break;\n          }\n\n        default:\n          {\n            this.$body[0].hasAttribute(\"tabindex\") ? this.$body.removeAttr(\"tabindex\") : this.$body.attr(\"tabindex\", 0);\n            break;\n          }\n      }\n    }\n  }, {\n    key: \"value\",\n    get: function get() {\n      return parseInt(this.$value.text(), 10);\n    },\n    set: function set(val) {\n      this.$value.text(val);\n    }\n  }, {\n    key: \"title\",\n    set: function set(t) {\n      this.$title.text(t);\n    }\n  }, {\n    key: \"render\",\n    get: function get() {\n      return this.$body;\n    }\n  }]);\n\n  return DropdownItem;\n}();\n\n//# sourceURL=webpack://toxin/./src/modules/dropdown/dropdownView.ts?");

/***/ }),

/***/ "./src/modules/dropdown/dropdown.sass":
/*!********************************************!*\
  !*** ./src/modules/dropdown/dropdown.sass ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://toxin/./src/modules/dropdown/dropdown.sass?");

/***/ })

}]);