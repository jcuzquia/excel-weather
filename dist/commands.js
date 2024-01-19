/*! For license information please see commands.js.LICENSE.txt */
!function(){var t={36334:function(t,e,n){"use strict";var o=n(82702).Promise,i=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=o))((function(o,i){function s(t){try{u(r.next(t))}catch(t){i(t)}}function c(t){try{u(r.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,c)}u((r=r.apply(t,e||[])).next())}))},s=this&&this.__generator||function(t,e){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(c){return function(u){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(s=0)),s;)try{if(n=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return s.label++,{value:c[1],done:!1};case 5:s.label++,r=c[1],c=[0];continue;case 7:c=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){s=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){s.label=c[1];break}if(6===c[0]&&s.label<o[1]){s.label=o[1],o=c;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(c);break}o[2]&&s.ops.pop(),s.trys.pop();continue}c=e.call(t,s)}catch(t){c=[6,t],r=0}finally{n=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,u])}}};Object.defineProperty(e,"__esModule",{value:!0}),e.writeWeatherDataToOfficeDocument=e.changeCellColor=void 0,Office.onReady((function(){})),e.changeCellColor=function(){return i(void 0,void 0,void 0,(function(){var t;return s(this,(function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),[4,Excel.run((function(t){return i(void 0,void 0,void 0,(function(){var e;return s(this,(function(n){switch(n.label){case 0:return(e=t.workbook.getSelectedRange()).load("address"),e.format.fill.color="yellow",[4,t.sync()];case 1:return n.sent(),console.log("The range address was ".concat(e.address,".")),[2]}}))}))}))];case 1:return e.sent(),[3,3];case 2:return t=e.sent(),console.error(t),[3,3];case 3:return[2]}}))}))},("undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==n.g?n.g:void 0).action=function(t){var e={type:Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,message:"Performed action.",icon:"Icon.80x80",persistent:!0};Office.context.mailbox.item.notificationMessages.replaceAsync("action",e),t.completed()},e.writeWeatherDataToOfficeDocument=function(t,e){return Excel.run((function(n){return i(this,void 0,void 0,(function(){var r,o,i,c,u,a;return s(this,(function(s){switch(s.label){case 0:for(r=n.workbook,o=r.worksheets.add(e),i=t.split("\n"),c=0;c<i.length;c++)for(u=i[c].split(","),a=0;a<u.length;a++)o.getCell(c,a).values=[[u[a]]];return o.activate(),o.getRange("A1").select(),[4,n.sync()];case 1:return[2,s.sent()]}}))}))}))},function(){var t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(t){var n=void 0!==r?r:e;if(n)if("function"!=typeof n){for(var o in n)if(Object.prototype.hasOwnProperty.call(n,o)){var i=void 0;try{i=n[o]}catch(t){continue}t.register(i,o,"D:\\Documents\\Programming\\ee-toolkit\\ee-toolkit\\src\\commands\\commands.ts")}}else t.register(n,"module.exports","D:\\Documents\\Programming\\ee-toolkit\\ee-toolkit\\src\\commands\\commands.ts")}}()},82702:function(t,e,n){t.exports=function(){"use strict";function t(t){return"function"==typeof t}var e=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},r=0,o=void 0,i=void 0,s=function(t,e){v[r]=t,v[r+1]=e,2===(r+=2)&&(i?i(d):w())};var c="undefined"!=typeof window?window:void 0,u=c||{},a=u.MutationObserver||u.WebKitMutationObserver,l="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),f="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function h(){var t=setTimeout;return function(){return t(d,1)}}var v=new Array(1e3);function d(){for(var t=0;t<r;t+=2)(0,v[t])(v[t+1]),v[t]=void 0,v[t+1]=void 0;r=0}var p,y,_,m,w=void 0;function b(t,e){var n=this,r=new this.constructor(A);void 0===r[x]&&I(r);var o=n._state;if(o){var i=arguments[o-1];s((function(){return F(o,r,i,n._result)}))}else C(n,r,t,e);return r}function g(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var e=new this(A);return E(e,t),e}w=l?function(){return process.nextTick(d)}:a?(y=0,_=new a(d),m=document.createTextNode(""),_.observe(m,{characterData:!0}),function(){m.data=y=++y%2}):f?((p=new MessageChannel).port1.onmessage=d,function(){return p.port2.postMessage(0)}):void 0===c?function(){try{var t=Function("return this")().require("vertx");return void 0!==(o=t.runOnLoop||t.runOnContext)?function(){o(d)}:h()}catch(t){return h()}}():h();var x=Math.random().toString(36).substring(2);function A(){}var k=void 0,T=1,j=2;function O(e,n,r){n.constructor===e.constructor&&r===b&&n.constructor.resolve===g?function(t,e){e._state===T?M(t,e._result):e._state===j?P(t,e._result):C(e,void 0,(function(e){return E(t,e)}),(function(e){return P(t,e)}))}(e,n):void 0===r?M(e,n):t(r)?function(t,e,n){s((function(t){var r=!1,o=function(t,e,n,r){try{t.call(e,n,r)}catch(t){return t}}(n,e,(function(n){r||(r=!0,e!==n?E(t,n):M(t,n))}),(function(e){r||(r=!0,P(t,e))}),t._label);!r&&o&&(r=!0,P(t,o))}),t)}(e,n,r):M(e,n)}function E(t,e){if(t===e)P(t,new TypeError("You cannot resolve a promise with itself"));else if(o=typeof(r=e),null===r||"object"!==o&&"function"!==o)M(t,e);else{var n=void 0;try{n=e.then}catch(e){return void P(t,e)}O(t,e,n)}var r,o}function S(t){t._onerror&&t._onerror(t._result),D(t)}function M(t,e){t._state===k&&(t._result=e,t._state=T,0!==t._subscribers.length&&s(D,t))}function P(t,e){t._state===k&&(t._state=j,t._result=e,s(S,t))}function C(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+T]=n,o[i+j]=r,0===i&&t._state&&s(D,t)}function D(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?F(n,r,o,i):o(i);t._subscribers.length=0}}function F(e,n,r,o){var i=t(r),s=void 0,c=void 0,u=!0;if(i){try{s=r(o)}catch(t){u=!1,c=t}if(n===s)return void P(n,new TypeError("A promises callback cannot return that same promise."))}else s=o;n._state!==k||(i&&u?E(n,s):!1===u?P(n,c):e===T?M(n,s):e===j&&P(n,s))}var G=0;function I(t){t[x]=G++,t._state=void 0,t._result=void 0,t._subscribers=[]}var L=function(){function t(t,n){this._instanceConstructor=t,this.promise=new t(A),this.promise[x]||I(this.promise),e(n)?(this.length=n.length,this._remaining=n.length,this._result=new Array(this.length),0===this.length?M(this.promise,this._result):(this.length=this.length||0,this._enumerate(n),0===this._remaining&&M(this.promise,this._result))):P(this.promise,new Error("Array Methods must be provided an Array"))}return t.prototype._enumerate=function(t){for(var e=0;this._state===k&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===g){var o=void 0,i=void 0,s=!1;try{o=t.then}catch(t){s=!0,i=t}if(o===b&&t._state!==k)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===R){var c=new n(A);s?P(c,i):O(c,t,o),this._willSettleAt(c,e)}else this._willSettleAt(new n((function(e){return e(t)})),e)}else this._willSettleAt(r(t),e)},t.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===k&&(this._remaining--,t===j?P(r,n):this._result[e]=n),0===this._remaining&&M(r,this._result)},t.prototype._willSettleAt=function(t,e){var n=this;C(t,void 0,(function(t){return n._settledAt(T,e,t)}),(function(t){return n._settledAt(j,e,t)}))},t}();var R=function(){function e(t){this[x]=G++,this._result=this._state=void 0,this._subscribers=[],A!==t&&("function"!=typeof t&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof e?function(t,e){try{e((function(e){E(t,e)}),(function(e){P(t,e)}))}catch(e){P(t,e)}}(this,t):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return e.prototype.catch=function(t){return this.then(null,t)},e.prototype.finally=function(e){var n=this,r=n.constructor;return t(e)?n.then((function(t){return r.resolve(e()).then((function(){return t}))}),(function(t){return r.resolve(e()).then((function(){throw t}))})):n.then(e,e)},e}();return R.prototype.then=b,R.all=function(t){return new L(this,t).promise},R.race=function(t){var n=this;return e(t)?new n((function(e,r){for(var o=t.length,i=0;i<o;i++)n.resolve(t[i]).then(e,r)})):new n((function(t,e){return e(new TypeError("You must pass an array to race."))}))},R.resolve=g,R.reject=function(t){var e=new this(A);return P(e,t),e},R._setScheduler=function(t){i=t},R._setAsap=function(t){s=t},R._asap=s,R.polyfill=function(){var t=void 0;if(void 0!==n.g)t=n.g;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var r=null;try{r=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===r&&!e.cast)return}t.Promise=R},R.Promise=R,R}()}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r].call(i.exports,i,i.exports,n),i.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}();var r=n(36334)}();
//# sourceMappingURL=commands.js.map