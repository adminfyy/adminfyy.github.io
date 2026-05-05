function Tp(){import("data:text/javascript,")}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerpolicy&&(a.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?a.credentials="include":i.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();/*!
 * Vue.js v2.7.15
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */var Q=Object.freeze({}),P=Array.isArray;function O(t){return t==null}function d(t){return t!=null}function z(t){return t===!0}function Uo(t){return t===!1}function Oe(t){return typeof t=="string"||typeof t=="number"||typeof t=="symbol"||typeof t=="boolean"}function D(t){return typeof t=="function"}function K(t){return t!==null&&typeof t=="object"}var fr=Object.prototype.toString;function et(t){return fr.call(t)==="[object Object]"}function Ho(t){return fr.call(t)==="[object RegExp]"}function ra(t){var e=parseFloat(String(t));return e>=0&&Math.floor(e)===e&&isFinite(t)}function Rn(t){return d(t)&&typeof t.then=="function"&&typeof t.catch=="function"}function Bo(t){return t==null?"":Array.isArray(t)||et(t)&&t.toString===fr?JSON.stringify(t,null,2):String(t)}function _e(t){var e=parseFloat(t);return isNaN(e)?t:e}function ut(t,e){for(var n=Object.create(null),r=t.split(","),i=0;i<r.length;i++)n[r[i]]=!0;return e?function(a){return n[a.toLowerCase()]}:function(a){return n[a]}}ut("slot,component",!0);var zo=ut("key,ref,slot,slot-scope,is");function kt(t,e){var n=t.length;if(n){if(e===t[n-1]){t.length=n-1;return}var r=t.indexOf(e);if(r>-1)return t.splice(r,1)}}var Wo=Object.prototype.hasOwnProperty;function X(t,e){return Wo.call(t,e)}function Kt(t){var e=Object.create(null);return function(r){var i=e[r];return i||(e[r]=t(r))}}var Go=/-(\w)/g,Wt=Kt(function(t){return t.replace(Go,function(e,n){return n?n.toUpperCase():""})}),qo=Kt(function(t){return t.charAt(0).toUpperCase()+t.slice(1)}),Jo=/\B([A-Z])/g,$e=Kt(function(t){return t.replace(Jo,"-$1").toLowerCase()});function Ko(t,e){function n(r){var i=arguments.length;return i?i>1?t.apply(e,arguments):t.call(e,r):t.call(e)}return n._length=t.length,n}function Yo(t,e){return t.bind(e)}var ia=Function.prototype.bind?Yo:Ko;function jn(t,e){e=e||0;for(var n=t.length-e,r=new Array(n);n--;)r[n]=t[n+e];return r}function N(t,e){for(var n in e)t[n]=e[n];return t}function aa(t){for(var e={},n=0;n<t.length;n++)t[n]&&N(e,t[n]);return e}function H(t,e,n){}var Te=function(t,e,n){return!1},oa=function(t){return t};function Gt(t,e){if(t===e)return!0;var n=K(t),r=K(e);if(n&&r)try{var i=Array.isArray(t),a=Array.isArray(e);if(i&&a)return t.length===e.length&&t.every(function(c,u){return Gt(c,e[u])});if(t instanceof Date&&e instanceof Date)return t.getTime()===e.getTime();if(!i&&!a){var o=Object.keys(t),s=Object.keys(e);return o.length===s.length&&o.every(function(c){return Gt(t[c],e[c])})}else return!1}catch(c){return!1}else return!n&&!r?String(t)===String(e):!1}function sa(t,e){for(var n=0;n<t.length;n++)if(Gt(t[n],e))return n;return-1}function Qe(t){var e=!1;return function(){e||(e=!0,t.apply(this,arguments))}}function Ln(t,e){return t===e?t===0&&1/t!==1/e:t===t||e===e}var Br="data-server-rendered",mn=["component","directive","filter"],ca=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch","renderTracked","renderTriggered"],at={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:Te,isReservedAttr:Te,isUnknownElement:Te,getTagNamespace:H,parsePlatformTagName:oa,mustUseProp:Te,async:!0,_lifecycleHooks:ca},Xo=/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;function ua(t){var e=(t+"").charCodeAt(0);return e===36||e===95}function Z(t,e,n,r){Object.defineProperty(t,e,{value:n,enumerable:!!r,writable:!0,configurable:!0})}var Vo=new RegExp("[^".concat(Xo.source,".$_\\d]"));function Qo(t){if(!Vo.test(t)){var e=t.split(".");return function(n){for(var r=0;r<e.length;r++){if(!n)return;n=n[e[r]]}return n}}}var Zo="__proto__"in{},rt=typeof window<"u",Y=rt&&window.navigator.userAgent.toLowerCase(),ce=Y&&/msie|trident/.test(Y),ue=Y&&Y.indexOf("msie 9.0")>0,lr=Y&&Y.indexOf("edge/")>0;Y&&Y.indexOf("android")>0;var ts=Y&&/iphone|ipad|ipod|ios/.test(Y);Y&&/chrome\/\d+/.test(Y);Y&&/phantomjs/.test(Y);var zr=Y&&Y.match(/firefox\/(\d+)/),Dn={}.watch,fa=!1;if(rt)try{var Wr={};Object.defineProperty(Wr,"passive",{get:function(){fa=!0}}),window.addEventListener("test-passive",null,Wr)}catch(t){}var Ie,Rt=function(){return Ie===void 0&&(!rt&&typeof global<"u"?Ie=global.process&&global.process.env.VUE_ENV==="server":Ie=!1),Ie},Ze=rt&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function ae(t){return typeof t=="function"&&/native code/.test(t.toString())}var Ee=typeof Symbol<"u"&&ae(Symbol)&&typeof Reflect<"u"&&ae(Reflect.ownKeys),ye;typeof Set<"u"&&ae(Set)?ye=Set:ye=function(){function t(){this.set=Object.create(null)}return t.prototype.has=function(e){return this.set[e]===!0},t.prototype.add=function(e){this.set[e]=!0},t.prototype.clear=function(){this.set=Object.create(null)},t}();var bt=null;function Pt(t){t===void 0&&(t=null),t||bt&&bt._scope.off(),bt=t,t&&t._scope.on()}var nt=function(){function t(e,n,r,i,a,o,s,c){this.tag=e,this.data=n,this.children=r,this.text=i,this.elm=a,this.ns=void 0,this.context=o,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=n&&n.key,this.componentOptions=s,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=c,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1}return Object.defineProperty(t.prototype,"child",{get:function(){return this.componentInstance},enumerable:!1,configurable:!0}),t}(),Ut=function(t){t===void 0&&(t="");var e=new nt;return e.text=t,e.isComment=!0,e};function ee(t){return new nt(void 0,void 0,void 0,String(t))}function Nn(t){var e=new nt(t.tag,t.data,t.children&&t.children.slice(),t.text,t.elm,t.context,t.componentOptions,t.asyncFactory);return e.ns=t.ns,e.isStatic=t.isStatic,e.key=t.key,e.isComment=t.isComment,e.fnContext=t.fnContext,e.fnOptions=t.fnOptions,e.fnScopeId=t.fnScopeId,e.asyncMeta=t.asyncMeta,e.isCloned=!0,e}var es=0,Fe=[],ns=function(){for(var t=0;t<Fe.length;t++){var e=Fe[t];e.subs=e.subs.filter(function(n){return n}),e._pending=!1}Fe.length=0},_t=function(){function t(){this._pending=!1,this.id=es++,this.subs=[]}return t.prototype.addSub=function(e){this.subs.push(e)},t.prototype.removeSub=function(e){this.subs[this.subs.indexOf(e)]=null,this._pending||(this._pending=!0,Fe.push(this))},t.prototype.depend=function(e){t.target&&t.target.addDep(this)},t.prototype.notify=function(e){for(var n=this.subs.filter(function(o){return o}),r=0,i=n.length;r<i;r++){var a=n[r];a.update()}},t}();_t.target=null;var Ue=[];function fe(t){Ue.push(t),_t.target=t}function le(){Ue.pop(),_t.target=Ue[Ue.length-1]}var la=Array.prototype,tn=Object.create(la),rs=["push","pop","shift","unshift","splice","sort","reverse"];rs.forEach(function(t){var e=la[t];Z(tn,t,function(){for(var r=[],i=0;i<arguments.length;i++)r[i]=arguments[i];var a=e.apply(this,r),o=this.__ob__,s;switch(t){case"push":case"unshift":s=r;break;case"splice":s=r.slice(2);break}return s&&o.observeArray(s),o.dep.notify(),a})});var Gr=Object.getOwnPropertyNames(tn),pa={},pr=!0;function Tt(t){pr=t}var is={notify:H,depend:H,addSub:H,removeSub:H},qr=function(){function t(e,n,r){if(n===void 0&&(n=!1),r===void 0&&(r=!1),this.value=e,this.shallow=n,this.mock=r,this.dep=r?is:new _t,this.vmCount=0,Z(e,"__ob__",this),P(e)){if(!r)if(Zo)e.__proto__=tn;else for(var i=0,a=Gr.length;i<a;i++){var o=Gr[i];Z(e,o,tn[o])}n||this.observeArray(e)}else for(var s=Object.keys(e),i=0;i<s.length;i++){var o=s[i];It(e,o,pa,void 0,n,r)}}return t.prototype.observeArray=function(e){for(var n=0,r=e.length;n<r;n++)yt(e[n],!1,this.mock)},t}();function yt(t,e,n){if(t&&X(t,"__ob__")&&t.__ob__ instanceof qr)return t.__ob__;if(pr&&(n||!Rt())&&(P(t)||et(t))&&Object.isExtensible(t)&&!t.__v_skip&&!tt(t)&&!(t instanceof nt))return new qr(t,e,n)}function It(t,e,n,r,i,a){var o=new _t,s=Object.getOwnPropertyDescriptor(t,e);if(!(s&&s.configurable===!1)){var c=s&&s.get,u=s&&s.set;(!c||u)&&(n===pa||arguments.length===2)&&(n=t[e]);var f=!i&&yt(n,!1,a);return Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){var v=c?c.call(t):n;return _t.target&&(o.depend(),f&&(f.dep.depend(),P(v)&&ha(v))),tt(v)&&!i?v.value:v},set:function(v){var m=c?c.call(t):n;if(!!Ln(m,v)){if(u)u.call(t,v);else{if(c)return;if(!i&&tt(m)&&!tt(v)){m.value=v;return}else n=v}f=!i&&yt(v,!1,a),o.notify()}}}),o}}function dr(t,e,n){if(!bn(t)){var r=t.__ob__;return P(t)&&ra(e)?(t.length=Math.max(t.length,e),t.splice(e,1,n),r&&!r.shallow&&r.mock&&yt(n,!1,!0),n):e in t&&!(e in Object.prototype)?(t[e]=n,n):t._isVue||r&&r.vmCount?n:r?(It(r.value,e,n,void 0,r.shallow,r.mock),r.dep.notify(),n):(t[e]=n,n)}}function da(t,e){if(P(t)&&ra(e)){t.splice(e,1);return}var n=t.__ob__;t._isVue||n&&n.vmCount||bn(t)||!X(t,e)||(delete t[e],n&&n.dep.notify())}function ha(t){for(var e=void 0,n=0,r=t.length;n<r;n++)e=t[n],e&&e.__ob__&&e.__ob__.dep.depend(),P(e)&&ha(e)}function va(t){return as(t,!0),Z(t,"__v_isShallow",!0),t}function as(t,e){bn(t)||yt(t,e,Rt())}function He(t){return bn(t)?He(t.__v_raw):!!(t&&t.__ob__)}function Jr(t){return!!(t&&t.__v_isShallow)}function bn(t){return!!(t&&t.__v_isReadonly)}function _n(t){var e=t&&t.__v_raw;return e?_n(e):t}function ga(t){return Object.isExtensible(t)&&Z(t,"__v_skip",!0),t}var ma="__v_isRef";function tt(t){return!!(t&&t.__v_isRef===!0)}function os(t){return ss(t,!1)}function ss(t,e){if(tt(t))return t;var n={};return Z(n,ma,!0),Z(n,"__v_isShallow",e),Z(n,"dep",It(n,"value",t,null,e,Rt())),n}function cs(t){return tt(t)?t.value:t}function Mn(t,e,n){Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:function(){var r=e[n];if(tt(r))return r.value;var i=r&&r.__ob__;return i&&i.dep.depend(),r},set:function(r){var i=e[n];tt(i)&&!tt(r)?i.value=r:e[n]=r}})}function Ip(t,e){var n,r,i=D(t);i?(n=t,r=H):(n=t.get,r=t.set);var a=Rt()?null:new Ae(bt,n,H,{lazy:!0}),o={effect:a,get value(){return a?(a.dirty&&a.evaluate(),_t.target&&a.depend(),a.value):n()},set value(s){r(s)}};return Z(o,ma,!0),Z(o,"__v_isReadonly",i),o}var yn="watcher",Kr="".concat(yn," callback"),Yr="".concat(yn," getter"),us="".concat(yn," cleanup"),Xr={};function fs(t,e,n){return ls(t,e,n)}function ls(t,e,n){var r=n===void 0?Q:n,i=r.immediate,a=r.deep,o=r.flush,s=o===void 0?"pre":o;r.onTrack,r.onTrigger;var c=bt,u=function(x,A,T){return T===void 0&&(T=null),wt(x,null,T,c,A)},f,h=!1,v=!1;if(tt(t)?(f=function(){return t.value},h=Jr(t)):He(t)?(f=function(){return t.__ob__.dep.depend(),t},a=!0):P(t)?(v=!0,h=t.some(function(x){return He(x)||Jr(x)}),f=function(){return t.map(function(x){if(tt(x))return x.value;if(He(x))return oe(x);if(D(x))return u(x,Yr)})}):D(t)?e?f=function(){return u(t,Yr)}:f=function(){if(!(c&&c._isDestroyed))return _&&_(),u(t,yn,[y])}:f=H,e&&a){var m=f;f=function(){return oe(m())}}var _,y=function(x){_=b.onStop=function(){u(x,us)}};if(Rt())return y=H,e?i&&u(e,Kr,[f(),v?[]:void 0,y]):f(),H;var b=new Ae(bt,f,H,{lazy:!0});b.noRecurse=!e;var C=v?[]:Xr;return b.run=function(){if(!!b.active)if(e){var x=b.get();(a||h||(v?x.some(function(A,T){return Ln(A,C[T])}):Ln(x,C)))&&(_&&_(),u(e,Kr,[x,C===Xr?void 0:C,y]),C=x)}else b.get()},s==="sync"?b.update=b.run:s==="post"?(b.post=!0,b.update=function(){return qn(b)}):b.update=function(){if(c&&c===bt&&!c._isMounted){var x=c._preWatchers||(c._preWatchers=[]);x.indexOf(b)<0&&x.push(b)}else qn(b)},e?i?b.run():C=b.get():s==="post"&&c?c.$once("hook:mounted",function(){return b.get()}):b.get(),function(){b.teardown()}}var V,ba=function(){function t(e){e===void 0&&(e=!1),this.detached=e,this.active=!0,this.effects=[],this.cleanups=[],this.parent=V,!e&&V&&(this.index=(V.scopes||(V.scopes=[])).push(this)-1)}return t.prototype.run=function(e){if(this.active){var n=V;try{return V=this,e()}finally{V=n}}},t.prototype.on=function(){V=this},t.prototype.off=function(){V=this.parent},t.prototype.stop=function(e){if(this.active){var n=void 0,r=void 0;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].teardown();for(n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.scopes)for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);if(!this.detached&&this.parent&&!e){var i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0,this.active=!1}},t}();function ps(t){return new ba(t)}function ds(t,e){e===void 0&&(e=V),e&&e.active&&e.effects.push(t)}function hs(){return V}function vs(t){var e=t._provided,n=t.$parent&&t.$parent._provided;return n===e?t._provided=Object.create(n):e}var Vr=Kt(function(t){var e=t.charAt(0)==="&";t=e?t.slice(1):t;var n=t.charAt(0)==="~";t=n?t.slice(1):t;var r=t.charAt(0)==="!";return t=r?t.slice(1):t,{name:t,once:n,capture:r,passive:e}});function Fn(t,e){function n(){var r=n.fns;if(P(r))for(var i=r.slice(),a=0;a<i.length;a++)wt(i[a],null,arguments,e,"v-on handler");else return wt(r,null,arguments,e,"v-on handler")}return n.fns=t,n}function _a(t,e,n,r,i,a){var o,s,c,u;for(o in t)s=t[o],c=e[o],u=Vr(o),O(s)||(O(c)?(O(s.fns)&&(s=t[o]=Fn(s,a)),z(u.once)&&(s=t[o]=i(u.name,s,u.capture)),n(u.name,s,u.capture,u.passive,u.params)):s!==c&&(c.fns=s,t[o]=c));for(o in e)O(t[o])&&(u=Vr(o),r(u.name,e[o],u.capture))}function xt(t,e,n){t instanceof nt&&(t=t.data.hook||(t.data.hook={}));var r,i=t[e];function a(){n.apply(this,arguments),kt(r.fns,a)}O(i)?r=Fn([a]):d(i.fns)&&z(i.merged)?(r=i,r.fns.push(a)):r=Fn([i,a]),r.merged=!0,t[e]=r}function gs(t,e,n){var r=e.options.props;if(!O(r)){var i={},a=t.attrs,o=t.props;if(d(a)||d(o))for(var s in r){var c=$e(s);Qr(i,o,s,c,!0)||Qr(i,a,s,c,!1)}return i}}function Qr(t,e,n,r,i){if(d(e)){if(X(e,n))return t[n]=e[n],i||delete e[n],!0;if(X(e,r))return t[n]=e[r],i||delete e[r],!0}return!1}function ms(t){for(var e=0;e<t.length;e++)if(P(t[e]))return Array.prototype.concat.apply([],t);return t}function hr(t){return Oe(t)?[ee(t)]:P(t)?ya(t):void 0}function de(t){return d(t)&&d(t.text)&&Uo(t.isComment)}function ya(t,e){var n=[],r,i,a,o;for(r=0;r<t.length;r++)i=t[r],!(O(i)||typeof i=="boolean")&&(a=n.length-1,o=n[a],P(i)?i.length>0&&(i=ya(i,"".concat(e||"","_").concat(r)),de(i[0])&&de(o)&&(n[a]=ee(o.text+i[0].text),i.shift()),n.push.apply(n,i)):Oe(i)?de(o)?n[a]=ee(o.text+i):i!==""&&n.push(ee(i)):de(i)&&de(o)?n[a]=ee(o.text+i.text):(z(t._isVList)&&d(i.tag)&&O(i.key)&&d(e)&&(i.key="__vlist".concat(e,"_").concat(r,"__")),n.push(i)));return n}function bs(t,e){var n=null,r,i,a,o;if(P(t)||typeof t=="string")for(n=new Array(t.length),r=0,i=t.length;r<i;r++)n[r]=e(t[r],r);else if(typeof t=="number")for(n=new Array(t),r=0;r<t;r++)n[r]=e(r+1,r);else if(K(t))if(Ee&&t[Symbol.iterator]){n=[];for(var s=t[Symbol.iterator](),c=s.next();!c.done;)n.push(e(c.value,n.length)),c=s.next()}else for(a=Object.keys(t),n=new Array(a.length),r=0,i=a.length;r<i;r++)o=a[r],n[r]=e(t[o],o,r);return d(n)||(n=[]),n._isVList=!0,n}function _s(t,e,n,r){var i=this.$scopedSlots[t],a;i?(n=n||{},r&&(n=N(N({},r),n)),a=i(n)||(D(e)?e():e)):a=this.$slots[t]||(D(e)?e():e);var o=n&&n.slot;return o?this.$createElement("template",{slot:o},a):a}function ys(t){return on(this.$options,"filters",t)||oa}function Zr(t,e){return P(t)?t.indexOf(e)===-1:t!==e}function ws(t,e,n,r,i){var a=at.keyCodes[e]||n;return i&&r&&!at.keyCodes[e]?Zr(i,r):a?Zr(a,t):r?$e(r)!==e:t===void 0}function Cs(t,e,n,r,i){if(n&&K(n)){P(n)&&(n=aa(n));var a=void 0,o=function(c){if(c==="class"||c==="style"||zo(c))a=t;else{var u=t.attrs&&t.attrs.type;a=r||at.mustUseProp(e,u,c)?t.domProps||(t.domProps={}):t.attrs||(t.attrs={})}var f=Wt(c),h=$e(c);if(!(f in a)&&!(h in a)&&(a[c]=n[c],i)){var v=t.on||(t.on={});v["update:".concat(c)]=function(m){n[c]=m}}};for(var s in n)o(s)}return t}function xs(t,e){var n=this._staticTrees||(this._staticTrees=[]),r=n[t];return r&&!e||(r=n[t]=this.$options.staticRenderFns[t].call(this._renderProxy,this._c,this),wa(r,"__static__".concat(t),!1)),r}function Ss(t,e,n){return wa(t,"__once__".concat(e).concat(n?"_".concat(n):""),!0),t}function wa(t,e,n){if(P(t))for(var r=0;r<t.length;r++)t[r]&&typeof t[r]!="string"&&ti(t[r],"".concat(e,"_").concat(r),n);else ti(t,e,n)}function ti(t,e,n){t.isStatic=!0,t.key=e,t.isOnce=n}function Os(t,e){if(e&&et(e)){var n=t.on=t.on?N({},t.on):{};for(var r in e){var i=n[r],a=e[r];n[r]=i?[].concat(i,a):a}}return t}function Ca(t,e,n,r){e=e||{$stable:!n};for(var i=0;i<t.length;i++){var a=t[i];P(a)?Ca(a,e,n):a&&(a.proxy&&(a.fn.proxy=!0),e[a.key]=a.fn)}return r&&(e.$key=r),e}function $s(t,e){for(var n=0;n<e.length;n+=2){var r=e[n];typeof r=="string"&&r&&(t[e[n]]=e[n+1])}return t}function Es(t,e){return typeof t=="string"?e+t:t}function xa(t){t._o=Ss,t._n=_e,t._s=Bo,t._l=bs,t._t=_s,t._q=Gt,t._i=sa,t._m=xs,t._f=ys,t._k=ws,t._b=Cs,t._v=ee,t._e=Ut,t._u=Ca,t._g=Os,t._d=$s,t._p=Es}function vr(t,e){if(!t||!t.length)return{};for(var n={},r=0,i=t.length;r<i;r++){var a=t[r],o=a.data;if(o&&o.attrs&&o.attrs.slot&&delete o.attrs.slot,(a.context===e||a.fnContext===e)&&o&&o.slot!=null){var s=o.slot,c=n[s]||(n[s]=[]);a.tag==="template"?c.push.apply(c,a.children||[]):c.push(a)}else(n.default||(n.default=[])).push(a)}for(var u in n)n[u].every(As)&&delete n[u];return n}function As(t){return t.isComment&&!t.asyncFactory||t.text===" "}function we(t){return t.isComment&&t.asyncFactory}function be(t,e,n,r){var i,a=Object.keys(n).length>0,o=e?!!e.$stable:!a,s=e&&e.$key;if(!e)i={};else{if(e._normalized)return e._normalized;if(o&&r&&r!==Q&&s===r.$key&&!a&&!r.$hasNormal)return r;i={};for(var c in e)e[c]&&c[0]!=="$"&&(i[c]=Ps(t,n,c,e[c]))}for(var u in n)u in i||(i[u]=Ts(n,u));return e&&Object.isExtensible(e)&&(e._normalized=i),Z(i,"$stable",o),Z(i,"$key",s),Z(i,"$hasNormal",a),i}function Ps(t,e,n,r){var i=function(){var a=bt;Pt(t);var o=arguments.length?r.apply(null,arguments):r({});o=o&&typeof o=="object"&&!P(o)?[o]:hr(o);var s=o&&o[0];return Pt(a),o&&(!s||o.length===1&&s.isComment&&!we(s))?void 0:o};return r.proxy&&Object.defineProperty(e,n,{get:i,enumerable:!0,configurable:!0}),i}function Ts(t,e){return function(){return t[e]}}function Is(t){var e=t.$options,n=e.setup;if(n){var r=t._setupContext=ks(t);Pt(t),fe();var i=wt(n,null,[t._props||va({}),r],t,"setup");if(le(),Pt(),D(i))e.render=i;else if(K(i))if(t._setupState=i,i.__sfc){var o=t._setupProxy={};for(var a in i)a!=="__sfc"&&Mn(o,i,a)}else for(var a in i)ua(a)||Mn(t,i,a)}}function ks(t){return{get attrs(){if(!t._attrsProxy){var e=t._attrsProxy={};Z(e,"_v_attr_proxy",!0),en(e,t.$attrs,Q,t,"$attrs")}return t._attrsProxy},get listeners(){if(!t._listenersProxy){var e=t._listenersProxy={};en(e,t.$listeners,Q,t,"$listeners")}return t._listenersProxy},get slots(){return js(t)},emit:ia(t.$emit,t),expose:function(e){e&&Object.keys(e).forEach(function(n){return Mn(t,e,n)})}}}function en(t,e,n,r,i){var a=!1;for(var o in e)o in t?e[o]!==n[o]&&(a=!0):(a=!0,Rs(t,o,r,i));for(var o in t)o in e||(a=!0,delete t[o]);return a}function Rs(t,e,n,r){Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){return n[r][e]}})}function js(t){return t._slotsProxy||Sa(t._slotsProxy={},t.$scopedSlots),t._slotsProxy}function Sa(t,e){for(var n in e)t[n]=e[n];for(var n in t)n in e||delete t[n]}function Ls(t){t._vnode=null,t._staticTrees=null;var e=t.$options,n=t.$vnode=e._parentVnode,r=n&&n.context;t.$slots=vr(e._renderChildren,r),t.$scopedSlots=n?be(t.$parent,n.data.scopedSlots,t.$slots):Q,t._c=function(a,o,s,c){return nn(t,a,o,s,c,!1)},t.$createElement=function(a,o,s,c){return nn(t,a,o,s,c,!0)};var i=n&&n.data;It(t,"$attrs",i&&i.attrs||Q,null,!0),It(t,"$listeners",e._parentListeners||Q,null,!0)}var Un=null;function Ds(t){xa(t.prototype),t.prototype.$nextTick=function(e){return gr(e,this)},t.prototype._render=function(){var e=this,n=e.$options,r=n.render,i=n._parentVnode;i&&e._isMounted&&(e.$scopedSlots=be(e.$parent,i.data.scopedSlots,e.$slots,e.$scopedSlots),e._slotsProxy&&Sa(e._slotsProxy,e.$scopedSlots)),e.$vnode=i;var a;try{Pt(e),Un=e,a=r.call(e._renderProxy,e.$createElement)}catch(o){qt(o,e,"render"),a=e._vnode}finally{Un=null,Pt()}return P(a)&&a.length===1&&(a=a[0]),a instanceof nt||(a=Ut()),a.parent=i,a}}function On(t,e){return(t.__esModule||Ee&&t[Symbol.toStringTag]==="Module")&&(t=t.default),K(t)?e.extend(t):t}function Ns(t,e,n,r,i){var a=Ut();return a.asyncFactory=t,a.asyncMeta={data:e,context:n,children:r,tag:i},a}function Ms(t,e){if(z(t.error)&&d(t.errorComp))return t.errorComp;if(d(t.resolved))return t.resolved;var n=Un;if(n&&d(t.owners)&&t.owners.indexOf(n)===-1&&t.owners.push(n),z(t.loading)&&d(t.loadingComp))return t.loadingComp;if(n&&!d(t.owners)){var r=t.owners=[n],i=!0,a=null,o=null;n.$on("hook:destroyed",function(){return kt(r,n)});var s=function(h){for(var v=0,m=r.length;v<m;v++)r[v].$forceUpdate();h&&(r.length=0,a!==null&&(clearTimeout(a),a=null),o!==null&&(clearTimeout(o),o=null))},c=Qe(function(h){t.resolved=On(h,e),i?r.length=0:s(!0)}),u=Qe(function(h){d(t.errorComp)&&(t.error=!0,s(!0))}),f=t(c,u);return K(f)&&(Rn(f)?O(t.resolved)&&f.then(c,u):Rn(f.component)&&(f.component.then(c,u),d(f.error)&&(t.errorComp=On(f.error,e)),d(f.loading)&&(t.loadingComp=On(f.loading,e),f.delay===0?t.loading=!0:a=setTimeout(function(){a=null,O(t.resolved)&&O(t.error)&&(t.loading=!0,s(!1))},f.delay||200)),d(f.timeout)&&(o=setTimeout(function(){o=null,O(t.resolved)&&u(null)},f.timeout)))),i=!1,t.loading?t.loadingComp:t.resolved}}function Oa(t){if(P(t))for(var e=0;e<t.length;e++){var n=t[e];if(d(n)&&(d(n.componentOptions)||we(n)))return n}}var Fs=1,$a=2;function nn(t,e,n,r,i,a){return(P(n)||Oe(n))&&(i=r,r=n,n=void 0),z(a)&&(i=$a),Us(t,e,n,r,i)}function Us(t,e,n,r,i){if(d(n)&&d(n.__ob__)||(d(n)&&d(n.is)&&(e=n.is),!e))return Ut();P(r)&&D(r[0])&&(n=n||{},n.scopedSlots={default:r[0]},r.length=0),i===$a?r=hr(r):i===Fs&&(r=ms(r));var a,o;if(typeof e=="string"){var s=void 0;o=t.$vnode&&t.$vnode.ns||at.getTagNamespace(e),at.isReservedTag(e)?a=new nt(at.parsePlatformTagName(e),n,r,void 0,void 0,t):(!n||!n.pre)&&d(s=on(t.$options,"components",e))?a=ci(s,n,t,r,e):a=new nt(e,n,r,void 0,void 0,t)}else a=ci(e,n,t,r);return P(a)?a:d(a)?(d(o)&&Ea(a,o),d(n)&&Hs(n),a):Ut()}function Ea(t,e,n){if(t.ns=e,t.tag==="foreignObject"&&(e=void 0,n=!0),d(t.children))for(var r=0,i=t.children.length;r<i;r++){var a=t.children[r];d(a.tag)&&(O(a.ns)||z(n)&&a.tag!=="svg")&&Ea(a,e,n)}}function Hs(t){K(t.style)&&oe(t.style),K(t.class)&&oe(t.class)}function qt(t,e,n){fe();try{if(e)for(var r=e;r=r.$parent;){var i=r.$options.errorCaptured;if(i)for(var a=0;a<i.length;a++)try{var o=i[a].call(r,t,e,n)===!1;if(o)return}catch(s){ei(s,r,"errorCaptured hook")}}ei(t,e,n)}finally{le()}}function wt(t,e,n,r,i){var a;try{a=n?t.apply(e,n):t.call(e),a&&!a._isVue&&Rn(a)&&!a._handled&&(a.catch(function(o){return qt(o,r,i+" (Promise/async)")}),a._handled=!0)}catch(o){qt(o,r,i)}return a}function ei(t,e,n){if(at.errorHandler)try{return at.errorHandler.call(null,t,e,n)}catch(r){r!==t&&ni(r)}ni(t)}function ni(t,e,n){if(rt&&typeof console<"u")console.error(t);else throw t}var Hn=!1,Bn=[],zn=!1;function ke(){zn=!1;var t=Bn.slice(0);Bn.length=0;for(var e=0;e<t.length;e++)t[e]()}var ge;if(typeof Promise<"u"&&ae(Promise)){var Bs=Promise.resolve();ge=function(){Bs.then(ke),ts&&setTimeout(H)},Hn=!0}else if(!ce&&typeof MutationObserver<"u"&&(ae(MutationObserver)||MutationObserver.toString()==="[object MutationObserverConstructor]")){var Re=1,zs=new MutationObserver(ke),ri=document.createTextNode(String(Re));zs.observe(ri,{characterData:!0}),ge=function(){Re=(Re+1)%2,ri.data=String(Re)},Hn=!0}else typeof setImmediate<"u"&&ae(setImmediate)?ge=function(){setImmediate(ke)}:ge=function(){setTimeout(ke,0)};function gr(t,e){var n;if(Bn.push(function(){if(t)try{t.call(e)}catch(r){qt(r,e,"nextTick")}else n&&n(e)}),zn||(zn=!0,ge()),!t&&typeof Promise<"u")return new Promise(function(r){n=r})}var Ws="2.7.15";function kp(t){return t}var ii=new ye;function oe(t){return Be(t,ii),ii.clear(),t}function Be(t,e){var n,r,i=P(t);if(!(!i&&!K(t)||t.__v_skip||Object.isFrozen(t)||t instanceof nt)){if(t.__ob__){var a=t.__ob__.dep.id;if(e.has(a))return;e.add(a)}if(i)for(n=t.length;n--;)Be(t[n],e);else if(tt(t))Be(t.value,e);else for(r=Object.keys(t),n=r.length;n--;)Be(t[r[n]],e)}}var Gs=0,Ae=function(){function t(e,n,r,i,a){ds(this,V&&!V._vm?V:e?e._scope:void 0),(this.vm=e)&&a&&(e._watcher=this),i?(this.deep=!!i.deep,this.user=!!i.user,this.lazy=!!i.lazy,this.sync=!!i.sync,this.before=i.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=r,this.id=++Gs,this.active=!0,this.post=!1,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new ye,this.newDepIds=new ye,this.expression="",D(n)?this.getter=n:(this.getter=Qo(n),this.getter||(this.getter=H)),this.value=this.lazy?void 0:this.get()}return t.prototype.get=function(){fe(this);var e,n=this.vm;try{e=this.getter.call(n,n)}catch(r){if(this.user)qt(r,n,'getter for watcher "'.concat(this.expression,'"'));else throw r}finally{this.deep&&oe(e),le(),this.cleanupDeps()}return e},t.prototype.addDep=function(e){var n=e.id;this.newDepIds.has(n)||(this.newDepIds.add(n),this.newDeps.push(e),this.depIds.has(n)||e.addSub(this))},t.prototype.cleanupDeps=function(){for(var e=this.deps.length;e--;){var n=this.deps[e];this.newDepIds.has(n.id)||n.removeSub(this)}var r=this.depIds;this.depIds=this.newDepIds,this.newDepIds=r,this.newDepIds.clear(),r=this.deps,this.deps=this.newDeps,this.newDeps=r,this.newDeps.length=0},t.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():qn(this)},t.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||K(e)||this.deep){var n=this.value;if(this.value=e,this.user){var r='callback for watcher "'.concat(this.expression,'"');wt(this.cb,this.vm,[e,n],this.vm,r)}else this.cb.call(this.vm,e,n)}}},t.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},t.prototype.depend=function(){for(var e=this.deps.length;e--;)this.deps[e].depend()},t.prototype.teardown=function(){if(this.vm&&!this.vm._isBeingDestroyed&&kt(this.vm._scope.effects,this),this.active){for(var e=this.deps.length;e--;)this.deps[e].removeSub(this);this.active=!1,this.onStop&&this.onStop()}},t}();function qs(t){t._events=Object.create(null),t._hasHookEvent=!1;var e=t.$options._parentListeners;e&&Aa(t,e)}var Ce;function Js(t,e){Ce.$on(t,e)}function Ks(t,e){Ce.$off(t,e)}function Ys(t,e){var n=Ce;return function r(){var i=e.apply(null,arguments);i!==null&&n.$off(t,r)}}function Aa(t,e,n){Ce=t,_a(e,n||{},Js,Ks,Ys,t),Ce=void 0}function Xs(t){var e=/^hook:/;t.prototype.$on=function(n,r){var i=this;if(P(n))for(var a=0,o=n.length;a<o;a++)i.$on(n[a],r);else(i._events[n]||(i._events[n]=[])).push(r),e.test(n)&&(i._hasHookEvent=!0);return i},t.prototype.$once=function(n,r){var i=this;function a(){i.$off(n,a),r.apply(i,arguments)}return a.fn=r,i.$on(n,a),i},t.prototype.$off=function(n,r){var i=this;if(!arguments.length)return i._events=Object.create(null),i;if(P(n)){for(var a=0,o=n.length;a<o;a++)i.$off(n[a],r);return i}var s=i._events[n];if(!s)return i;if(!r)return i._events[n]=null,i;for(var c,u=s.length;u--;)if(c=s[u],c===r||c.fn===r){s.splice(u,1);break}return i},t.prototype.$emit=function(n){var r=this,i=r._events[n];if(i){i=i.length>1?jn(i):i;for(var a=jn(arguments,1),o='event handler for "'.concat(n,'"'),s=0,c=i.length;s<c;s++)wt(i[s],r,a,r,o)}return r}}var Ht=null;function Pa(t){var e=Ht;return Ht=t,function(){Ht=e}}function Vs(t){var e=t.$options,n=e.parent;if(n&&!e.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(t)}t.$parent=n,t.$root=n?n.$root:t,t.$children=[],t.$refs={},t._provided=n?n._provided:Object.create(null),t._watcher=null,t._inactive=null,t._directInactive=!1,t._isMounted=!1,t._isDestroyed=!1,t._isBeingDestroyed=!1}function Qs(t){t.prototype._update=function(e,n){var r=this,i=r.$el,a=r._vnode,o=Pa(r);r._vnode=e,a?r.$el=r.__patch__(a,e):r.$el=r.__patch__(r.$el,e,n,!1),o(),i&&(i.__vue__=null),r.$el&&(r.$el.__vue__=r);for(var s=r;s&&s.$vnode&&s.$parent&&s.$vnode===s.$parent._vnode;)s.$parent.$el=s.$el,s=s.$parent},t.prototype.$forceUpdate=function(){var e=this;e._watcher&&e._watcher.update()},t.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){ct(e,"beforeDestroy"),e._isBeingDestroyed=!0;var n=e.$parent;n&&!n._isBeingDestroyed&&!e.$options.abstract&&kt(n.$children,e),e._scope.stop(),e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),ct(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}function Zs(t,e,n){t.$el=e,t.$options.render||(t.$options.render=Ut),ct(t,"beforeMount");var r;r=function(){t._update(t._render(),n)};var i={before:function(){t._isMounted&&!t._isDestroyed&&ct(t,"beforeUpdate")}};new Ae(t,r,H,i,!0),n=!1;var a=t._preWatchers;if(a)for(var o=0;o<a.length;o++)a[o].run();return t.$vnode==null&&(t._isMounted=!0,ct(t,"mounted")),t}function tc(t,e,n,r,i){var a=r.data.scopedSlots,o=t.$scopedSlots,s=!!(a&&!a.$stable||o!==Q&&!o.$stable||a&&t.$scopedSlots.$key!==a.$key||!a&&t.$scopedSlots.$key),c=!!(i||t.$options._renderChildren||s),u=t.$vnode;t.$options._parentVnode=r,t.$vnode=r,t._vnode&&(t._vnode.parent=r),t.$options._renderChildren=i;var f=r.data.attrs||Q;t._attrsProxy&&en(t._attrsProxy,f,u.data&&u.data.attrs||Q,t,"$attrs")&&(c=!0),t.$attrs=f,n=n||Q;var h=t.$options._parentListeners;if(t._listenersProxy&&en(t._listenersProxy,n,h||Q,t,"$listeners"),t.$listeners=t.$options._parentListeners=n,Aa(t,n,h),e&&t.$options.props){Tt(!1);for(var v=t._props,m=t.$options._propKeys||[],_=0;_<m.length;_++){var y=m[_],b=t.$options.props;v[y]=Cr(y,b,e,t)}Tt(!0),t.$options.propsData=e}c&&(t.$slots=vr(i,r.context),t.$forceUpdate())}function Ta(t){for(;t&&(t=t.$parent);)if(t._inactive)return!0;return!1}function mr(t,e){if(e){if(t._directInactive=!1,Ta(t))return}else if(t._directInactive)return;if(t._inactive||t._inactive===null){t._inactive=!1;for(var n=0;n<t.$children.length;n++)mr(t.$children[n]);ct(t,"activated")}}function Ia(t,e){if(!(e&&(t._directInactive=!0,Ta(t)))&&!t._inactive){t._inactive=!0;for(var n=0;n<t.$children.length;n++)Ia(t.$children[n]);ct(t,"deactivated")}}function ct(t,e,n,r){r===void 0&&(r=!0),fe();var i=bt,a=hs();r&&Pt(t);var o=t.$options[e],s="".concat(e," hook");if(o)for(var c=0,u=o.length;c<u;c++)wt(o[c],t,n||null,t,s);t._hasHookEvent&&t.$emit("hook:"+e),r&&(Pt(i),a&&a.on()),le()}var gt=[],br=[],rn={},Wn=!1,_r=!1,ne=0;function ec(){ne=gt.length=br.length=0,rn={},Wn=_r=!1}var ka=0,Gn=Date.now;if(rt&&!ce){var $n=window.performance;$n&&typeof $n.now=="function"&&Gn()>document.createEvent("Event").timeStamp&&(Gn=function(){return $n.now()})}var nc=function(t,e){if(t.post){if(!e.post)return 1}else if(e.post)return-1;return t.id-e.id};function rc(){ka=Gn(),_r=!0;var t,e;for(gt.sort(nc),ne=0;ne<gt.length;ne++)t=gt[ne],t.before&&t.before(),e=t.id,rn[e]=null,t.run();var n=br.slice(),r=gt.slice();ec(),oc(n),ic(r),ns(),Ze&&at.devtools&&Ze.emit("flush")}function ic(t){for(var e=t.length;e--;){var n=t[e],r=n.vm;r&&r._watcher===n&&r._isMounted&&!r._isDestroyed&&ct(r,"updated")}}function ac(t){t._inactive=!1,br.push(t)}function oc(t){for(var e=0;e<t.length;e++)t[e]._inactive=!0,mr(t[e],!0)}function qn(t){var e=t.id;if(rn[e]==null&&!(t===_t.target&&t.noRecurse)){if(rn[e]=!0,!_r)gt.push(t);else{for(var n=gt.length-1;n>ne&&gt[n].id>t.id;)n--;gt.splice(n+1,0,t)}Wn||(Wn=!0,gr(rc))}}function sc(t){var e=t.$options.provide;if(e){var n=D(e)?e.call(t):e;if(!K(n))return;for(var r=vs(t),i=Ee?Reflect.ownKeys(n):Object.keys(n),a=0;a<i.length;a++){var o=i[a];Object.defineProperty(r,o,Object.getOwnPropertyDescriptor(n,o))}}}function cc(t){var e=Ra(t.$options.inject,t);e&&(Tt(!1),Object.keys(e).forEach(function(n){It(t,n,e[n])}),Tt(!0))}function Ra(t,e){if(t){for(var n=Object.create(null),r=Ee?Reflect.ownKeys(t):Object.keys(t),i=0;i<r.length;i++){var a=r[i];if(a!=="__ob__"){var o=t[a].from;if(o in e._provided)n[a]=e._provided[o];else if("default"in t[a]){var s=t[a].default;n[a]=D(s)?s.call(e):s}}}return n}}function yr(t,e,n,r,i){var a=this,o=i.options,s;X(r,"_uid")?(s=Object.create(r),s._original=r):(s=r,r=r._original);var c=z(o._compiled),u=!c;this.data=t,this.props=e,this.children=n,this.parent=r,this.listeners=t.on||Q,this.injections=Ra(o.inject,r),this.slots=function(){return a.$slots||be(r,t.scopedSlots,a.$slots=vr(n,r)),a.$slots},Object.defineProperty(this,"scopedSlots",{enumerable:!0,get:function(){return be(r,t.scopedSlots,this.slots())}}),c&&(this.$options=o,this.$slots=this.slots(),this.$scopedSlots=be(r,t.scopedSlots,this.$slots)),o._scopeId?this._c=function(f,h,v,m){var _=nn(s,f,h,v,m,u);return _&&!P(_)&&(_.fnScopeId=o._scopeId,_.fnContext=r),_}:this._c=function(f,h,v,m){return nn(s,f,h,v,m,u)}}xa(yr.prototype);function uc(t,e,n,r,i){var a=t.options,o={},s=a.props;if(d(s))for(var c in s)o[c]=Cr(c,s,e||Q);else d(n.attrs)&&oi(o,n.attrs),d(n.props)&&oi(o,n.props);var u=new yr(n,o,i,r,t),f=a.render.call(null,u._c,u);if(f instanceof nt)return ai(f,n,u.parent,a);if(P(f)){for(var h=hr(f)||[],v=new Array(h.length),m=0;m<h.length;m++)v[m]=ai(h[m],n,u.parent,a);return v}}function ai(t,e,n,r,i){var a=Nn(t);return a.fnContext=n,a.fnOptions=r,e.slot&&((a.data||(a.data={})).slot=e.slot),a}function oi(t,e){for(var n in e)t[Wt(n)]=e[n]}function an(t){return t.name||t.__name||t._componentTag}var wr={init:function(t,e){if(t.componentInstance&&!t.componentInstance._isDestroyed&&t.data.keepAlive){var n=t;wr.prepatch(n,n)}else{var r=t.componentInstance=fc(t,Ht);r.$mount(e?t.elm:void 0,e)}},prepatch:function(t,e){var n=e.componentOptions,r=e.componentInstance=t.componentInstance;tc(r,n.propsData,n.listeners,e,n.children)},insert:function(t){var e=t.context,n=t.componentInstance;n._isMounted||(n._isMounted=!0,ct(n,"mounted")),t.data.keepAlive&&(e._isMounted?ac(n):mr(n,!0))},destroy:function(t){var e=t.componentInstance;e._isDestroyed||(t.data.keepAlive?Ia(e,!0):e.$destroy())}},si=Object.keys(wr);function ci(t,e,n,r,i){if(!O(t)){var a=n.$options._base;if(K(t)&&(t=a.extend(t)),typeof t=="function"){var o;if(O(t.cid)&&(o=t,t=Ms(o,a),t===void 0))return Ns(o,e,n,r,i);e=e||{},Sr(t),d(e.model)&&dc(t.options,e);var s=gs(e,t);if(z(t.options.functional))return uc(t,s,e,n,r);var c=e.on;if(e.on=e.nativeOn,z(t.options.abstract)){var u=e.slot;e={},u&&(e.slot=u)}lc(e);var f=an(t.options)||i,h=new nt("vue-component-".concat(t.cid).concat(f?"-".concat(f):""),e,void 0,void 0,void 0,n,{Ctor:t,propsData:s,listeners:c,tag:i,children:r},o);return h}}}function fc(t,e){var n={_isComponent:!0,_parentVnode:t,parent:e},r=t.data.inlineTemplate;return d(r)&&(n.render=r.render,n.staticRenderFns=r.staticRenderFns),new t.componentOptions.Ctor(n)}function lc(t){for(var e=t.hook||(t.hook={}),n=0;n<si.length;n++){var r=si[n],i=e[r],a=wr[r];i!==a&&!(i&&i._merged)&&(e[r]=i?pc(a,i):a)}}function pc(t,e){var n=function(r,i){t(r,i),e(r,i)};return n._merged=!0,n}function dc(t,e){var n=t.model&&t.model.prop||"value",r=t.model&&t.model.event||"input";(e.attrs||(e.attrs={}))[n]=e.model.value;var i=e.on||(e.on={}),a=i[r],o=e.model.callback;d(a)?(P(a)?a.indexOf(o)===-1:a!==o)&&(i[r]=[o].concat(a)):i[r]=o}var hc=H,lt=at.optionMergeStrategies;function xe(t,e,n){if(n===void 0&&(n=!0),!e)return t;for(var r,i,a,o=Ee?Reflect.ownKeys(e):Object.keys(e),s=0;s<o.length;s++)r=o[s],r!=="__ob__"&&(i=t[r],a=e[r],!n||!X(t,r)?dr(t,r,a):i!==a&&et(i)&&et(a)&&xe(i,a));return t}function ui(t,e,n){return n?function(){var i=D(e)?e.call(n,n):e,a=D(t)?t.call(n,n):t;return i?xe(i,a):a}:e?t?function(){return xe(D(e)?e.call(this,this):e,D(t)?t.call(this,this):t)}:e:t}lt.data=function(t,e,n){return n?ui(t,e,n):e&&typeof e!="function"?t:ui(t,e)};function vc(t,e){var n=e?t?t.concat(e):P(e)?e:[e]:t;return n&&gc(n)}function gc(t){for(var e=[],n=0;n<t.length;n++)e.indexOf(t[n])===-1&&e.push(t[n]);return e}ca.forEach(function(t){lt[t]=vc});function mc(t,e,n,r){var i=Object.create(t||null);return e?N(i,e):i}mn.forEach(function(t){lt[t+"s"]=mc});lt.watch=function(t,e,n,r){if(t===Dn&&(t=void 0),e===Dn&&(e=void 0),!e)return Object.create(t||null);if(!t)return e;var i={};N(i,t);for(var a in e){var o=i[a],s=e[a];o&&!P(o)&&(o=[o]),i[a]=o?o.concat(s):P(s)?s:[s]}return i};lt.props=lt.methods=lt.inject=lt.computed=function(t,e,n,r){if(!t)return e;var i=Object.create(null);return N(i,t),e&&N(i,e),i};lt.provide=function(t,e){return t?function(){var n=Object.create(null);return xe(n,D(t)?t.call(this):t),e&&xe(n,D(e)?e.call(this):e,!1),n}:e};var bc=function(t,e){return e===void 0?t:e};function _c(t,e){var n=t.props;if(!!n){var r={},i,a,o;if(P(n))for(i=n.length;i--;)a=n[i],typeof a=="string"&&(o=Wt(a),r[o]={type:null});else if(et(n))for(var s in n)a=n[s],o=Wt(s),r[o]=et(a)?a:{type:a};t.props=r}}function yc(t,e){var n=t.inject;if(!!n){var r=t.inject={};if(P(n))for(var i=0;i<n.length;i++)r[n[i]]={from:n[i]};else if(et(n))for(var a in n){var o=n[a];r[a]=et(o)?N({from:a},o):{from:o}}}}function wc(t){var e=t.directives;if(e)for(var n in e){var r=e[n];D(r)&&(e[n]={bind:r,update:r})}}function Jt(t,e,n){if(D(e)&&(e=e.options),_c(e),yc(e),wc(e),!e._base&&(e.extends&&(t=Jt(t,e.extends,n)),e.mixins))for(var r=0,i=e.mixins.length;r<i;r++)t=Jt(t,e.mixins[r],n);var a={},o;for(o in t)s(o);for(o in e)X(t,o)||s(o);function s(c){var u=lt[c]||bc;a[c]=u(t[c],e[c],n,c)}return a}function on(t,e,n,r){if(typeof n=="string"){var i=t[e];if(X(i,n))return i[n];var a=Wt(n);if(X(i,a))return i[a];var o=qo(a);if(X(i,o))return i[o];var s=i[n]||i[a]||i[o];return s}}function Cr(t,e,n,r){var i=e[t],a=!X(n,t),o=n[t],s=li(Boolean,i.type);if(s>-1){if(a&&!X(i,"default"))o=!1;else if(o===""||o===$e(t)){var c=li(String,i.type);(c<0||s<c)&&(o=!0)}}if(o===void 0){o=Cc(r,i,t);var u=pr;Tt(!0),yt(o),Tt(u)}return o}function Cc(t,e,n){if(!!X(e,"default")){var r=e.default;return t&&t.$options.propsData&&t.$options.propsData[n]===void 0&&t._props[n]!==void 0?t._props[n]:D(r)&&Jn(e.type)!=="Function"?r.call(t):r}}var xc=/^\s*function (\w+)/;function Jn(t){var e=t&&t.toString().match(xc);return e?e[1]:""}function fi(t,e){return Jn(t)===Jn(e)}function li(t,e){if(!P(e))return fi(e,t)?0:-1;for(var n=0,r=e.length;n<r;n++)if(fi(e[n],t))return n;return-1}var Ct={enumerable:!0,configurable:!0,get:H,set:H};function xr(t,e,n){Ct.get=function(){return this[e][n]},Ct.set=function(i){this[e][n]=i},Object.defineProperty(t,n,Ct)}function Sc(t){var e=t.$options;if(e.props&&Oc(t,e.props),Is(t),e.methods&&Tc(t,e.methods),e.data)$c(t);else{var n=yt(t._data={});n&&n.vmCount++}e.computed&&Pc(t,e.computed),e.watch&&e.watch!==Dn&&Ic(t,e.watch)}function Oc(t,e){var n=t.$options.propsData||{},r=t._props=va({}),i=t.$options._propKeys=[],a=!t.$parent;a||Tt(!1);var o=function(c){i.push(c);var u=Cr(c,e,n,t);It(r,c,u),c in t||xr(t,"_props",c)};for(var s in e)o(s);Tt(!0)}function $c(t){var e=t.$options.data;e=t._data=D(e)?Ec(e,t):e||{},et(e)||(e={});var n=Object.keys(e),r=t.$options.props;t.$options.methods;for(var i=n.length;i--;){var a=n[i];r&&X(r,a)||ua(a)||xr(t,"_data",a)}var o=yt(e);o&&o.vmCount++}function Ec(t,e){fe();try{return t.call(e,e)}catch(n){return qt(n,e,"data()"),{}}finally{le()}}var Ac={lazy:!0};function Pc(t,e){var n=t._computedWatchers=Object.create(null),r=Rt();for(var i in e){var a=e[i],o=D(a)?a:a.get;r||(n[i]=new Ae(t,o||H,H,Ac)),i in t||ja(t,i,a)}}function ja(t,e,n){var r=!Rt();D(n)?(Ct.get=r?pi(e):di(n),Ct.set=H):(Ct.get=n.get?r&&n.cache!==!1?pi(e):di(n.get):H,Ct.set=n.set||H),Object.defineProperty(t,e,Ct)}function pi(t){return function(){var n=this._computedWatchers&&this._computedWatchers[t];if(n)return n.dirty&&n.evaluate(),_t.target&&n.depend(),n.value}}function di(t){return function(){return t.call(this,this)}}function Tc(t,e){t.$options.props;for(var n in e)t[n]=typeof e[n]!="function"?H:ia(e[n],t)}function Ic(t,e){for(var n in e){var r=e[n];if(P(r))for(var i=0;i<r.length;i++)Kn(t,n,r[i]);else Kn(t,n,r)}}function Kn(t,e,n,r){return et(n)&&(r=n,n=n.handler),typeof n=="string"&&(n=t[n]),t.$watch(e,n,r)}function kc(t){var e={};e.get=function(){return this._data};var n={};n.get=function(){return this._props},Object.defineProperty(t.prototype,"$data",e),Object.defineProperty(t.prototype,"$props",n),t.prototype.$set=dr,t.prototype.$delete=da,t.prototype.$watch=function(r,i,a){var o=this;if(et(i))return Kn(o,r,i,a);a=a||{},a.user=!0;var s=new Ae(o,r,i,a);if(a.immediate){var c='callback for immediate watcher "'.concat(s.expression,'"');fe(),wt(i,o,[s.value],o,c),le()}return function(){s.teardown()}}}var Rc=0;function jc(t){t.prototype._init=function(e){var n=this;n._uid=Rc++,n._isVue=!0,n.__v_skip=!0,n._scope=new ba(!0),n._scope._vm=!0,e&&e._isComponent?Lc(n,e):n.$options=Jt(Sr(n.constructor),e||{},n),n._renderProxy=n,n._self=n,Vs(n),qs(n),Ls(n),ct(n,"beforeCreate",void 0,!1),cc(n),Sc(n),sc(n),ct(n,"created"),n.$options.el&&n.$mount(n.$options.el)}}function Lc(t,e){var n=t.$options=Object.create(t.constructor.options),r=e._parentVnode;n.parent=e.parent,n._parentVnode=r;var i=r.componentOptions;n.propsData=i.propsData,n._parentListeners=i.listeners,n._renderChildren=i.children,n._componentTag=i.tag,e.render&&(n.render=e.render,n.staticRenderFns=e.staticRenderFns)}function Sr(t){var e=t.options;if(t.super){var n=Sr(t.super),r=t.superOptions;if(n!==r){t.superOptions=n;var i=Dc(t);i&&N(t.extendOptions,i),e=t.options=Jt(n,t.extendOptions),e.name&&(e.components[e.name]=t)}}return e}function Dc(t){var e,n=t.options,r=t.sealedOptions;for(var i in n)n[i]!==r[i]&&(e||(e={}),e[i]=n[i]);return e}function B(t){this._init(t)}jc(B);kc(B);Xs(B);Qs(B);Ds(B);function Nc(t){t.use=function(e){var n=this._installedPlugins||(this._installedPlugins=[]);if(n.indexOf(e)>-1)return this;var r=jn(arguments,1);return r.unshift(this),D(e.install)?e.install.apply(e,r):D(e)&&e.apply(null,r),n.push(e),this}}function Mc(t){t.mixin=function(e){return this.options=Jt(this.options,e),this}}function Fc(t){t.cid=0;var e=1;t.extend=function(n){n=n||{};var r=this,i=r.cid,a=n._Ctor||(n._Ctor={});if(a[i])return a[i];var o=an(n)||an(r.options),s=function(u){this._init(u)};return s.prototype=Object.create(r.prototype),s.prototype.constructor=s,s.cid=e++,s.options=Jt(r.options,n),s.super=r,s.options.props&&Uc(s),s.options.computed&&Hc(s),s.extend=r.extend,s.mixin=r.mixin,s.use=r.use,mn.forEach(function(c){s[c]=r[c]}),o&&(s.options.components[o]=s),s.superOptions=r.options,s.extendOptions=n,s.sealedOptions=N({},s.options),a[i]=s,s}}function Uc(t){var e=t.options.props;for(var n in e)xr(t.prototype,"_props",n)}function Hc(t){var e=t.options.computed;for(var n in e)ja(t.prototype,n,e[n])}function Bc(t){mn.forEach(function(e){t[e]=function(n,r){return r?(e==="component"&&et(r)&&(r.name=r.name||n,r=this.options._base.extend(r)),e==="directive"&&D(r)&&(r={bind:r,update:r}),this.options[e+"s"][n]=r,r):this.options[e+"s"][n]}})}function hi(t){return t&&(an(t.Ctor.options)||t.tag)}function je(t,e){return P(t)?t.indexOf(e)>-1:typeof t=="string"?t.split(",").indexOf(e)>-1:Ho(t)?t.test(e):!1}function vi(t,e){var n=t.cache,r=t.keys,i=t._vnode;for(var a in n){var o=n[a];if(o){var s=o.name;s&&!e(s)&&Yn(n,a,r,i)}}}function Yn(t,e,n,r){var i=t[e];i&&(!r||i.tag!==r.tag)&&i.componentInstance.$destroy(),t[e]=null,kt(n,e)}var gi=[String,RegExp,Array],zc={name:"keep-alive",abstract:!0,props:{include:gi,exclude:gi,max:[String,Number]},methods:{cacheVNode:function(){var t=this,e=t.cache,n=t.keys,r=t.vnodeToCache,i=t.keyToCache;if(r){var a=r.tag,o=r.componentInstance,s=r.componentOptions;e[i]={name:hi(s),tag:a,componentInstance:o},n.push(i),this.max&&n.length>parseInt(this.max)&&Yn(e,n[0],n,this._vnode),this.vnodeToCache=null}}},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var t in this.cache)Yn(this.cache,t,this.keys)},mounted:function(){var t=this;this.cacheVNode(),this.$watch("include",function(e){vi(t,function(n){return je(e,n)})}),this.$watch("exclude",function(e){vi(t,function(n){return!je(e,n)})})},updated:function(){this.cacheVNode()},render:function(){var t=this.$slots.default,e=Oa(t),n=e&&e.componentOptions;if(n){var r=hi(n),i=this,a=i.include,o=i.exclude;if(a&&(!r||!je(a,r))||o&&r&&je(o,r))return e;var s=this,c=s.cache,u=s.keys,f=e.key==null?n.Ctor.cid+(n.tag?"::".concat(n.tag):""):e.key;c[f]?(e.componentInstance=c[f].componentInstance,kt(u,f),u.push(f)):(this.vnodeToCache=e,this.keyToCache=f),e.data.keepAlive=!0}return e||t&&t[0]}},Wc={KeepAlive:zc};function Gc(t){var e={};e.get=function(){return at},Object.defineProperty(t,"config",e),t.util={warn:hc,extend:N,mergeOptions:Jt,defineReactive:It},t.set=dr,t.delete=da,t.nextTick=gr,t.observable=function(n){return yt(n),n},t.options=Object.create(null),mn.forEach(function(n){t.options[n+"s"]=Object.create(null)}),t.options._base=t,N(t.options.components,Wc),Nc(t),Mc(t),Fc(t),Bc(t)}Gc(B);Object.defineProperty(B.prototype,"$isServer",{get:Rt});Object.defineProperty(B.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}});Object.defineProperty(B,"FunctionalRenderContext",{value:yr});B.version=Ws;var qc=ut("style,class"),Jc=ut("input,textarea,option,select,progress"),Kc=function(t,e,n){return n==="value"&&Jc(t)&&e!=="button"||n==="selected"&&t==="option"||n==="checked"&&t==="input"||n==="muted"&&t==="video"},La=ut("contenteditable,draggable,spellcheck"),Yc=ut("events,caret,typing,plaintext-only"),Xc=function(t,e){return sn(e)||e==="false"?"false":t==="contenteditable"&&Yc(e)?e:"true"},Vc=ut("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible"),Xn="http://www.w3.org/1999/xlink",Or=function(t){return t.charAt(5)===":"&&t.slice(0,5)==="xlink"},Da=function(t){return Or(t)?t.slice(6,t.length):""},sn=function(t){return t==null||t===!1};function Qc(t){for(var e=t.data,n=t,r=t;d(r.componentInstance);)r=r.componentInstance._vnode,r&&r.data&&(e=mi(r.data,e));for(;d(n=n.parent);)n&&n.data&&(e=mi(e,n.data));return Zc(e.staticClass,e.class)}function mi(t,e){return{staticClass:$r(t.staticClass,e.staticClass),class:d(t.class)?[t.class,e.class]:e.class}}function Zc(t,e){return d(t)||d(e)?$r(t,Er(e)):""}function $r(t,e){return t?e?t+" "+e:t:e||""}function Er(t){return Array.isArray(t)?tu(t):K(t)?eu(t):typeof t=="string"?t:""}function tu(t){for(var e="",n,r=0,i=t.length;r<i;r++)d(n=Er(t[r]))&&n!==""&&(e&&(e+=" "),e+=n);return e}function eu(t){var e="";for(var n in t)t[n]&&(e&&(e+=" "),e+=n);return e}var nu={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},ru=ut("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),Ar=ut("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),Na=function(t){return ru(t)||Ar(t)};function iu(t){if(Ar(t))return"svg";if(t==="math")return"math"}var Le=Object.create(null);function au(t){if(!rt)return!0;if(Na(t))return!1;if(t=t.toLowerCase(),Le[t]!=null)return Le[t];var e=document.createElement(t);return t.indexOf("-")>-1?Le[t]=e.constructor===window.HTMLUnknownElement||e.constructor===window.HTMLElement:Le[t]=/HTMLUnknownElement/.test(e.toString())}var Vn=ut("text,number,password,search,email,tel,url");function ou(t){if(typeof t=="string"){var e=document.querySelector(t);return e||document.createElement("div")}else return t}function su(t,e){var n=document.createElement(t);return t!=="select"||e.data&&e.data.attrs&&e.data.attrs.multiple!==void 0&&n.setAttribute("multiple","multiple"),n}function cu(t,e){return document.createElementNS(nu[t],e)}function uu(t){return document.createTextNode(t)}function fu(t){return document.createComment(t)}function lu(t,e,n){t.insertBefore(e,n)}function pu(t,e){t.removeChild(e)}function du(t,e){t.appendChild(e)}function hu(t){return t.parentNode}function vu(t){return t.nextSibling}function gu(t){return t.tagName}function mu(t,e){t.textContent=e}function bu(t,e){t.setAttribute(e,"")}var _u=Object.freeze({__proto__:null,createElement:su,createElementNS:cu,createTextNode:uu,createComment:fu,insertBefore:lu,removeChild:pu,appendChild:du,parentNode:hu,nextSibling:vu,tagName:gu,setTextContent:mu,setStyleScope:bu}),yu={create:function(t,e){re(e)},update:function(t,e){t.data.ref!==e.data.ref&&(re(t,!0),re(e))},destroy:function(t){re(t,!0)}};function re(t,e){var n=t.data.ref;if(!!d(n)){var r=t.context,i=t.componentInstance||t.elm,a=e?null:i,o=e?void 0:i;if(D(n)){wt(n,r,[a],r,"template ref function");return}var s=t.data.refInFor,c=typeof n=="string"||typeof n=="number",u=tt(n),f=r.$refs;if(c||u){if(s){var h=c?f[n]:n.value;e?P(h)&&kt(h,i):P(h)?h.includes(i)||h.push(i):c?(f[n]=[i],bi(r,n,f[n])):n.value=[i]}else if(c){if(e&&f[n]!==i)return;f[n]=o,bi(r,n,a)}else if(u){if(e&&n.value!==i)return;n.value=a}}}}function bi(t,e,n){var r=t._setupState;r&&X(r,e)&&(tt(r[e])?r[e].value=n:r[e]=n)}var St=new nt("",{},[]),he=["create","activate","update","remove","destroy"];function Mt(t,e){return t.key===e.key&&t.asyncFactory===e.asyncFactory&&(t.tag===e.tag&&t.isComment===e.isComment&&d(t.data)===d(e.data)&&wu(t,e)||z(t.isAsyncPlaceholder)&&O(e.asyncFactory.error))}function wu(t,e){if(t.tag!=="input")return!0;var n,r=d(n=t.data)&&d(n=n.attrs)&&n.type,i=d(n=e.data)&&d(n=n.attrs)&&n.type;return r===i||Vn(r)&&Vn(i)}function Cu(t,e,n){var r,i,a={};for(r=e;r<=n;++r)i=t[r].key,d(i)&&(a[i]=r);return a}function xu(t){var e,n,r={},i=t.modules,a=t.nodeOps;for(e=0;e<he.length;++e)for(r[he[e]]=[],n=0;n<i.length;++n)d(i[n][he[e]])&&r[he[e]].push(i[n][he[e]]);function o(p){return new nt(a.tagName(p).toLowerCase(),{},[],void 0,p)}function s(p,l){function g(){--g.listeners===0&&c(p)}return g.listeners=l,g}function c(p){var l=a.parentNode(p);d(l)&&a.removeChild(l,p)}function u(p,l,g,w,S,I,$){if(d(p.elm)&&d(I)&&(p=I[$]=Nn(p)),p.isRootInsert=!S,!f(p,l,g,w)){var E=p.data,k=p.children,R=p.tag;d(R)?(p.elm=p.ns?a.createElementNS(p.ns,R):a.createElement(R,p),C(p),_(p,k,l),d(E)&&b(p,l),m(g,p.elm,w)):z(p.isComment)?(p.elm=a.createComment(p.text),m(g,p.elm,w)):(p.elm=a.createTextNode(p.text),m(g,p.elm,w))}}function f(p,l,g,w){var S=p.data;if(d(S)){var I=d(p.componentInstance)&&S.keepAlive;if(d(S=S.hook)&&d(S=S.init)&&S(p,!1),d(p.componentInstance))return h(p,l),m(g,p.elm,w),z(I)&&v(p,l,g,w),!0}}function h(p,l){d(p.data.pendingInsert)&&(l.push.apply(l,p.data.pendingInsert),p.data.pendingInsert=null),p.elm=p.componentInstance.$el,y(p)?(b(p,l),C(p)):(re(p),l.push(p))}function v(p,l,g,w){for(var S,I=p;I.componentInstance;)if(I=I.componentInstance._vnode,d(S=I.data)&&d(S=S.transition)){for(S=0;S<r.activate.length;++S)r.activate[S](St,I);l.push(I);break}m(g,p.elm,w)}function m(p,l,g){d(p)&&(d(g)?a.parentNode(g)===p&&a.insertBefore(p,l,g):a.appendChild(p,l))}function _(p,l,g){if(P(l))for(var w=0;w<l.length;++w)u(l[w],g,p.elm,null,!0,l,w);else Oe(p.text)&&a.appendChild(p.elm,a.createTextNode(String(p.text)))}function y(p){for(;p.componentInstance;)p=p.componentInstance._vnode;return d(p.tag)}function b(p,l){for(var g=0;g<r.create.length;++g)r.create[g](St,p);e=p.data.hook,d(e)&&(d(e.create)&&e.create(St,p),d(e.insert)&&l.push(p))}function C(p){var l;if(d(l=p.fnScopeId))a.setStyleScope(p.elm,l);else for(var g=p;g;)d(l=g.context)&&d(l=l.$options._scopeId)&&a.setStyleScope(p.elm,l),g=g.parent;d(l=Ht)&&l!==p.context&&l!==p.fnContext&&d(l=l.$options._scopeId)&&a.setStyleScope(p.elm,l)}function x(p,l,g,w,S,I){for(;w<=S;++w)u(g[w],I,p,l,!1,g,w)}function A(p){var l,g,w=p.data;if(d(w))for(d(l=w.hook)&&d(l=l.destroy)&&l(p),l=0;l<r.destroy.length;++l)r.destroy[l](p);if(d(l=p.children))for(g=0;g<p.children.length;++g)A(p.children[g])}function T(p,l,g){for(;l<=g;++l){var w=p[l];d(w)&&(d(w.tag)?(L(w),A(w)):c(w.elm))}}function L(p,l){if(d(l)||d(p.data)){var g,w=r.remove.length+1;for(d(l)?l.listeners+=w:l=s(p.elm,w),d(g=p.componentInstance)&&d(g=g._vnode)&&d(g.data)&&L(g,l),g=0;g<r.remove.length;++g)r.remove[g](p,l);d(g=p.data.hook)&&d(g=g.remove)?g(p,l):l()}else c(p.elm)}function F(p,l,g,w,S){for(var I=0,$=0,E=l.length-1,k=l[0],R=l[E],j=g.length-1,G=g[0],it=g[j],Lt,Dt,Nt,Xt,Sn=!S;I<=E&&$<=j;)O(k)?k=l[++I]:O(R)?R=l[--E]:Mt(k,G)?(W(k,G,w,g,$),k=l[++I],G=g[++$]):Mt(R,it)?(W(R,it,w,g,j),R=l[--E],it=g[--j]):Mt(k,it)?(W(k,it,w,g,j),Sn&&a.insertBefore(p,k.elm,a.nextSibling(R.elm)),k=l[++I],it=g[--j]):Mt(R,G)?(W(R,G,w,g,$),Sn&&a.insertBefore(p,R.elm,k.elm),R=l[--E],G=g[++$]):(O(Lt)&&(Lt=Cu(l,I,E)),Dt=d(G.key)?Lt[G.key]:U(G,l,I,E),O(Dt)?u(G,w,p,k.elm,!1,g,$):(Nt=l[Dt],Mt(Nt,G)?(W(Nt,G,w,g,$),l[Dt]=void 0,Sn&&a.insertBefore(p,Nt.elm,k.elm)):u(G,w,p,k.elm,!1,g,$)),G=g[++$]);I>E?(Xt=O(g[j+1])?null:g[j+1].elm,x(p,Xt,g,$,j,w)):$>j&&T(l,I,E)}function U(p,l,g,w){for(var S=g;S<w;S++){var I=l[S];if(d(I)&&Mt(p,I))return S}}function W(p,l,g,w,S,I){if(p!==l){d(l.elm)&&d(w)&&(l=w[S]=Nn(l));var $=l.elm=p.elm;if(z(p.isAsyncPlaceholder)){d(l.asyncFactory.resolved)?ht(p.elm,l,g):l.isAsyncPlaceholder=!0;return}if(z(l.isStatic)&&z(p.isStatic)&&l.key===p.key&&(z(l.isCloned)||z(l.isOnce))){l.componentInstance=p.componentInstance;return}var E,k=l.data;d(k)&&d(E=k.hook)&&d(E=E.prepatch)&&E(p,l);var R=p.children,j=l.children;if(d(k)&&y(l)){for(E=0;E<r.update.length;++E)r.update[E](p,l);d(E=k.hook)&&d(E=E.update)&&E(p,l)}O(l.text)?d(R)&&d(j)?R!==j&&F($,R,j,g,I):d(j)?(d(p.text)&&a.setTextContent($,""),x($,null,j,0,j.length-1,g)):d(R)?T(R,0,R.length-1):d(p.text)&&a.setTextContent($,""):p.text!==l.text&&a.setTextContent($,l.text),d(k)&&d(E=k.hook)&&d(E=E.postpatch)&&E(p,l)}}function pt(p,l,g){if(z(g)&&d(p.parent))p.parent.data.pendingInsert=l;else for(var w=0;w<l.length;++w)l[w].data.hook.insert(l[w])}var dt=ut("attrs,class,staticClass,staticStyle,key");function ht(p,l,g,w){var S,I=l.tag,$=l.data,E=l.children;if(w=w||$&&$.pre,l.elm=p,z(l.isComment)&&d(l.asyncFactory))return l.isAsyncPlaceholder=!0,!0;if(d($)&&(d(S=$.hook)&&d(S=S.init)&&S(l,!0),d(S=l.componentInstance)))return h(l,g),!0;if(d(I)){if(d(E))if(!p.hasChildNodes())_(l,E,g);else if(d(S=$)&&d(S=S.domProps)&&d(S=S.innerHTML)){if(S!==p.innerHTML)return!1}else{for(var k=!0,R=p.firstChild,j=0;j<E.length;j++){if(!R||!ht(R,E[j],g,w)){k=!1;break}R=R.nextSibling}if(!k||R)return!1}if(d($)){var G=!1;for(var it in $)if(!dt(it)){G=!0,b(l,g);break}!G&&$.class&&oe($.class)}}else p.data!==l.text&&(p.data=l.text);return!0}return function(l,g,w,S){if(O(g)){d(l)&&A(l);return}var I=!1,$=[];if(O(l))I=!0,u(g,$);else{var E=d(l.nodeType);if(!E&&Mt(l,g))W(l,g,$,null,null,S);else{if(E){if(l.nodeType===1&&l.hasAttribute(Br)&&(l.removeAttribute(Br),w=!0),z(w)&&ht(l,g,$))return pt(g,$,!0),l;l=o(l)}var k=l.elm,R=a.parentNode(k);if(u(g,$,k._leaveCb?null:R,a.nextSibling(k)),d(g.parent))for(var j=g.parent,G=y(g);j;){for(var it=0;it<r.destroy.length;++it)r.destroy[it](j);if(j.elm=g.elm,G){for(var Lt=0;Lt<r.create.length;++Lt)r.create[Lt](St,j);var Dt=j.data.hook.insert;if(Dt.merged)for(var Nt=Dt.fns.slice(1),Xt=0;Xt<Nt.length;Xt++)Nt[Xt]()}else re(j);j=j.parent}d(R)?T([l],0,0):d(l.tag)&&A(l)}}return pt(g,$,I),g.elm}}var Su={create:En,update:En,destroy:function(e){En(e,St)}};function En(t,e){(t.data.directives||e.data.directives)&&Ou(t,e)}function Ou(t,e){var n=t===St,r=e===St,i=_i(t.data.directives,t.context),a=_i(e.data.directives,e.context),o=[],s=[],c,u,f;for(c in a)u=i[c],f=a[c],u?(f.oldValue=u.value,f.oldArg=u.arg,ve(f,"update",e,t),f.def&&f.def.componentUpdated&&s.push(f)):(ve(f,"bind",e,t),f.def&&f.def.inserted&&o.push(f));if(o.length){var h=function(){for(var v=0;v<o.length;v++)ve(o[v],"inserted",e,t)};n?xt(e,"insert",h):h()}if(s.length&&xt(e,"postpatch",function(){for(var v=0;v<s.length;v++)ve(s[v],"componentUpdated",e,t)}),!n)for(c in i)a[c]||ve(i[c],"unbind",t,t,r)}var $u=Object.create(null);function _i(t,e){var n=Object.create(null);if(!t)return n;var r,i;for(r=0;r<t.length;r++){if(i=t[r],i.modifiers||(i.modifiers=$u),n[Eu(i)]=i,e._setupState&&e._setupState.__sfc){var a=i.def||on(e,"_setupState","v-"+i.name);typeof a=="function"?i.def={bind:a,update:a}:i.def=a}i.def=i.def||on(e.$options,"directives",i.name)}return n}function Eu(t){return t.rawName||"".concat(t.name,".").concat(Object.keys(t.modifiers||{}).join("."))}function ve(t,e,n,r,i){var a=t.def&&t.def[e];if(a)try{a(n.elm,t,n,r,i)}catch(o){qt(o,n.context,"directive ".concat(t.name," ").concat(e," hook"))}}var Au=[yu,Su];function yi(t,e){var n=e.componentOptions;if(!(d(n)&&n.Ctor.options.inheritAttrs===!1)&&!(O(t.data.attrs)&&O(e.data.attrs))){var r,i,a,o=e.elm,s=t.data.attrs||{},c=e.data.attrs||{};(d(c.__ob__)||z(c._v_attr_proxy))&&(c=e.data.attrs=N({},c));for(r in c)i=c[r],a=s[r],a!==i&&wi(o,r,i,e.data.pre);(ce||lr)&&c.value!==s.value&&wi(o,"value",c.value);for(r in s)O(c[r])&&(Or(r)?o.removeAttributeNS(Xn,Da(r)):La(r)||o.removeAttribute(r))}}function wi(t,e,n,r){r||t.tagName.indexOf("-")>-1?Ci(t,e,n):Vc(e)?sn(n)?t.removeAttribute(e):(n=e==="allowfullscreen"&&t.tagName==="EMBED"?"true":e,t.setAttribute(e,n)):La(e)?t.setAttribute(e,Xc(e,n)):Or(e)?sn(n)?t.removeAttributeNS(Xn,Da(e)):t.setAttributeNS(Xn,e,n):Ci(t,e,n)}function Ci(t,e,n){if(sn(n))t.removeAttribute(e);else{if(ce&&!ue&&t.tagName==="TEXTAREA"&&e==="placeholder"&&n!==""&&!t.__ieph){var r=function(i){i.stopImmediatePropagation(),t.removeEventListener("input",r)};t.addEventListener("input",r),t.__ieph=!0}t.setAttribute(e,n)}}var Pu={create:yi,update:yi};function xi(t,e){var n=e.elm,r=e.data,i=t.data;if(!(O(r.staticClass)&&O(r.class)&&(O(i)||O(i.staticClass)&&O(i.class)))){var a=Qc(e),o=n._transitionClasses;d(o)&&(a=$r(a,Er(o))),a!==n._prevClass&&(n.setAttribute("class",a),n._prevClass=a)}}var Tu={create:xi,update:xi},An="__r",Pn="__c";function Iu(t){if(d(t[An])){var e=ce?"change":"input";t[e]=[].concat(t[An],t[e]||[]),delete t[An]}d(t[Pn])&&(t.change=[].concat(t[Pn],t.change||[]),delete t[Pn])}var Se;function ku(t,e,n){var r=Se;return function i(){var a=e.apply(null,arguments);a!==null&&Ma(t,i,n,r)}}var Ru=Hn&&!(zr&&Number(zr[1])<=53);function ju(t,e,n,r){if(Ru){var i=ka,a=e;e=a._wrapper=function(o){if(o.target===o.currentTarget||o.timeStamp>=i||o.timeStamp<=0||o.target.ownerDocument!==document)return a.apply(this,arguments)}}Se.addEventListener(t,e,fa?{capture:n,passive:r}:n)}function Ma(t,e,n,r){(r||Se).removeEventListener(t,e._wrapper||e,n)}function Tn(t,e){if(!(O(t.data.on)&&O(e.data.on))){var n=e.data.on||{},r=t.data.on||{};Se=e.elm||t.elm,Iu(n),_a(n,r,ju,Ma,ku,e.context),Se=void 0}}var Lu={create:Tn,update:Tn,destroy:function(t){return Tn(t,St)}},De;function Si(t,e){if(!(O(t.data.domProps)&&O(e.data.domProps))){var n,r,i=e.elm,a=t.data.domProps||{},o=e.data.domProps||{};(d(o.__ob__)||z(o._v_attr_proxy))&&(o=e.data.domProps=N({},o));for(n in a)n in o||(i[n]="");for(n in o){if(r=o[n],n==="textContent"||n==="innerHTML"){if(e.children&&(e.children.length=0),r===a[n])continue;i.childNodes.length===1&&i.removeChild(i.childNodes[0])}if(n==="value"&&i.tagName!=="PROGRESS"){i._value=r;var s=O(r)?"":String(r);Du(i,s)&&(i.value=s)}else if(n==="innerHTML"&&Ar(i.tagName)&&O(i.innerHTML)){De=De||document.createElement("div"),De.innerHTML="<svg>".concat(r,"</svg>");for(var c=De.firstChild;i.firstChild;)i.removeChild(i.firstChild);for(;c.firstChild;)i.appendChild(c.firstChild)}else if(r!==a[n])try{i[n]=r}catch(u){}}}}function Du(t,e){return!t.composing&&(t.tagName==="OPTION"||Nu(t,e)||Mu(t,e))}function Nu(t,e){var n=!0;try{n=document.activeElement!==t}catch(r){}return n&&t.value!==e}function Mu(t,e){var n=t.value,r=t._vModifiers;if(d(r)){if(r.number)return _e(n)!==_e(e);if(r.trim)return n.trim()!==e.trim()}return n!==e}var Fu={create:Si,update:Si},Uu=Kt(function(t){var e={},n=/;(?![^(]*\))/g,r=/:(.+)/;return t.split(n).forEach(function(i){if(i){var a=i.split(r);a.length>1&&(e[a[0].trim()]=a[1].trim())}}),e});function In(t){var e=Fa(t.style);return t.staticStyle?N(t.staticStyle,e):e}function Fa(t){return Array.isArray(t)?aa(t):typeof t=="string"?Uu(t):t}function Hu(t,e){var n={},r;if(e)for(var i=t;i.componentInstance;)i=i.componentInstance._vnode,i&&i.data&&(r=In(i.data))&&N(n,r);(r=In(t.data))&&N(n,r);for(var a=t;a=a.parent;)a.data&&(r=In(a.data))&&N(n,r);return n}var Bu=/^--/,Oi=/\s*!important$/,$i=function(t,e,n){if(Bu.test(e))t.style.setProperty(e,n);else if(Oi.test(n))t.style.setProperty($e(e),n.replace(Oi,""),"important");else{var r=zu(e);if(Array.isArray(n))for(var i=0,a=n.length;i<a;i++)t.style[r]=n[i];else t.style[r]=n}},Ei=["Webkit","Moz","ms"],Ne,zu=Kt(function(t){if(Ne=Ne||document.createElement("div").style,t=Wt(t),t!=="filter"&&t in Ne)return t;for(var e=t.charAt(0).toUpperCase()+t.slice(1),n=0;n<Ei.length;n++){var r=Ei[n]+e;if(r in Ne)return r}});function Ai(t,e){var n=e.data,r=t.data;if(!(O(n.staticStyle)&&O(n.style)&&O(r.staticStyle)&&O(r.style))){var i,a,o=e.elm,s=r.staticStyle,c=r.normalizedStyle||r.style||{},u=s||c,f=Fa(e.data.style)||{};e.data.normalizedStyle=d(f.__ob__)?N({},f):f;var h=Hu(e,!0);for(a in u)O(h[a])&&$i(o,a,"");for(a in h)i=h[a],i!==u[a]&&$i(o,a,i==null?"":i)}}var Wu={create:Ai,update:Ai},Ua=/\s+/;function Ha(t,e){if(!(!e||!(e=e.trim())))if(t.classList)e.indexOf(" ")>-1?e.split(Ua).forEach(function(r){return t.classList.add(r)}):t.classList.add(e);else{var n=" ".concat(t.getAttribute("class")||""," ");n.indexOf(" "+e+" ")<0&&t.setAttribute("class",(n+e).trim())}}function Ba(t,e){if(!(!e||!(e=e.trim())))if(t.classList)e.indexOf(" ")>-1?e.split(Ua).forEach(function(i){return t.classList.remove(i)}):t.classList.remove(e),t.classList.length||t.removeAttribute("class");else{for(var n=" ".concat(t.getAttribute("class")||""," "),r=" "+e+" ";n.indexOf(r)>=0;)n=n.replace(r," ");n=n.trim(),n?t.setAttribute("class",n):t.removeAttribute("class")}}function za(t){if(!!t){if(typeof t=="object"){var e={};return t.css!==!1&&N(e,Pi(t.name||"v")),N(e,t),e}else if(typeof t=="string")return Pi(t)}}var Pi=Kt(function(t){return{enterClass:"".concat(t,"-enter"),enterToClass:"".concat(t,"-enter-to"),enterActiveClass:"".concat(t,"-enter-active"),leaveClass:"".concat(t,"-leave"),leaveToClass:"".concat(t,"-leave-to"),leaveActiveClass:"".concat(t,"-leave-active")}}),Wa=rt&&!ue,te="transition",kn="animation",ze="transition",cn="transitionend",Qn="animation",Ga="animationend";Wa&&(window.ontransitionend===void 0&&window.onwebkittransitionend!==void 0&&(ze="WebkitTransition",cn="webkitTransitionEnd"),window.onanimationend===void 0&&window.onwebkitanimationend!==void 0&&(Qn="WebkitAnimation",Ga="webkitAnimationEnd"));var Ti=rt?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:function(t){return t()};function qa(t){Ti(function(){Ti(t)})}function Bt(t,e){var n=t._transitionClasses||(t._transitionClasses=[]);n.indexOf(e)<0&&(n.push(e),Ha(t,e))}function mt(t,e){t._transitionClasses&&kt(t._transitionClasses,e),Ba(t,e)}function Ja(t,e,n){var r=Ka(t,e),i=r.type,a=r.timeout,o=r.propCount;if(!i)return n();var s=i===te?cn:Ga,c=0,u=function(){t.removeEventListener(s,f),n()},f=function(h){h.target===t&&++c>=o&&u()};setTimeout(function(){c<o&&u()},a+1),t.addEventListener(s,f)}var Gu=/\b(transform|all)(,|$)/;function Ka(t,e){var n=window.getComputedStyle(t),r=(n[ze+"Delay"]||"").split(", "),i=(n[ze+"Duration"]||"").split(", "),a=Ii(r,i),o=(n[Qn+"Delay"]||"").split(", "),s=(n[Qn+"Duration"]||"").split(", "),c=Ii(o,s),u,f=0,h=0;e===te?a>0&&(u=te,f=a,h=i.length):e===kn?c>0&&(u=kn,f=c,h=s.length):(f=Math.max(a,c),u=f>0?a>c?te:kn:null,h=u?u===te?i.length:s.length:0);var v=u===te&&Gu.test(n[ze+"Property"]);return{type:u,timeout:f,propCount:h,hasTransform:v}}function Ii(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max.apply(null,e.map(function(n,r){return ki(n)+ki(t[r])}))}function ki(t){return Number(t.slice(0,-1).replace(",","."))*1e3}function Zn(t,e){var n=t.elm;d(n._leaveCb)&&(n._leaveCb.cancelled=!0,n._leaveCb());var r=za(t.data.transition);if(!O(r)&&!(d(n._enterCb)||n.nodeType!==1)){for(var i=r.css,a=r.type,o=r.enterClass,s=r.enterToClass,c=r.enterActiveClass,u=r.appearClass,f=r.appearToClass,h=r.appearActiveClass,v=r.beforeEnter,m=r.enter,_=r.afterEnter,y=r.enterCancelled,b=r.beforeAppear,C=r.appear,x=r.afterAppear,A=r.appearCancelled,T=r.duration,L=Ht,F=Ht.$vnode;F&&F.parent;)L=F.context,F=F.parent;var U=!L._isMounted||!t.isRootInsert;if(!(U&&!C&&C!=="")){var W=U&&u?u:o,pt=U&&h?h:c,dt=U&&f?f:s,ht=U&&b||v,p=U&&D(C)?C:m,l=U&&x||_,g=U&&A||y,w=_e(K(T)?T.enter:T),S=i!==!1&&!ue,I=Pr(p),$=n._enterCb=Qe(function(){S&&(mt(n,dt),mt(n,pt)),$.cancelled?(S&&mt(n,W),g&&g(n)):l&&l(n),n._enterCb=null});t.data.show||xt(t,"insert",function(){var E=n.parentNode,k=E&&E._pending&&E._pending[t.key];k&&k.tag===t.tag&&k.elm._leaveCb&&k.elm._leaveCb(),p&&p(n,$)}),ht&&ht(n),S&&(Bt(n,W),Bt(n,pt),qa(function(){mt(n,W),$.cancelled||(Bt(n,dt),I||(Xa(w)?setTimeout($,w):Ja(n,a,$)))})),t.data.show&&(e&&e(),p&&p(n,$)),!S&&!I&&$()}}}function Ya(t,e){var n=t.elm;d(n._enterCb)&&(n._enterCb.cancelled=!0,n._enterCb());var r=za(t.data.transition);if(O(r)||n.nodeType!==1)return e();if(d(n._leaveCb))return;var i=r.css,a=r.type,o=r.leaveClass,s=r.leaveToClass,c=r.leaveActiveClass,u=r.beforeLeave,f=r.leave,h=r.afterLeave,v=r.leaveCancelled,m=r.delayLeave,_=r.duration,y=i!==!1&&!ue,b=Pr(f),C=_e(K(_)?_.leave:_),x=n._leaveCb=Qe(function(){n.parentNode&&n.parentNode._pending&&(n.parentNode._pending[t.key]=null),y&&(mt(n,s),mt(n,c)),x.cancelled?(y&&mt(n,o),v&&v(n)):(e(),h&&h(n)),n._leaveCb=null});m?m(A):A();function A(){x.cancelled||(!t.data.show&&n.parentNode&&((n.parentNode._pending||(n.parentNode._pending={}))[t.key]=t),u&&u(n),y&&(Bt(n,o),Bt(n,c),qa(function(){mt(n,o),x.cancelled||(Bt(n,s),b||(Xa(C)?setTimeout(x,C):Ja(n,a,x)))})),f&&f(n,x),!y&&!b&&x())}}function Xa(t){return typeof t=="number"&&!isNaN(t)}function Pr(t){if(O(t))return!1;var e=t.fns;return d(e)?Pr(Array.isArray(e)?e[0]:e):(t._length||t.length)>1}function Ri(t,e){e.data.show!==!0&&Zn(e)}var qu=rt?{create:Ri,activate:Ri,remove:function(t,e){t.data.show!==!0?Ya(t,e):e()}}:{},Ju=[Pu,Tu,Lu,Fu,Wu,qu],Ku=Ju.concat(Au),Yu=xu({nodeOps:_u,modules:Ku});ue&&document.addEventListener("selectionchange",function(){var t=document.activeElement;t&&t.vmodel&&Tr(t,"input")});var Va={inserted:function(t,e,n,r){n.tag==="select"?(r.elm&&!r.elm._vOptions?xt(n,"postpatch",function(){Va.componentUpdated(t,e,n)}):ji(t,e,n.context),t._vOptions=[].map.call(t.options,un)):(n.tag==="textarea"||Vn(t.type))&&(t._vModifiers=e.modifiers,e.modifiers.lazy||(t.addEventListener("compositionstart",Xu),t.addEventListener("compositionend",Ni),t.addEventListener("change",Ni),ue&&(t.vmodel=!0)))},componentUpdated:function(t,e,n){if(n.tag==="select"){ji(t,e,n.context);var r=t._vOptions,i=t._vOptions=[].map.call(t.options,un);if(i.some(function(o,s){return!Gt(o,r[s])})){var a=t.multiple?e.value.some(function(o){return Di(o,i)}):e.value!==e.oldValue&&Di(e.value,i);a&&Tr(t,"change")}}}};function ji(t,e,n){Li(t,e),(ce||lr)&&setTimeout(function(){Li(t,e)},0)}function Li(t,e,n){var r=e.value,i=t.multiple;if(!(i&&!Array.isArray(r))){for(var a,o,s=0,c=t.options.length;s<c;s++)if(o=t.options[s],i)a=sa(r,un(o))>-1,o.selected!==a&&(o.selected=a);else if(Gt(un(o),r)){t.selectedIndex!==s&&(t.selectedIndex=s);return}i||(t.selectedIndex=-1)}}function Di(t,e){return e.every(function(n){return!Gt(n,t)})}function un(t){return"_value"in t?t._value:t.value}function Xu(t){t.target.composing=!0}function Ni(t){!t.target.composing||(t.target.composing=!1,Tr(t.target,"input"))}function Tr(t,e){var n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!0),t.dispatchEvent(n)}function tr(t){return t.componentInstance&&(!t.data||!t.data.transition)?tr(t.componentInstance._vnode):t}var Vu={bind:function(t,e,n){var r=e.value;n=tr(n);var i=n.data&&n.data.transition,a=t.__vOriginalDisplay=t.style.display==="none"?"":t.style.display;r&&i?(n.data.show=!0,Zn(n,function(){t.style.display=a})):t.style.display=r?a:"none"},update:function(t,e,n){var r=e.value,i=e.oldValue;if(!r!=!i){n=tr(n);var a=n.data&&n.data.transition;a?(n.data.show=!0,r?Zn(n,function(){t.style.display=t.__vOriginalDisplay}):Ya(n,function(){t.style.display="none"})):t.style.display=r?t.__vOriginalDisplay:"none"}},unbind:function(t,e,n,r,i){i||(t.style.display=t.__vOriginalDisplay)}},Qu={model:Va,show:Vu},Qa={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]};function er(t){var e=t&&t.componentOptions;return e&&e.Ctor.options.abstract?er(Oa(e.children)):t}function Za(t){var e={},n=t.$options;for(var r in n.propsData)e[r]=t[r];var i=n._parentListeners;for(var r in i)e[Wt(r)]=i[r];return e}function Mi(t,e){if(/\d-keep-alive$/.test(e.tag))return t("keep-alive",{props:e.componentOptions.propsData})}function Zu(t){for(;t=t.parent;)if(t.data.transition)return!0}function tf(t,e){return e.key===t.key&&e.tag===t.tag}var ef=function(t){return t.tag||we(t)},nf=function(t){return t.name==="show"},rf={name:"transition",props:Qa,abstract:!0,render:function(t){var e=this,n=this.$slots.default;if(!!n&&(n=n.filter(ef),!!n.length)){var r=this.mode,i=n[0];if(Zu(this.$vnode))return i;var a=er(i);if(!a)return i;if(this._leaving)return Mi(t,i);var o="__transition-".concat(this._uid,"-");a.key=a.key==null?a.isComment?o+"comment":o+a.tag:Oe(a.key)?String(a.key).indexOf(o)===0?a.key:o+a.key:a.key;var s=(a.data||(a.data={})).transition=Za(this),c=this._vnode,u=er(c);if(a.data.directives&&a.data.directives.some(nf)&&(a.data.show=!0),u&&u.data&&!tf(a,u)&&!we(u)&&!(u.componentInstance&&u.componentInstance._vnode.isComment)){var f=u.data.transition=N({},s);if(r==="out-in")return this._leaving=!0,xt(f,"afterLeave",function(){e._leaving=!1,e.$forceUpdate()}),Mi(t,i);if(r==="in-out"){if(we(a))return c;var h,v=function(){h()};xt(s,"afterEnter",v),xt(s,"enterCancelled",v),xt(f,"delayLeave",function(m){h=m})}}return i}}},to=N({tag:String,moveClass:String},Qa);delete to.mode;var af={props:to,beforeMount:function(){var t=this,e=this._update;this._update=function(n,r){var i=Pa(t);t.__patch__(t._vnode,t.kept,!1,!0),t._vnode=t.kept,i(),e.call(t,n,r)}},render:function(t){for(var e=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),r=this.prevChildren=this.children,i=this.$slots.default||[],a=this.children=[],o=Za(this),s=0;s<i.length;s++){var c=i[s];c.tag&&c.key!=null&&String(c.key).indexOf("__vlist")!==0&&(a.push(c),n[c.key]=c,(c.data||(c.data={})).transition=o)}if(r){for(var u=[],f=[],s=0;s<r.length;s++){var c=r[s];c.data.transition=o,c.data.pos=c.elm.getBoundingClientRect(),n[c.key]?u.push(c):f.push(c)}this.kept=t(e,null,u),this.removed=f}return t(e,null,a)},updated:function(){var t=this.prevChildren,e=this.moveClass||(this.name||"v")+"-move";!t.length||!this.hasMove(t[0].elm,e)||(t.forEach(of),t.forEach(sf),t.forEach(cf),this._reflow=document.body.offsetHeight,t.forEach(function(n){if(n.data.moved){var r=n.elm,i=r.style;Bt(r,e),i.transform=i.WebkitTransform=i.transitionDuration="",r.addEventListener(cn,r._moveCb=function a(o){o&&o.target!==r||(!o||/transform$/.test(o.propertyName))&&(r.removeEventListener(cn,a),r._moveCb=null,mt(r,e))})}}))},methods:{hasMove:function(t,e){if(!Wa)return!1;if(this._hasMove)return this._hasMove;var n=t.cloneNode();t._transitionClasses&&t._transitionClasses.forEach(function(i){Ba(n,i)}),Ha(n,e),n.style.display="none",this.$el.appendChild(n);var r=Ka(n);return this.$el.removeChild(n),this._hasMove=r.hasTransform}}};function of(t){t.elm._moveCb&&t.elm._moveCb(),t.elm._enterCb&&t.elm._enterCb()}function sf(t){t.data.newPos=t.elm.getBoundingClientRect()}function cf(t){var e=t.data.pos,n=t.data.newPos,r=e.left-n.left,i=e.top-n.top;if(r||i){t.data.moved=!0;var a=t.elm.style;a.transform=a.WebkitTransform="translate(".concat(r,"px,").concat(i,"px)"),a.transitionDuration="0s"}}var uf={Transition:rf,TransitionGroup:af};B.config.mustUseProp=Kc;B.config.isReservedTag=Na;B.config.isReservedAttr=qc;B.config.getTagNamespace=iu;B.config.isUnknownElement=au;N(B.options.directives,Qu);N(B.options.components,uf);B.prototype.__patch__=rt?Yu:H;B.prototype.$mount=function(t,e){return t=t&&rt?ou(t):void 0,Zs(this,t,e)};rt&&setTimeout(function(){at.devtools&&Ze&&Ze.emit("init",B)},0);var ff=!0;B.util.warn;function lf(){return eo().__VUE_DEVTOOLS_GLOBAL_HOOK__}function eo(){return typeof navigator<"u"&&typeof window<"u"?window:typeof global<"u"?global:{}}const pf=typeof Proxy=="function",df="devtools-plugin:setup",hf="plugin:settings:set";let Vt,nr;function vf(){var t;return Vt!==void 0||(typeof window<"u"&&window.performance?(Vt=!0,nr=window.performance):typeof global<"u"&&((t=global.perf_hooks)===null||t===void 0?void 0:t.performance)?(Vt=!0,nr=global.perf_hooks.performance):Vt=!1),Vt}function gf(){return vf()?nr.now():Date.now()}class mf{constructor(e,n){this.target=null,this.targetQueue=[],this.onQueue=[],this.plugin=e,this.hook=n;const r={};if(e.settings)for(const o in e.settings){const s=e.settings[o];r[o]=s.defaultValue}const i=`__vue-devtools-plugin-settings__${e.id}`;let a=Object.assign({},r);try{const o=localStorage.getItem(i),s=JSON.parse(o);Object.assign(a,s)}catch(o){}this.fallbacks={getSettings(){return a},setSettings(o){try{localStorage.setItem(i,JSON.stringify(o))}catch(s){}a=o},now(){return gf()}},n&&n.on(hf,(o,s)=>{o===this.plugin.id&&this.fallbacks.setSettings(s)}),this.proxiedOn=new Proxy({},{get:(o,s)=>this.target?this.target.on[s]:(...c)=>{this.onQueue.push({method:s,args:c})}}),this.proxiedTarget=new Proxy({},{get:(o,s)=>this.target?this.target[s]:s==="on"?this.proxiedOn:Object.keys(this.fallbacks).includes(s)?(...c)=>(this.targetQueue.push({method:s,args:c,resolve:()=>{}}),this.fallbacks[s](...c)):(...c)=>new Promise(u=>{this.targetQueue.push({method:s,args:c,resolve:u})})})}async setRealTarget(e){this.target=e;for(const n of this.onQueue)this.target.on[n.method](...n.args);for(const n of this.targetQueue)n.resolve(await this.target[n.method](...n.args))}}function no(t,e){const n=t,r=eo(),i=lf(),a=pf&&n.enableEarlyProxy;if(i&&(r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__||!a))i.emit(df,t,e);else{const o=a?new mf(n,i):null;(r.__VUE_DEVTOOLS_PLUGINS__=r.__VUE_DEVTOOLS_PLUGINS__||[]).push({pluginDescriptor:n,setupFn:e,proxy:o}),o&&e(o.proxiedTarget)}}/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */const bf=Symbol();var zt;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(zt||(zt={}));const ro=typeof window<"u",io=typeof __VUE_PROD_DEVTOOLS__<"u"&&__VUE_PROD_DEVTOOLS__&&!0&&ro,Fi=(()=>typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof global=="object"&&global.global===global?global:typeof globalThis=="object"?globalThis:{HTMLElement:null})();function _f(t,{autoBom:e=!1}={}){return e&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t}function Ir(t,e,n){const r=new XMLHttpRequest;r.open("GET",t),r.responseType="blob",r.onload=function(){so(r.response,e,n)},r.onerror=function(){console.error("could not download file")},r.send()}function ao(t){const e=new XMLHttpRequest;e.open("HEAD",t,!1);try{e.send()}catch(n){}return e.status>=200&&e.status<=299}function We(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(e){const n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(n)}}const Ge=typeof navigator=="object"?navigator:{userAgent:""},oo=(()=>/Macintosh/.test(Ge.userAgent)&&/AppleWebKit/.test(Ge.userAgent)&&!/Safari/.test(Ge.userAgent))(),so=ro?typeof HTMLAnchorElement<"u"&&"download"in HTMLAnchorElement.prototype&&!oo?yf:"msSaveOrOpenBlob"in Ge?wf:Cf:()=>{};function yf(t,e="download",n){const r=document.createElement("a");r.download=e,r.rel="noopener",typeof t=="string"?(r.href=t,r.origin!==location.origin?ao(r.href)?Ir(t,e,n):(r.target="_blank",We(r)):We(r)):(r.href=URL.createObjectURL(t),setTimeout(function(){URL.revokeObjectURL(r.href)},4e4),setTimeout(function(){We(r)},0))}function wf(t,e="download",n){if(typeof t=="string")if(ao(t))Ir(t,e,n);else{const r=document.createElement("a");r.href=t,r.target="_blank",setTimeout(function(){We(r)})}else navigator.msSaveOrOpenBlob(_f(t,n),e)}function Cf(t,e,n,r){if(r=r||open("","_blank"),r&&(r.document.title=r.document.body.innerText="downloading..."),typeof t=="string")return Ir(t,e,n);const i=t.type==="application/octet-stream",a=/constructor/i.test(String(Fi.HTMLElement))||"safari"in Fi,o=/CriOS\/[\d]+/.test(navigator.userAgent);if((o||i&&a||oo)&&typeof FileReader<"u"){const s=new FileReader;s.onloadend=function(){let c=s.result;if(typeof c!="string")throw r=null,new Error("Wrong reader.result type");c=o?c:c.replace(/^data:[^;]*;/,"data:attachment/file;"),r?r.location.href=c:location.assign(c),r=null},s.readAsDataURL(t)}else{const s=URL.createObjectURL(t);r?r.location.assign(s):location.href=s,r=null,setTimeout(function(){URL.revokeObjectURL(s)},4e4)}}function q(t,e){const n="\u{1F34D} "+t;typeof __VUE_DEVTOOLS_TOAST__=="function"?__VUE_DEVTOOLS_TOAST__(n,e):e==="error"?console.error(n):e==="warn"?console.warn(n):console.log(n)}function kr(t){return"_a"in t&&"install"in t}function co(){if(!("clipboard"in navigator))return q("Your browser doesn't support the Clipboard API","error"),!0}function uo(t){return t instanceof Error&&t.message.toLowerCase().includes("document is not focused")?(q('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.',"warn"),!0):!1}async function xf(t){if(!co())try{await navigator.clipboard.writeText(JSON.stringify(t.state.value)),q("Global state copied to clipboard.")}catch(e){if(uo(e))return;q("Failed to serialize the state. Check the console for more details.","error"),console.error(e)}}async function Sf(t){if(!co())try{fo(t,JSON.parse(await navigator.clipboard.readText())),q("Global state pasted from clipboard.")}catch(e){if(uo(e))return;q("Failed to deserialize the state from clipboard. Check the console for more details.","error"),console.error(e)}}async function Of(t){try{so(new Blob([JSON.stringify(t.state.value)],{type:"text/plain;charset=utf-8"}),"pinia-state.json")}catch(e){q("Failed to export the state as JSON. Check the console for more details.","error"),console.error(e)}}let vt;function $f(){vt||(vt=document.createElement("input"),vt.type="file",vt.accept=".json");function t(){return new Promise((e,n)=>{vt.onchange=async()=>{const r=vt.files;if(!r)return e(null);const i=r.item(0);return e(i?{text:await i.text(),file:i}:null)},vt.oncancel=()=>e(null),vt.onerror=n,vt.click()})}return t}async function Ef(t){try{const n=await $f()();if(!n)return;const{text:r,file:i}=n;fo(t,JSON.parse(r)),q(`Global state imported from "${i.name}".`)}catch(e){q("Failed to import the state from JSON. Check the console for more details.","error"),console.error(e)}}function fo(t,e){for(const n in e){const r=t.state.value[n];r?Object.assign(r,e[n]):t.state.value[n]=e[n]}}function ot(t){return{_custom:{display:t}}}const lo="\u{1F34D} Pinia (root)",rr="_root";function Af(t){return kr(t)?{id:rr,label:lo}:{id:t.$id,label:t.$id}}function Pf(t){if(kr(t)){const n=Array.from(t._s.keys()),r=t._s;return{state:n.map(a=>({editable:!0,key:a,value:t.state.value[a]})),getters:n.filter(a=>r.get(a)._getters).map(a=>{const o=r.get(a);return{editable:!1,key:a,value:o._getters.reduce((s,c)=>(s[c]=o[c],s),{})}})}}const e={state:Object.keys(t.$state).map(n=>({editable:!0,key:n,value:t.$state[n]}))};return t._getters&&t._getters.length&&(e.getters=t._getters.map(n=>({editable:!1,key:n,value:t[n]}))),t._customProperties.size&&(e.customProperties=Array.from(t._customProperties).map(n=>({editable:!0,key:n,value:t[n]}))),e}function Tf(t){return t?Array.isArray(t)?t.reduce((e,n)=>(e.keys.push(n.key),e.operations.push(n.type),e.oldValue[n.key]=n.oldValue,e.newValue[n.key]=n.newValue,e),{oldValue:{},keys:[],operations:[],newValue:{}}):{operation:ot(t.type),key:ot(t.key),oldValue:t.oldValue,newValue:t.newValue}:{}}function If(t){switch(t){case zt.direct:return"mutation";case zt.patchFunction:return"$patch";case zt.patchObject:return"$patch";default:return"unknown"}}let ie=!0;const qe=[],Ft="pinia:mutations",J="pinia",{assign:kf}=Object,fn=t=>"\u{1F34D} "+t;function Rf(t,e){no({id:"dev.esm.pinia",label:"Pinia \u{1F34D}",logo:"https://pinia.vuejs.org/logo.svg",packageName:"pinia",homepage:"https://pinia.vuejs.org",componentStateTypes:qe,app:t},n=>{typeof n.now!="function"&&q("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."),n.addTimelineLayer({id:Ft,label:"Pinia \u{1F34D}",color:15064968}),n.addInspector({id:J,label:"Pinia \u{1F34D}",icon:"storage",treeFilterPlaceholder:"Search stores",actions:[{icon:"content_copy",action:()=>{xf(e)},tooltip:"Serialize and copy the state"},{icon:"content_paste",action:async()=>{await Sf(e),n.sendInspectorTree(J),n.sendInspectorState(J)},tooltip:"Replace the state with the content of your clipboard"},{icon:"save",action:()=>{Of(e)},tooltip:"Save the state as a JSON file"},{icon:"folder_open",action:async()=>{await Ef(e),n.sendInspectorTree(J),n.sendInspectorState(J)},tooltip:"Import the state from a JSON file"}],nodeActions:[{icon:"restore",tooltip:'Reset the state (with "$reset")',action:r=>{const i=e._s.get(r);i?typeof i.$reset!="function"?q(`Cannot reset "${r}" store because it doesn't have a "$reset" method implemented.`,"warn"):(i.$reset(),q(`Store "${r}" reset.`)):q(`Cannot reset "${r}" store because it wasn't found.`,"warn")}}]}),n.on.inspectComponent((r,i)=>{const a=r.componentInstance&&r.componentInstance.proxy;if(a&&a._pStores){const o=r.componentInstance.proxy._pStores;Object.values(o).forEach(s=>{r.instanceData.state.push({type:fn(s.$id),key:"state",editable:!0,value:s._isOptionsAPI?{_custom:{value:_n(s.$state),actions:[{icon:"restore",tooltip:"Reset the state of this store",action:()=>s.$reset()}]}}:Object.keys(s.$state).reduce((c,u)=>(c[u]=s.$state[u],c),{})}),s._getters&&s._getters.length&&r.instanceData.state.push({type:fn(s.$id),key:"getters",editable:!1,value:s._getters.reduce((c,u)=>{try{c[u]=s[u]}catch(f){c[u]=f}return c},{})})})}}),n.on.getInspectorTree(r=>{if(r.app===t&&r.inspectorId===J){let i=[e];i=i.concat(Array.from(e._s.values())),r.rootNodes=(r.filter?i.filter(a=>"$id"in a?a.$id.toLowerCase().includes(r.filter.toLowerCase()):lo.toLowerCase().includes(r.filter.toLowerCase())):i).map(Af)}}),n.on.getInspectorState(r=>{if(r.app===t&&r.inspectorId===J){const i=r.nodeId===rr?e:e._s.get(r.nodeId);if(!i)return;i&&(r.state=Pf(i))}}),n.on.editInspectorState((r,i)=>{if(r.app===t&&r.inspectorId===J){const a=r.nodeId===rr?e:e._s.get(r.nodeId);if(!a)return q(`store "${r.nodeId}" not found`,"error");const{path:o}=r;kr(a)?o.unshift("state"):(o.length!==1||!a._customProperties.has(o[0])||o[0]in a.$state)&&o.unshift("$state"),ie=!1,r.set(a,o,r.state.value),ie=!0}}),n.on.editComponentState(r=>{if(r.type.startsWith("\u{1F34D}")){const i=r.type.replace(/^🍍\s*/,""),a=e._s.get(i);if(!a)return q(`store "${i}" not found`,"error");const{path:o}=r;if(o[0]!=="state")return q(`Invalid path for store "${i}":
${o}
Only state can be modified.`);o[0]="$state",ie=!1,r.set(a,o,r.state.value),ie=!0}})})}function jf(t,e){qe.includes(fn(e.$id))||qe.push(fn(e.$id)),no({id:"dev.esm.pinia",label:"Pinia \u{1F34D}",logo:"https://pinia.vuejs.org/logo.svg",packageName:"pinia",homepage:"https://pinia.vuejs.org",componentStateTypes:qe,app:t,settings:{logStoreChanges:{label:"Notify about new/deleted stores",type:"boolean",defaultValue:!0}}},n=>{const r=typeof n.now=="function"?n.now.bind(n):Date.now;e.$onAction(({after:o,onError:s,name:c,args:u})=>{const f=po++;n.addTimelineEvent({layerId:Ft,event:{time:r(),title:"\u{1F6EB} "+c,subtitle:"start",data:{store:ot(e.$id),action:ot(c),args:u},groupId:f}}),o(h=>{Ot=void 0,n.addTimelineEvent({layerId:Ft,event:{time:r(),title:"\u{1F6EC} "+c,subtitle:"end",data:{store:ot(e.$id),action:ot(c),args:u,result:h},groupId:f}})}),s(h=>{Ot=void 0,n.addTimelineEvent({layerId:Ft,event:{time:r(),logType:"error",title:"\u{1F4A5} "+c,subtitle:"end",data:{store:ot(e.$id),action:ot(c),args:u,error:h},groupId:f}})})},!0),e._customProperties.forEach(o=>{fs(()=>cs(e[o]),(s,c)=>{n.notifyComponentUpdate(),n.sendInspectorState(J),ie&&n.addTimelineEvent({layerId:Ft,event:{time:r(),title:"Change",subtitle:o,data:{newValue:s,oldValue:c},groupId:Ot}})},{deep:!0})}),e.$subscribe(({events:o,type:s},c)=>{if(n.notifyComponentUpdate(),n.sendInspectorState(J),!ie)return;const u={time:r(),title:If(s),data:kf({store:ot(e.$id)},Tf(o)),groupId:Ot};s===zt.patchFunction?u.subtitle="\u2935\uFE0F":s===zt.patchObject?u.subtitle="\u{1F9E9}":o&&!Array.isArray(o)&&(u.subtitle=o.type),o&&(u.data["rawEvent(s)"]={_custom:{display:"DebuggerEvent",type:"object",tooltip:"raw DebuggerEvent[]",value:o}}),n.addTimelineEvent({layerId:Ft,event:u})},{detached:!0,flush:"sync"});const i=e._hotUpdate;e._hotUpdate=ga(o=>{i(o),n.addTimelineEvent({layerId:Ft,event:{time:r(),title:"\u{1F525} "+e.$id,subtitle:"HMR update",data:{store:ot(e.$id),info:ot("HMR update")}}}),n.notifyComponentUpdate(),n.sendInspectorTree(J),n.sendInspectorState(J)});const{$dispose:a}=e;e.$dispose=()=>{a(),n.notifyComponentUpdate(),n.sendInspectorTree(J),n.sendInspectorState(J),n.getSettings().logStoreChanges&&q(`Disposed "${e.$id}" store \u{1F5D1}`)},n.notifyComponentUpdate(),n.sendInspectorTree(J),n.sendInspectorState(J),n.getSettings().logStoreChanges&&q(`"${e.$id}" store installed \u{1F195}`)})}let po=0,Ot;function Ui(t,e,n){const r=e.reduce((i,a)=>(i[a]=_n(t)[a],i),{});for(const i in r)t[i]=function(){const a=po,o=n?new Proxy(t,{get(...c){return Ot=a,Reflect.get(...c)},set(...c){return Ot=a,Reflect.set(...c)}}):t;Ot=a;const s=r[i].apply(o,arguments);return Ot=void 0,s}}function Lf({app:t,store:e,options:n}){if(e.$id.startsWith("__hot:"))return;e._isOptionsAPI=!!n.state,Ui(e,Object.keys(n.actions),e._isOptionsAPI);const r=e._hotUpdate;_n(e)._hotUpdate=function(i){r.apply(this,arguments),Ui(e,Object.keys(i._hmrPayload.actions),!!e._isOptionsAPI)},jf(t,e)}function Df(){const t=ps(!0),e=t.run(()=>os({}));let n=[];const r=ga({install(i){},use(i){return!this._a&&!ff||n.push(i),this},_p:n,_a:null,_e:t,_s:new Map,state:e});return io&&typeof Proxy<"u"&&r.use(Lf),r}const Nf=function(t){t.mixin({beforeCreate(){const e=this.$options;if(e.pinia){const n=e.pinia;if(!this._provided){const r={};Object.defineProperty(this,"_provided",{get:()=>r,set:i=>Object.assign(r,i)})}this._provided[bf]=n,this.$pinia||(this.$pinia=n),n._a=this,io&&Rf(n._a,n)}else!this.$pinia&&e.parent&&e.parent.$pinia&&(this.$pinia=e.parent.$pinia)},destroyed(){delete this._pStores}})},Mf="modulepreload",Ff=function(t){return"/"+t},Hi={},Qt=function(e,n,r){if(!n||n.length===0)return e();const i=document.getElementsByTagName("link");return Promise.all(n.map(a=>{if(a=Ff(a),a in Hi)return;Hi[a]=!0;const o=a.endsWith(".css"),s=o?'[rel="stylesheet"]':"";if(!!r)for(let f=i.length-1;f>=0;f--){const h=i[f];if(h.href===a&&(!o||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${s}`))return;const u=document.createElement("link");if(u.rel=o?"stylesheet":Mf,o||(u.as="script",u.crossOrigin=""),u.href=a,document.head.appendChild(u),o)return new Promise((f,h)=>{u.addEventListener("load",f),u.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${a}`)))})})).then(()=>e())};/*!
  * vue-router v3.6.5
  * (c) 2022 Evan You
  * @license MIT
  */function st(t,e){for(var n in e)t[n]=e[n];return t}var Uf=/[!'()*]/g,Hf=function(t){return"%"+t.charCodeAt(0).toString(16)},Bf=/%2C/g,Zt=function(t){return encodeURIComponent(t).replace(Uf,Hf).replace(Bf,",")};function ir(t){try{return decodeURIComponent(t)}catch(e){}return t}function zf(t,e,n){e===void 0&&(e={});var r=n||Wf,i;try{i=r(t||"")}catch(s){i={}}for(var a in e){var o=e[a];i[a]=Array.isArray(o)?o.map(Bi):Bi(o)}return i}var Bi=function(t){return t==null||typeof t=="object"?t:String(t)};function Wf(t){var e={};return t=t.trim().replace(/^(\?|#|&)/,""),t&&t.split("&").forEach(function(n){var r=n.replace(/\+/g," ").split("="),i=ir(r.shift()),a=r.length>0?ir(r.join("=")):null;e[i]===void 0?e[i]=a:Array.isArray(e[i])?e[i].push(a):e[i]=[e[i],a]}),e}function Gf(t){var e=t?Object.keys(t).map(function(n){var r=t[n];if(r===void 0)return"";if(r===null)return Zt(n);if(Array.isArray(r)){var i=[];return r.forEach(function(a){a!==void 0&&(a===null?i.push(Zt(n)):i.push(Zt(n)+"="+Zt(a)))}),i.join("&")}return Zt(n)+"="+Zt(r)}).filter(function(n){return n.length>0}).join("&"):null;return e?"?"+e:""}var ln=/\/?$/;function pn(t,e,n,r){var i=r&&r.options.stringifyQuery,a=e.query||{};try{a=ar(a)}catch(s){}var o={name:e.name||t&&t.name,meta:t&&t.meta||{},path:e.path||"/",hash:e.hash||"",query:a,params:e.params||{},fullPath:zi(e,i),matched:t?qf(t):[]};return n&&(o.redirectedFrom=zi(n,i)),Object.freeze(o)}function ar(t){if(Array.isArray(t))return t.map(ar);if(t&&typeof t=="object"){var e={};for(var n in t)e[n]=ar(t[n]);return e}else return t}var jt=pn(null,{path:"/"});function qf(t){for(var e=[];t;)e.unshift(t),t=t.parent;return e}function zi(t,e){var n=t.path,r=t.query;r===void 0&&(r={});var i=t.hash;i===void 0&&(i="");var a=e||Gf;return(n||"/")+a(r)+i}function ho(t,e,n){return e===jt?t===e:e?t.path&&e.path?t.path.replace(ln,"")===e.path.replace(ln,"")&&(n||t.hash===e.hash&&Je(t.query,e.query)):t.name&&e.name?t.name===e.name&&(n||t.hash===e.hash&&Je(t.query,e.query)&&Je(t.params,e.params)):!1:!1}function Je(t,e){if(t===void 0&&(t={}),e===void 0&&(e={}),!t||!e)return t===e;var n=Object.keys(t).sort(),r=Object.keys(e).sort();return n.length!==r.length?!1:n.every(function(i,a){var o=t[i],s=r[a];if(s!==i)return!1;var c=e[i];return o==null||c==null?o===c:typeof o=="object"&&typeof c=="object"?Je(o,c):String(o)===String(c)})}function Jf(t,e){return t.path.replace(ln,"/").indexOf(e.path.replace(ln,"/"))===0&&(!e.hash||t.hash===e.hash)&&Kf(t.query,e.query)}function Kf(t,e){for(var n in e)if(!(n in t))return!1;return!0}function vo(t){for(var e=0;e<t.matched.length;e++){var n=t.matched[e];for(var r in n.instances){var i=n.instances[r],a=n.enteredCbs[r];if(!(!i||!a)){delete n.enteredCbs[r];for(var o=0;o<a.length;o++)i._isBeingDestroyed||a[o](i)}}}}var Yf={name:"RouterView",functional:!0,props:{name:{type:String,default:"default"}},render:function(e,n){var r=n.props,i=n.children,a=n.parent,o=n.data;o.routerView=!0;for(var s=a.$createElement,c=r.name,u=a.$route,f=a._routerViewCache||(a._routerViewCache={}),h=0,v=!1;a&&a._routerRoot!==a;){var m=a.$vnode?a.$vnode.data:{};m.routerView&&h++,m.keepAlive&&a._directInactive&&a._inactive&&(v=!0),a=a.$parent}if(o.routerViewDepth=h,v){var _=f[c],y=_&&_.component;return y?(_.configProps&&Wi(y,o,_.route,_.configProps),s(y,o,i)):s()}var b=u.matched[h],C=b&&b.components[c];if(!b||!C)return f[c]=null,s();f[c]={component:C},o.registerRouteInstance=function(A,T){var L=b.instances[c];(T&&L!==A||!T&&L===A)&&(b.instances[c]=T)},(o.hook||(o.hook={})).prepatch=function(A,T){b.instances[c]=T.componentInstance},o.hook.init=function(A){A.data.keepAlive&&A.componentInstance&&A.componentInstance!==b.instances[c]&&(b.instances[c]=A.componentInstance),vo(u)};var x=b.props&&b.props[c];return x&&(st(f[c],{route:u,configProps:x}),Wi(C,o,u,x)),s(C,o,i)}};function Wi(t,e,n,r){var i=e.props=Xf(n,r);if(i){i=e.props=st({},i);var a=e.attrs=e.attrs||{};for(var o in i)(!t.props||!(o in t.props))&&(a[o]=i[o],delete i[o])}}function Xf(t,e){switch(typeof e){case"undefined":return;case"object":return e;case"function":return e(t);case"boolean":return e?t.params:void 0}}function go(t,e,n){var r=t.charAt(0);if(r==="/")return t;if(r==="?"||r==="#")return e+t;var i=e.split("/");(!n||!i[i.length-1])&&i.pop();for(var a=t.replace(/^\//,"").split("/"),o=0;o<a.length;o++){var s=a[o];s===".."?i.pop():s!=="."&&i.push(s)}return i[0]!==""&&i.unshift(""),i.join("/")}function Vf(t){var e="",n="",r=t.indexOf("#");r>=0&&(e=t.slice(r),t=t.slice(0,r));var i=t.indexOf("?");return i>=0&&(n=t.slice(i+1),t=t.slice(0,i)),{path:t,query:n,hash:e}}function $t(t){return t.replace(/\/(?:\s*\/)+/g,"/")}var dn=Array.isArray||function(t){return Object.prototype.toString.call(t)=="[object Array]"},pe=_o,Qf=Rr,Zf=rl,tl=mo,el=bo,nl=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function Rr(t,e){for(var n=[],r=0,i=0,a="",o=e&&e.delimiter||"/",s;(s=nl.exec(t))!=null;){var c=s[0],u=s[1],f=s.index;if(a+=t.slice(i,f),i=f+c.length,u){a+=u[1];continue}var h=t[i],v=s[2],m=s[3],_=s[4],y=s[5],b=s[6],C=s[7];a&&(n.push(a),a="");var x=v!=null&&h!=null&&h!==v,A=b==="+"||b==="*",T=b==="?"||b==="*",L=s[2]||o,F=_||y;n.push({name:m||r++,prefix:v||"",delimiter:L,optional:T,repeat:A,partial:x,asterisk:!!C,pattern:F?ol(F):C?".*":"[^"+Ke(L)+"]+?"})}return i<t.length&&(a+=t.substr(i)),a&&n.push(a),n}function rl(t,e){return mo(Rr(t,e),e)}function il(t){return encodeURI(t).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function al(t){return encodeURI(t).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function mo(t,e){for(var n=new Array(t.length),r=0;r<t.length;r++)typeof t[r]=="object"&&(n[r]=new RegExp("^(?:"+t[r].pattern+")$",Lr(e)));return function(i,a){for(var o="",s=i||{},c=a||{},u=c.pretty?il:encodeURIComponent,f=0;f<t.length;f++){var h=t[f];if(typeof h=="string"){o+=h;continue}var v=s[h.name],m;if(v==null)if(h.optional){h.partial&&(o+=h.prefix);continue}else throw new TypeError('Expected "'+h.name+'" to be defined');if(dn(v)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(v)+"`");if(v.length===0){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var _=0;_<v.length;_++){if(m=u(v[_]),!n[f].test(m))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(m)+"`");o+=(_===0?h.prefix:h.delimiter)+m}continue}if(m=h.asterisk?al(v):u(v),!n[f].test(m))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+m+'"');o+=h.prefix+m}return o}}function Ke(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function ol(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function jr(t,e){return t.keys=e,t}function Lr(t){return t&&t.sensitive?"":"i"}function sl(t,e){var n=t.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)e.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return jr(t,e)}function cl(t,e,n){for(var r=[],i=0;i<t.length;i++)r.push(_o(t[i],e,n).source);var a=new RegExp("(?:"+r.join("|")+")",Lr(n));return jr(a,e)}function ul(t,e,n){return bo(Rr(t,n),e,n)}function bo(t,e,n){dn(e)||(n=e||n,e=[]),n=n||{};for(var r=n.strict,i=n.end!==!1,a="",o=0;o<t.length;o++){var s=t[o];if(typeof s=="string")a+=Ke(s);else{var c=Ke(s.prefix),u="(?:"+s.pattern+")";e.push(s),s.repeat&&(u+="(?:"+c+u+")*"),s.optional?s.partial?u=c+"("+u+")?":u="(?:"+c+"("+u+"))?":u=c+"("+u+")",a+=u}}var f=Ke(n.delimiter||"/"),h=a.slice(-f.length)===f;return r||(a=(h?a.slice(0,-f.length):a)+"(?:"+f+"(?=$))?"),i?a+="$":a+=r&&h?"":"(?="+f+"|$)",jr(new RegExp("^"+a,Lr(n)),e)}function _o(t,e,n){return dn(e)||(n=e||n,e=[]),n=n||{},t instanceof RegExp?sl(t,e):dn(t)?cl(t,e,n):ul(t,e,n)}pe.parse=Qf;pe.compile=Zf;pe.tokensToFunction=tl;pe.tokensToRegExp=el;var Gi=Object.create(null);function Ye(t,e,n){e=e||{};try{var r=Gi[t]||(Gi[t]=pe.compile(t));return typeof e.pathMatch=="string"&&(e[0]=e.pathMatch),r(e,{pretty:!0})}catch(i){return""}finally{delete e[0]}}function Dr(t,e,n,r){var i=typeof t=="string"?{path:t}:t;if(i._normalized)return i;if(i.name){i=st({},t);var a=i.params;return a&&typeof a=="object"&&(i.params=st({},a)),i}if(!i.path&&i.params&&e){i=st({},i),i._normalized=!0;var o=st(st({},e.params),i.params);if(e.name)i.name=e.name,i.params=o;else if(e.matched.length){var s=e.matched[e.matched.length-1].path;i.path=Ye(s,o,"path "+e.path)}return i}var c=Vf(i.path||""),u=e&&e.path||"/",f=c.path?go(c.path,u,n||i.append):u,h=zf(c.query,i.query,r&&r.options.parseQuery),v=i.hash||c.hash;return v&&v.charAt(0)!=="#"&&(v="#"+v),{_normalized:!0,path:f,query:h,hash:v}}var fl=[String,Object],ll=[String,Array],qi=function(){},pl={name:"RouterLink",props:{to:{type:fl,required:!0},tag:{type:String,default:"a"},custom:Boolean,exact:Boolean,exactPath:Boolean,append:Boolean,replace:Boolean,activeClass:String,exactActiveClass:String,ariaCurrentValue:{type:String,default:"page"},event:{type:ll,default:"click"}},render:function(e){var n=this,r=this.$router,i=this.$route,a=r.resolve(this.to,i,this.append),o=a.location,s=a.route,c=a.href,u={},f=r.options.linkActiveClass,h=r.options.linkExactActiveClass,v=f==null?"router-link-active":f,m=h==null?"router-link-exact-active":h,_=this.activeClass==null?v:this.activeClass,y=this.exactActiveClass==null?m:this.exactActiveClass,b=s.redirectedFrom?pn(null,Dr(s.redirectedFrom),null,r):s;u[y]=ho(i,b,this.exactPath),u[_]=this.exact||this.exactPath?u[y]:Jf(i,b);var C=u[y]?this.ariaCurrentValue:null,x=function(p){Ji(p)&&(n.replace?r.replace(o,qi):r.push(o,qi))},A={click:Ji};Array.isArray(this.event)?this.event.forEach(function(p){A[p]=x}):A[this.event]=x;var T={class:u},L=!this.$scopedSlots.$hasNormal&&this.$scopedSlots.default&&this.$scopedSlots.default({href:c,route:s,navigate:x,isActive:u[_],isExactActive:u[y]});if(L){if(L.length===1)return L[0];if(L.length>1||!L.length)return L.length===0?e():e("span",{},L)}if(this.tag==="a")T.on=A,T.attrs={href:c,"aria-current":C};else{var F=yo(this.$slots.default);if(F){F.isStatic=!1;var U=F.data=st({},F.data);U.on=U.on||{};for(var W in U.on){var pt=U.on[W];W in A&&(U.on[W]=Array.isArray(pt)?pt:[pt])}for(var dt in A)dt in U.on?U.on[dt].push(A[dt]):U.on[dt]=x;var ht=F.data.attrs=st({},F.data.attrs);ht.href=c,ht["aria-current"]=C}else T.on=A}return e(this.tag,T,this.$slots.default)}};function Ji(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){var e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function yo(t){if(t){for(var e,n=0;n<t.length;n++)if(e=t[n],e.tag==="a"||e.children&&(e=yo(e.children)))return e}}var hn;function or(t){if(!(or.installed&&hn===t)){or.installed=!0,hn=t;var e=function(i){return i!==void 0},n=function(i,a){var o=i.$options._parentVnode;e(o)&&e(o=o.data)&&e(o=o.registerRouteInstance)&&o(i,a)};t.mixin({beforeCreate:function(){e(this.$options.router)?(this._routerRoot=this,this._router=this.$options.router,this._router.init(this),t.util.defineReactive(this,"_route",this._router.history.current)):this._routerRoot=this.$parent&&this.$parent._routerRoot||this,n(this,this)},destroyed:function(){n(this)}}),Object.defineProperty(t.prototype,"$router",{get:function(){return this._routerRoot._router}}),Object.defineProperty(t.prototype,"$route",{get:function(){return this._routerRoot._route}}),t.component("RouterView",Yf),t.component("RouterLink",pl);var r=t.config.optionMergeStrategies;r.beforeRouteEnter=r.beforeRouteLeave=r.beforeRouteUpdate=r.created}}var Pe=typeof window<"u";function Me(t,e,n,r,i){var a=e||[],o=n||Object.create(null),s=r||Object.create(null);t.forEach(function(f){sr(a,o,s,f,i)});for(var c=0,u=a.length;c<u;c++)a[c]==="*"&&(a.push(a.splice(c,1)[0]),u--,c--);return{pathList:a,pathMap:o,nameMap:s}}function sr(t,e,n,r,i,a){var o=r.path,s=r.name,c=r.pathToRegexpOptions||{},u=hl(o,i,c.strict);typeof r.caseSensitive=="boolean"&&(c.sensitive=r.caseSensitive);var f={path:u,regex:dl(u,c),components:r.components||{default:r.component},alias:r.alias?typeof r.alias=="string"?[r.alias]:r.alias:[],instances:{},enteredCbs:{},name:s,parent:i,matchAs:a,redirect:r.redirect,beforeEnter:r.beforeEnter,meta:r.meta||{},props:r.props==null?{}:r.components?r.props:{default:r.props}};if(r.children&&r.children.forEach(function(y){var b=a?$t(a+"/"+y.path):void 0;sr(t,e,n,y,f,b)}),e[f.path]||(t.push(f.path),e[f.path]=f),r.alias!==void 0)for(var h=Array.isArray(r.alias)?r.alias:[r.alias],v=0;v<h.length;++v){var m=h[v],_={path:m,children:r.children};sr(t,e,n,_,i,f.path||"/")}s&&(n[s]||(n[s]=f))}function dl(t,e){var n=pe(t,[],e);return n}function hl(t,e,n){return n||(t=t.replace(/\/$/,"")),t[0]==="/"||e==null?t:$t(e.path+"/"+t)}function vl(t,e){var n=Me(t),r=n.pathList,i=n.pathMap,a=n.nameMap;function o(m){Me(m,r,i,a)}function s(m,_){var y=typeof m!="object"?a[m]:void 0;Me([_||m],r,i,a,y),y&&y.alias.length&&Me(y.alias.map(function(b){return{path:b,children:[_]}}),r,i,a,y)}function c(){return r.map(function(m){return i[m]})}function u(m,_,y){var b=Dr(m,_,!1,e),C=b.name;if(C){var x=a[C];if(!x)return v(null,b);var A=x.regex.keys.filter(function(W){return!W.optional}).map(function(W){return W.name});if(typeof b.params!="object"&&(b.params={}),_&&typeof _.params=="object")for(var T in _.params)!(T in b.params)&&A.indexOf(T)>-1&&(b.params[T]=_.params[T]);return b.path=Ye(x.path,b.params),v(x,b,y)}else if(b.path){b.params={};for(var L=0;L<r.length;L++){var F=r[L],U=i[F];if(gl(U.regex,b.path,b.params))return v(U,b,y)}}return v(null,b)}function f(m,_){var y=m.redirect,b=typeof y=="function"?y(pn(m,_,null,e)):y;if(typeof b=="string"&&(b={path:b}),!b||typeof b!="object")return v(null,_);var C=b,x=C.name,A=C.path,T=_.query,L=_.hash,F=_.params;if(T=C.hasOwnProperty("query")?C.query:T,L=C.hasOwnProperty("hash")?C.hash:L,F=C.hasOwnProperty("params")?C.params:F,x)return a[x],u({_normalized:!0,name:x,query:T,hash:L,params:F},void 0,_);if(A){var U=ml(A,m),W=Ye(U,F);return u({_normalized:!0,path:W,query:T,hash:L},void 0,_)}else return v(null,_)}function h(m,_,y){var b=Ye(y,_.params),C=u({_normalized:!0,path:b});if(C){var x=C.matched,A=x[x.length-1];return _.params=C.params,v(A,_)}return v(null,_)}function v(m,_,y){return m&&m.redirect?f(m,y||_):m&&m.matchAs?h(m,_,m.matchAs):pn(m,_,y,e)}return{match:u,addRoute:s,getRoutes:c,addRoutes:o}}function gl(t,e,n){var r=e.match(t);if(r){if(!n)return!0}else return!1;for(var i=1,a=r.length;i<a;++i){var o=t.keys[i-1];o&&(n[o.name||"pathMatch"]=typeof r[i]=="string"?ir(r[i]):r[i])}return!0}function ml(t,e){return go(t,e.parent?e.parent.path:"/",!0)}var bl=Pe&&window.performance&&window.performance.now?window.performance:Date;function wo(){return bl.now().toFixed(3)}var Co=wo();function wn(){return Co}function xo(t){return Co=t}var So=Object.create(null);function Oo(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");var t=window.location.protocol+"//"+window.location.host,e=window.location.href.replace(t,""),n=st({},window.history.state);return n.key=wn(),window.history.replaceState(n,"",e),window.addEventListener("popstate",Ki),function(){window.removeEventListener("popstate",Ki)}}function Et(t,e,n,r){if(!!t.app){var i=t.options.scrollBehavior;!i||t.app.$nextTick(function(){var a=_l(),o=i.call(t,e,n,r?a:null);!o||(typeof o.then=="function"?o.then(function(s){Vi(s,a)}).catch(function(s){}):Vi(o,a))})}}function $o(){var t=wn();t&&(So[t]={x:window.pageXOffset,y:window.pageYOffset})}function Ki(t){$o(),t.state&&t.state.key&&xo(t.state.key)}function _l(){var t=wn();if(t)return So[t]}function yl(t,e){var n=document.documentElement,r=n.getBoundingClientRect(),i=t.getBoundingClientRect();return{x:i.left-r.left-e.x,y:i.top-r.top-e.y}}function Yi(t){return se(t.x)||se(t.y)}function Xi(t){return{x:se(t.x)?t.x:window.pageXOffset,y:se(t.y)?t.y:window.pageYOffset}}function wl(t){return{x:se(t.x)?t.x:0,y:se(t.y)?t.y:0}}function se(t){return typeof t=="number"}var Cl=/^#\d/;function Vi(t,e){var n=typeof t=="object";if(n&&typeof t.selector=="string"){var r=Cl.test(t.selector)?document.getElementById(t.selector.slice(1)):document.querySelector(t.selector);if(r){var i=t.offset&&typeof t.offset=="object"?t.offset:{};i=wl(i),e=yl(r,i)}else Yi(t)&&(e=Xi(t))}else n&&Yi(t)&&(e=Xi(t));e&&("scrollBehavior"in document.documentElement.style?window.scrollTo({left:e.x,top:e.y,behavior:t.behavior}):window.scrollTo(e.x,e.y))}var At=Pe&&function(){var t=window.navigator.userAgent;return(t.indexOf("Android 2.")!==-1||t.indexOf("Android 4.0")!==-1)&&t.indexOf("Mobile Safari")!==-1&&t.indexOf("Chrome")===-1&&t.indexOf("Windows Phone")===-1?!1:window.history&&typeof window.history.pushState=="function"}();function vn(t,e){$o();var n=window.history;try{if(e){var r=st({},n.state);r.key=wn(),n.replaceState(r,"",t)}else n.pushState({key:xo(wo())},"",t)}catch(i){window.location[e?"replace":"assign"](t)}}function cr(t){vn(t,!0)}var Yt={redirected:2,aborted:4,cancelled:8,duplicated:16};function xl(t,e){return Cn(t,e,Yt.redirected,'Redirected when going from "'+t.fullPath+'" to "'+El(e)+'" via a navigation guard.')}function Sl(t,e){var n=Cn(t,e,Yt.duplicated,'Avoided redundant navigation to current location: "'+t.fullPath+'".');return n.name="NavigationDuplicated",n}function Qi(t,e){return Cn(t,e,Yt.cancelled,'Navigation cancelled from "'+t.fullPath+'" to "'+e.fullPath+'" with a new navigation.')}function Ol(t,e){return Cn(t,e,Yt.aborted,'Navigation aborted from "'+t.fullPath+'" to "'+e.fullPath+'" via a navigation guard.')}function Cn(t,e,n,r){var i=new Error(r);return i._isRouter=!0,i.from=t,i.to=e,i.type=n,i}var $l=["params","query","hash"];function El(t){if(typeof t=="string")return t;if("path"in t)return t.path;var e={};return $l.forEach(function(n){n in t&&(e[n]=t[n])}),JSON.stringify(e,null,2)}function gn(t){return Object.prototype.toString.call(t).indexOf("Error")>-1}function xn(t,e){return gn(t)&&t._isRouter&&(e==null||t.type===e)}function Zi(t,e,n){var r=function(i){i>=t.length?n():t[i]?e(t[i],function(){r(i+1)}):r(i+1)};r(0)}function Al(t){return function(e,n,r){var i=!1,a=0,o=null;Eo(t,function(s,c,u,f){if(typeof s=="function"&&s.cid===void 0){i=!0,a++;var h=ta(function(y){Tl(y)&&(y=y.default),s.resolved=typeof y=="function"?y:hn.extend(y),u.components[f]=y,a--,a<=0&&r()}),v=ta(function(y){var b="Failed to resolve async component "+f+": "+y;o||(o=gn(y)?y:new Error(b),r(o))}),m;try{m=s(h,v)}catch(y){v(y)}if(m)if(typeof m.then=="function")m.then(h,v);else{var _=m.component;_&&typeof _.then=="function"&&_.then(h,v)}}}),i||r()}}function Eo(t,e){return Ao(t.map(function(n){return Object.keys(n.components).map(function(r){return e(n.components[r],n.instances[r],n,r)})}))}function Ao(t){return Array.prototype.concat.apply([],t)}var Pl=typeof Symbol=="function"&&typeof Symbol.toStringTag=="symbol";function Tl(t){return t.__esModule||Pl&&t[Symbol.toStringTag]==="Module"}function ta(t){var e=!1;return function(){for(var n=[],r=arguments.length;r--;)n[r]=arguments[r];if(!e)return e=!0,t.apply(this,n)}}var ft=function(e,n){this.router=e,this.base=Il(n),this.current=jt,this.pending=null,this.ready=!1,this.readyCbs=[],this.readyErrorCbs=[],this.errorCbs=[],this.listeners=[]};ft.prototype.listen=function(e){this.cb=e};ft.prototype.onReady=function(e,n){this.ready?e():(this.readyCbs.push(e),n&&this.readyErrorCbs.push(n))};ft.prototype.onError=function(e){this.errorCbs.push(e)};ft.prototype.transitionTo=function(e,n,r){var i=this,a;try{a=this.router.match(e,this.current)}catch(s){throw this.errorCbs.forEach(function(c){c(s)}),s}var o=this.current;this.confirmTransition(a,function(){i.updateRoute(a),n&&n(a),i.ensureURL(),i.router.afterHooks.forEach(function(s){s&&s(a,o)}),i.ready||(i.ready=!0,i.readyCbs.forEach(function(s){s(a)}))},function(s){r&&r(s),s&&!i.ready&&(!xn(s,Yt.redirected)||o!==jt)&&(i.ready=!0,i.readyErrorCbs.forEach(function(c){c(s)}))})};ft.prototype.confirmTransition=function(e,n,r){var i=this,a=this.current;this.pending=e;var o=function(y){!xn(y)&&gn(y)&&(i.errorCbs.length?i.errorCbs.forEach(function(b){b(y)}):console.error(y)),r&&r(y)},s=e.matched.length-1,c=a.matched.length-1;if(ho(e,a)&&s===c&&e.matched[s]===a.matched[c])return this.ensureURL(),e.hash&&Et(this.router,a,e,!1),o(Sl(a,e));var u=kl(this.current.matched,e.matched),f=u.updated,h=u.deactivated,v=u.activated,m=[].concat(jl(h),this.router.beforeHooks,Ll(f),v.map(function(y){return y.beforeEnter}),Al(v)),_=function(y,b){if(i.pending!==e)return o(Qi(a,e));try{y(e,a,function(C){C===!1?(i.ensureURL(!0),o(Ol(a,e))):gn(C)?(i.ensureURL(!0),o(C)):typeof C=="string"||typeof C=="object"&&(typeof C.path=="string"||typeof C.name=="string")?(o(xl(a,e)),typeof C=="object"&&C.replace?i.replace(C):i.push(C)):b(C)})}catch(C){o(C)}};Zi(m,_,function(){var y=Dl(v),b=y.concat(i.router.resolveHooks);Zi(b,_,function(){if(i.pending!==e)return o(Qi(a,e));i.pending=null,n(e),i.router.app&&i.router.app.$nextTick(function(){vo(e)})})})};ft.prototype.updateRoute=function(e){this.current=e,this.cb&&this.cb(e)};ft.prototype.setupListeners=function(){};ft.prototype.teardown=function(){this.listeners.forEach(function(e){e()}),this.listeners=[],this.current=jt,this.pending=null};function Il(t){if(!t)if(Pe){var e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^https?:\/\/[^\/]+/,"")}else t="/";return t.charAt(0)!=="/"&&(t="/"+t),t.replace(/\/$/,"")}function kl(t,e){var n,r=Math.max(t.length,e.length);for(n=0;n<r&&t[n]===e[n];n++);return{updated:e.slice(0,n),activated:e.slice(n),deactivated:t.slice(n)}}function Nr(t,e,n,r){var i=Eo(t,function(a,o,s,c){var u=Rl(a,e);if(u)return Array.isArray(u)?u.map(function(f){return n(f,o,s,c)}):n(u,o,s,c)});return Ao(r?i.reverse():i)}function Rl(t,e){return typeof t!="function"&&(t=hn.extend(t)),t.options[e]}function jl(t){return Nr(t,"beforeRouteLeave",Po,!0)}function Ll(t){return Nr(t,"beforeRouteUpdate",Po)}function Po(t,e){if(e)return function(){return t.apply(e,arguments)}}function Dl(t){return Nr(t,"beforeRouteEnter",function(e,n,r,i){return Nl(e,r,i)})}function Nl(t,e,n){return function(i,a,o){return t(i,a,function(s){typeof s=="function"&&(e.enteredCbs[n]||(e.enteredCbs[n]=[]),e.enteredCbs[n].push(s)),o(s)})}}var To=function(t){function e(n,r){t.call(this,n,r),this._startLocation=me(this.base)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var r=this;if(!(this.listeners.length>0)){var i=this.router,a=i.options.scrollBehavior,o=At&&a;o&&this.listeners.push(Oo());var s=function(){var c=r.current,u=me(r.base);r.current===jt&&u===r._startLocation||r.transitionTo(u,function(f){o&&Et(i,f,c,!0)})};window.addEventListener("popstate",s),this.listeners.push(function(){window.removeEventListener("popstate",s)})}},e.prototype.go=function(r){window.history.go(r)},e.prototype.push=function(r,i,a){var o=this,s=this,c=s.current;this.transitionTo(r,function(u){vn($t(o.base+u.fullPath)),Et(o.router,u,c,!1),i&&i(u)},a)},e.prototype.replace=function(r,i,a){var o=this,s=this,c=s.current;this.transitionTo(r,function(u){cr($t(o.base+u.fullPath)),Et(o.router,u,c,!1),i&&i(u)},a)},e.prototype.ensureURL=function(r){if(me(this.base)!==this.current.fullPath){var i=$t(this.base+this.current.fullPath);r?vn(i):cr(i)}},e.prototype.getCurrentLocation=function(){return me(this.base)},e}(ft);function me(t){var e=window.location.pathname,n=e.toLowerCase(),r=t.toLowerCase();return t&&(n===r||n.indexOf($t(r+"/"))===0)&&(e=e.slice(t.length)),(e||"/")+window.location.search+window.location.hash}var Io=function(t){function e(n,r,i){t.call(this,n,r),!(i&&Ml(this.base))&&ea()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var r=this;if(!(this.listeners.length>0)){var i=this.router,a=i.options.scrollBehavior,o=At&&a;o&&this.listeners.push(Oo());var s=function(){var u=r.current;!ea()||r.transitionTo(Xe(),function(f){o&&Et(r.router,f,u,!0),At||Ve(f.fullPath)})},c=At?"popstate":"hashchange";window.addEventListener(c,s),this.listeners.push(function(){window.removeEventListener(c,s)})}},e.prototype.push=function(r,i,a){var o=this,s=this,c=s.current;this.transitionTo(r,function(u){na(u.fullPath),Et(o.router,u,c,!1),i&&i(u)},a)},e.prototype.replace=function(r,i,a){var o=this,s=this,c=s.current;this.transitionTo(r,function(u){Ve(u.fullPath),Et(o.router,u,c,!1),i&&i(u)},a)},e.prototype.go=function(r){window.history.go(r)},e.prototype.ensureURL=function(r){var i=this.current.fullPath;Xe()!==i&&(r?na(i):Ve(i))},e.prototype.getCurrentLocation=function(){return Xe()},e}(ft);function Ml(t){var e=me(t);if(!/^\/#/.test(e))return window.location.replace($t(t+"/#"+e)),!0}function ea(){var t=Xe();return t.charAt(0)==="/"?!0:(Ve("/"+t),!1)}function Xe(){var t=window.location.href,e=t.indexOf("#");return e<0?"":(t=t.slice(e+1),t)}function ur(t){var e=window.location.href,n=e.indexOf("#"),r=n>=0?e.slice(0,n):e;return r+"#"+t}function na(t){At?vn(ur(t)):window.location.hash=t}function Ve(t){At?cr(ur(t)):window.location.replace(ur(t))}var Fl=function(t){function e(n,r){t.call(this,n,r),this.stack=[],this.index=-1}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.push=function(r,i,a){var o=this;this.transitionTo(r,function(s){o.stack=o.stack.slice(0,o.index+1).concat(s),o.index++,i&&i(s)},a)},e.prototype.replace=function(r,i,a){var o=this;this.transitionTo(r,function(s){o.stack=o.stack.slice(0,o.index).concat(s),i&&i(s)},a)},e.prototype.go=function(r){var i=this,a=this.index+r;if(!(a<0||a>=this.stack.length)){var o=this.stack[a];this.confirmTransition(o,function(){var s=i.current;i.index=a,i.updateRoute(o),i.router.afterHooks.forEach(function(c){c&&c(o,s)})},function(s){xn(s,Yt.duplicated)&&(i.index=a)})}},e.prototype.getCurrentLocation=function(){var r=this.stack[this.stack.length-1];return r?r.fullPath:"/"},e.prototype.ensureURL=function(){},e}(ft),M=function(e){e===void 0&&(e={}),this.app=null,this.apps=[],this.options=e,this.beforeHooks=[],this.resolveHooks=[],this.afterHooks=[],this.matcher=vl(e.routes||[],this);var n=e.mode||"hash";switch(this.fallback=n==="history"&&!At&&e.fallback!==!1,this.fallback&&(n="hash"),Pe||(n="abstract"),this.mode=n,n){case"history":this.history=new To(this,e.base);break;case"hash":this.history=new Io(this,e.base,this.fallback);break;case"abstract":this.history=new Fl(this,e.base);break}},ko={currentRoute:{configurable:!0}};M.prototype.match=function(e,n,r){return this.matcher.match(e,n,r)};ko.currentRoute.get=function(){return this.history&&this.history.current};M.prototype.init=function(e){var n=this;if(this.apps.push(e),e.$once("hook:destroyed",function(){var o=n.apps.indexOf(e);o>-1&&n.apps.splice(o,1),n.app===e&&(n.app=n.apps[0]||null),n.app||n.history.teardown()}),!this.app){this.app=e;var r=this.history;if(r instanceof To||r instanceof Io){var i=function(o){var s=r.current,c=n.options.scrollBehavior,u=At&&c;u&&"fullPath"in o&&Et(n,o,s,!1)},a=function(o){r.setupListeners(),i(o)};r.transitionTo(r.getCurrentLocation(),a,a)}r.listen(function(o){n.apps.forEach(function(s){s._route=o})})}};M.prototype.beforeEach=function(e){return Mr(this.beforeHooks,e)};M.prototype.beforeResolve=function(e){return Mr(this.resolveHooks,e)};M.prototype.afterEach=function(e){return Mr(this.afterHooks,e)};M.prototype.onReady=function(e,n){this.history.onReady(e,n)};M.prototype.onError=function(e){this.history.onError(e)};M.prototype.push=function(e,n,r){var i=this;if(!n&&!r&&typeof Promise<"u")return new Promise(function(a,o){i.history.push(e,a,o)});this.history.push(e,n,r)};M.prototype.replace=function(e,n,r){var i=this;if(!n&&!r&&typeof Promise<"u")return new Promise(function(a,o){i.history.replace(e,a,o)});this.history.replace(e,n,r)};M.prototype.go=function(e){this.history.go(e)};M.prototype.back=function(){this.go(-1)};M.prototype.forward=function(){this.go(1)};M.prototype.getMatchedComponents=function(e){var n=e?e.matched?e:this.resolve(e).route:this.currentRoute;return n?[].concat.apply([],n.matched.map(function(r){return Object.keys(r.components).map(function(i){return r.components[i]})})):[]};M.prototype.resolve=function(e,n,r){n=n||this.history.current;var i=Dr(e,n,r,this),a=this.match(i,n),o=a.redirectedFrom||a.fullPath,s=this.history.base,c=Ul(s,o,this.mode);return{location:i,route:a,href:c,normalizedTo:i,resolved:a}};M.prototype.getRoutes=function(){return this.matcher.getRoutes()};M.prototype.addRoute=function(e,n){this.matcher.addRoute(e,n),this.history.current!==jt&&this.history.transitionTo(this.history.getCurrentLocation())};M.prototype.addRoutes=function(e){this.matcher.addRoutes(e),this.history.current!==jt&&this.history.transitionTo(this.history.getCurrentLocation())};Object.defineProperties(M.prototype,ko);var Ro=M;function Mr(t,e){return t.push(e),function(){var n=t.indexOf(e);n>-1&&t.splice(n,1)}}function Ul(t,e,n){var r=n==="hash"?"#"+e:e;return t?$t(t+"/"+r):r}M.install=or;M.version="3.6.5";M.isNavigationFailure=xn;M.NavigationFailureType=Yt;M.START_LOCATION=jt;Pe&&window.Vue&&window.Vue.use(M);const Hl=`## \u4E2D\u4ECB\u8005\u6A21\u5F0F\r
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
\u4E0B\u9762\u7684\u5185\u5BB9\u6CA1\u4EC0\u4E48\u91CD\u70B9\uFF0C\u6211\u770B\u4E0D\u4E0B\u53BB\u4E86\u2026\u2026`,Bl=`<html>\r
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
</html>`,zl=`function ObserverList(){\r
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
`,Wl=`// Publish/subscribe.js\r
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
})(pubsub)`,Gl=`#Javascript\u8BBE\u8BA1\u6A21\u5F0F/\u6211\u7684\u7406\u89E3\uFF08\u7FFB\u8BD1\r
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
\u8FD9\u662F\u6700\u7B80\u5355\u7684\u8BBE\u8BA1\u6A21\u5F0F\u4E4B\u4E00\uFF0C\u4E5F\u662F\u6700\u5F3A\u5927\u4E4B\u4E00\u3002`,ql=`// mediator implement\r
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
}`,Jl=`// simple implement\r
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
})();`,Kl=`var myModule = (function(){\r
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
// `,Yl=`var mySingleton = (function(){\r
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
})();`,Xl=`# \u535A\u5BA2\u76EE\u5F55\r
\r
\u672C\u6587\u6863\u7AD9\u7531 VuePress v2 \u6784\u5EFA\uFF0C\u5185\u5BB9\u4ECE\u5386\u53F2\u5206\u652F\u4E0E \`pattern/\` \u793A\u4F8B\u8FC1\u79FB\u800C\u6765\u3002\r
\r
## \u6587\u7AE0\r
\r
- [Observer \u4E0E Publish/Subscribe](/blog/publish-subscribe.html)\r
- [\u4E2D\u4ECB\u8005\u6A21\u5F0F\uFF08Mediator\uFF09](/blog/mediator-pattern.html)\r
- [Pattern \u4EE3\u7801\u793A\u4F8B\u96C6](/blog/code-lab.html)\r
- [H5 launch-app\uFF1A\u5FAE\u4FE1\u5F00\u653E\u6807\u7B7E\u539F\u7406](/blog/wechat-open-tag-launch-app.html)\r
- [Claude Code vs Codex\uFF1AAI \u7F16\u7801\u52A9\u624B\u57FA\u7840\u6307\u5357](/blog/claude-code-vs-codex.html)\r
- [Codex Prompt \u8C03\u8BD5\u624B\u518C](/blog/codex-prompt-debugging.html)\r
- [Codex Agent \u5DE5\u4F5C\u6D41](/blog/codex-agent-workflow.html)\r
- [Codex CLI \u5230 PR \u4EA4\u4ED8\u6E05\u5355](/blog/codex-cli-to-pr.html)\r
- [2026 \u524D\u7AEF\u70ED\u70B9\u5B9E\u6218\u56FE](/blog/frontend-trends-2026-practice-map.html)\r
- [\u524D\u7AEF\u67B6\u6784\u51B3\u7B56\u624B\u518C](/blog/frontend-architecture-decision-playbook.html)\r
- [\u524D\u7AEF\u5DE5\u7A0B\u7406\u5FF5\uFF1A\u5FEB\u7A33\u7B80](/blog/frontend-engineering-philosophy.html)\r
- [AI Native \u524D\u7AEF\u5DE5\u4F5C\u6D41](/blog/ai-native-frontend-workflow.html)\r
- [\u65E7\u7AD9\u5185\u5BB9\u5F52\u6863](/blog/legacy-notes.html)\r
\r
## \u672C\u7AD9\u5B9A\u4F4D\r
\r
- \u8BB0\u5F55\u7ECF\u5178 JavaScript \u8BBE\u8BA1\u6A21\u5F0F\u7406\u89E3\r
- \u4FDD\u7559\u65E9\u671F\u793A\u4F8B\uFF0C\u8865\u5145\u7ED3\u6784\u5316\u9605\u8BFB\u8DEF\u5F84\r
- \u5728\u4E0D\u6539\u53D8\u6838\u5FC3\u89C2\u70B9\u7684\u524D\u63D0\u4E0B\u63D0\u5347\u53EF\u8BFB\u6027\r
`,Vl=`# AI Native \u524D\u7AEF\u5DE5\u4F5C\u6D41\uFF1A\u628A Codex/Agent \u53D8\u6210\u7A33\u5B9A\u4EA7\u80FD\r
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
`,Ql=`# Claude Code vs Codex\uFF1AAI \u7F16\u7801\u52A9\u624B\u57FA\u7840\u6307\u5357

## \u4EC0\u4E48\u662F AI \u7F16\u7801\u52A9\u624B\uFF1F

Claude Code \u548C Codex \u90FD\u662F\u57FA\u4E8E\u5927\u8BED\u8A00\u6A21\u578B\u7684 AI \u7F16\u7801\u52A9\u624B\uFF0C\u80FD\u591F\u7406\u89E3\u81EA\u7136\u8BED\u8A00\u6307\u4EE4\u5E76\u751F\u6210\u3001\u4FEE\u6539\u4EE3\u7801\u3002\u5B83\u4EEC\u7684\u76EE\u6807\u662F\u63D0\u5347\u5F00\u53D1\u6548\u7387\uFF0C\u4F46\u5B9A\u4F4D\u548C\u4F7F\u7528\u65B9\u5F0F\u6709\u6240\u4E0D\u540C\u3002

---

## Claude Code \u7B80\u4ECB

**Claude Code** \u662F Anthropic \u63A8\u51FA\u7684 AI \u7F16\u7A0B\u52A9\u624B\uFF0C\u6DF1\u5EA6\u96C6\u6210\u5728 Claude \u751F\u6001\u4E2D\u3002

### \u6838\u5FC3\u7279\u70B9

- **\u5BF9\u8BDD\u5F0F\u4EA4\u4E92**\uFF1A\u901A\u8FC7\u81EA\u7136\u8BED\u8A00\u5BF9\u8BDD\u5B8C\u6210\u7F16\u7801\u4EFB\u52A1
- **\u4E0A\u4E0B\u6587\u7406\u89E3\u5F3A**\uFF1A\u80FD\u7406\u89E3\u9879\u76EE\u6574\u4F53\u7ED3\u6784\u548C\u4E1A\u52A1\u903B\u8F91
- **\u591A\u8F6E\u8FED\u4EE3**\uFF1A\u652F\u6301\u9010\u6B65\u4F18\u5316\u548C\u8C03\u8BD5
- **\u5DE5\u7A0B\u5316\u601D\u7EF4**\uFF1A\u6CE8\u91CD\u4EE3\u7801\u8D28\u91CF\u3001\u53EF\u7EF4\u62A4\u6027\u548C\u6700\u4F73\u5B9E\u8DF5

### \u9002\u7528\u573A\u666F

- \u590D\u6742\u529F\u80FD\u5F00\u53D1
- \u4EE3\u7801\u91CD\u6784\u4E0E\u4F18\u5316
- \u67B6\u6784\u8BBE\u8BA1\u4E0E\u8BC4\u5BA1
- \u95EE\u9898\u8BCA\u65AD\u4E0E\u8C03\u8BD5

### \u4F18\u52BF

- \u66F4\u5F3A\u7684\u63A8\u7406\u80FD\u529B\u548C\u903B\u8F91\u601D\u7EF4
- \u66F4\u597D\u7684\u957F\u4E0A\u4E0B\u6587\u7406\u89E3
- \u66F4\u6CE8\u91CD\u4EE3\u7801\u8D28\u91CF\u548C\u5DE5\u7A0B\u89C4\u8303
- \u9002\u5408\u5904\u7406\u590D\u6742\u3001\u591A\u6B65\u9AA4\u4EFB\u52A1

---

## Codex \u7B80\u4ECB

**Codex** \u662F OpenAI \u63A8\u51FA\u7684\u4EE3\u7801\u4E13\u7528\u6A21\u578B\uFF08\u5DF2\u6F14\u8FDB\u4E3A GitHub Copilot \u7684\u6838\u5FC3\u6280\u672F\uFF09\u3002

### \u6838\u5FC3\u7279\u70B9

- **\u8865\u5168\u5F0F\u4EA4\u4E92**\uFF1A\u57FA\u4E8E\u5F53\u524D\u4EE3\u7801\u4E0A\u4E0B\u6587\u63D0\u4F9B\u667A\u80FD\u8865\u5168
- **\u54CD\u5E94\u901F\u5EA6\u5FEB**\uFF1A\u5B9E\u65F6\u5EFA\u8BAE\uFF0C\u51E0\u4E4E\u65E0\u5EF6\u8FDF
- **\u8F7B\u91CF\u7EA7**\uFF1A\u4E13\u6CE8\u4E8E\u5355\u70B9\u4EE3\u7801\u751F\u6210
- **IDE \u6DF1\u5EA6\u96C6\u6210**\uFF1A\u65E0\u7F1D\u5D4C\u5165\u5F00\u53D1\u73AF\u5883

### \u9002\u7528\u573A\u666F

- \u65E5\u5E38\u7F16\u7801\u8865\u5168
- \u5FEB\u901F\u539F\u578B\u5F00\u53D1
- \u6837\u677F\u4EE3\u7801\u751F\u6210
- \u7B80\u5355\u51FD\u6570\u5B9E\u73B0

### \u4F18\u52BF

- \u6781\u5FEB\u7684\u54CD\u5E94\u901F\u5EA6
- \u4F4E\u6469\u64E6\u7684\u4EA4\u4E92\u4F53\u9A8C
- \u9002\u5408\u9AD8\u9891\u3001\u5C0F\u7C92\u5EA6\u4EFB\u52A1
- \u5B66\u4E60\u6210\u672C\u4F4E\uFF0C\u4E0A\u624B\u5373\u7528

---

## \u6838\u5FC3\u5DEE\u5F02\u5BF9\u6BD4

| \u7EF4\u5EA6 | Claude Code | Codex (Copilot) |
|------|-------------|-----------------|
| **\u4EA4\u4E92\u6A21\u5F0F** | \u5BF9\u8BDD\u5F0F\uFF0C\u591A\u8F6E\u4EA4\u6D41 | \u8865\u5168\u5F0F\uFF0C\u5373\u65F6\u5EFA\u8BAE |
| **\u4EFB\u52A1\u7C92\u5EA6** | \u4E2D\u5927\u578B\u4EFB\u52A1\uFF08\u6A21\u5757\u7EA7\uFF09 | \u5C0F\u578B\u4EFB\u52A1\uFF08\u884C/\u51FD\u6570\u7EA7\uFF09 |
| **\u4E0A\u4E0B\u6587\u7A97\u53E3** | \u5927\uFF08\u53EF\u7406\u89E3\u6574\u4E2A\u9879\u76EE\uFF09 | \u4E2D\u5C0F\uFF08\u5F53\u524D\u6587\u4EF6\u4E3A\u4E3B\uFF09 |
| **\u63A8\u7406\u80FD\u529B** | \u5F3A\uFF08\u903B\u8F91\u63A8\u5BFC\u3001\u67B6\u6784\u601D\u8003\uFF09 | \u4E2D\u7B49\uFF08\u6A21\u5F0F\u5339\u914D\u4E3A\u4E3B\uFF09 |
| **\u54CD\u5E94\u901F\u5EA6** | \u8F83\u6162\uFF08\u6570\u79D2\u5230\u6570\u5341\u79D2\uFF09 | \u6781\u5FEB\uFF08\u6BEB\u79D2\u7EA7\uFF09 |
| **\u9002\u7528\u9636\u6BB5** | \u8BBE\u8BA1\u3001\u91CD\u6784\u3001\u8C03\u8BD5 | \u7F16\u5199\u3001\u8865\u5168\u3001\u5FEB\u901F\u5B9E\u73B0 |
| **\u5B66\u4E60\u66F2\u7EBF** | \u9700\u8981\u638C\u63E1 Prompt \u6280\u5DE7 | \u51E0\u4E4E\u65E0\u5B66\u4E60\u6210\u672C |
| **\u6210\u672C** | \u8F83\u9AD8\uFF08\u6309 token \u8BA1\u8D39\uFF09 | \u8F83\u4F4E\uFF08\u8BA2\u9605\u5236\uFF09 |

---

## \u5982\u4F55\u9009\u62E9\uFF1F

### \u9009\u62E9 Claude Code \u5F53\uFF1A

\u2705 \u9700\u8981\u5904\u7406\u590D\u6742\u903B\u8F91\u6216\u67B6\u6784\u8BBE\u8BA1  
\u2705 \u8FDB\u884C\u5927\u89C4\u6A21\u91CD\u6784\u6216\u4EE3\u7801\u5BA1\u67E5  
\u2705 \u8C03\u8BD5\u96BE\u4EE5\u5B9A\u4F4D\u7684\u95EE\u9898  
\u2705 \u9700\u8981\u6DF1\u5165\u7406\u89E3\u4EE3\u7801\u80CC\u540E\u7684\u539F\u7406  
\u2705 \u4EFB\u52A1\u9700\u8981\u591A\u8F6E\u8FED\u4EE3\u548C\u4F18\u5316  

### \u9009\u62E9 Codex (Copilot) \u5F53\uFF1A

\u2705 \u65E5\u5E38\u7F16\u7801\uFF0C\u9700\u8981\u5FEB\u901F\u8865\u5168  
\u2705 \u7F16\u5199\u91CD\u590D\u6027\u9AD8\u7684\u6837\u677F\u4EE3\u7801  
\u2705 \u5FEB\u901F\u5B9E\u73B0\u5DF2\u77E5\u6A21\u5F0F\u7684\u51FD\u6570  
\u2705 \u63A2\u7D22 API \u7528\u6CD5\u6216\u8BED\u6CD5\u63D0\u793A  
\u2705 \u5E0C\u671B\u96F6\u5E72\u6270\u5730\u878D\u5165\u5DE5\u4F5C\u6D41  

---

## \u5B9E\u6218\u5EFA\u8BAE\uFF1A\u7EC4\u5408\u4F7F\u7528

\u4E24\u8005\u5E76\u975E\u4E92\u65A5\uFF0C\u800C\u662F\u4E92\u8865\u5173\u7CFB\u3002\u63A8\u8350\u5DE5\u4F5C\u6D41\uFF1A

\`\`\`
1. \u7528 Claude Code \u505A\u67B6\u6784\u8BBE\u8BA1\u548C\u4EFB\u52A1\u62C6\u89E3
   \u2193
2. \u7528 Codex \u5FEB\u901F\u5B9E\u73B0\u5177\u4F53\u51FD\u6570\u548C\u903B\u8F91
   \u2193
3. \u7528 Claude Code \u505A\u4EE3\u7801\u5BA1\u67E5\u548C\u4F18\u5316
   \u2193
4. \u7528 Codex \u8865\u5145\u6D4B\u8BD5\u7528\u4F8B\u548C\u6587\u6863
\`\`\`

### \u793A\u4F8B\u573A\u666F

**\u573A\u666F\uFF1A\u65B0\u589E\u4E00\u4E2A\u535A\u5BA2\u8BE6\u60C5\u9875**

1. **Claude Code**\uFF1A\u5206\u6790\u73B0\u6709\u8DEF\u7531\u7ED3\u6784\uFF0C\u8BBE\u8BA1\u7EC4\u4EF6\u67B6\u6784\uFF0C\u89C4\u5212\u6570\u636E\u6D41
2. **Codex**\uFF1A\u5FEB\u901F\u751F\u6210 Vue \u7EC4\u4EF6\u6A21\u677F\u3001API \u8C03\u7528\u4EE3\u7801
3. **Claude Code**\uFF1A\u5BA1\u67E5\u4EE3\u7801\u8D28\u91CF\uFF0C\u4F18\u5316\u72B6\u6001\u7BA1\u7406\uFF0C\u4FEE\u590D\u6F5C\u5728 bug
4. **Codex**\uFF1A\u8865\u5145\u5355\u5143\u6D4B\u8BD5\u3001TypeScript \u7C7B\u578B\u5B9A\u4E49

---

## \u5E38\u89C1\u8BEF\u533A

\u274C **\u8BEF\u533A 1**\uFF1A\u8BA4\u4E3A AI \u52A9\u624B\u53EF\u4EE5\u5B8C\u5168\u66FF\u4EE3\u5F00\u53D1\u8005  
\u2705 **\u6B63\u89E3**\uFF1A\u5B83\u4EEC\u662F\u589E\u5F3A\u5DE5\u5177\uFF0C\u4ECD\u9700\u4EBA\u5DE5\u5BA1\u6838\u548C\u51B3\u7B56

\u274C **\u8BEF\u533A 2**\uFF1A\u4E00\u6B21\u6027\u7ED9\u592A\u5927\u4EFB\u52A1  
\u2705 **\u6B63\u89E3**\uFF1A\u62C6\u89E3\u4EFB\u52A1\uFF0C\u5206\u6B65\u6267\u884C\uFF0C\u6BCF\u6B65\u9A8C\u8BC1

\u274C **\u8BEF\u533A 3**\uFF1A\u76F2\u76EE\u63A5\u53D7\u6240\u6709\u5EFA\u8BAE  
\u2705 **\u6B63\u89E3**\uFF1A\u59CB\u7EC8\u5BA1\u67E5\u4EE3\u7801\uFF0C\u7406\u89E3\u6539\u52A8\uFF0C\u4FDD\u6301\u638C\u63A7

\u274C **\u8BEF\u533A 4**\uFF1A\u5FFD\u7565\u4E0A\u4E0B\u6587\u8D28\u91CF  
\u2705 **\u6B63\u89E3**\uFF1A\u63D0\u4F9B\u6E05\u6670\u7684\u9700\u6C42\u3001\u8FB9\u754C\u548C\u9A8C\u6536\u6807\u51C6

---

## \u5FEB\u901F\u5F00\u59CB

### Claude Code \u5165\u95E8

1. \u8BBF\u95EE [claude.ai](https://claude.ai) \u6216\u4F7F\u7528 Claude Desktop
2. \u4E0A\u4F20\u9879\u76EE\u6587\u4EF6\u6216\u63CF\u8FF0\u9879\u76EE\u7ED3\u6784
3. \u7528\u7ED3\u6784\u5316 Prompt \u63D0\u51FA\u9700\u6C42\uFF08\u53C2\u8003\u4E0B\u65B9\u6A21\u677F\uFF09
4. \u5BA1\u67E5\u8F93\u51FA\uFF0C\u9010\u6B65\u8FED\u4EE3

**Prompt \u6A21\u677F\uFF1A**
\`\`\`
\u76EE\u6807\uFF1A[\u6700\u7EC8\u53EF\u9A8C\u6536\u7ED3\u679C]
\u6280\u672F\u6808\uFF1A[\u6846\u67B6/\u8BED\u8A00/\u7248\u672C]
\u6539\u52A8\u8303\u56F4\uFF1A[\u5177\u4F53\u6587\u4EF6/\u6A21\u5757]
\u7EA6\u675F\uFF1A[\u4E0D\u5141\u8BB8\u505A\u7684\u4E8B]
\u9A8C\u6536\u6807\u51C6\uFF1A[\u5FC5\u987B\u901A\u8FC7\u7684\u6D4B\u8BD5/\u547D\u4EE4]
\u8F93\u51FA\u683C\u5F0F\uFF1A[\u5148\u8BA1\u5212\u518D\u4EE3\u7801/\u76F4\u63A5\u4EE3\u7801\u7B49]
\`\`\`

### Codex (Copilot) \u5165\u95E8

1. \u5B89\u88C5 GitHub Copilot \u63D2\u4EF6\uFF08VSCode/JetBrains \u7B49\uFF09
2. \u767B\u5F55 GitHub \u8D26\u53F7\u5E76\u6FC0\u6D3B\u8BA2\u9605
3. \u6B63\u5E38\u7F16\u7801\uFF0C\u89C2\u5BDF\u667A\u80FD\u8865\u5168\u5EFA\u8BAE
4. \u6309 \`Tab\` \u63A5\u53D7\u5EFA\u8BAE\uFF0C\u6216\u7EE7\u7EED\u8F93\u5165\u5FFD\u7565

**\u63D0\u9AD8\u6548\u7387\u6280\u5DE7\uFF1A**
- \u5199\u6E05\u6670\u7684\u51FD\u6570\u540D\u548C\u6CE8\u91CA\uFF0C\u5F15\u5BFC\u8865\u5168\u65B9\u5411
- \u4F7F\u7528\u7C7B\u578B\u5B9A\u4E49\uFF0C\u63D0\u5347\u5EFA\u8BAE\u51C6\u786E\u6027
- \u9047\u5230\u4E0D\u51C6\u786E\u7684\u5EFA\u8BAE\uFF0C\u5220\u9664\u91CD\u5199\u800C\u975E\u5F3A\u884C\u4FEE\u6539

---

## \u8FDB\u9636\u9605\u8BFB

- [Codex Prompt \u8C03\u8BD5\u624B\u518C](/blog/codex-prompt-debugging.html) - \u5982\u4F55\u5199\u51FA\u53EF\u6267\u884C\u7684 Prompt
- [Codex Agent \u5DE5\u4F5C\u6D41](/blog/codex-agent-workflow.html) - \u4ECE\u9700\u6C42\u5230\u4EA4\u4ED8\u7684\u6700\u77ED\u8DEF\u5F84
- [Codex CLI \u5230 PR \u4EA4\u4ED8\u6E05\u5355](/blog/codex-cli-to-pr.html) - \u56E2\u961F\u53EF\u63A5\u53D7\u7684\u4EA4\u4ED8\u6807\u51C6
- [AI Native \u524D\u7AEF\u5DE5\u4F5C\u6D41](/blog/ai-native-frontend-workflow.html) - AI \u65F6\u4EE3\u7684\u5F00\u53D1\u8303\u5F0F

---

## \u603B\u7ED3

Claude Code \u548C Codex \u4EE3\u8868\u4E86\u4E24\u7C7B\u4E0D\u540C\u7684 AI \u7F16\u7801\u8F85\u52A9\u65B9\u5F0F\uFF1A

- **Claude Code** \u66F4\u50CF"\u8D44\u6DF1\u5DE5\u7A0B\u5E08\u4F19\u4F34"\uFF0C\u9002\u5408\u6DF1\u5EA6\u601D\u8003\u548C\u590D\u6742\u4EFB\u52A1
- **Codex** \u66F4\u50CF"\u667A\u80FD\u8F93\u5165\u6CD5"\uFF0C\u9002\u5408\u9AD8\u9891\u3001\u5FEB\u901F\u7684\u65E5\u5E38\u7F16\u7801

\u7406\u89E3\u5B83\u4EEC\u7684\u5DEE\u5F02\uFF0C\u6839\u636E\u573A\u666F\u9009\u62E9\u5408\u9002\u7684\u5DE5\u5177\uFF0C\u751A\u81F3\u7EC4\u5408\u4F7F\u7528\uFF0C\u624D\u80FD\u6700\u5927\u5316 AI \u52A9\u624B\u7684\u4EF7\u503C\u3002

**\u8BB0\u4F4F**\uFF1A\u5DE5\u5177\u7684\u4EF7\u503C\u4E0D\u5728\u4E8E\u6709\u591A\u5F3A\u5927\uFF0C\u800C\u5728\u4E8E\u4F60\u5982\u4F55\u4F7F\u7528\u5B83\u3002
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
`,tp=`# Codex Agent \u5DE5\u4F5C\u6D41\uFF1A\u9700\u6C42\u5230\u4EA4\u4ED8\u7684\u6700\u77ED\u8DEF\u5F84\r
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
`,ep=`# \u4ECE Codex CLI \u5230 PR\uFF1A\u4E00\u5957\u53EF\u590D\u7528\u4EA4\u4ED8\u6E05\u5355\r
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
`,np=`# Codex Prompt \u8C03\u8BD5\u624B\u518C\uFF1A\u4ECE\u201C\u8BF4\u4E0D\u6E05\u201D\u5230\u201C\u53EF\u6267\u884C\u201D\r
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
`,rp=`# \u524D\u7AEF\u67B6\u6784\u51B3\u7B56\u624B\u518C\uFF1A\u4E0D\u662F\u201C\u6700\u5148\u8FDB\u201D\uFF0C\u800C\u662F\u201C\u6700\u5339\u914D\u201D\r
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
`,ip=`# \u524D\u7AEF\u5DE5\u7A0B\u7406\u5FF5\uFF1A\u5FEB\u3001\u7A33\u3001\u7B80\uFF0C\u4E0D\u505A\u65E0\u6548\u590D\u6742\u5316\r
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
`,ap=`# 2026 \u524D\u7AEF\u70ED\u70B9\u5B9E\u6218\u56FE\uFF1A\u600E\u4E48\u7528\u3001\u4F55\u65F6\u7528\u3001\u4E3A\u4EC0\u4E48\u7528\r
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
`,op=`# \u65E7\u7AD9\u5185\u5BB9\u5F52\u6863\r
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
`,sp=`# Markdown UI \u7F8E\u5316\u793A\u4F8B

\u8FD9\u662F\u4E00\u7BC7\u5C55\u793A\u7F8E\u5316\u540E Markdown \u6E32\u67D3\u6548\u679C\u7684\u793A\u4F8B\u6587\u7AE0\u3002

## \u{1F3A8} \u65B0\u7279\u6027\u5C55\u793A

### 1. \u6807\u9898\u6837\u5F0F\u4F18\u5316

\u6240\u6709\u6807\u9898\u90FD\u6DFB\u52A0\u4E86\u5DE6\u4FA7\u6E10\u53D8\u88C5\u9970\u7EBF\uFF0C\u5C42\u6B21\u66F4\u5206\u660E\u3002

#### \u4E09\u7EA7\u6807\u9898\u793A\u4F8B

\u56DB\u7EA7\u6807\u9898\u4E5F\u80FD\u5F88\u597D\u5730\u5C55\u793A\u5C42\u7EA7\u5173\u7CFB\u3002

### 2. \u6587\u672C\u683C\u5F0F\u5316

\u652F\u6301 **\u7C97\u4F53**\u3001*\u659C\u4F53*\u3001\`\u884C\u5185\u4EE3\u7801\` \u548C ~~\u5220\u9664\u7EBF~~ \u7B49\u591A\u79CD\u683C\u5F0F\u3002

### 3. \u94FE\u63A5\u6837\u5F0F

[\u8FD9\u662F\u4E00\u4E2A\u94FE\u63A5\u793A\u4F8B](https://example.com)\uFF0C\u60AC\u505C\u65F6\u6709\u4E0B\u5212\u7EBF\u52A8\u753B\u6548\u679C\u3002

### 4. \u5F15\u7528\u5757

> \u8FD9\u662F\u4E00\u4E2A\u5F15\u7528\u5757\u793A\u4F8B\u3002
> \u5F15\u7528\u5757\u6709\u5DE6\u4FA7\u8FB9\u6846\u548C\u80CC\u666F\u8272\uFF0C\u975E\u5E38\u9002\u5408\u7A81\u51FA\u91CD\u8981\u5185\u5BB9\u3002

### 5. \u5217\u8868

#### \u65E0\u5E8F\u5217\u8868

- \u7B2C\u4E00\u9879
- \u7B2C\u4E8C\u9879
- \u7B2C\u4E09\u9879
  - \u5D4C\u5957\u9879\u76EE
  - \u66F4\u591A\u5D4C\u5957

#### \u6709\u5E8F\u5217\u8868

1. \u7B2C\u4E00\u6B65
2. \u7B2C\u4E8C\u6B65
3. \u7B2C\u4E09\u6B65

#### \u4EFB\u52A1\u5217\u8868

- [x] \u5DF2\u5B8C\u6210\u7684\u4EFB\u52A1
- [ ] \u5F85\u5B8C\u6210\u7684\u4EFB\u52A1
- [x] \u53E6\u4E00\u4E2A\u5DF2\u5B8C\u6210\u7684\u4EFB\u52A1

### 6. \u4EE3\u7801\u5757

#### JavaScript \u793A\u4F8B

\`\`\`javascript
// \u8FD9\u662F\u4E00\u4E2A JavaScript \u4EE3\u7801\u793A\u4F8B
function greet(name) {
  return \`Hello, \${name}!\`
}

console.log(greet('World'))
\`\`\`

#### TypeScript \u793A\u4F8B

\`\`\`typescript
interface User {
  id: number
  name: string
  email: string
}

const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
}
\`\`\`

### 7. \u8868\u683C

| \u529F\u80FD | \u72B6\u6001 | \u8BF4\u660E |
|------|------|------|
| \u6807\u9898\u7F8E\u5316 | \u2705 | \u5DF2\u5B9E\u73B0 |
| \u4EE3\u7801\u9AD8\u4EAE | \u2705 | \u5DF2\u5B9E\u73B0 |
| \u8868\u683C\u652F\u6301 | \u2705 | \u5DF2\u5B9E\u73B0 |
| \u4EFB\u52A1\u5217\u8868 | \u2705 | \u5DF2\u5B9E\u73B0 |
| \u52A8\u753B\u6548\u679C | \u2705 | \u5DF2\u5B9E\u73B0 |

### 8. \u56FE\u7247

![\u793A\u4F8B\u56FE\u7247](https://via.placeholder.com/600x300/0a1929/8de8ff?text=Markdown+UI+Demo)

### 9. \u6C34\u5E73\u5206\u5272\u7EBF

---

\u5206\u5272\u7EBF\u91C7\u7528\u4E86\u6E10\u53D8\u6548\u679C\uFF0C\u89C6\u89C9\u4E0A\u66F4\u52A0\u4F18\u96C5\u3002

## \u{1F4A1} \u4F7F\u7528\u5EFA\u8BAE

1. **\u5408\u7406\u4F7F\u7528\u6807\u9898\u5C42\u7EA7**\uFF1A\u4FDD\u6301\u6587\u6863\u7ED3\u6784\u6E05\u6670
2. **\u9002\u5F53\u4F7F\u7528\u4EE3\u7801\u5757**\uFF1A\u63D0\u9AD8\u6280\u672F\u6587\u6863\u7684\u53EF\u8BFB\u6027
3. **\u5584\u7528\u5F15\u7528\u5757**\uFF1A\u7A81\u51FA\u91CD\u8981\u4FE1\u606F
4. **\u6DFB\u52A0\u4EFB\u52A1\u5217\u8868**\uFF1A\u8FFD\u8E2A\u8FDB\u5EA6\u548C\u5F85\u529E\u4E8B\u9879

## \u{1F680} \u603B\u7ED3

\u901A\u8FC7\u8FD9\u6B21\u7F8E\u5316\uFF0CMarkdown \u6587\u6863\u7684\u89C6\u89C9\u6548\u679C\u5F97\u5230\u4E86\u663E\u8457\u63D0\u5347\uFF1A

- \u2728 \u66F4\u73B0\u4EE3\u7684\u914D\u8272\u65B9\u6848
- \u{1F3AF} \u66F4\u6E05\u6670\u7684\u89C6\u89C9\u5C42\u6B21
- \u{1F4AB} \u6D41\u7545\u7684\u4EA4\u4E92\u52A8\u753B
- \u{1F4F1} \u54CD\u5E94\u5F0F\u8BBE\u8BA1\u652F\u6301

\u5E0C\u671B\u8FD9\u4E9B\u6539\u8FDB\u80FD\u8BA9\u4F60\u7684\u535A\u5BA2\u9605\u8BFB\u4F53\u9A8C\u66F4\u52A0\u6109\u60A6\uFF01
`,cp=`# Markdown UI \u7F8E\u5316\u5B8C\u6210\u603B\u7ED3

## \u2705 \u5DF2\u5B8C\u6210\u7684\u6539\u8FDB

### 1. **Markdown \u6E32\u67D3\u5668\u589E\u5F3A** (\`src/utils/markdown.ts\`)

\u65B0\u589E\u4E86\u4EE5\u4E0B Markdown \u8BED\u6CD5\u652F\u6301\uFF1A

- \u2705 **\u8868\u683C\u6E32\u67D3** - \u652F\u6301\u6807\u51C6 Markdown \u8868\u683C\u8BED\u6CD5
- \u2705 **\u4EFB\u52A1\u5217\u8868** - \u652F\u6301 \`- [x]\` \u548C \`- [ ]\` \u8BED\u6CD5
- \u2705 **\u5220\u9664\u7EBF** - \u652F\u6301 \`~~text~~\` \u8BED\u6CD5
- \u2705 **\u56FE\u7247** - \u652F\u6301 \`![alt](url)\` \u8BED\u6CD5
- \u2705 **\u6C34\u5E73\u5206\u5272\u7EBF** - \u652F\u6301 \`---\` \u8BED\u6CD5
- \u2705 **\u4EE3\u7801\u5757\u8BED\u8A00\u6807\u8BC6** - \u4FDD\u7559\u5E76\u663E\u793A\u4EE3\u7801\u8BED\u8A00

### 2. **\u535A\u5BA2\u8BE6\u60C5\u9875\u7F8E\u5316** (\`src/views/BlogDetailView.vue\`)

#### \u89C6\u89C9\u6539\u8FDB\uFF1A
- \u{1F3A8} \u6DFB\u52A0\u9875\u9762\u8FDB\u5165\u52A8\u753B\uFF08fadeInUp\uFF09
- \u{1F308} \u6807\u9898\u4F7F\u7528\u6E10\u53D8\u8272\u6587\u5B57\u6548\u679C
- \u{1F4AB} \u5361\u7247\u60AC\u505C\u65F6\u6709\u8FB9\u6846\u9AD8\u4EAE\u548C\u9634\u5F71\u6548\u679C
- \u{1F4CA} \u6DFB\u52A0\u9605\u8BFB\u65F6\u95F4\u4F30\u7B97
- \u{1F3F7}\uFE0F \u6DFB\u52A0\u6587\u7AE0\u6807\u7B7E\u663E\u793A

#### \u5185\u5BB9\u6837\u5F0F\u4F18\u5316\uFF1A
- \u{1F4DD} \u6807\u9898\u5DE6\u4FA7\u6DFB\u52A0\u6E10\u53D8\u88C5\u9970\u7EBF
- \u{1F4BB} \u4EE3\u7801\u5757\u91C7\u7528\u6DF1\u8272\u4E3B\u9898\uFF0C\u5E26\u8FB9\u6846\u548C\u9634\u5F71
- \u{1F4CB} \u8868\u683C\u6709\u6E05\u6670\u7684\u8FB9\u6846\u548C\u60AC\u505C\u6548\u679C
- \u{1F4AC} \u5F15\u7528\u5757\u6709\u5DE6\u4FA7\u5F69\u8272\u8FB9\u6846\u548C\u80CC\u666F\u8272
- \u{1F517} \u94FE\u63A5\u6709\u865A\u7EBF\u4E0B\u5212\u7EBF\uFF0C\u60AC\u505C\u65F6\u53D8\u5B9E\u7EBF
- \u2611\uFE0F \u4EFB\u52A1\u5217\u8868\u6709\u81EA\u5B9A\u4E49\u590D\u9009\u6846\u6837\u5F0F
- \u{1F5BC}\uFE0F \u56FE\u7247\u6709\u5706\u89D2\u548C\u9634\u5F71\u6548\u679C

#### \u4EA4\u4E92\u6539\u8FDB\uFF1A
- \u2B05\uFE0F \u8FD4\u56DE\u6309\u94AE\u6709\u60AC\u505C\u4F4D\u79FB\u52A8\u753B
- \u{1F4DA} \u76F8\u5173\u6587\u7AE0\u5361\u7247\u6709\u9876\u90E8\u6E10\u53D8\u6761\u52A8\u753B
- \u{1F3AF} \u6240\u6709\u53EF\u70B9\u51FB\u5143\u7D20\u90FD\u6709\u5E73\u6ED1\u8FC7\u6E21\u6548\u679C

### 3. **\u9996\u9875\u7F8E\u5316** (\`src/views/HomeView.vue\`)

#### Hero \u533A\u57DF\uFF1A
- \u2728 \u6DFB\u52A0\u52A8\u6001\u5149\u6655\u80CC\u666F\u6548\u679C
- \u{1F3AD} \u6807\u9898\u4F7F\u7528\u6E10\u53D8\u8272\u6587\u5B57
- \u{1F518} \u6309\u94AE\u6709\u6D9F\u6F2A\u6548\u679C\u548C\u60AC\u505C\u52A8\u753B
- \u{1F4CA} \u6307\u6807\u5361\u7247\u6709\u60AC\u505C\u4E0A\u6D6E\u6548\u679C
- \u{1F3A8} \u6DFB\u52A0 Emoji \u56FE\u6807\u589E\u5F3A\u89C6\u89C9\u6548\u679C

#### \u7CBE\u9009\u6587\u7AE0\u5361\u7247\uFF1A
- \u{1F0CF} \u5361\u7247\u6709\u9876\u90E8\u6E10\u53D8\u6761\u52A8\u753B
- \u{1F4CC} \u6DFB\u52A0\u6765\u6E90\u6807\u7B7E\uFF08vdocs/pattern/seed\uFF09
- \u{1F4AB} \u60AC\u505C\u65F6\u5361\u7247\u4E0A\u6D6E\u5E76\u663E\u793A\u9634\u5F71
- \u27A1\uFE0F "\u67E5\u770B\u8BE6\u60C5"\u94FE\u63A5\u6709\u7BAD\u5934\u52A8\u753B

#### \u6587\u7AE0\u5217\u8868\uFF1A
- \u{1F3B4} \u7EDF\u4E00\u7684\u5361\u7247\u8BBE\u8BA1\u98CE\u683C
- \u{1F3F7}\uFE0F \u5206\u7C7B\u548C\u6765\u6E90\u6807\u7B7E
- \u{1F4D6} \u53EF\u5C55\u5F00\u7684\u5168\u6587\u9884\u89C8
- \u{1F4AB}  staggered \u8FDB\u5165\u52A8\u753B

#### \u4FA7\u8FB9\u680F\uFF1A
- \u{1F3A8} \u9AD8\u4EAE\u9762\u677F\u4F7F\u7528\u6E10\u53D8\u80CC\u666F
- \u{1F4CA} \u65B0\u589E\u7EDF\u8BA1\u6570\u636E\u9762\u677F
- \u{1F527} \u6240\u6709\u9762\u677F\u6709\u60AC\u505C\u6548\u679C
- \u{1F4BB} \u4EE3\u7801\u7247\u6BB5\u6709\u7F8E\u5316\u7684\u6837\u5F0F

### 4. **\u5168\u5C40\u6EDA\u52A8\u6761\u7F8E\u5316** (\`src/assets/main.css\`)

- \u{1F3A8} \u81EA\u5B9A\u4E49 Webkit \u6EDA\u52A8\u6761\uFF08Chrome\u3001Safari\u3001Edge\uFF09
- \u{1F98A} \u652F\u6301 Firefox \u6EDA\u52A8\u6761\u6837\u5F0F
- \u{1F308} \u6EDA\u52A8\u6761\u4F7F\u7528\u4E3B\u9898\u6E10\u53D8\u8272
- \u2728 \u60AC\u505C\u65F6\u6709\u989C\u8272\u53D8\u5316

### 5. **\u793A\u4F8B\u6587\u6863**

\u521B\u5EFA\u4E86 [\`markdown-ui-demo.md\`](d:\\Dev\\Projects\\adminfyy.github.io\\vdocs\\blog\\markdown-ui-demo.md) \u5C55\u793A\u6240\u6709\u65B0\u7279\u6027\u3002

---

## \u{1F3AF} \u8BBE\u8BA1\u539F\u5219

### 1. **\u4E00\u81F4\u6027**
- \u7EDF\u4E00\u4F7F\u7528\u4E3B\u9898\u8272 \`#8de8ff\` \u548C \`#61daff\`
- \u6240\u6709\u5361\u7247\u4F7F\u7528\u76F8\u540C\u7684\u5706\u89D2\u548C\u8FB9\u6846\u6837\u5F0F
- \u4FDD\u6301\u7EDF\u4E00\u7684\u95F4\u8DDD\u548C\u5B57\u4F53\u5927\u5C0F

### 2. **\u5C42\u6B21\u611F**
- \u901A\u8FC7\u9634\u5F71\u548C\u8FB9\u6846\u521B\u5EFA\u89C6\u89C9\u5C42\u6B21
- \u4F7F\u7528\u6E10\u53D8\u589E\u52A0\u6DF1\u5EA6\u611F
- \u6807\u9898\u5C42\u7EA7\u6E05\u6670\u53EF\u8FA8

### 3. **\u4EA4\u4E92\u53CD\u9988**
- \u6240\u6709\u53EF\u4EA4\u4E92\u5143\u7D20\u90FD\u6709\u60AC\u505C\u6548\u679C
- \u4F7F\u7528\u5E73\u6ED1\u7684\u8FC7\u6E21\u52A8\u753B\uFF080.2s - 0.3s\uFF09
- \u63D0\u4F9B\u660E\u786E\u7684\u89C6\u89C9\u53CD\u9988

### 4. **\u53EF\u8BFB\u6027**
- \u5408\u9002\u7684\u884C\u9AD8\uFF081.6 - 1.8\uFF09
- \u8DB3\u591F\u7684\u5BF9\u6BD4\u5EA6
- \u5408\u7406\u7684\u5B57\u4F53\u5927\u5C0F\u548C\u95F4\u8DDD

### 5. **\u54CD\u5E94\u5F0F**
- \u79FB\u52A8\u7AEF\u53CB\u597D\u7684\u5E03\u5C40
- \u81EA\u9002\u5E94\u7684\u5B57\u4F53\u5927\u5C0F\uFF08clamp\uFF09
- \u7075\u6D3B\u7684\u7F51\u683C\u7CFB\u7EDF

---

## \u{1F4F1} \u54CD\u5E94\u5F0F\u65AD\u70B9

- **\u684C\u9762\u7AEF**: \u2265 960px - \u591A\u5217\u5E03\u5C40
- **\u5E73\u677F\u7AEF**: 640px - 960px - \u8C03\u6574\u5217\u6570
- **\u79FB\u52A8\u7AEF**: < 640px - \u5355\u5217\u5E03\u5C40

---

## \u{1F3A8} \u914D\u8272\u65B9\u6848

### \u4E3B\u8272\u8C03
- \u4E3B\u8272: \`#8de8ff\` (\u6D45\u84DD)
- \u8F85\u8272: \`#61daff\` (\u5929\u84DD)
- \u5F3A\u8C03\u8272: \`rgba(141, 232, 255, 0.15)\` (\u534A\u900F\u660E)

### \u80CC\u666F\u8272
- \u6DF1\u8272\u80CC\u666F: \`rgba(3, 13, 30, 0.5)\`
- \u73BB\u7483\u6001: \`var(--surface-glass)\`
- \u4EE3\u7801\u5757: \`rgba(8, 22, 42, 0.8)\`

### \u6587\u5B57\u8272
- \u6807\u9898: \`var(--color-heading)\` (#e8f7ff)
- \u6B63\u6587: \`var(--color-text)\` (#d7e8f8)
- \u6B21\u8981: \`#93acc0\`

---

## \u{1F680} \u6027\u80FD\u4F18\u5316

- \u2705 \u4F7F\u7528 CSS transform \u800C\u975E position \u8FDB\u884C\u52A8\u753B
- \u2705 \u5408\u7406\u4F7F\u7528 backdrop-filter\uFF08\u9002\u5EA6\u4F7F\u7528\uFF09
- \u2705 \u52A8\u753B\u4F7F\u7528 GPU \u52A0\u901F
- \u2705 \u5EF6\u8FDF\u52A0\u8F7D\u52A8\u753B\uFF08staggered animation\uFF09

---

## \u{1F4DD} \u4F7F\u7528\u5EFA\u8BAE

### \u5BF9\u4E8E\u535A\u5BA2\u4F5C\u8005\uFF1A
1. \u4F7F\u7528\u6807\u51C6 Markdown \u8BED\u6CD5\u7F16\u5199\u5185\u5BB9
2. \u9002\u5F53\u4F7F\u7528\u6807\u9898\u5C42\u7EA7\uFF08H1-H4\uFF09
3. \u5584\u7528\u4EE3\u7801\u5757\u5C55\u793A\u6280\u672F\u5185\u5BB9
4. \u4F7F\u7528\u4EFB\u52A1\u5217\u8868\u8FFD\u8E2A\u8FDB\u5EA6
5. \u6DFB\u52A0\u8868\u683C\u5BF9\u6BD4\u6570\u636E

### \u5BF9\u4E8E\u5F00\u53D1\u8005\uFF1A
1. \u53EF\u4EE5\u901A\u8FC7\u4FEE\u6539 CSS \u53D8\u91CF\u5FEB\u901F\u8C03\u6574\u4E3B\u9898
2. \u6240\u6709\u6837\u5F0F\u90FD\u4F7F\u7528\u4E86 scoped\uFF0C\u4E0D\u4F1A\u5F71\u54CD\u5168\u5C40
3. Markdown \u6E32\u67D3\u5668\u53EF\u4EE5\u8F7B\u677E\u6269\u5C55\u65B0\u529F\u80FD
4. \u52A8\u753B\u65F6\u957F\u53EF\u4EE5\u5728 CSS \u4E2D\u7EDF\u4E00\u8C03\u6574

---

## \u{1F52E} \u672A\u6765\u53EF\u80FD\u7684\u6539\u8FDB

- [ ] \u6DFB\u52A0\u6697\u8272/\u4EAE\u8272\u4E3B\u9898\u5207\u6362
- [ ] \u652F\u6301\u6570\u5B66\u516C\u5F0F\u6E32\u67D3\uFF08KaTeX\uFF09
- [ ] \u6DFB\u52A0\u76EE\u5F55\u5BFC\u822A\uFF08TOC\uFF09
- [ ] \u652F\u6301 Mermaid \u56FE\u8868
- [ ] \u6DFB\u52A0\u4EE3\u7801\u590D\u5236\u6309\u94AE
- [ ] \u5B9E\u73B0\u9605\u8BFB\u8FDB\u5EA6\u6761
- [ ] \u6DFB\u52A0\u5206\u4EAB\u529F\u80FD

---

## \u{1F4D6} \u76F8\u5173\u6587\u4EF6

- \u6E32\u67D3\u5668: \`src/utils/markdown.ts\`
- \u8BE6\u60C5\u9875: \`src/views/BlogDetailView.vue\`
- \u9996\u9875: \`src/views/HomeView.vue\`
- \u5168\u5C40\u6837\u5F0F: \`src/assets/main.css\`
- \u57FA\u7840\u6837\u5F0F: \`src/assets/base.css\`
- \u793A\u4F8B\u6587\u6863: \`vdocs/blog/markdown-ui-demo.md\`

---

**\u66F4\u65B0\u65F6\u95F4**: 2026-05-03  
**\u7248\u672C**: v2.0 - Enhanced Markdown UI
`,up=`# \u4E2D\u4ECB\u8005\u6A21\u5F0F\uFF08Mediator\uFF09\r
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
`,fp=`# Observer \u4E0E Publish/Subscribe\r
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
`,lp=`# H5 \`launch-app\`\uFF1A\u5FAE\u4FE1\u5F00\u653E\u6807\u7B7E \`wx-open-launch-app\` \u539F\u7406\u4E0E\u5B9E\u6218\r
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
`,pp=[{title:"Vue\u54CD\u5E94\u5F0F\u539F\u7406",content:"Object.defineProperty"},{title:"CSS-FLOAT",content:"vue-\u7ED1\u5B9A\u4F7F\u7528\u7684\u6307\u4EE4\u4E3A v-model: \u6682\u65E0\u5FEB\u6377\u7B80\u79F0"},{title:"Keyof Type Operator",content:"\u90A3\u4E2A keyof \u7C7B\u578B\u64CD\u4F5C\u7B26\uFF0Ckeyof \u7C7B\u578B\u64CD\u4F5C\u7B26\u80FD\u591F\u8F93\u5165\u4E00\u4E2A\u7C7B\u578B\uFF0C\u7136\u540E\u4EA7\u751F\u6240\u6709\u952E\u503C\u7684\u5B57\u7B26\u4E32\u6216\u8005\u6570\u5B57\u7684\u5B57\u9762\u8054\u5408\u7C7B\u578B"}],dp=Object.assign({"/pattern/Mediator.md":Hl,"/pattern/Observer.html":Bl,"/pattern/Observer.js":zl,"/pattern/Publish.js":Wl,"/pattern/Publish.md":Gl,"/pattern/mediator-senior.js":ql,"/pattern/mediator.js":Jl,"/pattern/module.js":Kl,"/pattern/singleton.js":Yl}),hp=Object.assign({"/vdocs/blog/README.md":Xl,"/vdocs/blog/ai-native-frontend-workflow.md":Vl,"/vdocs/blog/claude-code-vs-codex.md":Ql,"/vdocs/blog/code-lab.md":Zl,"/vdocs/blog/codex-agent-workflow.md":tp,"/vdocs/blog/codex-cli-to-pr.md":ep,"/vdocs/blog/codex-prompt-debugging.md":np,"/vdocs/blog/frontend-architecture-decision-playbook.md":rp,"/vdocs/blog/frontend-engineering-philosophy.md":ip,"/vdocs/blog/frontend-trends-2026-practice-map.md":ap,"/vdocs/blog/legacy-notes.md":op,"/vdocs/blog/markdown-ui-demo.md":sp,"/vdocs/blog/markdown-ui-improvements.md":cp,"/vdocs/blog/mediator-pattern.md":up,"/vdocs/blog/publish-subscribe.md":fp,"/vdocs/blog/wechat-open-tag-launch-app.md":lp}),jo=t=>(t.split("/").pop()||"Untitled").replace(/\.[^.]+$/,""),vp=t=>t.replace(/```[\s\S]*?```/g," ").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^#{1,6}\s+/gm,"").replace(/[*_>~-]/g," ").replace(/\|/g," "),Fr=(t,e=180)=>{const n=vp(t).replace(/\s+/g," ").trim();return n.length>e?`${n.slice(0,e)}...`:n},gp=(t,e)=>{const n=t.match(/^#\s+(.+)$/m);return n?n[1].trim():e},Ur=t=>t.toLowerCase().replace(/^\//,"").replace(/[^a-z0-9\u4e00-\u9fa5]+/g,"-").replace(/^-+|-+$/g,""),Lo=Object.entries(dp).map(([t,e])=>{const n=t.split(".").pop()||"txt";return{id:`pattern-${t}`,slug:Ur(`pattern-${t}`),title:jo(t),category:`pattern/${n}`,excerpt:Fr(e),content:e,source:"pattern"}}),Do=Object.entries(hp).filter(([t])=>!t.endsWith("/README.md")).map(([t,e])=>({id:`vdocs-${t}`,slug:Ur(`vdocs-${t}`),title:gp(e,jo(t)),category:"vdocs/blog",excerpt:Fr(e),content:e,source:"vdocs"})),No=pp.map((t,e)=>({id:`seed-${e}`,slug:Ur(`seed-${t.title}-${e}`),title:t.title,category:"notes",excerpt:Fr(t.content),content:t.content,source:"seed"})),Hr=[...Do,...Lo,...No];function mp(){return Hr}function Rp(t){return Hr.find(e=>e.slug===t)}function bp(){return{total:Hr.length,vdocsCount:Do.length,patternCount:Lo.length,seedCount:No.length}}const _p={__name:"HomeView",setup(t){const e=mp(),n=bp(),r=e.slice(0,3);return{__sfc:!0,posts:e,stats:n,featuredPosts:r}}};function Mo(t,e,n,r,i,a,o,s){var c=typeof t=="function"?t.options:t;e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),a&&(c._scopeId="data-v-"+a);var u;if(o?(u=function(v){v=v||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!v&&typeof __VUE_SSR_CONTEXT__<"u"&&(v=__VUE_SSR_CONTEXT__),i&&i.call(this,v),v&&v._registeredComponents&&v._registeredComponents.add(o)},c._ssrRegister=u):i&&(u=s?function(){i.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:i),u)if(c.functional){c._injectStyles=u;var f=c.render;c.render=function(m,_){return u.call(_),f(m,_)}}else{var h=c.beforeCreate;c.beforeCreate=h?[].concat(h,u):[u]}return{exports:t,options:c}}var yp=function(){var e=this,n=e._self._c,r=e._self._setupProxy;return n("main",{staticClass:"blog-page"},[n("section",{staticClass:"hero"},[n("div",{staticClass:"hero-content"},[n("p",{staticClass:"kicker"},[e._v("\u{1F31F} \u6280\u672F\u6539\u53D8\u751F\u6D3B")]),n("h1",[e._v("\u7528\u4EE3\u7801\u63A2\u7D22\u4E16\u754C\uFF0C\u4EE5\u5DE5\u7A0B\u9A71\u52A8\u521B\u65B0")]),n("p",{staticClass:"description"},[e._v(" \u8BB0\u5F55\u524D\u7AEF\u5DE5\u7A0B\u5B9E\u8DF5\u3001\u8BBE\u8BA1\u6A21\u5F0F\u7814\u7A76\u4E0E Agent \u5DE5\u5177\u5F00\u53D1\uFF0C\u5C55\u793A\u6280\u672F\u5982\u4F55\u8D4B\u80FD\u65E5\u5E38\u751F\u6D3B\u3002 ")]),n("div",{staticClass:"hero-actions"},[n("router-link",{staticClass:"btn primary",attrs:{to:"/about"}},[n("span",{staticClass:"btn-icon"},[e._v("\u{1F468}\u200D\u{1F4BB}")]),e._v(" \u5173\u4E8E\u6211 ")]),n("router-link",{staticClass:"btn ghost",attrs:{to:"/agent-portal"}},[n("span",{staticClass:"btn-icon"},[e._v("\u{1F680}")]),e._v(" Agent Portal ")])],1)]),n("div",{staticClass:"hero-metrics"},[e._m(0),e._m(1),n("div",{staticClass:"metric"},[n("div",{staticClass:"metric-icon"},[e._v("\u{1F4DD}")]),n("p",[e._v("\u6587\u7AE0")]),n("strong",[e._v(e._s(r.stats.total))])]),e._m(2)])]),n("section",{staticClass:"featured"},[e._m(3),n("div",{staticClass:"featured-grid"},e._l(r.featuredPosts,function(i,a){return n("article",{key:i.id,staticClass:"featured-card",style:{animationDelay:`${a*.1}s`}},[n("div",{staticClass:"card-header"},[n("p",{staticClass:"meta"},[e._v(e._s(i.category))]),n("span",{staticClass:"source-badge"},[e._v(e._s(i.source))])]),n("h3",[e._v(e._s(i.title))]),n("p",{staticClass:"excerpt"},[e._v(e._s(i.excerpt))]),n("router-link",{staticClass:"read-link",attrs:{to:`/blog/${i.slug}`}},[e._v(" \u9605\u8BFB\u5168\u6587 "),n("span",{staticClass:"arrow"},[e._v("\u2192")])])],1)}),0)]),n("section",{staticClass:"blog-layout"},[n("article",{staticClass:"post-list"},e._l(r.posts,function(i,a){return n("div",{key:i.id,staticClass:"post-card",style:{animationDelay:`${a*.05}s`}},[n("div",{staticClass:"card-top"},[n("p",{staticClass:"meta"},[e._v(e._s(i.category))]),n("span",{staticClass:"source-badge small"},[e._v(e._s(i.source))])]),n("h2",[e._v(e._s(i.title))]),n("p",{staticClass:"excerpt"},[e._v(e._s(i.excerpt))]),n("router-link",{staticClass:"read-link",attrs:{to:`/blog/${i.slug}`}},[e._v(" \u9605\u8BFB\u5168\u6587 "),n("span",{staticClass:"arrow"},[e._v("\u2192")])]),n("details",{staticClass:"content-preview"},[e._m(4,!0),n("pre",[e._v(e._s(i.content))])])],1)}),0),n("aside",{staticClass:"sidebar"},[e._m(5),e._m(6),n("div",{staticClass:"panel stats-panel"},[e._m(7),n("div",{staticClass:"stats-list"},[n("div",{staticClass:"stat-item"},[n("span",{staticClass:"stat-label"},[e._v("\u6587\u7AE0\u603B\u6570")]),n("span",{staticClass:"stat-value"},[e._v(e._s(r.stats.total))])]),n("div",{staticClass:"stat-item"},[n("span",{staticClass:"stat-label"},[e._v("VDocs")]),n("span",{staticClass:"stat-value"},[e._v(e._s(r.stats.vdocsCount))])]),n("div",{staticClass:"stat-item"},[n("span",{staticClass:"stat-label"},[e._v("Patterns")]),n("span",{staticClass:"stat-value"},[e._v(e._s(r.stats.patternCount))])])])])])])])},wp=[function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"metric"},[e("div",{staticClass:"metric-icon"},[t._v("\u{1F4A1}")]),e("p",[t._v("\u6280\u672F\u7406\u5FF5")]),e("strong",[t._v("\u521B\u65B0")])])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"metric"},[e("div",{staticClass:"metric-icon"},[t._v("\u{1F527}")]),e("p",[t._v("\u5DE5\u7A0B\u5B9E\u8DF5")]),e("strong",[t._v("\u843D\u5730")])])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"metric"},[e("div",{staticClass:"metric-icon"},[t._v("\u{1F310}")]),e("p",[t._v("\u5F00\u6E90")]),e("strong",[t._v("\u5171\u4EAB")])])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("h2",[e("span",{staticClass:"section-icon"},[t._v("\u{1F4CC}")]),t._v(" \u7CBE\u9009\u6587\u7AE0 ")])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("summary",[e("span",{staticClass:"expand-icon"},[t._v("\u25BC")]),t._v(" \u5C55\u5F00\u5185\u5BB9 ")])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"panel highlight"},[e("h3",[e("span",{staticClass:"panel-icon"},[t._v("\u{1F527}")]),t._v(" \u5185\u5BB9\u6765\u6E90 ")]),e("p",[t._v(" \u81EA\u52A8\u8BFB\u53D6 "),e("code",[t._v("/vdocs/blog/*.md")]),t._v(" \u4E0E "),e("code",[t._v("/pattern/*.{md,js,html}")]),t._v(" \u5E76\u6CE8\u5165\u4E3B\u7AD9\u535A\u5BA2\u6D41\u3002 ")])])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"panel"},[e("h3",[e("span",{staticClass:"panel-icon"},[t._v("\u{1F310}")]),t._v(" \u5DE5\u5177\u95E8\u6237 ")]),e("p",[t._v("\u8BBF\u95EE "),e("code",[t._v("/agent-portal")]),t._v(" \u83B7\u53D6 Agent Prompt \u5DE5\u5177\u95E8\u6237\u3002")])])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("h3",[e("span",{staticClass:"panel-icon"},[t._v("\u{1F4CA}")]),t._v(" \u5FEB\u901F\u7EDF\u8BA1 ")])}],Cp=Mo(_p,yp,wp,!1,null,"bfbf9a44",null,null);const xp=Cp.exports;B.use(Ro);const Fo=new Ro({mode:"history",base:"/",routes:[{path:"/",name:"home",component:xp,meta:{title:"\u9996\u9875"}},{path:"/about",name:"about",component:()=>Qt(()=>import("./AboutView.6299c611.js"),["assets/AboutView.6299c611.js","assets/AboutView.9ca38c5c.css"]),meta:{title:"About"}},{path:"/codex",name:"codex",component:()=>Qt(()=>import("./CodexView.91a4b37d.js"),["assets/CodexView.91a4b37d.js","assets/CodexView.6efb2c7e.css"]),meta:{title:"Codex"}},{path:"/agent-portal",name:"agent-portal",component:()=>Qt(()=>import("./AgentPortalView.49f7bfe8.js"),["assets/AgentPortalView.49f7bfe8.js","assets/AgentPortalView.11d5c5e1.css"]),meta:{title:"Agent Portal"}},{path:"/blog/:slug",name:"blog-detail",component:()=>Qt(()=>import("./BlogDetailView.36c2b5bc.js"),["assets/BlogDetailView.36c2b5bc.js","assets/BlogDetailView.0f9f9348.css"])},{path:"/tic-tac-toe",name:"tic-tac-toe",component:()=>Qt(()=>import("./TicTacToeView.b85d0770.js"),["assets/TicTacToeView.b85d0770.js","assets/TicTacToeView.43e28bca.css"]),meta:{title:"Game"}},{path:"/overseas-export",name:"overseas-export",component:()=>Qt(()=>import("./OverseasExportView.0ca4f7cb.js"),["assets/OverseasExportView.0ca4f7cb.js","assets/OverseasExportView.bd9a2583.css"]),meta:{title:"Export"}}]}),Sp="/assets/logo.da9b9095.svg";const Op={computed:{menuRoutes(){return Fo.options.routes.filter(t=>t.meta&&t.meta.title)}}};var $p=function(){var e=this,n=e._self._c;return n("div",{attrs:{id:"app"}},[n("header",{staticClass:"site-header"},[e._m(0),n("nav",e._l(e.menuRoutes,function(r){return n("router-link",{key:r.path,attrs:{to:r.path}},[e._v(" "+e._s(r.meta.title)+" ")])}),1)]),n("router-view")],1)},Ep=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"brand"},[e("img",{staticClass:"logo",attrs:{alt:"Vue logo",src:Sp,width:"36",height:"36"}}),e("div",[e("p",{staticClass:"site-name"},[t._v("\u6280\u672F\u6539\u53D8\u751F\u6D3B")]),e("p",{staticClass:"site-subtitle"},[t._v("Technology Changes Life")])])])}],Ap=Mo(Op,$p,Ep,!1,null,"178bd187",null,null);const Pp=Ap.exports;B.use(Nf);new B({router:Fo,pinia:Df(),render:t=>t(Pp)}).$mount("#app");export{B as V,Tp as __vite_legacy_guard,mp as a,Ip as c,kp as d,Rp as g,Mo as n,os as r,fs as w};
