!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";var r=n(2),i=function(t){return t&&t.__esModule?t:{default:t}}(r);n(7),n(8);var o=document.querySelectorAll("[data-sm-slider]"),u=[];Array.prototype.forEach.call(o,function(t){var e=JSON.parse(t.getAttribute("data-sm-slider"));u.push(new i.default(t,e))})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=n(3),a=r(s),l=n(5),c=r(l),f=n(6),d=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(f),h=function(){function t(e,n){var r=this;if(i(this,t),this.options={},this.$ref=null,this.$slides=null,this.$arrowLeft=null,this.$arrowRight=null,this.initialState={currentSlide:0,slideWidth:0},this.store=null,this.handleSlideNext=function(){r.store.setState(function(t){return{currentSlide:++t.currentSlide}})},this.handleSlidePrev=function(){r.store.setState(function(t){return{currentSlide:--t.currentSlide}})},this.handleWindowResize=function(){r.store.setState({slideWidth:r.getInnerWidth()})},this.handleChange=function(t){var e=r.store.getState(),n=e.currentSlide;e.slideWidth!==t.slideWidth&&r.resize(),n!==t.currentSlide&&r.slide()},this.resize=function(){Array.prototype.forEach.call(r.$slides.children,function(t){t.style.width=r.store.getState().slideWidth+"px"}),r.slide(!1)},this.slide=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=r.store.getState(),n=e.currentSlide,i=e.slideWidth;t?r.$slides.classList.add("animatable"):r.$slides.classList.remove("animatable"),r.$slides.style.transform="translateX("+-i*n+"px)"},this.$ref=e,this.options=o({},this.options,n),this.$slides=e.querySelector(".slides"),!this.$slides.children.length)throw d.NO_CHILDREN;this.$arrowLeft=e.querySelector(".arrow-left"),this.$arrowLeft&&this.$arrowLeft.addEventListener("click",this.handleSlidePrev),this.$arrowRight=e.querySelector(".arrow-right"),this.$arrowRight&&this.$arrowRight.addEventListener("click",this.handleSlideNext);var u=o({},this.initialState,{slideWidth:this.getInnerWidth()});this.store=new c.default(u,this.handleChange),this.resize(),this.handleWindowResize=(0,a.default)(this.handleWindowResize,200),window.addEventListener("resize",this.handleWindowResize)}return u(t,[{key:"getInnerWidth",value:function(){return this.$ref.getBoundingClientRect().width-(this.$arrowLeft.getBoundingClientRect().width+this.$arrowRight.getBoundingClientRect().width)}}]),t}();e.default=h},function(t,e,n){"use strict";(function(e){function n(t,e,n){function i(e){var n=p,r=v;return p=v=void 0,$=e,w=t.apply(r,n)}function o(t){return $=t,m=setTimeout(c,e),x?i(t):w}function s(t){var n=t-S,r=t-$,i=e-n;return W?O(i,b-r):i}function l(t){var n=t-S,r=t-$;return void 0===S||n>=e||n<0||W&&r>=b}function c(){var t=j();if(l(t))return f(t);m=setTimeout(c,s(t))}function f(t){return m=void 0,_&&p?i(t):(p=v=void 0,w)}function d(){void 0!==m&&clearTimeout(m),$=0,p=S=v=m=void 0}function h(){return void 0===m?w:f(j())}function y(){var t=j(),n=l(t);if(p=arguments,v=this,S=t,n){if(void 0===m)return o(S);if(W)return m=setTimeout(c,e),i(S)}return void 0===m&&(m=setTimeout(c,e)),w}var p,v,b,w,m,S,$=0,x=!1,W=!1,_=!0;if("function"!=typeof t)throw new TypeError(a);return e=u(e)||0,r(n)&&(x=!!n.leading,W="maxWait"in n,b=W?g(u(n.maxWait)||0,e):b,_="trailing"in n?!!n.trailing:_),y.cancel=d,y.flush=h,y}function r(t){var e=void 0===t?"undefined":s(t);return!!t&&("object"==e||"function"==e)}function i(t){return!!t&&"object"==(void 0===t?"undefined":s(t))}function o(t){return"symbol"==(void 0===t?"undefined":s(t))||i(t)&&S.call(t)==c}function u(t){if("number"==typeof t)return t;if(o(t))return l;if(r(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=r(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(f,"");var n=h.test(t);return n||y.test(t)?p(t.slice(2),n?2:8):d.test(t)?l:+t}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a="Expected a function",l=NaN,c="[object Symbol]",f=/^\s+|\s+$/g,d=/^[-+]0x[0-9a-f]+$/i,h=/^0b[01]+$/i,y=/^0o[0-7]+$/i,p=parseInt,v="object"==(void 0===e?"undefined":s(e))&&e&&e.Object===Object&&e,b="object"==("undefined"==typeof self?"undefined":s(self))&&self&&self.Object===Object&&self,w=v||b||Function("return this")(),m=Object.prototype,S=m.toString,g=Math.max,O=Math.min,j=function(){return w.Date.now()};t.exports=n}).call(e,n(4))},function(t,e,n){"use strict";var r,i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(t){"object"===("undefined"==typeof window?"undefined":i(window))&&(r=window)}t.exports=r},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=function(){function t(e,n){r(this,t),this.state={},this.handler=function(){},this.state=e,this.handler=n}return u(t,[{key:"getState",value:function(){return this.state}},{key:"setState",value:function(t){var e=o({},this.state);switch(void 0===t?"undefined":i(t)){case"function":this.state=o({},this.state,t(this.state));break;case"object":this.state=o({},this.state,t);break;default:throw new Error}this.handler(e)}}]),t}();e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.NO_CHILDREN=function(t){return new(arguments.length>1&&void 0!==arguments[1]?arguments[1]:Error)("[smSlider] "+t)}("Slider needs to contain children to be initialized.")},function(t,e){},function(t,e,n){t.exports=n.p+"assets/arrow.svg"}]);
//# sourceMappingURL=sm-slider.js.map