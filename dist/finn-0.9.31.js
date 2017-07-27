/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/v4.1.9/LICENSE
 */
(function(e,t){"use strict";if(typeof define==="function"&&define.amd){define(t)}else if(typeof exports==="object"){module.exports=t()}else{e.returnExports=t()}})(this,function(){var e=Array;var t=e.prototype;var r=Object;var n=r.prototype;var a=Function.prototype;var i=String;var o=i.prototype;var l=Number;var u=l.prototype;var f=t.slice;var s=t.splice;var c=t.push;var v=t.unshift;var p=t.concat;var h=a.call;var g=Math.max;var y=Math.min;var d=n.toString;var w=typeof Symbol==="function"&&typeof Symbol.toStringTag==="symbol";var m;var b=Function.prototype.toString,T=function Me(e){try{b.call(e);return true}catch(t){return false}},x="[object Function]",O="[object GeneratorFunction]";m=function Fe(e){if(typeof e!=="function"){return false}if(w){return T(e)}var t=d.call(e);return t===x||t===O};var S;var j=RegExp.prototype.exec,E=function Re(e){try{j.call(e);return true}catch(t){return false}},I="[object RegExp]";S=function Ae(e){if(typeof e!=="object"){return false}return w?E(e):d.call(e)===I};var D;var N=String.prototype.valueOf,k=function Ue(e){try{N.call(e);return true}catch(t){return false}},M="[object String]";D=function $e(e){if(typeof e==="string"){return true}if(typeof e!=="object"){return false}return w?k(e):d.call(e)===M};var F=function(e){var t=r.defineProperty&&function(){try{var e={};r.defineProperty(e,"x",{enumerable:false,value:e});for(var t in e){return false}return e.x===e}catch(n){return false}}();var n;if(t){n=function(e,t,n,a){if(!a&&t in e){return}r.defineProperty(e,t,{configurable:true,enumerable:false,writable:true,value:n})}}else{n=function(e,t,r,n){if(!n&&t in e){return}e[t]=r}}return function a(t,r,i){for(var o in r){if(e.call(r,o)){n(t,o,r[o],i)}}}}(n.hasOwnProperty);var R=function Ce(e){var t=typeof e;return e===null||t!=="object"&&t!=="function"};var A={ToInteger:function Pe(e){var t=+e;if(t!==t){t=0}else if(t!==0&&t!==1/0&&t!==-(1/0)){t=(t>0||-1)*Math.floor(Math.abs(t))}return t},ToPrimitive:function Ze(e){var t,r,n;if(R(e)){return e}r=e.valueOf;if(m(r)){t=r.call(e);if(R(t)){return t}}n=e.toString;if(m(n)){t=n.call(e);if(R(t)){return t}}throw new TypeError},ToObject:function(e){if(e==null){throw new TypeError("can't convert "+e+" to object")}return r(e)},ToUint32:function Je(e){return e>>>0}};var U=function ze(){};F(a,{bind:function Be(e){var t=this;if(!m(t)){throw new TypeError("Function.prototype.bind called on incompatible "+t)}var n=f.call(arguments,1);var a;var i=function(){if(this instanceof a){var i=t.apply(this,p.call(n,f.call(arguments)));if(r(i)===i){return i}return this}else{return t.apply(e,p.call(n,f.call(arguments)))}};var o=g(0,t.length-n.length);var l=[];for(var u=0;u<o;u++){c.call(l,"$"+u)}a=Function("binder","return function ("+l.join(",")+"){ return binder.apply(this, arguments); }")(i);if(t.prototype){U.prototype=t.prototype;a.prototype=new U;U.prototype=null}return a}});var $=h.bind(n.hasOwnProperty);var C=h.bind(n.toString);var P=h.bind(o.slice);var Z=h.bind(o.split);var J=e.isArray||function Ge(e){return C(e)==="[object Array]"};var z=[].unshift(0)!==1;F(t,{unshift:function(){v.apply(this,arguments);return this.length}},z);F(e,{isArray:J});var B=r("a");var G=B[0]!=="a"||!(0 in B);var H=function He(e){var t=true;var r=true;if(e){e.call("foo",function(e,r,n){if(typeof n!=="object"){t=false}});e.call([1],function(){"use strict";r=typeof this==="string"},"x")}return!!e&&t&&r};F(t,{forEach:function Le(e){var t=A.ToObject(this);var r=G&&D(this)?Z(this,""):t;var n=-1;var a=r.length>>>0;var i;if(arguments.length>1){i=arguments[1]}if(!m(e)){throw new TypeError("Array.prototype.forEach callback must be a function")}while(++n<a){if(n in r){if(typeof i!=="undefined"){e.call(i,r[n],n,t)}else{e(r[n],n,t)}}}}},!H(t.forEach));F(t,{map:function Xe(t){var r=A.ToObject(this);var n=G&&D(this)?Z(this,""):r;var a=n.length>>>0;var i=e(a);var o;if(arguments.length>1){o=arguments[1]}if(!m(t)){throw new TypeError("Array.prototype.map callback must be a function")}for(var l=0;l<a;l++){if(l in n){if(typeof o!=="undefined"){i[l]=t.call(o,n[l],l,r)}else{i[l]=t(n[l],l,r)}}}return i}},!H(t.map));F(t,{filter:function Ye(e){var t=A.ToObject(this);var r=G&&D(this)?Z(this,""):t;var n=r.length>>>0;var a=[];var i;var o;if(arguments.length>1){o=arguments[1]}if(!m(e)){throw new TypeError("Array.prototype.filter callback must be a function")}for(var l=0;l<n;l++){if(l in r){i=r[l];if(typeof o==="undefined"?e(i,l,t):e.call(o,i,l,t)){c.call(a,i)}}}return a}},!H(t.filter));F(t,{every:function qe(e){var t=A.ToObject(this);var r=G&&D(this)?Z(this,""):t;var n=r.length>>>0;var a;if(arguments.length>1){a=arguments[1]}if(!m(e)){throw new TypeError("Array.prototype.every callback must be a function")}for(var i=0;i<n;i++){if(i in r&&!(typeof a==="undefined"?e(r[i],i,t):e.call(a,r[i],i,t))){return false}}return true}},!H(t.every));F(t,{some:function Ke(e){var t=A.ToObject(this);var r=G&&D(this)?Z(this,""):t;var n=r.length>>>0;var a;if(arguments.length>1){a=arguments[1]}if(!m(e)){throw new TypeError("Array.prototype.some callback must be a function")}for(var i=0;i<n;i++){if(i in r&&(typeof a==="undefined"?e(r[i],i,t):e.call(a,r[i],i,t))){return true}}return false}},!H(t.some));var L=false;if(t.reduce){L=typeof t.reduce.call("es5",function(e,t,r,n){return n})==="object"}F(t,{reduce:function Qe(e){var t=A.ToObject(this);var r=G&&D(this)?Z(this,""):t;var n=r.length>>>0;if(!m(e)){throw new TypeError("Array.prototype.reduce callback must be a function")}if(n===0&&arguments.length===1){throw new TypeError("reduce of empty array with no initial value")}var a=0;var i;if(arguments.length>=2){i=arguments[1]}else{do{if(a in r){i=r[a++];break}if(++a>=n){throw new TypeError("reduce of empty array with no initial value")}}while(true)}for(;a<n;a++){if(a in r){i=e(i,r[a],a,t)}}return i}},!L);var X=false;if(t.reduceRight){X=typeof t.reduceRight.call("es5",function(e,t,r,n){return n})==="object"}F(t,{reduceRight:function Ve(e){var t=A.ToObject(this);var r=G&&D(this)?Z(this,""):t;var n=r.length>>>0;if(!m(e)){throw new TypeError("Array.prototype.reduceRight callback must be a function")}if(n===0&&arguments.length===1){throw new TypeError("reduceRight of empty array with no initial value")}var a;var i=n-1;if(arguments.length>=2){a=arguments[1]}else{do{if(i in r){a=r[i--];break}if(--i<0){throw new TypeError("reduceRight of empty array with no initial value")}}while(true)}if(i<0){return a}do{if(i in r){a=e(a,r[i],i,t)}}while(i--);return a}},!X);var Y=t.indexOf&&[0,1].indexOf(1,2)!==-1;F(t,{indexOf:function We(e){var t=G&&D(this)?Z(this,""):A.ToObject(this);var r=t.length>>>0;if(r===0){return-1}var n=0;if(arguments.length>1){n=A.ToInteger(arguments[1])}n=n>=0?n:g(0,r+n);for(;n<r;n++){if(n in t&&t[n]===e){return n}}return-1}},Y);var q=t.lastIndexOf&&[0,1].lastIndexOf(0,-3)!==-1;F(t,{lastIndexOf:function _e(e){var t=G&&D(this)?Z(this,""):A.ToObject(this);var r=t.length>>>0;if(r===0){return-1}var n=r-1;if(arguments.length>1){n=y(n,A.ToInteger(arguments[1]))}n=n>=0?n:r-Math.abs(n);for(;n>=0;n--){if(n in t&&e===t[n]){return n}}return-1}},q);var K=function(){var e=[1,2];var t=e.splice();return e.length===2&&J(t)&&t.length===0}();F(t,{splice:function et(e,t){if(arguments.length===0){return[]}else{return s.apply(this,arguments)}}},!K);var Q=function(){var e={};t.splice.call(e,0,0,1);return e.length===1}();F(t,{splice:function tt(e,t){if(arguments.length===0){return[]}var r=arguments;this.length=g(A.ToInteger(this.length),0);if(arguments.length>0&&typeof t!=="number"){r=f.call(arguments);if(r.length<2){c.call(r,this.length-e)}else{r[1]=A.ToInteger(t)}}return s.apply(this,r)}},!Q);var V=function(){var t=new e(1e5);t[8]="x";t.splice(1,1);return t.indexOf("x")===7}();var W=function(){var e=256;var t=[];t[e]="a";t.splice(e+1,0,"b");return t[e]==="a"}();F(t,{splice:function rt(e,t){var r=A.ToObject(this);var n=[];var a=A.ToUint32(r.length);var o=A.ToInteger(e);var l=o<0?g(a+o,0):y(o,a);var u=y(g(A.ToInteger(t),0),a-l);var s=0;var c;while(s<u){c=i(l+s);if($(r,c)){n[s]=r[c]}s+=1}var v=f.call(arguments,2);var p=v.length;var h;if(p<u){s=l;while(s<a-u){c=i(s+u);h=i(s+p);if($(r,c)){r[h]=r[c]}else{delete r[h]}s+=1}s=a;while(s>a-u+p){delete r[s-1];s-=1}}else if(p>u){s=a-u;while(s>l){c=i(s+u-1);h=i(s+p-1);if($(r,c)){r[h]=r[c]}else{delete r[h]}s-=1}}s=l;for(var d=0;d<v.length;++d){r[s]=v[d];s+=1}r.length=a-u+p;return n}},!V||!W);var _=!{toString:null}.propertyIsEnumerable("toString");var ee=function(){}.propertyIsEnumerable("prototype");var te=!$("x","0");var re=function(e){var t=e.constructor;return t&&t.prototype===e};var ne={$window:true,$console:true,$parent:true,$self:true,$frames:true,$webkitIndexedDB:true,$webkitStorageInfo:true};var ae=function(){if(typeof window==="undefined"){return false}for(var e in window){if(!ne["$"+e]&&$(window,e)&&window[e]!==null&&typeof window[e]==="object"){try{re(window[e])}catch(t){return true}}}return false}();var ie=function(e){if(typeof window==="undefined"||!ae){return re(e)}try{return re(e)}catch(t){return false}};var oe=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"];var le=oe.length;var ue=function nt(e){var t=C(e);var r=t==="[object Arguments]";if(!r){r=!J(e)&&e!==null&&typeof e==="object"&&typeof e.length==="number"&&e.length>=0&&m(e.callee)}return r};F(r,{keys:function at(e){var t=m(e);var r=ue(e);var n=e!==null&&typeof e==="object";var a=n&&D(e);if(!n&&!t&&!r){throw new TypeError("Object.keys called on a non-object")}var o=[];var l=ee&&t;if(a&&te||r){for(var u=0;u<e.length;++u){c.call(o,i(u))}}if(!r){for(var f in e){if(!(l&&f==="prototype")&&$(e,f)){c.call(o,i(f))}}}if(_){var s=ie(e);for(var v=0;v<le;v++){var p=oe[v];if(!(s&&p==="constructor")&&$(e,p)){c.call(o,p)}}}return o}});var fe=r.keys&&function(){return r.keys(arguments).length===2}(1,2);var se=r.keys;F(r,{keys:function it(e){if(ue(e)){return se(f.call(e))}else{return se(e)}}},!fe);var ce=-621987552e5;var ve="-000001";var pe=Date.prototype.toISOString&&new Date(ce).toISOString().indexOf(ve)===-1;var he=Date.prototype.toISOString&&new Date(-1).toISOString()!=="1969-12-31T23:59:59.999Z";F(Date.prototype,{toISOString:function ot(){var e,t,r,n,a;if(!isFinite(this)){throw new RangeError("Date.prototype.toISOString called on non-finite value.")}n=this.getUTCFullYear();a=this.getUTCMonth();n+=Math.floor(a/12);a=(a%12+12)%12;e=[a+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()];n=(n<0?"-":n>9999?"+":"")+P("00000"+Math.abs(n),0<=n&&n<=9999?-4:-6);t=e.length;while(t--){r=e[t];if(r<10){e[t]="0"+r}}return n+"-"+f.call(e,0,2).join("-")+"T"+f.call(e,2).join(":")+"."+P("000"+this.getUTCMilliseconds(),-3)+"Z"}},pe||he);var ge=function(){try{return Date.prototype.toJSON&&new Date(NaN).toJSON()===null&&new Date(ce).toJSON().indexOf(ve)!==-1&&Date.prototype.toJSON.call({toISOString:function(){return true}})}catch(e){return false}}();if(!ge){Date.prototype.toJSON=function lt(e){var t=r(this);var n=A.ToPrimitive(t);if(typeof n==="number"&&!isFinite(n)){return null}var a=t.toISOString;if(!m(a)){throw new TypeError("toISOString property is not callable")}return a.call(t)}}var ye=Date.parse("+033658-09-27T01:46:40.000Z")===1e15;var de=!isNaN(Date.parse("2012-04-04T24:00:00.500Z"))||!isNaN(Date.parse("2012-11-31T23:59:59.000Z"))||!isNaN(Date.parse("2012-12-31T23:59:60.000Z"));var we=isNaN(Date.parse("2000-01-01T00:00:00.000Z"));if(!Date.parse||we||de||!ye){Date=function(e){var t=function s(r,n,a,o,l,u,f){var s=arguments.length;var c;if(this instanceof e){c=s===1&&i(r)===r?new e(t.parse(r)):s>=7?new e(r,n,a,o,l,u,f):s>=6?new e(r,n,a,o,l,u):s>=5?new e(r,n,a,o,l):s>=4?new e(r,n,a,o):s>=3?new e(r,n,a):s>=2?new e(r,n):s>=1?new e(r):new e}else{c=e.apply(this,arguments)}F(c,{constructor:t},true);return c};var r=new RegExp("^"+"(\\d{4}|[+-]\\d{6})"+"(?:-(\\d{2})"+"(?:-(\\d{2})"+"(?:"+"T(\\d{2})"+":(\\d{2})"+"(?:"+":(\\d{2})"+"(?:(\\.\\d{1,}))?"+")?"+"("+"Z|"+"(?:"+"([-+])"+"(\\d{2})"+":(\\d{2})"+")"+")?)?)?)?"+"$");var n=[0,31,59,90,120,151,181,212,243,273,304,334,365];var a=function c(e,t){var r=t>1?1:0;return n[t]+Math.floor((e-1969+r)/4)-Math.floor((e-1901+r)/100)+Math.floor((e-1601+r)/400)+365*(e-1970)};var o=function v(t){return l(new e(1970,0,1,0,0,0,t))};for(var u in e){if($(e,u)){t[u]=e[u]}}F(t,{now:e.now,UTC:e.UTC},true);t.prototype=e.prototype;F(t.prototype,{constructor:t},true);var f=function p(t){var n=r.exec(t);if(n){var i=l(n[1]),u=l(n[2]||1)-1,f=l(n[3]||1)-1,s=l(n[4]||0),c=l(n[5]||0),v=l(n[6]||0),p=Math.floor(l(n[7]||0)*1e3),h=Boolean(n[4]&&!n[8]),g=n[9]==="-"?1:-1,y=l(n[10]||0),d=l(n[11]||0),w;if(s<(c>0||v>0||p>0?24:25)&&c<60&&v<60&&p<1e3&&u>-1&&u<12&&y<24&&d<60&&f>-1&&f<a(i,u+1)-a(i,u)){w=((a(i,u)+f)*24+s+y*g)*60;w=((w+c+d*g)*60+v)*1e3+p;if(h){w=o(w)}if(-864e13<=w&&w<=864e13){return w}}return NaN}return e.parse.apply(this,arguments)};F(t,{parse:f});return t}(Date)}if(!Date.now){Date.now=function ut(){return(new Date).getTime()}}var me=u.toFixed&&(8e-5.toFixed(3)!=="0.000"||.9.toFixed(0)!=="1"||1.255.toFixed(2)!=="1.25"||0xde0b6b3a7640080.toFixed(0)!=="1000000000000000128");var be={base:1e7,size:6,data:[0,0,0,0,0,0],multiply:function ft(e,t){var r=-1;var n=t;while(++r<be.size){n+=e*be.data[r];be.data[r]=n%be.base;n=Math.floor(n/be.base)}},divide:function st(e){var t=be.size,r=0;while(--t>=0){r+=be.data[t];be.data[t]=Math.floor(r/e);r=r%e*be.base}},numToString:function ct(){var e=be.size;var t="";while(--e>=0){if(t!==""||e===0||be.data[e]!==0){var r=i(be.data[e]);if(t===""){t=r}else{t+=P("0000000",0,7-r.length)+r}}}return t},pow:function vt(e,t,r){return t===0?r:t%2===1?vt(e,t-1,r*e):vt(e*e,t/2,r)},log:function pt(e){var t=0;var r=e;while(r>=4096){t+=12;r/=4096}while(r>=2){t+=1;r/=2}return t}};F(u,{toFixed:function ht(e){var t,r,n,a,o,u,f,s;t=l(e);t=t!==t?0:Math.floor(t);if(t<0||t>20){throw new RangeError("Number.toFixed called with invalid number of decimals")}r=l(this);if(r!==r){return"NaN"}if(r<=-1e21||r>=1e21){return i(r)}n="";if(r<0){n="-";r=-r}a="0";if(r>1e-21){o=be.log(r*be.pow(2,69,1))-69;u=o<0?r*be.pow(2,-o,1):r/be.pow(2,o,1);u*=4503599627370496;o=52-o;if(o>0){be.multiply(0,u);f=t;while(f>=7){be.multiply(1e7,0);f-=7}be.multiply(be.pow(10,f,1),0);f=o-1;while(f>=23){be.divide(1<<23);f-=23}be.divide(1<<f);be.multiply(1,1);be.divide(2);a=be.numToString()}else{be.multiply(0,u);be.multiply(1<<-o,0);a=be.numToString()+P("0.00000000000000000000",2,2+t)}}if(t>0){s=a.length;if(s<=t){a=n+P("0.0000000000000000000",0,t-s+2)+a}else{a=n+P(a,0,s-t)+"."+P(a,s-t)}}else{a=n+a}return a}},me);if("ab".split(/(?:ab)*/).length!==2||".".split(/(.?)(.?)/).length!==4||"tesst".split(/(s)*/)[1]==="t"||"test".split(/(?:)/,-1).length!==4||"".split(/.?/).length||".".split(/()()/).length>1){(function(){var e=typeof/()??/.exec("")[1]==="undefined";o.split=function(t,r){var n=this;if(typeof t==="undefined"&&r===0){return[]}if(!S(t)){return Z(this,t,r)}var a=[];var i=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),o=0,l,u,s,v;var p=new RegExp(t.source,i+"g");n+="";if(!e){l=new RegExp("^"+p.source+"$(?!\\s)",i)}var h=typeof r==="undefined"?-1>>>0:A.ToUint32(r);u=p.exec(n);while(u){s=u.index+u[0].length;if(s>o){c.call(a,P(n,o,u.index));if(!e&&u.length>1){u[0].replace(l,function(){for(var e=1;e<arguments.length-2;e++){if(typeof arguments[e]==="undefined"){u[e]=void 0}}})}if(u.length>1&&u.index<n.length){c.apply(a,f.call(u,1))}v=u[0].length;o=s;if(a.length>=h){break}}if(p.lastIndex===u.index){p.lastIndex++}u=p.exec(n)}if(o===n.length){if(v||!p.test("")){c.call(a,"")}}else{c.call(a,P(n,o))}return a.length>h?P(a,0,h):a}})()}else if("0".split(void 0,0).length){o.split=function gt(e,t){if(typeof e==="undefined"&&t===0){return[]}return Z(this,e,t)}}var Te=o.replace;var xe=function(){var e=[];"x".replace(/x(.)?/g,function(t,r){c.call(e,r)});return e.length===1&&typeof e[0]==="undefined"}();if(!xe){o.replace=function yt(e,t){var r=m(t);var n=S(e)&&/\)[*?]/.test(e.source);if(!r||!n){return Te.call(this,e,t)}else{var a=function(r){var n=arguments.length;var a=e.lastIndex;e.lastIndex=0;var i=e.exec(r)||[];e.lastIndex=a;c.call(i,arguments[n-2],arguments[n-1]);return t.apply(this,i)};return Te.call(this,e,a)}}}var Oe=o.substr;var Se="".substr&&"0b".substr(-1)!=="b";F(o,{substr:function dt(e,t){var r=e;if(e<0){r=g(this.length+e,0)}return Oe.call(this,r,t)}},Se);var je="	\n\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003"+"\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028"+"\u2029\ufeff";var Ee="\u200b";var Ie="["+je+"]";var De=new RegExp("^"+Ie+Ie+"*");var Ne=new RegExp(Ie+Ie+"*$");var ke=o.trim&&(je.trim()||!Ee.trim());F(o,{trim:function wt(){if(typeof this==="undefined"||this===null){throw new TypeError("can't convert "+this+" to object")}return i(this).replace(De,"").replace(Ne,"")}},ke);if(parseInt(je+"08")!==8||parseInt(je+"0x16")!==22){parseInt=function(e){var t=/^0[xX]/;return function r(n,a){var o=i(n).trim();var u=l(a)||(t.test(o)?16:10);return e(o,u)}}(parseInt)}});
//# sourceMappingURL=es5-shim.map

/*!
 * https://github.com/es-shims/es5-shim
 * @license es5-shim Copyright 2009-2015 by contributors, MIT License
 * see https://github.com/es-shims/es5-shim/blob/v4.1.9/LICENSE
 */
(function(e,t){"use strict";if(typeof define==="function"&&define.amd){define(t)}else if(typeof exports==="object"){module.exports=t()}else{e.returnExports=t()}})(this,function(){var e=Function.prototype.call;var t=Object.prototype;var r=e.bind(t.hasOwnProperty);var n=e.bind(t.propertyIsEnumerable);var o;var c;var i;var f;var a=r(t,"__defineGetter__");if(a){o=e.bind(t.__defineGetter__);c=e.bind(t.__defineSetter__);i=e.bind(t.__lookupGetter__);f=e.bind(t.__lookupSetter__)}if(!Object.getPrototypeOf){Object.getPrototypeOf=function z(e){var r=e.__proto__;if(r||r===null){return r}else if(e.constructor){return e.constructor.prototype}else{return t}}}var l=function S(e){try{e.sentinel=0;return Object.getOwnPropertyDescriptor(e,"sentinel").value===0}catch(t){return false}};if(Object.defineProperty){var u=l({});var p=typeof document==="undefined"||l(document.createElement("div"));if(!p||!u){var b=Object.getOwnPropertyDescriptor}}if(!Object.getOwnPropertyDescriptor||b){var s="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function D(e,o){if(typeof e!=="object"&&typeof e!=="function"||e===null){throw new TypeError(s+e)}if(b){try{return b.call(Object,e,o)}catch(c){}}var l;if(!r(e,o)){return l}l={enumerable:n(e,o),configurable:true};if(a){var u=e.__proto__;var p=e!==t;if(p){e.__proto__=t}var O=i(e,o);var j=f(e,o);if(p){e.__proto__=u}if(O||j){if(O){l.get=O}if(j){l.set=j}return l}}l.value=e[o];l.writable=true;return l}}if(!Object.getOwnPropertyNames){Object.getOwnPropertyNames=function k(e){return Object.keys(e)}}if(!Object.create){var O;var j=!({__proto__:null}instanceof Object);var d=function F(){if(!document.domain){return false}try{return!!new ActiveXObject("htmlfile")}catch(e){return false}};var y=function G(){var e;var t;t=new ActiveXObject("htmlfile");t.write("<script></script>");t.close();e=t.parentWindow.Object.prototype;t=null;return e};var _=function A(){var e=document.createElement("iframe");var t=document.body||document.documentElement;var r;e.style.display="none";t.appendChild(e);e.src="javascript:";r=e.contentWindow.Object.prototype;t.removeChild(e);e=null;return r};if(j||typeof document==="undefined"){O=function(){return{__proto__:null}}}else{O=function(){var e=d()?y():_();delete e.constructor;delete e.hasOwnProperty;delete e.propertyIsEnumerable;delete e.isPrototypeOf;delete e.toLocaleString;delete e.toString;delete e.valueOf;e.__proto__=null;var t=function r(){};t.prototype=e;O=function(){return new t};return new t}}Object.create=function C(e,t){var r;var n=function o(){};if(e===null){r=O()}else{if(typeof e!=="object"&&typeof e!=="function"){throw new TypeError("Object prototype may only be an Object or null")}n.prototype=e;r=new n;r.__proto__=e}if(t!==void 0){Object.defineProperties(r,t)}return r}}var v=function I(e){try{Object.defineProperty(e,"sentinel",{});return"sentinel"in e}catch(t){return false}};if(Object.defineProperty){var w=v({});var h=typeof document==="undefined"||v(document.createElement("div"));if(!w||!h){var m=Object.defineProperty,E=Object.defineProperties}}if(!Object.defineProperty||m){var P="Property description must be an object: ";var g="Object.defineProperty called on non-object: ";var T="getters & setters can not be defined on this javascript engine";Object.defineProperty=function N(e,r,n){if(typeof e!=="object"&&typeof e!=="function"||e===null){throw new TypeError(g+e)}if(typeof n!=="object"&&typeof n!=="function"||n===null){throw new TypeError(P+n)}if(m){try{return m.call(Object,e,r,n)}catch(l){}}if("value"in n){if(a&&(i(e,r)||f(e,r))){var u=e.__proto__;e.__proto__=t;delete e[r];e[r]=n.value;e.__proto__=u}else{e[r]=n.value}}else{if(!a&&("get"in n||"set"in n)){throw new TypeError(T)}if("get"in n){o(e,r,n.get)}if("set"in n){c(e,r,n.set)}}return e}}if(!Object.defineProperties||E){Object.defineProperties=function W(e,t){if(E){try{return E.call(Object,e,t)}catch(r){}}Object.keys(t).forEach(function(r){if(r!=="__proto__"){Object.defineProperty(e,r,t[r])}});return e}}if(!Object.seal){Object.seal=function X(e){if(Object(e)!==e){throw new TypeError("Object.seal can only be called on Objects.")}return e}}if(!Object.freeze){Object.freeze=function L(e){if(Object(e)!==e){throw new TypeError("Object.freeze can only be called on Objects.")}return e}}try{Object.freeze(function(){})}catch(x){Object.freeze=function(e){return function t(r){if(typeof r==="function"){return r}else{return e(r)}}}(Object.freeze)}if(!Object.preventExtensions){Object.preventExtensions=function q(e){if(Object(e)!==e){throw new TypeError("Object.preventExtensions can only be called on Objects.")}return e}}if(!Object.isSealed){Object.isSealed=function B(e){if(Object(e)!==e){throw new TypeError("Object.isSealed can only be called on Objects.")}return false}}if(!Object.isFrozen){Object.isFrozen=function H(e){if(Object(e)!==e){throw new TypeError("Object.isFrozen can only be called on Objects.")}return false}}if(!Object.isExtensible){Object.isExtensible=function J(e){if(Object(e)!==e){throw new TypeError("Object.isExtensible can only be called on Objects.")}var t="";while(r(e,t)){t+="?"}e[t]=true;var n=r(e,t);delete e[t];return n}}});
//# sourceMappingURL=es5-sham.map

/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

;(function () {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listeners = this.getListenersAsObject(evt);
        var listener;
        var i;
        var key;
        var response;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                i = listeners[key].length;

                while (i--) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[key][i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return EventEmitter;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}.call(this));

/**
 * Heir v3.0.0 - http://git.io/F87mKg
 * Oliver Caldwell - http://oli.me.uk/
 * Unlicense - http://unlicense.org/
 */

(function (name, root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    }
    else if (typeof exports === 'object') {
        module.exports = factory();
    }
    else {
        root[name] = factory();
    }
}('heir', this, function () {
    /*global define,module*/
    'use strict';

    var heir = {
        /**
         * Causes your desired class to inherit from a source class. This uses
         * prototypical inheritance so you can override methods without ruining
         * the parent class.
         *
         * This will alter the actual destination class though, it does not
         * create a new class.
         *
         * @param {Function} destination The target class for the inheritance.
         * @param {Function} source Class to inherit from.
         * @param {Boolean} addSuper Should we add the _super property to the prototype? Defaults to true.
         */
        inherit: function inherit(destination, source, addSuper) {
            var proto = destination.prototype = heir.createObject(source.prototype);
            proto.constructor = destination;

            if (addSuper || typeof addSuper === 'undefined') {
                destination._super = source.prototype;
            }
        },

        /**
         * Creates a new object with the source object nestled within its
         * prototype chain.
         *
         * @param {Object} source Method to insert into the new object's prototype.
         * @return {Object} An empty object with the source object in it's prototype chain.
         */
        createObject: Object.create || function createObject(source) {
            var Host = function () {};
            Host.prototype = source;
            return new Host();
        },

        /**
         * Mixes the specified object into your class. This can be used to add
         * certain capabilities and helper methods to a class that is already
         * inheriting from some other class. You can mix in as many object as
         * you want, but only inherit from one.
         *
         * These values are mixed into the actual prototype object of your
         * class, they are not added to the prototype chain like inherit.
         *
         * @param {Function} destination Class to mix the object into.
         * @param {Object} source Object to mix into the class.
         */
        mixin: function mixin(destination, source) {
            return heir.merge(destination.prototype, source);
        },

        /**
         * Merges one object into another, change the object in place.
         *
         * @param {Object} destination The destination for the merge.
         * @param {Object} source The source of the properties to merge.
         */
        merge: function merge(destination, source) {
            var key;

            for (key in source) {
                if (heir.hasOwn(source, key)) {
                    destination[key] = source[key];
                }
            }
        },

        /**
         * Shortcut for `Object.prototype.hasOwnProperty`.
         *
         * Uses `Object.prototype.hasOwnPropety` rather than
         * `object.hasOwnProperty` as it could be overwritten.
         *
         * @param {Object} object The object to check
         * @param {String} key The key to check for.
         * @return {Boolean} Does object have key as an own propety?
         */
        hasOwn: function hasOwn(object, key) {
            return Object.prototype.hasOwnProperty.call(object, key);
        }
    };

    return heir;
}));

/**
 * @fileOverview Finesse container tools
 */

var finesse = finesse || {};
finesse.modules = finesse.modules || {};

finesse.modules.ContainerTools = (function ($) {

    return {

        _containerServices: null,
        _tabBadge: null,
		_tabButton: null,
        _initialized: false,

        init: function() {
            if (!this._containerServices) {
                this._containerServices = finesse.containerservices.ContainerServices.init();
                this._containerServices.addHandler(
                    finesse.containerservices.ContainerServices.Topics.ACTIVE_TAB,
                    this._onTabActive.bind(this)
                );
                this._containerServices.makeActiveTabReq();
            }
        },
        
        // Retrieves query parameters from gadget definition.
        getParameter: function(name, uri) {
            var url, param;
            if (!uri) {
                if(url = this.getParameter('url', location.search)) {
                    url = url.replace(";", "&");
                    return this.getParameter(name, url);
                }
            }
            else if (param = (new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(uri)) {
                return decodeURIComponent(param[1]);
            }
        },

        _onTabActive: function() {
            this.onTabActiveCallback();
        },

        onTabActiveCallback: function() {
            if (this._initialized)
                this.hideTabBadge();
            this._initialized = true;
        },

        showTabBadge: function(message) {
            if (this._tabBadge) {
                this._tabBadge.html(message);
            }
            else {
                this._tabBadge = $("<span class='badge' style='margin-left: 5px; padding: 1px 10px; padding-top: 3px; background-color: #0FA20F; color: white'>" + message + "</span>");
                this.getTabLinkElement().append(this._tabBadge)
            }
        },

        hideTabBadge: function() {
            if (this._tabBadge) {
                this._tabBadge.remove();
                this._tabBadge = null;
            }
        },
		
		showTabButton: function(text, callback) {
			if (this._tabButton) {
                this._tabButton.html(text);
				this._tabButton.off("click").on("click", callback);
            }
            else {
                this._tabButton = $("<button class='btn btn-primary btn-xs' style='margin-left: 10px; padding: 1px 3px; top: -1px; height: 14px; position: relative; font-size: 11px; line-height: 5px'>" + text + "</button>");
				this._tabButton.on("click", callback);
				this.getTabLinkElement().append(this._tabButton)
            }
		},
		
		hideTabButton: function() {
            if (this._tabButton) {
                this._tabButton.remove();
                this._tabButton = null;
            }
        },

        getTabElement: function() {
            this.init();
            return $("#tab_" + this._containerServices.getMyTabId(), window.parent.document);
        },

        getTabLinkElement: function() {
            this.init();
            return $("#tablink_" + this._containerServices.getMyTabId(), window.parent.document);
        },

        isTabVisible: function() {
            this.init();
            return this._containerServices.tabVisible();
        },

        getGadgetId: function() {
            this.init();
            return this._containerServices.getMyGadgetId();
        },

        getGadgetFrame: function() {
            this.init();
            return $("#finesse_gadget_" + this._containerServices.getMyGadgetId(), window.parent.document);
        },
		
		getGadgetFrameContainer: function() {
			this.init();
            return $("#finesse_gadget_" + this._containerServices.getMyGadgetId(), window.parent.document).parent().parent();
		},

        hideGadget: function() {
            this.getGadgetElement().hide();
        },

        showGadget: function() {
            this.getGadgetElement().show();
        },

        getGadgetElement: function() {
            this.init();
            return $("#gadgets-gadget-content-" + this._containerServices.getMyGadgetId(), window.parent.document).parent();
        },

        getGadgetTitleElement: function() {
            this.init();
            return $("#finesse_gadget_" + this._containerServices.getMyGadgetId() + "_title", window.parent.document);
        },

        hideGadgetTitle: function() {
            this.getGadgetTitleElement().hide();
        },

        reloadGadget: function () {
            this.init();
            // Find the 'url' parameter within this gadget iframe's query string.
            // That will equal the URL configured for this gadget in the layout.
            parameters = (new RegExp('[?&]'+encodeURIComponent('url')+'=([^&]*)')).exec(location.search);
            url = decodeURIComponent(parameters[1]);

            // Adds a cache buster to force Finesse to reload the gadget from the URL.
            if (url.indexOf("?") > -1)
                url += "&";
            else
                url += "?";
            url += "busta=" + (new Date()).getTime();

            return this._containerServices.reloadMyGadgetFromUrl(url);
        },

        addDevToolsToGadget: function() {
            this.init();
            var debugPanel = $("<div style='float:right; margin-left: 40px;'></div>");
            var gadgetId = $("<span style='float:left'>" + "Gadget ID: " + this.getGadgetId() + "</span>");
            var reloadButton = $("<button style='margin-left: 10px; padding: 0px 5px; margin-top: -5px;' class='btn btn-primary btn-xs'>Reload</button>");
            var self = this;
            reloadButton.on("click", function() {
                self.reloadGadget();
            });
            debugPanel.append(gadgetId);
            debugPanel.append(reloadButton);
            this.getGadgetTitleElement().append(debugPanel);
        },

        showDialog: function(options) {
            this._containerServices.showDialog(options);
        },

        runInContainer: function(func) {
            var loadInParent = function(window) { 
                window._runFromChild = func;
            };
            loadInParent(window.parent);
            
            window.parent._runFromChild(window.parent);

            delete window.parent._runFromChild;
        }

    };
}(jQuery));


/**
* Convenience library wrapping the Finesse API.
* Let's you build gadgets with less boilerplate.
*/
Finn = (function ($) {
    'use strict';

    function Finn(gadgetName, options) {
        options = options || {};
    	this.gadgetName = gadgetName;
        this.loaded = false;
        this.enableSupervisor = options.enableSupervisor === true;
        this.dontLoadRosters = options.dontLoadRosters === true;
        this.container = finesse.modules.ContainerTools;
    }
    heir.inherit(Finn, EventEmitter);

    Finn.Agent = function() { }
    heir.inherit(Finn.Agent, EventEmitter);

    Finn.Queue = function() { }
    heir.inherit(Finn.Queue, EventEmitter);
    
    Finn.Call = function() { }
    heir.inherit(Finn.Call, EventEmitter);
    Finn.Call.prototype.makeConsultCall = function (number, callback) {
        if (!callback || typeof callback !== "function") {
            callback = function() {};
        }
        
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this._raw.makeConsultCall(this._finn.agent.extension, number, {
            success: callback.bind(null, null),
            error: callback
        });
    };

    Finn.Call.prototype.directTransfer = function (number, callback) {
        if (!callback || typeof callback !== "function") {
            callback = function() {};
        }
        
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this._raw.initiateDirectTransfer(this._finn.agent.extension, number, {
            success: callback.bind(null, null),
            error: callback
        });
    };

    Finn.Call.prototype.completeTransfer = function (callback) {
        if (!callback || typeof callback !== "function") {
            callback = function() {};
        }
        
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this._raw.requestAction(this._finn.agent.extension, "TRANSFER", {
            success: callback.bind(null, null),
            error: callback
        });
    };

    Finn.Call.prototype.completeConference = function (callback) {
        if (!callback || typeof callback !== "function") {
            callback = function() {};
        }
        
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this._raw.requestAction(this._finn.agent.extension, "CONFERENCE", {
            success: callback.bind(null, null),
            error: callback
        });
    };

    Finn.Call.prototype.retrieve = function (callback) {
        if (!callback || typeof callback !== "function") {
            callback = function() {};
        }
        
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this._raw.requestAction(this._finn.agent.extension, finesse.restservices.Dialog.Actions.RETRIEVE, {
            success: callback.bind(null, null),
            error: callback
        });
    };

    Finn.Call.prototype.hold = function (callback) {
        if (!callback || typeof callback !== "function") {
            callback = function() {};
        }
        
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this._raw.requestAction(this._finn.agent.extension, finesse.restservices.Dialog.Actions.HOLD, {
            success: callback.bind(null, null),
            error: callback
        });
    };

    Finn.Call.prototype.updateCallVariable = function (variable, value) {
        this._raw.isLoaded();

        var options = options || {};
        options.content = {};
        options.content[this._raw.getRestType()] =
        {
            "mediaProperties": {
                "callvariables": [
                    { 
                        "CallVariable": {
                            "name": variable,
                            "value": value
                        }
                    }
                ]
            },
            "requestedAction": finesse.restservices.Dialog.Actions.UPDATE_CALL_DATA
        };
        options.method = "PUT";
        this._raw.restRequest(this._raw.getRestUrl(), options);
    };

    Finn.Call.prototype.updateCallVariables = function (variables) {
        this._raw.isLoaded();

        var callVariables = [];
        for (var variableName in variables) {
            callVariables.push({
                "name": variableName,
                "value": variables[variableName]
            });
        }

        var options = options || {};
        options.content = {};
        options.content[this._raw.getRestType()] =
        {
            "mediaProperties": {
                "callvariables": {
                    "CallVariable": callVariables
                }
            },
            "requestedAction": finesse.restservices.Dialog.Actions.UPDATE_CALL_DATA
        };
        options.method = "PUT";
        this._raw.restRequest(this._raw.getRestUrl(), options);
    };

    Finn.prototype.load = function (callback) {
        this.loadCallback = callback;

        console.log("Initializing gadget " + this.gadgetName);

        if (gadgets.Hub && gadgets.Hub.isConnected()) {
            console.log("Hub already connected, continuing - " + this.gadgetName);
            this._finishLoad();
        }
        else {
            console.log("Hub not connected, waiting - " + this.gadgetName);
            gadgets.HubSettings.onConnectHandler = this._finishLoad.bind(this);
        }
    };

    Finn.prototype._finishLoad = function () {
        var self = this;
        console.log("Connected to gadget hub, continuing loading " + this.gadgetName);

        this.logger = finesse.cslogger.ClientLogger;
        this.logger.init(gadgets.Hub, this.gadgetName);
        finesse.clientservices.ClientServices.setLogger(this.logger);
        this.log = this.logger.log;
        this.log("The client logger has been initialized for the " + this.gadgetName + " gadget.");

        finesse.clientservices.ClientServices.registerOnConnectHandler(function() {
            self.agent = new finesse.restservices.User({
                id: finesse.gadget.Config.id,
                onLoad: self._userLoaded.bind(self),
                onError: self._userLoadError.bind(self),
                onChange: self._userChanged.bind(self)
            });
        });

        finesse.clientservices.ClientServices.init(finesse.gadget.Config, false);
        self.container.init();
        self.container.info = new finesse.restservices.SystemInfo("",{
            onLoad: self._systemInfoLoaded.bind(self),
            onChange: self._systemInfoChanged.bind(self)
        });      
    };

    Finn.prototype._systemInfoLoaded = function (info) {
        this.logger.log("System Info loaded.");

        this.container.info = info._data;
        this._systemInfoIsLoaded = true;
        if (this._userIsLoaded) {
            this._continueUserLoad(this.agent._raw);
        }
    };
    Finn.prototype._systemInfoChanged = function (info) {
        this.logger.log("System Info changed.");

        this.container.info = info._data;
        this._systemInfoIsLoaded = true;
    };

    Finn.prototype._userLoaded = function (user) {
        var self = this;
        this.logger.log("User loaded.");

        this.agent = getAgentFromResponse(user);
        this._userIsLoaded = true;
        if (this._systemInfoIsLoaded) {
            this._continueUserLoad(user)
        }

        user.getNotReadyReasonCodes({
            success: self._notReadyReasonCodesLoaded.bind(self),
            error: self._notReadyReasonCodesLoadError.bind(self)
        });
        user.getSignoutReasonCodes({
            success: self._signoutReasonCodesLoaded.bind(self),
            error: self._signoutReasonCodesLoadError.bind(self)
        });
    };  

    Finn.prototype._continueUserLoad = function (user) {
        var self = this;
        
        // Get an instance of the dialogs collection and register handlers 
        // for dialog additions and removals.
        user.getDialogs({
            onCollectionAdd: self._callStarted.bind(self),
            onCollectionDelete: self._callEnded.bind(self),
            onLoad: self._callsLoaded.bind(self),
            onError: self._callsLoadError.bind(self)
        });

        this.teams = {};
        // Array of objects with an id and name property
        // for each team supervised by the supervisor.
        var supervisedTeamList = user.getSupervisedTeams();
        if (this.enableSupervisor && isSupervisor(user) && supervisedTeamList.length > 0) {            
            $.each(supervisedTeamList, function(index, team) {
                self._teamLoadStatus = self._teamLoadStatus || {};
                self._teamLoadStatus[team.id] = false;

                self._loadTeam(team.id)
            });

            if (supervisedTeamList.length === 0) {
                self._teamLoadStatus = {};
            }
        }
        else {
            // With no teams listed in the load status, it will
            // always be detected as completed loading.
            self._teamLoadStatus = {};
        }

        // Queue subscription not supported in UCCX
        if (self.container.info.deploymentType == "UCCX") {
            self._queueLoadStatus = self._queueLoadStatus || {};

            self._callbackIfLoaded();
        } else {
            user.getQueues({
                onCollectionAdd: self._queueAdded.bind(self),
                onCollectionDelete: self._queueDeleted.bind(self),
                onLoad: self._queuesLoaded.bind(self),
                onError: self._queueLoadError.bind(self)
            })
        }
    }

    Finn.prototype._userChanged = function (user) {
        this.agent = getAgentFromResponse(user);

        this.emit('agent updated', this.agent);
    };

    Finn.prototype._userLoadError = function (error) {
        console.error(error);

        if (!this.loaded && this.loadCallback) {
            this.loadCallback(error);
        }
    };

    Finn.prototype._notReadyReasonCodesLoaded = function (reasonCodes) {
        this.logger.log("Not Ready Reason Codes loaded: " + reasonCodes);
        this.notReadyReasonCodes = reasonCodes || [];

        this._notReadyReasonCodesLoadStatus = true;
        this._callbackIfLoaded();
    };
    Finn.prototype._notReadyReasonCodesLoadError = function (error) {
        this.logger.log("Error loading Not Ready Reason Codes: " + error)
        console.error("Error Loading Not Ready Reason Codes", error);

        this.notReadyReasonCodes = [];

        this._notReadyReasonCodesLoadStatus = true;
        this._callbackIfLoaded();
    };

    Finn.prototype._signoutReasonCodesLoaded = function (reasonCodes) {
        this.logger.log("Sign Out Reason Codes loaded: " + reasonCodes);
        this.signoutReasonCodes = reasonCodes || [];

        this._signoutReasonCodesLoadStatus = true;
        this._callbackIfLoaded();
    };
    Finn.prototype._signoutReasonCodesLoadError = function (error) {
        this.logger.log("Error loading Sign Out Reason Codes: " + error)
        console.error("Error Loading Sign Out Reason Codes", error);

        this.signoutReasonCodes = [];

        this._signoutReasonCodesLoadStatus = true;
        this._callbackIfLoaded();
    };

    Finn.prototype._loadTeam = function (id) {
        var self = this;
        this.logger.log("Loading Team: " + id);
        if (this.teams[id]) { // If we've previously constructed this team already, simply refresh it.
            this.teams[id].refresh();
        } 
        else {
            this.teams[id] = new finesse.restservices.Team({
                id: id,
                onLoad: self._teamLoaded.bind(self),
                onChange: self._teamChanged.bind(self),
                onError: self._teamLoadError.bind(self)
            });
        }
    };

    Finn.prototype._teamChanged = function (team) {
        this.logger.log("Team changed " + team.getId());
        this._teamLoaded(team);
    };

    Finn.prototype._teamLoaded = function (team) {
        var self = this;
        this.logger.log("Team loaded " + team.getId());
        this.emitEvent('team loaded', team);

        if (this.dontLoadRosters) {
            this._teamLoadStatus[team.getId()] = true;
            this._callbackIfLoaded();
            
            return;
        }

        team._rawUsers = team.getUsers({
            onCollectionAdd: self._supervisedAgentAdded.bind(self, team.getId()),
            onCollectionDelete: self._supervisedAgentDeleted.bind(self, team.getId()),
            onLoad: self._teamRosterLoaded.bind(self, team.getId()),
            onError: self._teamRosterLoadError.bind(self)
        });
    };

    Finn.prototype._teamLoadError = function (err) {
        this.logger.log("Team load error " + err);
        console.error(err);
    };

    Finn.prototype._supervisedAgentDeleted = function (teamId, agent) {
        this.logger.log("Supervised agent deleted from team " + teamId);

        delete this.teams[teamId].roster[agent.getId()];
        this.emit('supervised agent deleted', agent.getId());
    };

    Finn.prototype._supervisedAgentAdded = function (teamId, agent) {
        this.logger.log("Supervised agent added to team " + teamId);

        var roster = this.teams[teamId].roster;
        this._loadSupervisedAgent(agent, teamId, roster);
    };

    Finn.prototype._teamRosterLoaded = function (teamId, rosterResponse) {
        var self = this;
        this.logger.log("Team roster loaded " + teamId);
        var rawRoster = rosterResponse.getCollection();
        this.teams[teamId]._rawUsersCollection = rawRoster;
        
        var roster = {};
        this.teams[teamId].roster = roster;

        $.each(rawRoster, function (agentId, agent) {
            self.logger.log("Loading roster agent " + agentId);
            self._loadSupervisedAgent(agent, teamId, roster);
        });

        this._teamLoadStatus[teamId] = true;
        this._callbackIfLoaded();
    };

    Finn.prototype._loadSupervisedAgent = function (agent, teamId, roster) {
        var agentId = agent.getId();
        var agentToAdd = getAgentFromResponse(agent);
        roster[agentId] = agentToAdd;

        agent.getQueues({
            onCollectionAdd: this._supervisedAgentQueueAdded.bind(this, agentId, teamId),
            onCollectionDelete: this._supervisedAgentQueueDeleted.bind(this, agentId, teamId),
            onLoad: this._supervisedAgentQueueListLoaded.bind(this, agentId, teamId),
            onError: this._teamLoadError.bind(this)
        });

        this.emit('supervised agent loaded', agentToAdd);
        agent.addHandler('change', this._supervisedAgentChanged.bind(this));
    };

    Finn.prototype._supervisedAgentQueueListLoaded = function (agentId, teamId, queuesResponse) {
        var self = this;
        this.logger.log("Queues loaded for supervised agent: " + agentId);
        this.teams[teamId].roster[agentId].queues = this.teams[teamId].roster[agentId].queues || {};
        var rawQueues = queuesResponse.getCollection();
        $.each(rawQueues, function (id, queue) {
            queue.addHandler('change', self._supervisedAgentQueueChanged.bind(self, agentId, teamId));
            queue.addHandler('load', self._supervisedAgentQueueLoaded.bind(self, agentId, teamId));
        });
    };

    Finn.prototype._supervisedAgentQueueLoaded = function (agentId, teamId, rawQueue) {
        this.logger.log("Supervised Agent Queue loaded: " + rawQueue.getId() + " for: " + agentId);
        var queue = getQueueFromResponse(rawQueue);
        this.teams[teamId].roster[agentId].queues[queue.id] = queue;

        var affectedAgent = this.teams[teamId].roster[agentId]
        this.emit('supervised agent updated', affectedAgent);
        affectedAgent.emit('updated', affectedAgent);

        return queue;
    };

    Finn.prototype._supervisedAgentQueueChanged = function (agentId, teamId, rawQueue) {
        this.logger.log("Supervised Agent Queue has been updated: " + rawQueue.getId() + " for: " + agentId);
        var queue = this._supervisedAgentQueueLoaded(agentId, teamId, rawQueue);
        queue._events = rawQueue._events;
    };

    Finn.prototype._supervisedAgentQueueAdded = function (agentId, teamId, rawQueue) {
        this.logger.log("Supervised Agent Queue added: " + rawQueue.getId() + " for: " + agentId);
        var queue = this._supervisedAgentQueueLoaded(agentId, teamId, rawQueue);

        var affectedAgent = this.teams[teamId].roster[agentId]
        this.emit('supervised agent updated', affectedAgent);
        affectedAgent.emit('updated', affectedAgent);
    };

    Finn.prototype._supervisedAgentQueueDeleted = function (agentId, teamId, rawQueue) {
        var id = rawQueue.getId();
        var name = rawQueue.getName();
        this.logger.log("Supervised Agent Queue deleted " + id + " for " + agentId);

        delete this.teams[teamId].roster[agentId].queues[id];

        var affectedAgent = this.teams[teamId].roster[agentId]
        this.emit('supervised agent updated', affectedAgent);
        affectedAgent.emit('updated', affectedAgent);
    };

    Finn.prototype._supervisedAgentChanged = function (agent) {
        this.logger.log("Supervised agent changed: " + agent.getId());
        var agentToAdd = getAgentFromResponse(agent);
        var affectedAgent, affectedTeamId;

        $.each(this.teams, function (teamId, team) {
            $.each(team.roster, function (agentId, teamAgent) {
                if (teamAgent.id === agentToAdd.id) {
                    affectedAgent = teamAgent;
                    affectedTeamId = teamId;
                }
            });
        });

        this.logger.log(affectedAgent === undefined);
        agentToAdd._events = affectedAgent._events;
        agentToAdd.queues = affectedAgent.queues;
        this.teams[affectedTeamId].roster[agentToAdd.id] = agentToAdd;
        
        this.emit('supervised agent updated', agentToAdd);
        agentToAdd.emit('updated', agentToAdd);
    }

    Finn.prototype._teamRosterLoadError = function (err) {
        this.logger.log("Team roster load error " + err);
        console.error(err);
    };

    Finn.prototype._queuesLoaded = function (queuesResponse) {
        var self = this;
        this.logger.log("Queues loaded.");
        this.queues = this.queues || {};
        var rawQueues = queuesResponse.getCollection();
        self._queueLoadStatus = self._queueLoadStatus || {};

        if ($.isEmptyObject(rawQueues) || rawQueues.length == 0) {
            self._callbackIfLoaded();
        }
        else {
            $.each(rawQueues, function (id, queue) {
                self._queueLoadStatus[id] = false;

                queue.addHandler('change', self._queueChanged.bind(self));
                queue.addHandler('load', self._queueLoaded.bind(self));
            });
        }
    };

    Finn.prototype._queueLoaded = function (rawQueue) {
        this.logger.log("Queue loaded: " + rawQueue.getId());
        var queue = getQueueFromResponse(rawQueue);
        this.queues[queue.id] = queue;
        this._queueLoadStatus[queue.id] = true;

        this._callbackIfLoaded();

        return queue;
    };

    Finn.prototype._queueAdded = function (queue) {
        this.logger.log("Queue added.");
        var newQueue = this._queueLoaded(queue);

        this.emit('queue added', newQueue);
    };

    Finn.prototype._queueChanged = function (queue) {
        this.logger.log("Queue has been updated.");
        var changedQueue = this._queueLoaded(queue);
        changedQueue._events = queue._events;

        changedQueue.emit('updated')
        this.emit('queue updated', changedQueue);
    };

    Finn.prototype._queueDeleted = function (queue) {
        var id = queue.getId();
        var name = queue.getName();
        this.logger.log("Queue deleted " + id + " " + name);

        this.queues[id].emit('deleted');

        delete this.queues[id];
        this.emit('queue deleted', id);
    };

    Finn.prototype._queueLoadError = function (err) {
        this.logger.log("Queue load error " + err);
        if (!this.loaded && this.loadCallback) {
            this.loadCallback("Queue load error " + err);
        }
    };
    
    Finn.prototype._callsLoaded = function (callsResponse) {
        var self = this;
        this.logger.log("Dialogs loaded.");
        this.calls = this.calls || {};
        var rawCalls = callsResponse.getCollection();
        $.each(rawCalls, function (id, dialog) {
            dialog.addHandler('change', self._callChanged.bind(self));
            //queue.addHandler('load', self._queueLoaded.bind(self));
        });
    };
    
    Finn.prototype._callsLoadError = function (err) {
        this.logger.log("Call load error " + err);
    };
    
    Finn.prototype._callLoaded = function (rawCall) {
        this.logger.log("Call loaded: " + rawCall.getId());
        var call = getCallFromResponse(rawCall, this.calls);
        call._finn = this;
        this.calls[call.id] = call;
        return call;
    };
    
    Finn.prototype._callStarted = function (call) {
        this.logger.log("Call added.");
        call.addHandler('change', this._callChanged.bind(this));
        var newCall = this._callLoaded(call);

        this.emit('call started', newCall);
    };

    Finn.prototype._callChanged = function (call) {
        this.logger.log("Call has been updated.");
        var changedCall = this._callLoaded(call);
        changedCall._events = call._events;

        changedCall.emit('updated')
        this.emit('call updated', changedCall);
    };

    Finn.prototype._callEnded = function (rawCall) {
        var id = rawCall.getId();
        //var name = queue.getName();
        this.logger.log("Call ended " + id);
        var call = getCallFromResponse(rawCall, this.calls);
        var originalCall = this.calls[call.id];
        
        call._events = originalCall._events;
        call.emit('ended');

        delete this.calls[id];
        this.emit('call ended', call);
    };
    
    Finn.prototype.makeCall = function (number, callback) {
        if (!callback || typeof callback !== "function") {
            callback = function() {};
        }
        
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this.agent._raw.makeCall(number, {
            success: callback.bind(null, null),
            error: callback
        });
    }

    Finn.prototype.ready = function () {
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }
        
        this.agent._raw.setState("READY");
    }
    Finn.prototype.notReady = function (reasonCodeId) {
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }

        var reason = null;
        if (reasonCodeId) {
            reason = {
                id: reasonCodeId
            }
        }
        
        this.agent._raw.setState("NOT_READY", reason);
    }
    Finn.prototype.logout = function (reasonCodeId) {
        if (!this.loaded) {
            callback("Finesse not loaded.");
        }

        var reason = null;
        if (reasonCodeId) {
            reason = {
                id: reasonCodeId
            }
        }
        
        this.agent._raw.logout(reason);
    }

    Finn.prototype._isFullyLoaded = function () {
        return (
            isLoaded(this._queueLoadStatus) &&
            isLoaded(this._teamLoadStatus) &&
            this._notReadyReasonCodesLoadStatus &&
            this._signoutReasonCodesLoadStatus
        );
    }
    Finn.prototype._callbackIfLoaded = function () {
        if (!this.loaded && this._isFullyLoaded()) {
            if (this.loadCallback)
                this.loadCallback(null, this.agent);
            this.loaded = true;
        }
    }
 
    function isLoaded(loadStatus) {
        if (!loadStatus) {
            return false;
        }

        var isLoaded = true;

        $.each(loadStatus, function (id, status) {
            if (status === false) {
                isLoaded = false;
            }
        });

        return isLoaded;
    }
    
    function getAgentFromResponse(agentResponse) {
        var agent = new Finn.Agent();

        agent.id = agentResponse.getId();
        agent.extension = agentResponse.getExtension();
        agent.firstName = agentResponse.getFirstName();
        agent.lastName = agentResponse.getLastName();
        agent.pendingState = agentResponse.getPendingState();
        agent.state = getAgentState(agentResponse);
        agent.teamId = agentResponse.getTeamId();
        agent.teamName = agentResponse.getTeamName();
        agent.isSupervisor = isSupervisor(agentResponse);
        agent._raw = agentResponse;
        
        return agent;
    }

    function getQueueFromResponse(queueResponse) {
        var queue = new Finn.Queue();
        queue.id = queueResponse.getId();
        queue.name = queueResponse.getName();
        queue.statistics = queueResponse.getStatistics();
        queue._raw = queueResponse;

        return queue;
    }
    
    function getCallFromResponse(callResponse, calls) {
        var call = new Finn.Call();
        call.id = callResponse.getId();
        call.state = callResponse.getData().state;
        call.toAddress = callResponse.getData().toAddress;
        call.fromAddress = callResponse.getData().fromAddress;
		var mediaProperties = callResponse.getMediaProperties();
        call.type = mediaProperties.callType;
        call.dnis = mediaProperties.DNIS;
        call.dialedNumber = mediaProperties.dialedNumber;
        call.outboundClassification = mediaProperties.outboundClassification;
		call.data = {}
		for(var property in mediaProperties) {
			// We expect call variables to start with either 'callVariable' for peripheral call variables,
			// 'user' for custom ECC variables,
			// or 'BA' for outbound ECC variables.
			if (property.lastIndexOf("callVariable", 0) != 0 
					&& property.lastIndexOf("user", 0) != 0
					&& property.lastIndexOf("BA", 0) != 0) {
				continue;
			}
		   
		   call.data[property] = mediaProperties[property];
		}
        if (callResponse.getData().associatedDialogUri) {
            var parentId = finesse.utilities.Utilities.getId(callResponse.getData().associatedDialogUri);
            var parent = calls[parentId];
            if (parent && !parent.parentCall) {
                call.parentCall = parentId;
            }
        }
        else {
            call.parentCall = null;
        }
        call.participants = callResponse.getParticipants();

        call._raw = callResponse;

        return call;
    }

    function isSupervisor(user) {
        return user._data.roles && user._data.roles.role && user._data.roles.role.indexOf("Supervisor") > -1
    }
    
    function getAgentState(agent) {
    	var state = agent.getState();
        var prettyState = finesse.utilities.I18n.getString("desktop.agent.header.state." + state);
        var reasonCodeLabel = agent.getReasonCodeLabel();
        var reasonCodeId = agent.getNotReadyReasonCodeId();
        var stateChangeTime = agent.getStateChangeTime();
        return {
            name: state,
            pretty: prettyState,
            reasonCodeId: reasonCodeId,
            reasonCodeLabel: reasonCodeLabel,
            startTime: new Date(finesse.utilities.Utilities.extractTime(stateChangeTime)),
            startTimeString: stateChangeTime
        };
    }

	return Finn;

}(jQuery));


/**
* Fix for awkward gadget 'onConnect' behavior.
*
* If we don't set onConnect right away, then it may never trigger.
* This is because the way the gadget container code sets this callback is prone to race conditions.
* Here is the relevant container code:
*
* 1.   gadgets.util.registerOnLoadHandler(function() {
* 2.     try {
* 3.       gadgets.Hub = new OpenAjax.hub.IframeHubClient(gadgets.HubSettings.params);
* 4.       gadgets.Hub.connect(gadgets.HubSettings.onConnect)
* 5.     } catch (A) {
* 6.       gadgets.error("ERROR creating or connecting IframeHubClient in gadgets.Hub [" + A.message + "]")
* 7.     }
* 8.   })
*
* On line 4, the 'onConnect' callback is set immediately after the OpenSocial gadgets are loaded,
* and captures the current value of 'HubSettings.onConnect' in a closure. The problem arises if we're 
* loading this gadget after the OpenSocial gadget library has already loaded, for example if we're doing
* our work after jquery's '$(document).ready' call. If we do that, then HubSettings.onConnect isn't set when
* the OpenSocial container loads and so we'll never get the callback.
*
* This is inconvenient since it forces us to be finicky about when we actually load our gadget, making sure
* that it happens immediately instead of after the document is loaded. This is not only prone to tricky
* bugs but may conflict with our goals for the gadget. The fix below sets 'onConnect' immediately but redirects
* it's logic to another function called 'onConnectHandler'. We can then set 'onConnectHandler' in our
* gadget code without worrying too much about when we actually load it.
*
*/
gadgets = gadgets || {};
gadgets.HubSettings = gadgets.HubSettings || {};
gadgets.HubSettings.onConnectHandler = function () {};
gadgets.HubSettings.onConnect = function () {
    gadgets.HubSettings.onConnectHandler();
};