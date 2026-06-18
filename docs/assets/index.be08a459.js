function $p(){import("data:text/javascript,")}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerpolicy&&(a.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?a.credentials="include":i.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=r(i);fetch(i.href,a)}})();/*!
 * Vue.js v2.7.15
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */var V=Object.freeze({}),T=Array.isArray;function O(t){return t==null}function d(t){return t!=null}function z(t){return t===!0}function Ho(t){return t===!1}function Oe(t){return typeof t=="string"||typeof t=="number"||typeof t=="symbol"||typeof t=="boolean"}function D(t){return typeof t=="function"}function K(t){return t!==null&&typeof t=="object"}var fn=Object.prototype.toString;function et(t){return fn.call(t)==="[object Object]"}function zo(t){return fn.call(t)==="[object RegExp]"}function na(t){var e=parseFloat(String(t));return e>=0&&Math.floor(e)===e&&isFinite(t)}function kr(t){return d(t)&&typeof t.then=="function"&&typeof t.catch=="function"}function Wo(t){return t==null?"":Array.isArray(t)||et(t)&&t.toString===fn?JSON.stringify(t,null,2):String(t)}function be(t){var e=parseFloat(t);return isNaN(e)?t:e}function ut(t,e){for(var r=Object.create(null),n=t.split(","),i=0;i<n.length;i++)r[n[i]]=!0;return e?function(a){return r[a.toLowerCase()]}:function(a){return r[a]}}ut("slot,component",!0);var qo=ut("key,ref,slot,slot-scope,is");function Rt(t,e){var r=t.length;if(r){if(e===t[r-1]){t.length=r-1;return}var n=t.indexOf(e);if(n>-1)return t.splice(n,1)}}var Go=Object.prototype.hasOwnProperty;function X(t,e){return Go.call(t,e)}function Yt(t){var e=Object.create(null);return function(n){var i=e[n];return i||(e[n]=t(n))}}var Jo=/-(\w)/g,qt=Yt(function(t){return t.replace(Jo,function(e,r){return r?r.toUpperCase():""})}),Ko=Yt(function(t){return t.charAt(0).toUpperCase()+t.slice(1)}),Yo=/\B([A-Z])/g,Ee=Yt(function(t){return t.replace(Yo,"-$1").toLowerCase()});function Xo(t,e){function r(n){var i=arguments.length;return i?i>1?t.apply(e,arguments):t.call(e,n):t.call(e)}return r._length=t.length,r}function Qo(t,e){return t.bind(e)}var ia=Function.prototype.bind?Qo:Xo;function Rr(t,e){e=e||0;for(var r=t.length-e,n=new Array(r);r--;)n[r]=t[r+e];return n}function M(t,e){for(var r in e)t[r]=e[r];return t}function aa(t){for(var e={},r=0;r<t.length;r++)t[r]&&M(e,t[r]);return e}function B(t,e,r){}var Pe=function(t,e,r){return!1},oa=function(t){return t};function Gt(t,e){if(t===e)return!0;var r=K(t),n=K(e);if(r&&n)try{var i=Array.isArray(t),a=Array.isArray(e);if(i&&a)return t.length===e.length&&t.every(function(c,u){return Gt(c,e[u])});if(t instanceof Date&&e instanceof Date)return t.getTime()===e.getTime();if(!i&&!a){var o=Object.keys(t),s=Object.keys(e);return o.length===s.length&&o.every(function(c){return Gt(t[c],e[c])})}else return!1}catch(c){return!1}else return!r&&!n?String(t)===String(e):!1}function sa(t,e){for(var r=0;r<t.length;r++)if(Gt(t[r],e))return r;return-1}function Ve(t){var e=!1;return function(){e||(e=!0,t.apply(this,arguments))}}function jr(t,e){return t===e?t===0&&1/t!==1/e:t===t||e===e}var Hn="data-server-rendered",gr=["component","directive","filter"],ca=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch","renderTracked","renderTriggered"],at={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:Pe,isReservedAttr:Pe,isUnknownElement:Pe,getTagNamespace:B,parsePlatformTagName:oa,mustUseProp:Pe,async:!0,_lifecycleHooks:ca},Vo=/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;function ua(t){var e=(t+"").charCodeAt(0);return e===36||e===95}function Z(t,e,r,n){Object.defineProperty(t,e,{value:r,enumerable:!!n,writable:!0,configurable:!0})}var Zo=new RegExp("[^".concat(Vo.source,".$_\\d]"));function ts(t){if(!Zo.test(t)){var e=t.split(".");return function(r){for(var n=0;n<e.length;n++){if(!r)return;r=r[e[n]]}return r}}}var es="__proto__"in{},nt=typeof window<"u",Y=nt&&window.navigator.userAgent.toLowerCase(),ce=Y&&/msie|trident/.test(Y),ue=Y&&Y.indexOf("msie 9.0")>0,ln=Y&&Y.indexOf("edge/")>0;Y&&Y.indexOf("android")>0;var rs=Y&&/iphone|ipad|ipod|ios/.test(Y);Y&&/chrome\/\d+/.test(Y);Y&&/phantomjs/.test(Y);var zn=Y&&Y.match(/firefox\/(\d+)/),Lr={}.watch,fa=!1;if(nt)try{var Wn={};Object.defineProperty(Wn,"passive",{get:function(){fa=!0}}),window.addEventListener("test-passive",null,Wn)}catch(t){}var Ie,jt=function(){return Ie===void 0&&(!nt&&typeof global<"u"?Ie=global.process&&global.process.env.VUE_ENV==="server":Ie=!1),Ie},Ze=nt&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function ae(t){return typeof t=="function"&&/native code/.test(t.toString())}var $e=typeof Symbol<"u"&&ae(Symbol)&&typeof Reflect<"u"&&ae(Reflect.ownKeys),ye;typeof Set<"u"&&ae(Set)?ye=Set:ye=function(){function t(){this.set=Object.create(null)}return t.prototype.has=function(e){return this.set[e]===!0},t.prototype.add=function(e){this.set[e]=!0},t.prototype.clear=function(){this.set=Object.create(null)},t}();var pt=null;function Pt(t){t===void 0&&(t=null),t||pt&&pt._scope.off(),pt=t,t&&t._scope.on()}var rt=function(){function t(e,r,n,i,a,o,s,c){this.tag=e,this.data=r,this.children=n,this.text=i,this.elm=a,this.ns=void 0,this.context=o,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=r&&r.key,this.componentOptions=s,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=c,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1}return Object.defineProperty(t.prototype,"child",{get:function(){return this.componentInstance},enumerable:!1,configurable:!0}),t}(),Bt=function(t){t===void 0&&(t="");var e=new rt;return e.text=t,e.isComment=!0,e};function ee(t){return new rt(void 0,void 0,void 0,String(t))}function Dr(t){var e=new rt(t.tag,t.data,t.children&&t.children.slice(),t.text,t.elm,t.context,t.componentOptions,t.asyncFactory);return e.ns=t.ns,e.isStatic=t.isStatic,e.key=t.key,e.isComment=t.isComment,e.fnContext=t.fnContext,e.fnOptions=t.fnOptions,e.fnScopeId=t.fnScopeId,e.asyncMeta=t.asyncMeta,e.isCloned=!0,e}var ns=0,Ne=[],is=function(){for(var t=0;t<Ne.length;t++){var e=Ne[t];e.subs=e.subs.filter(function(r){return r}),e._pending=!1}Ne.length=0},yt=function(){function t(){this._pending=!1,this.id=ns++,this.subs=[]}return t.prototype.addSub=function(e){this.subs.push(e)},t.prototype.removeSub=function(e){this.subs[this.subs.indexOf(e)]=null,this._pending||(this._pending=!0,Ne.push(this))},t.prototype.depend=function(e){t.target&&t.target.addDep(this)},t.prototype.notify=function(e){for(var r=this.subs.filter(function(o){return o}),n=0,i=r.length;n<i;n++){var a=r[n];a.update()}},t}();yt.target=null;var Ue=[];function fe(t){Ue.push(t),yt.target=t}function le(){Ue.pop(),yt.target=Ue[Ue.length-1]}var la=Array.prototype,tr=Object.create(la),as=["push","pop","shift","unshift","splice","sort","reverse"];as.forEach(function(t){var e=la[t];Z(tr,t,function(){for(var n=[],i=0;i<arguments.length;i++)n[i]=arguments[i];var a=e.apply(this,n),o=this.__ob__,s;switch(t){case"push":case"unshift":s=n;break;case"splice":s=n.slice(2);break}return s&&o.observeArray(s),o.dep.notify(),a})});var qn=Object.getOwnPropertyNames(tr),pa={},pn=!0;function It(t){pn=t}var os={notify:B,depend:B,addSub:B,removeSub:B},Gn=function(){function t(e,r,n){if(r===void 0&&(r=!1),n===void 0&&(n=!1),this.value=e,this.shallow=r,this.mock=n,this.dep=n?os:new yt,this.vmCount=0,Z(e,"__ob__",this),T(e)){if(!n)if(es)e.__proto__=tr;else for(var i=0,a=qn.length;i<a;i++){var o=qn[i];Z(e,o,tr[o])}r||this.observeArray(e)}else for(var s=Object.keys(e),i=0;i<s.length;i++){var o=s[i];kt(e,o,pa,void 0,r,n)}}return t.prototype.observeArray=function(e){for(var r=0,n=e.length;r<n;r++)wt(e[r],!1,this.mock)},t}();function wt(t,e,r){if(t&&X(t,"__ob__")&&t.__ob__ instanceof Gn)return t.__ob__;if(pn&&(r||!jt())&&(T(t)||et(t))&&Object.isExtensible(t)&&!t.__v_skip&&!tt(t)&&!(t instanceof rt))return new Gn(t,e,r)}function kt(t,e,r,n,i,a){var o=new yt,s=Object.getOwnPropertyDescriptor(t,e);if(!(s&&s.configurable===!1)){var c=s&&s.get,u=s&&s.set;(!c||u)&&(r===pa||arguments.length===2)&&(r=t[e]);var f=!i&&wt(r,!1,a);return Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){var v=c?c.call(t):r;return yt.target&&(o.depend(),f&&(f.dep.depend(),T(v)&&ha(v))),tt(v)&&!i?v.value:v},set:function(v){var m=c?c.call(t):r;if(!!jr(m,v)){if(u)u.call(t,v);else{if(c)return;if(!i&&tt(m)&&!tt(v)){m.value=v;return}else r=v}f=!i&&wt(v,!1,a),o.notify()}}}),o}}function dn(t,e,r){if(!mr(t)){var n=t.__ob__;return T(t)&&na(e)?(t.length=Math.max(t.length,e),t.splice(e,1,r),n&&!n.shallow&&n.mock&&wt(r,!1,!0),r):e in t&&!(e in Object.prototype)?(t[e]=r,r):t._isVue||n&&n.vmCount?r:n?(kt(n.value,e,r,void 0,n.shallow,n.mock),n.dep.notify(),r):(t[e]=r,r)}}function da(t,e){if(T(t)&&na(e)){t.splice(e,1);return}var r=t.__ob__;t._isVue||r&&r.vmCount||mr(t)||!X(t,e)||(delete t[e],r&&r.dep.notify())}function ha(t){for(var e=void 0,r=0,n=t.length;r<n;r++)e=t[r],e&&e.__ob__&&e.__ob__.dep.depend(),T(e)&&ha(e)}function va(t){return ss(t,!0),Z(t,"__v_isShallow",!0),t}function ss(t,e){mr(t)||wt(t,e,jt())}function Be(t){return mr(t)?Be(t.__v_raw):!!(t&&t.__ob__)}function Jn(t){return!!(t&&t.__v_isShallow)}function mr(t){return!!(t&&t.__v_isReadonly)}function _r(t){var e=t&&t.__v_raw;return e?_r(e):t}function ga(t){return Object.isExtensible(t)&&Z(t,"__v_skip",!0),t}var ma="__v_isRef";function tt(t){return!!(t&&t.__v_isRef===!0)}function cs(t){return us(t,!1)}function us(t,e){if(tt(t))return t;var r={};return Z(r,ma,!0),Z(r,"__v_isShallow",e),Z(r,"dep",kt(r,"value",t,null,e,jt())),r}function fs(t){return tt(t)?t.value:t}function Mr(t,e,r){Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:function(){var n=e[r];if(tt(n))return n.value;var i=n&&n.__ob__;return i&&i.dep.depend(),n},set:function(n){var i=e[r];tt(i)&&!tt(n)?i.value=n:e[r]=n}})}function Ap(t,e){var r,n,i=D(t);i?(r=t,n=B):(r=t.get,n=t.set);var a=jt()?null:new Ae(pt,r,B,{lazy:!0}),o={effect:a,get value(){return a?(a.dirty&&a.evaluate(),yt.target&&a.depend(),a.value):r()},set value(s){n(s)}};return Z(o,ma,!0),Z(o,"__v_isReadonly",i),o}var br="watcher",Kn="".concat(br," callback"),Yn="".concat(br," getter"),ls="".concat(br," cleanup"),Xn={};function ps(t,e,r){return ds(t,e,r)}function ds(t,e,r){var n=r===void 0?V:r,i=n.immediate,a=n.deep,o=n.flush,s=o===void 0?"pre":o;n.onTrack,n.onTrigger;var c=pt,u=function(C,A,P){return P===void 0&&(P=null),St(C,null,P,c,A)},f,h=!1,v=!1;if(tt(t)?(f=function(){return t.value},h=Jn(t)):Be(t)?(f=function(){return t.__ob__.dep.depend(),t},a=!0):T(t)?(v=!0,h=t.some(function(C){return Be(C)||Jn(C)}),f=function(){return t.map(function(C){if(tt(C))return C.value;if(Be(C))return oe(C);if(D(C))return u(C,Yn)})}):D(t)?e?f=function(){return u(t,Yn)}:f=function(){if(!(c&&c._isDestroyed))return b&&b(),u(t,br,[y])}:f=B,e&&a){var m=f;f=function(){return oe(m())}}var b,y=function(C){b=_.onStop=function(){u(C,ls)}};if(jt())return y=B,e?i&&u(e,Kn,[f(),v?[]:void 0,y]):f(),B;var _=new Ae(pt,f,B,{lazy:!0});_.noRecurse=!e;var S=v?[]:Xn;return _.run=function(){if(!!_.active)if(e){var C=_.get();(a||h||(v?C.some(function(A,P){return jr(A,S[P])}):jr(C,S)))&&(b&&b(),u(e,Kn,[C,S===Xn?void 0:S,y]),S=C)}else _.get()},s==="sync"?_.update=_.run:s==="post"?(_.post=!0,_.update=function(){return qr(_)}):_.update=function(){if(c&&c===pt&&!c._isMounted){var C=c._preWatchers||(c._preWatchers=[]);C.indexOf(_)<0&&C.push(_)}else qr(_)},e?i?_.run():S=_.get():s==="post"&&c?c.$once("hook:mounted",function(){return _.get()}):_.get(),function(){_.teardown()}}var Q,_a=function(){function t(e){e===void 0&&(e=!1),this.detached=e,this.active=!0,this.effects=[],this.cleanups=[],this.parent=Q,!e&&Q&&(this.index=(Q.scopes||(Q.scopes=[])).push(this)-1)}return t.prototype.run=function(e){if(this.active){var r=Q;try{return Q=this,e()}finally{Q=r}}},t.prototype.on=function(){Q=this},t.prototype.off=function(){Q=this.parent},t.prototype.stop=function(e){if(this.active){var r=void 0,n=void 0;for(r=0,n=this.effects.length;r<n;r++)this.effects[r].teardown();for(r=0,n=this.cleanups.length;r<n;r++)this.cleanups[r]();if(this.scopes)for(r=0,n=this.scopes.length;r<n;r++)this.scopes[r].stop(!0);if(!this.detached&&this.parent&&!e){var i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0,this.active=!1}},t}();function hs(t){return new _a(t)}function vs(t,e){e===void 0&&(e=Q),e&&e.active&&e.effects.push(t)}function gs(){return Q}function ms(t){var e=t._provided,r=t.$parent&&t.$parent._provided;return r===e?t._provided=Object.create(r):e}var Qn=Yt(function(t){var e=t.charAt(0)==="&";t=e?t.slice(1):t;var r=t.charAt(0)==="~";t=r?t.slice(1):t;var n=t.charAt(0)==="!";return t=n?t.slice(1):t,{name:t,once:r,capture:n,passive:e}});function Fr(t,e){function r(){var n=r.fns;if(T(n))for(var i=n.slice(),a=0;a<i.length;a++)St(i[a],null,arguments,e,"v-on handler");else return St(n,null,arguments,e,"v-on handler")}return r.fns=t,r}function ba(t,e,r,n,i,a){var o,s,c,u;for(o in t)s=t[o],c=e[o],u=Qn(o),O(s)||(O(c)?(O(s.fns)&&(s=t[o]=Fr(s,a)),z(u.once)&&(s=t[o]=i(u.name,s,u.capture)),r(u.name,s,u.capture,u.passive,u.params)):s!==c&&(c.fns=s,t[o]=c));for(o in e)O(t[o])&&(u=Qn(o),n(u.name,e[o],u.capture))}function xt(t,e,r){t instanceof rt&&(t=t.data.hook||(t.data.hook={}));var n,i=t[e];function a(){r.apply(this,arguments),Rt(n.fns,a)}O(i)?n=Fr([a]):d(i.fns)&&z(i.merged)?(n=i,n.fns.push(a)):n=Fr([i,a]),n.merged=!0,t[e]=n}function _s(t,e,r){var n=e.options.props;if(!O(n)){var i={},a=t.attrs,o=t.props;if(d(a)||d(o))for(var s in n){var c=Ee(s);Vn(i,o,s,c,!0)||Vn(i,a,s,c,!1)}return i}}function Vn(t,e,r,n,i){if(d(e)){if(X(e,r))return t[r]=e[r],i||delete e[r],!0;if(X(e,n))return t[r]=e[n],i||delete e[n],!0}return!1}function bs(t){for(var e=0;e<t.length;e++)if(T(t[e]))return Array.prototype.concat.apply([],t);return t}function hn(t){return Oe(t)?[ee(t)]:T(t)?ya(t):void 0}function de(t){return d(t)&&d(t.text)&&Ho(t.isComment)}function ya(t,e){var r=[],n,i,a,o;for(n=0;n<t.length;n++)i=t[n],!(O(i)||typeof i=="boolean")&&(a=r.length-1,o=r[a],T(i)?i.length>0&&(i=ya(i,"".concat(e||"","_").concat(n)),de(i[0])&&de(o)&&(r[a]=ee(o.text+i[0].text),i.shift()),r.push.apply(r,i)):Oe(i)?de(o)?r[a]=ee(o.text+i):i!==""&&r.push(ee(i)):de(i)&&de(o)?r[a]=ee(o.text+i.text):(z(t._isVList)&&d(i.tag)&&O(i.key)&&d(e)&&(i.key="__vlist".concat(e,"_").concat(n,"__")),r.push(i)));return r}function ys(t,e){var r=null,n,i,a,o;if(T(t)||typeof t=="string")for(r=new Array(t.length),n=0,i=t.length;n<i;n++)r[n]=e(t[n],n);else if(typeof t=="number")for(r=new Array(t),n=0;n<t;n++)r[n]=e(n+1,n);else if(K(t))if($e&&t[Symbol.iterator]){r=[];for(var s=t[Symbol.iterator](),c=s.next();!c.done;)r.push(e(c.value,r.length)),c=s.next()}else for(a=Object.keys(t),r=new Array(a.length),n=0,i=a.length;n<i;n++)o=a[n],r[n]=e(t[o],o,n);return d(r)||(r=[]),r._isVList=!0,r}function ws(t,e,r,n){var i=this.$scopedSlots[t],a;i?(r=r||{},n&&(r=M(M({},n),r)),a=i(r)||(D(e)?e():e)):a=this.$slots[t]||(D(e)?e():e);var o=r&&r.slot;return o?this.$createElement("template",{slot:o},a):a}function Ss(t){return ar(this.$options,"filters",t)||oa}function Zn(t,e){return T(t)?t.indexOf(e)===-1:t!==e}function Cs(t,e,r,n,i){var a=at.keyCodes[e]||r;return i&&n&&!at.keyCodes[e]?Zn(i,n):a?Zn(a,t):n?Ee(n)!==e:t===void 0}function xs(t,e,r,n,i){if(r&&K(r)){T(r)&&(r=aa(r));var a=void 0,o=function(c){if(c==="class"||c==="style"||qo(c))a=t;else{var u=t.attrs&&t.attrs.type;a=n||at.mustUseProp(e,u,c)?t.domProps||(t.domProps={}):t.attrs||(t.attrs={})}var f=qt(c),h=Ee(c);if(!(f in a)&&!(h in a)&&(a[c]=r[c],i)){var v=t.on||(t.on={});v["update:".concat(c)]=function(m){r[c]=m}}};for(var s in r)o(s)}return t}function Os(t,e){var r=this._staticTrees||(this._staticTrees=[]),n=r[t];return n&&!e||(n=r[t]=this.$options.staticRenderFns[t].call(this._renderProxy,this._c,this),wa(n,"__static__".concat(t),!1)),n}function Es(t,e,r){return wa(t,"__once__".concat(e).concat(r?"_".concat(r):""),!0),t}function wa(t,e,r){if(T(t))for(var n=0;n<t.length;n++)t[n]&&typeof t[n]!="string"&&ti(t[n],"".concat(e,"_").concat(n),r);else ti(t,e,r)}function ti(t,e,r){t.isStatic=!0,t.key=e,t.isOnce=r}function $s(t,e){if(e&&et(e)){var r=t.on=t.on?M({},t.on):{};for(var n in e){var i=r[n],a=e[n];r[n]=i?[].concat(i,a):a}}return t}function Sa(t,e,r,n){e=e||{$stable:!r};for(var i=0;i<t.length;i++){var a=t[i];T(a)?Sa(a,e,r):a&&(a.proxy&&(a.fn.proxy=!0),e[a.key]=a.fn)}return n&&(e.$key=n),e}function As(t,e){for(var r=0;r<e.length;r+=2){var n=e[r];typeof n=="string"&&n&&(t[e[r]]=e[r+1])}return t}function Ts(t,e){return typeof t=="string"?e+t:t}function Ca(t){t._o=Es,t._n=be,t._s=Wo,t._l=ys,t._t=ws,t._q=Gt,t._i=sa,t._m=Os,t._f=Ss,t._k=Cs,t._b=xs,t._v=ee,t._e=Bt,t._u=Sa,t._g=$s,t._d=As,t._p=Ts}function vn(t,e){if(!t||!t.length)return{};for(var r={},n=0,i=t.length;n<i;n++){var a=t[n],o=a.data;if(o&&o.attrs&&o.attrs.slot&&delete o.attrs.slot,(a.context===e||a.fnContext===e)&&o&&o.slot!=null){var s=o.slot,c=r[s]||(r[s]=[]);a.tag==="template"?c.push.apply(c,a.children||[]):c.push(a)}else(r.default||(r.default=[])).push(a)}for(var u in r)r[u].every(Ps)&&delete r[u];return r}function Ps(t){return t.isComment&&!t.asyncFactory||t.text===" "}function we(t){return t.isComment&&t.asyncFactory}function _e(t,e,r,n){var i,a=Object.keys(r).length>0,o=e?!!e.$stable:!a,s=e&&e.$key;if(!e)i={};else{if(e._normalized)return e._normalized;if(o&&n&&n!==V&&s===n.$key&&!a&&!n.$hasNormal)return n;i={};for(var c in e)e[c]&&c[0]!=="$"&&(i[c]=Is(t,r,c,e[c]))}for(var u in r)u in i||(i[u]=ks(r,u));return e&&Object.isExtensible(e)&&(e._normalized=i),Z(i,"$stable",o),Z(i,"$key",s),Z(i,"$hasNormal",a),i}function Is(t,e,r,n){var i=function(){var a=pt;Pt(t);var o=arguments.length?n.apply(null,arguments):n({});o=o&&typeof o=="object"&&!T(o)?[o]:hn(o);var s=o&&o[0];return Pt(a),o&&(!s||o.length===1&&s.isComment&&!we(s))?void 0:o};return n.proxy&&Object.defineProperty(e,r,{get:i,enumerable:!0,configurable:!0}),i}function ks(t,e){return function(){return t[e]}}function Rs(t){var e=t.$options,r=e.setup;if(r){var n=t._setupContext=js(t);Pt(t),fe();var i=St(r,null,[t._props||va({}),n],t,"setup");if(le(),Pt(),D(i))e.render=i;else if(K(i))if(t._setupState=i,i.__sfc){var o=t._setupProxy={};for(var a in i)a!=="__sfc"&&Mr(o,i,a)}else for(var a in i)ua(a)||Mr(t,i,a)}}function js(t){return{get attrs(){if(!t._attrsProxy){var e=t._attrsProxy={};Z(e,"_v_attr_proxy",!0),er(e,t.$attrs,V,t,"$attrs")}return t._attrsProxy},get listeners(){if(!t._listenersProxy){var e=t._listenersProxy={};er(e,t.$listeners,V,t,"$listeners")}return t._listenersProxy},get slots(){return Ds(t)},emit:ia(t.$emit,t),expose:function(e){e&&Object.keys(e).forEach(function(r){return Mr(t,e,r)})}}}function er(t,e,r,n,i){var a=!1;for(var o in e)o in t?e[o]!==r[o]&&(a=!0):(a=!0,Ls(t,o,n,i));for(var o in t)o in e||(a=!0,delete t[o]);return a}function Ls(t,e,r,n){Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){return r[n][e]}})}function Ds(t){return t._slotsProxy||xa(t._slotsProxy={},t.$scopedSlots),t._slotsProxy}function xa(t,e){for(var r in e)t[r]=e[r];for(var r in t)r in e||delete t[r]}function Ms(t){t._vnode=null,t._staticTrees=null;var e=t.$options,r=t.$vnode=e._parentVnode,n=r&&r.context;t.$slots=vn(e._renderChildren,n),t.$scopedSlots=r?_e(t.$parent,r.data.scopedSlots,t.$slots):V,t._c=function(a,o,s,c){return rr(t,a,o,s,c,!1)},t.$createElement=function(a,o,s,c){return rr(t,a,o,s,c,!0)};var i=r&&r.data;kt(t,"$attrs",i&&i.attrs||V,null,!0),kt(t,"$listeners",e._parentListeners||V,null,!0)}var Nr=null;function Fs(t){Ca(t.prototype),t.prototype.$nextTick=function(e){return gn(e,this)},t.prototype._render=function(){var e=this,r=e.$options,n=r.render,i=r._parentVnode;i&&e._isMounted&&(e.$scopedSlots=_e(e.$parent,i.data.scopedSlots,e.$slots,e.$scopedSlots),e._slotsProxy&&xa(e._slotsProxy,e.$scopedSlots)),e.$vnode=i;var a;try{Pt(e),Nr=e,a=n.call(e._renderProxy,e.$createElement)}catch(o){Jt(o,e,"render"),a=e._vnode}finally{Nr=null,Pt()}return T(a)&&a.length===1&&(a=a[0]),a instanceof rt||(a=Bt()),a.parent=i,a}}function xr(t,e){return(t.__esModule||$e&&t[Symbol.toStringTag]==="Module")&&(t=t.default),K(t)?e.extend(t):t}function Ns(t,e,r,n,i){var a=Bt();return a.asyncFactory=t,a.asyncMeta={data:e,context:r,children:n,tag:i},a}function Us(t,e){if(z(t.error)&&d(t.errorComp))return t.errorComp;if(d(t.resolved))return t.resolved;var r=Nr;if(r&&d(t.owners)&&t.owners.indexOf(r)===-1&&t.owners.push(r),z(t.loading)&&d(t.loadingComp))return t.loadingComp;if(r&&!d(t.owners)){var n=t.owners=[r],i=!0,a=null,o=null;r.$on("hook:destroyed",function(){return Rt(n,r)});var s=function(h){for(var v=0,m=n.length;v<m;v++)n[v].$forceUpdate();h&&(n.length=0,a!==null&&(clearTimeout(a),a=null),o!==null&&(clearTimeout(o),o=null))},c=Ve(function(h){t.resolved=xr(h,e),i?n.length=0:s(!0)}),u=Ve(function(h){d(t.errorComp)&&(t.error=!0,s(!0))}),f=t(c,u);return K(f)&&(kr(f)?O(t.resolved)&&f.then(c,u):kr(f.component)&&(f.component.then(c,u),d(f.error)&&(t.errorComp=xr(f.error,e)),d(f.loading)&&(t.loadingComp=xr(f.loading,e),f.delay===0?t.loading=!0:a=setTimeout(function(){a=null,O(t.resolved)&&O(t.error)&&(t.loading=!0,s(!1))},f.delay||200)),d(f.timeout)&&(o=setTimeout(function(){o=null,O(t.resolved)&&u(null)},f.timeout)))),i=!1,t.loading?t.loadingComp:t.resolved}}function Oa(t){if(T(t))for(var e=0;e<t.length;e++){var r=t[e];if(d(r)&&(d(r.componentOptions)||we(r)))return r}}var Bs=1,Ea=2;function rr(t,e,r,n,i,a){return(T(r)||Oe(r))&&(i=n,n=r,r=void 0),z(a)&&(i=Ea),Hs(t,e,r,n,i)}function Hs(t,e,r,n,i){if(d(r)&&d(r.__ob__)||(d(r)&&d(r.is)&&(e=r.is),!e))return Bt();T(n)&&D(n[0])&&(r=r||{},r.scopedSlots={default:n[0]},n.length=0),i===Ea?n=hn(n):i===Bs&&(n=bs(n));var a,o;if(typeof e=="string"){var s=void 0;o=t.$vnode&&t.$vnode.ns||at.getTagNamespace(e),at.isReservedTag(e)?a=new rt(at.parsePlatformTagName(e),r,n,void 0,void 0,t):(!r||!r.pre)&&d(s=ar(t.$options,"components",e))?a=ci(s,r,t,n,e):a=new rt(e,r,n,void 0,void 0,t)}else a=ci(e,r,t,n);return T(a)?a:d(a)?(d(o)&&$a(a,o),d(r)&&zs(r),a):Bt()}function $a(t,e,r){if(t.ns=e,t.tag==="foreignObject"&&(e=void 0,r=!0),d(t.children))for(var n=0,i=t.children.length;n<i;n++){var a=t.children[n];d(a.tag)&&(O(a.ns)||z(r)&&a.tag!=="svg")&&$a(a,e,r)}}function zs(t){K(t.style)&&oe(t.style),K(t.class)&&oe(t.class)}function Jt(t,e,r){fe();try{if(e)for(var n=e;n=n.$parent;){var i=n.$options.errorCaptured;if(i)for(var a=0;a<i.length;a++)try{var o=i[a].call(n,t,e,r)===!1;if(o)return}catch(s){ei(s,n,"errorCaptured hook")}}ei(t,e,r)}finally{le()}}function St(t,e,r,n,i){var a;try{a=r?t.apply(e,r):t.call(e),a&&!a._isVue&&kr(a)&&!a._handled&&(a.catch(function(o){return Jt(o,n,i+" (Promise/async)")}),a._handled=!0)}catch(o){Jt(o,n,i)}return a}function ei(t,e,r){if(at.errorHandler)try{return at.errorHandler.call(null,t,e,r)}catch(n){n!==t&&ri(n)}ri(t)}function ri(t,e,r){if(nt&&typeof console<"u")console.error(t);else throw t}var Ur=!1,Br=[],Hr=!1;function ke(){Hr=!1;var t=Br.slice(0);Br.length=0;for(var e=0;e<t.length;e++)t[e]()}var ge;if(typeof Promise<"u"&&ae(Promise)){var Ws=Promise.resolve();ge=function(){Ws.then(ke),rs&&setTimeout(B)},Ur=!0}else if(!ce&&typeof MutationObserver<"u"&&(ae(MutationObserver)||MutationObserver.toString()==="[object MutationObserverConstructor]")){var Re=1,qs=new MutationObserver(ke),ni=document.createTextNode(String(Re));qs.observe(ni,{characterData:!0}),ge=function(){Re=(Re+1)%2,ni.data=String(Re)},Ur=!0}else typeof setImmediate<"u"&&ae(setImmediate)?ge=function(){setImmediate(ke)}:ge=function(){setTimeout(ke,0)};function gn(t,e){var r;if(Br.push(function(){if(t)try{t.call(e)}catch(n){Jt(n,e,"nextTick")}else r&&r(e)}),Hr||(Hr=!0,ge()),!t&&typeof Promise<"u")return new Promise(function(n){r=n})}function Aa(t){return function(e,r){if(r===void 0&&(r=pt),!!r)return Gs(r,t,e)}}function Gs(t,e,r){var n=t.$options;n[e]=La(n[e],r)}var Tp=Aa("mounted"),Pp=Aa("destroyed"),Js="2.7.15";function Ip(t){return t}var ii=new ye;function oe(t){return He(t,ii),ii.clear(),t}function He(t,e){var r,n,i=T(t);if(!(!i&&!K(t)||t.__v_skip||Object.isFrozen(t)||t instanceof rt)){if(t.__ob__){var a=t.__ob__.dep.id;if(e.has(a))return;e.add(a)}if(i)for(r=t.length;r--;)He(t[r],e);else if(tt(t))He(t.value,e);else for(n=Object.keys(t),r=n.length;r--;)He(t[n[r]],e)}}var Ks=0,Ae=function(){function t(e,r,n,i,a){vs(this,Q&&!Q._vm?Q:e?e._scope:void 0),(this.vm=e)&&a&&(e._watcher=this),i?(this.deep=!!i.deep,this.user=!!i.user,this.lazy=!!i.lazy,this.sync=!!i.sync,this.before=i.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++Ks,this.active=!0,this.post=!1,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new ye,this.newDepIds=new ye,this.expression="",D(r)?this.getter=r:(this.getter=ts(r),this.getter||(this.getter=B)),this.value=this.lazy?void 0:this.get()}return t.prototype.get=function(){fe(this);var e,r=this.vm;try{e=this.getter.call(r,r)}catch(n){if(this.user)Jt(n,r,'getter for watcher "'.concat(this.expression,'"'));else throw n}finally{this.deep&&oe(e),le(),this.cleanupDeps()}return e},t.prototype.addDep=function(e){var r=e.id;this.newDepIds.has(r)||(this.newDepIds.add(r),this.newDeps.push(e),this.depIds.has(r)||e.addSub(this))},t.prototype.cleanupDeps=function(){for(var e=this.deps.length;e--;){var r=this.deps[e];this.newDepIds.has(r.id)||r.removeSub(this)}var n=this.depIds;this.depIds=this.newDepIds,this.newDepIds=n,this.newDepIds.clear(),n=this.deps,this.deps=this.newDeps,this.newDeps=n,this.newDeps.length=0},t.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():qr(this)},t.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||K(e)||this.deep){var r=this.value;if(this.value=e,this.user){var n='callback for watcher "'.concat(this.expression,'"');St(this.cb,this.vm,[e,r],this.vm,n)}else this.cb.call(this.vm,e,r)}}},t.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},t.prototype.depend=function(){for(var e=this.deps.length;e--;)this.deps[e].depend()},t.prototype.teardown=function(){if(this.vm&&!this.vm._isBeingDestroyed&&Rt(this.vm._scope.effects,this),this.active){for(var e=this.deps.length;e--;)this.deps[e].removeSub(this);this.active=!1,this.onStop&&this.onStop()}},t}();function Ys(t){t._events=Object.create(null),t._hasHookEvent=!1;var e=t.$options._parentListeners;e&&Ta(t,e)}var Se;function Xs(t,e){Se.$on(t,e)}function Qs(t,e){Se.$off(t,e)}function Vs(t,e){var r=Se;return function n(){var i=e.apply(null,arguments);i!==null&&r.$off(t,n)}}function Ta(t,e,r){Se=t,ba(e,r||{},Xs,Qs,Vs,t),Se=void 0}function Zs(t){var e=/^hook:/;t.prototype.$on=function(r,n){var i=this;if(T(r))for(var a=0,o=r.length;a<o;a++)i.$on(r[a],n);else(i._events[r]||(i._events[r]=[])).push(n),e.test(r)&&(i._hasHookEvent=!0);return i},t.prototype.$once=function(r,n){var i=this;function a(){i.$off(r,a),n.apply(i,arguments)}return a.fn=n,i.$on(r,a),i},t.prototype.$off=function(r,n){var i=this;if(!arguments.length)return i._events=Object.create(null),i;if(T(r)){for(var a=0,o=r.length;a<o;a++)i.$off(r[a],n);return i}var s=i._events[r];if(!s)return i;if(!n)return i._events[r]=null,i;for(var c,u=s.length;u--;)if(c=s[u],c===n||c.fn===n){s.splice(u,1);break}return i},t.prototype.$emit=function(r){var n=this,i=n._events[r];if(i){i=i.length>1?Rr(i):i;for(var a=Rr(arguments,1),o='event handler for "'.concat(r,'"'),s=0,c=i.length;s<c;s++)St(i[s],n,a,n,o)}return n}}var Ht=null;function Pa(t){var e=Ht;return Ht=t,function(){Ht=e}}function tc(t){var e=t.$options,r=e.parent;if(r&&!e.abstract){for(;r.$options.abstract&&r.$parent;)r=r.$parent;r.$children.push(t)}t.$parent=r,t.$root=r?r.$root:t,t.$children=[],t.$refs={},t._provided=r?r._provided:Object.create(null),t._watcher=null,t._inactive=null,t._directInactive=!1,t._isMounted=!1,t._isDestroyed=!1,t._isBeingDestroyed=!1}function ec(t){t.prototype._update=function(e,r){var n=this,i=n.$el,a=n._vnode,o=Pa(n);n._vnode=e,a?n.$el=n.__patch__(a,e):n.$el=n.__patch__(n.$el,e,r,!1),o(),i&&(i.__vue__=null),n.$el&&(n.$el.__vue__=n);for(var s=n;s&&s.$vnode&&s.$parent&&s.$vnode===s.$parent._vnode;)s.$parent.$el=s.$el,s=s.$parent},t.prototype.$forceUpdate=function(){var e=this;e._watcher&&e._watcher.update()},t.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){ct(e,"beforeDestroy"),e._isBeingDestroyed=!0;var r=e.$parent;r&&!r._isBeingDestroyed&&!e.$options.abstract&&Rt(r.$children,e),e._scope.stop(),e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),ct(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}function rc(t,e,r){t.$el=e,t.$options.render||(t.$options.render=Bt),ct(t,"beforeMount");var n;n=function(){t._update(t._render(),r)};var i={before:function(){t._isMounted&&!t._isDestroyed&&ct(t,"beforeUpdate")}};new Ae(t,n,B,i,!0),r=!1;var a=t._preWatchers;if(a)for(var o=0;o<a.length;o++)a[o].run();return t.$vnode==null&&(t._isMounted=!0,ct(t,"mounted")),t}function nc(t,e,r,n,i){var a=n.data.scopedSlots,o=t.$scopedSlots,s=!!(a&&!a.$stable||o!==V&&!o.$stable||a&&t.$scopedSlots.$key!==a.$key||!a&&t.$scopedSlots.$key),c=!!(i||t.$options._renderChildren||s),u=t.$vnode;t.$options._parentVnode=n,t.$vnode=n,t._vnode&&(t._vnode.parent=n),t.$options._renderChildren=i;var f=n.data.attrs||V;t._attrsProxy&&er(t._attrsProxy,f,u.data&&u.data.attrs||V,t,"$attrs")&&(c=!0),t.$attrs=f,r=r||V;var h=t.$options._parentListeners;if(t._listenersProxy&&er(t._listenersProxy,r,h||V,t,"$listeners"),t.$listeners=t.$options._parentListeners=r,Ta(t,r,h),e&&t.$options.props){It(!1);for(var v=t._props,m=t.$options._propKeys||[],b=0;b<m.length;b++){var y=m[b],_=t.$options.props;v[y]=Sn(y,_,e,t)}It(!0),t.$options.propsData=e}c&&(t.$slots=vn(i,n.context),t.$forceUpdate())}function Ia(t){for(;t&&(t=t.$parent);)if(t._inactive)return!0;return!1}function mn(t,e){if(e){if(t._directInactive=!1,Ia(t))return}else if(t._directInactive)return;if(t._inactive||t._inactive===null){t._inactive=!1;for(var r=0;r<t.$children.length;r++)mn(t.$children[r]);ct(t,"activated")}}function ka(t,e){if(!(e&&(t._directInactive=!0,Ia(t)))&&!t._inactive){t._inactive=!0;for(var r=0;r<t.$children.length;r++)ka(t.$children[r]);ct(t,"deactivated")}}function ct(t,e,r,n){n===void 0&&(n=!0),fe();var i=pt,a=gs();n&&Pt(t);var o=t.$options[e],s="".concat(e," hook");if(o)for(var c=0,u=o.length;c<u;c++)St(o[c],t,r||null,t,s);t._hasHookEvent&&t.$emit("hook:"+e),n&&(Pt(i),a&&a.on()),le()}var _t=[],_n=[],nr={},zr=!1,bn=!1,re=0;function ic(){re=_t.length=_n.length=0,nr={},zr=bn=!1}var Ra=0,Wr=Date.now;if(nt&&!ce){var Or=window.performance;Or&&typeof Or.now=="function"&&Wr()>document.createEvent("Event").timeStamp&&(Wr=function(){return Or.now()})}var ac=function(t,e){if(t.post){if(!e.post)return 1}else if(e.post)return-1;return t.id-e.id};function oc(){Ra=Wr(),bn=!0;var t,e;for(_t.sort(ac),re=0;re<_t.length;re++)t=_t[re],t.before&&t.before(),e=t.id,nr[e]=null,t.run();var r=_n.slice(),n=_t.slice();ic(),uc(r),sc(n),is(),Ze&&at.devtools&&Ze.emit("flush")}function sc(t){for(var e=t.length;e--;){var r=t[e],n=r.vm;n&&n._watcher===r&&n._isMounted&&!n._isDestroyed&&ct(n,"updated")}}function cc(t){t._inactive=!1,_n.push(t)}function uc(t){for(var e=0;e<t.length;e++)t[e]._inactive=!0,mn(t[e],!0)}function qr(t){var e=t.id;if(nr[e]==null&&!(t===yt.target&&t.noRecurse)){if(nr[e]=!0,!bn)_t.push(t);else{for(var r=_t.length-1;r>re&&_t[r].id>t.id;)r--;_t.splice(r+1,0,t)}zr||(zr=!0,gn(oc))}}function fc(t){var e=t.$options.provide;if(e){var r=D(e)?e.call(t):e;if(!K(r))return;for(var n=ms(t),i=$e?Reflect.ownKeys(r):Object.keys(r),a=0;a<i.length;a++){var o=i[a];Object.defineProperty(n,o,Object.getOwnPropertyDescriptor(r,o))}}}function lc(t){var e=ja(t.$options.inject,t);e&&(It(!1),Object.keys(e).forEach(function(r){kt(t,r,e[r])}),It(!0))}function ja(t,e){if(t){for(var r=Object.create(null),n=$e?Reflect.ownKeys(t):Object.keys(t),i=0;i<n.length;i++){var a=n[i];if(a!=="__ob__"){var o=t[a].from;if(o in e._provided)r[a]=e._provided[o];else if("default"in t[a]){var s=t[a].default;r[a]=D(s)?s.call(e):s}}}return r}}function yn(t,e,r,n,i){var a=this,o=i.options,s;X(n,"_uid")?(s=Object.create(n),s._original=n):(s=n,n=n._original);var c=z(o._compiled),u=!c;this.data=t,this.props=e,this.children=r,this.parent=n,this.listeners=t.on||V,this.injections=ja(o.inject,n),this.slots=function(){return a.$slots||_e(n,t.scopedSlots,a.$slots=vn(r,n)),a.$slots},Object.defineProperty(this,"scopedSlots",{enumerable:!0,get:function(){return _e(n,t.scopedSlots,this.slots())}}),c&&(this.$options=o,this.$slots=this.slots(),this.$scopedSlots=_e(n,t.scopedSlots,this.$slots)),o._scopeId?this._c=function(f,h,v,m){var b=rr(s,f,h,v,m,u);return b&&!T(b)&&(b.fnScopeId=o._scopeId,b.fnContext=n),b}:this._c=function(f,h,v,m){return rr(s,f,h,v,m,u)}}Ca(yn.prototype);function pc(t,e,r,n,i){var a=t.options,o={},s=a.props;if(d(s))for(var c in s)o[c]=Sn(c,s,e||V);else d(r.attrs)&&oi(o,r.attrs),d(r.props)&&oi(o,r.props);var u=new yn(r,o,i,n,t),f=a.render.call(null,u._c,u);if(f instanceof rt)return ai(f,r,u.parent,a);if(T(f)){for(var h=hn(f)||[],v=new Array(h.length),m=0;m<h.length;m++)v[m]=ai(h[m],r,u.parent,a);return v}}function ai(t,e,r,n,i){var a=Dr(t);return a.fnContext=r,a.fnOptions=n,e.slot&&((a.data||(a.data={})).slot=e.slot),a}function oi(t,e){for(var r in e)t[qt(r)]=e[r]}function ir(t){return t.name||t.__name||t._componentTag}var wn={init:function(t,e){if(t.componentInstance&&!t.componentInstance._isDestroyed&&t.data.keepAlive){var r=t;wn.prepatch(r,r)}else{var n=t.componentInstance=dc(t,Ht);n.$mount(e?t.elm:void 0,e)}},prepatch:function(t,e){var r=e.componentOptions,n=e.componentInstance=t.componentInstance;nc(n,r.propsData,r.listeners,e,r.children)},insert:function(t){var e=t.context,r=t.componentInstance;r._isMounted||(r._isMounted=!0,ct(r,"mounted")),t.data.keepAlive&&(e._isMounted?cc(r):mn(r,!0))},destroy:function(t){var e=t.componentInstance;e._isDestroyed||(t.data.keepAlive?ka(e,!0):e.$destroy())}},si=Object.keys(wn);function ci(t,e,r,n,i){if(!O(t)){var a=r.$options._base;if(K(t)&&(t=a.extend(t)),typeof t=="function"){var o;if(O(t.cid)&&(o=t,t=Us(o,a),t===void 0))return Ns(o,e,r,n,i);e=e||{},xn(t),d(e.model)&&gc(t.options,e);var s=_s(e,t);if(z(t.options.functional))return pc(t,s,e,r,n);var c=e.on;if(e.on=e.nativeOn,z(t.options.abstract)){var u=e.slot;e={},u&&(e.slot=u)}hc(e);var f=ir(t.options)||i,h=new rt("vue-component-".concat(t.cid).concat(f?"-".concat(f):""),e,void 0,void 0,void 0,r,{Ctor:t,propsData:s,listeners:c,tag:i,children:n},o);return h}}}function dc(t,e){var r={_isComponent:!0,_parentVnode:t,parent:e},n=t.data.inlineTemplate;return d(n)&&(r.render=n.render,r.staticRenderFns=n.staticRenderFns),new t.componentOptions.Ctor(r)}function hc(t){for(var e=t.hook||(t.hook={}),r=0;r<si.length;r++){var n=si[r],i=e[n],a=wn[n];i!==a&&!(i&&i._merged)&&(e[n]=i?vc(a,i):a)}}function vc(t,e){var r=function(n,i){t(n,i),e(n,i)};return r._merged=!0,r}function gc(t,e){var r=t.model&&t.model.prop||"value",n=t.model&&t.model.event||"input";(e.attrs||(e.attrs={}))[r]=e.model.value;var i=e.on||(e.on={}),a=i[n],o=e.model.callback;d(a)?(T(a)?a.indexOf(o)===-1:a!==o)&&(i[n]=[o].concat(a)):i[n]=o}var mc=B,lt=at.optionMergeStrategies;function Ce(t,e,r){if(r===void 0&&(r=!0),!e)return t;for(var n,i,a,o=$e?Reflect.ownKeys(e):Object.keys(e),s=0;s<o.length;s++)n=o[s],n!=="__ob__"&&(i=t[n],a=e[n],!r||!X(t,n)?dn(t,n,a):i!==a&&et(i)&&et(a)&&Ce(i,a));return t}function ui(t,e,r){return r?function(){var i=D(e)?e.call(r,r):e,a=D(t)?t.call(r,r):t;return i?Ce(i,a):a}:e?t?function(){return Ce(D(e)?e.call(this,this):e,D(t)?t.call(this,this):t)}:e:t}lt.data=function(t,e,r){return r?ui(t,e,r):e&&typeof e!="function"?t:ui(t,e)};function La(t,e){var r=e?t?t.concat(e):T(e)?e:[e]:t;return r&&_c(r)}function _c(t){for(var e=[],r=0;r<t.length;r++)e.indexOf(t[r])===-1&&e.push(t[r]);return e}ca.forEach(function(t){lt[t]=La});function bc(t,e,r,n){var i=Object.create(t||null);return e?M(i,e):i}gr.forEach(function(t){lt[t+"s"]=bc});lt.watch=function(t,e,r,n){if(t===Lr&&(t=void 0),e===Lr&&(e=void 0),!e)return Object.create(t||null);if(!t)return e;var i={};M(i,t);for(var a in e){var o=i[a],s=e[a];o&&!T(o)&&(o=[o]),i[a]=o?o.concat(s):T(s)?s:[s]}return i};lt.props=lt.methods=lt.inject=lt.computed=function(t,e,r,n){if(!t)return e;var i=Object.create(null);return M(i,t),e&&M(i,e),i};lt.provide=function(t,e){return t?function(){var r=Object.create(null);return Ce(r,D(t)?t.call(this):t),e&&Ce(r,D(e)?e.call(this):e,!1),r}:e};var yc=function(t,e){return e===void 0?t:e};function wc(t,e){var r=t.props;if(!!r){var n={},i,a,o;if(T(r))for(i=r.length;i--;)a=r[i],typeof a=="string"&&(o=qt(a),n[o]={type:null});else if(et(r))for(var s in r)a=r[s],o=qt(s),n[o]=et(a)?a:{type:a};t.props=n}}function Sc(t,e){var r=t.inject;if(!!r){var n=t.inject={};if(T(r))for(var i=0;i<r.length;i++)n[r[i]]={from:r[i]};else if(et(r))for(var a in r){var o=r[a];n[a]=et(o)?M({from:a},o):{from:o}}}}function Cc(t){var e=t.directives;if(e)for(var r in e){var n=e[r];D(n)&&(e[r]={bind:n,update:n})}}function Kt(t,e,r){if(D(e)&&(e=e.options),wc(e),Sc(e),Cc(e),!e._base&&(e.extends&&(t=Kt(t,e.extends,r)),e.mixins))for(var n=0,i=e.mixins.length;n<i;n++)t=Kt(t,e.mixins[n],r);var a={},o;for(o in t)s(o);for(o in e)X(t,o)||s(o);function s(c){var u=lt[c]||yc;a[c]=u(t[c],e[c],r,c)}return a}function ar(t,e,r,n){if(typeof r=="string"){var i=t[e];if(X(i,r))return i[r];var a=qt(r);if(X(i,a))return i[a];var o=Ko(a);if(X(i,o))return i[o];var s=i[r]||i[a]||i[o];return s}}function Sn(t,e,r,n){var i=e[t],a=!X(r,t),o=r[t],s=li(Boolean,i.type);if(s>-1){if(a&&!X(i,"default"))o=!1;else if(o===""||o===Ee(t)){var c=li(String,i.type);(c<0||s<c)&&(o=!0)}}if(o===void 0){o=xc(n,i,t);var u=pn;It(!0),wt(o),It(u)}return o}function xc(t,e,r){if(!!X(e,"default")){var n=e.default;return t&&t.$options.propsData&&t.$options.propsData[r]===void 0&&t._props[r]!==void 0?t._props[r]:D(n)&&Gr(e.type)!=="Function"?n.call(t):n}}var Oc=/^\s*function (\w+)/;function Gr(t){var e=t&&t.toString().match(Oc);return e?e[1]:""}function fi(t,e){return Gr(t)===Gr(e)}function li(t,e){if(!T(e))return fi(e,t)?0:-1;for(var r=0,n=e.length;r<n;r++)if(fi(e[r],t))return r;return-1}var Ct={enumerable:!0,configurable:!0,get:B,set:B};function Cn(t,e,r){Ct.get=function(){return this[e][r]},Ct.set=function(i){this[e][r]=i},Object.defineProperty(t,r,Ct)}function Ec(t){var e=t.$options;if(e.props&&$c(t,e.props),Rs(t),e.methods&&kc(t,e.methods),e.data)Ac(t);else{var r=wt(t._data={});r&&r.vmCount++}e.computed&&Ic(t,e.computed),e.watch&&e.watch!==Lr&&Rc(t,e.watch)}function $c(t,e){var r=t.$options.propsData||{},n=t._props=va({}),i=t.$options._propKeys=[],a=!t.$parent;a||It(!1);var o=function(c){i.push(c);var u=Sn(c,e,r,t);kt(n,c,u),c in t||Cn(t,"_props",c)};for(var s in e)o(s);It(!0)}function Ac(t){var e=t.$options.data;e=t._data=D(e)?Tc(e,t):e||{},et(e)||(e={});var r=Object.keys(e),n=t.$options.props;t.$options.methods;for(var i=r.length;i--;){var a=r[i];n&&X(n,a)||ua(a)||Cn(t,"_data",a)}var o=wt(e);o&&o.vmCount++}function Tc(t,e){fe();try{return t.call(e,e)}catch(r){return Jt(r,e,"data()"),{}}finally{le()}}var Pc={lazy:!0};function Ic(t,e){var r=t._computedWatchers=Object.create(null),n=jt();for(var i in e){var a=e[i],o=D(a)?a:a.get;n||(r[i]=new Ae(t,o||B,B,Pc)),i in t||Da(t,i,a)}}function Da(t,e,r){var n=!jt();D(r)?(Ct.get=n?pi(e):di(r),Ct.set=B):(Ct.get=r.get?n&&r.cache!==!1?pi(e):di(r.get):B,Ct.set=r.set||B),Object.defineProperty(t,e,Ct)}function pi(t){return function(){var r=this._computedWatchers&&this._computedWatchers[t];if(r)return r.dirty&&r.evaluate(),yt.target&&r.depend(),r.value}}function di(t){return function(){return t.call(this,this)}}function kc(t,e){t.$options.props;for(var r in e)t[r]=typeof e[r]!="function"?B:ia(e[r],t)}function Rc(t,e){for(var r in e){var n=e[r];if(T(n))for(var i=0;i<n.length;i++)Jr(t,r,n[i]);else Jr(t,r,n)}}function Jr(t,e,r,n){return et(r)&&(n=r,r=r.handler),typeof r=="string"&&(r=t[r]),t.$watch(e,r,n)}function jc(t){var e={};e.get=function(){return this._data};var r={};r.get=function(){return this._props},Object.defineProperty(t.prototype,"$data",e),Object.defineProperty(t.prototype,"$props",r),t.prototype.$set=dn,t.prototype.$delete=da,t.prototype.$watch=function(n,i,a){var o=this;if(et(i))return Jr(o,n,i,a);a=a||{},a.user=!0;var s=new Ae(o,n,i,a);if(a.immediate){var c='callback for immediate watcher "'.concat(s.expression,'"');fe(),St(i,o,[s.value],o,c),le()}return function(){s.teardown()}}}var Lc=0;function Dc(t){t.prototype._init=function(e){var r=this;r._uid=Lc++,r._isVue=!0,r.__v_skip=!0,r._scope=new _a(!0),r._scope._vm=!0,e&&e._isComponent?Mc(r,e):r.$options=Kt(xn(r.constructor),e||{},r),r._renderProxy=r,r._self=r,tc(r),Ys(r),Ms(r),ct(r,"beforeCreate",void 0,!1),lc(r),Ec(r),fc(r),ct(r,"created"),r.$options.el&&r.$mount(r.$options.el)}}function Mc(t,e){var r=t.$options=Object.create(t.constructor.options),n=e._parentVnode;r.parent=e.parent,r._parentVnode=n;var i=n.componentOptions;r.propsData=i.propsData,r._parentListeners=i.listeners,r._renderChildren=i.children,r._componentTag=i.tag,e.render&&(r.render=e.render,r.staticRenderFns=e.staticRenderFns)}function xn(t){var e=t.options;if(t.super){var r=xn(t.super),n=t.superOptions;if(r!==n){t.superOptions=r;var i=Fc(t);i&&M(t.extendOptions,i),e=t.options=Kt(r,t.extendOptions),e.name&&(e.components[e.name]=t)}}return e}function Fc(t){var e,r=t.options,n=t.sealedOptions;for(var i in r)r[i]!==n[i]&&(e||(e={}),e[i]=r[i]);return e}function H(t){this._init(t)}Dc(H);jc(H);Zs(H);ec(H);Fs(H);function Nc(t){t.use=function(e){var r=this._installedPlugins||(this._installedPlugins=[]);if(r.indexOf(e)>-1)return this;var n=Rr(arguments,1);return n.unshift(this),D(e.install)?e.install.apply(e,n):D(e)&&e.apply(null,n),r.push(e),this}}function Uc(t){t.mixin=function(e){return this.options=Kt(this.options,e),this}}function Bc(t){t.cid=0;var e=1;t.extend=function(r){r=r||{};var n=this,i=n.cid,a=r._Ctor||(r._Ctor={});if(a[i])return a[i];var o=ir(r)||ir(n.options),s=function(u){this._init(u)};return s.prototype=Object.create(n.prototype),s.prototype.constructor=s,s.cid=e++,s.options=Kt(n.options,r),s.super=n,s.options.props&&Hc(s),s.options.computed&&zc(s),s.extend=n.extend,s.mixin=n.mixin,s.use=n.use,gr.forEach(function(c){s[c]=n[c]}),o&&(s.options.components[o]=s),s.superOptions=n.options,s.extendOptions=r,s.sealedOptions=M({},s.options),a[i]=s,s}}function Hc(t){var e=t.options.props;for(var r in e)Cn(t.prototype,"_props",r)}function zc(t){var e=t.options.computed;for(var r in e)Da(t.prototype,r,e[r])}function Wc(t){gr.forEach(function(e){t[e]=function(r,n){return n?(e==="component"&&et(n)&&(n.name=n.name||r,n=this.options._base.extend(n)),e==="directive"&&D(n)&&(n={bind:n,update:n}),this.options[e+"s"][r]=n,n):this.options[e+"s"][r]}})}function hi(t){return t&&(ir(t.Ctor.options)||t.tag)}function je(t,e){return T(t)?t.indexOf(e)>-1:typeof t=="string"?t.split(",").indexOf(e)>-1:zo(t)?t.test(e):!1}function vi(t,e){var r=t.cache,n=t.keys,i=t._vnode;for(var a in r){var o=r[a];if(o){var s=o.name;s&&!e(s)&&Kr(r,a,n,i)}}}function Kr(t,e,r,n){var i=t[e];i&&(!n||i.tag!==n.tag)&&i.componentInstance.$destroy(),t[e]=null,Rt(r,e)}var gi=[String,RegExp,Array],qc={name:"keep-alive",abstract:!0,props:{include:gi,exclude:gi,max:[String,Number]},methods:{cacheVNode:function(){var t=this,e=t.cache,r=t.keys,n=t.vnodeToCache,i=t.keyToCache;if(n){var a=n.tag,o=n.componentInstance,s=n.componentOptions;e[i]={name:hi(s),tag:a,componentInstance:o},r.push(i),this.max&&r.length>parseInt(this.max)&&Kr(e,r[0],r,this._vnode),this.vnodeToCache=null}}},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var t in this.cache)Kr(this.cache,t,this.keys)},mounted:function(){var t=this;this.cacheVNode(),this.$watch("include",function(e){vi(t,function(r){return je(e,r)})}),this.$watch("exclude",function(e){vi(t,function(r){return!je(e,r)})})},updated:function(){this.cacheVNode()},render:function(){var t=this.$slots.default,e=Oa(t),r=e&&e.componentOptions;if(r){var n=hi(r),i=this,a=i.include,o=i.exclude;if(a&&(!n||!je(a,n))||o&&n&&je(o,n))return e;var s=this,c=s.cache,u=s.keys,f=e.key==null?r.Ctor.cid+(r.tag?"::".concat(r.tag):""):e.key;c[f]?(e.componentInstance=c[f].componentInstance,Rt(u,f),u.push(f)):(this.vnodeToCache=e,this.keyToCache=f),e.data.keepAlive=!0}return e||t&&t[0]}},Gc={KeepAlive:qc};function Jc(t){var e={};e.get=function(){return at},Object.defineProperty(t,"config",e),t.util={warn:mc,extend:M,mergeOptions:Kt,defineReactive:kt},t.set=dn,t.delete=da,t.nextTick=gn,t.observable=function(r){return wt(r),r},t.options=Object.create(null),gr.forEach(function(r){t.options[r+"s"]=Object.create(null)}),t.options._base=t,M(t.options.components,Gc),Nc(t),Uc(t),Bc(t),Wc(t)}Jc(H);Object.defineProperty(H.prototype,"$isServer",{get:jt});Object.defineProperty(H.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}});Object.defineProperty(H,"FunctionalRenderContext",{value:yn});H.version=Js;var Kc=ut("style,class"),Yc=ut("input,textarea,option,select,progress"),Xc=function(t,e,r){return r==="value"&&Yc(t)&&e!=="button"||r==="selected"&&t==="option"||r==="checked"&&t==="input"||r==="muted"&&t==="video"},Ma=ut("contenteditable,draggable,spellcheck"),Qc=ut("events,caret,typing,plaintext-only"),Vc=function(t,e){return or(e)||e==="false"?"false":t==="contenteditable"&&Qc(e)?e:"true"},Zc=ut("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible"),Yr="http://www.w3.org/1999/xlink",On=function(t){return t.charAt(5)===":"&&t.slice(0,5)==="xlink"},Fa=function(t){return On(t)?t.slice(6,t.length):""},or=function(t){return t==null||t===!1};function tu(t){for(var e=t.data,r=t,n=t;d(n.componentInstance);)n=n.componentInstance._vnode,n&&n.data&&(e=mi(n.data,e));for(;d(r=r.parent);)r&&r.data&&(e=mi(e,r.data));return eu(e.staticClass,e.class)}function mi(t,e){return{staticClass:En(t.staticClass,e.staticClass),class:d(t.class)?[t.class,e.class]:e.class}}function eu(t,e){return d(t)||d(e)?En(t,$n(e)):""}function En(t,e){return t?e?t+" "+e:t:e||""}function $n(t){return Array.isArray(t)?ru(t):K(t)?nu(t):typeof t=="string"?t:""}function ru(t){for(var e="",r,n=0,i=t.length;n<i;n++)d(r=$n(t[n]))&&r!==""&&(e&&(e+=" "),e+=r);return e}function nu(t){var e="";for(var r in t)t[r]&&(e&&(e+=" "),e+=r);return e}var iu={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},au=ut("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),An=ut("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),Na=function(t){return au(t)||An(t)};function ou(t){if(An(t))return"svg";if(t==="math")return"math"}var Le=Object.create(null);function su(t){if(!nt)return!0;if(Na(t))return!1;if(t=t.toLowerCase(),Le[t]!=null)return Le[t];var e=document.createElement(t);return t.indexOf("-")>-1?Le[t]=e.constructor===window.HTMLUnknownElement||e.constructor===window.HTMLElement:Le[t]=/HTMLUnknownElement/.test(e.toString())}var Xr=ut("text,number,password,search,email,tel,url");function cu(t){if(typeof t=="string"){var e=document.querySelector(t);return e||document.createElement("div")}else return t}function uu(t,e){var r=document.createElement(t);return t!=="select"||e.data&&e.data.attrs&&e.data.attrs.multiple!==void 0&&r.setAttribute("multiple","multiple"),r}function fu(t,e){return document.createElementNS(iu[t],e)}function lu(t){return document.createTextNode(t)}function pu(t){return document.createComment(t)}function du(t,e,r){t.insertBefore(e,r)}function hu(t,e){t.removeChild(e)}function vu(t,e){t.appendChild(e)}function gu(t){return t.parentNode}function mu(t){return t.nextSibling}function _u(t){return t.tagName}function bu(t,e){t.textContent=e}function yu(t,e){t.setAttribute(e,"")}var wu=Object.freeze({__proto__:null,createElement:uu,createElementNS:fu,createTextNode:lu,createComment:pu,insertBefore:du,removeChild:hu,appendChild:vu,parentNode:gu,nextSibling:mu,tagName:_u,setTextContent:bu,setStyleScope:yu}),Su={create:function(t,e){ne(e)},update:function(t,e){t.data.ref!==e.data.ref&&(ne(t,!0),ne(e))},destroy:function(t){ne(t,!0)}};function ne(t,e){var r=t.data.ref;if(!!d(r)){var n=t.context,i=t.componentInstance||t.elm,a=e?null:i,o=e?void 0:i;if(D(r)){St(r,n,[a],n,"template ref function");return}var s=t.data.refInFor,c=typeof r=="string"||typeof r=="number",u=tt(r),f=n.$refs;if(c||u){if(s){var h=c?f[r]:r.value;e?T(h)&&Rt(h,i):T(h)?h.includes(i)||h.push(i):c?(f[r]=[i],_i(n,r,f[r])):r.value=[i]}else if(c){if(e&&f[r]!==i)return;f[r]=o,_i(n,r,a)}else if(u){if(e&&r.value!==i)return;r.value=a}}}}function _i(t,e,r){var n=t._setupState;n&&X(n,e)&&(tt(n[e])?n[e].value=r:n[e]=r)}var Ot=new rt("",{},[]),he=["create","activate","update","remove","destroy"];function Nt(t,e){return t.key===e.key&&t.asyncFactory===e.asyncFactory&&(t.tag===e.tag&&t.isComment===e.isComment&&d(t.data)===d(e.data)&&Cu(t,e)||z(t.isAsyncPlaceholder)&&O(e.asyncFactory.error))}function Cu(t,e){if(t.tag!=="input")return!0;var r,n=d(r=t.data)&&d(r=r.attrs)&&r.type,i=d(r=e.data)&&d(r=r.attrs)&&r.type;return n===i||Xr(n)&&Xr(i)}function xu(t,e,r){var n,i,a={};for(n=e;n<=r;++n)i=t[n].key,d(i)&&(a[i]=n);return a}function Ou(t){var e,r,n={},i=t.modules,a=t.nodeOps;for(e=0;e<he.length;++e)for(n[he[e]]=[],r=0;r<i.length;++r)d(i[r][he[e]])&&n[he[e]].push(i[r][he[e]]);function o(p){return new rt(a.tagName(p).toLowerCase(),{},[],void 0,p)}function s(p,l){function g(){--g.listeners===0&&c(p)}return g.listeners=l,g}function c(p){var l=a.parentNode(p);d(l)&&a.removeChild(l,p)}function u(p,l,g,w,x,I,E){if(d(p.elm)&&d(I)&&(p=I[E]=Dr(p)),p.isRootInsert=!x,!f(p,l,g,w)){var $=p.data,k=p.children,R=p.tag;d(R)?(p.elm=p.ns?a.createElementNS(p.ns,R):a.createElement(R,p),S(p),b(p,k,l),d($)&&_(p,l),m(g,p.elm,w)):z(p.isComment)?(p.elm=a.createComment(p.text),m(g,p.elm,w)):(p.elm=a.createTextNode(p.text),m(g,p.elm,w))}}function f(p,l,g,w){var x=p.data;if(d(x)){var I=d(p.componentInstance)&&x.keepAlive;if(d(x=x.hook)&&d(x=x.init)&&x(p,!1),d(p.componentInstance))return h(p,l),m(g,p.elm,w),z(I)&&v(p,l,g,w),!0}}function h(p,l){d(p.data.pendingInsert)&&(l.push.apply(l,p.data.pendingInsert),p.data.pendingInsert=null),p.elm=p.componentInstance.$el,y(p)?(_(p,l),S(p)):(ne(p),l.push(p))}function v(p,l,g,w){for(var x,I=p;I.componentInstance;)if(I=I.componentInstance._vnode,d(x=I.data)&&d(x=x.transition)){for(x=0;x<n.activate.length;++x)n.activate[x](Ot,I);l.push(I);break}m(g,p.elm,w)}function m(p,l,g){d(p)&&(d(g)?a.parentNode(g)===p&&a.insertBefore(p,l,g):a.appendChild(p,l))}function b(p,l,g){if(T(l))for(var w=0;w<l.length;++w)u(l[w],g,p.elm,null,!0,l,w);else Oe(p.text)&&a.appendChild(p.elm,a.createTextNode(String(p.text)))}function y(p){for(;p.componentInstance;)p=p.componentInstance._vnode;return d(p.tag)}function _(p,l){for(var g=0;g<n.create.length;++g)n.create[g](Ot,p);e=p.data.hook,d(e)&&(d(e.create)&&e.create(Ot,p),d(e.insert)&&l.push(p))}function S(p){var l;if(d(l=p.fnScopeId))a.setStyleScope(p.elm,l);else for(var g=p;g;)d(l=g.context)&&d(l=l.$options._scopeId)&&a.setStyleScope(p.elm,l),g=g.parent;d(l=Ht)&&l!==p.context&&l!==p.fnContext&&d(l=l.$options._scopeId)&&a.setStyleScope(p.elm,l)}function C(p,l,g,w,x,I){for(;w<=x;++w)u(g[w],I,p,l,!1,g,w)}function A(p){var l,g,w=p.data;if(d(w))for(d(l=w.hook)&&d(l=l.destroy)&&l(p),l=0;l<n.destroy.length;++l)n.destroy[l](p);if(d(l=p.children))for(g=0;g<p.children.length;++g)A(p.children[g])}function P(p,l,g){for(;l<=g;++l){var w=p[l];d(w)&&(d(w.tag)?(L(w),A(w)):c(w.elm))}}function L(p,l){if(d(l)||d(p.data)){var g,w=n.remove.length+1;for(d(l)?l.listeners+=w:l=s(p.elm,w),d(g=p.componentInstance)&&d(g=g._vnode)&&d(g.data)&&L(g,l),g=0;g<n.remove.length;++g)n.remove[g](p,l);d(g=p.data.hook)&&d(g=g.remove)?g(p,l):l()}else c(p.elm)}function N(p,l,g,w,x){for(var I=0,E=0,$=l.length-1,k=l[0],R=l[$],j=g.length-1,q=g[0],it=g[j],Dt,Mt,Ft,Qt,Cr=!x;I<=$&&E<=j;)O(k)?k=l[++I]:O(R)?R=l[--$]:Nt(k,q)?(W(k,q,w,g,E),k=l[++I],q=g[++E]):Nt(R,it)?(W(R,it,w,g,j),R=l[--$],it=g[--j]):Nt(k,it)?(W(k,it,w,g,j),Cr&&a.insertBefore(p,k.elm,a.nextSibling(R.elm)),k=l[++I],it=g[--j]):Nt(R,q)?(W(R,q,w,g,E),Cr&&a.insertBefore(p,R.elm,k.elm),R=l[--$],q=g[++E]):(O(Dt)&&(Dt=xu(l,I,$)),Mt=d(q.key)?Dt[q.key]:U(q,l,I,$),O(Mt)?u(q,w,p,k.elm,!1,g,E):(Ft=l[Mt],Nt(Ft,q)?(W(Ft,q,w,g,E),l[Mt]=void 0,Cr&&a.insertBefore(p,Ft.elm,k.elm)):u(q,w,p,k.elm,!1,g,E)),q=g[++E]);I>$?(Qt=O(g[j+1])?null:g[j+1].elm,C(p,Qt,g,E,j,w)):E>j&&P(l,I,$)}function U(p,l,g,w){for(var x=g;x<w;x++){var I=l[x];if(d(I)&&Nt(p,I))return x}}function W(p,l,g,w,x,I){if(p!==l){d(l.elm)&&d(w)&&(l=w[x]=Dr(l));var E=l.elm=p.elm;if(z(p.isAsyncPlaceholder)){d(l.asyncFactory.resolved)?vt(p.elm,l,g):l.isAsyncPlaceholder=!0;return}if(z(l.isStatic)&&z(p.isStatic)&&l.key===p.key&&(z(l.isCloned)||z(l.isOnce))){l.componentInstance=p.componentInstance;return}var $,k=l.data;d(k)&&d($=k.hook)&&d($=$.prepatch)&&$(p,l);var R=p.children,j=l.children;if(d(k)&&y(l)){for($=0;$<n.update.length;++$)n.update[$](p,l);d($=k.hook)&&d($=$.update)&&$(p,l)}O(l.text)?d(R)&&d(j)?R!==j&&N(E,R,j,g,I):d(j)?(d(p.text)&&a.setTextContent(E,""),C(E,null,j,0,j.length-1,g)):d(R)?P(R,0,R.length-1):d(p.text)&&a.setTextContent(E,""):p.text!==l.text&&a.setTextContent(E,l.text),d(k)&&d($=k.hook)&&d($=$.postpatch)&&$(p,l)}}function dt(p,l,g){if(z(g)&&d(p.parent))p.parent.data.pendingInsert=l;else for(var w=0;w<l.length;++w)l[w].data.hook.insert(l[w])}var ht=ut("attrs,class,staticClass,staticStyle,key");function vt(p,l,g,w){var x,I=l.tag,E=l.data,$=l.children;if(w=w||E&&E.pre,l.elm=p,z(l.isComment)&&d(l.asyncFactory))return l.isAsyncPlaceholder=!0,!0;if(d(E)&&(d(x=E.hook)&&d(x=x.init)&&x(l,!0),d(x=l.componentInstance)))return h(l,g),!0;if(d(I)){if(d($))if(!p.hasChildNodes())b(l,$,g);else if(d(x=E)&&d(x=x.domProps)&&d(x=x.innerHTML)){if(x!==p.innerHTML)return!1}else{for(var k=!0,R=p.firstChild,j=0;j<$.length;j++){if(!R||!vt(R,$[j],g,w)){k=!1;break}R=R.nextSibling}if(!k||R)return!1}if(d(E)){var q=!1;for(var it in E)if(!ht(it)){q=!0,_(l,g);break}!q&&E.class&&oe(E.class)}}else p.data!==l.text&&(p.data=l.text);return!0}return function(l,g,w,x){if(O(g)){d(l)&&A(l);return}var I=!1,E=[];if(O(l))I=!0,u(g,E);else{var $=d(l.nodeType);if(!$&&Nt(l,g))W(l,g,E,null,null,x);else{if($){if(l.nodeType===1&&l.hasAttribute(Hn)&&(l.removeAttribute(Hn),w=!0),z(w)&&vt(l,g,E))return dt(g,E,!0),l;l=o(l)}var k=l.elm,R=a.parentNode(k);if(u(g,E,k._leaveCb?null:R,a.nextSibling(k)),d(g.parent))for(var j=g.parent,q=y(g);j;){for(var it=0;it<n.destroy.length;++it)n.destroy[it](j);if(j.elm=g.elm,q){for(var Dt=0;Dt<n.create.length;++Dt)n.create[Dt](Ot,j);var Mt=j.data.hook.insert;if(Mt.merged)for(var Ft=Mt.fns.slice(1),Qt=0;Qt<Ft.length;Qt++)Ft[Qt]()}else ne(j);j=j.parent}d(R)?P([l],0,0):d(l.tag)&&A(l)}}return dt(g,E,I),g.elm}}var Eu={create:Er,update:Er,destroy:function(e){Er(e,Ot)}};function Er(t,e){(t.data.directives||e.data.directives)&&$u(t,e)}function $u(t,e){var r=t===Ot,n=e===Ot,i=bi(t.data.directives,t.context),a=bi(e.data.directives,e.context),o=[],s=[],c,u,f;for(c in a)u=i[c],f=a[c],u?(f.oldValue=u.value,f.oldArg=u.arg,ve(f,"update",e,t),f.def&&f.def.componentUpdated&&s.push(f)):(ve(f,"bind",e,t),f.def&&f.def.inserted&&o.push(f));if(o.length){var h=function(){for(var v=0;v<o.length;v++)ve(o[v],"inserted",e,t)};r?xt(e,"insert",h):h()}if(s.length&&xt(e,"postpatch",function(){for(var v=0;v<s.length;v++)ve(s[v],"componentUpdated",e,t)}),!r)for(c in i)a[c]||ve(i[c],"unbind",t,t,n)}var Au=Object.create(null);function bi(t,e){var r=Object.create(null);if(!t)return r;var n,i;for(n=0;n<t.length;n++){if(i=t[n],i.modifiers||(i.modifiers=Au),r[Tu(i)]=i,e._setupState&&e._setupState.__sfc){var a=i.def||ar(e,"_setupState","v-"+i.name);typeof a=="function"?i.def={bind:a,update:a}:i.def=a}i.def=i.def||ar(e.$options,"directives",i.name)}return r}function Tu(t){return t.rawName||"".concat(t.name,".").concat(Object.keys(t.modifiers||{}).join("."))}function ve(t,e,r,n,i){var a=t.def&&t.def[e];if(a)try{a(r.elm,t,r,n,i)}catch(o){Jt(o,r.context,"directive ".concat(t.name," ").concat(e," hook"))}}var Pu=[Su,Eu];function yi(t,e){var r=e.componentOptions;if(!(d(r)&&r.Ctor.options.inheritAttrs===!1)&&!(O(t.data.attrs)&&O(e.data.attrs))){var n,i,a,o=e.elm,s=t.data.attrs||{},c=e.data.attrs||{};(d(c.__ob__)||z(c._v_attr_proxy))&&(c=e.data.attrs=M({},c));for(n in c)i=c[n],a=s[n],a!==i&&wi(o,n,i,e.data.pre);(ce||ln)&&c.value!==s.value&&wi(o,"value",c.value);for(n in s)O(c[n])&&(On(n)?o.removeAttributeNS(Yr,Fa(n)):Ma(n)||o.removeAttribute(n))}}function wi(t,e,r,n){n||t.tagName.indexOf("-")>-1?Si(t,e,r):Zc(e)?or(r)?t.removeAttribute(e):(r=e==="allowfullscreen"&&t.tagName==="EMBED"?"true":e,t.setAttribute(e,r)):Ma(e)?t.setAttribute(e,Vc(e,r)):On(e)?or(r)?t.removeAttributeNS(Yr,Fa(e)):t.setAttributeNS(Yr,e,r):Si(t,e,r)}function Si(t,e,r){if(or(r))t.removeAttribute(e);else{if(ce&&!ue&&t.tagName==="TEXTAREA"&&e==="placeholder"&&r!==""&&!t.__ieph){var n=function(i){i.stopImmediatePropagation(),t.removeEventListener("input",n)};t.addEventListener("input",n),t.__ieph=!0}t.setAttribute(e,r)}}var Iu={create:yi,update:yi};function Ci(t,e){var r=e.elm,n=e.data,i=t.data;if(!(O(n.staticClass)&&O(n.class)&&(O(i)||O(i.staticClass)&&O(i.class)))){var a=tu(e),o=r._transitionClasses;d(o)&&(a=En(a,$n(o))),a!==r._prevClass&&(r.setAttribute("class",a),r._prevClass=a)}}var ku={create:Ci,update:Ci},$r="__r",Ar="__c";function Ru(t){if(d(t[$r])){var e=ce?"change":"input";t[e]=[].concat(t[$r],t[e]||[]),delete t[$r]}d(t[Ar])&&(t.change=[].concat(t[Ar],t.change||[]),delete t[Ar])}var xe;function ju(t,e,r){var n=xe;return function i(){var a=e.apply(null,arguments);a!==null&&Ua(t,i,r,n)}}var Lu=Ur&&!(zn&&Number(zn[1])<=53);function Du(t,e,r,n){if(Lu){var i=Ra,a=e;e=a._wrapper=function(o){if(o.target===o.currentTarget||o.timeStamp>=i||o.timeStamp<=0||o.target.ownerDocument!==document)return a.apply(this,arguments)}}xe.addEventListener(t,e,fa?{capture:r,passive:n}:r)}function Ua(t,e,r,n){(n||xe).removeEventListener(t,e._wrapper||e,r)}function Tr(t,e){if(!(O(t.data.on)&&O(e.data.on))){var r=e.data.on||{},n=t.data.on||{};xe=e.elm||t.elm,Ru(r),ba(r,n,Du,Ua,ju,e.context),xe=void 0}}var Mu={create:Tr,update:Tr,destroy:function(t){return Tr(t,Ot)}},De;function xi(t,e){if(!(O(t.data.domProps)&&O(e.data.domProps))){var r,n,i=e.elm,a=t.data.domProps||{},o=e.data.domProps||{};(d(o.__ob__)||z(o._v_attr_proxy))&&(o=e.data.domProps=M({},o));for(r in a)r in o||(i[r]="");for(r in o){if(n=o[r],r==="textContent"||r==="innerHTML"){if(e.children&&(e.children.length=0),n===a[r])continue;i.childNodes.length===1&&i.removeChild(i.childNodes[0])}if(r==="value"&&i.tagName!=="PROGRESS"){i._value=n;var s=O(n)?"":String(n);Fu(i,s)&&(i.value=s)}else if(r==="innerHTML"&&An(i.tagName)&&O(i.innerHTML)){De=De||document.createElement("div"),De.innerHTML="<svg>".concat(n,"</svg>");for(var c=De.firstChild;i.firstChild;)i.removeChild(i.firstChild);for(;c.firstChild;)i.appendChild(c.firstChild)}else if(n!==a[r])try{i[r]=n}catch(u){}}}}function Fu(t,e){return!t.composing&&(t.tagName==="OPTION"||Nu(t,e)||Uu(t,e))}function Nu(t,e){var r=!0;try{r=document.activeElement!==t}catch(n){}return r&&t.value!==e}function Uu(t,e){var r=t.value,n=t._vModifiers;if(d(n)){if(n.number)return be(r)!==be(e);if(n.trim)return r.trim()!==e.trim()}return r!==e}var Bu={create:xi,update:xi},Hu=Yt(function(t){var e={},r=/;(?![^(]*\))/g,n=/:(.+)/;return t.split(r).forEach(function(i){if(i){var a=i.split(n);a.length>1&&(e[a[0].trim()]=a[1].trim())}}),e});function Pr(t){var e=Ba(t.style);return t.staticStyle?M(t.staticStyle,e):e}function Ba(t){return Array.isArray(t)?aa(t):typeof t=="string"?Hu(t):t}function zu(t,e){var r={},n;if(e)for(var i=t;i.componentInstance;)i=i.componentInstance._vnode,i&&i.data&&(n=Pr(i.data))&&M(r,n);(n=Pr(t.data))&&M(r,n);for(var a=t;a=a.parent;)a.data&&(n=Pr(a.data))&&M(r,n);return r}var Wu=/^--/,Oi=/\s*!important$/,Ei=function(t,e,r){if(Wu.test(e))t.style.setProperty(e,r);else if(Oi.test(r))t.style.setProperty(Ee(e),r.replace(Oi,""),"important");else{var n=qu(e);if(Array.isArray(r))for(var i=0,a=r.length;i<a;i++)t.style[n]=r[i];else t.style[n]=r}},$i=["Webkit","Moz","ms"],Me,qu=Yt(function(t){if(Me=Me||document.createElement("div").style,t=qt(t),t!=="filter"&&t in Me)return t;for(var e=t.charAt(0).toUpperCase()+t.slice(1),r=0;r<$i.length;r++){var n=$i[r]+e;if(n in Me)return n}});function Ai(t,e){var r=e.data,n=t.data;if(!(O(r.staticStyle)&&O(r.style)&&O(n.staticStyle)&&O(n.style))){var i,a,o=e.elm,s=n.staticStyle,c=n.normalizedStyle||n.style||{},u=s||c,f=Ba(e.data.style)||{};e.data.normalizedStyle=d(f.__ob__)?M({},f):f;var h=zu(e,!0);for(a in u)O(h[a])&&Ei(o,a,"");for(a in h)i=h[a],i!==u[a]&&Ei(o,a,i==null?"":i)}}var Gu={create:Ai,update:Ai},Ha=/\s+/;function za(t,e){if(!(!e||!(e=e.trim())))if(t.classList)e.indexOf(" ")>-1?e.split(Ha).forEach(function(n){return t.classList.add(n)}):t.classList.add(e);else{var r=" ".concat(t.getAttribute("class")||""," ");r.indexOf(" "+e+" ")<0&&t.setAttribute("class",(r+e).trim())}}function Wa(t,e){if(!(!e||!(e=e.trim())))if(t.classList)e.indexOf(" ")>-1?e.split(Ha).forEach(function(i){return t.classList.remove(i)}):t.classList.remove(e),t.classList.length||t.removeAttribute("class");else{for(var r=" ".concat(t.getAttribute("class")||""," "),n=" "+e+" ";r.indexOf(n)>=0;)r=r.replace(n," ");r=r.trim(),r?t.setAttribute("class",r):t.removeAttribute("class")}}function qa(t){if(!!t){if(typeof t=="object"){var e={};return t.css!==!1&&M(e,Ti(t.name||"v")),M(e,t),e}else if(typeof t=="string")return Ti(t)}}var Ti=Yt(function(t){return{enterClass:"".concat(t,"-enter"),enterToClass:"".concat(t,"-enter-to"),enterActiveClass:"".concat(t,"-enter-active"),leaveClass:"".concat(t,"-leave"),leaveToClass:"".concat(t,"-leave-to"),leaveActiveClass:"".concat(t,"-leave-active")}}),Ga=nt&&!ue,te="transition",Ir="animation",ze="transition",sr="transitionend",Qr="animation",Ja="animationend";Ga&&(window.ontransitionend===void 0&&window.onwebkittransitionend!==void 0&&(ze="WebkitTransition",sr="webkitTransitionEnd"),window.onanimationend===void 0&&window.onwebkitanimationend!==void 0&&(Qr="WebkitAnimation",Ja="webkitAnimationEnd"));var Pi=nt?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:function(t){return t()};function Ka(t){Pi(function(){Pi(t)})}function zt(t,e){var r=t._transitionClasses||(t._transitionClasses=[]);r.indexOf(e)<0&&(r.push(e),za(t,e))}function bt(t,e){t._transitionClasses&&Rt(t._transitionClasses,e),Wa(t,e)}function Ya(t,e,r){var n=Xa(t,e),i=n.type,a=n.timeout,o=n.propCount;if(!i)return r();var s=i===te?sr:Ja,c=0,u=function(){t.removeEventListener(s,f),r()},f=function(h){h.target===t&&++c>=o&&u()};setTimeout(function(){c<o&&u()},a+1),t.addEventListener(s,f)}var Ju=/\b(transform|all)(,|$)/;function Xa(t,e){var r=window.getComputedStyle(t),n=(r[ze+"Delay"]||"").split(", "),i=(r[ze+"Duration"]||"").split(", "),a=Ii(n,i),o=(r[Qr+"Delay"]||"").split(", "),s=(r[Qr+"Duration"]||"").split(", "),c=Ii(o,s),u,f=0,h=0;e===te?a>0&&(u=te,f=a,h=i.length):e===Ir?c>0&&(u=Ir,f=c,h=s.length):(f=Math.max(a,c),u=f>0?a>c?te:Ir:null,h=u?u===te?i.length:s.length:0);var v=u===te&&Ju.test(r[ze+"Property"]);return{type:u,timeout:f,propCount:h,hasTransform:v}}function Ii(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max.apply(null,e.map(function(r,n){return ki(r)+ki(t[n])}))}function ki(t){return Number(t.slice(0,-1).replace(",","."))*1e3}function Vr(t,e){var r=t.elm;d(r._leaveCb)&&(r._leaveCb.cancelled=!0,r._leaveCb());var n=qa(t.data.transition);if(!O(n)&&!(d(r._enterCb)||r.nodeType!==1)){for(var i=n.css,a=n.type,o=n.enterClass,s=n.enterToClass,c=n.enterActiveClass,u=n.appearClass,f=n.appearToClass,h=n.appearActiveClass,v=n.beforeEnter,m=n.enter,b=n.afterEnter,y=n.enterCancelled,_=n.beforeAppear,S=n.appear,C=n.afterAppear,A=n.appearCancelled,P=n.duration,L=Ht,N=Ht.$vnode;N&&N.parent;)L=N.context,N=N.parent;var U=!L._isMounted||!t.isRootInsert;if(!(U&&!S&&S!=="")){var W=U&&u?u:o,dt=U&&h?h:c,ht=U&&f?f:s,vt=U&&_||v,p=U&&D(S)?S:m,l=U&&C||b,g=U&&A||y,w=be(K(P)?P.enter:P),x=i!==!1&&!ue,I=Tn(p),E=r._enterCb=Ve(function(){x&&(bt(r,ht),bt(r,dt)),E.cancelled?(x&&bt(r,W),g&&g(r)):l&&l(r),r._enterCb=null});t.data.show||xt(t,"insert",function(){var $=r.parentNode,k=$&&$._pending&&$._pending[t.key];k&&k.tag===t.tag&&k.elm._leaveCb&&k.elm._leaveCb(),p&&p(r,E)}),vt&&vt(r),x&&(zt(r,W),zt(r,dt),Ka(function(){bt(r,W),E.cancelled||(zt(r,ht),I||(Va(w)?setTimeout(E,w):Ya(r,a,E)))})),t.data.show&&(e&&e(),p&&p(r,E)),!x&&!I&&E()}}}function Qa(t,e){var r=t.elm;d(r._enterCb)&&(r._enterCb.cancelled=!0,r._enterCb());var n=qa(t.data.transition);if(O(n)||r.nodeType!==1)return e();if(d(r._leaveCb))return;var i=n.css,a=n.type,o=n.leaveClass,s=n.leaveToClass,c=n.leaveActiveClass,u=n.beforeLeave,f=n.leave,h=n.afterLeave,v=n.leaveCancelled,m=n.delayLeave,b=n.duration,y=i!==!1&&!ue,_=Tn(f),S=be(K(b)?b.leave:b),C=r._leaveCb=Ve(function(){r.parentNode&&r.parentNode._pending&&(r.parentNode._pending[t.key]=null),y&&(bt(r,s),bt(r,c)),C.cancelled?(y&&bt(r,o),v&&v(r)):(e(),h&&h(r)),r._leaveCb=null});m?m(A):A();function A(){C.cancelled||(!t.data.show&&r.parentNode&&((r.parentNode._pending||(r.parentNode._pending={}))[t.key]=t),u&&u(r),y&&(zt(r,o),zt(r,c),Ka(function(){bt(r,o),C.cancelled||(zt(r,s),_||(Va(S)?setTimeout(C,S):Ya(r,a,C)))})),f&&f(r,C),!y&&!_&&C())}}function Va(t){return typeof t=="number"&&!isNaN(t)}function Tn(t){if(O(t))return!1;var e=t.fns;return d(e)?Tn(Array.isArray(e)?e[0]:e):(t._length||t.length)>1}function Ri(t,e){e.data.show!==!0&&Vr(e)}var Ku=nt?{create:Ri,activate:Ri,remove:function(t,e){t.data.show!==!0?Qa(t,e):e()}}:{},Yu=[Iu,ku,Mu,Bu,Gu,Ku],Xu=Yu.concat(Pu),Qu=Ou({nodeOps:wu,modules:Xu});ue&&document.addEventListener("selectionchange",function(){var t=document.activeElement;t&&t.vmodel&&Pn(t,"input")});var Za={inserted:function(t,e,r,n){r.tag==="select"?(n.elm&&!n.elm._vOptions?xt(r,"postpatch",function(){Za.componentUpdated(t,e,r)}):ji(t,e,r.context),t._vOptions=[].map.call(t.options,cr)):(r.tag==="textarea"||Xr(t.type))&&(t._vModifiers=e.modifiers,e.modifiers.lazy||(t.addEventListener("compositionstart",Vu),t.addEventListener("compositionend",Mi),t.addEventListener("change",Mi),ue&&(t.vmodel=!0)))},componentUpdated:function(t,e,r){if(r.tag==="select"){ji(t,e,r.context);var n=t._vOptions,i=t._vOptions=[].map.call(t.options,cr);if(i.some(function(o,s){return!Gt(o,n[s])})){var a=t.multiple?e.value.some(function(o){return Di(o,i)}):e.value!==e.oldValue&&Di(e.value,i);a&&Pn(t,"change")}}}};function ji(t,e,r){Li(t,e),(ce||ln)&&setTimeout(function(){Li(t,e)},0)}function Li(t,e,r){var n=e.value,i=t.multiple;if(!(i&&!Array.isArray(n))){for(var a,o,s=0,c=t.options.length;s<c;s++)if(o=t.options[s],i)a=sa(n,cr(o))>-1,o.selected!==a&&(o.selected=a);else if(Gt(cr(o),n)){t.selectedIndex!==s&&(t.selectedIndex=s);return}i||(t.selectedIndex=-1)}}function Di(t,e){return e.every(function(r){return!Gt(r,t)})}function cr(t){return"_value"in t?t._value:t.value}function Vu(t){t.target.composing=!0}function Mi(t){!t.target.composing||(t.target.composing=!1,Pn(t.target,"input"))}function Pn(t,e){var r=document.createEvent("HTMLEvents");r.initEvent(e,!0,!0),t.dispatchEvent(r)}function Zr(t){return t.componentInstance&&(!t.data||!t.data.transition)?Zr(t.componentInstance._vnode):t}var Zu={bind:function(t,e,r){var n=e.value;r=Zr(r);var i=r.data&&r.data.transition,a=t.__vOriginalDisplay=t.style.display==="none"?"":t.style.display;n&&i?(r.data.show=!0,Vr(r,function(){t.style.display=a})):t.style.display=n?a:"none"},update:function(t,e,r){var n=e.value,i=e.oldValue;if(!n!=!i){r=Zr(r);var a=r.data&&r.data.transition;a?(r.data.show=!0,n?Vr(r,function(){t.style.display=t.__vOriginalDisplay}):Qa(r,function(){t.style.display="none"})):t.style.display=n?t.__vOriginalDisplay:"none"}},unbind:function(t,e,r,n,i){i||(t.style.display=t.__vOriginalDisplay)}},tf={model:Za,show:Zu},to={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]};function tn(t){var e=t&&t.componentOptions;return e&&e.Ctor.options.abstract?tn(Oa(e.children)):t}function eo(t){var e={},r=t.$options;for(var n in r.propsData)e[n]=t[n];var i=r._parentListeners;for(var n in i)e[qt(n)]=i[n];return e}function Fi(t,e){if(/\d-keep-alive$/.test(e.tag))return t("keep-alive",{props:e.componentOptions.propsData})}function ef(t){for(;t=t.parent;)if(t.data.transition)return!0}function rf(t,e){return e.key===t.key&&e.tag===t.tag}var nf=function(t){return t.tag||we(t)},af=function(t){return t.name==="show"},of={name:"transition",props:to,abstract:!0,render:function(t){var e=this,r=this.$slots.default;if(!!r&&(r=r.filter(nf),!!r.length)){var n=this.mode,i=r[0];if(ef(this.$vnode))return i;var a=tn(i);if(!a)return i;if(this._leaving)return Fi(t,i);var o="__transition-".concat(this._uid,"-");a.key=a.key==null?a.isComment?o+"comment":o+a.tag:Oe(a.key)?String(a.key).indexOf(o)===0?a.key:o+a.key:a.key;var s=(a.data||(a.data={})).transition=eo(this),c=this._vnode,u=tn(c);if(a.data.directives&&a.data.directives.some(af)&&(a.data.show=!0),u&&u.data&&!rf(a,u)&&!we(u)&&!(u.componentInstance&&u.componentInstance._vnode.isComment)){var f=u.data.transition=M({},s);if(n==="out-in")return this._leaving=!0,xt(f,"afterLeave",function(){e._leaving=!1,e.$forceUpdate()}),Fi(t,i);if(n==="in-out"){if(we(a))return c;var h,v=function(){h()};xt(s,"afterEnter",v),xt(s,"enterCancelled",v),xt(f,"delayLeave",function(m){h=m})}}return i}}},ro=M({tag:String,moveClass:String},to);delete ro.mode;var sf={props:ro,beforeMount:function(){var t=this,e=this._update;this._update=function(r,n){var i=Pa(t);t.__patch__(t._vnode,t.kept,!1,!0),t._vnode=t.kept,i(),e.call(t,r,n)}},render:function(t){for(var e=this.tag||this.$vnode.data.tag||"span",r=Object.create(null),n=this.prevChildren=this.children,i=this.$slots.default||[],a=this.children=[],o=eo(this),s=0;s<i.length;s++){var c=i[s];c.tag&&c.key!=null&&String(c.key).indexOf("__vlist")!==0&&(a.push(c),r[c.key]=c,(c.data||(c.data={})).transition=o)}if(n){for(var u=[],f=[],s=0;s<n.length;s++){var c=n[s];c.data.transition=o,c.data.pos=c.elm.getBoundingClientRect(),r[c.key]?u.push(c):f.push(c)}this.kept=t(e,null,u),this.removed=f}return t(e,null,a)},updated:function(){var t=this.prevChildren,e=this.moveClass||(this.name||"v")+"-move";!t.length||!this.hasMove(t[0].elm,e)||(t.forEach(cf),t.forEach(uf),t.forEach(ff),this._reflow=document.body.offsetHeight,t.forEach(function(r){if(r.data.moved){var n=r.elm,i=n.style;zt(n,e),i.transform=i.WebkitTransform=i.transitionDuration="",n.addEventListener(sr,n._moveCb=function a(o){o&&o.target!==n||(!o||/transform$/.test(o.propertyName))&&(n.removeEventListener(sr,a),n._moveCb=null,bt(n,e))})}}))},methods:{hasMove:function(t,e){if(!Ga)return!1;if(this._hasMove)return this._hasMove;var r=t.cloneNode();t._transitionClasses&&t._transitionClasses.forEach(function(i){Wa(r,i)}),za(r,e),r.style.display="none",this.$el.appendChild(r);var n=Xa(r);return this.$el.removeChild(r),this._hasMove=n.hasTransform}}};function cf(t){t.elm._moveCb&&t.elm._moveCb(),t.elm._enterCb&&t.elm._enterCb()}function uf(t){t.data.newPos=t.elm.getBoundingClientRect()}function ff(t){var e=t.data.pos,r=t.data.newPos,n=e.left-r.left,i=e.top-r.top;if(n||i){t.data.moved=!0;var a=t.elm.style;a.transform=a.WebkitTransform="translate(".concat(n,"px,").concat(i,"px)"),a.transitionDuration="0s"}}var lf={Transition:of,TransitionGroup:sf};H.config.mustUseProp=Xc;H.config.isReservedTag=Na;H.config.isReservedAttr=Kc;H.config.getTagNamespace=ou;H.config.isUnknownElement=su;M(H.options.directives,tf);M(H.options.components,lf);H.prototype.__patch__=nt?Qu:B;H.prototype.$mount=function(t,e){return t=t&&nt?cu(t):void 0,rc(this,t,e)};nt&&setTimeout(function(){at.devtools&&Ze&&Ze.emit("init",H)},0);var pf=!0;H.util.warn;function df(){return no().__VUE_DEVTOOLS_GLOBAL_HOOK__}function no(){return typeof navigator<"u"&&typeof window<"u"?window:typeof global<"u"?global:{}}const hf=typeof Proxy=="function",vf="devtools-plugin:setup",gf="plugin:settings:set";let Vt,en;function mf(){var t;return Vt!==void 0||(typeof window<"u"&&window.performance?(Vt=!0,en=window.performance):typeof global<"u"&&((t=global.perf_hooks)===null||t===void 0?void 0:t.performance)?(Vt=!0,en=global.perf_hooks.performance):Vt=!1),Vt}function _f(){return mf()?en.now():Date.now()}class bf{constructor(e,r){this.target=null,this.targetQueue=[],this.onQueue=[],this.plugin=e,this.hook=r;const n={};if(e.settings)for(const o in e.settings){const s=e.settings[o];n[o]=s.defaultValue}const i=`__vue-devtools-plugin-settings__${e.id}`;let a=Object.assign({},n);try{const o=localStorage.getItem(i),s=JSON.parse(o);Object.assign(a,s)}catch(o){}this.fallbacks={getSettings(){return a},setSettings(o){try{localStorage.setItem(i,JSON.stringify(o))}catch(s){}a=o},now(){return _f()}},r&&r.on(gf,(o,s)=>{o===this.plugin.id&&this.fallbacks.setSettings(s)}),this.proxiedOn=new Proxy({},{get:(o,s)=>this.target?this.target.on[s]:(...c)=>{this.onQueue.push({method:s,args:c})}}),this.proxiedTarget=new Proxy({},{get:(o,s)=>this.target?this.target[s]:s==="on"?this.proxiedOn:Object.keys(this.fallbacks).includes(s)?(...c)=>(this.targetQueue.push({method:s,args:c,resolve:()=>{}}),this.fallbacks[s](...c)):(...c)=>new Promise(u=>{this.targetQueue.push({method:s,args:c,resolve:u})})})}async setRealTarget(e){this.target=e;for(const r of this.onQueue)this.target.on[r.method](...r.args);for(const r of this.targetQueue)r.resolve(await this.target[r.method](...r.args))}}function io(t,e){const r=t,n=no(),i=df(),a=hf&&r.enableEarlyProxy;if(i&&(n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__||!a))i.emit(vf,t,e);else{const o=a?new bf(r,i):null;(n.__VUE_DEVTOOLS_PLUGINS__=n.__VUE_DEVTOOLS_PLUGINS__||[]).push({pluginDescriptor:r,setupFn:e,proxy:o}),o&&e(o.proxiedTarget)}}/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */const yf=Symbol();var Wt;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(Wt||(Wt={}));const ao=typeof window<"u",oo=typeof __VUE_PROD_DEVTOOLS__<"u"&&__VUE_PROD_DEVTOOLS__&&!0&&ao,Ni=(()=>typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof global=="object"&&global.global===global?global:typeof globalThis=="object"?globalThis:{HTMLElement:null})();function wf(t,{autoBom:e=!1}={}){return e&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t}function In(t,e,r){const n=new XMLHttpRequest;n.open("GET",t),n.responseType="blob",n.onload=function(){uo(n.response,e,r)},n.onerror=function(){console.error("could not download file")},n.send()}function so(t){const e=new XMLHttpRequest;e.open("HEAD",t,!1);try{e.send()}catch(r){}return e.status>=200&&e.status<=299}function We(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(e){const r=document.createEvent("MouseEvents");r.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(r)}}const qe=typeof navigator=="object"?navigator:{userAgent:""},co=(()=>/Macintosh/.test(qe.userAgent)&&/AppleWebKit/.test(qe.userAgent)&&!/Safari/.test(qe.userAgent))(),uo=ao?typeof HTMLAnchorElement<"u"&&"download"in HTMLAnchorElement.prototype&&!co?Sf:"msSaveOrOpenBlob"in qe?Cf:xf:()=>{};function Sf(t,e="download",r){const n=document.createElement("a");n.download=e,n.rel="noopener",typeof t=="string"?(n.href=t,n.origin!==location.origin?so(n.href)?In(t,e,r):(n.target="_blank",We(n)):We(n)):(n.href=URL.createObjectURL(t),setTimeout(function(){URL.revokeObjectURL(n.href)},4e4),setTimeout(function(){We(n)},0))}function Cf(t,e="download",r){if(typeof t=="string")if(so(t))In(t,e,r);else{const n=document.createElement("a");n.href=t,n.target="_blank",setTimeout(function(){We(n)})}else navigator.msSaveOrOpenBlob(wf(t,r),e)}function xf(t,e,r,n){if(n=n||open("","_blank"),n&&(n.document.title=n.document.body.innerText="downloading..."),typeof t=="string")return In(t,e,r);const i=t.type==="application/octet-stream",a=/constructor/i.test(String(Ni.HTMLElement))||"safari"in Ni,o=/CriOS\/[\d]+/.test(navigator.userAgent);if((o||i&&a||co)&&typeof FileReader<"u"){const s=new FileReader;s.onloadend=function(){let c=s.result;if(typeof c!="string")throw n=null,new Error("Wrong reader.result type");c=o?c:c.replace(/^data:[^;]*;/,"data:attachment/file;"),n?n.location.href=c:location.assign(c),n=null},s.readAsDataURL(t)}else{const s=URL.createObjectURL(t);n?n.location.assign(s):location.href=s,n=null,setTimeout(function(){URL.revokeObjectURL(s)},4e4)}}function G(t,e){const r="\u{1F34D} "+t;typeof __VUE_DEVTOOLS_TOAST__=="function"?__VUE_DEVTOOLS_TOAST__(r,e):e==="error"?console.error(r):e==="warn"?console.warn(r):console.log(r)}function kn(t){return"_a"in t&&"install"in t}function fo(){if(!("clipboard"in navigator))return G("Your browser doesn't support the Clipboard API","error"),!0}function lo(t){return t instanceof Error&&t.message.toLowerCase().includes("document is not focused")?(G('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.',"warn"),!0):!1}async function Of(t){if(!fo())try{await navigator.clipboard.writeText(JSON.stringify(t.state.value)),G("Global state copied to clipboard.")}catch(e){if(lo(e))return;G("Failed to serialize the state. Check the console for more details.","error"),console.error(e)}}async function Ef(t){if(!fo())try{po(t,JSON.parse(await navigator.clipboard.readText())),G("Global state pasted from clipboard.")}catch(e){if(lo(e))return;G("Failed to deserialize the state from clipboard. Check the console for more details.","error"),console.error(e)}}async function $f(t){try{uo(new Blob([JSON.stringify(t.state.value)],{type:"text/plain;charset=utf-8"}),"pinia-state.json")}catch(e){G("Failed to export the state as JSON. Check the console for more details.","error"),console.error(e)}}let gt;function Af(){gt||(gt=document.createElement("input"),gt.type="file",gt.accept=".json");function t(){return new Promise((e,r)=>{gt.onchange=async()=>{const n=gt.files;if(!n)return e(null);const i=n.item(0);return e(i?{text:await i.text(),file:i}:null)},gt.oncancel=()=>e(null),gt.onerror=r,gt.click()})}return t}async function Tf(t){try{const r=await Af()();if(!r)return;const{text:n,file:i}=r;po(t,JSON.parse(n)),G(`Global state imported from "${i.name}".`)}catch(e){G("Failed to import the state from JSON. Check the console for more details.","error"),console.error(e)}}function po(t,e){for(const r in e){const n=t.state.value[r];n?Object.assign(n,e[r]):t.state.value[r]=e[r]}}function ot(t){return{_custom:{display:t}}}const ho="\u{1F34D} Pinia (root)",rn="_root";function Pf(t){return kn(t)?{id:rn,label:ho}:{id:t.$id,label:t.$id}}function If(t){if(kn(t)){const r=Array.from(t._s.keys()),n=t._s;return{state:r.map(a=>({editable:!0,key:a,value:t.state.value[a]})),getters:r.filter(a=>n.get(a)._getters).map(a=>{const o=n.get(a);return{editable:!1,key:a,value:o._getters.reduce((s,c)=>(s[c]=o[c],s),{})}})}}const e={state:Object.keys(t.$state).map(r=>({editable:!0,key:r,value:t.$state[r]}))};return t._getters&&t._getters.length&&(e.getters=t._getters.map(r=>({editable:!1,key:r,value:t[r]}))),t._customProperties.size&&(e.customProperties=Array.from(t._customProperties).map(r=>({editable:!0,key:r,value:t[r]}))),e}function kf(t){return t?Array.isArray(t)?t.reduce((e,r)=>(e.keys.push(r.key),e.operations.push(r.type),e.oldValue[r.key]=r.oldValue,e.newValue[r.key]=r.newValue,e),{oldValue:{},keys:[],operations:[],newValue:{}}):{operation:ot(t.type),key:ot(t.key),oldValue:t.oldValue,newValue:t.newValue}:{}}function Rf(t){switch(t){case Wt.direct:return"mutation";case Wt.patchFunction:return"$patch";case Wt.patchObject:return"$patch";default:return"unknown"}}let ie=!0;const Ge=[],Ut="pinia:mutations",J="pinia",{assign:jf}=Object,ur=t=>"\u{1F34D} "+t;function Lf(t,e){io({id:"dev.esm.pinia",label:"Pinia \u{1F34D}",logo:"https://pinia.vuejs.org/logo.svg",packageName:"pinia",homepage:"https://pinia.vuejs.org",componentStateTypes:Ge,app:t},r=>{typeof r.now!="function"&&G("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."),r.addTimelineLayer({id:Ut,label:"Pinia \u{1F34D}",color:15064968}),r.addInspector({id:J,label:"Pinia \u{1F34D}",icon:"storage",treeFilterPlaceholder:"Search stores",actions:[{icon:"content_copy",action:()=>{Of(e)},tooltip:"Serialize and copy the state"},{icon:"content_paste",action:async()=>{await Ef(e),r.sendInspectorTree(J),r.sendInspectorState(J)},tooltip:"Replace the state with the content of your clipboard"},{icon:"save",action:()=>{$f(e)},tooltip:"Save the state as a JSON file"},{icon:"folder_open",action:async()=>{await Tf(e),r.sendInspectorTree(J),r.sendInspectorState(J)},tooltip:"Import the state from a JSON file"}],nodeActions:[{icon:"restore",tooltip:'Reset the state (with "$reset")',action:n=>{const i=e._s.get(n);i?typeof i.$reset!="function"?G(`Cannot reset "${n}" store because it doesn't have a "$reset" method implemented.`,"warn"):(i.$reset(),G(`Store "${n}" reset.`)):G(`Cannot reset "${n}" store because it wasn't found.`,"warn")}}]}),r.on.inspectComponent((n,i)=>{const a=n.componentInstance&&n.componentInstance.proxy;if(a&&a._pStores){const o=n.componentInstance.proxy._pStores;Object.values(o).forEach(s=>{n.instanceData.state.push({type:ur(s.$id),key:"state",editable:!0,value:s._isOptionsAPI?{_custom:{value:_r(s.$state),actions:[{icon:"restore",tooltip:"Reset the state of this store",action:()=>s.$reset()}]}}:Object.keys(s.$state).reduce((c,u)=>(c[u]=s.$state[u],c),{})}),s._getters&&s._getters.length&&n.instanceData.state.push({type:ur(s.$id),key:"getters",editable:!1,value:s._getters.reduce((c,u)=>{try{c[u]=s[u]}catch(f){c[u]=f}return c},{})})})}}),r.on.getInspectorTree(n=>{if(n.app===t&&n.inspectorId===J){let i=[e];i=i.concat(Array.from(e._s.values())),n.rootNodes=(n.filter?i.filter(a=>"$id"in a?a.$id.toLowerCase().includes(n.filter.toLowerCase()):ho.toLowerCase().includes(n.filter.toLowerCase())):i).map(Pf)}}),r.on.getInspectorState(n=>{if(n.app===t&&n.inspectorId===J){const i=n.nodeId===rn?e:e._s.get(n.nodeId);if(!i)return;i&&(n.state=If(i))}}),r.on.editInspectorState((n,i)=>{if(n.app===t&&n.inspectorId===J){const a=n.nodeId===rn?e:e._s.get(n.nodeId);if(!a)return G(`store "${n.nodeId}" not found`,"error");const{path:o}=n;kn(a)?o.unshift("state"):(o.length!==1||!a._customProperties.has(o[0])||o[0]in a.$state)&&o.unshift("$state"),ie=!1,n.set(a,o,n.state.value),ie=!0}}),r.on.editComponentState(n=>{if(n.type.startsWith("\u{1F34D}")){const i=n.type.replace(/^🍍\s*/,""),a=e._s.get(i);if(!a)return G(`store "${i}" not found`,"error");const{path:o}=n;if(o[0]!=="state")return G(`Invalid path for store "${i}":
${o}
Only state can be modified.`);o[0]="$state",ie=!1,n.set(a,o,n.state.value),ie=!0}})})}function Df(t,e){Ge.includes(ur(e.$id))||Ge.push(ur(e.$id)),io({id:"dev.esm.pinia",label:"Pinia \u{1F34D}",logo:"https://pinia.vuejs.org/logo.svg",packageName:"pinia",homepage:"https://pinia.vuejs.org",componentStateTypes:Ge,app:t,settings:{logStoreChanges:{label:"Notify about new/deleted stores",type:"boolean",defaultValue:!0}}},r=>{const n=typeof r.now=="function"?r.now.bind(r):Date.now;e.$onAction(({after:o,onError:s,name:c,args:u})=>{const f=vo++;r.addTimelineEvent({layerId:Ut,event:{time:n(),title:"\u{1F6EB} "+c,subtitle:"start",data:{store:ot(e.$id),action:ot(c),args:u},groupId:f}}),o(h=>{Et=void 0,r.addTimelineEvent({layerId:Ut,event:{time:n(),title:"\u{1F6EC} "+c,subtitle:"end",data:{store:ot(e.$id),action:ot(c),args:u,result:h},groupId:f}})}),s(h=>{Et=void 0,r.addTimelineEvent({layerId:Ut,event:{time:n(),logType:"error",title:"\u{1F4A5} "+c,subtitle:"end",data:{store:ot(e.$id),action:ot(c),args:u,error:h},groupId:f}})})},!0),e._customProperties.forEach(o=>{ps(()=>fs(e[o]),(s,c)=>{r.notifyComponentUpdate(),r.sendInspectorState(J),ie&&r.addTimelineEvent({layerId:Ut,event:{time:n(),title:"Change",subtitle:o,data:{newValue:s,oldValue:c},groupId:Et}})},{deep:!0})}),e.$subscribe(({events:o,type:s},c)=>{if(r.notifyComponentUpdate(),r.sendInspectorState(J),!ie)return;const u={time:n(),title:Rf(s),data:jf({store:ot(e.$id)},kf(o)),groupId:Et};s===Wt.patchFunction?u.subtitle="\u2935\uFE0F":s===Wt.patchObject?u.subtitle="\u{1F9E9}":o&&!Array.isArray(o)&&(u.subtitle=o.type),o&&(u.data["rawEvent(s)"]={_custom:{display:"DebuggerEvent",type:"object",tooltip:"raw DebuggerEvent[]",value:o}}),r.addTimelineEvent({layerId:Ut,event:u})},{detached:!0,flush:"sync"});const i=e._hotUpdate;e._hotUpdate=ga(o=>{i(o),r.addTimelineEvent({layerId:Ut,event:{time:n(),title:"\u{1F525} "+e.$id,subtitle:"HMR update",data:{store:ot(e.$id),info:ot("HMR update")}}}),r.notifyComponentUpdate(),r.sendInspectorTree(J),r.sendInspectorState(J)});const{$dispose:a}=e;e.$dispose=()=>{a(),r.notifyComponentUpdate(),r.sendInspectorTree(J),r.sendInspectorState(J),r.getSettings().logStoreChanges&&G(`Disposed "${e.$id}" store \u{1F5D1}`)},r.notifyComponentUpdate(),r.sendInspectorTree(J),r.sendInspectorState(J),r.getSettings().logStoreChanges&&G(`"${e.$id}" store installed \u{1F195}`)})}let vo=0,Et;function Ui(t,e,r){const n=e.reduce((i,a)=>(i[a]=_r(t)[a],i),{});for(const i in n)t[i]=function(){const a=vo,o=r?new Proxy(t,{get(...c){return Et=a,Reflect.get(...c)},set(...c){return Et=a,Reflect.set(...c)}}):t;Et=a;const s=n[i].apply(o,arguments);return Et=void 0,s}}function Mf({app:t,store:e,options:r}){if(e.$id.startsWith("__hot:"))return;e._isOptionsAPI=!!r.state,Ui(e,Object.keys(r.actions),e._isOptionsAPI);const n=e._hotUpdate;_r(e)._hotUpdate=function(i){n.apply(this,arguments),Ui(e,Object.keys(i._hmrPayload.actions),!!e._isOptionsAPI)},Df(t,e)}function Ff(){const t=hs(!0),e=t.run(()=>cs({}));let r=[];const n=ga({install(i){},use(i){return!this._a&&!pf||r.push(i),this},_p:r,_a:null,_e:t,_s:new Map,state:e});return oo&&typeof Proxy<"u"&&n.use(Mf),n}const Nf=function(t){t.mixin({beforeCreate(){const e=this.$options;if(e.pinia){const r=e.pinia;if(!this._provided){const n={};Object.defineProperty(this,"_provided",{get:()=>n,set:i=>Object.assign(n,i)})}this._provided[yf]=r,this.$pinia||(this.$pinia=r),r._a=this,oo&&Lf(r._a,r)}else!this.$pinia&&e.parent&&e.parent.$pinia&&(this.$pinia=e.parent.$pinia)},destroyed(){delete this._pStores}})},Uf="modulepreload",Bf=function(t){return"/"+t},Bi={},mt=function(e,r,n){if(!r||r.length===0)return e();const i=document.getElementsByTagName("link");return Promise.all(r.map(a=>{if(a=Bf(a),a in Bi)return;Bi[a]=!0;const o=a.endsWith(".css"),s=o?'[rel="stylesheet"]':"";if(!!n)for(let f=i.length-1;f>=0;f--){const h=i[f];if(h.href===a&&(!o||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${s}`))return;const u=document.createElement("link");if(u.rel=o?"stylesheet":Uf,o||(u.as="script",u.crossOrigin=""),u.href=a,document.head.appendChild(u),o)return new Promise((f,h)=>{u.addEventListener("load",f),u.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${a}`)))})})).then(()=>e())};/*!
  * vue-router v3.6.5
  * (c) 2022 Evan You
  * @license MIT
  */function st(t,e){for(var r in e)t[r]=e[r];return t}var Hf=/[!'()*]/g,zf=function(t){return"%"+t.charCodeAt(0).toString(16)},Wf=/%2C/g,Zt=function(t){return encodeURIComponent(t).replace(Hf,zf).replace(Wf,",")};function nn(t){try{return decodeURIComponent(t)}catch(e){}return t}function qf(t,e,r){e===void 0&&(e={});var n=r||Gf,i;try{i=n(t||"")}catch(s){i={}}for(var a in e){var o=e[a];i[a]=Array.isArray(o)?o.map(Hi):Hi(o)}return i}var Hi=function(t){return t==null||typeof t=="object"?t:String(t)};function Gf(t){var e={};return t=t.trim().replace(/^(\?|#|&)/,""),t&&t.split("&").forEach(function(r){var n=r.replace(/\+/g," ").split("="),i=nn(n.shift()),a=n.length>0?nn(n.join("=")):null;e[i]===void 0?e[i]=a:Array.isArray(e[i])?e[i].push(a):e[i]=[e[i],a]}),e}function Jf(t){var e=t?Object.keys(t).map(function(r){var n=t[r];if(n===void 0)return"";if(n===null)return Zt(r);if(Array.isArray(n)){var i=[];return n.forEach(function(a){a!==void 0&&(a===null?i.push(Zt(r)):i.push(Zt(r)+"="+Zt(a)))}),i.join("&")}return Zt(r)+"="+Zt(n)}).filter(function(r){return r.length>0}).join("&"):null;return e?"?"+e:""}var fr=/\/?$/;function lr(t,e,r,n){var i=n&&n.options.stringifyQuery,a=e.query||{};try{a=an(a)}catch(s){}var o={name:e.name||t&&t.name,meta:t&&t.meta||{},path:e.path||"/",hash:e.hash||"",query:a,params:e.params||{},fullPath:zi(e,i),matched:t?Kf(t):[]};return r&&(o.redirectedFrom=zi(r,i)),Object.freeze(o)}function an(t){if(Array.isArray(t))return t.map(an);if(t&&typeof t=="object"){var e={};for(var r in t)e[r]=an(t[r]);return e}else return t}var Lt=lr(null,{path:"/"});function Kf(t){for(var e=[];t;)e.unshift(t),t=t.parent;return e}function zi(t,e){var r=t.path,n=t.query;n===void 0&&(n={});var i=t.hash;i===void 0&&(i="");var a=e||Jf;return(r||"/")+a(n)+i}function go(t,e,r){return e===Lt?t===e:e?t.path&&e.path?t.path.replace(fr,"")===e.path.replace(fr,"")&&(r||t.hash===e.hash&&Je(t.query,e.query)):t.name&&e.name?t.name===e.name&&(r||t.hash===e.hash&&Je(t.query,e.query)&&Je(t.params,e.params)):!1:!1}function Je(t,e){if(t===void 0&&(t={}),e===void 0&&(e={}),!t||!e)return t===e;var r=Object.keys(t).sort(),n=Object.keys(e).sort();return r.length!==n.length?!1:r.every(function(i,a){var o=t[i],s=n[a];if(s!==i)return!1;var c=e[i];return o==null||c==null?o===c:typeof o=="object"&&typeof c=="object"?Je(o,c):String(o)===String(c)})}function Yf(t,e){return t.path.replace(fr,"/").indexOf(e.path.replace(fr,"/"))===0&&(!e.hash||t.hash===e.hash)&&Xf(t.query,e.query)}function Xf(t,e){for(var r in e)if(!(r in t))return!1;return!0}function mo(t){for(var e=0;e<t.matched.length;e++){var r=t.matched[e];for(var n in r.instances){var i=r.instances[n],a=r.enteredCbs[n];if(!(!i||!a)){delete r.enteredCbs[n];for(var o=0;o<a.length;o++)i._isBeingDestroyed||a[o](i)}}}}var Qf={name:"RouterView",functional:!0,props:{name:{type:String,default:"default"}},render:function(e,r){var n=r.props,i=r.children,a=r.parent,o=r.data;o.routerView=!0;for(var s=a.$createElement,c=n.name,u=a.$route,f=a._routerViewCache||(a._routerViewCache={}),h=0,v=!1;a&&a._routerRoot!==a;){var m=a.$vnode?a.$vnode.data:{};m.routerView&&h++,m.keepAlive&&a._directInactive&&a._inactive&&(v=!0),a=a.$parent}if(o.routerViewDepth=h,v){var b=f[c],y=b&&b.component;return y?(b.configProps&&Wi(y,o,b.route,b.configProps),s(y,o,i)):s()}var _=u.matched[h],S=_&&_.components[c];if(!_||!S)return f[c]=null,s();f[c]={component:S},o.registerRouteInstance=function(A,P){var L=_.instances[c];(P&&L!==A||!P&&L===A)&&(_.instances[c]=P)},(o.hook||(o.hook={})).prepatch=function(A,P){_.instances[c]=P.componentInstance},o.hook.init=function(A){A.data.keepAlive&&A.componentInstance&&A.componentInstance!==_.instances[c]&&(_.instances[c]=A.componentInstance),mo(u)};var C=_.props&&_.props[c];return C&&(st(f[c],{route:u,configProps:C}),Wi(S,o,u,C)),s(S,o,i)}};function Wi(t,e,r,n){var i=e.props=Vf(r,n);if(i){i=e.props=st({},i);var a=e.attrs=e.attrs||{};for(var o in i)(!t.props||!(o in t.props))&&(a[o]=i[o],delete i[o])}}function Vf(t,e){switch(typeof e){case"undefined":return;case"object":return e;case"function":return e(t);case"boolean":return e?t.params:void 0}}function _o(t,e,r){var n=t.charAt(0);if(n==="/")return t;if(n==="?"||n==="#")return e+t;var i=e.split("/");(!r||!i[i.length-1])&&i.pop();for(var a=t.replace(/^\//,"").split("/"),o=0;o<a.length;o++){var s=a[o];s===".."?i.pop():s!=="."&&i.push(s)}return i[0]!==""&&i.unshift(""),i.join("/")}function Zf(t){var e="",r="",n=t.indexOf("#");n>=0&&(e=t.slice(n),t=t.slice(0,n));var i=t.indexOf("?");return i>=0&&(r=t.slice(i+1),t=t.slice(0,i)),{path:t,query:r,hash:e}}function $t(t){return t.replace(/\/(?:\s*\/)+/g,"/")}var pr=Array.isArray||function(t){return Object.prototype.toString.call(t)=="[object Array]"},pe=wo,tl=Rn,el=al,rl=bo,nl=yo,il=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function Rn(t,e){for(var r=[],n=0,i=0,a="",o=e&&e.delimiter||"/",s;(s=il.exec(t))!=null;){var c=s[0],u=s[1],f=s.index;if(a+=t.slice(i,f),i=f+c.length,u){a+=u[1];continue}var h=t[i],v=s[2],m=s[3],b=s[4],y=s[5],_=s[6],S=s[7];a&&(r.push(a),a="");var C=v!=null&&h!=null&&h!==v,A=_==="+"||_==="*",P=_==="?"||_==="*",L=s[2]||o,N=b||y;r.push({name:m||n++,prefix:v||"",delimiter:L,optional:P,repeat:A,partial:C,asterisk:!!S,pattern:N?cl(N):S?".*":"[^"+Ke(L)+"]+?"})}return i<t.length&&(a+=t.substr(i)),a&&r.push(a),r}function al(t,e){return bo(Rn(t,e),e)}function ol(t){return encodeURI(t).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function sl(t){return encodeURI(t).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function bo(t,e){for(var r=new Array(t.length),n=0;n<t.length;n++)typeof t[n]=="object"&&(r[n]=new RegExp("^(?:"+t[n].pattern+")$",Ln(e)));return function(i,a){for(var o="",s=i||{},c=a||{},u=c.pretty?ol:encodeURIComponent,f=0;f<t.length;f++){var h=t[f];if(typeof h=="string"){o+=h;continue}var v=s[h.name],m;if(v==null)if(h.optional){h.partial&&(o+=h.prefix);continue}else throw new TypeError('Expected "'+h.name+'" to be defined');if(pr(v)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(v)+"`");if(v.length===0){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var b=0;b<v.length;b++){if(m=u(v[b]),!r[f].test(m))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(m)+"`");o+=(b===0?h.prefix:h.delimiter)+m}continue}if(m=h.asterisk?sl(v):u(v),!r[f].test(m))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+m+'"');o+=h.prefix+m}return o}}function Ke(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function cl(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function jn(t,e){return t.keys=e,t}function Ln(t){return t&&t.sensitive?"":"i"}function ul(t,e){var r=t.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)e.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return jn(t,e)}function fl(t,e,r){for(var n=[],i=0;i<t.length;i++)n.push(wo(t[i],e,r).source);var a=new RegExp("(?:"+n.join("|")+")",Ln(r));return jn(a,e)}function ll(t,e,r){return yo(Rn(t,r),e,r)}function yo(t,e,r){pr(e)||(r=e||r,e=[]),r=r||{};for(var n=r.strict,i=r.end!==!1,a="",o=0;o<t.length;o++){var s=t[o];if(typeof s=="string")a+=Ke(s);else{var c=Ke(s.prefix),u="(?:"+s.pattern+")";e.push(s),s.repeat&&(u+="(?:"+c+u+")*"),s.optional?s.partial?u=c+"("+u+")?":u="(?:"+c+"("+u+"))?":u=c+"("+u+")",a+=u}}var f=Ke(r.delimiter||"/"),h=a.slice(-f.length)===f;return n||(a=(h?a.slice(0,-f.length):a)+"(?:"+f+"(?=$))?"),i?a+="$":a+=n&&h?"":"(?="+f+"|$)",jn(new RegExp("^"+a,Ln(r)),e)}function wo(t,e,r){return pr(e)||(r=e||r,e=[]),r=r||{},t instanceof RegExp?ul(t,e):pr(t)?fl(t,e,r):ll(t,e,r)}pe.parse=tl;pe.compile=el;pe.tokensToFunction=rl;pe.tokensToRegExp=nl;var qi=Object.create(null);function Ye(t,e,r){e=e||{};try{var n=qi[t]||(qi[t]=pe.compile(t));return typeof e.pathMatch=="string"&&(e[0]=e.pathMatch),n(e,{pretty:!0})}catch(i){return""}finally{delete e[0]}}function Dn(t,e,r,n){var i=typeof t=="string"?{path:t}:t;if(i._normalized)return i;if(i.name){i=st({},t);var a=i.params;return a&&typeof a=="object"&&(i.params=st({},a)),i}if(!i.path&&i.params&&e){i=st({},i),i._normalized=!0;var o=st(st({},e.params),i.params);if(e.name)i.name=e.name,i.params=o;else if(e.matched.length){var s=e.matched[e.matched.length-1].path;i.path=Ye(s,o,"path "+e.path)}return i}var c=Zf(i.path||""),u=e&&e.path||"/",f=c.path?_o(c.path,u,r||i.append):u,h=qf(c.query,i.query,n&&n.options.parseQuery),v=i.hash||c.hash;return v&&v.charAt(0)!=="#"&&(v="#"+v),{_normalized:!0,path:f,query:h,hash:v}}var pl=[String,Object],dl=[String,Array],Gi=function(){},hl={name:"RouterLink",props:{to:{type:pl,required:!0},tag:{type:String,default:"a"},custom:Boolean,exact:Boolean,exactPath:Boolean,append:Boolean,replace:Boolean,activeClass:String,exactActiveClass:String,ariaCurrentValue:{type:String,default:"page"},event:{type:dl,default:"click"}},render:function(e){var r=this,n=this.$router,i=this.$route,a=n.resolve(this.to,i,this.append),o=a.location,s=a.route,c=a.href,u={},f=n.options.linkActiveClass,h=n.options.linkExactActiveClass,v=f==null?"router-link-active":f,m=h==null?"router-link-exact-active":h,b=this.activeClass==null?v:this.activeClass,y=this.exactActiveClass==null?m:this.exactActiveClass,_=s.redirectedFrom?lr(null,Dn(s.redirectedFrom),null,n):s;u[y]=go(i,_,this.exactPath),u[b]=this.exact||this.exactPath?u[y]:Yf(i,_);var S=u[y]?this.ariaCurrentValue:null,C=function(p){Ji(p)&&(r.replace?n.replace(o,Gi):n.push(o,Gi))},A={click:Ji};Array.isArray(this.event)?this.event.forEach(function(p){A[p]=C}):A[this.event]=C;var P={class:u},L=!this.$scopedSlots.$hasNormal&&this.$scopedSlots.default&&this.$scopedSlots.default({href:c,route:s,navigate:C,isActive:u[b],isExactActive:u[y]});if(L){if(L.length===1)return L[0];if(L.length>1||!L.length)return L.length===0?e():e("span",{},L)}if(this.tag==="a")P.on=A,P.attrs={href:c,"aria-current":S};else{var N=So(this.$slots.default);if(N){N.isStatic=!1;var U=N.data=st({},N.data);U.on=U.on||{};for(var W in U.on){var dt=U.on[W];W in A&&(U.on[W]=Array.isArray(dt)?dt:[dt])}for(var ht in A)ht in U.on?U.on[ht].push(A[ht]):U.on[ht]=C;var vt=N.data.attrs=st({},N.data.attrs);vt.href=c,vt["aria-current"]=S}else P.on=A}return e(this.tag,P,this.$slots.default)}};function Ji(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){var e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function So(t){if(t){for(var e,r=0;r<t.length;r++)if(e=t[r],e.tag==="a"||e.children&&(e=So(e.children)))return e}}var dr;function on(t){if(!(on.installed&&dr===t)){on.installed=!0,dr=t;var e=function(i){return i!==void 0},r=function(i,a){var o=i.$options._parentVnode;e(o)&&e(o=o.data)&&e(o=o.registerRouteInstance)&&o(i,a)};t.mixin({beforeCreate:function(){e(this.$options.router)?(this._routerRoot=this,this._router=this.$options.router,this._router.init(this),t.util.defineReactive(this,"_route",this._router.history.current)):this._routerRoot=this.$parent&&this.$parent._routerRoot||this,r(this,this)},destroyed:function(){r(this)}}),Object.defineProperty(t.prototype,"$router",{get:function(){return this._routerRoot._router}}),Object.defineProperty(t.prototype,"$route",{get:function(){return this._routerRoot._route}}),t.component("RouterView",Qf),t.component("RouterLink",hl);var n=t.config.optionMergeStrategies;n.beforeRouteEnter=n.beforeRouteLeave=n.beforeRouteUpdate=n.created}}var Te=typeof window<"u";function Fe(t,e,r,n,i){var a=e||[],o=r||Object.create(null),s=n||Object.create(null);t.forEach(function(f){sn(a,o,s,f,i)});for(var c=0,u=a.length;c<u;c++)a[c]==="*"&&(a.push(a.splice(c,1)[0]),u--,c--);return{pathList:a,pathMap:o,nameMap:s}}function sn(t,e,r,n,i,a){var o=n.path,s=n.name,c=n.pathToRegexpOptions||{},u=gl(o,i,c.strict);typeof n.caseSensitive=="boolean"&&(c.sensitive=n.caseSensitive);var f={path:u,regex:vl(u,c),components:n.components||{default:n.component},alias:n.alias?typeof n.alias=="string"?[n.alias]:n.alias:[],instances:{},enteredCbs:{},name:s,parent:i,matchAs:a,redirect:n.redirect,beforeEnter:n.beforeEnter,meta:n.meta||{},props:n.props==null?{}:n.components?n.props:{default:n.props}};if(n.children&&n.children.forEach(function(y){var _=a?$t(a+"/"+y.path):void 0;sn(t,e,r,y,f,_)}),e[f.path]||(t.push(f.path),e[f.path]=f),n.alias!==void 0)for(var h=Array.isArray(n.alias)?n.alias:[n.alias],v=0;v<h.length;++v){var m=h[v],b={path:m,children:n.children};sn(t,e,r,b,i,f.path||"/")}s&&(r[s]||(r[s]=f))}function vl(t,e){var r=pe(t,[],e);return r}function gl(t,e,r){return r||(t=t.replace(/\/$/,"")),t[0]==="/"||e==null?t:$t(e.path+"/"+t)}function ml(t,e){var r=Fe(t),n=r.pathList,i=r.pathMap,a=r.nameMap;function o(m){Fe(m,n,i,a)}function s(m,b){var y=typeof m!="object"?a[m]:void 0;Fe([b||m],n,i,a,y),y&&y.alias.length&&Fe(y.alias.map(function(_){return{path:_,children:[b]}}),n,i,a,y)}function c(){return n.map(function(m){return i[m]})}function u(m,b,y){var _=Dn(m,b,!1,e),S=_.name;if(S){var C=a[S];if(!C)return v(null,_);var A=C.regex.keys.filter(function(W){return!W.optional}).map(function(W){return W.name});if(typeof _.params!="object"&&(_.params={}),b&&typeof b.params=="object")for(var P in b.params)!(P in _.params)&&A.indexOf(P)>-1&&(_.params[P]=b.params[P]);return _.path=Ye(C.path,_.params),v(C,_,y)}else if(_.path){_.params={};for(var L=0;L<n.length;L++){var N=n[L],U=i[N];if(_l(U.regex,_.path,_.params))return v(U,_,y)}}return v(null,_)}function f(m,b){var y=m.redirect,_=typeof y=="function"?y(lr(m,b,null,e)):y;if(typeof _=="string"&&(_={path:_}),!_||typeof _!="object")return v(null,b);var S=_,C=S.name,A=S.path,P=b.query,L=b.hash,N=b.params;if(P=S.hasOwnProperty("query")?S.query:P,L=S.hasOwnProperty("hash")?S.hash:L,N=S.hasOwnProperty("params")?S.params:N,C)return a[C],u({_normalized:!0,name:C,query:P,hash:L,params:N},void 0,b);if(A){var U=bl(A,m),W=Ye(U,N);return u({_normalized:!0,path:W,query:P,hash:L},void 0,b)}else return v(null,b)}function h(m,b,y){var _=Ye(y,b.params),S=u({_normalized:!0,path:_});if(S){var C=S.matched,A=C[C.length-1];return b.params=S.params,v(A,b)}return v(null,b)}function v(m,b,y){return m&&m.redirect?f(m,y||b):m&&m.matchAs?h(m,b,m.matchAs):lr(m,b,y,e)}return{match:u,addRoute:s,getRoutes:c,addRoutes:o}}function _l(t,e,r){var n=e.match(t);if(n){if(!r)return!0}else return!1;for(var i=1,a=n.length;i<a;++i){var o=t.keys[i-1];o&&(r[o.name||"pathMatch"]=typeof n[i]=="string"?nn(n[i]):n[i])}return!0}function bl(t,e){return _o(t,e.parent?e.parent.path:"/",!0)}var yl=Te&&window.performance&&window.performance.now?window.performance:Date;function Co(){return yl.now().toFixed(3)}var xo=Co();function yr(){return xo}function Oo(t){return xo=t}var Eo=Object.create(null);function $o(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");var t=window.location.protocol+"//"+window.location.host,e=window.location.href.replace(t,""),r=st({},window.history.state);return r.key=yr(),window.history.replaceState(r,"",e),window.addEventListener("popstate",Ki),function(){window.removeEventListener("popstate",Ki)}}function At(t,e,r,n){if(!!t.app){var i=t.options.scrollBehavior;!i||t.app.$nextTick(function(){var a=wl(),o=i.call(t,e,r,n?a:null);!o||(typeof o.then=="function"?o.then(function(s){Qi(s,a)}).catch(function(s){}):Qi(o,a))})}}function Ao(){var t=yr();t&&(Eo[t]={x:window.pageXOffset,y:window.pageYOffset})}function Ki(t){Ao(),t.state&&t.state.key&&Oo(t.state.key)}function wl(){var t=yr();if(t)return Eo[t]}function Sl(t,e){var r=document.documentElement,n=r.getBoundingClientRect(),i=t.getBoundingClientRect();return{x:i.left-n.left-e.x,y:i.top-n.top-e.y}}function Yi(t){return se(t.x)||se(t.y)}function Xi(t){return{x:se(t.x)?t.x:window.pageXOffset,y:se(t.y)?t.y:window.pageYOffset}}function Cl(t){return{x:se(t.x)?t.x:0,y:se(t.y)?t.y:0}}function se(t){return typeof t=="number"}var xl=/^#\d/;function Qi(t,e){var r=typeof t=="object";if(r&&typeof t.selector=="string"){var n=xl.test(t.selector)?document.getElementById(t.selector.slice(1)):document.querySelector(t.selector);if(n){var i=t.offset&&typeof t.offset=="object"?t.offset:{};i=Cl(i),e=Sl(n,i)}else Yi(t)&&(e=Xi(t))}else r&&Yi(t)&&(e=Xi(t));e&&("scrollBehavior"in document.documentElement.style?window.scrollTo({left:e.x,top:e.y,behavior:t.behavior}):window.scrollTo(e.x,e.y))}var Tt=Te&&function(){var t=window.navigator.userAgent;return(t.indexOf("Android 2.")!==-1||t.indexOf("Android 4.0")!==-1)&&t.indexOf("Mobile Safari")!==-1&&t.indexOf("Chrome")===-1&&t.indexOf("Windows Phone")===-1?!1:window.history&&typeof window.history.pushState=="function"}();function hr(t,e){Ao();var r=window.history;try{if(e){var n=st({},r.state);n.key=yr(),r.replaceState(n,"",t)}else r.pushState({key:Oo(Co())},"",t)}catch(i){window.location[e?"replace":"assign"](t)}}function cn(t){hr(t,!0)}var Xt={redirected:2,aborted:4,cancelled:8,duplicated:16};function Ol(t,e){return wr(t,e,Xt.redirected,'Redirected when going from "'+t.fullPath+'" to "'+Tl(e)+'" via a navigation guard.')}function El(t,e){var r=wr(t,e,Xt.duplicated,'Avoided redundant navigation to current location: "'+t.fullPath+'".');return r.name="NavigationDuplicated",r}function Vi(t,e){return wr(t,e,Xt.cancelled,'Navigation cancelled from "'+t.fullPath+'" to "'+e.fullPath+'" with a new navigation.')}function $l(t,e){return wr(t,e,Xt.aborted,'Navigation aborted from "'+t.fullPath+'" to "'+e.fullPath+'" via a navigation guard.')}function wr(t,e,r,n){var i=new Error(n);return i._isRouter=!0,i.from=t,i.to=e,i.type=r,i}var Al=["params","query","hash"];function Tl(t){if(typeof t=="string")return t;if("path"in t)return t.path;var e={};return Al.forEach(function(r){r in t&&(e[r]=t[r])}),JSON.stringify(e,null,2)}function vr(t){return Object.prototype.toString.call(t).indexOf("Error")>-1}function Sr(t,e){return vr(t)&&t._isRouter&&(e==null||t.type===e)}function Zi(t,e,r){var n=function(i){i>=t.length?r():t[i]?e(t[i],function(){n(i+1)}):n(i+1)};n(0)}function Pl(t){return function(e,r,n){var i=!1,a=0,o=null;To(t,function(s,c,u,f){if(typeof s=="function"&&s.cid===void 0){i=!0,a++;var h=ta(function(y){kl(y)&&(y=y.default),s.resolved=typeof y=="function"?y:dr.extend(y),u.components[f]=y,a--,a<=0&&n()}),v=ta(function(y){var _="Failed to resolve async component "+f+": "+y;o||(o=vr(y)?y:new Error(_),n(o))}),m;try{m=s(h,v)}catch(y){v(y)}if(m)if(typeof m.then=="function")m.then(h,v);else{var b=m.component;b&&typeof b.then=="function"&&b.then(h,v)}}}),i||n()}}function To(t,e){return Po(t.map(function(r){return Object.keys(r.components).map(function(n){return e(r.components[n],r.instances[n],r,n)})}))}function Po(t){return Array.prototype.concat.apply([],t)}var Il=typeof Symbol=="function"&&typeof Symbol.toStringTag=="symbol";function kl(t){return t.__esModule||Il&&t[Symbol.toStringTag]==="Module"}function ta(t){var e=!1;return function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if(!e)return e=!0,t.apply(this,r)}}var ft=function(e,r){this.router=e,this.base=Rl(r),this.current=Lt,this.pending=null,this.ready=!1,this.readyCbs=[],this.readyErrorCbs=[],this.errorCbs=[],this.listeners=[]};ft.prototype.listen=function(e){this.cb=e};ft.prototype.onReady=function(e,r){this.ready?e():(this.readyCbs.push(e),r&&this.readyErrorCbs.push(r))};ft.prototype.onError=function(e){this.errorCbs.push(e)};ft.prototype.transitionTo=function(e,r,n){var i=this,a;try{a=this.router.match(e,this.current)}catch(s){throw this.errorCbs.forEach(function(c){c(s)}),s}var o=this.current;this.confirmTransition(a,function(){i.updateRoute(a),r&&r(a),i.ensureURL(),i.router.afterHooks.forEach(function(s){s&&s(a,o)}),i.ready||(i.ready=!0,i.readyCbs.forEach(function(s){s(a)}))},function(s){n&&n(s),s&&!i.ready&&(!Sr(s,Xt.redirected)||o!==Lt)&&(i.ready=!0,i.readyErrorCbs.forEach(function(c){c(s)}))})};ft.prototype.confirmTransition=function(e,r,n){var i=this,a=this.current;this.pending=e;var o=function(y){!Sr(y)&&vr(y)&&(i.errorCbs.length?i.errorCbs.forEach(function(_){_(y)}):console.error(y)),n&&n(y)},s=e.matched.length-1,c=a.matched.length-1;if(go(e,a)&&s===c&&e.matched[s]===a.matched[c])return this.ensureURL(),e.hash&&At(this.router,a,e,!1),o(El(a,e));var u=jl(this.current.matched,e.matched),f=u.updated,h=u.deactivated,v=u.activated,m=[].concat(Dl(h),this.router.beforeHooks,Ml(f),v.map(function(y){return y.beforeEnter}),Pl(v)),b=function(y,_){if(i.pending!==e)return o(Vi(a,e));try{y(e,a,function(S){S===!1?(i.ensureURL(!0),o($l(a,e))):vr(S)?(i.ensureURL(!0),o(S)):typeof S=="string"||typeof S=="object"&&(typeof S.path=="string"||typeof S.name=="string")?(o(Ol(a,e)),typeof S=="object"&&S.replace?i.replace(S):i.push(S)):_(S)})}catch(S){o(S)}};Zi(m,b,function(){var y=Fl(v),_=y.concat(i.router.resolveHooks);Zi(_,b,function(){if(i.pending!==e)return o(Vi(a,e));i.pending=null,r(e),i.router.app&&i.router.app.$nextTick(function(){mo(e)})})})};ft.prototype.updateRoute=function(e){this.current=e,this.cb&&this.cb(e)};ft.prototype.setupListeners=function(){};ft.prototype.teardown=function(){this.listeners.forEach(function(e){e()}),this.listeners=[],this.current=Lt,this.pending=null};function Rl(t){if(!t)if(Te){var e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^https?:\/\/[^\/]+/,"")}else t="/";return t.charAt(0)!=="/"&&(t="/"+t),t.replace(/\/$/,"")}function jl(t,e){var r,n=Math.max(t.length,e.length);for(r=0;r<n&&t[r]===e[r];r++);return{updated:e.slice(0,r),activated:e.slice(r),deactivated:t.slice(r)}}function Mn(t,e,r,n){var i=To(t,function(a,o,s,c){var u=Ll(a,e);if(u)return Array.isArray(u)?u.map(function(f){return r(f,o,s,c)}):r(u,o,s,c)});return Po(n?i.reverse():i)}function Ll(t,e){return typeof t!="function"&&(t=dr.extend(t)),t.options[e]}function Dl(t){return Mn(t,"beforeRouteLeave",Io,!0)}function Ml(t){return Mn(t,"beforeRouteUpdate",Io)}function Io(t,e){if(e)return function(){return t.apply(e,arguments)}}function Fl(t){return Mn(t,"beforeRouteEnter",function(e,r,n,i){return Nl(e,n,i)})}function Nl(t,e,r){return function(i,a,o){return t(i,a,function(s){typeof s=="function"&&(e.enteredCbs[r]||(e.enteredCbs[r]=[]),e.enteredCbs[r].push(s)),o(s)})}}var ko=function(t){function e(r,n){t.call(this,r,n),this._startLocation=me(this.base)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var n=this;if(!(this.listeners.length>0)){var i=this.router,a=i.options.scrollBehavior,o=Tt&&a;o&&this.listeners.push($o());var s=function(){var c=n.current,u=me(n.base);n.current===Lt&&u===n._startLocation||n.transitionTo(u,function(f){o&&At(i,f,c,!0)})};window.addEventListener("popstate",s),this.listeners.push(function(){window.removeEventListener("popstate",s)})}},e.prototype.go=function(n){window.history.go(n)},e.prototype.push=function(n,i,a){var o=this,s=this,c=s.current;this.transitionTo(n,function(u){hr($t(o.base+u.fullPath)),At(o.router,u,c,!1),i&&i(u)},a)},e.prototype.replace=function(n,i,a){var o=this,s=this,c=s.current;this.transitionTo(n,function(u){cn($t(o.base+u.fullPath)),At(o.router,u,c,!1),i&&i(u)},a)},e.prototype.ensureURL=function(n){if(me(this.base)!==this.current.fullPath){var i=$t(this.base+this.current.fullPath);n?hr(i):cn(i)}},e.prototype.getCurrentLocation=function(){return me(this.base)},e}(ft);function me(t){var e=window.location.pathname,r=e.toLowerCase(),n=t.toLowerCase();return t&&(r===n||r.indexOf($t(n+"/"))===0)&&(e=e.slice(t.length)),(e||"/")+window.location.search+window.location.hash}var Ro=function(t){function e(r,n,i){t.call(this,r,n),!(i&&Ul(this.base))&&ea()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var n=this;if(!(this.listeners.length>0)){var i=this.router,a=i.options.scrollBehavior,o=Tt&&a;o&&this.listeners.push($o());var s=function(){var u=n.current;!ea()||n.transitionTo(Xe(),function(f){o&&At(n.router,f,u,!0),Tt||Qe(f.fullPath)})},c=Tt?"popstate":"hashchange";window.addEventListener(c,s),this.listeners.push(function(){window.removeEventListener(c,s)})}},e.prototype.push=function(n,i,a){var o=this,s=this,c=s.current;this.transitionTo(n,function(u){ra(u.fullPath),At(o.router,u,c,!1),i&&i(u)},a)},e.prototype.replace=function(n,i,a){var o=this,s=this,c=s.current;this.transitionTo(n,function(u){Qe(u.fullPath),At(o.router,u,c,!1),i&&i(u)},a)},e.prototype.go=function(n){window.history.go(n)},e.prototype.ensureURL=function(n){var i=this.current.fullPath;Xe()!==i&&(n?ra(i):Qe(i))},e.prototype.getCurrentLocation=function(){return Xe()},e}(ft);function Ul(t){var e=me(t);if(!/^\/#/.test(e))return window.location.replace($t(t+"/#"+e)),!0}function ea(){var t=Xe();return t.charAt(0)==="/"?!0:(Qe("/"+t),!1)}function Xe(){var t=window.location.href,e=t.indexOf("#");return e<0?"":(t=t.slice(e+1),t)}function un(t){var e=window.location.href,r=e.indexOf("#"),n=r>=0?e.slice(0,r):e;return n+"#"+t}function ra(t){Tt?hr(un(t)):window.location.hash=t}function Qe(t){Tt?cn(un(t)):window.location.replace(un(t))}var Bl=function(t){function e(r,n){t.call(this,r,n),this.stack=[],this.index=-1}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.push=function(n,i,a){var o=this;this.transitionTo(n,function(s){o.stack=o.stack.slice(0,o.index+1).concat(s),o.index++,i&&i(s)},a)},e.prototype.replace=function(n,i,a){var o=this;this.transitionTo(n,function(s){o.stack=o.stack.slice(0,o.index).concat(s),i&&i(s)},a)},e.prototype.go=function(n){var i=this,a=this.index+n;if(!(a<0||a>=this.stack.length)){var o=this.stack[a];this.confirmTransition(o,function(){var s=i.current;i.index=a,i.updateRoute(o),i.router.afterHooks.forEach(function(c){c&&c(o,s)})},function(s){Sr(s,Xt.duplicated)&&(i.index=a)})}},e.prototype.getCurrentLocation=function(){var n=this.stack[this.stack.length-1];return n?n.fullPath:"/"},e.prototype.ensureURL=function(){},e}(ft),F=function(e){e===void 0&&(e={}),this.app=null,this.apps=[],this.options=e,this.beforeHooks=[],this.resolveHooks=[],this.afterHooks=[],this.matcher=ml(e.routes||[],this);var r=e.mode||"hash";switch(this.fallback=r==="history"&&!Tt&&e.fallback!==!1,this.fallback&&(r="hash"),Te||(r="abstract"),this.mode=r,r){case"history":this.history=new ko(this,e.base);break;case"hash":this.history=new Ro(this,e.base,this.fallback);break;case"abstract":this.history=new Bl(this,e.base);break}},jo={currentRoute:{configurable:!0}};F.prototype.match=function(e,r,n){return this.matcher.match(e,r,n)};jo.currentRoute.get=function(){return this.history&&this.history.current};F.prototype.init=function(e){var r=this;if(this.apps.push(e),e.$once("hook:destroyed",function(){var o=r.apps.indexOf(e);o>-1&&r.apps.splice(o,1),r.app===e&&(r.app=r.apps[0]||null),r.app||r.history.teardown()}),!this.app){this.app=e;var n=this.history;if(n instanceof ko||n instanceof Ro){var i=function(o){var s=n.current,c=r.options.scrollBehavior,u=Tt&&c;u&&"fullPath"in o&&At(r,o,s,!1)},a=function(o){n.setupListeners(),i(o)};n.transitionTo(n.getCurrentLocation(),a,a)}n.listen(function(o){r.apps.forEach(function(s){s._route=o})})}};F.prototype.beforeEach=function(e){return Fn(this.beforeHooks,e)};F.prototype.beforeResolve=function(e){return Fn(this.resolveHooks,e)};F.prototype.afterEach=function(e){return Fn(this.afterHooks,e)};F.prototype.onReady=function(e,r){this.history.onReady(e,r)};F.prototype.onError=function(e){this.history.onError(e)};F.prototype.push=function(e,r,n){var i=this;if(!r&&!n&&typeof Promise<"u")return new Promise(function(a,o){i.history.push(e,a,o)});this.history.push(e,r,n)};F.prototype.replace=function(e,r,n){var i=this;if(!r&&!n&&typeof Promise<"u")return new Promise(function(a,o){i.history.replace(e,a,o)});this.history.replace(e,r,n)};F.prototype.go=function(e){this.history.go(e)};F.prototype.back=function(){this.go(-1)};F.prototype.forward=function(){this.go(1)};F.prototype.getMatchedComponents=function(e){var r=e?e.matched?e:this.resolve(e).route:this.currentRoute;return r?[].concat.apply([],r.matched.map(function(n){return Object.keys(n.components).map(function(i){return n.components[i]})})):[]};F.prototype.resolve=function(e,r,n){r=r||this.history.current;var i=Dn(e,r,n,this),a=this.match(i,r),o=a.redirectedFrom||a.fullPath,s=this.history.base,c=Hl(s,o,this.mode);return{location:i,route:a,href:c,normalizedTo:i,resolved:a}};F.prototype.getRoutes=function(){return this.matcher.getRoutes()};F.prototype.addRoute=function(e,r){this.matcher.addRoute(e,r),this.history.current!==Lt&&this.history.transitionTo(this.history.getCurrentLocation())};F.prototype.addRoutes=function(e){this.matcher.addRoutes(e),this.history.current!==Lt&&this.history.transitionTo(this.history.getCurrentLocation())};Object.defineProperties(F.prototype,jo);var Lo=F;function Fn(t,e){return t.push(e),function(){var r=t.indexOf(e);r>-1&&t.splice(r,1)}}function Hl(t,e,r){var n=r==="hash"?"#"+e:e;return t?$t(t+"/"+n):n}F.install=on;F.version="3.6.5";F.isNavigationFailure=Sr;F.NavigationFailureType=Xt;F.START_LOCATION=Lt;Te&&window.Vue&&window.Vue.use(F);const zl=`## \u4E2D\u4ECB\u8005\u6A21\u5F0F\r
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
\u4E0B\u9762\u7684\u5185\u5BB9\u6CA1\u4EC0\u4E48\u91CD\u70B9\uFF0C\u6211\u770B\u4E0D\u4E0B\u53BB\u4E86\u2026\u2026`,Wl=`<html>\r
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
</html>`,ql=`function ObserverList(){\r
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
`,Gl=`// Publish/subscribe.js\r
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
})(pubsub)`,Jl=`#Javascript\u8BBE\u8BA1\u6A21\u5F0F/\u6211\u7684\u7406\u89E3\uFF08\u7FFB\u8BD1\r
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
\u8FD9\u662F\u6700\u7B80\u5355\u7684\u8BBE\u8BA1\u6A21\u5F0F\u4E4B\u4E00\uFF0C\u4E5F\u662F\u6700\u5F3A\u5927\u4E4B\u4E00\u3002`,Kl=`// mediator implement\r
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
}`,Yl=`// simple implement\r
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
})();`,Xl=`var myModule = (function(){\r
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
// `,Ql=`var mySingleton = (function(){\r
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
})();`,Vl=`# \u535A\u5BA2\u76EE\u5F55\r
\r
\u672C\u6587\u6863\u7AD9\u7531 VuePress v2 \u6784\u5EFA\uFF0C\u5185\u5BB9\u4ECE\u5386\u53F2\u5206\u652F\u4E0E \`pattern/\` \u793A\u4F8B\u8FC1\u79FB\u800C\u6765\u3002\r
\r
## \u6587\u7AE0\r
\r
- [Observer \u4E0E Publish/Subscribe](/blog/publish-subscribe.html)\r
- [\u4E2D\u4ECB\u8005\u6A21\u5F0F\uFF08Mediator\uFF09](/blog/mediator-pattern.html)\r
- [Pattern \u4EE3\u7801\u793A\u4F8B\u96C6](/blog/code-lab.html)\r
- [H5 launch-app\uFF1A\u5FAE\u4FE1\u5F00\u653E\u6807\u7B7E\u539F\u7406](/blog/wechat-open-tag-launch-app.html)\r
- [2026 \u524D\u7AEF\u70ED\u70B9\u5B9E\u6218\u56FE](/blog/frontend-trends-2026-practice-map.html)\r
- [\u524D\u7AEF\u67B6\u6784\u51B3\u7B56\u624B\u518C](/blog/frontend-architecture-decision-playbook.html)\r
- [\u524D\u7AEF\u5DE5\u7A0B\u7406\u5FF5\uFF1A\u5FEB\u7A33\u7B80](/blog/frontend-engineering-philosophy.html)\r
- [\u65E7\u7AD9\u5185\u5BB9\u5F52\u6863](/blog/legacy-notes.html)\r
\r
## \u672C\u7AD9\u5B9A\u4F4D\r
\r
- \u8BB0\u5F55\u7ECF\u5178 JavaScript \u8BBE\u8BA1\u6A21\u5F0F\u7406\u89E3\r
- \u4FDD\u7559\u65E9\u671F\u793A\u4F8B\uFF0C\u8865\u5145\u7ED3\u6784\u5316\u9605\u8BFB\u8DEF\u5F84\r
- \u5728\u4E0D\u6539\u53D8\u6838\u5FC3\u89C2\u70B9\u7684\u524D\u63D0\u4E0B\u63D0\u5347\u53EF\u8BFB\u6027\r
`,Zl=`# Pattern \u4EE3\u7801\u793A\u4F8B\u96C6\r
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
`,tp=`# \u524D\u7AEF\u67B6\u6784\u51B3\u7B56\u624B\u518C\uFF1A\u4E0D\u662F\u201C\u6700\u5148\u8FDB\u201D\uFF0C\u800C\u662F\u201C\u6700\u5339\u914D\u201D\r
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
`,ep=`# \u524D\u7AEF\u5DE5\u7A0B\u7406\u5FF5\uFF1A\u5FEB\u3001\u7A33\u3001\u7B80\uFF0C\u4E0D\u505A\u65E0\u6548\u590D\u6742\u5316\r
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
`,rp=`# 2026 \u524D\u7AEF\u70ED\u70B9\u5B9E\u6218\u56FE\uFF1A\u600E\u4E48\u7528\u3001\u4F55\u65F6\u7528\u3001\u4E3A\u4EC0\u4E48\u7528\r
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
`,np=`# \u65E7\u7AD9\u5185\u5BB9\u5F52\u6863\r
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
`,ip=`# Markdown UI \u7F8E\u5316\u793A\u4F8B\r
\r
\u8FD9\u662F\u4E00\u7BC7\u5C55\u793A\u7F8E\u5316\u540E Markdown \u6E32\u67D3\u6548\u679C\u7684\u793A\u4F8B\u6587\u7AE0\u3002\r
\r
## \u{1F3A8} \u65B0\u7279\u6027\u5C55\u793A\r
\r
### 1. \u6807\u9898\u6837\u5F0F\u4F18\u5316\r
\r
\u6240\u6709\u6807\u9898\u90FD\u6DFB\u52A0\u4E86\u5DE6\u4FA7\u6E10\u53D8\u88C5\u9970\u7EBF\uFF0C\u5C42\u6B21\u66F4\u5206\u660E\u3002\r
\r
#### \u4E09\u7EA7\u6807\u9898\u793A\u4F8B\r
\r
\u56DB\u7EA7\u6807\u9898\u4E5F\u80FD\u5F88\u597D\u5730\u5C55\u793A\u5C42\u7EA7\u5173\u7CFB\u3002\r
\r
### 2. \u6587\u672C\u683C\u5F0F\u5316\r
\r
\u652F\u6301 **\u7C97\u4F53**\u3001*\u659C\u4F53*\u3001\`\u884C\u5185\u4EE3\u7801\` \u548C ~~\u5220\u9664\u7EBF~~ \u7B49\u591A\u79CD\u683C\u5F0F\u3002\r
\r
### 3. \u94FE\u63A5\u6837\u5F0F\r
\r
[\u8FD9\u662F\u4E00\u4E2A\u94FE\u63A5\u793A\u4F8B](https://example.com)\uFF0C\u60AC\u505C\u65F6\u6709\u4E0B\u5212\u7EBF\u52A8\u753B\u6548\u679C\u3002\r
\r
### 4. \u5F15\u7528\u5757\r
\r
> \u8FD9\u662F\u4E00\u4E2A\u5F15\u7528\u5757\u793A\u4F8B\u3002\r
> \u5F15\u7528\u5757\u6709\u5DE6\u4FA7\u8FB9\u6846\u548C\u80CC\u666F\u8272\uFF0C\u975E\u5E38\u9002\u5408\u7A81\u51FA\u91CD\u8981\u5185\u5BB9\u3002\r
\r
### 5. \u5217\u8868\r
\r
#### \u65E0\u5E8F\u5217\u8868\r
\r
- \u7B2C\u4E00\u9879\r
- \u7B2C\u4E8C\u9879\r
- \u7B2C\u4E09\u9879\r
  - \u5D4C\u5957\u9879\u76EE\r
  - \u66F4\u591A\u5D4C\u5957\r
\r
#### \u6709\u5E8F\u5217\u8868\r
\r
1. \u7B2C\u4E00\u6B65\r
2. \u7B2C\u4E8C\u6B65\r
3. \u7B2C\u4E09\u6B65\r
\r
#### \u4EFB\u52A1\u5217\u8868\r
\r
- [x] \u5DF2\u5B8C\u6210\u7684\u4EFB\u52A1\r
- [ ] \u5F85\u5B8C\u6210\u7684\u4EFB\u52A1\r
- [x] \u53E6\u4E00\u4E2A\u5DF2\u5B8C\u6210\u7684\u4EFB\u52A1\r
\r
### 6. \u4EE3\u7801\u5757\r
\r
#### JavaScript \u793A\u4F8B\r
\r
\`\`\`javascript\r
// \u8FD9\u662F\u4E00\u4E2A JavaScript \u4EE3\u7801\u793A\u4F8B\r
function greet(name) {\r
  return \`Hello, \${name}!\`\r
}\r
\r
console.log(greet('World'))\r
\`\`\`\r
\r
#### TypeScript \u793A\u4F8B\r
\r
\`\`\`typescript\r
interface User {\r
  id: number\r
  name: string\r
  email: string\r
}\r
\r
const user: User = {\r
  id: 1,\r
  name: 'John Doe',\r
  email: 'john@example.com'\r
}\r
\`\`\`\r
\r
### 7. \u8868\u683C\r
\r
| \u529F\u80FD | \u72B6\u6001 | \u8BF4\u660E |\r
|------|------|------|\r
| \u6807\u9898\u7F8E\u5316 | \u2705 | \u5DF2\u5B9E\u73B0 |\r
| \u4EE3\u7801\u9AD8\u4EAE | \u2705 | \u5DF2\u5B9E\u73B0 |\r
| \u8868\u683C\u652F\u6301 | \u2705 | \u5DF2\u5B9E\u73B0 |\r
| \u4EFB\u52A1\u5217\u8868 | \u2705 | \u5DF2\u5B9E\u73B0 |\r
| \u52A8\u753B\u6548\u679C | \u2705 | \u5DF2\u5B9E\u73B0 |\r
\r
### 8. \u56FE\u7247\r
\r
![\u793A\u4F8B\u56FE\u7247](https://via.placeholder.com/600x300/0a1929/8de8ff?text=Markdown+UI+Demo)\r
\r
### 9. \u6C34\u5E73\u5206\u5272\u7EBF\r
\r
---\r
\r
\u5206\u5272\u7EBF\u91C7\u7528\u4E86\u6E10\u53D8\u6548\u679C\uFF0C\u89C6\u89C9\u4E0A\u66F4\u52A0\u4F18\u96C5\u3002\r
\r
## \u{1F4A1} \u4F7F\u7528\u5EFA\u8BAE\r
\r
1. **\u5408\u7406\u4F7F\u7528\u6807\u9898\u5C42\u7EA7**\uFF1A\u4FDD\u6301\u6587\u6863\u7ED3\u6784\u6E05\u6670\r
2. **\u9002\u5F53\u4F7F\u7528\u4EE3\u7801\u5757**\uFF1A\u63D0\u9AD8\u6280\u672F\u6587\u6863\u7684\u53EF\u8BFB\u6027\r
3. **\u5584\u7528\u5F15\u7528\u5757**\uFF1A\u7A81\u51FA\u91CD\u8981\u4FE1\u606F\r
4. **\u6DFB\u52A0\u4EFB\u52A1\u5217\u8868**\uFF1A\u8FFD\u8E2A\u8FDB\u5EA6\u548C\u5F85\u529E\u4E8B\u9879\r
\r
## \u{1F680} \u603B\u7ED3\r
\r
\u901A\u8FC7\u8FD9\u6B21\u7F8E\u5316\uFF0CMarkdown \u6587\u6863\u7684\u89C6\u89C9\u6548\u679C\u5F97\u5230\u4E86\u663E\u8457\u63D0\u5347\uFF1A\r
\r
- \u2728 \u66F4\u73B0\u4EE3\u7684\u914D\u8272\u65B9\u6848\r
- \u{1F3AF} \u66F4\u6E05\u6670\u7684\u89C6\u89C9\u5C42\u6B21\r
- \u{1F4AB} \u6D41\u7545\u7684\u4EA4\u4E92\u52A8\u753B\r
- \u{1F4F1} \u54CD\u5E94\u5F0F\u8BBE\u8BA1\u652F\u6301\r
\r
\u5E0C\u671B\u8FD9\u4E9B\u6539\u8FDB\u80FD\u8BA9\u4F60\u7684\u535A\u5BA2\u9605\u8BFB\u4F53\u9A8C\u66F4\u52A0\u6109\u60A6\uFF01\r
`,ap=`# Markdown UI \u7F8E\u5316\u5B8C\u6210\u603B\u7ED3\r
\r
## \u2705 \u5DF2\u5B8C\u6210\u7684\u6539\u8FDB\r
\r
### 1. **Markdown \u6E32\u67D3\u5668\u589E\u5F3A** (\`src/utils/markdown.ts\`)\r
\r
\u65B0\u589E\u4E86\u4EE5\u4E0B Markdown \u8BED\u6CD5\u652F\u6301\uFF1A\r
\r
- \u2705 **\u8868\u683C\u6E32\u67D3** - \u652F\u6301\u6807\u51C6 Markdown \u8868\u683C\u8BED\u6CD5\r
- \u2705 **\u4EFB\u52A1\u5217\u8868** - \u652F\u6301 \`- [x]\` \u548C \`- [ ]\` \u8BED\u6CD5\r
- \u2705 **\u5220\u9664\u7EBF** - \u652F\u6301 \`~~text~~\` \u8BED\u6CD5\r
- \u2705 **\u56FE\u7247** - \u652F\u6301 \`![alt](url)\` \u8BED\u6CD5\r
- \u2705 **\u6C34\u5E73\u5206\u5272\u7EBF** - \u652F\u6301 \`---\` \u8BED\u6CD5\r
- \u2705 **\u4EE3\u7801\u5757\u8BED\u8A00\u6807\u8BC6** - \u4FDD\u7559\u5E76\u663E\u793A\u4EE3\u7801\u8BED\u8A00\r
\r
### 2. **\u535A\u5BA2\u8BE6\u60C5\u9875\u7F8E\u5316** (\`src/views/BlogDetailView.vue\`)\r
\r
#### \u89C6\u89C9\u6539\u8FDB\uFF1A\r
- \u{1F3A8} \u6DFB\u52A0\u9875\u9762\u8FDB\u5165\u52A8\u753B\uFF08fadeInUp\uFF09\r
- \u{1F308} \u6807\u9898\u4F7F\u7528\u6E10\u53D8\u8272\u6587\u5B57\u6548\u679C\r
- \u{1F4AB} \u5361\u7247\u60AC\u505C\u65F6\u6709\u8FB9\u6846\u9AD8\u4EAE\u548C\u9634\u5F71\u6548\u679C\r
- \u{1F4CA} \u6DFB\u52A0\u9605\u8BFB\u65F6\u95F4\u4F30\u7B97\r
- \u{1F3F7}\uFE0F \u6DFB\u52A0\u6587\u7AE0\u6807\u7B7E\u663E\u793A\r
\r
#### \u5185\u5BB9\u6837\u5F0F\u4F18\u5316\uFF1A\r
- \u{1F4DD} \u6807\u9898\u5DE6\u4FA7\u6DFB\u52A0\u6E10\u53D8\u88C5\u9970\u7EBF\r
- \u{1F4BB} \u4EE3\u7801\u5757\u91C7\u7528\u6DF1\u8272\u4E3B\u9898\uFF0C\u5E26\u8FB9\u6846\u548C\u9634\u5F71\r
- \u{1F4CB} \u8868\u683C\u6709\u6E05\u6670\u7684\u8FB9\u6846\u548C\u60AC\u505C\u6548\u679C\r
- \u{1F4AC} \u5F15\u7528\u5757\u6709\u5DE6\u4FA7\u5F69\u8272\u8FB9\u6846\u548C\u80CC\u666F\u8272\r
- \u{1F517} \u94FE\u63A5\u6709\u865A\u7EBF\u4E0B\u5212\u7EBF\uFF0C\u60AC\u505C\u65F6\u53D8\u5B9E\u7EBF\r
- \u2611\uFE0F \u4EFB\u52A1\u5217\u8868\u6709\u81EA\u5B9A\u4E49\u590D\u9009\u6846\u6837\u5F0F\r
- \u{1F5BC}\uFE0F \u56FE\u7247\u6709\u5706\u89D2\u548C\u9634\u5F71\u6548\u679C\r
\r
#### \u4EA4\u4E92\u6539\u8FDB\uFF1A\r
- \u2B05\uFE0F \u8FD4\u56DE\u6309\u94AE\u6709\u60AC\u505C\u4F4D\u79FB\u52A8\u753B\r
- \u{1F4DA} \u76F8\u5173\u6587\u7AE0\u5361\u7247\u6709\u9876\u90E8\u6E10\u53D8\u6761\u52A8\u753B\r
- \u{1F3AF} \u6240\u6709\u53EF\u70B9\u51FB\u5143\u7D20\u90FD\u6709\u5E73\u6ED1\u8FC7\u6E21\u6548\u679C\r
\r
### 3. **\u9996\u9875\u7F8E\u5316** (\`src/views/HomeView.vue\`)\r
\r
#### Hero \u533A\u57DF\uFF1A\r
- \u2728 \u6DFB\u52A0\u52A8\u6001\u5149\u6655\u80CC\u666F\u6548\u679C\r
- \u{1F3AD} \u6807\u9898\u4F7F\u7528\u6E10\u53D8\u8272\u6587\u5B57\r
- \u{1F518} \u6309\u94AE\u6709\u6D9F\u6F2A\u6548\u679C\u548C\u60AC\u505C\u52A8\u753B\r
- \u{1F4CA} \u6307\u6807\u5361\u7247\u6709\u60AC\u505C\u4E0A\u6D6E\u6548\u679C\r
- \u{1F3A8} \u6DFB\u52A0 Emoji \u56FE\u6807\u589E\u5F3A\u89C6\u89C9\u6548\u679C\r
\r
#### \u7CBE\u9009\u6587\u7AE0\u5361\u7247\uFF1A\r
- \u{1F0CF} \u5361\u7247\u6709\u9876\u90E8\u6E10\u53D8\u6761\u52A8\u753B\r
- \u{1F4CC} \u6DFB\u52A0\u6765\u6E90\u6807\u7B7E\uFF08vdocs/pattern/seed\uFF09\r
- \u{1F4AB} \u60AC\u505C\u65F6\u5361\u7247\u4E0A\u6D6E\u5E76\u663E\u793A\u9634\u5F71\r
- \u27A1\uFE0F "\u67E5\u770B\u8BE6\u60C5"\u94FE\u63A5\u6709\u7BAD\u5934\u52A8\u753B\r
\r
#### \u6587\u7AE0\u5217\u8868\uFF1A\r
- \u{1F3B4} \u7EDF\u4E00\u7684\u5361\u7247\u8BBE\u8BA1\u98CE\u683C\r
- \u{1F3F7}\uFE0F \u5206\u7C7B\u548C\u6765\u6E90\u6807\u7B7E\r
- \u{1F4D6} \u53EF\u5C55\u5F00\u7684\u5168\u6587\u9884\u89C8\r
- \u{1F4AB}  staggered \u8FDB\u5165\u52A8\u753B\r
\r
#### \u4FA7\u8FB9\u680F\uFF1A\r
- \u{1F3A8} \u9AD8\u4EAE\u9762\u677F\u4F7F\u7528\u6E10\u53D8\u80CC\u666F\r
- \u{1F4CA} \u65B0\u589E\u7EDF\u8BA1\u6570\u636E\u9762\u677F\r
- \u{1F527} \u6240\u6709\u9762\u677F\u6709\u60AC\u505C\u6548\u679C\r
- \u{1F4BB} \u4EE3\u7801\u7247\u6BB5\u6709\u7F8E\u5316\u7684\u6837\u5F0F\r
\r
### 4. **\u5168\u5C40\u6EDA\u52A8\u6761\u7F8E\u5316** (\`src/assets/main.css\`)\r
\r
- \u{1F3A8} \u81EA\u5B9A\u4E49 Webkit \u6EDA\u52A8\u6761\uFF08Chrome\u3001Safari\u3001Edge\uFF09\r
- \u{1F98A} \u652F\u6301 Firefox \u6EDA\u52A8\u6761\u6837\u5F0F\r
- \u{1F308} \u6EDA\u52A8\u6761\u4F7F\u7528\u4E3B\u9898\u6E10\u53D8\u8272\r
- \u2728 \u60AC\u505C\u65F6\u6709\u989C\u8272\u53D8\u5316\r
\r
### 5. **\u793A\u4F8B\u6587\u6863**\r
\r
\u521B\u5EFA\u4E86 [\`markdown-ui-demo.md\`](d:\\Dev\\Projects\\adminfyy.github.io\\vdocs\\blog\\markdown-ui-demo.md) \u5C55\u793A\u6240\u6709\u65B0\u7279\u6027\u3002\r
\r
---\r
\r
## \u{1F3AF} \u8BBE\u8BA1\u539F\u5219\r
\r
### 1. **\u4E00\u81F4\u6027**\r
- \u7EDF\u4E00\u4F7F\u7528\u4E3B\u9898\u8272 \`#8de8ff\` \u548C \`#61daff\`\r
- \u6240\u6709\u5361\u7247\u4F7F\u7528\u76F8\u540C\u7684\u5706\u89D2\u548C\u8FB9\u6846\u6837\u5F0F\r
- \u4FDD\u6301\u7EDF\u4E00\u7684\u95F4\u8DDD\u548C\u5B57\u4F53\u5927\u5C0F\r
\r
### 2. **\u5C42\u6B21\u611F**\r
- \u901A\u8FC7\u9634\u5F71\u548C\u8FB9\u6846\u521B\u5EFA\u89C6\u89C9\u5C42\u6B21\r
- \u4F7F\u7528\u6E10\u53D8\u589E\u52A0\u6DF1\u5EA6\u611F\r
- \u6807\u9898\u5C42\u7EA7\u6E05\u6670\u53EF\u8FA8\r
\r
### 3. **\u4EA4\u4E92\u53CD\u9988**\r
- \u6240\u6709\u53EF\u4EA4\u4E92\u5143\u7D20\u90FD\u6709\u60AC\u505C\u6548\u679C\r
- \u4F7F\u7528\u5E73\u6ED1\u7684\u8FC7\u6E21\u52A8\u753B\uFF080.2s - 0.3s\uFF09\r
- \u63D0\u4F9B\u660E\u786E\u7684\u89C6\u89C9\u53CD\u9988\r
\r
### 4. **\u53EF\u8BFB\u6027**\r
- \u5408\u9002\u7684\u884C\u9AD8\uFF081.6 - 1.8\uFF09\r
- \u8DB3\u591F\u7684\u5BF9\u6BD4\u5EA6\r
- \u5408\u7406\u7684\u5B57\u4F53\u5927\u5C0F\u548C\u95F4\u8DDD\r
\r
### 5. **\u54CD\u5E94\u5F0F**\r
- \u79FB\u52A8\u7AEF\u53CB\u597D\u7684\u5E03\u5C40\r
- \u81EA\u9002\u5E94\u7684\u5B57\u4F53\u5927\u5C0F\uFF08clamp\uFF09\r
- \u7075\u6D3B\u7684\u7F51\u683C\u7CFB\u7EDF\r
\r
---\r
\r
## \u{1F4F1} \u54CD\u5E94\u5F0F\u65AD\u70B9\r
\r
- **\u684C\u9762\u7AEF**: \u2265 960px - \u591A\u5217\u5E03\u5C40\r
- **\u5E73\u677F\u7AEF**: 640px - 960px - \u8C03\u6574\u5217\u6570\r
- **\u79FB\u52A8\u7AEF**: < 640px - \u5355\u5217\u5E03\u5C40\r
\r
---\r
\r
## \u{1F3A8} \u914D\u8272\u65B9\u6848\r
\r
### \u4E3B\u8272\u8C03\r
- \u4E3B\u8272: \`#8de8ff\` (\u6D45\u84DD)\r
- \u8F85\u8272: \`#61daff\` (\u5929\u84DD)\r
- \u5F3A\u8C03\u8272: \`rgba(141, 232, 255, 0.15)\` (\u534A\u900F\u660E)\r
\r
### \u80CC\u666F\u8272\r
- \u6DF1\u8272\u80CC\u666F: \`rgba(3, 13, 30, 0.5)\`\r
- \u73BB\u7483\u6001: \`var(--surface-glass)\`\r
- \u4EE3\u7801\u5757: \`rgba(8, 22, 42, 0.8)\`\r
\r
### \u6587\u5B57\u8272\r
- \u6807\u9898: \`var(--color-heading)\` (#e8f7ff)\r
- \u6B63\u6587: \`var(--color-text)\` (#d7e8f8)\r
- \u6B21\u8981: \`#93acc0\`\r
\r
---\r
\r
## \u{1F680} \u6027\u80FD\u4F18\u5316\r
\r
- \u2705 \u4F7F\u7528 CSS transform \u800C\u975E position \u8FDB\u884C\u52A8\u753B\r
- \u2705 \u5408\u7406\u4F7F\u7528 backdrop-filter\uFF08\u9002\u5EA6\u4F7F\u7528\uFF09\r
- \u2705 \u52A8\u753B\u4F7F\u7528 GPU \u52A0\u901F\r
- \u2705 \u5EF6\u8FDF\u52A0\u8F7D\u52A8\u753B\uFF08staggered animation\uFF09\r
\r
---\r
\r
## \u{1F4DD} \u4F7F\u7528\u5EFA\u8BAE\r
\r
### \u5BF9\u4E8E\u535A\u5BA2\u4F5C\u8005\uFF1A\r
1. \u4F7F\u7528\u6807\u51C6 Markdown \u8BED\u6CD5\u7F16\u5199\u5185\u5BB9\r
2. \u9002\u5F53\u4F7F\u7528\u6807\u9898\u5C42\u7EA7\uFF08H1-H4\uFF09\r
3. \u5584\u7528\u4EE3\u7801\u5757\u5C55\u793A\u6280\u672F\u5185\u5BB9\r
4. \u4F7F\u7528\u4EFB\u52A1\u5217\u8868\u8FFD\u8E2A\u8FDB\u5EA6\r
5. \u6DFB\u52A0\u8868\u683C\u5BF9\u6BD4\u6570\u636E\r
\r
### \u5BF9\u4E8E\u5F00\u53D1\u8005\uFF1A\r
1. \u53EF\u4EE5\u901A\u8FC7\u4FEE\u6539 CSS \u53D8\u91CF\u5FEB\u901F\u8C03\u6574\u4E3B\u9898\r
2. \u6240\u6709\u6837\u5F0F\u90FD\u4F7F\u7528\u4E86 scoped\uFF0C\u4E0D\u4F1A\u5F71\u54CD\u5168\u5C40\r
3. Markdown \u6E32\u67D3\u5668\u53EF\u4EE5\u8F7B\u677E\u6269\u5C55\u65B0\u529F\u80FD\r
4. \u52A8\u753B\u65F6\u957F\u53EF\u4EE5\u5728 CSS \u4E2D\u7EDF\u4E00\u8C03\u6574\r
\r
---\r
\r
## \u{1F52E} \u672A\u6765\u53EF\u80FD\u7684\u6539\u8FDB\r
\r
- [ ] \u6DFB\u52A0\u6697\u8272/\u4EAE\u8272\u4E3B\u9898\u5207\u6362\r
- [ ] \u652F\u6301\u6570\u5B66\u516C\u5F0F\u6E32\u67D3\uFF08KaTeX\uFF09\r
- [ ] \u6DFB\u52A0\u76EE\u5F55\u5BFC\u822A\uFF08TOC\uFF09\r
- [ ] \u652F\u6301 Mermaid \u56FE\u8868\r
- [ ] \u6DFB\u52A0\u4EE3\u7801\u590D\u5236\u6309\u94AE\r
- [ ] \u5B9E\u73B0\u9605\u8BFB\u8FDB\u5EA6\u6761\r
- [ ] \u6DFB\u52A0\u5206\u4EAB\u529F\u80FD\r
\r
---\r
\r
## \u{1F4D6} \u76F8\u5173\u6587\u4EF6\r
\r
- \u6E32\u67D3\u5668: \`src/utils/markdown.ts\`\r
- \u8BE6\u60C5\u9875: \`src/views/BlogDetailView.vue\`\r
- \u9996\u9875: \`src/views/HomeView.vue\`\r
- \u5168\u5C40\u6837\u5F0F: \`src/assets/main.css\`\r
- \u57FA\u7840\u6837\u5F0F: \`src/assets/base.css\`\r
- \u793A\u4F8B\u6587\u6863: \`vdocs/blog/markdown-ui-demo.md\`\r
\r
---\r
\r
**\u66F4\u65B0\u65F6\u95F4**: 2026-05-03  \r
**\u7248\u672C**: v2.0 - Enhanced Markdown UI\r
`,op=`# \u4E2D\u4ECB\u8005\u6A21\u5F0F\uFF08Mediator\uFF09\r
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
`,sp=`# Observer \u4E0E Publish/Subscribe\r
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
`,cp=`# H5 \`launch-app\`\uFF1A\u5FAE\u4FE1\u5F00\u653E\u6807\u7B7E \`wx-open-launch-app\` \u539F\u7406\u4E0E\u5B9E\u6218\r
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
`,up=[{title:"Vue\u54CD\u5E94\u5F0F\u539F\u7406",content:"Object.defineProperty"},{title:"CSS-FLOAT",content:"vue-\u7ED1\u5B9A\u4F7F\u7528\u7684\u6307\u4EE4\u4E3A v-model: \u6682\u65E0\u5FEB\u6377\u7B80\u79F0"},{title:"Keyof Type Operator",content:"\u90A3\u4E2A keyof \u7C7B\u578B\u64CD\u4F5C\u7B26\uFF0Ckeyof \u7C7B\u578B\u64CD\u4F5C\u7B26\u80FD\u591F\u8F93\u5165\u4E00\u4E2A\u7C7B\u578B\uFF0C\u7136\u540E\u4EA7\u751F\u6240\u6709\u952E\u503C\u7684\u5B57\u7B26\u4E32\u6216\u8005\u6570\u5B57\u7684\u5B57\u9762\u8054\u5408\u7C7B\u578B"}],fp=Object.assign({"/pattern/Mediator.md":zl,"/pattern/Observer.html":Wl,"/pattern/Observer.js":ql,"/pattern/Publish.js":Gl,"/pattern/Publish.md":Jl,"/pattern/mediator-senior.js":Kl,"/pattern/mediator.js":Yl,"/pattern/module.js":Xl,"/pattern/singleton.js":Ql}),lp=Object.assign({"/vdocs/blog/README.md":Vl,"/vdocs/blog/code-lab.md":Zl,"/vdocs/blog/frontend-architecture-decision-playbook.md":tp,"/vdocs/blog/frontend-engineering-philosophy.md":ep,"/vdocs/blog/frontend-trends-2026-practice-map.md":rp,"/vdocs/blog/legacy-notes.md":np,"/vdocs/blog/markdown-ui-demo.md":ip,"/vdocs/blog/markdown-ui-improvements.md":ap,"/vdocs/blog/mediator-pattern.md":op,"/vdocs/blog/publish-subscribe.md":sp,"/vdocs/blog/wechat-open-tag-launch-app.md":cp}),Do=t=>(t.split("/").pop()||"Untitled").replace(/\.[^.]+$/,""),pp=t=>t.replace(/```[\s\S]*?```/g," ").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^#{1,6}\s+/gm,"").replace(/[*_>~-]/g," ").replace(/\|/g," "),Nn=(t,e=180)=>{const r=pp(t).replace(/\s+/g," ").trim();return r.length>e?`${r.slice(0,e)}...`:r},dp=(t,e)=>{const r=t.match(/^#\s+(.+)$/m);return r?r[1].trim():e},Un=t=>t.toLowerCase().replace(/^\//,"").replace(/[^a-z0-9\u4e00-\u9fa5]+/g,"-").replace(/^-+|-+$/g,""),Mo=Object.entries(fp).map(([t,e])=>{const r=t.split(".").pop()||"txt";return{id:`pattern-${t}`,slug:Un(`pattern-${t}`),title:Do(t),category:`pattern/${r}`,excerpt:Nn(e),content:e,source:"pattern"}}),Fo=Object.entries(lp).filter(([t])=>!t.endsWith("/README.md")).map(([t,e])=>({id:`vdocs-${t}`,slug:Un(`vdocs-${t}`),title:dp(e,Do(t)),category:"vdocs/blog",excerpt:Nn(e),content:e,source:"vdocs"})),No=up.map((t,e)=>({id:`seed-${e}`,slug:Un(`seed-${t.title}-${e}`),title:t.title,category:"notes",excerpt:Nn(t.content),content:t.content,source:"seed"})),Bn=[...Fo,...Mo,...No];function hp(){return Bn}function kp(t){return Bn.find(e=>e.slug===t)}function vp(){return{total:Bn.length,vdocsCount:Fo.length,patternCount:Mo.length,seedCount:No.length}}const gp={__name:"HomeView",setup(t){const e=hp(),r=vp(),n=e.slice(0,3);return{__sfc:!0,posts:e,stats:r,featuredPosts:n}}};function Uo(t,e,r,n,i,a,o,s){var c=typeof t=="function"?t.options:t;e&&(c.render=e,c.staticRenderFns=r,c._compiled=!0),n&&(c.functional=!0),a&&(c._scopeId="data-v-"+a);var u;if(o?(u=function(v){v=v||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!v&&typeof __VUE_SSR_CONTEXT__<"u"&&(v=__VUE_SSR_CONTEXT__),i&&i.call(this,v),v&&v._registeredComponents&&v._registeredComponents.add(o)},c._ssrRegister=u):i&&(u=s?function(){i.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:i),u)if(c.functional){c._injectStyles=u;var f=c.render;c.render=function(m,b){return u.call(b),f(m,b)}}else{var h=c.beforeCreate;c.beforeCreate=h?[].concat(h,u):[u]}return{exports:t,options:c}}var mp=function(){var e=this,r=e._self._c,n=e._self._setupProxy;return r("main",{staticClass:"blog-page"},[r("section",{staticClass:"hero"},[r("div",{staticClass:"hero-content"},[r("p",{staticClass:"kicker"},[e._v("\u{1F31F} \u6280\u672F\u6539\u53D8\u751F\u6D3B")]),r("h1",[e._v("\u7528\u4EE3\u7801\u63A2\u7D22\u4E16\u754C\uFF0C\u4EE5\u5DE5\u7A0B\u9A71\u52A8\u521B\u65B0")]),r("p",{staticClass:"description"},[e._v(" \u8BB0\u5F55\u524D\u7AEF\u5DE5\u7A0B\u5B9E\u8DF5\u3001\u8BBE\u8BA1\u6A21\u5F0F\u7814\u7A76\u4E0E Agent \u5DE5\u5177\u5F00\u53D1\uFF0C\u5C55\u793A\u6280\u672F\u5982\u4F55\u8D4B\u80FD\u65E5\u5E38\u751F\u6D3B\u3002 ")]),r("div",{staticClass:"hero-actions"},[r("router-link",{staticClass:"btn primary",attrs:{to:"/about"}},[r("span",{staticClass:"btn-icon"},[e._v("\u{1F468}\u200D\u{1F4BB}")]),e._v(" \u5173\u4E8E\u6211 ")]),r("router-link",{staticClass:"btn ghost",attrs:{to:"/agent-portal"}},[r("span",{staticClass:"btn-icon"},[e._v("\u{1F680}")]),e._v(" Agent Portal ")])],1)]),r("div",{staticClass:"hero-metrics"},[e._m(0),e._m(1),r("div",{staticClass:"metric"},[r("div",{staticClass:"metric-icon"},[e._v("\u{1F4DD}")]),r("p",[e._v("\u6587\u7AE0")]),r("strong",[e._v(e._s(n.stats.total))])]),e._m(2)])]),r("section",{staticClass:"featured"},[e._m(3),r("div",{staticClass:"featured-grid"},e._l(n.featuredPosts,function(i,a){return r("article",{key:i.id,staticClass:"featured-card",style:{animationDelay:`${a*.1}s`}},[r("div",{staticClass:"card-header"},[r("p",{staticClass:"meta"},[e._v(e._s(i.category))]),r("span",{staticClass:"source-badge"},[e._v(e._s(i.source))])]),r("h3",[e._v(e._s(i.title))]),r("p",{staticClass:"excerpt"},[e._v(e._s(i.excerpt))]),r("router-link",{staticClass:"read-link",attrs:{to:`/blog/${i.slug}`}},[e._v(" \u9605\u8BFB\u5168\u6587 "),r("span",{staticClass:"arrow"},[e._v("\u2192")])])],1)}),0)]),r("section",{staticClass:"blog-layout"},[r("article",{staticClass:"post-list"},e._l(n.posts,function(i,a){return r("div",{key:i.id,staticClass:"post-card",style:{animationDelay:`${a*.05}s`}},[r("div",{staticClass:"card-top"},[r("p",{staticClass:"meta"},[e._v(e._s(i.category))]),r("span",{staticClass:"source-badge small"},[e._v(e._s(i.source))])]),r("h2",[e._v(e._s(i.title))]),r("p",{staticClass:"excerpt"},[e._v(e._s(i.excerpt))]),r("router-link",{staticClass:"read-link",attrs:{to:`/blog/${i.slug}`}},[e._v(" \u9605\u8BFB\u5168\u6587 "),r("span",{staticClass:"arrow"},[e._v("\u2192")])]),r("details",{staticClass:"content-preview"},[e._m(4,!0),r("pre",[e._v(e._s(i.content))])])],1)}),0),r("aside",{staticClass:"sidebar"},[e._m(5),e._m(6),r("div",{staticClass:"panel stats-panel"},[e._m(7),r("div",{staticClass:"stats-list"},[r("div",{staticClass:"stat-item"},[r("span",{staticClass:"stat-label"},[e._v("\u6587\u7AE0\u603B\u6570")]),r("span",{staticClass:"stat-value"},[e._v(e._s(n.stats.total))])]),r("div",{staticClass:"stat-item"},[r("span",{staticClass:"stat-label"},[e._v("VDocs")]),r("span",{staticClass:"stat-value"},[e._v(e._s(n.stats.vdocsCount))])]),r("div",{staticClass:"stat-item"},[r("span",{staticClass:"stat-label"},[e._v("Patterns")]),r("span",{staticClass:"stat-value"},[e._v(e._s(n.stats.patternCount))])])])])])])])},_p=[function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"metric"},[e("div",{staticClass:"metric-icon"},[t._v("\u{1F4A1}")]),e("p",[t._v("\u6280\u672F\u7406\u5FF5")]),e("strong",[t._v("\u521B\u65B0")])])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"metric"},[e("div",{staticClass:"metric-icon"},[t._v("\u{1F527}")]),e("p",[t._v("\u5DE5\u7A0B\u5B9E\u8DF5")]),e("strong",[t._v("\u843D\u5730")])])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"metric"},[e("div",{staticClass:"metric-icon"},[t._v("\u{1F310}")]),e("p",[t._v("\u5F00\u6E90")]),e("strong",[t._v("\u5171\u4EAB")])])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("h2",[e("span",{staticClass:"section-icon"},[t._v("\u{1F4CC}")]),t._v(" \u7CBE\u9009\u6587\u7AE0 ")])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("summary",[e("span",{staticClass:"expand-icon"},[t._v("\u25BC")]),t._v(" \u5C55\u5F00\u5185\u5BB9 ")])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"panel highlight"},[e("h3",[e("span",{staticClass:"panel-icon"},[t._v("\u{1F527}")]),t._v(" \u5185\u5BB9\u6765\u6E90 ")]),e("p",[t._v(" \u81EA\u52A8\u8BFB\u53D6 "),e("code",[t._v("/vdocs/blog/*.md")]),t._v(" \u4E0E "),e("code",[t._v("/pattern/*.{md,js,html}")]),t._v(" \u5E76\u6CE8\u5165\u4E3B\u7AD9\u535A\u5BA2\u6D41\u3002 ")])])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"panel"},[e("h3",[e("span",{staticClass:"panel-icon"},[t._v("\u{1F310}")]),t._v(" \u5DE5\u5177\u95E8\u6237 ")]),e("p",[t._v("\u8BBF\u95EE "),e("code",[t._v("/agent-portal")]),t._v(" \u83B7\u53D6 Agent Prompt \u5DE5\u5177\u95E8\u6237\u3002")])])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("h3",[e("span",{staticClass:"panel-icon"},[t._v("\u{1F4CA}")]),t._v(" \u5FEB\u901F\u7EDF\u8BA1 ")])}],bp=Uo(gp,mp,_p,!1,null,"603bd6b4",null,null);const yp=bp.exports;H.use(Lo);const Bo=new Lo({mode:"history",base:"/",routes:[{path:"/",name:"home",component:yp,meta:{title:"\u9996\u9875"}},{path:"/about",name:"about",component:()=>mt(()=>import("./AboutView.f3852018.js"),["assets/AboutView.f3852018.js","assets/AboutView.9029727f.css"]),meta:{title:"About"}},{path:"/agent-portal",name:"agent-portal",component:()=>mt(()=>import("./AgentPortalView.6f96391e.js"),["assets/AgentPortalView.6f96391e.js","assets/AgentPortalView.6b1c26d6.css"]),meta:{title:"Agent Portal"}},{path:"/blog/:slug",name:"blog-detail",component:()=>mt(()=>import("./BlogDetailView.bfa64046.js"),["assets/BlogDetailView.bfa64046.js","assets/BlogDetailView.ff86f6af.css"])},{path:"/tic-tac-toe",name:"tic-tac-toe",component:()=>mt(()=>import("./TicTacToeView.70f8c933.js"),["assets/TicTacToeView.70f8c933.js","assets/TicTacToeView.168a724c.css"]),meta:{title:"Game"}},{path:"/overseas-export",name:"overseas-export",component:()=>mt(()=>import("./OverseasExportView.cd3954b1.js"),["assets/OverseasExportView.cd3954b1.js","assets/OverseasExportView.db98e743.css"]),meta:{title:"Export"}},{path:"/wasm",name:"wasm",component:()=>mt(()=>import("./WasmView.1d58967d.js"),["assets/WasmView.1d58967d.js","assets/WasmView.327ab629.css"]),meta:{title:"WASM"}},{path:"/canvas",name:"canvas",component:()=>mt(()=>import("./CanvasView.602130b1.js"),["assets/CanvasView.602130b1.js","assets/CanvasView.66b274a8.css"]),meta:{title:"Canvas"}},{path:"/three",name:"three",component:()=>mt(()=>import("./ThreeView.de0eed39.js"),["assets/ThreeView.de0eed39.js","assets/ThreeView.d9b7aeab.css"]),meta:{title:"3D"}},{path:"/pretext",name:"pretext",component:()=>mt(()=>import("./PretextView.8f82a32e.js"),["assets/PretextView.8f82a32e.js","assets/PretextView.1e3fca1a.css"]),meta:{title:"Pretext"}}]}),wp="/assets/logo.da9b9095.svg";const Sp={computed:{menuRoutes(){return Bo.options.routes.filter(t=>t.meta&&t.meta.title)}}};var Cp=function(){var e=this,r=e._self._c;return r("div",{attrs:{id:"app"}},[r("header",{staticClass:"site-header"},[e._m(0),r("nav",e._l(e.menuRoutes,function(n){return r("router-link",{key:n.path,attrs:{to:n.path}},[e._v(" "+e._s(n.meta.title)+" ")])}),1)]),r("router-view")],1)},xp=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"brand"},[e("img",{staticClass:"logo",attrs:{alt:"Vue logo",src:wp,width:"36",height:"36"}}),e("div",[e("p",{staticClass:"site-name"},[t._v("\u6280\u672F\u6539\u53D8\u751F\u6D3B")]),e("p",{staticClass:"site-subtitle"},[t._v("Technology Changes Life")])])])}],Op=Uo(Sp,Cp,xp,!1,null,"fd1018fa",null,null);const Ep=Op.exports;H.use(Nf);new H({router:Bo,pinia:Ff(),render:t=>t(Ep)}).$mount("#app");export{H as V,$p as __vite_legacy_guard,hp as a,gn as b,Ap as c,Ip as d,Pp as e,kp as g,Uo as n,Tp as o,cs as r,ps as w};
