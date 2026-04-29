function Ep(){import("data:text/javascript,")}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();/*!
 * Vue.js v2.7.15
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */var Z=Object.freeze({}),T=Array.isArray;function O(t){return t==null}function d(t){return t!=null}function z(t){return t===!0}function Fa(t){return t===!1}function Ce(t){return typeof t=="string"||typeof t=="number"||typeof t=="symbol"||typeof t=="boolean"}function D(t){return typeof t=="function"}function K(t){return t!==null&&typeof t=="object"}var fr=Object.prototype.toString;function et(t){return fr.call(t)==="[object Object]"}function Ua(t){return fr.call(t)==="[object RegExp]"}function ro(t){var e=parseFloat(String(t));return e>=0&&Math.floor(e)===e&&isFinite(t)}function kn(t){return d(t)&&typeof t.then=="function"&&typeof t.catch=="function"}function Ha(t){return t==null?"":Array.isArray(t)||et(t)&&t.toString===fr?JSON.stringify(t,null,2):String(t)}function be(t){var e=parseFloat(t);return isNaN(e)?t:e}function ut(t,e){for(var n=Object.create(null),r=t.split(","),i=0;i<r.length;i++)n[r[i]]=!0;return e?function(o){return n[o.toLowerCase()]}:function(o){return n[o]}}ut("slot,component",!0);var Ba=ut("key,ref,slot,slot-scope,is");function Rt(t,e){var n=t.length;if(n){if(e===t[n-1]){t.length=n-1;return}var r=t.indexOf(e);if(r>-1)return t.splice(r,1)}}var za=Object.prototype.hasOwnProperty;function X(t,e){return za.call(t,e)}function Kt(t){var e=Object.create(null);return function(r){var i=e[r];return i||(e[r]=t(r))}}var Wa=/-(\w)/g,Wt=Kt(function(t){return t.replace(Wa,function(e,n){return n?n.toUpperCase():""})}),qa=Kt(function(t){return t.charAt(0).toUpperCase()+t.slice(1)}),Ga=/\B([A-Z])/g,Oe=Kt(function(t){return t.replace(Ga,"-$1").toLowerCase()});function Ja(t,e){function n(r){var i=arguments.length;return i?i>1?t.apply(e,arguments):t.call(e,r):t.call(e)}return n._length=t.length,n}function Ka(t,e){return t.bind(e)}var io=Function.prototype.bind?Ka:Ja;function jn(t,e){e=e||0;for(var n=t.length-e,r=new Array(n);n--;)r[n]=t[n+e];return r}function N(t,e){for(var n in e)t[n]=e[n];return t}function oo(t){for(var e={},n=0;n<t.length;n++)t[n]&&N(e,t[n]);return e}function H(t,e,n){}var Te=function(t,e,n){return!1},ao=function(t){return t};function qt(t,e){if(t===e)return!0;var n=K(t),r=K(e);if(n&&r)try{var i=Array.isArray(t),o=Array.isArray(e);if(i&&o)return t.length===e.length&&t.every(function(c,u){return qt(c,e[u])});if(t instanceof Date&&e instanceof Date)return t.getTime()===e.getTime();if(!i&&!o){var a=Object.keys(t),s=Object.keys(e);return a.length===s.length&&a.every(function(c){return qt(t[c],e[c])})}else return!1}catch(c){return!1}else return!n&&!r?String(t)===String(e):!1}function so(t,e){for(var n=0;n<t.length;n++)if(qt(t[n],e))return n;return-1}function Ze(t){var e=!1;return function(){e||(e=!0,t.apply(this,arguments))}}function Ln(t,e){return t===e?t===0&&1/t!==1/e:t===t||e===e}var Br="data-server-rendered",mn=["component","directive","filter"],co=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch","renderTracked","renderTriggered"],ot={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:Te,isReservedAttr:Te,isUnknownElement:Te,getTagNamespace:H,parsePlatformTagName:ao,mustUseProp:Te,async:!0,_lifecycleHooks:co},Ya=/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;function uo(t){var e=(t+"").charCodeAt(0);return e===36||e===95}function V(t,e,n,r){Object.defineProperty(t,e,{value:n,enumerable:!!r,writable:!0,configurable:!0})}var Xa=new RegExp("[^".concat(Ya.source,".$_\\d]"));function Qa(t){if(!Xa.test(t)){var e=t.split(".");return function(n){for(var r=0;r<e.length;r++){if(!n)return;n=n[e[r]]}return n}}}var Za="__proto__"in{},rt=typeof window<"u",Y=rt&&window.navigator.userAgent.toLowerCase(),se=Y&&/msie|trident/.test(Y),ce=Y&&Y.indexOf("msie 9.0")>0,lr=Y&&Y.indexOf("edge/")>0;Y&&Y.indexOf("android")>0;var Va=Y&&/iphone|ipad|ipod|ios/.test(Y);Y&&/chrome\/\d+/.test(Y);Y&&/phantomjs/.test(Y);var zr=Y&&Y.match(/firefox\/(\d+)/),Dn={}.watch,fo=!1;if(rt)try{var Wr={};Object.defineProperty(Wr,"passive",{get:function(){fo=!0}}),window.addEventListener("test-passive",null,Wr)}catch(t){}var Pe,kt=function(){return Pe===void 0&&(!rt&&typeof global<"u"?Pe=global.process&&global.process.env.VUE_ENV==="server":Pe=!1),Pe},Ve=rt&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function ie(t){return typeof t=="function"&&/native code/.test(t.toString())}var $e=typeof Symbol<"u"&&ie(Symbol)&&typeof Reflect<"u"&&ie(Reflect.ownKeys),ye;typeof Set<"u"&&ie(Set)?ye=Set:ye=function(){function t(){this.set=Object.create(null)}return t.prototype.has=function(e){return this.set[e]===!0},t.prototype.add=function(e){this.set[e]=!0},t.prototype.clear=function(){this.set=Object.create(null)},t}();var bt=null;function Tt(t){t===void 0&&(t=null),t||bt&&bt._scope.off(),bt=t,t&&t._scope.on()}var nt=function(){function t(e,n,r,i,o,a,s,c){this.tag=e,this.data=n,this.children=r,this.text=i,this.elm=o,this.ns=void 0,this.context=a,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=n&&n.key,this.componentOptions=s,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=c,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1}return Object.defineProperty(t.prototype,"child",{get:function(){return this.componentInstance},enumerable:!1,configurable:!0}),t}(),Ut=function(t){t===void 0&&(t="");var e=new nt;return e.text=t,e.isComment=!0,e};function te(t){return new nt(void 0,void 0,void 0,String(t))}function Nn(t){var e=new nt(t.tag,t.data,t.children&&t.children.slice(),t.text,t.elm,t.context,t.componentOptions,t.asyncFactory);return e.ns=t.ns,e.isStatic=t.isStatic,e.key=t.key,e.isComment=t.isComment,e.fnContext=t.fnContext,e.fnOptions=t.fnOptions,e.fnScopeId=t.fnScopeId,e.asyncMeta=t.asyncMeta,e.isCloned=!0,e}var ts=0,Fe=[],es=function(){for(var t=0;t<Fe.length;t++){var e=Fe[t];e.subs=e.subs.filter(function(n){return n}),e._pending=!1}Fe.length=0},yt=function(){function t(){this._pending=!1,this.id=ts++,this.subs=[]}return t.prototype.addSub=function(e){this.subs.push(e)},t.prototype.removeSub=function(e){this.subs[this.subs.indexOf(e)]=null,this._pending||(this._pending=!0,Fe.push(this))},t.prototype.depend=function(e){t.target&&t.target.addDep(this)},t.prototype.notify=function(e){for(var n=this.subs.filter(function(a){return a}),r=0,i=n.length;r<i;r++){var o=n[r];o.update()}},t}();yt.target=null;var Ue=[];function ue(t){Ue.push(t),yt.target=t}function fe(){Ue.pop(),yt.target=Ue[Ue.length-1]}var lo=Array.prototype,tn=Object.create(lo),ns=["push","pop","shift","unshift","splice","sort","reverse"];ns.forEach(function(t){var e=lo[t];V(tn,t,function(){for(var r=[],i=0;i<arguments.length;i++)r[i]=arguments[i];var o=e.apply(this,r),a=this.__ob__,s;switch(t){case"push":case"unshift":s=r;break;case"splice":s=r.slice(2);break}return s&&a.observeArray(s),a.dep.notify(),o})});var qr=Object.getOwnPropertyNames(tn),po={},pr=!0;function Pt(t){pr=t}var rs={notify:H,depend:H,addSub:H,removeSub:H},Gr=function(){function t(e,n,r){if(n===void 0&&(n=!1),r===void 0&&(r=!1),this.value=e,this.shallow=n,this.mock=r,this.dep=r?rs:new yt,this.vmCount=0,V(e,"__ob__",this),T(e)){if(!r)if(Za)e.__proto__=tn;else for(var i=0,o=qr.length;i<o;i++){var a=qr[i];V(e,a,tn[a])}n||this.observeArray(e)}else for(var s=Object.keys(e),i=0;i<s.length;i++){var a=s[i];It(e,a,po,void 0,n,r)}}return t.prototype.observeArray=function(e){for(var n=0,r=e.length;n<r;n++)_t(e[n],!1,this.mock)},t}();function _t(t,e,n){if(t&&X(t,"__ob__")&&t.__ob__ instanceof Gr)return t.__ob__;if(pr&&(n||!kt())&&(T(t)||et(t))&&Object.isExtensible(t)&&!t.__v_skip&&!tt(t)&&!(t instanceof nt))return new Gr(t,e,n)}function It(t,e,n,r,i,o){var a=new yt,s=Object.getOwnPropertyDescriptor(t,e);if(!(s&&s.configurable===!1)){var c=s&&s.get,u=s&&s.set;(!c||u)&&(n===po||arguments.length===2)&&(n=t[e]);var f=!i&&_t(n,!1,o);return Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){var v=c?c.call(t):n;return yt.target&&(a.depend(),f&&(f.dep.depend(),T(v)&&vo(v))),tt(v)&&!i?v.value:v},set:function(v){var m=c?c.call(t):n;if(!!Ln(m,v)){if(u)u.call(t,v);else{if(c)return;if(!i&&tt(m)&&!tt(v)){m.value=v;return}else n=v}f=!i&&_t(v,!1,o),a.notify()}}}),a}}function dr(t,e,n){if(!bn(t)){var r=t.__ob__;return T(t)&&ro(e)?(t.length=Math.max(t.length,e),t.splice(e,1,n),r&&!r.shallow&&r.mock&&_t(n,!1,!0),n):e in t&&!(e in Object.prototype)?(t[e]=n,n):t._isVue||r&&r.vmCount?n:r?(It(r.value,e,n,void 0,r.shallow,r.mock),r.dep.notify(),n):(t[e]=n,n)}}function ho(t,e){if(T(t)&&ro(e)){t.splice(e,1);return}var n=t.__ob__;t._isVue||n&&n.vmCount||bn(t)||!X(t,e)||(delete t[e],n&&n.dep.notify())}function vo(t){for(var e=void 0,n=0,r=t.length;n<r;n++)e=t[n],e&&e.__ob__&&e.__ob__.dep.depend(),T(e)&&vo(e)}function go(t){return is(t,!0),V(t,"__v_isShallow",!0),t}function is(t,e){bn(t)||_t(t,e,kt())}function He(t){return bn(t)?He(t.__v_raw):!!(t&&t.__ob__)}function Jr(t){return!!(t&&t.__v_isShallow)}function bn(t){return!!(t&&t.__v_isReadonly)}function yn(t){var e=t&&t.__v_raw;return e?yn(e):t}function mo(t){return Object.isExtensible(t)&&V(t,"__v_skip",!0),t}var bo="__v_isRef";function tt(t){return!!(t&&t.__v_isRef===!0)}function os(t){return as(t,!1)}function as(t,e){if(tt(t))return t;var n={};return V(n,bo,!0),V(n,"__v_isShallow",e),V(n,"dep",It(n,"value",t,null,e,kt())),n}function ss(t){return tt(t)?t.value:t}function Mn(t,e,n){Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:function(){var r=e[n];if(tt(r))return r.value;var i=r&&r.__ob__;return i&&i.dep.depend(),r},set:function(r){var i=e[n];tt(i)&&!tt(r)?i.value=r:e[n]=r}})}function Ap(t,e){var n,r,i=D(t);i?(n=t,r=H):(n=t.get,r=t.set);var o=kt()?null:new Ee(bt,n,H,{lazy:!0}),a={effect:o,get value(){return o?(o.dirty&&o.evaluate(),yt.target&&o.depend(),o.value):n()},set value(s){r(s)}};return V(a,bo,!0),V(a,"__v_isReadonly",i),a}var _n="watcher",Kr="".concat(_n," callback"),Yr="".concat(_n," getter"),cs="".concat(_n," cleanup"),Xr={};function us(t,e,n){return fs(t,e,n)}function fs(t,e,n){var r=n===void 0?Z:n,i=r.immediate,o=r.deep,a=r.flush,s=a===void 0?"pre":a;r.onTrack,r.onTrigger;var c=bt,u=function(x,A,P){return P===void 0&&(P=null),wt(x,null,P,c,A)},f,h=!1,v=!1;if(tt(t)?(f=function(){return t.value},h=Jr(t)):He(t)?(f=function(){return t.__ob__.dep.depend(),t},o=!0):T(t)?(v=!0,h=t.some(function(x){return He(x)||Jr(x)}),f=function(){return t.map(function(x){if(tt(x))return x.value;if(He(x))return oe(x);if(D(x))return u(x,Yr)})}):D(t)?e?f=function(){return u(t,Yr)}:f=function(){if(!(c&&c._isDestroyed))return y&&y(),u(t,_n,[_])}:f=H,e&&o){var m=f;f=function(){return oe(m())}}var y,_=function(x){y=b.onStop=function(){u(x,cs)}};if(kt())return _=H,e?i&&u(e,Kr,[f(),v?[]:void 0,_]):f(),H;var b=new Ee(bt,f,H,{lazy:!0});b.noRecurse=!e;var S=v?[]:Xr;return b.run=function(){if(!!b.active)if(e){var x=b.get();(o||h||(v?x.some(function(A,P){return Ln(A,S[P])}):Ln(x,S)))&&(y&&y(),u(e,Kr,[x,S===Xr?void 0:S,_]),S=x)}else b.get()},s==="sync"?b.update=b.run:s==="post"?(b.post=!0,b.update=function(){return Gn(b)}):b.update=function(){if(c&&c===bt&&!c._isMounted){var x=c._preWatchers||(c._preWatchers=[]);x.indexOf(b)<0&&x.push(b)}else Gn(b)},e?i?b.run():S=b.get():s==="post"&&c?c.$once("hook:mounted",function(){return b.get()}):b.get(),function(){b.teardown()}}var Q,yo=function(){function t(e){e===void 0&&(e=!1),this.detached=e,this.active=!0,this.effects=[],this.cleanups=[],this.parent=Q,!e&&Q&&(this.index=(Q.scopes||(Q.scopes=[])).push(this)-1)}return t.prototype.run=function(e){if(this.active){var n=Q;try{return Q=this,e()}finally{Q=n}}},t.prototype.on=function(){Q=this},t.prototype.off=function(){Q=this.parent},t.prototype.stop=function(e){if(this.active){var n=void 0,r=void 0;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].teardown();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){var i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0,this.active=!1}},t}();function ls(t){return new yo(t)}function ps(t,e){e===void 0&&(e=Q),e&&e.active&&e.effects.push(t)}function ds(){return Q}function hs(t){var e=t._provided,n=t.$parent&&t.$parent._provided;return n===e?t._provided=Object.create(n):e}var Qr=Kt(function(t){var e=t.charAt(0)==="&";t=e?t.slice(1):t;var n=t.charAt(0)==="~";t=n?t.slice(1):t;var r=t.charAt(0)==="!";return t=r?t.slice(1):t,{name:t,once:n,capture:r,passive:e}});function Fn(t,e){function n(){var r=n.fns;if(T(r))for(var i=r.slice(),o=0;o<i.length;o++)wt(i[o],null,arguments,e,"v-on handler");else return wt(r,null,arguments,e,"v-on handler")}return n.fns=t,n}function _o(t,e,n,r,i,o){var a,s,c,u;for(a in t)s=t[a],c=e[a],u=Qr(a),O(s)||(O(c)?(O(s.fns)&&(s=t[a]=Fn(s,o)),z(u.once)&&(s=t[a]=i(u.name,s,u.capture)),n(u.name,s,u.capture,u.passive,u.params)):s!==c&&(c.fns=s,t[a]=c));for(a in e)O(t[a])&&(u=Qr(a),r(u.name,e[a],u.capture))}function xt(t,e,n){t instanceof nt&&(t=t.data.hook||(t.data.hook={}));var r,i=t[e];function o(){n.apply(this,arguments),Rt(r.fns,o)}O(i)?r=Fn([o]):d(i.fns)&&z(i.merged)?(r=i,r.fns.push(o)):r=Fn([i,o]),r.merged=!0,t[e]=r}function vs(t,e,n){var r=e.options.props;if(!O(r)){var i={},o=t.attrs,a=t.props;if(d(o)||d(a))for(var s in r){var c=Oe(s);Zr(i,a,s,c,!0)||Zr(i,o,s,c,!1)}return i}}function Zr(t,e,n,r,i){if(d(e)){if(X(e,n))return t[n]=e[n],i||delete e[n],!0;if(X(e,r))return t[n]=e[r],i||delete e[r],!0}return!1}function gs(t){for(var e=0;e<t.length;e++)if(T(t[e]))return Array.prototype.concat.apply([],t);return t}function hr(t){return Ce(t)?[te(t)]:T(t)?wo(t):void 0}function pe(t){return d(t)&&d(t.text)&&Fa(t.isComment)}function wo(t,e){var n=[],r,i,o,a;for(r=0;r<t.length;r++)i=t[r],!(O(i)||typeof i=="boolean")&&(o=n.length-1,a=n[o],T(i)?i.length>0&&(i=wo(i,"".concat(e||"","_").concat(r)),pe(i[0])&&pe(a)&&(n[o]=te(a.text+i[0].text),i.shift()),n.push.apply(n,i)):Ce(i)?pe(a)?n[o]=te(a.text+i):i!==""&&n.push(te(i)):pe(i)&&pe(a)?n[o]=te(a.text+i.text):(z(t._isVList)&&d(i.tag)&&O(i.key)&&d(e)&&(i.key="__vlist".concat(e,"_").concat(r,"__")),n.push(i)));return n}function ms(t,e){var n=null,r,i,o,a;if(T(t)||typeof t=="string")for(n=new Array(t.length),r=0,i=t.length;r<i;r++)n[r]=e(t[r],r);else if(typeof t=="number")for(n=new Array(t),r=0;r<t;r++)n[r]=e(r+1,r);else if(K(t))if($e&&t[Symbol.iterator]){n=[];for(var s=t[Symbol.iterator](),c=s.next();!c.done;)n.push(e(c.value,n.length)),c=s.next()}else for(o=Object.keys(t),n=new Array(o.length),r=0,i=o.length;r<i;r++)a=o[r],n[r]=e(t[a],a,r);return d(n)||(n=[]),n._isVList=!0,n}function bs(t,e,n,r){var i=this.$scopedSlots[t],o;i?(n=n||{},r&&(n=N(N({},r),n)),o=i(n)||(D(e)?e():e)):o=this.$slots[t]||(D(e)?e():e);var a=n&&n.slot;return a?this.$createElement("template",{slot:a},o):o}function ys(t){return an(this.$options,"filters",t)||ao}function Vr(t,e){return T(t)?t.indexOf(e)===-1:t!==e}function _s(t,e,n,r,i){var o=ot.keyCodes[e]||n;return i&&r&&!ot.keyCodes[e]?Vr(i,r):o?Vr(o,t):r?Oe(r)!==e:t===void 0}function ws(t,e,n,r,i){if(n&&K(n)){T(n)&&(n=oo(n));var o=void 0,a=function(c){if(c==="class"||c==="style"||Ba(c))o=t;else{var u=t.attrs&&t.attrs.type;o=r||ot.mustUseProp(e,u,c)?t.domProps||(t.domProps={}):t.attrs||(t.attrs={})}var f=Wt(c),h=Oe(c);if(!(f in o)&&!(h in o)&&(o[c]=n[c],i)){var v=t.on||(t.on={});v["update:".concat(c)]=function(m){n[c]=m}}};for(var s in n)a(s)}return t}function Ss(t,e){var n=this._staticTrees||(this._staticTrees=[]),r=n[t];return r&&!e||(r=n[t]=this.$options.staticRenderFns[t].call(this._renderProxy,this._c,this),So(r,"__static__".concat(t),!1)),r}function xs(t,e,n){return So(t,"__once__".concat(e).concat(n?"_".concat(n):""),!0),t}function So(t,e,n){if(T(t))for(var r=0;r<t.length;r++)t[r]&&typeof t[r]!="string"&&ti(t[r],"".concat(e,"_").concat(r),n);else ti(t,e,n)}function ti(t,e,n){t.isStatic=!0,t.key=e,t.isOnce=n}function Cs(t,e){if(e&&et(e)){var n=t.on=t.on?N({},t.on):{};for(var r in e){var i=n[r],o=e[r];n[r]=i?[].concat(i,o):o}}return t}function xo(t,e,n,r){e=e||{$stable:!n};for(var i=0;i<t.length;i++){var o=t[i];T(o)?xo(o,e,n):o&&(o.proxy&&(o.fn.proxy=!0),e[o.key]=o.fn)}return r&&(e.$key=r),e}function Os(t,e){for(var n=0;n<e.length;n+=2){var r=e[n];typeof r=="string"&&r&&(t[e[n]]=e[n+1])}return t}function $s(t,e){return typeof t=="string"?e+t:t}function Co(t){t._o=xs,t._n=be,t._s=Ha,t._l=ms,t._t=bs,t._q=qt,t._i=so,t._m=Ss,t._f=ys,t._k=_s,t._b=ws,t._v=te,t._e=Ut,t._u=xo,t._g=Cs,t._d=Os,t._p=$s}function vr(t,e){if(!t||!t.length)return{};for(var n={},r=0,i=t.length;r<i;r++){var o=t[r],a=o.data;if(a&&a.attrs&&a.attrs.slot&&delete a.attrs.slot,(o.context===e||o.fnContext===e)&&a&&a.slot!=null){var s=a.slot,c=n[s]||(n[s]=[]);o.tag==="template"?c.push.apply(c,o.children||[]):c.push(o)}else(n.default||(n.default=[])).push(o)}for(var u in n)n[u].every(Es)&&delete n[u];return n}function Es(t){return t.isComment&&!t.asyncFactory||t.text===" "}function _e(t){return t.isComment&&t.asyncFactory}function me(t,e,n,r){var i,o=Object.keys(n).length>0,a=e?!!e.$stable:!o,s=e&&e.$key;if(!e)i={};else{if(e._normalized)return e._normalized;if(a&&r&&r!==Z&&s===r.$key&&!o&&!r.$hasNormal)return r;i={};for(var c in e)e[c]&&c[0]!=="$"&&(i[c]=As(t,n,c,e[c]))}for(var u in n)u in i||(i[u]=Ts(n,u));return e&&Object.isExtensible(e)&&(e._normalized=i),V(i,"$stable",a),V(i,"$key",s),V(i,"$hasNormal",o),i}function As(t,e,n,r){var i=function(){var o=bt;Tt(t);var a=arguments.length?r.apply(null,arguments):r({});a=a&&typeof a=="object"&&!T(a)?[a]:hr(a);var s=a&&a[0];return Tt(o),a&&(!s||a.length===1&&s.isComment&&!_e(s))?void 0:a};return r.proxy&&Object.defineProperty(e,n,{get:i,enumerable:!0,configurable:!0}),i}function Ts(t,e){return function(){return t[e]}}function Ps(t){var e=t.$options,n=e.setup;if(n){var r=t._setupContext=Is(t);Tt(t),ue();var i=wt(n,null,[t._props||go({}),r],t,"setup");if(fe(),Tt(),D(i))e.render=i;else if(K(i))if(t._setupState=i,i.__sfc){var a=t._setupProxy={};for(var o in i)o!=="__sfc"&&Mn(a,i,o)}else for(var o in i)uo(o)||Mn(t,i,o)}}function Is(t){return{get attrs(){if(!t._attrsProxy){var e=t._attrsProxy={};V(e,"_v_attr_proxy",!0),en(e,t.$attrs,Z,t,"$attrs")}return t._attrsProxy},get listeners(){if(!t._listenersProxy){var e=t._listenersProxy={};en(e,t.$listeners,Z,t,"$listeners")}return t._listenersProxy},get slots(){return ks(t)},emit:io(t.$emit,t),expose:function(e){e&&Object.keys(e).forEach(function(n){return Mn(t,e,n)})}}}function en(t,e,n,r,i){var o=!1;for(var a in e)a in t?e[a]!==n[a]&&(o=!0):(o=!0,Rs(t,a,r,i));for(var a in t)a in e||(o=!0,delete t[a]);return o}function Rs(t,e,n,r){Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){return n[r][e]}})}function ks(t){return t._slotsProxy||Oo(t._slotsProxy={},t.$scopedSlots),t._slotsProxy}function Oo(t,e){for(var n in e)t[n]=e[n];for(var n in t)n in e||delete t[n]}function js(t){t._vnode=null,t._staticTrees=null;var e=t.$options,n=t.$vnode=e._parentVnode,r=n&&n.context;t.$slots=vr(e._renderChildren,r),t.$scopedSlots=n?me(t.$parent,n.data.scopedSlots,t.$slots):Z,t._c=function(o,a,s,c){return nn(t,o,a,s,c,!1)},t.$createElement=function(o,a,s,c){return nn(t,o,a,s,c,!0)};var i=n&&n.data;It(t,"$attrs",i&&i.attrs||Z,null,!0),It(t,"$listeners",e._parentListeners||Z,null,!0)}var Un=null;function Ls(t){Co(t.prototype),t.prototype.$nextTick=function(e){return gr(e,this)},t.prototype._render=function(){var e=this,n=e.$options,r=n.render,i=n._parentVnode;i&&e._isMounted&&(e.$scopedSlots=me(e.$parent,i.data.scopedSlots,e.$slots,e.$scopedSlots),e._slotsProxy&&Oo(e._slotsProxy,e.$scopedSlots)),e.$vnode=i;var o;try{Tt(e),Un=e,o=r.call(e._renderProxy,e.$createElement)}catch(a){Gt(a,e,"render"),o=e._vnode}finally{Un=null,Tt()}return T(o)&&o.length===1&&(o=o[0]),o instanceof nt||(o=Ut()),o.parent=i,o}}function On(t,e){return(t.__esModule||$e&&t[Symbol.toStringTag]==="Module")&&(t=t.default),K(t)?e.extend(t):t}function Ds(t,e,n,r,i){var o=Ut();return o.asyncFactory=t,o.asyncMeta={data:e,context:n,children:r,tag:i},o}function Ns(t,e){if(z(t.error)&&d(t.errorComp))return t.errorComp;if(d(t.resolved))return t.resolved;var n=Un;if(n&&d(t.owners)&&t.owners.indexOf(n)===-1&&t.owners.push(n),z(t.loading)&&d(t.loadingComp))return t.loadingComp;if(n&&!d(t.owners)){var r=t.owners=[n],i=!0,o=null,a=null;n.$on("hook:destroyed",function(){return Rt(r,n)});var s=function(h){for(var v=0,m=r.length;v<m;v++)r[v].$forceUpdate();h&&(r.length=0,o!==null&&(clearTimeout(o),o=null),a!==null&&(clearTimeout(a),a=null))},c=Ze(function(h){t.resolved=On(h,e),i?r.length=0:s(!0)}),u=Ze(function(h){d(t.errorComp)&&(t.error=!0,s(!0))}),f=t(c,u);return K(f)&&(kn(f)?O(t.resolved)&&f.then(c,u):kn(f.component)&&(f.component.then(c,u),d(f.error)&&(t.errorComp=On(f.error,e)),d(f.loading)&&(t.loadingComp=On(f.loading,e),f.delay===0?t.loading=!0:o=setTimeout(function(){o=null,O(t.resolved)&&O(t.error)&&(t.loading=!0,s(!1))},f.delay||200)),d(f.timeout)&&(a=setTimeout(function(){a=null,O(t.resolved)&&u(null)},f.timeout)))),i=!1,t.loading?t.loadingComp:t.resolved}}function $o(t){if(T(t))for(var e=0;e<t.length;e++){var n=t[e];if(d(n)&&(d(n.componentOptions)||_e(n)))return n}}var Ms=1,Eo=2;function nn(t,e,n,r,i,o){return(T(n)||Ce(n))&&(i=r,r=n,n=void 0),z(o)&&(i=Eo),Fs(t,e,n,r,i)}function Fs(t,e,n,r,i){if(d(n)&&d(n.__ob__)||(d(n)&&d(n.is)&&(e=n.is),!e))return Ut();T(r)&&D(r[0])&&(n=n||{},n.scopedSlots={default:r[0]},r.length=0),i===Eo?r=hr(r):i===Ms&&(r=gs(r));var o,a;if(typeof e=="string"){var s=void 0;a=t.$vnode&&t.$vnode.ns||ot.getTagNamespace(e),ot.isReservedTag(e)?o=new nt(ot.parsePlatformTagName(e),n,r,void 0,void 0,t):(!n||!n.pre)&&d(s=an(t.$options,"components",e))?o=ci(s,n,t,r,e):o=new nt(e,n,r,void 0,void 0,t)}else o=ci(e,n,t,r);return T(o)?o:d(o)?(d(a)&&Ao(o,a),d(n)&&Us(n),o):Ut()}function Ao(t,e,n){if(t.ns=e,t.tag==="foreignObject"&&(e=void 0,n=!0),d(t.children))for(var r=0,i=t.children.length;r<i;r++){var o=t.children[r];d(o.tag)&&(O(o.ns)||z(n)&&o.tag!=="svg")&&Ao(o,e,n)}}function Us(t){K(t.style)&&oe(t.style),K(t.class)&&oe(t.class)}function Gt(t,e,n){ue();try{if(e)for(var r=e;r=r.$parent;){var i=r.$options.errorCaptured;if(i)for(var o=0;o<i.length;o++)try{var a=i[o].call(r,t,e,n)===!1;if(a)return}catch(s){ei(s,r,"errorCaptured hook")}}ei(t,e,n)}finally{fe()}}function wt(t,e,n,r,i){var o;try{o=n?t.apply(e,n):t.call(e),o&&!o._isVue&&kn(o)&&!o._handled&&(o.catch(function(a){return Gt(a,r,i+" (Promise/async)")}),o._handled=!0)}catch(a){Gt(a,r,i)}return o}function ei(t,e,n){if(ot.errorHandler)try{return ot.errorHandler.call(null,t,e,n)}catch(r){r!==t&&ni(r)}ni(t)}function ni(t,e,n){if(rt&&typeof console<"u")console.error(t);else throw t}var Hn=!1,Bn=[],zn=!1;function Ie(){zn=!1;var t=Bn.slice(0);Bn.length=0;for(var e=0;e<t.length;e++)t[e]()}var ve;if(typeof Promise<"u"&&ie(Promise)){var Hs=Promise.resolve();ve=function(){Hs.then(Ie),Va&&setTimeout(H)},Hn=!0}else if(!se&&typeof MutationObserver<"u"&&(ie(MutationObserver)||MutationObserver.toString()==="[object MutationObserverConstructor]")){var Re=1,Bs=new MutationObserver(Ie),ri=document.createTextNode(String(Re));Bs.observe(ri,{characterData:!0}),ve=function(){Re=(Re+1)%2,ri.data=String(Re)},Hn=!0}else typeof setImmediate<"u"&&ie(setImmediate)?ve=function(){setImmediate(Ie)}:ve=function(){setTimeout(Ie,0)};function gr(t,e){var n;if(Bn.push(function(){if(t)try{t.call(e)}catch(r){Gt(r,e,"nextTick")}else n&&n(e)}),zn||(zn=!0,ve()),!t&&typeof Promise<"u")return new Promise(function(r){n=r})}var zs="2.7.15";function Tp(t){return t}var ii=new ye;function oe(t){return Be(t,ii),ii.clear(),t}function Be(t,e){var n,r,i=T(t);if(!(!i&&!K(t)||t.__v_skip||Object.isFrozen(t)||t instanceof nt)){if(t.__ob__){var o=t.__ob__.dep.id;if(e.has(o))return;e.add(o)}if(i)for(n=t.length;n--;)Be(t[n],e);else if(tt(t))Be(t.value,e);else for(r=Object.keys(t),n=r.length;n--;)Be(t[r[n]],e)}}var Ws=0,Ee=function(){function t(e,n,r,i,o){ps(this,Q&&!Q._vm?Q:e?e._scope:void 0),(this.vm=e)&&o&&(e._watcher=this),i?(this.deep=!!i.deep,this.user=!!i.user,this.lazy=!!i.lazy,this.sync=!!i.sync,this.before=i.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=r,this.id=++Ws,this.active=!0,this.post=!1,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new ye,this.newDepIds=new ye,this.expression="",D(n)?this.getter=n:(this.getter=Qa(n),this.getter||(this.getter=H)),this.value=this.lazy?void 0:this.get()}return t.prototype.get=function(){ue(this);var e,n=this.vm;try{e=this.getter.call(n,n)}catch(r){if(this.user)Gt(r,n,'getter for watcher "'.concat(this.expression,'"'));else throw r}finally{this.deep&&oe(e),fe(),this.cleanupDeps()}return e},t.prototype.addDep=function(e){var n=e.id;this.newDepIds.has(n)||(this.newDepIds.add(n),this.newDeps.push(e),this.depIds.has(n)||e.addSub(this))},t.prototype.cleanupDeps=function(){for(var e=this.deps.length;e--;){var n=this.deps[e];this.newDepIds.has(n.id)||n.removeSub(this)}var r=this.depIds;this.depIds=this.newDepIds,this.newDepIds=r,this.newDepIds.clear(),r=this.deps,this.deps=this.newDeps,this.newDeps=r,this.newDeps.length=0},t.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():Gn(this)},t.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||K(e)||this.deep){var n=this.value;if(this.value=e,this.user){var r='callback for watcher "'.concat(this.expression,'"');wt(this.cb,this.vm,[e,n],this.vm,r)}else this.cb.call(this.vm,e,n)}}},t.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},t.prototype.depend=function(){for(var e=this.deps.length;e--;)this.deps[e].depend()},t.prototype.teardown=function(){if(this.vm&&!this.vm._isBeingDestroyed&&Rt(this.vm._scope.effects,this),this.active){for(var e=this.deps.length;e--;)this.deps[e].removeSub(this);this.active=!1,this.onStop&&this.onStop()}},t}();function qs(t){t._events=Object.create(null),t._hasHookEvent=!1;var e=t.$options._parentListeners;e&&To(t,e)}var we;function Gs(t,e){we.$on(t,e)}function Js(t,e){we.$off(t,e)}function Ks(t,e){var n=we;return function r(){var i=e.apply(null,arguments);i!==null&&n.$off(t,r)}}function To(t,e,n){we=t,_o(e,n||{},Gs,Js,Ks,t),we=void 0}function Ys(t){var e=/^hook:/;t.prototype.$on=function(n,r){var i=this;if(T(n))for(var o=0,a=n.length;o<a;o++)i.$on(n[o],r);else(i._events[n]||(i._events[n]=[])).push(r),e.test(n)&&(i._hasHookEvent=!0);return i},t.prototype.$once=function(n,r){var i=this;function o(){i.$off(n,o),r.apply(i,arguments)}return o.fn=r,i.$on(n,o),i},t.prototype.$off=function(n,r){var i=this;if(!arguments.length)return i._events=Object.create(null),i;if(T(n)){for(var o=0,a=n.length;o<a;o++)i.$off(n[o],r);return i}var s=i._events[n];if(!s)return i;if(!r)return i._events[n]=null,i;for(var c,u=s.length;u--;)if(c=s[u],c===r||c.fn===r){s.splice(u,1);break}return i},t.prototype.$emit=function(n){var r=this,i=r._events[n];if(i){i=i.length>1?jn(i):i;for(var o=jn(arguments,1),a='event handler for "'.concat(n,'"'),s=0,c=i.length;s<c;s++)wt(i[s],r,o,r,a)}return r}}var Ht=null;function Po(t){var e=Ht;return Ht=t,function(){Ht=e}}function Xs(t){var e=t.$options,n=e.parent;if(n&&!e.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(t)}t.$parent=n,t.$root=n?n.$root:t,t.$children=[],t.$refs={},t._provided=n?n._provided:Object.create(null),t._watcher=null,t._inactive=null,t._directInactive=!1,t._isMounted=!1,t._isDestroyed=!1,t._isBeingDestroyed=!1}function Qs(t){t.prototype._update=function(e,n){var r=this,i=r.$el,o=r._vnode,a=Po(r);r._vnode=e,o?r.$el=r.__patch__(o,e):r.$el=r.__patch__(r.$el,e,n,!1),a(),i&&(i.__vue__=null),r.$el&&(r.$el.__vue__=r);for(var s=r;s&&s.$vnode&&s.$parent&&s.$vnode===s.$parent._vnode;)s.$parent.$el=s.$el,s=s.$parent},t.prototype.$forceUpdate=function(){var e=this;e._watcher&&e._watcher.update()},t.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){ct(e,"beforeDestroy"),e._isBeingDestroyed=!0;var n=e.$parent;n&&!n._isBeingDestroyed&&!e.$options.abstract&&Rt(n.$children,e),e._scope.stop(),e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),ct(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}function Zs(t,e,n){t.$el=e,t.$options.render||(t.$options.render=Ut),ct(t,"beforeMount");var r;r=function(){t._update(t._render(),n)};var i={before:function(){t._isMounted&&!t._isDestroyed&&ct(t,"beforeUpdate")}};new Ee(t,r,H,i,!0),n=!1;var o=t._preWatchers;if(o)for(var a=0;a<o.length;a++)o[a].run();return t.$vnode==null&&(t._isMounted=!0,ct(t,"mounted")),t}function Vs(t,e,n,r,i){var o=r.data.scopedSlots,a=t.$scopedSlots,s=!!(o&&!o.$stable||a!==Z&&!a.$stable||o&&t.$scopedSlots.$key!==o.$key||!o&&t.$scopedSlots.$key),c=!!(i||t.$options._renderChildren||s),u=t.$vnode;t.$options._parentVnode=r,t.$vnode=r,t._vnode&&(t._vnode.parent=r),t.$options._renderChildren=i;var f=r.data.attrs||Z;t._attrsProxy&&en(t._attrsProxy,f,u.data&&u.data.attrs||Z,t,"$attrs")&&(c=!0),t.$attrs=f,n=n||Z;var h=t.$options._parentListeners;if(t._listenersProxy&&en(t._listenersProxy,n,h||Z,t,"$listeners"),t.$listeners=t.$options._parentListeners=n,To(t,n,h),e&&t.$options.props){Pt(!1);for(var v=t._props,m=t.$options._propKeys||[],y=0;y<m.length;y++){var _=m[y],b=t.$options.props;v[_]=Sr(_,b,e,t)}Pt(!0),t.$options.propsData=e}c&&(t.$slots=vr(i,r.context),t.$forceUpdate())}function Io(t){for(;t&&(t=t.$parent);)if(t._inactive)return!0;return!1}function mr(t,e){if(e){if(t._directInactive=!1,Io(t))return}else if(t._directInactive)return;if(t._inactive||t._inactive===null){t._inactive=!1;for(var n=0;n<t.$children.length;n++)mr(t.$children[n]);ct(t,"activated")}}function Ro(t,e){if(!(e&&(t._directInactive=!0,Io(t)))&&!t._inactive){t._inactive=!0;for(var n=0;n<t.$children.length;n++)Ro(t.$children[n]);ct(t,"deactivated")}}function ct(t,e,n,r){r===void 0&&(r=!0),ue();var i=bt,o=ds();r&&Tt(t);var a=t.$options[e],s="".concat(e," hook");if(a)for(var c=0,u=a.length;c<u;c++)wt(a[c],t,n||null,t,s);t._hasHookEvent&&t.$emit("hook:"+e),r&&(Tt(i),o&&o.on()),fe()}var gt=[],br=[],rn={},Wn=!1,yr=!1,ee=0;function tc(){ee=gt.length=br.length=0,rn={},Wn=yr=!1}var ko=0,qn=Date.now;if(rt&&!se){var $n=window.performance;$n&&typeof $n.now=="function"&&qn()>document.createEvent("Event").timeStamp&&(qn=function(){return $n.now()})}var ec=function(t,e){if(t.post){if(!e.post)return 1}else if(e.post)return-1;return t.id-e.id};function nc(){ko=qn(),yr=!0;var t,e;for(gt.sort(ec),ee=0;ee<gt.length;ee++)t=gt[ee],t.before&&t.before(),e=t.id,rn[e]=null,t.run();var n=br.slice(),r=gt.slice();tc(),oc(n),rc(r),es(),Ve&&ot.devtools&&Ve.emit("flush")}function rc(t){for(var e=t.length;e--;){var n=t[e],r=n.vm;r&&r._watcher===n&&r._isMounted&&!r._isDestroyed&&ct(r,"updated")}}function ic(t){t._inactive=!1,br.push(t)}function oc(t){for(var e=0;e<t.length;e++)t[e]._inactive=!0,mr(t[e],!0)}function Gn(t){var e=t.id;if(rn[e]==null&&!(t===yt.target&&t.noRecurse)){if(rn[e]=!0,!yr)gt.push(t);else{for(var n=gt.length-1;n>ee&&gt[n].id>t.id;)n--;gt.splice(n+1,0,t)}Wn||(Wn=!0,gr(nc))}}function ac(t){var e=t.$options.provide;if(e){var n=D(e)?e.call(t):e;if(!K(n))return;for(var r=hs(t),i=$e?Reflect.ownKeys(n):Object.keys(n),o=0;o<i.length;o++){var a=i[o];Object.defineProperty(r,a,Object.getOwnPropertyDescriptor(n,a))}}}function sc(t){var e=jo(t.$options.inject,t);e&&(Pt(!1),Object.keys(e).forEach(function(n){It(t,n,e[n])}),Pt(!0))}function jo(t,e){if(t){for(var n=Object.create(null),r=$e?Reflect.ownKeys(t):Object.keys(t),i=0;i<r.length;i++){var o=r[i];if(o!=="__ob__"){var a=t[o].from;if(a in e._provided)n[o]=e._provided[a];else if("default"in t[o]){var s=t[o].default;n[o]=D(s)?s.call(e):s}}}return n}}function _r(t,e,n,r,i){var o=this,a=i.options,s;X(r,"_uid")?(s=Object.create(r),s._original=r):(s=r,r=r._original);var c=z(a._compiled),u=!c;this.data=t,this.props=e,this.children=n,this.parent=r,this.listeners=t.on||Z,this.injections=jo(a.inject,r),this.slots=function(){return o.$slots||me(r,t.scopedSlots,o.$slots=vr(n,r)),o.$slots},Object.defineProperty(this,"scopedSlots",{enumerable:!0,get:function(){return me(r,t.scopedSlots,this.slots())}}),c&&(this.$options=a,this.$slots=this.slots(),this.$scopedSlots=me(r,t.scopedSlots,this.$slots)),a._scopeId?this._c=function(f,h,v,m){var y=nn(s,f,h,v,m,u);return y&&!T(y)&&(y.fnScopeId=a._scopeId,y.fnContext=r),y}:this._c=function(f,h,v,m){return nn(s,f,h,v,m,u)}}Co(_r.prototype);function cc(t,e,n,r,i){var o=t.options,a={},s=o.props;if(d(s))for(var c in s)a[c]=Sr(c,s,e||Z);else d(n.attrs)&&ai(a,n.attrs),d(n.props)&&ai(a,n.props);var u=new _r(n,a,i,r,t),f=o.render.call(null,u._c,u);if(f instanceof nt)return oi(f,n,u.parent,o);if(T(f)){for(var h=hr(f)||[],v=new Array(h.length),m=0;m<h.length;m++)v[m]=oi(h[m],n,u.parent,o);return v}}function oi(t,e,n,r,i){var o=Nn(t);return o.fnContext=n,o.fnOptions=r,e.slot&&((o.data||(o.data={})).slot=e.slot),o}function ai(t,e){for(var n in e)t[Wt(n)]=e[n]}function on(t){return t.name||t.__name||t._componentTag}var wr={init:function(t,e){if(t.componentInstance&&!t.componentInstance._isDestroyed&&t.data.keepAlive){var n=t;wr.prepatch(n,n)}else{var r=t.componentInstance=uc(t,Ht);r.$mount(e?t.elm:void 0,e)}},prepatch:function(t,e){var n=e.componentOptions,r=e.componentInstance=t.componentInstance;Vs(r,n.propsData,n.listeners,e,n.children)},insert:function(t){var e=t.context,n=t.componentInstance;n._isMounted||(n._isMounted=!0,ct(n,"mounted")),t.data.keepAlive&&(e._isMounted?ic(n):mr(n,!0))},destroy:function(t){var e=t.componentInstance;e._isDestroyed||(t.data.keepAlive?Ro(e,!0):e.$destroy())}},si=Object.keys(wr);function ci(t,e,n,r,i){if(!O(t)){var o=n.$options._base;if(K(t)&&(t=o.extend(t)),typeof t=="function"){var a;if(O(t.cid)&&(a=t,t=Ns(a,o),t===void 0))return Ds(a,e,n,r,i);e=e||{},Cr(t),d(e.model)&&pc(t.options,e);var s=vs(e,t);if(z(t.options.functional))return cc(t,s,e,n,r);var c=e.on;if(e.on=e.nativeOn,z(t.options.abstract)){var u=e.slot;e={},u&&(e.slot=u)}fc(e);var f=on(t.options)||i,h=new nt("vue-component-".concat(t.cid).concat(f?"-".concat(f):""),e,void 0,void 0,void 0,n,{Ctor:t,propsData:s,listeners:c,tag:i,children:r},a);return h}}}function uc(t,e){var n={_isComponent:!0,_parentVnode:t,parent:e},r=t.data.inlineTemplate;return d(r)&&(n.render=r.render,n.staticRenderFns=r.staticRenderFns),new t.componentOptions.Ctor(n)}function fc(t){for(var e=t.hook||(t.hook={}),n=0;n<si.length;n++){var r=si[n],i=e[r],o=wr[r];i!==o&&!(i&&i._merged)&&(e[r]=i?lc(o,i):o)}}function lc(t,e){var n=function(r,i){t(r,i),e(r,i)};return n._merged=!0,n}function pc(t,e){var n=t.model&&t.model.prop||"value",r=t.model&&t.model.event||"input";(e.attrs||(e.attrs={}))[n]=e.model.value;var i=e.on||(e.on={}),o=i[r],a=e.model.callback;d(o)?(T(o)?o.indexOf(a)===-1:o!==a)&&(i[r]=[a].concat(o)):i[r]=a}var dc=H,lt=ot.optionMergeStrategies;function Se(t,e,n){if(n===void 0&&(n=!0),!e)return t;for(var r,i,o,a=$e?Reflect.ownKeys(e):Object.keys(e),s=0;s<a.length;s++)r=a[s],r!=="__ob__"&&(i=t[r],o=e[r],!n||!X(t,r)?dr(t,r,o):i!==o&&et(i)&&et(o)&&Se(i,o));return t}function ui(t,e,n){return n?function(){var i=D(e)?e.call(n,n):e,o=D(t)?t.call(n,n):t;return i?Se(i,o):o}:e?t?function(){return Se(D(e)?e.call(this,this):e,D(t)?t.call(this,this):t)}:e:t}lt.data=function(t,e,n){return n?ui(t,e,n):e&&typeof e!="function"?t:ui(t,e)};function hc(t,e){var n=e?t?t.concat(e):T(e)?e:[e]:t;return n&&vc(n)}function vc(t){for(var e=[],n=0;n<t.length;n++)e.indexOf(t[n])===-1&&e.push(t[n]);return e}co.forEach(function(t){lt[t]=hc});function gc(t,e,n,r){var i=Object.create(t||null);return e?N(i,e):i}mn.forEach(function(t){lt[t+"s"]=gc});lt.watch=function(t,e,n,r){if(t===Dn&&(t=void 0),e===Dn&&(e=void 0),!e)return Object.create(t||null);if(!t)return e;var i={};N(i,t);for(var o in e){var a=i[o],s=e[o];a&&!T(a)&&(a=[a]),i[o]=a?a.concat(s):T(s)?s:[s]}return i};lt.props=lt.methods=lt.inject=lt.computed=function(t,e,n,r){if(!t)return e;var i=Object.create(null);return N(i,t),e&&N(i,e),i};lt.provide=function(t,e){return t?function(){var n=Object.create(null);return Se(n,D(t)?t.call(this):t),e&&Se(n,D(e)?e.call(this):e,!1),n}:e};var mc=function(t,e){return e===void 0?t:e};function bc(t,e){var n=t.props;if(!!n){var r={},i,o,a;if(T(n))for(i=n.length;i--;)o=n[i],typeof o=="string"&&(a=Wt(o),r[a]={type:null});else if(et(n))for(var s in n)o=n[s],a=Wt(s),r[a]=et(o)?o:{type:o};t.props=r}}function yc(t,e){var n=t.inject;if(!!n){var r=t.inject={};if(T(n))for(var i=0;i<n.length;i++)r[n[i]]={from:n[i]};else if(et(n))for(var o in n){var a=n[o];r[o]=et(a)?N({from:o},a):{from:a}}}}function _c(t){var e=t.directives;if(e)for(var n in e){var r=e[n];D(r)&&(e[n]={bind:r,update:r})}}function Jt(t,e,n){if(D(e)&&(e=e.options),bc(e),yc(e),_c(e),!e._base&&(e.extends&&(t=Jt(t,e.extends,n)),e.mixins))for(var r=0,i=e.mixins.length;r<i;r++)t=Jt(t,e.mixins[r],n);var o={},a;for(a in t)s(a);for(a in e)X(t,a)||s(a);function s(c){var u=lt[c]||mc;o[c]=u(t[c],e[c],n,c)}return o}function an(t,e,n,r){if(typeof n=="string"){var i=t[e];if(X(i,n))return i[n];var o=Wt(n);if(X(i,o))return i[o];var a=qa(o);if(X(i,a))return i[a];var s=i[n]||i[o]||i[a];return s}}function Sr(t,e,n,r){var i=e[t],o=!X(n,t),a=n[t],s=li(Boolean,i.type);if(s>-1){if(o&&!X(i,"default"))a=!1;else if(a===""||a===Oe(t)){var c=li(String,i.type);(c<0||s<c)&&(a=!0)}}if(a===void 0){a=wc(r,i,t);var u=pr;Pt(!0),_t(a),Pt(u)}return a}function wc(t,e,n){if(!!X(e,"default")){var r=e.default;return t&&t.$options.propsData&&t.$options.propsData[n]===void 0&&t._props[n]!==void 0?t._props[n]:D(r)&&Jn(e.type)!=="Function"?r.call(t):r}}var Sc=/^\s*function (\w+)/;function Jn(t){var e=t&&t.toString().match(Sc);return e?e[1]:""}function fi(t,e){return Jn(t)===Jn(e)}function li(t,e){if(!T(e))return fi(e,t)?0:-1;for(var n=0,r=e.length;n<r;n++)if(fi(e[n],t))return n;return-1}var St={enumerable:!0,configurable:!0,get:H,set:H};function xr(t,e,n){St.get=function(){return this[e][n]},St.set=function(i){this[e][n]=i},Object.defineProperty(t,n,St)}function xc(t){var e=t.$options;if(e.props&&Cc(t,e.props),Ps(t),e.methods&&Tc(t,e.methods),e.data)Oc(t);else{var n=_t(t._data={});n&&n.vmCount++}e.computed&&Ac(t,e.computed),e.watch&&e.watch!==Dn&&Pc(t,e.watch)}function Cc(t,e){var n=t.$options.propsData||{},r=t._props=go({}),i=t.$options._propKeys=[],o=!t.$parent;o||Pt(!1);var a=function(c){i.push(c);var u=Sr(c,e,n,t);It(r,c,u),c in t||xr(t,"_props",c)};for(var s in e)a(s);Pt(!0)}function Oc(t){var e=t.$options.data;e=t._data=D(e)?$c(e,t):e||{},et(e)||(e={});var n=Object.keys(e),r=t.$options.props;t.$options.methods;for(var i=n.length;i--;){var o=n[i];r&&X(r,o)||uo(o)||xr(t,"_data",o)}var a=_t(e);a&&a.vmCount++}function $c(t,e){ue();try{return t.call(e,e)}catch(n){return Gt(n,e,"data()"),{}}finally{fe()}}var Ec={lazy:!0};function Ac(t,e){var n=t._computedWatchers=Object.create(null),r=kt();for(var i in e){var o=e[i],a=D(o)?o:o.get;r||(n[i]=new Ee(t,a||H,H,Ec)),i in t||Lo(t,i,o)}}function Lo(t,e,n){var r=!kt();D(n)?(St.get=r?pi(e):di(n),St.set=H):(St.get=n.get?r&&n.cache!==!1?pi(e):di(n.get):H,St.set=n.set||H),Object.defineProperty(t,e,St)}function pi(t){return function(){var n=this._computedWatchers&&this._computedWatchers[t];if(n)return n.dirty&&n.evaluate(),yt.target&&n.depend(),n.value}}function di(t){return function(){return t.call(this,this)}}function Tc(t,e){t.$options.props;for(var n in e)t[n]=typeof e[n]!="function"?H:io(e[n],t)}function Pc(t,e){for(var n in e){var r=e[n];if(T(r))for(var i=0;i<r.length;i++)Kn(t,n,r[i]);else Kn(t,n,r)}}function Kn(t,e,n,r){return et(n)&&(r=n,n=n.handler),typeof n=="string"&&(n=t[n]),t.$watch(e,n,r)}function Ic(t){var e={};e.get=function(){return this._data};var n={};n.get=function(){return this._props},Object.defineProperty(t.prototype,"$data",e),Object.defineProperty(t.prototype,"$props",n),t.prototype.$set=dr,t.prototype.$delete=ho,t.prototype.$watch=function(r,i,o){var a=this;if(et(i))return Kn(a,r,i,o);o=o||{},o.user=!0;var s=new Ee(a,r,i,o);if(o.immediate){var c='callback for immediate watcher "'.concat(s.expression,'"');ue(),wt(i,a,[s.value],a,c),fe()}return function(){s.teardown()}}}var Rc=0;function kc(t){t.prototype._init=function(e){var n=this;n._uid=Rc++,n._isVue=!0,n.__v_skip=!0,n._scope=new yo(!0),n._scope._vm=!0,e&&e._isComponent?jc(n,e):n.$options=Jt(Cr(n.constructor),e||{},n),n._renderProxy=n,n._self=n,Xs(n),qs(n),js(n),ct(n,"beforeCreate",void 0,!1),sc(n),xc(n),ac(n),ct(n,"created"),n.$options.el&&n.$mount(n.$options.el)}}function jc(t,e){var n=t.$options=Object.create(t.constructor.options),r=e._parentVnode;n.parent=e.parent,n._parentVnode=r;var i=r.componentOptions;n.propsData=i.propsData,n._parentListeners=i.listeners,n._renderChildren=i.children,n._componentTag=i.tag,e.render&&(n.render=e.render,n.staticRenderFns=e.staticRenderFns)}function Cr(t){var e=t.options;if(t.super){var n=Cr(t.super),r=t.superOptions;if(n!==r){t.superOptions=n;var i=Lc(t);i&&N(t.extendOptions,i),e=t.options=Jt(n,t.extendOptions),e.name&&(e.components[e.name]=t)}}return e}function Lc(t){var e,n=t.options,r=t.sealedOptions;for(var i in n)n[i]!==r[i]&&(e||(e={}),e[i]=n[i]);return e}function B(t){this._init(t)}kc(B);Ic(B);Ys(B);Qs(B);Ls(B);function Dc(t){t.use=function(e){var n=this._installedPlugins||(this._installedPlugins=[]);if(n.indexOf(e)>-1)return this;var r=jn(arguments,1);return r.unshift(this),D(e.install)?e.install.apply(e,r):D(e)&&e.apply(null,r),n.push(e),this}}function Nc(t){t.mixin=function(e){return this.options=Jt(this.options,e),this}}function Mc(t){t.cid=0;var e=1;t.extend=function(n){n=n||{};var r=this,i=r.cid,o=n._Ctor||(n._Ctor={});if(o[i])return o[i];var a=on(n)||on(r.options),s=function(u){this._init(u)};return s.prototype=Object.create(r.prototype),s.prototype.constructor=s,s.cid=e++,s.options=Jt(r.options,n),s.super=r,s.options.props&&Fc(s),s.options.computed&&Uc(s),s.extend=r.extend,s.mixin=r.mixin,s.use=r.use,mn.forEach(function(c){s[c]=r[c]}),a&&(s.options.components[a]=s),s.superOptions=r.options,s.extendOptions=n,s.sealedOptions=N({},s.options),o[i]=s,s}}function Fc(t){var e=t.options.props;for(var n in e)xr(t.prototype,"_props",n)}function Uc(t){var e=t.options.computed;for(var n in e)Lo(t.prototype,n,e[n])}function Hc(t){mn.forEach(function(e){t[e]=function(n,r){return r?(e==="component"&&et(r)&&(r.name=r.name||n,r=this.options._base.extend(r)),e==="directive"&&D(r)&&(r={bind:r,update:r}),this.options[e+"s"][n]=r,r):this.options[e+"s"][n]}})}function hi(t){return t&&(on(t.Ctor.options)||t.tag)}function ke(t,e){return T(t)?t.indexOf(e)>-1:typeof t=="string"?t.split(",").indexOf(e)>-1:Ua(t)?t.test(e):!1}function vi(t,e){var n=t.cache,r=t.keys,i=t._vnode;for(var o in n){var a=n[o];if(a){var s=a.name;s&&!e(s)&&Yn(n,o,r,i)}}}function Yn(t,e,n,r){var i=t[e];i&&(!r||i.tag!==r.tag)&&i.componentInstance.$destroy(),t[e]=null,Rt(n,e)}var gi=[String,RegExp,Array],Bc={name:"keep-alive",abstract:!0,props:{include:gi,exclude:gi,max:[String,Number]},methods:{cacheVNode:function(){var t=this,e=t.cache,n=t.keys,r=t.vnodeToCache,i=t.keyToCache;if(r){var o=r.tag,a=r.componentInstance,s=r.componentOptions;e[i]={name:hi(s),tag:o,componentInstance:a},n.push(i),this.max&&n.length>parseInt(this.max)&&Yn(e,n[0],n,this._vnode),this.vnodeToCache=null}}},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var t in this.cache)Yn(this.cache,t,this.keys)},mounted:function(){var t=this;this.cacheVNode(),this.$watch("include",function(e){vi(t,function(n){return ke(e,n)})}),this.$watch("exclude",function(e){vi(t,function(n){return!ke(e,n)})})},updated:function(){this.cacheVNode()},render:function(){var t=this.$slots.default,e=$o(t),n=e&&e.componentOptions;if(n){var r=hi(n),i=this,o=i.include,a=i.exclude;if(o&&(!r||!ke(o,r))||a&&r&&ke(a,r))return e;var s=this,c=s.cache,u=s.keys,f=e.key==null?n.Ctor.cid+(n.tag?"::".concat(n.tag):""):e.key;c[f]?(e.componentInstance=c[f].componentInstance,Rt(u,f),u.push(f)):(this.vnodeToCache=e,this.keyToCache=f),e.data.keepAlive=!0}return e||t&&t[0]}},zc={KeepAlive:Bc};function Wc(t){var e={};e.get=function(){return ot},Object.defineProperty(t,"config",e),t.util={warn:dc,extend:N,mergeOptions:Jt,defineReactive:It},t.set=dr,t.delete=ho,t.nextTick=gr,t.observable=function(n){return _t(n),n},t.options=Object.create(null),mn.forEach(function(n){t.options[n+"s"]=Object.create(null)}),t.options._base=t,N(t.options.components,zc),Dc(t),Nc(t),Mc(t),Hc(t)}Wc(B);Object.defineProperty(B.prototype,"$isServer",{get:kt});Object.defineProperty(B.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}});Object.defineProperty(B,"FunctionalRenderContext",{value:_r});B.version=zs;var qc=ut("style,class"),Gc=ut("input,textarea,option,select,progress"),Jc=function(t,e,n){return n==="value"&&Gc(t)&&e!=="button"||n==="selected"&&t==="option"||n==="checked"&&t==="input"||n==="muted"&&t==="video"},Do=ut("contenteditable,draggable,spellcheck"),Kc=ut("events,caret,typing,plaintext-only"),Yc=function(t,e){return sn(e)||e==="false"?"false":t==="contenteditable"&&Kc(e)?e:"true"},Xc=ut("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible"),Xn="http://www.w3.org/1999/xlink",Or=function(t){return t.charAt(5)===":"&&t.slice(0,5)==="xlink"},No=function(t){return Or(t)?t.slice(6,t.length):""},sn=function(t){return t==null||t===!1};function Qc(t){for(var e=t.data,n=t,r=t;d(r.componentInstance);)r=r.componentInstance._vnode,r&&r.data&&(e=mi(r.data,e));for(;d(n=n.parent);)n&&n.data&&(e=mi(e,n.data));return Zc(e.staticClass,e.class)}function mi(t,e){return{staticClass:$r(t.staticClass,e.staticClass),class:d(t.class)?[t.class,e.class]:e.class}}function Zc(t,e){return d(t)||d(e)?$r(t,Er(e)):""}function $r(t,e){return t?e?t+" "+e:t:e||""}function Er(t){return Array.isArray(t)?Vc(t):K(t)?tu(t):typeof t=="string"?t:""}function Vc(t){for(var e="",n,r=0,i=t.length;r<i;r++)d(n=Er(t[r]))&&n!==""&&(e&&(e+=" "),e+=n);return e}function tu(t){var e="";for(var n in t)t[n]&&(e&&(e+=" "),e+=n);return e}var eu={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},nu=ut("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),Ar=ut("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),Mo=function(t){return nu(t)||Ar(t)};function ru(t){if(Ar(t))return"svg";if(t==="math")return"math"}var je=Object.create(null);function iu(t){if(!rt)return!0;if(Mo(t))return!1;if(t=t.toLowerCase(),je[t]!=null)return je[t];var e=document.createElement(t);return t.indexOf("-")>-1?je[t]=e.constructor===window.HTMLUnknownElement||e.constructor===window.HTMLElement:je[t]=/HTMLUnknownElement/.test(e.toString())}var Qn=ut("text,number,password,search,email,tel,url");function ou(t){if(typeof t=="string"){var e=document.querySelector(t);return e||document.createElement("div")}else return t}function au(t,e){var n=document.createElement(t);return t!=="select"||e.data&&e.data.attrs&&e.data.attrs.multiple!==void 0&&n.setAttribute("multiple","multiple"),n}function su(t,e){return document.createElementNS(eu[t],e)}function cu(t){return document.createTextNode(t)}function uu(t){return document.createComment(t)}function fu(t,e,n){t.insertBefore(e,n)}function lu(t,e){t.removeChild(e)}function pu(t,e){t.appendChild(e)}function du(t){return t.parentNode}function hu(t){return t.nextSibling}function vu(t){return t.tagName}function gu(t,e){t.textContent=e}function mu(t,e){t.setAttribute(e,"")}var bu=Object.freeze({__proto__:null,createElement:au,createElementNS:su,createTextNode:cu,createComment:uu,insertBefore:fu,removeChild:lu,appendChild:pu,parentNode:du,nextSibling:hu,tagName:vu,setTextContent:gu,setStyleScope:mu}),yu={create:function(t,e){ne(e)},update:function(t,e){t.data.ref!==e.data.ref&&(ne(t,!0),ne(e))},destroy:function(t){ne(t,!0)}};function ne(t,e){var n=t.data.ref;if(!!d(n)){var r=t.context,i=t.componentInstance||t.elm,o=e?null:i,a=e?void 0:i;if(D(n)){wt(n,r,[o],r,"template ref function");return}var s=t.data.refInFor,c=typeof n=="string"||typeof n=="number",u=tt(n),f=r.$refs;if(c||u){if(s){var h=c?f[n]:n.value;e?T(h)&&Rt(h,i):T(h)?h.includes(i)||h.push(i):c?(f[n]=[i],bi(r,n,f[n])):n.value=[i]}else if(c){if(e&&f[n]!==i)return;f[n]=a,bi(r,n,o)}else if(u){if(e&&n.value!==i)return;n.value=o}}}}function bi(t,e,n){var r=t._setupState;r&&X(r,e)&&(tt(r[e])?r[e].value=n:r[e]=n)}var Ct=new nt("",{},[]),de=["create","activate","update","remove","destroy"];function Mt(t,e){return t.key===e.key&&t.asyncFactory===e.asyncFactory&&(t.tag===e.tag&&t.isComment===e.isComment&&d(t.data)===d(e.data)&&_u(t,e)||z(t.isAsyncPlaceholder)&&O(e.asyncFactory.error))}function _u(t,e){if(t.tag!=="input")return!0;var n,r=d(n=t.data)&&d(n=n.attrs)&&n.type,i=d(n=e.data)&&d(n=n.attrs)&&n.type;return r===i||Qn(r)&&Qn(i)}function wu(t,e,n){var r,i,o={};for(r=e;r<=n;++r)i=t[r].key,d(i)&&(o[i]=r);return o}function Su(t){var e,n,r={},i=t.modules,o=t.nodeOps;for(e=0;e<de.length;++e)for(r[de[e]]=[],n=0;n<i.length;++n)d(i[n][de[e]])&&r[de[e]].push(i[n][de[e]]);function a(p){return new nt(o.tagName(p).toLowerCase(),{},[],void 0,p)}function s(p,l){function g(){--g.listeners===0&&c(p)}return g.listeners=l,g}function c(p){var l=o.parentNode(p);d(l)&&o.removeChild(l,p)}function u(p,l,g,w,C,I,$){if(d(p.elm)&&d(I)&&(p=I[$]=Nn(p)),p.isRootInsert=!C,!f(p,l,g,w)){var E=p.data,R=p.children,k=p.tag;d(k)?(p.elm=p.ns?o.createElementNS(p.ns,k):o.createElement(k,p),S(p),y(p,R,l),d(E)&&b(p,l),m(g,p.elm,w)):z(p.isComment)?(p.elm=o.createComment(p.text),m(g,p.elm,w)):(p.elm=o.createTextNode(p.text),m(g,p.elm,w))}}function f(p,l,g,w){var C=p.data;if(d(C)){var I=d(p.componentInstance)&&C.keepAlive;if(d(C=C.hook)&&d(C=C.init)&&C(p,!1),d(p.componentInstance))return h(p,l),m(g,p.elm,w),z(I)&&v(p,l,g,w),!0}}function h(p,l){d(p.data.pendingInsert)&&(l.push.apply(l,p.data.pendingInsert),p.data.pendingInsert=null),p.elm=p.componentInstance.$el,_(p)?(b(p,l),S(p)):(ne(p),l.push(p))}function v(p,l,g,w){for(var C,I=p;I.componentInstance;)if(I=I.componentInstance._vnode,d(C=I.data)&&d(C=C.transition)){for(C=0;C<r.activate.length;++C)r.activate[C](Ct,I);l.push(I);break}m(g,p.elm,w)}function m(p,l,g){d(p)&&(d(g)?o.parentNode(g)===p&&o.insertBefore(p,l,g):o.appendChild(p,l))}function y(p,l,g){if(T(l))for(var w=0;w<l.length;++w)u(l[w],g,p.elm,null,!0,l,w);else Ce(p.text)&&o.appendChild(p.elm,o.createTextNode(String(p.text)))}function _(p){for(;p.componentInstance;)p=p.componentInstance._vnode;return d(p.tag)}function b(p,l){for(var g=0;g<r.create.length;++g)r.create[g](Ct,p);e=p.data.hook,d(e)&&(d(e.create)&&e.create(Ct,p),d(e.insert)&&l.push(p))}function S(p){var l;if(d(l=p.fnScopeId))o.setStyleScope(p.elm,l);else for(var g=p;g;)d(l=g.context)&&d(l=l.$options._scopeId)&&o.setStyleScope(p.elm,l),g=g.parent;d(l=Ht)&&l!==p.context&&l!==p.fnContext&&d(l=l.$options._scopeId)&&o.setStyleScope(p.elm,l)}function x(p,l,g,w,C,I){for(;w<=C;++w)u(g[w],I,p,l,!1,g,w)}function A(p){var l,g,w=p.data;if(d(w))for(d(l=w.hook)&&d(l=l.destroy)&&l(p),l=0;l<r.destroy.length;++l)r.destroy[l](p);if(d(l=p.children))for(g=0;g<p.children.length;++g)A(p.children[g])}function P(p,l,g){for(;l<=g;++l){var w=p[l];d(w)&&(d(w.tag)?(L(w),A(w)):c(w.elm))}}function L(p,l){if(d(l)||d(p.data)){var g,w=r.remove.length+1;for(d(l)?l.listeners+=w:l=s(p.elm,w),d(g=p.componentInstance)&&d(g=g._vnode)&&d(g.data)&&L(g,l),g=0;g<r.remove.length;++g)r.remove[g](p,l);d(g=p.data.hook)&&d(g=g.remove)?g(p,l):l()}else c(p.elm)}function F(p,l,g,w,C){for(var I=0,$=0,E=l.length-1,R=l[0],k=l[E],j=g.length-1,q=g[0],it=g[j],Lt,Dt,Nt,Xt,Cn=!C;I<=E&&$<=j;)O(R)?R=l[++I]:O(k)?k=l[--E]:Mt(R,q)?(W(R,q,w,g,$),R=l[++I],q=g[++$]):Mt(k,it)?(W(k,it,w,g,j),k=l[--E],it=g[--j]):Mt(R,it)?(W(R,it,w,g,j),Cn&&o.insertBefore(p,R.elm,o.nextSibling(k.elm)),R=l[++I],it=g[--j]):Mt(k,q)?(W(k,q,w,g,$),Cn&&o.insertBefore(p,k.elm,R.elm),k=l[--E],q=g[++$]):(O(Lt)&&(Lt=wu(l,I,E)),Dt=d(q.key)?Lt[q.key]:U(q,l,I,E),O(Dt)?u(q,w,p,R.elm,!1,g,$):(Nt=l[Dt],Mt(Nt,q)?(W(Nt,q,w,g,$),l[Dt]=void 0,Cn&&o.insertBefore(p,Nt.elm,R.elm)):u(q,w,p,R.elm,!1,g,$)),q=g[++$]);I>E?(Xt=O(g[j+1])?null:g[j+1].elm,x(p,Xt,g,$,j,w)):$>j&&P(l,I,E)}function U(p,l,g,w){for(var C=g;C<w;C++){var I=l[C];if(d(I)&&Mt(p,I))return C}}function W(p,l,g,w,C,I){if(p!==l){d(l.elm)&&d(w)&&(l=w[C]=Nn(l));var $=l.elm=p.elm;if(z(p.isAsyncPlaceholder)){d(l.asyncFactory.resolved)?ht(p.elm,l,g):l.isAsyncPlaceholder=!0;return}if(z(l.isStatic)&&z(p.isStatic)&&l.key===p.key&&(z(l.isCloned)||z(l.isOnce))){l.componentInstance=p.componentInstance;return}var E,R=l.data;d(R)&&d(E=R.hook)&&d(E=E.prepatch)&&E(p,l);var k=p.children,j=l.children;if(d(R)&&_(l)){for(E=0;E<r.update.length;++E)r.update[E](p,l);d(E=R.hook)&&d(E=E.update)&&E(p,l)}O(l.text)?d(k)&&d(j)?k!==j&&F($,k,j,g,I):d(j)?(d(p.text)&&o.setTextContent($,""),x($,null,j,0,j.length-1,g)):d(k)?P(k,0,k.length-1):d(p.text)&&o.setTextContent($,""):p.text!==l.text&&o.setTextContent($,l.text),d(R)&&d(E=R.hook)&&d(E=E.postpatch)&&E(p,l)}}function pt(p,l,g){if(z(g)&&d(p.parent))p.parent.data.pendingInsert=l;else for(var w=0;w<l.length;++w)l[w].data.hook.insert(l[w])}var dt=ut("attrs,class,staticClass,staticStyle,key");function ht(p,l,g,w){var C,I=l.tag,$=l.data,E=l.children;if(w=w||$&&$.pre,l.elm=p,z(l.isComment)&&d(l.asyncFactory))return l.isAsyncPlaceholder=!0,!0;if(d($)&&(d(C=$.hook)&&d(C=C.init)&&C(l,!0),d(C=l.componentInstance)))return h(l,g),!0;if(d(I)){if(d(E))if(!p.hasChildNodes())y(l,E,g);else if(d(C=$)&&d(C=C.domProps)&&d(C=C.innerHTML)){if(C!==p.innerHTML)return!1}else{for(var R=!0,k=p.firstChild,j=0;j<E.length;j++){if(!k||!ht(k,E[j],g,w)){R=!1;break}k=k.nextSibling}if(!R||k)return!1}if(d($)){var q=!1;for(var it in $)if(!dt(it)){q=!0,b(l,g);break}!q&&$.class&&oe($.class)}}else p.data!==l.text&&(p.data=l.text);return!0}return function(l,g,w,C){if(O(g)){d(l)&&A(l);return}var I=!1,$=[];if(O(l))I=!0,u(g,$);else{var E=d(l.nodeType);if(!E&&Mt(l,g))W(l,g,$,null,null,C);else{if(E){if(l.nodeType===1&&l.hasAttribute(Br)&&(l.removeAttribute(Br),w=!0),z(w)&&ht(l,g,$))return pt(g,$,!0),l;l=a(l)}var R=l.elm,k=o.parentNode(R);if(u(g,$,R._leaveCb?null:k,o.nextSibling(R)),d(g.parent))for(var j=g.parent,q=_(g);j;){for(var it=0;it<r.destroy.length;++it)r.destroy[it](j);if(j.elm=g.elm,q){for(var Lt=0;Lt<r.create.length;++Lt)r.create[Lt](Ct,j);var Dt=j.data.hook.insert;if(Dt.merged)for(var Nt=Dt.fns.slice(1),Xt=0;Xt<Nt.length;Xt++)Nt[Xt]()}else ne(j);j=j.parent}d(k)?P([l],0,0):d(l.tag)&&A(l)}}return pt(g,$,I),g.elm}}var xu={create:En,update:En,destroy:function(e){En(e,Ct)}};function En(t,e){(t.data.directives||e.data.directives)&&Cu(t,e)}function Cu(t,e){var n=t===Ct,r=e===Ct,i=yi(t.data.directives,t.context),o=yi(e.data.directives,e.context),a=[],s=[],c,u,f;for(c in o)u=i[c],f=o[c],u?(f.oldValue=u.value,f.oldArg=u.arg,he(f,"update",e,t),f.def&&f.def.componentUpdated&&s.push(f)):(he(f,"bind",e,t),f.def&&f.def.inserted&&a.push(f));if(a.length){var h=function(){for(var v=0;v<a.length;v++)he(a[v],"inserted",e,t)};n?xt(e,"insert",h):h()}if(s.length&&xt(e,"postpatch",function(){for(var v=0;v<s.length;v++)he(s[v],"componentUpdated",e,t)}),!n)for(c in i)o[c]||he(i[c],"unbind",t,t,r)}var Ou=Object.create(null);function yi(t,e){var n=Object.create(null);if(!t)return n;var r,i;for(r=0;r<t.length;r++){if(i=t[r],i.modifiers||(i.modifiers=Ou),n[$u(i)]=i,e._setupState&&e._setupState.__sfc){var o=i.def||an(e,"_setupState","v-"+i.name);typeof o=="function"?i.def={bind:o,update:o}:i.def=o}i.def=i.def||an(e.$options,"directives",i.name)}return n}function $u(t){return t.rawName||"".concat(t.name,".").concat(Object.keys(t.modifiers||{}).join("."))}function he(t,e,n,r,i){var o=t.def&&t.def[e];if(o)try{o(n.elm,t,n,r,i)}catch(a){Gt(a,n.context,"directive ".concat(t.name," ").concat(e," hook"))}}var Eu=[yu,xu];function _i(t,e){var n=e.componentOptions;if(!(d(n)&&n.Ctor.options.inheritAttrs===!1)&&!(O(t.data.attrs)&&O(e.data.attrs))){var r,i,o,a=e.elm,s=t.data.attrs||{},c=e.data.attrs||{};(d(c.__ob__)||z(c._v_attr_proxy))&&(c=e.data.attrs=N({},c));for(r in c)i=c[r],o=s[r],o!==i&&wi(a,r,i,e.data.pre);(se||lr)&&c.value!==s.value&&wi(a,"value",c.value);for(r in s)O(c[r])&&(Or(r)?a.removeAttributeNS(Xn,No(r)):Do(r)||a.removeAttribute(r))}}function wi(t,e,n,r){r||t.tagName.indexOf("-")>-1?Si(t,e,n):Xc(e)?sn(n)?t.removeAttribute(e):(n=e==="allowfullscreen"&&t.tagName==="EMBED"?"true":e,t.setAttribute(e,n)):Do(e)?t.setAttribute(e,Yc(e,n)):Or(e)?sn(n)?t.removeAttributeNS(Xn,No(e)):t.setAttributeNS(Xn,e,n):Si(t,e,n)}function Si(t,e,n){if(sn(n))t.removeAttribute(e);else{if(se&&!ce&&t.tagName==="TEXTAREA"&&e==="placeholder"&&n!==""&&!t.__ieph){var r=function(i){i.stopImmediatePropagation(),t.removeEventListener("input",r)};t.addEventListener("input",r),t.__ieph=!0}t.setAttribute(e,n)}}var Au={create:_i,update:_i};function xi(t,e){var n=e.elm,r=e.data,i=t.data;if(!(O(r.staticClass)&&O(r.class)&&(O(i)||O(i.staticClass)&&O(i.class)))){var o=Qc(e),a=n._transitionClasses;d(a)&&(o=$r(o,Er(a))),o!==n._prevClass&&(n.setAttribute("class",o),n._prevClass=o)}}var Tu={create:xi,update:xi},An="__r",Tn="__c";function Pu(t){if(d(t[An])){var e=se?"change":"input";t[e]=[].concat(t[An],t[e]||[]),delete t[An]}d(t[Tn])&&(t.change=[].concat(t[Tn],t.change||[]),delete t[Tn])}var xe;function Iu(t,e,n){var r=xe;return function i(){var o=e.apply(null,arguments);o!==null&&Fo(t,i,n,r)}}var Ru=Hn&&!(zr&&Number(zr[1])<=53);function ku(t,e,n,r){if(Ru){var i=ko,o=e;e=o._wrapper=function(a){if(a.target===a.currentTarget||a.timeStamp>=i||a.timeStamp<=0||a.target.ownerDocument!==document)return o.apply(this,arguments)}}xe.addEventListener(t,e,fo?{capture:n,passive:r}:n)}function Fo(t,e,n,r){(r||xe).removeEventListener(t,e._wrapper||e,n)}function Pn(t,e){if(!(O(t.data.on)&&O(e.data.on))){var n=e.data.on||{},r=t.data.on||{};xe=e.elm||t.elm,Pu(n),_o(n,r,ku,Fo,Iu,e.context),xe=void 0}}var ju={create:Pn,update:Pn,destroy:function(t){return Pn(t,Ct)}},Le;function Ci(t,e){if(!(O(t.data.domProps)&&O(e.data.domProps))){var n,r,i=e.elm,o=t.data.domProps||{},a=e.data.domProps||{};(d(a.__ob__)||z(a._v_attr_proxy))&&(a=e.data.domProps=N({},a));for(n in o)n in a||(i[n]="");for(n in a){if(r=a[n],n==="textContent"||n==="innerHTML"){if(e.children&&(e.children.length=0),r===o[n])continue;i.childNodes.length===1&&i.removeChild(i.childNodes[0])}if(n==="value"&&i.tagName!=="PROGRESS"){i._value=r;var s=O(r)?"":String(r);Lu(i,s)&&(i.value=s)}else if(n==="innerHTML"&&Ar(i.tagName)&&O(i.innerHTML)){Le=Le||document.createElement("div"),Le.innerHTML="<svg>".concat(r,"</svg>");for(var c=Le.firstChild;i.firstChild;)i.removeChild(i.firstChild);for(;c.firstChild;)i.appendChild(c.firstChild)}else if(r!==o[n])try{i[n]=r}catch(u){}}}}function Lu(t,e){return!t.composing&&(t.tagName==="OPTION"||Du(t,e)||Nu(t,e))}function Du(t,e){var n=!0;try{n=document.activeElement!==t}catch(r){}return n&&t.value!==e}function Nu(t,e){var n=t.value,r=t._vModifiers;if(d(r)){if(r.number)return be(n)!==be(e);if(r.trim)return n.trim()!==e.trim()}return n!==e}var Mu={create:Ci,update:Ci},Fu=Kt(function(t){var e={},n=/;(?![^(]*\))/g,r=/:(.+)/;return t.split(n).forEach(function(i){if(i){var o=i.split(r);o.length>1&&(e[o[0].trim()]=o[1].trim())}}),e});function In(t){var e=Uo(t.style);return t.staticStyle?N(t.staticStyle,e):e}function Uo(t){return Array.isArray(t)?oo(t):typeof t=="string"?Fu(t):t}function Uu(t,e){var n={},r;if(e)for(var i=t;i.componentInstance;)i=i.componentInstance._vnode,i&&i.data&&(r=In(i.data))&&N(n,r);(r=In(t.data))&&N(n,r);for(var o=t;o=o.parent;)o.data&&(r=In(o.data))&&N(n,r);return n}var Hu=/^--/,Oi=/\s*!important$/,$i=function(t,e,n){if(Hu.test(e))t.style.setProperty(e,n);else if(Oi.test(n))t.style.setProperty(Oe(e),n.replace(Oi,""),"important");else{var r=Bu(e);if(Array.isArray(n))for(var i=0,o=n.length;i<o;i++)t.style[r]=n[i];else t.style[r]=n}},Ei=["Webkit","Moz","ms"],De,Bu=Kt(function(t){if(De=De||document.createElement("div").style,t=Wt(t),t!=="filter"&&t in De)return t;for(var e=t.charAt(0).toUpperCase()+t.slice(1),n=0;n<Ei.length;n++){var r=Ei[n]+e;if(r in De)return r}});function Ai(t,e){var n=e.data,r=t.data;if(!(O(n.staticStyle)&&O(n.style)&&O(r.staticStyle)&&O(r.style))){var i,o,a=e.elm,s=r.staticStyle,c=r.normalizedStyle||r.style||{},u=s||c,f=Uo(e.data.style)||{};e.data.normalizedStyle=d(f.__ob__)?N({},f):f;var h=Uu(e,!0);for(o in u)O(h[o])&&$i(a,o,"");for(o in h)i=h[o],i!==u[o]&&$i(a,o,i==null?"":i)}}var zu={create:Ai,update:Ai},Ho=/\s+/;function Bo(t,e){if(!(!e||!(e=e.trim())))if(t.classList)e.indexOf(" ")>-1?e.split(Ho).forEach(function(r){return t.classList.add(r)}):t.classList.add(e);else{var n=" ".concat(t.getAttribute("class")||""," ");n.indexOf(" "+e+" ")<0&&t.setAttribute("class",(n+e).trim())}}function zo(t,e){if(!(!e||!(e=e.trim())))if(t.classList)e.indexOf(" ")>-1?e.split(Ho).forEach(function(i){return t.classList.remove(i)}):t.classList.remove(e),t.classList.length||t.removeAttribute("class");else{for(var n=" ".concat(t.getAttribute("class")||""," "),r=" "+e+" ";n.indexOf(r)>=0;)n=n.replace(r," ");n=n.trim(),n?t.setAttribute("class",n):t.removeAttribute("class")}}function Wo(t){if(!!t){if(typeof t=="object"){var e={};return t.css!==!1&&N(e,Ti(t.name||"v")),N(e,t),e}else if(typeof t=="string")return Ti(t)}}var Ti=Kt(function(t){return{enterClass:"".concat(t,"-enter"),enterToClass:"".concat(t,"-enter-to"),enterActiveClass:"".concat(t,"-enter-active"),leaveClass:"".concat(t,"-leave"),leaveToClass:"".concat(t,"-leave-to"),leaveActiveClass:"".concat(t,"-leave-active")}}),qo=rt&&!ce,Vt="transition",Rn="animation",ze="transition",cn="transitionend",Zn="animation",Go="animationend";qo&&(window.ontransitionend===void 0&&window.onwebkittransitionend!==void 0&&(ze="WebkitTransition",cn="webkitTransitionEnd"),window.onanimationend===void 0&&window.onwebkitanimationend!==void 0&&(Zn="WebkitAnimation",Go="webkitAnimationEnd"));var Pi=rt?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:function(t){return t()};function Jo(t){Pi(function(){Pi(t)})}function Bt(t,e){var n=t._transitionClasses||(t._transitionClasses=[]);n.indexOf(e)<0&&(n.push(e),Bo(t,e))}function mt(t,e){t._transitionClasses&&Rt(t._transitionClasses,e),zo(t,e)}function Ko(t,e,n){var r=Yo(t,e),i=r.type,o=r.timeout,a=r.propCount;if(!i)return n();var s=i===Vt?cn:Go,c=0,u=function(){t.removeEventListener(s,f),n()},f=function(h){h.target===t&&++c>=a&&u()};setTimeout(function(){c<a&&u()},o+1),t.addEventListener(s,f)}var Wu=/\b(transform|all)(,|$)/;function Yo(t,e){var n=window.getComputedStyle(t),r=(n[ze+"Delay"]||"").split(", "),i=(n[ze+"Duration"]||"").split(", "),o=Ii(r,i),a=(n[Zn+"Delay"]||"").split(", "),s=(n[Zn+"Duration"]||"").split(", "),c=Ii(a,s),u,f=0,h=0;e===Vt?o>0&&(u=Vt,f=o,h=i.length):e===Rn?c>0&&(u=Rn,f=c,h=s.length):(f=Math.max(o,c),u=f>0?o>c?Vt:Rn:null,h=u?u===Vt?i.length:s.length:0);var v=u===Vt&&Wu.test(n[ze+"Property"]);return{type:u,timeout:f,propCount:h,hasTransform:v}}function Ii(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max.apply(null,e.map(function(n,r){return Ri(n)+Ri(t[r])}))}function Ri(t){return Number(t.slice(0,-1).replace(",","."))*1e3}function Vn(t,e){var n=t.elm;d(n._leaveCb)&&(n._leaveCb.cancelled=!0,n._leaveCb());var r=Wo(t.data.transition);if(!O(r)&&!(d(n._enterCb)||n.nodeType!==1)){for(var i=r.css,o=r.type,a=r.enterClass,s=r.enterToClass,c=r.enterActiveClass,u=r.appearClass,f=r.appearToClass,h=r.appearActiveClass,v=r.beforeEnter,m=r.enter,y=r.afterEnter,_=r.enterCancelled,b=r.beforeAppear,S=r.appear,x=r.afterAppear,A=r.appearCancelled,P=r.duration,L=Ht,F=Ht.$vnode;F&&F.parent;)L=F.context,F=F.parent;var U=!L._isMounted||!t.isRootInsert;if(!(U&&!S&&S!=="")){var W=U&&u?u:a,pt=U&&h?h:c,dt=U&&f?f:s,ht=U&&b||v,p=U&&D(S)?S:m,l=U&&x||y,g=U&&A||_,w=be(K(P)?P.enter:P),C=i!==!1&&!ce,I=Tr(p),$=n._enterCb=Ze(function(){C&&(mt(n,dt),mt(n,pt)),$.cancelled?(C&&mt(n,W),g&&g(n)):l&&l(n),n._enterCb=null});t.data.show||xt(t,"insert",function(){var E=n.parentNode,R=E&&E._pending&&E._pending[t.key];R&&R.tag===t.tag&&R.elm._leaveCb&&R.elm._leaveCb(),p&&p(n,$)}),ht&&ht(n),C&&(Bt(n,W),Bt(n,pt),Jo(function(){mt(n,W),$.cancelled||(Bt(n,dt),I||(Qo(w)?setTimeout($,w):Ko(n,o,$)))})),t.data.show&&(e&&e(),p&&p(n,$)),!C&&!I&&$()}}}function Xo(t,e){var n=t.elm;d(n._enterCb)&&(n._enterCb.cancelled=!0,n._enterCb());var r=Wo(t.data.transition);if(O(r)||n.nodeType!==1)return e();if(d(n._leaveCb))return;var i=r.css,o=r.type,a=r.leaveClass,s=r.leaveToClass,c=r.leaveActiveClass,u=r.beforeLeave,f=r.leave,h=r.afterLeave,v=r.leaveCancelled,m=r.delayLeave,y=r.duration,_=i!==!1&&!ce,b=Tr(f),S=be(K(y)?y.leave:y),x=n._leaveCb=Ze(function(){n.parentNode&&n.parentNode._pending&&(n.parentNode._pending[t.key]=null),_&&(mt(n,s),mt(n,c)),x.cancelled?(_&&mt(n,a),v&&v(n)):(e(),h&&h(n)),n._leaveCb=null});m?m(A):A();function A(){x.cancelled||(!t.data.show&&n.parentNode&&((n.parentNode._pending||(n.parentNode._pending={}))[t.key]=t),u&&u(n),_&&(Bt(n,a),Bt(n,c),Jo(function(){mt(n,a),x.cancelled||(Bt(n,s),b||(Qo(S)?setTimeout(x,S):Ko(n,o,x)))})),f&&f(n,x),!_&&!b&&x())}}function Qo(t){return typeof t=="number"&&!isNaN(t)}function Tr(t){if(O(t))return!1;var e=t.fns;return d(e)?Tr(Array.isArray(e)?e[0]:e):(t._length||t.length)>1}function ki(t,e){e.data.show!==!0&&Vn(e)}var qu=rt?{create:ki,activate:ki,remove:function(t,e){t.data.show!==!0?Xo(t,e):e()}}:{},Gu=[Au,Tu,ju,Mu,zu,qu],Ju=Gu.concat(Eu),Ku=Su({nodeOps:bu,modules:Ju});ce&&document.addEventListener("selectionchange",function(){var t=document.activeElement;t&&t.vmodel&&Pr(t,"input")});var Zo={inserted:function(t,e,n,r){n.tag==="select"?(r.elm&&!r.elm._vOptions?xt(n,"postpatch",function(){Zo.componentUpdated(t,e,n)}):ji(t,e,n.context),t._vOptions=[].map.call(t.options,un)):(n.tag==="textarea"||Qn(t.type))&&(t._vModifiers=e.modifiers,e.modifiers.lazy||(t.addEventListener("compositionstart",Yu),t.addEventListener("compositionend",Ni),t.addEventListener("change",Ni),ce&&(t.vmodel=!0)))},componentUpdated:function(t,e,n){if(n.tag==="select"){ji(t,e,n.context);var r=t._vOptions,i=t._vOptions=[].map.call(t.options,un);if(i.some(function(a,s){return!qt(a,r[s])})){var o=t.multiple?e.value.some(function(a){return Di(a,i)}):e.value!==e.oldValue&&Di(e.value,i);o&&Pr(t,"change")}}}};function ji(t,e,n){Li(t,e),(se||lr)&&setTimeout(function(){Li(t,e)},0)}function Li(t,e,n){var r=e.value,i=t.multiple;if(!(i&&!Array.isArray(r))){for(var o,a,s=0,c=t.options.length;s<c;s++)if(a=t.options[s],i)o=so(r,un(a))>-1,a.selected!==o&&(a.selected=o);else if(qt(un(a),r)){t.selectedIndex!==s&&(t.selectedIndex=s);return}i||(t.selectedIndex=-1)}}function Di(t,e){return e.every(function(n){return!qt(n,t)})}function un(t){return"_value"in t?t._value:t.value}function Yu(t){t.target.composing=!0}function Ni(t){!t.target.composing||(t.target.composing=!1,Pr(t.target,"input"))}function Pr(t,e){var n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!0),t.dispatchEvent(n)}function tr(t){return t.componentInstance&&(!t.data||!t.data.transition)?tr(t.componentInstance._vnode):t}var Xu={bind:function(t,e,n){var r=e.value;n=tr(n);var i=n.data&&n.data.transition,o=t.__vOriginalDisplay=t.style.display==="none"?"":t.style.display;r&&i?(n.data.show=!0,Vn(n,function(){t.style.display=o})):t.style.display=r?o:"none"},update:function(t,e,n){var r=e.value,i=e.oldValue;if(!r!=!i){n=tr(n);var o=n.data&&n.data.transition;o?(n.data.show=!0,r?Vn(n,function(){t.style.display=t.__vOriginalDisplay}):Xo(n,function(){t.style.display="none"})):t.style.display=r?t.__vOriginalDisplay:"none"}},unbind:function(t,e,n,r,i){i||(t.style.display=t.__vOriginalDisplay)}},Qu={model:Zo,show:Xu},Vo={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]};function er(t){var e=t&&t.componentOptions;return e&&e.Ctor.options.abstract?er($o(e.children)):t}function ta(t){var e={},n=t.$options;for(var r in n.propsData)e[r]=t[r];var i=n._parentListeners;for(var r in i)e[Wt(r)]=i[r];return e}function Mi(t,e){if(/\d-keep-alive$/.test(e.tag))return t("keep-alive",{props:e.componentOptions.propsData})}function Zu(t){for(;t=t.parent;)if(t.data.transition)return!0}function Vu(t,e){return e.key===t.key&&e.tag===t.tag}var tf=function(t){return t.tag||_e(t)},ef=function(t){return t.name==="show"},nf={name:"transition",props:Vo,abstract:!0,render:function(t){var e=this,n=this.$slots.default;if(!!n&&(n=n.filter(tf),!!n.length)){var r=this.mode,i=n[0];if(Zu(this.$vnode))return i;var o=er(i);if(!o)return i;if(this._leaving)return Mi(t,i);var a="__transition-".concat(this._uid,"-");o.key=o.key==null?o.isComment?a+"comment":a+o.tag:Ce(o.key)?String(o.key).indexOf(a)===0?o.key:a+o.key:o.key;var s=(o.data||(o.data={})).transition=ta(this),c=this._vnode,u=er(c);if(o.data.directives&&o.data.directives.some(ef)&&(o.data.show=!0),u&&u.data&&!Vu(o,u)&&!_e(u)&&!(u.componentInstance&&u.componentInstance._vnode.isComment)){var f=u.data.transition=N({},s);if(r==="out-in")return this._leaving=!0,xt(f,"afterLeave",function(){e._leaving=!1,e.$forceUpdate()}),Mi(t,i);if(r==="in-out"){if(_e(o))return c;var h,v=function(){h()};xt(s,"afterEnter",v),xt(s,"enterCancelled",v),xt(f,"delayLeave",function(m){h=m})}}return i}}},ea=N({tag:String,moveClass:String},Vo);delete ea.mode;var rf={props:ea,beforeMount:function(){var t=this,e=this._update;this._update=function(n,r){var i=Po(t);t.__patch__(t._vnode,t.kept,!1,!0),t._vnode=t.kept,i(),e.call(t,n,r)}},render:function(t){for(var e=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),r=this.prevChildren=this.children,i=this.$slots.default||[],o=this.children=[],a=ta(this),s=0;s<i.length;s++){var c=i[s];c.tag&&c.key!=null&&String(c.key).indexOf("__vlist")!==0&&(o.push(c),n[c.key]=c,(c.data||(c.data={})).transition=a)}if(r){for(var u=[],f=[],s=0;s<r.length;s++){var c=r[s];c.data.transition=a,c.data.pos=c.elm.getBoundingClientRect(),n[c.key]?u.push(c):f.push(c)}this.kept=t(e,null,u),this.removed=f}return t(e,null,o)},updated:function(){var t=this.prevChildren,e=this.moveClass||(this.name||"v")+"-move";!t.length||!this.hasMove(t[0].elm,e)||(t.forEach(of),t.forEach(af),t.forEach(sf),this._reflow=document.body.offsetHeight,t.forEach(function(n){if(n.data.moved){var r=n.elm,i=r.style;Bt(r,e),i.transform=i.WebkitTransform=i.transitionDuration="",r.addEventListener(cn,r._moveCb=function o(a){a&&a.target!==r||(!a||/transform$/.test(a.propertyName))&&(r.removeEventListener(cn,o),r._moveCb=null,mt(r,e))})}}))},methods:{hasMove:function(t,e){if(!qo)return!1;if(this._hasMove)return this._hasMove;var n=t.cloneNode();t._transitionClasses&&t._transitionClasses.forEach(function(i){zo(n,i)}),Bo(n,e),n.style.display="none",this.$el.appendChild(n);var r=Yo(n);return this.$el.removeChild(n),this._hasMove=r.hasTransform}}};function of(t){t.elm._moveCb&&t.elm._moveCb(),t.elm._enterCb&&t.elm._enterCb()}function af(t){t.data.newPos=t.elm.getBoundingClientRect()}function sf(t){var e=t.data.pos,n=t.data.newPos,r=e.left-n.left,i=e.top-n.top;if(r||i){t.data.moved=!0;var o=t.elm.style;o.transform=o.WebkitTransform="translate(".concat(r,"px,").concat(i,"px)"),o.transitionDuration="0s"}}var cf={Transition:nf,TransitionGroup:rf};B.config.mustUseProp=Jc;B.config.isReservedTag=Mo;B.config.isReservedAttr=qc;B.config.getTagNamespace=ru;B.config.isUnknownElement=iu;N(B.options.directives,Qu);N(B.options.components,cf);B.prototype.__patch__=rt?Ku:H;B.prototype.$mount=function(t,e){return t=t&&rt?ou(t):void 0,Zs(this,t,e)};rt&&setTimeout(function(){ot.devtools&&Ve&&Ve.emit("init",B)},0);var uf=!0;B.util.warn;function ff(){return na().__VUE_DEVTOOLS_GLOBAL_HOOK__}function na(){return typeof navigator<"u"&&typeof window<"u"?window:typeof global<"u"?global:{}}const lf=typeof Proxy=="function",pf="devtools-plugin:setup",df="plugin:settings:set";let Qt,nr;function hf(){var t;return Qt!==void 0||(typeof window<"u"&&window.performance?(Qt=!0,nr=window.performance):typeof global<"u"&&((t=global.perf_hooks)===null||t===void 0?void 0:t.performance)?(Qt=!0,nr=global.perf_hooks.performance):Qt=!1),Qt}function vf(){return hf()?nr.now():Date.now()}class gf{constructor(e,n){this.target=null,this.targetQueue=[],this.onQueue=[],this.plugin=e,this.hook=n;const r={};if(e.settings)for(const a in e.settings){const s=e.settings[a];r[a]=s.defaultValue}const i=`__vue-devtools-plugin-settings__${e.id}`;let o=Object.assign({},r);try{const a=localStorage.getItem(i),s=JSON.parse(a);Object.assign(o,s)}catch(a){}this.fallbacks={getSettings(){return o},setSettings(a){try{localStorage.setItem(i,JSON.stringify(a))}catch(s){}o=a},now(){return vf()}},n&&n.on(df,(a,s)=>{a===this.plugin.id&&this.fallbacks.setSettings(s)}),this.proxiedOn=new Proxy({},{get:(a,s)=>this.target?this.target.on[s]:(...c)=>{this.onQueue.push({method:s,args:c})}}),this.proxiedTarget=new Proxy({},{get:(a,s)=>this.target?this.target[s]:s==="on"?this.proxiedOn:Object.keys(this.fallbacks).includes(s)?(...c)=>(this.targetQueue.push({method:s,args:c,resolve:()=>{}}),this.fallbacks[s](...c)):(...c)=>new Promise(u=>{this.targetQueue.push({method:s,args:c,resolve:u})})})}async setRealTarget(e){this.target=e;for(const n of this.onQueue)this.target.on[n.method](...n.args);for(const n of this.targetQueue)n.resolve(await this.target[n.method](...n.args))}}function ra(t,e){const n=t,r=na(),i=ff(),o=lf&&n.enableEarlyProxy;if(i&&(r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__||!o))i.emit(pf,t,e);else{const a=o?new gf(n,i):null;(r.__VUE_DEVTOOLS_PLUGINS__=r.__VUE_DEVTOOLS_PLUGINS__||[]).push({pluginDescriptor:n,setupFn:e,proxy:a}),a&&e(a.proxiedTarget)}}/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */const mf=Symbol();var zt;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(zt||(zt={}));const ia=typeof window<"u",oa=typeof __VUE_PROD_DEVTOOLS__<"u"&&__VUE_PROD_DEVTOOLS__&&!0&&ia,Fi=(()=>typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof global=="object"&&global.global===global?global:typeof globalThis=="object"?globalThis:{HTMLElement:null})();function bf(t,{autoBom:e=!1}={}){return e&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t}function Ir(t,e,n){const r=new XMLHttpRequest;r.open("GET",t),r.responseType="blob",r.onload=function(){ca(r.response,e,n)},r.onerror=function(){console.error("could not download file")},r.send()}function aa(t){const e=new XMLHttpRequest;e.open("HEAD",t,!1);try{e.send()}catch(n){}return e.status>=200&&e.status<=299}function We(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(e){const n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(n)}}const qe=typeof navigator=="object"?navigator:{userAgent:""},sa=(()=>/Macintosh/.test(qe.userAgent)&&/AppleWebKit/.test(qe.userAgent)&&!/Safari/.test(qe.userAgent))(),ca=ia?typeof HTMLAnchorElement<"u"&&"download"in HTMLAnchorElement.prototype&&!sa?yf:"msSaveOrOpenBlob"in qe?_f:wf:()=>{};function yf(t,e="download",n){const r=document.createElement("a");r.download=e,r.rel="noopener",typeof t=="string"?(r.href=t,r.origin!==location.origin?aa(r.href)?Ir(t,e,n):(r.target="_blank",We(r)):We(r)):(r.href=URL.createObjectURL(t),setTimeout(function(){URL.revokeObjectURL(r.href)},4e4),setTimeout(function(){We(r)},0))}function _f(t,e="download",n){if(typeof t=="string")if(aa(t))Ir(t,e,n);else{const r=document.createElement("a");r.href=t,r.target="_blank",setTimeout(function(){We(r)})}else navigator.msSaveOrOpenBlob(bf(t,n),e)}function wf(t,e,n,r){if(r=r||open("","_blank"),r&&(r.document.title=r.document.body.innerText="downloading..."),typeof t=="string")return Ir(t,e,n);const i=t.type==="application/octet-stream",o=/constructor/i.test(String(Fi.HTMLElement))||"safari"in Fi,a=/CriOS\/[\d]+/.test(navigator.userAgent);if((a||i&&o||sa)&&typeof FileReader<"u"){const s=new FileReader;s.onloadend=function(){let c=s.result;if(typeof c!="string")throw r=null,new Error("Wrong reader.result type");c=a?c:c.replace(/^data:[^;]*;/,"data:attachment/file;"),r?r.location.href=c:location.assign(c),r=null},s.readAsDataURL(t)}else{const s=URL.createObjectURL(t);r?r.location.assign(s):location.href=s,r=null,setTimeout(function(){URL.revokeObjectURL(s)},4e4)}}function G(t,e){const n="\u{1F34D} "+t;typeof __VUE_DEVTOOLS_TOAST__=="function"?__VUE_DEVTOOLS_TOAST__(n,e):e==="error"?console.error(n):e==="warn"?console.warn(n):console.log(n)}function Rr(t){return"_a"in t&&"install"in t}function ua(){if(!("clipboard"in navigator))return G("Your browser doesn't support the Clipboard API","error"),!0}function fa(t){return t instanceof Error&&t.message.toLowerCase().includes("document is not focused")?(G('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.',"warn"),!0):!1}async function Sf(t){if(!ua())try{await navigator.clipboard.writeText(JSON.stringify(t.state.value)),G("Global state copied to clipboard.")}catch(e){if(fa(e))return;G("Failed to serialize the state. Check the console for more details.","error"),console.error(e)}}async function xf(t){if(!ua())try{la(t,JSON.parse(await navigator.clipboard.readText())),G("Global state pasted from clipboard.")}catch(e){if(fa(e))return;G("Failed to deserialize the state from clipboard. Check the console for more details.","error"),console.error(e)}}async function Cf(t){try{ca(new Blob([JSON.stringify(t.state.value)],{type:"text/plain;charset=utf-8"}),"pinia-state.json")}catch(e){G("Failed to export the state as JSON. Check the console for more details.","error"),console.error(e)}}let vt;function Of(){vt||(vt=document.createElement("input"),vt.type="file",vt.accept=".json");function t(){return new Promise((e,n)=>{vt.onchange=async()=>{const r=vt.files;if(!r)return e(null);const i=r.item(0);return e(i?{text:await i.text(),file:i}:null)},vt.oncancel=()=>e(null),vt.onerror=n,vt.click()})}return t}async function $f(t){try{const n=await Of()();if(!n)return;const{text:r,file:i}=n;la(t,JSON.parse(r)),G(`Global state imported from "${i.name}".`)}catch(e){G("Failed to import the state from JSON. Check the console for more details.","error"),console.error(e)}}function la(t,e){for(const n in e){const r=t.state.value[n];r?Object.assign(r,e[n]):t.state.value[n]=e[n]}}function at(t){return{_custom:{display:t}}}const pa="\u{1F34D} Pinia (root)",rr="_root";function Ef(t){return Rr(t)?{id:rr,label:pa}:{id:t.$id,label:t.$id}}function Af(t){if(Rr(t)){const n=Array.from(t._s.keys()),r=t._s;return{state:n.map(o=>({editable:!0,key:o,value:t.state.value[o]})),getters:n.filter(o=>r.get(o)._getters).map(o=>{const a=r.get(o);return{editable:!1,key:o,value:a._getters.reduce((s,c)=>(s[c]=a[c],s),{})}})}}const e={state:Object.keys(t.$state).map(n=>({editable:!0,key:n,value:t.$state[n]}))};return t._getters&&t._getters.length&&(e.getters=t._getters.map(n=>({editable:!1,key:n,value:t[n]}))),t._customProperties.size&&(e.customProperties=Array.from(t._customProperties).map(n=>({editable:!0,key:n,value:t[n]}))),e}function Tf(t){return t?Array.isArray(t)?t.reduce((e,n)=>(e.keys.push(n.key),e.operations.push(n.type),e.oldValue[n.key]=n.oldValue,e.newValue[n.key]=n.newValue,e),{oldValue:{},keys:[],operations:[],newValue:{}}):{operation:at(t.type),key:at(t.key),oldValue:t.oldValue,newValue:t.newValue}:{}}function Pf(t){switch(t){case zt.direct:return"mutation";case zt.patchFunction:return"$patch";case zt.patchObject:return"$patch";default:return"unknown"}}let re=!0;const Ge=[],Ft="pinia:mutations",J="pinia",{assign:If}=Object,fn=t=>"\u{1F34D} "+t;function Rf(t,e){ra({id:"dev.esm.pinia",label:"Pinia \u{1F34D}",logo:"https://pinia.vuejs.org/logo.svg",packageName:"pinia",homepage:"https://pinia.vuejs.org",componentStateTypes:Ge,app:t},n=>{typeof n.now!="function"&&G("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."),n.addTimelineLayer({id:Ft,label:"Pinia \u{1F34D}",color:15064968}),n.addInspector({id:J,label:"Pinia \u{1F34D}",icon:"storage",treeFilterPlaceholder:"Search stores",actions:[{icon:"content_copy",action:()=>{Sf(e)},tooltip:"Serialize and copy the state"},{icon:"content_paste",action:async()=>{await xf(e),n.sendInspectorTree(J),n.sendInspectorState(J)},tooltip:"Replace the state with the content of your clipboard"},{icon:"save",action:()=>{Cf(e)},tooltip:"Save the state as a JSON file"},{icon:"folder_open",action:async()=>{await $f(e),n.sendInspectorTree(J),n.sendInspectorState(J)},tooltip:"Import the state from a JSON file"}],nodeActions:[{icon:"restore",tooltip:'Reset the state (with "$reset")',action:r=>{const i=e._s.get(r);i?typeof i.$reset!="function"?G(`Cannot reset "${r}" store because it doesn't have a "$reset" method implemented.`,"warn"):(i.$reset(),G(`Store "${r}" reset.`)):G(`Cannot reset "${r}" store because it wasn't found.`,"warn")}}]}),n.on.inspectComponent((r,i)=>{const o=r.componentInstance&&r.componentInstance.proxy;if(o&&o._pStores){const a=r.componentInstance.proxy._pStores;Object.values(a).forEach(s=>{r.instanceData.state.push({type:fn(s.$id),key:"state",editable:!0,value:s._isOptionsAPI?{_custom:{value:yn(s.$state),actions:[{icon:"restore",tooltip:"Reset the state of this store",action:()=>s.$reset()}]}}:Object.keys(s.$state).reduce((c,u)=>(c[u]=s.$state[u],c),{})}),s._getters&&s._getters.length&&r.instanceData.state.push({type:fn(s.$id),key:"getters",editable:!1,value:s._getters.reduce((c,u)=>{try{c[u]=s[u]}catch(f){c[u]=f}return c},{})})})}}),n.on.getInspectorTree(r=>{if(r.app===t&&r.inspectorId===J){let i=[e];i=i.concat(Array.from(e._s.values())),r.rootNodes=(r.filter?i.filter(o=>"$id"in o?o.$id.toLowerCase().includes(r.filter.toLowerCase()):pa.toLowerCase().includes(r.filter.toLowerCase())):i).map(Ef)}}),n.on.getInspectorState(r=>{if(r.app===t&&r.inspectorId===J){const i=r.nodeId===rr?e:e._s.get(r.nodeId);if(!i)return;i&&(r.state=Af(i))}}),n.on.editInspectorState((r,i)=>{if(r.app===t&&r.inspectorId===J){const o=r.nodeId===rr?e:e._s.get(r.nodeId);if(!o)return G(`store "${r.nodeId}" not found`,"error");const{path:a}=r;Rr(o)?a.unshift("state"):(a.length!==1||!o._customProperties.has(a[0])||a[0]in o.$state)&&a.unshift("$state"),re=!1,r.set(o,a,r.state.value),re=!0}}),n.on.editComponentState(r=>{if(r.type.startsWith("\u{1F34D}")){const i=r.type.replace(/^🍍\s*/,""),o=e._s.get(i);if(!o)return G(`store "${i}" not found`,"error");const{path:a}=r;if(a[0]!=="state")return G(`Invalid path for store "${i}":
${a}
Only state can be modified.`);a[0]="$state",re=!1,r.set(o,a,r.state.value),re=!0}})})}function kf(t,e){Ge.includes(fn(e.$id))||Ge.push(fn(e.$id)),ra({id:"dev.esm.pinia",label:"Pinia \u{1F34D}",logo:"https://pinia.vuejs.org/logo.svg",packageName:"pinia",homepage:"https://pinia.vuejs.org",componentStateTypes:Ge,app:t,settings:{logStoreChanges:{label:"Notify about new/deleted stores",type:"boolean",defaultValue:!0}}},n=>{const r=typeof n.now=="function"?n.now.bind(n):Date.now;e.$onAction(({after:a,onError:s,name:c,args:u})=>{const f=da++;n.addTimelineEvent({layerId:Ft,event:{time:r(),title:"\u{1F6EB} "+c,subtitle:"start",data:{store:at(e.$id),action:at(c),args:u},groupId:f}}),a(h=>{Ot=void 0,n.addTimelineEvent({layerId:Ft,event:{time:r(),title:"\u{1F6EC} "+c,subtitle:"end",data:{store:at(e.$id),action:at(c),args:u,result:h},groupId:f}})}),s(h=>{Ot=void 0,n.addTimelineEvent({layerId:Ft,event:{time:r(),logType:"error",title:"\u{1F4A5} "+c,subtitle:"end",data:{store:at(e.$id),action:at(c),args:u,error:h},groupId:f}})})},!0),e._customProperties.forEach(a=>{us(()=>ss(e[a]),(s,c)=>{n.notifyComponentUpdate(),n.sendInspectorState(J),re&&n.addTimelineEvent({layerId:Ft,event:{time:r(),title:"Change",subtitle:a,data:{newValue:s,oldValue:c},groupId:Ot}})},{deep:!0})}),e.$subscribe(({events:a,type:s},c)=>{if(n.notifyComponentUpdate(),n.sendInspectorState(J),!re)return;const u={time:r(),title:Pf(s),data:If({store:at(e.$id)},Tf(a)),groupId:Ot};s===zt.patchFunction?u.subtitle="\u2935\uFE0F":s===zt.patchObject?u.subtitle="\u{1F9E9}":a&&!Array.isArray(a)&&(u.subtitle=a.type),a&&(u.data["rawEvent(s)"]={_custom:{display:"DebuggerEvent",type:"object",tooltip:"raw DebuggerEvent[]",value:a}}),n.addTimelineEvent({layerId:Ft,event:u})},{detached:!0,flush:"sync"});const i=e._hotUpdate;e._hotUpdate=mo(a=>{i(a),n.addTimelineEvent({layerId:Ft,event:{time:r(),title:"\u{1F525} "+e.$id,subtitle:"HMR update",data:{store:at(e.$id),info:at("HMR update")}}}),n.notifyComponentUpdate(),n.sendInspectorTree(J),n.sendInspectorState(J)});const{$dispose:o}=e;e.$dispose=()=>{o(),n.notifyComponentUpdate(),n.sendInspectorTree(J),n.sendInspectorState(J),n.getSettings().logStoreChanges&&G(`Disposed "${e.$id}" store \u{1F5D1}`)},n.notifyComponentUpdate(),n.sendInspectorTree(J),n.sendInspectorState(J),n.getSettings().logStoreChanges&&G(`"${e.$id}" store installed \u{1F195}`)})}let da=0,Ot;function Ui(t,e,n){const r=e.reduce((i,o)=>(i[o]=yn(t)[o],i),{});for(const i in r)t[i]=function(){const o=da,a=n?new Proxy(t,{get(...c){return Ot=o,Reflect.get(...c)},set(...c){return Ot=o,Reflect.set(...c)}}):t;Ot=o;const s=r[i].apply(a,arguments);return Ot=void 0,s}}function jf({app:t,store:e,options:n}){if(e.$id.startsWith("__hot:"))return;e._isOptionsAPI=!!n.state,Ui(e,Object.keys(n.actions),e._isOptionsAPI);const r=e._hotUpdate;yn(e)._hotUpdate=function(i){r.apply(this,arguments),Ui(e,Object.keys(i._hmrPayload.actions),!!e._isOptionsAPI)},kf(t,e)}function Lf(){const t=ls(!0),e=t.run(()=>os({}));let n=[];const r=mo({install(i){},use(i){return!this._a&&!uf||n.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return oa&&typeof Proxy<"u"&&r.use(jf),r}const Df=function(t){t.mixin({beforeCreate(){const e=this.$options;if(e.pinia){const n=e.pinia;if(!this._provided){const r={};Object.defineProperty(this,"_provided",{get:()=>r,set:i=>Object.assign(r,i)})}this._provided[mf]=n,this.$pinia||(this.$pinia=n),n._a=this,oa&&Rf(n._a,n)}else!this.$pinia&&e.parent&&e.parent.$pinia&&(this.$pinia=e.parent.$pinia)},destroyed(){delete this._pStores}})},Nf="/assets/logo.da9b9095.svg";function ha(t,e,n,r,i,o,a,s){var c=typeof t=="function"?t.options:t;e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),o&&(c._scopeId="data-v-"+o);var u;if(a?(u=function(v){v=v||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!v&&typeof __VUE_SSR_CONTEXT__<"u"&&(v=__VUE_SSR_CONTEXT__),i&&i.call(this,v),v&&v._registeredComponents&&v._registeredComponents.add(a)},c._ssrRegister=u):i&&(u=s?function(){i.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:i),u)if(c.functional){c._injectStyles=u;var f=c.render;c.render=function(m,y){return u.call(y),f(m,y)}}else{var h=c.beforeCreate;c.beforeCreate=h?[].concat(h,u):[u]}return{exports:t,options:c}}const Mf={};var Ff=function(){var e=this,n=e._self._c;return n("div",{attrs:{id:"app"}},[n("header",{staticClass:"site-header"},[e._m(0),n("nav",[n("router-link",{attrs:{to:"/"}},[e._v("Blog")]),n("router-link",{attrs:{to:"/agent-portal"}},[e._v("Agent Portal")]),n("router-link",{attrs:{to:"/codex"}},[e._v("Codex")]),n("router-link",{attrs:{to:"/about"}},[e._v("About")])],1)]),n("router-view")],1)},Uf=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"brand"},[e("img",{staticClass:"logo",attrs:{alt:"Vue logo",src:Nf,width:"36",height:"36"}}),e("div",[e("p",{staticClass:"site-name"},[t._v("adminfoo Labs")]),e("p",{staticClass:"site-subtitle"},[t._v("Cinematic Agent Playground")])])])}],Hf=ha(Mf,Ff,Uf,!1,null,"82af236a",null,null);const Bf=Hf.exports,zf="modulepreload",Wf=function(t){return"/"+t},Hi={},Ne=function(e,n,r){if(!n||n.length===0)return e();const i=document.getElementsByTagName("link");return Promise.all(n.map(o=>{if(o=Wf(o),o in Hi)return;Hi[o]=!0;const a=o.endsWith(".css"),s=a?'[rel="stylesheet"]':"";if(!!r)for(let f=i.length-1;f>=0;f--){const h=i[f];if(h.href===o&&(!a||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${s}`))return;const u=document.createElement("link");if(u.rel=a?"stylesheet":zf,a||(u.as="script",u.crossOrigin=""),u.href=o,document.head.appendChild(u),a)return new Promise((f,h)=>{u.addEventListener("load",f),u.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>e())};/*!
  * vue-router v3.6.5
  * (c) 2022 Evan You
  * @license MIT
  */function st(t,e){for(var n in e)t[n]=e[n];return t}var qf=/[!'()*]/g,Gf=function(t){return"%"+t.charCodeAt(0).toString(16)},Jf=/%2C/g,Zt=function(t){return encodeURIComponent(t).replace(qf,Gf).replace(Jf,",")};function ir(t){try{return decodeURIComponent(t)}catch(e){}return t}function Kf(t,e,n){e===void 0&&(e={});var r=n||Yf,i;try{i=r(t||"")}catch(s){i={}}for(var o in e){var a=e[o];i[o]=Array.isArray(a)?a.map(Bi):Bi(a)}return i}var Bi=function(t){return t==null||typeof t=="object"?t:String(t)};function Yf(t){var e={};return t=t.trim().replace(/^(\?|#|&)/,""),t&&t.split("&").forEach(function(n){var r=n.replace(/\+/g," ").split("="),i=ir(r.shift()),o=r.length>0?ir(r.join("=")):null;e[i]===void 0?e[i]=o:Array.isArray(e[i])?e[i].push(o):e[i]=[e[i],o]}),e}function Xf(t){var e=t?Object.keys(t).map(function(n){var r=t[n];if(r===void 0)return"";if(r===null)return Zt(n);if(Array.isArray(r)){var i=[];return r.forEach(function(o){o!==void 0&&(o===null?i.push(Zt(n)):i.push(Zt(n)+"="+Zt(o)))}),i.join("&")}return Zt(n)+"="+Zt(r)}).filter(function(n){return n.length>0}).join("&"):null;return e?"?"+e:""}var ln=/\/?$/;function pn(t,e,n,r){var i=r&&r.options.stringifyQuery,o=e.query||{};try{o=or(o)}catch(s){}var a={name:e.name||t&&t.name,meta:t&&t.meta||{},path:e.path||"/",hash:e.hash||"",query:o,params:e.params||{},fullPath:zi(e,i),matched:t?Qf(t):[]};return n&&(a.redirectedFrom=zi(n,i)),Object.freeze(a)}function or(t){if(Array.isArray(t))return t.map(or);if(t&&typeof t=="object"){var e={};for(var n in t)e[n]=or(t[n]);return e}else return t}var jt=pn(null,{path:"/"});function Qf(t){for(var e=[];t;)e.unshift(t),t=t.parent;return e}function zi(t,e){var n=t.path,r=t.query;r===void 0&&(r={});var i=t.hash;i===void 0&&(i="");var o=e||Xf;return(n||"/")+o(r)+i}function va(t,e,n){return e===jt?t===e:e?t.path&&e.path?t.path.replace(ln,"")===e.path.replace(ln,"")&&(n||t.hash===e.hash&&Je(t.query,e.query)):t.name&&e.name?t.name===e.name&&(n||t.hash===e.hash&&Je(t.query,e.query)&&Je(t.params,e.params)):!1:!1}function Je(t,e){if(t===void 0&&(t={}),e===void 0&&(e={}),!t||!e)return t===e;var n=Object.keys(t).sort(),r=Object.keys(e).sort();return n.length!==r.length?!1:n.every(function(i,o){var a=t[i],s=r[o];if(s!==i)return!1;var c=e[i];return a==null||c==null?a===c:typeof a=="object"&&typeof c=="object"?Je(a,c):String(a)===String(c)})}function Zf(t,e){return t.path.replace(ln,"/").indexOf(e.path.replace(ln,"/"))===0&&(!e.hash||t.hash===e.hash)&&Vf(t.query,e.query)}function Vf(t,e){for(var n in e)if(!(n in t))return!1;return!0}function ga(t){for(var e=0;e<t.matched.length;e++){var n=t.matched[e];for(var r in n.instances){var i=n.instances[r],o=n.enteredCbs[r];if(!(!i||!o)){delete n.enteredCbs[r];for(var a=0;a<o.length;a++)i._isBeingDestroyed||o[a](i)}}}}var tl={name:"RouterView",functional:!0,props:{name:{type:String,default:"default"}},render:function(e,n){var r=n.props,i=n.children,o=n.parent,a=n.data;a.routerView=!0;for(var s=o.$createElement,c=r.name,u=o.$route,f=o._routerViewCache||(o._routerViewCache={}),h=0,v=!1;o&&o._routerRoot!==o;){var m=o.$vnode?o.$vnode.data:{};m.routerView&&h++,m.keepAlive&&o._directInactive&&o._inactive&&(v=!0),o=o.$parent}if(a.routerViewDepth=h,v){var y=f[c],_=y&&y.component;return _?(y.configProps&&Wi(_,a,y.route,y.configProps),s(_,a,i)):s()}var b=u.matched[h],S=b&&b.components[c];if(!b||!S)return f[c]=null,s();f[c]={component:S},a.registerRouteInstance=function(A,P){var L=b.instances[c];(P&&L!==A||!P&&L===A)&&(b.instances[c]=P)},(a.hook||(a.hook={})).prepatch=function(A,P){b.instances[c]=P.componentInstance},a.hook.init=function(A){A.data.keepAlive&&A.componentInstance&&A.componentInstance!==b.instances[c]&&(b.instances[c]=A.componentInstance),ga(u)};var x=b.props&&b.props[c];return x&&(st(f[c],{route:u,configProps:x}),Wi(S,a,u,x)),s(S,a,i)}};function Wi(t,e,n,r){var i=e.props=el(n,r);if(i){i=e.props=st({},i);var o=e.attrs=e.attrs||{};for(var a in i)(!t.props||!(a in t.props))&&(o[a]=i[a],delete i[a])}}function el(t,e){switch(typeof e){case"undefined":return;case"object":return e;case"function":return e(t);case"boolean":return e?t.params:void 0}}function ma(t,e,n){var r=t.charAt(0);if(r==="/")return t;if(r==="?"||r==="#")return e+t;var i=e.split("/");(!n||!i[i.length-1])&&i.pop();for(var o=t.replace(/^\//,"").split("/"),a=0;a<o.length;a++){var s=o[a];s===".."?i.pop():s!=="."&&i.push(s)}return i[0]!==""&&i.unshift(""),i.join("/")}function nl(t){var e="",n="",r=t.indexOf("#");r>=0&&(e=t.slice(r),t=t.slice(0,r));var i=t.indexOf("?");return i>=0&&(n=t.slice(i+1),t=t.slice(0,i)),{path:t,query:n,hash:e}}function $t(t){return t.replace(/\/(?:\s*\/)+/g,"/")}var dn=Array.isArray||function(t){return Object.prototype.toString.call(t)=="[object Array]"},le=_a,rl=kr,il=cl,ol=ba,al=ya,sl=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function kr(t,e){for(var n=[],r=0,i=0,o="",a=e&&e.delimiter||"/",s;(s=sl.exec(t))!=null;){var c=s[0],u=s[1],f=s.index;if(o+=t.slice(i,f),i=f+c.length,u){o+=u[1];continue}var h=t[i],v=s[2],m=s[3],y=s[4],_=s[5],b=s[6],S=s[7];o&&(n.push(o),o="");var x=v!=null&&h!=null&&h!==v,A=b==="+"||b==="*",P=b==="?"||b==="*",L=s[2]||a,F=y||_;n.push({name:m||r++,prefix:v||"",delimiter:L,optional:P,repeat:A,partial:x,asterisk:!!S,pattern:F?ll(F):S?".*":"[^"+Ke(L)+"]+?"})}return i<t.length&&(o+=t.substr(i)),o&&n.push(o),n}function cl(t,e){return ba(kr(t,e),e)}function ul(t){return encodeURI(t).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function fl(t){return encodeURI(t).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function ba(t,e){for(var n=new Array(t.length),r=0;r<t.length;r++)typeof t[r]=="object"&&(n[r]=new RegExp("^(?:"+t[r].pattern+")$",Lr(e)));return function(i,o){for(var a="",s=i||{},c=o||{},u=c.pretty?ul:encodeURIComponent,f=0;f<t.length;f++){var h=t[f];if(typeof h=="string"){a+=h;continue}var v=s[h.name],m;if(v==null)if(h.optional){h.partial&&(a+=h.prefix);continue}else throw new TypeError('Expected "'+h.name+'" to be defined');if(dn(v)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(v)+"`");if(v.length===0){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var y=0;y<v.length;y++){if(m=u(v[y]),!n[f].test(m))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(m)+"`");a+=(y===0?h.prefix:h.delimiter)+m}continue}if(m=h.asterisk?fl(v):u(v),!n[f].test(m))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+m+'"');a+=h.prefix+m}return a}}function Ke(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function ll(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function jr(t,e){return t.keys=e,t}function Lr(t){return t&&t.sensitive?"":"i"}function pl(t,e){var n=t.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)e.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return jr(t,e)}function dl(t,e,n){for(var r=[],i=0;i<t.length;i++)r.push(_a(t[i],e,n).source);var o=new RegExp("(?:"+r.join("|")+")",Lr(n));return jr(o,e)}function hl(t,e,n){return ya(kr(t,n),e,n)}function ya(t,e,n){dn(e)||(n=e||n,e=[]),n=n||{};for(var r=n.strict,i=n.end!==!1,o="",a=0;a<t.length;a++){var s=t[a];if(typeof s=="string")o+=Ke(s);else{var c=Ke(s.prefix),u="(?:"+s.pattern+")";e.push(s),s.repeat&&(u+="(?:"+c+u+")*"),s.optional?s.partial?u=c+"("+u+")?":u="(?:"+c+"("+u+"))?":u=c+"("+u+")",o+=u}}var f=Ke(n.delimiter||"/"),h=o.slice(-f.length)===f;return r||(o=(h?o.slice(0,-f.length):o)+"(?:"+f+"(?=$))?"),i?o+="$":o+=r&&h?"":"(?="+f+"|$)",jr(new RegExp("^"+o,Lr(n)),e)}function _a(t,e,n){return dn(e)||(n=e||n,e=[]),n=n||{},t instanceof RegExp?pl(t,e):dn(t)?dl(t,e,n):hl(t,e,n)}le.parse=rl;le.compile=il;le.tokensToFunction=ol;le.tokensToRegExp=al;var qi=Object.create(null);function Ye(t,e,n){e=e||{};try{var r=qi[t]||(qi[t]=le.compile(t));return typeof e.pathMatch=="string"&&(e[0]=e.pathMatch),r(e,{pretty:!0})}catch(i){return""}finally{delete e[0]}}function Dr(t,e,n,r){var i=typeof t=="string"?{path:t}:t;if(i._normalized)return i;if(i.name){i=st({},t);var o=i.params;return o&&typeof o=="object"&&(i.params=st({},o)),i}if(!i.path&&i.params&&e){i=st({},i),i._normalized=!0;var a=st(st({},e.params),i.params);if(e.name)i.name=e.name,i.params=a;else if(e.matched.length){var s=e.matched[e.matched.length-1].path;i.path=Ye(s,a,"path "+e.path)}return i}var c=nl(i.path||""),u=e&&e.path||"/",f=c.path?ma(c.path,u,n||i.append):u,h=Kf(c.query,i.query,r&&r.options.parseQuery),v=i.hash||c.hash;return v&&v.charAt(0)!=="#"&&(v="#"+v),{_normalized:!0,path:f,query:h,hash:v}}var vl=[String,Object],gl=[String,Array],Gi=function(){},ml={name:"RouterLink",props:{to:{type:vl,required:!0},tag:{type:String,default:"a"},custom:Boolean,exact:Boolean,exactPath:Boolean,append:Boolean,replace:Boolean,activeClass:String,exactActiveClass:String,ariaCurrentValue:{type:String,default:"page"},event:{type:gl,default:"click"}},render:function(e){var n=this,r=this.$router,i=this.$route,o=r.resolve(this.to,i,this.append),a=o.location,s=o.route,c=o.href,u={},f=r.options.linkActiveClass,h=r.options.linkExactActiveClass,v=f==null?"router-link-active":f,m=h==null?"router-link-exact-active":h,y=this.activeClass==null?v:this.activeClass,_=this.exactActiveClass==null?m:this.exactActiveClass,b=s.redirectedFrom?pn(null,Dr(s.redirectedFrom),null,r):s;u[_]=va(i,b,this.exactPath),u[y]=this.exact||this.exactPath?u[_]:Zf(i,b);var S=u[_]?this.ariaCurrentValue:null,x=function(p){Ji(p)&&(n.replace?r.replace(a,Gi):r.push(a,Gi))},A={click:Ji};Array.isArray(this.event)?this.event.forEach(function(p){A[p]=x}):A[this.event]=x;var P={class:u},L=!this.$scopedSlots.$hasNormal&&this.$scopedSlots.default&&this.$scopedSlots.default({href:c,route:s,navigate:x,isActive:u[y],isExactActive:u[_]});if(L){if(L.length===1)return L[0];if(L.length>1||!L.length)return L.length===0?e():e("span",{},L)}if(this.tag==="a")P.on=A,P.attrs={href:c,"aria-current":S};else{var F=wa(this.$slots.default);if(F){F.isStatic=!1;var U=F.data=st({},F.data);U.on=U.on||{};for(var W in U.on){var pt=U.on[W];W in A&&(U.on[W]=Array.isArray(pt)?pt:[pt])}for(var dt in A)dt in U.on?U.on[dt].push(A[dt]):U.on[dt]=x;var ht=F.data.attrs=st({},F.data.attrs);ht.href=c,ht["aria-current"]=S}else P.on=A}return e(this.tag,P,this.$slots.default)}};function Ji(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){var e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function wa(t){if(t){for(var e,n=0;n<t.length;n++)if(e=t[n],e.tag==="a"||e.children&&(e=wa(e.children)))return e}}var hn;function ar(t){if(!(ar.installed&&hn===t)){ar.installed=!0,hn=t;var e=function(i){return i!==void 0},n=function(i,o){var a=i.$options._parentVnode;e(a)&&e(a=a.data)&&e(a=a.registerRouteInstance)&&a(i,o)};t.mixin({beforeCreate:function(){e(this.$options.router)?(this._routerRoot=this,this._router=this.$options.router,this._router.init(this),t.util.defineReactive(this,"_route",this._router.history.current)):this._routerRoot=this.$parent&&this.$parent._routerRoot||this,n(this,this)},destroyed:function(){n(this)}}),Object.defineProperty(t.prototype,"$router",{get:function(){return this._routerRoot._router}}),Object.defineProperty(t.prototype,"$route",{get:function(){return this._routerRoot._route}}),t.component("RouterView",tl),t.component("RouterLink",ml);var r=t.config.optionMergeStrategies;r.beforeRouteEnter=r.beforeRouteLeave=r.beforeRouteUpdate=r.created}}var Ae=typeof window<"u";function Me(t,e,n,r,i){var o=e||[],a=n||Object.create(null),s=r||Object.create(null);t.forEach(function(f){sr(o,a,s,f,i)});for(var c=0,u=o.length;c<u;c++)o[c]==="*"&&(o.push(o.splice(c,1)[0]),u--,c--);return{pathList:o,pathMap:a,nameMap:s}}function sr(t,e,n,r,i,o){var a=r.path,s=r.name,c=r.pathToRegexpOptions||{},u=yl(a,i,c.strict);typeof r.caseSensitive=="boolean"&&(c.sensitive=r.caseSensitive);var f={path:u,regex:bl(u,c),components:r.components||{default:r.component},alias:r.alias?typeof r.alias=="string"?[r.alias]:r.alias:[],instances:{},enteredCbs:{},name:s,parent:i,matchAs:o,redirect:r.redirect,beforeEnter:r.beforeEnter,meta:r.meta||{},props:r.props==null?{}:r.components?r.props:{default:r.props}};if(r.children&&r.children.forEach(function(_){var b=o?$t(o+"/"+_.path):void 0;sr(t,e,n,_,f,b)}),e[f.path]||(t.push(f.path),e[f.path]=f),r.alias!==void 0)for(var h=Array.isArray(r.alias)?r.alias:[r.alias],v=0;v<h.length;++v){var m=h[v],y={path:m,children:r.children};sr(t,e,n,y,i,f.path||"/")}s&&(n[s]||(n[s]=f))}function bl(t,e){var n=le(t,[],e);return n}function yl(t,e,n){return n||(t=t.replace(/\/$/,"")),t[0]==="/"||e==null?t:$t(e.path+"/"+t)}function _l(t,e){var n=Me(t),r=n.pathList,i=n.pathMap,o=n.nameMap;function a(m){Me(m,r,i,o)}function s(m,y){var _=typeof m!="object"?o[m]:void 0;Me([y||m],r,i,o,_),_&&_.alias.length&&Me(_.alias.map(function(b){return{path:b,children:[y]}}),r,i,o,_)}function c(){return r.map(function(m){return i[m]})}function u(m,y,_){var b=Dr(m,y,!1,e),S=b.name;if(S){var x=o[S];if(!x)return v(null,b);var A=x.regex.keys.filter(function(W){return!W.optional}).map(function(W){return W.name});if(typeof b.params!="object"&&(b.params={}),y&&typeof y.params=="object")for(var P in y.params)!(P in b.params)&&A.indexOf(P)>-1&&(b.params[P]=y.params[P]);return b.path=Ye(x.path,b.params),v(x,b,_)}else if(b.path){b.params={};for(var L=0;L<r.length;L++){var F=r[L],U=i[F];if(wl(U.regex,b.path,b.params))return v(U,b,_)}}return v(null,b)}function f(m,y){var _=m.redirect,b=typeof _=="function"?_(pn(m,y,null,e)):_;if(typeof b=="string"&&(b={path:b}),!b||typeof b!="object")return v(null,y);var S=b,x=S.name,A=S.path,P=y.query,L=y.hash,F=y.params;if(P=S.hasOwnProperty("query")?S.query:P,L=S.hasOwnProperty("hash")?S.hash:L,F=S.hasOwnProperty("params")?S.params:F,x)return o[x],u({_normalized:!0,name:x,query:P,hash:L,params:F},void 0,y);if(A){var U=Sl(A,m),W=Ye(U,F);return u({_normalized:!0,path:W,query:P,hash:L},void 0,y)}else return v(null,y)}function h(m,y,_){var b=Ye(_,y.params),S=u({_normalized:!0,path:b});if(S){var x=S.matched,A=x[x.length-1];return y.params=S.params,v(A,y)}return v(null,y)}function v(m,y,_){return m&&m.redirect?f(m,_||y):m&&m.matchAs?h(m,y,m.matchAs):pn(m,y,_,e)}return{match:u,addRoute:s,getRoutes:c,addRoutes:a}}function wl(t,e,n){var r=e.match(t);if(r){if(!n)return!0}else return!1;for(var i=1,o=r.length;i<o;++i){var a=t.keys[i-1];a&&(n[a.name||"pathMatch"]=typeof r[i]=="string"?ir(r[i]):r[i])}return!0}function Sl(t,e){return ma(t,e.parent?e.parent.path:"/",!0)}var xl=Ae&&window.performance&&window.performance.now?window.performance:Date;function Sa(){return xl.now().toFixed(3)}var xa=Sa();function wn(){return xa}function Ca(t){return xa=t}var Oa=Object.create(null);function $a(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");var t=window.location.protocol+"//"+window.location.host,e=window.location.href.replace(t,""),n=st({},window.history.state);return n.key=wn(),window.history.replaceState(n,"",e),window.addEventListener("popstate",Ki),function(){window.removeEventListener("popstate",Ki)}}function Et(t,e,n,r){if(!!t.app){var i=t.options.scrollBehavior;!i||t.app.$nextTick(function(){var o=Cl(),a=i.call(t,e,n,r?o:null);!a||(typeof a.then=="function"?a.then(function(s){Qi(s,o)}).catch(function(s){}):Qi(a,o))})}}function Ea(){var t=wn();t&&(Oa[t]={x:window.pageXOffset,y:window.pageYOffset})}function Ki(t){Ea(),t.state&&t.state.key&&Ca(t.state.key)}function Cl(){var t=wn();if(t)return Oa[t]}function Ol(t,e){var n=document.documentElement,r=n.getBoundingClientRect(),i=t.getBoundingClientRect();return{x:i.left-r.left-e.x,y:i.top-r.top-e.y}}function Yi(t){return ae(t.x)||ae(t.y)}function Xi(t){return{x:ae(t.x)?t.x:window.pageXOffset,y:ae(t.y)?t.y:window.pageYOffset}}function $l(t){return{x:ae(t.x)?t.x:0,y:ae(t.y)?t.y:0}}function ae(t){return typeof t=="number"}var El=/^#\d/;function Qi(t,e){var n=typeof t=="object";if(n&&typeof t.selector=="string"){var r=El.test(t.selector)?document.getElementById(t.selector.slice(1)):document.querySelector(t.selector);if(r){var i=t.offset&&typeof t.offset=="object"?t.offset:{};i=$l(i),e=Ol(r,i)}else Yi(t)&&(e=Xi(t))}else n&&Yi(t)&&(e=Xi(t));e&&("scrollBehavior"in document.documentElement.style?window.scrollTo({left:e.x,top:e.y,behavior:t.behavior}):window.scrollTo(e.x,e.y))}var At=Ae&&function(){var t=window.navigator.userAgent;return(t.indexOf("Android 2.")!==-1||t.indexOf("Android 4.0")!==-1)&&t.indexOf("Mobile Safari")!==-1&&t.indexOf("Chrome")===-1&&t.indexOf("Windows Phone")===-1?!1:window.history&&typeof window.history.pushState=="function"}();function vn(t,e){Ea();var n=window.history;try{if(e){var r=st({},n.state);r.key=wn(),n.replaceState(r,"",t)}else n.pushState({key:Ca(Sa())},"",t)}catch(i){window.location[e?"replace":"assign"](t)}}function cr(t){vn(t,!0)}var Yt={redirected:2,aborted:4,cancelled:8,duplicated:16};function Al(t,e){return Sn(t,e,Yt.redirected,'Redirected when going from "'+t.fullPath+'" to "'+Rl(e)+'" via a navigation guard.')}function Tl(t,e){var n=Sn(t,e,Yt.duplicated,'Avoided redundant navigation to current location: "'+t.fullPath+'".');return n.name="NavigationDuplicated",n}function Zi(t,e){return Sn(t,e,Yt.cancelled,'Navigation cancelled from "'+t.fullPath+'" to "'+e.fullPath+'" with a new navigation.')}function Pl(t,e){return Sn(t,e,Yt.aborted,'Navigation aborted from "'+t.fullPath+'" to "'+e.fullPath+'" via a navigation guard.')}function Sn(t,e,n,r){var i=new Error(r);return i._isRouter=!0,i.from=t,i.to=e,i.type=n,i}var Il=["params","query","hash"];function Rl(t){if(typeof t=="string")return t;if("path"in t)return t.path;var e={};return Il.forEach(function(n){n in t&&(e[n]=t[n])}),JSON.stringify(e,null,2)}function gn(t){return Object.prototype.toString.call(t).indexOf("Error")>-1}function xn(t,e){return gn(t)&&t._isRouter&&(e==null||t.type===e)}function Vi(t,e,n){var r=function(i){i>=t.length?n():t[i]?e(t[i],function(){r(i+1)}):r(i+1)};r(0)}function kl(t){return function(e,n,r){var i=!1,o=0,a=null;Aa(t,function(s,c,u,f){if(typeof s=="function"&&s.cid===void 0){i=!0,o++;var h=to(function(_){Ll(_)&&(_=_.default),s.resolved=typeof _=="function"?_:hn.extend(_),u.components[f]=_,o--,o<=0&&r()}),v=to(function(_){var b="Failed to resolve async component "+f+": "+_;a||(a=gn(_)?_:new Error(b),r(a))}),m;try{m=s(h,v)}catch(_){v(_)}if(m)if(typeof m.then=="function")m.then(h,v);else{var y=m.component;y&&typeof y.then=="function"&&y.then(h,v)}}}),i||r()}}function Aa(t,e){return Ta(t.map(function(n){return Object.keys(n.components).map(function(r){return e(n.components[r],n.instances[r],n,r)})}))}function Ta(t){return Array.prototype.concat.apply([],t)}var jl=typeof Symbol=="function"&&typeof Symbol.toStringTag=="symbol";function Ll(t){return t.__esModule||jl&&t[Symbol.toStringTag]==="Module"}function to(t){var e=!1;return function(){for(var n=[],r=arguments.length;r--;)n[r]=arguments[r];if(!e)return e=!0,t.apply(this,n)}}var ft=function(e,n){this.router=e,this.base=Dl(n),this.current=jt,this.pending=null,this.ready=!1,this.readyCbs=[],this.readyErrorCbs=[],this.errorCbs=[],this.listeners=[]};ft.prototype.listen=function(e){this.cb=e};ft.prototype.onReady=function(e,n){this.ready?e():(this.readyCbs.push(e),n&&this.readyErrorCbs.push(n))};ft.prototype.onError=function(e){this.errorCbs.push(e)};ft.prototype.transitionTo=function(e,n,r){var i=this,o;try{o=this.router.match(e,this.current)}catch(s){throw this.errorCbs.forEach(function(c){c(s)}),s}var a=this.current;this.confirmTransition(o,function(){i.updateRoute(o),n&&n(o),i.ensureURL(),i.router.afterHooks.forEach(function(s){s&&s(o,a)}),i.ready||(i.ready=!0,i.readyCbs.forEach(function(s){s(o)}))},function(s){r&&r(s),s&&!i.ready&&(!xn(s,Yt.redirected)||a!==jt)&&(i.ready=!0,i.readyErrorCbs.forEach(function(c){c(s)}))})};ft.prototype.confirmTransition=function(e,n,r){var i=this,o=this.current;this.pending=e;var a=function(_){!xn(_)&&gn(_)&&(i.errorCbs.length?i.errorCbs.forEach(function(b){b(_)}):console.error(_)),r&&r(_)},s=e.matched.length-1,c=o.matched.length-1;if(va(e,o)&&s===c&&e.matched[s]===o.matched[c])return this.ensureURL(),e.hash&&Et(this.router,o,e,!1),a(Tl(o,e));var u=Nl(this.current.matched,e.matched),f=u.updated,h=u.deactivated,v=u.activated,m=[].concat(Fl(h),this.router.beforeHooks,Ul(f),v.map(function(_){return _.beforeEnter}),kl(v)),y=function(_,b){if(i.pending!==e)return a(Zi(o,e));try{_(e,o,function(S){S===!1?(i.ensureURL(!0),a(Pl(o,e))):gn(S)?(i.ensureURL(!0),a(S)):typeof S=="string"||typeof S=="object"&&(typeof S.path=="string"||typeof S.name=="string")?(a(Al(o,e)),typeof S=="object"&&S.replace?i.replace(S):i.push(S)):b(S)})}catch(S){a(S)}};Vi(m,y,function(){var _=Hl(v),b=_.concat(i.router.resolveHooks);Vi(b,y,function(){if(i.pending!==e)return a(Zi(o,e));i.pending=null,n(e),i.router.app&&i.router.app.$nextTick(function(){ga(e)})})})};ft.prototype.updateRoute=function(e){this.current=e,this.cb&&this.cb(e)};ft.prototype.setupListeners=function(){};ft.prototype.teardown=function(){this.listeners.forEach(function(e){e()}),this.listeners=[],this.current=jt,this.pending=null};function Dl(t){if(!t)if(Ae){var e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^https?:\/\/[^\/]+/,"")}else t="/";return t.charAt(0)!=="/"&&(t="/"+t),t.replace(/\/$/,"")}function Nl(t,e){var n,r=Math.max(t.length,e.length);for(n=0;n<r&&t[n]===e[n];n++);return{updated:e.slice(0,n),activated:e.slice(n),deactivated:t.slice(n)}}function Nr(t,e,n,r){var i=Aa(t,function(o,a,s,c){var u=Ml(o,e);if(u)return Array.isArray(u)?u.map(function(f){return n(f,a,s,c)}):n(u,a,s,c)});return Ta(r?i.reverse():i)}function Ml(t,e){return typeof t!="function"&&(t=hn.extend(t)),t.options[e]}function Fl(t){return Nr(t,"beforeRouteLeave",Pa,!0)}function Ul(t){return Nr(t,"beforeRouteUpdate",Pa)}function Pa(t,e){if(e)return function(){return t.apply(e,arguments)}}function Hl(t){return Nr(t,"beforeRouteEnter",function(e,n,r,i){return Bl(e,r,i)})}function Bl(t,e,n){return function(i,o,a){return t(i,o,function(s){typeof s=="function"&&(e.enteredCbs[n]||(e.enteredCbs[n]=[]),e.enteredCbs[n].push(s)),a(s)})}}var Ia=function(t){function e(n,r){t.call(this,n,r),this._startLocation=ge(this.base)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var r=this;if(!(this.listeners.length>0)){var i=this.router,o=i.options.scrollBehavior,a=At&&o;a&&this.listeners.push($a());var s=function(){var c=r.current,u=ge(r.base);r.current===jt&&u===r._startLocation||r.transitionTo(u,function(f){a&&Et(i,f,c,!0)})};window.addEventListener("popstate",s),this.listeners.push(function(){window.removeEventListener("popstate",s)})}},e.prototype.go=function(r){window.history.go(r)},e.prototype.push=function(r,i,o){var a=this,s=this,c=s.current;this.transitionTo(r,function(u){vn($t(a.base+u.fullPath)),Et(a.router,u,c,!1),i&&i(u)},o)},e.prototype.replace=function(r,i,o){var a=this,s=this,c=s.current;this.transitionTo(r,function(u){cr($t(a.base+u.fullPath)),Et(a.router,u,c,!1),i&&i(u)},o)},e.prototype.ensureURL=function(r){if(ge(this.base)!==this.current.fullPath){var i=$t(this.base+this.current.fullPath);r?vn(i):cr(i)}},e.prototype.getCurrentLocation=function(){return ge(this.base)},e}(ft);function ge(t){var e=window.location.pathname,n=e.toLowerCase(),r=t.toLowerCase();return t&&(n===r||n.indexOf($t(r+"/"))===0)&&(e=e.slice(t.length)),(e||"/")+window.location.search+window.location.hash}var Ra=function(t){function e(n,r,i){t.call(this,n,r),!(i&&zl(this.base))&&eo()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var r=this;if(!(this.listeners.length>0)){var i=this.router,o=i.options.scrollBehavior,a=At&&o;a&&this.listeners.push($a());var s=function(){var u=r.current;!eo()||r.transitionTo(Xe(),function(f){a&&Et(r.router,f,u,!0),At||Qe(f.fullPath)})},c=At?"popstate":"hashchange";window.addEventListener(c,s),this.listeners.push(function(){window.removeEventListener(c,s)})}},e.prototype.push=function(r,i,o){var a=this,s=this,c=s.current;this.transitionTo(r,function(u){no(u.fullPath),Et(a.router,u,c,!1),i&&i(u)},o)},e.prototype.replace=function(r,i,o){var a=this,s=this,c=s.current;this.transitionTo(r,function(u){Qe(u.fullPath),Et(a.router,u,c,!1),i&&i(u)},o)},e.prototype.go=function(r){window.history.go(r)},e.prototype.ensureURL=function(r){var i=this.current.fullPath;Xe()!==i&&(r?no(i):Qe(i))},e.prototype.getCurrentLocation=function(){return Xe()},e}(ft);function zl(t){var e=ge(t);if(!/^\/#/.test(e))return window.location.replace($t(t+"/#"+e)),!0}function eo(){var t=Xe();return t.charAt(0)==="/"?!0:(Qe("/"+t),!1)}function Xe(){var t=window.location.href,e=t.indexOf("#");return e<0?"":(t=t.slice(e+1),t)}function ur(t){var e=window.location.href,n=e.indexOf("#"),r=n>=0?e.slice(0,n):e;return r+"#"+t}function no(t){At?vn(ur(t)):window.location.hash=t}function Qe(t){At?cr(ur(t)):window.location.replace(ur(t))}var Wl=function(t){function e(n,r){t.call(this,n,r),this.stack=[],this.index=-1}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.push=function(r,i,o){var a=this;this.transitionTo(r,function(s){a.stack=a.stack.slice(0,a.index+1).concat(s),a.index++,i&&i(s)},o)},e.prototype.replace=function(r,i,o){var a=this;this.transitionTo(r,function(s){a.stack=a.stack.slice(0,a.index).concat(s),i&&i(s)},o)},e.prototype.go=function(r){var i=this,o=this.index+r;if(!(o<0||o>=this.stack.length)){var a=this.stack[o];this.confirmTransition(a,function(){var s=i.current;i.index=o,i.updateRoute(a),i.router.afterHooks.forEach(function(c){c&&c(a,s)})},function(s){xn(s,Yt.duplicated)&&(i.index=o)})}},e.prototype.getCurrentLocation=function(){var r=this.stack[this.stack.length-1];return r?r.fullPath:"/"},e.prototype.ensureURL=function(){},e}(ft),M=function(e){e===void 0&&(e={}),this.app=null,this.apps=[],this.options=e,this.beforeHooks=[],this.resolveHooks=[],this.afterHooks=[],this.matcher=_l(e.routes||[],this);var n=e.mode||"hash";switch(this.fallback=n==="history"&&!At&&e.fallback!==!1,this.fallback&&(n="hash"),Ae||(n="abstract"),this.mode=n,n){case"history":this.history=new Ia(this,e.base);break;case"hash":this.history=new Ra(this,e.base,this.fallback);break;case"abstract":this.history=new Wl(this,e.base);break}},ka={currentRoute:{configurable:!0}};M.prototype.match=function(e,n,r){return this.matcher.match(e,n,r)};ka.currentRoute.get=function(){return this.history&&this.history.current};M.prototype.init=function(e){var n=this;if(this.apps.push(e),e.$once("hook:destroyed",function(){var a=n.apps.indexOf(e);a>-1&&n.apps.splice(a,1),n.app===e&&(n.app=n.apps[0]||null),n.app||n.history.teardown()}),!this.app){this.app=e;var r=this.history;if(r instanceof Ia||r instanceof Ra){var i=function(a){var s=r.current,c=n.options.scrollBehavior,u=At&&c;u&&"fullPath"in a&&Et(n,a,s,!1)},o=function(a){r.setupListeners(),i(a)};r.transitionTo(r.getCurrentLocation(),o,o)}r.listen(function(a){n.apps.forEach(function(s){s._route=a})})}};M.prototype.beforeEach=function(e){return Mr(this.beforeHooks,e)};M.prototype.beforeResolve=function(e){return Mr(this.resolveHooks,e)};M.prototype.afterEach=function(e){return Mr(this.afterHooks,e)};M.prototype.onReady=function(e,n){this.history.onReady(e,n)};M.prototype.onError=function(e){this.history.onError(e)};M.prototype.push=function(e,n,r){var i=this;if(!n&&!r&&typeof Promise<"u")return new Promise(function(o,a){i.history.push(e,o,a)});this.history.push(e,n,r)};M.prototype.replace=function(e,n,r){var i=this;if(!n&&!r&&typeof Promise<"u")return new Promise(function(o,a){i.history.replace(e,o,a)});this.history.replace(e,n,r)};M.prototype.go=function(e){this.history.go(e)};M.prototype.back=function(){this.go(-1)};M.prototype.forward=function(){this.go(1)};M.prototype.getMatchedComponents=function(e){var n=e?e.matched?e:this.resolve(e).route:this.currentRoute;return n?[].concat.apply([],n.matched.map(function(r){return Object.keys(r.components).map(function(i){return r.components[i]})})):[]};M.prototype.resolve=function(e,n,r){n=n||this.history.current;var i=Dr(e,n,r,this),o=this.match(i,n),a=o.redirectedFrom||o.fullPath,s=this.history.base,c=ql(s,a,this.mode);return{location:i,route:o,href:c,normalizedTo:i,resolved:o}};M.prototype.getRoutes=function(){return this.matcher.getRoutes()};M.prototype.addRoute=function(e,n){this.matcher.addRoute(e,n),this.history.current!==jt&&this.history.transitionTo(this.history.getCurrentLocation())};M.prototype.addRoutes=function(e){this.matcher.addRoutes(e),this.history.current!==jt&&this.history.transitionTo(this.history.getCurrentLocation())};Object.defineProperties(M.prototype,ka);var ja=M;function Mr(t,e){return t.push(e),function(){var n=t.indexOf(e);n>-1&&t.splice(n,1)}}function ql(t,e,n){var r=n==="hash"?"#"+e:e;return t?$t(t+"/"+r):r}M.install=ar;M.version="3.6.5";M.isNavigationFailure=xn;M.NavigationFailureType=Yt;M.START_LOCATION=jt;Ae&&window.Vue&&window.Vue.use(M);const Gl=`## \u4E2D\u4ECB\u8005\u6A21\u5F0F
\u5728\u89C2\u5BDF\u8005\u6A21\u5F0F\u7684\u7AE0\u8282\uFF0C\u6211\u4EEC\u4E86\u89E3\u4E86 \u901A\u8FC7\u5355\u4E2A\u5BF9\u8C61\u5B9E\u73B0\u591A\u4E8B\u4EF6\u901A\u4FE1\u7684\u65B9\u5F0F\u3002
\u8FD9\u4E5F\u5C31\u662F\u6211\u4EEC\u5E38\u8BF4\u7684\u53D1\u5E03/\u8BA2\u9605\u6A21\u5F0F\uFF0C\u6216\u8005\u8BF4 Event Aggregation\u3002\u5F00\u53D1\u8005
\u9047\u5230\u8FD9\u79CD\u95EE\u9898\u7684\u65F6\u5019\u7ECF\u5E38\u60F3\u5230\u7684\u662F\u4E2D\u4ECB\u8005\u6A21\u5F0F\uFF0C\u8FD9\u662F\u6B63\u5E38\u7684\uFF0C\u6240\u4EE5\u63A5\u4E0B\u6765\uFF0C
\u8BA8\u8BBA\u4E00\u4E0B\u4ED6\u4EEC\u7684\u533A\u522B\u3002

\u901A\u8FC7\u67E5\u9605\u5B57\u5178\uFF0C\u5F97\u77E5\uFF0C\u4E2D\u4ECB\u8005\u662F\u8FD9\u4E2A\u610F\u601D\uFF1A 
a neutral party that assists in negotiations and conflict resolution.\u3002
\u4E00\u4E2A\u89E3\u51B3\u51B2\u7A81\u3001\u534F\u5546\u7684\u4E2D\u95F4\u8005\u3002\u5728\u6211\u4EEC\u7684\u65F6\u5019\uFF0C\u4E2D\u4ECB\u8005\u662F\u4E00\u4E2A\u884C\u4E3A\u8BBE\u8BA1\u6A21\u5F0F\u3002
\u8FD9\u4E2A\u8BBE\u8BA1\u6211\u4EEC\u5141\u8BB8\u6211\u4EEC\u5B9A\u4E49\u4E00\u4E2A\u7EDF\u4E00\u7684\u63A5\u53E3\u3002\u7CFB\u7EDF\u7684\u4E0D\u540C\u90E8\u5206\u901A\u4FE1\u4F1A\u8C03\u7528\u5230\u7684\u3002

\u5982\u679C\u4E00\u4E2A\u7CFB\u7EDF\u7684\u7EC4\u4EF6\u4E4B\u95F4\u51FA\u6765\u4E86\u592A\u591A\u7684\u76F4\u63A5\u8054\u7CFB\uFF0C\u8FD9\u65F6\u5019\uFF0C\u4F60\u5E94\u8BE5\u4F7F\u7528\u4E00\u4E2A\u63A7\u5236\u7684
\u4E2D\u5FC3\u70B9\u53D6\u4EE3\u3002\u4E2D\u4ECB\u8005\u964D\u4F4E\u4E86\u8026\u5408\u6027\uFF0C\u4ED6\u901A\u8FC7\u4FDD\u8BC1\u8FD9\u79CD\u65B9\u5F0F\u6765\u5B9E\u73B0\uFF0C\u907F\u514D\u7EC4\u4EF6\u4E4B\u95F4\uFF0C
\u76F4\u63A5\u5173\u8054\uFF0C\u5B83\u4EEC\u7684\u4EA4\u4E92\u901A\u8FC7\u4E00\u4E2A\u4E2D\u5FC3\u70B9\uFF0C\u8FD9\u53EF\u4EE5\u5E2E\u52A9\u6211\u4EEC\u63D0\u9AD8\u7EC4\u4EF6\u7684\u590D\u7528\u6027\u4EE5\u53CA
\u7CFB\u7EDF\u7684\u89E3\u8026\u3002

\u73B0\u5728\u4E16\u754C\u4E2D\u7684\u7C7B\u6BD4\uFF0C\u53EF\u80FD\u5C31\u662F\u673A\u573A\u4EA4\u901A\u63A7\u5236\u7CFB\u7EDF\uFF0C\u4E00\u4E2A\u5854\u63A7\u5236\u98DE\u673A\u8D77\u98DE\u548C\u964D\u843D\uFF0C
\u56E0\u4E3A\u6240\u6709\u7684\u901A\u4FE1\u90FD\u662F\u98DE\u673A\u5230\u5854\u7684\u901A\u4FE1\uFF0C\u800C\u4E0D\u662F\u98DE\u673A\u4E4B\u95F4\u7684\u901A\u4FE1\u3002\u8FD9\u4E2A\u96C6\u4E2D\u5316\u7684\u63A7\u5236\u5668\uFF0C
\u662F\u8FD9\u4E2A\u7CFB\u7EDF\u6210\u529F\u7684\u5173\u952E\uFF0C\u8FD9\u4E5F\u662F\u4E2D\u4ECB\u8005\u5728\u8F6F\u4EF6\u8BBE\u8BA1\u91CC\u9762\u6240\u5B9A\u4F4D\u7684\u89D2\u8272\u3002

\u53E6\u5916\u4E00\u4E2A\u7C7B\u6BD4\u5E94\u8BE5\u662F\uFF0C\u4E8B\u4EF6\u5192\u6CE1\u548C\u4E8B\u4EF6\u59D4\u6D3E\u3002\u5982\u679C\u5728\u6574\u4E2A\u7CFB\u7EDF\u4E2D\uFF0C\u6240\u6709\u7684\u8BA2\u9605\u8005\u90FD\u662F
\u4F9D\u8D56\u4E8Edocument\u800C\u4E0D\u662F\u72EC\u7ACB\u7684node\uFF0C\u90A3\u4E48document\u5C31\u76F8\u5F53\u4E8E\u4E00\u4E2A\u4E2D\u4ECB\u8005\uFF0C\u53D6\u4EE3\u4E8E\u7ED1\u5B9A\u4E8E
\u5355\u4E2A\u8282\u70B9\u7684\u4E8B\u4EF6\uFF0C\u4E00\u4E2A\u66F4\u9AD8\u754C\u522B\u7684\u5BF9\u8C61\u88AB\u5F53\u505A\u4E3A\u4E2D\u4ECB\u8005\uFF0C\u7528\u4E8E\u901A\u77E5\u8BA2\u9605\u8005\u4EEC\u4EA4\u4E92\u76F8\u5173\u7684
\u4E8B\u4EF6\u3002

\u5F53\u6211\u4EEC\u8C08\u8BBA\u5230\u4E86\u4E2D\u4ECB\u8005\u548CEventAggregator\u6A21\u5F0F\uFF0C\u6211\u4EEC\u4F1A\u611F\u89C9\u4E24\u8005\u662F\u53EF\u4EE5\u4E92\u76F8\u66FF\u6362\u7684\uFF0C\u56E0
\u4E3A\u5B83\u4EEC\u7684\u5B9E\u73B0\u770B\u8D77\u6765\u76F8\u4F3C\u3002\u7136\u800C\uFF0C\u5B83\u4EEC\u7684\u8BED\u610F\u548C\u610F\u56FE\u662F\u975E\u5E38\u4E0D\u540C\u7684\u3002

\u5C3D\u7BA1\u4E24\u8005\u7684\u5B9E\u73B0\u4F7F\u7528\u4E86\u76F8\u540C\u7684\u7ED3\u6784\uFF0C\u6211\u4ECD\u7136\u76F8\u4FE1\uFF0C\u8FD9\u8FD9\u91CC\u9762\u8FD8\u6709\u660E\u663E\u7684\u4E0D\u540C\u4E4B\u5904\u3002\u6211\u76F8\u4FE1\uFF0C
\u5728\u65E5\u5E38\u4EA4\u6D41\u4E2D\uFF0C\u6211\u4EEC\u5E94\u8BE5\u4E0D\u80FD\u76F8\u4E92\u66FF\u6362/\u6216\u8005\u8BF4\u4EE4\u4EBA\u56F0\u60D1\u3002

### \u4E00\u4E2A\u7B80\u5355\u7684\u4E2D\u4ECB\u8005\u6A21\u5F0F

\u5728 \u8FD9\u91CC\u6211\u4EEC\u8BF4\uFF0C\u4E2D\u4ECB\u8005\u662F \u7528\u6765\u534F\u8C03\u4E0D\u540C\u5BF9\u8C61\u4E4B\u95F4\u903B\u8F91\u548C\u884C\u4E3A\u7684\u4E00\u4E2A\u5BF9\u8C61\u3002
\u5B83\u901A\u8FC7\u53E6\u5916\u4E00\u4E2A\u5BF9\u8C61\u6216\u8005\u662F\u5916\u90E8\u8F93\u5165\u6765\u4F5C\u51FA\u5224\u65AD\u548C\u4EC0\u4E48\u65F6\u5019\u8C03\u7528\u53E6\u5916\u4E00\u4E2A\u5BF9\u8C61\u3002



\u4F60\u53EF\u4EE5\u7B80\u5355\u7684\u5199\u8FD9\u6837\u4E00\u4E2A\u5BF9\u8C61\uFF1B

\`\`\`
var mediator = {};

\`\`\`

\`\`\`
var orgChart = {
 
  addNewEmployee: function(){
 
    // getEmployeeDetail provides a view that users interact with
    var employeeDetail = this.getEmployeeDetail();
 
    // when the employee detail is complete, the mediator (the 'orgchart' object)
    // decides what should happen next
    employeeDetail.on("complete", function(employee){
 
      // set up additional objects that have additional events, which are used
      // by the mediator to do additional things
      var managerSelector = this.selectManager(employee);
      managerSelector.on("save", function(employee){
        employee.save();
      });
 
    });
  },
 
  // ...
}
\`\`\`

\u8FD9\u4E2A\u4F8B\u5B50\u6F14\u793A\u4E86\u4E00\u4E2A\u975E\u5E38\u57FA\u7840\u7684\u4E2D\u4ECB\u8005\u7684\u5B9E\u73B0\uFF0C\u901A\u8FC7\u4E00\u4E2A\u5BF9\u8C61\u52A0\u4E0A\u4E00\u4E9B\u80FD\u591F\u8BA2\u9605\u4E8B\u4EF6\u548C\u89E6\u53D1\u4E8B\u4EF6\u7684\u5DE5\u5177\u65B9\u6CD5\u3002
\u8FC7\u53BB\uFF0C\u6211\u5E38\u5E38\u7528\u5C06\u8FD9\u7C7B\u578B\u7684\u5BF9\u8C61\u5F53\u505A\u201C\u5DE5\u4F5C\u6D41\u201D\u5BF9\u8C61\uFF0C\u4F46\u662F\uFF0C\u4E8B\u5B9E\u4E0A\u8FD9\u4E2A\u53EB\u505A\u4E2D\u4ECB\u8005\u3002\u5C31\u662F\u4E00\u4E2A\u5BF9\u8C61\u63A7\u5236\u522B\u7684
\u4E0D\u540C\u5BF9\u8C61\u4E4B\u95F4\u7684\u5DE5\u4F5C\u6D41\uFF0C\u628A\u6240\u6709\u5DE5\u4F5C\u6D41\u53EA\u77E5\u9053\u7684\u76F8\u5173\u7684\u804C\u8D23\u5168\u90E8\u96C6\u4E2D\u5230\u4E86\u4E00\u4E2A\u7B80\u5355\u7684\u5BF9\u8C61\u4E0A\u9762\uFF0C\u8FD9\u6837\u505A\u7684\u4F18\u70B9\uFF0C
\u662F\u5DE5\u4F5C\u6D41\u66F4\u5BB9\u6613\u7BA1\u7406\u548C\u7EF4\u62A4\u3002

### \u76F8\u540C\u70B9\u548C\u4E0D\u540C\u70B9 \uFF08 mediator  / event aggregator )
 
\u6BEB\u65E0\u7591\u95EE\uFF0C\u4E24\u8005\u4E4B\u95F4\u7684\u76F8\u540C\u5904\u662F\uFF1A \u4E8B\u4EF6\u548C \u4E2D\u4ECB\uFF0C \u4E0D\u540C\u70B9\u662F\u5F88\u80A4\u6D45\u7684\u3002\u5F53\u6211\u4EEC\u53BB\u63A2\u7D22\u8FD9\u4E9B\u6A21\u5F0F\u7684\u610F\u56FE\uFF0C\u53BB\u770B\u5B83
\u7684\u5177\u4F53\u5B9E\u73B0\u7684\u65F6\u5019\u4F1A\u53D1\u73B0\u975E\u5E38\u4E0D\u4E00\u6837, \u8BBE\u8BA1\u6A21\u5F0F\u7684\u672C\u8D28\u66F4\u52A0\u4E0D\u540C\u3002

###\u4E8B\u4EF6
\u5728\u4E0A\u9762\u7684\u4F8B\u5B50\u4E2D\uFF0Cevent aggregator \u548C mediator \u90FD\u4F7F\u7528\u4E86\u4E8B\u4EF6\u3002 \u4E8B\u4EF6\u96C6\u4E2D\u5668  \u663E\u800C\u6613\u89C1\u662F\u4E0E\u4E8B\u4EF6\u6253\u4EA4\u9053\uFF0C\u6BD5\u7ADF
\u4ED6\u7684\u540D\u5B57\u91CC\u9762\u8FD8\u6709\u4E2A\u4E8B\u4EF6\u3002\u4E2D\u4ECB\u8005\uFF0C\u4E3B\u8981\u4F7F\u7528\u4E8B\u4EF6\u7684\u539F\u56E0\u662F\u56E0\u4E3A \u4E8B\u4EF6\u80FD\u591F\u8BA9 \u751F\u6D3B\u53D8\u5F97\u66F4\u597D\u4E00\u70B9\uFF0C\u4F46\u4E0D\u662F\u8BF4 \u4E00\u5B9A\u8981
\u5E94\u7528\u4E8B\u4EF6\u624D\u80FD\u5B9E\u73B0\u4E2D\u4ECB\u8005\uFF0C\u4F60\u53EF\u4EE5\u4F7F\u7528\u56DE\u8C03\u3002\u7B49\u7B49\u3002

###\u4E2D\u7ACB\u5BF9\u8C61
\u53CC\u65B9\u90FD\u4F7F\u7528\u4E2D\u7ACB\u5BF9\u8C61\u6765 \u5904\u7406\u4E1C\u897F\u3002event aggregator \u626E\u6F14\u7684\u662F \u76F8\u5BF9\u4E8E event publisher \u548C event subscribe \u4E8B\u4EF6
\u7684\u7B2C\u4E09\u65B9\u3002\u5B83\u626E\u6F14\u7684\u4E8B\u4EF6\u96C6\u4E2D\u901A\u8FC7\u7684\u70B9\u3002mediator\u4E5F\u662F\u4E00\u6837\uFF0C \u6240\u4EE5\u8FD9\u6709\u4EC0\u4E48\u4E0D\u540C\u5462\uFF1F \u4E3A\u4EC0\u4E48\u6211\u4EEC\u4E0D\u53EB event aggregator
\u4E3Amediator\u5462\uFF1F\u7B54\u6848\u8DDF \u5E94\u7528\u7684\u5DE5\u4F5C\u7F57\u548C\u903B\u8F91 \u88AB \u7F16\u7801\u6709\u5173\u3002


\u4E0B\u9762\u7684\u5185\u5BB9\u6CA1\u4EC0\u4E48\u91CD\u70B9\uFF0C\u6211\u770B\u4E0D\u4E0B\u53BB\u4E86\u2026\u2026`,Jl=`<html>
<head>
	<title>Observer pratice</title>
</head>
<!-- \u5F15\u7528\u76D1\u542C\u5668\u6A21\u5F0F\u51FD\u6570 -->
<script type="text/javascript" src="Observer.js"><\/script>
<body>

	<input type="checkbox" id="mainCheckbox">MainCheckBox</input>
	<button id="addNewObserver">\u6DFB\u52A0\u76D1\u542C\u5668</button>
	<div id="observersContainer"></div>

</body>
<script type="text/javascript">



// Extend an object with an extension
function extend( obj, extension ){
  for ( var key in extension ){
    obj[key] = extension[key];
  }
}
 
// References to our DOM elements
 
var controlCheckbox = document.getElementById( "mainCheckbox" ),
  addBtn = document.getElementById( "addNewObserver" ),
  container = document.getElementById( "observersContainer" );
 
 
// Concrete Subject
 
// Extend the controlling checkbox with the Subject class
extend( controlCheckbox, new Subject() );
 
// Clicking the checkbox will trigger notifications to its observers
controlCheckbox.onclick = function(){
  controlCheckbox.notify( controlCheckbox.checked );
};
 
addBtn.onclick = addNewObserver;
 
// Concrete Observer
 
function addNewObserver(){
 
  // Create a new checkbox to be added
  var check = document.createElement( "input" );
  check.type = "checkbox";
 
  // Extend the checkbox with the Observer class
  extend( check, new Observer() );
 
  // Override with custom update behaviour
  check.update = function( value ){
    this.checked = value;
  };
 
  // Add the new observer to our list of observers
  // for our main subject
  controlCheckbox.addObserver( check );
 
  // Append the item to the container
  container.appendChild( check );
}

<\/script>
</html>`,Kl=`function ObserverList(){
	this.list = [];
}
ObserverList.prototype.add = function(observer) {
	return this.list.push(observer);// body...
};
ObserverList.prototype.get = function(index) {
	return this.list[index];// body...
};
ObserverList.prototype.count = function(index) {
	return this.list.length;// body...
};
ObserverList.prototype.indexOf = function(object, index) {
	var i = startIndex;
	while( i < this.list.length) {
		if( object === this.list[i]){
			return i;
		}
		i++;
	}

	return -1;
}
ObserverList.prototype.removeAt = function( index ) {
	this.observerList.splice( index, 1);
}



function Observer(){
  this.update = function(){
    // ...
  };
}



function Subject(){
	this.observerList = new ObserverList();
}

Subject.prototype.addObserver = function ( observer ) {
	this.observerList.add( observer )
	return this
}

Subject.prototype.removeObserver = function( observer ){
  this.observerList.removeAt( this.observerList.indexOf( observer, 0 ) );
};

Subject.prototype.notify = function( context ){
  var observerCount = this.observerList.count();
  for(var i=0; i < observerCount; i++){
    this.observerList.get(i).update( context );
  }
};

`,Yl=`// Publish/subscribe.js

var pubsub = {};

(function(myObject){

	var topics = {}
	var subscribeId = 0;

	myObject.subscribe = function(topic, func) {
		if(!topics[topic]){
			topics[topic] = []
		}

		var token = (++subscribeId).toString();
		topics[topic].push({
			func: func,
			token: token
		})

		return token
	}

	// unsubscribe single token subscribe
	myObject.unsubscribe = function(token){
		for(var t in topics){
			var currentTopic = topics[t];

			for (var i = 0, j = topics[m].length; i < j; i++) {
				if(currentTopic[i] === token) {
					currentTopic.splice(i,1)
					return token
				}
			};
		}
	}

	myObject.Publish = function(topic, args){
		var targetSubscribers = topics[topic] || [];

		for (var i = 0,j = targetSubscribers.length; i < j; i++) {
			targetSubscribers[i].func(args)
		};

		return this;
	}
	
})(pubsub)`,Xl=`#Javascript\u8BBE\u8BA1\u6A21\u5F0F/\u6211\u7684\u7406\u89E3\uFF08\u7FFB\u8BD1
## Observer\u6A21\u5F0F\u4E0EPublish/Subscribe\u6A21\u5F0F\u7684\u533A\u522B
  \u89C2\u5BDF\u8005\u6A21\u5F0F\u548C\u8BA2\u9605\u53D1\u5E03\u6A21\u5F0F\u4E4B\u95F4\u7684\u533A\u522B\u4E8C\u8005\u76F8\u6BD4\u8F83\uFF0C\u6211\u4EEC\u4F1A\u53D1\u73B0 \u5728js\u7684\u4E16\u754C\u91CC\u9762\uFF0C\u6211\u4EEC\u4F1A\u53D1\u73B0\u89C2\u5BDF\u8005\u6A21\u5F0F\u66F4\u5BB9\u6613\u88AB\u610F\u8BC6\u5230\uFF0C
\u5B83\u4EEC\u901A\u5E38 \u4EE5\u201C\u53D1\u5E03/\u8BA2\u9605\u201D\u7684\u8BBE\u8BA1\u6A21\u5F0F\u5B9E\u73B0\uFF0C \u4E8C\u8005\u975E\u5E38\u76F8\u4F3C\uFF0C\u5B83\u4EEC\u4E4B\u95F4\u7684\u533A\u522B\uFF0C\u9700\u8981\u6CE8\u610F\u3002

\u89C2\u5BDF\u8005\u6A21\u5F0F\u5F62\u5F0F\u5982\u4E0B, \u5E0C\u671B\u80FD\u591F\u6536\u5230\u4E3B\u9898\u901A\u77E5\u7684\u89C2\u5BDF\u8005\uFF0C\u5B83\u5FC5\u987B\u8BA2\u9605"\u89E6\u53D1\u201C\u4E8B\u4EF6\u7684\u5BF9\u8C61\u3002

  \u53D1\u5E03/\u8BA2\u9605\u8005\u6A21\u5F0F\u4E0E\u6B64\u4E0D\u540C\uFF0C\u5B83\u5728\u8BA2\u9605\u8005\uFF08\u5E0C\u671B\u6536\u5230\u901A\u77E5\u7684\u5BF9\u8C61\u4EEC\uFF09\u548C\u53D1\u5E03\u8005\uFF08\u5206\u53D1\u4E8B\u4EF6\u7684\u5BF9\u8C61\uFF09\u5EFA\u7ACB\u4E86\u4E00\u4E2A\u901A\u9053\uFF0C
\u53EF\u4EE5\u53EB\u4ED6\u4E3A\u4E3B\u9898\u901A\u9053\u6216\u8005\u65F6\u95F4\u901A\u9053\u3002  \u8FD9\u6574\u4E2A\u4E8B\u4EF6\u7CFB\u7EDF\u5141\u8BB8\u4F60\u901A\u8FC7\u4EE3\u7801\u8FDB\u884C\u5177\u4F53\u4E8B\u4EF6\u7684\u5B9A\u4E49\uFF0C\u4EE5\u53CA\u8BBE\u5B9A\u8BA2\u9605\u8005\u6240\u9700\u8981\u7684\u53C2\u6570\uFF0C
\u8FD9\u4E2A\u60F3\u6CD5\u4E3B\u8981\u7684\u76EE\u7684\u662F\uFF0C\u907F\u514D\u8BA2\u9605\u8005\u548C\u53D1\u5E03\u8005\u4E4B\u95F4\u7684\u4F9D\u8D56\u5173\u7CFB\u3002

  \u6B63\u662F\u56E0\u4E3A\u8FD9\u4E2A\u4E0E\u89C2\u5BDF\u8005\u6A21\u5F0F\u4E0D\u540C\u70B9\uFF0C \u4EFB\u610F\u7684\u53D1\u5E03\u8005\u90FD\u80FD\u591F\u5B9E\u73B0\u4E00\u4E2A\u9002\u5F53\u7684\u4E8B\u4EF6\u5904\u7406\u51FD\u6570\uFF0C\u7528\u6765\u6CE8\u518C\u548C\u63A5\u53D7 \u53D1\u5E03\u8005\u6240\u7FA4\u53D1\u7684\u6D88\u606F\u3002

\u4E0B\u9762\u662F\u4E00\u4E2A \u53EF\u80FD\u4F7F\u7528  \u53D1\u5E03/\u8BA2\u9605 \u6A21\u5F0F\u7684\u573A\u666F
\`\`\`javascript
// A very simple new mail handler
 
// A count of the number of messages received
var mailCounter = 0;
 
// Initialize subscribers that will listen out for a topic
// with the name "inbox/newMessage".
 
// Render a preview of new messages
var subscriber1 = subscribe( "inbox/newMessage", function( topic, data ) {
 
  // Log the topic for debugging purposes
  console.log( "A new message was received: ", topic );
 
  // Use the data that was passed from our subject
  // to display a message preview to the user
  $( ".messageSender" ).html( data.sender );
  $( ".messagePreview" ).html( data.body );
 
});
 
// Here's another subscriber using the same data to perform
// a different task.
 
// Update the counter displaying the number of new
// messages received via the publisher
 
var subscriber2 = subscribe( "inbox/newMessage", function( topic, data ) {
 
  $('.newMessageCounter').html( ++mailCounter );
 
});
 
publish( "inbox/newMessage", [{
  sender: "hello@google.com",
  body: "Hey there! How are you doing today?"
}]);
 
// We could then at a later point unsubscribe our subscribers
// from receiving any new topic notifications as follows:
// unsubscribe( subscriber1 );
// unsubscribe( subscriber2 );

\`\`\`
	\u8FD9\u4E2A\u6848\u4F8B\u7684\u4E3B\u8981idea\u662F  \u89E3\u8026\u7684\u63D0\u5347 \uFF0C\u5B83\u4EEC\u901A\u8FC7\u8BA2\u9605\u53E6\u5916\u4E00\u4E2A\u5BF9\u8C61\u7684\u5177\u4F53\u7684\u4EFB\u52A1\uFF0C\u6216\u8005\u8BF4\u6D3B\u52A8\uFF0C\u5F53\u8FD9\u4E2A\u4E8B\u4EF6\u88AB\u89E6\u53D1\u7684\u65F6\u5019\uFF0C\u8BA2\u9605\u8005\u5C31\u80FD\u6536\u5230\u3002
	\u800C\u4E0D\u662F\u5355\u4E2A\u5BF9\u8C61\u76F4\u63A5\u8C03\u7528\u53E6\u5916\u4E00\u4E2A\u5BF9\u8C61\u7684\u65B9\u6CD5,

## \u4F18\u70B9
\u8FD9\u4E24\u79CD\u6A21\u5F0F\u90FD\u9F13\u52B1\u6211\u4EEC\uFF0C\u8981\u53BB\u8BA4\u771F\u601D\u8003 \u5E94\u7528\u5185 \u5404\u4E2A\u6A21\u5757\u4E4B\u95F4\u7684\u5173\u7CFB\uFF0C \u5B83\u4EEC\u8FD8\u80FD\u591F\u5E2E\u52A9\u6211\u4EEC\u786E\u5B9A\u4E00\u4E9B\u80FD\u7528\u8FD9\u79CD\u6A21\u5F0F\u53D6\u4EE3\u7684\u5C42\u5173\u7CFB\u3002
\u8FD9\u4E2A\u4F18\u52BF\u80FD\u591F\u7528\u6765\u62C6\u5206\u6A21\u5757\uFF0C\u4FC3\u8FDB\u6A21\u5757\u6A21\u5757\u4E4B\u95F4\u7684\u677E\u8026\u5408\uFF0C\u8FD9\u6837\u5B50\u6211\u4EEC\u7684\u4EE3\u7801\u5C31\u66F4\u6709\u53EF\u80FD\u91CD\u590D\u4F7F\u7528\uFF0C\u5E76\u4E14\u5BB9\u6613\u7BA1\u7406\u3002

\u4ECE\u66F4\u957F\u8FDC\u7684\u52A8\u673A\u8BB2\uFF0C\u662F\u4E3A\u4E86\u89E3\u51B3\u8FD9\u79CD\u60C5\u5F62\uFF1A  \u4E24\u4E2A\u76F8\u4E92\u5173\u8054\u7684 \u7C7B\u4E4B\u95F4\u9700\u8981\u4FDD\u6301\u4E00\u81F4\u6027\uFF0C\u907F\u514D\u8FD9\u4E24\u4E2A\u7C7B\u7684\u9AD8\u8026\u5408\u6027\u3002
\u4E3E\u4E2A\u4F8B\u5B50\uFF0C\u5F53\u4E00\u4E2A\u5BF9\u8C61\u5177\u5907\u901A\u77E5\u7684\u80FD\u529B\uFF0C\u4F46\u662F\u4E0D\u9700\u8981\u8003\u8651\u90A3\u4E9B\u8DDF\u5B83\u6709\u5173\u7684\u5BF9\u8C61\u3002

\u5F53\u4F60\u4F7F\u7528\u8FD9\u79CD\u6A21\u5F0F\u7684\u65F6\u5019\uFF0C\u53D1\u5E03\u8005\u4EE5\u53CA\u89C2\u5BDF\u8005\u53EF\u4EE5\u5B58\u5728\u7075\u6D3B\u7684\u5173\u7CFB\uFF0C\u8FD9\u4E2A\u6A21\u5F0F\u63D0\u4F9B\u4E86\u5DE8\u5927\u7684\u7075\u6D3B\u6027\uFF0C\u4F46\u662F\u5B9E\u9645\u4E2D\uFF0C\u6211\u4EEC\u7684\u7CFB\u7EDF\u4E0D\u540C\u5C42\u4E4B\u95F4\u5B58\u5728\u7740
\u9AD8\u8026\u5408\u6027\uFF0C\u8FD9\u4E2A\u6A21\u5F0F\u53EF\u80FD\u4F1A\u6BD4\u8F83\u96BE\u4EE5\u5B9E\u73B0\u3002

\u8FD9\u4E2A\u6A21\u5F0F\u4E0D\u4E00\u5B9A\u662F\u6BCF\u4E2A\u95EE\u9898\u7684\u6700\u4F73\u89E3\u51B3\u65B9\u6848\uFF0C\u4F46\u662F\u5BF9\u4E8E\u8BBE\u8BA1\u4F4E\u8026\u5408\u6027\u7684\u7CFB\u7EDF\u800C\u8A00\uFF0C\u5B83\u4ECD\u7136\u662F\u6700\u597D\u7684\u5DE5\u5177\u4E4B\u4E00\uFF0C
\u6240\u4EE5\u5B83\u5E94\u8BE5\u88AB\u89C6\u4E3A\u6240\u6709javascript\u5F00\u53D1\u8005\uFF0C
\u4E00\u4E2A\u975E\u5E38\u5B9E\u7528\u7684\u5DE5\u5177\u3002
## \u7F3A\u70B9
\u4E0E\u7ED3\u679C\u76F8\u5173\u7684\u662F\uFF0C\u8FD9\u4E2A\u6A21\u5F0F\u7684\u67D0\u4E9B\u95EE\u9898\u5F71\u54CD\u4E86\u5B83\u4EEC\u7684\u4E3B\u8981\u597D\u5904\uFF0C\u5728publish/subscripbe\u6A21\u5F0F\u4E2D\uFF0C\u4E3A\u4E86\u89E3\u9664pub/sub\u4E4B\u95F4\u7684\u5173\u8054\u6027\uFF0C \u67D0\u4E9B\u60C5\u51B5\u4E0B\u6211\u4EEC\u4F1A\u5F88\u96BE\u786E\u4FDD\u7A0B\u5E8F\u4F1A\u6309\u6211\u4EEC
\u6240\u60F3\u7684\u90A3\u6837\u5B50\u8FD0\u884C\u3002

\u4E3E\u4E2A\u4F8B\u5B50\uFF0C \u53D1\u5E03\u8005\u53EF\u80FD\u5047\u8BBE\u4E00\u4E2A\u6216\u8005\u591A\u4E2A\u8BA2\u9605\u8005\uFF0C\u76D1\u542C\u8FD9\u4E2A\u4E8B\u4EF6\u3002
\u6211\u4EEC\u505A\u8FD9\u6837\u4E00\u4E2A\u5047\u8BBE\uFF0C\u6709\u4EBA\u8BB0\u5F55\u6216\u8005\u5411\u5916\u8F93\u51FA\u76F8\u5173\u5E94\u7528\u8FDB\u7A0B\u3002\u5982\u679C\u8BA2\u9605\u8005\u51FA\u73B0\u4E86\u65E5\u5FD7\u8BB0\u5F55\u7684\u5D29\u6E83\uFF0C\u90A3\u4E48\u7531\u4E8E \u8FD9\u4E2A\u89E3\u8026\u7684\u7279\u6027\uFF0C \u53D1\u5E03\u8005\u5C31\u65E0\u4ECE\u5F97\u77E5\u3002
\u53E6\u5916\u4E00\u4E2A\u7F3A\u70B9\u662F\uFF0C\u8BA2\u9605\u8005\u4E4B\u95F4\u662F\u76F8\u4E92\u65E0\u89C6\u7684\uFF0C\u5E76\u4E14\u8FD9\u4E2A\u6A21\u5F0F\u5BF9\u4E8E\u5207\u6362\u53D1\u5E03\u8005\u4E4B\u95F4\u7684\u635F\u8017\u662F\u89C6\u800C\u4E0D\u89C1\u7684\uFF0C\u7531\u4E8E\u53D1\u5E03\u8005\u8DDF\u8BA2\u9605\u8005\u4E4B\u95F4\u7684\u52A8\u6001\u5173\u7CFB\uFF0C\u66F4\u65B0
\u9644\u5E26\u7684\u4E1C\u897F\u53EF\u80FD\u5C31\u66F4\u96BE\u8C03\u8BD5\u3002

\u4E0B\u9762\u4E3APublish/subscribe \u5B9E\u73B0


## Publish/Subscribe \u5B9E\u73B0 
\u8FD9\u4E2A\u6A21\u5F0F\u5728Javascript\u7684\u751F\u6001\u7CFB\u7EDF\u9002\u5E94\u5F97\u975E\u5E38\u597D\uFF0C\u4E3B\u8981\u7684\u539F\u56E0\u662F\u56E0\u4E3A ECMAScript \u7684\u5B9E\u73B0\u4E5F\u662F\u4E8B\u4EF6\u9A71\u52A8\u7684\u3002
\u4F60\u5728\u6D4F\u89C8\u5668\u73AF\u5883\u4E2D\u4F7F\u7528\u5B83\u4F1A\u89C9\u5F97\u786E\u5B9E\u662F\u8FD9\u6837\uFF0C\u56E0\u4E3ADOM \u4F7F\u7528\u4E8B\u4EF6 \u4F5C\u4E3A\u5B83\u4E3B\u8981\u7684\u4EA4\u4E92API\u3002

\u5B9E\u9645\u4E0A\u662F\u8FD9\u6837\u7684\uFF0C ECMAScript \u548C DOM \u90FD\u6CA1\u6709\u63D0\u4F9B \u6838\u5FC3\u7684\u5BF9\u8C61\u6216\u8005\u65B9\u6CD5\uFF0C\u6765\u521B\u5EFA\u5B9A\u5236\u7684\u4E8B\u4EF6\uFF08dom3\u7684 customEvent\u8FD9\u662F\u4E2A\u4F8B\u5916\uFF0C
\u56E0\u4E3A\u5B83\u7ED1\u5728\u4E86dom\u4E0A\u9762\uFF0C\u6240\u4EE5\u8FD9\u5E76\u975E\u901A\u7528\u7684\u5B9E\u73B0\uFF09\u3002

\u5E78\u8FD0\u7684\u662F,\u4E3B\u6D41\u7684JS\u5DE5\u5177\u5305\uFF0C\u50CF\u662Fdojo, jQuery,YUI\u5DF2\u7ECF\u6709\u4E86\u8FD9\u7C7B\u5DE5\u5177\uFF0C\u53EA\u8981\u82B1\u4E00\u70B9\u5C0F\u5C0F\u7684\u52AA\u529B\uFF0C\u4F60\u80FD\u591F\u8F7B\u677E\u7684\u5EFA\u7ACB\u8D77Pub/Sub\u6A21\u5F0F\uFF0C\u4E0B\u9762\u6211\u4EEC\u770B\u5230\u4E00\u4E9B\u4F8B\u5B50\u3002

\`javascript 
// Publish
 
// jQuery: $(obj).trigger("channel", [arg1, arg2, arg3]);
$( el ).trigger( "/login", [{username:"test", userData:"test"}] );
 
// Dojo: dojo.publish("channel", [arg1, arg2, arg3] );
dojo.publish( "/login", [{username:"test", userData:"test"}] );
 
// YUI: el.publish("channel", [arg1, arg2, arg3]);
el.publish( "/login", {username:"test", userData:"test"} );
 
 
// Subscribe
 
// jQuery: $(obj).on( "channel", [data], fn );
$( el ).on( "/login", function( event ){...} );
 
// Dojo: dojo.subscribe( "channel", fn);
var handle = dojo.subscribe( "/login", function(data){..} );
 
// YUI: el.on("channel", handler);
el.on( "/login", function( data ){...} );
 
 
// Unsubscribe
 
// jQuery: $(obj).off( "channel" );
$( el ).off( "/login" );
 
// Dojo: dojo.unsubscribe( handle );
dojo.unsubscribe( handle );
 
// YUI: el.detach("channel");
el.detach( "/login" );
\`

\u9488\u5BF9\u4E8E\u60F3\u8981\u901A\u8FC7\u9999\u8349\u5473(\u7B80\u6D01)\u7684JavaScript\u4F7F\u7528Pub/Sub\u6A21\u5F0F\u7684\u540C\u5B66\uFF0CAmplifyJS\u5305\u542B\u4E86\u4E00\u4E2A\u5E72\u51C0\u7684\uFF0C\u672A\u77E5\u5E93\u4E3B\u4E49\u7684\u5B9E\u73B0\uFF0C
\u80FD\u591F\u4E0E\u4EFB\u4F55\u7684JS\u5E93\u4E00\u8D77\u4F7F\u7528\u3002Radio.js,PubSubJS \u6216\u8005 Pure JS \u90FD\u662F\u4E0D\u9519\u7684\u9009\u62E9\u3002


## Publish/Subscribe \u5B9E\u73B0

\`var pubsub = {};
 
(function(myObject) {
 
    // Storage for topics that can be broadcast
    // or listened to
    var topics = {};
 
    // An topic identifier
    var subUid = -1;
 
    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    myObject.publish = function( topic, args ) {
 
        if ( !topics[topic] ) {
            return false;
        }
 
        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;
 
        while (len--) {
            subscribers[len].func( topic, args );
        }
 
        return this;
    };
 
    // Subscribe to events of interest
    // with a specific topic name and a
    // callback function, to be executed
    // when the topic/event is observed
    myObject.subscribe = function( topic, func ) {
 
        if (!topics[topic]) {
            topics[topic] = [];
        }
 
        var token = ( ++subUid ).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };
 
    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    myObject.unsubscribe = function( token ) {
        for ( var m in topics ) {
            if ( topics[m] ) {
                for ( var i = 0, j = topics[m].length; i < j; i++ ) {
                    if ( topics[m][i].token === token ) {
                        topics[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }
        return this;
    };
}( pubsub ));\`

## \u6848\u4F8B\uFF1A Decoupling an Ajax-based jQuery application

\u5728\u6211\u4EEC\u6700\u540E\u7684\u6848\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u4ECE\u5B9E\u7528\u6027\u7684\u89D2\u5EA6\u770B\u5F85\uFF0C\u5728\u4EE3\u7801\u4E2D\u4F7F\u7528Pub/Sub\u6A21\u5F0F\u89E3\u8026\u6211\u4EEC\u7684\u4EE3\u7801\uFF0C
\u4E3A\u4EC0\u4E48\u80FD\u591F\u66FF\u6211\u4EEC\u7701\u4E0B\u75DB\u82E6\u7684\u91CD\u6784\u3002

\u5728\u91CDAjax\u7684\u7A0B\u5E8F\u4E2D\uFF0C\u6211\u4EEC\u5E38\u5E38\u6709\u8FD9\u6837\u7684\u60C5\u5F62\uFF1A\u6211\u4EEC\u6536\u5230\u4E86\u4E00\u4E2A\u54CD\u5E94\uFF0C\u6211\u4EEC\u60F3\u5728\u5B9E\u73B0\u4E0D\u5355\u5355\u4E00\u4E2A\u52A8\u4F5C\u3002
\u6211\u4EEC\u53EF\u4EE5\u7B80\u5355\u7684\uFF0C\u628A\u6240\u6709\u7684post-request\u903B\u8F91\u653E\u5230 success callback\u51FD\u6570\u91CC\u9762\uFF0C\u4F46\u662F\u8FD9\u4E2A\u65B9\u6CD5\u91CC\u9762
\u6709\u4E00\u4E9B\u7F3A\u70B9\u3002

\u5728\u9AD8\u8026\u5408\u7684\u7A0B\u5E8F\u4E2D, \u5982\u679C\u6211\u4EEC\u60F3\u8981\u4FDD\u8BC1\u529F\u80FD\u7684\u590D\u7528\u6027\uFF0C\u5185\u7F6E\u51FD\u6570/\u4EE3\u7801\u7684\u4F9D\u8D56\u5173\u7CFB\u4E0D\u65AD\u589E\u52A0\uFF0C\u6709\u4E9B\u65F6\u5019\u4F1A\u5BFC\u81F4\u6211\u4EEC\u9700\u8981\u4ED8\u51FA\u66F4\u5927\u7684\u5DE5\u4F5C\u91CF\u3002
\u8FD9\u610F\u5473\u7740\u4EC0\u4E48\u5462?  \u5982\u679C\u6211\u4EEC\u53EA\u662F\u60F3\u8981\u4E00\u6B21\u6536\u96C6\u6240\u6709\u7684\u7ED3\u679C\uFF0C\u90A3\u4E48\u628A\u6240\u6709\u7684\u8BF7\u6C42\u903B\u8F91\u653E\u5728\u56DE\u8C03\u7684\u51FD\u6570\u91CC\u9762\u5176\u5B9E\u8FD8\u597D\u3002\u4F46\u662F\u5728\u67D0\u4E9B\u60C5\u51B5\u4E0B\u5C31\u4E0D\u5927\u5408\u9002\uFF0C
\u5982\u679C\u6211\u4EEC\u60F3\u8981\u5728\u4E4B\u540E\u7684Ajax\u8BF7\u6C42\u4F7F\u7528\u540C\u6837\u7684\u6570\u636E\u6765\u6E90\uFF0C\u6211\u4EEC\u5C31\u5FC5\u987B\u91CD\u5199\u6570\u636E\u597D\u591A\u6B21\u3002

\u6211\u4EEC\u53EF\u4EE5\u4ECE\u4E00\u5F00\u59CB\u5C31\u4F7F\u7528pubsub\u6A21\u5F0F\uFF0C\u8FD9\u6837\u80FD\u8282\u7701\u65F6\u95F4\uFF0C\u800C\u4E0D\u662F\u6765\u56DE\u5728\u5404\u4E2A\u5C42\u7EA7\u4E4B\u95F4 \u8C03\u7528\u76F8\u540C\u7684data-source\uFF0C\u5E76\u4E14\u4F18\u5316\u5B83\u4EEC\u3002

\u901A\u8FC7\u89C2\u5BDF\u8005\u6A21\u5F0F\uFF0C\u6211\u4EEC\u80FD\u591F\u8F7B\u677E\u7684\u5212\u5206\u7A0B\u5E8F\u7EA7\u522B\u7684\u901A\u544A\uFF0C  \u5982\u679C\u4F60\u7528\u522B\u7684\u6A21\u5F0F\uFF0C\u53EF\u80FD\u6CA1\u6709\u8FD9\u4E48\u4F18\u96C5\u3002
\u6CE8\u610F\u4E0B\u9762\u7684\u6848\u4F8B\uFF0C\u5F53\u7528\u6237\u8868\u660E\u4ED6\u60F3\u8981\u8FDB\u884C\u4E00\u6B21\u641C\u7D22\u67E5\u8BE2\uFF0C\u5C31\u53D1\u5E03\u4E00\u4E2A\u4E3B\u9898\u901A\u544A\uFF0C\u5F53\u8BF7\u6C42\u54CD\u5E94\u5DF2\u7ECF\u8FD4\u56DE\u4E86\uFF0C\u6570\u636E\u53EF\u7528\u4E86\uFF0C\u8FD9\u65F6\u5019
\u4E5F\u53D1\u5E03\u4E00\u4E2A\u901A\u544A\u3002\u8BA2\u9605\u8005\u53EF\u4EE5\u5F85\u4F1A\u51B3\u5B9A\u5982\u4F55\u4F7F\u7528\u8FD9\u4E9B\u4E8B\u4EF6\u3002\u8FD9\u6837\u505A\u7684\u4F18\u70B9\u662F\u8FD9\u6837\u7684\uFF1A \u53EA\u8981\u6211\u4EEC\u60F3\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u752810\u4E2A\u4E0D\u540C\u7684\u8BA2\u9605\u8005\u6765
\u52A0\u5DE5\u4ECE\u4E0D\u540C\u5C42\u7EA7\u4E0D\u540C\u65B9\u5F0F\u8FD4\u56DE\u7684\u6570\u636E\uFF0C\u5B83\u7684\u4E3B\u8981\u8D23\u4EFB\u5C31\u662F\u53D1\u9001\u8BF7\u6C42\uFF0C\u5E76\u4E14\u628A\u8FD4\u56DE\u7684\u6570\u636E\u4F20\u9012\u7ED9\u5E0C\u671B\u4F7F\u7528\u7684\u4EBA\u3002
\u8FD9\u4E2A\u7126\u70B9\u7684\u5206\u79BB\uFF0C\u80FD\u591F\u8BA9\u6211\u4EEC\u7684\u4EE3\u7801\u8BBE\u8BA1 \u66F4\u52A0\u7B80\u6D01\u4E00\u70B9\u3002
## html/templates
\`\`\`<form id="flickrSearch">
 
   <input type="text" name="tag" id="query"/>
 
   <input type="submit" name="submit" value="submit"/>
 
</form>
 
 
 
<div id="lastQuery"></div>
 
<ol id="searchResults"></ol>
 
 
 
<script id="resultTemplate" type="text/html">
    <% _.each(items, function( item ){ %>
        <li><img src="<%= item.media.m %>"/></li>
    <% });%>
<\/script>\`\`\`
## javascripts

\`\`\`
;(function( $ ) {
 
   // Pre-compile template and "cache" it using closure
   var resultTemplate = _.template($( "#resultTemplate" ).html());
 
   // Subscribe to the new search tags topic
   $.subscribe( "/search/tags", function( e, tags ) {
       $( "#lastQuery" )
                .html("<p>Searched for:<strong>" + tags + "</strong></p>");
   });
 
   // Subscribe to the new results topic
   $.subscribe( "/search/resultSet", function( e, results ){
 
       $( "#searchResults" ).empty().append(resultTemplate( results ));
 
   });
 
   // Submit a search query and publish tags on the /search/tags topic
   $( "#flickrSearch" ).submit( function( e ) {
 
       e.preventDefault();
       var tags = $(this).find( "#query").val();
 
       if ( !tags ){
        return;
       }
 
       $.publish( "/search/tags", [ $.trim(tags) ]);
 
   });
 
 
   // Subscribe to new tags being published and perform
   // a search query using them. Once data has returned
   // publish this data for the rest of the application
   // to consume
 
   $.subscribe("/search/tags", function( e, tags ) {
 
       $.getJSON( "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
              tags: tags,
              tagmode: "any",
              format: "json"
            },
 
          function( data ){
 
              if( !data.items.length ) {
                return;
              }
 
              $.publish( "/search/resultSet", { items: data.items } );
       });
 
   });
 
 
})( jQuery );
\`\`\`


\u5728\u5E94\u7528\u8BBE\u8BA1\u4E2D\u7684\u8BB8\u591A\u4E0D\u540C\u7684\u573A\u666F\u4E2D\uFF0C\u89C2\u5BDF\u8005\u6A21\u5F0F\u7528\u6765\u89E3\u8026\u662F\u4E00\u4E2A\u5B9E\u7528\u7684\u9009\u62E9\u3002
\u5982\u679C\u4F60\u8FD8\u6CA1\u6709\u7528\u8FC7\uFF0C\u6211\u5EFA\u8BAE\u4F60\u53EF\u4EE5\u770B\u770B\u4E0A\u9762\u7684\u6848\u4F8B\u5E76\u4E14\u62FF\u4E00\u4E2A\u8FC7\u6765\u5B9E\u8DF5\uFF0C
\u8FD9\u662F\u6700\u7B80\u5355\u7684\u8BBE\u8BA1\u6A21\u5F0F\u4E4B\u4E00\uFF0C\u4E5F\u662F\u6700\u5F3A\u5927\u4E4B\u4E00\u3002`,Ql=`// mediator implement
//  mediator \u7684\u9AD8\u7EA7\u5B9E\u73B0
(function(root){

    // \u83B7\u53D6\u72EC\u4E00\u65E0\u4E8C\u7684UniqueId
    function generatorSID(){
        // \u5177\u4F53\u5B9E\u73B0\u7565\u8FC7
    }

    function Subscriber(fn, context, options){
        // bug 
        if(!(this instanceof Subscriber)){
            return new Subscriber(fn, context, options);
        }

        this.id = generatorSID();
        this.fn = fn ;
        this.options = options;
        this.context = context;
        this.topic = null;
    }
})();


function Topic(namespace){
    if(!(this instanceof Topic)){
        return new Topic(namespace);
    }

    this.namespace = namespace;
    this._callbacks = [];
    this._topics = [];
    this.stopped = false;
}

Topic.prototype = {
    AddSubscriber = function(fn, options, context){
        var callback = new Subscriber(fn, options, context);
        callback.topic = this;

        this._callbacks.push(callback);
        return callback;
    },

    StopPropagation: function(){
        this.stopped = true;
    },

    GetSubscriber: function(identifier){
        for(var i = 0, length = this._callbacks.length; i < length; i++){
            if(this._callbacks[i].id === identifier || this._callbacks[i].fn === identifier){
                return this._callbacks[i];
            }
        }

        // subTopic
        for(var topic in this._topics){
            if(this._topics.hasOwnProperty(topic)){
                var sub = this._topics.GetSubscriber(identifier);
                // if(sub !== undefined){
                if(sub){
                    return sub;
                }
            }
        }

        return false;
    },
    // \u6DFB\u52A0\u5B50Topic
    AddTopic: function(topic){
        this._topics[topic] = new Topic((this.namespace ? this.namespace + ":" : "") + topic);
    },
    //  \u662F\u5426\u6709\u5B50topic
    HasTopic: function(topic){
        return this._topics.hasOwnProperty(topic);
    },

    returnTopic: function(topic){
        return this._topics[topic];
    }
    
}`,Zl=`// simple implement
// \u4E2D\u4ECB\u8005\u6A21\u5F0F \u7B80\u5355\u5B9E\u73B0

var mediator = (function(){
    var topics = {};

    var subscribe = function(topic, fn){
        if(!topics[topic]){
            topics[topic] = []
        }

        topics[topic].push({ context: this, callback: fn});
        return this;
    }

    var publish = function(topic){
        var args;
        if(!topics[topic]) return false;

        args = Array.prototype.slice.call(arguments,1);

        for(var i = 0; i < topics[topic].length; i++){
            var subscribe = topics[topic][i];
            subscribe.callback.apply(subscribe.context, args);
        }
        return this;
    }

    return {
        subscribe: subscribe,
        publish: publish,
        installTo : function(obj) {
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    }
})();`,Vl=`var myModule = (function(){
	var privateVar = "yoman"

	function privateFunction(){
		console.log(privateVar)
	}

	return {
		publicMethod: privateFunction,
		publicVar: privateVar
	}
})()
// reveal module
// \u4F18\u70B9\uFF1A \u5BB9\u6613\u9605\u8BFB
// \u7F3A\u70B9\uFF1A \u7EF4\u62A4\u9EBB\u70E6
// `,tp=`var mySingleton = (function(){
	var instance;
	function init(){
		instance = {
			name: 'fuyy'
		}
	}

	return {
		getInstance: function(){
			if(!instance){
				init();
			}
			return instance
		}
	}
})();`,ep=`# \u535A\u5BA2\u76EE\u5F55

\u672C\u6587\u6863\u7AD9\u7531 VuePress v2 \u6784\u5EFA\uFF0C\u5185\u5BB9\u4ECE\u5386\u53F2\u5206\u652F\u4E0E \`pattern/\` \u793A\u4F8B\u8FC1\u79FB\u800C\u6765\u3002

## \u6587\u7AE0

- [Observer \u4E0E Publish/Subscribe](/blog/publish-subscribe.html)
- [\u4E2D\u4ECB\u8005\u6A21\u5F0F\uFF08Mediator\uFF09](/blog/mediator-pattern.html)
- [Pattern \u4EE3\u7801\u793A\u4F8B\u96C6](/blog/code-lab.html)
- [H5 launch-app\uFF1A\u5FAE\u4FE1\u5F00\u653E\u6807\u7B7E\u539F\u7406](/blog/wechat-open-tag-launch-app.html)
- [Codex Prompt \u8C03\u8BD5\u624B\u518C](/blog/codex-prompt-debugging.html)
- [Codex Agent \u5DE5\u4F5C\u6D41](/blog/codex-agent-workflow.html)
- [Codex CLI \u5230 PR \u4EA4\u4ED8\u6E05\u5355](/blog/codex-cli-to-pr.html)
- [2026 \u524D\u7AEF\u70ED\u70B9\u5B9E\u6218\u56FE](/blog/frontend-trends-2026-practice-map.html)
- [\u524D\u7AEF\u67B6\u6784\u51B3\u7B56\u624B\u518C](/blog/frontend-architecture-decision-playbook.html)
- [\u524D\u7AEF\u5DE5\u7A0B\u7406\u5FF5\uFF1A\u5FEB\u7A33\u7B80](/blog/frontend-engineering-philosophy.html)
- [AI Native \u524D\u7AEF\u5DE5\u4F5C\u6D41](/blog/ai-native-frontend-workflow.html)
- [\u65E7\u7AD9\u5185\u5BB9\u5F52\u6863](/blog/legacy-notes.html)

## \u672C\u7AD9\u5B9A\u4F4D

- \u8BB0\u5F55\u7ECF\u5178 JavaScript \u8BBE\u8BA1\u6A21\u5F0F\u7406\u89E3
- \u4FDD\u7559\u65E9\u671F\u793A\u4F8B\uFF0C\u8865\u5145\u7ED3\u6784\u5316\u9605\u8BFB\u8DEF\u5F84
- \u5728\u4E0D\u6539\u53D8\u6838\u5FC3\u89C2\u70B9\u7684\u524D\u63D0\u4E0B\u63D0\u5347\u53EF\u8BFB\u6027
`,np=`# AI Native \u524D\u7AEF\u5DE5\u4F5C\u6D41\uFF1A\u628A Codex/Agent \u53D8\u6210\u7A33\u5B9A\u4EA7\u80FD

AI \u4E0D\u8BE5\u53EA\u7528\u6765\u201C\u751F\u6210\u4EE3\u7801\u7247\u6BB5\u201D\uFF0C\u800C\u5E94\u8FDB\u5165\u5B8C\u6574\u4EA4\u4ED8\u94FE\u8DEF\u3002

## 1. \u63A8\u8350\u5DE5\u4F5C\u6D41

1. \u9700\u6C42\u7ED3\u6784\u5316\uFF1A\u76EE\u6807\u3001\u8303\u56F4\u3001\u7EA6\u675F\u3001\u9A8C\u6536
2. Agent \u6267\u884C\uFF1A\u5148\u4E0A\u4E0B\u6587\u626B\u63CF\uFF0C\u518D\u5206\u6B65\u6539\u52A8
3. \u81EA\u52A8\u9A8C\u8BC1\uFF1Alint/test/build \u5168\u8DD1
4. \u4EA4\u4ED8\u6C47\u603B\uFF1A\u53D8\u66F4\u6587\u4EF6\u3001\u98CE\u9669\u3001\u56DE\u6EDA\u65B9\u6848

## 2. Prompt \u4E0D\u662F\u201C\u63D0\u95EE\u201D\uFF0C\u662F\u201C\u4EFB\u52A1\u534F\u8BAE\u201D

\u4E00\u4E2A\u53EF\u6267\u884C Prompt \u81F3\u5C11\u5305\u542B\uFF1A

- \u76EE\u6807\uFF08\u505A\u6210\u4EC0\u4E48\uFF09
- \u8FB9\u754C\uFF08\u80FD\u6539\u4EC0\u4E48\uFF09
- \u7EA6\u675F\uFF08\u4E0D\u80FD\u505A\u4EC0\u4E48\uFF09
- \u9A8C\u6536\uFF08\u600E\u4E48\u5224\u65AD\u5B8C\u6210\uFF09
- \u8F93\u51FA\u683C\u5F0F\uFF08\u4F60\u5E0C\u671B\u5B83\u5982\u4F55\u6C47\u62A5\uFF09

## 3. \u67B6\u6784\u5C42\u9762\u600E\u4E48\u63A5\u5165 AI

- \u56E2\u961F\u7EA7\u6A21\u677F\uFF1A\u7EDF\u4E00 Prompt \u6A21\u677F\u548C\u8F93\u51FA\u6A21\u677F
- CI \u95E8\u7981\uFF1AAI \u751F\u6210\u4EE3\u7801\u4E5F\u5FC5\u987B\u8FC7\u540C\u6837\u7684\u68C0\u67E5
- \u98CE\u9669\u5206\u7EA7\uFF1A\u9AD8\u98CE\u9669\u53D8\u66F4\u5F3A\u5236\u4EBA\u5DE5\u4E8C\u6B21\u8BC4\u5BA1

## 4. \u54F2\u5B66\uFF1A\u4EBA\u673A\u534F\u4F5C\uFF0C\u4E0D\u662F\u4EBA\u673A\u66FF\u4EE3

- \u4EBA\u8D1F\u8D23\u5224\u65AD\u4E0E\u53D6\u820D
- Agent \u8D1F\u8D23\u6267\u884C\u4E0E\u63D0\u901F
- \u8D28\u91CF\u6807\u51C6\u4E0D\u56E0 AI \u964D\u7EA7

## 5. \u5B9E\u6218\u5EFA\u8BAE

1. \u4ECE\u4F4E\u98CE\u9669\u4EFB\u52A1\u8BD5\u70B9\uFF1A\u6837\u5F0F\u3001\u6587\u6863\u3001\u6D4B\u8BD5\u8865\u9F50
2. \u518D\u6269\u5C55\u5230\u4E2D\u98CE\u9669\u4EFB\u52A1\uFF1A\u9875\u9762\u6A21\u5757\u3001\u8DEF\u7531\u3001\u72B6\u6001
3. \u6700\u540E\u518D\u8FDB\u5165\u9AD8\u98CE\u9669\u4EFB\u52A1\uFF1A\u67B6\u6784\u91CD\u6784\u3001\u6838\u5FC3\u94FE\u8DEF

## 6. \u7ED3\u8BBA

AI Native \u56E2\u961F\u7684\u6838\u5FC3\u80FD\u529B\uFF0C\u4E0D\u662F\u201C\u4F1A\u4E0D\u4F1A\u7528\u5DE5\u5177\u201D\uFF0C\u800C\u662F\u201C\u6709\u6CA1\u6709\u628A\u5DE5\u5177\u7EB3\u5165\u5DE5\u7A0B\u7CFB\u7EDF\u201D\u3002
`,rp=`# Pattern \u4EE3\u7801\u793A\u4F8B\u96C6

\u4EE5\u4E0B\u4EE3\u7801\u6765\u81EA \`pattern/\` \u76EE\u5F55\uFF0C\u4F5C\u4E3A\u6587\u7AE0\u914D\u5957\u5B9E\u9A8C\u6750\u6599\u3002

## \`mediator.js\`

\`\`\`js
// simple implement
var mediator = (function () {
  var topics = {}

  var subscribe = function (topic, fn) {
    if (!topics[topic]) topics[topic] = []
    topics[topic].push({ context: this, callback: fn })
    return this
  }

  var publish = function (topic) {
    if (!topics[topic]) return false
    var args = Array.prototype.slice.call(arguments, 1)
    for (var i = 0; i < topics[topic].length; i++) {
      var subscriber = topics[topic][i]
      subscriber.callback.apply(subscriber.context, args)
    }
    return this
  }

  return { subscribe: subscribe, publish: publish }
})()
\`\`\`

## \`Publish.js\`

\`\`\`js
var pubsub = {}
;(function (myObject) {
  var topics = {}
  var subscribeId = 0

  myObject.subscribe = function (topic, func) {
    if (!topics[topic]) topics[topic] = []
    var token = (++subscribeId).toString()
    topics[topic].push({ func: func, token: token })
    return token
  }

  myObject.Publish = function (topic, args) {
    var targetSubscribers = topics[topic] || []
    for (var i = 0; i < targetSubscribers.length; i++) {
      targetSubscribers[i].func(args)
    }
    return this
  }
})(pubsub)
\`\`\`

## \`Observer.html\`

\`\`\`html
<input type="checkbox" id="mainCheckbox" />
<button id="addNewObserver">\u6DFB\u52A0\u76D1\u542C\u5668</button>
<div id="observersContainer"></div>
\`\`\`

\u53EF\u5728\u672C\u5730\u6253\u5F00 \`pattern/Observer.html\` \u4F53\u9A8C\u52A8\u6001\u65B0\u589E\u89C2\u5BDF\u8005\u3002
`,ip=`# Codex Agent \u5DE5\u4F5C\u6D41\uFF1A\u9700\u6C42\u5230\u4EA4\u4ED8\u7684\u6700\u77ED\u8DEF\u5F84

\u628A Codex \u5F53\u201C\u52A9\u624B\u201D\u5BB9\u6613\u5931\u63A7\uFF0C\u628A\u5B83\u5F53\u201C\u6267\u884C\u4EE3\u7406\u201D\u4F1A\u66F4\u7A33\u5B9A\u3002

## \u4E00\u6761\u63A8\u8350\u5DE5\u4F5C\u6D41

1. \u5B9A\u4E49\u76EE\u6807\uFF1A\u4E00\u53E5\u8BDD\u8BF4\u660E\u6700\u7EC8\u53EF\u9A8C\u6536\u7ED3\u679C
2. \u9501\u5B9A\u8303\u56F4\uFF1A\u660E\u786E\u53EF\u6539\u6587\u4EF6\u4E0E\u4E0D\u53EF\u6539\u8FB9\u754C
3. \u5206\u6B65\u6267\u884C\uFF1A\u5148\u6539\u6570\u636E\u5C42\uFF0C\u518D\u6539\u9875\u9762\uFF0C\u518D\u8DD1\u9A8C\u8BC1
4. \u6C47\u603B\u8BC1\u636E\uFF1A\u8F93\u51FA\u547D\u4EE4\u7ED3\u679C\u4E0E\u5173\u952E diff

## \u4E3A\u4EC0\u4E48\u6709\u6548

- \u4EFB\u52A1\u5207\u7247\u540E\uFF0C\u9519\u8BEF\u66F4\u5BB9\u6613\u56DE\u6EDA
- \u6BCF\u4E00\u6B65\u90FD\u6709\u53EF\u89C2\u6D4B\u7ED3\u679C\uFF08\u6D4B\u8BD5/\u6784\u5EFA\uFF09
- \u6700\u7EC8\u8F93\u51FA\u66F4\u8D34\u8FD1 PR \u63CF\u8FF0\u683C\u5F0F

## \u6A21\u677F

\`\`\`text
Step 1: Gather context
Step 2: Implement changes
Step 3: Verify (test/build)
Step 4: Summarize with file list
\`\`\`

## \u5B9E\u6218\u63D0\u9192

- \u4E0D\u8981\u4E00\u6B21\u585E\u8FDB\u201C\u91CD\u6784+\u65B0\u529F\u80FD+\u6837\u5F0F\u5927\u6539\u201D
- \u5148\u901A\u8DEF\u518D\u4F18\u5316\uFF0C\u5148\u53EF\u7528\u518D\u4F18\u96C5
- \u6BCF\u4E00\u6B65\u90FD\u4FDD\u7559\u53EF\u56DE\u6EDA\u8282\u70B9
`,op=`# \u4ECE Codex CLI \u5230 PR\uFF1A\u4E00\u5957\u53EF\u590D\u7528\u4EA4\u4ED8\u6E05\u5355

\u8FD9\u7BC7\u6587\u7AE0\u5173\u6CE8\u201C\u600E\u4E48\u628A Codex \u8F93\u51FA\u53D8\u6210\u56E2\u961F\u53EF\u63A5\u53D7\u7684\u4EA4\u4ED8\u7269\u201D\u3002

## 1. \u672C\u5730\u9636\u6BB5

- \u660E\u786E\u53D8\u66F4\u8303\u56F4\u4E0E\u76EE\u6807
- \u8BA9 Codex \u8F93\u51FA\u5177\u4F53\u6587\u4EF6\u53D8\u66F4
- \u672C\u5730\u8DD1 \`lint / test / build\`

## 2. \u63D0\u4EA4\u9636\u6BB5

- \u63D0\u4EA4\u4FE1\u606F\u4FDD\u6301 Conventional Commits
- \u63CF\u8FF0\u4E2D\u5305\u542B\uFF1A\u76EE\u7684\u3001\u6539\u52A8\u3001\u9A8C\u8BC1\u547D\u4EE4
- UI \u6539\u52A8\u9644\u622A\u56FE\u6216\u5F55\u5C4F

## 3. PR \u9636\u6BB5

- \u5148\u5199\u98CE\u9669\u70B9\uFF0C\u518D\u5199\u6539\u52A8\u7EC6\u8282
- \u8BF4\u660E\u56DE\u6EDA\u65B9\u6848
- \u5217\u51FA\u672A\u8986\u76D6\u7684\u8FB9\u754C\u573A\u666F

## 4. \u53EF\u590D\u7528\u6A21\u677F

\`\`\`text
Purpose:
Key Changes:
Verification:
Risk:
Rollback:
\`\`\`

## 5. \u7ED3\u8BBA

Codex \u53EF\u4EE5\u5927\u5E45\u63D0\u901F\uFF0C\u4F46\u201C\u53EF\u5BA1\u9605\u3001\u53EF\u9A8C\u8BC1\u3001\u53EF\u56DE\u6EDA\u201D\u624D\u662F\u56E2\u961F\u4EA4\u4ED8\u6807\u51C6\u3002
`,ap=`# Codex Prompt \u8C03\u8BD5\u624B\u518C\uFF1A\u4ECE\u201C\u8BF4\u4E0D\u6E05\u201D\u5230\u201C\u53EF\u6267\u884C\u201D

\u5F88\u591A\u4EBA\u89C9\u5F97 Codex \u4E0D\u7A33\u5B9A\uFF0C\u5B9E\u9645\u95EE\u9898\u5E38\u5E38\u4E0D\u662F\u6A21\u578B\u80FD\u529B\uFF0C\u800C\u662F Prompt \u4E0D\u53EF\u6267\u884C\u3002

## 1. \u5178\u578B\u574F\u5473\u9053

- \u76EE\u6807\u6A21\u7CCA\uFF1A\u6BD4\u5982\u201C\u5E2E\u6211\u4F18\u5316\u4E00\u4E0B\u9879\u76EE\u201D
- \u6CA1\u6709\u8FB9\u754C\uFF1A\u6CA1\u6709\u9650\u5B9A\u6587\u4EF6\u8303\u56F4\u3001\u6280\u672F\u6808\u3001\u9A8C\u6536\u6807\u51C6
- \u7F3A\u5931\u9A8C\u8BC1\uFF1A\u6CA1\u6709\u8981\u6C42\u6D4B\u8BD5\u3001\u6784\u5EFA\u6216\u56DE\u5F52\u6B65\u9AA4

## 2. \u53EF\u6267\u884C Prompt \u6A21\u677F

\`\`\`text
\u76EE\u6807\uFF1A
\u6280\u672F\u6808\uFF1A
\u6539\u52A8\u8303\u56F4\uFF08\u6587\u4EF6/\u6A21\u5757\uFF09\uFF1A
\u7EA6\u675F\uFF1A
\u9A8C\u6536\u6807\u51C6\uFF1A
\u8F93\u51FA\u683C\u5F0F\uFF1A
\`\`\`

## 3. \u8C03\u8BD5\u65B9\u6CD5

1. \u5148\u7F29\u5C0F\u4EFB\u52A1\u8303\u56F4\uFF0C\u53EA\u7ED9\u4E00\u4E2A\u6587\u4EF6\u6216\u4E00\u4E2A\u8DEF\u7531\u3002
2. \u8981\u6C42\u8F93\u51FA\u201C\u53D8\u66F4\u70B9\u5217\u8868\u201D\uFF0C\u4E0D\u8981\u76F4\u63A5\u5927\u6BB5\u89E3\u91CA\u3002
3. \u5F3A\u5236\u8981\u6C42\u9A8C\u8BC1\u547D\u4EE4\u548C\u7ED3\u679C\u6458\u8981\u3002
4. \u5982\u679C\u7B2C\u4E00\u6B21\u8DD1\u504F\uFF0C\u8FFD\u52A0\u201C\u53CD\u4F8B\u7EA6\u675F\u201D\u3002

## 4. \u5B9E\u6218\u793A\u4F8B

\`\`\`text
\u76EE\u6807\uFF1A\u65B0\u589E /blog/:slug \u8BE6\u60C5\u9875\u5E76\u63A5\u5165\u9996\u9875
\u6280\u672F\u6808\uFF1AVue2 + Vite + Vue Router
\u6539\u52A8\u8303\u56F4\uFF1Asrc/views/HomeView.vue, src/views/BlogDetailView.vue, src/router/index.ts
\u7EA6\u675F\uFF1A\u4E0D\u6539\u63A5\u53E3\u5C42\uFF0C\u4E0D\u5F15\u5165\u7B2C\u4E09\u65B9\u5305
\u9A8C\u6536\u6807\u51C6\uFF1Anpm run build-only \u901A\u8FC7\uFF0C\u9996\u9875\u53EF\u8DF3\u8BE6\u60C5\u9875
\u8F93\u51FA\u683C\u5F0F\uFF1A\u5148\u7ED9\u53D8\u66F4\u8BA1\u5212\uFF0C\u518D\u7ED9\u4EE3\u7801\u6539\u52A8\u6458\u8981
\`\`\`

## 5. \u7ED3\u8BBA

Prompt \u8D28\u91CF = \u4EFB\u52A1\u6E05\u6670\u5EA6\u3002  
\u5F53\u8F93\u5165\u662F\u201C\u7ED3\u6784\u5316\u4EFB\u52A1\u5355\u201D\uFF0CCodex \u624D\u4F1A\u7A33\u5B9A\u8F93\u51FA\u201C\u5DE5\u7A0B\u7ED3\u679C\u201D\u3002
`,sp=`# \u524D\u7AEF\u67B6\u6784\u51B3\u7B56\u624B\u518C\uFF1A\u4E0D\u662F\u201C\u6700\u5148\u8FDB\u201D\uFF0C\u800C\u662F\u201C\u6700\u5339\u914D\u201D

\u5F88\u591A\u67B6\u6784\u95EE\u9898\u4E0D\u5728\u6280\u672F\uFF0C\u800C\u5728\u51B3\u7B56\u65B9\u5F0F\u3002

## 1. \u67B6\u6784\u5148\u56DE\u7B54 3 \u4E2A\u95EE\u9898

1. \u8FD9\u4E2A\u9875\u9762\u7684\u6838\u5FC3\u76EE\u6807\u662F SEO\u3001\u8F6C\u5316\uFF0C\u8FD8\u662F\u6548\u7387\uFF1F
2. \u4E3B\u8981\u74F6\u9888\u662F\u9996\u5C4F\u3001\u4EA4\u4E92\uFF0C\u8FD8\u662F\u534F\u4F5C\u6210\u672C\uFF1F
3. \u56E2\u961F\u80FD\u5426\u957F\u671F\u7EF4\u62A4\u8FD9\u5957\u590D\u6742\u5EA6\uFF1F

## 2. \u5E38\u89C1\u573A\u666F\u4E0E\u63A8\u8350\u7EC4\u5408

## 2.1 \u5185\u5BB9\u4E0E\u8425\u9500\u7AD9

- \u6E32\u67D3\uFF1ASSG/SSR
- \u4EA4\u4E92\uFF1AIslands/\u5C40\u90E8 hydration
- \u6570\u636E\uFF1ACDN + \u8F7B\u91CF BFF

\u9002\u5408\uFF1A\u9700\u8981\u641C\u7D22\u66DD\u5149\u548C\u9AD8\u9996\u5C4F\u7A33\u5B9A\u6027\u7684\u9875\u9762\u3002

## 2.2 \u540E\u53F0\u4E0E\u4E2D\u53F0

- \u6E32\u67D3\uFF1ASPA
- \u6570\u636E\uFF1ABFF/\u7F51\u5173\u805A\u5408
- \u72B6\u6001\uFF1A\u670D\u52A1\u7AEF\u72B6\u6001\u4E0E\u672C\u5730\u72B6\u6001\u5206\u5C42

\u9002\u5408\uFF1A\u91CD\u4EA4\u4E92\u3001\u4F4E SEO \u8BC9\u6C42\u3001\u590D\u6742\u6743\u9650\u3002

## 2.3 \u591A\u56E2\u961F\u5E76\u884C\u7CFB\u7EDF

- \u7EC4\u7EC7\uFF1A\u6A21\u5757\u5316\u4F18\u5148\uFF0C\u5FAE\u524D\u7AEF\u8C28\u614E
- \u5171\u4EAB\uFF1ADesign Token / \u7EC4\u4EF6\u5951\u7EA6 / API \u5951\u7EA6
- \u53D1\u5E03\uFF1A\u4E3B\u5E94\u7528\u7F16\u6392 + \u5B50\u6A21\u5757\u7070\u5EA6

\u9002\u5408\uFF1A\u7EC4\u7EC7\u590D\u6742\u5EA6\u9AD8\u4E8E\u9875\u9762\u590D\u6742\u5EA6\u7684\u56E2\u961F\u3002

## 3. \u4E00\u4E2A\u53EF\u6267\u884C\u7684 ADR \u6A21\u677F

\`\`\`text
Context:
Options:
Decision:
Trade-offs:
Rollback Plan:
Success Metrics:
\`\`\`

## 4. \u67B6\u6784\u5347\u7EA7\u8282\u594F

1. \u5148\u5C40\u90E8\u8BD5\u70B9\uFF0C\u4E0D\u8981\u5168\u7AD9\u8FC1\u79FB
2. \u5148\u505A\u5EA6\u91CF\uFF0C\u518D\u505A\u4F18\u5316
3. \u5148\u5EFA\u56DE\u6EDA\u65B9\u6848\uFF0C\u518D\u4E0A\u7EBF\u65B0\u67B6\u6784

## 5. \u7ED3\u8BBA

\u597D\u67B6\u6784\u4E0D\u662F\u201C\u6280\u672F\u6808\u6E05\u5355\u201D\uFF0C\u800C\u662F\u201C\u51B3\u7B56\u8D28\u91CF + \u53EF\u56DE\u6EDA\u80FD\u529B\u201D\u3002
`,cp=`# \u524D\u7AEF\u5DE5\u7A0B\u7406\u5FF5\uFF1A\u5FEB\u3001\u7A33\u3001\u7B80\uFF0C\u4E0D\u505A\u65E0\u6548\u590D\u6742\u5316

\u6280\u672F\u9009\u62E9\u6709\u6F6E\u6D41\uFF0C\u4F46\u5DE5\u7A0B\u6709\u5E95\u5C42\u89C4\u5F8B\u3002

## 1. \u5FEB\uFF1A\u4EA4\u4ED8\u901F\u5EA6\u662F\u7ADE\u4E89\u529B

- \u5FEB\u4E0D\u662F\u201C\u4E71\u6539\u201D\uFF0C\u800C\u662F\u201C\u53EF\u9A8C\u8BC1\u5730\u5FEB\u201D
- \u6BCF\u6B21\u6539\u52A8\u90FD\u8981\u6709\u6784\u5EFA\u3001\u6D4B\u8BD5\u3001\u56DE\u5F52\u8BC1\u636E
- \u901F\u5EA6\u6765\u81EA\u6807\u51C6\u5316\u6D41\u7A0B\uFF0C\u800C\u4E0D\u662F\u4E2A\u4EBA hero

## 2. \u7A33\uFF1A\u7A33\u5B9A\u6027\u4F18\u5148\u4E8E\u70AB\u6280

- \u6709\u964D\u7EA7\u8DEF\u5F84\u518D\u4E0A\u65B0\u80FD\u529B
- \u5173\u952E\u94FE\u8DEF\u5FC5\u987B\u53EF\u89C2\u6D4B\uFF08\u65E5\u5FD7\u3001\u57CB\u70B9\u3001\u9519\u8BEF\u805A\u5408\uFF09
- \u7EBF\u4E0A\u7B56\u7565\u4F18\u5148\u7070\u5EA6\uFF0C\u4E0D\u505A\u4E00\u5200\u5207\u53D1\u5E03

## 3. \u7B80\uFF1A\u590D\u6742\u5EA6\u662F\u957F\u671F\u6210\u672C

- \u4E00\u4E2A\u9700\u6C42\uFF0C\u4F18\u5148\u6700\u77ED\u53EF\u7528\u8DEF\u5F84
- \u80FD\u5220\u7684\u62BD\u8C61\u5C31\u5220\uFF0C\u80FD\u5C11\u7684\u5C42\u7EA7\u5C31\u5C11
- \u67B6\u6784\u5347\u7EA7\u8981\u53EF\u56DE\u6EDA\uFF0C\u4E0D\u53EF\u9006\u5C31\u662F\u98CE\u9669

## 4. \u56E2\u961F\u534F\u4F5C\u54F2\u5B66

- \u4EE3\u7801\u662F\u7ED9\u56E2\u961F\u7EF4\u62A4\uFF0C\u4E0D\u662F\u7ED9\u4F5C\u8005\u70AB\u6280
- \u6587\u6863\u4E0D\u662F\u9644\u5C5E\u7269\uFF0C\u662F\u4EA4\u4ED8\u7269
- \u8BC4\u5BA1\u5173\u6CE8\u201C\u98CE\u9669\u4E0E\u9A8C\u8BC1\u201D\uFF0C\u4E0D\u662F\u8BED\u6CD5\u504F\u597D

## 5. \u7ED9\u524D\u7AEF\u56E2\u961F\u7684 5 \u6761\u539F\u5219

1. \u6307\u6807\u5148\u884C\uFF1A\u5148\u91CF\u5316\u518D\u4F18\u5316
2. \u5206\u5C42\u6CBB\u7406\uFF1AUI\u3001\u72B6\u6001\u3001\u6570\u636E\u3001\u6784\u5EFA\u5404\u7BA1\u5404\u7684\u590D\u6742\u5EA6
3. \u53EF\u56DE\u6EDA\u4F18\u5148\uFF1A\u4EFB\u4F55\u6539\u52A8\u5FC5\u987B\u53EF\u64A4\u56DE
4. \u81EA\u52A8\u5316\u4F18\u5148\uFF1A\u91CD\u590D\u52A8\u4F5C\u4EA4\u7ED9\u811A\u672C
5. \u7528\u6237\u4F53\u9A8C\u4F18\u5148\uFF1A\u6027\u80FD\u3001\u53EF\u8BBF\u95EE\u6027\u3001\u7A33\u5B9A\u6027\u662F\u4EA7\u54C1\u80FD\u529B

## 6. \u7ED3\u8BED

\u524D\u7AEF\u5DE5\u7A0B\u4E0D\u662F\u201C\u6846\u67B6\u7ADE\u8D5B\u201D\uFF0C\u800C\u662F\u201C\u6301\u7EED\u4EA4\u4ED8\u80FD\u529B\u5EFA\u8BBE\u201D\u3002
`,up=`# 2026 \u524D\u7AEF\u70ED\u70B9\u5B9E\u6218\u56FE\uFF1A\u600E\u4E48\u7528\u3001\u4F55\u65F6\u7528\u3001\u4E3A\u4EC0\u4E48\u7528

\u8FD9\u7BC7\u6587\u7AE0\u4E0D\u662F\u201C\u70ED\u70B9\u7F57\u5217\u201D\uFF0C\u800C\u662F\u628A\u70ED\u70B9\u8F6C\u6210\u53EF\u6267\u884C\u7B56\u7565\u3002

## 1. \u4ECA\u5E74\u503C\u5F97\u5173\u6CE8\u7684 4 \u4E2A\u65B9\u5411

## 1.1 TypeScript \u5DF2\u6210\u4E3A\u9ED8\u8BA4\u8BED\u8A00\u5C42

\u5728 State of JS 2024 \u7684 Usage \u7ED3\u679C\u91CC\uFF0CTS \u5360\u6BD4\u5DF2\u7ECF\u8FDB\u5165\u4E3B\u6D41\u9636\u6BB5\u3002  
\u7ED3\u8BBA\uFF1A\u65B0\u9879\u76EE\u9ED8\u8BA4 TS\uFF0C\u4E0D\u518D\u8BA8\u8BBA\u201C\u8981\u4E0D\u8981\u4E0A\u201D\uFF0C\u53EA\u8BA8\u8BBA\u201C\u7C7B\u578B\u8FB9\u754C\u600E\u4E48\u5212\u201D\u3002

\u843D\u5730\u5EFA\u8BAE\uFF1A

- UI \u5C42\uFF1A\u7EC4\u4EF6 Props / \u4E8B\u4EF6 / \u8DEF\u7531\u53C2\u6570\u5168\u90E8\u663E\u5F0F\u7C7B\u578B
- \u6570\u636E\u5C42\uFF1AAPI DTO \u4E0E Domain Model \u5206\u79BB
- \u5DE5\u5177\u5C42\uFF1A\u516C\u5171 util \u5148\u5199\u7C7B\u578B\u518D\u5199\u5B9E\u73B0

## 1.2 \u6E32\u67D3\u67B6\u6784\u4ECE\u201C\u4E8C\u9009\u4E00\u201D\u8D70\u5411\u201C\u6DF7\u5408\u201D

State of JS 2024 \u663E\u793A SPA \u4E0E SSR \u4ECD\u662F\u6700\u5E38\u7528\u6A21\u5F0F\uFF0C\u540C\u65F6 Partial Hydration / Islands \u5728\u589E\u957F\u3002  
\u7ED3\u8BBA\uFF1A\u67B6\u6784\u4E0D\u8BE5\u7AD9\u961F\uFF0C\u800C\u662F\u6309\u9875\u9762\u76EE\u6807\u5206\u5C42\u3002

\u843D\u5730\u5EFA\u8BAE\uFF1A

- \u8425\u9500/\u5185\u5BB9\u9875\uFF1ASSR/SSG + Islands
- \u4E1A\u52A1\u540E\u53F0\uFF1ASPA \u4F18\u5148\uFF0C\u5173\u952E\u5165\u53E3\u505A SSR
- \u91CD\u4EA4\u4E92\u533A\u57DF\uFF1A\u5C40\u90E8 hydration\uFF0C\u907F\u514D\u5168\u7AD9\u91CD JS

## 1.3 Vite \u5DE5\u5177\u94FE\u8FDB\u5165\u65B0\u9636\u6BB5

Vite \u5B98\u65B9\u5728 2026 \u5E74\u53D1\u5E03\u4E86 Vite 8\uFF0C\u6838\u5FC3\u53D8\u5316\u662F Rolldown \u7EDF\u4E00\u6784\u5EFA\u94FE\u8DEF\u3002  
\u7ED3\u8BBA\uFF1A\u524D\u7AEF\u56E2\u961F\u8981\u628A\u201C\u6784\u5EFA\u901F\u5EA6\u201D\u5F53\u7814\u53D1\u6548\u7387 KPI\u3002

\u843D\u5730\u5EFA\u8BAE\uFF1A

- \u5148\u505A\u57FA\u7EBF\uFF1A\u8BB0\u5F55 \`dev cold start\`\u3001\`build time\`\u3001\`HMR\`
- \u518D\u505A\u8FC1\u79FB\uFF1A\u5148\u6E05\u7406\u5386\u53F2\u63D2\u4EF6\uFF0C\u518D\u5347\u7EA7\u4E3B\u7248\u672C
- \u6700\u540E\u56FA\u5316\uFF1A\u628A\u6784\u5EFA\u6307\u6807\u63A5\u8FDB CI \u62A5\u544A

## 1.4 View Transitions \u4ECE\u201C\u70AB\u6280\u201D\u53D8\u6210\u201C\u4F53\u9A8C\u57FA\u7840\u8BBE\u65BD\u201D

Chrome 2025/2026 \u8FDE\u7EED\u66F4\u65B0 View Transitions\uFF0C\u8DE8\u6587\u6863\u4E0E\u7EC6\u7C92\u5EA6\u80FD\u529B\u6301\u7EED\u589E\u5F3A\u3002  
\u7ED3\u8BBA\uFF1A\u9875\u9762\u5207\u6362\u52A8\u753B\u4E0D\u518D\u53EA\u9760\u6846\u67B6\u79C1\u6709\u65B9\u6848\uFF0C\u53EF\u8D70\u5E73\u53F0\u6807\u51C6\u80FD\u529B\u3002

\u843D\u5730\u5EFA\u8BAE\uFF1A

- \u4F18\u5148\u7528\u4E8E\u5217\u8868\u5230\u8BE6\u60C5\u3001\u7B5B\u9009\u5207\u6362\u3001\u5BFC\u822A\u8FC7\u6E21
- \u5148\u505A\u964D\u7EA7\u5206\u652F\uFF1A\u4E0D\u652F\u6301 API \u65F6\u4FDD\u6301\u529F\u80FD\u6B63\u5E38
- \u52A8\u753B\u9884\u7B97\u63A7\u5236\u5728\u201C\u53EF\u611F\u77E5\u4F46\u4E0D\u6253\u65AD\u201D

## 2. \u56E2\u961F\u6267\u884C\u7248\uFF1A30 \u5929\u5347\u7EA7\u8DEF\u5F84

1. \u7B2C 1 \u5468\uFF1A\u6536\u96C6\u73B0\u72B6\u6307\u6807\uFF08\u6784\u5EFA\u3001\u5305\u4F53\u79EF\u3001\u9996\u5C4F\uFF09
2. \u7B2C 2 \u5468\uFF1A\u9009\u4E00\u4E2A\u9875\u9762\u505A\u6DF7\u5408\u6E32\u67D3\u8BD5\u70B9
3. \u7B2C 3 \u5468\uFF1A\u63A5\u5165 View Transitions \u5230\u6838\u5FC3\u8DEF\u5F84
4. \u7B2C 4 \u5468\uFF1A\u590D\u76D8\u5E76\u6C89\u6DC0 ADR\uFF08\u67B6\u6784\u51B3\u7B56\u8BB0\u5F55\uFF09

## 3. \u4E00\u53E5\u8BDD\u603B\u7ED3

\u70ED\u70B9\u672C\u8EAB\u4E0D\u503C\u94B1\uFF0C**\u628A\u70ED\u70B9\u53D8\u6210\u53EF\u590D\u5236\u7684\u5DE5\u7A0B\u52A8\u4F5C**\u624D\u503C\u94B1\u3002

## \u53C2\u8003

- State of JS 2024 Usage: https://2024.stateofjs.com/en-US/usage/
- Vite Blog\uFF08Vite 8\uFF09: https://vite.dev/blog/announcing-vite8
- Chrome View Transitions\uFF082025/2026\uFF09: https://developer.chrome.com/blog/view-transitions-in-2025
`,fp=`# \u65E7\u7AD9\u5185\u5BB9\u5F52\u6863

\u672C\u9875\u5F52\u6863 \`origin/gh-pages\` \u5206\u652F\u4E2D\u7684\u5173\u952E\u4FE1\u606F\uFF0C\u4F5C\u4E3A\u8FC1\u79FB\u8BB0\u5F55\u3002

## \u539F\u59CB\u9996\u9875\u5185\u5BB9

\`\`\`text
################################
##    #####  #   #   #    #   ##
##    #       # #     #  #    ##
##    ###      #       #      ##
##    #        #       #      ##
################################
\`\`\`

## \u539F\u59CB\u7AD9\u70B9\u914D\u7F6E\uFF08\u8282\u9009\uFF09

- title: \`Self\`
- description: \`Introduction\`
- theme: \`jekyll-theme-cayman\`

## \u8FC1\u79FB\u8BF4\u660E

- \u65E7\u7AD9\u4E3A\u65E9\u671F\u9759\u6001\u5185\u5BB9 + \u7B80\u5355\u6837\u5F0F\u3002
- \u65B0\u7AD9\u7EDF\u4E00\u8FC1\u79FB\u5230 VuePress v2 \u6587\u6863\u7ED3\u6784\u3002
- \u540E\u7EED\u6587\u7AE0\u4ECE \`pattern/\` \u6301\u7EED\u6269\u5C55\uFF0C\u4E0D\u518D\u7EF4\u62A4\u65E7 Jekyll \u914D\u7F6E\u3002
`,lp=`# \u4E2D\u4ECB\u8005\u6A21\u5F0F\uFF08Mediator\uFF09

\u672C\u9875\u5185\u5BB9\u6765\u81EA \`pattern/Mediator.md\` \u7684\u91CD\u6392\u4E0E\u63D0\u70BC\u3002

## \u6A21\u5F0F\u76EE\u6807

\u4E2D\u4ECB\u8005\u6A21\u5F0F\u901A\u8FC7\u201C\u4E2D\u5FC3\u534F\u8C03\u5BF9\u8C61\u201D\u7BA1\u7406\u591A\u4E2A\u6A21\u5757\u7684\u4EA4\u4E92\uFF0C\u907F\u514D\u5BF9\u8C61\u4E4B\u95F4\u4E92\u76F8\u76F4\u63A5\u4F9D\u8D56\u3002

\u5E38\u89C1\u7C7B\u6BD4\uFF1A
- \u673A\u573A\u5854\u53F0\u7EDF\u4E00\u534F\u8C03\u8D77\u964D
- \u4E8B\u4EF6\u59D4\u6258\u4E2D\u7531\u4E0A\u5C42\u8282\u70B9\u7EDF\u4E00\u5904\u7406\u4EA4\u4E92

## \u4F55\u65F6\u4F7F\u7528

- \u6A21\u5757\u5173\u7CFB\u590D\u6742\uFF0C\u8C03\u7528\u94FE\u96BE\u7EF4\u62A4
- \u4E00\u4E2A\u6D41\u7A0B\u6D89\u53CA\u591A\u4E2A\u5BF9\u8C61\u5E76\u5E26\u6709\u72B6\u6001\u5224\u65AD
- \u5E0C\u671B\u628A\u5DE5\u4F5C\u6D41\u903B\u8F91\u96C6\u4E2D\u5728\u5355\u4E00\u5165\u53E3

## \u7B80\u5316\u793A\u4F8B

\`\`\`js
var orgChart = {
  addNewEmployee: function () {
    var employeeDetail = this.getEmployeeDetail()

    employeeDetail.on('complete', function (employee) {
      var managerSelector = this.selectManager(employee)
      managerSelector.on('save', function (employee) {
        employee.save()
      })
    })
  },
}
\`\`\`

\u8FD9\u91CC\u7684 \`orgChart\` \u4E0D\u662F\u6570\u636E\u5B9E\u4F53\uFF0C\u800C\u662F\u6D41\u7A0B\u4E2D\u67A2\uFF1A
- \u76D1\u542C\u4E00\u4E2A\u9636\u6BB5\u7ED3\u675F
- \u51B3\u5B9A\u4E0B\u4E00\u9636\u6BB5\u5BF9\u8C61
- \u4E32\u8D77\u540E\u7EED\u52A8\u4F5C

## \u4E0E Event Aggregator \u7684\u5173\u7CFB

- \u76F8\u540C\u70B9\uFF1A\u90FD\u53EF\u80FD\u4F7F\u7528\u4E8B\u4EF6\u4F5C\u4E3A\u901A\u4FE1\u673A\u5236\u3002
- \u4E0D\u540C\u70B9\uFF1AMediator \u5F3A\u8C03\u201C\u4E1A\u52A1\u6D41\u7A0B\u534F\u8C03\u201D\uFF0CEvent Aggregator \u5F3A\u8C03\u201C\u4E8B\u4EF6\u5206\u53D1\u901A\u9053\u201D\u3002

\u4E8C\u8005\u5B9E\u73B0\u5F62\u5F0F\u53EF\u80FD\u76F8\u4F3C\uFF0C\u4F46\u8BBE\u8BA1\u610F\u56FE\u4E0D\u540C\u3002
`,pp=`# Observer \u4E0E Publish/Subscribe

\u8FD9\u7BC7\u5185\u5BB9\u6574\u7406\u81EA \`pattern/Publish.md\`\uFF0C\u5E76\u505A\u4E86\u7ED3\u6784\u5316\u7CBE\u7B80\u3002

## \u6838\u5FC3\u5DEE\u5F02

- Observer\uFF1A\u89C2\u5BDF\u8005\u76F4\u63A5\u8BA2\u9605\u76EE\u6807\u5BF9\u8C61\uFF0C\u76EE\u6807\u5BF9\u8C61\u4E3B\u52A8\u901A\u77E5\u89C2\u5BDF\u8005\u3002
- Publish/Subscribe\uFF1A\u53D1\u5E03\u8005\u548C\u8BA2\u9605\u8005\u901A\u8FC7\u4E8B\u4EF6\u901A\u9053\u89E3\u8026\uFF0C\u5F7C\u6B64\u4E0D\u76F4\u63A5\u4F9D\u8D56\u3002

## \u4E3A\u4EC0\u4E48\u8981\u7528\u5B83

- \u964D\u4F4E\u6A21\u5757\u95F4\u8026\u5408\uFF0C\u4E8B\u4EF6\u9A71\u52A8\u6269\u5C55\u6210\u672C\u4F4E\u3002
- \u9002\u5408\u4E00\u4E2A\u52A8\u4F5C\u89E6\u53D1\u591A\u4E2A\u540E\u7EED\u5904\u7406\uFF08\u65E5\u5FD7\u3001UI\u3001\u7EDF\u8BA1\uFF09\u3002

## \u4EE3\u4EF7\u4E0E\u98CE\u9669

- \u8C03\u7528\u94FE\u53D8\u957F\uFF0C\u8C03\u8BD5\u590D\u6742\u5EA6\u4E0A\u5347\u3002
- \u53D1\u5E03\u8005\u901A\u5E38\u4E0D\u77E5\u9053\u8BA2\u9605\u8005\u6267\u884C\u662F\u5426\u6210\u529F\u3002

## \u7B80\u5316\u793A\u4F8B

\`\`\`js
var pubsub = {}

;(function (myObject) {
  var topics = {}
  var subUid = -1

  myObject.publish = function (topic, args) {
    if (!topics[topic]) return false
    var subscribers = topics[topic]
    for (var i = subscribers.length - 1; i >= 0; i--) {
      subscribers[i].func(topic, args)
    }
    return this
  }

  myObject.subscribe = function (topic, func) {
    if (!topics[topic]) topics[topic] = []
    var token = (++subUid).toString()
    topics[topic].push({ token: token, func: func })
    return token
  }
})(pubsub)
\`\`\`

## \u9605\u8BFB\u5EFA\u8BAE

\u5148\u770B [\u4E2D\u4ECB\u8005\u6A21\u5F0F](/blog/mediator-pattern.html)\uFF0C\u518D\u5BF9\u6BD4\u4E24\u8005\u201C\u4E8B\u4EF6\u7ED3\u6784\u76F8\u4F3C\u4F46\u610F\u56FE\u4E0D\u540C\u201D\u7684\u90E8\u5206\uFF0C\u4F1A\u66F4\u6E05\u6670\u3002
`,dp=`# H5 \`launch-app\`\uFF1A\u5FAE\u4FE1\u5F00\u653E\u6807\u7B7E \`wx-open-launch-app\` \u539F\u7406\u4E0E\u5B9E\u6218

\u5728\u5FAE\u4FE1\u5185\u7F6E\u6D4F\u89C8\u5668\u91CC\uFF0C\u666E\u901A H5 \u7684 \`scheme\` \u5524\u8D77\u5E38\u5E38\u4F1A\u88AB\u9650\u5236\u3002  
\u8981\u7A33\u5B9A\u5730\u4ECE H5 \u6253\u5F00 App\uFF0C\u5B98\u65B9\u8DEF\u5F84\u662F\u5FAE\u4FE1\u5F00\u653E\u6807\u7B7E\uFF1A\`wx-open-launch-app\`\u3002

\u8FD9\u7BC7\u6587\u7AE0\u4E0D\u53EA\u8BB2\u201C\u600E\u4E48\u5199\u4EE3\u7801\u201D\uFF0C\u91CD\u70B9\u8BB2\u6E05\u695A\u5B83\u7684\u5DE5\u4F5C\u539F\u7406\u3002

## 1. \u4E3A\u4EC0\u4E48\u8981\u7528\u5F00\u653E\u6807\u7B7E

\u4F20\u7EDF H5 \u5524\u7AEF\u4E00\u822C\u4F9D\u8D56\uFF1A

- URL Scheme
- Universal Link\uFF08iOS\uFF09
- \u5E94\u7528\u5E02\u573A\u515C\u5E95\u9875

\u4F46\u5728\u5FAE\u4FE1 WebView \u4E2D\uFF0C\u8FD9\u7C7B\u65B9\u5F0F\u7ECF\u5E38\u53D7\u9650\u3002  
\`wx-open-launch-app\` \u7684\u6838\u5FC3\u4EF7\u503C\u662F\uFF1A**\u628A\u201C\u5524\u7AEF\u52A8\u4F5C\u201D\u4EA4\u7ED9\u5FAE\u4FE1\u5BA2\u6237\u7AEF\u6267\u884C**\uFF0C\u800C\u4E0D\u662F\u8BA9\u7F51\u9875\u76F4\u63A5\u8DF3\u7CFB\u7EDF\u80FD\u529B\u3002

## 2. \u539F\u7406\u62C6\u89E3\uFF1A\u4E09\u5C42\u6A21\u578B

\u53EF\u4EE5\u628A\u6574\u4E2A\u673A\u5236\u7406\u89E3\u4E3A\u4E09\u5C42\uFF1A

1. \u6743\u9650\u5C42\uFF08\u8C01\u6709\u8D44\u683C\u8C03\u7528\uFF09
2. \u6E32\u67D3\u5C42\uFF08\u6807\u7B7E\u5982\u4F55\u88AB\u5FAE\u4FE1\u8BC6\u522B\uFF09
3. \u5524\u8D77\u5C42\uFF08\u70B9\u51FB\u540E\u5982\u4F55\u6253\u5F00 App\uFF09

### 2.1 \u6743\u9650\u5C42\uFF1AJS-SDK \u7B7E\u540D\u6821\u9A8C

\u9875\u9762\u5FC5\u987B\u5148\u5B8C\u6210 \`wx.config\`\uFF0C\u5E76\u4E14\u628A \`wx-open-launch-app\` \u653E\u8FDB \`openTagList\`\u3002  
\u8FD9\u4E00\u6B65\u672C\u8D28\u662F\u544A\u8BC9\u5FAE\u4FE1\uFF1A

- \u5F53\u524D\u9875\u9762\u57DF\u540D\u5408\u6CD5
- \u5F53\u524D\u7B7E\u540D\u5408\u6CD5
- \u5F53\u524D\u9875\u9762\u88AB\u5141\u8BB8\u4F7F\u7528\u5F00\u653E\u6807\u7B7E\u80FD\u529B

\u5982\u679C\u7B7E\u540D\u5931\u8D25\u3001\u57DF\u540D\u672A\u914D\u7F6E\uFF0C\u6807\u7B7E\u901A\u5E38\u4E0D\u4F1A\u6B63\u5E38\u751F\u6548\u3002

### 2.2 \u6E32\u67D3\u5C42\uFF1A\u5FAE\u4FE1\u5BA2\u6237\u7AEF\u63A5\u7BA1\u6807\u7B7E

\`wx-open-launch-app\` \u4E0D\u662F\u666E\u901A HTML \u7EC4\u4EF6\uFF0C\u5B83\u7531\u5FAE\u4FE1\u5BA2\u6237\u7AEF\u8BC6\u522B\u5E76\u63A5\u7BA1\u3002  
\u4F60\u5199\u5728\u9875\u9762\u91CC\u7684\u6807\u7B7E\uFF0C\u66F4\u50CF\u662F\u4E00\u4E2A\u201C\u58F0\u660E\u5F0F\u6307\u4EE4\u201D\uFF1A

- \u544A\u8BC9\u5FAE\u4FE1\u201C\u8FD9\u4E2A\u533A\u57DF\u662F\u5524\u7AEF\u6309\u94AE\u201D
- \u544A\u8BC9\u5FAE\u4FE1\u201C\u76EE\u6807 App \u662F\u54EA\u4E2A\uFF08\`appid\`\uFF09\u201D
- \u53EF\u4F20 \`extinfo\` \u7ED9 App \u4F5C\u4E3A\u8DEF\u7531\u53C2\u6570

### 2.3 \u5524\u8D77\u5C42\uFF1A\u70B9\u51FB\u89E6\u53D1\u5BA2\u6237\u7AEF\u80FD\u529B

\u7528\u6237\u70B9\u51FB\u540E\uFF0C\u5FAE\u4FE1\u5BA2\u6237\u7AEF\u5C1D\u8BD5\u6253\u5F00\u76EE\u6807 App\uFF1A

- \u5DF2\u5B89\u88C5\uFF1A\u76F4\u63A5\u62C9\u8D77\uFF0C\u5E76\u628A \`extinfo\` \u5E26\u8FC7\u53BB
- \u672A\u5B89\u88C5/\u4E0D\u53EF\u62C9\u8D77\uFF1A\u6839\u636E\u5E73\u53F0\u7B56\u7565\u8D70\u5931\u8D25\u5206\u652F\u6216\u515C\u5E95\u903B\u8F91

\u6240\u4EE5\u5B83\u4E0D\u662F\u201C\u524D\u7AEF JS \u76F4\u63A5\u5524\u7AEF\u201D\uFF0C\u800C\u662F**\u5FAE\u4FE1\u5BA2\u6237\u7AEF\u4EE3\u7406\u5524\u7AEF**\u3002

## 3. \u5173\u952E\u94FE\u8DEF\uFF08\u4ECE 0 \u5230 1\uFF09

## 3.1 \u540E\u7AEF\uFF1A\u751F\u6210\u7B7E\u540D\u53C2\u6570

\u540E\u7AEF\u901A\u5E38\u63D0\u4F9B\u4E00\u4E2A\u7B7E\u540D\u63A5\u53E3\uFF0C\u8FD4\u56DE\uFF1A

- \`appId\`\uFF08\u516C\u4F17\u53F7 AppID\uFF09
- \`timestamp\`
- \`nonceStr\`
- \`signature\`

\u524D\u7AEF\u62FF\u5230\u540E\u6267\u884C \`wx.config\`\u3002

## 3.2 \u524D\u7AEF\uFF1A\u521D\u59CB\u5316 JS-SDK

\`\`\`html
<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"><\/script>
<script>
  wx.config({
    debug: false,
    appId: sign.appId,
    timestamp: sign.timestamp,
    nonceStr: sign.nonceStr,
    signature: sign.signature,
    jsApiList: [],
    openTagList: ['wx-open-launch-app']
  })
  wx.ready(() => {
    console.log('wx sdk ready')
  })
  wx.error((err) => {
    console.error('wx config error', err)
  })
<\/script>
\`\`\`

## 3.3 \u9875\u9762\uFF1A\u5F00\u653E\u6807\u7B7E\u58F0\u660E

\`\`\`html
<wx-open-launch-app appid="\u5F00\u653E\u5E73\u53F0\u79FB\u52A8\u5E94\u7528AppID" extinfo='{"page":"detail","id":"1001"}'>
  <script type="text/wxtag-template">
    <style>
      .open-btn {
        width: 220px;
        line-height: 44px;
        text-align: center;
        border-radius: 999px;
        background: #07c160;
        color: #fff;
        font-weight: 600;
      }
    </style>
    <div class="open-btn">\u6253\u5F00 App \u67E5\u770B\u8BE6\u60C5</div>
  <\/script>
</wx-open-launch-app>
\`\`\`

> \u5E38\u89C1\u8BEF\u533A\uFF1A\`wx.config\` \u91CC\u7684 \`appId\` \u548C\u6807\u7B7E\u5185 \`appid\` \u4E0D\u662F\u540C\u4E00\u4E2A\u6982\u5FF5\uFF0C\u524D\u8005\u662F\u516C\u4F17\u53F7\uFF0C\u540E\u8005\u662F\u5F00\u653E\u5E73\u53F0\u79FB\u52A8\u5E94\u7528\u3002

## 3.4 \u57FA\u4E8E \`launch-app\` \u7EC4\u4EF6\u7684\u5B9E\u6218\u4EE3\u7801\uFF08H5 \u9879\u76EE\uFF09

\u4E0B\u9762\u8FD9\u7248\u662F\u7EC4\u4EF6\u5316\u5199\u6CD5\uFF0C\u9002\u5408\u771F\u5B9E\u4E1A\u52A1\u590D\u7528\u3002

### \u7EC4\u4EF6\u6A21\u677F\uFF08\u6838\u5FC3\uFF09

\`\`\`vue
<template>
  <div :id="idName" ref="root" class="pos-relative" @click="$emit('click')">
    <Loading v-if="isAndroidWechat && !showOpenTag" size="20" />
    <slot>{{ text }}</slot>

    <wx-open-launch-app
      v-if="showOpenTag"
      :id="idName"
      appid="\u4F60\u7684\u79FB\u52A8\u5E94\u7528AppID"
      class="wrapper"
      :style="rootSizeStyle"
      :extinfo="wxExtInfo"
      @error="onWxLaunchError"
      @launch="onWxLaunchSuccess"
    >
      <script type="text/wxtag-template">
        <style>
          .btn {
            display: block;
            width: {{ rootWidth }}px;
            height: {{ rootHeight }}px;
            color: transparent;
          }
        </style>
        <div class="btn">{{ text }}</div>
      <\/script>
    </wx-open-launch-app>
  </div>
</template>
\`\`\`

### \u7EC4\u4EF6\u903B\u8F91\uFF08\u5173\u952E\u70B9\uFF09

\`\`\`js
computed: {
  showOpenTag() {
    return this.wxConfigReady && this.isAndroidWechat
  },
  wxExtInfo() {
    const raw = this?.getExt?.() || this.$route.query.type || ''
    return encodeURIComponent(raw)
  }
},
methods: {
  onWxLaunchError() {
    // \u5524\u7AEF\u5931\u8D25\u515C\u5E95\u5230\u5E94\u7528\u5B9D
    window.location.replace('https://a.app.qq.com/o/simple.jsp?pkgname=\u4F60\u7684\u5305\u540D')
  },
  initWechatConfig() {
    wx?.ready(() => {
      this.wxConfigReady = true
    })
  }
}
\`\`\`

### JS-SDK \u914D\u7F6E\uFF08\u5FC5\u987B\u5305\u542B \`openTagList\`\uFF09

\`\`\`js
wx.config({
  debug: false,
  appId: WECHAT_APP_ID,
  timestamp,
  nonceStr,
  signature,
  jsApiList: ['checkJsApi'],
  openTagList: ['wx-open-launch-app']
})
\`\`\`

### Vue \u8BC6\u522B\u5F00\u653E\u6807\u7B7E\uFF08\u907F\u514D\u88AB\u5F53\u6210\u672A\u77E5\u5143\u7D20\u62A5\u9519\uFF09

\`\`\`js
Vue.config.ignoredElements = ['wx-open-launch-app']
\`\`\`

### \u8FD9\u5957\u5B9E\u73B0\u7684\u8BBE\u8BA1\u610F\u56FE

1. \u4EC5\u5728 Android \u5FAE\u4FE1\u663E\u793A\u5F00\u653E\u6807\u7B7E\uFF0C\u5176\u4ED6\u7AEF\u8D70\u964D\u7EA7\u903B\u8F91\u3002
2. \u628A \`extinfo\` \u5F53\u8DEF\u7531\u53C2\u6570\u901A\u9053\uFF0C\u524D\u540E\u7AEF\u7EA6\u5B9A\u7EDF\u4E00\u683C\u5F0F\u3002
3. \`error\` \u4E8B\u4EF6\u5F3A\u5236\u515C\u5E95\u4E0B\u8F7D\uFF0C\u51CF\u5C11\u201C\u6309\u94AE\u53EF\u89C1\u4F46\u65E0\u54CD\u5E94\u201D\u4F53\u9A8C\u3002
4. \u7528\u7EC4\u4EF6\u5C01\u88C5\u7EDF\u4E00\u5524\u7AEF\u884C\u4E3A\uFF0C\u4E1A\u52A1\u9875\u53EA\u5173\u5FC3\u4F20\u53C2\u548C\u6837\u5F0F\u3002

## 4. \u65F6\u5E8F\u56FE\uFF08\u7B80\u5316\u7248\uFF09

1. H5 \u8BF7\u6C42\u540E\u7AEF\u7B7E\u540D
2. H5 \u6267\u884C \`wx.config\`
3. \u5FAE\u4FE1\u6821\u9A8C\u7B7E\u540D + \u57DF\u540D\u6743\u9650
4. \u5FAE\u4FE1\u63A5\u7BA1 \`wx-open-launch-app\` \u6807\u7B7E
5. \u7528\u6237\u70B9\u51FB
6. \u5FAE\u4FE1\u5BA2\u6237\u7AEF\u5C1D\u8BD5\u62C9\u8D77 App \u5E76\u4F20\u9012 \`extinfo\`

## 5. \u6392\u969C\u6E05\u5355\uFF08\u6700\u5E38\u89C1\uFF09

\u5982\u679C\u6309\u94AE\u4E0D\u663E\u793A/\u70B9\u51FB\u65E0\u6548\uFF0C\u4F18\u5148\u68C0\u67E5\uFF1A

1. \u9875\u9762\u662F\u5426\u5728\u5FAE\u4FE1\u5185\u6253\u5F00
2. \u7B7E\u540D URL \u662F\u5426\u4E0E\u5F53\u524D\u9875\u9762 URL \u5B8C\u5168\u4E00\u81F4\uFF08\u542B query \u89C4\u5219\uFF09
3. \u516C\u4F17\u53F7\u57DF\u540D\u4E0E JS \u5B89\u5168\u57DF\u540D\u662F\u5426\u914D\u7F6E\u6B63\u786E
4. \`openTagList\` \u662F\u5426\u5305\u542B \`wx-open-launch-app\`
5. \`appid\` \u662F\u5426\u586B\u6210\u4E86\u79FB\u52A8\u5E94\u7528 AppID\uFF08\u800C\u4E0D\u662F\u516C\u4F17\u53F7 AppID\uFF09
6. \u76EE\u6807 App \u662F\u5426\u5728\u5F00\u653E\u5E73\u53F0\u5B8C\u6210\u5173\u8054\u914D\u7F6E
7. \`extinfo\` \u662F\u5426\u8FC7\u957F\u6216\u683C\u5F0F\u9519\u8BEF\uFF08\u5EFA\u8BAE JSON \u5B57\u7B26\u4E32\uFF09

## 6. \u5DE5\u7A0B\u5316\u5EFA\u8BAE

- \u628A\u5524\u7AEF\u6309\u94AE\u5C01\u88C5\u6210\u7EDF\u4E00\u7EC4\u4EF6\uFF0C\u5185\u7F6E\u76D1\u63A7\u57CB\u70B9\uFF08\u5C55\u793A\u3001\u70B9\u51FB\u3001\u6210\u529F\u3001\u5931\u8D25\uFF09\u3002
- \`extinfo\` \u53EA\u4F20\u8DEF\u7531\u952E\u548C\u4E1A\u52A1 ID\uFF0C\u4E0D\u4F20\u654F\u611F\u4FE1\u606F\u3002
- \u5BF9\u5931\u8D25\u8DEF\u5F84\u63D0\u4F9B\u201C\u590D\u5236\u53E3\u4EE4/\u4E0B\u8F7D\u5F15\u5BFC\u9875/\u5BA2\u670D\u5165\u53E3\u201D\u7B49\u515C\u5E95\u65B9\u6848\u3002
- \u5728\u7070\u5EA6\u9636\u6BB5\u6309\u673A\u578B\u4E0E\u7CFB\u7EDF\u7248\u672C\u5206\u6876\u89C2\u5BDF\u6210\u529F\u7387\u3002

## 7. \u603B\u7ED3

\`wx-open-launch-app\` \u7684\u672C\u8D28\u662F\uFF1A  
**\u7F51\u9875\u58F0\u660E + \u5FAE\u4FE1\u9274\u6743 + \u5BA2\u6237\u7AEF\u4EE3\u5524\u8D77**\u3002

\u7406\u89E3\u8FD9\u4E2A\u539F\u7406\u540E\uFF0C\u4F60\u4F1A\u53D1\u73B0\u5B83\u4E0D\u662F\u4E00\u4E2A\u201C\u6309\u94AE\u7EC4\u4EF6\u95EE\u9898\u201D\uFF0C\u800C\u662F\u4E00\u6761\u201C\u516C\u4F17\u53F7\u914D\u7F6E\u3001\u5F00\u653E\u5E73\u53F0\u5173\u8054\u3001\u7B7E\u540D\u670D\u52A1\u3001H5 \u6E32\u67D3\u3001App \u8DEF\u7531\u201D\u5168\u94FE\u8DEF\u80FD\u529B\u3002
`,hp=[{title:"Vue\u54CD\u5E94\u5F0F\u539F\u7406",content:"Object.defineProperty"},{title:"CSS-FLOAT",content:"vue-\u7ED1\u5B9A\u4F7F\u7528\u7684\u6307\u4EE4\u4E3A v-model: \u6682\u65E0\u5FEB\u6377\u7B80\u79F0"},{title:"Keyof Type Operator",content:"\u90A3\u4E2A keyof \u7C7B\u578B\u64CD\u4F5C\u7B26\uFF0Ckeyof \u7C7B\u578B\u64CD\u4F5C\u7B26\u80FD\u591F\u8F93\u5165\u4E00\u4E2A\u7C7B\u578B\uFF0C\u7136\u540E\u4EA7\u751F\u6240\u6709\u952E\u503C\u7684\u5B57\u7B26\u4E32\u6216\u8005\u6570\u5B57\u7684\u5B57\u9762\u8054\u5408\u7C7B\u578B"}],vp=Object.assign({"/pattern/Mediator.md":Gl,"/pattern/Observer.html":Jl,"/pattern/Observer.js":Kl,"/pattern/Publish.js":Yl,"/pattern/Publish.md":Xl,"/pattern/mediator-senior.js":Ql,"/pattern/mediator.js":Zl,"/pattern/module.js":Vl,"/pattern/singleton.js":tp}),gp=Object.assign({"/vdocs/blog/README.md":ep,"/vdocs/blog/ai-native-frontend-workflow.md":np,"/vdocs/blog/code-lab.md":rp,"/vdocs/blog/codex-agent-workflow.md":ip,"/vdocs/blog/codex-cli-to-pr.md":op,"/vdocs/blog/codex-prompt-debugging.md":ap,"/vdocs/blog/frontend-architecture-decision-playbook.md":sp,"/vdocs/blog/frontend-engineering-philosophy.md":cp,"/vdocs/blog/frontend-trends-2026-practice-map.md":up,"/vdocs/blog/legacy-notes.md":fp,"/vdocs/blog/mediator-pattern.md":lp,"/vdocs/blog/publish-subscribe.md":pp,"/vdocs/blog/wechat-open-tag-launch-app.md":dp}),La=t=>(t.split("/").pop()||"Untitled").replace(/\.[^.]+$/,""),mp=t=>t.replace(/```[\s\S]*?```/g," ").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^#{1,6}\s+/gm,"").replace(/[*_>~-]/g," ").replace(/\|/g," "),Fr=(t,e=180)=>{const n=mp(t).replace(/\s+/g," ").trim();return n.length>e?`${n.slice(0,e)}...`:n},bp=(t,e)=>{const n=t.match(/^#\s+(.+)$/m);return n?n[1].trim():e},Ur=t=>t.toLowerCase().replace(/^\//,"").replace(/[^a-z0-9\u4e00-\u9fa5]+/g,"-").replace(/^-+|-+$/g,""),Da=Object.entries(vp).map(([t,e])=>{const n=t.split(".").pop()||"txt";return{id:`pattern-${t}`,slug:Ur(`pattern-${t}`),title:La(t),category:`pattern/${n}`,excerpt:Fr(e),content:e,source:"pattern"}}),Na=Object.entries(gp).filter(([t])=>!t.endsWith("/README.md")).map(([t,e])=>({id:`vdocs-${t}`,slug:Ur(`vdocs-${t}`),title:bp(e,La(t)),category:"vdocs/blog",excerpt:Fr(e),content:e,source:"vdocs"})),Ma=hp.map((t,e)=>({id:`seed-${e}`,slug:Ur(`seed-${t.title}-${e}`),title:t.title,category:"notes",excerpt:Fr(t.content),content:t.content,source:"seed"})),Hr=[...Na,...Da,...Ma];function yp(){return Hr}function Pp(t){return Hr.find(e=>e.slug===t)}function _p(){return{total:Hr.length,vdocsCount:Na.length,patternCount:Da.length,seedCount:Ma.length}}const wp={__name:"HomeView",setup(t){const e=yp(),n=_p(),r=e.slice(0,3);return{__sfc:!0,posts:e,stats:n,featuredPosts:r}}};var Sp=function(){var e=this,n=e._self._c,r=e._self._setupProxy;return n("main",{staticClass:"blog-page"},[n("section",{staticClass:"hero"},[n("div",{staticClass:"hero-content"},[n("p",{staticClass:"kicker"},[e._v("Cinematic Blog System")]),n("h1",[e._v("Patterns, Agents, and Execution Stories")]),n("p",{staticClass:"description"},[e._v(" \u4E3B\u7AD9\u81EA\u52A8\u805A\u5408 `vdocs/blog` \u4E0E `pattern/` \u5185\u5BB9\uFF0C\u7ED3\u5408 Agent \u5DE5\u5177\u95E8\u6237\uFF0C\u5F62\u6210\u53EF\u6F14\u793A\u7684\u5DE5\u7A0B\u535A\u5BA2\u9996\u9875\u3002 ")]),n("div",{staticClass:"hero-actions"},[n("router-link",{staticClass:"btn primary",attrs:{to:"/agent-portal"}},[e._v("\u8FDB\u5165 Agent Portal")]),n("router-link",{staticClass:"btn ghost",attrs:{to:"/codex"}},[e._v("\u6253\u5F00 Codex \u5DE5\u5177\u53F0")])],1)]),n("div",{staticClass:"hero-metrics"},[n("div",{staticClass:"metric"},[n("p",[e._v("Posts")]),n("strong",[e._v(e._s(r.stats.total))])]),n("div",{staticClass:"metric"},[n("p",[e._v("Pattern Files")]),n("strong",[e._v(e._s(r.stats.patternCount))])]),n("div",{staticClass:"metric"},[n("p",[e._v("VDocs Blogs")]),n("strong",[e._v(e._s(r.stats.vdocsCount))])]),n("div",{staticClass:"metric"},[n("p",[e._v("Notes")]),n("strong",[e._v(e._s(r.stats.seedCount))])])])]),n("section",{staticClass:"featured"},[n("h2",[e._v("Featured")]),n("div",{staticClass:"featured-grid"},e._l(r.featuredPosts,function(i){return n("article",{key:i.id,staticClass:"featured-card"},[n("p",{staticClass:"meta"},[e._v(e._s(i.category))]),n("h3",[e._v(e._s(i.title))]),n("p",[e._v(e._s(i.excerpt))]),n("router-link",{staticClass:"read-link",attrs:{to:`/blog/${i.slug}`}},[e._v("\u67E5\u770B\u8BE6\u60C5")])],1)}),0)]),n("section",{staticClass:"blog-layout"},[n("article",{staticClass:"post-list"},e._l(r.posts,function(i){return n("div",{key:i.id,staticClass:"post-card"},[n("p",{staticClass:"meta"},[e._v(e._s(i.category))]),n("h2",[e._v(e._s(i.title))]),n("p",[e._v(e._s(i.excerpt))]),n("router-link",{staticClass:"read-link",attrs:{to:`/blog/${i.slug}`}},[e._v("\u67E5\u770B\u8BE6\u60C5")]),n("details",[n("summary",[e._v("\u5C55\u5F00\u5168\u6587")]),n("pre",[e._v(e._s(i.content))])])],1)}),0),e._m(0)])])},xp=[function(){var t=this,e=t._self._c;return t._self._setupProxy,e("aside",{staticClass:"sidebar"},[e("div",{staticClass:"panel"},[e("h3",[t._v("Source Pipeline")]),e("p",[t._v(" \u81EA\u52A8\u8BFB\u53D6 "),e("code",[t._v("/vdocs/blog/*.md")]),t._v(" \u4E0E "),e("code",[t._v("/pattern/*.{md,js,html}")]),t._v(" \u5E76\u6CE8\u5165\u4E3B\u7AD9\u535A\u5BA2\u6D41\u3002 ")])]),e("div",{staticClass:"panel"},[e("h3",[t._v("Portal Entry")]),e("p",[t._v("\u8BBF\u95EE "),e("code",[t._v("/agent-portal")]),t._v(" \u83B7\u53D6 Agent Prompt \u5DE5\u5177\u95E8\u6237\u3002")])])])}],Cp=ha(wp,Sp,xp,!1,null,"e2149c39",null,null);const Op=Cp.exports;B.use(ja);const $p=new ja({mode:"history",base:"/",routes:[{path:"/",name:"home",component:Op},{path:"/about",name:"about",component:()=>Ne(()=>import("./AboutView.991eb119.js"),["assets/AboutView.991eb119.js","assets/AboutView.e3aa30d8.css"])},{path:"/codex",name:"codex",component:()=>Ne(()=>import("./CodexView.db2465b0.js"),["assets/CodexView.db2465b0.js","assets/CodexView.427196cd.css"])},{path:"/agent-portal",name:"agent-portal",component:()=>Ne(()=>import("./AgentPortalView.3481e232.js"),["assets/AgentPortalView.3481e232.js","assets/AgentPortalView.6495ff11.css"])},{path:"/blog/:slug",name:"blog-detail",component:()=>Ne(()=>import("./BlogDetailView.3ae1c72a.js"),["assets/BlogDetailView.3ae1c72a.js","assets/BlogDetailView.cca1028e.css"])}]});B.use(Df);new B({router:$p,pinia:Lf(),render:t=>t(Bf)}).$mount("#app");export{B as V,Ep as __vite_legacy_guard,yp as a,Ap as c,Tp as d,Pp as g,ha as n,os as r,us as w};
