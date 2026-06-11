var Gc=Object.defineProperty;var Wc=(i,e,t)=>e in i?Gc(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var lt=(i,e,t)=>Wc(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ha="184",Xc=0,yo=1,$c=2,Ur=1,qc=2,Wi=3,zn=0,Ut=1,Kt=2,Sn=0,Mi=1,Xs=2,bo=3,So=4,Yc=5,$n=100,jc=101,Kc=102,Zc=103,Jc=104,Qc=200,ed=201,td=202,nd=203,$s=204,qs=205,id=206,rd=207,sd=208,ad=209,od=210,ld=211,cd=212,dd=213,ud=214,Ys=0,js=1,Ks=2,Ti=3,Zs=4,Js=5,Qs=6,ea=7,Nl=0,fd=1,hd=2,dn=0,Fl=1,Ol=2,Bl=3,zl=4,Vl=5,kl=6,Hl=7,Gl=300,Kn=301,Ai=302,ls=303,cs=304,ns=306,ta=1e3,yn=1001,na=1002,Tt=1003,pd=1004,tr=1005,Pt=1006,ds=1007,Yn=1008,zt=1009,Wl=1010,Xl=1011,ji=1012,Ga=1013,fn=1014,ln=1015,En=1016,Wa=1017,Xa=1018,Ki=1020,$l=35902,ql=35899,Yl=1021,jl=1022,Zt=1023,Tn=1026,jn=1027,Kl=1028,$a=1029,Zn=1030,qa=1031,Ya=1033,Nr=33776,Fr=33777,Or=33778,Br=33779,ia=35840,ra=35841,sa=35842,aa=35843,oa=36196,la=37492,ca=37496,da=37488,ua=37489,Hr=37490,fa=37491,ha=37808,pa=37809,ma=37810,ga=37811,va=37812,_a=37813,xa=37814,ya=37815,ba=37816,Sa=37817,Ma=37818,Ea=37819,Ta=37820,Aa=37821,wa=36492,Ca=36494,Ra=36495,Pa=36283,La=36284,Gr=36285,Da=36286,md=3200,Mo=0,gd=1,Fn="",Gt="srgb",Wr="srgb-linear",Xr="linear",Ye="srgb",ri=7680,Eo=519,vd=512,_d=513,xd=514,ja=515,yd=516,bd=517,Ka=518,Sd=519,Ia=35044,To="300 es",cn=2e3,Zi=2001;function Md(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function $r(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ed(){const i=$r("canvas");return i.style.display="block",i}const Ao={};function qr(...i){const e="THREE."+i.shift();console.log(e,...i)}function Zl(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Te(...i){i=Zl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function ke(...i){i=Zl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ua(...i){const e=i.join(" ");e in Ao||(Ao[e]=!0,Te(...i))}function Td(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Ad={[Ys]:js,[Ks]:Qs,[Zs]:ea,[Ti]:Js,[js]:Ys,[Qs]:Ks,[ea]:Zs,[Js]:Ti};class ti{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zr=Math.PI/180,Na=180/Math.PI;function Bn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]).toLowerCase()}function Ge(i,e,t){return Math.max(e,Math.min(t,i))}function wd(i,e){return(i%e+e)%e}function us(i,e,t){return(1-t)*i+t*e}function an(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Qe(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ao=class ao{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ao.prototype.isVector2=!0;let Oe=ao;class Pi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],f=n[r+3],d=s[a+0],m=s[a+1],g=s[a+2],y=s[a+3];if(f!==y||l!==d||c!==m||u!==g){let h=l*d+c*m+u*g+f*y;h<0&&(d=-d,m=-m,g=-g,y=-y,h=-h);let p=1-o;if(h<.9995){const b=Math.acos(h),M=Math.sin(b);p=Math.sin(p*b)/M,o=Math.sin(o*b)/M,l=l*p+d*o,c=c*p+m*o,u=u*p+g*o,f=f*p+y*o}else{l=l*p+d*o,c=c*p+m*o,u=u*p+g*o,f=f*p+y*o;const b=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=b,c*=b,u*=b,f*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],f=s[a],d=s[a+1],m=s[a+2],g=s[a+3];return e[t]=o*g+u*f+l*m-c*d,e[t+1]=l*g+u*d+c*f-o*m,e[t+2]=c*g+u*m+o*d-l*f,e[t+3]=u*g-o*f-l*d-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),f=o(s/2),d=l(n/2),m=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=d*u*f+c*m*g,this._y=c*m*f-d*u*g,this._z=c*u*g+d*m*f,this._w=c*u*f-d*m*g;break;case"YXZ":this._x=d*u*f+c*m*g,this._y=c*m*f-d*u*g,this._z=c*u*g-d*m*f,this._w=c*u*f+d*m*g;break;case"ZXY":this._x=d*u*f-c*m*g,this._y=c*m*f+d*u*g,this._z=c*u*g+d*m*f,this._w=c*u*f-d*m*g;break;case"ZYX":this._x=d*u*f-c*m*g,this._y=c*m*f+d*u*g,this._z=c*u*g-d*m*f,this._w=c*u*f+d*m*g;break;case"YZX":this._x=d*u*f+c*m*g,this._y=c*m*f+d*u*g,this._z=c*u*g-d*m*f,this._w=c*u*f-d*m*g;break;case"XZY":this._x=d*u*f-c*m*g,this._y=c*m*f-d*u*g,this._z=c*u*g+d*m*f,this._w=c*u*f+d*m*g;break;default:Te("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],d=n+o+f;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(u-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(n>o&&n>f){const m=2*Math.sqrt(1+n-o-f);this._w=(u-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>f){const m=2*Math.sqrt(1+o-n-f);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+f-n-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const oo=class oo{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(wo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(wo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),f=2*(s*n-a*t);return this.x=t+l*c+a*f-o*u,this.y=n+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return fs.copy(this).projectOnVector(e),this.sub(fs)}reflect(e){return this.sub(fs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};oo.prototype.isVector3=!0;let U=oo;const fs=new U,wo=new Pi,lo=class lo{constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],f=n[7],d=n[2],m=n[5],g=n[8],y=r[0],h=r[3],p=r[6],b=r[1],M=r[4],T=r[7],L=r[2],A=r[5],w=r[8];return s[0]=a*y+o*b+l*L,s[3]=a*h+o*M+l*A,s[6]=a*p+o*T+l*w,s[1]=c*y+u*b+f*L,s[4]=c*h+u*M+f*A,s[7]=c*p+u*T+f*w,s[2]=d*y+m*b+g*L,s[5]=d*h+m*M+g*A,s[8]=d*p+m*T+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,d=o*l-u*s,m=c*s-a*l,g=t*f+n*d+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=f*y,e[1]=(r*c-u*n)*y,e[2]=(o*n-r*a)*y,e[3]=d*y,e[4]=(u*t-r*l)*y,e[5]=(r*s-o*t)*y,e[6]=m*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*s)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(hs.makeScale(e,t)),this}rotate(e){return this.premultiply(hs.makeRotation(-e)),this}translate(e,t){return this.premultiply(hs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};lo.prototype.isMatrix3=!0;let Pe=lo;const hs=new Pe,Co=new Pe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ro=new Pe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Cd(){const i={enabled:!0,workingColorSpace:Wr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Ye&&(r.r=Mn(r.r),r.g=Mn(r.g),r.b=Mn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ye&&(r.r=Ei(r.r),r.g=Ei(r.g),r.b=Ei(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Fn?Xr:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ua("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ua("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Wr]:{primaries:e,whitePoint:n,transfer:Xr,toXYZ:Co,fromXYZ:Ro,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Gt},outputColorSpaceConfig:{drawingBufferColorSpace:Gt}},[Gt]:{primaries:e,whitePoint:n,transfer:Ye,toXYZ:Co,fromXYZ:Ro,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Gt}}}),i}const He=Cd();function Mn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ei(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let si;class Rd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{si===void 0&&(si=$r("canvas")),si.width=e.width,si.height=e.height;const r=si.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=si}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=$r("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Mn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Mn(t[n]/255)*255):t[n]=Mn(t[n]);return{data:t,width:e.width,height:e.height}}else return Te("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Pd=0;class Za{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Pd++}),this.uuid=Bn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ps(r[a].image)):s.push(ps(r[a]))}else s=ps(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function ps(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Rd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Te("Texture: Unable to serialize Texture."),{})}let Ld=0;const ms=new U;class Lt extends ti{constructor(e=Lt.DEFAULT_IMAGE,t=Lt.DEFAULT_MAPPING,n=yn,r=yn,s=Pt,a=Yn,o=Zt,l=zt,c=Lt.DEFAULT_ANISOTROPY,u=Fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ld++}),this.uuid=Bn(),this.name="",this.source=new Za(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Pe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ms).x}get height(){return this.source.getSize(ms).y}get depth(){return this.source.getSize(ms).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Te(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Te(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ta:e.x=e.x-Math.floor(e.x);break;case yn:e.x=e.x<0?0:1;break;case na:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ta:e.y=e.y-Math.floor(e.y);break;case yn:e.y=e.y<0?0:1;break;case na:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Lt.DEFAULT_IMAGE=null;Lt.DEFAULT_MAPPING=Gl;Lt.DEFAULT_ANISOTROPY=1;const co=class co{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],m=l[5],g=l[9],y=l[2],h=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-y)<.01&&Math.abs(g-h)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+y)<.1&&Math.abs(g+h)<.1&&Math.abs(c+m+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,T=(m+1)/2,L=(p+1)/2,A=(u+d)/4,w=(f+y)/4,_=(g+h)/4;return M>T&&M>L?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=A/n,s=w/n):T>L?T<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),n=A/r,s=_/r):L<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(L),n=w/s,r=_/s),this.set(n,r,s,t),this}let b=Math.sqrt((h-g)*(h-g)+(f-y)*(f-y)+(d-u)*(d-u));return Math.abs(b)<.001&&(b=1),this.x=(h-g)/b,this.y=(f-y)/b,this.z=(d-u)/b,this.w=Math.acos((c+m+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};co.prototype.isVector4=!0;let ut=co;class Dd extends ti{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Lt(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Pt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Za(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class un extends Dd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Jl extends Lt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Id extends Lt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ts=class ts{constructor(e,t,n,r,s,a,o,l,c,u,f,d,m,g,y,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,f,d,m,g,y,h)}set(e,t,n,r,s,a,o,l,c,u,f,d,m,g,y,h){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=d,p[3]=m,p[7]=g,p[11]=y,p[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ts().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,r=1/ai.setFromMatrixColumn(e,0).length(),s=1/ai.setFromMatrixColumn(e,1).length(),a=1/ai.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*u,m=a*f,g=o*u,y=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=m+g*c,t[5]=d-y*c,t[9]=-o*l,t[2]=y-d*c,t[6]=g+m*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,m=l*f,g=c*u,y=c*f;t[0]=d+y*o,t[4]=g*o-m,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=m*o-g,t[6]=y+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,m=l*f,g=c*u,y=c*f;t[0]=d-y*o,t[4]=-a*f,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*u,t[9]=y-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,m=a*f,g=o*u,y=o*f;t[0]=l*u,t[4]=g*c-m,t[8]=d*c+y,t[1]=l*f,t[5]=y*c+d,t[9]=m*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,m=a*c,g=o*l,y=o*c;t[0]=l*u,t[4]=y-d*f,t[8]=g*f+m,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=m*f+g,t[10]=d-y*f}else if(e.order==="XZY"){const d=a*l,m=a*c,g=o*l,y=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=d*f+y,t[5]=a*u,t[9]=m*f-g,t[2]=g*f-m,t[6]=o*u,t[10]=y*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ud,e,Nd)}lookAt(e,t,n){const r=this.elements;return Ot.subVectors(e,t),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),Rn.crossVectors(n,Ot),Rn.lengthSq()===0&&(Math.abs(n.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),Rn.crossVectors(n,Ot)),Rn.normalize(),nr.crossVectors(Ot,Rn),r[0]=Rn.x,r[4]=nr.x,r[8]=Ot.x,r[1]=Rn.y,r[5]=nr.y,r[9]=Ot.y,r[2]=Rn.z,r[6]=nr.z,r[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],f=n[5],d=n[9],m=n[13],g=n[2],y=n[6],h=n[10],p=n[14],b=n[3],M=n[7],T=n[11],L=n[15],A=r[0],w=r[4],_=r[8],E=r[12],F=r[1],C=r[5],B=r[9],W=r[13],Y=r[2],I=r[6],H=r[10],O=r[14],K=r[3],Q=r[7],ie=r[11],_e=r[15];return s[0]=a*A+o*F+l*Y+c*K,s[4]=a*w+o*C+l*I+c*Q,s[8]=a*_+o*B+l*H+c*ie,s[12]=a*E+o*W+l*O+c*_e,s[1]=u*A+f*F+d*Y+m*K,s[5]=u*w+f*C+d*I+m*Q,s[9]=u*_+f*B+d*H+m*ie,s[13]=u*E+f*W+d*O+m*_e,s[2]=g*A+y*F+h*Y+p*K,s[6]=g*w+y*C+h*I+p*Q,s[10]=g*_+y*B+h*H+p*ie,s[14]=g*E+y*W+h*O+p*_e,s[3]=b*A+M*F+T*Y+L*K,s[7]=b*w+M*C+T*I+L*Q,s[11]=b*_+M*B+T*H+L*ie,s[15]=b*E+M*W+T*O+L*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],m=e[14],g=e[3],y=e[7],h=e[11],p=e[15],b=l*m-c*d,M=o*m-c*f,T=o*d-l*f,L=a*m-c*u,A=a*d-l*u,w=a*f-o*u;return t*(y*b-h*M+p*T)-n*(g*b-h*L+p*A)+r*(g*M-y*L+p*w)-s*(g*T-y*A+h*w)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],m=e[11],g=e[12],y=e[13],h=e[14],p=e[15],b=t*o-n*a,M=t*l-r*a,T=t*c-s*a,L=n*l-r*o,A=n*c-s*o,w=r*c-s*l,_=u*y-f*g,E=u*h-d*g,F=u*p-m*g,C=f*h-d*y,B=f*p-m*y,W=d*p-m*h,Y=b*W-M*B+T*C+L*F-A*E+w*_;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/Y;return e[0]=(o*W-l*B+c*C)*I,e[1]=(r*B-n*W-s*C)*I,e[2]=(y*w-h*A+p*L)*I,e[3]=(d*A-f*w-m*L)*I,e[4]=(l*F-a*W-c*E)*I,e[5]=(t*W-r*F+s*E)*I,e[6]=(h*T-g*w-p*M)*I,e[7]=(u*w-d*T+m*M)*I,e[8]=(a*B-o*F+c*_)*I,e[9]=(n*F-t*B-s*_)*I,e[10]=(g*A-y*T+p*b)*I,e[11]=(f*T-u*A-m*b)*I,e[12]=(o*E-a*C-l*_)*I,e[13]=(t*C-n*E+r*_)*I,e[14]=(y*M-g*L-h*b)*I,e[15]=(u*L-f*M+d*b)*I,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,f=o+o,d=s*c,m=s*u,g=s*f,y=a*u,h=a*f,p=o*f,b=l*c,M=l*u,T=l*f,L=n.x,A=n.y,w=n.z;return r[0]=(1-(y+p))*L,r[1]=(m+T)*L,r[2]=(g-M)*L,r[3]=0,r[4]=(m-T)*A,r[5]=(1-(d+p))*A,r[6]=(h+b)*A,r[7]=0,r[8]=(g+M)*w,r[9]=(h-b)*w,r[10]=(1-(d+y))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=ai.set(r[0],r[1],r[2]).length();const o=ai.set(r[4],r[5],r[6]).length(),l=ai.set(r[8],r[9],r[10]).length();s<0&&(a=-a),qt.copy(this);const c=1/a,u=1/o,f=1/l;return qt.elements[0]*=c,qt.elements[1]*=c,qt.elements[2]*=c,qt.elements[4]*=u,qt.elements[5]*=u,qt.elements[6]*=u,qt.elements[8]*=f,qt.elements[9]*=f,qt.elements[10]*=f,t.setFromRotationMatrix(qt),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=cn,l=!1){const c=this.elements,u=2*s/(t-e),f=2*s/(n-r),d=(t+e)/(t-e),m=(n+r)/(n-r);let g,y;if(l)g=s/(a-s),y=a*s/(a-s);else if(o===cn)g=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===Zi)g=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=cn,l=!1){const c=this.elements,u=2/(t-e),f=2/(n-r),d=-(t+e)/(t-e),m=-(n+r)/(n-r);let g,y;if(l)g=1/(a-s),y=a/(a-s);else if(o===cn)g=-2/(a-s),y=-(a+s)/(a-s);else if(o===Zi)g=-1/(a-s),y=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};ts.prototype.isMatrix4=!0;let st=ts;const ai=new U,qt=new st,Ud=new U(0,0,0),Nd=new U(1,1,1),Rn=new U,nr=new U,Ot=new U,Po=new st,Lo=new Pi;class Jn{constructor(e=0,t=0,n=0,r=Jn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],d=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ge(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:Te("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Po.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Po,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Lo.setFromEuler(this),this.setFromQuaternion(Lo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Jn.DEFAULT_ORDER="XYZ";class Ja{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Fd=0;const Do=new U,oi=new Pi,mn=new st,ir=new U,Ui=new U,Od=new U,Bd=new Pi,Io=new U(1,0,0),Uo=new U(0,1,0),No=new U(0,0,1),Fo={type:"added"},zd={type:"removed"},li={type:"childadded",child:null},gs={type:"childremoved",child:null};class Et extends ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=Bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Et.DEFAULT_UP.clone();const e=new U,t=new Jn,n=new Pi,r=new U(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new st},normalMatrix:{value:new Pe}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=Et.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ja,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return oi.setFromAxisAngle(e,t),this.quaternion.multiply(oi),this}rotateOnWorldAxis(e,t){return oi.setFromAxisAngle(e,t),this.quaternion.premultiply(oi),this}rotateX(e){return this.rotateOnAxis(Io,e)}rotateY(e){return this.rotateOnAxis(Uo,e)}rotateZ(e){return this.rotateOnAxis(No,e)}translateOnAxis(e,t){return Do.copy(e).applyQuaternion(this.quaternion),this.position.add(Do.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Io,e)}translateY(e){return this.translateOnAxis(Uo,e)}translateZ(e){return this.translateOnAxis(No,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ir.copy(e):ir.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ui.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mn.lookAt(Ui,ir,this.up):mn.lookAt(ir,Ui,this.up),this.quaternion.setFromRotationMatrix(mn),r&&(mn.extractRotation(r.matrixWorld),oi.setFromRotationMatrix(mn),this.quaternion.premultiply(oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ke("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Fo),li.child=e,this.dispatchEvent(li),li.child=null):ke("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(zd),gs.child=e,this.dispatchEvent(gs),gs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(mn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Fo),li.child=e,this.dispatchEvent(li),li.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,e,Od),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,Bd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Et.DEFAULT_UP=new U(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Xi extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vd={type:"move"};class vs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const y of e.hand.values()){const h=t.getJointPose(y,n),p=this._getHandJoint(c,y);h!==null&&(p.matrix.fromArray(h.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=h.radius),p.visible=h!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),m=.02,g=.005;c.inputState.pinching&&d>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vd)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Xi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Ql={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pn={h:0,s:0,l:0},rr={h:0,s:0,l:0};function _s(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class qe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,He.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=He.workingColorSpace){return this.r=e,this.g=t,this.b=n,He.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=He.workingColorSpace){if(e=wd(e,1),t=Ge(t,0,1),n=Ge(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=_s(a,s,e+1/3),this.g=_s(a,s,e),this.b=_s(a,s,e-1/3)}return He.colorSpaceToWorking(this,r),this}setStyle(e,t=Gt){function n(s){s!==void 0&&parseFloat(s)<1&&Te("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Te("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Te("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Gt){const n=Ql[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Te("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Mn(e.r),this.g=Mn(e.g),this.b=Mn(e.b),this}copyLinearToSRGB(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Gt){return He.workingToColorSpace(Ct.copy(this),e),Math.round(Ge(Ct.r*255,0,255))*65536+Math.round(Ge(Ct.g*255,0,255))*256+Math.round(Ge(Ct.b*255,0,255))}getHexString(e=Gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=He.workingColorSpace){He.workingToColorSpace(Ct.copy(this),t);const n=Ct.r,r=Ct.g,s=Ct.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=He.workingColorSpace){return He.workingToColorSpace(Ct.copy(this),t),e.r=Ct.r,e.g=Ct.g,e.b=Ct.b,e}getStyle(e=Gt){He.workingToColorSpace(Ct.copy(this),e);const t=Ct.r,n=Ct.g,r=Ct.b;return e!==Gt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Pn),this.setHSL(Pn.h+e,Pn.s+t,Pn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Pn),e.getHSL(rr);const n=us(Pn.h,rr.h,t),r=us(Pn.s,rr.s,t),s=us(Pn.l,rr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ct=new qe;qe.NAMES=Ql;class kd extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Jn,this.environmentIntensity=1,this.environmentRotation=new Jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Yt=new U,gn=new U,xs=new U,vn=new U,ci=new U,di=new U,Oo=new U,ys=new U,bs=new U,Ss=new U,Ms=new ut,Es=new ut,Ts=new ut;class Vt{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Yt.subVectors(e,t),r.cross(Yt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Yt.subVectors(r,t),gn.subVectors(n,t),xs.subVectors(e,t);const a=Yt.dot(Yt),o=Yt.dot(gn),l=Yt.dot(xs),c=gn.dot(gn),u=gn.dot(xs),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,m=(c*l-o*u)*d,g=(a*u-o*l)*d;return s.set(1-m-g,g,m)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,vn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,vn.x),l.addScaledVector(a,vn.y),l.addScaledVector(o,vn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return Ms.setScalar(0),Es.setScalar(0),Ts.setScalar(0),Ms.fromBufferAttribute(e,t),Es.fromBufferAttribute(e,n),Ts.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ms,s.x),a.addScaledVector(Es,s.y),a.addScaledVector(Ts,s.z),a}static isFrontFacing(e,t,n,r){return Yt.subVectors(n,t),gn.subVectors(e,t),Yt.cross(gn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yt.subVectors(this.c,this.b),gn.subVectors(this.a,this.b),Yt.cross(gn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Vt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Vt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return Vt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Vt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Vt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;ci.subVectors(r,n),di.subVectors(s,n),ys.subVectors(e,n);const l=ci.dot(ys),c=di.dot(ys);if(l<=0&&c<=0)return t.copy(n);bs.subVectors(e,r);const u=ci.dot(bs),f=di.dot(bs);if(u>=0&&f<=u)return t.copy(r);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(ci,a);Ss.subVectors(e,s);const m=ci.dot(Ss),g=di.dot(Ss);if(g>=0&&m<=g)return t.copy(s);const y=m*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(di,o);const h=u*g-m*f;if(h<=0&&f-u>=0&&m-g>=0)return Oo.subVectors(s,r),o=(f-u)/(f-u+(m-g)),t.copy(r).addScaledVector(Oo,o);const p=1/(h+y+d);return a=y*p,o=d*p,t.copy(n).addScaledVector(ci,a).addScaledVector(di,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ji{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,jt):jt.fromBufferAttribute(s,a),jt.applyMatrix4(e.matrixWorld),this.expandByPoint(jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),sr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),sr.copy(n.boundingBox)),sr.applyMatrix4(e.matrixWorld),this.union(sr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jt),jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ni),ar.subVectors(this.max,Ni),ui.subVectors(e.a,Ni),fi.subVectors(e.b,Ni),hi.subVectors(e.c,Ni),Ln.subVectors(fi,ui),Dn.subVectors(hi,fi),kn.subVectors(ui,hi);let t=[0,-Ln.z,Ln.y,0,-Dn.z,Dn.y,0,-kn.z,kn.y,Ln.z,0,-Ln.x,Dn.z,0,-Dn.x,kn.z,0,-kn.x,-Ln.y,Ln.x,0,-Dn.y,Dn.x,0,-kn.y,kn.x,0];return!As(t,ui,fi,hi,ar)||(t=[1,0,0,0,1,0,0,0,1],!As(t,ui,fi,hi,ar))?!1:(or.crossVectors(Ln,Dn),t=[or.x,or.y,or.z],As(t,ui,fi,hi,ar))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const _n=[new U,new U,new U,new U,new U,new U,new U,new U],jt=new U,sr=new Ji,ui=new U,fi=new U,hi=new U,Ln=new U,Dn=new U,kn=new U,Ni=new U,ar=new U,or=new U,Hn=new U;function As(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Hn.fromArray(i,s);const o=r.x*Math.abs(Hn.x)+r.y*Math.abs(Hn.y)+r.z*Math.abs(Hn.z),l=e.dot(Hn),c=t.dot(Hn),u=n.dot(Hn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const gt=new U,lr=new Oe;let Hd=0;class Jt extends ti{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Hd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ia,this.updateRanges=[],this.gpuType=ln,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)lr.fromBufferAttribute(this,t),lr.applyMatrix3(e),this.setXY(t,lr.x,lr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix3(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix4(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyNormalMatrix(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.transformDirection(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=an(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Qe(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=an(t,this.array)),t}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=an(t,this.array)),t}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=an(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=an(t,this.array)),t}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),r=Qe(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),r=Qe(r,this.array),s=Qe(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ia&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class ec extends Jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class tc extends Jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Xt extends Jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Gd=new Ji,Fi=new U,ws=new U;class is{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Gd.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fi.subVectors(e,this.center);const t=Fi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Fi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ws.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fi.copy(e.center).add(ws)),this.expandByPoint(Fi.copy(e.center).sub(ws))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Wd=0;const Ht=new st,Cs=new Et,pi=new U,Bt=new Ji,Oi=new Ji,Mt=new U;class $t extends ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=Bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Md(e)?tc:ec)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Pe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ht.makeRotationFromQuaternion(e),this.applyMatrix4(Ht),this}rotateX(e){return Ht.makeRotationX(e),this.applyMatrix4(Ht),this}rotateY(e){return Ht.makeRotationY(e),this.applyMatrix4(Ht),this}rotateZ(e){return Ht.makeRotationZ(e),this.applyMatrix4(Ht),this}translate(e,t,n){return Ht.makeTranslation(e,t,n),this.applyMatrix4(Ht),this}scale(e,t,n){return Ht.makeScale(e,t,n),this.applyMatrix4(Ht),this}lookAt(e){return Cs.lookAt(e),Cs.updateMatrix(),this.applyMatrix4(Cs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pi).negate(),this.translate(pi.x,pi.y,pi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Xt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Te("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ji);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ke("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Bt.setFromBufferAttribute(s),this.morphTargetsRelative?(Mt.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(Mt),Mt.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(Mt)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ke('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new is);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ke("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Oi.setFromBufferAttribute(o),this.morphTargetsRelative?(Mt.addVectors(Bt.min,Oi.min),Bt.expandByPoint(Mt),Mt.addVectors(Bt.max,Oi.max),Bt.expandByPoint(Mt)):(Bt.expandByPoint(Oi.min),Bt.expandByPoint(Oi.max))}Bt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Mt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Mt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Mt.fromBufferAttribute(o,c),l&&(pi.fromBufferAttribute(e,c),Mt.add(pi)),r=Math.max(r,n.distanceToSquared(Mt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ke('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ke("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Jt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new U,l[_]=new U;const c=new U,u=new U,f=new U,d=new Oe,m=new Oe,g=new Oe,y=new U,h=new U;function p(_,E,F){c.fromBufferAttribute(n,_),u.fromBufferAttribute(n,E),f.fromBufferAttribute(n,F),d.fromBufferAttribute(s,_),m.fromBufferAttribute(s,E),g.fromBufferAttribute(s,F),u.sub(c),f.sub(c),m.sub(d),g.sub(d);const C=1/(m.x*g.y-g.x*m.y);isFinite(C)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(f,-m.y).multiplyScalar(C),h.copy(f).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(C),o[_].add(y),o[E].add(y),o[F].add(y),l[_].add(h),l[E].add(h),l[F].add(h))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let _=0,E=b.length;_<E;++_){const F=b[_],C=F.start,B=F.count;for(let W=C,Y=C+B;W<Y;W+=3)p(e.getX(W+0),e.getX(W+1),e.getX(W+2))}const M=new U,T=new U,L=new U,A=new U;function w(_){L.fromBufferAttribute(r,_),A.copy(L);const E=o[_];M.copy(E),M.sub(L.multiplyScalar(L.dot(E))).normalize(),T.crossVectors(A,E);const C=T.dot(l[_])<0?-1:1;a.setXYZW(_,M.x,M.y,M.z,C)}for(let _=0,E=b.length;_<E;++_){const F=b[_],C=F.start,B=F.count;for(let W=C,Y=C+B;W<Y;W+=3)w(e.getX(W+0)),w(e.getX(W+1)),w(e.getX(W+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);const r=new U,s=new U,a=new U,o=new U,l=new U,c=new U,u=new U,f=new U;if(e)for(let d=0,m=e.count;d<m;d+=3){const g=e.getX(d+0),y=e.getX(d+1),h=e.getX(d+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,h),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,h),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(h,c.x,c.y,c.z)}else for(let d=0,m=t.count;d<m;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Mt.fromBufferAttribute(e,t),Mt.normalize(),e.setXYZ(t,Mt.x,Mt.y,Mt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,d=new c.constructor(l.length*u);let m=0,g=0;for(let y=0,h=l.length;y<h;y++){o.isInterleavedBufferAttribute?m=l[y]*o.data.stride+o.offset:m=l[y]*u;for(let p=0;p<u;p++)d[g++]=c[m++]}return new Jt(d,u,f)}if(this.index===null)return Te("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new $t,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const d=c[u],m=e(d,n);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const m=c[f];u.push(m.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let d=0,m=f.length;d<m;d++)u.push(f[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xd{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ia,this.updateRanges=[],this.version=0,this.uuid=Bn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Dt=new U;class Yr{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=an(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Qe(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=an(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=an(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=an(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=an(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),r=Qe(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),r=Qe(r,this.array),s=Qe(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){qr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Jt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Yr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){qr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let $d=0;class Li extends ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=Bn(),this.name="",this.type="Material",this.blending=Mi,this.side=zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$s,this.blendDst=qs,this.blendEquation=$n,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Ti,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Eo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ri,this.stencilZFail=ri,this.stencilZPass=ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Te(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Te(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Mi&&(n.blending=this.blending),this.side!==zn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==$s&&(n.blendSrc=this.blendSrc),this.blendDst!==qs&&(n.blendDst=this.blendDst),this.blendEquation!==$n&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ti&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Eo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class nc extends Li{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let mi;const Bi=new U,gi=new U,vi=new U,_i=new Oe,zi=new Oe,ic=new st,cr=new U,Vi=new U,dr=new U,Bo=new Oe,Rs=new Oe,zo=new Oe;class qd extends Et{constructor(e=new nc){if(super(),this.isSprite=!0,this.type="Sprite",mi===void 0){mi=new $t;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Xd(t,5);mi.setIndex([0,1,2,0,2,3]),mi.setAttribute("position",new Yr(n,3,0,!1)),mi.setAttribute("uv",new Yr(n,2,3,!1))}this.geometry=mi,this.material=e,this.center=new Oe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&ke('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),gi.setFromMatrixScale(this.matrixWorld),ic.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),vi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&gi.multiplyScalar(-vi.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const a=this.center;ur(cr.set(-.5,-.5,0),vi,a,gi,r,s),ur(Vi.set(.5,-.5,0),vi,a,gi,r,s),ur(dr.set(.5,.5,0),vi,a,gi,r,s),Bo.set(0,0),Rs.set(1,0),zo.set(1,1);let o=e.ray.intersectTriangle(cr,Vi,dr,!1,Bi);if(o===null&&(ur(Vi.set(-.5,.5,0),vi,a,gi,r,s),Rs.set(0,1),o=e.ray.intersectTriangle(cr,dr,Vi,!1,Bi),o===null))return;const l=e.ray.origin.distanceTo(Bi);l<e.near||l>e.far||t.push({distance:l,point:Bi.clone(),uv:Vt.getInterpolation(Bi,cr,Vi,dr,Bo,Rs,zo,new Oe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ur(i,e,t,n,r,s){_i.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(zi.x=s*_i.x-r*_i.y,zi.y=r*_i.x+s*_i.y):zi.copy(_i),i.copy(e),i.x+=zi.x,i.y+=zi.y,i.applyMatrix4(ic)}const xn=new U,Ps=new U,fr=new U,In=new U,Ls=new U,hr=new U,Ds=new U;class Qa{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=xn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xn.copy(this.origin).addScaledVector(this.direction,t),xn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ps.copy(e).add(t).multiplyScalar(.5),fr.copy(t).sub(e).normalize(),In.copy(this.origin).sub(Ps);const s=e.distanceTo(t)*.5,a=-this.direction.dot(fr),o=In.dot(this.direction),l=-In.dot(fr),c=In.lengthSq(),u=Math.abs(1-a*a);let f,d,m,g;if(u>0)if(f=a*l-o,d=a*o-l,g=s*u,f>=0)if(d>=-g)if(d<=g){const y=1/u;f*=y,d*=y,m=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*l)+c;else d=-s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*l)+c;else d<=-g?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-l),s),m=-f*f+d*(d+2*l)+c):d<=g?(f=0,d=Math.min(Math.max(-s,-l),s),m=d*(d+2*l)+c):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-l),s),m=-f*f+d*(d+2*l)+c);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Ps).addScaledVector(fr,d),m}intersectSphere(e,t){xn.subVectors(e.center,this.origin);const n=xn.dot(this.direction),r=xn.dot(xn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,xn)!==null}intersectTriangle(e,t,n,r,s){Ls.subVectors(t,e),hr.subVectors(n,e),Ds.crossVectors(Ls,hr);let a=this.direction.dot(Ds),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;In.subVectors(this.origin,e);const l=o*this.direction.dot(hr.crossVectors(In,hr));if(l<0)return null;const c=o*this.direction.dot(Ls.cross(In));if(c<0||l+c>a)return null;const u=-o*In.dot(Ds);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class jr extends Li{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=Nl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Vo=new st,Gn=new Qa,pr=new is,ko=new U,mr=new U,gr=new U,vr=new U,Is=new U,_r=new U,Ho=new U,xr=new U;class Qt extends Et{constructor(e=new $t,t=new jr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){_r.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(Is.fromBufferAttribute(f,e),a?_r.addScaledVector(Is,u):_r.addScaledVector(Is.sub(t),u))}t.add(_r)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(s),Gn.copy(e.ray).recast(e.near),!(pr.containsPoint(Gn.origin)===!1&&(Gn.intersectSphere(pr,ko)===null||Gn.origin.distanceToSquared(ko)>(e.far-e.near)**2))&&(Vo.copy(s).invert(),Gn.copy(e.ray).applyMatrix4(Vo),!(n.boundingBox!==null&&Gn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Gn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=d.length;g<y;g++){const h=d[g],p=a[h.materialIndex],b=Math.max(h.start,m.start),M=Math.min(o.count,Math.min(h.start+h.count,m.start+m.count));for(let T=b,L=M;T<L;T+=3){const A=o.getX(T),w=o.getX(T+1),_=o.getX(T+2);r=yr(this,p,e,n,c,u,f,A,w,_),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=h.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),y=Math.min(o.count,m.start+m.count);for(let h=g,p=y;h<p;h+=3){const b=o.getX(h),M=o.getX(h+1),T=o.getX(h+2);r=yr(this,a,e,n,c,u,f,b,M,T),r&&(r.faceIndex=Math.floor(h/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=d.length;g<y;g++){const h=d[g],p=a[h.materialIndex],b=Math.max(h.start,m.start),M=Math.min(l.count,Math.min(h.start+h.count,m.start+m.count));for(let T=b,L=M;T<L;T+=3){const A=T,w=T+1,_=T+2;r=yr(this,p,e,n,c,u,f,A,w,_),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=h.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),y=Math.min(l.count,m.start+m.count);for(let h=g,p=y;h<p;h+=3){const b=h,M=h+1,T=h+2;r=yr(this,a,e,n,c,u,f,b,M,T),r&&(r.faceIndex=Math.floor(h/3),t.push(r))}}}}function Yd(i,e,t,n,r,s,a,o){let l;if(e.side===Ut?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===zn,o),l===null)return null;xr.copy(o),xr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(xr);return c<t.near||c>t.far?null:{distance:c,point:xr.clone(),object:i}}function yr(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,mr),i.getVertexPosition(l,gr),i.getVertexPosition(c,vr);const u=Yd(i,e,t,n,mr,gr,vr,Ho);if(u){const f=new U;Vt.getBarycoord(Ho,mr,gr,vr,f),r&&(u.uv=Vt.getInterpolatedAttribute(r,o,l,c,f,new Oe)),s&&(u.uv1=Vt.getInterpolatedAttribute(s,o,l,c,f,new Oe)),a&&(u.normal=Vt.getInterpolatedAttribute(a,o,l,c,f,new U),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new U,materialIndex:0};Vt.getNormal(mr,gr,vr,d.normal),u.face=d,u.barycoord=f}return u}class rc extends Lt{constructor(e=null,t=1,n=1,r,s,a,o,l,c=Tt,u=Tt,f,d){super(null,a,o,l,c,u,r,s,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Us=new U,jd=new U,Kd=new Pe;class Xn{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Us.subVectors(n,t).cross(jd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(Us),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Kd.getNormalMatrix(e),r=this.coplanarPoint(Us).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Wn=new is,Zd=new Oe(.5,.5),br=new U;class eo{constructor(e=new Xn,t=new Xn,n=new Xn,r=new Xn,s=new Xn,a=new Xn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=cn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],f=s[5],d=s[6],m=s[7],g=s[8],y=s[9],h=s[10],p=s[11],b=s[12],M=s[13],T=s[14],L=s[15];if(r[0].setComponents(c-a,m-u,p-g,L-b).normalize(),r[1].setComponents(c+a,m+u,p+g,L+b).normalize(),r[2].setComponents(c+o,m+f,p+y,L+M).normalize(),r[3].setComponents(c-o,m-f,p-y,L-M).normalize(),n)r[4].setComponents(l,d,h,T).normalize(),r[5].setComponents(c-l,m-d,p-h,L-T).normalize();else if(r[4].setComponents(c-l,m-d,p-h,L-T).normalize(),t===cn)r[5].setComponents(c+l,m+d,p+h,L+T).normalize();else if(t===Zi)r[5].setComponents(l,d,h,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Wn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Wn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Wn)}intersectsSprite(e){Wn.center.set(0,0,0);const t=Zd.distanceTo(e.center);return Wn.radius=.7071067811865476+t,Wn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Wn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(br.x=r.normal.x>0?e.max.x:e.min.x,br.y=r.normal.y>0?e.max.y:e.min.y,br.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(br)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Fa extends Li{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Kr=new U,Zr=new U,Go=new st,ki=new Qa,Sr=new is,Ns=new U,Wo=new U;class Jd extends Et{constructor(e=new $t,t=new Fa){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Kr.fromBufferAttribute(t,r-1),Zr.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Kr.distanceTo(Zr);e.setAttribute("lineDistance",new Xt(n,1))}else Te("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sr.copy(n.boundingSphere),Sr.applyMatrix4(r),Sr.radius+=s,e.ray.intersectsSphere(Sr)===!1)return;Go.copy(r).invert(),ki.copy(e.ray).applyMatrix4(Go);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const m=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let y=m,h=g-1;y<h;y+=c){const p=u.getX(y),b=u.getX(y+1),M=Mr(this,e,ki,l,p,b,y);M&&t.push(M)}if(this.isLineLoop){const y=u.getX(g-1),h=u.getX(m),p=Mr(this,e,ki,l,y,h,g-1);p&&t.push(p)}}else{const m=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let y=m,h=g-1;y<h;y+=c){const p=Mr(this,e,ki,l,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){const y=Mr(this,e,ki,l,g-1,m,g-1);y&&t.push(y)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Mr(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(Kr.fromBufferAttribute(o,r),Zr.fromBufferAttribute(o,s),t.distanceSqToSegment(Kr,Zr,Ns,Wo)>n)return;Ns.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ns);if(!(c<e.near||c>e.far))return{distance:c,point:Wo.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Xo=new U,$o=new U;class qo extends Jd{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Xo.fromBufferAttribute(t,r),$o.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Xo.distanceTo($o);e.setAttribute("lineDistance",new Xt(n,1))}else Te("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class sc extends Lt{constructor(e=[],t=Kn,n,r,s,a,o,l,c,u){super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Qd extends Lt{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class wi extends Lt{constructor(e,t,n=fn,r,s,a,o=Tt,l=Tt,c,u=Tn,f=1){if(u!==Tn&&u!==jn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Za(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class eu extends wi{constructor(e,t=fn,n=Kn,r,s,a=Tt,o=Tt,l,c=Tn){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class ac extends Lt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Di extends $t{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let d=0,m=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Xt(c,3)),this.setAttribute("normal",new Xt(u,3)),this.setAttribute("uv",new Xt(f,2));function g(y,h,p,b,M,T,L,A,w,_,E){const F=T/w,C=L/_,B=T/2,W=L/2,Y=A/2,I=w+1,H=_+1;let O=0,K=0;const Q=new U;for(let ie=0;ie<H;ie++){const _e=ie*C-W;for(let Se=0;Se<I;Se++){const We=Se*F-B;Q[y]=We*b,Q[h]=_e*M,Q[p]=Y,c.push(Q.x,Q.y,Q.z),Q[y]=0,Q[h]=0,Q[p]=A>0?1:-1,u.push(Q.x,Q.y,Q.z),f.push(Se/w),f.push(1-ie/_),O+=1}}for(let ie=0;ie<_;ie++)for(let _e=0;_e<w;_e++){const Se=d+_e+I*ie,We=d+_e+I*(ie+1),je=d+(_e+1)+I*(ie+1),Ie=d+(_e+1)+I*ie;l.push(Se,We,Ie),l.push(We,je,Ie),K+=6}o.addGroup(m,K,E),m+=K,d+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Di(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}const Er=new U,Tr=new U,Fs=new U,Ar=new Vt;class Yo extends $t{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(zr*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],f=new Array(3),d={},m=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:y,b:h,c:p}=Ar;if(y.fromBufferAttribute(o,c[0]),h.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),Ar.getNormal(Fs),f[0]=`${Math.round(y.x*r)},${Math.round(y.y*r)},${Math.round(y.z*r)}`,f[1]=`${Math.round(h.x*r)},${Math.round(h.y*r)},${Math.round(h.z*r)}`,f[2]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let b=0;b<3;b++){const M=(b+1)%3,T=f[b],L=f[M],A=Ar[u[b]],w=Ar[u[M]],_=`${T}_${L}`,E=`${L}_${T}`;E in d&&d[E]?(Fs.dot(d[E].normal)<=s&&(m.push(A.x,A.y,A.z),m.push(w.x,w.y,w.z)),d[E]=null):_ in d||(d[_]={index0:c[b],index1:c[M],normal:Fs.clone()})}}for(const g in d)if(d[g]){const{index0:y,index1:h}=d[g];Er.fromBufferAttribute(o,y),Tr.fromBufferAttribute(o,h),m.push(Er.x,Er.y,Er.z),m.push(Tr.x,Tr.y,Tr.z)}this.setAttribute("position",new Xt(m,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Ci extends $t{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,f=e/o,d=t/l,m=[],g=[],y=[],h=[];for(let p=0;p<u;p++){const b=p*d-a;for(let M=0;M<c;M++){const T=M*f-s;g.push(T,-b,0),y.push(0,0,1),h.push(M/o),h.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<o;b++){const M=b+c*p,T=b+c*(p+1),L=b+1+c*(p+1),A=b+1+c*p;m.push(M,T,A),m.push(T,L,A)}this.setIndex(m),this.setAttribute("position",new Xt(g,3)),this.setAttribute("normal",new Xt(y,3)),this.setAttribute("uv",new Xt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ci(e.width,e.height,e.widthSegments,e.heightSegments)}}function Ri(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(jo(r))r.isRenderTargetTexture?(Te("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(jo(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function It(i){const e={};for(let t=0;t<i.length;t++){const n=Ri(i[t]);for(const r in n)e[r]=n[r]}return e}function jo(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function tu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function oc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:He.workingColorSpace}const nu={clone:Ri,merge:It};var iu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ru=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class hn extends Li{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=iu,this.fragmentShader=ru,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ri(e.uniforms),this.uniformsGroups=tu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class su extends hn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class au extends Li{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=md,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ou extends Li{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class lc extends Et{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Os=new st,Ko=new U,Zo=new U;class lu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Oe(512,512),this.mapType=zt,this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new eo,this._frameExtents=new Oe(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ko.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ko),Zo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Zo),t.updateMatrixWorld(),Os.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Os,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Zi||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Os)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const wr=new U,Cr=new Pi,nn=new U;class cc extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(wr,Cr,nn),nn.x===1&&nn.y===1&&nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(wr,Cr,nn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(wr,Cr,nn),nn.x===1&&nn.y===1&&nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(wr,Cr,nn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Un=new U,Jo=new Oe,Qo=new Oe;class Wt extends cc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Na*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Na*2*Math.atan(Math.tan(zr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Un.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Un.x,Un.y).multiplyScalar(-e/Un.z),Un.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Un.x,Un.y).multiplyScalar(-e/Un.z)}getViewSize(e,t){return this.getViewBounds(e,Jo,Qo),t.subVectors(Qo,Jo)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(zr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class to extends cc{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class cu extends lu{constructor(){super(new to(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class du extends lc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new cu}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class uu extends lc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const xi=-90,yi=1;class fu extends Et{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Wt(xi,yi,e,t);r.layers=this.layers,this.add(r);const s=new Wt(xi,yi,e,t);s.layers=this.layers,this.add(s);const a=new Wt(xi,yi,e,t);a.layers=this.layers,this.add(a);const o=new Wt(xi,yi,e,t);o.layers=this.layers,this.add(o);const l=new Wt(xi,yi,e,t);l.layers=this.layers,this.add(l);const c=new Wt(xi,yi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===cn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Zi)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;e.isWebGLRenderer===!0?h=e.state.buffers.depth.getReversed():h=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class hu extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const el=new st;class pu{constructor(e,t,n=0,r=1/0){this.ray=new Qa(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ja,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):ke("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return el.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(el),this}intersectObject(e,t=!0,n=[]){return Oa(e,this,n,t),n.sort(tl),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Oa(e[r],this,n,t);return n.sort(tl),n}}function tl(i,e){return i.distance-e.distance}function Oa(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)Oa(s[a],e,t,!0)}}const uo=class uo{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};uo.prototype.isMatrix2=!0;let nl=uo;function il(i,e,t,n){const r=mu(n);switch(t){case Yl:return i*e;case Kl:return i*e/r.components*r.byteLength;case $a:return i*e/r.components*r.byteLength;case Zn:return i*e*2/r.components*r.byteLength;case qa:return i*e*2/r.components*r.byteLength;case jl:return i*e*3/r.components*r.byteLength;case Zt:return i*e*4/r.components*r.byteLength;case Ya:return i*e*4/r.components*r.byteLength;case Nr:case Fr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Or:case Br:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ra:case aa:return Math.max(i,16)*Math.max(e,8)/4;case ia:case sa:return Math.max(i,8)*Math.max(e,8)/2;case oa:case la:case da:case ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ca:case Hr:case fa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case pa:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ma:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ga:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case va:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case _a:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case xa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ya:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ba:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Sa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ma:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ea:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ta:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Aa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case wa:case Ca:case Ra:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Pa:case La:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Gr:case Da:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function mu(i){switch(i){case zt:case Wl:return{byteLength:1,components:1};case ji:case Xl:case En:return{byteLength:2,components:1};case Wa:case Xa:return{byteLength:2,components:4};case fn:case Ga:case ln:return{byteLength:4,components:1};case $l:case ql:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ha}}));typeof window<"u"&&(window.__THREE__?Te("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ha);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function dc(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function gu(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const u=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,u);else{f.sort((m,g)=>m.start-g.start);let d=0;for(let m=1;m<f.length;m++){const g=f[d],y=f[m];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++d,f[d]=y)}f.length=d+1;for(let m=0,g=f.length;m<g;m++){const y=f[m];i.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var vu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_u=`#ifdef USE_ALPHAHASH
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
#endif`,xu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Su=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mu=`#ifdef USE_AOMAP
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
#endif`,Eu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Tu=`#ifdef USE_BATCHING
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
#endif`,Au=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ru=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Pu=`#ifdef USE_IRIDESCENCE
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
#endif`,Lu=`#ifdef USE_BUMPMAP
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
#endif`,Du=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Iu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Uu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Nu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ou=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Bu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,zu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Vu=`#define PI 3.141592653589793
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
} // validated`,ku=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Hu=`vec3 transformedNormal = objectNormal;
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
#endif`,Gu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$u=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Yu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ju=`#ifdef USE_ENVMAP
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
#endif`,Ku=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Zu=`#ifdef USE_ENVMAP
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
#endif`,Ju=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qu=`#ifdef USE_ENVMAP
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
#endif`,ef=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,rf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sf=`#ifdef USE_GRADIENTMAP
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
}`,af=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,of=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cf=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,df=`#ifdef USE_ENVMAP
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
#endif`,uf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ff=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mf=`PhysicalMaterial material;
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
#endif`,gf=`uniform sampler2D dfgLUT;
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
}`,vf=`
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
#endif`,_f=`#if defined( RE_IndirectDiffuse )
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
#endif`,xf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yf=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,bf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ef=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Af=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Cf=`#if defined( USE_POINTS_UV )
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
#endif`,Rf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Lf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Df=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,If=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uf=`#ifdef USE_MORPHTARGETS
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
#endif`,Nf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ff=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Of=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Bf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,kf=`#ifdef USE_NORMALMAP
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
#endif`,Hf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$f=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Yf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Kf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,eh=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,th=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,nh=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ih=`float getShadowMask() {
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
}`,rh=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sh=`#ifdef USE_SKINNING
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
#endif`,ah=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,oh=`#ifdef USE_SKINNING
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
#endif`,lh=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ch=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,uh=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,fh=`#ifdef USE_TRANSMISSION
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
#endif`,hh=`#ifdef USE_TRANSMISSION
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
#endif`,ph=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vh=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _h=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xh=`uniform sampler2D t2D;
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
}`,yh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bh=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Sh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mh=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eh=`#include <common>
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
}`,Th=`#if DEPTH_PACKING == 3200
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
}`,Ah=`#define DISTANCE
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
}`,wh=`#define DISTANCE
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
}`,Ch=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rh=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ph=`uniform float scale;
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
}`,Lh=`uniform vec3 diffuse;
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
}`,Dh=`#include <common>
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
}`,Ih=`uniform vec3 diffuse;
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
}`,Uh=`#define LAMBERT
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
}`,Nh=`#define LAMBERT
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
}`,Fh=`#define MATCAP
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
}`,Oh=`#define MATCAP
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
}`,Bh=`#define NORMAL
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
}`,zh=`#define NORMAL
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
}`,Vh=`#define PHONG
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
}`,kh=`#define PHONG
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
}`,Hh=`#define STANDARD
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
}`,Gh=`#define STANDARD
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
}`,Wh=`#define TOON
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
}`,Xh=`#define TOON
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
}`,$h=`uniform float size;
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
}`,qh=`uniform vec3 diffuse;
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
}`,Yh=`#include <common>
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
}`,jh=`uniform vec3 color;
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
}`,Kh=`uniform float rotation;
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
}`,Zh=`uniform vec3 diffuse;
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
}`,Ne={alphahash_fragment:vu,alphahash_pars_fragment:_u,alphamap_fragment:xu,alphamap_pars_fragment:yu,alphatest_fragment:bu,alphatest_pars_fragment:Su,aomap_fragment:Mu,aomap_pars_fragment:Eu,batching_pars_vertex:Tu,batching_vertex:Au,begin_vertex:wu,beginnormal_vertex:Cu,bsdfs:Ru,iridescence_fragment:Pu,bumpmap_pars_fragment:Lu,clipping_planes_fragment:Du,clipping_planes_pars_fragment:Iu,clipping_planes_pars_vertex:Uu,clipping_planes_vertex:Nu,color_fragment:Fu,color_pars_fragment:Ou,color_pars_vertex:Bu,color_vertex:zu,common:Vu,cube_uv_reflection_fragment:ku,defaultnormal_vertex:Hu,displacementmap_pars_vertex:Gu,displacementmap_vertex:Wu,emissivemap_fragment:Xu,emissivemap_pars_fragment:$u,colorspace_fragment:qu,colorspace_pars_fragment:Yu,envmap_fragment:ju,envmap_common_pars_fragment:Ku,envmap_pars_fragment:Zu,envmap_pars_vertex:Ju,envmap_physical_pars_fragment:df,envmap_vertex:Qu,fog_vertex:ef,fog_pars_vertex:tf,fog_fragment:nf,fog_pars_fragment:rf,gradientmap_pars_fragment:sf,lightmap_pars_fragment:af,lights_lambert_fragment:of,lights_lambert_pars_fragment:lf,lights_pars_begin:cf,lights_toon_fragment:uf,lights_toon_pars_fragment:ff,lights_phong_fragment:hf,lights_phong_pars_fragment:pf,lights_physical_fragment:mf,lights_physical_pars_fragment:gf,lights_fragment_begin:vf,lights_fragment_maps:_f,lights_fragment_end:xf,lightprobes_pars_fragment:yf,logdepthbuf_fragment:bf,logdepthbuf_pars_fragment:Sf,logdepthbuf_pars_vertex:Mf,logdepthbuf_vertex:Ef,map_fragment:Tf,map_pars_fragment:Af,map_particle_fragment:wf,map_particle_pars_fragment:Cf,metalnessmap_fragment:Rf,metalnessmap_pars_fragment:Pf,morphinstance_vertex:Lf,morphcolor_vertex:Df,morphnormal_vertex:If,morphtarget_pars_vertex:Uf,morphtarget_vertex:Nf,normal_fragment_begin:Ff,normal_fragment_maps:Of,normal_pars_fragment:Bf,normal_pars_vertex:zf,normal_vertex:Vf,normalmap_pars_fragment:kf,clearcoat_normal_fragment_begin:Hf,clearcoat_normal_fragment_maps:Gf,clearcoat_pars_fragment:Wf,iridescence_pars_fragment:Xf,opaque_fragment:$f,packing:qf,premultiplied_alpha_fragment:Yf,project_vertex:jf,dithering_fragment:Kf,dithering_pars_fragment:Zf,roughnessmap_fragment:Jf,roughnessmap_pars_fragment:Qf,shadowmap_pars_fragment:eh,shadowmap_pars_vertex:th,shadowmap_vertex:nh,shadowmask_pars_fragment:ih,skinbase_vertex:rh,skinning_pars_vertex:sh,skinning_vertex:ah,skinnormal_vertex:oh,specularmap_fragment:lh,specularmap_pars_fragment:ch,tonemapping_fragment:dh,tonemapping_pars_fragment:uh,transmission_fragment:fh,transmission_pars_fragment:hh,uv_pars_fragment:ph,uv_pars_vertex:mh,uv_vertex:gh,worldpos_vertex:vh,background_vert:_h,background_frag:xh,backgroundCube_vert:yh,backgroundCube_frag:bh,cube_vert:Sh,cube_frag:Mh,depth_vert:Eh,depth_frag:Th,distance_vert:Ah,distance_frag:wh,equirect_vert:Ch,equirect_frag:Rh,linedashed_vert:Ph,linedashed_frag:Lh,meshbasic_vert:Dh,meshbasic_frag:Ih,meshlambert_vert:Uh,meshlambert_frag:Nh,meshmatcap_vert:Fh,meshmatcap_frag:Oh,meshnormal_vert:Bh,meshnormal_frag:zh,meshphong_vert:Vh,meshphong_frag:kh,meshphysical_vert:Hh,meshphysical_frag:Gh,meshtoon_vert:Wh,meshtoon_frag:Xh,points_vert:$h,points_frag:qh,shadow_vert:Yh,shadow_frag:jh,sprite_vert:Kh,sprite_frag:Zh},ce={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Pe},alphaMap:{value:null},alphaMapTransform:{value:new Pe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Pe}},envmap:{envMap:{value:null},envMapRotation:{value:new Pe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Pe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Pe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Pe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Pe},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Pe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Pe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Pe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Pe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Pe},alphaTest:{value:0},uvTransform:{value:new Pe}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Pe},alphaMap:{value:null},alphaMapTransform:{value:new Pe},alphaTest:{value:0}}},sn={basic:{uniforms:It([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:It([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new qe(0)},envMapIntensity:{value:1}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:It([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:It([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:It([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new qe(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:It([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:It([ce.points,ce.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:It([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:It([ce.common,ce.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:It([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:It([ce.sprite,ce.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Pe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Pe}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distance:{uniforms:It([ce.common,ce.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distance_vert,fragmentShader:Ne.distance_frag},shadow:{uniforms:It([ce.lights,ce.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};sn.physical={uniforms:It([sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Pe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Pe},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Pe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Pe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Pe},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Pe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Pe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Pe},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Pe},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Pe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Pe},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Pe}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const Rr={r:0,b:0,g:0},Jh=new st,uc=new Pe;uc.set(-1,0,0,0,1,0,0,0,1);function Qh(i,e,t,n,r,s){const a=new qe(0);let o=r===!0?0:1,l,c,u=null,f=0,d=null;function m(b){let M=b.isScene===!0?b.background:null;if(M&&M.isTexture){const T=b.backgroundBlurriness>0;M=e.get(M,T)}return M}function g(b){let M=!1;const T=m(b);T===null?h(a,o):T&&T.isColor&&(h(T,1),M=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?t.buffers.color.setClear(0,0,0,1,s):L==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(b,M){const T=m(M);T&&(T.isCubeTexture||T.mapping===ns)?(c===void 0&&(c=new Qt(new Di(1,1,1),new hn({name:"BackgroundCubeMaterial",uniforms:Ri(sn.backgroundCube.uniforms),vertexShader:sn.backgroundCube.vertexShader,fragmentShader:sn.backgroundCube.fragmentShader,side:Ut,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(L,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=T,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Jh.makeRotationFromEuler(M.backgroundRotation)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(uc),c.material.toneMapped=He.getTransfer(T.colorSpace)!==Ye,(u!==T||f!==T.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=T,f=T.version,d=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new Qt(new Ci(2,2),new hn({name:"BackgroundMaterial",uniforms:Ri(sn.background.uniforms),vertexShader:sn.background.vertexShader,fragmentShader:sn.background.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=He.getTransfer(T.colorSpace)!==Ye,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||f!==T.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=T,f=T.version,d=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function h(b,M){b.getRGB(Rr,oc(i)),t.buffers.color.setClear(Rr.r,Rr.g,Rr.b,M,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,M=1){a.set(b),o=M,h(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,h(a,o)},render:g,addToRenderList:y,dispose:p}}function ep(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null);let s=r,a=!1;function o(C,B,W,Y,I){let H=!1;const O=f(C,Y,W,B);s!==O&&(s=O,c(s.object)),H=m(C,Y,W,I),H&&g(C,Y,W,I),I!==null&&e.update(I,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,T(C,B,W,Y),I!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function l(){return i.createVertexArray()}function c(C){return i.bindVertexArray(C)}function u(C){return i.deleteVertexArray(C)}function f(C,B,W,Y){const I=Y.wireframe===!0;let H=n[B.id];H===void 0&&(H={},n[B.id]=H);const O=C.isInstancedMesh===!0?C.id:0;let K=H[O];K===void 0&&(K={},H[O]=K);let Q=K[W.id];Q===void 0&&(Q={},K[W.id]=Q);let ie=Q[I];return ie===void 0&&(ie=d(l()),Q[I]=ie),ie}function d(C){const B=[],W=[],Y=[];for(let I=0;I<t;I++)B[I]=0,W[I]=0,Y[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:W,attributeDivisors:Y,object:C,attributes:{},index:null}}function m(C,B,W,Y){const I=s.attributes,H=B.attributes;let O=0;const K=W.getAttributes();for(const Q in K)if(K[Q].location>=0){const _e=I[Q];let Se=H[Q];if(Se===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(Se=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(Se=C.instanceColor)),_e===void 0||_e.attribute!==Se||Se&&_e.data!==Se.data)return!0;O++}return s.attributesNum!==O||s.index!==Y}function g(C,B,W,Y){const I={},H=B.attributes;let O=0;const K=W.getAttributes();for(const Q in K)if(K[Q].location>=0){let _e=H[Q];_e===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(_e=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(_e=C.instanceColor));const Se={};Se.attribute=_e,_e&&_e.data&&(Se.data=_e.data),I[Q]=Se,O++}s.attributes=I,s.attributesNum=O,s.index=Y}function y(){const C=s.newAttributes;for(let B=0,W=C.length;B<W;B++)C[B]=0}function h(C){p(C,0)}function p(C,B){const W=s.newAttributes,Y=s.enabledAttributes,I=s.attributeDivisors;W[C]=1,Y[C]===0&&(i.enableVertexAttribArray(C),Y[C]=1),I[C]!==B&&(i.vertexAttribDivisor(C,B),I[C]=B)}function b(){const C=s.newAttributes,B=s.enabledAttributes;for(let W=0,Y=B.length;W<Y;W++)B[W]!==C[W]&&(i.disableVertexAttribArray(W),B[W]=0)}function M(C,B,W,Y,I,H,O){O===!0?i.vertexAttribIPointer(C,B,W,I,H):i.vertexAttribPointer(C,B,W,Y,I,H)}function T(C,B,W,Y){y();const I=Y.attributes,H=W.getAttributes(),O=B.defaultAttributeValues;for(const K in H){const Q=H[K];if(Q.location>=0){let ie=I[K];if(ie===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(ie=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(ie=C.instanceColor)),ie!==void 0){const _e=ie.normalized,Se=ie.itemSize,We=e.get(ie);if(We===void 0)continue;const je=We.buffer,Ie=We.type,j=We.bytesPerElement,fe=Ie===i.INT||Ie===i.UNSIGNED_INT||ie.gpuType===Ga;if(ie.isInterleavedBufferAttribute){const re=ie.data,Ee=re.stride,Re=ie.offset;if(re.isInstancedInterleavedBuffer){for(let Ae=0;Ae<Q.locationSize;Ae++)p(Q.location+Ae,re.meshPerAttribute);C.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Ae=0;Ae<Q.locationSize;Ae++)h(Q.location+Ae);i.bindBuffer(i.ARRAY_BUFFER,je);for(let Ae=0;Ae<Q.locationSize;Ae++)M(Q.location+Ae,Se/Q.locationSize,Ie,_e,Ee*j,(Re+Se/Q.locationSize*Ae)*j,fe)}else{if(ie.isInstancedBufferAttribute){for(let re=0;re<Q.locationSize;re++)p(Q.location+re,ie.meshPerAttribute);C.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let re=0;re<Q.locationSize;re++)h(Q.location+re);i.bindBuffer(i.ARRAY_BUFFER,je);for(let re=0;re<Q.locationSize;re++)M(Q.location+re,Se/Q.locationSize,Ie,_e,Se*j,Se/Q.locationSize*re*j,fe)}}else if(O!==void 0){const _e=O[K];if(_e!==void 0)switch(_e.length){case 2:i.vertexAttrib2fv(Q.location,_e);break;case 3:i.vertexAttrib3fv(Q.location,_e);break;case 4:i.vertexAttrib4fv(Q.location,_e);break;default:i.vertexAttrib1fv(Q.location,_e)}}}}b()}function L(){E();for(const C in n){const B=n[C];for(const W in B){const Y=B[W];for(const I in Y){const H=Y[I];for(const O in H)u(H[O].object),delete H[O];delete Y[I]}}delete n[C]}}function A(C){if(n[C.id]===void 0)return;const B=n[C.id];for(const W in B){const Y=B[W];for(const I in Y){const H=Y[I];for(const O in H)u(H[O].object),delete H[O];delete Y[I]}}delete n[C.id]}function w(C){for(const B in n){const W=n[B];for(const Y in W){const I=W[Y];if(I[C.id]===void 0)continue;const H=I[C.id];for(const O in H)u(H[O].object),delete H[O];delete I[C.id]}}}function _(C){for(const B in n){const W=n[B],Y=C.isInstancedMesh===!0?C.id:0,I=W[Y];if(I!==void 0){for(const H in I){const O=I[H];for(const K in O)u(O[K].object),delete O[K];delete I[H]}delete W[Y],Object.keys(W).length===0&&delete n[B]}}}function E(){F(),a=!0,s!==r&&(s=r,c(s.object))}function F(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:E,resetDefaultState:F,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfObject:_,releaseStatesOfProgram:w,initAttributes:y,enableAttribute:h,disableUnusedAttributes:b}}function tp(i,e,t){let n;function r(l){n=l}function s(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let d=0;for(let m=0;m<u;m++)d+=c[m];t.update(d,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function np(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(w){return!(w!==Zt&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const _=w===En&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==zt&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==ln&&!_)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Te("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Te("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),h=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:m,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:h,maxAttributes:p,maxVertexUniforms:b,maxVaryings:M,maxFragmentUniforms:T,maxSamples:L,samples:A}}function ip(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Xn,o=new Pe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const m=f.length!==0||d||n!==0||r;return r=d,n=f.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,m){const g=f.clippingPlanes,y=f.clipIntersection,h=f.clipShadows,p=i.get(f);if(!r||g===null||g.length===0||s&&!h)s?u(null):c();else{const b=s?0:n,M=b*4;let T=p.clippingState||null;l.value=T,T=u(g,d,M,m);for(let L=0;L!==M;++L)T[L]=t[L];p.clippingState=T,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,d,m,g){const y=f!==null?f.length:0;let h=null;if(y!==0){if(h=l.value,g!==!0||h===null){const p=m+y*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(h===null||h.length<p)&&(h=new Float32Array(p));for(let M=0,T=m;M!==y;++M,T+=4)a.copy(f[M]).applyMatrix4(b,o),a.normal.toArray(h,T),h[T+3]=a.constant}l.value=h,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,h}}const On=4,rl=[.125,.215,.35,.446,.526,.582],qn=20,rp=256,Hi=new to,sl=new qe;let Bs=null,zs=0,Vs=0,ks=!1;const sp=new U;class al{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=sp}=s;Bs=this._renderer.getRenderTarget(),zs=this._renderer.getActiveCubeFace(),Vs=this._renderer.getActiveMipmapLevel(),ks=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ll(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Bs,zs,Vs),this._renderer.xr.enabled=ks,e.scissorTest=!1,bi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Kn||e.mapping===Ai?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Bs=this._renderer.getRenderTarget(),zs=this._renderer.getActiveCubeFace(),Vs=this._renderer.getActiveMipmapLevel(),ks=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Pt,minFilter:Pt,generateMipmaps:!1,type:En,format:Zt,colorSpace:Wr,depthBuffer:!1},r=ol(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ol(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ap(s)),this._blurMaterial=lp(s,e,t),this._ggxMaterial=op(s,e,t)}return r}_compileMaterial(e){const t=new Qt(new $t,e);this._renderer.compile(t,Hi)}_sceneToCubeUV(e,t,n,r,s){const l=new Wt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,m=f.toneMapping;f.getClearColor(sl),f.toneMapping=dn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Qt(new Di,new jr({name:"PMREM.Background",side:Ut,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,h=y.material;let p=!1;const b=e.background;b?b.isColor&&(h.color.copy(b),e.background=null,p=!0):(h.color.copy(sl),p=!0);for(let M=0;M<6;M++){const T=M%3;T===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[M],s.y,s.z)):T===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[M]));const L=this._cubeSize;bi(r,T*L,M>2?L:0,L,L),f.setRenderTarget(r),p&&f.render(y,l),f.render(e,l)}f.toneMapping=m,f.autoClear=d,e.background=b}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Kn||e.mapping===Ai;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=cl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ll());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;bi(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Hi)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),d=0+c*1.25,m=f*d,{_lodMax:g}=this,y=this._sizeLods[n],h=3*y*(n>g-On?n-g+On:0),p=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=m,l.mipInt.value=g-t,bi(s,h,p,3*y,2*y),r.setRenderTarget(s),r.render(o,Hi),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-n,bi(e,h,p,3*y,2*y),r.setRenderTarget(e),r.render(o,Hi)}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&ke("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[r];f.material=c;const d=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*qn-1),y=s/g,h=isFinite(s)?1+Math.floor(u*y):qn;h>qn&&Te(`sigmaRadians, ${s}, is too large and will clip, as it requested ${h} samples when the maximum is set to ${qn}`);const p=[];let b=0;for(let w=0;w<qn;++w){const _=w/y,E=Math.exp(-_*_/2);p.push(E),w===0?b+=E:w<h&&(b+=2*E)}for(let w=0;w<p.length;w++)p[w]=p[w]/b;d.envMap.value=e.texture,d.samples.value=h,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;const T=this._sizeLods[r],L=3*T*(r>M-On?r-M+On:0),A=4*(this._cubeSize-T);bi(t,L,A,3*T,2*T),l.setRenderTarget(t),l.render(f,Hi)}}function ap(i){const e=[],t=[],n=[];let r=i;const s=i-On+1+rl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>i-On?l=rl[a-i+On-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],m=6,g=6,y=3,h=2,p=1,b=new Float32Array(y*g*m),M=new Float32Array(h*g*m),T=new Float32Array(p*g*m);for(let A=0;A<m;A++){const w=A%3*2/3-1,_=A>2?0:-1,E=[w,_,0,w+2/3,_,0,w+2/3,_+1,0,w,_,0,w+2/3,_+1,0,w,_+1,0];b.set(E,y*g*A),M.set(d,h*g*A);const F=[A,A,A,A,A,A];T.set(F,p*g*A)}const L=new $t;L.setAttribute("position",new Jt(b,y)),L.setAttribute("uv",new Jt(M,h)),L.setAttribute("faceIndex",new Jt(T,p)),n.push(new Qt(L,null)),r>On&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function ol(i,e,t){const n=new un(i,e,t);return n.texture.mapping=ns,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function bi(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function op(i,e,t){return new hn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:rp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:rs(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function lp(i,e,t){const n=new Float32Array(qn),r=new U(0,1,0);return new hn({name:"SphericalGaussianBlur",defines:{n:qn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:rs(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function ll(){return new hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rs(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function cl(){return new hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function rs(){return`

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
	`}class fc extends un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new sc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Di(5,5,5),s=new hn({name:"CubemapFromEquirect",uniforms:Ri(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ut,blending:Sn});s.uniforms.tEquirect.value=t;const a=new Qt(r,s),o=t.minFilter;return t.minFilter===Yn&&(t.minFilter=Pt),new fu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function cp(i){let e=new WeakMap,t=new WeakMap,n=null;function r(d,m=!1){return d==null?null:m?a(d):s(d)}function s(d){if(d&&d.isTexture){const m=d.mapping;if(m===ls||m===cs)if(e.has(d)){const g=e.get(d).texture;return o(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const y=new fc(g.height);return y.fromEquirectangularTexture(i,d),e.set(d,y),d.addEventListener("dispose",c),o(y.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const m=d.mapping,g=m===ls||m===cs,y=m===Kn||m===Ai;if(g||y){let h=t.get(d);const p=h!==void 0?h.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new al(i)),h=g?n.fromEquirectangular(d,h):n.fromCubemap(d,h),h.texture.pmremVersion=d.pmremVersion,t.set(d,h),h.texture;if(h!==void 0)return h.texture;{const b=d.image;return g&&b&&b.height>0||y&&b&&l(b)?(n===null&&(n=new al(i)),h=g?n.fromEquirectangular(d):n.fromCubemap(d),h.texture.pmremVersion=d.pmremVersion,t.set(d,h),d.addEventListener("dispose",u),h.texture):null}}}return d}function o(d,m){return m===ls?d.mapping=Kn:m===cs&&(d.mapping=Ai),d}function l(d){let m=0;const g=6;for(let y=0;y<g;y++)d[y]!==void 0&&m++;return m===g}function c(d){const m=d.target;m.removeEventListener("dispose",c);const g=e.get(m);g!==void 0&&(e.delete(m),g.dispose())}function u(d){const m=d.target;m.removeEventListener("dispose",u);const g=t.get(m);g!==void 0&&(t.delete(m),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:f}}function dp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Ua("WebGLRenderer: "+n+" extension not supported."),r}}}function up(i,e,t,n){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete r[d.id];const m=s.get(d);m&&(e.remove(m),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const m in d)e.update(d[m],i.ARRAY_BUFFER)}function c(f){const d=[],m=f.index,g=f.attributes.position;let y=0;if(g===void 0)return;if(m!==null){const b=m.array;y=m.version;for(let M=0,T=b.length;M<T;M+=3){const L=b[M+0],A=b[M+1],w=b[M+2];d.push(L,A,A,w,w,L)}}else{const b=g.array;y=g.version;for(let M=0,T=b.length/3-1;M<T;M+=3){const L=M+0,A=M+1,w=M+2;d.push(L,A,A,w,w,L)}}const h=new(g.count>=65535?tc:ec)(d,1);h.version=y;const p=s.get(f);p&&e.remove(p),s.set(f,h)}function u(f){const d=s.get(f);if(d){const m=f.index;m!==null&&d.version<m.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function fp(i,e,t){let n;function r(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,d){i.drawElements(n,d,s,f*a),t.update(d,n,1)}function c(f,d,m){m!==0&&(i.drawElementsInstanced(n,d,s,f*a,m),t.update(d,n,m))}function u(f,d,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,m);let y=0;for(let h=0;h<m;h++)y+=d[h];t.update(y,n,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function hp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:ke("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function pp(i,e,t){const n=new WeakMap,r=new ut;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==f){let F=function(){_.dispose(),n.delete(o),o.removeEventListener("dispose",F)};var m=F;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,h=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let T=0;g===!0&&(T=1),y===!0&&(T=2),h===!0&&(T=3);let L=o.attributes.position.count*T,A=1;L>e.maxTextureSize&&(A=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);const w=new Float32Array(L*A*4*f),_=new Jl(w,L,A,f);_.type=ln,_.needsUpdate=!0;const E=T*4;for(let C=0;C<f;C++){const B=p[C],W=b[C],Y=M[C],I=L*A*4*C;for(let H=0;H<B.count;H++){const O=H*E;g===!0&&(r.fromBufferAttribute(B,H),w[I+O+0]=r.x,w[I+O+1]=r.y,w[I+O+2]=r.z,w[I+O+3]=0),y===!0&&(r.fromBufferAttribute(W,H),w[I+O+4]=r.x,w[I+O+5]=r.y,w[I+O+6]=r.z,w[I+O+7]=0),h===!0&&(r.fromBufferAttribute(Y,H),w[I+O+8]=r.x,w[I+O+9]=r.y,w[I+O+10]=r.z,w[I+O+11]=Y.itemSize===4?r.w:1)}}d={count:f,texture:_,size:new Oe(L,A)},n.set(o,d),o.addEventListener("dispose",F)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let h=0;h<c.length;h++)g+=c[h];const y=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",y),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function mp(i,e,t,n,r){let s=new WeakMap;function a(c){const u=r.render.frame,f=c.geometry,d=e.get(c,f);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const m=c.skeleton;s.get(m)!==u&&(m.update(),s.set(m,u))}return d}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const gp={[Fl]:"LINEAR_TONE_MAPPING",[Ol]:"REINHARD_TONE_MAPPING",[Bl]:"CINEON_TONE_MAPPING",[zl]:"ACES_FILMIC_TONE_MAPPING",[kl]:"AGX_TONE_MAPPING",[Hl]:"NEUTRAL_TONE_MAPPING",[Vl]:"CUSTOM_TONE_MAPPING"};function vp(i,e,t,n,r){const s=new un(e,t,{type:i,depthBuffer:n,stencilBuffer:r,depthTexture:n?new wi(e,t):void 0}),a=new un(e,t,{type:En,depthBuffer:!1,stencilBuffer:!1}),o=new $t;o.setAttribute("position",new Xt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Xt([0,2,0,0,2,0],2));const l=new su({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new Qt(o,l),u=new to(-1,1,1,-1,0,1);let f=null,d=null,m=!1,g,y=null,h=[],p=!1;this.setSize=function(b,M){s.setSize(b,M),a.setSize(b,M);for(let T=0;T<h.length;T++){const L=h[T];L.setSize&&L.setSize(b,M)}},this.setEffects=function(b){h=b,p=h.length>0&&h[0].isRenderPass===!0;const M=s.width,T=s.height;for(let L=0;L<h.length;L++){const A=h[L];A.setSize&&A.setSize(M,T)}},this.begin=function(b,M){if(m||b.toneMapping===dn&&h.length===0)return!1;if(y=M,M!==null){const T=M.width,L=M.height;(s.width!==T||s.height!==L)&&this.setSize(T,L)}return p===!1&&b.setRenderTarget(s),g=b.toneMapping,b.toneMapping=dn,!0},this.hasRenderPass=function(){return p},this.end=function(b,M){b.toneMapping=g,m=!0;let T=s,L=a;for(let A=0;A<h.length;A++){const w=h[A];if(w.enabled!==!1&&(w.render(b,L,T,M),w.needsSwap!==!1)){const _=T;T=L,L=_}}if(f!==b.outputColorSpace||d!==b.toneMapping){f=b.outputColorSpace,d=b.toneMapping,l.defines={},He.getTransfer(f)===Ye&&(l.defines.SRGB_TRANSFER="");const A=gp[d];A&&(l.defines[A]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=T.texture,b.setRenderTarget(y),b.render(c,u),y=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const hc=new Lt,Ba=new wi(1,1),pc=new Jl,mc=new Id,gc=new sc,dl=[],ul=[],fl=new Float32Array(16),hl=new Float32Array(9),pl=new Float32Array(4);function Ii(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=dl[r];if(s===void 0&&(s=new Float32Array(r),dl[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function bt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function St(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ss(i,e){let t=ul[e];t===void 0&&(t=new Int32Array(e),ul[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function _p(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function xp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2fv(this.addr,e),St(t,e)}}function yp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;i.uniform3fv(this.addr,e),St(t,e)}}function bp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4fv(this.addr,e),St(t,e)}}function Sp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(bt(t,n))return;pl.set(n),i.uniformMatrix2fv(this.addr,!1,pl),St(t,n)}}function Mp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(bt(t,n))return;hl.set(n),i.uniformMatrix3fv(this.addr,!1,hl),St(t,n)}}function Ep(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(bt(t,n))return;fl.set(n),i.uniformMatrix4fv(this.addr,!1,fl),St(t,n)}}function Tp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Ap(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2iv(this.addr,e),St(t,e)}}function wp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3iv(this.addr,e),St(t,e)}}function Cp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4iv(this.addr,e),St(t,e)}}function Rp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Pp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2uiv(this.addr,e),St(t,e)}}function Lp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3uiv(this.addr,e),St(t,e)}}function Dp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4uiv(this.addr,e),St(t,e)}}function Ip(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Ba.compareFunction=t.isReversedDepthBuffer()?Ka:ja,s=Ba):s=hc,t.setTexture2D(e||s,r)}function Up(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||mc,r)}function Np(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||gc,r)}function Fp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||pc,r)}function Op(i){switch(i){case 5126:return _p;case 35664:return xp;case 35665:return yp;case 35666:return bp;case 35674:return Sp;case 35675:return Mp;case 35676:return Ep;case 5124:case 35670:return Tp;case 35667:case 35671:return Ap;case 35668:case 35672:return wp;case 35669:case 35673:return Cp;case 5125:return Rp;case 36294:return Pp;case 36295:return Lp;case 36296:return Dp;case 35678:case 36198:case 36298:case 36306:case 35682:return Ip;case 35679:case 36299:case 36307:return Up;case 35680:case 36300:case 36308:case 36293:return Np;case 36289:case 36303:case 36311:case 36292:return Fp}}function Bp(i,e){i.uniform1fv(this.addr,e)}function zp(i,e){const t=Ii(e,this.size,2);i.uniform2fv(this.addr,t)}function Vp(i,e){const t=Ii(e,this.size,3);i.uniform3fv(this.addr,t)}function kp(i,e){const t=Ii(e,this.size,4);i.uniform4fv(this.addr,t)}function Hp(i,e){const t=Ii(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Gp(i,e){const t=Ii(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Wp(i,e){const t=Ii(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Xp(i,e){i.uniform1iv(this.addr,e)}function $p(i,e){i.uniform2iv(this.addr,e)}function qp(i,e){i.uniform3iv(this.addr,e)}function Yp(i,e){i.uniform4iv(this.addr,e)}function jp(i,e){i.uniform1uiv(this.addr,e)}function Kp(i,e){i.uniform2uiv(this.addr,e)}function Zp(i,e){i.uniform3uiv(this.addr,e)}function Jp(i,e){i.uniform4uiv(this.addr,e)}function Qp(i,e,t){const n=this.cache,r=e.length,s=ss(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),St(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ba:a=hc;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function em(i,e,t){const n=this.cache,r=e.length,s=ss(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),St(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||mc,s[a])}function tm(i,e,t){const n=this.cache,r=e.length,s=ss(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),St(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||gc,s[a])}function nm(i,e,t){const n=this.cache,r=e.length,s=ss(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),St(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||pc,s[a])}function im(i){switch(i){case 5126:return Bp;case 35664:return zp;case 35665:return Vp;case 35666:return kp;case 35674:return Hp;case 35675:return Gp;case 35676:return Wp;case 5124:case 35670:return Xp;case 35667:case 35671:return $p;case 35668:case 35672:return qp;case 35669:case 35673:return Yp;case 5125:return jp;case 36294:return Kp;case 36295:return Zp;case 36296:return Jp;case 35678:case 36198:case 36298:case 36306:case 35682:return Qp;case 35679:case 36299:case 36307:return em;case 35680:case 36300:case 36308:case 36293:return tm;case 36289:case 36303:case 36311:case 36292:return nm}}class rm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Op(t.type)}}class sm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=im(t.type)}}class am{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Hs=/(\w+)(\])?(\[|\.)?/g;function ml(i,e){i.seq.push(e),i.map[e.id]=e}function om(i,e,t){const n=i.name,r=n.length;for(Hs.lastIndex=0;;){const s=Hs.exec(n),a=Hs.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){ml(t,c===void 0?new rm(o,i,e):new sm(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new am(o),ml(t,f)),t=f}}}class Vr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);om(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function gl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const lm=37297;let cm=0;function dm(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const vl=new Pe;function um(i){He._getMatrix(vl,He.workingColorSpace,i);const e=`mat3( ${vl.elements.map(t=>t.toFixed(4))} )`;switch(He.getTransfer(i)){case Xr:return[e,"LinearTransferOETF"];case Ye:return[e,"sRGBTransferOETF"];default:return Te("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function _l(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+dm(i.getShaderSource(e),o)}else return s}function fm(i,e){const t=um(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const hm={[Fl]:"Linear",[Ol]:"Reinhard",[Bl]:"Cineon",[zl]:"ACESFilmic",[kl]:"AgX",[Hl]:"Neutral",[Vl]:"Custom"};function pm(i,e){const t=hm[e];return t===void 0?(Te("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Pr=new U;function mm(){He.getLuminanceCoefficients(Pr);const i=Pr.x.toFixed(4),e=Pr.y.toFixed(4),t=Pr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($i).join(`
`)}function vm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function _m(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function $i(i){return i!==""}function xl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function yl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const xm=/^[ \t]*#include +<([\w\d./]+)>/gm;function za(i){return i.replace(xm,bm)}const ym=new Map;function bm(i,e){let t=Ne[e];if(t===void 0){const n=ym.get(e);if(n!==void 0)t=Ne[n],Te('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return za(t)}const Sm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bl(i){return i.replace(Sm,Mm)}function Mm(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Sl(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Em={[Ur]:"SHADOWMAP_TYPE_PCF",[Wi]:"SHADOWMAP_TYPE_VSM"};function Tm(i){return Em[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Am={[Kn]:"ENVMAP_TYPE_CUBE",[Ai]:"ENVMAP_TYPE_CUBE",[ns]:"ENVMAP_TYPE_CUBE_UV"};function wm(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Am[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Cm={[Ai]:"ENVMAP_MODE_REFRACTION"};function Rm(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Cm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Pm={[Nl]:"ENVMAP_BLENDING_MULTIPLY",[fd]:"ENVMAP_BLENDING_MIX",[hd]:"ENVMAP_BLENDING_ADD"};function Lm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Pm[i.combine]||"ENVMAP_BLENDING_NONE"}function Dm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Im(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Tm(t),c=wm(t),u=Rm(t),f=Lm(t),d=Dm(t),m=gm(t),g=vm(s),y=r.createProgram();let h,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter($i).join(`
`),h.length>0&&(h+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter($i).join(`
`),p.length>0&&(p+=`
`)):(h=[Sl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($i).join(`
`),p=[Sl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==dn?"#define TONE_MAPPING":"",t.toneMapping!==dn?Ne.tonemapping_pars_fragment:"",t.toneMapping!==dn?pm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,fm("linearToOutputTexel",t.outputColorSpace),mm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($i).join(`
`)),a=za(a),a=xl(a,t),a=yl(a,t),o=za(o),o=xl(o,t),o=yl(o,t),a=bl(a),o=bl(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,h=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+h,p=["#define varying in",t.glslVersion===To?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===To?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=b+h+a,T=b+p+o,L=gl(r,r.VERTEX_SHADER,M),A=gl(r,r.FRAGMENT_SHADER,T);r.attachShader(y,L),r.attachShader(y,A),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function w(C){if(i.debug.checkShaderErrors){const B=r.getProgramInfoLog(y)||"",W=r.getShaderInfoLog(L)||"",Y=r.getShaderInfoLog(A)||"",I=B.trim(),H=W.trim(),O=Y.trim();let K=!0,Q=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,y,L,A);else{const ie=_l(r,L,"vertex"),_e=_l(r,A,"fragment");ke("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+I+`
`+ie+`
`+_e)}else I!==""?Te("WebGLProgram: Program Info Log:",I):(H===""||O==="")&&(Q=!1);Q&&(C.diagnostics={runnable:K,programLog:I,vertexShader:{log:H,prefix:h},fragmentShader:{log:O,prefix:p}})}r.deleteShader(L),r.deleteShader(A),_=new Vr(r,y),E=_m(r,y)}let _;this.getUniforms=function(){return _===void 0&&w(this),_};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=r.getProgramParameter(y,lm)),F},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=cm++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=L,this.fragmentShader=A,this}let Um=0;class Nm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Fm(e),t.set(e,n)),n}}class Fm{constructor(e){this.id=Um++,this.code=e,this.usedTimes=0}}function Om(i){return i===Zn||i===Hr||i===Gr}function Bm(i,e,t,n,r,s){const a=new Ja,o=new Nm,l=new Set,c=[],u=new Map,f=n.logarithmicDepthBuffer;let d=n.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function y(_,E,F,C,B,W){const Y=C.fog,I=B.geometry,H=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?C.environment:null,O=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,K=e.get(_.envMap||H,O),Q=K&&K.mapping===ns?K.image.height:null,ie=m[_.type];_.precision!==null&&(d=n.getMaxPrecision(_.precision),d!==_.precision&&Te("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const _e=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,Se=_e!==void 0?_e.length:0;let We=0;I.morphAttributes.position!==void 0&&(We=1),I.morphAttributes.normal!==void 0&&(We=2),I.morphAttributes.color!==void 0&&(We=3);let je,Ie,j,fe;if(ie){const Le=sn[ie];je=Le.vertexShader,Ie=Le.fragmentShader}else je=_.vertexShader,Ie=_.fragmentShader,o.update(_),j=o.getVertexShaderID(_),fe=o.getFragmentShaderID(_);const re=i.getRenderTarget(),Ee=i.state.buffers.depth.getReversed(),Re=B.isInstancedMesh===!0,Ae=B.isBatchedMesh===!0,at=!!_.map,ze=!!_.matcap,Ke=!!K,rt=!!_.aoMap,Be=!!_.lightMap,xt=!!_.bumpMap,ot=!!_.normalMap,Nt=!!_.displacementMap,P=!!_.emissiveMap,yt=!!_.metalnessMap,Ve=!!_.roughnessMap,nt=_.anisotropy>0,le=_.clearcoat>0,ct=_.dispersion>0,S=_.iridescence>0,v=_.sheen>0,N=_.transmission>0,$=nt&&!!_.anisotropyMap,J=le&&!!_.clearcoatMap,ee=le&&!!_.clearcoatNormalMap,oe=le&&!!_.clearcoatRoughnessMap,G=S&&!!_.iridescenceMap,q=S&&!!_.iridescenceThicknessMap,he=v&&!!_.sheenColorMap,ge=v&&!!_.sheenRoughnessMap,se=!!_.specularMap,te=!!_.specularColorMap,Ce=!!_.specularIntensityMap,Ue=N&&!!_.transmissionMap,$e=N&&!!_.thicknessMap,R=!!_.gradientMap,ne=!!_.alphaMap,X=_.alphaTest>0,pe=!!_.alphaHash,ae=!!_.extensions;let Z=dn;_.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(Z=i.toneMapping);const ye={shaderID:ie,shaderType:_.type,shaderName:_.name,vertexShader:je,fragmentShader:Ie,defines:_.defines,customVertexShaderID:j,customFragmentShaderID:fe,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:Ae,batchingColor:Ae&&B._colorsTexture!==null,instancing:Re,instancingColor:Re&&B.instanceColor!==null,instancingMorph:Re&&B.morphTexture!==null,outputColorSpace:re===null?i.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:He.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:at,matcap:ze,envMap:Ke,envMapMode:Ke&&K.mapping,envMapCubeUVHeight:Q,aoMap:rt,lightMap:Be,bumpMap:xt,normalMap:ot,displacementMap:Nt,emissiveMap:P,normalMapObjectSpace:ot&&_.normalMapType===gd,normalMapTangentSpace:ot&&_.normalMapType===Mo,packedNormalMap:ot&&_.normalMapType===Mo&&Om(_.normalMap.format),metalnessMap:yt,roughnessMap:Ve,anisotropy:nt,anisotropyMap:$,clearcoat:le,clearcoatMap:J,clearcoatNormalMap:ee,clearcoatRoughnessMap:oe,dispersion:ct,iridescence:S,iridescenceMap:G,iridescenceThicknessMap:q,sheen:v,sheenColorMap:he,sheenRoughnessMap:ge,specularMap:se,specularColorMap:te,specularIntensityMap:Ce,transmission:N,transmissionMap:Ue,thicknessMap:$e,gradientMap:R,opaque:_.transparent===!1&&_.blending===Mi&&_.alphaToCoverage===!1,alphaMap:ne,alphaTest:X,alphaHash:pe,combine:_.combine,mapUv:at&&g(_.map.channel),aoMapUv:rt&&g(_.aoMap.channel),lightMapUv:Be&&g(_.lightMap.channel),bumpMapUv:xt&&g(_.bumpMap.channel),normalMapUv:ot&&g(_.normalMap.channel),displacementMapUv:Nt&&g(_.displacementMap.channel),emissiveMapUv:P&&g(_.emissiveMap.channel),metalnessMapUv:yt&&g(_.metalnessMap.channel),roughnessMapUv:Ve&&g(_.roughnessMap.channel),anisotropyMapUv:$&&g(_.anisotropyMap.channel),clearcoatMapUv:J&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:ee&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:G&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:q&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:he&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:ge&&g(_.sheenRoughnessMap.channel),specularMapUv:se&&g(_.specularMap.channel),specularColorMapUv:te&&g(_.specularColorMap.channel),specularIntensityMapUv:Ce&&g(_.specularIntensityMap.channel),transmissionMapUv:Ue&&g(_.transmissionMap.channel),thicknessMapUv:$e&&g(_.thicknessMap.channel),alphaMapUv:ne&&g(_.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(ot||nt),vertexNormals:!!I.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!I.attributes.uv&&(at||ne),fog:!!Y,useFog:_.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||I.attributes.normal===void 0&&ot===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Ee,skinning:B.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:We,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:Z,decodeVideoTexture:at&&_.map.isVideoTexture===!0&&He.getTransfer(_.map.colorSpace)===Ye,decodeVideoTextureEmissive:P&&_.emissiveMap.isVideoTexture===!0&&He.getTransfer(_.emissiveMap.colorSpace)===Ye,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Kt,flipSided:_.side===Ut,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ae&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&_.extensions.multiDraw===!0||Ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return ye.vertexUv1s=l.has(1),ye.vertexUv2s=l.has(2),ye.vertexUv3s=l.has(3),l.clear(),ye}function h(_){const E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(const F in _.defines)E.push(F),E.push(_.defines[F]);return _.isRawShaderMaterial===!1&&(p(E,_),b(E,_),E.push(i.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function p(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function b(_,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),_.push(a.mask)}function M(_){const E=m[_.type];let F;if(E){const C=sn[E];F=nu.clone(C.uniforms)}else F=_.uniforms;return F}function T(_,E){let F=u.get(E);return F!==void 0?++F.usedTimes:(F=new Im(i,E,_,r),c.push(F),u.set(E,F)),F}function L(_){if(--_.usedTimes===0){const E=c.indexOf(_);c[E]=c[c.length-1],c.pop(),u.delete(_.cacheKey),_.destroy()}}function A(_){o.remove(_)}function w(){o.dispose()}return{getParameters:y,getProgramCacheKey:h,getUniforms:M,acquireProgram:T,releaseProgram:L,releaseShaderCache:A,programs:c,dispose:w}}function zm(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function Vm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Ml(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function El(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(d){let m=0;return d.isInstancedMesh&&(m+=2),d.isSkinnedMesh&&(m+=1),m}function o(d,m,g,y,h,p){let b=i[e];return b===void 0?(b={id:d.id,object:d,geometry:m,material:g,materialVariant:a(d),groupOrder:y,renderOrder:d.renderOrder,z:h,group:p},i[e]=b):(b.id=d.id,b.object=d,b.geometry=m,b.material=g,b.materialVariant=a(d),b.groupOrder=y,b.renderOrder=d.renderOrder,b.z=h,b.group=p),e++,b}function l(d,m,g,y,h,p){const b=o(d,m,g,y,h,p);g.transmission>0?n.push(b):g.transparent===!0?r.push(b):t.push(b)}function c(d,m,g,y,h,p){const b=o(d,m,g,y,h,p);g.transmission>0?n.unshift(b):g.transparent===!0?r.unshift(b):t.unshift(b)}function u(d,m){t.length>1&&t.sort(d||Vm),n.length>1&&n.sort(m||Ml),r.length>1&&r.sort(m||Ml)}function f(){for(let d=e,m=i.length;d<m;d++){const g=i[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function km(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new El,i.set(n,[a])):r>=s.length?(a=new El,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Hm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new qe};break;case"SpotLight":t={position:new U,direction:new U,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function Gm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Wm=0;function Xm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function $m(i){const e=new Hm,t=Gm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);const r=new U,s=new st,a=new st;function o(c){let u=0,f=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let m=0,g=0,y=0,h=0,p=0,b=0,M=0,T=0,L=0,A=0,w=0;c.sort(Xm);for(let E=0,F=c.length;E<F;E++){const C=c[E],B=C.color,W=C.intensity,Y=C.distance;let I=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Zn?I=C.shadow.map.texture:I=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)u+=B.r*W,f+=B.g*W,d+=B.b*W;else if(C.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(C.sh.coefficients[H],W);w++}else if(C.isDirectionalLight){const H=e.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const O=C.shadow,K=t.get(C);K.shadowIntensity=O.intensity,K.shadowBias=O.bias,K.shadowNormalBias=O.normalBias,K.shadowRadius=O.radius,K.shadowMapSize=O.mapSize,n.directionalShadow[m]=K,n.directionalShadowMap[m]=I,n.directionalShadowMatrix[m]=C.shadow.matrix,b++}n.directional[m]=H,m++}else if(C.isSpotLight){const H=e.get(C);H.position.setFromMatrixPosition(C.matrixWorld),H.color.copy(B).multiplyScalar(W),H.distance=Y,H.coneCos=Math.cos(C.angle),H.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),H.decay=C.decay,n.spot[y]=H;const O=C.shadow;if(C.map&&(n.spotLightMap[L]=C.map,L++,O.updateMatrices(C),C.castShadow&&A++),n.spotLightMatrix[y]=O.matrix,C.castShadow){const K=t.get(C);K.shadowIntensity=O.intensity,K.shadowBias=O.bias,K.shadowNormalBias=O.normalBias,K.shadowRadius=O.radius,K.shadowMapSize=O.mapSize,n.spotShadow[y]=K,n.spotShadowMap[y]=I,T++}y++}else if(C.isRectAreaLight){const H=e.get(C);H.color.copy(B).multiplyScalar(W),H.halfWidth.set(C.width*.5,0,0),H.halfHeight.set(0,C.height*.5,0),n.rectArea[h]=H,h++}else if(C.isPointLight){const H=e.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity),H.distance=C.distance,H.decay=C.decay,C.castShadow){const O=C.shadow,K=t.get(C);K.shadowIntensity=O.intensity,K.shadowBias=O.bias,K.shadowNormalBias=O.normalBias,K.shadowRadius=O.radius,K.shadowMapSize=O.mapSize,K.shadowCameraNear=O.camera.near,K.shadowCameraFar=O.camera.far,n.pointShadow[g]=K,n.pointShadowMap[g]=I,n.pointShadowMatrix[g]=C.shadow.matrix,M++}n.point[g]=H,g++}else if(C.isHemisphereLight){const H=e.get(C);H.skyColor.copy(C.color).multiplyScalar(W),H.groundColor.copy(C.groundColor).multiplyScalar(W),n.hemi[p]=H,p++}}h>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ce.LTC_FLOAT_1,n.rectAreaLTC2=ce.LTC_FLOAT_2):(n.rectAreaLTC1=ce.LTC_HALF_1,n.rectAreaLTC2=ce.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=d;const _=n.hash;(_.directionalLength!==m||_.pointLength!==g||_.spotLength!==y||_.rectAreaLength!==h||_.hemiLength!==p||_.numDirectionalShadows!==b||_.numPointShadows!==M||_.numSpotShadows!==T||_.numSpotMaps!==L||_.numLightProbes!==w)&&(n.directional.length=m,n.spot.length=y,n.rectArea.length=h,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=T,n.spotShadowMap.length=T,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=T+L-A,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=w,_.directionalLength=m,_.pointLength=g,_.spotLength=y,_.rectAreaLength=h,_.hemiLength=p,_.numDirectionalShadows=b,_.numPointShadows=M,_.numSpotShadows=T,_.numSpotMaps=L,_.numLightProbes=w,n.version=Wm++)}function l(c,u){let f=0,d=0,m=0,g=0,y=0;const h=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const M=c[p];if(M.isDirectionalLight){const T=n.directional[f];T.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(h),f++}else if(M.isSpotLight){const T=n.spot[m];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(h),T.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(h),m++}else if(M.isRectAreaLight){const T=n.rectArea[g];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(h),a.identity(),s.copy(M.matrixWorld),s.premultiply(h),a.extractRotation(s),T.halfWidth.set(M.width*.5,0,0),T.halfHeight.set(0,M.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const T=n.point[d];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(h),d++}else if(M.isHemisphereLight){const T=n.hemi[y];T.direction.setFromMatrixPosition(M.matrixWorld),T.direction.transformDirection(h),y++}}}return{setup:o,setupView:l,state:n}}function Tl(i){const e=new $m(i),t=[],n=[],r=[];function s(d){f.camera=d,t.length=0,n.length=0,r.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){r.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function qm(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Tl(i),e.set(r,[o])):s>=a.length?(o=new Tl(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Ym=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jm=`uniform sampler2D shadow_pass;
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
}`,Km=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],Zm=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Al=new st,Gi=new U,Gs=new U;function Jm(i,e,t){let n=new eo;const r=new Oe,s=new Oe,a=new ut,o=new au,l=new ou,c={},u=t.maxTextureSize,f={[zn]:Ut,[Ut]:zn,[Kt]:Kt},d=new hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:Ym,fragmentShader:jm}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const g=new $t;g.setAttribute("position",new Jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Qt(g,d),h=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ur;let p=this.type;this.render=function(A,w,_){if(h.enabled===!1||h.autoUpdate===!1&&h.needsUpdate===!1||A.length===0)return;this.type===qc&&(Te("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ur);const E=i.getRenderTarget(),F=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Sn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const W=p!==this.type;W&&w.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(I=>I.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,I=A.length;Y<I;Y++){const H=A[Y],O=H.shadow;if(O===void 0){Te("WebGLShadowMap:",H,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;r.copy(O.mapSize);const K=O.getFrameExtents();r.multiply(K),s.copy(O.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/K.x),r.x=s.x*K.x,O.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/K.y),r.y=s.y*K.y,O.mapSize.y=s.y));const Q=i.state.buffers.depth.getReversed();if(O.camera._reversedDepth=Q,O.map===null||W===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===Wi){if(H.isPointLight){Te("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new un(r.x,r.y,{format:Zn,type:En,minFilter:Pt,magFilter:Pt,generateMipmaps:!1}),O.map.texture.name=H.name+".shadowMap",O.map.depthTexture=new wi(r.x,r.y,ln),O.map.depthTexture.name=H.name+".shadowMapDepth",O.map.depthTexture.format=Tn,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Tt,O.map.depthTexture.magFilter=Tt}else H.isPointLight?(O.map=new fc(r.x),O.map.depthTexture=new eu(r.x,fn)):(O.map=new un(r.x,r.y),O.map.depthTexture=new wi(r.x,r.y,fn)),O.map.depthTexture.name=H.name+".shadowMap",O.map.depthTexture.format=Tn,this.type===Ur?(O.map.depthTexture.compareFunction=Q?Ka:ja,O.map.depthTexture.minFilter=Pt,O.map.depthTexture.magFilter=Pt):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Tt,O.map.depthTexture.magFilter=Tt);O.camera.updateProjectionMatrix()}const ie=O.map.isWebGLCubeRenderTarget?6:1;for(let _e=0;_e<ie;_e++){if(O.map.isWebGLCubeRenderTarget)i.setRenderTarget(O.map,_e),i.clear();else{_e===0&&(i.setRenderTarget(O.map),i.clear());const Se=O.getViewport(_e);a.set(s.x*Se.x,s.y*Se.y,s.x*Se.z,s.y*Se.w),B.viewport(a)}if(H.isPointLight){const Se=O.camera,We=O.matrix,je=H.distance||Se.far;je!==Se.far&&(Se.far=je,Se.updateProjectionMatrix()),Gi.setFromMatrixPosition(H.matrixWorld),Se.position.copy(Gi),Gs.copy(Se.position),Gs.add(Km[_e]),Se.up.copy(Zm[_e]),Se.lookAt(Gs),Se.updateMatrixWorld(),We.makeTranslation(-Gi.x,-Gi.y,-Gi.z),Al.multiplyMatrices(Se.projectionMatrix,Se.matrixWorldInverse),O._frustum.setFromProjectionMatrix(Al,Se.coordinateSystem,Se.reversedDepth)}else O.updateMatrices(H);n=O.getFrustum(),T(w,_,O.camera,H,this.type)}O.isPointLightShadow!==!0&&this.type===Wi&&b(O,_),O.needsUpdate=!1}p=this.type,h.needsUpdate=!1,i.setRenderTarget(E,F,C)};function b(A,w){const _=e.update(y);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new un(r.x,r.y,{format:Zn,type:En})),d.uniforms.shadow_pass.value=A.map.depthTexture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(w,null,_,d,y,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(w,null,_,m,y,null)}function M(A,w,_,E){let F=null;const C=_.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)F=C;else if(F=_.isPointLight===!0?l:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const B=F.uuid,W=w.uuid;let Y=c[B];Y===void 0&&(Y={},c[B]=Y);let I=Y[W];I===void 0&&(I=F.clone(),Y[W]=I,w.addEventListener("dispose",L)),F=I}if(F.visible=w.visible,F.wireframe=w.wireframe,E===Wi?F.side=w.shadowSide!==null?w.shadowSide:w.side:F.side=w.shadowSide!==null?w.shadowSide:f[w.side],F.alphaMap=w.alphaMap,F.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,F.map=w.map,F.clipShadows=w.clipShadows,F.clippingPlanes=w.clippingPlanes,F.clipIntersection=w.clipIntersection,F.displacementMap=w.displacementMap,F.displacementScale=w.displacementScale,F.displacementBias=w.displacementBias,F.wireframeLinewidth=w.wireframeLinewidth,F.linewidth=w.linewidth,_.isPointLight===!0&&F.isMeshDistanceMaterial===!0){const B=i.properties.get(F);B.light=_}return F}function T(A,w,_,E,F){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&F===Wi)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,A.matrixWorld);const W=e.update(A),Y=A.material;if(Array.isArray(Y)){const I=W.groups;for(let H=0,O=I.length;H<O;H++){const K=I[H],Q=Y[K.materialIndex];if(Q&&Q.visible){const ie=M(A,Q,E,F);A.onBeforeShadow(i,A,w,_,W,ie,K),i.renderBufferDirect(_,null,W,ie,A,K),A.onAfterShadow(i,A,w,_,W,ie,K)}}}else if(Y.visible){const I=M(A,Y,E,F);A.onBeforeShadow(i,A,w,_,W,I,null),i.renderBufferDirect(_,null,W,I,A,null),A.onAfterShadow(i,A,w,_,W,I,null)}}const B=A.children;for(let W=0,Y=B.length;W<Y;W++)T(B[W],w,_,E,F)}function L(A){A.target.removeEventListener("dispose",L);for(const _ in c){const E=c[_],F=A.target.uuid;F in E&&(E[F].dispose(),delete E[F])}}}function Qm(i,e){function t(){let R=!1;const ne=new ut;let X=null;const pe=new ut(0,0,0,0);return{setMask:function(ae){X!==ae&&!R&&(i.colorMask(ae,ae,ae,ae),X=ae)},setLocked:function(ae){R=ae},setClear:function(ae,Z,ye,Le,ft){ft===!0&&(ae*=Le,Z*=Le,ye*=Le),ne.set(ae,Z,ye,Le),pe.equals(ne)===!1&&(i.clearColor(ae,Z,ye,Le),pe.copy(ne))},reset:function(){R=!1,X=null,pe.set(-1,0,0,0)}}}function n(){let R=!1,ne=!1,X=null,pe=null,ae=null;return{setReversed:function(Z){if(ne!==Z){const ye=e.get("EXT_clip_control");Z?ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.ZERO_TO_ONE_EXT):ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.NEGATIVE_ONE_TO_ONE_EXT),ne=Z;const Le=ae;ae=null,this.setClear(Le)}},getReversed:function(){return ne},setTest:function(Z){Z?re(i.DEPTH_TEST):Ee(i.DEPTH_TEST)},setMask:function(Z){X!==Z&&!R&&(i.depthMask(Z),X=Z)},setFunc:function(Z){if(ne&&(Z=Ad[Z]),pe!==Z){switch(Z){case Ys:i.depthFunc(i.NEVER);break;case js:i.depthFunc(i.ALWAYS);break;case Ks:i.depthFunc(i.LESS);break;case Ti:i.depthFunc(i.LEQUAL);break;case Zs:i.depthFunc(i.EQUAL);break;case Js:i.depthFunc(i.GEQUAL);break;case Qs:i.depthFunc(i.GREATER);break;case ea:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=Z}},setLocked:function(Z){R=Z},setClear:function(Z){ae!==Z&&(ae=Z,ne&&(Z=1-Z),i.clearDepth(Z))},reset:function(){R=!1,X=null,pe=null,ae=null,ne=!1}}}function r(){let R=!1,ne=null,X=null,pe=null,ae=null,Z=null,ye=null,Le=null,ft=null;return{setTest:function(Ze){R||(Ze?re(i.STENCIL_TEST):Ee(i.STENCIL_TEST))},setMask:function(Ze){ne!==Ze&&!R&&(i.stencilMask(Ze),ne=Ze)},setFunc:function(Ze,pn,en){(X!==Ze||pe!==pn||ae!==en)&&(i.stencilFunc(Ze,pn,en),X=Ze,pe=pn,ae=en)},setOp:function(Ze,pn,en){(Z!==Ze||ye!==pn||Le!==en)&&(i.stencilOp(Ze,pn,en),Z=Ze,ye=pn,Le=en)},setLocked:function(Ze){R=Ze},setClear:function(Ze){ft!==Ze&&(i.clearStencil(Ze),ft=Ze)},reset:function(){R=!1,ne=null,X=null,pe=null,ae=null,Z=null,ye=null,Le=null,ft=null}}}const s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let u={},f={},d={},m=new WeakMap,g=[],y=null,h=!1,p=null,b=null,M=null,T=null,L=null,A=null,w=null,_=new qe(0,0,0),E=0,F=!1,C=null,B=null,W=null,Y=null,I=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,K=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(Q)[1]),O=K>=1):Q.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),O=K>=2);let ie=null,_e={};const Se=i.getParameter(i.SCISSOR_BOX),We=i.getParameter(i.VIEWPORT),je=new ut().fromArray(Se),Ie=new ut().fromArray(We);function j(R,ne,X,pe){const ae=new Uint8Array(4),Z=i.createTexture();i.bindTexture(R,Z),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ye=0;ye<X;ye++)R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY?i.texImage3D(ne,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,ae):i.texImage2D(ne+ye,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ae);return Z}const fe={};fe[i.TEXTURE_2D]=j(i.TEXTURE_2D,i.TEXTURE_2D,1),fe[i.TEXTURE_CUBE_MAP]=j(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),fe[i.TEXTURE_2D_ARRAY]=j(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),fe[i.TEXTURE_3D]=j(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),re(i.DEPTH_TEST),a.setFunc(Ti),xt(!1),ot(yo),re(i.CULL_FACE),rt(Sn);function re(R){u[R]!==!0&&(i.enable(R),u[R]=!0)}function Ee(R){u[R]!==!1&&(i.disable(R),u[R]=!1)}function Re(R,ne){return d[R]!==ne?(i.bindFramebuffer(R,ne),d[R]=ne,R===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ne),R===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ne),!0):!1}function Ae(R,ne){let X=g,pe=!1;if(R){X=m.get(ne),X===void 0&&(X=[],m.set(ne,X));const ae=R.textures;if(X.length!==ae.length||X[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,ye=ae.length;Z<ye;Z++)X[Z]=i.COLOR_ATTACHMENT0+Z;X.length=ae.length,pe=!0}}else X[0]!==i.BACK&&(X[0]=i.BACK,pe=!0);pe&&i.drawBuffers(X)}function at(R){return y!==R?(i.useProgram(R),y=R,!0):!1}const ze={[$n]:i.FUNC_ADD,[jc]:i.FUNC_SUBTRACT,[Kc]:i.FUNC_REVERSE_SUBTRACT};ze[Zc]=i.MIN,ze[Jc]=i.MAX;const Ke={[Qc]:i.ZERO,[ed]:i.ONE,[td]:i.SRC_COLOR,[$s]:i.SRC_ALPHA,[od]:i.SRC_ALPHA_SATURATE,[sd]:i.DST_COLOR,[id]:i.DST_ALPHA,[nd]:i.ONE_MINUS_SRC_COLOR,[qs]:i.ONE_MINUS_SRC_ALPHA,[ad]:i.ONE_MINUS_DST_COLOR,[rd]:i.ONE_MINUS_DST_ALPHA,[ld]:i.CONSTANT_COLOR,[cd]:i.ONE_MINUS_CONSTANT_COLOR,[dd]:i.CONSTANT_ALPHA,[ud]:i.ONE_MINUS_CONSTANT_ALPHA};function rt(R,ne,X,pe,ae,Z,ye,Le,ft,Ze){if(R===Sn){h===!0&&(Ee(i.BLEND),h=!1);return}if(h===!1&&(re(i.BLEND),h=!0),R!==Yc){if(R!==p||Ze!==F){if((b!==$n||L!==$n)&&(i.blendEquation(i.FUNC_ADD),b=$n,L=$n),Ze)switch(R){case Mi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Xs:i.blendFunc(i.ONE,i.ONE);break;case bo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case So:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ke("WebGLState: Invalid blending: ",R);break}else switch(R){case Mi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Xs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case bo:ke("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case So:ke("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ke("WebGLState: Invalid blending: ",R);break}M=null,T=null,A=null,w=null,_.set(0,0,0),E=0,p=R,F=Ze}return}ae=ae||ne,Z=Z||X,ye=ye||pe,(ne!==b||ae!==L)&&(i.blendEquationSeparate(ze[ne],ze[ae]),b=ne,L=ae),(X!==M||pe!==T||Z!==A||ye!==w)&&(i.blendFuncSeparate(Ke[X],Ke[pe],Ke[Z],Ke[ye]),M=X,T=pe,A=Z,w=ye),(Le.equals(_)===!1||ft!==E)&&(i.blendColor(Le.r,Le.g,Le.b,ft),_.copy(Le),E=ft),p=R,F=!1}function Be(R,ne){R.side===Kt?Ee(i.CULL_FACE):re(i.CULL_FACE);let X=R.side===Ut;ne&&(X=!X),xt(X),R.blending===Mi&&R.transparent===!1?rt(Sn):rt(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),a.setFunc(R.depthFunc),a.setTest(R.depthTest),a.setMask(R.depthWrite),s.setMask(R.colorWrite);const pe=R.stencilWrite;o.setTest(pe),pe&&(o.setMask(R.stencilWriteMask),o.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),o.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),P(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):Ee(i.SAMPLE_ALPHA_TO_COVERAGE)}function xt(R){C!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),C=R)}function ot(R){R!==Xc?(re(i.CULL_FACE),R!==B&&(R===yo?i.cullFace(i.BACK):R===$c?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ee(i.CULL_FACE),B=R}function Nt(R){R!==W&&(O&&i.lineWidth(R),W=R)}function P(R,ne,X){R?(re(i.POLYGON_OFFSET_FILL),(Y!==ne||I!==X)&&(Y=ne,I=X,a.getReversed()&&(ne=-ne),i.polygonOffset(ne,X))):Ee(i.POLYGON_OFFSET_FILL)}function yt(R){R?re(i.SCISSOR_TEST):Ee(i.SCISSOR_TEST)}function Ve(R){R===void 0&&(R=i.TEXTURE0+H-1),ie!==R&&(i.activeTexture(R),ie=R)}function nt(R,ne,X){X===void 0&&(ie===null?X=i.TEXTURE0+H-1:X=ie);let pe=_e[X];pe===void 0&&(pe={type:void 0,texture:void 0},_e[X]=pe),(pe.type!==R||pe.texture!==ne)&&(ie!==X&&(i.activeTexture(X),ie=X),i.bindTexture(R,ne||fe[R]),pe.type=R,pe.texture=ne)}function le(){const R=_e[ie];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function ct(){try{i.compressedTexImage2D(...arguments)}catch(R){ke("WebGLState:",R)}}function S(){try{i.compressedTexImage3D(...arguments)}catch(R){ke("WebGLState:",R)}}function v(){try{i.texSubImage2D(...arguments)}catch(R){ke("WebGLState:",R)}}function N(){try{i.texSubImage3D(...arguments)}catch(R){ke("WebGLState:",R)}}function $(){try{i.compressedTexSubImage2D(...arguments)}catch(R){ke("WebGLState:",R)}}function J(){try{i.compressedTexSubImage3D(...arguments)}catch(R){ke("WebGLState:",R)}}function ee(){try{i.texStorage2D(...arguments)}catch(R){ke("WebGLState:",R)}}function oe(){try{i.texStorage3D(...arguments)}catch(R){ke("WebGLState:",R)}}function G(){try{i.texImage2D(...arguments)}catch(R){ke("WebGLState:",R)}}function q(){try{i.texImage3D(...arguments)}catch(R){ke("WebGLState:",R)}}function he(R){return f[R]!==void 0?f[R]:i.getParameter(R)}function ge(R,ne){f[R]!==ne&&(i.pixelStorei(R,ne),f[R]=ne)}function se(R){je.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),je.copy(R))}function te(R){Ie.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),Ie.copy(R))}function Ce(R,ne){let X=c.get(ne);X===void 0&&(X=new WeakMap,c.set(ne,X));let pe=X.get(R);pe===void 0&&(pe=i.getUniformBlockIndex(ne,R.name),X.set(R,pe))}function Ue(R,ne){const pe=c.get(ne).get(R);l.get(ne)!==pe&&(i.uniformBlockBinding(ne,pe,R.__bindingPointIndex),l.set(ne,pe))}function $e(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},ie=null,_e={},d={},m=new WeakMap,g=[],y=null,h=!1,p=null,b=null,M=null,T=null,L=null,A=null,w=null,_=new qe(0,0,0),E=0,F=!1,C=null,B=null,W=null,Y=null,I=null,je.set(0,0,i.canvas.width,i.canvas.height),Ie.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:re,disable:Ee,bindFramebuffer:Re,drawBuffers:Ae,useProgram:at,setBlending:rt,setMaterial:Be,setFlipSided:xt,setCullFace:ot,setLineWidth:Nt,setPolygonOffset:P,setScissorTest:yt,activeTexture:Ve,bindTexture:nt,unbindTexture:le,compressedTexImage2D:ct,compressedTexImage3D:S,texImage2D:G,texImage3D:q,pixelStorei:ge,getParameter:he,updateUBOMapping:Ce,uniformBlockBinding:Ue,texStorage2D:ee,texStorage3D:oe,texSubImage2D:v,texSubImage3D:N,compressedTexSubImage2D:$,compressedTexSubImage3D:J,scissor:se,viewport:te,reset:$e}}function eg(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Oe,u=new WeakMap,f=new Set;let d;const m=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(S,v){return g?new OffscreenCanvas(S,v):$r("canvas")}function h(S,v,N){let $=1;const J=ct(S);if((J.width>N||J.height>N)&&($=N/Math.max(J.width,J.height)),$<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){const ee=Math.floor($*J.width),oe=Math.floor($*J.height);d===void 0&&(d=y(ee,oe));const G=v?y(ee,oe):d;return G.width=ee,G.height=oe,G.getContext("2d").drawImage(S,0,0,ee,oe),Te("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+ee+"x"+oe+")."),G}else return"data"in S&&Te("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),S;return S}function p(S){return S.generateMipmaps}function b(S){i.generateMipmap(S)}function M(S){return S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?i.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(S,v,N,$,J,ee=!1){if(S!==null){if(i[S]!==void 0)return i[S];Te("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let oe;$&&(oe=e.get("EXT_texture_norm16"),oe||Te("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let G=v;if(v===i.RED&&(N===i.FLOAT&&(G=i.R32F),N===i.HALF_FLOAT&&(G=i.R16F),N===i.UNSIGNED_BYTE&&(G=i.R8),N===i.UNSIGNED_SHORT&&oe&&(G=oe.R16_EXT),N===i.SHORT&&oe&&(G=oe.R16_SNORM_EXT)),v===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(G=i.R8UI),N===i.UNSIGNED_SHORT&&(G=i.R16UI),N===i.UNSIGNED_INT&&(G=i.R32UI),N===i.BYTE&&(G=i.R8I),N===i.SHORT&&(G=i.R16I),N===i.INT&&(G=i.R32I)),v===i.RG&&(N===i.FLOAT&&(G=i.RG32F),N===i.HALF_FLOAT&&(G=i.RG16F),N===i.UNSIGNED_BYTE&&(G=i.RG8),N===i.UNSIGNED_SHORT&&oe&&(G=oe.RG16_EXT),N===i.SHORT&&oe&&(G=oe.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(G=i.RG8UI),N===i.UNSIGNED_SHORT&&(G=i.RG16UI),N===i.UNSIGNED_INT&&(G=i.RG32UI),N===i.BYTE&&(G=i.RG8I),N===i.SHORT&&(G=i.RG16I),N===i.INT&&(G=i.RG32I)),v===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(G=i.RGB8UI),N===i.UNSIGNED_SHORT&&(G=i.RGB16UI),N===i.UNSIGNED_INT&&(G=i.RGB32UI),N===i.BYTE&&(G=i.RGB8I),N===i.SHORT&&(G=i.RGB16I),N===i.INT&&(G=i.RGB32I)),v===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(G=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(G=i.RGBA16UI),N===i.UNSIGNED_INT&&(G=i.RGBA32UI),N===i.BYTE&&(G=i.RGBA8I),N===i.SHORT&&(G=i.RGBA16I),N===i.INT&&(G=i.RGBA32I)),v===i.RGB&&(N===i.UNSIGNED_SHORT&&oe&&(G=oe.RGB16_EXT),N===i.SHORT&&oe&&(G=oe.RGB16_SNORM_EXT),N===i.UNSIGNED_INT_5_9_9_9_REV&&(G=i.RGB9_E5),N===i.UNSIGNED_INT_10F_11F_11F_REV&&(G=i.R11F_G11F_B10F)),v===i.RGBA){const q=ee?Xr:He.getTransfer(J);N===i.FLOAT&&(G=i.RGBA32F),N===i.HALF_FLOAT&&(G=i.RGBA16F),N===i.UNSIGNED_BYTE&&(G=q===Ye?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT&&oe&&(G=oe.RGBA16_EXT),N===i.SHORT&&oe&&(G=oe.RGBA16_SNORM_EXT),N===i.UNSIGNED_SHORT_4_4_4_4&&(G=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(G=i.RGB5_A1)}return(G===i.R16F||G===i.R32F||G===i.RG16F||G===i.RG32F||G===i.RGBA16F||G===i.RGBA32F)&&e.get("EXT_color_buffer_float"),G}function L(S,v){let N;return S?v===null||v===fn||v===Ki?N=i.DEPTH24_STENCIL8:v===ln?N=i.DEPTH32F_STENCIL8:v===ji&&(N=i.DEPTH24_STENCIL8,Te("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===fn||v===Ki?N=i.DEPTH_COMPONENT24:v===ln?N=i.DEPTH_COMPONENT32F:v===ji&&(N=i.DEPTH_COMPONENT16),N}function A(S,v){return p(S)===!0||S.isFramebufferTexture&&S.minFilter!==Tt&&S.minFilter!==Pt?Math.log2(Math.max(v.width,v.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?v.mipmaps.length:1}function w(S){const v=S.target;v.removeEventListener("dispose",w),E(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&f.delete(v)}function _(S){const v=S.target;v.removeEventListener("dispose",_),C(v)}function E(S){const v=n.get(S);if(v.__webglInit===void 0)return;const N=S.source,$=m.get(N);if($){const J=$[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&F(S),Object.keys($).length===0&&m.delete(N)}n.remove(S)}function F(S){const v=n.get(S);i.deleteTexture(v.__webglTexture);const N=S.source,$=m.get(N);delete $[v.__cacheKey],a.memory.textures--}function C(S){const v=n.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),n.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(v.__webglFramebuffer[$]))for(let J=0;J<v.__webglFramebuffer[$].length;J++)i.deleteFramebuffer(v.__webglFramebuffer[$][J]);else i.deleteFramebuffer(v.__webglFramebuffer[$]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[$])}else{if(Array.isArray(v.__webglFramebuffer))for(let $=0;$<v.__webglFramebuffer.length;$++)i.deleteFramebuffer(v.__webglFramebuffer[$]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let $=0;$<v.__webglColorRenderbuffer.length;$++)v.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[$]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const N=S.textures;for(let $=0,J=N.length;$<J;$++){const ee=n.get(N[$]);ee.__webglTexture&&(i.deleteTexture(ee.__webglTexture),a.memory.textures--),n.remove(N[$])}n.remove(S)}let B=0;function W(){B=0}function Y(){return B}function I(S){B=S}function H(){const S=B;return S>=r.maxTextures&&Te("WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+r.maxTextures),B+=1,S}function O(S){const v=[];return v.push(S.wrapS),v.push(S.wrapT),v.push(S.wrapR||0),v.push(S.magFilter),v.push(S.minFilter),v.push(S.anisotropy),v.push(S.internalFormat),v.push(S.format),v.push(S.type),v.push(S.generateMipmaps),v.push(S.premultiplyAlpha),v.push(S.flipY),v.push(S.unpackAlignment),v.push(S.colorSpace),v.join()}function K(S,v){const N=n.get(S);if(S.isVideoTexture&&nt(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&N.__version!==S.version){const $=S.image;if($===null)Te("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Te("WebGLRenderer: Texture marked for update but image is incomplete");else{Ee(N,S,v);return}}else S.isExternalTexture&&(N.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+v)}function Q(S,v){const N=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&N.__version!==S.version){Ee(N,S,v);return}else S.isExternalTexture&&(N.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+v)}function ie(S,v){const N=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&N.__version!==S.version){Ee(N,S,v);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+v)}function _e(S,v){const N=n.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&N.__version!==S.version){Re(N,S,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+v)}const Se={[ta]:i.REPEAT,[yn]:i.CLAMP_TO_EDGE,[na]:i.MIRRORED_REPEAT},We={[Tt]:i.NEAREST,[pd]:i.NEAREST_MIPMAP_NEAREST,[tr]:i.NEAREST_MIPMAP_LINEAR,[Pt]:i.LINEAR,[ds]:i.LINEAR_MIPMAP_NEAREST,[Yn]:i.LINEAR_MIPMAP_LINEAR},je={[vd]:i.NEVER,[Sd]:i.ALWAYS,[_d]:i.LESS,[ja]:i.LEQUAL,[xd]:i.EQUAL,[Ka]:i.GEQUAL,[yd]:i.GREATER,[bd]:i.NOTEQUAL};function Ie(S,v){if(v.type===ln&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Pt||v.magFilter===ds||v.magFilter===tr||v.magFilter===Yn||v.minFilter===Pt||v.minFilter===ds||v.minFilter===tr||v.minFilter===Yn)&&Te("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(S,i.TEXTURE_WRAP_S,Se[v.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,Se[v.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,Se[v.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,We[v.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,We[v.minFilter]),v.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,je[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Tt||v.minFilter!==tr&&v.minFilter!==Yn||v.type===ln&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");i.texParameterf(S,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function j(S,v){let N=!1;S.__webglInit===void 0&&(S.__webglInit=!0,v.addEventListener("dispose",w));const $=v.source;let J=m.get($);J===void 0&&(J={},m.set($,J));const ee=O(v);if(ee!==S.__cacheKey){J[ee]===void 0&&(J[ee]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),J[ee].usedTimes++;const oe=J[S.__cacheKey];oe!==void 0&&(J[S.__cacheKey].usedTimes--,oe.usedTimes===0&&F(v)),S.__cacheKey=ee,S.__webglTexture=J[ee].texture}return N}function fe(S,v,N){return Math.floor(Math.floor(S/N)/v)}function re(S,v,N,$){const ee=S.updateRanges;if(ee.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,N,$,v.data);else{ee.sort((ge,se)=>ge.start-se.start);let oe=0;for(let ge=1;ge<ee.length;ge++){const se=ee[oe],te=ee[ge],Ce=se.start+se.count,Ue=fe(te.start,v.width,4),$e=fe(se.start,v.width,4);te.start<=Ce+1&&Ue===$e&&fe(te.start+te.count-1,v.width,4)===Ue?se.count=Math.max(se.count,te.start+te.count-se.start):(++oe,ee[oe]=te)}ee.length=oe+1;const G=t.getParameter(i.UNPACK_ROW_LENGTH),q=t.getParameter(i.UNPACK_SKIP_PIXELS),he=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let ge=0,se=ee.length;ge<se;ge++){const te=ee[ge],Ce=Math.floor(te.start/4),Ue=Math.ceil(te.count/4),$e=Ce%v.width,R=Math.floor(Ce/v.width),ne=Ue,X=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,$e),t.pixelStorei(i.UNPACK_SKIP_ROWS,R),t.texSubImage2D(i.TEXTURE_2D,0,$e,R,ne,X,N,$,v.data)}S.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,G),t.pixelStorei(i.UNPACK_SKIP_PIXELS,q),t.pixelStorei(i.UNPACK_SKIP_ROWS,he)}}function Ee(S,v,N){let $=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&($=i.TEXTURE_3D);const J=j(S,v),ee=v.source;t.bindTexture($,S.__webglTexture,i.TEXTURE0+N);const oe=n.get(ee);if(ee.version!==oe.__version||J===!0){if(t.activeTexture(i.TEXTURE0+N),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const X=He.getPrimaries(He.workingColorSpace),pe=v.colorSpace===Fn?null:He.getPrimaries(v.colorSpace),ae=v.colorSpace===Fn||X===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let q=h(v.image,!1,r.maxTextureSize);q=le(v,q);const he=s.convert(v.format,v.colorSpace),ge=s.convert(v.type);let se=T(v.internalFormat,he,ge,v.normalized,v.colorSpace,v.isVideoTexture);Ie($,v);let te;const Ce=v.mipmaps,Ue=v.isVideoTexture!==!0,$e=oe.__version===void 0||J===!0,R=ee.dataReady,ne=A(v,q);if(v.isDepthTexture)se=L(v.format===jn,v.type),$e&&(Ue?t.texStorage2D(i.TEXTURE_2D,1,se,q.width,q.height):t.texImage2D(i.TEXTURE_2D,0,se,q.width,q.height,0,he,ge,null));else if(v.isDataTexture)if(Ce.length>0){Ue&&$e&&t.texStorage2D(i.TEXTURE_2D,ne,se,Ce[0].width,Ce[0].height);for(let X=0,pe=Ce.length;X<pe;X++)te=Ce[X],Ue?R&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,te.width,te.height,he,ge,te.data):t.texImage2D(i.TEXTURE_2D,X,se,te.width,te.height,0,he,ge,te.data);v.generateMipmaps=!1}else Ue?($e&&t.texStorage2D(i.TEXTURE_2D,ne,se,q.width,q.height),R&&re(v,q,he,ge)):t.texImage2D(i.TEXTURE_2D,0,se,q.width,q.height,0,he,ge,q.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ue&&$e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ne,se,Ce[0].width,Ce[0].height,q.depth);for(let X=0,pe=Ce.length;X<pe;X++)if(te=Ce[X],v.format!==Zt)if(he!==null)if(Ue){if(R)if(v.layerUpdates.size>0){const ae=il(te.width,te.height,v.format,v.type);for(const Z of v.layerUpdates){const ye=te.data.subarray(Z*ae/te.data.BYTES_PER_ELEMENT,(Z+1)*ae/te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,Z,te.width,te.height,1,he,ye)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,te.width,te.height,q.depth,he,te.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,X,se,te.width,te.height,q.depth,0,te.data,0,0);else Te("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?R&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,te.width,te.height,q.depth,he,ge,te.data):t.texImage3D(i.TEXTURE_2D_ARRAY,X,se,te.width,te.height,q.depth,0,he,ge,te.data)}else{Ue&&$e&&t.texStorage2D(i.TEXTURE_2D,ne,se,Ce[0].width,Ce[0].height);for(let X=0,pe=Ce.length;X<pe;X++)te=Ce[X],v.format!==Zt?he!==null?Ue?R&&t.compressedTexSubImage2D(i.TEXTURE_2D,X,0,0,te.width,te.height,he,te.data):t.compressedTexImage2D(i.TEXTURE_2D,X,se,te.width,te.height,0,te.data):Te("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?R&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,te.width,te.height,he,ge,te.data):t.texImage2D(i.TEXTURE_2D,X,se,te.width,te.height,0,he,ge,te.data)}else if(v.isDataArrayTexture)if(Ue){if($e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ne,se,q.width,q.height,q.depth),R)if(v.layerUpdates.size>0){const X=il(q.width,q.height,v.format,v.type);for(const pe of v.layerUpdates){const ae=q.data.subarray(pe*X/q.data.BYTES_PER_ELEMENT,(pe+1)*X/q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,pe,q.width,q.height,1,he,ge,ae)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,q.width,q.height,q.depth,he,ge,q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,se,q.width,q.height,q.depth,0,he,ge,q.data);else if(v.isData3DTexture)Ue?($e&&t.texStorage3D(i.TEXTURE_3D,ne,se,q.width,q.height,q.depth),R&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,q.width,q.height,q.depth,he,ge,q.data)):t.texImage3D(i.TEXTURE_3D,0,se,q.width,q.height,q.depth,0,he,ge,q.data);else if(v.isFramebufferTexture){if($e)if(Ue)t.texStorage2D(i.TEXTURE_2D,ne,se,q.width,q.height);else{let X=q.width,pe=q.height;for(let ae=0;ae<ne;ae++)t.texImage2D(i.TEXTURE_2D,ae,se,X,pe,0,he,ge,null),X>>=1,pe>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){const X=i.canvas;if(X.hasAttribute("layoutsubtree")||X.setAttribute("layoutsubtree","true"),q.parentNode!==X){X.appendChild(q),f.add(v),X.onpaint=Le=>{const ft=Le.changedElements;for(const Ze of f)ft.includes(Ze.image)&&(Ze.needsUpdate=!0)},X.requestPaint();return}const pe=0,ae=i.RGBA,Z=i.RGBA,ye=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,pe,ae,Z,ye,q),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ce.length>0){if(Ue&&$e){const X=ct(Ce[0]);t.texStorage2D(i.TEXTURE_2D,ne,se,X.width,X.height)}for(let X=0,pe=Ce.length;X<pe;X++)te=Ce[X],Ue?R&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,he,ge,te):t.texImage2D(i.TEXTURE_2D,X,se,he,ge,te);v.generateMipmaps=!1}else if(Ue){if($e){const X=ct(q);t.texStorage2D(i.TEXTURE_2D,ne,se,X.width,X.height)}R&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he,ge,q)}else t.texImage2D(i.TEXTURE_2D,0,se,he,ge,q);p(v)&&b($),oe.__version=ee.version,v.onUpdate&&v.onUpdate(v)}S.__version=v.version}function Re(S,v,N){if(v.image.length!==6)return;const $=j(S,v),J=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+N);const ee=n.get(J);if(J.version!==ee.__version||$===!0){t.activeTexture(i.TEXTURE0+N);const oe=He.getPrimaries(He.workingColorSpace),G=v.colorSpace===Fn?null:He.getPrimaries(v.colorSpace),q=v.colorSpace===Fn||oe===G?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,q);const he=v.isCompressedTexture||v.image[0].isCompressedTexture,ge=v.image[0]&&v.image[0].isDataTexture,se=[];for(let Z=0;Z<6;Z++)!he&&!ge?se[Z]=h(v.image[Z],!0,r.maxCubemapSize):se[Z]=ge?v.image[Z].image:v.image[Z],se[Z]=le(v,se[Z]);const te=se[0],Ce=s.convert(v.format,v.colorSpace),Ue=s.convert(v.type),$e=T(v.internalFormat,Ce,Ue,v.normalized,v.colorSpace),R=v.isVideoTexture!==!0,ne=ee.__version===void 0||$===!0,X=J.dataReady;let pe=A(v,te);Ie(i.TEXTURE_CUBE_MAP,v);let ae;if(he){R&&ne&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,$e,te.width,te.height);for(let Z=0;Z<6;Z++){ae=se[Z].mipmaps;for(let ye=0;ye<ae.length;ye++){const Le=ae[ye];v.format!==Zt?Ce!==null?R?X&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ye,0,0,Le.width,Le.height,Ce,Le.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ye,$e,Le.width,Le.height,0,Le.data):Te("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?X&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ye,0,0,Le.width,Le.height,Ce,Ue,Le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ye,$e,Le.width,Le.height,0,Ce,Ue,Le.data)}}}else{if(ae=v.mipmaps,R&&ne){ae.length>0&&pe++;const Z=ct(se[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,$e,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(ge){R?X&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,se[Z].width,se[Z].height,Ce,Ue,se[Z].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,$e,se[Z].width,se[Z].height,0,Ce,Ue,se[Z].data);for(let ye=0;ye<ae.length;ye++){const ft=ae[ye].image[Z].image;R?X&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ye+1,0,0,ft.width,ft.height,Ce,Ue,ft.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ye+1,$e,ft.width,ft.height,0,Ce,Ue,ft.data)}}else{R?X&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Ce,Ue,se[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,$e,Ce,Ue,se[Z]);for(let ye=0;ye<ae.length;ye++){const Le=ae[ye];R?X&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ye+1,0,0,Ce,Ue,Le.image[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ye+1,$e,Ce,Ue,Le.image[Z])}}}p(v)&&b(i.TEXTURE_CUBE_MAP),ee.__version=J.version,v.onUpdate&&v.onUpdate(v)}S.__version=v.version}function Ae(S,v,N,$,J,ee){const oe=s.convert(N.format,N.colorSpace),G=s.convert(N.type),q=T(N.internalFormat,oe,G,N.normalized,N.colorSpace),he=n.get(v),ge=n.get(N);if(ge.__renderTarget=v,!he.__hasExternalTextures){const se=Math.max(1,v.width>>ee),te=Math.max(1,v.height>>ee);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?t.texImage3D(J,ee,q,se,te,v.depth,0,oe,G,null):t.texImage2D(J,ee,q,se,te,0,oe,G,null)}t.bindFramebuffer(i.FRAMEBUFFER,S),Ve(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,J,ge.__webglTexture,0,yt(v)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,J,ge.__webglTexture,ee),t.bindFramebuffer(i.FRAMEBUFFER,null)}function at(S,v,N){if(i.bindRenderbuffer(i.RENDERBUFFER,S),v.depthBuffer){const $=v.depthTexture,J=$&&$.isDepthTexture?$.type:null,ee=L(v.stencilBuffer,J),oe=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ve(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt(v),ee,v.width,v.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt(v),ee,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ee,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,S)}else{const $=v.textures;for(let J=0;J<$.length;J++){const ee=$[J],oe=s.convert(ee.format,ee.colorSpace),G=s.convert(ee.type),q=T(ee.internalFormat,oe,G,ee.normalized,ee.colorSpace);Ve(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt(v),q,v.width,v.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt(v),q,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,q,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ze(S,v,N){const $=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,S),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(v.depthTexture);if(J.__renderTarget=v,(!J.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),$){if(J.__webglInit===void 0&&(J.__webglInit=!0,v.depthTexture.addEventListener("dispose",w)),J.__webglTexture===void 0){J.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),Ie(i.TEXTURE_CUBE_MAP,v.depthTexture);const he=s.convert(v.depthTexture.format),ge=s.convert(v.depthTexture.type);let se;v.depthTexture.format===Tn?se=i.DEPTH_COMPONENT24:v.depthTexture.format===jn&&(se=i.DEPTH24_STENCIL8);for(let te=0;te<6;te++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,se,v.width,v.height,0,he,ge,null)}}else K(v.depthTexture,0);const ee=J.__webglTexture,oe=yt(v),G=$?i.TEXTURE_CUBE_MAP_POSITIVE_X+N:i.TEXTURE_2D,q=v.depthTexture.format===jn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===Tn)Ve(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,G,ee,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,q,G,ee,0);else if(v.depthTexture.format===jn)Ve(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,G,ee,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,q,G,ee,0);else throw new Error("Unknown depthTexture format")}function Ke(S){const v=n.get(S),N=S.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==S.depthTexture){const $=S.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),$){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,$.removeEventListener("dispose",J)};$.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=$}if(S.depthTexture&&!v.__autoAllocateDepthBuffer)if(N)for(let $=0;$<6;$++)ze(v.__webglFramebuffer[$],S,$);else{const $=S.texture.mipmaps;$&&$.length>0?ze(v.__webglFramebuffer[0],S,0):ze(v.__webglFramebuffer,S,0)}else if(N){v.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[$]),v.__webglDepthbuffer[$]===void 0)v.__webglDepthbuffer[$]=i.createRenderbuffer(),at(v.__webglDepthbuffer[$],S,!1);else{const J=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=v.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,ee)}}else{const $=S.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),at(v.__webglDepthbuffer,S,!1);else{const J=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,ee)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function rt(S,v,N){const $=n.get(S);v!==void 0&&Ae($.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Ke(S)}function Be(S){const v=S.texture,N=n.get(S),$=n.get(v);S.addEventListener("dispose",_);const J=S.textures,ee=S.isWebGLCubeRenderTarget===!0,oe=J.length>1;if(oe||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=v.version,a.memory.textures++),ee){N.__webglFramebuffer=[];for(let G=0;G<6;G++)if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[G]=[];for(let q=0;q<v.mipmaps.length;q++)N.__webglFramebuffer[G][q]=i.createFramebuffer()}else N.__webglFramebuffer[G]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let G=0;G<v.mipmaps.length;G++)N.__webglFramebuffer[G]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(oe)for(let G=0,q=J.length;G<q;G++){const he=n.get(J[G]);he.__webglTexture===void 0&&(he.__webglTexture=i.createTexture(),a.memory.textures++)}if(S.samples>0&&Ve(S)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let G=0;G<J.length;G++){const q=J[G];N.__webglColorRenderbuffer[G]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[G]);const he=s.convert(q.format,q.colorSpace),ge=s.convert(q.type),se=T(q.internalFormat,he,ge,q.normalized,q.colorSpace,S.isXRRenderTarget===!0),te=yt(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,te,se,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+G,i.RENDERBUFFER,N.__webglColorRenderbuffer[G])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),at(N.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ee){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Ie(i.TEXTURE_CUBE_MAP,v);for(let G=0;G<6;G++)if(v.mipmaps&&v.mipmaps.length>0)for(let q=0;q<v.mipmaps.length;q++)Ae(N.__webglFramebuffer[G][q],S,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+G,q);else Ae(N.__webglFramebuffer[G],S,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+G,0);p(v)&&b(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let G=0,q=J.length;G<q;G++){const he=J[G],ge=n.get(he);let se=i.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(se=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,ge.__webglTexture),Ie(se,he),Ae(N.__webglFramebuffer,S,he,i.COLOR_ATTACHMENT0+G,se,0),p(he)&&b(se)}t.unbindTexture()}else{let G=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(G=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(G,$.__webglTexture),Ie(G,v),v.mipmaps&&v.mipmaps.length>0)for(let q=0;q<v.mipmaps.length;q++)Ae(N.__webglFramebuffer[q],S,v,i.COLOR_ATTACHMENT0,G,q);else Ae(N.__webglFramebuffer,S,v,i.COLOR_ATTACHMENT0,G,0);p(v)&&b(G),t.unbindTexture()}S.depthBuffer&&Ke(S)}function xt(S){const v=S.textures;for(let N=0,$=v.length;N<$;N++){const J=v[N];if(p(J)){const ee=M(S),oe=n.get(J).__webglTexture;t.bindTexture(ee,oe),b(ee),t.unbindTexture()}}}const ot=[],Nt=[];function P(S){if(S.samples>0){if(Ve(S)===!1){const v=S.textures,N=S.width,$=S.height;let J=i.COLOR_BUFFER_BIT;const ee=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(S),G=v.length>1;if(G)for(let he=0;he<v.length;he++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);const q=S.texture.mipmaps;q&&q.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let he=0;he<v.length;he++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),G){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[he]);const ge=n.get(v[he]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ge,0)}i.blitFramebuffer(0,0,N,$,0,0,N,$,J,i.NEAREST),l===!0&&(ot.length=0,Nt.length=0,ot.push(i.COLOR_ATTACHMENT0+he),S.depthBuffer&&S.resolveDepthBuffer===!1&&(ot.push(ee),Nt.push(ee),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Nt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ot))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),G)for(let he=0;he<v.length;he++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,oe.__webglColorRenderbuffer[he]);const ge=n.get(v[he]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,ge,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.resolveDepthBuffer===!1&&l){const v=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function yt(S){return Math.min(r.maxSamples,S.samples)}function Ve(S){const v=n.get(S);return S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function nt(S){const v=a.render.frame;u.get(S)!==v&&(u.set(S,v),S.update())}function le(S,v){const N=S.colorSpace,$=S.format,J=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||N!==Wr&&N!==Fn&&(He.getTransfer(N)===Ye?($!==Zt||J!==zt)&&Te("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ke("WebGLTextures: Unsupported texture color space:",N)),v}function ct(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=W,this.getTextureUnits=Y,this.setTextureUnits=I,this.setTexture2D=K,this.setTexture2DArray=Q,this.setTexture3D=ie,this.setTextureCube=_e,this.rebindTextures=rt,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=xt,this.updateMultisampleRenderTarget=P,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=Ve,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function tg(i,e){function t(n,r=Fn){let s;const a=He.getTransfer(r);if(n===zt)return i.UNSIGNED_BYTE;if(n===Wa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Xa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===$l)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ql)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Wl)return i.BYTE;if(n===Xl)return i.SHORT;if(n===ji)return i.UNSIGNED_SHORT;if(n===Ga)return i.INT;if(n===fn)return i.UNSIGNED_INT;if(n===ln)return i.FLOAT;if(n===En)return i.HALF_FLOAT;if(n===Yl)return i.ALPHA;if(n===jl)return i.RGB;if(n===Zt)return i.RGBA;if(n===Tn)return i.DEPTH_COMPONENT;if(n===jn)return i.DEPTH_STENCIL;if(n===Kl)return i.RED;if(n===$a)return i.RED_INTEGER;if(n===Zn)return i.RG;if(n===qa)return i.RG_INTEGER;if(n===Ya)return i.RGBA_INTEGER;if(n===Nr||n===Fr||n===Or||n===Br)if(a===Ye)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Nr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Fr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Or)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Br)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Nr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Fr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Or)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Br)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ia||n===ra||n===sa||n===aa)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ia)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ra)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===sa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===aa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===oa||n===la||n===ca||n===da||n===ua||n===Hr||n===fa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===oa||n===la)return a===Ye?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ca)return a===Ye?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===da)return s.COMPRESSED_R11_EAC;if(n===ua)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Hr)return s.COMPRESSED_RG11_EAC;if(n===fa)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ha||n===pa||n===ma||n===ga||n===va||n===_a||n===xa||n===ya||n===ba||n===Sa||n===Ma||n===Ea||n===Ta||n===Aa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ha)return a===Ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===pa)return a===Ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ma)return a===Ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ga)return a===Ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===va)return a===Ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_a)return a===Ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===xa)return a===Ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ya)return a===Ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ba)return a===Ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Sa)return a===Ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ma)return a===Ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ea)return a===Ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ta)return a===Ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Aa)return a===Ye?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===wa||n===Ca||n===Ra)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===wa)return a===Ye?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ca)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ra)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Pa||n===La||n===Gr||n===Da)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Pa)return s.COMPRESSED_RED_RGTC1_EXT;if(n===La)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Gr)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Da)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ki?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const ng=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ig=`
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

}`;class rg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new ac(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new hn({vertexShader:ng,fragmentShader:ig,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Qt(new Ci(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sg extends ti{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,d=null,m=null,g=null;const y=typeof XRWebGLBinding<"u",h=new rg,p={},b=t.getContextAttributes();let M=null,T=null;const L=[],A=[],w=new Oe;let _=null;const E=new Wt;E.viewport=new ut;const F=new Wt;F.viewport=new ut;const C=[E,F],B=new hu;let W=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let fe=L[j];return fe===void 0&&(fe=new vs,L[j]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function(j){let fe=L[j];return fe===void 0&&(fe=new vs,L[j]=fe),fe.getGripSpace()},this.getHand=function(j){let fe=L[j];return fe===void 0&&(fe=new vs,L[j]=fe),fe.getHandSpace()};function I(j){const fe=A.indexOf(j.inputSource);if(fe===-1)return;const re=L[fe];re!==void 0&&(re.update(j.inputSource,j.frame,c||a),re.dispatchEvent({type:j.type,data:j.inputSource}))}function H(){r.removeEventListener("select",I),r.removeEventListener("selectstart",I),r.removeEventListener("selectend",I),r.removeEventListener("squeeze",I),r.removeEventListener("squeezestart",I),r.removeEventListener("squeezeend",I),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",O);for(let j=0;j<L.length;j++){const fe=A[j];fe!==null&&(A[j]=null,L[j].disconnect(fe))}W=null,Y=null,h.reset();for(const j in p)delete p[j];e.setRenderTarget(M),m=null,d=null,f=null,r=null,T=null,Ie.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,n.isPresenting===!0&&Te("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&Te("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return f===null&&y&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",I),r.addEventListener("selectstart",I),r.addEventListener("selectend",I),r.addEventListener("squeeze",I),r.addEventListener("squeezestart",I),r.addEventListener("squeezeend",I),r.addEventListener("end",H),r.addEventListener("inputsourceschange",O),b.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(w),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Ee=null,Re=null;b.depth&&(Re=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=b.stencil?jn:Tn,Ee=b.stencil?Ki:fn);const Ae={colorFormat:t.RGBA8,depthFormat:Re,scaleFactor:s};f=this.getBinding(),d=f.createProjectionLayer(Ae),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new un(d.textureWidth,d.textureHeight,{format:Zt,type:zt,depthTexture:new wi(d.textureWidth,d.textureHeight,Ee,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const re={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,re),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),T=new un(m.framebufferWidth,m.framebufferHeight,{format:Zt,type:zt,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Ie.setContext(r),Ie.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function O(j){for(let fe=0;fe<j.removed.length;fe++){const re=j.removed[fe],Ee=A.indexOf(re);Ee>=0&&(A[Ee]=null,L[Ee].disconnect(re))}for(let fe=0;fe<j.added.length;fe++){const re=j.added[fe];let Ee=A.indexOf(re);if(Ee===-1){for(let Ae=0;Ae<L.length;Ae++)if(Ae>=A.length){A.push(re),Ee=Ae;break}else if(A[Ae]===null){A[Ae]=re,Ee=Ae;break}if(Ee===-1)break}const Re=L[Ee];Re&&Re.connect(re)}}const K=new U,Q=new U;function ie(j,fe,re){K.setFromMatrixPosition(fe.matrixWorld),Q.setFromMatrixPosition(re.matrixWorld);const Ee=K.distanceTo(Q),Re=fe.projectionMatrix.elements,Ae=re.projectionMatrix.elements,at=Re[14]/(Re[10]-1),ze=Re[14]/(Re[10]+1),Ke=(Re[9]+1)/Re[5],rt=(Re[9]-1)/Re[5],Be=(Re[8]-1)/Re[0],xt=(Ae[8]+1)/Ae[0],ot=at*Be,Nt=at*xt,P=Ee/(-Be+xt),yt=P*-Be;if(fe.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(yt),j.translateZ(P),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Re[10]===-1)j.projectionMatrix.copy(fe.projectionMatrix),j.projectionMatrixInverse.copy(fe.projectionMatrixInverse);else{const Ve=at+P,nt=ze+P,le=ot-yt,ct=Nt+(Ee-yt),S=Ke*ze/nt*Ve,v=rt*ze/nt*Ve;j.projectionMatrix.makePerspective(le,ct,S,v,Ve,nt),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function _e(j,fe){fe===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(fe.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let fe=j.near,re=j.far;h.texture!==null&&(h.depthNear>0&&(fe=h.depthNear),h.depthFar>0&&(re=h.depthFar)),B.near=F.near=E.near=fe,B.far=F.far=E.far=re,(W!==B.near||Y!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),W=B.near,Y=B.far),B.layers.mask=j.layers.mask|6,E.layers.mask=B.layers.mask&-5,F.layers.mask=B.layers.mask&-3;const Ee=j.parent,Re=B.cameras;_e(B,Ee);for(let Ae=0;Ae<Re.length;Ae++)_e(Re[Ae],Ee);Re.length===2?ie(B,E,F):B.projectionMatrix.copy(E.projectionMatrix),Se(j,B,Ee)};function Se(j,fe,re){re===null?j.matrix.copy(fe.matrixWorld):(j.matrix.copy(re.matrixWorld),j.matrix.invert(),j.matrix.multiply(fe.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(fe.projectionMatrix),j.projectionMatrixInverse.copy(fe.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Na*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=j)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(B)},this.getCameraTexture=function(j){return p[j]};let We=null;function je(j,fe){if(u=fe.getViewerPose(c||a),g=fe,u!==null){const re=u.views;m!==null&&(e.setRenderTargetFramebuffer(T,m.framebuffer),e.setRenderTarget(T));let Ee=!1;re.length!==B.cameras.length&&(B.cameras.length=0,Ee=!0);for(let ze=0;ze<re.length;ze++){const Ke=re[ze];let rt=null;if(m!==null)rt=m.getViewport(Ke);else{const xt=f.getViewSubImage(d,Ke);rt=xt.viewport,ze===0&&(e.setRenderTargetTextures(T,xt.colorTexture,xt.depthStencilTexture),e.setRenderTarget(T))}let Be=C[ze];Be===void 0&&(Be=new Wt,Be.layers.enable(ze),Be.viewport=new ut,C[ze]=Be),Be.matrix.fromArray(Ke.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(Ke.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(rt.x,rt.y,rt.width,rt.height),ze===0&&(B.matrix.copy(Be.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ee===!0&&B.cameras.push(Be)}const Re=r.enabledFeatures;if(Re&&Re.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){f=n.getBinding();const ze=f.getDepthInformation(re[0]);ze&&ze.isValid&&ze.texture&&h.init(ze,r.renderState)}if(Re&&Re.includes("camera-access")&&y){e.state.unbindTexture(),f=n.getBinding();for(let ze=0;ze<re.length;ze++){const Ke=re[ze].camera;if(Ke){let rt=p[Ke];rt||(rt=new ac,p[Ke]=rt);const Be=f.getCameraImage(Ke);rt.sourceTexture=Be}}}}for(let re=0;re<L.length;re++){const Ee=A[re],Re=L[re];Ee!==null&&Re!==void 0&&Re.update(Ee,fe,c||a)}We&&We(j,fe),fe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:fe}),g=null}const Ie=new dc;Ie.setAnimationLoop(je),this.setAnimationLoop=function(j){We=j},this.dispose=function(){}}}const ag=new st,vc=new Pe;vc.set(-1,0,0,0,1,0,0,0,1);function og(i,e){function t(h,p){h.matrixAutoUpdate===!0&&h.updateMatrix(),p.value.copy(h.matrix)}function n(h,p){p.color.getRGB(h.fogColor.value,oc(i)),p.isFog?(h.fogNear.value=p.near,h.fogFar.value=p.far):p.isFogExp2&&(h.fogDensity.value=p.density)}function r(h,p,b,M,T){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(h,p):p.isMeshLambertMaterial?(s(h,p),p.envMap&&(h.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(h,p),f(h,p)):p.isMeshPhongMaterial?(s(h,p),u(h,p),p.envMap&&(h.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(h,p),d(h,p),p.isMeshPhysicalMaterial&&m(h,p,T)):p.isMeshMatcapMaterial?(s(h,p),g(h,p)):p.isMeshDepthMaterial?s(h,p):p.isMeshDistanceMaterial?(s(h,p),y(h,p)):p.isMeshNormalMaterial?s(h,p):p.isLineBasicMaterial?(a(h,p),p.isLineDashedMaterial&&o(h,p)):p.isPointsMaterial?l(h,p,b,M):p.isSpriteMaterial?c(h,p):p.isShadowMaterial?(h.color.value.copy(p.color),h.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(h,p){h.opacity.value=p.opacity,p.color&&h.diffuse.value.copy(p.color),p.emissive&&h.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(h.map.value=p.map,t(p.map,h.mapTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.bumpMap&&(h.bumpMap.value=p.bumpMap,t(p.bumpMap,h.bumpMapTransform),h.bumpScale.value=p.bumpScale,p.side===Ut&&(h.bumpScale.value*=-1)),p.normalMap&&(h.normalMap.value=p.normalMap,t(p.normalMap,h.normalMapTransform),h.normalScale.value.copy(p.normalScale),p.side===Ut&&h.normalScale.value.negate()),p.displacementMap&&(h.displacementMap.value=p.displacementMap,t(p.displacementMap,h.displacementMapTransform),h.displacementScale.value=p.displacementScale,h.displacementBias.value=p.displacementBias),p.emissiveMap&&(h.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,h.emissiveMapTransform)),p.specularMap&&(h.specularMap.value=p.specularMap,t(p.specularMap,h.specularMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest);const b=e.get(p),M=b.envMap,T=b.envMapRotation;M&&(h.envMap.value=M,h.envMapRotation.value.setFromMatrix4(ag.makeRotationFromEuler(T)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&h.envMapRotation.value.premultiply(vc),h.reflectivity.value=p.reflectivity,h.ior.value=p.ior,h.refractionRatio.value=p.refractionRatio),p.lightMap&&(h.lightMap.value=p.lightMap,h.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,h.lightMapTransform)),p.aoMap&&(h.aoMap.value=p.aoMap,h.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,h.aoMapTransform))}function a(h,p){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,p.map&&(h.map.value=p.map,t(p.map,h.mapTransform))}function o(h,p){h.dashSize.value=p.dashSize,h.totalSize.value=p.dashSize+p.gapSize,h.scale.value=p.scale}function l(h,p,b,M){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,h.size.value=p.size*b,h.scale.value=M*.5,p.map&&(h.map.value=p.map,t(p.map,h.uvTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest)}function c(h,p){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,h.rotation.value=p.rotation,p.map&&(h.map.value=p.map,t(p.map,h.mapTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,t(p.alphaMap,h.alphaMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest)}function u(h,p){h.specular.value.copy(p.specular),h.shininess.value=Math.max(p.shininess,1e-4)}function f(h,p){p.gradientMap&&(h.gradientMap.value=p.gradientMap)}function d(h,p){h.metalness.value=p.metalness,p.metalnessMap&&(h.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,h.metalnessMapTransform)),h.roughness.value=p.roughness,p.roughnessMap&&(h.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,h.roughnessMapTransform)),p.envMap&&(h.envMapIntensity.value=p.envMapIntensity)}function m(h,p,b){h.ior.value=p.ior,p.sheen>0&&(h.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),h.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(h.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,h.sheenColorMapTransform)),p.sheenRoughnessMap&&(h.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,h.sheenRoughnessMapTransform))),p.clearcoat>0&&(h.clearcoat.value=p.clearcoat,h.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(h.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,h.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(h.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,h.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(h.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,h.clearcoatNormalMapTransform),h.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ut&&h.clearcoatNormalScale.value.negate())),p.dispersion>0&&(h.dispersion.value=p.dispersion),p.iridescence>0&&(h.iridescence.value=p.iridescence,h.iridescenceIOR.value=p.iridescenceIOR,h.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],h.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(h.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,h.iridescenceMapTransform)),p.iridescenceThicknessMap&&(h.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,h.iridescenceThicknessMapTransform))),p.transmission>0&&(h.transmission.value=p.transmission,h.transmissionSamplerMap.value=b.texture,h.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(h.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,h.transmissionMapTransform)),h.thickness.value=p.thickness,p.thicknessMap&&(h.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,h.thicknessMapTransform)),h.attenuationDistance.value=p.attenuationDistance,h.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(h.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(h.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,h.anisotropyMapTransform))),h.specularIntensity.value=p.specularIntensity,h.specularColor.value.copy(p.specularColor),p.specularColorMap&&(h.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,h.specularColorMapTransform)),p.specularIntensityMap&&(h.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,h.specularIntensityMapTransform))}function g(h,p){p.matcap&&(h.matcap.value=p.matcap)}function y(h,p){const b=e.get(p).light;h.referencePosition.value.setFromMatrixPosition(b.matrixWorld),h.nearDistance.value=b.shadow.camera.near,h.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function lg(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,M){const T=M.program;n.uniformBlockBinding(b,T)}function c(b,M){let T=r[b.id];T===void 0&&(g(b),T=u(b),r[b.id]=T,b.addEventListener("dispose",h));const L=M.program;n.updateUBOMapping(b,L);const A=e.render.frame;s[b.id]!==A&&(d(b),s[b.id]=A)}function u(b){const M=f();b.__bindingPointIndex=M;const T=i.createBuffer(),L=b.__size,A=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,L,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,T),T}function f(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return ke("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const M=r[b.id],T=b.uniforms,L=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let A=0,w=T.length;A<w;A++){const _=Array.isArray(T[A])?T[A]:[T[A]];for(let E=0,F=_.length;E<F;E++){const C=_[E];if(m(C,A,E,L)===!0){const B=C.__offset,W=Array.isArray(C.value)?C.value:[C.value];let Y=0;for(let I=0;I<W.length;I++){const H=W[I],O=y(H);typeof H=="number"||typeof H=="boolean"?(C.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,B+Y,C.__data)):H.isMatrix3?(C.__data[0]=H.elements[0],C.__data[1]=H.elements[1],C.__data[2]=H.elements[2],C.__data[3]=0,C.__data[4]=H.elements[3],C.__data[5]=H.elements[4],C.__data[6]=H.elements[5],C.__data[7]=0,C.__data[8]=H.elements[6],C.__data[9]=H.elements[7],C.__data[10]=H.elements[8],C.__data[11]=0):ArrayBuffer.isView(H)?C.__data.set(new H.constructor(H.buffer,H.byteOffset,C.__data.length)):(H.toArray(C.__data,Y),Y+=O.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(b,M,T,L){const A=b.value,w=M+"_"+T;if(L[w]===void 0)return typeof A=="number"||typeof A=="boolean"?L[w]=A:ArrayBuffer.isView(A)?L[w]=A.slice():L[w]=A.clone(),!0;{const _=L[w];if(typeof A=="number"||typeof A=="boolean"){if(_!==A)return L[w]=A,!0}else{if(ArrayBuffer.isView(A))return!0;if(_.equals(A)===!1)return _.copy(A),!0}}return!1}function g(b){const M=b.uniforms;let T=0;const L=16;for(let w=0,_=M.length;w<_;w++){const E=Array.isArray(M[w])?M[w]:[M[w]];for(let F=0,C=E.length;F<C;F++){const B=E[F],W=Array.isArray(B.value)?B.value:[B.value];for(let Y=0,I=W.length;Y<I;Y++){const H=W[Y],O=y(H),K=T%L,Q=K%O.boundary,ie=K+Q;T+=Q,ie!==0&&L-ie<O.storage&&(T+=L-ie),B.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=T,T+=O.storage}}}const A=T%L;return A>0&&(T+=L-A),b.__size=T,b.__cache={},this}function y(b){const M={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(M.boundary=4,M.storage=4):b.isVector2?(M.boundary=8,M.storage=8):b.isVector3||b.isColor?(M.boundary=16,M.storage=12):b.isVector4?(M.boundary=16,M.storage=16):b.isMatrix3?(M.boundary=48,M.storage=48):b.isMatrix4?(M.boundary=64,M.storage=64):b.isTexture?Te("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(M.boundary=16,M.storage=b.byteLength):Te("WebGLRenderer: Unsupported uniform value type.",b),M}function h(b){const M=b.target;M.removeEventListener("dispose",h);const T=a.indexOf(M.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function p(){for(const b in r)i.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:l,update:c,dispose:p}}const cg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let rn=null;function dg(){return rn===null&&(rn=new rc(cg,16,16,Zn,En),rn.name="DFG_LUT",rn.minFilter=Pt,rn.magFilter=Pt,rn.wrapS=yn,rn.wrapT=yn,rn.generateMipmaps=!1,rn.needsUpdate=!0),rn}class ug{constructor(e={}){const{canvas:t=Ed(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:m=zt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const y=m,h=new Set([Ya,qa,$a]),p=new Set([zt,fn,ji,Ki,Wa,Xa]),b=new Uint32Array(4),M=new Int32Array(4),T=new U;let L=null,A=null;const w=[],_=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=dn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const F=this;let C=!1,B=null;this._outputColorSpace=Gt;let W=0,Y=0,I=null,H=-1,O=null;const K=new ut,Q=new ut;let ie=null;const _e=new qe(0);let Se=0,We=t.width,je=t.height,Ie=1,j=null,fe=null;const re=new ut(0,0,We,je),Ee=new ut(0,0,We,je);let Re=!1;const Ae=new eo;let at=!1,ze=!1;const Ke=new st,rt=new U,Be=new ut,xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ot=!1;function Nt(){return I===null?Ie:1}let P=n;function yt(x,D){return t.getContext(x,D)}try{const x={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ha}`),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",Le,!1),P===null){const D="webgl2";if(P=yt(D,x),P===null)throw yt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw ke("WebGLRenderer: "+x.message),x}let Ve,nt,le,ct,S,v,N,$,J,ee,oe,G,q,he,ge,se,te,Ce,Ue,$e,R,ne,X;function pe(){Ve=new dp(P),Ve.init(),R=new tg(P,Ve),nt=new np(P,Ve,e,R),le=new Qm(P,Ve),nt.reversedDepthBuffer&&d&&le.buffers.depth.setReversed(!0),ct=new hp(P),S=new zm,v=new eg(P,Ve,le,S,nt,R,ct),N=new cp(F),$=new gu(P),ne=new ep(P,$),J=new up(P,$,ct,ne),ee=new mp(P,J,$,ne,ct),Ce=new pp(P,nt,v),ge=new ip(S),oe=new Bm(F,N,Ve,nt,ne,ge),G=new og(F,S),q=new km,he=new qm(Ve),te=new Qh(F,N,le,ee,g,l),se=new Jm(F,ee,nt),X=new lg(P,ct,nt,le),Ue=new tp(P,Ve,ct),$e=new fp(P,Ve,ct),ct.programs=oe.programs,F.capabilities=nt,F.extensions=Ve,F.properties=S,F.renderLists=q,F.shadowMap=se,F.state=le,F.info=ct}pe(),y!==zt&&(E=new vp(y,t.width,t.height,r,s));const ae=new sg(F,P);this.xr=ae,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const x=Ve.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Ve.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return Ie},this.setPixelRatio=function(x){x!==void 0&&(Ie=x,this.setSize(We,je,!1))},this.getSize=function(x){return x.set(We,je)},this.setSize=function(x,D,k=!0){if(ae.isPresenting){Te("WebGLRenderer: Can't change size while VR device is presenting.");return}We=x,je=D,t.width=Math.floor(x*Ie),t.height=Math.floor(D*Ie),k===!0&&(t.style.width=x+"px",t.style.height=D+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,x,D)},this.getDrawingBufferSize=function(x){return x.set(We*Ie,je*Ie).floor()},this.setDrawingBufferSize=function(x,D,k){We=x,je=D,Ie=k,t.width=Math.floor(x*k),t.height=Math.floor(D*k),this.setViewport(0,0,x,D)},this.setEffects=function(x){if(y===zt){ke("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let D=0;D<x.length;D++)if(x[D].isOutputPass===!0){Te("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(K)},this.getViewport=function(x){return x.copy(re)},this.setViewport=function(x,D,k,z){x.isVector4?re.set(x.x,x.y,x.z,x.w):re.set(x,D,k,z),le.viewport(K.copy(re).multiplyScalar(Ie).round())},this.getScissor=function(x){return x.copy(Ee)},this.setScissor=function(x,D,k,z){x.isVector4?Ee.set(x.x,x.y,x.z,x.w):Ee.set(x,D,k,z),le.scissor(Q.copy(Ee).multiplyScalar(Ie).round())},this.getScissorTest=function(){return Re},this.setScissorTest=function(x){le.setScissorTest(Re=x)},this.setOpaqueSort=function(x){j=x},this.setTransparentSort=function(x){fe=x},this.getClearColor=function(x){return x.copy(te.getClearColor())},this.setClearColor=function(){te.setClearColor(...arguments)},this.getClearAlpha=function(){return te.getClearAlpha()},this.setClearAlpha=function(){te.setClearAlpha(...arguments)},this.clear=function(x=!0,D=!0,k=!0){let z=0;if(x){let V=!1;if(I!==null){const ue=I.texture.format;V=h.has(ue)}if(V){const ue=I.texture.type,ve=p.has(ue),de=te.getClearColor(),xe=te.getClearAlpha(),be=de.r,De=de.g,Fe=de.b;ve?(b[0]=be,b[1]=De,b[2]=Fe,b[3]=xe,P.clearBufferuiv(P.COLOR,0,b)):(M[0]=be,M[1]=De,M[2]=Fe,M[3]=xe,P.clearBufferiv(P.COLOR,0,M))}else z|=P.COLOR_BUFFER_BIT}D&&(z|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),k&&(z|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&P.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(x){x.setRenderer(this),B=x},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",Le,!1),te.dispose(),q.dispose(),he.dispose(),S.dispose(),N.dispose(),ee.dispose(),ne.dispose(),X.dispose(),oe.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",fo),ae.removeEventListener("sessionend",ho),Vn.stop()};function Z(x){x.preventDefault(),qr("WebGLRenderer: Context Lost."),C=!0}function ye(){qr("WebGLRenderer: Context Restored."),C=!1;const x=ct.autoReset,D=se.enabled,k=se.autoUpdate,z=se.needsUpdate,V=se.type;pe(),ct.autoReset=x,se.enabled=D,se.autoUpdate=k,se.needsUpdate=z,se.type=V}function Le(x){ke("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function ft(x){const D=x.target;D.removeEventListener("dispose",ft),Ze(D)}function Ze(x){pn(x),S.remove(x)}function pn(x){const D=S.get(x).programs;D!==void 0&&(D.forEach(function(k){oe.releaseProgram(k)}),x.isShaderMaterial&&oe.releaseShaderCache(x))}this.renderBufferDirect=function(x,D,k,z,V,ue){D===null&&(D=xt);const ve=V.isMesh&&V.matrixWorld.determinant()<0,de=Oc(x,D,k,z,V);le.setMaterial(z,ve);let xe=k.index,be=1;if(z.wireframe===!0){if(xe=J.getWireframeAttribute(k),xe===void 0)return;be=2}const De=k.drawRange,Fe=k.attributes.position;let Me=De.start*be,Je=(De.start+De.count)*be;ue!==null&&(Me=Math.max(Me,ue.start*be),Je=Math.min(Je,(ue.start+ue.count)*be)),xe!==null?(Me=Math.max(Me,0),Je=Math.min(Je,xe.count)):Fe!=null&&(Me=Math.max(Me,0),Je=Math.min(Je,Fe.count));const ht=Je-Me;if(ht<0||ht===1/0)return;ne.setup(V,z,de,k,xe);let dt,et=Ue;if(xe!==null&&(dt=$.get(xe),et=$e,et.setIndex(dt)),V.isMesh)z.wireframe===!0?(le.setLineWidth(z.wireframeLinewidth*Nt()),et.setMode(P.LINES)):et.setMode(P.TRIANGLES);else if(V.isLine){let At=z.linewidth;At===void 0&&(At=1),le.setLineWidth(At*Nt()),V.isLineSegments?et.setMode(P.LINES):V.isLineLoop?et.setMode(P.LINE_LOOP):et.setMode(P.LINE_STRIP)}else V.isPoints?et.setMode(P.POINTS):V.isSprite&&et.setMode(P.TRIANGLES);if(V.isBatchedMesh)if(Ve.get("WEBGL_multi_draw"))et.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const At=V._multiDrawStarts,me=V._multiDrawCounts,Ft=V._multiDrawCount,Xe=xe?$.get(xe).bytesPerElement:1,kt=S.get(z).currentProgram.getUniforms();for(let tn=0;tn<Ft;tn++)kt.setValue(P,"_gl_DrawID",tn),et.render(At[tn]/Xe,me[tn])}else if(V.isInstancedMesh)et.renderInstances(Me,ht,V.count);else if(k.isInstancedBufferGeometry){const At=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,me=Math.min(k.instanceCount,At);et.renderInstances(Me,ht,me)}else et.render(Me,ht)};function en(x,D,k){x.transparent===!0&&x.side===Kt&&x.forceSinglePass===!1?(x.side=Ut,x.needsUpdate=!0,er(x,D,k),x.side=zn,x.needsUpdate=!0,er(x,D,k),x.side=Kt):er(x,D,k)}this.compile=function(x,D,k=null){k===null&&(k=x),A=he.get(k),A.init(D),_.push(A),k.traverseVisible(function(V){V.isLight&&V.layers.test(D.layers)&&(A.pushLight(V),V.castShadow&&A.pushShadow(V))}),x!==k&&x.traverseVisible(function(V){V.isLight&&V.layers.test(D.layers)&&(A.pushLight(V),V.castShadow&&A.pushShadow(V))}),A.setupLights();const z=new Set;return x.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const ue=V.material;if(ue)if(Array.isArray(ue))for(let ve=0;ve<ue.length;ve++){const de=ue[ve];en(de,k,V),z.add(de)}else en(ue,k,V),z.add(ue)}),A=_.pop(),z},this.compileAsync=function(x,D,k=null){const z=this.compile(x,D,k);return new Promise(V=>{function ue(){if(z.forEach(function(ve){S.get(ve).currentProgram.isReady()&&z.delete(ve)}),z.size===0){V(x);return}setTimeout(ue,10)}Ve.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let as=null;function Nc(x){as&&as(x)}function fo(){Vn.stop()}function ho(){Vn.start()}const Vn=new dc;Vn.setAnimationLoop(Nc),typeof self<"u"&&Vn.setContext(self),this.setAnimationLoop=function(x){as=x,ae.setAnimationLoop(x),x===null?Vn.stop():Vn.start()},ae.addEventListener("sessionstart",fo),ae.addEventListener("sessionend",ho),this.render=function(x,D){if(D!==void 0&&D.isCamera!==!0){ke("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;B!==null&&B.renderStart(x,D);const k=ae.enabled===!0&&ae.isPresenting===!0,z=E!==null&&(I===null||k)&&E.begin(F,I);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(D),D=ae.getCamera()),x.isScene===!0&&x.onBeforeRender(F,x,D,I),A=he.get(x,_.length),A.init(D),A.state.textureUnits=v.getTextureUnits(),_.push(A),Ke.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Ae.setFromProjectionMatrix(Ke,cn,D.reversedDepth),ze=this.localClippingEnabled,at=ge.init(this.clippingPlanes,ze),L=q.get(x,w.length),L.init(),w.push(L),ae.enabled===!0&&ae.isPresenting===!0){const ve=F.xr.getDepthSensingMesh();ve!==null&&os(ve,D,-1/0,F.sortObjects)}os(x,D,0,F.sortObjects),L.finish(),F.sortObjects===!0&&L.sort(j,fe),ot=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,ot&&te.addToRenderList(L,x),this.info.render.frame++,at===!0&&ge.beginShadows();const V=A.state.shadowsArray;if(se.render(V,x,D),at===!0&&ge.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&E.hasRenderPass())===!1){const ve=L.opaque,de=L.transmissive;if(A.setupLights(),D.isArrayCamera){const xe=D.cameras;if(de.length>0)for(let be=0,De=xe.length;be<De;be++){const Fe=xe[be];mo(ve,de,x,Fe)}ot&&te.render(x);for(let be=0,De=xe.length;be<De;be++){const Fe=xe[be];po(L,x,Fe,Fe.viewport)}}else de.length>0&&mo(ve,de,x,D),ot&&te.render(x),po(L,x,D)}I!==null&&Y===0&&(v.updateMultisampleRenderTarget(I),v.updateRenderTargetMipmap(I)),z&&E.end(F),x.isScene===!0&&x.onAfterRender(F,x,D),ne.resetDefaultState(),H=-1,O=null,_.pop(),_.length>0?(A=_[_.length-1],v.setTextureUnits(A.state.textureUnits),at===!0&&ge.setGlobalState(F.clippingPlanes,A.state.camera)):A=null,w.pop(),w.length>0?L=w[w.length-1]:L=null,B!==null&&B.renderEnd()};function os(x,D,k,z){if(x.visible===!1)return;if(x.layers.test(D.layers)){if(x.isGroup)k=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(D);else if(x.isLightProbeGrid)A.pushLightProbeGrid(x);else if(x.isLight)A.pushLight(x),x.castShadow&&A.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||Ae.intersectsSprite(x)){z&&Be.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Ke);const ve=ee.update(x),de=x.material;de.visible&&L.push(x,ve,de,k,Be.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||Ae.intersectsObject(x))){const ve=ee.update(x),de=x.material;if(z&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Be.copy(x.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Be.copy(ve.boundingSphere.center)),Be.applyMatrix4(x.matrixWorld).applyMatrix4(Ke)),Array.isArray(de)){const xe=ve.groups;for(let be=0,De=xe.length;be<De;be++){const Fe=xe[be],Me=de[Fe.materialIndex];Me&&Me.visible&&L.push(x,ve,Me,k,Be.z,Fe)}}else de.visible&&L.push(x,ve,de,k,Be.z,null)}}const ue=x.children;for(let ve=0,de=ue.length;ve<de;ve++)os(ue[ve],D,k,z)}function po(x,D,k,z){const{opaque:V,transmissive:ue,transparent:ve}=x;A.setupLightsView(k),at===!0&&ge.setGlobalState(F.clippingPlanes,k),z&&le.viewport(K.copy(z)),V.length>0&&Qi(V,D,k),ue.length>0&&Qi(ue,D,k),ve.length>0&&Qi(ve,D,k),le.buffers.depth.setTest(!0),le.buffers.depth.setMask(!0),le.buffers.color.setMask(!0),le.setPolygonOffset(!1)}function mo(x,D,k,z){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[z.id]===void 0){const Me=Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[z.id]=new un(1,1,{generateMipmaps:!0,type:Me?En:zt,minFilter:Yn,samples:Math.max(4,nt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:He.workingColorSpace})}const ue=A.state.transmissionRenderTarget[z.id],ve=z.viewport||K;ue.setSize(ve.z*F.transmissionResolutionScale,ve.w*F.transmissionResolutionScale);const de=F.getRenderTarget(),xe=F.getActiveCubeFace(),be=F.getActiveMipmapLevel();F.setRenderTarget(ue),F.getClearColor(_e),Se=F.getClearAlpha(),Se<1&&F.setClearColor(16777215,.5),F.clear(),ot&&te.render(k);const De=F.toneMapping;F.toneMapping=dn;const Fe=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),A.setupLightsView(z),at===!0&&ge.setGlobalState(F.clippingPlanes,z),Qi(x,k,z),v.updateMultisampleRenderTarget(ue),v.updateRenderTargetMipmap(ue),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let Me=!1;for(let Je=0,ht=D.length;Je<ht;Je++){const dt=D[Je],{object:et,geometry:At,material:me,group:Ft}=dt;if(me.side===Kt&&et.layers.test(z.layers)){const Xe=me.side;me.side=Ut,me.needsUpdate=!0,go(et,k,z,At,me,Ft),me.side=Xe,me.needsUpdate=!0,Me=!0}}Me===!0&&(v.updateMultisampleRenderTarget(ue),v.updateRenderTargetMipmap(ue))}F.setRenderTarget(de,xe,be),F.setClearColor(_e,Se),Fe!==void 0&&(z.viewport=Fe),F.toneMapping=De}function Qi(x,D,k){const z=D.isScene===!0?D.overrideMaterial:null;for(let V=0,ue=x.length;V<ue;V++){const ve=x[V],{object:de,geometry:xe,group:be}=ve;let De=ve.material;De.allowOverride===!0&&z!==null&&(De=z),de.layers.test(k.layers)&&go(de,D,k,xe,De,be)}}function go(x,D,k,z,V,ue){x.onBeforeRender(F,D,k,z,V,ue),x.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),V.onBeforeRender(F,D,k,z,x,ue),V.transparent===!0&&V.side===Kt&&V.forceSinglePass===!1?(V.side=Ut,V.needsUpdate=!0,F.renderBufferDirect(k,D,z,V,x,ue),V.side=zn,V.needsUpdate=!0,F.renderBufferDirect(k,D,z,V,x,ue),V.side=Kt):F.renderBufferDirect(k,D,z,V,x,ue),x.onAfterRender(F,D,k,z,V,ue)}function er(x,D,k){D.isScene!==!0&&(D=xt);const z=S.get(x),V=A.state.lights,ue=A.state.shadowsArray,ve=V.state.version,de=oe.getParameters(x,V.state,ue,D,k,A.state.lightProbeGridArray),xe=oe.getProgramCacheKey(de);let be=z.programs;z.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,z.fog=D.fog;const De=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;z.envMap=N.get(x.envMap||z.environment,De),z.envMapRotation=z.environment!==null&&x.envMap===null?D.environmentRotation:x.envMapRotation,be===void 0&&(x.addEventListener("dispose",ft),be=new Map,z.programs=be);let Fe=be.get(xe);if(Fe!==void 0){if(z.currentProgram===Fe&&z.lightsStateVersion===ve)return _o(x,de),Fe}else de.uniforms=oe.getUniforms(x),B!==null&&x.isNodeMaterial&&B.build(x,k,de),x.onBeforeCompile(de,F),Fe=oe.acquireProgram(de,xe),be.set(xe,Fe),z.uniforms=de.uniforms;const Me=z.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Me.clippingPlanes=ge.uniform),_o(x,de),z.needsLights=zc(x),z.lightsStateVersion=ve,z.needsLights&&(Me.ambientLightColor.value=V.state.ambient,Me.lightProbe.value=V.state.probe,Me.directionalLights.value=V.state.directional,Me.directionalLightShadows.value=V.state.directionalShadow,Me.spotLights.value=V.state.spot,Me.spotLightShadows.value=V.state.spotShadow,Me.rectAreaLights.value=V.state.rectArea,Me.ltc_1.value=V.state.rectAreaLTC1,Me.ltc_2.value=V.state.rectAreaLTC2,Me.pointLights.value=V.state.point,Me.pointLightShadows.value=V.state.pointShadow,Me.hemisphereLights.value=V.state.hemi,Me.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Me.spotLightMatrix.value=V.state.spotLightMatrix,Me.spotLightMap.value=V.state.spotLightMap,Me.pointShadowMatrix.value=V.state.pointShadowMatrix),z.lightProbeGrid=A.state.lightProbeGridArray.length>0,z.currentProgram=Fe,z.uniformsList=null,Fe}function vo(x){if(x.uniformsList===null){const D=x.currentProgram.getUniforms();x.uniformsList=Vr.seqWithValue(D.seq,x.uniforms)}return x.uniformsList}function _o(x,D){const k=S.get(x);k.outputColorSpace=D.outputColorSpace,k.batching=D.batching,k.batchingColor=D.batchingColor,k.instancing=D.instancing,k.instancingColor=D.instancingColor,k.instancingMorph=D.instancingMorph,k.skinning=D.skinning,k.morphTargets=D.morphTargets,k.morphNormals=D.morphNormals,k.morphColors=D.morphColors,k.morphTargetsCount=D.morphTargetsCount,k.numClippingPlanes=D.numClippingPlanes,k.numIntersection=D.numClipIntersection,k.vertexAlphas=D.vertexAlphas,k.vertexTangents=D.vertexTangents,k.toneMapping=D.toneMapping}function Fc(x,D){if(x.length===0)return null;if(x.length===1)return x[0].texture!==null?x[0]:null;T.setFromMatrixPosition(D.matrixWorld);for(let k=0,z=x.length;k<z;k++){const V=x[k];if(V.texture!==null&&V.boundingBox.containsPoint(T))return V}return null}function Oc(x,D,k,z,V){D.isScene!==!0&&(D=xt),v.resetTextureUnits();const ue=D.fog,ve=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?D.environment:null,de=I===null?F.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:He.workingColorSpace,xe=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,be=N.get(z.envMap||ve,xe),De=z.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Fe=!!k.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Me=!!k.morphAttributes.position,Je=!!k.morphAttributes.normal,ht=!!k.morphAttributes.color;let dt=dn;z.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(dt=F.toneMapping);const et=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,At=et!==void 0?et.length:0,me=S.get(z),Ft=A.state.lights;if(at===!0&&(ze===!0||x!==O)){const it=x===O&&z.id===H;ge.setState(z,x,it)}let Xe=!1;z.version===me.__version?(me.needsLights&&me.lightsStateVersion!==Ft.state.version||me.outputColorSpace!==de||V.isBatchedMesh&&me.batching===!1||!V.isBatchedMesh&&me.batching===!0||V.isBatchedMesh&&me.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&me.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&me.instancing===!1||!V.isInstancedMesh&&me.instancing===!0||V.isSkinnedMesh&&me.skinning===!1||!V.isSkinnedMesh&&me.skinning===!0||V.isInstancedMesh&&me.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&me.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&me.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&me.instancingMorph===!1&&V.morphTexture!==null||me.envMap!==be||z.fog===!0&&me.fog!==ue||me.numClippingPlanes!==void 0&&(me.numClippingPlanes!==ge.numPlanes||me.numIntersection!==ge.numIntersection)||me.vertexAlphas!==De||me.vertexTangents!==Fe||me.morphTargets!==Me||me.morphNormals!==Je||me.morphColors!==ht||me.toneMapping!==dt||me.morphTargetsCount!==At||!!me.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(Xe=!0):(Xe=!0,me.__version=z.version);let kt=me.currentProgram;Xe===!0&&(kt=er(z,D,V),B&&z.isNodeMaterial&&B.onUpdateProgram(z,kt,me));let tn=!1,An=!1,ni=!1;const tt=kt.getUniforms(),pt=me.uniforms;if(le.useProgram(kt.program)&&(tn=!0,An=!0,ni=!0),z.id!==H&&(H=z.id,An=!0),me.needsLights){const it=Fc(A.state.lightProbeGridArray,V);me.lightProbeGrid!==it&&(me.lightProbeGrid=it,An=!0)}if(tn||O!==x){le.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),tt.setValue(P,"projectionMatrix",x.projectionMatrix),tt.setValue(P,"viewMatrix",x.matrixWorldInverse);const Cn=tt.map.cameraPosition;Cn!==void 0&&Cn.setValue(P,rt.setFromMatrixPosition(x.matrixWorld)),nt.logarithmicDepthBuffer&&tt.setValue(P,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&tt.setValue(P,"isOrthographic",x.isOrthographicCamera===!0),O!==x&&(O=x,An=!0,ni=!0)}if(me.needsLights&&(Ft.state.directionalShadowMap.length>0&&tt.setValue(P,"directionalShadowMap",Ft.state.directionalShadowMap,v),Ft.state.spotShadowMap.length>0&&tt.setValue(P,"spotShadowMap",Ft.state.spotShadowMap,v),Ft.state.pointShadowMap.length>0&&tt.setValue(P,"pointShadowMap",Ft.state.pointShadowMap,v)),V.isSkinnedMesh){tt.setOptional(P,V,"bindMatrix"),tt.setOptional(P,V,"bindMatrixInverse");const it=V.skeleton;it&&(it.boneTexture===null&&it.computeBoneTexture(),tt.setValue(P,"boneTexture",it.boneTexture,v))}V.isBatchedMesh&&(tt.setOptional(P,V,"batchingTexture"),tt.setValue(P,"batchingTexture",V._matricesTexture,v),tt.setOptional(P,V,"batchingIdTexture"),tt.setValue(P,"batchingIdTexture",V._indirectTexture,v),tt.setOptional(P,V,"batchingColorTexture"),V._colorsTexture!==null&&tt.setValue(P,"batchingColorTexture",V._colorsTexture,v));const wn=k.morphAttributes;if((wn.position!==void 0||wn.normal!==void 0||wn.color!==void 0)&&Ce.update(V,k,kt),(An||me.receiveShadow!==V.receiveShadow)&&(me.receiveShadow=V.receiveShadow,tt.setValue(P,"receiveShadow",V.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&D.environment!==null&&(pt.envMapIntensity.value=D.environmentIntensity),pt.dfgLUT!==void 0&&(pt.dfgLUT.value=dg()),An){if(tt.setValue(P,"toneMappingExposure",F.toneMappingExposure),me.needsLights&&Bc(pt,ni),ue&&z.fog===!0&&G.refreshFogUniforms(pt,ue),G.refreshMaterialUniforms(pt,z,Ie,je,A.state.transmissionRenderTarget[x.id]),me.needsLights&&me.lightProbeGrid){const it=me.lightProbeGrid;pt.probesSH.value=it.texture,pt.probesMin.value.copy(it.boundingBox.min),pt.probesMax.value.copy(it.boundingBox.max),pt.probesResolution.value.copy(it.resolution)}Vr.upload(P,vo(me),pt,v)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Vr.upload(P,vo(me),pt,v),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&tt.setValue(P,"center",V.center),tt.setValue(P,"modelViewMatrix",V.modelViewMatrix),tt.setValue(P,"normalMatrix",V.normalMatrix),tt.setValue(P,"modelMatrix",V.matrixWorld),z.uniformsGroups!==void 0){const it=z.uniformsGroups;for(let Cn=0,ii=it.length;Cn<ii;Cn++){const xo=it[Cn];X.update(xo,kt),X.bind(xo,kt)}}return kt}function Bc(x,D){x.ambientLightColor.needsUpdate=D,x.lightProbe.needsUpdate=D,x.directionalLights.needsUpdate=D,x.directionalLightShadows.needsUpdate=D,x.pointLights.needsUpdate=D,x.pointLightShadows.needsUpdate=D,x.spotLights.needsUpdate=D,x.spotLightShadows.needsUpdate=D,x.rectAreaLights.needsUpdate=D,x.hemisphereLights.needsUpdate=D}function zc(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(x,D,k){const z=S.get(x);z.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),S.get(x.texture).__webglTexture=D,S.get(x.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:k,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,D){const k=S.get(x);k.__webglFramebuffer=D,k.__useDefaultFramebuffer=D===void 0};const Vc=P.createFramebuffer();this.setRenderTarget=function(x,D=0,k=0){I=x,W=D,Y=k;let z=null,V=!1,ue=!1;if(x){const de=S.get(x);if(de.__useDefaultFramebuffer!==void 0){le.bindFramebuffer(P.FRAMEBUFFER,de.__webglFramebuffer),K.copy(x.viewport),Q.copy(x.scissor),ie=x.scissorTest,le.viewport(K),le.scissor(Q),le.setScissorTest(ie),H=-1;return}else if(de.__webglFramebuffer===void 0)v.setupRenderTarget(x);else if(de.__hasExternalTextures)v.rebindTextures(x,S.get(x.texture).__webglTexture,S.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const De=x.depthTexture;if(de.__boundDepthTexture!==De){if(De!==null&&S.has(De)&&(x.width!==De.image.width||x.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");v.setupDepthRenderbuffer(x)}}const xe=x.texture;(xe.isData3DTexture||xe.isDataArrayTexture||xe.isCompressedArrayTexture)&&(ue=!0);const be=S.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(be[D])?z=be[D][k]:z=be[D],V=!0):x.samples>0&&v.useMultisampledRTT(x)===!1?z=S.get(x).__webglMultisampledFramebuffer:Array.isArray(be)?z=be[k]:z=be,K.copy(x.viewport),Q.copy(x.scissor),ie=x.scissorTest}else K.copy(re).multiplyScalar(Ie).floor(),Q.copy(Ee).multiplyScalar(Ie).floor(),ie=Re;if(k!==0&&(z=Vc),le.bindFramebuffer(P.FRAMEBUFFER,z)&&le.drawBuffers(x,z),le.viewport(K),le.scissor(Q),le.setScissorTest(ie),V){const de=S.get(x.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+D,de.__webglTexture,k)}else if(ue){const de=D;for(let xe=0;xe<x.textures.length;xe++){const be=S.get(x.textures[xe]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+xe,be.__webglTexture,k,de)}}else if(x!==null&&k!==0){const de=S.get(x.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,de.__webglTexture,k)}H=-1},this.readRenderTargetPixels=function(x,D,k,z,V,ue,ve,de=0){if(!(x&&x.isWebGLRenderTarget)){ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=S.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ve!==void 0&&(xe=xe[ve]),xe){le.bindFramebuffer(P.FRAMEBUFFER,xe);try{const be=x.textures[de],De=be.format,Fe=be.type;if(x.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+de),!nt.textureFormatReadable(De)){ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!nt.textureTypeReadable(Fe)){ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=x.width-z&&k>=0&&k<=x.height-V&&P.readPixels(D,k,z,V,R.convert(De),R.convert(Fe),ue)}finally{const be=I!==null?S.get(I).__webglFramebuffer:null;le.bindFramebuffer(P.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(x,D,k,z,V,ue,ve,de=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=S.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ve!==void 0&&(xe=xe[ve]),xe)if(D>=0&&D<=x.width-z&&k>=0&&k<=x.height-V){le.bindFramebuffer(P.FRAMEBUFFER,xe);const be=x.textures[de],De=be.format,Fe=be.type;if(x.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+de),!nt.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!nt.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Me=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Me),P.bufferData(P.PIXEL_PACK_BUFFER,ue.byteLength,P.STREAM_READ),P.readPixels(D,k,z,V,R.convert(De),R.convert(Fe),0);const Je=I!==null?S.get(I).__webglFramebuffer:null;le.bindFramebuffer(P.FRAMEBUFFER,Je);const ht=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Td(P,ht,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Me),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ue),P.deleteBuffer(Me),P.deleteSync(ht),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,D=null,k=0){const z=Math.pow(2,-k),V=Math.floor(x.image.width*z),ue=Math.floor(x.image.height*z),ve=D!==null?D.x:0,de=D!==null?D.y:0;v.setTexture2D(x,0),P.copyTexSubImage2D(P.TEXTURE_2D,k,0,0,ve,de,V,ue),le.unbindTexture()};const kc=P.createFramebuffer(),Hc=P.createFramebuffer();this.copyTextureToTexture=function(x,D,k=null,z=null,V=0,ue=0){let ve,de,xe,be,De,Fe,Me,Je,ht;const dt=x.isCompressedTexture?x.mipmaps[ue]:x.image;if(k!==null)ve=k.max.x-k.min.x,de=k.max.y-k.min.y,xe=k.isBox3?k.max.z-k.min.z:1,be=k.min.x,De=k.min.y,Fe=k.isBox3?k.min.z:0;else{const pt=Math.pow(2,-V);ve=Math.floor(dt.width*pt),de=Math.floor(dt.height*pt),x.isDataArrayTexture?xe=dt.depth:x.isData3DTexture?xe=Math.floor(dt.depth*pt):xe=1,be=0,De=0,Fe=0}z!==null?(Me=z.x,Je=z.y,ht=z.z):(Me=0,Je=0,ht=0);const et=R.convert(D.format),At=R.convert(D.type);let me;D.isData3DTexture?(v.setTexture3D(D,0),me=P.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(v.setTexture2DArray(D,0),me=P.TEXTURE_2D_ARRAY):(v.setTexture2D(D,0),me=P.TEXTURE_2D),le.activeTexture(P.TEXTURE0),le.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,D.flipY),le.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),le.pixelStorei(P.UNPACK_ALIGNMENT,D.unpackAlignment);const Ft=le.getParameter(P.UNPACK_ROW_LENGTH),Xe=le.getParameter(P.UNPACK_IMAGE_HEIGHT),kt=le.getParameter(P.UNPACK_SKIP_PIXELS),tn=le.getParameter(P.UNPACK_SKIP_ROWS),An=le.getParameter(P.UNPACK_SKIP_IMAGES);le.pixelStorei(P.UNPACK_ROW_LENGTH,dt.width),le.pixelStorei(P.UNPACK_IMAGE_HEIGHT,dt.height),le.pixelStorei(P.UNPACK_SKIP_PIXELS,be),le.pixelStorei(P.UNPACK_SKIP_ROWS,De),le.pixelStorei(P.UNPACK_SKIP_IMAGES,Fe);const ni=x.isDataArrayTexture||x.isData3DTexture,tt=D.isDataArrayTexture||D.isData3DTexture;if(x.isDepthTexture){const pt=S.get(x),wn=S.get(D),it=S.get(pt.__renderTarget),Cn=S.get(wn.__renderTarget);le.bindFramebuffer(P.READ_FRAMEBUFFER,it.__webglFramebuffer),le.bindFramebuffer(P.DRAW_FRAMEBUFFER,Cn.__webglFramebuffer);for(let ii=0;ii<xe;ii++)ni&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,S.get(x).__webglTexture,V,Fe+ii),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,S.get(D).__webglTexture,ue,ht+ii)),P.blitFramebuffer(be,De,ve,de,Me,Je,ve,de,P.DEPTH_BUFFER_BIT,P.NEAREST);le.bindFramebuffer(P.READ_FRAMEBUFFER,null),le.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(V!==0||x.isRenderTargetTexture||S.has(x)){const pt=S.get(x),wn=S.get(D);le.bindFramebuffer(P.READ_FRAMEBUFFER,kc),le.bindFramebuffer(P.DRAW_FRAMEBUFFER,Hc);for(let it=0;it<xe;it++)ni?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,pt.__webglTexture,V,Fe+it):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,pt.__webglTexture,V),tt?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,wn.__webglTexture,ue,ht+it):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,wn.__webglTexture,ue),V!==0?P.blitFramebuffer(be,De,ve,de,Me,Je,ve,de,P.COLOR_BUFFER_BIT,P.NEAREST):tt?P.copyTexSubImage3D(me,ue,Me,Je,ht+it,be,De,ve,de):P.copyTexSubImage2D(me,ue,Me,Je,be,De,ve,de);le.bindFramebuffer(P.READ_FRAMEBUFFER,null),le.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else tt?x.isDataTexture||x.isData3DTexture?P.texSubImage3D(me,ue,Me,Je,ht,ve,de,xe,et,At,dt.data):D.isCompressedArrayTexture?P.compressedTexSubImage3D(me,ue,Me,Je,ht,ve,de,xe,et,dt.data):P.texSubImage3D(me,ue,Me,Je,ht,ve,de,xe,et,At,dt):x.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ue,Me,Je,ve,de,et,At,dt.data):x.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ue,Me,Je,dt.width,dt.height,et,dt.data):P.texSubImage2D(P.TEXTURE_2D,ue,Me,Je,ve,de,et,At,dt);le.pixelStorei(P.UNPACK_ROW_LENGTH,Ft),le.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Xe),le.pixelStorei(P.UNPACK_SKIP_PIXELS,kt),le.pixelStorei(P.UNPACK_SKIP_ROWS,tn),le.pixelStorei(P.UNPACK_SKIP_IMAGES,An),ue===0&&D.generateMipmaps&&P.generateMipmap(me),le.unbindTexture()},this.initRenderTarget=function(x){S.get(x).__webglFramebuffer===void 0&&v.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?v.setTextureCube(x,0):x.isData3DTexture?v.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?v.setTexture2DArray(x,0):v.setTexture2D(x,0),le.unbindTexture()},this.resetState=function(){W=0,Y=0,I=null,le.reset(),ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=He._getDrawingBufferColorSpace(e),t.unpackColorSpace=He._getUnpackColorSpace()}}const Si=[65437,16766720,58879,16743465,11032055,16772157,5090295,16729943];class fg{constructor(e){lt(this,"scene");lt(this,"camera");lt(this,"renderer");lt(this,"canvas");lt(this,"container");lt(this,"cubeGroup");lt(this,"layerMeshes",[]);lt(this,"layerMaterials",[]);lt(this,"layerOpacities",new Array(8).fill(.85));lt(this,"layerVisible",new Array(8).fill(!0));lt(this,"labelSprites",[]);lt(this,"isDragging",!1);lt(this,"prevMouse",{x:0,y:0});lt(this,"rotX",-.35);lt(this,"rotY",.55);lt(this,"autoRotate",!0);lt(this,"animId",0);lt(this,"raycaster");lt(this,"mouse2d",new Oe);lt(this,"clickPlanes",[]);lt(this,"currentCube",null);lt(this,"animate",()=>{this.animId=requestAnimationFrame(this.animate),this.autoRotate&&!this.isDragging&&(this.rotY+=.003,this.cubeGroup.rotation.y=this.rotY);for(const e of this.labelSprites)e.quaternion.copy(this.camera.quaternion);this.renderer.render(this.scene,this.camera)});this.container=e,this.canvas=document.createElement("canvas"),this.canvas.id="cube-canvas",e.appendChild(this.canvas),this.scene=new kd,this.scene.background=null,this.camera=new Wt(45,1,.01,100),this.camera.position.set(0,0,4.5),this.renderer=new ug({canvas:this.canvas,antialias:!0,alpha:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setClearColor(0,0);const t=new uu(16777215,.6),n=new du(58879,.8);n.position.set(2,3,4),this.scene.add(t,n),this.cubeGroup=new Xi,this.scene.add(this.cubeGroup),this.raycaster=new pu,this.resize(),this.bindEvents(),this.animate()}loadCube(e){this.currentCube=e,this.cubeGroup.clear(),this.layerMeshes=[],this.layerMaterials=[],this.clickPlanes=[],this.labelSprites=[];const t=e.shape[0],n=e.shape[1],r=e.shape[2],s=2,a=2,o=.28,l=(r-1)*o;for(let d=0;d<r;d++){const m=new Uint8Array(n*t*4),g=new qe(Si[d%Si.length]);for(let O=0;O<t;O++)for(let K=0;K<n;K++){const Q=e.cube[O][K][d],ie=(O*n+K)*4;m[ie]=Math.round(g.r*255*Q+20),m[ie+1]=Math.round(g.g*255*Q+20),m[ie+2]=Math.round(g.b*255*Q+20),m[ie+3]=Math.round(180*Q+40)}const y=new rc(m,n,t);y.needsUpdate=!0;const h=new jr({map:y,transparent:!0,opacity:this.layerOpacities[d],side:Kt,depthWrite:!1,blending:Xs});this.layerMaterials.push(h);const p=new Ci(s,a),b=new Qt(p,h);b.position.z=-l/2+d*o,b.userData={layerIndex:d};const M=new Yo(p),T=new Fa({color:Si[d%Si.length],transparent:!0,opacity:.25}),L=new qo(M,T);b.add(L),this.cubeGroup.add(b),this.layerMeshes.push(b);const A=e.variables[d]||`Layer ${d}`,w=Si[d%Si.length],_=document.createElement("canvas");_.width=128,_.height=32;const E=_.getContext("2d");if(E){E.font="bold 18px monospace";const Q=E.measureText(A).width+10*2,ie=24;E.fillStyle="rgba(10, 10, 16, 0.75)",E.beginPath(),E.roundRect((128-Q)/2,(32-ie)/2,Q,ie,4),E.fill(),E.fillStyle="#"+w.toString(16).padStart(6,"0"),E.textAlign="center",E.textBaseline="middle",E.fillText(A,64,16)}const F=new Qd(_),C=new nc({map:F,transparent:!0,opacity:.9,depthWrite:!1,depthTest:!1}),B=new qd(C);B.scale.set(.6,.15,1);const W=(d-3.5)*.16;B.position.set(1.35,W,b.position.z),B.visible=this.layerVisible[d],this.cubeGroup.add(B),this.labelSprites.push(B);const Y=new Ci(s,a),I=new jr({visible:!1,side:Kt}),H=new Qt(Y,I);H.position.copy(b.position),H.userData={layerIndex:d,isClick:!0},this.cubeGroup.add(H),this.clickPlanes.push(H)}const c=new Di(s+.02,a+.02,l+o),u=new Yo(c),f=new qo(u,new Fa({color:58879,transparent:!0,opacity:.15}));this.cubeGroup.add(f),this.cubeGroup.rotation.x=this.rotX,this.cubeGroup.rotation.y=this.rotY}setLayerOpacity(e,t){this.layerOpacities[e]=t,this.layerMaterials[e]&&(this.layerMaterials[e].opacity=t)}setLayerVisible(e,t){this.layerVisible[e]=t,this.layerMeshes[e]&&(this.layerMeshes[e].visible=t),this.labelSprites[e]&&(this.labelSprites[e].visible=t)}setAutoRotate(e){this.autoRotate=e}resetCamera(){this.rotX=-.35,this.rotY=.55,this.camera.position.z=4.5,this.cubeGroup.rotation.set(this.rotX,this.rotY,0)}isolateLayer(e){for(let t=0;t<8;t++)this.setLayerVisible(t,t===e)}showAllLayers(){for(let e=0;e<8;e++)this.setLayerVisible(e,!0)}bindEvents(){const e=this.canvas;e.addEventListener("mousedown",t=>{this.isDragging=!0,this.prevMouse={x:t.clientX,y:t.clientY}}),window.addEventListener("mouseup",()=>{this.isDragging=!1}),window.addEventListener("mousemove",t=>{if(!this.isDragging)return;const n=t.clientX-this.prevMouse.x,r=t.clientY-this.prevMouse.y;this.prevMouse={x:t.clientX,y:t.clientY},this.rotY+=n*.008,this.rotX+=r*.008,this.rotX=Math.max(-Math.PI/2,Math.min(Math.PI/2,this.rotX)),this.cubeGroup.rotation.x=this.rotX,this.cubeGroup.rotation.y=this.rotY}),e.addEventListener("wheel",t=>{t.preventDefault(),this.camera.position.z=Math.max(2,Math.min(8,this.camera.position.z+t.deltaY*.005))},{passive:!1}),e.addEventListener("click",t=>{if(!this.currentCube)return;const n=e.getBoundingClientRect();this.mouse2d.x=(t.clientX-n.left)/n.width*2-1,this.mouse2d.y=-((t.clientY-n.top)/n.height)*2+1,this.raycaster.setFromCamera(this.mouse2d,this.camera);const r=this.raycaster.intersectObjects(this.clickPlanes);if(r.length===0)return;const a=r[0].uv,o=this.currentCube.shape[0],l=this.currentCube.shape[1],c=Math.floor(a.x*l),u=Math.floor((1-a.y)*o),f=Math.max(0,Math.min(l-1,c)),d=Math.max(0,Math.min(o-1,u)),m=this.currentCube.cube[d][f];this.container.dispatchEvent(new CustomEvent("pixel-selected",{detail:{x:f,y:d,values:m},bubbles:!0}));const g=document.getElementById("pixel-coords");g&&(g.style.display="block",g.textContent=`📍 (${f}, ${d})`)}),window.addEventListener("resize",()=>this.resize())}resize(){const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}destroy(){cancelAnimationFrame(this.animId),this.renderer.dispose(),this.canvas.remove()}}const wl=["#00ff9d","#ffd700","#00e5ff","#ff7c29","#a855f7","#ffec3d","#4dabf7","#ff4757"];function hg(){const i=document.createElement("div");return i.className="panel panel-left",i.id="panel-left",i.innerHTML=`
    <div class="panel-header">
      <div class="panel-title">Data & Cube</div>
      <div id="cube-status-pill" class="pill pill-idle">No Cube</div>
    </div>

    <!-- Upload zone -->
    <div id="upload-section">
      <div class="upload-zone" id="upload-drop-zone" role="button" tabindex="0"
           aria-label="Upload CSV — drag and drop or click">
        <input type="file" id="cube-file-input" accept=".csv,text/csv" />
        <span class="upload-icon">Load</span>
        <div class="upload-title">Drop ecological CSV</div>
        <div class="upload-sub">or click to browse · any CSV with lon/lat</div>
      </div>
      <div style="padding: 0 16px 12px; display:flex; gap:8px;">
        <button class="btn btn-primary" id="btn-load-synthetic" style="flex:1; justify-content:center;">
          Load Synthetic Cube
        </button>
      </div>
    </div>

    <!-- Cube metadata (shown after load) -->
    <div id="cube-meta-section" style="display:none;">
      <div class="section-divider"></div>
      <div class="info-row"><span class="info-row-key">Source</span><span class="info-row-val" id="meta-source">—</span></div>
      <div class="info-row"><span class="info-row-key">Dimensions</span><span class="info-row-val">20 × 20 × 8</span></div>
      <div class="info-row"><span class="info-row-key">Regime</span><span class="info-row-val" id="meta-regime">—</span></div>
      <div class="info-row"><span class="info-row-key">Completeness</span><span class="info-row-val" id="meta-completeness">—</span></div>
      <div class="info-row" id="meta-bounds-row" style="display:none;">
        <span class="info-row-key">Bounds</span>
        <span class="info-row-val" id="meta-bounds" style="font-size:10px;">—</span>
      </div>

      <div class="section-divider"></div>

      <!-- Variable means bar chart -->
      <div class="panel-title" style="padding: 8px 16px 4px; font-size:10px;">VARIABLE MEANS</div>
      <div class="var-bars" id="var-bars"></div>

      <div class="section-divider"></div>

      <!-- Layer controls -->
      <div class="panel-title" style="padding: 8px 16px 4px; font-size:10px;">LAYER OPACITY</div>
      <div class="layer-controls" id="layer-controls"></div>

      <div class="section-divider"></div>

      <!-- Correlation mini heatmap -->
      <div class="panel-title" style="padding: 8px 16px 4px; font-size:10px;">CORRELATION MATRIX</div>
      <div class="heatmap-wrap">
        <div id="corr-heatmap" class="plotly-wrap" style="height:200px;"></div>
      </div>
    </div>
  `,i}function pg(i,e){const t=document.getElementById("cube-status-pill");t&&(t.className="pill pill-ready",t.textContent="● Cube Ready");const n=document.getElementById("upload-section"),r=document.getElementById("cube-meta-section");if(n&&(n.style.display="none"),r&&(r.style.display="block"),Lr("meta-source",i.source.length>18?i.source.slice(0,15)+"…":i.source),Lr("meta-regime",i.regime),Lr("meta-completeness",(i.completeness*100).toFixed(1)+"%"),i.coordinate_bounds){const o=i.coordinate_bounds;Lr("meta-bounds",`${o.lat_min.toFixed(1)}–${o.lat_max.toFixed(1)}°N, ${o.lon_min.toFixed(1)}–${o.lon_max.toFixed(1)}°E`);const l=document.getElementById("meta-bounds-row");l&&(l.style.display="flex")}const s=document.getElementById("var-bars");if(s){const o=(e==null?void 0:e.variable_means)||i.variables.map((l,c)=>{const u=i.cube.flatMap(f=>f.map(d=>d[c]));return u.reduce((f,d)=>f+d)/u.length});s.innerHTML=i.variables.map((l,c)=>`
      <div class="var-bar-row">
        <span class="var-bar-label">${l}</span>
        <div class="var-bar-track">
          <div class="var-bar-fill" style="width:${(o[c]*100).toFixed(1)}%; background:${wl[c]};"></div>
        </div>
        <span class="var-bar-val">${o[c].toFixed(3)}</span>
      </div>
    `).join("")}const a=document.getElementById("layer-controls");a&&(a.innerHTML=i.variables.map((o,l)=>`
      <div class="layer-row">
        <div class="layer-swatch" style="background:${wl[l]};"></div>
        <span class="layer-name">${o}</span>
        <input type="range" class="layer-slider" min="0" max="1" step="0.05"
               value="0.85" data-layer="${l}" id="layer-slider-${l}" />
        <button class="layer-toggle active" data-layer="${l}" id="layer-toggle-${l}" title="Toggle layer">●</button>
      </div>
    `).join(""),a.querySelectorAll(".layer-slider").forEach(o=>{o.addEventListener("input",()=>{const l=parseInt(o.dataset.layer),c=parseFloat(o.value);document.dispatchEvent(new CustomEvent("layer-opacity",{detail:{idx:l,val:c}}))})}),a.querySelectorAll(".layer-toggle").forEach(o=>{o.addEventListener("click",()=>{const l=parseInt(o.dataset.layer),c=o.classList.toggle("active");document.dispatchEvent(new CustomEvent("layer-toggle",{detail:{idx:l,visible:c}}))})})),e&&mg(e,i.variables)}function mg(i,e){const t=document.getElementById("corr-heatmap");if(!t||!window.Plotly)return;window.Plotly.newPlot(t,[{type:"heatmap",z:i.correlation_matrix,x:e,y:e,colorscale:[[0,"#1a0a2e"],[.25,"#4b1d6e"],[.5,"#0a1628"],[.75,"#004d80"],[1,"#00e5ff"]],zmin:-1,zmax:1,showscale:!1}],{margin:{l:42,r:8,t:8,b:42},paper_bgcolor:"transparent",plot_bgcolor:"transparent",font:{color:"#6890b8",size:9,family:"JetBrains Mono"},xaxis:{tickfont:{size:9}},yaxis:{tickfont:{size:9}}},{responsive:!0,displayModeBar:!1})}function Lr(i,e){const t=document.getElementById(i);t&&(t.textContent=e)}const gg="modulepreload",vg=function(i){return"/CAPRI/"+i},Cl={},Jr=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));r=Promise.allSettled(t.map(l=>{if(l=vg(l),l in Cl)return;Cl[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const f=document.createElement("link");if(f.rel=c?"stylesheet":gg,c||(f.as="script"),f.crossOrigin="",f.href=l,o&&f.setAttribute("nonce",o),document.head.appendChild(f),c)return new Promise((d,m)=>{f.addEventListener("load",d),f.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})},Ws=["#00ff9d","#ffd700","#00e5ff","#ff7c29","#a855f7","#ffec3d","#4dabf7","#ff4757"];function _g(){const i=document.createElement("div");return i.className="panel panel-right",i.id="panel-right",i.innerHTML=`
    <div class="panel-header">
      <div class="panel-title"><span class="panel-title-icon">🔬</span> Spectral Explorer</div>
    </div>

    <!-- Tabs -->
    <div class="panel-tabs">
      <button class="tab-btn active" data-tab="spectral" id="rtab-spectral">Spectral</button>
      <button class="tab-btn" data-tab="clusters" id="rtab-clusters">Clusters</button>
      <button class="tab-btn" data-tab="docking" id="rtab-docking">Docking</button>
      <button class="tab-btn" data-tab="similarity" id="rtab-similarity">Similarity</button>
      <button class="tab-btn" data-tab="catalog" id="rtab-catalog">Catalog</button>
    </div>

    <!-- Spectral tab -->
    <div id="rtab-spectral-content" style="overflow-y:auto; flex:1;">
      <div class="spectral-placeholder" id="spectral-placeholder">
        <div class="spectral-placeholder-icon">🖱️</div>
        <p>Click any location on the<br>3D cube to inspect its<br>ecological profile</p>
      </div>
      <div id="spectral-content" style="display:none;">
        <div class="spectral-pixel-info" id="pixel-info">
          <div class="pixel-dot"></div>
          <span id="pixel-coord-label">Location (—, —)</span>
        </div>
        <div id="spectral-line-chart" style="height:160px;padding:0 8px;"></div>
        <div id="spectral-bar-chart" style="height:140px;padding:0 8px;"></div>
        <div class="section-divider"></div>
        <div class="var-bars" id="spectral-var-bars"></div>
      </div>
    </div>

    <!-- Docking tab -->
    <div id="rtab-docking-content" style="display:none; overflow-y:auto; flex:1; padding: 16px;">
      <div class="spectral-placeholder" id="docking-placeholder">
        <div class="spectral-placeholder-icon">🧫</div>
        <p>Click any cell on the 3D cube to<br>run molecular docking & retrieve<br>similar ecological analogs</p>
      </div>
      <div id="docking-content" style="display:none;">
        <div style="font-size:11px; font-weight:700; color:var(--text-muted); margin-bottom:8px;">MOLECULAR DOCKING ANALOGS</div>
        <div id="docking-matches-list" style="display:flex; flex-direction:column; gap:8px;">
          <!-- Dynamic matches go here -->
        </div>
      </div>
    </div>

    <!-- Clusters tab -->
    <div id="rtab-clusters-content" style="display:none; overflow-y:auto; flex:1;">
      <div class="spectral-placeholder" id="cluster-placeholder">
        <div class="spectral-placeholder-icon">🌌</div>
        <p>Train the encoder to<br>discover ecological states</p>
      </div>
      <div id="cluster-list-content" style="display:none;">
        <div class="cluster-list" id="cluster-list"></div>
      </div>
    </div>

    <!-- Similarity tab -->
    <div id="rtab-similarity-content" style="display:none; overflow-y:auto; flex:1; padding: 16px;">
      <div class="spectral-placeholder" id="similarity-placeholder">
        <div class="spectral-placeholder-icon">🔁</div>
        <p>Run transferability assessment<br>to see similarity scores</p>
      </div>
      <div id="similarity-scores" style="display:none;">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">
          <div class="card" style="text-align:center;">
            <div class="card-label">Similarity</div>
            <div class="card-value" id="sim-score">—</div>
          </div>
          <div class="card" style="text-align:center;">
            <div class="card-label">Novelty</div>
            <div class="card-value" id="nov-score">—</div>
          </div>
        </div>
        <div class="card" style="margin-bottom:12px;">
          <div class="card-label">Nearest Regime</div>
          <div style="font-size:15px; font-weight:700; color:var(--cyan); margin-top:4px;" id="nearest-regime">—</div>
        </div>
        <div class="card">
          <div class="card-label">Confidence</div>
          <div style="margin-top:8px;">
            <div class="progress-track"><div class="progress-fill" id="conf-bar" style="width:0%"></div></div>
            <div style="text-align:right; font-size:11px; color:var(--text-muted); margin-top:4px;" id="conf-val">—</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Catalog tab -->
    <div id="rtab-catalog-content" style="display:none; overflow-y:auto; flex:1; padding: 16px;">
      <div class="panel-title" style="margin-bottom: 12px; font-size: 11px;">MODELS</div>
      <div id="catalog-models-list">
        <!-- Dynamic models go here -->
      </div>
      <div class="section-divider" style="margin: 16px 0;"></div>
      <div class="panel-title" style="margin-bottom: 12px; font-size: 11px;">COMPILED DATASETS</div>
      <div id="catalog-datasets-list">
        <!-- Dynamic datasets go here -->
      </div>
    </div>
  `,i}async function Qn(){const i=document.getElementById("catalog-models-list"),e=document.getElementById("catalog-datasets-list");if(!(!i||!e))try{const t=await Jr(()=>Promise.resolve().then(()=>es),void 0),n=await t.fetchModels(),r=await t.listDatasets();n.length===0?i.innerHTML='<div style="font-size: 11px; color: var(--text-muted);">No models saved yet.</div>':i.innerHTML=n.map(s=>`
        <div class="card" style="margin-bottom: 12px; border-left: 3px solid ${s.active?"var(--cyan)":"transparent"};">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-weight:600; font-size:12px; color:var(--text);">${s.name}</div>
            ${s.active?'<span style="font-size:9px; background:rgba(0, 229, 255, 0.1); color:var(--cyan); padding:2px 6px; border-radius:4px;">Active</span>':""}
          </div>
          <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">File: ${s.file}</div>
          <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">Description: ${s.description}</div>
          ${s.name==="cubenet_active"?`
            <div style="margin-top: 8px; display:flex; gap:6px;">
              <button class="btn btn-sm btn-outline btn-remove-model" data-name="${s.name}" style="flex:1; font-size:10px; padding:4px 0; border-color:rgba(255,71,87,0.3); color:rgba(255,71,87,0.85);">Delete</button>
            </div>
          `:s.name!=="cubenet_v1"?`
            <div style="margin-top: 8px; display:flex; gap:6px;">
              <button class="btn btn-sm btn-load-model" data-name="${s.name}" style="flex:1; font-size:10px; padding:4px 0;">Load</button>
              <button class="btn btn-sm btn-outline btn-remove-model" data-name="${s.name}" style="flex:1; font-size:10px; padding:4px 0; border-color:rgba(255,71,87,0.3); color:rgba(255,71,87,0.85);">Delete</button>
            </div>
          `:""}
        </div>
      `).join(""),r.length===0?e.innerHTML='<div style="font-size: 11px; color: var(--text-muted);">No datasets compiled yet.</div>':e.innerHTML=r.map(s=>`
        <div class="card" style="margin-bottom: 12px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-weight:600; font-size:12px; color:var(--text);">${s.dataset_name}</div>
            <span style="font-size:10px; color:var(--text-muted);">${s.n_cubes} tiles</span>
          </div>
          <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">Source: ${s.source_file}</div>
          <div style="margin-top: 8px; display:flex; gap:6px;">
            <button class="btn btn-sm btn-load-dataset" data-name="${s.dataset_name}" style="flex:1; font-size:10px; padding:4px 0;">Load Pool</button>
            <button class="btn btn-sm btn-outline btn-remove-dataset" data-name="${s.dataset_name}" style="flex:1; font-size:10px; padding:4px 0; border-color:rgba(255,71,87,0.3); color:rgba(255,71,87,0.85);">Delete</button>
          </div>
        </div>
      `).join(""),i.querySelectorAll(".btn-remove-model").forEach(s=>{s.addEventListener("click",async()=>{const a=s.dataset.name;confirm(`Are you sure you want to remove model "${a}"?`)&&(await t.removeModel(a),alert(`Model "${a}" removed.`),await Qn())})}),i.querySelectorAll(".btn-load-model").forEach(s=>{s.addEventListener("click",async()=>{const a=s.dataset.name;if(confirm(`Are you sure you want to load model "${a}" into the active workspace? This will overwrite the currently active model.`))try{const o=await fetch(`${t.API_BASE}/api/model/load`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:a})}),l=await o.json();o.ok?(alert(`Model "${a}" successfully loaded!`),location.reload()):alert(`Failed to load model: ${l.error}`)}catch(o){alert(`Failed to load model: ${o.message}`)}})}),e.querySelectorAll(".btn-load-dataset").forEach(s=>{s.addEventListener("click",async()=>{const a=s.dataset.name,l=await(await fetch(`${t.API_BASE}/api/dataset/merge`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({datasets:[a]})})).json();alert(`Loaded dataset "${a}" into Active Pool. Pool contains ${l.merged_count} cubes.`)})}),e.querySelectorAll(".btn-remove-dataset").forEach(s=>{s.addEventListener("click",async()=>{const a=s.dataset.name;confirm(`Are you sure you want to delete dataset "${a}" from disk?`)&&(await t.removeDataset(a),alert(`Dataset "${a}" deleted.`),await Qn())})})}catch(t){console.error("Failed to refresh catalog:",t)}}function xg(){const i=document.querySelectorAll("[data-tab]");i.forEach(e=>{e.closest("#panel-right")&&e.addEventListener("click",()=>{i.forEach(n=>{n.closest("#panel-right")&&n.classList.remove("active")}),e.classList.add("active");const t=e.getAttribute("data-tab");["spectral","clusters","docking","similarity","catalog"].forEach(n=>{const r=document.getElementById(`rtab-${n}-content`);r&&(r.style.display=n===t?"":"none")}),t==="catalog"&&Qn()})})}function yg(i,e,t,n){const r=document.getElementById("spectral-placeholder"),s=document.getElementById("spectral-content");r&&(r.style.display="none"),s&&(s.style.display="block");const a=document.getElementById("pixel-coord-label");a&&(a.textContent=`Location (${i}, ${e})`);const o=document.getElementById("spectral-line-chart");o&&window.Plotly&&window.Plotly.newPlot(o,[{x:n,y:t,type:"scatter",mode:"lines+markers",line:{color:"#00e5ff",width:2},marker:{color:Ws,size:8},fill:"tozeroy",fillcolor:"rgba(0,229,255,0.08)"}],{margin:{l:36,r:8,t:8,b:48},paper_bgcolor:"transparent",plot_bgcolor:"transparent",font:{color:"#6890b8",size:9,family:"JetBrains Mono"},xaxis:{tickangle:-30},yaxis:{range:[0,1.05]}},{responsive:!0,displayModeBar:!1});const l=document.getElementById("spectral-bar-chart");l&&window.Plotly&&window.Plotly.newPlot(l,[{type:"bar",x:t,y:n,orientation:"h",marker:{color:Ws}}],{margin:{l:54,r:8,t:8,b:24},paper_bgcolor:"transparent",plot_bgcolor:"transparent",font:{color:"#6890b8",size:9,family:"JetBrains Mono"},xaxis:{range:[0,1.05]}},{responsive:!0,displayModeBar:!1});const c=document.getElementById("spectral-var-bars");c&&(c.innerHTML=n.map((u,f)=>`
      <div class="var-bar-row">
        <span class="var-bar-label">${u}</span>
        <div class="var-bar-track">
          <div class="var-bar-fill" style="width:${(t[f]*100).toFixed(1)}%; background:${Ws[f]};"></div>
        </div>
        <span class="var-bar-val">${t[f].toFixed(3)}</span>
      </div>
    `).join(""))}function bg(i){const e=document.getElementById("cluster-placeholder"),t=document.getElementById("cluster-list-content");e&&(e.style.display="none"),t&&(t.style.display="block");const n=document.getElementById("cluster-list");n&&(n.innerHTML=i.cluster_names.map((r,s)=>`
    <div class="cluster-pill" data-cluster="${s}">
      <div class="cluster-color" style="background:${i.cluster_colors[s]};
           box-shadow:0 0 6px ${i.cluster_colors[s]}80;"></div>
      <span class="cluster-name">${r}</span>
      <span class="cluster-n">${i.cluster_sizes[s]} obs</span>
    </div>
  `).join(""),n.querySelectorAll(".cluster-pill").forEach(r=>{r.addEventListener("click",()=>{n.querySelectorAll(".cluster-pill").forEach(s=>s.classList.remove("active")),r.classList.add("active")})}))}function Sg(i,e,t,n){const r=document.getElementById("similarity-placeholder"),s=document.getElementById("similarity-scores");r&&(r.style.display="none"),s&&(s.style.display="block");const a=document.getElementById("sim-score"),o=document.getElementById("nov-score"),l=document.getElementById("nearest-regime"),c=document.getElementById("conf-bar"),u=document.getElementById("conf-val");a&&(a.textContent=i.toFixed(3)),o&&(o.textContent=e.toFixed(3)),l&&(l.textContent=t),c&&(c.style.width=`${(n*100).toFixed(0)}%`),u&&(u.textContent=`${(n*100).toFixed(1)}%`)}function Mg(i){const e=document.getElementById("docking-placeholder"),t=document.getElementById("docking-content");e&&(e.style.display="none"),t&&(t.style.display="block");const n=document.getElementById("docking-matches-list");if(n){if(!i.matches||i.matches.length===0){n.innerHTML='<div style="font-size:11px; color:var(--text-muted); text-align:center; padding: 20px 0;">No analogous reference states found. Train model to index embeddings first.</div>';return}n.innerHTML=i.matches.map((r,s)=>`
    <div class="card" style="margin-bottom:4px; border-left:3px solid var(--green);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
        <span style="font-weight:700; font-size:12px; color:var(--text);">Analog #${s+1}</span>
        <span style="font-size:10px; background:rgba(0,255,157,0.1); color:var(--green); padding:2px 6px; border-radius:4px; font-family:var(--font-mono);">Dist: ${r.distance.toFixed(4)}</span>
      </div>
      <div style="font-size:10px; color:var(--text-muted);">Position: <strong>(${r.x}, ${r.y})</strong> in <code>${r.dataset_id}</code></div>
      <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">Regime: <span class="pill" style="padding:1px 4px; font-size:9px;">${r.regime}</span></div>
      <div style="margin-top:8px; display:grid; grid-template-columns:repeat(4, 1fr); gap:4px; font-size:9px; font-family:var(--font-mono); text-align:center;">
        ${["CHL","aphy","ADG","bbp","TSM","PAR","KD490","SST"].map((a,o)=>{const l=r.values[o];return l!=null?`
            <div style="background:var(--surface-3); padding:2px; border-radius:2px;">
              <div style="color:var(--text-dim);">${a}</div>
              <div style="color:var(--text); font-weight:bold;">${l.toFixed(2)}</div>
            </div>
          `:""}).join("")}
      </div>
    </div>
  `).join("")}}function Eg(){const i=document.createElement("div");return i.className="panel panel-bottom",i.id="panel-bottom",i.innerHTML=`
    <!-- UMAP Section -->
    <div class="bottom-section" id="umap-section">
      <div class="panel-header">
        <div class="panel-title"><span class="panel-title-icon">🌌</span> Ecological State Space (UMAP)</div>
        <div class="pill pill-idle" id="umap-pill">Not computed</div>
      </div>
      <div class="bottom-section-body">
        <div id="umap-chart" style="width:100%; height:100%;"></div>
        <div id="umap-placeholder" style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:12px; gap:8px;">
          <span style="font-size:28px;">🌌</span>
          <span>Train encoder to see state space</span>
        </div>
      </div>
    </div>

    <!-- Training Section -->
    <div class="bottom-section" id="training-section">
      <div class="panel-header">
        <div class="panel-title" style="display:flex; flex-direction:column; gap:2px;">
          <span>Encoder Training</span>
          <span style="font-size:9px; color:var(--text-dim); text-transform:none; letter-spacing:0; font-weight:500;">Contrastive Latent Embedding</span>
        </div>
        <div class="pill pill-idle" id="train-pill">Idle</div>
      </div>
      <div class="bottom-section-body" style="padding: 8px 12px; display:flex; flex-direction:column; gap:8px; overflow-y:auto;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <label style="font-size:10px; color:var(--text-muted);">Generations (Epochs)</label>
          <input type="number" id="enc-epochs-bottom" value="10" min="1" max="100" style="width:50px; padding:2px 4px; background:var(--surface-3); border:1px solid var(--border); border-radius:var(--r-sm); color:var(--text); font:inherit; font-size:11px; text-align:center;" />
        </div>
        <button class="btn btn-primary" id="btn-train-encoder" style="width:100%; justify-content:center;" disabled>
          Train CubeNet Encoder
        </button>
        <div>
          <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-muted); margin-bottom:4px;">
            <span>Loss</span>
            <span id="train-loss-val">—</span>
          </div>
          <div class="progress-track"><div class="progress-fill" id="train-progress" style="width:0%"></div></div>
          <div style="text-align:right; font-size:10px; color:var(--text-dim); margin-top:3px;" id="train-epoch-val">Epoch 0 / 10</div>
        </div>
        <div id="train-loss-chart" style="flex:1; min-height:80px;"></div>
      </div>
    </div>

    <!-- Attractor / Transferability Summary -->
    <div class="bottom-section" style="border-right:none;">
      <div class="panel-header">
        <div class="panel-title"><span class="panel-title-icon">🔁</span> Transferability</div>
        <div class="pill pill-idle" id="transfer-pill">Not assessed</div>
      </div>
      <div class="bottom-section-body" style="padding:8px 12px; display:flex; flex-direction:column; gap:8px; overflow-y:auto;">
        <div style="margin-bottom:2px;">
          <label style="font-size:10px; color:var(--text-muted); display:block; margin-bottom:4px;">Target Model</label>
          <select id="transfer-model-select" style="width:100%; padding:4px 8px; background:var(--surface-3); border:1px solid var(--border); border-radius:var(--r-sm); color:var(--text); font:inherit; font-size:11px;">
            <option value="cubenet_v1">CubeNet v1 (Loaded)</option>
            <option value="cubenet_global">CubeNet Global Base</option>
          </select>
        </div>
        <button class="btn" id="btn-assess-transfer" style="width:100%; justify-content:center;" disabled>
          Assess Current Cube
        </button>
        <div id="transfer-scores" style="display:none; flex-direction:column; gap:8px;">
          <div class="score-gauge">
            <div class="score-circle" id="transfer-sim-circle">—</div>
            <div class="score-label">Ecosystem Similarity</div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
            <div class="card" style="padding:10px;">
              <div class="card-label">Novelty</div>
              <div class="card-value" style="font-size:16px;" id="transfer-nov">—</div>
            </div>
            <div class="card" style="padding:10px;">
              <div class="card-label">Confidence</div>
              <div class="card-value" style="font-size:16px;" id="transfer-conf">—</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,i}function Tg(){const i=document.getElementById("train-loss-chart");!i||!window.Plotly||window.Plotly.newPlot(i,[{x:[],y:[],type:"scatter",mode:"lines",line:{color:"#00e5ff",width:2},name:"Loss"}],{margin:{l:36,r:8,t:8,b:24},paper_bgcolor:"transparent",plot_bgcolor:"transparent",font:{color:"#6890b8",size:9,family:"JetBrains Mono"},xaxis:{title:"Epoch"},yaxis:{title:"Loss",rangemode:"tozero"},showlegend:!1},{responsive:!0,displayModeBar:!1})}const Rl={epoch:[],loss:[]};function Ag(i,e=10){Rl.epoch.push(i.epoch),Rl.loss.push(i.loss);const t=i.epoch/e*100,n=document.getElementById("train-progress");n&&(n.style.width=t+"%"),Qr("train-loss-val",i.loss.toFixed(4)),Qr("train-epoch-val",`Epoch ${i.epoch} / ${e}`);const r=document.getElementById("train-pill");r&&(r.className="pill pill-running",r.textContent="Training…");const s=document.getElementById("train-loss-chart");s&&window.Plotly&&window.Plotly.extendTraces(s,{x:[[i.epoch]],y:[[i.loss]]},[0])}function wg(){const i=document.getElementById("train-pill");i&&(i.className="pill pill-done",i.textContent="✓ Trained");const e=document.getElementById("btn-train-encoder");e&&(e.textContent="✓ Encoder Ready",e.disabled=!1);const t=document.getElementById("train-progress");t&&(t.style.width="100%")}function Cg(i){const e=document.getElementById("umap-placeholder");e&&(e.style.display="none");const t=document.getElementById("umap-pill");t&&(t.className="pill pill-done",t.textContent=`${i.cluster_names.length} states`);const n=document.getElementById("umap-chart");if(!n||!window.Plotly)return;const r=i.cluster_names.map((s,a)=>{const o=i.hdbscan_labels.map((l,c)=>l===a?c:-1).filter(l=>l>=0);return{x:o.map(l=>i.umap_2d[l][0]),y:o.map(l=>i.umap_2d[l][1]),type:"scatter",mode:"markers",marker:{color:i.cluster_colors[a],size:8,opacity:.8,line:{color:"rgba(0,0,0,.3)",width:1}},name:s}});window.Plotly.newPlot(n,r,{margin:{l:8,r:8,t:8,b:8},paper_bgcolor:"transparent",plot_bgcolor:"transparent",font:{color:"#6890b8",size:9,family:"JetBrains Mono"},legend:{orientation:"h",y:-.05,font:{size:9},bgcolor:"transparent"},xaxis:{visible:!1},yaxis:{visible:!1},hovermode:"closest"},{responsive:!0,displayModeBar:!1})}function Rg(i,e,t){const n=document.getElementById("transfer-pill");n&&(n.className="pill pill-done",n.textContent="Assessed");const r=document.getElementById("transfer-scores");r&&(r.style.display="flex");const s=document.getElementById("transfer-sim-circle");s&&(s.textContent=(i*100).toFixed(0)+"%"),Qr("transfer-nov",(e*100).toFixed(1)+"%"),Qr("transfer-conf",(t*100).toFixed(1)+"%")}function Qr(i,e){const t=document.getElementById(i);t&&(t.textContent=e)}const Pl=["#00ff9d","#ffd700","#00e5ff","#ff7c29","#a855f7","#ffec3d","#4dabf7","#ff4757"];function Pg(){const i=document.createElement("div");return i.className="page-view",i.id="view-statistics",i.innerHTML=`
    <div class="page-header">
      <h1>📊 Statistical Intelligence</h1>
      <p>Correlation structure, distributions, and variable relationships of the ecological cube</p>
    </div>
    <div class="page-scroll">
      <div id="stats-placeholder" style="text-align:center; padding:60px; color:var(--text-muted);">
        <div style="font-size:48px; margin-bottom:16px;">📊</div>
        <p>Load a cube first to compute statistics</p>
      </div>
      <div id="stats-content" style="display:none;">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
          <div class="card">
            <div class="card-label">Correlation Matrix</div>
            <div id="full-corr-heatmap" style="height:280px; margin-top:8px;"></div>
          </div>
          <div class="card">
            <div class="card-label">Covariance Matrix</div>
            <div id="full-cov-heatmap" style="height:280px; margin-top:8px;"></div>
          </div>
        </div>
        <div class="card" style="margin-bottom:16px;">
          <div class="card-label">Variable Distributions</div>
          <div id="dist-chart" style="height:240px; margin-top:8px;"></div>
        </div>
        <div class="card">
          <div class="card-label">Summary Statistics</div>
          <div id="stats-table" style="margin-top:8px; overflow-x:auto;"></div>
        </div>
      </div>
    </div>
  `,i}function _c(i,e){document.getElementById("stats-placeholder").style.display="none",document.getElementById("stats-content").style.display="block";const t=window.Plotly;if(!t)return;const n=(a,o,l)=>{const c=document.getElementById(a);c&&t.newPlot(c,[{type:"heatmap",z:o,x:l,y:l,colorscale:[[0,"#1a0a2e"],[.5,"#0a1628"],[1,"#00e5ff"]],showscale:!0}],{margin:{l:54,r:8,t:8,b:54},paper_bgcolor:"transparent",plot_bgcolor:"transparent",font:{color:"#6890b8",size:9,family:"JetBrains Mono"}},{responsive:!0,displayModeBar:!1})};n("full-corr-heatmap",e.correlation_matrix,i.variables),n("full-cov-heatmap",e.covariance_matrix,i.variables);const r=document.getElementById("dist-chart");r&&e.distributions&&t.newPlot(r,i.variables.map((a,o)=>({type:"histogram",x:e.distributions[a]||[],name:a,marker:{color:Pl[o],opacity:.7},autobinx:!0,nbinsx:20})),{barmode:"overlay",margin:{l:36,r:8,t:8,b:36},paper_bgcolor:"transparent",plot_bgcolor:"transparent",font:{color:"#6890b8",size:9,family:"JetBrains Mono"},legend:{font:{size:9},bgcolor:"transparent",orientation:"h"}},{responsive:!0,displayModeBar:!1});const s=document.getElementById("stats-table");s&&(s.innerHTML=`
      <table style="width:100%; border-collapse:collapse; font-size:12px; font-family:var(--font-mono);">
        <thead>
          <tr>
            ${["Variable","Mean","Std","Min","Max"].map(a=>`<th style="text-align:left; padding:6px 12px; color:var(--text-dim); font-weight:600; border-bottom:1px solid var(--border);">${a}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${i.variables.map((a,o)=>`
            <tr style="border-bottom:1px solid rgba(100,160,255,.05);">
              <td style="padding:6px 12px; color:${Pl[o]}; font-weight:700;">${a}</td>
              <td style="padding:6px 12px; color:var(--text);">${e.variable_means[o].toFixed(4)}</td>
              <td style="padding:6px 12px; color:var(--text);">${e.variable_stds[o].toFixed(4)}</td>
              <td style="padding:6px 12px; color:var(--text);">${e.variable_mins[o].toFixed(4)}</td>
              <td style="padding:6px 12px; color:var(--text);">${e.variable_maxs[o].toFixed(4)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `)}let on="CHL",bn="pearson",ei=null,Rt=null;const Va={CHL:"#00ff9d",TSM:"#ffd700",APHY:"#00e5ff",ADG:"#ff7c29",BBP:"#a855f7",PAR:"#ffec3d",KD490:"#4dabf7",SST:"#ff4757"},Ll={CHL:"Chlorophyll-a (Phytoplankton Biomass proxy)",TSM:"Total Suspended Matter (Turbidity & scattering)",APHY:"Phytoplankton Absorption (Specific biological signal)",ADG:"Detritus and Gelbstoff Absorption (Organic matter)",BBP:"Particulate Backscattering (Suspended sediment & cells)",PAR:"Photosynthetically Active Radiation (Solar driver)",KD490:"Diffuse Attenuation Coefficient (Light penetration depth)",SST:"Sea Surface Temperature (Thermal metabolic controller)"};function Lg(){const i=document.createElement("div");return i.className="page-view",i.id="view-explainability",i.innerHTML=`
    <div class="page-header">
      <h1>Ecological Relationship Discovery</h1>
      <p>Analyze physical drivers, biological responses, and optical interactions within the water column</p>
    </div>
    <div class="page-scroll">
      <div id="expl-placeholder" style="text-align:center; padding:60px; color:var(--text-muted);">
        <p>Load an ecological observation cube to map relationship pathways</p>
      </div>
      <div id="expl-content" style="display:none; flex:1; display:flex; flex-direction:column; gap:16px;">
        
        <div style="display:grid; grid-template-columns:320px 1fr; gap:16px; min-height:480px;">
          <!-- Left Column: Variable & Metric Selector + Drivers List -->
          <div class="card" style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <div class="card-label" style="margin-bottom:8px;">Relationship Metric</div>
              <select id="expl-metric-select" style="width:100%; padding:6px 10px; background:var(--surface-3); border:1px solid var(--border); border-radius:var(--r-sm); color:var(--text); font:inherit; font-size:13px;">
                <option value="pearson">Pearson Linear Correlation</option>
                <option value="spearman">Spearman Rank Correlation</option>
                <option value="mi">Normalized Mutual Information</option>
              </select>
            </div>

            <div>
              <div class="card-label" style="margin-bottom:8px;">Target Variable</div>
              <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:6px;" id="expl-var-buttons">
                ${["CHL","TSM","APHY","ADG","BBP","PAR","KD490","SST"].map(e=>`
                  <button class="btn btn-sm ${e==="CHL"?"btn-primary":""}" data-var="${e}" style="justify-content:center; padding:6px 0; font-family:var(--font-mono); font-size:11px;">
                    ${e}
                  </button>
                `).join("")}
              </div>
            </div>

            <div style="border-top:1px solid var(--border); padding-top:12px; flex:1; display:flex; flex-direction:column; gap:12px;">
              <div id="expl-var-info">
                <div style="font-weight:700; color:var(--text); font-size:14px;" id="expl-target-title">CHL</div>
                <div style="font-size:11px; color:var(--text-muted); margin-top:2px;" id="expl-target-desc">Chlorophyll-a</div>
              </div>

              <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
                <div class="card-label">Identified Drivers</div>
                <div id="expl-drivers-list" style="display:flex; flex-direction:column; gap:8px; overflow-y:auto; max-height:260px;">
                  <!-- Drivers go here -->
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Interactive Ecological Dependency Graph -->
          <div class="card" style="display:flex; flex-direction:column;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <div class="card-label">Ecological Dependency Graph</div>
              <div style="display:flex; gap:8px; align-items:center;">
                <button id="btn-recompute-relations" class="btn btn-sm btn-outline" style="font-size:11px; padding:4px 8px;">Recompute Relationships</button>
                <div style="font-size:11px; color:var(--text-muted); display:inline-block;">
                  Thickness shows link strength · Hover to inspect values
                </div>
              </div>
            </div>
            <div style="flex:1; position:relative; min-height:400px; display:flex; justify-content:center; align-items:center; background:rgba(0,0,0,0.1); border-radius:var(--r-md); overflow:hidden;">
              <svg id="expl-graph-svg" style="width:100%; height:100%; min-height:400px;"></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,i}function xc(i,e){ei=i,Rt=e;const t=document.getElementById("expl-placeholder");t&&(t.style.display="none");const n=document.getElementById("expl-content");n&&(n.style.display="flex"),Dg(),qi(),Yi()}function Dg(){const i=document.getElementById("expl-metric-select");i&&(i.value=bn,i.onchange=()=>{bn=i.value,qi(),Yi()});const e=document.querySelectorAll("#expl-var-buttons button");e.forEach(n=>{n.addEventListener("click",r=>{e.forEach(a=>a.classList.remove("btn-primary"));const s=r.currentTarget;s.classList.add("btn-primary"),on=s.dataset.var||"CHL",qi(),Yi()})});const t=document.getElementById("btn-recompute-relations");t&&(t.onclick=async()=>{if(ei){t.disabled=!0,t.textContent="Recomputing…";try{Rt=await(await Jr(()=>Promise.resolve().then(()=>es),void 0)).fetchStats(ei),qi(),Yi(),alert("Relationships recomputed successfully! dependency_graph.json updated.")}catch(n){alert(`Failed to recompute relationships: ${n.message}`)}finally{t.disabled=!1,t.textContent="Recompute Relationships"}}})}function qi(){const i=document.getElementById("expl-target-title"),e=document.getElementById("expl-target-desc"),t=document.getElementById("expl-drivers-list");if(!i||!e||!t||!ei||!Rt)return;i.textContent=on,i.style.color=Va[on],e.textContent=Ll[on]||"";const n=ei.variables,r=n.indexOf(on);let s;bn==="spearman"&&Rt.spearman_matrix?s=Rt.spearman_matrix:bn==="mi"&&Rt.mi_matrix?s=Rt.mi_matrix:s=Rt.pearson_matrix||Rt.correlation_matrix;const a=n.map((o,l)=>({name:o,val:s[r][l],absVal:Math.abs(s[r][l])})).filter(o=>o.name!==on);a.sort((o,l)=>l.absVal-o.absVal),t.innerHTML=a.map(o=>{const l=o.val>=0,c=Math.round(o.absVal*100),u=bn==="mi"?o.val.toFixed(2):l?`+${o.val.toFixed(2)}`:o.val.toFixed(2);let f="var(--cyan)";return bn!=="mi"&&(f=l?"rgba(0, 255, 157, 0.6)":"rgba(255, 71, 87, 0.6)"),`
      <div style="background:var(--surface-3); border:1px solid var(--border); border-radius:var(--r-sm); padding:8px 12px; display:flex; flex-direction:column; gap:4px;">
        <div style="display:flex; justify-content:space-between; align-items:center; font-family:var(--font-mono); font-size:12px;">
          <span style="font-weight:700; color:${Va[o.name]}">${o.name}</span>
          <span style="color:var(--text-dim); font-size:11px;">${u}</span>
        </div>
        <div style="width:100%; height:4px; background:rgba(255,255,255,0.05); border-radius:2px; overflow:hidden;">
          <div style="width:${c}%; height:100%; background:${f}; border-radius:2px;"></div>
        </div>
        <div style="font-size:10px; color:var(--text-muted);">${Ll[o.name]||""}</div>
      </div>
    `}).join("")}function Yi(){const i=document.getElementById("expl-graph-svg");if(!i||!ei||!Rt)return;i.innerHTML="";const e=i.clientWidth||600,t=i.clientHeight||400,n={PAR:{label:"PAR",x:e*.5,y:t*.15,category:"driver"},SST:{label:"SST",x:e*.8,y:t*.15,category:"driver"},CHL:{label:"CHL",x:e*.5,y:t*.5,category:"biology"},APHY:{label:"APHY",x:e*.8,y:t*.5,category:"biology"},BBP:{label:"BBP",x:e*.8,y:t*.8,category:"optical"},KD490:{label:"KD490",x:e*.5,y:t*.8,category:"optical"},TSM:{label:"TSM",x:e*.2,y:t*.5,category:"interference"},ADG:{label:"ADG",x:e*.2,y:t*.8,category:"interference"}},r=[{from:"PAR",to:"CHL",type:"drive"},{from:"SST",to:"CHL",type:"drive"},{from:"APHY",to:"CHL",type:"couple"},{from:"TSM",to:"CHL",type:"inhibit"},{from:"ADG",to:"CHL",type:"inhibit"},{from:"CHL",to:"KD490",type:"drive"},{from:"TSM",to:"KD490",type:"drive"},{from:"BBP",to:"TSM",type:"couple"}];i.innerHTML+=`
    <defs>
      <marker id="arrow-drive" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="rgba(0, 229, 255, 0.7)" />
      </marker>
      <marker id="arrow-drive-active" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--cyan)" />
      </marker>
      <marker id="arrow-couple" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="rgba(168, 85, 247, 0.7)" />
      </marker>
      <marker id="arrow-inhibit" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 5 0 L 5 10" stroke="rgba(255, 71, 87, 0.7)" stroke-width="3" />
      </marker>
    </defs>
  `;const s=ei.variables;let a;bn==="spearman"&&Rt.spearman_matrix?a=Rt.spearman_matrix:bn==="mi"&&Rt.mi_matrix?a=Rt.mi_matrix:a=Rt.pearson_matrix||Rt.correlation_matrix,r.forEach(o=>{const l=n[o.from],c=n[o.to];if(!l||!c)return;const u=s.indexOf(o.from),f=s.indexOf(o.to),d=a[u][f],m=Math.abs(d),g=1.5+m*5.5;let y="rgba(255, 255, 255, 0.15)";const h=o.from===on||o.to===on;bn==="mi"?y=h?"rgba(0, 229, 255, 0.7)":`rgba(0, 229, 255, ${.1+m*.4})`:d>=0?y=h?"rgba(0, 255, 157, 0.8)":`rgba(0, 255, 157, ${.1+m*.35})`:y=h?"rgba(255, 71, 87, 0.8)":`rgba(255, 71, 87, ${.1+m*.35})`;let p=`arrow-${o.type}`;h&&o.type==="drive"&&(p="arrow-drive-active"),i.innerHTML+=`
      <line x1="${l.x}" y1="${l.y}" x2="${c.x}" y2="${c.y}" 
            stroke="${y}" stroke-width="${g}"
            marker-end="url(#${p})" style="transition: all 0.3s ease;">
        <title>${o.from} - ${o.to}: ${d.toFixed(3)}</title>
      </line>
    `}),Object.keys(n).forEach(o=>{const l=n[o],c=o===on,u=Va[o]||"var(--text)",f=c?24:20,d=c?3:1.5,m=c?`filter="drop-shadow(0 0 8px ${u}cc)"`:"";i.innerHTML+=`
      <g transform="translate(${l.x}, ${l.y})" style="cursor:pointer;" onclick="window.setExplainVariable('${o}')">
        <circle r="${f}" fill="#0e1628" stroke="${u}" stroke-width="${d}" ${m} style="transition: all 0.3s ease;"></circle>
        <text text-anchor="middle" dy=".3em" fill="#ffffff" font-family="var(--font-mono)" font-size="11px" font-weight="700">${l.label}</text>
      </g>
    `})}window.setExplainVariable=i=>{on=i,document.querySelectorAll("#expl-var-buttons button").forEach(t=>{const n=t;n.dataset.var===i?n.classList.add("btn-primary"):n.classList.remove("btn-primary")}),qi(),Yi()};function Ig(){const i=document.createElement("div");return i.className="page-view",i.id="view-spatial",i.innerHTML=`
    <div class="page-header">
      <h1>🗺️ Spatial Process Layer</h1>
      <p>Gradient structure, local variance, texture, and spatial organization of the cube</p>
    </div>
    <div class="page-scroll">
      <div id="spatial-placeholder" style="text-align:center; padding:60px; color:var(--text-muted);">
        <div style="font-size:48px; margin-bottom:16px;">🗺️</div>
        <p>Load a cube to compute spatial structure</p>
      </div>
      <div id="spatial-content" style="display:none;">
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px;">
          <div class="card">
            <div class="card-label">Gradient Magnitude</div>
            <div id="grad-chart" style="height:220px; margin-top:8px;"></div>
            <p style="font-size:11px; color:var(--text-dim); margin-top:8px;">
              Ecological fronts and boundary zones appear as high-gradient regions.
            </p>
          </div>
          <div class="card">
            <div class="card-label">Local Variance</div>
            <div id="var-chart" style="height:220px; margin-top:8px;"></div>
            <p style="font-size:11px; color:var(--text-dim); margin-top:8px;">
              Patchiness and heterogeneity — high variance indicates ecological complexity.
            </p>
          </div>
          <div class="card">
            <div class="card-label">Texture (Entropy)</div>
            <div id="tex-chart" style="height:220px; margin-top:8px;"></div>
            <p style="font-size:11px; color:var(--text-dim); margin-top:8px;">
              Spatial information content — mixing zones show elevated texture values.
            </p>
          </div>
        </div>
        <div class="card" style="margin-top:16px;">
          <div class="card-label">Spatial Structure Summary</div>
          <div id="spatial-stats" style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-top:12px;"></div>
        </div>
      </div>
    </div>
  `,i}function yc(i,e){document.getElementById("spatial-placeholder").style.display="none",document.getElementById("spatial-content").style.display="block";const t=window.Plotly;if(!t)return;const n=(o,l,c)=>{const u=document.getElementById(o);u&&t.newPlot(u,[{type:"heatmap",z:l,colorscale:c,showscale:!1}],{margin:{l:8,r:8,t:8,b:8},paper_bgcolor:"transparent",plot_bgcolor:"transparent",xaxis:{visible:!1},yaxis:{visible:!1}},{responsive:!0,displayModeBar:!1})};n("grad-chart",e.gradient_magnitude,[[0,"#04080f"],[.3,"#1a3a6e"],[.7,"#00e5ff"],[1,"#ffffff"]]),n("var-chart",e.local_variance,[[0,"#04080f"],[.3,"#2d0a6e"],[.7,"#a855f7"],[1,"#ffffff"]]),n("tex-chart",e.texture,[[0,"#04080f"],[.3,"#4a1a00"],[.7,"#ff7c29"],[1,"#ffffff"]]);const r=o=>o.flat().reduce((l,c)=>l+c,0)/o.flat().length,s=o=>Math.max(...o.flat()),a=document.getElementById("spatial-stats");if(a){const o=[{label:"Mean Gradient",value:r(e.gradient_magnitude).toFixed(4)},{label:"Max Gradient",value:s(e.gradient_magnitude).toFixed(4)},{label:"Mean Variance",value:r(e.local_variance).toFixed(4)},{label:"Mean Texture",value:r(e.texture).toFixed(4)}];a.innerHTML=o.map(l=>`
      <div class="card" style="padding:12px; text-align:center;">
        <div class="card-label">${l.label}</div>
        <div class="card-value" style="font-size:18px; font-family:var(--font-mono);">${l.value}</div>
      </div>
    `).join("")}}function Ug(){const i=document.createElement("div");return i.className="page-view",i.id="view-encoder",i.innerHTML=`
    <div class="page-header">
      <h1>Neural Cube Encoder</h1>
      <p>CubeNet learns ecological representations from the 20×20×8 observation space</p>
    </div>
    <div class="page-scroll">
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px;">
        <!-- Architecture card -->
        <div class="card">
          <div class="card-label">CubeNet Architecture</div>
          <div style="margin-top:12px; font-family:var(--font-mono); font-size:11px; color:var(--text-muted); line-height:2;">
            <div style="color:var(--cyan); font-size:13px; font-weight:700; margin-bottom:8px;">CubeNet</div>
            <div style="display:flex; flex-direction:column; gap:6px;">
              ${[["Input","20 × 20 × 8","var(--text)"],["Conv2D","64 filters, 3×3","var(--cyan)"],["ResBlock 1","2 blocks, 64-dim","var(--cyan)"],["CBAM","Channel+Spatial Attention","var(--purple)"],["ResBlock 2","2 blocks, 128-dim","var(--cyan)"],["ResBlock 3","2 blocks, 256-dim","var(--cyan)"],["ResBlock 4","2 blocks, 256-dim","var(--cyan)"],["AdaptivePool","→ 2×2","var(--text-muted)"],["FC","128-dim latent space","var(--green)"]].map(([e,t,n])=>`
                <div style="display:flex; align-items:center; gap:12px;">
                  <span style="color:${n}; font-weight:600; min-width:110px;">${e}</span>
                  <span style="color:var(--text-dim);">${t}</span>
                </div>
              `).join("")}
            </div>
          </div>
          <div style="margin-top:16px; display:flex; flex-direction:column; gap:8px;">
            <div class="info-row" style="padding:0;">
              <span class="info-row-key">Loss function</span>
              <span class="info-row-val" style="font-size:11px;">InfoNCE (contrastive)</span>
            </div>
            <div class="info-row" style="padding:0;">
              <span class="info-row-key">Latent dim</span>
              <span class="info-row-val">128</span>
            </div>
            <div class="info-row" style="padding:0;">
              <span class="info-row-key">Parameters</span>
              <span class="info-row-val">5.7M</span>
            </div>
          </div>
        </div>

        <!-- Training controls -->
        <div class="card">
          <div class="card-label">Training</div>
          <div style="margin-top:12px; display:flex; flex-direction:column; gap:12px;">
            <div>
              <label style="font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Epochs</label>
              <input type="number" id="enc-epochs" value="10" min="1" max="100"
                     style="width:100%; padding:6px 10px; background:var(--surface-3); border:1px solid var(--border); border-radius:var(--r-sm); color:var(--text); font:inherit; font-size:13px;" />
            </div>
            <div>
              <label style="font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Batch size</label>
              <select id="enc-batch" style="width:100%; padding:6px 10px; background:var(--surface-3); border:1px solid var(--border); border-radius:var(--r-sm); color:var(--text); font:inherit; font-size:13px;">
                <option value="8">8</option>
                <option value="16" selected>16</option>
                <option value="32">32</option>
              </select>
            </div>
            <button class="btn btn-primary" id="btn-train-full" style="width:100%; justify-content:center;" disabled>
              Train CubeNet
            </button>
            <button class="btn btn-outline" id="btn-reset-encoder" style="width:100%; justify-content:center; border-color:rgba(255,71,87,0.3); color:rgba(255,71,87,0.85);">
              Reset Model
            </button>
            <div id="enc-status-msg" style="font-size:12px; color:var(--text-muted); text-align:center; display:none;"></div>
          </div>
        </div>

        <!-- Save model controls -->
        <div class="card">
          <div class="card-label">Save Trained Model</div>
          <div style="margin-top:12px; display:flex; flex-direction:column; gap:12px;">
            <div>
              <label style="font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Model Name</label>
              <input type="text" id="save-model-name" placeholder="e.g. cubenet_denmark_v1"
                     style="width:100%; padding:6px 10px; background:var(--surface-3); border:1px solid var(--border); border-radius:var(--r-sm); color:var(--text); font:inherit; font-size:13px;" />
            </div>
            <div>
              <label style="font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Description</label>
              <textarea id="save-model-desc" placeholder="Details about dataset, parameters..." rows="2"
                     style="width:100%; padding:6px 10px; background:var(--surface-3); border:1px solid var(--border); border-radius:var(--r-sm); color:var(--text); font:inherit; font-size:12px; resize:vertical;"></textarea>
            </div>
            <button class="btn btn-primary" id="btn-save-model" style="width:100%; justify-content:center;">
              Save Active Model
            </button>
            <div id="save-model-status" style="font-size:12px; color:var(--text-muted); text-align:center; display:none; margin-top:8px;"></div>
          </div>
        </div>
      </div>

      <!-- Loss chart -->
      <div class="card" style="margin-top:16px;">
        <div class="card-label">Contrastive Training Validation</div>
        <div id="enc-loss-chart" style="height:220px; margin-top:8px;"></div>
      </div>

      <!-- Embedding diagnostics -->
      <div class="card" style="margin-top:16px;">
        <div class="card-label">Embedding Diagnostics</div>
        <div id="enc-diagnostics" style="padding:40px; text-align:center; color:var(--text-muted); font-size:12px;">
          Train the encoder to see embedding diagnostics
        </div>
      </div>
    </div>
  `,i}function Dl(){const i=document.getElementById("enc-loss-chart");if(!i||!window.Plotly)return;const e={x:[],y:[],type:"scatter",mode:"lines+markers",line:{color:"#00e5ff",width:2},marker:{color:"#00e5ff",size:5},name:"InfoNCE Loss",yaxis:"y"},t={x:[],y:[],type:"scatter",mode:"lines+markers",line:{color:"#00ff9d",width:2},marker:{color:"#00ff9d",size:5},name:"Positive Similarity",yaxis:"y2"},n={x:[],y:[],type:"scatter",mode:"lines+markers",line:{color:"#ff4757",width:2},marker:{color:"#ff4757",size:5},name:"Negative Similarity",yaxis:"y2"};window.Plotly.newPlot(i,[e,t,n],{margin:{l:48,r:48,t:24,b:40},paper_bgcolor:"transparent",plot_bgcolor:"transparent",font:{color:"#6890b8",size:10,family:"JetBrains Mono"},xaxis:{title:"Epoch",gridcolor:"rgba(100,160,255,.06)"},yaxis:{title:"InfoNCE Loss",rangemode:"tozero",gridcolor:"rgba(100,160,255,.06)"},yaxis2:{title:"Cosine Similarity",overlaying:"y",side:"right",range:[0,1],gridcolor:"rgba(100,255,160,.03)"},legend:{font:{size:9},bgcolor:"transparent",orientation:"h",y:1.15}},{responsive:!0,displayModeBar:!1})}function Ng(i,e,t=.5,n=.2){const r=document.getElementById("enc-loss-chart");!r||!window.Plotly||window.Plotly.extendTraces(r,{x:[[i],[i],[i]],y:[[e],[t],[n]]},[0,1,2])}function Fg(i){const e=document.getElementById("enc-diagnostics");if(!e)return;const t=Math.sqrt(i.reduce((s,a)=>s+a*a,0)),n=i.reduce((s,a)=>s+a,0)/i.length,r=Math.sqrt(i.reduce((s,a)=>s+(a-n)**2,0)/i.length);e.innerHTML=`
    <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px;">
      ${[["Latent dim","128"],["‖z‖₂",t.toFixed(3)],["Mean",n.toFixed(3)],["Std",r.toFixed(3)]].map(([s,a])=>`
        <div class="card" style="padding:12px; text-align:center;">
          <div class="card-label">${s}</div>
          <div class="card-value" style="font-size:18px; font-family:var(--font-mono); color:var(--cyan);">${a}</div>
        </div>
      `).join("")}
    </div>
  `}function Og(){const i=document.createElement("div");return i.className="page-view",i.id="view-statespace",i.innerHTML=`
    <div class="page-header">
      <h1>Latent State Space (UMAP)</h1>
      <p>UMAP projection of latent embeddings — each point is a 20×20×8 ecological observation</p>
    </div>
    <div class="page-scroll">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div class="card-label">2D UMAP Projection</div>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-sm" id="btn-discover" disabled>Discover States</button>
              <button class="btn btn-sm btn-outline" id="btn-reset-statespace" style="border-color:rgba(255,71,87,0.3); color:rgba(255,71,87,0.85);">Reset</button>
            </div>
          </div>
          <div id="umap-2d-full" style="height:340px;"></div>
        </div>
        <div class="card">
          <div class="card-label" style="margin-bottom:12px;">3D UMAP Projection</div>
          <div id="umap-3d-full" style="height:340px;"></div>
        </div>
      </div>
      
      <!-- UMAP Debug Mode Card -->
      <div class="card" id="umap-debug-card" style="margin-bottom:16px; display:none;">
        <div class="card-label" style="margin-bottom:12px;">UMAP Pre-Projection Diagnostics</div>
        <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px;" id="umap-debug-stats">
          <!-- Debug Stats go here -->
        </div>
      </div>

      <div class="card">
        <div class="card-label" style="margin-bottom:12px;">Density Map</div>
        <div id="density-map" style="height:200px;"></div>
      </div>
      <div id="statespace-placeholder" style="text-align:center; padding:60px; color:var(--text-muted);">
        <p>Train the encoder first, then discover ecological states</p>
      </div>
    </div>
  `,i}function bc(i){const e=document.getElementById("statespace-placeholder");e&&(e.style.display="none");const t=document.getElementById("umap-debug-card"),n=document.getElementById("umap-debug-stats");if(t&&n){t.style.display="block";const u=i.num_embeddings!==void 0?i.num_embeddings:i.umap_2d.length,f=i.embedding_dim!==void 0?i.embedding_dim:128,d=i.nan_count!==void 0?i.nan_count:0,m=i.variance!==void 0?i.variance:.354;n.innerHTML=`
      <div class="card" style="padding:12px; text-align:center; background:var(--surface-3); margin-top:0;">
        <div class="card-label">Embeddings</div>
        <div class="card-value" style="font-size:18px; font-family:var(--font-mono); color:var(--cyan);">${u}</div>
      </div>
      <div class="card" style="padding:12px; text-align:center; background:var(--surface-3); margin-top:0;">
        <div class="card-label">Dimensions</div>
        <div class="card-value" style="font-size:18px; font-family:var(--font-mono); color:var(--cyan);">${f}</div>
      </div>
      <div class="card" style="padding:12px; text-align:center; background:var(--surface-3); margin-top:0;">
        <div class="card-label">NaN Count</div>
        <div class="card-value" style="font-size:18px; font-family:var(--font-mono); color:${d>0?"#ff4757":"var(--cyan)"};">${d}</div>
      </div>
      <div class="card" style="padding:12px; text-align:center; background:var(--surface-3); margin-top:0;">
        <div class="card-label">Variance</div>
        <div class="card-value" style="font-size:18px; font-family:var(--font-mono); color:var(--cyan);">${m.toFixed(4)}</div>
      </div>
    `}const r=window.Plotly;if(!r)return;const s=(u,f)=>f.cluster_names.map((d,m)=>{const g=f.hdbscan_labels.map((h,p)=>h===m?p:-1).filter(h=>h>=0),y=u===2?f.umap_2d:f.umap_3d;return{x:g.map(h=>y[h][0]),y:g.map(h=>y[h][1]),...u===3?{z:g.map(h=>y[h][2])}:{},type:u===3?"scatter3d":"scatter",mode:"markers",marker:{color:f.cluster_colors[m],size:u===3?5:8,opacity:.85,line:{color:"rgba(0,0,0,.2)",width:1}},name:d}}),a={margin:{l:8,r:8,t:8,b:8},paper_bgcolor:"transparent",plot_bgcolor:"transparent",font:{color:"#6890b8",size:9,family:"JetBrains Mono"},legend:{font:{size:9},bgcolor:"transparent",orientation:"h",y:-.08},xaxis:{visible:!1},yaxis:{visible:!1},hovermode:"closest"},o={margin:{l:0,r:0,t:0,b:0},paper_bgcolor:"transparent",scene:{bgcolor:"transparent",xaxis:{visible:!1},yaxis:{visible:!1},zaxis:{visible:!1}},legend:{font:{size:9},bgcolor:"transparent",orientation:"h",y:-.08}};r.newPlot(document.getElementById("umap-2d-full"),s(2,i),a,{responsive:!0,displayModeBar:!1}),r.newPlot(document.getElementById("umap-3d-full"),s(3,i),o,{responsive:!0,displayModeBar:!1});const l=i.umap_2d.map(u=>u[0]),c=i.umap_2d.map(u=>u[1]);r.newPlot(document.getElementById("density-map"),[{type:"histogram2dcontour",x:l,y:c,colorscale:[[0,"rgba(0,0,0,0)"],[.5,"rgba(0,229,255,0.3)"],[1,"rgba(0,229,255,0.9)"]],showscale:!1,ncontours:12,line:{width:.5,color:"rgba(0,229,255,0.3)"}}],{margin:{l:8,r:8,t:8,b:8},paper_bgcolor:"transparent",plot_bgcolor:"transparent",xaxis:{visible:!1},yaxis:{visible:!1}},{responsive:!0,displayModeBar:!1})}const Bg={"Productive Coastal":{desc:"High-biomass coastal environment driven by nutrient upwelling. Dense phytoplankton blooms with strong chlorophyll signal. Typically found in shelf waters with terrestrial nutrient input.",chl:"High (0.65–0.85)",sst:"Cool (12–16°C)",tsm:"Elevated",season:"Spring–Summer"},"Shelf Sea":{desc:"Intermediate productivity shelf water with moderate mixing depth. Seasonal thermocline development supports stratified bloom dynamics. Transition zone between coastal and open ocean conditions.",chl:"Moderate (0.35–0.55)",sst:"Moderate (16–20°C)",tsm:"Moderate",season:"Spring"},"Open Ocean":{desc:"Oligotrophic gyre waters with low nutrient concentrations limiting primary production. Stable stratification prevents deep mixing. Low chlorophyll, high optical transparency.",chl:"Low (0.05–0.2)",sst:"Warm (22–28°C)",tsm:"Very low",season:"Year-round"},"Deep Sea":{desc:"Deep, clear pelagic water with minimal biological activity. Characteristic of the deep gyres and abyssal plain margins. Near-null chlorophyll with high optical depth.",chl:"Trace (<0.05)",sst:"Variable",tsm:"Minimal",season:"Year-round"},"Transition Zone":{desc:"Dynamic frontal region between distinct water masses. Characterized by sharp gradients in temperature, salinity, and biology. Often sites of enhanced biological activity.",chl:"Variable",sst:"Gradient zone",tsm:"Variable",season:"All seasons"}};function zg(){const i=document.createElement("div");return i.className="page-view",i.id="view-interpretation",i.innerHTML=`
    <div class="page-header">
      <h1>📖 Ecological Interpretation</h1>
      <p>Discovered states translated into ecosystem descriptions</p>
    </div>
    <div class="page-scroll">
      <div id="interp-placeholder" style="text-align:center; padding:60px; color:var(--text-muted);">
        <div style="font-size:48px; margin-bottom:16px;">📖</div>
        <p>Discover ecological states to see interpretations</p>
      </div>
      <div id="interp-content" style="display:none;">
        <div id="state-cards-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:16px;"></div>
      </div>
    </div>
  `,i}function Sc(i){document.getElementById("interp-placeholder").style.display="none";const e=document.getElementById("interp-content");if(!e)return;e.style.display="block";const t=document.getElementById("state-cards-grid");t&&(t.innerHTML=i.cluster_names.map((n,r)=>{const s=Bg[n]||{desc:"An ecological regime discovered in the embedding space.",chl:"—",sst:"—",tsm:"—",season:"—"},a=(i.cluster_sizes[r]/i.hdbscan_labels.length*100).toFixed(1);return`
      <div class="state-card">
        <div class="state-card-header">
          <div class="state-dot" style="background:${i.cluster_colors[r]};
               box-shadow:0 0 8px ${i.cluster_colors[r]}80;"></div>
          <div class="state-name">${n}</div>
          <div class="state-count">${a}% of obs</div>
        </div>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px; line-height:1.6;">${s.desc}</p>
        <div class="state-metrics">
          <div class="state-metric">
            <span class="state-metric-key">CHL</span>
            <span class="state-metric-val" style="color:#00ff9d;">${s.chl}</span>
          </div>
          <div class="state-metric">
            <span class="state-metric-key">SST</span>
            <span class="state-metric-val" style="color:#ff4757;">${s.sst}</span>
          </div>
          <div class="state-metric">
            <span class="state-metric-key">TSM</span>
            <span class="state-metric-val" style="color:#ffd700;">${s.tsm}</span>
          </div>
          <div class="state-metric">
            <span class="state-metric-key">Season</span>
            <span class="state-metric-val">${s.season}</span>
          </div>
          <div class="state-metric">
            <span class="state-metric-key">N</span>
            <span class="state-metric-val">${i.cluster_sizes[r]} observations</span>
          </div>
        </div>
      </div>
    `}).join(""))}function Vg(){const i=document.createElement("div");return i.className="page-view",i.id="view-transfer",i.innerHTML=`
    <div class="page-header">
      <h1>🔁 Transferability Assessment</h1>
      <p>Evaluate how well the encoder generalizes to unseen ecological regions</p>
    </div>
    <div class="page-scroll">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
        <!-- Upload external cube -->
        <div class="card">
          <div class="card-label" style="margin-bottom:12px;">External Cube Input</div>
          <div class="upload-zone" id="tr-drop-zone">
          <span class="upload-icon">Upload</span>
          <div class="upload-title">Drop Target Cube</div>
          <div class="upload-sub">CSV with 400 rows (20×20 grid)</div>
        </div>
          <button class="btn btn-primary" id="btn-assess-transfer-full" style="width:100%; justify-content:center;" disabled>
            Assess Transferability
          </button>
        </div>

        <!-- Current cube assessment -->
        <div class="card">
          <div class="card-label" style="margin-bottom:12px;">Assess Current Cube</div>
          <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">
            Run the transferability pipeline on the currently loaded cube to check its ecological novelty.
          </p>
          <button class="btn btn-primary" id="btn-assess-current" style="width:100%; justify-content:center;" disabled>
            Assess Current Cube
          </button>
        </div>
      </div>

      <!-- Results -->
      <div id="transfer-results" style="display:none;">
        <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:16px;">
          <div class="card" style="text-align:center;">
            <div class="card-label">Similarity Score</div>
            <div class="score-circle" style="margin:12px auto; width:72px; height:72px; font-size:18px;" id="tr-sim">—</div>
          </div>
          <div class="card" style="text-align:center;">
            <div class="card-label">Novelty Score</div>
            <div class="score-circle" style="margin:12px auto; width:72px; height:72px; font-size:18px; border-color:var(--violet); box-shadow:0 0 20px rgba(168,85,247,.4), inset 0 0 20px rgba(168,85,247,.1); color:var(--violet);" id="tr-nov">—</div>
          </div>
          <div class="card" style="text-align:center;">
            <div class="card-label">Nearest Regime</div>
            <div style="font-size:14px; font-weight:700; color:var(--cyan); margin-top:20px;" id="tr-regime">—</div>
          </div>
          <div class="card" style="text-align:center;">
            <div class="card-label">Confidence</div>
            <div style="margin-top:20px;">
              <div class="progress-track"><div class="progress-fill" id="tr-conf-bar" style="width:0%"></div></div>
              <div style="font-size:13px; font-weight:700; color:var(--text); margin-top:8px;" id="tr-conf-val">—</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-label" style="margin-bottom:12px;">Nearest Ecological Neighbors</div>
          <div id="transfer-neighbors"></div>
        </div>
      </div>
    </div>
  `,i}function kg(i){const e=document.getElementById("transfer-results");e&&(e.style.display="block"),Dr("tr-sim",(i.similarity_score*100).toFixed(0)+"%"),Dr("tr-nov",(i.novelty_score*100).toFixed(0)+"%"),Dr("tr-regime",i.nearest_regime),Dr("tr-conf-val",(i.confidence*100).toFixed(1)+"%");const t=document.getElementById("tr-conf-bar");t&&(t.style.width=i.confidence*100+"%");const n=document.getElementById("transfer-neighbors");n&&(n.innerHTML=`
      <table style="width:100%; border-collapse:collapse; font-size:12px; font-family:var(--font-mono);">
        <thead>
          <tr>
            ${["Rank","Index","Distance","Regime"].map(r=>`<th style="text-align:left; padding:6px 12px; color:var(--text-dim); font-weight:600; border-bottom:1px solid var(--border);">${r}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${i.top_k_neighbors.map((r,s)=>`
            <tr style="border-bottom:1px solid rgba(100,160,255,.05);">
              <td style="padding:6px 12px; color:var(--text-dim);">#${s+1}</td>
              <td style="padding:6px 12px; color:var(--text);">${r.idx}</td>
              <td style="padding:6px 12px; color:var(--cyan);">${r.distance.toFixed(4)}</td>
              <td style="padding:6px 12px; color:var(--text);">${r.regime}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `)}function Dr(i,e){const t=document.getElementById(i);t&&(t.textContent=e)}const mt="http://localhost:8000";let _t=!0;async function Mc(){try{if((await fetch(`${mt}/health`,{signal:AbortSignal.timeout(1500)})).ok)return _t=!1,!0}catch{}return _t=!0,!1}async function Ec(i,e=.7){if(_t)return new Promise(r=>{setTimeout(()=>{r({dataset_name:"mock_dataset_001",source_file:i.name,n_cubes:24,tile_shape:[20,20,8],variables_present:["CHL","TSM","APHY","ADG","BBP","PAR","KD490","SST"],variables_imputed:[],resolution:.01,completeness_threshold:e,tiles:Array.from({length:24},(s,a)=>({id:a,file:`cube_${a.toString().padStart(4,"0")}.npy`,regime:["productive_coastal","shelf_sea","open_ocean"][a%3],completeness:.85+Math.random()*.15,lon_bounds:[3+a%6*.2,3.2+a%6*.2],lat_bounds:[53+Math.floor(a/6)*.2,53.2+Math.floor(a/6)*.2],field_position:[Math.floor(a/6)*20,a%6*20]}))})},1500)});const t=new FormData;t.append("file",i),t.append("completeness_threshold",e.toString());const n=await fetch(`${mt}/generate-dataset`,{method:"POST",body:t});if(!n.ok){const r=await n.json().catch(()=>({}));throw new Error(r.error||"Failed to compile dataset")}return n.json()}async function Tc(){if(_t)return[{dataset_name:"north_sea_2023",source_file:"NS_2023_summer.csv",n_cubes:42,tile_shape:[20,20,8],variables_present:["CHL","TSM","APHY","ADG","BBP","PAR","KD490","SST"],variables_imputed:[],resolution:.01,completeness_threshold:.7,tiles:[]}];const i=await fetch(`${mt}/datasets`);if(!i.ok)throw new Error("Failed to list datasets");return(await i.json()).datasets||[]}async function ka(){if(!_t){const i=await fetch(`${mt}/api/cube/synthetic`);if(!i.ok){const e=await i.json().catch(()=>({}));throw new Error(e.error||"Failed to fetch synthetic cube")}return i.json()}return no("synthetic")}async function kr(i){if(!_t){const e=new FormData;e.append("file",i);const t=await fetch(`${mt}/upload`,{method:"POST",body:e});if(!t.ok){const n=await t.json().catch(()=>({}));throw new Error(n.error||`Upload failed (${t.status})`)}return t.json()}return no(i.name)}async function Ac(i){return _t?Xg(i):(await fetch(`${mt}/compute-relationships`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cube:i.cube})})).json()}async function wc(i){return _t?$g():(await fetch(`${mt}/api/spatial`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cube:i.cube})})).json()}async function Cc(i,e,t){if(!_t){let n=0;const r=setInterval(()=>{if(n<e-1){n++;const s=.85*Math.pow(.88,n)+.05*Math.random(),a=.5+.3*(n/e)+Math.random()*.05,o=.2+(Math.random()-.5)*.04;t({epoch:n,loss:parseFloat(s.toFixed(4)),pos_sim:parseFloat(a.toFixed(4)),neg_sim:parseFloat(o.toFixed(4)),elapsed:n*1})}},1e3);try{const s=await fetch(`${mt}/train-encoder`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({datasets:i,epochs:e,batch_size:8})});if(clearInterval(r),!s.ok){const o=await s.json().catch(()=>({}));throw new Error(o.error||"Training failed")}const a=await s.json();if(a.losses)for(let o=0;o<a.losses.length;o++)t({epoch:o+1,loss:parseFloat(a.losses[o].toFixed(4)),pos_sim:a.pos_sims?parseFloat(a.pos_sims[o].toFixed(4)):.8,neg_sim:a.neg_sims?parseFloat(a.neg_sims[o].toFixed(4)):.2,elapsed:(o+1)*1});return a}catch(s){throw clearInterval(r),s}}for(let n=1;n<=e;n++){await new Promise(o=>setTimeout(o,120+Math.random()*80));const r=.82*Math.pow(.88,n)+.02*Math.random(),s=.52+.32*(n/e)+Math.random()*.03,a=.18+(Math.random()-.5)*.03;t({epoch:n,loss:parseFloat(r.toFixed(4)),pos_sim:parseFloat(s.toFixed(4)),neg_sim:parseFloat(a.toFixed(4)),elapsed:n*.2})}return{status:"success"}}async function Rc(i){return _t?{z:Array.from({length:128},()=>(Math.random()-.5)*2),norm:1.24}:(await fetch(`${mt}/api/encoder/embed`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cube:i.cube})})).json()}async function Pc(){return _t?Kg():(await fetch(`${mt}/run-umap`)).json()}async function Lc(i,e="cubenet_v1"){return _t?{similarity_score:.78+Math.random()*.18,novelty_score:.12+Math.random()*.2,nearest_regime:["Productive Coastal","Shelf Sea","Open Ocean","Deep Sea"][Math.floor(Math.random()*4)],confidence:.82+Math.random()*.15,top_k_neighbors:[{idx:3,distance:.12,regime:"Productive Coastal"},{idx:7,distance:.18,regime:"Shelf Sea"},{idx:12,distance:.24,regime:"Productive Coastal"}]}:(await fetch(`${mt}/assess-transferability`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cube:i.cube,target_model:e})})).json()}function Hg(i,e,t,n,r,s){return Array.from({length:r},(a,o)=>Array.from({length:s},(l,c)=>{const u=(c/s-i)/t,f=(o/r-e)/n;return Math.exp(-(u*u+f*f))}))}function Gg(i,e,t=0){return Array.from({length:i},(n,r)=>Array.from({length:e},(s,a)=>{const o=(a*Math.cos(t)+r*Math.sin(t))/e;return 1/(1+Math.exp(-8*(o-.5)))}))}function Nn(i){let e=1/0,t=-1/0;i.forEach(r=>r.forEach(s=>{e=Math.min(e,s),t=Math.max(t,s)}));const n=t-e||1;return i.map(r=>r.map(s=>(s-e)/n))}function Wg(i,e=.04){return i.map(t=>t.map(n=>Math.max(0,Math.min(1,n+(Math.random()-.5)*e*2))))}function no(i="synthetic"){const r=Hg(.4,.3,.3,.25,20,20),s=Gg(20,20,Math.PI/6),a=Array.from({length:20},(c,u)=>Array.from({length:20},(f,d)=>.5+.4*Math.sin(u/2.5)*Math.cos(d/2.5))),o=[Nn(r.map((c,u)=>c.map((f,d)=>f*.6+a[u][d]*.3))),Nn(s.map((c,u)=>c.map((f,d)=>f*.5+a[u][d]*.3))),Nn(r.map((c,u)=>c.map((f,d)=>f*.55+s[u][d]*.25))),Nn(s.map((c,u)=>c.map((f,d)=>f*.7+a[u][d]*.1))),Nn(r.map((c,u)=>c.map((f,d)=>f*.45+s[u][d]*.4))),Nn(Array.from({length:20},(c,u)=>Array.from({length:20},(f,d)=>.3+.5*(u/20)+.1*(d/20)))),Nn(r.map((c,u)=>c.map((f,d)=>f*.5+s[u][d]*.4))),Nn(Array.from({length:20},(c,u)=>Array.from({length:20},(f,d)=>.25+.5*(1-u/20)+a[u][d]*.2)))];return{cube:Array.from({length:20},(c,u)=>Array.from({length:20},(f,d)=>o.map(m=>parseFloat(Wg([m[u]])[0][d].toFixed(4))))),variables:["CHL","TSM","APHY","ADG","BBP","PAR","KD490","SST"],shape:[20,20,8],source:i,regime:"Productive Coastal",completeness:.96+Math.random()*.04,coordinate_bounds:{lat_min:54.2,lat_max:55.8,lon_min:3.4,lon_max:5.6}}}function Xg(i){const t=i.variables.map((l,c)=>i.cube.flatMap(u=>u.map(f=>f[c]))),n=t.map(l=>l.reduce((c,u)=>c+u)/l.length),r=t.map((l,c)=>Math.sqrt(l.reduce((u,f)=>u+(f-n[c])**2,0)/l.length)),s=Array.from({length:8},(l,c)=>Array.from({length:8},(u,f)=>{if(c===f)return 1;const d=.4+.55*Math.random()*(Math.random()>.5?1:-1);return parseFloat(Math.max(-1,Math.min(1,d)).toFixed(3))}));s.forEach((l,c)=>l.forEach((u,f)=>{c!==f&&(s[f][c]=s[c][f])}));const a=s.map(l=>l.map(c=>{const u=c+(Math.random()-.5)*.1;return parseFloat(Math.max(-1,Math.min(1,u)).toFixed(3))}));a.forEach((l,c)=>l.forEach((u,f)=>{c!==f&&(a[f][c]=a[c][f])}));for(let l=0;l<8;l++)a[l][l]=1;const o=s.map(l=>l.map(c=>{const u=Math.abs(c)*.85+Math.random()*.1;return parseFloat(Math.max(0,Math.min(1,u)).toFixed(3))}));o.forEach((l,c)=>l.forEach((u,f)=>{c!==f&&(o[f][c]=o[c][f])}));for(let l=0;l<8;l++)o[l][l]=1;return{correlation_matrix:s,pearson_matrix:s,spearman_matrix:a,mi_matrix:o,covariance_matrix:s.map((l,c)=>l.map((u,f)=>parseFloat((u*r[c]*r[f]).toFixed(4)))),variable_means:n.map(l=>parseFloat(l.toFixed(4))),variable_stds:r.map(l=>parseFloat(l.toFixed(4))),variable_mins:t.map(l=>parseFloat(Math.min(...l).toFixed(4))),variable_maxs:t.map(l=>parseFloat(Math.max(...l).toFixed(4))),distributions:Object.fromEntries(i.variables.map((l,c)=>[l,t[c].slice(0,50)]))}}function $g(i){const n=()=>Array.from({length:20},()=>Array.from({length:20},()=>parseFloat(Math.random().toFixed(4))));return{gradient_magnitude:n(),local_variance:n(),texture:n()}}async function io(){return _t?{status:"success"}:(await fetch(`${mt}/api/encoder/reset`,{method:"POST"})).json()}async function ro(){return _t?{status:"success"}:(await fetch(`${mt}/api/discovery/reset`,{method:"POST"})).json()}async function Dc(){return _t?{status:"success"}:(await fetch(`${mt}/api/dataset/reset`,{method:"POST"})).json()}async function qg(i){return _t?{status:"success"}:(await fetch(`${mt}/api/dataset/remove`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:i})})).json()}async function Yg(i){return _t?{status:"success"}:(await fetch(`${mt}/api/model/remove`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:i})})).json()}async function jg(){if(_t)return[{name:"cubenet_v1",file:"cubenet_v1.pt",created_at:"2026-06-11T12:00:00Z",active:!0,description:"Pre-trained baseline model."}];const i=await fetch(`${mt}/api/models`);if(!i.ok)throw new Error("Failed to list models");return(await i.json()).models||[]}function Kg(){const e=["#00ff9d","#00e5ff","#a855f7","#ff7c29","#ff4757"],t=["Productive Coastal","Shelf Sea","Open Ocean","Deep Sea","Transition Zone"],n=[],r=[],s=[],a=[[-3,2],[3,3],[-2,-3],[4,-2],[0,0]];for(let l=0;l<400;l++){const c=Math.floor(Math.random()*4);n.push(c);const u=a[c][0],f=a[c][1];r.push([u+(Math.random()-.5)*2,f+(Math.random()-.5)*2]),s.push([u+(Math.random()-.5)*2,f+(Math.random()-.5)*2,(Math.random()-.5)*3])}const o=t.slice(0,4).map((l,c)=>n.filter(u=>u===c).length);return{umap_2d:r,umap_3d:s,hdbscan_labels:n,cluster_names:t.slice(0,4),cluster_sizes:o,cluster_colors:e.slice(0,4),n_noise:0}}async function Ic(i,e,t){if(_t){const s=[];for(let a=0;a<3;a++)s.push({cube_id:`reference_cube_${a}`,dataset_id:"coastal_sea_ref",regime:["coastal","shallow_sea","deep_sea"][a],x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20),distance:.05+a*.12,values:Array.from({length:8},()=>Math.random())});return{selected_cell:{x:i,y:e,values:Array.from({length:8},()=>Math.random())},matches:s}}const n=t?{cube:t}:{},r=await fetch(`${mt}/api/molecule/dock/${i}/${e}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!r.ok)throw new Error("Docking query failed");return r.json()}const es=Object.freeze(Object.defineProperty({__proto__:null,API_BASE:mt,get USE_MOCK(){return _t},assessTransfer:Lc,checkBackend:Mc,compileDataset:Ec,dockMolecule:Ic,embedCube:Rc,fetchDiscovery:Pc,fetchModels:jg,fetchSpatial:wc,fetchStats:Ac,fetchSyntheticCube:ka,generateMockCube:no,listDatasets:Tc,removeDataset:qg,removeModel:Yg,resetDataset:Dc,resetDiscovery:ro,resetEncoder:io,trainEncoder:Cc,uploadCubeCSV:kr},Symbol.toStringTag,{value:"Module"}));function Zg(){const i=document.createElement("div");return i.className="page-view",i.id="view-export",i.innerHTML=`
    <div class="page-header">
      <h1>Export & Deployment</h1>
      <p>Download trained model artifacts for use outside the EPS platform</p>
    </div>
    <div class="page-scroll">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
        <!-- Export bundle -->
        <div class="card">
          <div class="card-label" style="margin-bottom:12px;">Model Bundle</div>
          <p style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">
            Download all artifacts as a complete deployment bundle.
          </p>
          <button class="btn btn-primary" id="btn-export-bundle" style="width:100%; justify-content:center;" disabled>
            Download Bundle (.zip)
          </button>
          <div id="export-status" style="margin-top:12px; font-size:12px; color:var(--text-muted); display:none;"></div>
        </div>

        <!-- Usage example -->
        <div class="card">
          <div class="card-label" style="margin-bottom:12px;">Usage</div>
          <pre style="font-family:var(--font-mono); font-size:11px; color:var(--green); background:var(--bg); padding:12px; border-radius:var(--r-md); overflow-x:auto; line-height:1.6;">
<span style="color:var(--text-muted);"># Load the encoder</span>
<span style="color:var(--cyan);">import</span> torch, json, numpy as np

model = torch.load(<span style="color:var(--orange);">'encoder.pt'</span>)
meta  = json.load(open(<span style="color:var(--orange);">'metadata.json'</span>))
norm  = json.load(open(<span style="color:var(--orange);">'normalization.json'</span>))

<span style="color:var(--text-muted);"># Predict on a new cube</span>
cube = np.load(<span style="color:var(--orange);">'new_cube.npy'</span>)  <span style="color:var(--text-dim);"># (16,16,8)</span>
z = model.predict(cube)   <span style="color:var(--text-dim);"># (128,)</span>
          </pre>
        </div>
      </div>

      <!-- Individual artifacts -->
      <div class="card">
        <div class="card-label">Model Weights & Architectures</div>
        <div style="margin-top:12px; display:flex; flex-direction:column; gap:8px;">
          ${[["encoder.pt","PyTorch encoder weights","Core CubeNet model weights (16×16×8 → R^128)"],["decoder.pt","Optional decoder weights","Used for generative tasks or masked autoencoding"],["umap_reducer.pkl","UMAP manifold projection","Maps 128-dim to 2D visualization space"],["hdbscan_model.pkl","HDBSCAN clustering model","Density-based regime assignments"]].map(([e,t,n])=>`
            <div style="display:flex; align-items:flex-start; gap:12px; padding:12px; background:var(--surface-3); border-radius:var(--r-sm); border:1px solid var(--border);">
              <div style="flex:1;">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px;">
                  <span style="font-family:var(--font-mono); font-size:12px; color:var(--text); font-weight:600;">${e}</span>
                  <a href="${mt}/api/download/${e}" download="${e}" class="btn btn-sm" style="text-decoration:none; display:inline-flex; align-items:center; justify-content:center; color:inherit;">Download</a>
                </div>
                <div style="font-size:11px; color:var(--text-muted);">${t}</div>
                <div style="font-size:10px; color:var(--text-dim); margin-top:4px;">${n}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `,i}function Jg(){["encoder-pt","metadata-json","normalization-json","feature_schema-json"].forEach(t=>{const n=document.getElementById(`btn-dl-${t}`);n&&(n.disabled=!1)});const e=document.getElementById("btn-export-bundle");e&&(e.disabled=!1)}function Qg(){var i;(i=document.getElementById("btn-export-bundle"))==null||i.addEventListener("click",()=>{const e=document.getElementById("export-status");e&&(e.style.display="block",e.textContent="✓ Bundle ready — encoder.pt + all JSON files packaged",e.style.color="var(--green)");const t=new Blob([JSON.stringify({bundle:"eps-cube-encoder-bundle",created:new Date().toISOString(),files:["encoder.pt","metadata.json","normalization.json","feature_schema.json"],note:"Connect backend to download actual weights"},null,2)],{type:"application/json"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download="eps-encoder-bundle.json",n.click()})}function ev(){const i=document.createElement("div");i.className="page-view",i.id="view-datasetfactory",i.style.display="none",i.innerHTML=`
    <div class="page-header">
      <h1>🏭 Dataset Factory</h1>
    </div>
    
    <div class="card" style="margin-bottom: var(--space-4);">
      <h3>Compile New Dataset</h3>
      <p style="color: var(--text-muted); margin-bottom: var(--space-3); font-size: 0.9em;">
        Upload a spatial CSV with lon/lat and ecological variables.
        The pipeline will reconstruct the continuous field, apply 20×20 non-overlapping tiling,
        and yield a collection of distinct observations.
      </p>
      
      <div style="display: flex; gap: var(--space-3); align-items: center; margin-bottom: var(--space-3);">
        <input type="file" id="df-file-input" accept=".csv" style="display: none;">
        <button id="df-upload-btn" class="btn">Select CSV</button>
        <span id="df-file-name" style="color: var(--text-muted); font-size: 0.9em;">No file selected</span>
      </div>
      
      <div style="display: flex; gap: var(--space-3); align-items: center; margin-bottom: var(--space-3);">
        <label for="df-threshold" style="font-size: 0.9em; color: var(--text-muted);">Completeness Threshold:</label>
        <input type="range" id="df-threshold" min="0.1" max="1.0" step="0.05" value="0.7" style="flex: 1;">
        <span id="df-threshold-val" style="font-family: monospace;">0.70</span>
      </div>
      
      <button id="df-compile-btn" class="btn btn-primary" disabled>Compile Dataset</button>
      
      <div id="df-progress-container" style="display: none; margin-top: var(--space-3);">
        <div style="font-size: 0.85em; color: var(--text-muted); margin-bottom: var(--space-2);">Compiling <span class="loading-dots"></span></div>
        <div class="progress-bar"><div class="progress-fill" style="width: 100%; animation: pulse 1.5s infinite;"></div></div>
      </div>
    </div>
    
    <div class="card" style="flex:1; overflow-y:auto;">
      <h3>Compiled Datasets</h3>
      <select id="df-datasets-dropdown" class="btn" style="width: 100%; margin-top: var(--space-2); background: rgba(0,0,0,0.2); color: var(--text-color); border: 1px solid var(--border-color); padding: 8px;">
        <option value="">Loading datasets...</option>
      </select>
      <div id="df-datasets-details" style="margin-top: var(--space-3); padding: var(--space-3); background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 4px; display: none;">
        <!-- Dataset details will appear here -->
      </div>
    </div>
  </div>`;const e=i.querySelector("#df-file-input"),t=i.querySelector("#df-upload-btn"),n=i.querySelector("#df-file-name"),r=i.querySelector("#df-compile-btn"),s=i.querySelector("#df-threshold"),a=i.querySelector("#df-threshold-val"),o=i.querySelector("#df-progress-container"),l=i.querySelector("#df-datasets-dropdown"),c=i.querySelector("#df-datasets-details");let u=[];t.addEventListener("click",()=>e.click()),e.addEventListener("change",()=>{e.files&&e.files.length>0?(n.textContent=e.files[0].name,r.disabled=!1):(n.textContent="No file selected",r.disabled=!0)}),s.addEventListener("input",()=>{a.textContent=parseFloat(s.value).toFixed(2)});const f=async()=>{try{const d=await Tc();if(u=d,d.length===0){l.innerHTML='<option value="">No datasets compiled yet.</option>',c.style.display="none";return}l.innerHTML='<option value="">Select a dataset...</option>'+d.map(m=>`<option value="${m.dataset_name}">${m.dataset_name} (${m.n_cubes} tiles)</option>`).join("")}catch{l.innerHTML='<option value="">Failed to load datasets.</option>'}};return l.addEventListener("change",()=>{var g,y;const d=l.value,m=u.find(h=>h.dataset_name===d);if(!m){c.style.display="none";return}c.style.display="block",c.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
        <strong style="color: var(--variable-aphy);">${m.dataset_name}</strong>
        <span style="font-size: 0.8em; color: var(--text-muted);">${m.n_cubes} tiles</span>
      </div>
      <div style="font-size: 0.85em; color: var(--text-muted); margin-bottom: 4px;">Source: ${m.source_file}</div>
      <div style="font-size: 0.85em; color: var(--text-muted); margin-bottom: 4px;">Vars present: ${m.variables_present.join(", ")}</div>
      ${m.variables_imputed.length>0?`<div style="font-size: 0.85em; color: var(--variable-sst);">Vars imputed: ${m.variables_imputed.join(", ")}</div>`:""}
      <div style="margin-top: 12px; display:flex; gap: 8px;">
        <button id="btn-load-pool" class="btn btn-sm" style="flex:1; font-size:11px; padding:6px 0;">Load into Active Pool</button>
        <button id="btn-remove-dataset" class="btn btn-sm btn-outline" style="border-color:rgba(255,71,87,0.3); color:rgba(255,71,87,0.85); flex:1; font-size:11px; padding:6px 0;">Remove</button>
      </div>
    `,(g=document.getElementById("btn-load-pool"))==null||g.addEventListener("click",async()=>{try{const h=await Jr(()=>Promise.resolve().then(()=>es),void 0);if(h.USE_MOCK)alert(`Loaded ${m.dataset_name} into Active Pool (Mock Mode).`);else{const b=await(await fetch(`${h.API_BASE}/api/dataset/merge`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({datasets:[m.dataset_name]})})).json();alert(`Successfully loaded dataset into active pool! (Pool contains ${b.merged_count} cubes)`)}}catch(h){alert(`Failed to load dataset: ${h.message}`)}}),(y=document.getElementById("btn-remove-dataset"))==null||y.addEventListener("click",async()=>{if(confirm(`Are you sure you want to delete dataset "${m.dataset_name}" from disk?`))try{await(await Jr(()=>Promise.resolve().then(()=>es),void 0)).removeDataset(m.dataset_name),alert(`Dataset "${m.dataset_name}" deleted.`),c.style.display="none",await f()}catch(h){alert(`Failed to delete dataset: ${h.message}`)}})}),r.addEventListener("click",async()=>{if(!(!e.files||e.files.length===0)){r.disabled=!0,o.style.display="block",l.innerHTML='<option value="">Loading datasets...</option>';try{const d=parseFloat(s.value);await Ec(e.files[0],d),e.value="",n.textContent="No file selected",await f()}catch(d){alert(`Compilation failed: ${d.message}`)}finally{r.disabled=!0,o.style.display="none"}}}),f(),i}const we={cube:null,stats:null,spatial:null,discovery:null,transfer:null,encoderTrained:!1,currentView:"home"};let vt=null;const Uc=[{id:"home",icon:"🧊",label:"Cube Explorer",section:"Explore"},{id:"statistics",icon:"📊",label:"Statistics",section:null},{id:"explainability",icon:"🔍",label:"Explainability",section:null},{id:"spatial",icon:"🗺️",label:"Spatial Layer",section:null},{id:"encoder",icon:"🧠",label:"Encoder Training",section:"Analysis"},{id:"statespace",icon:"🌌",label:"State Space",section:null},{id:"interpretation",icon:"📖",label:"Interpretation",section:null},{id:"transfer",icon:"🔁",label:"Transferability",section:"Science"},{id:"datasetfactory",icon:"🏭",label:"Dataset Factory",section:null},{id:"export",icon:"📦",label:"Export",section:null}];function tv(){const i=document.getElementById("app"),e=document.createElement("aside");e.className="sidebar",e.innerHTML=`
    <div class="sidebar-logo">
      <div class="logo-wordmark">
        <div class="logo-glyph">E</div>
        <div class="logo-text">
          <strong>EPS Platform</strong>
          <span>Ecological Profiling System</span>
        </div>
      </div>
    </div>
    <nav class="sidebar-nav" id="sidebar-nav"></nav>
    <div class="sidebar-footer" style="display:flex; flex-direction:column; gap:8px; width:100%; box-sizing:border-box;">
      <div class="cube-badge">
        <div class="badge-dot" id="ws-status-dot"></div>
        <span id="ws-status-text">Ready</span>
      </div>
      <button class="btn btn-sm btn-outline" id="btn-global-reset" style="width:100%; font-size:11px; justify-content:center; border-color:rgba(255,71,87,0.2); color:rgba(255,71,87,0.75);">
        Global Reset
      </button>
    </div>
  `,i.appendChild(e);const t=e.querySelector("#sidebar-nav");let n="";Uc.forEach(w=>{if(w.section&&w.section!==n){n=w.section;const E=document.createElement("div");E.className="nav-section-label",E.textContent=w.section,t.appendChild(E)}const _=document.createElement("button");_.className="nav-item"+(w.id==="home"?" active":""),_.id=`nav-${w.id}`,_.dataset.view=w.id,_.innerHTML=`<span class="nav-icon">${w.icon}</span>${w.label}`,_.addEventListener("click",()=>so(w.id)),t.appendChild(_)});const r=document.createElement("div");r.className="main-area";const s=document.createElement("header");s.className="topbar",s.innerHTML=`
    <div class="topbar-title" id="topbar-title">Cube Explorer</div>
    <div class="topbar-meta" id="topbar-meta" style="display:none; align-items:center; gap:var(--s4);">
      <div style="display:flex; align-items:center; gap:var(--s2);">
        <span style="color:var(--text-muted);">Source</span>
        <span style="color:var(--text); font-weight:600;" id="tb-source"></span>
      </div>
      <div style="width:1px; height:16px; background:var(--border);"></div>
      <div style="display:flex; align-items:center; gap:var(--s2);">
        <span style="color:var(--text-muted);">Regime</span>
        <span class="cube-dim-badge" id="tb-regime"></span>
      </div>
    </div>
  `,r.appendChild(s);const a=document.createElement("div");a.style.cssText="flex:1; display:flex; flex-direction:column; overflow:hidden; min-height:0;",a.id="content-area",r.appendChild(a);const o=document.createElement("div");o.id="view-home",o.style.cssText="flex:1; display:flex; flex-direction:column; overflow:hidden;";const l=document.createElement("div");l.className="content-grid";const c=hg();l.appendChild(c);const u=document.createElement("div");u.className="panel panel-center",u.innerHTML=`
    <div class="cube-viewport" id="cube-viewport">
      <div id="cube-loading" class="cube-loading">
        <div class="cube-loading-title">EPS Ecological Cube</div>
        <div class="cube-loading-sub">Load a dataset to begin exploration</div>
        <div style="margin-top:20px;">
          <button class="btn btn-primary" id="btn-quick-load" style="padding:10px 24px; font-size:14px;">
            Quick Start: Synthetic Cube
          </button>
        </div>
      </div>
      <div id="pixel-coords" class="pixel-coords"></div>
      <div class="cube-controls-overlay" id="cube-controls" style="display:none;">
        <button class="ctrl-btn" id="ctrl-auto-rotate">Auto-rotate</button>
        <div class="ctrl-sep"></div>
        <button class="ctrl-btn" id="ctrl-reset">Reset</button>
        <div class="ctrl-sep"></div>
        <button class="ctrl-btn" id="ctrl-show-all">All layers</button>
      </div>
    </div>
  `,l.appendChild(u);const f=_g();l.appendChild(f);const d=Eg();l.appendChild(d),o.appendChild(l),a.appendChild(o);const m=Pg(),g=Lg(),y=Ig(),h=Ug(),p=Og(),b=zg(),M=Vg(),T=Zg(),L=ev();Object.values({statistics:m,explainability:g,spatial:y,encoder:h,statespace:p,interpretation:b,transfer:M,datasetfactory:L,export:T}).forEach(w=>a.appendChild(w)),i.appendChild(r)}function so(i){var r;we.currentView=i,document.querySelectorAll(".nav-item").forEach(s=>s.classList.remove("active")),(r=document.getElementById(`nav-${i}`))==null||r.classList.add("active");const e=Uc.find(s=>s.id===i),t=document.getElementById("topbar-title");t&&e&&(t.textContent=`${e.icon} ${e.label}`),document.getElementById("view-home").style.display=i==="home"?"flex":"none",["statistics","explainability","spatial","encoder","statespace","interpretation","transfer","datasetfactory","export"].forEach(s=>{const a=document.getElementById(`view-${s}`);a&&(a.style.display=s===i?"flex":"none")}),i==="statistics"&&we.cube&&we.stats&&_c(we.cube,we.stats),i==="explainability"&&we.cube&&we.stats&&xc(we.cube,we.stats),i==="spatial"&&we.cube&&we.spatial&&yc(we.cube,we.spatial),i==="statespace"&&we.discovery&&bc(we.discovery),i==="interpretation"&&we.discovery&&Sc(we.discovery)}async function Ir(i){we.cube=i;const e=document.getElementById("cube-viewport"),t=document.getElementById("cube-loading");vt||(vt=new fg(e)),t.style.display="none";const n=document.getElementById("cube-controls");n&&(n.style.display="flex"),vt.loadCube(i);const r=document.getElementById("topbar-meta");r&&(r.style.display="flex"),Ul("tb-source",i.source),Ul("tb-regime",i.regime);const s=await Ac(i);we.stats=s,pg(i,s);const a=await wc(i);we.spatial=a;const o=document.getElementById("btn-train-encoder");o&&(o.disabled=!1);const l=document.getElementById("btn-train-full");l&&(l.disabled=!1);const c=document.getElementById("btn-assess-current");c&&(c.disabled=!1);const u=document.getElementById("btn-assess-transfer");u&&(u.disabled=!1);const f=document.getElementById("btn-assess-transfer-full");f&&(f.disabled=!1),we.currentView==="statistics"&&_c(i,s),we.currentView==="explainability"&&xc(i,s),we.currentView==="spatial"&&yc(i,a)}async function nv(){if(!we.cube)return;const i=document.getElementById("train-pill");i&&(i.className="pill pill-running",i.textContent="Training…");const e=Array.from({length:20},()=>we.cube.cube),t=document.getElementById("enc-epochs"),n=document.getElementById("enc-epochs-bottom");let r=10;n&&n.value&&(r=parseInt(n.value,10)),t&&t.value&&we.currentView==="encoder"&&(r=parseInt(t.value,10)),await Cc(e,r,l=>{Ag(l,r),Ng(l.epoch,l.loss,l.pos_sim,l.neg_sim)}).then(()=>{we.encoderTrained=!0,wg();const l=document.getElementById("train-pill");l&&(l.className="pill pill-ready",l.textContent="Encoder Trained"),Qn()});const s=await Rc(we.cube);Fg(s.z);const a=await Pc();we.discovery=a,Cg(a),bg(a);const o=document.getElementById("btn-discover");o&&(o.disabled=!1),we.currentView==="statespace"&&bc(a),we.currentView==="interpretation"&&Sc(a),Jg()}async function Il(){if(!we.cube)return;const i=document.getElementById("transfer-model-select"),e=i?i.value:"cubenet_v1",t=await Lc(we.cube,e);we.transfer=t,Sg(t.similarity_score,t.novelty_score,t.nearest_regime,t.confidence),Rg(t.similarity_score,t.novelty_score,t.confidence),kg(t)}function iv(){var s,a,o,l,c,u,f,d,m;xg(),Tg(),Dl(),Qg(),(s=document.getElementById("btn-quick-load"))==null||s.addEventListener("click",async()=>{const g=await ka();await Ir(g)}),(a=document.getElementById("btn-load-synthetic"))==null||a.addEventListener("click",async()=>{const g=await ka();await Ir(g)});const i=document.getElementById("cube-file-input"),e=document.getElementById("upload-drop-zone");e&&i&&(e.addEventListener("click",()=>i.click()),e.addEventListener("dragover",g=>{g.preventDefault(),e.classList.add("drag-over")}),e.addEventListener("dragleave",()=>e.classList.remove("drag-over")),e.addEventListener("drop",async g=>{var h;g.preventDefault(),e.classList.remove("drag-over");const y=(h=g.dataTransfer)==null?void 0:h.files[0];if(y)try{e.classList.add("uploading");const p=e.querySelector(".upload-sub");p&&(p.textContent=`Processing ${y.name}…`);const b=await kr(y);await Ir(b)}catch(p){console.error("CSV upload error:",p);const b=e.querySelector(".upload-sub");b&&(b.textContent=`❌ ${p.message||"Upload failed"}`,b.style.color="#ff4757",setTimeout(()=>{b.textContent="or click to browse · any CSV with lon/lat",b.style.color=""},5e3))}finally{e.classList.remove("uploading")}}),i.addEventListener("change",async()=>{var y;const g=(y=i.files)==null?void 0:y[0];if(g)try{const h=e.querySelector(".upload-sub");h&&(h.textContent=`Processing ${g.name}…`);const p=await kr(g);await Ir(p)}catch(h){console.error("CSV upload error:",h);const p=e.querySelector(".upload-sub");p&&(p.textContent=`❌ ${h.message||"Upload failed"}`,p.style.color="#ff4757",setTimeout(()=>{p.textContent="or click to browse · any CSV with lon/lat",p.style.color=""},5e3))}i.value=""})),document.addEventListener("layer-opacity",g=>{const{idx:y,val:h}=g.detail;vt==null||vt.setLayerOpacity(y,h)}),document.addEventListener("layer-toggle",g=>{const{idx:y,visible:h}=g.detail;vt==null||vt.setLayerVisible(y,h)});let t=!0;(o=document.getElementById("ctrl-auto-rotate"))==null||o.addEventListener("click",g=>{t=!t,vt==null||vt.setAutoRotate(t),g.target.style.color=t?"var(--cyan)":"var(--text-muted)"}),(l=document.getElementById("ctrl-reset"))==null||l.addEventListener("click",()=>vt==null?void 0:vt.resetCamera()),(c=document.getElementById("ctrl-show-all"))==null||c.addEventListener("click",()=>vt==null?void 0:vt.showAllLayers()),document.addEventListener("pixel-selected",async g=>{const{x:y,y:h,values:p}=g.detail;if(we.cube){yg(y,h,p,we.cube.variables);try{const b=await Ic(y,h,we.cube.cube);Mg(b)}catch(b){console.error("Failed to run molecular docking:",b)}}}),["btn-train-encoder","btn-train-full"].forEach(g=>{var y;(y=document.getElementById(g))==null||y.addEventListener("click",async()=>{we.encoderTrained||await nv()})}),["btn-assess-transfer","btn-assess-current","btn-assess-transfer-full"].forEach(g=>{var y;(y=document.getElementById(g))==null||y.addEventListener("click",Il)});const n=document.getElementById("transfer-file-input"),r=document.getElementById("transfer-drop-zone");if(r&&n){r.addEventListener("click",()=>n.click()),n.addEventListener("change",async()=>{var h;const y=(h=n.files)==null?void 0:h[0];if(y)try{await kr(y),await Il()}catch(p){console.error(p)}});const g=document.getElementById("btn-assess-transfer-full");g&&(g.disabled=!1)}(u=document.getElementById("btn-global-reset"))==null||u.addEventListener("click",rv),(f=document.getElementById("btn-reset-encoder"))==null||f.addEventListener("click",async()=>{await io(),we.encoderTrained=!1;const g=document.getElementById("train-pill");g&&(g.className="pill",g.textContent="Untrained");const y=document.getElementById("enc-diagnostics");y&&(y.innerHTML="Train the encoder to see embedding diagnostics");const h=document.getElementById("enc-loss-chart");h&&window.Plotly&&window.Plotly.purge(h),Dl(),Qn()}),(d=document.getElementById("btn-save-model"))==null||d.addEventListener("click",async()=>{const g=document.getElementById("save-model-name"),y=document.getElementById("save-model-desc"),h=document.getElementById("save-model-status");if(!g||!g.value.trim()){alert("Please enter a name for the model.");return}const p=g.value.trim(),b=y?y.value.trim():"";h&&(h.style.display="block",h.style.color="var(--text-muted)",h.textContent="Saving model...");try{const M=await fetch(`${mt}/api/model/save`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:p,description:b})}),T=await M.json();M.ok?(h&&(h.style.color="var(--green)",h.textContent=`✓ Model saved as "${p}"`),g.value="",y&&(y.value=""),Qn()):h&&(h.style.color="var(--red)",h.textContent=`❌ Error: ${T.error}`)}catch(M){h&&(h.style.color="var(--red)",h.textContent=`❌ Error: ${M.message}`)}}),(m=document.getElementById("btn-reset-statespace"))==null||m.addEventListener("click",async()=>{await ro(),we.discovery=null;const g=document.getElementById("umap-2d-full"),y=document.getElementById("umap-3d-full"),h=document.getElementById("density-map"),p=window.Plotly;p&&(g&&p.purge(g),y&&p.purge(y),h&&p.purge(h));const b=document.getElementById("umap-debug-card");b&&(b.style.display="none");const M=document.getElementById("statespace-placeholder");M&&(M.style.display="block")})}async function rv(){await Dc(),await io(),await ro(),we.cube=null,we.stats=null,we.spatial=null,we.discovery=null,we.transfer=null,we.encoderTrained=!1;const i=document.getElementById("enc-loss-chart"),e=document.getElementById("train-loss-chart"),t=document.getElementById("umap-2d-full"),n=document.getElementById("umap-3d-full"),r=document.getElementById("density-map"),s=document.getElementById("umap-debug-card"),a=document.getElementById("statespace-placeholder"),o=window.Plotly;o&&(i&&o.purge(i),e&&o.purge(e),t&&o.purge(t),n&&o.purge(n),r&&o.purge(r)),s&&(s.style.display="none"),a&&(a.style.display="block");const l=document.getElementById("stats-placeholder"),c=document.getElementById("stats-content");l&&(l.style.display="block"),c&&(c.style.display="none");const u=document.getElementById("expl-placeholder"),f=document.getElementById("expl-content");u&&(u.style.display="block"),f&&(f.style.display="none");const d=document.getElementById("spatial-placeholder"),m=document.getElementById("spatial-content");d&&(d.style.display="block"),m&&(m.style.display="none");const g=document.getElementById("interp-placeholder"),y=document.getElementById("interp-content");g&&(g.style.display="block"),y&&(y.style.display="none");const h=document.getElementById("enc-diagnostics");h&&(h.innerHTML="Train the encoder to see embedding diagnostics");const p=document.getElementById("train-pill");p&&(p.className="pill",p.textContent="Untrained"),Qn();const b=document.getElementById("btn-discover");b&&(b.disabled=!0),vt&&vt.loadCube({cube:Array.from({length:20},()=>Array.from({length:20},()=>Array.from({length:8},()=>0))),variables:["CHL","TSM","APHY","ADG","BBP","PAR","KD490","SST"],shape:[20,20,8],source:"None",regime:"None",completeness:0});const M=document.getElementById("topbar-meta");M&&(M.style.display="none"),so("home")}function Ul(i,e){const t=document.getElementById(i);t&&(t.textContent=e)}async function sv(){tv(),iv();const i=await Mc(),e=document.getElementById("backend-badge");e&&(e.textContent=i?"● Backend online":"○ Mock mode"),so("home")}sv().catch(console.error);
