module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=48)}([function(e,t,r){"use strict";var n=r(4),o=r(17),s=Object.prototype.toString;function i(e){return"[object Array]"===s.call(e)}function a(e){return null!==e&&"object"==typeof e}function c(e){return"[object Function]"===s.call(e)}function u(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===s.call(e)},isBuffer:o,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===s.call(e)},isFile:function(e){return"[object File]"===s.call(e)},isBlob:function(e){return"[object Blob]"===s.call(e)},isFunction:c,isStream:function(e){return a(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:u,merge:function e(){var t={};function r(r,n){"object"==typeof t[n]&&"object"==typeof r?t[n]=e(t[n],r):t[n]=r}for(var n=0,o=arguments.length;n<o;n++)u(arguments[n],r);return t},extend:function(e,t,r){return u(t,function(t,o){e[o]=r&&"function"==typeof t?n(t,r):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,r){"use strict";var n=r(0),o=r(19),s={"Content-Type":"application/x-www-form-urlencoded"};function i(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a,c={adapter:("undefined"!=typeof XMLHttpRequest?a=r(20):"undefined"!=typeof process&&(a=r(25)),a),transformRequest:[function(e,t){return o(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(i(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(i(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},n.forEach(["delete","get","head"],function(e){c.headers[e]={}}),n.forEach(["post","put","patch"],function(e){c.headers[e]=n.merge(s)}),e.exports=c},function(e,t,r){"use strict";var n=r(6);e.exports=function(e,t,r,o,s){var i=new Error(e);return n(i,t,r,o,s)}},function(e,t,r){e.exports=r(16)},function(e,t,r){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},function(e,t,r){"use strict";var n=r(2);e.exports=function(e,t,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},function(e,t,r){"use strict";e.exports=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e}},function(e,t,r){"use strict";var n=r(0);function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var s;if(r)s=r(t);else if(n.isURLSearchParams(t))s=t.toString();else{var i=[];n.forEach(t,function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),i.push(o(t)+"="+o(e))}))}),s=i.join("&")}return s&&(e+=(-1===e.indexOf("?")?"?":"&")+s),e}},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("https")},function(e,t,r){var n=r(11),o=n.URL,s=r(8),i=r(9),a=r(26),c=r(27).Writable,u=r(28)("follow-redirects"),f={GET:!0,HEAD:!0,OPTIONS:!0,TRACE:!0},p=Object.create(null);function d(e,t){c.call(this),e.headers=e.headers||{},this._options=e,this._ended=!1,this._ending=!1,this._redirectCount=0,this._redirects=[],this._requestBodyLength=0,this._requestBodyBuffers=[],e.host&&(e.hostname||(e.hostname=e.host),delete e.host),t&&this.on("response",t);var r=this;if(this._onNativeResponse=function(e){r._processResponse(e)},!e.pathname&&e.path){var n=e.path.indexOf("?");n<0?e.pathname=e.path:(e.pathname=e.path.substring(0,n),e.search=e.path.substring(n))}this._performRequest()}function l(e){var t={maxRedirects:21,maxBodyLength:10485760},r={};return Object.keys(e).forEach(function(s){var i=s+":",c=r[i]=e[s],f=t[s]=Object.create(c);f.request=function(e,s,c){if("string"==typeof e){var f=e;try{e=m(new o(f))}catch(t){e=n.parse(f)}}else o&&e instanceof o?e=m(e):(c=s,s=e,e={protocol:i});return"function"==typeof s&&(c=s,s=null),(s=Object.assign({maxRedirects:t.maxRedirects,maxBodyLength:t.maxBodyLength},e,s)).nativeProtocols=r,a.equal(s.protocol,i,"protocol mismatch"),u("options",s),new d(s,c)},f.get=function(e,t,r){var n=f.request(e,t,r);return n.end(),n}}),t}function h(){}function m(e){var t={protocol:e.protocol,hostname:e.hostname.startsWith("[")?e.hostname.slice(1,-1):e.hostname,hash:e.hash,search:e.search,pathname:e.pathname,path:e.pathname+e.search,href:e.href};return""!==e.port&&(t.port=Number(e.port)),t}["abort","aborted","error","socket","timeout"].forEach(function(e){p[e]=function(t){this._redirectable.emit(e,t)}}),d.prototype=Object.create(c.prototype),d.prototype.write=function(e,t,r){if(this._ending)throw new Error("write after end");if(!("string"==typeof e||"object"==typeof e&&"length"in e))throw new Error("data should be a string, Buffer or Uint8Array");"function"==typeof t&&(r=t,t=null),0!==e.length?this._requestBodyLength+e.length<=this._options.maxBodyLength?(this._requestBodyLength+=e.length,this._requestBodyBuffers.push({data:e,encoding:t}),this._currentRequest.write(e,t,r)):(this.emit("error",new Error("Request body larger than maxBodyLength limit")),this.abort()):r&&r()},d.prototype.end=function(e,t,r){if("function"==typeof e?(r=e,e=t=null):"function"==typeof t&&(r=t,t=null),e){var n=this,o=this._currentRequest;this.write(e,t,function(){n._ended=!0,o.end(null,null,r)}),this._ending=!0}else this._ended=this._ending=!0,this._currentRequest.end(null,null,r)},d.prototype.setHeader=function(e,t){this._options.headers[e]=t,this._currentRequest.setHeader(e,t)},d.prototype.removeHeader=function(e){delete this._options.headers[e],this._currentRequest.removeHeader(e)},["abort","flushHeaders","getHeader","setNoDelay","setSocketKeepAlive","setTimeout"].forEach(function(e){d.prototype[e]=function(t,r){return this._currentRequest[e](t,r)}}),["aborted","connection","socket"].forEach(function(e){Object.defineProperty(d.prototype,e,{get:function(){return this._currentRequest[e]}})}),d.prototype._performRequest=function(){var e=this._options.protocol,t=this._options.nativeProtocols[e];if(t){if(this._options.agents){var r=e.substr(0,e.length-1);this._options.agent=this._options.agents[r]}var o=this._currentRequest=t.request(this._options,this._onNativeResponse);for(var s in this._currentUrl=n.format(this._options),o._redirectable=this,p)s&&o.on(s,p[s]);if(this._isRedirect){var i=0,a=this,c=this._requestBodyBuffers;!function e(t){if(o===a._currentRequest)if(t)a.emit("error",t);else if(i<c.length){var r=c[i++];o.finished||o.write(r.data,r.encoding,e)}else a._ended&&o.end()}()}}else this.emit("error",new Error("Unsupported protocol "+e))},d.prototype._processResponse=function(e){this._options.trackRedirects&&this._redirects.push({url:this._currentUrl,headers:e.headers,statusCode:e.statusCode});var t=e.headers.location;if(t&&!1!==this._options.followRedirects&&e.statusCode>=300&&e.statusCode<400){if(this._currentRequest.removeAllListeners(),this._currentRequest.on("error",h),this._currentRequest.abort(),++this._redirectCount>this._options.maxRedirects)return void this.emit("error",new Error("Max redirects exceeded."));var r,o=this._options.headers;if(307!==e.statusCode&&!(this._options.method in f))for(r in this._options.method="GET",this._requestBodyBuffers=[],o)/^content-/i.test(r)&&delete o[r];if(!this._isRedirect)for(r in o)/^host$/i.test(r)&&delete o[r];var s=n.resolve(this._currentUrl,t);u("redirecting to",s),Object.assign(this._options,n.parse(s)),this._isRedirect=!0,this._performRequest(),e.destroy()}else e.responseUrl=this._currentUrl,e.redirects=this._redirects,this.emit("response",e),this._requestBodyBuffers=[]},e.exports=l({http:s,https:i}),e.exports.wrap=l},function(e,t){e.exports=require("url")},function(e,t,r){function n(e){var r;function n(){if(n.enabled){var e=n,o=+new Date,s=o-(r||o);e.diff=s,e.prev=r,e.curr=o,r=o;for(var i=new Array(arguments.length),a=0;a<i.length;a++)i[a]=arguments[a];i[0]=t.coerce(i[0]),"string"!=typeof i[0]&&i.unshift("%O");var c=0;i[0]=i[0].replace(/%([a-zA-Z%])/g,function(r,n){if("%%"===r)return r;c++;var o=t.formatters[n];if("function"==typeof o){var s=i[c];r=o.call(e,s),i.splice(c,1),c--}return r}),t.formatArgs.call(e,i),(n.log||t.log||console.log.bind(console)).apply(e,i)}}return n.namespace=e,n.enabled=t.enabled(e),n.useColors=t.useColors(),n.color=function(e){var r,n=0;for(r in e)n=(n<<5)-n+e.charCodeAt(r),n|=0;return t.colors[Math.abs(n)%t.colors.length]}(e),n.destroy=o,"function"==typeof t.init&&t.init(n),t.instances.push(n),n}function o(){var e=t.instances.indexOf(this);return-1!==e&&(t.instances.splice(e,1),!0)}(t=e.exports=n.debug=n.default=n).coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){t.enable("")},t.enable=function(e){var r;t.save(e),t.names=[],t.skips=[];var n=("string"==typeof e?e:"").split(/[\s,]+/),o=n.length;for(r=0;r<o;r++)n[r]&&("-"===(e=n[r].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")));for(r=0;r<t.instances.length;r++){var s=t.instances[r];s.enabled=t.enabled(s.namespace)}},t.enabled=function(e){if("*"===e[e.length-1])return!0;var r,n;for(r=0,n=t.skips.length;r<n;r++)if(t.skips[r].test(e))return!1;for(r=0,n=t.names.length;r<n;r++)if(t.names[r].test(e))return!0;return!1},t.humanize=r(30),t.instances=[],t.names=[],t.skips=[],t.formatters={}},function(e,t,r){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,r){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(45),o=r(46);t.DBClient=n.DBClient.instance;class s{static fetchData(e,{data:t,error:r}){t?o.sendSuccessMessage(e,{data:t}):o.sendErrorMessage(e,{error:r||"Unkown error"})}}t.Intent=s;class i{static get display(){throw new Error("Extending class needs to implement `static intent(action)` method")}static intent(e){throw new Error("Extending class needs to implement `static intent(action)` method")}}class a extends i{static get isStateIntent(){return!1}static get isGlobalIntent(){return!0}}class c extends i{static get isStateIntent(){return!0}static get isGlobalIntent(){return!1}}t.SaveState=class extends c{static get display(){return"SaveState"}static intent(e){return(r,n,o)=>{const{referenceId:s}=r.queryStringParameters,i=t.DBClient(r.context.signature);try{i.getData(s).then(t=>{const n=t?t.Item:{};try{e(r.context,r.queryStringParameters,u(r),n,e=>{t||s?i.updateData(s,e.state).then(()=>{o(null,{meta:{referenceId:s},data:e.data})}).catch(e=>o(e.toString(),{error:e.toString()})):i.saveData(e.state).then(t=>{o(null,{meta:{referenceId:t.Item.referenceId},data:e.data})}).catch(e=>o(e.toString(),{error:e.toString()}))})}catch(e){o(e.toString(),{error:e.toString()})}}).catch(e=>o(e.toString(),{error:e.toString()}))}catch(e){o(e.toString(),{error:e.toString()})}}}};t.RetrieveState=class extends c{static get display(){return"RetrieveState"}static intent(e){return(r,n,o)=>{const{referenceId:s}=r.queryStringParameters;try{t.DBClient(r.context.signature).getData(s).then(t=>{t?e(r.context,r.queryStringParameters,t.Item,e=>{o(null,{meta:{referenceId:t.Item.referenceId},data:e.data})}):o(null,{statusCode:404,body:JSON.stringify({error:"No data found",referenceId:s})})})}catch(e){o(e.toString(),{error:e.toString()})}}}};function u(e){const{body:t}=e;return t?"string"==typeof t?JSON.parse(t):t:{}}t.FetchData=class extends a{static get display(){return"FetchData"}static intent(e){return(t,r,n)=>{e(t.context,t.queryStringParameters,u(t),e=>{s.fetchData(n,e)})}}}},function(e,t,r){"use strict";var n=r(0),o=r(4),s=r(18),i=r(1);function a(e){var t=new s(e),r=o(s.prototype.request,t);return n.extend(r,s.prototype,t),n.extend(r,t),r}var c=a(i);c.Axios=s,c.create=function(e){return a(n.merge(i,e))},c.Cancel=r(14),c.CancelToken=r(42),c.isCancel=r(13),c.all=function(e){return Promise.all(e)},c.spread=r(43),e.exports=c,e.exports.default=c},function(e,t){function r(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(r(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&r(e.slice(0,0))}(e)||!!e._isBuffer)}},function(e,t,r){"use strict";var n=r(1),o=r(0),s=r(37),i=r(38);function a(e){this.defaults=e,this.interceptors={request:new s,response:new s}}a.prototype.request=function(e){"string"==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),(e=o.merge(n,{method:"get"},this.defaults,e)).method=e.method.toLowerCase();var t=[i,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)r=r.then(t.shift(),t.shift());return r},o.forEach(["delete","get","head","options"],function(e){a.prototype[e]=function(t,r){return this.request(o.merge(r||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){a.prototype[e]=function(t,r,n){return this.request(o.merge(n||{},{method:e,url:t,data:r}))}}),e.exports=a},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t){n.forEach(e,function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])})}},function(e,t,r){"use strict";var n=r(0),o=r(5),s=r(7),i=r(21),a=r(22),c=r(2),u="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||r(23);e.exports=function(e){return new Promise(function(t,f){var p=e.data,d=e.headers;n.isFormData(p)&&delete d["Content-Type"];var l=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in l||a(e.url)||(l=new window.XDomainRequest,h="onload",m=!0,l.onprogress=function(){},l.ontimeout=function(){}),e.auth){var g=e.auth.username||"",v=e.auth.password||"";d.Authorization="Basic "+u(g+":"+v)}if(l.open(e.method.toUpperCase(),s(e.url,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l[h]=function(){if(l&&(4===l.readyState||m)&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in l?i(l.getAllResponseHeaders()):null,n={data:e.responseType&&"text"!==e.responseType?l.response:l.responseText,status:1223===l.status?204:l.status,statusText:1223===l.status?"No Content":l.statusText,headers:r,config:e,request:l};o(t,f,n),l=null}},l.onerror=function(){f(c("Network Error",e,null,l)),l=null},l.ontimeout=function(){f(c("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",l)),l=null},n.isStandardBrowserEnv()){var y=r(24),C=(e.withCredentials||a(e.url))&&e.xsrfCookieName?y.read(e.xsrfCookieName):void 0;C&&(d[e.xsrfHeaderName]=C)}if("setRequestHeader"in l&&n.forEach(d,function(e,t){void 0===p&&"content-type"===t.toLowerCase()?delete d[t]:l.setRequestHeader(t,e)}),e.withCredentials&&(l.withCredentials=!0),e.responseType)try{l.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){l&&(l.abort(),f(e),l=null)}),void 0===p&&(p=null),l.send(p)})}},function(e,t,r){"use strict";var n=r(0),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,s,i={};return e?(n.forEach(e.split("\n"),function(e){if(s=e.indexOf(":"),t=n.trim(e.substr(0,s)).toLowerCase(),r=n.trim(e.substr(s+1)),t){if(i[t]&&o.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([r]):i[t]?i[t]+", "+r:r}}),i):i}},function(e,t,r){"use strict";var n=r(0);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=o(window.location.href),function(t){var r=n.isString(t)?o(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},function(e,t,r){"use strict";var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function o(){this.message="String contains an invalid character"}o.prototype=new Error,o.prototype.code=5,o.prototype.name="InvalidCharacterError",e.exports=function(e){for(var t,r,s=String(e),i="",a=0,c=n;s.charAt(0|a)||(c="=",a%1);i+=c.charAt(63&t>>8-a%1*8)){if((r=s.charCodeAt(a+=.75))>255)throw new o;t=t<<8|r}return i}},function(e,t,r){"use strict";var n=r(0);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,o,s,i){var a=[];a.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),n.isString(o)&&a.push("path="+o),n.isString(s)&&a.push("domain="+s),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,r){"use strict";var n=r(0),o=r(5),s=r(7),i=r(8),a=r(9),c=r(10).http,u=r(10).https,f=r(11),p=r(35),d=r(36),l=r(2),h=r(6);e.exports=function(e){return new Promise(function(t,r){var m,g=e.data,v=e.headers;if(v["User-Agent"]||v["user-agent"]||(v["User-Agent"]="axios/"+d.version),g&&!n.isStream(g)){if(Buffer.isBuffer(g));else if(n.isArrayBuffer(g))g=new Buffer(new Uint8Array(g));else{if(!n.isString(g))return r(l("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",e));g=new Buffer(g,"utf-8")}v["Content-Length"]=g.length}var y=void 0;e.auth&&(y=(e.auth.username||"")+":"+(e.auth.password||""));var C=f.parse(e.url),w=C.protocol||"http:";if(!y&&C.auth){var x=C.auth.split(":");y=(x[0]||"")+":"+(x[1]||"")}y&&delete v.Authorization;var b="https:"===w,_=b?e.httpsAgent:e.httpAgent,F={path:s(C.path,e.params,e.paramsSerializer).replace(/^\?/,""),method:e.method,headers:v,agent:_,auth:y};e.socketPath?F.socketPath=e.socketPath:(F.hostname=C.hostname,F.port=C.port);var S,R=e.proxy;if(!R&&!1!==R){var E=w.slice(0,-1)+"_proxy",O=process.env[E]||process.env[E.toUpperCase()];if(O){var B=f.parse(O);if(R={host:B.hostname,port:B.port},B.auth){var j=B.auth.split(":");R.auth={username:j[0],password:j[1]}}}}if(R&&(F.hostname=R.host,F.host=R.host,F.headers.host=C.hostname+(C.port?":"+C.port:""),F.port=R.port,F.path=w+"//"+C.hostname+(C.port?":"+C.port:"")+F.path,R.auth)){var A=new Buffer(R.auth.username+":"+R.auth.password,"utf8").toString("base64");F.headers["Proxy-Authorization"]="Basic "+A}e.transport?S=e.transport:0===e.maxRedirects?S=b?a:i:(e.maxRedirects&&(F.maxRedirects=e.maxRedirects),S=b?u:c),e.maxContentLength&&e.maxContentLength>-1&&(F.maxBodyLength=e.maxContentLength);var q=S.request(F,function(n){if(!q.aborted){clearTimeout(m),m=null;var s=n;switch(n.headers["content-encoding"]){case"gzip":case"compress":case"deflate":s=s.pipe(p.createUnzip()),delete n.headers["content-encoding"]}var i=n.req||q,a={status:n.statusCode,statusText:n.statusMessage,headers:n.headers,config:e,request:i};if("stream"===e.responseType)a.data=s,o(t,r,a);else{var c=[];s.on("data",function(t){c.push(t),e.maxContentLength>-1&&Buffer.concat(c).length>e.maxContentLength&&r(l("maxContentLength size of "+e.maxContentLength+" exceeded",e,null,i))}),s.on("error",function(t){q.aborted||r(h(t,e,null,i))}),s.on("end",function(){var n=Buffer.concat(c);"arraybuffer"!==e.responseType&&(n=n.toString("utf8")),a.data=n,o(t,r,a)})}}});q.on("error",function(t){q.aborted||r(h(t,e,null,q))}),e.timeout&&!m&&(m=setTimeout(function(){q.abort(),r(l("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",q))},e.timeout)),e.cancelToken&&e.cancelToken.promise.then(function(e){q.aborted||(q.abort(),r(e))}),n.isStream(g)?g.pipe(q):q.end(g)})}},function(e,t){e.exports=require("assert")},function(e,t){e.exports=require("stream")},function(e,t,r){"undefined"==typeof process||"renderer"===process.type?e.exports=r(29):e.exports=r(31)},function(e,t,r){function n(){var e;try{e=t.storage.debug}catch(e){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e}(t=e.exports=r(12)).log=function(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},t.formatArgs=function(e){var r=this.useColors;if(e[0]=(r?"%c":"")+this.namespace+(r?" %c":" ")+e[0]+(r?"%c ":" ")+"+"+t.humanize(this.diff),!r)return;var n="color: "+this.color;e.splice(1,0,n,"color: inherit");var o=0,s=0;e[0].replace(/%[a-zA-Z%]/g,function(e){"%%"!==e&&(o++,"%c"===e&&(s=o))}),e.splice(s,0,n)},t.save=function(e){try{null==e?t.storage.removeItem("debug"):t.storage.debug=e}catch(e){}},t.load=n,t.useColors=function(){if("undefined"!=typeof window&&window.process&&"renderer"===window.process.type)return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(e){}}(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.formatters.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},t.enable(n())},function(e,t){var r=1e3,n=60*r,o=60*n,s=24*o,i=365.25*s;function a(e,t,r){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+r:Math.ceil(e/t)+" "+r+"s"}e.exports=function(e,t){t=t||{};var c,u=typeof e;if("string"===u&&e.length>0)return function(e){if((e=String(e)).length>100)return;var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(!t)return;var a=parseFloat(t[1]);switch((t[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return a*i;case"days":case"day":case"d":return a*s;case"hours":case"hour":case"hrs":case"hr":case"h":return a*o;case"minutes":case"minute":case"mins":case"min":case"m":return a*n;case"seconds":case"second":case"secs":case"sec":case"s":return a*r;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return a;default:return}}(e);if("number"===u&&!1===isNaN(e))return t.long?a(c=e,s,"day")||a(c,o,"hour")||a(c,n,"minute")||a(c,r,"second")||c+" ms":function(e){if(e>=s)return Math.round(e/s)+"d";if(e>=o)return Math.round(e/o)+"h";if(e>=n)return Math.round(e/n)+"m";if(e>=r)return Math.round(e/r)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},function(e,t,r){var n=r(32),o=r(33);(t=e.exports=r(12)).init=function(e){e.inspectOpts={};for(var r=Object.keys(t.inspectOpts),n=0;n<r.length;n++)e.inspectOpts[r[n]]=t.inspectOpts[r[n]]},t.log=function(){return process.stderr.write(o.format.apply(o,arguments)+"\n")},t.formatArgs=function(e){var r=this.namespace;if(this.useColors){var n=this.color,o="[3"+(n<8?n:"8;5;"+n),s="  "+o+";1m"+r+" [0m";e[0]=s+e[0].split("\n").join("\n"+s),e.push(o+"m+"+t.humanize(this.diff)+"[0m")}else e[0]=(t.inspectOpts.hideDate?"":(new Date).toISOString()+" ")+r+" "+e[0]},t.save=function(e){null==e?delete process.env.DEBUG:process.env.DEBUG=e},t.load=i,t.useColors=function(){return"colors"in t.inspectOpts?Boolean(t.inspectOpts.colors):n.isatty(process.stderr.fd)},t.colors=[6,2,3,4,5,1];try{var s=r(34);s&&s.level>=2&&(t.colors=[20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,199,200,201,202,203,204,205,206,207,208,209,214,215,220,221])}catch(e){}function i(){return process.env.DEBUG}t.inspectOpts=Object.keys(process.env).filter(function(e){return/^debug_/i.test(e)}).reduce(function(e,t){var r=t.substring(6).toLowerCase().replace(/_([a-z])/g,function(e,t){return t.toUpperCase()}),n=process.env[t];return n=!!/^(yes|on|true|enabled)$/i.test(n)||!/^(no|off|false|disabled)$/i.test(n)&&("null"===n?null:Number(n)),e[r]=n,e},{}),t.formatters.o=function(e){return this.inspectOpts.colors=this.useColors,o.inspect(e,this.inspectOpts).split("\n").map(function(e){return e.trim()}).join(" ")},t.formatters.O=function(e){return this.inspectOpts.colors=this.useColors,o.inspect(e,this.inspectOpts)},t.enable(i())},function(e,t){e.exports=require("tty")},function(e,t){e.exports=require("util")},function(e,t,r){"use strict";var n=process.argv,o=n.indexOf("--"),s=function(e){e="--"+e;var t=n.indexOf(e);return-1!==t&&(-1===o||t<o)};e.exports="FORCE_COLOR"in process.env||!(s("no-color")||s("no-colors")||s("color=false"))&&(!!(s("color")||s("colors")||s("color=true")||s("color=always"))||!(process.stdout&&!process.stdout.isTTY)&&("win32"===process.platform||"COLORTERM"in process.env||"dumb"!==process.env.TERM&&!!/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)))},function(e,t){e.exports=require("zlib")},function(e){e.exports={_from:"axios@^0.18.0",_id:"axios@0.18.0",_inBundle:!1,_integrity:"sha1-MtU+SFHv3AoRmTts0AB4nXDAUQI=",_location:"/axios",_phantomChildren:{},_requested:{type:"range",registry:!0,raw:"axios@^0.18.0",name:"axios",escapedName:"axios",rawSpec:"^0.18.0",saveSpec:null,fetchSpec:"^0.18.0"},_requiredBy:["/","/@bearer/bearer-cli","/@bearer/cli","/@bearer/intents"],_resolved:"https://registry.npmjs.org/axios/-/axios-0.18.0.tgz",_shasum:"32d53e4851efdc0a11993b6cd000789d70c05102",_spec:"axios@^0.18.0",_where:"/home/pputko/projects/practice/google-attach-file-v2",author:{name:"Matt Zabriskie"},browser:{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},bugs:{url:"https://github.com/axios/axios/issues"},bundleDependencies:!1,bundlesize:[{path:"./dist/axios.min.js",threshold:"5kB"}],dependencies:{"follow-redirects":"^1.3.0","is-buffer":"^1.1.5"},deprecated:!1,description:"Promise based HTTP client for the browser and node.js",devDependencies:{bundlesize:"^0.5.7",coveralls:"^2.11.9","es6-promise":"^4.0.5",grunt:"^1.0.1","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.0.0","grunt-contrib-nodeunit":"^1.0.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^19.0.0","grunt-karma":"^2.0.0","grunt-ts":"^6.0.0-beta.3","grunt-webpack":"^1.0.18","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1",karma:"^1.3.0","karma-chrome-launcher":"^2.0.0","karma-coverage":"^1.0.0","karma-firefox-launcher":"^1.0.0","karma-jasmine":"^1.0.2","karma-jasmine-ajax":"^0.1.13","karma-opera-launcher":"^1.0.0","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^1.1.0","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.7","karma-webpack":"^1.7.0","load-grunt-tasks":"^3.5.2",minimist:"^1.2.0",sinon:"^1.17.4",typescript:"^2.0.3","url-search-params":"^0.6.1",webpack:"^1.13.1","webpack-dev-server":"^1.14.1"},homepage:"https://github.com/axios/axios",keywords:["xhr","http","ajax","promise","node"],license:"MIT",main:"index.js",name:"axios",repository:{type:"git",url:"git+https://github.com/axios/axios.git"},scripts:{build:"NODE_ENV=production grunt build",coveralls:"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",examples:"node ./examples/server.js",postversion:"git push && git push --tags",preversion:"npm test",start:"node ./sandbox/server.js",test:"grunt test && bundlesize",version:"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"},typings:"./index.d.ts",version:"0.18.0"}},function(e,t,r){"use strict";var n=r(0);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){n.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=o},function(e,t,r){"use strict";var n=r(0),o=r(39),s=r(13),i=r(1),a=r(40),c=r(41);function u(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return u(e),e.baseURL&&!a(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),n.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||i.adapter)(e).then(function(t){return u(e),t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(u(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t,r){return n.forEach(r,function(r){e=r(e,t)}),e}},function(e,t,r){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,r){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,r){"use strict";var n=r(14);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var r=this;e(function(e){r.reason||(r.reason=new n(e),t(r.reason))})}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o(function(t){e=t}),cancel:e}},e.exports=o},function(e,t,r){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},,function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(o,s){function i(e){try{c(n.next(e))}catch(e){s(e)}}function a(e){try{c(n.throw(e))}catch(e){s(e)}}function c(e){e.done?o(e.value):new r(function(t){t(e.value)}).then(i,a)}c((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=r(3);class s extends Error{}class i extends Error{}class a extends Error{}class c{constructor(e,t){this.baseURL=e,this.signature=t,console.log("[BEARER]","baseURL",e),this.client=o.default.create({baseURL:e,timeout:3e3,headers:{Accept:"application/json","User-Agent":"Bearer"}})}static instance(e){return new c(process.env.bearerBaseURL,e)}getData(e){return n(this,void 0,void 0,function*(){if(!e)return Promise.resolve(null);try{return(yield this.client.get(`api/v2/items/${e}`,{params:{signature:this.signature}})).data}catch(e){if(e.response&&404!==e.response.status)throw new s("Error while retrieving data")}return Promise.resolve(null)})}updateData(e,t){return n(this,void 0,void 0,function*(){try{return(yield this.client.put(`api/v2/items/${e}`,Object.assign({},t,{ReadAllowed:!0}),{params:{signature:this.signature}})).data}catch(e){throw new i(`Error while updating data: ${e.toString()}`)}})}saveData(e){return n(this,void 0,void 0,function*(){try{return(yield this.client.post("api/v2/items",Object.assign({},e,{ReadAllowed:!0}),{params:{signature:this.signature}})).data}catch(e){throw new a(`Error while creating data: ${e.toString()}`)}})}}t.DBClient=c,t.default=((e,t)=>new c(e,t))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.sendSuccessMessage=function(e,t){e(null,t)},t.sendErrorMessage=function(e,t){e(null,t)}},,function(e,t,r){"use strict";r.r(t),r.d(t,"default",function(){return o});var n=r(15);class o{static action(e,t,r,n,o){const{attachedFiles:s}=r;o({state:Object.assign({},n,{attachedFiles:s.map(e=>({name:e.name,id:e.id,mimeType:e.mimeType,kind:e.kind,size:e.size}))}),data:s})}}o.intentType=n.SaveState,o.intentName="saveAttachedFiles"}]);