function kp(){import("data:text/javascript,")}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerpolicy&&(a.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?a.credentials="include":i.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=r(i);fetch(i.href,a)}})();/*!
 * Vue.js v2.7.15
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */var V=Object.freeze({}),T=Array.isArray;function x(t){return t==null}function d(t){return t!=null}function z(t){return t===!0}function Wo(t){return t===!1}function Ae(t){return typeof t=="string"||typeof t=="number"||typeof t=="symbol"||typeof t=="boolean"}function F(t){return typeof t=="function"}function K(t){return t!==null&&typeof t=="object"}var ln=Object.prototype.toString;function et(t){return ln.call(t)==="[object Object]"}function qo(t){return ln.call(t)==="[object RegExp]"}function aa(t){var e=parseFloat(String(t));return e>=0&&Math.floor(e)===e&&isFinite(t)}function Rr(t){return d(t)&&typeof t.then=="function"&&typeof t.catch=="function"}function Go(t){return t==null?"":Array.isArray(t)||et(t)&&t.toString===ln?JSON.stringify(t,null,2):String(t)}function ye(t){var e=parseFloat(t);return isNaN(e)?t:e}function ct(t,e){for(var r=Object.create(null),n=t.split(","),i=0;i<n.length;i++)r[n[i]]=!0;return e?function(a){return r[a.toLowerCase()]}:function(a){return r[a]}}ct("slot,component",!0);var Jo=ct("key,ref,slot,slot-scope,is");function Rt(t,e){var r=t.length;if(r){if(e===t[r-1]){t.length=r-1;return}var n=t.indexOf(e);if(n>-1)return t.splice(n,1)}}var Ko=Object.prototype.hasOwnProperty;function X(t,e){return Ko.call(t,e)}function Yt(t){var e=Object.create(null);return function(n){var i=e[n];return i||(e[n]=t(n))}}var Yo=/-(\w)/g,qt=Yt(function(t){return t.replace(Yo,function(e,r){return r?r.toUpperCase():""})}),Xo=Yt(function(t){return t.charAt(0).toUpperCase()+t.slice(1)}),Qo=/\B([A-Z])/g,Oe=Yt(function(t){return t.replace(Qo,"-$1").toLowerCase()});function Vo(t,e){function r(n){var i=arguments.length;return i?i>1?t.apply(e,arguments):t.call(e,n):t.call(e)}return r._length=t.length,r}function Zo(t,e){return t.bind(e)}var oa=Function.prototype.bind?Zo:Vo;function jr(t,e){e=e||0;for(var r=t.length-e,n=new Array(r);r--;)n[r]=t[r+e];return n}function L(t,e){for(var r in e)t[r]=e[r];return t}function sa(t){for(var e={},r=0;r<t.length;r++)t[r]&&L(e,t[r]);return e}function U(t,e,r){}var Ie=function(t,e,r){return!1},ua=function(t){return t};function Gt(t,e){if(t===e)return!0;var r=K(t),n=K(e);if(r&&n)try{var i=Array.isArray(t),a=Array.isArray(e);if(i&&a)return t.length===e.length&&t.every(function(u,c){return Gt(u,e[c])});if(t instanceof Date&&e instanceof Date)return t.getTime()===e.getTime();if(!i&&!a){var o=Object.keys(t),s=Object.keys(e);return o.length===s.length&&o.every(function(u){return Gt(t[u],e[u])})}else return!1}catch(u){return!1}else return!r&&!n?String(t)===String(e):!1}function ca(t,e){for(var r=0;r<t.length;r++)if(Gt(t[r],e))return r;return-1}function Ze(t){var e=!1;return function(){e||(e=!0,t.apply(this,arguments))}}function Dr(t,e){return t===e?t===0&&1/t!==1/e:t===t||e===e}var zn="data-server-rendered",gr=["component","directive","filter"],fa=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch","renderTracked","renderTriggered"],at={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:Ie,isReservedAttr:Ie,isUnknownElement:Ie,getTagNamespace:U,parsePlatformTagName:ua,mustUseProp:Ie,async:!0,_lifecycleHooks:fa},ts=/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;function la(t){var e=(t+"").charCodeAt(0);return e===36||e===95}function Z(t,e,r,n){Object.defineProperty(t,e,{value:r,enumerable:!!n,writable:!0,configurable:!0})}var es=new RegExp("[^".concat(ts.source,".$_\\d]"));function rs(t){if(!es.test(t)){var e=t.split(".");return function(r){for(var n=0;n<e.length;n++){if(!r)return;r=r[e[n]]}return r}}}var ns="__proto__"in{},nt=typeof window<"u",Y=nt&&window.navigator.userAgent.toLowerCase(),ce=Y&&/msie|trident/.test(Y),fe=Y&&Y.indexOf("msie 9.0")>0,pn=Y&&Y.indexOf("edge/")>0;Y&&Y.indexOf("android")>0;var is=Y&&/iphone|ipad|ipod|ios/.test(Y);Y&&/chrome\/\d+/.test(Y);Y&&/phantomjs/.test(Y);var Wn=Y&&Y.match(/firefox\/(\d+)/),Fr={}.watch,pa=!1;if(nt)try{var qn={};Object.defineProperty(qn,"passive",{get:function(){pa=!0}}),window.addEventListener("test-passive",null,qn)}catch(t){}var ke,jt=function(){return ke===void 0&&(!nt&&typeof global<"u"?ke=global.process&&global.process.env.VUE_ENV==="server":ke=!1),ke},tr=nt&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function oe(t){return typeof t=="function"&&/native code/.test(t.toString())}var $e=typeof Symbol<"u"&&oe(Symbol)&&typeof Reflect<"u"&&oe(Reflect.ownKeys),we;typeof Set<"u"&&oe(Set)?we=Set:we=function(){function t(){this.set=Object.create(null)}return t.prototype.has=function(e){return this.set[e]===!0},t.prototype.add=function(e){this.set[e]=!0},t.prototype.clear=function(){this.set=Object.create(null)},t}();var pt=null;function Pt(t){t===void 0&&(t=null),t||pt&&pt._scope.off(),pt=t,t&&t._scope.on()}var rt=function(){function t(e,r,n,i,a,o,s,u){this.tag=e,this.data=r,this.children=n,this.text=i,this.elm=a,this.ns=void 0,this.context=o,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=r&&r.key,this.componentOptions=s,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=u,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1}return Object.defineProperty(t.prototype,"child",{get:function(){return this.componentInstance},enumerable:!1,configurable:!0}),t}(),Ut=function(t){t===void 0&&(t="");var e=new rt;return e.text=t,e.isComment=!0,e};function re(t){return new rt(void 0,void 0,void 0,String(t))}function Lr(t){var e=new rt(t.tag,t.data,t.children&&t.children.slice(),t.text,t.elm,t.context,t.componentOptions,t.asyncFactory);return e.ns=t.ns,e.isStatic=t.isStatic,e.key=t.key,e.isComment=t.isComment,e.fnContext=t.fnContext,e.fnOptions=t.fnOptions,e.fnScopeId=t.fnScopeId,e.asyncMeta=t.asyncMeta,e.isCloned=!0,e}var as=0,Be=[],os=function(){for(var t=0;t<Be.length;t++){var e=Be[t];e.subs=e.subs.filter(function(r){return r}),e._pending=!1}Be.length=0},_t=function(){function t(){this._pending=!1,this.id=as++,this.subs=[]}return t.prototype.addSub=function(e){this.subs.push(e)},t.prototype.removeSub=function(e){this.subs[this.subs.indexOf(e)]=null,this._pending||(this._pending=!0,Be.push(this))},t.prototype.depend=function(e){t.target&&t.target.addDep(this)},t.prototype.notify=function(e){for(var r=this.subs.filter(function(o){return o}),n=0,i=r.length;n<i;n++){var a=r[n];a.update()}},t}();_t.target=null;var Ue=[];function le(t){Ue.push(t),_t.target=t}function pe(){Ue.pop(),_t.target=Ue[Ue.length-1]}var da=Array.prototype,er=Object.create(da),ss=["push","pop","shift","unshift","splice","sort","reverse"];ss.forEach(function(t){var e=da[t];Z(er,t,function(){for(var n=[],i=0;i<arguments.length;i++)n[i]=arguments[i];var a=e.apply(this,n),o=this.__ob__,s;switch(t){case"push":case"unshift":s=n;break;case"splice":s=n.slice(2);break}return s&&o.observeArray(s),o.dep.notify(),a})});var Gn=Object.getOwnPropertyNames(er),ha={},dn=!0;function It(t){dn=t}var us={notify:U,depend:U,addSub:U,removeSub:U},Jn=function(){function t(e,r,n){if(r===void 0&&(r=!1),n===void 0&&(n=!1),this.value=e,this.shallow=r,this.mock=n,this.dep=n?us:new _t,this.vmCount=0,Z(e,"__ob__",this),T(e)){if(!n)if(ns)e.__proto__=er;else for(var i=0,a=Gn.length;i<a;i++){var o=Gn[i];Z(e,o,er[o])}r||this.observeArray(e)}else for(var s=Object.keys(e),i=0;i<s.length;i++){var o=s[i];kt(e,o,ha,void 0,r,n)}}return t.prototype.observeArray=function(e){for(var r=0,n=e.length;r<n;r++)yt(e[r],!1,this.mock)},t}();function yt(t,e,r){if(t&&X(t,"__ob__")&&t.__ob__ instanceof Jn)return t.__ob__;if(dn&&(r||!jt())&&(T(t)||et(t))&&Object.isExtensible(t)&&!t.__v_skip&&!tt(t)&&!(t instanceof rt))return new Jn(t,e,r)}function kt(t,e,r,n,i,a){var o=new _t,s=Object.getOwnPropertyDescriptor(t,e);if(!(s&&s.configurable===!1)){var u=s&&s.get,c=s&&s.set;(!u||c)&&(r===ha||arguments.length===2)&&(r=t[e]);var f=!i&&yt(r,!1,a);return Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){var v=u?u.call(t):r;return _t.target&&(o.depend(),f&&(f.dep.depend(),T(v)&&ma(v))),tt(v)&&!i?v.value:v},set:function(v){var g=u?u.call(t):r;if(!!Dr(g,v)){if(c)c.call(t,v);else{if(u)return;if(!i&&tt(g)&&!tt(v)){g.value=v;return}else r=v}f=!i&&yt(v,!1,a),o.notify()}}}),o}}function hn(t,e,r){if(!br(t)){var n=t.__ob__;return T(t)&&aa(e)?(t.length=Math.max(t.length,e),t.splice(e,1,r),n&&!n.shallow&&n.mock&&yt(r,!1,!0),r):e in t&&!(e in Object.prototype)?(t[e]=r,r):t._isVue||n&&n.vmCount?r:n?(kt(n.value,e,r,void 0,n.shallow,n.mock),n.dep.notify(),r):(t[e]=r,r)}}function va(t,e){if(T(t)&&aa(e)){t.splice(e,1);return}var r=t.__ob__;t._isVue||r&&r.vmCount||br(t)||!X(t,e)||(delete t[e],r&&r.dep.notify())}function ma(t){for(var e=void 0,r=0,n=t.length;r<n;r++)e=t[r],e&&e.__ob__&&e.__ob__.dep.depend(),T(e)&&ma(e)}function ga(t){return cs(t,!0),Z(t,"__v_isShallow",!0),t}function cs(t,e){br(t)||yt(t,e,jt())}function He(t){return br(t)?He(t.__v_raw):!!(t&&t.__ob__)}function Kn(t){return!!(t&&t.__v_isShallow)}function br(t){return!!(t&&t.__v_isReadonly)}function _r(t){var e=t&&t.__v_raw;return e?_r(e):t}function ba(t){return Object.isExtensible(t)&&Z(t,"__v_skip",!0),t}var _a="__v_isRef";function tt(t){return!!(t&&t.__v_isRef===!0)}function fs(t){return ls(t,!1)}function ls(t,e){if(tt(t))return t;var r={};return Z(r,_a,!0),Z(r,"__v_isShallow",e),Z(r,"dep",kt(r,"value",t,null,e,jt())),r}function ps(t){return tt(t)?t.value:t}function Mr(t,e,r){Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:function(){var n=e[r];if(tt(n))return n.value;var i=n&&n.__ob__;return i&&i.dep.depend(),n},set:function(n){var i=e[r];tt(i)&&!tt(n)?i.value=n:e[r]=n}})}function Rp(t,e){var r,n,i=F(t);i?(r=t,n=U):(r=t.get,n=t.set);var a=jt()?null:new Te(pt,r,U,{lazy:!0}),o={effect:a,get value(){return a?(a.dirty&&a.evaluate(),_t.target&&a.depend(),a.value):r()},set value(s){n(s)}};return Z(o,_a,!0),Z(o,"__v_isReadonly",i),o}var yr="watcher",Yn="".concat(yr," callback"),Xn="".concat(yr," getter"),ds="".concat(yr," cleanup"),Qn={};function hs(t,e,r){return vs(t,e,r)}function vs(t,e,r){var n=r===void 0?V:r,i=n.immediate,a=n.deep,o=n.flush,s=o===void 0?"pre":o;n.onTrack,n.onTrigger;var u=pt,c=function(C,$,P){return P===void 0&&(P=null),wt(C,null,P,u,$)},f,h=!1,v=!1;if(tt(t)?(f=function(){return t.value},h=Kn(t)):He(t)?(f=function(){return t.__ob__.dep.depend(),t},a=!0):T(t)?(v=!0,h=t.some(function(C){return He(C)||Kn(C)}),f=function(){return t.map(function(C){if(tt(C))return C.value;if(He(C))return se(C);if(F(C))return c(C,Xn)})}):F(t)?e?f=function(){return c(t,Xn)}:f=function(){if(!(u&&u._isDestroyed))return _&&_(),c(t,yr,[y])}:f=U,e&&a){var g=f;f=function(){return se(g())}}var _,y=function(C){_=b.onStop=function(){c(C,ds)}};if(jt())return y=U,e?i&&c(e,Yn,[f(),v?[]:void 0,y]):f(),U;var b=new Te(pt,f,U,{lazy:!0});b.noRecurse=!e;var S=v?[]:Qn;return b.run=function(){if(!!b.active)if(e){var C=b.get();(a||h||(v?C.some(function($,P){return Dr($,S[P])}):Dr(C,S)))&&(_&&_(),c(e,Yn,[C,S===Qn?void 0:S,y]),S=C)}else b.get()},s==="sync"?b.update=b.run:s==="post"?(b.post=!0,b.update=function(){return Gr(b)}):b.update=function(){if(u&&u===pt&&!u._isMounted){var C=u._preWatchers||(u._preWatchers=[]);C.indexOf(b)<0&&C.push(b)}else Gr(b)},e?i?b.run():S=b.get():s==="post"&&u?u.$once("hook:mounted",function(){return b.get()}):b.get(),function(){b.teardown()}}var Q,ya=function(){function t(e){e===void 0&&(e=!1),this.detached=e,this.active=!0,this.effects=[],this.cleanups=[],this.parent=Q,!e&&Q&&(this.index=(Q.scopes||(Q.scopes=[])).push(this)-1)}return t.prototype.run=function(e){if(this.active){var r=Q;try{return Q=this,e()}finally{Q=r}}},t.prototype.on=function(){Q=this},t.prototype.off=function(){Q=this.parent},t.prototype.stop=function(e){if(this.active){var r=void 0,n=void 0;for(r=0,n=this.effects.length;r<n;r++)this.effects[r].teardown();for(r=0,n=this.cleanups.length;r<n;r++)this.cleanups[r]();if(this.scopes)for(r=0,n=this.scopes.length;r<n;r++)this.scopes[r].stop(!0);if(!this.detached&&this.parent&&!e){var i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0,this.active=!1}},t}();function ms(t){return new ya(t)}function gs(t,e){e===void 0&&(e=Q),e&&e.active&&e.effects.push(t)}function bs(){return Q}function _s(t){var e=t._provided,r=t.$parent&&t.$parent._provided;return r===e?t._provided=Object.create(r):e}var Vn=Yt(function(t){var e=t.charAt(0)==="&";t=e?t.slice(1):t;var r=t.charAt(0)==="~";t=r?t.slice(1):t;var n=t.charAt(0)==="!";return t=n?t.slice(1):t,{name:t,once:r,capture:n,passive:e}});function Nr(t,e){function r(){var n=r.fns;if(T(n))for(var i=n.slice(),a=0;a<i.length;a++)wt(i[a],null,arguments,e,"v-on handler");else return wt(n,null,arguments,e,"v-on handler")}return r.fns=t,r}function wa(t,e,r,n,i,a){var o,s,u,c;for(o in t)s=t[o],u=e[o],c=Vn(o),x(s)||(x(u)?(x(s.fns)&&(s=t[o]=Nr(s,a)),z(c.once)&&(s=t[o]=i(c.name,s,c.capture)),r(c.name,s,c.capture,c.passive,c.params)):s!==u&&(u.fns=s,t[o]=u));for(o in e)x(t[o])&&(c=Vn(o),n(c.name,e[o],c.capture))}function Et(t,e,r){t instanceof rt&&(t=t.data.hook||(t.data.hook={}));var n,i=t[e];function a(){r.apply(this,arguments),Rt(n.fns,a)}x(i)?n=Nr([a]):d(i.fns)&&z(i.merged)?(n=i,n.fns.push(a)):n=Nr([i,a]),n.merged=!0,t[e]=n}function ys(t,e,r){var n=e.options.props;if(!x(n)){var i={},a=t.attrs,o=t.props;if(d(a)||d(o))for(var s in n){var u=Oe(s);Zn(i,o,s,u,!0)||Zn(i,a,s,u,!1)}return i}}function Zn(t,e,r,n,i){if(d(e)){if(X(e,r))return t[r]=e[r],i||delete e[r],!0;if(X(e,n))return t[r]=e[n],i||delete e[n],!0}return!1}function ws(t){for(var e=0;e<t.length;e++)if(T(t[e]))return Array.prototype.concat.apply([],t);return t}function vn(t){return Ae(t)?[re(t)]:T(t)?Sa(t):void 0}function he(t){return d(t)&&d(t.text)&&Wo(t.isComment)}function Sa(t,e){var r=[],n,i,a,o;for(n=0;n<t.length;n++)i=t[n],!(x(i)||typeof i=="boolean")&&(a=r.length-1,o=r[a],T(i)?i.length>0&&(i=Sa(i,"".concat(e||"","_").concat(n)),he(i[0])&&he(o)&&(r[a]=re(o.text+i[0].text),i.shift()),r.push.apply(r,i)):Ae(i)?he(o)?r[a]=re(o.text+i):i!==""&&r.push(re(i)):he(i)&&he(o)?r[a]=re(o.text+i.text):(z(t._isVList)&&d(i.tag)&&x(i.key)&&d(e)&&(i.key="__vlist".concat(e,"_").concat(n,"__")),r.push(i)));return r}function Ss(t,e){var r=null,n,i,a,o;if(T(t)||typeof t=="string")for(r=new Array(t.length),n=0,i=t.length;n<i;n++)r[n]=e(t[n],n);else if(typeof t=="number")for(r=new Array(t),n=0;n<t;n++)r[n]=e(n+1,n);else if(K(t))if($e&&t[Symbol.iterator]){r=[];for(var s=t[Symbol.iterator](),u=s.next();!u.done;)r.push(e(u.value,r.length)),u=s.next()}else for(a=Object.keys(t),r=new Array(a.length),n=0,i=a.length;n<i;n++)o=a[n],r[n]=e(t[o],o,n);return d(r)||(r=[]),r._isVList=!0,r}function Cs(t,e,r,n){var i=this.$scopedSlots[t],a;i?(r=r||{},n&&(r=L(L({},n),r)),a=i(r)||(F(e)?e():e)):a=this.$slots[t]||(F(e)?e():e);var o=r&&r.slot;return o?this.$createElement("template",{slot:o},a):a}function Es(t){return or(this.$options,"filters",t)||ua}function ti(t,e){return T(t)?t.indexOf(e)===-1:t!==e}function xs(t,e,r,n,i){var a=at.keyCodes[e]||r;return i&&n&&!at.keyCodes[e]?ti(i,n):a?ti(a,t):n?Oe(n)!==e:t===void 0}function As(t,e,r,n,i){if(r&&K(r)){T(r)&&(r=sa(r));var a=void 0,o=function(u){if(u==="class"||u==="style"||Jo(u))a=t;else{var c=t.attrs&&t.attrs.type;a=n||at.mustUseProp(e,c,u)?t.domProps||(t.domProps={}):t.attrs||(t.attrs={})}var f=qt(u),h=Oe(u);if(!(f in a)&&!(h in a)&&(a[u]=r[u],i)){var v=t.on||(t.on={});v["update:".concat(u)]=function(g){r[u]=g}}};for(var s in r)o(s)}return t}function Os(t,e){var r=this._staticTrees||(this._staticTrees=[]),n=r[t];return n&&!e||(n=r[t]=this.$options.staticRenderFns[t].call(this._renderProxy,this._c,this),Ca(n,"__static__".concat(t),!1)),n}function $s(t,e,r){return Ca(t,"__once__".concat(e).concat(r?"_".concat(r):""),!0),t}function Ca(t,e,r){if(T(t))for(var n=0;n<t.length;n++)t[n]&&typeof t[n]!="string"&&ei(t[n],"".concat(e,"_").concat(n),r);else ei(t,e,r)}function ei(t,e,r){t.isStatic=!0,t.key=e,t.isOnce=r}function Ts(t,e){if(e&&et(e)){var r=t.on=t.on?L({},t.on):{};for(var n in e){var i=r[n],a=e[n];r[n]=i?[].concat(i,a):a}}return t}function Ea(t,e,r,n){e=e||{$stable:!r};for(var i=0;i<t.length;i++){var a=t[i];T(a)?Ea(a,e,r):a&&(a.proxy&&(a.fn.proxy=!0),e[a.key]=a.fn)}return n&&(e.$key=n),e}function Ps(t,e){for(var r=0;r<e.length;r+=2){var n=e[r];typeof n=="string"&&n&&(t[e[r]]=e[r+1])}return t}function Is(t,e){return typeof t=="string"?e+t:t}function xa(t){t._o=$s,t._n=ye,t._s=Go,t._l=Ss,t._t=Cs,t._q=Gt,t._i=ca,t._m=Os,t._f=Es,t._k=xs,t._b=As,t._v=re,t._e=Ut,t._u=Ea,t._g=Ts,t._d=Ps,t._p=Is}function mn(t,e){if(!t||!t.length)return{};for(var r={},n=0,i=t.length;n<i;n++){var a=t[n],o=a.data;if(o&&o.attrs&&o.attrs.slot&&delete o.attrs.slot,(a.context===e||a.fnContext===e)&&o&&o.slot!=null){var s=o.slot,u=r[s]||(r[s]=[]);a.tag==="template"?u.push.apply(u,a.children||[]):u.push(a)}else(r.default||(r.default=[])).push(a)}for(var c in r)r[c].every(ks)&&delete r[c];return r}function ks(t){return t.isComment&&!t.asyncFactory||t.text===" "}function Se(t){return t.isComment&&t.asyncFactory}function _e(t,e,r,n){var i,a=Object.keys(r).length>0,o=e?!!e.$stable:!a,s=e&&e.$key;if(!e)i={};else{if(e._normalized)return e._normalized;if(o&&n&&n!==V&&s===n.$key&&!a&&!n.$hasNormal)return n;i={};for(var u in e)e[u]&&u[0]!=="$"&&(i[u]=Rs(t,r,u,e[u]))}for(var c in r)c in i||(i[c]=js(r,c));return e&&Object.isExtensible(e)&&(e._normalized=i),Z(i,"$stable",o),Z(i,"$key",s),Z(i,"$hasNormal",a),i}function Rs(t,e,r,n){var i=function(){var a=pt;Pt(t);var o=arguments.length?n.apply(null,arguments):n({});o=o&&typeof o=="object"&&!T(o)?[o]:vn(o);var s=o&&o[0];return Pt(a),o&&(!s||o.length===1&&s.isComment&&!Se(s))?void 0:o};return n.proxy&&Object.defineProperty(e,r,{get:i,enumerable:!0,configurable:!0}),i}function js(t,e){return function(){return t[e]}}function Ds(t){var e=t.$options,r=e.setup;if(r){var n=t._setupContext=Fs(t);Pt(t),le();var i=wt(r,null,[t._props||ga({}),n],t,"setup");if(pe(),Pt(),F(i))e.render=i;else if(K(i))if(t._setupState=i,i.__sfc){var o=t._setupProxy={};for(var a in i)a!=="__sfc"&&Mr(o,i,a)}else for(var a in i)la(a)||Mr(t,i,a)}}function Fs(t){return{get attrs(){if(!t._attrsProxy){var e=t._attrsProxy={};Z(e,"_v_attr_proxy",!0),rr(e,t.$attrs,V,t,"$attrs")}return t._attrsProxy},get listeners(){if(!t._listenersProxy){var e=t._listenersProxy={};rr(e,t.$listeners,V,t,"$listeners")}return t._listenersProxy},get slots(){return Ms(t)},emit:oa(t.$emit,t),expose:function(e){e&&Object.keys(e).forEach(function(r){return Mr(t,e,r)})}}}function rr(t,e,r,n,i){var a=!1;for(var o in e)o in t?e[o]!==r[o]&&(a=!0):(a=!0,Ls(t,o,n,i));for(var o in t)o in e||(a=!0,delete t[o]);return a}function Ls(t,e,r,n){Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){return r[n][e]}})}function Ms(t){return t._slotsProxy||Aa(t._slotsProxy={},t.$scopedSlots),t._slotsProxy}function Aa(t,e){for(var r in e)t[r]=e[r];for(var r in t)r in e||delete t[r]}function Ns(t){t._vnode=null,t._staticTrees=null;var e=t.$options,r=t.$vnode=e._parentVnode,n=r&&r.context;t.$slots=mn(e._renderChildren,n),t.$scopedSlots=r?_e(t.$parent,r.data.scopedSlots,t.$slots):V,t._c=function(a,o,s,u){return nr(t,a,o,s,u,!1)},t.$createElement=function(a,o,s,u){return nr(t,a,o,s,u,!0)};var i=r&&r.data;kt(t,"$attrs",i&&i.attrs||V,null,!0),kt(t,"$listeners",e._parentListeners||V,null,!0)}var Br=null;function Bs(t){xa(t.prototype),t.prototype.$nextTick=function(e){return gn(e,this)},t.prototype._render=function(){var e=this,r=e.$options,n=r.render,i=r._parentVnode;i&&e._isMounted&&(e.$scopedSlots=_e(e.$parent,i.data.scopedSlots,e.$slots,e.$scopedSlots),e._slotsProxy&&Aa(e._slotsProxy,e.$scopedSlots)),e.$vnode=i;var a;try{Pt(e),Br=e,a=n.call(e._renderProxy,e.$createElement)}catch(o){Jt(o,e,"render"),a=e._vnode}finally{Br=null,Pt()}return T(a)&&a.length===1&&(a=a[0]),a instanceof rt||(a=Ut()),a.parent=i,a}}function xr(t,e){return(t.__esModule||$e&&t[Symbol.toStringTag]==="Module")&&(t=t.default),K(t)?e.extend(t):t}function Us(t,e,r,n,i){var a=Ut();return a.asyncFactory=t,a.asyncMeta={data:e,context:r,children:n,tag:i},a}function Hs(t,e){if(z(t.error)&&d(t.errorComp))return t.errorComp;if(d(t.resolved))return t.resolved;var r=Br;if(r&&d(t.owners)&&t.owners.indexOf(r)===-1&&t.owners.push(r),z(t.loading)&&d(t.loadingComp))return t.loadingComp;if(r&&!d(t.owners)){var n=t.owners=[r],i=!0,a=null,o=null;r.$on("hook:destroyed",function(){return Rt(n,r)});var s=function(h){for(var v=0,g=n.length;v<g;v++)n[v].$forceUpdate();h&&(n.length=0,a!==null&&(clearTimeout(a),a=null),o!==null&&(clearTimeout(o),o=null))},u=Ze(function(h){t.resolved=xr(h,e),i?n.length=0:s(!0)}),c=Ze(function(h){d(t.errorComp)&&(t.error=!0,s(!0))}),f=t(u,c);return K(f)&&(Rr(f)?x(t.resolved)&&f.then(u,c):Rr(f.component)&&(f.component.then(u,c),d(f.error)&&(t.errorComp=xr(f.error,e)),d(f.loading)&&(t.loadingComp=xr(f.loading,e),f.delay===0?t.loading=!0:a=setTimeout(function(){a=null,x(t.resolved)&&x(t.error)&&(t.loading=!0,s(!1))},f.delay||200)),d(f.timeout)&&(o=setTimeout(function(){o=null,x(t.resolved)&&c(null)},f.timeout)))),i=!1,t.loading?t.loadingComp:t.resolved}}function Oa(t){if(T(t))for(var e=0;e<t.length;e++){var r=t[e];if(d(r)&&(d(r.componentOptions)||Se(r)))return r}}var zs=1,$a=2;function nr(t,e,r,n,i,a){return(T(r)||Ae(r))&&(i=n,n=r,r=void 0),z(a)&&(i=$a),Ws(t,e,r,n,i)}function Ws(t,e,r,n,i){if(d(r)&&d(r.__ob__)||(d(r)&&d(r.is)&&(e=r.is),!e))return Ut();T(n)&&F(n[0])&&(r=r||{},r.scopedSlots={default:n[0]},n.length=0),i===$a?n=vn(n):i===zs&&(n=ws(n));var a,o;if(typeof e=="string"){var s=void 0;o=t.$vnode&&t.$vnode.ns||at.getTagNamespace(e),at.isReservedTag(e)?a=new rt(at.parsePlatformTagName(e),r,n,void 0,void 0,t):(!r||!r.pre)&&d(s=or(t.$options,"components",e))?a=ci(s,r,t,n,e):a=new rt(e,r,n,void 0,void 0,t)}else a=ci(e,r,t,n);return T(a)?a:d(a)?(d(o)&&Ta(a,o),d(r)&&qs(r),a):Ut()}function Ta(t,e,r){if(t.ns=e,t.tag==="foreignObject"&&(e=void 0,r=!0),d(t.children))for(var n=0,i=t.children.length;n<i;n++){var a=t.children[n];d(a.tag)&&(x(a.ns)||z(r)&&a.tag!=="svg")&&Ta(a,e,r)}}function qs(t){K(t.style)&&se(t.style),K(t.class)&&se(t.class)}function Jt(t,e,r){le();try{if(e)for(var n=e;n=n.$parent;){var i=n.$options.errorCaptured;if(i)for(var a=0;a<i.length;a++)try{var o=i[a].call(n,t,e,r)===!1;if(o)return}catch(s){ri(s,n,"errorCaptured hook")}}ri(t,e,r)}finally{pe()}}function wt(t,e,r,n,i){var a;try{a=r?t.apply(e,r):t.call(e),a&&!a._isVue&&Rr(a)&&!a._handled&&(a.catch(function(o){return Jt(o,n,i+" (Promise/async)")}),a._handled=!0)}catch(o){Jt(o,n,i)}return a}function ri(t,e,r){if(at.errorHandler)try{return at.errorHandler.call(null,t,e,r)}catch(n){n!==t&&ni(n)}ni(t)}function ni(t,e,r){if(nt&&typeof console<"u")console.error(t);else throw t}var Ur=!1,Hr=[],zr=!1;function Re(){zr=!1;var t=Hr.slice(0);Hr.length=0;for(var e=0;e<t.length;e++)t[e]()}var ge;if(typeof Promise<"u"&&oe(Promise)){var Gs=Promise.resolve();ge=function(){Gs.then(Re),is&&setTimeout(U)},Ur=!0}else if(!ce&&typeof MutationObserver<"u"&&(oe(MutationObserver)||MutationObserver.toString()==="[object MutationObserverConstructor]")){var je=1,Js=new MutationObserver(Re),ii=document.createTextNode(String(je));Js.observe(ii,{characterData:!0}),ge=function(){je=(je+1)%2,ii.data=String(je)},Ur=!0}else typeof setImmediate<"u"&&oe(setImmediate)?ge=function(){setImmediate(Re)}:ge=function(){setTimeout(Re,0)};function gn(t,e){var r;if(Hr.push(function(){if(t)try{t.call(e)}catch(n){Jt(n,e,"nextTick")}else r&&r(e)}),zr||(zr=!0,ge()),!t&&typeof Promise<"u")return new Promise(function(n){r=n})}function Pa(t){return function(e,r){if(r===void 0&&(r=pt),!!r)return Ks(r,t,e)}}function Ks(t,e,r){var n=t.$options;n[e]=La(n[e],r)}var jp=Pa("mounted"),Dp=Pa("destroyed"),Ys="2.7.15";function Fp(t){return t}var ai=new we;function se(t){return ze(t,ai),ai.clear(),t}function ze(t,e){var r,n,i=T(t);if(!(!i&&!K(t)||t.__v_skip||Object.isFrozen(t)||t instanceof rt)){if(t.__ob__){var a=t.__ob__.dep.id;if(e.has(a))return;e.add(a)}if(i)for(r=t.length;r--;)ze(t[r],e);else if(tt(t))ze(t.value,e);else for(n=Object.keys(t),r=n.length;r--;)ze(t[n[r]],e)}}var Xs=0,Te=function(){function t(e,r,n,i,a){gs(this,Q&&!Q._vm?Q:e?e._scope:void 0),(this.vm=e)&&a&&(e._watcher=this),i?(this.deep=!!i.deep,this.user=!!i.user,this.lazy=!!i.lazy,this.sync=!!i.sync,this.before=i.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++Xs,this.active=!0,this.post=!1,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new we,this.newDepIds=new we,this.expression="",F(r)?this.getter=r:(this.getter=rs(r),this.getter||(this.getter=U)),this.value=this.lazy?void 0:this.get()}return t.prototype.get=function(){le(this);var e,r=this.vm;try{e=this.getter.call(r,r)}catch(n){if(this.user)Jt(n,r,'getter for watcher "'.concat(this.expression,'"'));else throw n}finally{this.deep&&se(e),pe(),this.cleanupDeps()}return e},t.prototype.addDep=function(e){var r=e.id;this.newDepIds.has(r)||(this.newDepIds.add(r),this.newDeps.push(e),this.depIds.has(r)||e.addSub(this))},t.prototype.cleanupDeps=function(){for(var e=this.deps.length;e--;){var r=this.deps[e];this.newDepIds.has(r.id)||r.removeSub(this)}var n=this.depIds;this.depIds=this.newDepIds,this.newDepIds=n,this.newDepIds.clear(),n=this.deps,this.deps=this.newDeps,this.newDeps=n,this.newDeps.length=0},t.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():Gr(this)},t.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||K(e)||this.deep){var r=this.value;if(this.value=e,this.user){var n='callback for watcher "'.concat(this.expression,'"');wt(this.cb,this.vm,[e,r],this.vm,n)}else this.cb.call(this.vm,e,r)}}},t.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},t.prototype.depend=function(){for(var e=this.deps.length;e--;)this.deps[e].depend()},t.prototype.teardown=function(){if(this.vm&&!this.vm._isBeingDestroyed&&Rt(this.vm._scope.effects,this),this.active){for(var e=this.deps.length;e--;)this.deps[e].removeSub(this);this.active=!1,this.onStop&&this.onStop()}},t}();function Qs(t){t._events=Object.create(null),t._hasHookEvent=!1;var e=t.$options._parentListeners;e&&Ia(t,e)}var Ce;function Vs(t,e){Ce.$on(t,e)}function Zs(t,e){Ce.$off(t,e)}function tu(t,e){var r=Ce;return function n(){var i=e.apply(null,arguments);i!==null&&r.$off(t,n)}}function Ia(t,e,r){Ce=t,wa(e,r||{},Vs,Zs,tu,t),Ce=void 0}function eu(t){var e=/^hook:/;t.prototype.$on=function(r,n){var i=this;if(T(r))for(var a=0,o=r.length;a<o;a++)i.$on(r[a],n);else(i._events[r]||(i._events[r]=[])).push(n),e.test(r)&&(i._hasHookEvent=!0);return i},t.prototype.$once=function(r,n){var i=this;function a(){i.$off(r,a),n.apply(i,arguments)}return a.fn=n,i.$on(r,a),i},t.prototype.$off=function(r,n){var i=this;if(!arguments.length)return i._events=Object.create(null),i;if(T(r)){for(var a=0,o=r.length;a<o;a++)i.$off(r[a],n);return i}var s=i._events[r];if(!s)return i;if(!n)return i._events[r]=null,i;for(var u,c=s.length;c--;)if(u=s[c],u===n||u.fn===n){s.splice(c,1);break}return i},t.prototype.$emit=function(r){var n=this,i=n._events[r];if(i){i=i.length>1?jr(i):i;for(var a=jr(arguments,1),o='event handler for "'.concat(r,'"'),s=0,u=i.length;s<u;s++)wt(i[s],n,a,n,o)}return n}}var Ht=null;function ka(t){var e=Ht;return Ht=t,function(){Ht=e}}function ru(t){var e=t.$options,r=e.parent;if(r&&!e.abstract){for(;r.$options.abstract&&r.$parent;)r=r.$parent;r.$children.push(t)}t.$parent=r,t.$root=r?r.$root:t,t.$children=[],t.$refs={},t._provided=r?r._provided:Object.create(null),t._watcher=null,t._inactive=null,t._directInactive=!1,t._isMounted=!1,t._isDestroyed=!1,t._isBeingDestroyed=!1}function nu(t){t.prototype._update=function(e,r){var n=this,i=n.$el,a=n._vnode,o=ka(n);n._vnode=e,a?n.$el=n.__patch__(a,e):n.$el=n.__patch__(n.$el,e,r,!1),o(),i&&(i.__vue__=null),n.$el&&(n.$el.__vue__=n);for(var s=n;s&&s.$vnode&&s.$parent&&s.$vnode===s.$parent._vnode;)s.$parent.$el=s.$el,s=s.$parent},t.prototype.$forceUpdate=function(){var e=this;e._watcher&&e._watcher.update()},t.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){ut(e,"beforeDestroy"),e._isBeingDestroyed=!0;var r=e.$parent;r&&!r._isBeingDestroyed&&!e.$options.abstract&&Rt(r.$children,e),e._scope.stop(),e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),ut(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}function iu(t,e,r){t.$el=e,t.$options.render||(t.$options.render=Ut),ut(t,"beforeMount");var n;n=function(){t._update(t._render(),r)};var i={before:function(){t._isMounted&&!t._isDestroyed&&ut(t,"beforeUpdate")}};new Te(t,n,U,i,!0),r=!1;var a=t._preWatchers;if(a)for(var o=0;o<a.length;o++)a[o].run();return t.$vnode==null&&(t._isMounted=!0,ut(t,"mounted")),t}function au(t,e,r,n,i){var a=n.data.scopedSlots,o=t.$scopedSlots,s=!!(a&&!a.$stable||o!==V&&!o.$stable||a&&t.$scopedSlots.$key!==a.$key||!a&&t.$scopedSlots.$key),u=!!(i||t.$options._renderChildren||s),c=t.$vnode;t.$options._parentVnode=n,t.$vnode=n,t._vnode&&(t._vnode.parent=n),t.$options._renderChildren=i;var f=n.data.attrs||V;t._attrsProxy&&rr(t._attrsProxy,f,c.data&&c.data.attrs||V,t,"$attrs")&&(u=!0),t.$attrs=f,r=r||V;var h=t.$options._parentListeners;if(t._listenersProxy&&rr(t._listenersProxy,r,h||V,t,"$listeners"),t.$listeners=t.$options._parentListeners=r,Ia(t,r,h),e&&t.$options.props){It(!1);for(var v=t._props,g=t.$options._propKeys||[],_=0;_<g.length;_++){var y=g[_],b=t.$options.props;v[y]=Cn(y,b,e,t)}It(!0),t.$options.propsData=e}u&&(t.$slots=mn(i,n.context),t.$forceUpdate())}function Ra(t){for(;t&&(t=t.$parent);)if(t._inactive)return!0;return!1}function bn(t,e){if(e){if(t._directInactive=!1,Ra(t))return}else if(t._directInactive)return;if(t._inactive||t._inactive===null){t._inactive=!1;for(var r=0;r<t.$children.length;r++)bn(t.$children[r]);ut(t,"activated")}}function ja(t,e){if(!(e&&(t._directInactive=!0,Ra(t)))&&!t._inactive){t._inactive=!0;for(var r=0;r<t.$children.length;r++)ja(t.$children[r]);ut(t,"deactivated")}}function ut(t,e,r,n){n===void 0&&(n=!0),le();var i=pt,a=bs();n&&Pt(t);var o=t.$options[e],s="".concat(e," hook");if(o)for(var u=0,c=o.length;u<c;u++)wt(o[u],t,r||null,t,s);t._hasHookEvent&&t.$emit("hook:"+e),n&&(Pt(i),a&&a.on()),pe()}var gt=[],_n=[],ir={},Wr=!1,yn=!1,ne=0;function ou(){ne=gt.length=_n.length=0,ir={},Wr=yn=!1}var Da=0,qr=Date.now;if(nt&&!ce){var Ar=window.performance;Ar&&typeof Ar.now=="function"&&qr()>document.createEvent("Event").timeStamp&&(qr=function(){return Ar.now()})}var su=function(t,e){if(t.post){if(!e.post)return 1}else if(e.post)return-1;return t.id-e.id};function uu(){Da=qr(),yn=!0;var t,e;for(gt.sort(su),ne=0;ne<gt.length;ne++)t=gt[ne],t.before&&t.before(),e=t.id,ir[e]=null,t.run();var r=_n.slice(),n=gt.slice();ou(),lu(r),cu(n),os(),tr&&at.devtools&&tr.emit("flush")}function cu(t){for(var e=t.length;e--;){var r=t[e],n=r.vm;n&&n._watcher===r&&n._isMounted&&!n._isDestroyed&&ut(n,"updated")}}function fu(t){t._inactive=!1,_n.push(t)}function lu(t){for(var e=0;e<t.length;e++)t[e]._inactive=!0,bn(t[e],!0)}function Gr(t){var e=t.id;if(ir[e]==null&&!(t===_t.target&&t.noRecurse)){if(ir[e]=!0,!yn)gt.push(t);else{for(var r=gt.length-1;r>ne&&gt[r].id>t.id;)r--;gt.splice(r+1,0,t)}Wr||(Wr=!0,gn(uu))}}function pu(t){var e=t.$options.provide;if(e){var r=F(e)?e.call(t):e;if(!K(r))return;for(var n=_s(t),i=$e?Reflect.ownKeys(r):Object.keys(r),a=0;a<i.length;a++){var o=i[a];Object.defineProperty(n,o,Object.getOwnPropertyDescriptor(r,o))}}}function du(t){var e=Fa(t.$options.inject,t);e&&(It(!1),Object.keys(e).forEach(function(r){kt(t,r,e[r])}),It(!0))}function Fa(t,e){if(t){for(var r=Object.create(null),n=$e?Reflect.ownKeys(t):Object.keys(t),i=0;i<n.length;i++){var a=n[i];if(a!=="__ob__"){var o=t[a].from;if(o in e._provided)r[a]=e._provided[o];else if("default"in t[a]){var s=t[a].default;r[a]=F(s)?s.call(e):s}}}return r}}function wn(t,e,r,n,i){var a=this,o=i.options,s;X(n,"_uid")?(s=Object.create(n),s._original=n):(s=n,n=n._original);var u=z(o._compiled),c=!u;this.data=t,this.props=e,this.children=r,this.parent=n,this.listeners=t.on||V,this.injections=Fa(o.inject,n),this.slots=function(){return a.$slots||_e(n,t.scopedSlots,a.$slots=mn(r,n)),a.$slots},Object.defineProperty(this,"scopedSlots",{enumerable:!0,get:function(){return _e(n,t.scopedSlots,this.slots())}}),u&&(this.$options=o,this.$slots=this.slots(),this.$scopedSlots=_e(n,t.scopedSlots,this.$slots)),o._scopeId?this._c=function(f,h,v,g){var _=nr(s,f,h,v,g,c);return _&&!T(_)&&(_.fnScopeId=o._scopeId,_.fnContext=n),_}:this._c=function(f,h,v,g){return nr(s,f,h,v,g,c)}}xa(wn.prototype);function hu(t,e,r,n,i){var a=t.options,o={},s=a.props;if(d(s))for(var u in s)o[u]=Cn(u,s,e||V);else d(r.attrs)&&si(o,r.attrs),d(r.props)&&si(o,r.props);var c=new wn(r,o,i,n,t),f=a.render.call(null,c._c,c);if(f instanceof rt)return oi(f,r,c.parent,a);if(T(f)){for(var h=vn(f)||[],v=new Array(h.length),g=0;g<h.length;g++)v[g]=oi(h[g],r,c.parent,a);return v}}function oi(t,e,r,n,i){var a=Lr(t);return a.fnContext=r,a.fnOptions=n,e.slot&&((a.data||(a.data={})).slot=e.slot),a}function si(t,e){for(var r in e)t[qt(r)]=e[r]}function ar(t){return t.name||t.__name||t._componentTag}var Sn={init:function(t,e){if(t.componentInstance&&!t.componentInstance._isDestroyed&&t.data.keepAlive){var r=t;Sn.prepatch(r,r)}else{var n=t.componentInstance=vu(t,Ht);n.$mount(e?t.elm:void 0,e)}},prepatch:function(t,e){var r=e.componentOptions,n=e.componentInstance=t.componentInstance;au(n,r.propsData,r.listeners,e,r.children)},insert:function(t){var e=t.context,r=t.componentInstance;r._isMounted||(r._isMounted=!0,ut(r,"mounted")),t.data.keepAlive&&(e._isMounted?fu(r):bn(r,!0))},destroy:function(t){var e=t.componentInstance;e._isDestroyed||(t.data.keepAlive?ja(e,!0):e.$destroy())}},ui=Object.keys(Sn);function ci(t,e,r,n,i){if(!x(t)){var a=r.$options._base;if(K(t)&&(t=a.extend(t)),typeof t=="function"){var o;if(x(t.cid)&&(o=t,t=Hs(o,a),t===void 0))return Us(o,e,r,n,i);e=e||{},xn(t),d(e.model)&&bu(t.options,e);var s=ys(e,t);if(z(t.options.functional))return hu(t,s,e,r,n);var u=e.on;if(e.on=e.nativeOn,z(t.options.abstract)){var c=e.slot;e={},c&&(e.slot=c)}mu(e);var f=ar(t.options)||i,h=new rt("vue-component-".concat(t.cid).concat(f?"-".concat(f):""),e,void 0,void 0,void 0,r,{Ctor:t,propsData:s,listeners:u,tag:i,children:n},o);return h}}}function vu(t,e){var r={_isComponent:!0,_parentVnode:t,parent:e},n=t.data.inlineTemplate;return d(n)&&(r.render=n.render,r.staticRenderFns=n.staticRenderFns),new t.componentOptions.Ctor(r)}function mu(t){for(var e=t.hook||(t.hook={}),r=0;r<ui.length;r++){var n=ui[r],i=e[n],a=Sn[n];i!==a&&!(i&&i._merged)&&(e[n]=i?gu(a,i):a)}}function gu(t,e){var r=function(n,i){t(n,i),e(n,i)};return r._merged=!0,r}function bu(t,e){var r=t.model&&t.model.prop||"value",n=t.model&&t.model.event||"input";(e.attrs||(e.attrs={}))[r]=e.model.value;var i=e.on||(e.on={}),a=i[n],o=e.model.callback;d(a)?(T(a)?a.indexOf(o)===-1:a!==o)&&(i[n]=[o].concat(a)):i[n]=o}var _u=U,lt=at.optionMergeStrategies;function Ee(t,e,r){if(r===void 0&&(r=!0),!e)return t;for(var n,i,a,o=$e?Reflect.ownKeys(e):Object.keys(e),s=0;s<o.length;s++)n=o[s],n!=="__ob__"&&(i=t[n],a=e[n],!r||!X(t,n)?hn(t,n,a):i!==a&&et(i)&&et(a)&&Ee(i,a));return t}function fi(t,e,r){return r?function(){var i=F(e)?e.call(r,r):e,a=F(t)?t.call(r,r):t;return i?Ee(i,a):a}:e?t?function(){return Ee(F(e)?e.call(this,this):e,F(t)?t.call(this,this):t)}:e:t}lt.data=function(t,e,r){return r?fi(t,e,r):e&&typeof e!="function"?t:fi(t,e)};function La(t,e){var r=e?t?t.concat(e):T(e)?e:[e]:t;return r&&yu(r)}function yu(t){for(var e=[],r=0;r<t.length;r++)e.indexOf(t[r])===-1&&e.push(t[r]);return e}fa.forEach(function(t){lt[t]=La});function wu(t,e,r,n){var i=Object.create(t||null);return e?L(i,e):i}gr.forEach(function(t){lt[t+"s"]=wu});lt.watch=function(t,e,r,n){if(t===Fr&&(t=void 0),e===Fr&&(e=void 0),!e)return Object.create(t||null);if(!t)return e;var i={};L(i,t);for(var a in e){var o=i[a],s=e[a];o&&!T(o)&&(o=[o]),i[a]=o?o.concat(s):T(s)?s:[s]}return i};lt.props=lt.methods=lt.inject=lt.computed=function(t,e,r,n){if(!t)return e;var i=Object.create(null);return L(i,t),e&&L(i,e),i};lt.provide=function(t,e){return t?function(){var r=Object.create(null);return Ee(r,F(t)?t.call(this):t),e&&Ee(r,F(e)?e.call(this):e,!1),r}:e};var Su=function(t,e){return e===void 0?t:e};function Cu(t,e){var r=t.props;if(!!r){var n={},i,a,o;if(T(r))for(i=r.length;i--;)a=r[i],typeof a=="string"&&(o=qt(a),n[o]={type:null});else if(et(r))for(var s in r)a=r[s],o=qt(s),n[o]=et(a)?a:{type:a};t.props=n}}function Eu(t,e){var r=t.inject;if(!!r){var n=t.inject={};if(T(r))for(var i=0;i<r.length;i++)n[r[i]]={from:r[i]};else if(et(r))for(var a in r){var o=r[a];n[a]=et(o)?L({from:a},o):{from:o}}}}function xu(t){var e=t.directives;if(e)for(var r in e){var n=e[r];F(n)&&(e[r]={bind:n,update:n})}}function Kt(t,e,r){if(F(e)&&(e=e.options),Cu(e),Eu(e),xu(e),!e._base&&(e.extends&&(t=Kt(t,e.extends,r)),e.mixins))for(var n=0,i=e.mixins.length;n<i;n++)t=Kt(t,e.mixins[n],r);var a={},o;for(o in t)s(o);for(o in e)X(t,o)||s(o);function s(u){var c=lt[u]||Su;a[u]=c(t[u],e[u],r,u)}return a}function or(t,e,r,n){if(typeof r=="string"){var i=t[e];if(X(i,r))return i[r];var a=qt(r);if(X(i,a))return i[a];var o=Xo(a);if(X(i,o))return i[o];var s=i[r]||i[a]||i[o];return s}}function Cn(t,e,r,n){var i=e[t],a=!X(r,t),o=r[t],s=pi(Boolean,i.type);if(s>-1){if(a&&!X(i,"default"))o=!1;else if(o===""||o===Oe(t)){var u=pi(String,i.type);(u<0||s<u)&&(o=!0)}}if(o===void 0){o=Au(n,i,t);var c=dn;It(!0),yt(o),It(c)}return o}function Au(t,e,r){if(!!X(e,"default")){var n=e.default;return t&&t.$options.propsData&&t.$options.propsData[r]===void 0&&t._props[r]!==void 0?t._props[r]:F(n)&&Jr(e.type)!=="Function"?n.call(t):n}}var Ou=/^\s*function (\w+)/;function Jr(t){var e=t&&t.toString().match(Ou);return e?e[1]:""}function li(t,e){return Jr(t)===Jr(e)}function pi(t,e){if(!T(e))return li(e,t)?0:-1;for(var r=0,n=e.length;r<n;r++)if(li(e[r],t))return r;return-1}var Ct={enumerable:!0,configurable:!0,get:U,set:U};function En(t,e,r){Ct.get=function(){return this[e][r]},Ct.set=function(i){this[e][r]=i},Object.defineProperty(t,r,Ct)}function $u(t){var e=t.$options;if(e.props&&Tu(t,e.props),Ds(t),e.methods&&ju(t,e.methods),e.data)Pu(t);else{var r=yt(t._data={});r&&r.vmCount++}e.computed&&Ru(t,e.computed),e.watch&&e.watch!==Fr&&Du(t,e.watch)}function Tu(t,e){var r=t.$options.propsData||{},n=t._props=ga({}),i=t.$options._propKeys=[],a=!t.$parent;a||It(!1);var o=function(u){i.push(u);var c=Cn(u,e,r,t);kt(n,u,c),u in t||En(t,"_props",u)};for(var s in e)o(s);It(!0)}function Pu(t){var e=t.$options.data;e=t._data=F(e)?Iu(e,t):e||{},et(e)||(e={});var r=Object.keys(e),n=t.$options.props;t.$options.methods;for(var i=r.length;i--;){var a=r[i];n&&X(n,a)||la(a)||En(t,"_data",a)}var o=yt(e);o&&o.vmCount++}function Iu(t,e){le();try{return t.call(e,e)}catch(r){return Jt(r,e,"data()"),{}}finally{pe()}}var ku={lazy:!0};function Ru(t,e){var r=t._computedWatchers=Object.create(null),n=jt();for(var i in e){var a=e[i],o=F(a)?a:a.get;n||(r[i]=new Te(t,o||U,U,ku)),i in t||Ma(t,i,a)}}function Ma(t,e,r){var n=!jt();F(r)?(Ct.get=n?di(e):hi(r),Ct.set=U):(Ct.get=r.get?n&&r.cache!==!1?di(e):hi(r.get):U,Ct.set=r.set||U),Object.defineProperty(t,e,Ct)}function di(t){return function(){var r=this._computedWatchers&&this._computedWatchers[t];if(r)return r.dirty&&r.evaluate(),_t.target&&r.depend(),r.value}}function hi(t){return function(){return t.call(this,this)}}function ju(t,e){t.$options.props;for(var r in e)t[r]=typeof e[r]!="function"?U:oa(e[r],t)}function Du(t,e){for(var r in e){var n=e[r];if(T(n))for(var i=0;i<n.length;i++)Kr(t,r,n[i]);else Kr(t,r,n)}}function Kr(t,e,r,n){return et(r)&&(n=r,r=r.handler),typeof r=="string"&&(r=t[r]),t.$watch(e,r,n)}function Fu(t){var e={};e.get=function(){return this._data};var r={};r.get=function(){return this._props},Object.defineProperty(t.prototype,"$data",e),Object.defineProperty(t.prototype,"$props",r),t.prototype.$set=hn,t.prototype.$delete=va,t.prototype.$watch=function(n,i,a){var o=this;if(et(i))return Kr(o,n,i,a);a=a||{},a.user=!0;var s=new Te(o,n,i,a);if(a.immediate){var u='callback for immediate watcher "'.concat(s.expression,'"');le(),wt(i,o,[s.value],o,u),pe()}return function(){s.teardown()}}}var Lu=0;function Mu(t){t.prototype._init=function(e){var r=this;r._uid=Lu++,r._isVue=!0,r.__v_skip=!0,r._scope=new ya(!0),r._scope._vm=!0,e&&e._isComponent?Nu(r,e):r.$options=Kt(xn(r.constructor),e||{},r),r._renderProxy=r,r._self=r,ru(r),Qs(r),Ns(r),ut(r,"beforeCreate",void 0,!1),du(r),$u(r),pu(r),ut(r,"created"),r.$options.el&&r.$mount(r.$options.el)}}function Nu(t,e){var r=t.$options=Object.create(t.constructor.options),n=e._parentVnode;r.parent=e.parent,r._parentVnode=n;var i=n.componentOptions;r.propsData=i.propsData,r._parentListeners=i.listeners,r._renderChildren=i.children,r._componentTag=i.tag,e.render&&(r.render=e.render,r.staticRenderFns=e.staticRenderFns)}function xn(t){var e=t.options;if(t.super){var r=xn(t.super),n=t.superOptions;if(r!==n){t.superOptions=r;var i=Bu(t);i&&L(t.extendOptions,i),e=t.options=Kt(r,t.extendOptions),e.name&&(e.components[e.name]=t)}}return e}function Bu(t){var e,r=t.options,n=t.sealedOptions;for(var i in r)r[i]!==n[i]&&(e||(e={}),e[i]=r[i]);return e}function H(t){this._init(t)}Mu(H);Fu(H);eu(H);nu(H);Bs(H);function Uu(t){t.use=function(e){var r=this._installedPlugins||(this._installedPlugins=[]);if(r.indexOf(e)>-1)return this;var n=jr(arguments,1);return n.unshift(this),F(e.install)?e.install.apply(e,n):F(e)&&e.apply(null,n),r.push(e),this}}function Hu(t){t.mixin=function(e){return this.options=Kt(this.options,e),this}}function zu(t){t.cid=0;var e=1;t.extend=function(r){r=r||{};var n=this,i=n.cid,a=r._Ctor||(r._Ctor={});if(a[i])return a[i];var o=ar(r)||ar(n.options),s=function(c){this._init(c)};return s.prototype=Object.create(n.prototype),s.prototype.constructor=s,s.cid=e++,s.options=Kt(n.options,r),s.super=n,s.options.props&&Wu(s),s.options.computed&&qu(s),s.extend=n.extend,s.mixin=n.mixin,s.use=n.use,gr.forEach(function(u){s[u]=n[u]}),o&&(s.options.components[o]=s),s.superOptions=n.options,s.extendOptions=r,s.sealedOptions=L({},s.options),a[i]=s,s}}function Wu(t){var e=t.options.props;for(var r in e)En(t.prototype,"_props",r)}function qu(t){var e=t.options.computed;for(var r in e)Ma(t.prototype,r,e[r])}function Gu(t){gr.forEach(function(e){t[e]=function(r,n){return n?(e==="component"&&et(n)&&(n.name=n.name||r,n=this.options._base.extend(n)),e==="directive"&&F(n)&&(n={bind:n,update:n}),this.options[e+"s"][r]=n,n):this.options[e+"s"][r]}})}function vi(t){return t&&(ar(t.Ctor.options)||t.tag)}function De(t,e){return T(t)?t.indexOf(e)>-1:typeof t=="string"?t.split(",").indexOf(e)>-1:qo(t)?t.test(e):!1}function mi(t,e){var r=t.cache,n=t.keys,i=t._vnode;for(var a in r){var o=r[a];if(o){var s=o.name;s&&!e(s)&&Yr(r,a,n,i)}}}function Yr(t,e,r,n){var i=t[e];i&&(!n||i.tag!==n.tag)&&i.componentInstance.$destroy(),t[e]=null,Rt(r,e)}var gi=[String,RegExp,Array],Ju={name:"keep-alive",abstract:!0,props:{include:gi,exclude:gi,max:[String,Number]},methods:{cacheVNode:function(){var t=this,e=t.cache,r=t.keys,n=t.vnodeToCache,i=t.keyToCache;if(n){var a=n.tag,o=n.componentInstance,s=n.componentOptions;e[i]={name:vi(s),tag:a,componentInstance:o},r.push(i),this.max&&r.length>parseInt(this.max)&&Yr(e,r[0],r,this._vnode),this.vnodeToCache=null}}},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var t in this.cache)Yr(this.cache,t,this.keys)},mounted:function(){var t=this;this.cacheVNode(),this.$watch("include",function(e){mi(t,function(r){return De(e,r)})}),this.$watch("exclude",function(e){mi(t,function(r){return!De(e,r)})})},updated:function(){this.cacheVNode()},render:function(){var t=this.$slots.default,e=Oa(t),r=e&&e.componentOptions;if(r){var n=vi(r),i=this,a=i.include,o=i.exclude;if(a&&(!n||!De(a,n))||o&&n&&De(o,n))return e;var s=this,u=s.cache,c=s.keys,f=e.key==null?r.Ctor.cid+(r.tag?"::".concat(r.tag):""):e.key;u[f]?(e.componentInstance=u[f].componentInstance,Rt(c,f),c.push(f)):(this.vnodeToCache=e,this.keyToCache=f),e.data.keepAlive=!0}return e||t&&t[0]}},Ku={KeepAlive:Ju};function Yu(t){var e={};e.get=function(){return at},Object.defineProperty(t,"config",e),t.util={warn:_u,extend:L,mergeOptions:Kt,defineReactive:kt},t.set=hn,t.delete=va,t.nextTick=gn,t.observable=function(r){return yt(r),r},t.options=Object.create(null),gr.forEach(function(r){t.options[r+"s"]=Object.create(null)}),t.options._base=t,L(t.options.components,Ku),Uu(t),Hu(t),zu(t),Gu(t)}Yu(H);Object.defineProperty(H.prototype,"$isServer",{get:jt});Object.defineProperty(H.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}});Object.defineProperty(H,"FunctionalRenderContext",{value:wn});H.version=Ys;var Xu=ct("style,class"),Qu=ct("input,textarea,option,select,progress"),Vu=function(t,e,r){return r==="value"&&Qu(t)&&e!=="button"||r==="selected"&&t==="option"||r==="checked"&&t==="input"||r==="muted"&&t==="video"},Na=ct("contenteditable,draggable,spellcheck"),Zu=ct("events,caret,typing,plaintext-only"),tc=function(t,e){return sr(e)||e==="false"?"false":t==="contenteditable"&&Zu(e)?e:"true"},ec=ct("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible"),Xr="http://www.w3.org/1999/xlink",An=function(t){return t.charAt(5)===":"&&t.slice(0,5)==="xlink"},Ba=function(t){return An(t)?t.slice(6,t.length):""},sr=function(t){return t==null||t===!1};function rc(t){for(var e=t.data,r=t,n=t;d(n.componentInstance);)n=n.componentInstance._vnode,n&&n.data&&(e=bi(n.data,e));for(;d(r=r.parent);)r&&r.data&&(e=bi(e,r.data));return nc(e.staticClass,e.class)}function bi(t,e){return{staticClass:On(t.staticClass,e.staticClass),class:d(t.class)?[t.class,e.class]:e.class}}function nc(t,e){return d(t)||d(e)?On(t,$n(e)):""}function On(t,e){return t?e?t+" "+e:t:e||""}function $n(t){return Array.isArray(t)?ic(t):K(t)?ac(t):typeof t=="string"?t:""}function ic(t){for(var e="",r,n=0,i=t.length;n<i;n++)d(r=$n(t[n]))&&r!==""&&(e&&(e+=" "),e+=r);return e}function ac(t){var e="";for(var r in t)t[r]&&(e&&(e+=" "),e+=r);return e}var oc={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},sc=ct("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),Tn=ct("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),Ua=function(t){return sc(t)||Tn(t)};function uc(t){if(Tn(t))return"svg";if(t==="math")return"math"}var Fe=Object.create(null);function cc(t){if(!nt)return!0;if(Ua(t))return!1;if(t=t.toLowerCase(),Fe[t]!=null)return Fe[t];var e=document.createElement(t);return t.indexOf("-")>-1?Fe[t]=e.constructor===window.HTMLUnknownElement||e.constructor===window.HTMLElement:Fe[t]=/HTMLUnknownElement/.test(e.toString())}var Qr=ct("text,number,password,search,email,tel,url");function fc(t){if(typeof t=="string"){var e=document.querySelector(t);return e||document.createElement("div")}else return t}function lc(t,e){var r=document.createElement(t);return t!=="select"||e.data&&e.data.attrs&&e.data.attrs.multiple!==void 0&&r.setAttribute("multiple","multiple"),r}function pc(t,e){return document.createElementNS(oc[t],e)}function dc(t){return document.createTextNode(t)}function hc(t){return document.createComment(t)}function vc(t,e,r){t.insertBefore(e,r)}function mc(t,e){t.removeChild(e)}function gc(t,e){t.appendChild(e)}function bc(t){return t.parentNode}function _c(t){return t.nextSibling}function yc(t){return t.tagName}function wc(t,e){t.textContent=e}function Sc(t,e){t.setAttribute(e,"")}var Cc=Object.freeze({__proto__:null,createElement:lc,createElementNS:pc,createTextNode:dc,createComment:hc,insertBefore:vc,removeChild:mc,appendChild:gc,parentNode:bc,nextSibling:_c,tagName:yc,setTextContent:wc,setStyleScope:Sc}),Ec={create:function(t,e){ie(e)},update:function(t,e){t.data.ref!==e.data.ref&&(ie(t,!0),ie(e))},destroy:function(t){ie(t,!0)}};function ie(t,e){var r=t.data.ref;if(!!d(r)){var n=t.context,i=t.componentInstance||t.elm,a=e?null:i,o=e?void 0:i;if(F(r)){wt(r,n,[a],n,"template ref function");return}var s=t.data.refInFor,u=typeof r=="string"||typeof r=="number",c=tt(r),f=n.$refs;if(u||c){if(s){var h=u?f[r]:r.value;e?T(h)&&Rt(h,i):T(h)?h.includes(i)||h.push(i):u?(f[r]=[i],_i(n,r,f[r])):r.value=[i]}else if(u){if(e&&f[r]!==i)return;f[r]=o,_i(n,r,a)}else if(c){if(e&&r.value!==i)return;r.value=a}}}}function _i(t,e,r){var n=t._setupState;n&&X(n,e)&&(tt(n[e])?n[e].value=r:n[e]=r)}var xt=new rt("",{},[]),ve=["create","activate","update","remove","destroy"];function Nt(t,e){return t.key===e.key&&t.asyncFactory===e.asyncFactory&&(t.tag===e.tag&&t.isComment===e.isComment&&d(t.data)===d(e.data)&&xc(t,e)||z(t.isAsyncPlaceholder)&&x(e.asyncFactory.error))}function xc(t,e){if(t.tag!=="input")return!0;var r,n=d(r=t.data)&&d(r=r.attrs)&&r.type,i=d(r=e.data)&&d(r=r.attrs)&&r.type;return n===i||Qr(n)&&Qr(i)}function Ac(t,e,r){var n,i,a={};for(n=e;n<=r;++n)i=t[n].key,d(i)&&(a[i]=n);return a}function Oc(t){var e,r,n={},i=t.modules,a=t.nodeOps;for(e=0;e<ve.length;++e)for(n[ve[e]]=[],r=0;r<i.length;++r)d(i[r][ve[e]])&&n[ve[e]].push(i[r][ve[e]]);function o(p){return new rt(a.tagName(p).toLowerCase(),{},[],void 0,p)}function s(p,l){function m(){--m.listeners===0&&u(p)}return m.listeners=l,m}function u(p){var l=a.parentNode(p);d(l)&&a.removeChild(l,p)}function c(p,l,m,w,E,I,A){if(d(p.elm)&&d(I)&&(p=I[A]=Lr(p)),p.isRootInsert=!E,!f(p,l,m,w)){var O=p.data,k=p.children,R=p.tag;d(R)?(p.elm=p.ns?a.createElementNS(p.ns,R):a.createElement(R,p),S(p),_(p,k,l),d(O)&&b(p,l),g(m,p.elm,w)):z(p.isComment)?(p.elm=a.createComment(p.text),g(m,p.elm,w)):(p.elm=a.createTextNode(p.text),g(m,p.elm,w))}}function f(p,l,m,w){var E=p.data;if(d(E)){var I=d(p.componentInstance)&&E.keepAlive;if(d(E=E.hook)&&d(E=E.init)&&E(p,!1),d(p.componentInstance))return h(p,l),g(m,p.elm,w),z(I)&&v(p,l,m,w),!0}}function h(p,l){d(p.data.pendingInsert)&&(l.push.apply(l,p.data.pendingInsert),p.data.pendingInsert=null),p.elm=p.componentInstance.$el,y(p)?(b(p,l),S(p)):(ie(p),l.push(p))}function v(p,l,m,w){for(var E,I=p;I.componentInstance;)if(I=I.componentInstance._vnode,d(E=I.data)&&d(E=E.transition)){for(E=0;E<n.activate.length;++E)n.activate[E](xt,I);l.push(I);break}g(m,p.elm,w)}function g(p,l,m){d(p)&&(d(m)?a.parentNode(m)===p&&a.insertBefore(p,l,m):a.appendChild(p,l))}function _(p,l,m){if(T(l))for(var w=0;w<l.length;++w)c(l[w],m,p.elm,null,!0,l,w);else Ae(p.text)&&a.appendChild(p.elm,a.createTextNode(String(p.text)))}function y(p){for(;p.componentInstance;)p=p.componentInstance._vnode;return d(p.tag)}function b(p,l){for(var m=0;m<n.create.length;++m)n.create[m](xt,p);e=p.data.hook,d(e)&&(d(e.create)&&e.create(xt,p),d(e.insert)&&l.push(p))}function S(p){var l;if(d(l=p.fnScopeId))a.setStyleScope(p.elm,l);else for(var m=p;m;)d(l=m.context)&&d(l=l.$options._scopeId)&&a.setStyleScope(p.elm,l),m=m.parent;d(l=Ht)&&l!==p.context&&l!==p.fnContext&&d(l=l.$options._scopeId)&&a.setStyleScope(p.elm,l)}function C(p,l,m,w,E,I){for(;w<=E;++w)c(m[w],I,p,l,!1,m,w)}function $(p){var l,m,w=p.data;if(d(w))for(d(l=w.hook)&&d(l=l.destroy)&&l(p),l=0;l<n.destroy.length;++l)n.destroy[l](p);if(d(l=p.children))for(m=0;m<p.children.length;++m)$(p.children[m])}function P(p,l,m){for(;l<=m;++l){var w=p[l];d(w)&&(d(w.tag)?(D(w),$(w)):u(w.elm))}}function D(p,l){if(d(l)||d(p.data)){var m,w=n.remove.length+1;for(d(l)?l.listeners+=w:l=s(p.elm,w),d(m=p.componentInstance)&&d(m=m._vnode)&&d(m.data)&&D(m,l),m=0;m<n.remove.length;++m)n.remove[m](p,l);d(m=p.data.hook)&&d(m=m.remove)?m(p,l):l()}else u(p.elm)}function N(p,l,m,w,E){for(var I=0,A=0,O=l.length-1,k=l[0],R=l[O],j=m.length-1,q=m[0],it=m[j],Ft,Lt,Mt,Qt,Er=!E;I<=O&&A<=j;)x(k)?k=l[++I]:x(R)?R=l[--O]:Nt(k,q)?(W(k,q,w,m,A),k=l[++I],q=m[++A]):Nt(R,it)?(W(R,it,w,m,j),R=l[--O],it=m[--j]):Nt(k,it)?(W(k,it,w,m,j),Er&&a.insertBefore(p,k.elm,a.nextSibling(R.elm)),k=l[++I],it=m[--j]):Nt(R,q)?(W(R,q,w,m,A),Er&&a.insertBefore(p,R.elm,k.elm),R=l[--O],q=m[++A]):(x(Ft)&&(Ft=Ac(l,I,O)),Lt=d(q.key)?Ft[q.key]:B(q,l,I,O),x(Lt)?c(q,w,p,k.elm,!1,m,A):(Mt=l[Lt],Nt(Mt,q)?(W(Mt,q,w,m,A),l[Lt]=void 0,Er&&a.insertBefore(p,Mt.elm,k.elm)):c(q,w,p,k.elm,!1,m,A)),q=m[++A]);I>O?(Qt=x(m[j+1])?null:m[j+1].elm,C(p,Qt,m,A,j,w)):A>j&&P(l,I,O)}function B(p,l,m,w){for(var E=m;E<w;E++){var I=l[E];if(d(I)&&Nt(p,I))return E}}function W(p,l,m,w,E,I){if(p!==l){d(l.elm)&&d(w)&&(l=w[E]=Lr(l));var A=l.elm=p.elm;if(z(p.isAsyncPlaceholder)){d(l.asyncFactory.resolved)?vt(p.elm,l,m):l.isAsyncPlaceholder=!0;return}if(z(l.isStatic)&&z(p.isStatic)&&l.key===p.key&&(z(l.isCloned)||z(l.isOnce))){l.componentInstance=p.componentInstance;return}var O,k=l.data;d(k)&&d(O=k.hook)&&d(O=O.prepatch)&&O(p,l);var R=p.children,j=l.children;if(d(k)&&y(l)){for(O=0;O<n.update.length;++O)n.update[O](p,l);d(O=k.hook)&&d(O=O.update)&&O(p,l)}x(l.text)?d(R)&&d(j)?R!==j&&N(A,R,j,m,I):d(j)?(d(p.text)&&a.setTextContent(A,""),C(A,null,j,0,j.length-1,m)):d(R)?P(R,0,R.length-1):d(p.text)&&a.setTextContent(A,""):p.text!==l.text&&a.setTextContent(A,l.text),d(k)&&d(O=k.hook)&&d(O=O.postpatch)&&O(p,l)}}function dt(p,l,m){if(z(m)&&d(p.parent))p.parent.data.pendingInsert=l;else for(var w=0;w<l.length;++w)l[w].data.hook.insert(l[w])}var ht=ct("attrs,class,staticClass,staticStyle,key");function vt(p,l,m,w){var E,I=l.tag,A=l.data,O=l.children;if(w=w||A&&A.pre,l.elm=p,z(l.isComment)&&d(l.asyncFactory))return l.isAsyncPlaceholder=!0,!0;if(d(A)&&(d(E=A.hook)&&d(E=E.init)&&E(l,!0),d(E=l.componentInstance)))return h(l,m),!0;if(d(I)){if(d(O))if(!p.hasChildNodes())_(l,O,m);else if(d(E=A)&&d(E=E.domProps)&&d(E=E.innerHTML)){if(E!==p.innerHTML)return!1}else{for(var k=!0,R=p.firstChild,j=0;j<O.length;j++){if(!R||!vt(R,O[j],m,w)){k=!1;break}R=R.nextSibling}if(!k||R)return!1}if(d(A)){var q=!1;for(var it in A)if(!ht(it)){q=!0,b(l,m);break}!q&&A.class&&se(A.class)}}else p.data!==l.text&&(p.data=l.text);return!0}return function(l,m,w,E){if(x(m)){d(l)&&$(l);return}var I=!1,A=[];if(x(l))I=!0,c(m,A);else{var O=d(l.nodeType);if(!O&&Nt(l,m))W(l,m,A,null,null,E);else{if(O){if(l.nodeType===1&&l.hasAttribute(zn)&&(l.removeAttribute(zn),w=!0),z(w)&&vt(l,m,A))return dt(m,A,!0),l;l=o(l)}var k=l.elm,R=a.parentNode(k);if(c(m,A,k._leaveCb?null:R,a.nextSibling(k)),d(m.parent))for(var j=m.parent,q=y(m);j;){for(var it=0;it<n.destroy.length;++it)n.destroy[it](j);if(j.elm=m.elm,q){for(var Ft=0;Ft<n.create.length;++Ft)n.create[Ft](xt,j);var Lt=j.data.hook.insert;if(Lt.merged)for(var Mt=Lt.fns.slice(1),Qt=0;Qt<Mt.length;Qt++)Mt[Qt]()}else ie(j);j=j.parent}d(R)?P([l],0,0):d(l.tag)&&$(l)}}return dt(m,A,I),m.elm}}var $c={create:Or,update:Or,destroy:function(e){Or(e,xt)}};function Or(t,e){(t.data.directives||e.data.directives)&&Tc(t,e)}function Tc(t,e){var r=t===xt,n=e===xt,i=yi(t.data.directives,t.context),a=yi(e.data.directives,e.context),o=[],s=[],u,c,f;for(u in a)c=i[u],f=a[u],c?(f.oldValue=c.value,f.oldArg=c.arg,me(f,"update",e,t),f.def&&f.def.componentUpdated&&s.push(f)):(me(f,"bind",e,t),f.def&&f.def.inserted&&o.push(f));if(o.length){var h=function(){for(var v=0;v<o.length;v++)me(o[v],"inserted",e,t)};r?Et(e,"insert",h):h()}if(s.length&&Et(e,"postpatch",function(){for(var v=0;v<s.length;v++)me(s[v],"componentUpdated",e,t)}),!r)for(u in i)a[u]||me(i[u],"unbind",t,t,n)}var Pc=Object.create(null);function yi(t,e){var r=Object.create(null);if(!t)return r;var n,i;for(n=0;n<t.length;n++){if(i=t[n],i.modifiers||(i.modifiers=Pc),r[Ic(i)]=i,e._setupState&&e._setupState.__sfc){var a=i.def||or(e,"_setupState","v-"+i.name);typeof a=="function"?i.def={bind:a,update:a}:i.def=a}i.def=i.def||or(e.$options,"directives",i.name)}return r}function Ic(t){return t.rawName||"".concat(t.name,".").concat(Object.keys(t.modifiers||{}).join("."))}function me(t,e,r,n,i){var a=t.def&&t.def[e];if(a)try{a(r.elm,t,r,n,i)}catch(o){Jt(o,r.context,"directive ".concat(t.name," ").concat(e," hook"))}}var kc=[Ec,$c];function wi(t,e){var r=e.componentOptions;if(!(d(r)&&r.Ctor.options.inheritAttrs===!1)&&!(x(t.data.attrs)&&x(e.data.attrs))){var n,i,a,o=e.elm,s=t.data.attrs||{},u=e.data.attrs||{};(d(u.__ob__)||z(u._v_attr_proxy))&&(u=e.data.attrs=L({},u));for(n in u)i=u[n],a=s[n],a!==i&&Si(o,n,i,e.data.pre);(ce||pn)&&u.value!==s.value&&Si(o,"value",u.value);for(n in s)x(u[n])&&(An(n)?o.removeAttributeNS(Xr,Ba(n)):Na(n)||o.removeAttribute(n))}}function Si(t,e,r,n){n||t.tagName.indexOf("-")>-1?Ci(t,e,r):ec(e)?sr(r)?t.removeAttribute(e):(r=e==="allowfullscreen"&&t.tagName==="EMBED"?"true":e,t.setAttribute(e,r)):Na(e)?t.setAttribute(e,tc(e,r)):An(e)?sr(r)?t.removeAttributeNS(Xr,Ba(e)):t.setAttributeNS(Xr,e,r):Ci(t,e,r)}function Ci(t,e,r){if(sr(r))t.removeAttribute(e);else{if(ce&&!fe&&t.tagName==="TEXTAREA"&&e==="placeholder"&&r!==""&&!t.__ieph){var n=function(i){i.stopImmediatePropagation(),t.removeEventListener("input",n)};t.addEventListener("input",n),t.__ieph=!0}t.setAttribute(e,r)}}var Rc={create:wi,update:wi};function Ei(t,e){var r=e.elm,n=e.data,i=t.data;if(!(x(n.staticClass)&&x(n.class)&&(x(i)||x(i.staticClass)&&x(i.class)))){var a=rc(e),o=r._transitionClasses;d(o)&&(a=On(a,$n(o))),a!==r._prevClass&&(r.setAttribute("class",a),r._prevClass=a)}}var jc={create:Ei,update:Ei},$r="__r",Tr="__c";function Dc(t){if(d(t[$r])){var e=ce?"change":"input";t[e]=[].concat(t[$r],t[e]||[]),delete t[$r]}d(t[Tr])&&(t.change=[].concat(t[Tr],t.change||[]),delete t[Tr])}var xe;function Fc(t,e,r){var n=xe;return function i(){var a=e.apply(null,arguments);a!==null&&Ha(t,i,r,n)}}var Lc=Ur&&!(Wn&&Number(Wn[1])<=53);function Mc(t,e,r,n){if(Lc){var i=Da,a=e;e=a._wrapper=function(o){if(o.target===o.currentTarget||o.timeStamp>=i||o.timeStamp<=0||o.target.ownerDocument!==document)return a.apply(this,arguments)}}xe.addEventListener(t,e,pa?{capture:r,passive:n}:r)}function Ha(t,e,r,n){(n||xe).removeEventListener(t,e._wrapper||e,r)}function Pr(t,e){if(!(x(t.data.on)&&x(e.data.on))){var r=e.data.on||{},n=t.data.on||{};xe=e.elm||t.elm,Dc(r),wa(r,n,Mc,Ha,Fc,e.context),xe=void 0}}var Nc={create:Pr,update:Pr,destroy:function(t){return Pr(t,xt)}},Le;function xi(t,e){if(!(x(t.data.domProps)&&x(e.data.domProps))){var r,n,i=e.elm,a=t.data.domProps||{},o=e.data.domProps||{};(d(o.__ob__)||z(o._v_attr_proxy))&&(o=e.data.domProps=L({},o));for(r in a)r in o||(i[r]="");for(r in o){if(n=o[r],r==="textContent"||r==="innerHTML"){if(e.children&&(e.children.length=0),n===a[r])continue;i.childNodes.length===1&&i.removeChild(i.childNodes[0])}if(r==="value"&&i.tagName!=="PROGRESS"){i._value=n;var s=x(n)?"":String(n);Bc(i,s)&&(i.value=s)}else if(r==="innerHTML"&&Tn(i.tagName)&&x(i.innerHTML)){Le=Le||document.createElement("div"),Le.innerHTML="<svg>".concat(n,"</svg>");for(var u=Le.firstChild;i.firstChild;)i.removeChild(i.firstChild);for(;u.firstChild;)i.appendChild(u.firstChild)}else if(n!==a[r])try{i[r]=n}catch(c){}}}}function Bc(t,e){return!t.composing&&(t.tagName==="OPTION"||Uc(t,e)||Hc(t,e))}function Uc(t,e){var r=!0;try{r=document.activeElement!==t}catch(n){}return r&&t.value!==e}function Hc(t,e){var r=t.value,n=t._vModifiers;if(d(n)){if(n.number)return ye(r)!==ye(e);if(n.trim)return r.trim()!==e.trim()}return r!==e}var zc={create:xi,update:xi},Wc=Yt(function(t){var e={},r=/;(?![^(]*\))/g,n=/:(.+)/;return t.split(r).forEach(function(i){if(i){var a=i.split(n);a.length>1&&(e[a[0].trim()]=a[1].trim())}}),e});function Ir(t){var e=za(t.style);return t.staticStyle?L(t.staticStyle,e):e}function za(t){return Array.isArray(t)?sa(t):typeof t=="string"?Wc(t):t}function qc(t,e){var r={},n;if(e)for(var i=t;i.componentInstance;)i=i.componentInstance._vnode,i&&i.data&&(n=Ir(i.data))&&L(r,n);(n=Ir(t.data))&&L(r,n);for(var a=t;a=a.parent;)a.data&&(n=Ir(a.data))&&L(r,n);return r}var Gc=/^--/,Ai=/\s*!important$/,Oi=function(t,e,r){if(Gc.test(e))t.style.setProperty(e,r);else if(Ai.test(r))t.style.setProperty(Oe(e),r.replace(Ai,""),"important");else{var n=Jc(e);if(Array.isArray(r))for(var i=0,a=r.length;i<a;i++)t.style[n]=r[i];else t.style[n]=r}},$i=["Webkit","Moz","ms"],Me,Jc=Yt(function(t){if(Me=Me||document.createElement("div").style,t=qt(t),t!=="filter"&&t in Me)return t;for(var e=t.charAt(0).toUpperCase()+t.slice(1),r=0;r<$i.length;r++){var n=$i[r]+e;if(n in Me)return n}});function Ti(t,e){var r=e.data,n=t.data;if(!(x(r.staticStyle)&&x(r.style)&&x(n.staticStyle)&&x(n.style))){var i,a,o=e.elm,s=n.staticStyle,u=n.normalizedStyle||n.style||{},c=s||u,f=za(e.data.style)||{};e.data.normalizedStyle=d(f.__ob__)?L({},f):f;var h=qc(e,!0);for(a in c)x(h[a])&&Oi(o,a,"");for(a in h)i=h[a],i!==c[a]&&Oi(o,a,i==null?"":i)}}var Kc={create:Ti,update:Ti},Wa=/\s+/;function qa(t,e){if(!(!e||!(e=e.trim())))if(t.classList)e.indexOf(" ")>-1?e.split(Wa).forEach(function(n){return t.classList.add(n)}):t.classList.add(e);else{var r=" ".concat(t.getAttribute("class")||""," ");r.indexOf(" "+e+" ")<0&&t.setAttribute("class",(r+e).trim())}}function Ga(t,e){if(!(!e||!(e=e.trim())))if(t.classList)e.indexOf(" ")>-1?e.split(Wa).forEach(function(i){return t.classList.remove(i)}):t.classList.remove(e),t.classList.length||t.removeAttribute("class");else{for(var r=" ".concat(t.getAttribute("class")||""," "),n=" "+e+" ";r.indexOf(n)>=0;)r=r.replace(n," ");r=r.trim(),r?t.setAttribute("class",r):t.removeAttribute("class")}}function Ja(t){if(!!t){if(typeof t=="object"){var e={};return t.css!==!1&&L(e,Pi(t.name||"v")),L(e,t),e}else if(typeof t=="string")return Pi(t)}}var Pi=Yt(function(t){return{enterClass:"".concat(t,"-enter"),enterToClass:"".concat(t,"-enter-to"),enterActiveClass:"".concat(t,"-enter-active"),leaveClass:"".concat(t,"-leave"),leaveToClass:"".concat(t,"-leave-to"),leaveActiveClass:"".concat(t,"-leave-active")}}),Ka=nt&&!fe,ee="transition",kr="animation",We="transition",ur="transitionend",Vr="animation",Ya="animationend";Ka&&(window.ontransitionend===void 0&&window.onwebkittransitionend!==void 0&&(We="WebkitTransition",ur="webkitTransitionEnd"),window.onanimationend===void 0&&window.onwebkitanimationend!==void 0&&(Vr="WebkitAnimation",Ya="webkitAnimationEnd"));var Ii=nt?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:function(t){return t()};function Xa(t){Ii(function(){Ii(t)})}function zt(t,e){var r=t._transitionClasses||(t._transitionClasses=[]);r.indexOf(e)<0&&(r.push(e),qa(t,e))}function bt(t,e){t._transitionClasses&&Rt(t._transitionClasses,e),Ga(t,e)}function Qa(t,e,r){var n=Va(t,e),i=n.type,a=n.timeout,o=n.propCount;if(!i)return r();var s=i===ee?ur:Ya,u=0,c=function(){t.removeEventListener(s,f),r()},f=function(h){h.target===t&&++u>=o&&c()};setTimeout(function(){u<o&&c()},a+1),t.addEventListener(s,f)}var Yc=/\b(transform|all)(,|$)/;function Va(t,e){var r=window.getComputedStyle(t),n=(r[We+"Delay"]||"").split(", "),i=(r[We+"Duration"]||"").split(", "),a=ki(n,i),o=(r[Vr+"Delay"]||"").split(", "),s=(r[Vr+"Duration"]||"").split(", "),u=ki(o,s),c,f=0,h=0;e===ee?a>0&&(c=ee,f=a,h=i.length):e===kr?u>0&&(c=kr,f=u,h=s.length):(f=Math.max(a,u),c=f>0?a>u?ee:kr:null,h=c?c===ee?i.length:s.length:0);var v=c===ee&&Yc.test(r[We+"Property"]);return{type:c,timeout:f,propCount:h,hasTransform:v}}function ki(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max.apply(null,e.map(function(r,n){return Ri(r)+Ri(t[n])}))}function Ri(t){return Number(t.slice(0,-1).replace(",","."))*1e3}function Zr(t,e){var r=t.elm;d(r._leaveCb)&&(r._leaveCb.cancelled=!0,r._leaveCb());var n=Ja(t.data.transition);if(!x(n)&&!(d(r._enterCb)||r.nodeType!==1)){for(var i=n.css,a=n.type,o=n.enterClass,s=n.enterToClass,u=n.enterActiveClass,c=n.appearClass,f=n.appearToClass,h=n.appearActiveClass,v=n.beforeEnter,g=n.enter,_=n.afterEnter,y=n.enterCancelled,b=n.beforeAppear,S=n.appear,C=n.afterAppear,$=n.appearCancelled,P=n.duration,D=Ht,N=Ht.$vnode;N&&N.parent;)D=N.context,N=N.parent;var B=!D._isMounted||!t.isRootInsert;if(!(B&&!S&&S!=="")){var W=B&&c?c:o,dt=B&&h?h:u,ht=B&&f?f:s,vt=B&&b||v,p=B&&F(S)?S:g,l=B&&C||_,m=B&&$||y,w=ye(K(P)?P.enter:P),E=i!==!1&&!fe,I=Pn(p),A=r._enterCb=Ze(function(){E&&(bt(r,ht),bt(r,dt)),A.cancelled?(E&&bt(r,W),m&&m(r)):l&&l(r),r._enterCb=null});t.data.show||Et(t,"insert",function(){var O=r.parentNode,k=O&&O._pending&&O._pending[t.key];k&&k.tag===t.tag&&k.elm._leaveCb&&k.elm._leaveCb(),p&&p(r,A)}),vt&&vt(r),E&&(zt(r,W),zt(r,dt),Xa(function(){bt(r,W),A.cancelled||(zt(r,ht),I||(to(w)?setTimeout(A,w):Qa(r,a,A)))})),t.data.show&&(e&&e(),p&&p(r,A)),!E&&!I&&A()}}}function Za(t,e){var r=t.elm;d(r._enterCb)&&(r._enterCb.cancelled=!0,r._enterCb());var n=Ja(t.data.transition);if(x(n)||r.nodeType!==1)return e();if(d(r._leaveCb))return;var i=n.css,a=n.type,o=n.leaveClass,s=n.leaveToClass,u=n.leaveActiveClass,c=n.beforeLeave,f=n.leave,h=n.afterLeave,v=n.leaveCancelled,g=n.delayLeave,_=n.duration,y=i!==!1&&!fe,b=Pn(f),S=ye(K(_)?_.leave:_),C=r._leaveCb=Ze(function(){r.parentNode&&r.parentNode._pending&&(r.parentNode._pending[t.key]=null),y&&(bt(r,s),bt(r,u)),C.cancelled?(y&&bt(r,o),v&&v(r)):(e(),h&&h(r)),r._leaveCb=null});g?g($):$();function $(){C.cancelled||(!t.data.show&&r.parentNode&&((r.parentNode._pending||(r.parentNode._pending={}))[t.key]=t),c&&c(r),y&&(zt(r,o),zt(r,u),Xa(function(){bt(r,o),C.cancelled||(zt(r,s),b||(to(S)?setTimeout(C,S):Qa(r,a,C)))})),f&&f(r,C),!y&&!b&&C())}}function to(t){return typeof t=="number"&&!isNaN(t)}function Pn(t){if(x(t))return!1;var e=t.fns;return d(e)?Pn(Array.isArray(e)?e[0]:e):(t._length||t.length)>1}function ji(t,e){e.data.show!==!0&&Zr(e)}var Xc=nt?{create:ji,activate:ji,remove:function(t,e){t.data.show!==!0?Za(t,e):e()}}:{},Qc=[Rc,jc,Nc,zc,Kc,Xc],Vc=Qc.concat(kc),Zc=Oc({nodeOps:Cc,modules:Vc});fe&&document.addEventListener("selectionchange",function(){var t=document.activeElement;t&&t.vmodel&&In(t,"input")});var eo={inserted:function(t,e,r,n){r.tag==="select"?(n.elm&&!n.elm._vOptions?Et(r,"postpatch",function(){eo.componentUpdated(t,e,r)}):Di(t,e,r.context),t._vOptions=[].map.call(t.options,cr)):(r.tag==="textarea"||Qr(t.type))&&(t._vModifiers=e.modifiers,e.modifiers.lazy||(t.addEventListener("compositionstart",tf),t.addEventListener("compositionend",Mi),t.addEventListener("change",Mi),fe&&(t.vmodel=!0)))},componentUpdated:function(t,e,r){if(r.tag==="select"){Di(t,e,r.context);var n=t._vOptions,i=t._vOptions=[].map.call(t.options,cr);if(i.some(function(o,s){return!Gt(o,n[s])})){var a=t.multiple?e.value.some(function(o){return Li(o,i)}):e.value!==e.oldValue&&Li(e.value,i);a&&In(t,"change")}}}};function Di(t,e,r){Fi(t,e),(ce||pn)&&setTimeout(function(){Fi(t,e)},0)}function Fi(t,e,r){var n=e.value,i=t.multiple;if(!(i&&!Array.isArray(n))){for(var a,o,s=0,u=t.options.length;s<u;s++)if(o=t.options[s],i)a=ca(n,cr(o))>-1,o.selected!==a&&(o.selected=a);else if(Gt(cr(o),n)){t.selectedIndex!==s&&(t.selectedIndex=s);return}i||(t.selectedIndex=-1)}}function Li(t,e){return e.every(function(r){return!Gt(r,t)})}function cr(t){return"_value"in t?t._value:t.value}function tf(t){t.target.composing=!0}function Mi(t){!t.target.composing||(t.target.composing=!1,In(t.target,"input"))}function In(t,e){var r=document.createEvent("HTMLEvents");r.initEvent(e,!0,!0),t.dispatchEvent(r)}function tn(t){return t.componentInstance&&(!t.data||!t.data.transition)?tn(t.componentInstance._vnode):t}var ef={bind:function(t,e,r){var n=e.value;r=tn(r);var i=r.data&&r.data.transition,a=t.__vOriginalDisplay=t.style.display==="none"?"":t.style.display;n&&i?(r.data.show=!0,Zr(r,function(){t.style.display=a})):t.style.display=n?a:"none"},update:function(t,e,r){var n=e.value,i=e.oldValue;if(!n!=!i){r=tn(r);var a=r.data&&r.data.transition;a?(r.data.show=!0,n?Zr(r,function(){t.style.display=t.__vOriginalDisplay}):Za(r,function(){t.style.display="none"})):t.style.display=n?t.__vOriginalDisplay:"none"}},unbind:function(t,e,r,n,i){i||(t.style.display=t.__vOriginalDisplay)}},rf={model:eo,show:ef},ro={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]};function en(t){var e=t&&t.componentOptions;return e&&e.Ctor.options.abstract?en(Oa(e.children)):t}function no(t){var e={},r=t.$options;for(var n in r.propsData)e[n]=t[n];var i=r._parentListeners;for(var n in i)e[qt(n)]=i[n];return e}function Ni(t,e){if(/\d-keep-alive$/.test(e.tag))return t("keep-alive",{props:e.componentOptions.propsData})}function nf(t){for(;t=t.parent;)if(t.data.transition)return!0}function af(t,e){return e.key===t.key&&e.tag===t.tag}var of=function(t){return t.tag||Se(t)},sf=function(t){return t.name==="show"},uf={name:"transition",props:ro,abstract:!0,render:function(t){var e=this,r=this.$slots.default;if(!!r&&(r=r.filter(of),!!r.length)){var n=this.mode,i=r[0];if(nf(this.$vnode))return i;var a=en(i);if(!a)return i;if(this._leaving)return Ni(t,i);var o="__transition-".concat(this._uid,"-");a.key=a.key==null?a.isComment?o+"comment":o+a.tag:Ae(a.key)?String(a.key).indexOf(o)===0?a.key:o+a.key:a.key;var s=(a.data||(a.data={})).transition=no(this),u=this._vnode,c=en(u);if(a.data.directives&&a.data.directives.some(sf)&&(a.data.show=!0),c&&c.data&&!af(a,c)&&!Se(c)&&!(c.componentInstance&&c.componentInstance._vnode.isComment)){var f=c.data.transition=L({},s);if(n==="out-in")return this._leaving=!0,Et(f,"afterLeave",function(){e._leaving=!1,e.$forceUpdate()}),Ni(t,i);if(n==="in-out"){if(Se(a))return u;var h,v=function(){h()};Et(s,"afterEnter",v),Et(s,"enterCancelled",v),Et(f,"delayLeave",function(g){h=g})}}return i}}},io=L({tag:String,moveClass:String},ro);delete io.mode;var cf={props:io,beforeMount:function(){var t=this,e=this._update;this._update=function(r,n){var i=ka(t);t.__patch__(t._vnode,t.kept,!1,!0),t._vnode=t.kept,i(),e.call(t,r,n)}},render:function(t){for(var e=this.tag||this.$vnode.data.tag||"span",r=Object.create(null),n=this.prevChildren=this.children,i=this.$slots.default||[],a=this.children=[],o=no(this),s=0;s<i.length;s++){var u=i[s];u.tag&&u.key!=null&&String(u.key).indexOf("__vlist")!==0&&(a.push(u),r[u.key]=u,(u.data||(u.data={})).transition=o)}if(n){for(var c=[],f=[],s=0;s<n.length;s++){var u=n[s];u.data.transition=o,u.data.pos=u.elm.getBoundingClientRect(),r[u.key]?c.push(u):f.push(u)}this.kept=t(e,null,c),this.removed=f}return t(e,null,a)},updated:function(){var t=this.prevChildren,e=this.moveClass||(this.name||"v")+"-move";!t.length||!this.hasMove(t[0].elm,e)||(t.forEach(ff),t.forEach(lf),t.forEach(pf),this._reflow=document.body.offsetHeight,t.forEach(function(r){if(r.data.moved){var n=r.elm,i=n.style;zt(n,e),i.transform=i.WebkitTransform=i.transitionDuration="",n.addEventListener(ur,n._moveCb=function a(o){o&&o.target!==n||(!o||/transform$/.test(o.propertyName))&&(n.removeEventListener(ur,a),n._moveCb=null,bt(n,e))})}}))},methods:{hasMove:function(t,e){if(!Ka)return!1;if(this._hasMove)return this._hasMove;var r=t.cloneNode();t._transitionClasses&&t._transitionClasses.forEach(function(i){Ga(r,i)}),qa(r,e),r.style.display="none",this.$el.appendChild(r);var n=Va(r);return this.$el.removeChild(r),this._hasMove=n.hasTransform}}};function ff(t){t.elm._moveCb&&t.elm._moveCb(),t.elm._enterCb&&t.elm._enterCb()}function lf(t){t.data.newPos=t.elm.getBoundingClientRect()}function pf(t){var e=t.data.pos,r=t.data.newPos,n=e.left-r.left,i=e.top-r.top;if(n||i){t.data.moved=!0;var a=t.elm.style;a.transform=a.WebkitTransform="translate(".concat(n,"px,").concat(i,"px)"),a.transitionDuration="0s"}}var df={Transition:uf,TransitionGroup:cf};H.config.mustUseProp=Vu;H.config.isReservedTag=Ua;H.config.isReservedAttr=Xu;H.config.getTagNamespace=uc;H.config.isUnknownElement=cc;L(H.options.directives,rf);L(H.options.components,df);H.prototype.__patch__=nt?Zc:U;H.prototype.$mount=function(t,e){return t=t&&nt?fc(t):void 0,iu(this,t,e)};nt&&setTimeout(function(){at.devtools&&tr&&tr.emit("init",H)},0);var hf=!0;H.util.warn;function vf(){return ao().__VUE_DEVTOOLS_GLOBAL_HOOK__}function ao(){return typeof navigator<"u"&&typeof window<"u"?window:typeof global<"u"?global:{}}const mf=typeof Proxy=="function",gf="devtools-plugin:setup",bf="plugin:settings:set";let Vt,rn;function _f(){var t;return Vt!==void 0||(typeof window<"u"&&window.performance?(Vt=!0,rn=window.performance):typeof global<"u"&&((t=global.perf_hooks)===null||t===void 0?void 0:t.performance)?(Vt=!0,rn=global.perf_hooks.performance):Vt=!1),Vt}function yf(){return _f()?rn.now():Date.now()}class wf{constructor(e,r){this.target=null,this.targetQueue=[],this.onQueue=[],this.plugin=e,this.hook=r;const n={};if(e.settings)for(const o in e.settings){const s=e.settings[o];n[o]=s.defaultValue}const i=`__vue-devtools-plugin-settings__${e.id}`;let a=Object.assign({},n);try{const o=localStorage.getItem(i),s=JSON.parse(o);Object.assign(a,s)}catch(o){}this.fallbacks={getSettings(){return a},setSettings(o){try{localStorage.setItem(i,JSON.stringify(o))}catch(s){}a=o},now(){return yf()}},r&&r.on(bf,(o,s)=>{o===this.plugin.id&&this.fallbacks.setSettings(s)}),this.proxiedOn=new Proxy({},{get:(o,s)=>this.target?this.target.on[s]:(...u)=>{this.onQueue.push({method:s,args:u})}}),this.proxiedTarget=new Proxy({},{get:(o,s)=>this.target?this.target[s]:s==="on"?this.proxiedOn:Object.keys(this.fallbacks).includes(s)?(...u)=>(this.targetQueue.push({method:s,args:u,resolve:()=>{}}),this.fallbacks[s](...u)):(...u)=>new Promise(c=>{this.targetQueue.push({method:s,args:u,resolve:c})})})}async setRealTarget(e){this.target=e;for(const r of this.onQueue)this.target.on[r.method](...r.args);for(const r of this.targetQueue)r.resolve(await this.target[r.method](...r.args))}}function oo(t,e){const r=t,n=ao(),i=vf(),a=mf&&r.enableEarlyProxy;if(i&&(n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__||!a))i.emit(gf,t,e);else{const o=a?new wf(r,i):null;(n.__VUE_DEVTOOLS_PLUGINS__=n.__VUE_DEVTOOLS_PLUGINS__||[]).push({pluginDescriptor:r,setupFn:e,proxy:o}),o&&e(o.proxiedTarget)}}/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */const Sf=Symbol();var Wt;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(Wt||(Wt={}));const so=typeof window<"u",uo=typeof __VUE_PROD_DEVTOOLS__<"u"&&__VUE_PROD_DEVTOOLS__&&!0&&so,Bi=(()=>typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof global=="object"&&global.global===global?global:typeof globalThis=="object"?globalThis:{HTMLElement:null})();function Cf(t,{autoBom:e=!1}={}){return e&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t}function kn(t,e,r){const n=new XMLHttpRequest;n.open("GET",t),n.responseType="blob",n.onload=function(){lo(n.response,e,r)},n.onerror=function(){console.error("could not download file")},n.send()}function co(t){const e=new XMLHttpRequest;e.open("HEAD",t,!1);try{e.send()}catch(r){}return e.status>=200&&e.status<=299}function qe(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(e){const r=document.createEvent("MouseEvents");r.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(r)}}const Ge=typeof navigator=="object"?navigator:{userAgent:""},fo=(()=>/Macintosh/.test(Ge.userAgent)&&/AppleWebKit/.test(Ge.userAgent)&&!/Safari/.test(Ge.userAgent))(),lo=so?typeof HTMLAnchorElement<"u"&&"download"in HTMLAnchorElement.prototype&&!fo?Ef:"msSaveOrOpenBlob"in Ge?xf:Af:()=>{};function Ef(t,e="download",r){const n=document.createElement("a");n.download=e,n.rel="noopener",typeof t=="string"?(n.href=t,n.origin!==location.origin?co(n.href)?kn(t,e,r):(n.target="_blank",qe(n)):qe(n)):(n.href=URL.createObjectURL(t),setTimeout(function(){URL.revokeObjectURL(n.href)},4e4),setTimeout(function(){qe(n)},0))}function xf(t,e="download",r){if(typeof t=="string")if(co(t))kn(t,e,r);else{const n=document.createElement("a");n.href=t,n.target="_blank",setTimeout(function(){qe(n)})}else navigator.msSaveOrOpenBlob(Cf(t,r),e)}function Af(t,e,r,n){if(n=n||open("","_blank"),n&&(n.document.title=n.document.body.innerText="downloading..."),typeof t=="string")return kn(t,e,r);const i=t.type==="application/octet-stream",a=/constructor/i.test(String(Bi.HTMLElement))||"safari"in Bi,o=/CriOS\/[\d]+/.test(navigator.userAgent);if((o||i&&a||fo)&&typeof FileReader<"u"){const s=new FileReader;s.onloadend=function(){let u=s.result;if(typeof u!="string")throw n=null,new Error("Wrong reader.result type");u=o?u:u.replace(/^data:[^;]*;/,"data:attachment/file;"),n?n.location.href=u:location.assign(u),n=null},s.readAsDataURL(t)}else{const s=URL.createObjectURL(t);n?n.location.assign(s):location.href=s,n=null,setTimeout(function(){URL.revokeObjectURL(s)},4e4)}}function G(t,e){const r="\u{1F34D} "+t;typeof __VUE_DEVTOOLS_TOAST__=="function"?__VUE_DEVTOOLS_TOAST__(r,e):e==="error"?console.error(r):e==="warn"?console.warn(r):console.log(r)}function Rn(t){return"_a"in t&&"install"in t}function po(){if(!("clipboard"in navigator))return G("Your browser doesn't support the Clipboard API","error"),!0}function ho(t){return t instanceof Error&&t.message.toLowerCase().includes("document is not focused")?(G('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.',"warn"),!0):!1}async function Of(t){if(!po())try{await navigator.clipboard.writeText(JSON.stringify(t.state.value)),G("Global state copied to clipboard.")}catch(e){if(ho(e))return;G("Failed to serialize the state. Check the console for more details.","error"),console.error(e)}}async function $f(t){if(!po())try{vo(t,JSON.parse(await navigator.clipboard.readText())),G("Global state pasted from clipboard.")}catch(e){if(ho(e))return;G("Failed to deserialize the state from clipboard. Check the console for more details.","error"),console.error(e)}}async function Tf(t){try{lo(new Blob([JSON.stringify(t.state.value)],{type:"text/plain;charset=utf-8"}),"pinia-state.json")}catch(e){G("Failed to export the state as JSON. Check the console for more details.","error"),console.error(e)}}let mt;function Pf(){mt||(mt=document.createElement("input"),mt.type="file",mt.accept=".json");function t(){return new Promise((e,r)=>{mt.onchange=async()=>{const n=mt.files;if(!n)return e(null);const i=n.item(0);return e(i?{text:await i.text(),file:i}:null)},mt.oncancel=()=>e(null),mt.onerror=r,mt.click()})}return t}async function If(t){try{const r=await Pf()();if(!r)return;const{text:n,file:i}=r;vo(t,JSON.parse(n)),G(`Global state imported from "${i.name}".`)}catch(e){G("Failed to import the state from JSON. Check the console for more details.","error"),console.error(e)}}function vo(t,e){for(const r in e){const n=t.state.value[r];n?Object.assign(n,e[r]):t.state.value[r]=e[r]}}function ot(t){return{_custom:{display:t}}}const mo="\u{1F34D} Pinia (root)",nn="_root";function kf(t){return Rn(t)?{id:nn,label:mo}:{id:t.$id,label:t.$id}}function Rf(t){if(Rn(t)){const r=Array.from(t._s.keys()),n=t._s;return{state:r.map(a=>({editable:!0,key:a,value:t.state.value[a]})),getters:r.filter(a=>n.get(a)._getters).map(a=>{const o=n.get(a);return{editable:!1,key:a,value:o._getters.reduce((s,u)=>(s[u]=o[u],s),{})}})}}const e={state:Object.keys(t.$state).map(r=>({editable:!0,key:r,value:t.$state[r]}))};return t._getters&&t._getters.length&&(e.getters=t._getters.map(r=>({editable:!1,key:r,value:t[r]}))),t._customProperties.size&&(e.customProperties=Array.from(t._customProperties).map(r=>({editable:!0,key:r,value:t[r]}))),e}function jf(t){return t?Array.isArray(t)?t.reduce((e,r)=>(e.keys.push(r.key),e.operations.push(r.type),e.oldValue[r.key]=r.oldValue,e.newValue[r.key]=r.newValue,e),{oldValue:{},keys:[],operations:[],newValue:{}}):{operation:ot(t.type),key:ot(t.key),oldValue:t.oldValue,newValue:t.newValue}:{}}function Df(t){switch(t){case Wt.direct:return"mutation";case Wt.patchFunction:return"$patch";case Wt.patchObject:return"$patch";default:return"unknown"}}let ae=!0;const Je=[],Bt="pinia:mutations",J="pinia",{assign:Ff}=Object,fr=t=>"\u{1F34D} "+t;function Lf(t,e){oo({id:"dev.esm.pinia",label:"Pinia \u{1F34D}",logo:"https://pinia.vuejs.org/logo.svg",packageName:"pinia",homepage:"https://pinia.vuejs.org",componentStateTypes:Je,app:t},r=>{typeof r.now!="function"&&G("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."),r.addTimelineLayer({id:Bt,label:"Pinia \u{1F34D}",color:15064968}),r.addInspector({id:J,label:"Pinia \u{1F34D}",icon:"storage",treeFilterPlaceholder:"Search stores",actions:[{icon:"content_copy",action:()=>{Of(e)},tooltip:"Serialize and copy the state"},{icon:"content_paste",action:async()=>{await $f(e),r.sendInspectorTree(J),r.sendInspectorState(J)},tooltip:"Replace the state with the content of your clipboard"},{icon:"save",action:()=>{Tf(e)},tooltip:"Save the state as a JSON file"},{icon:"folder_open",action:async()=>{await If(e),r.sendInspectorTree(J),r.sendInspectorState(J)},tooltip:"Import the state from a JSON file"}],nodeActions:[{icon:"restore",tooltip:'Reset the state (with "$reset")',action:n=>{const i=e._s.get(n);i?typeof i.$reset!="function"?G(`Cannot reset "${n}" store because it doesn't have a "$reset" method implemented.`,"warn"):(i.$reset(),G(`Store "${n}" reset.`)):G(`Cannot reset "${n}" store because it wasn't found.`,"warn")}}]}),r.on.inspectComponent((n,i)=>{const a=n.componentInstance&&n.componentInstance.proxy;if(a&&a._pStores){const o=n.componentInstance.proxy._pStores;Object.values(o).forEach(s=>{n.instanceData.state.push({type:fr(s.$id),key:"state",editable:!0,value:s._isOptionsAPI?{_custom:{value:_r(s.$state),actions:[{icon:"restore",tooltip:"Reset the state of this store",action:()=>s.$reset()}]}}:Object.keys(s.$state).reduce((u,c)=>(u[c]=s.$state[c],u),{})}),s._getters&&s._getters.length&&n.instanceData.state.push({type:fr(s.$id),key:"getters",editable:!1,value:s._getters.reduce((u,c)=>{try{u[c]=s[c]}catch(f){u[c]=f}return u},{})})})}}),r.on.getInspectorTree(n=>{if(n.app===t&&n.inspectorId===J){let i=[e];i=i.concat(Array.from(e._s.values())),n.rootNodes=(n.filter?i.filter(a=>"$id"in a?a.$id.toLowerCase().includes(n.filter.toLowerCase()):mo.toLowerCase().includes(n.filter.toLowerCase())):i).map(kf)}}),r.on.getInspectorState(n=>{if(n.app===t&&n.inspectorId===J){const i=n.nodeId===nn?e:e._s.get(n.nodeId);if(!i)return;i&&(n.state=Rf(i))}}),r.on.editInspectorState((n,i)=>{if(n.app===t&&n.inspectorId===J){const a=n.nodeId===nn?e:e._s.get(n.nodeId);if(!a)return G(`store "${n.nodeId}" not found`,"error");const{path:o}=n;Rn(a)?o.unshift("state"):(o.length!==1||!a._customProperties.has(o[0])||o[0]in a.$state)&&o.unshift("$state"),ae=!1,n.set(a,o,n.state.value),ae=!0}}),r.on.editComponentState(n=>{if(n.type.startsWith("\u{1F34D}")){const i=n.type.replace(/^🍍\s*/,""),a=e._s.get(i);if(!a)return G(`store "${i}" not found`,"error");const{path:o}=n;if(o[0]!=="state")return G(`Invalid path for store "${i}":
${o}
Only state can be modified.`);o[0]="$state",ae=!1,n.set(a,o,n.state.value),ae=!0}})})}function Mf(t,e){Je.includes(fr(e.$id))||Je.push(fr(e.$id)),oo({id:"dev.esm.pinia",label:"Pinia \u{1F34D}",logo:"https://pinia.vuejs.org/logo.svg",packageName:"pinia",homepage:"https://pinia.vuejs.org",componentStateTypes:Je,app:t,settings:{logStoreChanges:{label:"Notify about new/deleted stores",type:"boolean",defaultValue:!0}}},r=>{const n=typeof r.now=="function"?r.now.bind(r):Date.now;e.$onAction(({after:o,onError:s,name:u,args:c})=>{const f=go++;r.addTimelineEvent({layerId:Bt,event:{time:n(),title:"\u{1F6EB} "+u,subtitle:"start",data:{store:ot(e.$id),action:ot(u),args:c},groupId:f}}),o(h=>{At=void 0,r.addTimelineEvent({layerId:Bt,event:{time:n(),title:"\u{1F6EC} "+u,subtitle:"end",data:{store:ot(e.$id),action:ot(u),args:c,result:h},groupId:f}})}),s(h=>{At=void 0,r.addTimelineEvent({layerId:Bt,event:{time:n(),logType:"error",title:"\u{1F4A5} "+u,subtitle:"end",data:{store:ot(e.$id),action:ot(u),args:c,error:h},groupId:f}})})},!0),e._customProperties.forEach(o=>{hs(()=>ps(e[o]),(s,u)=>{r.notifyComponentUpdate(),r.sendInspectorState(J),ae&&r.addTimelineEvent({layerId:Bt,event:{time:n(),title:"Change",subtitle:o,data:{newValue:s,oldValue:u},groupId:At}})},{deep:!0})}),e.$subscribe(({events:o,type:s},u)=>{if(r.notifyComponentUpdate(),r.sendInspectorState(J),!ae)return;const c={time:n(),title:Df(s),data:Ff({store:ot(e.$id)},jf(o)),groupId:At};s===Wt.patchFunction?c.subtitle="\u2935\uFE0F":s===Wt.patchObject?c.subtitle="\u{1F9E9}":o&&!Array.isArray(o)&&(c.subtitle=o.type),o&&(c.data["rawEvent(s)"]={_custom:{display:"DebuggerEvent",type:"object",tooltip:"raw DebuggerEvent[]",value:o}}),r.addTimelineEvent({layerId:Bt,event:c})},{detached:!0,flush:"sync"});const i=e._hotUpdate;e._hotUpdate=ba(o=>{i(o),r.addTimelineEvent({layerId:Bt,event:{time:n(),title:"\u{1F525} "+e.$id,subtitle:"HMR update",data:{store:ot(e.$id),info:ot("HMR update")}}}),r.notifyComponentUpdate(),r.sendInspectorTree(J),r.sendInspectorState(J)});const{$dispose:a}=e;e.$dispose=()=>{a(),r.notifyComponentUpdate(),r.sendInspectorTree(J),r.sendInspectorState(J),r.getSettings().logStoreChanges&&G(`Disposed "${e.$id}" store \u{1F5D1}`)},r.notifyComponentUpdate(),r.sendInspectorTree(J),r.sendInspectorState(J),r.getSettings().logStoreChanges&&G(`"${e.$id}" store installed \u{1F195}`)})}let go=0,At;function Ui(t,e,r){const n=e.reduce((i,a)=>(i[a]=_r(t)[a],i),{});for(const i in n)t[i]=function(){const a=go,o=r?new Proxy(t,{get(...u){return At=a,Reflect.get(...u)},set(...u){return At=a,Reflect.set(...u)}}):t;At=a;const s=n[i].apply(o,arguments);return At=void 0,s}}function Nf({app:t,store:e,options:r}){if(e.$id.startsWith("__hot:"))return;e._isOptionsAPI=!!r.state,Ui(e,Object.keys(r.actions),e._isOptionsAPI);const n=e._hotUpdate;_r(e)._hotUpdate=function(i){n.apply(this,arguments),Ui(e,Object.keys(i._hmrPayload.actions),!!e._isOptionsAPI)},Mf(t,e)}function Bf(){const t=ms(!0),e=t.run(()=>fs({}));let r=[];const n=ba({install(i){},use(i){return!this._a&&!hf||r.push(i),this},_p:r,_a:null,_e:t,_s:new Map,state:e});return uo&&typeof Proxy<"u"&&n.use(Nf),n}const Uf=function(t){t.mixin({beforeCreate(){const e=this.$options;if(e.pinia){const r=e.pinia;if(!this._provided){const n={};Object.defineProperty(this,"_provided",{get:()=>n,set:i=>Object.assign(n,i)})}this._provided[Sf]=r,this.$pinia||(this.$pinia=r),r._a=this,uo&&Lf(r._a,r)}else!this.$pinia&&e.parent&&e.parent.$pinia&&(this.$pinia=e.parent.$pinia)},destroyed(){delete this._pStores}})};function bo(t,e,r,n,i,a,o,s){var u=typeof t=="function"?t.options:t;e&&(u.render=e,u.staticRenderFns=r,u._compiled=!0),n&&(u.functional=!0),a&&(u._scopeId="data-v-"+a);var c;if(o?(c=function(v){v=v||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!v&&typeof __VUE_SSR_CONTEXT__<"u"&&(v=__VUE_SSR_CONTEXT__),i&&i.call(this,v),v&&v._registeredComponents&&v._registeredComponents.add(o)},u._ssrRegister=c):i&&(c=s?function(){i.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:i),c)if(u.functional){u._injectStyles=c;var f=u.render;u.render=function(g,_){return c.call(_),f(g,_)}}else{var h=u.beforeCreate;u.beforeCreate=h?[].concat(h,c):[c]}return{exports:t,options:u}}const Hf={};var zf=function(){var e=this,r=e._self._c;return r("router-view")},Wf=[],qf=bo(Hf,zf,Wf,!1,null,null,null,null);const Gf=qf.exports,Jf="modulepreload",Kf=function(t){return"/"+t},Hi={},St=function(e,r,n){if(!r||r.length===0)return e();const i=document.getElementsByTagName("link");return Promise.all(r.map(a=>{if(a=Kf(a),a in Hi)return;Hi[a]=!0;const o=a.endsWith(".css"),s=o?'[rel="stylesheet"]':"";if(!!n)for(let f=i.length-1;f>=0;f--){const h=i[f];if(h.href===a&&(!o||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${s}`))return;const c=document.createElement("link");if(c.rel=o?"stylesheet":Jf,o||(c.as="script",c.crossOrigin=""),c.href=a,document.head.appendChild(c),o)return new Promise((f,h)=>{c.addEventListener("load",f),c.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${a}`)))})})).then(()=>e())};/*!
  * vue-router v3.6.5
  * (c) 2022 Evan You
  * @license MIT
  */function st(t,e){for(var r in e)t[r]=e[r];return t}var Yf=/[!'()*]/g,Xf=function(t){return"%"+t.charCodeAt(0).toString(16)},Qf=/%2C/g,Zt=function(t){return encodeURIComponent(t).replace(Yf,Xf).replace(Qf,",")};function an(t){try{return decodeURIComponent(t)}catch(e){}return t}function Vf(t,e,r){e===void 0&&(e={});var n=r||Zf,i;try{i=n(t||"")}catch(s){i={}}for(var a in e){var o=e[a];i[a]=Array.isArray(o)?o.map(zi):zi(o)}return i}var zi=function(t){return t==null||typeof t=="object"?t:String(t)};function Zf(t){var e={};return t=t.trim().replace(/^(\?|#|&)/,""),t&&t.split("&").forEach(function(r){var n=r.replace(/\+/g," ").split("="),i=an(n.shift()),a=n.length>0?an(n.join("=")):null;e[i]===void 0?e[i]=a:Array.isArray(e[i])?e[i].push(a):e[i]=[e[i],a]}),e}function tl(t){var e=t?Object.keys(t).map(function(r){var n=t[r];if(n===void 0)return"";if(n===null)return Zt(r);if(Array.isArray(n)){var i=[];return n.forEach(function(a){a!==void 0&&(a===null?i.push(Zt(r)):i.push(Zt(r)+"="+Zt(a)))}),i.join("&")}return Zt(r)+"="+Zt(n)}).filter(function(r){return r.length>0}).join("&"):null;return e?"?"+e:""}var lr=/\/?$/;function pr(t,e,r,n){var i=n&&n.options.stringifyQuery,a=e.query||{};try{a=on(a)}catch(s){}var o={name:e.name||t&&t.name,meta:t&&t.meta||{},path:e.path||"/",hash:e.hash||"",query:a,params:e.params||{},fullPath:Wi(e,i),matched:t?el(t):[]};return r&&(o.redirectedFrom=Wi(r,i)),Object.freeze(o)}function on(t){if(Array.isArray(t))return t.map(on);if(t&&typeof t=="object"){var e={};for(var r in t)e[r]=on(t[r]);return e}else return t}var Dt=pr(null,{path:"/"});function el(t){for(var e=[];t;)e.unshift(t),t=t.parent;return e}function Wi(t,e){var r=t.path,n=t.query;n===void 0&&(n={});var i=t.hash;i===void 0&&(i="");var a=e||tl;return(r||"/")+a(n)+i}function _o(t,e,r){return e===Dt?t===e:e?t.path&&e.path?t.path.replace(lr,"")===e.path.replace(lr,"")&&(r||t.hash===e.hash&&Ke(t.query,e.query)):t.name&&e.name?t.name===e.name&&(r||t.hash===e.hash&&Ke(t.query,e.query)&&Ke(t.params,e.params)):!1:!1}function Ke(t,e){if(t===void 0&&(t={}),e===void 0&&(e={}),!t||!e)return t===e;var r=Object.keys(t).sort(),n=Object.keys(e).sort();return r.length!==n.length?!1:r.every(function(i,a){var o=t[i],s=n[a];if(s!==i)return!1;var u=e[i];return o==null||u==null?o===u:typeof o=="object"&&typeof u=="object"?Ke(o,u):String(o)===String(u)})}function rl(t,e){return t.path.replace(lr,"/").indexOf(e.path.replace(lr,"/"))===0&&(!e.hash||t.hash===e.hash)&&nl(t.query,e.query)}function nl(t,e){for(var r in e)if(!(r in t))return!1;return!0}function yo(t){for(var e=0;e<t.matched.length;e++){var r=t.matched[e];for(var n in r.instances){var i=r.instances[n],a=r.enteredCbs[n];if(!(!i||!a)){delete r.enteredCbs[n];for(var o=0;o<a.length;o++)i._isBeingDestroyed||a[o](i)}}}}var il={name:"RouterView",functional:!0,props:{name:{type:String,default:"default"}},render:function(e,r){var n=r.props,i=r.children,a=r.parent,o=r.data;o.routerView=!0;for(var s=a.$createElement,u=n.name,c=a.$route,f=a._routerViewCache||(a._routerViewCache={}),h=0,v=!1;a&&a._routerRoot!==a;){var g=a.$vnode?a.$vnode.data:{};g.routerView&&h++,g.keepAlive&&a._directInactive&&a._inactive&&(v=!0),a=a.$parent}if(o.routerViewDepth=h,v){var _=f[u],y=_&&_.component;return y?(_.configProps&&qi(y,o,_.route,_.configProps),s(y,o,i)):s()}var b=c.matched[h],S=b&&b.components[u];if(!b||!S)return f[u]=null,s();f[u]={component:S},o.registerRouteInstance=function($,P){var D=b.instances[u];(P&&D!==$||!P&&D===$)&&(b.instances[u]=P)},(o.hook||(o.hook={})).prepatch=function($,P){b.instances[u]=P.componentInstance},o.hook.init=function($){$.data.keepAlive&&$.componentInstance&&$.componentInstance!==b.instances[u]&&(b.instances[u]=$.componentInstance),yo(c)};var C=b.props&&b.props[u];return C&&(st(f[u],{route:c,configProps:C}),qi(S,o,c,C)),s(S,o,i)}};function qi(t,e,r,n){var i=e.props=al(r,n);if(i){i=e.props=st({},i);var a=e.attrs=e.attrs||{};for(var o in i)(!t.props||!(o in t.props))&&(a[o]=i[o],delete i[o])}}function al(t,e){switch(typeof e){case"undefined":return;case"object":return e;case"function":return e(t);case"boolean":return e?t.params:void 0}}function wo(t,e,r){var n=t.charAt(0);if(n==="/")return t;if(n==="?"||n==="#")return e+t;var i=e.split("/");(!r||!i[i.length-1])&&i.pop();for(var a=t.replace(/^\//,"").split("/"),o=0;o<a.length;o++){var s=a[o];s===".."?i.pop():s!=="."&&i.push(s)}return i[0]!==""&&i.unshift(""),i.join("/")}function ol(t){var e="",r="",n=t.indexOf("#");n>=0&&(e=t.slice(n),t=t.slice(0,n));var i=t.indexOf("?");return i>=0&&(r=t.slice(i+1),t=t.slice(0,i)),{path:t,query:r,hash:e}}function Ot(t){return t.replace(/\/(?:\s*\/)+/g,"/")}var dr=Array.isArray||function(t){return Object.prototype.toString.call(t)=="[object Array]"},de=Eo,sl=jn,ul=pl,cl=So,fl=Co,ll=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function jn(t,e){for(var r=[],n=0,i=0,a="",o=e&&e.delimiter||"/",s;(s=ll.exec(t))!=null;){var u=s[0],c=s[1],f=s.index;if(a+=t.slice(i,f),i=f+u.length,c){a+=c[1];continue}var h=t[i],v=s[2],g=s[3],_=s[4],y=s[5],b=s[6],S=s[7];a&&(r.push(a),a="");var C=v!=null&&h!=null&&h!==v,$=b==="+"||b==="*",P=b==="?"||b==="*",D=s[2]||o,N=_||y;r.push({name:g||n++,prefix:v||"",delimiter:D,optional:P,repeat:$,partial:C,asterisk:!!S,pattern:N?vl(N):S?".*":"[^"+Ye(D)+"]+?"})}return i<t.length&&(a+=t.substr(i)),a&&r.push(a),r}function pl(t,e){return So(jn(t,e),e)}function dl(t){return encodeURI(t).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function hl(t){return encodeURI(t).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function So(t,e){for(var r=new Array(t.length),n=0;n<t.length;n++)typeof t[n]=="object"&&(r[n]=new RegExp("^(?:"+t[n].pattern+")$",Fn(e)));return function(i,a){for(var o="",s=i||{},u=a||{},c=u.pretty?dl:encodeURIComponent,f=0;f<t.length;f++){var h=t[f];if(typeof h=="string"){o+=h;continue}var v=s[h.name],g;if(v==null)if(h.optional){h.partial&&(o+=h.prefix);continue}else throw new TypeError('Expected "'+h.name+'" to be defined');if(dr(v)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(v)+"`");if(v.length===0){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var _=0;_<v.length;_++){if(g=c(v[_]),!r[f].test(g))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(g)+"`");o+=(_===0?h.prefix:h.delimiter)+g}continue}if(g=h.asterisk?hl(v):c(v),!r[f].test(g))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+g+'"');o+=h.prefix+g}return o}}function Ye(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function vl(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function Dn(t,e){return t.keys=e,t}function Fn(t){return t&&t.sensitive?"":"i"}function ml(t,e){var r=t.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)e.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return Dn(t,e)}function gl(t,e,r){for(var n=[],i=0;i<t.length;i++)n.push(Eo(t[i],e,r).source);var a=new RegExp("(?:"+n.join("|")+")",Fn(r));return Dn(a,e)}function bl(t,e,r){return Co(jn(t,r),e,r)}function Co(t,e,r){dr(e)||(r=e||r,e=[]),r=r||{};for(var n=r.strict,i=r.end!==!1,a="",o=0;o<t.length;o++){var s=t[o];if(typeof s=="string")a+=Ye(s);else{var u=Ye(s.prefix),c="(?:"+s.pattern+")";e.push(s),s.repeat&&(c+="(?:"+u+c+")*"),s.optional?s.partial?c=u+"("+c+")?":c="(?:"+u+"("+c+"))?":c=u+"("+c+")",a+=c}}var f=Ye(r.delimiter||"/"),h=a.slice(-f.length)===f;return n||(a=(h?a.slice(0,-f.length):a)+"(?:"+f+"(?=$))?"),i?a+="$":a+=n&&h?"":"(?="+f+"|$)",Dn(new RegExp("^"+a,Fn(r)),e)}function Eo(t,e,r){return dr(e)||(r=e||r,e=[]),r=r||{},t instanceof RegExp?ml(t,e):dr(t)?gl(t,e,r):bl(t,e,r)}de.parse=sl;de.compile=ul;de.tokensToFunction=cl;de.tokensToRegExp=fl;var Gi=Object.create(null);function Xe(t,e,r){e=e||{};try{var n=Gi[t]||(Gi[t]=de.compile(t));return typeof e.pathMatch=="string"&&(e[0]=e.pathMatch),n(e,{pretty:!0})}catch(i){return""}finally{delete e[0]}}function Ln(t,e,r,n){var i=typeof t=="string"?{path:t}:t;if(i._normalized)return i;if(i.name){i=st({},t);var a=i.params;return a&&typeof a=="object"&&(i.params=st({},a)),i}if(!i.path&&i.params&&e){i=st({},i),i._normalized=!0;var o=st(st({},e.params),i.params);if(e.name)i.name=e.name,i.params=o;else if(e.matched.length){var s=e.matched[e.matched.length-1].path;i.path=Xe(s,o,"path "+e.path)}return i}var u=ol(i.path||""),c=e&&e.path||"/",f=u.path?wo(u.path,c,r||i.append):c,h=Vf(u.query,i.query,n&&n.options.parseQuery),v=i.hash||u.hash;return v&&v.charAt(0)!=="#"&&(v="#"+v),{_normalized:!0,path:f,query:h,hash:v}}var _l=[String,Object],yl=[String,Array],Ji=function(){},wl={name:"RouterLink",props:{to:{type:_l,required:!0},tag:{type:String,default:"a"},custom:Boolean,exact:Boolean,exactPath:Boolean,append:Boolean,replace:Boolean,activeClass:String,exactActiveClass:String,ariaCurrentValue:{type:String,default:"page"},event:{type:yl,default:"click"}},render:function(e){var r=this,n=this.$router,i=this.$route,a=n.resolve(this.to,i,this.append),o=a.location,s=a.route,u=a.href,c={},f=n.options.linkActiveClass,h=n.options.linkExactActiveClass,v=f==null?"router-link-active":f,g=h==null?"router-link-exact-active":h,_=this.activeClass==null?v:this.activeClass,y=this.exactActiveClass==null?g:this.exactActiveClass,b=s.redirectedFrom?pr(null,Ln(s.redirectedFrom),null,n):s;c[y]=_o(i,b,this.exactPath),c[_]=this.exact||this.exactPath?c[y]:rl(i,b);var S=c[y]?this.ariaCurrentValue:null,C=function(p){Ki(p)&&(r.replace?n.replace(o,Ji):n.push(o,Ji))},$={click:Ki};Array.isArray(this.event)?this.event.forEach(function(p){$[p]=C}):$[this.event]=C;var P={class:c},D=!this.$scopedSlots.$hasNormal&&this.$scopedSlots.default&&this.$scopedSlots.default({href:u,route:s,navigate:C,isActive:c[_],isExactActive:c[y]});if(D){if(D.length===1)return D[0];if(D.length>1||!D.length)return D.length===0?e():e("span",{},D)}if(this.tag==="a")P.on=$,P.attrs={href:u,"aria-current":S};else{var N=xo(this.$slots.default);if(N){N.isStatic=!1;var B=N.data=st({},N.data);B.on=B.on||{};for(var W in B.on){var dt=B.on[W];W in $&&(B.on[W]=Array.isArray(dt)?dt:[dt])}for(var ht in $)ht in B.on?B.on[ht].push($[ht]):B.on[ht]=C;var vt=N.data.attrs=st({},N.data.attrs);vt.href=u,vt["aria-current"]=S}else P.on=$}return e(this.tag,P,this.$slots.default)}};function Ki(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){var e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function xo(t){if(t){for(var e,r=0;r<t.length;r++)if(e=t[r],e.tag==="a"||e.children&&(e=xo(e.children)))return e}}var hr;function sn(t){if(!(sn.installed&&hr===t)){sn.installed=!0,hr=t;var e=function(i){return i!==void 0},r=function(i,a){var o=i.$options._parentVnode;e(o)&&e(o=o.data)&&e(o=o.registerRouteInstance)&&o(i,a)};t.mixin({beforeCreate:function(){e(this.$options.router)?(this._routerRoot=this,this._router=this.$options.router,this._router.init(this),t.util.defineReactive(this,"_route",this._router.history.current)):this._routerRoot=this.$parent&&this.$parent._routerRoot||this,r(this,this)},destroyed:function(){r(this)}}),Object.defineProperty(t.prototype,"$router",{get:function(){return this._routerRoot._router}}),Object.defineProperty(t.prototype,"$route",{get:function(){return this._routerRoot._route}}),t.component("RouterView",il),t.component("RouterLink",wl);var n=t.config.optionMergeStrategies;n.beforeRouteEnter=n.beforeRouteLeave=n.beforeRouteUpdate=n.created}}var Pe=typeof window<"u";function Ne(t,e,r,n,i){var a=e||[],o=r||Object.create(null),s=n||Object.create(null);t.forEach(function(f){un(a,o,s,f,i)});for(var u=0,c=a.length;u<c;u++)a[u]==="*"&&(a.push(a.splice(u,1)[0]),c--,u--);return{pathList:a,pathMap:o,nameMap:s}}function un(t,e,r,n,i,a){var o=n.path,s=n.name,u=n.pathToRegexpOptions||{},c=Cl(o,i,u.strict);typeof n.caseSensitive=="boolean"&&(u.sensitive=n.caseSensitive);var f={path:c,regex:Sl(c,u),components:n.components||{default:n.component},alias:n.alias?typeof n.alias=="string"?[n.alias]:n.alias:[],instances:{},enteredCbs:{},name:s,parent:i,matchAs:a,redirect:n.redirect,beforeEnter:n.beforeEnter,meta:n.meta||{},props:n.props==null?{}:n.components?n.props:{default:n.props}};if(n.children&&n.children.forEach(function(y){var b=a?Ot(a+"/"+y.path):void 0;un(t,e,r,y,f,b)}),e[f.path]||(t.push(f.path),e[f.path]=f),n.alias!==void 0)for(var h=Array.isArray(n.alias)?n.alias:[n.alias],v=0;v<h.length;++v){var g=h[v],_={path:g,children:n.children};un(t,e,r,_,i,f.path||"/")}s&&(r[s]||(r[s]=f))}function Sl(t,e){var r=de(t,[],e);return r}function Cl(t,e,r){return r||(t=t.replace(/\/$/,"")),t[0]==="/"||e==null?t:Ot(e.path+"/"+t)}function El(t,e){var r=Ne(t),n=r.pathList,i=r.pathMap,a=r.nameMap;function o(g){Ne(g,n,i,a)}function s(g,_){var y=typeof g!="object"?a[g]:void 0;Ne([_||g],n,i,a,y),y&&y.alias.length&&Ne(y.alias.map(function(b){return{path:b,children:[_]}}),n,i,a,y)}function u(){return n.map(function(g){return i[g]})}function c(g,_,y){var b=Ln(g,_,!1,e),S=b.name;if(S){var C=a[S];if(!C)return v(null,b);var $=C.regex.keys.filter(function(W){return!W.optional}).map(function(W){return W.name});if(typeof b.params!="object"&&(b.params={}),_&&typeof _.params=="object")for(var P in _.params)!(P in b.params)&&$.indexOf(P)>-1&&(b.params[P]=_.params[P]);return b.path=Xe(C.path,b.params),v(C,b,y)}else if(b.path){b.params={};for(var D=0;D<n.length;D++){var N=n[D],B=i[N];if(xl(B.regex,b.path,b.params))return v(B,b,y)}}return v(null,b)}function f(g,_){var y=g.redirect,b=typeof y=="function"?y(pr(g,_,null,e)):y;if(typeof b=="string"&&(b={path:b}),!b||typeof b!="object")return v(null,_);var S=b,C=S.name,$=S.path,P=_.query,D=_.hash,N=_.params;if(P=S.hasOwnProperty("query")?S.query:P,D=S.hasOwnProperty("hash")?S.hash:D,N=S.hasOwnProperty("params")?S.params:N,C)return a[C],c({_normalized:!0,name:C,query:P,hash:D,params:N},void 0,_);if($){var B=Al($,g),W=Xe(B,N);return c({_normalized:!0,path:W,query:P,hash:D},void 0,_)}else return v(null,_)}function h(g,_,y){var b=Xe(y,_.params),S=c({_normalized:!0,path:b});if(S){var C=S.matched,$=C[C.length-1];return _.params=S.params,v($,_)}return v(null,_)}function v(g,_,y){return g&&g.redirect?f(g,y||_):g&&g.matchAs?h(g,_,g.matchAs):pr(g,_,y,e)}return{match:c,addRoute:s,getRoutes:u,addRoutes:o}}function xl(t,e,r){var n=e.match(t);if(n){if(!r)return!0}else return!1;for(var i=1,a=n.length;i<a;++i){var o=t.keys[i-1];o&&(r[o.name||"pathMatch"]=typeof n[i]=="string"?an(n[i]):n[i])}return!0}function Al(t,e){return wo(t,e.parent?e.parent.path:"/",!0)}var Ol=Pe&&window.performance&&window.performance.now?window.performance:Date;function Ao(){return Ol.now().toFixed(3)}var Oo=Ao();function wr(){return Oo}function $o(t){return Oo=t}var To=Object.create(null);function Po(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");var t=window.location.protocol+"//"+window.location.host,e=window.location.href.replace(t,""),r=st({},window.history.state);return r.key=wr(),window.history.replaceState(r,"",e),window.addEventListener("popstate",Yi),function(){window.removeEventListener("popstate",Yi)}}function $t(t,e,r,n){if(!!t.app){var i=t.options.scrollBehavior;!i||t.app.$nextTick(function(){var a=$l(),o=i.call(t,e,r,n?a:null);!o||(typeof o.then=="function"?o.then(function(s){Vi(s,a)}).catch(function(s){}):Vi(o,a))})}}function Io(){var t=wr();t&&(To[t]={x:window.pageXOffset,y:window.pageYOffset})}function Yi(t){Io(),t.state&&t.state.key&&$o(t.state.key)}function $l(){var t=wr();if(t)return To[t]}function Tl(t,e){var r=document.documentElement,n=r.getBoundingClientRect(),i=t.getBoundingClientRect();return{x:i.left-n.left-e.x,y:i.top-n.top-e.y}}function Xi(t){return ue(t.x)||ue(t.y)}function Qi(t){return{x:ue(t.x)?t.x:window.pageXOffset,y:ue(t.y)?t.y:window.pageYOffset}}function Pl(t){return{x:ue(t.x)?t.x:0,y:ue(t.y)?t.y:0}}function ue(t){return typeof t=="number"}var Il=/^#\d/;function Vi(t,e){var r=typeof t=="object";if(r&&typeof t.selector=="string"){var n=Il.test(t.selector)?document.getElementById(t.selector.slice(1)):document.querySelector(t.selector);if(n){var i=t.offset&&typeof t.offset=="object"?t.offset:{};i=Pl(i),e=Tl(n,i)}else Xi(t)&&(e=Qi(t))}else r&&Xi(t)&&(e=Qi(t));e&&("scrollBehavior"in document.documentElement.style?window.scrollTo({left:e.x,top:e.y,behavior:t.behavior}):window.scrollTo(e.x,e.y))}var Tt=Pe&&function(){var t=window.navigator.userAgent;return(t.indexOf("Android 2.")!==-1||t.indexOf("Android 4.0")!==-1)&&t.indexOf("Mobile Safari")!==-1&&t.indexOf("Chrome")===-1&&t.indexOf("Windows Phone")===-1?!1:window.history&&typeof window.history.pushState=="function"}();function vr(t,e){Io();var r=window.history;try{if(e){var n=st({},r.state);n.key=wr(),r.replaceState(n,"",t)}else r.pushState({key:$o(Ao())},"",t)}catch(i){window.location[e?"replace":"assign"](t)}}function cn(t){vr(t,!0)}var Xt={redirected:2,aborted:4,cancelled:8,duplicated:16};function kl(t,e){return Sr(t,e,Xt.redirected,'Redirected when going from "'+t.fullPath+'" to "'+Fl(e)+'" via a navigation guard.')}function Rl(t,e){var r=Sr(t,e,Xt.duplicated,'Avoided redundant navigation to current location: "'+t.fullPath+'".');return r.name="NavigationDuplicated",r}function Zi(t,e){return Sr(t,e,Xt.cancelled,'Navigation cancelled from "'+t.fullPath+'" to "'+e.fullPath+'" with a new navigation.')}function jl(t,e){return Sr(t,e,Xt.aborted,'Navigation aborted from "'+t.fullPath+'" to "'+e.fullPath+'" via a navigation guard.')}function Sr(t,e,r,n){var i=new Error(n);return i._isRouter=!0,i.from=t,i.to=e,i.type=r,i}var Dl=["params","query","hash"];function Fl(t){if(typeof t=="string")return t;if("path"in t)return t.path;var e={};return Dl.forEach(function(r){r in t&&(e[r]=t[r])}),JSON.stringify(e,null,2)}function mr(t){return Object.prototype.toString.call(t).indexOf("Error")>-1}function Cr(t,e){return mr(t)&&t._isRouter&&(e==null||t.type===e)}function ta(t,e,r){var n=function(i){i>=t.length?r():t[i]?e(t[i],function(){n(i+1)}):n(i+1)};n(0)}function Ll(t){return function(e,r,n){var i=!1,a=0,o=null;ko(t,function(s,u,c,f){if(typeof s=="function"&&s.cid===void 0){i=!0,a++;var h=ea(function(y){Nl(y)&&(y=y.default),s.resolved=typeof y=="function"?y:hr.extend(y),c.components[f]=y,a--,a<=0&&n()}),v=ea(function(y){var b="Failed to resolve async component "+f+": "+y;o||(o=mr(y)?y:new Error(b),n(o))}),g;try{g=s(h,v)}catch(y){v(y)}if(g)if(typeof g.then=="function")g.then(h,v);else{var _=g.component;_&&typeof _.then=="function"&&_.then(h,v)}}}),i||n()}}function ko(t,e){return Ro(t.map(function(r){return Object.keys(r.components).map(function(n){return e(r.components[n],r.instances[n],r,n)})}))}function Ro(t){return Array.prototype.concat.apply([],t)}var Ml=typeof Symbol=="function"&&typeof Symbol.toStringTag=="symbol";function Nl(t){return t.__esModule||Ml&&t[Symbol.toStringTag]==="Module"}function ea(t){var e=!1;return function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if(!e)return e=!0,t.apply(this,r)}}var ft=function(e,r){this.router=e,this.base=Bl(r),this.current=Dt,this.pending=null,this.ready=!1,this.readyCbs=[],this.readyErrorCbs=[],this.errorCbs=[],this.listeners=[]};ft.prototype.listen=function(e){this.cb=e};ft.prototype.onReady=function(e,r){this.ready?e():(this.readyCbs.push(e),r&&this.readyErrorCbs.push(r))};ft.prototype.onError=function(e){this.errorCbs.push(e)};ft.prototype.transitionTo=function(e,r,n){var i=this,a;try{a=this.router.match(e,this.current)}catch(s){throw this.errorCbs.forEach(function(u){u(s)}),s}var o=this.current;this.confirmTransition(a,function(){i.updateRoute(a),r&&r(a),i.ensureURL(),i.router.afterHooks.forEach(function(s){s&&s(a,o)}),i.ready||(i.ready=!0,i.readyCbs.forEach(function(s){s(a)}))},function(s){n&&n(s),s&&!i.ready&&(!Cr(s,Xt.redirected)||o!==Dt)&&(i.ready=!0,i.readyErrorCbs.forEach(function(u){u(s)}))})};ft.prototype.confirmTransition=function(e,r,n){var i=this,a=this.current;this.pending=e;var o=function(y){!Cr(y)&&mr(y)&&(i.errorCbs.length?i.errorCbs.forEach(function(b){b(y)}):console.error(y)),n&&n(y)},s=e.matched.length-1,u=a.matched.length-1;if(_o(e,a)&&s===u&&e.matched[s]===a.matched[u])return this.ensureURL(),e.hash&&$t(this.router,a,e,!1),o(Rl(a,e));var c=Ul(this.current.matched,e.matched),f=c.updated,h=c.deactivated,v=c.activated,g=[].concat(zl(h),this.router.beforeHooks,Wl(f),v.map(function(y){return y.beforeEnter}),Ll(v)),_=function(y,b){if(i.pending!==e)return o(Zi(a,e));try{y(e,a,function(S){S===!1?(i.ensureURL(!0),o(jl(a,e))):mr(S)?(i.ensureURL(!0),o(S)):typeof S=="string"||typeof S=="object"&&(typeof S.path=="string"||typeof S.name=="string")?(o(kl(a,e)),typeof S=="object"&&S.replace?i.replace(S):i.push(S)):b(S)})}catch(S){o(S)}};ta(g,_,function(){var y=ql(v),b=y.concat(i.router.resolveHooks);ta(b,_,function(){if(i.pending!==e)return o(Zi(a,e));i.pending=null,r(e),i.router.app&&i.router.app.$nextTick(function(){yo(e)})})})};ft.prototype.updateRoute=function(e){this.current=e,this.cb&&this.cb(e)};ft.prototype.setupListeners=function(){};ft.prototype.teardown=function(){this.listeners.forEach(function(e){e()}),this.listeners=[],this.current=Dt,this.pending=null};function Bl(t){if(!t)if(Pe){var e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^https?:\/\/[^\/]+/,"")}else t="/";return t.charAt(0)!=="/"&&(t="/"+t),t.replace(/\/$/,"")}function Ul(t,e){var r,n=Math.max(t.length,e.length);for(r=0;r<n&&t[r]===e[r];r++);return{updated:e.slice(0,r),activated:e.slice(r),deactivated:t.slice(r)}}function Mn(t,e,r,n){var i=ko(t,function(a,o,s,u){var c=Hl(a,e);if(c)return Array.isArray(c)?c.map(function(f){return r(f,o,s,u)}):r(c,o,s,u)});return Ro(n?i.reverse():i)}function Hl(t,e){return typeof t!="function"&&(t=hr.extend(t)),t.options[e]}function zl(t){return Mn(t,"beforeRouteLeave",jo,!0)}function Wl(t){return Mn(t,"beforeRouteUpdate",jo)}function jo(t,e){if(e)return function(){return t.apply(e,arguments)}}function ql(t){return Mn(t,"beforeRouteEnter",function(e,r,n,i){return Gl(e,n,i)})}function Gl(t,e,r){return function(i,a,o){return t(i,a,function(s){typeof s=="function"&&(e.enteredCbs[r]||(e.enteredCbs[r]=[]),e.enteredCbs[r].push(s)),o(s)})}}var Do=function(t){function e(r,n){t.call(this,r,n),this._startLocation=be(this.base)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var n=this;if(!(this.listeners.length>0)){var i=this.router,a=i.options.scrollBehavior,o=Tt&&a;o&&this.listeners.push(Po());var s=function(){var u=n.current,c=be(n.base);n.current===Dt&&c===n._startLocation||n.transitionTo(c,function(f){o&&$t(i,f,u,!0)})};window.addEventListener("popstate",s),this.listeners.push(function(){window.removeEventListener("popstate",s)})}},e.prototype.go=function(n){window.history.go(n)},e.prototype.push=function(n,i,a){var o=this,s=this,u=s.current;this.transitionTo(n,function(c){vr(Ot(o.base+c.fullPath)),$t(o.router,c,u,!1),i&&i(c)},a)},e.prototype.replace=function(n,i,a){var o=this,s=this,u=s.current;this.transitionTo(n,function(c){cn(Ot(o.base+c.fullPath)),$t(o.router,c,u,!1),i&&i(c)},a)},e.prototype.ensureURL=function(n){if(be(this.base)!==this.current.fullPath){var i=Ot(this.base+this.current.fullPath);n?vr(i):cn(i)}},e.prototype.getCurrentLocation=function(){return be(this.base)},e}(ft);function be(t){var e=window.location.pathname,r=e.toLowerCase(),n=t.toLowerCase();return t&&(r===n||r.indexOf(Ot(n+"/"))===0)&&(e=e.slice(t.length)),(e||"/")+window.location.search+window.location.hash}var Fo=function(t){function e(r,n,i){t.call(this,r,n),!(i&&Jl(this.base))&&ra()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var n=this;if(!(this.listeners.length>0)){var i=this.router,a=i.options.scrollBehavior,o=Tt&&a;o&&this.listeners.push(Po());var s=function(){var c=n.current;!ra()||n.transitionTo(Qe(),function(f){o&&$t(n.router,f,c,!0),Tt||Ve(f.fullPath)})},u=Tt?"popstate":"hashchange";window.addEventListener(u,s),this.listeners.push(function(){window.removeEventListener(u,s)})}},e.prototype.push=function(n,i,a){var o=this,s=this,u=s.current;this.transitionTo(n,function(c){na(c.fullPath),$t(o.router,c,u,!1),i&&i(c)},a)},e.prototype.replace=function(n,i,a){var o=this,s=this,u=s.current;this.transitionTo(n,function(c){Ve(c.fullPath),$t(o.router,c,u,!1),i&&i(c)},a)},e.prototype.go=function(n){window.history.go(n)},e.prototype.ensureURL=function(n){var i=this.current.fullPath;Qe()!==i&&(n?na(i):Ve(i))},e.prototype.getCurrentLocation=function(){return Qe()},e}(ft);function Jl(t){var e=be(t);if(!/^\/#/.test(e))return window.location.replace(Ot(t+"/#"+e)),!0}function ra(){var t=Qe();return t.charAt(0)==="/"?!0:(Ve("/"+t),!1)}function Qe(){var t=window.location.href,e=t.indexOf("#");return e<0?"":(t=t.slice(e+1),t)}function fn(t){var e=window.location.href,r=e.indexOf("#"),n=r>=0?e.slice(0,r):e;return n+"#"+t}function na(t){Tt?vr(fn(t)):window.location.hash=t}function Ve(t){Tt?cn(fn(t)):window.location.replace(fn(t))}var Kl=function(t){function e(r,n){t.call(this,r,n),this.stack=[],this.index=-1}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.push=function(n,i,a){var o=this;this.transitionTo(n,function(s){o.stack=o.stack.slice(0,o.index+1).concat(s),o.index++,i&&i(s)},a)},e.prototype.replace=function(n,i,a){var o=this;this.transitionTo(n,function(s){o.stack=o.stack.slice(0,o.index).concat(s),i&&i(s)},a)},e.prototype.go=function(n){var i=this,a=this.index+n;if(!(a<0||a>=this.stack.length)){var o=this.stack[a];this.confirmTransition(o,function(){var s=i.current;i.index=a,i.updateRoute(o),i.router.afterHooks.forEach(function(u){u&&u(o,s)})},function(s){Cr(s,Xt.duplicated)&&(i.index=a)})}},e.prototype.getCurrentLocation=function(){var n=this.stack[this.stack.length-1];return n?n.fullPath:"/"},e.prototype.ensureURL=function(){},e}(ft),M=function(e){e===void 0&&(e={}),this.app=null,this.apps=[],this.options=e,this.beforeHooks=[],this.resolveHooks=[],this.afterHooks=[],this.matcher=El(e.routes||[],this);var r=e.mode||"hash";switch(this.fallback=r==="history"&&!Tt&&e.fallback!==!1,this.fallback&&(r="hash"),Pe||(r="abstract"),this.mode=r,r){case"history":this.history=new Do(this,e.base);break;case"hash":this.history=new Fo(this,e.base,this.fallback);break;case"abstract":this.history=new Kl(this,e.base);break}},Lo={currentRoute:{configurable:!0}};M.prototype.match=function(e,r,n){return this.matcher.match(e,r,n)};Lo.currentRoute.get=function(){return this.history&&this.history.current};M.prototype.init=function(e){var r=this;if(this.apps.push(e),e.$once("hook:destroyed",function(){var o=r.apps.indexOf(e);o>-1&&r.apps.splice(o,1),r.app===e&&(r.app=r.apps[0]||null),r.app||r.history.teardown()}),!this.app){this.app=e;var n=this.history;if(n instanceof Do||n instanceof Fo){var i=function(o){var s=n.current,u=r.options.scrollBehavior,c=Tt&&u;c&&"fullPath"in o&&$t(r,o,s,!1)},a=function(o){n.setupListeners(),i(o)};n.transitionTo(n.getCurrentLocation(),a,a)}n.listen(function(o){r.apps.forEach(function(s){s._route=o})})}};M.prototype.beforeEach=function(e){return Nn(this.beforeHooks,e)};M.prototype.beforeResolve=function(e){return Nn(this.resolveHooks,e)};M.prototype.afterEach=function(e){return Nn(this.afterHooks,e)};M.prototype.onReady=function(e,r){this.history.onReady(e,r)};M.prototype.onError=function(e){this.history.onError(e)};M.prototype.push=function(e,r,n){var i=this;if(!r&&!n&&typeof Promise<"u")return new Promise(function(a,o){i.history.push(e,a,o)});this.history.push(e,r,n)};M.prototype.replace=function(e,r,n){var i=this;if(!r&&!n&&typeof Promise<"u")return new Promise(function(a,o){i.history.replace(e,a,o)});this.history.replace(e,r,n)};M.prototype.go=function(e){this.history.go(e)};M.prototype.back=function(){this.go(-1)};M.prototype.forward=function(){this.go(1)};M.prototype.getMatchedComponents=function(e){var r=e?e.matched?e:this.resolve(e).route:this.currentRoute;return r?[].concat.apply([],r.matched.map(function(n){return Object.keys(n.components).map(function(i){return n.components[i]})})):[]};M.prototype.resolve=function(e,r,n){r=r||this.history.current;var i=Ln(e,r,n,this),a=this.match(i,r),o=a.redirectedFrom||a.fullPath,s=this.history.base,u=Yl(s,o,this.mode);return{location:i,route:a,href:u,normalizedTo:i,resolved:a}};M.prototype.getRoutes=function(){return this.matcher.getRoutes()};M.prototype.addRoute=function(e,r){this.matcher.addRoute(e,r),this.history.current!==Dt&&this.history.transitionTo(this.history.getCurrentLocation())};M.prototype.addRoutes=function(e){this.matcher.addRoutes(e),this.history.current!==Dt&&this.history.transitionTo(this.history.getCurrentLocation())};Object.defineProperties(M.prototype,Lo);var Mo=M;function Nn(t,e){return t.push(e),function(){var r=t.indexOf(e);r>-1&&t.splice(r,1)}}function Yl(t,e,r){var n=r==="hash"?"#"+e:e;return t?Ot(t+"/"+n):n}M.install=sn;M.version="3.6.5";M.isNavigationFailure=Cr;M.NavigationFailureType=Xt;M.START_LOCATION=Dt;Pe&&window.Vue&&window.Vue.use(M);const Xl=`## \u4E2D\u4ECB\u8005\u6A21\u5F0F\r
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
\u4E0B\u9762\u7684\u5185\u5BB9\u6CA1\u4EC0\u4E48\u91CD\u70B9\uFF0C\u6211\u770B\u4E0D\u4E0B\u53BB\u4E86\u2026\u2026`,Ql=`<html>\r
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
</html>`,Vl=`function ObserverList(){\r
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
`,Zl=`// Publish/subscribe.js\r
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
})(pubsub)`,tp=`#Javascript\u8BBE\u8BA1\u6A21\u5F0F/\u6211\u7684\u7406\u89E3\uFF08\u7FFB\u8BD1\r
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
\u8FD9\u662F\u6700\u7B80\u5355\u7684\u8BBE\u8BA1\u6A21\u5F0F\u4E4B\u4E00\uFF0C\u4E5F\u662F\u6700\u5F3A\u5927\u4E4B\u4E00\u3002`,ep=`// mediator implement\r
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
}`,rp=`// simple implement\r
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
})();`,np=`var myModule = (function(){\r
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
// `,ip=`var mySingleton = (function(){\r
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
})();`,ap=`# \u535A\u5BA2\u76EE\u5F55\r
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
`,op=`# Pattern \u4EE3\u7801\u793A\u4F8B\u96C6\r
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
`,sp=`# \u524D\u7AEF\u67B6\u6784\u51B3\u7B56\u624B\u518C\uFF1A\u4E0D\u662F\u201C\u6700\u5148\u8FDB\u201D\uFF0C\u800C\u662F\u201C\u6700\u5339\u914D\u201D\r
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
`,up=`# \u524D\u7AEF\u5DE5\u7A0B\u7406\u5FF5\uFF1A\u5FEB\u3001\u7A33\u3001\u7B80\uFF0C\u4E0D\u505A\u65E0\u6548\u590D\u6742\u5316\r
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
`,cp=`# 2026 \u524D\u7AEF\u70ED\u70B9\u5B9E\u6218\u56FE\uFF1A\u600E\u4E48\u7528\u3001\u4F55\u65F6\u7528\u3001\u4E3A\u4EC0\u4E48\u7528\r
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
`,fp=`# \u65E7\u7AD9\u5185\u5BB9\u5F52\u6863\r
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
`,lp=`# Markdown UI \u7F8E\u5316\u793A\u4F8B\r
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
`,pp=`# Markdown UI \u7F8E\u5316\u5B8C\u6210\u603B\u7ED3\r
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
`,dp=`# \u4E2D\u4ECB\u8005\u6A21\u5F0F\uFF08Mediator\uFF09\r
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
`,hp=`# Observer \u4E0E Publish/Subscribe\r
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
`,vp=`# H5 \`launch-app\`\uFF1A\u5FAE\u4FE1\u5F00\u653E\u6807\u7B7E \`wx-open-launch-app\` \u539F\u7406\u4E0E\u5B9E\u6218\r
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
`,mp=[{title:"Vue\u54CD\u5E94\u5F0F\u539F\u7406",content:"Object.defineProperty"},{title:"CSS-FLOAT",content:"vue-\u7ED1\u5B9A\u4F7F\u7528\u7684\u6307\u4EE4\u4E3A v-model: \u6682\u65E0\u5FEB\u6377\u7B80\u79F0"},{title:"Keyof Type Operator",content:"\u90A3\u4E2A keyof \u7C7B\u578B\u64CD\u4F5C\u7B26\uFF0Ckeyof \u7C7B\u578B\u64CD\u4F5C\u7B26\u80FD\u591F\u8F93\u5165\u4E00\u4E2A\u7C7B\u578B\uFF0C\u7136\u540E\u4EA7\u751F\u6240\u6709\u952E\u503C\u7684\u5B57\u7B26\u4E32\u6216\u8005\u6570\u5B57\u7684\u5B57\u9762\u8054\u5408\u7C7B\u578B"}],gp=Object.assign({"/pattern/Mediator.md":Xl,"/pattern/Observer.html":Ql,"/pattern/Observer.js":Vl,"/pattern/Publish.js":Zl,"/pattern/Publish.md":tp,"/pattern/mediator-senior.js":ep,"/pattern/mediator.js":rp,"/pattern/module.js":np,"/pattern/singleton.js":ip}),bp=Object.assign({"/vdocs/blog/README.md":ap,"/vdocs/blog/code-lab.md":op,"/vdocs/blog/frontend-architecture-decision-playbook.md":sp,"/vdocs/blog/frontend-engineering-philosophy.md":up,"/vdocs/blog/frontend-trends-2026-practice-map.md":cp,"/vdocs/blog/legacy-notes.md":fp,"/vdocs/blog/markdown-ui-demo.md":lp,"/vdocs/blog/markdown-ui-improvements.md":pp,"/vdocs/blog/mediator-pattern.md":dp,"/vdocs/blog/publish-subscribe.md":hp,"/vdocs/blog/wechat-open-tag-launch-app.md":vp}),No=t=>(t.split("/").pop()||"Untitled").replace(/\.[^.]+$/,""),_p=t=>t.replace(/```[\s\S]*?```/g," ").replace(/`([^`]+)`/g,"$1").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/^#{1,6}\s+/gm,"").replace(/[*_>~-]/g," ").replace(/\|/g," "),Bn=(t,e=180)=>{const r=_p(t).replace(/\s+/g," ").trim();return r.length>e?`${r.slice(0,e)}...`:r},yp=(t,e)=>{const r=t.match(/^#\s+(.+)$/m);return r?r[1].trim():e},Un=t=>t.toLowerCase().replace(/^\//,"").replace(/[^a-z0-9\u4e00-\u9fa5]+/g,"-").replace(/^-+|-+$/g,""),Bo=Object.entries(gp).map(([t,e])=>{const r=t.split(".").pop()||"txt";return{id:`pattern-${t}`,slug:Un(`pattern-${t}`),title:No(t),category:`pattern/${r}`,excerpt:Bn(e),content:e,source:"pattern"}}),Uo=Object.entries(bp).filter(([t])=>!t.endsWith("/README.md")).map(([t,e])=>({id:`vdocs-${t}`,slug:Un(`vdocs-${t}`),title:yp(e,No(t)),category:"vdocs/blog",excerpt:Bn(e),content:e,source:"vdocs"})),Ho=mp.map((t,e)=>({id:`seed-${e}`,slug:Un(`seed-${t.title}-${e}`),title:t.title,category:"notes",excerpt:Bn(t.content),content:t.content,source:"seed"})),Hn=[...Uo,...Bo,...Ho];function wp(){return Hn}function Lp(t){return Hn.find(e=>e.slug===t)}function Sp(){return{total:Hn.length,vdocsCount:Uo.length,patternCount:Bo.length,seedCount:Ho.length}}const Cp={__name:"HomeView",setup(t){const e=wp(),r=Sp(),n=e.slice(0,3);return{__sfc:!0,posts:e,stats:r,featuredPosts:n}}};var Ep=function(){var e=this,r=e._self._c,n=e._self._setupProxy;return r("main",{staticClass:"blog-page"},[r("section",{staticClass:"hero"},[r("div",{staticClass:"hero-content"},[r("p",{staticClass:"kicker"},[e._v("\u{1F31F} \u6280\u672F\u6539\u53D8\u751F\u6D3B")]),r("h1",[e._v("\u7528\u4EE3\u7801\u63A2\u7D22\u4E16\u754C\uFF0C\u4EE5\u5DE5\u7A0B\u9A71\u52A8\u521B\u65B0")]),r("p",{staticClass:"description"},[e._v(" \u8BB0\u5F55\u524D\u7AEF\u5DE5\u7A0B\u5B9E\u8DF5\u3001\u8BBE\u8BA1\u6A21\u5F0F\u7814\u7A76\u4E0E\u6D4F\u89C8\u5668\u5B9E\u9A8C\uFF0C\u5C55\u793A\u6280\u672F\u5982\u4F55\u8D4B\u80FD\u65E5\u5E38\u751F\u6D3B\u3002 ")]),r("div",{staticClass:"hero-actions"},[r("router-link",{staticClass:"btn primary",attrs:{to:"/about"}},[r("span",{staticClass:"btn-icon"},[e._v("\u{1F468}\u200D\u{1F4BB}")]),e._v(" \u5173\u4E8E\u6211 ")])],1)]),r("div",{staticClass:"hero-metrics"},[e._m(0),e._m(1),r("div",{staticClass:"metric"},[r("div",{staticClass:"metric-icon"},[e._v("\u{1F4DD}")]),r("p",[e._v("\u6587\u7AE0")]),r("strong",[e._v(e._s(n.stats.total))])]),e._m(2)])]),r("section",{staticClass:"featured"},[e._m(3),r("div",{staticClass:"featured-grid"},e._l(n.featuredPosts,function(i,a){return r("article",{key:i.id,staticClass:"featured-card",style:{animationDelay:`${a*.1}s`}},[r("div",{staticClass:"card-header"},[r("p",{staticClass:"meta"},[e._v(e._s(i.category))]),r("span",{staticClass:"source-badge"},[e._v(e._s(i.source))])]),r("h3",[e._v(e._s(i.title))]),r("p",{staticClass:"excerpt"},[e._v(e._s(i.excerpt))]),r("router-link",{staticClass:"read-link",attrs:{to:`/blog/${i.slug}`}},[e._v(" \u9605\u8BFB\u5168\u6587 "),r("span",{staticClass:"arrow"},[e._v("\u2192")])])],1)}),0)]),r("section",{staticClass:"blog-layout"},[r("article",{staticClass:"post-list"},e._l(n.posts,function(i,a){return r("div",{key:i.id,staticClass:"post-card",style:{animationDelay:`${a*.05}s`}},[r("div",{staticClass:"card-top"},[r("p",{staticClass:"meta"},[e._v(e._s(i.category))]),r("span",{staticClass:"source-badge small"},[e._v(e._s(i.source))])]),r("h2",[e._v(e._s(i.title))]),r("p",{staticClass:"excerpt"},[e._v(e._s(i.excerpt))]),r("router-link",{staticClass:"read-link",attrs:{to:`/blog/${i.slug}`}},[e._v(" \u9605\u8BFB\u5168\u6587 "),r("span",{staticClass:"arrow"},[e._v("\u2192")])]),r("details",{staticClass:"content-preview"},[e._m(4,!0),r("pre",[e._v(e._s(i.content))])])],1)}),0),r("aside",{staticClass:"sidebar"},[e._m(5),r("div",{staticClass:"panel"},[e._m(6),r("p",[e._v(" \u60F3\u4E86\u89E3 WebAssembly\uFF1F\u4ECE\u5B57\u8282\u7801\u3001WAT \u5230\u7EBF\u6027\u5185\u5B58\uFF0C\u67E5\u770B "),r("router-link",{attrs:{to:"/wasm"}},[e._v("WASM \u6559\u5B66")]),e._v("\u3002 ")],1)]),r("div",{staticClass:"panel stats-panel"},[e._m(7),r("div",{staticClass:"stats-list"},[r("div",{staticClass:"stat-item"},[r("span",{staticClass:"stat-label"},[e._v("\u6587\u7AE0\u603B\u6570")]),r("span",{staticClass:"stat-value"},[e._v(e._s(n.stats.total))])]),r("div",{staticClass:"stat-item"},[r("span",{staticClass:"stat-label"},[e._v("VDocs")]),r("span",{staticClass:"stat-value"},[e._v(e._s(n.stats.vdocsCount))])]),r("div",{staticClass:"stat-item"},[r("span",{staticClass:"stat-label"},[e._v("Patterns")]),r("span",{staticClass:"stat-value"},[e._v(e._s(n.stats.patternCount))])])])])])])])},xp=[function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"metric"},[e("div",{staticClass:"metric-icon"},[t._v("\u{1F4A1}")]),e("p",[t._v("\u6280\u672F\u7406\u5FF5")]),e("strong",[t._v("\u521B\u65B0")])])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"metric"},[e("div",{staticClass:"metric-icon"},[t._v("\u{1F527}")]),e("p",[t._v("\u5DE5\u7A0B\u5B9E\u8DF5")]),e("strong",[t._v("\u843D\u5730")])])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"metric"},[e("div",{staticClass:"metric-icon"},[t._v("\u{1F310}")]),e("p",[t._v("\u5F00\u6E90")]),e("strong",[t._v("\u5171\u4EAB")])])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("h2",[e("span",{staticClass:"section-icon"},[t._v("\u{1F4CC}")]),t._v(" \u7CBE\u9009\u6587\u7AE0 ")])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("summary",[e("span",{staticClass:"expand-icon"},[t._v("\u25BC")]),t._v(" \u5C55\u5F00\u5185\u5BB9 ")])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("div",{staticClass:"panel highlight"},[e("h3",[e("span",{staticClass:"panel-icon"},[t._v("\u{1F527}")]),t._v(" \u5185\u5BB9\u6765\u6E90 ")]),e("p",[t._v(" \u81EA\u52A8\u8BFB\u53D6 "),e("code",[t._v("/vdocs/blog/*.md")]),t._v(" \u4E0E "),e("code",[t._v("/pattern/*.{md,js,html}")]),t._v(" \u5E76\u6CE8\u5165\u4E3B\u7AD9\u535A\u5BA2\u6D41\u3002 ")])])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("h3",[e("span",{staticClass:"panel-icon"},[t._v("\u{1F310}")]),t._v(" WASM \u6559\u5B66 ")])},function(){var t=this,e=t._self._c;return t._self._setupProxy,e("h3",[e("span",{staticClass:"panel-icon"},[t._v("\u{1F4CA}")]),t._v(" \u5FEB\u901F\u7EDF\u8BA1 ")])}],Ap=bo(Cp,Ep,xp,!1,null,"f8b79da2",null,null);const Op=Ap.exports,ia="\u6280\u672F\u6539\u53D8\u751F\u6D3B",$p="https://2yjs.top",Tp="\u6280\u672F\u6539\u53D8\u751F\u6D3B\uFF1A\u524D\u7AEF\u5DE5\u7A0B\u5E08 adminfoo \u7684\u6280\u672F\u81EA\u7559\u5730\uFF0C9 \u5E74\u4EE5\u4E0A\u7ECF\u9A8C\uFF0C\u8986\u76D6 Vue2/3\u3001React\u3001Electron\u3001HarmonyOS\uFF0C\u5305\u542B AI \u5BF9\u8BDD\u3001\u535A\u5BA2\u4E0E\u6D4F\u89C8\u5668\u5B9E\u9A8C\u3002";function te(t,e,r,n){let i=document.head.querySelector(t);i||(i=document.createElement("meta"),i.setAttribute(e,r),document.head.appendChild(i)),i.setAttribute("content",n)}function Pp(t){let e=document.head.querySelector('link[rel="canonical"]');e||(e=document.createElement("link"),e.setAttribute("rel","canonical"),document.head.appendChild(e)),e.setAttribute("href",t)}function Ip(t={}){const e=t.title?`${t.title} \xB7 ${ia}`:ia,r=t.description||Tp,n=encodeURI(`${$p}${t.path||"/"}`);document.title=e,te('meta[name="description"]',"name","description",r),te('meta[property="og:title"]',"property","og:title",e),te('meta[property="og:description"]',"property","og:description",r),te('meta[property="og:url"]',"property","og:url",n),te('meta[name="twitter:title"]',"name","twitter:title",e),te('meta[name="twitter:description"]',"name","twitter:description",r),Pp(n)}H.use(Mo);const zo=new Mo({mode:"history",base:"/",routes:[{path:"/",name:"home",alias:"/ai-chat",component:()=>St(()=>import("./AiChatView.ada7d3c9.js"),["assets/AiChatView.ada7d3c9.js","assets/markdown.0a027e93.js","assets/AiChatView.1d6f90bc.css"]),meta:{title:"AI Chat",description:"\u4E0E\u672C\u7AD9 AI \u52A9\u624B\u5BF9\u8BDD\uFF0C\u4E86\u89E3\u524D\u7AEF\u5DE5\u7A0B\u5E08 adminfoo \u7684\u7ECF\u5386\u3001\u6280\u672F\u6808\u4E0E\u9879\u76EE\u7ECF\u9A8C\u3002"}},{path:"/blog",name:"blog",component:Op,meta:{title:"\u535A\u5BA2",description:"\u524D\u7AEF\u5DE5\u7A0B\u5316\u4E0E\u8DE8\u7AEF\u5B9E\u8DF5\u7B14\u8BB0\uFF1AVue\u3001React\u3001TypeScript\u3001Electron\u3001HarmonyOS\u3002"}},{path:"/about",name:"about",component:()=>St(()=>import("./AboutView.011745c4.js"),["assets/AboutView.011745c4.js","assets/AboutView.bd7094b6.css"]),meta:{title:"About",description:"adminfoo \u7684\u7B80\u5386\uFF1A9 \u5E74\u4EE5\u4E0A\u524D\u7AEF\u7ECF\u9A8C\uFF0CVue2/3\u3001React\u3001Electron\u3001HarmonyOS\uFF0Cbase \u53A6\u95E8\uFF0C\u6B63\u5728\u5BFB\u627E\u524D\u7AEF\u5C97\u4F4D\u673A\u4F1A\u3002"}},{path:"/blog/:slug",name:"blog-detail",component:()=>St(()=>import("./BlogDetailView.84cfcf1e.js"),["assets/BlogDetailView.84cfcf1e.js","assets/markdown.0a027e93.js","assets/BlogDetailView.1aecdc43.css"])},{path:"/tic-tac-toe",name:"tic-tac-toe",component:()=>St(()=>import("./TicTacToeView.8dc862be.js"),["assets/TicTacToeView.8dc862be.js","assets/TicTacToeView.168a724c.css"]),meta:{title:"Game",description:"\u4E95\u5B57\u68CB\u5C0F\u6E38\u620F\uFF1A\u524D\u7AEF\u72B6\u6001\u7BA1\u7406\u4E0E\u4EA4\u4E92\u903B\u8F91\u793A\u4F8B\u3002"}},{path:"/wasm",name:"wasm",component:()=>St(()=>import("./WasmView.ea135d06.js"),["assets/WasmView.ea135d06.js","assets/WasmView.664fd380.css"]),meta:{title:"WASM \u6559\u5B66",description:"WebAssembly \u5165\u95E8\u6559\u7A0B\uFF1A\u4E8C\u8FDB\u5236\u7ED3\u6784\u3001WAT \u8BED\u6CD5\u3001JS \u8C03\u7528\u3001\u7EBF\u6027\u5185\u5B58\u4E0E\u6027\u80FD\u5B9E\u9A8C\u3002"}},{path:"/canvas",name:"canvas",component:()=>St(()=>import("./CanvasView.d8088261.js"),["assets/CanvasView.d8088261.js","assets/CanvasView.66b274a8.css"]),meta:{title:"Canvas",description:"Canvas \u56FE\u5F62\u4E0E\u52A8\u753B\u5B9E\u9A8C\uFF1A\u7ED8\u5236\u3001\u7C92\u5B50\u4E0E\u4EA4\u4E92\u6548\u679C\u3002"}},{path:"/three",name:"three",component:()=>St(()=>import("./ThreeView.8dcf0c1c.js"),["assets/ThreeView.8dcf0c1c.js","assets/ThreeView.d9b7aeab.css"]),meta:{title:"3D",description:"Three.js \u4E09\u7EF4\u573A\u666F\u5B9E\u9A8C\uFF1A\u6A21\u578B\u3001\u6750\u8D28\u4E0E\u5149\u7167\u6548\u679C\u3002"}},{path:"/pretext",name:"pretext",component:()=>St(()=>import("./PretextView.12a2542f.js"),["assets/PretextView.12a2542f.js","assets/PretextView.90911f71.css"]),meta:{title:"Pretext",description:"\u6587\u672C\u6392\u7248\u5B9E\u9A8C\uFF1A\u57FA\u4E8E pretext \u7684\u6392\u7248\u4E0E\u6E32\u67D3\u6548\u679C\u5C55\u793A\u3002"}}]});zo.afterEach(t=>{const e=t.meta||{};Ip({title:e.title,description:e.description,path:t.path})});H.use(Uf);new H({router:zo,pinia:Bf(),render:t=>t(Gf)}).$mount("#app");export{H as V,kp as __vite_legacy_guard,fs as a,Dp as b,Rp as c,Fp as d,bo as e,Ip as f,Lp as g,wp as h,gn as n,jp as o,zo as r,hs as w};
