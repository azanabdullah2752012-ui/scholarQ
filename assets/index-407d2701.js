(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function nv(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var qf={exports:{}},Wo={},Kf={exports:{}},U={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ri=Symbol.for("react.element"),rv=Symbol.for("react.portal"),sv=Symbol.for("react.fragment"),iv=Symbol.for("react.strict_mode"),ov=Symbol.for("react.profiler"),av=Symbol.for("react.provider"),lv=Symbol.for("react.context"),uv=Symbol.for("react.forward_ref"),cv=Symbol.for("react.suspense"),dv=Symbol.for("react.memo"),hv=Symbol.for("react.lazy"),ed=Symbol.iterator;function fv(e){return e===null||typeof e!="object"?null:(e=ed&&e[ed]||e["@@iterator"],typeof e=="function"?e:null)}var Gf={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Jf=Object.assign,Yf={};function Fr(e,t,n){this.props=e,this.context=t,this.refs=Yf,this.updater=n||Gf}Fr.prototype.isReactComponent={};Fr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Fr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Qf(){}Qf.prototype=Fr.prototype;function Lu(e,t,n){this.props=e,this.context=t,this.refs=Yf,this.updater=n||Gf}var Iu=Lu.prototype=new Qf;Iu.constructor=Lu;Jf(Iu,Fr.prototype);Iu.isPureReactComponent=!0;var td=Array.isArray,Xf=Object.prototype.hasOwnProperty,Du={current:null},Zf={key:!0,ref:!0,__self:!0,__source:!0};function ep(e,t,n){var r,s={},i=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(i=""+t.key),t)Xf.call(t,r)&&!Zf.hasOwnProperty(r)&&(s[r]=t[r]);var a=arguments.length-2;if(a===1)s.children=n;else if(1<a){for(var l=Array(a),u=0;u<a;u++)l[u]=arguments[u+2];s.children=l}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)s[r]===void 0&&(s[r]=a[r]);return{$$typeof:ri,type:e,key:i,ref:o,props:s,_owner:Du.current}}function pv(e,t){return{$$typeof:ri,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Mu(e){return typeof e=="object"&&e!==null&&e.$$typeof===ri}function mv(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var nd=/\/+/g;function ka(e,t){return typeof e=="object"&&e!==null&&e.key!=null?mv(""+e.key):t.toString(36)}function Hi(e,t,n,r,s){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case ri:case rv:o=!0}}if(o)return o=e,s=s(o),e=r===""?"."+ka(o,0):r,td(s)?(n="",e!=null&&(n=e.replace(nd,"$&/")+"/"),Hi(s,t,n,"",function(u){return u})):s!=null&&(Mu(s)&&(s=pv(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(nd,"$&/")+"/")+e)),t.push(s)),1;if(o=0,r=r===""?".":r+":",td(e))for(var a=0;a<e.length;a++){i=e[a];var l=r+ka(i,a);o+=Hi(i,t,n,l,s)}else if(l=fv(e),typeof l=="function")for(e=l.call(e),a=0;!(i=e.next()).done;)i=i.value,l=r+ka(i,a++),o+=Hi(i,t,n,l,s);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function pi(e,t,n){if(e==null)return e;var r=[],s=0;return Hi(e,r,"","",function(i){return t.call(n,i,s++)}),r}function gv(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ne={current:null},Wi={transition:null},yv={ReactCurrentDispatcher:Ne,ReactCurrentBatchConfig:Wi,ReactCurrentOwner:Du};function tp(){throw Error("act(...) is not supported in production builds of React.")}U.Children={map:pi,forEach:function(e,t,n){pi(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return pi(e,function(){t++}),t},toArray:function(e){return pi(e,function(t){return t})||[]},only:function(e){if(!Mu(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};U.Component=Fr;U.Fragment=sv;U.Profiler=ov;U.PureComponent=Lu;U.StrictMode=iv;U.Suspense=cv;U.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=yv;U.act=tp;U.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Jf({},e.props),s=e.key,i=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,o=Du.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(l in t)Xf.call(t,l)&&!Zf.hasOwnProperty(l)&&(r[l]=t[l]===void 0&&a!==void 0?a[l]:t[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){a=Array(l);for(var u=0;u<l;u++)a[u]=arguments[u+2];r.children=a}return{$$typeof:ri,type:e.type,key:s,ref:i,props:r,_owner:o}};U.createContext=function(e){return e={$$typeof:lv,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:av,_context:e},e.Consumer=e};U.createElement=ep;U.createFactory=function(e){var t=ep.bind(null,e);return t.type=e,t};U.createRef=function(){return{current:null}};U.forwardRef=function(e){return{$$typeof:uv,render:e}};U.isValidElement=Mu;U.lazy=function(e){return{$$typeof:hv,_payload:{_status:-1,_result:e},_init:gv}};U.memo=function(e,t){return{$$typeof:dv,type:e,compare:t===void 0?null:t}};U.startTransition=function(e){var t=Wi.transition;Wi.transition={};try{e()}finally{Wi.transition=t}};U.unstable_act=tp;U.useCallback=function(e,t){return Ne.current.useCallback(e,t)};U.useContext=function(e){return Ne.current.useContext(e)};U.useDebugValue=function(){};U.useDeferredValue=function(e){return Ne.current.useDeferredValue(e)};U.useEffect=function(e,t){return Ne.current.useEffect(e,t)};U.useId=function(){return Ne.current.useId()};U.useImperativeHandle=function(e,t,n){return Ne.current.useImperativeHandle(e,t,n)};U.useInsertionEffect=function(e,t){return Ne.current.useInsertionEffect(e,t)};U.useLayoutEffect=function(e,t){return Ne.current.useLayoutEffect(e,t)};U.useMemo=function(e,t){return Ne.current.useMemo(e,t)};U.useReducer=function(e,t,n){return Ne.current.useReducer(e,t,n)};U.useRef=function(e){return Ne.current.useRef(e)};U.useState=function(e){return Ne.current.useState(e)};U.useSyncExternalStore=function(e,t,n){return Ne.current.useSyncExternalStore(e,t,n)};U.useTransition=function(){return Ne.current.useTransition()};U.version="18.3.1";Kf.exports=U;var k=Kf.exports;const jr=nv(k);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vv=k,wv=Symbol.for("react.element"),xv=Symbol.for("react.fragment"),bv=Object.prototype.hasOwnProperty,kv=vv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,_v={key:!0,ref:!0,__self:!0,__source:!0};function np(e,t,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)bv.call(t,r)&&!_v.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:wv,type:e,key:i,ref:o,props:s,_owner:kv.current}}Wo.Fragment=xv;Wo.jsx=np;Wo.jsxs=np;qf.exports=Wo;var d=qf.exports,hl={},rp={exports:{}},Ge={},sp={exports:{}},ip={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(P,D){var $=P.length;P.push(D);e:for(;0<$;){var M=$-1>>>1,J=P[M];if(0<s(J,D))P[M]=D,P[$]=J,$=M;else break e}}function n(P){return P.length===0?null:P[0]}function r(P){if(P.length===0)return null;var D=P[0],$=P.pop();if($!==D){P[0]=$;e:for(var M=0,J=P.length,_n=J>>>1;M<_n;){var yt=2*(M+1)-1,Xn=P[yt],Be=yt+1,Sn=P[Be];if(0>s(Xn,$))Be<J&&0>s(Sn,Xn)?(P[M]=Sn,P[Be]=$,M=Be):(P[M]=Xn,P[yt]=$,M=yt);else if(Be<J&&0>s(Sn,$))P[M]=Sn,P[Be]=$,M=Be;else break e}}return D}function s(P,D){var $=P.sortIndex-D.sortIndex;return $!==0?$:P.id-D.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,a=o.now();e.unstable_now=function(){return o.now()-a}}var l=[],u=[],c=1,h=null,f=3,p=!1,y=!1,w=!1,b=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,m=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(P){for(var D=n(u);D!==null;){if(D.callback===null)r(u);else if(D.startTime<=P)r(u),D.sortIndex=D.expirationTime,t(l,D);else break;D=n(u)}}function x(P){if(w=!1,g(P),!y)if(n(l)!==null)y=!0,ie(_);else{var D=n(u);D!==null&&Qe(x,D.startTime-P)}}function _(P,D){y=!1,w&&(w=!1,v(E),E=-1),p=!0;var $=f;try{for(g(D),h=n(l);h!==null&&(!(h.expirationTime>D)||P&&!se());){var M=h.callback;if(typeof M=="function"){h.callback=null,f=h.priorityLevel;var J=M(h.expirationTime<=D);D=e.unstable_now(),typeof J=="function"?h.callback=J:h===n(l)&&r(l),g(D)}else r(l);h=n(l)}if(h!==null)var _n=!0;else{var yt=n(u);yt!==null&&Qe(x,yt.startTime-D),_n=!1}return _n}finally{h=null,f=$,p=!1}}var S=!1,j=null,E=-1,R=5,L=-1;function se(){return!(e.unstable_now()-L<R)}function de(){if(j!==null){var P=e.unstable_now();L=P;var D=!0;try{D=j(!0,P)}finally{D?Ce():(S=!1,j=null)}}else S=!1}var Ce;if(typeof m=="function")Ce=function(){m(de)};else if(typeof MessageChannel<"u"){var pe=new MessageChannel,Wt=pe.port2;pe.port1.onmessage=de,Ce=function(){Wt.postMessage(null)}}else Ce=function(){b(de,0)};function ie(P){j=P,S||(S=!0,Ce())}function Qe(P,D){E=b(function(){P(e.unstable_now())},D)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(P){P.callback=null},e.unstable_continueExecution=function(){y||p||(y=!0,ie(_))},e.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<P?Math.floor(1e3/P):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function(P){switch(f){case 1:case 2:case 3:var D=3;break;default:D=f}var $=f;f=D;try{return P()}finally{f=$}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(P,D){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var $=f;f=P;try{return D()}finally{f=$}},e.unstable_scheduleCallback=function(P,D,$){var M=e.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?M+$:M):$=M,P){case 1:var J=-1;break;case 2:J=250;break;case 5:J=1073741823;break;case 4:J=1e4;break;default:J=5e3}return J=$+J,P={id:c++,callback:D,priorityLevel:P,startTime:$,expirationTime:J,sortIndex:-1},$>M?(P.sortIndex=$,t(u,P),n(l)===null&&P===n(u)&&(w?(v(E),E=-1):w=!0,Qe(x,$-M))):(P.sortIndex=J,t(l,P),y||p||(y=!0,ie(_))),P},e.unstable_shouldYield=se,e.unstable_wrapCallback=function(P){var D=f;return function(){var $=f;f=D;try{return P.apply(this,arguments)}finally{f=$}}}})(ip);sp.exports=ip;var Sv=sp.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ev=k,qe=Sv;function T(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var op=new Set,Cs={};function Gn(e,t){Lr(e,t),Lr(e+"Capture",t)}function Lr(e,t){for(Cs[e]=t,e=0;e<t.length;e++)op.add(t[e])}var $t=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),fl=Object.prototype.hasOwnProperty,jv=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,rd={},sd={};function Tv(e){return fl.call(sd,e)?!0:fl.call(rd,e)?!1:jv.test(e)?sd[e]=!0:(rd[e]=!0,!1)}function Cv(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Pv(e,t,n,r){if(t===null||typeof t>"u"||Cv(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Oe(e,t,n,r,s,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var ke={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ke[e]=new Oe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ke[t]=new Oe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ke[e]=new Oe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ke[e]=new Oe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ke[e]=new Oe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ke[e]=new Oe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ke[e]=new Oe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ke[e]=new Oe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ke[e]=new Oe(e,5,!1,e.toLowerCase(),null,!1,!1)});var $u=/[\-:]([a-z])/g;function Uu(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace($u,Uu);ke[t]=new Oe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace($u,Uu);ke[t]=new Oe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace($u,Uu);ke[t]=new Oe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ke[e]=new Oe(e,1,!1,e.toLowerCase(),null,!1,!1)});ke.xlinkHref=new Oe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ke[e]=new Oe(e,1,!1,e.toLowerCase(),null,!0,!0)});function zu(e,t,n,r){var s=ke.hasOwnProperty(t)?ke[t]:null;(s!==null?s.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Pv(t,n,s,r)&&(n=null),r||s===null?Tv(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,r=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Ft=Ev.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,mi=Symbol.for("react.element"),ur=Symbol.for("react.portal"),cr=Symbol.for("react.fragment"),Bu=Symbol.for("react.strict_mode"),pl=Symbol.for("react.profiler"),ap=Symbol.for("react.provider"),lp=Symbol.for("react.context"),Vu=Symbol.for("react.forward_ref"),ml=Symbol.for("react.suspense"),gl=Symbol.for("react.suspense_list"),Fu=Symbol.for("react.memo"),Gt=Symbol.for("react.lazy"),up=Symbol.for("react.offscreen"),id=Symbol.iterator;function Gr(e){return e===null||typeof e!="object"?null:(e=id&&e[id]||e["@@iterator"],typeof e=="function"?e:null)}var ee=Object.assign,_a;function is(e){if(_a===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);_a=t&&t[1]||""}return`
`+_a+e}var Sa=!1;function Ea(e,t){if(!e||Sa)return"";Sa=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var s=u.stack.split(`
`),i=r.stack.split(`
`),o=s.length-1,a=i.length-1;1<=o&&0<=a&&s[o]!==i[a];)a--;for(;1<=o&&0<=a;o--,a--)if(s[o]!==i[a]){if(o!==1||a!==1)do if(o--,a--,0>a||s[o]!==i[a]){var l=`
`+s[o].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=o&&0<=a);break}}}finally{Sa=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?is(e):""}function Av(e){switch(e.tag){case 5:return is(e.type);case 16:return is("Lazy");case 13:return is("Suspense");case 19:return is("SuspenseList");case 0:case 2:case 15:return e=Ea(e.type,!1),e;case 11:return e=Ea(e.type.render,!1),e;case 1:return e=Ea(e.type,!0),e;default:return""}}function yl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case cr:return"Fragment";case ur:return"Portal";case pl:return"Profiler";case Bu:return"StrictMode";case ml:return"Suspense";case gl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case lp:return(e.displayName||"Context")+".Consumer";case ap:return(e._context.displayName||"Context")+".Provider";case Vu:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Fu:return t=e.displayName||null,t!==null?t:yl(e.type)||"Memo";case Gt:t=e._payload,e=e._init;try{return yl(e(t))}catch{}}return null}function Rv(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return yl(t);case 8:return t===Bu?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function pn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function cp(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Nv(e){var t=cp(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function gi(e){e._valueTracker||(e._valueTracker=Nv(e))}function dp(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=cp(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function io(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function vl(e,t){var n=t.checked;return ee({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function od(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=pn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function hp(e,t){t=t.checked,t!=null&&zu(e,"checked",t,!1)}function wl(e,t){hp(e,t);var n=pn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?xl(e,t.type,n):t.hasOwnProperty("defaultValue")&&xl(e,t.type,pn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ad(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function xl(e,t,n){(t!=="number"||io(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var os=Array.isArray;function Tr(e,t,n,r){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&r&&(e[n].defaultSelected=!0)}else{for(n=""+pn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function bl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(T(91));return ee({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ld(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(T(92));if(os(n)){if(1<n.length)throw Error(T(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:pn(n)}}function fp(e,t){var n=pn(t.value),r=pn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function ud(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function pp(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function kl(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?pp(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var yi,mp=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(yi=yi||document.createElement("div"),yi.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=yi.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Ps(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var hs={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ov=["Webkit","ms","Moz","O"];Object.keys(hs).forEach(function(e){Ov.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),hs[t]=hs[e]})});function gp(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||hs.hasOwnProperty(e)&&hs[e]?(""+t).trim():t+"px"}function yp(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=gp(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,s):e[n]=s}}var Lv=ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function _l(e,t){if(t){if(Lv[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(T(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(T(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(T(61))}if(t.style!=null&&typeof t.style!="object")throw Error(T(62))}}function Sl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var El=null;function Hu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var jl=null,Cr=null,Pr=null;function cd(e){if(e=oi(e)){if(typeof jl!="function")throw Error(T(280));var t=e.stateNode;t&&(t=Yo(t),jl(e.stateNode,e.type,t))}}function vp(e){Cr?Pr?Pr.push(e):Pr=[e]:Cr=e}function wp(){if(Cr){var e=Cr,t=Pr;if(Pr=Cr=null,cd(e),t)for(e=0;e<t.length;e++)cd(t[e])}}function xp(e,t){return e(t)}function bp(){}var ja=!1;function kp(e,t,n){if(ja)return e(t,n);ja=!0;try{return xp(e,t,n)}finally{ja=!1,(Cr!==null||Pr!==null)&&(bp(),wp())}}function As(e,t){var n=e.stateNode;if(n===null)return null;var r=Yo(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(T(231,t,typeof n));return n}var Tl=!1;if($t)try{var Jr={};Object.defineProperty(Jr,"passive",{get:function(){Tl=!0}}),window.addEventListener("test",Jr,Jr),window.removeEventListener("test",Jr,Jr)}catch{Tl=!1}function Iv(e,t,n,r,s,i,o,a,l){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(c){this.onError(c)}}var fs=!1,oo=null,ao=!1,Cl=null,Dv={onError:function(e){fs=!0,oo=e}};function Mv(e,t,n,r,s,i,o,a,l){fs=!1,oo=null,Iv.apply(Dv,arguments)}function $v(e,t,n,r,s,i,o,a,l){if(Mv.apply(this,arguments),fs){if(fs){var u=oo;fs=!1,oo=null}else throw Error(T(198));ao||(ao=!0,Cl=u)}}function Jn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function _p(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function dd(e){if(Jn(e)!==e)throw Error(T(188))}function Uv(e){var t=e.alternate;if(!t){if(t=Jn(e),t===null)throw Error(T(188));return t!==e?null:e}for(var n=e,r=t;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return dd(s),e;if(i===r)return dd(s),t;i=i.sibling}throw Error(T(188))}if(n.return!==r.return)n=s,r=i;else{for(var o=!1,a=s.child;a;){if(a===n){o=!0,n=s,r=i;break}if(a===r){o=!0,r=s,n=i;break}a=a.sibling}if(!o){for(a=i.child;a;){if(a===n){o=!0,n=i,r=s;break}if(a===r){o=!0,r=i,n=s;break}a=a.sibling}if(!o)throw Error(T(189))}}if(n.alternate!==r)throw Error(T(190))}if(n.tag!==3)throw Error(T(188));return n.stateNode.current===n?e:t}function Sp(e){return e=Uv(e),e!==null?Ep(e):null}function Ep(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Ep(e);if(t!==null)return t;e=e.sibling}return null}var jp=qe.unstable_scheduleCallback,hd=qe.unstable_cancelCallback,zv=qe.unstable_shouldYield,Bv=qe.unstable_requestPaint,oe=qe.unstable_now,Vv=qe.unstable_getCurrentPriorityLevel,Wu=qe.unstable_ImmediatePriority,Tp=qe.unstable_UserBlockingPriority,lo=qe.unstable_NormalPriority,Fv=qe.unstable_LowPriority,Cp=qe.unstable_IdlePriority,qo=null,St=null;function Hv(e){if(St&&typeof St.onCommitFiberRoot=="function")try{St.onCommitFiberRoot(qo,e,void 0,(e.current.flags&128)===128)}catch{}}var pt=Math.clz32?Math.clz32:Kv,Wv=Math.log,qv=Math.LN2;function Kv(e){return e>>>=0,e===0?32:31-(Wv(e)/qv|0)|0}var vi=64,wi=4194304;function as(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function uo(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,s=e.suspendedLanes,i=e.pingedLanes,o=n&268435455;if(o!==0){var a=o&~s;a!==0?r=as(a):(i&=o,i!==0&&(r=as(i)))}else o=n&~s,o!==0?r=as(o):i!==0&&(r=as(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&s)&&(s=r&-r,i=t&-t,s>=i||s===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-pt(t),s=1<<n,r|=e[n],t&=~s;return r}function Gv(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Jv(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-pt(i),a=1<<o,l=s[o];l===-1?(!(a&n)||a&r)&&(s[o]=Gv(a,t)):l<=t&&(e.expiredLanes|=a),i&=~a}}function Pl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Pp(){var e=vi;return vi<<=1,!(vi&4194240)&&(vi=64),e}function Ta(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function si(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-pt(t),e[t]=n}function Yv(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-pt(n),i=1<<s;t[s]=0,r[s]=-1,e[s]=-1,n&=~i}}function qu(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-pt(n),s=1<<r;s&t|e[r]&t&&(e[r]|=t),n&=~s}}var V=0;function Ap(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Rp,Ku,Np,Op,Lp,Al=!1,xi=[],rn=null,sn=null,on=null,Rs=new Map,Ns=new Map,Qt=[],Qv="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function fd(e,t){switch(e){case"focusin":case"focusout":rn=null;break;case"dragenter":case"dragleave":sn=null;break;case"mouseover":case"mouseout":on=null;break;case"pointerover":case"pointerout":Rs.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ns.delete(t.pointerId)}}function Yr(e,t,n,r,s,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},t!==null&&(t=oi(t),t!==null&&Ku(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function Xv(e,t,n,r,s){switch(t){case"focusin":return rn=Yr(rn,e,t,n,r,s),!0;case"dragenter":return sn=Yr(sn,e,t,n,r,s),!0;case"mouseover":return on=Yr(on,e,t,n,r,s),!0;case"pointerover":var i=s.pointerId;return Rs.set(i,Yr(Rs.get(i)||null,e,t,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,Ns.set(i,Yr(Ns.get(i)||null,e,t,n,r,s)),!0}return!1}function Ip(e){var t=In(e.target);if(t!==null){var n=Jn(t);if(n!==null){if(t=n.tag,t===13){if(t=_p(n),t!==null){e.blockedOn=t,Lp(e.priority,function(){Np(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function qi(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Rl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);El=r,n.target.dispatchEvent(r),El=null}else return t=oi(n),t!==null&&Ku(t),e.blockedOn=n,!1;t.shift()}return!0}function pd(e,t,n){qi(e)&&n.delete(t)}function Zv(){Al=!1,rn!==null&&qi(rn)&&(rn=null),sn!==null&&qi(sn)&&(sn=null),on!==null&&qi(on)&&(on=null),Rs.forEach(pd),Ns.forEach(pd)}function Qr(e,t){e.blockedOn===t&&(e.blockedOn=null,Al||(Al=!0,qe.unstable_scheduleCallback(qe.unstable_NormalPriority,Zv)))}function Os(e){function t(s){return Qr(s,e)}if(0<xi.length){Qr(xi[0],e);for(var n=1;n<xi.length;n++){var r=xi[n];r.blockedOn===e&&(r.blockedOn=null)}}for(rn!==null&&Qr(rn,e),sn!==null&&Qr(sn,e),on!==null&&Qr(on,e),Rs.forEach(t),Ns.forEach(t),n=0;n<Qt.length;n++)r=Qt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Qt.length&&(n=Qt[0],n.blockedOn===null);)Ip(n),n.blockedOn===null&&Qt.shift()}var Ar=Ft.ReactCurrentBatchConfig,co=!0;function e0(e,t,n,r){var s=V,i=Ar.transition;Ar.transition=null;try{V=1,Gu(e,t,n,r)}finally{V=s,Ar.transition=i}}function t0(e,t,n,r){var s=V,i=Ar.transition;Ar.transition=null;try{V=4,Gu(e,t,n,r)}finally{V=s,Ar.transition=i}}function Gu(e,t,n,r){if(co){var s=Rl(e,t,n,r);if(s===null)Ma(e,t,r,ho,n),fd(e,r);else if(Xv(s,e,t,n,r))r.stopPropagation();else if(fd(e,r),t&4&&-1<Qv.indexOf(e)){for(;s!==null;){var i=oi(s);if(i!==null&&Rp(i),i=Rl(e,t,n,r),i===null&&Ma(e,t,r,ho,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else Ma(e,t,r,null,n)}}var ho=null;function Rl(e,t,n,r){if(ho=null,e=Hu(r),e=In(e),e!==null)if(t=Jn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=_p(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ho=e,null}function Dp(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Vv()){case Wu:return 1;case Tp:return 4;case lo:case Fv:return 16;case Cp:return 536870912;default:return 16}default:return 16}}var tn=null,Ju=null,Ki=null;function Mp(){if(Ki)return Ki;var e,t=Ju,n=t.length,r,s="value"in tn?tn.value:tn.textContent,i=s.length;for(e=0;e<n&&t[e]===s[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===s[i-r];r++);return Ki=s.slice(e,1<r?1-r:void 0)}function Gi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function bi(){return!0}function md(){return!1}function Je(e){function t(n,r,s,i,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(i):i[a]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?bi:md,this.isPropagationStopped=md,this}return ee(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=bi)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=bi)},persist:function(){},isPersistent:bi}),t}var Hr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Yu=Je(Hr),ii=ee({},Hr,{view:0,detail:0}),n0=Je(ii),Ca,Pa,Xr,Ko=ee({},ii,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Qu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Xr&&(Xr&&e.type==="mousemove"?(Ca=e.screenX-Xr.screenX,Pa=e.screenY-Xr.screenY):Pa=Ca=0,Xr=e),Ca)},movementY:function(e){return"movementY"in e?e.movementY:Pa}}),gd=Je(Ko),r0=ee({},Ko,{dataTransfer:0}),s0=Je(r0),i0=ee({},ii,{relatedTarget:0}),Aa=Je(i0),o0=ee({},Hr,{animationName:0,elapsedTime:0,pseudoElement:0}),a0=Je(o0),l0=ee({},Hr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),u0=Je(l0),c0=ee({},Hr,{data:0}),yd=Je(c0),d0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},h0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},f0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function p0(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=f0[e])?!!t[e]:!1}function Qu(){return p0}var m0=ee({},ii,{key:function(e){if(e.key){var t=d0[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Gi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?h0[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Qu,charCode:function(e){return e.type==="keypress"?Gi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Gi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),g0=Je(m0),y0=ee({},Ko,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),vd=Je(y0),v0=ee({},ii,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Qu}),w0=Je(v0),x0=ee({},Hr,{propertyName:0,elapsedTime:0,pseudoElement:0}),b0=Je(x0),k0=ee({},Ko,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),_0=Je(k0),S0=[9,13,27,32],Xu=$t&&"CompositionEvent"in window,ps=null;$t&&"documentMode"in document&&(ps=document.documentMode);var E0=$t&&"TextEvent"in window&&!ps,$p=$t&&(!Xu||ps&&8<ps&&11>=ps),wd=String.fromCharCode(32),xd=!1;function Up(e,t){switch(e){case"keyup":return S0.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function zp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var dr=!1;function j0(e,t){switch(e){case"compositionend":return zp(t);case"keypress":return t.which!==32?null:(xd=!0,wd);case"textInput":return e=t.data,e===wd&&xd?null:e;default:return null}}function T0(e,t){if(dr)return e==="compositionend"||!Xu&&Up(e,t)?(e=Mp(),Ki=Ju=tn=null,dr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return $p&&t.locale!=="ko"?null:t.data;default:return null}}var C0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function bd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!C0[e.type]:t==="textarea"}function Bp(e,t,n,r){vp(r),t=fo(t,"onChange"),0<t.length&&(n=new Yu("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var ms=null,Ls=null;function P0(e){Xp(e,0)}function Go(e){var t=pr(e);if(dp(t))return e}function A0(e,t){if(e==="change")return t}var Vp=!1;if($t){var Ra;if($t){var Na="oninput"in document;if(!Na){var kd=document.createElement("div");kd.setAttribute("oninput","return;"),Na=typeof kd.oninput=="function"}Ra=Na}else Ra=!1;Vp=Ra&&(!document.documentMode||9<document.documentMode)}function _d(){ms&&(ms.detachEvent("onpropertychange",Fp),Ls=ms=null)}function Fp(e){if(e.propertyName==="value"&&Go(Ls)){var t=[];Bp(t,Ls,e,Hu(e)),kp(P0,t)}}function R0(e,t,n){e==="focusin"?(_d(),ms=t,Ls=n,ms.attachEvent("onpropertychange",Fp)):e==="focusout"&&_d()}function N0(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Go(Ls)}function O0(e,t){if(e==="click")return Go(t)}function L0(e,t){if(e==="input"||e==="change")return Go(t)}function I0(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var gt=typeof Object.is=="function"?Object.is:I0;function Is(e,t){if(gt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!fl.call(t,s)||!gt(e[s],t[s]))return!1}return!0}function Sd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ed(e,t){var n=Sd(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Sd(n)}}function Hp(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Hp(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Wp(){for(var e=window,t=io();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=io(e.document)}return t}function Zu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function D0(e){var t=Wp(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Hp(n.ownerDocument.documentElement,n)){if(r!==null&&Zu(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!e.extend&&i>r&&(s=r,r=i,i=s),s=Ed(n,i);var o=Ed(n,r);s&&o&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var M0=$t&&"documentMode"in document&&11>=document.documentMode,hr=null,Nl=null,gs=null,Ol=!1;function jd(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ol||hr==null||hr!==io(r)||(r=hr,"selectionStart"in r&&Zu(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),gs&&Is(gs,r)||(gs=r,r=fo(Nl,"onSelect"),0<r.length&&(t=new Yu("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=hr)))}function ki(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var fr={animationend:ki("Animation","AnimationEnd"),animationiteration:ki("Animation","AnimationIteration"),animationstart:ki("Animation","AnimationStart"),transitionend:ki("Transition","TransitionEnd")},Oa={},qp={};$t&&(qp=document.createElement("div").style,"AnimationEvent"in window||(delete fr.animationend.animation,delete fr.animationiteration.animation,delete fr.animationstart.animation),"TransitionEvent"in window||delete fr.transitionend.transition);function Jo(e){if(Oa[e])return Oa[e];if(!fr[e])return e;var t=fr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in qp)return Oa[e]=t[n];return e}var Kp=Jo("animationend"),Gp=Jo("animationiteration"),Jp=Jo("animationstart"),Yp=Jo("transitionend"),Qp=new Map,Td="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function wn(e,t){Qp.set(e,t),Gn(t,[e])}for(var La=0;La<Td.length;La++){var Ia=Td[La],$0=Ia.toLowerCase(),U0=Ia[0].toUpperCase()+Ia.slice(1);wn($0,"on"+U0)}wn(Kp,"onAnimationEnd");wn(Gp,"onAnimationIteration");wn(Jp,"onAnimationStart");wn("dblclick","onDoubleClick");wn("focusin","onFocus");wn("focusout","onBlur");wn(Yp,"onTransitionEnd");Lr("onMouseEnter",["mouseout","mouseover"]);Lr("onMouseLeave",["mouseout","mouseover"]);Lr("onPointerEnter",["pointerout","pointerover"]);Lr("onPointerLeave",["pointerout","pointerover"]);Gn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Gn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Gn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Gn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Gn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Gn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ls="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),z0=new Set("cancel close invalid load scroll toggle".split(" ").concat(ls));function Cd(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,$v(r,t,void 0,e),e.currentTarget=null}function Xp(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],s=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var o=r.length-1;0<=o;o--){var a=r[o],l=a.instance,u=a.currentTarget;if(a=a.listener,l!==i&&s.isPropagationStopped())break e;Cd(s,a,u),i=l}else for(o=0;o<r.length;o++){if(a=r[o],l=a.instance,u=a.currentTarget,a=a.listener,l!==i&&s.isPropagationStopped())break e;Cd(s,a,u),i=l}}}if(ao)throw e=Cl,ao=!1,Cl=null,e}function K(e,t){var n=t[$l];n===void 0&&(n=t[$l]=new Set);var r=e+"__bubble";n.has(r)||(Zp(t,e,2,!1),n.add(r))}function Da(e,t,n){var r=0;t&&(r|=4),Zp(n,e,r,t)}var _i="_reactListening"+Math.random().toString(36).slice(2);function Ds(e){if(!e[_i]){e[_i]=!0,op.forEach(function(n){n!=="selectionchange"&&(z0.has(n)||Da(n,!1,e),Da(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[_i]||(t[_i]=!0,Da("selectionchange",!1,t))}}function Zp(e,t,n,r){switch(Dp(t)){case 1:var s=e0;break;case 4:s=t0;break;default:s=Gu}n=s.bind(null,t,n,e),s=void 0,!Tl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function Ma(e,t,n,r,s){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===s||a.nodeType===8&&a.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===s||l.nodeType===8&&l.parentNode===s))return;o=o.return}for(;a!==null;){if(o=In(a),o===null)return;if(l=o.tag,l===5||l===6){r=i=o;continue e}a=a.parentNode}}r=r.return}kp(function(){var u=i,c=Hu(n),h=[];e:{var f=Qp.get(e);if(f!==void 0){var p=Yu,y=e;switch(e){case"keypress":if(Gi(n)===0)break e;case"keydown":case"keyup":p=g0;break;case"focusin":y="focus",p=Aa;break;case"focusout":y="blur",p=Aa;break;case"beforeblur":case"afterblur":p=Aa;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=gd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=s0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=w0;break;case Kp:case Gp:case Jp:p=a0;break;case Yp:p=b0;break;case"scroll":p=n0;break;case"wheel":p=_0;break;case"copy":case"cut":case"paste":p=u0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=vd}var w=(t&4)!==0,b=!w&&e==="scroll",v=w?f!==null?f+"Capture":null:f;w=[];for(var m=u,g;m!==null;){g=m;var x=g.stateNode;if(g.tag===5&&x!==null&&(g=x,v!==null&&(x=As(m,v),x!=null&&w.push(Ms(m,x,g)))),b)break;m=m.return}0<w.length&&(f=new p(f,y,null,n,c),h.push({event:f,listeners:w}))}}if(!(t&7)){e:{if(f=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",f&&n!==El&&(y=n.relatedTarget||n.fromElement)&&(In(y)||y[Ut]))break e;if((p||f)&&(f=c.window===c?c:(f=c.ownerDocument)?f.defaultView||f.parentWindow:window,p?(y=n.relatedTarget||n.toElement,p=u,y=y?In(y):null,y!==null&&(b=Jn(y),y!==b||y.tag!==5&&y.tag!==6)&&(y=null)):(p=null,y=u),p!==y)){if(w=gd,x="onMouseLeave",v="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(w=vd,x="onPointerLeave",v="onPointerEnter",m="pointer"),b=p==null?f:pr(p),g=y==null?f:pr(y),f=new w(x,m+"leave",p,n,c),f.target=b,f.relatedTarget=g,x=null,In(c)===u&&(w=new w(v,m+"enter",y,n,c),w.target=g,w.relatedTarget=b,x=w),b=x,p&&y)t:{for(w=p,v=y,m=0,g=w;g;g=Zn(g))m++;for(g=0,x=v;x;x=Zn(x))g++;for(;0<m-g;)w=Zn(w),m--;for(;0<g-m;)v=Zn(v),g--;for(;m--;){if(w===v||v!==null&&w===v.alternate)break t;w=Zn(w),v=Zn(v)}w=null}else w=null;p!==null&&Pd(h,f,p,w,!1),y!==null&&b!==null&&Pd(h,b,y,w,!0)}}e:{if(f=u?pr(u):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var _=A0;else if(bd(f))if(Vp)_=L0;else{_=N0;var S=R0}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(_=O0);if(_&&(_=_(e,u))){Bp(h,_,n,c);break e}S&&S(e,f,u),e==="focusout"&&(S=f._wrapperState)&&S.controlled&&f.type==="number"&&xl(f,"number",f.value)}switch(S=u?pr(u):window,e){case"focusin":(bd(S)||S.contentEditable==="true")&&(hr=S,Nl=u,gs=null);break;case"focusout":gs=Nl=hr=null;break;case"mousedown":Ol=!0;break;case"contextmenu":case"mouseup":case"dragend":Ol=!1,jd(h,n,c);break;case"selectionchange":if(M0)break;case"keydown":case"keyup":jd(h,n,c)}var j;if(Xu)e:{switch(e){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else dr?Up(e,n)&&(E="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(E="onCompositionStart");E&&($p&&n.locale!=="ko"&&(dr||E!=="onCompositionStart"?E==="onCompositionEnd"&&dr&&(j=Mp()):(tn=c,Ju="value"in tn?tn.value:tn.textContent,dr=!0)),S=fo(u,E),0<S.length&&(E=new yd(E,e,null,n,c),h.push({event:E,listeners:S}),j?E.data=j:(j=zp(n),j!==null&&(E.data=j)))),(j=E0?j0(e,n):T0(e,n))&&(u=fo(u,"onBeforeInput"),0<u.length&&(c=new yd("onBeforeInput","beforeinput",null,n,c),h.push({event:c,listeners:u}),c.data=j))}Xp(h,t)})}function Ms(e,t,n){return{instance:e,listener:t,currentTarget:n}}function fo(e,t){for(var n=t+"Capture",r=[];e!==null;){var s=e,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=As(e,n),i!=null&&r.unshift(Ms(e,i,s)),i=As(e,t),i!=null&&r.push(Ms(e,i,s))),e=e.return}return r}function Zn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Pd(e,t,n,r,s){for(var i=t._reactName,o=[];n!==null&&n!==r;){var a=n,l=a.alternate,u=a.stateNode;if(l!==null&&l===r)break;a.tag===5&&u!==null&&(a=u,s?(l=As(n,i),l!=null&&o.unshift(Ms(n,l,a))):s||(l=As(n,i),l!=null&&o.push(Ms(n,l,a)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var B0=/\r\n?/g,V0=/\u0000|\uFFFD/g;function Ad(e){return(typeof e=="string"?e:""+e).replace(B0,`
`).replace(V0,"")}function Si(e,t,n){if(t=Ad(t),Ad(e)!==t&&n)throw Error(T(425))}function po(){}var Ll=null,Il=null;function Dl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ml=typeof setTimeout=="function"?setTimeout:void 0,F0=typeof clearTimeout=="function"?clearTimeout:void 0,Rd=typeof Promise=="function"?Promise:void 0,H0=typeof queueMicrotask=="function"?queueMicrotask:typeof Rd<"u"?function(e){return Rd.resolve(null).then(e).catch(W0)}:Ml;function W0(e){setTimeout(function(){throw e})}function $a(e,t){var n=t,r=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){e.removeChild(s),Os(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);Os(t)}function an(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Nd(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Wr=Math.random().toString(36).slice(2),_t="__reactFiber$"+Wr,$s="__reactProps$"+Wr,Ut="__reactContainer$"+Wr,$l="__reactEvents$"+Wr,q0="__reactListeners$"+Wr,K0="__reactHandles$"+Wr;function In(e){var t=e[_t];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ut]||n[_t]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Nd(e);e!==null;){if(n=e[_t])return n;e=Nd(e)}return t}e=n,n=e.parentNode}return null}function oi(e){return e=e[_t]||e[Ut],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function pr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(T(33))}function Yo(e){return e[$s]||null}var Ul=[],mr=-1;function xn(e){return{current:e}}function G(e){0>mr||(e.current=Ul[mr],Ul[mr]=null,mr--)}function W(e,t){mr++,Ul[mr]=e.current,e.current=t}var mn={},Te=xn(mn),Me=xn(!1),Vn=mn;function Ir(e,t){var n=e.type.contextTypes;if(!n)return mn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function $e(e){return e=e.childContextTypes,e!=null}function mo(){G(Me),G(Te)}function Od(e,t,n){if(Te.current!==mn)throw Error(T(168));W(Te,t),W(Me,n)}function em(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in t))throw Error(T(108,Rv(e)||"Unknown",s));return ee({},n,r)}function go(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||mn,Vn=Te.current,W(Te,e),W(Me,Me.current),!0}function Ld(e,t,n){var r=e.stateNode;if(!r)throw Error(T(169));n?(e=em(e,t,Vn),r.__reactInternalMemoizedMergedChildContext=e,G(Me),G(Te),W(Te,e)):G(Me),W(Me,n)}var Rt=null,Qo=!1,Ua=!1;function tm(e){Rt===null?Rt=[e]:Rt.push(e)}function G0(e){Qo=!0,tm(e)}function bn(){if(!Ua&&Rt!==null){Ua=!0;var e=0,t=V;try{var n=Rt;for(V=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Rt=null,Qo=!1}catch(s){throw Rt!==null&&(Rt=Rt.slice(e+1)),jp(Wu,bn),s}finally{V=t,Ua=!1}}return null}var gr=[],yr=0,yo=null,vo=0,tt=[],nt=0,Fn=null,Nt=1,Ot="";function Pn(e,t){gr[yr++]=vo,gr[yr++]=yo,yo=e,vo=t}function nm(e,t,n){tt[nt++]=Nt,tt[nt++]=Ot,tt[nt++]=Fn,Fn=e;var r=Nt;e=Ot;var s=32-pt(r)-1;r&=~(1<<s),n+=1;var i=32-pt(t)+s;if(30<i){var o=s-s%5;i=(r&(1<<o)-1).toString(32),r>>=o,s-=o,Nt=1<<32-pt(t)+s|n<<s|r,Ot=i+e}else Nt=1<<i|n<<s|r,Ot=e}function ec(e){e.return!==null&&(Pn(e,1),nm(e,1,0))}function tc(e){for(;e===yo;)yo=gr[--yr],gr[yr]=null,vo=gr[--yr],gr[yr]=null;for(;e===Fn;)Fn=tt[--nt],tt[nt]=null,Ot=tt[--nt],tt[nt]=null,Nt=tt[--nt],tt[nt]=null}var We=null,He=null,Y=!1,ht=null;function rm(e,t){var n=rt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Id(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,We=e,He=an(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,We=e,He=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Fn!==null?{id:Nt,overflow:Ot}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=rt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,We=e,He=null,!0):!1;default:return!1}}function zl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Bl(e){if(Y){var t=He;if(t){var n=t;if(!Id(e,t)){if(zl(e))throw Error(T(418));t=an(n.nextSibling);var r=We;t&&Id(e,t)?rm(r,n):(e.flags=e.flags&-4097|2,Y=!1,We=e)}}else{if(zl(e))throw Error(T(418));e.flags=e.flags&-4097|2,Y=!1,We=e}}}function Dd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;We=e}function Ei(e){if(e!==We)return!1;if(!Y)return Dd(e),Y=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Dl(e.type,e.memoizedProps)),t&&(t=He)){if(zl(e))throw sm(),Error(T(418));for(;t;)rm(e,t),t=an(t.nextSibling)}if(Dd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(T(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){He=an(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}He=null}}else He=We?an(e.stateNode.nextSibling):null;return!0}function sm(){for(var e=He;e;)e=an(e.nextSibling)}function Dr(){He=We=null,Y=!1}function nc(e){ht===null?ht=[e]:ht.push(e)}var J0=Ft.ReactCurrentBatchConfig;function Zr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(T(309));var r=n.stateNode}if(!r)throw Error(T(147,e));var s=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var a=s.refs;o===null?delete a[i]:a[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(T(284));if(!n._owner)throw Error(T(290,e))}return e}function ji(e,t){throw e=Object.prototype.toString.call(t),Error(T(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Md(e){var t=e._init;return t(e._payload)}function im(e){function t(v,m){if(e){var g=v.deletions;g===null?(v.deletions=[m],v.flags|=16):g.push(m)}}function n(v,m){if(!e)return null;for(;m!==null;)t(v,m),m=m.sibling;return null}function r(v,m){for(v=new Map;m!==null;)m.key!==null?v.set(m.key,m):v.set(m.index,m),m=m.sibling;return v}function s(v,m){return v=dn(v,m),v.index=0,v.sibling=null,v}function i(v,m,g){return v.index=g,e?(g=v.alternate,g!==null?(g=g.index,g<m?(v.flags|=2,m):g):(v.flags|=2,m)):(v.flags|=1048576,m)}function o(v){return e&&v.alternate===null&&(v.flags|=2),v}function a(v,m,g,x){return m===null||m.tag!==6?(m=qa(g,v.mode,x),m.return=v,m):(m=s(m,g),m.return=v,m)}function l(v,m,g,x){var _=g.type;return _===cr?c(v,m,g.props.children,x,g.key):m!==null&&(m.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===Gt&&Md(_)===m.type)?(x=s(m,g.props),x.ref=Zr(v,m,g),x.return=v,x):(x=to(g.type,g.key,g.props,null,v.mode,x),x.ref=Zr(v,m,g),x.return=v,x)}function u(v,m,g,x){return m===null||m.tag!==4||m.stateNode.containerInfo!==g.containerInfo||m.stateNode.implementation!==g.implementation?(m=Ka(g,v.mode,x),m.return=v,m):(m=s(m,g.children||[]),m.return=v,m)}function c(v,m,g,x,_){return m===null||m.tag!==7?(m=Bn(g,v.mode,x,_),m.return=v,m):(m=s(m,g),m.return=v,m)}function h(v,m,g){if(typeof m=="string"&&m!==""||typeof m=="number")return m=qa(""+m,v.mode,g),m.return=v,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case mi:return g=to(m.type,m.key,m.props,null,v.mode,g),g.ref=Zr(v,null,m),g.return=v,g;case ur:return m=Ka(m,v.mode,g),m.return=v,m;case Gt:var x=m._init;return h(v,x(m._payload),g)}if(os(m)||Gr(m))return m=Bn(m,v.mode,g,null),m.return=v,m;ji(v,m)}return null}function f(v,m,g,x){var _=m!==null?m.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return _!==null?null:a(v,m,""+g,x);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case mi:return g.key===_?l(v,m,g,x):null;case ur:return g.key===_?u(v,m,g,x):null;case Gt:return _=g._init,f(v,m,_(g._payload),x)}if(os(g)||Gr(g))return _!==null?null:c(v,m,g,x,null);ji(v,g)}return null}function p(v,m,g,x,_){if(typeof x=="string"&&x!==""||typeof x=="number")return v=v.get(g)||null,a(m,v,""+x,_);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case mi:return v=v.get(x.key===null?g:x.key)||null,l(m,v,x,_);case ur:return v=v.get(x.key===null?g:x.key)||null,u(m,v,x,_);case Gt:var S=x._init;return p(v,m,g,S(x._payload),_)}if(os(x)||Gr(x))return v=v.get(g)||null,c(m,v,x,_,null);ji(m,x)}return null}function y(v,m,g,x){for(var _=null,S=null,j=m,E=m=0,R=null;j!==null&&E<g.length;E++){j.index>E?(R=j,j=null):R=j.sibling;var L=f(v,j,g[E],x);if(L===null){j===null&&(j=R);break}e&&j&&L.alternate===null&&t(v,j),m=i(L,m,E),S===null?_=L:S.sibling=L,S=L,j=R}if(E===g.length)return n(v,j),Y&&Pn(v,E),_;if(j===null){for(;E<g.length;E++)j=h(v,g[E],x),j!==null&&(m=i(j,m,E),S===null?_=j:S.sibling=j,S=j);return Y&&Pn(v,E),_}for(j=r(v,j);E<g.length;E++)R=p(j,v,E,g[E],x),R!==null&&(e&&R.alternate!==null&&j.delete(R.key===null?E:R.key),m=i(R,m,E),S===null?_=R:S.sibling=R,S=R);return e&&j.forEach(function(se){return t(v,se)}),Y&&Pn(v,E),_}function w(v,m,g,x){var _=Gr(g);if(typeof _!="function")throw Error(T(150));if(g=_.call(g),g==null)throw Error(T(151));for(var S=_=null,j=m,E=m=0,R=null,L=g.next();j!==null&&!L.done;E++,L=g.next()){j.index>E?(R=j,j=null):R=j.sibling;var se=f(v,j,L.value,x);if(se===null){j===null&&(j=R);break}e&&j&&se.alternate===null&&t(v,j),m=i(se,m,E),S===null?_=se:S.sibling=se,S=se,j=R}if(L.done)return n(v,j),Y&&Pn(v,E),_;if(j===null){for(;!L.done;E++,L=g.next())L=h(v,L.value,x),L!==null&&(m=i(L,m,E),S===null?_=L:S.sibling=L,S=L);return Y&&Pn(v,E),_}for(j=r(v,j);!L.done;E++,L=g.next())L=p(j,v,E,L.value,x),L!==null&&(e&&L.alternate!==null&&j.delete(L.key===null?E:L.key),m=i(L,m,E),S===null?_=L:S.sibling=L,S=L);return e&&j.forEach(function(de){return t(v,de)}),Y&&Pn(v,E),_}function b(v,m,g,x){if(typeof g=="object"&&g!==null&&g.type===cr&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case mi:e:{for(var _=g.key,S=m;S!==null;){if(S.key===_){if(_=g.type,_===cr){if(S.tag===7){n(v,S.sibling),m=s(S,g.props.children),m.return=v,v=m;break e}}else if(S.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===Gt&&Md(_)===S.type){n(v,S.sibling),m=s(S,g.props),m.ref=Zr(v,S,g),m.return=v,v=m;break e}n(v,S);break}else t(v,S);S=S.sibling}g.type===cr?(m=Bn(g.props.children,v.mode,x,g.key),m.return=v,v=m):(x=to(g.type,g.key,g.props,null,v.mode,x),x.ref=Zr(v,m,g),x.return=v,v=x)}return o(v);case ur:e:{for(S=g.key;m!==null;){if(m.key===S)if(m.tag===4&&m.stateNode.containerInfo===g.containerInfo&&m.stateNode.implementation===g.implementation){n(v,m.sibling),m=s(m,g.children||[]),m.return=v,v=m;break e}else{n(v,m);break}else t(v,m);m=m.sibling}m=Ka(g,v.mode,x),m.return=v,v=m}return o(v);case Gt:return S=g._init,b(v,m,S(g._payload),x)}if(os(g))return y(v,m,g,x);if(Gr(g))return w(v,m,g,x);ji(v,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,m!==null&&m.tag===6?(n(v,m.sibling),m=s(m,g),m.return=v,v=m):(n(v,m),m=qa(g,v.mode,x),m.return=v,v=m),o(v)):n(v,m)}return b}var Mr=im(!0),om=im(!1),wo=xn(null),xo=null,vr=null,rc=null;function sc(){rc=vr=xo=null}function ic(e){var t=wo.current;G(wo),e._currentValue=t}function Vl(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Rr(e,t){xo=e,rc=vr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(De=!0),e.firstContext=null)}function it(e){var t=e._currentValue;if(rc!==e)if(e={context:e,memoizedValue:t,next:null},vr===null){if(xo===null)throw Error(T(308));vr=e,xo.dependencies={lanes:0,firstContext:e}}else vr=vr.next=e;return t}var Dn=null;function oc(e){Dn===null?Dn=[e]:Dn.push(e)}function am(e,t,n,r){var s=t.interleaved;return s===null?(n.next=n,oc(t)):(n.next=s.next,s.next=n),t.interleaved=n,zt(e,r)}function zt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Jt=!1;function ac(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function lm(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function It(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function ln(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,z&2){var s=r.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),r.pending=t,zt(e,n)}return s=r.interleaved,s===null?(t.next=t,oc(r)):(t.next=s.next,s.next=t),r.interleaved=t,zt(e,n)}function Ji(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,qu(e,n)}}function $d(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?s=i=t:i=i.next=t}else s=i=t;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function bo(e,t,n,r){var s=e.updateQueue;Jt=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,a=s.shared.pending;if(a!==null){s.shared.pending=null;var l=a,u=l.next;l.next=null,o===null?i=u:o.next=u,o=l;var c=e.alternate;c!==null&&(c=c.updateQueue,a=c.lastBaseUpdate,a!==o&&(a===null?c.firstBaseUpdate=u:a.next=u,c.lastBaseUpdate=l))}if(i!==null){var h=s.baseState;o=0,c=u=l=null,a=i;do{var f=a.lane,p=a.eventTime;if((r&f)===f){c!==null&&(c=c.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var y=e,w=a;switch(f=t,p=n,w.tag){case 1:if(y=w.payload,typeof y=="function"){h=y.call(p,h,f);break e}h=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=w.payload,f=typeof y=="function"?y.call(p,h,f):y,f==null)break e;h=ee({},h,f);break e;case 2:Jt=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,f=s.effects,f===null?s.effects=[a]:f.push(a))}else p={eventTime:p,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},c===null?(u=c=p,l=h):c=c.next=p,o|=f;if(a=a.next,a===null){if(a=s.shared.pending,a===null)break;f=a,a=f.next,f.next=null,s.lastBaseUpdate=f,s.shared.pending=null}}while(1);if(c===null&&(l=h),s.baseState=l,s.firstBaseUpdate=u,s.lastBaseUpdate=c,t=s.shared.interleaved,t!==null){s=t;do o|=s.lane,s=s.next;while(s!==t)}else i===null&&(s.shared.lanes=0);Wn|=o,e.lanes=o,e.memoizedState=h}}function Ud(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(T(191,s));s.call(r)}}}var ai={},Et=xn(ai),Us=xn(ai),zs=xn(ai);function Mn(e){if(e===ai)throw Error(T(174));return e}function lc(e,t){switch(W(zs,t),W(Us,e),W(Et,ai),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:kl(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=kl(t,e)}G(Et),W(Et,t)}function $r(){G(Et),G(Us),G(zs)}function um(e){Mn(zs.current);var t=Mn(Et.current),n=kl(t,e.type);t!==n&&(W(Us,e),W(Et,n))}function uc(e){Us.current===e&&(G(Et),G(Us))}var Q=xn(0);function ko(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var za=[];function cc(){for(var e=0;e<za.length;e++)za[e]._workInProgressVersionPrimary=null;za.length=0}var Yi=Ft.ReactCurrentDispatcher,Ba=Ft.ReactCurrentBatchConfig,Hn=0,Z=null,he=null,ge=null,_o=!1,ys=!1,Bs=0,Y0=0;function _e(){throw Error(T(321))}function dc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!gt(e[n],t[n]))return!1;return!0}function hc(e,t,n,r,s,i){if(Hn=i,Z=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Yi.current=e===null||e.memoizedState===null?ew:tw,e=n(r,s),ys){i=0;do{if(ys=!1,Bs=0,25<=i)throw Error(T(301));i+=1,ge=he=null,t.updateQueue=null,Yi.current=nw,e=n(r,s)}while(ys)}if(Yi.current=So,t=he!==null&&he.next!==null,Hn=0,ge=he=Z=null,_o=!1,t)throw Error(T(300));return e}function fc(){var e=Bs!==0;return Bs=0,e}function xt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ge===null?Z.memoizedState=ge=e:ge=ge.next=e,ge}function ot(){if(he===null){var e=Z.alternate;e=e!==null?e.memoizedState:null}else e=he.next;var t=ge===null?Z.memoizedState:ge.next;if(t!==null)ge=t,he=e;else{if(e===null)throw Error(T(310));he=e,e={memoizedState:he.memoizedState,baseState:he.baseState,baseQueue:he.baseQueue,queue:he.queue,next:null},ge===null?Z.memoizedState=ge=e:ge=ge.next=e}return ge}function Vs(e,t){return typeof t=="function"?t(e):t}function Va(e){var t=ot(),n=t.queue;if(n===null)throw Error(T(311));n.lastRenderedReducer=e;var r=he,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var a=o=null,l=null,u=i;do{var c=u.lane;if((Hn&c)===c)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var h={lane:c,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(a=l=h,o=r):l=l.next=h,Z.lanes|=c,Wn|=c}u=u.next}while(u!==null&&u!==i);l===null?o=r:l.next=a,gt(r,t.memoizedState)||(De=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=l,n.lastRenderedState=r}if(e=n.interleaved,e!==null){s=e;do i=s.lane,Z.lanes|=i,Wn|=i,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Fa(e){var t=ot(),n=t.queue;if(n===null)throw Error(T(311));n.lastRenderedReducer=e;var r=n.dispatch,s=n.pending,i=t.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do i=e(i,o.action),o=o.next;while(o!==s);gt(i,t.memoizedState)||(De=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function cm(){}function dm(e,t){var n=Z,r=ot(),s=t(),i=!gt(r.memoizedState,s);if(i&&(r.memoizedState=s,De=!0),r=r.queue,pc(pm.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||ge!==null&&ge.memoizedState.tag&1){if(n.flags|=2048,Fs(9,fm.bind(null,n,r,s,t),void 0,null),ye===null)throw Error(T(349));Hn&30||hm(n,t,s)}return s}function hm(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Z.updateQueue,t===null?(t={lastEffect:null,stores:null},Z.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function fm(e,t,n,r){t.value=n,t.getSnapshot=r,mm(t)&&gm(e)}function pm(e,t,n){return n(function(){mm(t)&&gm(e)})}function mm(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!gt(e,n)}catch{return!0}}function gm(e){var t=zt(e,1);t!==null&&mt(t,e,1,-1)}function zd(e){var t=xt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Vs,lastRenderedState:e},t.queue=e,e=e.dispatch=Z0.bind(null,Z,e),[t.memoizedState,e]}function Fs(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Z.updateQueue,t===null?(t={lastEffect:null,stores:null},Z.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function ym(){return ot().memoizedState}function Qi(e,t,n,r){var s=xt();Z.flags|=e,s.memoizedState=Fs(1|t,n,void 0,r===void 0?null:r)}function Xo(e,t,n,r){var s=ot();r=r===void 0?null:r;var i=void 0;if(he!==null){var o=he.memoizedState;if(i=o.destroy,r!==null&&dc(r,o.deps)){s.memoizedState=Fs(t,n,i,r);return}}Z.flags|=e,s.memoizedState=Fs(1|t,n,i,r)}function Bd(e,t){return Qi(8390656,8,e,t)}function pc(e,t){return Xo(2048,8,e,t)}function vm(e,t){return Xo(4,2,e,t)}function wm(e,t){return Xo(4,4,e,t)}function xm(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function bm(e,t,n){return n=n!=null?n.concat([e]):null,Xo(4,4,xm.bind(null,t,e),n)}function mc(){}function km(e,t){var n=ot();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&dc(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function _m(e,t){var n=ot();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&dc(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Sm(e,t,n){return Hn&21?(gt(n,t)||(n=Pp(),Z.lanes|=n,Wn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,De=!0),e.memoizedState=n)}function Q0(e,t){var n=V;V=n!==0&&4>n?n:4,e(!0);var r=Ba.transition;Ba.transition={};try{e(!1),t()}finally{V=n,Ba.transition=r}}function Em(){return ot().memoizedState}function X0(e,t,n){var r=cn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},jm(e))Tm(t,n);else if(n=am(e,t,n,r),n!==null){var s=Re();mt(n,e,r,s),Cm(n,t,r)}}function Z0(e,t,n){var r=cn(e),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(jm(e))Tm(t,s);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,a=i(o,n);if(s.hasEagerState=!0,s.eagerState=a,gt(a,o)){var l=t.interleaved;l===null?(s.next=s,oc(t)):(s.next=l.next,l.next=s),t.interleaved=s;return}}catch{}finally{}n=am(e,t,s,r),n!==null&&(s=Re(),mt(n,e,r,s),Cm(n,t,r))}}function jm(e){var t=e.alternate;return e===Z||t!==null&&t===Z}function Tm(e,t){ys=_o=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Cm(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,qu(e,n)}}var So={readContext:it,useCallback:_e,useContext:_e,useEffect:_e,useImperativeHandle:_e,useInsertionEffect:_e,useLayoutEffect:_e,useMemo:_e,useReducer:_e,useRef:_e,useState:_e,useDebugValue:_e,useDeferredValue:_e,useTransition:_e,useMutableSource:_e,useSyncExternalStore:_e,useId:_e,unstable_isNewReconciler:!1},ew={readContext:it,useCallback:function(e,t){return xt().memoizedState=[e,t===void 0?null:t],e},useContext:it,useEffect:Bd,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Qi(4194308,4,xm.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Qi(4194308,4,e,t)},useInsertionEffect:function(e,t){return Qi(4,2,e,t)},useMemo:function(e,t){var n=xt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=xt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=X0.bind(null,Z,e),[r.memoizedState,e]},useRef:function(e){var t=xt();return e={current:e},t.memoizedState=e},useState:zd,useDebugValue:mc,useDeferredValue:function(e){return xt().memoizedState=e},useTransition:function(){var e=zd(!1),t=e[0];return e=Q0.bind(null,e[1]),xt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Z,s=xt();if(Y){if(n===void 0)throw Error(T(407));n=n()}else{if(n=t(),ye===null)throw Error(T(349));Hn&30||hm(r,t,n)}s.memoizedState=n;var i={value:n,getSnapshot:t};return s.queue=i,Bd(pm.bind(null,r,i,e),[e]),r.flags|=2048,Fs(9,fm.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=xt(),t=ye.identifierPrefix;if(Y){var n=Ot,r=Nt;n=(r&~(1<<32-pt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Bs++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Y0++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},tw={readContext:it,useCallback:km,useContext:it,useEffect:pc,useImperativeHandle:bm,useInsertionEffect:vm,useLayoutEffect:wm,useMemo:_m,useReducer:Va,useRef:ym,useState:function(){return Va(Vs)},useDebugValue:mc,useDeferredValue:function(e){var t=ot();return Sm(t,he.memoizedState,e)},useTransition:function(){var e=Va(Vs)[0],t=ot().memoizedState;return[e,t]},useMutableSource:cm,useSyncExternalStore:dm,useId:Em,unstable_isNewReconciler:!1},nw={readContext:it,useCallback:km,useContext:it,useEffect:pc,useImperativeHandle:bm,useInsertionEffect:vm,useLayoutEffect:wm,useMemo:_m,useReducer:Fa,useRef:ym,useState:function(){return Fa(Vs)},useDebugValue:mc,useDeferredValue:function(e){var t=ot();return he===null?t.memoizedState=e:Sm(t,he.memoizedState,e)},useTransition:function(){var e=Fa(Vs)[0],t=ot().memoizedState;return[e,t]},useMutableSource:cm,useSyncExternalStore:dm,useId:Em,unstable_isNewReconciler:!1};function ut(e,t){if(e&&e.defaultProps){t=ee({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Fl(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:ee({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Zo={isMounted:function(e){return(e=e._reactInternals)?Jn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Re(),s=cn(e),i=It(r,s);i.payload=t,n!=null&&(i.callback=n),t=ln(e,i,s),t!==null&&(mt(t,e,s,r),Ji(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Re(),s=cn(e),i=It(r,s);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=ln(e,i,s),t!==null&&(mt(t,e,s,r),Ji(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Re(),r=cn(e),s=It(n,r);s.tag=2,t!=null&&(s.callback=t),t=ln(e,s,r),t!==null&&(mt(t,e,r,n),Ji(t,e,r))}};function Vd(e,t,n,r,s,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,o):t.prototype&&t.prototype.isPureReactComponent?!Is(n,r)||!Is(s,i):!0}function Pm(e,t,n){var r=!1,s=mn,i=t.contextType;return typeof i=="object"&&i!==null?i=it(i):(s=$e(t)?Vn:Te.current,r=t.contextTypes,i=(r=r!=null)?Ir(e,s):mn),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Zo,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=i),t}function Fd(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Zo.enqueueReplaceState(t,t.state,null)}function Hl(e,t,n,r){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},ac(e);var i=t.contextType;typeof i=="object"&&i!==null?s.context=it(i):(i=$e(t)?Vn:Te.current,s.context=Ir(e,i)),s.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Fl(e,t,i,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&Zo.enqueueReplaceState(s,s.state,null),bo(e,n,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function Ur(e,t){try{var n="",r=t;do n+=Av(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:s,digest:null}}function Ha(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Wl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var rw=typeof WeakMap=="function"?WeakMap:Map;function Am(e,t,n){n=It(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){jo||(jo=!0,tu=r),Wl(e,t)},n}function Rm(e,t,n){n=It(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=t.value;n.payload=function(){return r(s)},n.callback=function(){Wl(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Wl(e,t),typeof r!="function"&&(un===null?un=new Set([this]):un.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Hd(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new rw;var s=new Set;r.set(t,s)}else s=r.get(t),s===void 0&&(s=new Set,r.set(t,s));s.has(n)||(s.add(n),e=yw.bind(null,e,t,n),t.then(e,e))}function Wd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function qd(e,t,n,r,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=It(-1,1),t.tag=2,ln(n,t,1))),n.lanes|=1),e)}var sw=Ft.ReactCurrentOwner,De=!1;function Ae(e,t,n,r){t.child=e===null?om(t,null,n,r):Mr(t,e.child,n,r)}function Kd(e,t,n,r,s){n=n.render;var i=t.ref;return Rr(t,s),r=hc(e,t,n,r,i,s),n=fc(),e!==null&&!De?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Bt(e,t,s)):(Y&&n&&ec(t),t.flags|=1,Ae(e,t,r,s),t.child)}function Gd(e,t,n,r,s){if(e===null){var i=n.type;return typeof i=="function"&&!_c(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Nm(e,t,i,r,s)):(e=to(n.type,null,r,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&s)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:Is,n(o,r)&&e.ref===t.ref)return Bt(e,t,s)}return t.flags|=1,e=dn(i,r),e.ref=t.ref,e.return=t,t.child=e}function Nm(e,t,n,r,s){if(e!==null){var i=e.memoizedProps;if(Is(i,r)&&e.ref===t.ref)if(De=!1,t.pendingProps=r=i,(e.lanes&s)!==0)e.flags&131072&&(De=!0);else return t.lanes=e.lanes,Bt(e,t,s)}return ql(e,t,n,r,s)}function Om(e,t,n){var r=t.pendingProps,s=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},W(xr,Ve),Ve|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,W(xr,Ve),Ve|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,W(xr,Ve),Ve|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,W(xr,Ve),Ve|=r;return Ae(e,t,s,n),t.child}function Lm(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ql(e,t,n,r,s){var i=$e(n)?Vn:Te.current;return i=Ir(t,i),Rr(t,s),n=hc(e,t,n,r,i,s),r=fc(),e!==null&&!De?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Bt(e,t,s)):(Y&&r&&ec(t),t.flags|=1,Ae(e,t,n,s),t.child)}function Jd(e,t,n,r,s){if($e(n)){var i=!0;go(t)}else i=!1;if(Rr(t,s),t.stateNode===null)Xi(e,t),Pm(t,n,r),Hl(t,n,r,s),r=!0;else if(e===null){var o=t.stateNode,a=t.memoizedProps;o.props=a;var l=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=it(u):(u=$e(n)?Vn:Te.current,u=Ir(t,u));var c=n.getDerivedStateFromProps,h=typeof c=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||l!==u)&&Fd(t,o,r,u),Jt=!1;var f=t.memoizedState;o.state=f,bo(t,r,o,s),l=t.memoizedState,a!==r||f!==l||Me.current||Jt?(typeof c=="function"&&(Fl(t,n,c,r),l=t.memoizedState),(a=Jt||Vd(t,n,a,r,f,l,u))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),o.props=r,o.state=l,o.context=u,r=a):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,lm(e,t),a=t.memoizedProps,u=t.type===t.elementType?a:ut(t.type,a),o.props=u,h=t.pendingProps,f=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=it(l):(l=$e(n)?Vn:Te.current,l=Ir(t,l));var p=n.getDerivedStateFromProps;(c=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==h||f!==l)&&Fd(t,o,r,l),Jt=!1,f=t.memoizedState,o.state=f,bo(t,r,o,s);var y=t.memoizedState;a!==h||f!==y||Me.current||Jt?(typeof p=="function"&&(Fl(t,n,p,r),y=t.memoizedState),(u=Jt||Vd(t,n,u,r,f,y,l)||!1)?(c||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,y,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,y,l)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=y),o.props=r,o.state=y,o.context=l,r=u):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return Kl(e,t,n,r,i,s)}function Kl(e,t,n,r,s,i){Lm(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return s&&Ld(t,n,!1),Bt(e,t,i);r=t.stateNode,sw.current=t;var a=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=Mr(t,e.child,null,i),t.child=Mr(t,null,a,i)):Ae(e,t,a,i),t.memoizedState=r.state,s&&Ld(t,n,!0),t.child}function Im(e){var t=e.stateNode;t.pendingContext?Od(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Od(e,t.context,!1),lc(e,t.containerInfo)}function Yd(e,t,n,r,s){return Dr(),nc(s),t.flags|=256,Ae(e,t,n,r),t.child}var Gl={dehydrated:null,treeContext:null,retryLane:0};function Jl(e){return{baseLanes:e,cachePool:null,transitions:null}}function Dm(e,t,n){var r=t.pendingProps,s=Q.current,i=!1,o=(t.flags&128)!==0,a;if((a=o)||(a=e!==null&&e.memoizedState===null?!1:(s&2)!==0),a?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),W(Q,s&1),e===null)return Bl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,i?(r=t.mode,i=t.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=na(o,r,0,null),e=Bn(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Jl(n),t.memoizedState=Gl,e):gc(t,o));if(s=e.memoizedState,s!==null&&(a=s.dehydrated,a!==null))return iw(e,t,o,r,a,s,n);if(i){i=r.fallback,o=t.mode,s=e.child,a=s.sibling;var l={mode:"hidden",children:r.children};return!(o&1)&&t.child!==s?(r=t.child,r.childLanes=0,r.pendingProps=l,t.deletions=null):(r=dn(s,l),r.subtreeFlags=s.subtreeFlags&14680064),a!==null?i=dn(a,i):(i=Bn(i,o,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,o=e.child.memoizedState,o=o===null?Jl(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~n,t.memoizedState=Gl,r}return i=e.child,e=i.sibling,r=dn(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function gc(e,t){return t=na({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ti(e,t,n,r){return r!==null&&nc(r),Mr(t,e.child,null,n),e=gc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function iw(e,t,n,r,s,i,o){if(n)return t.flags&256?(t.flags&=-257,r=Ha(Error(T(422))),Ti(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,s=t.mode,r=na({mode:"visible",children:r.children},s,0,null),i=Bn(i,s,o,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&Mr(t,e.child,null,o),t.child.memoizedState=Jl(o),t.memoizedState=Gl,i);if(!(t.mode&1))return Ti(e,t,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var a=r.dgst;return r=a,i=Error(T(419)),r=Ha(i,r,void 0),Ti(e,t,o,r)}if(a=(o&e.childLanes)!==0,De||a){if(r=ye,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,zt(e,s),mt(r,e,s,-1))}return kc(),r=Ha(Error(T(421))),Ti(e,t,o,r)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=vw.bind(null,e),s._reactRetry=t,null):(e=i.treeContext,He=an(s.nextSibling),We=t,Y=!0,ht=null,e!==null&&(tt[nt++]=Nt,tt[nt++]=Ot,tt[nt++]=Fn,Nt=e.id,Ot=e.overflow,Fn=t),t=gc(t,r.children),t.flags|=4096,t)}function Qd(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Vl(e.return,t,n)}function Wa(e,t,n,r,s){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function Mm(e,t,n){var r=t.pendingProps,s=r.revealOrder,i=r.tail;if(Ae(e,t,r.children,n),r=Q.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Qd(e,n,t);else if(e.tag===19)Qd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(W(Q,r),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&ko(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Wa(t,!1,s,n,i);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&ko(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Wa(t,!0,n,null,i);break;case"together":Wa(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Xi(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Bt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Wn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(T(153));if(t.child!==null){for(e=t.child,n=dn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=dn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ow(e,t,n){switch(t.tag){case 3:Im(t),Dr();break;case 5:um(t);break;case 1:$e(t.type)&&go(t);break;case 4:lc(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,s=t.memoizedProps.value;W(wo,r._currentValue),r._currentValue=s;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(W(Q,Q.current&1),t.flags|=128,null):n&t.child.childLanes?Dm(e,t,n):(W(Q,Q.current&1),e=Bt(e,t,n),e!==null?e.sibling:null);W(Q,Q.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Mm(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),W(Q,Q.current),r)break;return null;case 22:case 23:return t.lanes=0,Om(e,t,n)}return Bt(e,t,n)}var $m,Yl,Um,zm;$m=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Yl=function(){};Um=function(e,t,n,r){var s=e.memoizedProps;if(s!==r){e=t.stateNode,Mn(Et.current);var i=null;switch(n){case"input":s=vl(e,s),r=vl(e,r),i=[];break;case"select":s=ee({},s,{value:void 0}),r=ee({},r,{value:void 0}),i=[];break;case"textarea":s=bl(e,s),r=bl(e,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=po)}_l(n,r);var o;n=null;for(u in s)if(!r.hasOwnProperty(u)&&s.hasOwnProperty(u)&&s[u]!=null)if(u==="style"){var a=s[u];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Cs.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in r){var l=r[u];if(a=s!=null?s[u]:void 0,r.hasOwnProperty(u)&&l!==a&&(l!=null||a!=null))if(u==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(i||(i=[]),i.push(u,n)),n=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(i=i||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(i=i||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Cs.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&K("scroll",e),i||a===l||(i=[])):(i=i||[]).push(u,l))}n&&(i=i||[]).push("style",n);var u=i;(t.updateQueue=u)&&(t.flags|=4)}};zm=function(e,t,n,r){n!==r&&(t.flags|=4)};function es(e,t){if(!Y)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Se(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function aw(e,t,n){var r=t.pendingProps;switch(tc(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Se(t),null;case 1:return $e(t.type)&&mo(),Se(t),null;case 3:return r=t.stateNode,$r(),G(Me),G(Te),cc(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Ei(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,ht!==null&&(su(ht),ht=null))),Yl(e,t),Se(t),null;case 5:uc(t);var s=Mn(zs.current);if(n=t.type,e!==null&&t.stateNode!=null)Um(e,t,n,r,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(T(166));return Se(t),null}if(e=Mn(Et.current),Ei(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[_t]=t,r[$s]=i,e=(t.mode&1)!==0,n){case"dialog":K("cancel",r),K("close",r);break;case"iframe":case"object":case"embed":K("load",r);break;case"video":case"audio":for(s=0;s<ls.length;s++)K(ls[s],r);break;case"source":K("error",r);break;case"img":case"image":case"link":K("error",r),K("load",r);break;case"details":K("toggle",r);break;case"input":od(r,i),K("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},K("invalid",r);break;case"textarea":ld(r,i),K("invalid",r)}_l(n,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var a=i[o];o==="children"?typeof a=="string"?r.textContent!==a&&(i.suppressHydrationWarning!==!0&&Si(r.textContent,a,e),s=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(i.suppressHydrationWarning!==!0&&Si(r.textContent,a,e),s=["children",""+a]):Cs.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&K("scroll",r)}switch(n){case"input":gi(r),ad(r,i,!0);break;case"textarea":gi(r),ud(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=po)}r=s,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=pp(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[_t]=t,e[$s]=r,$m(e,t,!1,!1),t.stateNode=e;e:{switch(o=Sl(n,r),n){case"dialog":K("cancel",e),K("close",e),s=r;break;case"iframe":case"object":case"embed":K("load",e),s=r;break;case"video":case"audio":for(s=0;s<ls.length;s++)K(ls[s],e);s=r;break;case"source":K("error",e),s=r;break;case"img":case"image":case"link":K("error",e),K("load",e),s=r;break;case"details":K("toggle",e),s=r;break;case"input":od(e,r),s=vl(e,r),K("invalid",e);break;case"option":s=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},s=ee({},r,{value:void 0}),K("invalid",e);break;case"textarea":ld(e,r),s=bl(e,r),K("invalid",e);break;default:s=r}_l(n,s),a=s;for(i in a)if(a.hasOwnProperty(i)){var l=a[i];i==="style"?yp(e,l):i==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&mp(e,l)):i==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Ps(e,l):typeof l=="number"&&Ps(e,""+l):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Cs.hasOwnProperty(i)?l!=null&&i==="onScroll"&&K("scroll",e):l!=null&&zu(e,i,l,o))}switch(n){case"input":gi(e),ad(e,r,!1);break;case"textarea":gi(e),ud(e);break;case"option":r.value!=null&&e.setAttribute("value",""+pn(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Tr(e,!!r.multiple,i,!1):r.defaultValue!=null&&Tr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=po)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Se(t),null;case 6:if(e&&t.stateNode!=null)zm(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(T(166));if(n=Mn(zs.current),Mn(Et.current),Ei(t)){if(r=t.stateNode,n=t.memoizedProps,r[_t]=t,(i=r.nodeValue!==n)&&(e=We,e!==null))switch(e.tag){case 3:Si(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Si(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[_t]=t,t.stateNode=r}return Se(t),null;case 13:if(G(Q),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Y&&He!==null&&t.mode&1&&!(t.flags&128))sm(),Dr(),t.flags|=98560,i=!1;else if(i=Ei(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(T(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(T(317));i[_t]=t}else Dr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Se(t),i=!1}else ht!==null&&(su(ht),ht=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||Q.current&1?fe===0&&(fe=3):kc())),t.updateQueue!==null&&(t.flags|=4),Se(t),null);case 4:return $r(),Yl(e,t),e===null&&Ds(t.stateNode.containerInfo),Se(t),null;case 10:return ic(t.type._context),Se(t),null;case 17:return $e(t.type)&&mo(),Se(t),null;case 19:if(G(Q),i=t.memoizedState,i===null)return Se(t),null;if(r=(t.flags&128)!==0,o=i.rendering,o===null)if(r)es(i,!1);else{if(fe!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=ko(e),o!==null){for(t.flags|=128,es(i,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return W(Q,Q.current&1|2),t.child}e=e.sibling}i.tail!==null&&oe()>zr&&(t.flags|=128,r=!0,es(i,!1),t.lanes=4194304)}else{if(!r)if(e=ko(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),es(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!Y)return Se(t),null}else 2*oe()-i.renderingStartTime>zr&&n!==1073741824&&(t.flags|=128,r=!0,es(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(n=i.last,n!==null?n.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=oe(),t.sibling=null,n=Q.current,W(Q,r?n&1|2:n&1),t):(Se(t),null);case 22:case 23:return bc(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Ve&1073741824&&(Se(t),t.subtreeFlags&6&&(t.flags|=8192)):Se(t),null;case 24:return null;case 25:return null}throw Error(T(156,t.tag))}function lw(e,t){switch(tc(t),t.tag){case 1:return $e(t.type)&&mo(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return $r(),G(Me),G(Te),cc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return uc(t),null;case 13:if(G(Q),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(T(340));Dr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return G(Q),null;case 4:return $r(),null;case 10:return ic(t.type._context),null;case 22:case 23:return bc(),null;case 24:return null;default:return null}}var Ci=!1,je=!1,uw=typeof WeakSet=="function"?WeakSet:Set,A=null;function wr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ne(e,t,r)}else n.current=null}function Ql(e,t,n){try{n()}catch(r){ne(e,t,r)}}var Xd=!1;function cw(e,t){if(Ll=co,e=Wp(),Zu(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,u=0,c=0,h=e,f=null;t:for(;;){for(var p;h!==n||s!==0&&h.nodeType!==3||(a=o+s),h!==i||r!==0&&h.nodeType!==3||(l=o+r),h.nodeType===3&&(o+=h.nodeValue.length),(p=h.firstChild)!==null;)f=h,h=p;for(;;){if(h===e)break t;if(f===n&&++u===s&&(a=o),f===i&&++c===r&&(l=o),(p=h.nextSibling)!==null)break;h=f,f=h.parentNode}h=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Il={focusedElem:e,selectionRange:n},co=!1,A=t;A!==null;)if(t=A,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,A=e;else for(;A!==null;){t=A;try{var y=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var w=y.memoizedProps,b=y.memoizedState,v=t.stateNode,m=v.getSnapshotBeforeUpdate(t.elementType===t.type?w:ut(t.type,w),b);v.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(T(163))}}catch(x){ne(t,t.return,x)}if(e=t.sibling,e!==null){e.return=t.return,A=e;break}A=t.return}return y=Xd,Xd=!1,y}function vs(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&e)===e){var i=s.destroy;s.destroy=void 0,i!==void 0&&Ql(t,n,i)}s=s.next}while(s!==r)}}function ea(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Xl(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Bm(e){var t=e.alternate;t!==null&&(e.alternate=null,Bm(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[_t],delete t[$s],delete t[$l],delete t[q0],delete t[K0])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Vm(e){return e.tag===5||e.tag===3||e.tag===4}function Zd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Vm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Zl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=po));else if(r!==4&&(e=e.child,e!==null))for(Zl(e,t,n),e=e.sibling;e!==null;)Zl(e,t,n),e=e.sibling}function eu(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(eu(e,t,n),e=e.sibling;e!==null;)eu(e,t,n),e=e.sibling}var xe=null,dt=!1;function qt(e,t,n){for(n=n.child;n!==null;)Fm(e,t,n),n=n.sibling}function Fm(e,t,n){if(St&&typeof St.onCommitFiberUnmount=="function")try{St.onCommitFiberUnmount(qo,n)}catch{}switch(n.tag){case 5:je||wr(n,t);case 6:var r=xe,s=dt;xe=null,qt(e,t,n),xe=r,dt=s,xe!==null&&(dt?(e=xe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):xe.removeChild(n.stateNode));break;case 18:xe!==null&&(dt?(e=xe,n=n.stateNode,e.nodeType===8?$a(e.parentNode,n):e.nodeType===1&&$a(e,n),Os(e)):$a(xe,n.stateNode));break;case 4:r=xe,s=dt,xe=n.stateNode.containerInfo,dt=!0,qt(e,t,n),xe=r,dt=s;break;case 0:case 11:case 14:case 15:if(!je&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&Ql(n,t,o),s=s.next}while(s!==r)}qt(e,t,n);break;case 1:if(!je&&(wr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){ne(n,t,a)}qt(e,t,n);break;case 21:qt(e,t,n);break;case 22:n.mode&1?(je=(r=je)||n.memoizedState!==null,qt(e,t,n),je=r):qt(e,t,n);break;default:qt(e,t,n)}}function eh(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new uw),t.forEach(function(r){var s=ww.bind(null,e,r);n.has(r)||(n.add(r),r.then(s,s))})}}function at(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=e,o=t,a=o;e:for(;a!==null;){switch(a.tag){case 5:xe=a.stateNode,dt=!1;break e;case 3:xe=a.stateNode.containerInfo,dt=!0;break e;case 4:xe=a.stateNode.containerInfo,dt=!0;break e}a=a.return}if(xe===null)throw Error(T(160));Fm(i,o,s),xe=null,dt=!1;var l=s.alternate;l!==null&&(l.return=null),s.return=null}catch(u){ne(s,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Hm(t,e),t=t.sibling}function Hm(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(at(t,e),vt(e),r&4){try{vs(3,e,e.return),ea(3,e)}catch(w){ne(e,e.return,w)}try{vs(5,e,e.return)}catch(w){ne(e,e.return,w)}}break;case 1:at(t,e),vt(e),r&512&&n!==null&&wr(n,n.return);break;case 5:if(at(t,e),vt(e),r&512&&n!==null&&wr(n,n.return),e.flags&32){var s=e.stateNode;try{Ps(s,"")}catch(w){ne(e,e.return,w)}}if(r&4&&(s=e.stateNode,s!=null)){var i=e.memoizedProps,o=n!==null?n.memoizedProps:i,a=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{a==="input"&&i.type==="radio"&&i.name!=null&&hp(s,i),Sl(a,o);var u=Sl(a,i);for(o=0;o<l.length;o+=2){var c=l[o],h=l[o+1];c==="style"?yp(s,h):c==="dangerouslySetInnerHTML"?mp(s,h):c==="children"?Ps(s,h):zu(s,c,h,u)}switch(a){case"input":wl(s,i);break;case"textarea":fp(s,i);break;case"select":var f=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var p=i.value;p!=null?Tr(s,!!i.multiple,p,!1):f!==!!i.multiple&&(i.defaultValue!=null?Tr(s,!!i.multiple,i.defaultValue,!0):Tr(s,!!i.multiple,i.multiple?[]:"",!1))}s[$s]=i}catch(w){ne(e,e.return,w)}}break;case 6:if(at(t,e),vt(e),r&4){if(e.stateNode===null)throw Error(T(162));s=e.stateNode,i=e.memoizedProps;try{s.nodeValue=i}catch(w){ne(e,e.return,w)}}break;case 3:if(at(t,e),vt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Os(t.containerInfo)}catch(w){ne(e,e.return,w)}break;case 4:at(t,e),vt(e);break;case 13:at(t,e),vt(e),s=e.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(wc=oe())),r&4&&eh(e);break;case 22:if(c=n!==null&&n.memoizedState!==null,e.mode&1?(je=(u=je)||c,at(t,e),je=u):at(t,e),vt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!c&&e.mode&1)for(A=e,c=e.child;c!==null;){for(h=A=c;A!==null;){switch(f=A,p=f.child,f.tag){case 0:case 11:case 14:case 15:vs(4,f,f.return);break;case 1:wr(f,f.return);var y=f.stateNode;if(typeof y.componentWillUnmount=="function"){r=f,n=f.return;try{t=r,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(w){ne(r,n,w)}}break;case 5:wr(f,f.return);break;case 22:if(f.memoizedState!==null){nh(h);continue}}p!==null?(p.return=f,A=p):nh(h)}c=c.sibling}e:for(c=null,h=e;;){if(h.tag===5){if(c===null){c=h;try{s=h.stateNode,u?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(a=h.stateNode,l=h.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=gp("display",o))}catch(w){ne(e,e.return,w)}}}else if(h.tag===6){if(c===null)try{h.stateNode.nodeValue=u?"":h.memoizedProps}catch(w){ne(e,e.return,w)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;c===h&&(c=null),h=h.return}c===h&&(c=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:at(t,e),vt(e),r&4&&eh(e);break;case 21:break;default:at(t,e),vt(e)}}function vt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Vm(n)){var r=n;break e}n=n.return}throw Error(T(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(Ps(s,""),r.flags&=-33);var i=Zd(e);eu(e,i,s);break;case 3:case 4:var o=r.stateNode.containerInfo,a=Zd(e);Zl(e,a,o);break;default:throw Error(T(161))}}catch(l){ne(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function dw(e,t,n){A=e,Wm(e)}function Wm(e,t,n){for(var r=(e.mode&1)!==0;A!==null;){var s=A,i=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||Ci;if(!o){var a=s.alternate,l=a!==null&&a.memoizedState!==null||je;a=Ci;var u=je;if(Ci=o,(je=l)&&!u)for(A=s;A!==null;)o=A,l=o.child,o.tag===22&&o.memoizedState!==null?rh(s):l!==null?(l.return=o,A=l):rh(s);for(;i!==null;)A=i,Wm(i),i=i.sibling;A=s,Ci=a,je=u}th(e)}else s.subtreeFlags&8772&&i!==null?(i.return=s,A=i):th(e)}}function th(e){for(;A!==null;){var t=A;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:je||ea(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!je)if(n===null)r.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:ut(t.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Ud(t,i,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ud(t,o,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var c=u.memoizedState;if(c!==null){var h=c.dehydrated;h!==null&&Os(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(T(163))}je||t.flags&512&&Xl(t)}catch(f){ne(t,t.return,f)}}if(t===e){A=null;break}if(n=t.sibling,n!==null){n.return=t.return,A=n;break}A=t.return}}function nh(e){for(;A!==null;){var t=A;if(t===e){A=null;break}var n=t.sibling;if(n!==null){n.return=t.return,A=n;break}A=t.return}}function rh(e){for(;A!==null;){var t=A;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ea(4,t)}catch(l){ne(t,n,l)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var s=t.return;try{r.componentDidMount()}catch(l){ne(t,s,l)}}var i=t.return;try{Xl(t)}catch(l){ne(t,i,l)}break;case 5:var o=t.return;try{Xl(t)}catch(l){ne(t,o,l)}}}catch(l){ne(t,t.return,l)}if(t===e){A=null;break}var a=t.sibling;if(a!==null){a.return=t.return,A=a;break}A=t.return}}var hw=Math.ceil,Eo=Ft.ReactCurrentDispatcher,yc=Ft.ReactCurrentOwner,st=Ft.ReactCurrentBatchConfig,z=0,ye=null,ue=null,be=0,Ve=0,xr=xn(0),fe=0,Hs=null,Wn=0,ta=0,vc=0,ws=null,Ie=null,wc=0,zr=1/0,Ct=null,jo=!1,tu=null,un=null,Pi=!1,nn=null,To=0,xs=0,nu=null,Zi=-1,eo=0;function Re(){return z&6?oe():Zi!==-1?Zi:Zi=oe()}function cn(e){return e.mode&1?z&2&&be!==0?be&-be:J0.transition!==null?(eo===0&&(eo=Pp()),eo):(e=V,e!==0||(e=window.event,e=e===void 0?16:Dp(e.type)),e):1}function mt(e,t,n,r){if(50<xs)throw xs=0,nu=null,Error(T(185));si(e,n,r),(!(z&2)||e!==ye)&&(e===ye&&(!(z&2)&&(ta|=n),fe===4&&Xt(e,be)),Ue(e,r),n===1&&z===0&&!(t.mode&1)&&(zr=oe()+500,Qo&&bn()))}function Ue(e,t){var n=e.callbackNode;Jv(e,t);var r=uo(e,e===ye?be:0);if(r===0)n!==null&&hd(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&hd(n),t===1)e.tag===0?G0(sh.bind(null,e)):tm(sh.bind(null,e)),H0(function(){!(z&6)&&bn()}),n=null;else{switch(Ap(r)){case 1:n=Wu;break;case 4:n=Tp;break;case 16:n=lo;break;case 536870912:n=Cp;break;default:n=lo}n=Zm(n,qm.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function qm(e,t){if(Zi=-1,eo=0,z&6)throw Error(T(327));var n=e.callbackNode;if(Nr()&&e.callbackNode!==n)return null;var r=uo(e,e===ye?be:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Co(e,r);else{t=r;var s=z;z|=2;var i=Gm();(ye!==e||be!==t)&&(Ct=null,zr=oe()+500,zn(e,t));do try{mw();break}catch(a){Km(e,a)}while(1);sc(),Eo.current=i,z=s,ue!==null?t=0:(ye=null,be=0,t=fe)}if(t!==0){if(t===2&&(s=Pl(e),s!==0&&(r=s,t=ru(e,s))),t===1)throw n=Hs,zn(e,0),Xt(e,r),Ue(e,oe()),n;if(t===6)Xt(e,r);else{if(s=e.current.alternate,!(r&30)&&!fw(s)&&(t=Co(e,r),t===2&&(i=Pl(e),i!==0&&(r=i,t=ru(e,i))),t===1))throw n=Hs,zn(e,0),Xt(e,r),Ue(e,oe()),n;switch(e.finishedWork=s,e.finishedLanes=r,t){case 0:case 1:throw Error(T(345));case 2:An(e,Ie,Ct);break;case 3:if(Xt(e,r),(r&130023424)===r&&(t=wc+500-oe(),10<t)){if(uo(e,0)!==0)break;if(s=e.suspendedLanes,(s&r)!==r){Re(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=Ml(An.bind(null,e,Ie,Ct),t);break}An(e,Ie,Ct);break;case 4:if(Xt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,s=-1;0<r;){var o=31-pt(r);i=1<<o,o=t[o],o>s&&(s=o),r&=~i}if(r=s,r=oe()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*hw(r/1960))-r,10<r){e.timeoutHandle=Ml(An.bind(null,e,Ie,Ct),r);break}An(e,Ie,Ct);break;case 5:An(e,Ie,Ct);break;default:throw Error(T(329))}}}return Ue(e,oe()),e.callbackNode===n?qm.bind(null,e):null}function ru(e,t){var n=ws;return e.current.memoizedState.isDehydrated&&(zn(e,t).flags|=256),e=Co(e,t),e!==2&&(t=Ie,Ie=n,t!==null&&su(t)),e}function su(e){Ie===null?Ie=e:Ie.push.apply(Ie,e)}function fw(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!gt(i(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Xt(e,t){for(t&=~vc,t&=~ta,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-pt(t),r=1<<n;e[n]=-1,t&=~r}}function sh(e){if(z&6)throw Error(T(327));Nr();var t=uo(e,0);if(!(t&1))return Ue(e,oe()),null;var n=Co(e,t);if(e.tag!==0&&n===2){var r=Pl(e);r!==0&&(t=r,n=ru(e,r))}if(n===1)throw n=Hs,zn(e,0),Xt(e,t),Ue(e,oe()),n;if(n===6)throw Error(T(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,An(e,Ie,Ct),Ue(e,oe()),null}function xc(e,t){var n=z;z|=1;try{return e(t)}finally{z=n,z===0&&(zr=oe()+500,Qo&&bn())}}function qn(e){nn!==null&&nn.tag===0&&!(z&6)&&Nr();var t=z;z|=1;var n=st.transition,r=V;try{if(st.transition=null,V=1,e)return e()}finally{V=r,st.transition=n,z=t,!(z&6)&&bn()}}function bc(){Ve=xr.current,G(xr)}function zn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,F0(n)),ue!==null)for(n=ue.return;n!==null;){var r=n;switch(tc(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&mo();break;case 3:$r(),G(Me),G(Te),cc();break;case 5:uc(r);break;case 4:$r();break;case 13:G(Q);break;case 19:G(Q);break;case 10:ic(r.type._context);break;case 22:case 23:bc()}n=n.return}if(ye=e,ue=e=dn(e.current,null),be=Ve=t,fe=0,Hs=null,vc=ta=Wn=0,Ie=ws=null,Dn!==null){for(t=0;t<Dn.length;t++)if(n=Dn[t],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=s,r.next=o}n.pending=r}Dn=null}return e}function Km(e,t){do{var n=ue;try{if(sc(),Yi.current=So,_o){for(var r=Z.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}_o=!1}if(Hn=0,ge=he=Z=null,ys=!1,Bs=0,yc.current=null,n===null||n.return===null){fe=1,Hs=t,ue=null;break}e:{var i=e,o=n.return,a=n,l=t;if(t=be,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,c=a,h=c.tag;if(!(c.mode&1)&&(h===0||h===11||h===15)){var f=c.alternate;f?(c.updateQueue=f.updateQueue,c.memoizedState=f.memoizedState,c.lanes=f.lanes):(c.updateQueue=null,c.memoizedState=null)}var p=Wd(o);if(p!==null){p.flags&=-257,qd(p,o,a,i,t),p.mode&1&&Hd(i,u,t),t=p,l=u;var y=t.updateQueue;if(y===null){var w=new Set;w.add(l),t.updateQueue=w}else y.add(l);break e}else{if(!(t&1)){Hd(i,u,t),kc();break e}l=Error(T(426))}}else if(Y&&a.mode&1){var b=Wd(o);if(b!==null){!(b.flags&65536)&&(b.flags|=256),qd(b,o,a,i,t),nc(Ur(l,a));break e}}i=l=Ur(l,a),fe!==4&&(fe=2),ws===null?ws=[i]:ws.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var v=Am(i,l,t);$d(i,v);break e;case 1:a=l;var m=i.type,g=i.stateNode;if(!(i.flags&128)&&(typeof m.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(un===null||!un.has(g)))){i.flags|=65536,t&=-t,i.lanes|=t;var x=Rm(i,a,t);$d(i,x);break e}}i=i.return}while(i!==null)}Ym(n)}catch(_){t=_,ue===n&&n!==null&&(ue=n=n.return);continue}break}while(1)}function Gm(){var e=Eo.current;return Eo.current=So,e===null?So:e}function kc(){(fe===0||fe===3||fe===2)&&(fe=4),ye===null||!(Wn&268435455)&&!(ta&268435455)||Xt(ye,be)}function Co(e,t){var n=z;z|=2;var r=Gm();(ye!==e||be!==t)&&(Ct=null,zn(e,t));do try{pw();break}catch(s){Km(e,s)}while(1);if(sc(),z=n,Eo.current=r,ue!==null)throw Error(T(261));return ye=null,be=0,fe}function pw(){for(;ue!==null;)Jm(ue)}function mw(){for(;ue!==null&&!zv();)Jm(ue)}function Jm(e){var t=Xm(e.alternate,e,Ve);e.memoizedProps=e.pendingProps,t===null?Ym(e):ue=t,yc.current=null}function Ym(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=lw(n,t),n!==null){n.flags&=32767,ue=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{fe=6,ue=null;return}}else if(n=aw(n,t,Ve),n!==null){ue=n;return}if(t=t.sibling,t!==null){ue=t;return}ue=t=e}while(t!==null);fe===0&&(fe=5)}function An(e,t,n){var r=V,s=st.transition;try{st.transition=null,V=1,gw(e,t,n,r)}finally{st.transition=s,V=r}return null}function gw(e,t,n,r){do Nr();while(nn!==null);if(z&6)throw Error(T(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(T(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(Yv(e,i),e===ye&&(ue=ye=null,be=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Pi||(Pi=!0,Zm(lo,function(){return Nr(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=st.transition,st.transition=null;var o=V;V=1;var a=z;z|=4,yc.current=null,cw(e,n),Hm(n,e),D0(Il),co=!!Ll,Il=Ll=null,e.current=n,dw(n),Bv(),z=a,V=o,st.transition=i}else e.current=n;if(Pi&&(Pi=!1,nn=e,To=s),i=e.pendingLanes,i===0&&(un=null),Hv(n.stateNode),Ue(e,oe()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(jo)throw jo=!1,e=tu,tu=null,e;return To&1&&e.tag!==0&&Nr(),i=e.pendingLanes,i&1?e===nu?xs++:(xs=0,nu=e):xs=0,bn(),null}function Nr(){if(nn!==null){var e=Ap(To),t=st.transition,n=V;try{if(st.transition=null,V=16>e?16:e,nn===null)var r=!1;else{if(e=nn,nn=null,To=0,z&6)throw Error(T(331));var s=z;for(z|=4,A=e.current;A!==null;){var i=A,o=i.child;if(A.flags&16){var a=i.deletions;if(a!==null){for(var l=0;l<a.length;l++){var u=a[l];for(A=u;A!==null;){var c=A;switch(c.tag){case 0:case 11:case 15:vs(8,c,i)}var h=c.child;if(h!==null)h.return=c,A=h;else for(;A!==null;){c=A;var f=c.sibling,p=c.return;if(Bm(c),c===u){A=null;break}if(f!==null){f.return=p,A=f;break}A=p}}}var y=i.alternate;if(y!==null){var w=y.child;if(w!==null){y.child=null;do{var b=w.sibling;w.sibling=null,w=b}while(w!==null)}}A=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,A=o;else e:for(;A!==null;){if(i=A,i.flags&2048)switch(i.tag){case 0:case 11:case 15:vs(9,i,i.return)}var v=i.sibling;if(v!==null){v.return=i.return,A=v;break e}A=i.return}}var m=e.current;for(A=m;A!==null;){o=A;var g=o.child;if(o.subtreeFlags&2064&&g!==null)g.return=o,A=g;else e:for(o=m;A!==null;){if(a=A,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:ea(9,a)}}catch(_){ne(a,a.return,_)}if(a===o){A=null;break e}var x=a.sibling;if(x!==null){x.return=a.return,A=x;break e}A=a.return}}if(z=s,bn(),St&&typeof St.onPostCommitFiberRoot=="function")try{St.onPostCommitFiberRoot(qo,e)}catch{}r=!0}return r}finally{V=n,st.transition=t}}return!1}function ih(e,t,n){t=Ur(n,t),t=Am(e,t,1),e=ln(e,t,1),t=Re(),e!==null&&(si(e,1,t),Ue(e,t))}function ne(e,t,n){if(e.tag===3)ih(e,e,n);else for(;t!==null;){if(t.tag===3){ih(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(un===null||!un.has(r))){e=Ur(n,e),e=Rm(t,e,1),t=ln(t,e,1),e=Re(),t!==null&&(si(t,1,e),Ue(t,e));break}}t=t.return}}function yw(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Re(),e.pingedLanes|=e.suspendedLanes&n,ye===e&&(be&n)===n&&(fe===4||fe===3&&(be&130023424)===be&&500>oe()-wc?zn(e,0):vc|=n),Ue(e,t)}function Qm(e,t){t===0&&(e.mode&1?(t=wi,wi<<=1,!(wi&130023424)&&(wi=4194304)):t=1);var n=Re();e=zt(e,t),e!==null&&(si(e,t,n),Ue(e,n))}function vw(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Qm(e,n)}function ww(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(T(314))}r!==null&&r.delete(t),Qm(e,n)}var Xm;Xm=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Me.current)De=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return De=!1,ow(e,t,n);De=!!(e.flags&131072)}else De=!1,Y&&t.flags&1048576&&nm(t,vo,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Xi(e,t),e=t.pendingProps;var s=Ir(t,Te.current);Rr(t,n),s=hc(null,t,r,e,s,n);var i=fc();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,$e(r)?(i=!0,go(t)):i=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,ac(t),s.updater=Zo,t.stateNode=s,s._reactInternals=t,Hl(t,r,e,n),t=Kl(null,t,r,!0,i,n)):(t.tag=0,Y&&i&&ec(t),Ae(null,t,s,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Xi(e,t),e=t.pendingProps,s=r._init,r=s(r._payload),t.type=r,s=t.tag=bw(r),e=ut(r,e),s){case 0:t=ql(null,t,r,e,n);break e;case 1:t=Jd(null,t,r,e,n);break e;case 11:t=Kd(null,t,r,e,n);break e;case 14:t=Gd(null,t,r,ut(r.type,e),n);break e}throw Error(T(306,r,""))}return t;case 0:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:ut(r,s),ql(e,t,r,s,n);case 1:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:ut(r,s),Jd(e,t,r,s,n);case 3:e:{if(Im(t),e===null)throw Error(T(387));r=t.pendingProps,i=t.memoizedState,s=i.element,lm(e,t),bo(t,r,null,n);var o=t.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){s=Ur(Error(T(423)),t),t=Yd(e,t,r,n,s);break e}else if(r!==s){s=Ur(Error(T(424)),t),t=Yd(e,t,r,n,s);break e}else for(He=an(t.stateNode.containerInfo.firstChild),We=t,Y=!0,ht=null,n=om(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Dr(),r===s){t=Bt(e,t,n);break e}Ae(e,t,r,n)}t=t.child}return t;case 5:return um(t),e===null&&Bl(t),r=t.type,s=t.pendingProps,i=e!==null?e.memoizedProps:null,o=s.children,Dl(r,s)?o=null:i!==null&&Dl(r,i)&&(t.flags|=32),Lm(e,t),Ae(e,t,o,n),t.child;case 6:return e===null&&Bl(t),null;case 13:return Dm(e,t,n);case 4:return lc(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Mr(t,null,r,n):Ae(e,t,r,n),t.child;case 11:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:ut(r,s),Kd(e,t,r,s,n);case 7:return Ae(e,t,t.pendingProps,n),t.child;case 8:return Ae(e,t,t.pendingProps.children,n),t.child;case 12:return Ae(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,s=t.pendingProps,i=t.memoizedProps,o=s.value,W(wo,r._currentValue),r._currentValue=o,i!==null)if(gt(i.value,o)){if(i.children===s.children&&!Me.current){t=Bt(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var a=i.dependencies;if(a!==null){o=i.child;for(var l=a.firstContext;l!==null;){if(l.context===r){if(i.tag===1){l=It(-1,n&-n),l.tag=2;var u=i.updateQueue;if(u!==null){u=u.shared;var c=u.pending;c===null?l.next=l:(l.next=c.next,c.next=l),u.pending=l}}i.lanes|=n,l=i.alternate,l!==null&&(l.lanes|=n),Vl(i.return,n,t),a.lanes|=n;break}l=l.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(T(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Vl(o,n,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}Ae(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,r=t.pendingProps.children,Rr(t,n),s=it(s),r=r(s),t.flags|=1,Ae(e,t,r,n),t.child;case 14:return r=t.type,s=ut(r,t.pendingProps),s=ut(r.type,s),Gd(e,t,r,s,n);case 15:return Nm(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:ut(r,s),Xi(e,t),t.tag=1,$e(r)?(e=!0,go(t)):e=!1,Rr(t,n),Pm(t,r,s),Hl(t,r,s,n),Kl(null,t,r,!0,e,n);case 19:return Mm(e,t,n);case 22:return Om(e,t,n)}throw Error(T(156,t.tag))};function Zm(e,t){return jp(e,t)}function xw(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function rt(e,t,n,r){return new xw(e,t,n,r)}function _c(e){return e=e.prototype,!(!e||!e.isReactComponent)}function bw(e){if(typeof e=="function")return _c(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Vu)return 11;if(e===Fu)return 14}return 2}function dn(e,t){var n=e.alternate;return n===null?(n=rt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function to(e,t,n,r,s,i){var o=2;if(r=e,typeof e=="function")_c(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case cr:return Bn(n.children,s,i,t);case Bu:o=8,s|=8;break;case pl:return e=rt(12,n,t,s|2),e.elementType=pl,e.lanes=i,e;case ml:return e=rt(13,n,t,s),e.elementType=ml,e.lanes=i,e;case gl:return e=rt(19,n,t,s),e.elementType=gl,e.lanes=i,e;case up:return na(n,s,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ap:o=10;break e;case lp:o=9;break e;case Vu:o=11;break e;case Fu:o=14;break e;case Gt:o=16,r=null;break e}throw Error(T(130,e==null?e:typeof e,""))}return t=rt(o,n,t,s),t.elementType=e,t.type=r,t.lanes=i,t}function Bn(e,t,n,r){return e=rt(7,e,r,t),e.lanes=n,e}function na(e,t,n,r){return e=rt(22,e,r,t),e.elementType=up,e.lanes=n,e.stateNode={isHidden:!1},e}function qa(e,t,n){return e=rt(6,e,null,t),e.lanes=n,e}function Ka(e,t,n){return t=rt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function kw(e,t,n,r,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ta(0),this.expirationTimes=Ta(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ta(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Sc(e,t,n,r,s,i,o,a,l){return e=new kw(e,t,n,a,l),t===1?(t=1,i===!0&&(t|=8)):t=0,i=rt(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},ac(i),e}function _w(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ur,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function eg(e){if(!e)return mn;e=e._reactInternals;e:{if(Jn(e)!==e||e.tag!==1)throw Error(T(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if($e(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(T(171))}if(e.tag===1){var n=e.type;if($e(n))return em(e,n,t)}return t}function tg(e,t,n,r,s,i,o,a,l){return e=Sc(n,r,!0,e,s,i,o,a,l),e.context=eg(null),n=e.current,r=Re(),s=cn(n),i=It(r,s),i.callback=t??null,ln(n,i,s),e.current.lanes=s,si(e,s,r),Ue(e,r),e}function ra(e,t,n,r){var s=t.current,i=Re(),o=cn(s);return n=eg(n),t.context===null?t.context=n:t.pendingContext=n,t=It(i,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=ln(s,t,o),e!==null&&(mt(e,s,o,i),Ji(e,s,o)),o}function Po(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function oh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ec(e,t){oh(e,t),(e=e.alternate)&&oh(e,t)}function Sw(){return null}var ng=typeof reportError=="function"?reportError:function(e){console.error(e)};function jc(e){this._internalRoot=e}sa.prototype.render=jc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(T(409));ra(e,t,null,null)};sa.prototype.unmount=jc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;qn(function(){ra(null,e,null,null)}),t[Ut]=null}};function sa(e){this._internalRoot=e}sa.prototype.unstable_scheduleHydration=function(e){if(e){var t=Op();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Qt.length&&t!==0&&t<Qt[n].priority;n++);Qt.splice(n,0,e),n===0&&Ip(e)}};function Tc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ia(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ah(){}function Ew(e,t,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var u=Po(o);i.call(u)}}var o=tg(t,r,e,0,null,!1,!1,"",ah);return e._reactRootContainer=o,e[Ut]=o.current,Ds(e.nodeType===8?e.parentNode:e),qn(),o}for(;s=e.lastChild;)e.removeChild(s);if(typeof r=="function"){var a=r;r=function(){var u=Po(l);a.call(u)}}var l=Sc(e,0,!1,null,null,!1,!1,"",ah);return e._reactRootContainer=l,e[Ut]=l.current,Ds(e.nodeType===8?e.parentNode:e),qn(function(){ra(t,l,n,r)}),l}function oa(e,t,n,r,s){var i=n._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var a=s;s=function(){var l=Po(o);a.call(l)}}ra(t,o,e,s)}else o=Ew(n,t,e,s,r);return Po(o)}Rp=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=as(t.pendingLanes);n!==0&&(qu(t,n|1),Ue(t,oe()),!(z&6)&&(zr=oe()+500,bn()))}break;case 13:qn(function(){var r=zt(e,1);if(r!==null){var s=Re();mt(r,e,1,s)}}),Ec(e,1)}};Ku=function(e){if(e.tag===13){var t=zt(e,134217728);if(t!==null){var n=Re();mt(t,e,134217728,n)}Ec(e,134217728)}};Np=function(e){if(e.tag===13){var t=cn(e),n=zt(e,t);if(n!==null){var r=Re();mt(n,e,t,r)}Ec(e,t)}};Op=function(){return V};Lp=function(e,t){var n=V;try{return V=e,t()}finally{V=n}};jl=function(e,t,n){switch(t){case"input":if(wl(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var s=Yo(r);if(!s)throw Error(T(90));dp(r),wl(r,s)}}}break;case"textarea":fp(e,n);break;case"select":t=n.value,t!=null&&Tr(e,!!n.multiple,t,!1)}};xp=xc;bp=qn;var jw={usingClientEntryPoint:!1,Events:[oi,pr,Yo,vp,wp,xc]},ts={findFiberByHostInstance:In,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Tw={bundleType:ts.bundleType,version:ts.version,rendererPackageName:ts.rendererPackageName,rendererConfig:ts.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ft.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Sp(e),e===null?null:e.stateNode},findFiberByHostInstance:ts.findFiberByHostInstance||Sw,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ai=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ai.isDisabled&&Ai.supportsFiber)try{qo=Ai.inject(Tw),St=Ai}catch{}}Ge.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=jw;Ge.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Tc(t))throw Error(T(200));return _w(e,t,null,n)};Ge.createRoot=function(e,t){if(!Tc(e))throw Error(T(299));var n=!1,r="",s=ng;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=Sc(e,1,!1,null,null,n,!1,r,s),e[Ut]=t.current,Ds(e.nodeType===8?e.parentNode:e),new jc(t)};Ge.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(T(188)):(e=Object.keys(e).join(","),Error(T(268,e)));return e=Sp(t),e=e===null?null:e.stateNode,e};Ge.flushSync=function(e){return qn(e)};Ge.hydrate=function(e,t,n){if(!ia(t))throw Error(T(200));return oa(null,e,t,!0,n)};Ge.hydrateRoot=function(e,t,n){if(!Tc(e))throw Error(T(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",o=ng;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=tg(t,null,e,1,n??null,s,!1,i,o),e[Ut]=t.current,Ds(e),r)for(e=0;e<r.length;e++)n=r[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new sa(t)};Ge.render=function(e,t,n){if(!ia(t))throw Error(T(200));return oa(null,e,t,!1,n)};Ge.unmountComponentAtNode=function(e){if(!ia(e))throw Error(T(40));return e._reactRootContainer?(qn(function(){oa(null,null,e,!1,function(){e._reactRootContainer=null,e[Ut]=null})}),!0):!1};Ge.unstable_batchedUpdates=xc;Ge.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!ia(n))throw Error(T(200));if(e==null||e._reactInternals===void 0)throw Error(T(38));return oa(e,t,n,!1,r)};Ge.version="18.3.1-next-f1338f8080-20240426";function rg(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(rg)}catch(e){console.error(e)}}rg(),rp.exports=Ge;var Cw=rp.exports,lh=Cw;hl.createRoot=lh.createRoot,hl.hydrateRoot=lh.hydrateRoot;var Pw={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const Aw=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),B=(e,t)=>{const n=k.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:i=2,absoluteStrokeWidth:o,children:a,...l},u)=>k.createElement("svg",{ref:u,...Pw,width:s,height:s,stroke:r,strokeWidth:o?Number(i)*24/Number(s):i,className:`lucide lucide-${Aw(e)}`,...l},[...t.map(([c,h])=>k.createElement(c,h)),...(Array.isArray(a)?a:[a])||[]]));return n.displayName=`${e}`,n},Rw=B("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]),Nw=B("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]),Ow=B("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]),iu=B("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]),sg=B("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]),Lw=B("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]),Iw=B("CheckCircle2",[["path",{d:"M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z",key:"14v8dr"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]),gn=B("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["polyline",{points:"22 4 12 14.01 9 11.01",key:"6xbx8j"}]]),Cc=B("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),ig=B("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]),ou=B("GraduationCap",[["path",{d:"M22 10v6M2 10l10-5 10 5-10 5z",key:"1ef52a"}],["path",{d:"M6 12v5c3 3 9 3 12 0v-5",key:"1f75yj"}]]),qr=B("HelpCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),Ao=B("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]),Dw=B("Inbox",[["polyline",{points:"22 12 16 12 14 15 10 15 8 12 2 12",key:"o97t9d"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}]]),Mw=B("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]),$w=B("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]),aa=B("MessageCircle",[["path",{d:"m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z",key:"v2veuj"}]]),Kn=B("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]),Uw=B("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]),zw=B("PenLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",key:"ymcmye"}]]),Bw=B("Percent",[["line",{x1:"19",x2:"5",y1:"5",y2:"19",key:"1x9vlm"}],["circle",{cx:"6.5",cy:"6.5",r:"2.5",key:"4mh3h7"}],["circle",{cx:"17.5",cy:"17.5",r:"2.5",key:"1mdrzq"}]]),au=B("PlusCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]),Vw=B("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]),uh=B("Quote",[["path",{d:"M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z",key:"4rm80e"}],["path",{d:"M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",key:"10za9r"}]]),Fw=B("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]]),la=B("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]),og=B("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]),Hw=B("ShieldCheck",[["path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10",key:"1irkt0"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]),Pc=B("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]),Ws=B("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]),qs=B("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]),Ww=B("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]),ag=B("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function ua(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(e);s<r.length;s++)t.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(e,r[s])&&(n[r[s]]=e[r[s]]);return n}function qw(e,t,n,r){function s(i){return i instanceof n?i:new n(function(o){o(i)})}return new(n||(n=Promise))(function(i,o){function a(c){try{u(r.next(c))}catch(h){o(h)}}function l(c){try{u(r.throw(c))}catch(h){o(h)}}function u(c){c.done?i(c.value):s(c.value).then(a,l)}u((r=r.apply(e,t||[])).next())})}const Kw=e=>e?(...t)=>e(...t):(...t)=>fetch(...t);class Ac extends Error{constructor(t,n="FunctionsError",r){super(t),this.name=n,this.context=r}toJSON(){return{name:this.name,message:this.message,context:this.context}}}class Gw extends Ac{constructor(t){super("Failed to send a request to the Edge Function","FunctionsFetchError",t)}}class ch extends Ac{constructor(t){super("Relay Error invoking the Edge Function","FunctionsRelayError",t)}}class dh extends Ac{constructor(t){super("Edge Function returned a non-2xx status code","FunctionsHttpError",t)}}var lu;(function(e){e.Any="any",e.ApNortheast1="ap-northeast-1",e.ApNortheast2="ap-northeast-2",e.ApSouth1="ap-south-1",e.ApSoutheast1="ap-southeast-1",e.ApSoutheast2="ap-southeast-2",e.CaCentral1="ca-central-1",e.EuCentral1="eu-central-1",e.EuWest1="eu-west-1",e.EuWest2="eu-west-2",e.EuWest3="eu-west-3",e.SaEast1="sa-east-1",e.UsEast1="us-east-1",e.UsWest1="us-west-1",e.UsWest2="us-west-2"})(lu||(lu={}));class Jw{constructor(t,{headers:n={},customFetch:r,region:s=lu.Any}={}){this.url=t,this.headers=n,this.region=s,this.fetch=Kw(r)}setAuth(t){this.headers.Authorization=`Bearer ${t}`}invoke(t){return qw(this,arguments,void 0,function*(n,r={}){var s;let i,o;try{const{headers:a,method:l,body:u,signal:c,timeout:h}=r;let f={},{region:p}=r;p||(p=this.region);const y=new URL(`${this.url}/${n}`);p&&p!=="any"&&(f["x-region"]=p,y.searchParams.set("forceFunctionRegion",p));let w;u&&(a&&!Object.prototype.hasOwnProperty.call(a,"Content-Type")||!a)?typeof Blob<"u"&&u instanceof Blob||u instanceof ArrayBuffer?(f["Content-Type"]="application/octet-stream",w=u):typeof u=="string"?(f["Content-Type"]="text/plain",w=u):typeof FormData<"u"&&u instanceof FormData?w=u:(f["Content-Type"]="application/json",w=JSON.stringify(u)):u&&typeof u!="string"&&!(typeof Blob<"u"&&u instanceof Blob)&&!(u instanceof ArrayBuffer)&&!(typeof FormData<"u"&&u instanceof FormData)?w=JSON.stringify(u):w=u;let b=c;h&&(o=new AbortController,i=setTimeout(()=>o.abort(),h),c?(b=o.signal,c.addEventListener("abort",()=>o.abort())):b=o.signal);const v=yield this.fetch(y.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},f),this.headers),a),body:w,signal:b}).catch(_=>{throw new Gw(_)}),m=v.headers.get("x-relay-error");if(m&&m==="true")throw new ch(v);if(!v.ok)throw new dh(v);let g=((s=v.headers.get("Content-Type"))!==null&&s!==void 0?s:"text/plain").split(";")[0].trim(),x;return g==="application/json"?x=yield v.json():g==="application/octet-stream"||g==="application/pdf"?x=yield v.blob():g==="text/event-stream"?x=v:g==="multipart/form-data"?x=yield v.formData():x=yield v.text(),{data:x,error:null,response:v}}catch(a){return{data:null,error:a,response:a instanceof dh||a instanceof ch?a.context:void 0}}finally{i&&clearTimeout(i)}})}}const lg=3,hh=e=>Math.min(1e3*2**e,3e4),Yw=[520,503],ug=["GET","HEAD","OPTIONS"];var Qw=class extends Error{constructor(e){super(e.message),this.name="PostgrestError",this.details=e.details,this.hint=e.hint,this.code=e.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function fh(e,t){return new Promise(n=>{if(t!=null&&t.aborted){n();return}const r=setTimeout(()=>{t==null||t.removeEventListener("abort",s),n()},e);function s(){clearTimeout(r),n()}t==null||t.addEventListener("abort",s)})}function Xw(e,t,n,r){return!(!r||n>=lg||!ug.includes(e)||!Yw.includes(t))}var Zw=class{constructor(e){var t,n,r,s,i;this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=e.method,this.url=e.url,this.headers=new Headers(e.headers),this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=(t=e.shouldThrowOnError)!==null&&t!==void 0?t:!1,this.signal=e.signal,this.isMaybeSingle=(n=e.isMaybeSingle)!==null&&n!==void 0?n:!1,this.shouldStripNulls=(r=e.shouldStripNulls)!==null&&r!==void 0?r:!1,this.urlLengthLimit=(s=e.urlLengthLimit)!==null&&s!==void 0?s:8e3,this.retryEnabled=(i=e.retry)!==null&&i!==void 0?i:!0,e.fetch?this.fetch=e.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get("Accept")==="text/csv")throw new Error("stripNulls() cannot be used with csv()");return this.shouldStripNulls=!0,this}setHeader(e,t){return this.headers=new Headers(this.headers),this.headers.set(e,t),this}retry(e){return this.retryEnabled=e,this}then(e,t){var n=this;if(this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json"),this.shouldStripNulls){const o=this.headers.get("Accept");o==="application/vnd.pgrst.object+json"?this.headers.set("Accept","application/vnd.pgrst.object+json;nulls=stripped"):(!o||o==="application/json")&&this.headers.set("Accept","application/vnd.pgrst.array+json;nulls=stripped")}const r=this.fetch;let i=(async()=>{let o=0;for(;;){const u=new Headers(n.headers);o>0&&u.set("X-Retry-Count",String(o));let c;try{c=await r(n.url.toString(),{method:n.method,headers:u,body:JSON.stringify(n.body,(h,f)=>typeof f=="bigint"?f.toString():f),signal:n.signal})}catch(h){if((h==null?void 0:h.name)==="AbortError"||(h==null?void 0:h.code)==="ABORT_ERR"||!ug.includes(n.method))throw h;if(n.retryEnabled&&o<lg){const f=hh(o);o++,await fh(f,n.signal);continue}throw h}if(Xw(n.method,c.status,o,n.retryEnabled)){var a,l;const h=(a=(l=c.headers)===null||l===void 0?void 0:l.get("Retry-After"))!==null&&a!==void 0?a:null,f=h!==null?Math.max(0,parseInt(h,10)||0)*1e3:hh(o);await c.text(),o++,await fh(f,n.signal);continue}return await n.processResponse(c)}})();return this.shouldThrowOnError||(i=i.catch(o=>{var a;let l="",u="",c="";const h=o==null?void 0:o.cause;if(h){var f,p,y,w;const m=(f=h==null?void 0:h.message)!==null&&f!==void 0?f:"",g=(p=h==null?void 0:h.code)!==null&&p!==void 0?p:"";l=`${(y=o==null?void 0:o.name)!==null&&y!==void 0?y:"FetchError"}: ${o==null?void 0:o.message}`,l+=`

Caused by: ${(w=h==null?void 0:h.name)!==null&&w!==void 0?w:"Error"}: ${m}`,g&&(l+=` (${g})`),h!=null&&h.stack&&(l+=`
${h.stack}`)}else{var b;l=(b=o==null?void 0:o.stack)!==null&&b!==void 0?b:""}const v=this.url.toString().length;return(o==null?void 0:o.name)==="AbortError"||(o==null?void 0:o.code)==="ABORT_ERR"?(c="",u="Request was aborted (timeout or manual cancellation)",v>this.urlLengthLimit&&(u+=`. Note: Your request URL is ${v} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((h==null?void 0:h.name)==="HeadersOverflowError"||(h==null?void 0:h.code)==="UND_ERR_HEADERS_OVERFLOW")&&(c="",u="HTTP headers exceeded server limits (typically 16KB)",v>this.urlLengthLimit&&(u+=`. Your request URL is ${v} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${(a=o==null?void 0:o.name)!==null&&a!==void 0?a:"FetchError"}: ${o==null?void 0:o.message}`,details:l,hint:u,code:c},data:null,count:null,status:0,statusText:""}})),i.then(e,t)}async processResponse(e){var t=this;let n=null,r=null,s=null,i=e.status,o=e.statusText;if(e.ok){var a,l;if(t.method!=="HEAD"){var u;const f=await e.text();f===""||(t.headers.get("Accept")==="text/csv"||t.headers.get("Accept")&&(!((u=t.headers.get("Accept"))===null||u===void 0)&&u.includes("application/vnd.pgrst.plan+text"))?r=f:r=JSON.parse(f))}const c=(a=t.headers.get("Prefer"))===null||a===void 0?void 0:a.match(/count=(exact|planned|estimated)/),h=(l=e.headers.get("content-range"))===null||l===void 0?void 0:l.split("/");c&&h&&h.length>1&&(s=parseInt(h[1])),t.isMaybeSingle&&Array.isArray(r)&&(r.length>1?(n={code:"PGRST116",details:`Results contain ${r.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},r=null,s=null,i=406,o="Not Acceptable"):r.length===1?r=r[0]:r=null)}else{const c=await e.text();try{n=JSON.parse(c),Array.isArray(n)&&e.status===404&&(r=[],n=null,i=200,o="OK")}catch{e.status===404&&c===""?(i=204,o="No Content"):n={message:c}}if(n&&t.shouldThrowOnError)throw new Qw(n)}return{success:n===null,error:n,data:r,count:s,status:i,statusText:o}}returns(){return this}overrideTypes(){return this}},ex=class extends Zw{select(e){let t=!1;const n=(e??"*").split("").map(r=>/\s/.test(r)&&!t?"":(r==='"'&&(t=!t),r)).join("");return this.url.searchParams.set("select",n),this.headers.append("Prefer","return=representation"),this}order(e,{ascending:t=!0,nullsFirst:n,foreignTable:r,referencedTable:s=r}={}){const i=s?`${s}.order`:"order",o=this.url.searchParams.get(i);return this.url.searchParams.set(i,`${o?`${o},`:""}${e}.${t?"asc":"desc"}${n===void 0?"":n?".nullsfirst":".nullslast"}`),this}limit(e,{foreignTable:t,referencedTable:n=t}={}){const r=typeof n>"u"?"limit":`${n}.limit`;return this.url.searchParams.set(r,`${e}`),this}range(e,t,{foreignTable:n,referencedTable:r=n}={}){const s=typeof r>"u"?"offset":`${r}.offset`,i=typeof r>"u"?"limit":`${r}.limit`;return this.url.searchParams.set(s,`${e}`),this.url.searchParams.set(i,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:e=!1,verbose:t=!1,settings:n=!1,buffers:r=!1,wal:s=!1,format:i="text"}={}){var o;const a=[e?"analyze":null,t?"verbose":null,n?"settings":null,r?"buffers":null,s?"wal":null].filter(Boolean).join("|"),l=(o=this.headers.get("Accept"))!==null&&o!==void 0?o:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${i}; for="${l}"; options=${a};`),i==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(e){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${e}`),this}};const ph=new RegExp("[,()]");var ir=class extends ex{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(",")}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(",")}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(",")}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(",")}}`),this}regexMatch(e,t){return this.url.searchParams.append(e,`match.${t}`),this}regexIMatch(e,t){return this.url.searchParams.append(e,`imatch.${t}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}isDistinct(e,t){return this.url.searchParams.append(e,`isdistinct.${t}`),this}in(e,t){const n=Array.from(new Set(t)).map(r=>typeof r=="string"&&ph.test(r)?`"${r}"`:`${r}`).join(",");return this.url.searchParams.append(e,`in.(${n})`),this}notIn(e,t){const n=Array.from(new Set(t)).map(r=>typeof r=="string"&&ph.test(r)?`"${r}"`:`${r}`).join(",");return this.url.searchParams.append(e,`not.in.(${n})`),this}contains(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(",")}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(",")}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t=="string"?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(",")}}`),this}textSearch(e,t,{config:n,type:r}={}){let s="";r==="plain"?s="pl":r==="phrase"?s="ph":r==="websearch"&&(s="w");const i=n===void 0?"":`(${n})`;return this.url.searchParams.append(e,`${s}fts${i}.${t}`),this}match(e){return Object.entries(e).filter(([t,n])=>n!==void 0).forEach(([t,n])=>{this.url.searchParams.append(t,`eq.${n}`)}),this}not(e,t,n){return this.url.searchParams.append(e,`not.${t}.${n}`),this}or(e,{foreignTable:t,referencedTable:n=t}={}){const r=n?`${n}.or`:"or";return this.url.searchParams.append(r,`(${e})`),this}filter(e,t,n){return this.url.searchParams.append(e,`${t}.${n}`),this}},tx=class{constructor(e,{headers:t={},schema:n,fetch:r,urlLengthLimit:s=8e3,retry:i}){this.url=e,this.headers=new Headers(t),this.schema=n,this.fetch=r,this.urlLengthLimit=s,this.retry=i}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(e,t){const{head:n=!1,count:r}=t??{},s=n?"HEAD":"GET";let i=!1;const o=(e??"*").split("").map(u=>/\s/.test(u)&&!i?"":(u==='"'&&(i=!i),u)).join(""),{url:a,headers:l}=this.cloneRequestState();return a.searchParams.set("select",o),r&&l.append("Prefer",`count=${r}`),new ir({method:s,url:a,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(e,{count:t,defaultToNull:n=!0}={}){var r;const s="POST",{url:i,headers:o}=this.cloneRequestState();if(t&&o.append("Prefer",`count=${t}`),n||o.append("Prefer","missing=default"),Array.isArray(e)){const a=e.reduce((l,u)=>l.concat(Object.keys(u)),[]);if(a.length>0){const l=[...new Set(a)].map(u=>`"${u}"`);i.searchParams.set("columns",l.join(","))}}return new ir({method:s,url:i,headers:o,schema:this.schema,body:e,fetch:(r=this.fetch)!==null&&r!==void 0?r:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(e,{onConflict:t,ignoreDuplicates:n=!1,count:r,defaultToNull:s=!0}={}){var i;const o="POST",{url:a,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${n?"ignore":"merge"}-duplicates`),t!==void 0&&a.searchParams.set("on_conflict",t),r&&l.append("Prefer",`count=${r}`),s||l.append("Prefer","missing=default"),Array.isArray(e)){const u=e.reduce((c,h)=>c.concat(Object.keys(h)),[]);if(u.length>0){const c=[...new Set(u)].map(h=>`"${h}"`);a.searchParams.set("columns",c.join(","))}}return new ir({method:o,url:a,headers:l,schema:this.schema,body:e,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(e,{count:t}={}){var n;const r="PATCH",{url:s,headers:i}=this.cloneRequestState();return t&&i.append("Prefer",`count=${t}`),new ir({method:r,url:s,headers:i,schema:this.schema,body:e,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:e}={}){var t;const n="DELETE",{url:r,headers:s}=this.cloneRequestState();return e&&s.append("Prefer",`count=${e}`),new ir({method:n,url:r,headers:s,schema:this.schema,fetch:(t=this.fetch)!==null&&t!==void 0?t:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};function Ks(e){"@babel/helpers - typeof";return Ks=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ks(e)}function nx(e,t){if(Ks(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||"default");if(Ks(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function rx(e){var t=nx(e,"string");return Ks(t)=="symbol"?t:t+""}function sx(e,t,n){return(t=rx(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function mh(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),n.push.apply(n,r)}return n}function Ri(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?mh(Object(n),!0).forEach(function(r){sx(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):mh(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}var ix=class cg{constructor(t,{headers:n={},schema:r,fetch:s,timeout:i,urlLengthLimit:o=8e3,retry:a}={}){this.url=t,this.headers=new Headers(n),this.schemaName=r,this.urlLengthLimit=o;const l=s??globalThis.fetch;i!==void 0&&i>0?this.fetch=(u,c)=>{const h=new AbortController,f=setTimeout(()=>h.abort(),i),p=c==null?void 0:c.signal;if(p){if(p.aborted)return clearTimeout(f),l(u,c);const y=()=>{clearTimeout(f),h.abort()};return p.addEventListener("abort",y,{once:!0}),l(u,Ri(Ri({},c),{},{signal:h.signal})).finally(()=>{clearTimeout(f),p.removeEventListener("abort",y)})}return l(u,Ri(Ri({},c),{},{signal:h.signal})).finally(()=>clearTimeout(f))}:this.fetch=l,this.retry=a}from(t){if(!t||typeof t!="string"||t.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new tx(new URL(`${this.url}/${t}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(t){return new cg(this.url,{headers:this.headers,schema:t,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(t,n={},{head:r=!1,get:s=!1,count:i}={}){var o;let a;const l=new URL(`${this.url}/rpc/${t}`);let u;const c=p=>p!==null&&typeof p=="object"&&(!Array.isArray(p)||p.some(c)),h=r&&Object.values(n).some(c);h?(a="POST",u=n):r||s?(a=r?"HEAD":"GET",Object.entries(n).filter(([p,y])=>y!==void 0).map(([p,y])=>[p,Array.isArray(y)?`{${y.join(",")}}`:`${y}`]).forEach(([p,y])=>{l.searchParams.append(p,y)})):(a="POST",u=n);const f=new Headers(this.headers);return h?f.set("Prefer",i?`count=${i},return=minimal`:"return=minimal"):i&&f.set("Prefer",`count=${i}`),new ir({method:a,url:l,headers:f,schema:this.schemaName,body:u,fetch:(o=this.fetch)!==null&&o!==void 0?o:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};class ox{constructor(){}static detectEnvironment(){var t;if(typeof WebSocket<"u")return{type:"native",wsConstructor:WebSocket};const n=globalThis;if(typeof globalThis<"u"&&typeof n.WebSocket<"u")return{type:"native",wsConstructor:n.WebSocket};const r=typeof global<"u"?global:void 0;if(r&&typeof r.WebSocket<"u")return{type:"native",wsConstructor:r.WebSocket};if(typeof globalThis<"u"&&typeof n.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&n.EdgeRuntime||typeof navigator<"u"&&(!((t=navigator.userAgent)===null||t===void 0)&&t.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const s=globalThis.process;if(s){const i=s.versions;if(i&&i.node){const o=i.node,a=parseInt(o.replace(/^v/,"").split(".")[0]);return a>=22?typeof globalThis.WebSocket<"u"?{type:"native",wsConstructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${a} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${a} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const t=this.detectEnvironment();if(t.wsConstructor)return t.wsConstructor;let n=t.error||"WebSocket not supported in this environment.";throw t.workaround&&(n+=`

Suggested solution: ${t.workaround}`),new Error(n)}static isWebSocketSupported(){try{const t=this.detectEnvironment();return t.type==="native"||t.type==="ws"}catch{return!1}}}const ax="2.105.4",lx=`realtime-js/${ax}`,ux="1.0.0",dg="2.0.0",cx=dg,dx=1e4,hx=100,Zt={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},hg={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave",access_token:"access_token"},uu={connecting:"connecting",open:"open",closing:"closing",closed:"closed"};class fx{constructor(t){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=t??[]}encode(t,n){if(t.event===this.BROADCAST_EVENT&&!(t.payload instanceof ArrayBuffer)&&typeof t.payload.event=="string")return n(this._binaryEncodeUserBroadcastPush(t));let r=[t.join_ref,t.ref,t.topic,t.event,t.payload];return n(JSON.stringify(r))}_binaryEncodeUserBroadcastPush(t){var n;return this._isArrayBuffer((n=t.payload)===null||n===void 0?void 0:n.payload)?this._encodeBinaryUserBroadcastPush(t):this._encodeJsonUserBroadcastPush(t)}_encodeBinaryUserBroadcastPush(t){var n,r;const s=(r=(n=t.payload)===null||n===void 0?void 0:n.payload)!==null&&r!==void 0?r:new ArrayBuffer(0);return this._encodeUserBroadcastPush(t,this.BINARY_ENCODING,s)}_encodeJsonUserBroadcastPush(t){var n,r;const s=(r=(n=t.payload)===null||n===void 0?void 0:n.payload)!==null&&r!==void 0?r:{},o=new TextEncoder().encode(JSON.stringify(s)).buffer;return this._encodeUserBroadcastPush(t,this.JSON_ENCODING,o)}_encodeUserBroadcastPush(t,n,r){var s,i;const o=t.topic,a=(s=t.ref)!==null&&s!==void 0?s:"",l=(i=t.join_ref)!==null&&i!==void 0?i:"",u=t.payload.event,c=this.allowedMetadataKeys?this._pick(t.payload,this.allowedMetadataKeys):{},h=Object.keys(c).length===0?"":JSON.stringify(c);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(a.length>255)throw new Error(`ref length ${a.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`topic length ${o.length} exceeds maximum of 255`);if(u.length>255)throw new Error(`userEvent length ${u.length} exceeds maximum of 255`);if(h.length>255)throw new Error(`metadata length ${h.length} exceeds maximum of 255`);const f=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+a.length+o.length+u.length+h.length,p=new ArrayBuffer(this.HEADER_LENGTH+f);let y=new DataView(p),w=0;y.setUint8(w++,this.KINDS.userBroadcastPush),y.setUint8(w++,l.length),y.setUint8(w++,a.length),y.setUint8(w++,o.length),y.setUint8(w++,u.length),y.setUint8(w++,h.length),y.setUint8(w++,n),Array.from(l,v=>y.setUint8(w++,v.charCodeAt(0))),Array.from(a,v=>y.setUint8(w++,v.charCodeAt(0))),Array.from(o,v=>y.setUint8(w++,v.charCodeAt(0))),Array.from(u,v=>y.setUint8(w++,v.charCodeAt(0))),Array.from(h,v=>y.setUint8(w++,v.charCodeAt(0)));var b=new Uint8Array(p.byteLength+r.byteLength);return b.set(new Uint8Array(p),0),b.set(new Uint8Array(r),p.byteLength),b.buffer}decode(t,n){if(this._isArrayBuffer(t)){let r=this._binaryDecode(t);return n(r)}if(typeof t=="string"){const r=JSON.parse(t),[s,i,o,a,l]=r;return n({join_ref:s,ref:i,topic:o,event:a,payload:l})}return n({})}_binaryDecode(t){const n=new DataView(t),r=n.getUint8(0),s=new TextDecoder;switch(r){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(t,n,s)}}_decodeUserBroadcast(t,n,r){const s=n.getUint8(1),i=n.getUint8(2),o=n.getUint8(3),a=n.getUint8(4);let l=this.HEADER_LENGTH+4;const u=r.decode(t.slice(l,l+s));l=l+s;const c=r.decode(t.slice(l,l+i));l=l+i;const h=r.decode(t.slice(l,l+o));l=l+o;const f=t.slice(l,t.byteLength),p=a===this.JSON_ENCODING?JSON.parse(r.decode(f)):f,y={type:this.BROADCAST_EVENT,event:c,payload:p};return o>0&&(y.meta=JSON.parse(h)),{join_ref:null,ref:null,topic:u,event:this.BROADCAST_EVENT,payload:y}}_isArrayBuffer(t){var n;return t instanceof ArrayBuffer||((n=t==null?void 0:t.constructor)===null||n===void 0?void 0:n.name)==="ArrayBuffer"}_pick(t,n){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).filter(([r])=>n.includes(r)))}}var H;(function(e){e.abstime="abstime",e.bool="bool",e.date="date",e.daterange="daterange",e.float4="float4",e.float8="float8",e.int2="int2",e.int4="int4",e.int4range="int4range",e.int8="int8",e.int8range="int8range",e.json="json",e.jsonb="jsonb",e.money="money",e.numeric="numeric",e.oid="oid",e.reltime="reltime",e.text="text",e.time="time",e.timestamp="timestamp",e.timestamptz="timestamptz",e.timetz="timetz",e.tsrange="tsrange",e.tstzrange="tstzrange"})(H||(H={}));const gh=(e,t,n={})=>{var r;const s=(r=n.skipTypes)!==null&&r!==void 0?r:[];return t?Object.keys(t).reduce((i,o)=>(i[o]=px(o,e,t,s),i),{}):{}},px=(e,t,n,r)=>{const s=t.find(a=>a.name===e),i=s==null?void 0:s.type,o=n[e];return i&&!r.includes(i)?fg(i,o):cu(o)},fg=(e,t)=>{if(e.charAt(0)==="_"){const n=e.slice(1,e.length);return vx(t,n)}switch(e){case H.bool:return mx(t);case H.float4:case H.float8:case H.int2:case H.int4:case H.int8:case H.numeric:case H.oid:return gx(t);case H.json:case H.jsonb:return yx(t);case H.timestamp:return wx(t);case H.abstime:case H.date:case H.daterange:case H.int4range:case H.int8range:case H.money:case H.reltime:case H.text:case H.time:case H.timestamptz:case H.timetz:case H.tsrange:case H.tstzrange:return cu(t);default:return cu(t)}},cu=e=>e,mx=e=>{switch(e){case"t":return!0;case"f":return!1;default:return e}},gx=e=>{if(typeof e=="string"){const t=parseFloat(e);if(!Number.isNaN(t))return t}return e},yx=e=>{if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e},vx=(e,t)=>{if(typeof e!="string")return e;const n=e.length-1,r=e[n];if(e[0]==="{"&&r==="}"){let i;const o=e.slice(1,n);try{i=JSON.parse("["+o+"]")}catch{i=o?o.split(","):[]}return i.map(a=>fg(t,a))}return e},wx=e=>typeof e=="string"?e.replace(" ","T"):e,pg=e=>{const t=new URL(e);return t.protocol=t.protocol.replace(/^ws/i,"http"),t.pathname=t.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),t.pathname===""||t.pathname==="/"?t.pathname="/api/broadcast":t.pathname=t.pathname+"/api/broadcast",t.href};var bs=e=>typeof e=="function"?e:function(){return e},xx=typeof self<"u"?self:null,or=typeof window<"u"?window:null,bt=xx||or||globalThis,bx="2.0.0",kx=1e4,_x=1e3,kt={connecting:0,open:1,closing:2,closed:3},Le={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},Pt={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},du={longpoll:"longpoll",websocket:"websocket"},Sx={complete:4},hu="base64url.bearer.phx.",Ni=class{constructor(e,t,n,r){this.channel=e,this.event=t,this.payload=n||function(){return{}},this.receivedResp=null,this.timeout=r,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(e){this.timeout=e,this.reset(),this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(e,t){return this.hasReceived(e)&&t(this.receivedResp.response),this.recHooks.push({status:e,callback:t}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:e,response:t,_ref:n}){this.recHooks.filter(r=>r.status===e).forEach(r=>r.callback(t))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,e=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=e,this.matchReceive(e)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}trigger(e,t){this.channel.trigger(this.refEvent,{status:e,response:t})}},mg=class{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}},Ex=class{constructor(e,t,n){this.state=Le.closed,this.topic=e,this.params=bs(t||{}),this.socket=n,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new Ni(this,Pt.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new mg(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive("ok",()=>{this.state=Le.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(r=>r.send()),this.pushBuffer=[]}),this.joinPush.receive("error",r=>{this.state=Le.errored,this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,r),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log("channel",`close ${this.topic}`),this.state=Le.closed,this.socket.remove(this)}),this.onError(r=>{this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,r),this.isJoining()&&this.joinPush.reset(),this.state=Le.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive("timeout",()=>{this.socket.hasLogger()&&this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),new Ni(this,Pt.leave,bs({}),this.timeout).send(),this.state=Le.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(Pt.reply,(r,s)=>{this.trigger(this.replyEventName(s),r)})}join(e=this.timeout){if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=e,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=Le.closed,this.bindings=[]}onClose(e){this.on(Pt.close,e)}onError(e){return this.on(Pt.error,t=>e(t))}on(e,t){let n=this.bindingRef++;return this.bindings.push({event:e,ref:n,callback:t}),n}off(e,t){this.bindings=this.bindings.filter(n=>!(n.event===e&&(typeof t>"u"||t===n.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(e,t,n=this.timeout){if(t=t||{},!this.joinedOnce)throw new Error(`tried to push '${e}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let r=new Ni(this,e,function(){return t},n);return this.canPush()?r.send():(r.startTimeout(),this.pushBuffer.push(r)),r}leave(e=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=Le.leaving;let t=()=>{this.socket.hasLogger()&&this.socket.log("channel",`leave ${this.topic}`),this.trigger(Pt.close,"leave")},n=new Ni(this,Pt.leave,bs({}),e);return n.receive("ok",()=>t()).receive("timeout",()=>t()),n.send(),this.canPush()||n.trigger("ok",{}),n}onMessage(e,t,n){return t}filterBindings(e,t,n){return!0}isMember(e,t,n,r){return this.topic!==e?!1:r&&r!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:e,event:t,payload:n,joinRef:r}),!1):!0}joinRef(){return this.joinPush.ref}rejoin(e=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=Le.joining,this.joinPush.resend(e))}trigger(e,t,n,r){let s=this.onMessage(e,t,n,r);if(t&&!s)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");let i=this.bindings.filter(o=>o.event===e&&this.filterBindings(o,t,n));for(let o=0;o<i.length;o++)i[o].callback(s,n,r||this.joinRef())}replyEventName(e){return`chan_reply_${e}`}isClosed(){return this.state===Le.closed}isErrored(){return this.state===Le.errored}isJoined(){return this.state===Le.joined}isJoining(){return this.state===Le.joining}isLeaving(){return this.state===Le.leaving}},Ro=class{static request(e,t,n,r,s,i,o){if(bt.XDomainRequest){let a=new bt.XDomainRequest;return this.xdomainRequest(a,e,t,r,s,i,o)}else if(bt.XMLHttpRequest){let a=new bt.XMLHttpRequest;return this.xhrRequest(a,e,t,n,r,s,i,o)}else{if(bt.fetch&&bt.AbortController)return this.fetchRequest(e,t,n,r,s,i,o);throw new Error("No suitable XMLHttpRequest implementation found")}}static fetchRequest(e,t,n,r,s,i,o){let a={method:e,headers:n,body:r},l=null;return s&&(l=new AbortController,setTimeout(()=>l.abort(),s),a.signal=l.signal),bt.fetch(t,a).then(u=>u.text()).then(u=>this.parseJSON(u)).then(u=>o&&o(u)).catch(u=>{u.name==="AbortError"&&i?i():o&&o(null)}),l}static xdomainRequest(e,t,n,r,s,i,o){return e.timeout=s,e.open(t,n),e.onload=()=>{let a=this.parseJSON(e.responseText);o&&o(a)},i&&(e.ontimeout=i),e.onprogress=()=>{},e.send(r),e}static xhrRequest(e,t,n,r,s,i,o,a){e.open(t,n,!0),e.timeout=i;for(let[l,u]of Object.entries(r))e.setRequestHeader(l,u);return e.onerror=()=>a&&a(null),e.onreadystatechange=()=>{if(e.readyState===Sx.complete&&a){let l=this.parseJSON(e.responseText);a(l)}},o&&(e.ontimeout=o),e.send(s),e}static parseJSON(e){if(!e||e==="")return null;try{return JSON.parse(e)}catch{return console&&console.log("failed to parse JSON response",e),null}}static serialize(e,t){let n=[];for(var r in e){if(!Object.prototype.hasOwnProperty.call(e,r))continue;let s=t?`${t}[${r}]`:r,i=e[r];typeof i=="object"?n.push(this.serialize(i,s)):n.push(encodeURIComponent(s)+"="+encodeURIComponent(i))}return n.join("&")}static appendParams(e,t){if(Object.keys(t).length===0)return e;let n=e.match(/\?/)?"&":"?";return`${e}${n}${this.serialize(t)}`}},jx=e=>{let t="",n=new Uint8Array(e),r=n.byteLength;for(let s=0;s<r;s++)t+=String.fromCharCode(n[s]);return btoa(t)},er=class{constructor(e,t){t&&t.length===2&&t[1].startsWith(hu)&&(this.authToken=atob(t[1].slice(hu.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(e),this.readyState=kt.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(e){return e.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+du.websocket),"$1/"+du.longpoll)}endpointURL(){return Ro.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(e,t,n){this.close(e,t,n),this.readyState=kt.connecting}ontimeout(){this.onerror("timeout"),this.closeAndRetry(1005,"timeout",!1)}isActive(){return this.readyState===kt.open||this.readyState===kt.connecting}poll(){const e={Accept:"application/json"};this.authToken&&(e["X-Phoenix-AuthToken"]=this.authToken),this.ajax("GET",e,null,()=>this.ontimeout(),t=>{if(t){var{status:n,token:r,messages:s}=t;if(n===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,"session_gone",!1);return}this.token=r}else n=0;switch(n){case 200:s.forEach(i=>{setTimeout(()=>this.onmessage({data:i}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=kt.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,"forbidden",!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,"internal server error",500);break;default:throw new Error(`unhandled poll status ${n}`)}})}send(e){typeof e!="string"&&(e=jx(e)),this.currentBatch?this.currentBatch.push(e):this.awaitingBatchAck?this.batchBuffer.push(e):(this.currentBatch=[e],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(e){this.awaitingBatchAck=!0,this.ajax("POST",{"Content-Type":"application/x-ndjson"},e.join(`
`),()=>this.onerror("timeout"),t=>{this.awaitingBatchAck=!1,!t||t.status!==200?(this.onerror(t&&t.status),this.closeAndRetry(1011,"internal server error",!1)):this.batchBuffer.length>0&&(this.batchSend(this.batchBuffer),this.batchBuffer=[])})}close(e,t,n){for(let s of this.reqs)s.abort();this.readyState=kt.closed;let r=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:e,reason:t,wasClean:n});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<"u"?this.onclose(new CloseEvent("close",r)):this.onclose(r)}ajax(e,t,n,r,s){let i,o=()=>{this.reqs.delete(i),r()};i=Ro.request(e,this.endpointURL(),t,n,this.timeout,o,a=>{this.reqs.delete(i),this.isActive()&&s(a)}),this.reqs.add(i)}},Tx=class us{constructor(t,n={}){let r=n.events||{state:"presence_state",diff:"presence_diff"};this.state={},this.pendingDiffs=[],this.channel=t,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(r.state,s=>{let{onJoin:i,onLeave:o,onSync:a}=this.caller;this.joinRef=this.channel.joinRef(),this.state=us.syncState(this.state,s,i,o),this.pendingDiffs.forEach(l=>{this.state=us.syncDiff(this.state,l,i,o)}),this.pendingDiffs=[],a()}),this.channel.on(r.diff,s=>{let{onJoin:i,onLeave:o,onSync:a}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(s):(this.state=us.syncDiff(this.state,s,i,o),a())})}onJoin(t){this.caller.onJoin=t}onLeave(t){this.caller.onLeave=t}onSync(t){this.caller.onSync=t}list(t){return us.list(this.state,t)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(t,n,r,s){let i=this.clone(t),o={},a={};return this.map(i,(l,u)=>{n[l]||(a[l]=u)}),this.map(n,(l,u)=>{let c=i[l];if(c){let h=u.metas.map(w=>w.phx_ref),f=c.metas.map(w=>w.phx_ref),p=u.metas.filter(w=>f.indexOf(w.phx_ref)<0),y=c.metas.filter(w=>h.indexOf(w.phx_ref)<0);p.length>0&&(o[l]=u,o[l].metas=p),y.length>0&&(a[l]=this.clone(c),a[l].metas=y)}else o[l]=u}),this.syncDiff(i,{joins:o,leaves:a},r,s)}static syncDiff(t,n,r,s){let{joins:i,leaves:o}=this.clone(n);return r||(r=function(){}),s||(s=function(){}),this.map(i,(a,l)=>{let u=t[a];if(t[a]=this.clone(l),u){let c=t[a].metas.map(f=>f.phx_ref),h=u.metas.filter(f=>c.indexOf(f.phx_ref)<0);t[a].metas.unshift(...h)}r(a,u,l)}),this.map(o,(a,l)=>{let u=t[a];if(!u)return;let c=l.metas.map(h=>h.phx_ref);u.metas=u.metas.filter(h=>c.indexOf(h.phx_ref)<0),s(a,u,l),u.metas.length===0&&delete t[a]}),t}static list(t,n){return n||(n=function(r,s){return s}),this.map(t,(r,s)=>n(r,s))}static map(t,n){return Object.getOwnPropertyNames(t).map(r=>n(r,t[r]))}static clone(t){return JSON.parse(JSON.stringify(t))}},Oi={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(e,t){if(e.payload.constructor===ArrayBuffer)return t(this.binaryEncode(e));{let n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(n))}},decode(e,t){if(e.constructor===ArrayBuffer)return t(this.binaryDecode(e));{let[n,r,s,i,o]=JSON.parse(e);return t({join_ref:n,ref:r,topic:s,event:i,payload:o})}},binaryEncode(e){let{join_ref:t,ref:n,event:r,topic:s,payload:i}=e,o=this.META_LENGTH+t.length+n.length+s.length+r.length,a=new ArrayBuffer(this.HEADER_LENGTH+o),l=new DataView(a),u=0;l.setUint8(u++,this.KINDS.push),l.setUint8(u++,t.length),l.setUint8(u++,n.length),l.setUint8(u++,s.length),l.setUint8(u++,r.length),Array.from(t,h=>l.setUint8(u++,h.charCodeAt(0))),Array.from(n,h=>l.setUint8(u++,h.charCodeAt(0))),Array.from(s,h=>l.setUint8(u++,h.charCodeAt(0))),Array.from(r,h=>l.setUint8(u++,h.charCodeAt(0)));var c=new Uint8Array(a.byteLength+i.byteLength);return c.set(new Uint8Array(a),0),c.set(new Uint8Array(i),a.byteLength),c.buffer},binaryDecode(e){let t=new DataView(e),n=t.getUint8(0),r=new TextDecoder;switch(n){case this.KINDS.push:return this.decodePush(e,t,r);case this.KINDS.reply:return this.decodeReply(e,t,r);case this.KINDS.broadcast:return this.decodeBroadcast(e,t,r)}},decodePush(e,t,n){let r=t.getUint8(1),s=t.getUint8(2),i=t.getUint8(3),o=this.HEADER_LENGTH+this.META_LENGTH-1,a=n.decode(e.slice(o,o+r));o=o+r;let l=n.decode(e.slice(o,o+s));o=o+s;let u=n.decode(e.slice(o,o+i));o=o+i;let c=e.slice(o,e.byteLength);return{join_ref:a,ref:null,topic:l,event:u,payload:c}},decodeReply(e,t,n){let r=t.getUint8(1),s=t.getUint8(2),i=t.getUint8(3),o=t.getUint8(4),a=this.HEADER_LENGTH+this.META_LENGTH,l=n.decode(e.slice(a,a+r));a=a+r;let u=n.decode(e.slice(a,a+s));a=a+s;let c=n.decode(e.slice(a,a+i));a=a+i;let h=n.decode(e.slice(a,a+o));a=a+o;let f=e.slice(a,e.byteLength),p={status:h,response:f};return{join_ref:l,ref:u,topic:c,event:Pt.reply,payload:p}},decodeBroadcast(e,t,n){let r=t.getUint8(1),s=t.getUint8(2),i=this.HEADER_LENGTH+2,o=n.decode(e.slice(i,i+r));i=i+r;let a=n.decode(e.slice(i,i+s));i=i+s;let l=e.slice(i,e.byteLength);return{join_ref:null,ref:null,topic:o,event:a,payload:l}}},Cx=class{constructor(e,t={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=t.timeout||kx,this.transport=t.transport||bt.WebSocket||er,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=t.longPollFallbackMs,this.fallbackTimer=null;let n=null;try{n=bt&&bt.sessionStorage}catch{}this.sessionStore=t.sessionStorage||n,this.establishedConnections=0,this.defaultEncoder=Oi.encode.bind(Oi),this.defaultDecoder=Oi.decode.bind(Oi),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=t.binaryType||"arraybuffer",this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport!==er?(this.encode=t.encode||this.defaultEncoder,this.decode=t.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder);let r=null;or&&or.addEventListener&&(or.addEventListener("pagehide",s=>{this.conn&&(this.disconnect(),r=this.connectClock)}),or.addEventListener("pageshow",s=>{r===this.connectClock&&(r=null,this.connect())}),or.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=t.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=t.autoSendHeartbeat??!0,this.heartbeatCallback=t.heartbeatCallback??(()=>{}),this.rejoinAfterMs=s=>t.rejoinAfterMs?t.rejoinAfterMs(s):[1e3,2e3,5e3][s-1]||1e4,this.reconnectAfterMs=s=>t.reconnectAfterMs?t.reconnectAfterMs(s):[10,50,100,150,200,250,500,1e3,2e3][s-1]||5e3,this.logger=t.logger||null,!this.logger&&t.debug&&(this.logger=(s,i,o)=>{console.log(`${s}: ${i}`,o)}),this.longpollerTimeout=t.longpollerTimeout||2e4,this.params=bs(t.params||{}),this.endPoint=`${e}/${du.websocket}`,this.vsn=t.vsn||bx,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new mg(()=>{if(this.pageHidden){this.log("Not reconnecting as page is hidden!"),this.teardown();return}this.teardown(async()=>{t.beforeReconnect&&await t.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=t.authToken}getLongPollTransport(){return er}replaceTransport(e){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&(this.conn.close(),this.conn=null),this.transport=e}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let e=Ro.appendParams(Ro.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return e.charAt(0)!=="/"?e:e.charAt(1)==="/"?`${this.protocol()}:${e}`:`${this.protocol()}://${location.host}${e}`}disconnect(e,t,n){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,e&&e()},t,n)}connect(e){e&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=bs(e)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==er?this.connectWithFallback(er,this.longPollFallbackMs):this.transportConnect())}log(e,t,n){this.logger&&this.logger(e,t,n)}hasLogger(){return this.logger!==null}onOpen(e){let t=this.makeRef();return this.stateChangeCallbacks.open.push([t,e]),t}onClose(e){let t=this.makeRef();return this.stateChangeCallbacks.close.push([t,e]),t}onError(e){let t=this.makeRef();return this.stateChangeCallbacks.error.push([t,e]),t}onMessage(e){let t=this.makeRef();return this.stateChangeCallbacks.message.push([t,e]),t}onHeartbeat(e){this.heartbeatCallback=e}ping(e){if(!this.isConnected())return!1;let t=this.makeRef(),n=Date.now();this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:t});let r=this.onMessage(s=>{s.ref===t&&(this.off([r]),e(Date.now()-n))});return!0}transportName(e){switch(e){case er:return"LongPoll";default:return e.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let e;this.authToken&&(e=["phoenix",`${hu}${btoa(this.authToken).replace(/=/g,"")}`]),this.conn=new this.transport(this.endPointURL(),e),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=t=>this.onConnError(t),this.conn.onmessage=t=>this.onConnMessage(t),this.conn.onclose=t=>this.onConnClose(t)}getSession(e){return this.sessionStore&&this.sessionStore.getItem(e)}storeSession(e,t){this.sessionStore&&this.sessionStore.setItem(e,t)}connectWithFallback(e,t=2500){clearTimeout(this.fallbackTimer);let n=!1,r=!0,s,i,o=this.transportName(e),a=l=>{this.log("transport",`falling back to ${o}...`,l),this.off([s,i]),r=!1,this.replaceTransport(e),this.transportConnect()};if(this.getSession(`phx:fallback:${o}`))return a("memorized");this.fallbackTimer=setTimeout(a,t),i=this.onError(l=>{this.log("transport","error",l),r&&!n&&(clearTimeout(this.fallbackTimer),a(l))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(n=!0,!r){let l=this.transportName(e);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${l}`,"true"),this.log("transport",`established ${l} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(a,t),this.ping(l=>{this.log("transport","connected to primary after",l),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log("transport",`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks("open")}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(e){this.log("error","error in heartbeat callback",e)}this.triggerChanError(new Error("heartbeat timeout")),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),_x,"heartbeat timeout")}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(e,t,n){if(!this.conn)return e&&e();const r=this.conn;this.waitForBufferDone(r,()=>{t?r.close(t,n||""):r.close(),this.waitForSocketClosed(r,()=>{this.conn===r&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),e&&e()})})}waitForBufferDone(e,t,n=1){if(n===5||!e.bufferedAmount){t();return}setTimeout(()=>{this.waitForBufferDone(e,t,n+1)},150*n)}waitForSocketClosed(e,t,n=1){if(n===5||e.readyState===kt.closed){t();return}setTimeout(()=>{this.waitForSocketClosed(e,t,n+1)},150*n)}onConnClose(e){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log("transport","close",e),this.triggerChanError(e),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks("close",e)}onConnError(e){this.hasLogger()&&this.log("transport","error",e);let t=this.transport,n=this.establishedConnections;this.triggerStateCallbacks("error",e,t,n),(t===this.transport||n>0)&&this.triggerChanError(e)}triggerChanError(e){this.channels.forEach(t=>{t.isErrored()||t.isLeaving()||t.isClosed()||t.trigger(Pt.error,e)})}connectionState(){switch(this.conn&&this.conn.readyState){case kt.connecting:return"connecting";case kt.open:return"open";case kt.closing:return"closing";default:return"closed"}}isConnected(){return this.connectionState()==="open"}remove(e){this.off(e.stateChangeRefs),this.channels=this.channels.filter(t=>t!==e)}off(e){for(let t in this.stateChangeCallbacks)this.stateChangeCallbacks[t]=this.stateChangeCallbacks[t].filter(([n])=>e.indexOf(n)===-1)}channel(e,t={}){let n=new Ex(e,t,this);return this.channels.push(n),n}push(e){if(this.hasLogger()){let{topic:t,event:n,payload:r,ref:s,join_ref:i}=e;this.log("push",`${t} ${n} (${i}, ${s})`,r)}this.isConnected()?this.encode(e,t=>this.conn.send(t)):this.sendBuffer.push(()=>this.encode(e,t=>this.conn.send(t)))}makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(e){this.log("error","error in heartbeat callback",e)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(e){this.log("error","error in heartbeat callback",e)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}onConnMessage(e){this.decode(e.data,t=>{let{topic:n,event:r,payload:s,ref:i,join_ref:o}=t;if(i&&i===this.pendingHeartbeatRef){const a=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(s.status==="ok"?"ok":"error",a)}catch(l){this.log("error","error in heartbeat callback",l)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log("receive",`${s.status||""} ${n} ${r} ${i&&"("+i+")"||""}`.trim(),s);for(let a=0;a<this.channels.length;a++){const l=this.channels[a];l.isMember(n,r,s,o)&&l.trigger(r,s,i,o)}this.triggerStateCallbacks("message",t)})}triggerStateCallbacks(e,...t){try{this.stateChangeCallbacks[e].forEach(([n,r])=>{try{r(...t)}catch(s){this.log("error",`error in ${e} callback`,s)}})}catch(n){this.log("error",`error triggering ${e} callbacks`,n)}}leaveOpenTopic(e){let t=this.channels.find(n=>n.topic===e&&(n.isJoined()||n.isJoining()));t&&(this.hasLogger()&&this.log("transport",`leaving duplicate topic "${e}"`),t.leave())}};class ks{constructor(t,n){const r=Ax(n);this.presence=new Tx(t.getChannel(),r),this.presence.onJoin((s,i,o)=>{const a=ks.onJoinPayload(s,i,o);t.getChannel().trigger("presence",a)}),this.presence.onLeave((s,i,o)=>{const a=ks.onLeavePayload(s,i,o);t.getChannel().trigger("presence",a)}),this.presence.onSync(()=>{t.getChannel().trigger("presence",{event:"sync"})})}get state(){return ks.transformState(this.presence.state)}static transformState(t){return t=Px(t),Object.getOwnPropertyNames(t).reduce((n,r)=>{const s=t[r];return n[r]=no(s),n},{})}static onJoinPayload(t,n,r){const s=yh(n),i=no(r);return{event:"join",key:t,currentPresences:s,newPresences:i}}static onLeavePayload(t,n,r){const s=yh(n),i=no(r);return{event:"leave",key:t,currentPresences:s,leftPresences:i}}}function no(e){return e.metas.map(t=>(t.presence_ref=t.phx_ref,delete t.phx_ref,delete t.phx_ref_prev,t))}function Px(e){return JSON.parse(JSON.stringify(e))}function Ax(e){return(e==null?void 0:e.events)&&{events:e.events}}function yh(e){return e!=null&&e.metas?no(e):[]}var vh;(function(e){e.SYNC="sync",e.JOIN="join",e.LEAVE="leave"})(vh||(vh={}));class Rx{get state(){return this.presenceAdapter.state}constructor(t,n){this.channel=t,this.presenceAdapter=new ks(this.channel.channelAdapter,n)}}function Nx(e){if(e instanceof Error)return e;if(typeof e=="string")return new Error(e);if(e&&typeof e=="object"){const t=e;if(typeof t.code=="number"){const n=typeof t.reason=="string"&&t.reason?` (${t.reason})`:"";return new Error(`socket closed: ${t.code}${n}`,{cause:e})}return new Error("channel error: transport failure",{cause:e})}return new Error("channel error: connection lost")}class Ox{constructor(t,n,r){const s=Lx(r);this.channel=t.getSocket().channel(n,s),this.socket=t}get state(){return this.channel.state}set state(t){this.channel.state=t}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(t,n){return this.channel.on(t,n)}off(t,n){this.channel.off(t,n)}subscribe(t){return this.channel.join(t)}unsubscribe(t){return this.channel.leave(t)}teardown(){this.channel.teardown()}onClose(t){this.channel.onClose(t)}onError(t){return this.channel.onError(t)}push(t,n,r){let s;try{s=this.channel.push(t,n,r)}catch{throw new Error(`tried to push '${t}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>hx){const i=this.channel.pushBuffer.shift();i.cancelTimeout(),this.socket.log("channel",`discarded push due to buffer overflow: ${i.event}`,i.payload())}return s}updateJoinPayload(t){const n=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},n),t)}canPush(){return this.socket.isConnected()&&this.state===Zt.joined}isJoined(){return this.state===Zt.joined}isJoining(){return this.state===Zt.joining}isClosed(){return this.state===Zt.closed}isLeaving(){return this.state===Zt.leaving}updateFilterBindings(t){this.channel.filterBindings=t}updatePayloadTransform(t){this.channel.onMessage=t}getChannel(){return this.channel}}function Lx(e){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},e.config)}}var wh;(function(e){e.ALL="*",e.INSERT="INSERT",e.UPDATE="UPDATE",e.DELETE="DELETE"})(wh||(wh={}));var br;(function(e){e.BROADCAST="broadcast",e.PRESENCE="presence",e.POSTGRES_CHANGES="postgres_changes",e.SYSTEM="system"})(br||(br={}));var At;(function(e){e.SUBSCRIBED="SUBSCRIBED",e.TIMED_OUT="TIMED_OUT",e.CLOSED="CLOSED",e.CHANNEL_ERROR="CHANNEL_ERROR"})(At||(At={}));class _s{get state(){return this.channelAdapter.state}set state(t){this.channelAdapter.state=t}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(t,n={config:{}},r){var s,i;if(this.topic=t,this.params=n,this.socket=r,this.bindings={},this.subTopic=t.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},n.config),this.channelAdapter=new Ox(this.socket.socketAdapter,t,this.params),this.presence=new Rx(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=pg(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&(!((i=(s=this.params.config)===null||s===void 0?void 0:s.broadcast)===null||i===void 0)&&i.replay))throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(t,n=this.timeout){var r,s,i;if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){const{config:{broadcast:o,presence:a,private:l}}=this.params,u=(s=(r=this.bindings.postgres_changes)===null||r===void 0?void 0:r.map(p=>p.filter))!==null&&s!==void 0?s:[],c=!!this.bindings[br.PRESENCE]&&this.bindings[br.PRESENCE].length>0||((i=this.params.config.presence)===null||i===void 0?void 0:i.enabled)===!0,h={},f={broadcast:o,presence:Object.assign(Object.assign({},a),{enabled:c}),postgres_changes:u,private:l};this.socket.accessTokenValue&&(h.access_token=this.socket.accessTokenValue),this._onError(p=>{t==null||t(At.CHANNEL_ERROR,Nx(p))}),this._onClose(()=>t==null?void 0:t(At.CLOSED)),this.updateJoinPayload(Object.assign({config:f},h)),this._updateFilterMessage(),this.channelAdapter.subscribe(n).receive("ok",async({postgres_changes:p})=>{if(this.socket._isManualToken()||this.socket.setAuth(),p===void 0){t==null||t(At.SUBSCRIBED);return}this._updatePostgresBindings(p,t)}).receive("error",p=>{this.state=Zt.errored;const y=Object.values(p).join(", ")||"error";t==null||t(At.CHANNEL_ERROR,new Error(y,{cause:p}))}).receive("timeout",()=>{t==null||t(At.TIMED_OUT)})}return this}_updatePostgresBindings(t,n){var r;const s=this.bindings.postgres_changes,i=(r=s==null?void 0:s.length)!==null&&r!==void 0?r:0,o=[];for(let a=0;a<i;a++){const l=s[a],{filter:{event:u,schema:c,table:h,filter:f}}=l,p=t&&t[a];if(p&&p.event===u&&_s.isFilterValueEqual(p.schema,c)&&_s.isFilterValueEqual(p.table,h)&&_s.isFilterValueEqual(p.filter,f))o.push(Object.assign(Object.assign({},l),{id:p.id}));else{this.unsubscribe(),this.state=Zt.errored,n==null||n(At.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=o,this.state!=Zt.errored&&n&&n(At.SUBSCRIBED)}presenceState(){return this.presence.state}async track(t,n={}){return await this.send({type:"presence",event:"track",payload:t},n.timeout||this.timeout)}async untrack(t={}){return await this.send({type:"presence",event:"untrack"},t)}on(t,n,r){const s=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),i=t===br.PRESENCE||t===br.POSTGRES_CHANGES;if(s&&i)throw this.socket.log("channel",`cannot add \`${t}\` callbacks for ${this.topic} after \`subscribe()\`.`),new Error(`cannot add \`${t}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(t,n,r)}async httpSend(t,n,r={}){var s;if(n==null)return Promise.reject(new Error("Payload is required for httpSend()"));const i={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(i.Authorization=`Bearer ${this.socket.accessTokenValue}`);const o={method:"POST",headers:i,body:JSON.stringify({messages:[{topic:this.subTopic,event:t,payload:n,private:this.private}]})},a=await this._fetchWithTimeout(this.broadcastEndpointURL,o,(s=r.timeout)!==null&&s!==void 0?s:this.timeout);if(a.status===202)return{success:!0};let l=a.statusText;try{const u=await a.json();l=u.error||u.message||l}catch{}return Promise.reject(new Error(l))}async send(t,n={}){var r,s;if(!this.channelAdapter.canPush()&&t.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:i,payload:o}=t,a={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:a,body:JSON.stringify({messages:[{topic:this.subTopic,event:i,payload:o,private:this.private}]})};try{const u=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(r=n.timeout)!==null&&r!==void 0?r:this.timeout);return await((s=u.body)===null||s===void 0?void 0:s.cancel()),u.ok?"ok":"error"}catch(u){return u instanceof Error&&u.name==="AbortError"?"timed out":"error"}}else return new Promise(i=>{var o,a,l;const u=this.channelAdapter.push(t.type,t,n.timeout||this.timeout);t.type==="broadcast"&&!(!((l=(a=(o=this.params)===null||o===void 0?void 0:o.config)===null||a===void 0?void 0:a.broadcast)===null||l===void 0)&&l.ack)&&i("ok"),u.receive("ok",()=>i("ok")),u.receive("error",()=>i("error")),u.receive("timeout",()=>i("timed out"))})}updateJoinPayload(t){this.channelAdapter.updateJoinPayload(t)}async unsubscribe(t=this.timeout){return new Promise(n=>{this.channelAdapter.unsubscribe(t).receive("ok",()=>n("ok")).receive("timeout",()=>n("timed out")).receive("error",()=>n("error"))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(t,n,r){const s=new AbortController,i=setTimeout(()=>s.abort(),r),o=await this.socket.fetch(t,Object.assign(Object.assign({},n),{signal:s.signal}));return clearTimeout(i),o}_on(t,n,r){const s=t.toLocaleLowerCase(),i=this.channelAdapter.on(t,r),o={type:s,filter:n,callback:r,ref:i};return this.bindings[s]?this.bindings[s].push(o):this.bindings[s]=[o],this._updateFilterMessage(),this}_onClose(t){this.channelAdapter.onClose(t)}_onError(t){this.channelAdapter.onError(t)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((t,n,r)=>{var s,i,o,a,l,u,c;const h=t.event.toLocaleLowerCase();if(this._notThisChannelEvent(h,r))return!1;const f=(s=this.bindings[h])===null||s===void 0?void 0:s.find(p=>p.ref===t.ref);if(!f)return!0;if(["broadcast","presence","postgres_changes"].includes(h))if("id"in f){const p=f.id,y=(i=f.filter)===null||i===void 0?void 0:i.event;return p&&((o=n.ids)===null||o===void 0?void 0:o.includes(p))&&(y==="*"||(y==null?void 0:y.toLocaleLowerCase())===((a=n.data)===null||a===void 0?void 0:a.type.toLocaleLowerCase()))}else{const p=(u=(l=f==null?void 0:f.filter)===null||l===void 0?void 0:l.event)===null||u===void 0?void 0:u.toLocaleLowerCase();return p==="*"||p===((c=n==null?void 0:n.event)===null||c===void 0?void 0:c.toLocaleLowerCase())}else return f.type.toLocaleLowerCase()===h})}_notThisChannelEvent(t,n){const{close:r,error:s,leave:i,join:o}=hg;return n&&[r,s,i,o].includes(t)&&n!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((t,n,r)=>{if(typeof n=="object"&&"ids"in n){const s=n.data,{schema:i,table:o,commit_timestamp:a,type:l,errors:u}=s;return Object.assign(Object.assign({},{schema:i,table:o,commit_timestamp:a,eventType:l,new:{},old:{},errors:u}),this._getPayloadRecords(s))}return n})}copyBindings(t){if(this.joinedOnce)throw new Error("cannot copy bindings into joined channel");for(const n in t.bindings)for(const r of t.bindings[n])this._on(r.type,r.filter,r.callback)}static isFilterValueEqual(t,n){return(t??void 0)===(n??void 0)}_getPayloadRecords(t){const n={new:{},old:{}};return(t.type==="INSERT"||t.type==="UPDATE")&&(n.new=gh(t.columns,t.record)),(t.type==="UPDATE"||t.type==="DELETE")&&(n.old=gh(t.columns,t.old_record)),n}}class Ix{constructor(t,n){this.socket=new Cx(t,n)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(t){this.socket.heartbeatCallback=t}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(t,n,r,s=1e4){return new Promise(i=>{setTimeout(()=>i("timeout"),s),this.socket.disconnect(()=>{t(),i("ok")},n,r)})}push(t){this.socket.push(t)}log(t,n,r){this.socket.log(t,n,r)}makeRef(){return this.socket.makeRef()}onOpen(t){this.socket.onOpen(t)}onClose(t){this.socket.onClose(t)}onError(t){this.socket.onError(t)}onMessage(t){this.socket.onMessage(t)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==uu.connecting}isDisconnecting(){return this.socket.connectionState()==uu.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}}const xh={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},Dx=[1e3,2e3,5e3,1e4],Mx=1e4;function $x(){const e=new Map;return{get length(){return e.size},clear(){e.clear()},getItem(t){return e.has(t)?e.get(t):null},key(t){var n;return(n=Array.from(e.keys())[t])!==null&&n!==void 0?n:null},removeItem(t){e.delete(t)},setItem(t,n){e.set(t,String(n))}}}function Ux(){try{if(typeof globalThis<"u"&&globalThis.sessionStorage)return globalThis.sessionStorage}catch{}return $x()}const zx=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class Bx{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(t,n){var r;if(this.channels=new Array,this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint="",this.headers={},this.params={},this.ref=0,this.serializer=new fx,this._manuallySetToken=!1,this._authPromise=null,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._pendingDisconnectTimer=null,this._disconnectOnEmptyChannelsAfterMs=0,this._resolveFetch=i=>i?(...o)=>i(...o):(...o)=>fetch(...o),!(!((r=n==null?void 0:n.params)===null||r===void 0)&&r.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=n.params.apikey;const s=this._initializeOptions(n);this.socketAdapter=new Ix(t,s),this.httpEndpoint=pg(t),this.fetch=this._resolveFetch(n==null?void 0:n.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(t){const n=t.message;throw n.includes("Node.js")?new Error(`${n}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${n}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(t,n){return this._cancelPendingDisconnect(),this.isDisconnecting()?"ok":await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},t,n)}getChannels(){return this.channels}async removeChannel(t){const n=await t.unsubscribe();return n==="ok"&&t.teardown(),n}async removeAllChannels(){const t=this.channels.map(async r=>{const s=await r.unsubscribe();return r.teardown(),s}),n=await Promise.all(t);return await this.disconnect(),n}log(t,n,r){this.socketAdapter.log(t,n,r)}connectionState(){return this.socketAdapter.connectionState()||uu.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(t,n={config:{}}){const r=`realtime:${t}`,s=this.getChannels().find(i=>i.topic===r);if(s)return s;{const i=new _s(`realtime:${t}`,n,this);return this._cancelPendingDisconnect(),this.channels.push(i),i}}push(t){this.socketAdapter.push(t)}async setAuth(t=null){this._authPromise=this._performAuth(t);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(t){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(t)}_makeRef(){return this.socketAdapter.makeRef()}_remove(t){this.channels=this.channels.filter(n=>n.topic!==t.topic),this.channels.length===0&&(this.log("transport","no channels remaining, scheduling disconnect"),this._schedulePendingDisconnect())}_schedulePendingDisconnect(){if(this._cancelPendingDisconnect(),this._disconnectOnEmptyChannelsAfterMs===0){this.log("transport","disconnecting immediately - no channels"),this.disconnect();return}this._pendingDisconnectTimer=setTimeout(()=>{this._pendingDisconnectTimer=null,this.channels.length===0&&(this.log("transport","deferred disconnect fired - no channels, disconnecting"),this.disconnect())},this._disconnectOnEmptyChannelsAfterMs),this.log("transport",`deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)}_cancelPendingDisconnect(){this._pendingDisconnectTimer!==null&&(this.log("transport","pending disconnect cancelled - channel activity detected"),clearTimeout(this._pendingDisconnectTimer),this._pendingDisconnectTimer=null)}async _performAuth(t=null){let n,r=!1;if(t)n=t,r=!0;else if(this.accessToken)try{n=await this.accessToken()}catch(s){this.log("error","Error fetching access token from callback",s),n=this.accessTokenValue}else n=this.accessTokenValue;r?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=n&&(this.accessTokenValue=n,this.channels.forEach(s=>{const i={access_token:n,version:lx};n&&s.updateJoinPayload(i),s.joinedOnce&&s.channelAdapter.isJoined()&&s.channelAdapter.push(hg.access_token,{access_token:n})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(t="general"){this._isManualToken()||this.setAuth().catch(n=>{this.log("error",`Error setting auth in ${t}`,n)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(n=>{this.log("error","error waiting for auth on connect",n)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(t=>{t.ref&&t.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(t){return(n,r)=>{n=="sent"&&this._setAuthSafely(),t&&t(n,r)}}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const t=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(t),this.workerRef.onerror=n=>{this.log("worker","worker error",n.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=n=>{n.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_workerObjectUrl(t){let n;if(t)n=t;else{const r=new Blob([zx],{type:"application/javascript"});n=URL.createObjectURL(r)}return n}_initializeOptions(t){var n,r,s,i,o,a,l,u,c,h,f,p;this.worker=(n=t==null?void 0:t.worker)!==null&&n!==void 0?n:!1,this.accessToken=(r=t==null?void 0:t.accessToken)!==null&&r!==void 0?r:null;const y={};y.timeout=(s=t==null?void 0:t.timeout)!==null&&s!==void 0?s:dx,y.heartbeatIntervalMs=(i=t==null?void 0:t.heartbeatIntervalMs)!==null&&i!==void 0?i:xh.HEARTBEAT_INTERVAL,this._disconnectOnEmptyChannelsAfterMs=(o=t==null?void 0:t.disconnectOnEmptyChannelsAfterMs)!==null&&o!==void 0?o:2*((a=t==null?void 0:t.heartbeatIntervalMs)!==null&&a!==void 0?a:xh.HEARTBEAT_INTERVAL),y.transport=(l=t==null?void 0:t.transport)!==null&&l!==void 0?l:ox.getWebSocketConstructor(),y.params=t==null?void 0:t.params,y.logger=t==null?void 0:t.logger,y.heartbeatCallback=this._wrapHeartbeatCallback(t==null?void 0:t.heartbeatCallback),y.sessionStorage=(u=t==null?void 0:t.sessionStorage)!==null&&u!==void 0?u:Ux(),y.reconnectAfterMs=(c=t==null?void 0:t.reconnectAfterMs)!==null&&c!==void 0?c:m=>Dx[m-1]||Mx;let w,b;const v=(h=t==null?void 0:t.vsn)!==null&&h!==void 0?h:cx;switch(v){case ux:w=(m,g)=>g(JSON.stringify(m)),b=(m,g)=>g(JSON.parse(m));break;case dg:w=this.serializer.encode.bind(this.serializer),b=this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${y.vsn}`)}if(y.vsn=v,y.encode=(f=t==null?void 0:t.encode)!==null&&f!==void 0?f:w,y.decode=(p=t==null?void 0:t.decode)!==null&&p!==void 0?p:b,y.beforeReconnect=this._reconnectAuth.bind(this),(t!=null&&t.logLevel||t!=null&&t.log_level)&&(this.logLevel=t.logLevel||t.log_level,y.params=Object.assign(Object.assign({},y.params),{log_level:this.logLevel})),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=t==null?void 0:t.workerUrl,y.autoSendHeartbeat=!this.worker}return y}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}}var Gs=class extends Error{constructor(e,t){var n;super(e),this.name="IcebergError",this.status=t.status,this.icebergType=t.icebergType,this.icebergCode=t.icebergCode,this.details=t.details,this.isCommitStateUnknown=t.icebergType==="CommitStateUnknownException"||[500,502,504].includes(t.status)&&((n=t.icebergType)==null?void 0:n.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function Vx(e,t,n){const r=new URL(t,e);if(n)for(const[s,i]of Object.entries(n))i!==void 0&&r.searchParams.set(s,i);return r.toString()}async function Fx(e){return!e||e.type==="none"?{}:e.type==="bearer"?{Authorization:`Bearer ${e.token}`}:e.type==="header"?{[e.name]:e.value}:e.type==="custom"?await e.getHeaders():{}}function Hx(e){const t=e.fetchImpl??globalThis.fetch;return{async request({method:n,path:r,query:s,body:i,headers:o}){const a=Vx(e.baseUrl,r,s),l=await Fx(e.auth),u=await t(a,{method:n,headers:{...i?{"Content-Type":"application/json"}:{},...l,...o},body:i?JSON.stringify(i):void 0}),c=await u.text(),h=(u.headers.get("content-type")||"").includes("application/json"),f=h&&c?JSON.parse(c):c;if(!u.ok){const p=h?f:void 0,y=p==null?void 0:p.error;throw new Gs((y==null?void 0:y.message)??`Request failed with status ${u.status}`,{status:u.status,icebergType:y==null?void 0:y.type,icebergCode:y==null?void 0:y.code,details:p})}return{status:u.status,headers:u.headers,data:f}}}}function Li(e){return e.join("")}var Wx=class{constructor(e,t=""){this.client=e,this.prefix=t}async listNamespaces(e){const t=e?{parent:Li(e.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:t})).data.namespaces.map(r=>({namespace:r}))}async createNamespace(e,t){const n={namespace:e.namespace,properties:t==null?void 0:t.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:n})).data}async dropNamespace(e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Li(e.namespace)}`})}async loadNamespaceMetadata(e){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Li(e.namespace)}`})).data.properties}}async namespaceExists(e){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Li(e.namespace)}`}),!0}catch(t){if(t instanceof Gs&&t.status===404)return!1;throw t}}async createNamespaceIfNotExists(e,t){try{return await this.createNamespace(e,t)}catch(n){if(n instanceof Gs&&n.status===409)return;throw n}}};function tr(e){return e.join("")}var qx=class{constructor(e,t="",n){this.client=e,this.prefix=t,this.accessDelegation=n}async listTables(e){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${tr(e.namespace)}/tables`})).data.identifiers}async createTable(e,t){const n={};return this.accessDelegation&&(n["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${tr(e.namespace)}/tables`,body:t,headers:n})).data.metadata}async updateTable(e,t){const n=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${tr(e.namespace)}/tables/${e.name}`,body:t});return{"metadata-location":n.data["metadata-location"],metadata:n.data.metadata}}async dropTable(e,t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${tr(e.namespace)}/tables/${e.name}`,query:{purgeRequested:String((t==null?void 0:t.purge)??!1)}})}async loadTable(e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${tr(e.namespace)}/tables/${e.name}`,headers:t})).data.metadata}async tableExists(e){const t={};this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${tr(e.namespace)}/tables/${e.name}`,headers:t}),!0}catch(n){if(n instanceof Gs&&n.status===404)return!1;throw n}}async createTableIfNotExists(e,t){try{return await this.createTable(e,t)}catch(n){if(n instanceof Gs&&n.status===409)return await this.loadTable({namespace:e.namespace,name:t.name});throw n}}},Kx=class{constructor(e){var r;let t="v1";e.catalogName&&(t+=`/${e.catalogName}`);const n=e.baseUrl.endsWith("/")?e.baseUrl:`${e.baseUrl}/`;this.client=Hx({baseUrl:n,auth:e.auth,fetchImpl:e.fetch}),this.accessDelegation=(r=e.accessDelegation)==null?void 0:r.join(","),this.namespaceOps=new Wx(this.client,t),this.tableOps=new qx(this.client,t,this.accessDelegation)}async listNamespaces(e){return this.namespaceOps.listNamespaces(e)}async createNamespace(e,t){return this.namespaceOps.createNamespace(e,t)}async dropNamespace(e){await this.namespaceOps.dropNamespace(e)}async loadNamespaceMetadata(e){return this.namespaceOps.loadNamespaceMetadata(e)}async listTables(e){return this.tableOps.listTables(e)}async createTable(e,t){return this.tableOps.createTable(e,t)}async updateTable(e,t){return this.tableOps.updateTable(e,t)}async dropTable(e,t){await this.tableOps.dropTable(e,t)}async loadTable(e){return this.tableOps.loadTable(e)}async namespaceExists(e){return this.namespaceOps.namespaceExists(e)}async tableExists(e){return this.tableOps.tableExists(e)}async createNamespaceIfNotExists(e,t){return this.namespaceOps.createNamespaceIfNotExists(e,t)}async createTableIfNotExists(e,t){return this.tableOps.createTableIfNotExists(e,t)}};function Js(e){"@babel/helpers - typeof";return Js=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Js(e)}function Gx(e,t){if(Js(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||"default");if(Js(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Jx(e){var t=Gx(e,"string");return Js(t)=="symbol"?t:t+""}function Yx(e,t,n){return(t=Jx(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function bh(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),n.push.apply(n,r)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?bh(Object(n),!0).forEach(function(r){Yx(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):bh(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}var ca=class extends Error{constructor(e,t="storage",n,r){super(e),this.__isStorageError=!0,this.namespace=t,this.name=t==="vectors"?"StorageVectorsError":"StorageError",this.status=n,this.statusCode=r}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function da(e){return typeof e=="object"&&e!==null&&"__isStorageError"in e}var fu=class extends ca{constructor(e,t,n,r="storage"){super(e,r,t,n),this.name=r==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=t,this.statusCode=n}toJSON(){return O({},super.toJSON())}},gg=class extends ca{constructor(e,t,n="storage"){super(e,n),this.name=n==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=t}};function No(e,t,n){const r=O({},e),s=t.toLowerCase();for(const i of Object.keys(r))i.toLowerCase()===s&&delete r[i];return r[s]=n,r}function Qx(e){const t={};for(const[n,r]of Object.entries(e))t[n.toLowerCase()]=r;return t}const Xx=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),Zx=e=>{if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},pu=e=>{if(Array.isArray(e))return e.map(n=>pu(n));if(typeof e=="function"||e!==Object(e))return e;const t={};return Object.entries(e).forEach(([n,r])=>{const s=n.replace(/([-_][a-z])/gi,i=>i.toUpperCase().replace(/[-_]/g,""));t[s]=pu(r)}),t},eb=e=>!e||typeof e!="string"||e.length===0||e.length>100||e.trim()!==e||e.includes("/")||e.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(e),kh=e=>{if(typeof e=="object"&&e!==null){const t=e;if(typeof t.msg=="string")return t.msg;if(typeof t.message=="string")return t.message;if(typeof t.error_description=="string")return t.error_description;if(typeof t.error=="string")return t.error;if(typeof t.error=="object"&&t.error!==null){const n=t.error;if(typeof n.message=="string")return n.message}}return JSON.stringify(e)},tb=async(e,t,n,r)=>{if(e!==null&&typeof e=="object"&&"json"in e&&typeof e.json=="function"){const s=e;let i=parseInt(String(s.status),10);Number.isFinite(i)||(i=500),s.json().then(o=>{const a=(o==null?void 0:o.statusCode)||(o==null?void 0:o.code)||i+"";t(new fu(kh(o),i,a,r))}).catch(()=>{const o=i+"";t(new fu(s.statusText||`HTTP ${i} error`,i,o,r))})}else t(new gg(kh(e),e,r))},nb=(e,t,n,r)=>{const s={method:e,headers:(t==null?void 0:t.headers)||{}};if(e==="GET"||e==="HEAD"||!r)return O(O({},s),n);if(Zx(r)){var i;const o=(t==null?void 0:t.headers)||{};let a;for(const[l,u]of Object.entries(o))l.toLowerCase()==="content-type"&&(a=u);s.headers=No(o,"Content-Type",(i=a)!==null&&i!==void 0?i:"application/json"),s.body=JSON.stringify(r)}else s.body=r;return t!=null&&t.duplex&&(s.duplex=t.duplex),O(O({},s),n)};async function ns(e,t,n,r,s,i,o){return new Promise((a,l)=>{e(n,nb(t,r,s,i)).then(u=>{if(!u.ok)throw u;if(r!=null&&r.noResolveJson)return u;if(o==="vectors"){const c=u.headers.get("content-type");if(u.headers.get("content-length")==="0"||u.status===204)return{};if(!c||!c.includes("application/json"))return{}}return u.json()}).then(u=>a(u)).catch(u=>tb(u,l,r,o))})}function yg(e="storage"){return{get:async(t,n,r,s)=>ns(t,"GET",n,r,s,void 0,e),post:async(t,n,r,s,i)=>ns(t,"POST",n,s,i,r,e),put:async(t,n,r,s,i)=>ns(t,"PUT",n,s,i,r,e),head:async(t,n,r,s)=>ns(t,"HEAD",n,O(O({},r),{},{noResolveJson:!0}),s,void 0,e),remove:async(t,n,r,s,i)=>ns(t,"DELETE",n,s,i,r,e)}}const rb=yg("storage"),{get:Ys,post:ct,put:mu,head:sb,remove:Rc}=rb,Fe=yg("vectors");var Kr=class{constructor(e,t={},n,r="storage"){this.shouldThrowOnError=!1,this.url=e,this.headers=Qx(t),this.fetch=Xx(n),this.namespace=r}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=No(this.headers,e,t),this}async handleOperation(e){var t=this;try{return{data:await e(),error:null}}catch(n){if(t.shouldThrowOnError)throw n;if(da(n))return{data:null,error:n};throw n}}},ib=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t}then(e,t){return this.execute().then(e,t)}async execute(){var e=this;try{return{data:(await e.downloadFn()).body,error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(da(t))return{data:null,error:t};throw t}}};let vg;vg=Symbol.toStringTag;var ob=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[vg]="BlobDownloadBuilder",this.promise=null}asStream(){return new ib(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var e=this;try{return{data:await(await e.downloadFn()).blob(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(da(t))return{data:null,error:t};throw t}}};const ab={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},_h={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var lb=class extends Kr{constructor(e,t={},n,r){super(e,t,r,"storage"),this.bucketId=n}async uploadOrUpdate(e,t,n,r){var s=this;return s.handleOperation(async()=>{let i;const o=O(O({},_h),r);let a=O(O({},s.headers),e==="POST"&&{"x-upsert":String(o.upsert)});const l=o.metadata;if(typeof Blob<"u"&&n instanceof Blob?(i=new FormData,i.append("cacheControl",o.cacheControl),l&&i.append("metadata",s.encodeMetadata(l)),i.append("",n)):typeof FormData<"u"&&n instanceof FormData?(i=n,i.has("cacheControl")||i.append("cacheControl",o.cacheControl),l&&!i.has("metadata")&&i.append("metadata",s.encodeMetadata(l))):(i=n,a["cache-control"]=`max-age=${o.cacheControl}`,a["content-type"]=o.contentType,l&&(a["x-metadata"]=s.toBase64(s.encodeMetadata(l))),(typeof ReadableStream<"u"&&i instanceof ReadableStream||i&&typeof i=="object"&&"pipe"in i&&typeof i.pipe=="function")&&!o.duplex&&(o.duplex="half")),r!=null&&r.headers)for(const[f,p]of Object.entries(r.headers))a=No(a,f,p);const u=s._removeEmptyFolders(t),c=s._getFinalPath(u),h=await(e=="PUT"?mu:ct)(s.fetch,`${s.url}/object/${c}`,i,O({headers:a},o!=null&&o.duplex?{duplex:o.duplex}:{}));return{path:u,id:h.Id,fullPath:h.Key}})}async upload(e,t,n){return this.uploadOrUpdate("POST",e,t,n)}async uploadToSignedUrl(e,t,n,r){var s=this;const i=s._removeEmptyFolders(e),o=s._getFinalPath(i),a=new URL(s.url+`/object/upload/sign/${o}`);return a.searchParams.set("token",t),s.handleOperation(async()=>{let l;const u=O(O({},_h),r);let c=O(O({},s.headers),{"x-upsert":String(u.upsert)});const h=u.metadata;if(typeof Blob<"u"&&n instanceof Blob?(l=new FormData,l.append("cacheControl",u.cacheControl),h&&l.append("metadata",s.encodeMetadata(h)),l.append("",n)):typeof FormData<"u"&&n instanceof FormData?(l=n,l.has("cacheControl")||l.append("cacheControl",u.cacheControl),h&&!l.has("metadata")&&l.append("metadata",s.encodeMetadata(h))):(l=n,c["cache-control"]=`max-age=${u.cacheControl}`,c["content-type"]=u.contentType,h&&(c["x-metadata"]=s.toBase64(s.encodeMetadata(h))),(typeof ReadableStream<"u"&&l instanceof ReadableStream||l&&typeof l=="object"&&"pipe"in l&&typeof l.pipe=="function")&&!u.duplex&&(u.duplex="half")),r!=null&&r.headers)for(const[f,p]of Object.entries(r.headers))c=No(c,f,p);return{path:i,fullPath:(await mu(s.fetch,a.toString(),l,O({headers:c},u!=null&&u.duplex?{duplex:u.duplex}:{}))).Key}})}async createSignedUploadUrl(e,t){var n=this;return n.handleOperation(async()=>{let r=n._getFinalPath(e);const s=O({},n.headers);t!=null&&t.upsert&&(s["x-upsert"]="true");const i=await ct(n.fetch,`${n.url}/object/upload/sign/${r}`,{},{headers:s}),o=new URL(n.url+i.url),a=o.searchParams.get("token");if(!a)throw new ca("No token returned by API");return{signedUrl:o.toString(),path:e,token:a}})}async update(e,t,n){return this.uploadOrUpdate("PUT",e,t,n)}async move(e,t,n){var r=this;return r.handleOperation(async()=>await ct(r.fetch,`${r.url}/object/move`,{bucketId:r.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n==null?void 0:n.destinationBucket},{headers:r.headers}))}async copy(e,t,n){var r=this;return r.handleOperation(async()=>({path:(await ct(r.fetch,`${r.url}/object/copy`,{bucketId:r.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n==null?void 0:n.destinationBucket},{headers:r.headers})).Key}))}async createSignedUrl(e,t,n){var r=this;return r.handleOperation(async()=>{let s=r._getFinalPath(e);const i=typeof(n==null?void 0:n.transform)=="object"&&n.transform!==null&&Object.keys(n.transform).length>0;let o=await ct(r.fetch,`${r.url}/object/sign/${s}`,O({expiresIn:t},i?{transform:n.transform}:{}),{headers:r.headers});const a=new URLSearchParams;n!=null&&n.download&&a.set("download",n.download===!0?"":n.download),(n==null?void 0:n.cacheNonce)!=null&&a.set("cacheNonce",String(n.cacheNonce));const l=a.toString();return{signedUrl:encodeURI(`${r.url}${o.signedURL}${l?`&${l}`:""}`)}})}async createSignedUrls(e,t,n){var r=this;return r.handleOperation(async()=>{const s=await ct(r.fetch,`${r.url}/object/sign/${r.bucketId}`,{expiresIn:t,paths:e},{headers:r.headers}),i=new URLSearchParams;n!=null&&n.download&&i.set("download",n.download===!0?"":n.download),(n==null?void 0:n.cacheNonce)!=null&&i.set("cacheNonce",String(n.cacheNonce));const o=i.toString();return s.map(a=>O(O({},a),{},{signedUrl:a.signedURL?encodeURI(`${r.url}${a.signedURL}${o?`&${o}`:""}`):null}))})}download(e,t,n){const r=typeof(t==null?void 0:t.transform)=="object"&&t.transform!==null&&Object.keys(t.transform).length>0?"render/image/authenticated":"object",s=new URLSearchParams;t!=null&&t.transform&&this.applyTransformOptsToQuery(s,t.transform),(t==null?void 0:t.cacheNonce)!=null&&s.set("cacheNonce",String(t.cacheNonce));const i=s.toString(),o=this._getFinalPath(e),a=()=>Ys(this.fetch,`${this.url}/${r}/${o}${i?`?${i}`:""}`,{headers:this.headers,noResolveJson:!0},n);return new ob(a,this.shouldThrowOnError)}async info(e){var t=this;const n=t._getFinalPath(e);return t.handleOperation(async()=>pu(await Ys(t.fetch,`${t.url}/object/info/${n}`,{headers:t.headers})))}async exists(e){var t=this;const n=t._getFinalPath(e);try{return await sb(t.fetch,`${t.url}/object/${n}`,{headers:t.headers}),{data:!0,error:null}}catch(s){if(t.shouldThrowOnError)throw s;if(da(s)){var r;const i=s instanceof fu?s.status:s instanceof gg?(r=s.originalError)===null||r===void 0?void 0:r.status:void 0;if(i!==void 0&&[400,404].includes(i))return{data:!1,error:s}}throw s}}getPublicUrl(e,t){const n=this._getFinalPath(e),r=new URLSearchParams;t!=null&&t.download&&r.set("download",t.download===!0?"":t.download),t!=null&&t.transform&&this.applyTransformOptsToQuery(r,t.transform),(t==null?void 0:t.cacheNonce)!=null&&r.set("cacheNonce",String(t.cacheNonce));const s=r.toString(),i=typeof(t==null?void 0:t.transform)=="object"&&t.transform!==null&&Object.keys(t.transform).length>0?"render/image":"object";return{data:{publicUrl:encodeURI(`${this.url}/${i}/public/${n}`)+(s?`?${s}`:"")}}}async remove(e){var t=this;return t.handleOperation(async()=>await Rc(t.fetch,`${t.url}/object/${t.bucketId}`,{prefixes:e},{headers:t.headers}))}async list(e,t,n){var r=this;return r.handleOperation(async()=>{const s=O(O(O({},ab),t),{},{prefix:e||""});return await ct(r.fetch,`${r.url}/object/list/${r.bucketId}`,s,{headers:r.headers},n)})}async listV2(e,t){var n=this;return n.handleOperation(async()=>{const r=O({},e);return await ct(n.fetch,`${n.url}/object/list-v2/${n.bucketId}`,r,{headers:n.headers},t)})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,"")}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}applyTransformOptsToQuery(e,t){return t.width&&e.set("width",t.width.toString()),t.height&&e.set("height",t.height.toString()),t.resize&&e.set("resize",t.resize),t.format&&e.set("format",t.format),t.quality&&e.set("quality",t.quality.toString()),e}};const ub="2.105.4",li={"X-Client-Info":`storage-js/${ub}`};var cb=class extends Kr{constructor(e,t={},n,r){const s=new URL(e);r!=null&&r.useNewHostname&&/supabase\.(co|in|red)$/.test(s.hostname)&&!s.hostname.includes("storage.supabase.")&&(s.hostname=s.hostname.replace("supabase.","storage.supabase."));const i=s.href.replace(/\/$/,""),o=O(O({},li),t);super(i,o,n,"storage")}async listBuckets(e){var t=this;return t.handleOperation(async()=>{const n=t.listBucketOptionsToQueryString(e);return await Ys(t.fetch,`${t.url}/bucket${n}`,{headers:t.headers})})}async getBucket(e){var t=this;return t.handleOperation(async()=>await Ys(t.fetch,`${t.url}/bucket/${e}`,{headers:t.headers}))}async createBucket(e,t={public:!1}){var n=this;return n.handleOperation(async()=>await ct(n.fetch,`${n.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:n.headers}))}async updateBucket(e,t){var n=this;return n.handleOperation(async()=>await mu(n.fetch,`${n.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:n.headers}))}async emptyBucket(e){var t=this;return t.handleOperation(async()=>await ct(t.fetch,`${t.url}/bucket/${e}/empty`,{},{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await Rc(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}listBucketOptionsToQueryString(e){const t={};return e&&("limit"in e&&(t.limit=String(e.limit)),"offset"in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?"?"+new URLSearchParams(t).toString():""}},db=class extends Kr{constructor(e,t={},n){const r=e.replace(/\/$/,""),s=O(O({},li),t);super(r,s,n,"storage")}async createBucket(e){var t=this;return t.handleOperation(async()=>await ct(t.fetch,`${t.url}/bucket`,{name:e},{headers:t.headers}))}async listBuckets(e){var t=this;return t.handleOperation(async()=>{const n=new URLSearchParams;(e==null?void 0:e.limit)!==void 0&&n.set("limit",e.limit.toString()),(e==null?void 0:e.offset)!==void 0&&n.set("offset",e.offset.toString()),e!=null&&e.sortColumn&&n.set("sortColumn",e.sortColumn),e!=null&&e.sortOrder&&n.set("sortOrder",e.sortOrder),e!=null&&e.search&&n.set("search",e.search);const r=n.toString(),s=r?`${t.url}/bucket?${r}`:`${t.url}/bucket`;return await Ys(t.fetch,s,{headers:t.headers})})}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await Rc(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}from(e){var t=this;if(!eb(e))throw new ca("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const n=new Kx({baseUrl:this.url,catalogName:e,auth:{type:"custom",getHeaders:async()=>t.headers},fetch:this.fetch}),r=this.shouldThrowOnError;return new Proxy(n,{get(s,i){const o=s[i];return typeof o!="function"?o:async(...a)=>{try{return{data:await o.apply(s,a),error:null}}catch(l){if(r)throw l;return{data:null,error:l}}}}})}},hb=class extends Kr{constructor(e,t={},n){const r=e.replace(/\/$/,""),s=O(O({},li),{},{"Content-Type":"application/json"},t);super(r,s,n,"vectors")}async createIndex(e){var t=this;return t.handleOperation(async()=>await Fe.post(t.fetch,`${t.url}/CreateIndex`,e,{headers:t.headers})||{})}async getIndex(e,t){var n=this;return n.handleOperation(async()=>await Fe.post(n.fetch,`${n.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:n.headers}))}async listIndexes(e){var t=this;return t.handleOperation(async()=>await Fe.post(t.fetch,`${t.url}/ListIndexes`,e,{headers:t.headers}))}async deleteIndex(e,t){var n=this;return n.handleOperation(async()=>await Fe.post(n.fetch,`${n.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:n.headers})||{})}},fb=class extends Kr{constructor(e,t={},n){const r=e.replace(/\/$/,""),s=O(O({},li),{},{"Content-Type":"application/json"},t);super(r,s,n,"vectors")}async putVectors(e){var t=this;if(e.vectors.length<1||e.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return t.handleOperation(async()=>await Fe.post(t.fetch,`${t.url}/PutVectors`,e,{headers:t.headers})||{})}async getVectors(e){var t=this;return t.handleOperation(async()=>await Fe.post(t.fetch,`${t.url}/GetVectors`,e,{headers:t.headers}))}async listVectors(e){var t=this;if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw new Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return t.handleOperation(async()=>await Fe.post(t.fetch,`${t.url}/ListVectors`,e,{headers:t.headers}))}async queryVectors(e){var t=this;return t.handleOperation(async()=>await Fe.post(t.fetch,`${t.url}/QueryVectors`,e,{headers:t.headers}))}async deleteVectors(e){var t=this;if(e.keys.length<1||e.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return t.handleOperation(async()=>await Fe.post(t.fetch,`${t.url}/DeleteVectors`,e,{headers:t.headers})||{})}},pb=class extends Kr{constructor(e,t={},n){const r=e.replace(/\/$/,""),s=O(O({},li),{},{"Content-Type":"application/json"},t);super(r,s,n,"vectors")}async createBucket(e){var t=this;return t.handleOperation(async()=>await Fe.post(t.fetch,`${t.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}async getBucket(e){var t=this;return t.handleOperation(async()=>await Fe.post(t.fetch,`${t.url}/GetVectorBucket`,{vectorBucketName:e},{headers:t.headers}))}async listBuckets(e={}){var t=this;return t.handleOperation(async()=>await Fe.post(t.fetch,`${t.url}/ListVectorBuckets`,e,{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await Fe.post(t.fetch,`${t.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}},mb=class extends pb{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new gb(this.url,this.headers,e,this.fetch)}async createBucket(e){var t=()=>super.createBucket,n=this;return t().call(n,e)}async getBucket(e){var t=()=>super.getBucket,n=this;return t().call(n,e)}async listBuckets(e={}){var t=()=>super.listBuckets,n=this;return t().call(n,e)}async deleteBucket(e){var t=()=>super.deleteBucket,n=this;return t().call(n,e)}},gb=class extends hb{constructor(e,t,n,r){super(e,t,r),this.vectorBucketName=n}async createIndex(e){var t=()=>super.createIndex,n=this;return t().call(n,O(O({},e),{},{vectorBucketName:n.vectorBucketName}))}async listIndexes(e={}){var t=()=>super.listIndexes,n=this;return t().call(n,O(O({},e),{},{vectorBucketName:n.vectorBucketName}))}async getIndex(e){var t=()=>super.getIndex,n=this;return t().call(n,n.vectorBucketName,e)}async deleteIndex(e){var t=()=>super.deleteIndex,n=this;return t().call(n,n.vectorBucketName,e)}index(e){return new yb(this.url,this.headers,this.vectorBucketName,e,this.fetch)}},yb=class extends fb{constructor(e,t,n,r,s){super(e,t,s),this.vectorBucketName=n,this.indexName=r}async putVectors(e){var t=()=>super.putVectors,n=this;return t().call(n,O(O({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async getVectors(e){var t=()=>super.getVectors,n=this;return t().call(n,O(O({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async listVectors(e={}){var t=()=>super.listVectors,n=this;return t().call(n,O(O({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async queryVectors(e){var t=()=>super.queryVectors,n=this;return t().call(n,O(O({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async deleteVectors(e){var t=()=>super.deleteVectors,n=this;return t().call(n,O(O({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}},vb=class extends cb{constructor(e,t={},n,r){super(e,t,n,r)}from(e){return new lb(this.url,this.headers,e,this.fetch)}get vectors(){return new mb(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new db(this.url+"/iceberg",this.headers,this.fetch)}};const wg="2.105.4",ar=30*1e3,gu=3,Ga=gu*ar,wb="http://localhost:9999",xb="supabase.auth.token",bb={"X-Client-Info":`gotrue-js/${wg}`},yu="X-Supabase-Api-Version",xg={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},kb=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,_b=10*60*1e3;class Qs extends Error{constructor(t,n,r){super(t),this.__isAuthError=!0,this.name="AuthError",this.status=n,this.code=r}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}}function C(e){return typeof e=="object"&&e!==null&&"__isAuthError"in e}class Sb extends Qs{constructor(t,n,r){super(t,n,r),this.name="AuthApiError",this.status=n,this.code=r}}function Eb(e){return C(e)&&e.name==="AuthApiError"}class ft extends Qs{constructor(t,n){super(t),this.name="AuthUnknownError",this.originalError=n}}class Ht extends Qs{constructor(t,n,r,s){super(t,r,s),this.name=n,this.status=r}}class me extends Ht{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function Ii(e){return C(e)&&e.name==="AuthSessionMissingError"}class nr extends Ht{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Di extends Ht{constructor(t){super(t,"AuthInvalidCredentialsError",400,void 0)}}class Mi extends Ht{constructor(t,n=null){super(t,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=n}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}function jb(e){return C(e)&&e.name==="AuthImplicitGrantRedirectError"}class Sh extends Ht{constructor(t,n=null){super(t,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=n}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}class Tb extends Ht{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class vu extends Ht{constructor(t,n){super(t,"AuthRetryableFetchError",n,void 0)}}function Ja(e){return C(e)&&e.name==="AuthRetryableFetchError"}class Eh extends Ht{constructor(t,n,r){super(t,"AuthWeakPasswordError",n,"weak_password"),this.reasons=r}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}}class wu extends Ht{constructor(t){super(t,"AuthInvalidJwtError",400,"invalid_jwt")}}const Oo="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),jh=` 	
\r=`.split(""),Cb=(()=>{const e=new Array(128);for(let t=0;t<e.length;t+=1)e[t]=-1;for(let t=0;t<jh.length;t+=1)e[jh[t].charCodeAt(0)]=-2;for(let t=0;t<Oo.length;t+=1)e[Oo[t].charCodeAt(0)]=t;return e})();function Th(e,t,n){if(e!==null)for(t.queue=t.queue<<8|e,t.queuedBits+=8;t.queuedBits>=6;){const r=t.queue>>t.queuedBits-6&63;n(Oo[r]),t.queuedBits-=6}else if(t.queuedBits>0)for(t.queue=t.queue<<6-t.queuedBits,t.queuedBits=6;t.queuedBits>=6;){const r=t.queue>>t.queuedBits-6&63;n(Oo[r]),t.queuedBits-=6}}function bg(e,t,n){const r=Cb[e];if(r>-1)for(t.queue=t.queue<<6|r,t.queuedBits+=6;t.queuedBits>=8;)n(t.queue>>t.queuedBits-8&255),t.queuedBits-=8;else{if(r===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`)}}function Ch(e){const t=[],n=o=>{t.push(String.fromCodePoint(o))},r={utf8seq:0,codepoint:0},s={queue:0,queuedBits:0},i=o=>{Rb(o,r,n)};for(let o=0;o<e.length;o+=1)bg(e.charCodeAt(o),s,i);return t.join("")}function Pb(e,t){if(e<=127){t(e);return}else if(e<=2047){t(192|e>>6),t(128|e&63);return}else if(e<=65535){t(224|e>>12),t(128|e>>6&63),t(128|e&63);return}else if(e<=1114111){t(240|e>>18),t(128|e>>12&63),t(128|e>>6&63),t(128|e&63);return}throw new Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)}function Ab(e,t){for(let n=0;n<e.length;n+=1){let r=e.charCodeAt(n);if(r>55295&&r<=56319){const s=(r-55296)*1024&65535;r=(e.charCodeAt(n+1)-56320&65535|s)+65536,n+=1}Pb(r,t)}}function Rb(e,t,n){if(t.utf8seq===0){if(e<=127){n(e);return}for(let r=1;r<6;r+=1)if(!(e>>7-r&1)){t.utf8seq=r;break}if(t.utf8seq===2)t.codepoint=e&31;else if(t.utf8seq===3)t.codepoint=e&15;else if(t.utf8seq===4)t.codepoint=e&7;else throw new Error("Invalid UTF-8 sequence");t.utf8seq-=1}else if(t.utf8seq>0){if(e<=127)throw new Error("Invalid UTF-8 sequence");t.codepoint=t.codepoint<<6|e&63,t.utf8seq-=1,t.utf8seq===0&&n(t.codepoint)}}function Or(e){const t=[],n={queue:0,queuedBits:0},r=s=>{t.push(s)};for(let s=0;s<e.length;s+=1)bg(e.charCodeAt(s),n,r);return new Uint8Array(t)}function Nb(e){const t=[];return Ab(e,n=>t.push(n)),new Uint8Array(t)}function $n(e){const t=[],n={queue:0,queuedBits:0},r=s=>{t.push(s)};return e.forEach(s=>Th(s,n,r)),Th(null,n,r),t.join("")}function Ob(e){return Math.round(Date.now()/1e3)+e}function Lb(){return Symbol("auth-callback")}const we=()=>typeof window<"u"&&typeof document<"u",jn={tested:!1,writable:!1},kg=()=>{if(!we())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(jn.tested)return jn.writable;const e=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(e,e),globalThis.localStorage.removeItem(e),jn.tested=!0,jn.writable=!0}catch{jn.tested=!0,jn.writable=!1}return jn.writable};function Ib(e){const t={},n=new URL(e);if(n.hash&&n.hash[0]==="#")try{new URLSearchParams(n.hash.substring(1)).forEach((s,i)=>{t[i]=s})}catch{}return n.searchParams.forEach((r,s)=>{t[s]=r}),t}const _g=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),Db=e=>typeof e=="object"&&e!==null&&"status"in e&&"ok"in e&&"json"in e&&typeof e.json=="function",lr=async(e,t,n)=>{await e.setItem(t,JSON.stringify(n))},Tn=async(e,t)=>{const n=await e.getItem(t);if(!n)return null;try{return JSON.parse(n)}catch{return null}},ve=async(e,t)=>{await e.removeItem(t)};class ha{constructor(){this.promise=new ha.promiseConstructor((t,n)=>{this.resolve=t,this.reject=n})}}ha.promiseConstructor=Promise;function $i(e){const t=e.split(".");if(t.length!==3)throw new wu("Invalid JWT structure");for(let r=0;r<t.length;r++)if(!kb.test(t[r]))throw new wu("JWT not in base64url format");return{header:JSON.parse(Ch(t[0])),payload:JSON.parse(Ch(t[1])),signature:Or(t[2]),raw:{header:t[0],payload:t[1]}}}async function Mb(e){return await new Promise(t=>{setTimeout(()=>t(null),e)})}function $b(e,t){return new Promise((r,s)=>{(async()=>{for(let i=0;i<1/0;i++)try{const o=await e(i);if(!t(i,null,o)){r(o);return}}catch(o){if(!t(i,o)){s(o);return}}})()})}function Ub(e){return("0"+e.toString(16)).substr(-2)}function zb(){const t=new Uint32Array(56);if(typeof crypto>"u"){const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",r=n.length;let s="";for(let i=0;i<56;i++)s+=n.charAt(Math.floor(Math.random()*r));return s}return crypto.getRandomValues(t),Array.from(t,Ub).join("")}async function Bb(e){const n=new TextEncoder().encode(e),r=await crypto.subtle.digest("SHA-256",n),s=new Uint8Array(r);return Array.from(s).map(i=>String.fromCharCode(i)).join("")}async function Vb(e){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),e;const n=await Bb(e);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function rr(e,t,n=!1){const r=zb();let s=r;n&&(s+="/recovery"),await lr(e,`${t}-code-verifier`,s);const i=await Vb(r);return[i,r===i?"plain":"s256"]}const Fb=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Hb(e){const t=e.headers.get(yu);if(!t||!t.match(Fb))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch{return null}}function Wb(e){if(!e)throw new Error("Missing exp claim");const t=Math.floor(Date.now()/1e3);if(e<=t)throw new Error("JWT has expired")}function qb(e){switch(e){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Kb=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function Tt(e){if(!Kb.test(e))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function lt(e){if(!e.passkey)throw new Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).")}function Ya(){const e={};return new Proxy(e,{get:(t,n)=>{if(n==="__isUserNotAvailableProxy")return!0;if(typeof n=="symbol"){const r=n.toString();if(r==="Symbol(Symbol.toPrimitive)"||r==="Symbol(Symbol.toStringTag)"||r==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${n}" property of the session object is not supported. Please use getUser() instead.`)},set:(t,n)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${n}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(t,n)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${n}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function Gb(e,t){return new Proxy(e,{get:(n,r,s)=>{if(r==="__isInsecureUserWarningProxy")return!0;if(typeof r=="symbol"){const i=r.toString();if(i==="Symbol(Symbol.toPrimitive)"||i==="Symbol(Symbol.toStringTag)"||i==="Symbol(util.inspect.custom)"||i==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(n,r,s)}return!t.value&&typeof r=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),t.value=!0),Reflect.get(n,r,s)}})}function Ph(e){return JSON.parse(JSON.stringify(e))}const Rn=e=>{if(typeof e=="object"&&e!==null){const t=e;if(typeof t.msg=="string")return t.msg;if(typeof t.message=="string")return t.message;if(typeof t.error_description=="string")return t.error_description;if(typeof t.error=="string")return t.error}return JSON.stringify(e)},Jb=[502,503,504,520,521,522,523,524,530];async function Ah(e){var t;if(!Db(e))throw new vu(Rn(e),0);if(Jb.includes(e.status))throw new vu(Rn(e),e.status);let n;try{n=await e.json()}catch(i){throw new ft(Rn(i),i)}let r;const s=Hb(e);if(s&&s.getTime()>=xg["2024-01-01"].timestamp&&typeof n=="object"&&n&&typeof n.code=="string"?r=n.code:typeof n=="object"&&n&&typeof n.error_code=="string"&&(r=n.error_code),r){if(r==="weak_password")throw new Eh(Rn(n),e.status,((t=n.weak_password)===null||t===void 0?void 0:t.reasons)||[]);if(r==="session_not_found")throw new me}else if(typeof n=="object"&&n&&typeof n.weak_password=="object"&&n.weak_password&&Array.isArray(n.weak_password.reasons)&&n.weak_password.reasons.length&&n.weak_password.reasons.reduce((i,o)=>i&&typeof o=="string",!0))throw new Eh(Rn(n),e.status,n.weak_password.reasons);throw new Sb(Rn(n),e.status||500,r)}const Yb=(e,t,n,r)=>{const s={method:e,headers:(t==null?void 0:t.headers)||{}};return e==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},t==null?void 0:t.headers),s.body=JSON.stringify(r),Object.assign(Object.assign({},s),n))};async function N(e,t,n,r){var s;const i=Object.assign({},r==null?void 0:r.headers);i[yu]||(i[yu]=xg["2024-01-01"].name),r!=null&&r.jwt&&(i.Authorization=`Bearer ${r.jwt}`);const o=(s=r==null?void 0:r.query)!==null&&s!==void 0?s:{};r!=null&&r.redirectTo&&(o.redirect_to=r.redirectTo);const a=Object.keys(o).length?"?"+new URLSearchParams(o).toString():"",l=await Qb(e,t,n+a,{headers:i,noResolveJson:r==null?void 0:r.noResolveJson},{},r==null?void 0:r.body);return r!=null&&r.xform?r==null?void 0:r.xform(l):{data:Object.assign({},l),error:null}}async function Qb(e,t,n,r,s,i){const o=Yb(t,r,s,i);let a;try{a=await e(n,Object.assign({},o))}catch(l){throw console.error(l),new vu(Rn(l),0)}if(a.ok||await Ah(a),r!=null&&r.noResolveJson)return a;try{return await a.json()}catch(l){await Ah(l)}}function Ze(e){var t;let n=null;e1(e)&&(n=Object.assign({},e),e.expires_at||(n.expires_at=Ob(e.expires_in)));const r=(t=e.user)!==null&&t!==void 0?t:e;return{data:{session:n,user:r},error:null}}function Rh(e){const t=Ze(e);return!t.error&&e.weak_password&&typeof e.weak_password=="object"&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.message&&typeof e.weak_password.message=="string"&&e.weak_password.reasons.reduce((n,r)=>n&&typeof r=="string",!0)&&(t.data.weak_password=e.weak_password),t}function en(e){var t;return{data:{user:(t=e.user)!==null&&t!==void 0?t:e},error:null}}function Xb(e){return{data:e,error:null}}function Zb(e){const{action_link:t,email_otp:n,hashed_token:r,redirect_to:s,verification_type:i}=e,o=ua(e,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),a={action_link:t,email_otp:n,hashed_token:r,redirect_to:s,verification_type:i},l=Object.assign({},o);return{data:{properties:a,user:l},error:null}}function Nh(e){return e}function e1(e){return!!e.access_token&&!!e.refresh_token&&!!e.expires_in}const Qa=["global","local","others"];class t1{constructor({url:t="",headers:n={},fetch:r,experimental:s}){this.url=t,this.headers=n,this.fetch=_g(r),this.experimental=s??{},this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)},this.passkey={listPasskeys:this._adminListPasskeys.bind(this),deletePasskey:this._adminDeletePasskey.bind(this)}}async signOut(t,n=Qa[0]){if(Qa.indexOf(n)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${Qa.join(", ")}`);try{return await N(this.fetch,"POST",`${this.url}/logout?scope=${n}`,{headers:this.headers,jwt:t,noResolveJson:!0}),{data:null,error:null}}catch(r){if(C(r))return{data:null,error:r};throw r}}async inviteUserByEmail(t,n={}){try{return await N(this.fetch,"POST",`${this.url}/invite`,{body:{email:t,data:n.data},headers:this.headers,redirectTo:n.redirectTo,xform:en})}catch(r){if(C(r))return{data:{user:null},error:r};throw r}}async generateLink(t){try{const{options:n}=t,r=ua(t,["options"]),s=Object.assign(Object.assign({},r),n);return"newEmail"in r&&(s.new_email=r==null?void 0:r.newEmail,delete s.newEmail),await N(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:Zb,redirectTo:n==null?void 0:n.redirectTo})}catch(n){if(C(n))return{data:{properties:null,user:null},error:n};throw n}}async createUser(t){try{return await N(this.fetch,"POST",`${this.url}/admin/users`,{body:t,headers:this.headers,xform:en})}catch(n){if(C(n))return{data:{user:null},error:n};throw n}}async listUsers(t){var n,r,s,i,o,a,l;try{const u={nextPage:null,lastPage:0,total:0},c=await N(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(r=(n=t==null?void 0:t.page)===null||n===void 0?void 0:n.toString())!==null&&r!==void 0?r:"",per_page:(i=(s=t==null?void 0:t.perPage)===null||s===void 0?void 0:s.toString())!==null&&i!==void 0?i:""},xform:Nh});if(c.error)throw c.error;const h=await c.json(),f=(o=c.headers.get("x-total-count"))!==null&&o!==void 0?o:0,p=(l=(a=c.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return p.length>0&&(p.forEach(y=>{const w=parseInt(y.split(";")[0].split("=")[1].substring(0,1)),b=JSON.parse(y.split(";")[1].split("=")[1]);u[`${b}Page`]=w}),u.total=parseInt(f)),{data:Object.assign(Object.assign({},h),u),error:null}}catch(u){if(C(u))return{data:{users:[]},error:u};throw u}}async getUserById(t){Tt(t);try{return await N(this.fetch,"GET",`${this.url}/admin/users/${t}`,{headers:this.headers,xform:en})}catch(n){if(C(n))return{data:{user:null},error:n};throw n}}async updateUserById(t,n){Tt(t);try{return await N(this.fetch,"PUT",`${this.url}/admin/users/${t}`,{body:n,headers:this.headers,xform:en})}catch(r){if(C(r))return{data:{user:null},error:r};throw r}}async deleteUser(t,n=!1){Tt(t);try{return await N(this.fetch,"DELETE",`${this.url}/admin/users/${t}`,{headers:this.headers,body:{should_soft_delete:n},xform:en})}catch(r){if(C(r))return{data:{user:null},error:r};throw r}}async _listFactors(t){Tt(t.userId);try{const{data:n,error:r}=await N(this.fetch,"GET",`${this.url}/admin/users/${t.userId}/factors`,{headers:this.headers,xform:s=>({data:{factors:s},error:null})});return{data:n,error:r}}catch(n){if(C(n))return{data:null,error:n};throw n}}async _deleteFactor(t){Tt(t.userId),Tt(t.id);try{return{data:await N(this.fetch,"DELETE",`${this.url}/admin/users/${t.userId}/factors/${t.id}`,{headers:this.headers}),error:null}}catch(n){if(C(n))return{data:null,error:n};throw n}}async _listOAuthClients(t){var n,r,s,i,o,a,l;try{const u={nextPage:null,lastPage:0,total:0},c=await N(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(r=(n=t==null?void 0:t.page)===null||n===void 0?void 0:n.toString())!==null&&r!==void 0?r:"",per_page:(i=(s=t==null?void 0:t.perPage)===null||s===void 0?void 0:s.toString())!==null&&i!==void 0?i:""},xform:Nh});if(c.error)throw c.error;const h=await c.json(),f=(o=c.headers.get("x-total-count"))!==null&&o!==void 0?o:0,p=(l=(a=c.headers.get("link"))===null||a===void 0?void 0:a.split(","))!==null&&l!==void 0?l:[];return p.length>0&&(p.forEach(y=>{const w=parseInt(y.split(";")[0].split("=")[1].substring(0,1)),b=JSON.parse(y.split(";")[1].split("=")[1]);u[`${b}Page`]=w}),u.total=parseInt(f)),{data:Object.assign(Object.assign({},h),u),error:null}}catch(u){if(C(u))return{data:{clients:[]},error:u};throw u}}async _createOAuthClient(t){try{return await N(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:t,headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(C(n))return{data:null,error:n};throw n}}async _getOAuthClient(t){try{return await N(this.fetch,"GET",`${this.url}/admin/oauth/clients/${t}`,{headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(C(n))return{data:null,error:n};throw n}}async _updateOAuthClient(t,n){try{return await N(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${t}`,{body:n,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(C(r))return{data:null,error:r};throw r}}async _deleteOAuthClient(t){try{return await N(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${t}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(n){if(C(n))return{data:null,error:n};throw n}}async _regenerateOAuthClientSecret(t){try{return await N(this.fetch,"POST",`${this.url}/admin/oauth/clients/${t}/regenerate_secret`,{headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(C(n))return{data:null,error:n};throw n}}async _listCustomProviders(t){try{const n={};return t!=null&&t.type&&(n.type=t.type),await N(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:n,xform:r=>{var s;return{data:{providers:(s=r==null?void 0:r.providers)!==null&&s!==void 0?s:[]},error:null}}})}catch(n){if(C(n))return{data:{providers:[]},error:n};throw n}}async _createCustomProvider(t){try{return await N(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:t,headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(C(n))return{data:null,error:n};throw n}}async _getCustomProvider(t){try{return await N(this.fetch,"GET",`${this.url}/admin/custom-providers/${t}`,{headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(C(n))return{data:null,error:n};throw n}}async _updateCustomProvider(t,n){try{return await N(this.fetch,"PUT",`${this.url}/admin/custom-providers/${t}`,{body:n,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(C(r))return{data:null,error:r};throw r}}async _deleteCustomProvider(t){try{return await N(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${t}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(n){if(C(n))return{data:null,error:n};throw n}}async _adminListPasskeys(t){lt(this.experimental),Tt(t.userId);try{return await N(this.fetch,"GET",`${this.url}/admin/users/${t.userId}/passkeys`,{headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(C(n))return{data:null,error:n};throw n}}async _adminDeletePasskey(t){lt(this.experimental),Tt(t.userId),Tt(t.passkeyId);try{return await N(this.fetch,"DELETE",`${this.url}/admin/users/${t.userId}/passkeys/${t.passkeyId}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(n){if(C(n))return{data:null,error:n};throw n}}}function Oh(e={}){return{getItem:t=>e[t]||null,setItem:(t,n)=>{e[t]=n},removeItem:t=>{delete e[t]}}}const wt={debug:!!(globalThis&&kg()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class Sg extends Error{constructor(t){super(t),this.isAcquireTimeout=!0}}class Lh extends Sg{}async function n1(e,t,n){wt.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",e,t);const r=new globalThis.AbortController;let s;t>0&&(s=setTimeout(()=>{r.abort(),wt.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",e)},t)),await Promise.resolve();try{return await globalThis.navigator.locks.request(e,t===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:r.signal},async i=>{if(i){clearTimeout(s),wt.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",e,i.name);try{return await n()}finally{wt.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",e,i.name)}}else{if(t===0)throw wt.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",e),new Lh(`Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`);if(wt.debug)try{const o=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(o,null,"  "))}catch(o){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",o)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),clearTimeout(s),await n()}})}catch(i){if(t>0&&clearTimeout(s),i!==null&&typeof i=="object"&&"name"in i&&i.name==="AbortError"&&t>0){if(r.signal.aborted)return wt.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock",e),console.warn(`@supabase/gotrue-js: Lock "${e}" was not released within ${t}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`),await Promise.resolve().then(()=>globalThis.navigator.locks.request(e,{mode:"exclusive",steal:!0},async o=>{if(o){wt.debug&&console.log("@supabase/gotrue-js: navigatorLock: recovered (stolen)",e,o.name);try{return await n()}finally{wt.debug&&console.log("@supabase/gotrue-js: navigatorLock: released (stolen)",e,o.name)}}else return console.warn("@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true"),await n()}));throw wt.debug&&console.log("@supabase/gotrue-js: navigatorLock: lock was stolen by another request",e),new Lh(`Lock "${e}" was released because another request stole it`)}throw i}}function r1(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Eg(e){if(!/^0x[a-fA-F0-9]{40}$/.test(e))throw new Error(`@supabase/auth-js: Address "${e}" is invalid.`);return e.toLowerCase()}function s1(e){return parseInt(e,16)}function i1(e){const t=new TextEncoder().encode(e);return"0x"+Array.from(t,r=>r.toString(16).padStart(2,"0")).join("")}function o1(e){var t;const{chainId:n,domain:r,expirationTime:s,issuedAt:i=new Date,nonce:o,notBefore:a,requestId:l,resources:u,scheme:c,uri:h,version:f}=e;{if(!Number.isInteger(n))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${n}`);if(!r)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(o&&o.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${o}`);if(!h)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(f!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${f}`);if(!((t=e.statement)===null||t===void 0)&&t.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e.statement}`)}const p=Eg(e.address),y=c?`${c}://${r}`:r,w=e.statement?`${e.statement}
`:"",b=`${y} wants you to sign in with your Ethereum account:
${p}

${w}`;let v=`URI: ${h}
Version: ${f}
Chain ID: ${n}${o?`
Nonce: ${o}`:""}
Issued At: ${i.toISOString()}`;if(s&&(v+=`
Expiration Time: ${s.toISOString()}`),a&&(v+=`
Not Before: ${a.toISOString()}`),l&&(v+=`
Request ID: ${l}`),u){let m=`
Resources:`;for(const g of u){if(!g||typeof g!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${g}`);m+=`
- ${g}`}v+=m}return`${b}
${v}`}class le extends Error{constructor({message:t,code:n,cause:r,name:s}){var i;super(t,{cause:r}),this.__isWebAuthnError=!0,this.name=(i=s??(r instanceof Error?r.name:void 0))!==null&&i!==void 0?i:"Unknown Error",this.code=n}toJSON(){return{name:this.name,message:this.message,code:this.code}}}class Lo extends le{constructor(t,n){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:n,message:t}),this.name="WebAuthnUnknownError",this.originalError=n}}function a1({error:e,options:t}){var n,r,s;const{publicKey:i}=t;if(!i)throw Error("options was missing required publicKey property");if(e.name==="AbortError"){if(t.signal instanceof AbortSignal)return new le({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else if(e.name==="ConstraintError"){if(((n=i.authenticatorSelection)===null||n===void 0?void 0:n.requireResidentKey)===!0)return new le({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:e});if(t.mediation==="conditional"&&((r=i.authenticatorSelection)===null||r===void 0?void 0:r.userVerification)==="required")return new le({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:e});if(((s=i.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new le({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:e})}else{if(e.name==="InvalidStateError")return new le({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:e});if(e.name==="NotAllowedError")return new le({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if(e.name==="NotSupportedError")return i.pubKeyCredParams.filter(a=>a.type==="public-key").length===0?new le({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:e}):new le({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:e});if(e.name==="SecurityError"){const o=window.location.hostname;if(jg(o)){if(i.rp.id!==o)return new le({message:`The RP ID "${i.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:e})}else return new le({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:e})}else if(e.name==="TypeError"){if(i.user.id.byteLength<1||i.user.id.byteLength>64)return new le({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:e})}else if(e.name==="UnknownError")return new le({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return new le({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e})}function l1({error:e,options:t}){const{publicKey:n}=t;if(!n)throw Error("options was missing required publicKey property");if(e.name==="AbortError"){if(t.signal instanceof AbortSignal)return new le({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else{if(e.name==="NotAllowedError")return new le({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if(e.name==="SecurityError"){const r=window.location.hostname;if(jg(r)){if(n.rpId!==r)return new le({message:`The RP ID "${n.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:e})}else return new le({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:e})}else if(e.name==="UnknownError")return new le({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return new le({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e})}class u1{createNewAbortSignal(){if(this.controller){const n=new Error("Cancelling existing WebAuthn API call for new one");n.name="AbortError",this.controller.abort(n)}const t=new AbortController;return this.controller=t,t.signal}cancelCeremony(){if(this.controller){const t=new Error("Manually cancelling existing WebAuthn API call");t.name="AbortError",this.controller.abort(t),this.controller=void 0}}}const xu=new u1;function Ih(e){if(!e)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(e);const{challenge:t,user:n,excludeCredentials:r}=e,s=ua(e,["challenge","user","excludeCredentials"]),i=Or(t).buffer,o=Object.assign(Object.assign({},n),{id:Or(n.id).buffer}),a=Object.assign(Object.assign({},s),{challenge:i,user:o});if(r&&r.length>0){a.excludeCredentials=new Array(r.length);for(let l=0;l<r.length;l++){const u=r[l];a.excludeCredentials[l]=Object.assign(Object.assign({},u),{id:Or(u.id).buffer,type:u.type||"public-key",transports:u.transports})}}return a}function Dh(e){if(!e)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(e);const{challenge:t,allowCredentials:n}=e,r=ua(e,["challenge","allowCredentials"]),s=Or(t).buffer,i=Object.assign(Object.assign({},r),{challenge:s});if(n&&n.length>0){i.allowCredentials=new Array(n.length);for(let o=0;o<n.length;o++){const a=n[o];i.allowCredentials[o]=Object.assign(Object.assign({},a),{id:Or(a.id).buffer,type:a.type||"public-key",transports:a.transports})}}return i}function Mh(e){var t;if("toJSON"in e&&typeof e.toJSON=="function")return e.toJSON();const n=e;return{id:e.id,rawId:e.id,response:{attestationObject:$n(new Uint8Array(e.response.attestationObject)),clientDataJSON:$n(new Uint8Array(e.response.clientDataJSON))},type:"public-key",clientExtensionResults:e.getClientExtensionResults(),authenticatorAttachment:(t=n.authenticatorAttachment)!==null&&t!==void 0?t:void 0}}function $h(e){var t;if("toJSON"in e&&typeof e.toJSON=="function")return e.toJSON();const n=e,r=e.getClientExtensionResults(),s=e.response;return{id:e.id,rawId:e.id,response:{authenticatorData:$n(new Uint8Array(s.authenticatorData)),clientDataJSON:$n(new Uint8Array(s.clientDataJSON)),signature:$n(new Uint8Array(s.signature)),userHandle:s.userHandle?$n(new Uint8Array(s.userHandle)):void 0},type:"public-key",clientExtensionResults:r,authenticatorAttachment:(t=n.authenticatorAttachment)!==null&&t!==void 0?t:void 0}}function jg(e){return e==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e)}function Io(){var e,t;return!!(we()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.create)=="function"&&typeof((t=navigator==null?void 0:navigator.credentials)===null||t===void 0?void 0:t.get)=="function")}async function Tg(e){try{const t=await navigator.credentials.create(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new Lo("Browser returned unexpected credential type",t)}:{data:null,error:new Lo("Empty credential response",t)}}catch(t){return{data:null,error:a1({error:t,options:e})}}}async function Cg(e){try{const t=await navigator.credentials.get(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new Lo("Browser returned unexpected credential type",t)}:{data:null,error:new Lo("Empty credential response",t)}}catch(t){return{data:null,error:l1({error:t,options:e})}}}const c1={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},d1={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function Do(...e){const t=s=>s!==null&&typeof s=="object"&&!Array.isArray(s),n=s=>s instanceof ArrayBuffer||ArrayBuffer.isView(s),r={};for(const s of e)if(s)for(const i in s){const o=s[i];if(o!==void 0)if(Array.isArray(o))r[i]=o;else if(n(o))r[i]=o;else if(t(o)){const a=r[i];t(a)?r[i]=Do(a,o):r[i]=Do(o)}else r[i]=o}return r}function h1(e,t){return Do(c1,e,t||{})}function f1(e,t){return Do(d1,e,t||{})}class p1{constructor(t){this.client=t,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(t){return this.client.mfa.enroll(Object.assign(Object.assign({},t),{factorType:"webauthn"}))}async _challenge({factorId:t,webauthn:n,friendlyName:r,signal:s},i){var o;try{const{data:a,error:l}=await this.client.mfa.challenge({factorId:t,webauthn:n});if(!a)return{data:null,error:l};const u=s??xu.createNewAbortSignal();if(a.webauthn.type==="create"){const{user:c}=a.webauthn.credential_options.publicKey;if(!c.name){const h=r;if(h)c.name=`${c.id}:${h}`;else{const p=(await this.client.getUser()).data.user,y=((o=p==null?void 0:p.user_metadata)===null||o===void 0?void 0:o.name)||(p==null?void 0:p.email)||(p==null?void 0:p.id)||"User";c.name=`${c.id}:${y}`}}c.displayName||(c.displayName=c.name)}switch(a.webauthn.type){case"create":{const c=h1(a.webauthn.credential_options.publicKey,i==null?void 0:i.create),{data:h,error:f}=await Tg({publicKey:c,signal:u});return h?{data:{factorId:t,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:h}},error:null}:{data:null,error:f}}case"request":{const c=f1(a.webauthn.credential_options.publicKey,i==null?void 0:i.request),{data:h,error:f}=await Cg(Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:c,signal:u}));return h?{data:{factorId:t,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:h}},error:null}:{data:null,error:f}}}}catch(a){return C(a)?{data:null,error:a}:{data:null,error:new ft("Unexpected error in challenge",a)}}}async _verify({challengeId:t,factorId:n,webauthn:r}){return this.client.mfa.verify({factorId:n,challengeId:t,webauthn:r})}async _authenticate({factorId:t,webauthn:{rpId:n=typeof window<"u"?window.location.hostname:void 0,rpOrigins:r=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},i){if(!n)return{data:null,error:new Qs("rpId is required for WebAuthn authentication")};try{if(!Io())return{data:null,error:new ft("Browser does not support WebAuthn",null)};const{data:o,error:a}=await this.challenge({factorId:t,webauthn:{rpId:n,rpOrigins:r},signal:s},{request:i});if(!o)return{data:null,error:a};const{webauthn:l}=o;return this._verify({factorId:t,challengeId:o.challengeId,webauthn:{type:l.type,rpId:n,rpOrigins:r,credential_response:l.credential_response}})}catch(o){return C(o)?{data:null,error:o}:{data:null,error:new ft("Unexpected error in authenticate",o)}}}async _register({friendlyName:t,webauthn:{rpId:n=typeof window<"u"?window.location.hostname:void 0,rpOrigins:r=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},i){if(!n)return{data:null,error:new Qs("rpId is required for WebAuthn registration")};try{if(!Io())return{data:null,error:new ft("Browser does not support WebAuthn",null)};const{data:o,error:a}=await this._enroll({friendlyName:t});if(!o)return await this.client.mfa.listFactors().then(c=>{var h;return(h=c.data)===null||h===void 0?void 0:h.all.find(f=>f.factor_type==="webauthn"&&f.friendly_name===t&&f.status!=="unverified")}).then(c=>c?this.client.mfa.unenroll({factorId:c==null?void 0:c.id}):void 0),{data:null,error:a};const{data:l,error:u}=await this._challenge({factorId:o.id,friendlyName:o.friendly_name,webauthn:{rpId:n,rpOrigins:r},signal:s},{create:i});return l?this._verify({factorId:o.id,challengeId:l.challengeId,webauthn:{rpId:n,rpOrigins:r,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:u}}catch(o){return C(o)?{data:null,error:o}:{data:null,error:new ft("Unexpected error in register",o)}}}}r1();const m1={url:wb,storageKey:xb,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:bb,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1,experimental:{}};async function Uh(e,t,n){return await n()}const sr={};class Xs{get jwks(){var t,n;return(n=(t=sr[this.storageKey])===null||t===void 0?void 0:t.jwks)!==null&&n!==void 0?n:{keys:[]}}set jwks(t){sr[this.storageKey]=Object.assign(Object.assign({},sr[this.storageKey]),{jwks:t})}get jwks_cached_at(){var t,n;return(n=(t=sr[this.storageKey])===null||t===void 0?void 0:t.cachedAt)!==null&&n!==void 0?n:Number.MIN_SAFE_INTEGER}set jwks_cached_at(t){sr[this.storageKey]=Object.assign(Object.assign({},sr[this.storageKey]),{cachedAt:t})}constructor(t){var n,r,s,i;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const o=Object.assign(Object.assign({},m1),t);if(this.storageKey=o.storageKey,this.instanceID=(n=Xs.nextInstanceID[this.storageKey])!==null&&n!==void 0?n:0,Xs.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!o.debug,typeof o.debug=="function"&&(this.logger=o.debug),this.instanceID>0&&we()){const a=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(a),this.logDebugMessages&&console.trace(a)}if(this.persistSession=o.persistSession,this.autoRefreshToken=o.autoRefreshToken,this.experimental=(r=o.experimental)!==null&&r!==void 0?r:{},this.admin=new t1({url:o.url,headers:o.headers,fetch:o.fetch,experimental:this.experimental}),this.url=o.url,this.headers=o.headers,this.fetch=_g(o.fetch),this.lock=o.lock||Uh,this.detectSessionInUrl=o.detectSessionInUrl,this.flowType=o.flowType,this.hasCustomAuthorizationHeader=o.hasCustomAuthorizationHeader,this.throwOnError=o.throwOnError,this.lockAcquireTimeout=o.lockAcquireTimeout,o.lock?this.lock=o.lock:this.persistSession&&we()&&(!((s=globalThis==null?void 0:globalThis.navigator)===null||s===void 0)&&s.locks)?this.lock=n1:this.lock=Uh,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new p1(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.passkey={startRegistration:this._startPasskeyRegistration.bind(this),verifyRegistration:this._verifyPasskeyRegistration.bind(this),startAuthentication:this._startPasskeyAuthentication.bind(this),verifyAuthentication:this._verifyPasskeyAuthentication.bind(this),list:this._listPasskeys.bind(this),update:this._updatePasskey.bind(this),delete:this._deletePasskey.bind(this)},this.persistSession?(o.storage?this.storage=o.storage:kg()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Oh(this.memoryStorage)),o.userStorage&&(this.userStorage=o.userStorage)):(this.memoryStorage={},this.storage=Oh(this.memoryStorage)),we()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(a){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",a)}(i=this.broadcastChannel)===null||i===void 0||i.addEventListener("message",async a=>{this._debug("received broadcast notification from other tab or client",a);try{await this._notifyAllSubscribers(a.data.event,a.data.session,!1)}catch(l){this._debug("#broadcastChannel","error",l)}})}o.skipAutoInitialize||this.initialize().catch(a=>{this._debug("#initialize()","error",a)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(t){if(this.throwOnError&&t&&t.error)throw t.error;return t}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${wg}) ${new Date().toISOString()}`}_debug(...t){return this.logDebugMessages&&this.logger(this._logPrefix(),...t),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var t;try{let n={},r="none";if(we()&&(n=Ib(window.location.href),this._isImplicitGrantCallback(n)?r="implicit":await this._isPKCECallback(n)&&(r="pkce")),we()&&this.detectSessionInUrl&&r!=="none"){const{data:s,error:i}=await this._getSessionFromURL(n,r);if(i){if(this._debug("#_initialize()","error detecting session from URL",i),jb(i)){const l=(t=i.details)===null||t===void 0?void 0:t.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:i}}return{error:i}}const{session:o,redirectType:a}=s;return this._debug("#_initialize()","detected session in URL",o,"redirect type",a),await this._saveSession(o),setTimeout(async()=>{a==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",o):await this._notifyAllSubscribers("SIGNED_IN",o)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(n){return C(n)?this._returnResult({error:n}):this._returnResult({error:new ft("Unexpected error during initialization",n)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(t){var n,r,s;try{const i=await N(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(r=(n=t==null?void 0:t.options)===null||n===void 0?void 0:n.data)!==null&&r!==void 0?r:{},gotrue_meta_security:{captcha_token:(s=t==null?void 0:t.options)===null||s===void 0?void 0:s.captchaToken}},xform:Ze}),{data:o,error:a}=i;if(a||!o)return this._returnResult({data:{user:null,session:null},error:a});const l=o.session,u=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:u,session:l},error:null})}catch(i){if(C(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async signUp(t){var n,r,s;try{let i;if("email"in t){const{email:c,password:h,options:f}=t;let p=null,y=null;this.flowType==="pkce"&&([p,y]=await rr(this.storage,this.storageKey)),i=await N(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:f==null?void 0:f.emailRedirectTo,body:{email:c,password:h,data:(n=f==null?void 0:f.data)!==null&&n!==void 0?n:{},gotrue_meta_security:{captcha_token:f==null?void 0:f.captchaToken},code_challenge:p,code_challenge_method:y},xform:Ze})}else if("phone"in t){const{phone:c,password:h,options:f}=t;i=await N(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:c,password:h,data:(r=f==null?void 0:f.data)!==null&&r!==void 0?r:{},channel:(s=f==null?void 0:f.channel)!==null&&s!==void 0?s:"sms",gotrue_meta_security:{captcha_token:f==null?void 0:f.captchaToken}},xform:Ze})}else throw new Di("You must provide either an email or phone number and a password");const{data:o,error:a}=i;if(a||!o)return await ve(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:a});const l=o.session,u=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:u,session:l},error:null})}catch(i){if(await ve(this.storage,`${this.storageKey}-code-verifier`),C(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async signInWithPassword(t){try{let n;if("email"in t){const{email:i,password:o,options:a}=t;n=await N(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:i,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:Rh})}else if("phone"in t){const{phone:i,password:o,options:a}=t;n=await N(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:i,password:o,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:Rh})}else throw new Di("You must provide either an email or phone number and a password");const{data:r,error:s}=n;if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!r||!r.session||!r.user){const i=new nr;return this._returnResult({data:{user:null,session:null},error:i})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),this._returnResult({data:Object.assign({user:r.user,session:r.session},r.weak_password?{weakPassword:r.weak_password}:null),error:s})}catch(n){if(C(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithOAuth(t){var n,r,s,i;return await this._handleProviderSignIn(t.provider,{redirectTo:(n=t.options)===null||n===void 0?void 0:n.redirectTo,scopes:(r=t.options)===null||r===void 0?void 0:r.scopes,queryParams:(s=t.options)===null||s===void 0?void 0:s.queryParams,skipBrowserRedirect:(i=t.options)===null||i===void 0?void 0:i.skipBrowserRedirect})}async exchangeCodeForSession(t){return await this.initializePromise,this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(t))}async signInWithWeb3(t){const{chain:n}=t;switch(n){case"ethereum":return await this.signInWithEthereum(t);case"solana":return await this.signInWithSolana(t);default:throw new Error(`@supabase/auth-js: Unsupported chain "${n}"`)}}async signInWithEthereum(t){var n,r,s,i,o,a,l,u,c,h,f;let p,y;if("message"in t)p=t.message,y=t.signature;else{const{chain:w,wallet:b,statement:v,options:m}=t;let g;if(we())if(typeof b=="object")g=b;else{const R=window;if("ethereum"in R&&typeof R.ethereum=="object"&&"request"in R.ethereum&&typeof R.ethereum.request=="function")g=R.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof b!="object"||!(m!=null&&m.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");g=b}const x=new URL((n=m==null?void 0:m.url)!==null&&n!==void 0?n:window.location.href),_=await g.request({method:"eth_requestAccounts"}).then(R=>R).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!_||_.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const S=Eg(_[0]);let j=(r=m==null?void 0:m.signInWithEthereum)===null||r===void 0?void 0:r.chainId;if(!j){const R=await g.request({method:"eth_chainId"});j=s1(R)}const E={domain:x.host,address:S,statement:v,uri:x.href,version:"1",chainId:j,nonce:(s=m==null?void 0:m.signInWithEthereum)===null||s===void 0?void 0:s.nonce,issuedAt:(o=(i=m==null?void 0:m.signInWithEthereum)===null||i===void 0?void 0:i.issuedAt)!==null&&o!==void 0?o:new Date,expirationTime:(a=m==null?void 0:m.signInWithEthereum)===null||a===void 0?void 0:a.expirationTime,notBefore:(l=m==null?void 0:m.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(u=m==null?void 0:m.signInWithEthereum)===null||u===void 0?void 0:u.requestId,resources:(c=m==null?void 0:m.signInWithEthereum)===null||c===void 0?void 0:c.resources};p=o1(E),y=await g.request({method:"personal_sign",params:[i1(p),S]})}try{const{data:w,error:b}=await N(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:p,signature:y},!((h=t.options)===null||h===void 0)&&h.captchaToken?{gotrue_meta_security:{captcha_token:(f=t.options)===null||f===void 0?void 0:f.captchaToken}}:null),xform:Ze});if(b)throw b;if(!w||!w.session||!w.user){const v=new nr;return this._returnResult({data:{user:null,session:null},error:v})}return w.session&&(await this._saveSession(w.session),await this._notifyAllSubscribers("SIGNED_IN",w.session)),this._returnResult({data:Object.assign({},w),error:b})}catch(w){if(C(w))return this._returnResult({data:{user:null,session:null},error:w});throw w}}async signInWithSolana(t){var n,r,s,i,o,a,l,u,c,h,f,p;let y,w;if("message"in t)y=t.message,w=t.signature;else{const{chain:b,wallet:v,statement:m,options:g}=t;let x;if(we())if(typeof v=="object")x=v;else{const S=window;if("solana"in S&&typeof S.solana=="object"&&("signIn"in S.solana&&typeof S.solana.signIn=="function"||"signMessage"in S.solana&&typeof S.solana.signMessage=="function"))x=S.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof v!="object"||!(g!=null&&g.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");x=v}const _=new URL((n=g==null?void 0:g.url)!==null&&n!==void 0?n:window.location.href);if("signIn"in x&&x.signIn){const S=await x.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},g==null?void 0:g.signInWithSolana),{version:"1",domain:_.host,uri:_.href}),m?{statement:m}:null));let j;if(Array.isArray(S)&&S[0]&&typeof S[0]=="object")j=S[0];else if(S&&typeof S=="object"&&"signedMessage"in S&&"signature"in S)j=S;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in j&&"signature"in j&&(typeof j.signedMessage=="string"||j.signedMessage instanceof Uint8Array)&&j.signature instanceof Uint8Array)y=typeof j.signedMessage=="string"?j.signedMessage:new TextDecoder().decode(j.signedMessage),w=j.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in x)||typeof x.signMessage!="function"||!("publicKey"in x)||typeof x!="object"||!x.publicKey||!("toBase58"in x.publicKey)||typeof x.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");y=[`${_.host} wants you to sign in with your Solana account:`,x.publicKey.toBase58(),...m?["",m,""]:[""],"Version: 1",`URI: ${_.href}`,`Issued At: ${(s=(r=g==null?void 0:g.signInWithSolana)===null||r===void 0?void 0:r.issuedAt)!==null&&s!==void 0?s:new Date().toISOString()}`,...!((i=g==null?void 0:g.signInWithSolana)===null||i===void 0)&&i.notBefore?[`Not Before: ${g.signInWithSolana.notBefore}`]:[],...!((o=g==null?void 0:g.signInWithSolana)===null||o===void 0)&&o.expirationTime?[`Expiration Time: ${g.signInWithSolana.expirationTime}`]:[],...!((a=g==null?void 0:g.signInWithSolana)===null||a===void 0)&&a.chainId?[`Chain ID: ${g.signInWithSolana.chainId}`]:[],...!((l=g==null?void 0:g.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${g.signInWithSolana.nonce}`]:[],...!((u=g==null?void 0:g.signInWithSolana)===null||u===void 0)&&u.requestId?[`Request ID: ${g.signInWithSolana.requestId}`]:[],...!((h=(c=g==null?void 0:g.signInWithSolana)===null||c===void 0?void 0:c.resources)===null||h===void 0)&&h.length?["Resources",...g.signInWithSolana.resources.map(j=>`- ${j}`)]:[]].join(`
`);const S=await x.signMessage(new TextEncoder().encode(y),"utf8");if(!S||!(S instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");w=S}}try{const{data:b,error:v}=await N(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:y,signature:$n(w)},!((f=t.options)===null||f===void 0)&&f.captchaToken?{gotrue_meta_security:{captcha_token:(p=t.options)===null||p===void 0?void 0:p.captchaToken}}:null),xform:Ze});if(v)throw v;if(!b||!b.session||!b.user){const m=new nr;return this._returnResult({data:{user:null,session:null},error:m})}return b.session&&(await this._saveSession(b.session),await this._notifyAllSubscribers("SIGNED_IN",b.session)),this._returnResult({data:Object.assign({},b),error:v})}catch(b){if(C(b))return this._returnResult({data:{user:null,session:null},error:b});throw b}}async _exchangeCodeForSession(t){const n=await Tn(this.storage,`${this.storageKey}-code-verifier`),[r,s]=(n??"").split("/");try{if(!r&&this.flowType==="pkce")throw new Tb;const{data:i,error:o}=await N(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:t,code_verifier:r},xform:Ze});if(await ve(this.storage,`${this.storageKey}-code-verifier`),o)throw o;if(!i||!i.session||!i.user){const a=new nr;return this._returnResult({data:{user:null,session:null,redirectType:null},error:a})}return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers(s==="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",i.session)),this._returnResult({data:Object.assign(Object.assign({},i),{redirectType:s??null}),error:o})}catch(i){if(await ve(this.storage,`${this.storageKey}-code-verifier`),C(i))return this._returnResult({data:{user:null,session:null,redirectType:null},error:i});throw i}}async signInWithIdToken(t){try{const{options:n,provider:r,token:s,access_token:i,nonce:o}=t,a=await N(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:r,id_token:s,access_token:i,nonce:o,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}},xform:Ze}),{data:l,error:u}=a;if(u)return this._returnResult({data:{user:null,session:null},error:u});if(!l||!l.session||!l.user){const c=new nr;return this._returnResult({data:{user:null,session:null},error:c})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:u})}catch(n){if(C(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithOtp(t){var n,r,s,i,o;try{if("email"in t){const{email:a,options:l}=t;let u=null,c=null;this.flowType==="pkce"&&([u,c]=await rr(this.storage,this.storageKey));const{error:h}=await N(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:a,data:(n=l==null?void 0:l.data)!==null&&n!==void 0?n:{},create_user:(r=l==null?void 0:l.shouldCreateUser)!==null&&r!==void 0?r:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:u,code_challenge_method:c},redirectTo:l==null?void 0:l.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:h})}if("phone"in t){const{phone:a,options:l}=t,{data:u,error:c}=await N(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:a,data:(s=l==null?void 0:l.data)!==null&&s!==void 0?s:{},create_user:(i=l==null?void 0:l.shouldCreateUser)!==null&&i!==void 0?i:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(o=l==null?void 0:l.channel)!==null&&o!==void 0?o:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:u==null?void 0:u.message_id},error:c})}throw new Di("You must provide either an email or phone number.")}catch(a){if(await ve(this.storage,`${this.storageKey}-code-verifier`),C(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async verifyOtp(t){var n,r;try{let s,i;"options"in t&&(s=(n=t.options)===null||n===void 0?void 0:n.redirectTo,i=(r=t.options)===null||r===void 0?void 0:r.captchaToken);const{data:o,error:a}=await N(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},t),{gotrue_meta_security:{captcha_token:i}}),redirectTo:s,xform:Ze});if(a)throw a;if(!o)throw new Error("An error occurred on token verification.");const l=o.session,u=o.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(t.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:u,session:l},error:null})}catch(s){if(C(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async signInWithSSO(t){var n,r,s,i,o;try{let a=null,l=null;this.flowType==="pkce"&&([a,l]=await rr(this.storage,this.storageKey));const u=await N(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in t?{provider_id:t.providerId}:null),"domain"in t?{domain:t.domain}:null),{redirect_to:(r=(n=t.options)===null||n===void 0?void 0:n.redirectTo)!==null&&r!==void 0?r:void 0}),!((s=t==null?void 0:t.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:t.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:a,code_challenge_method:l}),headers:this.headers,xform:Xb});return!((i=u.data)===null||i===void 0)&&i.url&&we()&&!(!((o=t.options)===null||o===void 0)&&o.skipBrowserRedirect)&&window.location.assign(u.data.url),this._returnResult(u)}catch(a){if(await ve(this.storage,`${this.storageKey}-code-verifier`),C(a))return this._returnResult({data:null,error:a});throw a}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async t=>{const{data:{session:n},error:r}=t;if(r)throw r;if(!n)throw new me;const{error:s}=await N(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:n.access_token});return this._returnResult({data:{user:null,session:null},error:s})})}catch(t){if(C(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async resend(t){try{const n=`${this.url}/resend`;if("email"in t){const{email:r,type:s,options:i}=t,{error:o}=await N(this.fetch,"POST",n,{headers:this.headers,body:{email:r,type:s,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}},redirectTo:i==null?void 0:i.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:o})}else if("phone"in t){const{phone:r,type:s,options:i}=t,{data:o,error:a}=await N(this.fetch,"POST",n,{headers:this.headers,body:{phone:r,type:s,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:o==null?void 0:o.message_id},error:a})}throw new Di("You must provide either an email or phone number and a type")}catch(n){if(C(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async getSession(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async n=>n))}async _acquireLock(t,n){this._debug("#_acquireLock","begin",t);try{if(this.lockAcquired){const r=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),s=(async()=>(await r,await n()))();return this.pendingInLock.push((async()=>{try{await s}catch{}})()),s}return await this.lock(`lock:${this.storageKey}`,t,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const r=n();for(this.pendingInLock.push((async()=>{try{await r}catch{}})()),await r;this.pendingInLock.length;){const s=[...this.pendingInLock];await Promise.all(s),this.pendingInLock.splice(0,s.length)}return await r}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(t){this._debug("#_useSession","begin");try{const n=await this.__loadSession();return await t(n)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let t=null;const n=await Tn(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",n),n!==null&&(this._isValidSession(n)?t=n:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!t)return{data:{session:null},error:null};const r=t.expires_at?t.expires_at*1e3-Date.now()<Ga:!1;if(this._debug("#__loadSession()",`session has${r?"":" not"} expired`,"expires_at",t.expires_at),!r){if(this.userStorage){const o=await Tn(this.userStorage,this.storageKey+"-user");o!=null&&o.user?t.user=o.user:t.user=Ya()}if(this.storage.isServer&&t.user&&!t.user.__isUserNotAvailableProxy){const o={value:this.suppressGetSessionWarning};t.user=Gb(t.user,o),o.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:t},error:null}}const{data:s,error:i}=await this._callRefreshToken(t.refresh_token);return i?this._returnResult({data:{session:null},error:i}):this._returnResult({data:{session:s},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(t){if(t)return await this._getUser(t);await this.initializePromise;const n=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser());return n.data.user&&(this.suppressGetSessionWarning=!0),n}async _getUser(t){try{return t?await N(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:t,xform:en}):await this._useSession(async n=>{var r,s,i;const{data:o,error:a}=n;if(a)throw a;return!(!((r=o.session)===null||r===void 0)&&r.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new me}:await N(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(i=(s=o.session)===null||s===void 0?void 0:s.access_token)!==null&&i!==void 0?i:void 0,xform:en})})}catch(n){if(C(n))return Ii(n)&&(await this._removeSession(),await ve(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:n});throw n}}async updateUser(t,n={}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(t,n))}async _updateUser(t,n={}){try{return await this._useSession(async r=>{const{data:s,error:i}=r;if(i)throw i;if(!s.session)throw new me;const o=s.session;let a=null,l=null;this.flowType==="pkce"&&t.email!=null&&([a,l]=await rr(this.storage,this.storageKey));const{data:u,error:c}=await N(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:n==null?void 0:n.emailRedirectTo,body:Object.assign(Object.assign({},t),{code_challenge:a,code_challenge_method:l}),jwt:o.access_token,xform:en});if(c)throw c;return o.user=u.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),this._returnResult({data:{user:o.user},error:null})})}catch(r){if(await ve(this.storage,`${this.storageKey}-code-verifier`),C(r))return this._returnResult({data:{user:null},error:r});throw r}}async setSession(t){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(t))}async _setSession(t){try{if(!t.access_token||!t.refresh_token)throw new me;const n=Date.now()/1e3;let r=n,s=!0,i=null;const{payload:o}=$i(t.access_token);if(o.exp&&(r=o.exp,s=r<=n),s){const{data:a,error:l}=await this._callRefreshToken(t.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!a)return{data:{user:null,session:null},error:null};i=a}else{const{data:a,error:l}=await this._getUser(t.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});i={access_token:t.access_token,refresh_token:t.refresh_token,user:a.user,token_type:"bearer",expires_in:r-n,expires_at:r},await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)}return this._returnResult({data:{user:i.user,session:i},error:null})}catch(n){if(C(n))return this._returnResult({data:{session:null,user:null},error:n});throw n}}async refreshSession(t){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(t))}async _refreshSession(t){try{return await this._useSession(async n=>{var r;if(!t){const{data:o,error:a}=n;if(a)throw a;t=(r=o.session)!==null&&r!==void 0?r:void 0}if(!(t!=null&&t.refresh_token))throw new me;const{data:s,error:i}=await this._callRefreshToken(t.refresh_token);return i?this._returnResult({data:{user:null,session:null},error:i}):s?this._returnResult({data:{user:s.user,session:s},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(n){if(C(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async _getSessionFromURL(t,n){var r;try{if(!we())throw new Mi("No browser detected.");if(t.error||t.error_description||t.error_code)throw new Mi(t.error_description||"Error in URL with unspecified error_description",{error:t.error||"unspecified_error",code:t.error_code||"unspecified_code"});switch(n){case"implicit":if(this.flowType==="pkce")throw new Sh("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Mi("Not a valid implicit grant flow url.");break;default:}if(n==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!t.code)throw new Sh("No code detected.");const{data:g,error:x}=await this._exchangeCodeForSession(t.code);if(x)throw x;const _=new URL(window.location.href);return _.searchParams.delete("code"),window.history.replaceState(window.history.state,"",_.toString()),{data:{session:g.session,redirectType:(r=g.redirectType)!==null&&r!==void 0?r:null},error:null}}const{provider_token:s,provider_refresh_token:i,access_token:o,refresh_token:a,expires_in:l,expires_at:u,token_type:c}=t;if(!o||!l||!a||!c)throw new Mi("No session defined in URL");const h=Math.round(Date.now()/1e3),f=parseInt(l);let p=h+f;u&&(p=parseInt(u));const y=p-h;y*1e3<=ar&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${y}s, should have been closer to ${f}s`);const w=p-f;h-w>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",w,p,h):h-w<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",w,p,h);const{data:b,error:v}=await this._getUser(o);if(v)throw v;const m={provider_token:s,provider_refresh_token:i,access_token:o,expires_in:f,expires_at:p,refresh_token:a,token_type:c,user:b.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:m,redirectType:t.type},error:null})}catch(s){if(C(s))return this._returnResult({data:{session:null,redirectType:null},error:s});throw s}}_isImplicitGrantCallback(t){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),t):!!(t.access_token||t.error_description)}async _isPKCECallback(t){const n=await Tn(this.storage,`${this.storageKey}-code-verifier`);return!!(t.code&&n)}async signOut(t={scope:"global"}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(t))}async _signOut({scope:t}={scope:"global"}){return await this._useSession(async n=>{var r;const{data:s,error:i}=n;if(i&&!Ii(i))return this._returnResult({error:i});const o=(r=s.session)===null||r===void 0?void 0:r.access_token;if(o){const{error:a}=await this.admin.signOut(o,t);if(a&&!(Eb(a)&&(a.status===404||a.status===401||a.status===403)||Ii(a)))return this._returnResult({error:a})}return t!=="others"&&(await this._removeSession(),await ve(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(t){const n=Lb(),r={id:n,callback:t,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",n),this.stateChangeEmitters.delete(n)}};return this._debug("#onAuthStateChange()","registered callback with id",n),this.stateChangeEmitters.set(n,r),(async()=>(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(n)})))(),{data:{subscription:r}}}async _emitInitialSession(t){return await this._useSession(async n=>{var r,s;try{const{data:{session:i},error:o}=n;if(o)throw o;await((r=this.stateChangeEmitters.get(t))===null||r===void 0?void 0:r.callback("INITIAL_SESSION",i)),this._debug("INITIAL_SESSION","callback id",t,"session",i)}catch(i){await((s=this.stateChangeEmitters.get(t))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",t,"error",i),Ii(i)?console.warn(i):console.error(i)}})}async resetPasswordForEmail(t,n={}){let r=null,s=null;this.flowType==="pkce"&&([r,s]=await rr(this.storage,this.storageKey,!0));try{return await N(this.fetch,"POST",`${this.url}/recover`,{body:{email:t,code_challenge:r,code_challenge_method:s,gotrue_meta_security:{captcha_token:n.captchaToken}},headers:this.headers,redirectTo:n.redirectTo})}catch(i){if(await ve(this.storage,`${this.storageKey}-code-verifier`),C(i))return this._returnResult({data:null,error:i});throw i}}async getUserIdentities(){var t;try{const{data:n,error:r}=await this.getUser();if(r)throw r;return this._returnResult({data:{identities:(t=n.user.identities)!==null&&t!==void 0?t:[]},error:null})}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}}async linkIdentity(t){return"token"in t?this.linkIdentityIdToken(t):this.linkIdentityOAuth(t)}async linkIdentityOAuth(t){var n;try{const{data:r,error:s}=await this._useSession(async i=>{var o,a,l,u,c;const{data:h,error:f}=i;if(f)throw f;const p=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,t.provider,{redirectTo:(o=t.options)===null||o===void 0?void 0:o.redirectTo,scopes:(a=t.options)===null||a===void 0?void 0:a.scopes,queryParams:(l=t.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await N(this.fetch,"GET",p,{headers:this.headers,jwt:(c=(u=h.session)===null||u===void 0?void 0:u.access_token)!==null&&c!==void 0?c:void 0})});if(s)throw s;return we()&&!(!((n=t.options)===null||n===void 0)&&n.skipBrowserRedirect)&&window.location.assign(r==null?void 0:r.url),this._returnResult({data:{provider:t.provider,url:r==null?void 0:r.url},error:null})}catch(r){if(C(r))return this._returnResult({data:{provider:t.provider,url:null},error:r});throw r}}async linkIdentityIdToken(t){return await this._useSession(async n=>{var r;try{const{error:s,data:{session:i}}=n;if(s)throw s;const{options:o,provider:a,token:l,access_token:u,nonce:c}=t,h=await N(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(r=i==null?void 0:i.access_token)!==null&&r!==void 0?r:void 0,body:{provider:a,id_token:l,access_token:u,nonce:c,link_identity:!0,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:Ze}),{data:f,error:p}=h;return p?this._returnResult({data:{user:null,session:null},error:p}):!f||!f.session||!f.user?this._returnResult({data:{user:null,session:null},error:new nr}):(f.session&&(await this._saveSession(f.session),await this._notifyAllSubscribers("USER_UPDATED",f.session)),this._returnResult({data:f,error:p}))}catch(s){if(await ve(this.storage,`${this.storageKey}-code-verifier`),C(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}})}async unlinkIdentity(t){try{return await this._useSession(async n=>{var r,s;const{data:i,error:o}=n;if(o)throw o;return await N(this.fetch,"DELETE",`${this.url}/user/identities/${t.identity_id}`,{headers:this.headers,jwt:(s=(r=i.session)===null||r===void 0?void 0:r.access_token)!==null&&s!==void 0?s:void 0})})}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}}async _refreshAccessToken(t){const n=`#_refreshAccessToken(${t.substring(0,5)}...)`;this._debug(n,"begin");try{const r=Date.now();return await $b(async s=>(s>0&&await Mb(200*Math.pow(2,s-1)),this._debug(n,"refreshing attempt",s),await N(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:t},headers:this.headers,xform:Ze})),(s,i)=>{const o=200*Math.pow(2,s);return i&&Ja(i)&&Date.now()+o-r<ar})}catch(r){if(this._debug(n,"error",r),C(r))return this._returnResult({data:{session:null,user:null},error:r});throw r}finally{this._debug(n,"end")}}_isValidSession(t){return typeof t=="object"&&t!==null&&"access_token"in t&&"refresh_token"in t&&"expires_at"in t}async _handleProviderSignIn(t,n){const r=await this._getUrlForProvider(`${this.url}/authorize`,t,{redirectTo:n.redirectTo,scopes:n.scopes,queryParams:n.queryParams});return this._debug("#_handleProviderSignIn()","provider",t,"options",n,"url",r),we()&&!n.skipBrowserRedirect&&window.location.assign(r),{data:{provider:t,url:r},error:null}}async _recoverAndRefresh(){var t,n;const r="#_recoverAndRefresh()";this._debug(r,"begin");try{const s=await Tn(this.storage,this.storageKey);if(s&&this.userStorage){let o=await Tn(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!o&&(o={user:s.user},await lr(this.userStorage,this.storageKey+"-user",o)),s.user=(t=o==null?void 0:o.user)!==null&&t!==void 0?t:Ya()}else if(s&&!s.user&&!s.user){const o=await Tn(this.storage,this.storageKey+"-user");o&&(o!=null&&o.user)?(s.user=o.user,await ve(this.storage,this.storageKey+"-user"),await lr(this.storage,this.storageKey,s)):s.user=Ya()}if(this._debug(r,"session from storage",s),!this._isValidSession(s)){this._debug(r,"session is not valid"),s!==null&&await this._removeSession();return}const i=((n=s.expires_at)!==null&&n!==void 0?n:1/0)*1e3-Date.now()<Ga;if(this._debug(r,`session has${i?"":" not"} expired with margin of ${Ga}s`),i){if(this.autoRefreshToken&&s.refresh_token){const{error:o}=await this._callRefreshToken(s.refresh_token);o&&(console.error(o),Ja(o)||(this._debug(r,"refresh failed with a non-retryable error, removing the session",o),await this._removeSession()))}}else if(s.user&&s.user.__isUserNotAvailableProxy===!0)try{const{data:o,error:a}=await this._getUser(s.access_token);!a&&(o!=null&&o.user)?(s.user=o.user,await this._saveSession(s),await this._notifyAllSubscribers("SIGNED_IN",s)):this._debug(r,"could not get user data, skipping SIGNED_IN notification")}catch(o){console.error("Error getting user data:",o),this._debug(r,"error getting user data, skipping SIGNED_IN notification",o)}else await this._notifyAllSubscribers("SIGNED_IN",s)}catch(s){this._debug(r,"error",s),console.error(s);return}finally{this._debug(r,"end")}}async _callRefreshToken(t){var n,r;if(!t)throw new me;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const s=`#_callRefreshToken(${t.substring(0,5)}...)`;this._debug(s,"begin");try{this.refreshingDeferred=new ha;const{data:i,error:o}=await this._refreshAccessToken(t);if(o)throw o;if(!i.session)throw new me;await this._saveSession(i.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",i.session);const a={data:i.session,error:null};return this.refreshingDeferred.resolve(a),a}catch(i){if(this._debug(s,"error",i),C(i)){const o={data:null,error:i};return Ja(i)||await this._removeSession(),(n=this.refreshingDeferred)===null||n===void 0||n.resolve(o),o}throw(r=this.refreshingDeferred)===null||r===void 0||r.reject(i),i}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(t,n,r=!0){const s=`#_notifyAllSubscribers(${t})`;this._debug(s,"begin",n,`broadcast = ${r}`);try{this.broadcastChannel&&r&&this.broadcastChannel.postMessage({event:t,session:n});const i=[],o=Array.from(this.stateChangeEmitters.values()).map(async a=>{try{await a.callback(t,n)}catch(l){i.push(l)}});if(await Promise.all(o),i.length>0){for(let a=0;a<i.length;a+=1)console.error(i[a]);throw i[0]}}finally{this._debug(s,"end")}}async _saveSession(t){this._debug("#_saveSession()",t),this.suppressGetSessionWarning=!0,await ve(this.storage,`${this.storageKey}-code-verifier`);const n=Object.assign({},t),r=n.user&&n.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!r&&n.user&&await lr(this.userStorage,this.storageKey+"-user",{user:n.user});const s=Object.assign({},n);delete s.user;const i=Ph(s);await lr(this.storage,this.storageKey,i)}else{const s=Ph(n);await lr(this.storage,this.storageKey,s)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await ve(this.storage,this.storageKey),await ve(this.storage,this.storageKey+"-code-verifier"),await ve(this.storage,this.storageKey+"-user"),this.userStorage&&await ve(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const t=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{t&&we()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",t)}catch(n){console.error("removing visibilitychange callback failed",n)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const t=setInterval(()=>this._autoRefreshTokenTick(),ar);this.autoRefreshTicker=t,t&&typeof t=="object"&&typeof t.unref=="function"?t.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(t);const n=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=n,n&&typeof n=="object"&&typeof n.unref=="function"?n.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(n)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const t=this.autoRefreshTicker;this.autoRefreshTicker=null,t&&clearInterval(t);const n=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,n&&clearTimeout(n)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const t=Date.now();try{return await this._useSession(async n=>{const{data:{session:r}}=n;if(!r||!r.refresh_token||!r.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const s=Math.floor((r.expires_at*1e3-t)/ar);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${ar}ms, refresh threshold is ${gu} ticks`),s<=gu&&await this._callRefreshToken(r.refresh_token)})}catch(n){console.error("Auto refresh tick failed with error. This is likely a transient error.",n)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(t){if(t instanceof Sg)this._debug("auto refresh token tick lock not available");else throw t}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!we()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(t){this._debug("#visibilityChangedCallback","error",t)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(t){console.error("_handleVisibilityChange",t)}}async _onVisibilityChanged(t){const n=`#_onVisibilityChanged(${t})`;this._debug(n,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),t||(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(n,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(t,n,r){const s=[`provider=${encodeURIComponent(n)}`];if(r!=null&&r.redirectTo&&s.push(`redirect_to=${encodeURIComponent(r.redirectTo)}`),r!=null&&r.scopes&&s.push(`scopes=${encodeURIComponent(r.scopes)}`),this.flowType==="pkce"){const[i,o]=await rr(this.storage,this.storageKey),a=new URLSearchParams({code_challenge:`${encodeURIComponent(i)}`,code_challenge_method:`${encodeURIComponent(o)}`});s.push(a.toString())}if(r!=null&&r.queryParams){const i=new URLSearchParams(r.queryParams);s.push(i.toString())}return r!=null&&r.skipBrowserRedirect&&s.push(`skip_http_redirect=${r.skipBrowserRedirect}`),`${t}?${s.join("&")}`}async _unenroll(t){try{return await this._useSession(async n=>{var r;const{data:s,error:i}=n;return i?this._returnResult({data:null,error:i}):await N(this.fetch,"DELETE",`${this.url}/factors/${t.factorId}`,{headers:this.headers,jwt:(r=s==null?void 0:s.session)===null||r===void 0?void 0:r.access_token})})}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}}async _enroll(t){try{return await this._useSession(async n=>{var r,s;const{data:i,error:o}=n;if(o)return this._returnResult({data:null,error:o});const a=Object.assign({friendly_name:t.friendlyName,factor_type:t.factorType},t.factorType==="phone"?{phone:t.phone}:t.factorType==="totp"?{issuer:t.issuer}:{}),{data:l,error:u}=await N(this.fetch,"POST",`${this.url}/factors`,{body:a,headers:this.headers,jwt:(r=i==null?void 0:i.session)===null||r===void 0?void 0:r.access_token});return u?this._returnResult({data:null,error:u}):(t.factorType==="totp"&&l.type==="totp"&&(!((s=l==null?void 0:l.totp)===null||s===void 0)&&s.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}}async _verify(t){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async n=>{var r;const{data:s,error:i}=n;if(i)return this._returnResult({data:null,error:i});const o=Object.assign({challenge_id:t.challengeId},"webauthn"in t?{webauthn:Object.assign(Object.assign({},t.webauthn),{credential_response:t.webauthn.type==="create"?Mh(t.webauthn.credential_response):$h(t.webauthn.credential_response)})}:{code:t.code}),{data:a,error:l}=await N(this.fetch,"POST",`${this.url}/factors/${t.factorId}/verify`,{body:o,headers:this.headers,jwt:(r=s==null?void 0:s.session)===null||r===void 0?void 0:r.access_token});return l?this._returnResult({data:null,error:l}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+a.expires_in},a)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",a),this._returnResult({data:a,error:l}))})}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}})}async _challenge(t){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async n=>{var r;const{data:s,error:i}=n;if(i)return this._returnResult({data:null,error:i});const o=await N(this.fetch,"POST",`${this.url}/factors/${t.factorId}/challenge`,{body:t,headers:this.headers,jwt:(r=s==null?void 0:s.session)===null||r===void 0?void 0:r.access_token});if(o.error)return o;const{data:a}=o;if(a.type!=="webauthn")return{data:a,error:null};switch(a.webauthn.type){case"create":return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:Ih(a.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:Dh(a.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}})}async _challengeAndVerify(t){const{data:n,error:r}=await this._challenge({factorId:t.factorId});return r?this._returnResult({data:null,error:r}):await this._verify({factorId:t.factorId,challengeId:n.id,code:t.code})}async _listFactors(){var t;const{data:{user:n},error:r}=await this.getUser();if(r)return{data:null,error:r};const s={all:[],phone:[],totp:[],webauthn:[]};for(const i of(t=n==null?void 0:n.factors)!==null&&t!==void 0?t:[])s.all.push(i),i.status==="verified"&&s[i.factor_type].push(i);return{data:s,error:null}}async _getAuthenticatorAssuranceLevel(t){var n,r,s,i;if(t)try{const{payload:p}=$i(t);let y=null;p.aal&&(y=p.aal);let w=y;const{data:{user:b},error:v}=await this.getUser(t);if(v)return this._returnResult({data:null,error:v});((r=(n=b==null?void 0:b.factors)===null||n===void 0?void 0:n.filter(x=>x.status==="verified"))!==null&&r!==void 0?r:[]).length>0&&(w="aal2");const g=p.amr||[];return{data:{currentLevel:y,nextLevel:w,currentAuthenticationMethods:g},error:null}}catch(p){if(C(p))return this._returnResult({data:null,error:p});throw p}const{data:{session:o},error:a}=await this.getSession();if(a)return this._returnResult({data:null,error:a});if(!o)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=$i(o.access_token);let u=null;l.aal&&(u=l.aal);let c=u;((i=(s=o.user.factors)===null||s===void 0?void 0:s.filter(p=>p.status==="verified"))!==null&&i!==void 0?i:[]).length>0&&(c="aal2");const f=l.amr||[];return{data:{currentLevel:u,nextLevel:c,currentAuthenticationMethods:f},error:null}}async _getAuthorizationDetails(t){try{return await this._useSession(async n=>{const{data:{session:r},error:s}=n;return s?this._returnResult({data:null,error:s}):r?await N(this.fetch,"GET",`${this.url}/oauth/authorizations/${t}`,{headers:this.headers,jwt:r.access_token,xform:i=>({data:i,error:null})}):this._returnResult({data:null,error:new me})})}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}}async _approveAuthorization(t,n){try{return await this._useSession(async r=>{const{data:{session:s},error:i}=r;if(i)return this._returnResult({data:null,error:i});if(!s)return this._returnResult({data:null,error:new me});const o=await N(this.fetch,"POST",`${this.url}/oauth/authorizations/${t}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"approve"},xform:a=>({data:a,error:null})});return o.data&&o.data.redirect_url&&we()&&!(n!=null&&n.skipBrowserRedirect)&&window.location.assign(o.data.redirect_url),o})}catch(r){if(C(r))return this._returnResult({data:null,error:r});throw r}}async _denyAuthorization(t,n){try{return await this._useSession(async r=>{const{data:{session:s},error:i}=r;if(i)return this._returnResult({data:null,error:i});if(!s)return this._returnResult({data:null,error:new me});const o=await N(this.fetch,"POST",`${this.url}/oauth/authorizations/${t}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"deny"},xform:a=>({data:a,error:null})});return o.data&&o.data.redirect_url&&we()&&!(n!=null&&n.skipBrowserRedirect)&&window.location.assign(o.data.redirect_url),o})}catch(r){if(C(r))return this._returnResult({data:null,error:r});throw r}}async _listOAuthGrants(){try{return await this._useSession(async t=>{const{data:{session:n},error:r}=t;return r?this._returnResult({data:null,error:r}):n?await N(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:n.access_token,xform:s=>({data:s,error:null})}):this._returnResult({data:null,error:new me})})}catch(t){if(C(t))return this._returnResult({data:null,error:t});throw t}}async _revokeOAuthGrant(t){try{return await this._useSession(async n=>{const{data:{session:r},error:s}=n;return s?this._returnResult({data:null,error:s}):r?(await N(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:r.access_token,query:{client_id:t.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new me})})}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}}async fetchJwk(t,n={keys:[]}){let r=n.keys.find(a=>a.kid===t);if(r)return r;const s=Date.now();if(r=this.jwks.keys.find(a=>a.kid===t),r&&this.jwks_cached_at+_b>s)return r;const{data:i,error:o}=await N(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(o)throw o;return!i.keys||i.keys.length===0||(this.jwks=i,this.jwks_cached_at=s,r=i.keys.find(a=>a.kid===t),!r)?null:r}async getClaims(t,n={}){try{let r=t;if(!r){const{data:p,error:y}=await this.getSession();if(y||!p.session)return this._returnResult({data:null,error:y});r=p.session.access_token}const{header:s,payload:i,signature:o,raw:{header:a,payload:l}}=$i(r);n!=null&&n.allowExpired||Wb(i.exp);const u=!s.alg||s.alg.startsWith("HS")||!s.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(s.kid,n!=null&&n.keys?{keys:n.keys}:n==null?void 0:n.jwks);if(!u){const{error:p}=await this.getUser(r);if(p)throw p;return{data:{claims:i,header:s,signature:o},error:null}}const c=qb(s.alg),h=await crypto.subtle.importKey("jwk",u,c,!0,["verify"]);if(!await crypto.subtle.verify(c,h,o,Nb(`${a}.${l}`)))throw new wu("Invalid JWT signature");return{data:{claims:i,header:s,signature:o},error:null}}catch(r){if(C(r))return this._returnResult({data:null,error:r});throw r}}async signInWithPasskey(t){var n,r,s;lt(this.experimental);try{if(!Io())return this._returnResult({data:null,error:new ft("Browser does not support WebAuthn",null)});const{data:i,error:o}=await this._startPasskeyAuthentication({options:{captchaToken:(n=t==null?void 0:t.options)===null||n===void 0?void 0:n.captchaToken}});if(o||!i)return this._returnResult({data:null,error:o});const a=Dh(i.options),l=(s=(r=t==null?void 0:t.options)===null||r===void 0?void 0:r.signal)!==null&&s!==void 0?s:xu.createNewAbortSignal(),{data:u,error:c}=await Cg({publicKey:a,signal:l});if(c||!u)return this._returnResult({data:null,error:c??new ft("WebAuthn ceremony failed",null)});const h=$h(u);return this._verifyPasskeyAuthentication({challengeId:i.challenge_id,credential:h})}catch(i){if(C(i))return this._returnResult({data:null,error:i});throw i}}async registerPasskey(t){var n,r;lt(this.experimental);try{if(!Io())return this._returnResult({data:null,error:new ft("Browser does not support WebAuthn",null)});const{data:s,error:i}=await this._startPasskeyRegistration();if(i||!s)return this._returnResult({data:null,error:i});const o=Ih(s.options),a=(r=(n=t==null?void 0:t.options)===null||n===void 0?void 0:n.signal)!==null&&r!==void 0?r:xu.createNewAbortSignal(),{data:l,error:u}=await Tg({publicKey:o,signal:a});if(u||!l)return this._returnResult({data:null,error:u??new ft("WebAuthn ceremony failed",null)});const c=Mh(l);return this._verifyPasskeyRegistration({challengeId:s.challenge_id,credential:c})}catch(s){if(C(s))return this._returnResult({data:null,error:s});throw s}}async _startPasskeyRegistration(){lt(this.experimental);try{return await this._useSession(async t=>{const{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new me});const{data:s,error:i}=await N(this.fetch,"POST",`${this.url}/passkeys/registration/options`,{headers:this.headers,jwt:n.access_token,body:{}});return i?this._returnResult({data:null,error:i}):this._returnResult({data:s,error:null})})}catch(t){if(C(t))return this._returnResult({data:null,error:t});throw t}}async _verifyPasskeyRegistration(t){lt(this.experimental);try{return await this._useSession(async n=>{const{data:{session:r},error:s}=n;if(s)return this._returnResult({data:null,error:s});if(!r)return this._returnResult({data:null,error:new me});const{data:i,error:o}=await N(this.fetch,"POST",`${this.url}/passkeys/registration/verify`,{headers:this.headers,jwt:r.access_token,body:{challenge_id:t.challengeId,credential:t.credential}});return o?this._returnResult({data:null,error:o}):this._returnResult({data:i,error:null})})}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}}async _startPasskeyAuthentication(t){var n;lt(this.experimental);try{const{data:r,error:s}=await N(this.fetch,"POST",`${this.url}/passkeys/authentication/options`,{headers:this.headers,body:{gotrue_meta_security:{captcha_token:(n=t==null?void 0:t.options)===null||n===void 0?void 0:n.captchaToken}}});return s?this._returnResult({data:null,error:s}):this._returnResult({data:r,error:null})}catch(r){if(C(r))return this._returnResult({data:null,error:r});throw r}}async _verifyPasskeyAuthentication(t){lt(this.experimental);try{const{data:n,error:r}=await N(this.fetch,"POST",`${this.url}/passkeys/authentication/verify`,{headers:this.headers,body:{challenge_id:t.challengeId,credential:t.credential},xform:Ze});return r?this._returnResult({data:null,error:r}):(n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),this._returnResult({data:n,error:null}))}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}}async _listPasskeys(){lt(this.experimental);try{return await this._useSession(async t=>{const{data:{session:n},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!n)return this._returnResult({data:null,error:new me});const{data:s,error:i}=await N(this.fetch,"GET",`${this.url}/passkeys`,{headers:this.headers,jwt:n.access_token,xform:o=>({data:o,error:null})});return i?this._returnResult({data:null,error:i}):this._returnResult({data:s,error:null})})}catch(t){if(C(t))return this._returnResult({data:null,error:t});throw t}}async _updatePasskey(t){lt(this.experimental);try{return await this._useSession(async n=>{const{data:{session:r},error:s}=n;if(s)return this._returnResult({data:null,error:s});if(!r)return this._returnResult({data:null,error:new me});const{data:i,error:o}=await N(this.fetch,"PATCH",`${this.url}/passkeys/${t.passkeyId}`,{headers:this.headers,jwt:r.access_token,body:{friendly_name:t.friendlyName}});return o?this._returnResult({data:null,error:o}):this._returnResult({data:i,error:null})})}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}}async _deletePasskey(t){lt(this.experimental);try{return await this._useSession(async n=>{const{data:{session:r},error:s}=n;if(s)return this._returnResult({data:null,error:s});if(!r)return this._returnResult({data:null,error:new me});const{error:i}=await N(this.fetch,"DELETE",`${this.url}/passkeys/${t.passkeyId}`,{headers:this.headers,jwt:r.access_token,noResolveJson:!0});return i?this._returnResult({data:null,error:i}):this._returnResult({data:null,error:null})})}catch(n){if(C(n))return this._returnResult({data:null,error:n});throw n}}}Xs.nextInstanceID={};const g1=Xs,y1="2.105.4";let cs="";typeof Deno<"u"?cs="deno":typeof document<"u"?cs="web":typeof navigator<"u"&&navigator.product==="ReactNative"?cs="react-native":cs="node";const v1={"X-Client-Info":`supabase-js-${cs}/${y1}`},w1={headers:v1},x1={schema:"public"},b1={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},k1={};function Zs(e){"@babel/helpers - typeof";return Zs=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Zs(e)}function _1(e,t){if(Zs(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||"default");if(Zs(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function S1(e){var t=_1(e,"string");return Zs(t)=="symbol"?t:t+""}function E1(e,t,n){return(t=S1(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function zh(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),n.push.apply(n,r)}return n}function te(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?zh(Object(n),!0).forEach(function(r){E1(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):zh(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}const j1=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),T1=()=>Headers,C1=(e,t,n)=>{const r=j1(n),s=T1();return async(i,o)=>{var a;const l=(a=await t())!==null&&a!==void 0?a:e;let u=new s(o==null?void 0:o.headers);return u.has("apikey")||u.set("apikey",e),u.has("Authorization")||u.set("Authorization",`Bearer ${l}`),r(i,te(te({},o),{},{headers:u}))}};function P1(e){return e.endsWith("/")?e:e+"/"}function A1(e,t){var n,r;const{db:s,auth:i,realtime:o,global:a}=e,{db:l,auth:u,realtime:c,global:h}=t,f={db:te(te({},l),s),auth:te(te({},u),i),realtime:te(te({},c),o),storage:{},global:te(te(te({},h),a),{},{headers:te(te({},(n=h==null?void 0:h.headers)!==null&&n!==void 0?n:{}),(r=a==null?void 0:a.headers)!==null&&r!==void 0?r:{})}),accessToken:async()=>""};return e.accessToken?f.accessToken=e.accessToken:delete f.accessToken,f}function R1(e){const t=e==null?void 0:e.trim();if(!t)throw new Error("supabaseUrl is required.");if(!t.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(P1(t))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var N1=class extends g1{constructor(e){super(e)}},O1=class{constructor(e,t,n){var r,s;this.supabaseUrl=e,this.supabaseKey=t;const i=R1(e);if(!t)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",i),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",i),this.storageUrl=new URL("storage/v1",i),this.functionsUrl=new URL("functions/v1",i);const o=`sb-${i.hostname.split(".")[0]}-auth-token`,a={db:x1,realtime:k1,auth:te(te({},b1),{},{storageKey:o}),global:w1},l=A1(n??{},a);if(this.storageKey=(r=l.auth.storageKey)!==null&&r!==void 0?r:"",this.headers=(s=l.global.headers)!==null&&s!==void 0?s:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(c,h)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(h)} is not possible`)}});else{var u;this.auth=this._initSupabaseAuthClient((u=l.auth)!==null&&u!==void 0?u:{},this.headers,l.global.fetch)}this.fetch=C1(t,this._getAccessToken.bind(this),l.global.fetch),this.realtime=this._initRealtimeClient(te({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(c=>this.realtime.setAuth(c)).catch(c=>console.warn("Failed to set initial Realtime auth token:",c)),this.rest=new ix(new URL("rest/v1",i).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit}),this.storage=new vb(this.storageUrl.href,this.headers,this.fetch,n==null?void 0:n.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new Jw(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},n={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,n)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var e=this,t,n;if(e.accessToken)return await e.accessToken();const{data:r}=await e.auth.getSession();return(t=(n=r.session)===null||n===void 0?void 0:n.access_token)!==null&&t!==void 0?t:e.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:r,userStorage:s,storageKey:i,flowType:o,lock:a,debug:l,throwOnError:u,experimental:c,lockAcquireTimeout:h,skipAutoInitialize:f},p,y){const w={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new N1({url:this.authUrl.href,headers:te(te({},w),p),storageKey:i,autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:r,userStorage:s,flowType:o,lock:a,debug:l,throwOnError:u,experimental:c,fetch:y,lockAcquireTimeout:h,skipAutoInitialize:f,hasCustomAuthorizationHeader:Object.keys(this.headers).some(b=>b.toLowerCase()==="authorization")})}_initRealtimeClient(e){return new Bx(this.realtimeUrl.href,te(te({},e),{},{params:te(te({},{apikey:this.supabaseKey}),e==null?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((e,t)=>{this._handleTokenChanged(e,"CLIENT",t==null?void 0:t.access_token)})}_handleTokenChanged(e,t,n){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==n?(this.changedAccessToken=n,this.realtime.setAuth(n)):e==="SIGNED_OUT"&&(this.realtime.setAuth(),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const L1=(e,t,n)=>new O1(e,t,n);function I1(){if(typeof window<"u")return!1;const e=globalThis.process;if(!e)return!1;const t=e.version;if(t==null)return!1;const n=t.match(/^v(\d+)\./);return n?parseInt(n[1],10)<=18:!1}I1()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const D1="https://kkcuyoxbrblbocazsjfn.supabase.co",M1="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrY3V5b3hicmJsYm9jYXpzamZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1ODM2NzAsImV4cCI6MjA5NDE1OTY3MH0.EDUnpxC_6QQiofjZDk37NExKIHPKdbLhBIzUfJ9Q-iY",F=L1(D1,M1),Pg=k.createContext({}),$1=({children:e})=>{const[t,n]=k.useState(null),[r,s]=k.useState(null),[i,o]=k.useState(!0);k.useEffect(()=>{F.auth.getSession().then(({data:{session:h}})=>{n((h==null?void 0:h.user)??null),h!=null&&h.user?a(h.user.id):o(!1)});const{data:{subscription:c}}=F.auth.onAuthStateChange(async(h,f)=>{const p=(f==null?void 0:f.user)??null;n(p),p?a(p.id):(s(null),o(!1))});return()=>c.unsubscribe()},[]);const a=async c=>{const{data:h,error:f}=await F.from("profiles").select("*").eq("id",c).single();h&&s(h),o(!1)},l=async()=>{const{error:c}=await F.auth.signInWithOAuth({provider:"google",options:{redirectTo:"https://azanabdullah2752012-ui.github.io/scholarQ/"}});return{error:c}},u=async()=>{await F.auth.signOut()};return d.jsx(Pg.Provider,{value:{user:t,profile:r,loading:i,signInWithGoogle:l,signOut:u,setProfile:s},children:e})},Ye=()=>k.useContext(Pg),Ag=k.createContext({}),U1=({children:e})=>{const[t,n]=k.useState(localStorage.getItem("theme")||"dark");k.useEffect(()=>{document.documentElement.setAttribute("data-theme",t),localStorage.setItem("theme",t)},[t]);const r=()=>{n(s=>s==="dark"?"light":"dark")};return d.jsx(Ag.Provider,{value:{theme:t,toggleTheme:r},children:e})},Rg=()=>k.useContext(Ag);function z1({activeTab:e,setActiveTab:t}){var c;const{theme:n,toggleTheme:r}=Rg(),{profile:s}=Ye(),l=(s==null?void 0:s.role)==="Scholar"||(s==null?void 0:s.role)==="Elite Scholar"?[{icon:Ao,label:"Scholar Hub"},{icon:Kn,label:"Unanswered Feed"},{icon:gn,label:"My Answers"},{icon:au,label:"Student Requests"},{icon:Ws,label:"Leaderboard"},{icon:iu,label:"Notifications"},{icon:qs,label:"Profile"}]:[{icon:Ao,label:"Home"},{icon:au,label:"Ask Doubt"},{icon:Kn,label:"My Doubts"},{icon:gn,label:"Answers"},{icon:Ws,label:"Scholars"},{icon:iu,label:"Notifications"},{icon:qs,label:"Profile"}],u=n==="dark";return d.jsxs("aside",{className:"sidebar",children:[d.jsxs("div",{className:"sidebar-brand",children:[d.jsx("div",{className:"brand-icon",children:d.jsx(ou,{size:28,color:"white"})}),d.jsxs("div",{className:"brand-text",children:[d.jsx("h2",{className:"brand-font",children:"ScholarQ"}),d.jsx("p",{children:"Ask. Learn. Excel."})]})]}),d.jsx("nav",{className:"sidebar-nav",children:l.map(h=>d.jsxs("div",{className:`nav-item ${e===h.label?"active":""}`,onClick:()=>t(h.label),children:[d.jsx(h.icon,{size:20}),d.jsx("span",{children:h.label})]},h.label))}),d.jsxs("div",{className:"status-card",children:[d.jsxs("div",{className:"status-header",children:[d.jsx("span",{children:"Your Status"}),d.jsxs("span",{className:"scholar-badge",children:[d.jsx(ou,{size:12}),(s==null?void 0:s.role)||"Scholar"]})]}),d.jsxs("div",{className:"status-grid",children:[d.jsxs("div",{className:"status-row",children:[d.jsx("span",{className:"label",children:"Points"}),d.jsx("span",{className:"value",style:{color:"#F59E0B"},children:(s==null?void 0:s.points)||0})]}),d.jsxs("div",{className:"status-row",children:[d.jsx("span",{className:"label",children:"Score"}),d.jsxs("span",{className:"value",children:[(s==null?void 0:s.academic_percentage)||"0","%"]})]}),d.jsxs("div",{className:"status-row",children:[d.jsx("span",{className:"label",children:"Subjects"}),d.jsx("span",{className:"value",children:((c=s==null?void 0:s.subjects)==null?void 0:c.length)||0})]}),d.jsxs("div",{className:"status-row",children:[d.jsx("span",{className:"label",children:"Reputation"}),d.jsx("span",{className:"value primary",children:(s==null?void 0:s.reputation)||"A+"})]})]}),d.jsx("button",{className:"btn-view-profile",onClick:()=>t("Profile"),children:"View Profile"})]}),d.jsx("div",{className:"sidebar-footer",children:d.jsxs("div",{className:`dark-mode-toggle ${u?"active":""}`,onClick:r,children:[d.jsx(Uw,{size:18}),d.jsx("span",{children:u?"Dark Mode":"Light Mode"}),d.jsx("div",{className:"toggle-switch",children:d.jsx("div",{className:`toggle-knob ${u?"on":"off"}`})})]})}),d.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .sidebar {
          width: var(--sidebar-width);
          background-color: var(--bg-surface);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 24px;
          flex-shrink: 0;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
        }

        .brand-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, var(--primary) 0%, #6366F1 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }

        .brand-text h2 {
          font-size: 1.25rem;
          letter-spacing: -0.02em;
        }

        .brand-text p {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 10px;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .nav-item:hover {
          color: var(--text-main);
          background-color: rgba(255, 255, 255, 0.05);
        }

        .nav-item.active {
          background-color: rgba(79, 70, 229, 0.15);
          color: var(--primary);
          box-shadow: inset 0 0 0 1px rgba(79, 70, 229, 0.2);
        }

        .status-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          margin-top: 24px;
        }

        .status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .scholar-badge {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10B981;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .status-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .status-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status-row .label {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .status-row .value {
          font-weight: 700;
          font-size: 1rem;
        }

        .status-row .value.primary {
          color: var(--primary);
        }

        .btn-view-profile {
          width: 100%;
          padding: 10px;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-view-profile:hover {
          background-color: var(--primary-hover);
        }

        .sidebar-footer {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }

        .dark-mode-toggle {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          border-radius: 10px;
          transition: background 0.2s;
        }

        .dark-mode-toggle:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .toggle-switch {
          margin-left: auto;
          width: 32px;
          height: 18px;
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2px;
          display: flex;
          align-items: center;
        }

        .toggle-knob {
          width: 12px;
          height: 12px;
          background-color: var(--text-muted);
          border-radius: 50%;
          transition: all 0.2s;
        }

        .toggle-knob.on {
          transform: translateX(14px);
          background-color: var(--primary);
        }
      `}})]})}function B1({setActiveTab:e,onSearch:t}){const{profile:n}=Ye(),r=(n==null?void 0:n.role)==="Scholar"||(n==null?void 0:n.role)==="Elite Scholar",[s,i]=jr.useState(!1),[o,a]=jr.useState("");jr.useEffect(()=>{const u=setTimeout(()=>{t==null||t(o)},300);return()=>clearTimeout(u)},[o]);const l=()=>{e("Ask Doubt")};return d.jsxs("header",{className:"topbar",children:[d.jsxs("div",{className:"search-container",children:[d.jsx(la,{size:18,color:"#8B949E"}),d.jsx("input",{type:"text",placeholder:"Search doubts, subjects or topics...",className:"search-input",value:o,onChange:u=>a(u.target.value)})]}),!r&&d.jsx("button",{className:"btn-ask",onClick:l,disabled:s,children:s?d.jsx("div",{className:"spinner"}):d.jsxs(d.Fragment,{children:[d.jsx(Vw,{size:18}),d.jsx("span",{children:"Ask Doubt"})]})}),d.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .btn-ask:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .topbar {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          border-bottom: 1px solid var(--border);
          background-color: var(--bg-deep);
          z-index: 10;
        }

        .search-container {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0 16px;
          width: 60%;
          height: 48px;
          transition: border-color 0.2s;
        }

        .search-container:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .search-input {
          background: none;
          border: none;
          color: var(--text-main);
          font-size: 0.95rem;
          width: 100%;
          outline: none;
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .btn-ask {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--primary);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-ask:hover {
          background-color: var(--primary-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
        }

        .btn-ask:active {
          transform: translateY(0);
        }
      `}})]})}const Ng=k.createContext({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"}),fa=k.createContext({}),pa=k.createContext(null),ma=typeof document<"u",Nc=ma?k.useLayoutEffect:k.useEffect,Og=k.createContext({strict:!1}),Oc=e=>e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),V1="framerAppearId",Lg="data-"+Oc(V1);function F1(e,t,n,r){const{visualElement:s}=k.useContext(fa),i=k.useContext(Og),o=k.useContext(pa),a=k.useContext(Ng).reducedMotion,l=k.useRef();r=r||i.renderer,!l.current&&r&&(l.current=r(e,{visualState:t,parent:s,props:n,presenceContext:o,blockInitialAnimation:o?o.initial===!1:!1,reducedMotionConfig:a}));const u=l.current;k.useInsertionEffect(()=>{u&&u.update(n,o)});const c=k.useRef(!!(n[Lg]&&!window.HandoffComplete));return Nc(()=>{u&&(u.render(),c.current&&u.animationState&&u.animationState.animateChanges())}),k.useEffect(()=>{u&&(u.updateFeatures(),!c.current&&u.animationState&&u.animationState.animateChanges(),c.current&&(c.current=!1,window.HandoffComplete=!0))}),u}function kr(e){return e&&typeof e=="object"&&Object.prototype.hasOwnProperty.call(e,"current")}function H1(e,t,n){return k.useCallback(r=>{r&&e.mount&&e.mount(r),t&&(r?t.mount(r):t.unmount()),n&&(typeof n=="function"?n(r):kr(n)&&(n.current=r))},[t])}function ei(e){return typeof e=="string"||Array.isArray(e)}function ga(e){return e!==null&&typeof e=="object"&&typeof e.start=="function"}const Lc=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Ic=["initial",...Lc];function ya(e){return ga(e.animate)||Ic.some(t=>ei(e[t]))}function Ig(e){return!!(ya(e)||e.variants)}function W1(e,t){if(ya(e)){const{initial:n,animate:r}=e;return{initial:n===!1||ei(n)?n:void 0,animate:ei(r)?r:void 0}}return e.inherit!==!1?t:{}}function q1(e){const{initial:t,animate:n}=W1(e,k.useContext(fa));return k.useMemo(()=>({initial:t,animate:n}),[Bh(t),Bh(n)])}function Bh(e){return Array.isArray(e)?e.join(" "):e}const Vh={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},ti={};for(const e in Vh)ti[e]={isEnabled:t=>Vh[e].some(n=>!!t[n])};function K1(e){for(const t in e)ti[t]={...ti[t],...e[t]}}const Dc=k.createContext({}),Dg=k.createContext({}),G1=Symbol.for("motionComponentSymbol");function J1({preloadedFeatures:e,createVisualElement:t,useRender:n,useVisualState:r,Component:s}){e&&K1(e);function i(a,l){let u;const c={...k.useContext(Ng),...a,layoutId:Y1(a)},{isStatic:h}=c,f=q1(a),p=r(a,h);if(!h&&ma){f.visualElement=F1(s,p,c,t);const y=k.useContext(Dg),w=k.useContext(Og).strict;f.visualElement&&(u=f.visualElement.loadFeatures(c,w,e,y))}return k.createElement(fa.Provider,{value:f},u&&f.visualElement?k.createElement(u,{visualElement:f.visualElement,...c}):null,n(s,a,H1(p,f.visualElement,l),p,h,f.visualElement))}const o=k.forwardRef(i);return o[G1]=s,o}function Y1({layoutId:e}){const t=k.useContext(Dc).id;return t&&e!==void 0?t+"-"+e:e}function Q1(e){function t(r,s={}){return J1(e(r,s))}if(typeof Proxy>"u")return t;const n=new Map;return new Proxy(t,{get:(r,s)=>(n.has(s)||n.set(s,t(s)),n.get(s))})}const X1=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function Mc(e){return typeof e!="string"||e.includes("-")?!1:!!(X1.indexOf(e)>-1||/[A-Z]/.test(e))}const Mo={};function Z1(e){Object.assign(Mo,e)}const ui=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Yn=new Set(ui);function Mg(e,{layout:t,layoutId:n}){return Yn.has(e)||e.startsWith("origin")||(t||n!==void 0)&&(!!Mo[e]||e==="opacity")}const ze=e=>!!(e&&e.getVelocity),ek={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},tk=ui.length;function nk(e,{enableHardwareAcceleration:t=!0,allowTransformNone:n=!0},r,s){let i="";for(let o=0;o<tk;o++){const a=ui[o];if(e[a]!==void 0){const l=ek[a]||a;i+=`${l}(${e[a]}) `}}return t&&!e.z&&(i+="translateZ(0)"),i=i.trim(),s?i=s(e,r?"":i):n&&r&&(i="none"),i}const $g=e=>t=>typeof t=="string"&&t.startsWith(e),Ug=$g("--"),bu=$g("var(--"),rk=/var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)/g,sk=(e,t)=>t&&typeof e=="number"?t.transform(e):e,yn=(e,t,n)=>Math.min(Math.max(n,e),t),Qn={test:e=>typeof e=="number",parse:parseFloat,transform:e=>e},Ss={...Qn,transform:e=>yn(0,1,e)},Ui={...Qn,default:1},Es=e=>Math.round(e*1e5)/1e5,va=/(-)?([\d]*\.?[\d])+/g,zg=/(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi,ik=/^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;function ci(e){return typeof e=="string"}const di=e=>({test:t=>ci(t)&&t.endsWith(e)&&t.split(" ").length===1,parse:parseFloat,transform:t=>`${t}${e}`}),Kt=di("deg"),jt=di("%"),I=di("px"),ok=di("vh"),ak=di("vw"),Fh={...jt,parse:e=>jt.parse(e)/100,transform:e=>jt.transform(e*100)},Hh={...Qn,transform:Math.round},Bg={borderWidth:I,borderTopWidth:I,borderRightWidth:I,borderBottomWidth:I,borderLeftWidth:I,borderRadius:I,radius:I,borderTopLeftRadius:I,borderTopRightRadius:I,borderBottomRightRadius:I,borderBottomLeftRadius:I,width:I,maxWidth:I,height:I,maxHeight:I,size:I,top:I,right:I,bottom:I,left:I,padding:I,paddingTop:I,paddingRight:I,paddingBottom:I,paddingLeft:I,margin:I,marginTop:I,marginRight:I,marginBottom:I,marginLeft:I,rotate:Kt,rotateX:Kt,rotateY:Kt,rotateZ:Kt,scale:Ui,scaleX:Ui,scaleY:Ui,scaleZ:Ui,skew:Kt,skewX:Kt,skewY:Kt,distance:I,translateX:I,translateY:I,translateZ:I,x:I,y:I,z:I,perspective:I,transformPerspective:I,opacity:Ss,originX:Fh,originY:Fh,originZ:I,zIndex:Hh,fillOpacity:Ss,strokeOpacity:Ss,numOctaves:Hh};function $c(e,t,n,r){const{style:s,vars:i,transform:o,transformOrigin:a}=e;let l=!1,u=!1,c=!0;for(const h in t){const f=t[h];if(Ug(h)){i[h]=f;continue}const p=Bg[h],y=sk(f,p);if(Yn.has(h)){if(l=!0,o[h]=y,!c)continue;f!==(p.default||0)&&(c=!1)}else h.startsWith("origin")?(u=!0,a[h]=y):s[h]=y}if(t.transform||(l||r?s.transform=nk(e.transform,n,c,r):s.transform&&(s.transform="none")),u){const{originX:h="50%",originY:f="50%",originZ:p=0}=a;s.transformOrigin=`${h} ${f} ${p}`}}const Uc=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function Vg(e,t,n){for(const r in t)!ze(t[r])&&!Mg(r,n)&&(e[r]=t[r])}function lk({transformTemplate:e},t,n){return k.useMemo(()=>{const r=Uc();return $c(r,t,{enableHardwareAcceleration:!n},e),Object.assign({},r.vars,r.style)},[t])}function uk(e,t,n){const r=e.style||{},s={};return Vg(s,r,e),Object.assign(s,lk(e,t,n)),e.transformValues?e.transformValues(s):s}function ck(e,t,n){const r={},s=uk(e,t,n);return e.drag&&e.dragListener!==!1&&(r.draggable=!1,s.userSelect=s.WebkitUserSelect=s.WebkitTouchCallout="none",s.touchAction=e.drag===!0?"none":`pan-${e.drag==="x"?"y":"x"}`),e.tabIndex===void 0&&(e.onTap||e.onTapStart||e.whileTap)&&(r.tabIndex=0),r.style=s,r}const dk=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","transformValues","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function $o(e){return e.startsWith("while")||e.startsWith("drag")&&e!=="draggable"||e.startsWith("layout")||e.startsWith("onTap")||e.startsWith("onPan")||e.startsWith("onLayout")||dk.has(e)}let Fg=e=>!$o(e);function hk(e){e&&(Fg=t=>t.startsWith("on")?!$o(t):e(t))}try{hk(require("@emotion/is-prop-valid").default)}catch{}function fk(e,t,n){const r={};for(const s in e)s==="values"&&typeof e.values=="object"||(Fg(s)||n===!0&&$o(s)||!t&&!$o(s)||e.draggable&&s.startsWith("onDrag"))&&(r[s]=e[s]);return r}function Wh(e,t,n){return typeof e=="string"?e:I.transform(t+n*e)}function pk(e,t,n){const r=Wh(t,e.x,e.width),s=Wh(n,e.y,e.height);return`${r} ${s}`}const mk={offset:"stroke-dashoffset",array:"stroke-dasharray"},gk={offset:"strokeDashoffset",array:"strokeDasharray"};function yk(e,t,n=1,r=0,s=!0){e.pathLength=1;const i=s?mk:gk;e[i.offset]=I.transform(-r);const o=I.transform(t),a=I.transform(n);e[i.array]=`${o} ${a}`}function zc(e,{attrX:t,attrY:n,attrScale:r,originX:s,originY:i,pathLength:o,pathSpacing:a=1,pathOffset:l=0,...u},c,h,f){if($c(e,u,c,f),h){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};const{attrs:p,style:y,dimensions:w}=e;p.transform&&(w&&(y.transform=p.transform),delete p.transform),w&&(s!==void 0||i!==void 0||y.transform)&&(y.transformOrigin=pk(w,s!==void 0?s:.5,i!==void 0?i:.5)),t!==void 0&&(p.x=t),n!==void 0&&(p.y=n),r!==void 0&&(p.scale=r),o!==void 0&&yk(p,o,a,l,!1)}const Hg=()=>({...Uc(),attrs:{}}),Bc=e=>typeof e=="string"&&e.toLowerCase()==="svg";function vk(e,t,n,r){const s=k.useMemo(()=>{const i=Hg();return zc(i,t,{enableHardwareAcceleration:!1},Bc(r),e.transformTemplate),{...i.attrs,style:{...i.style}}},[t]);if(e.style){const i={};Vg(i,e.style,e),s.style={...i,...s.style}}return s}function wk(e=!1){return(n,r,s,{latestValues:i},o)=>{const l=(Mc(n)?vk:ck)(r,i,o,n),c={...fk(r,typeof n=="string",e),...l,ref:s},{children:h}=r,f=k.useMemo(()=>ze(h)?h.get():h,[h]);return k.createElement(n,{...c,children:f})}}function Wg(e,{style:t,vars:n},r,s){Object.assign(e.style,t,s&&s.getProjectionStyles(r));for(const i in n)e.style.setProperty(i,n[i])}const qg=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function Kg(e,t,n,r){Wg(e,t,void 0,r);for(const s in t.attrs)e.setAttribute(qg.has(s)?s:Oc(s),t.attrs[s])}function Vc(e,t){const{style:n}=e,r={};for(const s in n)(ze(n[s])||t.style&&ze(t.style[s])||Mg(s,e))&&(r[s]=n[s]);return r}function Gg(e,t){const n=Vc(e,t);for(const r in e)if(ze(e[r])||ze(t[r])){const s=ui.indexOf(r)!==-1?"attr"+r.charAt(0).toUpperCase()+r.substring(1):r;n[s]=e[r]}return n}function Fc(e,t,n,r={},s={}){return typeof t=="function"&&(t=t(n!==void 0?n:e.custom,r,s)),typeof t=="string"&&(t=e.variants&&e.variants[t]),typeof t=="function"&&(t=t(n!==void 0?n:e.custom,r,s)),t}function Jg(e){const t=k.useRef(null);return t.current===null&&(t.current=e()),t.current}const Uo=e=>Array.isArray(e),xk=e=>!!(e&&typeof e=="object"&&e.mix&&e.toValue),bk=e=>Uo(e)?e[e.length-1]||0:e;function ro(e){const t=ze(e)?e.get():e;return xk(t)?t.toValue():t}function kk({scrapeMotionValuesFromProps:e,createRenderState:t,onMount:n},r,s,i){const o={latestValues:_k(r,s,i,e),renderState:t()};return n&&(o.mount=a=>n(r,a,o)),o}const Yg=e=>(t,n)=>{const r=k.useContext(fa),s=k.useContext(pa),i=()=>kk(e,t,r,s);return n?i():Jg(i)};function _k(e,t,n,r){const s={},i=r(e,{});for(const f in i)s[f]=ro(i[f]);let{initial:o,animate:a}=e;const l=ya(e),u=Ig(e);t&&u&&!l&&e.inherit!==!1&&(o===void 0&&(o=t.initial),a===void 0&&(a=t.animate));let c=n?n.initial===!1:!1;c=c||o===!1;const h=c?a:o;return h&&typeof h!="boolean"&&!ga(h)&&(Array.isArray(h)?h:[h]).forEach(p=>{const y=Fc(e,p);if(!y)return;const{transitionEnd:w,transition:b,...v}=y;for(const m in v){let g=v[m];if(Array.isArray(g)){const x=c?g.length-1:0;g=g[x]}g!==null&&(s[m]=g)}for(const m in w)s[m]=w[m]}),s}const re=e=>e;class qh{constructor(){this.order=[],this.scheduled=new Set}add(t){if(!this.scheduled.has(t))return this.scheduled.add(t),this.order.push(t),!0}remove(t){const n=this.order.indexOf(t);n!==-1&&(this.order.splice(n,1),this.scheduled.delete(t))}clear(){this.order.length=0,this.scheduled.clear()}}function Sk(e){let t=new qh,n=new qh,r=0,s=!1,i=!1;const o=new WeakSet,a={schedule:(l,u=!1,c=!1)=>{const h=c&&s,f=h?t:n;return u&&o.add(l),f.add(l)&&h&&s&&(r=t.order.length),l},cancel:l=>{n.remove(l),o.delete(l)},process:l=>{if(s){i=!0;return}if(s=!0,[t,n]=[n,t],n.clear(),r=t.order.length,r)for(let u=0;u<r;u++){const c=t.order[u];c(l),o.has(c)&&(a.schedule(c),e())}s=!1,i&&(i=!1,a.process(l))}};return a}const zi=["prepare","read","update","preRender","render","postRender"],Ek=40;function jk(e,t){let n=!1,r=!0;const s={delta:0,timestamp:0,isProcessing:!1},i=zi.reduce((h,f)=>(h[f]=Sk(()=>n=!0),h),{}),o=h=>i[h].process(s),a=()=>{const h=performance.now();n=!1,s.delta=r?1e3/60:Math.max(Math.min(h-s.timestamp,Ek),1),s.timestamp=h,s.isProcessing=!0,zi.forEach(o),s.isProcessing=!1,n&&t&&(r=!1,e(a))},l=()=>{n=!0,r=!0,s.isProcessing||e(a)};return{schedule:zi.reduce((h,f)=>{const p=i[f];return h[f]=(y,w=!1,b=!1)=>(n||l(),p.schedule(y,w,b)),h},{}),cancel:h=>zi.forEach(f=>i[f].cancel(h)),state:s,steps:i}}const{schedule:q,cancel:Vt,state:Ee,steps:Xa}=jk(typeof requestAnimationFrame<"u"?requestAnimationFrame:re,!0),Tk={useVisualState:Yg({scrapeMotionValuesFromProps:Gg,createRenderState:Hg,onMount:(e,t,{renderState:n,latestValues:r})=>{q.read(()=>{try{n.dimensions=typeof t.getBBox=="function"?t.getBBox():t.getBoundingClientRect()}catch{n.dimensions={x:0,y:0,width:0,height:0}}}),q.render(()=>{zc(n,r,{enableHardwareAcceleration:!1},Bc(t.tagName),e.transformTemplate),Kg(t,n)})}})},Ck={useVisualState:Yg({scrapeMotionValuesFromProps:Vc,createRenderState:Uc})};function Pk(e,{forwardMotionProps:t=!1},n,r){return{...Mc(e)?Tk:Ck,preloadedFeatures:n,useRender:wk(t),createVisualElement:r,Component:e}}function Lt(e,t,n,r={passive:!0}){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n)}const Qg=e=>e.pointerType==="mouse"?typeof e.button!="number"||e.button<=0:e.isPrimary!==!1;function wa(e,t="page"){return{point:{x:e[t+"X"],y:e[t+"Y"]}}}const Ak=e=>t=>Qg(t)&&e(t,wa(t));function Dt(e,t,n,r){return Lt(e,t,Ak(n),r)}const Rk=(e,t)=>n=>t(e(n)),hn=(...e)=>e.reduce(Rk);function Xg(e){let t=null;return()=>{const n=()=>{t=null};return t===null?(t=e,n):!1}}const Kh=Xg("dragHorizontal"),Gh=Xg("dragVertical");function Zg(e){let t=!1;if(e==="y")t=Gh();else if(e==="x")t=Kh();else{const n=Kh(),r=Gh();n&&r?t=()=>{n(),r()}:(n&&n(),r&&r())}return t}function ey(){const e=Zg(!0);return e?(e(),!1):!0}class kn{constructor(t){this.isMounted=!1,this.node=t}update(){}}function Jh(e,t){const n="pointer"+(t?"enter":"leave"),r="onHover"+(t?"Start":"End"),s=(i,o)=>{if(i.pointerType==="touch"||ey())return;const a=e.getProps();e.animationState&&a.whileHover&&e.animationState.setActive("whileHover",t),a[r]&&q.update(()=>a[r](i,o))};return Dt(e.current,n,s,{passive:!e.getProps()[r]})}class Nk extends kn{mount(){this.unmount=hn(Jh(this.node,!0),Jh(this.node,!1))}unmount(){}}class Ok extends kn{constructor(){super(...arguments),this.isActive=!1}onFocus(){let t=!1;try{t=this.node.current.matches(":focus-visible")}catch{t=!0}!t||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=hn(Lt(this.node.current,"focus",()=>this.onFocus()),Lt(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}const ty=(e,t)=>t?e===t?!0:ty(e,t.parentElement):!1;function Za(e,t){if(!t)return;const n=new PointerEvent("pointer"+e);t(n,wa(n))}class Lk extends kn{constructor(){super(...arguments),this.removeStartListeners=re,this.removeEndListeners=re,this.removeAccessibleListeners=re,this.startPointerPress=(t,n)=>{if(this.isPressing)return;this.removeEndListeners();const r=this.node.getProps(),i=Dt(window,"pointerup",(a,l)=>{if(!this.checkPressEnd())return;const{onTap:u,onTapCancel:c,globalTapTarget:h}=this.node.getProps();q.update(()=>{!h&&!ty(this.node.current,a.target)?c&&c(a,l):u&&u(a,l)})},{passive:!(r.onTap||r.onPointerUp)}),o=Dt(window,"pointercancel",(a,l)=>this.cancelPress(a,l),{passive:!(r.onTapCancel||r.onPointerCancel)});this.removeEndListeners=hn(i,o),this.startPress(t,n)},this.startAccessiblePress=()=>{const t=i=>{if(i.key!=="Enter"||this.isPressing)return;const o=a=>{a.key!=="Enter"||!this.checkPressEnd()||Za("up",(l,u)=>{const{onTap:c}=this.node.getProps();c&&q.update(()=>c(l,u))})};this.removeEndListeners(),this.removeEndListeners=Lt(this.node.current,"keyup",o),Za("down",(a,l)=>{this.startPress(a,l)})},n=Lt(this.node.current,"keydown",t),r=()=>{this.isPressing&&Za("cancel",(i,o)=>this.cancelPress(i,o))},s=Lt(this.node.current,"blur",r);this.removeAccessibleListeners=hn(n,s)}}startPress(t,n){this.isPressing=!0;const{onTapStart:r,whileTap:s}=this.node.getProps();s&&this.node.animationState&&this.node.animationState.setActive("whileTap",!0),r&&q.update(()=>r(t,n))}checkPressEnd(){return this.removeEndListeners(),this.isPressing=!1,this.node.getProps().whileTap&&this.node.animationState&&this.node.animationState.setActive("whileTap",!1),!ey()}cancelPress(t,n){if(!this.checkPressEnd())return;const{onTapCancel:r}=this.node.getProps();r&&q.update(()=>r(t,n))}mount(){const t=this.node.getProps(),n=Dt(t.globalTapTarget?window:this.node.current,"pointerdown",this.startPointerPress,{passive:!(t.onTapStart||t.onPointerStart)}),r=Lt(this.node.current,"focus",this.startAccessiblePress);this.removeStartListeners=hn(n,r)}unmount(){this.removeStartListeners(),this.removeEndListeners(),this.removeAccessibleListeners()}}const ku=new WeakMap,el=new WeakMap,Ik=e=>{const t=ku.get(e.target);t&&t(e)},Dk=e=>{e.forEach(Ik)};function Mk({root:e,...t}){const n=e||document;el.has(n)||el.set(n,{});const r=el.get(n),s=JSON.stringify(t);return r[s]||(r[s]=new IntersectionObserver(Dk,{root:e,...t})),r[s]}function $k(e,t,n){const r=Mk(t);return ku.set(e,n),r.observe(e),()=>{ku.delete(e),r.unobserve(e)}}const Uk={some:0,all:1};class zk extends kn{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:t={}}=this.node.getProps(),{root:n,margin:r,amount:s="some",once:i}=t,o={root:n?n.current:void 0,rootMargin:r,threshold:typeof s=="number"?s:Uk[s]},a=l=>{const{isIntersecting:u}=l;if(this.isInView===u||(this.isInView=u,i&&!u&&this.hasEnteredView))return;u&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",u);const{onViewportEnter:c,onViewportLeave:h}=this.node.getProps(),f=u?c:h;f&&f(l)};return $k(this.node.current,o,a)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:t,prevProps:n}=this.node;["amount","margin","root"].some(Bk(t,n))&&this.startObserver()}unmount(){}}function Bk({viewport:e={}},{viewport:t={}}={}){return n=>e[n]!==t[n]}const Vk={inView:{Feature:zk},tap:{Feature:Lk},focus:{Feature:Ok},hover:{Feature:Nk}};function ny(e,t){if(!Array.isArray(t))return!1;const n=t.length;if(n!==e.length)return!1;for(let r=0;r<n;r++)if(t[r]!==e[r])return!1;return!0}function Fk(e){const t={};return e.values.forEach((n,r)=>t[r]=n.get()),t}function Hk(e){const t={};return e.values.forEach((n,r)=>t[r]=n.getVelocity()),t}function xa(e,t,n){const r=e.getProps();return Fc(r,t,n!==void 0?n:r.custom,Fk(e),Hk(e))}let Wk=re,Hc=re;const fn=e=>e*1e3,Mt=e=>e/1e3,qk={current:!1},ry=e=>Array.isArray(e)&&typeof e[0]=="number";function sy(e){return!!(!e||typeof e=="string"&&iy[e]||ry(e)||Array.isArray(e)&&e.every(sy))}const ds=([e,t,n,r])=>`cubic-bezier(${e}, ${t}, ${n}, ${r})`,iy={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:ds([0,.65,.55,1]),circOut:ds([.55,0,1,.45]),backIn:ds([.31,.01,.66,-.59]),backOut:ds([.33,1.53,.69,.99])};function oy(e){if(e)return ry(e)?ds(e):Array.isArray(e)?e.map(oy):iy[e]}function Kk(e,t,n,{delay:r=0,duration:s,repeat:i=0,repeatType:o="loop",ease:a,times:l}={}){const u={[t]:n};l&&(u.offset=l);const c=oy(a);return Array.isArray(c)&&(u.easing=c),e.animate(u,{delay:r,duration:s,easing:Array.isArray(c)?"linear":c,fill:"both",iterations:i+1,direction:o==="reverse"?"alternate":"normal"})}function Gk(e,{repeat:t,repeatType:n="loop"}){const r=t&&n!=="loop"&&t%2===1?0:e.length-1;return e[r]}const ay=(e,t,n)=>(((1-3*n+3*t)*e+(3*n-6*t))*e+3*t)*e,Jk=1e-7,Yk=12;function Qk(e,t,n,r,s){let i,o,a=0;do o=t+(n-t)/2,i=ay(o,r,s)-e,i>0?n=o:t=o;while(Math.abs(i)>Jk&&++a<Yk);return o}function hi(e,t,n,r){if(e===t&&n===r)return re;const s=i=>Qk(i,0,1,e,n);return i=>i===0||i===1?i:ay(s(i),t,r)}const Xk=hi(.42,0,1,1),Zk=hi(0,0,.58,1),ly=hi(.42,0,.58,1),e_=e=>Array.isArray(e)&&typeof e[0]!="number",uy=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,cy=e=>t=>1-e(1-t),Wc=e=>1-Math.sin(Math.acos(e)),dy=cy(Wc),t_=uy(Wc),hy=hi(.33,1.53,.69,.99),qc=cy(hy),n_=uy(qc),r_=e=>(e*=2)<1?.5*qc(e):.5*(2-Math.pow(2,-10*(e-1))),s_={linear:re,easeIn:Xk,easeInOut:ly,easeOut:Zk,circIn:Wc,circInOut:t_,circOut:dy,backIn:qc,backInOut:n_,backOut:hy,anticipate:r_},Yh=e=>{if(Array.isArray(e)){Hc(e.length===4);const[t,n,r,s]=e;return hi(t,n,r,s)}else if(typeof e=="string")return s_[e];return e},Kc=(e,t)=>n=>!!(ci(n)&&ik.test(n)&&n.startsWith(e)||t&&Object.prototype.hasOwnProperty.call(n,t)),fy=(e,t,n)=>r=>{if(!ci(r))return r;const[s,i,o,a]=r.match(va);return{[e]:parseFloat(s),[t]:parseFloat(i),[n]:parseFloat(o),alpha:a!==void 0?parseFloat(a):1}},i_=e=>yn(0,255,e),tl={...Qn,transform:e=>Math.round(i_(e))},Un={test:Kc("rgb","red"),parse:fy("red","green","blue"),transform:({red:e,green:t,blue:n,alpha:r=1})=>"rgba("+tl.transform(e)+", "+tl.transform(t)+", "+tl.transform(n)+", "+Es(Ss.transform(r))+")"};function o_(e){let t="",n="",r="",s="";return e.length>5?(t=e.substring(1,3),n=e.substring(3,5),r=e.substring(5,7),s=e.substring(7,9)):(t=e.substring(1,2),n=e.substring(2,3),r=e.substring(3,4),s=e.substring(4,5),t+=t,n+=n,r+=r,s+=s),{red:parseInt(t,16),green:parseInt(n,16),blue:parseInt(r,16),alpha:s?parseInt(s,16)/255:1}}const _u={test:Kc("#"),parse:o_,transform:Un.transform},_r={test:Kc("hsl","hue"),parse:fy("hue","saturation","lightness"),transform:({hue:e,saturation:t,lightness:n,alpha:r=1})=>"hsla("+Math.round(e)+", "+jt.transform(Es(t))+", "+jt.transform(Es(n))+", "+Es(Ss.transform(r))+")"},Pe={test:e=>Un.test(e)||_u.test(e)||_r.test(e),parse:e=>Un.test(e)?Un.parse(e):_r.test(e)?_r.parse(e):_u.parse(e),transform:e=>ci(e)?e:e.hasOwnProperty("red")?Un.transform(e):_r.transform(e)},X=(e,t,n)=>-n*e+n*t+e;function nl(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function a_({hue:e,saturation:t,lightness:n,alpha:r}){e/=360,t/=100,n/=100;let s=0,i=0,o=0;if(!t)s=i=o=n;else{const a=n<.5?n*(1+t):n+t-n*t,l=2*n-a;s=nl(l,a,e+1/3),i=nl(l,a,e),o=nl(l,a,e-1/3)}return{red:Math.round(s*255),green:Math.round(i*255),blue:Math.round(o*255),alpha:r}}const rl=(e,t,n)=>{const r=e*e;return Math.sqrt(Math.max(0,n*(t*t-r)+r))},l_=[_u,Un,_r],u_=e=>l_.find(t=>t.test(e));function Qh(e){const t=u_(e);let n=t.parse(e);return t===_r&&(n=a_(n)),n}const py=(e,t)=>{const n=Qh(e),r=Qh(t),s={...n};return i=>(s.red=rl(n.red,r.red,i),s.green=rl(n.green,r.green,i),s.blue=rl(n.blue,r.blue,i),s.alpha=X(n.alpha,r.alpha,i),Un.transform(s))};function c_(e){var t,n;return isNaN(e)&&ci(e)&&(((t=e.match(va))===null||t===void 0?void 0:t.length)||0)+(((n=e.match(zg))===null||n===void 0?void 0:n.length)||0)>0}const my={regex:rk,countKey:"Vars",token:"${v}",parse:re},gy={regex:zg,countKey:"Colors",token:"${c}",parse:Pe.parse},yy={regex:va,countKey:"Numbers",token:"${n}",parse:Qn.parse};function sl(e,{regex:t,countKey:n,token:r,parse:s}){const i=e.tokenised.match(t);i&&(e["num"+n]=i.length,e.tokenised=e.tokenised.replace(t,r),e.values.push(...i.map(s)))}function zo(e){const t=e.toString(),n={value:t,tokenised:t,values:[],numVars:0,numColors:0,numNumbers:0};return n.value.includes("var(--")&&sl(n,my),sl(n,gy),sl(n,yy),n}function vy(e){return zo(e).values}function wy(e){const{values:t,numColors:n,numVars:r,tokenised:s}=zo(e),i=t.length;return o=>{let a=s;for(let l=0;l<i;l++)l<r?a=a.replace(my.token,o[l]):l<r+n?a=a.replace(gy.token,Pe.transform(o[l])):a=a.replace(yy.token,Es(o[l]));return a}}const d_=e=>typeof e=="number"?0:e;function h_(e){const t=vy(e);return wy(e)(t.map(d_))}const vn={test:c_,parse:vy,createTransformer:wy,getAnimatableNone:h_},xy=(e,t)=>n=>`${n>0?t:e}`;function by(e,t){return typeof e=="number"?n=>X(e,t,n):Pe.test(e)?py(e,t):e.startsWith("var(")?xy(e,t):_y(e,t)}const ky=(e,t)=>{const n=[...e],r=n.length,s=e.map((i,o)=>by(i,t[o]));return i=>{for(let o=0;o<r;o++)n[o]=s[o](i);return n}},f_=(e,t)=>{const n={...e,...t},r={};for(const s in n)e[s]!==void 0&&t[s]!==void 0&&(r[s]=by(e[s],t[s]));return s=>{for(const i in r)n[i]=r[i](s);return n}},_y=(e,t)=>{const n=vn.createTransformer(t),r=zo(e),s=zo(t);return r.numVars===s.numVars&&r.numColors===s.numColors&&r.numNumbers>=s.numNumbers?hn(ky(r.values,s.values),n):xy(e,t)},ni=(e,t,n)=>{const r=t-e;return r===0?1:(n-e)/r},Xh=(e,t)=>n=>X(e,t,n);function p_(e){return typeof e=="number"?Xh:typeof e=="string"?Pe.test(e)?py:_y:Array.isArray(e)?ky:typeof e=="object"?f_:Xh}function m_(e,t,n){const r=[],s=n||p_(e[0]),i=e.length-1;for(let o=0;o<i;o++){let a=s(e[o],e[o+1]);if(t){const l=Array.isArray(t)?t[o]||re:t;a=hn(l,a)}r.push(a)}return r}function Sy(e,t,{clamp:n=!0,ease:r,mixer:s}={}){const i=e.length;if(Hc(i===t.length),i===1)return()=>t[0];e[0]>e[i-1]&&(e=[...e].reverse(),t=[...t].reverse());const o=m_(t,r,s),a=o.length,l=u=>{let c=0;if(a>1)for(;c<e.length-2&&!(u<e[c+1]);c++);const h=ni(e[c],e[c+1],u);return o[c](h)};return n?u=>l(yn(e[0],e[i-1],u)):l}function g_(e,t){const n=e[e.length-1];for(let r=1;r<=t;r++){const s=ni(0,t,r);e.push(X(n,1,s))}}function y_(e){const t=[0];return g_(t,e.length-1),t}function v_(e,t){return e.map(n=>n*t)}function w_(e,t){return e.map(()=>t||ly).splice(0,e.length-1)}function Bo({duration:e=300,keyframes:t,times:n,ease:r="easeInOut"}){const s=e_(r)?r.map(Yh):Yh(r),i={done:!1,value:t[0]},o=v_(n&&n.length===t.length?n:y_(t),e),a=Sy(o,t,{ease:Array.isArray(s)?s:w_(t,s)});return{calculatedDuration:e,next:l=>(i.value=a(l),i.done=l>=e,i)}}function Ey(e,t){return t?e*(1e3/t):0}const x_=5;function jy(e,t,n){const r=Math.max(t-x_,0);return Ey(n-e(r),t-r)}const il=.001,b_=.01,Zh=10,k_=.05,__=1;function S_({duration:e=800,bounce:t=.25,velocity:n=0,mass:r=1}){let s,i;Wk(e<=fn(Zh));let o=1-t;o=yn(k_,__,o),e=yn(b_,Zh,Mt(e)),o<1?(s=u=>{const c=u*o,h=c*e,f=c-n,p=Su(u,o),y=Math.exp(-h);return il-f/p*y},i=u=>{const h=u*o*e,f=h*n+n,p=Math.pow(o,2)*Math.pow(u,2)*e,y=Math.exp(-h),w=Su(Math.pow(u,2),o);return(-s(u)+il>0?-1:1)*((f-p)*y)/w}):(s=u=>{const c=Math.exp(-u*e),h=(u-n)*e+1;return-il+c*h},i=u=>{const c=Math.exp(-u*e),h=(n-u)*(e*e);return c*h});const a=5/e,l=j_(s,i,a);if(e=fn(e),isNaN(l))return{stiffness:100,damping:10,duration:e};{const u=Math.pow(l,2)*r;return{stiffness:u,damping:o*2*Math.sqrt(r*u),duration:e}}}const E_=12;function j_(e,t,n){let r=n;for(let s=1;s<E_;s++)r=r-e(r)/t(r);return r}function Su(e,t){return e*Math.sqrt(1-t*t)}const T_=["duration","bounce"],C_=["stiffness","damping","mass"];function ef(e,t){return t.some(n=>e[n]!==void 0)}function P_(e){let t={velocity:0,stiffness:100,damping:10,mass:1,isResolvedFromDuration:!1,...e};if(!ef(e,C_)&&ef(e,T_)){const n=S_(e);t={...t,...n,mass:1},t.isResolvedFromDuration=!0}return t}function Ty({keyframes:e,restDelta:t,restSpeed:n,...r}){const s=e[0],i=e[e.length-1],o={done:!1,value:s},{stiffness:a,damping:l,mass:u,duration:c,velocity:h,isResolvedFromDuration:f}=P_({...r,velocity:-Mt(r.velocity||0)}),p=h||0,y=l/(2*Math.sqrt(a*u)),w=i-s,b=Mt(Math.sqrt(a/u)),v=Math.abs(w)<5;n||(n=v?.01:2),t||(t=v?.005:.5);let m;if(y<1){const g=Su(b,y);m=x=>{const _=Math.exp(-y*b*x);return i-_*((p+y*b*w)/g*Math.sin(g*x)+w*Math.cos(g*x))}}else if(y===1)m=g=>i-Math.exp(-b*g)*(w+(p+b*w)*g);else{const g=b*Math.sqrt(y*y-1);m=x=>{const _=Math.exp(-y*b*x),S=Math.min(g*x,300);return i-_*((p+y*b*w)*Math.sinh(S)+g*w*Math.cosh(S))/g}}return{calculatedDuration:f&&c||null,next:g=>{const x=m(g);if(f)o.done=g>=c;else{let _=p;g!==0&&(y<1?_=jy(m,g,x):_=0);const S=Math.abs(_)<=n,j=Math.abs(i-x)<=t;o.done=S&&j}return o.value=o.done?i:x,o}}}function tf({keyframes:e,velocity:t=0,power:n=.8,timeConstant:r=325,bounceDamping:s=10,bounceStiffness:i=500,modifyTarget:o,min:a,max:l,restDelta:u=.5,restSpeed:c}){const h=e[0],f={done:!1,value:h},p=E=>a!==void 0&&E<a||l!==void 0&&E>l,y=E=>a===void 0?l:l===void 0||Math.abs(a-E)<Math.abs(l-E)?a:l;let w=n*t;const b=h+w,v=o===void 0?b:o(b);v!==b&&(w=v-h);const m=E=>-w*Math.exp(-E/r),g=E=>v+m(E),x=E=>{const R=m(E),L=g(E);f.done=Math.abs(R)<=u,f.value=f.done?v:L};let _,S;const j=E=>{p(f.value)&&(_=E,S=Ty({keyframes:[f.value,y(f.value)],velocity:jy(g,E,f.value),damping:s,stiffness:i,restDelta:u,restSpeed:c}))};return j(0),{calculatedDuration:null,next:E=>{let R=!1;return!S&&_===void 0&&(R=!0,x(E),j(E)),_!==void 0&&E>_?S.next(E-_):(!R&&x(E),f)}}}const A_=e=>{const t=({timestamp:n})=>e(n);return{start:()=>q.update(t,!0),stop:()=>Vt(t),now:()=>Ee.isProcessing?Ee.timestamp:performance.now()}},nf=2e4;function rf(e){let t=0;const n=50;let r=e.next(t);for(;!r.done&&t<nf;)t+=n,r=e.next(t);return t>=nf?1/0:t}const R_={decay:tf,inertia:tf,tween:Bo,keyframes:Bo,spring:Ty};function Vo({autoplay:e=!0,delay:t=0,driver:n=A_,keyframes:r,type:s="keyframes",repeat:i=0,repeatDelay:o=0,repeatType:a="loop",onPlay:l,onStop:u,onComplete:c,onUpdate:h,...f}){let p=1,y=!1,w,b;const v=()=>{b=new Promise(M=>{w=M})};v();let m;const g=R_[s]||Bo;let x;g!==Bo&&typeof r[0]!="number"&&(x=Sy([0,100],r,{clamp:!1}),r=[0,100]);const _=g({...f,keyframes:r});let S;a==="mirror"&&(S=g({...f,keyframes:[...r].reverse(),velocity:-(f.velocity||0)}));let j="idle",E=null,R=null,L=null;_.calculatedDuration===null&&i&&(_.calculatedDuration=rf(_));const{calculatedDuration:se}=_;let de=1/0,Ce=1/0;se!==null&&(de=se+o,Ce=de*(i+1)-o);let pe=0;const Wt=M=>{if(R===null)return;p>0&&(R=Math.min(R,M)),p<0&&(R=Math.min(M-Ce/p,R)),E!==null?pe=E:pe=Math.round(M-R)*p;const J=pe-t*(p>=0?1:-1),_n=p>=0?J<0:J>Ce;pe=Math.max(J,0),j==="finished"&&E===null&&(pe=Ce);let yt=pe,Xn=_;if(i){const ba=Math.min(pe,Ce)/de;let fi=Math.floor(ba),En=ba%1;!En&&ba>=1&&(En=1),En===1&&fi--,fi=Math.min(fi,i+1),!!(fi%2)&&(a==="reverse"?(En=1-En,o&&(En-=o/de)):a==="mirror"&&(Xn=S)),yt=yn(0,1,En)*de}const Be=_n?{done:!1,value:r[0]}:Xn.next(yt);x&&(Be.value=x(Be.value));let{done:Sn}=Be;!_n&&se!==null&&(Sn=p>=0?pe>=Ce:pe<=0);const tv=E===null&&(j==="finished"||j==="running"&&Sn);return h&&h(Be.value),tv&&P(),Be},ie=()=>{m&&m.stop(),m=void 0},Qe=()=>{j="idle",ie(),w(),v(),R=L=null},P=()=>{j="finished",c&&c(),ie(),w()},D=()=>{if(y)return;m||(m=n(Wt));const M=m.now();l&&l(),E!==null?R=M-E:(!R||j==="finished")&&(R=M),j==="finished"&&v(),L=R,E=null,j="running",m.start()};e&&D();const $={then(M,J){return b.then(M,J)},get time(){return Mt(pe)},set time(M){M=fn(M),pe=M,E!==null||!m||p===0?E=M:R=m.now()-M/p},get duration(){const M=_.calculatedDuration===null?rf(_):_.calculatedDuration;return Mt(M)},get speed(){return p},set speed(M){M===p||!m||(p=M,$.time=Mt(pe))},get state(){return j},play:D,pause:()=>{j="paused",E=pe},stop:()=>{y=!0,j!=="idle"&&(j="idle",u&&u(),Qe())},cancel:()=>{L!==null&&Wt(L),Qe()},complete:()=>{j="finished"},sample:M=>(R=0,Wt(M))};return $}function N_(e){let t;return()=>(t===void 0&&(t=e()),t)}const O_=N_(()=>Object.hasOwnProperty.call(Element.prototype,"animate")),L_=new Set(["opacity","clipPath","filter","transform","backgroundColor"]),Bi=10,I_=2e4,D_=(e,t)=>t.type==="spring"||e==="backgroundColor"||!sy(t.ease);function M_(e,t,{onUpdate:n,onComplete:r,...s}){if(!(O_()&&L_.has(t)&&!s.repeatDelay&&s.repeatType!=="mirror"&&s.damping!==0&&s.type!=="inertia"))return!1;let o=!1,a,l,u=!1;const c=()=>{l=new Promise(g=>{a=g})};c();let{keyframes:h,duration:f=300,ease:p,times:y}=s;if(D_(t,s)){const g=Vo({...s,repeat:0,delay:0});let x={done:!1,value:h[0]};const _=[];let S=0;for(;!x.done&&S<I_;)x=g.sample(S),_.push(x.value),S+=Bi;y=void 0,h=_,f=S-Bi,p="linear"}const w=Kk(e.owner.current,t,h,{...s,duration:f,ease:p,times:y}),b=()=>{u=!1,w.cancel()},v=()=>{u=!0,q.update(b),a(),c()};return w.onfinish=()=>{u||(e.set(Gk(h,s)),r&&r(),v())},{then(g,x){return l.then(g,x)},attachTimeline(g){return w.timeline=g,w.onfinish=null,re},get time(){return Mt(w.currentTime||0)},set time(g){w.currentTime=fn(g)},get speed(){return w.playbackRate},set speed(g){w.playbackRate=g},get duration(){return Mt(f)},play:()=>{o||(w.play(),Vt(b))},pause:()=>w.pause(),stop:()=>{if(o=!0,w.playState==="idle")return;const{currentTime:g}=w;if(g){const x=Vo({...s,autoplay:!1});e.setWithVelocity(x.sample(g-Bi).value,x.sample(g).value,Bi)}v()},complete:()=>{u||w.finish()},cancel:v}}function $_({keyframes:e,delay:t,onUpdate:n,onComplete:r}){const s=()=>(n&&n(e[e.length-1]),r&&r(),{time:0,speed:1,duration:0,play:re,pause:re,stop:re,then:i=>(i(),Promise.resolve()),cancel:re,complete:re});return t?Vo({keyframes:[0,1],duration:0,delay:t,onComplete:s}):s()}const U_={type:"spring",stiffness:500,damping:25,restSpeed:10},z_=e=>({type:"spring",stiffness:550,damping:e===0?2*Math.sqrt(550):30,restSpeed:10}),B_={type:"keyframes",duration:.8},V_={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},F_=(e,{keyframes:t})=>t.length>2?B_:Yn.has(e)?e.startsWith("scale")?z_(t[1]):U_:V_,Eu=(e,t)=>e==="zIndex"?!1:!!(typeof t=="number"||Array.isArray(t)||typeof t=="string"&&(vn.test(t)||t==="0")&&!t.startsWith("url(")),H_=new Set(["brightness","contrast","saturate","opacity"]);function W_(e){const[t,n]=e.slice(0,-1).split("(");if(t==="drop-shadow")return e;const[r]=n.match(va)||[];if(!r)return e;const s=n.replace(r,"");let i=H_.has(t)?1:0;return r!==n&&(i*=100),t+"("+i+s+")"}const q_=/([a-z-]*)\(.*?\)/g,ju={...vn,getAnimatableNone:e=>{const t=e.match(q_);return t?t.map(W_).join(" "):e}},K_={...Bg,color:Pe,backgroundColor:Pe,outlineColor:Pe,fill:Pe,stroke:Pe,borderColor:Pe,borderTopColor:Pe,borderRightColor:Pe,borderBottomColor:Pe,borderLeftColor:Pe,filter:ju,WebkitFilter:ju},Gc=e=>K_[e];function Cy(e,t){let n=Gc(e);return n!==ju&&(n=vn),n.getAnimatableNone?n.getAnimatableNone(t):void 0}const Py=e=>/^0[^.\s]+$/.test(e);function G_(e){if(typeof e=="number")return e===0;if(e!==null)return e==="none"||e==="0"||Py(e)}function J_(e,t,n,r){const s=Eu(t,n);let i;Array.isArray(n)?i=[...n]:i=[null,n];const o=r.from!==void 0?r.from:e.get();let a;const l=[];for(let u=0;u<i.length;u++)i[u]===null&&(i[u]=u===0?o:i[u-1]),G_(i[u])&&l.push(u),typeof i[u]=="string"&&i[u]!=="none"&&i[u]!=="0"&&(a=i[u]);if(s&&l.length&&a)for(let u=0;u<l.length;u++){const c=l[u];i[c]=Cy(t,a)}return i}function Y_({when:e,delay:t,delayChildren:n,staggerChildren:r,staggerDirection:s,repeat:i,repeatType:o,repeatDelay:a,from:l,elapsed:u,...c}){return!!Object.keys(c).length}function Jc(e,t){return e[t]||e.default||e}const Q_={skipAnimations:!1},Yc=(e,t,n,r={})=>s=>{const i=Jc(r,e)||{},o=i.delay||r.delay||0;let{elapsed:a=0}=r;a=a-fn(o);const l=J_(t,e,n,i),u=l[0],c=l[l.length-1],h=Eu(e,u),f=Eu(e,c);let p={keyframes:l,velocity:t.getVelocity(),ease:"easeOut",...i,delay:-a,onUpdate:y=>{t.set(y),i.onUpdate&&i.onUpdate(y)},onComplete:()=>{s(),i.onComplete&&i.onComplete()}};if(Y_(i)||(p={...p,...F_(e,p)}),p.duration&&(p.duration=fn(p.duration)),p.repeatDelay&&(p.repeatDelay=fn(p.repeatDelay)),!h||!f||qk.current||i.type===!1||Q_.skipAnimations)return $_(p);if(!r.isHandoff&&t.owner&&t.owner.current instanceof HTMLElement&&!t.owner.getProps().onUpdate){const y=M_(t,e,p);if(y)return y}return Vo(p)};function Fo(e){return!!(ze(e)&&e.add)}const Ay=e=>/^\-?\d*\.?\d+$/.test(e);function Qc(e,t){e.indexOf(t)===-1&&e.push(t)}function Xc(e,t){const n=e.indexOf(t);n>-1&&e.splice(n,1)}class Zc{constructor(){this.subscriptions=[]}add(t){return Qc(this.subscriptions,t),()=>Xc(this.subscriptions,t)}notify(t,n,r){const s=this.subscriptions.length;if(s)if(s===1)this.subscriptions[0](t,n,r);else for(let i=0;i<s;i++){const o=this.subscriptions[i];o&&o(t,n,r)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const X_=e=>!isNaN(parseFloat(e));class Z_{constructor(t,n={}){this.version="10.18.0",this.timeDelta=0,this.lastUpdated=0,this.canTrackVelocity=!1,this.events={},this.updateAndNotify=(r,s=!0)=>{this.prev=this.current,this.current=r;const{delta:i,timestamp:o}=Ee;this.lastUpdated!==o&&(this.timeDelta=i,this.lastUpdated=o,q.postRender(this.scheduleVelocityCheck)),this.prev!==this.current&&this.events.change&&this.events.change.notify(this.current),this.events.velocityChange&&this.events.velocityChange.notify(this.getVelocity()),s&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.scheduleVelocityCheck=()=>q.postRender(this.velocityCheck),this.velocityCheck=({timestamp:r})=>{r!==this.lastUpdated&&(this.prev=this.current,this.events.velocityChange&&this.events.velocityChange.notify(this.getVelocity()))},this.hasAnimated=!1,this.prev=this.current=t,this.canTrackVelocity=X_(this.current),this.owner=n.owner}onChange(t){return this.on("change",t)}on(t,n){this.events[t]||(this.events[t]=new Zc);const r=this.events[t].add(n);return t==="change"?()=>{r(),q.read(()=>{this.events.change.getSize()||this.stop()})}:r}clearListeners(){for(const t in this.events)this.events[t].clear()}attach(t,n){this.passiveEffect=t,this.stopPassiveEffect=n}set(t,n=!0){!n||!this.passiveEffect?this.updateAndNotify(t,n):this.passiveEffect(t,this.updateAndNotify)}setWithVelocity(t,n,r){this.set(n),this.prev=t,this.timeDelta=r}jump(t){this.updateAndNotify(t),this.prev=t,this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return this.current}getPrevious(){return this.prev}getVelocity(){return this.canTrackVelocity?Ey(parseFloat(this.current)-parseFloat(this.prev),this.timeDelta):0}start(t){return this.stop(),new Promise(n=>{this.hasAnimated=!0,this.animation=t(n),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Br(e,t){return new Z_(e,t)}const Ry=e=>t=>t.test(e),eS={test:e=>e==="auto",parse:e=>e},Ny=[Qn,I,jt,Kt,ak,ok,eS],rs=e=>Ny.find(Ry(e)),tS=[...Ny,Pe,vn],nS=e=>tS.find(Ry(e));function rS(e,t,n){e.hasValue(t)?e.getValue(t).set(n):e.addValue(t,Br(n))}function sS(e,t){const n=xa(e,t);let{transitionEnd:r={},transition:s={},...i}=n?e.makeTargetAnimatable(n,!1):{};i={...i,...r};for(const o in i){const a=bk(i[o]);rS(e,o,a)}}function iS(e,t,n){var r,s;const i=Object.keys(t).filter(a=>!e.hasValue(a)),o=i.length;if(o)for(let a=0;a<o;a++){const l=i[a],u=t[l];let c=null;Array.isArray(u)&&(c=u[0]),c===null&&(c=(s=(r=n[l])!==null&&r!==void 0?r:e.readValue(l))!==null&&s!==void 0?s:t[l]),c!=null&&(typeof c=="string"&&(Ay(c)||Py(c))?c=parseFloat(c):!nS(c)&&vn.test(u)&&(c=Cy(l,u)),e.addValue(l,Br(c,{owner:e})),n[l]===void 0&&(n[l]=c),c!==null&&e.setBaseTarget(l,c))}}function oS(e,t){return t?(t[e]||t.default||t).from:void 0}function aS(e,t,n){const r={};for(const s in e){const i=oS(s,t);if(i!==void 0)r[s]=i;else{const o=n.getValue(s);o&&(r[s]=o.get())}}return r}function lS({protectedKeys:e,needsAnimating:t},n){const r=e.hasOwnProperty(n)&&t[n]!==!0;return t[n]=!1,r}function uS(e,t){const n=e.get();if(Array.isArray(t)){for(let r=0;r<t.length;r++)if(t[r]!==n)return!0}else return n!==t}function Oy(e,t,{delay:n=0,transitionOverride:r,type:s}={}){let{transition:i=e.getDefaultTransition(),transitionEnd:o,...a}=e.makeTargetAnimatable(t);const l=e.getValue("willChange");r&&(i=r);const u=[],c=s&&e.animationState&&e.animationState.getState()[s];for(const h in a){const f=e.getValue(h),p=a[h];if(!f||p===void 0||c&&lS(c,h))continue;const y={delay:n,elapsed:0,...Jc(i||{},h)};if(window.HandoffAppearAnimations){const v=e.getProps()[Lg];if(v){const m=window.HandoffAppearAnimations(v,h,f,q);m!==null&&(y.elapsed=m,y.isHandoff=!0)}}let w=!y.isHandoff&&!uS(f,p);if(y.type==="spring"&&(f.getVelocity()||y.velocity)&&(w=!1),f.animation&&(w=!1),w)continue;f.start(Yc(h,f,p,e.shouldReduceMotion&&Yn.has(h)?{type:!1}:y));const b=f.animation;Fo(l)&&(l.add(h),b.then(()=>l.remove(h))),u.push(b)}return o&&Promise.all(u).then(()=>{o&&sS(e,o)}),u}function Tu(e,t,n={}){const r=xa(e,t,n.custom);let{transition:s=e.getDefaultTransition()||{}}=r||{};n.transitionOverride&&(s=n.transitionOverride);const i=r?()=>Promise.all(Oy(e,r,n)):()=>Promise.resolve(),o=e.variantChildren&&e.variantChildren.size?(l=0)=>{const{delayChildren:u=0,staggerChildren:c,staggerDirection:h}=s;return cS(e,t,u+l,c,h,n)}:()=>Promise.resolve(),{when:a}=s;if(a){const[l,u]=a==="beforeChildren"?[i,o]:[o,i];return l().then(()=>u())}else return Promise.all([i(),o(n.delay)])}function cS(e,t,n=0,r=0,s=1,i){const o=[],a=(e.variantChildren.size-1)*r,l=s===1?(u=0)=>u*r:(u=0)=>a-u*r;return Array.from(e.variantChildren).sort(dS).forEach((u,c)=>{u.notify("AnimationStart",t),o.push(Tu(u,t,{...i,delay:n+l(c)}).then(()=>u.notify("AnimationComplete",t)))}),Promise.all(o)}function dS(e,t){return e.sortNodePosition(t)}function hS(e,t,n={}){e.notify("AnimationStart",t);let r;if(Array.isArray(t)){const s=t.map(i=>Tu(e,i,n));r=Promise.all(s)}else if(typeof t=="string")r=Tu(e,t,n);else{const s=typeof t=="function"?xa(e,t,n.custom):t;r=Promise.all(Oy(e,s,n))}return r.then(()=>e.notify("AnimationComplete",t))}const fS=[...Lc].reverse(),pS=Lc.length;function mS(e){return t=>Promise.all(t.map(({animation:n,options:r})=>hS(e,n,r)))}function gS(e){let t=mS(e);const n=vS();let r=!0;const s=(l,u)=>{const c=xa(e,u);if(c){const{transition:h,transitionEnd:f,...p}=c;l={...l,...p,...f}}return l};function i(l){t=l(e)}function o(l,u){const c=e.getProps(),h=e.getVariantContext(!0)||{},f=[],p=new Set;let y={},w=1/0;for(let v=0;v<pS;v++){const m=fS[v],g=n[m],x=c[m]!==void 0?c[m]:h[m],_=ei(x),S=m===u?g.isActive:null;S===!1&&(w=v);let j=x===h[m]&&x!==c[m]&&_;if(j&&r&&e.manuallyAnimateOnMount&&(j=!1),g.protectedKeys={...y},!g.isActive&&S===null||!x&&!g.prevProp||ga(x)||typeof x=="boolean")continue;let R=yS(g.prevProp,x)||m===u&&g.isActive&&!j&&_||v>w&&_,L=!1;const se=Array.isArray(x)?x:[x];let de=se.reduce(s,{});S===!1&&(de={});const{prevResolvedValues:Ce={}}=g,pe={...Ce,...de},Wt=ie=>{R=!0,p.has(ie)&&(L=!0,p.delete(ie)),g.needsAnimating[ie]=!0};for(const ie in pe){const Qe=de[ie],P=Ce[ie];if(y.hasOwnProperty(ie))continue;let D=!1;Uo(Qe)&&Uo(P)?D=!ny(Qe,P):D=Qe!==P,D?Qe!==void 0?Wt(ie):p.add(ie):Qe!==void 0&&p.has(ie)?Wt(ie):g.protectedKeys[ie]=!0}g.prevProp=x,g.prevResolvedValues=de,g.isActive&&(y={...y,...de}),r&&e.blockInitialAnimation&&(R=!1),R&&(!j||L)&&f.push(...se.map(ie=>({animation:ie,options:{type:m,...l}})))}if(p.size){const v={};p.forEach(m=>{const g=e.getBaseTarget(m);g!==void 0&&(v[m]=g)}),f.push({animation:v})}let b=!!f.length;return r&&(c.initial===!1||c.initial===c.animate)&&!e.manuallyAnimateOnMount&&(b=!1),r=!1,b?t(f):Promise.resolve()}function a(l,u,c){var h;if(n[l].isActive===u)return Promise.resolve();(h=e.variantChildren)===null||h===void 0||h.forEach(p=>{var y;return(y=p.animationState)===null||y===void 0?void 0:y.setActive(l,u)}),n[l].isActive=u;const f=o(c,l);for(const p in n)n[p].protectedKeys={};return f}return{animateChanges:o,setActive:a,setAnimateFunction:i,getState:()=>n}}function yS(e,t){return typeof t=="string"?t!==e:Array.isArray(t)?!ny(t,e):!1}function Cn(e=!1){return{isActive:e,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function vS(){return{animate:Cn(!0),whileInView:Cn(),whileHover:Cn(),whileTap:Cn(),whileDrag:Cn(),whileFocus:Cn(),exit:Cn()}}class wS extends kn{constructor(t){super(t),t.animationState||(t.animationState=gS(t))}updateAnimationControlsSubscription(){const{animate:t}=this.node.getProps();this.unmount(),ga(t)&&(this.unmount=t.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:t}=this.node.getProps(),{animate:n}=this.node.prevProps||{};t!==n&&this.updateAnimationControlsSubscription()}unmount(){}}let xS=0;class bS extends kn{constructor(){super(...arguments),this.id=xS++}update(){if(!this.node.presenceContext)return;const{isPresent:t,onExitComplete:n,custom:r}=this.node.presenceContext,{isPresent:s}=this.node.prevPresenceContext||{};if(!this.node.animationState||t===s)return;const i=this.node.animationState.setActive("exit",!t,{custom:r??this.node.getProps().custom});n&&!t&&i.then(()=>n(this.id))}mount(){const{register:t}=this.node.presenceContext||{};t&&(this.unmount=t(this.id))}unmount(){}}const kS={animation:{Feature:wS},exit:{Feature:bS}},sf=(e,t)=>Math.abs(e-t);function _S(e,t){const n=sf(e.x,t.x),r=sf(e.y,t.y);return Math.sqrt(n**2+r**2)}class Ly{constructor(t,n,{transformPagePoint:r,contextWindow:s,dragSnapToOrigin:i=!1}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const h=al(this.lastMoveEventInfo,this.history),f=this.startEvent!==null,p=_S(h.offset,{x:0,y:0})>=3;if(!f&&!p)return;const{point:y}=h,{timestamp:w}=Ee;this.history.push({...y,timestamp:w});const{onStart:b,onMove:v}=this.handlers;f||(b&&b(this.lastMoveEvent,h),this.startEvent=this.lastMoveEvent),v&&v(this.lastMoveEvent,h)},this.handlePointerMove=(h,f)=>{this.lastMoveEvent=h,this.lastMoveEventInfo=ol(f,this.transformPagePoint),q.update(this.updatePoint,!0)},this.handlePointerUp=(h,f)=>{this.end();const{onEnd:p,onSessionEnd:y,resumeAnimation:w}=this.handlers;if(this.dragSnapToOrigin&&w&&w(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const b=al(h.type==="pointercancel"?this.lastMoveEventInfo:ol(f,this.transformPagePoint),this.history);this.startEvent&&p&&p(h,b),y&&y(h,b)},!Qg(t))return;this.dragSnapToOrigin=i,this.handlers=n,this.transformPagePoint=r,this.contextWindow=s||window;const o=wa(t),a=ol(o,this.transformPagePoint),{point:l}=a,{timestamp:u}=Ee;this.history=[{...l,timestamp:u}];const{onSessionStart:c}=n;c&&c(t,al(a,this.history)),this.removeListeners=hn(Dt(this.contextWindow,"pointermove",this.handlePointerMove),Dt(this.contextWindow,"pointerup",this.handlePointerUp),Dt(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(t){this.handlers=t}end(){this.removeListeners&&this.removeListeners(),Vt(this.updatePoint)}}function ol(e,t){return t?{point:t(e.point)}:e}function of(e,t){return{x:e.x-t.x,y:e.y-t.y}}function al({point:e},t){return{point:e,delta:of(e,Iy(t)),offset:of(e,SS(t)),velocity:ES(t,.1)}}function SS(e){return e[0]}function Iy(e){return e[e.length-1]}function ES(e,t){if(e.length<2)return{x:0,y:0};let n=e.length-1,r=null;const s=Iy(e);for(;n>=0&&(r=e[n],!(s.timestamp-r.timestamp>fn(t)));)n--;if(!r)return{x:0,y:0};const i=Mt(s.timestamp-r.timestamp);if(i===0)return{x:0,y:0};const o={x:(s.x-r.x)/i,y:(s.y-r.y)/i};return o.x===1/0&&(o.x=0),o.y===1/0&&(o.y=0),o}function Ke(e){return e.max-e.min}function Cu(e,t=0,n=.01){return Math.abs(e-t)<=n}function af(e,t,n,r=.5){e.origin=r,e.originPoint=X(t.min,t.max,e.origin),e.scale=Ke(n)/Ke(t),(Cu(e.scale,1,1e-4)||isNaN(e.scale))&&(e.scale=1),e.translate=X(n.min,n.max,e.origin)-e.originPoint,(Cu(e.translate)||isNaN(e.translate))&&(e.translate=0)}function js(e,t,n,r){af(e.x,t.x,n.x,r?r.originX:void 0),af(e.y,t.y,n.y,r?r.originY:void 0)}function lf(e,t,n){e.min=n.min+t.min,e.max=e.min+Ke(t)}function jS(e,t,n){lf(e.x,t.x,n.x),lf(e.y,t.y,n.y)}function uf(e,t,n){e.min=t.min-n.min,e.max=e.min+Ke(t)}function Ts(e,t,n){uf(e.x,t.x,n.x),uf(e.y,t.y,n.y)}function TS(e,{min:t,max:n},r){return t!==void 0&&e<t?e=r?X(t,e,r.min):Math.max(e,t):n!==void 0&&e>n&&(e=r?X(n,e,r.max):Math.min(e,n)),e}function cf(e,t,n){return{min:t!==void 0?e.min+t:void 0,max:n!==void 0?e.max+n-(e.max-e.min):void 0}}function CS(e,{top:t,left:n,bottom:r,right:s}){return{x:cf(e.x,n,s),y:cf(e.y,t,r)}}function df(e,t){let n=t.min-e.min,r=t.max-e.max;return t.max-t.min<e.max-e.min&&([n,r]=[r,n]),{min:n,max:r}}function PS(e,t){return{x:df(e.x,t.x),y:df(e.y,t.y)}}function AS(e,t){let n=.5;const r=Ke(e),s=Ke(t);return s>r?n=ni(t.min,t.max-r,e.min):r>s&&(n=ni(e.min,e.max-s,t.min)),yn(0,1,n)}function RS(e,t){const n={};return t.min!==void 0&&(n.min=t.min-e.min),t.max!==void 0&&(n.max=t.max-e.min),n}const Pu=.35;function NS(e=Pu){return e===!1?e=0:e===!0&&(e=Pu),{x:hf(e,"left","right"),y:hf(e,"top","bottom")}}function hf(e,t,n){return{min:ff(e,t),max:ff(e,n)}}function ff(e,t){return typeof e=="number"?e:e[t]||0}const pf=()=>({translate:0,scale:1,origin:0,originPoint:0}),Sr=()=>({x:pf(),y:pf()}),mf=()=>({min:0,max:0}),ae=()=>({x:mf(),y:mf()});function et(e){return[e("x"),e("y")]}function Dy({top:e,left:t,right:n,bottom:r}){return{x:{min:t,max:n},y:{min:e,max:r}}}function OS({x:e,y:t}){return{top:t.min,right:e.max,bottom:t.max,left:e.min}}function LS(e,t){if(!t)return e;const n=t({x:e.left,y:e.top}),r=t({x:e.right,y:e.bottom});return{top:n.y,left:n.x,bottom:r.y,right:r.x}}function ll(e){return e===void 0||e===1}function Au({scale:e,scaleX:t,scaleY:n}){return!ll(e)||!ll(t)||!ll(n)}function Nn(e){return Au(e)||My(e)||e.z||e.rotate||e.rotateX||e.rotateY}function My(e){return gf(e.x)||gf(e.y)}function gf(e){return e&&e!=="0%"}function Ho(e,t,n){const r=e-n,s=t*r;return n+s}function yf(e,t,n,r,s){return s!==void 0&&(e=Ho(e,s,r)),Ho(e,n,r)+t}function Ru(e,t=0,n=1,r,s){e.min=yf(e.min,t,n,r,s),e.max=yf(e.max,t,n,r,s)}function $y(e,{x:t,y:n}){Ru(e.x,t.translate,t.scale,t.originPoint),Ru(e.y,n.translate,n.scale,n.originPoint)}function IS(e,t,n,r=!1){const s=n.length;if(!s)return;t.x=t.y=1;let i,o;for(let a=0;a<s;a++){i=n[a],o=i.projectionDelta;const l=i.instance;l&&l.style&&l.style.display==="contents"||(r&&i.options.layoutScroll&&i.scroll&&i!==i.root&&Er(e,{x:-i.scroll.offset.x,y:-i.scroll.offset.y}),o&&(t.x*=o.x.scale,t.y*=o.y.scale,$y(e,o)),r&&Nn(i.latestValues)&&Er(e,i.latestValues))}t.x=vf(t.x),t.y=vf(t.y)}function vf(e){return Number.isInteger(e)||e>1.0000000000001||e<.999999999999?e:1}function Yt(e,t){e.min=e.min+t,e.max=e.max+t}function wf(e,t,[n,r,s]){const i=t[s]!==void 0?t[s]:.5,o=X(e.min,e.max,i);Ru(e,t[n],t[r],o,t.scale)}const DS=["x","scaleX","originX"],MS=["y","scaleY","originY"];function Er(e,t){wf(e.x,t,DS),wf(e.y,t,MS)}function Uy(e,t){return Dy(LS(e.getBoundingClientRect(),t))}function $S(e,t,n){const r=Uy(e,n),{scroll:s}=t;return s&&(Yt(r.x,s.offset.x),Yt(r.y,s.offset.y)),r}const zy=({current:e})=>e?e.ownerDocument.defaultView:null,US=new WeakMap;class zS{constructor(t){this.openGlobalLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=ae(),this.visualElement=t}start(t,{snapToCursor:n=!1}={}){const{presenceContext:r}=this.visualElement;if(r&&r.isPresent===!1)return;const s=c=>{const{dragSnapToOrigin:h}=this.getProps();h?this.pauseAnimation():this.stopAnimation(),n&&this.snapToCursor(wa(c,"page").point)},i=(c,h)=>{const{drag:f,dragPropagation:p,onDragStart:y}=this.getProps();if(f&&!p&&(this.openGlobalLock&&this.openGlobalLock(),this.openGlobalLock=Zg(f),!this.openGlobalLock))return;this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),et(b=>{let v=this.getAxisMotionValue(b).get()||0;if(jt.test(v)){const{projection:m}=this.visualElement;if(m&&m.layout){const g=m.layout.layoutBox[b];g&&(v=Ke(g)*(parseFloat(v)/100))}}this.originPoint[b]=v}),y&&q.update(()=>y(c,h),!1,!0);const{animationState:w}=this.visualElement;w&&w.setActive("whileDrag",!0)},o=(c,h)=>{const{dragPropagation:f,dragDirectionLock:p,onDirectionLock:y,onDrag:w}=this.getProps();if(!f&&!this.openGlobalLock)return;const{offset:b}=h;if(p&&this.currentDirection===null){this.currentDirection=BS(b),this.currentDirection!==null&&y&&y(this.currentDirection);return}this.updateAxis("x",h.point,b),this.updateAxis("y",h.point,b),this.visualElement.render(),w&&w(c,h)},a=(c,h)=>this.stop(c,h),l=()=>et(c=>{var h;return this.getAnimationState(c)==="paused"&&((h=this.getAxisMotionValue(c).animation)===null||h===void 0?void 0:h.play())}),{dragSnapToOrigin:u}=this.getProps();this.panSession=new Ly(t,{onSessionStart:s,onStart:i,onMove:o,onSessionEnd:a,resumeAnimation:l},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:u,contextWindow:zy(this.visualElement)})}stop(t,n){const r=this.isDragging;if(this.cancel(),!r)return;const{velocity:s}=n;this.startAnimation(s);const{onDragEnd:i}=this.getProps();i&&q.update(()=>i(t,n))}cancel(){this.isDragging=!1;const{projection:t,animationState:n}=this.visualElement;t&&(t.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:r}=this.getProps();!r&&this.openGlobalLock&&(this.openGlobalLock(),this.openGlobalLock=null),n&&n.setActive("whileDrag",!1)}updateAxis(t,n,r){const{drag:s}=this.getProps();if(!r||!Vi(t,s,this.currentDirection))return;const i=this.getAxisMotionValue(t);let o=this.originPoint[t]+r[t];this.constraints&&this.constraints[t]&&(o=TS(o,this.constraints[t],this.elastic[t])),i.set(o)}resolveConstraints(){var t;const{dragConstraints:n,dragElastic:r}=this.getProps(),s=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(t=this.visualElement.projection)===null||t===void 0?void 0:t.layout,i=this.constraints;n&&kr(n)?this.constraints||(this.constraints=this.resolveRefConstraints()):n&&s?this.constraints=CS(s.layoutBox,n):this.constraints=!1,this.elastic=NS(r),i!==this.constraints&&s&&this.constraints&&!this.hasMutatedConstraints&&et(o=>{this.getAxisMotionValue(o)&&(this.constraints[o]=RS(s.layoutBox[o],this.constraints[o]))})}resolveRefConstraints(){const{dragConstraints:t,onMeasureDragConstraints:n}=this.getProps();if(!t||!kr(t))return!1;const r=t.current,{projection:s}=this.visualElement;if(!s||!s.layout)return!1;const i=$S(r,s.root,this.visualElement.getTransformPagePoint());let o=PS(s.layout.layoutBox,i);if(n){const a=n(OS(o));this.hasMutatedConstraints=!!a,a&&(o=Dy(a))}return o}startAnimation(t){const{drag:n,dragMomentum:r,dragElastic:s,dragTransition:i,dragSnapToOrigin:o,onDragTransitionEnd:a}=this.getProps(),l=this.constraints||{},u=et(c=>{if(!Vi(c,n,this.currentDirection))return;let h=l&&l[c]||{};o&&(h={min:0,max:0});const f=s?200:1e6,p=s?40:1e7,y={type:"inertia",velocity:r?t[c]:0,bounceStiffness:f,bounceDamping:p,timeConstant:750,restDelta:1,restSpeed:10,...i,...h};return this.startAxisValueAnimation(c,y)});return Promise.all(u).then(a)}startAxisValueAnimation(t,n){const r=this.getAxisMotionValue(t);return r.start(Yc(t,r,0,n))}stopAnimation(){et(t=>this.getAxisMotionValue(t).stop())}pauseAnimation(){et(t=>{var n;return(n=this.getAxisMotionValue(t).animation)===null||n===void 0?void 0:n.pause()})}getAnimationState(t){var n;return(n=this.getAxisMotionValue(t).animation)===null||n===void 0?void 0:n.state}getAxisMotionValue(t){const n="_drag"+t.toUpperCase(),r=this.visualElement.getProps(),s=r[n];return s||this.visualElement.getValue(t,(r.initial?r.initial[t]:void 0)||0)}snapToCursor(t){et(n=>{const{drag:r}=this.getProps();if(!Vi(n,r,this.currentDirection))return;const{projection:s}=this.visualElement,i=this.getAxisMotionValue(n);if(s&&s.layout){const{min:o,max:a}=s.layout.layoutBox[n];i.set(t[n]-X(o,a,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:t,dragConstraints:n}=this.getProps(),{projection:r}=this.visualElement;if(!kr(n)||!r||!this.constraints)return;this.stopAnimation();const s={x:0,y:0};et(o=>{const a=this.getAxisMotionValue(o);if(a){const l=a.get();s[o]=AS({min:l,max:l},this.constraints[o])}});const{transformTemplate:i}=this.visualElement.getProps();this.visualElement.current.style.transform=i?i({},""):"none",r.root&&r.root.updateScroll(),r.updateLayout(),this.resolveConstraints(),et(o=>{if(!Vi(o,t,null))return;const a=this.getAxisMotionValue(o),{min:l,max:u}=this.constraints[o];a.set(X(l,u,s[o]))})}addListeners(){if(!this.visualElement.current)return;US.set(this.visualElement,this);const t=this.visualElement.current,n=Dt(t,"pointerdown",l=>{const{drag:u,dragListener:c=!0}=this.getProps();u&&c&&this.start(l)}),r=()=>{const{dragConstraints:l}=this.getProps();kr(l)&&(this.constraints=this.resolveRefConstraints())},{projection:s}=this.visualElement,i=s.addEventListener("measure",r);s&&!s.layout&&(s.root&&s.root.updateScroll(),s.updateLayout()),r();const o=Lt(window,"resize",()=>this.scalePositionWithinConstraints()),a=s.addEventListener("didUpdate",({delta:l,hasLayoutChanged:u})=>{this.isDragging&&u&&(et(c=>{const h=this.getAxisMotionValue(c);h&&(this.originPoint[c]+=l[c].translate,h.set(h.get()+l[c].translate))}),this.visualElement.render())});return()=>{o(),n(),i(),a&&a()}}getProps(){const t=this.visualElement.getProps(),{drag:n=!1,dragDirectionLock:r=!1,dragPropagation:s=!1,dragConstraints:i=!1,dragElastic:o=Pu,dragMomentum:a=!0}=t;return{...t,drag:n,dragDirectionLock:r,dragPropagation:s,dragConstraints:i,dragElastic:o,dragMomentum:a}}}function Vi(e,t,n){return(t===!0||t===e)&&(n===null||n===e)}function BS(e,t=10){let n=null;return Math.abs(e.y)>t?n="y":Math.abs(e.x)>t&&(n="x"),n}class VS extends kn{constructor(t){super(t),this.removeGroupControls=re,this.removeListeners=re,this.controls=new zS(t)}mount(){const{dragControls:t}=this.node.getProps();t&&(this.removeGroupControls=t.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||re}unmount(){this.removeGroupControls(),this.removeListeners()}}const xf=e=>(t,n)=>{e&&q.update(()=>e(t,n))};class FS extends kn{constructor(){super(...arguments),this.removePointerDownListener=re}onPointerDown(t){this.session=new Ly(t,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:zy(this.node)})}createPanHandlers(){const{onPanSessionStart:t,onPanStart:n,onPan:r,onPanEnd:s}=this.node.getProps();return{onSessionStart:xf(t),onStart:xf(n),onMove:r,onEnd:(i,o)=>{delete this.session,s&&q.update(()=>s(i,o))}}}mount(){this.removePointerDownListener=Dt(this.node.current,"pointerdown",t=>this.onPointerDown(t))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}function HS(){const e=k.useContext(pa);if(e===null)return[!0,null];const{isPresent:t,onExitComplete:n,register:r}=e,s=k.useId();return k.useEffect(()=>r(s),[]),!t&&n?[!1,()=>n&&n(s)]:[!0]}const so={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function bf(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}const ss={correct:(e,t)=>{if(!t.target)return e;if(typeof e=="string")if(I.test(e))e=parseFloat(e);else return e;const n=bf(e,t.target.x),r=bf(e,t.target.y);return`${n}% ${r}%`}},WS={correct:(e,{treeScale:t,projectionDelta:n})=>{const r=e,s=vn.parse(e);if(s.length>5)return r;const i=vn.createTransformer(e),o=typeof s[0]!="number"?1:0,a=n.x.scale*t.x,l=n.y.scale*t.y;s[0+o]/=a,s[1+o]/=l;const u=X(a,l,.5);return typeof s[2+o]=="number"&&(s[2+o]/=u),typeof s[3+o]=="number"&&(s[3+o]/=u),i(s)}};class qS extends jr.Component{componentDidMount(){const{visualElement:t,layoutGroup:n,switchLayoutGroup:r,layoutId:s}=this.props,{projection:i}=t;Z1(KS),i&&(n.group&&n.group.add(i),r&&r.register&&s&&r.register(i),i.root.didUpdate(),i.addEventListener("animationComplete",()=>{this.safeToRemove()}),i.setOptions({...i.options,onExitComplete:()=>this.safeToRemove()})),so.hasEverUpdated=!0}getSnapshotBeforeUpdate(t){const{layoutDependency:n,visualElement:r,drag:s,isPresent:i}=this.props,o=r.projection;return o&&(o.isPresent=i,s||t.layoutDependency!==n||n===void 0?o.willUpdate():this.safeToRemove(),t.isPresent!==i&&(i?o.promote():o.relegate()||q.postRender(()=>{const a=o.getStack();(!a||!a.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{projection:t}=this.props.visualElement;t&&(t.root.didUpdate(),queueMicrotask(()=>{!t.currentAnimation&&t.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:t,layoutGroup:n,switchLayoutGroup:r}=this.props,{projection:s}=t;s&&(s.scheduleCheckAfterUnmount(),n&&n.group&&n.group.remove(s),r&&r.deregister&&r.deregister(s))}safeToRemove(){const{safeToRemove:t}=this.props;t&&t()}render(){return null}}function By(e){const[t,n]=HS(),r=k.useContext(Dc);return jr.createElement(qS,{...e,layoutGroup:r,switchLayoutGroup:k.useContext(Dg),isPresent:t,safeToRemove:n})}const KS={borderRadius:{...ss,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:ss,borderTopRightRadius:ss,borderBottomLeftRadius:ss,borderBottomRightRadius:ss,boxShadow:WS},Vy=["TopLeft","TopRight","BottomLeft","BottomRight"],GS=Vy.length,kf=e=>typeof e=="string"?parseFloat(e):e,_f=e=>typeof e=="number"||I.test(e);function JS(e,t,n,r,s,i){s?(e.opacity=X(0,n.opacity!==void 0?n.opacity:1,YS(r)),e.opacityExit=X(t.opacity!==void 0?t.opacity:1,0,QS(r))):i&&(e.opacity=X(t.opacity!==void 0?t.opacity:1,n.opacity!==void 0?n.opacity:1,r));for(let o=0;o<GS;o++){const a=`border${Vy[o]}Radius`;let l=Sf(t,a),u=Sf(n,a);if(l===void 0&&u===void 0)continue;l||(l=0),u||(u=0),l===0||u===0||_f(l)===_f(u)?(e[a]=Math.max(X(kf(l),kf(u),r),0),(jt.test(u)||jt.test(l))&&(e[a]+="%")):e[a]=u}(t.rotate||n.rotate)&&(e.rotate=X(t.rotate||0,n.rotate||0,r))}function Sf(e,t){return e[t]!==void 0?e[t]:e.borderRadius}const YS=Fy(0,.5,dy),QS=Fy(.5,.95,re);function Fy(e,t,n){return r=>r<e?0:r>t?1:n(ni(e,t,r))}function Ef(e,t){e.min=t.min,e.max=t.max}function Xe(e,t){Ef(e.x,t.x),Ef(e.y,t.y)}function jf(e,t,n,r,s){return e-=t,e=Ho(e,1/n,r),s!==void 0&&(e=Ho(e,1/s,r)),e}function XS(e,t=0,n=1,r=.5,s,i=e,o=e){if(jt.test(t)&&(t=parseFloat(t),t=X(o.min,o.max,t/100)-o.min),typeof t!="number")return;let a=X(i.min,i.max,r);e===i&&(a-=t),e.min=jf(e.min,t,n,a,s),e.max=jf(e.max,t,n,a,s)}function Tf(e,t,[n,r,s],i,o){XS(e,t[n],t[r],t[s],t.scale,i,o)}const ZS=["x","scaleX","originX"],eE=["y","scaleY","originY"];function Cf(e,t,n,r){Tf(e.x,t,ZS,n?n.x:void 0,r?r.x:void 0),Tf(e.y,t,eE,n?n.y:void 0,r?r.y:void 0)}function Pf(e){return e.translate===0&&e.scale===1}function Hy(e){return Pf(e.x)&&Pf(e.y)}function tE(e,t){return e.x.min===t.x.min&&e.x.max===t.x.max&&e.y.min===t.y.min&&e.y.max===t.y.max}function Wy(e,t){return Math.round(e.x.min)===Math.round(t.x.min)&&Math.round(e.x.max)===Math.round(t.x.max)&&Math.round(e.y.min)===Math.round(t.y.min)&&Math.round(e.y.max)===Math.round(t.y.max)}function Af(e){return Ke(e.x)/Ke(e.y)}class nE{constructor(){this.members=[]}add(t){Qc(this.members,t),t.scheduleRender()}remove(t){if(Xc(this.members,t),t===this.prevLead&&(this.prevLead=void 0),t===this.lead){const n=this.members[this.members.length-1];n&&this.promote(n)}}relegate(t){const n=this.members.findIndex(s=>t===s);if(n===0)return!1;let r;for(let s=n;s>=0;s--){const i=this.members[s];if(i.isPresent!==!1){r=i;break}}return r?(this.promote(r),!0):!1}promote(t,n){const r=this.lead;if(t!==r&&(this.prevLead=r,this.lead=t,t.show(),r)){r.instance&&r.scheduleRender(),t.scheduleRender(),t.resumeFrom=r,n&&(t.resumeFrom.preserveOpacity=!0),r.snapshot&&(t.snapshot=r.snapshot,t.snapshot.latestValues=r.animationValues||r.latestValues),t.root&&t.root.isUpdating&&(t.isLayoutDirty=!0);const{crossfade:s}=t.options;s===!1&&r.hide()}}exitAnimationComplete(){this.members.forEach(t=>{const{options:n,resumingFrom:r}=t;n.onExitComplete&&n.onExitComplete(),r&&r.options.onExitComplete&&r.options.onExitComplete()})}scheduleRender(){this.members.forEach(t=>{t.instance&&t.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}function Rf(e,t,n){let r="";const s=e.x.translate/t.x,i=e.y.translate/t.y;if((s||i)&&(r=`translate3d(${s}px, ${i}px, 0) `),(t.x!==1||t.y!==1)&&(r+=`scale(${1/t.x}, ${1/t.y}) `),n){const{rotate:l,rotateX:u,rotateY:c}=n;l&&(r+=`rotate(${l}deg) `),u&&(r+=`rotateX(${u}deg) `),c&&(r+=`rotateY(${c}deg) `)}const o=e.x.scale*t.x,a=e.y.scale*t.y;return(o!==1||a!==1)&&(r+=`scale(${o}, ${a})`),r||"none"}const rE=(e,t)=>e.depth-t.depth;class sE{constructor(){this.children=[],this.isDirty=!1}add(t){Qc(this.children,t),this.isDirty=!0}remove(t){Xc(this.children,t),this.isDirty=!0}forEach(t){this.isDirty&&this.children.sort(rE),this.isDirty=!1,this.children.forEach(t)}}function iE(e,t){const n=performance.now(),r=({timestamp:s})=>{const i=s-n;i>=t&&(Vt(r),e(i-t))};return q.read(r,!0),()=>Vt(r)}function oE(e){window.MotionDebug&&window.MotionDebug.record(e)}function aE(e){return e instanceof SVGElement&&e.tagName!=="svg"}function lE(e,t,n){const r=ze(e)?e:Br(e);return r.start(Yc("",r,t,n)),r.animation}const Nf=["","X","Y","Z"],uE={visibility:"hidden"},Of=1e3;let cE=0;const On={type:"projectionFrame",totalNodes:0,resolvedTargetDeltas:0,recalculatedProjection:0};function qy({attachResizeListener:e,defaultParent:t,measureScroll:n,checkIsScrollRoot:r,resetTransform:s}){return class{constructor(o={},a=t==null?void 0:t()){this.id=cE++,this.animationId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,On.totalNodes=On.resolvedTargetDeltas=On.recalculatedProjection=0,this.nodes.forEach(fE),this.nodes.forEach(vE),this.nodes.forEach(wE),this.nodes.forEach(pE),oE(On)},this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=o,this.root=a?a.root||a:this,this.path=a?[...a.path,a]:[],this.parent=a,this.depth=a?a.depth+1:0;for(let l=0;l<this.path.length;l++)this.path[l].shouldResetTransform=!0;this.root===this&&(this.nodes=new sE)}addEventListener(o,a){return this.eventHandlers.has(o)||this.eventHandlers.set(o,new Zc),this.eventHandlers.get(o).add(a)}notifyListeners(o,...a){const l=this.eventHandlers.get(o);l&&l.notify(...a)}hasListeners(o){return this.eventHandlers.has(o)}mount(o,a=this.root.hasTreeAnimated){if(this.instance)return;this.isSVG=aE(o),this.instance=o;const{layoutId:l,layout:u,visualElement:c}=this.options;if(c&&!c.current&&c.mount(o),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),a&&(u||l)&&(this.isLayoutDirty=!0),e){let h;const f=()=>this.root.updateBlockedByResize=!1;e(o,()=>{this.root.updateBlockedByResize=!0,h&&h(),h=iE(f,250),so.hasAnimatedSinceResize&&(so.hasAnimatedSinceResize=!1,this.nodes.forEach(If))})}l&&this.root.registerSharedNode(l,this),this.options.animate!==!1&&c&&(l||u)&&this.addEventListener("didUpdate",({delta:h,hasLayoutChanged:f,hasRelativeTargetChanged:p,layout:y})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const w=this.options.transition||c.getDefaultTransition()||SE,{onLayoutAnimationStart:b,onLayoutAnimationComplete:v}=c.getProps(),m=!this.targetLayout||!Wy(this.targetLayout,y)||p,g=!f&&p;if(this.options.layoutRoot||this.resumeFrom&&this.resumeFrom.instance||g||f&&(m||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0),this.setAnimationOrigin(h,g);const x={...Jc(w,"layout"),onPlay:b,onComplete:v};(c.shouldReduceMotion||this.options.layoutRoot)&&(x.delay=0,x.type=!1),this.startAnimation(x)}else f||If(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=y})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const o=this.getStack();o&&o.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,Vt(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(xE),this.animationId++)}getTransformTemplate(){const{visualElement:o}=this.options;return o&&o.getProps().transformTemplate}willUpdate(o=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let c=0;c<this.path.length;c++){const h=this.path[c];h.shouldResetTransform=!0,h.updateScroll("snapshot"),h.options.layoutRoot&&h.willUpdate(!1)}const{layoutId:a,layout:l}=this.options;if(a===void 0&&!l)return;const u=this.getTransformTemplate();this.prevTransformTemplateValue=u?u(this.latestValues,""):void 0,this.updateSnapshot(),o&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){this.unblockUpdate(),this.clearAllSnapshots(),this.nodes.forEach(Lf);return}this.isUpdating||this.nodes.forEach(gE),this.isUpdating=!1,this.nodes.forEach(yE),this.nodes.forEach(dE),this.nodes.forEach(hE),this.clearAllSnapshots();const a=performance.now();Ee.delta=yn(0,1e3/60,a-Ee.timestamp),Ee.timestamp=a,Ee.isProcessing=!0,Xa.update.process(Ee),Xa.preRender.process(Ee),Xa.render.process(Ee),Ee.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,queueMicrotask(()=>this.update()))}clearAllSnapshots(){this.nodes.forEach(mE),this.sharedNodes.forEach(bE)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,q.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){q.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure())}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let l=0;l<this.path.length;l++)this.path[l].updateScroll();const o=this.layout;this.layout=this.measure(!1),this.layoutCorrected=ae(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:a}=this.options;a&&a.notify("LayoutMeasure",this.layout.layoutBox,o?o.layoutBox:void 0)}updateScroll(o="measure"){let a=!!(this.options.layoutScroll&&this.instance);this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===o&&(a=!1),a&&(this.scroll={animationId:this.root.animationId,phase:o,isRoot:r(this.instance),offset:n(this.instance)})}resetTransform(){if(!s)return;const o=this.isLayoutDirty||this.shouldResetTransform,a=this.projectionDelta&&!Hy(this.projectionDelta),l=this.getTransformTemplate(),u=l?l(this.latestValues,""):void 0,c=u!==this.prevTransformTemplateValue;o&&(a||Nn(this.latestValues)||c)&&(s(this.instance,u),this.shouldResetTransform=!1,this.scheduleRender())}measure(o=!0){const a=this.measurePageBox();let l=this.removeElementScroll(a);return o&&(l=this.removeTransform(l)),EE(l),{animationId:this.root.animationId,measuredBox:a,layoutBox:l,latestValues:{},source:this.id}}measurePageBox(){const{visualElement:o}=this.options;if(!o)return ae();const a=o.measureViewportBox(),{scroll:l}=this.root;return l&&(Yt(a.x,l.offset.x),Yt(a.y,l.offset.y)),a}removeElementScroll(o){const a=ae();Xe(a,o);for(let l=0;l<this.path.length;l++){const u=this.path[l],{scroll:c,options:h}=u;if(u!==this.root&&c&&h.layoutScroll){if(c.isRoot){Xe(a,o);const{scroll:f}=this.root;f&&(Yt(a.x,-f.offset.x),Yt(a.y,-f.offset.y))}Yt(a.x,c.offset.x),Yt(a.y,c.offset.y)}}return a}applyTransform(o,a=!1){const l=ae();Xe(l,o);for(let u=0;u<this.path.length;u++){const c=this.path[u];!a&&c.options.layoutScroll&&c.scroll&&c!==c.root&&Er(l,{x:-c.scroll.offset.x,y:-c.scroll.offset.y}),Nn(c.latestValues)&&Er(l,c.latestValues)}return Nn(this.latestValues)&&Er(l,this.latestValues),l}removeTransform(o){const a=ae();Xe(a,o);for(let l=0;l<this.path.length;l++){const u=this.path[l];if(!u.instance||!Nn(u.latestValues))continue;Au(u.latestValues)&&u.updateSnapshot();const c=ae(),h=u.measurePageBox();Xe(c,h),Cf(a,u.latestValues,u.snapshot?u.snapshot.layoutBox:void 0,c)}return Nn(this.latestValues)&&Cf(a,this.latestValues),a}setTargetDelta(o){this.targetDelta=o,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(o){this.options={...this.options,...o,crossfade:o.crossfade!==void 0?o.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==Ee.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(o=!1){var a;const l=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=l.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=l.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=l.isSharedProjectionDirty);const u=!!this.resumingFrom||this!==l;if(!(o||u&&this.isSharedProjectionDirty||this.isProjectionDirty||!((a=this.parent)===null||a===void 0)&&a.isProjectionDirty||this.attemptToResolveRelativeTarget))return;const{layout:h,layoutId:f}=this.options;if(!(!this.layout||!(h||f))){if(this.resolvedRelativeTargetAt=Ee.timestamp,!this.targetDelta&&!this.relativeTarget){const p=this.getClosestProjectingParent();p&&p.layout&&this.animationProgress!==1?(this.relativeParent=p,this.forceRelativeParentToResolveTarget(),this.relativeTarget=ae(),this.relativeTargetOrigin=ae(),Ts(this.relativeTargetOrigin,this.layout.layoutBox,p.layout.layoutBox),Xe(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(!(!this.relativeTarget&&!this.targetDelta)){if(this.target||(this.target=ae(),this.targetWithTransforms=ae()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),jS(this.target,this.relativeTarget,this.relativeParent.target)):this.targetDelta?(this.resumingFrom?this.target=this.applyTransform(this.layout.layoutBox):Xe(this.target,this.layout.layoutBox),$y(this.target,this.targetDelta)):Xe(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget){this.attemptToResolveRelativeTarget=!1;const p=this.getClosestProjectingParent();p&&!!p.resumingFrom==!!this.resumingFrom&&!p.options.layoutScroll&&p.target&&this.animationProgress!==1?(this.relativeParent=p,this.forceRelativeParentToResolveTarget(),this.relativeTarget=ae(),this.relativeTargetOrigin=ae(),Ts(this.relativeTargetOrigin,this.target,p.target),Xe(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}On.resolvedTargetDeltas++}}}getClosestProjectingParent(){if(!(!this.parent||Au(this.parent.latestValues)||My(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){var o;const a=this.getLead(),l=!!this.resumingFrom||this!==a;let u=!0;if((this.isProjectionDirty||!((o=this.parent)===null||o===void 0)&&o.isProjectionDirty)&&(u=!1),l&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(u=!1),this.resolvedRelativeTargetAt===Ee.timestamp&&(u=!1),u)return;const{layout:c,layoutId:h}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(c||h))return;Xe(this.layoutCorrected,this.layout.layoutBox);const f=this.treeScale.x,p=this.treeScale.y;IS(this.layoutCorrected,this.treeScale,this.path,l),a.layout&&!a.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(a.target=a.layout.layoutBox);const{target:y}=a;if(!y){this.projectionTransform&&(this.projectionDelta=Sr(),this.projectionTransform="none",this.scheduleRender());return}this.projectionDelta||(this.projectionDelta=Sr(),this.projectionDeltaWithTransform=Sr());const w=this.projectionTransform;js(this.projectionDelta,this.layoutCorrected,y,this.latestValues),this.projectionTransform=Rf(this.projectionDelta,this.treeScale),(this.projectionTransform!==w||this.treeScale.x!==f||this.treeScale.y!==p)&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",y)),On.recalculatedProjection++}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(o=!0){if(this.options.scheduleRender&&this.options.scheduleRender(),o){const a=this.getStack();a&&a.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}setAnimationOrigin(o,a=!1){const l=this.snapshot,u=l?l.latestValues:{},c={...this.latestValues},h=Sr();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!a;const f=ae(),p=l?l.source:void 0,y=this.layout?this.layout.source:void 0,w=p!==y,b=this.getStack(),v=!b||b.members.length<=1,m=!!(w&&!v&&this.options.crossfade===!0&&!this.path.some(_E));this.animationProgress=0;let g;this.mixTargetDelta=x=>{const _=x/1e3;Df(h.x,o.x,_),Df(h.y,o.y,_),this.setTargetDelta(h),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(Ts(f,this.layout.layoutBox,this.relativeParent.layout.layoutBox),kE(this.relativeTarget,this.relativeTargetOrigin,f,_),g&&tE(this.relativeTarget,g)&&(this.isProjectionDirty=!1),g||(g=ae()),Xe(g,this.relativeTarget)),w&&(this.animationValues=c,JS(c,u,this.latestValues,_,m,v)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=_},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(o){this.notifyListeners("animationStart"),this.currentAnimation&&this.currentAnimation.stop(),this.resumingFrom&&this.resumingFrom.currentAnimation&&this.resumingFrom.currentAnimation.stop(),this.pendingAnimation&&(Vt(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=q.update(()=>{so.hasAnimatedSinceResize=!0,this.currentAnimation=lE(0,Of,{...o,onUpdate:a=>{this.mixTargetDelta(a),o.onUpdate&&o.onUpdate(a)},onComplete:()=>{o.onComplete&&o.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const o=this.getStack();o&&o.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(Of),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const o=this.getLead();let{targetWithTransforms:a,target:l,layout:u,latestValues:c}=o;if(!(!a||!l||!u)){if(this!==o&&this.layout&&u&&Ky(this.options.animationType,this.layout.layoutBox,u.layoutBox)){l=this.target||ae();const h=Ke(this.layout.layoutBox.x);l.x.min=o.target.x.min,l.x.max=l.x.min+h;const f=Ke(this.layout.layoutBox.y);l.y.min=o.target.y.min,l.y.max=l.y.min+f}Xe(a,l),Er(a,c),js(this.projectionDeltaWithTransform,this.layoutCorrected,a,c)}}registerSharedNode(o,a){this.sharedNodes.has(o)||this.sharedNodes.set(o,new nE),this.sharedNodes.get(o).add(a);const u=a.options.initialPromotionConfig;a.promote({transition:u?u.transition:void 0,preserveFollowOpacity:u&&u.shouldPreserveFollowOpacity?u.shouldPreserveFollowOpacity(a):void 0})}isLead(){const o=this.getStack();return o?o.lead===this:!0}getLead(){var o;const{layoutId:a}=this.options;return a?((o=this.getStack())===null||o===void 0?void 0:o.lead)||this:this}getPrevLead(){var o;const{layoutId:a}=this.options;return a?(o=this.getStack())===null||o===void 0?void 0:o.prevLead:void 0}getStack(){const{layoutId:o}=this.options;if(o)return this.root.sharedNodes.get(o)}promote({needsReset:o,transition:a,preserveFollowOpacity:l}={}){const u=this.getStack();u&&u.promote(this,l),o&&(this.projectionDelta=void 0,this.needsReset=!0),a&&this.setOptions({transition:a})}relegate(){const o=this.getStack();return o?o.relegate(this):!1}resetRotation(){const{visualElement:o}=this.options;if(!o)return;let a=!1;const{latestValues:l}=o;if((l.rotate||l.rotateX||l.rotateY||l.rotateZ)&&(a=!0),!a)return;const u={};for(let c=0;c<Nf.length;c++){const h="rotate"+Nf[c];l[h]&&(u[h]=l[h],o.setStaticValue(h,0))}o.render();for(const c in u)o.setStaticValue(c,u[c]);o.scheduleRender()}getProjectionStyles(o){var a,l;if(!this.instance||this.isSVG)return;if(!this.isVisible)return uE;const u={visibility:""},c=this.getTransformTemplate();if(this.needsReset)return this.needsReset=!1,u.opacity="",u.pointerEvents=ro(o==null?void 0:o.pointerEvents)||"",u.transform=c?c(this.latestValues,""):"none",u;const h=this.getLead();if(!this.projectionDelta||!this.layout||!h.target){const w={};return this.options.layoutId&&(w.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,w.pointerEvents=ro(o==null?void 0:o.pointerEvents)||""),this.hasProjected&&!Nn(this.latestValues)&&(w.transform=c?c({},""):"none",this.hasProjected=!1),w}const f=h.animationValues||h.latestValues;this.applyTransformsToTarget(),u.transform=Rf(this.projectionDeltaWithTransform,this.treeScale,f),c&&(u.transform=c(f,u.transform));const{x:p,y}=this.projectionDelta;u.transformOrigin=`${p.origin*100}% ${y.origin*100}% 0`,h.animationValues?u.opacity=h===this?(l=(a=f.opacity)!==null&&a!==void 0?a:this.latestValues.opacity)!==null&&l!==void 0?l:1:this.preserveOpacity?this.latestValues.opacity:f.opacityExit:u.opacity=h===this?f.opacity!==void 0?f.opacity:"":f.opacityExit!==void 0?f.opacityExit:0;for(const w in Mo){if(f[w]===void 0)continue;const{correct:b,applyTo:v}=Mo[w],m=u.transform==="none"?f[w]:b(f[w],h);if(v){const g=v.length;for(let x=0;x<g;x++)u[v[x]]=m}else u[w]=m}return this.options.layoutId&&(u.pointerEvents=h===this?ro(o==null?void 0:o.pointerEvents)||"":"none"),u}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(o=>{var a;return(a=o.currentAnimation)===null||a===void 0?void 0:a.stop()}),this.root.nodes.forEach(Lf),this.root.sharedNodes.clear()}}}function dE(e){e.updateLayout()}function hE(e){var t;const n=((t=e.resumeFrom)===null||t===void 0?void 0:t.snapshot)||e.snapshot;if(e.isLead()&&e.layout&&n&&e.hasListeners("didUpdate")){const{layoutBox:r,measuredBox:s}=e.layout,{animationType:i}=e.options,o=n.source!==e.layout.source;i==="size"?et(h=>{const f=o?n.measuredBox[h]:n.layoutBox[h],p=Ke(f);f.min=r[h].min,f.max=f.min+p}):Ky(i,n.layoutBox,r)&&et(h=>{const f=o?n.measuredBox[h]:n.layoutBox[h],p=Ke(r[h]);f.max=f.min+p,e.relativeTarget&&!e.currentAnimation&&(e.isProjectionDirty=!0,e.relativeTarget[h].max=e.relativeTarget[h].min+p)});const a=Sr();js(a,r,n.layoutBox);const l=Sr();o?js(l,e.applyTransform(s,!0),n.measuredBox):js(l,r,n.layoutBox);const u=!Hy(a);let c=!1;if(!e.resumeFrom){const h=e.getClosestProjectingParent();if(h&&!h.resumeFrom){const{snapshot:f,layout:p}=h;if(f&&p){const y=ae();Ts(y,n.layoutBox,f.layoutBox);const w=ae();Ts(w,r,p.layoutBox),Wy(y,w)||(c=!0),h.options.layoutRoot&&(e.relativeTarget=w,e.relativeTargetOrigin=y,e.relativeParent=h)}}}e.notifyListeners("didUpdate",{layout:r,snapshot:n,delta:l,layoutDelta:a,hasLayoutChanged:u,hasRelativeTargetChanged:c})}else if(e.isLead()){const{onExitComplete:r}=e.options;r&&r()}e.options.transition=void 0}function fE(e){On.totalNodes++,e.parent&&(e.isProjecting()||(e.isProjectionDirty=e.parent.isProjectionDirty),e.isSharedProjectionDirty||(e.isSharedProjectionDirty=!!(e.isProjectionDirty||e.parent.isProjectionDirty||e.parent.isSharedProjectionDirty)),e.isTransformDirty||(e.isTransformDirty=e.parent.isTransformDirty))}function pE(e){e.isProjectionDirty=e.isSharedProjectionDirty=e.isTransformDirty=!1}function mE(e){e.clearSnapshot()}function Lf(e){e.clearMeasurements()}function gE(e){e.isLayoutDirty=!1}function yE(e){const{visualElement:t}=e.options;t&&t.getProps().onBeforeLayoutMeasure&&t.notify("BeforeLayoutMeasure"),e.resetTransform()}function If(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0,e.isProjectionDirty=!0}function vE(e){e.resolveTargetDelta()}function wE(e){e.calcProjection()}function xE(e){e.resetRotation()}function bE(e){e.removeLeadSnapshot()}function Df(e,t,n){e.translate=X(t.translate,0,n),e.scale=X(t.scale,1,n),e.origin=t.origin,e.originPoint=t.originPoint}function Mf(e,t,n,r){e.min=X(t.min,n.min,r),e.max=X(t.max,n.max,r)}function kE(e,t,n,r){Mf(e.x,t.x,n.x,r),Mf(e.y,t.y,n.y,r)}function _E(e){return e.animationValues&&e.animationValues.opacityExit!==void 0}const SE={duration:.45,ease:[.4,0,.1,1]},$f=e=>typeof navigator<"u"&&navigator.userAgent.toLowerCase().includes(e),Uf=$f("applewebkit/")&&!$f("chrome/")?Math.round:re;function zf(e){e.min=Uf(e.min),e.max=Uf(e.max)}function EE(e){zf(e.x),zf(e.y)}function Ky(e,t,n){return e==="position"||e==="preserve-aspect"&&!Cu(Af(t),Af(n),.2)}const jE=qy({attachResizeListener:(e,t)=>Lt(e,"resize",t),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),ul={current:void 0},Gy=qy({measureScroll:e=>({x:e.scrollLeft,y:e.scrollTop}),defaultParent:()=>{if(!ul.current){const e=new jE({});e.mount(window),e.setOptions({layoutScroll:!0}),ul.current=e}return ul.current},resetTransform:(e,t)=>{e.style.transform=t!==void 0?t:"none"},checkIsScrollRoot:e=>window.getComputedStyle(e).position==="fixed"}),TE={pan:{Feature:FS},drag:{Feature:VS,ProjectionNode:Gy,MeasureLayout:By}},CE=/var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;function PE(e){const t=CE.exec(e);if(!t)return[,];const[,n,r]=t;return[n,r]}function Nu(e,t,n=1){const[r,s]=PE(e);if(!r)return;const i=window.getComputedStyle(t).getPropertyValue(r);if(i){const o=i.trim();return Ay(o)?parseFloat(o):o}else return bu(s)?Nu(s,t,n+1):s}function AE(e,{...t},n){const r=e.current;if(!(r instanceof Element))return{target:t,transitionEnd:n};n&&(n={...n}),e.values.forEach(s=>{const i=s.get();if(!bu(i))return;const o=Nu(i,r);o&&s.set(o)});for(const s in t){const i=t[s];if(!bu(i))continue;const o=Nu(i,r);o&&(t[s]=o,n||(n={}),n[s]===void 0&&(n[s]=i))}return{target:t,transitionEnd:n}}const RE=new Set(["width","height","top","left","right","bottom","x","y","translateX","translateY"]),Jy=e=>RE.has(e),NE=e=>Object.keys(e).some(Jy),Bf=e=>e===Qn||e===I,Vf=(e,t)=>parseFloat(e.split(", ")[t]),Ff=(e,t)=>(n,{transform:r})=>{if(r==="none"||!r)return 0;const s=r.match(/^matrix3d\((.+)\)$/);if(s)return Vf(s[1],t);{const i=r.match(/^matrix\((.+)\)$/);return i?Vf(i[1],e):0}},OE=new Set(["x","y","z"]),LE=ui.filter(e=>!OE.has(e));function IE(e){const t=[];return LE.forEach(n=>{const r=e.getValue(n);r!==void 0&&(t.push([n,r.get()]),r.set(n.startsWith("scale")?1:0))}),t.length&&e.render(),t}const Vr={width:({x:e},{paddingLeft:t="0",paddingRight:n="0"})=>e.max-e.min-parseFloat(t)-parseFloat(n),height:({y:e},{paddingTop:t="0",paddingBottom:n="0"})=>e.max-e.min-parseFloat(t)-parseFloat(n),top:(e,{top:t})=>parseFloat(t),left:(e,{left:t})=>parseFloat(t),bottom:({y:e},{top:t})=>parseFloat(t)+(e.max-e.min),right:({x:e},{left:t})=>parseFloat(t)+(e.max-e.min),x:Ff(4,13),y:Ff(5,14)};Vr.translateX=Vr.x;Vr.translateY=Vr.y;const DE=(e,t,n)=>{const r=t.measureViewportBox(),s=t.current,i=getComputedStyle(s),{display:o}=i,a={};o==="none"&&t.setStaticValue("display",e.display||"block"),n.forEach(u=>{a[u]=Vr[u](r,i)}),t.render();const l=t.measureViewportBox();return n.forEach(u=>{const c=t.getValue(u);c&&c.jump(a[u]),e[u]=Vr[u](l,i)}),e},ME=(e,t,n={},r={})=>{t={...t},r={...r};const s=Object.keys(t).filter(Jy);let i=[],o=!1;const a=[];if(s.forEach(l=>{const u=e.getValue(l);if(!e.hasValue(l))return;let c=n[l],h=rs(c);const f=t[l];let p;if(Uo(f)){const y=f.length,w=f[0]===null?1:0;c=f[w],h=rs(c);for(let b=w;b<y&&f[b]!==null;b++)p?Hc(rs(f[b])===p):p=rs(f[b])}else p=rs(f);if(h!==p)if(Bf(h)&&Bf(p)){const y=u.get();typeof y=="string"&&u.set(parseFloat(y)),typeof f=="string"?t[l]=parseFloat(f):Array.isArray(f)&&p===I&&(t[l]=f.map(parseFloat))}else h!=null&&h.transform&&(p!=null&&p.transform)&&(c===0||f===0)?c===0?u.set(p.transform(c)):t[l]=h.transform(f):(o||(i=IE(e),o=!0),a.push(l),r[l]=r[l]!==void 0?r[l]:t[l],u.jump(f))}),a.length){const l=a.indexOf("height")>=0?window.pageYOffset:null,u=DE(t,e,a);return i.length&&i.forEach(([c,h])=>{e.getValue(c).set(h)}),e.render(),ma&&l!==null&&window.scrollTo({top:l}),{target:u,transitionEnd:r}}else return{target:t,transitionEnd:r}};function $E(e,t,n,r){return NE(t)?ME(e,t,n,r):{target:t,transitionEnd:r}}const UE=(e,t,n,r)=>{const s=AE(e,t,r);return t=s.target,r=s.transitionEnd,$E(e,t,n,r)},Ou={current:null},Yy={current:!1};function zE(){if(Yy.current=!0,!!ma)if(window.matchMedia){const e=window.matchMedia("(prefers-reduced-motion)"),t=()=>Ou.current=e.matches;e.addListener(t),t()}else Ou.current=!1}function BE(e,t,n){const{willChange:r}=t;for(const s in t){const i=t[s],o=n[s];if(ze(i))e.addValue(s,i),Fo(r)&&r.add(s);else if(ze(o))e.addValue(s,Br(i,{owner:e})),Fo(r)&&r.remove(s);else if(o!==i)if(e.hasValue(s)){const a=e.getValue(s);!a.hasAnimated&&a.set(i)}else{const a=e.getStaticValue(s);e.addValue(s,Br(a!==void 0?a:i,{owner:e}))}}for(const s in n)t[s]===void 0&&e.removeValue(s);return t}const Hf=new WeakMap,Qy=Object.keys(ti),VE=Qy.length,Wf=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"],FE=Ic.length;class HE{constructor({parent:t,props:n,presenceContext:r,reducedMotionConfig:s,visualState:i},o={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.scheduleRender=()=>q.render(this.render,!1,!0);const{latestValues:a,renderState:l}=i;this.latestValues=a,this.baseTarget={...a},this.initialValues=n.initial?{...a}:{},this.renderState=l,this.parent=t,this.props=n,this.presenceContext=r,this.depth=t?t.depth+1:0,this.reducedMotionConfig=s,this.options=o,this.isControllingVariants=ya(n),this.isVariantNode=Ig(n),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(t&&t.current);const{willChange:u,...c}=this.scrapeMotionValuesFromProps(n,{});for(const h in c){const f=c[h];a[h]!==void 0&&ze(f)&&(f.set(a[h],!1),Fo(u)&&u.add(h))}}scrapeMotionValuesFromProps(t,n){return{}}mount(t){this.current=t,Hf.set(t,this),this.projection&&!this.projection.instance&&this.projection.mount(t),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((n,r)=>this.bindToMotionValue(r,n)),Yy.current||zE(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:Ou.current,this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){Hf.delete(this.current),this.projection&&this.projection.unmount(),Vt(this.notifyUpdate),Vt(this.render),this.valueSubscriptions.forEach(t=>t()),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(const t in this.events)this.events[t].clear();for(const t in this.features)this.features[t].unmount();this.current=null}bindToMotionValue(t,n){const r=Yn.has(t),s=n.on("change",o=>{this.latestValues[t]=o,this.props.onUpdate&&q.update(this.notifyUpdate,!1,!0),r&&this.projection&&(this.projection.isTransformDirty=!0)}),i=n.on("renderRequest",this.scheduleRender);this.valueSubscriptions.set(t,()=>{s(),i()})}sortNodePosition(t){return!this.current||!this.sortInstanceNodePosition||this.type!==t.type?0:this.sortInstanceNodePosition(this.current,t.current)}loadFeatures({children:t,...n},r,s,i){let o,a;for(let l=0;l<VE;l++){const u=Qy[l],{isEnabled:c,Feature:h,ProjectionNode:f,MeasureLayout:p}=ti[u];f&&(o=f),c(n)&&(!this.features[u]&&h&&(this.features[u]=new h(this)),p&&(a=p))}if((this.type==="html"||this.type==="svg")&&!this.projection&&o){this.projection=new o(this.latestValues,this.parent&&this.parent.projection);const{layoutId:l,layout:u,drag:c,dragConstraints:h,layoutScroll:f,layoutRoot:p}=n;this.projection.setOptions({layoutId:l,layout:u,alwaysMeasureLayout:!!c||h&&kr(h),visualElement:this,scheduleRender:()=>this.scheduleRender(),animationType:typeof u=="string"?u:"both",initialPromotionConfig:i,layoutScroll:f,layoutRoot:p})}return a}updateFeatures(){for(const t in this.features){const n=this.features[t];n.isMounted?n.update():(n.mount(),n.isMounted=!0)}}triggerBuild(){this.build(this.renderState,this.latestValues,this.options,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):ae()}getStaticValue(t){return this.latestValues[t]}setStaticValue(t,n){this.latestValues[t]=n}makeTargetAnimatable(t,n=!0){return this.makeTargetAnimatableFromInstance(t,this.props,n)}update(t,n){(t.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=t,this.prevPresenceContext=this.presenceContext,this.presenceContext=n;for(let r=0;r<Wf.length;r++){const s=Wf[r];this.propEventSubscriptions[s]&&(this.propEventSubscriptions[s](),delete this.propEventSubscriptions[s]);const i=t["on"+s];i&&(this.propEventSubscriptions[s]=this.on(s,i))}this.prevMotionValues=BE(this,this.scrapeMotionValuesFromProps(t,this.prevProps),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(t){return this.props.variants?this.props.variants[t]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}getVariantContext(t=!1){if(t)return this.parent?this.parent.getVariantContext():void 0;if(!this.isControllingVariants){const r=this.parent?this.parent.getVariantContext()||{}:{};return this.props.initial!==void 0&&(r.initial=this.props.initial),r}const n={};for(let r=0;r<FE;r++){const s=Ic[r],i=this.props[s];(ei(i)||i===!1)&&(n[s]=i)}return n}addVariantChild(t){const n=this.getClosestVariantNode();if(n)return n.variantChildren&&n.variantChildren.add(t),()=>n.variantChildren.delete(t)}addValue(t,n){n!==this.values.get(t)&&(this.removeValue(t),this.bindToMotionValue(t,n)),this.values.set(t,n),this.latestValues[t]=n.get()}removeValue(t){this.values.delete(t);const n=this.valueSubscriptions.get(t);n&&(n(),this.valueSubscriptions.delete(t)),delete this.latestValues[t],this.removeValueFromRenderState(t,this.renderState)}hasValue(t){return this.values.has(t)}getValue(t,n){if(this.props.values&&this.props.values[t])return this.props.values[t];let r=this.values.get(t);return r===void 0&&n!==void 0&&(r=Br(n,{owner:this}),this.addValue(t,r)),r}readValue(t){var n;return this.latestValues[t]!==void 0||!this.current?this.latestValues[t]:(n=this.getBaseTargetFromProps(this.props,t))!==null&&n!==void 0?n:this.readValueFromInstance(this.current,t,this.options)}setBaseTarget(t,n){this.baseTarget[t]=n}getBaseTarget(t){var n;const{initial:r}=this.props,s=typeof r=="string"||typeof r=="object"?(n=Fc(this.props,r))===null||n===void 0?void 0:n[t]:void 0;if(r&&s!==void 0)return s;const i=this.getBaseTargetFromProps(this.props,t);return i!==void 0&&!ze(i)?i:this.initialValues[t]!==void 0&&s===void 0?void 0:this.baseTarget[t]}on(t,n){return this.events[t]||(this.events[t]=new Zc),this.events[t].add(n)}notify(t,...n){this.events[t]&&this.events[t].notify(...n)}}class Xy extends HE{sortInstanceNodePosition(t,n){return t.compareDocumentPosition(n)&2?1:-1}getBaseTargetFromProps(t,n){return t.style?t.style[n]:void 0}removeValueFromRenderState(t,{vars:n,style:r}){delete n[t],delete r[t]}makeTargetAnimatableFromInstance({transition:t,transitionEnd:n,...r},{transformValues:s},i){let o=aS(r,t||{},this);if(s&&(n&&(n=s(n)),r&&(r=s(r)),o&&(o=s(o))),i){iS(this,r,o);const a=UE(this,r,o,n);n=a.transitionEnd,r=a.target}return{transition:t,transitionEnd:n,...r}}}function WE(e){return window.getComputedStyle(e)}class qE extends Xy{constructor(){super(...arguments),this.type="html"}readValueFromInstance(t,n){if(Yn.has(n)){const r=Gc(n);return r&&r.default||0}else{const r=WE(t),s=(Ug(n)?r.getPropertyValue(n):r[n])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(t,{transformPagePoint:n}){return Uy(t,n)}build(t,n,r,s){$c(t,n,r,s.transformTemplate)}scrapeMotionValuesFromProps(t,n){return Vc(t,n)}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:t}=this.props;ze(t)&&(this.childSubscription=t.on("change",n=>{this.current&&(this.current.textContent=`${n}`)}))}renderInstance(t,n,r,s){Wg(t,n,r,s)}}class KE extends Xy{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1}getBaseTargetFromProps(t,n){return t[n]}readValueFromInstance(t,n){if(Yn.has(n)){const r=Gc(n);return r&&r.default||0}return n=qg.has(n)?n:Oc(n),t.getAttribute(n)}measureInstanceViewportBox(){return ae()}scrapeMotionValuesFromProps(t,n){return Gg(t,n)}build(t,n,r,s){zc(t,n,r,this.isSVGTag,s.transformTemplate)}renderInstance(t,n,r,s){Kg(t,n,r,s)}mount(t){this.isSVGTag=Bc(t.tagName),super.mount(t)}}const GE=(e,t)=>Mc(e)?new KE(t,{enableHardwareAcceleration:!1}):new qE(t,{enableHardwareAcceleration:!0}),JE={layout:{ProjectionNode:Gy,MeasureLayout:By}},YE={...kS,...Vk,...TE,...JE},ce=Q1((e,t)=>Pk(e,t,YE,GE));function Zy(){const e=k.useRef(!1);return Nc(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function QE(){const e=Zy(),[t,n]=k.useState(0),r=k.useCallback(()=>{e.current&&n(t+1)},[t]);return[k.useCallback(()=>q.postRender(r),[r]),t]}class XE extends k.Component{getSnapshotBeforeUpdate(t){const n=this.props.childRef.current;if(n&&t.isPresent&&!this.props.isPresent){const r=this.props.sizeRef.current;r.height=n.offsetHeight||0,r.width=n.offsetWidth||0,r.top=n.offsetTop,r.left=n.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function ZE({children:e,isPresent:t}){const n=k.useId(),r=k.useRef(null),s=k.useRef({width:0,height:0,top:0,left:0});return k.useInsertionEffect(()=>{const{width:i,height:o,top:a,left:l}=s.current;if(t||!r.current||!i||!o)return;r.current.dataset.motionPopId=n;const u=document.createElement("style");return document.head.appendChild(u),u.sheet&&u.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${i}px !important;
            height: ${o}px !important;
            top: ${a}px !important;
            left: ${l}px !important;
          }
        `),()=>{document.head.removeChild(u)}},[t]),k.createElement(XE,{isPresent:t,childRef:r,sizeRef:s},k.cloneElement(e,{ref:r}))}const cl=({children:e,initial:t,isPresent:n,onExitComplete:r,custom:s,presenceAffectsLayout:i,mode:o})=>{const a=Jg(ej),l=k.useId(),u=k.useMemo(()=>({id:l,initial:t,isPresent:n,custom:s,onExitComplete:c=>{a.set(c,!0);for(const h of a.values())if(!h)return;r&&r()},register:c=>(a.set(c,!1),()=>a.delete(c))}),i?void 0:[n]);return k.useMemo(()=>{a.forEach((c,h)=>a.set(h,!1))},[n]),k.useEffect(()=>{!n&&!a.size&&r&&r()},[n]),o==="popLayout"&&(e=k.createElement(ZE,{isPresent:n},e)),k.createElement(pa.Provider,{value:u},e)};function ej(){return new Map}function tj(e){return k.useEffect(()=>()=>e(),[])}const Ln=e=>e.key||"";function nj(e,t){e.forEach(n=>{const r=Ln(n);t.set(r,n)})}function rj(e){const t=[];return k.Children.forEach(e,n=>{k.isValidElement(n)&&t.push(n)}),t}const ev=({children:e,custom:t,initial:n=!0,onExitComplete:r,exitBeforeEnter:s,presenceAffectsLayout:i=!0,mode:o="sync"})=>{const a=k.useContext(Dc).forceRender||QE()[0],l=Zy(),u=rj(e);let c=u;const h=k.useRef(new Map).current,f=k.useRef(c),p=k.useRef(new Map).current,y=k.useRef(!0);if(Nc(()=>{y.current=!1,nj(u,p),f.current=c}),tj(()=>{y.current=!0,p.clear(),h.clear()}),y.current)return k.createElement(k.Fragment,null,c.map(m=>k.createElement(cl,{key:Ln(m),isPresent:!0,initial:n?void 0:!1,presenceAffectsLayout:i,mode:o},m)));c=[...c];const w=f.current.map(Ln),b=u.map(Ln),v=w.length;for(let m=0;m<v;m++){const g=w[m];b.indexOf(g)===-1&&!h.has(g)&&h.set(g,void 0)}return o==="wait"&&h.size&&(c=[]),h.forEach((m,g)=>{if(b.indexOf(g)!==-1)return;const x=p.get(g);if(!x)return;const _=w.indexOf(g);let S=m;if(!S){const j=()=>{h.delete(g);const E=Array.from(p.keys()).filter(R=>!b.includes(R));if(E.forEach(R=>p.delete(R)),f.current=u.filter(R=>{const L=Ln(R);return L===g||E.includes(L)}),!h.size){if(l.current===!1)return;a(),r&&r()}};S=k.createElement(cl,{key:Ln(x),isPresent:!1,onExitComplete:j,custom:t,presenceAffectsLayout:i,mode:o},x),h.set(g,S)}c.splice(_,0,S)}),c=c.map(m=>{const g=m.key;return h.has(g)?m:k.createElement(cl,{key:Ln(m),isPresent:!0,presenceAffectsLayout:i,mode:o},m)}),k.createElement(k.Fragment,null,h.size?c:c.map(m=>k.cloneElement(m)))},dl=({icon:e,value:t,label:n,subtitle:r,colorClass:s})=>d.jsxs("div",{className:"stat-card",children:[d.jsx("div",{className:`stat-icon-container ${s}`,children:d.jsx(e,{size:24})}),d.jsxs("div",{className:"stat-info",children:[d.jsx("h3",{children:t}),d.jsx("p",{className:"stat-label",children:n}),r&&d.jsx("p",{className:"stat-subtitle",children:r})]})]}),sj=({doubt:e,onClick:t})=>{var s;const n=e.subject==="Mathematics"?"#4F46E5":e.subject==="Physics"?"#F59E0B":e.subject==="Chemistry"?"#10B981":"#388BFD",r=((s=e.profiles)==null?void 0:s.full_name)||"User";return d.jsxs("div",{className:"doubt-card-item",onClick:()=>t(e),children:[d.jsxs("div",{className:"doubt-main",children:[d.jsx("div",{className:"doubt-subject-icon",style:{backgroundColor:`${n}22`,color:n},children:d.jsx(qr,{size:24})}),d.jsxs("div",{className:"doubt-details",children:[d.jsxs("div",{className:"doubt-header",children:[e.is_blitz&&d.jsx("span",{className:"doubt-tag",children:"Blitz"}),d.jsx("span",{className:"doubt-title",children:e.title})]}),d.jsxs("div",{className:"doubt-meta",children:[d.jsx("span",{className:"subject-text",style:{color:n},children:e.subject}),d.jsx("span",{className:"separator",children:"•"}),d.jsxs("span",{children:["Class ",e.grade||"12"]})]}),d.jsxs("div",{className:"doubt-footer",children:[d.jsxs("div",{className:"asker-info",children:[d.jsx("div",{className:"avatar-mini",children:d.jsx("img",{src:`https://api.dicebear.com/7.x/avataaars/svg?seed=${r}`,alt:"avatar"})}),d.jsx("span",{children:r}),d.jsx("span",{className:"separator",children:"•"}),d.jsx("span",{className:"time-text",children:e.created_at?new Date(e.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"Just now"})]}),d.jsxs("div",{className:"answer-count",children:[d.jsx(aa,{size:14}),d.jsxs("span",{children:[e.answer_count||0," Answers"]})]})]})]})]}),d.jsxs("div",{className:"doubt-pts",children:[e.points||10," pts"]})]})};function ij({searchQuery:e,isScholar:t,activeTab:n,onDoubtClick:r,onViewAll:s,refreshTrigger:i}){var w;const{profile:o}=Ye(),[a,l]=k.useState([]),[u,c]=k.useState(!0),[h,f]=k.useState({unanswered:0,solved:0});k.useEffect(()=>{p(),t&&y()},[e,n,i]);const p=async()=>{c(!0);try{let b=F.from("doubts").select("*");n==="Unanswered Feed"?b=b.eq("status","open").order("created_at",{ascending:!0}):n==="Scholar Hub"?b=b.eq("status","open").order("created_at",{ascending:!1}):b=b.order("created_at",{ascending:!1}),e&&(b=b.or(`title.ilike.%${e}%,subject.ilike.%${e}%,content.ilike.%${e}%`));const{data:v,error:m}=await b.limit(40);if(m&&console.error("Error fetching doubts:",m),v){let g=v;(n==="Unanswered Feed"||n==="Scholar Hub")&&(g=v.filter(_=>{const S=!_.answer_count||_.answer_count===0;return _.status==="open"&&S}));const x=[...new Set(g.map(_=>_.user_id).filter(Boolean))];if(x.length>0){const{data:_}=await F.from("profiles").select("id, full_name, role").in("id",x);if(_){const S={};_.forEach(E=>{S[E.id]=E});const j=g.map(E=>({...E,profiles:S[E.user_id]||null}));l(j);return}}l(g)}}catch(b){console.error(b)}finally{c(!1)}},y=async()=>{const{data:b}=await F.from("doubts").select("id, status, answer_count").eq("status","open"),v=b?b.filter(g=>!g.answer_count||g.answer_count===0).length:0,{count:m}=await F.from("answers").select("*",{count:"exact",head:!0});f({unanswered:v,solved:m||0})};return d.jsxs(ce.div,{className:"main-content",initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},transition:{duration:.3},children:[n!=="Unanswered Feed"&&d.jsxs("div",{className:"greeting-section",children:[d.jsxs("h1",{children:["Good evening, ",((w=o==null?void 0:o.full_name)==null?void 0:w.split(" ")[0])||"Scholar","! 👋"]}),d.jsx("p",{children:t?"Ready to share your expertise? Here are students waiting for help.":"Need help with something? Our scholars are here for you."})]}),t&&n!=="Unanswered Feed"&&d.jsxs("div",{className:"stats-row",children:[d.jsx(dl,{icon:qr,value:h.unanswered,label:"Unanswered",subtitle:"Doubts",colorClass:"blue"}),d.jsx(dl,{icon:gn,value:h.solved,label:"Doubts Solved",subtitle:"by Community",colorClass:"green"}),d.jsx(dl,{icon:Pc,value:(o==null?void 0:o.reputation)||"4.8",label:"Your Reputation",subtitle:"(Excellent)",colorClass:"yellow"})]}),d.jsxs("div",{className:"recent-doubts-section",children:[d.jsxs("div",{className:"section-header",children:[d.jsx("h2",{children:e?`Search Results for "${e}"`:n==="Unanswered Feed"?"Unanswered Feed":n==="Scholar Hub"?"High Priority Doubts":"Recent Doubts"}),!e&&n!=="Unanswered Feed"&&d.jsx("button",{className:"btn-link",onClick:s,children:"View All"})]}),u?d.jsxs("div",{className:"feed-loading",children:[d.jsx("div",{className:"spinner"}),d.jsx("span",{children:"Scanning academic frequency..."})]}):a.length===0?d.jsxs("div",{className:"empty-feed",children:[d.jsx("div",{className:"empty-icon-box",children:d.jsx(la,{size:48})}),d.jsx("h3",{children:"No results found"}),d.jsx("p",{children:"Try adjusting your search terms or ask a new doubt."})]}):d.jsx("div",{className:"doubts-list",children:a.map(b=>d.jsx(sj,{doubt:b,onClick:()=>r==null?void 0:r(b)},b.id))}),!e&&a.length>0&&n!=="Unanswered Feed"&&d.jsx("div",{className:"section-footer",children:d.jsx("button",{className:"btn-view-all",onClick:s,children:"View all doubts →"})})]}),d.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .main-content {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background-color: var(--bg-deep);
        }

        .feed-loading {
          padding: 60px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          color: var(--text-muted);
        }

        .empty-feed {
          padding: 60px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .empty-icon-box {
          width: 80px;
          height: 80px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .greeting-section h1 {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .greeting-section p {
          color: var(--text-muted);
          font-size: 1rem;
          margin-bottom: 40px;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }

        .stat-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.2s;
          cursor: pointer;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .stat-icon-container {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon-container.blue { background-color: rgba(79, 70, 229, 0.1); color: var(--primary); }
        .stat-icon-container.green { background-color: rgba(16, 185, 129, 0.1); color: #10B981; }
        .stat-icon-container.yellow { background-color: rgba(245, 158, 11, 0.1); color: #F59E0B; }

        .stat-info h3 {
          font-size: 1.5rem;
          margin-bottom: 2px;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .stat-subtitle {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .recent-doubts-section {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 32px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .section-header h2 {
          font-size: 1.25rem;
        }

        .btn-link {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .doubts-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .doubt-card-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
        }

        .doubt-card-item:hover .doubt-title {
          color: var(--primary);
        }

        .doubt-card-item:last-child {
          border-bottom: none;
        }

        .doubt-main {
          display: flex;
          gap: 20px;
        }

        .doubt-subject-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .doubt-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .doubt-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .doubt-tag {
          background-color: var(--accent-purple);
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .doubt-title {
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.4;
          transition: color 0.2s;
        }

        .doubt-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .separator {
          color: var(--border);
        }

        .doubt-footer {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .asker-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .avatar-mini {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          overflow: hidden;
          background-color: var(--bg-card);
        }

        .answer-count {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--primary);
          font-weight: 600;
        }

        .doubt-pts {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          padding: 6px 12px;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .section-footer {
          margin-top: 32px;
          display: flex;
          justify-content: center;
        }

        .btn-view-all {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .btn-view-all:hover {
          transform: translateX(4px);
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top: 3px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}})]})}const oj=({rank:e,name:t,subjects:n,score:r,avatar:s,onClick:i})=>d.jsxs("div",{className:"scholar-item",onClick:i,children:[d.jsx("div",{className:`rank-badge rank-${e}`,children:e}),d.jsx("div",{className:"scholar-avatar",children:d.jsx("img",{src:`https://api.dicebear.com/7.x/avataaars/svg?seed=${s}`,alt:"avatar"})}),d.jsxs("div",{className:"scholar-info",children:[d.jsx("h4",{children:t}),d.jsx("p",{children:n})]}),d.jsxs("div",{className:"scholar-score",children:[r,"%"]})]}),Fi=({number:e,icon:t,title:n,description:r})=>d.jsxs("div",{className:"step-item",children:[d.jsxs("div",{className:"step-number-container",children:[d.jsx("div",{className:"step-number",children:e}),d.jsx("div",{className:"step-line"})]}),d.jsxs("div",{className:"step-content",children:[d.jsx("div",{className:"step-icon-box",children:d.jsx(t,{size:16})}),d.jsxs("div",{className:"step-text",children:[d.jsx("h5",{children:n}),d.jsx("p",{children:r})]})]})]});function aj({setActiveTab:e,onProfileClick:t}){const[n,r]=k.useState([]);k.useEffect(()=>{s()},[]);const s=async()=>{const{data:i}=await F.from("profiles").select("*").order("academic_percentage",{ascending:!1}).limit(5);i&&r(i)};return d.jsxs(ce.aside,{className:"right-panel",initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{duration:.4,delay:.1},children:[d.jsxs("div",{className:"panel-section",children:[d.jsxs("div",{className:"section-header",children:[d.jsx("h3",{children:"Top Scholars"}),d.jsx("button",{className:"btn-link",onClick:()=>e("Top Scholars"),children:"View All"})]}),d.jsx("div",{className:"scholars-list",children:n.length>0?n.map((i,o)=>d.jsx(oj,{rank:o+1,name:i.full_name,subjects:(i.subjects||[]).slice(0,2).join(", ")||"General",score:i.academic_percentage,avatar:i.full_name,onClick:()=>t==null?void 0:t(i.id)},i.id)):d.jsx("div",{style:{textAlign:"center",padding:"20px",color:"var(--text-muted)",fontSize:"0.9rem"},children:"Loading scholars..."})})]}),d.jsxs("div",{className:"panel-section",children:[d.jsx("div",{className:"section-header",children:d.jsx("h3",{children:"How it works"})}),d.jsxs("div",{className:"steps-container",children:[d.jsx(Fi,{number:1,icon:qr,title:"Ask your doubt",description:"Post your question clearly."}),d.jsx(Fi,{number:2,icon:Ww,title:"Scholars answer",description:"Top scoring students help you."}),d.jsx(Fi,{number:3,icon:gn,title:"Best answer chosen",description:"Mark the best answer."}),d.jsx(Fi,{number:4,icon:Kn,title:"Everyone learns",description:"Knowledge grows together."})]})]}),d.jsxs("div",{className:"quote-card",children:[d.jsx(uh,{size:32,className:"quote-icon"}),d.jsxs("div",{className:"quote-content",children:[d.jsx("p",{className:"quote-text",children:"The beautiful thing about learning is that no one can take it away from you."}),d.jsx("span",{className:"quote-author",children:"— B.B. King"})]}),d.jsx(uh,{size:32,className:"quote-icon-bottom"})]}),d.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .right-panel {
          width: var(--panel-width);
          background-color: var(--bg-deep);
          border-left: 1px solid var(--border);
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          overflow-y: auto;
          overflow-x: hidden;
          flex-shrink: 0;
        }

        .panel-section .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .panel-section .section-header h3 {
          font-size: 1.1rem;
          color: var(--text-main);
        }

        .scholars-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .scholar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          padding: 12px;
          border-radius: 12px;
          transition: border-color 0.2s;
          cursor: pointer;
        }

        .scholar-item:hover {
          border-color: var(--text-muted);
        }

        .rank-badge {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 800;
          background-color: var(--bg-card);
          color: var(--text-muted);
        }

        .rank-1 { background-color: #F59E0B; color: white; }
        .rank-2 { background-color: #94A3B8; color: white; }
        .rank-3 { background-color: #D97706; color: white; }

        .scholar-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          background-color: var(--bg-card);
        }

        .scholar-info {
          flex: 1;
        }

        .scholar-info h4 {
          font-size: 0.9rem;
          margin-bottom: 2px;
        }

        .scholar-info p {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .scholar-score {
          font-size: 0.9rem;
          font-weight: 700;
          color: #10B981;
        }

        .steps-container {
          display: flex;
          flex-direction: column;
        }

        .step-item {
          display: flex;
          gap: 16px;
        }

        .step-number-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .step-number {
          width: 28px;
          height: 28px;
          background-color: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 800;
          z-index: 1;
        }

        .step-line {
          width: 2px;
          flex: 1;
          background-color: var(--border);
          margin: 4px 0;
        }

        .step-item:last-child .step-line {
          display: none;
        }

        .step-content {
          display: flex;
          gap: 12px;
          padding-bottom: 24px;
        }

        .step-icon-box {
          width: 32px;
          height: 32px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          flex-shrink: 0;
        }

        .step-text h5 {
          font-size: 0.9rem;
          margin-bottom: 2px;
        }

        .step-text p {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .quote-card {
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 1px solid rgba(79, 70, 229, 0.2);
          border-radius: 20px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          min-height: 140px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .quote-content {
          position: relative;
          z-index: 1;
        }

        .quote-text {
          font-size: 0.95rem;
          line-height: 1.5;
          font-weight: 500;
          margin-bottom: 12px;
        }

        .quote-author {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .quote-icon {
          position: absolute;
          top: -10px;
          left: -10px;
          opacity: 0.1;
          color: var(--primary);
        }

        .quote-icon-bottom {
          position: absolute;
          bottom: -10px;
          right: -10px;
          opacity: 0.1;
          color: var(--primary);
        }
      `}})]})}function lj({activeTab:e,setActiveTab:t}){const{profile:n}=Ye(),o=(n==null?void 0:n.role)==="Scholar"||(n==null?void 0:n.role)==="Elite Scholar"?[{icon:Ao,label:"Scholar Hub"},{icon:Kn,label:"Unanswered Feed"},{icon:gn,label:"My Answers"},{icon:qs,label:"Profile"}]:[{icon:Ao,label:"Home"},{icon:au,label:"Ask Doubt"},{icon:Kn,label:"My Doubts"},{icon:qs,label:"Profile"}];return d.jsxs("nav",{className:"mobile-nav",children:[o.map(a=>d.jsxs("div",{className:`mobile-nav-item ${e===a.label||a.label==="Scholar Hub"&&e==="Home"||a.label==="Home"&&e==="Scholar Hub"?"active":""}`,onClick:()=>t(a.label),children:[d.jsx(a.icon,{size:22}),d.jsx("span",{children:a.label})]},a.label)),d.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .mobile-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 70px;
          background-color: var(--bg-surface);
          border-top: 1px solid var(--border);
          padding: 0 12px;
          justify-content: space-around;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }

        .mobile-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
          flex: 1;
        }

        .mobile-nav-item span {
          font-size: 0.65rem;
          font-weight: 600;
        }

        .mobile-nav-item.active {
          color: var(--primary);
        }

        @media (max-width: 768px) {
          .mobile-nav {
            display: flex;
          }
        }
      `}})]})}function uj({isOpen:e,onClose:t,targetScholar:n,onDoubtPosted:r}){const{profile:s,setProfile:i}=Ye(),[o,a]=k.useState(""),[l,u]=k.useState(""),[c,h]=k.useState(""),[f,p]=k.useState(!1),[y,w]=k.useState(!1),[b,v]=k.useState(""),m=["Mathematics","Physics","Chemistry","Biology","History","Geography","CS"],g=async x=>{if(x.preventDefault(),!o||!l||!c){v("Please fill in all fields.");return}if(((s==null?void 0:s.points)||0)<5){v("You need at least 5 points to post a doubt.");return}v(""),p(!0);const{error:_}=await F.from("doubts").insert({title:l,content:c,subject:o,user_id:s.id,target_scholar_id:(n==null?void 0:n.id)||null,status:"open"});if(_)v(_.message),p(!1);else{const{data:S,error:j}=await F.from("profiles").update({points:(s.points||0)-5}).eq("id",s.id).select().single();j?console.error("Failed to deduct points:",j):S&&i(S),p(!1),w(!0),r&&r(),setTimeout(()=>{w(!1),t(),a(""),u(""),h("")},2e3)}};return d.jsx(ev,{children:e&&d.jsxs("div",{className:"modal-overlay",children:[d.jsxs(ce.div,{className:"modal-container",initial:{opacity:0,scale:.95,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:20},children:[d.jsxs("div",{className:"modal-header",children:[d.jsxs("div",{className:"header-title",children:[d.jsx("div",{className:"icon-box",children:d.jsx(qr,{size:20,color:"var(--primary)"})}),d.jsx("h3",{children:n?`Request Help from ${n.full_name}`:"Ask a Doubt"})]}),d.jsx("button",{className:"close-btn",onClick:t,children:d.jsx(ag,{size:20})})]}),y?d.jsxs(ce.div,{className:"success-state",initial:{opacity:0},animate:{opacity:1},children:[d.jsx("div",{className:"success-icon",children:d.jsx(Iw,{size:48,color:"#10B981"})}),d.jsx("h4",{children:n?"Request Sent!":"Doubt Posted Successfully!"}),d.jsx("p",{children:n?`${n.full_name} has been notified and will review your request.`:"Scholars will be notified and will answer soon."})]}):d.jsxs("form",{className:"modal-form",onSubmit:g,children:[d.jsxs("div",{className:"form-group",children:[d.jsx("label",{children:"Subject"}),d.jsxs("select",{value:o,onChange:x=>a(x.target.value),className:b&&!o?"error":"",children:[d.jsx("option",{value:"",disabled:!0,children:"Select Subject"}),m.map(x=>d.jsx("option",{value:x,children:x},x))]})]}),d.jsxs("div",{className:"form-group",children:[d.jsx("label",{children:"Title"}),d.jsx("input",{type:"text",placeholder:"e.g. How to solve quadratic equations?",value:l,onChange:x=>u(x.target.value),className:b&&!l?"error":""})]}),d.jsxs("div",{className:"form-group",children:[d.jsx("label",{children:"Specification Details"}),d.jsx("textarea",{placeholder:"Explain your doubt in detail...",value:c,onChange:x=>h(x.target.value),rows:5,className:b&&!c?"error":""})]}),b&&d.jsxs("div",{className:"error-msg",children:[d.jsx(Rw,{size:14}),d.jsx("span",{children:b})]}),d.jsx("button",{type:"submit",className:"submit-btn",disabled:f,children:f?d.jsx("div",{className:"spinner"}):d.jsxs(d.Fragment,{children:[d.jsx("span",{children:"Initialize Broadcast"}),d.jsx(og,{size:16})]})})]})]}),d.jsx("style",{dangerouslySetInnerHTML:{__html:`
            .modal-overlay {
              position: fixed;
              inset: 0;
              background-color: rgba(0, 0, 0, 0.7);
              backdrop-filter: blur(4px);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 10000;
              padding: 20px;
            }

            .modal-container {
              background-color: var(--bg-surface);
              border: 1px solid var(--border);
              border-radius: 24px;
              width: 100%;
              max-width: 500px;
              overflow: hidden;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            }

            .modal-header {
              padding: 24px;
              border-bottom: 1px solid var(--border);
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .header-title {
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .header-title h3 {
              font-size: 1.25rem;
            }

            .icon-box {
              width: 36px;
              height: 36px;
              background-color: rgba(79, 70, 229, 0.1);
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .close-btn {
              background: none;
              border: none;
              color: var(--text-muted);
              cursor: pointer;
              transition: color 0.2s;
            }

            .close-btn:hover {
              color: var(--text-main);
            }

            .modal-form {
              padding: 24px;
              display: flex;
              flex-direction: column;
              gap: 20px;
            }

            .form-group {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }

            .form-group label {
              font-size: 0.85rem;
              font-weight: 600;
              color: var(--text-muted);
            }

            .form-group input, 
            .form-group select, 
            .form-group textarea {
              background-color: var(--bg-card);
              border: 1px solid var(--border);
              border-radius: 12px;
              padding: 12px 16px;
              color: var(--text-main);
              font-size: 0.95rem;
              outline: none;
              transition: border-color 0.2s;
            }

            .form-group input:focus, 
            .form-group select:focus, 
            .form-group textarea:focus {
              border-color: var(--primary);
            }

            .form-group input.error, 
            .form-group select.error, 
            .form-group textarea.error {
              border-color: #EF4444;
            }

            .error-msg {
              display: flex;
              align-items: center;
              gap: 6px;
              color: #EF4444;
              font-size: 0.85rem;
              font-weight: 500;
            }

            .submit-btn {
              background-color: var(--primary);
              color: white;
              border: none;
              border-radius: 12px;
              padding: 14px;
              font-weight: 700;
              font-size: 1rem;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              transition: all 0.2s;
            }

            .submit-btn:hover {
              background-color: var(--primary-hover);
              transform: translateY(-1px);
            }

            .submit-btn:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }

            .success-state {
              padding: 60px 40px;
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }

            .success-icon {
              margin-bottom: 24px;
              padding: 20px;
              background-color: rgba(16, 185, 129, 0.1);
              border-radius: 50%;
            }

            .success-state h4 {
              font-size: 1.5rem;
              margin-bottom: 8px;
            }

            .success-state p {
              color: var(--text-muted);
            }

            .spinner {
              width: 20px;
              height: 20px;
              border: 2px solid rgba(255, 255, 255, 0.3);
              border-top: 2px solid white;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}})]})})}const cj=({doubt:e,onClick:t})=>d.jsxs(ce.div,{className:"doubt-list-item",onClick:()=>t(e),initial:{opacity:0,x:-10},animate:{opacity:1,x:0},whileHover:{x:4,borderColor:"var(--primary)"},children:[d.jsxs("div",{className:"doubt-item-main",children:[d.jsx("div",{className:"doubt-item-icon",style:{backgroundColor:`${e.color||"#4F46E5"}22`,color:e.color||"#4F46E5"},children:d.jsx(qr,{size:20})}),d.jsxs("div",{className:"doubt-item-content",children:[d.jsxs("div",{className:"doubt-item-header",children:[d.jsx("span",{className:"doubt-item-subject",style:{color:e.color||"#4F46E5"},children:e.subject}),d.jsx("span",{className:"doubt-item-status","data-status":e.status||"Open",children:e.status||"Open"})]}),d.jsx("h4",{className:"doubt-item-title",children:e.title}),d.jsxs("div",{className:"doubt-item-meta",children:[d.jsxs("div",{className:"meta-group",children:[d.jsx(ig,{size:14}),d.jsx("span",{children:new Date(e.created_at).toLocaleDateString()})]}),d.jsxs("div",{className:"meta-group",children:[d.jsx(aa,{size:14}),d.jsxs("span",{children:[e.answer_count||0," Answers"]})]})]})]})]}),d.jsx(Cc,{size:20,className:"chevron"})]});function dj({onDoubtClick:e,refreshTrigger:t}){const{user:n,profile:r}=Ye(),[s,i]=k.useState(!0),[o,a]=k.useState([]);k.useEffect(()=>{const u=(r==null?void 0:r.id)||(n==null?void 0:n.id);u&&l(u)},[n==null?void 0:n.id,r==null?void 0:r.id,t]);const l=async u=>{i(!0);const{data:c,error:h}=await F.from("doubts").select("*").eq("user_id",u).order("created_at",{ascending:!1});if(h&&console.error("fetchMyDoubts error:",h),c){const{data:f}=await F.from("profiles").select("id, full_name").eq("id",u).single(),p=c.map(y=>({...y,profiles:f||null}));a(p)}i(!1)};return s?d.jsxs("div",{className:"my-doubts-loading",children:[d.jsx("div",{className:"spinner"}),d.jsx("span",{children:"Loading your doubts..."})]}):d.jsxs(ce.div,{className:"my-doubts-container",initial:{opacity:0},animate:{opacity:1},children:[d.jsxs("div",{className:"page-header",children:[d.jsx("h1",{children:"My Doubts"}),d.jsxs("p",{children:["You have posted ",o.length," doubts so far."]})]}),o.length===0?d.jsxs("div",{className:"empty-state",children:[d.jsx("div",{className:"empty-icon-box",children:d.jsx(Dw,{size:48})}),d.jsx("h3",{children:"No doubts yet"}),d.jsx("p",{children:"When you ask a doubt, it will appear here."})]}):d.jsx("div",{className:"doubts-scroll-list",children:o.map(u=>d.jsx(cj,{doubt:u,onClick:e},u.id))}),d.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .my-doubts-container {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background-color: var(--bg-deep);
        }

        .page-header {
          margin-bottom: 32px;
        }

        .page-header h1 {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .page-header p {
          color: var(--text-muted);
        }

        .doubts-scroll-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .doubt-list-item {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .doubt-item-main {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .doubt-item-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .doubt-item-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .doubt-item-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .doubt-item-subject {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .doubt-item-status {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 6px;
          text-transform: capitalize;
        }

        .doubt-item-status[data-status="Open"] {
          background-color: rgba(79, 70, 229, 0.1);
          color: var(--primary);
        }

        .doubt-item-status[data-status="Resolved"] {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10B981;
        }

        .doubt-item-title {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .doubt-item-meta {
          display: flex;
          gap: 16px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .meta-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .chevron {
          color: var(--border);
          transition: transform 0.2s, color 0.2s;
        }

        .doubt-list-item:hover .chevron {
          transform: translateX(4px);
          color: var(--text-main);
        }

        .my-doubts-loading {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: var(--text-muted);
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 0;
          text-align: center;
        }

        .empty-icon-box {
          width: 80px;
          height: 80px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .empty-state p {
          color: var(--text-muted);
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top: 3px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .my-doubts-container {
            padding: 24px;
          }
        }
      `}})]})}const hj=({item:e,onClick:t})=>{var n,r,s,i;return d.jsxs(ce.div,{className:"answer-list-item",onClick:()=>t(e.doubts),initial:{opacity:0,y:10},animate:{opacity:1,y:0},whileHover:{x:4,borderColor:"#10B981"},children:[d.jsxs("div",{className:"answer-item-main",children:[d.jsx("div",{className:"answer-status-icon",children:d.jsx(gn,{size:22,color:"#10B981"})}),d.jsxs("div",{className:"answer-item-content",children:[d.jsxs("div",{className:"answer-item-header",children:[d.jsx("span",{className:"answer-item-subject",style:{color:((n=e.doubts)==null?void 0:n.color)||"#4F46E5"},children:(r=e.doubts)==null?void 0:r.subject}),e.is_best&&d.jsx("span",{className:"best-badge",children:"Best Answer"})]}),d.jsx("h4",{className:"answer-item-title",children:(s=e.doubts)==null?void 0:s.title}),d.jsxs("p",{className:"answer-snippet",children:['" ',e.content.substring(0,100),e.content.length>100?"...":"",' "']}),d.jsxs("div",{className:"answer-item-meta",children:[d.jsxs("div",{className:"meta-group",children:[d.jsx(ig,{size:14}),d.jsxs("span",{children:["Answered ",new Date(e.created_at).toLocaleDateString()]})]}),d.jsxs("div",{className:"meta-group",children:[d.jsx(aa,{size:14}),d.jsxs("span",{children:[((i=e.doubts)==null?void 0:i.answer_count)||0," total answers"]})]})]})]})]}),d.jsx(Cc,{size:20,className:"chevron"})]})};function fj({onDoubtClick:e}){const{user:t}=Ye(),[n,r]=k.useState(!0),[s,i]=k.useState([]);k.useEffect(()=>{t&&o()},[t]);const o=async()=>{r(!0);const{data:a,error:l}=await F.from("answers").select("*, doubts(*)").eq("user_id",t.id).order("created_at",{ascending:!1});a&&i(a),r(!1)};return n?d.jsxs("div",{className:"my-answers-loading",children:[d.jsx("div",{className:"spinner"}),d.jsx("span",{children:"Loading your participation..."})]}):d.jsxs(ce.div,{className:"my-answers-container",initial:{opacity:0},animate:{opacity:1},children:[d.jsxs("div",{className:"page-header",children:[d.jsx("h1",{children:"My Answers"}),d.jsxs("p",{children:["You have helped scholars in ",s.length," discussions."]})]}),s.length===0?d.jsxs("div",{className:"empty-state",children:[d.jsx("div",{className:"empty-icon-box",children:d.jsx(la,{size:48})}),d.jsx("h3",{children:"No answers yet"}),d.jsx("p",{children:"Help other scholars solve their doubts to earn reputation."})]}):d.jsx("div",{className:"answers-scroll-list",children:s.map(a=>d.jsx(hj,{item:a,onClick:e},a.id))}),d.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .my-answers-container {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background-color: var(--bg-deep);
        }

        .page-header {
          margin-bottom: 32px;
        }

        .page-header h1 {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .page-header p {
          color: var(--text-muted);
        }

        .answers-scroll-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .answer-list-item {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .answer-item-main {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .answer-status-icon {
          width: 44px;
          height: 44px;
          background-color: rgba(16, 185, 129, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .answer-item-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .answer-item-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .answer-item-subject {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .best-badge {
          background-color: #10B981;
          color: white;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .answer-item-title {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .answer-snippet {
          color: var(--text-muted);
          font-size: 0.9rem;
          font-style: italic;
          line-height: 1.4;
          margin: 4px 0;
        }

        .answer-item-meta {
          display: flex;
          gap: 16px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .meta-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .chevron {
          color: var(--border);
          transition: transform 0.2s, color 0.2s;
        }

        .answer-list-item:hover .chevron {
          transform: translateX(4px);
          color: var(--text-main);
        }

        .my-answers-loading {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: var(--text-muted);
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 0;
          text-align: center;
        }

        .empty-icon-box {
          width: 80px;
          height: 80px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .empty-state p {
          color: var(--text-muted);
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top: 3px solid #10B981;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .my-answers-container {
            padding: 24px;
          }
        }
      `}})]})}const pj=({scholar:e,index:t,onProfileClick:n})=>d.jsxs(ce.div,{className:"scholar-row-item",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:t*.05},children:[d.jsx("div",{className:"scholar-rank",children:t<3?d.jsx("div",{className:`rank-medal rank-${t+1}`,children:d.jsx(Ws,{size:16})}):d.jsx("span",{className:"rank-number",children:t+1})}),d.jsxs("div",{className:"scholar-profile",children:[d.jsx("div",{className:"scholar-avatar-large",children:d.jsx("img",{src:e.avatar_url||`https://api.dicebear.com/7.x/avataaars/svg?seed=${e.full_name}`,alt:"avatar"})}),d.jsxs("div",{className:"scholar-names",children:[d.jsx("h4",{children:e.full_name}),d.jsx("span",{className:"scholar-tag",children:e.role})]})]}),d.jsxs("div",{className:"scholar-stats-grid",children:[d.jsxs("div",{className:"stat-box",children:[d.jsx("span",{className:"stat-value",children:e.answers_given||0}),d.jsx("span",{className:"stat-label",children:"Solved"})]}),d.jsxs("div",{className:"stat-box",children:[d.jsxs("span",{className:"stat-value",children:[e.academic_percentage,"%"]}),d.jsx("span",{className:"stat-label",children:"Score"})]}),d.jsxs("div",{className:"stat-box",children:[d.jsx("span",{className:"stat-value primary",children:e.academic_percentage>=90?"A+":e.academic_percentage>=80?"A":"B"}),d.jsx("span",{className:"stat-label",children:"Reputation"})]})]}),d.jsxs("button",{className:"btn-view-scholar",onClick:()=>{console.log("Viewing scholar ID:",e.id),n(e.id)},children:[d.jsx("span",{children:"View Profile"}),d.jsx(Cc,{size:16})]})]});function mj({onProfileClick:e}){const[t,n]=k.useState(!0),[r,s]=k.useState([]);k.useEffect(()=>{i()},[]);const i=async()=>{n(!0);const{data:o,error:a}=await F.from("profiles").select("*").order("academic_percentage",{ascending:!1}).limit(20);o&&s(o),n(!1)};return t?d.jsxs("div",{className:"scholars-loading",children:[d.jsx("div",{className:"spinner"}),d.jsx("span",{children:"Calculating rankings..."})]}):d.jsxs(ce.div,{className:"scholars-page-container",initial:{opacity:0},animate:{opacity:1},children:[d.jsxs("div",{className:"page-header scholars-header",children:[d.jsx("div",{className:"header-icon-box",children:d.jsx(Ws,{size:32,color:"#F59E0B"})}),d.jsxs("div",{children:[d.jsx("h1",{children:"Top Scholars"}),d.jsx("p",{children:"The best performing students in the community this month."})]})]}),d.jsx("div",{className:"scholars-list-container",children:r.map((o,a)=>d.jsx(pj,{scholar:o,index:a,onProfileClick:e},o.id))}),d.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .scholars-page-container {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background-color: var(--bg-deep);
        }

        .scholars-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
        }

        .header-icon-box {
          width: 64px;
          height: 64px;
          background-color: rgba(245, 158, 11, 0.1);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .scholars-header h1 {
          font-size: 2rem;
          margin-bottom: 4px;
        }

        .scholars-header p {
          color: var(--text-muted);
        }

        .scholars-list-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .scholar-row-item {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 24px;
          transition: all 0.2s;
        }

        .scholar-row-item:hover {
          border-color: rgba(255, 255, 255, 0.1);
          background-color: var(--bg-card);
          transform: translateY(-2px);
        }

        .scholar-rank {
          width: 40px;
          display: flex;
          justify-content: center;
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--text-muted);
        }

        .rank-medal {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .rank-1 { background-color: #F59E0B; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); }
        .rank-2 { background-color: #94A3B8; box-shadow: 0 4px 12px rgba(148, 163, 184, 0.3); }
        .rank-3 { background-color: #D97706; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3); }

        .scholar-profile {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 220px;
        }

        .scholar-avatar-large {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          overflow: hidden;
          background-color: var(--bg-card);
          border: 2px solid var(--border);
        }

        .scholar-names h4 {
          font-size: 1.1rem;
          margin-bottom: 2px;
        }

        .scholar-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          background-color: rgba(79, 70, 229, 0.1);
          padding: 2px 8px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .scholar-stats-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .stat-box {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.25rem;
          font-weight: 800;
        }

        .stat-value.primary {
          color: var(--primary);
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .btn-view-scholar {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-main);
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-view-scholar:hover {
          background-color: var(--border);
          border-color: var(--text-muted);
        }

        .scholars-loading {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: var(--text-muted);
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top: 3px solid #F59E0B;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .scholar-stats-grid {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .scholars-page-container {
            padding: 24px;
          }
          .scholar-row-item {
            padding: 16px;
            gap: 12px;
          }
          .btn-view-scholar span {
            display: none;
          }
        }
      `}})]})}const gj=({item:e})=>{const t=r=>{switch(r){case"answer":return d.jsx(Kn,{size:18,color:"#4F46E5"});case"upvote":return d.jsx(Pc,{size:18,color:"#F59E0B"});case"best":return d.jsx(gn,{size:18,color:"#10B981"});case"rank":return d.jsx(Ws,{size:18,color:"#8957E5"});default:return d.jsx(iu,{size:18})}},n=r=>{switch(r){case"answer":return"rgba(79, 70, 229, 0.1)";case"upvote":return"rgba(245, 158, 11, 0.1)";case"best":return"rgba(16, 185, 129, 0.1)";case"rank":return"rgba(137, 87, 229, 0.1)";default:return"rgba(255, 255, 255, 0.05)"}};return d.jsxs(ce.div,{className:`notification-item ${e.unread?"unread":""}`,initial:{opacity:0,x:-10},animate:{opacity:1,x:0},children:[d.jsx("div",{className:"notif-icon-box",style:{backgroundColor:n(e.type)},children:t(e.type)}),d.jsxs("div",{className:"notif-content",children:[d.jsxs("p",{className:"notif-text",children:[d.jsx("span",{className:"notif-user",children:e.user})," ",e.text,e.target&&d.jsxs("span",{className:"notif-target",children:[' "',e.target,'"']})]}),d.jsx("span",{className:"notif-time",children:e.time})]}),e.unread&&d.jsx("div",{className:"unread-dot"})]})};function yj(){const[e,t]=k.useState(!0),[n,r]=k.useState([]);k.useEffect(()=>{const o=localStorage.getItem("scholarq_notifications");if(o)r(JSON.parse(o)),t(!1);else{const a=[{id:1,type:"answer",user:"Arjun Dev",text:"answered your doubt",target:"How to solve trigonometric equations...",time:"10 min ago",unread:!0},{id:2,type:"best",user:"System",text:"Your answer was selected as the",target:"Best Answer in Chemistry",time:"2 hours ago",unread:!0},{id:3,type:"upvote",user:"Meera Verma",text:"upvoted your solution to",target:"Newton Second Law",time:"5 hours ago",unread:!1},{id:4,type:"rank",user:"System",text:"Congratulations! You reached the",target:"Scholar Level 5",time:"1 day ago",unread:!1}];r(a),localStorage.setItem("scholarq_notifications",JSON.stringify(a)),t(!1)}},[]);const s=()=>{const o=n.map(a=>({...a,unread:!1}));r(o),localStorage.setItem("scholarq_notifications",JSON.stringify(o))},i=()=>{r([]),localStorage.setItem("scholarq_notifications",JSON.stringify([]))};return e?d.jsxs("div",{className:"notifs-loading",children:[d.jsx("div",{className:"spinner"}),d.jsx("span",{children:"Syncing notifications..."})]}):d.jsxs(ce.div,{className:"notifs-page-container",initial:{opacity:0},animate:{opacity:1},children:[d.jsxs("div",{className:"page-header notifs-header",children:[d.jsx("h1",{children:"Notifications"}),d.jsxs("div",{style:{display:"flex",gap:"10px"},children:[d.jsx("button",{className:"mark-all-btn",onClick:s,children:"Mark all as read"}),d.jsx("button",{className:"mark-all-btn",onClick:i,style:{color:"#EF4444",borderColor:"rgba(239, 68, 68, 0.3)"},children:"Clear all"})]})]}),d.jsx("div",{className:"notifs-list",children:n.length>0?n.map(o=>d.jsx(gj,{item:o},o.id)):d.jsx("div",{style:{textAlign:"center",padding:"40px",color:"var(--text-muted)"},children:"You have no notifications."})}),d.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .notifs-page-container {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background-color: var(--bg-deep);
        }

        .notifs-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .mark-all-btn {
          background: none;
          border: 1px solid var(--border);
          color: var(--text-muted);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .mark-all-btn:hover {
          color: var(--text-main);
          border-color: var(--text-muted);
          background-color: rgba(255, 255, 255, 0.05);
        }

        .notifs-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .notification-item {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
          transition: all 0.2s;
          cursor: pointer;
        }

        .notification-item:hover {
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateX(4px);
        }

        .notification-item.unread {
          background-color: rgba(79, 70, 229, 0.03);
          border-color: rgba(79, 70, 229, 0.2);
        }

        .notif-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notif-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .notif-text {
          font-size: 0.95rem;
          line-height: 1.4;
          color: var(--text-main);
        }

        .notif-user {
          font-weight: 700;
        }

        .notif-target {
          color: var(--text-muted);
          font-style: italic;
        }

        .notif-time {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .unread-dot {
          width: 8px;
          height: 8px;
          background-color: var(--primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--primary);
        }

        .notifs-loading {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: var(--text-muted);
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top: 3px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .notifs-page-container {
            padding: 24px;
          }
          .notif-text {
            font-size: 0.85rem;
          }
        }
      `}})]})}function vj({userId:e,onRequestHelp:t}){var v;const{user:n,profile:r,setProfile:s,signOut:i}=Ye(),[o,a]=k.useState(null),[l,u]=k.useState(!1),[c,h]=k.useState(!1),[f,p]=k.useState({}),y=!e||n&&e===n.id;k.useEffect(()=>{y?a(r):w(e)},[e,r,y]);const w=async m=>{u(!0);const{data:g}=await F.from("profiles").select("*").eq("id",m).single();g&&a(g),u(!1)};k.useEffect(()=>{o&&p(o)},[o]);const b=async()=>{u(!0);const{data:m,error:g}=await F.from("profiles").update({full_name:f.full_name,academic_percentage:parseFloat(f.academic_percentage),bio:f.bio,subjects:f.subjects}).eq("id",o.id).select().single();m&&(s(m),a(m),h(!1)),u(!1)};return o?d.jsxs(ce.div,{className:"profile-page-container",initial:{opacity:0,scale:.98},animate:{opacity:1,scale:1},children:[d.jsxs("div",{className:"profile-hero",children:[d.jsx("div",{className:"profile-cover"}),d.jsxs("div",{className:"profile-main-info",children:[d.jsxs("div",{className:"profile-avatar-container",children:[d.jsx("div",{className:"profile-avatar-large",children:d.jsx("img",{src:o.avatar_url||`https://api.dicebear.com/7.x/avataaars/svg?seed=${o.full_name}`,alt:"avatar"})}),y&&d.jsx("button",{className:"edit-avatar-btn",children:d.jsx(zw,{size:14})})]}),d.jsxs("div",{className:"profile-text-header",children:[d.jsxs("div",{className:"name-row",children:[c?d.jsx("input",{type:"text",value:f.full_name,onChange:m=>p({...f,full_name:m.target.value}),className:"edit-input-name"}):d.jsx("h1",{children:o.full_name}),d.jsx(Hw,{size:20,color:"#10B981"})]}),d.jsx("p",{className:"profile-level",children:o.role}),d.jsxs("div",{className:"profile-meta-chips",children:[d.jsxs("div",{className:"meta-chip",children:[d.jsx($w,{size:14})," ",d.jsx("span",{children:o.location||"Dubai, UAE"})]}),d.jsxs("div",{className:"meta-chip",children:[d.jsx(Lw,{size:14})," ",d.jsx("span",{children:"Joined March 2024"})]})]})]}),d.jsx("div",{className:"profile-actions",children:y?c?d.jsxs(d.Fragment,{children:[d.jsx("button",{className:"btn-save-profile",onClick:b,disabled:l,children:l?d.jsx("div",{className:"spinner-mini"}):d.jsxs(d.Fragment,{children:[d.jsx(Fw,{size:16})," Save"]})}),d.jsx("button",{className:"btn-cancel",onClick:()=>h(!1),children:d.jsx(ag,{size:16})})]}):d.jsxs(d.Fragment,{children:[d.jsx("button",{className:"btn-edit-profile",onClick:()=>h(!0),children:"Edit Profile"}),d.jsx("button",{className:"btn-settings",onClick:i,title:"Sign Out",children:d.jsx(Mw,{size:18})})]}):d.jsx("button",{className:"btn-save-profile",onClick:()=>t(o),children:"Request Help"})})]})]}),d.jsxs("div",{className:"profile-grid",children:[d.jsxs("div",{className:"stats-container",children:[d.jsxs("div",{className:"profile-stat-card",children:[d.jsx("span",{className:"p-stat-label",children:"Academic Percentage"}),c?d.jsx("input",{type:"number",value:f.academic_percentage,onChange:m=>p({...f,academic_percentage:m.target.value}),className:"edit-input-stat"}):d.jsxs("span",{className:"p-stat-value",style:{color:"#4F46E5"},children:[o.academic_percentage,"%"]})]}),d.jsxs("div",{className:"profile-stat-card",children:[d.jsx("span",{className:"p-stat-label",children:"Point Balance"}),d.jsx("span",{className:"p-stat-value",style:{color:"#F59E0B"},children:o.points||0})]}),d.jsxs("div",{className:"profile-stat-card",children:[d.jsx("span",{className:"p-stat-label",children:"Answers Given"}),d.jsx("span",{className:"p-stat-value",style:{color:"#10B981"},children:o.answers_given||0})]}),d.jsxs("div",{className:"profile-stat-card",children:[d.jsx("span",{className:"p-stat-label",children:"Best Answers"}),d.jsx("span",{className:"p-stat-value",style:{color:"#F59E0B"},children:o.best_answers||0})]}),d.jsxs("div",{className:"profile-stat-card",children:[d.jsx("span",{className:"p-stat-label",children:"Reputation"}),d.jsx("span",{className:"p-stat-value",style:{color:"#8957E5"},children:o.reputation||"A+"})]})]}),d.jsxs("div",{className:"profile-details-section",children:[d.jsxs("div",{className:"p-section",children:[d.jsx("h3",{children:"Bio"}),c?d.jsx("textarea",{value:f.bio,onChange:m=>p({...f,bio:m.target.value}),className:"edit-textarea",placeholder:"Write a short bio..."}):d.jsx("p",{className:"profile-bio",children:o.bio||"No bio provided yet."})]}),d.jsxs("div",{className:"p-section",children:[d.jsx("h3",{children:"My Subjects"}),c?d.jsx("div",{className:"subjects-edit-grid",children:["Mathematics","Physics","Chemistry","Biology","History","Geography","CS"].map(m=>{var g;return d.jsx("div",{className:`subject-pill-edit ${(g=f.subjects)!=null&&g.includes(m)?"active":""}`,onClick:()=>{const x=f.subjects||[],_=x.includes(m)?x.filter(S=>S!==m):[...x,m];p({...f,subjects:_})},children:m},m)})}):d.jsx("div",{className:"achievements-list",children:(v=o.subjects)==null?void 0:v.map((m,g)=>d.jsxs("div",{className:"achievement-badge",children:[d.jsx(sg,{size:14}),d.jsx("span",{children:m})]},g))})]})]})]}),d.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .edit-input-name {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px 12px;
          color: var(--text-main);
          font-size: 1.5rem;
          font-weight: 800;
          width: 100%;
        }

        .edit-input-stat {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px;
          color: var(--primary);
          font-size: 1.5rem;
          font-weight: 800;
          width: 100px;
        }

        .edit-textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px;
          color: var(--text-main);
          font-family: inherit;
          min-height: 100px;
        }

        .subjects-edit-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .subject-pill-edit {
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid var(--border);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
        }

        .subject-pill-edit.active {
          background: rgba(79, 70, 229, 0.1);
          border-color: var(--primary);
          color: var(--primary);
        }

        .btn-save-profile {
          background-color: #10B981;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .btn-cancel {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-muted);
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .profile-bio {
          color: var(--text-muted);
          line-height: 1.6;
        }
        .profile-page-container {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background-color: var(--bg-deep);
        }

        .profile-hero {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 32px;
        }

        .profile-cover {
          height: 120px;
          background: linear-gradient(135deg, var(--primary) 0%, #8957E5 100%);
          opacity: 0.15;
        }

        .profile-main-info {
          padding: 0 40px 40px 40px;
          display: flex;
          align-items: flex-end;
          gap: 32px;
          margin-top: -60px;
          position: relative;
        }

        .profile-avatar-container {
          position: relative;
        }

        .profile-avatar-large {
          width: 120px;
          height: 120px;
          border-radius: 32px;
          background-color: var(--bg-card);
          border: 4px solid var(--bg-surface);
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .edit-avatar-btn {
          position: absolute;
          bottom: -4px;
          right: -4px;
          background-color: var(--primary);
          color: white;
          border: 2px solid var(--bg-surface);
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .profile-text-header {
          flex: 1;
        }

        .name-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 4px;
        }

        .profile-text-header h1 {
          font-size: 2.25rem;
        }

        .profile-level {
          color: var(--primary);
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 12px;
        }

        .profile-meta-chips {
          display: flex;
          gap: 16px;
        }

        .meta-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .profile-actions {
          display: flex;
          gap: 12px;
          padding-bottom: 10px;
        }

        .btn-edit-profile {
          background-color: var(--primary);
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-settings {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-main);
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .profile-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .profile-stat-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .p-stat-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .p-stat-value {
          font-size: 2.5rem;
          font-weight: 800;
        }

        .p-section {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 20px;
        }

        .p-section h3 {
          font-size: 1.1rem;
          margin-bottom: 20px;
        }

        .achievements-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .achievement-badge {
          background-color: rgba(245, 158, 11, 0.1);
          color: #F59E0B;
          border: 1px solid rgba(245, 158, 11, 0.2);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .contact-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.95rem;
          color: var(--text-main);
        }

        .profile-loading {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: var(--text-muted);
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top: 3px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }
          .profile-main-info {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding-top: 0;
            margin-top: -60px;
          }
          .name-row {
            justify-content: center;
          }
          .profile-meta-chips {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .profile-page-container {
            padding: 24px;
          }
          .stats-container {
            grid-template-columns: 1fr;
          }
          .p-stat-value {
            font-size: 2rem;
          }
        }
      `}})]}):null}function wj({doubt:e,onBack:t}){const{profile:n}=Ye(),r=(n==null?void 0:n.role)==="Scholar"||(n==null?void 0:n.role)==="Elite Scholar",[s,i]=k.useState([]),[o,a]=k.useState(""),[l,u]=k.useState(!1);k.useEffect(()=>{c()},[e.id]);const c=async()=>{const{data:p,error:y}=await F.from("answers").select("*, profiles(full_name, role)").eq("doubt_id",e.id).order("is_best",{ascending:!1}).order("created_at",{ascending:!0});p&&i(p)},h=async()=>{if(!o.trim())return;u(!0);const{error:p}=await F.from("answers").insert({doubt_id:e.id,user_id:n.id,content:o,is_best:!1});p?(console.error(p),alert(p.message)):(a(""),c()),u(!1)},f=async p=>{if(e.status!=="resolved"){u(!0);try{await F.from("answers").update({is_best:!0}).eq("id",p.id),await F.from("doubts").update({status:"resolved"}).eq("id",e.id);const{data:y}=await F.from("profiles").select("points, best_answers").eq("id",p.user_id).single();await F.from("profiles").update({points:((y==null?void 0:y.points)||0)+40,best_answers:((y==null?void 0:y.best_answers)||0)+1}).eq("id",p.user_id),alert("Scholar rewarded with 40 points!"),c()}catch(y){console.error(y)}finally{u(!1)}}};return d.jsxs(ce.div,{className:"doubt-thread-container",initial:{opacity:0,x:20},animate:{opacity:1,x:0},children:[d.jsxs("button",{className:"back-btn",onClick:t,children:[d.jsx(Nw,{size:20}),d.jsx("span",{children:"Back to Feed"})]}),d.jsxs("div",{className:"thread-main",children:[d.jsxs("div",{className:"question-block",children:[d.jsxs("div",{className:"question-header",children:[d.jsx("span",{className:"subject-pill",style:{backgroundColor:"rgba(79, 70, 229, 0.1)",color:"var(--primary)"},children:e.subject}),d.jsx("span",{className:"thread-time",children:new Date(e.created_at).toLocaleDateString()})]}),d.jsx("h1",{children:e.title}),d.jsx("p",{className:"question-body",children:e.content})]}),r&&d.jsxs("div",{className:"post-answer-box",children:[d.jsx("textarea",{placeholder:"Write your answer...",value:o,onChange:p=>a(p.target.value)}),d.jsx("button",{onClick:h,disabled:l||!o.trim(),children:l?d.jsx("div",{className:"spinner-mini"}):d.jsxs(d.Fragment,{children:[d.jsx(og,{size:16})," Post Answer"]})})]}),d.jsxs("div",{className:"answers-section",children:[d.jsxs("h3",{children:[s.length," Answers"]}),d.jsxs("div",{className:"answers-list",children:[s.map(p=>{var y,w,b;return d.jsxs("div",{className:`answer-card ${p.is_best?"best":""}`,children:[p.is_best&&d.jsxs("div",{className:"best-answer-tag",children:[d.jsx(gn,{size:14}),d.jsx("span",{children:"Best Answer"})]}),d.jsxs("div",{className:"answer-header",children:[d.jsxs("div",{className:"answer-author",children:[d.jsx("div",{className:"avatar-small",children:d.jsx("img",{src:`https://api.dicebear.com/7.x/avataaars/svg?seed=${((y=p.profiles)==null?void 0:y.full_name)||"User"}`,alt:"avatar"})}),d.jsxs("div",{children:[d.jsx("span",{className:"author-name",children:((w=p.profiles)==null?void 0:w.full_name)||"Anonymous"}),d.jsx("span",{className:"author-role",children:((b=p.profiles)==null?void 0:b.role)||"Scholar"})]})]}),d.jsxs("div",{className:"answer-actions-meta",children:[d.jsx("span",{className:"answer-time",children:new Date(p.created_at).toLocaleDateString()}),e.user_id===(n==null?void 0:n.id)&&e.status!=="resolved"&&d.jsxs("button",{className:"btn-mark-best",onClick:()=>f(p),disabled:l,children:[d.jsx(Pc,{size:14}),"Mark as Best"]})]})]}),d.jsx("p",{className:"answer-text",children:p.content})]},p.id)}),s.length===0&&d.jsxs("div",{className:"no-answers",children:[d.jsx(Kn,{size:48}),d.jsx("p",{children:"No answers yet. Be the first to help!"})]})]})]})]}),d.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .doubt-thread-container {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background-color: var(--bg-deep);
        }

        .back-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 32px;
          transition: color 0.2s;
        }

        .back-btn:hover {
          color: var(--primary);
        }

        .post-answer-box {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 20px;
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .post-answer-box textarea {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px;
          color: var(--text-main);
          min-height: 100px;
          resize: vertical;
          outline: none;
        }

        .post-answer-box button {
          align-self: flex-end;
          background: var(--primary);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .no-answers {
          text-align: center;
          padding: 40px;
          color: var(--text-muted);
        }

        .thread-main {
          max-width: 800px;
          margin: 0 auto;
        }

        .question-block {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 40px;
        }

        .question-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .subject-pill {
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .thread-time {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .question-block h1 {
          font-size: 1.75rem;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .question-body {
          color: var(--text-main);
          line-height: 1.6;
          font-size: 1.05rem;
        }

        .answers-section h3 {
          font-size: 1.25rem;
          margin-bottom: 24px;
        }

        .answers-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .answer-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          position: relative;
        }

        .answer-card.best {
          border-color: #10B981;
          background: linear-gradient(135deg, var(--bg-surface) 0%, rgba(16, 185, 129, 0.05) 100%);
        }

        .best-answer-tag {
          position: absolute;
          top: -12px;
          right: 24px;
          background-color: #10B981;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: uppercase;
        }

        .answer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .answer-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar-small {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          background-color: var(--bg-card);
        }

        .author-name {
          display: block;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .author-role {
          font-size: 0.75rem;
          color: var(--primary);
          font-weight: 600;
        }

        .answer-time {
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        .answer-text {
          color: var(--text-main);
          line-height: 1.6;
          font-size: 1rem;
        }

        .answer-actions-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-mark-best {
          background-color: rgba(245, 158, 11, 0.1);
          color: #F59E0B;
          border: 1px solid rgba(245, 158, 11, 0.2);
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-mark-best:hover {
          background-color: #F59E0B;
          color: white;
        }

        .spinner-mini {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .doubt-thread-container {
            padding: 24px;
          }
          .question-block {
            padding: 24px;
          }
        }
      `}})]})}const xj=({doubt:e,onClick:t})=>{var r,s;const n=e.subject==="Mathematics"?"#4F46E5":e.subject==="Physics"?"#F59E0B":e.subject==="Chemistry"?"#10B981":"#388BFD";return d.jsxs("div",{className:"doubt-card-item",onClick:()=>t(e),children:[d.jsxs("div",{className:"doubt-main",children:[d.jsx("div",{className:"doubt-subject-icon",style:{backgroundColor:`${n}22`,color:n},children:d.jsx(qr,{size:24})}),d.jsxs("div",{className:"doubt-details",children:[d.jsxs("div",{className:"doubt-header",children:[e.is_blitz&&d.jsx("span",{className:"doubt-tag",children:"Blitz"}),d.jsx("span",{className:"doubt-title",children:e.title})]}),d.jsxs("div",{className:"doubt-meta",children:[d.jsx("span",{className:"subject-text",style:{color:n},children:e.subject}),d.jsx("span",{className:"separator",children:"•"}),d.jsxs("span",{children:["Class ",e.grade||"12"]})]}),d.jsxs("div",{className:"doubt-footer",children:[d.jsxs("div",{className:"asker-info",children:[d.jsx("div",{className:"avatar-mini",children:d.jsx("img",{src:`https://api.dicebear.com/7.x/avataaars/svg?seed=${((r=e.profiles)==null?void 0:r.full_name)||"User"}`,alt:"avatar"})}),d.jsx("span",{children:((s=e.profiles)==null?void 0:s.full_name)||"User"}),d.jsx("span",{className:"separator",children:"•"}),d.jsx("span",{className:"time-text",children:e.created_at?new Date(e.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"Just now"})]}),d.jsxs("div",{className:"answer-count",children:[d.jsx(aa,{size:14}),d.jsxs("span",{children:[e.answer_count||0," Answers"]})]})]})]})]}),d.jsxs("div",{className:"doubt-pts",children:[e.points||10," pts"]})]})};function bj({onDoubtClick:e,refreshTrigger:t}){const{profile:n}=Ye(),[r,s]=k.useState([]),[i,o]=k.useState(!0);k.useEffect(()=>{n!=null&&n.id&&a()},[n==null?void 0:n.id,t]);const a=async()=>{o(!0);try{const{data:l,error:u}=await F.from("doubts").select("*").eq("target_scholar_id",n.id).order("created_at",{ascending:!1});if(u&&console.error("fetchRequests error:",u),l){const c=[...new Set(l.map(h=>h.user_id).filter(Boolean))];if(c.length>0){const{data:h}=await F.from("profiles").select("id, full_name, role").in("id",c);if(h){const f={};h.forEach(y=>{f[y.id]=y});const p=l.map(y=>({...y,profiles:f[y.user_id]||null}));s(p);return}}s(l)}}catch(l){console.error(l)}finally{o(!1)}};return d.jsxs(ce.div,{className:"requests-view",initial:{opacity:0,y:10},animate:{opacity:1,y:0},children:[d.jsxs("div",{className:"view-header",children:[d.jsx("h1",{children:"Student Requests"}),d.jsx("p",{children:"Direct help requests sent specifically to you."})]}),i?d.jsxs("div",{className:"feed-loading",children:[d.jsx("div",{className:"spinner"}),d.jsx("span",{children:"Retrieving directed signals..."})]}):r.length===0?d.jsxs("div",{className:"empty-requests",children:[d.jsx("div",{className:"empty-icon-box",children:d.jsx(la,{size:48})}),d.jsx("h3",{children:"No direct requests yet"}),d.jsx("p",{children:"When students specifically request your help, they will appear here."})]}):d.jsx("div",{className:"doubts-list",children:r.map(l=>d.jsx(xj,{doubt:l,onClick:e},l.id))}),d.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .requests-view {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background-color: var(--bg-deep);
        }

        .view-header {
          margin-bottom: 40px;
        }

        .view-header h1 {
          font-size: 2.5rem;
          margin-bottom: 8px;
        }

        .view-header p {
          color: var(--text-muted);
          font-size: 1.1rem;
        }

        .feed-loading {
          padding: 60px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          color: var(--text-muted);
        }

        .empty-requests {
          padding: 80px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .empty-icon-box {
          width: 80px;
          height: 80px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          color: var(--text-muted);
        }

        .empty-requests h3 {
          font-size: 1.5rem;
          margin-bottom: 12px;
        }

        .empty-requests p {
          color: var(--text-muted);
          max-width: 400px;
          line-height: 1.6;
        }

        .doubts-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .doubt-card-item {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .doubt-card-item:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .doubt-main {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .doubt-subject-icon {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .doubt-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .doubt-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .doubt-tag {
          background-color: #EF4444;
          color: white;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .doubt-title {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .doubt-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .subject-text {
          font-weight: 600;
        }

        .doubt-footer {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 8px;
        }

        .asker-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .avatar-mini {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          overflow: hidden;
          background-color: var(--bg-card);
        }

        .avatar-mini img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .answer-count {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .doubt-pts {
          background-color: var(--bg-card);
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: 700;
          color: var(--text-main);
          font-size: 0.9rem;
        }

        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top: 3px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}})]})}function kj(){const{signInWithGoogle:e}=Ye(),[t,n]=k.useState(!1),[r,s]=k.useState(null),i=async()=>{n(!0),s(null);const{error:o}=await e();o&&(s(o.message),n(!1))};return d.jsxs("div",{className:"login-page",children:[d.jsxs(ce.div,{className:"login-card",initial:{opacity:0,y:20},animate:{opacity:1,y:0},children:[d.jsxs("div",{className:"login-brand",children:[d.jsx("div",{className:"brand-icon-large",children:d.jsx(ou,{size:48,color:"white"})}),d.jsx("h1",{className:"brand-font",children:"ScholarQ"}),d.jsx("p",{children:"Join the world's most elite academic community."})]}),d.jsxs("div",{className:"login-actions",children:[d.jsx("button",{className:"google-login-btn",onClick:i,disabled:t,children:t?d.jsx("div",{className:"spinner"}):d.jsxs(d.Fragment,{children:[d.jsx("img",{src:"https://www.google.com/favicon.ico",alt:"google"}),d.jsx("span",{children:"Continue with Google"})]})}),d.jsx("div",{className:"divider",children:d.jsx("span",{children:"or"})}),d.jsxs("button",{className:"email-login-btn",disabled:!0,children:[d.jsx("span",{children:"Continue with Email"}),d.jsx(Ow,{size:18})]})]}),r&&d.jsx("p",{className:"login-error",children:r}),d.jsx("p",{className:"login-footer",children:"By continuing, you agree to our Terms of Service and Privacy Policy."})]}),d.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .login-page {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-deep);
          background-image: radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.1) 0%, transparent 50%);
        }

        .login-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 32px;
          padding: 48px;
          width: 100%;
          max-width: 480px;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .brand-icon-large {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--primary) 0%, #6366F1 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
        }

        .login-brand h1 {
          font-size: 2.5rem;
          margin-bottom: 8px;
        }

        .login-brand p {
          color: var(--text-muted);
          margin-bottom: 40px;
        }

        .login-actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .google-login-btn {
          background-color: white;
          color: #1F2937;
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .google-login-btn:hover {
          background-color: #F9FAFB;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .google-login-btn img {
          width: 20px;
          height: 20px;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 16px;
          color: var(--text-muted);
          margin: 8px 0;
        }

        .divider::before, .divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background-color: var(--border);
        }

        .email-login-btn {
          background-color: var(--bg-card);
          color: var(--text-main);
          border: 1px solid var(--border);
          padding: 14px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: not-allowed;
          opacity: 0.5;
        }

        .login-error {
          color: #EF4444;
          margin-top: 16px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .login-footer {
          margin-top: 32px;
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(0, 0, 0, 0.1);
          border-top: 2px solid #4F46E5;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}})]})}function _j({isOpen:e,user:t}){var p;const{setProfile:n}=Ye(),[r,s]=k.useState(1),[i,o]=k.useState({fullName:((p=t==null?void 0:t.user_metadata)==null?void 0:p.full_name)||"",percentage:"",subjects:[]}),[a,l]=k.useState(!1),u=["Mathematics","Physics","Chemistry","Biology","History","Geography","CS","Economics"],c=y=>{o(w=>({...w,subjects:w.subjects.includes(y)?w.subjects.filter(b=>b!==y):[...w.subjects,y]}))},h=y=>{const w=parseFloat(y);return w>=92?"Elite Scholar":w>=85?"Scholar":"Student"},f=async()=>{var v;l(!0);const y=h(i.percentage),{data:w,error:b}=await F.from("profiles").upsert({id:t.id,full_name:i.fullName,academic_percentage:parseFloat(i.percentage),subjects:i.subjects,role:y,avatar_url:(v=t==null?void 0:t.user_metadata)==null?void 0:v.avatar_url,updated_at:new Date}).select().single();b?(console.error("Supabase Error:",b),alert("Failed to save profile: "+b.message)):n(w),l(!1)};return d.jsx(ev,{children:e&&d.jsxs("div",{className:"modal-overlay",children:[d.jsxs(ce.div,{className:"onboarding-card",initial:{opacity:0,scale:.9,y:20},animate:{opacity:1,scale:1,y:0},children:[d.jsxs("div",{className:"onboarding-header",children:[d.jsxs("div",{className:"onboarding-step-indicator",children:[d.jsx("div",{className:`step-dot ${r>=1?"active":""}`}),d.jsx("div",{className:`step-dot ${r>=2?"active":""}`}),d.jsx("div",{className:`step-dot ${r>=3?"active":""}`})]}),d.jsx("h2",{children:"Complete your profile"}),d.jsx("p",{children:"Tailor your ScholarQ experience to your academic level."})]}),r===1&&d.jsxs(ce.div,{className:"step-content",initial:{opacity:0},animate:{opacity:1},children:[d.jsx("div",{className:"onboarding-form",children:d.jsxs("div",{className:"input-group",children:[d.jsxs("label",{children:[d.jsx(qs,{size:16})," Full Name"]}),d.jsx("input",{type:"text",value:i.fullName,onChange:y=>o({...i,fullName:y.target.value}),placeholder:"Enter your legal name"})]})}),d.jsx("button",{className:"next-btn",disabled:!i.fullName,onClick:()=>s(2),children:"Continue"})]}),r===2&&d.jsxs(ce.div,{className:"step-content",initial:{opacity:0},animate:{opacity:1},children:[d.jsx("div",{className:"onboarding-form",children:d.jsxs("div",{className:"input-group",children:[d.jsxs("label",{children:[d.jsx(Bw,{size:16})," Academic Percentage"]}),d.jsx("input",{type:"number",value:i.percentage,onChange:y=>o({...i,percentage:y.target.value}),placeholder:"e.g. 94.5"}),d.jsx("p",{className:"input-hint",children:"Used to assign your Scholar Rank."})]})}),d.jsx("button",{className:"next-btn",disabled:!i.percentage,onClick:()=>s(3),children:"Almost there"})]}),r===3&&d.jsxs(ce.div,{className:"step-content",initial:{opacity:0},animate:{opacity:1},children:[d.jsxs("div",{className:"onboarding-form",children:[d.jsxs("label",{children:[d.jsx(sg,{size:16})," Select Subjects"]}),d.jsx("div",{className:"subjects-grid",children:u.map(y=>d.jsx("div",{className:`subject-pill ${i.subjects.includes(y)?"active":""}`,onClick:()=>c(y),children:y},y))})]}),d.jsx("button",{className:"submit-onboarding-btn",disabled:a||i.subjects.length===0,onClick:f,children:a?d.jsx("div",{className:"spinner"}):"Finish Setup"})]})]}),d.jsx("style",{dangerouslySetInnerHTML:{__html:`
            .modal-overlay {
              position: fixed;
              inset: 0;
              background-color: rgba(0, 0, 0, 0.8);
              backdrop-filter: blur(8px);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 10000;
              padding: 20px;
            }

            .onboarding-card {
              background-color: var(--bg-surface);
              border: 1px solid var(--border);
              border-radius: 32px;
              width: 100%;
              max-width: 440px;
              padding: 40px;
              box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
            }

            .onboarding-header {
              text-align: center;
              margin-bottom: 32px;
            }

            .onboarding-step-indicator {
              display: flex;
              justify-content: center;
              gap: 8px;
              margin-bottom: 24px;
            }

            .step-dot {
              width: 32px;
              height: 4px;
              background-color: var(--border);
              border-radius: 10px;
              transition: all 0.3s;
            }

            .step-dot.active {
              background-color: var(--primary);
              box-shadow: 0 0 10px var(--primary);
            }

            .onboarding-header h2 {
              font-size: 1.5rem;
              margin-bottom: 8px;
            }

            .onboarding-header p {
              color: var(--text-muted);
              font-size: 0.9rem;
            }

            .onboarding-form {
              display: flex;
              flex-direction: column;
              gap: 24px;
              margin-bottom: 32px;
            }

            .input-group {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }

            .input-group label {
              font-size: 0.85rem;
              font-weight: 700;
              color: var(--text-muted);
              display: flex;
              align-items: center;
              gap: 8px;
            }

            .input-group input {
              background-color: var(--bg-card);
              border: 1px solid var(--border);
              border-radius: 12px;
              padding: 14px;
              color: var(--text-main);
              font-size: 1rem;
              outline: none;
            }

            .input-hint {
              font-size: 0.75rem;
              color: var(--text-muted);
            }

            .subjects-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
            }

            .subject-pill {
              background-color: var(--bg-card);
              border: 1px solid var(--border);
              padding: 10px;
              border-radius: 10px;
              font-size: 0.85rem;
              font-weight: 600;
              text-align: center;
              cursor: pointer;
              transition: all 0.2s;
            }

            .subject-pill.active {
              background-color: rgba(79, 70, 229, 0.1);
              border-color: var(--primary);
              color: var(--primary);
            }

            .next-btn, .submit-onboarding-btn {
              width: 100%;
              background-color: var(--primary);
              color: white;
              border: none;
              padding: 14px;
              border-radius: 12px;
              font-weight: 700;
              font-size: 1rem;
              cursor: pointer;
              transition: transform 0.2s;
            }

            .next-btn:disabled, .submit-onboarding-btn:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }

            .spinner {
              width: 20px;
              height: 20px;
              border: 2px solid rgba(255, 255, 255, 0.3);
              border-top: 2px solid white;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }

            @media (max-width: 480px) {
              .onboarding-card {
                padding: 24px 20px;
                border-radius: 24px;
              }
              .onboarding-header h2 {
                font-size: 1.25rem;
                margin-bottom: 6px;
              }
              .onboarding-header p {
                font-size: 0.8rem;
              }
              .subjects-grid {
                grid-template-columns: 1fr;
              }
              .onboarding-form {
                gap: 16px;
                margin-bottom: 24px;
              }
            }
          `}})]})})}function Sj(){const{user:e,profile:t,loading:n,setProfile:r}=Ye();Rg();const[s,i]=k.useState("Home"),[o,a]=k.useState(!1),[l,u]=k.useState(null),[c,h]=k.useState(null),[f,p]=k.useState(""),[y,w]=k.useState(null),[b,v]=k.useState(0),m=(t==null?void 0:t.role)==="Scholar"||(t==null?void 0:t.role)==="Elite Scholar";k.useEffect(()=>{t&&(i(m?"Scholar Hub":"Home"),g())},[t==null?void 0:t.id,m]);const g=async()=>{if(!t)return;const E=t.last_daily_reward?new Date(t.last_daily_reward):null,R=new Date;if(!(E&&E.getDate()===R.getDate()&&E.getMonth()===R.getMonth()&&E.getFullYear()===R.getFullYear())){const{data:se,error:de}=await F.from("profiles").update({points:(t.points||0)+5,last_daily_reward:new Date().toISOString()}).eq("id",t.id).select().single();!de&&se&&(r(se),alert("Daily reward claimed: +5 points"))}},x=E=>{E==="Ask Doubt"?a(!0):(i(E),u(null),h(null))},_=E=>{u(E)},S=E=>{h(E),i("Profile"),u(null)};if(n)return d.jsx("div",{className:"app-loader",children:d.jsx("div",{className:"spinner"})});if(!e)return d.jsx(kj,{});const j=e&&!(t!=null&&t.academic_percentage);return d.jsxs("div",{className:"app-container",children:[d.jsx(z1,{activeTab:s,setActiveTab:x}),d.jsxs("div",{className:"content-wrapper",children:[d.jsx(B1,{setActiveTab:x,onSearch:p}),d.jsxs("div",{className:"layout-body",children:[(s==="Home"||s==="Scholar Hub"||s==="Unanswered Feed")&&!l&&d.jsxs(d.Fragment,{children:[d.jsx(ij,{searchQuery:f,isScholar:m,activeTab:s,onDoubtClick:_,onViewAll:()=>x("Unanswered Feed"),refreshTrigger:b}),s!=="Unanswered Feed"&&d.jsx(aj,{setActiveTab:x,onProfileClick:S})]}),s==="My Doubts"&&!l&&d.jsx(dj,{onDoubtClick:_,refreshTrigger:b}),(s==="Answers"||s==="My Answers")&&!l&&d.jsx(fj,{onDoubtClick:_}),(s==="Top Scholars"||s==="Scholars"||s==="Leaderboard")&&!l&&d.jsx(mj,{onProfileClick:S}),s==="Notifications"&&!l&&d.jsx(yj,{}),s==="Profile"&&!l&&d.jsx(vj,{userId:c,onRequestHelp:E=>{w(E),a(!0)}}),l&&d.jsx(wj,{doubt:l,onBack:()=>{u(null),v(E=>E+1)}}),s==="Student Requests"&&!l&&d.jsx(bj,{onDoubtClick:_,refreshTrigger:b}),s!=="Home"&&s!=="Scholar Hub"&&s!=="My Doubts"&&s!=="Unanswered Feed"&&s!=="Answers"&&s!=="My Answers"&&s!=="Top Scholars"&&s!=="Scholars"&&s!=="Leaderboard"&&s!=="Notifications"&&s!=="Profile"&&s!=="Student Requests"&&!l&&d.jsxs("div",{className:"view-placeholder",children:[d.jsx("h2",{children:s}),d.jsx("p",{children:"This section is being initialized. Please check back soon."})]})]})]}),d.jsx(lj,{activeTab:s,setActiveTab:x}),d.jsx(uj,{isOpen:o,onClose:()=>{a(!1),w(null)},targetScholar:y,onDoubtPosted:()=>v(E=>E+1)}),d.jsx(_j,{isOpen:j,user:e}),d.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .app-loader {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-deep);
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(79, 70, 229, 0.1);
          border-top: 3px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .content-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .layout-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .view-placeholder {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          padding: 40px;
          text-align: center;
        }

        .view-placeholder h2 {
          color: var(--text-main);
          margin-bottom: 12px;
          font-size: 2rem;
        }

        @media (max-width: 1200px) {
          .right-panel {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }
          .main-content {
            padding: 24px;
            padding-bottom: 100px;
          }
        }
      `}})]})}hl.createRoot(document.getElementById("root")).render(d.jsx(jr.StrictMode,{children:d.jsx(U1,{children:d.jsx($1,{children:d.jsx(Sj,{})})})}));
