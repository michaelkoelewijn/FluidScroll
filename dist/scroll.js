!function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e),r.d(e,"default",(function(){return n}));class n{constructor(t={}){this.target=this.getDocument(),this.speed=t.speed||60,this.smoothing=t.smoothing||12,this.scroll=this.scroll.bind(this),this.update=this.update.bind(this)}init(){this.moving=!1,this.pos=this.target.scrollTop,this.frame=this.getTarget(),this.target.addEventListener("mousewheel",this.scroll,{passive:!1}),this.target.addEventListener("DOMMouseScroll",this.scroll,{passive:!1})}destroy(){this.target.removeEventListener("mousewheel",this.scroll),this.target.removeEventListener("DOMMouseScroll",this.scroll),cancelAnimationFrame(this.raf)}scroll(t){t.preventDefault();var e=function(t){return t.detail?t.wheelDelta?t.wheelDelta/t.detail/40*(t.detail>0?1:-1):-t.detail/3:t.wheelDelta/120}(t);this.pos+=-e*this.speed,this.pos=Math.max(0,Math.min(this.pos,this.target.scrollHeight-this.frame.clientHeight)),this.moving||this.update()}update(){var t=(this.pos-this.target.scrollTop)/this.smoothing;this.target.scrollTop+=t,this.moving=!0,Math.abs(t)>.5?this.raf=requestAnimationFrame(this.update):this.moving=!1}getDocument(){return document.scrollingElement||document.documentElement||document.body.parentNode||document.body}getTarget(){return this.target===document.body&&document.documentElement?document.documentElement:this.target}}}]);