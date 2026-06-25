var wx=a=>{throw TypeError(a)};var Rx=(a,e,n)=>e.has(a)||wx("Cannot "+n);var xl=(a,e,n)=>(Rx(a,e,"read from private field"),n?n.call(a):e.get(a)),Cx=(a,e,n)=>e.has(a)?wx("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(a):e.set(a,n),Dx=(a,e,n,s)=>(Rx(a,e,"write to private field"),s?s.call(a,n):e.set(a,n),n);function QM(a,e){for(var n=0;n<e.length;n++){const s=e[n];if(typeof s!="string"&&!Array.isArray(s)){for(const l in s)if(l!=="default"&&!(l in a)){const c=Object.getOwnPropertyDescriptor(s,l);c&&Object.defineProperty(a,l,c.get?c:{enumerable:!0,get:()=>s[l]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function n(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=n(l);fetch(l.href,c)}})();function JM(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var _d={exports:{}},vl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Nx;function $M(){if(Nx)return vl;Nx=1;var a=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function n(s,l,c){var u=null;if(c!==void 0&&(u=""+c),l.key!==void 0&&(u=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:a,type:s,key:u,ref:l!==void 0?l:null,props:c}}return vl.Fragment=e,vl.jsx=n,vl.jsxs=n,vl}var Lx;function e1(){return Lx||(Lx=1,_d.exports=$M()),_d.exports}var R=e1(),xd={exports:{}},rt={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ux;function t1(){if(Ux)return rt;Ux=1;var a=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),u=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),g=Symbol.iterator;function S(H){return H===null||typeof H!="object"?null:(H=g&&H[g]||H["@@iterator"],typeof H=="function"?H:null)}var M={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,v={};function y(H,K,ye){this.props=H,this.context=K,this.refs=v,this.updater=ye||M}y.prototype.isReactComponent={},y.prototype.setState=function(H,K){if(typeof H!="object"&&typeof H!="function"&&H!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,H,K,"setState")},y.prototype.forceUpdate=function(H){this.updater.enqueueForceUpdate(this,H,"forceUpdate")};function A(){}A.prototype=y.prototype;function N(H,K,ye){this.props=H,this.context=K,this.refs=v,this.updater=ye||M}var C=N.prototype=new A;C.constructor=N,E(C,y.prototype),C.isPureReactComponent=!0;var I=Array.isArray;function U(){}var z={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function F(H,K,ye){var ee=ye.ref;return{$$typeof:a,type:H,key:K,ref:ee!==void 0?ee:null,props:ye}}function X(H,K){return F(H.type,K,H.props)}function B(H){return typeof H=="object"&&H!==null&&H.$$typeof===a}function j(H){var K={"=":"=0",":":"=2"};return"$"+H.replace(/[=:]/g,function(ye){return K[ye]})}var ie=/\/+/g;function ae(H,K){return typeof H=="object"&&H!==null&&H.key!=null?j(""+H.key):K.toString(36)}function V(H){switch(H.status){case"fulfilled":return H.value;case"rejected":throw H.reason;default:switch(typeof H.status=="string"?H.then(U,U):(H.status="pending",H.then(function(K){H.status==="pending"&&(H.status="fulfilled",H.value=K)},function(K){H.status==="pending"&&(H.status="rejected",H.reason=K)})),H.status){case"fulfilled":return H.value;case"rejected":throw H.reason}}throw H}function O(H,K,ye,ee,Ee){var te=typeof H;(te==="undefined"||te==="boolean")&&(H=null);var se=!1;if(H===null)se=!0;else switch(te){case"bigint":case"string":case"number":se=!0;break;case"object":switch(H.$$typeof){case a:case e:se=!0;break;case _:return se=H._init,O(se(H._payload),K,ye,ee,Ee)}}if(se)return Ee=Ee(H),se=ee===""?"."+ae(H,0):ee,I(Ee)?(ye="",se!=null&&(ye=se.replace(ie,"$&/")+"/"),O(Ee,K,ye,"",function(Ke){return Ke})):Ee!=null&&(B(Ee)&&(Ee=X(Ee,ye+(Ee.key==null||H&&H.key===Ee.key?"":(""+Ee.key).replace(ie,"$&/")+"/")+se)),K.push(Ee)),1;se=0;var me=ee===""?".":ee+":";if(I(H))for(var Ae=0;Ae<H.length;Ae++)ee=H[Ae],te=me+ae(ee,Ae),se+=O(ee,K,ye,te,Ee);else if(Ae=S(H),typeof Ae=="function")for(H=Ae.call(H),Ae=0;!(ee=H.next()).done;)ee=ee.value,te=me+ae(ee,Ae++),se+=O(ee,K,ye,te,Ee);else if(te==="object"){if(typeof H.then=="function")return O(V(H),K,ye,ee,Ee);throw K=String(H),Error("Objects are not valid as a React child (found: "+(K==="[object Object]"?"object with keys {"+Object.keys(H).join(", ")+"}":K)+"). If you meant to render a collection of children, use an array instead.")}return se}function G(H,K,ye){if(H==null)return H;var ee=[],Ee=0;return O(H,ee,"","",function(te){return K.call(ye,te,Ee++)}),ee}function $(H){if(H._status===-1){var K=H._result;K=K(),K.then(function(ye){(H._status===0||H._status===-1)&&(H._status=1,H._result=ye)},function(ye){(H._status===0||H._status===-1)&&(H._status=2,H._result=ye)}),H._status===-1&&(H._status=0,H._result=K)}if(H._status===1)return H._result.default;throw H._result}var he=typeof reportError=="function"?reportError:function(H){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var K=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof H=="object"&&H!==null&&typeof H.message=="string"?String(H.message):String(H),error:H});if(!window.dispatchEvent(K))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",H);return}console.error(H)},ge={map:G,forEach:function(H,K,ye){G(H,function(){K.apply(this,arguments)},ye)},count:function(H){var K=0;return G(H,function(){K++}),K},toArray:function(H){return G(H,function(K){return K})||[]},only:function(H){if(!B(H))throw Error("React.Children.only expected to receive a single React element child.");return H}};return rt.Activity=x,rt.Children=ge,rt.Component=y,rt.Fragment=n,rt.Profiler=l,rt.PureComponent=N,rt.StrictMode=s,rt.Suspense=m,rt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=z,rt.__COMPILER_RUNTIME={__proto__:null,c:function(H){return z.H.useMemoCache(H)}},rt.cache=function(H){return function(){return H.apply(null,arguments)}},rt.cacheSignal=function(){return null},rt.cloneElement=function(H,K,ye){if(H==null)throw Error("The argument must be a React element, but you passed "+H+".");var ee=E({},H.props),Ee=H.key;if(K!=null)for(te in K.key!==void 0&&(Ee=""+K.key),K)!T.call(K,te)||te==="key"||te==="__self"||te==="__source"||te==="ref"&&K.ref===void 0||(ee[te]=K[te]);var te=arguments.length-2;if(te===1)ee.children=ye;else if(1<te){for(var se=Array(te),me=0;me<te;me++)se[me]=arguments[me+2];ee.children=se}return F(H.type,Ee,ee)},rt.createContext=function(H){return H={$$typeof:u,_currentValue:H,_currentValue2:H,_threadCount:0,Provider:null,Consumer:null},H.Provider=H,H.Consumer={$$typeof:c,_context:H},H},rt.createElement=function(H,K,ye){var ee,Ee={},te=null;if(K!=null)for(ee in K.key!==void 0&&(te=""+K.key),K)T.call(K,ee)&&ee!=="key"&&ee!=="__self"&&ee!=="__source"&&(Ee[ee]=K[ee]);var se=arguments.length-2;if(se===1)Ee.children=ye;else if(1<se){for(var me=Array(se),Ae=0;Ae<se;Ae++)me[Ae]=arguments[Ae+2];Ee.children=me}if(H&&H.defaultProps)for(ee in se=H.defaultProps,se)Ee[ee]===void 0&&(Ee[ee]=se[ee]);return F(H,te,Ee)},rt.createRef=function(){return{current:null}},rt.forwardRef=function(H){return{$$typeof:d,render:H}},rt.isValidElement=B,rt.lazy=function(H){return{$$typeof:_,_payload:{_status:-1,_result:H},_init:$}},rt.memo=function(H,K){return{$$typeof:p,type:H,compare:K===void 0?null:K}},rt.startTransition=function(H){var K=z.T,ye={};z.T=ye;try{var ee=H(),Ee=z.S;Ee!==null&&Ee(ye,ee),typeof ee=="object"&&ee!==null&&typeof ee.then=="function"&&ee.then(U,he)}catch(te){he(te)}finally{K!==null&&ye.types!==null&&(K.types=ye.types),z.T=K}},rt.unstable_useCacheRefresh=function(){return z.H.useCacheRefresh()},rt.use=function(H){return z.H.use(H)},rt.useActionState=function(H,K,ye){return z.H.useActionState(H,K,ye)},rt.useCallback=function(H,K){return z.H.useCallback(H,K)},rt.useContext=function(H){return z.H.useContext(H)},rt.useDebugValue=function(){},rt.useDeferredValue=function(H,K){return z.H.useDeferredValue(H,K)},rt.useEffect=function(H,K){return z.H.useEffect(H,K)},rt.useEffectEvent=function(H){return z.H.useEffectEvent(H)},rt.useId=function(){return z.H.useId()},rt.useImperativeHandle=function(H,K,ye){return z.H.useImperativeHandle(H,K,ye)},rt.useInsertionEffect=function(H,K){return z.H.useInsertionEffect(H,K)},rt.useLayoutEffect=function(H,K){return z.H.useLayoutEffect(H,K)},rt.useMemo=function(H,K){return z.H.useMemo(H,K)},rt.useOptimistic=function(H,K){return z.H.useOptimistic(H,K)},rt.useReducer=function(H,K,ye){return z.H.useReducer(H,K,ye)},rt.useRef=function(H){return z.H.useRef(H)},rt.useState=function(H){return z.H.useState(H)},rt.useSyncExternalStore=function(H,K,ye){return z.H.useSyncExternalStore(H,K,ye)},rt.useTransition=function(){return z.H.useTransition()},rt.version="19.2.7",rt}var Ox;function mm(){return Ox||(Ox=1,xd.exports=t1()),xd.exports}var pe=mm();const Nl=JM(pe),n1=QM({__proto__:null,default:Nl},[pe]);var vd={exports:{}},yl={},yd={exports:{}},Sd={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Px;function i1(){return Px||(Px=1,(function(a){function e(O,G){var $=O.length;O.push(G);e:for(;0<$;){var he=$-1>>>1,ge=O[he];if(0<l(ge,G))O[he]=G,O[$]=ge,$=he;else break e}}function n(O){return O.length===0?null:O[0]}function s(O){if(O.length===0)return null;var G=O[0],$=O.pop();if($!==G){O[0]=$;e:for(var he=0,ge=O.length,H=ge>>>1;he<H;){var K=2*(he+1)-1,ye=O[K],ee=K+1,Ee=O[ee];if(0>l(ye,$))ee<ge&&0>l(Ee,ye)?(O[he]=Ee,O[ee]=$,he=ee):(O[he]=ye,O[K]=$,he=K);else if(ee<ge&&0>l(Ee,$))O[he]=Ee,O[ee]=$,he=ee;else break e}}return G}function l(O,G){var $=O.sortIndex-G.sortIndex;return $!==0?$:O.id-G.id}if(a.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;a.unstable_now=function(){return c.now()}}else{var u=Date,d=u.now();a.unstable_now=function(){return u.now()-d}}var m=[],p=[],_=1,x=null,g=3,S=!1,M=!1,E=!1,v=!1,y=typeof setTimeout=="function"?setTimeout:null,A=typeof clearTimeout=="function"?clearTimeout:null,N=typeof setImmediate<"u"?setImmediate:null;function C(O){for(var G=n(p);G!==null;){if(G.callback===null)s(p);else if(G.startTime<=O)s(p),G.sortIndex=G.expirationTime,e(m,G);else break;G=n(p)}}function I(O){if(E=!1,C(O),!M)if(n(m)!==null)M=!0,U||(U=!0,j());else{var G=n(p);G!==null&&V(I,G.startTime-O)}}var U=!1,z=-1,T=5,F=-1;function X(){return v?!0:!(a.unstable_now()-F<T)}function B(){if(v=!1,U){var O=a.unstable_now();F=O;var G=!0;try{e:{M=!1,E&&(E=!1,A(z),z=-1),S=!0;var $=g;try{t:{for(C(O),x=n(m);x!==null&&!(x.expirationTime>O&&X());){var he=x.callback;if(typeof he=="function"){x.callback=null,g=x.priorityLevel;var ge=he(x.expirationTime<=O);if(O=a.unstable_now(),typeof ge=="function"){x.callback=ge,C(O),G=!0;break t}x===n(m)&&s(m),C(O)}else s(m);x=n(m)}if(x!==null)G=!0;else{var H=n(p);H!==null&&V(I,H.startTime-O),G=!1}}break e}finally{x=null,g=$,S=!1}G=void 0}}finally{G?j():U=!1}}}var j;if(typeof N=="function")j=function(){N(B)};else if(typeof MessageChannel<"u"){var ie=new MessageChannel,ae=ie.port2;ie.port1.onmessage=B,j=function(){ae.postMessage(null)}}else j=function(){y(B,0)};function V(O,G){z=y(function(){O(a.unstable_now())},G)}a.unstable_IdlePriority=5,a.unstable_ImmediatePriority=1,a.unstable_LowPriority=4,a.unstable_NormalPriority=3,a.unstable_Profiling=null,a.unstable_UserBlockingPriority=2,a.unstable_cancelCallback=function(O){O.callback=null},a.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<O?Math.floor(1e3/O):5},a.unstable_getCurrentPriorityLevel=function(){return g},a.unstable_next=function(O){switch(g){case 1:case 2:case 3:var G=3;break;default:G=g}var $=g;g=G;try{return O()}finally{g=$}},a.unstable_requestPaint=function(){v=!0},a.unstable_runWithPriority=function(O,G){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var $=g;g=O;try{return G()}finally{g=$}},a.unstable_scheduleCallback=function(O,G,$){var he=a.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?he+$:he):$=he,O){case 1:var ge=-1;break;case 2:ge=250;break;case 5:ge=1073741823;break;case 4:ge=1e4;break;default:ge=5e3}return ge=$+ge,O={id:_++,callback:G,priorityLevel:O,startTime:$,expirationTime:ge,sortIndex:-1},$>he?(O.sortIndex=$,e(p,O),n(m)===null&&O===n(p)&&(E?(A(z),z=-1):E=!0,V(I,$-he))):(O.sortIndex=ge,e(m,O),M||S||(M=!0,U||(U=!0,j()))),O},a.unstable_shouldYield=X,a.unstable_wrapCallback=function(O){var G=g;return function(){var $=g;g=G;try{return O.apply(this,arguments)}finally{g=$}}}})(Sd)),Sd}var zx;function a1(){return zx||(zx=1,yd.exports=i1()),yd.exports}var bd={exports:{}},Hn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ix;function s1(){if(Ix)return Hn;Ix=1;var a=mm();function e(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)p+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var s={d:{f:n,r:function(){throw Error(e(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,_){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:x==null?null:""+x,children:m,containerInfo:p,implementation:_}}var u=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Hn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Hn.createPortal=function(m,p){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(e(299));return c(m,p,null,_)},Hn.flushSync=function(m){var p=u.T,_=s.p;try{if(u.T=null,s.p=2,m)return m()}finally{u.T=p,s.p=_,s.d.f()}},Hn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},Hn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Hn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var _=p.as,x=d(_,p.crossOrigin),g=typeof p.integrity=="string"?p.integrity:void 0,S=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;_==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:x,integrity:g,fetchPriority:S}):_==="script"&&s.d.X(m,{crossOrigin:x,integrity:g,fetchPriority:S,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Hn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var _=d(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},Hn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var _=p.as,x=d(_,p.crossOrigin);s.d.L(m,_,{crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Hn.preloadModule=function(m,p){if(typeof m=="string")if(p){var _=d(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},Hn.requestFormReset=function(m){s.d.r(m)},Hn.unstable_batchedUpdates=function(m,p){return m(p)},Hn.useFormState=function(m,p,_){return u.H.useFormState(m,p,_)},Hn.useFormStatus=function(){return u.H.useHostTransitionStatus()},Hn.version="19.2.7",Hn}var Fx;function Ny(){if(Fx)return bd.exports;Fx=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(e){console.error(e)}}return a(),bd.exports=s1(),bd.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bx;function r1(){if(Bx)return yl;Bx=1;var a=a1(),e=mm(),n=Ny();function s(t){var i="https://react.dev/errors/"+t;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)i+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+t+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var i=t,r=t;if(t.alternate)for(;i.return;)i=i.return;else{t=i;do i=t,(i.flags&4098)!==0&&(r=i.return),t=i.return;while(t)}return i.tag===3?r:null}function u(t){if(t.tag===13){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function d(t){if(t.tag===31){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(s(188))}function p(t){var i=t.alternate;if(!i){if(i=c(t),i===null)throw Error(s(188));return i!==t?null:t}for(var r=t,o=i;;){var f=r.return;if(f===null)break;var h=f.alternate;if(h===null){if(o=f.return,o!==null){r=o;continue}break}if(f.child===h.child){for(h=f.child;h;){if(h===r)return m(f),t;if(h===o)return m(f),i;h=h.sibling}throw Error(s(188))}if(r.return!==o.return)r=f,o=h;else{for(var b=!1,L=f.child;L;){if(L===r){b=!0,r=f,o=h;break}if(L===o){b=!0,o=f,r=h;break}L=L.sibling}if(!b){for(L=h.child;L;){if(L===r){b=!0,r=h,o=f;break}if(L===o){b=!0,o=h,r=f;break}L=L.sibling}if(!b)throw Error(s(189))}}if(r.alternate!==o)throw Error(s(190))}if(r.tag!==3)throw Error(s(188));return r.stateNode.current===r?t:i}function _(t){var i=t.tag;if(i===5||i===26||i===27||i===6)return t;for(t=t.child;t!==null;){if(i=_(t),i!==null)return i;t=t.sibling}return null}var x=Object.assign,g=Symbol.for("react.element"),S=Symbol.for("react.transitional.element"),M=Symbol.for("react.portal"),E=Symbol.for("react.fragment"),v=Symbol.for("react.strict_mode"),y=Symbol.for("react.profiler"),A=Symbol.for("react.consumer"),N=Symbol.for("react.context"),C=Symbol.for("react.forward_ref"),I=Symbol.for("react.suspense"),U=Symbol.for("react.suspense_list"),z=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),F=Symbol.for("react.activity"),X=Symbol.for("react.memo_cache_sentinel"),B=Symbol.iterator;function j(t){return t===null||typeof t!="object"?null:(t=B&&t[B]||t["@@iterator"],typeof t=="function"?t:null)}var ie=Symbol.for("react.client.reference");function ae(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===ie?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case E:return"Fragment";case y:return"Profiler";case v:return"StrictMode";case I:return"Suspense";case U:return"SuspenseList";case F:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case M:return"Portal";case N:return t.displayName||"Context";case A:return(t._context.displayName||"Context")+".Consumer";case C:var i=t.render;return t=t.displayName,t||(t=i.displayName||i.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case z:return i=t.displayName||null,i!==null?i:ae(t.type)||"Memo";case T:i=t._payload,t=t._init;try{return ae(t(i))}catch{}}return null}var V=Array.isArray,O=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,G=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,$={pending:!1,data:null,method:null,action:null},he=[],ge=-1;function H(t){return{current:t}}function K(t){0>ge||(t.current=he[ge],he[ge]=null,ge--)}function ye(t,i){ge++,he[ge]=t.current,t.current=i}var ee=H(null),Ee=H(null),te=H(null),se=H(null);function me(t,i){switch(ye(te,i),ye(Ee,t),ye(ee,null),i.nodeType){case 9:case 11:t=(t=i.documentElement)&&(t=t.namespaceURI)?K_(t):0;break;default:if(t=i.tagName,i=i.namespaceURI)i=K_(i),t=Q_(i,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}K(ee),ye(ee,t)}function Ae(){K(ee),K(Ee),K(te)}function Ke(t){t.memoizedState!==null&&ye(se,t);var i=ee.current,r=Q_(i,t.type);i!==r&&(ye(Ee,t),ye(ee,r))}function Ye(t){Ee.current===t&&(K(ee),K(Ee)),se.current===t&&(K(se),pl._currentValue=$)}var Dt,ut;function mt(t){if(Dt===void 0)try{throw Error()}catch(r){var i=r.stack.trim().match(/\n( *(at )?)/);Dt=i&&i[1]||"",ut=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Dt+t+ut}var Pt=!1;function ft(t,i){if(!t||Pt)return"";Pt=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(i){var Te=function(){throw Error()};if(Object.defineProperty(Te.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Te,[])}catch(de){var fe=de}Reflect.construct(t,[],Te)}else{try{Te.call()}catch(de){fe=de}t.call(Te.prototype)}}else{try{throw Error()}catch(de){fe=de}(Te=t())&&typeof Te.catch=="function"&&Te.catch(function(){})}}catch(de){if(de&&fe&&typeof de.stack=="string")return[de.stack,fe.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var f=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");f&&f.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),b=h[0],L=h[1];if(b&&L){var k=b.split(`
`),oe=L.split(`
`);for(f=o=0;o<k.length&&!k[o].includes("DetermineComponentFrameRoot");)o++;for(;f<oe.length&&!oe[f].includes("DetermineComponentFrameRoot");)f++;if(o===k.length||f===oe.length)for(o=k.length-1,f=oe.length-1;1<=o&&0<=f&&k[o]!==oe[f];)f--;for(;1<=o&&0<=f;o--,f--)if(k[o]!==oe[f]){if(o!==1||f!==1)do if(o--,f--,0>f||k[o]!==oe[f]){var ve=`
`+k[o].replace(" at new "," at ");return t.displayName&&ve.includes("<anonymous>")&&(ve=ve.replace("<anonymous>",t.displayName)),ve}while(1<=o&&0<=f);break}}}finally{Pt=!1,Error.prepareStackTrace=r}return(r=t?t.displayName||t.name:"")?mt(r):""}function fn(t,i){switch(t.tag){case 26:case 27:case 5:return mt(t.type);case 16:return mt("Lazy");case 13:return t.child!==i&&i!==null?mt("Suspense Fallback"):mt("Suspense");case 19:return mt("SuspenseList");case 0:case 15:return ft(t.type,!1);case 11:return ft(t.type.render,!1);case 1:return ft(t.type,!0);case 31:return mt("Activity");default:return""}}function Qt(t){try{var i="",r=null;do i+=fn(t,r),r=t,t=t.return;while(t);return i}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Nn=Object.prototype.hasOwnProperty,Y=a.unstable_scheduleCallback,sn=a.unstable_cancelCallback,gt=a.unstable_shouldYield,Vt=a.unstable_requestPaint,De=a.unstable_now,en=a.unstable_getCurrentPriorityLevel,P=a.unstable_ImmediatePriority,w=a.unstable_UserBlockingPriority,ne=a.unstable_NormalPriority,Me=a.unstable_LowPriority,Re=a.unstable_IdlePriority,Ne=a.log,Pe=a.unstable_setDisableYieldValue,_e=null,xe=null;function ze(t){if(typeof Ne=="function"&&Pe(t),xe&&typeof xe.setStrictMode=="function")try{xe.setStrictMode(_e,t)}catch{}}var Ie=Math.clz32?Math.clz32:at,Ue=Math.log,Le=Math.LN2;function at(t){return t>>>=0,t===0?32:31-(Ue(t)/Le|0)|0}var st=256,_t=262144,W=4194304;function Ce(t){var i=t&42;if(i!==0)return i;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Se(t,i,r){var o=t.pendingLanes;if(o===0)return 0;var f=0,h=t.suspendedLanes,b=t.pingedLanes;t=t.warmLanes;var L=o&134217727;return L!==0?(o=L&~h,o!==0?f=Ce(o):(b&=L,b!==0?f=Ce(b):r||(r=L&~t,r!==0&&(f=Ce(r))))):(L=o&~h,L!==0?f=Ce(L):b!==0?f=Ce(b):r||(r=o&~t,r!==0&&(f=Ce(r)))),f===0?0:i!==0&&i!==f&&(i&h)===0&&(h=f&-f,r=i&-i,h>=r||h===32&&(r&4194048)!==0)?i:f}function He(t,i){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&i)===0}function Oe(t,i){switch(t){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function we(){var t=W;return W<<=1,(W&62914560)===0&&(W=4194304),t}function qe(t){for(var i=[],r=0;31>r;r++)i.push(t);return i}function it(t,i){t.pendingLanes|=i,i!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function rn(t,i,r,o,f,h){var b=t.pendingLanes;t.pendingLanes=r,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=r,t.entangledLanes&=r,t.errorRecoveryDisabledLanes&=r,t.shellSuspendCounter=0;var L=t.entanglements,k=t.expirationTimes,oe=t.hiddenUpdates;for(r=b&~r;0<r;){var ve=31-Ie(r),Te=1<<ve;L[ve]=0,k[ve]=-1;var fe=oe[ve];if(fe!==null)for(oe[ve]=null,ve=0;ve<fe.length;ve++){var de=fe[ve];de!==null&&(de.lane&=-536870913)}r&=~Te}o!==0&&Nt(t,o,0),h!==0&&f===0&&t.tag!==0&&(t.suspendedLanes|=h&~(b&~i))}function Nt(t,i,r){t.pendingLanes|=i,t.suspendedLanes&=~i;var o=31-Ie(i);t.entangledLanes|=i,t.entanglements[o]=t.entanglements[o]|1073741824|r&261930}function vi(t,i){var r=t.entangledLanes|=i;for(t=t.entanglements;r;){var o=31-Ie(r),f=1<<o;f&i|t[o]&i&&(t[o]|=i),r&=~f}}function si(t,i){var r=i&-i;return r=(r&42)!==0?1:Rs(r),(r&(t.suspendedLanes|i))!==0?0:r}function Rs(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Ao(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function wo(){var t=G.p;return t!==0?t:(t=window.event,t===void 0?32:yx(t.type))}function Ro(t,i){var r=G.p;try{return G.p=t,i()}finally{G.p=r}}var Fn=Math.random().toString(36).slice(2),hn="__reactFiber$"+Fn,Ln="__reactProps$"+Fn,ra="__reactContainer$"+Fn,Pa="__reactEvents$"+Fn,Yl="__reactListeners$"+Fn,pr="__reactHandles$"+Fn,Co="__reactResources$"+Fn,za="__reactMarker$"+Fn;function Do(t){delete t[hn],delete t[Ln],delete t[Pa],delete t[Yl],delete t[pr]}function Ia(t){var i=t[hn];if(i)return i;for(var r=t.parentNode;r;){if(i=r[ra]||r[hn]){if(r=i.alternate,i.child!==null||r!==null&&r.child!==null)for(t=ax(t);t!==null;){if(r=t[hn])return r;t=ax(t)}return i}t=r,r=t.parentNode}return null}function Fa(t){if(t=t[hn]||t[ra]){var i=t.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return t}return null}function Cs(t){var i=t.tag;if(i===5||i===26||i===27||i===6)return t.stateNode;throw Error(s(33))}function Ba(t){var i=t[Co];return i||(i=t[Co]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function mn(t){t[za]=!0}var Zl=new Set,D={};function Z(t,i){ue(t,i),ue(t+"Capture",i)}function ue(t,i){for(D[t]=i,t=0;t<i.length;t++)Zl.add(i[t])}var le=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ce={},Be={};function ke(t){return Nn.call(Be,t)?!0:Nn.call(ce,t)?!1:le.test(t)?Be[t]=!0:(ce[t]=!0,!1)}function Fe(t,i,r){if(ke(i))if(r===null)t.removeAttribute(i);else{switch(typeof r){case"undefined":case"function":case"symbol":t.removeAttribute(i);return;case"boolean":var o=i.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(i);return}}t.setAttribute(i,""+r)}}function Xe(t,i,r){if(r===null)t.removeAttribute(i);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(i);return}t.setAttribute(i,""+r)}}function je(t,i,r,o){if(o===null)t.removeAttribute(r);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(r);return}t.setAttributeNS(i,r,""+o)}}function Je(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function lt(t){var i=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Qe(t,i,r){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,i);if(!t.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var f=o.get,h=o.set;return Object.defineProperty(t,i,{configurable:!0,get:function(){return f.call(this)},set:function(b){r=""+b,h.call(this,b)}}),Object.defineProperty(t,i,{enumerable:o.enumerable}),{getValue:function(){return r},setValue:function(b){r=""+b},stopTracking:function(){t._valueTracker=null,delete t[i]}}}}function wt(t){if(!t._valueTracker){var i=lt(t)?"checked":"value";t._valueTracker=Qe(t,i,""+t[i])}}function tn(t){if(!t)return!1;var i=t._valueTracker;if(!i)return!0;var r=i.getValue(),o="";return t&&(o=lt(t)?t.checked?"true":"false":t.value),t=o,t!==r?(i.setValue(t),!0):!1}function Zt(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var zt=/[\n"\\]/g;function It(t){return t.replace(zt,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function Ve(t,i,r,o,f,h,b,L){t.name="",b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?t.type=b:t.removeAttribute("type"),i!=null?b==="number"?(i===0&&t.value===""||t.value!=i)&&(t.value=""+Je(i)):t.value!==""+Je(i)&&(t.value=""+Je(i)):b!=="submit"&&b!=="reset"||t.removeAttribute("value"),i!=null?xt(t,b,Je(i)):r!=null?xt(t,b,Je(r)):o!=null&&t.removeAttribute("value"),f==null&&h!=null&&(t.defaultChecked=!!h),f!=null&&(t.checked=f&&typeof f!="function"&&typeof f!="symbol"),L!=null&&typeof L!="function"&&typeof L!="symbol"&&typeof L!="boolean"?t.name=""+Je(L):t.removeAttribute("name")}function Bn(t,i,r,o,f,h,b,L){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(t.type=h),i!=null||r!=null){if(!(h!=="submit"&&h!=="reset"||i!=null)){wt(t);return}r=r!=null?""+Je(r):"",i=i!=null?""+Je(i):r,L||i===t.value||(t.value=i),t.defaultValue=i}o=o??f,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=L?t.checked:!!o,t.defaultChecked=!!o,b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"&&(t.name=b),wt(t)}function xt(t,i,r){i==="number"&&Zt(t.ownerDocument)===t||t.defaultValue===""+r||(t.defaultValue=""+r)}function bn(t,i,r,o){if(t=t.options,i){i={};for(var f=0;f<r.length;f++)i["$"+r[f]]=!0;for(r=0;r<t.length;r++)f=i.hasOwnProperty("$"+t[r].value),t[r].selected!==f&&(t[r].selected=f),f&&o&&(t[r].defaultSelected=!0)}else{for(r=""+Je(r),i=null,f=0;f<t.length;f++){if(t[f].value===r){t[f].selected=!0,o&&(t[f].defaultSelected=!0);return}i!==null||t[f].disabled||(i=t[f])}i!==null&&(i.selected=!0)}}function ri(t,i,r){if(i!=null&&(i=""+Je(i),i!==t.value&&(t.value=i),r==null)){t.defaultValue!==i&&(t.defaultValue=i);return}t.defaultValue=r!=null?""+Je(r):""}function Ni(t,i,r,o){if(i==null){if(o!=null){if(r!=null)throw Error(s(92));if(V(o)){if(1<o.length)throw Error(s(93));o=o[0]}r=o}r==null&&(r=""),i=r}r=Je(i),t.defaultValue=r,o=t.textContent,o===r&&o!==""&&o!==null&&(t.value=o),wt(t)}function oi(t,i){if(i){var r=t.firstChild;if(r&&r===t.lastChild&&r.nodeType===3){r.nodeValue=i;return}}t.textContent=i}var Ft=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function nn(t,i,r){var o=i.indexOf("--")===0;r==null||typeof r=="boolean"||r===""?o?t.setProperty(i,""):i==="float"?t.cssFloat="":t[i]="":o?t.setProperty(i,r):typeof r!="number"||r===0||Ft.has(i)?i==="float"?t.cssFloat=r:t[i]=(""+r).trim():t[i]=r+"px"}function Li(t,i,r){if(i!=null&&typeof i!="object")throw Error(s(62));if(t=t.style,r!=null){for(var o in r)!r.hasOwnProperty(o)||i!=null&&i.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var f in i)o=i[f],i.hasOwnProperty(f)&&r[f]!==o&&nn(t,f,o)}else for(var h in i)i.hasOwnProperty(h)&&nn(t,h,i[h])}function Ut(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Gi=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ha=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ds(t){return Ha.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function oa(){}var pf=null;function mf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var mr=null,gr=null;function Zm(t){var i=Fa(t);if(i&&(t=i.stateNode)){var r=t[Ln]||null;e:switch(t=i.stateNode,i.type){case"input":if(Ve(t,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name),i=r.name,r.type==="radio"&&i!=null){for(r=t;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll('input[name="'+It(""+i)+'"][type="radio"]'),i=0;i<r.length;i++){var o=r[i];if(o!==t&&o.form===t.form){var f=o[Ln]||null;if(!f)throw Error(s(90));Ve(o,f.value,f.defaultValue,f.defaultValue,f.checked,f.defaultChecked,f.type,f.name)}}for(i=0;i<r.length;i++)o=r[i],o.form===t.form&&tn(o)}break e;case"textarea":ri(t,r.value,r.defaultValue);break e;case"select":i=r.value,i!=null&&bn(t,!!r.multiple,i,!1)}}}var gf=!1;function Km(t,i,r){if(gf)return t(i,r);gf=!0;try{var o=t(i);return o}finally{if(gf=!1,(mr!==null||gr!==null)&&(zc(),mr&&(i=mr,t=gr,gr=mr=null,Zm(i),t)))for(i=0;i<t.length;i++)Zm(t[i])}}function No(t,i){var r=t.stateNode;if(r===null)return null;var o=r[Ln]||null;if(o===null)return null;r=o[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(r&&typeof r!="function")throw Error(s(231,i,typeof r));return r}var la=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),_f=!1;if(la)try{var Lo={};Object.defineProperty(Lo,"passive",{get:function(){_f=!0}}),window.addEventListener("test",Lo,Lo),window.removeEventListener("test",Lo,Lo)}catch{_f=!1}var Ga=null,xf=null,Kl=null;function Qm(){if(Kl)return Kl;var t,i=xf,r=i.length,o,f="value"in Ga?Ga.value:Ga.textContent,h=f.length;for(t=0;t<r&&i[t]===f[t];t++);var b=r-t;for(o=1;o<=b&&i[r-o]===f[h-o];o++);return Kl=f.slice(t,1<o?1-o:void 0)}function Ql(t){var i=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&i===13&&(t=13)):t=i,t===10&&(t=13),32<=t||t===13?t:0}function Jl(){return!0}function Jm(){return!1}function Kn(t){function i(r,o,f,h,b){this._reactName=r,this._targetInst=f,this.type=o,this.nativeEvent=h,this.target=b,this.currentTarget=null;for(var L in t)t.hasOwnProperty(L)&&(r=t[L],this[L]=r?r(h):h[L]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?Jl:Jm,this.isPropagationStopped=Jm,this}return x(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Jl)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Jl)},persist:function(){},isPersistent:Jl}),i}var Ns={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},$l=Kn(Ns),Uo=x({},Ns,{view:0,detail:0}),ZS=Kn(Uo),vf,yf,Oo,ec=x({},Uo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:bf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Oo&&(Oo&&t.type==="mousemove"?(vf=t.screenX-Oo.screenX,yf=t.screenY-Oo.screenY):yf=vf=0,Oo=t),vf)},movementY:function(t){return"movementY"in t?t.movementY:yf}}),$m=Kn(ec),KS=x({},ec,{dataTransfer:0}),QS=Kn(KS),JS=x({},Uo,{relatedTarget:0}),Sf=Kn(JS),$S=x({},Ns,{animationName:0,elapsedTime:0,pseudoElement:0}),eb=Kn($S),tb=x({},Ns,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),nb=Kn(tb),ib=x({},Ns,{data:0}),e0=Kn(ib),ab={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},sb={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},rb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ob(t){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(t):(t=rb[t])?!!i[t]:!1}function bf(){return ob}var lb=x({},Uo,{key:function(t){if(t.key){var i=ab[t.key]||t.key;if(i!=="Unidentified")return i}return t.type==="keypress"?(t=Ql(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?sb[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:bf,charCode:function(t){return t.type==="keypress"?Ql(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ql(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),cb=Kn(lb),ub=x({},ec,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),t0=Kn(ub),fb=x({},Uo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:bf}),hb=Kn(fb),db=x({},Ns,{propertyName:0,elapsedTime:0,pseudoElement:0}),pb=Kn(db),mb=x({},ec,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),gb=Kn(mb),_b=x({},Ns,{newState:0,oldState:0}),xb=Kn(_b),vb=[9,13,27,32],Mf=la&&"CompositionEvent"in window,Po=null;la&&"documentMode"in document&&(Po=document.documentMode);var yb=la&&"TextEvent"in window&&!Po,n0=la&&(!Mf||Po&&8<Po&&11>=Po),i0=" ",a0=!1;function s0(t,i){switch(t){case"keyup":return vb.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function r0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var _r=!1;function Sb(t,i){switch(t){case"compositionend":return r0(i);case"keypress":return i.which!==32?null:(a0=!0,i0);case"textInput":return t=i.data,t===i0&&a0?null:t;default:return null}}function bb(t,i){if(_r)return t==="compositionend"||!Mf&&s0(t,i)?(t=Qm(),Kl=xf=Ga=null,_r=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return n0&&i.locale!=="ko"?null:i.data;default:return null}}var Mb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function o0(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i==="input"?!!Mb[t.type]:i==="textarea"}function l0(t,i,r,o){mr?gr?gr.push(o):gr=[o]:mr=o,i=kc(i,"onChange"),0<i.length&&(r=new $l("onChange","change",null,r,o),t.push({event:r,listeners:i}))}var zo=null,Io=null;function Eb(t){j_(t,0)}function tc(t){var i=Cs(t);if(tn(i))return t}function c0(t,i){if(t==="change")return i}var u0=!1;if(la){var Ef;if(la){var Tf="oninput"in document;if(!Tf){var f0=document.createElement("div");f0.setAttribute("oninput","return;"),Tf=typeof f0.oninput=="function"}Ef=Tf}else Ef=!1;u0=Ef&&(!document.documentMode||9<document.documentMode)}function h0(){zo&&(zo.detachEvent("onpropertychange",d0),Io=zo=null)}function d0(t){if(t.propertyName==="value"&&tc(Io)){var i=[];l0(i,Io,t,mf(t)),Km(Eb,i)}}function Tb(t,i,r){t==="focusin"?(h0(),zo=i,Io=r,zo.attachEvent("onpropertychange",d0)):t==="focusout"&&h0()}function Ab(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return tc(Io)}function wb(t,i){if(t==="click")return tc(i)}function Rb(t,i){if(t==="input"||t==="change")return tc(i)}function Cb(t,i){return t===i&&(t!==0||1/t===1/i)||t!==t&&i!==i}var li=typeof Object.is=="function"?Object.is:Cb;function Fo(t,i){if(li(t,i))return!0;if(typeof t!="object"||t===null||typeof i!="object"||i===null)return!1;var r=Object.keys(t),o=Object.keys(i);if(r.length!==o.length)return!1;for(o=0;o<r.length;o++){var f=r[o];if(!Nn.call(i,f)||!li(t[f],i[f]))return!1}return!0}function p0(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function m0(t,i){var r=p0(t);t=0;for(var o;r;){if(r.nodeType===3){if(o=t+r.textContent.length,t<=i&&o>=i)return{node:r,offset:i-t};t=o}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=p0(r)}}function g0(t,i){return t&&i?t===i?!0:t&&t.nodeType===3?!1:i&&i.nodeType===3?g0(t,i.parentNode):"contains"in t?t.contains(i):t.compareDocumentPosition?!!(t.compareDocumentPosition(i)&16):!1:!1}function _0(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var i=Zt(t.document);i instanceof t.HTMLIFrameElement;){try{var r=typeof i.contentWindow.location.href=="string"}catch{r=!1}if(r)t=i.contentWindow;else break;i=Zt(t.document)}return i}function Af(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i&&(i==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||i==="textarea"||t.contentEditable==="true")}var Db=la&&"documentMode"in document&&11>=document.documentMode,xr=null,wf=null,Bo=null,Rf=!1;function x0(t,i,r){var o=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;Rf||xr==null||xr!==Zt(o)||(o=xr,"selectionStart"in o&&Af(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Bo&&Fo(Bo,o)||(Bo=o,o=kc(wf,"onSelect"),0<o.length&&(i=new $l("onSelect","select",null,i,r),t.push({event:i,listeners:o}),i.target=xr)))}function Ls(t,i){var r={};return r[t.toLowerCase()]=i.toLowerCase(),r["Webkit"+t]="webkit"+i,r["Moz"+t]="moz"+i,r}var vr={animationend:Ls("Animation","AnimationEnd"),animationiteration:Ls("Animation","AnimationIteration"),animationstart:Ls("Animation","AnimationStart"),transitionrun:Ls("Transition","TransitionRun"),transitionstart:Ls("Transition","TransitionStart"),transitioncancel:Ls("Transition","TransitionCancel"),transitionend:Ls("Transition","TransitionEnd")},Cf={},v0={};la&&(v0=document.createElement("div").style,"AnimationEvent"in window||(delete vr.animationend.animation,delete vr.animationiteration.animation,delete vr.animationstart.animation),"TransitionEvent"in window||delete vr.transitionend.transition);function Us(t){if(Cf[t])return Cf[t];if(!vr[t])return t;var i=vr[t],r;for(r in i)if(i.hasOwnProperty(r)&&r in v0)return Cf[t]=i[r];return t}var y0=Us("animationend"),S0=Us("animationiteration"),b0=Us("animationstart"),Nb=Us("transitionrun"),Lb=Us("transitionstart"),Ub=Us("transitioncancel"),M0=Us("transitionend"),E0=new Map,Df="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Df.push("scrollEnd");function Ui(t,i){E0.set(t,i),Z(i,[t])}var nc=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},yi=[],yr=0,Nf=0;function ic(){for(var t=yr,i=Nf=yr=0;i<t;){var r=yi[i];yi[i++]=null;var o=yi[i];yi[i++]=null;var f=yi[i];yi[i++]=null;var h=yi[i];if(yi[i++]=null,o!==null&&f!==null){var b=o.pending;b===null?f.next=f:(f.next=b.next,b.next=f),o.pending=f}h!==0&&T0(r,f,h)}}function ac(t,i,r,o){yi[yr++]=t,yi[yr++]=i,yi[yr++]=r,yi[yr++]=o,Nf|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function Lf(t,i,r,o){return ac(t,i,r,o),sc(t)}function Os(t,i){return ac(t,null,null,i),sc(t)}function T0(t,i,r){t.lanes|=r;var o=t.alternate;o!==null&&(o.lanes|=r);for(var f=!1,h=t.return;h!==null;)h.childLanes|=r,o=h.alternate,o!==null&&(o.childLanes|=r),h.tag===22&&(t=h.stateNode,t===null||t._visibility&1||(f=!0)),t=h,h=h.return;return t.tag===3?(h=t.stateNode,f&&i!==null&&(f=31-Ie(r),t=h.hiddenUpdates,o=t[f],o===null?t[f]=[i]:o.push(i),i.lane=r|536870912),h):null}function sc(t){if(50<ol)throw ol=0,Gh=null,Error(s(185));for(var i=t.return;i!==null;)t=i,i=t.return;return t.tag===3?t.stateNode:null}var Sr={};function Ob(t,i,r,o){this.tag=t,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ci(t,i,r,o){return new Ob(t,i,r,o)}function Uf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ca(t,i){var r=t.alternate;return r===null?(r=ci(t.tag,i,t.key,t.mode),r.elementType=t.elementType,r.type=t.type,r.stateNode=t.stateNode,r.alternate=t,t.alternate=r):(r.pendingProps=i,r.type=t.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=t.flags&65011712,r.childLanes=t.childLanes,r.lanes=t.lanes,r.child=t.child,r.memoizedProps=t.memoizedProps,r.memoizedState=t.memoizedState,r.updateQueue=t.updateQueue,i=t.dependencies,r.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},r.sibling=t.sibling,r.index=t.index,r.ref=t.ref,r.refCleanup=t.refCleanup,r}function A0(t,i){t.flags&=65011714;var r=t.alternate;return r===null?(t.childLanes=0,t.lanes=i,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=r.childLanes,t.lanes=r.lanes,t.child=r.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=r.memoizedProps,t.memoizedState=r.memoizedState,t.updateQueue=r.updateQueue,t.type=r.type,i=r.dependencies,t.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),t}function rc(t,i,r,o,f,h){var b=0;if(o=t,typeof t=="function")Uf(t)&&(b=1);else if(typeof t=="string")b=BM(t,r,ee.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case F:return t=ci(31,r,i,f),t.elementType=F,t.lanes=h,t;case E:return Ps(r.children,f,h,i);case v:b=8,f|=24;break;case y:return t=ci(12,r,i,f|2),t.elementType=y,t.lanes=h,t;case I:return t=ci(13,r,i,f),t.elementType=I,t.lanes=h,t;case U:return t=ci(19,r,i,f),t.elementType=U,t.lanes=h,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case N:b=10;break e;case A:b=9;break e;case C:b=11;break e;case z:b=14;break e;case T:b=16,o=null;break e}b=29,r=Error(s(130,t===null?"null":typeof t,"")),o=null}return i=ci(b,r,i,f),i.elementType=t,i.type=o,i.lanes=h,i}function Ps(t,i,r,o){return t=ci(7,t,o,i),t.lanes=r,t}function Of(t,i,r){return t=ci(6,t,null,i),t.lanes=r,t}function w0(t){var i=ci(18,null,null,0);return i.stateNode=t,i}function Pf(t,i,r){return i=ci(4,t.children!==null?t.children:[],t.key,i),i.lanes=r,i.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},i}var R0=new WeakMap;function Si(t,i){if(typeof t=="object"&&t!==null){var r=R0.get(t);return r!==void 0?r:(i={value:t,source:i,stack:Qt(i)},R0.set(t,i),i)}return{value:t,source:i,stack:Qt(i)}}var br=[],Mr=0,oc=null,Ho=0,bi=[],Mi=0,Va=null,Vi=1,ki="";function ua(t,i){br[Mr++]=Ho,br[Mr++]=oc,oc=t,Ho=i}function C0(t,i,r){bi[Mi++]=Vi,bi[Mi++]=ki,bi[Mi++]=Va,Va=t;var o=Vi;t=ki;var f=32-Ie(o)-1;o&=~(1<<f),r+=1;var h=32-Ie(i)+f;if(30<h){var b=f-f%5;h=(o&(1<<b)-1).toString(32),o>>=b,f-=b,Vi=1<<32-Ie(i)+f|r<<f|o,ki=h+t}else Vi=1<<h|r<<f|o,ki=t}function zf(t){t.return!==null&&(ua(t,1),C0(t,1,0))}function If(t){for(;t===oc;)oc=br[--Mr],br[Mr]=null,Ho=br[--Mr],br[Mr]=null;for(;t===Va;)Va=bi[--Mi],bi[Mi]=null,ki=bi[--Mi],bi[Mi]=null,Vi=bi[--Mi],bi[Mi]=null}function D0(t,i){bi[Mi++]=Vi,bi[Mi++]=ki,bi[Mi++]=Va,Vi=i.id,ki=i.overflow,Va=t}var Un=null,Jt=null,Et=!1,ka=null,Ei=!1,Ff=Error(s(519));function ja(t){var i=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Go(Si(i,t)),Ff}function N0(t){var i=t.stateNode,r=t.type,o=t.memoizedProps;switch(i[hn]=t,i[Ln]=o,r){case"dialog":yt("cancel",i),yt("close",i);break;case"iframe":case"object":case"embed":yt("load",i);break;case"video":case"audio":for(r=0;r<cl.length;r++)yt(cl[r],i);break;case"source":yt("error",i);break;case"img":case"image":case"link":yt("error",i),yt("load",i);break;case"details":yt("toggle",i);break;case"input":yt("invalid",i),Bn(i,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":yt("invalid",i);break;case"textarea":yt("invalid",i),Ni(i,o.value,o.defaultValue,o.children)}r=o.children,typeof r!="string"&&typeof r!="number"&&typeof r!="bigint"||i.textContent===""+r||o.suppressHydrationWarning===!0||Y_(i.textContent,r)?(o.popover!=null&&(yt("beforetoggle",i),yt("toggle",i)),o.onScroll!=null&&yt("scroll",i),o.onScrollEnd!=null&&yt("scrollend",i),o.onClick!=null&&(i.onclick=oa),i=!0):i=!1,i||ja(t,!0)}function L0(t){for(Un=t.return;Un;)switch(Un.tag){case 5:case 31:case 13:Ei=!1;return;case 27:case 3:Ei=!0;return;default:Un=Un.return}}function Er(t){if(t!==Un)return!1;if(!Et)return L0(t),Et=!0,!1;var i=t.tag,r;if((r=i!==3&&i!==27)&&((r=i===5)&&(r=t.type,r=!(r!=="form"&&r!=="button")||nd(t.type,t.memoizedProps)),r=!r),r&&Jt&&ja(t),L0(t),i===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));Jt=ix(t)}else if(i===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));Jt=ix(t)}else i===27?(i=Jt,as(t.type)?(t=od,od=null,Jt=t):Jt=i):Jt=Un?Ai(t.stateNode.nextSibling):null;return!0}function zs(){Jt=Un=null,Et=!1}function Bf(){var t=ka;return t!==null&&(ei===null?ei=t:ei.push.apply(ei,t),ka=null),t}function Go(t){ka===null?ka=[t]:ka.push(t)}var Hf=H(null),Is=null,fa=null;function Xa(t,i,r){ye(Hf,i._currentValue),i._currentValue=r}function ha(t){t._currentValue=Hf.current,K(Hf)}function Gf(t,i,r){for(;t!==null;){var o=t.alternate;if((t.childLanes&i)!==i?(t.childLanes|=i,o!==null&&(o.childLanes|=i)):o!==null&&(o.childLanes&i)!==i&&(o.childLanes|=i),t===r)break;t=t.return}}function Vf(t,i,r,o){var f=t.child;for(f!==null&&(f.return=t);f!==null;){var h=f.dependencies;if(h!==null){var b=f.child;h=h.firstContext;e:for(;h!==null;){var L=h;h=f;for(var k=0;k<i.length;k++)if(L.context===i[k]){h.lanes|=r,L=h.alternate,L!==null&&(L.lanes|=r),Gf(h.return,r,t),o||(b=null);break e}h=L.next}}else if(f.tag===18){if(b=f.return,b===null)throw Error(s(341));b.lanes|=r,h=b.alternate,h!==null&&(h.lanes|=r),Gf(b,r,t),b=null}else b=f.child;if(b!==null)b.return=f;else for(b=f;b!==null;){if(b===t){b=null;break}if(f=b.sibling,f!==null){f.return=b.return,b=f;break}b=b.return}f=b}}function Tr(t,i,r,o){t=null;for(var f=i,h=!1;f!==null;){if(!h){if((f.flags&524288)!==0)h=!0;else if((f.flags&262144)!==0)break}if(f.tag===10){var b=f.alternate;if(b===null)throw Error(s(387));if(b=b.memoizedProps,b!==null){var L=f.type;li(f.pendingProps.value,b.value)||(t!==null?t.push(L):t=[L])}}else if(f===se.current){if(b=f.alternate,b===null)throw Error(s(387));b.memoizedState.memoizedState!==f.memoizedState.memoizedState&&(t!==null?t.push(pl):t=[pl])}f=f.return}t!==null&&Vf(i,t,r,o),i.flags|=262144}function lc(t){for(t=t.firstContext;t!==null;){if(!li(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Fs(t){Is=t,fa=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function On(t){return U0(Is,t)}function cc(t,i){return Is===null&&Fs(t),U0(t,i)}function U0(t,i){var r=i._currentValue;if(i={context:i,memoizedValue:r,next:null},fa===null){if(t===null)throw Error(s(308));fa=i,t.dependencies={lanes:0,firstContext:i},t.flags|=524288}else fa=fa.next=i;return r}var Pb=typeof AbortController<"u"?AbortController:function(){var t=[],i=this.signal={aborted:!1,addEventListener:function(r,o){t.push(o)}};this.abort=function(){i.aborted=!0,t.forEach(function(r){return r()})}},zb=a.unstable_scheduleCallback,Ib=a.unstable_NormalPriority,gn={$$typeof:N,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function kf(){return{controller:new Pb,data:new Map,refCount:0}}function Vo(t){t.refCount--,t.refCount===0&&zb(Ib,function(){t.controller.abort()})}var ko=null,jf=0,Ar=0,wr=null;function Fb(t,i){if(ko===null){var r=ko=[];jf=0,Ar=qh(),wr={status:"pending",value:void 0,then:function(o){r.push(o)}}}return jf++,i.then(O0,O0),i}function O0(){if(--jf===0&&ko!==null){wr!==null&&(wr.status="fulfilled");var t=ko;ko=null,Ar=0,wr=null;for(var i=0;i<t.length;i++)(0,t[i])()}}function Bb(t,i){var r=[],o={status:"pending",value:null,reason:null,then:function(f){r.push(f)}};return t.then(function(){o.status="fulfilled",o.value=i;for(var f=0;f<r.length;f++)(0,r[f])(i)},function(f){for(o.status="rejected",o.reason=f,f=0;f<r.length;f++)(0,r[f])(void 0)}),o}var P0=O.S;O.S=function(t,i){x_=De(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&Fb(t,i),P0!==null&&P0(t,i)};var Bs=H(null);function Xf(){var t=Bs.current;return t!==null?t:Kt.pooledCache}function uc(t,i){i===null?ye(Bs,Bs.current):ye(Bs,i.pool)}function z0(){var t=Xf();return t===null?null:{parent:gn._currentValue,pool:t}}var Rr=Error(s(460)),Wf=Error(s(474)),fc=Error(s(542)),hc={then:function(){}};function I0(t){return t=t.status,t==="fulfilled"||t==="rejected"}function F0(t,i,r){switch(r=t[r],r===void 0?t.push(i):r!==i&&(i.then(oa,oa),i=r),i.status){case"fulfilled":return i.value;case"rejected":throw t=i.reason,H0(t),t;default:if(typeof i.status=="string")i.then(oa,oa);else{if(t=Kt,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=i,t.status="pending",t.then(function(o){if(i.status==="pending"){var f=i;f.status="fulfilled",f.value=o}},function(o){if(i.status==="pending"){var f=i;f.status="rejected",f.reason=o}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw t=i.reason,H0(t),t}throw Gs=i,Rr}}function Hs(t){try{var i=t._init;return i(t._payload)}catch(r){throw r!==null&&typeof r=="object"&&typeof r.then=="function"?(Gs=r,Rr):r}}var Gs=null;function B0(){if(Gs===null)throw Error(s(459));var t=Gs;return Gs=null,t}function H0(t){if(t===Rr||t===fc)throw Error(s(483))}var Cr=null,jo=0;function dc(t){var i=jo;return jo+=1,Cr===null&&(Cr=[]),F0(Cr,t,i)}function Xo(t,i){i=i.props.ref,t.ref=i!==void 0?i:null}function pc(t,i){throw i.$$typeof===g?Error(s(525)):(t=Object.prototype.toString.call(i),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":t)))}function G0(t){function i(J,q){if(t){var re=J.deletions;re===null?(J.deletions=[q],J.flags|=16):re.push(q)}}function r(J,q){if(!t)return null;for(;q!==null;)i(J,q),q=q.sibling;return null}function o(J){for(var q=new Map;J!==null;)J.key!==null?q.set(J.key,J):q.set(J.index,J),J=J.sibling;return q}function f(J,q){return J=ca(J,q),J.index=0,J.sibling=null,J}function h(J,q,re){return J.index=re,t?(re=J.alternate,re!==null?(re=re.index,re<q?(J.flags|=67108866,q):re):(J.flags|=67108866,q)):(J.flags|=1048576,q)}function b(J){return t&&J.alternate===null&&(J.flags|=67108866),J}function L(J,q,re,be){return q===null||q.tag!==6?(q=Of(re,J.mode,be),q.return=J,q):(q=f(q,re),q.return=J,q)}function k(J,q,re,be){var $e=re.type;return $e===E?ve(J,q,re.props.children,be,re.key):q!==null&&(q.elementType===$e||typeof $e=="object"&&$e!==null&&$e.$$typeof===T&&Hs($e)===q.type)?(q=f(q,re.props),Xo(q,re),q.return=J,q):(q=rc(re.type,re.key,re.props,null,J.mode,be),Xo(q,re),q.return=J,q)}function oe(J,q,re,be){return q===null||q.tag!==4||q.stateNode.containerInfo!==re.containerInfo||q.stateNode.implementation!==re.implementation?(q=Pf(re,J.mode,be),q.return=J,q):(q=f(q,re.children||[]),q.return=J,q)}function ve(J,q,re,be,$e){return q===null||q.tag!==7?(q=Ps(re,J.mode,be,$e),q.return=J,q):(q=f(q,re),q.return=J,q)}function Te(J,q,re){if(typeof q=="string"&&q!==""||typeof q=="number"||typeof q=="bigint")return q=Of(""+q,J.mode,re),q.return=J,q;if(typeof q=="object"&&q!==null){switch(q.$$typeof){case S:return re=rc(q.type,q.key,q.props,null,J.mode,re),Xo(re,q),re.return=J,re;case M:return q=Pf(q,J.mode,re),q.return=J,q;case T:return q=Hs(q),Te(J,q,re)}if(V(q)||j(q))return q=Ps(q,J.mode,re,null),q.return=J,q;if(typeof q.then=="function")return Te(J,dc(q),re);if(q.$$typeof===N)return Te(J,cc(J,q),re);pc(J,q)}return null}function fe(J,q,re,be){var $e=q!==null?q.key:null;if(typeof re=="string"&&re!==""||typeof re=="number"||typeof re=="bigint")return $e!==null?null:L(J,q,""+re,be);if(typeof re=="object"&&re!==null){switch(re.$$typeof){case S:return re.key===$e?k(J,q,re,be):null;case M:return re.key===$e?oe(J,q,re,be):null;case T:return re=Hs(re),fe(J,q,re,be)}if(V(re)||j(re))return $e!==null?null:ve(J,q,re,be,null);if(typeof re.then=="function")return fe(J,q,dc(re),be);if(re.$$typeof===N)return fe(J,q,cc(J,re),be);pc(J,re)}return null}function de(J,q,re,be,$e){if(typeof be=="string"&&be!==""||typeof be=="number"||typeof be=="bigint")return J=J.get(re)||null,L(q,J,""+be,$e);if(typeof be=="object"&&be!==null){switch(be.$$typeof){case S:return J=J.get(be.key===null?re:be.key)||null,k(q,J,be,$e);case M:return J=J.get(be.key===null?re:be.key)||null,oe(q,J,be,$e);case T:return be=Hs(be),de(J,q,re,be,$e)}if(V(be)||j(be))return J=J.get(re)||null,ve(q,J,be,$e,null);if(typeof be.then=="function")return de(J,q,re,dc(be),$e);if(be.$$typeof===N)return de(J,q,re,cc(q,be),$e);pc(q,be)}return null}function We(J,q,re,be){for(var $e=null,Rt=null,Ze=q,ht=q=0,Mt=null;Ze!==null&&ht<re.length;ht++){Ze.index>ht?(Mt=Ze,Ze=null):Mt=Ze.sibling;var Ct=fe(J,Ze,re[ht],be);if(Ct===null){Ze===null&&(Ze=Mt);break}t&&Ze&&Ct.alternate===null&&i(J,Ze),q=h(Ct,q,ht),Rt===null?$e=Ct:Rt.sibling=Ct,Rt=Ct,Ze=Mt}if(ht===re.length)return r(J,Ze),Et&&ua(J,ht),$e;if(Ze===null){for(;ht<re.length;ht++)Ze=Te(J,re[ht],be),Ze!==null&&(q=h(Ze,q,ht),Rt===null?$e=Ze:Rt.sibling=Ze,Rt=Ze);return Et&&ua(J,ht),$e}for(Ze=o(Ze);ht<re.length;ht++)Mt=de(Ze,J,ht,re[ht],be),Mt!==null&&(t&&Mt.alternate!==null&&Ze.delete(Mt.key===null?ht:Mt.key),q=h(Mt,q,ht),Rt===null?$e=Mt:Rt.sibling=Mt,Rt=Mt);return t&&Ze.forEach(function(cs){return i(J,cs)}),Et&&ua(J,ht),$e}function et(J,q,re,be){if(re==null)throw Error(s(151));for(var $e=null,Rt=null,Ze=q,ht=q=0,Mt=null,Ct=re.next();Ze!==null&&!Ct.done;ht++,Ct=re.next()){Ze.index>ht?(Mt=Ze,Ze=null):Mt=Ze.sibling;var cs=fe(J,Ze,Ct.value,be);if(cs===null){Ze===null&&(Ze=Mt);break}t&&Ze&&cs.alternate===null&&i(J,Ze),q=h(cs,q,ht),Rt===null?$e=cs:Rt.sibling=cs,Rt=cs,Ze=Mt}if(Ct.done)return r(J,Ze),Et&&ua(J,ht),$e;if(Ze===null){for(;!Ct.done;ht++,Ct=re.next())Ct=Te(J,Ct.value,be),Ct!==null&&(q=h(Ct,q,ht),Rt===null?$e=Ct:Rt.sibling=Ct,Rt=Ct);return Et&&ua(J,ht),$e}for(Ze=o(Ze);!Ct.done;ht++,Ct=re.next())Ct=de(Ze,J,ht,Ct.value,be),Ct!==null&&(t&&Ct.alternate!==null&&Ze.delete(Ct.key===null?ht:Ct.key),q=h(Ct,q,ht),Rt===null?$e=Ct:Rt.sibling=Ct,Rt=Ct);return t&&Ze.forEach(function(KM){return i(J,KM)}),Et&&ua(J,ht),$e}function Xt(J,q,re,be){if(typeof re=="object"&&re!==null&&re.type===E&&re.key===null&&(re=re.props.children),typeof re=="object"&&re!==null){switch(re.$$typeof){case S:e:{for(var $e=re.key;q!==null;){if(q.key===$e){if($e=re.type,$e===E){if(q.tag===7){r(J,q.sibling),be=f(q,re.props.children),be.return=J,J=be;break e}}else if(q.elementType===$e||typeof $e=="object"&&$e!==null&&$e.$$typeof===T&&Hs($e)===q.type){r(J,q.sibling),be=f(q,re.props),Xo(be,re),be.return=J,J=be;break e}r(J,q);break}else i(J,q);q=q.sibling}re.type===E?(be=Ps(re.props.children,J.mode,be,re.key),be.return=J,J=be):(be=rc(re.type,re.key,re.props,null,J.mode,be),Xo(be,re),be.return=J,J=be)}return b(J);case M:e:{for($e=re.key;q!==null;){if(q.key===$e)if(q.tag===4&&q.stateNode.containerInfo===re.containerInfo&&q.stateNode.implementation===re.implementation){r(J,q.sibling),be=f(q,re.children||[]),be.return=J,J=be;break e}else{r(J,q);break}else i(J,q);q=q.sibling}be=Pf(re,J.mode,be),be.return=J,J=be}return b(J);case T:return re=Hs(re),Xt(J,q,re,be)}if(V(re))return We(J,q,re,be);if(j(re)){if($e=j(re),typeof $e!="function")throw Error(s(150));return re=$e.call(re),et(J,q,re,be)}if(typeof re.then=="function")return Xt(J,q,dc(re),be);if(re.$$typeof===N)return Xt(J,q,cc(J,re),be);pc(J,re)}return typeof re=="string"&&re!==""||typeof re=="number"||typeof re=="bigint"?(re=""+re,q!==null&&q.tag===6?(r(J,q.sibling),be=f(q,re),be.return=J,J=be):(r(J,q),be=Of(re,J.mode,be),be.return=J,J=be),b(J)):r(J,q)}return function(J,q,re,be){try{jo=0;var $e=Xt(J,q,re,be);return Cr=null,$e}catch(Ze){if(Ze===Rr||Ze===fc)throw Ze;var Rt=ci(29,Ze,null,J.mode);return Rt.lanes=be,Rt.return=J,Rt}finally{}}}var Vs=G0(!0),V0=G0(!1),Wa=!1;function qf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Yf(t,i){t=t.updateQueue,i.updateQueue===t&&(i.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function qa(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Ya(t,i,r){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(Lt&2)!==0){var f=o.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),o.pending=i,i=sc(t),T0(t,null,r),i}return ac(t,o,i,r),sc(t)}function Wo(t,i,r){if(i=i.updateQueue,i!==null&&(i=i.shared,(r&4194048)!==0)){var o=i.lanes;o&=t.pendingLanes,r|=o,i.lanes=r,vi(t,r)}}function Zf(t,i){var r=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,r===o)){var f=null,h=null;if(r=r.firstBaseUpdate,r!==null){do{var b={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};h===null?f=h=b:h=h.next=b,r=r.next}while(r!==null);h===null?f=h=i:h=h.next=i}else f=h=i;r={baseState:o.baseState,firstBaseUpdate:f,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},t.updateQueue=r;return}t=r.lastBaseUpdate,t===null?r.firstBaseUpdate=i:t.next=i,r.lastBaseUpdate=i}var Kf=!1;function qo(){if(Kf){var t=wr;if(t!==null)throw t}}function Yo(t,i,r,o){Kf=!1;var f=t.updateQueue;Wa=!1;var h=f.firstBaseUpdate,b=f.lastBaseUpdate,L=f.shared.pending;if(L!==null){f.shared.pending=null;var k=L,oe=k.next;k.next=null,b===null?h=oe:b.next=oe,b=k;var ve=t.alternate;ve!==null&&(ve=ve.updateQueue,L=ve.lastBaseUpdate,L!==b&&(L===null?ve.firstBaseUpdate=oe:L.next=oe,ve.lastBaseUpdate=k))}if(h!==null){var Te=f.baseState;b=0,ve=oe=k=null,L=h;do{var fe=L.lane&-536870913,de=fe!==L.lane;if(de?(bt&fe)===fe:(o&fe)===fe){fe!==0&&fe===Ar&&(Kf=!0),ve!==null&&(ve=ve.next={lane:0,tag:L.tag,payload:L.payload,callback:null,next:null});e:{var We=t,et=L;fe=i;var Xt=r;switch(et.tag){case 1:if(We=et.payload,typeof We=="function"){Te=We.call(Xt,Te,fe);break e}Te=We;break e;case 3:We.flags=We.flags&-65537|128;case 0:if(We=et.payload,fe=typeof We=="function"?We.call(Xt,Te,fe):We,fe==null)break e;Te=x({},Te,fe);break e;case 2:Wa=!0}}fe=L.callback,fe!==null&&(t.flags|=64,de&&(t.flags|=8192),de=f.callbacks,de===null?f.callbacks=[fe]:de.push(fe))}else de={lane:fe,tag:L.tag,payload:L.payload,callback:L.callback,next:null},ve===null?(oe=ve=de,k=Te):ve=ve.next=de,b|=fe;if(L=L.next,L===null){if(L=f.shared.pending,L===null)break;de=L,L=de.next,de.next=null,f.lastBaseUpdate=de,f.shared.pending=null}}while(!0);ve===null&&(k=Te),f.baseState=k,f.firstBaseUpdate=oe,f.lastBaseUpdate=ve,h===null&&(f.shared.lanes=0),$a|=b,t.lanes=b,t.memoizedState=Te}}function k0(t,i){if(typeof t!="function")throw Error(s(191,t));t.call(i)}function j0(t,i){var r=t.callbacks;if(r!==null)for(t.callbacks=null,t=0;t<r.length;t++)k0(r[t],i)}var Dr=H(null),mc=H(0);function X0(t,i){t=Sa,ye(mc,t),ye(Dr,i),Sa=t|i.baseLanes}function Qf(){ye(mc,Sa),ye(Dr,Dr.current)}function Jf(){Sa=mc.current,K(Dr),K(mc)}var ui=H(null),Ti=null;function Za(t){var i=t.alternate;ye(dn,dn.current&1),ye(ui,t),Ti===null&&(i===null||Dr.current!==null||i.memoizedState!==null)&&(Ti=t)}function $f(t){ye(dn,dn.current),ye(ui,t),Ti===null&&(Ti=t)}function W0(t){t.tag===22?(ye(dn,dn.current),ye(ui,t),Ti===null&&(Ti=t)):Ka()}function Ka(){ye(dn,dn.current),ye(ui,ui.current)}function fi(t){K(ui),Ti===t&&(Ti=null),K(dn)}var dn=H(0);function gc(t){for(var i=t;i!==null;){if(i.tag===13){var r=i.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||sd(r)||rd(r)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var da=0,ct=null,kt=null,_n=null,_c=!1,Nr=!1,ks=!1,xc=0,Zo=0,Lr=null,Hb=0;function ln(){throw Error(s(321))}function eh(t,i){if(i===null)return!1;for(var r=0;r<i.length&&r<t.length;r++)if(!li(t[r],i[r]))return!1;return!0}function th(t,i,r,o,f,h){return da=h,ct=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,O.H=t===null||t.memoizedState===null?Cg:gh,ks=!1,h=r(o,f),ks=!1,Nr&&(h=Y0(i,r,o,f)),q0(t),h}function q0(t){O.H=Jo;var i=kt!==null&&kt.next!==null;if(da=0,_n=kt=ct=null,_c=!1,Zo=0,Lr=null,i)throw Error(s(300));t===null||xn||(t=t.dependencies,t!==null&&lc(t)&&(xn=!0))}function Y0(t,i,r,o){ct=t;var f=0;do{if(Nr&&(Lr=null),Zo=0,Nr=!1,25<=f)throw Error(s(301));if(f+=1,_n=kt=null,t.updateQueue!=null){var h=t.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}O.H=Dg,h=i(r,o)}while(Nr);return h}function Gb(){var t=O.H,i=t.useState()[0];return i=typeof i.then=="function"?Ko(i):i,t=t.useState()[0],(kt!==null?kt.memoizedState:null)!==t&&(ct.flags|=1024),i}function nh(){var t=xc!==0;return xc=0,t}function ih(t,i,r){i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~r}function ah(t){if(_c){for(t=t.memoizedState;t!==null;){var i=t.queue;i!==null&&(i.pending=null),t=t.next}_c=!1}da=0,_n=kt=ct=null,Nr=!1,Zo=xc=0,Lr=null}function Xn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _n===null?ct.memoizedState=_n=t:_n=_n.next=t,_n}function pn(){if(kt===null){var t=ct.alternate;t=t!==null?t.memoizedState:null}else t=kt.next;var i=_n===null?ct.memoizedState:_n.next;if(i!==null)_n=i,kt=t;else{if(t===null)throw ct.alternate===null?Error(s(467)):Error(s(310));kt=t,t={memoizedState:kt.memoizedState,baseState:kt.baseState,baseQueue:kt.baseQueue,queue:kt.queue,next:null},_n===null?ct.memoizedState=_n=t:_n=_n.next=t}return _n}function vc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ko(t){var i=Zo;return Zo+=1,Lr===null&&(Lr=[]),t=F0(Lr,t,i),i=ct,(_n===null?i.memoizedState:_n.next)===null&&(i=i.alternate,O.H=i===null||i.memoizedState===null?Cg:gh),t}function yc(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Ko(t);if(t.$$typeof===N)return On(t)}throw Error(s(438,String(t)))}function sh(t){var i=null,r=ct.updateQueue;if(r!==null&&(i=r.memoCache),i==null){var o=ct.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(i={data:o.data.map(function(f){return f.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),r===null&&(r=vc(),ct.updateQueue=r),r.memoCache=i,r=i.data[i.index],r===void 0)for(r=i.data[i.index]=Array(t),o=0;o<t;o++)r[o]=X;return i.index++,r}function pa(t,i){return typeof i=="function"?i(t):i}function Sc(t){var i=pn();return rh(i,kt,t)}function rh(t,i,r){var o=t.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=r;var f=t.baseQueue,h=o.pending;if(h!==null){if(f!==null){var b=f.next;f.next=h.next,h.next=b}i.baseQueue=f=h,o.pending=null}if(h=t.baseState,f===null)t.memoizedState=h;else{i=f.next;var L=b=null,k=null,oe=i,ve=!1;do{var Te=oe.lane&-536870913;if(Te!==oe.lane?(bt&Te)===Te:(da&Te)===Te){var fe=oe.revertLane;if(fe===0)k!==null&&(k=k.next={lane:0,revertLane:0,gesture:null,action:oe.action,hasEagerState:oe.hasEagerState,eagerState:oe.eagerState,next:null}),Te===Ar&&(ve=!0);else if((da&fe)===fe){oe=oe.next,fe===Ar&&(ve=!0);continue}else Te={lane:0,revertLane:oe.revertLane,gesture:null,action:oe.action,hasEagerState:oe.hasEagerState,eagerState:oe.eagerState,next:null},k===null?(L=k=Te,b=h):k=k.next=Te,ct.lanes|=fe,$a|=fe;Te=oe.action,ks&&r(h,Te),h=oe.hasEagerState?oe.eagerState:r(h,Te)}else fe={lane:Te,revertLane:oe.revertLane,gesture:oe.gesture,action:oe.action,hasEagerState:oe.hasEagerState,eagerState:oe.eagerState,next:null},k===null?(L=k=fe,b=h):k=k.next=fe,ct.lanes|=Te,$a|=Te;oe=oe.next}while(oe!==null&&oe!==i);if(k===null?b=h:k.next=L,!li(h,t.memoizedState)&&(xn=!0,ve&&(r=wr,r!==null)))throw r;t.memoizedState=h,t.baseState=b,t.baseQueue=k,o.lastRenderedState=h}return f===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function oh(t){var i=pn(),r=i.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=t;var o=r.dispatch,f=r.pending,h=i.memoizedState;if(f!==null){r.pending=null;var b=f=f.next;do h=t(h,b.action),b=b.next;while(b!==f);li(h,i.memoizedState)||(xn=!0),i.memoizedState=h,i.baseQueue===null&&(i.baseState=h),r.lastRenderedState=h}return[h,o]}function Z0(t,i,r){var o=ct,f=pn(),h=Et;if(h){if(r===void 0)throw Error(s(407));r=r()}else r=i();var b=!li((kt||f).memoizedState,r);if(b&&(f.memoizedState=r,xn=!0),f=f.queue,uh(J0.bind(null,o,f,t),[t]),f.getSnapshot!==i||b||_n!==null&&_n.memoizedState.tag&1){if(o.flags|=2048,Ur(9,{destroy:void 0},Q0.bind(null,o,f,r,i),null),Kt===null)throw Error(s(349));h||(da&127)!==0||K0(o,i,r)}return r}function K0(t,i,r){t.flags|=16384,t={getSnapshot:i,value:r},i=ct.updateQueue,i===null?(i=vc(),ct.updateQueue=i,i.stores=[t]):(r=i.stores,r===null?i.stores=[t]:r.push(t))}function Q0(t,i,r,o){i.value=r,i.getSnapshot=o,$0(i)&&eg(t)}function J0(t,i,r){return r(function(){$0(i)&&eg(t)})}function $0(t){var i=t.getSnapshot;t=t.value;try{var r=i();return!li(t,r)}catch{return!0}}function eg(t){var i=Os(t,2);i!==null&&ti(i,t,2)}function lh(t){var i=Xn();if(typeof t=="function"){var r=t;if(t=r(),ks){ze(!0);try{r()}finally{ze(!1)}}}return i.memoizedState=i.baseState=t,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:pa,lastRenderedState:t},i}function tg(t,i,r,o){return t.baseState=r,rh(t,kt,typeof o=="function"?o:pa)}function Vb(t,i,r,o,f){if(Ec(t))throw Error(s(485));if(t=i.action,t!==null){var h={payload:f,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(b){h.listeners.push(b)}};O.T!==null?r(!0):h.isTransition=!1,o(h),r=i.pending,r===null?(h.next=i.pending=h,ng(i,h)):(h.next=r.next,i.pending=r.next=h)}}function ng(t,i){var r=i.action,o=i.payload,f=t.state;if(i.isTransition){var h=O.T,b={};O.T=b;try{var L=r(f,o),k=O.S;k!==null&&k(b,L),ig(t,i,L)}catch(oe){ch(t,i,oe)}finally{h!==null&&b.types!==null&&(h.types=b.types),O.T=h}}else try{h=r(f,o),ig(t,i,h)}catch(oe){ch(t,i,oe)}}function ig(t,i,r){r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(function(o){ag(t,i,o)},function(o){return ch(t,i,o)}):ag(t,i,r)}function ag(t,i,r){i.status="fulfilled",i.value=r,sg(i),t.state=r,i=t.pending,i!==null&&(r=i.next,r===i?t.pending=null:(r=r.next,i.next=r,ng(t,r)))}function ch(t,i,r){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do i.status="rejected",i.reason=r,sg(i),i=i.next;while(i!==o)}t.action=null}function sg(t){t=t.listeners;for(var i=0;i<t.length;i++)(0,t[i])()}function rg(t,i){return i}function og(t,i){if(Et){var r=Kt.formState;if(r!==null){e:{var o=ct;if(Et){if(Jt){t:{for(var f=Jt,h=Ei;f.nodeType!==8;){if(!h){f=null;break t}if(f=Ai(f.nextSibling),f===null){f=null;break t}}h=f.data,f=h==="F!"||h==="F"?f:null}if(f){Jt=Ai(f.nextSibling),o=f.data==="F!";break e}}ja(o)}o=!1}o&&(i=r[0])}}return r=Xn(),r.memoizedState=r.baseState=i,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:rg,lastRenderedState:i},r.queue=o,r=Ag.bind(null,ct,o),o.dispatch=r,o=lh(!1),h=mh.bind(null,ct,!1,o.queue),o=Xn(),f={state:i,dispatch:null,action:t,pending:null},o.queue=f,r=Vb.bind(null,ct,f,h,r),f.dispatch=r,o.memoizedState=t,[i,r,!1]}function lg(t){var i=pn();return cg(i,kt,t)}function cg(t,i,r){if(i=rh(t,i,rg)[0],t=Sc(pa)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var o=Ko(i)}catch(b){throw b===Rr?fc:b}else o=i;i=pn();var f=i.queue,h=f.dispatch;return r!==i.memoizedState&&(ct.flags|=2048,Ur(9,{destroy:void 0},kb.bind(null,f,r),null)),[o,h,t]}function kb(t,i){t.action=i}function ug(t){var i=pn(),r=kt;if(r!==null)return cg(i,r,t);pn(),i=i.memoizedState,r=pn();var o=r.queue.dispatch;return r.memoizedState=t,[i,o,!1]}function Ur(t,i,r,o){return t={tag:t,create:r,deps:o,inst:i,next:null},i=ct.updateQueue,i===null&&(i=vc(),ct.updateQueue=i),r=i.lastEffect,r===null?i.lastEffect=t.next=t:(o=r.next,r.next=t,t.next=o,i.lastEffect=t),t}function fg(){return pn().memoizedState}function bc(t,i,r,o){var f=Xn();ct.flags|=t,f.memoizedState=Ur(1|i,{destroy:void 0},r,o===void 0?null:o)}function Mc(t,i,r,o){var f=pn();o=o===void 0?null:o;var h=f.memoizedState.inst;kt!==null&&o!==null&&eh(o,kt.memoizedState.deps)?f.memoizedState=Ur(i,h,r,o):(ct.flags|=t,f.memoizedState=Ur(1|i,h,r,o))}function hg(t,i){bc(8390656,8,t,i)}function uh(t,i){Mc(2048,8,t,i)}function jb(t){ct.flags|=4;var i=ct.updateQueue;if(i===null)i=vc(),ct.updateQueue=i,i.events=[t];else{var r=i.events;r===null?i.events=[t]:r.push(t)}}function dg(t){var i=pn().memoizedState;return jb({ref:i,nextImpl:t}),function(){if((Lt&2)!==0)throw Error(s(440));return i.impl.apply(void 0,arguments)}}function pg(t,i){return Mc(4,2,t,i)}function mg(t,i){return Mc(4,4,t,i)}function gg(t,i){if(typeof i=="function"){t=t();var r=i(t);return function(){typeof r=="function"?r():i(null)}}if(i!=null)return t=t(),i.current=t,function(){i.current=null}}function _g(t,i,r){r=r!=null?r.concat([t]):null,Mc(4,4,gg.bind(null,i,t),r)}function fh(){}function xg(t,i){var r=pn();i=i===void 0?null:i;var o=r.memoizedState;return i!==null&&eh(i,o[1])?o[0]:(r.memoizedState=[t,i],t)}function vg(t,i){var r=pn();i=i===void 0?null:i;var o=r.memoizedState;if(i!==null&&eh(i,o[1]))return o[0];if(o=t(),ks){ze(!0);try{t()}finally{ze(!1)}}return r.memoizedState=[o,i],o}function hh(t,i,r){return r===void 0||(da&1073741824)!==0&&(bt&261930)===0?t.memoizedState=i:(t.memoizedState=r,t=y_(),ct.lanes|=t,$a|=t,r)}function yg(t,i,r,o){return li(r,i)?r:Dr.current!==null?(t=hh(t,r,o),li(t,i)||(xn=!0),t):(da&42)===0||(da&1073741824)!==0&&(bt&261930)===0?(xn=!0,t.memoizedState=r):(t=y_(),ct.lanes|=t,$a|=t,i)}function Sg(t,i,r,o,f){var h=G.p;G.p=h!==0&&8>h?h:8;var b=O.T,L={};O.T=L,mh(t,!1,i,r);try{var k=f(),oe=O.S;if(oe!==null&&oe(L,k),k!==null&&typeof k=="object"&&typeof k.then=="function"){var ve=Bb(k,o);Qo(t,i,ve,pi(t))}else Qo(t,i,o,pi(t))}catch(Te){Qo(t,i,{then:function(){},status:"rejected",reason:Te},pi())}finally{G.p=h,b!==null&&L.types!==null&&(b.types=L.types),O.T=b}}function Xb(){}function dh(t,i,r,o){if(t.tag!==5)throw Error(s(476));var f=bg(t).queue;Sg(t,f,i,$,r===null?Xb:function(){return Mg(t),r(o)})}function bg(t){var i=t.memoizedState;if(i!==null)return i;i={memoizedState:$,baseState:$,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:pa,lastRenderedState:$},next:null};var r={};return i.next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:pa,lastRenderedState:r},next:null},t.memoizedState=i,t=t.alternate,t!==null&&(t.memoizedState=i),i}function Mg(t){var i=bg(t);i.next===null&&(i=t.alternate.memoizedState),Qo(t,i.next.queue,{},pi())}function ph(){return On(pl)}function Eg(){return pn().memoizedState}function Tg(){return pn().memoizedState}function Wb(t){for(var i=t.return;i!==null;){switch(i.tag){case 24:case 3:var r=pi();t=qa(r);var o=Ya(i,t,r);o!==null&&(ti(o,i,r),Wo(o,i,r)),i={cache:kf()},t.payload=i;return}i=i.return}}function qb(t,i,r){var o=pi();r={lane:o,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Ec(t)?wg(i,r):(r=Lf(t,i,r,o),r!==null&&(ti(r,t,o),Rg(r,i,o)))}function Ag(t,i,r){var o=pi();Qo(t,i,r,o)}function Qo(t,i,r,o){var f={lane:o,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(Ec(t))wg(i,f);else{var h=t.alternate;if(t.lanes===0&&(h===null||h.lanes===0)&&(h=i.lastRenderedReducer,h!==null))try{var b=i.lastRenderedState,L=h(b,r);if(f.hasEagerState=!0,f.eagerState=L,li(L,b))return ac(t,i,f,0),Kt===null&&ic(),!1}catch{}finally{}if(r=Lf(t,i,f,o),r!==null)return ti(r,t,o),Rg(r,i,o),!0}return!1}function mh(t,i,r,o){if(o={lane:2,revertLane:qh(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Ec(t)){if(i)throw Error(s(479))}else i=Lf(t,r,o,2),i!==null&&ti(i,t,2)}function Ec(t){var i=t.alternate;return t===ct||i!==null&&i===ct}function wg(t,i){Nr=_c=!0;var r=t.pending;r===null?i.next=i:(i.next=r.next,r.next=i),t.pending=i}function Rg(t,i,r){if((r&4194048)!==0){var o=i.lanes;o&=t.pendingLanes,r|=o,i.lanes=r,vi(t,r)}}var Jo={readContext:On,use:yc,useCallback:ln,useContext:ln,useEffect:ln,useImperativeHandle:ln,useLayoutEffect:ln,useInsertionEffect:ln,useMemo:ln,useReducer:ln,useRef:ln,useState:ln,useDebugValue:ln,useDeferredValue:ln,useTransition:ln,useSyncExternalStore:ln,useId:ln,useHostTransitionStatus:ln,useFormState:ln,useActionState:ln,useOptimistic:ln,useMemoCache:ln,useCacheRefresh:ln};Jo.useEffectEvent=ln;var Cg={readContext:On,use:yc,useCallback:function(t,i){return Xn().memoizedState=[t,i===void 0?null:i],t},useContext:On,useEffect:hg,useImperativeHandle:function(t,i,r){r=r!=null?r.concat([t]):null,bc(4194308,4,gg.bind(null,i,t),r)},useLayoutEffect:function(t,i){return bc(4194308,4,t,i)},useInsertionEffect:function(t,i){bc(4,2,t,i)},useMemo:function(t,i){var r=Xn();i=i===void 0?null:i;var o=t();if(ks){ze(!0);try{t()}finally{ze(!1)}}return r.memoizedState=[o,i],o},useReducer:function(t,i,r){var o=Xn();if(r!==void 0){var f=r(i);if(ks){ze(!0);try{r(i)}finally{ze(!1)}}}else f=i;return o.memoizedState=o.baseState=f,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:f},o.queue=t,t=t.dispatch=qb.bind(null,ct,t),[o.memoizedState,t]},useRef:function(t){var i=Xn();return t={current:t},i.memoizedState=t},useState:function(t){t=lh(t);var i=t.queue,r=Ag.bind(null,ct,i);return i.dispatch=r,[t.memoizedState,r]},useDebugValue:fh,useDeferredValue:function(t,i){var r=Xn();return hh(r,t,i)},useTransition:function(){var t=lh(!1);return t=Sg.bind(null,ct,t.queue,!0,!1),Xn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,i,r){var o=ct,f=Xn();if(Et){if(r===void 0)throw Error(s(407));r=r()}else{if(r=i(),Kt===null)throw Error(s(349));(bt&127)!==0||K0(o,i,r)}f.memoizedState=r;var h={value:r,getSnapshot:i};return f.queue=h,hg(J0.bind(null,o,h,t),[t]),o.flags|=2048,Ur(9,{destroy:void 0},Q0.bind(null,o,h,r,i),null),r},useId:function(){var t=Xn(),i=Kt.identifierPrefix;if(Et){var r=ki,o=Vi;r=(o&~(1<<32-Ie(o)-1)).toString(32)+r,i="_"+i+"R_"+r,r=xc++,0<r&&(i+="H"+r.toString(32)),i+="_"}else r=Hb++,i="_"+i+"r_"+r.toString(32)+"_";return t.memoizedState=i},useHostTransitionStatus:ph,useFormState:og,useActionState:og,useOptimistic:function(t){var i=Xn();i.memoizedState=i.baseState=t;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=r,i=mh.bind(null,ct,!0,r),r.dispatch=i,[t,i]},useMemoCache:sh,useCacheRefresh:function(){return Xn().memoizedState=Wb.bind(null,ct)},useEffectEvent:function(t){var i=Xn(),r={impl:t};return i.memoizedState=r,function(){if((Lt&2)!==0)throw Error(s(440));return r.impl.apply(void 0,arguments)}}},gh={readContext:On,use:yc,useCallback:xg,useContext:On,useEffect:uh,useImperativeHandle:_g,useInsertionEffect:pg,useLayoutEffect:mg,useMemo:vg,useReducer:Sc,useRef:fg,useState:function(){return Sc(pa)},useDebugValue:fh,useDeferredValue:function(t,i){var r=pn();return yg(r,kt.memoizedState,t,i)},useTransition:function(){var t=Sc(pa)[0],i=pn().memoizedState;return[typeof t=="boolean"?t:Ko(t),i]},useSyncExternalStore:Z0,useId:Eg,useHostTransitionStatus:ph,useFormState:lg,useActionState:lg,useOptimistic:function(t,i){var r=pn();return tg(r,kt,t,i)},useMemoCache:sh,useCacheRefresh:Tg};gh.useEffectEvent=dg;var Dg={readContext:On,use:yc,useCallback:xg,useContext:On,useEffect:uh,useImperativeHandle:_g,useInsertionEffect:pg,useLayoutEffect:mg,useMemo:vg,useReducer:oh,useRef:fg,useState:function(){return oh(pa)},useDebugValue:fh,useDeferredValue:function(t,i){var r=pn();return kt===null?hh(r,t,i):yg(r,kt.memoizedState,t,i)},useTransition:function(){var t=oh(pa)[0],i=pn().memoizedState;return[typeof t=="boolean"?t:Ko(t),i]},useSyncExternalStore:Z0,useId:Eg,useHostTransitionStatus:ph,useFormState:ug,useActionState:ug,useOptimistic:function(t,i){var r=pn();return kt!==null?tg(r,kt,t,i):(r.baseState=t,[t,r.queue.dispatch])},useMemoCache:sh,useCacheRefresh:Tg};Dg.useEffectEvent=dg;function _h(t,i,r,o){i=t.memoizedState,r=r(o,i),r=r==null?i:x({},i,r),t.memoizedState=r,t.lanes===0&&(t.updateQueue.baseState=r)}var xh={enqueueSetState:function(t,i,r){t=t._reactInternals;var o=pi(),f=qa(o);f.payload=i,r!=null&&(f.callback=r),i=Ya(t,f,o),i!==null&&(ti(i,t,o),Wo(i,t,o))},enqueueReplaceState:function(t,i,r){t=t._reactInternals;var o=pi(),f=qa(o);f.tag=1,f.payload=i,r!=null&&(f.callback=r),i=Ya(t,f,o),i!==null&&(ti(i,t,o),Wo(i,t,o))},enqueueForceUpdate:function(t,i){t=t._reactInternals;var r=pi(),o=qa(r);o.tag=2,i!=null&&(o.callback=i),i=Ya(t,o,r),i!==null&&(ti(i,t,r),Wo(i,t,r))}};function Ng(t,i,r,o,f,h,b){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,h,b):i.prototype&&i.prototype.isPureReactComponent?!Fo(r,o)||!Fo(f,h):!0}function Lg(t,i,r,o){t=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(r,o),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(r,o),i.state!==t&&xh.enqueueReplaceState(i,i.state,null)}function js(t,i){var r=i;if("ref"in i){r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}if(t=t.defaultProps){r===i&&(r=x({},r));for(var f in t)r[f]===void 0&&(r[f]=t[f])}return r}function Ug(t){nc(t)}function Og(t){console.error(t)}function Pg(t){nc(t)}function Tc(t,i){try{var r=t.onUncaughtError;r(i.value,{componentStack:i.stack})}catch(o){setTimeout(function(){throw o})}}function zg(t,i,r){try{var o=t.onCaughtError;o(r.value,{componentStack:r.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(f){setTimeout(function(){throw f})}}function vh(t,i,r){return r=qa(r),r.tag=3,r.payload={element:null},r.callback=function(){Tc(t,i)},r}function Ig(t){return t=qa(t),t.tag=3,t}function Fg(t,i,r,o){var f=r.type.getDerivedStateFromError;if(typeof f=="function"){var h=o.value;t.payload=function(){return f(h)},t.callback=function(){zg(i,r,o)}}var b=r.stateNode;b!==null&&typeof b.componentDidCatch=="function"&&(t.callback=function(){zg(i,r,o),typeof f!="function"&&(es===null?es=new Set([this]):es.add(this));var L=o.stack;this.componentDidCatch(o.value,{componentStack:L!==null?L:""})})}function Yb(t,i,r,o,f){if(r.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(i=r.alternate,i!==null&&Tr(i,r,f,!0),r=ui.current,r!==null){switch(r.tag){case 31:case 13:return Ti===null?Ic():r.alternate===null&&cn===0&&(cn=3),r.flags&=-257,r.flags|=65536,r.lanes=f,o===hc?r.flags|=16384:(i=r.updateQueue,i===null?r.updateQueue=new Set([o]):i.add(o),jh(t,o,f)),!1;case 22:return r.flags|=65536,o===hc?r.flags|=16384:(i=r.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([o])},r.updateQueue=i):(r=i.retryQueue,r===null?i.retryQueue=new Set([o]):r.add(o)),jh(t,o,f)),!1}throw Error(s(435,r.tag))}return jh(t,o,f),Ic(),!1}if(Et)return i=ui.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=f,o!==Ff&&(t=Error(s(422),{cause:o}),Go(Si(t,r)))):(o!==Ff&&(i=Error(s(423),{cause:o}),Go(Si(i,r))),t=t.current.alternate,t.flags|=65536,f&=-f,t.lanes|=f,o=Si(o,r),f=vh(t.stateNode,o,f),Zf(t,f),cn!==4&&(cn=2)),!1;var h=Error(s(520),{cause:o});if(h=Si(h,r),rl===null?rl=[h]:rl.push(h),cn!==4&&(cn=2),i===null)return!0;o=Si(o,r),r=i;do{switch(r.tag){case 3:return r.flags|=65536,t=f&-f,r.lanes|=t,t=vh(r.stateNode,o,t),Zf(r,t),!1;case 1:if(i=r.type,h=r.stateNode,(r.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(es===null||!es.has(h))))return r.flags|=65536,f&=-f,r.lanes|=f,f=Ig(f),Fg(f,t,r,o),Zf(r,f),!1}r=r.return}while(r!==null);return!1}var yh=Error(s(461)),xn=!1;function Pn(t,i,r,o){i.child=t===null?V0(i,null,r,o):Vs(i,t.child,r,o)}function Bg(t,i,r,o,f){r=r.render;var h=i.ref;if("ref"in o){var b={};for(var L in o)L!=="ref"&&(b[L]=o[L])}else b=o;return Fs(i),o=th(t,i,r,b,h,f),L=nh(),t!==null&&!xn?(ih(t,i,f),ma(t,i,f)):(Et&&L&&zf(i),i.flags|=1,Pn(t,i,o,f),i.child)}function Hg(t,i,r,o,f){if(t===null){var h=r.type;return typeof h=="function"&&!Uf(h)&&h.defaultProps===void 0&&r.compare===null?(i.tag=15,i.type=h,Gg(t,i,h,o,f)):(t=rc(r.type,null,o,i,i.mode,f),t.ref=i.ref,t.return=i,i.child=t)}if(h=t.child,!Rh(t,f)){var b=h.memoizedProps;if(r=r.compare,r=r!==null?r:Fo,r(b,o)&&t.ref===i.ref)return ma(t,i,f)}return i.flags|=1,t=ca(h,o),t.ref=i.ref,t.return=i,i.child=t}function Gg(t,i,r,o,f){if(t!==null){var h=t.memoizedProps;if(Fo(h,o)&&t.ref===i.ref)if(xn=!1,i.pendingProps=o=h,Rh(t,f))(t.flags&131072)!==0&&(xn=!0);else return i.lanes=t.lanes,ma(t,i,f)}return Sh(t,i,r,o,f)}function Vg(t,i,r,o){var f=o.children,h=t!==null?t.memoizedState:null;if(t===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((i.flags&128)!==0){if(h=h!==null?h.baseLanes|r:r,t!==null){for(o=i.child=t.child,f=0;o!==null;)f=f|o.lanes|o.childLanes,o=o.sibling;o=f&~h}else o=0,i.child=null;return kg(t,i,h,r,o)}if((r&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},t!==null&&uc(i,h!==null?h.cachePool:null),h!==null?X0(i,h):Qf(),W0(i);else return o=i.lanes=536870912,kg(t,i,h!==null?h.baseLanes|r:r,r,o)}else h!==null?(uc(i,h.cachePool),X0(i,h),Ka(),i.memoizedState=null):(t!==null&&uc(i,null),Qf(),Ka());return Pn(t,i,f,r),i.child}function $o(t,i){return t!==null&&t.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function kg(t,i,r,o,f){var h=Xf();return h=h===null?null:{parent:gn._currentValue,pool:h},i.memoizedState={baseLanes:r,cachePool:h},t!==null&&uc(i,null),Qf(),W0(i),t!==null&&Tr(t,i,o,!0),i.childLanes=f,null}function Ac(t,i){return i=Rc({mode:i.mode,children:i.children},t.mode),i.ref=t.ref,t.child=i,i.return=t,i}function jg(t,i,r){return Vs(i,t.child,null,r),t=Ac(i,i.pendingProps),t.flags|=2,fi(i),i.memoizedState=null,t}function Zb(t,i,r){var o=i.pendingProps,f=(i.flags&128)!==0;if(i.flags&=-129,t===null){if(Et){if(o.mode==="hidden")return t=Ac(i,o),i.lanes=536870912,$o(null,t);if($f(i),(t=Jt)?(t=nx(t,Ei),t=t!==null&&t.data==="&"?t:null,t!==null&&(i.memoizedState={dehydrated:t,treeContext:Va!==null?{id:Vi,overflow:ki}:null,retryLane:536870912,hydrationErrors:null},r=w0(t),r.return=i,i.child=r,Un=i,Jt=null)):t=null,t===null)throw ja(i);return i.lanes=536870912,null}return Ac(i,o)}var h=t.memoizedState;if(h!==null){var b=h.dehydrated;if($f(i),f)if(i.flags&256)i.flags&=-257,i=jg(t,i,r);else if(i.memoizedState!==null)i.child=t.child,i.flags|=128,i=null;else throw Error(s(558));else if(xn||Tr(t,i,r,!1),f=(r&t.childLanes)!==0,xn||f){if(o=Kt,o!==null&&(b=si(o,r),b!==0&&b!==h.retryLane))throw h.retryLane=b,Os(t,b),ti(o,t,b),yh;Ic(),i=jg(t,i,r)}else t=h.treeContext,Jt=Ai(b.nextSibling),Un=i,Et=!0,ka=null,Ei=!1,t!==null&&D0(i,t),i=Ac(i,o),i.flags|=4096;return i}return t=ca(t.child,{mode:o.mode,children:o.children}),t.ref=i.ref,i.child=t,t.return=i,t}function wc(t,i){var r=i.ref;if(r===null)t!==null&&t.ref!==null&&(i.flags|=4194816);else{if(typeof r!="function"&&typeof r!="object")throw Error(s(284));(t===null||t.ref!==r)&&(i.flags|=4194816)}}function Sh(t,i,r,o,f){return Fs(i),r=th(t,i,r,o,void 0,f),o=nh(),t!==null&&!xn?(ih(t,i,f),ma(t,i,f)):(Et&&o&&zf(i),i.flags|=1,Pn(t,i,r,f),i.child)}function Xg(t,i,r,o,f,h){return Fs(i),i.updateQueue=null,r=Y0(i,o,r,f),q0(t),o=nh(),t!==null&&!xn?(ih(t,i,h),ma(t,i,h)):(Et&&o&&zf(i),i.flags|=1,Pn(t,i,r,h),i.child)}function Wg(t,i,r,o,f){if(Fs(i),i.stateNode===null){var h=Sr,b=r.contextType;typeof b=="object"&&b!==null&&(h=On(b)),h=new r(o,h),i.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=xh,i.stateNode=h,h._reactInternals=i,h=i.stateNode,h.props=o,h.state=i.memoizedState,h.refs={},qf(i),b=r.contextType,h.context=typeof b=="object"&&b!==null?On(b):Sr,h.state=i.memoizedState,b=r.getDerivedStateFromProps,typeof b=="function"&&(_h(i,r,b,o),h.state=i.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(b=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),b!==h.state&&xh.enqueueReplaceState(h,h.state,null),Yo(i,o,h,f),qo(),h.state=i.memoizedState),typeof h.componentDidMount=="function"&&(i.flags|=4194308),o=!0}else if(t===null){h=i.stateNode;var L=i.memoizedProps,k=js(r,L);h.props=k;var oe=h.context,ve=r.contextType;b=Sr,typeof ve=="object"&&ve!==null&&(b=On(ve));var Te=r.getDerivedStateFromProps;ve=typeof Te=="function"||typeof h.getSnapshotBeforeUpdate=="function",L=i.pendingProps!==L,ve||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(L||oe!==b)&&Lg(i,h,o,b),Wa=!1;var fe=i.memoizedState;h.state=fe,Yo(i,o,h,f),qo(),oe=i.memoizedState,L||fe!==oe||Wa?(typeof Te=="function"&&(_h(i,r,Te,o),oe=i.memoizedState),(k=Wa||Ng(i,r,k,o,fe,oe,b))?(ve||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(i.flags|=4194308)):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=o,i.memoizedState=oe),h.props=o,h.state=oe,h.context=b,o=k):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),o=!1)}else{h=i.stateNode,Yf(t,i),b=i.memoizedProps,ve=js(r,b),h.props=ve,Te=i.pendingProps,fe=h.context,oe=r.contextType,k=Sr,typeof oe=="object"&&oe!==null&&(k=On(oe)),L=r.getDerivedStateFromProps,(oe=typeof L=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(b!==Te||fe!==k)&&Lg(i,h,o,k),Wa=!1,fe=i.memoizedState,h.state=fe,Yo(i,o,h,f),qo();var de=i.memoizedState;b!==Te||fe!==de||Wa||t!==null&&t.dependencies!==null&&lc(t.dependencies)?(typeof L=="function"&&(_h(i,r,L,o),de=i.memoizedState),(ve=Wa||Ng(i,r,ve,o,fe,de,k)||t!==null&&t.dependencies!==null&&lc(t.dependencies))?(oe||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,de,k),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,de,k)),typeof h.componentDidUpdate=="function"&&(i.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof h.componentDidUpdate!="function"||b===t.memoizedProps&&fe===t.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||b===t.memoizedProps&&fe===t.memoizedState||(i.flags|=1024),i.memoizedProps=o,i.memoizedState=de),h.props=o,h.state=de,h.context=k,o=ve):(typeof h.componentDidUpdate!="function"||b===t.memoizedProps&&fe===t.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||b===t.memoizedProps&&fe===t.memoizedState||(i.flags|=1024),o=!1)}return h=o,wc(t,i),o=(i.flags&128)!==0,h||o?(h=i.stateNode,r=o&&typeof r.getDerivedStateFromError!="function"?null:h.render(),i.flags|=1,t!==null&&o?(i.child=Vs(i,t.child,null,f),i.child=Vs(i,null,r,f)):Pn(t,i,r,f),i.memoizedState=h.state,t=i.child):t=ma(t,i,f),t}function qg(t,i,r,o){return zs(),i.flags|=256,Pn(t,i,r,o),i.child}var bh={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Mh(t){return{baseLanes:t,cachePool:z0()}}function Eh(t,i,r){return t=t!==null?t.childLanes&~r:0,i&&(t|=di),t}function Yg(t,i,r){var o=i.pendingProps,f=!1,h=(i.flags&128)!==0,b;if((b=h)||(b=t!==null&&t.memoizedState===null?!1:(dn.current&2)!==0),b&&(f=!0,i.flags&=-129),b=(i.flags&32)!==0,i.flags&=-33,t===null){if(Et){if(f?Za(i):Ka(),(t=Jt)?(t=nx(t,Ei),t=t!==null&&t.data!=="&"?t:null,t!==null&&(i.memoizedState={dehydrated:t,treeContext:Va!==null?{id:Vi,overflow:ki}:null,retryLane:536870912,hydrationErrors:null},r=w0(t),r.return=i,i.child=r,Un=i,Jt=null)):t=null,t===null)throw ja(i);return rd(t)?i.lanes=32:i.lanes=536870912,null}var L=o.children;return o=o.fallback,f?(Ka(),f=i.mode,L=Rc({mode:"hidden",children:L},f),o=Ps(o,f,r,null),L.return=i,o.return=i,L.sibling=o,i.child=L,o=i.child,o.memoizedState=Mh(r),o.childLanes=Eh(t,b,r),i.memoizedState=bh,$o(null,o)):(Za(i),Th(i,L))}var k=t.memoizedState;if(k!==null&&(L=k.dehydrated,L!==null)){if(h)i.flags&256?(Za(i),i.flags&=-257,i=Ah(t,i,r)):i.memoizedState!==null?(Ka(),i.child=t.child,i.flags|=128,i=null):(Ka(),L=o.fallback,f=i.mode,o=Rc({mode:"visible",children:o.children},f),L=Ps(L,f,r,null),L.flags|=2,o.return=i,L.return=i,o.sibling=L,i.child=o,Vs(i,t.child,null,r),o=i.child,o.memoizedState=Mh(r),o.childLanes=Eh(t,b,r),i.memoizedState=bh,i=$o(null,o));else if(Za(i),rd(L)){if(b=L.nextSibling&&L.nextSibling.dataset,b)var oe=b.dgst;b=oe,o=Error(s(419)),o.stack="",o.digest=b,Go({value:o,source:null,stack:null}),i=Ah(t,i,r)}else if(xn||Tr(t,i,r,!1),b=(r&t.childLanes)!==0,xn||b){if(b=Kt,b!==null&&(o=si(b,r),o!==0&&o!==k.retryLane))throw k.retryLane=o,Os(t,o),ti(b,t,o),yh;sd(L)||Ic(),i=Ah(t,i,r)}else sd(L)?(i.flags|=192,i.child=t.child,i=null):(t=k.treeContext,Jt=Ai(L.nextSibling),Un=i,Et=!0,ka=null,Ei=!1,t!==null&&D0(i,t),i=Th(i,o.children),i.flags|=4096);return i}return f?(Ka(),L=o.fallback,f=i.mode,k=t.child,oe=k.sibling,o=ca(k,{mode:"hidden",children:o.children}),o.subtreeFlags=k.subtreeFlags&65011712,oe!==null?L=ca(oe,L):(L=Ps(L,f,r,null),L.flags|=2),L.return=i,o.return=i,o.sibling=L,i.child=o,$o(null,o),o=i.child,L=t.child.memoizedState,L===null?L=Mh(r):(f=L.cachePool,f!==null?(k=gn._currentValue,f=f.parent!==k?{parent:k,pool:k}:f):f=z0(),L={baseLanes:L.baseLanes|r,cachePool:f}),o.memoizedState=L,o.childLanes=Eh(t,b,r),i.memoizedState=bh,$o(t.child,o)):(Za(i),r=t.child,t=r.sibling,r=ca(r,{mode:"visible",children:o.children}),r.return=i,r.sibling=null,t!==null&&(b=i.deletions,b===null?(i.deletions=[t],i.flags|=16):b.push(t)),i.child=r,i.memoizedState=null,r)}function Th(t,i){return i=Rc({mode:"visible",children:i},t.mode),i.return=t,t.child=i}function Rc(t,i){return t=ci(22,t,null,i),t.lanes=0,t}function Ah(t,i,r){return Vs(i,t.child,null,r),t=Th(i,i.pendingProps.children),t.flags|=2,i.memoizedState=null,t}function Zg(t,i,r){t.lanes|=i;var o=t.alternate;o!==null&&(o.lanes|=i),Gf(t.return,i,r)}function wh(t,i,r,o,f,h){var b=t.memoizedState;b===null?t.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:o,tail:r,tailMode:f,treeForkCount:h}:(b.isBackwards=i,b.rendering=null,b.renderingStartTime=0,b.last=o,b.tail=r,b.tailMode=f,b.treeForkCount=h)}function Kg(t,i,r){var o=i.pendingProps,f=o.revealOrder,h=o.tail;o=o.children;var b=dn.current,L=(b&2)!==0;if(L?(b=b&1|2,i.flags|=128):b&=1,ye(dn,b),Pn(t,i,o,r),o=Et?Ho:0,!L&&t!==null&&(t.flags&128)!==0)e:for(t=i.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Zg(t,r,i);else if(t.tag===19)Zg(t,r,i);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===i)break e;for(;t.sibling===null;){if(t.return===null||t.return===i)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(f){case"forwards":for(r=i.child,f=null;r!==null;)t=r.alternate,t!==null&&gc(t)===null&&(f=r),r=r.sibling;r=f,r===null?(f=i.child,i.child=null):(f=r.sibling,r.sibling=null),wh(i,!1,f,r,h,o);break;case"backwards":case"unstable_legacy-backwards":for(r=null,f=i.child,i.child=null;f!==null;){if(t=f.alternate,t!==null&&gc(t)===null){i.child=f;break}t=f.sibling,f.sibling=r,r=f,f=t}wh(i,!0,r,null,h,o);break;case"together":wh(i,!1,null,null,void 0,o);break;default:i.memoizedState=null}return i.child}function ma(t,i,r){if(t!==null&&(i.dependencies=t.dependencies),$a|=i.lanes,(r&i.childLanes)===0)if(t!==null){if(Tr(t,i,r,!1),(r&i.childLanes)===0)return null}else return null;if(t!==null&&i.child!==t.child)throw Error(s(153));if(i.child!==null){for(t=i.child,r=ca(t,t.pendingProps),i.child=r,r.return=i;t.sibling!==null;)t=t.sibling,r=r.sibling=ca(t,t.pendingProps),r.return=i;r.sibling=null}return i.child}function Rh(t,i){return(t.lanes&i)!==0?!0:(t=t.dependencies,!!(t!==null&&lc(t)))}function Kb(t,i,r){switch(i.tag){case 3:me(i,i.stateNode.containerInfo),Xa(i,gn,t.memoizedState.cache),zs();break;case 27:case 5:Ke(i);break;case 4:me(i,i.stateNode.containerInfo);break;case 10:Xa(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,$f(i),null;break;case 13:var o=i.memoizedState;if(o!==null)return o.dehydrated!==null?(Za(i),i.flags|=128,null):(r&i.child.childLanes)!==0?Yg(t,i,r):(Za(i),t=ma(t,i,r),t!==null?t.sibling:null);Za(i);break;case 19:var f=(t.flags&128)!==0;if(o=(r&i.childLanes)!==0,o||(Tr(t,i,r,!1),o=(r&i.childLanes)!==0),f){if(o)return Kg(t,i,r);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),ye(dn,dn.current),o)break;return null;case 22:return i.lanes=0,Vg(t,i,r,i.pendingProps);case 24:Xa(i,gn,t.memoizedState.cache)}return ma(t,i,r)}function Qg(t,i,r){if(t!==null)if(t.memoizedProps!==i.pendingProps)xn=!0;else{if(!Rh(t,r)&&(i.flags&128)===0)return xn=!1,Kb(t,i,r);xn=(t.flags&131072)!==0}else xn=!1,Et&&(i.flags&1048576)!==0&&C0(i,Ho,i.index);switch(i.lanes=0,i.tag){case 16:e:{var o=i.pendingProps;if(t=Hs(i.elementType),i.type=t,typeof t=="function")Uf(t)?(o=js(t,o),i.tag=1,i=Wg(null,i,t,o,r)):(i.tag=0,i=Sh(null,i,t,o,r));else{if(t!=null){var f=t.$$typeof;if(f===C){i.tag=11,i=Bg(null,i,t,o,r);break e}else if(f===z){i.tag=14,i=Hg(null,i,t,o,r);break e}}throw i=ae(t)||t,Error(s(306,i,""))}}return i;case 0:return Sh(t,i,i.type,i.pendingProps,r);case 1:return o=i.type,f=js(o,i.pendingProps),Wg(t,i,o,f,r);case 3:e:{if(me(i,i.stateNode.containerInfo),t===null)throw Error(s(387));o=i.pendingProps;var h=i.memoizedState;f=h.element,Yf(t,i),Yo(i,o,null,r);var b=i.memoizedState;if(o=b.cache,Xa(i,gn,o),o!==h.cache&&Vf(i,[gn],r,!0),qo(),o=b.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:b.cache},i.updateQueue.baseState=h,i.memoizedState=h,i.flags&256){i=qg(t,i,o,r);break e}else if(o!==f){f=Si(Error(s(424)),i),Go(f),i=qg(t,i,o,r);break e}else{switch(t=i.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Jt=Ai(t.firstChild),Un=i,Et=!0,ka=null,Ei=!0,r=V0(i,null,o,r),i.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling}else{if(zs(),o===f){i=ma(t,i,r);break e}Pn(t,i,o,r)}i=i.child}return i;case 26:return wc(t,i),t===null?(r=lx(i.type,null,i.pendingProps,null))?i.memoizedState=r:Et||(r=i.type,t=i.pendingProps,o=jc(te.current).createElement(r),o[hn]=i,o[Ln]=t,zn(o,r,t),mn(o),i.stateNode=o):i.memoizedState=lx(i.type,t.memoizedProps,i.pendingProps,t.memoizedState),null;case 27:return Ke(i),t===null&&Et&&(o=i.stateNode=sx(i.type,i.pendingProps,te.current),Un=i,Ei=!0,f=Jt,as(i.type)?(od=f,Jt=Ai(o.firstChild)):Jt=f),Pn(t,i,i.pendingProps.children,r),wc(t,i),t===null&&(i.flags|=4194304),i.child;case 5:return t===null&&Et&&((f=o=Jt)&&(o=AM(o,i.type,i.pendingProps,Ei),o!==null?(i.stateNode=o,Un=i,Jt=Ai(o.firstChild),Ei=!1,f=!0):f=!1),f||ja(i)),Ke(i),f=i.type,h=i.pendingProps,b=t!==null?t.memoizedProps:null,o=h.children,nd(f,h)?o=null:b!==null&&nd(f,b)&&(i.flags|=32),i.memoizedState!==null&&(f=th(t,i,Gb,null,null,r),pl._currentValue=f),wc(t,i),Pn(t,i,o,r),i.child;case 6:return t===null&&Et&&((t=r=Jt)&&(r=wM(r,i.pendingProps,Ei),r!==null?(i.stateNode=r,Un=i,Jt=null,t=!0):t=!1),t||ja(i)),null;case 13:return Yg(t,i,r);case 4:return me(i,i.stateNode.containerInfo),o=i.pendingProps,t===null?i.child=Vs(i,null,o,r):Pn(t,i,o,r),i.child;case 11:return Bg(t,i,i.type,i.pendingProps,r);case 7:return Pn(t,i,i.pendingProps,r),i.child;case 8:return Pn(t,i,i.pendingProps.children,r),i.child;case 12:return Pn(t,i,i.pendingProps.children,r),i.child;case 10:return o=i.pendingProps,Xa(i,i.type,o.value),Pn(t,i,o.children,r),i.child;case 9:return f=i.type._context,o=i.pendingProps.children,Fs(i),f=On(f),o=o(f),i.flags|=1,Pn(t,i,o,r),i.child;case 14:return Hg(t,i,i.type,i.pendingProps,r);case 15:return Gg(t,i,i.type,i.pendingProps,r);case 19:return Kg(t,i,r);case 31:return Zb(t,i,r);case 22:return Vg(t,i,r,i.pendingProps);case 24:return Fs(i),o=On(gn),t===null?(f=Xf(),f===null&&(f=Kt,h=kf(),f.pooledCache=h,h.refCount++,h!==null&&(f.pooledCacheLanes|=r),f=h),i.memoizedState={parent:o,cache:f},qf(i),Xa(i,gn,f)):((t.lanes&r)!==0&&(Yf(t,i),Yo(i,null,null,r),qo()),f=t.memoizedState,h=i.memoizedState,f.parent!==o?(f={parent:o,cache:o},i.memoizedState=f,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=f),Xa(i,gn,o)):(o=h.cache,Xa(i,gn,o),o!==f.cache&&Vf(i,[gn],r,!0))),Pn(t,i,i.pendingProps.children,r),i.child;case 29:throw i.pendingProps}throw Error(s(156,i.tag))}function ga(t){t.flags|=4}function Ch(t,i,r,o,f){if((i=(t.mode&32)!==0)&&(i=!1),i){if(t.flags|=16777216,(f&335544128)===f)if(t.stateNode.complete)t.flags|=8192;else if(E_())t.flags|=8192;else throw Gs=hc,Wf}else t.flags&=-16777217}function Jg(t,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!dx(i))if(E_())t.flags|=8192;else throw Gs=hc,Wf}function Cc(t,i){i!==null&&(t.flags|=4),t.flags&16384&&(i=t.tag!==22?we():536870912,t.lanes|=i,Ir|=i)}function el(t,i){if(!Et)switch(t.tailMode){case"hidden":i=t.tail;for(var r=null;i!==null;)i.alternate!==null&&(r=i),i=i.sibling;r===null?t.tail=null:r.sibling=null;break;case"collapsed":r=t.tail;for(var o=null;r!==null;)r.alternate!==null&&(o=r),r=r.sibling;o===null?i||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function $t(t){var i=t.alternate!==null&&t.alternate.child===t.child,r=0,o=0;if(i)for(var f=t.child;f!==null;)r|=f.lanes|f.childLanes,o|=f.subtreeFlags&65011712,o|=f.flags&65011712,f.return=t,f=f.sibling;else for(f=t.child;f!==null;)r|=f.lanes|f.childLanes,o|=f.subtreeFlags,o|=f.flags,f.return=t,f=f.sibling;return t.subtreeFlags|=o,t.childLanes=r,i}function Qb(t,i,r){var o=i.pendingProps;switch(If(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return $t(i),null;case 1:return $t(i),null;case 3:return r=i.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),i.memoizedState.cache!==o&&(i.flags|=2048),ha(gn),Ae(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Er(i)?ga(i):t===null||t.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,Bf())),$t(i),null;case 26:var f=i.type,h=i.memoizedState;return t===null?(ga(i),h!==null?($t(i),Jg(i,h)):($t(i),Ch(i,f,null,o,r))):h?h!==t.memoizedState?(ga(i),$t(i),Jg(i,h)):($t(i),i.flags&=-16777217):(t=t.memoizedProps,t!==o&&ga(i),$t(i),Ch(i,f,t,o,r)),null;case 27:if(Ye(i),r=te.current,f=i.type,t!==null&&i.stateNode!=null)t.memoizedProps!==o&&ga(i);else{if(!o){if(i.stateNode===null)throw Error(s(166));return $t(i),null}t=ee.current,Er(i)?N0(i):(t=sx(f,o,r),i.stateNode=t,ga(i))}return $t(i),null;case 5:if(Ye(i),f=i.type,t!==null&&i.stateNode!=null)t.memoizedProps!==o&&ga(i);else{if(!o){if(i.stateNode===null)throw Error(s(166));return $t(i),null}if(h=ee.current,Er(i))N0(i);else{var b=jc(te.current);switch(h){case 1:h=b.createElementNS("http://www.w3.org/2000/svg",f);break;case 2:h=b.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;default:switch(f){case"svg":h=b.createElementNS("http://www.w3.org/2000/svg",f);break;case"math":h=b.createElementNS("http://www.w3.org/1998/Math/MathML",f);break;case"script":h=b.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?b.createElement("select",{is:o.is}):b.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?b.createElement(f,{is:o.is}):b.createElement(f)}}h[hn]=i,h[Ln]=o;e:for(b=i.child;b!==null;){if(b.tag===5||b.tag===6)h.appendChild(b.stateNode);else if(b.tag!==4&&b.tag!==27&&b.child!==null){b.child.return=b,b=b.child;continue}if(b===i)break e;for(;b.sibling===null;){if(b.return===null||b.return===i)break e;b=b.return}b.sibling.return=b.return,b=b.sibling}i.stateNode=h;e:switch(zn(h,f,o),f){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&ga(i)}}return $t(i),Ch(i,i.type,t===null?null:t.memoizedProps,i.pendingProps,r),null;case 6:if(t&&i.stateNode!=null)t.memoizedProps!==o&&ga(i);else{if(typeof o!="string"&&i.stateNode===null)throw Error(s(166));if(t=te.current,Er(i)){if(t=i.stateNode,r=i.memoizedProps,o=null,f=Un,f!==null)switch(f.tag){case 27:case 5:o=f.memoizedProps}t[hn]=i,t=!!(t.nodeValue===r||o!==null&&o.suppressHydrationWarning===!0||Y_(t.nodeValue,r)),t||ja(i,!0)}else t=jc(t).createTextNode(o),t[hn]=i,i.stateNode=t}return $t(i),null;case 31:if(r=i.memoizedState,t===null||t.memoizedState!==null){if(o=Er(i),r!==null){if(t===null){if(!o)throw Error(s(318));if(t=i.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[hn]=i}else zs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;$t(i),t=!1}else r=Bf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=r),t=!0;if(!t)return i.flags&256?(fi(i),i):(fi(i),null);if((i.flags&128)!==0)throw Error(s(558))}return $t(i),null;case 13:if(o=i.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(f=Er(i),o!==null&&o.dehydrated!==null){if(t===null){if(!f)throw Error(s(318));if(f=i.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(s(317));f[hn]=i}else zs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;$t(i),f=!1}else f=Bf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=f),f=!0;if(!f)return i.flags&256?(fi(i),i):(fi(i),null)}return fi(i),(i.flags&128)!==0?(i.lanes=r,i):(r=o!==null,t=t!==null&&t.memoizedState!==null,r&&(o=i.child,f=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(f=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==f&&(o.flags|=2048)),r!==t&&r&&(i.child.flags|=8192),Cc(i,i.updateQueue),$t(i),null);case 4:return Ae(),t===null&&Qh(i.stateNode.containerInfo),$t(i),null;case 10:return ha(i.type),$t(i),null;case 19:if(K(dn),o=i.memoizedState,o===null)return $t(i),null;if(f=(i.flags&128)!==0,h=o.rendering,h===null)if(f)el(o,!1);else{if(cn!==0||t!==null&&(t.flags&128)!==0)for(t=i.child;t!==null;){if(h=gc(t),h!==null){for(i.flags|=128,el(o,!1),t=h.updateQueue,i.updateQueue=t,Cc(i,t),i.subtreeFlags=0,t=r,r=i.child;r!==null;)A0(r,t),r=r.sibling;return ye(dn,dn.current&1|2),Et&&ua(i,o.treeForkCount),i.child}t=t.sibling}o.tail!==null&&De()>Oc&&(i.flags|=128,f=!0,el(o,!1),i.lanes=4194304)}else{if(!f)if(t=gc(h),t!==null){if(i.flags|=128,f=!0,t=t.updateQueue,i.updateQueue=t,Cc(i,t),el(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!Et)return $t(i),null}else 2*De()-o.renderingStartTime>Oc&&r!==536870912&&(i.flags|=128,f=!0,el(o,!1),i.lanes=4194304);o.isBackwards?(h.sibling=i.child,i.child=h):(t=o.last,t!==null?t.sibling=h:i.child=h,o.last=h)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=De(),t.sibling=null,r=dn.current,ye(dn,f?r&1|2:r&1),Et&&ua(i,o.treeForkCount),t):($t(i),null);case 22:case 23:return fi(i),Jf(),o=i.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(i.flags|=8192):o&&(i.flags|=8192),o?(r&536870912)!==0&&(i.flags&128)===0&&($t(i),i.subtreeFlags&6&&(i.flags|=8192)):$t(i),r=i.updateQueue,r!==null&&Cc(i,r.retryQueue),r=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),o=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(o=i.memoizedState.cachePool.pool),o!==r&&(i.flags|=2048),t!==null&&K(Bs),null;case 24:return r=null,t!==null&&(r=t.memoizedState.cache),i.memoizedState.cache!==r&&(i.flags|=2048),ha(gn),$t(i),null;case 25:return null;case 30:return null}throw Error(s(156,i.tag))}function Jb(t,i){switch(If(i),i.tag){case 1:return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 3:return ha(gn),Ae(),t=i.flags,(t&65536)!==0&&(t&128)===0?(i.flags=t&-65537|128,i):null;case 26:case 27:case 5:return Ye(i),null;case 31:if(i.memoizedState!==null){if(fi(i),i.alternate===null)throw Error(s(340));zs()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 13:if(fi(i),t=i.memoizedState,t!==null&&t.dehydrated!==null){if(i.alternate===null)throw Error(s(340));zs()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 19:return K(dn),null;case 4:return Ae(),null;case 10:return ha(i.type),null;case 22:case 23:return fi(i),Jf(),t!==null&&K(Bs),t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 24:return ha(gn),null;case 25:return null;default:return null}}function $g(t,i){switch(If(i),i.tag){case 3:ha(gn),Ae();break;case 26:case 27:case 5:Ye(i);break;case 4:Ae();break;case 31:i.memoizedState!==null&&fi(i);break;case 13:fi(i);break;case 19:K(dn);break;case 10:ha(i.type);break;case 22:case 23:fi(i),Jf(),t!==null&&K(Bs);break;case 24:ha(gn)}}function tl(t,i){try{var r=i.updateQueue,o=r!==null?r.lastEffect:null;if(o!==null){var f=o.next;r=f;do{if((r.tag&t)===t){o=void 0;var h=r.create,b=r.inst;o=h(),b.destroy=o}r=r.next}while(r!==f)}}catch(L){Ht(i,i.return,L)}}function Qa(t,i,r){try{var o=i.updateQueue,f=o!==null?o.lastEffect:null;if(f!==null){var h=f.next;o=h;do{if((o.tag&t)===t){var b=o.inst,L=b.destroy;if(L!==void 0){b.destroy=void 0,f=i;var k=r,oe=L;try{oe()}catch(ve){Ht(f,k,ve)}}}o=o.next}while(o!==h)}}catch(ve){Ht(i,i.return,ve)}}function e_(t){var i=t.updateQueue;if(i!==null){var r=t.stateNode;try{j0(i,r)}catch(o){Ht(t,t.return,o)}}}function t_(t,i,r){r.props=js(t.type,t.memoizedProps),r.state=t.memoizedState;try{r.componentWillUnmount()}catch(o){Ht(t,i,o)}}function nl(t,i){try{var r=t.ref;if(r!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof r=="function"?t.refCleanup=r(o):r.current=o}}catch(f){Ht(t,i,f)}}function ji(t,i){var r=t.ref,o=t.refCleanup;if(r!==null)if(typeof o=="function")try{o()}catch(f){Ht(t,i,f)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof r=="function")try{r(null)}catch(f){Ht(t,i,f)}else r.current=null}function n_(t){var i=t.type,r=t.memoizedProps,o=t.stateNode;try{e:switch(i){case"button":case"input":case"select":case"textarea":r.autoFocus&&o.focus();break e;case"img":r.src?o.src=r.src:r.srcSet&&(o.srcset=r.srcSet)}}catch(f){Ht(t,t.return,f)}}function Dh(t,i,r){try{var o=t.stateNode;yM(o,t.type,r,i),o[Ln]=i}catch(f){Ht(t,t.return,f)}}function i_(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&as(t.type)||t.tag===4}function Nh(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||i_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&as(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Lh(t,i,r){var o=t.tag;if(o===5||o===6)t=t.stateNode,i?(r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r).insertBefore(t,i):(i=r.nodeType===9?r.body:r.nodeName==="HTML"?r.ownerDocument.body:r,i.appendChild(t),r=r._reactRootContainer,r!=null||i.onclick!==null||(i.onclick=oa));else if(o!==4&&(o===27&&as(t.type)&&(r=t.stateNode,i=null),t=t.child,t!==null))for(Lh(t,i,r),t=t.sibling;t!==null;)Lh(t,i,r),t=t.sibling}function Dc(t,i,r){var o=t.tag;if(o===5||o===6)t=t.stateNode,i?r.insertBefore(t,i):r.appendChild(t);else if(o!==4&&(o===27&&as(t.type)&&(r=t.stateNode),t=t.child,t!==null))for(Dc(t,i,r),t=t.sibling;t!==null;)Dc(t,i,r),t=t.sibling}function a_(t){var i=t.stateNode,r=t.memoizedProps;try{for(var o=t.type,f=i.attributes;f.length;)i.removeAttributeNode(f[0]);zn(i,o,r),i[hn]=t,i[Ln]=r}catch(h){Ht(t,t.return,h)}}var _a=!1,vn=!1,Uh=!1,s_=typeof WeakSet=="function"?WeakSet:Set,wn=null;function $b(t,i){if(t=t.containerInfo,ed=Qc,t=_0(t),Af(t)){if("selectionStart"in t)var r={start:t.selectionStart,end:t.selectionEnd};else e:{r=(r=t.ownerDocument)&&r.defaultView||window;var o=r.getSelection&&r.getSelection();if(o&&o.rangeCount!==0){r=o.anchorNode;var f=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{r.nodeType,h.nodeType}catch{r=null;break e}var b=0,L=-1,k=-1,oe=0,ve=0,Te=t,fe=null;t:for(;;){for(var de;Te!==r||f!==0&&Te.nodeType!==3||(L=b+f),Te!==h||o!==0&&Te.nodeType!==3||(k=b+o),Te.nodeType===3&&(b+=Te.nodeValue.length),(de=Te.firstChild)!==null;)fe=Te,Te=de;for(;;){if(Te===t)break t;if(fe===r&&++oe===f&&(L=b),fe===h&&++ve===o&&(k=b),(de=Te.nextSibling)!==null)break;Te=fe,fe=Te.parentNode}Te=de}r=L===-1||k===-1?null:{start:L,end:k}}else r=null}r=r||{start:0,end:0}}else r=null;for(td={focusedElem:t,selectionRange:r},Qc=!1,wn=i;wn!==null;)if(i=wn,t=i.child,(i.subtreeFlags&1028)!==0&&t!==null)t.return=i,wn=t;else for(;wn!==null;){switch(i=wn,h=i.alternate,t=i.flags,i.tag){case 0:if((t&4)!==0&&(t=i.updateQueue,t=t!==null?t.events:null,t!==null))for(r=0;r<t.length;r++)f=t[r],f.ref.impl=f.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&h!==null){t=void 0,r=i,f=h.memoizedProps,h=h.memoizedState,o=r.stateNode;try{var We=js(r.type,f);t=o.getSnapshotBeforeUpdate(We,h),o.__reactInternalSnapshotBeforeUpdate=t}catch(et){Ht(r,r.return,et)}}break;case 3:if((t&1024)!==0){if(t=i.stateNode.containerInfo,r=t.nodeType,r===9)ad(t);else if(r===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":ad(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=i.sibling,t!==null){t.return=i.return,wn=t;break}wn=i.return}}function r_(t,i,r){var o=r.flags;switch(r.tag){case 0:case 11:case 15:va(t,r),o&4&&tl(5,r);break;case 1:if(va(t,r),o&4)if(t=r.stateNode,i===null)try{t.componentDidMount()}catch(b){Ht(r,r.return,b)}else{var f=js(r.type,i.memoizedProps);i=i.memoizedState;try{t.componentDidUpdate(f,i,t.__reactInternalSnapshotBeforeUpdate)}catch(b){Ht(r,r.return,b)}}o&64&&e_(r),o&512&&nl(r,r.return);break;case 3:if(va(t,r),o&64&&(t=r.updateQueue,t!==null)){if(i=null,r.child!==null)switch(r.child.tag){case 27:case 5:i=r.child.stateNode;break;case 1:i=r.child.stateNode}try{j0(t,i)}catch(b){Ht(r,r.return,b)}}break;case 27:i===null&&o&4&&a_(r);case 26:case 5:va(t,r),i===null&&o&4&&n_(r),o&512&&nl(r,r.return);break;case 12:va(t,r);break;case 31:va(t,r),o&4&&c_(t,r);break;case 13:va(t,r),o&4&&u_(t,r),o&64&&(t=r.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(r=lM.bind(null,r),RM(t,r))));break;case 22:if(o=r.memoizedState!==null||_a,!o){i=i!==null&&i.memoizedState!==null||vn,f=_a;var h=vn;_a=o,(vn=i)&&!h?ya(t,r,(r.subtreeFlags&8772)!==0):va(t,r),_a=f,vn=h}break;case 30:break;default:va(t,r)}}function o_(t){var i=t.alternate;i!==null&&(t.alternate=null,o_(i)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(i=t.stateNode,i!==null&&Do(i)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var an=null,Qn=!1;function xa(t,i,r){for(r=r.child;r!==null;)l_(t,i,r),r=r.sibling}function l_(t,i,r){if(xe&&typeof xe.onCommitFiberUnmount=="function")try{xe.onCommitFiberUnmount(_e,r)}catch{}switch(r.tag){case 26:vn||ji(r,i),xa(t,i,r),r.memoizedState?r.memoizedState.count--:r.stateNode&&(r=r.stateNode,r.parentNode.removeChild(r));break;case 27:vn||ji(r,i);var o=an,f=Qn;as(r.type)&&(an=r.stateNode,Qn=!1),xa(t,i,r),fl(r.stateNode),an=o,Qn=f;break;case 5:vn||ji(r,i);case 6:if(o=an,f=Qn,an=null,xa(t,i,r),an=o,Qn=f,an!==null)if(Qn)try{(an.nodeType===9?an.body:an.nodeName==="HTML"?an.ownerDocument.body:an).removeChild(r.stateNode)}catch(h){Ht(r,i,h)}else try{an.removeChild(r.stateNode)}catch(h){Ht(r,i,h)}break;case 18:an!==null&&(Qn?(t=an,ex(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,r.stateNode),Xr(t)):ex(an,r.stateNode));break;case 4:o=an,f=Qn,an=r.stateNode.containerInfo,Qn=!0,xa(t,i,r),an=o,Qn=f;break;case 0:case 11:case 14:case 15:Qa(2,r,i),vn||Qa(4,r,i),xa(t,i,r);break;case 1:vn||(ji(r,i),o=r.stateNode,typeof o.componentWillUnmount=="function"&&t_(r,i,o)),xa(t,i,r);break;case 21:xa(t,i,r);break;case 22:vn=(o=vn)||r.memoizedState!==null,xa(t,i,r),vn=o;break;default:xa(t,i,r)}}function c_(t,i){if(i.memoizedState===null&&(t=i.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Xr(t)}catch(r){Ht(i,i.return,r)}}}function u_(t,i){if(i.memoizedState===null&&(t=i.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Xr(t)}catch(r){Ht(i,i.return,r)}}function eM(t){switch(t.tag){case 31:case 13:case 19:var i=t.stateNode;return i===null&&(i=t.stateNode=new s_),i;case 22:return t=t.stateNode,i=t._retryCache,i===null&&(i=t._retryCache=new s_),i;default:throw Error(s(435,t.tag))}}function Nc(t,i){var r=eM(t);i.forEach(function(o){if(!r.has(o)){r.add(o);var f=cM.bind(null,t,o);o.then(f,f)}})}function Jn(t,i){var r=i.deletions;if(r!==null)for(var o=0;o<r.length;o++){var f=r[o],h=t,b=i,L=b;e:for(;L!==null;){switch(L.tag){case 27:if(as(L.type)){an=L.stateNode,Qn=!1;break e}break;case 5:an=L.stateNode,Qn=!1;break e;case 3:case 4:an=L.stateNode.containerInfo,Qn=!0;break e}L=L.return}if(an===null)throw Error(s(160));l_(h,b,f),an=null,Qn=!1,h=f.alternate,h!==null&&(h.return=null),f.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)f_(i,t),i=i.sibling}var Oi=null;function f_(t,i){var r=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Jn(i,t),$n(t),o&4&&(Qa(3,t,t.return),tl(3,t),Qa(5,t,t.return));break;case 1:Jn(i,t),$n(t),o&512&&(vn||r===null||ji(r,r.return)),o&64&&_a&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(r=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=r===null?o:r.concat(o))));break;case 26:var f=Oi;if(Jn(i,t),$n(t),o&512&&(vn||r===null||ji(r,r.return)),o&4){var h=r!==null?r.memoizedState:null;if(o=t.memoizedState,r===null)if(o===null)if(t.stateNode===null){e:{o=t.type,r=t.memoizedProps,f=f.ownerDocument||f;t:switch(o){case"title":h=f.getElementsByTagName("title")[0],(!h||h[za]||h[hn]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=f.createElement(o),f.head.insertBefore(h,f.querySelector("head > title"))),zn(h,o,r),h[hn]=t,mn(h),o=h;break e;case"link":var b=fx("link","href",f).get(o+(r.href||""));if(b){for(var L=0;L<b.length;L++)if(h=b[L],h.getAttribute("href")===(r.href==null||r.href===""?null:r.href)&&h.getAttribute("rel")===(r.rel==null?null:r.rel)&&h.getAttribute("title")===(r.title==null?null:r.title)&&h.getAttribute("crossorigin")===(r.crossOrigin==null?null:r.crossOrigin)){b.splice(L,1);break t}}h=f.createElement(o),zn(h,o,r),f.head.appendChild(h);break;case"meta":if(b=fx("meta","content",f).get(o+(r.content||""))){for(L=0;L<b.length;L++)if(h=b[L],h.getAttribute("content")===(r.content==null?null:""+r.content)&&h.getAttribute("name")===(r.name==null?null:r.name)&&h.getAttribute("property")===(r.property==null?null:r.property)&&h.getAttribute("http-equiv")===(r.httpEquiv==null?null:r.httpEquiv)&&h.getAttribute("charset")===(r.charSet==null?null:r.charSet)){b.splice(L,1);break t}}h=f.createElement(o),zn(h,o,r),f.head.appendChild(h);break;default:throw Error(s(468,o))}h[hn]=t,mn(h),o=h}t.stateNode=o}else hx(f,t.type,t.stateNode);else t.stateNode=ux(f,o,t.memoizedProps);else h!==o?(h===null?r.stateNode!==null&&(r=r.stateNode,r.parentNode.removeChild(r)):h.count--,o===null?hx(f,t.type,t.stateNode):ux(f,o,t.memoizedProps)):o===null&&t.stateNode!==null&&Dh(t,t.memoizedProps,r.memoizedProps)}break;case 27:Jn(i,t),$n(t),o&512&&(vn||r===null||ji(r,r.return)),r!==null&&o&4&&Dh(t,t.memoizedProps,r.memoizedProps);break;case 5:if(Jn(i,t),$n(t),o&512&&(vn||r===null||ji(r,r.return)),t.flags&32){f=t.stateNode;try{oi(f,"")}catch(We){Ht(t,t.return,We)}}o&4&&t.stateNode!=null&&(f=t.memoizedProps,Dh(t,f,r!==null?r.memoizedProps:f)),o&1024&&(Uh=!0);break;case 6:if(Jn(i,t),$n(t),o&4){if(t.stateNode===null)throw Error(s(162));o=t.memoizedProps,r=t.stateNode;try{r.nodeValue=o}catch(We){Ht(t,t.return,We)}}break;case 3:if(qc=null,f=Oi,Oi=Xc(i.containerInfo),Jn(i,t),Oi=f,$n(t),o&4&&r!==null&&r.memoizedState.isDehydrated)try{Xr(i.containerInfo)}catch(We){Ht(t,t.return,We)}Uh&&(Uh=!1,h_(t));break;case 4:o=Oi,Oi=Xc(t.stateNode.containerInfo),Jn(i,t),$n(t),Oi=o;break;case 12:Jn(i,t),$n(t);break;case 31:Jn(i,t),$n(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Nc(t,o)));break;case 13:Jn(i,t),$n(t),t.child.flags&8192&&t.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(Uc=De()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Nc(t,o)));break;case 22:f=t.memoizedState!==null;var k=r!==null&&r.memoizedState!==null,oe=_a,ve=vn;if(_a=oe||f,vn=ve||k,Jn(i,t),vn=ve,_a=oe,$n(t),o&8192)e:for(i=t.stateNode,i._visibility=f?i._visibility&-2:i._visibility|1,f&&(r===null||k||_a||vn||Xs(t)),r=null,i=t;;){if(i.tag===5||i.tag===26){if(r===null){k=r=i;try{if(h=k.stateNode,f)b=h.style,typeof b.setProperty=="function"?b.setProperty("display","none","important"):b.display="none";else{L=k.stateNode;var Te=k.memoizedProps.style,fe=Te!=null&&Te.hasOwnProperty("display")?Te.display:null;L.style.display=fe==null||typeof fe=="boolean"?"":(""+fe).trim()}}catch(We){Ht(k,k.return,We)}}}else if(i.tag===6){if(r===null){k=i;try{k.stateNode.nodeValue=f?"":k.memoizedProps}catch(We){Ht(k,k.return,We)}}}else if(i.tag===18){if(r===null){k=i;try{var de=k.stateNode;f?tx(de,!0):tx(k.stateNode,!1)}catch(We){Ht(k,k.return,We)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===t)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break e;for(;i.sibling===null;){if(i.return===null||i.return===t)break e;r===i&&(r=null),i=i.return}r===i&&(r=null),i.sibling.return=i.return,i=i.sibling}o&4&&(o=t.updateQueue,o!==null&&(r=o.retryQueue,r!==null&&(o.retryQueue=null,Nc(t,r))));break;case 19:Jn(i,t),$n(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Nc(t,o)));break;case 30:break;case 21:break;default:Jn(i,t),$n(t)}}function $n(t){var i=t.flags;if(i&2){try{for(var r,o=t.return;o!==null;){if(i_(o)){r=o;break}o=o.return}if(r==null)throw Error(s(160));switch(r.tag){case 27:var f=r.stateNode,h=Nh(t);Dc(t,h,f);break;case 5:var b=r.stateNode;r.flags&32&&(oi(b,""),r.flags&=-33);var L=Nh(t);Dc(t,L,b);break;case 3:case 4:var k=r.stateNode.containerInfo,oe=Nh(t);Lh(t,oe,k);break;default:throw Error(s(161))}}catch(ve){Ht(t,t.return,ve)}t.flags&=-3}i&4096&&(t.flags&=-4097)}function h_(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var i=t;h_(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),t=t.sibling}}function va(t,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)r_(t,i.alternate,i),i=i.sibling}function Xs(t){for(t=t.child;t!==null;){var i=t;switch(i.tag){case 0:case 11:case 14:case 15:Qa(4,i,i.return),Xs(i);break;case 1:ji(i,i.return);var r=i.stateNode;typeof r.componentWillUnmount=="function"&&t_(i,i.return,r),Xs(i);break;case 27:fl(i.stateNode);case 26:case 5:ji(i,i.return),Xs(i);break;case 22:i.memoizedState===null&&Xs(i);break;case 30:Xs(i);break;default:Xs(i)}t=t.sibling}}function ya(t,i,r){for(r=r&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var o=i.alternate,f=t,h=i,b=h.flags;switch(h.tag){case 0:case 11:case 15:ya(f,h,r),tl(4,h);break;case 1:if(ya(f,h,r),o=h,f=o.stateNode,typeof f.componentDidMount=="function")try{f.componentDidMount()}catch(oe){Ht(o,o.return,oe)}if(o=h,f=o.updateQueue,f!==null){var L=o.stateNode;try{var k=f.shared.hiddenCallbacks;if(k!==null)for(f.shared.hiddenCallbacks=null,f=0;f<k.length;f++)k0(k[f],L)}catch(oe){Ht(o,o.return,oe)}}r&&b&64&&e_(h),nl(h,h.return);break;case 27:a_(h);case 26:case 5:ya(f,h,r),r&&o===null&&b&4&&n_(h),nl(h,h.return);break;case 12:ya(f,h,r);break;case 31:ya(f,h,r),r&&b&4&&c_(f,h);break;case 13:ya(f,h,r),r&&b&4&&u_(f,h);break;case 22:h.memoizedState===null&&ya(f,h,r),nl(h,h.return);break;case 30:break;default:ya(f,h,r)}i=i.sibling}}function Oh(t,i){var r=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),t=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(t=i.memoizedState.cachePool.pool),t!==r&&(t!=null&&t.refCount++,r!=null&&Vo(r))}function Ph(t,i){t=null,i.alternate!==null&&(t=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==t&&(i.refCount++,t!=null&&Vo(t))}function Pi(t,i,r,o){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)d_(t,i,r,o),i=i.sibling}function d_(t,i,r,o){var f=i.flags;switch(i.tag){case 0:case 11:case 15:Pi(t,i,r,o),f&2048&&tl(9,i);break;case 1:Pi(t,i,r,o);break;case 3:Pi(t,i,r,o),f&2048&&(t=null,i.alternate!==null&&(t=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==t&&(i.refCount++,t!=null&&Vo(t)));break;case 12:if(f&2048){Pi(t,i,r,o),t=i.stateNode;try{var h=i.memoizedProps,b=h.id,L=h.onPostCommit;typeof L=="function"&&L(b,i.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(k){Ht(i,i.return,k)}}else Pi(t,i,r,o);break;case 31:Pi(t,i,r,o);break;case 13:Pi(t,i,r,o);break;case 23:break;case 22:h=i.stateNode,b=i.alternate,i.memoizedState!==null?h._visibility&2?Pi(t,i,r,o):il(t,i):h._visibility&2?Pi(t,i,r,o):(h._visibility|=2,Or(t,i,r,o,(i.subtreeFlags&10256)!==0||!1)),f&2048&&Oh(b,i);break;case 24:Pi(t,i,r,o),f&2048&&Ph(i.alternate,i);break;default:Pi(t,i,r,o)}}function Or(t,i,r,o,f){for(f=f&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var h=t,b=i,L=r,k=o,oe=b.flags;switch(b.tag){case 0:case 11:case 15:Or(h,b,L,k,f),tl(8,b);break;case 23:break;case 22:var ve=b.stateNode;b.memoizedState!==null?ve._visibility&2?Or(h,b,L,k,f):il(h,b):(ve._visibility|=2,Or(h,b,L,k,f)),f&&oe&2048&&Oh(b.alternate,b);break;case 24:Or(h,b,L,k,f),f&&oe&2048&&Ph(b.alternate,b);break;default:Or(h,b,L,k,f)}i=i.sibling}}function il(t,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var r=t,o=i,f=o.flags;switch(o.tag){case 22:il(r,o),f&2048&&Oh(o.alternate,o);break;case 24:il(r,o),f&2048&&Ph(o.alternate,o);break;default:il(r,o)}i=i.sibling}}var al=8192;function Pr(t,i,r){if(t.subtreeFlags&al)for(t=t.child;t!==null;)p_(t,i,r),t=t.sibling}function p_(t,i,r){switch(t.tag){case 26:Pr(t,i,r),t.flags&al&&t.memoizedState!==null&&HM(r,Oi,t.memoizedState,t.memoizedProps);break;case 5:Pr(t,i,r);break;case 3:case 4:var o=Oi;Oi=Xc(t.stateNode.containerInfo),Pr(t,i,r),Oi=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=al,al=16777216,Pr(t,i,r),al=o):Pr(t,i,r));break;default:Pr(t,i,r)}}function m_(t){var i=t.alternate;if(i!==null&&(t=i.child,t!==null)){i.child=null;do i=t.sibling,t.sibling=null,t=i;while(t!==null)}}function sl(t){var i=t.deletions;if((t.flags&16)!==0){if(i!==null)for(var r=0;r<i.length;r++){var o=i[r];wn=o,__(o,t)}m_(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)g_(t),t=t.sibling}function g_(t){switch(t.tag){case 0:case 11:case 15:sl(t),t.flags&2048&&Qa(9,t,t.return);break;case 3:sl(t);break;case 12:sl(t);break;case 22:var i=t.stateNode;t.memoizedState!==null&&i._visibility&2&&(t.return===null||t.return.tag!==13)?(i._visibility&=-3,Lc(t)):sl(t);break;default:sl(t)}}function Lc(t){var i=t.deletions;if((t.flags&16)!==0){if(i!==null)for(var r=0;r<i.length;r++){var o=i[r];wn=o,__(o,t)}m_(t)}for(t=t.child;t!==null;){switch(i=t,i.tag){case 0:case 11:case 15:Qa(8,i,i.return),Lc(i);break;case 22:r=i.stateNode,r._visibility&2&&(r._visibility&=-3,Lc(i));break;default:Lc(i)}t=t.sibling}}function __(t,i){for(;wn!==null;){var r=wn;switch(r.tag){case 0:case 11:case 15:Qa(8,r,i);break;case 23:case 22:if(r.memoizedState!==null&&r.memoizedState.cachePool!==null){var o=r.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:Vo(r.memoizedState.cache)}if(o=r.child,o!==null)o.return=r,wn=o;else e:for(r=t;wn!==null;){o=wn;var f=o.sibling,h=o.return;if(o_(o),o===r){wn=null;break e}if(f!==null){f.return=h,wn=f;break e}wn=h}}}var tM={getCacheForType:function(t){var i=On(gn),r=i.data.get(t);return r===void 0&&(r=t(),i.data.set(t,r)),r},cacheSignal:function(){return On(gn).controller.signal}},nM=typeof WeakMap=="function"?WeakMap:Map,Lt=0,Kt=null,vt=null,bt=0,Bt=0,hi=null,Ja=!1,zr=!1,zh=!1,Sa=0,cn=0,$a=0,Ws=0,Ih=0,di=0,Ir=0,rl=null,ei=null,Fh=!1,Uc=0,x_=0,Oc=1/0,Pc=null,es=null,Mn=0,ts=null,Fr=null,ba=0,Bh=0,Hh=null,v_=null,ol=0,Gh=null;function pi(){return(Lt&2)!==0&&bt!==0?bt&-bt:O.T!==null?qh():wo()}function y_(){if(di===0)if((bt&536870912)===0||Et){var t=_t;_t<<=1,(_t&3932160)===0&&(_t=262144),di=t}else di=536870912;return t=ui.current,t!==null&&(t.flags|=32),di}function ti(t,i,r){(t===Kt&&(Bt===2||Bt===9)||t.cancelPendingCommit!==null)&&(Br(t,0),ns(t,bt,di,!1)),it(t,r),((Lt&2)===0||t!==Kt)&&(t===Kt&&((Lt&2)===0&&(Ws|=r),cn===4&&ns(t,bt,di,!1)),Xi(t))}function S_(t,i,r){if((Lt&6)!==0)throw Error(s(327));var o=!r&&(i&127)===0&&(i&t.expiredLanes)===0||He(t,i),f=o?sM(t,i):kh(t,i,!0),h=o;do{if(f===0){zr&&!o&&ns(t,i,0,!1);break}else{if(r=t.current.alternate,h&&!iM(r)){f=kh(t,i,!1),h=!1;continue}if(f===2){if(h=i,t.errorRecoveryDisabledLanes&h)var b=0;else b=t.pendingLanes&-536870913,b=b!==0?b:b&536870912?536870912:0;if(b!==0){i=b;e:{var L=t;f=rl;var k=L.current.memoizedState.isDehydrated;if(k&&(Br(L,b).flags|=256),b=kh(L,b,!1),b!==2){if(zh&&!k){L.errorRecoveryDisabledLanes|=h,Ws|=h,f=4;break e}h=ei,ei=f,h!==null&&(ei===null?ei=h:ei.push.apply(ei,h))}f=b}if(h=!1,f!==2)continue}}if(f===1){Br(t,0),ns(t,i,0,!0);break}e:{switch(o=t,h=f,h){case 0:case 1:throw Error(s(345));case 4:if((i&4194048)!==i)break;case 6:ns(o,i,di,!Ja);break e;case 2:ei=null;break;case 3:case 5:break;default:throw Error(s(329))}if((i&62914560)===i&&(f=Uc+300-De(),10<f)){if(ns(o,i,di,!Ja),Se(o,0,!0)!==0)break e;ba=i,o.timeoutHandle=J_(b_.bind(null,o,r,ei,Pc,Fh,i,di,Ws,Ir,Ja,h,"Throttled",-0,0),f);break e}b_(o,r,ei,Pc,Fh,i,di,Ws,Ir,Ja,h,null,-0,0)}}break}while(!0);Xi(t)}function b_(t,i,r,o,f,h,b,L,k,oe,ve,Te,fe,de){if(t.timeoutHandle=-1,Te=i.subtreeFlags,Te&8192||(Te&16785408)===16785408){Te={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:oa},p_(i,h,Te);var We=(h&62914560)===h?Uc-De():(h&4194048)===h?x_-De():0;if(We=GM(Te,We),We!==null){ba=h,t.cancelPendingCommit=We(D_.bind(null,t,i,h,r,o,f,b,L,k,ve,Te,null,fe,de)),ns(t,h,b,!oe);return}}D_(t,i,h,r,o,f,b,L,k)}function iM(t){for(var i=t;;){var r=i.tag;if((r===0||r===11||r===15)&&i.flags&16384&&(r=i.updateQueue,r!==null&&(r=r.stores,r!==null)))for(var o=0;o<r.length;o++){var f=r[o],h=f.getSnapshot;f=f.value;try{if(!li(h(),f))return!1}catch{return!1}}if(r=i.child,i.subtreeFlags&16384&&r!==null)r.return=i,i=r;else{if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function ns(t,i,r,o){i&=~Ih,i&=~Ws,t.suspendedLanes|=i,t.pingedLanes&=~i,o&&(t.warmLanes|=i),o=t.expirationTimes;for(var f=i;0<f;){var h=31-Ie(f),b=1<<h;o[h]=-1,f&=~b}r!==0&&Nt(t,r,i)}function zc(){return(Lt&6)===0?(ll(0),!1):!0}function Vh(){if(vt!==null){if(Bt===0)var t=vt.return;else t=vt,fa=Is=null,ah(t),Cr=null,jo=0,t=vt;for(;t!==null;)$g(t.alternate,t),t=t.return;vt=null}}function Br(t,i){var r=t.timeoutHandle;r!==-1&&(t.timeoutHandle=-1,MM(r)),r=t.cancelPendingCommit,r!==null&&(t.cancelPendingCommit=null,r()),ba=0,Vh(),Kt=t,vt=r=ca(t.current,null),bt=i,Bt=0,hi=null,Ja=!1,zr=He(t,i),zh=!1,Ir=di=Ih=Ws=$a=cn=0,ei=rl=null,Fh=!1,(i&8)!==0&&(i|=i&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=i;0<o;){var f=31-Ie(o),h=1<<f;i|=t[f],o&=~h}return Sa=i,ic(),r}function M_(t,i){ct=null,O.H=Jo,i===Rr||i===fc?(i=B0(),Bt=3):i===Wf?(i=B0(),Bt=4):Bt=i===yh?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,hi=i,vt===null&&(cn=1,Tc(t,Si(i,t.current)))}function E_(){var t=ui.current;return t===null?!0:(bt&4194048)===bt?Ti===null:(bt&62914560)===bt||(bt&536870912)!==0?t===Ti:!1}function T_(){var t=O.H;return O.H=Jo,t===null?Jo:t}function A_(){var t=O.A;return O.A=tM,t}function Ic(){cn=4,Ja||(bt&4194048)!==bt&&ui.current!==null||(zr=!0),($a&134217727)===0&&(Ws&134217727)===0||Kt===null||ns(Kt,bt,di,!1)}function kh(t,i,r){var o=Lt;Lt|=2;var f=T_(),h=A_();(Kt!==t||bt!==i)&&(Pc=null,Br(t,i)),i=!1;var b=cn;e:do try{if(Bt!==0&&vt!==null){var L=vt,k=hi;switch(Bt){case 8:Vh(),b=6;break e;case 3:case 2:case 9:case 6:ui.current===null&&(i=!0);var oe=Bt;if(Bt=0,hi=null,Hr(t,L,k,oe),r&&zr){b=0;break e}break;default:oe=Bt,Bt=0,hi=null,Hr(t,L,k,oe)}}aM(),b=cn;break}catch(ve){M_(t,ve)}while(!0);return i&&t.shellSuspendCounter++,fa=Is=null,Lt=o,O.H=f,O.A=h,vt===null&&(Kt=null,bt=0,ic()),b}function aM(){for(;vt!==null;)w_(vt)}function sM(t,i){var r=Lt;Lt|=2;var o=T_(),f=A_();Kt!==t||bt!==i?(Pc=null,Oc=De()+500,Br(t,i)):zr=He(t,i);e:do try{if(Bt!==0&&vt!==null){i=vt;var h=hi;t:switch(Bt){case 1:Bt=0,hi=null,Hr(t,i,h,1);break;case 2:case 9:if(I0(h)){Bt=0,hi=null,R_(i);break}i=function(){Bt!==2&&Bt!==9||Kt!==t||(Bt=7),Xi(t)},h.then(i,i);break e;case 3:Bt=7;break e;case 4:Bt=5;break e;case 7:I0(h)?(Bt=0,hi=null,R_(i)):(Bt=0,hi=null,Hr(t,i,h,7));break;case 5:var b=null;switch(vt.tag){case 26:b=vt.memoizedState;case 5:case 27:var L=vt;if(b?dx(b):L.stateNode.complete){Bt=0,hi=null;var k=L.sibling;if(k!==null)vt=k;else{var oe=L.return;oe!==null?(vt=oe,Fc(oe)):vt=null}break t}}Bt=0,hi=null,Hr(t,i,h,5);break;case 6:Bt=0,hi=null,Hr(t,i,h,6);break;case 8:Vh(),cn=6;break e;default:throw Error(s(462))}}rM();break}catch(ve){M_(t,ve)}while(!0);return fa=Is=null,O.H=o,O.A=f,Lt=r,vt!==null?0:(Kt=null,bt=0,ic(),cn)}function rM(){for(;vt!==null&&!gt();)w_(vt)}function w_(t){var i=Qg(t.alternate,t,Sa);t.memoizedProps=t.pendingProps,i===null?Fc(t):vt=i}function R_(t){var i=t,r=i.alternate;switch(i.tag){case 15:case 0:i=Xg(r,i,i.pendingProps,i.type,void 0,bt);break;case 11:i=Xg(r,i,i.pendingProps,i.type.render,i.ref,bt);break;case 5:ah(i);default:$g(r,i),i=vt=A0(i,Sa),i=Qg(r,i,Sa)}t.memoizedProps=t.pendingProps,i===null?Fc(t):vt=i}function Hr(t,i,r,o){fa=Is=null,ah(i),Cr=null,jo=0;var f=i.return;try{if(Yb(t,f,i,r,bt)){cn=1,Tc(t,Si(r,t.current)),vt=null;return}}catch(h){if(f!==null)throw vt=f,h;cn=1,Tc(t,Si(r,t.current)),vt=null;return}i.flags&32768?(Et||o===1?t=!0:zr||(bt&536870912)!==0?t=!1:(Ja=t=!0,(o===2||o===9||o===3||o===6)&&(o=ui.current,o!==null&&o.tag===13&&(o.flags|=16384))),C_(i,t)):Fc(i)}function Fc(t){var i=t;do{if((i.flags&32768)!==0){C_(i,Ja);return}t=i.return;var r=Qb(i.alternate,i,Sa);if(r!==null){vt=r;return}if(i=i.sibling,i!==null){vt=i;return}vt=i=t}while(i!==null);cn===0&&(cn=5)}function C_(t,i){do{var r=Jb(t.alternate,t);if(r!==null){r.flags&=32767,vt=r;return}if(r=t.return,r!==null&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!i&&(t=t.sibling,t!==null)){vt=t;return}vt=t=r}while(t!==null);cn=6,vt=null}function D_(t,i,r,o,f,h,b,L,k){t.cancelPendingCommit=null;do Bc();while(Mn!==0);if((Lt&6)!==0)throw Error(s(327));if(i!==null){if(i===t.current)throw Error(s(177));if(h=i.lanes|i.childLanes,h|=Nf,rn(t,r,h,b,L,k),t===Kt&&(vt=Kt=null,bt=0),Fr=i,ts=t,ba=r,Bh=h,Hh=f,v_=o,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,uM(ne,function(){return P_(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||o){o=O.T,O.T=null,f=G.p,G.p=2,b=Lt,Lt|=4;try{$b(t,i,r)}finally{Lt=b,G.p=f,O.T=o}}Mn=1,N_(),L_(),U_()}}function N_(){if(Mn===1){Mn=0;var t=ts,i=Fr,r=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||r){r=O.T,O.T=null;var o=G.p;G.p=2;var f=Lt;Lt|=4;try{f_(i,t);var h=td,b=_0(t.containerInfo),L=h.focusedElem,k=h.selectionRange;if(b!==L&&L&&L.ownerDocument&&g0(L.ownerDocument.documentElement,L)){if(k!==null&&Af(L)){var oe=k.start,ve=k.end;if(ve===void 0&&(ve=oe),"selectionStart"in L)L.selectionStart=oe,L.selectionEnd=Math.min(ve,L.value.length);else{var Te=L.ownerDocument||document,fe=Te&&Te.defaultView||window;if(fe.getSelection){var de=fe.getSelection(),We=L.textContent.length,et=Math.min(k.start,We),Xt=k.end===void 0?et:Math.min(k.end,We);!de.extend&&et>Xt&&(b=Xt,Xt=et,et=b);var J=m0(L,et),q=m0(L,Xt);if(J&&q&&(de.rangeCount!==1||de.anchorNode!==J.node||de.anchorOffset!==J.offset||de.focusNode!==q.node||de.focusOffset!==q.offset)){var re=Te.createRange();re.setStart(J.node,J.offset),de.removeAllRanges(),et>Xt?(de.addRange(re),de.extend(q.node,q.offset)):(re.setEnd(q.node,q.offset),de.addRange(re))}}}}for(Te=[],de=L;de=de.parentNode;)de.nodeType===1&&Te.push({element:de,left:de.scrollLeft,top:de.scrollTop});for(typeof L.focus=="function"&&L.focus(),L=0;L<Te.length;L++){var be=Te[L];be.element.scrollLeft=be.left,be.element.scrollTop=be.top}}Qc=!!ed,td=ed=null}finally{Lt=f,G.p=o,O.T=r}}t.current=i,Mn=2}}function L_(){if(Mn===2){Mn=0;var t=ts,i=Fr,r=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||r){r=O.T,O.T=null;var o=G.p;G.p=2;var f=Lt;Lt|=4;try{r_(t,i.alternate,i)}finally{Lt=f,G.p=o,O.T=r}}Mn=3}}function U_(){if(Mn===4||Mn===3){Mn=0,Vt();var t=ts,i=Fr,r=ba,o=v_;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?Mn=5:(Mn=0,Fr=ts=null,O_(t,t.pendingLanes));var f=t.pendingLanes;if(f===0&&(es=null),Ao(r),i=i.stateNode,xe&&typeof xe.onCommitFiberRoot=="function")try{xe.onCommitFiberRoot(_e,i,void 0,(i.current.flags&128)===128)}catch{}if(o!==null){i=O.T,f=G.p,G.p=2,O.T=null;try{for(var h=t.onRecoverableError,b=0;b<o.length;b++){var L=o[b];h(L.value,{componentStack:L.stack})}}finally{O.T=i,G.p=f}}(ba&3)!==0&&Bc(),Xi(t),f=t.pendingLanes,(r&261930)!==0&&(f&42)!==0?t===Gh?ol++:(ol=0,Gh=t):ol=0,ll(0)}}function O_(t,i){(t.pooledCacheLanes&=i)===0&&(i=t.pooledCache,i!=null&&(t.pooledCache=null,Vo(i)))}function Bc(){return N_(),L_(),U_(),P_()}function P_(){if(Mn!==5)return!1;var t=ts,i=Bh;Bh=0;var r=Ao(ba),o=O.T,f=G.p;try{G.p=32>r?32:r,O.T=null,r=Hh,Hh=null;var h=ts,b=ba;if(Mn=0,Fr=ts=null,ba=0,(Lt&6)!==0)throw Error(s(331));var L=Lt;if(Lt|=4,g_(h.current),d_(h,h.current,b,r),Lt=L,ll(0,!1),xe&&typeof xe.onPostCommitFiberRoot=="function")try{xe.onPostCommitFiberRoot(_e,h)}catch{}return!0}finally{G.p=f,O.T=o,O_(t,i)}}function z_(t,i,r){i=Si(r,i),i=vh(t.stateNode,i,2),t=Ya(t,i,2),t!==null&&(it(t,2),Xi(t))}function Ht(t,i,r){if(t.tag===3)z_(t,t,r);else for(;i!==null;){if(i.tag===3){z_(i,t,r);break}else if(i.tag===1){var o=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(es===null||!es.has(o))){t=Si(r,t),r=Ig(2),o=Ya(i,r,2),o!==null&&(Fg(r,o,i,t),it(o,2),Xi(o));break}}i=i.return}}function jh(t,i,r){var o=t.pingCache;if(o===null){o=t.pingCache=new nM;var f=new Set;o.set(i,f)}else f=o.get(i),f===void 0&&(f=new Set,o.set(i,f));f.has(r)||(zh=!0,f.add(r),t=oM.bind(null,t,i,r),i.then(t,t))}function oM(t,i,r){var o=t.pingCache;o!==null&&o.delete(i),t.pingedLanes|=t.suspendedLanes&r,t.warmLanes&=~r,Kt===t&&(bt&r)===r&&(cn===4||cn===3&&(bt&62914560)===bt&&300>De()-Uc?(Lt&2)===0&&Br(t,0):Ih|=r,Ir===bt&&(Ir=0)),Xi(t)}function I_(t,i){i===0&&(i=we()),t=Os(t,i),t!==null&&(it(t,i),Xi(t))}function lM(t){var i=t.memoizedState,r=0;i!==null&&(r=i.retryLane),I_(t,r)}function cM(t,i){var r=0;switch(t.tag){case 31:case 13:var o=t.stateNode,f=t.memoizedState;f!==null&&(r=f.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(i),I_(t,r)}function uM(t,i){return Y(t,i)}var Hc=null,Gr=null,Xh=!1,Gc=!1,Wh=!1,is=0;function Xi(t){t!==Gr&&t.next===null&&(Gr===null?Hc=Gr=t:Gr=Gr.next=t),Gc=!0,Xh||(Xh=!0,hM())}function ll(t,i){if(!Wh&&Gc){Wh=!0;do for(var r=!1,o=Hc;o!==null;){if(t!==0){var f=o.pendingLanes;if(f===0)var h=0;else{var b=o.suspendedLanes,L=o.pingedLanes;h=(1<<31-Ie(42|t)+1)-1,h&=f&~(b&~L),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(r=!0,G_(o,h))}else h=bt,h=Se(o,o===Kt?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||He(o,h)||(r=!0,G_(o,h));o=o.next}while(r);Wh=!1}}function fM(){F_()}function F_(){Gc=Xh=!1;var t=0;is!==0&&bM()&&(t=is);for(var i=De(),r=null,o=Hc;o!==null;){var f=o.next,h=B_(o,i);h===0?(o.next=null,r===null?Hc=f:r.next=f,f===null&&(Gr=r)):(r=o,(t!==0||(h&3)!==0)&&(Gc=!0)),o=f}Mn!==0&&Mn!==5||ll(t),is!==0&&(is=0)}function B_(t,i){for(var r=t.suspendedLanes,o=t.pingedLanes,f=t.expirationTimes,h=t.pendingLanes&-62914561;0<h;){var b=31-Ie(h),L=1<<b,k=f[b];k===-1?((L&r)===0||(L&o)!==0)&&(f[b]=Oe(L,i)):k<=i&&(t.expiredLanes|=L),h&=~L}if(i=Kt,r=bt,r=Se(t,t===i?r:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,r===0||t===i&&(Bt===2||Bt===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&sn(o),t.callbackNode=null,t.callbackPriority=0;if((r&3)===0||He(t,r)){if(i=r&-r,i===t.callbackPriority)return i;switch(o!==null&&sn(o),Ao(r)){case 2:case 8:r=w;break;case 32:r=ne;break;case 268435456:r=Re;break;default:r=ne}return o=H_.bind(null,t),r=Y(r,o),t.callbackPriority=i,t.callbackNode=r,i}return o!==null&&o!==null&&sn(o),t.callbackPriority=2,t.callbackNode=null,2}function H_(t,i){if(Mn!==0&&Mn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var r=t.callbackNode;if(Bc()&&t.callbackNode!==r)return null;var o=bt;return o=Se(t,t===Kt?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(S_(t,o,i),B_(t,De()),t.callbackNode!=null&&t.callbackNode===r?H_.bind(null,t):null)}function G_(t,i){if(Bc())return null;S_(t,i,!0)}function hM(){EM(function(){(Lt&6)!==0?Y(P,fM):F_()})}function qh(){if(is===0){var t=Ar;t===0&&(t=st,st<<=1,(st&261888)===0&&(st=256)),is=t}return is}function V_(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Ds(""+t)}function k_(t,i){var r=i.ownerDocument.createElement("input");return r.name=i.name,r.value=i.value,t.id&&r.setAttribute("form",t.id),i.parentNode.insertBefore(r,i),t=new FormData(t),r.parentNode.removeChild(r),t}function dM(t,i,r,o,f){if(i==="submit"&&r&&r.stateNode===f){var h=V_((f[Ln]||null).action),b=o.submitter;b&&(i=(i=b[Ln]||null)?V_(i.formAction):b.getAttribute("formAction"),i!==null&&(h=i,b=null));var L=new $l("action","action",null,o,f);t.push({event:L,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(is!==0){var k=b?k_(f,b):new FormData(f);dh(r,{pending:!0,data:k,method:f.method,action:h},null,k)}}else typeof h=="function"&&(L.preventDefault(),k=b?k_(f,b):new FormData(f),dh(r,{pending:!0,data:k,method:f.method,action:h},h,k))},currentTarget:f}]})}}for(var Yh=0;Yh<Df.length;Yh++){var Zh=Df[Yh],pM=Zh.toLowerCase(),mM=Zh[0].toUpperCase()+Zh.slice(1);Ui(pM,"on"+mM)}Ui(y0,"onAnimationEnd"),Ui(S0,"onAnimationIteration"),Ui(b0,"onAnimationStart"),Ui("dblclick","onDoubleClick"),Ui("focusin","onFocus"),Ui("focusout","onBlur"),Ui(Nb,"onTransitionRun"),Ui(Lb,"onTransitionStart"),Ui(Ub,"onTransitionCancel"),Ui(M0,"onTransitionEnd"),ue("onMouseEnter",["mouseout","mouseover"]),ue("onMouseLeave",["mouseout","mouseover"]),ue("onPointerEnter",["pointerout","pointerover"]),ue("onPointerLeave",["pointerout","pointerover"]),Z("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Z("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Z("onBeforeInput",["compositionend","keypress","textInput","paste"]),Z("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Z("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Z("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var cl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),gM=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(cl));function j_(t,i){i=(i&4)!==0;for(var r=0;r<t.length;r++){var o=t[r],f=o.event;o=o.listeners;e:{var h=void 0;if(i)for(var b=o.length-1;0<=b;b--){var L=o[b],k=L.instance,oe=L.currentTarget;if(L=L.listener,k!==h&&f.isPropagationStopped())break e;h=L,f.currentTarget=oe;try{h(f)}catch(ve){nc(ve)}f.currentTarget=null,h=k}else for(b=0;b<o.length;b++){if(L=o[b],k=L.instance,oe=L.currentTarget,L=L.listener,k!==h&&f.isPropagationStopped())break e;h=L,f.currentTarget=oe;try{h(f)}catch(ve){nc(ve)}f.currentTarget=null,h=k}}}}function yt(t,i){var r=i[Pa];r===void 0&&(r=i[Pa]=new Set);var o=t+"__bubble";r.has(o)||(X_(i,t,2,!1),r.add(o))}function Kh(t,i,r){var o=0;i&&(o|=4),X_(r,t,o,i)}var Vc="_reactListening"+Math.random().toString(36).slice(2);function Qh(t){if(!t[Vc]){t[Vc]=!0,Zl.forEach(function(r){r!=="selectionchange"&&(gM.has(r)||Kh(r,!1,t),Kh(r,!0,t))});var i=t.nodeType===9?t:t.ownerDocument;i===null||i[Vc]||(i[Vc]=!0,Kh("selectionchange",!1,i))}}function X_(t,i,r,o){switch(yx(i)){case 2:var f=jM;break;case 8:f=XM;break;default:f=hd}r=f.bind(null,i,r,t),f=void 0,!_f||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),o?f!==void 0?t.addEventListener(i,r,{capture:!0,passive:f}):t.addEventListener(i,r,!0):f!==void 0?t.addEventListener(i,r,{passive:f}):t.addEventListener(i,r,!1)}function Jh(t,i,r,o,f){var h=o;if((i&1)===0&&(i&2)===0&&o!==null)e:for(;;){if(o===null)return;var b=o.tag;if(b===3||b===4){var L=o.stateNode.containerInfo;if(L===f)break;if(b===4)for(b=o.return;b!==null;){var k=b.tag;if((k===3||k===4)&&b.stateNode.containerInfo===f)return;b=b.return}for(;L!==null;){if(b=Ia(L),b===null)return;if(k=b.tag,k===5||k===6||k===26||k===27){o=h=b;continue e}L=L.parentNode}}o=o.return}Km(function(){var oe=h,ve=mf(r),Te=[];e:{var fe=E0.get(t);if(fe!==void 0){var de=$l,We=t;switch(t){case"keypress":if(Ql(r)===0)break e;case"keydown":case"keyup":de=cb;break;case"focusin":We="focus",de=Sf;break;case"focusout":We="blur",de=Sf;break;case"beforeblur":case"afterblur":de=Sf;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":de=$m;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":de=QS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":de=hb;break;case y0:case S0:case b0:de=eb;break;case M0:de=pb;break;case"scroll":case"scrollend":de=ZS;break;case"wheel":de=gb;break;case"copy":case"cut":case"paste":de=nb;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":de=t0;break;case"toggle":case"beforetoggle":de=xb}var et=(i&4)!==0,Xt=!et&&(t==="scroll"||t==="scrollend"),J=et?fe!==null?fe+"Capture":null:fe;et=[];for(var q=oe,re;q!==null;){var be=q;if(re=be.stateNode,be=be.tag,be!==5&&be!==26&&be!==27||re===null||J===null||(be=No(q,J),be!=null&&et.push(ul(q,be,re))),Xt)break;q=q.return}0<et.length&&(fe=new de(fe,We,null,r,ve),Te.push({event:fe,listeners:et}))}}if((i&7)===0){e:{if(fe=t==="mouseover"||t==="pointerover",de=t==="mouseout"||t==="pointerout",fe&&r!==pf&&(We=r.relatedTarget||r.fromElement)&&(Ia(We)||We[ra]))break e;if((de||fe)&&(fe=ve.window===ve?ve:(fe=ve.ownerDocument)?fe.defaultView||fe.parentWindow:window,de?(We=r.relatedTarget||r.toElement,de=oe,We=We?Ia(We):null,We!==null&&(Xt=c(We),et=We.tag,We!==Xt||et!==5&&et!==27&&et!==6)&&(We=null)):(de=null,We=oe),de!==We)){if(et=$m,be="onMouseLeave",J="onMouseEnter",q="mouse",(t==="pointerout"||t==="pointerover")&&(et=t0,be="onPointerLeave",J="onPointerEnter",q="pointer"),Xt=de==null?fe:Cs(de),re=We==null?fe:Cs(We),fe=new et(be,q+"leave",de,r,ve),fe.target=Xt,fe.relatedTarget=re,be=null,Ia(ve)===oe&&(et=new et(J,q+"enter",We,r,ve),et.target=re,et.relatedTarget=Xt,be=et),Xt=be,de&&We)t:{for(et=_M,J=de,q=We,re=0,be=J;be;be=et(be))re++;be=0;for(var $e=q;$e;$e=et($e))be++;for(;0<re-be;)J=et(J),re--;for(;0<be-re;)q=et(q),be--;for(;re--;){if(J===q||q!==null&&J===q.alternate){et=J;break t}J=et(J),q=et(q)}et=null}else et=null;de!==null&&W_(Te,fe,de,et,!1),We!==null&&Xt!==null&&W_(Te,Xt,We,et,!0)}}e:{if(fe=oe?Cs(oe):window,de=fe.nodeName&&fe.nodeName.toLowerCase(),de==="select"||de==="input"&&fe.type==="file")var Rt=c0;else if(o0(fe))if(u0)Rt=Rb;else{Rt=Ab;var Ze=Tb}else de=fe.nodeName,!de||de.toLowerCase()!=="input"||fe.type!=="checkbox"&&fe.type!=="radio"?oe&&Ut(oe.elementType)&&(Rt=c0):Rt=wb;if(Rt&&(Rt=Rt(t,oe))){l0(Te,Rt,r,ve);break e}Ze&&Ze(t,fe,oe),t==="focusout"&&oe&&fe.type==="number"&&oe.memoizedProps.value!=null&&xt(fe,"number",fe.value)}switch(Ze=oe?Cs(oe):window,t){case"focusin":(o0(Ze)||Ze.contentEditable==="true")&&(xr=Ze,wf=oe,Bo=null);break;case"focusout":Bo=wf=xr=null;break;case"mousedown":Rf=!0;break;case"contextmenu":case"mouseup":case"dragend":Rf=!1,x0(Te,r,ve);break;case"selectionchange":if(Db)break;case"keydown":case"keyup":x0(Te,r,ve)}var ht;if(Mf)e:{switch(t){case"compositionstart":var Mt="onCompositionStart";break e;case"compositionend":Mt="onCompositionEnd";break e;case"compositionupdate":Mt="onCompositionUpdate";break e}Mt=void 0}else _r?s0(t,r)&&(Mt="onCompositionEnd"):t==="keydown"&&r.keyCode===229&&(Mt="onCompositionStart");Mt&&(n0&&r.locale!=="ko"&&(_r||Mt!=="onCompositionStart"?Mt==="onCompositionEnd"&&_r&&(ht=Qm()):(Ga=ve,xf="value"in Ga?Ga.value:Ga.textContent,_r=!0)),Ze=kc(oe,Mt),0<Ze.length&&(Mt=new e0(Mt,t,null,r,ve),Te.push({event:Mt,listeners:Ze}),ht?Mt.data=ht:(ht=r0(r),ht!==null&&(Mt.data=ht)))),(ht=yb?Sb(t,r):bb(t,r))&&(Mt=kc(oe,"onBeforeInput"),0<Mt.length&&(Ze=new e0("onBeforeInput","beforeinput",null,r,ve),Te.push({event:Ze,listeners:Mt}),Ze.data=ht)),dM(Te,t,oe,r,ve)}j_(Te,i)})}function ul(t,i,r){return{instance:t,listener:i,currentTarget:r}}function kc(t,i){for(var r=i+"Capture",o=[];t!==null;){var f=t,h=f.stateNode;if(f=f.tag,f!==5&&f!==26&&f!==27||h===null||(f=No(t,r),f!=null&&o.unshift(ul(t,f,h)),f=No(t,i),f!=null&&o.push(ul(t,f,h))),t.tag===3)return o;t=t.return}return[]}function _M(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function W_(t,i,r,o,f){for(var h=i._reactName,b=[];r!==null&&r!==o;){var L=r,k=L.alternate,oe=L.stateNode;if(L=L.tag,k!==null&&k===o)break;L!==5&&L!==26&&L!==27||oe===null||(k=oe,f?(oe=No(r,h),oe!=null&&b.unshift(ul(r,oe,k))):f||(oe=No(r,h),oe!=null&&b.push(ul(r,oe,k)))),r=r.return}b.length!==0&&t.push({event:i,listeners:b})}var xM=/\r\n?/g,vM=/\u0000|\uFFFD/g;function q_(t){return(typeof t=="string"?t:""+t).replace(xM,`
`).replace(vM,"")}function Y_(t,i){return i=q_(i),q_(t)===i}function jt(t,i,r,o,f,h){switch(r){case"children":typeof o=="string"?i==="body"||i==="textarea"&&o===""||oi(t,o):(typeof o=="number"||typeof o=="bigint")&&i!=="body"&&oi(t,""+o);break;case"className":Xe(t,"class",o);break;case"tabIndex":Xe(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Xe(t,r,o);break;case"style":Li(t,o,h);break;case"data":if(i!=="object"){Xe(t,"data",o);break}case"src":case"href":if(o===""&&(i!=="a"||r!=="href")){t.removeAttribute(r);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(r);break}o=Ds(""+o),t.setAttribute(r,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(r,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(r==="formAction"?(i!=="input"&&jt(t,i,"name",f.name,f,null),jt(t,i,"formEncType",f.formEncType,f,null),jt(t,i,"formMethod",f.formMethod,f,null),jt(t,i,"formTarget",f.formTarget,f,null)):(jt(t,i,"encType",f.encType,f,null),jt(t,i,"method",f.method,f,null),jt(t,i,"target",f.target,f,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(r);break}o=Ds(""+o),t.setAttribute(r,o);break;case"onClick":o!=null&&(t.onclick=oa);break;case"onScroll":o!=null&&yt("scroll",t);break;case"onScrollEnd":o!=null&&yt("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(r=o.__html,r!=null){if(f.children!=null)throw Error(s(60));t.innerHTML=r}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}r=Ds(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",r);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(r,""+o):t.removeAttribute(r);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(r,""):t.removeAttribute(r);break;case"capture":case"download":o===!0?t.setAttribute(r,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(r,o):t.removeAttribute(r);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(r,o):t.removeAttribute(r);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(r):t.setAttribute(r,o);break;case"popover":yt("beforetoggle",t),yt("toggle",t),Fe(t,"popover",o);break;case"xlinkActuate":je(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":je(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":je(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":je(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":je(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":je(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":je(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":je(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":je(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Fe(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(r=Gi.get(r)||r,Fe(t,r,o))}}function $h(t,i,r,o,f,h){switch(r){case"style":Li(t,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(r=o.__html,r!=null){if(f.children!=null)throw Error(s(60));t.innerHTML=r}}break;case"children":typeof o=="string"?oi(t,o):(typeof o=="number"||typeof o=="bigint")&&oi(t,""+o);break;case"onScroll":o!=null&&yt("scroll",t);break;case"onScrollEnd":o!=null&&yt("scrollend",t);break;case"onClick":o!=null&&(t.onclick=oa);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!D.hasOwnProperty(r))e:{if(r[0]==="o"&&r[1]==="n"&&(f=r.endsWith("Capture"),i=r.slice(2,f?r.length-7:void 0),h=t[Ln]||null,h=h!=null?h[r]:null,typeof h=="function"&&t.removeEventListener(i,h,f),typeof o=="function")){typeof h!="function"&&h!==null&&(r in t?t[r]=null:t.hasAttribute(r)&&t.removeAttribute(r)),t.addEventListener(i,o,f);break e}r in t?t[r]=o:o===!0?t.setAttribute(r,""):Fe(t,r,o)}}}function zn(t,i,r){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":yt("error",t),yt("load",t);var o=!1,f=!1,h;for(h in r)if(r.hasOwnProperty(h)){var b=r[h];if(b!=null)switch(h){case"src":o=!0;break;case"srcSet":f=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,i));default:jt(t,i,h,b,r,null)}}f&&jt(t,i,"srcSet",r.srcSet,r,null),o&&jt(t,i,"src",r.src,r,null);return;case"input":yt("invalid",t);var L=h=b=f=null,k=null,oe=null;for(o in r)if(r.hasOwnProperty(o)){var ve=r[o];if(ve!=null)switch(o){case"name":f=ve;break;case"type":b=ve;break;case"checked":k=ve;break;case"defaultChecked":oe=ve;break;case"value":h=ve;break;case"defaultValue":L=ve;break;case"children":case"dangerouslySetInnerHTML":if(ve!=null)throw Error(s(137,i));break;default:jt(t,i,o,ve,r,null)}}Bn(t,h,L,k,oe,b,f,!1);return;case"select":yt("invalid",t),o=b=h=null;for(f in r)if(r.hasOwnProperty(f)&&(L=r[f],L!=null))switch(f){case"value":h=L;break;case"defaultValue":b=L;break;case"multiple":o=L;default:jt(t,i,f,L,r,null)}i=h,r=b,t.multiple=!!o,i!=null?bn(t,!!o,i,!1):r!=null&&bn(t,!!o,r,!0);return;case"textarea":yt("invalid",t),h=f=o=null;for(b in r)if(r.hasOwnProperty(b)&&(L=r[b],L!=null))switch(b){case"value":o=L;break;case"defaultValue":f=L;break;case"children":h=L;break;case"dangerouslySetInnerHTML":if(L!=null)throw Error(s(91));break;default:jt(t,i,b,L,r,null)}Ni(t,o,f,h);return;case"option":for(k in r)if(r.hasOwnProperty(k)&&(o=r[k],o!=null))switch(k){case"selected":t.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:jt(t,i,k,o,r,null)}return;case"dialog":yt("beforetoggle",t),yt("toggle",t),yt("cancel",t),yt("close",t);break;case"iframe":case"object":yt("load",t);break;case"video":case"audio":for(o=0;o<cl.length;o++)yt(cl[o],t);break;case"image":yt("error",t),yt("load",t);break;case"details":yt("toggle",t);break;case"embed":case"source":case"link":yt("error",t),yt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(oe in r)if(r.hasOwnProperty(oe)&&(o=r[oe],o!=null))switch(oe){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,i));default:jt(t,i,oe,o,r,null)}return;default:if(Ut(i)){for(ve in r)r.hasOwnProperty(ve)&&(o=r[ve],o!==void 0&&$h(t,i,ve,o,r,void 0));return}}for(L in r)r.hasOwnProperty(L)&&(o=r[L],o!=null&&jt(t,i,L,o,r,null))}function yM(t,i,r,o){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var f=null,h=null,b=null,L=null,k=null,oe=null,ve=null;for(de in r){var Te=r[de];if(r.hasOwnProperty(de)&&Te!=null)switch(de){case"checked":break;case"value":break;case"defaultValue":k=Te;default:o.hasOwnProperty(de)||jt(t,i,de,null,o,Te)}}for(var fe in o){var de=o[fe];if(Te=r[fe],o.hasOwnProperty(fe)&&(de!=null||Te!=null))switch(fe){case"type":h=de;break;case"name":f=de;break;case"checked":oe=de;break;case"defaultChecked":ve=de;break;case"value":b=de;break;case"defaultValue":L=de;break;case"children":case"dangerouslySetInnerHTML":if(de!=null)throw Error(s(137,i));break;default:de!==Te&&jt(t,i,fe,de,o,Te)}}Ve(t,b,L,k,oe,ve,h,f);return;case"select":de=b=L=fe=null;for(h in r)if(k=r[h],r.hasOwnProperty(h)&&k!=null)switch(h){case"value":break;case"multiple":de=k;default:o.hasOwnProperty(h)||jt(t,i,h,null,o,k)}for(f in o)if(h=o[f],k=r[f],o.hasOwnProperty(f)&&(h!=null||k!=null))switch(f){case"value":fe=h;break;case"defaultValue":L=h;break;case"multiple":b=h;default:h!==k&&jt(t,i,f,h,o,k)}i=L,r=b,o=de,fe!=null?bn(t,!!r,fe,!1):!!o!=!!r&&(i!=null?bn(t,!!r,i,!0):bn(t,!!r,r?[]:"",!1));return;case"textarea":de=fe=null;for(L in r)if(f=r[L],r.hasOwnProperty(L)&&f!=null&&!o.hasOwnProperty(L))switch(L){case"value":break;case"children":break;default:jt(t,i,L,null,o,f)}for(b in o)if(f=o[b],h=r[b],o.hasOwnProperty(b)&&(f!=null||h!=null))switch(b){case"value":fe=f;break;case"defaultValue":de=f;break;case"children":break;case"dangerouslySetInnerHTML":if(f!=null)throw Error(s(91));break;default:f!==h&&jt(t,i,b,f,o,h)}ri(t,fe,de);return;case"option":for(var We in r)if(fe=r[We],r.hasOwnProperty(We)&&fe!=null&&!o.hasOwnProperty(We))switch(We){case"selected":t.selected=!1;break;default:jt(t,i,We,null,o,fe)}for(k in o)if(fe=o[k],de=r[k],o.hasOwnProperty(k)&&fe!==de&&(fe!=null||de!=null))switch(k){case"selected":t.selected=fe&&typeof fe!="function"&&typeof fe!="symbol";break;default:jt(t,i,k,fe,o,de)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var et in r)fe=r[et],r.hasOwnProperty(et)&&fe!=null&&!o.hasOwnProperty(et)&&jt(t,i,et,null,o,fe);for(oe in o)if(fe=o[oe],de=r[oe],o.hasOwnProperty(oe)&&fe!==de&&(fe!=null||de!=null))switch(oe){case"children":case"dangerouslySetInnerHTML":if(fe!=null)throw Error(s(137,i));break;default:jt(t,i,oe,fe,o,de)}return;default:if(Ut(i)){for(var Xt in r)fe=r[Xt],r.hasOwnProperty(Xt)&&fe!==void 0&&!o.hasOwnProperty(Xt)&&$h(t,i,Xt,void 0,o,fe);for(ve in o)fe=o[ve],de=r[ve],!o.hasOwnProperty(ve)||fe===de||fe===void 0&&de===void 0||$h(t,i,ve,fe,o,de);return}}for(var J in r)fe=r[J],r.hasOwnProperty(J)&&fe!=null&&!o.hasOwnProperty(J)&&jt(t,i,J,null,o,fe);for(Te in o)fe=o[Te],de=r[Te],!o.hasOwnProperty(Te)||fe===de||fe==null&&de==null||jt(t,i,Te,fe,o,de)}function Z_(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function SM(){if(typeof performance.getEntriesByType=="function"){for(var t=0,i=0,r=performance.getEntriesByType("resource"),o=0;o<r.length;o++){var f=r[o],h=f.transferSize,b=f.initiatorType,L=f.duration;if(h&&L&&Z_(b)){for(b=0,L=f.responseEnd,o+=1;o<r.length;o++){var k=r[o],oe=k.startTime;if(oe>L)break;var ve=k.transferSize,Te=k.initiatorType;ve&&Z_(Te)&&(k=k.responseEnd,b+=ve*(k<L?1:(L-oe)/(k-oe)))}if(--o,i+=8*(h+b)/(f.duration/1e3),t++,10<t)break}}if(0<t)return i/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var ed=null,td=null;function jc(t){return t.nodeType===9?t:t.ownerDocument}function K_(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Q_(t,i){if(t===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&i==="foreignObject"?0:t}function nd(t,i){return t==="textarea"||t==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var id=null;function bM(){var t=window.event;return t&&t.type==="popstate"?t===id?!1:(id=t,!0):(id=null,!1)}var J_=typeof setTimeout=="function"?setTimeout:void 0,MM=typeof clearTimeout=="function"?clearTimeout:void 0,$_=typeof Promise=="function"?Promise:void 0,EM=typeof queueMicrotask=="function"?queueMicrotask:typeof $_<"u"?function(t){return $_.resolve(null).then(t).catch(TM)}:J_;function TM(t){setTimeout(function(){throw t})}function as(t){return t==="head"}function ex(t,i){var r=i,o=0;do{var f=r.nextSibling;if(t.removeChild(r),f&&f.nodeType===8)if(r=f.data,r==="/$"||r==="/&"){if(o===0){t.removeChild(f),Xr(i);return}o--}else if(r==="$"||r==="$?"||r==="$~"||r==="$!"||r==="&")o++;else if(r==="html")fl(t.ownerDocument.documentElement);else if(r==="head"){r=t.ownerDocument.head,fl(r);for(var h=r.firstChild;h;){var b=h.nextSibling,L=h.nodeName;h[za]||L==="SCRIPT"||L==="STYLE"||L==="LINK"&&h.rel.toLowerCase()==="stylesheet"||r.removeChild(h),h=b}}else r==="body"&&fl(t.ownerDocument.body);r=f}while(r);Xr(i)}function tx(t,i){var r=t;t=0;do{var o=r.nextSibling;if(r.nodeType===1?i?(r._stashedDisplay=r.style.display,r.style.display="none"):(r.style.display=r._stashedDisplay||"",r.getAttribute("style")===""&&r.removeAttribute("style")):r.nodeType===3&&(i?(r._stashedText=r.nodeValue,r.nodeValue=""):r.nodeValue=r._stashedText||""),o&&o.nodeType===8)if(r=o.data,r==="/$"){if(t===0)break;t--}else r!=="$"&&r!=="$?"&&r!=="$~"&&r!=="$!"||t++;r=o}while(r)}function ad(t){var i=t.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var r=i;switch(i=i.nextSibling,r.nodeName){case"HTML":case"HEAD":case"BODY":ad(r),Do(r);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(r.rel.toLowerCase()==="stylesheet")continue}t.removeChild(r)}}function AM(t,i,r,o){for(;t.nodeType===1;){var f=r;if(t.nodeName.toLowerCase()!==i.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[za])switch(i){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(h=t.getAttribute("rel"),h==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(h!==f.rel||t.getAttribute("href")!==(f.href==null||f.href===""?null:f.href)||t.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin)||t.getAttribute("title")!==(f.title==null?null:f.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(h=t.getAttribute("src"),(h!==(f.src==null?null:f.src)||t.getAttribute("type")!==(f.type==null?null:f.type)||t.getAttribute("crossorigin")!==(f.crossOrigin==null?null:f.crossOrigin))&&h&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(i==="input"&&t.type==="hidden"){var h=f.name==null?null:""+f.name;if(f.type==="hidden"&&t.getAttribute("name")===h)return t}else return t;if(t=Ai(t.nextSibling),t===null)break}return null}function wM(t,i,r){if(i==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!r||(t=Ai(t.nextSibling),t===null))return null;return t}function nx(t,i){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!i||(t=Ai(t.nextSibling),t===null))return null;return t}function sd(t){return t.data==="$?"||t.data==="$~"}function rd(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function RM(t,i){var r=t.ownerDocument;if(t.data==="$~")t._reactRetry=i;else if(t.data!=="$?"||r.readyState!=="loading")i();else{var o=function(){i(),r.removeEventListener("DOMContentLoaded",o)};r.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function Ai(t){for(;t!=null;t=t.nextSibling){var i=t.nodeType;if(i===1||i===3)break;if(i===8){if(i=t.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return t}var od=null;function ix(t){t=t.nextSibling;for(var i=0;t;){if(t.nodeType===8){var r=t.data;if(r==="/$"||r==="/&"){if(i===0)return Ai(t.nextSibling);i--}else r!=="$"&&r!=="$!"&&r!=="$?"&&r!=="$~"&&r!=="&"||i++}t=t.nextSibling}return null}function ax(t){t=t.previousSibling;for(var i=0;t;){if(t.nodeType===8){var r=t.data;if(r==="$"||r==="$!"||r==="$?"||r==="$~"||r==="&"){if(i===0)return t;i--}else r!=="/$"&&r!=="/&"||i++}t=t.previousSibling}return null}function sx(t,i,r){switch(i=jc(r),t){case"html":if(t=i.documentElement,!t)throw Error(s(452));return t;case"head":if(t=i.head,!t)throw Error(s(453));return t;case"body":if(t=i.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function fl(t){for(var i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Do(t)}var wi=new Map,rx=new Set;function Xc(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Ma=G.d;G.d={f:CM,r:DM,D:NM,C:LM,L:UM,m:OM,X:zM,S:PM,M:IM};function CM(){var t=Ma.f(),i=zc();return t||i}function DM(t){var i=Fa(t);i!==null&&i.tag===5&&i.type==="form"?Mg(i):Ma.r(t)}var Vr=typeof document>"u"?null:document;function ox(t,i,r){var o=Vr;if(o&&typeof i=="string"&&i){var f=It(i);f='link[rel="'+t+'"][href="'+f+'"]',typeof r=="string"&&(f+='[crossorigin="'+r+'"]'),rx.has(f)||(rx.add(f),t={rel:t,crossOrigin:r,href:i},o.querySelector(f)===null&&(i=o.createElement("link"),zn(i,"link",t),mn(i),o.head.appendChild(i)))}}function NM(t){Ma.D(t),ox("dns-prefetch",t,null)}function LM(t,i){Ma.C(t,i),ox("preconnect",t,i)}function UM(t,i,r){Ma.L(t,i,r);var o=Vr;if(o&&t&&i){var f='link[rel="preload"][as="'+It(i)+'"]';i==="image"&&r&&r.imageSrcSet?(f+='[imagesrcset="'+It(r.imageSrcSet)+'"]',typeof r.imageSizes=="string"&&(f+='[imagesizes="'+It(r.imageSizes)+'"]')):f+='[href="'+It(t)+'"]';var h=f;switch(i){case"style":h=kr(t);break;case"script":h=jr(t)}wi.has(h)||(t=x({rel:"preload",href:i==="image"&&r&&r.imageSrcSet?void 0:t,as:i},r),wi.set(h,t),o.querySelector(f)!==null||i==="style"&&o.querySelector(hl(h))||i==="script"&&o.querySelector(dl(h))||(i=o.createElement("link"),zn(i,"link",t),mn(i),o.head.appendChild(i)))}}function OM(t,i){Ma.m(t,i);var r=Vr;if(r&&t){var o=i&&typeof i.as=="string"?i.as:"script",f='link[rel="modulepreload"][as="'+It(o)+'"][href="'+It(t)+'"]',h=f;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=jr(t)}if(!wi.has(h)&&(t=x({rel:"modulepreload",href:t},i),wi.set(h,t),r.querySelector(f)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(r.querySelector(dl(h)))return}o=r.createElement("link"),zn(o,"link",t),mn(o),r.head.appendChild(o)}}}function PM(t,i,r){Ma.S(t,i,r);var o=Vr;if(o&&t){var f=Ba(o).hoistableStyles,h=kr(t);i=i||"default";var b=f.get(h);if(!b){var L={loading:0,preload:null};if(b=o.querySelector(hl(h)))L.loading=5;else{t=x({rel:"stylesheet",href:t,"data-precedence":i},r),(r=wi.get(h))&&ld(t,r);var k=b=o.createElement("link");mn(k),zn(k,"link",t),k._p=new Promise(function(oe,ve){k.onload=oe,k.onerror=ve}),k.addEventListener("load",function(){L.loading|=1}),k.addEventListener("error",function(){L.loading|=2}),L.loading|=4,Wc(b,i,o)}b={type:"stylesheet",instance:b,count:1,state:L},f.set(h,b)}}}function zM(t,i){Ma.X(t,i);var r=Vr;if(r&&t){var o=Ba(r).hoistableScripts,f=jr(t),h=o.get(f);h||(h=r.querySelector(dl(f)),h||(t=x({src:t,async:!0},i),(i=wi.get(f))&&cd(t,i),h=r.createElement("script"),mn(h),zn(h,"link",t),r.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(f,h))}}function IM(t,i){Ma.M(t,i);var r=Vr;if(r&&t){var o=Ba(r).hoistableScripts,f=jr(t),h=o.get(f);h||(h=r.querySelector(dl(f)),h||(t=x({src:t,async:!0,type:"module"},i),(i=wi.get(f))&&cd(t,i),h=r.createElement("script"),mn(h),zn(h,"link",t),r.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(f,h))}}function lx(t,i,r,o){var f=(f=te.current)?Xc(f):null;if(!f)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof r.precedence=="string"&&typeof r.href=="string"?(i=kr(r.href),r=Ba(f).hoistableStyles,o=r.get(i),o||(o={type:"style",instance:null,count:0,state:null},r.set(i,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(r.rel==="stylesheet"&&typeof r.href=="string"&&typeof r.precedence=="string"){t=kr(r.href);var h=Ba(f).hoistableStyles,b=h.get(t);if(b||(f=f.ownerDocument||f,b={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(t,b),(h=f.querySelector(hl(t)))&&!h._p&&(b.instance=h,b.state.loading=5),wi.has(t)||(r={rel:"preload",as:"style",href:r.href,crossOrigin:r.crossOrigin,integrity:r.integrity,media:r.media,hrefLang:r.hrefLang,referrerPolicy:r.referrerPolicy},wi.set(t,r),h||FM(f,t,r,b.state))),i&&o===null)throw Error(s(528,""));return b}if(i&&o!==null)throw Error(s(529,""));return null;case"script":return i=r.async,r=r.src,typeof r=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=jr(r),r=Ba(f).hoistableScripts,o=r.get(i),o||(o={type:"script",instance:null,count:0,state:null},r.set(i,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function kr(t){return'href="'+It(t)+'"'}function hl(t){return'link[rel="stylesheet"]['+t+"]"}function cx(t){return x({},t,{"data-precedence":t.precedence,precedence:null})}function FM(t,i,r,o){t.querySelector('link[rel="preload"][as="style"]['+i+"]")?o.loading=1:(i=t.createElement("link"),o.preload=i,i.addEventListener("load",function(){return o.loading|=1}),i.addEventListener("error",function(){return o.loading|=2}),zn(i,"link",r),mn(i),t.head.appendChild(i))}function jr(t){return'[src="'+It(t)+'"]'}function dl(t){return"script[async]"+t}function ux(t,i,r){if(i.count++,i.instance===null)switch(i.type){case"style":var o=t.querySelector('style[data-href~="'+It(r.href)+'"]');if(o)return i.instance=o,mn(o),o;var f=x({},r,{"data-href":r.href,"data-precedence":r.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),mn(o),zn(o,"style",f),Wc(o,r.precedence,t),i.instance=o;case"stylesheet":f=kr(r.href);var h=t.querySelector(hl(f));if(h)return i.state.loading|=4,i.instance=h,mn(h),h;o=cx(r),(f=wi.get(f))&&ld(o,f),h=(t.ownerDocument||t).createElement("link"),mn(h);var b=h;return b._p=new Promise(function(L,k){b.onload=L,b.onerror=k}),zn(h,"link",o),i.state.loading|=4,Wc(h,r.precedence,t),i.instance=h;case"script":return h=jr(r.src),(f=t.querySelector(dl(h)))?(i.instance=f,mn(f),f):(o=r,(f=wi.get(h))&&(o=x({},r),cd(o,f)),t=t.ownerDocument||t,f=t.createElement("script"),mn(f),zn(f,"link",o),t.head.appendChild(f),i.instance=f);case"void":return null;default:throw Error(s(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(o=i.instance,i.state.loading|=4,Wc(o,r.precedence,t));return i.instance}function Wc(t,i,r){for(var o=r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),f=o.length?o[o.length-1]:null,h=f,b=0;b<o.length;b++){var L=o[b];if(L.dataset.precedence===i)h=L;else if(h!==f)break}h?h.parentNode.insertBefore(t,h.nextSibling):(i=r.nodeType===9?r.head:r,i.insertBefore(t,i.firstChild))}function ld(t,i){t.crossOrigin==null&&(t.crossOrigin=i.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=i.referrerPolicy),t.title==null&&(t.title=i.title)}function cd(t,i){t.crossOrigin==null&&(t.crossOrigin=i.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=i.referrerPolicy),t.integrity==null&&(t.integrity=i.integrity)}var qc=null;function fx(t,i,r){if(qc===null){var o=new Map,f=qc=new Map;f.set(r,o)}else f=qc,o=f.get(r),o||(o=new Map,f.set(r,o));if(o.has(t))return o;for(o.set(t,null),r=r.getElementsByTagName(t),f=0;f<r.length;f++){var h=r[f];if(!(h[za]||h[hn]||t==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var b=h.getAttribute(i)||"";b=t+b;var L=o.get(b);L?L.push(h):o.set(b,[h])}}return o}function hx(t,i,r){t=t.ownerDocument||t,t.head.insertBefore(r,i==="title"?t.querySelector("head > title"):null)}function BM(t,i,r){if(r===1||i.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return t=i.disabled,typeof i.precedence=="string"&&t==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function dx(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function HM(t,i,r,o){if(r.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(r.state.loading&4)===0){if(r.instance===null){var f=kr(o.href),h=i.querySelector(hl(f));if(h){i=h._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(t.count++,t=Yc.bind(t),i.then(t,t)),r.state.loading|=4,r.instance=h,mn(h);return}h=i.ownerDocument||i,o=cx(o),(f=wi.get(f))&&ld(o,f),h=h.createElement("link"),mn(h);var b=h;b._p=new Promise(function(L,k){b.onload=L,b.onerror=k}),zn(h,"link",o),r.instance=h}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(r,i),(i=r.state.preload)&&(r.state.loading&3)===0&&(t.count++,r=Yc.bind(t),i.addEventListener("load",r),i.addEventListener("error",r))}}var ud=0;function GM(t,i){return t.stylesheets&&t.count===0&&Kc(t,t.stylesheets),0<t.count||0<t.imgCount?function(r){var o=setTimeout(function(){if(t.stylesheets&&Kc(t,t.stylesheets),t.unsuspend){var h=t.unsuspend;t.unsuspend=null,h()}},6e4+i);0<t.imgBytes&&ud===0&&(ud=62500*SM());var f=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Kc(t,t.stylesheets),t.unsuspend)){var h=t.unsuspend;t.unsuspend=null,h()}},(t.imgBytes>ud?50:800)+i);return t.unsuspend=r,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(f)}}:null}function Yc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Kc(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Zc=null;function Kc(t,i){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Zc=new Map,i.forEach(VM,t),Zc=null,Yc.call(t))}function VM(t,i){if(!(i.state.loading&4)){var r=Zc.get(t);if(r)var o=r.get(null);else{r=new Map,Zc.set(t,r);for(var f=t.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<f.length;h++){var b=f[h];(b.nodeName==="LINK"||b.getAttribute("media")!=="not all")&&(r.set(b.dataset.precedence,b),o=b)}o&&r.set(null,o)}f=i.instance,b=f.getAttribute("data-precedence"),h=r.get(b)||o,h===o&&r.set(null,f),r.set(b,f),this.count++,o=Yc.bind(this),f.addEventListener("load",o),f.addEventListener("error",o),h?h.parentNode.insertBefore(f,h.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(f,t.firstChild)),i.state.loading|=4}}var pl={$$typeof:N,Provider:null,Consumer:null,_currentValue:$,_currentValue2:$,_threadCount:0};function kM(t,i,r,o,f,h,b,L,k){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=qe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=qe(0),this.hiddenUpdates=qe(null),this.identifierPrefix=o,this.onUncaughtError=f,this.onCaughtError=h,this.onRecoverableError=b,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=k,this.incompleteTransitions=new Map}function px(t,i,r,o,f,h,b,L,k,oe,ve,Te){return t=new kM(t,i,r,b,k,oe,ve,Te,L),i=1,h===!0&&(i|=24),h=ci(3,null,null,i),t.current=h,h.stateNode=t,i=kf(),i.refCount++,t.pooledCache=i,i.refCount++,h.memoizedState={element:o,isDehydrated:r,cache:i},qf(h),t}function mx(t){return t?(t=Sr,t):Sr}function gx(t,i,r,o,f,h){f=mx(f),o.context===null?o.context=f:o.pendingContext=f,o=qa(i),o.payload={element:r},h=h===void 0?null:h,h!==null&&(o.callback=h),r=Ya(t,o,i),r!==null&&(ti(r,t,i),Wo(r,t,i))}function _x(t,i){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var r=t.retryLane;t.retryLane=r!==0&&r<i?r:i}}function fd(t,i){_x(t,i),(t=t.alternate)&&_x(t,i)}function xx(t){if(t.tag===13||t.tag===31){var i=Os(t,67108864);i!==null&&ti(i,t,67108864),fd(t,67108864)}}function vx(t){if(t.tag===13||t.tag===31){var i=pi();i=Rs(i);var r=Os(t,i);r!==null&&ti(r,t,i),fd(t,i)}}var Qc=!0;function jM(t,i,r,o){var f=O.T;O.T=null;var h=G.p;try{G.p=2,hd(t,i,r,o)}finally{G.p=h,O.T=f}}function XM(t,i,r,o){var f=O.T;O.T=null;var h=G.p;try{G.p=8,hd(t,i,r,o)}finally{G.p=h,O.T=f}}function hd(t,i,r,o){if(Qc){var f=dd(o);if(f===null)Jh(t,i,o,Jc,r),Sx(t,o);else if(qM(f,t,i,r,o))o.stopPropagation();else if(Sx(t,o),i&4&&-1<WM.indexOf(t)){for(;f!==null;){var h=Fa(f);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var b=Ce(h.pendingLanes);if(b!==0){var L=h;for(L.pendingLanes|=2,L.entangledLanes|=2;b;){var k=1<<31-Ie(b);L.entanglements[1]|=k,b&=~k}Xi(h),(Lt&6)===0&&(Oc=De()+500,ll(0))}}break;case 31:case 13:L=Os(h,2),L!==null&&ti(L,h,2),zc(),fd(h,2)}if(h=dd(o),h===null&&Jh(t,i,o,Jc,r),h===f)break;f=h}f!==null&&o.stopPropagation()}else Jh(t,i,o,null,r)}}function dd(t){return t=mf(t),pd(t)}var Jc=null;function pd(t){if(Jc=null,t=Ia(t),t!==null){var i=c(t);if(i===null)t=null;else{var r=i.tag;if(r===13){if(t=u(i),t!==null)return t;t=null}else if(r===31){if(t=d(i),t!==null)return t;t=null}else if(r===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;t=null}else i!==t&&(t=null)}}return Jc=t,null}function yx(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(en()){case P:return 2;case w:return 8;case ne:case Me:return 32;case Re:return 268435456;default:return 32}default:return 32}}var md=!1,ss=null,rs=null,os=null,ml=new Map,gl=new Map,ls=[],WM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Sx(t,i){switch(t){case"focusin":case"focusout":ss=null;break;case"dragenter":case"dragleave":rs=null;break;case"mouseover":case"mouseout":os=null;break;case"pointerover":case"pointerout":ml.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":gl.delete(i.pointerId)}}function _l(t,i,r,o,f,h){return t===null||t.nativeEvent!==h?(t={blockedOn:i,domEventName:r,eventSystemFlags:o,nativeEvent:h,targetContainers:[f]},i!==null&&(i=Fa(i),i!==null&&xx(i)),t):(t.eventSystemFlags|=o,i=t.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),t)}function qM(t,i,r,o,f){switch(i){case"focusin":return ss=_l(ss,t,i,r,o,f),!0;case"dragenter":return rs=_l(rs,t,i,r,o,f),!0;case"mouseover":return os=_l(os,t,i,r,o,f),!0;case"pointerover":var h=f.pointerId;return ml.set(h,_l(ml.get(h)||null,t,i,r,o,f)),!0;case"gotpointercapture":return h=f.pointerId,gl.set(h,_l(gl.get(h)||null,t,i,r,o,f)),!0}return!1}function bx(t){var i=Ia(t.target);if(i!==null){var r=c(i);if(r!==null){if(i=r.tag,i===13){if(i=u(r),i!==null){t.blockedOn=i,Ro(t.priority,function(){vx(r)});return}}else if(i===31){if(i=d(r),i!==null){t.blockedOn=i,Ro(t.priority,function(){vx(r)});return}}else if(i===3&&r.stateNode.current.memoizedState.isDehydrated){t.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}t.blockedOn=null}function $c(t){if(t.blockedOn!==null)return!1;for(var i=t.targetContainers;0<i.length;){var r=dd(t.nativeEvent);if(r===null){r=t.nativeEvent;var o=new r.constructor(r.type,r);pf=o,r.target.dispatchEvent(o),pf=null}else return i=Fa(r),i!==null&&xx(i),t.blockedOn=r,!1;i.shift()}return!0}function Mx(t,i,r){$c(t)&&r.delete(i)}function YM(){md=!1,ss!==null&&$c(ss)&&(ss=null),rs!==null&&$c(rs)&&(rs=null),os!==null&&$c(os)&&(os=null),ml.forEach(Mx),gl.forEach(Mx)}function eu(t,i){t.blockedOn===i&&(t.blockedOn=null,md||(md=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,YM)))}var tu=null;function Ex(t){tu!==t&&(tu=t,a.unstable_scheduleCallback(a.unstable_NormalPriority,function(){tu===t&&(tu=null);for(var i=0;i<t.length;i+=3){var r=t[i],o=t[i+1],f=t[i+2];if(typeof o!="function"){if(pd(o||r)===null)continue;break}var h=Fa(r);h!==null&&(t.splice(i,3),i-=3,dh(h,{pending:!0,data:f,method:r.method,action:o},o,f))}}))}function Xr(t){function i(k){return eu(k,t)}ss!==null&&eu(ss,t),rs!==null&&eu(rs,t),os!==null&&eu(os,t),ml.forEach(i),gl.forEach(i);for(var r=0;r<ls.length;r++){var o=ls[r];o.blockedOn===t&&(o.blockedOn=null)}for(;0<ls.length&&(r=ls[0],r.blockedOn===null);)bx(r),r.blockedOn===null&&ls.shift();if(r=(t.ownerDocument||t).$$reactFormReplay,r!=null)for(o=0;o<r.length;o+=3){var f=r[o],h=r[o+1],b=f[Ln]||null;if(typeof h=="function")b||Ex(r);else if(b){var L=null;if(h&&h.hasAttribute("formAction")){if(f=h,b=h[Ln]||null)L=b.formAction;else if(pd(f)!==null)continue}else L=b.action;typeof L=="function"?r[o+1]=L:(r.splice(o,3),o-=3),Ex(r)}}}function Tx(){function t(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(b){return f=b})},focusReset:"manual",scroll:"manual"})}function i(){f!==null&&(f(),f=null),o||setTimeout(r,20)}function r(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,f=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(r,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),f!==null&&(f(),f=null)}}}function gd(t){this._internalRoot=t}nu.prototype.render=gd.prototype.render=function(t){var i=this._internalRoot;if(i===null)throw Error(s(409));var r=i.current,o=pi();gx(r,o,t,i,null,null)},nu.prototype.unmount=gd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var i=t.containerInfo;gx(t.current,2,null,t,null,null),zc(),i[ra]=null}};function nu(t){this._internalRoot=t}nu.prototype.unstable_scheduleHydration=function(t){if(t){var i=wo();t={blockedOn:null,target:t,priority:i};for(var r=0;r<ls.length&&i!==0&&i<ls[r].priority;r++);ls.splice(r,0,t),r===0&&bx(t)}};var Ax=e.version;if(Ax!=="19.2.7")throw Error(s(527,Ax,"19.2.7"));G.findDOMNode=function(t){var i=t._reactInternals;if(i===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=p(i),t=t!==null?_(t):null,t=t===null?null:t.stateNode,t};var ZM={bundleType:0,version:"19.2.7",rendererPackageName:"react-dom",currentDispatcherRef:O,reconcilerVersion:"19.2.7"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var iu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!iu.isDisabled&&iu.supportsFiber)try{_e=iu.inject(ZM),xe=iu}catch{}}return yl.createRoot=function(t,i){if(!l(t))throw Error(s(299));var r=!1,o="",f=Ug,h=Og,b=Pg;return i!=null&&(i.unstable_strictMode===!0&&(r=!0),i.identifierPrefix!==void 0&&(o=i.identifierPrefix),i.onUncaughtError!==void 0&&(f=i.onUncaughtError),i.onCaughtError!==void 0&&(h=i.onCaughtError),i.onRecoverableError!==void 0&&(b=i.onRecoverableError)),i=px(t,1,!1,null,null,r,o,null,f,h,b,Tx),t[ra]=i.current,Qh(t),new gd(i)},yl.hydrateRoot=function(t,i,r){if(!l(t))throw Error(s(299));var o=!1,f="",h=Ug,b=Og,L=Pg,k=null;return r!=null&&(r.unstable_strictMode===!0&&(o=!0),r.identifierPrefix!==void 0&&(f=r.identifierPrefix),r.onUncaughtError!==void 0&&(h=r.onUncaughtError),r.onCaughtError!==void 0&&(b=r.onCaughtError),r.onRecoverableError!==void 0&&(L=r.onRecoverableError),r.formState!==void 0&&(k=r.formState)),i=px(t,1,!0,i,r??null,o,f,k,h,b,L,Tx),i.context=mx(null),r=i.current,o=pi(),o=Rs(o),f=qa(o),f.callback=null,Ya(r,f,o),r=o,i.current.lanes=r,it(i,r),Xi(i),t[ra]=i.current,Qh(t),new nu(i)},yl.version="19.2.7",yl}var Hx;function o1(){if(Hx)return vd.exports;Hx=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(e){console.error(e)}}return a(),vd.exports=r1(),vd.exports}var l1=o1();Ny();/**
 * @remix-run/router v1.23.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Fl(){return Fl=Object.assign?Object.assign.bind():function(a){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)({}).hasOwnProperty.call(n,s)&&(a[s]=n[s])}return a},Fl.apply(null,arguments)}var vs;(function(a){a.Pop="POP",a.Push="PUSH",a.Replace="REPLACE"})(vs||(vs={}));const Gx="popstate";function c1(a){a===void 0&&(a={});function e(l,c){let{pathname:u="/",search:d="",hash:m=""}=lr(l.location.hash.substr(1));return!u.startsWith("/")&&!u.startsWith(".")&&(u="/"+u),fp("",{pathname:u,search:d,hash:m},c.state&&c.state.usr||null,c.state&&c.state.key||"default")}function n(l,c){let u=l.document.querySelector("base"),d="";if(u&&u.getAttribute("href")){let m=l.location.href,p=m.indexOf("#");d=p===-1?m:m.slice(0,p)}return d+"#"+(typeof c=="string"?c:Yu(c))}function s(l,c){of(l.pathname.charAt(0)==="/","relative pathnames are not supported in hash history.push("+JSON.stringify(c)+")")}return f1(e,n,s,a)}function Sn(a,e){if(a===!1||a===null||typeof a>"u")throw new Error(e)}function of(a,e){if(!a){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function u1(){return Math.random().toString(36).substr(2,8)}function Vx(a,e){return{usr:a.state,key:a.key,idx:e}}function fp(a,e,n,s){return n===void 0&&(n=null),Fl({pathname:typeof a=="string"?a:a.pathname,search:"",hash:""},typeof e=="string"?lr(e):e,{state:n,key:e&&e.key||s||u1()})}function Yu(a){let{pathname:e="/",search:n="",hash:s=""}=a;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),s&&s!=="#"&&(e+=s.charAt(0)==="#"?s:"#"+s),e}function lr(a){let e={};if(a){let n=a.indexOf("#");n>=0&&(e.hash=a.substr(n),a=a.substr(0,n));let s=a.indexOf("?");s>=0&&(e.search=a.substr(s),a=a.substr(0,s)),a&&(e.pathname=a)}return e}function f1(a,e,n,s){s===void 0&&(s={});let{window:l=document.defaultView,v5Compat:c=!1}=s,u=l.history,d=vs.Pop,m=null,p=_();p==null&&(p=0,u.replaceState(Fl({},u.state,{idx:p}),""));function _(){return(u.state||{idx:null}).idx}function x(){d=vs.Pop;let v=_(),y=v==null?null:v-p;p=v,m&&m({action:d,location:E.location,delta:y})}function g(v,y){d=vs.Push;let A=fp(E.location,v,y);n&&n(A,v),p=_()+1;let N=Vx(A,p),C=E.createHref(A);try{u.pushState(N,"",C)}catch(I){if(I instanceof DOMException&&I.name==="DataCloneError")throw I;l.location.assign(C)}c&&m&&m({action:d,location:E.location,delta:1})}function S(v,y){d=vs.Replace;let A=fp(E.location,v,y);n&&n(A,v),p=_();let N=Vx(A,p),C=E.createHref(A);u.replaceState(N,"",C),c&&m&&m({action:d,location:E.location,delta:0})}function M(v){let y=l.location.origin!=="null"?l.location.origin:l.location.href,A=typeof v=="string"?v:Yu(v);return A=A.replace(/ $/,"%20"),Sn(y,"No window.location.(origin|href) available to create URL for href: "+A),new URL(A,y)}let E={get action(){return d},get location(){return a(l,u)},listen(v){if(m)throw new Error("A history only accepts one active listener");return l.addEventListener(Gx,x),m=v,()=>{l.removeEventListener(Gx,x),m=null}},createHref(v){return e(l,v)},createURL:M,encodeLocation(v){let y=M(v);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:g,replace:S,go(v){return u.go(v)}};return E}var kx;(function(a){a.data="data",a.deferred="deferred",a.redirect="redirect",a.error="error"})(kx||(kx={}));function h1(a,e,n){return n===void 0&&(n="/"),d1(a,e,n)}function d1(a,e,n,s){let l=typeof e=="string"?lr(e):e,c=gm(l.pathname||"/",n);if(c==null)return null;let u=Ly(a);p1(u);let d=null,m=A1(c);for(let p=0;d==null&&p<u.length;++p)d=M1(u[p],m);return d}function Ly(a,e,n,s){e===void 0&&(e=[]),n===void 0&&(n=[]),s===void 0&&(s="");let l=(c,u,d)=>{let m={relativePath:d===void 0?c.path||"":d,caseSensitive:c.caseSensitive===!0,childrenIndex:u,route:c};m.relativePath.startsWith("/")&&(Sn(m.relativePath.startsWith(s),'Absolute route path "'+m.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),m.relativePath=m.relativePath.slice(s.length));let p=Ss([s,m.relativePath]),_=n.concat(m);c.children&&c.children.length>0&&(Sn(c.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+p+'".')),Ly(c.children,e,_,p)),!(c.path==null&&!c.index)&&e.push({path:p,score:S1(p,c.index),routesMeta:_})};return a.forEach((c,u)=>{var d;if(c.path===""||!((d=c.path)!=null&&d.includes("?")))l(c,u);else for(let m of Uy(c.path))l(c,u,m)}),e}function Uy(a){let e=a.split("/");if(e.length===0)return[];let[n,...s]=e,l=n.endsWith("?"),c=n.replace(/\?$/,"");if(s.length===0)return l?[c,""]:[c];let u=Uy(s.join("/")),d=[];return d.push(...u.map(m=>m===""?c:[c,m].join("/"))),l&&d.push(...u),d.map(m=>a.startsWith("/")&&m===""?"/":m)}function p1(a){a.sort((e,n)=>e.score!==n.score?n.score-e.score:b1(e.routesMeta.map(s=>s.childrenIndex),n.routesMeta.map(s=>s.childrenIndex)))}const m1=/^:[\w-]+$/,g1=3,_1=2,x1=1,v1=10,y1=-2,jx=a=>a==="*";function S1(a,e){let n=a.split("/"),s=n.length;return n.some(jx)&&(s+=y1),e&&(s+=_1),n.filter(l=>!jx(l)).reduce((l,c)=>l+(m1.test(c)?g1:c===""?x1:v1),s)}function b1(a,e){return a.length===e.length&&a.slice(0,-1).every((s,l)=>s===e[l])?a[a.length-1]-e[e.length-1]:0}function M1(a,e,n){let{routesMeta:s}=a,l={},c="/",u=[];for(let d=0;d<s.length;++d){let m=s[d],p=d===s.length-1,_=c==="/"?e:e.slice(c.length)||"/",x=E1({path:m.relativePath,caseSensitive:m.caseSensitive,end:p},_),g=m.route;if(!x)return null;Object.assign(l,x.params),u.push({params:l,pathname:Ss([c,x.pathname]),pathnameBase:N1(Ss([c,x.pathnameBase])),route:g}),x.pathnameBase!=="/"&&(c=Ss([c,x.pathnameBase]))}return u}function E1(a,e){typeof a=="string"&&(a={path:a,caseSensitive:!1,end:!0});let[n,s]=T1(a.path,a.caseSensitive,a.end),l=e.match(n);if(!l)return null;let c=l[0],u=c.replace(/(.)\/+$/,"$1"),d=l.slice(1);return{params:s.reduce((p,_,x)=>{let{paramName:g,isOptional:S}=_;if(g==="*"){let E=d[x]||"";u=c.slice(0,c.length-E.length).replace(/(.)\/+$/,"$1")}const M=d[x];return S&&!M?p[g]=void 0:p[g]=(M||"").replace(/%2F/g,"/"),p},{}),pathname:c,pathnameBase:u,pattern:a}}function T1(a,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),of(a==="*"||!a.endsWith("*")||a.endsWith("/*"),'Route path "'+a+'" will be treated as if it were '+('"'+a.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+a.replace(/\*$/,"/*")+'".'));let s=[],l="^"+a.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(u,d,m)=>(s.push({paramName:d,isOptional:m!=null}),m?"/?([^\\/]+)?":"/([^\\/]+)"));return a.endsWith("*")?(s.push({paramName:"*"}),l+=a==="*"||a==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?l+="\\/*$":a!==""&&a!=="/"&&(l+="(?:(?=\\/|$))"),[new RegExp(l,e?void 0:"i"),s]}function A1(a){try{return a.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return of(!1,'The URL path "'+a+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),a}}function gm(a,e){if(e==="/")return a;if(!a.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,s=a.charAt(n);return s&&s!=="/"?null:a.slice(n)||"/"}const w1=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,R1=a=>w1.test(a);function C1(a,e){e===void 0&&(e="/");let{pathname:n,search:s="",hash:l=""}=typeof a=="string"?lr(a):a,c;if(n)if(R1(n))c=n;else{if(n.includes("//")){let u=n;n=zy(n),of(!1,"Pathnames cannot have embedded double slashes - normalizing "+(u+" -> "+n))}n.startsWith("/")?c=Xx(n.substring(1),"/"):c=Xx(n,e)}else c=e;return{pathname:c,search:L1(s),hash:U1(l)}}function Xx(a,e){let n=e.replace(/\/+$/,"").split("/");return a.split("/").forEach(l=>{l===".."?n.length>1&&n.pop():l!=="."&&n.push(l)}),n.length>1?n.join("/"):"/"}function Md(a,e,n,s){return"Cannot include a '"+a+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function D1(a){return a.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function Oy(a,e){let n=D1(a);return e?n.map((s,l)=>l===n.length-1?s.pathname:s.pathnameBase):n.map(s=>s.pathnameBase)}function Py(a,e,n,s){s===void 0&&(s=!1);let l;typeof a=="string"?l=lr(a):(l=Fl({},a),Sn(!l.pathname||!l.pathname.includes("?"),Md("?","pathname","search",l)),Sn(!l.pathname||!l.pathname.includes("#"),Md("#","pathname","hash",l)),Sn(!l.search||!l.search.includes("#"),Md("#","search","hash",l)));let c=a===""||l.pathname==="",u=c?"/":l.pathname,d;if(u==null)d=n;else{let x=e.length-1;if(!s&&u.startsWith("..")){let g=u.split("/");for(;g[0]==="..";)g.shift(),x-=1;l.pathname=g.join("/")}d=x>=0?e[x]:"/"}let m=C1(l,d),p=u&&u!=="/"&&u.endsWith("/"),_=(c||u===".")&&n.endsWith("/");return!m.pathname.endsWith("/")&&(p||_)&&(m.pathname+="/"),m}const zy=a=>a.replace(/\/\/+/g,"/"),Ss=a=>zy(a.join("/")),N1=a=>a.replace(/\/+$/,"").replace(/^\/*/,"/"),L1=a=>!a||a==="?"?"":a.startsWith("?")?a:"?"+a,U1=a=>!a||a==="#"?"":a.startsWith("#")?a:"#"+a;function O1(a){return a!=null&&typeof a.status=="number"&&typeof a.statusText=="string"&&typeof a.internal=="boolean"&&"data"in a}const Iy=["post","put","patch","delete"];new Set(Iy);const P1=["get",...Iy];new Set(P1);/**
 * React Router v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Bl(){return Bl=Object.assign?Object.assign.bind():function(a){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)({}).hasOwnProperty.call(n,s)&&(a[s]=n[s])}return a},Bl.apply(null,arguments)}const _m=pe.createContext(null),z1=pe.createContext(null),cr=pe.createContext(null),lf=pe.createContext(null),ur=pe.createContext({outlet:null,matches:[],isDataRoute:!1}),Fy=pe.createContext(null);function I1(a,e){let{relative:n}=e===void 0?{}:e;Xl()||Sn(!1);let{basename:s,navigator:l}=pe.useContext(cr),{hash:c,pathname:u,search:d}=Hy(a,{relative:n}),m=u;return s!=="/"&&(m=u==="/"?s:Ss([s,u])),l.createHref({pathname:m,search:d,hash:c})}function Xl(){return pe.useContext(lf)!=null}function cf(){return Xl()||Sn(!1),pe.useContext(lf).location}function By(a){pe.useContext(cr).static||pe.useLayoutEffect(a)}function F1(){let{isDataRoute:a}=pe.useContext(ur);return a?Q1():B1()}function B1(){Xl()||Sn(!1);let a=pe.useContext(_m),{basename:e,future:n,navigator:s}=pe.useContext(cr),{matches:l}=pe.useContext(ur),{pathname:c}=cf(),u=JSON.stringify(Oy(l,n.v7_relativeSplatPath)),d=pe.useRef(!1);return By(()=>{d.current=!0}),pe.useCallback(function(p,_){if(_===void 0&&(_={}),!d.current)return;if(typeof p=="number"){s.go(p);return}let x=Py(p,JSON.parse(u),c,_.relative==="path");a==null&&e!=="/"&&(x.pathname=x.pathname==="/"?e:Ss([e,x.pathname])),(_.replace?s.replace:s.push)(x,_.state,_)},[e,s,u,c,a])}function Hy(a,e){let{relative:n}=e===void 0?{}:e,{future:s}=pe.useContext(cr),{matches:l}=pe.useContext(ur),{pathname:c}=cf(),u=JSON.stringify(Oy(l,s.v7_relativeSplatPath));return pe.useMemo(()=>Py(a,JSON.parse(u),c,n==="path"),[a,u,c,n])}function H1(a,e){return G1(a,e)}function G1(a,e,n,s){Xl()||Sn(!1);let{navigator:l}=pe.useContext(cr),{matches:c}=pe.useContext(ur),u=c[c.length-1],d=u?u.params:{};u&&u.pathname;let m=u?u.pathnameBase:"/";u&&u.route;let p=cf(),_;if(e){var x;let v=typeof e=="string"?lr(e):e;m==="/"||(x=v.pathname)!=null&&x.startsWith(m)||Sn(!1),_=v}else _=p;let g=_.pathname||"/",S=g;if(m!=="/"){let v=m.replace(/^\//,"").split("/");S="/"+g.replace(/^\//,"").split("/").slice(v.length).join("/")}let M=h1(a,{pathname:S}),E=W1(M&&M.map(v=>Object.assign({},v,{params:Object.assign({},d,v.params),pathname:Ss([m,l.encodeLocation?l.encodeLocation(v.pathname).pathname:v.pathname]),pathnameBase:v.pathnameBase==="/"?m:Ss([m,l.encodeLocation?l.encodeLocation(v.pathnameBase).pathname:v.pathnameBase])})),c,n,s);return e&&E?pe.createElement(lf.Provider,{value:{location:Bl({pathname:"/",search:"",hash:"",state:null,key:"default"},_),navigationType:vs.Pop}},E):E}function V1(){let a=K1(),e=O1(a)?a.status+" "+a.statusText:a instanceof Error?a.message:JSON.stringify(a),n=a instanceof Error?a.stack:null,l={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return pe.createElement(pe.Fragment,null,pe.createElement("h2",null,"Unexpected Application Error!"),pe.createElement("h3",{style:{fontStyle:"italic"}},e),n?pe.createElement("pre",{style:l},n):null,null)}const k1=pe.createElement(V1,null);class j1 extends pe.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?pe.createElement(ur.Provider,{value:this.props.routeContext},pe.createElement(Fy.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function X1(a){let{routeContext:e,match:n,children:s}=a,l=pe.useContext(_m);return l&&l.static&&l.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(l.staticContext._deepestRenderedBoundaryId=n.route.id),pe.createElement(ur.Provider,{value:e},s)}function W1(a,e,n,s){var l;if(e===void 0&&(e=[]),n===void 0&&(n=null),s===void 0&&(s=null),a==null){var c;if(!n)return null;if(n.errors)a=n.matches;else if((c=s)!=null&&c.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)a=n.matches;else return null}let u=a,d=(l=n)==null?void 0:l.errors;if(d!=null){let _=u.findIndex(x=>x.route.id&&(d==null?void 0:d[x.route.id])!==void 0);_>=0||Sn(!1),u=u.slice(0,Math.min(u.length,_+1))}let m=!1,p=-1;if(n&&s&&s.v7_partialHydration)for(let _=0;_<u.length;_++){let x=u[_];if((x.route.HydrateFallback||x.route.hydrateFallbackElement)&&(p=_),x.route.id){let{loaderData:g,errors:S}=n,M=x.route.loader&&g[x.route.id]===void 0&&(!S||S[x.route.id]===void 0);if(x.route.lazy||M){m=!0,p>=0?u=u.slice(0,p+1):u=[u[0]];break}}}return u.reduceRight((_,x,g)=>{let S,M=!1,E=null,v=null;n&&(S=d&&x.route.id?d[x.route.id]:void 0,E=x.route.errorElement||k1,m&&(p<0&&g===0?(J1("route-fallback"),M=!0,v=null):p===g&&(M=!0,v=x.route.hydrateFallbackElement||null)));let y=e.concat(u.slice(0,g+1)),A=()=>{let N;return S?N=E:M?N=v:x.route.Component?N=pe.createElement(x.route.Component,null):x.route.element?N=x.route.element:N=_,pe.createElement(X1,{match:x,routeContext:{outlet:_,matches:y,isDataRoute:n!=null},children:N})};return n&&(x.route.ErrorBoundary||x.route.errorElement||g===0)?pe.createElement(j1,{location:n.location,revalidation:n.revalidation,component:E,error:S,children:A(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):A()},null)}var Gy=(function(a){return a.UseBlocker="useBlocker",a.UseRevalidator="useRevalidator",a.UseNavigateStable="useNavigate",a})(Gy||{}),Vy=(function(a){return a.UseBlocker="useBlocker",a.UseLoaderData="useLoaderData",a.UseActionData="useActionData",a.UseRouteError="useRouteError",a.UseNavigation="useNavigation",a.UseRouteLoaderData="useRouteLoaderData",a.UseMatches="useMatches",a.UseRevalidator="useRevalidator",a.UseNavigateStable="useNavigate",a.UseRouteId="useRouteId",a})(Vy||{});function q1(a){let e=pe.useContext(_m);return e||Sn(!1),e}function Y1(a){let e=pe.useContext(z1);return e||Sn(!1),e}function Z1(a){let e=pe.useContext(ur);return e||Sn(!1),e}function ky(a){let e=Z1(),n=e.matches[e.matches.length-1];return n.route.id||Sn(!1),n.route.id}function K1(){var a;let e=pe.useContext(Fy),n=Y1(),s=ky();return e!==void 0?e:(a=n.errors)==null?void 0:a[s]}function Q1(){let{router:a}=q1(Gy.UseNavigateStable),e=ky(Vy.UseNavigateStable),n=pe.useRef(!1);return By(()=>{n.current=!0}),pe.useCallback(function(l,c){c===void 0&&(c={}),n.current&&(typeof l=="number"?a.navigate(l):a.navigate(l,Bl({fromRouteId:e},c)))},[a,e])}const Wx={};function J1(a,e,n){Wx[a]||(Wx[a]=!0)}function $1(a,e){a==null||a.v7_startTransition,a==null||a.v7_relativeSplatPath}function hp(a){Sn(!1)}function eE(a){let{basename:e="/",children:n=null,location:s,navigationType:l=vs.Pop,navigator:c,static:u=!1,future:d}=a;Xl()&&Sn(!1);let m=e.replace(/^\/*/,"/"),p=pe.useMemo(()=>({basename:m,navigator:c,static:u,future:Bl({v7_relativeSplatPath:!1},d)}),[m,d,c,u]);typeof s=="string"&&(s=lr(s));let{pathname:_="/",search:x="",hash:g="",state:S=null,key:M="default"}=s,E=pe.useMemo(()=>{let v=gm(_,m);return v==null?null:{location:{pathname:v,search:x,hash:g,state:S,key:M},navigationType:l}},[m,_,x,g,S,M,l]);return E==null?null:pe.createElement(cr.Provider,{value:p},pe.createElement(lf.Provider,{children:n,value:E}))}function tE(a){let{children:e,location:n}=a;return H1(dp(e),n)}new Promise(()=>{});function dp(a,e){e===void 0&&(e=[]);let n=[];return pe.Children.forEach(a,(s,l)=>{if(!pe.isValidElement(s))return;let c=[...e,l];if(s.type===pe.Fragment){n.push.apply(n,dp(s.props.children,c));return}s.type!==hp&&Sn(!1),!s.props.index||!s.props.children||Sn(!1);let u={id:s.props.id||c.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,loader:s.props.loader,action:s.props.action,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(u.children=dp(s.props.children,c)),n.push(u)}),n}/**
 * React Router DOM v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function pp(){return pp=Object.assign?Object.assign.bind():function(a){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)({}).hasOwnProperty.call(n,s)&&(a[s]=n[s])}return a},pp.apply(null,arguments)}function nE(a,e){if(a==null)return{};var n={};for(var s in a)if({}.hasOwnProperty.call(a,s)){if(e.indexOf(s)!==-1)continue;n[s]=a[s]}return n}function iE(a){return!!(a.metaKey||a.altKey||a.ctrlKey||a.shiftKey)}function aE(a,e){return a.button===0&&(!e||e==="_self")&&!iE(a)}const sE=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],rE="6";try{window.__reactRouterVersion=rE}catch{}const oE="startTransition",qx=n1[oE];function lE(a){let{basename:e,children:n,future:s,window:l}=a,c=pe.useRef();c.current==null&&(c.current=c1({window:l,v5Compat:!0}));let u=c.current,[d,m]=pe.useState({action:u.action,location:u.location}),{v7_startTransition:p}=s||{},_=pe.useCallback(x=>{p&&qx?qx(()=>m(x)):m(x)},[m,p]);return pe.useLayoutEffect(()=>u.listen(_),[u,_]),pe.useEffect(()=>$1(s),[s]),pe.createElement(eE,{basename:e,children:n,location:d.location,navigationType:d.action,navigator:u,future:s})}const cE=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",uE=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Bu=pe.forwardRef(function(e,n){let{onClick:s,relative:l,reloadDocument:c,replace:u,state:d,target:m,to:p,preventScrollReset:_,viewTransition:x}=e,g=nE(e,sE),{basename:S}=pe.useContext(cr),M,E=!1;if(typeof p=="string"&&uE.test(p)&&(M=p,cE))try{let N=new URL(window.location.href),C=p.startsWith("//")?new URL(N.protocol+p):new URL(p),I=gm(C.pathname,S);C.origin===N.origin&&I!=null?p=I+C.search+C.hash:E=!0}catch{}let v=I1(p,{relative:l}),y=fE(p,{replace:u,state:d,target:m,preventScrollReset:_,relative:l,viewTransition:x});function A(N){s&&s(N),N.defaultPrevented||y(N)}return pe.createElement("a",pp({},g,{href:M||v,onClick:E||c?s:A,ref:n,target:m}))});var Yx;(function(a){a.UseScrollRestoration="useScrollRestoration",a.UseSubmit="useSubmit",a.UseSubmitFetcher="useSubmitFetcher",a.UseFetcher="useFetcher",a.useViewTransitionState="useViewTransitionState"})(Yx||(Yx={}));var Zx;(function(a){a.UseFetcher="useFetcher",a.UseFetchers="useFetchers",a.UseScrollRestoration="useScrollRestoration"})(Zx||(Zx={}));function fE(a,e){let{target:n,replace:s,state:l,preventScrollReset:c,relative:u,viewTransition:d}=e===void 0?{}:e,m=F1(),p=cf(),_=Hy(a,{relative:u});return pe.useCallback(x=>{if(aE(x,n)){x.preventDefault();let g=s!==void 0?s:Yu(p)===Yu(_);m(a,{replace:g,state:l,preventScrollReset:c,relative:u,viewTransition:d})}},[p,m,_,s,l,n,a,c,u,d])}/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hE=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),dE=a=>a.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,n,s)=>s?s.toUpperCase():n.toLowerCase()),Kx=a=>{const e=dE(a);return e.charAt(0).toUpperCase()+e.slice(1)},jy=(...a)=>a.filter((e,n,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===n).join(" ").trim(),pE=a=>{for(const e in a)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var mE={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gE=pe.forwardRef(({color:a="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:s,className:l="",children:c,iconNode:u,...d},m)=>pe.createElement("svg",{ref:m,...mE,width:e,height:e,stroke:a,strokeWidth:s?Number(n)*24/Number(e):n,className:jy("lucide",l),...!c&&!pE(d)&&{"aria-hidden":"true"},...d},[...u.map(([p,_])=>pe.createElement(p,_)),...Array.isArray(c)?c:[c]]));/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=(a,e)=>{const n=pe.forwardRef(({className:s,...l},c)=>pe.createElement(gE,{ref:c,iconNode:e,className:jy(`lucide-${hE(Kx(a))}`,`lucide-${a}`,s),...l}));return n.displayName=Kx(a),n};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _E=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],xE=Ot("activity",_E);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vE=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],yE=Ot("arrow-left",vE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SE=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Ed=Ot("arrow-right",SE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bE=[["path",{d:"M5 21v-6",key:"1hz6c0"}],["path",{d:"M12 21V3",key:"1lcnhd"}],["path",{d:"M19 21V9",key:"unv183"}]],ME=Ot("chart-no-axes-column",bE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EE=[["path",{d:"M12 13v8",key:"1l5pq0"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"m8 17 4-4 4 4",key:"1quai1"}]],TE=Ot("cloud-upload",EE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AE=[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],wE=Ot("code-xml",AE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RE=[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],mp=Ot("compass",RE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CE=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],xm=Ot("cpu",CE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DE=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],gp=Ot("database",DE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NE=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],LE=Ot("download",NE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UE=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]],Qx=Ot("file-spreadsheet",UE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OE=[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]],PE=Ot("github",OE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zE=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],IE=Ot("info",zE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FE=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],BE=Ot("mail",FE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HE=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],GE=Ot("monitor",HE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VE=[["path",{d:"m8 3 4 8 5-5 5 15H2L8 3z",key:"otkl63"}]],kE=Ot("mountain",VE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jE=[["path",{d:"M20.341 6.484A10 10 0 0 1 10.266 21.85",key:"1enhxb"}],["path",{d:"M3.659 17.516A10 10 0 0 1 13.74 2.152",key:"1crzgf"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["circle",{cx:"19",cy:"5",r:"2",key:"mhkx31"}],["circle",{cx:"5",cy:"19",r:"2",key:"v8kfzx"}]],XE=Ot("orbit",jE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WE=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",key:"e79jfc"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}]],qE=Ot("palette",WE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YE=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],ZE=Ot("pause",YE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KE=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],QE=Ot("play",KE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JE=[["path",{d:"M16.247 7.761a6 6 0 0 1 0 8.478",key:"1fwjs5"}],["path",{d:"M19.075 4.933a10 10 0 0 1 0 14.134",key:"ehdyv1"}],["path",{d:"M4.925 19.067a10 10 0 0 1 0-14.134",key:"1q22gi"}],["path",{d:"M7.753 16.239a6 6 0 0 1 0-8.478",key:"r2q7qm"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],Hl=Ot("radio",JE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $E=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],eT=Ot("refresh-cw",$E);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tT=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],nT=Ot("settings",tT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iT=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],aT=Ot("shield-check",iT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sT=[["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M12 21v-9",key:"17s77i"}],["path",{d:"M12 8V3",key:"13r4qs"}],["path",{d:"M17 16h4",key:"h1uq16"}],["path",{d:"M19 12V3",key:"o1uvq1"}],["path",{d:"M19 21v-5",key:"qua636"}],["path",{d:"M3 14h4",key:"bcjad9"}],["path",{d:"M5 10V3",key:"cb8scm"}],["path",{d:"M5 21v-7",key:"1w1uti"}]],vm=Ot("sliders-vertical",sT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rT=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Jx=Ot("triangle-alert",rT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oT=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],lT=Ot("upload",oT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cT=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],uT=Ot("user",cT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fT=[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"knzxuh"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"2jd2cc"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"rd2r6e"}]],hT=Ot("waves",fT);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dT=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],pT=Ot("zap",dT),mT=[{icon:Hl,title:"EEF Ecological Encoding Framework",description:"Real-time 3D geospatial telemetry dashboard for exploring ocean-color spectral variables.",cta:"Launch Dashboard",ctaTo:"/dashboard",badge:"Web",color:"from-cyan-500 to-blue-500"},{icon:wE,title:"VibeCode Grasshopper Editor",description:"Interactive 3D visual programming environment for grasshopper algorithm design and parametric modeling.",cta:"Download (macOS arm64)",ctaHref:"https://github.com/leluxiceice/CAPRI/releases/download/v0.1.0/VibeCode.Grasshopper.Editor-0.1.0-arm64.dmg",badge:"Desktop",color:"from-purple-500 to-pink-500"}],gT=[{icon:XE,title:"Launch the dashboard",description:"Open the console to start the synthetic telemetry stream and bring the 3D terrain online."},{icon:vm,title:"Configure the stream",description:"Tune flow velocity, Gaussian noise, thermal-front anomalies, sensor drift, and refresh rate — or drop in a CSV for recorded playback."},{icon:kE,title:"Explore the terrain",description:"Orbit, zoom, and adjust layer spacing across the 20×20 multi-layer mesh; toggle any of the seven spectral variables on or off."},{icon:xE,title:"Read the diagnostics",description:"Watch regime classification, tipping-point entropy, spatial-front index, and novelty p-value update live as the signal evolves."}],_T=[{icon:Hl,title:"Real-time 3D Terrain HUD",description:"Seven spectral variables — CHL, aphy, ADG, bbp, TSM, PAR, KD490 — rendered as a 20×20 multi-layer Three.js terrain."},{icon:vm,title:"Stream Modulators",description:"Live sliders for flow velocity, Gaussian noise, thermal-front anomalies, sensor drift, and stream refresh rate."},{icon:TE,title:"CSV Playback",description:"Drag and drop a 20×20 cell-vector CSV; frames play back and persist across reloads via localStorage."},{icon:qE,title:"Custom Colormaps",description:"Click any gradient strip to set a per-variable hex color; ramps generate live and apply to the 3D heatmap."},{icon:xm,title:"Scientific Diagnostics",description:"Regime classification, tipping-point entropy, spatial-front index, and a heuristic novelty p-value — illustrative, not a trained model."},{icon:GE,title:"macOS Desktop App",description:"Package the dashboard as a standalone Electron .dmg for arm64 Macs, no browser required."}];function xT(){return R.jsxs("div",{className:"min-h-screen bg-[#030307] text-[#f8fafc] antialiased selection:bg-white selection:text-black",children:[R.jsxs("header",{className:"h-[56px] border-b border-white/5 bg-[#030307]/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20",children:[R.jsxs("div",{className:"flex items-center gap-3",children:[R.jsx("div",{className:"relative w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-black text-sm select-none shadow-[0_0_15px_rgba(255,255,255,0.2)]",children:R.jsx(xm,{size:16})}),R.jsxs("div",{className:"flex items-center gap-2",children:[R.jsx("h1",{className:"text-sm font-black uppercase tracking-wider text-white",children:"EEF"}),R.jsx("span",{className:"text-white/30 text-xs",children:"|"}),R.jsx("span",{className:"text-[11px] font-mono tracking-widest text-white/90 font-bold bg-white/10 border border-white/10 px-1.5 py-0.5 rounded",children:"ECOLOGICAL ENCODING FRAMEWORK"})]})]}),R.jsxs(Bu,{to:"/dashboard",className:"hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-white bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/15 hover:border-white/20 transition-colors",children:["Launch Dashboard ",R.jsx(Ed,{size:12})]})]}),R.jsxs("main",{className:"max-w-[1280px] w-full mx-auto px-4 sm:px-6",children:[R.jsxs("section",{className:"py-20 sm:py-28 flex flex-col items-center text-center gap-6",children:[R.jsx("span",{className:"text-[10px] font-mono uppercase tracking-widest text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full",children:"Interactive · Multi-Platform Portal"}),R.jsx("h1",{className:"text-4xl sm:text-6xl font-black tracking-tight text-white max-w-3xl",children:"CAPRI — Multi-Application Platform"}),R.jsx("p",{className:"text-sm sm:text-base text-white/60 max-w-xl leading-relaxed",children:"A unified portal for interactive scientific tools and visual programming environments. From real-time 3D telemetry dashboards to parametric design editors — all powered by cutting-edge visualization and data processing technologies."}),R.jsx("div",{className:"flex flex-wrap items-center justify-center gap-3 mt-2",children:R.jsxs("a",{href:"https://github.com/leluxIceIce/CAPRI",target:"_blank",rel:"noreferrer",className:"inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-white border border-white/20 px-5 py-3 rounded-2xl hover:bg-white/5 hover:border-white/35 transition-colors",children:[R.jsx(PE,{size:14})," View on GitHub"]})})]}),R.jsxs("section",{className:"py-14 sm:py-20",children:[R.jsxs("div",{className:"flex items-center gap-2 mb-8",children:[R.jsx("span",{className:"text-[10px] font-mono uppercase tracking-widest text-white/40",children:"00"}),R.jsx("h2",{className:"text-xs font-bold uppercase tracking-widest text-white",children:"Featured Applications"}),R.jsx("div",{className:"flex-1 h-px bg-white/5"})]}),R.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-6",children:mT.map(a=>{const e=a.icon;return R.jsxs("div",{className:"group glass-panel rounded-3xl overflow-hidden flex flex-col gap-6 p-8 relative border border-white/10 hover:border-white/20 transition-all",children:[R.jsx("div",{className:`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-r ${a.color} opacity-5 blur-3xl rounded-full group-hover:opacity-10 transition-opacity`}),R.jsx("div",{className:"relative z-10 flex items-start justify-between",children:R.jsxs("div",{className:"flex items-start gap-4 flex-1",children:[R.jsx("div",{className:"w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 flex-shrink-0",children:R.jsx(e,{size:24})}),R.jsxs("div",{className:"text-left flex-1",children:[R.jsx("h3",{className:"text-lg font-bold text-white mb-1",children:a.title}),R.jsx("span",{className:"text-[9px] font-mono font-bold uppercase tracking-widest text-white/40 bg-white/5 border border-white/10 px-2 py-1 rounded inline-block",children:a.badge})]})]})}),R.jsx("p",{className:"text-sm text-white/60 leading-relaxed relative z-10",children:a.description}),R.jsx("div",{className:"relative z-10 mt-auto",children:a.ctaTo?R.jsxs(Bu,{to:a.ctaTo,className:"inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-black bg-white px-5 py-3 rounded-xl hover:bg-white/90 transition-all group/btn",children:[a.cta," ",R.jsx(Ed,{size:12,className:"group-hover/btn:translate-x-0.5 transition-transform"})]}):R.jsxs("a",{href:a.ctaHref,className:"inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-black bg-white px-5 py-3 rounded-xl hover:bg-white/90 transition-all group/btn",children:[R.jsx(LE,{size:12})," ",a.cta]})})]},a.title)})})]}),R.jsxs("section",{className:"py-14 sm:py-20",children:[R.jsxs("div",{className:"flex items-center gap-2 mb-8",children:[R.jsx("span",{className:"text-[10px] font-mono uppercase tracking-widest text-white/40",children:"01"}),R.jsx("h2",{className:"text-xs font-bold uppercase tracking-widest text-white",children:"How to use"}),R.jsx("div",{className:"flex-1 h-px bg-white/5"})]}),R.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",children:gT.map((a,e)=>{const n=a.icon;return R.jsxs("div",{className:"glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col gap-3",children:[R.jsxs("div",{className:"flex items-center justify-between",children:[R.jsx("div",{className:"w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70",children:R.jsx(n,{size:16})}),R.jsxs("span",{className:"text-[10px] font-mono text-white/30 font-bold",children:["STEP ",String(e+1).padStart(2,"0")]})]}),R.jsx("h3",{className:"text-sm font-bold text-white",children:a.title}),R.jsx("p",{className:"text-[12px] text-white/50 leading-relaxed",children:a.description})]},a.title)})})]}),R.jsxs("section",{className:"py-14 sm:py-20",children:[R.jsxs("div",{className:"flex items-center gap-2 mb-8",children:[R.jsx("span",{className:"text-[10px] font-mono uppercase tracking-widest text-white/40",children:"02"}),R.jsx("h2",{className:"text-xs font-bold uppercase tracking-widest text-white",children:"Interactive resources"}),R.jsx("div",{className:"flex-1 h-px bg-white/5"})]}),R.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:_T.map(a=>{const e=a.icon;return R.jsxs("div",{className:"glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col gap-3",children:[R.jsx("div",{className:"w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 pulse-teal-glow",children:R.jsx(e,{size:16})}),R.jsx("h3",{className:"text-sm font-bold text-white",children:a.title}),R.jsx("p",{className:"text-[12px] text-white/50 leading-relaxed",children:a.description})]},a.title)})})]}),R.jsx("section",{className:"py-14 sm:py-24",children:R.jsxs("div",{className:"glass-panel rounded-3xl p-8 sm:p-12 flex flex-col items-center text-center gap-5",children:[R.jsx("h2",{className:"text-2xl sm:text-3xl font-black text-white tracking-tight",children:"Ready to inspect the cube?"}),R.jsx("p",{className:"text-sm text-white/50 max-w-md",children:"Jump straight into the console — the synthetic stream starts running immediately, no setup required."}),R.jsxs(Bu,{to:"/dashboard",className:"inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-black bg-white px-5 py-3 rounded-2xl shadow-[0_0_24px_rgba(255,255,255,0.18)] hover:shadow-[0_0_32px_rgba(255,255,255,0.28)] hover:bg-white/90 transition-all",children:["Launch Dashboard ",R.jsx(Ed,{size:14})]})]})})]}),R.jsxs("footer",{className:"border-t border-white/5 text-[10px] text-white/30 font-mono flex flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-6 py-4 select-none max-w-[1280px] w-full mx-auto",children:[R.jsx("span",{children:"EEF PIPELINE ENGINE · CLIENT-SIDE SPECTRAL RECONSTRUCTION CORE"}),R.jsxs("span",{className:"flex items-center gap-1.5",children:[R.jsx(BE,{size:11,className:"text-white/30"})," iceicefelix@gmail.com"]})]})]})}function Xy(a,e=0){return Array(a).fill(null).map(()=>Array(a).fill(e))}const $x={coastal:{CHL:{base:.72,freq:2.1,plumeAmp:.25},aphy:{base:.65,freq:1.9,plumeAmp:.22},ADG:{base:.58,freq:1.5,plumeAmp:.18},bbp:{base:.5,freq:2.5,plumeAmp:.15},TSM:{base:.62,freq:2.8,plumeAmp:.28},PAR:{base:.45,freq:.6,plumeAmp:.08},KD490:{base:.68,freq:2.3,plumeAmp:.24}},deepsea:{CHL:{base:.12,freq:.8,plumeAmp:.03},aphy:{base:.1,freq:.7,plumeAmp:.02},ADG:{base:.08,freq:.6,plumeAmp:.02},bbp:{base:.05,freq:.5,plumeAmp:.01},TSM:{base:.06,freq:.4,plumeAmp:.01},PAR:{base:.82,freq:.2,plumeAmp:.04},KD490:{base:.15,freq:.8,plumeAmp:.03}},estuary:{CHL:{base:.48,freq:1.5,plumeAmp:.15},aphy:{base:.42,freq:1.3,plumeAmp:.12},ADG:{base:.65,freq:2,plumeAmp:.25},bbp:{base:.72,freq:3.2,plumeAmp:.3},TSM:{base:.82,freq:3.5,plumeAmp:.35},PAR:{base:.32,freq:1,plumeAmp:.12},KD490:{base:.78,freq:2.8,plumeAmp:.25}}};function vT(a,e,n,s=20){const l=Xy(s),c=n.flowSpeed,u=Math.sin(e*.05)*n.driftFactor;let d="coastal";n.mode==="preset_deepsea"&&(d="deepsea"),n.mode==="preset_estuary"&&(d="estuary");const m=$x[d]||$x.coastal,{base:p,freq:_,plumeAmp:x}=m[a],g=e*.15*c;for(let S=0;S<s;S++){const M=S/s*2-1;for(let E=0;E<s;E++){const v=E/s*2-1,y=Math.sin(v*1.5+g)*Math.cos(M*1.5-g*.8)*.15+.5,A=v-Math.sin(M*2+g*.5)*.3-.2,N=M+Math.cos(v*1.8+g*.6)*.2+.3,C=Math.sqrt(A*A+N*N),I=Math.exp(-(C*C)/.8);let U=0;if(n.currentAnomaly>0){const X=v-.4,B=M-.3,j=Math.sqrt(X*X+B*B);U=Math.exp(-(j*j)/.12)*n.currentAnomaly}const z=Math.sin(v*s*.3+g*3)*Math.cos(M*s*.3-g*2.5)*.05,T=(Math.random()-.5)*n.noiseLevel;let F=p*y+I*x+U*.4+z+T+u;a==="PAR"&&(F=.75+Math.sin(v+g*.1)*.1-I*.12+T*.3),l[S][E]=Math.max(.001,Math.min(1,F))}}return l}function Wy(a){let e=1/0,n=-1/0,s=0;const l=[];for(let m=0;m<a.length;m++)for(let p=0;p<a[m].length;p++){const _=a[m][p];l.push(_),_<e&&(e=_),_>n&&(n=_),s+=_}const c=s/l.length,u=l.reduce((m,p)=>m+Math.pow(p-c,2),0)/l.length,d=Math.sqrt(u);return{min:isFinite(e)?e:0,max:isFinite(n)?n:1,mean:isNaN(c)?.5:c,std:isNaN(d)?.1:d}}function au(a,e,n=20){const s={},l={};return["CHL","aphy","ADG","bbp","TSM","PAR","KD490"].forEach(u=>{s[u]=vT(u,a,e,n),l[u]=Wy(s[u])}),{gridSize:n,timestamp:new Date().toISOString(),channels:s,stats:l}}function yT(a){const e=a.trim().toLowerCase();return e==="chl"||e==="chl_nn"||e==="chl_oc4me"||e==="chlorophyll"||e.includes("chlorophyll")?"CHL":e==="aphy"||e==="aphy_443"||e==="aphy443"||e.includes("aphy")?"aphy":e==="adg"||e==="adg_443"||e==="adg443"||e.includes("adg")||e.includes("detritus")?"ADG":e==="bbp"||e==="bbp_443"||e==="bbp443"||e.includes("bbp")||e.includes("backscatter")?"bbp":e==="tsm"||e==="tsm_nn"||e==="suspended"||e.includes("tsm")||e.includes("solids")||e==="spm"?"TSM":e==="par"||e==="solar"||e==="radiation"||e.includes("par")?"PAR":e==="kd490"||e==="kd_490"||e==="kd"||e.includes("att")||e.includes("kd490")?"KD490":null}function ST(a){const e=a.trim().split(`
`);if(e.length<2)throw new Error("CSV file does not contain header or rows.");const n=e[0],s=n.includes(";")?";":",",l=n.split(s).map(g=>g.trim().replace(/^["']|["']$/g,"")),c={};l.forEach((g,S)=>{const M=yT(g);M&&c[M]===void 0&&(c[M]=S)});const u=Object.keys(c);if(u.length<2)throw new Error(`CSV format not recognized. Found only ${u.length} matching variables (${u.join(", ")}). Expected columns: CHL, TSM, PAR, etc.`);const d=[];for(let g=1;g<e.length;g++){const S=e[g].trim();if(!S)continue;const E=S.split(s).map(v=>{const y=parseFloat(v.trim());return isNaN(y)?0:y});d.push(E)}const m=d.length,p=400,_=Math.max(1,Math.ceil(m/p)),x=[];for(let g=0;g<_;g++){const S=g*p,M={},E={};["CHL","aphy","ADG","bbp","TSM","PAR","KD490"].forEach(y=>{M[y]=Xy(20);const A=c[y],N=[];for(let F=0;F<p;F++){const X=(S+F)%m,B=d[X];B&&A!==void 0&&A<B.length?N.push(B[A]):N.push(0)}const C=Math.min(...N),U=Math.max(...N)-C||1,z=N.map(F=>(F-C)/U);let T=0;for(let F=0;F<20;F++)for(let X=0;X<20;X++)M[y][F][X]=z[T]||.1,T++;E[y]=Wy(M[y])}),x.push({gridSize:20,timestamp:new Date(Date.now()+g*5e3).toISOString(),channels:M,stats:E})}return x}const Td={coastal_bloom:{CHL:.7,TSM:.65,ADG:.6,bbp:.55},shallow_sea:{CHL:.4,TSM:.35,ADG:.4,bbp:.32},deep_pelagic:{CHL:.1,TSM:.08,ADG:.08,bbp:.05}};function bT(a){var $;const e=a.stats.CHL.mean,n=a.stats.TSM.mean,s=a.stats.ADG.mean,l=a.stats.bbp.mean,c=a.stats.PAR.mean,u=(($=a.stats.KD490)==null?void 0:$.mean)||.5,d=he=>Math.pow(e-he.CHL,2)+Math.pow(n-he.TSM,2)+Math.pow(s-he.ADG,2)+Math.pow(l-he.bbp,2),m=d(Td.coastal_bloom),p=d(Td.shallow_sea),_=d(Td.deep_pelagic),x=Math.exp(-m/.08),g=Math.exp(-p/.08),S=Math.exp(-_/.08),M=x+g+S,E=x/M,v=g/M,y=S/M;let A="Deep Pelagic Ocean Core",N=2;E>v&&E>y?(A="Coastal Eutrophic Upwelling Zone",N=0):v>E&&v>y&&(A="Shallow Sediment Estuary Front",N=1);const C=E+1e-9,I=v+1e-9,U=y+1e-9,z=-(C*Math.log2(C)+I*Math.log2(I)+U*Math.log2(U))/Math.log2(3);let T="Low (Stable)";z>.72?T="High (State Boundary)":z>.45&&(T="Moderate (Mixing)");const F=e>.9||n>.9||l>.85||e<.03;let X=Math.max(.05,Math.abs(e-.4)*1.5+Math.abs(n-.35)*1.2);F&&(X*=1.8);const B=X>.75,j=B?.004:1-Math.min(.95,X);`${((1-j)*100).toFixed(1)}`;const ie=a.stats.CHL.std,ae=a.stats.TSM.std,V=ie>.16||ae>.18,O=[];e>.6?O.push("extreme concentrations of chlorophyll-a, signaling high levels of phytoplankton biomass"):e>.3?O.push("moderate chlorophyll pigments indicating stable biological productivity"):O.push("highly depauperate chlorophyll concentrations representing oligotrophic/desert ocean cores"),n>.5?O.push("exceptionally heavy particulate loading and abiotic suspended sediment density"):O.push("superb water clarity indicating extremely sparse light-scattering mineral solids"),u>.5?O.push("rapid light transmission loss (high attenuation) in the blue-green spectrum"):O.push("excellent downwelling solar penetration depths"),c<.4?O.push("restricted incident solar irradiance representing potential light-limited biological settings"):O.push("unfettered surface solar energy availability");let G=`System is locked in the ${A}. Driven fundamentally by ${O.join(" combined with ")}.`;return V?G+=" High local spatial variance confirms placement in a hydrodynamic front, inducing high patchiness, rapid spatial gradients, and increased ecological mixing.":G+=" Consistent low spatial variance suggests placement inside a highly homogeneous regional ocean core with strong self-affinity.",T==="High (State Boundary)"&&(G+=" IMPORTANT: GMM state entropy exceeds 72%, flagging active critical transition or boundary shearing with high vulnerability to ecological regime tipping points."),{regime:A,regimeId:N,probabilities:{Coastal:E,Shallow:v,Pelagic:y},transitionRisk:T,transitionEntropy:z,stateNoveltyScore:X,stateNoveltyPValue:j,isNovel:B,isBoundaryZone:V,scientificJustification:G,timestamp:a.timestamp}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ym="184",po={ROTATE:0,DOLLY:1,PAN:2},fo={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},MT=0,ev=1,ET=2,Hu=1,TT=2,Ll=3,Es=0,ii=1,Ki=2,Da=0,mo=1,tv=2,nv=3,iv=4,AT=5,Js=100,wT=101,RT=102,CT=103,DT=104,NT=200,LT=201,UT=202,OT=203,_p=204,xp=205,PT=206,zT=207,IT=208,FT=209,BT=210,HT=211,GT=212,VT=213,kT=214,vp=0,yp=1,Sp=2,vo=3,bp=4,Mp=5,Ep=6,Tp=7,qy=0,jT=1,XT=2,ta=0,Yy=1,Zy=2,Ky=3,Sm=4,Qy=5,Jy=6,$y=7,eS=300,nr=301,yo=302,Ad=303,wd=304,uf=306,Ap=1e3,Ca=1001,wp=1002,In=1003,WT=1004,su=1005,Cn=1006,Rd=1007,er=1008,_i=1009,tS=1010,nS=1011,Gl=1012,bm=1013,ia=1014,Ji=1015,La=1016,Mm=1017,Em=1018,Vl=1020,iS=35902,aS=35899,sS=1021,rS=1022,Bi=1023,Ua=1026,tr=1027,oS=1028,Tm=1029,ir=1030,Am=1031,wm=1033,Gu=33776,Vu=33777,ku=33778,ju=33779,Rp=35840,Cp=35841,Dp=35842,Np=35843,Lp=36196,Up=37492,Op=37496,Pp=37488,zp=37489,Zu=37490,Ip=37491,Fp=37808,Bp=37809,Hp=37810,Gp=37811,Vp=37812,kp=37813,jp=37814,Xp=37815,Wp=37816,qp=37817,Yp=37818,Zp=37819,Kp=37820,Qp=37821,Jp=36492,$p=36494,em=36495,tm=36283,nm=36284,Ku=36285,im=36286,qT=3200,am=0,YT=1,_s="",Ci="srgb",Qu="srgb-linear",Ju="linear",Gt="srgb",Wr=7680,av=519,ZT=512,KT=513,QT=514,Rm=515,JT=516,$T=517,Cm=518,eA=519,sm=35044,sv="300 es",$i=2e3,kl=2001;function tA(a){for(let e=a.length-1;e>=0;--e)if(a[e]>=65535)return!0;return!1}function $u(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function nA(){const a=$u("canvas");return a.style.display="block",a}const rv={};function ef(...a){const e="THREE."+a.shift();console.log(e,...a)}function lS(a){const e=a[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=a[1];n&&n.isStackTrace?a[0]+=" "+n.getLocation():a[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return a}function tt(...a){a=lS(a);const e="THREE."+a.shift();{const n=a[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...a)}}function At(...a){a=lS(a);const e="THREE."+a.shift();{const n=a[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...a)}}function rm(...a){const e=a.join(" ");e in rv||(rv[e]=!0,tt(...a))}function iA(a,e,n){return new Promise(function(s,l){function c(){switch(a.clientWaitSync(e,a.SYNC_FLUSH_COMMANDS_BIT,0)){case a.WAIT_FAILED:l();break;case a.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:s()}}setTimeout(c,n)})}const aA={[vp]:yp,[Sp]:Ep,[bp]:Tp,[vo]:Mp,[yp]:vp,[Ep]:Sp,[Tp]:bp,[Mp]:vo};class ws{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(n)===-1&&s[e].push(n)}hasEventListener(e,n){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(n)!==-1}removeEventListener(e,n){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const c=l.indexOf(n);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const s=n[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let c=0,u=l.length;c<u;c++)l[c].call(this,e);e.target=null}}}const Gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zl=Math.PI/180,om=180/Math.PI;function bs(){const a=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Gn[a&255]+Gn[a>>8&255]+Gn[a>>16&255]+Gn[a>>24&255]+"-"+Gn[e&255]+Gn[e>>8&255]+"-"+Gn[e>>16&15|64]+Gn[e>>24&255]+"-"+Gn[n&63|128]+Gn[n>>8&255]+"-"+Gn[n>>16&255]+Gn[n>>24&255]+Gn[s&255]+Gn[s>>8&255]+Gn[s>>16&255]+Gn[s>>24&255]).toLowerCase()}function St(a,e,n){return Math.max(e,Math.min(n,a))}function sA(a,e){return(a%e+e)%e}function Cd(a,e,n){return(1-n)*a+n*e}function Qi(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return a/4294967295;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int32Array:return Math.max(a/2147483647,-1);case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function Wt(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return Math.round(a*4294967295);case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int32Array:return Math.round(a*2147483647);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}const rA={DEG2RAD:zl},jm=class jm{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,s=this.y,l=e.elements;return this.x=l[0]*n+l[3]*s+l[6],this.y=l[1]*n+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=St(this.x,e.x,n.x),this.y=St(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=St(this.x,e,n),this.y=St(this.y,e,n),this}clampLength(e,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(St(s,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const s=this.dot(e)/n;return Math.acos(St(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,s=this.y-e.y;return n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,s){return this.x=e.x+(n.x-e.x)*s,this.y=e.y+(n.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const s=Math.cos(n),l=Math.sin(n),c=this.x-e.x,u=this.y-e.y;return this.x=c*s-u*l+e.x,this.y=c*l+u*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};jm.prototype.isVector2=!0;let nt=jm;class Ts{constructor(e=0,n=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=s,this._w=l}static slerpFlat(e,n,s,l,c,u,d){let m=s[l+0],p=s[l+1],_=s[l+2],x=s[l+3],g=c[u+0],S=c[u+1],M=c[u+2],E=c[u+3];if(x!==E||m!==g||p!==S||_!==M){let v=m*g+p*S+_*M+x*E;v<0&&(g=-g,S=-S,M=-M,E=-E,v=-v);let y=1-d;if(v<.9995){const A=Math.acos(v),N=Math.sin(A);y=Math.sin(y*A)/N,d=Math.sin(d*A)/N,m=m*y+g*d,p=p*y+S*d,_=_*y+M*d,x=x*y+E*d}else{m=m*y+g*d,p=p*y+S*d,_=_*y+M*d,x=x*y+E*d;const A=1/Math.sqrt(m*m+p*p+_*_+x*x);m*=A,p*=A,_*=A,x*=A}}e[n]=m,e[n+1]=p,e[n+2]=_,e[n+3]=x}static multiplyQuaternionsFlat(e,n,s,l,c,u){const d=s[l],m=s[l+1],p=s[l+2],_=s[l+3],x=c[u],g=c[u+1],S=c[u+2],M=c[u+3];return e[n]=d*M+_*x+m*S-p*g,e[n+1]=m*M+_*g+p*x-d*S,e[n+2]=p*M+_*S+d*g-m*x,e[n+3]=_*M-d*x-m*g-p*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,s,l){return this._x=e,this._y=n,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const s=e._x,l=e._y,c=e._z,u=e._order,d=Math.cos,m=Math.sin,p=d(s/2),_=d(l/2),x=d(c/2),g=m(s/2),S=m(l/2),M=m(c/2);switch(u){case"XYZ":this._x=g*_*x+p*S*M,this._y=p*S*x-g*_*M,this._z=p*_*M+g*S*x,this._w=p*_*x-g*S*M;break;case"YXZ":this._x=g*_*x+p*S*M,this._y=p*S*x-g*_*M,this._z=p*_*M-g*S*x,this._w=p*_*x+g*S*M;break;case"ZXY":this._x=g*_*x-p*S*M,this._y=p*S*x+g*_*M,this._z=p*_*M+g*S*x,this._w=p*_*x-g*S*M;break;case"ZYX":this._x=g*_*x-p*S*M,this._y=p*S*x+g*_*M,this._z=p*_*M-g*S*x,this._w=p*_*x+g*S*M;break;case"YZX":this._x=g*_*x+p*S*M,this._y=p*S*x+g*_*M,this._z=p*_*M-g*S*x,this._w=p*_*x-g*S*M;break;case"XZY":this._x=g*_*x-p*S*M,this._y=p*S*x-g*_*M,this._z=p*_*M+g*S*x,this._w=p*_*x+g*S*M;break;default:tt("Quaternion: .setFromEuler() encountered an unknown order: "+u)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const s=n/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,s=n[0],l=n[4],c=n[8],u=n[1],d=n[5],m=n[9],p=n[2],_=n[6],x=n[10],g=s+d+x;if(g>0){const S=.5/Math.sqrt(g+1);this._w=.25/S,this._x=(_-m)*S,this._y=(c-p)*S,this._z=(u-l)*S}else if(s>d&&s>x){const S=2*Math.sqrt(1+s-d-x);this._w=(_-m)/S,this._x=.25*S,this._y=(l+u)/S,this._z=(c+p)/S}else if(d>x){const S=2*Math.sqrt(1+d-s-x);this._w=(c-p)/S,this._x=(l+u)/S,this._y=.25*S,this._z=(m+_)/S}else{const S=2*Math.sqrt(1+x-s-d);this._w=(u-l)/S,this._x=(c+p)/S,this._y=(m+_)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let s=e.dot(n)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(St(this.dot(e),-1,1)))}rotateTowards(e,n){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,n/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const s=e._x,l=e._y,c=e._z,u=e._w,d=n._x,m=n._y,p=n._z,_=n._w;return this._x=s*_+u*d+l*p-c*m,this._y=l*_+u*m+c*d-s*p,this._z=c*_+u*p+s*m-l*d,this._w=u*_-s*d-l*m-c*p,this._onChangeCallback(),this}slerp(e,n){let s=e._x,l=e._y,c=e._z,u=e._w,d=this.dot(e);d<0&&(s=-s,l=-l,c=-c,u=-u,d=-d);let m=1-n;if(d<.9995){const p=Math.acos(d),_=Math.sin(p);m=Math.sin(m*p)/_,n=Math.sin(n*p)/_,this._x=this._x*m+s*n,this._y=this._y*m+l*n,this._z=this._z*m+c*n,this._w=this._w*m+u*n,this._onChangeCallback()}else this._x=this._x*m+s*n,this._y=this._y*m+l*n,this._z=this._z*m+c*n,this._w=this._w*m+u*n,this.normalize();return this}slerpQuaternions(e,n,s){return this.copy(e).slerp(n,s)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(n),c*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Xm=class Xm{constructor(e=0,n=0,s=0){this.x=e,this.y=n,this.z=s}set(e,n,s){return s===void 0&&(s=this.z),this.x=e,this.y=n,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(ov.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(ov.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*n+c[3]*s+c[6]*l,this.y=c[1]*n+c[4]*s+c[7]*l,this.z=c[2]*n+c[5]*s+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,s=this.y,l=this.z,c=e.elements,u=1/(c[3]*n+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*n+c[4]*s+c[8]*l+c[12])*u,this.y=(c[1]*n+c[5]*s+c[9]*l+c[13])*u,this.z=(c[2]*n+c[6]*s+c[10]*l+c[14])*u,this}applyQuaternion(e){const n=this.x,s=this.y,l=this.z,c=e.x,u=e.y,d=e.z,m=e.w,p=2*(u*l-d*s),_=2*(d*n-c*l),x=2*(c*s-u*n);return this.x=n+m*p+u*x-d*_,this.y=s+m*_+d*p-c*x,this.z=l+m*x+c*_-u*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*n+c[4]*s+c[8]*l,this.y=c[1]*n+c[5]*s+c[9]*l,this.z=c[2]*n+c[6]*s+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=St(this.x,e.x,n.x),this.y=St(this.y,e.y,n.y),this.z=St(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=St(this.x,e,n),this.y=St(this.y,e,n),this.z=St(this.z,e,n),this}clampLength(e,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(St(s,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,s){return this.x=e.x+(n.x-e.x)*s,this.y=e.y+(n.y-e.y)*s,this.z=e.z+(n.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const s=e.x,l=e.y,c=e.z,u=n.x,d=n.y,m=n.z;return this.x=l*m-c*d,this.y=c*u-s*m,this.z=s*d-l*u,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const s=e.dot(this)/n;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return Dd.copy(this).projectOnVector(e),this.sub(Dd)}reflect(e){return this.sub(Dd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const s=this.dot(e)/n;return Math.acos(St(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return n*n+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,s){const l=Math.sin(n)*e;return this.x=l*Math.sin(s),this.y=Math.cos(n)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,s){return this.x=e*Math.sin(n),this.y=s,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=s,this.z=l,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,s=Math.sqrt(1-n*n);return this.x=s*Math.cos(e),this.y=n,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Xm.prototype.isVector3=!0;let Q=Xm;const Dd=new Q,ov=new Ts,Wm=class Wm{constructor(e,n,s,l,c,u,d,m,p){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,s,l,c,u,d,m,p)}set(e,n,s,l,c,u,d,m,p){const _=this.elements;return _[0]=e,_[1]=l,_[2]=d,_[3]=n,_[4]=c,_[5]=m,_[6]=s,_[7]=u,_[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,s=e.elements;return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],n[4]=s[4],n[5]=s[5],n[6]=s[6],n[7]=s[7],n[8]=s[8],this}extractBasis(e,n,s){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const s=e.elements,l=n.elements,c=this.elements,u=s[0],d=s[3],m=s[6],p=s[1],_=s[4],x=s[7],g=s[2],S=s[5],M=s[8],E=l[0],v=l[3],y=l[6],A=l[1],N=l[4],C=l[7],I=l[2],U=l[5],z=l[8];return c[0]=u*E+d*A+m*I,c[3]=u*v+d*N+m*U,c[6]=u*y+d*C+m*z,c[1]=p*E+_*A+x*I,c[4]=p*v+_*N+x*U,c[7]=p*y+_*C+x*z,c[2]=g*E+S*A+M*I,c[5]=g*v+S*N+M*U,c[8]=g*y+S*C+M*z,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],s=e[1],l=e[2],c=e[3],u=e[4],d=e[5],m=e[6],p=e[7],_=e[8];return n*u*_-n*d*p-s*c*_+s*d*m+l*c*p-l*u*m}invert(){const e=this.elements,n=e[0],s=e[1],l=e[2],c=e[3],u=e[4],d=e[5],m=e[6],p=e[7],_=e[8],x=_*u-d*p,g=d*m-_*c,S=p*c-u*m,M=n*x+s*g+l*S;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/M;return e[0]=x*E,e[1]=(l*p-_*s)*E,e[2]=(d*s-l*u)*E,e[3]=g*E,e[4]=(_*n-l*m)*E,e[5]=(l*c-d*n)*E,e[6]=S*E,e[7]=(s*m-p*n)*E,e[8]=(u*n-s*c)*E,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,s,l,c,u,d){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*u+p*d)+u+e,-l*p,l*m,-l*(-p*u+m*d)+d+n,0,0,1),this}scale(e,n){return this.premultiply(Nd.makeScale(e,n)),this}rotate(e){return this.premultiply(Nd.makeRotation(-e)),this}translate(e,n){return this.premultiply(Nd.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),s=Math.sin(e);return this.set(n,-s,0,s,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,s=e.elements;for(let l=0;l<9;l++)if(n[l]!==s[l])return!1;return!0}fromArray(e,n=0){for(let s=0;s<9;s++)this.elements[s]=e[s+n];return this}toArray(e=[],n=0){const s=this.elements;return e[n]=s[0],e[n+1]=s[1],e[n+2]=s[2],e[n+3]=s[3],e[n+4]=s[4],e[n+5]=s[5],e[n+6]=s[6],e[n+7]=s[7],e[n+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Wm.prototype.isMatrix3=!0;let ot=Wm;const Nd=new ot,lv=new ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cv=new ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function oA(){const a={enabled:!0,workingColorSpace:Qu,spaces:{},convert:function(l,c,u){return this.enabled===!1||c===u||!c||!u||(this.spaces[c].transfer===Gt&&(l.r=Na(l.r),l.g=Na(l.g),l.b=Na(l.b)),this.spaces[c].primaries!==this.spaces[u].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===Gt&&(l.r=go(l.r),l.g=go(l.g),l.b=go(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===_s?Ju:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,u){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return rm("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),a.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return rm("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),a.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],s=[.3127,.329];return a.define({[Qu]:{primaries:e,whitePoint:s,transfer:Ju,toXYZ:lv,fromXYZ:cv,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ci},outputColorSpaceConfig:{drawingBufferColorSpace:Ci}},[Ci]:{primaries:e,whitePoint:s,transfer:Gt,toXYZ:lv,fromXYZ:cv,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ci}}}),a}const Tt=oA();function Na(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function go(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}let qr;class lA{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{qr===void 0&&(qr=$u("canvas")),qr.width=e.width,qr.height=e.height;const l=qr.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=qr}return s.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=$u("canvas");n.width=e.width,n.height=e.height;const s=n.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),c=l.data;for(let u=0;u<c.length;u++)c[u]=Na(c[u]/255)*255;return s.putImageData(l,0,0),n}else if(e.data){const n=e.data.slice(0);for(let s=0;s<n.length;s++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[s]=Math.floor(Na(n[s]/255)*255):n[s]=Na(n[s]);return{data:n,width:e.width,height:e.height}}else return tt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let cA=0;class Dm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:cA++}),this.uuid=bs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let u=0,d=l.length;u<d;u++)l[u].isDataTexture?c.push(Ld(l[u].image)):c.push(Ld(l[u]))}else c=Ld(l);s.url=c}return n||(e.images[this.uuid]=s),s}}function Ld(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?lA.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(tt("Texture: Unable to serialize Texture."),{})}let uA=0;const Ud=new Q;class jn extends ws{constructor(e=jn.DEFAULT_IMAGE,n=jn.DEFAULT_MAPPING,s=Ca,l=Ca,c=Cn,u=er,d=Bi,m=_i,p=jn.DEFAULT_ANISOTROPY,_=_s){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:uA++}),this.uuid=bs(),this.name="",this.source=new Dm(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ud).x}get height(){return this.source.getSize(Ud).y}get depth(){return this.source.getSize(Ud).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const s=e[n];if(s===void 0){tt(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const l=this[n];if(l===void 0){tt(`Texture.setValues(): property '${n}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[n]=s}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),n||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==eS)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ap:e.x=e.x-Math.floor(e.x);break;case Ca:e.x=e.x<0?0:1;break;case wp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ap:e.y=e.y-Math.floor(e.y);break;case Ca:e.y=e.y<0?0:1;break;case wp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}jn.DEFAULT_IMAGE=null;jn.DEFAULT_MAPPING=eS;jn.DEFAULT_ANISOTROPY=1;const qm=class qm{constructor(e=0,n=0,s=0,l=1){this.x=e,this.y=n,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,s,l){return this.x=e,this.y=n,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,s=this.y,l=this.z,c=this.w,u=e.elements;return this.x=u[0]*n+u[4]*s+u[8]*l+u[12]*c,this.y=u[1]*n+u[5]*s+u[9]*l+u[13]*c,this.z=u[2]*n+u[6]*s+u[10]*l+u[14]*c,this.w=u[3]*n+u[7]*s+u[11]*l+u[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,s,l,c;const m=e.elements,p=m[0],_=m[4],x=m[8],g=m[1],S=m[5],M=m[9],E=m[2],v=m[6],y=m[10];if(Math.abs(_-g)<.01&&Math.abs(x-E)<.01&&Math.abs(M-v)<.01){if(Math.abs(_+g)<.1&&Math.abs(x+E)<.1&&Math.abs(M+v)<.1&&Math.abs(p+S+y-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const N=(p+1)/2,C=(S+1)/2,I=(y+1)/2,U=(_+g)/4,z=(x+E)/4,T=(M+v)/4;return N>C&&N>I?N<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(N),l=U/s,c=z/s):C>I?C<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(C),s=U/l,c=T/l):I<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(I),s=z/c,l=T/c),this.set(s,l,c,n),this}let A=Math.sqrt((v-M)*(v-M)+(x-E)*(x-E)+(g-_)*(g-_));return Math.abs(A)<.001&&(A=1),this.x=(v-M)/A,this.y=(x-E)/A,this.z=(g-_)/A,this.w=Math.acos((p+S+y-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=St(this.x,e.x,n.x),this.y=St(this.y,e.y,n.y),this.z=St(this.z,e.z,n.z),this.w=St(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=St(this.x,e,n),this.y=St(this.y,e,n),this.z=St(this.z,e,n),this.w=St(this.w,e,n),this}clampLength(e,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(St(s,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,s){return this.x=e.x+(n.x-e.x)*s,this.y=e.y+(n.y-e.y)*s,this.z=e.z+(n.z-e.z)*s,this.w=e.w+(n.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};qm.prototype.isVector4=!0;let un=qm;class fA extends ws{constructor(e=1,n=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=s.depth,this.scissor=new un(0,0,e,n),this.scissorTest=!1,this.viewport=new un(0,0,e,n),this.textures=[];const l={width:e,height:n,depth:s.depth},c=new jn(l),u=s.count;for(let d=0;d<u;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(e={}){const n={minFilter:Cn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,s=1){if(this.width!==e||this.height!==n||this.depth!==s){this.width=e,this.height=n,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=n,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const l=Object.assign({},e.textures[n].image);this.textures[n].source=new Dm(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class na extends fA{constructor(e=1,n=1,s={}){super(e,n,s),this.isWebGLRenderTarget=!0}}class cS extends jn{constructor(e=null,n=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:s,depth:l},this.magFilter=In,this.minFilter=In,this.wrapR=Ca,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class hA extends jn{constructor(e=null,n=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:s,depth:l},this.magFilter=In,this.minFilter=In,this.wrapR=Ca,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const rf=class rf{constructor(e,n,s,l,c,u,d,m,p,_,x,g,S,M,E,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,s,l,c,u,d,m,p,_,x,g,S,M,E,v)}set(e,n,s,l,c,u,d,m,p,_,x,g,S,M,E,v){const y=this.elements;return y[0]=e,y[4]=n,y[8]=s,y[12]=l,y[1]=c,y[5]=u,y[9]=d,y[13]=m,y[2]=p,y[6]=_,y[10]=x,y[14]=g,y[3]=S,y[7]=M,y[11]=E,y[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rf().fromArray(this.elements)}copy(e){const n=this.elements,s=e.elements;return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],n[4]=s[4],n[5]=s[5],n[6]=s[6],n[7]=s[7],n[8]=s[8],n[9]=s[9],n[10]=s[10],n[11]=s[11],n[12]=s[12],n[13]=s[13],n[14]=s[14],n[15]=s[15],this}copyPosition(e){const n=this.elements,s=e.elements;return n[12]=s[12],n[13]=s[13],n[14]=s[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,s){return this.determinant()===0?(e.set(1,0,0),n.set(0,1,0),s.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(e,n,s){return this.set(e.x,n.x,s.x,0,e.y,n.y,s.y,0,e.z,n.z,s.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const n=this.elements,s=e.elements,l=1/Yr.setFromMatrixColumn(e,0).length(),c=1/Yr.setFromMatrixColumn(e,1).length(),u=1/Yr.setFromMatrixColumn(e,2).length();return n[0]=s[0]*l,n[1]=s[1]*l,n[2]=s[2]*l,n[3]=0,n[4]=s[4]*c,n[5]=s[5]*c,n[6]=s[6]*c,n[7]=0,n[8]=s[8]*u,n[9]=s[9]*u,n[10]=s[10]*u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,s=e.x,l=e.y,c=e.z,u=Math.cos(s),d=Math.sin(s),m=Math.cos(l),p=Math.sin(l),_=Math.cos(c),x=Math.sin(c);if(e.order==="XYZ"){const g=u*_,S=u*x,M=d*_,E=d*x;n[0]=m*_,n[4]=-m*x,n[8]=p,n[1]=S+M*p,n[5]=g-E*p,n[9]=-d*m,n[2]=E-g*p,n[6]=M+S*p,n[10]=u*m}else if(e.order==="YXZ"){const g=m*_,S=m*x,M=p*_,E=p*x;n[0]=g+E*d,n[4]=M*d-S,n[8]=u*p,n[1]=u*x,n[5]=u*_,n[9]=-d,n[2]=S*d-M,n[6]=E+g*d,n[10]=u*m}else if(e.order==="ZXY"){const g=m*_,S=m*x,M=p*_,E=p*x;n[0]=g-E*d,n[4]=-u*x,n[8]=M+S*d,n[1]=S+M*d,n[5]=u*_,n[9]=E-g*d,n[2]=-u*p,n[6]=d,n[10]=u*m}else if(e.order==="ZYX"){const g=u*_,S=u*x,M=d*_,E=d*x;n[0]=m*_,n[4]=M*p-S,n[8]=g*p+E,n[1]=m*x,n[5]=E*p+g,n[9]=S*p-M,n[2]=-p,n[6]=d*m,n[10]=u*m}else if(e.order==="YZX"){const g=u*m,S=u*p,M=d*m,E=d*p;n[0]=m*_,n[4]=E-g*x,n[8]=M*x+S,n[1]=x,n[5]=u*_,n[9]=-d*_,n[2]=-p*_,n[6]=S*x+M,n[10]=g-E*x}else if(e.order==="XZY"){const g=u*m,S=u*p,M=d*m,E=d*p;n[0]=m*_,n[4]=-x,n[8]=p*_,n[1]=g*x+E,n[5]=u*_,n[9]=S*x-M,n[2]=M*x-S,n[6]=d*_,n[10]=E*x+g}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(dA,e,pA)}lookAt(e,n,s){const l=this.elements;return mi.subVectors(e,n),mi.lengthSq()===0&&(mi.z=1),mi.normalize(),us.crossVectors(s,mi),us.lengthSq()===0&&(Math.abs(s.z)===1?mi.x+=1e-4:mi.z+=1e-4,mi.normalize(),us.crossVectors(s,mi)),us.normalize(),ru.crossVectors(mi,us),l[0]=us.x,l[4]=ru.x,l[8]=mi.x,l[1]=us.y,l[5]=ru.y,l[9]=mi.y,l[2]=us.z,l[6]=ru.z,l[10]=mi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const s=e.elements,l=n.elements,c=this.elements,u=s[0],d=s[4],m=s[8],p=s[12],_=s[1],x=s[5],g=s[9],S=s[13],M=s[2],E=s[6],v=s[10],y=s[14],A=s[3],N=s[7],C=s[11],I=s[15],U=l[0],z=l[4],T=l[8],F=l[12],X=l[1],B=l[5],j=l[9],ie=l[13],ae=l[2],V=l[6],O=l[10],G=l[14],$=l[3],he=l[7],ge=l[11],H=l[15];return c[0]=u*U+d*X+m*ae+p*$,c[4]=u*z+d*B+m*V+p*he,c[8]=u*T+d*j+m*O+p*ge,c[12]=u*F+d*ie+m*G+p*H,c[1]=_*U+x*X+g*ae+S*$,c[5]=_*z+x*B+g*V+S*he,c[9]=_*T+x*j+g*O+S*ge,c[13]=_*F+x*ie+g*G+S*H,c[2]=M*U+E*X+v*ae+y*$,c[6]=M*z+E*B+v*V+y*he,c[10]=M*T+E*j+v*O+y*ge,c[14]=M*F+E*ie+v*G+y*H,c[3]=A*U+N*X+C*ae+I*$,c[7]=A*z+N*B+C*V+I*he,c[11]=A*T+N*j+C*O+I*ge,c[15]=A*F+N*ie+C*G+I*H,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],s=e[4],l=e[8],c=e[12],u=e[1],d=e[5],m=e[9],p=e[13],_=e[2],x=e[6],g=e[10],S=e[14],M=e[3],E=e[7],v=e[11],y=e[15],A=m*S-p*g,N=d*S-p*x,C=d*g-m*x,I=u*S-p*_,U=u*g-m*_,z=u*x-d*_;return n*(E*A-v*N+y*C)-s*(M*A-v*I+y*U)+l*(M*N-E*I+y*z)-c*(M*C-E*U+v*z)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=n,l[14]=s),this}invert(){const e=this.elements,n=e[0],s=e[1],l=e[2],c=e[3],u=e[4],d=e[5],m=e[6],p=e[7],_=e[8],x=e[9],g=e[10],S=e[11],M=e[12],E=e[13],v=e[14],y=e[15],A=n*d-s*u,N=n*m-l*u,C=n*p-c*u,I=s*m-l*d,U=s*p-c*d,z=l*p-c*m,T=_*E-x*M,F=_*v-g*M,X=_*y-S*M,B=x*v-g*E,j=x*y-S*E,ie=g*y-S*v,ae=A*ie-N*j+C*B+I*X-U*F+z*T;if(ae===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/ae;return e[0]=(d*ie-m*j+p*B)*V,e[1]=(l*j-s*ie-c*B)*V,e[2]=(E*z-v*U+y*I)*V,e[3]=(g*U-x*z-S*I)*V,e[4]=(m*X-u*ie-p*F)*V,e[5]=(n*ie-l*X+c*F)*V,e[6]=(v*C-M*z-y*N)*V,e[7]=(_*z-g*C+S*N)*V,e[8]=(u*j-d*X+p*T)*V,e[9]=(s*X-n*j-c*T)*V,e[10]=(M*U-E*C+y*A)*V,e[11]=(x*C-_*U-S*A)*V,e[12]=(d*F-u*B-m*T)*V,e[13]=(n*B-s*F+l*T)*V,e[14]=(E*N-M*I-v*A)*V,e[15]=(_*I-x*N+g*A)*V,this}scale(e){const n=this.elements,s=e.x,l=e.y,c=e.z;return n[0]*=s,n[4]*=l,n[8]*=c,n[1]*=s,n[5]*=l,n[9]*=c,n[2]*=s,n[6]*=l,n[10]*=c,n[3]*=s,n[7]*=l,n[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,s,l))}makeTranslation(e,n,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,s,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,n,-s,0,0,s,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),s=Math.sin(e);return this.set(n,0,s,0,0,1,0,0,-s,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),s=Math.sin(e);return this.set(n,-s,0,0,s,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const s=Math.cos(n),l=Math.sin(n),c=1-s,u=e.x,d=e.y,m=e.z,p=c*u,_=c*d;return this.set(p*u+s,p*d-l*m,p*m+l*d,0,p*d+l*m,_*d+s,_*m-l*u,0,p*m-l*d,_*m+l*u,c*m*m+s,0,0,0,0,1),this}makeScale(e,n,s){return this.set(e,0,0,0,0,n,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,n,s,l,c,u){return this.set(1,s,c,0,e,1,u,0,n,l,1,0,0,0,0,1),this}compose(e,n,s){const l=this.elements,c=n._x,u=n._y,d=n._z,m=n._w,p=c+c,_=u+u,x=d+d,g=c*p,S=c*_,M=c*x,E=u*_,v=u*x,y=d*x,A=m*p,N=m*_,C=m*x,I=s.x,U=s.y,z=s.z;return l[0]=(1-(E+y))*I,l[1]=(S+C)*I,l[2]=(M-N)*I,l[3]=0,l[4]=(S-C)*U,l[5]=(1-(g+y))*U,l[6]=(v+A)*U,l[7]=0,l[8]=(M+N)*z,l[9]=(v-A)*z,l[10]=(1-(g+E))*z,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,n,s){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const c=this.determinant();if(c===0)return s.set(1,1,1),n.identity(),this;let u=Yr.set(l[0],l[1],l[2]).length();const d=Yr.set(l[4],l[5],l[6]).length(),m=Yr.set(l[8],l[9],l[10]).length();c<0&&(u=-u),zi.copy(this);const p=1/u,_=1/d,x=1/m;return zi.elements[0]*=p,zi.elements[1]*=p,zi.elements[2]*=p,zi.elements[4]*=_,zi.elements[5]*=_,zi.elements[6]*=_,zi.elements[8]*=x,zi.elements[9]*=x,zi.elements[10]*=x,n.setFromRotationMatrix(zi),s.x=u,s.y=d,s.z=m,this}makePerspective(e,n,s,l,c,u,d=$i,m=!1){const p=this.elements,_=2*c/(n-e),x=2*c/(s-l),g=(n+e)/(n-e),S=(s+l)/(s-l);let M,E;if(m)M=c/(u-c),E=u*c/(u-c);else if(d===$i)M=-(u+c)/(u-c),E=-2*u*c/(u-c);else if(d===kl)M=-u/(u-c),E=-u*c/(u-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=_,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=x,p[9]=S,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=E,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,n,s,l,c,u,d=$i,m=!1){const p=this.elements,_=2/(n-e),x=2/(s-l),g=-(n+e)/(n-e),S=-(s+l)/(s-l);let M,E;if(m)M=1/(u-c),E=u/(u-c);else if(d===$i)M=-2/(u-c),E=-(u+c)/(u-c);else if(d===kl)M=-1/(u-c),E=-c/(u-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=_,p[4]=0,p[8]=0,p[12]=g,p[1]=0,p[5]=x,p[9]=0,p[13]=S,p[2]=0,p[6]=0,p[10]=M,p[14]=E,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const n=this.elements,s=e.elements;for(let l=0;l<16;l++)if(n[l]!==s[l])return!1;return!0}fromArray(e,n=0){for(let s=0;s<16;s++)this.elements[s]=e[s+n];return this}toArray(e=[],n=0){const s=this.elements;return e[n]=s[0],e[n+1]=s[1],e[n+2]=s[2],e[n+3]=s[3],e[n+4]=s[4],e[n+5]=s[5],e[n+6]=s[6],e[n+7]=s[7],e[n+8]=s[8],e[n+9]=s[9],e[n+10]=s[10],e[n+11]=s[11],e[n+12]=s[12],e[n+13]=s[13],e[n+14]=s[14],e[n+15]=s[15],e}};rf.prototype.isMatrix4=!0;let on=rf;const Yr=new Q,zi=new on,dA=new Q(0,0,0),pA=new Q(1,1,1),us=new Q,ru=new Q,mi=new Q,uv=new on,fv=new Ts;class As{constructor(e=0,n=0,s=0,l=As.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,s,l=this._order){return this._x=e,this._y=n,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,s=!0){const l=e.elements,c=l[0],u=l[4],d=l[8],m=l[1],p=l[5],_=l[9],x=l[2],g=l[6],S=l[10];switch(n){case"XYZ":this._y=Math.asin(St(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-_,S),this._z=Math.atan2(-u,c)):(this._x=Math.atan2(g,p),this._z=0);break;case"YXZ":this._x=Math.asin(-St(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-x,c),this._z=0);break;case"ZXY":this._x=Math.asin(St(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-x,S),this._z=Math.atan2(-u,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-St(x,-1,1)),Math.abs(x)<.9999999?(this._x=Math.atan2(g,S),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-u,p));break;case"YZX":this._z=Math.asin(St(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-_,p),this._y=Math.atan2(-x,c)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-St(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(g,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-_,S),this._y=0);break;default:tt("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,s){return uv.makeRotationFromQuaternion(e),this.setFromRotationMatrix(uv,n,s)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return fv.setFromEuler(this),this.setFromQuaternion(fv,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}As.DEFAULT_ORDER="XYZ";class uS{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let mA=0;const hv=new Q,Zr=new Ts,Ea=new on,ou=new Q,Sl=new Q,gA=new Q,_A=new Ts,dv=new Q(1,0,0),pv=new Q(0,1,0),mv=new Q(0,0,1),gv={type:"added"},xA={type:"removed"},Kr={type:"childadded",child:null},Od={type:"childremoved",child:null};class Dn extends ws{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mA++}),this.uuid=bs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Dn.DEFAULT_UP.clone();const e=new Q,n=new As,s=new Ts,l=new Q(1,1,1);function c(){s.setFromEuler(n,!1)}function u(){n.setFromQuaternion(s,void 0,!1)}n._onChange(c),s._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new on},normalMatrix:{value:new ot}}),this.matrix=new on,this.matrixWorld=new on,this.matrixAutoUpdate=Dn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new uS,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Zr.setFromAxisAngle(e,n),this.quaternion.multiply(Zr),this}rotateOnWorldAxis(e,n){return Zr.setFromAxisAngle(e,n),this.quaternion.premultiply(Zr),this}rotateX(e){return this.rotateOnAxis(dv,e)}rotateY(e){return this.rotateOnAxis(pv,e)}rotateZ(e){return this.rotateOnAxis(mv,e)}translateOnAxis(e,n){return hv.copy(e).applyQuaternion(this.quaternion),this.position.add(hv.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(dv,e)}translateY(e){return this.translateOnAxis(pv,e)}translateZ(e){return this.translateOnAxis(mv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ea.copy(this.matrixWorld).invert())}lookAt(e,n,s){e.isVector3?ou.copy(e):ou.set(e,n,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Sl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ea.lookAt(Sl,ou,this.up):Ea.lookAt(ou,Sl,this.up),this.quaternion.setFromRotationMatrix(Ea),l&&(Ea.extractRotation(l.matrixWorld),Zr.setFromRotationMatrix(Ea),this.quaternion.premultiply(Zr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(At("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(gv),Kr.child=e,this.dispatchEvent(Kr),Kr.child=null):At("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(xA),Od.child=e,this.dispatchEvent(Od),Od.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ea.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ea.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ea),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(gv),Kr.child=e,this.dispatchEvent(Kr),Kr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let s=0,l=this.children.length;s<l;s++){const u=this.children[s].getObjectByProperty(e,n);if(u!==void 0)return u}}getObjectsByProperty(e,n,s=[]){this[e]===n&&s.push(this);const l=this.children;for(let c=0,u=l.length;c<u;c++)l[c].getObjectsByProperty(e,n,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sl,e,gA),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sl,_A,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,s=e.y,l=e.z,c=this.matrix.elements;c[12]+=n-c[0]*n-c[4]*s-c[8]*l,c[13]+=s-c[1]*n-c[5]*s-c[9]*l,c[14]+=l-c[2]*n-c[6]*s-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let s=0,l=n.length;s<l;s++)n[s].updateMatrixWorld(e)}updateWorldMatrix(e,n){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const l=this.children;for(let c=0,u=l.length;c<u;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",s={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(d=>({...d})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,_=m.length;p<_;p++){const x=m[p];c(e.shapes,x)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(e.materials,this.material[m]));l.material=d}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(c(e.animations,m))}}if(n){const d=u(e.geometries),m=u(e.materials),p=u(e.textures),_=u(e.images),x=u(e.shapes),g=u(e.skeletons),S=u(e.animations),M=u(e.nodes);d.length>0&&(s.geometries=d),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),_.length>0&&(s.images=_),x.length>0&&(s.shapes=x),g.length>0&&(s.skeletons=g),S.length>0&&(s.animations=S),M.length>0&&(s.nodes=M)}return s.object=l,s;function u(d){const m=[];for(const p in d){const _=d[p];delete _.metadata,m.push(_)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}}Dn.DEFAULT_UP=new Q(0,1,0);Dn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ul extends Dn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vA={type:"move"};class Pd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ul,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ul,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ul,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const s of e.hand.values())this._getHandJoint(n,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,s){let l=null,c=null,u=null;const d=this._targetRay,m=this._grip,p=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(p&&e.hand){u=!0;for(const E of e.hand.values()){const v=n.getJointPose(E,s),y=this._getHandJoint(p,E);v!==null&&(y.matrix.fromArray(v.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=v.radius),y.visible=v!==null}const _=p.joints["index-finger-tip"],x=p.joints["thumb-tip"],g=_.position.distanceTo(x.position),S=.02,M=.005;p.inputState.pinching&&g>S+M?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&g<=S-M&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=n.getPose(e.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:e,target:this})));d!==null&&(l=n.getPose(e.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(vA)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=u!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const s=new Ul;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[n.jointName]=s,e.add(s)}return e.joints[n.jointName]}}const fS={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fs={h:0,s:0,l:0},lu={h:0,s:0,l:0};function zd(a,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?a+(e-a)*6*n:n<1/2?e:n<2/3?a+(e-a)*6*(2/3-n):a}class dt{constructor(e,n,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,s)}set(e,n,s){if(n===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,n,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Ci){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Tt.colorSpaceToWorking(this,n),this}setRGB(e,n,s,l=Tt.workingColorSpace){return this.r=e,this.g=n,this.b=s,Tt.colorSpaceToWorking(this,l),this}setHSL(e,n,s,l=Tt.workingColorSpace){if(e=sA(e,1),n=St(n,0,1),s=St(s,0,1),n===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+n):s+n-s*n,u=2*s-c;this.r=zd(u,c,e+1/3),this.g=zd(u,c,e),this.b=zd(u,c,e-1/3)}return Tt.colorSpaceToWorking(this,l),this}setStyle(e,n=Ci){function s(c){c!==void 0&&parseFloat(c)<1&&tt("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const u=l[1],d=l[2];switch(u){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:tt("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],u=c.length;if(u===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(u===6)return this.setHex(parseInt(c,16),n);tt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Ci){const s=fS[e.toLowerCase()];return s!==void 0?this.setHex(s,n):tt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Na(e.r),this.g=Na(e.g),this.b=Na(e.b),this}copyLinearToSRGB(e){return this.r=go(e.r),this.g=go(e.g),this.b=go(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ci){return Tt.workingToColorSpace(Vn.copy(this),e),Math.round(St(Vn.r*255,0,255))*65536+Math.round(St(Vn.g*255,0,255))*256+Math.round(St(Vn.b*255,0,255))}getHexString(e=Ci){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Tt.workingColorSpace){Tt.workingToColorSpace(Vn.copy(this),n);const s=Vn.r,l=Vn.g,c=Vn.b,u=Math.max(s,l,c),d=Math.min(s,l,c);let m,p;const _=(d+u)/2;if(d===u)m=0,p=0;else{const x=u-d;switch(p=_<=.5?x/(u+d):x/(2-u-d),u){case s:m=(l-c)/x+(l<c?6:0);break;case l:m=(c-s)/x+2;break;case c:m=(s-l)/x+4;break}m/=6}return e.h=m,e.s=p,e.l=_,e}getRGB(e,n=Tt.workingColorSpace){return Tt.workingToColorSpace(Vn.copy(this),n),e.r=Vn.r,e.g=Vn.g,e.b=Vn.b,e}getStyle(e=Ci){Tt.workingToColorSpace(Vn.copy(this),e);const n=Vn.r,s=Vn.g,l=Vn.b;return e!==Ci?`color(${e} ${n.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,n,s){return this.getHSL(fs),this.setHSL(fs.h+e,fs.s+n,fs.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,s){return this.r=e.r+(n.r-e.r)*s,this.g=e.g+(n.g-e.g)*s,this.b=e.b+(n.b-e.b)*s,this}lerpHSL(e,n){this.getHSL(fs),e.getHSL(lu);const s=Cd(fs.h,lu.h,n),l=Cd(fs.s,lu.s,n),c=Cd(fs.l,lu.l,n);return this.setHSL(s,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,s=this.g,l=this.b,c=e.elements;return this.r=c[0]*n+c[3]*s+c[6]*l,this.g=c[1]*n+c[4]*s+c[7]*l,this.b=c[2]*n+c[5]*s+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vn=new dt;dt.NAMES=fS;class Nm{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new dt(e),this.density=n}clone(){return new Nm(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class yA extends Dn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new As,this.environmentIntensity=1,this.environmentRotation=new As,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Ii=new Q,Ta=new Q,Id=new Q,Aa=new Q,Qr=new Q,Jr=new Q,_v=new Q,Fd=new Q,Bd=new Q,Hd=new Q,Gd=new un,Vd=new un,kd=new un;class xi{constructor(e=new Q,n=new Q,s=new Q){this.a=e,this.b=n,this.c=s}static getNormal(e,n,s,l){l.subVectors(s,n),Ii.subVectors(e,n),l.cross(Ii);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,n,s,l,c){Ii.subVectors(l,n),Ta.subVectors(s,n),Id.subVectors(e,n);const u=Ii.dot(Ii),d=Ii.dot(Ta),m=Ii.dot(Id),p=Ta.dot(Ta),_=Ta.dot(Id),x=u*p-d*d;if(x===0)return c.set(0,0,0),null;const g=1/x,S=(p*m-d*_)*g,M=(u*_-d*m)*g;return c.set(1-S-M,M,S)}static containsPoint(e,n,s,l){return this.getBarycoord(e,n,s,l,Aa)===null?!1:Aa.x>=0&&Aa.y>=0&&Aa.x+Aa.y<=1}static getInterpolation(e,n,s,l,c,u,d,m){return this.getBarycoord(e,n,s,l,Aa)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,Aa.x),m.addScaledVector(u,Aa.y),m.addScaledVector(d,Aa.z),m)}static getInterpolatedAttribute(e,n,s,l,c,u){return Gd.setScalar(0),Vd.setScalar(0),kd.setScalar(0),Gd.fromBufferAttribute(e,n),Vd.fromBufferAttribute(e,s),kd.fromBufferAttribute(e,l),u.setScalar(0),u.addScaledVector(Gd,c.x),u.addScaledVector(Vd,c.y),u.addScaledVector(kd,c.z),u}static isFrontFacing(e,n,s,l){return Ii.subVectors(s,n),Ta.subVectors(e,n),Ii.cross(Ta).dot(l)<0}set(e,n,s){return this.a.copy(e),this.b.copy(n),this.c.copy(s),this}setFromPointsAndIndices(e,n,s,l){return this.a.copy(e[n]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,n,s,l){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ii.subVectors(this.c,this.b),Ta.subVectors(this.a,this.b),Ii.cross(Ta).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return xi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return xi.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,s,l,c){return xi.getInterpolation(e,this.a,this.b,this.c,n,s,l,c)}containsPoint(e){return xi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return xi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const s=this.a,l=this.b,c=this.c;let u,d;Qr.subVectors(l,s),Jr.subVectors(c,s),Fd.subVectors(e,s);const m=Qr.dot(Fd),p=Jr.dot(Fd);if(m<=0&&p<=0)return n.copy(s);Bd.subVectors(e,l);const _=Qr.dot(Bd),x=Jr.dot(Bd);if(_>=0&&x<=_)return n.copy(l);const g=m*x-_*p;if(g<=0&&m>=0&&_<=0)return u=m/(m-_),n.copy(s).addScaledVector(Qr,u);Hd.subVectors(e,c);const S=Qr.dot(Hd),M=Jr.dot(Hd);if(M>=0&&S<=M)return n.copy(c);const E=S*p-m*M;if(E<=0&&p>=0&&M<=0)return d=p/(p-M),n.copy(s).addScaledVector(Jr,d);const v=_*M-S*x;if(v<=0&&x-_>=0&&S-M>=0)return _v.subVectors(c,l),d=(x-_)/(x-_+(S-M)),n.copy(l).addScaledVector(_v,d);const y=1/(v+E+g);return u=E*y,d=g*y,n.copy(s).addScaledVector(Qr,u).addScaledVector(Jr,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Wl{constructor(e=new Q(1/0,1/0,1/0),n=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,s=e.length;n<s;n+=3)this.expandByPoint(Fi.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,s=e.count;n<s;n++)this.expandByPoint(Fi.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,s=e.length;n<s;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const s=Fi.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const c=s.getAttribute("position");if(n===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let u=0,d=c.count;u<d;u++)e.isMesh===!0?e.getVertexPosition(u,Fi):Fi.fromBufferAttribute(c,u),Fi.applyMatrix4(e.matrixWorld),this.expandByPoint(Fi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),cu.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),cu.copy(s.boundingBox)),cu.applyMatrix4(e.matrixWorld),this.union(cu)}const l=e.children;for(let c=0,u=l.length;c<u;c++)this.expandByObject(l[c],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Fi),Fi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,s;return e.normal.x>0?(n=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),n<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bl),uu.subVectors(this.max,bl),$r.subVectors(e.a,bl),eo.subVectors(e.b,bl),to.subVectors(e.c,bl),hs.subVectors(eo,$r),ds.subVectors(to,eo),qs.subVectors($r,to);let n=[0,-hs.z,hs.y,0,-ds.z,ds.y,0,-qs.z,qs.y,hs.z,0,-hs.x,ds.z,0,-ds.x,qs.z,0,-qs.x,-hs.y,hs.x,0,-ds.y,ds.x,0,-qs.y,qs.x,0];return!jd(n,$r,eo,to,uu)||(n=[1,0,0,0,1,0,0,0,1],!jd(n,$r,eo,to,uu))?!1:(fu.crossVectors(hs,ds),n=[fu.x,fu.y,fu.z],jd(n,$r,eo,to,uu))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Fi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Fi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(wa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),wa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),wa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),wa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),wa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),wa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),wa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),wa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(wa),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const wa=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],Fi=new Q,cu=new Wl,$r=new Q,eo=new Q,to=new Q,hs=new Q,ds=new Q,qs=new Q,bl=new Q,uu=new Q,fu=new Q,Ys=new Q;function jd(a,e,n,s,l){for(let c=0,u=a.length-3;c<=u;c+=3){Ys.fromArray(a,c);const d=l.x*Math.abs(Ys.x)+l.y*Math.abs(Ys.y)+l.z*Math.abs(Ys.z),m=e.dot(Ys),p=n.dot(Ys),_=s.dot(Ys);if(Math.max(-Math.max(m,p,_),Math.min(m,p,_))>d)return!1}return!0}const yn=new Q,hu=new nt;let SA=0;class Hi extends ws{constructor(e,n,s=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:SA++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=s,this.usage=sm,this.updateRanges=[],this.gpuType=Ji,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,s){e*=this.itemSize,s*=n.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=n.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,s=this.count;n<s;n++)hu.fromBufferAttribute(this,n),hu.applyMatrix3(e),this.setXY(n,hu.x,hu.y);else if(this.itemSize===3)for(let n=0,s=this.count;n<s;n++)yn.fromBufferAttribute(this,n),yn.applyMatrix3(e),this.setXYZ(n,yn.x,yn.y,yn.z);return this}applyMatrix4(e){for(let n=0,s=this.count;n<s;n++)yn.fromBufferAttribute(this,n),yn.applyMatrix4(e),this.setXYZ(n,yn.x,yn.y,yn.z);return this}applyNormalMatrix(e){for(let n=0,s=this.count;n<s;n++)yn.fromBufferAttribute(this,n),yn.applyNormalMatrix(e),this.setXYZ(n,yn.x,yn.y,yn.z);return this}transformDirection(e){for(let n=0,s=this.count;n<s;n++)yn.fromBufferAttribute(this,n),yn.transformDirection(e),this.setXYZ(n,yn.x,yn.y,yn.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let s=this.array[e*this.itemSize+n];return this.normalized&&(s=Qi(s,this.array)),s}setComponent(e,n,s){return this.normalized&&(s=Wt(s,this.array)),this.array[e*this.itemSize+n]=s,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Qi(n,this.array)),n}setX(e,n){return this.normalized&&(n=Wt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Qi(n,this.array)),n}setY(e,n){return this.normalized&&(n=Wt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Qi(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Wt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Qi(n,this.array)),n}setW(e,n){return this.normalized&&(n=Wt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,s){return e*=this.itemSize,this.normalized&&(n=Wt(n,this.array),s=Wt(s,this.array)),this.array[e+0]=n,this.array[e+1]=s,this}setXYZ(e,n,s,l){return e*=this.itemSize,this.normalized&&(n=Wt(n,this.array),s=Wt(s,this.array),l=Wt(l,this.array)),this.array[e+0]=n,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,n,s,l,c){return e*=this.itemSize,this.normalized&&(n=Wt(n,this.array),s=Wt(s,this.array),l=Wt(l,this.array),c=Wt(c,this.array)),this.array[e+0]=n,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==sm&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class hS extends Hi{constructor(e,n,s){super(new Uint16Array(e),n,s)}}class dS extends Hi{constructor(e,n,s){super(new Uint32Array(e),n,s)}}class Zn extends Hi{constructor(e,n,s){super(new Float32Array(e),n,s)}}const bA=new Wl,Ml=new Q,Xd=new Q;class ff{constructor(e=new Q,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const s=this.center;n!==void 0?s.copy(n):bA.setFromPoints(e).getCenter(s);let l=0;for(let c=0,u=e.length;c<u;c++)l=Math.max(l,s.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const s=this.center.distanceToSquared(e);return n.copy(e),s>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ml.subVectors(e,this.center);const n=Ml.lengthSq();if(n>this.radius*this.radius){const s=Math.sqrt(n),l=(s-this.radius)*.5;this.center.addScaledVector(Ml,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ml.copy(e.center).add(Xd)),this.expandByPoint(Ml.copy(e.center).sub(Xd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let MA=0;const Ri=new on,Wd=new Dn,no=new Q,gi=new Wl,El=new Wl,Rn=new Q;class ai extends ws{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:MA++}),this.uuid=bs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(tA(e)?dS:hS)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,s=0){this.groups.push({start:e,count:n,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new ot().getNormalMatrix(e);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ri.makeRotationFromQuaternion(e),this.applyMatrix4(Ri),this}rotateX(e){return Ri.makeRotationX(e),this.applyMatrix4(Ri),this}rotateY(e){return Ri.makeRotationY(e),this.applyMatrix4(Ri),this}rotateZ(e){return Ri.makeRotationZ(e),this.applyMatrix4(Ri),this}translate(e,n,s){return Ri.makeTranslation(e,n,s),this.applyMatrix4(Ri),this}scale(e,n,s){return Ri.makeScale(e,n,s),this.applyMatrix4(Ri),this}lookAt(e){return Wd.lookAt(e),Wd.updateMatrix(),this.applyMatrix4(Wd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(no).negate(),this.translate(no.x,no.y,no.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const s=[];for(let l=0,c=e.length;l<c;l++){const u=e[l];s.push(u.x,u.y,u.z||0)}this.setAttribute("position",new Zn(s,3))}else{const s=Math.min(e.length,n.count);for(let l=0;l<s;l++){const c=e[l];n.setXYZ(l,c.x,c.y,c.z||0)}e.length>n.count&&tt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wl);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){At("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let s=0,l=n.length;s<l;s++){const c=n[s];gi.setFromBufferAttribute(c),this.morphTargetsRelative?(Rn.addVectors(this.boundingBox.min,gi.min),this.boundingBox.expandByPoint(Rn),Rn.addVectors(this.boundingBox.max,gi.max),this.boundingBox.expandByPoint(Rn)):(this.boundingBox.expandByPoint(gi.min),this.boundingBox.expandByPoint(gi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&At('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ff);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){At("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Q,1/0);return}if(e){const s=this.boundingSphere.center;if(gi.setFromBufferAttribute(e),n)for(let c=0,u=n.length;c<u;c++){const d=n[c];El.setFromBufferAttribute(d),this.morphTargetsRelative?(Rn.addVectors(gi.min,El.min),gi.expandByPoint(Rn),Rn.addVectors(gi.max,El.max),gi.expandByPoint(Rn)):(gi.expandByPoint(El.min),gi.expandByPoint(El.max))}gi.getCenter(s);let l=0;for(let c=0,u=e.count;c<u;c++)Rn.fromBufferAttribute(e,c),l=Math.max(l,s.distanceToSquared(Rn));if(n)for(let c=0,u=n.length;c<u;c++){const d=n[c],m=this.morphTargetsRelative;for(let p=0,_=d.count;p<_;p++)Rn.fromBufferAttribute(d,p),m&&(no.fromBufferAttribute(e,p),Rn.add(no)),l=Math.max(l,s.distanceToSquared(Rn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&At('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){At("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=n.position,l=n.normal,c=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Hi(new Float32Array(4*s.count),4));const u=this.getAttribute("tangent"),d=[],m=[];for(let T=0;T<s.count;T++)d[T]=new Q,m[T]=new Q;const p=new Q,_=new Q,x=new Q,g=new nt,S=new nt,M=new nt,E=new Q,v=new Q;function y(T,F,X){p.fromBufferAttribute(s,T),_.fromBufferAttribute(s,F),x.fromBufferAttribute(s,X),g.fromBufferAttribute(c,T),S.fromBufferAttribute(c,F),M.fromBufferAttribute(c,X),_.sub(p),x.sub(p),S.sub(g),M.sub(g);const B=1/(S.x*M.y-M.x*S.y);isFinite(B)&&(E.copy(_).multiplyScalar(M.y).addScaledVector(x,-S.y).multiplyScalar(B),v.copy(x).multiplyScalar(S.x).addScaledVector(_,-M.x).multiplyScalar(B),d[T].add(E),d[F].add(E),d[X].add(E),m[T].add(v),m[F].add(v),m[X].add(v))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let T=0,F=A.length;T<F;++T){const X=A[T],B=X.start,j=X.count;for(let ie=B,ae=B+j;ie<ae;ie+=3)y(e.getX(ie+0),e.getX(ie+1),e.getX(ie+2))}const N=new Q,C=new Q,I=new Q,U=new Q;function z(T){I.fromBufferAttribute(l,T),U.copy(I);const F=d[T];N.copy(F),N.sub(I.multiplyScalar(I.dot(F))).normalize(),C.crossVectors(U,F);const B=C.dot(m[T])<0?-1:1;u.setXYZW(T,N.x,N.y,N.z,B)}for(let T=0,F=A.length;T<F;++T){const X=A[T],B=X.start,j=X.count;for(let ie=B,ae=B+j;ie<ae;ie+=3)z(e.getX(ie+0)),z(e.getX(ie+1)),z(e.getX(ie+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Hi(new Float32Array(n.count*3),3),this.setAttribute("normal",s);else for(let g=0,S=s.count;g<S;g++)s.setXYZ(g,0,0,0);const l=new Q,c=new Q,u=new Q,d=new Q,m=new Q,p=new Q,_=new Q,x=new Q;if(e)for(let g=0,S=e.count;g<S;g+=3){const M=e.getX(g+0),E=e.getX(g+1),v=e.getX(g+2);l.fromBufferAttribute(n,M),c.fromBufferAttribute(n,E),u.fromBufferAttribute(n,v),_.subVectors(u,c),x.subVectors(l,c),_.cross(x),d.fromBufferAttribute(s,M),m.fromBufferAttribute(s,E),p.fromBufferAttribute(s,v),d.add(_),m.add(_),p.add(_),s.setXYZ(M,d.x,d.y,d.z),s.setXYZ(E,m.x,m.y,m.z),s.setXYZ(v,p.x,p.y,p.z)}else for(let g=0,S=n.count;g<S;g+=3)l.fromBufferAttribute(n,g+0),c.fromBufferAttribute(n,g+1),u.fromBufferAttribute(n,g+2),_.subVectors(u,c),x.subVectors(l,c),_.cross(x),s.setXYZ(g+0,_.x,_.y,_.z),s.setXYZ(g+1,_.x,_.y,_.z),s.setXYZ(g+2,_.x,_.y,_.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,s=e.count;n<s;n++)Rn.fromBufferAttribute(e,n),Rn.normalize(),e.setXYZ(n,Rn.x,Rn.y,Rn.z)}toNonIndexed(){function e(d,m){const p=d.array,_=d.itemSize,x=d.normalized,g=new p.constructor(m.length*_);let S=0,M=0;for(let E=0,v=m.length;E<v;E++){d.isInterleavedBufferAttribute?S=m[E]*d.data.stride+d.offset:S=m[E]*_;for(let y=0;y<_;y++)g[M++]=p[S++]}return new Hi(g,_,x)}if(this.index===null)return tt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new ai,s=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=e(m,s);n.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let _=0,x=p.length;_<x;_++){const g=p[_],S=e(g,s);m.push(S)}n.morphAttributes[d]=m}n.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let d=0,m=u.length;d<m;d++){const p=u[d];n.addGroup(p.start,p.count,p.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(e[p]=m[p]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const s=this.attributes;for(const m in s){const p=s[m];e.data.attributes[m]=p.toJSON(e.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],_=[];for(let x=0,g=p.length;x<g;x++){const S=p[x];_.push(S.toJSON(e.data))}_.length>0&&(l[m]=_,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere=d.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const p in l){const _=l[p];this.setAttribute(p,_.clone(n))}const c=e.morphAttributes;for(const p in c){const _=[],x=c[p];for(let g=0,S=x.length;g<S;g++)_.push(x[g].clone(n));this.morphAttributes[p]=_}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let p=0,_=u.length;p<_;p++){const x=u[p];this.addGroup(x.start,x.count,x.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class EA{constructor(e,n){this.isInterleavedBuffer=!0,this.array=e,this.stride=n,this.count=e!==void 0?e.length/n:0,this.usage=sm,this.updateRanges=[],this.version=0,this.uuid=bs()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,n,s){e*=this.stride,s*=n.stride;for(let l=0,c=this.stride;l<c;l++)this.array[e+l]=n.array[s+l];return this}set(e,n=0){return this.array.set(e,n),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bs()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bs()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Wn=new Q;class tf{constructor(e,n,s,l=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=n,this.offset=s,this.normalized=l}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let n=0,s=this.data.count;n<s;n++)Wn.fromBufferAttribute(this,n),Wn.applyMatrix4(e),this.setXYZ(n,Wn.x,Wn.y,Wn.z);return this}applyNormalMatrix(e){for(let n=0,s=this.count;n<s;n++)Wn.fromBufferAttribute(this,n),Wn.applyNormalMatrix(e),this.setXYZ(n,Wn.x,Wn.y,Wn.z);return this}transformDirection(e){for(let n=0,s=this.count;n<s;n++)Wn.fromBufferAttribute(this,n),Wn.transformDirection(e),this.setXYZ(n,Wn.x,Wn.y,Wn.z);return this}getComponent(e,n){let s=this.array[e*this.data.stride+this.offset+n];return this.normalized&&(s=Qi(s,this.array)),s}setComponent(e,n,s){return this.normalized&&(s=Wt(s,this.array)),this.data.array[e*this.data.stride+this.offset+n]=s,this}setX(e,n){return this.normalized&&(n=Wt(n,this.array)),this.data.array[e*this.data.stride+this.offset]=n,this}setY(e,n){return this.normalized&&(n=Wt(n,this.array)),this.data.array[e*this.data.stride+this.offset+1]=n,this}setZ(e,n){return this.normalized&&(n=Wt(n,this.array)),this.data.array[e*this.data.stride+this.offset+2]=n,this}setW(e,n){return this.normalized&&(n=Wt(n,this.array)),this.data.array[e*this.data.stride+this.offset+3]=n,this}getX(e){let n=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(n=Qi(n,this.array)),n}getY(e){let n=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(n=Qi(n,this.array)),n}getZ(e){let n=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(n=Qi(n,this.array)),n}getW(e){let n=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(n=Qi(n,this.array)),n}setXY(e,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(n=Wt(n,this.array),s=Wt(s,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=s,this}setXYZ(e,n,s,l){return e=e*this.data.stride+this.offset,this.normalized&&(n=Wt(n,this.array),s=Wt(s,this.array),l=Wt(l,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=s,this.data.array[e+2]=l,this}setXYZW(e,n,s,l,c){return e=e*this.data.stride+this.offset,this.normalized&&(n=Wt(n,this.array),s=Wt(s,this.array),l=Wt(l,this.array),c=Wt(c,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=s,this.data.array[e+2]=l,this.data.array[e+3]=c,this}clone(e){if(e===void 0){ef("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let s=0;s<this.count;s++){const l=s*this.data.stride+this.offset;for(let c=0;c<this.itemSize;c++)n.push(this.data.array[l+c])}return new Hi(new this.array.constructor(n),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new tf(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ef("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let s=0;s<this.count;s++){const l=s*this.data.stride+this.offset;for(let c=0;c<this.itemSize;c++)n.push(this.data.array[l+c])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let TA=0;class fr extends ws{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:TA++}),this.uuid=bs(),this.name="",this.type="Material",this.blending=mo,this.side=Es,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_p,this.blendDst=xp,this.blendEquation=Js,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new dt(0,0,0),this.blendAlpha=0,this.depthFunc=vo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=av,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wr,this.stencilZFail=Wr,this.stencilZPass=Wr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const s=e[n];if(s===void 0){tt(`Material: parameter '${n}' has value of undefined.`);continue}const l=this[n];if(l===void 0){tt(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[n]=s}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==mo&&(s.blending=this.blending),this.side!==Es&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==_p&&(s.blendSrc=this.blendSrc),this.blendDst!==xp&&(s.blendDst=this.blendDst),this.blendEquation!==Js&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==vo&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==av&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Wr&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Wr&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Wr&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.allowOverride===!1&&(s.allowOverride=!1),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const u=[];for(const d in c){const m=c[d];delete m.metadata,u.push(m)}return u}if(n){const c=l(e.textures),u=l(e.images);c.length>0&&(s.textures=c),u.length>0&&(s.images=u)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let s=null;if(n!==null){const l=n.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=n[c].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class pS extends fr{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new dt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let io;const Tl=new Q,ao=new Q,so=new Q,ro=new nt,Al=new nt,mS=new on,du=new Q,wl=new Q,pu=new Q,xv=new nt,qd=new nt,vv=new nt;class AA extends Dn{constructor(e=new pS){if(super(),this.isSprite=!0,this.type="Sprite",io===void 0){io=new ai;const n=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),s=new EA(n,5);io.setIndex([0,1,2,0,2,3]),io.setAttribute("position",new tf(s,3,0,!1)),io.setAttribute("uv",new tf(s,2,3,!1))}this.geometry=io,this.material=e,this.center=new nt(.5,.5),this.count=1}raycast(e,n){e.camera===null&&At('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ao.setFromMatrixScale(this.matrixWorld),mS.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),so.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ao.multiplyScalar(-so.z);const s=this.material.rotation;let l,c;s!==0&&(c=Math.cos(s),l=Math.sin(s));const u=this.center;mu(du.set(-.5,-.5,0),so,u,ao,l,c),mu(wl.set(.5,-.5,0),so,u,ao,l,c),mu(pu.set(.5,.5,0),so,u,ao,l,c),xv.set(0,0),qd.set(1,0),vv.set(1,1);let d=e.ray.intersectTriangle(du,wl,pu,!1,Tl);if(d===null&&(mu(wl.set(-.5,.5,0),so,u,ao,l,c),qd.set(0,1),d=e.ray.intersectTriangle(du,pu,wl,!1,Tl),d===null))return;const m=e.ray.origin.distanceTo(Tl);m<e.near||m>e.far||n.push({distance:m,point:Tl.clone(),uv:xi.getInterpolation(Tl,du,wl,pu,xv,qd,vv,new nt),face:null,object:this})}copy(e,n){return super.copy(e,n),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function mu(a,e,n,s,l,c){ro.subVectors(a,n).addScalar(.5).multiply(s),l!==void 0?(Al.x=c*ro.x-l*ro.y,Al.y=l*ro.x+c*ro.y):Al.copy(ro),a.copy(e),a.x+=Al.x,a.y+=Al.y,a.applyMatrix4(mS)}const Ra=new Q,Yd=new Q,gu=new Q,ps=new Q,Zd=new Q,_u=new Q,Kd=new Q;class Lm{constructor(e=new Q,n=new Q(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ra)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const s=n.dot(this.direction);return s<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ra.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ra.copy(this.origin).addScaledVector(this.direction,n),Ra.distanceToSquared(e))}distanceSqToSegment(e,n,s,l){Yd.copy(e).add(n).multiplyScalar(.5),gu.copy(n).sub(e).normalize(),ps.copy(this.origin).sub(Yd);const c=e.distanceTo(n)*.5,u=-this.direction.dot(gu),d=ps.dot(this.direction),m=-ps.dot(gu),p=ps.lengthSq(),_=Math.abs(1-u*u);let x,g,S,M;if(_>0)if(x=u*m-d,g=u*d-m,M=c*_,x>=0)if(g>=-M)if(g<=M){const E=1/_;x*=E,g*=E,S=x*(x+u*g+2*d)+g*(u*x+g+2*m)+p}else g=c,x=Math.max(0,-(u*g+d)),S=-x*x+g*(g+2*m)+p;else g=-c,x=Math.max(0,-(u*g+d)),S=-x*x+g*(g+2*m)+p;else g<=-M?(x=Math.max(0,-(-u*c+d)),g=x>0?-c:Math.min(Math.max(-c,-m),c),S=-x*x+g*(g+2*m)+p):g<=M?(x=0,g=Math.min(Math.max(-c,-m),c),S=g*(g+2*m)+p):(x=Math.max(0,-(u*c+d)),g=x>0?c:Math.min(Math.max(-c,-m),c),S=-x*x+g*(g+2*m)+p);else g=u>0?-c:c,x=Math.max(0,-(u*g+d)),S=-x*x+g*(g+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,x),l&&l.copy(Yd).addScaledVector(gu,g),S}intersectSphere(e,n){Ra.subVectors(e.center,this.origin);const s=Ra.dot(this.direction),l=Ra.dot(Ra)-s*s,c=e.radius*e.radius;if(l>c)return null;const u=Math.sqrt(c-l),d=s-u,m=s+u;return m<0?null:d<0?this.at(m,n):this.at(d,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/n;return s>=0?s:null}intersectPlane(e,n){const s=this.distanceToPlane(e);return s===null?null:this.at(s,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let s,l,c,u,d,m;const p=1/this.direction.x,_=1/this.direction.y,x=1/this.direction.z,g=this.origin;return p>=0?(s=(e.min.x-g.x)*p,l=(e.max.x-g.x)*p):(s=(e.max.x-g.x)*p,l=(e.min.x-g.x)*p),_>=0?(c=(e.min.y-g.y)*_,u=(e.max.y-g.y)*_):(c=(e.max.y-g.y)*_,u=(e.min.y-g.y)*_),s>u||c>l||((c>s||isNaN(s))&&(s=c),(u<l||isNaN(l))&&(l=u),x>=0?(d=(e.min.z-g.z)*x,m=(e.max.z-g.z)*x):(d=(e.max.z-g.z)*x,m=(e.min.z-g.z)*x),s>m||d>l)||((d>s||s!==s)&&(s=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,n)}intersectsBox(e){return this.intersectBox(e,Ra)!==null}intersectTriangle(e,n,s,l,c){Zd.subVectors(n,e),_u.subVectors(s,e),Kd.crossVectors(Zd,_u);let u=this.direction.dot(Kd),d;if(u>0){if(l)return null;d=1}else if(u<0)d=-1,u=-u;else return null;ps.subVectors(this.origin,e);const m=d*this.direction.dot(_u.crossVectors(ps,_u));if(m<0)return null;const p=d*this.direction.dot(Zd.cross(ps));if(p<0||m+p>u)return null;const _=-d*ps.dot(Kd);return _<0?null:this.at(_/u,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class gS extends fr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new As,this.combine=qy,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yv=new on,Zs=new Lm,xu=new ff,Sv=new Q,vu=new Q,yu=new Q,Su=new Q,Qd=new Q,bu=new Q,bv=new Q,Mu=new Q;class aa extends Dn{constructor(e=new ai,n=new gS){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const l=n[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=l.length;c<u;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(e,n){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,u=s.morphTargetsRelative;n.fromBufferAttribute(l,e);const d=this.morphTargetInfluences;if(c&&d){bu.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const _=d[m],x=c[m];_!==0&&(Qd.fromBufferAttribute(x,e),u?bu.addScaledVector(Qd,_):bu.addScaledVector(Qd.sub(n),_))}n.add(bu)}return n}raycast(e,n){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),xu.copy(s.boundingSphere),xu.applyMatrix4(c),Zs.copy(e.ray).recast(e.near),!(xu.containsPoint(Zs.origin)===!1&&(Zs.intersectSphere(xu,Sv)===null||Zs.origin.distanceToSquared(Sv)>(e.far-e.near)**2))&&(yv.copy(c).invert(),Zs.copy(e.ray).applyMatrix4(yv),!(s.boundingBox!==null&&Zs.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,n,Zs)))}_computeIntersections(e,n,s){let l;const c=this.geometry,u=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,_=c.attributes.uv1,x=c.attributes.normal,g=c.groups,S=c.drawRange;if(d!==null)if(Array.isArray(u))for(let M=0,E=g.length;M<E;M++){const v=g[M],y=u[v.materialIndex],A=Math.max(v.start,S.start),N=Math.min(d.count,Math.min(v.start+v.count,S.start+S.count));for(let C=A,I=N;C<I;C+=3){const U=d.getX(C),z=d.getX(C+1),T=d.getX(C+2);l=Eu(this,y,e,s,p,_,x,U,z,T),l&&(l.faceIndex=Math.floor(C/3),l.face.materialIndex=v.materialIndex,n.push(l))}}else{const M=Math.max(0,S.start),E=Math.min(d.count,S.start+S.count);for(let v=M,y=E;v<y;v+=3){const A=d.getX(v),N=d.getX(v+1),C=d.getX(v+2);l=Eu(this,u,e,s,p,_,x,A,N,C),l&&(l.faceIndex=Math.floor(v/3),n.push(l))}}else if(m!==void 0)if(Array.isArray(u))for(let M=0,E=g.length;M<E;M++){const v=g[M],y=u[v.materialIndex],A=Math.max(v.start,S.start),N=Math.min(m.count,Math.min(v.start+v.count,S.start+S.count));for(let C=A,I=N;C<I;C+=3){const U=C,z=C+1,T=C+2;l=Eu(this,y,e,s,p,_,x,U,z,T),l&&(l.faceIndex=Math.floor(C/3),l.face.materialIndex=v.materialIndex,n.push(l))}}else{const M=Math.max(0,S.start),E=Math.min(m.count,S.start+S.count);for(let v=M,y=E;v<y;v+=3){const A=v,N=v+1,C=v+2;l=Eu(this,u,e,s,p,_,x,A,N,C),l&&(l.faceIndex=Math.floor(v/3),n.push(l))}}}}function wA(a,e,n,s,l,c,u,d){let m;if(e.side===ii?m=s.intersectTriangle(u,c,l,!0,d):m=s.intersectTriangle(l,c,u,e.side===Es,d),m===null)return null;Mu.copy(d),Mu.applyMatrix4(a.matrixWorld);const p=n.ray.origin.distanceTo(Mu);return p<n.near||p>n.far?null:{distance:p,point:Mu.clone(),object:a}}function Eu(a,e,n,s,l,c,u,d,m,p){a.getVertexPosition(d,vu),a.getVertexPosition(m,yu),a.getVertexPosition(p,Su);const _=wA(a,e,n,s,vu,yu,Su,bv);if(_){const x=new Q;xi.getBarycoord(bv,vu,yu,Su,x),l&&(_.uv=xi.getInterpolatedAttribute(l,d,m,p,x,new nt)),c&&(_.uv1=xi.getInterpolatedAttribute(c,d,m,p,x,new nt)),u&&(_.normal=xi.getInterpolatedAttribute(u,d,m,p,x,new Q),_.normal.dot(s.direction)>0&&_.normal.multiplyScalar(-1));const g={a:d,b:m,c:p,normal:new Q,materialIndex:0};xi.getNormal(vu,yu,Su,g.normal),_.face=g,_.barycoord=x}return _}class RA extends jn{constructor(e=null,n=1,s=1,l,c,u,d,m,p=In,_=In,x,g){super(null,u,d,m,p,_,l,c,x,g),this.isDataTexture=!0,this.image={data:e,width:n,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Jd=new Q,CA=new Q,DA=new ot;class gs{constructor(e=new Q(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,s,l){return this.normal.set(e,n,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,s){const l=Jd.subVectors(s,n).cross(CA.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,s=!0){const l=e.delta(Jd),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const u=-(e.start.dot(this.normal)+this.constant)/c;return s===!0&&(u<0||u>1)?null:n.copy(e.start).addScaledVector(l,u)}intersectsLine(e){const n=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return n<0&&s>0||s<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const s=n||DA.getNormalMatrix(e),l=this.coplanarPoint(Jd).applyMatrix4(e),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ks=new ff,NA=new nt(.5,.5),Tu=new Q;class Um{constructor(e=new gs,n=new gs,s=new gs,l=new gs,c=new gs,u=new gs){this.planes=[e,n,s,l,c,u]}set(e,n,s,l,c,u){const d=this.planes;return d[0].copy(e),d[1].copy(n),d[2].copy(s),d[3].copy(l),d[4].copy(c),d[5].copy(u),this}copy(e){const n=this.planes;for(let s=0;s<6;s++)n[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,n=$i,s=!1){const l=this.planes,c=e.elements,u=c[0],d=c[1],m=c[2],p=c[3],_=c[4],x=c[5],g=c[6],S=c[7],M=c[8],E=c[9],v=c[10],y=c[11],A=c[12],N=c[13],C=c[14],I=c[15];if(l[0].setComponents(p-u,S-_,y-M,I-A).normalize(),l[1].setComponents(p+u,S+_,y+M,I+A).normalize(),l[2].setComponents(p+d,S+x,y+E,I+N).normalize(),l[3].setComponents(p-d,S-x,y-E,I-N).normalize(),s)l[4].setComponents(m,g,v,C).normalize(),l[5].setComponents(p-m,S-g,y-v,I-C).normalize();else if(l[4].setComponents(p-m,S-g,y-v,I-C).normalize(),n===$i)l[5].setComponents(p+m,S+g,y+v,I+C).normalize();else if(n===kl)l[5].setComponents(m,g,v,C).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ks.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ks.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ks)}intersectsSprite(e){Ks.center.set(0,0,0);const n=NA.distanceTo(e.center);return Ks.radius=.7071067811865476+n,Ks.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ks)}intersectsSphere(e){const n=this.planes,s=e.center,l=-e.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const n=this.planes;for(let s=0;s<6;s++){const l=n[s];if(Tu.x=l.normal.x>0?e.max.x:e.min.x,Tu.y=l.normal.y>0?e.max.y:e.min.y,Tu.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(Tu)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let s=0;s<6;s++)if(n[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class nf extends fr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new dt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const af=new Q,sf=new Q,Mv=new on,Rl=new Lm,Au=new ff,$d=new Q,Ev=new Q;class LA extends Dn{constructor(e=new ai,n=new nf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,s=[0];for(let l=1,c=n.count;l<c;l++)af.fromBufferAttribute(n,l-1),sf.fromBufferAttribute(n,l),s[l]=s[l-1],s[l]+=af.distanceTo(sf);e.setAttribute("lineDistance",new Zn(s,1))}else tt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const s=this.geometry,l=this.matrixWorld,c=e.params.Line.threshold,u=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Au.copy(s.boundingSphere),Au.applyMatrix4(l),Au.radius+=c,e.ray.intersectsSphere(Au)===!1)return;Mv.copy(l).invert(),Rl.copy(e.ray).applyMatrix4(Mv);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=this.isLineSegments?2:1,_=s.index,g=s.attributes.position;if(_!==null){const S=Math.max(0,u.start),M=Math.min(_.count,u.start+u.count);for(let E=S,v=M-1;E<v;E+=p){const y=_.getX(E),A=_.getX(E+1),N=wu(this,e,Rl,m,y,A,E);N&&n.push(N)}if(this.isLineLoop){const E=_.getX(M-1),v=_.getX(S),y=wu(this,e,Rl,m,E,v,M-1);y&&n.push(y)}}else{const S=Math.max(0,u.start),M=Math.min(g.count,u.start+u.count);for(let E=S,v=M-1;E<v;E+=p){const y=wu(this,e,Rl,m,E,E+1,E);y&&n.push(y)}if(this.isLineLoop){const E=wu(this,e,Rl,m,M-1,S,M-1);E&&n.push(E)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const l=n[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=l.length;c<u;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function wu(a,e,n,s,l,c,u){const d=a.geometry.attributes.position;if(af.fromBufferAttribute(d,l),sf.fromBufferAttribute(d,c),n.distanceSqToSegment(af,sf,$d,Ev)>s)return;$d.applyMatrix4(a.matrixWorld);const p=e.ray.origin.distanceTo($d);if(!(p<e.near||p>e.far))return{distance:p,point:Ev.clone().applyMatrix4(a.matrixWorld),index:u,face:null,faceIndex:null,barycoord:null,object:a}}const Tv=new Q,Av=new Q;class lm extends LA{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,s=[];for(let l=0,c=n.count;l<c;l+=2)Tv.fromBufferAttribute(n,l),Av.fromBufferAttribute(n,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+Tv.distanceTo(Av);e.setAttribute("lineDistance",new Zn(s,1))}else tt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class _S extends jn{constructor(e=[],n=nr,s,l,c,u,d,m,p,_){super(e,n,s,l,c,u,d,m,p,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class wv extends jn{constructor(e,n,s,l,c,u,d,m,p){super(e,n,s,l,c,u,d,m,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class So extends jn{constructor(e,n,s=ia,l,c,u,d=In,m=In,p,_=Ua,x=1){if(_!==Ua&&_!==tr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:n,depth:x};super(g,l,c,u,d,m,_,s,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Dm(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class UA extends So{constructor(e,n=ia,s=nr,l,c,u=In,d=In,m,p=Ua){const _={width:e,height:e,depth:1},x=[_,_,_,_,_,_];super(e,e,n,s,l,c,u,d,m,p),this.image=x,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class xS extends jn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Eo extends ai{constructor(e=1,n=1,s=1,l=1,c=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:s,widthSegments:l,heightSegments:c,depthSegments:u};const d=this;l=Math.floor(l),c=Math.floor(c),u=Math.floor(u);const m=[],p=[],_=[],x=[];let g=0,S=0;M("z","y","x",-1,-1,s,n,e,u,c,0),M("z","y","x",1,-1,s,n,-e,u,c,1),M("x","z","y",1,1,e,s,n,l,u,2),M("x","z","y",1,-1,e,s,-n,l,u,3),M("x","y","z",1,-1,e,n,s,l,c,4),M("x","y","z",-1,-1,e,n,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new Zn(p,3)),this.setAttribute("normal",new Zn(_,3)),this.setAttribute("uv",new Zn(x,2));function M(E,v,y,A,N,C,I,U,z,T,F){const X=C/z,B=I/T,j=C/2,ie=I/2,ae=U/2,V=z+1,O=T+1;let G=0,$=0;const he=new Q;for(let ge=0;ge<O;ge++){const H=ge*B-ie;for(let K=0;K<V;K++){const ye=K*X-j;he[E]=ye*A,he[v]=H*N,he[y]=ae,p.push(he.x,he.y,he.z),he[E]=0,he[v]=0,he[y]=U>0?1:-1,_.push(he.x,he.y,he.z),x.push(K/z),x.push(1-ge/T),G+=1}}for(let ge=0;ge<T;ge++)for(let H=0;H<z;H++){const K=g+H+V*ge,ye=g+H+V*(ge+1),ee=g+(H+1)+V*(ge+1),Ee=g+(H+1)+V*ge;m.push(K,ye,Ee),m.push(ye,ee,Ee),$+=6}d.addGroup(S,$,F),S+=$,g+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Eo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}const Ru=new Q,Cu=new Q,ep=new Q,Du=new xi;class OA extends ai{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const l=Math.pow(10,4),c=Math.cos(zl*n),u=e.getIndex(),d=e.getAttribute("position"),m=u?u.count:d.count,p=[0,0,0],_=["a","b","c"],x=new Array(3),g={},S=[];for(let M=0;M<m;M+=3){u?(p[0]=u.getX(M),p[1]=u.getX(M+1),p[2]=u.getX(M+2)):(p[0]=M,p[1]=M+1,p[2]=M+2);const{a:E,b:v,c:y}=Du;if(E.fromBufferAttribute(d,p[0]),v.fromBufferAttribute(d,p[1]),y.fromBufferAttribute(d,p[2]),Du.getNormal(ep),x[0]=`${Math.round(E.x*l)},${Math.round(E.y*l)},${Math.round(E.z*l)}`,x[1]=`${Math.round(v.x*l)},${Math.round(v.y*l)},${Math.round(v.z*l)}`,x[2]=`${Math.round(y.x*l)},${Math.round(y.y*l)},${Math.round(y.z*l)}`,!(x[0]===x[1]||x[1]===x[2]||x[2]===x[0]))for(let A=0;A<3;A++){const N=(A+1)%3,C=x[A],I=x[N],U=Du[_[A]],z=Du[_[N]],T=`${C}_${I}`,F=`${I}_${C}`;F in g&&g[F]?(ep.dot(g[F].normal)<=c&&(S.push(U.x,U.y,U.z),S.push(z.x,z.y,z.z)),g[F]=null):T in g||(g[T]={index0:p[A],index1:p[N],normal:ep.clone()})}}for(const M in g)if(g[M]){const{index0:E,index1:v}=g[M];Ru.fromBufferAttribute(d,E),Cu.fromBufferAttribute(d,v),S.push(Ru.x,Ru.y,Ru.z),S.push(Cu.x,Cu.y,Cu.z)}this.setAttribute("position",new Zn(S,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class ql extends ai{constructor(e=1,n=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:s,heightSegments:l};const c=e/2,u=n/2,d=Math.floor(s),m=Math.floor(l),p=d+1,_=m+1,x=e/d,g=n/m,S=[],M=[],E=[],v=[];for(let y=0;y<_;y++){const A=y*g-u;for(let N=0;N<p;N++){const C=N*x-c;M.push(C,-A,0),E.push(0,0,1),v.push(N/d),v.push(1-y/m)}}for(let y=0;y<m;y++)for(let A=0;A<d;A++){const N=A+p*y,C=A+p*(y+1),I=A+1+p*(y+1),U=A+1+p*y;S.push(N,C,U),S.push(C,I,U)}this.setIndex(S),this.setAttribute("position",new Zn(M,3)),this.setAttribute("normal",new Zn(E,3)),this.setAttribute("uv",new Zn(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ql(e.width,e.height,e.widthSegments,e.heightSegments)}}class Rv extends ai{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const n=[],s=new Set,l=new Q,c=new Q;if(e.index!==null){const u=e.attributes.position,d=e.index;let m=e.groups;m.length===0&&(m=[{start:0,count:d.count,materialIndex:0}]);for(let p=0,_=m.length;p<_;++p){const x=m[p],g=x.start,S=x.count;for(let M=g,E=g+S;M<E;M+=3)for(let v=0;v<3;v++){const y=d.getX(M+v),A=d.getX(M+(v+1)%3);l.fromBufferAttribute(u,y),c.fromBufferAttribute(u,A),Cv(l,c,s)===!0&&(n.push(l.x,l.y,l.z),n.push(c.x,c.y,c.z))}}}else{const u=e.attributes.position;for(let d=0,m=u.count/3;d<m;d++)for(let p=0;p<3;p++){const _=3*d+p,x=3*d+(p+1)%3;l.fromBufferAttribute(u,_),c.fromBufferAttribute(u,x),Cv(l,c,s)===!0&&(n.push(l.x,l.y,l.z),n.push(c.x,c.y,c.z))}}this.setAttribute("position",new Zn(n,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function Cv(a,e,n){const s=`${a.x},${a.y},${a.z}-${e.x},${e.y},${e.z}`,l=`${e.x},${e.y},${e.z}-${a.x},${a.y},${a.z}`;return n.has(s)===!0||n.has(l)===!0?!1:(n.add(s),n.add(l),!0)}function bo(a){const e={};for(const n in a){e[n]={};for(const s in a[n]){const l=a[n][s];if(Dv(l))l.isRenderTargetTexture?(tt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][s]=null):e[n][s]=l.clone();else if(Array.isArray(l))if(Dv(l[0])){const c=[];for(let u=0,d=l.length;u<d;u++)c[u]=l[u].clone();e[n][s]=c}else e[n][s]=l.slice();else e[n][s]=l}}return e}function qn(a){const e={};for(let n=0;n<a.length;n++){const s=bo(a[n]);for(const l in s)e[l]=s[l]}return e}function Dv(a){return a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)}function PA(a){const e=[];for(let n=0;n<a.length;n++)e.push(a[n].clone());return e}function vS(a){const e=a.getRenderTarget();return e===null?a.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Tt.workingColorSpace}const zA={clone:bo,merge:qn};var IA=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,FA=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class sa extends fr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=IA,this.fragmentShader=FA,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=bo(e.uniforms),this.uniformsGroups=PA(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const l in this.uniforms){const u=this.uniforms[l].value;u&&u.isTexture?n.uniforms[l]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?n.uniforms[l]={type:"c",value:u.getHex()}:u&&u.isVector2?n.uniforms[l]={type:"v2",value:u.toArray()}:u&&u.isVector3?n.uniforms[l]={type:"v3",value:u.toArray()}:u&&u.isVector4?n.uniforms[l]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?n.uniforms[l]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?n.uniforms[l]={type:"m4",value:u.toArray()}:n.uniforms[l]={value:u}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(n.extensions=s),n}}class BA extends sa{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Nu extends fr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=am,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new As,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class HA extends fr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qT,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class GA extends fr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class yS extends Dn{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new dt(e),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}const tp=new on,Nv=new Q,Lv=new Q;class VA{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.mapType=_i,this.map=null,this.mapPass=null,this.matrix=new on,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Um,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new un(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,s=this.matrix;Nv.setFromMatrixPosition(e.matrixWorld),n.position.copy(Nv),Lv.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Lv),n.updateMatrixWorld(),tp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(tp,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===kl||n.reversedDepth?s.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):s.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),s.multiply(tp)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Lu=new Q,Uu=new Ts,Wi=new Q;class SS extends Dn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new on,this.projectionMatrix=new on,this.projectionMatrixInverse=new on,this.coordinateSystem=$i,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Lu,Uu,Wi),Wi.x===1&&Wi.y===1&&Wi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lu,Uu,Wi.set(1,1,1)).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorld.decompose(Lu,Uu,Wi),Wi.x===1&&Wi.y===1&&Wi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Lu,Uu,Wi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ms=new Q,Uv=new nt,Ov=new nt;class Di extends SS{constructor(e=50,n=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=om*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return om*2*Math.atan(Math.tan(zl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,s){ms.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ms.x,ms.y).multiplyScalar(-e/ms.z),ms.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(ms.x,ms.y).multiplyScalar(-e/ms.z)}getViewSize(e,n){return this.getViewBounds(e,Uv,Ov),n.subVectors(Ov,Uv)}setViewOffset(e,n,s,l,c,u){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(zl*.5*this.fov)/this.zoom,s=2*n,l=this.aspect*s,c=-.5*l;const u=this.view;if(this.view!==null&&this.view.enabled){const m=u.fullWidth,p=u.fullHeight;c+=u.offsetX*l/m,n-=u.offsetY*s/p,l*=u.width/m,s*=u.height/p}const d=this.filmOffset;d!==0&&(c+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,n,n-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Om extends SS{constructor(e=-1,n=1,s=1,l=-1,c=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=s,this.bottom=l,this.near=c,this.far=u,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,s,l,c,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-e,u=s+e,d=l+n,m=l-n;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,u=c+p*this.view.width,d-=_*this.view.offsetY,m=d-_*this.view.height}this.projectionMatrix.makeOrthographic(c,u,d,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class kA extends VA{constructor(){super(new Om(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Pv extends yS{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Dn.DEFAULT_UP),this.updateMatrix(),this.target=new Dn,this.shadow=new kA}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}class jA extends yS{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const oo=-90,lo=1;class XA extends Dn{constructor(e,n,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Di(oo,lo,e,n);l.layers=this.layers,this.add(l);const c=new Di(oo,lo,e,n);c.layers=this.layers,this.add(c);const u=new Di(oo,lo,e,n);u.layers=this.layers,this.add(u);const d=new Di(oo,lo,e,n);d.layers=this.layers,this.add(d);const m=new Di(oo,lo,e,n);m.layers=this.layers,this.add(m);const p=new Di(oo,lo,e,n);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[s,l,c,u,d,m]=n;for(const p of n)this.remove(p);if(e===$i)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===kl)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of n)this.add(p),p.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,u,d,m,p,_]=this.children,x=e.getRenderTarget(),g=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const E=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let v=!1;e.isWebGLRenderer===!0?v=e.state.buffers.depth.getReversed():v=e.reversedDepthBuffer,e.setRenderTarget(s,0,l),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),e.setRenderTarget(s,1,l),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,u),e.setRenderTarget(s,2,l),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,d),e.setRenderTarget(s,3,l),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,m),e.setRenderTarget(s,4,l),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,p),s.texture.generateMipmaps=E,e.setRenderTarget(s,5,l),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,_),e.setRenderTarget(x,g,S),e.xr.enabled=M,s.texture.needsPMREMUpdate=!0}}class WA extends Di{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class zv{constructor(e=1,n=0,s=0){this.radius=e,this.phi=n,this.theta=s}set(e,n,s){return this.radius=e,this.phi=n,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=St(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,s){return this.radius=Math.sqrt(e*e+n*n+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos(St(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Ym=class Ym{constructor(e,n,s,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let s=0;s<4;s++)this.elements[s]=e[s+n];return this}set(e,n,s,l){const c=this.elements;return c[0]=e,c[2]=n,c[1]=s,c[3]=l,this}};Ym.prototype.isMatrix2=!0;let Iv=Ym;class qA extends lm{constructor(e=10,n=10,s=4473924,l=8947848){s=new dt(s),l=new dt(l);const c=n/2,u=e/n,d=e/2,m=[],p=[];for(let g=0,S=0,M=-d;g<=n;g++,M+=u){m.push(-d,0,M,d,0,M),m.push(M,0,-d,M,0,d);const E=g===c?s:l;E.toArray(p,S),S+=3,E.toArray(p,S),S+=3,E.toArray(p,S),S+=3,E.toArray(p,S),S+=3}const _=new ai;_.setAttribute("position",new Zn(m,3)),_.setAttribute("color",new Zn(p,3));const x=new nf({vertexColors:!0,toneMapped:!1});super(_,x),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class YA extends ws{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){tt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Fv(a,e,n,s){const l=ZA(s);switch(n){case sS:return a*e;case oS:return a*e/l.components*l.byteLength;case Tm:return a*e/l.components*l.byteLength;case ir:return a*e*2/l.components*l.byteLength;case Am:return a*e*2/l.components*l.byteLength;case rS:return a*e*3/l.components*l.byteLength;case Bi:return a*e*4/l.components*l.byteLength;case wm:return a*e*4/l.components*l.byteLength;case Gu:case Vu:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*8;case ku:case ju:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case Cp:case Np:return Math.max(a,16)*Math.max(e,8)/4;case Rp:case Dp:return Math.max(a,8)*Math.max(e,8)/2;case Lp:case Up:case Pp:case zp:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*8;case Op:case Zu:case Ip:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case Fp:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case Bp:return Math.floor((a+4)/5)*Math.floor((e+3)/4)*16;case Hp:return Math.floor((a+4)/5)*Math.floor((e+4)/5)*16;case Gp:return Math.floor((a+5)/6)*Math.floor((e+4)/5)*16;case Vp:return Math.floor((a+5)/6)*Math.floor((e+5)/6)*16;case kp:return Math.floor((a+7)/8)*Math.floor((e+4)/5)*16;case jp:return Math.floor((a+7)/8)*Math.floor((e+5)/6)*16;case Xp:return Math.floor((a+7)/8)*Math.floor((e+7)/8)*16;case Wp:return Math.floor((a+9)/10)*Math.floor((e+4)/5)*16;case qp:return Math.floor((a+9)/10)*Math.floor((e+5)/6)*16;case Yp:return Math.floor((a+9)/10)*Math.floor((e+7)/8)*16;case Zp:return Math.floor((a+9)/10)*Math.floor((e+9)/10)*16;case Kp:return Math.floor((a+11)/12)*Math.floor((e+9)/10)*16;case Qp:return Math.floor((a+11)/12)*Math.floor((e+11)/12)*16;case Jp:case $p:case em:return Math.ceil(a/4)*Math.ceil(e/4)*16;case tm:case nm:return Math.ceil(a/4)*Math.ceil(e/4)*8;case Ku:case im:return Math.ceil(a/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function ZA(a){switch(a){case _i:case tS:return{byteLength:1,components:1};case Gl:case nS:case La:return{byteLength:2,components:1};case Mm:case Em:return{byteLength:2,components:4};case ia:case bm:case Ji:return{byteLength:4,components:1};case iS:case aS:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ym}}));typeof window<"u"&&(window.__THREE__?tt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ym);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function bS(){let a=null,e=!1,n=null,s=null;function l(c,u){n(c,u),s=a.requestAnimationFrame(l)}return{start:function(){e!==!0&&n!==null&&a!==null&&(s=a.requestAnimationFrame(l),e=!0)},stop:function(){a!==null&&a.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(c){n=c},setContext:function(c){a=c}}}function KA(a){const e=new WeakMap;function n(d,m){const p=d.array,_=d.usage,x=p.byteLength,g=a.createBuffer();a.bindBuffer(m,g),a.bufferData(m,p,_),d.onUploadCallback();let S;if(p instanceof Float32Array)S=a.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)S=a.HALF_FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?S=a.HALF_FLOAT:S=a.UNSIGNED_SHORT;else if(p instanceof Int16Array)S=a.SHORT;else if(p instanceof Uint32Array)S=a.UNSIGNED_INT;else if(p instanceof Int32Array)S=a.INT;else if(p instanceof Int8Array)S=a.BYTE;else if(p instanceof Uint8Array)S=a.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)S=a.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:g,type:S,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:x}}function s(d,m,p){const _=m.array,x=m.updateRanges;if(a.bindBuffer(p,d),x.length===0)a.bufferSubData(p,0,_);else{x.sort((S,M)=>S.start-M.start);let g=0;for(let S=1;S<x.length;S++){const M=x[g],E=x[S];E.start<=M.start+M.count+1?M.count=Math.max(M.count,E.start+E.count-M.start):(++g,x[g]=E)}x.length=g+1;for(let S=0,M=x.length;S<M;S++){const E=x[S];a.bufferSubData(p,E.start*_.BYTES_PER_ELEMENT,_,E.start,E.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=e.get(d);m&&(a.deleteBuffer(m.buffer),e.delete(d))}function u(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const _=e.get(d);(!_||_.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=e.get(d);if(p===void 0)e.set(d,n(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,d,m),p.version=d.version}}return{get:l,remove:c,update:u}}var QA=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,JA=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,$A=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,e2=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,t2=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,n2=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,i2=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,a2=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,s2=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,r2=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,o2=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,l2=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,c2=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,u2=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,f2=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,h2=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,d2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,p2=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,m2=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,g2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,_2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,x2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,v2=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,y2=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,S2=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,b2=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,M2=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,E2=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,T2=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,A2=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,w2="gl_FragColor = linearToOutputTexel( gl_FragColor );",R2=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,C2=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,D2=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,N2=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,L2=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,U2=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,O2=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,P2=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,z2=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,I2=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,F2=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,B2=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,H2=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,G2=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,V2=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,k2=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,j2=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,X2=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,W2=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,q2=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Y2=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Z2=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,K2=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Q2=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,J2=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$2=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,ew=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,tw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,iw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,aw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ow=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dw=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,pw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,gw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,_w=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,yw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Sw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ew=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Aw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,ww=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Rw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Cw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Uw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Ow=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Pw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,zw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Iw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fw=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Bw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Gw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Vw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ww=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,qw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Yw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Zw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Kw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$w=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eR=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nR=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,aR=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,sR=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,rR=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,oR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,lR=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cR=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,uR=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,hR=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dR=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pR=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mR=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,gR=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_R=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,xR=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,vR=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yR=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SR=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,bR=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MR=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ER=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TR=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,AR=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wR=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,RR=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,CR=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,DR=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pt={alphahash_fragment:QA,alphahash_pars_fragment:JA,alphamap_fragment:$A,alphamap_pars_fragment:e2,alphatest_fragment:t2,alphatest_pars_fragment:n2,aomap_fragment:i2,aomap_pars_fragment:a2,batching_pars_vertex:s2,batching_vertex:r2,begin_vertex:o2,beginnormal_vertex:l2,bsdfs:c2,iridescence_fragment:u2,bumpmap_pars_fragment:f2,clipping_planes_fragment:h2,clipping_planes_pars_fragment:d2,clipping_planes_pars_vertex:p2,clipping_planes_vertex:m2,color_fragment:g2,color_pars_fragment:_2,color_pars_vertex:x2,color_vertex:v2,common:y2,cube_uv_reflection_fragment:S2,defaultnormal_vertex:b2,displacementmap_pars_vertex:M2,displacementmap_vertex:E2,emissivemap_fragment:T2,emissivemap_pars_fragment:A2,colorspace_fragment:w2,colorspace_pars_fragment:R2,envmap_fragment:C2,envmap_common_pars_fragment:D2,envmap_pars_fragment:N2,envmap_pars_vertex:L2,envmap_physical_pars_fragment:k2,envmap_vertex:U2,fog_vertex:O2,fog_pars_vertex:P2,fog_fragment:z2,fog_pars_fragment:I2,gradientmap_pars_fragment:F2,lightmap_pars_fragment:B2,lights_lambert_fragment:H2,lights_lambert_pars_fragment:G2,lights_pars_begin:V2,lights_toon_fragment:j2,lights_toon_pars_fragment:X2,lights_phong_fragment:W2,lights_phong_pars_fragment:q2,lights_physical_fragment:Y2,lights_physical_pars_fragment:Z2,lights_fragment_begin:K2,lights_fragment_maps:Q2,lights_fragment_end:J2,lightprobes_pars_fragment:$2,logdepthbuf_fragment:ew,logdepthbuf_pars_fragment:tw,logdepthbuf_pars_vertex:nw,logdepthbuf_vertex:iw,map_fragment:aw,map_pars_fragment:sw,map_particle_fragment:rw,map_particle_pars_fragment:ow,metalnessmap_fragment:lw,metalnessmap_pars_fragment:cw,morphinstance_vertex:uw,morphcolor_vertex:fw,morphnormal_vertex:hw,morphtarget_pars_vertex:dw,morphtarget_vertex:pw,normal_fragment_begin:mw,normal_fragment_maps:gw,normal_pars_fragment:_w,normal_pars_vertex:xw,normal_vertex:vw,normalmap_pars_fragment:yw,clearcoat_normal_fragment_begin:Sw,clearcoat_normal_fragment_maps:bw,clearcoat_pars_fragment:Mw,iridescence_pars_fragment:Ew,opaque_fragment:Tw,packing:Aw,premultiplied_alpha_fragment:ww,project_vertex:Rw,dithering_fragment:Cw,dithering_pars_fragment:Dw,roughnessmap_fragment:Nw,roughnessmap_pars_fragment:Lw,shadowmap_pars_fragment:Uw,shadowmap_pars_vertex:Ow,shadowmap_vertex:Pw,shadowmask_pars_fragment:zw,skinbase_vertex:Iw,skinning_pars_vertex:Fw,skinning_vertex:Bw,skinnormal_vertex:Hw,specularmap_fragment:Gw,specularmap_pars_fragment:Vw,tonemapping_fragment:kw,tonemapping_pars_fragment:jw,transmission_fragment:Xw,transmission_pars_fragment:Ww,uv_pars_fragment:qw,uv_pars_vertex:Yw,uv_vertex:Zw,worldpos_vertex:Kw,background_vert:Qw,background_frag:Jw,backgroundCube_vert:$w,backgroundCube_frag:eR,cube_vert:tR,cube_frag:nR,depth_vert:iR,depth_frag:aR,distance_vert:sR,distance_frag:rR,equirect_vert:oR,equirect_frag:lR,linedashed_vert:cR,linedashed_frag:uR,meshbasic_vert:fR,meshbasic_frag:hR,meshlambert_vert:dR,meshlambert_frag:pR,meshmatcap_vert:mR,meshmatcap_frag:gR,meshnormal_vert:_R,meshnormal_frag:xR,meshphong_vert:vR,meshphong_frag:yR,meshphysical_vert:SR,meshphysical_frag:bR,meshtoon_vert:MR,meshtoon_frag:ER,points_vert:TR,points_frag:AR,shadow_vert:wR,shadow_frag:RR,sprite_vert:CR,sprite_frag:DR},Ge={common:{diffuse:{value:new dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ot}},envmap:{envMap:{value:null},envMapRotation:{value:new ot},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ot},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Q},probesMax:{value:new Q},probesResolution:{value:new Q}},points:{diffuse:{value:new dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0},uvTransform:{value:new ot}},sprite:{diffuse:{value:new dt(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}}},Zi={basic:{uniforms:qn([Ge.common,Ge.specularmap,Ge.envmap,Ge.aomap,Ge.lightmap,Ge.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:qn([Ge.common,Ge.specularmap,Ge.envmap,Ge.aomap,Ge.lightmap,Ge.emissivemap,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,Ge.fog,Ge.lights,{emissive:{value:new dt(0)},envMapIntensity:{value:1}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:qn([Ge.common,Ge.specularmap,Ge.envmap,Ge.aomap,Ge.lightmap,Ge.emissivemap,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,Ge.fog,Ge.lights,{emissive:{value:new dt(0)},specular:{value:new dt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:qn([Ge.common,Ge.envmap,Ge.aomap,Ge.lightmap,Ge.emissivemap,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,Ge.roughnessmap,Ge.metalnessmap,Ge.fog,Ge.lights,{emissive:{value:new dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:qn([Ge.common,Ge.aomap,Ge.lightmap,Ge.emissivemap,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,Ge.gradientmap,Ge.fog,Ge.lights,{emissive:{value:new dt(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:qn([Ge.common,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,Ge.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:qn([Ge.points,Ge.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:qn([Ge.common,Ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:qn([Ge.common,Ge.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:qn([Ge.common,Ge.bumpmap,Ge.normalmap,Ge.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:qn([Ge.sprite,Ge.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ot}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distance:{uniforms:qn([Ge.common,Ge.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distance_vert,fragmentShader:pt.distance_frag},shadow:{uniforms:qn([Ge.lights,Ge.fog,{color:{value:new dt(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};Zi.physical={uniforms:qn([Zi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ot},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ot},sheen:{value:0},sheenColor:{value:new dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ot},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ot},attenuationDistance:{value:0},attenuationColor:{value:new dt(0)},specularColor:{value:new dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ot},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ot}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};const Ou={r:0,b:0,g:0},NR=new on,MS=new ot;MS.set(-1,0,0,0,1,0,0,0,1);function LR(a,e,n,s,l,c){const u=new dt(0);let d=l===!0?0:1,m,p,_=null,x=0,g=null;function S(A){let N=A.isScene===!0?A.background:null;if(N&&N.isTexture){const C=A.backgroundBlurriness>0;N=e.get(N,C)}return N}function M(A){let N=!1;const C=S(A);C===null?v(u,d):C&&C.isColor&&(v(C,1),N=!0);const I=a.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,c):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(a.autoClear||N)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil))}function E(A,N){const C=S(N);C&&(C.isCubeTexture||C.mapping===uf)?(p===void 0&&(p=new aa(new Eo(1,1,1),new sa({name:"BackgroundCubeMaterial",uniforms:bo(Zi.backgroundCube.uniforms),vertexShader:Zi.backgroundCube.vertexShader,fragmentShader:Zi.backgroundCube.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(I,U,z){this.matrixWorld.copyPosition(z.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(p)),p.material.uniforms.envMap.value=C,p.material.uniforms.backgroundBlurriness.value=N.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(NR.makeRotationFromEuler(N.backgroundRotation)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(MS),p.material.toneMapped=Tt.getTransfer(C.colorSpace)!==Gt,(_!==C||x!==C.version||g!==a.toneMapping)&&(p.material.needsUpdate=!0,_=C,x=C.version,g=a.toneMapping),p.layers.enableAll(),A.unshift(p,p.geometry,p.material,0,0,null)):C&&C.isTexture&&(m===void 0&&(m=new aa(new ql(2,2),new sa({name:"BackgroundMaterial",uniforms:bo(Zi.background.uniforms),vertexShader:Zi.background.vertexShader,fragmentShader:Zi.background.fragmentShader,side:Es,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=C,m.material.uniforms.backgroundIntensity.value=N.backgroundIntensity,m.material.toneMapped=Tt.getTransfer(C.colorSpace)!==Gt,C.matrixAutoUpdate===!0&&C.updateMatrix(),m.material.uniforms.uvTransform.value.copy(C.matrix),(_!==C||x!==C.version||g!==a.toneMapping)&&(m.material.needsUpdate=!0,_=C,x=C.version,g=a.toneMapping),m.layers.enableAll(),A.unshift(m,m.geometry,m.material,0,0,null))}function v(A,N){A.getRGB(Ou,vS(a)),n.buffers.color.setClear(Ou.r,Ou.g,Ou.b,N,c)}function y(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return u},setClearColor:function(A,N=1){u.set(A),d=N,v(u,d)},getClearAlpha:function(){return d},setClearAlpha:function(A){d=A,v(u,d)},render:M,addToRenderList:E,dispose:y}}function UR(a,e){const n=a.getParameter(a.MAX_VERTEX_ATTRIBS),s={},l=g(null);let c=l,u=!1;function d(B,j,ie,ae,V){let O=!1;const G=x(B,ae,ie,j);c!==G&&(c=G,p(c.object)),O=S(B,ae,ie,V),O&&M(B,ae,ie,V),V!==null&&e.update(V,a.ELEMENT_ARRAY_BUFFER),(O||u)&&(u=!1,C(B,j,ie,ae),V!==null&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function m(){return a.createVertexArray()}function p(B){return a.bindVertexArray(B)}function _(B){return a.deleteVertexArray(B)}function x(B,j,ie,ae){const V=ae.wireframe===!0;let O=s[j.id];O===void 0&&(O={},s[j.id]=O);const G=B.isInstancedMesh===!0?B.id:0;let $=O[G];$===void 0&&($={},O[G]=$);let he=$[ie.id];he===void 0&&(he={},$[ie.id]=he);let ge=he[V];return ge===void 0&&(ge=g(m()),he[V]=ge),ge}function g(B){const j=[],ie=[],ae=[];for(let V=0;V<n;V++)j[V]=0,ie[V]=0,ae[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:j,enabledAttributes:ie,attributeDivisors:ae,object:B,attributes:{},index:null}}function S(B,j,ie,ae){const V=c.attributes,O=j.attributes;let G=0;const $=ie.getAttributes();for(const he in $)if($[he].location>=0){const H=V[he];let K=O[he];if(K===void 0&&(he==="instanceMatrix"&&B.instanceMatrix&&(K=B.instanceMatrix),he==="instanceColor"&&B.instanceColor&&(K=B.instanceColor)),H===void 0||H.attribute!==K||K&&H.data!==K.data)return!0;G++}return c.attributesNum!==G||c.index!==ae}function M(B,j,ie,ae){const V={},O=j.attributes;let G=0;const $=ie.getAttributes();for(const he in $)if($[he].location>=0){let H=O[he];H===void 0&&(he==="instanceMatrix"&&B.instanceMatrix&&(H=B.instanceMatrix),he==="instanceColor"&&B.instanceColor&&(H=B.instanceColor));const K={};K.attribute=H,H&&H.data&&(K.data=H.data),V[he]=K,G++}c.attributes=V,c.attributesNum=G,c.index=ae}function E(){const B=c.newAttributes;for(let j=0,ie=B.length;j<ie;j++)B[j]=0}function v(B){y(B,0)}function y(B,j){const ie=c.newAttributes,ae=c.enabledAttributes,V=c.attributeDivisors;ie[B]=1,ae[B]===0&&(a.enableVertexAttribArray(B),ae[B]=1),V[B]!==j&&(a.vertexAttribDivisor(B,j),V[B]=j)}function A(){const B=c.newAttributes,j=c.enabledAttributes;for(let ie=0,ae=j.length;ie<ae;ie++)j[ie]!==B[ie]&&(a.disableVertexAttribArray(ie),j[ie]=0)}function N(B,j,ie,ae,V,O,G){G===!0?a.vertexAttribIPointer(B,j,ie,V,O):a.vertexAttribPointer(B,j,ie,ae,V,O)}function C(B,j,ie,ae){E();const V=ae.attributes,O=ie.getAttributes(),G=j.defaultAttributeValues;for(const $ in O){const he=O[$];if(he.location>=0){let ge=V[$];if(ge===void 0&&($==="instanceMatrix"&&B.instanceMatrix&&(ge=B.instanceMatrix),$==="instanceColor"&&B.instanceColor&&(ge=B.instanceColor)),ge!==void 0){const H=ge.normalized,K=ge.itemSize,ye=e.get(ge);if(ye===void 0)continue;const ee=ye.buffer,Ee=ye.type,te=ye.bytesPerElement,se=Ee===a.INT||Ee===a.UNSIGNED_INT||ge.gpuType===bm;if(ge.isInterleavedBufferAttribute){const me=ge.data,Ae=me.stride,Ke=ge.offset;if(me.isInstancedInterleavedBuffer){for(let Ye=0;Ye<he.locationSize;Ye++)y(he.location+Ye,me.meshPerAttribute);B.isInstancedMesh!==!0&&ae._maxInstanceCount===void 0&&(ae._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let Ye=0;Ye<he.locationSize;Ye++)v(he.location+Ye);a.bindBuffer(a.ARRAY_BUFFER,ee);for(let Ye=0;Ye<he.locationSize;Ye++)N(he.location+Ye,K/he.locationSize,Ee,H,Ae*te,(Ke+K/he.locationSize*Ye)*te,se)}else{if(ge.isInstancedBufferAttribute){for(let me=0;me<he.locationSize;me++)y(he.location+me,ge.meshPerAttribute);B.isInstancedMesh!==!0&&ae._maxInstanceCount===void 0&&(ae._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let me=0;me<he.locationSize;me++)v(he.location+me);a.bindBuffer(a.ARRAY_BUFFER,ee);for(let me=0;me<he.locationSize;me++)N(he.location+me,K/he.locationSize,Ee,H,K*te,K/he.locationSize*me*te,se)}}else if(G!==void 0){const H=G[$];if(H!==void 0)switch(H.length){case 2:a.vertexAttrib2fv(he.location,H);break;case 3:a.vertexAttrib3fv(he.location,H);break;case 4:a.vertexAttrib4fv(he.location,H);break;default:a.vertexAttrib1fv(he.location,H)}}}}A()}function I(){F();for(const B in s){const j=s[B];for(const ie in j){const ae=j[ie];for(const V in ae){const O=ae[V];for(const G in O)_(O[G].object),delete O[G];delete ae[V]}}delete s[B]}}function U(B){if(s[B.id]===void 0)return;const j=s[B.id];for(const ie in j){const ae=j[ie];for(const V in ae){const O=ae[V];for(const G in O)_(O[G].object),delete O[G];delete ae[V]}}delete s[B.id]}function z(B){for(const j in s){const ie=s[j];for(const ae in ie){const V=ie[ae];if(V[B.id]===void 0)continue;const O=V[B.id];for(const G in O)_(O[G].object),delete O[G];delete V[B.id]}}}function T(B){for(const j in s){const ie=s[j],ae=B.isInstancedMesh===!0?B.id:0,V=ie[ae];if(V!==void 0){for(const O in V){const G=V[O];for(const $ in G)_(G[$].object),delete G[$];delete V[O]}delete ie[ae],Object.keys(ie).length===0&&delete s[j]}}}function F(){X(),u=!0,c!==l&&(c=l,p(c.object))}function X(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:F,resetDefaultState:X,dispose:I,releaseStatesOfGeometry:U,releaseStatesOfObject:T,releaseStatesOfProgram:z,initAttributes:E,enableAttribute:v,disableUnusedAttributes:A}}function OR(a,e,n){let s;function l(m){s=m}function c(m,p){a.drawArrays(s,m,p),n.update(p,s,1)}function u(m,p,_){_!==0&&(a.drawArraysInstanced(s,m,p,_),n.update(p,s,_))}function d(m,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,p,0,_);let g=0;for(let S=0;S<_;S++)g+=p[S];n.update(g,s,1)}this.setMode=l,this.render=c,this.renderInstances=u,this.renderMultiDraw=d}function PR(a,e,n,s){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const z=e.get("EXT_texture_filter_anisotropic");l=a.getParameter(z.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function u(z){return!(z!==Bi&&s.convert(z)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(z){const T=z===La&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(z!==_i&&s.convert(z)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_TYPE)&&z!==Ji&&!T)}function m(z){if(z==="highp"){if(a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision>0)return"highp";z="mediump"}return z==="mediump"&&a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=n.precision!==void 0?n.precision:"highp";const _=m(p);_!==p&&(tt("WebGLRenderer:",p,"not supported, using",_,"instead."),p=_);const x=n.logarithmicDepthBuffer===!0,g=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&g===!1&&tt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const S=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),M=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=a.getParameter(a.MAX_TEXTURE_SIZE),v=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),y=a.getParameter(a.MAX_VERTEX_ATTRIBS),A=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),N=a.getParameter(a.MAX_VARYING_VECTORS),C=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),I=a.getParameter(a.MAX_SAMPLES),U=a.getParameter(a.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:u,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:x,reversedDepthBuffer:g,maxTextures:S,maxVertexTextures:M,maxTextureSize:E,maxCubemapSize:v,maxAttributes:y,maxVertexUniforms:A,maxVaryings:N,maxFragmentUniforms:C,maxSamples:I,samples:U}}function zR(a){const e=this;let n=null,s=0,l=!1,c=!1;const u=new gs,d=new ot,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(x,g){const S=x.length!==0||g||s!==0||l;return l=g,s=x.length,S},this.beginShadows=function(){c=!0,_(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(x,g){n=_(x,g,0)},this.setState=function(x,g,S){const M=x.clippingPlanes,E=x.clipIntersection,v=x.clipShadows,y=a.get(x);if(!l||M===null||M.length===0||c&&!v)c?_(null):p();else{const A=c?0:s,N=A*4;let C=y.clippingState||null;m.value=C,C=_(M,g,N,S);for(let I=0;I!==N;++I)C[I]=n[I];y.clippingState=C,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=A}};function p(){m.value!==n&&(m.value=n,m.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function _(x,g,S,M){const E=x!==null?x.length:0;let v=null;if(E!==0){if(v=m.value,M!==!0||v===null){const y=S+E*4,A=g.matrixWorldInverse;d.getNormalMatrix(A),(v===null||v.length<y)&&(v=new Float32Array(y));for(let N=0,C=S;N!==E;++N,C+=4)u.copy(x[N]).applyMatrix4(A,d),u.normal.toArray(v,C),v[C+3]=u.constant}m.value=v,m.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,v}}const ys=4,Bv=[.125,.215,.35,.446,.526,.582],$s=20,IR=256,Cl=new Om,Hv=new dt;let np=null,ip=0,ap=0,sp=!1;const FR=new Q;class Gv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,s=.1,l=100,c={}){const{size:u=256,position:d=FR}=c;np=this._renderer.getRenderTarget(),ip=this._renderer.getActiveCubeFace(),ap=this._renderer.getActiveMipmapLevel(),sp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(u);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,s,l,m,d),n>0&&this._blur(m,0,0,n),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=jv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(np,ip,ap),this._renderer.xr.enabled=sp,e.scissorTest=!1,co(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===nr||e.mapping===yo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),np=this._renderer.getRenderTarget(),ip=this._renderer.getActiveCubeFace(),ap=this._renderer.getActiveMipmapLevel(),sp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=n||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,s={magFilter:Cn,minFilter:Cn,generateMipmaps:!1,type:La,format:Bi,colorSpace:Qu,depthBuffer:!1},l=Vv(e,n,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vv(e,n,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=BR(c)),this._blurMaterial=GR(c,e,n),this._ggxMaterial=HR(c,e,n)}return l}_compileMaterial(e){const n=new aa(new ai,e);this._renderer.compile(n,Cl)}_sceneToCubeUV(e,n,s,l,c){const m=new Di(90,1,n,s),p=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],x=this._renderer,g=x.autoClear,S=x.toneMapping;x.getClearColor(Hv),x.toneMapping=ta,x.autoClear=!1,x.state.buffers.depth.getReversed()&&(x.setRenderTarget(l),x.clearDepth(),x.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new aa(new Eo,new gS({name:"PMREM.Background",side:ii,depthWrite:!1,depthTest:!1})));const E=this._backgroundBox,v=E.material;let y=!1;const A=e.background;A?A.isColor&&(v.color.copy(A),e.background=null,y=!0):(v.color.copy(Hv),y=!0);for(let N=0;N<6;N++){const C=N%3;C===0?(m.up.set(0,p[N],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+_[N],c.y,c.z)):C===1?(m.up.set(0,0,p[N]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+_[N],c.z)):(m.up.set(0,p[N],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+_[N]));const I=this._cubeSize;co(l,C*I,N>2?I:0,I,I),x.setRenderTarget(l),y&&x.render(E,m),x.render(e,m)}x.toneMapping=S,x.autoClear=g,e.background=A}_textureToCubeUV(e,n){const s=this._renderer,l=e.mapping===nr||e.mapping===yo;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=jv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kv());const c=l?this._cubemapMaterial:this._equirectMaterial,u=this._lodMeshes[0];u.material=c;const d=c.uniforms;d.envMap.value=e;const m=this._cubeSize;co(n,0,0,3*m,2*m),s.setRenderTarget(n),s.render(u,Cl)}_applyPMREM(e){const n=this._renderer,s=n.autoClear;n.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(e,c-1,c);n.autoClear=s}_applyGGXFilter(e,n,s){const l=this._renderer,c=this._pingPongRenderTarget,u=this._ggxMaterial,d=this._lodMeshes[s];d.material=u;const m=u.uniforms,p=s/(this._lodMeshes.length-1),_=n/(this._lodMeshes.length-1),x=Math.sqrt(p*p-_*_),g=0+p*1.25,S=x*g,{_lodMax:M}=this,E=this._sizeLods[s],v=3*E*(s>M-ys?s-M+ys:0),y=4*(this._cubeSize-E);m.envMap.value=e.texture,m.roughness.value=S,m.mipInt.value=M-n,co(c,v,y,3*E,2*E),l.setRenderTarget(c),l.render(d,Cl),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=M-s,co(e,v,y,3*E,2*E),l.setRenderTarget(e),l.render(d,Cl)}_blur(e,n,s,l,c){const u=this._pingPongRenderTarget;this._halfBlur(e,u,n,s,l,"latitudinal",c),this._halfBlur(u,e,s,s,l,"longitudinal",c)}_halfBlur(e,n,s,l,c,u,d){const m=this._renderer,p=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&At("blur direction must be either latitudinal or longitudinal!");const _=3,x=this._lodMeshes[l];x.material=p;const g=p.uniforms,S=this._sizeLods[s]-1,M=isFinite(c)?Math.PI/(2*S):2*Math.PI/(2*$s-1),E=c/M,v=isFinite(c)?1+Math.floor(_*E):$s;v>$s&&tt(`sigmaRadians, ${c}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${$s}`);const y=[];let A=0;for(let z=0;z<$s;++z){const T=z/E,F=Math.exp(-T*T/2);y.push(F),z===0?A+=F:z<v&&(A+=2*F)}for(let z=0;z<y.length;z++)y[z]=y[z]/A;g.envMap.value=e.texture,g.samples.value=v,g.weights.value=y,g.latitudinal.value=u==="latitudinal",d&&(g.poleAxis.value=d);const{_lodMax:N}=this;g.dTheta.value=M,g.mipInt.value=N-s;const C=this._sizeLods[l],I=3*C*(l>N-ys?l-N+ys:0),U=4*(this._cubeSize-C);co(n,I,U,3*C,2*C),m.setRenderTarget(n),m.render(x,Cl)}}function BR(a){const e=[],n=[],s=[];let l=a;const c=a-ys+1+Bv.length;for(let u=0;u<c;u++){const d=Math.pow(2,l);e.push(d);let m=1/d;u>a-ys?m=Bv[u-a+ys-1]:u===0&&(m=0),n.push(m);const p=1/(d-2),_=-p,x=1+p,g=[_,_,x,_,x,x,_,_,x,x,_,x],S=6,M=6,E=3,v=2,y=1,A=new Float32Array(E*M*S),N=new Float32Array(v*M*S),C=new Float32Array(y*M*S);for(let U=0;U<S;U++){const z=U%3*2/3-1,T=U>2?0:-1,F=[z,T,0,z+2/3,T,0,z+2/3,T+1,0,z,T,0,z+2/3,T+1,0,z,T+1,0];A.set(F,E*M*U),N.set(g,v*M*U);const X=[U,U,U,U,U,U];C.set(X,y*M*U)}const I=new ai;I.setAttribute("position",new Hi(A,E)),I.setAttribute("uv",new Hi(N,v)),I.setAttribute("faceIndex",new Hi(C,y)),s.push(new aa(I,null)),l>ys&&l--}return{lodMeshes:s,sizeLods:e,sigmas:n}}function Vv(a,e,n){const s=new na(a,e,n);return s.texture.mapping=uf,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function co(a,e,n,s,l){a.viewport.set(e,n,s,l),a.scissor.set(e,n,s,l)}function HR(a,e,n){return new sa({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:IR,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:hf(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Da,depthTest:!1,depthWrite:!1})}function GR(a,e,n){const s=new Float32Array($s),l=new Q(0,1,0);return new sa({name:"SphericalGaussianBlur",defines:{n:$s,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:hf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Da,depthTest:!1,depthWrite:!1})}function kv(){return new sa({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:hf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Da,depthTest:!1,depthWrite:!1})}function jv(){return new sa({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Da,depthTest:!1,depthWrite:!1})}function hf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class ES extends na{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new _S(l),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new Eo(5,5,5),c=new sa({name:"CubemapFromEquirect",uniforms:bo(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:ii,blending:Da});c.uniforms.tEquirect.value=n;const u=new aa(l,c),d=n.minFilter;return n.minFilter===er&&(n.minFilter=Cn),new XA(1,10,this).update(e,u),n.minFilter=d,u.geometry.dispose(),u.material.dispose(),this}clear(e,n=!0,s=!0,l=!0){const c=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(n,s,l);e.setRenderTarget(c)}}function VR(a){let e=new WeakMap,n=new WeakMap,s=null;function l(g,S=!1){return g==null?null:S?u(g):c(g)}function c(g){if(g&&g.isTexture){const S=g.mapping;if(S===Ad||S===wd)if(e.has(g)){const M=e.get(g).texture;return d(M,g.mapping)}else{const M=g.image;if(M&&M.height>0){const E=new ES(M.height);return E.fromEquirectangularTexture(a,g),e.set(g,E),g.addEventListener("dispose",p),d(E.texture,g.mapping)}else return null}}return g}function u(g){if(g&&g.isTexture){const S=g.mapping,M=S===Ad||S===wd,E=S===nr||S===yo;if(M||E){let v=n.get(g);const y=v!==void 0?v.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==y)return s===null&&(s=new Gv(a)),v=M?s.fromEquirectangular(g,v):s.fromCubemap(g,v),v.texture.pmremVersion=g.pmremVersion,n.set(g,v),v.texture;if(v!==void 0)return v.texture;{const A=g.image;return M&&A&&A.height>0||E&&A&&m(A)?(s===null&&(s=new Gv(a)),v=M?s.fromEquirectangular(g):s.fromCubemap(g),v.texture.pmremVersion=g.pmremVersion,n.set(g,v),g.addEventListener("dispose",_),v.texture):null}}}return g}function d(g,S){return S===Ad?g.mapping=nr:S===wd&&(g.mapping=yo),g}function m(g){let S=0;const M=6;for(let E=0;E<M;E++)g[E]!==void 0&&S++;return S===M}function p(g){const S=g.target;S.removeEventListener("dispose",p);const M=e.get(S);M!==void 0&&(e.delete(S),M.dispose())}function _(g){const S=g.target;S.removeEventListener("dispose",_);const M=n.get(S);M!==void 0&&(n.delete(S),M.dispose())}function x(){e=new WeakMap,n=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:x}}function kR(a){const e={};function n(s){if(e[s]!==void 0)return e[s];const l=a.getExtension(s);return e[s]=l,l}return{has:function(s){return n(s)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(s){const l=n(s);return l===null&&rm("WebGLRenderer: "+s+" extension not supported."),l}}}function jR(a,e,n,s){const l={},c=new WeakMap;function u(x){const g=x.target;g.index!==null&&e.remove(g.index);for(const M in g.attributes)e.remove(g.attributes[M]);g.removeEventListener("dispose",u),delete l[g.id];const S=c.get(g);S&&(e.remove(S),c.delete(g)),s.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,n.memory.geometries--}function d(x,g){return l[g.id]===!0||(g.addEventListener("dispose",u),l[g.id]=!0,n.memory.geometries++),g}function m(x){const g=x.attributes;for(const S in g)e.update(g[S],a.ARRAY_BUFFER)}function p(x){const g=[],S=x.index,M=x.attributes.position;let E=0;if(M===void 0)return;if(S!==null){const A=S.array;E=S.version;for(let N=0,C=A.length;N<C;N+=3){const I=A[N+0],U=A[N+1],z=A[N+2];g.push(I,U,U,z,z,I)}}else{const A=M.array;E=M.version;for(let N=0,C=A.length/3-1;N<C;N+=3){const I=N+0,U=N+1,z=N+2;g.push(I,U,U,z,z,I)}}const v=new(M.count>=65535?dS:hS)(g,1);v.version=E;const y=c.get(x);y&&e.remove(y),c.set(x,v)}function _(x){const g=c.get(x);if(g){const S=x.index;S!==null&&g.version<S.version&&p(x)}else p(x);return c.get(x)}return{get:d,update:m,getWireframeAttribute:_}}function XR(a,e,n){let s;function l(x){s=x}let c,u;function d(x){c=x.type,u=x.bytesPerElement}function m(x,g){a.drawElements(s,g,c,x*u),n.update(g,s,1)}function p(x,g,S){S!==0&&(a.drawElementsInstanced(s,g,c,x*u,S),n.update(g,s,S))}function _(x,g,S){if(S===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,g,0,c,x,0,S);let E=0;for(let v=0;v<S;v++)E+=g[v];n.update(E,s,1)}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=_}function WR(a){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,u,d){switch(n.calls++,u){case a.TRIANGLES:n.triangles+=d*(c/3);break;case a.LINES:n.lines+=d*(c/2);break;case a.LINE_STRIP:n.lines+=d*(c-1);break;case a.LINE_LOOP:n.lines+=d*c;break;case a.POINTS:n.points+=d*c;break;default:At("WebGLInfo: Unknown draw mode:",u);break}}function l(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:l,update:s}}function qR(a,e,n){const s=new WeakMap,l=new un;function c(u,d,m){const p=u.morphTargetInfluences,_=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,x=_!==void 0?_.length:0;let g=s.get(d);if(g===void 0||g.count!==x){let X=function(){T.dispose(),s.delete(d),d.removeEventListener("dispose",X)};var S=X;g!==void 0&&g.texture.dispose();const M=d.morphAttributes.position!==void 0,E=d.morphAttributes.normal!==void 0,v=d.morphAttributes.color!==void 0,y=d.morphAttributes.position||[],A=d.morphAttributes.normal||[],N=d.morphAttributes.color||[];let C=0;M===!0&&(C=1),E===!0&&(C=2),v===!0&&(C=3);let I=d.attributes.position.count*C,U=1;I>e.maxTextureSize&&(U=Math.ceil(I/e.maxTextureSize),I=e.maxTextureSize);const z=new Float32Array(I*U*4*x),T=new cS(z,I,U,x);T.type=Ji,T.needsUpdate=!0;const F=C*4;for(let B=0;B<x;B++){const j=y[B],ie=A[B],ae=N[B],V=I*U*4*B;for(let O=0;O<j.count;O++){const G=O*F;M===!0&&(l.fromBufferAttribute(j,O),z[V+G+0]=l.x,z[V+G+1]=l.y,z[V+G+2]=l.z,z[V+G+3]=0),E===!0&&(l.fromBufferAttribute(ie,O),z[V+G+4]=l.x,z[V+G+5]=l.y,z[V+G+6]=l.z,z[V+G+7]=0),v===!0&&(l.fromBufferAttribute(ae,O),z[V+G+8]=l.x,z[V+G+9]=l.y,z[V+G+10]=l.z,z[V+G+11]=ae.itemSize===4?l.w:1)}}g={count:x,texture:T,size:new nt(I,U)},s.set(d,g),d.addEventListener("dispose",X)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)m.getUniforms().setValue(a,"morphTexture",u.morphTexture,n);else{let M=0;for(let v=0;v<p.length;v++)M+=p[v];const E=d.morphTargetsRelative?1:1-M;m.getUniforms().setValue(a,"morphTargetBaseInfluence",E),m.getUniforms().setValue(a,"morphTargetInfluences",p)}m.getUniforms().setValue(a,"morphTargetsTexture",g.texture,n),m.getUniforms().setValue(a,"morphTargetsTextureSize",g.size)}return{update:c}}function YR(a,e,n,s,l){let c=new WeakMap;function u(p){const _=l.render.frame,x=p.geometry,g=e.get(p,x);if(c.get(g)!==_&&(e.update(g),c.set(g,_)),p.isInstancedMesh&&(p.hasEventListener("dispose",m)===!1&&p.addEventListener("dispose",m),c.get(p)!==_&&(n.update(p.instanceMatrix,a.ARRAY_BUFFER),p.instanceColor!==null&&n.update(p.instanceColor,a.ARRAY_BUFFER),c.set(p,_))),p.isSkinnedMesh){const S=p.skeleton;c.get(S)!==_&&(S.update(),c.set(S,_))}return g}function d(){c=new WeakMap}function m(p){const _=p.target;_.removeEventListener("dispose",m),s.releaseStatesOfObject(_),n.remove(_.instanceMatrix),_.instanceColor!==null&&n.remove(_.instanceColor)}return{update:u,dispose:d}}const ZR={[Yy]:"LINEAR_TONE_MAPPING",[Zy]:"REINHARD_TONE_MAPPING",[Ky]:"CINEON_TONE_MAPPING",[Sm]:"ACES_FILMIC_TONE_MAPPING",[Jy]:"AGX_TONE_MAPPING",[$y]:"NEUTRAL_TONE_MAPPING",[Qy]:"CUSTOM_TONE_MAPPING"};function KR(a,e,n,s,l){const c=new na(e,n,{type:a,depthBuffer:s,stencilBuffer:l,depthTexture:s?new So(e,n):void 0}),u=new na(e,n,{type:La,depthBuffer:!1,stencilBuffer:!1}),d=new ai;d.setAttribute("position",new Zn([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new Zn([0,2,0,0,2,0],2));const m=new BA({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),p=new aa(d,m),_=new Om(-1,1,1,-1,0,1);let x=null,g=null,S=!1,M,E=null,v=[],y=!1;this.setSize=function(A,N){c.setSize(A,N),u.setSize(A,N);for(let C=0;C<v.length;C++){const I=v[C];I.setSize&&I.setSize(A,N)}},this.setEffects=function(A){v=A,y=v.length>0&&v[0].isRenderPass===!0;const N=c.width,C=c.height;for(let I=0;I<v.length;I++){const U=v[I];U.setSize&&U.setSize(N,C)}},this.begin=function(A,N){if(S||A.toneMapping===ta&&v.length===0)return!1;if(E=N,N!==null){const C=N.width,I=N.height;(c.width!==C||c.height!==I)&&this.setSize(C,I)}return y===!1&&A.setRenderTarget(c),M=A.toneMapping,A.toneMapping=ta,!0},this.hasRenderPass=function(){return y},this.end=function(A,N){A.toneMapping=M,S=!0;let C=c,I=u;for(let U=0;U<v.length;U++){const z=v[U];if(z.enabled!==!1&&(z.render(A,I,C,N),z.needsSwap!==!1)){const T=C;C=I,I=T}}if(x!==A.outputColorSpace||g!==A.toneMapping){x=A.outputColorSpace,g=A.toneMapping,m.defines={},Tt.getTransfer(x)===Gt&&(m.defines.SRGB_TRANSFER="");const U=ZR[g];U&&(m.defines[U]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=C.texture,A.setRenderTarget(E),A.render(p,_),E=null,S=!1},this.isCompositing=function(){return S},this.dispose=function(){c.depthTexture&&c.depthTexture.dispose(),c.dispose(),u.dispose(),d.dispose(),m.dispose()}}const TS=new jn,cm=new So(1,1),AS=new cS,wS=new hA,RS=new _S,Xv=[],Wv=[],qv=new Float32Array(16),Yv=new Float32Array(9),Zv=new Float32Array(4);function To(a,e,n){const s=a[0];if(s<=0||s>0)return a;const l=e*n;let c=Xv[l];if(c===void 0&&(c=new Float32Array(l),Xv[l]=c),e!==0){s.toArray(c,0);for(let u=1,d=0;u!==e;++u)d+=n,a[u].toArray(c,d)}return c}function Tn(a,e){if(a.length!==e.length)return!1;for(let n=0,s=a.length;n<s;n++)if(a[n]!==e[n])return!1;return!0}function An(a,e){for(let n=0,s=e.length;n<s;n++)a[n]=e[n]}function df(a,e){let n=Wv[e];n===void 0&&(n=new Int32Array(e),Wv[e]=n);for(let s=0;s!==e;++s)n[s]=a.allocateTextureUnit();return n}function QR(a,e){const n=this.cache;n[0]!==e&&(a.uniform1f(this.addr,e),n[0]=e)}function JR(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(a.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Tn(n,e))return;a.uniform2fv(this.addr,e),An(n,e)}}function $R(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(a.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(a.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Tn(n,e))return;a.uniform3fv(this.addr,e),An(n,e)}}function eC(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(a.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Tn(n,e))return;a.uniform4fv(this.addr,e),An(n,e)}}function tC(a,e){const n=this.cache,s=e.elements;if(s===void 0){if(Tn(n,e))return;a.uniformMatrix2fv(this.addr,!1,e),An(n,e)}else{if(Tn(n,s))return;Zv.set(s),a.uniformMatrix2fv(this.addr,!1,Zv),An(n,s)}}function nC(a,e){const n=this.cache,s=e.elements;if(s===void 0){if(Tn(n,e))return;a.uniformMatrix3fv(this.addr,!1,e),An(n,e)}else{if(Tn(n,s))return;Yv.set(s),a.uniformMatrix3fv(this.addr,!1,Yv),An(n,s)}}function iC(a,e){const n=this.cache,s=e.elements;if(s===void 0){if(Tn(n,e))return;a.uniformMatrix4fv(this.addr,!1,e),An(n,e)}else{if(Tn(n,s))return;qv.set(s),a.uniformMatrix4fv(this.addr,!1,qv),An(n,s)}}function aC(a,e){const n=this.cache;n[0]!==e&&(a.uniform1i(this.addr,e),n[0]=e)}function sC(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(a.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Tn(n,e))return;a.uniform2iv(this.addr,e),An(n,e)}}function rC(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(a.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Tn(n,e))return;a.uniform3iv(this.addr,e),An(n,e)}}function oC(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(a.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Tn(n,e))return;a.uniform4iv(this.addr,e),An(n,e)}}function lC(a,e){const n=this.cache;n[0]!==e&&(a.uniform1ui(this.addr,e),n[0]=e)}function cC(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(a.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Tn(n,e))return;a.uniform2uiv(this.addr,e),An(n,e)}}function uC(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(a.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Tn(n,e))return;a.uniform3uiv(this.addr,e),An(n,e)}}function fC(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(a.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Tn(n,e))return;a.uniform4uiv(this.addr,e),An(n,e)}}function hC(a,e,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(a.uniform1i(this.addr,l),s[0]=l);let c;this.type===a.SAMPLER_2D_SHADOW?(cm.compareFunction=n.isReversedDepthBuffer()?Cm:Rm,c=cm):c=TS,n.setTexture2D(e||c,l)}function dC(a,e,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(a.uniform1i(this.addr,l),s[0]=l),n.setTexture3D(e||wS,l)}function pC(a,e,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(a.uniform1i(this.addr,l),s[0]=l),n.setTextureCube(e||RS,l)}function mC(a,e,n){const s=this.cache,l=n.allocateTextureUnit();s[0]!==l&&(a.uniform1i(this.addr,l),s[0]=l),n.setTexture2DArray(e||AS,l)}function gC(a){switch(a){case 5126:return QR;case 35664:return JR;case 35665:return $R;case 35666:return eC;case 35674:return tC;case 35675:return nC;case 35676:return iC;case 5124:case 35670:return aC;case 35667:case 35671:return sC;case 35668:case 35672:return rC;case 35669:case 35673:return oC;case 5125:return lC;case 36294:return cC;case 36295:return uC;case 36296:return fC;case 35678:case 36198:case 36298:case 36306:case 35682:return hC;case 35679:case 36299:case 36307:return dC;case 35680:case 36300:case 36308:case 36293:return pC;case 36289:case 36303:case 36311:case 36292:return mC}}function _C(a,e){a.uniform1fv(this.addr,e)}function xC(a,e){const n=To(e,this.size,2);a.uniform2fv(this.addr,n)}function vC(a,e){const n=To(e,this.size,3);a.uniform3fv(this.addr,n)}function yC(a,e){const n=To(e,this.size,4);a.uniform4fv(this.addr,n)}function SC(a,e){const n=To(e,this.size,4);a.uniformMatrix2fv(this.addr,!1,n)}function bC(a,e){const n=To(e,this.size,9);a.uniformMatrix3fv(this.addr,!1,n)}function MC(a,e){const n=To(e,this.size,16);a.uniformMatrix4fv(this.addr,!1,n)}function EC(a,e){a.uniform1iv(this.addr,e)}function TC(a,e){a.uniform2iv(this.addr,e)}function AC(a,e){a.uniform3iv(this.addr,e)}function wC(a,e){a.uniform4iv(this.addr,e)}function RC(a,e){a.uniform1uiv(this.addr,e)}function CC(a,e){a.uniform2uiv(this.addr,e)}function DC(a,e){a.uniform3uiv(this.addr,e)}function NC(a,e){a.uniform4uiv(this.addr,e)}function LC(a,e,n){const s=this.cache,l=e.length,c=df(n,l);Tn(s,c)||(a.uniform1iv(this.addr,c),An(s,c));let u;this.type===a.SAMPLER_2D_SHADOW?u=cm:u=TS;for(let d=0;d!==l;++d)n.setTexture2D(e[d]||u,c[d])}function UC(a,e,n){const s=this.cache,l=e.length,c=df(n,l);Tn(s,c)||(a.uniform1iv(this.addr,c),An(s,c));for(let u=0;u!==l;++u)n.setTexture3D(e[u]||wS,c[u])}function OC(a,e,n){const s=this.cache,l=e.length,c=df(n,l);Tn(s,c)||(a.uniform1iv(this.addr,c),An(s,c));for(let u=0;u!==l;++u)n.setTextureCube(e[u]||RS,c[u])}function PC(a,e,n){const s=this.cache,l=e.length,c=df(n,l);Tn(s,c)||(a.uniform1iv(this.addr,c),An(s,c));for(let u=0;u!==l;++u)n.setTexture2DArray(e[u]||AS,c[u])}function zC(a){switch(a){case 5126:return _C;case 35664:return xC;case 35665:return vC;case 35666:return yC;case 35674:return SC;case 35675:return bC;case 35676:return MC;case 5124:case 35670:return EC;case 35667:case 35671:return TC;case 35668:case 35672:return AC;case 35669:case 35673:return wC;case 5125:return RC;case 36294:return CC;case 36295:return DC;case 36296:return NC;case 35678:case 36198:case 36298:case 36306:case 35682:return LC;case 35679:case 36299:case 36307:return UC;case 35680:case 36300:case 36308:case 36293:return OC;case 36289:case 36303:case 36311:case 36292:return PC}}class IC{constructor(e,n,s){this.id=e,this.addr=s,this.cache=[],this.type=n.type,this.setValue=gC(n.type)}}class FC{constructor(e,n,s){this.id=e,this.addr=s,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=zC(n.type)}}class BC{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,s){const l=this.seq;for(let c=0,u=l.length;c!==u;++c){const d=l[c];d.setValue(e,n[d.id],s)}}}const rp=/(\w+)(\])?(\[|\.)?/g;function Kv(a,e){a.seq.push(e),a.map[e.id]=e}function HC(a,e,n){const s=a.name,l=s.length;for(rp.lastIndex=0;;){const c=rp.exec(s),u=rp.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&u+2===l){Kv(n,p===void 0?new IC(d,a,e):new FC(d,a,e));break}else{let x=n.map[d];x===void 0&&(x=new BC(d),Kv(n,x)),n=x}}}class Xu{constructor(e,n){this.seq=[],this.map={};const s=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let u=0;u<s;++u){const d=e.getActiveUniform(n,u),m=e.getUniformLocation(n,d.name);HC(d,m,this)}const l=[],c=[];for(const u of this.seq)u.type===e.SAMPLER_2D_SHADOW||u.type===e.SAMPLER_CUBE_SHADOW||u.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(u):c.push(u);l.length>0&&(this.seq=l.concat(c))}setValue(e,n,s,l){const c=this.map[n];c!==void 0&&c.setValue(e,s,l)}setOptional(e,n,s){const l=n[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,n,s,l){for(let c=0,u=n.length;c!==u;++c){const d=n[c],m=s[d.id];m.needsUpdate!==!1&&d.setValue(e,m.value,l)}}static seqWithValue(e,n){const s=[];for(let l=0,c=e.length;l!==c;++l){const u=e[l];u.id in n&&s.push(u)}return s}}function Qv(a,e,n){const s=a.createShader(e);return a.shaderSource(s,n),a.compileShader(s),s}const GC=37297;let VC=0;function kC(a,e){const n=a.split(`
`),s=[],l=Math.max(e-6,0),c=Math.min(e+6,n.length);for(let u=l;u<c;u++){const d=u+1;s.push(`${d===e?">":" "} ${d}: ${n[u]}`)}return s.join(`
`)}const Jv=new ot;function jC(a){Tt._getMatrix(Jv,Tt.workingColorSpace,a);const e=`mat3( ${Jv.elements.map(n=>n.toFixed(4))} )`;switch(Tt.getTransfer(a)){case Ju:return[e,"LinearTransferOETF"];case Gt:return[e,"sRGBTransferOETF"];default:return tt("WebGLProgram: Unsupported color space: ",a),[e,"LinearTransferOETF"]}}function $v(a,e,n){const s=a.getShaderParameter(e,a.COMPILE_STATUS),c=(a.getShaderInfoLog(e)||"").trim();if(s&&c==="")return"";const u=/ERROR: 0:(\d+)/.exec(c);if(u){const d=parseInt(u[1]);return n.toUpperCase()+`

`+c+`

`+kC(a.getShaderSource(e),d)}else return c}function XC(a,e){const n=jC(e);return[`vec4 ${a}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const WC={[Yy]:"Linear",[Zy]:"Reinhard",[Ky]:"Cineon",[Sm]:"ACESFilmic",[Jy]:"AgX",[$y]:"Neutral",[Qy]:"Custom"};function qC(a,e){const n=WC[e];return n===void 0?(tt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+a+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+a+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Pu=new Q;function YC(){Tt.getLuminanceCoefficients(Pu);const a=Pu.x.toFixed(4),e=Pu.y.toFixed(4),n=Pu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${a}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ZC(a){return[a.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",a.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ol).join(`
`)}function KC(a){const e=[];for(const n in a){const s=a[n];s!==!1&&e.push("#define "+n+" "+s)}return e.join(`
`)}function QC(a,e){const n={},s=a.getProgramParameter(e,a.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=a.getActiveAttrib(e,l),u=c.name;let d=1;c.type===a.FLOAT_MAT2&&(d=2),c.type===a.FLOAT_MAT3&&(d=3),c.type===a.FLOAT_MAT4&&(d=4),n[u]={type:c.type,location:a.getAttribLocation(e,u),locationSize:d}}return n}function Ol(a){return a!==""}function ey(a,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ty(a,e){return a.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const JC=/^[ \t]*#include +<([\w\d./]+)>/gm;function um(a){return a.replace(JC,e3)}const $C=new Map;function e3(a,e){let n=pt[e];if(n===void 0){const s=$C.get(e);if(s!==void 0)n=pt[s],tt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return um(n)}const t3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ny(a){return a.replace(t3,n3)}function n3(a,e,n,s){let l="";for(let c=parseInt(e);c<parseInt(n);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function iy(a){let e=`precision ${a.precision} float;
	precision ${a.precision} int;
	precision ${a.precision} sampler2D;
	precision ${a.precision} samplerCube;
	precision ${a.precision} sampler3D;
	precision ${a.precision} sampler2DArray;
	precision ${a.precision} sampler2DShadow;
	precision ${a.precision} samplerCubeShadow;
	precision ${a.precision} sampler2DArrayShadow;
	precision ${a.precision} isampler2D;
	precision ${a.precision} isampler3D;
	precision ${a.precision} isamplerCube;
	precision ${a.precision} isampler2DArray;
	precision ${a.precision} usampler2D;
	precision ${a.precision} usampler3D;
	precision ${a.precision} usamplerCube;
	precision ${a.precision} usampler2DArray;
	`;return a.precision==="highp"?e+=`
#define HIGH_PRECISION`:a.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:a.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const i3={[Hu]:"SHADOWMAP_TYPE_PCF",[Ll]:"SHADOWMAP_TYPE_VSM"};function a3(a){return i3[a.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const s3={[nr]:"ENVMAP_TYPE_CUBE",[yo]:"ENVMAP_TYPE_CUBE",[uf]:"ENVMAP_TYPE_CUBE_UV"};function r3(a){return a.envMap===!1?"ENVMAP_TYPE_CUBE":s3[a.envMapMode]||"ENVMAP_TYPE_CUBE"}const o3={[yo]:"ENVMAP_MODE_REFRACTION"};function l3(a){return a.envMap===!1?"ENVMAP_MODE_REFLECTION":o3[a.envMapMode]||"ENVMAP_MODE_REFLECTION"}const c3={[qy]:"ENVMAP_BLENDING_MULTIPLY",[jT]:"ENVMAP_BLENDING_MIX",[XT]:"ENVMAP_BLENDING_ADD"};function u3(a){return a.envMap===!1?"ENVMAP_BLENDING_NONE":c3[a.combine]||"ENVMAP_BLENDING_NONE"}function f3(a){const e=a.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:s,maxMip:n}}function h3(a,e,n,s){const l=a.getContext(),c=n.defines;let u=n.vertexShader,d=n.fragmentShader;const m=a3(n),p=r3(n),_=l3(n),x=u3(n),g=f3(n),S=ZC(n),M=KC(c),E=l.createProgram();let v,y,A=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(v=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,M].filter(Ol).join(`
`),v.length>0&&(v+=`
`),y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,M].filter(Ol).join(`
`),y.length>0&&(y+=`
`)):(v=[iy(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,M,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+_:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ol).join(`
`),y=[iy(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,M,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+_:"",n.envMap?"#define "+x:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ta?"#define TONE_MAPPING":"",n.toneMapping!==ta?pt.tonemapping_pars_fragment:"",n.toneMapping!==ta?qC("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,XC("linearToOutputTexel",n.outputColorSpace),YC(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ol).join(`
`)),u=um(u),u=ey(u,n),u=ty(u,n),d=um(d),d=ey(d,n),d=ty(d,n),u=ny(u),d=ny(d),n.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,v=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,y=["#define varying in",n.glslVersion===sv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===sv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const N=A+v+u,C=A+y+d,I=Qv(l,l.VERTEX_SHADER,N),U=Qv(l,l.FRAGMENT_SHADER,C);l.attachShader(E,I),l.attachShader(E,U),n.index0AttributeName!==void 0?l.bindAttribLocation(E,0,n.index0AttributeName):n.morphTargets===!0&&l.bindAttribLocation(E,0,"position"),l.linkProgram(E);function z(B){if(a.debug.checkShaderErrors){const j=l.getProgramInfoLog(E)||"",ie=l.getShaderInfoLog(I)||"",ae=l.getShaderInfoLog(U)||"",V=j.trim(),O=ie.trim(),G=ae.trim();let $=!0,he=!0;if(l.getProgramParameter(E,l.LINK_STATUS)===!1)if($=!1,typeof a.debug.onShaderError=="function")a.debug.onShaderError(l,E,I,U);else{const ge=$v(l,I,"vertex"),H=$v(l,U,"fragment");At("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(E,l.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+V+`
`+ge+`
`+H)}else V!==""?tt("WebGLProgram: Program Info Log:",V):(O===""||G==="")&&(he=!1);he&&(B.diagnostics={runnable:$,programLog:V,vertexShader:{log:O,prefix:v},fragmentShader:{log:G,prefix:y}})}l.deleteShader(I),l.deleteShader(U),T=new Xu(l,E),F=QC(l,E)}let T;this.getUniforms=function(){return T===void 0&&z(this),T};let F;this.getAttributes=function(){return F===void 0&&z(this),F};let X=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return X===!1&&(X=l.getProgramParameter(E,GC)),X},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(E),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=VC++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=I,this.fragmentShader=U,this}let d3=0;class p3{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,s=e.fragmentShader,l=this._getShaderStage(n),c=this._getShaderStage(s),u=this._getShaderCacheForMaterial(e);return u.has(l)===!1&&(u.add(l),l.usedTimes++),u.has(c)===!1&&(u.add(c),c.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const s of n)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let s=n.get(e);return s===void 0&&(s=new Set,n.set(e,s)),s}_getShaderStage(e){const n=this.shaderCache;let s=n.get(e);return s===void 0&&(s=new m3(e),n.set(e,s)),s}}class m3{constructor(e){this.id=d3++,this.code=e,this.usedTimes=0}}function g3(a){return a===ir||a===Zu||a===Ku}function _3(a,e,n,s,l,c){const u=new uS,d=new p3,m=new Set,p=[],_=new Map,x=s.logarithmicDepthBuffer;let g=s.precision;const S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(T){return m.add(T),T===0?"uv":`uv${T}`}function E(T,F,X,B,j,ie){const ae=B.fog,V=j.geometry,O=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?B.environment:null,G=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,$=e.get(T.envMap||O,G),he=$&&$.mapping===uf?$.image.height:null,ge=S[T.type];T.precision!==null&&(g=s.getMaxPrecision(T.precision),g!==T.precision&&tt("WebGLProgram.getParameters:",T.precision,"not supported, using",g,"instead."));const H=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,K=H!==void 0?H.length:0;let ye=0;V.morphAttributes.position!==void 0&&(ye=1),V.morphAttributes.normal!==void 0&&(ye=2),V.morphAttributes.color!==void 0&&(ye=3);let ee,Ee,te,se;if(ge){const it=Zi[ge];ee=it.vertexShader,Ee=it.fragmentShader}else ee=T.vertexShader,Ee=T.fragmentShader,d.update(T),te=d.getVertexShaderID(T),se=d.getFragmentShaderID(T);const me=a.getRenderTarget(),Ae=a.state.buffers.depth.getReversed(),Ke=j.isInstancedMesh===!0,Ye=j.isBatchedMesh===!0,Dt=!!T.map,ut=!!T.matcap,mt=!!$,Pt=!!T.aoMap,ft=!!T.lightMap,fn=!!T.bumpMap,Qt=!!T.normalMap,Nn=!!T.displacementMap,Y=!!T.emissiveMap,sn=!!T.metalnessMap,gt=!!T.roughnessMap,Vt=T.anisotropy>0,De=T.clearcoat>0,en=T.dispersion>0,P=T.iridescence>0,w=T.sheen>0,ne=T.transmission>0,Me=Vt&&!!T.anisotropyMap,Re=De&&!!T.clearcoatMap,Ne=De&&!!T.clearcoatNormalMap,Pe=De&&!!T.clearcoatRoughnessMap,_e=P&&!!T.iridescenceMap,xe=P&&!!T.iridescenceThicknessMap,ze=w&&!!T.sheenColorMap,Ie=w&&!!T.sheenRoughnessMap,Ue=!!T.specularMap,Le=!!T.specularColorMap,at=!!T.specularIntensityMap,st=ne&&!!T.transmissionMap,_t=ne&&!!T.thicknessMap,W=!!T.gradientMap,Ce=!!T.alphaMap,Se=T.alphaTest>0,He=!!T.alphaHash,Oe=!!T.extensions;let we=ta;T.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(we=a.toneMapping);const qe={shaderID:ge,shaderType:T.type,shaderName:T.name,vertexShader:ee,fragmentShader:Ee,defines:T.defines,customVertexShaderID:te,customFragmentShaderID:se,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:g,batching:Ye,batchingColor:Ye&&j._colorsTexture!==null,instancing:Ke,instancingColor:Ke&&j.instanceColor!==null,instancingMorph:Ke&&j.morphTexture!==null,outputColorSpace:me===null?a.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:Tt.workingColorSpace,alphaToCoverage:!!T.alphaToCoverage,map:Dt,matcap:ut,envMap:mt,envMapMode:mt&&$.mapping,envMapCubeUVHeight:he,aoMap:Pt,lightMap:ft,bumpMap:fn,normalMap:Qt,displacementMap:Nn,emissiveMap:Y,normalMapObjectSpace:Qt&&T.normalMapType===YT,normalMapTangentSpace:Qt&&T.normalMapType===am,packedNormalMap:Qt&&T.normalMapType===am&&g3(T.normalMap.format),metalnessMap:sn,roughnessMap:gt,anisotropy:Vt,anisotropyMap:Me,clearcoat:De,clearcoatMap:Re,clearcoatNormalMap:Ne,clearcoatRoughnessMap:Pe,dispersion:en,iridescence:P,iridescenceMap:_e,iridescenceThicknessMap:xe,sheen:w,sheenColorMap:ze,sheenRoughnessMap:Ie,specularMap:Ue,specularColorMap:Le,specularIntensityMap:at,transmission:ne,transmissionMap:st,thicknessMap:_t,gradientMap:W,opaque:T.transparent===!1&&T.blending===mo&&T.alphaToCoverage===!1,alphaMap:Ce,alphaTest:Se,alphaHash:He,combine:T.combine,mapUv:Dt&&M(T.map.channel),aoMapUv:Pt&&M(T.aoMap.channel),lightMapUv:ft&&M(T.lightMap.channel),bumpMapUv:fn&&M(T.bumpMap.channel),normalMapUv:Qt&&M(T.normalMap.channel),displacementMapUv:Nn&&M(T.displacementMap.channel),emissiveMapUv:Y&&M(T.emissiveMap.channel),metalnessMapUv:sn&&M(T.metalnessMap.channel),roughnessMapUv:gt&&M(T.roughnessMap.channel),anisotropyMapUv:Me&&M(T.anisotropyMap.channel),clearcoatMapUv:Re&&M(T.clearcoatMap.channel),clearcoatNormalMapUv:Ne&&M(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&M(T.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&M(T.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&M(T.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&M(T.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&M(T.sheenRoughnessMap.channel),specularMapUv:Ue&&M(T.specularMap.channel),specularColorMapUv:Le&&M(T.specularColorMap.channel),specularIntensityMapUv:at&&M(T.specularIntensityMap.channel),transmissionMapUv:st&&M(T.transmissionMap.channel),thicknessMapUv:_t&&M(T.thicknessMap.channel),alphaMapUv:Ce&&M(T.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Qt||Vt),vertexNormals:!!V.attributes.normal,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:j.isPoints===!0&&!!V.attributes.uv&&(Dt||Ce),fog:!!ae,useFog:T.fog===!0,fogExp2:!!ae&&ae.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||V.attributes.normal===void 0&&Qt===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:x,reversedDepthBuffer:Ae,skinning:j.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:ye,numDirLights:F.directional.length,numPointLights:F.point.length,numSpotLights:F.spot.length,numSpotLightMaps:F.spotLightMap.length,numRectAreaLights:F.rectArea.length,numHemiLights:F.hemi.length,numDirLightShadows:F.directionalShadowMap.length,numPointLightShadows:F.pointShadowMap.length,numSpotLightShadows:F.spotShadowMap.length,numSpotLightShadowsWithMaps:F.numSpotLightShadowsWithMaps,numLightProbes:F.numLightProbes,numLightProbeGrids:ie.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:T.dithering,shadowMapEnabled:a.shadowMap.enabled&&X.length>0,shadowMapType:a.shadowMap.type,toneMapping:we,decodeVideoTexture:Dt&&T.map.isVideoTexture===!0&&Tt.getTransfer(T.map.colorSpace)===Gt,decodeVideoTextureEmissive:Y&&T.emissiveMap.isVideoTexture===!0&&Tt.getTransfer(T.emissiveMap.colorSpace)===Gt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Ki,flipSided:T.side===ii,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Oe&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&T.extensions.multiDraw===!0||Ye)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return qe.vertexUv1s=m.has(1),qe.vertexUv2s=m.has(2),qe.vertexUv3s=m.has(3),m.clear(),qe}function v(T){const F=[];if(T.shaderID?F.push(T.shaderID):(F.push(T.customVertexShaderID),F.push(T.customFragmentShaderID)),T.defines!==void 0)for(const X in T.defines)F.push(X),F.push(T.defines[X]);return T.isRawShaderMaterial===!1&&(y(F,T),A(F,T),F.push(a.outputColorSpace)),F.push(T.customProgramCacheKey),F.join()}function y(T,F){T.push(F.precision),T.push(F.outputColorSpace),T.push(F.envMapMode),T.push(F.envMapCubeUVHeight),T.push(F.mapUv),T.push(F.alphaMapUv),T.push(F.lightMapUv),T.push(F.aoMapUv),T.push(F.bumpMapUv),T.push(F.normalMapUv),T.push(F.displacementMapUv),T.push(F.emissiveMapUv),T.push(F.metalnessMapUv),T.push(F.roughnessMapUv),T.push(F.anisotropyMapUv),T.push(F.clearcoatMapUv),T.push(F.clearcoatNormalMapUv),T.push(F.clearcoatRoughnessMapUv),T.push(F.iridescenceMapUv),T.push(F.iridescenceThicknessMapUv),T.push(F.sheenColorMapUv),T.push(F.sheenRoughnessMapUv),T.push(F.specularMapUv),T.push(F.specularColorMapUv),T.push(F.specularIntensityMapUv),T.push(F.transmissionMapUv),T.push(F.thicknessMapUv),T.push(F.combine),T.push(F.fogExp2),T.push(F.sizeAttenuation),T.push(F.morphTargetsCount),T.push(F.morphAttributeCount),T.push(F.numDirLights),T.push(F.numPointLights),T.push(F.numSpotLights),T.push(F.numSpotLightMaps),T.push(F.numHemiLights),T.push(F.numRectAreaLights),T.push(F.numDirLightShadows),T.push(F.numPointLightShadows),T.push(F.numSpotLightShadows),T.push(F.numSpotLightShadowsWithMaps),T.push(F.numLightProbes),T.push(F.shadowMapType),T.push(F.toneMapping),T.push(F.numClippingPlanes),T.push(F.numClipIntersection),T.push(F.depthPacking)}function A(T,F){u.disableAll(),F.instancing&&u.enable(0),F.instancingColor&&u.enable(1),F.instancingMorph&&u.enable(2),F.matcap&&u.enable(3),F.envMap&&u.enable(4),F.normalMapObjectSpace&&u.enable(5),F.normalMapTangentSpace&&u.enable(6),F.clearcoat&&u.enable(7),F.iridescence&&u.enable(8),F.alphaTest&&u.enable(9),F.vertexColors&&u.enable(10),F.vertexAlphas&&u.enable(11),F.vertexUv1s&&u.enable(12),F.vertexUv2s&&u.enable(13),F.vertexUv3s&&u.enable(14),F.vertexTangents&&u.enable(15),F.anisotropy&&u.enable(16),F.alphaHash&&u.enable(17),F.batching&&u.enable(18),F.dispersion&&u.enable(19),F.batchingColor&&u.enable(20),F.gradientMap&&u.enable(21),F.packedNormalMap&&u.enable(22),F.vertexNormals&&u.enable(23),T.push(u.mask),u.disableAll(),F.fog&&u.enable(0),F.useFog&&u.enable(1),F.flatShading&&u.enable(2),F.logarithmicDepthBuffer&&u.enable(3),F.reversedDepthBuffer&&u.enable(4),F.skinning&&u.enable(5),F.morphTargets&&u.enable(6),F.morphNormals&&u.enable(7),F.morphColors&&u.enable(8),F.premultipliedAlpha&&u.enable(9),F.shadowMapEnabled&&u.enable(10),F.doubleSided&&u.enable(11),F.flipSided&&u.enable(12),F.useDepthPacking&&u.enable(13),F.dithering&&u.enable(14),F.transmission&&u.enable(15),F.sheen&&u.enable(16),F.opaque&&u.enable(17),F.pointsUvs&&u.enable(18),F.decodeVideoTexture&&u.enable(19),F.decodeVideoTextureEmissive&&u.enable(20),F.alphaToCoverage&&u.enable(21),F.numLightProbeGrids>0&&u.enable(22),T.push(u.mask)}function N(T){const F=S[T.type];let X;if(F){const B=Zi[F];X=zA.clone(B.uniforms)}else X=T.uniforms;return X}function C(T,F){let X=_.get(F);return X!==void 0?++X.usedTimes:(X=new h3(a,F,T,l),p.push(X),_.set(F,X)),X}function I(T){if(--T.usedTimes===0){const F=p.indexOf(T);p[F]=p[p.length-1],p.pop(),_.delete(T.cacheKey),T.destroy()}}function U(T){d.remove(T)}function z(){d.dispose()}return{getParameters:E,getProgramCacheKey:v,getUniforms:N,acquireProgram:C,releaseProgram:I,releaseShaderCache:U,programs:p,dispose:z}}function x3(){let a=new WeakMap;function e(u){return a.has(u)}function n(u){let d=a.get(u);return d===void 0&&(d={},a.set(u,d)),d}function s(u){a.delete(u)}function l(u,d,m){a.get(u)[d]=m}function c(){a=new WeakMap}return{has:e,get:n,remove:s,update:l,dispose:c}}function v3(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.material.id!==e.material.id?a.material.id-e.material.id:a.materialVariant!==e.materialVariant?a.materialVariant-e.materialVariant:a.z!==e.z?a.z-e.z:a.id-e.id}function ay(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.z!==e.z?e.z-a.z:a.id-e.id}function sy(){const a=[];let e=0;const n=[],s=[],l=[];function c(){e=0,n.length=0,s.length=0,l.length=0}function u(g){let S=0;return g.isInstancedMesh&&(S+=2),g.isSkinnedMesh&&(S+=1),S}function d(g,S,M,E,v,y){let A=a[e];return A===void 0?(A={id:g.id,object:g,geometry:S,material:M,materialVariant:u(g),groupOrder:E,renderOrder:g.renderOrder,z:v,group:y},a[e]=A):(A.id=g.id,A.object=g,A.geometry=S,A.material=M,A.materialVariant=u(g),A.groupOrder=E,A.renderOrder=g.renderOrder,A.z=v,A.group=y),e++,A}function m(g,S,M,E,v,y){const A=d(g,S,M,E,v,y);M.transmission>0?s.push(A):M.transparent===!0?l.push(A):n.push(A)}function p(g,S,M,E,v,y){const A=d(g,S,M,E,v,y);M.transmission>0?s.unshift(A):M.transparent===!0?l.unshift(A):n.unshift(A)}function _(g,S){n.length>1&&n.sort(g||v3),s.length>1&&s.sort(S||ay),l.length>1&&l.sort(S||ay)}function x(){for(let g=e,S=a.length;g<S;g++){const M=a[g];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:n,transmissive:s,transparent:l,init:c,push:m,unshift:p,finish:x,sort:_}}function y3(){let a=new WeakMap;function e(s,l){const c=a.get(s);let u;return c===void 0?(u=new sy,a.set(s,[u])):l>=c.length?(u=new sy,c.push(u)):u=c[l],u}function n(){a=new WeakMap}return{get:e,dispose:n}}function S3(){const a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new Q,color:new dt};break;case"SpotLight":n={position:new Q,direction:new Q,color:new dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new Q,color:new dt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new Q,skyColor:new dt,groundColor:new dt};break;case"RectAreaLight":n={color:new dt,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return a[e.id]=n,n}}}function b3(){const a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[e.id]=n,n}}}let M3=0;function E3(a,e){return(e.castShadow?2:0)-(a.castShadow?2:0)+(e.map?1:0)-(a.map?1:0)}function T3(a){const e=new S3,n=b3(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new Q);const l=new Q,c=new on,u=new on;function d(p){let _=0,x=0,g=0;for(let F=0;F<9;F++)s.probe[F].set(0,0,0);let S=0,M=0,E=0,v=0,y=0,A=0,N=0,C=0,I=0,U=0,z=0;p.sort(E3);for(let F=0,X=p.length;F<X;F++){const B=p[F],j=B.color,ie=B.intensity,ae=B.distance;let V=null;if(B.shadow&&B.shadow.map&&(B.shadow.map.texture.format===ir?V=B.shadow.map.texture:V=B.shadow.map.depthTexture||B.shadow.map.texture),B.isAmbientLight)_+=j.r*ie,x+=j.g*ie,g+=j.b*ie;else if(B.isLightProbe){for(let O=0;O<9;O++)s.probe[O].addScaledVector(B.sh.coefficients[O],ie);z++}else if(B.isDirectionalLight){const O=e.get(B);if(O.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){const G=B.shadow,$=n.get(B);$.shadowIntensity=G.intensity,$.shadowBias=G.bias,$.shadowNormalBias=G.normalBias,$.shadowRadius=G.radius,$.shadowMapSize=G.mapSize,s.directionalShadow[S]=$,s.directionalShadowMap[S]=V,s.directionalShadowMatrix[S]=B.shadow.matrix,A++}s.directional[S]=O,S++}else if(B.isSpotLight){const O=e.get(B);O.position.setFromMatrixPosition(B.matrixWorld),O.color.copy(j).multiplyScalar(ie),O.distance=ae,O.coneCos=Math.cos(B.angle),O.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),O.decay=B.decay,s.spot[E]=O;const G=B.shadow;if(B.map&&(s.spotLightMap[I]=B.map,I++,G.updateMatrices(B),B.castShadow&&U++),s.spotLightMatrix[E]=G.matrix,B.castShadow){const $=n.get(B);$.shadowIntensity=G.intensity,$.shadowBias=G.bias,$.shadowNormalBias=G.normalBias,$.shadowRadius=G.radius,$.shadowMapSize=G.mapSize,s.spotShadow[E]=$,s.spotShadowMap[E]=V,C++}E++}else if(B.isRectAreaLight){const O=e.get(B);O.color.copy(j).multiplyScalar(ie),O.halfWidth.set(B.width*.5,0,0),O.halfHeight.set(0,B.height*.5,0),s.rectArea[v]=O,v++}else if(B.isPointLight){const O=e.get(B);if(O.color.copy(B.color).multiplyScalar(B.intensity),O.distance=B.distance,O.decay=B.decay,B.castShadow){const G=B.shadow,$=n.get(B);$.shadowIntensity=G.intensity,$.shadowBias=G.bias,$.shadowNormalBias=G.normalBias,$.shadowRadius=G.radius,$.shadowMapSize=G.mapSize,$.shadowCameraNear=G.camera.near,$.shadowCameraFar=G.camera.far,s.pointShadow[M]=$,s.pointShadowMap[M]=V,s.pointShadowMatrix[M]=B.shadow.matrix,N++}s.point[M]=O,M++}else if(B.isHemisphereLight){const O=e.get(B);O.skyColor.copy(B.color).multiplyScalar(ie),O.groundColor.copy(B.groundColor).multiplyScalar(ie),s.hemi[y]=O,y++}}v>0&&(a.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Ge.LTC_FLOAT_1,s.rectAreaLTC2=Ge.LTC_FLOAT_2):(s.rectAreaLTC1=Ge.LTC_HALF_1,s.rectAreaLTC2=Ge.LTC_HALF_2)),s.ambient[0]=_,s.ambient[1]=x,s.ambient[2]=g;const T=s.hash;(T.directionalLength!==S||T.pointLength!==M||T.spotLength!==E||T.rectAreaLength!==v||T.hemiLength!==y||T.numDirectionalShadows!==A||T.numPointShadows!==N||T.numSpotShadows!==C||T.numSpotMaps!==I||T.numLightProbes!==z)&&(s.directional.length=S,s.spot.length=E,s.rectArea.length=v,s.point.length=M,s.hemi.length=y,s.directionalShadow.length=A,s.directionalShadowMap.length=A,s.pointShadow.length=N,s.pointShadowMap.length=N,s.spotShadow.length=C,s.spotShadowMap.length=C,s.directionalShadowMatrix.length=A,s.pointShadowMatrix.length=N,s.spotLightMatrix.length=C+I-U,s.spotLightMap.length=I,s.numSpotLightShadowsWithMaps=U,s.numLightProbes=z,T.directionalLength=S,T.pointLength=M,T.spotLength=E,T.rectAreaLength=v,T.hemiLength=y,T.numDirectionalShadows=A,T.numPointShadows=N,T.numSpotShadows=C,T.numSpotMaps=I,T.numLightProbes=z,s.version=M3++)}function m(p,_){let x=0,g=0,S=0,M=0,E=0;const v=_.matrixWorldInverse;for(let y=0,A=p.length;y<A;y++){const N=p[y];if(N.isDirectionalLight){const C=s.directional[x];C.direction.setFromMatrixPosition(N.matrixWorld),l.setFromMatrixPosition(N.target.matrixWorld),C.direction.sub(l),C.direction.transformDirection(v),x++}else if(N.isSpotLight){const C=s.spot[S];C.position.setFromMatrixPosition(N.matrixWorld),C.position.applyMatrix4(v),C.direction.setFromMatrixPosition(N.matrixWorld),l.setFromMatrixPosition(N.target.matrixWorld),C.direction.sub(l),C.direction.transformDirection(v),S++}else if(N.isRectAreaLight){const C=s.rectArea[M];C.position.setFromMatrixPosition(N.matrixWorld),C.position.applyMatrix4(v),u.identity(),c.copy(N.matrixWorld),c.premultiply(v),u.extractRotation(c),C.halfWidth.set(N.width*.5,0,0),C.halfHeight.set(0,N.height*.5,0),C.halfWidth.applyMatrix4(u),C.halfHeight.applyMatrix4(u),M++}else if(N.isPointLight){const C=s.point[g];C.position.setFromMatrixPosition(N.matrixWorld),C.position.applyMatrix4(v),g++}else if(N.isHemisphereLight){const C=s.hemi[E];C.direction.setFromMatrixPosition(N.matrixWorld),C.direction.transformDirection(v),E++}}}return{setup:d,setupView:m,state:s}}function ry(a){const e=new T3(a),n=[],s=[],l=[];function c(g){x.camera=g,n.length=0,s.length=0,l.length=0}function u(g){n.push(g)}function d(g){s.push(g)}function m(g){l.push(g)}function p(){e.setup(n)}function _(g){e.setupView(n,g)}const x={lightsArray:n,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:x,setupLights:p,setupLightsView:_,pushLight:u,pushShadow:d,pushLightProbeGrid:m}}function A3(a){let e=new WeakMap;function n(l,c=0){const u=e.get(l);let d;return u===void 0?(d=new ry(a),e.set(l,[d])):c>=u.length?(d=new ry(a),u.push(d)):d=u[c],d}function s(){e=new WeakMap}return{get:n,dispose:s}}const w3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,R3=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,C3=[new Q(1,0,0),new Q(-1,0,0),new Q(0,1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1)],D3=[new Q(0,-1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1),new Q(0,-1,0),new Q(0,-1,0)],oy=new on,Dl=new Q,op=new Q;function N3(a,e,n){let s=new Um;const l=new nt,c=new nt,u=new un,d=new HA,m=new GA,p={},_=n.maxTextureSize,x={[Es]:ii,[ii]:Es,[Ki]:Ki},g=new sa({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:w3,fragmentShader:R3}),S=g.clone();S.defines.HORIZONTAL_PASS=1;const M=new ai;M.setAttribute("position",new Hi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new aa(M,g),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hu;let y=this.type;this.render=function(U,z,T){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||U.length===0)return;this.type===TT&&(tt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Hu);const F=a.getRenderTarget(),X=a.getActiveCubeFace(),B=a.getActiveMipmapLevel(),j=a.state;j.setBlending(Da),j.buffers.depth.getReversed()===!0?j.buffers.color.setClear(0,0,0,0):j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const ie=y!==this.type;ie&&z.traverse(function(ae){ae.material&&(Array.isArray(ae.material)?ae.material.forEach(V=>V.needsUpdate=!0):ae.material.needsUpdate=!0)});for(let ae=0,V=U.length;ae<V;ae++){const O=U[ae],G=O.shadow;if(G===void 0){tt("WebGLShadowMap:",O,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;l.copy(G.mapSize);const $=G.getFrameExtents();l.multiply($),c.copy(G.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(c.x=Math.floor(_/$.x),l.x=c.x*$.x,G.mapSize.x=c.x),l.y>_&&(c.y=Math.floor(_/$.y),l.y=c.y*$.y,G.mapSize.y=c.y));const he=a.state.buffers.depth.getReversed();if(G.camera._reversedDepth=he,G.map===null||ie===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Ll){if(O.isPointLight){tt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new na(l.x,l.y,{format:ir,type:La,minFilter:Cn,magFilter:Cn,generateMipmaps:!1}),G.map.texture.name=O.name+".shadowMap",G.map.depthTexture=new So(l.x,l.y,Ji),G.map.depthTexture.name=O.name+".shadowMapDepth",G.map.depthTexture.format=Ua,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=In,G.map.depthTexture.magFilter=In}else O.isPointLight?(G.map=new ES(l.x),G.map.depthTexture=new UA(l.x,ia)):(G.map=new na(l.x,l.y),G.map.depthTexture=new So(l.x,l.y,ia)),G.map.depthTexture.name=O.name+".shadowMap",G.map.depthTexture.format=Ua,this.type===Hu?(G.map.depthTexture.compareFunction=he?Cm:Rm,G.map.depthTexture.minFilter=Cn,G.map.depthTexture.magFilter=Cn):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=In,G.map.depthTexture.magFilter=In);G.camera.updateProjectionMatrix()}const ge=G.map.isWebGLCubeRenderTarget?6:1;for(let H=0;H<ge;H++){if(G.map.isWebGLCubeRenderTarget)a.setRenderTarget(G.map,H),a.clear();else{H===0&&(a.setRenderTarget(G.map),a.clear());const K=G.getViewport(H);u.set(c.x*K.x,c.y*K.y,c.x*K.z,c.y*K.w),j.viewport(u)}if(O.isPointLight){const K=G.camera,ye=G.matrix,ee=O.distance||K.far;ee!==K.far&&(K.far=ee,K.updateProjectionMatrix()),Dl.setFromMatrixPosition(O.matrixWorld),K.position.copy(Dl),op.copy(K.position),op.add(C3[H]),K.up.copy(D3[H]),K.lookAt(op),K.updateMatrixWorld(),ye.makeTranslation(-Dl.x,-Dl.y,-Dl.z),oy.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),G._frustum.setFromProjectionMatrix(oy,K.coordinateSystem,K.reversedDepth)}else G.updateMatrices(O);s=G.getFrustum(),C(z,T,G.camera,O,this.type)}G.isPointLightShadow!==!0&&this.type===Ll&&A(G,T),G.needsUpdate=!1}y=this.type,v.needsUpdate=!1,a.setRenderTarget(F,X,B)};function A(U,z){const T=e.update(E);g.defines.VSM_SAMPLES!==U.blurSamples&&(g.defines.VSM_SAMPLES=U.blurSamples,S.defines.VSM_SAMPLES=U.blurSamples,g.needsUpdate=!0,S.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new na(l.x,l.y,{format:ir,type:La})),g.uniforms.shadow_pass.value=U.map.depthTexture,g.uniforms.resolution.value=U.mapSize,g.uniforms.radius.value=U.radius,a.setRenderTarget(U.mapPass),a.clear(),a.renderBufferDirect(z,null,T,g,E,null),S.uniforms.shadow_pass.value=U.mapPass.texture,S.uniforms.resolution.value=U.mapSize,S.uniforms.radius.value=U.radius,a.setRenderTarget(U.map),a.clear(),a.renderBufferDirect(z,null,T,S,E,null)}function N(U,z,T,F){let X=null;const B=T.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(B!==void 0)X=B;else if(X=T.isPointLight===!0?m:d,a.localClippingEnabled&&z.clipShadows===!0&&Array.isArray(z.clippingPlanes)&&z.clippingPlanes.length!==0||z.displacementMap&&z.displacementScale!==0||z.alphaMap&&z.alphaTest>0||z.map&&z.alphaTest>0||z.alphaToCoverage===!0){const j=X.uuid,ie=z.uuid;let ae=p[j];ae===void 0&&(ae={},p[j]=ae);let V=ae[ie];V===void 0&&(V=X.clone(),ae[ie]=V,z.addEventListener("dispose",I)),X=V}if(X.visible=z.visible,X.wireframe=z.wireframe,F===Ll?X.side=z.shadowSide!==null?z.shadowSide:z.side:X.side=z.shadowSide!==null?z.shadowSide:x[z.side],X.alphaMap=z.alphaMap,X.alphaTest=z.alphaToCoverage===!0?.5:z.alphaTest,X.map=z.map,X.clipShadows=z.clipShadows,X.clippingPlanes=z.clippingPlanes,X.clipIntersection=z.clipIntersection,X.displacementMap=z.displacementMap,X.displacementScale=z.displacementScale,X.displacementBias=z.displacementBias,X.wireframeLinewidth=z.wireframeLinewidth,X.linewidth=z.linewidth,T.isPointLight===!0&&X.isMeshDistanceMaterial===!0){const j=a.properties.get(X);j.light=T}return X}function C(U,z,T,F,X){if(U.visible===!1)return;if(U.layers.test(z.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&X===Ll)&&(!U.frustumCulled||s.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,U.matrixWorld);const ie=e.update(U),ae=U.material;if(Array.isArray(ae)){const V=ie.groups;for(let O=0,G=V.length;O<G;O++){const $=V[O],he=ae[$.materialIndex];if(he&&he.visible){const ge=N(U,he,F,X);U.onBeforeShadow(a,U,z,T,ie,ge,$),a.renderBufferDirect(T,null,ie,ge,U,$),U.onAfterShadow(a,U,z,T,ie,ge,$)}}}else if(ae.visible){const V=N(U,ae,F,X);U.onBeforeShadow(a,U,z,T,ie,V,null),a.renderBufferDirect(T,null,ie,V,U,null),U.onAfterShadow(a,U,z,T,ie,V,null)}}const j=U.children;for(let ie=0,ae=j.length;ie<ae;ie++)C(j[ie],z,T,F,X)}function I(U){U.target.removeEventListener("dispose",I);for(const T in p){const F=p[T],X=U.target.uuid;X in F&&(F[X].dispose(),delete F[X])}}}function L3(a,e){function n(){let W=!1;const Ce=new un;let Se=null;const He=new un(0,0,0,0);return{setMask:function(Oe){Se!==Oe&&!W&&(a.colorMask(Oe,Oe,Oe,Oe),Se=Oe)},setLocked:function(Oe){W=Oe},setClear:function(Oe,we,qe,it,rn){rn===!0&&(Oe*=it,we*=it,qe*=it),Ce.set(Oe,we,qe,it),He.equals(Ce)===!1&&(a.clearColor(Oe,we,qe,it),He.copy(Ce))},reset:function(){W=!1,Se=null,He.set(-1,0,0,0)}}}function s(){let W=!1,Ce=!1,Se=null,He=null,Oe=null;return{setReversed:function(we){if(Ce!==we){const qe=e.get("EXT_clip_control");we?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT),Ce=we;const it=Oe;Oe=null,this.setClear(it)}},getReversed:function(){return Ce},setTest:function(we){we?me(a.DEPTH_TEST):Ae(a.DEPTH_TEST)},setMask:function(we){Se!==we&&!W&&(a.depthMask(we),Se=we)},setFunc:function(we){if(Ce&&(we=aA[we]),He!==we){switch(we){case vp:a.depthFunc(a.NEVER);break;case yp:a.depthFunc(a.ALWAYS);break;case Sp:a.depthFunc(a.LESS);break;case vo:a.depthFunc(a.LEQUAL);break;case bp:a.depthFunc(a.EQUAL);break;case Mp:a.depthFunc(a.GEQUAL);break;case Ep:a.depthFunc(a.GREATER);break;case Tp:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}He=we}},setLocked:function(we){W=we},setClear:function(we){Oe!==we&&(Oe=we,Ce&&(we=1-we),a.clearDepth(we))},reset:function(){W=!1,Se=null,He=null,Oe=null,Ce=!1}}}function l(){let W=!1,Ce=null,Se=null,He=null,Oe=null,we=null,qe=null,it=null,rn=null;return{setTest:function(Nt){W||(Nt?me(a.STENCIL_TEST):Ae(a.STENCIL_TEST))},setMask:function(Nt){Ce!==Nt&&!W&&(a.stencilMask(Nt),Ce=Nt)},setFunc:function(Nt,vi,si){(Se!==Nt||He!==vi||Oe!==si)&&(a.stencilFunc(Nt,vi,si),Se=Nt,He=vi,Oe=si)},setOp:function(Nt,vi,si){(we!==Nt||qe!==vi||it!==si)&&(a.stencilOp(Nt,vi,si),we=Nt,qe=vi,it=si)},setLocked:function(Nt){W=Nt},setClear:function(Nt){rn!==Nt&&(a.clearStencil(Nt),rn=Nt)},reset:function(){W=!1,Ce=null,Se=null,He=null,Oe=null,we=null,qe=null,it=null,rn=null}}}const c=new n,u=new s,d=new l,m=new WeakMap,p=new WeakMap;let _={},x={},g={},S=new WeakMap,M=[],E=null,v=!1,y=null,A=null,N=null,C=null,I=null,U=null,z=null,T=new dt(0,0,0),F=0,X=!1,B=null,j=null,ie=null,ae=null,V=null;const O=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,$=0;const he=a.getParameter(a.VERSION);he.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(he)[1]),G=$>=1):he.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(he)[1]),G=$>=2);let ge=null,H={};const K=a.getParameter(a.SCISSOR_BOX),ye=a.getParameter(a.VIEWPORT),ee=new un().fromArray(K),Ee=new un().fromArray(ye);function te(W,Ce,Se,He){const Oe=new Uint8Array(4),we=a.createTexture();a.bindTexture(W,we),a.texParameteri(W,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(W,a.TEXTURE_MAG_FILTER,a.NEAREST);for(let qe=0;qe<Se;qe++)W===a.TEXTURE_3D||W===a.TEXTURE_2D_ARRAY?a.texImage3D(Ce,0,a.RGBA,1,1,He,0,a.RGBA,a.UNSIGNED_BYTE,Oe):a.texImage2D(Ce+qe,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,Oe);return we}const se={};se[a.TEXTURE_2D]=te(a.TEXTURE_2D,a.TEXTURE_2D,1),se[a.TEXTURE_CUBE_MAP]=te(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[a.TEXTURE_2D_ARRAY]=te(a.TEXTURE_2D_ARRAY,a.TEXTURE_2D_ARRAY,1,1),se[a.TEXTURE_3D]=te(a.TEXTURE_3D,a.TEXTURE_3D,1,1),c.setClear(0,0,0,1),u.setClear(1),d.setClear(0),me(a.DEPTH_TEST),u.setFunc(vo),fn(!1),Qt(ev),me(a.CULL_FACE),Pt(Da);function me(W){_[W]!==!0&&(a.enable(W),_[W]=!0)}function Ae(W){_[W]!==!1&&(a.disable(W),_[W]=!1)}function Ke(W,Ce){return g[W]!==Ce?(a.bindFramebuffer(W,Ce),g[W]=Ce,W===a.DRAW_FRAMEBUFFER&&(g[a.FRAMEBUFFER]=Ce),W===a.FRAMEBUFFER&&(g[a.DRAW_FRAMEBUFFER]=Ce),!0):!1}function Ye(W,Ce){let Se=M,He=!1;if(W){Se=S.get(Ce),Se===void 0&&(Se=[],S.set(Ce,Se));const Oe=W.textures;if(Se.length!==Oe.length||Se[0]!==a.COLOR_ATTACHMENT0){for(let we=0,qe=Oe.length;we<qe;we++)Se[we]=a.COLOR_ATTACHMENT0+we;Se.length=Oe.length,He=!0}}else Se[0]!==a.BACK&&(Se[0]=a.BACK,He=!0);He&&a.drawBuffers(Se)}function Dt(W){return E!==W?(a.useProgram(W),E=W,!0):!1}const ut={[Js]:a.FUNC_ADD,[wT]:a.FUNC_SUBTRACT,[RT]:a.FUNC_REVERSE_SUBTRACT};ut[CT]=a.MIN,ut[DT]=a.MAX;const mt={[NT]:a.ZERO,[LT]:a.ONE,[UT]:a.SRC_COLOR,[_p]:a.SRC_ALPHA,[BT]:a.SRC_ALPHA_SATURATE,[IT]:a.DST_COLOR,[PT]:a.DST_ALPHA,[OT]:a.ONE_MINUS_SRC_COLOR,[xp]:a.ONE_MINUS_SRC_ALPHA,[FT]:a.ONE_MINUS_DST_COLOR,[zT]:a.ONE_MINUS_DST_ALPHA,[HT]:a.CONSTANT_COLOR,[GT]:a.ONE_MINUS_CONSTANT_COLOR,[VT]:a.CONSTANT_ALPHA,[kT]:a.ONE_MINUS_CONSTANT_ALPHA};function Pt(W,Ce,Se,He,Oe,we,qe,it,rn,Nt){if(W===Da){v===!0&&(Ae(a.BLEND),v=!1);return}if(v===!1&&(me(a.BLEND),v=!0),W!==AT){if(W!==y||Nt!==X){if((A!==Js||I!==Js)&&(a.blendEquation(a.FUNC_ADD),A=Js,I=Js),Nt)switch(W){case mo:a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case tv:a.blendFunc(a.ONE,a.ONE);break;case nv:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case iv:a.blendFuncSeparate(a.DST_COLOR,a.ONE_MINUS_SRC_ALPHA,a.ZERO,a.ONE);break;default:At("WebGLState: Invalid blending: ",W);break}else switch(W){case mo:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case tv:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE,a.ONE,a.ONE);break;case nv:At("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case iv:At("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:At("WebGLState: Invalid blending: ",W);break}N=null,C=null,U=null,z=null,T.set(0,0,0),F=0,y=W,X=Nt}return}Oe=Oe||Ce,we=we||Se,qe=qe||He,(Ce!==A||Oe!==I)&&(a.blendEquationSeparate(ut[Ce],ut[Oe]),A=Ce,I=Oe),(Se!==N||He!==C||we!==U||qe!==z)&&(a.blendFuncSeparate(mt[Se],mt[He],mt[we],mt[qe]),N=Se,C=He,U=we,z=qe),(it.equals(T)===!1||rn!==F)&&(a.blendColor(it.r,it.g,it.b,rn),T.copy(it),F=rn),y=W,X=!1}function ft(W,Ce){W.side===Ki?Ae(a.CULL_FACE):me(a.CULL_FACE);let Se=W.side===ii;Ce&&(Se=!Se),fn(Se),W.blending===mo&&W.transparent===!1?Pt(Da):Pt(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),u.setFunc(W.depthFunc),u.setTest(W.depthTest),u.setMask(W.depthWrite),c.setMask(W.colorWrite);const He=W.stencilWrite;d.setTest(He),He&&(d.setMask(W.stencilWriteMask),d.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),d.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),Y(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?me(a.SAMPLE_ALPHA_TO_COVERAGE):Ae(a.SAMPLE_ALPHA_TO_COVERAGE)}function fn(W){B!==W&&(W?a.frontFace(a.CW):a.frontFace(a.CCW),B=W)}function Qt(W){W!==MT?(me(a.CULL_FACE),W!==j&&(W===ev?a.cullFace(a.BACK):W===ET?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):Ae(a.CULL_FACE),j=W}function Nn(W){W!==ie&&(G&&a.lineWidth(W),ie=W)}function Y(W,Ce,Se){W?(me(a.POLYGON_OFFSET_FILL),(ae!==Ce||V!==Se)&&(ae=Ce,V=Se,u.getReversed()&&(Ce=-Ce),a.polygonOffset(Ce,Se))):Ae(a.POLYGON_OFFSET_FILL)}function sn(W){W?me(a.SCISSOR_TEST):Ae(a.SCISSOR_TEST)}function gt(W){W===void 0&&(W=a.TEXTURE0+O-1),ge!==W&&(a.activeTexture(W),ge=W)}function Vt(W,Ce,Se){Se===void 0&&(ge===null?Se=a.TEXTURE0+O-1:Se=ge);let He=H[Se];He===void 0&&(He={type:void 0,texture:void 0},H[Se]=He),(He.type!==W||He.texture!==Ce)&&(ge!==Se&&(a.activeTexture(Se),ge=Se),a.bindTexture(W,Ce||se[W]),He.type=W,He.texture=Ce)}function De(){const W=H[ge];W!==void 0&&W.type!==void 0&&(a.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function en(){try{a.compressedTexImage2D(...arguments)}catch(W){At("WebGLState:",W)}}function P(){try{a.compressedTexImage3D(...arguments)}catch(W){At("WebGLState:",W)}}function w(){try{a.texSubImage2D(...arguments)}catch(W){At("WebGLState:",W)}}function ne(){try{a.texSubImage3D(...arguments)}catch(W){At("WebGLState:",W)}}function Me(){try{a.compressedTexSubImage2D(...arguments)}catch(W){At("WebGLState:",W)}}function Re(){try{a.compressedTexSubImage3D(...arguments)}catch(W){At("WebGLState:",W)}}function Ne(){try{a.texStorage2D(...arguments)}catch(W){At("WebGLState:",W)}}function Pe(){try{a.texStorage3D(...arguments)}catch(W){At("WebGLState:",W)}}function _e(){try{a.texImage2D(...arguments)}catch(W){At("WebGLState:",W)}}function xe(){try{a.texImage3D(...arguments)}catch(W){At("WebGLState:",W)}}function ze(W){return x[W]!==void 0?x[W]:a.getParameter(W)}function Ie(W,Ce){x[W]!==Ce&&(a.pixelStorei(W,Ce),x[W]=Ce)}function Ue(W){ee.equals(W)===!1&&(a.scissor(W.x,W.y,W.z,W.w),ee.copy(W))}function Le(W){Ee.equals(W)===!1&&(a.viewport(W.x,W.y,W.z,W.w),Ee.copy(W))}function at(W,Ce){let Se=p.get(Ce);Se===void 0&&(Se=new WeakMap,p.set(Ce,Se));let He=Se.get(W);He===void 0&&(He=a.getUniformBlockIndex(Ce,W.name),Se.set(W,He))}function st(W,Ce){const He=p.get(Ce).get(W);m.get(Ce)!==He&&(a.uniformBlockBinding(Ce,He,W.__bindingPointIndex),m.set(Ce,He))}function _t(){a.disable(a.BLEND),a.disable(a.CULL_FACE),a.disable(a.DEPTH_TEST),a.disable(a.POLYGON_OFFSET_FILL),a.disable(a.SCISSOR_TEST),a.disable(a.STENCIL_TEST),a.disable(a.SAMPLE_ALPHA_TO_COVERAGE),a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ONE,a.ZERO),a.blendFuncSeparate(a.ONE,a.ZERO,a.ONE,a.ZERO),a.blendColor(0,0,0,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(a.LESS),u.setReversed(!1),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(a.ALWAYS,0,4294967295),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),a.clearStencil(0),a.cullFace(a.BACK),a.frontFace(a.CCW),a.polygonOffset(0,0),a.activeTexture(a.TEXTURE0),a.bindFramebuffer(a.FRAMEBUFFER,null),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),a.bindFramebuffer(a.READ_FRAMEBUFFER,null),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),a.pixelStorei(a.PACK_ALIGNMENT,4),a.pixelStorei(a.UNPACK_ALIGNMENT,4),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,a.BROWSER_DEFAULT_WEBGL),a.pixelStorei(a.PACK_ROW_LENGTH,0),a.pixelStorei(a.PACK_SKIP_PIXELS,0),a.pixelStorei(a.PACK_SKIP_ROWS,0),a.pixelStorei(a.UNPACK_ROW_LENGTH,0),a.pixelStorei(a.UNPACK_IMAGE_HEIGHT,0),a.pixelStorei(a.UNPACK_SKIP_PIXELS,0),a.pixelStorei(a.UNPACK_SKIP_ROWS,0),a.pixelStorei(a.UNPACK_SKIP_IMAGES,0),_={},x={},ge=null,H={},g={},S=new WeakMap,M=[],E=null,v=!1,y=null,A=null,N=null,C=null,I=null,U=null,z=null,T=new dt(0,0,0),F=0,X=!1,B=null,j=null,ie=null,ae=null,V=null,ee.set(0,0,a.canvas.width,a.canvas.height),Ee.set(0,0,a.canvas.width,a.canvas.height),c.reset(),u.reset(),d.reset()}return{buffers:{color:c,depth:u,stencil:d},enable:me,disable:Ae,bindFramebuffer:Ke,drawBuffers:Ye,useProgram:Dt,setBlending:Pt,setMaterial:ft,setFlipSided:fn,setCullFace:Qt,setLineWidth:Nn,setPolygonOffset:Y,setScissorTest:sn,activeTexture:gt,bindTexture:Vt,unbindTexture:De,compressedTexImage2D:en,compressedTexImage3D:P,texImage2D:_e,texImage3D:xe,pixelStorei:Ie,getParameter:ze,updateUBOMapping:at,uniformBlockBinding:st,texStorage2D:Ne,texStorage3D:Pe,texSubImage2D:w,texSubImage3D:ne,compressedTexSubImage2D:Me,compressedTexSubImage3D:Re,scissor:Ue,viewport:Le,reset:_t}}function U3(a,e,n,s,l,c,u){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new nt,_=new WeakMap,x=new Set;let g;const S=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(P,w){return M?new OffscreenCanvas(P,w):$u("canvas")}function v(P,w,ne){let Me=1;const Re=en(P);if((Re.width>ne||Re.height>ne)&&(Me=ne/Math.max(Re.width,Re.height)),Me<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Ne=Math.floor(Me*Re.width),Pe=Math.floor(Me*Re.height);g===void 0&&(g=E(Ne,Pe));const _e=w?E(Ne,Pe):g;return _e.width=Ne,_e.height=Pe,_e.getContext("2d").drawImage(P,0,0,Ne,Pe),tt("WebGLRenderer: Texture has been resized from ("+Re.width+"x"+Re.height+") to ("+Ne+"x"+Pe+")."),_e}else return"data"in P&&tt("WebGLRenderer: Image in DataTexture is too big ("+Re.width+"x"+Re.height+")."),P;return P}function y(P){return P.generateMipmaps}function A(P){a.generateMipmap(P)}function N(P){return P.isWebGLCubeRenderTarget?a.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?a.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?a.TEXTURE_2D_ARRAY:a.TEXTURE_2D}function C(P,w,ne,Me,Re,Ne=!1){if(P!==null){if(a[P]!==void 0)return a[P];tt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Pe;Me&&(Pe=e.get("EXT_texture_norm16"),Pe||tt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let _e=w;if(w===a.RED&&(ne===a.FLOAT&&(_e=a.R32F),ne===a.HALF_FLOAT&&(_e=a.R16F),ne===a.UNSIGNED_BYTE&&(_e=a.R8),ne===a.UNSIGNED_SHORT&&Pe&&(_e=Pe.R16_EXT),ne===a.SHORT&&Pe&&(_e=Pe.R16_SNORM_EXT)),w===a.RED_INTEGER&&(ne===a.UNSIGNED_BYTE&&(_e=a.R8UI),ne===a.UNSIGNED_SHORT&&(_e=a.R16UI),ne===a.UNSIGNED_INT&&(_e=a.R32UI),ne===a.BYTE&&(_e=a.R8I),ne===a.SHORT&&(_e=a.R16I),ne===a.INT&&(_e=a.R32I)),w===a.RG&&(ne===a.FLOAT&&(_e=a.RG32F),ne===a.HALF_FLOAT&&(_e=a.RG16F),ne===a.UNSIGNED_BYTE&&(_e=a.RG8),ne===a.UNSIGNED_SHORT&&Pe&&(_e=Pe.RG16_EXT),ne===a.SHORT&&Pe&&(_e=Pe.RG16_SNORM_EXT)),w===a.RG_INTEGER&&(ne===a.UNSIGNED_BYTE&&(_e=a.RG8UI),ne===a.UNSIGNED_SHORT&&(_e=a.RG16UI),ne===a.UNSIGNED_INT&&(_e=a.RG32UI),ne===a.BYTE&&(_e=a.RG8I),ne===a.SHORT&&(_e=a.RG16I),ne===a.INT&&(_e=a.RG32I)),w===a.RGB_INTEGER&&(ne===a.UNSIGNED_BYTE&&(_e=a.RGB8UI),ne===a.UNSIGNED_SHORT&&(_e=a.RGB16UI),ne===a.UNSIGNED_INT&&(_e=a.RGB32UI),ne===a.BYTE&&(_e=a.RGB8I),ne===a.SHORT&&(_e=a.RGB16I),ne===a.INT&&(_e=a.RGB32I)),w===a.RGBA_INTEGER&&(ne===a.UNSIGNED_BYTE&&(_e=a.RGBA8UI),ne===a.UNSIGNED_SHORT&&(_e=a.RGBA16UI),ne===a.UNSIGNED_INT&&(_e=a.RGBA32UI),ne===a.BYTE&&(_e=a.RGBA8I),ne===a.SHORT&&(_e=a.RGBA16I),ne===a.INT&&(_e=a.RGBA32I)),w===a.RGB&&(ne===a.UNSIGNED_SHORT&&Pe&&(_e=Pe.RGB16_EXT),ne===a.SHORT&&Pe&&(_e=Pe.RGB16_SNORM_EXT),ne===a.UNSIGNED_INT_5_9_9_9_REV&&(_e=a.RGB9_E5),ne===a.UNSIGNED_INT_10F_11F_11F_REV&&(_e=a.R11F_G11F_B10F)),w===a.RGBA){const xe=Ne?Ju:Tt.getTransfer(Re);ne===a.FLOAT&&(_e=a.RGBA32F),ne===a.HALF_FLOAT&&(_e=a.RGBA16F),ne===a.UNSIGNED_BYTE&&(_e=xe===Gt?a.SRGB8_ALPHA8:a.RGBA8),ne===a.UNSIGNED_SHORT&&Pe&&(_e=Pe.RGBA16_EXT),ne===a.SHORT&&Pe&&(_e=Pe.RGBA16_SNORM_EXT),ne===a.UNSIGNED_SHORT_4_4_4_4&&(_e=a.RGBA4),ne===a.UNSIGNED_SHORT_5_5_5_1&&(_e=a.RGB5_A1)}return(_e===a.R16F||_e===a.R32F||_e===a.RG16F||_e===a.RG32F||_e===a.RGBA16F||_e===a.RGBA32F)&&e.get("EXT_color_buffer_float"),_e}function I(P,w){let ne;return P?w===null||w===ia||w===Vl?ne=a.DEPTH24_STENCIL8:w===Ji?ne=a.DEPTH32F_STENCIL8:w===Gl&&(ne=a.DEPTH24_STENCIL8,tt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===ia||w===Vl?ne=a.DEPTH_COMPONENT24:w===Ji?ne=a.DEPTH_COMPONENT32F:w===Gl&&(ne=a.DEPTH_COMPONENT16),ne}function U(P,w){return y(P)===!0||P.isFramebufferTexture&&P.minFilter!==In&&P.minFilter!==Cn?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function z(P){const w=P.target;w.removeEventListener("dispose",z),F(w),w.isVideoTexture&&_.delete(w),w.isHTMLTexture&&x.delete(w)}function T(P){const w=P.target;w.removeEventListener("dispose",T),B(w)}function F(P){const w=s.get(P);if(w.__webglInit===void 0)return;const ne=P.source,Me=S.get(ne);if(Me){const Re=Me[w.__cacheKey];Re.usedTimes--,Re.usedTimes===0&&X(P),Object.keys(Me).length===0&&S.delete(ne)}s.remove(P)}function X(P){const w=s.get(P);a.deleteTexture(w.__webglTexture);const ne=P.source,Me=S.get(ne);delete Me[w.__cacheKey],u.memory.textures--}function B(P){const w=s.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),s.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Me=0;Me<6;Me++){if(Array.isArray(w.__webglFramebuffer[Me]))for(let Re=0;Re<w.__webglFramebuffer[Me].length;Re++)a.deleteFramebuffer(w.__webglFramebuffer[Me][Re]);else a.deleteFramebuffer(w.__webglFramebuffer[Me]);w.__webglDepthbuffer&&a.deleteRenderbuffer(w.__webglDepthbuffer[Me])}else{if(Array.isArray(w.__webglFramebuffer))for(let Me=0;Me<w.__webglFramebuffer.length;Me++)a.deleteFramebuffer(w.__webglFramebuffer[Me]);else a.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&a.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&a.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let Me=0;Me<w.__webglColorRenderbuffer.length;Me++)w.__webglColorRenderbuffer[Me]&&a.deleteRenderbuffer(w.__webglColorRenderbuffer[Me]);w.__webglDepthRenderbuffer&&a.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const ne=P.textures;for(let Me=0,Re=ne.length;Me<Re;Me++){const Ne=s.get(ne[Me]);Ne.__webglTexture&&(a.deleteTexture(Ne.__webglTexture),u.memory.textures--),s.remove(ne[Me])}s.remove(P)}let j=0;function ie(){j=0}function ae(){return j}function V(P){j=P}function O(){const P=j;return P>=l.maxTextures&&tt("WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+l.maxTextures),j+=1,P}function G(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function $(P,w){const ne=s.get(P);if(P.isVideoTexture&&Vt(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&ne.__version!==P.version){const Me=P.image;if(Me===null)tt("WebGLRenderer: Texture marked for update but no image data found.");else if(Me.complete===!1)tt("WebGLRenderer: Texture marked for update but image is incomplete");else{Ae(ne,P,w);return}}else P.isExternalTexture&&(ne.__webglTexture=P.sourceTexture?P.sourceTexture:null);n.bindTexture(a.TEXTURE_2D,ne.__webglTexture,a.TEXTURE0+w)}function he(P,w){const ne=s.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&ne.__version!==P.version){Ae(ne,P,w);return}else P.isExternalTexture&&(ne.__webglTexture=P.sourceTexture?P.sourceTexture:null);n.bindTexture(a.TEXTURE_2D_ARRAY,ne.__webglTexture,a.TEXTURE0+w)}function ge(P,w){const ne=s.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&ne.__version!==P.version){Ae(ne,P,w);return}n.bindTexture(a.TEXTURE_3D,ne.__webglTexture,a.TEXTURE0+w)}function H(P,w){const ne=s.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&ne.__version!==P.version){Ke(ne,P,w);return}n.bindTexture(a.TEXTURE_CUBE_MAP,ne.__webglTexture,a.TEXTURE0+w)}const K={[Ap]:a.REPEAT,[Ca]:a.CLAMP_TO_EDGE,[wp]:a.MIRRORED_REPEAT},ye={[In]:a.NEAREST,[WT]:a.NEAREST_MIPMAP_NEAREST,[su]:a.NEAREST_MIPMAP_LINEAR,[Cn]:a.LINEAR,[Rd]:a.LINEAR_MIPMAP_NEAREST,[er]:a.LINEAR_MIPMAP_LINEAR},ee={[ZT]:a.NEVER,[eA]:a.ALWAYS,[KT]:a.LESS,[Rm]:a.LEQUAL,[QT]:a.EQUAL,[Cm]:a.GEQUAL,[JT]:a.GREATER,[$T]:a.NOTEQUAL};function Ee(P,w){if(w.type===Ji&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Cn||w.magFilter===Rd||w.magFilter===su||w.magFilter===er||w.minFilter===Cn||w.minFilter===Rd||w.minFilter===su||w.minFilter===er)&&tt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),a.texParameteri(P,a.TEXTURE_WRAP_S,K[w.wrapS]),a.texParameteri(P,a.TEXTURE_WRAP_T,K[w.wrapT]),(P===a.TEXTURE_3D||P===a.TEXTURE_2D_ARRAY)&&a.texParameteri(P,a.TEXTURE_WRAP_R,K[w.wrapR]),a.texParameteri(P,a.TEXTURE_MAG_FILTER,ye[w.magFilter]),a.texParameteri(P,a.TEXTURE_MIN_FILTER,ye[w.minFilter]),w.compareFunction&&(a.texParameteri(P,a.TEXTURE_COMPARE_MODE,a.COMPARE_REF_TO_TEXTURE),a.texParameteri(P,a.TEXTURE_COMPARE_FUNC,ee[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===In||w.minFilter!==su&&w.minFilter!==er||w.type===Ji&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||s.get(w).__currentAnisotropy){const ne=e.get("EXT_texture_filter_anisotropic");a.texParameterf(P,ne.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,l.getMaxAnisotropy())),s.get(w).__currentAnisotropy=w.anisotropy}}}function te(P,w){let ne=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",z));const Me=w.source;let Re=S.get(Me);Re===void 0&&(Re={},S.set(Me,Re));const Ne=G(w);if(Ne!==P.__cacheKey){Re[Ne]===void 0&&(Re[Ne]={texture:a.createTexture(),usedTimes:0},u.memory.textures++,ne=!0),Re[Ne].usedTimes++;const Pe=Re[P.__cacheKey];Pe!==void 0&&(Re[P.__cacheKey].usedTimes--,Pe.usedTimes===0&&X(w)),P.__cacheKey=Ne,P.__webglTexture=Re[Ne].texture}return ne}function se(P,w,ne){return Math.floor(Math.floor(P/ne)/w)}function me(P,w,ne,Me){const Ne=P.updateRanges;if(Ne.length===0)n.texSubImage2D(a.TEXTURE_2D,0,0,0,w.width,w.height,ne,Me,w.data);else{Ne.sort((Ie,Ue)=>Ie.start-Ue.start);let Pe=0;for(let Ie=1;Ie<Ne.length;Ie++){const Ue=Ne[Pe],Le=Ne[Ie],at=Ue.start+Ue.count,st=se(Le.start,w.width,4),_t=se(Ue.start,w.width,4);Le.start<=at+1&&st===_t&&se(Le.start+Le.count-1,w.width,4)===st?Ue.count=Math.max(Ue.count,Le.start+Le.count-Ue.start):(++Pe,Ne[Pe]=Le)}Ne.length=Pe+1;const _e=n.getParameter(a.UNPACK_ROW_LENGTH),xe=n.getParameter(a.UNPACK_SKIP_PIXELS),ze=n.getParameter(a.UNPACK_SKIP_ROWS);n.pixelStorei(a.UNPACK_ROW_LENGTH,w.width);for(let Ie=0,Ue=Ne.length;Ie<Ue;Ie++){const Le=Ne[Ie],at=Math.floor(Le.start/4),st=Math.ceil(Le.count/4),_t=at%w.width,W=Math.floor(at/w.width),Ce=st,Se=1;n.pixelStorei(a.UNPACK_SKIP_PIXELS,_t),n.pixelStorei(a.UNPACK_SKIP_ROWS,W),n.texSubImage2D(a.TEXTURE_2D,0,_t,W,Ce,Se,ne,Me,w.data)}P.clearUpdateRanges(),n.pixelStorei(a.UNPACK_ROW_LENGTH,_e),n.pixelStorei(a.UNPACK_SKIP_PIXELS,xe),n.pixelStorei(a.UNPACK_SKIP_ROWS,ze)}}function Ae(P,w,ne){let Me=a.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Me=a.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Me=a.TEXTURE_3D);const Re=te(P,w),Ne=w.source;n.bindTexture(Me,P.__webglTexture,a.TEXTURE0+ne);const Pe=s.get(Ne);if(Ne.version!==Pe.__version||Re===!0){if(n.activeTexture(a.TEXTURE0+ne),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){const Se=Tt.getPrimaries(Tt.workingColorSpace),He=w.colorSpace===_s?null:Tt.getPrimaries(w.colorSpace),Oe=w.colorSpace===_s||Se===He?a.NONE:a.BROWSER_DEFAULT_WEBGL;n.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,Oe)}n.pixelStorei(a.UNPACK_ALIGNMENT,w.unpackAlignment);let xe=v(w.image,!1,l.maxTextureSize);xe=De(w,xe);const ze=c.convert(w.format,w.colorSpace),Ie=c.convert(w.type);let Ue=C(w.internalFormat,ze,Ie,w.normalized,w.colorSpace,w.isVideoTexture);Ee(Me,w);let Le;const at=w.mipmaps,st=w.isVideoTexture!==!0,_t=Pe.__version===void 0||Re===!0,W=Ne.dataReady,Ce=U(w,xe);if(w.isDepthTexture)Ue=I(w.format===tr,w.type),_t&&(st?n.texStorage2D(a.TEXTURE_2D,1,Ue,xe.width,xe.height):n.texImage2D(a.TEXTURE_2D,0,Ue,xe.width,xe.height,0,ze,Ie,null));else if(w.isDataTexture)if(at.length>0){st&&_t&&n.texStorage2D(a.TEXTURE_2D,Ce,Ue,at[0].width,at[0].height);for(let Se=0,He=at.length;Se<He;Se++)Le=at[Se],st?W&&n.texSubImage2D(a.TEXTURE_2D,Se,0,0,Le.width,Le.height,ze,Ie,Le.data):n.texImage2D(a.TEXTURE_2D,Se,Ue,Le.width,Le.height,0,ze,Ie,Le.data);w.generateMipmaps=!1}else st?(_t&&n.texStorage2D(a.TEXTURE_2D,Ce,Ue,xe.width,xe.height),W&&me(w,xe,ze,Ie)):n.texImage2D(a.TEXTURE_2D,0,Ue,xe.width,xe.height,0,ze,Ie,xe.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){st&&_t&&n.texStorage3D(a.TEXTURE_2D_ARRAY,Ce,Ue,at[0].width,at[0].height,xe.depth);for(let Se=0,He=at.length;Se<He;Se++)if(Le=at[Se],w.format!==Bi)if(ze!==null)if(st){if(W)if(w.layerUpdates.size>0){const Oe=Fv(Le.width,Le.height,w.format,w.type);for(const we of w.layerUpdates){const qe=Le.data.subarray(we*Oe/Le.data.BYTES_PER_ELEMENT,(we+1)*Oe/Le.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,Se,0,0,we,Le.width,Le.height,1,ze,qe)}w.clearLayerUpdates()}else n.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,Se,0,0,0,Le.width,Le.height,xe.depth,ze,Le.data)}else n.compressedTexImage3D(a.TEXTURE_2D_ARRAY,Se,Ue,Le.width,Le.height,xe.depth,0,Le.data,0,0);else tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else st?W&&n.texSubImage3D(a.TEXTURE_2D_ARRAY,Se,0,0,0,Le.width,Le.height,xe.depth,ze,Ie,Le.data):n.texImage3D(a.TEXTURE_2D_ARRAY,Se,Ue,Le.width,Le.height,xe.depth,0,ze,Ie,Le.data)}else{st&&_t&&n.texStorage2D(a.TEXTURE_2D,Ce,Ue,at[0].width,at[0].height);for(let Se=0,He=at.length;Se<He;Se++)Le=at[Se],w.format!==Bi?ze!==null?st?W&&n.compressedTexSubImage2D(a.TEXTURE_2D,Se,0,0,Le.width,Le.height,ze,Le.data):n.compressedTexImage2D(a.TEXTURE_2D,Se,Ue,Le.width,Le.height,0,Le.data):tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):st?W&&n.texSubImage2D(a.TEXTURE_2D,Se,0,0,Le.width,Le.height,ze,Ie,Le.data):n.texImage2D(a.TEXTURE_2D,Se,Ue,Le.width,Le.height,0,ze,Ie,Le.data)}else if(w.isDataArrayTexture)if(st){if(_t&&n.texStorage3D(a.TEXTURE_2D_ARRAY,Ce,Ue,xe.width,xe.height,xe.depth),W)if(w.layerUpdates.size>0){const Se=Fv(xe.width,xe.height,w.format,w.type);for(const He of w.layerUpdates){const Oe=xe.data.subarray(He*Se/xe.data.BYTES_PER_ELEMENT,(He+1)*Se/xe.data.BYTES_PER_ELEMENT);n.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,He,xe.width,xe.height,1,ze,Ie,Oe)}w.clearLayerUpdates()}else n.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,0,xe.width,xe.height,xe.depth,ze,Ie,xe.data)}else n.texImage3D(a.TEXTURE_2D_ARRAY,0,Ue,xe.width,xe.height,xe.depth,0,ze,Ie,xe.data);else if(w.isData3DTexture)st?(_t&&n.texStorage3D(a.TEXTURE_3D,Ce,Ue,xe.width,xe.height,xe.depth),W&&n.texSubImage3D(a.TEXTURE_3D,0,0,0,0,xe.width,xe.height,xe.depth,ze,Ie,xe.data)):n.texImage3D(a.TEXTURE_3D,0,Ue,xe.width,xe.height,xe.depth,0,ze,Ie,xe.data);else if(w.isFramebufferTexture){if(_t)if(st)n.texStorage2D(a.TEXTURE_2D,Ce,Ue,xe.width,xe.height);else{let Se=xe.width,He=xe.height;for(let Oe=0;Oe<Ce;Oe++)n.texImage2D(a.TEXTURE_2D,Oe,Ue,Se,He,0,ze,Ie,null),Se>>=1,He>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in a){const Se=a.canvas;if(Se.hasAttribute("layoutsubtree")||Se.setAttribute("layoutsubtree","true"),xe.parentNode!==Se){Se.appendChild(xe),x.add(w),Se.onpaint=it=>{const rn=it.changedElements;for(const Nt of x)rn.includes(Nt.image)&&(Nt.needsUpdate=!0)},Se.requestPaint();return}const He=0,Oe=a.RGBA,we=a.RGBA,qe=a.UNSIGNED_BYTE;a.texElementImage2D(a.TEXTURE_2D,He,Oe,we,qe,xe),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE)}}else if(at.length>0){if(st&&_t){const Se=en(at[0]);n.texStorage2D(a.TEXTURE_2D,Ce,Ue,Se.width,Se.height)}for(let Se=0,He=at.length;Se<He;Se++)Le=at[Se],st?W&&n.texSubImage2D(a.TEXTURE_2D,Se,0,0,ze,Ie,Le):n.texImage2D(a.TEXTURE_2D,Se,Ue,ze,Ie,Le);w.generateMipmaps=!1}else if(st){if(_t){const Se=en(xe);n.texStorage2D(a.TEXTURE_2D,Ce,Ue,Se.width,Se.height)}W&&n.texSubImage2D(a.TEXTURE_2D,0,0,0,ze,Ie,xe)}else n.texImage2D(a.TEXTURE_2D,0,Ue,ze,Ie,xe);y(w)&&A(Me),Pe.__version=Ne.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function Ke(P,w,ne){if(w.image.length!==6)return;const Me=te(P,w),Re=w.source;n.bindTexture(a.TEXTURE_CUBE_MAP,P.__webglTexture,a.TEXTURE0+ne);const Ne=s.get(Re);if(Re.version!==Ne.__version||Me===!0){n.activeTexture(a.TEXTURE0+ne);const Pe=Tt.getPrimaries(Tt.workingColorSpace),_e=w.colorSpace===_s?null:Tt.getPrimaries(w.colorSpace),xe=w.colorSpace===_s||Pe===_e?a.NONE:a.BROWSER_DEFAULT_WEBGL;n.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(a.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const ze=w.isCompressedTexture||w.image[0].isCompressedTexture,Ie=w.image[0]&&w.image[0].isDataTexture,Ue=[];for(let we=0;we<6;we++)!ze&&!Ie?Ue[we]=v(w.image[we],!0,l.maxCubemapSize):Ue[we]=Ie?w.image[we].image:w.image[we],Ue[we]=De(w,Ue[we]);const Le=Ue[0],at=c.convert(w.format,w.colorSpace),st=c.convert(w.type),_t=C(w.internalFormat,at,st,w.normalized,w.colorSpace),W=w.isVideoTexture!==!0,Ce=Ne.__version===void 0||Me===!0,Se=Re.dataReady;let He=U(w,Le);Ee(a.TEXTURE_CUBE_MAP,w);let Oe;if(ze){W&&Ce&&n.texStorage2D(a.TEXTURE_CUBE_MAP,He,_t,Le.width,Le.height);for(let we=0;we<6;we++){Oe=Ue[we].mipmaps;for(let qe=0;qe<Oe.length;qe++){const it=Oe[qe];w.format!==Bi?at!==null?W?Se&&n.compressedTexSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+we,qe,0,0,it.width,it.height,at,it.data):n.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+we,qe,_t,it.width,it.height,0,it.data):tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):W?Se&&n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+we,qe,0,0,it.width,it.height,at,st,it.data):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+we,qe,_t,it.width,it.height,0,at,st,it.data)}}}else{if(Oe=w.mipmaps,W&&Ce){Oe.length>0&&He++;const we=en(Ue[0]);n.texStorage2D(a.TEXTURE_CUBE_MAP,He,_t,we.width,we.height)}for(let we=0;we<6;we++)if(Ie){W?Se&&n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,Ue[we].width,Ue[we].height,at,st,Ue[we].data):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,_t,Ue[we].width,Ue[we].height,0,at,st,Ue[we].data);for(let qe=0;qe<Oe.length;qe++){const rn=Oe[qe].image[we].image;W?Se&&n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+we,qe+1,0,0,rn.width,rn.height,at,st,rn.data):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+we,qe+1,_t,rn.width,rn.height,0,at,st,rn.data)}}else{W?Se&&n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,at,st,Ue[we]):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,_t,at,st,Ue[we]);for(let qe=0;qe<Oe.length;qe++){const it=Oe[qe];W?Se&&n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+we,qe+1,0,0,at,st,it.image[we]):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+we,qe+1,_t,at,st,it.image[we])}}}y(w)&&A(a.TEXTURE_CUBE_MAP),Ne.__version=Re.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function Ye(P,w,ne,Me,Re,Ne){const Pe=c.convert(ne.format,ne.colorSpace),_e=c.convert(ne.type),xe=C(ne.internalFormat,Pe,_e,ne.normalized,ne.colorSpace),ze=s.get(w),Ie=s.get(ne);if(Ie.__renderTarget=w,!ze.__hasExternalTextures){const Ue=Math.max(1,w.width>>Ne),Le=Math.max(1,w.height>>Ne);Re===a.TEXTURE_3D||Re===a.TEXTURE_2D_ARRAY?n.texImage3D(Re,Ne,xe,Ue,Le,w.depth,0,Pe,_e,null):n.texImage2D(Re,Ne,xe,Ue,Le,0,Pe,_e,null)}n.bindFramebuffer(a.FRAMEBUFFER,P),gt(w)?d.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,Me,Re,Ie.__webglTexture,0,sn(w)):(Re===a.TEXTURE_2D||Re>=a.TEXTURE_CUBE_MAP_POSITIVE_X&&Re<=a.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&a.framebufferTexture2D(a.FRAMEBUFFER,Me,Re,Ie.__webglTexture,Ne),n.bindFramebuffer(a.FRAMEBUFFER,null)}function Dt(P,w,ne){if(a.bindRenderbuffer(a.RENDERBUFFER,P),w.depthBuffer){const Me=w.depthTexture,Re=Me&&Me.isDepthTexture?Me.type:null,Ne=I(w.stencilBuffer,Re),Pe=w.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;gt(w)?d.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,sn(w),Ne,w.width,w.height):ne?a.renderbufferStorageMultisample(a.RENDERBUFFER,sn(w),Ne,w.width,w.height):a.renderbufferStorage(a.RENDERBUFFER,Ne,w.width,w.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,Pe,a.RENDERBUFFER,P)}else{const Me=w.textures;for(let Re=0;Re<Me.length;Re++){const Ne=Me[Re],Pe=c.convert(Ne.format,Ne.colorSpace),_e=c.convert(Ne.type),xe=C(Ne.internalFormat,Pe,_e,Ne.normalized,Ne.colorSpace);gt(w)?d.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,sn(w),xe,w.width,w.height):ne?a.renderbufferStorageMultisample(a.RENDERBUFFER,sn(w),xe,w.width,w.height):a.renderbufferStorage(a.RENDERBUFFER,xe,w.width,w.height)}}a.bindRenderbuffer(a.RENDERBUFFER,null)}function ut(P,w,ne){const Me=w.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(a.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Re=s.get(w.depthTexture);if(Re.__renderTarget=w,(!Re.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),Me){if(Re.__webglInit===void 0&&(Re.__webglInit=!0,w.depthTexture.addEventListener("dispose",z)),Re.__webglTexture===void 0){Re.__webglTexture=a.createTexture(),n.bindTexture(a.TEXTURE_CUBE_MAP,Re.__webglTexture),Ee(a.TEXTURE_CUBE_MAP,w.depthTexture);const ze=c.convert(w.depthTexture.format),Ie=c.convert(w.depthTexture.type);let Ue;w.depthTexture.format===Ua?Ue=a.DEPTH_COMPONENT24:w.depthTexture.format===tr&&(Ue=a.DEPTH24_STENCIL8);for(let Le=0;Le<6;Le++)a.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,Ue,w.width,w.height,0,ze,Ie,null)}}else $(w.depthTexture,0);const Ne=Re.__webglTexture,Pe=sn(w),_e=Me?a.TEXTURE_CUBE_MAP_POSITIVE_X+ne:a.TEXTURE_2D,xe=w.depthTexture.format===tr?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;if(w.depthTexture.format===Ua)gt(w)?d.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,xe,_e,Ne,0,Pe):a.framebufferTexture2D(a.FRAMEBUFFER,xe,_e,Ne,0);else if(w.depthTexture.format===tr)gt(w)?d.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,xe,_e,Ne,0,Pe):a.framebufferTexture2D(a.FRAMEBUFFER,xe,_e,Ne,0);else throw new Error("Unknown depthTexture format")}function mt(P){const w=s.get(P),ne=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){const Me=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),Me){const Re=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,Me.removeEventListener("dispose",Re)};Me.addEventListener("dispose",Re),w.__depthDisposeCallback=Re}w.__boundDepthTexture=Me}if(P.depthTexture&&!w.__autoAllocateDepthBuffer)if(ne)for(let Me=0;Me<6;Me++)ut(w.__webglFramebuffer[Me],P,Me);else{const Me=P.texture.mipmaps;Me&&Me.length>0?ut(w.__webglFramebuffer[0],P,0):ut(w.__webglFramebuffer,P,0)}else if(ne){w.__webglDepthbuffer=[];for(let Me=0;Me<6;Me++)if(n.bindFramebuffer(a.FRAMEBUFFER,w.__webglFramebuffer[Me]),w.__webglDepthbuffer[Me]===void 0)w.__webglDepthbuffer[Me]=a.createRenderbuffer(),Dt(w.__webglDepthbuffer[Me],P,!1);else{const Re=P.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,Ne=w.__webglDepthbuffer[Me];a.bindRenderbuffer(a.RENDERBUFFER,Ne),a.framebufferRenderbuffer(a.FRAMEBUFFER,Re,a.RENDERBUFFER,Ne)}}else{const Me=P.texture.mipmaps;if(Me&&Me.length>0?n.bindFramebuffer(a.FRAMEBUFFER,w.__webglFramebuffer[0]):n.bindFramebuffer(a.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=a.createRenderbuffer(),Dt(w.__webglDepthbuffer,P,!1);else{const Re=P.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,Ne=w.__webglDepthbuffer;a.bindRenderbuffer(a.RENDERBUFFER,Ne),a.framebufferRenderbuffer(a.FRAMEBUFFER,Re,a.RENDERBUFFER,Ne)}}n.bindFramebuffer(a.FRAMEBUFFER,null)}function Pt(P,w,ne){const Me=s.get(P);w!==void 0&&Ye(Me.__webglFramebuffer,P,P.texture,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,0),ne!==void 0&&mt(P)}function ft(P){const w=P.texture,ne=s.get(P),Me=s.get(w);P.addEventListener("dispose",T);const Re=P.textures,Ne=P.isWebGLCubeRenderTarget===!0,Pe=Re.length>1;if(Pe||(Me.__webglTexture===void 0&&(Me.__webglTexture=a.createTexture()),Me.__version=w.version,u.memory.textures++),Ne){ne.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(w.mipmaps&&w.mipmaps.length>0){ne.__webglFramebuffer[_e]=[];for(let xe=0;xe<w.mipmaps.length;xe++)ne.__webglFramebuffer[_e][xe]=a.createFramebuffer()}else ne.__webglFramebuffer[_e]=a.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){ne.__webglFramebuffer=[];for(let _e=0;_e<w.mipmaps.length;_e++)ne.__webglFramebuffer[_e]=a.createFramebuffer()}else ne.__webglFramebuffer=a.createFramebuffer();if(Pe)for(let _e=0,xe=Re.length;_e<xe;_e++){const ze=s.get(Re[_e]);ze.__webglTexture===void 0&&(ze.__webglTexture=a.createTexture(),u.memory.textures++)}if(P.samples>0&&gt(P)===!1){ne.__webglMultisampledFramebuffer=a.createFramebuffer(),ne.__webglColorRenderbuffer=[],n.bindFramebuffer(a.FRAMEBUFFER,ne.__webglMultisampledFramebuffer);for(let _e=0;_e<Re.length;_e++){const xe=Re[_e];ne.__webglColorRenderbuffer[_e]=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,ne.__webglColorRenderbuffer[_e]);const ze=c.convert(xe.format,xe.colorSpace),Ie=c.convert(xe.type),Ue=C(xe.internalFormat,ze,Ie,xe.normalized,xe.colorSpace,P.isXRRenderTarget===!0),Le=sn(P);a.renderbufferStorageMultisample(a.RENDERBUFFER,Le,Ue,P.width,P.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+_e,a.RENDERBUFFER,ne.__webglColorRenderbuffer[_e])}a.bindRenderbuffer(a.RENDERBUFFER,null),P.depthBuffer&&(ne.__webglDepthRenderbuffer=a.createRenderbuffer(),Dt(ne.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(a.FRAMEBUFFER,null)}}if(Ne){n.bindTexture(a.TEXTURE_CUBE_MAP,Me.__webglTexture),Ee(a.TEXTURE_CUBE_MAP,w);for(let _e=0;_e<6;_e++)if(w.mipmaps&&w.mipmaps.length>0)for(let xe=0;xe<w.mipmaps.length;xe++)Ye(ne.__webglFramebuffer[_e][xe],P,w,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+_e,xe);else Ye(ne.__webglFramebuffer[_e],P,w,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);y(w)&&A(a.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Pe){for(let _e=0,xe=Re.length;_e<xe;_e++){const ze=Re[_e],Ie=s.get(ze);let Ue=a.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Ue=P.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),n.bindTexture(Ue,Ie.__webglTexture),Ee(Ue,ze),Ye(ne.__webglFramebuffer,P,ze,a.COLOR_ATTACHMENT0+_e,Ue,0),y(ze)&&A(Ue)}n.unbindTexture()}else{let _e=a.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(_e=P.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),n.bindTexture(_e,Me.__webglTexture),Ee(_e,w),w.mipmaps&&w.mipmaps.length>0)for(let xe=0;xe<w.mipmaps.length;xe++)Ye(ne.__webglFramebuffer[xe],P,w,a.COLOR_ATTACHMENT0,_e,xe);else Ye(ne.__webglFramebuffer,P,w,a.COLOR_ATTACHMENT0,_e,0);y(w)&&A(_e),n.unbindTexture()}P.depthBuffer&&mt(P)}function fn(P){const w=P.textures;for(let ne=0,Me=w.length;ne<Me;ne++){const Re=w[ne];if(y(Re)){const Ne=N(P),Pe=s.get(Re).__webglTexture;n.bindTexture(Ne,Pe),A(Ne),n.unbindTexture()}}}const Qt=[],Nn=[];function Y(P){if(P.samples>0){if(gt(P)===!1){const w=P.textures,ne=P.width,Me=P.height;let Re=a.COLOR_BUFFER_BIT;const Ne=P.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,Pe=s.get(P),_e=w.length>1;if(_e)for(let ze=0;ze<w.length;ze++)n.bindFramebuffer(a.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+ze,a.RENDERBUFFER,null),n.bindFramebuffer(a.FRAMEBUFFER,Pe.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+ze,a.TEXTURE_2D,null,0);n.bindFramebuffer(a.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer);const xe=P.texture.mipmaps;xe&&xe.length>0?n.bindFramebuffer(a.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer[0]):n.bindFramebuffer(a.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let ze=0;ze<w.length;ze++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Re|=a.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Re|=a.STENCIL_BUFFER_BIT)),_e){a.framebufferRenderbuffer(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,Pe.__webglColorRenderbuffer[ze]);const Ie=s.get(w[ze]).__webglTexture;a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,Ie,0)}a.blitFramebuffer(0,0,ne,Me,0,0,ne,Me,Re,a.NEAREST),m===!0&&(Qt.length=0,Nn.length=0,Qt.push(a.COLOR_ATTACHMENT0+ze),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Qt.push(Ne),Nn.push(Ne),a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,Nn)),a.invalidateFramebuffer(a.READ_FRAMEBUFFER,Qt))}if(n.bindFramebuffer(a.READ_FRAMEBUFFER,null),n.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),_e)for(let ze=0;ze<w.length;ze++){n.bindFramebuffer(a.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+ze,a.RENDERBUFFER,Pe.__webglColorRenderbuffer[ze]);const Ie=s.get(w[ze]).__webglTexture;n.bindFramebuffer(a.FRAMEBUFFER,Pe.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+ze,a.TEXTURE_2D,Ie,0)}n.bindFramebuffer(a.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&m){const w=P.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,[w])}}}function sn(P){return Math.min(l.maxSamples,P.samples)}function gt(P){const w=s.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Vt(P){const w=u.render.frame;_.get(P)!==w&&(_.set(P,w),P.update())}function De(P,w){const ne=P.colorSpace,Me=P.format,Re=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||ne!==Qu&&ne!==_s&&(Tt.getTransfer(ne)===Gt?(Me!==Bi||Re!==_i)&&tt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):At("WebGLTextures: Unsupported texture color space:",ne)),w}function en(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(p.width=P.naturalWidth||P.width,p.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(p.width=P.displayWidth,p.height=P.displayHeight):(p.width=P.width,p.height=P.height),p}this.allocateTextureUnit=O,this.resetTextureUnits=ie,this.getTextureUnits=ae,this.setTextureUnits=V,this.setTexture2D=$,this.setTexture2DArray=he,this.setTexture3D=ge,this.setTextureCube=H,this.rebindTextures=Pt,this.setupRenderTarget=ft,this.updateRenderTargetMipmap=fn,this.updateMultisampleRenderTarget=Y,this.setupDepthRenderbuffer=mt,this.setupFrameBufferTexture=Ye,this.useMultisampledRTT=gt,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function O3(a,e){function n(s,l=_s){let c;const u=Tt.getTransfer(l);if(s===_i)return a.UNSIGNED_BYTE;if(s===Mm)return a.UNSIGNED_SHORT_4_4_4_4;if(s===Em)return a.UNSIGNED_SHORT_5_5_5_1;if(s===iS)return a.UNSIGNED_INT_5_9_9_9_REV;if(s===aS)return a.UNSIGNED_INT_10F_11F_11F_REV;if(s===tS)return a.BYTE;if(s===nS)return a.SHORT;if(s===Gl)return a.UNSIGNED_SHORT;if(s===bm)return a.INT;if(s===ia)return a.UNSIGNED_INT;if(s===Ji)return a.FLOAT;if(s===La)return a.HALF_FLOAT;if(s===sS)return a.ALPHA;if(s===rS)return a.RGB;if(s===Bi)return a.RGBA;if(s===Ua)return a.DEPTH_COMPONENT;if(s===tr)return a.DEPTH_STENCIL;if(s===oS)return a.RED;if(s===Tm)return a.RED_INTEGER;if(s===ir)return a.RG;if(s===Am)return a.RG_INTEGER;if(s===wm)return a.RGBA_INTEGER;if(s===Gu||s===Vu||s===ku||s===ju)if(u===Gt)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===Gu)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Vu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===ku)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===ju)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===Gu)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Vu)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===ku)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===ju)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Rp||s===Cp||s===Dp||s===Np)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===Rp)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Cp)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Dp)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Np)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Lp||s===Up||s===Op||s===Pp||s===zp||s===Zu||s===Ip)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Lp||s===Up)return u===Gt?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Op)return u===Gt?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(s===Pp)return c.COMPRESSED_R11_EAC;if(s===zp)return c.COMPRESSED_SIGNED_R11_EAC;if(s===Zu)return c.COMPRESSED_RG11_EAC;if(s===Ip)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===Fp||s===Bp||s===Hp||s===Gp||s===Vp||s===kp||s===jp||s===Xp||s===Wp||s===qp||s===Yp||s===Zp||s===Kp||s===Qp)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Fp)return u===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Bp)return u===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Hp)return u===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Gp)return u===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Vp)return u===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===kp)return u===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===jp)return u===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Xp)return u===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Wp)return u===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===qp)return u===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Yp)return u===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Zp)return u===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Kp)return u===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Qp)return u===Gt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Jp||s===$p||s===em)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(s===Jp)return u===Gt?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===$p)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===em)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===tm||s===nm||s===Ku||s===im)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(s===tm)return c.COMPRESSED_RED_RGTC1_EXT;if(s===nm)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Ku)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===im)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Vl?a.UNSIGNED_INT_24_8:a[s]!==void 0?a[s]:null}return{convert:n}}const P3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,z3=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class I3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const s=new xS(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,s=new sa({vertexShader:P3,fragmentShader:z3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new aa(new ql(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class F3 extends ws{constructor(e,n){super();const s=this;let l=null,c=1,u=null,d="local-floor",m=1,p=null,_=null,x=null,g=null,S=null,M=null;const E=typeof XRWebGLBinding<"u",v=new I3,y={},A=n.getContextAttributes();let N=null,C=null;const I=[],U=[],z=new nt;let T=null;const F=new Di;F.viewport=new un;const X=new Di;X.viewport=new un;const B=[F,X],j=new WA;let ie=null,ae=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let se=I[te];return se===void 0&&(se=new Pd,I[te]=se),se.getTargetRaySpace()},this.getControllerGrip=function(te){let se=I[te];return se===void 0&&(se=new Pd,I[te]=se),se.getGripSpace()},this.getHand=function(te){let se=I[te];return se===void 0&&(se=new Pd,I[te]=se),se.getHandSpace()};function V(te){const se=U.indexOf(te.inputSource);if(se===-1)return;const me=I[se];me!==void 0&&(me.update(te.inputSource,te.frame,p||u),me.dispatchEvent({type:te.type,data:te.inputSource}))}function O(){l.removeEventListener("select",V),l.removeEventListener("selectstart",V),l.removeEventListener("selectend",V),l.removeEventListener("squeeze",V),l.removeEventListener("squeezestart",V),l.removeEventListener("squeezeend",V),l.removeEventListener("end",O),l.removeEventListener("inputsourceschange",G);for(let te=0;te<I.length;te++){const se=U[te];se!==null&&(U[te]=null,I[te].disconnect(se))}ie=null,ae=null,v.reset();for(const te in y)delete y[te];e.setRenderTarget(N),S=null,g=null,x=null,l=null,C=null,Ee.stop(),s.isPresenting=!1,e.setPixelRatio(T),e.setSize(z.width,z.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){c=te,s.isPresenting===!0&&tt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){d=te,s.isPresenting===!0&&tt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||u},this.setReferenceSpace=function(te){p=te},this.getBaseLayer=function(){return g!==null?g:S},this.getBinding=function(){return x===null&&E&&(x=new XRWebGLBinding(l,n)),x},this.getFrame=function(){return M},this.getSession=function(){return l},this.setSession=async function(te){if(l=te,l!==null){if(N=e.getRenderTarget(),l.addEventListener("select",V),l.addEventListener("selectstart",V),l.addEventListener("selectend",V),l.addEventListener("squeeze",V),l.addEventListener("squeezestart",V),l.addEventListener("squeezeend",V),l.addEventListener("end",O),l.addEventListener("inputsourceschange",G),A.xrCompatible!==!0&&await n.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(z),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Ae=null,Ke=null;A.depth&&(Ke=A.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,me=A.stencil?tr:Ua,Ae=A.stencil?Vl:ia);const Ye={colorFormat:n.RGBA8,depthFormat:Ke,scaleFactor:c};x=this.getBinding(),g=x.createProjectionLayer(Ye),l.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),C=new na(g.textureWidth,g.textureHeight,{format:Bi,type:_i,depthTexture:new So(g.textureWidth,g.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const me={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:c};S=new XRWebGLLayer(l,n,me),l.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),C=new na(S.framebufferWidth,S.framebufferHeight,{format:Bi,type:_i,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(m),p=null,u=await l.requestReferenceSpace(d),Ee.setContext(l),Ee.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function G(te){for(let se=0;se<te.removed.length;se++){const me=te.removed[se],Ae=U.indexOf(me);Ae>=0&&(U[Ae]=null,I[Ae].disconnect(me))}for(let se=0;se<te.added.length;se++){const me=te.added[se];let Ae=U.indexOf(me);if(Ae===-1){for(let Ye=0;Ye<I.length;Ye++)if(Ye>=U.length){U.push(me),Ae=Ye;break}else if(U[Ye]===null){U[Ye]=me,Ae=Ye;break}if(Ae===-1)break}const Ke=I[Ae];Ke&&Ke.connect(me)}}const $=new Q,he=new Q;function ge(te,se,me){$.setFromMatrixPosition(se.matrixWorld),he.setFromMatrixPosition(me.matrixWorld);const Ae=$.distanceTo(he),Ke=se.projectionMatrix.elements,Ye=me.projectionMatrix.elements,Dt=Ke[14]/(Ke[10]-1),ut=Ke[14]/(Ke[10]+1),mt=(Ke[9]+1)/Ke[5],Pt=(Ke[9]-1)/Ke[5],ft=(Ke[8]-1)/Ke[0],fn=(Ye[8]+1)/Ye[0],Qt=Dt*ft,Nn=Dt*fn,Y=Ae/(-ft+fn),sn=Y*-ft;if(se.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(sn),te.translateZ(Y),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),Ke[10]===-1)te.projectionMatrix.copy(se.projectionMatrix),te.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const gt=Dt+Y,Vt=ut+Y,De=Qt-sn,en=Nn+(Ae-sn),P=mt*ut/Vt*gt,w=Pt*ut/Vt*gt;te.projectionMatrix.makePerspective(De,en,P,w,gt,Vt),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function H(te,se){se===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(se.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(l===null)return;let se=te.near,me=te.far;v.texture!==null&&(v.depthNear>0&&(se=v.depthNear),v.depthFar>0&&(me=v.depthFar)),j.near=X.near=F.near=se,j.far=X.far=F.far=me,(ie!==j.near||ae!==j.far)&&(l.updateRenderState({depthNear:j.near,depthFar:j.far}),ie=j.near,ae=j.far),j.layers.mask=te.layers.mask|6,F.layers.mask=j.layers.mask&-5,X.layers.mask=j.layers.mask&-3;const Ae=te.parent,Ke=j.cameras;H(j,Ae);for(let Ye=0;Ye<Ke.length;Ye++)H(Ke[Ye],Ae);Ke.length===2?ge(j,F,X):j.projectionMatrix.copy(F.projectionMatrix),K(te,j,Ae)};function K(te,se,me){me===null?te.matrix.copy(se.matrixWorld):(te.matrix.copy(me.matrixWorld),te.matrix.invert(),te.matrix.multiply(se.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(se.projectionMatrix),te.projectionMatrixInverse.copy(se.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=om*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(!(g===null&&S===null))return m},this.setFoveation=function(te){m=te,g!==null&&(g.fixedFoveation=te),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=te)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(j)},this.getCameraTexture=function(te){return y[te]};let ye=null;function ee(te,se){if(_=se.getViewerPose(p||u),M=se,_!==null){const me=_.views;S!==null&&(e.setRenderTargetFramebuffer(C,S.framebuffer),e.setRenderTarget(C));let Ae=!1;me.length!==j.cameras.length&&(j.cameras.length=0,Ae=!0);for(let ut=0;ut<me.length;ut++){const mt=me[ut];let Pt=null;if(S!==null)Pt=S.getViewport(mt);else{const fn=x.getViewSubImage(g,mt);Pt=fn.viewport,ut===0&&(e.setRenderTargetTextures(C,fn.colorTexture,fn.depthStencilTexture),e.setRenderTarget(C))}let ft=B[ut];ft===void 0&&(ft=new Di,ft.layers.enable(ut),ft.viewport=new un,B[ut]=ft),ft.matrix.fromArray(mt.transform.matrix),ft.matrix.decompose(ft.position,ft.quaternion,ft.scale),ft.projectionMatrix.fromArray(mt.projectionMatrix),ft.projectionMatrixInverse.copy(ft.projectionMatrix).invert(),ft.viewport.set(Pt.x,Pt.y,Pt.width,Pt.height),ut===0&&(j.matrix.copy(ft.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),Ae===!0&&j.cameras.push(ft)}const Ke=l.enabledFeatures;if(Ke&&Ke.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&E){x=s.getBinding();const ut=x.getDepthInformation(me[0]);ut&&ut.isValid&&ut.texture&&v.init(ut,l.renderState)}if(Ke&&Ke.includes("camera-access")&&E){e.state.unbindTexture(),x=s.getBinding();for(let ut=0;ut<me.length;ut++){const mt=me[ut].camera;if(mt){let Pt=y[mt];Pt||(Pt=new xS,y[mt]=Pt);const ft=x.getCameraImage(mt);Pt.sourceTexture=ft}}}}for(let me=0;me<I.length;me++){const Ae=U[me],Ke=I[me];Ae!==null&&Ke!==void 0&&Ke.update(Ae,se,p||u)}ye&&ye(te,se),se.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:se}),M=null}const Ee=new bS;Ee.setAnimationLoop(ee),this.setAnimationLoop=function(te){ye=te},this.dispose=function(){}}}const B3=new on,CS=new ot;CS.set(-1,0,0,0,1,0,0,0,1);function H3(a,e){function n(v,y){v.matrixAutoUpdate===!0&&v.updateMatrix(),y.value.copy(v.matrix)}function s(v,y){y.color.getRGB(v.fogColor.value,vS(a)),y.isFog?(v.fogNear.value=y.near,v.fogFar.value=y.far):y.isFogExp2&&(v.fogDensity.value=y.density)}function l(v,y,A,N,C){y.isNodeMaterial?y.uniformsNeedUpdate=!1:y.isMeshBasicMaterial?c(v,y):y.isMeshLambertMaterial?(c(v,y),y.envMap&&(v.envMapIntensity.value=y.envMapIntensity)):y.isMeshToonMaterial?(c(v,y),x(v,y)):y.isMeshPhongMaterial?(c(v,y),_(v,y),y.envMap&&(v.envMapIntensity.value=y.envMapIntensity)):y.isMeshStandardMaterial?(c(v,y),g(v,y),y.isMeshPhysicalMaterial&&S(v,y,C)):y.isMeshMatcapMaterial?(c(v,y),M(v,y)):y.isMeshDepthMaterial?c(v,y):y.isMeshDistanceMaterial?(c(v,y),E(v,y)):y.isMeshNormalMaterial?c(v,y):y.isLineBasicMaterial?(u(v,y),y.isLineDashedMaterial&&d(v,y)):y.isPointsMaterial?m(v,y,A,N):y.isSpriteMaterial?p(v,y):y.isShadowMaterial?(v.color.value.copy(y.color),v.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function c(v,y){v.opacity.value=y.opacity,y.color&&v.diffuse.value.copy(y.color),y.emissive&&v.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(v.map.value=y.map,n(y.map,v.mapTransform)),y.alphaMap&&(v.alphaMap.value=y.alphaMap,n(y.alphaMap,v.alphaMapTransform)),y.bumpMap&&(v.bumpMap.value=y.bumpMap,n(y.bumpMap,v.bumpMapTransform),v.bumpScale.value=y.bumpScale,y.side===ii&&(v.bumpScale.value*=-1)),y.normalMap&&(v.normalMap.value=y.normalMap,n(y.normalMap,v.normalMapTransform),v.normalScale.value.copy(y.normalScale),y.side===ii&&v.normalScale.value.negate()),y.displacementMap&&(v.displacementMap.value=y.displacementMap,n(y.displacementMap,v.displacementMapTransform),v.displacementScale.value=y.displacementScale,v.displacementBias.value=y.displacementBias),y.emissiveMap&&(v.emissiveMap.value=y.emissiveMap,n(y.emissiveMap,v.emissiveMapTransform)),y.specularMap&&(v.specularMap.value=y.specularMap,n(y.specularMap,v.specularMapTransform)),y.alphaTest>0&&(v.alphaTest.value=y.alphaTest);const A=e.get(y),N=A.envMap,C=A.envMapRotation;N&&(v.envMap.value=N,v.envMapRotation.value.setFromMatrix4(B3.makeRotationFromEuler(C)).transpose(),N.isCubeTexture&&N.isRenderTargetTexture===!1&&v.envMapRotation.value.premultiply(CS),v.reflectivity.value=y.reflectivity,v.ior.value=y.ior,v.refractionRatio.value=y.refractionRatio),y.lightMap&&(v.lightMap.value=y.lightMap,v.lightMapIntensity.value=y.lightMapIntensity,n(y.lightMap,v.lightMapTransform)),y.aoMap&&(v.aoMap.value=y.aoMap,v.aoMapIntensity.value=y.aoMapIntensity,n(y.aoMap,v.aoMapTransform))}function u(v,y){v.diffuse.value.copy(y.color),v.opacity.value=y.opacity,y.map&&(v.map.value=y.map,n(y.map,v.mapTransform))}function d(v,y){v.dashSize.value=y.dashSize,v.totalSize.value=y.dashSize+y.gapSize,v.scale.value=y.scale}function m(v,y,A,N){v.diffuse.value.copy(y.color),v.opacity.value=y.opacity,v.size.value=y.size*A,v.scale.value=N*.5,y.map&&(v.map.value=y.map,n(y.map,v.uvTransform)),y.alphaMap&&(v.alphaMap.value=y.alphaMap,n(y.alphaMap,v.alphaMapTransform)),y.alphaTest>0&&(v.alphaTest.value=y.alphaTest)}function p(v,y){v.diffuse.value.copy(y.color),v.opacity.value=y.opacity,v.rotation.value=y.rotation,y.map&&(v.map.value=y.map,n(y.map,v.mapTransform)),y.alphaMap&&(v.alphaMap.value=y.alphaMap,n(y.alphaMap,v.alphaMapTransform)),y.alphaTest>0&&(v.alphaTest.value=y.alphaTest)}function _(v,y){v.specular.value.copy(y.specular),v.shininess.value=Math.max(y.shininess,1e-4)}function x(v,y){y.gradientMap&&(v.gradientMap.value=y.gradientMap)}function g(v,y){v.metalness.value=y.metalness,y.metalnessMap&&(v.metalnessMap.value=y.metalnessMap,n(y.metalnessMap,v.metalnessMapTransform)),v.roughness.value=y.roughness,y.roughnessMap&&(v.roughnessMap.value=y.roughnessMap,n(y.roughnessMap,v.roughnessMapTransform)),y.envMap&&(v.envMapIntensity.value=y.envMapIntensity)}function S(v,y,A){v.ior.value=y.ior,y.sheen>0&&(v.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),v.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(v.sheenColorMap.value=y.sheenColorMap,n(y.sheenColorMap,v.sheenColorMapTransform)),y.sheenRoughnessMap&&(v.sheenRoughnessMap.value=y.sheenRoughnessMap,n(y.sheenRoughnessMap,v.sheenRoughnessMapTransform))),y.clearcoat>0&&(v.clearcoat.value=y.clearcoat,v.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(v.clearcoatMap.value=y.clearcoatMap,n(y.clearcoatMap,v.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,n(y.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(v.clearcoatNormalMap.value=y.clearcoatNormalMap,n(y.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===ii&&v.clearcoatNormalScale.value.negate())),y.dispersion>0&&(v.dispersion.value=y.dispersion),y.iridescence>0&&(v.iridescence.value=y.iridescence,v.iridescenceIOR.value=y.iridescenceIOR,v.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(v.iridescenceMap.value=y.iridescenceMap,n(y.iridescenceMap,v.iridescenceMapTransform)),y.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=y.iridescenceThicknessMap,n(y.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),y.transmission>0&&(v.transmission.value=y.transmission,v.transmissionSamplerMap.value=A.texture,v.transmissionSamplerSize.value.set(A.width,A.height),y.transmissionMap&&(v.transmissionMap.value=y.transmissionMap,n(y.transmissionMap,v.transmissionMapTransform)),v.thickness.value=y.thickness,y.thicknessMap&&(v.thicknessMap.value=y.thicknessMap,n(y.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=y.attenuationDistance,v.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(v.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(v.anisotropyMap.value=y.anisotropyMap,n(y.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=y.specularIntensity,v.specularColor.value.copy(y.specularColor),y.specularColorMap&&(v.specularColorMap.value=y.specularColorMap,n(y.specularColorMap,v.specularColorMapTransform)),y.specularIntensityMap&&(v.specularIntensityMap.value=y.specularIntensityMap,n(y.specularIntensityMap,v.specularIntensityMapTransform))}function M(v,y){y.matcap&&(v.matcap.value=y.matcap)}function E(v,y){const A=e.get(y).light;v.referencePosition.value.setFromMatrixPosition(A.matrixWorld),v.nearDistance.value=A.shadow.camera.near,v.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function G3(a,e,n,s){let l={},c={},u=[];const d=a.getParameter(a.MAX_UNIFORM_BUFFER_BINDINGS);function m(A,N){const C=N.program;s.uniformBlockBinding(A,C)}function p(A,N){let C=l[A.id];C===void 0&&(M(A),C=_(A),l[A.id]=C,A.addEventListener("dispose",v));const I=N.program;s.updateUBOMapping(A,I);const U=e.render.frame;c[A.id]!==U&&(g(A),c[A.id]=U)}function _(A){const N=x();A.__bindingPointIndex=N;const C=a.createBuffer(),I=A.__size,U=A.usage;return a.bindBuffer(a.UNIFORM_BUFFER,C),a.bufferData(a.UNIFORM_BUFFER,I,U),a.bindBuffer(a.UNIFORM_BUFFER,null),a.bindBufferBase(a.UNIFORM_BUFFER,N,C),C}function x(){for(let A=0;A<d;A++)if(u.indexOf(A)===-1)return u.push(A),A;return At("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(A){const N=l[A.id],C=A.uniforms,I=A.__cache;a.bindBuffer(a.UNIFORM_BUFFER,N);for(let U=0,z=C.length;U<z;U++){const T=Array.isArray(C[U])?C[U]:[C[U]];for(let F=0,X=T.length;F<X;F++){const B=T[F];if(S(B,U,F,I)===!0){const j=B.__offset,ie=Array.isArray(B.value)?B.value:[B.value];let ae=0;for(let V=0;V<ie.length;V++){const O=ie[V],G=E(O);typeof O=="number"||typeof O=="boolean"?(B.__data[0]=O,a.bufferSubData(a.UNIFORM_BUFFER,j+ae,B.__data)):O.isMatrix3?(B.__data[0]=O.elements[0],B.__data[1]=O.elements[1],B.__data[2]=O.elements[2],B.__data[3]=0,B.__data[4]=O.elements[3],B.__data[5]=O.elements[4],B.__data[6]=O.elements[5],B.__data[7]=0,B.__data[8]=O.elements[6],B.__data[9]=O.elements[7],B.__data[10]=O.elements[8],B.__data[11]=0):ArrayBuffer.isView(O)?B.__data.set(new O.constructor(O.buffer,O.byteOffset,B.__data.length)):(O.toArray(B.__data,ae),ae+=G.storage/Float32Array.BYTES_PER_ELEMENT)}a.bufferSubData(a.UNIFORM_BUFFER,j,B.__data)}}}a.bindBuffer(a.UNIFORM_BUFFER,null)}function S(A,N,C,I){const U=A.value,z=N+"_"+C;if(I[z]===void 0)return typeof U=="number"||typeof U=="boolean"?I[z]=U:ArrayBuffer.isView(U)?I[z]=U.slice():I[z]=U.clone(),!0;{const T=I[z];if(typeof U=="number"||typeof U=="boolean"){if(T!==U)return I[z]=U,!0}else{if(ArrayBuffer.isView(U))return!0;if(T.equals(U)===!1)return T.copy(U),!0}}return!1}function M(A){const N=A.uniforms;let C=0;const I=16;for(let z=0,T=N.length;z<T;z++){const F=Array.isArray(N[z])?N[z]:[N[z]];for(let X=0,B=F.length;X<B;X++){const j=F[X],ie=Array.isArray(j.value)?j.value:[j.value];for(let ae=0,V=ie.length;ae<V;ae++){const O=ie[ae],G=E(O),$=C%I,he=$%G.boundary,ge=$+he;C+=he,ge!==0&&I-ge<G.storage&&(C+=I-ge),j.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=C,C+=G.storage}}}const U=C%I;return U>0&&(C+=I-U),A.__size=C,A.__cache={},this}function E(A){const N={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(N.boundary=4,N.storage=4):A.isVector2?(N.boundary=8,N.storage=8):A.isVector3||A.isColor?(N.boundary=16,N.storage=12):A.isVector4?(N.boundary=16,N.storage=16):A.isMatrix3?(N.boundary=48,N.storage=48):A.isMatrix4?(N.boundary=64,N.storage=64):A.isTexture?tt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(A)?(N.boundary=16,N.storage=A.byteLength):tt("WebGLRenderer: Unsupported uniform value type.",A),N}function v(A){const N=A.target;N.removeEventListener("dispose",v);const C=u.indexOf(N.__bindingPointIndex);u.splice(C,1),a.deleteBuffer(l[N.id]),delete l[N.id],delete c[N.id]}function y(){for(const A in l)a.deleteBuffer(l[A]);u=[],l={},c={}}return{bind:m,update:p,dispose:y}}const V3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let qi=null;function k3(){return qi===null&&(qi=new RA(V3,16,16,ir,La),qi.name="DFG_LUT",qi.minFilter=Cn,qi.magFilter=Cn,qi.wrapS=Ca,qi.wrapT=Ca,qi.generateMipmaps=!1,qi.needsUpdate=!0),qi}class j3{constructor(e={}){const{canvas:n=nA(),context:s=null,depth:l=!0,stencil:c=!1,alpha:u=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:x=!1,reversedDepthBuffer:g=!1,outputBufferType:S=_i}=e;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=u;const E=S,v=new Set([wm,Am,Tm]),y=new Set([_i,ia,Gl,Vl,Mm,Em]),A=new Uint32Array(4),N=new Int32Array(4),C=new Q;let I=null,U=null;const z=[],T=[];let F=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ta,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const X=this;let B=!1,j=null;this._outputColorSpace=Ci;let ie=0,ae=0,V=null,O=-1,G=null;const $=new un,he=new un;let ge=null;const H=new dt(0);let K=0,ye=n.width,ee=n.height,Ee=1,te=null,se=null;const me=new un(0,0,ye,ee),Ae=new un(0,0,ye,ee);let Ke=!1;const Ye=new Um;let Dt=!1,ut=!1;const mt=new on,Pt=new Q,ft=new un,fn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Qt=!1;function Nn(){return V===null?Ee:1}let Y=s;function sn(D,Z){return n.getContext(D,Z)}try{const D={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:_,failIfMajorPerformanceCaveat:x};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${ym}`),n.addEventListener("webglcontextlost",we,!1),n.addEventListener("webglcontextrestored",qe,!1),n.addEventListener("webglcontextcreationerror",it,!1),Y===null){const Z="webgl2";if(Y=sn(Z,D),Y===null)throw sn(Z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw At("WebGLRenderer: "+D.message),D}let gt,Vt,De,en,P,w,ne,Me,Re,Ne,Pe,_e,xe,ze,Ie,Ue,Le,at,st,_t,W,Ce,Se;function He(){gt=new kR(Y),gt.init(),W=new O3(Y,gt),Vt=new PR(Y,gt,e,W),De=new L3(Y,gt),Vt.reversedDepthBuffer&&g&&De.buffers.depth.setReversed(!0),en=new WR(Y),P=new x3,w=new U3(Y,gt,De,P,Vt,W,en),ne=new VR(X),Me=new KA(Y),Ce=new UR(Y,Me),Re=new jR(Y,Me,en,Ce),Ne=new YR(Y,Re,Me,Ce,en),at=new qR(Y,Vt,w),Ie=new zR(P),Pe=new _3(X,ne,gt,Vt,Ce,Ie),_e=new H3(X,P),xe=new y3,ze=new A3(gt),Le=new LR(X,ne,De,Ne,M,m),Ue=new N3(X,Ne,Vt),Se=new G3(Y,en,Vt,De),st=new OR(Y,gt,en),_t=new XR(Y,gt,en),en.programs=Pe.programs,X.capabilities=Vt,X.extensions=gt,X.properties=P,X.renderLists=xe,X.shadowMap=Ue,X.state=De,X.info=en}He(),E!==_i&&(F=new KR(E,n.width,n.height,l,c));const Oe=new F3(X,Y);this.xr=Oe,this.getContext=function(){return Y},this.getContextAttributes=function(){return Y.getContextAttributes()},this.forceContextLoss=function(){const D=gt.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=gt.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return Ee},this.setPixelRatio=function(D){D!==void 0&&(Ee=D,this.setSize(ye,ee,!1))},this.getSize=function(D){return D.set(ye,ee)},this.setSize=function(D,Z,ue=!0){if(Oe.isPresenting){tt("WebGLRenderer: Can't change size while VR device is presenting.");return}ye=D,ee=Z,n.width=Math.floor(D*Ee),n.height=Math.floor(Z*Ee),ue===!0&&(n.style.width=D+"px",n.style.height=Z+"px"),F!==null&&F.setSize(n.width,n.height),this.setViewport(0,0,D,Z)},this.getDrawingBufferSize=function(D){return D.set(ye*Ee,ee*Ee).floor()},this.setDrawingBufferSize=function(D,Z,ue){ye=D,ee=Z,Ee=ue,n.width=Math.floor(D*ue),n.height=Math.floor(Z*ue),this.setViewport(0,0,D,Z)},this.setEffects=function(D){if(E===_i){At("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(D){for(let Z=0;Z<D.length;Z++)if(D[Z].isOutputPass===!0){tt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}F.setEffects(D||[])},this.getCurrentViewport=function(D){return D.copy($)},this.getViewport=function(D){return D.copy(me)},this.setViewport=function(D,Z,ue,le){D.isVector4?me.set(D.x,D.y,D.z,D.w):me.set(D,Z,ue,le),De.viewport($.copy(me).multiplyScalar(Ee).round())},this.getScissor=function(D){return D.copy(Ae)},this.setScissor=function(D,Z,ue,le){D.isVector4?Ae.set(D.x,D.y,D.z,D.w):Ae.set(D,Z,ue,le),De.scissor(he.copy(Ae).multiplyScalar(Ee).round())},this.getScissorTest=function(){return Ke},this.setScissorTest=function(D){De.setScissorTest(Ke=D)},this.setOpaqueSort=function(D){te=D},this.setTransparentSort=function(D){se=D},this.getClearColor=function(D){return D.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor(...arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha(...arguments)},this.clear=function(D=!0,Z=!0,ue=!0){let le=0;if(D){let ce=!1;if(V!==null){const Be=V.texture.format;ce=v.has(Be)}if(ce){const Be=V.texture.type,ke=y.has(Be),Fe=Le.getClearColor(),Xe=Le.getClearAlpha(),je=Fe.r,Je=Fe.g,lt=Fe.b;ke?(A[0]=je,A[1]=Je,A[2]=lt,A[3]=Xe,Y.clearBufferuiv(Y.COLOR,0,A)):(N[0]=je,N[1]=Je,N[2]=lt,N[3]=Xe,Y.clearBufferiv(Y.COLOR,0,N))}else le|=Y.COLOR_BUFFER_BIT}Z&&(le|=Y.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ue&&(le|=Y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),le!==0&&Y.clear(le)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(D){D.setRenderer(this),j=D},this.dispose=function(){n.removeEventListener("webglcontextlost",we,!1),n.removeEventListener("webglcontextrestored",qe,!1),n.removeEventListener("webglcontextcreationerror",it,!1),Le.dispose(),xe.dispose(),ze.dispose(),P.dispose(),ne.dispose(),Ne.dispose(),Ce.dispose(),Se.dispose(),Pe.dispose(),Oe.dispose(),Oe.removeEventListener("sessionstart",wo),Oe.removeEventListener("sessionend",Ro),Fn.stop()};function we(D){D.preventDefault(),ef("WebGLRenderer: Context Lost."),B=!0}function qe(){ef("WebGLRenderer: Context Restored."),B=!1;const D=en.autoReset,Z=Ue.enabled,ue=Ue.autoUpdate,le=Ue.needsUpdate,ce=Ue.type;He(),en.autoReset=D,Ue.enabled=Z,Ue.autoUpdate=ue,Ue.needsUpdate=le,Ue.type=ce}function it(D){At("WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function rn(D){const Z=D.target;Z.removeEventListener("dispose",rn),Nt(Z)}function Nt(D){vi(D),P.remove(D)}function vi(D){const Z=P.get(D).programs;Z!==void 0&&(Z.forEach(function(ue){Pe.releaseProgram(ue)}),D.isShaderMaterial&&Pe.releaseShaderCache(D))}this.renderBufferDirect=function(D,Z,ue,le,ce,Be){Z===null&&(Z=fn);const ke=ce.isMesh&&ce.matrixWorld.determinant()<0,Fe=Ia(D,Z,ue,le,ce);De.setMaterial(le,ke);let Xe=ue.index,je=1;if(le.wireframe===!0){if(Xe=Re.getWireframeAttribute(ue),Xe===void 0)return;je=2}const Je=ue.drawRange,lt=ue.attributes.position;let Qe=Je.start*je,wt=(Je.start+Je.count)*je;Be!==null&&(Qe=Math.max(Qe,Be.start*je),wt=Math.min(wt,(Be.start+Be.count)*je)),Xe!==null?(Qe=Math.max(Qe,0),wt=Math.min(wt,Xe.count)):lt!=null&&(Qe=Math.max(Qe,0),wt=Math.min(wt,lt.count));const tn=wt-Qe;if(tn<0||tn===1/0)return;Ce.setup(ce,le,Fe,ue,Xe);let Zt,zt=st;if(Xe!==null&&(Zt=Me.get(Xe),zt=_t,zt.setIndex(Zt)),ce.isMesh)le.wireframe===!0?(De.setLineWidth(le.wireframeLinewidth*Nn()),zt.setMode(Y.LINES)):zt.setMode(Y.TRIANGLES);else if(ce.isLine){let It=le.linewidth;It===void 0&&(It=1),De.setLineWidth(It*Nn()),ce.isLineSegments?zt.setMode(Y.LINES):ce.isLineLoop?zt.setMode(Y.LINE_LOOP):zt.setMode(Y.LINE_STRIP)}else ce.isPoints?zt.setMode(Y.POINTS):ce.isSprite&&zt.setMode(Y.TRIANGLES);if(ce.isBatchedMesh)if(gt.get("WEBGL_multi_draw"))zt.renderMultiDraw(ce._multiDrawStarts,ce._multiDrawCounts,ce._multiDrawCount);else{const It=ce._multiDrawStarts,Ve=ce._multiDrawCounts,Bn=ce._multiDrawCount,xt=Xe?Me.get(Xe).bytesPerElement:1,bn=P.get(le).currentProgram.getUniforms();for(let ri=0;ri<Bn;ri++)bn.setValue(Y,"_gl_DrawID",ri),zt.render(It[ri]/xt,Ve[ri])}else if(ce.isInstancedMesh)zt.renderInstances(Qe,tn,ce.count);else if(ue.isInstancedBufferGeometry){const It=ue._maxInstanceCount!==void 0?ue._maxInstanceCount:1/0,Ve=Math.min(ue.instanceCount,It);zt.renderInstances(Qe,tn,Ve)}else zt.render(Qe,tn)};function si(D,Z,ue){D.transparent===!0&&D.side===Ki&&D.forceSinglePass===!1?(D.side=ii,D.needsUpdate=!0,pr(D,Z,ue),D.side=Es,D.needsUpdate=!0,pr(D,Z,ue),D.side=Ki):pr(D,Z,ue)}this.compile=function(D,Z,ue=null){ue===null&&(ue=D),U=ze.get(ue),U.init(Z),T.push(U),ue.traverseVisible(function(ce){ce.isLight&&ce.layers.test(Z.layers)&&(U.pushLight(ce),ce.castShadow&&U.pushShadow(ce))}),D!==ue&&D.traverseVisible(function(ce){ce.isLight&&ce.layers.test(Z.layers)&&(U.pushLight(ce),ce.castShadow&&U.pushShadow(ce))}),U.setupLights();const le=new Set;return D.traverse(function(ce){if(!(ce.isMesh||ce.isPoints||ce.isLine||ce.isSprite))return;const Be=ce.material;if(Be)if(Array.isArray(Be))for(let ke=0;ke<Be.length;ke++){const Fe=Be[ke];si(Fe,ue,ce),le.add(Fe)}else si(Be,ue,ce),le.add(Be)}),U=T.pop(),le},this.compileAsync=function(D,Z,ue=null){const le=this.compile(D,Z,ue);return new Promise(ce=>{function Be(){if(le.forEach(function(ke){P.get(ke).currentProgram.isReady()&&le.delete(ke)}),le.size===0){ce(D);return}setTimeout(Be,10)}gt.get("KHR_parallel_shader_compile")!==null?Be():setTimeout(Be,10)})};let Rs=null;function Ao(D){Rs&&Rs(D)}function wo(){Fn.stop()}function Ro(){Fn.start()}const Fn=new bS;Fn.setAnimationLoop(Ao),typeof self<"u"&&Fn.setContext(self),this.setAnimationLoop=function(D){Rs=D,Oe.setAnimationLoop(D),D===null?Fn.stop():Fn.start()},Oe.addEventListener("sessionstart",wo),Oe.addEventListener("sessionend",Ro),this.render=function(D,Z){if(Z!==void 0&&Z.isCamera!==!0){At("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;j!==null&&j.renderStart(D,Z);const ue=Oe.enabled===!0&&Oe.isPresenting===!0,le=F!==null&&(V===null||ue)&&F.begin(X,V);if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Z.parent===null&&Z.matrixWorldAutoUpdate===!0&&Z.updateMatrixWorld(),Oe.enabled===!0&&Oe.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(Oe.cameraAutoUpdate===!0&&Oe.updateCamera(Z),Z=Oe.getCamera()),D.isScene===!0&&D.onBeforeRender(X,D,Z,V),U=ze.get(D,T.length),U.init(Z),U.state.textureUnits=w.getTextureUnits(),T.push(U),mt.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),Ye.setFromProjectionMatrix(mt,$i,Z.reversedDepth),ut=this.localClippingEnabled,Dt=Ie.init(this.clippingPlanes,ut),I=xe.get(D,z.length),I.init(),z.push(I),Oe.enabled===!0&&Oe.isPresenting===!0){const ke=X.xr.getDepthSensingMesh();ke!==null&&hn(ke,Z,-1/0,X.sortObjects)}hn(D,Z,0,X.sortObjects),I.finish(),X.sortObjects===!0&&I.sort(te,se),Qt=Oe.enabled===!1||Oe.isPresenting===!1||Oe.hasDepthSensing()===!1,Qt&&Le.addToRenderList(I,D),this.info.render.frame++,Dt===!0&&Ie.beginShadows();const ce=U.state.shadowsArray;if(Ue.render(ce,D,Z),Dt===!0&&Ie.endShadows(),this.info.autoReset===!0&&this.info.reset(),(le&&F.hasRenderPass())===!1){const ke=I.opaque,Fe=I.transmissive;if(U.setupLights(),Z.isArrayCamera){const Xe=Z.cameras;if(Fe.length>0)for(let je=0,Je=Xe.length;je<Je;je++){const lt=Xe[je];ra(ke,Fe,D,lt)}Qt&&Le.render(D);for(let je=0,Je=Xe.length;je<Je;je++){const lt=Xe[je];Ln(I,D,lt,lt.viewport)}}else Fe.length>0&&ra(ke,Fe,D,Z),Qt&&Le.render(D),Ln(I,D,Z)}V!==null&&ae===0&&(w.updateMultisampleRenderTarget(V),w.updateRenderTargetMipmap(V)),le&&F.end(X),D.isScene===!0&&D.onAfterRender(X,D,Z),Ce.resetDefaultState(),O=-1,G=null,T.pop(),T.length>0?(U=T[T.length-1],w.setTextureUnits(U.state.textureUnits),Dt===!0&&Ie.setGlobalState(X.clippingPlanes,U.state.camera)):U=null,z.pop(),z.length>0?I=z[z.length-1]:I=null,j!==null&&j.renderEnd()};function hn(D,Z,ue,le){if(D.visible===!1)return;if(D.layers.test(Z.layers)){if(D.isGroup)ue=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(Z);else if(D.isLightProbeGrid)U.pushLightProbeGrid(D);else if(D.isLight)U.pushLight(D),D.castShadow&&U.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||Ye.intersectsSprite(D)){le&&ft.setFromMatrixPosition(D.matrixWorld).applyMatrix4(mt);const ke=Ne.update(D),Fe=D.material;Fe.visible&&I.push(D,ke,Fe,ue,ft.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||Ye.intersectsObject(D))){const ke=Ne.update(D),Fe=D.material;if(le&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),ft.copy(D.boundingSphere.center)):(ke.boundingSphere===null&&ke.computeBoundingSphere(),ft.copy(ke.boundingSphere.center)),ft.applyMatrix4(D.matrixWorld).applyMatrix4(mt)),Array.isArray(Fe)){const Xe=ke.groups;for(let je=0,Je=Xe.length;je<Je;je++){const lt=Xe[je],Qe=Fe[lt.materialIndex];Qe&&Qe.visible&&I.push(D,ke,Qe,ue,ft.z,lt)}}else Fe.visible&&I.push(D,ke,Fe,ue,ft.z,null)}}const Be=D.children;for(let ke=0,Fe=Be.length;ke<Fe;ke++)hn(Be[ke],Z,ue,le)}function Ln(D,Z,ue,le){const{opaque:ce,transmissive:Be,transparent:ke}=D;U.setupLightsView(ue),Dt===!0&&Ie.setGlobalState(X.clippingPlanes,ue),le&&De.viewport($.copy(le)),ce.length>0&&Pa(ce,Z,ue),Be.length>0&&Pa(Be,Z,ue),ke.length>0&&Pa(ke,Z,ue),De.buffers.depth.setTest(!0),De.buffers.depth.setMask(!0),De.buffers.color.setMask(!0),De.setPolygonOffset(!1)}function ra(D,Z,ue,le){if((ue.isScene===!0?ue.overrideMaterial:null)!==null)return;if(U.state.transmissionRenderTarget[le.id]===void 0){const Qe=gt.has("EXT_color_buffer_half_float")||gt.has("EXT_color_buffer_float");U.state.transmissionRenderTarget[le.id]=new na(1,1,{generateMipmaps:!0,type:Qe?La:_i,minFilter:er,samples:Math.max(4,Vt.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Tt.workingColorSpace})}const Be=U.state.transmissionRenderTarget[le.id],ke=le.viewport||$;Be.setSize(ke.z*X.transmissionResolutionScale,ke.w*X.transmissionResolutionScale);const Fe=X.getRenderTarget(),Xe=X.getActiveCubeFace(),je=X.getActiveMipmapLevel();X.setRenderTarget(Be),X.getClearColor(H),K=X.getClearAlpha(),K<1&&X.setClearColor(16777215,.5),X.clear(),Qt&&Le.render(ue);const Je=X.toneMapping;X.toneMapping=ta;const lt=le.viewport;if(le.viewport!==void 0&&(le.viewport=void 0),U.setupLightsView(le),Dt===!0&&Ie.setGlobalState(X.clippingPlanes,le),Pa(D,ue,le),w.updateMultisampleRenderTarget(Be),w.updateRenderTargetMipmap(Be),gt.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let wt=0,tn=Z.length;wt<tn;wt++){const Zt=Z[wt],{object:zt,geometry:It,material:Ve,group:Bn}=Zt;if(Ve.side===Ki&&zt.layers.test(le.layers)){const xt=Ve.side;Ve.side=ii,Ve.needsUpdate=!0,Yl(zt,ue,le,It,Ve,Bn),Ve.side=xt,Ve.needsUpdate=!0,Qe=!0}}Qe===!0&&(w.updateMultisampleRenderTarget(Be),w.updateRenderTargetMipmap(Be))}X.setRenderTarget(Fe,Xe,je),X.setClearColor(H,K),lt!==void 0&&(le.viewport=lt),X.toneMapping=Je}function Pa(D,Z,ue){const le=Z.isScene===!0?Z.overrideMaterial:null;for(let ce=0,Be=D.length;ce<Be;ce++){const ke=D[ce],{object:Fe,geometry:Xe,group:je}=ke;let Je=ke.material;Je.allowOverride===!0&&le!==null&&(Je=le),Fe.layers.test(ue.layers)&&Yl(Fe,Z,ue,Xe,Je,je)}}function Yl(D,Z,ue,le,ce,Be){D.onBeforeRender(X,Z,ue,le,ce,Be),D.modelViewMatrix.multiplyMatrices(ue.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),ce.onBeforeRender(X,Z,ue,le,D,Be),ce.transparent===!0&&ce.side===Ki&&ce.forceSinglePass===!1?(ce.side=ii,ce.needsUpdate=!0,X.renderBufferDirect(ue,Z,le,ce,D,Be),ce.side=Es,ce.needsUpdate=!0,X.renderBufferDirect(ue,Z,le,ce,D,Be),ce.side=Ki):X.renderBufferDirect(ue,Z,le,ce,D,Be),D.onAfterRender(X,Z,ue,le,ce,Be)}function pr(D,Z,ue){Z.isScene!==!0&&(Z=fn);const le=P.get(D),ce=U.state.lights,Be=U.state.shadowsArray,ke=ce.state.version,Fe=Pe.getParameters(D,ce.state,Be,Z,ue,U.state.lightProbeGridArray),Xe=Pe.getProgramCacheKey(Fe);let je=le.programs;le.environment=D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial?Z.environment:null,le.fog=Z.fog;const Je=D.isMeshStandardMaterial||D.isMeshLambertMaterial&&!D.envMap||D.isMeshPhongMaterial&&!D.envMap;le.envMap=ne.get(D.envMap||le.environment,Je),le.envMapRotation=le.environment!==null&&D.envMap===null?Z.environmentRotation:D.envMapRotation,je===void 0&&(D.addEventListener("dispose",rn),je=new Map,le.programs=je);let lt=je.get(Xe);if(lt!==void 0){if(le.currentProgram===lt&&le.lightsStateVersion===ke)return za(D,Fe),lt}else Fe.uniforms=Pe.getUniforms(D),j!==null&&D.isNodeMaterial&&j.build(D,ue,Fe),D.onBeforeCompile(Fe,X),lt=Pe.acquireProgram(Fe,Xe),je.set(Xe,lt),le.uniforms=Fe.uniforms;const Qe=le.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Qe.clippingPlanes=Ie.uniform),za(D,Fe),le.needsLights=Cs(D),le.lightsStateVersion=ke,le.needsLights&&(Qe.ambientLightColor.value=ce.state.ambient,Qe.lightProbe.value=ce.state.probe,Qe.directionalLights.value=ce.state.directional,Qe.directionalLightShadows.value=ce.state.directionalShadow,Qe.spotLights.value=ce.state.spot,Qe.spotLightShadows.value=ce.state.spotShadow,Qe.rectAreaLights.value=ce.state.rectArea,Qe.ltc_1.value=ce.state.rectAreaLTC1,Qe.ltc_2.value=ce.state.rectAreaLTC2,Qe.pointLights.value=ce.state.point,Qe.pointLightShadows.value=ce.state.pointShadow,Qe.hemisphereLights.value=ce.state.hemi,Qe.directionalShadowMatrix.value=ce.state.directionalShadowMatrix,Qe.spotLightMatrix.value=ce.state.spotLightMatrix,Qe.spotLightMap.value=ce.state.spotLightMap,Qe.pointShadowMatrix.value=ce.state.pointShadowMatrix),le.lightProbeGrid=U.state.lightProbeGridArray.length>0,le.currentProgram=lt,le.uniformsList=null,lt}function Co(D){if(D.uniformsList===null){const Z=D.currentProgram.getUniforms();D.uniformsList=Xu.seqWithValue(Z.seq,D.uniforms)}return D.uniformsList}function za(D,Z){const ue=P.get(D);ue.outputColorSpace=Z.outputColorSpace,ue.batching=Z.batching,ue.batchingColor=Z.batchingColor,ue.instancing=Z.instancing,ue.instancingColor=Z.instancingColor,ue.instancingMorph=Z.instancingMorph,ue.skinning=Z.skinning,ue.morphTargets=Z.morphTargets,ue.morphNormals=Z.morphNormals,ue.morphColors=Z.morphColors,ue.morphTargetsCount=Z.morphTargetsCount,ue.numClippingPlanes=Z.numClippingPlanes,ue.numIntersection=Z.numClipIntersection,ue.vertexAlphas=Z.vertexAlphas,ue.vertexTangents=Z.vertexTangents,ue.toneMapping=Z.toneMapping}function Do(D,Z){if(D.length===0)return null;if(D.length===1)return D[0].texture!==null?D[0]:null;C.setFromMatrixPosition(Z.matrixWorld);for(let ue=0,le=D.length;ue<le;ue++){const ce=D[ue];if(ce.texture!==null&&ce.boundingBox.containsPoint(C))return ce}return null}function Ia(D,Z,ue,le,ce){Z.isScene!==!0&&(Z=fn),w.resetTextureUnits();const Be=Z.fog,ke=le.isMeshStandardMaterial||le.isMeshLambertMaterial||le.isMeshPhongMaterial?Z.environment:null,Fe=V===null?X.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:Tt.workingColorSpace,Xe=le.isMeshStandardMaterial||le.isMeshLambertMaterial&&!le.envMap||le.isMeshPhongMaterial&&!le.envMap,je=ne.get(le.envMap||ke,Xe),Je=le.vertexColors===!0&&!!ue.attributes.color&&ue.attributes.color.itemSize===4,lt=!!ue.attributes.tangent&&(!!le.normalMap||le.anisotropy>0),Qe=!!ue.morphAttributes.position,wt=!!ue.morphAttributes.normal,tn=!!ue.morphAttributes.color;let Zt=ta;le.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(Zt=X.toneMapping);const zt=ue.morphAttributes.position||ue.morphAttributes.normal||ue.morphAttributes.color,It=zt!==void 0?zt.length:0,Ve=P.get(le),Bn=U.state.lights;if(Dt===!0&&(ut===!0||D!==G)){const Ut=D===G&&le.id===O;Ie.setState(le,D,Ut)}let xt=!1;le.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==Bn.state.version||Ve.outputColorSpace!==Fe||ce.isBatchedMesh&&Ve.batching===!1||!ce.isBatchedMesh&&Ve.batching===!0||ce.isBatchedMesh&&Ve.batchingColor===!0&&ce.colorTexture===null||ce.isBatchedMesh&&Ve.batchingColor===!1&&ce.colorTexture!==null||ce.isInstancedMesh&&Ve.instancing===!1||!ce.isInstancedMesh&&Ve.instancing===!0||ce.isSkinnedMesh&&Ve.skinning===!1||!ce.isSkinnedMesh&&Ve.skinning===!0||ce.isInstancedMesh&&Ve.instancingColor===!0&&ce.instanceColor===null||ce.isInstancedMesh&&Ve.instancingColor===!1&&ce.instanceColor!==null||ce.isInstancedMesh&&Ve.instancingMorph===!0&&ce.morphTexture===null||ce.isInstancedMesh&&Ve.instancingMorph===!1&&ce.morphTexture!==null||Ve.envMap!==je||le.fog===!0&&Ve.fog!==Be||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==Ie.numPlanes||Ve.numIntersection!==Ie.numIntersection)||Ve.vertexAlphas!==Je||Ve.vertexTangents!==lt||Ve.morphTargets!==Qe||Ve.morphNormals!==wt||Ve.morphColors!==tn||Ve.toneMapping!==Zt||Ve.morphTargetsCount!==It||!!Ve.lightProbeGrid!=U.state.lightProbeGridArray.length>0)&&(xt=!0):(xt=!0,Ve.__version=le.version);let bn=Ve.currentProgram;xt===!0&&(bn=pr(le,Z,ce),j&&le.isNodeMaterial&&j.onUpdateProgram(le,bn,Ve));let ri=!1,Ni=!1,oi=!1;const Ft=bn.getUniforms(),nn=Ve.uniforms;if(De.useProgram(bn.program)&&(ri=!0,Ni=!0,oi=!0),le.id!==O&&(O=le.id,Ni=!0),Ve.needsLights){const Ut=Do(U.state.lightProbeGridArray,ce);Ve.lightProbeGrid!==Ut&&(Ve.lightProbeGrid=Ut,Ni=!0)}if(ri||G!==D){De.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),Ft.setValue(Y,"projectionMatrix",D.projectionMatrix),Ft.setValue(Y,"viewMatrix",D.matrixWorldInverse);const Gi=Ft.map.cameraPosition;Gi!==void 0&&Gi.setValue(Y,Pt.setFromMatrixPosition(D.matrixWorld)),Vt.logarithmicDepthBuffer&&Ft.setValue(Y,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(le.isMeshPhongMaterial||le.isMeshToonMaterial||le.isMeshLambertMaterial||le.isMeshBasicMaterial||le.isMeshStandardMaterial||le.isShaderMaterial)&&Ft.setValue(Y,"isOrthographic",D.isOrthographicCamera===!0),G!==D&&(G=D,Ni=!0,oi=!0)}if(Ve.needsLights&&(Bn.state.directionalShadowMap.length>0&&Ft.setValue(Y,"directionalShadowMap",Bn.state.directionalShadowMap,w),Bn.state.spotShadowMap.length>0&&Ft.setValue(Y,"spotShadowMap",Bn.state.spotShadowMap,w),Bn.state.pointShadowMap.length>0&&Ft.setValue(Y,"pointShadowMap",Bn.state.pointShadowMap,w)),ce.isSkinnedMesh){Ft.setOptional(Y,ce,"bindMatrix"),Ft.setOptional(Y,ce,"bindMatrixInverse");const Ut=ce.skeleton;Ut&&(Ut.boneTexture===null&&Ut.computeBoneTexture(),Ft.setValue(Y,"boneTexture",Ut.boneTexture,w))}ce.isBatchedMesh&&(Ft.setOptional(Y,ce,"batchingTexture"),Ft.setValue(Y,"batchingTexture",ce._matricesTexture,w),Ft.setOptional(Y,ce,"batchingIdTexture"),Ft.setValue(Y,"batchingIdTexture",ce._indirectTexture,w),Ft.setOptional(Y,ce,"batchingColorTexture"),ce._colorsTexture!==null&&Ft.setValue(Y,"batchingColorTexture",ce._colorsTexture,w));const Li=ue.morphAttributes;if((Li.position!==void 0||Li.normal!==void 0||Li.color!==void 0)&&at.update(ce,ue,bn),(Ni||Ve.receiveShadow!==ce.receiveShadow)&&(Ve.receiveShadow=ce.receiveShadow,Ft.setValue(Y,"receiveShadow",ce.receiveShadow)),(le.isMeshStandardMaterial||le.isMeshLambertMaterial||le.isMeshPhongMaterial)&&le.envMap===null&&Z.environment!==null&&(nn.envMapIntensity.value=Z.environmentIntensity),nn.dfgLUT!==void 0&&(nn.dfgLUT.value=k3()),Ni){if(Ft.setValue(Y,"toneMappingExposure",X.toneMappingExposure),Ve.needsLights&&Fa(nn,oi),Be&&le.fog===!0&&_e.refreshFogUniforms(nn,Be),_e.refreshMaterialUniforms(nn,le,Ee,ee,U.state.transmissionRenderTarget[D.id]),Ve.needsLights&&Ve.lightProbeGrid){const Ut=Ve.lightProbeGrid;nn.probesSH.value=Ut.texture,nn.probesMin.value.copy(Ut.boundingBox.min),nn.probesMax.value.copy(Ut.boundingBox.max),nn.probesResolution.value.copy(Ut.resolution)}Xu.upload(Y,Co(Ve),nn,w)}if(le.isShaderMaterial&&le.uniformsNeedUpdate===!0&&(Xu.upload(Y,Co(Ve),nn,w),le.uniformsNeedUpdate=!1),le.isSpriteMaterial&&Ft.setValue(Y,"center",ce.center),Ft.setValue(Y,"modelViewMatrix",ce.modelViewMatrix),Ft.setValue(Y,"normalMatrix",ce.normalMatrix),Ft.setValue(Y,"modelMatrix",ce.matrixWorld),le.uniformsGroups!==void 0){const Ut=le.uniformsGroups;for(let Gi=0,Ha=Ut.length;Gi<Ha;Gi++){const Ds=Ut[Gi];Se.update(Ds,bn),Se.bind(Ds,bn)}}return bn}function Fa(D,Z){D.ambientLightColor.needsUpdate=Z,D.lightProbe.needsUpdate=Z,D.directionalLights.needsUpdate=Z,D.directionalLightShadows.needsUpdate=Z,D.pointLights.needsUpdate=Z,D.pointLightShadows.needsUpdate=Z,D.spotLights.needsUpdate=Z,D.spotLightShadows.needsUpdate=Z,D.rectAreaLights.needsUpdate=Z,D.hemisphereLights.needsUpdate=Z}function Cs(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return ie},this.getActiveMipmapLevel=function(){return ae},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(D,Z,ue){const le=P.get(D);le.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,le.__autoAllocateDepthBuffer===!1&&(le.__useRenderToTexture=!1),P.get(D.texture).__webglTexture=Z,P.get(D.depthTexture).__webglTexture=le.__autoAllocateDepthBuffer?void 0:ue,le.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,Z){const ue=P.get(D);ue.__webglFramebuffer=Z,ue.__useDefaultFramebuffer=Z===void 0};const Ba=Y.createFramebuffer();this.setRenderTarget=function(D,Z=0,ue=0){V=D,ie=Z,ae=ue;let le=null,ce=!1,Be=!1;if(D){const Fe=P.get(D);if(Fe.__useDefaultFramebuffer!==void 0){De.bindFramebuffer(Y.FRAMEBUFFER,Fe.__webglFramebuffer),$.copy(D.viewport),he.copy(D.scissor),ge=D.scissorTest,De.viewport($),De.scissor(he),De.setScissorTest(ge),O=-1;return}else if(Fe.__webglFramebuffer===void 0)w.setupRenderTarget(D);else if(Fe.__hasExternalTextures)w.rebindTextures(D,P.get(D.texture).__webglTexture,P.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const Je=D.depthTexture;if(Fe.__boundDepthTexture!==Je){if(Je!==null&&P.has(Je)&&(D.width!==Je.image.width||D.height!==Je.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(D)}}const Xe=D.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Be=!0);const je=P.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(je[Z])?le=je[Z][ue]:le=je[Z],ce=!0):D.samples>0&&w.useMultisampledRTT(D)===!1?le=P.get(D).__webglMultisampledFramebuffer:Array.isArray(je)?le=je[ue]:le=je,$.copy(D.viewport),he.copy(D.scissor),ge=D.scissorTest}else $.copy(me).multiplyScalar(Ee).floor(),he.copy(Ae).multiplyScalar(Ee).floor(),ge=Ke;if(ue!==0&&(le=Ba),De.bindFramebuffer(Y.FRAMEBUFFER,le)&&De.drawBuffers(D,le),De.viewport($),De.scissor(he),De.setScissorTest(ge),ce){const Fe=P.get(D.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Fe.__webglTexture,ue)}else if(Be){const Fe=Z;for(let Xe=0;Xe<D.textures.length;Xe++){const je=P.get(D.textures[Xe]);Y.framebufferTextureLayer(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0+Xe,je.__webglTexture,ue,Fe)}}else if(D!==null&&ue!==0){const Fe=P.get(D.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Fe.__webglTexture,ue)}O=-1},this.readRenderTargetPixels=function(D,Z,ue,le,ce,Be,ke,Fe=0){if(!(D&&D.isWebGLRenderTarget)){At("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Xe=P.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&ke!==void 0&&(Xe=Xe[ke]),Xe){De.bindFramebuffer(Y.FRAMEBUFFER,Xe);try{const je=D.textures[Fe],Je=je.format,lt=je.type;if(D.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Fe),!Vt.textureFormatReadable(Je)){At("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Vt.textureTypeReadable(lt)){At("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Z>=0&&Z<=D.width-le&&ue>=0&&ue<=D.height-ce&&Y.readPixels(Z,ue,le,ce,W.convert(Je),W.convert(lt),Be)}finally{const je=V!==null?P.get(V).__webglFramebuffer:null;De.bindFramebuffer(Y.FRAMEBUFFER,je)}}},this.readRenderTargetPixelsAsync=async function(D,Z,ue,le,ce,Be,ke,Fe=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Xe=P.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&ke!==void 0&&(Xe=Xe[ke]),Xe)if(Z>=0&&Z<=D.width-le&&ue>=0&&ue<=D.height-ce){De.bindFramebuffer(Y.FRAMEBUFFER,Xe);const je=D.textures[Fe],Je=je.format,lt=je.type;if(D.textures.length>1&&Y.readBuffer(Y.COLOR_ATTACHMENT0+Fe),!Vt.textureFormatReadable(Je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Vt.textureTypeReadable(lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Qe=Y.createBuffer();Y.bindBuffer(Y.PIXEL_PACK_BUFFER,Qe),Y.bufferData(Y.PIXEL_PACK_BUFFER,Be.byteLength,Y.STREAM_READ),Y.readPixels(Z,ue,le,ce,W.convert(Je),W.convert(lt),0);const wt=V!==null?P.get(V).__webglFramebuffer:null;De.bindFramebuffer(Y.FRAMEBUFFER,wt);const tn=Y.fenceSync(Y.SYNC_GPU_COMMANDS_COMPLETE,0);return Y.flush(),await iA(Y,tn,4),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,Qe),Y.getBufferSubData(Y.PIXEL_PACK_BUFFER,0,Be),Y.deleteBuffer(Qe),Y.deleteSync(tn),Be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,Z=null,ue=0){const le=Math.pow(2,-ue),ce=Math.floor(D.image.width*le),Be=Math.floor(D.image.height*le),ke=Z!==null?Z.x:0,Fe=Z!==null?Z.y:0;w.setTexture2D(D,0),Y.copyTexSubImage2D(Y.TEXTURE_2D,ue,0,0,ke,Fe,ce,Be),De.unbindTexture()};const mn=Y.createFramebuffer(),Zl=Y.createFramebuffer();this.copyTextureToTexture=function(D,Z,ue=null,le=null,ce=0,Be=0){let ke,Fe,Xe,je,Je,lt,Qe,wt,tn;const Zt=D.isCompressedTexture?D.mipmaps[Be]:D.image;if(ue!==null)ke=ue.max.x-ue.min.x,Fe=ue.max.y-ue.min.y,Xe=ue.isBox3?ue.max.z-ue.min.z:1,je=ue.min.x,Je=ue.min.y,lt=ue.isBox3?ue.min.z:0;else{const nn=Math.pow(2,-ce);ke=Math.floor(Zt.width*nn),Fe=Math.floor(Zt.height*nn),D.isDataArrayTexture?Xe=Zt.depth:D.isData3DTexture?Xe=Math.floor(Zt.depth*nn):Xe=1,je=0,Je=0,lt=0}le!==null?(Qe=le.x,wt=le.y,tn=le.z):(Qe=0,wt=0,tn=0);const zt=W.convert(Z.format),It=W.convert(Z.type);let Ve;Z.isData3DTexture?(w.setTexture3D(Z,0),Ve=Y.TEXTURE_3D):Z.isDataArrayTexture||Z.isCompressedArrayTexture?(w.setTexture2DArray(Z,0),Ve=Y.TEXTURE_2D_ARRAY):(w.setTexture2D(Z,0),Ve=Y.TEXTURE_2D),De.activeTexture(Y.TEXTURE0),De.pixelStorei(Y.UNPACK_FLIP_Y_WEBGL,Z.flipY),De.pixelStorei(Y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),De.pixelStorei(Y.UNPACK_ALIGNMENT,Z.unpackAlignment);const Bn=De.getParameter(Y.UNPACK_ROW_LENGTH),xt=De.getParameter(Y.UNPACK_IMAGE_HEIGHT),bn=De.getParameter(Y.UNPACK_SKIP_PIXELS),ri=De.getParameter(Y.UNPACK_SKIP_ROWS),Ni=De.getParameter(Y.UNPACK_SKIP_IMAGES);De.pixelStorei(Y.UNPACK_ROW_LENGTH,Zt.width),De.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,Zt.height),De.pixelStorei(Y.UNPACK_SKIP_PIXELS,je),De.pixelStorei(Y.UNPACK_SKIP_ROWS,Je),De.pixelStorei(Y.UNPACK_SKIP_IMAGES,lt);const oi=D.isDataArrayTexture||D.isData3DTexture,Ft=Z.isDataArrayTexture||Z.isData3DTexture;if(D.isDepthTexture){const nn=P.get(D),Li=P.get(Z),Ut=P.get(nn.__renderTarget),Gi=P.get(Li.__renderTarget);De.bindFramebuffer(Y.READ_FRAMEBUFFER,Ut.__webglFramebuffer),De.bindFramebuffer(Y.DRAW_FRAMEBUFFER,Gi.__webglFramebuffer);for(let Ha=0;Ha<Xe;Ha++)oi&&(Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,P.get(D).__webglTexture,ce,lt+Ha),Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,P.get(Z).__webglTexture,Be,tn+Ha)),Y.blitFramebuffer(je,Je,ke,Fe,Qe,wt,ke,Fe,Y.DEPTH_BUFFER_BIT,Y.NEAREST);De.bindFramebuffer(Y.READ_FRAMEBUFFER,null),De.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else if(ce!==0||D.isRenderTargetTexture||P.has(D)){const nn=P.get(D),Li=P.get(Z);De.bindFramebuffer(Y.READ_FRAMEBUFFER,mn),De.bindFramebuffer(Y.DRAW_FRAMEBUFFER,Zl);for(let Ut=0;Ut<Xe;Ut++)oi?Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,nn.__webglTexture,ce,lt+Ut):Y.framebufferTexture2D(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,nn.__webglTexture,ce),Ft?Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Li.__webglTexture,Be,tn+Ut):Y.framebufferTexture2D(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Li.__webglTexture,Be),ce!==0?Y.blitFramebuffer(je,Je,ke,Fe,Qe,wt,ke,Fe,Y.COLOR_BUFFER_BIT,Y.NEAREST):Ft?Y.copyTexSubImage3D(Ve,Be,Qe,wt,tn+Ut,je,Je,ke,Fe):Y.copyTexSubImage2D(Ve,Be,Qe,wt,je,Je,ke,Fe);De.bindFramebuffer(Y.READ_FRAMEBUFFER,null),De.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else Ft?D.isDataTexture||D.isData3DTexture?Y.texSubImage3D(Ve,Be,Qe,wt,tn,ke,Fe,Xe,zt,It,Zt.data):Z.isCompressedArrayTexture?Y.compressedTexSubImage3D(Ve,Be,Qe,wt,tn,ke,Fe,Xe,zt,Zt.data):Y.texSubImage3D(Ve,Be,Qe,wt,tn,ke,Fe,Xe,zt,It,Zt):D.isDataTexture?Y.texSubImage2D(Y.TEXTURE_2D,Be,Qe,wt,ke,Fe,zt,It,Zt.data):D.isCompressedTexture?Y.compressedTexSubImage2D(Y.TEXTURE_2D,Be,Qe,wt,Zt.width,Zt.height,zt,Zt.data):Y.texSubImage2D(Y.TEXTURE_2D,Be,Qe,wt,ke,Fe,zt,It,Zt);De.pixelStorei(Y.UNPACK_ROW_LENGTH,Bn),De.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,xt),De.pixelStorei(Y.UNPACK_SKIP_PIXELS,bn),De.pixelStorei(Y.UNPACK_SKIP_ROWS,ri),De.pixelStorei(Y.UNPACK_SKIP_IMAGES,Ni),Be===0&&Z.generateMipmaps&&Y.generateMipmap(Ve),De.unbindTexture()},this.initRenderTarget=function(D){P.get(D).__webglFramebuffer===void 0&&w.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?w.setTextureCube(D,0):D.isData3DTexture?w.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?w.setTexture2DArray(D,0):w.setTexture2D(D,0),De.unbindTexture()},this.resetState=function(){ie=0,ae=0,V=null,De.reset(),Ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Tt._getDrawingBufferColorSpace(e),n.unpackColorSpace=Tt._getUnpackColorSpace()}}const ly={type:"change"},Pm={type:"start"},DS={type:"end"},zu=new Lm,cy=new gs,X3=Math.cos(70*rA.DEG2RAD),En=new Q,ni=2*Math.PI,Yt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},lp=1e-6;class W3 extends YA{constructor(e,n=null){super(e,n),this.state=Yt.NONE,this.target=new Q,this.cursor=new Q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:po.ROTATE,MIDDLE:po.DOLLY,RIGHT:po.PAN},this.touches={ONE:fo.ROTATE,TWO:fo.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new Q,this._lastQuaternion=new Ts,this._lastTargetPosition=new Q,this._quat=new Ts().setFromUnitVectors(e.up,new Q(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new zv,this._sphericalDelta=new zv,this._scale=1,this._panOffset=new Q,this._rotateStart=new nt,this._rotateEnd=new nt,this._rotateDelta=new nt,this._panStart=new nt,this._panEnd=new nt,this._panDelta=new nt,this._dollyStart=new nt,this._dollyEnd=new nt,this._dollyDelta=new nt,this._dollyDirection=new Q,this._mouse=new nt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Y3.bind(this),this._onPointerDown=q3.bind(this),this._onPointerUp=Z3.bind(this),this._onContextMenu=nD.bind(this),this._onMouseWheel=J3.bind(this),this._onKeyDown=$3.bind(this),this._onTouchStart=eD.bind(this),this._onTouchMove=tD.bind(this),this._onMouseDown=K3.bind(this),this._onMouseMove=Q3.bind(this),this._interceptControlDown=iD.bind(this),this._interceptControlUp=aD.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ly),this.update(),this.state=Yt.NONE}pan(e,n){this._pan(e,n),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const n=this.object.position;En.copy(n).sub(this.target),En.applyQuaternion(this._quat),this._spherical.setFromVector3(En),this.autoRotate&&this.state===Yt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=ni:s>Math.PI&&(s-=ni),l<-Math.PI?l+=ni:l>Math.PI&&(l-=ni),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const u=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=u!=this._spherical.radius}if(En.setFromSpherical(this._spherical),En.applyQuaternion(this._quatInverse),n.copy(this.target).add(En),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let u=null;if(this.object.isPerspectiveCamera){const d=En.length();u=this._clampDistance(d*this._scale);const m=d-u;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const d=new Q(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const p=new Q(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(d),this.object.updateMatrixWorld(),u=En.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;u!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(u).add(this.object.position):(zu.origin.copy(this.object.position),zu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(zu.direction))<X3?this.object.lookAt(this.target):(cy.setFromNormalAndCoplanarPoint(this.object.up,this.target),zu.intersectPlane(cy,this.target))))}else if(this.object.isOrthographicCamera){const u=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),u!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>lp||8*(1-this._lastQuaternion.dot(this.object.quaternion))>lp||this._lastTargetPosition.distanceToSquared(this.target)>lp?(this.dispatchEvent(ly),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ni/60*this.autoRotateSpeed*e:ni/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){En.setFromMatrixColumn(n,0),En.multiplyScalar(-e),this._panOffset.add(En)}_panUp(e,n){this.screenSpacePanning===!0?En.setFromMatrixColumn(n,1):(En.setFromMatrixColumn(n,0),En.crossVectors(this.object.up,En)),En.multiplyScalar(e),this._panOffset.add(En)}_pan(e,n){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;En.copy(l).sub(this.target);let c=En.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*c/s.clientHeight,this.object.matrix),this._panUp(2*n*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=e-s.left,c=n-s.top,u=s.width,d=s.height;this._mouse.x=l/u*2-1,this._mouse.y=-(c/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(ni*this._rotateDelta.x/n.clientHeight),this._rotateUp(ni*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),l=.5*(e.pageY+n.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),l=.5*(e.pageY+n.y);this._panStart.set(s,l)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),s=e.pageX-n.x,l=e.pageY-n.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const s=this._getSecondPointerPosition(e),l=.5*(e.pageX+s.x),c=.5*(e.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(ni*this._rotateDelta.x/n.clientHeight),this._rotateUp(ni*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),l=.5*(e.pageY+n.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),s=e.pageX-n.x,l=e.pageY-n.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const u=(e.pageX+n.x)*.5,d=(e.pageY+n.y)*.5;this._updateZoomParameters(u,d)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new nt,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function q3(a){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(a.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(a)&&(this._addPointer(a),a.pointerType==="touch"?this._onTouchStart(a):this._onMouseDown(a),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Y3(a){this.enabled!==!1&&(a.pointerType==="touch"?this._onTouchMove(a):this._onMouseMove(a))}function Z3(a){switch(this._removePointer(a),this._pointers.length){case 0:this.domElement.releasePointerCapture(a.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(DS),this.state=Yt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function K3(a){let e;switch(a.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case po.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(a),this.state=Yt.DOLLY;break;case po.ROTATE:if(a.ctrlKey||a.metaKey||a.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(a),this.state=Yt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(a),this.state=Yt.ROTATE}break;case po.PAN:if(a.ctrlKey||a.metaKey||a.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(a),this.state=Yt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(a),this.state=Yt.PAN}break;default:this.state=Yt.NONE}this.state!==Yt.NONE&&this.dispatchEvent(Pm)}function Q3(a){switch(this.state){case Yt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(a);break;case Yt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(a);break;case Yt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(a);break}}function J3(a){this.enabled===!1||this.enableZoom===!1||this.state!==Yt.NONE||(a.preventDefault(),this.dispatchEvent(Pm),this._handleMouseWheel(this._customWheelEvent(a)),this.dispatchEvent(DS))}function $3(a){this.enabled!==!1&&this._handleKeyDown(a)}function eD(a){switch(this._trackPointer(a),this._pointers.length){case 1:switch(this.touches.ONE){case fo.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(a),this.state=Yt.TOUCH_ROTATE;break;case fo.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(a),this.state=Yt.TOUCH_PAN;break;default:this.state=Yt.NONE}break;case 2:switch(this.touches.TWO){case fo.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(a),this.state=Yt.TOUCH_DOLLY_PAN;break;case fo.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(a),this.state=Yt.TOUCH_DOLLY_ROTATE;break;default:this.state=Yt.NONE}break;default:this.state=Yt.NONE}this.state!==Yt.NONE&&this.dispatchEvent(Pm)}function tD(a){switch(this._trackPointer(a),this.state){case Yt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(a),this.update();break;case Yt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(a),this.update();break;case Yt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(a),this.update();break;case Yt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(a),this.update();break;default:this.state=Yt.NONE}}function nD(a){this.enabled!==!1&&a.preventDefault()}function iD(a){a.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function aD(a){a.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const ar={CHL:{name:"CHL",label:"Chlorophyll-a Proxy",unit:"mg/m³",color:"#4ade80",description:"Indicates primary algal and phytoplankton biological productivity. Key marker for eutrophication."},aphy:{name:"aphy",label:"Phytoplankton Absorption",unit:"m⁻¹",color:"#e879f9",description:"Absorption coefficient mapping light absorption profiles of phytoplankton cells."},ADG:{name:"ADG",label:"Detritus & Gelbstoff",unit:"m⁻¹",color:"#fbbf24",description:"Colored dissolved organic matter (CDOM) and detrital particle absorption of light."},bbp:{name:"bbp",label:"Particulate Backscattering",unit:"m⁻¹",color:"#22d3ee",description:"Measure of light backscattered by mineral suspended particles and micro-organic scatterers."},TSM:{name:"TSM",label:"Suspended Solids",unit:"g/m³",color:"#f87171",description:"Total Dry Weight concentration of Suspended Matter. Measures overall water turbidity."},PAR:{name:"PAR",label:"Solar Radiation (PAR)",unit:"μE/m²s",color:"#facc15",description:"Photosynthetically Active Radiation. Measures solar energy available to primary producers."},KD490:{name:"KD490",label:"Light Attenuation",unit:"m⁻¹",color:"#60a5fa",description:"Diffuse vertical attenuation of light at 490nm. Defines photic depth of the column."}},uy={CHL:[{t:0,r:4,g:24,b:15},{t:.25,r:16,g:73,b:54},{t:.5,r:34,g:139,b:96},{t:.75,r:74,g:222,b:128},{t:1,r:163,g:230,b:53}],aphy:[{t:0,r:18,g:12,b:28},{t:.25,r:76,g:29,b:149},{t:.5,r:139,g:92,b:246},{t:.75,r:232,g:121,b:249},{t:1,r:253,g:244,b:255}],ADG:[{t:0,r:24,g:16,b:10},{t:.25,r:120,g:53,b:4},{t:.5,r:217,g:119,b:6},{t:.75,r:251,g:191,b:36},{t:1,r:254,g:252,b:232}],bbp:[{t:0,r:8,g:18,b:28},{t:.25,r:15,g:82,b:105},{t:.5,r:13,g:148,b:136},{t:.75,r:34,g:211,b:238},{t:1,r:224,g:242,b:254}],TSM:[{t:0,r:28,g:12,b:10},{t:.25,r:153,g:27,b:27},{t:.5,r:220,g:38,b:38},{t:.75,r:248,g:113,b:113},{t:1,r:254,g:242,b:242}],PAR:[{t:0,r:15,g:10,b:8},{t:.25,r:185,g:28,b:28},{t:.5,r:245,g:158,b:11},{t:.75,r:253,g:224,b:71},{t:1,r:255,g:255,b:255}],KD490:[{t:0,r:10,g:14,b:28},{t:.25,r:29,g:78,b:216},{t:.5,r:59,g:130,b:246},{t:.75,r:147,g:197,b:253},{t:1,r:240,g:246,b:255}]};function sD(a){const{r:e,g:n,b:s}=NS(a),l=e/255,c=n/255,u=s/255,d=Math.max(l,c,u),m=Math.min(l,c,u),p=(d+m)/2;let _=0,x=0;const g=d-m;if(g!==0){switch(x=g/(1-Math.abs(2*p-1)),d){case l:_=(c-u)/g%6;break;case c:_=(u-l)/g+2;break;case u:_=(l-c)/g+4;break}_*=60,_<0&&(_+=360)}return{h:_,s:x,l:p}}function rD(a,e,n){const s=(1-Math.abs(2*n-1))*e,l=s*(1-Math.abs(a/60%2-1)),c=n-s/2;let u=0,d=0,m=0;return a<60?[u,d,m]=[s,l,0]:a<120?[u,d,m]=[l,s,0]:a<180?[u,d,m]=[0,s,l]:a<240?[u,d,m]=[0,l,s]:a<300?[u,d,m]=[l,0,s]:[u,d,m]=[s,0,l],{r:Math.round((u+c)*255),g:Math.round((d+c)*255),b:Math.round((m+c)*255)}}function oD(a){const{h:e,s:n}=sD(a),s=[.08,.25,.45,.68,.92];return s.map((l,c)=>{const{r:u,g:d,b:m}=rD(e,Math.max(n,.35),l);return{t:c/(s.length-1),r:u,g:d,b:m}})}function NS(a){const e=a.replace("#","");return{r:parseInt(e.substring(0,2),16),g:parseInt(e.substring(2,4),16),b:parseInt(e.substring(4,6),16)}}function lD(a,e,n){const s=Math.max(0,Math.min(1,e)),l=NS(n||ar[a].color),c=Math.round(255+s*(l.r-255)),u=Math.round(255+s*(l.g-255)),d=Math.round(255+s*(l.b-255)),m=.05+s*.9;return{r:c,g:u,b:d,a:m}}function LS(a,e){return`linear-gradient(to right, ${(e?oD(e):uy[a]||uy.CHL).map(l=>`rgb(${l.r}, ${l.g}, ${l.b}) ${(l.t*100).toFixed(0)}%`).join(", ")})`}const fy=({dataCube:a,layerState:e,spacing:n,displacementGain:s,showTerrain:l,showWireframe:c,showLabels:u,cameraPreset:d,customColors:m})=>{const p=pe.useRef(null),_=pe.useRef(null),x=pe.useRef(null),g=pe.useRef(null),S=pe.useRef(null),M=pe.useRef(null),E=pe.useRef(new Map);return pe.useEffect(()=>{if(!p.current||!_.current)return;const v=p.current.clientWidth||600,y=p.current.clientHeight||450,A=new yA;A.background=new dt(197383),A.fog=new Nm(197383,.006),x.current=A;const N=new Di(40,v/y,.1,500);N.position.set(22,24,30),g.current=N;const C=new j3({canvas:_.current,antialias:!0,alpha:!1,powerPreference:"high-performance"});C.setSize(v,y),C.setPixelRatio(Math.min(window.devicePixelRatio,2)),C.toneMapping=Sm,C.toneMappingExposure=1;const I=new jA(16777215,.61);A.add(I);const U=new Pv(16777215,.8);U.position.set(15,40,20),A.add(U);const z=new Pv(11193599,.3);z.position.set(-20,20,-10),A.add(z);const T=new qA(32,32,2039605,789526);T.position.y=-6,A.add(T);const F=new Ul;A.add(F),M.current=F;const X=new W3(N,C.domElement);X.enableDamping=!0,X.dampingFactor=.08,X.minDistance=8,X.maxDistance=100,X.target.set(0,0,0),X.maxPolarAngle=Math.PI*.85,S.current=X;let B;const j=()=>{X.update(),E.current.forEach(({label:V})=>{V.visible&&V.quaternion.copy(N.quaternion)}),C.render(A,N),B=requestAnimationFrame(j)};j();const ie=()=>{if(!p.current)return;const V=p.current.clientWidth,O=p.current.clientHeight;V===0||O===0||(N.aspect=V/O,N.updateProjectionMatrix(),C.setSize(V,O))},ae=new ResizeObserver(ie);return ae.observe(p.current),()=>{cancelAnimationFrame(B),ae.disconnect(),C.dispose(),X.dispose(),E.current.forEach(({mesh:V,wireframe:O,border:G,label:$})=>{V.geometry.dispose(),Array.isArray(V.material)?V.material.forEach(he=>he.dispose()):V.material.dispose(),O.geometry.dispose(),O.material.dispose(),G.geometry.dispose(),G.material.dispose(),$.geometry.dispose(),$.material.dispose()}),E.current.clear()}},[]),pe.useEffect(()=>{const v=g.current,y=S.current;!v||!y||(d==="top"?(v.position.set(0,36,.1),y.target.set(0,0,0)):d==="profile"?(v.position.set(38,0,0),y.target.set(0,0,0)):(v.position.set(22,24,30),y.target.set(0,0,0)),y.update())},[d]),pe.useEffect(()=>{const v=M.current;if(!v)return;const y=["CHL","aphy","ADG","bbp","TSM","PAR","KD490"],A=a.gridSize;if(E.current.size!==y.length){for(;v.children.length>0;)v.remove(v.children[0]);E.current.clear(),y.forEach((C,I)=>{var ee;const U=ar[C],z=document.createElement("canvas");z.width=A,z.height=A;const T=new wv(z);T.magFilter=Cn,T.minFilter=Cn;const F=new Uint8ClampedArray(A*A*4),X=new ql(16,16,A-1,A-1),B=new Nu({map:T,transparent:!0,opacity:((ee=e[C])==null?void 0:ee.opacity)??.7,side:Ki,roughness:.45,metalness:.1,emissive:new dt(U.color),emissiveIntensity:.05}),j=new aa(X,B);j.rotation.x=-Math.PI/2;const ie=new OA(new Eo(16,.05,16)),ae=new nf({color:new dt(U.color),transparent:!0,opacity:.4}),V=new lm(ie,ae),O=new Rv(X),G=new nf({color:new dt(U.color),transparent:!0,opacity:.22}),$=new lm(O,G);$.rotation.x=-Math.PI/2;const he=document.createElement("canvas");he.width=192,he.height=40;const ge=he.getContext("2d");ge&&(ge.fillStyle="rgba(8, 8, 16, 0.8)",ge.roundRect(0,0,192,40,6),ge.fill(),ge.lineWidth=1.5,ge.strokeStyle=U.color,ge.stroke(),ge.fillStyle="#ffffff",ge.font="bold 15px sans-serif",ge.textAlign="left",ge.textBaseline="middle",ge.fillText(C,12,20),ge.fillStyle="rgba(255, 255, 255, 0.5)",ge.font="12px monospace",ge.fillText(U.label.length>15?U.label.substring(0,15)+"...":U.label,52,20));const H=new wv(he),K=new pS({map:H,transparent:!0,opacity:.9,depthTest:!1}),ye=new AA(K);ye.scale.set(4.5,.94,1),v.add(j),v.add($),v.add(V),v.add(ye),E.current.set(C,{mesh:j,wireframe:$,border:V,label:ye,textureCanvas:z,pixelBuffer:F})})}y.forEach((C,I)=>{const U=E.current.get(C);if(!U)return;const{mesh:z,wireframe:T,border:F,label:X,textureCanvas:B,pixelBuffer:j}=U,ie=a.channels[C],ae=a.stats[C],V=e[C]||{visible:!0,opacity:.7},O=ae.max-ae.min||1,G=new Array(A*A);for(let ee=0;ee<A;ee++)for(let Ee=0;Ee<A;Ee++)G[ee*A+Ee]=Math.max(0,Math.min(1,(ie[ee][Ee]-ae.min)/O));const $=z.geometry,he=$.attributes.position;for(let ee=0;ee<G.length;ee++){const Ee=l?G[ee]*s:0;he.setZ(ee,Ee)}he.needsUpdate=!0,$.computeVertexNormals(),T.geometry.dispose(),T.geometry=new Rv($);const ge=m==null?void 0:m[C],H=B.getContext("2d");if(H){for(let ee=0;ee<G.length;ee++){const{r:Ee,g:te,b:se,a:me}=lD(C,G[ee],ge),Ae=ee*4;j[Ae]=Ee,j[Ae+1]=te,j[Ae+2]=se,j[Ae+3]=Math.round(me*255)}H.putImageData(new ImageData(j,A,A),0,0),z.material instanceof Nu&&z.material.map&&(z.material.map.needsUpdate=!0)}const K=(I-(y.length-1)/2)*n;z.position.y=K,F.position.y=K,T.position.y=K,X.position.set(-11.5,K,0),z.visible=V.visible,F.visible=V.visible,T.visible=V.visible&&c,X.visible=V.visible&&u,z.material instanceof Nu&&(z.material.opacity=V.opacity);const ye=new dt(ge||ar[C].color);z.material instanceof Nu&&z.material.emissive.copy(ye),F.material.color.copy(ye),T.material.color.copy(ye)})},[a,e,n,s,l,c,u,m]),R.jsxs("div",{ref:p,className:"relative w-full h-full min-h-[400px]",children:[R.jsx("canvas",{ref:_,className:"w-full h-full block touch-none"}),R.jsx("div",{className:"absolute top-4 right-4 text-[10px] font-mono select-none px-2 py-1 border border-white/5 rounded backdrop-blur-md bg-black/45 text-white/50",children:"GL_VERSION: WebGL 2.0 · Orbit: Mouse/Touch"})]})},US=({label:a,gradient:e,value:n,defaultHex:s,onChange:l,onReset:c})=>{const[u,d]=pe.useState(!1),[m,p]=pe.useState(n||s),_=pe.useRef(null);pe.useEffect(()=>{p(n||s)},[n,s]),pe.useEffect(()=>{if(!u)return;const g=S=>{_.current&&!_.current.contains(S.target)&&d(!1)};return document.addEventListener("mousedown",g),()=>document.removeEventListener("mousedown",g)},[u]);const x=g=>{/^#[0-9a-fA-F]{6}$/.test(g)&&l(g)};return R.jsxs("div",{ref:_,className:"relative",children:[R.jsx("button",{type:"button",onClick:()=>d(g=>!g),className:"w-full h-3 rounded-sm border border-white/10 hover:border-white/30 transition-colors cursor-pointer",style:{background:e},title:`Customize ${a} color`}),u&&R.jsxs("div",{className:"absolute z-30 top-full mt-1.5 left-0 bg-[#0a0a14] border border-white/10 rounded-lg p-2.5 shadow-xl flex flex-col gap-2 min-w-[160px]",children:[R.jsxs("span",{className:"text-[10px] font-mono text-white/50 uppercase tracking-widest",children:[a," Color"]}),R.jsxs("div",{className:"flex items-center gap-2",children:[R.jsx("input",{type:"color",value:n||s,onChange:g=>{p(g.target.value),x(g.target.value)},className:"w-7 h-7 rounded cursor-pointer bg-transparent border border-white/10"}),R.jsx("input",{type:"text",value:m,onChange:g=>p(g.target.value),onBlur:()=>x(m),onKeyDown:g=>{g.key==="Enter"&&x(m)},className:"flex-1 bg-white/5 border border-white/10 rounded px-1.5 py-1 text-[11px] font-mono text-white/80 w-20",placeholder:"#rrggbb"})]}),R.jsx("button",{type:"button",onClick:()=>{c(),d(!1)},className:"text-[10px] font-mono text-white/40 hover:text-white/80 uppercase tracking-widest text-left",children:"Reset to default"})]})]})},hy=({config:a,onChangeConfig:e,isStreaming:n,onToggleStreaming:s,onResetStream:l,onUploadCSVData:c,customColors:u,onChangeCustomColor:d,onResetCustomColor:m,variableAverages:p,activeCSVFileName:_,csvFramesCount:x,currentCSVFrameIdx:g,onChangeCSVFrameIdx:S,cameraPreset:M,onChangeCameraPreset:E,showTerrain:v,onChangeShowTerrain:y,showWireframe:A,onChangeShowWireframe:N,showLabels:C,onChangeShowLabels:I,spacing:U,onChangeSpacing:z,displacementGain:T,onChangeDisplacementGain:F,dataCube:X})=>{const B=pe.useRef(null),[j,ie]=pe.useState(!1),[ae,V]=pe.useState(null),[O,G]=pe.useState({CHL:Array(25).fill(.5),aphy:Array(25).fill(.45),ADG:Array(25).fill(.4),bbp:Array(25).fill(.35),TSM:Array(25).fill(.5),PAR:Array(25).fill(.7),KD490:Array(25).fill(.4)});pe.useEffect(()=>{G(ee=>{const Ee={...ee};return Object.keys(p).forEach(te=>{const se=[...ee[te]||Array(25).fill(.5)];se.shift(),se.push(p[te]),Ee[te]=se}),Ee})},[p]);const $=ee=>{ee.preventDefault(),ee.stopPropagation(),ee.type==="dragenter"||ee.type==="dragover"?ie(!0):ee.type==="dragleave"&&ie(!1)},he=ee=>{V(null);const Ee=new FileReader;Ee.onload=te=>{var se;try{const me=(se=te.target)==null?void 0:se.result,Ae=ST(me);c(Ae,ee.name),e({mode:"uploaded"})}catch(me){console.error(me),V(me.message||"Failed to parse CSV. Check columns.")}},Ee.readAsText(ee)},ge=ee=>{ee.preventDefault(),ee.stopPropagation(),ie(!1),ee.dataTransfer.files&&ee.dataTransfer.files[0]&&he(ee.dataTransfer.files[0])},H=ee=>{ee.target.files&&ee.target.files[0]&&he(ee.target.files[0])},K=ee=>{V(null),e({mode:ee})},ye=ee=>{const Ae=110/(ee.length-1);return`M ${ee.map((Ye,Dt)=>{const ut=Dt*Ae,mt=24-(Ye-0)/1*20-2;return`${ut.toFixed(1)},${mt.toFixed(1)}`}).join(" L ")}`};return R.jsxs("div",{className:"@container flex flex-col gap-4 text-white h-full select-none",children:[R.jsxs("div",{className:"glass-panel rounded-lg p-3.5 flex flex-col gap-2",children:[R.jsxs("span",{className:"text-[11px] font-bold uppercase tracking-wider text-white/80 flex items-center gap-1.5",children:[R.jsx(gp,{size:13,className:"text-white/60"})," SELECT TELEMETRY COUPLING SOURCE"]}),R.jsxs("div",{className:"grid grid-cols-2 @lg:grid-cols-5 gap-1.5 mt-1",children:[R.jsx("button",{onClick:()=>K("synthetic"),className:`text-xs px-2 py-1.5 rounded font-medium border transition-all ${a.mode==="synthetic"?"bg-white/15 border-white/40 text-white shadow-[0_0_12px_rgba(255,255,255,0.1)]":"bg-white/3 border-transparent text-white/60 hover:bg-white/8 hover:text-white"}`,children:"Synthetic Stream"}),R.jsx("button",{onClick:()=>K("preset_coastal"),className:`text-xs px-2 py-1.5 rounded font-medium border transition-all ${a.mode==="preset_coastal"?"bg-white/15 border-white/40 text-white shadow-[0_0_12px_rgba(255,255,255,0.1)]":"bg-white/3 border-transparent text-white/60 hover:bg-white/8 hover:text-white"}`,children:"Coastal Preset"}),R.jsx("button",{onClick:()=>K("preset_deepsea"),className:`text-xs px-2 py-1.5 rounded font-medium border transition-all ${a.mode==="preset_deepsea"?"bg-white/15 border-white/40 text-white shadow-[0_0_12px_rgba(255,255,255,0.1)]":"bg-white/3 border-transparent text-white/60 hover:bg-white/8 hover:text-white"}`,children:"Pelagic Preset"}),R.jsx("button",{onClick:()=>K("preset_estuary"),className:`text-xs px-2 py-1.5 rounded font-medium border transition-all ${a.mode==="preset_estuary"?"bg-white/15 border-white/40 text-white shadow-[0_0_12px_rgba(255,255,255,0.1)]":"bg-white/3 border-transparent text-white/60 hover:bg-white/8 hover:text-white"}`,children:"Estuary Preset"}),R.jsxs("button",{onClick:()=>K("uploaded"),disabled:!_,className:`text-xs col-span-2 @lg:col-span-1 px-2 py-1.5 rounded font-medium border transition-all flex items-center justify-center gap-1 ${a.mode==="uploaded"?"bg-white/15 border-white/40 text-white shadow-[0_0_12px_rgba(255,255,255,0.1)]":_?"bg-white/3 border-transparent text-white/60 hover:bg-white/8 hover:text-white":"opacity-30 cursor-not-allowed bg-black/20 text-white/30 border-transparent"}`,children:[R.jsx(Qx,{size:12})," CSV Playback"]})]}),R.jsx("p",{className:"text-[10px] font-mono text-white/35 leading-relaxed mt-1",children:a.mode==="uploaded"?"User-supplied CSV grid data, played back frame-by-frame as uploaded.":"Illustrative synthetic parameter set generated locally — not derived from satellite observations or real sensor data."})]}),R.jsxs("div",{className:"grid grid-cols-1 @lg:grid-cols-3 gap-3",children:[R.jsxs("div",{className:"@lg:col-span-2 glass-panel rounded-lg p-3.5 flex flex-col justify-center",children:[R.jsxs("div",{onDragEnter:$,onDragOver:$,onDragLeave:$,onDrop:ge,onClick:()=>{var ee;return(ee=B.current)==null?void 0:ee.click()},className:`border border-dashed rounded-lg p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${j?"border-white bg-white/10":"border-white/15 hover:border-white/40 hover:bg-white/5"}`,children:[R.jsx(lT,{className:"text-white/40",size:20}),R.jsxs("span",{className:"text-xs text-white/95",children:["Drag-and-Drop ",R.jsx("span",{className:"text-white font-bold underline decoration-white/45",children:"satellite.csv"})," or browse"]}),R.jsx("span",{className:"text-[10px] text-white/40 font-mono",children:"Accepts 20x20 cell vectors (400 samples/row-mesh)"}),R.jsx("input",{type:"file",ref:B,onChange:H,accept:".csv",className:"hidden"})]}),ae&&R.jsxs("div",{className:"mt-2 text-[11px] text-rose-300 font-mono text-center border border-rose-500/20 bg-rose-500/5 rounded p-1.5",children:["ERROR: ",ae]}),_&&R.jsxs("div",{className:"mt-2 text-xs flex items-center justify-between border-t border-white/5 pt-2 text-white/50",children:[R.jsxs("span",{className:"flex items-center gap-1 text-[11px] font-mono text-white/80",children:[R.jsx(Qx,{size:11,className:"text-white/40"})," ",_.length>25?_.substring(0,25)+"...":_]}),R.jsxs("span",{className:"text-[10px] font-mono",children:["Frame ",g+1," of ",x]})]})]}),R.jsxs("div",{className:"glass-panel rounded-lg p-3.5 flex flex-col justify-between",children:[R.jsxs("div",{children:[R.jsxs("div",{className:"flex justify-between items-center",children:[R.jsx("span",{className:"text-[11px] font-bold uppercase tracking-wider text-white/70",children:"STREAM STATUS"}),R.jsxs("span",{className:`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-widest ${n?"bg-white/15 text-white pulse-teal-glow shadow-[0_0_8px_rgba(255,255,255,0.1)]":"bg-white/5 text-white/30"}`,children:["● ",n?"COUPLED":"STANDBY"]})]}),R.jsx("p",{className:"text-[10px] text-white/50 mt-1.5 leading-relaxed font-mono",children:n?`Syncing dynamic spatial cubes at ${a.speedHz}Hz intervals to telemetry core.`:"Active coupling offline. Spatial grids are static. Ready to fire stream."})]}),R.jsxs("div",{className:"flex gap-2 mt-3",children:[R.jsx("button",{onClick:s,className:`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded font-medium text-xs border transition-all ${n?"bg-white/10 border-white/20 hover:bg-white/20 text-white":"bg-white/25 border-white/40 hover:bg-white/35 text-white font-bold"}`,children:n?R.jsxs(R.Fragment,{children:[R.jsx(ZE,{size:12,fill:"currentColor"})," MUTE COUPLING"]}):R.jsxs(R.Fragment,{children:[R.jsx(QE,{size:12,fill:"currentColor"})," COUPLE TELEMETRY"]})}),R.jsx("button",{onClick:l,title:"Reset Calibration & Phase",className:"px-2.5 py-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all",children:R.jsx(eT,{size:12,className:n?"animate-spin-[duration:8s]":""})})]})]})]}),R.jsxs("div",{className:"grid grid-cols-1 @2xl:grid-cols-3 gap-4",children:[R.jsxs("div",{className:"@2xl:col-span-2 glass-panel rounded-lg p-3.5 flex flex-col gap-2.5",children:[R.jsxs("span",{className:"text-[11px] font-bold uppercase tracking-wider text-white/80 flex items-center gap-1",children:[R.jsx(vm,{size:13,className:"text-white/60"})," STREAM SIGNAL MODULATORS & PHYSICAL ANOMALIES"]}),R.jsxs("div",{className:"grid grid-cols-1 @lg:grid-cols-2 gap-x-4 gap-y-3 pt-1",children:[R.jsxs("div",{className:"flex flex-col gap-1",children:[R.jsxs("div",{className:"flex justify-between items-center text-[11px] font-mono",children:[R.jsx("span",{className:"text-white/60",children:"Coupling Velocity (Hz)"}),R.jsxs("span",{className:"text-white font-bold",children:[a.speedHz," fps (Hz)"]})]}),R.jsx("input",{type:"range",min:"0.5",max:"5",step:"0.5",value:a.speedHz,onChange:ee=>e({speedHz:parseFloat(ee.target.value)}),className:"h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"}),R.jsx("span",{className:"text-[9px] text-white/30",children:"Drives processing rate of spatial telemetry ticks."})]}),R.jsxs("div",{className:"flex flex-col gap-1",children:[R.jsxs("div",{className:"flex justify-between items-center text-[11px] font-mono",children:[R.jsx("span",{className:"text-white/60",children:"Fluid Current Velocity"}),R.jsxs("span",{className:"text-white font-bold",children:["×",a.flowSpeed.toFixed(1)]})]}),R.jsx("input",{type:"range",min:"0",max:"2",step:"0.2",value:a.flowSpeed,onChange:ee=>e({flowSpeed:parseFloat(ee.target.value)}),className:"h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"}),R.jsx("span",{className:"text-[9px] text-white/30",children:"Modulates spatial drift speed for flowing plumes."})]}),R.jsxs("div",{className:"flex flex-col gap-1",children:[R.jsxs("div",{className:"flex justify-between items-center text-[11px] font-mono",children:[R.jsx("span",{className:"text-white/60",children:"Gaussian Noise Injector (RMS)"}),R.jsxs("span",{className:"text-white font-bold",children:[a.noiseLevel.toFixed(2)," σ"]})]}),R.jsx("input",{type:"range",min:"0",max:"0.2",step:"0.02",value:a.noiseLevel,onChange:ee=>e({noiseLevel:parseFloat(ee.target.value)}),className:"h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"}),R.jsx("span",{className:"text-[9px] text-white/30",children:"Injects pixel-wise sensor scatter and atmospheric dispersion."})]}),R.jsxs("div",{className:"flex flex-col gap-1",children:[R.jsxs("div",{className:"flex justify-between items-center text-[11px] font-mono",children:[R.jsx("span",{className:"text-white/60",children:"Eutrophic/Thermal Front Impulser"}),R.jsxs("span",{className:"text-white font-bold",children:[(a.currentAnomaly*100).toFixed(0),"% Intensity"]})]}),R.jsx("input",{type:"range",min:"0",max:"1.0",step:"0.1",value:a.currentAnomaly,onChange:ee=>e({currentAnomaly:parseFloat(ee.target.value)}),className:"h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"}),R.jsx("span",{className:"text-[9px] text-white/30",children:"Controls center-right sediment/phytoplankton focal outbreaks."})]}),R.jsxs("div",{className:"flex flex-col gap-1",children:[R.jsxs("div",{className:"flex justify-between items-center text-[11px] font-mono",children:[R.jsx("span",{className:"text-white/60",children:"Radiometer Calibration Decay (Drift)"}),R.jsxs("span",{className:"text-white font-bold",children:[a.driftFactor.toFixed(2)," Δ"]})]}),R.jsx("input",{type:"range",min:"0",max:"0.1",step:"0.01",value:a.driftFactor,onChange:ee=>e({driftFactor:parseFloat(ee.target.value)}),className:"h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"}),R.jsx("span",{className:"text-[9px] text-white/30",children:"Simulates temporal decay and gain loss in specific wavebands."})]}),a.mode==="uploaded"&&R.jsxs("div",{className:"flex flex-col gap-1 select-none animate-fade-in",children:[R.jsxs("div",{className:"flex justify-between items-center text-[11px] font-mono",children:[R.jsx("span",{className:"text-white/60",children:"Animate Frame Sweep"}),R.jsxs("span",{className:"text-white font-bold",children:["Frame ",g+1," / ",x]})]}),R.jsx("input",{type:"range",min:"0",max:Math.max(0,x-1),step:"1",value:g,onChange:ee=>S(parseInt(ee.target.value)),className:"h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"}),R.jsx("span",{className:"text-[9px] text-white/30",children:"Step manually through multi-frame temporal sequences."})]})]})]}),R.jsxs("div",{className:"glass-panel rounded-lg p-3.5 flex flex-col gap-2 justify-between",children:[R.jsxs("div",{children:[R.jsxs("span",{className:"text-[11px] font-bold uppercase tracking-wider text-white/80 flex items-center gap-1",children:[R.jsx(nT,{size:13,className:"text-white/60"})," 3D RENDER ENGINE CALIBRATION"]}),R.jsxs("div",{className:"flex flex-col gap-2.5 mt-2.5",children:[R.jsxs("div",{className:"flex flex-col gap-1",children:[R.jsxs("div",{className:"flex items-center justify-between text-xs font-mono",children:[R.jsx("span",{className:"text-white/50",children:"Vertical Layer Gap"}),R.jsx("span",{className:"text-white font-bold",children:U.toFixed(1)})]}),R.jsx("input",{type:"range",min:"1",max:"7",step:"0.5",value:U,onChange:ee=>z(parseFloat(ee.target.value)),className:"w-full h-1 bg-white/10 rounded appearance-none cursor-pointer accent-white"})]}),R.jsxs("div",{className:"flex flex-col gap-1",children:[R.jsxs("div",{className:"flex items-center justify-between text-xs font-mono",children:[R.jsx("span",{className:"text-white/50",children:"Displacement Gain"}),R.jsx("span",{className:"text-white font-bold",children:T.toFixed(1)})]}),R.jsx("input",{type:"range",min:"0",max:"6",step:"0.1",value:T,onChange:ee=>F(parseFloat(ee.target.value)),className:"w-full h-1 bg-white/10 rounded appearance-none cursor-pointer accent-white"})]}),R.jsxs("div",{className:"flex flex-wrap gap-1 mt-1",children:[R.jsx("button",{onClick:()=>y(!v),className:`text-[10px] font-mono flex-1 min-w-[80px] py-1 rounded transition-all border ${v?"bg-white/15 border-white/40 text-white":"bg-white/3 border-white/5 text-white/50 hover:bg-white/8 hover:text-white"}`,children:"3D TERRAIN"}),R.jsx("button",{onClick:()=>N(!A),className:`text-[10px] font-mono flex-1 min-w-[80px] py-1 rounded transition-all border ${A?"bg-white/15 border-white/40 text-white":"bg-white/3 border-white/5 text-white/50 hover:bg-white/8 hover:text-white"}`,children:"WIREFRAME"}),R.jsx("button",{onClick:()=>I(!C),className:`text-[10px] font-mono flex-1 min-w-[80px] py-1 rounded transition-all border ${C?"bg-white/15 border-white/40 text-white":"bg-white/3 border-white/5 text-white/50 hover:bg-white/8 hover:text-white"}`,children:"BILLBOARDS"})]})]})]}),R.jsxs("div",{className:"border-t border-white/5 pt-2 mt-2",children:[R.jsx("span",{className:"text-[10px] font-bold text-white/40 block tracking-wider font-mono",children:"CAMERA MATRIX ANGLE presets"}),R.jsxs("div",{className:"flex gap-1.5 mt-1.5",children:[R.jsx("button",{onClick:()=>E("iso"),className:`text-[10px] font-mono flex-1 py-1 rounded transition-all ${M==="iso"?"bg-white text-black font-extrabold shadow-[0_0_10px_rgba(255,255,255,0.15)]":"bg-white/5 text-white/80 hover:bg-white/10"}`,children:"ISOMETRIC (30°)"}),R.jsx("button",{onClick:()=>E("top"),className:`text-[10px] font-mono flex-1 py-1 rounded transition-all ${M==="top"?"bg-white text-black font-extrabold shadow-[0_0_10px_rgba(255,255,255,0.15)]":"bg-white/5 text-white/80 hover:bg-white/10"}`,children:"PLAN VIEW (90°)"}),R.jsx("button",{onClick:()=>E("profile"),className:`text-[10px] font-mono flex-1 py-1 rounded transition-all ${M==="profile"?"bg-white text-black font-extrabold shadow-[0_0_10px_rgba(255,255,255,0.15)]":"bg-white/5 text-white/80 hover:bg-white/10"}`,children:"ELEVATION (0°)"})]})]})]})]}),R.jsxs("div",{className:"glass-panel rounded-lg p-3.5 flex flex-col gap-2",children:[R.jsxs("span",{className:"text-[11px] font-bold uppercase tracking-wider text-white/85 flex items-center gap-1.5",children:[R.jsx(pT,{size:13,className:"text-white/60 pulse-teal-glow rounded-full p-0.5"})," REAL-TIME SATELLITE BAND MATRIX TELEMETRY (SPARKLINES)"]}),R.jsx("div",{className:"@container grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-7 gap-2.5 mt-1",children:Object.keys(ar).map(ee=>{const Ee=ar[ee],te=p[ee]||0,se=O[ee]||Array(25).fill(.5),me=X.stats[ee]||{min:0,max:1};return R.jsxs("div",{className:"flex flex-col border border-white/5 rounded bg-black/40 p-2 relative group hover:border-white/10 transition-colors",children:[R.jsx("div",{className:"absolute top-0 left-0 w-1 h-full rounded-l",style:{backgroundColor:Ee.color}}),R.jsxs("div",{className:"pointer-events-none absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-2 rounded-md bg-black/95 border border-white/10 text-[10px] text-white/80 leading-snug opacity-0 group-hover:opacity-100 transition-opacity shadow-xl",children:[R.jsx("span",{className:"font-bold block mb-0.5",style:{color:Ee.color},children:Ee.label}),Ee.description]}),R.jsxs("div",{className:"flex justify-between items-center text-xs font-mono ml-1",children:[R.jsx("span",{className:"font-extrabold",style:{color:Ee.color},children:ee}),R.jsx("span",{className:"text-[10px] text-white/40",children:Ee.unit})]}),R.jsxs("div",{className:"text-base font-bold font-mono tracking-tight text-white/95 mt-1 ml-1 flex items-baseline gap-0.5 justify-between",children:[R.jsx("span",{children:te.toFixed(3)}),R.jsx("span",{className:"text-[9px] font-normal",style:{color:Ee.color},children:"avg"})]}),R.jsx("div",{className:"h-6 mt-1.5 ml-1",children:R.jsxs("svg",{className:"w-full h-full overflow-visible",viewBox:"0 0 110 24",preserveAspectRatio:"none",children:[R.jsx("path",{d:ye(se),fill:"none",stroke:Ee.color,strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"}),R.jsx("circle",{cx:"110",cy:24-(se[se.length-1]-0)/1*20-2,r:"2.5",fill:Ee.color,className:"animate-pulse"})]})}),R.jsxs("div",{className:"mt-2.5 ml-1 pt-2 border-t border-white/5 flex flex-col gap-1",children:[R.jsx(US,{label:ee,gradient:LS(ee,u[ee]),value:u[ee],defaultHex:Ee.color,onChange:Ae=>d(ee,Ae),onReset:()=>m(ee)}),R.jsxs("div",{className:"flex justify-between items-center text-[9px] font-mono text-white/50 leading-none",children:[R.jsx("span",{children:me.min.toFixed(2)}),R.jsx("span",{children:me.max.toFixed(2)})]})]})]},ee)})})]})]})},dy=({analysis:a,dataCube:e,layerState:n,onToggleLayer:s,onChangeLayerOpacity:l,customColors:c,onChangeCustomColor:u,onResetCustomColor:d})=>{const m=(a.transitionEntropy*100).toFixed(1),p=_=>"text-white border-white/20 bg-white/5 shadow-[0_0_12px_rgba(255,255,255,0.03)]";return R.jsxs("div",{className:"@container flex flex-col gap-4 text-white select-none h-full overflow-y-auto pr-1",children:[R.jsxs("div",{className:"glass-panel rounded-lg p-3.5 flex flex-col gap-2.5",children:[R.jsxs("div",{className:"flex justify-between items-center",children:[R.jsxs("span",{className:"text-[11px] font-bold uppercase tracking-wider text-white/80 flex items-center gap-1.5",children:[R.jsx(Hl,{size:13,className:"text-white/60 pulse-teal-glow rounded-full p-0.5"})," REGIME CLASSIFICATION"]}),R.jsx("span",{className:"text-[9px] font-mono text-white/40",children:"heuristic demo"})]}),R.jsx("p",{className:"text-[9px] text-white/30 leading-snug font-mono -mt-1",children:"Regime score, entropy, and probability mixtures below are computed from hand-tuned heuristics for demonstrating the encoding pipeline — not outputs of a trained or peer-reviewed model."}),R.jsxs("div",{className:`border rounded-lg p-2.5 flex items-center gap-2.5 h-14 ${p(a.regimeId)}`,children:[R.jsx(hT,{size:24,className:"stroke-[1.5] text-white/80"}),R.jsxs("div",{children:[R.jsx("div",{className:"text-[10px] font-mono uppercase tracking-widest text-white/50",children:"Primary Ocean Regime"}),R.jsx("div",{className:"text-sm font-extrabold tracking-tight",children:a.regime})]})]}),R.jsxs("div",{className:"flex flex-col gap-1.5 mt-1 border-t border-white/5 pt-2",children:[R.jsx("span",{className:"text-[10px] font-bold font-mono text-white/40 block",children:"GMM POSTERIOR PROBABILITY MIXTURES:"}),Object.entries(a.probabilities).map(([_,x])=>{const S=`${(x*100).toFixed(1)}%`;return R.jsxs("div",{className:"flex flex-col gap-1",children:[R.jsxs("div",{className:"flex justify-between items-center text-[11px] font-mono",children:[R.jsxs("span",{className:"text-white/80",children:[_," Upwelling Profile"]}),R.jsx("span",{className:"font-bold",children:S})]}),R.jsx("div",{className:"h-1 bg-white/5 rounded-full overflow-hidden w-full",children:R.jsx("div",{className:"h-full rounded-full transition-all duration-300 bg-white",style:{width:S}})})]},_)})]})]}),R.jsxs("div",{className:"grid grid-cols-1 @sm:grid-cols-2 gap-3",children:[R.jsxs("div",{className:"glass-panel rounded-lg p-3.5 flex flex-col justify-between",children:[R.jsxs("div",{children:[R.jsx("span",{className:"text-[10px] font-bold font-mono text-white/40 block leading-tight uppercase tracking-wider",children:"Tipping point Entropy"}),R.jsxs("div",{className:"text-xl font-mono font-black mt-2 text-white/95",children:[m,"%"]})]}),R.jsxs("div",{className:"mt-2.5",children:[R.jsx("span",{className:"text-[9px] font-mono text-white/40 block",children:"TRANSITION RISK LEVEL:"}),a.transitionRisk==="High (State Boundary)"?R.jsxs("span",{className:"inline-flex items-center gap-1 font-bold text-[10px] text-white font-mono mt-0.5",children:[R.jsx(Jx,{size:11,className:"text-white fill-white/15"})," STATE BOUNDARY"]}):a.transitionRisk==="Moderate (Mixing)"?R.jsxs("span",{className:"inline-flex items-center gap-1 font-bold text-[10px] text-white/90 font-mono mt-0.5",children:[R.jsx(Jx,{size:11,className:"text-white/80 fill-white/10"})," TURBID FRONTIER"]}):R.jsxs("span",{className:"inline-flex items-center gap-1 font-bold text-[10px] text-white/80 font-mono mt-0.5",children:[R.jsx(aT,{size:11,className:"text-white/80"})," STABLE CORE"]})]}),R.jsx("div",{className:"h-1 bg-white/5 rounded-full overflow-hidden mt-2",children:R.jsx("div",{className:"h-full rounded-full transition-all duration-500 bg-white",style:{width:`${Math.max(5,a.transitionEntropy*100)}%`}})})]}),R.jsxs("div",{className:"glass-panel rounded-lg p-3.5 flex flex-col justify-between",children:[R.jsxs("div",{children:[R.jsx("span",{className:"text-[10px] font-bold font-mono text-white/40 block leading-tight uppercase tracking-wider",children:"Spatial Front Index"}),R.jsx("div",{className:"text-xl font-mono font-black mt-2 text-white/95",children:a.isBoundaryZone?"TRUE":"FALSE"})]}),R.jsxs("div",{className:"mt-2.5",children:[R.jsx("span",{className:"text-[9px] font-mono text-white/40 block",children:"HYDRODYNAMIC SHIFT:"}),R.jsxs("span",{className:"text-[10px] font-mono font-bold text-white/90 mt-0.5 block truncate",children:["dx=",e.stats.CHL.std.toFixed(2),"σ · TSM=",e.stats.TSM.std.toFixed(2),"σ"]})]}),R.jsx("span",{className:"text-[9px] text-white/30 leading-snug font-mono mt-2 block",children:a.isBoundaryZone?"High pixel spatial gradients confirm a fluid shear front.":"Low local gradient shifts. Core uniform region."})]})]}),R.jsxs("div",{className:`glass-panel rounded-lg p-3.5 transition-all flex flex-col gap-2 ${a.isNovel?"border-white/30 bg-white/10":""}`,children:[R.jsxs("div",{className:"flex justify-between items-center",children:[R.jsxs("span",{className:"text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-white/90",children:[R.jsx(mp,{size:13,className:a.isNovel?"pulse-teal-glow rounded-full p-0.5":""})," ",a.isNovel?"CRITICAL ANOMALY ALERT":"STATE SYSTEM INTEGRITY"]}),R.jsx("span",{className:"text-[9px] font-mono text-white/40",children:"heuristic p-value"})]}),R.jsx("p",{className:"text-[9px] text-white/30 leading-snug font-mono",children:"Misfit distance and p-value are illustrative heuristics comparing the current frame to a synthetic baseline — not a validated statistical test."}),R.jsxs("div",{className:"flex justify-between items-baseline mt-1 gap-2",children:[R.jsxs("div",{children:[R.jsx("div",{className:"text-[9px] font-mono uppercase tracking-widest text-white/50",children:"Misfit Distance Score"}),R.jsx("div",{className:"text-lg font-mono font-bold text-white/95",children:a.stateNoveltyScore.toFixed(3)})]}),R.jsxs("div",{className:"text-right",children:[R.jsx("div",{className:"text-[9px] font-mono uppercase tracking-widest text-white/50",children:"Baseline Significance"}),R.jsxs("div",{className:"text-[11px] font-mono font-extrabold text-white",children:["p=",a.stateNoveltyPValue.toFixed(4)]})]})]}),a.isNovel?R.jsxs("div",{className:"text-[10.5px] border border-white/20 bg-white/5 text-white/90 rounded p-2.5 leading-relaxed font-mono mt-1",children:["▫ ",R.jsx("strong",{children:"HIGH SYSTEM NOVELTY:"})," Current geospatial signature exceeds 95% threshold of historical baseline archives. Anomaly status is active."]}):R.jsxs("div",{className:"text-[10px] bg-white/3 border border-white/5 text-white/80 rounded p-2 leading-normal font-mono text-center",children:["✔ State resides safely within historical margins (Confidence ",((1-a.stateNoveltyPValue)*100).toFixed(0),"%)"]})]}),R.jsxs("div",{className:"glass-panel rounded-lg p-3.5 flex flex-col gap-1.5",children:[R.jsxs("span",{className:"text-[11px] font-bold uppercase tracking-wider text-white/80 flex items-center gap-1.5",children:[R.jsx(IE,{size:13,className:"text-white/60"})," SCIENTIFIC EXPLORER BRIEFING"]}),R.jsx("p",{className:"text-[10.5px] text-white/70 leading-relaxed font-mono border border-white/5 bg-black/10 rounded p-2 select-text selection:bg-white selection:text-black",children:a.scientificJustification})]}),R.jsxs("div",{className:"glass-panel rounded-lg p-3.5 flex flex-col gap-2",children:[R.jsxs("span",{className:"text-[11px] font-bold uppercase tracking-wider text-white/80 flex items-center gap-1.5",children:[R.jsx(ME,{size:13,className:"text-white/60"})," STACK VISIBILITY TUNER"]}),R.jsx("div",{className:"flex flex-col gap-2 mt-1",children:Object.keys(ar).map(_=>{const x=ar[_],g=n[_]||{visible:!0,opacity:.7};return R.jsxs("div",{className:"flex items-center gap-2 text-xs font-mono select-none",children:[R.jsx("input",{type:"checkbox",checked:g.visible,onChange:()=>s(_),className:"w-3.5 h-3.5 text-white bg-black/40 border-white/15 rounded focus:ring-white focus:ring-1 accent-white"}),R.jsx("div",{className:"w-8 flex-shrink-0",children:R.jsx(US,{label:_,gradient:LS(_,c[_]),value:c[_],defaultHex:x.color,onChange:S=>u(_,S),onReset:()=>d(_)})}),R.jsx("span",{className:"w-12 font-bold ml-1",style:{color:x.color},children:_}),R.jsx("input",{type:"range",min:"0.1",max:"1",step:"0.05",value:g.opacity,onChange:S=>l(_,parseFloat(S.target.value)),className:"flex-1 h-0.5 bg-white/15 rounded appearance-none cursor-pointer accent-white"}),R.jsxs("span",{className:"text-[10px] text-white/50 w-6 text-right",children:[(g.opacity*100).toFixed(0),"%"]})]},_)})})]})]})};function cD(a,e){const n=getComputedStyle(a),s=parseFloat(n.fontSize);return e*s}function uD(a,e){const n=getComputedStyle(a.ownerDocument.documentElement),s=parseFloat(n.fontSize);return e*s}function fD(a){return a/100*window.innerHeight}function hD(a){return a/100*window.innerWidth}function dD(a){switch(typeof a){case"number":return[a,"px"];case"string":{const e=parseFloat(a);return a.endsWith("%")?[e,"%"]:a.endsWith("px")?[e,"px"]:a.endsWith("rem")?[e,"rem"]:a.endsWith("em")?[e,"em"]:a.endsWith("vh")?[e,"vh"]:a.endsWith("vw")?[e,"vw"]:[e,"%"]}}}function Pl({groupSize:a,panelElement:e,styleProp:n}){let s;const[l,c]=dD(n);switch(c){case"%":{s=l/100*a;break}case"px":{s=l;break}case"rem":{s=uD(e,l);break}case"em":{s=cD(e,l);break}case"vh":{s=fD(l);break}case"vw":{s=hD(l);break}}return s}function Yn(a){return parseFloat(a.toFixed(3))}function Mo({group:a}){const{orientation:e,panels:n}=a;return n.reduce((s,l)=>(s+=e==="horizontal"?l.element.offsetWidth:l.element.offsetHeight,s),0)}function fm(a){const{panels:e}=a,n=Mo({group:a});return n===0?e.map(s=>({groupResizeBehavior:s.panelConstraints.groupResizeBehavior,collapsedSize:0,collapsible:s.panelConstraints.collapsible===!0,defaultSize:void 0,disabled:s.panelConstraints.disabled,minSize:0,maxSize:100,panelId:s.id})):e.map(s=>{const{element:l,panelConstraints:c}=s;let u=0;if(c.collapsedSize!==void 0){const _=Pl({groupSize:n,panelElement:l,styleProp:c.collapsedSize});u=Yn(_/n*100)}let d;if(c.defaultSize!==void 0){const _=Pl({groupSize:n,panelElement:l,styleProp:c.defaultSize});d=Yn(_/n*100)}let m=0;if(c.minSize!==void 0){const _=Pl({groupSize:n,panelElement:l,styleProp:c.minSize});m=Yn(_/n*100)}let p=100;if(c.maxSize!==void 0){const _=Pl({groupSize:n,panelElement:l,styleProp:c.maxSize});p=Yn(_/n*100)}return{groupResizeBehavior:c.groupResizeBehavior,collapsedSize:u,collapsible:c.collapsible===!0,defaultSize:d,disabled:c.disabled,minSize:m,maxSize:p,panelId:s.id}})}function qt(a,e="Assertion error"){if(!a)throw Error(e)}function hm(a,e){return Array.from(e).sort(a==="horizontal"?pD:mD)}function pD(a,e){const n=a.element.offsetLeft-e.element.offsetLeft;return n!==0?n:a.element.offsetWidth-e.element.offsetWidth}function mD(a,e){const n=a.element.offsetTop-e.element.offsetTop;return n!==0?n:a.element.offsetHeight-e.element.offsetHeight}function OS(a){return a!==null&&typeof a=="object"&&"nodeType"in a&&a.nodeType===Node.ELEMENT_NODE}function PS(a,e){return{x:a.x>=e.left&&a.x<=e.right?0:Math.min(Math.abs(a.x-e.left),Math.abs(a.x-e.right)),y:a.y>=e.top&&a.y<=e.bottom?0:Math.min(Math.abs(a.y-e.top),Math.abs(a.y-e.bottom))}}function gD({orientation:a,rects:e,targetRect:n}){const s={x:n.x+n.width/2,y:n.y+n.height/2};let l,c=Number.MAX_VALUE;for(const u of e){const{x:d,y:m}=PS(s,u),p=a==="horizontal"?d:m;p<c&&(c=p,l=u)}return qt(l,"No rect found"),l}let Iu;function _D(){return Iu===void 0&&(typeof matchMedia=="function"?Iu=!!matchMedia("(pointer:coarse)").matches:Iu=!1),Iu}function zS(a){const{element:e,orientation:n,panels:s,separators:l}=a,c=hm(n,Array.from(e.children).filter(OS).map(M=>({element:M}))).map(({element:M})=>M),u=[];let d=!1,m=!1,p=-1,_=-1,x=0,g,S=[];{let M=-1;for(const E of c)E.hasAttribute("data-panel")&&(M++,E.hasAttribute("data-disabled")||(x++,p===-1&&(p=M),_=M))}if(x>1){let M=-1;for(const E of c)if(E.hasAttribute("data-panel")){M++;const v=s.find(y=>y.element===E);if(v){if(g){const y=g.element.getBoundingClientRect(),A=E.getBoundingClientRect();let N;if(m){const C=n==="horizontal"?new DOMRect(y.right,y.top,0,y.height):new DOMRect(y.left,y.bottom,y.width,0),I=n==="horizontal"?new DOMRect(A.left,A.top,0,A.height):new DOMRect(A.left,A.top,A.width,0);switch(S.length){case 0:{N=[C,I];break}case 1:{const U=S[0],z=gD({orientation:n,rects:[y,A],targetRect:U.element.getBoundingClientRect()});N=[U,z===y?I:C];break}default:{N=S;break}}}else S.length?N=S:N=[n==="horizontal"?new DOMRect(y.right,A.top,A.left-y.right,A.height):new DOMRect(A.left,y.bottom,A.width,A.top-y.bottom)];for(const C of N){let I="width"in C?C:C.element.getBoundingClientRect();const U=_D()?a.resizeTargetMinimumSize.coarse:a.resizeTargetMinimumSize.fine;if(I.width<U){const T=U-I.width;I=new DOMRect(I.x-T/2,I.y,I.width+T,I.height)}if(I.height<U){const T=U-I.height;I=new DOMRect(I.x,I.y-T/2,I.width,I.height+T)}const z=M<=p||M>_;!d&&!z&&u.push({group:a,groupSize:Mo({group:a}),panels:[g,v],separator:"width"in C?void 0:C,rect:I}),d=!1}}m=!1,g=v,S=[]}}else if(E.hasAttribute("data-separator")){E.ariaDisabled!==null&&(d=!0);const v=l.find(y=>y.element===E);v?S.push(v):(g=void 0,S=[])}else m=!0}return u}var xs;class IS{constructor(){Cx(this,xs,{})}addListener(e,n){const s=xl(this,xs)[e];return s===void 0?xl(this,xs)[e]=[n]:s.includes(n)||s.push(n),()=>{this.removeListener(e,n)}}emit(e,n){const s=xl(this,xs)[e];if(s!==void 0)if(s.length===1)s[0].call(null,n);else{let l=!1,c=null;const u=Array.from(s);for(let d=0;d<u.length;d++){const m=u[d];try{m.call(null,n)}catch(p){c===null&&(l=!0,c=p)}}if(l)throw c}}removeAllListeners(){Dx(this,xs,{})}removeListener(e,n){const s=xl(this,xs)[e];if(s!==void 0){const l=s.indexOf(n);l>=0&&s.splice(l,1)}}}xs=new WeakMap;let ea=new Map;const FS=new IS;function xD(a){ea=new Map(ea),ea.delete(a)}function py(a,e){for(const[n]of ea)if(n.id===a)return n}function Ms(a,e){for(const[n,s]of ea)if(n.id===a)return s;if(e)throw Error(`Could not find data for Group with id ${a}`)}function hr(){return ea}function zm(a,e){return FS.addListener("groupChange",n=>{n.group.id===a&&e(n)})}function Oa(a,e){const n=ea.get(a);ea=new Map(ea),ea.set(a,e),FS.emit("groupChange",{group:a,prev:n,next:e})}function vD(a,e,n){let s,l={x:1/0,y:1/0};for(const c of e){const u=PS(n,c.rect);switch(a){case"horizontal":{u.x<=l.x&&(s=c,l=u);break}case"vertical":{u.y<=l.y&&(s=c,l=u);break}}}return s?{distance:l,hitRegion:s}:void 0}function yD(a){return a!==null&&typeof a=="object"&&"nodeType"in a&&a.nodeType===Node.DOCUMENT_FRAGMENT_NODE}function SD(a,e){if(a===e)throw new Error("Cannot compare node with itself");const n={a:_y(a),b:_y(e)};let s;for(;n.a.at(-1)===n.b.at(-1);)s=n.a.pop(),n.b.pop();qt(s,"Stacking order can only be calculated for elements with a common ancestor");const l={a:gy(my(n.a)),b:gy(my(n.b))};if(l.a===l.b){const c=s.childNodes,u={a:n.a.at(-1),b:n.b.at(-1)};let d=c.length;for(;d--;){const m=c[d];if(m===u.a)return 1;if(m===u.b)return-1}}return Math.sign(l.a-l.b)}const bD=/\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;function MD(a){const e=getComputedStyle(BS(a)??a).display;return e==="flex"||e==="inline-flex"}function ED(a){const e=getComputedStyle(a);return!!(e.position==="fixed"||e.zIndex!=="auto"&&(e.position!=="static"||MD(a))||+e.opacity<1||"transform"in e&&e.transform!=="none"||"webkitTransform"in e&&e.webkitTransform!=="none"||"mixBlendMode"in e&&e.mixBlendMode!=="normal"||"filter"in e&&e.filter!=="none"||"webkitFilter"in e&&e.webkitFilter!=="none"||"isolation"in e&&e.isolation==="isolate"||bD.test(e.willChange)||e.webkitOverflowScrolling==="touch")}function my(a){let e=a.length;for(;e--;){const n=a[e];if(qt(n,"Missing node"),ED(n))return n}return null}function gy(a){return a&&Number(getComputedStyle(a).zIndex)||0}function _y(a){const e=[];for(;a;)e.push(a),a=BS(a);return e}function BS(a){const{parentNode:e}=a;return yD(e)?e.host:e}function TD(a,e){return a.x<e.x+e.width&&a.x+a.width>e.x&&a.y<e.y+e.height&&a.y+a.height>e.y}function AD({groupElement:a,hitRegion:e,pointerEventTarget:n}){if(!OS(n)||n.contains(a)||a.contains(n))return!0;if(SD(n,a)>0){let s=n;for(;s;){if(s.contains(a))return!0;if(TD(s.getBoundingClientRect(),e))return!1;s=s.parentElement}}return!0}function Im(a,e){const n=[];return e.forEach((s,l)=>{if(l.disabled)return;const c=zS(l),u=vD(l.orientation,c,{x:a.clientX,y:a.clientY});u&&u.distance.x<=0&&u.distance.y<=0&&AD({groupElement:l.element,hitRegion:u.hitRegion.rect,pointerEventTarget:a.target})&&n.push(u.hitRegion)}),n}function wD(a,e){if(a.length!==e.length)return!1;for(let n=0;n<a.length;n++)if(a[n]!=e[n])return!1;return!0}function kn(a,e,n=0){return Math.abs(Yn(a)-Yn(e))<=n}function Yi(a,e){return kn(a,e)?0:a>e?1:-1}function ho({overrideDisabledPanels:a,panelConstraints:e,prevSize:n,size:s}){const{collapsedSize:l=0,collapsible:c,disabled:u,maxSize:d=100,minSize:m=0}=e;if(u&&!a)return n;if(Yi(s,m)<0)if(c){const p=(l+m)/2;Yi(s,p)<0?s=l:s=m}else s=m;return s=Math.min(d,s),s=Yn(s),s}function jl({delta:a,initialLayout:e,panelConstraints:n,pivotIndices:s,prevLayout:l,trigger:c}){if(kn(a,0))return e;const u=c==="imperative-api",d=Object.values(e),m=Object.values(l),p=[...d],[_,x]=s;qt(_!=null,"Invalid first pivot index"),qt(x!=null,"Invalid second pivot index");let g=0;switch(c){case"keyboard":{{const E=a<0?x:_,v=n[E];qt(v,`Panel constraints not found for index ${E}`);const{collapsedSize:y=0,collapsible:A,minSize:N=0}=v;if(A){const C=d[E];if(qt(C!=null,`Previous layout not found for panel index ${E}`),kn(C,y)){const I=N-C;Yi(I,Math.abs(a))>0&&(a=a<0?0-I:I)}}}{const E=a<0?_:x,v=n[E];qt(v,`No panel constraints found for index ${E}`);const{collapsedSize:y=0,collapsible:A,minSize:N=0}=v;if(A){const C=d[E];if(qt(C!=null,`Previous layout not found for panel index ${E}`),kn(C,N)){const I=C-y;Yi(I,Math.abs(a))>0&&(a=a<0?0-I:I)}}}break}default:{const E=a<0?x:_,v=n[E];qt(v,`Panel constraints not found for index ${E}`);const y=d[E],{collapsible:A,collapsedSize:N,minSize:C}=v;if(A&&Yi(y,C)<0)if(a>0){const I=C-N,U=I/2,z=y+a;Yi(z,C)<0&&(a=Yi(a,U)<=0?0:I)}else{const I=C-N,U=100-I/2,z=y-a;Yi(z,C)<0&&(a=Yi(100+a,U)>0?0:-I)}break}}{const E=a<0?1:-1;let v=a<0?x:_,y=0;for(;;){const N=d[v];qt(N!=null,`Previous layout not found for panel index ${v}`);const C=ho({overrideDisabledPanels:u,panelConstraints:n[v],prevSize:N,size:100})-N;if(y+=C,v+=E,v<0||v>=n.length)break}const A=Math.min(Math.abs(a),Math.abs(y));a=a<0?0-A:A}{let E=a<0?_:x;for(;E>=0&&E<n.length;){const v=Math.abs(a)-Math.abs(g),y=d[E];qt(y!=null,`Previous layout not found for panel index ${E}`);const A=y-v,N=ho({overrideDisabledPanels:u,panelConstraints:n[E],prevSize:y,size:A});if(!kn(y,N)&&(g+=y-N,p[E]=N,g.toFixed(3).localeCompare(Math.abs(a).toFixed(3),void 0,{numeric:!0})>=0))break;a<0?E--:E++}}if(wD(m,p))return l;{const E=a<0?x:_,v=d[E];qt(v!=null,`Previous layout not found for panel index ${E}`);const y=v+g,A=ho({overrideDisabledPanels:u,panelConstraints:n[E],prevSize:v,size:y});if(p[E]=A,!kn(A,y)){let N=y-A,C=a<0?x:_;for(;C>=0&&C<n.length;){const I=p[C];qt(I!=null,`Previous layout not found for panel index ${C}`);const U=I+N,z=ho({overrideDisabledPanels:u,panelConstraints:n[C],prevSize:I,size:U});if(kn(I,z)||(N-=z-I,p[C]=z),kn(N,0))break;a>0?C--:C++}}}const S=Object.values(p).reduce((E,v)=>v+E,0);if(!kn(S,100,.1))return l;const M=Object.keys(l);return p.reduce((E,v,y)=>(E[M[y]]=v,E),{})}function sr(a,e){if(Object.keys(a).length!==Object.keys(e).length)return!1;for(const n in a)if(e[n]===void 0||Yi(a[n],e[n])!==0)return!1;return!0}function rr({layout:a,panelConstraints:e}){const n=Object.values(a),s=[...n],l=s.reduce((d,m)=>d+m,0);if(s.length!==e.length)throw Error(`Invalid ${e.length} panel layout: ${s.map(d=>`${d}%`).join(", ")}`);if(!kn(l,100)&&s.length>0)for(let d=0;d<e.length;d++){const m=s[d];qt(m!=null,`No layout data found for index ${d}`);const p=100/l*m;s[d]=p}let c=0;for(let d=0;d<e.length;d++){const m=n[d];qt(m!=null,`No layout data found for index ${d}`);const p=s[d];qt(p!=null,`No layout data found for index ${d}`);const _=ho({overrideDisabledPanels:!0,panelConstraints:e[d],prevSize:m,size:p});p!=_&&(c+=p-_,s[d]=_)}if(!kn(c,0))for(let d=0;d<e.length;d++){const m=s[d];qt(m!=null,`No layout data found for index ${d}`);const p=m+c,_=ho({overrideDisabledPanels:!0,panelConstraints:e[d],prevSize:m,size:p});if(m!==_&&(c-=_-m,s[d]=_,kn(c,0)))break}const u=Object.keys(a);return s.reduce((d,m,p)=>(d[u[p]]=m,d),{})}function HS({groupId:a,panelId:e}){const n=()=>{const m=hr();for(const[p,{defaultLayoutDeferred:_,derivedPanelConstraints:x,layout:g,groupSize:S,separatorToPanels:M}]of m)if(p.id===a)return{defaultLayoutDeferred:_,derivedPanelConstraints:x,group:p,groupSize:S,layout:g,separatorToPanels:M};throw Error(`Group ${a} not found`)},s=()=>{const m=n().derivedPanelConstraints.find(p=>p.panelId===e);if(m!==void 0)return m;throw Error(`Panel constraints not found for Panel ${e}`)},l=()=>{const m=n().group.panels.find(p=>p.id===e);if(m!==void 0)return m;throw Error(`Layout not found for Panel ${e}`)},c=()=>{const m=n().layout[e];if(m!==void 0)return m;throw Error(`Layout not found for Panel ${e}`)},u=({nextSize:m,panels:p,prevLayout:_,derivedPanelConstraints:x})=>{const g=c(),S=p.findIndex(v=>v.id===e),M=S===0,E=S===p.length-1;if(E&&m<g&&(M||p.slice(0,S).every((v,y)=>{const A=x[y];return(A==null?void 0:A.collapsible)&&kn(A.collapsedSize,_[A.panelId])}))){const v=p.slice(0,S).reduce((y,A)=>y+_[A.id],0);return{..._,[e]:Yn(100-v)}}return jl({delta:E?g-m:m-g,initialLayout:_,panelConstraints:x,pivotIndices:E?[S-1,S]:[S,S+1],prevLayout:_,trigger:"imperative-api"})},d=m=>{const p=c();if(m===p)return;const{defaultLayoutDeferred:_,derivedPanelConstraints:x,group:g,groupSize:S,layout:M,separatorToPanels:E}=n(),v=u({nextSize:m,panels:g.panels,prevLayout:M,derivedPanelConstraints:x}),y=rr({layout:v,panelConstraints:x});sr(M,y)||Oa(g,{defaultLayoutDeferred:_,derivedPanelConstraints:x,groupSize:S,layout:y,separatorToPanels:E})};return{collapse:()=>{const{collapsible:m,collapsedSize:p}=s(),{mutableValues:_}=l(),x=c();m&&x!==p&&(_.expandToSize=x,d(p))},expand:()=>{const{collapsible:m,collapsedSize:p,minSize:_}=s(),{mutableValues:x}=l(),g=c();if(m&&g===p){let S=x.expandToSize??_;S===0&&(S=1),d(S)}},getSize:()=>{const{group:m}=n(),p=c(),{element:_}=l(),x=m.orientation==="horizontal"?_.offsetWidth:_.offsetHeight;return{asPercentage:p,inPixels:x}},isCollapsed:()=>{const{collapsible:m,collapsedSize:p}=s(),_=c();return m&&kn(p,_)},resize:m=>{const{group:p}=n(),{element:_}=l(),x=Mo({group:p}),g=Pl({groupSize:x,panelElement:_,styleProp:m}),S=Yn(g/x*100);d(S)}}}function xy(a){if(a.defaultPrevented)return;const e=hr();Im(a,e).forEach(n=>{if(n.separator&&!n.separator.disableDoubleClick){const s=n.panels.find(l=>l.panelConstraints.defaultSize!==void 0);if(s){const l=s.panelConstraints.defaultSize,c=HS({groupId:n.group.id,panelId:s.id});c&&l!==void 0&&(c.resize(l),a.preventDefault())}}})}function Wu(a){const e=hr();for(const[n]of e)if(n.separators.some(s=>s.element===a))return n;throw Error("Could not find parent Group for separator element")}function GS({groupId:a}){const e=()=>{const n=hr();for(const[s,l]of n)if(s.id===a)return{group:s,...l};throw Error(`Could not find Group with id "${a}"`)};return{getLayout(){const{defaultLayoutDeferred:n,layout:s}=e();return n?{}:s},setLayout(n){const{defaultLayoutDeferred:s,derivedPanelConstraints:l,group:c,groupSize:u,layout:d,separatorToPanels:m}=e(),p=rr({layout:n,panelConstraints:l});return s?d:(sr(d,p)||Oa(c,{defaultLayoutDeferred:s,derivedPanelConstraints:l,groupSize:u,layout:p,separatorToPanels:m}),p)}}}function Qs(a,e){const n=Wu(a),s=Ms(n.id,!0),l=n.separators.find(_=>_.element===a);qt(l,"Matching separator not found");const c=s.separatorToPanels.get(l);qt(c,"Matching panels not found");const u=c.map(_=>n.panels.indexOf(_)),d=GS({groupId:n.id}).getLayout(),m=jl({delta:e,initialLayout:d,panelConstraints:s.derivedPanelConstraints,pivotIndices:u,prevLayout:d,trigger:"keyboard"}),p=rr({layout:m,panelConstraints:s.derivedPanelConstraints});sr(d,p)||Oa(n,{defaultLayoutDeferred:s.defaultLayoutDeferred,derivedPanelConstraints:s.derivedPanelConstraints,groupSize:s.groupSize,layout:p,separatorToPanels:s.separatorToPanels})}function vy(a){if(a.defaultPrevented)return;const e=a.currentTarget,n=Wu(e);if(!n.disabled)switch(a.key){case"ArrowDown":{a.preventDefault(),n.orientation==="vertical"&&Qs(e,5);break}case"ArrowLeft":{a.preventDefault(),n.orientation==="horizontal"&&Qs(e,-5);break}case"ArrowRight":{a.preventDefault(),n.orientation==="horizontal"&&Qs(e,5);break}case"ArrowUp":{a.preventDefault(),n.orientation==="vertical"&&Qs(e,-5);break}case"End":{a.preventDefault(),Qs(e,100);break}case"Enter":{a.preventDefault();const s=Wu(e),l=Ms(s.id,!0),{derivedPanelConstraints:c,layout:u,separatorToPanels:d}=l,m=s.separators.find(g=>g.element===e);qt(m,"Matching separator not found");const p=d.get(m);qt(p,"Matching panels not found");const _=p[0],x=c.find(g=>g.panelId===_.id);if(qt(x,"Panel metadata not found"),x.collapsible){const g=u[_.id],S=x.collapsedSize===g?s.mutableState.expandedPanelSizes[_.id]??x.minSize:x.collapsedSize;Qs(e,S-g)}break}case"F6":{a.preventDefault();const s=Wu(e).separators.map(u=>u.element),l=Array.from(s).findIndex(u=>u===a.currentTarget);qt(l!==null,"Index not found");const c=a.shiftKey?l>0?l-1:s.length-1:l+1<s.length?l+1:0;s[c].focus({preventScroll:!0});break}case"Home":{a.preventDefault(),Qs(e,-100);break}}}let _o={cursorFlags:0,state:"inactive"};const Fm=new IS;function or(){return _o}function RD(a){return Fm.addListener("change",a)}function CD(a){const e=_o,n={..._o};n.cursorFlags=a,_o=n,Fm.emit("change",{prev:e,next:n})}function xo(a){const e=_o;_o=a,Fm.emit("change",{prev:e,next:a})}function yy(a){if(a.defaultPrevented||a.pointerType==="mouse"&&a.button>0)return;const e=hr(),n=Im(a,e),s=new Map;let l=!1;n.forEach(c=>{c.separator&&(l||(l=!0,c.separator.element.focus({focusVisible:!1,preventScroll:!0})));const u=e.get(c.group);u&&s.set(c.group,u.layout)}),xo({cursorFlags:0,hitRegions:n,initialLayoutMap:s,pointerDownAtPoint:{x:a.clientX,y:a.clientY},state:"active"}),n.length&&a.preventDefault()}const DD=a=>a,cp=()=>{},VS=1,kS=2,jS=4,XS=8,Sy=3,by=12;let Fu;function My(){return Fu===void 0&&(Fu=!1,typeof window<"u"&&(window.navigator.userAgent.includes("Chrome")||window.navigator.userAgent.includes("Firefox"))&&(Fu=!0)),Fu}function ND({cursorFlags:a,groups:e,state:n}){let s=0,l=0;switch(n){case"active":case"hover":e.forEach(c=>{if(!c.mutableState.disableCursor)switch(c.orientation){case"horizontal":{s++;break}case"vertical":{l++;break}}})}if(!(s===0&&l===0)){switch(n){case"active":{if(a&&My()){const c=(a&VS)!==0,u=(a&kS)!==0,d=(a&jS)!==0,m=(a&XS)!==0;if(c)return d?"se-resize":m?"ne-resize":"e-resize";if(u)return d?"sw-resize":m?"nw-resize":"w-resize";if(d)return"s-resize";if(m)return"n-resize"}break}}return My()?s>0&&l>0?"move":s>0?"ew-resize":"ns-resize":s>0&&l>0?"grab":s>0?"col-resize":"row-resize"}}const Ey=new WeakMap;function Bm(a){if(a.defaultView===null||a.defaultView===void 0)return;let{prevStyle:e,styleSheet:n}=Ey.get(a)??{};n===void 0&&(n=new a.defaultView.CSSStyleSheet,a.adoptedStyleSheets&&(Object.isExtensible(a.adoptedStyleSheets)?a.adoptedStyleSheets.push(n):a.adoptedStyleSheets=[...a.adoptedStyleSheets,n]));const s=or();switch(s.state){case"active":case"hover":{const l=ND({cursorFlags:s.cursorFlags,groups:s.hitRegions.map(u=>u.group),state:s.state}),c=`*, *:hover {cursor: ${l} !important; }`;if(e===c)return;e=c,l?n.cssRules.length===0?n.insertRule(c):n.replaceSync(c):n.cssRules.length===1&&n.deleteRule(0);break}case"inactive":{e=void 0,n.cssRules.length===1&&n.deleteRule(0);break}}Ey.set(a,{prevStyle:e,styleSheet:n})}function WS({document:a,event:e,hitRegions:n,initialLayoutMap:s,mountedGroups:l,pointerDownAtPoint:c,prevCursorFlags:u}){let d=0;n.forEach(p=>{const{group:_,groupSize:x}=p,{orientation:g,panels:S}=_,{disableCursor:M}=_.mutableState;let E=0;c?g==="horizontal"?E=(e.clientX-c.x)/x*100:E=(e.clientY-c.y)/x*100:g==="horizontal"?E=e.clientX<0?-100:100:E=e.clientY<0?-100:100;const v=s.get(_),y=l.get(_);if(!v||!y)return;const{defaultLayoutDeferred:A,derivedPanelConstraints:N,groupSize:C,layout:I,separatorToPanels:U}=y;if(N&&I&&U){const z=jl({delta:E,initialLayout:v,panelConstraints:N,pivotIndices:p.panels.map(T=>S.indexOf(T)),prevLayout:I,trigger:"mouse-or-touch"});if(sr(z,I)){if(E!==0&&!M)switch(g){case"horizontal":{d|=E<0?VS:kS;break}case"vertical":{d|=E<0?jS:XS;break}}}else Oa(p.group,{defaultLayoutDeferred:A,derivedPanelConstraints:N,groupSize:C,layout:z,separatorToPanels:U})}});let m=0;e.movementX===0?m|=u&Sy:m|=d&Sy,e.movementY===0?m|=u&by:m|=d&by,CD(m),Bm(a)}function Ty(a){const e=hr(),n=or();switch(n.state){case"active":WS({document:a.currentTarget,event:a,hitRegions:n.hitRegions,initialLayoutMap:n.initialLayoutMap,mountedGroups:e,prevCursorFlags:n.cursorFlags})}}function Ay(a){var s,l;if(a.defaultPrevented)return;const e=or(),n=hr();switch(e.state){case"active":{if(a.buttons===0){xo({cursorFlags:0,state:"inactive"}),e.hitRegions.forEach(c=>{const u=Ms(c.group.id,!0);Oa(c.group,u)});return}for(const c of e.hitRegions)if(c.separator){const{element:u}=c.separator;(s=u.hasPointerCapture)!=null&&s.call(u,a.pointerId)||((l=u.setPointerCapture)==null||l.call(u,a.pointerId))}WS({document:a.currentTarget,event:a,hitRegions:e.hitRegions,initialLayoutMap:e.initialLayoutMap,mountedGroups:n,pointerDownAtPoint:e.pointerDownAtPoint,prevCursorFlags:e.cursorFlags});break}default:{const c=Im(a,n);c.length===0?e.state!=="inactive"&&xo({cursorFlags:0,state:"inactive"}):xo({cursorFlags:0,hitRegions:c,state:"hover"}),Bm(a.currentTarget);break}}}function wy(a){if(a.relatedTarget instanceof HTMLIFrameElement)switch(or().state){case"hover":xo({cursorFlags:0,state:"inactive"})}}function Ry(a){if(a.defaultPrevented||a.pointerType==="mouse"&&a.button>0)return;const e=or();switch(e.state){case"active":xo({cursorFlags:0,state:"inactive"}),e.hitRegions.length>0&&(Bm(a.currentTarget),e.hitRegions.forEach(n=>{const s=Ms(n.group.id,!0);Oa(n.group,s)}),a.preventDefault())}}function Cy(a){let e=0,n=0;const s={};for(const c of a)if(c.defaultSize!==void 0){e++;const u=Yn(c.defaultSize);n+=u,s[c.panelId]=u}else s[c.panelId]=void 0;const l=a.length-e;if(l!==0){const c=Yn((100-n)/l);for(const u of a)u.defaultSize===void 0&&(s[u.panelId]=c)}return s}function LD(a,e,n){if(!n[0])return;const s=a.panels.find(m=>m.element===e);if(!s||!s.onResize)return;const l=Mo({group:a}),c=a.orientation==="horizontal"?s.element.offsetWidth:s.element.offsetHeight,u=s.mutableValues.prevSize,d={asPercentage:Yn(c/l*100),inPixels:c};s.mutableValues.prevSize=d,s.onResize(d,s.id,u)}function UD(a,e){if(Object.keys(a).length!==Object.keys(e).length)return!1;for(const n in a)if(a[n]!==e[n])return!1;return!0}function OD({group:a,nextGroupSize:e,prevGroupSize:n,prevLayout:s}){if(n<=0||e<=0||n===e)return s;let l=0,c=0,u=!1;const d=new Map,m=[];for(const x of a.panels){const g=s[x.id]??0;switch(x.panelConstraints.groupResizeBehavior){case"preserve-pixel-size":{u=!0;const S=g/100*n,M=Yn(S/e*100);d.set(x.id,M),l+=M;break}case"preserve-relative-size":default:{m.push(x.id),c+=g;break}}}if(!u||m.length===0)return s;const p=100-l,_={...s};if(d.forEach((x,g)=>{_[g]=x}),c>0)for(const x of m){const g=s[x]??0;_[x]=Yn(g/c*p)}else{const x=Yn(p/m.length);for(const g of m)_[g]=x}return _}function PD(a,e){const n=a.map(l=>l.id),s=Object.keys(e);if(n.length!==s.length)return!1;for(const l of n)if(!s.includes(l))return!1;return!0}const uo=new Map;function zD(a){let e=!0;qt(a.element.ownerDocument.defaultView,"Cannot register an unmounted Group");const n=a.element.ownerDocument.defaultView.ResizeObserver,s=new Set,l=new Set,c=new n(M=>{for(const E of M){const{borderBoxSize:v,target:y}=E;if(y===a.element){if(e){const A=Mo({group:a});if(A===0)return;const N=Ms(a.id);if(!N)return;const C=fm(a),I=N.defaultLayoutDeferred?Cy(C):N.layout,U=OD({group:a,nextGroupSize:A,prevGroupSize:N.groupSize,prevLayout:I}),z=rr({layout:U,panelConstraints:C});if(!N.defaultLayoutDeferred&&sr(N.layout,z)&&UD(N.derivedPanelConstraints,C)&&N.groupSize===A)return;Oa(a,{defaultLayoutDeferred:!1,derivedPanelConstraints:C,groupSize:A,layout:z,separatorToPanels:N.separatorToPanels})}}else LD(a,y,v)}});c.observe(a.element),a.panels.forEach(M=>{qt(!s.has(M.id),`Panel ids must be unique; id "${M.id}" was used more than once`),s.add(M.id),M.onResize&&c.observe(M.element)});const u=Mo({group:a}),d=fm(a),m=a.panels.map(({id:M})=>M).join(",");let p=a.mutableState.defaultLayout;p&&(PD(a.panels,p)||(p=void 0));const _=a.mutableState.layouts[m]??p??Cy(d),x=rr({layout:_,panelConstraints:d}),g=a.element.ownerDocument;uo.set(g,(uo.get(g)??0)+1);const S=new Map;return zS(a).forEach(M=>{M.separator&&S.set(M.separator,M.panels)}),Oa(a,{defaultLayoutDeferred:u===0,derivedPanelConstraints:d,groupSize:u,layout:x,separatorToPanels:S}),a.separators.forEach(M=>{qt(!l.has(M.id),`Separator ids must be unique; id "${M.id}" was used more than once`),l.add(M.id),M.element.addEventListener("keydown",vy)}),uo.get(g)===1&&(g.addEventListener("dblclick",xy,!0),g.addEventListener("pointerdown",yy,!0),g.addEventListener("pointerleave",Ty),g.addEventListener("pointermove",Ay),g.addEventListener("pointerout",wy),g.addEventListener("pointerup",Ry,!0)),function(){e=!1,uo.set(g,Math.max(0,(uo.get(g)??0)-1)),xD(a),a.separators.forEach(M=>{M.element.removeEventListener("keydown",vy)}),uo.get(g)||(g.removeEventListener("dblclick",xy,!0),g.removeEventListener("pointerdown",yy,!0),g.removeEventListener("pointerleave",Ty),g.removeEventListener("pointermove",Ay),g.removeEventListener("pointerout",wy),g.removeEventListener("pointerup",Ry,!0)),c.disconnect()}}function ID(){const[a,e]=pe.useState({}),n=pe.useCallback(()=>e({}),[]);return[a,n]}function Hm(a){const e=pe.useId();return`${a??e}`}const dr=typeof window<"u"?pe.useLayoutEffect:pe.useEffect;function Il(a){const e=pe.useRef(a);return dr(()=>{e.current=a},[a]),pe.useCallback((...n)=>{var s;return(s=e.current)==null?void 0:s.call(e,...n)},[e])}function Gm(...a){return Il(e=>{a.forEach(n=>{if(n)switch(typeof n){case"function":{n(e);break}case"object":{n.current=e;break}}})})}function Vm(a){const e=pe.useRef({...a});return dr(()=>{for(const n in a)e.current[n]=a[n]},[a]),e.current}const qS=pe.createContext(null);function FD(a,e){const n=pe.useRef({getLayout:()=>({}),setLayout:DD});pe.useImperativeHandle(e,()=>n.current,[]),dr(()=>{Object.assign(n.current,GS({groupId:a}))})}function YS({children:a,className:e,defaultLayout:n,disableCursor:s,disabled:l,elementRef:c,groupRef:u,id:d,onLayoutChange:m,onLayoutChanged:p,orientation:_="horizontal",resizeTargetMinimumSize:x={coarse:20,fine:10},style:g,...S}){const M=pe.useRef({onLayoutChange:{},onLayoutChanged:{}}),E=Il(B=>{sr(M.current.onLayoutChange,B)||(M.current.onLayoutChange=B,m==null||m(B))}),v=Il(B=>{sr(M.current.onLayoutChanged,B)||(M.current.onLayoutChanged=B,p==null||p(B))}),y=Hm(d),A=pe.useRef(null),[N,C]=ID(),I=pe.useRef({lastExpandedPanelSizes:{},layouts:{},panels:[],resizeTargetMinimumSize:x,separators:[]}),U=Gm(A,c);FD(y,u);const z=Il((B,j)=>{const ie=or(),ae=py(B),V=Ms(B);if(V){let O=!1;switch(ie.state){case"active":{O=ie.hitRegions.some(G=>G.group===ae);break}}return{flexGrow:V.layout[j]??1,pointerEvents:O?"none":void 0}}if(n!=null&&n[j])return{flexGrow:n==null?void 0:n[j]}}),T=Vm({defaultLayout:n,disableCursor:s}),F=pe.useMemo(()=>({get disableCursor(){return!!T.disableCursor},getPanelStyles:z,id:y,orientation:_,registerPanel:B=>{const j=I.current;return j.panels=hm(_,[...j.panels,B]),C(),()=>{j.panels=j.panels.filter(ie=>ie!==B),C()}},registerSeparator:B=>{const j=I.current;return j.separators=hm(_,[...j.separators,B]),C(),()=>{j.separators=j.separators.filter(ie=>ie!==B),C()}},updatePanelProps:(B,{disabled:j})=>{const ie=I.current.panels.find(O=>O.id===B);ie&&(ie.panelConstraints.disabled=j);const ae=py(y),V=Ms(y);ae&&V&&Oa(ae,{...V,derivedPanelConstraints:fm(ae)})},updateSeparatorProps:(B,{disabled:j,disableDoubleClick:ie})=>{const ae=I.current.separators.find(V=>V.id===B);ae&&(ae.disabled=j,ae.disableDoubleClick=ie)}}),[z,y,C,_,T]),X=pe.useRef(null);return dr(()=>{const B=A.current;if(B===null)return;const j=I.current;let ie;if(T.defaultLayout!==void 0&&Object.keys(T.defaultLayout).length===j.panels.length){ie={};for(const ge of j.panels){const H=T.defaultLayout[ge.id];H!==void 0&&(ie[ge.id]=H)}}const ae={disabled:!!l,element:B,id:y,mutableState:{defaultLayout:ie,disableCursor:!!T.disableCursor,expandedPanelSizes:I.current.lastExpandedPanelSizes,layouts:I.current.layouts},orientation:_,panels:j.panels,resizeTargetMinimumSize:j.resizeTargetMinimumSize,separators:j.separators};X.current=ae;const V=zD(ae),{defaultLayoutDeferred:O,derivedPanelConstraints:G,layout:$}=Ms(ae.id,!0);!O&&G.length>0&&(E($),v($));const he=zm(y,ge=>{const{defaultLayoutDeferred:H,derivedPanelConstraints:K,layout:ye}=ge.next;if(H||K.length===0)return;const ee=ae.panels.map(({id:te})=>te).join(",");ae.mutableState.layouts[ee]=ye,K.forEach(te=>{if(te.collapsible){const{layout:se}=ge.prev??{};if(se){const me=kn(te.collapsedSize,ye[te.panelId]),Ae=kn(te.collapsedSize,se[te.panelId]);me&&!Ae&&(ae.mutableState.expandedPanelSizes[te.panelId]=se[te.panelId])}}});const Ee=or().state!=="active";E(ye),Ee&&v(ye)});return()=>{X.current=null,V(),he()}},[l,y,v,E,_,N,T]),pe.useEffect(()=>{const B=X.current;B&&(B.mutableState.defaultLayout=n,B.mutableState.disableCursor=!!s)}),R.jsx(qS.Provider,{value:F,children:R.jsx("div",{...S,className:e,"data-group":!0,"data-testid":y,id:y,ref:U,style:{height:"100%",width:"100%",overflow:"hidden",...g,display:"flex",flexDirection:_==="horizontal"?"row":"column",flexWrap:"nowrap",touchAction:_==="horizontal"?"pan-y":"pan-x"},children:a})})}YS.displayName="Group";function km(){const a=pe.useContext(qS);return qt(a,"Group Context not found; did you render a Panel or Separator outside of a Group?"),a}function BD(a,e){const{id:n}=km(),s=pe.useRef({collapse:cp,expand:cp,getSize:()=>({asPercentage:0,inPixels:0}),isCollapsed:()=>!1,resize:cp});pe.useImperativeHandle(e,()=>s.current,[]),dr(()=>{Object.assign(s.current,HS({groupId:n,panelId:a}))})}function qu({children:a,className:e,collapsedSize:n="0%",collapsible:s=!1,defaultSize:l,disabled:c,elementRef:u,groupResizeBehavior:d="preserve-relative-size",id:m,maxSize:p="100%",minSize:_="0%",onResize:x,panelRef:g,style:S,...M}){const E=!!m,v=Hm(m),y=Vm({disabled:c}),A=pe.useRef(null),N=Gm(A,u),{getPanelStyles:C,id:I,orientation:U,registerPanel:z,updatePanelProps:T}=km(),F=x!==null,X=Il((ae,V,O)=>{x==null||x(ae,m,O)});dr(()=>{const ae=A.current;if(ae!==null){const V={element:ae,id:v,idIsStable:E,mutableValues:{expandToSize:void 0,prevSize:void 0},onResize:F?X:void 0,panelConstraints:{groupResizeBehavior:d,collapsedSize:n,collapsible:s,defaultSize:l,disabled:y.disabled,maxSize:p,minSize:_}};return z(V)}},[d,n,s,l,F,v,E,p,_,X,z,y]),pe.useEffect(()=>{T(v,{disabled:c})},[c,v,T]),BD(v,g);const B=()=>{const ae=C(I,v);if(ae)return JSON.stringify(ae)},j=pe.useSyncExternalStore(ae=>zm(I,ae),B,B);let ie;return j?ie=JSON.parse(j):l!==void 0?ie={flexGrow:void 0,flexShrink:void 0,flexBasis:l}:ie={flexGrow:1},R.jsx("div",{...M,"data-disabled":c||void 0,"data-panel":!0,"data-testid":v,id:v,ref:N,style:{...HD,display:"flex",flexBasis:0,flexShrink:1,overflow:"visible",...ie},children:R.jsx("div",{className:e,style:{maxHeight:"100%",maxWidth:"100%",flexGrow:1,overflow:"auto",...S,touchAction:U==="horizontal"?"pan-y":"pan-x"},children:a})})}qu.displayName="Panel";const HD={minHeight:0,maxHeight:"100%",height:"auto",minWidth:0,maxWidth:"100%",width:"auto",border:"none",borderWidth:0,padding:0,margin:0};function GD({layout:a,panelConstraints:e,panelId:n,panelIndex:s}){let l,c;const u=a[n],d=e.find(m=>m.panelId===n);if(d){const m=d.maxSize,p=d.collapsible?d.collapsedSize:d.minSize,_=[s,s+1];c=rr({layout:jl({delta:p-u,initialLayout:a,panelConstraints:e,pivotIndices:_,prevLayout:a}),panelConstraints:e})[n],l=rr({layout:jl({delta:m-u,initialLayout:a,panelConstraints:e,pivotIndices:_,prevLayout:a}),panelConstraints:e})[n]}return{valueControls:n,valueMax:l,valueMin:c,valueNow:u}}function dm({children:a,className:e,disabled:n,disableDoubleClick:s,elementRef:l,id:c,style:u,...d}){const m=Hm(c),p=Vm({disabled:n,disableDoubleClick:s}),[_,x]=pe.useState({}),[g,S]=pe.useState("inactive"),[M,E]=pe.useState(!1),v=pe.useRef(null),y=Gm(v,l),{disableCursor:A,id:N,orientation:C,registerSeparator:I,updateSeparatorProps:U}=km(),z=C==="horizontal"?"vertical":"horizontal";dr(()=>{const X=v.current;if(X!==null){const B={disabled:p.disabled,disableDoubleClick:p.disableDoubleClick,element:X,id:m},j=I(B),ie=RD(V=>{S(V.next.state!=="inactive"&&V.next.hitRegions.some(O=>O.separator===B)?V.next.state:"inactive")}),ae=zm(N,V=>{const{derivedPanelConstraints:O,layout:G,separatorToPanels:$}=V.next,he=$.get(B);if(he){const ge=he[0],H=he.indexOf(ge);x(GD({layout:G,panelConstraints:O,panelId:ge.id,panelIndex:H}))}});return()=>{ie(),ae(),j()}}},[N,m,I,p]),pe.useEffect(()=>{U(m,{disabled:n,disableDoubleClick:s})},[n,s,m,U]);let T;n&&!A&&(T="not-allowed");let F;if(n)F="disabled";else switch(g){case"active":{F="active";break}default:M?F="focus":F=g}return R.jsx("div",{...d,"aria-controls":_.valueControls,"aria-disabled":n||void 0,"aria-orientation":z,"aria-valuemax":_.valueMax,"aria-valuemin":_.valueMin,"aria-valuenow":_.valueNow,children:a,className:e,"data-separator":F,"data-testid":m,id:m,onBlur:()=>E(!1),onFocus:()=>E(!0),ref:y,role:"separator",style:{flexBasis:"auto",cursor:T,...u,flexGrow:0,flexShrink:0,touchAction:"none"},tabIndex:n?void 0:0})}dm.displayName="Separator";const Dy=a=>{let e;const n=new Set,s=(p,_)=>{const x=typeof p=="function"?p(e):p;if(!Object.is(x,e)){const g=e;e=_??(typeof x!="object"||x===null)?x:Object.assign({},e,x),n.forEach(S=>S(e,g))}},l=()=>e,d={setState:s,getState:l,getInitialState:()=>m,subscribe:p=>(n.add(p),()=>n.delete(p))},m=e=a(s,l,d);return d},VD=(a=>a?Dy(a):Dy),kD=a=>a;function jD(a,e=kD){const n=Nl.useSyncExternalStore(a.subscribe,Nl.useCallback(()=>e(a.getState()),[a,e]),Nl.useCallback(()=>e(a.getInitialState()),[a,e]));return Nl.useDebugValue(n),n}const XD=a=>{const e=VD(a),n=s=>jD(e,s);return Object.assign(n,e),n},WD=(a=>XD);function qD(a,e){let n;try{n=a()}catch{return}return{getItem:l=>{var c;const u=m=>m===null?null:JSON.parse(m,void 0),d=(c=n.getItem(l))!=null?c:null;return d instanceof Promise?d.then(u):u(d)},setItem:(l,c)=>n.setItem(l,JSON.stringify(c,void 0)),removeItem:l=>n.removeItem(l)}}const pm=a=>e=>{try{const n=a(e);return n instanceof Promise?n:{then(s){return pm(s)(n)},catch(s){return this}}}catch(n){return{then(s){return this},catch(s){return pm(s)(n)}}}},YD=(a,e)=>(n,s,l)=>{let c={storage:qD(()=>window.localStorage),partialize:v=>v,version:0,merge:(v,y)=>({...y,...v}),...e},u=!1,d=0;const m=new Set,p=new Set;let _=c.storage;if(!_)return a((...v)=>{console.warn(`[zustand persist middleware] Unable to update item '${c.name}', the given storage is currently unavailable.`),n(...v)},s,l);const x=()=>{const v=c.partialize({...s()});return _.setItem(c.name,{state:v,version:c.version})},g=l.setState;l.setState=(v,y)=>(g(v,y),x());const S=a((...v)=>(n(...v),x()),s,l);l.getInitialState=()=>S;let M;const E=()=>{var v,y;if(!_)return;const A=++d;u=!1,m.forEach(C=>{var I;return C((I=s())!=null?I:S)});const N=((y=c.onRehydrateStorage)==null?void 0:y.call(c,(v=s())!=null?v:S))||void 0;return pm(_.getItem.bind(_))(c.name).then(C=>{if(C)if(typeof C.version=="number"&&C.version!==c.version){if(c.migrate){const I=c.migrate(C.state,C.version);return I instanceof Promise?I.then(U=>[!0,U]):[!0,I]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,C.state];return[!1,void 0]}).then(C=>{var I;if(A!==d)return;const[U,z]=C;if(M=c.merge(z,(I=s())!=null?I:S),n(M,!0),U)return x()}).then(()=>{A===d&&(N==null||N(s(),void 0),M=s(),u=!0,p.forEach(C=>C(M)))}).catch(C=>{A===d&&(N==null||N(void 0,C))})};return l.persist={setOptions:v=>{c={...c,...v},v.storage&&(_=v.storage)},clearStorage:()=>{_==null||_.removeItem(c.name)},getOptions:()=>c,rehydrate:()=>E(),hasHydrated:()=>u,onHydrate:v=>(m.add(v),()=>{m.delete(v)}),onFinishHydration:v=>(p.add(v),()=>{p.delete(v)})},c.skipHydration||E(),M||S},ZD=YD,KD=WD()(ZD(a=>({hasLaunchedDashboard:!1,markDashboardLaunched:()=>a({hasLaunchedDashboard:!0})}),{name:"eef.ui"})),up=typeof navigator<"u"&&navigator.userAgent.includes("Electron");function QD(){const a=KD(se=>se.markDashboardLaunched);pe.useEffect(()=>{a()},[a]);const[e,n]=pe.useState({mode:"synthetic",speedHz:1.5,noiseLevel:.03,currentAnomaly:0,driftFactor:0,flowSpeed:1}),[s,l]=pe.useState(!0),[c,u]=pe.useState(0),[d,m]=pe.useState([]),[p,_]=pe.useState(null),[x,g]=pe.useState(0),[S,M]=pe.useState(()=>{try{const se=localStorage.getItem("eef.customColors");return se?JSON.parse(se):{}}catch{return{}}});pe.useEffect(()=>{try{localStorage.setItem("eef.customColors",JSON.stringify(S))}catch{}},[S]);const E=(se,me)=>{M(Ae=>({...Ae,[se]:me}))},v=se=>{M(me=>{const Ae={...me};return delete Ae[se],Ae})},[y,A]=pe.useState(3),[N,C]=pe.useState(2.5),[I,U]=pe.useState(!0),[z,T]=pe.useState(!1),[F,X]=pe.useState(!0),[B,j]=pe.useState("iso"),[ie,ae]=pe.useState({CHL:{visible:!0,opacity:.72},aphy:{visible:!0,opacity:.72},ADG:{visible:!0,opacity:.72},bbp:{visible:!0,opacity:.72},TSM:{visible:!0,opacity:.72},PAR:{visible:!0,opacity:.72},KD490:{visible:!0,opacity:.72}}),[V,O]=pe.useState("");pe.useEffect(()=>{const se=()=>{O(new Date().toUTCString().replace("GMT","UTC"))};se();const me=setInterval(se,1e3);return()=>clearInterval(me)},[]);const[G,$]=pe.useState(()=>au(0,{mode:"synthetic",noiseLevel:.03,currentAnomaly:0,driftFactor:0,flowSpeed:1}));pe.useEffect(()=>{if(!s)return;const se=1e3/e.speedHz,Ae=setInterval(()=>{e.mode==="uploaded"&&d.length>0?g(Ke=>{const Ye=(Ke+1)%d.length;return $(d[Ye]),Ye}):u(Ke=>{const Ye=Ke+1/e.speedHz,Dt=au(Ye,e);return $(Dt),Ye})},se);return()=>clearInterval(Ae)},[s,e,d]);const he=se=>{d[se]&&(g(se),$(d[se]))};pe.useEffect(()=>{if(e.mode!=="uploaded"){const se=au(c,e);$(se)}else d.length>0&&$(d[x]||d[0])},[e.mode]);const ge=pe.useMemo(()=>bT(G),[G]),H=pe.useMemo(()=>{const se={};return["CHL","aphy","ADG","bbp","TSM","PAR","KD490"].forEach(Ae=>{se[Ae]=G.stats[Ae].mean}),se},[G]),K=se=>{n(me=>({...me,...se}))},ye=(se,me)=>{if(se.length===0)return;const Ae=me||"satellite_grid_mesh.csv";m(se),_(Ae),g(0),$(se[0]),n(Ke=>({...Ke,mode:"uploaded"}));try{localStorage.setItem("eef.uploadedCubes",JSON.stringify({cubes:se,fileName:Ae}))}catch{}};pe.useEffect(()=>{try{const se=localStorage.getItem("eef.uploadedCubes");if(!se)return;const{cubes:me,fileName:Ae}=JSON.parse(se);Array.isArray(me)&&me.length>0&&(m(me),_(Ae),$(me[0]),n(Ke=>({...Ke,mode:"uploaded"})))}catch{}},[]);const ee=se=>{ae(me=>({...me,[se]:{...me[se],visible:!me[se].visible}}))},Ee=(se,me)=>{ae(Ae=>({...Ae,[se]:{...Ae[se],opacity:me}}))},te=()=>{u(0),g(0);const se=au(0,{...e,currentAnomaly:0,driftFactor:0,noiseLevel:.02});$(se),n(me=>({...me,currentAnomaly:0,driftFactor:0,noiseLevel:.02,flowSpeed:1,speedHz:1.5}))};return R.jsxs("div",{className:"h-screen bg-[#030307] text-[#f8fafc] flex flex-col antialiased selection:bg-white selection:text-black",children:[R.jsxs("header",{className:`h-[56px] border-b border-white/5 bg-[#030307]/80 backdrop-blur-xl pr-4 flex items-center justify-between z-10 sticky top-0 ${up?"pl-20":"pl-4"}`,style:up?{WebkitAppRegion:"drag"}:void 0,children:[R.jsxs("div",{className:"flex items-center gap-3",children:[!up&&R.jsx(Bu,{to:"/",className:"w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors","aria-label":"Back to overview",children:R.jsx(yE,{size:14})}),R.jsxs("div",{className:"relative w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-black text-sm select-none shadow-[0_0_15px_rgba(255,255,255,0.2)]",children:[R.jsx(xm,{size:16,className:"animate-pulse"}),R.jsx("div",{className:"absolute inset-0 rounded-lg border border-white/30 animate-ping-[duration:2s]"})]}),R.jsxs("div",{children:[R.jsxs("div",{className:"flex items-center gap-2",children:[R.jsx("h1",{className:"text-sm font-black uppercase tracking-wider text-white",children:"EEF"}),R.jsx("span",{className:"text-white/30 text-xs",children:"|"}),R.jsx("span",{className:"text-[11px] font-mono tracking-widest text-white/90 font-bold bg-white/10 border border-white/10 px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(255,255,255,0.05)]",children:"ECOLOGICAL ENCODING FRAMEWORK"})]}),R.jsx("p",{className:"text-[10px] text-white/40 font-mono tracking-tight leading-none mt-0.5",children:"Multi-Layer Spectrometry Analysis Console"})]})]}),R.jsxs("div",{className:"hidden md:flex items-center gap-2.5 px-3 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[11px] text-white font-bold",children:[R.jsx("span",{className:"w-2 h-2 rounded-full bg-white pulse-teal-glow"}),R.jsx("span",{className:"text-white/40 font-normal",children:"LOCK TIMER:"}),R.jsx("span",{children:V||"UTC LOCKING..."})]}),R.jsxs("div",{className:"flex items-center gap-3",children:[R.jsxs("div",{className:"hidden sm:flex flex-col text-right font-mono",children:[R.jsx("span",{className:"text-[10px] text-white/40 leading-none",children:"FEEDBACK COUPLING:"}),R.jsx("span",{className:"text-[11px] text-white/80 leading-tight",children:"iceicefelix@gmail.com"})]}),R.jsx("div",{className:"w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/70",children:R.jsx(uT,{size:14})})]})]}),R.jsxs("main",{className:"flex-1 min-h-0 p-4 max-w-[1720px] w-full mx-auto overflow-hidden flex flex-col lg:block",children:[R.jsx("div",{className:"hidden lg:block h-full",children:R.jsxs(YS,{orientation:"horizontal",className:"h-full gap-0",children:[R.jsx(qu,{defaultSize:33,minSize:22,className:"flex flex-col min-h-0",children:R.jsx("section",{className:"flex flex-col gap-4 overflow-y-auto h-full min-h-0 pr-2",children:R.jsxs("div",{className:"glass-panel rounded-xl p-4 flex-1 flex flex-col gap-3 min-h-[420px]",children:[R.jsxs("div",{className:"flex justify-between items-center border-b border-white/5 pb-2",children:[R.jsxs("h2",{className:"text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5",children:[R.jsx(gp,{size:13,className:"text-white/60"})," SENSOR COUPLING AND DECODER CONSOLE"]}),R.jsx("span",{className:"text-[10px] font-mono text-white/40 font-bold",children:"DECODER_CORE"})]}),R.jsx("div",{className:"flex-1",children:R.jsx(hy,{config:e,onChangeConfig:K,isStreaming:s,onToggleStreaming:()=>l(!s),onResetStream:te,onUploadCSVData:ye,customColors:S,onChangeCustomColor:E,onResetCustomColor:v,variableAverages:H,activeCSVFileName:p,csvFramesCount:d.length,currentCSVFrameIdx:x,onChangeCSVFrameIdx:he,cameraPreset:B,onChangeCameraPreset:j,showTerrain:I,onChangeShowTerrain:U,showWireframe:z,onChangeShowWireframe:T,showLabels:F,onChangeShowLabels:X,spacing:y,onChangeSpacing:A,displacementGain:N,onChangeDisplacementGain:C,dataCube:G})})]})})}),R.jsx(dm,{className:"resize-handle"}),R.jsx(qu,{defaultSize:42,minSize:20,className:"flex flex-col min-h-0",children:R.jsx("section",{className:"flex flex-col gap-4 h-full min-h-0 px-2",children:R.jsxs("div",{className:"glass-panel rounded-xl overflow-hidden flex-1 relative flex flex-col",children:[R.jsxs("div",{className:"absolute top-3 left-3 z-20 pointer-events-none select-none",children:[R.jsxs("div",{className:"flex items-center gap-1.5",children:[R.jsx(Hl,{className:"text-white pulse-teal-glow rounded-full p-0.5",size:12}),R.jsx("span",{className:"text-[10px] font-mono font-bold uppercase tracking-widest text-white",children:"REAL-TIME 3D GRIDS MATRIX HUD"})]}),R.jsx("p",{className:"text-[9px] font-mono text-white/45 leading-none mt-0.5",children:"Multi-Layer Spectrometry Terrain Map (20 × 20 Grid)"})]}),R.jsxs("div",{className:"absolute bottom-4 left-4 z-20 text-[10px] font-mono text-white/50 select-none bg-black/45 px-2.5 py-1.5 rounded-lg border border-white/5 backdrop-blur-md flex flex-col gap-0.5",children:[R.jsx("span",{className:"text-white/80 font-bold",children:"DRAG:"})," Rotate angle (Orbit)",R.jsx("span",{className:"text-white/80 font-bold",children:"WHEEL/PINCH:"})," Variable zoom scaling",R.jsx("span",{className:"text-white/80 font-bold",children:"SHIFT KEYS:"})," Vertical spacing / Opacities"]}),R.jsx("div",{className:"flex-1 w-full h-full",children:R.jsx(fy,{dataCube:G,layerState:ie,spacing:y,displacementGain:N,showTerrain:I,showWireframe:z,showLabels:F,cameraPreset:B,customColors:S})})]})})}),R.jsx(dm,{className:"resize-handle"}),R.jsx(qu,{defaultSize:25,minSize:16,className:"flex flex-col min-h-0",children:R.jsx("section",{className:"flex flex-col gap-4 overflow-y-auto h-full min-h-0 pl-2",children:R.jsxs("div",{className:"glass-panel rounded-xl p-4 flex-grow flex flex-col gap-3 min-h-[420px]",children:[R.jsxs("div",{className:"flex justify-between items-center border-b border-white/5 pb-2",children:[R.jsxs("h2",{className:"text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5",children:[R.jsx(mp,{size:13,className:"text-white/60"})," CLUSTER SEPARATION & ANOMALIES"]}),R.jsx("span",{className:"text-[10px] font-mono text-white/40 font-bold",children:"DIAGNOSTICS_NODE"})]}),R.jsx("div",{className:"flex-grow",children:R.jsx(dy,{analysis:ge,dataCube:G,layerState:ie,onToggleLayer:ee,onChangeLayerOpacity:Ee,customColors:S,onChangeCustomColor:E,onResetCustomColor:v})})]})})})]})}),R.jsxs("div",{className:"lg:hidden flex flex-col gap-4 overflow-y-auto h-full",children:[R.jsxs("div",{className:"glass-panel rounded-xl p-4 flex flex-col gap-3 min-h-[420px]",children:[R.jsxs("div",{className:"flex justify-between items-center border-b border-white/5 pb-2",children:[R.jsxs("h2",{className:"text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5",children:[R.jsx(gp,{size:13,className:"text-white/60"})," SENSOR COUPLING AND DECODER CONSOLE"]}),R.jsx("span",{className:"text-[10px] font-mono text-white/40 font-bold",children:"DECODER_CORE"})]}),R.jsx(hy,{config:e,onChangeConfig:K,isStreaming:s,onToggleStreaming:()=>l(!s),onResetStream:te,onUploadCSVData:ye,customColors:S,onChangeCustomColor:E,onResetCustomColor:v,variableAverages:H,activeCSVFileName:p,csvFramesCount:d.length,currentCSVFrameIdx:x,onChangeCSVFrameIdx:he,cameraPreset:B,onChangeCameraPreset:j,showTerrain:I,onChangeShowTerrain:U,showWireframe:z,onChangeShowWireframe:T,showLabels:F,onChangeShowLabels:X,spacing:y,onChangeSpacing:A,displacementGain:N,onChangeDisplacementGain:C,dataCube:G})]}),R.jsxs("div",{className:"glass-panel rounded-xl overflow-hidden relative flex flex-col h-[420px]",children:[R.jsxs("div",{className:"absolute top-3 left-3 z-20 pointer-events-none select-none",children:[R.jsxs("div",{className:"flex items-center gap-1.5",children:[R.jsx(Hl,{className:"text-white pulse-teal-glow rounded-full p-0.5",size:12}),R.jsx("span",{className:"text-[10px] font-mono font-bold uppercase tracking-widest text-white",children:"REAL-TIME 3D GRIDS MATRIX HUD"})]}),R.jsx("p",{className:"text-[9px] font-mono text-white/45 leading-none mt-0.5",children:"Multi-Layer Spectrometry Terrain Map (20 × 20 Grid)"})]}),R.jsx("div",{className:"flex-1 w-full h-full",children:R.jsx(fy,{dataCube:G,layerState:ie,spacing:y,displacementGain:N,showTerrain:I,showWireframe:z,showLabels:F,cameraPreset:B,customColors:S})})]}),R.jsxs("div",{className:"glass-panel rounded-xl p-4 flex flex-col gap-3 min-h-[420px]",children:[R.jsxs("div",{className:"flex justify-between items-center border-b border-white/5 pb-2",children:[R.jsxs("h2",{className:"text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5",children:[R.jsx(mp,{size:13,className:"text-white/60"})," CLUSTER SEPARATION & ANOMALIES"]}),R.jsx("span",{className:"text-[10px] font-mono text-white/40 font-bold",children:"DIAGNOSTICS_NODE"})]}),R.jsx(dy,{analysis:ge,dataCube:G,layerState:ie,onToggleLayer:ee,onChangeLayerOpacity:Ee,customColors:S,onChangeCustomColor:E,onResetCustomColor:v})]})]})]}),R.jsxs("footer",{className:"h-[28px] border-t border-white/5 bg-[#030307] text-[10px] text-white/30 font-mono flex items-center justify-between px-4 select-none",children:[R.jsx("div",{children:R.jsx("span",{children:"EEF PIPELINE ENGINE · CLIENT-SIDE SPECTRAL RECONSTRUCTION CORE"})}),R.jsx("div",{className:"flex gap-4",children:R.jsx("span",{children:"SYSTEM MODE: ACTIVE MATRIX"})})]})]})}function JD(){return R.jsx(lE,{children:R.jsxs(tE,{children:[R.jsx(hp,{path:"/",element:R.jsx(xT,{})}),R.jsx(hp,{path:"/dashboard",element:R.jsx(QD,{})})]})})}l1.createRoot(document.getElementById("root")).render(R.jsx(pe.StrictMode,{children:R.jsx(JD,{})}));
