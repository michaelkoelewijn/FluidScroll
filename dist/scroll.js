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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scroll.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scroll.js":
/*!***********************!*\
  !*** ./src/scroll.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FluidScroll; });\n/*\n    Fluid scrolling based on stackoverflow Manuel Otto's answer\n    https://stackoverflow.com/a/47206289\n    Transformed to class by Michael Koelewijn @ pakt.digital\n*/\n\nclass FluidScroll {\n    \n    constructor(options = {}) {\n        this.target = this.getDocument()\n        this.speed = options.speed || 60\n        this.smoothing = options.smoothing || 12\n        this.scroll = this.scroll.bind(this)\n        this.update = this.update.bind(this)\n    }\n\n    init() {\n        this.moving = false\n        this.pos = this.target.scrollTop\n        this.frame = this.getTarget()\n        this.target.addEventListener('mousewheel', this.scroll, { passive: false })\n\t    this.target.addEventListener('DOMMouseScroll', this.scroll, { passive: false })\n    }\n\n    destroy() {\n        this.target.removeEventListener('mousewheel', this.scroll)\n        this.target.removeEventListener('DOMMouseScroll', this.scroll)\n        cancelAnimationFrame(this.raf)\n    }\n\n    scroll(e) {\n        e.preventDefault(); // disable default scrolling\n        var delta = normalizeWheelDelta(e)\n        this.pos += -delta * this.speed\n        this.pos = Math.max(0, Math.min(this.pos, this.target.scrollHeight - this.frame.clientHeight)) // limit scrolling\n        if (!this.moving) { \n            this.update() \n        }\n    }\n\n    update() {\n        var delta = (this.pos - this.target.scrollTop) / this.smoothing\n        this.target.scrollTop += delta\n        this.moving = true\n    \n        if (Math.abs(delta) > 0.5) {\n            this.raf = requestAnimationFrame(this.update)\n        } else {\n            this.moving = false\n        }\n    }\n\n    getDocument() {\n        return (document.scrollingElement \n            || document.documentElement \n            || document.body.parentNode \n            || document.body)\n    }\n\n    getTarget() {\n        return this.target === document.body \n                && document.documentElement \n                ? document.documentElement \n                : this.target\n    }\n\n}\n\nfunction normalizeWheelDelta(e){\n    if(e.detail){\n        if(e.wheelDelta)\n            return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera\n        else\n            return -e.detail/3 // Firefox\n    }else\n        return e.wheelDelta/120 // IE,Safari,Chrome\n}\n\n//# sourceURL=webpack:///./src/scroll.js?");

/***/ })

/******/ });