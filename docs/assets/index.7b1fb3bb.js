function Ip(){import("data:text/javascript,")}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=r(i);fetch(i.href,o)}})();/*!
 * Vue.js v2.7.15
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */var V=Object.freeze({}),P=Array.isArray;function O(t){return t==null}function d(t){return t!=null}function z(t){return t===!0}function Fa(t){return t===!1}function Oe(t){return typeof t=="string"||typeof t=="number"||typeof t=="symbol"||typeof t=="boolean"}function D(t){return typeof t=="function"}function K(t){return t!==null&&typeof t=="object"}var fn=Object.prototype.toString;function et(t){return fn.call(t)==="[object Object]"}function Ua(t){return fn.call(t)==="[object RegExp]"}function no(t){var e=parseFloat(String(t));return e>=0&&Math.floor(e)===e&&isFinite(t)}function Rr(t){return d(t)&&typeof t.then=="function"&&typeof t.catch=="function"}function Ha(t){return t==null?"":Array.isArray(t)||et(t)&&t.toString===fn?JSON.stringify(t,null,2):String(t)}function _e(t){var e=parseFloat(t);return isNaN(e)?t:e}function ut(t,e){for(var r=Object.create(null),n=t.split(","),i=0;i<n.length;i++)r[n[i]]=!0;return e?function(o){return r[o.toLowerCase()]}:function(o){return r[o]}}ut("slot,component",!0);var Ba=ut("key,ref,slot,slot-scope,is");function Rt(t,e){var r=t.length;if(r){if(e===t[r-1]){t.length=r-1;return}var n=t.indexOf(e);if(n>-1)return t.splice(n,1)}}var za=Object.prototype.hasOwnProperty;function X(t,e){return za.call(t,e)}function Kt(t){var e=Object.create(null);return function(n){var i=e[n];return i||(e[n]=t(n))}}var Wa=/-(\w)/g,Wt=Kt(function(t){return t.replace(Wa,function(e,r){return r?r.toUpperCase():""})}),qa=Kt(function(t){return t.charAt(0).toUpperCase()+t.slice(1)}),Ga=/\B([A-Z])/g,$e=Kt(function(t){return t.replace(Ga,"-$1").toLowerCase()});function Ja(t,e){function r(n){var i=arguments.length;return i?i>1?t.apply(e,arguments):t.call(e,n):t.call(e)}return r._length=t.length,r}function Ka(t,e){return t.bind(e)}var io=Function.prototype.bind?Ka:Ja;function kr(t,e){e=e||0;for(var r=t.length-e,n=new Array(r);r--;)n[r]=t[r+e];return n}function N(t,e){for(var r in e)t[r]=e[r];return t}function oo(t){for(var e={},r=0;r<t.length;r++)t[r]&&N(e,t[r]);return e}function H(t,e,r){}var Te=function(t,e,r){return!1},ao=function(t){return t};function qt(t,e){if(t===e)return!0;var r=K(t),n=K(e);if(r&&n)try{var i=Array.isArray(t),o=Array.isArray(e);if(i&&o)return t.length===e.length&&t.every(function(c,u){return qt(c,e[u])});if(t instanceof Date&&e instanceof Date)return t.getTime()===e.getTime();if(!i&&!o){var a=Object.keys(t),s=Object.keys(e);return a.length===s.length&&a.every(function(c){return qt(t[c],e[c])})}else return!1}catch(c){return!1}else return!r&&!n?String(t)===String(e):!1}function so(t,e){for(var r=0;r<t.length;r++)if(qt(t[r],e))return r;return-1}function Ve(t){var e=!1;return function(){e||(e=!0,t.apply(this,arguments))}}function jr(t,e){return t===e?t===0&&1/t!==1/e:t===t||e===e}var Bn="data-server-rendered",gr=["component","directive","filter"],co=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch","renderTracked","renderTriggered"],ot={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:Te,isReservedAttr:Te,isUnknownElement:Te,getTagNamespace:H,parsePlatformTagName:ao,mustUseProp:Te,async:!0,_lifecycleHooks:co},Ya=/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;function uo(t){var e=(t+"").charCodeAt(0);return e===36||e===95}function Z(t,e,r,n){Object.defineProperty(t,e,{value:r,enumerable:!!n,writable:!0,configurable:!0})}var Xa=new RegExp("[^".concat(Ya.source,".$_\\d]"));function Qa(t){if(!Xa.test(t)){var e=t.split(".");return function(r){for(var n=0;n<e.length;n++){if(!r)return;r=r[e[n]]}return r}}}var Va="__proto__"in{},nt=typeof window<"u",Y=nt&&window.navigator.userAgent.toLowerCase(),ce=Y&&/msie|trident/.test(Y),ue=Y&&Y.indexOf("msie 9.0")>0,ln=Y&&Y.indexOf("edge/")>0;Y&&Y.indexOf("android")>0;var Za=Y&&/iphone|ipad|ipod|ios/.test(Y);Y&&/chrome\/\d+/.test(Y);Y&&/phantomjs/.test(Y);var zn=Y&&Y.match(/firefox\/(\d+)/),Lr={}.watch,fo=!1;if(nt)try{var Wn={};Object.defineProperty(Wn,"passive",{get:function(){fo=!0}}),window.addEventListener("test-passive",null,Wn)}catch(t){}var Ie,kt=function(){return Ie===void 0&&(!nt&&typeof global<"u"?Ie=global.process&&global.process.env.VUE_ENV==="server":Ie=!1),Ie},Ze=nt&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function oe(t){return typeof t=="function"&&/native code/.test(t.toString())}var Ee=typeof Symbol<"u"&&oe(Symbol)&&typeof Reflect<"u"&&oe(Reflect.ownKeys),ye;typeof Set<"u"&&oe(Set)?ye=Set:ye=function(){function t(){this.set=Object.create(null)}return t.prototype.has=function(e){return this.set[e]===!0},t.prototype.add=function(e){this.set[e]=!0},t.prototype.clear=function(){this.set=Object.create(null)},t}();var bt=null;function Pt(t){t===void 0&&(t=null),t||bt&&bt._scope.off(),bt=t,t&&t._scope.on()}var rt=function(){function t(e,r,n,i,o,a,s,c){this.tag=e,this.data=r,this.children=n,this.text=i,this.elm=o,this.ns=void 0,this.context=a,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=r&&r.key,this.componentOptions=s,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=c,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1}return Object.defineProperty(t.prototype,"child",{get:function(){return this.componentInstance},enumerable:!1,configurable:!0}),t}(),Ut=function(t){t===void 0&&(t="");var e=new rt;return e.text=t,e.isComment=!0,e};function ee(t){return new rt(void 0,void 0,void 0,String(t))}function Dr(t){var e=new rt(t.tag,t.data,t.children&&t.children.slice(),t.text,t.elm,t.context,t.componentOptions,t.asyncFactory);return e.ns=t.ns,e.isStatic=t.isStatic,e.key=t.key,e.isComment=t.isComment,e.fnContext=t.fnContext,e.fnOptions=t.fnOptions,e.fnScopeId=t.fnScopeId,e.asyncMeta=t.asyncMeta,e.isCloned=!0,e}var ts=0,Fe=[],es=function(){for(var t=0;t<Fe.length;t++){var e=Fe[t];e.subs=e.subs.filter(function(r){return r}),e._pending=!1}Fe.length=0},_t=function(){function t(){this._pending=!1,this.id=ts++,this.subs=[]}return t.prototype.addSub=function(e){this.subs.push(e)},t.prototype.removeSub=function(e){this.subs[this.subs.indexOf(e)]=null,this._pending||(this._pending=!0,Fe.push(this))},t.prototype.depend=function(e){t.target&&t.target.addDep(this)},t.prototype.notify=function(e){for(var r=this.subs.filter(function(a){return a}),n=0,i=r.length;n<i;n++){var o=r[n];o.update()}},t}();_t.target=null;var Ue=[];function fe(t){Ue.push(t),_t.target=t}function le(){Ue.pop(),_t.target=Ue[Ue.length-1]}var lo=Array.prototype,tr=Object.create(lo),rs=["push","pop","shift","unshift","splice","sort","reverse"];rs.forEach(function(t){var e=lo[t];Z(tr,t,function(){for(var n=[],i=0;i<arguments.length;i++)n[i]=arguments[i];var o=e.apply(this,n),a=this.__ob__,s;switch(t){case"push":case"unshift":s=n;break;case"splice":s=n.slice(2);break}return s&&a.observeArray(s),a.dep.notify(),o})});var qn=Object.getOwnPropertyNames(tr),po={},pn=!0;function Tt(t){pn=t}var ns={notify:H,depend:H,addSub:H,removeSub:H},Gn=function(){function t(e,r,n){if(r===void 0&&(r=!1),n===void 0&&(n=!1),this.value=e,this.shallow=r,this.mock=n,this.dep=n?ns:new _t,this.vmCount=0,Z(e,"__ob__",this),P(e)){if(!n)if(Va)e.__proto__=tr;else for(var i=0,o=qn.length;i<o;i++){var a=qn[i];Z(e,a,tr[a])}r||this.observeArray(e)}else for(var s=Object.keys(e),i=0;i<s.length;i++){var a=s[i];It(e,a,po,void 0,r,n)}}return t.prototype.observeArray=function(e){for(var r=0,n=e.length;r<n;r++)yt(e[r],!1,this.mock)},t}();function yt(t,e,r){if(t&&X(t,"__ob__")&&t.__ob__ instanceof Gn)return t.__ob__;if(pn&&(r||!kt())&&(P(t)||et(t))&&Object.isExtensible(t)&&!t.__v_skip&&!tt(t)&&!(t instanceof rt))return new Gn(t,e,r)}function It(t,e,r,n,i,o){var a=new _t,s=Object.getOwnPropertyDescriptor(t,e);if(!(s&&s.configurable===!1)){var c=s&&s.get,u=s&&s.set;(!c||u)&&(r===po||arguments.length===2)&&(r=t[e]);var f=!i&&yt(r,!1,o);return Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){var v=c?c.call(t):r;return _t.target&&(a.depend(),f&&(f.dep.depend(),P(v)&&vo(v))),tt(v)&&!i?v.value:v},set:function(v){var m=c?c.call(t):r;if(!!jr(m,v)){if(u)u.call(t,v);else{if(c)return;if(!i&&tt(m)&&!tt(v)){m.value=v;return}else r=v}f=!i&&yt(v,!1,o),a.notify()}}}),a}}function dn(t,e,r){if(!mr(t)){var n=t.__ob__;return P(t)&&no(e)?(t.length=Math.max(t.length,e),t.splice(e,1,r),n&&!n.shallow&&n.mock&&yt(r,!1,!0),r):e in t&&!(e in Object.prototype)?(t[e]=r,r):t._isVue||n&&n.vmCount?r:n?(It(n.value,e,r,void 0,n.shallow,n.mock),n.dep.notify(),r):(t[e]=r,r)}}function ho(t,e){if(P(t)&&no(e)){t.splice(e,1);return}var r=t.__ob__;t._isVue||r&&r.vmCount||mr(t)||!X(t,e)||(delete t[e],r&&r.dep.notify())}function vo(t){for(var e=void 0,r=0,n=t.length;r<n;r++)e=t[r],e&&e.__ob__&&e.__ob__.dep.depend(),P(e)&&vo(e)}function go(t){return is(t,!0),Z(t,"__v_isShallow",!0),t}function is(t,e){mr(t)||yt(t,e,kt())}function He(t){return mr(t)?He(t.__v_raw):!!(t&&t.__ob__)}function Jn(t){return!!(t&&t.__v_isShallow)}function mr(t){return!!(t&&t.__v_isReadonly)}function br(t){var e=t&&t.__v_raw;return e?br(e):t}function mo(t){return Object.isExtensible(t)&&Z(t,"__v_skip",!0),t}var bo="__v_isRef";function tt(t){return!!(t&&t.__v_isRef===!0)}function os(t){return as(t,!1)}function as(t,e){if(tt(t))return t;var r={};return Z(r,bo,!0),Z(r,"__v_isShallow",e),Z(r,"dep",It(r,"value",t,null,e,kt())),r}function ss(t){return tt(t)?t.value:t}function Nr(t,e,r){Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:function(){var n=e[r];if(tt(n))return n.value;var i=n&&n.__ob__;return i&&i.dep.depend(),n},set:function(n){var i=e[r];tt(i)&&!tt(n)?i.value=n:e[r]=n}})}function Rp(t,e){var r,n,i=D(t);i?(r=t,n=H):(r=t.get,n=t.set);var o=kt()?null:new Ae(bt,r,H,{lazy:!0}),a={effect:o,get value(){return o?(o.dirty&&o.evaluate(),_t.target&&o.depend(),o.value):r()},set value(s){n(s)}};return Z(a,bo,!0),Z(a,"__v_isReadonly",i),a}var _r="watcher",Kn="".concat(_r," callback"),Yn="".concat(_r," getter"),cs="".concat(_r," cleanup"),Xn={};function us(t,e,r){return fs(t,e,r)}function fs(t,e,r){var n=r===void 0?V:r,i=n.immediate,o=n.deep,a=n.flush,s=a===void 0?"pre":a;n.onTrack,n.onTrigger;var c=bt,u=function(C,A,T){return T===void 0&&(T=null),wt(C,null,T,c,A)},f,h=!1,v=!1;if(tt(t)?(f=function(){return t.value},h=Jn(t)):He(t)?(f=function(){return t.__ob__.dep.depend(),t},o=!0):P(t)?(v=!0,h=t.some(function(C){return He(C)||Jn(C)}),f=function(){return t.map(function(C){if(tt(C))return C.value;if(He(C))return ae(C);if(D(C))return u(C,Yn)})}):D(t)?e?f=function(){return u(t,Yn)}:f=function(){if(!(c&&c._isDestroyed))return _&&_(),u(t,_r,[y])}:f=H,e&&o){var m=f;f=function(){return ae(m())}}var _,y=function(C){_=b.onStop=function(){u(C,cs)}};if(kt())return y=H,e?i&&u(e,Kn,[f(),v?[]:void 0,y]):f(),H;var b=new Ae(bt,f,H,{lazy:!0});b.noRecurse=!e;var S=v?[]:Xn;return b.run=function(){if(!!b.active)if(e){var C=b.get();(o||h||(v?C.some(function(A,T){return jr(A,S[T])}):jr(C,S)))&&(_&&_(),u(e,Kn,[C,S===Xn?void 0:S,y]),S=C)}else b.get()},s==="sync"?b.update=b.run:s==="post"?(b.post=!0,b.update=function(){return qr(b)}):b.update=function(){if(c&&c===bt&&!c._isMounted){var C=c._preWatchers||(c._preWatchers=[]);C.indexOf(b)<0&&C.push(b)}else qr(b)},e?i?b.run():S=b.get():s==="post"&&c?c.$once("hook:mounted",function(){return b.get()}):b.get(),function(){b.teardown()}}var Q,_o=function(){function t(e){e===void 0&&(e=!1),this.detached=e,this.active=!0,this.effects=[],this.cleanups=[],this.parent=Q,!e&&Q&&(this.index=(Q.scopes||(Q.scopes=[])).push(this)-1)}return t.prototype.run=function(e){if(this.active){var r=Q;try{return Q=this,e()}finally{Q=r}}},t.prototype.on=function(){Q=this},t.prototype.off=function(){Q=this.parent},t.prototype.stop=function(e){if(this.active){var r=void 0,n=void 0;for(r=0,n=this.effects.length;r<n;r++)this.effects[r].teardown();for(r=0,n=this.cleanups.length;r<n;r++)this.cleanups[r]();if(this.scopes)for(r=0,n=this.scopes.length;r<n;r++)this.scopes[r].stop(!0);if(!this.detached&&this.parent&&!e){var i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0,this.active=!1}},t}();function ls(t){return new _o(t)}function ps(t,e){e===void 0&&(e=Q),e&&e.active&&e.effects.push(t)}function ds(){return Q}function hs(t){var e=t._provided,r=t.$parent&&t.$parent._provided;return r===e?t._provided=Object.create(r):e}var Qn=Kt(function(t){var e=t.charAt(0)==="&";t=e?t.slice(1):t;var r=t.charAt(0)==="~";t=r?t.slice(1):t;var n=t.charAt(0)==="!";return t=n?t.slice(1):t,{name:t,once:r,capture:n,passive:e}});function Mr(t,e){function r(){var n=r.fns;if(P(n))for(var i=n.slice(),o=0;o<i.length;o++)wt(i[o],null,arguments,e,"v-on handler");else return wt(n,null,arguments,e,"v-on handler")}return r.fns=t,r}function yo(t,e,r,n,i,o){var a,s,c,u;for(a in t)s=t[a],c=e[a],u=Qn(a),O(s)||(O(c)?(O(s.fns)&&(s=t[a]=Mr(s,o)),z(u.once)&&(s=t[a]=i(u.name,s,u.capture)),r(u.name,s,u.capture,u.passive,u.params)):s!==c&&(c.fns=s,t[a]=c));for(a in e)O(t[a])&&(u=Qn(a),n(u.name,e[a],u.capture))}function Ct(t,e,r){t instanceof rt&&(t=t.data.hook||(t.data.hook={}));var n,i=t[e];function o(){r.apply(this,arguments),Rt(n.fns,o)}O(i)?n=Mr([o]):d(i.fns)&&z(i.merged)?(n=i,n.fns.push(o)):n=Mr([i,o]),n.merged=!0,t[e]=n}function vs(t,e,r){var n=e.options.props;if(!O(n)){var i={},o=t.attrs,a=t.props;if(d(o)||d(a))for(var s in n){var c=$e(s);Vn(i,a,s,c,!0)||Vn(i,o,s,c,!1)}return i}}function Vn(t,e,r,n,i){if(d(e)){if(X(e,r))return t[r]=e[r],i||delete e[r],!0;if(X(e,n))return t[r]=e[n],i||delete e[n],!0}return!1}function gs(t){for(var e=0;e<t.length;e++)if(P(t[e]))return Array.prototype.concat.apply([],t);return t}function hn(t){return Oe(t)?[ee(t)]:P(t)?wo(t):void 0}function de(t){return d(t)&&d(t.text)&&Fa(t.isComment)}function wo(t,e){var r=[],n,i,o,a;for(n=0;n<t.length;n++)i=t[n],!(O(i)||typeof i=="boolean")&&(o=r.length-1,a=r[o],P(i)?i.length>0&&(i=wo(i,"".concat(e||"","_").concat(n)),de(i[0])&&de(a)&&(r[o]=ee(a.text+i[0].text),i.shift()),r.push.apply(r,i)):Oe(i)?de(a)?r[o]=ee(a.text+i):i!==""&&r.push(ee(i)):de(i)&&de(a)?r[o]=ee(a.text+i.text):(z(t._isVList)&&d(i.tag)&&O(i.key)&&d(e)&&(i.key="__vlist".concat(e,"_").concat(n,"__")),r.push(i)));return r}function ms(t,e){var r=null,n,i,o,a;if(P(t)||typeof t=="string")for(r=new Array(t.length),n=0,i=t.length;n<i;n++)r[n]=e(t[n],n);else if(typeof t=="number")for(r=new Array(t),n=0;n<t;n++)r[n]=e(n+1,n);else if(K(t))if(Ee&&t[Symbol.iterator]){r=[];for(var s=t[Symbol.iterator](),c=s.next();!c.done;)r.push(e(c.value,r.length)),c=s.next()}else for(o=Object.keys(t),r=new Array(o.length),n=0,i=o.length;n<i;n++)a=o[n],r[n]=e(t[a],a,n);return d(r)||(r=[]),r._isVList=!0,r}function bs(t,e,r,n){var i=this.$scopedSlots[t],o;i?(r=r||{},n&&(r=N(N({},n),r)),o=i(r)||(D(e)?e():e)):o=this.$slots[t]||(D(e)?e():e);var a=r&&r.slot;return a?this.$createElement("template",{slot:a},o):o}function _s(t){return or(this.$options,"filters",t)||ao}function Zn(t,e){return P(t)?t.indexOf(e)===-1:t!==e}function ys(t,e,r,n,i){var o=ot.keyCodes[e]||r;return i&&n&&!ot.keyCodes[e]?Zn(i,n):o?Zn(o,t):n?$e(n)!==e:t===void 0}function ws(t,e,r,n,i){if(r&&K(r)){P(r)&&(r=oo(r));var o=void 0,a=function(c){if(c==="class"||c==="style"||Ba(c))o=t;else{var u=t.attrs&&t.attrs.type;o=n||ot.mustUseProp(e,u,c)?t.domProps||(t.domProps={}):t.attrs||(t.attrs={})}var f=Wt(c),h=$e(c);if(!(f in o)&&!(h in o)&&(o[c]=r[c],i)){var v=t.on||(t.on={});v["update:".concat(c)]=function(m){r[c]=m}}};for(var s in r)a(s)}return t}function Ss(t,e){var r=this._staticTrees||(this._staticTrees=[]),n=r[t];return n&&!e||(n=r[t]=this.$options.staticRenderFns[t].call(this._renderProxy,this._c,this),So(n,"__static__".concat(t),!1)),n}function Cs(t,e,r){return So(t,"__once__".concat(e).concat(r?"_".concat(r):""),!0),t}function So(t,e,r){if(P(t))for(var n=0;n<t.length;n++)t[n]&&typeof t[n]!="string"&&ti(t[n],"".concat(e,"_").concat(n),r);else ti(t,e,r)}function ti(t,e,r){t.isStatic=!0,t.key=e,t.isOnce=r}function xs(t,e){if(e&&et(e)){var r=t.on=t.on?N({},t.on):{};for(var n in e){var i=r[n],o=e[n];r[n]=i?[].concat(i,o):o}}return t}function Co(t,e,r,n){e=e||{$stable:!r};for(var i=0;i<t.length;i++){var o=t[i];P(o)?Co(o,e,r):o&&(o.proxy&&(o.fn.proxy=!0),e[o.key]=o.fn)}return n&&(e.$key=n),e}function Os(t,e){for(var r=0;r<e.length;r+=2){var n=e[r];typeof n=="string"&&n&&(t[e[r]]=e[r+1])}return t}function $s(t,e){return typeof t=="string"?e+t:t}function xo(t){t._o=Cs,t._n=_e,t._s=Ha,t._l=ms,t._t=bs,t._q=qt,t._i=so,t._m=Ss,t._f=_s,t._k=ys,t._b=ws,t._v=ee,t._e=Ut,t._u=Co,t._g=xs,t._d=Os,t._p=$s}function vn(t,e){if(!t||!t.length)return{};for(var r={},n=0,i=t.length;n<i;n++){var o=t[n],a=o.data;if(a&&a.attrs&&a.attrs.slot&&delete a.attrs.slot,(o.context===e||o.fnContext===e)&&a&&a.slot!=null){var s=a.slot,c=r[s]||(r[s]=[]);o.tag==="template"?c.push.apply(c,o.children||[]):c.push(o)}else(r.default||(r.default=[])).push(o)}for(var u in r)r[u].every(Es)&&delete r[u];return r}function Es(t){return t.isComment&&!t.asyncFactory||t.text===" "}function we(t){return t.isComment&&t.asyncFactory}function be(t,e,r,n){var i,o=Object.keys(r).length>0,a=e?!!e.$stable:!o,s=e&&e.$key;if(!e)i={};else{if(e._normalized)return e._normalized;if(a&&n&&n!==V&&s===n.$key&&!o&&!n.$hasNormal)return n;i={};for(var c in e)e[c]&&c[0]!=="$"&&(i[c]=As(t,r,c,e[c]))}for(var u in r)u in i||(i[u]=Ps(r,u));return e&&Object.isExtensible(e)&&(e._normalized=i),Z(i,"$stable",a),Z(i,"$key",s),Z(i,"$hasNormal",o),i}function As(t,e,r,n){var i=function(){var o=bt;Pt(t);var a=arguments.length?n.apply(null,arguments):n({});a=a&&typeof a=="object"&&!P(a)?[a]:hn(a);var s=a&&a[0];return Pt(o),a&&(!s||a.length===1&&s.isComment&&!we(s))?void 0:a};return n.proxy&&Object.defineProperty(e,r,{get:i,enumerable:!0,configurable:!0}),i}function Ps(t,e){return function(){return t[e]}}function Ts(t){var e=t.$options,r=e.setup;if(r){var n=t._setupContext=Is(t);Pt(t),fe();var i=wt(r,null,[t._props||go({}),n],t,"setup");if(le(),Pt(),D(i))e.render=i;else if(K(i))if(t._setupState=i,i.__sfc){var a=t._setupProxy={};for(var o in i)o!=="__sfc"&&Nr(a,i,o)}else for(var o in i)uo(o)||Nr(t,i,o)}}function Is(t){return{get attrs(){if(!t._attrsProxy){var e=t._attrsProxy={};Z(e,"_v_attr_proxy",!0),er(e,t.$attrs,V,t,"$attrs")}return t._attrsProxy},get listeners(){if(!t._listenersProxy){var e=t._listenersProxy={};er(e,t.$listeners,V,t,"$listeners")}return t._listenersProxy},get slots(){return ks(t)},emit:io(t.$emit,t),expose:function(e){e&&Object.keys(e).forEach(function(r){return Nr(t,e,r)})}}}function er(t,e,r,n,i){var o=!1;for(var a in e)a in t?e[a]!==r[a]&&(o=!0):(o=!0,Rs(t,a,n,i));for(var a in t)a in e||(o=!0,delete t[a]);return o}function Rs(t,e,r,n){Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){return r[n][e]}})}function ks(t){return t._slotsProxy||Oo(t._slotsProxy={},t.$scopedSlots),t._slotsProxy}function Oo(t,e){for(var r in e)t[r]=e[r];for(var r in t)r in e||delete t[r]}function js(t){t._vnode=null,t._staticTrees=null;var e=t.$options,r=t.$vnode=e._parentVnode,n=r&&r.context;t.$slots=vn(e._renderChildren,n),t.$scopedSlots=r?be(t.$parent,r.data.scopedSlots,t.$slots):V,t._c=function(o,a,s,c){return rr(t,o,a,s,c,!1)},t.$createElement=function(o,a,s,c){return rr(t,o,a,s,c,!0)};var i=r&&r.data;It(t,"$attrs",i&&i.attrs||V,null,!0),It(t,"$listeners",e._parentListeners||V,null,!0)}var Fr=null;function Ls(t){xo(t.prototype),t.prototype.$nextTick=function(e){return gn(e,this)},t.prototype._render=function(){var e=this,r=e.$options,n=r.render,i=r._parentVnode;i&&e._isMounted&&(e.$scopedSlots=be(e.$parent,i.data.scopedSlots,e.$slots,e.$scopedSlots),e._slotsProxy&&Oo(e._slotsProxy,e.$scopedSlots)),e.$vnode=i;var o;try{Pt(e),Fr=e,o=n.call(e._renderProxy,e.$createElement)}catch(a){Gt(a,e,"render"),o=e._vnode}finally{Fr=null,Pt()}return P(o)&&o.length===1&&(o=o[0]),o instanceof rt||(o=Ut()),o.parent=i,o}}function xr(t,e){return(t.__esModule||Ee&&t[Symbol.toStringTag]==="Module")&&(t=t.default),K(t)?e.extend(t):t}function Ds(t,e,r,n,i){var o=Ut();return o.asyncFactory=t,o.asyncMeta={data:e,context:r,children:n,tag:i},o}function Ns(t,e){if(z(t.error)&&d(t.errorComp))return t.errorComp;if(d(t.resolved))return t.resolved;var r=Fr;if(r&&d(t.owners)&&t.owners.indexOf(r)===-1&&t.owners.push(r),z(t.loading)&&d(t.loadingComp))return t.loadingComp;if(r&&!d(t.owners)){var n=t.owners=[r],i=!0,o=null,a=null;r.$on("hook:destroyed",function(){return Rt(n,r)});var s=function(h){for(var v=0,m=n.length;v<m;v++)n[v].$forceUpdate();h&&(n.length=0,o!==null&&(clearTimeout(o),o=null),a!==null&&(clearTimeout(a),a=null))},c=Ve(function(h){t.resolved=xr(h,e),i?n.length=0:s(!0)}),u=Ve(function(h){d(t.errorComp)&&(t.error=!0,s(!0))}),f=t(c,u);return K(f)&&(Rr(f)?O(t.resolved)&&f.then(c,u):Rr(f.component)&&(f.component.then(c,u),d(f.error)&&(t.errorComp=xr(f.error,e)),d(f.loading)&&(t.loadingComp=xr(f.loading,e),f.delay===0?t.loading=!0:o=setTimeout(function(){o=null,O(t.resolved)&&O(t.error)&&(t.loading=!0,s(!1))},f.delay||200)),d(f.timeout)&&(a=setTimeout(function(){a=null,O(t.resolved)&&u(null)},f.timeout)))),i=!1,t.loading?t.loadingComp:t.resolved}}function $o(t){if(P(t))for(var e=0;e<t.length;e++){var r=t[e];if(d(r)&&(d(r.componentOptions)||we(r)))return r}}var Ms=1,Eo=2;function rr(t,e,r,n,i,o){return(P(r)||Oe(r))&&(i=n,n=r,r=void 0),z(o)&&(i=Eo),Fs(t,e,r,n,i)}function Fs(t,e,r,n,i){if(d(r)&&d(r.__ob__)||(d(r)&&d(r.is)&&(e=r.is),!e))return Ut();P(n)&&D(n[0])&&(r=r||{},r.scopedSlots={default:n[0]},n.length=0),i===Eo?n=hn(n):i===Ms&&(n=gs(n));var o,a;if(typeof e=="string"){var s=void 0;a=t.$vnode&&t.$vnode.ns||ot.getTagNamespace(e),ot.isReservedTag(e)?o=new rt(ot.parsePlatformTagName(e),r,n,void 0,void 0,t):(!r||!r.pre)&&d(s=or(t.$options,"components",e))?o=ci(s,r,t,n,e):o=new rt(e,r,n,void 0,void 0,t)}else o=ci(e,r,t,n);return P(o)?o:d(o)?(d(a)&&Ao(o,a),d(r)&&Us(r),o):Ut()}function Ao(t,e,r){if(t.ns=e,t.tag==="foreignObject"&&(e=void 0,r=!0),d(t.children))for(var n=0,i=t.children.length;n<i;n++){var o=t.children[n];d(o.tag)&&(O(o.ns)||z(r)&&o.tag!=="svg")&&Ao(o,e,r)}}function Us(t){K(t.style)&&ae(t.style),K(t.class)&&ae(t.class)}function Gt(t,e,r){fe();try{if(e)for(var n=e;n=n.$parent;){var i=n.$options.errorCaptured;if(i)for(var o=0;o<i.length;o++)try{var a=i[o].call(n,t,e,r)===!1;if(a)return}catch(s){ei(s,n,"errorCaptured hook")}}ei(t,e,r)}finally{le()}}function wt(t,e,r,n,i){var o;try{o=r?t.apply(e,r):t.call(e),o&&!o._isVue&&Rr(o)&&!o._handled&&(o.catch(function(a){return Gt(a,n,i+" (Promise/async)")}),o._handled=!0)}catch(a){Gt(a,n,i)}return o}function ei(t,e,r){if(ot.errorHandler)try{return ot.errorHandler.call(null,t,e,r)}catch(n){n!==t&&ri(n)}ri(t)}function ri(t,e,r){if(nt&&typeof console<"u")console.error(t);else throw t}var Ur=!1,Hr=[],Br=!1;function Re(){Br=!1;var t=Hr.slice(0);Hr.length=0;for(var e=0;e<t.length;e++)t[e]()}var ge;if(typeof Promise<"u"&&oe(Promise)){var Hs=Promise.resolve();ge=function(){Hs.then(Re),Za&&setTimeout(H)},Ur=!0}else if(!ce&&typeof MutationObserver<"u"&&(oe(MutationObserver)||MutationObserver.toString()==="[object MutationObserverConstructor]")){var ke=1,Bs=new MutationObserver(Re),ni=document.createTextNode(String(ke));Bs.observe(ni,{characterData:!0}),ge=function(){ke=(ke+1)%2,ni.data=String(ke)},Ur=!0}else typeof setImmediate<"u"&&oe(setImmediate)?ge=function(){setImmediate(Re)}:ge=function(){setTimeout(Re,0)};function gn(t,e){var r;if(Hr.push(function(){if(t)try{t.call(e)}catch(n){Gt(n,e,"nextTick")}else r&&r(e)}),Br||(Br=!0,ge()),!t&&typeof Promise<"u")return new Promise(function(n){r=n})}var zs="2.7.15";function kp(t){return t}var ii=new ye;function ae(t){return Be(t,ii),ii.clear(),t}function Be(t,e){var r,n,i=P(t);if(!(!i&&!K(t)||t.__v_skip||Object.isFrozen(t)||t instanceof rt)){if(t.__ob__){var o=t.__ob__.dep.id;if(e.has(o))return;e.add(o)}if(i)for(r=t.length;r--;)Be(t[r],e);else if(tt(t))Be(t.value,e);else for(n=Object.keys(t),r=n.length;r--;)Be(t[n[r]],e)}}var Ws=0,Ae=function(){function t(e,r,n,i,o){ps(this,Q&&!Q._vm?Q:e?e._scope:void 0),(this.vm=e)&&o&&(e._watcher=this),i?(this.deep=!!i.deep,this.user=!!i.user,this.lazy=!!i.lazy,this.sync=!!i.sync,this.before=i.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++Ws,this.active=!0,this.post=!1,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new ye,this.newDepIds=new ye,this.expression="",D(r)?this.getter=r:(this.getter=Qa(r),this.getter||(this.getter=H)),this.value=this.lazy?void 0:this.get()}return t.prototype.get=function(){fe(this);var e,r=this.vm;try{e=this.getter.call(r,r)}catch(n){if(this.user)Gt(n,r,'getter for watcher "'.concat(this.expression,'"'));else throw n}finally{this.deep&&ae(e),le(),this.cleanupDeps()}return e},t.prototype.addDep=function(e){var r=e.id;this.newDepIds.has(r)||(this.newDepIds.add(r),this.newDeps.push(e),this.depIds.has(r)||e.addSub(this))},t.prototype.cleanupDeps=function(){for(var e=this.deps.length;e--;){var r=this.deps[e];this.newDepIds.has(r.id)||r.removeSub(this)}var n=this.depIds;this.depIds=this.newDepIds,this.newDepIds=n,this.newDepIds.clear(),n=this.deps,this.deps=this.newDeps,this.newDeps=n,this.newDeps.length=0},t.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():qr(this)},t.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||K(e)||this.deep){var r=this.value;if(this.value=e,this.user){var n='callback for watcher "'.concat(this.expression,'"');wt(this.cb,this.vm,[e,r],this.vm,n)}else this.cb.call(this.vm,e,r)}}},t.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},t.prototype.depend=function(){for(var e=this.deps.length;e--;)this.deps[e].depend()},t.prototype.teardown=function(){if(this.vm&&!this.vm._isBeingDestroyed&&Rt(this.vm._scope.effects,this),this.active){for(var e=this.deps.length;e--;)this.deps[e].removeSub(this);this.active=!1,this.onStop&&this.onStop()}},t}();function qs(t){t._events=Object.create(null),t._hasHookEvent=!1;var e=t.$options._parentListeners;e&&Po(t,e)}var Se;function Gs(t,e){Se.$on(t,e)}function Js(t,e){Se.$off(t,e)}function Ks(t,e){var r=Se;return function n(){var i=e.apply(null,arguments);i!==null&&r.$off(t,n)}}function Po(t,e,r){Se=t,yo(e,r||{},Gs,Js,Ks,t),Se=void 0}function Ys(t){var e=/^hook:/;t.prototype.$on=function(r,n){var i=this;if(P(r))for(var o=0,a=r.length;o<a;o++)i.$on(r[o],n);else(i._events[r]||(i._events[r]=[])).push(n),e.test(r)&&(i._hasHookEvent=!0);return i},t.prototype.$once=function(r,n){var i=this;function o(){i.$off(r,o),n.apply(i,arguments)}return o.fn=n,i.$on(r,o),i},t.prototype.$off=function(r,n){var i=this;if(!arguments.length)return i._events=Object.create(null),i;if(P(r)){for(var o=0,a=r.length;o<a;o++)i.$off(r[o],n);return i}var s=i._events[r];if(!s)return i;if(!n)return i._events[r]=null,i;for(var c,u=s.length;u--;)if(c=s[u],c===n||c.fn===n){s.splice(u,1);break}return i},t.prototype.$emit=function(r){var n=this,i=n._events[r];if(i){i=i.length>1?kr(i):i;for(var o=kr(arguments,1),a='event handler for "'.concat(r,'"'),s=0,c=i.length;s<c;s++)wt(i[s],n,o,n,a)}return n}}var Ht=null;function To(t){var e=Ht;return Ht=t,function(){Ht=e}}function Xs(t){var e=t.$options,r=e.parent;if(r&&!e.abstract){for(;r.$options.abstract&&r.$parent;)r=r.$parent;r.$children.push(t)}t.$parent=r,t.$root=r?r.$root:t,t.$children=[],t.$refs={},t._provided=r?r._provided:Object.create(null),t._watcher=null,t._inactive=null,t._directInactive=!1,t._isMounted=!1,t._isDestroyed=!1,t._isBeingDestroyed=!1}function Qs(t){t.prototype._update=function(e,r){var n=this,i=n.$el,o=n._vnode,a=To(n);n._vnode=e,o?n.$el=n.__patch__(o,e):n.$el=n.__patch__(n.$el,e,r,!1),a(),i&&(i.__vue__=null),n.$el&&(n.$el.__vue__=n);for(var s=n;s&&s.$vnode&&s.$parent&&s.$vnode===s.$parent._vnode;)s.$parent.$el=s.$el,s=s.$parent},t.prototype.$forceUpdate=function(){var e=this;e._watcher&&e._watcher.update()},t.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){ct(e,"beforeDestroy"),e._isBeingDestroyed=!0;var r=e.$parent;r&&!r._isBeingDestroyed&&!e.$options.abstract&&Rt(r.$children,e),e._scope.stop(),e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),ct(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}function Vs(t,e,r){t.$el=e,t.$options.render||(t.$options.render=Ut),ct(t,"beforeMount");var n;n=function(){t._update(t._render(),r)};var i={before:function(){t._isMounted&&!t._isDestroyed&&ct(t,"beforeUpdate")}};new Ae(t,n,H,i,!0),r=!1;var o=t._preWatchers;if(o)for(var a=0;a<o.length;a++)o[a].run();return t.$vnode==null&&(t._isMounted=!0,ct(t,"mounted")),t}function Zs(t,e,r,n,i){var o=n.data.scopedSlots,a=t.$scopedSlots,s=!!(o&&!o.$stable||a!==V&&!a.$stable||o&&t.$scopedSlots.$key!==o.$key||!o&&t.$scopedSlots.$key),c=!!(i||t.$options._renderChildren||s),u=t.$vnode;t.$options._parentVnode=n,t.$vnode=n,t._vnode&&(t._vnode.parent=n),t.$options._renderChildren=i;var f=n.data.attrs||V;t._attrsProxy&&er(t._attrsProxy,f,u.data&&u.data.attrs||V,t,"$attrs")&&(c=!0),t.$attrs=f,r=r||V;var h=t.$options._parentListeners;if(t._listenersProxy&&er(t._listenersProxy,r,h||V,t,"$listeners"),t.$listeners=t.$options._parentListeners=r,Po(t,r,h),e&&t.$options.props){Tt(!1);for(var v=t._props,m=t.$options._propKeys||[],_=0;_<m.length;_++){var y=m[_],b=t.$options.props;v[y]=Sn(y,b,e,t)}Tt(!0),t.$options.propsData=e}c&&(t.$slots=vn(i,n.context),t.$forceUpdate())}function Io(t){for(;t&&(t=t.$parent);)if(t._inactive)return!0;return!1}function mn(t,e){if(e){if(t._directInactive=!1,Io(t))return}else if(t._directInactive)return;if(t._inactive||t._inactive===null){t._inactive=!1;for(var r=0;r<t.$children.length;r++)mn(t.$children[r]);ct(t,"activated")}}function Ro(t,e){if(!(e&&(t._directInactive=!0,Io(t)))&&!t._inactive){t._inactive=!0;for(var r=0;r<t.$children.length;r++)Ro(t.$children[r]);ct(t,"deactivated")}}function ct(t,e,r,n){n===void 0&&(n=!0),fe();var i=bt,o=ds();n&&Pt(t);var a=t.$options[e],s="".concat(e," hook");if(a)for(var c=0,u=a.length;c<u;c++)wt(a[c],t,r||null,t,s);t._hasHookEvent&&t.$emit("hook:"+e),n&&(Pt(i),o&&o.on()),le()}var gt=[],bn=[],nr={},zr=!1,_n=!1,re=0;function tc(){re=gt.length=bn.length=0,nr={},zr=_n=!1}var ko=0,Wr=Date.now;if(nt&&!ce){var Or=window.performance;Or&&typeof Or.now=="function"&&Wr()>document.createEvent("Event").timeStamp&&(Wr=function(){return Or.now()})}var ec=function(t,e){if(t.post){if(!e.post)return 1}else if(e.post)return-1;return t.id-e.id};function rc(){ko=Wr(),_n=!0;var t,e;for(gt.sort(ec),re=0;re<gt.length;re++)t=gt[re],t.before&&t.before(),e=t.id,nr[e]=null,t.run();var r=bn.slice(),n=gt.slice();tc(),oc(r),nc(n),es(),Ze&&ot.devtools&&Ze.emit("flush")}function nc(t){for(var e=t.length;e--;){var r=t[e],n=r.vm;n&&n._watcher===r&&n._isMounted&&!n._isDestroyed&&ct(n,"updated")}}function ic(t){t._inactive=!1,bn.push(t)}function oc(t){for(var e=0;e<t.length;e++)t[e]._inactive=!0,mn(t[e],!0)}function qr(t){var e=t.id;if(nr[e]==null&&!(t===_t.target&&t.noRecurse)){if(nr[e]=!0,!_n)gt.push(t);else{for(var r=gt.length-1;r>re&&gt[r].id>t.id;)r--;gt.splice(r+1,0,t)}zr||(zr=!0,gn(rc))}}function ac(t){var e=t.$options.provide;if(e){var r=D(e)?e.call(t):e;if(!K(r))return;for(var n=hs(t),i=Ee?Reflect.ownKeys(r):Object.keys(r),o=0;o<i.length;o++){var a=i[o];Object.defineProperty(n,a,Object.getOwnPropertyDescriptor(r,a))}}}function sc(t){var e=jo(t.$options.inject,t);e&&(Tt(!1),Object.keys(e).forEach(function(r){It(t,r,e[r])}),Tt(!0))}function jo(t,e){if(t){for(var r=Object.create(null),n=Ee?Reflect.ownKeys(t):Object.keys(t),i=0;i<n.length;i++){var o=n[i];if(o!=="__ob__"){var a=t[o].from;if(a in e._provided)r[o]=e._provided[a];else if("default"in t[o]){var s=t[o].default;r[o]=D(s)?s.call(e):s}}}return r}}function yn(t,e,r,n,i){var o=this,a=i.options,s;X(n,"_uid")?(s=Object.create(n),s._original=n):(s=n,n=n._original);var c=z(a._compiled),u=!c;this.data=t,this.props=e,this.children=r,this.parent=n,this.listeners=t.on||V,this.injections=jo(a.inject,n),this.slots=function(){return o.$slots||be(n,t.scopedSlots,o.$slots=vn(r,n)),o.$slots},Object.defineProperty(this,"scopedSlots",{enumerable:!0,get:function(){return be(n,t.scopedSlots,this.slots())}}),c&&(this.$options=a,this.$slots=this.slots(),this.$scopedSlots=be(n,t.scopedSlots,this.$slots)),a._scopeId?this._c=function(f,h,v,m){var _=rr(s,f,h,v,m,u);return _&&!P(_)&&(_.fnScopeId=a._scopeId,_.fnContext=n),_}:this._c=function(f,h,v,m){return rr(s,f,h,v,m,u)}}xo(yn.prototype);function cc(t,e,r,n,i){var o=t.options,a={},s=o.props;if(d(s))for(var c in s)a[c]=Sn(c,s,e||V);else d(r.attrs)&&ai(a,r.attrs),d(r.props)&&ai(a,r.props);var u=new yn(r,a,i,n,t),f=o.render.call(null,u._c,u);if(f instanceof rt)return oi(f,r,u.parent,o);if(P(f)){for(var h=hn(f)||[],v=new Array(h.length),m=0;m<h.length;m++)v[m]=oi(h[m],r,u.parent,o);return v}}function oi(t,e,r,n,i){var o=Dr(t);return o.fnContext=r,o.fnOptions=n,e.slot&&((o.data||(o.data={})).slot=e.slot),o}function ai(t,e){for(var r in e)t[Wt(r)]=e[r]}function ir(t){return t.name||t.__name||t._componentTag}var wn={init:function(t,e){if(t.componentInstance&&!t.componentInstance._isDestroyed&&t.data.keepAlive){var r=t;wn.prepatch(r,r)}else{var n=t.componentInstance=uc(t,Ht);n.$mount(e?t.elm:void 0,e)}},prepatch:function(t,e){var r=e.componentOptions,n=e.componentInstance=t.componentInstance;Zs(n,r.propsData,r.listeners,e,r.children)},insert:function(t){var e=t.context,r=t.componentInstance;r._isMounted||(r._isMounted=!0,ct(r,"mounted")),t.data.keepAlive&&(e._isMounted?ic(r):mn(r,!0))},destroy:function(t){var e=t.componentInstance;e._isDestroyed||(t.data.keepAlive?Ro(e,!0):e.$destroy())}},si=Object.keys(wn);function ci(t,e,r,n,i){if(!O(t)){var o=r.$options._base;if(K(t)&&(t=o.extend(t)),typeof t=="function"){var a;if(O(t.cid)&&(a=t,t=Ns(a,o),t===void 0))return Ds(a,e,r,n,i);e=e||{},xn(t),d(e.model)&&pc(t.options,e);var s=vs(e,t);if(z(t.options.functional))return cc(t,s,e,r,n);var c=e.on;if(e.on=e.nativeOn,z(t.options.abstract)){var u=e.slot;e={},u&&(e.slot=u)}fc(e);var f=ir(t.options)||i,h=new rt("vue-component-".concat(t.cid).concat(f?"-".concat(f):""),e,void 0,void 0,void 0,r,{Ctor:t,propsData:s,listeners:c,tag:i,children:n},a);return h}}}function uc(t,e){var r={_isComponent:!0,_parentVnode:t,parent:e},n=t.data.inlineTemplate;return d(n)&&(r.render=n.render,r.staticRenderFns=n.staticRenderFns),new t.componentOptions.Ctor(r)}function fc(t){for(var e=t.hook||(t.hook={}),r=0;r<si.length;r++){var n=si[r],i=e[n],o=wn[n];i!==o&&!(i&&i._merged)&&(e[n]=i?lc(o,i):o)}}function lc(t,e){var r=function(n,i){t(n,i),e(n,i)};return r._merged=!0,r}function pc(t,e){var r=t.model&&t.model.prop||"value",n=t.model&&t.model.event||"input";(e.attrs||(e.attrs={}))[r]=e.model.value;var i=e.on||(e.on={}),o=i[n],a=e.model.callback;d(o)?(P(o)?o.indexOf(a)===-1:o!==a)&&(i[n]=[a].concat(o)):i[n]=a}var dc=H,lt=ot.optionMergeStrategies;function Ce(t,e,r){if(r===void 0&&(r=!0),!e)return t;for(var n,i,o,a=Ee?Reflect.ownKeys(e):Object.keys(e),s=0;s<a.length;s++)n=a[s],n!=="__ob__"&&(i=t[n],o=e[n],!r||!X(t,n)?dn(t,n,o):i!==o&&et(i)&&et(o)&&Ce(i,o));return t}function ui(t,e,r){return r?function(){var i=D(e)?e.call(r,r):e,o=D(t)?t.call(r,r):t;return i?Ce(i,o):o}:e?t?function(){return Ce(D(e)?e.call(this,this):e,D(t)?t.call(this,this):t)}:e:t}lt.data=function(t,e,r){return r?ui(t,e,r):e&&typeof e!="function"?t:ui(t,e)};function hc(t,e){var r=e?t?t.concat(e):P(e)?e:[e]:t;return r&&vc(r)}function vc(t){for(var e=[],r=0;r<t.length;r++)e.indexOf(t[r])===-1&&e.push(t[r]);return e}co.forEach(function(t){lt[t]=hc});function gc(t,e,r,n){var i=Object.create(t||null);return e?N(i,e):i}gr.forEach(function(t){lt[t+"s"]=gc});lt.watch=function(t,e,r,n){if(t===Lr&&(t=void 0),e===Lr&&(e=void 0),!e)return Object.create(t||null);if(!t)return e;var i={};N(i,t);for(var o in e){var a=i[o],s=e[o];a&&!P(a)&&(a=[a]),i[o]=a?a.concat(s):P(s)?s:[s]}return i};lt.props=lt.methods=lt.inject=lt.computed=function(t,e,r,n){if(!t)return e;var i=Object.create(null);return N(i,t),e&&N(i,e),i};lt.provide=function(t,e){return t?function(){var r=Object.create(null);return Ce(r,D(t)?t.call(this):t),e&&Ce(r,D(e)?e.call(this):e,!1),r}:e};var mc=function(t,e){return e===void 0?t:e};function bc(t,e){var r=t.props;if(!!r){var n={},i,o,a;if(P(r))for(i=r.length;i--;)o=r[i],typeof o=="string"&&(a=Wt(o),n[a]={type:null});else if(et(r))for(var s in r)o=r[s],a=Wt(s),n[a]=et(o)?o:{type:o};t.props=n}}function _c(t,e){var r=t.inject;if(!!r){var n=t.inject={};if(P(r))for(var i=0;i<r.length;i++)n[r[i]]={from:r[i]};else if(et(r))for(var o in r){var a=r[o];n[o]=et(a)?N({from:o},a):{from:a}}}}function yc(t){var e=t.directives;if(e)for(var r in e){var n=e[r];D(n)&&(e[r]={bind:n,update:n})}}function Jt(t,e,r){if(D(e)&&(e=e.options),bc(e),_c(e),yc(e),!e._base&&(e.extends&&(t=Jt(t,e.extends,r)),e.mixins))for(var n=0,i=e.mixins.length;n<i;n++)t=Jt(t,e.mixins[n],r);var o={},a;for(a in t)s(a);for(a in e)X(t,a)||s(a);function s(c){var u=lt[c]||mc;o[c]=u(t[c],e[c],r,c)}return o}function or(t,e,r,n){if(typeof r=="string"){var i=t[e];if(X(i,r))return i[r];var o=Wt(r);if(X(i,o))return i[o];var a=qa(o);if(X(i,a))return i[a];var s=i[r]||i[o]||i[a];return s}}function Sn(t,e,r,n){var i=e[t],o=!X(r,t),a=r[t],s=li(Boolean,i.type);if(s>-1){if(o&&!X(i,"default"))a=!1;else if(a===""||a===$e(t)){var c=li(String,i.type);(c<0||s<c)&&(a=!0)}}if(a===void 0){a=wc(n,i,t);var u=pn;Tt(!0),yt(a),Tt(u)}return a}function wc(t,e,r){if(!!X(e,"default")){var n=e.default;return t&&t.$options.propsData&&t.$options.propsData[r]===void 0&&t._props[r]!==void 0?t._props[r]:D(n)&&Gr(e.type)!=="Function"?n.call(t):n}}var Sc=/^\s*function (\w+)/;function Gr(t){var e=t&&t.toString().match(Sc);return e?e[1]:""}function fi(t,e){return Gr(t)===Gr(e)}function li(t,e){if(!P(e))return fi(e,t)?0:-1;for(var r=0,n=e.length;r<n;r++)if(fi(e[r],t))return r;return-1}var St={enumerable:!0,configurable:!0,get:H,set:H};function Cn(t,e,r){St.get=function(){return this[e][r]},St.set=function(i){this[e][r]=i},Object.defineProperty(t,r,St)}function Cc(t){var e=t.$options;if(e.props&&xc(t,e.props),Ts(t),e.methods&&Pc(t,e.methods),e.data)Oc(t);else{var r=yt(t._data={});r&&r.vmCount++}e.computed&&Ac(t,e.computed),e.watch&&e.watch!==Lr&&Tc(t,e.watch)}function xc(t,e){var r=t.$options.propsData||{},n=t._props=go({}),i=t.$options._propKeys=[],o=!t.$parent;o||Tt(!1);var a=function(c){i.push(c);var u=Sn(c,e,r,t);It(n,c,u),c in t||Cn(t,"_props",c)};for(var s in e)a(s);Tt(!0)}function Oc(t){var e=t.$options.data;e=t._data=D(e)?$c(e,t):e||{},et(e)||(e={});var r=Object.keys(e),n=t.$options.props;t.$options.methods;for(var i=r.length;i--;){var o=r[i];n&&X(n,o)||uo(o)||Cn(t,"_data",o)}var a=yt(e);a&&a.vmCount++}function $c(t,e){fe();try{return t.call(e,e)}catch(r){return Gt(r,e,"data()"),{}}finally{le()}}var Ec={lazy:!0};function Ac(t,e){var r=t._computedWatchers=Object.create(null),n=kt();for(var i in e){var o=e[i],a=D(o)?o:o.get;n||(r[i]=new Ae(t,a||H,H,Ec)),i in t||Lo(t,i,o)}}function Lo(t,e,r){var n=!kt();D(r)?(St.get=n?pi(e):di(r),St.set=H):(St.get=r.get?n&&r.cache!==!1?pi(e):di(r.get):H,St.set=r.set||H),Object.defineProperty(t,e,St)}function pi(t){return function(){var r=this._computedWatchers&&this._computedWatchers[t];if(r)return r.dirty&&r.evaluate(),_t.target&&r.depend(),r.value}}function di(t){return function(){return t.call(this,this)}}function Pc(t,e){t.$options.props;for(var r in e)t[r]=typeof e[r]!="function"?H:io(e[r],t)}function Tc(t,e){for(var r in e){var n=e[r];if(P(n))for(var i=0;i<n.length;i++)Jr(t,r,n[i]);else Jr(t,r,n)}}function Jr(t,e,r,n){return et(r)&&(n=r,r=r.handler),typeof r=="string"&&(r=t[r]),t.$watch(e,r,n)}function Ic(t){var e={};e.get=function(){return this._data};var r={};r.get=function(){return this._props},Object.defineProperty(t.prototype,"$data",e),Object.defineProperty(t.prototype,"$props",r),t.prototype.$set=dn,t.prototype.$delete=ho,t.prototype.$watch=function(n,i,o){var a=this;if(et(i))return Jr(a,n,i,o);o=o||{},o.user=!0;var s=new Ae(a,n,i,o);if(o.immediate){var c='callback for immediate watcher "'.concat(s.expression,'"');fe(),wt(i,a,[s.value],a,c),le()}return function(){s.teardown()}}}var Rc=0;function kc(t){t.prototype._init=function(e){var r=this;r._uid=Rc++,r._isVue=!0,r.__v_skip=!0,r._scope=new _o(!0),r._scope._vm=!0,e&&e._isComponent?jc(r,e):r.$options=Jt(xn(r.constructor),e||{},r),r._renderProxy=r,r._self=r,Xs(r),qs(r),js(r),ct(r,"beforeCreate",void 0,!1),sc(r),Cc(r),ac(r),ct(r,"created"),r.$options.el&&r.$mount(r.$options.el)}}function jc(t,e){var r=t.$options=Object.create(t.constructor.options),n=e._parentVnode;r.parent=e.parent,r._parentVnode=n;var i=n.componentOptions;r.propsData=i.propsData,r._parentListeners=i.listeners,r._renderChildren=i.children,r._componentTag=i.tag,e.render&&(r.render=e.render,r.staticRenderFns=e.staticRenderFns)}function xn(t){var e=t.options;if(t.super){var r=xn(t.super),n=t.superOptions;if(r!==n){t.superOptions=r;var i=Lc(t);i&&N(t.extendOptions,i),e=t.options=Jt(r,t.extendOptions),e.name&&(e.components[e.name]=t)}}return e}function Lc(t){var e,r=t.options,n=t.sealedOptions;for(var i in r)r[i]!==n[i]&&(e||(e={}),e[i]=r[i]);return e}function B(t){this._init(t)}kc(B);Ic(B);Ys(B);Qs(B);Ls(B);function Dc(t){t.use=function(e){var r=this._installedPlugins||(this._installedPlugins=[]);if(r.indexOf(e)>-1)return this;var n=kr(arguments,1);return n.unshift(this),D(e.install)?e.install.apply(e,n):D(e)&&e.apply(null,n),r.push(e),this}}function Nc(t){t.mixin=function(e){return this.options=Jt(this.options,e),this}}function Mc(t){t.cid=0;var e=1;t.extend=function(r){r=r||{};var n=this,i=n.cid,o=r._Ctor||(r._Ctor={});if(o[i])return o[i];var a=ir(r)||ir(n.options),s=function(u){this._init(u)};return s.prototype=Object.create(n.prototype),s.prototype.constructor=s,s.cid=e++,s.options=Jt(n.options,r),s.super=n,s.options.props&&Fc(s),s.options.computed&&Uc(s),s.extend=n.extend,s.mixin=n.mixin,s.use=n.use,gr.forEach(function(c){s[c]=n[c]}),a&&(s.options.components[a]=s),s.superOptions=n.options,s.extendOptions=r,s.sealedOptions=N({},s.options),o[i]=s,s}}function Fc(t){var e=t.options.props;for(var r in e)Cn(t.prototype,"_props",r)}function Uc(t){var e=t.options.computed;for(var r in e)Lo(t.prototype,r,e[r])}function Hc(t){gr.forEach(function(e){t[e]=function(r,n){return n?(e==="component"&&et(n)&&(n.name=n.name||r,n=this.options._base.extend(n)),e==="directive"&&D(n)&&(n={bind:n,update:n}),this.options[e+"s"][r]=n,n):this.options[e+"s"][r]}})}function hi(t){return t&&(ir(t.Ctor.options)||t.tag)}function je(t,e){return P(t)?t.indexOf(e)>-1:typeof t=="string"?t.split(",").indexOf(e)>-1:Ua(t)?t.test(e):!1}function vi(t,e){var r=t.cache,n=t.keys,i=t._vnode;for(var o in r){var a=r[o];if(a){var s=a.name;s&&!e(s)&&Kr(r,o,n,i)}}}function Kr(t,e,r,n){var i=t[e];i&&(!n||i.tag!==n.tag)&&i.componentInstance.$destroy(),t[e]=null,Rt(r,e)}var gi=[String,RegExp,Array],Bc={name:"keep-alive",abstract:!0,props:{include:gi,exclude:gi,max:[String,Number]},methods:{cacheVNode:function(){var t=this,e=t.cache,r=t.keys,n=t.vnodeToCache,i=t.keyToCache;if(n){var o=n.tag,a=n.componentInstance,s=n.componentOptions;e[i]={name:hi(s),tag:o,componentInstance:a},r.push(i),this.max&&r.length>parseInt(this.max)&&Kr(e,r[0],r,this._vnode),this.vnodeToCache=null}}},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var t in this.cache)Kr(this.cache,t,this.keys)},mounted:function(){var t=this;this.cacheVNode(),this.$watch("include",function(e){vi(t,function(r){return je(e,r)})}),this.$watch("exclude",function(e){vi(t,function(r){return!je(e,r)})})},updated:function(){this.cacheVNode()},render:function(){var t=this.$slots.default,e=$o(t),r=e&&e.componentOptions;if(r){var n=hi(r),i=this,o=i.include,a=i.exclude;if(o&&(!n||!je(o,n))||a&&n&&je(a,n))return e;var s=this,c=s.cache,u=s.keys,f=e.key==null?r.Ctor.cid+(r.tag?"::".concat(r.tag):""):e.key;c[f]?(e.componentInstance=c[f].componentInstance,Rt(u,f),u.push(f)):(this.vnodeToCache=e,this.keyToCache=f),e.data.keepAlive=!0}return e||t&&t[0]}},zc={KeepAlive:Bc};function Wc(t){var e={};e.get=function(){return ot},Object.defineProperty(t,"config",e),t.util={warn:dc,extend:N,mergeOptions:Jt,defineReactive:It},t.set=dn,t.delete=ho,t.nextTick=gn,t.observable=function(r){return yt(r),r},t.options=Object.create(null),gr.forEach(function(r){t.options[r+"s"]=Object.create(null)}),t.options._base=t,N(t.options.components,zc),Dc(t),Nc(t),Mc(t),Hc(t)}Wc(B);Object.defineProperty(B.prototype,"$isServer",{get:kt});Object.defineProperty(B.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}});Object.defineProperty(B,"FunctionalRenderContext",{value:yn});B.version=zs;var qc=ut("style,class"),Gc=ut("input,textarea,option,select,progress"),Jc=function(t,e,r){return r==="value"&&Gc(t)&&e!=="button"||r==="selected"&&t==="option"||r==="checked"&&t==="input"||r==="muted"&&t==="video"},Do=ut("contenteditable,draggable,spellcheck"),Kc=ut("events,caret,typing,plaintext-only"),Yc=function(t,e){return ar(e)||e==="false"?"false":t==="contenteditable"&&Kc(e)?e:"true"},Xc=ut("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible"),Yr="http://www.w3.org/1999/xlink",On=function(t){return t.charAt(5)===":"&&t.slice(0,5)==="xlink"},No=function(t){return On(t)?t.slice(6,t.length):""},ar=function(t){return t==null||t===!1};function Qc(t){for(var e=t.data,r=t,n=t;d(n.componentInstance);)n=n.componentInstance._vnode,n&&n.data&&(e=mi(n.data,e));for(;d(r=r.parent);)r&&r.data&&(e=mi(e,r.data));return Vc(e.staticClass,e.class)}function mi(t,e){return{staticClass:$n(t.staticClass,e.staticClass),class:d(t.class)?[t.class,e.class]:e.class}}function Vc(t,e){return d(t)||d(e)?$n(t,En(e)):""}function $n(t,e){return t?e?t+" "+e:t:e||""}function En(t){return Array.isArray(t)?Zc(t):K(t)?tu(t):typeof t=="string"?t:""}function Zc(t){for(var e="",r,n=0,i=t.length;n<i;n++)d(r=En(t[n]))&&r!==""&&(e&&(e+=" "),e+=r);return e}function tu(t){var e="";for(var r in t)t[r]&&(e&&(e+=" "),e+=r);return e}var eu={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},ru=ut("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),An=ut("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),Mo=function(t){return ru(t)||An(t)};function nu(t){if(An(t))return"svg";if(t==="math")return"math"}var Le=Object.create(null);function iu(t){if(!nt)return!0;if(Mo(t))return!1;if(t=t.toLowerCase(),Le[t]!=null)return Le[t];var e=document.createElement(t);return t.indexOf("-")>-1?Le[t]=e.constructor===window.HTMLUnknownElement||e.constructor===window.HTMLElement:Le[t]=/HTMLUnknownElement/.test(e.toString())}var Xr=ut("text,number,password,search,email,tel,url");function ou(t){if(typeof t=="string"){var e=document.querySelector(t);return e||document.createElement("div")}else return t}function au(t,e){var r=document.createElement(t);return t!=="select"||e.data&&e.data.attrs&&e.data.attrs.multiple!==void 0&&r.setAttribute("multiple","multiple"),r}function su(t,e){return document.createElementNS(eu[t],e)}function cu(t){return document.createTextNode(t)}function uu(t){return document.createComment(t)}function fu(t,e,r){t.insertBefore(e,r)}function lu(t,e){t.removeChild(e)}function pu(t,e){t.appendChild(e)}function du(t){return t.parentNode}function hu(t){return t.nextSibling}function vu(t){return t.tagName}function gu(t,e){t.textContent=e}function mu(t,e){t.setAttribute(e,"")}var bu=Object.freeze({__proto__:null,createElement:au,createElementNS:su,createTextNode:cu,createComment:uu,insertBefore:fu,removeChild:lu,appendChild:pu,parentNode:du,nextSibling:hu,tagName:vu,setTextContent:gu,setStyleScope:mu}),_u={create:function(t,e){ne(e)},update:function(t,e){t.data.ref!==e.data.ref&&(ne(t,!0),ne(e))},destroy:function(t){ne(t,!0)}};function ne(t,e){var r=t.data.ref;if(!!d(r)){var n=t.context,i=t.componentInstance||t.elm,o=e?null:i,a=e?void 0:i;if(D(r)){wt(r,n,[o],n,"template ref function");return}var s=t.data.refInFor,c=typeof r=="string"||typeof r=="number",u=tt(r),f=n.$refs;if(c||u){if(s){var h=c?f[r]:r.value;e?P(h)&&Rt(h,i):P(h)?h.includes(i)||h.push(i):c?(f[r]=[i],bi(n,r,f[r])):r.value=[i]}else if(c){if(e&&f[r]!==i)return;f[r]=a,bi(n,r,o)}else if(u){if(e&&r.value!==i)return;r.value=o}}}}function bi(t,e,r){var n=t._setupState;n&&X(n,e)&&(tt(n[e])?n[e].value=r:n[e]=r)}var xt=new rt("",{},[]),he=["create","activate","update","remove","destroy"];function Mt(t,e){return t.key===e.key&&t.asyncFactory===e.asyncFactory&&(t.tag===e.tag&&t.isComment===e.isComment&&d(t.data)===d(e.data)&&yu(t,e)||z(t.isAsyncPlaceholder)&&O(e.asyncFactory.error))}function yu(t,e){if(t.tag!=="input")return!0;var r,n=d(r=t.data)&&d(r=r.attrs)&&r.type,i=d(r=e.data)&&d(r=r.attrs)&&r.type;return n===i||Xr(n)&&Xr(i)}function wu(t,e,r){var n,i,o={};for(n=e;n<=r;++n)i=t[n].key,d(i)&&(o[i]=n);return o}function Su(t){var e,r,n={},i=t.modules,o=t.nodeOps;for(e=0;e<he.length;++e)for(n[he[e]]=[],r=0;r<i.length;++r)d(i[r][he[e]])&&n[he[e]].push(i[r][he[e]]);function a(p){return new rt(o.tagName(p).toLowerCase(),{},[],void 0,p)}function s(p,l){function g(){--g.listeners===0&&c(p)}return g.listeners=l,g}function c(p){var l=o.parentNode(p);d(l)&&o.removeChild(l,p)}function u(p,l,g,w,x,I,$){if(d(p.elm)&&d(I)&&(p=I[$]=Dr(p)),p.isRootInsert=!x,!f(p,l,g,w)){var E=p.data,R=p.children,k=p.tag;d(k)?(p.elm=p.ns?o.createElementNS(p.ns,k):o.createElement(k,p),S(p),_(p,R,l),d(E)&&b(p,l),m(g,p.elm,w)):z(p.isComment)?(p.elm=o.createComment(p.text),m(g,p.elm,w)):(p.elm=o.createTextNode(p.text),m(g,p.elm,w))}}function f(p,l,g,w){var x=p.data;if(d(x)){var I=d(p.componentInstance)&&x.keepAlive;if(d(x=x.hook)&&d(x=x.init)&&x(p,!1),d(p.componentInstance))return h(p,l),m(g,p.elm,w),z(I)&&v(p,l,g,w),!0}}function h(p,l){d(p.data.pendingInsert)&&(l.push.apply(l,p.data.pendingInsert),p.data.pendingInsert=null),p.elm=p.componentInstance.$el,y(p)?(b(p,l),S(p)):(ne(p),l.push(p))}function v(p,l,g,w){for(var x,I=p;I.componentInstance;)if(I=I.componentInstance._vnode,d(x=I.data)&&d(x=x.transition)){for(x=0;x<n.activate.length;++x)n.activate[x](xt,I);l.push(I);break}m(g,p.elm,w)}function m(p,l,g){d(p)&&(d(g)?o.parentNode(g)===p&&o.insertBefore(p,l,g):o.appendChild(p,l))}function _(p,l,g){if(P(l))for(var w=0;w<l.length;++w)u(l[w],g,p.elm,null,!0,l,w);else Oe(p.text)&&o.appendChild(p.elm,o.createTextNode(String(p.text)))}function y(p){for(;p.componentInstance;)p=p.componentInstance._vnode;return d(p.tag)}function b(p,l){for(var g=0;g<n.create.length;++g)n.create[g](xt,p);e=p.data.hook,d(e)&&(d(e.create)&&e.create(xt,p),d(e.insert)&&l.push(p))}function S(p){var l;if(d(l=p.fnScopeId))o.setStyleScope(p.elm,l);else for(var g=p;g;)d(l=g.context)&&d(l=l.$options._scopeId)&&o.setStyleScope(p.elm,l),g=g.parent;d(l=Ht)&&l!==p.context&&l!==p.fnContext&&d(l=l.$options._scopeId)&&o.setStyleScope(p.elm,l)}function C(p,l,g,w,x,I){for(;w<=x;++w)u(g[w],I,p,l,!1,g,w)}function A(p){var l,g,w=p.data;if(d(w))for(d(l=w.hook)&&d(l=l.destroy)&&l(p),l=0;l<n.destroy.length;++l)n.destroy[l](p);if(d(l=p.children))for(g=0;g<p.children.length;++g)A(p.children[g])}function T(p,l,g){for(;l<=g;++l){var w=p[l];d(w)&&(d(w.tag)?(L(w),A(w)):c(w.elm))}}function L(p,l){if(d(l)||d(p.data)){var g,w=n.remove.length+1;for(d(l)?l.listeners+=w:l=s(p.elm,w),d(g=p.componentInstance)&&d(g=g._vnode)&&d(g.data)&&L(g,l),g=0;g<n.remove.length;++g)n.remove[g](p,l);d(g=p.data.hook)&&d(g=g.remove)?g(p,l):l()}else c(p.elm)}function F(p,l,g,w,x){for(var I=0,$=0,E=l.length-1,R=l[0],k=l[E],j=g.length-1,q=g[0],it=g[j],Lt,Dt,Nt,Xt,Cr=!x;I<=E&&$<=j;)O(R)?R=l[++I]:O(k)?k=l[--E]:Mt(R,q)?(W(R,q,w,g,$),R=l[++I],q=g[++$]):Mt(k,it)?(W(k,it,w,g,j),k=l[--E],it=g[--j]):Mt(R,it)?(W(R,it,w,g,j),Cr&&o.insertBefore(p,R.elm,o.nextSibling(k.elm)),R=l[++I],it=g[--j]):Mt(k,q)?(W(k,q,w,g,$),Cr&&o.insertBefore(p,k.elm,R.elm),k=l[--E],q=g[++$]):(O(Lt)&&(Lt=wu(l,I,E)),Dt=d(q.key)?Lt[q.key]:U(q,l,I,E),O(Dt)?u(q,w,p,R.elm,!1,g,$):(Nt=l[Dt],Mt(Nt,q)?(W(Nt,q,w,g,$),l[Dt]=void 0,Cr&&o.insertBefore(p,Nt.elm,R.elm)):u(q,w,p,R.elm,!1,g,$)),q=g[++$]);I>E?(Xt=O(g[j+1])?null:g[j+1].elm,C(p,Xt,g,$,j,w)):$>j&&T(l,I,E)}function U(p,l,g,w){for(var x=g;x<w;x++){var I=l[x];if(d(I)&&Mt(p,I))return x}}function W(p,l,g,w,x,I){if(p!==l){d(l.elm)&&d(w)&&(l=w[x]=Dr(l));var $=l.elm=p.elm;if(z(p.isAsyncPlaceholder)){d(l.asyncFactory.resolved)?ht(p.elm,l,g):l.isAsyncPlaceholder=!0;return}if(z(l.isStatic)&&z(p.isStatic)&&l.key===p.key&&(z(l.isCloned)||z(l.isOnce))){l.componentInstance=p.componentInstance;return}var E,R=l.data;d(R)&&d(E=R.hook)&&d(E=E.prepatch)&&E(p,l);var k=p.children,j=l.children;if(d(R)&&y(l)){for(E=0;E<n.update.length;++E)n.update[E](p,l);d(E=R.hook)&&d(E=E.update)&&E(p,l)}O(l.text)?d(k)&&d(j)?k!==j&&F($,k,j,g,I):d(j)?(d(p.text)&&o.setTextContent($,""),C($,null,j,0,j.length-1,g)):d(k)?T(k,0,k.length-1):d(p.text)&&o.setTextContent($,""):p.text!==l.text&&o.setTextContent($,l.text),d(R)&&d(E=R.hook)&&d(E=E.postpatch)&&E(p,l)}}function pt(p,l,g){if(z(g)&&d(p.parent))p.parent.data.pendingInsert=l;else for(var w=0;w<l.length;++w)l[w].data.hook.insert(l[w])}var dt=ut("attrs,class,staticClass,staticStyle,key");function ht(p,l,g,w){var x,I=l.tag,$=l.data,E=l.children;if(w=w||$&&$.pre,l.elm=p,z(l.isComment)&&d(l.asyncFactory))return l.isAsyncPlaceholder=!0,!0;if(d($)&&(d(x=$.hook)&&d(x=x.init)&&x(l,!0),d(x=l.componentInstance)))return h(l,g),!0;if(d(I)){if(d(E))if(!p.hasChildNodes())_(l,E,g);else if(d(x=$)&&d(x=x.domProps)&&d(x=x.innerHTML)){if(x!==p.innerHTML)return!1}else{for(var R=!0,k=p.firstChild,j=0;j<E.length;j++){if(!k||!ht(k,E[j],g,w)){R=!1;break}k=k.nextSibling}if(!R||k)return!1}if(d($)){var q=!1;for(var it in $)if(!dt(it)){q=!0,b(l,g);break}!q&&$.class&&ae($.class)}}else p.data!==l.text&&(p.data=l.text);return!0}return function(l,g,w,x){if(O(g)){d(l)&&A(l);return}var I=!1,$=[];if(O(l))I=!0,u(g,$);else{var E=d(l.nodeType);if(!E&&Mt(l,g))W(l,g,$,null,null,x);else{if(E){if(l.nodeType===1&&l.hasAttribute(Bn)&&(l.removeAttribute(Bn),w=!0),z(w)&&ht(l,g,$))return pt(g,$,!0),l;l=a(l)}var R=l.elm,k=o.parentNode(R);if(u(g,$,R._leaveCb?null:k,o.nextSibling(R)),d(g.parent))for(var j=g.parent,q=y(g);j;){for(var it=0;it<n.destroy.length;++it)n.destroy[it](j);if(j.elm=g.elm,q){for(var Lt=0;Lt<n.create.length;++Lt)n.create[Lt](xt,j);var Dt=j.data.hook.insert;if(Dt.merged)for(var Nt=Dt.fns.slice(1),Xt=0;Xt<Nt.length;Xt++)Nt[Xt]()}else ne(j);j=j.parent}d(k)?T([l],0,0):d(l.tag)&&A(l)}}return pt(g,$,I),g.elm}}var Cu={create:$r,update:$r,destroy:function(e){$r(e,xt)}};function $r(t,e){(t.data.directives||e.data.directives)&&xu(t,e)}function xu(t,e){var r=t===xt,n=e===xt,i=_i(t.data.directives,t.context),o=_i(e.data.directives,e.context),a=[],s=[],c,u,f;for(c in o)u=i[c],f=o[c],u?(f.oldValue=u.value,f.oldArg=u.arg,ve(f,"update",e,t),f.def&&f.def.componentUpdated&&s.push(f)):(ve(f,"bind",e,t),f.def&&f.def.inserted&&a.push(f));if(a.length){var h=function(){for(var v=0;v<a.length;v++)ve(a[v],"inserted",e,t)};r?Ct(e,"insert",h):h()}if(s.length&&Ct(e,"postpatch",function(){for(var v=0;v<s.length;v++)ve(s[v],"componentUpdated",e,t)}),!r)for(c in i)o[c]||ve(i[c],"unbind",t,t,n)}var Ou=Object.create(null);function _i(t,e){var r=Object.create(null);if(!t)return r;var n,i;for(n=0;n<t.length;n++){if(i=t[n],i.modifiers||(i.modifiers=Ou),r[$u(i)]=i,e._setupState&&e._setupState.__sfc){var o=i.def||or(e,"_setupState","v-"+i.name);typeof o=="function"?i.def={bind:o,update:o}:i.def=o}i.def=i.def||or(e.$options,"directives",i.name)}return r}function $u(t){return t.rawName||"".concat(t.name,".").concat(Object.keys(t.modifiers||{}).join("."))}function ve(t,e,r,n,i){var o=t.def&&t.def[e];if(o)try{o(r.elm,t,r,n,i)}catch(a){Gt(a,r.context,"directive ".concat(t.name," ").concat(e," hook"))}}var Eu=[_u,Cu];function yi(t,e){var r=e.componentOptions;if(!(d(r)&&r.Ctor.options.inheritAttrs===!1)&&!(O(t.data.attrs)&&O(e.data.attrs))){var n,i,o,a=e.elm,s=t.data.attrs||{},c=e.data.attrs||{};(d(c.__ob__)||z(c._v_attr_proxy))&&(c=e.data.attrs=N({},c));for(n in c)i=c[n],o=s[n],o!==i&&wi(a,n,i,e.data.pre);(ce||ln)&&c.value!==s.value&&wi(a,"value",c.value);for(n in s)O(c[n])&&(On(n)?a.removeAttributeNS(Yr,No(n)):Do(n)||a.removeAttribute(n))}}function wi(t,e,r,n){n||t.tagName.indexOf("-")>-1?Si(t,e,r):Xc(e)?ar(r)?t.removeAttribute(e):(r=e==="allowfullscreen"&&t.tagName==="EMBED"?"true":e,t.setAttribute(e,r)):Do(e)?t.setAttribute(e,Yc(e,r)):On(e)?ar(r)?t.removeAttributeNS(Yr,No(e)):t.setAttributeNS(Yr,e,r):Si(t,e,r)}function Si(t,e,r){if(ar(r))t.removeAttribute(e);else{if(ce&&!ue&&t.tagName==="TEXTAREA"&&e==="placeholder"&&r!==""&&!t.__ieph){var n=function(i){i.stopImmediatePropagation(),t.removeEventListener("input",n)};t.addEventListener("input",n),t.__ieph=!0}t.setAttribute(e,r)}}var Au={create:yi,update:yi};function Ci(t,e){var r=e.elm,n=e.data,i=t.data;if(!(O(n.staticClass)&&O(n.class)&&(O(i)||O(i.staticClass)&&O(i.class)))){var o=Qc(e),a=r._transitionClasses;d(a)&&(o=$n(o,En(a))),o!==r._prevClass&&(r.setAttribute("class",o),r._prevClass=o)}}var Pu={create:Ci,update:Ci},Er="__r",Ar="__c";function Tu(t){if(d(t[Er])){var e=ce?"change":"input";t[e]=[].concat(t[Er],t[e]||[]),delete t[Er]}d(t[Ar])&&(t.change=[].concat(t[Ar],t.change||[]),delete t[Ar])}var xe;function Iu(t,e,r){var n=xe;return function i(){var o=e.apply(null,arguments);o!==null&&Fo(t,i,r,n)}}var Ru=Ur&&!(zn&&Number(zn[1])<=53);function ku(t,e,r,n){if(Ru){var i=ko,o=e;e=o._wrapper=function(a){if(a.target===a.currentTarget||a.timeStamp>=i||a.timeStamp<=0||a.target.ownerDocument!==document)return o.apply(this,arguments)}}xe.addEventListener(t,e,fo?{capture:r,passive:n}:r)}function Fo(t,e,r,n){(n||xe).removeEventListener(t,e._wrapper||e,r)}function Pr(t,e){if(!(O(t.data.on)&&O(e.data.on))){var r=e.data.on||{},n=t.data.on||{};xe=e.elm||t.elm,Tu(r),yo(r,n,ku,Fo,Iu,e.context),xe=void 0}}var ju={create:Pr,update:Pr,destroy:function(t){return Pr(t,xt)}},De;function xi(t,e){if(!(O(t.data.domProps)&&O(e.data.domProps))){var r,n,i=e.elm,o=t.data.domProps||{},a=e.data.domProps||{};(d(a.__ob__)||z(a._v_attr_proxy))&&(a=e.data.domProps=N({},a));for(r in o)r in a||(i[r]="");for(r in a){if(n=a[r],r==="textContent"||r==="innerHTML"){if(e.children&&(e.children.length=0),n===o[r])continue;i.childNodes.length===1&&i.removeChild(i.childNodes[0])}if(r==="value"&&i.tagName!=="PROGRESS"){i._value=n;var s=O(n)?"":String(n);Lu(i,s)&&(i.value=s)}else if(r==="innerHTML"&&An(i.tagName)&&O(i.innerHTML)){De=De||document.createElement("div"),De.innerHTML="<svg>".concat(n,"</svg>");for(var c=De.firstChild;i.firstChild;)i.removeChild(i.firstChild);for(;c.firstChild;)i.appendChild(c.firstChild)}else if(n!==o[r])try{i[r]=n}catch(u){}}}}function Lu(t,e){return!t.composing&&(t.tagName==="OPTION"||Du(t,e)||Nu(t,e))}function Du(t,e){var r=!0;try{r=document.activeElement!==t}catch(n){}return r&&t.value!==e}function Nu(t,e){var r=t.value,n=t._vModifiers;if(d(n)){if(n.number)return _e(r)!==_e(e);if(n.trim)return r.trim()!==e.trim()}return r!==e}var Mu={create:xi,update:xi},Fu=Kt(function(t){var e={},r=/;(?![^(]*\))/g,n=/:(.+)/;return t.split(r).forEach(function(i){if(i){var o=i.split(n);o.length>1&&(e[o[0].trim()]=o[1].trim())}}),e});function Tr(t){var e=Uo(t.style);return t.staticStyle?N(t.staticStyle,e):e}function Uo(t){return Array.isArray(t)?oo(t):typeof t=="string"?Fu(t):t}function Uu(t,e){var r={},n;if(e)for(var i=t;i.componentInstance;)i=i.componentInstance._vnode,i&&i.data&&(n=Tr(i.data))&&N(r,n);(n=Tr(t.data))&&N(r,n);for(var o=t;o=o.parent;)o.data&&(n=Tr(o.data))&&N(r,n);return r}var Hu=/^--/,Oi=/\s*!important$/,$i=function(t,e,r){if(Hu.test(e))t.style.setProperty(e,r);else if(Oi.test(r))t.style.setProperty($e(e),r.replace(Oi,""),"important");else{var n=Bu(e);if(Array.isArray(r))for(var i=0,o=r.length;i<o;i++)t.style[n]=r[i];else t.style[n]=r}},Ei=["Webkit","Moz","ms"],Ne,Bu=Kt(function(t){if(Ne=Ne||document.createElement("div").style,t=Wt(t),t!=="filter"&&t in Ne)return t;for(var e=t.charAt(0).toUpperCase()+t.slice(1),r=0;r<Ei.length;r++){var n=Ei[r]+e;if(n in Ne)return n}});function Ai(t,e){var r=e.data,n=t.data;if(!(O(r.staticStyle)&&O(r.style)&&O(n.staticStyle)&&O(n.style))){var i,o,a=e.elm,s=n.staticStyle,c=n.normalizedStyle||n.style||{},u=s||c,f=Uo(e.data.style)||{};e.data.normalizedStyle=d(f.__ob__)?N({},f):f;var h=Uu(e,!0);for(o in u)O(h[o])&&$i(a,o,"");for(o in h)i=h[o],i!==u[o]&&$i(a,o,i==null?"":i)}}var zu={create:Ai,update:Ai},Ho=/\s+/;function Bo(t,e){if(!(!e||!(e=e.trim())))if(t.classList)e.indexOf(" ")>-1?e.split(Ho).forEach(function(n){return t.classList.add(n)}):t.classList.add(e);else{var r=" ".concat(t.getAttribute("class")||""," ");r.indexOf(" "+e+" ")<0&&t.setAttribute("class",(r+e).trim())}}function zo(t,e){if(!(!e||!(e=e.trim())))if(t.classList)e.indexOf(" ")>-1?e.split(Ho).forEach(function(i){return t.classList.remove(i)}):t.classList.remove(e),t.classList.length||t.removeAttribute("class");else{for(var r=" ".concat(t.getAttribute("class")||""," "),n=" "+e+" ";r.indexOf(n)>=0;)r=r.replace(n," ");r=r.trim(),r?t.setAttribute("class",r):t.removeAttribute("class")}}function Wo(t){if(!!t){if(typeof t=="object"){var e={};return t.css!==!1&&N(e,Pi(t.name||"v")),N(e,t),e}else if(typeof t=="string")return Pi(t)}}var Pi=Kt(function(t){return{enterClass:"".concat(t,"-enter"),enterToClass:"".concat(t,"-enter-to"),enterActiveClass:"".concat(t,"-enter-active"),leaveClass:"".concat(t,"-leave"),leaveToClass:"".concat(t,"-leave-to"),leaveActiveClass:"".concat(t,"-leave-active")}}),qo=nt&&!ue,te="transition",Ir="animation",ze="transition",sr="transitionend",Qr="animation",Go="animationend";qo&&(window.ontransitionend===void 0&&window.onwebkittransitionend!==void 0&&(ze="WebkitTransition",sr="webkitTransitionEnd"),window.onanimationend===void 0&&window.onwebkitanimationend!==void 0&&(Qr="WebkitAnimation",Go="webkitAnimationEnd"));var Ti=nt?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:function(t){return t()};function Jo(t){Ti(function(){Ti(t)})}function Bt(t,e){var r=t._transitionClasses||(t._transitionClasses=[]);r.indexOf(e)<0&&(r.push(e),Bo(t,e))}function mt(t,e){t._transitionClasses&&Rt(t._transitionClasses,e),zo(t,e)}function Ko(t,e,r){var n=Yo(t,e),i=n.type,o=n.timeout,a=n.propCount;if(!i)return r();var s=i===te?sr:Go,c=0,u=function(){t.removeEventListener(s,f),r()},f=function(h){h.target===t&&++c>=a&&u()};setTimeout(function(){c<a&&u()},o+1),t.addEventListener(s,f)}var Wu=/\b(transform|all)(,|$)/;function Yo(t,e){var r=window.getComputedStyle(t),n=(r[ze+"Delay"]||"").split(", "),i=(r[ze+"Duration"]||"").split(", "),o=Ii(n,i),a=(r[Qr+"Delay"]||"").split(", "),s=(r[Qr+"Duration"]||"").split(", "),c=Ii(a,s),u,f=0,h=0;e===te?o>0&&(u=te,f=o,h=i.length):e===Ir?c>0&&(u=Ir,f=c,h=s.length):(f=Math.max(o,c),u=f>0?o>c?te:Ir:null,h=u?u===te?i.length:s.length:0);var v=u===te&&Wu.test(r[ze+"Property"]);return{type:u,timeout:f,propCount:h,hasTransform:v}}function Ii(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max.apply(null,e.map(function(r,n){return Ri(r)+Ri(t[n])}))}function Ri(t){return Number(t.slice(0,-1).replace(",","."))*1e3}function Vr(t,e){var r=t.elm;d(r._leaveCb)&&(r._leaveCb.cancelled=!0,r._leaveCb());var n=Wo(t.data.transition);if(!O(n)&&!(d(r._enterCb)||r.nodeType!==1)){for(var i=n.css,o=n.type,a=n.enterClass,s=n.enterToClass,c=n.enterActiveClass,u=n.appearClass,f=n.appearToClass,h=n.appearActiveClass,v=n.beforeEnter,m=n.enter,_=n.afterEnter,y=n.enterCancelled,b=n.beforeAppear,S=n.appear,C=n.afterAppear,A=n.appearCancelled,T=n.duration,L=Ht,F=Ht.$vnode;F&&F.parent;)L=F.context,F=F.parent;var U=!L._isMounted||!t.isRootInsert;if(!(U&&!S&&S!=="")){var W=U&&u?u:a,pt=U&&h?h:c,dt=U&&f?f:s,ht=U&&b||v,p=U&&D(S)?S:m,l=U&&C||_,g=U&&A||y,w=_e(K(T)?T.enter:T),x=i!==!1&&!ue,I=Pn(p),$=r._enterCb=Ve(function(){x&&(mt(r,dt),mt(r,pt)),$.cancelled?(x&&mt(r,W),g&&g(r)):l&&l(r),r._enterCb=null});t.data.show||Ct(t,"insert",function(){var E=r.parentNode,R=E&&E._pending&&E._pending[t.key];R&&R.tag===t.tag&&R.elm._leaveCb&&R.elm._leaveCb(),p&&p(r,$)}),ht&&ht(r),x&&(Bt(r,W),Bt(r,pt),Jo(function(){mt(r,W),$.cancelled||(Bt(r,dt),I||(Qo(w)?setTimeout($,w):Ko(r,o,$)))})),t.data.show&&(e&&e(),p&&p(r,$)),!x&&!I&&$()}}}function Xo(t,e){var r=t.elm;d(r._enterCb)&&(r._enterCb.cancelled=!0,r._enterCb());var n=Wo(t.data.transition);if(O(n)||r.nodeType!==1)return e();if(d(r._leaveCb))return;var i=n.css,o=n.type,a=n.leaveClass,s=n.leaveToClass,c=n.leaveActiveClass,u=n.beforeLeave,f=n.leave,h=n.afterLeave,v=n.leaveCancelled,m=n.delayLeave,_=n.duration,y=i!==!1&&!ue,b=Pn(f),S=_e(K(_)?_.leave:_),C=r._leaveCb=Ve(function(){r.parentNode&&r.parentNode._pending&&(r.parentNode._pending[t.key]=null),y&&(mt(r,s),mt(r,c)),C.cancelled?(y&&mt(r,a),v&&v(r)):(e(),h&&h(r)),r._leaveCb=null});m?m(A):A();function A(){C.cancelled||(!t.data.show&&r.parentNode&&((r.parentNode._pending||(r.parentNode._pending={}))[t.key]=t),u&&u(r),y&&(Bt(r,a),Bt(r,c),Jo(function(){mt(r,a),C.cancelled||(Bt(r,s),b||(Qo(S)?setTimeout(C,S):Ko(r,o,C)))})),f&&f(r,C),!y&&!b&&C())}}function Qo(t){return typeof t=="number"&&!isNaN(t)}function Pn(t){if(O(t))return!1;var e=t.fns;return d(e)?Pn(Array.isArray(e)?e[0]:e):(t._length||t.length)>1}function ki(t,e){e.data.show!==!0&&Vr(e)}var qu=nt?{create:ki,activate:ki,remove:function(t,e){t.data.show!==!0?Xo(t,e):e()}}:{},Gu=[Au,Pu,ju,Mu,zu,qu],Ju=Gu.concat(Eu),Ku=Su({nodeOps:bu,modules:Ju});ue&&document.addEventListener("selectionchange",function(){var t=document.activeElement;t&&t.vmodel&&Tn(t,"input")});var Vo={inserted:function(t,e,r,n){r.tag==="select"?(n.elm&&!n.elm._vOptions?Ct(r,"postpatch",function(){Vo.componentUpdated(t,e,r)}):ji(t,e,r.context),t._vOptions=[].map.call(t.options,cr)):(r.tag==="textarea"||Xr(t.type))&&(t._vModifiers=e.modifiers,e.modifiers.lazy||(t.addEventListener("compositionstart",Yu),t.addEventListener("compositionend",Ni),t.addEventListener("change",Ni),ue&&(t.vmodel=!0)))},componentUpdated:function(t,e,r){if(r.tag==="select"){ji(t,e,r.context);var n=t._vOptions,i=t._vOptions=[].map.call(t.options,cr);if(i.some(function(a,s){return!qt(a,n[s])})){var o=t.multiple?e.value.some(function(a){return Di(a,i)}):e.value!==e.oldValue&&Di(e.value,i);o&&Tn(t,"change")}}}};function ji(t,e,r){Li(t,e),(ce||ln)&&setTimeout(function(){Li(t,e)},0)}function Li(t,e,r){var n=e.value,i=t.multiple;if(!(i&&!Array.isArray(n))){for(var o,a,s=0,c=t.options.length;s<c;s++)if(a=t.options[s],i)o=so(n,cr(a))>-1,a.selected!==o&&(a.selected=o);else if(qt(cr(a),n)){t.selectedIndex!==s&&(t.selectedIndex=s);return}i||(t.selectedIndex=-1)}}function Di(t,e){return e.every(function(r){return!qt(r,t)})}function cr(t){return"_value"in t?t._value:t.value}function Yu(t){t.target.composing=!0}function Ni(t){!t.target.composing||(t.target.composing=!1,Tn(t.target,"input"))}function Tn(t,e){var r=document.createEvent("HTMLEvents");r.initEvent(e,!0,!0),t.dispatchEvent(r)}function Zr(t){return t.componentInstance&&(!t.data||!t.data.transition)?Zr(t.componentInstance._vnode):t}var Xu={bind:function(t,e,r){var n=e.value;r=Zr(r);var i=r.data&&r.data.transition,o=t.__vOriginalDisplay=t.style.display==="none"?"":t.style.display;n&&i?(r.data.show=!0,Vr(r,function(){t.style.display=o})):t.style.display=n?o:"none"},update:function(t,e,r){var n=e.value,i=e.oldValue;if(!n!=!i){r=Zr(r);var o=r.data&&r.data.transition;o?(r.data.show=!0,n?Vr(r,function(){t.style.display=t.__vOriginalDisplay}):Xo(r,function(){t.style.display="none"})):t.style.display=n?t.__vOriginalDisplay:"none"}},unbind:function(t,e,r,n,i){i||(t.style.display=t.__vOriginalDisplay)}},Qu={model:Vo,show:Xu},Zo={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]};function tn(t){var e=t&&t.componentOptions;return e&&e.Ctor.options.abstract?tn($o(e.children)):t}function ta(t){var e={},r=t.$options;for(var n in r.propsData)e[n]=t[n];var i=r._parentListeners;for(var n in i)e[Wt(n)]=i[n];return e}function Mi(t,e){if(/\d-keep-alive$/.test(e.tag))return t("keep-alive",{props:e.componentOptions.propsData})}function Vu(t){for(;t=t.parent;)if(t.data.transition)return!0}function Zu(t,e){return e.key===t.key&&e.tag===t.tag}var tf=function(t){return t.tag||we(t)},ef=function(t){return t.name==="show"},rf={name:"transition",props:Zo,abstract:!0,render:function(t){var e=this,r=this.$slots.default;if(!!r&&(r=r.filter(tf),!!r.length)){var n=this.mode,i=r[0];if(Vu(this.$vnode))return i;var o=tn(i);if(!o)return i;if(this._leaving)return Mi(t,i);var a="__transition-".concat(this._uid,"-");o.key=o.key==null?o.isComment?a+"comment":a+o.tag:Oe(o.key)?String(o.key).indexOf(a)===0?o.key:a+o.key:o.key;var s=(o.data||(o.data={})).transition=ta(this),c=this._vnode,u=tn(c);if(o.data.directives&&o.data.directives.some(ef)&&(o.data.show=!0),u&&u.data&&!Zu(o,u)&&!we(u)&&!(u.componentInstance&&u.componentInstance._vnode.isComment)){var f=u.data.transition=N({},s);if(n==="out-in")return this._leaving=!0,Ct(f,"afterLeave",function(){e._leaving=!1,e.$forceUpdate()}),Mi(t,i);if(n==="in-out"){if(we(o))return c;var h,v=function(){h()};Ct(s,"afterEnter",v),Ct(s,"enterCancelled",v),Ct(f,"delayLeave",function(m){h=m})}}return i}}},ea=N({tag:String,moveClass:String},Zo);delete ea.mode;var nf={props:ea,beforeMount:function(){var t=this,e=this._update;this._update=function(r,n){var i=To(t);t.__patch__(t._vnode,t.kept,!1,!0),t._vnode=t.kept,i(),e.call(t,r,n)}},render:function(t){for(var e=this.tag||this.$vnode.data.tag||"span",r=Object.create(null),n=this.prevChildren=this.children,i=this.$slots.default||[],o=this.children=[],a=ta(this),s=0;s<i.length;s++){var c=i[s];c.tag&&c.key!=null&&String(c.key).indexOf("__vlist")!==0&&(o.push(c),r[c.key]=c,(c.data||(c.data={})).transition=a)}if(n){for(var u=[],f=[],s=0;s<n.length;s++){var c=n[s];c.data.transition=a,c.data.pos=c.elm.getBoundingClientRect(),r[c.key]?u.push(c):f.push(c)}this.kept=t(e,null,u),this.removed=f}return t(e,null,o)},updated:function(){var t=this.prevChildren,e=this.moveClass||(this.name||"v")+"-move";!t.length||!this.hasMove(t[0].elm,e)||(t.forEach(of),t.forEach(af),t.forEach(sf),this._reflow=document.body.offsetHeight,t.forEach(function(r){if(r.data.moved){var n=r.elm,i=n.style;Bt(n,e),i.transform=i.WebkitTransform=i.transitionDuration="",n.addEventListener(sr,n._moveCb=function o(a){a&&a.target!==n||(!a||/transform$/.test(a.propertyName))&&(n.removeEventListener(sr,o),n._moveCb=null,mt(n,e))})}}))},methods:{hasMove:function(t,e){if(!qo)return!1;if(this._hasMove)return this._hasMove;var r=t.cloneNode();t._transitionClasses&&t._transitionClasses.forEach(function(i){zo(r,i)}),Bo(r,e),r.style.display="none",this.$el.appendChild(r);var n=Yo(r);return this.$el.removeChild(r),this._hasMove=n.hasTransform}}};function of(t){t.elm._moveCb&&t.elm._moveCb(),t.elm._enterCb&&t.elm._enterCb()}function af(t){t.data.newPos=t.elm.getBoundingClientRect()}function sf(t){var e=t.data.pos,r=t.data.newPos,n=e.left-r.left,i=e.top-r.top;if(n||i){t.data.moved=!0;var o=t.elm.style;o.transform=o.WebkitTransform="translate(".concat(n,"px,").concat(i,"px)"),o.transitionDuration="0s"}}var cf={Transition:rf,TransitionGroup:nf};B.config.mustUseProp=Jc;B.config.isReservedTag=Mo;B.config.isReservedAttr=qc;B.config.getTagNamespace=nu;B.config.isUnknownElement=iu;N(B.options.directives,Qu);N(B.options.components,cf);B.prototype.__patch__=nt?Ku:H;B.prototype.$mount=function(t,e){return t=t&&nt?ou(t):void 0,Vs(this,t,e)};nt&&setTimeout(function(){ot.devtools&&Ze&&Ze.emit("init",B)},0);var uf=!0;B.util.warn;function ff(){return ra().__VUE_DEVTOOLS_GLOBAL_HOOK__}function ra(){return typeof navigator<"u"&&typeof window<"u"?window:typeof global<"u"?global:{}}const lf=typeof Proxy=="function",pf="devtools-plugin:setup",df="plugin:settings:set";let Qt,en;function hf(){var t;return Qt!==void 0||(typeof window<"u"&&window.performance?(Qt=!0,en=window.performance):typeof global<"u"&&((t=global.perf_hooks)===null||t===void 0?void 0:t.performance)?(Qt=!0,en=global.perf_hooks.performance):Qt=!1),Qt}function vf(){return hf()?en.now():Date.now()}class gf{constructor(e,r){this.target=null,this.targetQueue=[],this.onQueue=[],this.plugin=e,this.hook=r;const n={};if(e.settings)for(const a in e.settings){const s=e.settings[a];n[a]=s.defaultValue}const i=`__vue-devtools-plugin-settings__${e.id}`;let o=Object.assign({},n);try{const a=localStorage.getItem(i),s=JSON.parse(a);Object.assign(o,s)}catch(a){}this.fallbacks={getSettings(){return o},setSettings(a){try{localStorage.setItem(i,JSON.stringify(a))}catch(s){}o=a},now(){return vf()}},r&&r.on(df,(a,s)=>{a===this.plugin.id&&this.fallbacks.setSettings(s)}),this.proxiedOn=new Proxy({},{get:(a,s)=>this.target?this.target.on[s]:(...c)=>{this.onQueue.push({method:s,args:c})}}),this.proxiedTarget=new Proxy({},{get:(a,s)=>this.target?this.target[s]:s==="on"?this.proxiedOn:Object.keys(this.fallbacks).includes(s)?(...c)=>(this.targetQueue.push({method:s,args:c,resolve:()=>{}}),this.fallbacks[s](...c)):(...c)=>new Promise(u=>{this.targetQueue.push({method:s,args:c,resolve:u})})})}async setRealTarget(e){this.target=e;for(const r of this.onQueue)this.target.on[r.method](...r.args);for(const r of this.targetQueue)r.resolve(await this.target[r.method](...r.args))}}function na(t,e){const r=t,n=ra(),i=ff(),o=lf&&r.enableEarlyProxy;if(i&&(n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__||!o))i.emit(pf,t,e);else{const a=o?new gf(r,i):null;(n.__VUE_DEVTOOLS_PLUGINS__=n.__VUE_DEVTOOLS_PLUGINS__||[]).push({pluginDescriptor:r,setupFn:e,proxy:a}),a&&e(a.proxiedTarget)}}/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */const mf=Symbol();var zt;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(zt||(zt={}));const ia=typeof window<"u",oa=typeof __VUE_PROD_DEVTOOLS__<"u"&&__VUE_PROD_DEVTOOLS__&&!0&&ia,Fi=(()=>typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof global=="object"&&global.global===global?global:typeof globalThis=="object"?globalThis:{HTMLElement:null})();function bf(t,{autoBom:e=!1}={}){return e&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t}function In(t,e,r){const n=new XMLHttpRequest;n.open("GET",t),n.responseType="blob",n.onload=function(){ca(n.response,e,r)},n.onerror=function(){console.error("could not download file")},n.send()}function aa(t){const e=new XMLHttpRequest;e.open("HEAD",t,!1);try{e.send()}catch(r){}return e.status>=200&&e.status<=299}function We(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(e){const r=document.createEvent("MouseEvents");r.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(r)}}const qe=typeof navigator=="object"?navigator:{userAgent:""},sa=(()=>/Macintosh/.test(qe.userAgent)&&/AppleWebKit/.test(qe.userAgent)&&!/Safari/.test(qe.userAgent))(),ca=ia?typeof HTMLAnchorElement<"u"&&"download"in HTMLAnchorElement.prototype&&!sa?_f:"msSaveOrOpenBlob"in qe?yf:wf:()=>{};function _f(t,e="download",r){const n=document.createElement("a");n.download=e,n.rel="noopener",typeof t=="string"?(n.href=t,n.origin!==location.origin?aa(n.href)?In(t,e,r):(n.target="_blank",We(n)):We(n)):(n.href=URL.createObjectURL(t),setTimeout(function(){URL.revokeObjectURL(n.href)},4e4),setTimeout(function(){We(n)},0))}function yf(t,e="download",r){if(typeof t=="string")if(aa(t))In(t,e,r);else{const n=document.createElement("a");n.href=t,n.target="_blank",setTimeout(function(){We(n)})}else navigator.msSaveOrOpenBlob(bf(t,r),e)}function wf(t,e,r,n){if(n=n||open("","_blank"),n&&(n.document.title=n.document.body.innerText="downloading..."),typeof t=="string")return In(t,e,r);const i=t.type==="application/octet-stream",o=/constructor/i.test(String(Fi.HTMLElement))||"safari"in Fi,a=/CriOS\/[\d]+/.test(navigator.userAgent);if((a||i&&o||sa)&&typeof FileReader<"u"){const s=new FileReader;s.onloadend=function(){let c=s.result;if(typeof c!="string")throw n=null,new Error("Wrong reader.result type");c=a?c:c.replace(/^data:[^;]*;/,"data:attachment/file;"),n?n.location.href=c:location.assign(c),n=null},s.readAsDataURL(t)}else{const s=URL.createObjectURL(t);n?n.location.assign(s):location.href=s,n=null,setTimeout(function(){URL.revokeObjectURL(s)},4e4)}}function G(t,e){const r="\u{1F34D} "+t;typeof __VUE_DEVTOOLS_TOAST__=="function"?__VUE_DEVTOOLS_TOAST__(r,e):e==="error"?console.error(r):e==="warn"?console.warn(r):console.log(r)}function Rn(t){return"_a"in t&&"install"in t}function ua(){if(!("clipboard"in navigator))return G("Your browser doesn't support the Clipboard API","error"),!0}function fa(t){return t instanceof Error&&t.message.toLowerCase().includes("document is not focused")?(G('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.',"warn"),!0):!1}async function Sf(t){if(!ua())try{await navigator.clipboard.writeText(JSON.stringify(t.state.value)),G("Global state copied to clipboard.")}catch(e){if(fa(e))return;G("Failed to serialize the state. Check the console for more details.","error"),console.error(e)}}async function Cf(t){if(!ua())try{la(t,JSON.parse(await navigator.clipboard.readText())),G("Global state pasted from clipboard.")}catch(e){if(fa(e))return;G("Failed to deserialize the state from clipboard. Check the console for more details.","error"),console.error(e)}}async function xf(t){try{ca(new Blob([JSON.stringify(t.state.value)],{type:"text/plain;charset=utf-8"}),"pinia-state.json")}catch(e){G("Failed to export the state as JSON. Check the console for more details.","error"),console.error(e)}}let vt;function Of(){vt||(vt=document.createElement("input"),vt.type="file",vt.accept=".json");function t(){return new Promise((e,r)=>{vt.onchange=async()=>{const n=vt.files;if(!n)return e(null);const i=n.item(0);return e(i?{text:await i.text(),file:i}:null)},vt.oncancel=()=>e(null),vt.onerror=r,vt.click()})}return t}async function $f(t){try{const r=await Of()();if(!r)return;const{text:n,file:i}=r;la(t,JSON.parse(n)),G(`Global state imported from "${i.name}".`)}catch(e){G("Failed to import the state from JSON. Check the console for more details.","error"),console.error(e)}}function la(t,e){for(const r in e){const n=t.state.value[r];n?Object.assign(n,e[r]):t.state.value[r]=e[r]}}function at(t){return{_custom:{display:t}}}const pa="\u{1F34D} Pinia (root)",rn="_root";function Ef(t){return Rn(t)?{id:rn,label:pa}:{id:t.$id,label:t.$id}}function Af(t){if(Rn(t)){const r=Array.from(t._s.keys()),n=t._s;return{state:r.map(o=>({editable:!0,key:o,value:t.state.value[o]})),getters:r.filter(o=>n.get(o)._getters).map(o=>{const a=n.get(o);return{editable:!1,key:o,value:a._getters.reduce((s,c)=>(s[c]=a[c],s),{})}})}}const e={state:Object.keys(t.$state).map(r=>({editable:!0,key:r,value:t.$state[r]}))};return t._getters&&t._getters.length&&(e.getters=t._getters.map(r=>({editable:!1,key:r,value:t[r]}))),t._customProperties.size&&(e.customProperties=Array.from(t._customProperties).map(r=>({editable:!0,key:r,value:t[r]}))),e}function Pf(t){return t?Array.isArray(t)?t.reduce((e,r)=>(e.keys.push(r.key),e.operations.push(r.type),e.oldValue[r.key]=r.oldValue,e.newValue[r.key]=r.newValue,e),{oldValue:{},keys:[],operations:[],newValue:{}}):{operation:at(t.type),key:at(t.key),oldValue:t.oldValue,newValue:t.newValue}:{}}function Tf(t){switch(t){case zt.direct:return"mutation";case zt.patchFunction:return"$patch";case zt.patchObject:return"$patch";default:return"unknown"}}let ie=!0;const Ge=[],Ft="pinia:mutations",J="pinia",{assign:If}=Object,ur=t=>"\u{1F34D} "+t;function Rf(t,e){na({id:"dev.esm.pinia",label:"Pinia \u{1F34D}",logo:"https://pinia.vuejs.org/logo.svg",packageName:"pinia",homepage:"https://pinia.vuejs.org",componentStateTypes:Ge,app:t},r=>{typeof r.now!="function"&&G("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."),r.addTimelineLayer({id:Ft,label:"Pinia \u{1F34D}",color:15064968}),r.addInspector({id:J,label:"Pinia \u{1F34D}",icon:"storage",treeFilterPlaceholder:"Search stores",actions:[{icon:"content_copy",action:()=>{Sf(e)},tooltip:"Serialize and copy the state"},{icon:"content_paste",action:async()=>{await Cf(e),r.sendInspectorTree(J),r.sendInspectorState(J)},tooltip:"Replace the state with the content of your clipboard"},{icon:"save",action:()=>{xf(e)},tooltip:"Save the state as a JSON file"},{icon:"folder_open",action:async()=>{await $f(e),r.sendInspectorTree(J),r.sendInspectorState(J)},tooltip:"Import the state from a JSON file"}],nodeActions:[{icon:"restore",tooltip:'Reset the state (with "$reset")',action:n=>{const i=e._s.get(n);i?typeof i.$reset!="function"?G(`Cannot reset "${n}" store because it doesn't have a "$reset" method implemented.`,"warn"):(i.$reset(),G(`Store "${n}" reset.`)):G(`Cannot reset "${n}" store because it wasn't found.`,"warn")}}]}),r.on.inspectComponent((n,i)=>{const o=n.componentInstance&&n.componentInstance.proxy;if(o&&o._pStores){const a=n.componentInstance.proxy._pStores;Object.values(a).forEach(s=>{n.instanceData.state.push({type:ur(s.$id),key:"state",editable:!0,value:s._isOptionsAPI?{_custom:{value:br(s.$state),actions:[{icon:"restore",tooltip:"Reset the state of this store",action:()=>s.$reset()}]}}:Object.keys(s.$state).reduce((c,u)=>(c[u]=s.$state[u],c),{})}),s._getters&&s._getters.length&&n.instanceData.state.push({type:ur(s.$id),key:"getters",editable:!1,value:s._getters.reduce((c,u)=>{try{c[u]=s[u]}catch(f){c[u]=f}return c},{})})})}}),r.on.getInspectorTree(n=>{if(n.app===t&&n.inspectorId===J){let i=[e];i=i.concat(Array.from(e._s.values())),n.rootNodes=(n.filter?i.filter(o=>"$id"in o?o.$id.toLowerCase().includes(n.filter.toLowerCase()):pa.toLowerCase().includes(n.filter.toLowerCase())):i).map(Ef)}}),r.on.getInspectorState(n=>{if(n.app===t&&n.inspectorId===J){const i=n.nodeId===rn?e:e._s.get(n.nodeId);if(!i)return;i&&(n.state=Af(i))}}),r.on.editInspectorState((n,i)=>{if(n.app===t&&n.inspectorId===J){const o=n.nodeId===rn?e:e._s.get(n.nodeId);if(!o)return G(`store "${n.nodeId}" not found`,"error");const{path:a}=n;Rn(o)?a.unshift("state"):(a.length!==1||!o._customProperties.has(a[0])||a[0]in o.$state)&&a.unshift("$state"),ie=!1,n.set(o,a,n.state.value),ie=!0}}),r.on.editComponentState(n=>{if(n.type.startsWith("\u{1F34D}")){const i=n.type.replace(/^🍍\s*/,""),o=e._s.get(i);if(!o)return G(`store "${i}" not found`,"error");const{path:a}=n;if(a[0]!=="state")return G(`Invalid path for store "${i}":
${a}
Only state can be modified.`);a[0]="$state",ie=!1,n.set(o,a,n.state.value),ie=!0}})})}function kf(t,e){Ge.includes(ur(e.$id))||Ge.push(ur(e.$id)),na({id:"dev.esm.pinia",label:"Pinia \u{1F34D}",logo:"https://pinia.vuejs.org/logo.svg",packageName:"pinia",homepage:"https://pinia.vuejs.org",componentStateTypes:Ge,app:t,settings:{logStoreChanges:{label:"Notify about new/deleted stores",type:"boolean",defaultValue:!0}}},r=>{const n=typeof r.now=="function"?r.now.bind(r):Date.now;e.$onAction(({after:a,onError:s,name:c,args:u})=>{const f=da++;r.addTimelineEvent({layerId:Ft,event:{time:n(),title:"\u{1F6EB} "+c,subtitle:"start",data:{store:at(e.$id),action:at(c),args:u},groupId:f}}),a(h=>{Ot=void 0,r.addTimelineEvent({layerId:Ft,event:{time:n(),title:"\u{1F6EC} "+c,subtitle:"end",data:{store:at(e.$id),action:at(c),args:u,result:h},groupId:f}})}),s(h=>{Ot=void 0,r.addTimelineEvent({layerId:Ft,event:{time:n(),logType:"error",title:"\u{1F4A5} "+c,subtitle:"end",data:{store:at(e.$id),action:at(c),args:u,error:h},groupId:f}})})},!0),e._customProperties.forEach(a=>{us(()=>ss(e[a]),(s,c)=>{r.notifyComponentUpdate(),r.sendInspectorState(J),ie&&r.addTimelineEvent({layerId:Ft,event:{time:n(),title:"Change",subtitle:a,data:{newValue:s,oldValue:c},groupId:Ot}})},{deep:!0})}),e.$subscribe(({events:a,type:s},c)=>{if(r.notifyComponentUpdate(),r.sendInspectorState(J),!ie)return;const u={time:n(),title:Tf(s),data:If({store:at(e.$id)},Pf(a)),groupId:Ot};s===zt.patchFunction?u.subtitle="\u2935\uFE0F":s===zt.patchObject?u.subtitle="\u{1F9E9}":a&&!Array.isArray(a)&&(u.subtitle=a.type),a&&(u.data["rawEvent(s)"]={_custom:{display:"DebuggerEvent",type:"object",tooltip:"raw DebuggerEvent[]",value:a}}),r.addTimelineEvent({layerId:Ft,event:u})},{detached:!0,flush:"sync"});const i=e._hotUpdate;e._hotUpdate=mo(a=>{i(a),r.addTimelineEvent({layerId:Ft,event:{time:n(),title:"\u{1F525} "+e.$id,subtitle:"HMR update",data:{store:at(e.$id),info:at("HMR update")}}}),r.notifyComponentUpdate(),r.sendInspectorTree(J),r.sendInspectorState(J)});const{$dispose:o}=e;e.$dispose=()=>{o(),r.notifyComponentUpdate(),r.sendInspectorTree(J),r.sendInspectorState(J),r.getSettings().logStoreChanges&&G(`Disposed "${e.$id}" store \u{1F5D1}`)},r.notifyComponentUpdate(),r.sendInspectorTree(J),r.sendInspectorState(J),r.getSettings().logStoreChanges&&G(`"${e.$id}" store installed \u{1F195}`)})}let da=0,Ot;function Ui(t,e,r){const n=e.reduce((i,o)=>(i[o]=br(t)[o],i),{});for(const i in n)t[i]=function(){const o=da,a=r?new Proxy(t,{get(...c){return Ot=o,Reflect.get(...c)},set(...c){return Ot=o,Reflect.set(...c)}}):t;Ot=o;const s=n[i].apply(a,arguments);return Ot=void 0,s}}function jf({app:t,store:e,options:r}){if(e.$id.startsWith("__hot:"))return;e._isOptionsAPI=!!r.state,Ui(e,Object.keys(r.actions),e._isOptionsAPI);const n=e._hotUpdate;br(e)._hotUpdate=function(i){n.apply(this,arguments),Ui(e,Object.keys(i._hmrPayload.actions),!!e._isOptionsAPI)},kf(t,e)}function Lf(){const t=ls(!0),e=t.run(()=>os({}));let r=[];const n=mo({install(i){},use(i){return!this._a&&!uf||r.push(i),this},_p:r,_a:null,_e:t,_s:new Map,state:e});return oa&&typeof Proxy<"u"&&n.use(jf),n}const Df=function(t){t.mixin({beforeCreate(){const e=this.$options;if(e.pinia){const r=e.pinia;if(!this._provided){const n={};Object.defineProperty(this,"_provided",{get:()=>n,set:i=>Object.assign(n,i)})}this._provided[mf]=r,this.$pinia||(this.$pinia=r),r._a=this,oa&&Rf(r._a,r)}else!this.$pinia&&e.parent&&e.parent.$pinia&&(this.$pinia=e.parent.$pinia)},destroyed(){delete this._pStores}})},Nf="/assets/logo.da9b9095.svg";function ha(t,e,r,n,i,o,a,s){var c=typeof t=="function"?t.options:t;e&&(c.render=e,c.staticRenderFns=r,c._compiled=!0),n&&(c.functional=!0),o&&(c._scopeId="data-v-"+o);var u;if(a?(u=function(v){v=v||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!v&&typeof __VUE_SSR_CONTEXT__<"u"&&(v=__VUE_SSR_CONTEXT__),i&&i.call(this,v),v&&v._registeredComponents&&v._registeredComponents.add(a)},c._ssrRegister=u):i&&(u=s?function(){i.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:i),u)if(c.functional){c._injectStyles=u;var f=c.render;c.render=function(m,_){return u.call(_),f(m,_)}}else{var h=c.beforeCreate;c.beforeCreate=h?[].concat(h,u):[u]}return{exports:t,options:c}}const Mf={};var Ff=function(){var e=this,r=e._self._c;return r("div",{attrs:{id:"app"}},[r("header",{staticClass:"site-header"},[e._m(0),r("nav",[r("router-link",{attrs:{to:"/"}},[e._v("Blog")]),r("router-link",{attrs:{to:"/tic-tac-toe"}},[e._v("Game")]),r("router-link",{attrs:{to:"/overseas-export"}},[e._v("Export")]),r("router-link",{attrs:{to:"/agent-portal"}},[e._v("Agent Portal")]),r("router-link",{attrs:{to:"/codex"}},[e._v("Codex")]),r("router-link",{attrs:{to:"/about"}},[e._v("About")])],1)]),r("router-view")],1)},Uf=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"brand"},[e("img",{staticClass:"logo",attrs:{alt:"Vue logo",src:Nf,width:"36",height:"36"}}),e("div",[e("p",{staticClass:"site-name"},[t._v("adminfoo Labs")]),e("p",{staticClass:"site-subtitle"},[t._v("Cinematic Agent Playground")])])])}],Hf=ha(Mf,Ff,Uf,!1,null,"ccf530df",null,null);const Bf=Hf.exports,zf="modulepreload",Wf=function(t){return"/"+t},Hi={},Vt=function(e,r,n){if(!r||r.length===0)return e();const i=document.getElementsByTagName("link");return Promise.all(r.map(o=>{if(o=Wf(o),o in Hi)return;Hi[o]=!0;const a=o.endsWith(".css"),s=a?'[rel="stylesheet"]':"";if(!!n)for(let f=i.length-1;f>=0;f--){const h=i[f];if(h.href===o&&(!a||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${s}`))return;const u=document.createElement("link");if(u.rel=a?"stylesheet":zf,a||(u.as="script",u.crossOrigin=""),u.href=o,document.head.appendChild(u),a)return new Promise((f,h)=>{u.addEventListener("load",f),u.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>e())};/*!
  * vue-router v3.6.5
  * (c) 2022 Evan You
  * @license MIT
  */function st(t,e){for(var r in e)t[r]=e[r];return t}var qf=/[!'()*]/g,Gf=function(t){return"%"+t.charCodeAt(0).toString(16)},Jf=/%2C/g,Zt=function(t){return encodeURIComponent(t).replace(qf,Gf).replace(Jf,",")};function nn(t){try{return decodeURIComponent(t)}catch(e){}return t}function Kf(t,e,r){e===void 0&&(e={});var n=r||Yf,i;try{i=n(t||"")}catch(s){i={}}for(var o in e){var a=e[o];i[o]=Array.isArray(a)?a.map(Bi):Bi(a)}return i}var Bi=function(t){return t==null||typeof t=="object"?t:String(t)};function Yf(t){var e={};return t=t.trim().replace(/^(\?|#|&)/,""),t&&t.split("&").forEach(function(r){var n=r.replace(/\+/g," ").split("="),i=nn(n.shift()),o=n.length>0?nn(n.join("=")):null;e[i]===void 0?e[i]=o:Array.isArray(e[i])?e[i].push(o):e[i]=[e[i],o]}),e}function Xf(t){var e=t?Object.keys(t).map(function(r){var n=t[r];if(n===void 0)return"";if(n===null)return Zt(r);if(Array.isArray(n)){var i=[];return n.forEach(function(o){o!==void 0&&(o===null?i.push(Zt(r)):i.push(Zt(r)+"="+Zt(o)))}),i.join("&")}return Zt(r)+"="+Zt(n)}).filter(function(r){return r.length>0}).join("&"):null;return e?"?"+e:""}var fr=/\/?$/;function lr(t,e,r,n){var i=n&&n.options.stringifyQuery,o=e.query||{};try{o=on(o)}catch(s){}var a={name:e.name||t&&t.name,meta:t&&t.meta||{},path:e.path||"/",hash:e.hash||"",query:o,params:e.params||{},fullPath:zi(e,i),matched:t?Qf(t):[]};return r&&(a.redirectedFrom=zi(r,i)),Object.freeze(a)}function on(t){if(Array.isArray(t))return t.map(on);if(t&&typeof t=="object"){var e={};for(var r in t)e[r]=on(t[r]);return e}else return t}var jt=lr(null,{path:"/"});function Qf(t){for(var e=[];t;)e.unshift(t),t=t.parent;return e}function zi(t,e){var r=t.path,n=t.query;n===void 0&&(n={});var i=t.hash;i===void 0&&(i="");var o=e||Xf;return(r||"/")+o(n)+i}function va(t,e,r){return e===jt?t===e:e?t.path&&e.path?t.path.replace(fr,"")===e.path.replace(fr,"")&&(r||t.hash===e.hash&&Je(t.query,e.query)):t.name&&e.name?t.name===e.name&&(r||t.hash===e.hash&&Je(t.query,e.query)&&Je(t.params,e.params)):!1:!1}function Je(t,e){if(t===void 0&&(t={}),e===void 0&&(e={}),!t||!e)return t===e;var r=Object.keys(t).sort(),n=Object.keys(e).sort();return r.length!==n.length?!1:r.every(function(i,o){var a=t[i],s=n[o];if(s!==i)return!1;var c=e[i];return a==null||c==null?a===c:typeof a=="object"&&typeof c=="object"?Je(a,c):String(a)===String(c)})}function Vf(t,e){return t.path.replace(fr,"/").indexOf(e.path.replace(fr,"/"))===0&&(!e.hash||t.hash===e.hash)&&Zf(t.query,e.query)}function Zf(t,e){for(var r in e)if(!(r in t))return!1;return!0}function ga(t){for(var e=0;e<t.matched.length;e++){var r=t.matched[e];for(var n in r.instances){var i=r.instances[n],o=r.enteredCbs[n];if(!(!i||!o)){delete r.enteredCbs[n];for(var a=0;a<o.length;a++)i._isBeingDestroyed||o[a](i)}}}}var tl={name:"RouterView",functional:!0,props:{name:{type:String,default:"default"}},render:function(e,r){var n=r.props,i=r.children,o=r.parent,a=r.data;a.routerView=!0;for(var s=o.$createElement,c=n.name,u=o.$route,f=o._routerViewCache||(o._routerViewCache={}),h=0,v=!1;o&&o._routerRoot!==o;){var m=o.$vnode?o.$vnode.data:{};m.routerView&&h++,m.keepAlive&&o._directInactive&&o._inactive&&(v=!0),o=o.$parent}if(a.routerViewDepth=h,v){var _=f[c],y=_&&_.component;return y?(_.configProps&&Wi(y,a,_.route,_.configProps),s(y,a,i)):s()}var b=u.matched[h],S=b&&b.components[c];if(!b||!S)return f[c]=null,s();f[c]={component:S},a.registerRouteInstance=function(A,T){var L=b.instances[c];(T&&L!==A||!T&&L===A)&&(b.instances[c]=T)},(a.hook||(a.hook={})).prepatch=function(A,T){b.instances[c]=T.componentInstance},a.hook.init=function(A){A.data.keepAlive&&A.componentInstance&&A.componentInstance!==b.instances[c]&&(b.instances[c]=A.componentInstance),ga(u)};var C=b.props&&b.props[c];return C&&(st(f[c],{route:u,configProps:C}),Wi(S,a,u,C)),s(S,a,i)}};function Wi(t,e,r,n){var i=e.props=el(r,n);if(i){i=e.props=st({},i);var o=e.attrs=e.attrs||{};for(var a in i)(!t.props||!(a in t.props))&&(o[a]=i[a],delete i[a])}}function el(t,e){switch(typeof e){case"undefined":return;case"object":return e;case"function":return e(t);case"boolean":return e?t.params:void 0}}function ma(t,e,r){var n=t.charAt(0);if(n==="/")return t;if(n==="?"||n==="#")return e+t;var i=e.split("/");(!r||!i[i.length-1])&&i.pop();for(var o=t.replace(/^\//,"").split("/"),a=0;a<o.length;a++){var s=o[a];s===".."?i.pop():s!=="."&&i.push(s)}return i[0]!==""&&i.unshift(""),i.join("/")}function rl(t){var e="",r="",n=t.indexOf("#");n>=0&&(e=t.slice(n),t=t.slice(0,n));var i=t.indexOf("?");return i>=0&&(r=t.slice(i+1),t=t.slice(0,i)),{path:t,query:r,hash:e}}function $t(t){return t.replace(/\/(?:\s*\/)+/g,"/")}var pr=Array.isArray||function(t){return Object.prototype.toString.call(t)=="[object Array]"},pe=ya,nl=kn,il=cl,ol=ba,al=_a,sl=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function kn(t,e){for(var r=[],n=0,i=0,o="",a=e&&e.delimiter||"/",s;(s=sl.exec(t))!=null;){var c=s[0],u=s[1],f=s.index;if(o+=t.slice(i,f),i=f+c.length,u){o+=u[1];continue}var h=t[i],v=s[2],m=s[3],_=s[4],y=s[5],b=s[6],S=s[7];o&&(r.push(o),o="");var C=v!=null&&h!=null&&h!==v,A=b==="+"||b==="*",T=b==="?"||b==="*",L=s[2]||a,F=_||y;r.push({name:m||n++,prefix:v||"",delimiter:L,optional:T,repeat:A,partial:C,asterisk:!!S,pattern:F?ll(F):S?".*":"[^"+Ke(L)+"]+?"})}return i<t.length&&(o+=t.substr(i)),o&&r.push(o),r}function cl(t,e){return ba(kn(t,e),e)}function ul(t){return encodeURI(t).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function fl(t){return encodeURI(t).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function ba(t,e){for(var r=new Array(t.length),n=0;n<t.length;n++)typeof t[n]=="object"&&(r[n]=new RegExp("^(?:"+t[n].pattern+")$",Ln(e)));return function(i,o){for(var a="",s=i||{},c=o||{},u=c.pretty?ul:encodeURIComponent,f=0;f<t.length;f++){var h=t[f];if(typeof h=="string"){a+=h;continue}var v=s[h.name],m;if(v==null)if(h.optional){h.partial&&(a+=h.prefix);continue}else throw new TypeError('Expected "'+h.name+'" to be defined');if(pr(v)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(v)+"`");if(v.length===0){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var _=0;_<v.length;_++){if(m=u(v[_]),!r[f].test(m))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(m)+"`");a+=(_===0?h.prefix:h.delimiter)+m}continue}if(m=h.asterisk?fl(v):u(v),!r[f].test(m))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+m+'"');a+=h.prefix+m}return a}}function Ke(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function ll(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function jn(t,e){return t.keys=e,t}function Ln(t){return t&&t.sensitive?"":"i"}function pl(t,e){var r=t.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)e.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return jn(t,e)}function dl(t,e,r){for(var n=[],i=0;i<t.length;i++)n.push(ya(t[i],e,r).source);var o=new RegExp("(?:"+n.join("|")+")",Ln(r));return jn(o,e)}function hl(t,e,r){return _a(kn(t,r),e,r)}function _a(t,e,r){pr(e)||(r=e||r,e=[]),r=r||{};for(var n=r.strict,i=r.end!==!1,o="",a=0;a<t.length;a++){var s=t[a];if(typeof s=="string")o+=Ke(s);else{var c=Ke(s.prefix),u="(?:"+s.pattern+")";e.push(s),s.repeat&&(u+="(?:"+c+u+")*"),s.optional?s.partial?u=c+"("+u+")?":u="(?:"+c+"("+u+"))?":u=c+"("+u+")",o+=u}}var f=Ke(r.delimiter||"/"),h=o.slice(-f.length)===f;return n||(o=(h?o.slice(0,-f.length):o)+"(?:"+f+"(?=$))?"),i?o+="$":o+=n&&h?"":"(?="+f+"|$)",jn(new RegExp("^"+o,Ln(r)),e)}function ya(t,e,r){return pr(e)||(r=e||r,e=[]),r=r||{},t instanceof RegExp?pl(t,e):pr(t)?dl(t,e,r):hl(t,e,r)}pe.parse=nl;pe.compile=il;pe.tokensToFunction=ol;pe.tokensToRegExp=al;var qi=Object.create(null);function Ye(t,e,r){e=e||{};try{var n=qi[t]||(qi[t]=pe.compile(t));return typeof e.pathMatch=="string"&&(e[0]=e.pathMatch),n(e,{pretty:!0})}catch(i){return""}finally{delete e[0]}}function Dn(t,e,r,n){var i=typeof t=="string"?{path:t}:t;if(i._normalized)return i;if(i.name){i=st({},t);var o=i.params;return o&&typeof o=="object"&&(i.params=st({},o)),i}if(!i.path&&i.params&&e){i=st({},i),i._normalized=!0;var a=st(st({},e.params),i.params);if(e.name)i.name=e.name,i.params=a;else if(e.matched.length){var s=e.matched[e.matched.length-1].path;i.path=Ye(s,a,"path "+e.path)}return i}var c=rl(i.path||""),u=e&&e.path||"/",f=c.path?ma(c.path,u,r||i.append):u,h=Kf(c.query,i.query,n&&n.options.parseQuery),v=i.hash||c.hash;return v&&v.charAt(0)!=="#"&&(v="#"+v),{_normalized:!0,path:f,query:h,hash:v}}var vl=[String,Object],gl=[String,Array],Gi=function(){},ml={name:"RouterLink",props:{to:{type:vl,required:!0},tag:{type:String,default:"a"},custom:Boolean,exact:Boolean,exactPath:Boolean,append:Boolean,replace:Boolean,activeClass:String,exactActiveClass:String,ariaCurrentValue:{type:String,default:"page"},event:{type:gl,default:"click"}},render:function(e){var r=this,n=this.$router,i=this.$route,o=n.resolve(this.to,i,this.append),a=o.location,s=o.route,c=o.href,u={},f=n.options.linkActiveClass,h=n.options.linkExactActiveClass,v=f==null?"router-link-active":f,m=h==null?"router-link-exact-active":h,_=this.activeClass==null?v:this.activeClass,y=this.exactActiveClass==null?m:this.exactActiveClass,b=s.redirectedFrom?lr(null,Dn(s.redirectedFrom),null,n):s;u[y]=va(i,b,this.exactPath),u[_]=this.exact||this.exactPath?u[y]:Vf(i,b);var S=u[y]?this.ariaCurrentValue:null,C=function(p){Ji(p)&&(r.replace?n.replace(a,Gi):n.push(a,Gi))},A={click:Ji};Array.isArray(this.event)?this.event.forEach(function(p){A[p]=C}):A[this.event]=C;var T={class:u},L=!this.$scopedSlots.$hasNormal&&this.$scopedSlots.default&&this.$scopedSlots.default({href:c,route:s,navigate:C,isActive:u[_],isExactActive:u[y]});if(L){if(L.length===1)return L[0];if(L.length>1||!L.length)return L.length===0?e():e("span",{},L)}if(this.tag==="a")T.on=A,T.attrs={href:c,"aria-current":S};else{var F=wa(this.$slots.default);if(F){F.isStatic=!1;var U=F.data=st({},F.data);U.on=U.on||{};for(var W in U.on){var pt=U.on[W];W in A&&(U.on[W]=Array.isArray(pt)?pt:[pt])}for(var dt in A)dt in U.on?U.on[dt].push(A[dt]):U.on[dt]=C;var ht=F.data.attrs=st({},F.data.attrs);ht.href=c,ht["aria-current"]=S}else T.on=A}return e(this.tag,T,this.$slots.default)}};function Ji(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){var e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function wa(t){if(t){for(var e,r=0;r<t.length;r++)if(e=t[r],e.tag==="a"||e.children&&(e=wa(e.children)))return e}}var dr;function an(t){if(!(an.installed&&dr===t)){an.installed=!0,dr=t;var e=function(i){return i!==void 0},r=function(i,o){var a=i.$options._parentVnode;e(a)&&e(a=a.data)&&e(a=a.registerRouteInstance)&&a(i,o)};t.mixin({beforeCreate:function(){e(this.$options.router)?(this._routerRoot=this,this._router=this.$options.router,this._router.init(this),t.util.defineReactive(this,"_route",this._router.history.current)):this._routerRoot=this.$parent&&this.$parent._routerRoot||this,r(this,this)},destroyed:function(){r(this)}}),Object.defineProperty(t.prototype,"$router",{get:function(){return this._routerRoot._router}}),Object.defineProperty(t.prototype,"$route",{get:function(){return this._routerRoot._route}}),t.component("RouterView",tl),t.component("RouterLink",ml);var n=t.config.optionMergeStrategies;n.beforeRouteEnter=n.beforeRouteLeave=n.beforeRouteUpdate=n.created}}var Pe=typeof window<"u";function Me(t,e,r,n,i){var o=e||[],a=r||Object.create(null),s=n||Object.create(null);t.forEach(function(f){sn(o,a,s,f,i)});for(var c=0,u=o.length;c<u;c++)o[c]==="*"&&(o.push(o.splice(c,1)[0]),u--,c--);return{pathList:o,pathMap:a,nameMap:s}}function sn(t,e,r,n,i,o){var a=n.path,s=n.name,c=n.pathToRegexpOptions||{},u=_l(a,i,c.strict);typeof n.caseSensitive=="boolean"&&(c.sensitive=n.caseSensitive);var f={path:u,regex:bl(u,c),components:n.components||{default:n.component},alias:n.alias?typeof n.alias=="string"?[n.alias]:n.alias:[],instances:{},enteredCbs:{},name:s,parent:i,matchAs:o,redirect:n.redirect,beforeEnter:n.beforeEnter,meta:n.meta||{},props:n.props==null?{}:n.components?n.props:{default:n.props}};if(n.children&&n.children.forEach(function(y){var b=o?$t(o+"/"+y.path):void 0;sn(t,e,r,y,f,b)}),e[f.path]||(t.push(f.path),e[f.path]=f),n.alias!==void 0)for(var h=Array.isArray(n.alias)?n.alias:[n.alias],v=0;v<h.length;++v){var m=h[v],_={path:m,children:n.children};sn(t,e,r,_,i,f.path||"/")}s&&(r[s]||(r[s]=f))}function bl(t,e){var r=pe(t,[],e);return r}function _l(t,e,r){return r||(t=t.replace(/\/$/,"")),t[0]==="/"||e==null?t:$t(e.path+"/"+t)}function yl(t,e){var r=Me(t),n=r.pathList,i=r.pathMap,o=r.nameMap;function a(m){Me(m,n,i,o)}function s(m,_){var y=typeof m!="object"?o[m]:void 0;Me([_||m],n,i,o,y),y&&y.alias.length&&Me(y.alias.map(function(b){return{path:b,children:[_]}}),n,i,o,y)}function c(){return n.map(function(m){return i[m]})}function u(m,_,y){var b=Dn(m,_,!1,e),S=b.name;if(S){var C=o[S];if(!C)return v(null,b);var A=C.regex.keys.filter(function(W){return!W.optional}).map(function(W){return W.name});if(typeof b.params!="object"&&(b.params={}),_&&typeof _.params=="object")for(var T in _.params)!(T in b.params)&&A.indexOf(T)>-1&&(b.params[T]=_.params[T]);return b.path=Ye(C.path,b.params),v(C,b,y)}else if(b.path){b.params={};for(var L=0;L<n.length;L++){var F=n[L],U=i[F];if(wl(U.regex,b.path,b.params))return v(U,b,y)}}return v(null,b)}function f(m,_){var y=m.redirect,b=typeof y=="function"?y(lr(m,_,null,e)):y;if(typeof b=="string"&&(b={path:b}),!b||typeof b!="object")return v(null,_);var S=b,C=S.name,A=S.path,T=_.query,L=_.hash,F=_.params;if(T=S.hasOwnProperty("query")?S.query:T,L=S.hasOwnProperty("hash")?S.hash:L,F=S.hasOwnProperty("params")?S.params:F,C)return o[C],u({_normalized:!0,name:C,query:T,hash:L,params:F},void 0,_);if(A){var U=Sl(A,m),W=Ye(U,F);return u({_normalized:!0,path:W,query:T,hash:L},void 0,_)}else return v(null,_)}function h(m,_,y){var b=Ye(y,_.params),S=u({_normalized:!0,path:b});if(S){var C=S.matched,A=C[C.length-1];return _.params=S.params,v(A,_)}return v(null,_)}function v(m,_,y){return m&&m.redirect?f(m,y||_):m&&m.matchAs?h(m,_,m.matchAs):lr(m,_,y,e)}return{match:u,addRoute:s,getRoutes:c,addRoutes:a}}function wl(t,e,r){var n=e.match(t);if(n){if(!r)return!0}else return!1;for(var i=1,o=n.length;i<o;++i){var a=t.keys[i-1];a&&(r[a.name||"pathMatch"]=typeof n[i]=="string"?nn(n[i]):n[i])}return!0}function Sl(t,e){return ma(t,e.parent?e.parent.path:"/",!0)}var Cl=Pe&&window.performance&&window.performance.now?window.performance:Date;function Sa(){return Cl.now().toFixed(3)}var Ca=Sa();function yr(){return Ca}function xa(t){return Ca=t}var Oa=Object.create(null);function $a(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");var t=window.location.protocol+"//"+window.location.host,e=window.location.href.replace(t,""),r=st({},window.history.state);return r.key=yr(),window.history.replaceState(r,"",e),window.addEventListener("popstate",Ki),function(){window.removeEventListener("popstate",Ki)}}function Et(t,e,r,n){if(!!t.app){var i=t.options.scrollBehavior;!i||t.app.$nextTick(function(){var o=xl(),a=i.call(t,e,r,n?o:null);!a||(typeof a.then=="function"?a.then(function(s){Qi(s,o)}).catch(function(s){}):Qi(a,o))})}}function Ea(){var t=yr();t&&(Oa[t]={x:window.pageXOffset,y:window.pageYOffset})}function Ki(t){Ea(),t.state&&t.state.key&&xa(t.state.key)}function xl(){var t=yr();if(t)return Oa[t]}function Ol(t,e){var r=document.documentElement,n=r.getBoundingClientRect(),i=t.getBoundingClientRect();return{x:i.left-n.left-e.x,y:i.top-n.top-e.y}}function Yi(t){return se(t.x)||se(t.y)}function Xi(t){return{x:se(t.x)?t.x:window.pageXOffset,y:se(t.y)?t.y:window.pageYOffset}}function $l(t){return{x:se(t.x)?t.x:0,y:se(t.y)?t.y:0}}function se(t){return typeof t=="number"}var El=/^#\d/;function Qi(t,e){var r=typeof t=="object";if(r&&typeof t.selector=="string"){var n=El.test(t.selector)?document.getElementById(t.selector.slice(1)):document.querySelector(t.selector);if(n){var i=t.offset&&typeof t.offset=="object"?t.offset:{};i=$l(i),e=Ol(n,i)}else Yi(t)&&(e=Xi(t))}else r&&Yi(t)&&(e=Xi(t));e&&("scrollBehavior"in document.documentElement.style?window.scrollTo({left:e.x,top:e.y,behavior:t.behavior}):window.scrollTo(e.x,e.y))}var At=Pe&&function(){var t=window.navigator.userAgent;return(t.indexOf("Android 2.")!==-1||t.indexOf("Android 4.0")!==-1)&&t.indexOf("Mobile Safari")!==-1&&t.indexOf("Chrome")===-1&&t.indexOf("Windows Phone")===-1?!1:window.history&&typeof window.history.pushState=="function"}();function hr(t,e){Ea();var r=window.history;try{if(e){var n=st({},r.state);n.key=yr(),r.replaceState(n,"",t)}else r.pushState({key:xa(Sa())},"",t)}catch(i){window.location[e?"replace":"assign"](t)}}function cn(t){hr(t,!0)}var Yt={redirected:2,aborted:4,cancelled:8,duplicated:16};function Al(t,e){return wr(t,e,Yt.redirected,'Redirected when going from "'+t.fullPath+'" to "'+Rl(e)+'" via a navigation guard.')}function Pl(t,e){var r=wr(t,e,Yt.duplicated,'Avoided redundant navigation to current location: "'+t.fullPath+'".');return r.name="NavigationDuplicated",r}function Vi(t,e){return wr(t,e,Yt.cancelled,'Navigation cancelled from "'+t.fullPath+'" to "'+e.fullPath+'" with a new navigation.')}function Tl(t,e){return wr(t,e,Yt.aborted,'Navigation aborted from "'+t.fullPath+'" to "'+e.fullPath+'" via a navigation guard.')}function wr(t,e,r,n){var i=new Error(n);return i._isRouter=!0,i.from=t,i.to=e,i.type=r,i}var Il=["params","query","hash"];function Rl(t){if(typeof t=="string")return t;if("path"in t)return t.path;var e={};return Il.forEach(function(r){r in t&&(e[r]=t[r])}),JSON.stringify(e,null,2)}function vr(t){return Object.prototype.toString.call(t).indexOf("Error")>-1}function Sr(t,e){return vr(t)&&t._isRouter&&(e==null||t.type===e)}function Zi(t,e,r){var n=function(i){i>=t.length?r():t[i]?e(t[i],function(){n(i+1)}):n(i+1)};n(0)}function kl(t){return function(e,r,n){var i=!1,o=0,a=null;Aa(t,function(s,c,u,f){if(typeof s=="function"&&s.cid===void 0){i=!0,o++;var h=to(function(y){Ll(y)&&(y=y.default),s.resolved=typeof y=="function"?y:dr.extend(y),u.components[f]=y,o--,o<=0&&n()}),v=to(function(y){var b="Failed to resolve async component "+f+": "+y;a||(a=vr(y)?y:new Error(b),n(a))}),m;try{m=s(h,v)}catch(y){v(y)}if(m)if(typeof m.then=="function")m.then(h,v);else{var _=m.component;_&&typeof _.then=="function"&&_.then(h,v)}}}),i||n()}}function Aa(t,e){return Pa(t.map(function(r){return Object.keys(r.components).map(function(n){return e(r.components[n],r.instances[n],r,n)})}))}function Pa(t){return Array.prototype.concat.apply([],t)}var jl=typeof Symbol=="function"&&typeof Symbol.toStringTag=="symbol";function Ll(t){return t.__esModule||jl&&t[Symbol.toStringTag]==="Module"}function to(t){var e=!1;return function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if(!e)return e=!0,t.apply(this,r)}}var ft=function(e,r){this.router=e,this.base=Dl(r),this.current=jt,this.pending=null,this.ready=!1,this.readyCbs=[],this.readyErrorCbs=[],this.errorCbs=[],this.listeners=[]};ft.prototype.listen=function(e){this.cb=e};ft.prototype.onReady=function(e,r){this.ready?e():(this.readyCbs.push(e),r&&this.readyErrorCbs.push(r))};ft.prototype.onError=function(e){this.errorCbs.push(e)};ft.prototype.transitionTo=function(e,r,n){var i=this,o;try{o=this.router.match(e,this.current)}catch(s){throw this.errorCbs.forEach(function(c){c(s)}),s}var a=this.current;this.confirmTransition(o,function(){i.updateRoute(o),r&&r(o),i.ensureURL(),i.router.afterHooks.forEach(function(s){s&&s(o,a)}),i.ready||(i.ready=!0,i.readyCbs.forEach(function(s){s(o)}))},function(s){n&&n(s),s&&!i.ready&&(!Sr(s,Yt.redirected)||a!==jt)&&(i.ready=!0,i.readyErrorCbs.forEach(function(c){c(s)}))})};ft.prototype.confirmTransition=function(e,r,n){var i=this,o=this.current;this.pending=e;var a=function(y){!Sr(y)&&vr(y)&&(i.errorCbs.length?i.errorCbs.forEach(function(b){b(y)}):console.error(y)),n&&n(y)},s=e.matched.length-1,c=o.matched.length-1;if(va(e,o)&&s===c&&e.matched[s]===o.matched[c])return this.ensureURL(),e.hash&&Et(this.router,o,e,!1),a(Pl(o,e));var u=Nl(this.current.matched,e.matched),f=u.updated,h=u.deactivated,v=u.activated,m=[].concat(Fl(h),this.router.beforeHooks,Ul(f),v.map(function(y){return y.beforeEnter}),kl(v)),_=function(y,b){if(i.pending!==e)return a(Vi(o,e));try{y(e,o,function(S){S===!1?(i.ensureURL(!0),a(Tl(o,e))):vr(S)?(i.ensureURL(!0),a(S)):typeof S=="string"||typeof S=="object"&&(typeof S.path=="string"||typeof S.name=="string")?(a(Al(o,e)),typeof S=="object"&&S.replace?i.replace(S):i.push(S)):b(S)})}catch(S){a(S)}};Zi(m,_,function(){var y=Hl(v),b=y.concat(i.router.resolveHooks);Zi(b,_,function(){if(i.pending!==e)return a(Vi(o,e));i.pending=null,r(e),i.router.app&&i.router.app.$nextTick(function(){ga(e)})})})};ft.prototype.updateRoute=function(e){this.current=e,this.cb&&this.cb(e)};ft.prototype.setupListeners=function(){};ft.prototype.teardown=function(){this.listeners.forEach(function(e){e()}),this.listeners=[],this.current=jt,this.pending=null};function Dl(t){if(!t)if(Pe){var e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^https?:\/\/[^\/]+/,"")}else t="/";return t.charAt(0)!=="/"&&(t="/"+t),t.replace(/\/$/,"")}function Nl(t,e){var r,n=Math.max(t.length,e.length);for(r=0;r<n&&t[r]===e[r];r++);return{updated:e.slice(0,r),activated:e.slice(r),deactivated:t.slice(r)}}function Nn(t,e,r,n){var i=Aa(t,function(o,a,s,c){var u=Ml(o,e);if(u)return Array.isArray(u)?u.map(function(f){return r(f,a,s,c)}):r(u,a,s,c)});return Pa(n?i.reverse():i)}function Ml(t,e){return typeof t!="function"&&(t=dr.extend(t)),t.options[e]}function Fl(t){return Nn(t,"beforeRouteLeave",Ta,!0)}function Ul(t){return Nn(t,"beforeRouteUpdate",Ta)}function Ta(t,e){if(e)return function(){return t.apply(e,arguments)}}function Hl(t){return Nn(t,"beforeRouteEnter",function(e,r,n,i){return Bl(e,n,i)})}function Bl(t,e,r){return function(i,o,a){return t(i,o,function(s){typeof s=="function"&&(e.enteredCbs[r]||(e.enteredCbs[r]=[]),e.enteredCbs[r].push(s)),a(s)})}}var Ia=function(t){function e(r,n){t.call(this,r,n),this._startLocation=me(this.base)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var n=this;if(!(this.listeners.length>0)){var i=this.router,o=i.options.scrollBehavior,a=At&&o;a&&this.listeners.push($a());var s=function(){var c=n.current,u=me(n.base);n.current===jt&&u===n._startLocation||n.transitionTo(u,function(f){a&&Et(i,f,c,!0)})};window.addEventListener("popstate",s),this.listeners.push(function(){window.removeEventListener("popstate",s)})}},e.prototype.go=function(n){window.history.go(n)},e.prototype.push=function(n,i,o){var a=this,s=this,c=s.current;this.transitionTo(n,function(u){hr($t(a.base+u.fullPath)),Et(a.router,u,c,!1),i&&i(u)},o)},e.prototype.replace=function(n,i,o){var a=this,s=this,c=s.current;this.transitionTo(n,function(u){cn($t(a.base+u.fullPath)),Et(a.router,u,c,!1),i&&i(u)},o)},e.prototype.ensureURL=function(n){if(me(this.base)!==this.current.fullPath){var i=$t(this.base+this.current.fullPath);n?hr(i):cn(i)}},e.prototype.getCurrentLocation=function(){return me(this.base)},e}(ft);function me(t){var e=window.location.pathname,r=e.toLowerCase(),n=t.toLowerCase();return t&&(r===n||r.indexOf($t(n+"/"))===0)&&(e=e.slice(t.length)),(e||"/")+window.location.search+window.location.hash}var Ra=function(t){function e(r,n,i){t.call(this,r,n),!(i&&zl(this.base))&&eo()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var n=this;if(!(this.listeners.length>0)){var i=this.router,o=i.options.scrollBehavior,a=At&&o;a&&this.listeners.push($a());var s=function(){var u=n.current;!eo()||n.transitionTo(Xe(),function(f){a&&Et(n.router,f,u,!0),At||Qe(f.fullPath)})},c=At?"popstate":"hashchange";window.addEventListener(c,s),this.listeners.push(function(){window.removeEventListener(c,s)})}},e.prototype.push=function(n,i,o){var a=this,s=this,c=s.current;this.transitionTo(n,function(u){ro(u.fullPath),Et(a.router,u,c,!1),i&&i(u)},o)},e.prototype.replace=function(n,i,o){var a=this,s=this,c=s.current;this.transitionTo(n,function(u){Qe(u.fullPath),Et(a.router,u,c,!1),i&&i(u)},o)},e.prototype.go=function(n){window.history.go(n)},e.prototype.ensureURL=function(n){var i=this.current.fullPath;Xe()!==i&&(n?ro(i):Qe(i))},e.prototype.getCurrentLocation=function(){return Xe()},e}(ft);function zl(t){var e=me(t);if(!/^\/#/.test(e))return window.location.replace($t(t+"/#"+e)),!0}function eo(){var t=Xe();return t.charAt(0)==="/"?!0:(Qe("/"+t),!1)}function Xe(){var t=window.location.href,e=t.indexOf("#");return e<0?"":(t=t.slice(e+1),t)}function un(t){var e=window.location.href,r=e.indexOf("#"),n=r>=0?e.slice(0,r):e;return n+"#"+t}function ro(t){At?hr(un(t)):window.location.hash=t}function Qe(t){At?cn(un(t)):window.location.replace(un(t))}var Wl=function(t){function e(r,n){t.call(this,r,n),this.stack=[],this.index=-1}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.push=function(n,i,o){var a=this;this.transitionTo(n,function(s){a.stack=a.stack.slice(0,a.index+1).concat(s),a.index++,i&&i(s)},o)},e.prototype.replace=function(n,i,o){var a=this;this.transitionTo(n,function(s){a.stack=a.stack.slice(0,a.index).concat(s),i&&i(s)},o)},e.prototype.go=function(n){var i=this,o=this.index+n;if(!(o<0||o>=this.stack.length)){var a=this.stack[o];this.confirmTransition(a,function(){var s=i.current;i.index=o,i.updateRoute(a),i.router.afterHooks.forEach(function(c){c&&c(a,s)})},function(s){Sr(s,Yt.duplicated)&&(i.index=o)})}},e.prototype.getCurrentLocation=function(){var n=this.stack[this.stack.length-1];return n?n.fullPath:"/"},e.prototype.ensureURL=function(){},e}(ft),M=function(e){e===void 0&&(e={}),this.app=null,this.apps=[],this.options=e,this.beforeHooks=[],this.resolveHooks=[],this.afterHooks=[],this.matcher=yl(e.routes||[],this);var r=e.mode||"hash";switch(this.fallback=r==="history"&&!At&&e.fallback!==!1,this.fallback&&(r="hash"),Pe||(r="abstract"),this.mode=r,r){case"history":this.history=new Ia(this,e.base);break;case"hash":this.history=new Ra(this,e.base,this.fallback);break;case"abstract":this.history=new Wl(this,e.base);break}},ka={currentRoute:{configurable:!0}};M.prototype.match=function(e,r,n){return this.matcher.match(e,r,n)};ka.currentRoute.get=function(){return this.history&&this.history.current};M.prototype.init=function(e){var r=this;if(this.apps.push(e),e.$once("hook:destroyed",function(){var a=r.apps.indexOf(e);a>-1&&r.apps.splice(a,1),r.app===e&&(r.app=r.apps[0]||null),r.app||r.history.teardown()}),!this.app){this.app=e;var n=this.history;if(n instanceof Ia||n instanceof Ra){var i=function(a){var s=n.current,c=r.options.scrollBehavior,u=At&&c;u&&"fullPath"in a&&Et(r,a,s,!1)},o=function(a){n.setupListeners(),i(a)};n.transitionTo(n.getCurrentLocation(),o,o)}n.listen(function(a){r.apps.forEach(function(s){s._route=a})})}};M.prototype.beforeEach=function(e){return Mn(this.beforeHooks,e)};M.prototype.beforeResolve=function(e){return Mn(this.resolveHooks,e)};M.prototype.afterEach=function(e){return Mn(this.afterHooks,e)};M.prototype.onReady=function(e,r){this.history.onReady(e,r)};M.prototype.onError=function(e){this.history.onError(e)};M.prototype.push=function(e,r,n){var i=this;if(!r&&!n&&typeof Promise<"u")return new Promise(function(o,a){i.history.push(e,o,a)});this.history.push(e,r,n)};M.prototype.replace=function(e,r,n){var i=this;if(!r&&!n&&typeof Promise<"u")return new Promise(function(o,a){i.history.replace(e,o,a)});this.history.replace(e,r,n)};M.prototype.go=function(e){this.history.go(e)};M.prototype.back=function(){this.go(-1)};M.prototype.forward=function(){this.go(1)};M.prototype.getMatchedComponents=function(e){var r=e?e.matched?e:this.resolve(e).route:this.currentRoute;return r?[].concat.apply([],r.matched.map(function(n){return Object.keys(n.components).map(function(i){return n.components[i]})})):[]};M.prototype.resolve=function(e,r,n){r=r||this.history.current;var i=Dn(e,r,n,this),o=this.match(i,r),a=o.redirectedFrom||o.fullPath,s=this.history.base,c=ql(s,a,this.mode);return{location:i,route:o,href:c,normalizedTo:i,resolved:o}};M.prototype.getRoutes=function(){return this.matcher.getRoutes()};M.prototype.addRoute=function(e,r){this.matcher.addRoute(e,r),this.history.current!==jt&&this.history.transitionTo(this.history.getCurrentLocation())};M.prototype.addRoutes=function(e){this.matcher.addRoutes(e),this.history.current!==jt&&this.history.transitionTo(this.history.getCurrentLocation())};Object.defineProperties(M.prototype,ka);var ja=M;function Mn(t,e){return t.push(e),function(){var r=t.indexOf(e);r>-1&&t.splice(r,1)}}function ql(t,e,r){var n=r==="hash"?"#"+e:e;return t?$t(t+"/"+n):n}M.install=an;M.version="3.6.5";M.isNavigationFailure=Sr;M.NavigationFailureType=Yt;M.START_LOCATION=jt;Pe&&window.Vue&&window.Vue.use(M);const Gl=`## \u4E2D\u4ECB\u8005\u6A21\u5F0F\r
\u5728\u89C2\u5BDF\u8005\u6A21\u5F0F\u7684\u7AE0\u8282\uFF0C\u6211\u4EEC\u4E86\u89E3\u4E86 \u901A\u8FC7\u5355\u4E2A\u5BF9\u8C61\u5B9E\u73B0\u591A\u4E8B\u4EF6\u901A\u4FE1\u7684\u65B9\u5F0F\u3002\r
\u8FD9\u4E5F\u5C31\u662F\u6211\u4EEC\u5E38\u8BF4\u7684\u53D1\u5E03/\u8BA2\u9605\u6A21\u5F0F\uFF0C\u6216\u8005\u8BF4 Event Aggregation\u3002\u5F00\u53D1\u8005\r
\u9047\u5230\u8FD9\u79CD\u95EE\u9898\u7684\u65F6\u5019\u7ECF\u5E38\u60F3\u5230\u7684\u662F\u4E2D\u4ECB\u8005\u6A21\u5F0F\uFF0C\u8FD9\u662F\u6B63\u5E38\u7684\uFF0C\u6240\u4EE5\u63A5\u4E0B\u6765\uFF0C\r
\u8BA8\u8BBA\u4E00\u4E0B\u4ED6\u4EEC\u7684\u533A\u522B\u3002\r
\r
\u901A\u8FC7\u67E5\u9605\u5B57\u5178\uFF0C\u5F97\u77E5\uFF0C\u4E2D\u4ECB\u8005\u662F\u8FD9\u4E2A\u610F\u601D\uFF1A \r
a neutral party that assists in negotiations and conflict resolution.\u3002\r
\u4E00\u4E2A\u89E3\u51B3\u51B2\u7A81\u3001\u534F\u5546\u7684\u4E2D\u95F4\u8005\u3002\u5728\u6211\u4EEC\u7684\u65F6\u5019\uFF0C\u4E2D\u4ECB\u8005\u662F\u4E00\u4E2A\u884C\u4E3A\u8BBE\u8BA1\u6A21\u5F0F\u3002\r
\u8FD9\u4E2A\u8BBE\u8BA1\u6211\u4EEC\u5141\u8BB8\u6211\u4EEC\u5B9A\u4E49\u4E00\u4E2A\u7EDF\u4E00\u7684\u63A5\u53E3\u3002\u7CFB\u7EDF\u7684\u4E0D\u540C\u90E8\u5206\u901A\u4FE1\u4F1A\u8C03\u7528\u5230\u7684\u3002\r
\r
\u5982\u679C\u4E00\u4E2A\u7CFB\u7EDF\u7684\u7EC4\u4EF6\u4E4B\u95F4\u51FA\u6765\u4E86\u592A\u591A\u7684\u76F4\u63A5\u8054\u7CFB\uFF0C\u8FD9\u65F6\u5019\uFF0C\u4F60\u5E94\u8BE5\u4F7F\u7528\u4E00\u4E2A\u63A7\u5236\u7684\r
\u4E2D\u5FC3\u70B9\u53D6\u4EE3\u3002\u4E2D\u4ECB\u8005\u964D\u4F4E\u4E86\u8026\u5408\u6027\uFF0C\u4ED6\u901A\u8FC7\u4FDD\u8BC1\u8FD9\u79CD\u65B9\u5F0F\u6765\u5B9E\u73B0\uFF0C\u907F\u514D\u7EC4\u4EF6\u4E4B\u95F4\uFF0C\r
\u76F4\u63A5\u5173\u8054\uFF0C\u5B83\u4EEC\u7684\u4EA4\u4E92\u901A\u8FC7\u4E00\u4E2A\u4E2D\u5FC3\u70B9\uFF0C\u8FD9\u53EF\u4EE5\u5E2E\u52A9\u6211\u4EEC\u63D0\u9AD8\u7EC4\u4EF6\u7684\u590D\u7528\u6027\u4EE5\u53CA\r
\u7CFB\u7EDF\u7684\u89E3\u8026\u3002\r
\r
\u73B0\u5728\u4E16\u754C\u4E2D\u7684\u7C7B\u6BD4\uFF0C\u53EF\u80FD\u5C31\u662F\u673A\u573A\u4EA4\u901A\u63A7\u5236\u7CFB\u7EDF\uFF0C\u4E00\u4E2A\u5854\u63A7\u5236\u98DE\u673A\u8D77\u98DE\u548C\u964D\u843D\uFF0C\r
\u56E0\u4E3A\u6240\u6709\u7684\u901A\u4FE1\u90FD\u662F\u98DE\u673A\u5230\u5854\u7684\u901A\u4FE1\uFF0C\u800C\u4E0D\u662F\u98DE\u673A\u4E4B\u95F4\u7684\u901A\u4FE1\u3002\u8FD9\u4E2A\u96C6\u4E2D\u5316\u7684\u63A7\u5236\u5668\uFF0C\r
\u662F\u8FD9\u4E2A\u7CFB\u7EDF\u6210\u529F\u7684\u5173\u952E\uFF0C\u8FD9\u4E5F\u662F\u4E2D\u4ECB\u8005\u5728\u8F6F\u4EF6\u8BBE\u8BA1\u91CC\u9762\u6240\u5B9A\u4F4D\u7684\u89D2\u8272\u3002\r
\r
\u53E6\u5916\u4E00\u4E2A\u7C7B\u6BD4\u5E94\u8BE5\u662F\uFF0C\u4E8B\u4EF6\u5192\u6CE1\u548C\u4E8B\u4EF6\u59D4\u6D3E\u3002\u5982\u679C\u5728\u6574\u4E2A\u7CFB\u7EDF\u4E2D\uFF0C\u6240\u6709\u7684\u8BA2\u9605\u8005\u90FD\u662F\r
\u4F9D\u8D56\u4E8Edocument\u800C\u4E0D\u662F\u72EC\u7ACB\u7684node\uFF0C\u90A3\u4E48document\u5C31\u76F8\u5F53\u4E8E\u4E00\u4E2A\u4E2D\u4ECB\u8005\uFF0C\u53D6\u4EE3\u4E8E\u7ED1\u5B9A\u4E8E\r
\u5355\u4E2A\u8282\u70B9\u7684\u4E8B\u4EF6\uFF0C\u4E00\u4E2A\u66F4\u9AD8\u754C\u522B\u7684\u5BF9\u8C61\u88AB\u5F53\u505A\u4E3A\u4E2D\u4ECB\u8005\uFF0C\u7528\u4E8E\u901A\u77E5\u8BA2\u9605\u8005\u4EEC\u4EA4\u4E92\u76F8\u5173\u7684\r
\u4E8B\u4EF6\u3002\r
\r
\u5F53\u6211\u4EEC\u8C08\u8BBA\u5230\u4E86\u4E2D\u4ECB\u8005\u548CEventAggregator\u6A21\u5F0F\uFF0C\u6211\u4EEC\u4F1A\u611F\u89C9\u4E24\u8005\u662F\u53EF\u4EE5\u4E92\u76F8\u66FF\u6362\u7684\uFF0C\u56E0\r
\u4E3A\u5B83\u4EEC\u7684\u5B9E\u73B0\u770B\u8D77\u6765\u76F8\u4F3C\u3002\u7136\u800C\uFF0C\u5B83\u4EEC\u7684\u8BED\u610F\u548C\u610F\u56FE\u662F\u975E\u5E38\u4E0D\u540C\u7684\u3002\r
\r
\u5C3D\u7BA1\u4E24\u8005\u7684\u5B9E\u73B0\u4F7F\u7528\u4E86\u76F8\u540C\u7684\u7ED3\u6784\uFF0C\u6211\u4ECD\u7136\u76F8\u4FE1\uFF0C\u8FD9\u8FD9\u91CC\u9762\u8FD8\u6709\u660E\u663E\u7684\u4E0D\u540C\u4E4B\u5904\u3002\u6211\u76F8\u4FE1\uFF0C\r
\u5728\u65E5\u5E38\u4EA4\u6D41\u4E2D\uFF0C\u6211\u4EEC\u5E94\u8BE5\u4E0D\u80FD\u76F8\u4E92\u66FF\u6362/\u6216\u8005\u8BF4\u4EE4\u4EBA\u56F0\u60D1\u3002\r
\r
### \u4E00\u4E2A\u7B80\u5355\u7684\u4E2D\u4ECB\u8005\u6A21\u5F0F\r
\r
\u5728 \u8FD9\u91CC\u6211\u4EEC\u8BF4\uFF0C\u4E2D\u4ECB\u8005\u662F \u7528\u6765\u534F\u8C03\u4E0D\u540C\u5BF9\u8C61\u4E4B\u95F4\u903B\u8F91\u548C\u884C\u4E3A\u7684\u4E00\u4E2A\u5BF9\u8C61\u3002\r
\u5B83\u901A\u8FC7\u53E6\u5916\u4E00\u4E2A\u5BF9\u8C61\u6216\u8005\u662F\u5916\u90E8\u8F93\u5165\u6765\u4F5C\u51FA\u5224\u65AD\u548C\u4EC0\u4E48\u65F6\u5019\u8C03\u7528\u53E6\u5916\u4E00\u4E2A\u5BF9\u8C61\u3002\r
\r
\r
\r
\u4F60\u53EF\u4EE5\u7B80\u5355\u7684\u5199\u8FD9\u6837\u4E00\u4E2A\u5BF9\u8C61\uFF1B\r
\r
\`\`\`\r
var mediator = {};\r
\r
\`\`\`\r
\r
\`\`\`\r
var orgChart = {\r
 \r
  addNewEmployee: function(){\r
 \r
    // getEmployeeDetail provides a view that users interact with\r
    var employeeDetail = this.getEmployeeDetail();\r
 \r
    // when the employee detail is complete, the mediator (the 'orgchart' object)\r
    // decides what should happen next\r
    employeeDetail.on("complete", function(employee){\r
 \r
      // set up additional objects that have additional events, which are used\r
      // by the mediator to do additional things\r
      var managerSelector = this.selectManager(employee);\r
      managerSelector.on("save", function(employee){\r
        employee.save();\r
      });\r
 \r
    });\r
  },\r
 \r
  // ...\r
}\r
\`\`\`\r
\r
\u8FD9\u4E2A\u4F8B\u5B50\u6F14\u793A\u4E86\u4E00\u4E2A\u975E\u5E38\u57FA\u7840\u7684\u4E2D\u4ECB\u8005\u7684\u5B9E\u73B0\uFF0C\u901A\u8FC7\u4E00\u4E2A\u5BF9\u8C61\u52A0\u4E0A\u4E00\u4E9B\u80FD\u591F\u8BA2\u9605\u4E8B\u4EF6\u548C\u89E6\u53D1\u4E8B\u4EF6\u7684\u5DE5\u5177\u65B9\u6CD5\u3002\r
\u8FC7\u53BB\uFF0C\u6211\u5E38\u5E38\u7528\u5C06\u8FD9\u7C7B\u578B\u7684\u5BF9\u8C61\u5F53\u505A\u201C\u5DE5\u4F5C\u6D41\u201D\u5BF9\u8C61\uFF0C\u4F46\u662F\uFF0C\u4E8B\u5B9E\u4E0A\u8FD9\u4E2A\u53EB\u505A\u4E2D\u4ECB\u8005\u3002\u5C31\u662F\u4E00\u4E2A\u5BF9\u8C61\u63A7\u5236\u522B\u7684\r
\u4E0D\u540C\u5BF9\u8C61\u4E4B\u95F4\u7684\u5DE5\u4F5C\u6D41\uFF0C\u628A\u6240\u6709\u5DE5\u4F5C\u6D41\u53EA\u77E5\u9053\u7684\u76F8\u5173\u7684\u804C\u8D23\u5168\u90E8\u96C6\u4E2D\u5230\u4E86\u4E00\u4E2A\u7B80\u5355\u7684\u5BF9\u8C61\u4E0A\u9762\uFF0C\u8FD9\u6837\u505A\u7684\u4F18\u70B9\uFF0C\r
\u662F\u5DE5\u4F5C\u6D41\u66F4\u5BB9\u6613\u7BA1\u7406\u548C\u7EF4\u62A4\u3002\r
\r
### \u76F8\u540C\u70B9\u548C\u4E0D\u540C\u70B9 \uFF08 mediator  / event aggregator )\r
 \r
\u6BEB\u65E0\u7591\u95EE\uFF0C\u4E24\u8005\u4E4B\u95F4\u7684\u76F8\u540C\u5904\u662F\uFF1A \u4E8B\u4EF6\u548C \u4E2D\u4ECB\uFF0C \u4E0D\u540C\u70B9\u662F\u5F88\u80A4\u6D45\u7684\u3002\u5F53\u6211\u4EEC\u53BB\u63A2\u7D22\u8FD9\u4E9B\u6A21\u5F0F\u7684\u610F\u56FE\uFF0C\u53BB\u770B\u5B83\r
\u7684\u5177\u4F53\u5B9E\u73B0\u7684\u65F6\u5019\u4F1A\u53D1\u73B0\u975E\u5E38\u4E0D\u4E00\u6837, \u8BBE\u8BA1\u6A21\u5F0F\u7684\u672C\u8D28\u66F4\u52A0\u4E0D\u540C\u3002\r
\r
###\u4E8B\u4EF6\r
\u5728\u4E0A\u9762\u7684\u4F8B\u5B50\u4E2D\uFF0Cevent aggregator \u548C mediator \u90FD\u4F7F\u7528\u4E86\u4E8B\u4EF6\u3002 \u4E8B\u4EF6\u96C6\u4E2D\u5668  \u663E\u800C\u6613\u89C1\u662F\u4E0E\u4E8B\u4EF6\u6253\u4EA4\u9053\uFF0C\u6BD5\u7ADF\r
\u4ED6\u7684\u540D\u5B57\u91CC\u9762\u8FD8\u6709\u4E2A\u4E8B\u4EF6\u3002\u4E2D\u4ECB\u8005\uFF0C\u4E3B\u8981\u4F7F\u7528\u4E8B\u4EF6\u7684\u539F\u56E0\u662F\u56E0\u4E3A \u4E8B\u4EF6\u80FD\u591F\u8BA9 \u751F\u6D3B\u53D8\u5F97\u66F4\u597D\u4E00\u70B9\uFF0C\u4F46\u4E0D\u662F\u8BF4 \u4E00\u5B9A\u8981\r
\u5E94\u7528\u4E8B\u4EF6\u624D\u80FD\u5B9E\u73B0\u4E2D\u4ECB\u8005\uFF0C\u4F60\u53EF\u4EE5\u4F7F\u7528\u56DE\u8C03\u3002\u7B49\u7B49\u3002\r
\r
###\u4E2D\u7ACB\u5BF9\u8C61\r
\u53CC\u65B9\u90FD\u4F7F\u7528\u4E2D\u7ACB\u5BF9\u8C61\u6765 \u5904\u7406\u4E1C\u897F\u3002event aggregator \u626E\u6F14\u7684\u662F \u76F8\u5BF9\u4E8E event publisher \u548C event subscribe \u4E8B\u4EF6\r
\u7684\u7B2C\u4E09\u65B9\u3002\u5B83\u626E\u6F14\u7684\u4E8B\u4EF6\u96C6\u4E2D\u901A\u8FC7\u7684\u70B9\u3002mediator\u4E5F\u662F\u4E00\u6837\uFF0C \u6240\u4EE5\u8FD9\u6709\u4EC0\u4E48\u4E0D\u540C\u5462\uFF1F \u4E3A\u4EC0\u4E48\u6211\u4EEC\u4E0D\u53EB event aggregator\r
\u4E3Amediator\u5462\uFF1F\u7B54\u6848\u8DDF \u5E94\u7528\u7684\u5DE5\u4F5C\u7F57\u548C\u903B\u8F91 \u88AB \u7F16\u7801\u6709\u5173\u3002\r
\r
\r
\u4E0B\u9762\u7684\u5185\u5BB9\u6CA1\u4EC0\u4E48\u91CD\u70B9\uFF0C\u6211\u770B\u4E0D\u4E0B\u53BB\u4E86\u2026\u2026`,Jl=`<html>\r
<head>\r
	<title>Observer pratice</title>\r
</head>\r
<!-- \u5F15\u7528\u76D1\u542C\u5668\u6A21\u5F0F\u51FD\u6570 -->\r
<script type="text/javascript" src="Observer.js"><\/script>\r
<body>\r
\r
	<input type="checkbox" id="mainCheckbox">MainCheckBox</input>\r
	<button id="addNewObserver">\u6DFB\u52A0\u76D1\u542C\u5668</button>\r
	<div id="observersContainer"></div>\r
\r
</body>\r
<script type="text/javascript">\r
\r
\r
\r
// Extend an object with an extension\r
function extend( obj, extension ){\r
  for ( var key in extension ){\r
    obj[key] = extension[key];\r
  }\r
}\r
 \r
// References to our DOM elements\r
 \r
var controlCheckbox = document.getElementById( "mainCheckbox" ),\r
  addBtn = document.getElementById( "addNewObserver" ),\r
  container = document.getElementById( "observersContainer" );\r
 \r
 \r
// Concrete Subject\r
 \r
// Extend the controlling checkbox with the Subject class\r
extend( controlCheckbox, new Subject() );\r
 \r
// Clicking the checkbox will trigger notifications to its observers\r
controlCheckbox.onclick = function(){\r
  controlCheckbox.notify( controlCheckbox.checked );\r
};\r
 \r
addBtn.onclick = addNewObserver;\r
 \r
// Concrete Observer\r
 \r
function addNewObserver(){\r
 \r
  // Create a new checkbox to be added\r
  var check = document.createElement( "input" );\r
  check.type = "checkbox";\r
 \r
  // Extend the checkbox with the Observer class\r
  extend( check, new Observer() );\r
 \r
  // Override with custom update behaviour\r
  check.update = function( value ){\r
    this.checked = value;\r
  };\r
 \r
  // Add the new observer to our list of observers\r
  // for our main subject\r
  controlCheckbox.addObserver( check );\r
 \r
  // Append the item to the container\r
  container.appendChild( check );\r
}\r
\r
<\/script>\r
</html>`,Kl=`function ObserverList(){\r
	this.list = [];\r
}\r
ObserverList.prototype.add = function(observer) {\r
	return this.list.push(observer);// body...\r
};\r
ObserverList.prototype.get = function(index) {\r
	return this.list[index];// body...\r
};\r
ObserverList.prototype.count = function(index) {\r
	return this.list.length;// body...\r
};\r
ObserverList.prototype.indexOf = function(object, index) {\r
	var i = startIndex;\r
	while( i < this.list.length) {\r
		if( object === this.list[i]){\r
			return i;\r
		}\r
		i++;\r
	}\r
\r
	return -1;\r
}\r
ObserverList.prototype.removeAt = function( index ) {\r
	this.observerList.splice( index, 1);\r
}\r
\r
\r
\r
function Observer(){\r
  this.update = function(){\r
    // ...\r
  };\r
}\r
\r
\r
\r
function Subject(){\r
	this.observerList = new ObserverList();\r
}\r
\r
Subject.prototype.addObserver = function ( observer ) {\r
	this.observerList.add( observer )\r
	return this\r
}\r
\r
Subject.prototype.removeObserver = function( observer ){\r
  this.observerList.removeAt( this.observerList.indexOf( observer, 0 ) );\r
};\r
\r
Subject.prototype.notify = function( context ){\r
  var observerCount = this.observerList.count();\r
  for(var i=0; i < observerCount; i++){\r
    this.observerList.get(i).update( context );\r
  }\r
};\r
\r
`,Yl=`// Publish/subscribe.js\r
\r
var pubsub = {};\r
\r
(function(myObject){\r
\r
	var topics = {}\r
	var subscribeId = 0;\r
\r
	myObject.subscribe = function(topic, func) {\r
		if(!topics[topic]){\r
			topics[topic] = []\r
		}\r
\r
		var token = (++subscribeId).toString();\r
		topics[topic].push({\r
			func: func,\r
			token: token\r
		})\r
\r
		return token\r
	}\r
\r
	// unsubscribe single token subscribe\r
	myObject.unsubscribe = function(token){\r
		for(var t in topics){\r
			var currentTopic = topics[t];\r
\r
			for (var i = 0, j = topics[m].length; i < j; i++) {\r
				if(currentTopic[i] === token) {\r
					currentTopic.splice(i,1)\r
					return token\r
				}\r
			};\r
		}\r
	}\r
\r
	myObject.Publish = function(topic, args){\r
		var targetSubscribers = topics[topic] || [];\r
\r
		for (var i = 0,j = targetSubscribers.length; i < j; i++) {\r
			targetSubscribers[i].func(args)\r
		};\r
\r
		return this;\r
	}\r
	\r
})(pubsub)`,Xl=`#Javascript\u8BBE\u8BA1\u6A21\u5F0F/\u6211\u7684\u7406\u89E3\uFF08\u7FFB\u8BD1\r
## Observer\u6A21\u5F0F\u4E0EPublish/Subscribe\u6A21\u5F0F\u7684\u533A\u522B\r
  \u89C2\u5BDF\u8005\u6A21\u5F0F\u548C\u8BA2\u9605\u53D1\u5E03\u6A21\u5F0F\u4E4B\u95F4\u7684\u533A\u522B\u4E8C\u8005\u76F8\u6BD4\u8F83\uFF0C\u6211\u4EEC\u4F1A\u53D1\u73B0 \u5728js\u7684\u4E16\u754C\u91CC\u9762\uFF0C\u6211\u4EEC\u4F1A\u53D1\u73B0\u89C2\u5BDF\u8005\u6A21\u5F0F\u66F4\u5BB9\u6613\u88AB\u610F\u8BC6\u5230\uFF0C\r
\u5B83\u4EEC\u901A\u5E38 \u4EE5\u201C\u53D1\u5E03/\u8BA2\u9605\u201D\u7684\u8BBE\u8BA1\u6A21\u5F0F\u5B9E\u73B0\uFF0C \u4E8C\u8005\u975E\u5E38\u76F8\u4F3C\uFF0C\u5B83\u4EEC\u4E4B\u95F4\u7684\u533A\u522B\uFF0C\u9700\u8981\u6CE8\u610F\u3002\r
\r
\u89C2\u5BDF\u8005\u6A21\u5F0F\u5F62\u5F0F\u5982\u4E0B, \u5E0C\u671B\u80FD\u591F\u6536\u5230\u4E3B\u9898\u901A\u77E5\u7684\u89C2\u5BDF\u8005\uFF0C\u5B83\u5FC5\u987B\u8BA2\u9605"\u89E6\u53D1\u201C\u4E8B\u4EF6\u7684\u5BF9\u8C61\u3002\r
\r
  \u53D1\u5E03/\u8BA2\u9605\u8005\u6A21\u5F0F\u4E0E\u6B64\u4E0D\u540C\uFF0C\u5B83\u5728\u8BA2\u9605\u8005\uFF08\u5E0C\u671B\u6536\u5230\u901A\u77E5\u7684\u5BF9\u8C61\u4EEC\uFF09\u548C\u53D1\u5E03\u8005\uFF08\u5206\u53D1\u4E8B\u4EF6\u7684\u5BF9\u8C61\uFF09\u5EFA\u7ACB\u4E86\u4E00\u4E2A\u901A\u9053\uFF0C\r
\u53EF\u4EE5\u53EB\u4ED6\u4E3A\u4E3B\u9898\u901A\u9053\u6216\u8005\u65F6\u95F4\u901A\u9053\u3002  \u8FD9\u6574\u4E2A\u4E8B\u4EF6\u7CFB\u7EDF\u5141\u8BB8\u4F60\u901A\u8FC7\u4EE3\u7801\u8FDB\u884C\u5177\u4F53\u4E8B\u4EF6\u7684\u5B9A\u4E49\uFF0C\u4EE5\u53CA\u8BBE\u5B9A\u8BA2\u9605\u8005\u6240\u9700\u8981\u7684\u53C2\u6570\uFF0C\r
\u8FD9\u4E2A\u60F3\u6CD5\u4E3B\u8981\u7684\u76EE\u7684\u662F\uFF0C\u907F\u514D\u8BA2\u9605\u8005\u548C\u53D1\u5E03\u8005\u4E4B\u95F4\u7684\u4F9D\u8D56\u5173\u7CFB\u3002\r
\r
  \u6B63\u662F\u56E0\u4E3A\u8FD9\u4E2A\u4E0E\u89C2\u5BDF\u8005\u6A21\u5F0F\u4E0D\u540C\u70B9\uFF0C \u4EFB\u610F\u7684\u53D1\u5E03\u8005\u90FD\u80FD\u591F\u5B9E\u73B0\u4E00\u4E2A\u9002\u5F53\u7684\u4E8B\u4EF6\u5904\u7406\u51FD\u6570\uFF0C\u7528\u6765\u6CE8\u518C\u548C\u63A5\u53D7 \u53D1\u5E03\u8005\u6240\u7FA4\u53D1\u7684\u6D88\u606F\u3002\r
\r
\u4E0B\u9762\u662F\u4E00\u4E2A \u53EF\u80FD\u4F7F\u7528  \u53D1\u5E03/\u8BA2\u9605 \u6A21\u5F0F\u7684\u573A\u666F\r
\`\`\`javascript\r
// A very simple new mail handler\r
 \r
// A count of the number of messages received\r
var mailCounter = 0;\r
 \r
// Initialize subscribers that will listen out for a topic\r
// with the name "inbox/newMessage".\r
 \r
// Render a preview of new messages\r
var subscriber1 = subscribe( "inbox/newMessage", function( topic, data ) {\r
 \r
  // Log the topic for debugging purposes\r
  console.log( "A new message was received: ", topic );\r
 \r
  // Use the data that was passed from our subject\r
  // to display a message preview to the user\r
  $( ".messageSender" ).html( data.sender );\r
  $( ".messagePreview" ).html( data.body );\r
 \r
});\r
 \r
// Here's another subscriber using the same data to perform\r
// a different task.\r
 \r
// Update the counter displaying the number of new\r
// messages received via the publisher\r
 \r
var subscriber2 = subscribe( "inbox/newMessage", function( topic, data ) {\r
 \r
  $('.newMessageCounter').html( ++mailCounter );\r
 \r
});\r
 \r
publish( "inbox/newMessage", [{\r
  sender: "hello@google.com",\r
  body: "Hey there! How are you doing today?"\r
}]);\r
 \r
// We could then at a later point unsubscribe our subscribers\r
// from receiving any new topic notifications as follows:\r
// unsubscribe( subscriber1 );\r
// unsubscribe( subscriber2 );\r
\r
\`\`\`\r
	\u8FD9\u4E2A\u6848\u4F8B\u7684\u4E3B\u8981idea\u662F  \u89E3\u8026\u7684\u63D0\u5347 \uFF0C\u5B83\u4EEC\u901A\u8FC7\u8BA2\u9605\u53E6\u5916\u4E00\u4E2A\u5BF9\u8C61\u7684\u5177\u4F53\u7684\u4EFB\u52A1\uFF0C\u6216\u8005\u8BF4\u6D3B\u52A8\uFF0C\u5F53\u8FD9\u4E2A\u4E8B\u4EF6\u88AB\u89E6\u53D1\u7684\u65F6\u5019\uFF0C\u8BA2\u9605\u8005\u5C31\u80FD\u6536\u5230\u3002\r
	\u800C\u4E0D\u662F\u5355\u4E2A\u5BF9\u8C61\u76F4\u63A5\u8C03\u7528\u53E6\u5916\u4E00\u4E2A\u5BF9\u8C61\u7684\u65B9\u6CD5,\r
\r
## \u4F18\u70B9\r
\u8FD9\u4E24\u79CD\u6A21\u5F0F\u90FD\u9F13\u52B1\u6211\u4EEC\uFF0C\u8981\u53BB\u8BA4\u771F\u601D\u8003 \u5E94\u7528\u5185 \u5404\u4E2A\u6A21\u5757\u4E4B\u95F4\u7684\u5173\u7CFB\uFF0C \u5B83\u4EEC\u8FD8\u80FD\u591F\u5E2E\u52A9\u6211\u4EEC\u786E\u5B9A\u4E00\u4E9B\u80FD\u7528\u8FD9\u79CD\u6A21\u5F0F\u53D6\u4EE3\u7684\u5C42\u5173\u7CFB\u3002\r
\u8FD9\u4E2A\u4F18\u52BF\u80FD\u591F\u7528\u6765\u62C6\u5206\u6A21\u5757\uFF0C\u4FC3\u8FDB\u6A21\u5757\u6A21\u5757\u4E4B\u95F4\u7684\u677E\u8026\u5408\uFF0C\u8FD9\u6837\u5B50\u6211\u4EEC\u7684\u4EE3\u7801\u5C31\u66F4\u6709\u53EF\u80FD\u91CD\u590D\u4F7F\u7528\uFF0C\u5E76\u4E14\u5BB9\u6613\u7BA1\u7406\u3002\r
\r
\u4ECE\u66F4\u957F\u8FDC\u7684\u52A8\u673A\u8BB2\uFF0C\u662F\u4E3A\u4E86\u89E3\u51B3\u8FD9\u79CD\u60C5\u5F62\uFF1A  \u4E24\u4E2A\u76F8\u4E92\u5173\u8054\u7684 \u7C7B\u4E4B\u95F4\u9700\u8981\u4FDD\u6301\u4E00\u81F4\u6027\uFF0C\u907F\u514D\u8FD9\u4E24\u4E2A\u7C7B\u7684\u9AD8\u8026\u5408\u6027\u3002\r
\u4E3E\u4E2A\u4F8B\u5B50\uFF0C\u5F53\u4E00\u4E2A\u5BF9\u8C61\u5177\u5907\u901A\u77E5\u7684\u80FD\u529B\uFF0C\u4F46\u662F\u4E0D\u9700\u8981\u8003\u8651\u90A3\u4E9B\u8DDF\u5B83\u6709\u5173\u7684\u5BF9\u8C61\u3002\r
\r
\u5F53\u4F60\u4F7F\u7528\u8FD9\u79CD\u6A21\u5F0F\u7684\u65F6\u5019\uFF0C\u53D1\u5E03\u8005\u4EE5\u53CA\u89C2\u5BDF\u8005\u53EF\u4EE5\u5B58\u5728\u7075\u6D3B\u7684\u5173\u7CFB\uFF0C\u8FD9\u4E2A\u6A21\u5F0F\u63D0\u4F9B\u4E86\u5DE8\u5927\u7684\u7075\u6D3B\u6027\uFF0C\u4F46\u662F\u5B9E\u9645\u4E2D\uFF0C\u6211\u4EEC\u7684\u7CFB\u7EDF\u4E0D\u540C\u5C42\u4E4B\u95F4\u5B58\u5728\u7740\r
\u9AD8\u8026\u5408\u6027\uFF0C\u8FD9\u4E2A\u6A21\u5F0F\u53EF\u80FD\u4F1A\u6BD4\u8F83\u96BE\u4EE5\u5B9E\u73B0\u3002\r
\r
\u8FD9\u4E2A\u6A21\u5F0F\u4E0D\u4E00\u5B9A\u662F\u6BCF\u4E2A\u95EE\u9898\u7684\u6700\u4F73\u89E3\u51B3\u65B9\u6848\uFF0C\u4F46\u662F\u5BF9\u4E8E\u8BBE\u8BA1\u4F4E\u8026\u5408\u6027\u7684\u7CFB\u7EDF\u800C\u8A00\uFF0C\u5B83\u4ECD\u7136\u662F\u6700\u597D\u7684\u5DE5\u5177\u4E4B\u4E00\uFF0C\r
\u6240\u4EE5\u5B83\u5E94\u8BE5\u88AB\u89C6\u4E3A\u6240\u6709javascript\u5F00\u53D1\u8005\uFF0C\r
\u4E00\u4E2A\u975E\u5E38\u5B9E\u7528\u7684\u5DE5\u5177\u3002\r
## \u7F3A\u70B9\r
\u4E0E\u7ED3\u679C\u76F8\u5173\u7684\u662F\uFF0C\u8FD9\u4E2A\u6A21\u5F0F\u7684\u67D0\u4E9B\u95EE\u9898\u5F71\u54CD\u4E86\u5B83\u4EEC\u7684\u4E3B\u8981\u597D\u5904\uFF0C\u5728publish/subscripbe\u6A21\u5F0F\u4E2D\uFF0C\u4E3A\u4E86\u89E3\u9664pub/sub\u4E4B\u95F4\u7684\u5173\u8054\u6027\uFF0C \u67D0\u4E9B\u60C5\u51B5\u4E0B\u6211\u4EEC\u4F1A\u5F88\u96BE\u786E\u4FDD\u7A0B\u5E8F\u4F1A\u6309\u6211\u4EEC\r
\u6240\u60F3\u7684\u90A3\u6837\u5B50\u8FD0\u884C\u3002\r
\r
\u4E3E\u4E2A\u4F8B\u5B50\uFF0C \u53D1\u5E03\u8005\u53EF\u80FD\u5047\u8BBE\u4E00\u4E2A\u6216\u8005\u591A\u4E2A\u8BA2\u9605\u8005\uFF0C\u76D1\u542C\u8FD9\u4E2A\u4E8B\u4EF6\u3002\r
\u6211\u4EEC\u505A\u8FD9\u6837\u4E00\u4E2A\u5047\u8BBE\uFF0C\u6709\u4EBA\u8BB0\u5F55\u6216\u8005\u5411\u5916\u8F93\u51FA\u76F8\u5173\u5E94\u7528\u8FDB\u7A0B\u3002\u5982\u679C\u8BA2\u9605\u8005\u51FA\u73B0\u4E86\u65E5\u5FD7\u8BB0\u5F55\u7684\u5D29\u6E83\uFF0C\u90A3\u4E48\u7531\u4E8E \u8FD9\u4E2A\u89E3\u8026\u7684\u7279\u6027\uFF0C \u53D1\u5E03\u8005\u5C31\u65E0\u4ECE\u5F97\u77E5\u3002\r
\u53E6\u5916\u4E00\u4E2A\u7F3A\u70B9\u662F\uFF0C\u8BA2\u9605\u8005\u4E4B\u95F4\u662F\u76F8\u4E92\u65E0\u89C6\u7684\uFF0C\u5E76\u4E14\u8FD9\u4E2A\u6A21\u5F0F\u5BF9\u4E8E\u5207\u6362\u53D1\u5E03\u8005\u4E4B\u95F4\u7684\u635F\u8017\u662F\u89C6\u800C\u4E0D\u89C1\u7684\uFF0C\u7531\u4E8E\u53D1\u5E03\u8005\u8DDF\u8BA2\u9605\u8005\u4E4B\u95F4\u7684\u52A8\u6001\u5173\u7CFB\uFF0C\u66F4\u65B0\r
\u9644\u5E26\u7684\u4E1C\u897F\u53EF\u80FD\u5C31\u66F4\u96BE\u8C03\u8BD5\u3002\r
\r
\u4E0B\u9762\u4E3APublish/subscribe \u5B9E\u73B0\r
\r
\r
## Publish/Subscribe \u5B9E\u73B0 \r
\u8FD9\u4E2A\u6A21\u5F0F\u5728Javascript\u7684\u751F\u6001\u7CFB\u7EDF\u9002\u5E94\u5F97\u975E\u5E38\u597D\uFF0C\u4E3B\u8981\u7684\u539F\u56E0\u662F\u56E0\u4E3A ECMAScript \u7684\u5B9E\u73B0\u4E5F\u662F\u4E8B\u4EF6\u9A71\u52A8\u7684\u3002\r
\u4F60\u5728\u6D4F\u89C8\u5668\u73AF\u5883\u4E2D\u4F7F\u7528\u5B83\u4F1A\u89C9\u5F97\u786E\u5B9E\u662F\u8FD9\u6837\uFF0C\u56E0\u4E3ADOM \u4F7F\u7528\u4E8B\u4EF6 \u4F5C\u4E3A\u5B83\u4E3B\u8981\u7684\u4EA4\u4E92API\u3002\r
\r
\u5B9E\u9645\u4E0A\u662F\u8FD9\u6837\u7684\uFF0C ECMAScript \u548C DOM \u90FD\u6CA1\u6709\u63D0\u4F9B \u6838\u5FC3\u7684\u5BF9\u8C61\u6216\u8005\u65B9\u6CD5\uFF0C\u6765\u521B\u5EFA\u5B9A\u5236\u7684\u4E8B\u4EF6\uFF08dom3\u7684 customEvent\u8FD9\u662F\u4E2A\u4F8B\u5916\uFF0C\r
\u56E0\u4E3A\u5B83\u7ED1\u5728\u4E86dom\u4E0A\u9762\uFF0C\u6240\u4EE5\u8FD9\u5E76\u975E\u901A\u7528\u7684\u5B9E\u73B0\uFF09\u3002\r
\r
\u5E78\u8FD0\u7684\u662F,\u4E3B\u6D41\u7684JS\u5DE5\u5177\u5305\uFF0C\u50CF\u662Fdojo, jQuery,YUI\u5DF2\u7ECF\u6709\u4E86\u8FD9\u7C7B\u5DE5\u5177\uFF0C\u53EA\u8981\u82B1\u4E00\u70B9\u5C0F\u5C0F\u7684\u52AA\u529B\uFF0C\u4F60\u80FD\u591F\u8F7B\u677E\u7684\u5EFA\u7ACB\u8D77Pub/Sub\u6A21\u5F0F\uFF0C\u4E0B\u9762\u6211\u4EEC\u770B\u5230\u4E00\u4E9B\u4F8B\u5B50\u3002\r
\r
\`javascript \r
// Publish\r
 \r
// jQuery: $(obj).trigger("channel", [arg1, arg2, arg3]);\r
$( el ).trigger( "/login", [{username:"test", userData:"test"}] );\r
 \r
// Dojo: dojo.publish("channel", [arg1, arg2, arg3] );\r
dojo.publish( "/login", [{username:"test", userData:"test"}] );\r
 \r
// YUI: el.publish("channel", [arg1, arg2, arg3]);\r
el.publish( "/login", {username:"test", userData:"test"} );\r
 \r
 \r
// Subscribe\r
 \r
// jQuery: $(obj).on( "channel", [data], fn );\r
$( el ).on( "/login", function( event ){...} );\r
 \r
// Dojo: dojo.subscribe( "channel", fn);\r
var handle = dojo.subscribe( "/login", function(data){..} );\r
 \r
// YUI: el.on("channel", handler);\r
el.on( "/login", function( data ){...} );\r
 \r
 \r
// Unsubscribe\r
 \r
// jQuery: $(obj).off( "channel" );\r
$( el ).off( "/login" );\r
 \r
// Dojo: dojo.unsubscribe( handle );\r
dojo.unsubscribe( handle );\r
 \r
// YUI: el.detach("channel");\r
el.detach( "/login" );\r
\`\r
\r
\u9488\u5BF9\u4E8E\u60F3\u8981\u901A\u8FC7\u9999\u8349\u5473(\u7B80\u6D01)\u7684JavaScript\u4F7F\u7528Pub/Sub\u6A21\u5F0F\u7684\u540C\u5B66\uFF0CAmplifyJS\u5305\u542B\u4E86\u4E00\u4E2A\u5E72\u51C0\u7684\uFF0C\u672A\u77E5\u5E93\u4E3B\u4E49\u7684\u5B9E\u73B0\uFF0C\r
\u80FD\u591F\u4E0E\u4EFB\u4F55\u7684JS\u5E93\u4E00\u8D77\u4F7F\u7528\u3002Radio.js,PubSubJS \u6216\u8005 Pure JS \u90FD\u662F\u4E0D\u9519\u7684\u9009\u62E9\u3002\r
\r
\r
## Publish/Subscribe \u5B9E\u73B0\r
\r
\`var pubsub = {};\r
 \r
(function(myObject) {\r
 \r
    // Storage for topics that can be broadcast\r
    // or listened to\r
    var topics = {};\r
 \r
    // An topic identifier\r
    var subUid = -1;\r
 \r
    // Publish or broadcast events of interest\r
    // with a specific topic name and arguments\r
    // such as the data to pass along\r
    myObject.publish = function( topic, args ) {\r
 \r
        if ( !topics[topic] ) {\r
            return false;\r
        }\r
 \r
        var subscribers = topics[topic],\r
            len = subscribers ? subscribers.length : 0;\r
 \r
        while (len--) {\r
            subscribers[len].func( topic, args );\r
        }\r
 \r
        return this;\r
    };\r
 \r
    // Subscribe to events of interest\r
    // with a specific topic name and a\r
    // callback function, to be executed\r
    // when the topic/event is observed\r
    myObject.subscribe = function( topic, func ) {\r
 \r
        if (!topics[topic]) {\r
            topics[topic] = [];\r
        }\r
 \r
        var token = ( ++subUid ).toString();\r
        topics[topic].push({\r
            token: token,\r
            func: func\r
        });\r
        return token;\r
    };\r
 \r
    // Unsubscribe from a specific\r
    // topic, based on a tokenized reference\r
    // to the subscription\r
    myObject.unsubscribe = function( token ) {\r
        for ( var m in topics ) {\r
            if ( topics[m] ) {\r
                for ( var i = 0, j = topics[m].length; i < j; i++ ) {\r
                    if ( topics[m][i].token === token ) {\r
                        topics[m].splice( i, 1 );\r
                        return token;\r
                    }\r
                }\r
            }\r
        }\r
        return this;\r
    };\r
}( pubsub ));\`\r
\r
## \u6848\u4F8B\uFF1A Decoupling an Ajax-based jQuery application\r
\r
\u5728\u6211\u4EEC\u6700\u540E\u7684\u6848\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u4ECE\u5B9E\u7528\u6027\u7684\u89D2\u5EA6\u770B\u5F85\uFF0C\u5728\u4EE3\u7801\u4E2D\u4F7F\u7528Pub/Sub\u6A21\u5F0F\u89E3\u8026\u6211\u4EEC\u7684\u4EE3\u7801\uFF0C\r
\u4E3A\u4EC0\u4E48\u80FD\u591F\u66FF\u6211\u4EEC\u7701\u4E0B\u75DB\u82E6\u7684\u91CD\u6784\u3002\r
\r
\u5728\u91CDAjax\u7684\u7A0B\u5E8F\u4E2D\uFF0C\u6211\u4EEC\u5E38\u5E38\u6709\u8FD9\u6837\u7684\u60C5\u5F62\uFF1A\u6211\u4EEC\u6536\u5230\u4E86\u4E00\u4E2A\u54CD\u5E94\uFF0C\u6211\u4EEC\u60F3\u5728\u5B9E\u73B0\u4E0D\u5355\u5355\u4E00\u4E2A\u52A8\u4F5C\u3002\r
\u6211\u4EEC\u53EF\u4EE5\u7B80\u5355\u7684\uFF0C\u628A\u6240\u6709\u7684post-request\u903B\u8F91\u653E\u5230 success callback\u51FD\u6570\u91CC\u9762\uFF0C\u4F46\u662F\u8FD9\u4E2A\u65B9\u6CD5\u91CC\u9762\r
\u6709\u4E00\u4E9B\u7F3A\u70B9\u3002\r
\r
\u5728\u9AD8\u8026\u5408\u7684\u7A0B\u5E8F\u4E2D, \u5982\u679C\u6211\u4EEC\u60F3\u8981\u4FDD\u8BC1\u529F\u80FD\u7684\u590D\u7528\u6027\uFF0C\u5185\u7F6E\u51FD\u6570/\u4EE3\u7801\u7684\u4F9D\u8D56\u5173\u7CFB\u4E0D\u65AD\u589E\u52A0\uFF0C\u6709\u4E9B\u65F6\u5019\u4F1A\u5BFC\u81F4\u6211\u4EEC\u9700\u8981\u4ED8\u51FA\u66F4\u5927\u7684\u5DE5\u4F5C\u91CF\u3002\r
\u8FD9\u610F\u5473\u7740\u4EC0\u4E48\u5462?  \u5982\u679C\u6211\u4EEC\u53EA\u662F\u60F3\u8981\u4E00\u6B21\u6536\u96C6\u6240\u6709\u7684\u7ED3\u679C\uFF0C\u90A3\u4E48\u628A\u6240\u6709\u7684\u8BF7\u6C42\u903B\u8F91\u653E\u5728\u56DE\u8C03\u7684\u51FD\u6570\u91CC\u9762\u5176\u5B9E\u8FD8\u597D\u3002\u4F46\u662F\u5728\u67D0\u4E9B\u60C5\u51B5\u4E0B\u5C31\u4E0D\u5927\u5408\u9002\uFF0C\r
\u5982\u679C\u6211\u4EEC\u60F3\u8981\u5728\u4E4B\u540E\u7684Ajax\u8BF7\u6C42\u4F7F\u7528\u540C\u6837\u7684\u6570\u636E\u6765\u6E90\uFF0C\u6211\u4EEC\u5C31\u5FC5\u987B\u91CD\u5199\u6570\u636E\u597D\u591A\u6B21\u3002\r
\r
\u6211\u4EEC\u53EF\u4EE5\u4ECE\u4E00\u5F00\u59CB\u5C31\u4F7F\u7528pubsub\u6A21\u5F0F\uFF0C\u8FD9\u6837\u80FD\u8282\u7701\u65F6\u95F4\uFF0C\u800C\u4E0D\u662F\u6765\u56DE\u5728\u5404\u4E2A\u5C42\u7EA7\u4E4B\u95F4 \u8C03\u7528\u76F8\u540C\u7684data-source\uFF0C\u5E76\u4E14\u4F18\u5316\u5B83\u4EEC\u3002\r
\r
\u901A\u8FC7\u89C2\u5BDF\u8005\u6A21\u5F0F\uFF0C\u6211\u4EEC\u80FD\u591F\u8F7B\u677E\u7684\u5212\u5206\u7A0B\u5E8F\u7EA7\u522B\u7684\u901A\u544A\uFF0C  \u5982\u679C\u4F60\u7528\u522B\u7684\u6A21\u5F0F\uFF0C\u53EF\u80FD\u6CA1\u6709\u8FD9\u4E48\u4F18\u96C5\u3002\r
\u6CE8\u610F\u4E0B\u9762\u7684\u6848\u4F8B\uFF0C\u5F53\u7528\u6237\u8868\u660E\u4ED6\u60F3\u8981\u8FDB\u884C\u4E00\u6B21\u641C\u7D22\u67E5\u8BE2\uFF0C\u5C31\u53D1\u5E03\u4E00\u4E2A\u4E3B\u9898\u901A\u544A\uFF0C\u5F53\u8BF7\u6C42\u54CD\u5E94\u5DF2\u7ECF\u8FD4\u56DE\u4E86\uFF0C\u6570\u636E\u53EF\u7528\u4E86\uFF0C\u8FD9\u65F6\u5019\r
\u4E5F\u53D1\u5E03\u4E00\u4E2A\u901A\u544A\u3002\u8BA2\u9605\u8005\u53EF\u4EE5\u5F85\u4F1A\u51B3\u5B9A\u5982\u4F55\u4F7F\u7528\u8FD9\u4E9B\u4E8B\u4EF6\u3002\u8FD9\u6837\u505A\u7684\u4F18\u70B9\u662F\u8FD9\u6837\u7684\uFF1A \u53EA\u8981\u6211\u4EEC\u60F3\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u752810\u4E2A\u4E0D\u540C\u7684\u8BA2\u9605\u8005\u6765\r
\u52A0\u5DE5\u4ECE\u4E0D\u540C\u5C42\u7EA7\u4E0D\u540C\u65B9\u5F0F\u8FD4\u56DE\u7684\u6570\u636E\uFF0C\u5B83\u7684\u4E3B\u8981\u8D23\u4EFB\u5C31\u662F\u53D1\u9001\u8BF7\u6C42\uFF0C\u5E76\u4E14\u628A\u8FD4\u56DE\u7684\u6570\u636E\u4F20\u9012\u7ED9\u5E0C\u671B\u4F7F\u7528\u7684\u4EBA\u3002\r
\u8FD9\u4E2A\u7126\u70B9\u7684\u5206\u79BB\uFF0C\u80FD\u591F\u8BA9\u6211\u4EEC\u7684\u4EE3\u7801\u8BBE\u8BA1 \u66F4\u52A0\u7B80\u6D01\u4E00\u70B9\u3002\r
## html/templates\r
\`\`\`<form id="flickrSearch">\r
 \r
   <input type="text" name="tag" id="query"/>\r
 \r
   <input type="submit" name="submit" value="submit"/>\r
 \r
</form>\r
 \r
 \r
 \r
<div id="lastQuery"></div>\r
 \r
<ol id="searchResults"></ol>\r
 \r
 \r
 \r
<script id="resultTemplate" type="text/html">\r
    <% _.each(items, function( item ){ %>\r
        <li><img src="<%= item.media.m %>"/></li>\r
    <% });%>\r
<\/script>\`\`\`\r
## javascripts\r
\r
\`\`\`\r
;(function( $ ) {\r
 \r
   // Pre-compile template and "cache" it using closure\r
   var resultTemplate = _.template($( "#resultTemplate" ).html());\r
 \r
   // Subscribe to the new search tags topic\r
   $.subscribe( "/search/tags", function( e, tags ) {\r
       $( "#lastQuery" )\r
                .html("<p>Searched for:<strong>" + tags + "</strong></p>");\r
   });\r
 \r
   // Subscribe to the new results topic\r
   $.subscribe( "/search/resultSet", function( e, results ){\r
 \r
       $( "#searchResults" ).empty().append(resultTemplate( results ));\r
 \r
   });\r
 \r
   // Submit a search query and publish tags on the /search/tags topic\r
   $( "#flickrSearch" ).submit( function( e ) {\r
 \r
       e.preventDefault();\r
       var tags = $(this).find( "#query").val();\r
 \r
       if ( !tags ){\r
        return;\r
       }\r
 \r
       $.publish( "/search/tags", [ $.trim(tags) ]);\r
 \r
   });\r
 \r
 \r
   // Subscribe to new tags being published and perform\r
   // a search query using them. Once data has returned\r
   // publish this data for the rest of the application\r
   // to consume\r
 \r
   $.subscribe("/search/tags", function( e, tags ) {\r
 \r
       $.getJSON( "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {\r
              tags: tags,\r
              tagmode: "any",\r
              format: "json"\r
            },\r
 \r
          function( data ){\r
 \r
              if( !data.items.length ) {\r
                return;\r
              }\r
 \r
              $.publish( "/search/resultSet", { items: data.items } );\r
       });\r
 \r
   });\r
 \r
 \r
})( jQuery );\r
\`\`\`\r
\r
\r
\u5728\u5E94\u7528\u8BBE\u8BA1\u4E2D\u7684\u8BB8\u591A\u4E0D\u540C\u7684\u573A\u666F\u4E2D\uFF0C\u89C2\u5BDF\u8005\u6A21\u5F0F\u7528\u6765\u89E3\u8026\u662F\u4E00\u4E2A\u5B9E\u7528\u7684\u9009\u62E9\u3002\r
\u5982\u679C\u4F60\u8FD8\u6CA1\u6709\u7528\u8FC7\uFF0C\u6211\u5EFA\u8BAE\u4F60\u53EF\u4EE5\u770B\u770B\u4E0A\u9762\u7684\u6848\u4F8B\u5E76\u4E14\u62FF\u4E00\u4E2A\u8FC7\u6765\u5B9E\u8DF5\uFF0C\r
\u8FD9\u662F\u6700\u7B80\u5355\u7684\u8BBE\u8BA1\u6A21\u5F0F\u4E4B\u4E00\uFF0C\u4E5F\u662F\u6700\u5F3A\u5927\u4E4B\u4E00\u3002`,Ql=`// mediator implement\r
//  mediator \u7684\u9AD8\u7EA7\u5B9E\u73B0\r
(function(root){\r
\r
    // \u83B7\u53D6\u72EC\u4E00\u65E0\u4E8C\u7684UniqueId\r
    function generatorSID(){\r
        // \u5177\u4F53\u5B9E\u73B0\u7565\u8FC7\r
    }\r
\r
    function Subscriber(fn, context, options){\r
        // bug \r
        if(!(this instanceof Subscriber)){\r
            return new Subscriber(fn, context, options);\r
        }\r
\r
        this.id = generatorSID();\r
        this.fn = fn ;\r
        this.options = options;\r
        this.context = context;\r
        this.topic = null;\r
    }\r
})();\r
\r
\r
function Topic(namespace){\r
    if(!(this instanceof Topic)){\r
        return new Topic(namespace);\r
    }\r
\r
    this.namespace = namespace;\r
    this._callbacks = [];\r
    this._topics = [];\r
    this.stopped = false;\r
}\r
\r
Topic.prototype = {\r
    AddSubscriber = function(fn, options, context){\r
        var callback = new Subscriber(fn, options, context);\r
        callback.topic = this;\r
\r
        this._callbacks.push(callback);\r
        return callback;\r
    },\r
\r
    StopPropagation: function(){\r
        this.stopped = true;\r
    },\r
\r
    GetSubscriber: function(identifier){\r
        for(var i = 0, length = this._callbacks.length; i < length; i++){\r
            if(this._callbacks[i].id === identifier || this._callbacks[i].fn === identifier){\r
                return this._callbacks[i];\r
            }\r
        }\r
\r
        // subTopic\r
        for(var topic in this._topics){\r
            if(this._topics.hasOwnProperty(topic)){\r
                var sub = this._topics.GetSubscriber(identifier);\r
                // if(sub !== undefined){\r
                if(sub){\r
                    return sub;\r
                }\r
            }\r
        }\r
\r
        return false;\r
    },\r
    // \u6DFB\u52A0\u5B50Topic\r
    AddTopic: function(topic){\r
        this._topics[topic] = new Topic((this.namespace ? this.namespace + ":" : "") + topic);\r
    },\r
    //  \u662F\u5426\u6709\u5B50topic\r
    HasTopic: function(topic){\r
        return this._topics.hasOwnProperty(topic);\r
    },\r
\r
    returnTopic: function(topic){\r
        return this._topics[topic];\r
    }\r
    \r
}`,Vl=`// simple implement\r
// \u4E2D\u4ECB\u8005\u6A21\u5F0F \u7B80\u5355\u5B9E\u73B0\r
\r
var mediator = (function(){\r
    var topics = {};\r
\r
    var subscribe = function(topic, fn){\r
        if(!topics[topic]){\r
            topics[topic] = []\r
        }\r
\r
        topics[topic].push({ context: this, callback: fn});\r
        return this;\r
    }\r
\r
    var publish = function(topic){\r
        var args;\r
        if(!topics[topic]) return false;\r
\r
        args = Array.prototype.slice.call(arguments,1);\r
\r
        for(var i = 0; i < topics[topic].length; i++){\r
            var subscribe = topics[topic][i];\r
            subscribe.callback.apply(subscribe.context, args);\r
        }\r
        return this;\r
    }\r
\r
    return {\r
        subscribe: subscribe,\r
        publish: publish,\r
        installTo : function(obj) {\r
            obj.subscribe = subscribe;\r
            obj.publish = publish;\r
        }\r
    }\r
})();`,Zl=`var myModule = (function(){\r
	var privateVar = "yoman"\r
\r
	function privateFunction(){\r
		console.log(privateVar)\r
	}\r
\r
	return {\r
		publicMethod: privateFunction,\r
		publicVar: privateVar\r
	}\r
})()\r
// reveal module\r
// \u4F18\u70B9\uFF1A \u5BB9\u6613\u9605\u8BFB\r
// \u7F3A\u70B9\uFF1A \u7EF4\u62A4\u9EBB\u70E6\r
// `,tp=`var mySingleton = (function(){\r
	var instance;\r
	function init(){\r
		instance = {\r
			name: 'fuyy'\r
		}\r
	}\r
\r
	return {\r
		getInstance: function(){\r
			if(!instance){\r
				init();\r
			}\r
			return instance\r
		}\r
	}\r
})();`,ep=`# \u535A\u5BA2\u76EE\u5F55\r
\r
\u672C\u6587\u6863\u7AD9\u7531 VuePress v2 \u6784\u5EFA\uFF0C\u5185\u5BB9\u4ECE\u5386\u53F2\u5206\u652F\u4E0E \`pattern/\` \u793A\u4F8B\u8FC1\u79FB\u800C\u6765\u3002\r
\r
## \u6587\u7AE0\r
\r
- [Observer \u4E0E Publish/Subscribe](/blog/publish-subscribe.html)\r
- [\u4E2D\u4ECB\u8005\u6A21\u5F0F\uFF08Mediator\uFF09](/blog/mediator-pattern.html)\r
- [Pattern \u4EE3\u7801\u793A\u4F8B\u96C6](/blog/code-lab.html)\r
- [H5 launch-app\uFF1A\u5FAE\u4FE1\u5F00\u653E\u6807\u7B7E\u539F\u7406](/blog/wechat-open-tag-launch-app.html)\r
- [Codex Prompt \u8C03\u8BD5\u624B\u518C](/blog/codex-prompt-debugging.html)\r
- [Codex Agent \u5DE5\u4F5C\u6D41](/blog/codex-agent-workflow.html)\r
- [Codex CLI \u5230 PR \u4EA4\u4ED8\u6E05\u5355](/blog/codex-cli-to-pr.html)\r
- [2026 \u524D\u7AEF\u70ED\u70B9\u5B9E\u6218\u56FE](/blog/frontend-trends-2026-practice-map.html)\r
- [\u524D\u7AEF\u67B6\u6784\u51B3\u7B56\u624B\u518C](/blog/frontend-architecture-decision-playbook.html)\r
- [\u524D\u7AEF\u5DE5\u7A0B\u7406\u5FF5\uFF1A\u5FEB\u7A33\u7B80](/blog/frontend-engineering-philosophy.html)\r
- [AI Native \u524D\u7AEF\u5DE5\u4F5C\u6D41](/blog/ai-native-frontend-workflow.html)\r
- [Claude Code \u5DE5\u7A0B\u5316\u5DE5\u4F5C\u6D41](/blog/claude-code-engineering-workflow.html)\r
- [Claude Code \u591A\u4EE3\u7406\u534F\u4F5C\u7B56\u7565](/blog/claude-code-multi-agent-strategy.html)\r
- [Claude Code \u5927\u4ED3\u5E93\u8C03\u8BD5\u4E0E\u91CD\u6784](/blog/claude-code-large-repo-debug-refactor.html)\r
- [Claude Code \u5B89\u5168\u4E0E\u6CBB\u7406](/blog/claude-code-security-governance.html)\r
- [\u65E7\u7AD9\u5185\u5BB9\u5F52\u6863](/blog/legacy-notes.html)\r
\r
## \u672C\u7AD9\u5B9A\u4F4D\r
\r
- \u8BB0\u5F55\u7ECF\u5178 JavaScript \u8BBE\u8BA1\u6A21\u5F0F\u7406\u89E3\r
- \u4FDD\u7559\u65E9\u671F\u793A\u4F8B\uFF0C\u8865\u5145\u7ED3\u6784\u5316\u9605\u8BFB\u8DEF\u5F84\r
- \u5728\u4E0D\u6539\u53D8\u6838\u5FC3\u89C2\u70B9\u7684\u524D\u63D0\u4E0B\u63D0\u5347\u53EF\u8BFB\u6027\r
`,rp=`# AI Native \u524D\u7AEF\u5DE5\u4F5C\u6D41\uFF1A\u628A Codex/Agent \u53D8\u6210\u7A33\u5B9A\u4EA7\u80FD\r
\r
AI \u4E0D\u8BE5\u53EA\u7528\u6765\u201C\u751F\u6210\u4EE3\u7801\u7247\u6BB5\u201D\uFF0C\u800C\u5E94\u8FDB\u5165\u5B8C\u6574\u4EA4\u4ED8\u94FE\u8DEF\u3002\r
\r
## 1. \u63A8\u8350\u5DE5\u4F5C\u6D41\r
\r
1. \u9700\u6C42\u7ED3\u6784\u5316\uFF1A\u76EE\u6807\u3001\u8303\u56F4\u3001\u7EA6\u675F\u3001\u9A8C\u6536\r
2. Agent \u6267\u884C\uFF1A\u5148\u4E0A\u4E0B\u6587\u626B\u63CF\uFF0C\u518D\u5206\u6B65\u6539\u52A8\r
3. \u81EA\u52A8\u9A8C\u8BC1\uFF1Alint/test/build \u5168\u8DD1\r
4. \u4EA4\u4ED8\u6C47\u603B\uFF1A\u53D8\u66F4\u6587\u4EF6\u3001\u98CE\u9669\u3001\u56DE\u6EDA\u65B9\u6848\r
\r
## 2. Prompt \u4E0D\u662F\u201C\u63D0\u95EE\u201D\uFF0C\u662F\u201C\u4EFB\u52A1\u534F\u8BAE\u201D\r
\r
\u4E00\u4E2A\u53EF\u6267\u884C Prompt \u81F3\u5C11\u5305\u542B\uFF1A\r
\r
- \u76EE\u6807\uFF08\u505A\u6210\u4EC0\u4E48\uFF09\r
- \u8FB9\u754C\uFF08\u80FD\u6539\u4EC0\u4E48\uFF09\r
- \u7EA6\u675F\uFF08\u4E0D\u80FD\u505A\u4EC0\u4E48\uFF09\r
- \u9A8C\u6536\uFF08\u600E\u4E48\u5224\u65AD\u5B8C\u6210\uFF09\r
- \u8F93\u51FA\u683C\u5F0F\uFF08\u4F60\u5E0C\u671B\u5B83\u5982\u4F55\u6C47\u62A5\uFF09\r
\r
## 3. \u67B6\u6784\u5C42\u9762\u600E\u4E48\u63A5\u5165 AI\r
\r
- \u56E2\u961F\u7EA7\u6A21\u677F\uFF1A\u7EDF\u4E00 Prompt \u6A21\u677F\u548C\u8F93\u51FA\u6A21\u677F\r
- CI \u95E8\u7981\uFF1AAI \u751F\u6210\u4EE3\u7801\u4E5F\u5FC5\u987B\u8FC7\u540C\u6837\u7684\u68C0\u67E5\r
- \u98CE\u9669\u5206\u7EA7\uFF1A\u9AD8\u98CE\u9669\u53D8\u66F4\u5F3A\u5236\u4EBA\u5DE5\u4E8C\u6B21\u8BC4\u5BA1\r
\r
## 4. \u54F2\u5B66\uFF1A\u4EBA\u673A\u534F\u4F5C\uFF0C\u4E0D\u662F\u4EBA\u673A\u66FF\u4EE3\r
\r
- \u4EBA\u8D1F\u8D23\u5224\u65AD\u4E0E\u53D6\u820D\r
- Agent \u8D1F\u8D23\u6267\u884C\u4E0E\u63D0\u901F\r
- \u8D28\u91CF\u6807\u51C6\u4E0D\u56E0 AI \u964D\u7EA7\r
\r
## 5. \u5B9E\u6218\u5EFA\u8BAE\r
\r
1. \u4ECE\u4F4E\u98CE\u9669\u4EFB\u52A1\u8BD5\u70B9\uFF1A\u6837\u5F0F\u3001\u6587\u6863\u3001\u6D4B\u8BD5\u8865\u9F50\r
2. \u518D\u6269\u5C55\u5230\u4E2D\u98CE\u9669\u4EFB\u52A1\uFF1A\u9875\u9762\u6A21\u5757\u3001\u8DEF\u7531\u3001\u72B6\u6001\r
3. \u6700\u540E\u518D\u8FDB\u5165\u9AD8\u98CE\u9669\u4EFB\u52A1\uFF1A\u67B6\u6784\u91CD\u6784\u3001\u6838\u5FC3\u94FE\u8DEF\r
\r
## 6. \u7ED3\u8BBA\r
\r
AI Native \u56E2\u961F\u7684\u6838\u5FC3\u80FD\u529B\uFF0C\u4E0D\u662F\u201C\u4F1A\u4E0D\u4F1A\u7528\u5DE5\u5177\u201D\uFF0C\u800C\u662F\u201C\u6709\u6CA1\u6709\u628A\u5DE5\u5177\u7EB3\u5165\u5DE5\u7A0B\u7CFB\u7EDF\u201D\u3002\r
`,np=`# Claude Code \u5DE5\u7A0B\u5316\u5DE5\u4F5C\u6D41\uFF1A\u4ECE\u9700\u6C42\u5230 PR \u7684\u53EF\u590D\u5236\u8DEF\u5F84\r
\r
\u5F88\u591A\u56E2\u961F\u628A Claude Code \u5F53\u201C\u9AD8\u7EA7\u8865\u5168\u201D\uFF0C\u7ED3\u679C\u4E0D\u7A33\u5B9A\u3002  \r
\u66F4\u6709\u6548\u7684\u65B9\u5F0F\u662F\u628A\u5B83\u5D4C\u8FDB\u4EA4\u4ED8\u6D41\u7A0B\uFF0C\u800C\u4E0D\u662F\u5355\u70B9\u63D0\u95EE\u3002\r
\r
## 1. \u56DB\u9636\u6BB5\u5DE5\u4F5C\u6D41\r
\r
1. \u9700\u6C42\u7ED3\u6784\u5316\r
2. \u53D8\u66F4\u6267\u884C\r
3. \u9A8C\u8BC1\u95ED\u73AF\r
4. PR \u4EA4\u4ED8\r
\r
## 2. \u9636\u6BB5\u4E00\uFF1A\u9700\u6C42\u7ED3\u6784\u5316\uFF08\u51B3\u5B9A\u4E0A\u9650\uFF09\r
\r
\u8F93\u5165\u5EFA\u8BAE\u56FA\u5B9A\u4E3A\uFF1A\r
\r
- \u76EE\u6807\uFF1A\u6700\u7EC8\u53EF\u9A8C\u6536\u7ED3\u679C\r
- \u8FB9\u754C\uFF1A\u5141\u8BB8\u6539\u54EA\u4E9B\u6587\u4EF6\uFF0C\u4E0D\u5141\u8BB8\u52A8\u54EA\u4E9B\u6A21\u5757\r
- \u7EA6\u675F\uFF1A\u7248\u672C\u3001\u517C\u5BB9\u6027\u3001\u98CE\u683C\u3001\u6027\u80FD\u7EA2\u7EBF\r
- \u9A8C\u6536\uFF1A\u5FC5\u987B\u901A\u8FC7\u7684\u547D\u4EE4\u4E0E\u884C\u4E3A\r
\r
\u5982\u679C\u8F93\u5165\u6A21\u7CCA\uFF0C\u540E\u7EED\u6240\u6709\u201C\u4FEE\u8865\u201D\u90FD\u662F\u9AD8\u6210\u672C\u3002\r
\r
## 3. \u9636\u6BB5\u4E8C\uFF1A\u53D8\u66F4\u6267\u884C\uFF08\u5148\u901A\u8DEF\u518D\u4F18\u5316\uFF09\r
\r
\u63A8\u8350\u987A\u5E8F\uFF1A\r
\r
1. \u5148\u8865\u6570\u636E/\u8DEF\u7531\u901A\u8DEF\r
2. \u518D\u8865\u9875\u9762\u4E0E\u4EA4\u4E92\r
3. \u6700\u540E\u505A\u6837\u5F0F\u4E0E\u91CD\u6784\r
\r
\u6BCF\u4E00\u6B65\u90FD\u8981\u6C42\u8F93\u51FA\uFF1A\r
\r
- \u6539\u4E86\u54EA\u4E9B\u6587\u4EF6\r
- \u4E3A\u4EC0\u4E48\u8FD9\u6837\u6539\r
- \u53EF\u80FD\u5F71\u54CD\u54EA\u4E9B\u8DEF\u5F84\r
\r
## 4. \u9636\u6BB5\u4E09\uFF1A\u9A8C\u8BC1\u95ED\u73AF\uFF08\u8BC1\u636E\u5148\u4E8E\u7ED3\u8BBA\uFF09\r
\r
\u81F3\u5C11\u8DD1\u4E09\u7C7B\u9A8C\u8BC1\uFF1A\r
\r
- \u9759\u6001\u68C0\u67E5\uFF1Alint / type-check\r
- \u5355\u5143\u9A8C\u8BC1\uFF1Atest\r
- \u4EA4\u4ED8\u9A8C\u8BC1\uFF1Abuild / preview\r
\r
\u8BA9 Claude Code \u8F93\u51FA\u201C\u547D\u4EE4 + \u5173\u952E\u7ED3\u679C\u6458\u8981\u201D\uFF0C\u800C\u4E0D\u662F\u53EA\u8BF4\u201C\u5DF2\u901A\u8FC7\u201D\u3002\r
\r
## 5. \u9636\u6BB5\u56DB\uFF1APR \u4EA4\u4ED8\uFF08\u53EF\u5BA1\u9605\u3001\u53EF\u56DE\u6EDA\uFF09\r
\r
PR \u63CF\u8FF0\u5EFA\u8BAE\u56FA\u5B9A\u6A21\u677F\uFF1A\r
\r
\`\`\`text\r
Purpose:\r
Key Changes:\r
Verification:\r
Risk:\r
Rollback:\r
\`\`\`\r
\r
## 6. \u7ED3\u8BBA\r
\r
Claude Code \u7684\u4EF7\u503C\u4E0D\u5728\u201C\u5199\u5F97\u5FEB\u201D\uFF0C\u800C\u5728\u201C\u5FEB\u4E14\u53EF\u9A8C\u8BC1\u201D\u3002  \r
\u628A\u5B83\u653E\u8FDB\u5DE5\u7A0B\u6D41\u7A0B\uFF0C\u624D\u662F\u7A33\u5B9A\u4EA7\u80FD\u3002\r
`,ip=`# Claude Code \u5728\u5927\u578B\u524D\u7AEF\u4ED3\u5E93\u7684\u8C03\u8BD5\u4E0E\u91CD\u6784\u65B9\u6CD5\r
\r
\u5927\u578B\u4ED3\u5E93\u91CC\uFF0CClaude Code \u7684\u96BE\u70B9\u4E0D\u662F\u201C\u5199\u529F\u80FD\u201D\uFF0C\u800C\u662F\u201C\u5B9A\u4F4D\u95EE\u9898\u4E0E\u63A7\u5236\u5F71\u54CD\u9762\u201D\u3002\r
\r
## 1. \u8C03\u8BD5\u524D\u5148\u505A\u4E0A\u4E0B\u6587\u6536\u655B\r
\r
\u5EFA\u8BAE\u5148\u6536\u655B\u4E09\u4EF6\u4E8B\uFF1A\r
\r
1. \u5931\u8D25\u75C7\u72B6\uFF1A\u62A5\u9519\u65E5\u5FD7\u3001\u590D\u73B0\u6B65\u9AA4\u3001\u5F71\u54CD\u8303\u56F4\r
2. \u6700\u8FD1\u53D8\u66F4\uFF1A\u6700\u8FD1\u63D0\u4EA4\u3001\u4F9D\u8D56\u5347\u7EA7\u3001\u914D\u7F6E\u8C03\u6574\r
3. \u5173\u952E\u8DEF\u5F84\uFF1A\u89E6\u53D1\u95EE\u9898\u7684\u8DEF\u7531\u4E0E\u6A21\u5757\u94FE\u8DEF\r
\r
\u6CA1\u6709\u6536\u655B\uFF0C\u8C03\u8BD5\u4F1A\u53D8\u6210\u76F2\u76EE\u641C\u7D22\u3002\r
\r
## 2. \u7CFB\u7EDF\u5316\u8C03\u8BD5\u6B65\u9AA4\r
\r
1. \u5148\u590D\u73B0\uFF08\u6700\u5C0F\u8DEF\u5F84\uFF09\r
2. \u518D\u89C2\u6D4B\uFF08\u65E5\u5FD7\u3001\u57CB\u70B9\u3001\u65AD\u70B9\uFF09\r
3. \u518D\u5B9A\u4F4D\uFF08\u8C03\u7528\u94FE\u3001\u72B6\u6001\u94FE\u3001\u6E32\u67D3\u94FE\uFF09\r
4. \u518D\u4FEE\u590D\uFF08\u6700\u5C0F\u6539\u52A8\uFF09\r
5. \u518D\u56DE\u5F52\uFF08\u5173\u8054\u573A\u666F\uFF09\r
\r
## 3. \u91CD\u6784\u7B56\u7565\uFF1A\u5206\u5C42\u66FF\u6362\u800C\u975E\u6574\u5757\u91CD\u5199\r
\r
\u63A8\u8350\u987A\u5E8F\uFF1A\r
\r
1. \u63D0\u53D6\u7EAF\u51FD\u6570\u4E0E\u7C7B\u578B\r
2. \u6536\u655B\u526F\u4F5C\u7528\uFF08\u8BF7\u6C42\u3001\u8BA2\u9605\u3001\u5B9A\u65F6\u5668\uFF09\r
3. \u62C6\u5206\u5DE8\u578B\u7EC4\u4EF6\r
4. \u8865\u6D4B\u8BD5\u540E\u518D\u7EE7\u7EED\u62BD\u8C61\r
\r
## 4. \u98CE\u9669\u63A7\u5236\u6E05\u5355\r
\r
- \u662F\u5426\u6539\u53D8\u5BF9\u5916\u63A5\u53E3\r
- \u662F\u5426\u5F71\u54CD\u8DEF\u7531/\u6743\u9650/\u7F13\u5B58\r
- \u662F\u5426\u589E\u52A0\u9996\u5C4F\u6216\u4E3B\u5305\u4F53\u79EF\r
- \u662F\u5426\u5F15\u5165\u8DE8\u6A21\u5757\u5FAA\u73AF\u4F9D\u8D56\r
\r
## 5. \u5178\u578B Prompt\r
\r
\`\`\`text\r
\u76EE\u6807\uFF1A\u4FEE\u590D\u67D0\u9875\u9762\u5185\u5B58\u4E0A\u6DA8\u95EE\u9898\u5E76\u505A\u6700\u5C0F\u91CD\u6784\r
\u8303\u56F4\uFF1Asrc/views/x, src/stores/y\r
\u7EA6\u675F\uFF1A\u4E0D\u6539 API \u534F\u8BAE\uFF0C\u4E0D\u5F15\u5165\u65B0\u4F9D\u8D56\r
\u9A8C\u6536\uFF1A\u6D4B\u8BD5\u901A\u8FC7 + build \u901A\u8FC7 + \u590D\u73B0\u8DEF\u5F84\u7A33\u5B9A\r
\`\`\`\r
\r
## 6. \u7ED3\u8BBA\r
\r
\u5728\u5927\u4ED3\u5E93\u91CC\uFF0CClaude Code \u7684\u6700\u4F73\u89D2\u8272\u662F\u201C\u53EF\u63A7\u6267\u884C\u5668\u201D\uFF1A  \r
\u5148\u5B9A\u4F4D\uFF0C\u518D\u5C0F\u6B65\u6539\u52A8\uFF0C\u518D\u8BC1\u636E\u5316\u9A8C\u8BC1\u3002\r
`,op=`# Claude Code \u591A\u4EE3\u7406\u534F\u4F5C\uFF1A\u4EFB\u52A1\u5207\u7247\u3001\u5E76\u884C\u6267\u884C\u4E0E\u7ED3\u679C\u5408\u5E76\r
\r
\u591A\u4EE3\u7406\u4E0D\u662F\u201C\u591A\u5F00\u51E0\u4E2A\u7A97\u53E3\u201D\uFF0C\u5173\u952E\u662F\u5207\u7247\u7B56\u7565\u3002\r
\r
## 1. \u4EC0\u4E48\u65F6\u5019\u8BE5\u5E76\u884C\r
\r
\u9002\u5408\u5E76\u884C\u7684\u4EFB\u52A1\uFF1A\r
\r
- \u4E92\u4E0D\u4F9D\u8D56\u7684\u8BFB\u64CD\u4F5C\uFF1A\u4EE3\u7801\u626B\u63CF\u3001\u914D\u7F6E\u68B3\u7406\u3001\u63A5\u53E3\u76D8\u70B9\r
- \u5199\u5165\u8303\u56F4\u4E92\u65A5\u7684\u5B9E\u73B0\u4EFB\u52A1\uFF1AA \u6539\u8DEF\u7531\uFF0CB \u6539\u7EC4\u4EF6\uFF0CC \u6539\u6D4B\u8BD5\r
- \u4E0E\u4E3B\u7EBF\u5E76\u884C\u7684\u9A8C\u8BC1\u4EFB\u52A1\uFF1A\u6027\u80FD\u5BF9\u6BD4\u3001\u56DE\u5F52\u68C0\u67E5\r
\r
\u4E0D\u9002\u5408\u5E76\u884C\uFF1A\r
\r
- \u540C\u4E00\u6587\u4EF6\u7684\u9AD8\u8026\u5408\u6539\u52A8\r
- \u7ED3\u679C\u5FC5\u987B\u4E32\u884C\u51B3\u7B56\u7684\u5173\u952E\u8DEF\u5F84\r
\r
## 2. \u5207\u7247\u539F\u5219\r
\r
1. \u660E\u786E\u6240\u6709\u6743\uFF1A\u6BCF\u4E2A\u4EE3\u7406\u8D1F\u8D23\u54EA\u4E9B\u6587\u4EF6\r
2. \u660E\u786E\u8F93\u51FA\u7269\uFF1A\u4E0D\u662F\u201C\u5206\u6790\u4E00\u4E0B\u201D\uFF0C\u800C\u662F\u201C\u63D0\u4EA4\u53EF\u5408\u5E76\u53D8\u66F4\u201D\r
3. \u660E\u786E\u5B8C\u6210\u6761\u4EF6\uFF1A\u5FC5\u987B\u53EF\u9A8C\u8BC1\r
\r
## 3. \u63A8\u8350\u7F16\u6392\u6A21\u578B\r
\r
1. \u4E3B\u4EE3\u7406\uFF1A\u8D1F\u8D23\u4EFB\u52A1\u62C6\u5206\u4E0E\u6700\u7EC8\u96C6\u6210\r
2. \u6267\u884C\u4EE3\u7406\uFF1A\u6309\u6A21\u5757\u6539\u4EE3\u7801\r
3. \u6821\u9A8C\u4EE3\u7406\uFF1A\u72EC\u7ACB\u8FD0\u884C\u6D4B\u8BD5/\u6784\u5EFA/\u98CE\u9669\u626B\u63CF\r
\r
\u4E3B\u4EE3\u7406\u4E0D\u91CD\u590D\u505A\u5B50\u4EE3\u7406\u5DF2\u5B8C\u6210\u7684\u5DE5\u4F5C\uFF0C\u53EA\u505A\u6574\u5408\u4E0E\u51B2\u7A81\u6D88\u89E3\u3002\r
\r
## 4. \u5408\u5E76\u7B56\u7565\r
\r
- \u5148\u5408\u5E76\u4F4E\u98CE\u9669\u3001\u4F4E\u8026\u5408 patch\r
- \u518D\u5408\u5E76\u9AD8\u98CE\u9669\u6539\u52A8\r
- \u6BCF\u5408\u5E76\u4E00\u6B65\u90FD\u8DD1\u6700\u5C0F\u9A8C\u8BC1\r
\r
## 5. \u5E38\u89C1\u5931\u8D25\u6A21\u5F0F\r
\r
- \u5207\u7247\u6309\u201C\u529F\u80FD\u540D\u201D\u800C\u4E0D\u662F\u201C\u6587\u4EF6\u8FB9\u754C\u201D\r
- \u591A\u4EE3\u7406\u90FD\u6539\u540C\u4E00\u6838\u5FC3\u6587\u4EF6\r
- \u5FFD\u7565\u516C\u5171\u7C7B\u578B/\u5DE5\u5177\u53D8\u66F4\u7684\u8FDE\u9501\u5F71\u54CD\r
\r
## 6. \u7ED3\u8BBA\r
\r
\u591A\u4EE3\u7406\u63D0\u5347\u7684\u662F\u541E\u5410\uFF0C\u4E0D\u662F\u6B63\u786E\u6027\u3002  \r
\u6B63\u786E\u6027\u4ECD\u6765\u81EA\uFF1A\u6E05\u6670\u8FB9\u754C\u3001\u53EF\u9A8C\u8BC1\u8F93\u51FA\u3001\u7A33\u5B9A\u5408\u5E76\u7B56\u7565\u3002\r
`,ap=`# Claude Code \u5B89\u5168\u8FB9\u754C\u4E0E\u98CE\u9669\u6CBB\u7406\uFF1A\u56E2\u961F\u843D\u5730\u5FC5\u8BFB\r
\r
AI \u7F16\u7801\u63D0\u901F\u5F88\u5FEB\uFF0C\u4F46\u6CA1\u6709\u6CBB\u7406\u5C31\u4F1A\u653E\u5927\u98CE\u9669\u3002\r
\r
## 1. \u4E09\u7C7B\u6838\u5FC3\u98CE\u9669\r
\r
1. \u4EE3\u7801\u98CE\u9669\uFF1A\u9519\u8BEF\u903B\u8F91\u3001\u56DE\u5F52\u7F3A\u9677\u3001\u6027\u80FD\u9000\u5316\r
2. \u6570\u636E\u98CE\u9669\uFF1A\u654F\u611F\u4FE1\u606F\u6CC4\u9732\u3001\u65E5\u5FD7\u66B4\u9732\r
3. \u6D41\u7A0B\u98CE\u9669\uFF1A\u8D8A\u6743\u6539\u52A8\u3001\u4E0D\u53EF\u8FFD\u6EAF\u4EA4\u4ED8\r
\r
## 2. \u6743\u9650\u6A21\u578B\u5EFA\u8BAE\r
\r
- \u8BFB\u6743\u9650\u9ED8\u8BA4\u5F00\u653E\r
- \u5199\u6743\u9650\u6309\u76EE\u5F55\u548C\u4EFB\u52A1\u5206\u7EA7\r
- \u9AD8\u98CE\u9669\u76EE\u5F55\uFF08\u9274\u6743\u3001\u652F\u4ED8\u3001\u5B89\u5168\uFF09\u5F3A\u5236\u4EBA\u5DE5\u6279\u51C6\r
\r
## 3. \u4EFB\u52A1\u5206\u7EA7\u6CBB\u7406\r
\r
- L1 \u4F4E\u98CE\u9669\uFF1A\u6837\u5F0F\u3001\u6587\u6863\u3001\u6D4B\u8BD5\u8865\u9F50\r
- L2 \u4E2D\u98CE\u9669\uFF1A\u9875\u9762\u903B\u8F91\u3001\u72B6\u6001\u6D41\u6539\u9020\r
- L3 \u9AD8\u98CE\u9669\uFF1A\u6838\u5FC3\u94FE\u8DEF\u3001\u9274\u6743\u3001\u4EA4\u6613\u6D41\u7A0B\r
\r
L3 \u5FC5\u987B\u53CC\u4EBA\u8BC4\u5BA1 + \u5168\u91CF\u56DE\u5F52\u3002\r
\r
## 4. \u5B89\u5168\u5B9E\u8DF5\u6E05\u5355\r
\r
1. Prompt \u4E0D\u76F4\u63A5\u5199\u771F\u5B9E\u5BC6\u94A5\u4E0E\u9690\u79C1\u6570\u636E\r
2. \u8F93\u51FA\u4E2D\u81EA\u52A8\u626B\u63CF\u654F\u611F\u4E32\uFF08token/key/secret\uFF09\r
3. CI \u5F3A\u5236 lint/test/build \u95E8\u7981\r
4. \u5173\u952E\u6539\u52A8\u8BB0\u5F55 ADR \u4E0E\u56DE\u6EDA\u65B9\u6848\r
\r
## 5. \u53EF\u8FFD\u6EAF\u4EA4\u4ED8\u8981\u6C42\r
\r
\u6BCF\u6B21 AI \u534F\u4F5C\u90FD\u8981\u7559\u4E0B\uFF1A\r
\r
- \u8F93\u5165\u4EFB\u52A1\u5B9A\u4E49\r
- \u53D8\u66F4\u6587\u4EF6\u5217\u8868\r
- \u9A8C\u8BC1\u547D\u4EE4\u4E0E\u7ED3\u679C\r
- \u98CE\u9669\u4E0E\u56DE\u6EDA\u8BF4\u660E\r
\r
\u8FD9\u51B3\u5B9A\u4E86\u95EE\u9898\u53D1\u751F\u65F6\u662F\u5426\u80FD\u5FEB\u901F\u6B62\u635F\u3002\r
\r
## 6. \u7ED3\u8BBA\r
\r
Claude Code \u7684\u6CBB\u7406\u76EE\u6807\u4E0D\u662F\u201C\u9650\u5236\u6548\u7387\u201D\uFF0C\u800C\u662F\u201C\u628A\u6548\u7387\u53D8\u6210\u53EF\u63A7\u6536\u76CA\u201D\u3002\r
`,sp=`# Pattern \u4EE3\u7801\u793A\u4F8B\u96C6\r
\r
\u4EE5\u4E0B\u4EE3\u7801\u6765\u81EA \`pattern/\` \u76EE\u5F55\uFF0C\u4F5C\u4E3A\u6587\u7AE0\u914D\u5957\u5B9E\u9A8C\u6750\u6599\u3002\r
\r
## \`mediator.js\`\r
\r
\`\`\`js\r
// simple implement\r
var mediator = (function () {\r
  var topics = {}\r
\r
  var subscribe = function (topic, fn) {\r
    if (!topics[topic]) topics[topic] = []\r
    topics[topic].push({ context: this, callback: fn })\r
    return this\r
  }\r
\r
  var publish = function (topic) {\r
    if (!topics[topic]) return false\r
    var args = Array.prototype.slice.call(arguments, 1)\r
    for (var i = 0; i < topics[topic].length; i++) {\r
      var subscriber = topics[topic][i]\r
      subscriber.callback.apply(subscriber.context, args)\r
    }\r
    return this\r
  }\r
\r
  return { subscribe: subscribe, publish: publish }\r
})()\r
\`\`\`\r
\r
## \`Publish.js\`\r
\r
\`\`\`js\r
var pubsub = {}\r
;(function (myObject) {\r
  var topics = {}\r
  var subscribeId = 0\r
\r
  myObject.subscribe = function (topic, func) {\r
    if (!topics[topic]) topics[topic] = []\r
    var token = (++subscribeId).toString()\r
    topics[topic].push({ func: func, token: token })\r
    return token\r
  }\r
\r
  myObject.Publish = function (topic, args) {\r
    var targetSubscribers = topics[topic] || []\r
    for (var i = 0; i < targetSubscribers.length; i++) {\r
      targetSubscribers[i].func(args)\r
    }\r
    return this\r
  }\r
})(pubsub)\r
\`\`\`\r
\r
## \`Observer.html\`\r
\r
\`\`\`html\r
<input type="checkbox" id="mainCheckbox" />\r
<button id="addNewObserver">\u6DFB\u52A0\u76D1\u542C\u5668</button>\r
<div id="observersContainer"></div>\r
\`\`\`\r
\r
\u53EF\u5728\u672C\u5730\u6253\u5F00 \`pattern/Observer.html\` \u4F53\u9A8C\u52A8\u6001\u65B0\u589E\u89C2\u5BDF\u8005\u3002\r
`,cp=`# Codex Agent \u5DE5\u4F5C\u6D41\uFF1A\u9700\u6C42\u5230\u4EA4\u4ED8\u7684\u6700\u77ED\u8DEF\u5F84\r
\r
\u628A Codex \u5F53\u201C\u52A9\u624B\u201D\u5BB9\u6613\u5931\u63A7\uFF0C\u628A\u5B83\u5F53\u201C\u6267\u884C\u4EE3\u7406\u201D\u4F1A\u66F4\u7A33\u5B9A\u3002\r
\r
## \u4E00\u6761\u63A8\u8350\u5DE5\u4F5C\u6D41\r
\r
1. \u5B9A\u4E49\u76EE\u6807\uFF1A\u4E00\u53E5\u8BDD\u8BF4\u660E\u6700\u7EC8\u53EF\u9A8C\u6536\u7ED3\u679C\r
2. \u9501\u5B9A\u8303\u56F4\uFF1A\u660E\u786E\u53EF\u6539\u6587\u4EF6\u4E0E\u4E0D\u53EF\u6539\u8FB9\u754C\r
3. \u5206\u6B65\u6267\u884C\uFF1A\u5148\u6539\u6570\u636E\u5C42\uFF0C\u518D\u6539\u9875\u9762\uFF0C\u518D\u8DD1\u9A8C\u8BC1\r
4. \u6C47\u603B\u8BC1\u636E\uFF1A\u8F93\u51FA\u547D\u4EE4\u7ED3\u679C\u4E0E\u5173\u952E diff\r
\r
## \u4E3A\u4EC0\u4E48\u6709\u6548\r
\r
- \u4EFB\u52A1\u5207\u7247\u540E\uFF0C\u9519\u8BEF\u66F4\u5BB9\u6613\u56DE\u6EDA\r
- \u6BCF\u4E00\u6B65\u90FD\u6709\u53EF\u89C2\u6D4B\u7ED3\u679C\uFF08\u6D4B\u8BD5/\u6784\u5EFA\uFF09\r
- \u6700\u7EC8\u8F93\u51FA\u66F4\u8D34\u8FD1 PR \u63CF\u8FF0\u683C\u5F0F\r
\r
## \u6A21\u677F\r
\r
\`\`\`text\r
Step 1: Gather context\r
Step 2: Implement changes\r
Step 3: Verify (test/build)\r
Step 4: Summarize with file list\r
\`\`\`\r
\r
## \u5B9E\u6218\u63D0\u9192\r
\r
- \u4E0D\u8981\u4E00\u6B21\u585E\u8FDB\u201C\u91CD\u6784+\u65B0\u529F\u80FD+\u6837\u5F0F\u5927\u6539\u201D\r
- \u5148\u901A\u8DEF\u518D\u4F18\u5316\uFF0C\u5148\u53EF\u7528\u518D\u4F18\u96C5\r
- \u6BCF\u4E00\u6B65\u90FD\u4FDD\u7559\u53EF\u56DE\u6EDA\u8282\u70B9\r
`,up=`# \u4ECE Codex CLI \u5230 PR\uFF1A\u4E00\u5957\u53EF\u590D\u7528\u4EA4\u4ED8\u6E05\u5355\r
\r
\u8FD9\u7BC7\u6587\u7AE0\u5173\u6CE8\u201C\u600E\u4E48\u628A Codex \u8F93\u51FA\u53D8\u6210\u56E2\u961F\u53EF\u63A5\u53D7\u7684\u4EA4\u4ED8\u7269\u201D\u3002\r
\r
## 1. \u672C\u5730\u9636\u6BB5\r
\r
- \u660E\u786E\u53D8\u66F4\u8303\u56F4\u4E0E\u76EE\u6807\r
- \u8BA9 Codex \u8F93\u51FA\u5177\u4F53\u6587\u4EF6\u53D8\u66F4\r
- \u672C\u5730\u8DD1 \`lint / test / build\`\r
\r
## 2. \u63D0\u4EA4\u9636\u6BB5\r
\r
- \u63D0\u4EA4\u4FE1\u606F\u4FDD\u6301 Conventional Commits\r
- \u63CF\u8FF0\u4E2D\u5305\u542B\uFF1A\u76EE\u7684\u3001\u6539\u52A8\u3001\u9A8C\u8BC1\u547D\u4EE4\r
- UI \u6539\u52A8\u9644\u622A\u56FE\u6216\u5F55\u5C4F\r
\r
## 3. PR \u9636\u6BB5\r
\r
- \u5148\u5199\u98CE\u9669\u70B9\uFF0C\u518D\u5199\u6539\u52A8\u7EC6\u8282\r
- \u8BF4\u660E\u56DE\u6EDA\u65B9\u6848\r
- \u5217\u51FA\u672A\u8986\u76D6\u7684\u8FB9\u754C\u573A\u666F\r
\r
## 4. \u53EF\u590D\u7528\u6A21\u677F\r
\r
\`\`\`text\r
Purpose:\r
Key Changes:\r
Verification:\r
Risk:\r
Rollback:\r
\`\`\`\r
\r
## 5. \u7ED3\u8BBA\r
\r
Codex \u53EF\u4EE5\u5927\u5E45\u63D0\u901F\uFF0C\u4F46\u201C\u53EF\u5BA1\u9605\u3001\u53EF\u9A8C\u8BC1\u3001\u53EF\u56DE\u6EDA\u201D\u624D\u662F\u56E2\u961F\u4EA4\u4ED8\u6807\u51C6\u3002\r
`,fp=`# Codex Prompt \u8C03\u8BD5\u624B\u518C\uFF1A\u4ECE\u201C\u8BF4\u4E0D\u6E05\u201D\u5230\u201C\u53EF\u6267\u884C\u201D\r
\r
\u5F88\u591A\u4EBA\u89C9\u5F97 Codex \u4E0D\u7A33\u5B9A\uFF0C\u5B9E\u9645\u95EE\u9898\u5E38\u5E38\u4E0D\u662F\u6A21\u578B\u80FD\u529B\uFF0C\u800C\u662F Prompt \u4E0D\u53EF\u6267\u884C\u3002\r
\r
## 1. \u5178\u578B\u574F\u5473\u9053\r
\r
- \u76EE\u6807\u6A21\u7CCA\uFF1A\u6BD4\u5982\u201C\u5E2E\u6211\u4F18\u5316\u4E00\u4E0B\u9879\u76EE\u201D\r
- \u6CA1\u6709\u8FB9\u754C\uFF1A\u6CA1\u6709\u9650\u5B9A\u6587\u4EF6\u8303\u56F4\u3001\u6280\u672F\u6808\u3001\u9A8C\u6536\u6807\u51C6\r
- \u7F3A\u5931\u9A8C\u8BC1\uFF1A\u6CA1\u6709\u8981\u6C42\u6D4B\u8BD5\u3001\u6784\u5EFA\u6216\u56DE\u5F52\u6B65\u9AA4\r
\r
## 2. \u53EF\u6267\u884C Prompt \u6A21\u677F\r
\r
\`\`\`text\r
\u76EE\u6807\uFF1A\r
\u6280\u672F\u6808\uFF1A\r
\u6539\u52A8\u8303\u56F4\uFF08\u6587\u4EF6/\u6A21\u5757\uFF09\uFF1A\r
\u7EA6\u675F\uFF1A\r
\u9A8C\u6536\u6807\u51C6\uFF1A\r
\u8F93\u51FA\u683C\u5F0F\uFF1A\r
\`\`\`\r
\r
## 3. \u8C03\u8BD5\u65B9\u6CD5\r
\r
1. \u5148\u7F29\u5C0F\u4EFB\u52A1\u8303\u56F4\uFF0C\u53EA\u7ED9\u4E00\u4E2A\u6587\u4EF6\u6216\u4E00\u4E2A\u8DEF\u7531\u3002\r
2. \u8981\u6C42\u8F93\u51FA\u201C\u53D8\u66F4\u70B9\u5217\u8868\u201D\uFF0C\u4E0D\u8981\u76F4\u63A5\u5927\u6BB5\u89E3\u91CA\u3002\r
3. \u5F3A\u5236\u8981\u6C42\u9A8C\u8BC1\u547D\u4EE4\u548C\u7ED3\u679C\u6458\u8981\u3002\r
4. \u5982\u679C\u7B2C\u4E00\u6B21\u8DD1\u504F\uFF0C\u8FFD\u52A0\u201C\u53CD\u4F8B\u7EA6\u675F\u201D\u3002\r
\r
## 4. \u5B9E\u6218\u793A\u4F8B\r
\r
\`\`\`text\r
\u76EE\u6807\uFF1A\u65B0\u589E /blog/:slug \u8BE6\u60C5\u9875\u5E76\u63A5\u5165\u9996\u9875\r
\u6280\u672F\u6808\uFF1AVue2 + Vite + Vue Router\r
\u6539\u52A8\u8303\u56F4\uFF1Asrc/views/HomeView.vue, src/views/BlogDetailView.vue, src/router/index.ts\r
\u7EA6\u675F\uFF1A\u4E0D\u6539\u63A5\u53E3\u5C42\uFF0C\u4E0D\u5F15\u5165\u7B2C\u4E09\u65B9\u5305\r
\u9A8C\u6536\u6807\u51C6\uFF1Anpm run build-only \u901A\u8FC7\uFF0C\u9996\u9875\u53EF\u8DF3\u8BE6\u60C5\u9875\r
\u8F93\u51FA\u683C\u5F0F\uFF1A\u5148\u7ED9\u53D8\u66F4\u8BA1\u5212\uFF0C\u518D\u7ED9\u4EE3\u7801\u6539\u52A8\u6458\u8981\r
\`\`\`\r
\r
## 5. \u7ED3\u8BBA\r
\r
Prompt \u8D28\u91CF = \u4EFB\u52A1\u6E05\u6670\u5EA6\u3002  \r
\u5F53\u8F93\u5165\u662F\u201C\u7ED3\u6784\u5316\u4EFB\u52A1\u5355\u201D\uFF0CCodex \u624D\u4F1A\u7A33\u5B9A\u8F93\u51FA\u201C\u5DE5\u7A0B\u7ED3\u679C\u201D\u3002\r
`,lp=`# \u524D\u7AEF\u67B6\u6784\u51B3\u7B56\u624B\u518C\uFF1A\u4E0D\u662F\u201C\u6700\u5148\u8FDB\u201D\uFF0C\u800C\u662F\u201C\u6700\u5339\u914D\u201D\r
\r
\u5F88\u591A\u67B6\u6784\u95EE\u9898\u4E0D\u5728\u6280\u672F\uFF0C\u800C\u5728\u51B3\u7B56\u65B9\u5F0F\u3002\r
\r
## 1. \u67B6\u6784\u5148\u56DE\u7B54 3 \u4E2A\u95EE\u9898\r
\r
1. \u8FD9\u4E2A\u9875\u9762\u7684\u6838\u5FC3\u76EE\u6807\u662F SEO\u3001\u8F6C\u5316\uFF0C\u8FD8\u662F\u6548\u7387\uFF1F\r
2. \u4E3B\u8981\u74F6\u9888\u662F\u9996\u5C4F\u3001\u4EA4\u4E92\uFF0C\u8FD8\u662F\u534F\u4F5C\u6210\u672C\uFF1F\r
3. \u56E2\u961F\u80FD\u5426\u957F\u671F\u7EF4\u62A4\u8FD9\u5957\u590D\u6742\u5EA6\uFF1F\r
\r
## 2. \u5E38\u89C1\u573A\u666F\u4E0E\u63A8\u8350\u7EC4\u5408\r
\r
## 2.1 \u5185\u5BB9\u4E0E\u8425\u9500\u7AD9\r
\r
- \u6E32\u67D3\uFF1ASSG/SSR\r
- \u4EA4\u4E92\uFF1AIslands/\u5C40\u90E8 hydration\r
- \u6570\u636E\uFF1ACDN + \u8F7B\u91CF BFF\r
\r
\u9002\u5408\uFF1A\u9700\u8981\u641C\u7D22\u66DD\u5149\u548C\u9AD8\u9996\u5C4F\u7A33\u5B9A\u6027\u7684\u9875\u9762\u3002\r
\r
## 2.2 \u540E\u53F0\u4E0E\u4E2D\u53F0\r
\r
- \u6E32\u67D3\uFF1ASPA\r
- \u6570\u636E\uFF1ABFF/\u7F51\u5173\u805A\u5408\r
- \u72B6\u6001\uFF1A\u670D\u52A1\u7AEF\u72B6\u6001\u4E0E\u672C\u5730\u72B6\u6001\u5206\u5C42\r
\r
\u9002\u5408\uFF1A\u91CD\u4EA4\u4E92\u3001\u4F4E SEO \u8BC9\u6C42\u3001\u590D\u6742\u6743\u9650\u3002\r
\r
## 2.3 \u591A\u56E2\u961F\u5E76\u884C\u7CFB\u7EDF\r
\r
- \u7EC4\u7EC7\uFF1A\u6A21\u5757\u5316\u4F18\u5148\uFF0C\u5FAE\u524D\u7AEF\u8C28\u614E\r
- \u5171\u4EAB\uFF1ADesign Token / \u7EC4\u4EF6\u5951\u7EA6 / API \u5951\u7EA6\r
- \u53D1\u5E03\uFF1A\u4E3B\u5E94\u7528\u7F16\u6392 + \u5B50\u6A21\u5757\u7070\u5EA6\r
\r
\u9002\u5408\uFF1A\u7EC4\u7EC7\u590D\u6742\u5EA6\u9AD8\u4E8E\u9875\u9762\u590D\u6742\u5EA6\u7684\u56E2\u961F\u3002\r
\r
## 3. \u4E00\u4E2A\u53EF\u6267\u884C\u7684 ADR \u6A21\u677F\r
\r
\`\`\`text\r
Context:\r
Options:\r
Decision:\r
Trade-offs:\r
Rollback Plan:\r
Success Metrics:\r
\`\`\`\r
\r
## 4. \u67B6\u6784\u5347\u7EA7\u8282\u594F\r
\r
1. \u5148\u5C40\u90E8\u8BD5\u70B9\uFF0C\u4E0D\u8981\u5168\u7AD9\u8FC1\u79FB\r
2. \u5148\u505A\u5EA6\u91CF\uFF0C\u518D\u505A\u4F18\u5316\r
3. \u5148\u5EFA\u56DE\u6EDA\u65B9\u6848\uFF0C\u518D\u4E0A\u7EBF\u65B0\u67B6\u6784\r
\r
## 5. \u7ED3\u8BBA\r
\r
\u597D\u67B6\u6784\u4E0D\u662F\u201C\u6280\u672F\u6808\u6E05\u5355\u201D\uFF0C\u800C\u662F\u201C\u51B3\u7B56\u8D28\u91CF + \u53EF\u56DE\u6EDA\u80FD\u529B\u201D\u3002\r
`,pp=`# \u524D\u7AEF\u5DE5\u7A0B\u7406\u5FF5\uFF1A\u5FEB\u3001\u7A33\u3001\u7B80\uFF0C\u4E0D\u505A\u65E0\u6548\u590D\u6742\u5316\r
\r
\u6280\u672F\u9009\u62E9\u6709\u6F6E\u6D41\uFF0C\u4F46\u5DE5\u7A0B\u6709\u5E95\u5C42\u89C4\u5F8B\u3002\r
\r
## 1. \u5FEB\uFF1A\u4EA4\u4ED8\u901F\u5EA6\u662F\u7ADE\u4E89\u529B\r
\r
- \u5FEB\u4E0D\u662F\u201C\u4E71\u6539\u201D\uFF0C\u800C\u662F\u201C\u53EF\u9A8C\u8BC1\u5730\u5FEB\u201D\r
- \u6BCF\u6B21\u6539\u52A8\u90FD\u8981\u6709\u6784\u5EFA\u3001\u6D4B\u8BD5\u3001\u56DE\u5F52\u8BC1\u636E\r
- \u901F\u5EA6\u6765\u81EA\u6807\u51C6\u5316\u6D41\u7A0B\uFF0C\u800C\u4E0D\u662F\u4E2A\u4EBA hero\r
\r
## 2. \u7A33\uFF1A\u7A33\u5B9A\u6027\u4F18\u5148\u4E8E\u70AB\u6280\r
\r
- \u6709\u964D\u7EA7\u8DEF\u5F84\u518D\u4E0A\u65B0\u80FD\u529B\r
- \u5173\u952E\u94FE\u8DEF\u5FC5\u987B\u53EF\u89C2\u6D4B\uFF08\u65E5\u5FD7\u3001\u57CB\u70B9\u3001\u9519\u8BEF\u805A\u5408\uFF09\r
- \u7EBF\u4E0A\u7B56\u7565\u4F18\u5148\u7070\u5EA6\uFF0C\u4E0D\u505A\u4E00\u5200\u5207\u53D1\u5E03\r
\r
## 3. \u7B80\uFF1A\u590D\u6742\u5EA6\u662F\u957F\u671F\u6210\u672C\r
\r
- \u4E00\u4E2A\u9700\u6C42\uFF0C\u4F18\u5148\u6700\u77ED\u53EF\u7528\u8DEF\u5F84\r
- \u80FD\u5220\u7684\u62BD\u8C61\u5C31\u5220\uFF0C\u80FD\u5C11\u7684\u5C42\u7EA7\u5C31\u5C11\r
- \u67B6\u6784\u5347\u7EA7\u8981\u53EF\u56DE\u6EDA\uFF0C\u4E0D\u53EF\u9006\u5C31\u662F\u98CE\u9669\r
\r
## 4. \u56E2\u961F\u534F\u4F5C\u54F2\u5B66\r
\r
- \u4EE3\u7801\u662F\u7ED9\u56E2\u961F\u7EF4\u62A4\uFF0C\u4E0D\u662F\u7ED9\u4F5C\u8005\u70AB\u6280\r
- \u6587\u6863\u4E0D\u662F\u9644\u5C5E\u7269\uFF0C\u662F\u4EA4\u4ED8\u7269\r
- \u8BC4\u5BA1\u5173\u6CE8\u201C\u98CE\u9669\u4E0E\u9A8C\u8BC1\u201D\uFF0C\u4E0D\u662F\u8BED\u6CD5\u504F\u597D\r
\r
## 5. \u7ED9\u524D\u7AEF\u56E2\u961F\u7684 5 \u6761\u539F\u5219\r
\r
1. \u6307\u6807\u5148\u884C\uFF1A\u5148\u91CF\u5316\u518D\u4F18\u5316\r
2. \u5206\u5C42\u6CBB\u7406\uFF1AUI\u3001\u72B6\u6001\u3001\u6570\u636E\u3001\u6784\u5EFA\u5404\u7BA1\u5404\u7684\u590D\u6742\u5EA6\r
3. \u53EF\u56DE\u6EDA\u4F18\u5148\uFF1A\u4EFB\u4F55\u6539\u52A8\u5FC5\u987B\u53EF\u64A4\u56DE\r
4. \u81EA\u52A8\u5316\u4F18\u5148\uFF1A\u91CD\u590D\u52A8\u4F5C\u4EA4\u7ED9\u811A\u672C\r
5. \u7528\u6237\u4F53\u9A8C\u4F18\u5148\uFF1A\u6027\u80FD\u3001\u53EF\u8BBF\u95EE\u6027\u3001\u7A33\u5B9A\u6027\u662F\u4EA7\u54C1\u80FD\u529B\r
\r
## 6. \u7ED3\u8BED\r
\r
\u524D\u7AEF\u5DE5\u7A0B\u4E0D\u662F\u201C\u6846\u67B6\u7ADE\u8D5B\u201D\uFF0C\u800C\u662F\u201C\u6301\u7EED\u4EA4\u4ED8\u80FD\u529B\u5EFA\u8BBE\u201D\u3002\r
`,dp=`# 2026 \u524D\u7AEF\u70ED\u70B9\u5B9E\u6218\u56FE\uFF1A\u600E\u4E48\u7528\u3001\u4F55\u65F6\u7528\u3001\u4E3A\u4EC0\u4E48\u7528\r
\r
\u8FD9\u7BC7\u6587\u7AE0\u4E0D\u662F\u201C\u70ED\u70B9\u7F57\u5217\u201D\uFF0C\u800C\u662F\u628A\u70ED\u70B9\u8F6C\u6210\u53EF\u6267\u884C\u7B56\u7565\u3002\r
\r
## 1. \u4ECA\u5E74\u503C\u5F97\u5173\u6CE8\u7684 4 \u4E2A\u65B9\u5411\r
\r
## 1.1 TypeScript \u5DF2\u6210\u4E3A\u9ED8\u8BA4\u8BED\u8A00\u5C42\r
\r
\u5728 State of JS 2024 \u7684 Usage \u7ED3\u679C\u91CC\uFF0CTS \u5360\u6BD4\u5DF2\u7ECF\u8FDB\u5165\u4E3B\u6D41\u9636\u6BB5\u3002  \r
\u7ED3\u8BBA\uFF1A\u65B0\u9879\u76EE\u9ED8\u8BA4 TS\uFF0C\u4E0D\u518D\u8BA8\u8BBA\u201C\u8981\u4E0D\u8981\u4E0A\u201D\uFF0C\u53EA\u8BA8\u8BBA\u201C\u7C7B\u578B\u8FB9\u754C\u600E\u4E48\u5212\u201D\u3002\r
\r
\u843D\u5730\u5EFA\u8BAE\uFF1A\r
\r
- UI \u5C42\uFF1A\u7EC4\u4EF6 Props / \u4E8B\u4EF6 / \u8DEF\u7531\u53C2\u6570\u5168\u90E8\u663E\u5F0F\u7C7B\u578B\r
- \u6570\u636E\u5C42\uFF1AAPI DTO \u4E0E Domain Model \u5206\u79BB\r
- \u5DE5\u5177\u5C42\uFF1A\u516C\u5171 util \u5148\u5199\u7C7B\u578B\u518D\u5199\u5B9E\u73B0\r
\r
## 1.2 \u6E32\u67D3\u67B6\u6784\u4ECE\u201C\u4E8C\u9009\u4E00\u201D\u8D70\u5411\u201C\u6DF7\u5408\u201D\r
\r
State of JS 2024 \u663E\u793A SPA \u4E0E SSR \u4ECD\u662F\u6700\u5E38\u7528\u6A21\u5F0F\uFF0C\u540C\u65F6 Partial Hydration / Islands \u5728\u589E\u957F\u3002  \r
\u7ED3\u8BBA\uFF1A\u67B6\u6784\u4E0D\u8BE5\u7AD9\u961F\uFF0C\u800C\u662F\u6309\u9875\u9762\u76EE\u6807\u5206\u5C42\u3002\r
\r
\u843D\u5730\u5EFA\u8BAE\uFF1A\r
\r
- \u8425\u9500/\u5185\u5BB9\u9875\uFF1ASSR/SSG + Islands\r
- \u4E1A\u52A1\u540E\u53F0\uFF1ASPA \u4F18\u5148\uFF0C\u5173\u952E\u5165\u53E3\u505A SSR\r
- \u91CD\u4EA4\u4E92\u533A\u57DF\uFF1A\u5C40\u90E8 hydration\uFF0C\u907F\u514D\u5168\u7AD9\u91CD JS\r
\r
## 1.3 Vite \u5DE5\u5177\u94FE\u8FDB\u5165\u65B0\u9636\u6BB5\r
\r
Vite \u5B98\u65B9\u5728 2026 \u5E74\u53D1\u5E03\u4E86 Vite 8\uFF0C\u6838\u5FC3\u53D8\u5316\u662F Rolldown \u7EDF\u4E00\u6784\u5EFA\u94FE\u8DEF\u3002  \r
\u7ED3\u8BBA\uFF1A\u524D\u7AEF\u56E2\u961F\u8981\u628A\u201C\u6784\u5EFA\u901F\u5EA6\u201D\u5F53\u7814\u53D1\u6548\u7387 KPI\u3002\r
\r
\u843D\u5730\u5EFA\u8BAE\uFF1A\r
\r
- \u5148\u505A\u57FA\u7EBF\uFF1A\u8BB0\u5F55 \`dev cold start\`\u3001\`build time\`\u3001\`HMR\`\r
- \u518D\u505A\u8FC1\u79FB\uFF1A\u5148\u6E05\u7406\u5386\u53F2\u63D2\u4EF6\uFF0C\u518D\u5347\u7EA7\u4E3B\u7248\u672C\r
- \u6700\u540E\u56FA\u5316\uFF1A\u628A\u6784\u5EFA\u6307\u6807\u63A5\u8FDB CI \u62A5\u544A\r
\r
## 1.4 View Transitions \u4ECE\u201C\u70AB\u6280\u201D\u53D8\u6210\u201C\u4F53\u9A8C\u57FA\u7840\u8BBE\u65BD\u201D\r
\r
Chrome 2025/2026 \u8FDE\u7EED\u66F4\u65B0 View Transitions\uFF0C\u8DE8\u6587\u6863\u4E0E\u7EC6\u7C92\u5EA6\u80FD\u529B\u6301\u7EED\u589E\u5F3A\u3002  \r
\u7ED3\u8BBA\uFF1A\u9875\u9762\u5207\u6362\u52A8\u753B\u4E0D\u518D\u53EA\u9760\u6846\u67B6\u79C1\u6709\u65B9\u6848\uFF0C\u53EF\u8D70\u5E73\u53F0\u6807\u51C6\u80FD\u529B\u3002\r
\r
\u843D\u5730\u5EFA\u8BAE\uFF1A\r
\r
- \u4F18\u5148\u7528\u4E8E\u5217\u8868\u5230\u8BE6\u60C5\u3001\u7B5B\u9009\u5207\u6362\u3001\u5BFC\u822A\u8FC7\u6E21\r
- \u5148\u505A\u964D\u7EA7\u5206\u652F\uFF1A\u4E0D\u652F\u6301 API \u65F6\u4FDD\u6301\u529F\u80FD\u6B63\u5E38\r
- \u52A8\u753B\u9884\u7B97\u63A7\u5236\u5728\u201C\u53EF\u611F\u77E5\u4F46\u4E0D\u6253\u65AD\u201D\r
\r
## 2. \u56E2\u961F\u6267\u884C\u7248\uFF1A30 \u5929\u5347\u7EA7\u8DEF\u5F84\r
\r
1. \u7B2C 1 \u5468\uFF1A\u6536\u96C6\u73B0\u72B6\u6307\u6807\uFF08\u6784\u5EFA\u3001\u5305\u4F53\u79EF\u3001\u9996\u5C4F\uFF09\r
2. \u7B2C 2 \u5468\uFF1A\u9009\u4E00\u4E2A\u9875\u9762\u505A\u6DF7\u5408\u6E32\u67D3\u8BD5\u70B9\r
3. \u7B2C 3 \u5468\uFF1A\u63A5\u5165 View Transitions \u5230\u6838\u5FC3\u8DEF\u5F84\r
4. \u7B2C 4 \u5468\uFF1A\u590D\u76D8\u5E76\u6C89\u6DC0 ADR\uFF08\u67B6\u6784\u51B3\u7B56\u8BB0\u5F55\uFF09\r
\r
## 3. \u4E00\u53E5\u8BDD\u603B\u7ED3\r
\r
\u70ED\u70B9\u672C\u8EAB\u4E0D\u503C\u94B1\uFF0C**\u628A\u70ED\u70B9\u53D8\u6210\u53EF\u590D\u5236\u7684\u5DE5\u7A0B\u52A8\u4F5C**\u624D\u503C\u94B1\u3002\r
\r
## \u53C2\u8003\r
\r
- State of JS 2024 Usage: https://2024.stateofjs.com/en-US/usage/\r
- Vite Blog\uFF08Vite 8\uFF09: https://vite.dev/blog/announcing-vite8\r
- Chrome View Transitions\uFF082025/2026\uFF09: https://developer.chrome.com/blog/view-transitions-in-2025\r
`,hp=`# \u65E7\u7AD9\u5185\u5BB9\u5F52\u6863\r
\r
\u672C\u9875\u5F52\u6863 \`origin/gh-pages\` \u5206\u652F\u4E2D\u7684\u5173\u952E\u4FE1\u606F\uFF0C\u4F5C\u4E3A\u8FC1\u79FB\u8BB0\u5F55\u3002\r
\r
## \u539F\u59CB\u9996\u9875\u5185\u5BB9\r
\r
\`\`\`text\r
################################\r
##    #####  #   #   #    #   ##\r
##    #       # #     #  #    ##\r
##    ###      #       #      ##\r
##    #        #       #      ##\r
################################\r
\`\`\`\r
\r
## \u539F\u59CB\u7AD9\u70B9\u914D\u7F6E\uFF08\u8282\u9009\uFF09\r
\r
- title: \`Self\`\r
- description: \`Introduction\`\r
- theme: \`jekyll-theme-cayman\`\r
\r
## \u8FC1\u79FB\u8BF4\u660E\r
\r
- \u65E7\u7AD9\u4E3A\u65E9\u671F\u9759\u6001\u5185\u5BB9 + \u7B80\u5355\u6837\u5F0F\u3002\r
- \u65B0\u7AD9\u7EDF\u4E00\u8FC1\u79FB\u5230 VuePress v2 \u6587\u6863\u7ED3\u6784\u3002\r
- \u540E\u7EED\u6587\u7AE0\u4ECE \`pattern/\` \u6301\u7EED\u6269\u5C55\uFF0C\u4E0D\u518D\u7EF4\u62A4\u65E7 Jekyll \u914D\u7F6E\u3002\r
`,vp=`# \u4E2D\u4ECB\u8005\u6A21\u5F0F\uFF08Mediator\uFF09\r
\r
\u672C\u9875\u5185\u5BB9\u6765\u81EA \`pattern/Mediator.md\` \u7684\u91CD\u6392\u4E0E\u63D0\u70BC\u3002\r
\r
## \u6A21\u5F0F\u76EE\u6807\r
\r
\u4E2D\u4ECB\u8005\u6A21\u5F0F\u901A\u8FC7\u201C\u4E2D\u5FC3\u534F\u8C03\u5BF9\u8C61\u201D\u7BA1\u7406\u591A\u4E2A\u6A21\u5757\u7684\u4EA4\u4E92\uFF0C\u907F\u514D\u5BF9\u8C61\u4E4B\u95F4\u4E92\u76F8\u76F4\u63A5\u4F9D\u8D56\u3002\r
\r
\u5E38\u89C1\u7C7B\u6BD4\uFF1A\r
- \u673A\u573A\u5854\u53F0\u7EDF\u4E00\u534F\u8C03\u8D77\u964D\r
- \u4E8B\u4EF6\u59D4\u6258\u4E2D\u7531\u4E0A\u5C42\u8282\u70B9\u7EDF\u4E00\u5904\u7406\u4EA4\u4E92\r
\r
## \u4F55\u65F6\u4F7F\u7528\r
\r
- \u6A21\u5757\u5173\u7CFB\u590D\u6742\uFF0C\u8C03\u7528\u94FE\u96BE\u7EF4\u62A4\r
- \u4E00\u4E2A\u6D41\u7A0B\u6D89\u53CA\u591A\u4E2A\u5BF9\u8C61\u5E76\u5E26\u6709\u72B6\u6001\u5224\u65AD\r
- \u5E0C\u671B\u628A\u5DE5\u4F5C\u6D41\u903B\u8F91\u96C6\u4E2D\u5728\u5355\u4E00\u5165\u53E3\r
\r
## \u7B80\u5316\u793A\u4F8B\r
\r
\`\`\`js\r
var orgChart = {\r
  addNewEmployee: function () {\r
    var employeeDetail = this.getEmployeeDetail()\r
\r
    employeeDetail.on('complete', function (employee) {\r
      var managerSelector = this.selectManager(employee)\r
      managerSelector.on('save', function (employee) {\r
        employee.save()\r
      })\r
    })\r
  },\r
}\r
\`\`\`\r
\r
\u8FD9\u91CC\u7684 \`orgChart\` \u4E0D\u662F\u6570\u636E\u5B9E\u4F53\uFF0C\u800C\u662F\u6D41\u7A0B\u4E2D\u67A2\uFF1A\r
- \u76D1\u542C\u4E00\u4E2A\u9636\u6BB5\u7ED3\u675F\r
- \u51B3\u5B9A\u4E0B\u4E00\u9636\u6BB5\u5BF9\u8C61\r
- \u4E32\u8D77\u540E\u7EED\u52A8\u4F5C\r
\r
## \u4E0E Event Aggregator \u7684\u5173\u7CFB\r
\r
- \u76F8\u540C\u70B9\uFF1A\u90FD\u53EF\u80FD\u4F7F\u7528\u4E8B\u4EF6\u4F5C\u4E3A\u901A\u4FE1\u673A\u5236\u3002\r
- \u4E0D\u540C\u70B9\uFF1AMediator \u5F3A\u8C03\u201C\u4E1A\u52A1\u6D41\u7A0B\u534F\u8C03\u201D\uFF0CEvent Aggregator \u5F3A\u8C03\u201C\u4E8B\u4EF6\u5206\u53D1\u901A\u9053\u201D\u3002\r
\r
\u4E8C\u8005\u5B9E\u73B0\u5F62\u5F0F\u53EF\u80FD\u76F8\u4F3C\uFF0C\u4F46\u8BBE\u8BA1\u610F\u56FE\u4E0D\u540C\u3002\r
`,gp=`# Observer \u4E0E Publish/Subscribe\r
\r
\u8FD9\u7BC7\u5185\u5BB9\u6574\u7406\u81EA \`pattern/Publish.md\`\uFF0C\u5E76\u505A\u4E86\u7ED3\u6784\u5316\u7CBE\u7B80\u3002\r
\r
## \u6838\u5FC3\u5DEE\u5F02\r
\r
- Observer\uFF1A\u89C2\u5BDF\u8005\u76F4\u63A5\u8BA2\u9605\u76EE\u6807\u5BF9\u8C61\uFF0C\u76EE\u6807\u5BF9\u8C61\u4E3B\u52A8\u901A\u77E5\u89C2\u5BDF\u8005\u3002\r
- Publish/Subscribe\uFF1A\u53D1\u5E03\u8005\u548C\u8BA2\u9605\u8005\u901A\u8FC7\u4E8B\u4EF6\u901A\u9053\u89E3\u8026\uFF0C\u5F7C\u6B64\u4E0D\u76F4\u63A5\u4F9D\u8D56\u3002\r
\r
## \u4E3A\u4EC0\u4E48\u8981\u7528\u5B83\r
\r
- \u964D\u4F4E\u6A21\u5757\u95F4\u8026\u5408\uFF0C\u4E8B\u4EF6\u9A71\u52A8\u6269\u5C55\u6210\u672C\u4F4E\u3002\r
- \u9002\u5408\u4E00\u4E2A\u52A8\u4F5C\u89E6\u53D1\u591A\u4E2A\u540E\u7EED\u5904\u7406\uFF08\u65E5\u5FD7\u3001UI\u3001\u7EDF\u8BA1\uFF09\u3002\r
\r
## \u4EE3\u4EF7\u4E0E\u98CE\u9669\r
\r
- \u8C03\u7528\u94FE\u53D8\u957F\uFF0C\u8C03\u8BD5\u590D\u6742\u5EA6\u4E0A\u5347\u3002\r
- \u53D1\u5E03\u8005\u901A\u5E38\u4E0D\u77E5\u9053\u8BA2\u9605\u8005\u6267\u884C\u662F\u5426\u6210\u529F\u3002\r
\r
## \u7B80\u5316\u793A\u4F8B\r
\r
\`\`\`js\r
var pubsub = {}\r
\r
;(function (myObject) {\r
  var topics = {}\r
  var subUid = -1\r
\r
  myObject.publish = function (topic, args) {\r
    if (!topics[topic]) return false\r
    var subscribers = topics[topic]\r
    for (var i = subscribers.length - 1; i >= 0; i--) {\r
      subscribers[i].func(topic, args)\r
    }\r
    return this\r
  }\r
\r
  myObject.subscribe = function (topic, func) {\r
    if (!topics[topic]) topics[topic] = []\r
    var token = (++subUid).toString()\r
    topics[topic].push({ token: token, func: func })\r
    return token\r
  }\r
})(pubsub)\r
\`\`\`\r
\r
## \u9605\u8BFB\u5EFA\u8BAE\r
\r
\u5148\u770B [\u4E2D\u4ECB\u8005\u6A21\u5F0F](/blog/mediator-pattern.html)\uFF0C\u518D\u5BF9\u6BD4\u4E24\u8005\u201C\u4E8B\u4EF6\u7ED3\u6784\u76F8\u4F3C\u4F46\u610F\u56FE\u4E0D\u540C\u201D\u7684\u90E8\u5206\uFF0C\u4F1A\u66F4\u6E05\u6670\u3002\r
`,mp=`# H5 \`launch-app\`\uFF1A\u5FAE\u4FE1\u5F00\u653E\u6807\u7B7E \`wx-open-launch-app\` \u539F\u7406\u4E0E\u5B9E\u6218\r
\r
\u5728\u5FAE\u4FE1\u5185\u7F6E\u6D4F\u89C8\u5668\u91CC\uFF0C\u666E\u901A H5 \u7684 \`scheme\` \u5524\u8D77\u5E38\u5E38\u4F1A\u88AB\u9650\u5236\u3002  \r
\u8981\u7A33\u5B9A\u5730\u4ECE H5 \u6253\u5F00 App\uFF0C\u5B98\u65B9\u8DEF\u5F84\u662F\u5FAE\u4FE1\u5F00\u653E\u6807\u7B7E\uFF1A\`wx-open-launch-app\`\u3002\r
\r
\u8FD9\u7BC7\u6587\u7AE0\u4E0D\u53EA\u8BB2\u201C\u600E\u4E48\u5199\u4EE3\u7801\u201D\uFF0C\u91CD\u70B9\u8BB2\u6E05\u695A\u5B83\u7684\u5DE5\u4F5C\u539F\u7406\u3002\r
\r
## 1. \u4E3A\u4EC0\u4E48\u8981\u7528\u5F00\u653E\u6807\u7B7E\r
\r
\u4F20\u7EDF H5 \u5524\u7AEF\u4E00\u822C\u4F9D\u8D56\uFF1A\r
\r
- URL Scheme\r
- Universal Link\uFF08iOS\uFF09\r
- \u5E94\u7528\u5E02\u573A\u515C\u5E95\u9875\r
\r
\u4F46\u5728\u5FAE\u4FE1 WebView \u4E2D\uFF0C\u8FD9\u7C7B\u65B9\u5F0F\u7ECF\u5E38\u53D7\u9650\u3002  \r
\`wx-open-launch-app\` \u7684\u6838\u5FC3\u4EF7\u503C\u662F\uFF1A**\u628A\u201C\u5524\u7AEF\u52A8\u4F5C\u201D\u4EA4\u7ED9\u5FAE\u4FE1\u5BA2\u6237\u7AEF\u6267\u884C**\uFF0C\u800C\u4E0D\u662F\u8BA9\u7F51\u9875\u76F4\u63A5\u8DF3\u7CFB\u7EDF\u80FD\u529B\u3002\r
\r
## 2. \u539F\u7406\u62C6\u89E3\uFF1A\u4E09\u5C42\u6A21\u578B\r
\r
\u53EF\u4EE5\u628A\u6574\u4E2A\u673A\u5236\u7406\u89E3\u4E3A\u4E09\u5C42\uFF1A\r
\r
1. \u6743\u9650\u5C42\uFF08\u8C01\u6709\u8D44\u683C\u8C03\u7528\uFF09\r
2. \u6E32\u67D3\u5C42\uFF08\u6807\u7B7E\u5982\u4F55\u88AB\u5FAE\u4FE1\u8BC6\u522B\uFF09\r
3. \u5524\u8D77\u5C42\uFF08\u70B9\u51FB\u540E\u5982\u4F55\u6253\u5F00 App\uFF09\r
\r
### 2.1 \u6743\u9650\u5C42\uFF1AJS-SDK \u7B7E\u540D\u6821\u9A8C\r
\r
\u9875\u9762\u5FC5\u987B\u5148\u5B8C\u6210 \`wx.config\`\uFF0C\u5E76\u4E14\u628A \`wx-open-launch-app\` \u653E\u8FDB \`openTagList\`\u3002  \r
\u8FD9\u4E00\u6B65\u672C\u8D28\u662F\u544A\u8BC9\u5FAE\u4FE1\uFF1A\r
\r
- \u5F53\u524D\u9875\u9762\u57DF\u540D\u5408\u6CD5\r
- \u5F53\u524D\u7B7E\u540D\u5408\u6CD5\r
- \u5F53\u524D\u9875\u9762\u88AB\u5141\u8BB8\u4F7F\u7528\u5F00\u653E\u6807\u7B7E\u80FD\u529B\r
\r
\u5982\u679C\u7B7E\u540D\u5931\u8D25\u3001\u57DF\u540D\u672A\u914D\u7F6E\uFF0C\u6807\u7B7E\u901A\u5E38\u4E0D\u4F1A\u6B63\u5E38\u751F\u6548\u3002\r
\r
### 2.2 \u6E32\u67D3\u5C42\uFF1A\u5FAE\u4FE1\u5BA2\u6237\u7AEF\u63A5\u7BA1\u6807\u7B7E\r
\r
\`wx-open-launch-app\` \u4E0D\u662F\u666E\u901A HTML \u7EC4\u4EF6\uFF0C\u5B83\u7531\u5FAE\u4FE1\u5BA2\u6237\u7AEF\u8BC6\u522B\u5E76\u63A5\u7BA1\u3002  \r
\u4F60\u5199\u5728\u9875\u9762\u91CC\u7684\u6807\u7B7E\uFF0C\u66F4\u50CF\u662F\u4E00\u4E2A\u201C\u58F0\u660E\u5F0F\u6307\u4EE4\u201D\uFF1A\r
\r
- \u544A\u8BC9\u5FAE\u4FE1\u201C\u8FD9\u4E2A\u533A\u57DF\u662F\u5524\u7AEF\u6309\u94AE\u201D\r
- \u544A\u8BC9\u5FAE\u4FE1\u201C\u76EE\u6807 App \u662F\u54EA\u4E2A\uFF08\`appid\`\uFF09\u201D\r
- \u53EF\u4F20 \`extinfo\` \u7ED9 App \u4F5C\u4E3A\u8DEF\u7531\u53C2\u6570\r
\r
### 2.3 \u5524\u8D77\u5C42\uFF1A\u70B9\u51FB\u89E6\u53D1\u5BA2\u6237\u7AEF\u80FD\u529B\r
\r
\u7528\u6237\u70B9\u51FB\u540E\uFF0C\u5FAE\u4FE1\u5BA2\u6237\u7AEF\u5C1D\u8BD5\u6253\u5F00\u76EE\u6807 App\uFF1A\r
\r
- \u5DF2\u5B89\u88C5\uFF1A\u76F4\u63A5\u62C9\u8D77\uFF0C\u5E76\u628A \`extinfo\` \u5E26\u8FC7\u53BB\r
- \u672A\u5B89\u88C5/\u4E0D\u53EF\u62C9\u8D77\uFF1A\u6839\u636E\u5E73\u53F0\u7B56\u7565\u8D70\u5931\u8D25\u5206\u652F\u6216\u515C\u5E95\u903B\u8F91\r
\r
\u6240\u4EE5\u5B83\u4E0D\u662F\u201C\u524D\u7AEF JS \u76F4\u63A5\u5524\u7AEF\u201D\uFF0C\u800C\u662F**\u5FAE\u4FE1\u5BA2\u6237\u7AEF\u4EE3\u7406\u5524\u7AEF**\u3002\r
\r
## 3. \u5173\u952E\u94FE\u8DEF\uFF08\u4ECE 0 \u5230 1\uFF09\r
\r
## 3.1 \u540E\u7AEF\uFF1A\u751F\u6210\u7B7E\u540D\u53C2\u6570\r
\r
\u540E\u7AEF\u901A\u5E38\u63D0\u4F9B\u4E00\u4E2A\u7B7E\u540D\u63A5\u53E3\uFF0C\u8FD4\u56DE\uFF1A\r
\r
- \`appId\`\uFF08\u516C\u4F17\u53F7 AppID\uFF09\r
- \`timestamp\`\r
- \`nonceStr\`\r
- \`signature\`\r
\r
\u524D\u7AEF\u62FF\u5230\u540E\u6267\u884C \`wx.config\`\u3002\r
\r
## 3.2 \u524D\u7AEF\uFF1A\u521D\u59CB\u5316 JS-SDK\r
\r
\`\`\`html\r
<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"><\/script>\r
<script>\r
  wx.config({\r
    debug: false,\r
    appId: sign.appId,\r
    timestamp: sign.timestamp,\r
    nonceStr: sign.nonceStr,\r
    signature: sign.signature,\r
    jsApiList: [],\r
    openTagList: ['wx-open-launch-app']\r
  })\r
  wx.ready(() => {\r
    console.log('wx sdk ready')\r
  })\r
  wx.error((err) => {\r
    console.error('wx config error', err)\r
  })\r
<\/script>\r
\`\`\`\r
\r
## 3.3 \u9875\u9762\uFF1A\u5F00\u653E\u6807\u7B7E\u58F0\u660E\r
\r
\`\`\`html\r
<wx-open-launch-app appid="\u5F00\u653E\u5E73\u53F0\u79FB\u52A8\u5E94\u7528AppID" extinfo='{"page":"detail","id":"1001"}'>\r
  <script type="text/wxtag-template">\r
    <style>\r
      .open-btn {\r
        width: 220px;\r
        line-height: 44px;\r
        text-align: center;\r
        border-radius: 999px;\r
        background: #07c160;\r
        color: #fff;\r
        font-weight: 600;\r
      }\r
    </style>\r
    <div class="open-btn">\u6253\u5F00 App \u67E5\u770B\u8BE6\u60C5</div>\r
  <\/script>\r
</wx-open-launch-app>\r
\`\`\`\r
\r
> \u5E38\u89C1\u8BEF\u533A\uFF1A\`wx.config\` \u91CC\u7684 \`appId\` \u548C\u6807\u7B7E\u5185 \`appid\` \u4E0D\u662F\u540C\u4E00\u4E2A\u6982\u5FF5\uFF0C\u524D\u8005\u662F\u516C\u4F17\u53F7\uFF0C\u540E\u8005\u662F\u5F00\u653E\u5E73\u53F0\u79FB\u52A8\u5E94\u7528\u3002\r
\r
## 3.4 \u57FA\u4E8E \`launch-app\` \u7EC4\u4EF6\u7684\u5B9E\u6218\u4EE3\u7801\uFF08H5 \u9879\u76EE\uFF09\r
\r
\u4E0B\u9762\u8FD9\u7248\u662F\u7EC4\u4EF6\u5316\u5199\u6CD5\uFF0C\u9002\u5408\u771F\u5B9E\u4E1A\u52A1\u590D\u7528\u3002\r
\r
### \u7EC4\u4EF6\u6A21\u677F\uFF08\u6838\u5FC3\uFF09\r
\r
\`\`\`vue\r
<template>\r
  <div :id="idName" ref="root" class="pos-relative" @click="$emit('click')">\r
    <Loading v-if="isAndroidWechat && !showOpenTag" size="20" />\r
    <slot>{{ text }}</slot>\r
\r
    <wx-open-launch-app\r
      v-if="showOpenTag"\r
      :id="idName"\r
      appid="\u4F60\u7684\u79FB\u52A8\u5E94\u7528AppID"\r
      class="wrapper"\r
      :style="rootSizeStyle"\r
      :extinfo="wxExtInfo"\r
      @error="onWxLaunchError"\r
      @launch="onWxLaunchSuccess"\r
    >\r
      <script type="text/wxtag-template">\r
        <style>\r
          .btn {\r
            display: block;\r
            width: {{ rootWidth }}px;\r
            height: {{ rootHeight }}px;\r
            color: transparent;\r
          }\r
        </style>\r
        <div class="btn">{{ text }}</div>\r
      <\/script>\r
    </wx-open-launch-app>\r
  </div>\r
</template>\r
\`\`\`\r
\r
### \u7EC4\u4EF6\u903B\u8F91\uFF08\u5173\u952E\u70B9\uFF09\r
\r
\`\`\`js\r
computed: {\r
  showOpenTag() {\r
    return this.wxConfigReady && this.isAndroidWechat\r
  },\r
  wxExtInfo() {\r
    const raw = this?.getExt?.() || this.$route.query.type || ''\r
    return encodeURIComponent(raw)\r
  }\r
},\r
methods: {\r
  onWxLaunchError() {\r
    // \u5524\u7AEF\u5931\u8D25\u515C\u5E95\u5230\u5E94\u7528\u5B9D\r
    window.location.replace('https://a.app.qq.com/o/simple.jsp?pkgname=\u4F60\u7684\u5305\u540D')\r
  },\r
  initWechatConfig() {\r
    wx?.ready(() => {\r
      this.wxConfigReady = true\r
    })\r
  }\r
}\r
\`\`\`\r
\r
### JS-SDK \u914D\u7F6E\uFF08\u5FC5\u987B\u5305\u542B \`openTagList\`\uFF09\r
\r
\`\`\`js\r
wx.config({\r
  debug: false,\r
  appId: WECHAT_APP_ID,\r
  timestamp,\r
  nonceStr,\r
  signature,\r
  jsApiList: ['checkJsApi'],\r
  openTagList: ['wx-open-launch-app']\r
})\r
\`\`\`\r
\r
### Vue \u8BC6\u522B\u5F00\u653E\u6807\u7B7E\uFF08\u907F\u514D\u88AB\u5F53\u6210\u672A\u77E5\u5143\u7D20\u62A5\u9519\uFF09\r
\r
\`\`\`js\r
Vue.config.ignoredElements = ['wx-open-launch-app']\r
\`\`\`\r
\r
### \u8FD9\u5957\u5B9E\u73B0\u7684\u8BBE\u8BA1\u610F\u56FE\r
\r
1. \u4EC5\u5728 Android \u5FAE\u4FE1\u663E\u793A\u5F00\u653E\u6807\u7B7E\uFF0C\u5176\u4ED6\u7AEF\u8D70\u964D\u7EA7\u903B\u8F91\u3002\r
2. \u628A \`extinfo\` \u5F53\u8DEF\u7531\u53C2\u6570\u901A\u9053\uFF0C\u524D\u540E\u7AEF\u7EA6\u5B9A\u7EDF\u4E00\u683C\u5F0F\u3002\r
3. \`error\` \u4E8B\u4EF6\u5F3A\u5236\u515C\u5E95\u4E0B\u8F7D\uFF0C\u51CF\u5C11\u201C\u6309\u94AE\u53EF\u89C1\u4F46\u65E0\u54CD\u5E94\u201D\u4F53\u9A8C\u3002\r
4. \u7528\u7EC4\u4EF6\u5C01\u88C5\u7EDF\u4E00\u5524\u7AEF\u884C\u4E3A\uFF0C\u4E1A\u52A1\u9875\u53EA\u5173\u5FC3\u4F20\u53C2\u548C\u6837\u5F0F\u3002\r
\r
## 4. \u65F6\u5E8F\u56FE\uFF08\u7B80\u5316\u7248\uFF09\r
\r
1. H5 \u8BF7\u6C42\u540E\u7AEF\u7B7E\u540D\r
2. H5 \u6267\u884C \`wx.config\`\r
3. \u5FAE\u4FE1\u6821\u9A8C\u7B7E\u540D + \u57DF\u540D\u6743\u9650\r
4. \u5FAE\u4FE1\u63A5\u7BA1 \`wx-open-launch-app\` \u6807\u7B7E\r
5. \u7528\u6237\u70B9\u51FB\r
6. \u5FAE\u4FE1\u5BA2\u6237\u7AEF\u5C1D\u8BD5\u62C9\u8D77 App \u5E76\u4F20\u9012 \`extinfo\`\r
\r
## 5. \u6392\u969C\u6E05\u5355\uFF08\u6700\u5E38\u89C1\uFF09\r
\r
\u5982\u679C\u6309\u94AE\u4E0D\u663E\u793A/\u70B9\u51FB\u65E0\u6548\uFF0C\u4F18\u5148\u68C0\u67E5\uFF1A\r
\r
1. \u9875\u9762\u662F\u5426\u5728\u5FAE\u4FE1\u5185\u6253\u5F00\r
2. \u7B7E\u540D URL \u662F\u5426\u4E0E\u5F53\u524D\u9875\u9762 URL \u5B8C\u5168\u4E00\u81F4\uFF08\u542B query \u89C4\u5219\uFF09\r
3. \u516C\u4F17\u53F7\u57DF\u540D\u4E0E JS \u5B89\u5168\u57DF\u540D\u662F\u5426\u914D\u7F6E\u6B63\u786E\r
4. \`openTagList\` \u662F\u5426\u5305\u542B \`wx-open-launch-app\`\r
5. \`appid\` \u662F\u5426\u586B\u6210\u4E86\u79FB\u52A8\u5E94\u7528 AppID\uFF08\u800C\u4E0D\u662F\u516C\u4F17\u53F7 AppID\uFF09\r
6. \u76EE\u6807 App \u662F\u5426\u5728\u5F00\u653E\u5E73\u53F0\u5B8C\u6210\u5173\u8054\u914D\u7F6E\r
7. \`extinfo\` \u662F\u5426\u8FC7\u957F\u6216\u683C\u5F0F\u9519\u8BEF\uFF08\u5EFA\u8BAE JSON \u5B57\u7B26\u4E32\uFF09\r
\r
## 6. \u5DE5\u7A0B\u5316\u5EFA\u8BAE\r
\r
- \u628A\u5524\u7AEF\u6309\u94AE\u5C01\u88C5\u6210\u7EDF\u4E00\u7EC4\u4EF6\uFF0C\u5185\u7F6E\u76D1\u63A7\u57CB\u70B9\uFF08\u5C55\u793A\u3001\u70B9\u51FB\u3001\u6210\u529F\u3001\u5931\u8D25\uFF09\u3002\r
- \`extinfo\` \u53EA\u4F20\u8DEF\u7531\u952E\u548C\u4E1A\u52A1 ID\uFF0C\u4E0D\u4F20\u654F\u611F\u4FE1\u606F\u3002\r
- \u5BF9\u5931\u8D25\u8DEF\u5F84\u63D0\u4F9B\u201C\u590D\u5236\u53E3\u4EE4/\u4E0B\u8F7D\u5F15\u5BFC\u9875/\u5BA2\u670D\u5165\u53E3\u201D\u7B49\u515C\u5E95\u65B9\u6848\u3002\r
- \u5728\u7070\u5EA6\u9636\u6BB5\u6309\u673A\u578B\u4E0E\u7CFB\u7EDF\u7248\u672C\u5206\u6876\u89C2\u5BDF\u6210\u529F\u7387\u3002\r
\r
## 7. \u603B\u7ED3\r
\r
\`wx-open-launch-app\` \u7684\u672C\u8D28\u662F\uFF1A  \r
**\u7F51\u9875\u58F0\u660E + \u5FAE\u4FE1\u9274\u6743 + \u5BA2\u6237\u7AEF\u4EE3\u5524\u8D77**\u3002\r
\r
\u7406\u89E3\u8FD9\u4E2A\u539F\u7406\u540E\uFF0C\u4F60\u4F1A\u53D1\u73B0\u5B83\u4E0D\u662F\u4E00\u4E2A\u201C\u6309\u94AE\u7EC4\u4EF6\u95EE\u9898\u201D\uFF0C\u800C\u662F\u4E00\u6761\u201C\u516C\u4F17\u53F7\u914D\u7F6E\u3001\u5F00\u653E\u5E73\u53F0\u5173\u8054\u3001\u7B7E\u540D\u670D\u52A1\u3001H5 \u6E32\u67D3\u3001App \u8DEF\u7531\u201D\u5168\u94FE\u8DEF\u80FD\u529B\u3002\r
`,bp=[{title:"Vue\u54CD\u5E94\u5F0F\u539F\u7406",content:"Object.defineProperty"},{title:"CSS-FLOAT",content:"vue-\u7ED1\u5B9A\u4F7F\u7528\u7684\u6307\u4EE4\u4E3A v-model: \u6682\u65E0\u5FEB\u6377\u7B80\u79F0"},{title:"Keyof Type Operator",content:"\u90A3\u4E2A keyof \u7C7B\u578B\u64CD\u4F5C\u7B26\uFF0Ckeyof \u7C7B\u578B\u64CD\u4F5C\u7B26\u80FD\u591F\u8F93\u5165\u4E00\u4E2A\u7C7B\u578B\uFF0C\u7136\u540E\u4EA7\u751F\u6240\u6709\u952E\u503C\u7684\u5B57\u7B26\u4E32\u6216\u8005\u6570\u5B57\u7684\u5B57\u9762\u8054\u5408\u7C7B\u578B"}],_p=Object.assign({"/pattern/Mediator.md":Gl,"/pattern/Observer.html":Jl,"/pattern/Observer.js":Kl,"/pattern/Publish.js":Yl,"/pattern/Publish.md":Xl,"/pattern/mediator-senior.js":Ql,"/pattern/mediator.js":Vl,"/pattern/module.js":Zl,"/pattern/singleton.js":tp}),yp=Object.assign({"/vdocs/blog/README.md":ep,"/vdocs/blog/ai-native-frontend-workflow.md":rp,"/vdocs/blog/claude-code-engineering-workflow.md":np,"/vdocs/blog/claude-code-large-repo-debug-refactor.md":ip,"/vdocs/blog/claude-code-multi-agent-strategy.md":op,"/vdocs/blog/claude-code-security-governance.md":ap,"/vdocs/blog/code-lab.md":sp,"/vdocs/blog/codex-agent-workflow.md":cp,"/vdocs/blog/codex-cli-to-pr.md":up,"/vdocs/blog/codex-prompt-debugging.md":fp,"/vdocs/blog/frontend-architecture-decision-playbook.md":lp,"/vdocs/blog/frontend-engineering-philosophy.md":pp,"/vdocs/blog/frontend-trends-2026-practice-map.md":dp,"/vdocs/blog/legacy-notes.md":hp,"/vdocs/blog/mediator-pattern.md":vp,"/vdocs/blog/publish-subscribe.md":gp,"/vdocs/blog/wechat-open-tag-launch-app.md":mp}),La=t=>(t.split("/").pop()||"Untitled").replace(/\.[^.]+$/,""),wp=t=>t.replace(/```[\s\S]*?```/g," ").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^#{1,6}\s+/gm,"").replace(/[*_>~-]/g," ").replace(/\|/g," "),Fn=(t,e=180)=>{const r=wp(t).replace(/\s+/g," ").trim();return r.length>e?`${r.slice(0,e)}...`:r},Sp=(t,e)=>{const r=t.match(/^#\s+(.+)$/m);return r?r[1].trim():e},Un=t=>t.toLowerCase().replace(/^\//,"").replace(/[^a-z0-9\u4e00-\u9fa5]+/g,"-").replace(/^-+|-+$/g,""),Da=Object.entries(_p).map(([t,e])=>{const r=t.split(".").pop()||"txt";return{id:`pattern-${t}`,slug:Un(`pattern-${t}`),title:La(t),category:`pattern/${r}`,excerpt:Fn(e),content:e,source:"pattern"}}),Na=Object.entries(yp).filter(([t])=>!t.endsWith("/README.md")).map(([t,e])=>({id:`vdocs-${t}`,slug:Un(`vdocs-${t}`),title:Sp(e,La(t)),category:"vdocs/blog",excerpt:Fn(e),content:e,source:"vdocs"})),Ma=bp.map((t,e)=>({id:`seed-${e}`,slug:Un(`seed-${t.title}-${e}`),title:t.title,category:"notes",excerpt:Fn(t.content),content:t.content,source:"seed"})),Hn=[...Na,...Da,...Ma];function Cp(){return Hn}function jp(t){return Hn.find(e=>e.slug===t)}function xp(){return{total:Hn.length,vdocsCount:Na.length,patternCount:Da.length,seedCount:Ma.length}}const Op={__name:"HomeView",setup(t){const e=Cp(),r=xp(),n=e.slice(0,3);return{__sfc:!0,posts:e,stats:r,featuredPosts:n}}};var $p=function(){var e=this,r=e._self._c,n=e._self._setupProxy;return r("main",{staticClass:"blog-page"},[r("section",{staticClass:"hero"},[r("div",{staticClass:"hero-content"},[r("p",{staticClass:"kicker"},[e._v("Cinematic Blog System")]),r("h1",[e._v("Patterns, Agents, and Execution Stories")]),r("p",{staticClass:"description"},[e._v(" \u4E3B\u7AD9\u81EA\u52A8\u805A\u5408 `vdocs/blog` \u4E0E `pattern/` \u5185\u5BB9\uFF0C\u7ED3\u5408 Agent \u5DE5\u5177\u95E8\u6237\uFF0C\u5F62\u6210\u53EF\u6F14\u793A\u7684\u5DE5\u7A0B\u535A\u5BA2\u9996\u9875\u3002 ")]),r("div",{staticClass:"hero-actions"},[r("router-link",{staticClass:"btn primary",attrs:{to:"/agent-portal"}},[e._v("\u8FDB\u5165 Agent Portal")]),r("router-link",{staticClass:"btn ghost",attrs:{to:"/codex"}},[e._v("\u6253\u5F00 Codex \u5DE5\u5177\u53F0")])],1)]),r("div",{staticClass:"hero-metrics"},[r("div",{staticClass:"metric"},[r("p",[e._v("Posts")]),r("strong",[e._v(e._s(n.stats.total))])]),r("div",{staticClass:"metric"},[r("p",[e._v("Pattern Files")]),r("strong",[e._v(e._s(n.stats.patternCount))])]),r("div",{staticClass:"metric"},[r("p",[e._v("VDocs Blogs")]),r("strong",[e._v(e._s(n.stats.vdocsCount))])]),r("div",{staticClass:"metric"},[r("p",[e._v("Notes")]),r("strong",[e._v(e._s(n.stats.seedCount))])])])]),r("section",{staticClass:"featured"},[r("h2",[e._v("Featured")]),r("div",{staticClass:"featured-grid"},e._l(n.featuredPosts,function(i){return r("article",{key:i.id,staticClass:"featured-card"},[r("p",{staticClass:"meta"},[e._v(e._s(i.category))]),r("h3",[e._v(e._s(i.title))]),r("p",[e._v(e._s(i.excerpt))]),r("router-link",{staticClass:"read-link",attrs:{to:`/blog/${i.slug}`}},[e._v("\u67E5\u770B\u8BE6\u60C5")])],1)}),0)]),r("section",{staticClass:"blog-layout"},[r("article",{staticClass:"post-list"},e._l(n.posts,function(i){return r("div",{key:i.id,staticClass:"post-card"},[r("p",{staticClass:"meta"},[e._v(e._s(i.category))]),r("h2",[e._v(e._s(i.title))]),r("p",[e._v(e._s(i.excerpt))]),r("router-link",{staticClass:"read-link",attrs:{to:`/blog/${i.slug}`}},[e._v("\u67E5\u770B\u8BE6\u60C5")]),r("details",[r("summary",[e._v("\u5C55\u5F00\u5168\u6587")]),r("pre",[e._v(e._s(i.content))])])],1)}),0),e._m(0)])])},Ep=[function(){var t=this,e=t._self._c;return t._self._setupProxy,e("aside",{staticClass:"sidebar"},[e("div",{staticClass:"panel"},[e("h3",[t._v("Source Pipeline")]),e("p",[t._v(" \u81EA\u52A8\u8BFB\u53D6 "),e("code",[t._v("/vdocs/blog/*.md")]),t._v(" \u4E0E "),e("code",[t._v("/pattern/*.{md,js,html}")]),t._v(" \u5E76\u6CE8\u5165\u4E3B\u7AD9\u535A\u5BA2\u6D41\u3002 ")])]),e("div",{staticClass:"panel"},[e("h3",[t._v("Portal Entry")]),e("p",[t._v("\u8BBF\u95EE "),e("code",[t._v("/agent-portal")]),t._v(" \u83B7\u53D6 Agent Prompt \u5DE5\u5177\u95E8\u6237\u3002")])])])}],Ap=ha(Op,$p,Ep,!1,null,"f1ab1d33",null,null);const Pp=Ap.exports;B.use(ja);const Tp=new ja({mode:"history",base:"/",routes:[{path:"/",name:"home",component:Pp},{path:"/about",name:"about",component:()=>Vt(()=>import("./AboutView.604ac8b8.js"),["assets/AboutView.604ac8b8.js","assets/AboutView.a2cf2aac.css"])},{path:"/codex",name:"codex",component:()=>Vt(()=>import("./CodexView.4ee6886c.js"),["assets/CodexView.4ee6886c.js","assets/CodexView.6efb2c7e.css"])},{path:"/agent-portal",name:"agent-portal",component:()=>Vt(()=>import("./AgentPortalView.c6fb7b11.js"),["assets/AgentPortalView.c6fb7b11.js","assets/AgentPortalView.11d5c5e1.css"])},{path:"/blog/:slug",name:"blog-detail",component:()=>Vt(()=>import("./BlogDetailView.3cbc3f6c.js"),["assets/BlogDetailView.3cbc3f6c.js","assets/BlogDetailView.4eed5e64.css"])},{path:"/tic-tac-toe",name:"tic-tac-toe",component:()=>Vt(()=>import("./TicTacToeView.800d64e2.js"),["assets/TicTacToeView.800d64e2.js","assets/TicTacToeView.43e28bca.css"])},{path:"/overseas-export",name:"overseas-export",component:()=>Vt(()=>import("./OverseasExportView.13b99086.js"),["assets/OverseasExportView.13b99086.js","assets/OverseasExportView.bd9a2583.css"])}]});B.use(Df);new B({router:Tp,pinia:Lf(),render:t=>t(Bf)}).$mount("#app");export{B as V,Ip as __vite_legacy_guard,Cp as a,Rp as c,kp as d,jp as g,ha as n,os as r,us as w};
