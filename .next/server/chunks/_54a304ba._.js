module.exports=[87693,(e,t,r)=>{"use strict";var n=e.e&&e.e.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0}),r.getKeyIndexes=r.hasFlag=r.exists=r.list=void 0;let i=n(e.r(775291));r.list=Object.keys(i.default);let a={};function s(e){"string"!=typeof e&&(e=String(e));let t=e.indexOf("->");return -1===t?e.length:t}r.list.forEach(e=>{a[e]=i.default[e].flags.reduce(function(e,t){return e[t]=!0,e},{})}),r.exists=function(e){return!!i.default[e]},r.hasFlag=function(e,t){if(!a[e])throw Error("Unknown command "+e);return!!a[e][t]},r.getKeyIndexes=function(e,t,r){let n=i.default[e];if(!n)throw Error("Unknown command "+e);if(!Array.isArray(t))throw Error("Expect args to be an array");let a=[],o=!!(r&&r.parseExternalKey),l=(e,t)=>{let r=[],n=Number(e[t]);for(let e=0;e<n;e++)r.push(e+t+1);return r},u=(e,t,r)=>{for(let n=t;n<e.length-1;n+=1)if(String(e[n]).toLowerCase()===r.toLowerCase())return n+1;return null};switch(e){case"zunionstore":case"zinterstore":case"zdiffstore":a.push(0,...l(t,1));break;case"eval":case"evalsha":case"eval_ro":case"evalsha_ro":case"fcall":case"fcall_ro":case"blmpop":case"bzmpop":a.push(...l(t,1));break;case"sintercard":case"lmpop":case"zunion":case"zinter":case"zmpop":case"zintercard":case"zdiff":a.push(...l(t,0));break;case"georadius":{a.push(0);let e=u(t,5,"STORE");e&&a.push(e);let r=u(t,5,"STOREDIST");r&&a.push(r);break}case"georadiusbymember":{a.push(0);let e=u(t,4,"STORE");e&&a.push(e);let r=u(t,4,"STOREDIST");r&&a.push(r);break}case"sort":case"sort_ro":a.push(0);for(let e=1;e<t.length-1;e++){let r=t[e];if("string"!=typeof r)continue;let n=r.toUpperCase();"GET"===n?(e+=1,"#"!==(r=t[e])&&(o?a.push([e,s(r)]):a.push(e))):"BY"===n?(e+=1,o?a.push([e,s(t[e])]):a.push(e)):"STORE"===n&&(e+=1,a.push(e))}break;case"migrate":if(""===t[2])for(let e=5;e<t.length-1;e++){let r=t[e];if("string"==typeof r&&"KEYS"===r.toUpperCase()){for(let r=e+1;r<t.length;r++)a.push(r);break}}else a.push(2);break;case"xreadgroup":case"xread":for(let r=3*("xread"!==e);r<t.length-1;r++)if("STREAMS"===String(t[r]).toUpperCase()){for(let e=r+1;e<=r+(t.length-1-r)/2;e++)a.push(e);break}break;default:if(n.step>0){let e=n.keyStart-1,r=n.keyStop>0?n.keyStop:t.length+n.keyStop+1;for(let t=e;t<r;t+=n.step)a.push(t)}}return a}},208538,(e,t,r)=>{"use strict";let n;function i(e,t){try{let e=n;return n=null,e.apply(this,arguments)}catch(e){return r.errorObj.e=e,r.errorObj}}Object.defineProperty(r,"__esModule",{value:!0}),r.tryCatch=r.errorObj=void 0,r.errorObj={e:{}},r.tryCatch=function(e){return n=e,i}},142351,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=e.r(208538);function i(e){setTimeout(function(){throw e},0)}r.default=function(e,t,r){return"function"==typeof t&&e.then(e=>{let a;(a=void 0!==r&&Object(r).spread&&Array.isArray(e)?n.tryCatch(t).apply(void 0,[null].concat(e)):void 0===e?n.tryCatch(t)(null):n.tryCatch(t)(null,e))===n.errorObj&&i(a.e)},e=>{if(!e){let t=Error(e+"");Object.assign(t,{cause:e}),e=t}let r=n.tryCatch(t)(e);r===n.errorObj&&i(r.e)}),e}},429338,(e,t,r)=>{"use strict";let n=e.r(449719);class i extends Error{get name(){return this.constructor.name}}class a extends i{get name(){return this.constructor.name}}t.exports={RedisError:i,ParserError:class extends i{constructor(e,t,r){n(t),n.strictEqual(typeof r,"number");const i=Error.stackTraceLimit;Error.stackTraceLimit=2,super(e),Error.stackTraceLimit=i,this.offset=r,this.buffer=t}get name(){return this.constructor.name}},ReplyError:class extends i{constructor(e){const t=Error.stackTraceLimit;Error.stackTraceLimit=2,super(e),Error.stackTraceLimit=t}get name(){return this.constructor.name}},AbortError:a,InterruptError:class extends a{get name(){return this.constructor.name}}}},227351,(e,t,r)=>{"use strict";let n=e.r(449719),i=e.r(224361);function a(e){Object.defineProperty(this,"message",{value:e||"",configurable:!0,writable:!0}),Error.captureStackTrace(this,this.constructor)}function s(e,t,r){n(t),n.strictEqual(typeof r,"number"),Object.defineProperty(this,"message",{value:e||"",configurable:!0,writable:!0});let i=Error.stackTraceLimit;Error.stackTraceLimit=2,Error.captureStackTrace(this,this.constructor),Error.stackTraceLimit=i,this.offset=r,this.buffer=t}function o(e){Object.defineProperty(this,"message",{value:e||"",configurable:!0,writable:!0});let t=Error.stackTraceLimit;Error.stackTraceLimit=2,Error.captureStackTrace(this,this.constructor),Error.stackTraceLimit=t}function l(e){Object.defineProperty(this,"message",{value:e||"",configurable:!0,writable:!0}),Error.captureStackTrace(this,this.constructor)}function u(e){Object.defineProperty(this,"message",{value:e||"",configurable:!0,writable:!0}),Error.captureStackTrace(this,this.constructor)}i.inherits(a,Error),Object.defineProperty(a.prototype,"name",{value:"RedisError",configurable:!0,writable:!0}),i.inherits(s,a),Object.defineProperty(s.prototype,"name",{value:"ParserError",configurable:!0,writable:!0}),i.inherits(o,a),Object.defineProperty(o.prototype,"name",{value:"ReplyError",configurable:!0,writable:!0}),i.inherits(l,a),Object.defineProperty(l.prototype,"name",{value:"AbortError",configurable:!0,writable:!0}),i.inherits(u,l),Object.defineProperty(u.prototype,"name",{value:"InterruptError",configurable:!0,writable:!0}),t.exports={RedisError:a,ParserError:s,ReplyError:o,AbortError:l,InterruptError:u}},287315,(e,t,r)=>{"use strict";t.exports=55>process.version.charCodeAt(1)&&46===process.version.charCodeAt(2)?e.r(227351):e.r(429338)},343594,(e,t,r)=>{var n=[0,4129,8258,12387,16516,20645,24774,28903,33032,37161,41290,45419,49548,53677,57806,61935,4657,528,12915,8786,21173,17044,29431,25302,37689,33560,45947,41818,54205,50076,62463,58334,9314,13379,1056,5121,25830,29895,17572,21637,42346,46411,34088,38153,58862,62927,50604,54669,13907,9842,5649,1584,30423,26358,22165,18100,46939,42874,38681,34616,63455,59390,55197,51132,18628,22757,26758,30887,2112,6241,10242,14371,51660,55789,59790,63919,35144,39273,43274,47403,23285,19156,31415,27286,6769,2640,14899,10770,56317,52188,64447,60318,39801,35672,47931,43802,27814,31879,19684,23749,11298,15363,3168,7233,60846,64911,52716,56781,44330,48395,36200,40265,32407,28342,24277,20212,15891,11826,7761,3696,65439,61374,57309,53244,48923,44858,40793,36728,37256,33193,45514,41451,53516,49453,61774,57711,4224,161,12482,8419,20484,16421,28742,24679,33721,37784,41979,46042,49981,54044,58239,62302,689,4752,8947,13010,16949,21012,25207,29270,46570,42443,38312,34185,62830,58703,54572,50445,13538,9411,5280,1153,29798,25671,21540,17413,42971,47098,34713,38840,59231,63358,50973,55100,9939,14066,1681,5808,26199,30326,17941,22068,55628,51565,63758,59695,39368,35305,47498,43435,22596,18533,30726,26663,6336,2273,14466,10403,52093,56156,60223,64286,35833,39896,43963,48026,19061,23124,27191,31254,2801,6864,10931,14994,64814,60687,56684,52557,48554,44427,40424,36297,31782,27655,23652,19525,15522,11395,7392,3265,61215,65342,53085,57212,44955,49082,36825,40952,28183,32310,20053,24180,11923,16050,3793,7920],i=function(e){for(var t,r=0,n=0,i=[],a=e.length;r<a;r++)(t=e.charCodeAt(r))<128?i[n++]=t:(t<2048?i[n++]=t>>6|192:((64512&t)==55296&&r+1<e.length&&(64512&e.charCodeAt(r+1))==56320?(t=65536+((1023&t)<<10)+(1023&e.charCodeAt(++r)),i[n++]=t>>18|240,i[n++]=t>>12&63|128):i[n++]=t>>12|224,i[n++]=t>>6&63|128),i[n++]=63&t|128);return i},a=t.exports=function(e){for(var t,r=0,a=-1,s=0,o=0,l="string"==typeof e?i(e):e,u=l.length;r<u;){if(t=l[r++],-1===a)123===t&&(a=r);else if(125!==t)o=n[(t^o>>8)&255]^o<<8;else if(r-1!==a)return 16383&o;s=n[(t^s>>8)&255]^s<<8}return 16383&s};t.exports.generateMulti=function(e){for(var t=1,r=e.length,n=a(e[0]);t<r;)if(a(e[t++])!==n)return -1;return n}},794384,(e,t,r)=>{var n,i=/^(?:0|[1-9]\d*)$/;function a(e,t,r){switch(r.length){case 0:return e.call(t);case 1:return e.call(t,r[0]);case 2:return e.call(t,r[0],r[1]);case 3:return e.call(t,r[0],r[1],r[2])}return e.apply(t,r)}var s=Object.prototype,o=s.hasOwnProperty,l=s.toString,u=s.propertyIsEnumerable,d=Math.max;function c(e,t,r,n){return void 0===e||m(e,s[r])&&!o.call(n,r)?t:e}function h(e,t){return t=d(void 0===t?e.length-1:t,0),function(){for(var r=arguments,n=-1,i=d(r.length-t,0),s=Array(i);++n<i;)s[n]=r[t+n];n=-1;for(var o=Array(t+1);++n<t;)o[n]=r[n];return o[t]=s,a(e,this,o)}}function p(e,t){return!!(t=null==t?0x1fffffffffffff:t)&&("number"==typeof e||i.test(e))&&e>-1&&e%1==0&&e<t}function m(e,t){return e===t||e!=e&&t!=t}var f=Array.isArray;function y(e){var t,r,n;return null!=e&&"number"==typeof(t=e.length)&&t>-1&&t%1==0&&t<=0x1fffffffffffff&&"[object Function]"!=(n=b(r=e)?l.call(r):"")&&"[object GeneratorFunction]"!=n}function b(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}var g=(n=function(e,t,r,n){var i;!function(e,t,r,n){r||(r={});for(var i=-1,a=t.length;++i<a;){var s=t[i],l=n?n(r[s],e[s],s,r,e):void 0;!function(e,t,r){var n=e[t];o.call(e,t)&&m(n,r)&&(void 0!==r||t in e)||(e[t]=r)}(r,s,void 0===l?e[s]:l)}}(t,y(i=t)?function(e,t){var r,n,i,a=f(e)||(i=n=r=e)&&"object"==typeof i&&y(n)&&o.call(r,"callee")&&(!u.call(r,"callee")||"[object Arguments]"==l.call(r))?function(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r);return n}(e.length,String):[],s=a.length,d=!!s;for(var c in e)(t||o.call(e,c))&&!(d&&("length"==c||p(c,s)))&&a.push(c);return a}(i,!0):function(e){if(!b(e)){var t,r,n=e,i=[];if(null!=n)for(var a in Object(n))i.push(a);return i}var l=(r=(t=e)&&t.constructor,t===("function"==typeof r&&r.prototype||s)),u=[];for(var d in e)"constructor"==d&&(l||!o.call(e,d))||u.push(d);return u}(i),e,n)},h(function(e,t){var r=-1,i=t.length,a=i>1?t[i-1]:void 0,s=i>2?t[2]:void 0;for(a=n.length>3&&"function"==typeof a?(i--,a):void 0,s&&function(e,t,r){if(!b(r))return!1;var n=typeof t;return("number"==n?!!(y(r)&&p(t,r.length)):"string"==n&&t in r)&&m(r[t],e)}(t[0],t[1],s)&&(a=i<3?void 0:a,i=1),e=Object(e);++r<i;){var o=t[r];o&&n(e,o,r,a)}return e}));t.exports=h(function(e){return e.push(void 0,c),a(g,void 0,e)})},595927,(e,t,r)=>{var n=Object.prototype,i=n.hasOwnProperty,a=n.toString,s=n.propertyIsEnumerable;t.exports=function(e){var t,r,n,o,l,u,d,c;return!!(n=t=e)&&"object"==typeof n&&null!=(r=t)&&"number"==typeof(o=r.length)&&o>-1&&o%1==0&&o<=0x1fffffffffffff&&"[object Function]"!=(d=typeof(u=l=r),c=u&&("object"==d||"function"==d)?a.call(l):"")&&"[object GeneratorFunction]"!=c&&i.call(e,"callee")&&(!s.call(e,"callee")||"[object Arguments]"==a.call(e))}},318761,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.isArguments=r.defaults=r.noop=void 0,r.defaults=e.r(794384),r.isArguments=e.r(595927),r.noop=function(){}},951550,(e,t,r)=>{function n(e,t,r,n){return Math.round(e/r)+" "+n+(t>=1.5*r?"s":"")}t.exports=function(e,t){t=t||{};var r,i,a,s,o=typeof e;if("string"===o&&e.length>0){var l=e;if(!((l=String(l)).length>100)){var u=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(l);if(u){var d=parseFloat(u[1]);switch((u[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*d;case"weeks":case"week":case"w":return 6048e5*d;case"days":case"day":case"d":return 864e5*d;case"hours":case"hour":case"hrs":case"hr":case"h":return 36e5*d;case"minutes":case"minute":case"mins":case"min":case"m":return 6e4*d;case"seconds":case"second":case"secs":case"sec":case"s":return 1e3*d;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return d;default:break}}}return}if("number"===o&&isFinite(e)){return t.long?(i=Math.abs(r=e))>=864e5?n(r,i,864e5,"day"):i>=36e5?n(r,i,36e5,"hour"):i>=6e4?n(r,i,6e4,"minute"):i>=1e3?n(r,i,1e3,"second"):r+" ms":(s=Math.abs(a=e))>=864e5?Math.round(a/864e5)+"d":s>=36e5?Math.round(a/36e5)+"h":s>=6e4?Math.round(a/6e4)+"m":s>=1e3?Math.round(a/1e3)+"s":a+"ms"}throw Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},420319,(e,t,r)=>{t.exports=function(t){function r(e){let t,i,a,s=null;function o(...e){if(!o.enabled)return;let n=Number(new Date);o.diff=n-(t||n),o.prev=t,o.curr=n,t=n,e[0]=r.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let i=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,(t,n)=>{if("%%"===t)return"%";i++;let a=r.formatters[n];if("function"==typeof a){let r=e[i];t=a.call(o,r),e.splice(i,1),i--}return t}),r.formatArgs.call(o,e),(o.log||r.log).apply(o,e)}return o.namespace=e,o.useColors=r.useColors(),o.color=r.selectColor(e),o.extend=n,o.destroy=r.destroy,Object.defineProperty(o,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==s?s:(i!==r.namespaces&&(i=r.namespaces,a=r.enabled(e)),a),set:e=>{s=e}}),"function"==typeof r.init&&r.init(o),o}function n(e,t){let n=r(this.namespace+(void 0===t?":":t)+e);return n.log=this.log,n}function i(e,t){let r=0,n=0,i=-1,a=0;for(;r<e.length;)if(n<t.length&&(t[n]===e[r]||"*"===t[n]))"*"===t[n]?(i=n,a=r):r++,n++;else{if(-1===i)return!1;n=i+1,r=++a}for(;n<t.length&&"*"===t[n];)n++;return n===t.length}return r.debug=r,r.default=r,r.coerce=function(e){return e instanceof Error?e.stack||e.message:e},r.disable=function(){let e=[...r.names,...r.skips.map(e=>"-"+e)].join(",");return r.enable(""),e},r.enable=function(e){for(let t of(r.save(e),r.namespaces=e,r.names=[],r.skips=[],("string"==typeof e?e:"").trim().replace(/\s+/g,",").split(",").filter(Boolean)))"-"===t[0]?r.skips.push(t.slice(1)):r.names.push(t)},r.enabled=function(e){for(let t of r.skips)if(i(e,t))return!1;for(let t of r.names)if(i(e,t))return!0;return!1},r.humanize=e.r(951550),r.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(t).forEach(e=>{r[e]=t[e]}),r.names=[],r.skips=[],r.formatters={},r.selectColor=function(e){let t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r)|0;return r.colors[Math.abs(t)%r.colors.length]},r.enable(r.load()),r}},801199,(e,t,r)=>{"use strict";t.exports=(e,t=process.argv)=>{let r=e.startsWith("-")?"":1===e.length?"-":"--",n=t.indexOf(r+e),i=t.indexOf("--");return -1!==n&&(-1===i||n<i)}},524353,(e,t,r)=>{"use strict";let n;e.r(446786);let i=e.r(870722),a=e.r(801199),{env:s}=process;function o(e){return 0!==e&&{level:e,hasBasic:!0,has256:e>=2,has16m:e>=3}}function l(e,t){if(0===n)return 0;if(a("color=16m")||a("color=full")||a("color=truecolor"))return 3;if(a("color=256"))return 2;if(e&&!t&&void 0===n)return 0;let r=n||0;if("dumb"===s.TERM)return r;if("CI"in s)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE"].some(e=>e in s)||"codeship"===s.CI_NAME?1:r;if("TEAMCITY_VERSION"in s)return+!!/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(s.TEAMCITY_VERSION);if("truecolor"===s.COLORTERM)return 3;if("TERM_PROGRAM"in s){let e=parseInt((s.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(s.TERM_PROGRAM){case"iTerm.app":return e>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(s.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(s.TERM)||"COLORTERM"in s?1:r}a("no-color")||a("no-colors")||a("color=false")||a("color=never")?n=0:(a("color")||a("colors")||a("color=true")||a("color=always"))&&(n=1),"FORCE_COLOR"in s&&(n="true"===s.FORCE_COLOR?1:"false"===s.FORCE_COLOR?0:0===s.FORCE_COLOR.length?1:Math.min(parseInt(s.FORCE_COLOR,10),3)),t.exports={supportsColor:function(e){return o(l(e,e&&e.isTTY))},stdout:o(l(!0,i.isatty(1))),stderr:o(l(!0,i.isatty(2)))}},278766,(e,t,r)=>{let n=e.r(870722),i=e.r(224361);r.init=function(e){e.inspectOpts={};let t=Object.keys(r.inspectOpts);for(let n=0;n<t.length;n++)e.inspectOpts[t[n]]=r.inspectOpts[t[n]]},r.log=function(...e){return process.stderr.write(i.formatWithOptions(r.inspectOpts,...e)+"\n")},r.formatArgs=function(e){let{namespace:n,useColors:i}=this;if(i){let r=this.color,i="\x1b[3"+(r<8?r:"8;5;"+r),a=`  ${i};1m${n} \u001B[0m`;e[0]=a+e[0].split("\n").join("\n"+a),e.push(i+"m+"+t.exports.humanize(this.diff)+"\x1b[0m")}else e[0]=(r.inspectOpts.hideDate?"":new Date().toISOString()+" ")+n+" "+e[0]},r.save=function(e){e?process.env.DEBUG=e:delete process.env.DEBUG},r.load=function(){return process.env.DEBUG},r.useColors=function(){return"colors"in r.inspectOpts?!!r.inspectOpts.colors:n.isatty(process.stderr.fd)},r.destroy=i.deprecate(()=>{},"Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."),r.colors=[6,2,3,4,5,1];try{let t=e.r(524353);t&&(t.stderr||t).level>=2&&(r.colors=[20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,199,200,201,202,203,204,205,206,207,208,209,214,215,220,221])}catch(e){}r.inspectOpts=Object.keys(process.env).filter(e=>/^debug_/i.test(e)).reduce((e,t)=>{let r=t.substring(6).toLowerCase().replace(/_([a-z])/g,(e,t)=>t.toUpperCase()),n=process.env[t];return n=!!/^(yes|on|true|enabled)$/i.test(n)||!/^(no|off|false|disabled)$/i.test(n)&&("null"===n?null:Number(n)),e[r]=n,e},{}),t.exports=e.r(420319)(r);let{formatters:a}=t.exports;a.o=function(e){return this.inspectOpts.colors=this.useColors,i.inspect(e,this.inspectOpts).split("\n").map(e=>e.trim()).join(" ")},a.O=function(e){return this.inspectOpts.colors=this.useColors,i.inspect(e,this.inspectOpts)}},780353,(e,t,r)=>{let n;r.formatArgs=function(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+t.exports.humanize(this.diff),!this.useColors)return;let r="color: "+this.color;e.splice(1,0,r,"color: inherit");let n=0,i=0;e[0].replace(/%[a-zA-Z%]/g,e=>{"%%"!==e&&(n++,"%c"===e&&(i=n))}),e.splice(i,0,r)},r.save=function(e){try{e?r.storage.setItem("debug",e):r.storage.removeItem("debug")}catch(e){}},r.load=function(){let e;try{e=r.storage.getItem("debug")||r.storage.getItem("DEBUG")}catch(e){}return!e&&"u">typeof process&&"env"in process&&(e=process.env.DEBUG),e},r.useColors=function(){let e;return!("u">typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("u">typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"u">typeof navigator&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||"u">typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},r.storage=function(){try{return localStorage}catch(e){}}(),n=!1,r.destroy=()=>{n||(n=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))},r.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],r.log=console.debug||console.log||(()=>{}),t.exports=e.r(420319)(r);let{formatters:i}=t.exports;i.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}},426914,(e,t,r)=>{"u"<typeof process||"renderer"===process.type||process.__nwjs?t.exports=e.r(780353):t.exports=e.r(278766)},200880,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.genRedactedString=r.getStringValue=r.MAX_ARGUMENT_LENGTH=void 0;let n=e.r(426914);function i(e){if(null!==e)switch(typeof e){case"boolean":case"number":return;case"object":if(Buffer.isBuffer(e))return e.toString("hex");if(Array.isArray(e))return e.join(",");try{return JSON.stringify(e)}catch(e){return}case"string":return e}}function a(e,t){let{length:r}=e;return r<=t?e:e.slice(0,t)+' ... <REDACTED full-length="'+r+'">'}r.MAX_ARGUMENT_LENGTH=200,r.getStringValue=i,r.genRedactedString=a,r.default=function(e){let t=(0,n.default)(`ioredis:${e}`);function r(...e){if(t.enabled){for(let t=1;t<e.length;t++){let r=i(e[t]);"string"==typeof r&&r.length>200&&(e[t]=a(r,200))}return t.apply(null,e)}}return Object.defineProperties(r,{namespace:{get:()=>t.namespace},enabled:{get:()=>t.enabled},destroy:{get:()=>t.destroy},log:{get:()=>t.log,set(e){t.log=e}}}),r}},766275,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=`-----BEGIN CERTIFICATE-----
MIIDTzCCAjegAwIBAgIJAKSVpiDswLcwMA0GCSqGSIb3DQEBBQUAMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTAeFw0xMzEwMDExMjE0NTVaFw0yMzA5MjkxMjE0NTVaMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALZqkh/DczWP
JnxnHLQ7QL0T4B4CDKWBKCcisriGbA6ZePWVNo4hfKQC6JrzfR+081NeD6VcWUiz
rmd+jtPhIY4c+WVQYm5PKaN6DT1imYdxQw7aqO5j2KUCEh/cznpLxeSHoTxlR34E
QwF28Wl3eg2vc5ct8LjU3eozWVk3gb7alx9mSA2SgmuX5lEQawl++rSjsBStemY2
BDwOpAMXIrdEyP/cVn8mkvi/BDs5M5G+09j0gfhyCzRWMQ7Hn71u1eolRxwVxgi3
TMn+/vTaFSqxKjgck6zuAYjBRPaHe7qLxHNr1So/Mc9nPy+3wHebFwbIcnUojwbp
4nctkWbjb2cCAwEAAaNQME4wHQYDVR0OBBYEFP1whtcrydmW3ZJeuSoKZIKjze3w
MB8GA1UdIwQYMBaAFP1whtcrydmW3ZJeuSoKZIKjze3wMAwGA1UdEwQFMAMBAf8w
DQYJKoZIhvcNAQEFBQADggEBAG2erXhwRAa7+ZOBs0B6X57Hwyd1R4kfmXcs0rta
lbPpvgULSiB+TCbf3EbhJnHGyvdCY1tvlffLjdA7HJ0PCOn+YYLBA0pTU/dyvrN6
Su8NuS5yubnt9mb13nDGYo1rnt0YRfxN+8DM3fXIVr038A30UlPX2Ou1ExFJT0MZ
uFKY6ZvLdI6/1cbgmguMlAhM+DhKyV6Sr5699LM3zqeI816pZmlREETYkGr91q7k
BpXJu/dtHaGxg1ZGu6w/PCsYGUcECWENYD4VQPd8N32JjOfu6vEgoEAwfPP+3oGp
Z4m3ewACcWOAenqflb+cQYC4PsF7qbXDmRaWrbKntOlZ3n0=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIGMTCCBBmgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwajELMAkGA1UEBhMCVVMx
CzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJzMS0w
KwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcN
MTgwMjI1MTUzNzM3WhcNMjgwMjIzMTUzNzM3WjBfMQswCQYDVQQGEwJVUzELMAkG
A1UECAwCQ0ExEjAQBgNVBAoMCVJlZGlzTGFiczEvMC0GA1UEAwwmUkNQIEludGVy
bWVkaWF0ZSBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwggIiMA0GCSqGSIb3DQEBAQUA
A4ICDwAwggIKAoICAQDf9dqbxc8Bq7Ctq9rWcxrGNKKHivqLAFpPq02yLPx6fsOv
Tq7GsDChAYBBc4v7Y2Ap9RD5Vs3dIhEANcnolf27QwrG9RMnnvzk8pCvp1o6zSU4
VuOE1W66/O1/7e2rVxyrnTcP7UgK43zNIXu7+tiAqWsO92uSnuMoGPGpeaUm1jym
hjWKtkAwDFSqvHY+XL5qDVBEjeUe+WHkYUg40cAXjusAqgm2hZt29c2wnVrxW25W
P0meNlzHGFdA2AC5z54iRiqj57dTfBTkHoBczQxcyw6hhzxZQ4e5I5zOKjXXEhZN
r0tA3YC14CTabKRus/JmZieyZzRgEy2oti64tmLYTqSlAD78pRL40VNoaSYetXLw
hhNsXCHgWaY6d5bLOc/aIQMAV5oLvZQKvuXAF1IDmhPA+bZbpWipp0zagf1P1H3s
UzsMdn2KM0ejzgotbtNlj5TcrVwpmvE3ktvUAuA+hi3FkVx1US+2Gsp5x4YOzJ7u
P1WPk6ShF0JgnJH2ILdj6kttTWwFzH17keSFICWDfH/+kM+k7Y1v3EXMQXE7y0T9
MjvJskz6d/nv+sQhY04xt64xFMGTnZjlJMzfQNi7zWFLTZnDD0lPowq7l3YiPoTT
t5Xky83lu0KZsZBo0WlWaDG00gLVdtRgVbcuSWxpi5BdLb1kRab66JptWjxwXQID
AQABo4HrMIHoMDoGA1UdHwQzMDEwL6AtoCuGKWh0dHBzOi8vcmwtY2Etc2VydmVy
LnJlZGlzbGFicy5jb20vdjEvY3JsMEYGCCsGAQUFBwEBBDowODA2BggrBgEFBQcw
AYYqaHR0cHM6Ly9ybC1jYS1zZXJ2ZXIucmVkaXNsYWJzLmNvbS92MS9vY3NwMB0G
A1UdDgQWBBQHar5OKvQUpP2qWt6mckzToeCOHDAfBgNVHSMEGDAWgBQi42wH6hM4
L2sujEvLM0/u8lRXTzASBgNVHRMBAf8ECDAGAQH/AgEAMA4GA1UdDwEB/wQEAwIB
hjANBgkqhkiG9w0BAQsFAAOCAgEAirEn/iTsAKyhd+pu2W3Z5NjCko4NPU0EYUbr
AP7+POK2rzjIrJO3nFYQ/LLuC7KCXG+2qwan2SAOGmqWst13Y+WHp44Kae0kaChW
vcYLXXSoGQGC8QuFSNUdaeg3RbMDYFT04dOkqufeWVccoHVxyTSg9eD8LZuHn5jw
7QDLiEECBmIJHk5Eeo2TAZrx4Yx6ufSUX5HeVjlAzqwtAqdt99uCJ/EL8bgpWbe+
XoSpvUv0SEC1I1dCAhCKAvRlIOA6VBcmzg5Am12KzkqTul12/VEFIgzqu0Zy2Jbc
AUPrYVu/+tOGXQaijy7YgwH8P8n3s7ZeUa1VABJHcxrxYduDDJBLZi+MjheUDaZ1
jQRHYevI2tlqeSBqdPKG4zBY5lS0GiAlmuze5oENt0P3XboHoZPHiqcK3VECgTVh
/BkJcuudETSJcZDmQ8YfoKfBzRQNg2sv/hwvUv73Ss51Sco8GEt2lD8uEdib1Q6z
zDT5lXJowSzOD5ZA9OGDjnSRL+2riNtKWKEqvtEG3VBJoBzu9GoxbAc7wIZLxmli
iF5a/Zf5X+UXD3s4TMmy6C4QZJpAA2egsSQCnraWO2ULhh7iXMysSkF/nzVfZn43
iqpaB8++9a37hWq14ZmOv0TJIDz//b2+KC4VFXWQ5W5QC6whsjT+OlG4p5ZYG0jo
616pxqo=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIFujCCA6KgAwIBAgIJAJ1aTT1lu2ScMA0GCSqGSIb3DQEBCwUAMGoxCzAJBgNV
BAYTAlVTMQswCQYDVQQIDAJDQTELMAkGA1UEBwwCQ0ExEjAQBgNVBAoMCVJlZGlz
TGFiczEtMCsGA1UEAwwkUmVkaXNMYWJzIFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9y
aXR5MB4XDTE4MDIyNTE1MjA0MloXDTM4MDIyMDE1MjA0MlowajELMAkGA1UEBhMC
VVMxCzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJz
MS0wKwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkw
ggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDLEjXy7YrbN5Waau5cd6g1
G5C2tMmeTpZ0duFAPxNU4oE3RHS5gGiok346fUXuUxbZ6QkuzeN2/2Z+RmRcJhQY
Dm0ZgdG4x59An1TJfnzKKoWj8ISmoHS/TGNBdFzXV7FYNLBuqZouqePI6ReC6Qhl
pp45huV32Q3a6IDrrvx7Wo5ZczEQeFNbCeCOQYNDdTmCyEkHqc2AGo8eoIlSTutT
ULOC7R5gzJVTS0e1hesQ7jmqHjbO+VQS1NAL4/5K6cuTEqUl+XhVhPdLWBXJQ5ag
54qhX4v+ojLzeU1R/Vc6NjMvVtptWY6JihpgplprN0Yh2556ewcXMeturcKgXfGJ
xeYzsjzXerEjrVocX5V8BNrg64NlifzTMKNOOv4fVZszq1SIHR8F9ROrqiOdh8iC
JpUbLpXH9hWCSEO6VRMB2xJoKu3cgl63kF30s77x7wLFMEHiwsQRKxooE1UhgS9K
2sO4TlQ1eWUvFvHSTVDQDlGQ6zu4qjbOpb3Q8bQwoK+ai2alkXVR4Ltxe9QlgYK3
StsnPhruzZGA0wbXdpw0bnM+YdlEm5ffSTpNIfgHeaa7Dtb801FtA71ZlH7A6TaI
SIQuUST9EKmv7xrJyx0W1pGoPOLw5T029aTjnICSLdtV9bLwysrLhIYG5bnPq78B
cS+jZHFGzD7PUVGQD01nOQIDAQABo2MwYTAdBgNVHQ4EFgQUIuNsB+oTOC9rLoxL
yzNP7vJUV08wHwYDVR0jBBgwFoAUIuNsB+oTOC9rLoxLyzNP7vJUV08wDwYDVR0T
AQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQADggIBAHfg
z5pMNUAKdMzK1aS1EDdK9yKz4qicILz5czSLj1mC7HKDRy8cVADUxEICis++CsCu
rYOvyCVergHQLREcxPq4rc5Nq1uj6J6649NEeh4WazOOjL4ZfQ1jVznMbGy+fJm3
3Hoelv6jWRG9iqeJZja7/1s6YC6bWymI/OY1e4wUKeNHAo+Vger7MlHV+RuabaX+
hSJ8bJAM59NCM7AgMTQpJCncrcdLeceYniGy5Q/qt2b5mJkQVkIdy4TPGGB+AXDJ
D0q3I/JDRkDUFNFdeW0js7fHdsvCR7O3tJy5zIgEV/o/BCkmJVtuwPYOrw/yOlKj
TY/U7ATAx9VFF6/vYEOMYSmrZlFX+98L6nJtwDqfLB5VTltqZ4H/KBxGE3IRSt9l
FXy40U+LnXzhhW+7VBAvyYX8GEXhHkKU8Gqk1xitrqfBXY74xKgyUSTolFSfFVgj
mcM/X4K45bka+qpkj7Kfv/8D4j6aZekwhN2ly6hhC1SmQ8qjMjpG/mrWOSSHZFmf
ybu9iD2AYHeIOkshIl6xYIa++Q/00/vs46IzAbQyriOi0XxlSMMVtPx0Q3isp+ji
n8Mq9eOuxYOEQ4of8twUkUDd528iwGtEdwf0Q01UyT84S62N8AySl1ZBKXJz6W4F
UhWfa/HQYOAPDdEjNgnVwLI23b8t0TozyCWw7q8h
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIEjzCCA3egAwIBAgIQe55B/ALCKJDZtdNT8kD6hTANBgkqhkiG9w0BAQsFADBM
MSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEGA1UEChMKR2xv
YmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjAeFw0yMjAxMjYxMjAwMDBaFw0y
NTAxMjYwMDAwMDBaMFgxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWdu
IG52LXNhMS4wLAYDVQQDEyVHbG9iYWxTaWduIEF0bGFzIFIzIE9WIFRMUyBDQSAy
MDIyIFEyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmGmg1LW9b7Lf
8zDD83yBDTEkt+FOxKJZqF4veWc5KZsQj9HfnUS2e5nj/E+JImlGPsQuoiosLuXD
BVBNAMcUFa11buFMGMeEMwiTmCXoXRrXQmH0qjpOfKgYc5gHG3BsRGaRrf7VR4eg
ofNMG9wUBw4/g/TT7+bQJdA4NfE7Y4d5gEryZiBGB/swaX6Jp/8MF4TgUmOWmalK
dZCKyb4sPGQFRTtElk67F7vU+wdGcrcOx1tDcIB0ncjLPMnaFicagl+daWGsKqTh
counQb6QJtYHa91KvCfKWocMxQ7OIbB5UARLPmC4CJ1/f8YFm35ebfzAeULYdGXu
jE9CLor0OwIDAQABo4IBXzCCAVswDgYDVR0PAQH/BAQDAgGGMB0GA1UdJQQWMBQG
CCsGAQUFBwMBBggrBgEFBQcDAjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQW
BBSH5Zq7a7B/t95GfJWkDBpA8HHqdjAfBgNVHSMEGDAWgBSP8Et/qC5FJK5NUPpj
move4t0bvDB7BggrBgEFBQcBAQRvMG0wLgYIKwYBBQUHMAGGImh0dHA6Ly9vY3Nw
Mi5nbG9iYWxzaWduLmNvbS9yb290cjMwOwYIKwYBBQUHMAKGL2h0dHA6Ly9zZWN1
cmUuZ2xvYmFsc2lnbi5jb20vY2FjZXJ0L3Jvb3QtcjMuY3J0MDYGA1UdHwQvMC0w
K6ApoCeGJWh0dHA6Ly9jcmwuZ2xvYmFsc2lnbi5jb20vcm9vdC1yMy5jcmwwIQYD
VR0gBBowGDAIBgZngQwBAgIwDAYKKwYBBAGgMgoBAjANBgkqhkiG9w0BAQsFAAOC
AQEAKRic9/f+nmhQU/wz04APZLjgG5OgsuUOyUEZjKVhNGDwxGTvKhyXGGAMW2B/
3bRi+aElpXwoxu3pL6fkElbX3B0BeS5LoDtxkyiVEBMZ8m+sXbocwlPyxrPbX6mY
0rVIvnuUeBH8X0L5IwfpNVvKnBIilTbcebfHyXkPezGwz7E1yhUULjJFm2bt0SdX
y+4X/WeiiYIv+fTVgZZgl+/2MKIsu/qdBJc3f3TvJ8nz+Eax1zgZmww+RSQWeOj3
15Iw6Z5FX+NwzY/Ab+9PosR5UosSeq+9HhtaxZttXG1nVh+avYPGYddWmiMT90J5
ZgKnO/Fx2hBgTxhOTMYaD312kg==
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgILBAAAAAABIVhTCKIwDQYJKoZIhvcNAQELBQAwTDEgMB4G
A1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjMxEzARBgNVBAoTCkdsb2JhbFNp
Z24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDkwMzE4MTAwMDAwWhcNMjkwMzE4
MTAwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEG
A1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAMwldpB5BngiFvXAg7aEyiie/QV2EcWtiHL8
RgJDx7KKnQRfJMsuS+FggkbhUqsMgUdwbN1k0ev1LKMPgj0MK66X17YUhhB5uzsT
gHeMCOFJ0mpiLx9e+pZo34knlTifBtc+ycsmWQ1z3rDI6SYOgxXG71uL0gRgykmm
KPZpO/bLyCiR5Z2KYVc3rHQU3HTgOu5yLy6c+9C7v/U9AOEGM+iCK65TpjoWc4zd
QQ4gOsC0p6Hpsk+QLjJg6VfLuQSSaGjlOCZgdbKfd/+RFO+uIEn8rUAVSNECMWEZ
XriX7613t2Saer9fwRPvm2L7DWzgVGkWqQPabumDk3F2xmmFghcCAwEAAaNCMEAw
DgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFI/wS3+o
LkUkrk1Q+mOai97i3Ru8MA0GCSqGSIb3DQEBCwUAA4IBAQBLQNvAUKr+yAzv95ZU
RUm7lgAJQayzE4aGKAczymvmdLm6AC2upArT9fHxD4q/c2dKg8dEe3jgr25sbwMp
jjM5RcOO5LlXbKr8EpbsU8Yt5CRsuZRj+9xTaGdWPoO4zzUhw8lo/s7awlOqzJCK
6fBdRoyV3XpYKBovHd7NADdBj+1EbddTKJd+82cEHhXXipa0095MJ6RMG3NzdvQX
mcIfeg7jLQitChws/zyrVQ4PkX4268NXSb7hLi18YIvDQVETI53O9zJrlAGomecs
Mx86OyXShkDOOyyGeMlhLxS67ttVb9+E7gUJTb0o2HLO02JQZR7rkpeDMdmztcpH
WD9f
-----END CERTIFICATE-----`;r.default={RedisCloudFixed:{ca:n},RedisCloudFlexible:{ca:n}}},213895,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.noop=r.defaults=r.Debug=r.getPackageMeta=r.zipMap=r.CONNECTION_CLOSED_ERROR_MSG=r.shuffle=r.sample=r.resolveTLSProfile=r.parseURL=r.optimizeErrorStack=r.toArg=r.convertMapToArray=r.convertObjectToArray=r.timeout=r.packObject=r.isInt=r.wrapMultiResult=r.convertBufferToString=void 0;let n=e.r(522734),i=e.r(814747),a=e.r(792509),s=e.r(318761);Object.defineProperty(r,"defaults",{enumerable:!0,get:function(){return s.defaults}}),Object.defineProperty(r,"noop",{enumerable:!0,get:function(){return s.noop}}),r.Debug=e.r(200880).default;let o=e.r(766275);function l(e){let t=parseFloat(e);return!isNaN(e)&&(0|t)===t}r.convertBufferToString=function e(t,r){if(t instanceof Buffer)return t.toString(r);if(Array.isArray(t)){let n=t.length,i=Array(n);for(let a=0;a<n;++a)i[a]=t[a]instanceof Buffer&&"utf8"===r?t[a].toString():e(t[a],r);return i}return t},r.wrapMultiResult=function(e){if(!e)return null;let t=[],r=e.length;for(let n=0;n<r;++n){let r=e[n];r instanceof Error?t.push([r]):t.push([null,r])}return t},r.isInt=l,r.packObject=function(e){let t={},r=e.length;for(let n=1;n<r;n+=2)t[e[n-1]]=e[n];return t},r.timeout=function(e,t){let r=null,n=function(){r&&(clearTimeout(r),r=null,e.apply(this,arguments))};return r=setTimeout(n,t,Error("timeout")),n},r.convertObjectToArray=function(e){let t=[],r=Object.keys(e);for(let n=0,i=r.length;n<i;n++)t.push(r[n],e[r[n]]);return t},r.convertMapToArray=function(e){let t=[],r=0;return e.forEach(function(e,n){t[r]=n,t[r+1]=e,r+=2}),t},r.toArg=function(e){return null==e?"":String(e)},r.optimizeErrorStack=function(e,t,r){let n,i=t.split("\n"),a="";for(n=1;n<i.length&&-1!==i[n].indexOf(r);++n);for(let e=n;e<i.length;++e)a+="\n"+i[e];if(e.stack){let t=e.stack.indexOf("\n");e.stack=e.stack.slice(0,t)+a}return e},r.parseURL=function(e){if(l(e))return{port:e};let t=(0,a.parse)(e,!0,!0);t.slashes||"/"===e[0]||(e="//"+e,t=(0,a.parse)(e,!0,!0));let r=t.query||{},n={};if(t.auth){let e=t.auth.indexOf(":");n.username=-1===e?t.auth:t.auth.slice(0,e),n.password=-1===e?"":t.auth.slice(e+1)}if(t.pathname&&("redis:"===t.protocol||"rediss:"===t.protocol?t.pathname.length>1&&(n.db=t.pathname.slice(1)):n.path=t.pathname),t.host&&(n.host=t.hostname),t.port&&(n.port=t.port),"string"==typeof r.family){let e=Number.parseInt(r.family,10);Number.isNaN(e)||(n.family=e)}return(0,s.defaults)(n,r),n},r.resolveTLSProfile=function(e){let t=null==e?void 0:e.tls;"string"==typeof t&&(t={profile:t});let r=o.default[null==t?void 0:t.profile];return r&&(t=Object.assign({},r,t),delete t.profile,e=Object.assign({},e,{tls:t})),e},r.sample=function(e,t=0){let r=e.length;return t>=r?null:e[t+Math.floor(Math.random()*(r-t))]},r.shuffle=function(e){let t=e.length;for(;t>0;){let r=Math.floor(Math.random()*t);t--,[e[t],e[r]]=[e[r],e[t]]}return e},r.CONNECTION_CLOSED_ERROR_MSG="Connection is closed.",r.zipMap=function(e,t){let r=new Map;return e.forEach((e,n)=>{r.set(e,t[n])}),r};let u=null;r.getPackageMeta=async function(){if(u)return u;try{let e=(0,i.resolve)("/ROOT/node_modules/ioredis/built/utils","..","..","package.json"),t=await n.promises.readFile(e,"utf8");return u={version:JSON.parse(t).version}}catch(e){return u={version:"error-fetching-version"}}}},159026,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=e.r(87693),i=e.r(343594),a=e.r(142351),s=e.r(213895);class o{constructor(e,t=[],r={},n){if(this.name=e,this.inTransaction=!1,this.isResolved=!1,this.transformed=!1,this.replyEncoding=r.replyEncoding,this.errorStack=r.errorStack,this.args=t.flat(),this.callback=n,this.initPromise(),r.keyPrefix){const e=r.keyPrefix instanceof Buffer;let t=e?r.keyPrefix:null;this._iterateKeys(n=>n instanceof Buffer?(null===t&&(t=Buffer.from(r.keyPrefix)),Buffer.concat([t,n])):e?Buffer.concat([r.keyPrefix,Buffer.from(String(n))]):r.keyPrefix+n)}r.readOnly&&(this.isReadOnly=!0)}static checkFlag(e,t){return!!this.getFlagMap()[e][t]}static setArgumentTransformer(e,t){this._transformer.argument[e]=t}static setReplyTransformer(e,t){this._transformer.reply[e]=t}static getFlagMap(){return this.flagMap||(this.flagMap=Object.keys(o.FLAGS).reduce((e,t)=>(e[t]={},o.FLAGS[t].forEach(r=>{e[t][r]=!0}),e),{})),this.flagMap}getSlot(){if(void 0===this.slot){let e=this.getKeys()[0];this.slot=null==e?null:i(e)}return this.slot}getKeys(){return this._iterateKeys()}toWritable(e){let t,r="*"+(this.args.length+1)+"\r\n$"+Buffer.byteLength(this.name)+"\r\n"+this.name+"\r\n";if(this.bufferMode){let e=new d;e.push(r);for(let t=0;t<this.args.length;++t){let r=this.args[t];r instanceof Buffer?0===r.length?e.push("$0\r\n\r\n"):(e.push("$"+r.length+"\r\n"),e.push(r),e.push("\r\n")):e.push("$"+Buffer.byteLength(r)+"\r\n"+r+"\r\n")}t=e.toBuffer()}else{t=r;for(let e=0;e<this.args.length;++e){let r=this.args[e];t+="$"+Buffer.byteLength(r)+"\r\n"+r+"\r\n"}}return t}stringifyArguments(){for(let e=0;e<this.args.length;++e){let t=this.args[e];"string"==typeof t||(t instanceof Buffer?this.bufferMode=!0:this.args[e]=(0,s.toArg)(t))}}transformReply(e){this.replyEncoding&&(e=(0,s.convertBufferToString)(e,this.replyEncoding));let t=o._transformer.reply[this.name];return t&&(e=t(e)),e}setTimeout(e){this._commandTimeoutTimer||(this._commandTimeoutTimer=setTimeout(()=>{this.isResolved||this.reject(Error("Command timed out"))},e))}initPromise(){let e=new Promise((e,t)=>{if(!this.transformed){this.transformed=!0;let e=o._transformer.argument[this.name];e&&(this.args=e(this.args)),this.stringifyArguments()}this.resolve=this._convertValue(e),this.errorStack?this.reject=e=>{t((0,s.optimizeErrorStack)(e,this.errorStack.stack,"/ROOT/node_modules/ioredis/built"))}:this.reject=t});this.promise=(0,a.default)(e,this.callback)}_iterateKeys(e=e=>e){if(void 0===this.keys&&(this.keys=[],(0,n.exists)(this.name)))for(let t of(0,n.getKeyIndexes)(this.name,this.args))this.args[t]=e(this.args[t]),this.keys.push(this.args[t]);return this.keys}_convertValue(e){return t=>{try{let r=this._commandTimeoutTimer;r&&(clearTimeout(r),delete this._commandTimeoutTimer),e(this.transformReply(t)),this.isResolved=!0}catch(e){this.reject(e)}return this.promise}}}r.default=o,o.FLAGS={VALID_IN_SUBSCRIBER_MODE:["subscribe","psubscribe","unsubscribe","punsubscribe","ssubscribe","sunsubscribe","ping","quit"],VALID_IN_MONITOR_MODE:["monitor","auth"],ENTER_SUBSCRIBER_MODE:["subscribe","psubscribe","ssubscribe"],EXIT_SUBSCRIBER_MODE:["unsubscribe","punsubscribe","sunsubscribe"],WILL_DISCONNECT:["quit"],HANDSHAKE_COMMANDS:["auth","select","client","readonly","info"],IGNORE_RECONNECT_ON_ERROR:["client"]},o._transformer={argument:{},reply:{}};let l=function(e){if(1===e.length){if(e[0]instanceof Map)return(0,s.convertMapToArray)(e[0]);if("object"==typeof e[0]&&null!==e[0])return(0,s.convertObjectToArray)(e[0])}return e},u=function(e){if(2===e.length){if(e[1]instanceof Map)return[e[0]].concat((0,s.convertMapToArray)(e[1]));if("object"==typeof e[1]&&null!==e[1])return[e[0]].concat((0,s.convertObjectToArray)(e[1]))}return e};o.setArgumentTransformer("mset",l),o.setArgumentTransformer("msetnx",l),o.setArgumentTransformer("hset",u),o.setArgumentTransformer("hmset",u),o.setReplyTransformer("hgetall",function(e){if(Array.isArray(e)){let t={};for(let r=0;r<e.length;r+=2){let n=e[r],i=e[r+1];n in t?Object.defineProperty(t,n,{value:i,configurable:!0,enumerable:!0,writable:!0}):t[n]=i}return t}return e});class d{constructor(){this.length=0,this.items=[]}push(e){this.length+=Buffer.byteLength(e),this.items.push(e)}toBuffer(){let e=Buffer.allocUnsafe(this.length),t=0;for(let r of this.items){let n=Buffer.byteLength(r);Buffer.isBuffer(r)?r.copy(e,t):e.write(r,t,n),t+=n}return e}}},293474,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=e.r(287315);class i extends n.RedisError{constructor(e,t){super(e),this.lastNodeError=t,Error.captureStackTrace(this,this.constructor)}get name(){return this.constructor.name}}r.default=i,i.defaultMessage="Failed to refresh slots cache."},659875,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=e.r(688947);class i extends n.Readable{constructor(e){super(e),this.opt=e,this._redisCursor="0",this._redisDrained=!1}_read(){if(this._redisDrained)return void this.push(null);let e=[this._redisCursor];this.opt.key&&e.unshift(this.opt.key),this.opt.match&&e.push("MATCH",this.opt.match),this.opt.type&&e.push("TYPE",this.opt.type),this.opt.count&&e.push("COUNT",String(this.opt.count)),this.opt.noValues&&e.push("NOVALUES"),this.opt.redis[this.opt.command](e,(e,t)=>{e?this.emit("error",e):(this._redisCursor=t[0]instanceof Buffer?t[0].toString():t[0],"0"===this._redisCursor&&(this._redisDrained=!0),this.push(t[1]))})}close(){this._redisDrained=!0}}r.default=i},847145,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.executeWithAutoPipelining=r.getFirstValueInFlattenedArray=r.shouldUseAutoPipelining=r.notAllowedAutoPipelineCommands=r.kCallbacks=r.kExec=void 0;let n=e.r(318761),i=e.r(343594),a=e.r(142351);function s(e){for(let t=0;t<e.length;t++){let r=e[t];if("string"==typeof r)return r;if(Array.isArray(r)||(0,n.isArguments)(r)){if(0===r.length)continue;return r[0]}let i=[r].flat();if(i.length>0)return i[0]}}r.kExec=Symbol("exec"),r.kCallbacks=Symbol("callbacks"),r.notAllowedAutoPipelineCommands=["auth","info","script","quit","cluster","pipeline","multi","subscribe","psubscribe","unsubscribe","unpsubscribe","select","client"],r.shouldUseAutoPipelining=function(e,t,n){return t&&e.options.enableAutoPipelining&&!e.isPipeline&&!r.notAllowedAutoPipelineCommands.includes(n)&&!e.options.autoPipeliningIgnoredCommands.includes(n)},r.getFirstValueInFlattenedArray=s,r.executeWithAutoPipelining=function e(t,o,l,u,d){if(t.isCluster&&!t.slots.length)return"wait"===t.status&&t.connect().catch(n.noop),(0,a.default)(new Promise(function(r,n){t.delayUntilReady(i=>{i?n(i):e(t,o,l,u,null).then(r,n)})}),d);let c=t.options.keyPrefix||"",h=t.isCluster?t.slots[i(`${c}${s(u)}`)].join(","):"main";if(!t._autoPipelines.has(h)){let e=t.pipeline();e[r.kExec]=!1,e[r.kCallbacks]=[],t._autoPipelines.set(h,e)}let p=t._autoPipelines.get(h);p[r.kExec]||(p[r.kExec]=!0,setImmediate(function e(t,n){if(t._runningAutoPipelines.has(n)||!t._autoPipelines.has(n))return;t._runningAutoPipelines.add(n);let i=t._autoPipelines.get(n);t._autoPipelines.delete(n);let a=i[r.kCallbacks];i[r.kCallbacks]=null,i.exec(function(r,i){if(t._runningAutoPipelines.delete(n),r)for(let e=0;e<a.length;e++)process.nextTick(a[e],r);else for(let e=0;e<a.length;e++)process.nextTick(a[e],...i[e]);t._autoPipelines.has(n)&&e(t,n)})},t,h));let m=new Promise(function(e,t){p[r.kCallbacks].push(function(r,n){r?t(r):e(n)}),"call"===o&&u.unshift(l),p[o](...u)});return(0,a.default)(m,d)}},27743,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=e.r(254799),i=e.r(159026),a=e.r(142351);r.default=class{constructor(e,t=null,r="",a=!1){this.lua=e,this.numberOfKeys=t,this.keyPrefix=r,this.readOnly=a,this.sha=(0,n.createHash)("sha1").update(e).digest("hex");const s=this.sha,o=new WeakSet;this.Command=class extends i.default{toWritable(t){let r=this.reject;return this.reject=e=>{-1!==e.message.indexOf("NOSCRIPT")&&o.delete(t),r.call(this,e)},o.has(t)?"eval"===this.name&&(this.name="evalsha",this.args[0]=s):(o.add(t),this.name="eval",this.args[0]=e),super.toWritable(t)}}}execute(e,t,r,n){"number"==typeof this.numberOfKeys&&t.unshift(this.numberOfKeys),this.keyPrefix&&(r.keyPrefix=this.keyPrefix),this.readOnly&&(r.readOnly=!0);let i=new this.Command("evalsha",[this.sha,...t],r);return i.promise=i.promise.catch(n=>{if(-1===n.message.indexOf("NOSCRIPT"))throw n;let i=new this.Command("evalsha",[this.sha,...t],r);return(e.isPipeline?e.redis:e).sendCommand(i)}),(0,a.default)(i.promise,n),e.sendCommand(i)}}},534207,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=e.r(87693),i=e.r(847145),a=e.r(159026),s=e.r(27743);class o{constructor(){this.options={},this.scriptsSet={},this.addedBuiltinSet=new Set}getBuiltinCommands(){return l.slice(0)}createBuiltinCommand(e){return{string:u(null,e,"utf8"),buffer:u(null,e,null)}}addBuiltinCommand(e){this.addedBuiltinSet.add(e),this[e]=u(e,e,"utf8"),this[e+"Buffer"]=u(e+"Buffer",e,null)}defineCommand(e,t){let r=new s.default(t.lua,t.numberOfKeys,this.options.keyPrefix,t.readOnly);this.scriptsSet[e]=r,this[e]=d(e,e,r,"utf8"),this[e+"Buffer"]=d(e+"Buffer",e,r,null)}sendCommand(e,t,r){throw Error('"sendCommand" is not implemented')}}let l=n.list.filter(e=>"monitor"!==e);function u(e,t,r){return void 0===r&&(r=t,t=null),function(...n){let s=t||n.shift(),o=n[n.length-1];"function"==typeof o?n.pop():o=void 0;let l={errorStack:this.options.showFriendlyErrorStack?Error():void 0,keyPrefix:this.options.keyPrefix,replyEncoding:r};return(0,i.shouldUseAutoPipelining)(this,e,s)?(0,i.executeWithAutoPipelining)(this,e,s,n,o):this.sendCommand(new a.default(s,n,l,o))}}function d(e,t,r,n){return function(...a){let s="function"==typeof a[a.length-1]?a.pop():void 0,o={replyEncoding:n};return(this.options.showFriendlyErrorStack&&(o.errorStack=Error()),(0,i.shouldUseAutoPipelining)(this,e,t))?(0,i.executeWithAutoPipelining)(this,e,t,a,s):r.execute(this,a,o,s)}}l.push("sentinel"),l.forEach(function(e){o.prototype[e]=u(e,e,"utf8"),o.prototype[e+"Buffer"]=u(e+"Buffer",e,null)}),o.prototype.call=u("call","utf8"),o.prototype.callBuffer=u("callBuffer",null),o.prototype.send_command=o.prototype.call,r.default=o},460520,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=e.r(343594),i=e.r(87693),a=e.r(142351),s=e.r(224361),o=e.r(159026),l=e.r(213895),u=e.r(534207);class d extends u.default{constructor(e){super(),this.redis=e,this.isPipeline=!0,this.replyPending=0,this._queue=[],this._result=[],this._transactions=0,this._shaToScript={},this.isCluster="Cluster"===this.redis.constructor.name||this.redis.isCluster,this.options=e.options,Object.keys(e.scriptsSet).forEach(t=>{let r=e.scriptsSet[t];this._shaToScript[r.sha]=r,this[t]=e[t],this[t+"Buffer"]=e[t+"Buffer"]}),e.addedBuiltinSet.forEach(t=>{this[t]=e[t],this[t+"Buffer"]=e[t+"Buffer"]}),this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t});const t=this;Object.defineProperty(this,"length",{get:function(){return t._queue.length}})}fillResult(e,t){if("exec"===this._queue[t].name&&Array.isArray(e[1])){let r=e[1].length;for(let n=0;n<r;n++){if(e[1][n]instanceof Error)continue;let i=this._queue[t-(r-n)];try{e[1][n]=i.transformReply(e[1][n])}catch(t){e[1][n]=t}}}if(this._result[t]=e,--this.replyPending)return;if(this.isCluster){let e,t=!0;for(let r=0;r<this._result.length;++r){let n=this._result[r][0],a=this._queue[r];if(n){if("exec"===a.name&&"EXECABORT Transaction discarded because of previous errors."===n.message)continue;if(e){if(e.name!==n.name||e.message!==n.message){t=!1;break}}else e={name:n.name,message:n.message}}else if(!a.inTransaction&&!((0,i.exists)(a.name)&&(0,i.hasFlag)(a.name,"readonly"))){t=!1;break}}if(e&&t){let t=this,r=e.message.split(" "),n=this._queue,i=!1;this._queue=[];for(let e=0;e<n.length;++e){if("ASK"===r[0]&&!i&&"asking"!==n[e].name&&(!n[e-1]||"asking"!==n[e-1].name)){let e=new o.default("asking");e.ignore=!0,this.sendCommand(e)}n[e].initPromise(),this.sendCommand(n[e]),i=n[e].inTransaction}let a=!0;void 0===this.leftRedirections&&(this.leftRedirections={});let s=function(){t.exec()},l=this.redis;if(l.handleError(e,this.leftRedirections,{moved:function(e,n){t.preferKey=n,l.slots[r[1]]=[n],l._groupsBySlot[r[1]]=l._groupsIds[l.slots[r[1]].join(";")],l.refreshSlotsCache(),t.exec()},ask:function(e,r){t.preferKey=r,t.exec()},tryagain:s,clusterDown:s,connectionClosed:s,maxRedirections:()=>{a=!1},defaults:()=>{a=!1}}),a)return}}let r=0;for(let e=0;e<this._queue.length-r;++e)this._queue[e+r].ignore&&(r+=1),this._result[e]=this._result[e+r];this.resolve(this._result.slice(0,this._result.length-r))}sendCommand(e){this._transactions>0&&(e.inTransaction=!0);let t=this._queue.length;return e.pipelineIndex=t,e.promise.then(e=>{this.fillResult([null,e],t)}).catch(e=>{this.fillResult([e],t)}),this._queue.push(e),this}addBatch(e){let t,r,n;for(let i=0;i<e.length;++i)r=(t=e[i])[0],n=t.slice(1),this[r].apply(this,n);return this}}r.default=d;let c=d.prototype.multi;d.prototype.multi=function(){return this._transactions+=1,c.apply(this,arguments)};let h=d.prototype.execBuffer;d.prototype.execBuffer=(0,s.deprecate)(function(){return this._transactions>0&&(this._transactions-=1),h.apply(this,arguments)},"Pipeline#execBuffer: Use Pipeline#exec instead"),d.prototype.exec=function(e){let t;if(this.isCluster&&!this.redis.slots.length)return"wait"===this.redis.status&&this.redis.connect().catch(l.noop),e&&!this.nodeifiedPromise&&(this.nodeifiedPromise=!0,(0,a.default)(this.promise,e)),this.redis.delayUntilReady(t=>{t?this.reject(t):this.exec(e)}),this.promise;if(this._transactions>0)return this._transactions-=1,h.apply(this,arguments);if(this.nodeifiedPromise||(this.nodeifiedPromise=!0,(0,a.default)(this.promise,e)),this._queue.length||this.resolve([]),this.isCluster){let e=[];for(let t=0;t<this._queue.length;t++){let r=this._queue[t].getKeys();if(r.length&&e.push(r[0]),r.length&&0>n.generateMulti(r))return this.reject(Error("All the keys in a pipeline command should belong to the same slot")),this.promise}if(e.length){if((t=function(e,t){let r=n(t[0]),i=e._groupsBySlot[r];for(let r=1;r<t.length;r++)if(e._groupsBySlot[n(t[r])]!==i)return -1;return r}(this.redis,e))<0)return this.reject(Error("All keys in the pipeline should belong to the same slots allocation group")),this.promise}else t=16384*Math.random()|0}let r=this;return function(){let e,n,i=r.replyPending=r._queue.length;r.isCluster&&(e={slot:t,redis:r.redis.connectionPool.nodes.all[r.preferKey]});let a="",s={isPipeline:!0,destination:r.isCluster?e:{redis:r.redis},write(e){"string"!=typeof e?(n||(n=[]),a&&(n.push(Buffer.from(a,"utf8")),a=""),n.push(e)):a+=e,--i||(n?(a&&n.push(Buffer.from(a,"utf8")),s.destination.redis.stream.write(Buffer.concat(n))):s.destination.redis.stream.write(a),i=r._queue.length,a="",n=void 0)}};for(let t=0;t<r._queue.length;++t)r.redis.sendCommand(r._queue[t],s,e);r.promise}(),this.promise}},60886,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.addTransactionSupport=void 0;let n=e.r(213895),i=e.r(142351),a=e.r(460520);r.addTransactionSupport=function(e){e.pipeline=function(e){let t=new a.default(this);return Array.isArray(e)&&t.addBatch(e),t};let{multi:t}=e;e.multi=function(e,r){if(void 0!==r||Array.isArray(e)||(r=e,e=null),r&&!1===r.pipeline)return t.call(this);let s=new a.default(this);s.multi(),Array.isArray(e)&&s.addBatch(e);let o=s.exec;s.exec=function(e){if(this.isCluster&&!this.redis.slots.length)return"wait"===this.redis.status&&this.redis.connect().catch(n.noop),(0,i.default)(new Promise((e,t)=>{this.redis.delayUntilReady(r=>{r?t(r):this.exec(s).then(e,t)})}),e);if(this._transactions>0&&o.call(s),this.nodeifiedPromise)return o.call(s);let t=o.call(s);return(0,i.default)(t.then(function(e){let t=e[e.length-1];if(void 0===t)throw Error("Pipeline cannot be used to send any commands when the `exec()` has been called on it.");if(t[0]){t[0].previousErrors=[];for(let r=0;r<e.length-1;++r)e[r][0]&&t[0].previousErrors.push(e[r][0]);throw t[0]}return(0,n.wrapMultiResult)(t[1])}),e)};let{execBuffer:l}=s;return s.execBuffer=function(e){return this._transactions>0&&l.call(s),s.exec(e)},s};let{exec:r}=e;e.exec=function(e){return(0,i.default)(r.call(this).then(function(e){return Array.isArray(e)&&(e=(0,n.wrapMultiResult)(e)),e}),e)}}},474031,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,t){Object.getOwnPropertyNames(t.prototype).forEach(r=>{Object.defineProperty(e.prototype,r,Object.getOwnPropertyDescriptor(t.prototype,r))})}},84633,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.DEFAULT_CLUSTER_OPTIONS=void 0;let n=e.r(679594);r.DEFAULT_CLUSTER_OPTIONS={clusterRetryStrategy:e=>Math.min(100+2*e,2e3),enableOfflineQueue:!0,enableReadyCheck:!0,scaleReads:"master",maxRedirections:16,retryDelayOnMoved:0,retryDelayOnFailover:100,retryDelayOnClusterDown:100,retryDelayOnTryAgain:100,slotsRefreshTimeout:1e3,useSRVRecords:!1,resolveSrv:n.resolveSrv,dnsLookup:n.lookup,enableAutoPipelining:!1,autoPipeliningIgnoredCommands:[],shardedSubscribers:!1}},357375,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.getConnectionName=r.weightSrvRecords=r.groupSrvRecords=r.getUniqueHostnamesFromOptions=r.normalizeNodeOptions=r.nodeKeyToRedisOptions=r.getNodeKey=void 0;let n=e.r(213895),i=e.r(504446);r.getNodeKey=function(e){return e.port=e.port||6379,e.host=e.host||"127.0.0.1",e.host+":"+e.port},r.nodeKeyToRedisOptions=function(e){let t=e.lastIndexOf(":");if(-1===t)throw Error(`Invalid node key ${e}`);return{host:e.slice(0,t),port:Number(e.slice(t+1))}},r.normalizeNodeOptions=function(e){return e.map(e=>{let t={};if("object"==typeof e)Object.assign(t,e);else if("string"==typeof e)Object.assign(t,(0,n.parseURL)(e));else if("number"==typeof e)t.port=e;else throw Error("Invalid argument "+e);return"string"==typeof t.port&&(t.port=parseInt(t.port,10)),delete t.db,t.port||(t.port=6379),t.host||(t.host="127.0.0.1"),(0,n.resolveTLSProfile)(t)})},r.getUniqueHostnamesFromOptions=function(e){let t={};return e.forEach(e=>{t[e.host]=!0}),Object.keys(t).filter(e=>!(0,i.isIP)(e))},r.groupSrvRecords=function(e){let t={};for(let r of e)t.hasOwnProperty(r.priority)?(t[r.priority].totalWeight+=r.weight,t[r.priority].records.push(r)):t[r.priority]={totalWeight:r.weight,records:[r]};return t},r.weightSrvRecords=function(e){if(1===e.records.length)return e.totalWeight=0,e.records.shift();let t=Math.floor(Math.random()*(e.totalWeight+e.records.length)),r=0;for(let[n,i]of e.records.entries())if((r+=1+i.weight)>t)return e.totalWeight-=i.weight,e.records.splice(n,1),i},r.getConnectionName=function(e,t){let r=`ioredis-cluster(${e})`;return t?`${r}:${t}`:r}},65575,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=e.r(357375),i=e.r(213895),a=e.r(445375),s=(0,i.Debug)("cluster:subscriber");r.default=class{constructor(e,t,r=!1){this.connectionPool=e,this.emitter=t,this.isSharded=r,this.started=!1,this.subscriber=null,this.slotRange=[],this.onSubscriberEnd=()=>{this.started?(s("subscriber has disconnected, selecting a new one..."),this.selectSubscriber()):s("subscriber has disconnected, but ClusterSubscriber is not started, so not reconnecting.")},this.connectionPool.on("-node",(e,t)=>{this.started&&this.subscriber&&(0,n.getNodeKey)(this.subscriber.options)===t&&(s("subscriber has left, selecting a new one..."),this.selectSubscriber())}),this.connectionPool.on("+node",()=>{this.started&&!this.subscriber&&(s("a new node is discovered and there is no subscriber, selecting a new one..."),this.selectSubscriber())})}getInstance(){return this.subscriber}associateSlotRange(e){return this.isSharded&&(this.slotRange=e),this.slotRange}start(){this.started=!0,this.selectSubscriber(),s("started")}stop(){this.started=!1,this.subscriber&&(this.subscriber.disconnect(),this.subscriber=null)}isStarted(){return this.started}selectSubscriber(){let e=this.lastActiveSubscriber;e&&(e.off("end",this.onSubscriberEnd),e.disconnect()),this.subscriber&&(this.subscriber.off("end",this.onSubscriberEnd),this.subscriber.disconnect());let t=(0,i.sample)(this.connectionPool.getNodes());if(!t){s("selecting subscriber failed since there is no node discovered in the cluster yet"),this.subscriber=null;return}let{options:r}=t;s("selected a subscriber %s:%s",r.host,r.port);let o="subscriber";this.isSharded&&(o="ssubscriber"),this.subscriber=new a.default({port:r.port,host:r.host,username:r.username,password:r.password,enableReadyCheck:!0,connectionName:(0,n.getConnectionName)(o,r.connectionName),lazyConnect:!0,tls:r.tls,retryStrategy:null}),this.subscriber.on("error",i.noop),this.subscriber.on("moved",()=>{this.emitter.emit("forceRefresh")}),this.subscriber.once("end",this.onSubscriberEnd);let l={subscribe:[],psubscribe:[],ssubscribe:[]};if(e){let t=e.condition||e.prevCondition;t&&t.subscriber&&(l.subscribe=t.subscriber.channels("subscribe"),l.psubscribe=t.subscriber.channels("psubscribe"),l.ssubscribe=t.subscriber.channels("ssubscribe"))}if(l.subscribe.length||l.psubscribe.length||l.ssubscribe.length){let e=0;for(let t of["subscribe","psubscribe","ssubscribe"]){let r=l[t];if(0!=r.length)if(s("%s %d channels",t,r.length),"ssubscribe"===t)for(let n of r)e+=1,this.subscriber[t](n).then(()=>{--e||(this.lastActiveSubscriber=this.subscriber)}).catch(()=>{s("failed to ssubscribe to channel: %s",n)});else e+=1,this.subscriber[t](r).then(()=>{--e||(this.lastActiveSubscriber=this.subscriber)}).catch(()=>{s("failed to %s %d channels",t,r.length)})}}else this.lastActiveSubscriber=this.subscriber;for(let e of["message","messageBuffer"])this.subscriber.on(e,(t,r)=>{this.emitter.emit(e,t,r)});for(let e of["pmessage","pmessageBuffer"])this.subscriber.on(e,(t,r,n)=>{this.emitter.emit(e,t,r,n)});if(!0==this.isSharded)for(let e of["smessage","smessageBuffer"])this.subscriber.on(e,(t,r)=>{this.emitter.emit(e,t,r)})}}},515371,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=e.r(427699),i=e.r(213895),a=e.r(357375),s=e.r(445375),o=(0,i.Debug)("cluster:connectionPool");class l extends n.EventEmitter{constructor(e){super(),this.redisOptions=e,this.nodes={all:{},master:{},slave:{}},this.specifiedOptions={}}getNodes(e="all"){let t=this.nodes[e];return Object.keys(t).map(e=>t[e])}getInstanceByKey(e){return this.nodes.all[e]}getSampleInstance(e){let t=Object.keys(this.nodes[e]),r=(0,i.sample)(t);return this.nodes[e][r]}addMasterNode(e){let t=(0,a.getNodeKey)(e.options),r=this.createRedisFromOptions(e,e.options.readOnly);return!e.options.readOnly&&(this.nodes.all[t]=r,this.nodes.master[t]=r,!0)}createRedisFromOptions(e,t){return new s.default((0,i.defaults)({retryStrategy:null,enableOfflineQueue:!0,readOnly:t},e,this.redisOptions,{lazyConnect:!0}))}findOrCreate(e,t=!1){let r,n=(0,a.getNodeKey)(e);return t=!!t,this.specifiedOptions[n]?Object.assign(e,this.specifiedOptions[n]):this.specifiedOptions[n]=e,this.nodes.all[n]?(r=this.nodes.all[n]).options.readOnly!==t&&(r.options.readOnly=t,o("Change role of %s to %s",n,t?"slave":"master"),r[t?"readonly":"readwrite"]().catch(i.noop),t?(delete this.nodes.master[n],this.nodes.slave[n]=r):(delete this.nodes.slave[n],this.nodes.master[n]=r)):(o("Connecting to %s as %s",n,t?"slave":"master"),r=this.createRedisFromOptions(e,t),this.nodes.all[n]=r,this.nodes[t?"slave":"master"][n]=r,r.once("end",()=>{this.removeNode(n),this.emit("-node",r,n),Object.keys(this.nodes.all).length||this.emit("drain")}),this.emit("+node",r,n),r.on("error",function(e){this.emit("nodeError",e,n)})),r}reset(e){o("Reset with %O",e);let t={};e.forEach(e=>{let r=(0,a.getNodeKey)(e);e.readOnly&&t[r]||(t[r]=e)}),Object.keys(this.nodes.all).forEach(e=>{t[e]||(o("Disconnect %s because the node does not hold any slot",e),this.nodes.all[e].disconnect(),this.removeNode(e))}),Object.keys(t).forEach(e=>{let r=t[e];this.findOrCreate(r,r.readOnly)})}removeNode(e){let{nodes:t}=this;t.all[e]&&(o("Remove %s from the pool",e),delete t.all[e]),delete t.master[e],delete t.slave[e]}}r.default=l},820265,(e,t,r)=>{"use strict";function n(e,t){var t=t||{};this._capacity=t.capacity,this._head=0,this._tail=0,Array.isArray(e)?this._fromArray(e):(this._capacityMask=3,this._list=[,,,,])}n.prototype.peekAt=function(e){var t=e;if(t===(0|t)){var r=this.size();if(!(t>=r)&&!(t<-r))return t<0&&(t+=r),t=this._head+t&this._capacityMask,this._list[t]}},n.prototype.get=function(e){return this.peekAt(e)},n.prototype.peek=function(){if(this._head!==this._tail)return this._list[this._head]},n.prototype.peekFront=function(){return this.peek()},n.prototype.peekBack=function(){return this.peekAt(-1)},Object.defineProperty(n.prototype,"length",{get:function(){return this.size()}}),n.prototype.size=function(){return this._head===this._tail?0:this._head<this._tail?this._tail-this._head:this._capacityMask+1-(this._head-this._tail)},n.prototype.unshift=function(e){if(0==arguments.length)return this.size();var t=this._list.length;return(this._head=this._head-1+t&this._capacityMask,this._list[this._head]=e,this._tail===this._head&&this._growArray(),this._capacity&&this.size()>this._capacity&&this.pop(),this._head<this._tail)?this._tail-this._head:this._capacityMask+1-(this._head-this._tail)},n.prototype.shift=function(){var e=this._head;if(e!==this._tail){var t=this._list[e];return this._list[e]=void 0,this._head=e+1&this._capacityMask,e<2&&this._tail>1e4&&this._tail<=this._list.length>>>2&&this._shrinkArray(),t}},n.prototype.push=function(e){if(0==arguments.length)return this.size();var t=this._tail;return(this._list[t]=e,this._tail=t+1&this._capacityMask,this._tail===this._head&&this._growArray(),this._capacity&&this.size()>this._capacity&&this.shift(),this._head<this._tail)?this._tail-this._head:this._capacityMask+1-(this._head-this._tail)},n.prototype.pop=function(){var e=this._tail;if(e!==this._head){var t=this._list.length;this._tail=e-1+t&this._capacityMask;var r=this._list[this._tail];return this._list[this._tail]=void 0,this._head<2&&e>1e4&&e<=t>>>2&&this._shrinkArray(),r}},n.prototype.removeOne=function(e){var t,r=e;if(r===(0|r)&&this._head!==this._tail){var n=this.size(),i=this._list.length;if(!(r>=n)&&!(r<-n)){r<0&&(r+=n),r=this._head+r&this._capacityMask;var a=this._list[r];if(e<n/2){for(t=e;t>0;t--)this._list[r]=this._list[r=r-1+i&this._capacityMask];this._list[r]=void 0,this._head=this._head+1+i&this._capacityMask}else{for(t=n-1-e;t>0;t--)this._list[r]=this._list[r=r+1+i&this._capacityMask];this._list[r]=void 0,this._tail=this._tail-1+i&this._capacityMask}return a}}},n.prototype.remove=function(e,t){var r,n,i=e,a=t;if(i===(0|i)&&this._head!==this._tail){var s=this.size(),o=this._list.length;if(!(i>=s)&&!(i<-s)&&!(t<1)){if(i<0&&(i+=s),1===t||!t)return(r=[,])[0]=this.removeOne(i),r;if(0===i&&i+t>=s)return r=this.toArray(),this.clear(),r;for(i+t>s&&(t=s-i),r=Array(t),n=0;n<t;n++)r[n]=this._list[this._head+i+n&this._capacityMask];if(i=this._head+i&this._capacityMask,e+t===s){for(this._tail=this._tail-t+o&this._capacityMask,n=t;n>0;n--)this._list[i=i+1+o&this._capacityMask]=void 0;return r}if(0===e){for(this._head=this._head+t+o&this._capacityMask,n=t-1;n>0;n--)this._list[i=i+1+o&this._capacityMask]=void 0;return r}if(i<s/2){for(this._head=this._head+e+t+o&this._capacityMask,n=e;n>0;n--)this.unshift(this._list[i=i-1+o&this._capacityMask]);for(i=this._head-1+o&this._capacityMask;a>0;)this._list[i=i-1+o&this._capacityMask]=void 0,a--;e<0&&(this._tail=i)}else{for(this._tail=i,i=i+t+o&this._capacityMask,n=s-(t+e);n>0;n--)this.push(this._list[i++]);for(i=this._tail;a>0;)this._list[i=i+1+o&this._capacityMask]=void 0,a--}return this._head<2&&this._tail>1e4&&this._tail<=o>>>2&&this._shrinkArray(),r}}},n.prototype.splice=function(e,t){var r=e;if(r===(0|r)){var n=this.size();if(r<0&&(r+=n),!(r>n))if(!(arguments.length>2))return this.remove(r,t);else{var i,a,s,o=arguments.length,l=this._list.length,u=2;if(!n||r<n/2){for(i=0,a=Array(r);i<r;i++)a[i]=this._list[this._head+i&this._capacityMask];for(0===t?(s=[],r>0&&(this._head=this._head+r+l&this._capacityMask)):(s=this.remove(r,t),this._head=this._head+r+l&this._capacityMask);o>u;)this.unshift(arguments[--o]);for(i=r;i>0;i--)this.unshift(a[i-1])}else{var d=(a=Array(n-(r+t))).length;for(i=0;i<d;i++)a[i]=this._list[this._head+r+t+i&this._capacityMask];for(0===t?(s=[],r!=n&&(this._tail=this._head+r+l&this._capacityMask)):(s=this.remove(r,t),this._tail=this._tail-d+l&this._capacityMask);u<o;)this.push(arguments[u++]);for(i=0;i<d;i++)this.push(a[i])}return s}}},n.prototype.clear=function(){this._list=Array(this._list.length),this._head=0,this._tail=0},n.prototype.isEmpty=function(){return this._head===this._tail},n.prototype.toArray=function(){return this._copyArray(!1)},n.prototype._fromArray=function(e){var t=e.length,r=this._nextPowerOf2(t);this._list=Array(r),this._capacityMask=r-1,this._tail=t;for(var n=0;n<t;n++)this._list[n]=e[n]},n.prototype._copyArray=function(e,t){var r,n=this._list,i=n.length,a=this.length;if((t|=a)==a&&this._head<this._tail)return this._list.slice(this._head,this._tail);var s=Array(t),o=0;if(e||this._head>this._tail){for(r=this._head;r<i;r++)s[o++]=n[r];for(r=0;r<this._tail;r++)s[o++]=n[r]}else for(r=this._head;r<this._tail;r++)s[o++]=n[r];return s},n.prototype._growArray=function(){if(0!=this._head){var e=this._copyArray(!0,this._list.length<<1);this._tail=this._list.length,this._head=0,this._list=e}else this._tail=this._list.length,this._list.length<<=1;this._capacityMask=this._capacityMask<<1|1},n.prototype._shrinkArray=function(){this._list.length>>>=1,this._capacityMask>>>=1},n.prototype._nextPowerOf2=function(e){return Math.max(1<<Math.log(e)/Math.log(2)+1,4)},t.exports=n},428181,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=e.r(213895),i=e.r(820265),a=(0,n.Debug)("delayqueue");r.default=class{constructor(){this.queues={},this.timeouts={}}push(e,t,r){let n=r.callback||process.nextTick;this.queues[e]||(this.queues[e]=new i),this.queues[e].push(t),this.timeouts[e]||(this.timeouts[e]=setTimeout(()=>{n(()=>{this.timeouts[e]=null,this.execute(e)})},r.timeout))}execute(e){let t=this.queues[e];if(!t)return;let{length:r}=t;if(r)for(a("send %d commands in %s queue",r,e),this.queues[e]=null;t.length>0;)t.shift()()}}},527785,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=e.r(213895),i=e.r(65575),a=e.r(515371),s=e.r(357375),o=e.r(343594),l=(0,n.Debug)("cluster:subscriberGroup");r.default=class{constructor(e,t){this.cluster=e,this.shardedSubscribers=new Map,this.clusterSlots=[],this.subscriberToSlotsIndex=new Map,this.channels=new Map,e.on("+node",e=>{this._addSubscriber(e)}),e.on("-node",e=>{this._removeSubscriber(e)}),e.on("refresh",()=>{this._refreshSlots(e)}),e.on("forceRefresh",()=>{t()})}getResponsibleSubscriber(e){let t=this.clusterSlots[e][0];return this.shardedSubscribers.get(t)}addChannels(e){let t=o(e[0]);e.forEach(e=>{if(o(e)!=t)return -1});let r=this.channels.get(t);return r?this.channels.set(t,r.concat(e)):this.channels.set(t,e),[...this.channels.values()].flatMap(e=>e).length}removeChannels(e){let t=o(e[0]);e.forEach(e=>{if(o(e)!=t)return -1});let r=this.channels.get(t);if(r){let n=r.filter(t=>!e.includes(t));this.channels.set(t,n)}return[...this.channels.values()].flatMap(e=>e).length}stop(){for(let e of this.shardedSubscribers.values())e.stop()}start(){for(let e of this.shardedSubscribers.values())e.isStarted()||e.start()}_addSubscriber(e){let t=new a.default(e.options);if(t.addMasterNode(e)){let r=new i.default(t,this.cluster,!0),n=(0,s.getNodeKey)(e.options);return this.shardedSubscribers.set(n,r),r.start(),this._resubscribe(),this.cluster.emit("+subscriber"),r}return null}_removeSubscriber(e){let t=(0,s.getNodeKey)(e.options),r=this.shardedSubscribers.get(t);return r&&(r.stop(),this.shardedSubscribers.delete(t),this._resubscribe(),this.cluster.emit("-subscriber")),this.shardedSubscribers}_refreshSlots(e){if(this._slotsAreEqual(e.slots))l("Nothing to refresh because the new cluster map is equal to the previous one.");else{l("Refreshing the slots of the subscriber group."),this.subscriberToSlotsIndex=new Map;for(let t=0;t<e.slots.length;t++){let r=e.slots[t][0];this.subscriberToSlotsIndex.has(r)||this.subscriberToSlotsIndex.set(r,[]),this.subscriberToSlotsIndex.get(r).push(Number(t))}return this._resubscribe(),this.clusterSlots=JSON.parse(JSON.stringify(e.slots)),this.cluster.emit("subscribersReady"),!0}return!1}_resubscribe(){this.shardedSubscribers&&this.shardedSubscribers.forEach((e,t)=>{let r=this.subscriberToSlotsIndex.get(t);r&&(e.associateSlotRange(r),r.forEach(t=>{let r=e.getInstance(),n=this.channels.get(t);n&&n.length>0&&r&&(r.ssubscribe(n),r.on("ready",()=>{r.ssubscribe(n)}))}))})}_slotsAreEqual(e){return void 0!==this.clusterSlots&&JSON.stringify(this.clusterSlots)===JSON.stringify(e)}}},258063,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=e.r(87693),i=e.r(427699),a=e.r(287315),s=e.r(142351),o=e.r(159026),l=e.r(293474),u=e.r(445375),d=e.r(659875),c=e.r(60886),h=e.r(213895),p=e.r(474031),m=e.r(534207),f=e.r(84633),y=e.r(65575),b=e.r(515371),g=e.r(428181),v=e.r(357375),E=e.r(820265),K=e.r(527785),S=(0,h.Debug)("cluster"),I=new WeakSet;class w extends m.default{constructor(e,t={}){if(super(),this.slots=[],this._groupsIds={},this._groupsBySlot=Array(16384),this.isCluster=!0,this.retryAttempts=0,this.delayQueue=new g.default,this.offlineQueue=new E,this.isRefreshing=!1,this._refreshSlotsCacheCallbacks=[],this._autoPipelines=new Map,this._runningAutoPipelines=new Set,this._readyDelayedCallbacks=[],this.connectionEpoch=0,i.EventEmitter.call(this),this.startupNodes=e,this.options=(0,h.defaults)({},t,f.DEFAULT_CLUSTER_OPTIONS,this.options),!0==this.options.shardedSubscribers&&(this.shardedSubscribers=new K.default(this,this.refreshSlotsCache.bind(this))),this.options.redisOptions&&this.options.redisOptions.keyPrefix&&!this.options.keyPrefix&&(this.options.keyPrefix=this.options.redisOptions.keyPrefix),"function"!=typeof this.options.scaleReads&&-1===["all","master","slave"].indexOf(this.options.scaleReads))throw Error('Invalid option scaleReads "'+this.options.scaleReads+'". Expected "all", "master", "slave" or a custom function');this.connectionPool=new b.default(this.options.redisOptions),this.connectionPool.on("-node",(e,t)=>{this.emit("-node",e)}),this.connectionPool.on("+node",e=>{this.emit("+node",e)}),this.connectionPool.on("drain",()=>{this.setStatus("close")}),this.connectionPool.on("nodeError",(e,t)=>{this.emit("node error",e,t)}),this.subscriber=new y.default(this.connectionPool,this),this.options.scripts&&Object.entries(this.options.scripts).forEach(([e,t])=>{this.defineCommand(e,t)}),this.options.lazyConnect?this.setStatus("wait"):this.connect().catch(e=>{S("connecting failed: %s",e)})}connect(){return new Promise((e,t)=>{if("connecting"===this.status||"connect"===this.status||"ready"===this.status)return void t(Error("Redis is already connecting/connected"));let r=++this.connectionEpoch;this.setStatus("connecting"),this.resolveStartupNodeHostnames().then(n=>{let i;if(this.connectionEpoch!==r){S("discard connecting after resolving startup nodes because epoch not match: %d != %d",r,this.connectionEpoch),t(new a.RedisError("Connection is discarded because a new connection is made"));return}if("connecting"!==this.status){S("discard connecting after resolving startup nodes because the status changed to %s",this.status),t(new a.RedisError("Connection is aborted"));return}this.connectionPool.reset(n);let s=()=>{this.setStatus("ready"),this.retryAttempts=0,this.executeOfflineCommands(),this.resetNodesRefreshInterval(),e()},o=()=>{this.invokeReadyDelayedCallbacks(void 0),this.removeListener("close",i),this.manuallyClosing=!1,this.setStatus("connect"),this.options.enableReadyCheck?this.readyCheck((e,t)=>{e||t?(S("Ready check failed (%s). Reconnecting...",e||t),"connect"===this.status&&this.disconnect(!0)):s()}):s()};i=()=>{let e=Error("None of startup nodes is available");this.removeListener("refresh",o),this.invokeReadyDelayedCallbacks(e),t(e)},this.once("refresh",o),this.once("close",i),this.once("close",this.handleCloseEvent.bind(this)),this.refreshSlotsCache(e=>{e&&e.message===l.default.defaultMessage&&(u.default.prototype.silentEmit.call(this,"error",e),this.connectionPool.reset([]))}),this.subscriber.start(),this.options.shardedSubscribers&&this.shardedSubscribers.start()}).catch(e=>{this.setStatus("close"),this.handleCloseEvent(e),this.invokeReadyDelayedCallbacks(e),t(e)})})}disconnect(e=!1){let t=this.status;this.setStatus("disconnecting"),e||(this.manuallyClosing=!0),this.reconnectTimeout&&!e&&(clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null,S("Canceled reconnecting attempts")),this.clearNodesRefreshInterval(),this.subscriber.stop(),this.options.shardedSubscribers&&this.shardedSubscribers.stop(),"wait"===t?(this.setStatus("close"),this.handleCloseEvent()):this.connectionPool.reset([])}quit(e){let t=this.status;if(this.setStatus("disconnecting"),this.manuallyClosing=!0,this.reconnectTimeout&&(clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null),this.clearNodesRefreshInterval(),this.subscriber.stop(),this.options.shardedSubscribers&&this.shardedSubscribers.stop(),"wait"===t){let t=(0,s.default)(Promise.resolve("OK"),e);return setImmediate((function(){this.setStatus("close"),this.handleCloseEvent()}).bind(this)),t}return(0,s.default)(Promise.all(this.nodes().map(e=>e.quit().catch(e=>{if(e.message===h.CONNECTION_CLOSED_ERROR_MSG)return"OK";throw e}))).then(()=>"OK"),e)}duplicate(e=[],t={}){return new w(e.length>0?e:this.startupNodes.slice(0),Object.assign({},this.options,t))}nodes(e="all"){if("all"!==e&&"master"!==e&&"slave"!==e)throw Error('Invalid role "'+e+'". Expected "all", "master" or "slave"');return this.connectionPool.getNodes(e)}delayUntilReady(e){this._readyDelayedCallbacks.push(e)}get autoPipelineQueueSize(){let e=0;for(let t of this._autoPipelines.values())e+=t.length;return e}refreshSlotsCache(e){if(e&&this._refreshSlotsCacheCallbacks.push(e),this.isRefreshing)return;this.isRefreshing=!0;let t=this,r=e=>{for(let t of(this.isRefreshing=!1,this._refreshSlotsCacheCallbacks))t(e);this._refreshSlotsCacheCallbacks=[]},n=(0,h.shuffle)(this.connectionPool.getNodes()),i=null;!function e(a){if(a===n.length)return r(new l.default(l.default.defaultMessage,i));let s=n[a],o=`${s.options.host}:${s.options.port}`;S("getting slot cache from %s",o),t.getInfoFromNode(s,function(n){switch(t.status){case"close":case"end":return r(Error("Cluster is disconnected."));case"disconnecting":return r(Error("Cluster is disconnecting."))}n?(t.emit("node error",n,o),i=n,e(a+1)):(t.emit("refresh"),r())})}(0)}sendCommand(e,t,r){if("wait"===this.status&&this.connect().catch(h.noop),"end"===this.status)return e.reject(Error(h.CONNECTION_CLOSED_ERROR_MSG)),e.promise;let i=this.options.scaleReads;"master"!==i&&(e.isReadOnly||(0,n.exists)(e.name)&&(0,n.hasFlag)(e.name,"readonly")||(i="master"));let s=r?r.slot:e.getSlot(),l={},u=this;if(!r&&!I.has(e)){I.add(e);let t=e.reject;e.reject=function(r){let n=d.bind(null,!0);u.handleError(r,l,{moved:function(t,r){S("command %s is moved to %s",e.name,r),s=Number(t),u.slots[t]?u.slots[t][0]=r:u.slots[t]=[r],u._groupsBySlot[t]=u._groupsIds[u.slots[t].join(";")],u.connectionPool.findOrCreate(u.natMapper(r)),d(),S("refreshing slot caches... (triggered by MOVED error)"),u.refreshSlotsCache()},ask:function(t,r){S("command %s is required to ask %s:%s",e.name,r);let n=u.natMapper(r);u.connectionPool.findOrCreate(n),d(!1,`${n.host}:${n.port}`)},tryagain:n,clusterDown:n,connectionClosed:n,maxRedirections:function(r){t.call(e,r)},defaults:function(){t.call(e,r)}})}}function d(n,l){let d;if("end"===u.status)return void e.reject(new a.AbortError("Cluster is ended."));if("ready"===u.status||"cluster"===e.name){if(r&&r.redis)d=r.redis;else if(o.default.checkFlag("ENTER_SUBSCRIBER_MODE",e.name)||o.default.checkFlag("EXIT_SUBSCRIBER_MODE",e.name)){if(!0==u.options.shardedSubscribers&&("ssubscribe"==e.name||"sunsubscribe"==e.name)){let t=u.shardedSubscribers.getResponsibleSubscriber(s),r=-1;"ssubscribe"==e.name&&(r=u.shardedSubscribers.addChannels(e.getKeys())),"sunsubscribe"==e.name&&(r=u.shardedSubscribers.removeChannels(e.getKeys())),-1!==r?d=t.getInstance():e.reject(new a.AbortError("Can't add or remove the given channels. Are they in the same slot?"))}else d=u.subscriber.getInstance();if(!d)return void e.reject(new a.AbortError("No subscriber for the cluster"))}else{if(!n){if("number"==typeof s&&u.slots[s]){let t=u.slots[s];if("function"==typeof i){let r=t.map(function(e){return u.connectionPool.getInstanceByKey(e)});Array.isArray(d=i(r,e))&&(d=(0,h.sample)(d)),d||(d=r[0])}else{let e;e="all"===i?(0,h.sample)(t):"slave"===i&&t.length>1?(0,h.sample)(t,1):t[0],d=u.connectionPool.getInstanceByKey(e)}}l&&(d=u.connectionPool.getInstanceByKey(l)).asking()}d||(d=("function"==typeof i?null:u.connectionPool.getSampleInstance(i))||u.connectionPool.getSampleInstance("all"))}r&&!r.redis&&(r.redis=d)}d?d.sendCommand(e,t):u.options.enableOfflineQueue?u.offlineQueue.push({command:e,stream:t,node:r}):e.reject(Error("Cluster isn't ready and enableOfflineQueue options is false"))}return d(),e.promise}sscanStream(e,t){return this.createScanStream("sscan",{key:e,options:t})}sscanBufferStream(e,t){return this.createScanStream("sscanBuffer",{key:e,options:t})}hscanStream(e,t){return this.createScanStream("hscan",{key:e,options:t})}hscanBufferStream(e,t){return this.createScanStream("hscanBuffer",{key:e,options:t})}zscanStream(e,t){return this.createScanStream("zscan",{key:e,options:t})}zscanBufferStream(e,t){return this.createScanStream("zscanBuffer",{key:e,options:t})}handleError(e,t,r){if(void 0===t.value?t.value=this.options.maxRedirections:t.value-=1,t.value<=0)return void r.maxRedirections(Error("Too many Cluster redirections. Last error: "+e));let n=e.message.split(" ");if("MOVED"===n[0]){let e=this.options.retryDelayOnMoved;e&&"number"==typeof e?this.delayQueue.push("moved",r.moved.bind(null,n[1],n[2]),{timeout:e}):r.moved(n[1],n[2])}else"ASK"===n[0]?r.ask(n[1],n[2]):"TRYAGAIN"===n[0]?this.delayQueue.push("tryagain",r.tryagain,{timeout:this.options.retryDelayOnTryAgain}):"CLUSTERDOWN"===n[0]&&this.options.retryDelayOnClusterDown>0?this.delayQueue.push("clusterdown",r.connectionClosed,{timeout:this.options.retryDelayOnClusterDown,callback:this.refreshSlotsCache.bind(this)}):e.message===h.CONNECTION_CLOSED_ERROR_MSG&&this.options.retryDelayOnFailover>0&&"ready"===this.status?this.delayQueue.push("failover",r.connectionClosed,{timeout:this.options.retryDelayOnFailover,callback:this.refreshSlotsCache.bind(this)}):r.defaults()}resetOfflineQueue(){this.offlineQueue=new E}clearNodesRefreshInterval(){this.slotsTimer&&(clearTimeout(this.slotsTimer),this.slotsTimer=null)}resetNodesRefreshInterval(){if(this.slotsTimer||!this.options.slotsRefreshInterval)return;let e=()=>{this.slotsTimer=setTimeout(()=>{S('refreshing slot caches... (triggered by "slotsRefreshInterval" option)'),this.refreshSlotsCache(()=>{e()})},this.options.slotsRefreshInterval)};e()}setStatus(e){S("status: %s -> %s",this.status||"[empty]",e),this.status=e,process.nextTick(()=>{this.emit(e)})}handleCloseEvent(e){let t;e&&S("closed because %s",e),this.manuallyClosing||"function"!=typeof this.options.clusterRetryStrategy||(t=this.options.clusterRetryStrategy.call(this,++this.retryAttempts,e)),"number"==typeof t?(this.setStatus("reconnecting"),this.reconnectTimeout=setTimeout(()=>{this.reconnectTimeout=null,S("Cluster is disconnected. Retrying after %dms",t),this.connect().catch(function(e){S("Got error %s when reconnecting. Ignoring...",e)})},t)):(this.setStatus("end"),this.flushQueue(Error("None of startup nodes is available")))}flushQueue(e){let t;for(;t=this.offlineQueue.shift();)t.command.reject(e)}executeOfflineCommands(){if(this.offlineQueue.length){let e;S("send %d commands in offline queue",this.offlineQueue.length);let t=this.offlineQueue;for(this.resetOfflineQueue();e=t.shift();)this.sendCommand(e.command,e.stream,e.node)}}natMapper(e){let t="string"==typeof e?e:`${e.host}:${e.port}`,r=null;return(this.options.natMap&&"function"==typeof this.options.natMap?r=this.options.natMap(t):this.options.natMap&&"object"==typeof this.options.natMap&&(r=this.options.natMap[t]),r)?(S("NAT mapping %s -> %O",t,r),Object.assign({},r)):"string"==typeof e?(0,v.nodeKeyToRedisOptions)(e):e}getInfoFromNode(e,t){if(!e)return t(Error("Node is disconnected"));let r=e.duplicate({enableOfflineQueue:!0,enableReadyCheck:!1,retryStrategy:null,connectionName:(0,v.getConnectionName)("refresher",this.options.redisOptions&&this.options.redisOptions.connectionName)});r.on("error",h.noop),r.cluster("SLOTS",(0,h.timeout)((e,n)=>{if(r.disconnect(),e)return S("error encountered running CLUSTER.SLOTS: %s",e),t(e);if("disconnecting"===this.status||"close"===this.status||"end"===this.status){S("ignore CLUSTER.SLOTS results (count: %d) since cluster status is %s",n.length,this.status),t();return}let i=[];S("cluster slots result count: %d",n.length);for(let e=0;e<n.length;++e){let t=n[e],r=t[0],a=t[1],s=[];for(let e=2;e<t.length;e++){if(!t[e][0])continue;let r=this.natMapper({host:t[e][0],port:t[e][1]});r.readOnly=2!==e,i.push(r),s.push(r.host+":"+r.port)}S("cluster slots result [%d]: slots %d~%d served by %s",e,r,a,s);for(let e=r;e<=a;e++)this.slots[e]=s}this._groupsIds=Object.create(null);let a=0;for(let e=0;e<16384;e++){let t=(this.slots[e]||[]).join(";");if(!t.length){this._groupsBySlot[e]=void 0;continue}this._groupsIds[t]||(this._groupsIds[t]=++a),this._groupsBySlot[e]=this._groupsIds[t]}this.connectionPool.reset(i),t()},this.options.slotsRefreshTimeout))}invokeReadyDelayedCallbacks(e){for(let t of this._readyDelayedCallbacks)process.nextTick(t,e);this._readyDelayedCallbacks=[]}readyCheck(e){this.cluster("INFO",(t,r)=>{let n;if(t)return e(t);if("string"!=typeof r)return e();let i=r.split("\r\n");for(let e=0;e<i.length;++e){let t=i[e].split(":");if("cluster_state"===t[0]){n=t[1];break}}"fail"===n?(S("cluster state not ok (%s)",n),e(null,n)):e()})}resolveSrv(e){return new Promise((t,r)=>{this.options.resolveSrv(e,(e,n)=>{if(e)return r(e);let i=this,a=(0,v.groupSrvRecords)(n),s=Object.keys(a).sort((e,t)=>parseInt(e)-parseInt(t));!function e(n){if(!s.length)return r(n);let o=a[s[0]],l=(0,v.weightSrvRecords)(o);o.records.length||s.shift(),i.dnsLookup(l.name).then(e=>t({host:e,port:l.port}),e)}()})})}dnsLookup(e){return new Promise((t,r)=>{this.options.dnsLookup(e,(n,i)=>{n?(S("failed to resolve hostname %s to IP: %s",e,n.message),r(n)):(S("resolved hostname %s to IP %s",e,i),t(i))})})}async resolveStartupNodeHostnames(){if(!Array.isArray(this.startupNodes)||0===this.startupNodes.length)throw Error("`startupNodes` should contain at least one node.");let e=(0,v.normalizeNodeOptions)(this.startupNodes),t=(0,v.getUniqueHostnamesFromOptions)(e);if(0===t.length)return e;let r=await Promise.all(t.map((this.options.useSRVRecords?this.resolveSrv:this.dnsLookup).bind(this))),n=(0,h.zipMap)(t,r);return e.map(e=>{let t=n.get(e.host);return t?this.options.useSRVRecords?Object.assign({},e,t):Object.assign({},e,{host:t}):e})}createScanStream(e,{key:t,options:r={}}){return new d.default({objectMode:!0,key:t,redis:this,command:e,...r})}}(0,p.default)(w,i.EventEmitter),(0,c.addTransactionSupport)(w.prototype),r.default=w},112251,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=(0,e.r(213895).Debug)("AbstractConnector");r.default=class{constructor(e){this.connecting=!1,this.disconnectTimeout=e}check(e){return!0}disconnect(){if(this.connecting=!1,this.stream){let e=this.stream,t=setTimeout(()=>{n("stream %s:%s still open, destroying it",e.remoteAddress,e.remotePort),e.destroy()},this.disconnectTimeout);e.on("close",()=>clearTimeout(t)),e.end()}}}},514069,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=e.r(504446),i=e.r(755004),a=e.r(213895),s=e.r(112251);class o extends s.default{constructor(e){super(e.disconnectTimeout),this.options=e}connect(e){let t,{options:r}=this;return this.connecting=!0,"path"in r&&r.path?t={path:r.path}:(t={},"port"in r&&null!=r.port&&(t.port=r.port),"host"in r&&null!=r.host&&(t.host=r.host),"family"in r&&null!=r.family&&(t.family=r.family)),r.tls&&Object.assign(t,r.tls),new Promise((e,s)=>{process.nextTick(()=>{if(!this.connecting)return void s(Error(a.CONNECTION_CLOSED_ERROR_MSG));try{r.tls?this.stream=(0,i.connect)(t):this.stream=(0,n.createConnection)(t)}catch(e){s(e);return}this.stream.once("error",e=>{this.firstError=e}),e(this.stream)})})}}r.default=o},99378,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=class{constructor(e){this.cursor=0,this.sentinels=e.slice(0)}next(){let e=this.cursor>=this.sentinels.length;return{done:e,value:e?void 0:this.sentinels[this.cursor++]}}reset(e){e&&this.sentinels.length>1&&1!==this.cursor&&this.sentinels.unshift(...this.sentinels.splice(this.cursor-1)),this.cursor=0}add(e){for(let r=0;r<this.sentinels.length;r++){var t;if(t=this.sentinels[r],(e.host||"127.0.0.1")===(t.host||"127.0.0.1")&&(e.port||26379)===(t.port||26379))return!1}return this.sentinels.push(e),!0}toString(){return`${JSON.stringify(this.sentinels)} @${this.cursor}`}}},506057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.FailoverDetector=void 0;let n=(0,e.r(213895).Debug)("FailoverDetector"),i="+switch-master";r.FailoverDetector=class{constructor(e,t){this.isDisconnected=!1,this.connector=e,this.sentinels=t}cleanup(){for(let e of(this.isDisconnected=!0,this.sentinels))e.client.disconnect()}async subscribe(){n("Starting FailoverDetector");let e=[];for(let t of this.sentinels){let r=t.client.subscribe(i).catch(e=>{n("Failed to subscribe to failover messages on sentinel %s:%s (%s)",t.address.host||"127.0.0.1",t.address.port||26739,e.message)});e.push(r),t.client.on("message",e=>{this.isDisconnected||e!==i||this.disconnect()})}await Promise.all(e)}disconnect(){this.isDisconnected=!0,n("Failover detected, disconnecting"),this.connector.disconnect()}}},403107,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.SentinelIterator=void 0;let n=e.r(504446),i=e.r(213895),a=e.r(755004),s=e.r(99378);r.SentinelIterator=s.default;let o=e.r(112251),l=e.r(445375),u=e.r(506057),d=(0,i.Debug)("SentinelConnector");class c extends o.default{constructor(e){if(super(e.disconnectTimeout),this.options=e,this.emitter=null,this.failoverDetector=null,!this.options.sentinels.length)throw Error("Requires at least one sentinel to connect to.");if(!this.options.name)throw Error("Requires the name of master.");this.sentinelIterator=new s.default(this.options.sentinels)}check(e){let t=!e.role||this.options.role===e.role;return t||(d("role invalid, expected %s, but got %s",this.options.role,e.role),this.sentinelIterator.next(),this.sentinelIterator.next(),this.sentinelIterator.reset(!0)),t}disconnect(){super.disconnect(),this.failoverDetector&&this.failoverDetector.cleanup()}connect(e){let t;this.connecting=!0,this.retryAttempts=0;let r=async()=>{let s=this.sentinelIterator.next();if(s.done){this.sentinelIterator.reset(!1);let n="function"==typeof this.options.sentinelRetryStrategy?this.options.sentinelRetryStrategy(++this.retryAttempts):null,i="number"!=typeof n?"All sentinels are unreachable and retry is disabled.":`All sentinels are unreachable. Retrying from scratch after ${n}ms.`;t&&(i+=` Last error: ${t.message}`),d(i);let a=Error(i);if("number"==typeof n)return e("error",a),await new Promise(e=>setTimeout(e,n)),r();throw a}let o=null,l=null;try{o=await this.resolve(s.value)}catch(e){l=e}if(!this.connecting)throw Error(i.CONNECTION_CLOSED_ERROR_MSG);let u=s.value.host+":"+s.value.port;if(o)return d("resolved: %s:%s from sentinel %s",o.host,o.port,u),this.options.enableTLSForSentinelMode&&this.options.tls?(Object.assign(o,this.options.tls),this.stream=(0,a.connect)(o),this.stream.once("secureConnect",this.initFailoverDetector.bind(this))):(this.stream=(0,n.createConnection)(o),this.stream.once("connect",this.initFailoverDetector.bind(this))),this.stream.once("error",e=>{this.firstError=e}),this.stream;{let n=l?"failed to connect to sentinel "+u+" because "+l.message:"connected to sentinel "+u+" successfully, but got an invalid reply: "+o;return d(n),e("sentinelError",Error(n)),l&&(t=l),r()}};return r()}async updateSentinels(e){if(!this.options.updateSentinels)return;let t=await e.sentinel("sentinels",this.options.name);Array.isArray(t)&&(t.map(i.packObject).forEach(e=>{if(-1===(e.flags?e.flags.split(","):[]).indexOf("disconnected")&&e.ip&&e.port){let t=this.sentinelNatResolve(h(e));this.sentinelIterator.add(t)&&d("adding sentinel %s:%s",t.host,t.port)}}),d("Updated internal sentinels: %s",this.sentinelIterator))}async resolveMaster(e){let t=await e.sentinel("get-master-addr-by-name",this.options.name);return await this.updateSentinels(e),this.sentinelNatResolve(Array.isArray(t)?{host:t[0],port:Number(t[1])}:null)}async resolveSlave(e){let t=await e.sentinel("slaves",this.options.name);if(!Array.isArray(t))return null;let r=t.map(i.packObject).filter(e=>e.flags&&!e.flags.match(/(disconnected|s_down|o_down)/));return this.sentinelNatResolve(function(e,t){let r;if(0===e.length)return null;if("function"==typeof t)r=t(e);else if(null!==t&&"object"==typeof t){let n=Array.isArray(t)?t:[t];n.sort((e,t)=>(e.prio||(e.prio=1),t.prio||(t.prio=1),e.prio<t.prio)?-1:+(e.prio>t.prio));for(let t=0;t<n.length;t++){for(let i=0;i<e.length;i++){let a=e[i];if(a.ip===n[t].ip&&a.port===n[t].port){r=a;break}}if(r)break}}return r||(r=(0,i.sample)(e)),h(r)}(r,this.options.preferredSlaves))}sentinelNatResolve(e){if(!e||!this.options.natMap)return e;let t=`${e.host}:${e.port}`,r=e;return"function"==typeof this.options.natMap?r=this.options.natMap(t)||e:"object"==typeof this.options.natMap&&(r=this.options.natMap[t]||e),r}connectToSentinel(e,t){return new l.default({port:e.port||26379,host:e.host,username:this.options.sentinelUsername||null,password:this.options.sentinelPassword||null,family:e.family||("path"in this.options&&this.options.path?void 0:this.options.family),tls:this.options.sentinelTLS,retryStrategy:null,enableReadyCheck:!1,connectTimeout:this.options.connectTimeout,commandTimeout:this.options.sentinelCommandTimeout,...t})}async resolve(e){let t=this.connectToSentinel(e);t.on("error",p);try{if("slave"===this.options.role)return await this.resolveSlave(t);return await this.resolveMaster(t)}finally{t.disconnect()}}async initFailoverDetector(){var e;if(!this.options.failoverDetector)return;this.sentinelIterator.reset(!0);let t=[];for(;t.length<this.options.sentinelMaxConnections;){let{done:e,value:r}=this.sentinelIterator.next();if(e)break;let n=this.connectToSentinel(r,{lazyConnect:!0,retryStrategy:this.options.sentinelReconnectStrategy});n.on("reconnecting",()=>{var e;null==(e=this.emitter)||e.emit("sentinelReconnecting")}),t.push({address:r,client:n})}this.sentinelIterator.reset(!1),this.failoverDetector&&this.failoverDetector.cleanup(),this.failoverDetector=new u.FailoverDetector(this,t),await this.failoverDetector.subscribe(),null==(e=this.emitter)||e.emit("failoverSubscribed")}}function h(e){return{host:e.ip,port:Number(e.port)}}function p(){}r.default=c},225752,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.SentinelConnector=r.StandaloneConnector=void 0,r.StandaloneConnector=e.r(514069).default,r.SentinelConnector=e.r(403107).default},991217,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=e.r(287315);class i extends n.AbortError{constructor(e){super(`Reached the max retries per request limit (which is ${e}). Refer to "maxRetriesPerRequest" option for details.`),Error.captureStackTrace(this,this.constructor)}get name(){return this.constructor.name}}r.default=i},659788,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.MaxRetriesPerRequestError=void 0,r.MaxRetriesPerRequestError=e.r(991217).default},39157,(e,t,r)=>{"use strict";let n=e.r(500874).Buffer,i=new(e.r(99348)).StringDecoder,a=e.r(287315),s=a.ReplyError,o=a.ParserError;var l=n.allocUnsafe(32768),u=0,d=null,c=0,h=0;function p(e){let t=e.offset,r=e.buffer,n=r.length-1;for(var i=t;i<n;)if(13===r[i++]){if(e.offset=i+1,!0===e.optionReturnBuffers)return e.buffer.slice(t,i-1);return e.buffer.toString("utf8",t,i-1)}}function m(e){let t=e.buffer.length-1;for(var r=e.offset,n=0;r<t;){let t=e.buffer[r++];if(13===t)return e.offset=r+1,n;n=10*n+(t-48)}}function f(e,t,r){e.arrayCache.push(t),e.arrayPos.push(r)}function y(e){let t=e.arrayCache.pop();var r=e.arrayPos.pop();if(e.arrayCache.length){let n=y(e);if(void 0===n)return void f(e,t,r);t[r++]=n}return b(e,t,r)}function b(e,t,r){let n=e.buffer.length;for(;r<t.length;){let i=e.offset;if(e.offset>=n)return void f(e,t,r);let a=g(e,e.buffer[e.offset++]);if(void 0===a){e.arrayCache.length||e.bufferCache.length||(e.offset=i),f(e,t,r);return}t[r]=a,r++}return t}function g(e,t){switch(t){case 36:let r=m(e);if(void 0===r)return;if(r<0)return null;let n=e.offset+r;if(n+2>e.buffer.length){e.bigStrSize=n+2,e.totalChunkSize=e.buffer.length,e.bufferCache.push(e.buffer);return}let i=e.offset;return(e.offset=n+2,!0===e.optionReturnBuffers)?e.buffer.slice(i,n):e.buffer.toString("utf8",i,n);case 43:return p(e);case 42:let a;return void 0===(a=m(e))?void 0:a<0?null:b(e,Array(a),0);case 58:return!0===e.optionStringNumbers?function(e){let t=e.buffer.length-1;var r=e.offset,n=0,i="";for(45===e.buffer[r]&&(i+="-",r++);r<t;){var a=e.buffer[r++];if(13===a)return e.offset=r+1,0!==n&&(i+=n),i;n>0x19999998?(i+=10*n+(a-48),n=0):48===a&&0===n?i+=0:n=10*n+(a-48)}}(e):function(e){let t=e.buffer.length-1;var r=e.offset,n=0,i=1;for(45===e.buffer[r]&&(i=-1,r++);r<t;){let t=e.buffer[r++];if(13===t)return e.offset=r+1,i*n;n=10*n+(t-48)}}(e);case 45:var l=p(e);if(void 0!==l)return!0===e.optionReturnBuffers&&(l=l.toString()),new s(l);return;default:let u;return u=new o("Protocol error, got "+JSON.stringify(String.fromCharCode(t))+" as reply type byte",JSON.stringify(e.buffer),e.offset),void(e.buffer=null,e.returnFatalError(u))}}function v(){if(l.length>51200)if(1===c||h>2*c){let e=Math.floor(l.length/10),t=e<u?u:e;u=0,l=l.slice(t,l.length)}else h++,c--;else clearInterval(d),c=0,h=0,d=null}t.exports=class{constructor(e){if(!e)throw TypeError("Options are mandatory.");if("function"!=typeof e.returnError||"function"!=typeof e.returnReply)throw TypeError("The returnReply and returnError options have to be functions.");this.setReturnBuffers(!!e.returnBuffers),this.setStringNumbers(!!e.stringNumbers),this.returnError=e.returnError,this.returnFatalError=e.returnFatalError||e.returnError,this.returnReply=e.returnReply,this.reset()}reset(){this.offset=0,this.buffer=null,this.bigStrSize=0,this.totalChunkSize=0,this.bufferCache=[],this.arrayCache=[],this.arrayPos=[]}setReturnBuffers(e){if("boolean"!=typeof e)throw TypeError("The returnBuffers argument has to be a boolean");this.optionReturnBuffers=e}setStringNumbers(e){if("boolean"!=typeof e)throw TypeError("The stringNumbers argument has to be a boolean");this.optionStringNumbers=e}execute(e){if(null===this.buffer)this.buffer=e,this.offset=0;else if(0===this.bigStrSize){let t=this.buffer.length,r=t-this.offset,i=n.allocUnsafe(r+e.length);if(this.buffer.copy(i,0,this.offset,t),e.copy(i,r,0,e.length),this.buffer=i,this.offset=0,this.arrayCache.length){let e=y(this);if(void 0===e)return;this.returnReply(e)}}else if(this.totalChunkSize+e.length>=this.bigStrSize){this.bufferCache.push(e);var t=this.optionReturnBuffers?function(e){let t=e.bufferCache,r=e.offset,i=e.bigStrSize-r-2;var a=t.length,s=e.bigStrSize-e.totalChunkSize;if(e.offset=s,s<=2){if(2===a)return t[0].slice(r,t[0].length+s-2);a--,s=t[t.length-2].length+s}l.length<i+u&&(u>0x6f00000&&(u=0x3200000),l=n.allocUnsafe(i*(i>0x4b00000?2:3)+u),u=0,c++,null===d&&(d=setInterval(v,50)));let o=u;t[0].copy(l,o,r,t[0].length),u+=t[0].length-r;for(var h=1;h<a-1;h++)t[h].copy(l,u),u+=t[h].length;return t[h].copy(l,u,0,s-2),u+=s-2,l.slice(o,u)}(this):function(e){let t=e.bufferCache,r=e.offset;var n=t.length,a=e.bigStrSize-e.totalChunkSize;if(e.offset=a,a<=2){if(2===n)return t[0].toString("utf8",r,t[0].length+a-2);n--,a=t[t.length-2].length+a}for(var s=i.write(t[0].slice(r)),o=1;o<n-1;o++)s+=i.write(t[o]);return s+i.end(t[o].slice(0,a-2))}(this);if(this.bigStrSize=0,this.bufferCache=[],this.buffer=e,this.arrayCache.length&&(this.arrayCache[0][this.arrayPos[0]++]=t,void 0===(t=y(this))))return;this.returnReply(t)}else{this.bufferCache.push(e),this.totalChunkSize+=e.length;return}for(;this.offset<this.buffer.length;){let e=this.offset,t=this.buffer[this.offset++],r=g(this,t);if(void 0===r){this.arrayCache.length||this.bufferCache.length||(this.offset=e);return}45===t?this.returnError(r):this.returnReply(r)}this.buffer=null}}},886111,(e,t,r)=>{"use strict";t.exports=e.r(39157)},128305,(e,t,r)=>{"use strict";function n(e){return"unsubscribe"===e?"subscribe":"punsubscribe"===e?"psubscribe":"sunsubscribe"===e?"ssubscribe":e}Object.defineProperty(r,"__esModule",{value:!0}),r.default=class{constructor(){this.set={subscribe:{},psubscribe:{},ssubscribe:{}}}add(e,t){this.set[n(e)][t]=!0}del(e,t){delete this.set[n(e)][t]}channels(e){return Object.keys(this.set[n(e)])}isEmpty(){return 0===this.channels("subscribe").length&&0===this.channels("psubscribe").length&&0===this.channels("ssubscribe").length}}},692683,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=e.r(159026),i=e.r(213895),a=e.r(886111),s=e.r(128305),o=(0,i.Debug)("dataHandler");r.default=class{constructor(e,t){this.redis=e;const r=new a({stringNumbers:t.stringNumbers,returnBuffers:!0,returnError:e=>{this.returnError(e)},returnFatalError:e=>{this.returnFatalError(e)},returnReply:e=>{this.returnReply(e)}});e.stream.prependListener("data",e=>{r.execute(e)}),e.stream.resume()}returnFatalError(e){e.message+=". Please report this.",this.redis.recoverFromFatalError(e,e,{offlineQueue:!1})}returnError(e){let t=this.shiftCommand(e);if(t){if(e.command={name:t.command.name,args:t.command.args},"ssubscribe"==t.command.name&&e.message.includes("MOVED"))return void this.redis.emit("moved");this.redis.handleReconnection(e,t)}}returnReply(e){if(this.handleMonitorReply(e)||this.handleSubscriberReply(e))return;let t=this.shiftCommand(e);t&&(n.default.checkFlag("ENTER_SUBSCRIBER_MODE",t.command.name)?(this.redis.condition.subscriber=new s.default,this.redis.condition.subscriber.add(t.command.name,e[1].toString()),u(t.command,e[2])||this.redis.commandQueue.unshift(t)):n.default.checkFlag("EXIT_SUBSCRIBER_MODE",t.command.name)?d(t.command,e[2])||this.redis.commandQueue.unshift(t):t.command.resolve(e))}handleSubscriberReply(e){if(!this.redis.condition.subscriber)return!1;let t=Array.isArray(e)?e[0].toString():null;switch(o('receive reply "%s" in subscriber mode',t),t){case"message":this.redis.listeners("message").length>0&&this.redis.emit("message",e[1].toString(),e[2]?e[2].toString():""),this.redis.emit("messageBuffer",e[1],e[2]);break;case"pmessage":{let t=e[1].toString();this.redis.listeners("pmessage").length>0&&this.redis.emit("pmessage",t,e[2].toString(),e[3].toString()),this.redis.emit("pmessageBuffer",t,e[2],e[3]);break}case"smessage":this.redis.listeners("smessage").length>0&&this.redis.emit("smessage",e[1].toString(),e[2]?e[2].toString():""),this.redis.emit("smessageBuffer",e[1],e[2]);break;case"ssubscribe":case"subscribe":case"psubscribe":{let r=e[1].toString();this.redis.condition.subscriber.add(t,r);let n=this.shiftCommand(e);if(!n)return;u(n.command,e[2])||this.redis.commandQueue.unshift(n);break}case"sunsubscribe":case"unsubscribe":case"punsubscribe":{let r=e[1]?e[1].toString():null;r&&this.redis.condition.subscriber.del(t,r);let n=e[2];0===Number(n)&&(this.redis.condition.subscriber=!1);let i=this.shiftCommand(e);if(!i)return;d(i.command,n)||this.redis.commandQueue.unshift(i);break}default:{let t=this.shiftCommand(e);if(!t)return;t.command.resolve(e)}}return!0}handleMonitorReply(e){if("monitoring"!==this.redis.status)return!1;let t=e.toString();if("OK"===t)return!1;let r=t.indexOf(" "),n=t.slice(0,r),i=t.indexOf('"'),a=t.slice(i+1,-1).split('" "').map(e=>e.replace(/\\"/g,'"')),s=t.slice(r+2,i-2).split(" ");return this.redis.emit("monitor",n,a,s[1],s[0]),!0}shiftCommand(e){let t=this.redis.commandQueue.shift();if(!t){let t=Error("Command queue state error. If you can reproduce this, please report it."+(e instanceof Error?` Last error: ${e.message}`:` Last reply: ${e.toString()}`));return this.redis.emit("error",t),null}return t}};let l=new WeakMap;function u(e,t){let r=l.has(e)?l.get(e):e.args.length;return(r-=1)<=0?(e.resolve(t),l.delete(e),!0):(l.set(e,r),!1)}function d(e,t){let r=l.has(e)?l.get(e):e.args.length;return 0===r?0===Number(t)&&(l.delete(e),e.resolve(t),!0):(r-=1)<=0?(e.resolve(t),!0):(l.set(e,r),!1)}},103046,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.readyHandler=r.errorHandler=r.closeHandler=r.connectHandler=void 0;let n=e.r(287315),i=e.r(159026),a=e.r(659788),s=e.r(213895),o=e.r(692683),l=(0,s.Debug)("connection");function u(e){let t=new n.AbortError("Command aborted due to connection close");return t.command={name:e.name,args:e.args},t}r.connectHandler=function(e){return function(){var t;e.setStatus("connect"),e.resetCommandQueue();let n=!1,{connectionEpoch:i}=e;e.condition.auth&&e.auth(e.condition.auth,function(t){i===e.connectionEpoch&&t&&(-1!==t.message.indexOf("no password is set")?console.warn("[WARN] Redis server does not require a password, but a password was supplied."):-1!==t.message.indexOf("without any password configured for the default user")?console.warn("[WARN] This Redis server's `default` user does not require a password, but a password was supplied"):-1!==t.message.indexOf("wrong number of arguments for 'auth' command")?console.warn("[ERROR] The server returned \"wrong number of arguments for 'auth' command\". You are probably passing both username and password to Redis version 5 or below. You should only pass the 'password' option for Redis version 5 and under."):(n=!0,e.recoverFromFatalError(t,t)))}),e.condition.select&&e.select(e.condition.select).catch(t=>{e.silentEmit("error",t)}),new o.default(e,{stringNumbers:e.options.stringNumbers});let a=[];e.options.connectionName&&(l("set the connection name [%s]",e.options.connectionName),a.push(e.client("setname",e.options.connectionName).catch(s.noop))),e.options.disableClientInfo||(l("set the client info"),a.push((0,s.getPackageMeta)().then(t=>e.client("SETINFO","LIB-VER",t.version).catch(s.noop)).catch(s.noop)),a.push(e.client("SETINFO","LIB-NAME",(null==(t=e.options)?void 0:t.clientInfoTag)?`ioredis(${e.options.clientInfoTag})`:"ioredis").catch(s.noop))),Promise.all(a).catch(s.noop).finally(()=>{e.options.enableReadyCheck||r.readyHandler(e)(),e.options.enableReadyCheck&&e._readyCheck(function(t,a){i===e.connectionEpoch&&(t?n||e.recoverFromFatalError(Error("Ready check failed: "+t.message),t):e.connector.check(a)?r.readyHandler(e)():e.disconnect(!0))})})}},r.closeHandler=function(e){return function(){let r=e.status;if(e.setStatus("close"),e.commandQueue.length&&function(e){var t;let r=0;for(let n=0;n<e.length;){let i=null==(t=e.peekAt(n))?void 0:t.command,a=i.pipelineIndex;if((void 0===a||0===a)&&(r=0),void 0!==a&&a!==r++){e.remove(n,1),i.reject(u(i));continue}n++}}(e.commandQueue),e.offlineQueue.length&&function(e){var t;for(let r=0;r<e.length;){let n=null==(t=e.peekAt(r))?void 0:t.command;if("multi"===n.name)break;if("exec"===n.name){e.remove(r,1),n.reject(u(n));break}n.inTransaction?(e.remove(r,1),n.reject(u(n))):r++}}(e.offlineQueue),"ready"===r&&(e.prevCondition||(e.prevCondition=e.condition),e.commandQueue.length&&(e.prevCommandQueue=e.commandQueue)),e.manuallyClosing)return e.manuallyClosing=!1,l("skip reconnecting since the connection is manually closed."),t();if("function"!=typeof e.options.retryStrategy)return l("skip reconnecting because `retryStrategy` is not a function"),t();let n=e.options.retryStrategy(++e.retryAttempts);if("number"!=typeof n)return l("skip reconnecting because `retryStrategy` doesn't return a number"),t();l("reconnect in %sms",n),e.setStatus("reconnecting",n),e.reconnectTimeout=setTimeout(function(){e.reconnectTimeout=null,e.connect().catch(s.noop)},n);let{maxRetriesPerRequest:i}=e.options;"number"==typeof i&&(i<0?l("maxRetriesPerRequest is negative, ignoring..."):0==e.retryAttempts%(i+1)&&(l("reach maxRetriesPerRequest limitation, flushing command queue..."),e.flushQueue(new a.MaxRetriesPerRequestError(i))))};function t(){e.setStatus("end"),e.flushQueue(Error(s.CONNECTION_CLOSED_ERROR_MSG))}},r.errorHandler=function(e){return function(t){l("error: %s",t),e.silentEmit("error",t)}},r.readyHandler=function(e){return function(){if(e.setStatus("ready"),e.retryAttempts=0,e.options.monitor){e.call("monitor").then(()=>e.setStatus("monitoring"),t=>e.emit("error",t));let{sendCommand:t}=e;e.sendCommand=function(r){return i.default.checkFlag("VALID_IN_MONITOR_MODE",r.name)?t.call(e,r):(r.reject(Error("Connection is in monitoring mode, can't process commands.")),r.promise)},e.once("close",function(){delete e.sendCommand});return}let t=e.prevCondition?e.prevCondition.select:e.condition.select;if(e.options.readOnly&&(l("set the connection to readonly mode"),e.readonly().catch(s.noop)),e.prevCondition){let r=e.prevCondition;if(e.prevCondition=null,r.subscriber&&e.options.autoResubscribe){e.condition.select!==t&&(l("connect to db [%d]",t),e.select(t));let n=r.subscriber.channels("subscribe");n.length&&(l("subscribe %d channels",n.length),e.subscribe(n));let i=r.subscriber.channels("psubscribe");i.length&&(l("psubscribe %d channels",i.length),e.psubscribe(i));let a=r.subscriber.channels("ssubscribe");if(a.length)for(let t of(l("ssubscribe %s",a.length),a))e.ssubscribe(t)}}if(e.prevCommandQueue)if(e.options.autoResendUnfulfilledCommands)for(l("resend %d unfulfilled commands",e.prevCommandQueue.length);e.prevCommandQueue.length>0;){let t=e.prevCommandQueue.shift();t.select!==e.condition.select&&"select"!==t.command.name&&e.select(t.select),e.sendCommand(t.command,t.stream)}else e.prevCommandQueue=null;if(e.offlineQueue.length){l("send %d commands in offline queue",e.offlineQueue.length);let t=e.offlineQueue;for(e.resetOfflineQueue();t.length>0;){let r=t.shift();r.select!==e.condition.select&&"select"!==r.command.name&&e.select(r.select),e.sendCommand(r.command,r.stream)}}e.condition.select!==t&&(l("connect to db [%d]",t),e.select(t))}}},380494,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.DEFAULT_REDIS_OPTIONS=void 0,r.DEFAULT_REDIS_OPTIONS={port:6379,host:"localhost",family:0,connectTimeout:1e4,disconnectTimeout:2e3,retryStrategy:function(e){return Math.min(50*e,2e3)},keepAlive:0,noDelay:!0,connectionName:null,disableClientInfo:!1,clientInfoTag:void 0,sentinels:null,name:null,role:"master",sentinelRetryStrategy:function(e){return Math.min(10*e,1e3)},sentinelReconnectStrategy:function(){return 6e4},natMap:null,enableTLSForSentinelMode:!1,updateSentinels:!0,failoverDetector:!1,username:null,password:null,db:0,enableOfflineQueue:!0,enableReadyCheck:!0,autoResubscribe:!0,autoResendUnfulfilledCommands:!0,lazyConnect:!1,keyPrefix:"",reconnectOnError:null,readOnly:!1,stringNumbers:!1,maxRetriesPerRequest:20,maxLoadingRetryTime:1e4,enableAutoPipelining:!1,autoPipeliningIgnoredCommands:[],sentinelMaxConnections:10}},445375,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});let n=e.r(87693),i=e.r(427699),a=e.r(142351),s=e.r(258063),o=e.r(159026),l=e.r(225752),u=e.r(403107),d=e.r(103046),c=e.r(380494),h=e.r(659875),p=e.r(60886),m=e.r(213895),f=e.r(474031),y=e.r(534207),b=e.r(318761),g=e.r(820265),v=(0,m.Debug)("redis");class E extends y.default{constructor(e,t,r){if(super(),this.status="wait",this.isCluster=!1,this.reconnectTimeout=null,this.connectionEpoch=0,this.retryAttempts=0,this.manuallyClosing=!1,this._autoPipelines=new Map,this._runningAutoPipelines=new Set,this.parseOptions(e,t,r),i.EventEmitter.call(this),this.resetCommandQueue(),this.resetOfflineQueue(),this.options.Connector)this.connector=new this.options.Connector(this.options);else if(this.options.sentinels){const e=new u.default(this.options);e.emitter=this,this.connector=e}else this.connector=new l.StandaloneConnector(this.options);this.options.scripts&&Object.entries(this.options.scripts).forEach(([e,t])=>{this.defineCommand(e,t)}),this.options.lazyConnect?this.setStatus("wait"):this.connect().catch(b.noop)}static createClient(...e){return new E(...e)}get autoPipelineQueueSize(){let e=0;for(let t of this._autoPipelines.values())e+=t.length;return e}connect(e){let t=new Promise((e,t)=>{if("connecting"===this.status||"connect"===this.status||"ready"===this.status)return void t(Error("Redis is already connecting/connected"));this.connectionEpoch+=1,this.setStatus("connecting");let{options:r}=this;this.condition={select:r.db,auth:r.username?[r.username,r.password]:r.password,subscriber:!1};let n=this;(0,a.default)(this.connector.connect(function(e,t){n.silentEmit(e,t)}),function(i,a){if(i){n.flushQueue(i),n.silentEmit("error",i),t(i),n.setStatus("end");return}let s=r.tls?"secureConnect":"connect";if("sentinels"in r&&r.sentinels&&!r.enableTLSForSentinelMode&&(s="connect"),n.stream=a,r.noDelay&&a.setNoDelay(!0),"number"==typeof r.keepAlive&&(a.connecting?a.once(s,()=>{a.setKeepAlive(!0,r.keepAlive)}):a.setKeepAlive(!0,r.keepAlive)),a.connecting){if(a.once(s,d.connectHandler(n)),r.connectTimeout){let e=!1;a.setTimeout(r.connectTimeout,function(){if(e)return;a.setTimeout(0),a.destroy();let t=Error("connect ETIMEDOUT");t.errorno="ETIMEDOUT",t.code="ETIMEDOUT",t.syscall="connect",d.errorHandler(n)(t)}),a.once(s,function(){e=!0,a.setTimeout(0)})}}else if(a.destroyed){let e=n.connector.firstError;e&&process.nextTick(()=>{d.errorHandler(n)(e)}),process.nextTick(d.closeHandler(n))}else process.nextTick(d.connectHandler(n));a.destroyed||(a.once("error",d.errorHandler(n)),a.once("close",d.closeHandler(n)));let o=function(){n.removeListener("close",l),e()};var l=function(){n.removeListener("ready",o),t(Error(m.CONNECTION_CLOSED_ERROR_MSG))};n.once("ready",o),n.once("close",l)})});return(0,a.default)(t,e)}disconnect(e=!1){e||(this.manuallyClosing=!0),this.reconnectTimeout&&!e&&(clearTimeout(this.reconnectTimeout),this.reconnectTimeout=null),"wait"===this.status?d.closeHandler(this)():this.connector.disconnect()}end(){this.disconnect()}duplicate(e){return new E({...this.options,...e})}get mode(){var e;return this.options.monitor?"monitor":(null==(e=this.condition)?void 0:e.subscriber)?"subscriber":"normal"}monitor(e){let t=this.duplicate({monitor:!0,lazyConnect:!1});return(0,a.default)(new Promise(function(e,r){t.once("error",r),t.once("monitoring",function(){e(t)})}),e)}sendCommand(e,t){var r,i;if("wait"===this.status&&this.connect().catch(b.noop),"end"===this.status)return e.reject(Error(m.CONNECTION_CLOSED_ERROR_MSG)),e.promise;if((null==(r=this.condition)?void 0:r.subscriber)&&!o.default.checkFlag("VALID_IN_SUBSCRIBER_MODE",e.name))return e.reject(Error("Connection in subscriber mode, only subscriber commands may be used")),e.promise;"number"==typeof this.options.commandTimeout&&e.setTimeout(this.options.commandTimeout);let a="ready"===this.status||!t&&"connect"===this.status&&(0,n.exists)(e.name)&&((0,n.hasFlag)(e.name,"loading")||o.default.checkFlag("HANDSHAKE_COMMANDS",e.name));if(this.stream&&this.stream.writable?this.stream._writableState&&this.stream._writableState.ended&&(a=!1):a=!1,a)v.enabled&&v("write command[%s]: %d -> %s(%o)",this._getDescription(),null==(i=this.condition)?void 0:i.select,e.name,e.args),t?"isPipeline"in t&&t.isPipeline?t.write(e.toWritable(t.destination.redis.stream)):t.write(e.toWritable(t)):this.stream.write(e.toWritable(this.stream)),this.commandQueue.push({command:e,stream:t,select:this.condition.select}),o.default.checkFlag("WILL_DISCONNECT",e.name)&&(this.manuallyClosing=!0),void 0!==this.options.socketTimeout&&void 0===this.socketTimeoutTimer&&this.setSocketTimeout();else{if(!this.options.enableOfflineQueue)return e.reject(Error("Stream isn't writeable and enableOfflineQueue options is false")),e.promise;if("quit"===e.name&&0===this.offlineQueue.length)return this.disconnect(),e.resolve(Buffer.from("OK")),e.promise;v.enabled&&v("queue command[%s]: %d -> %s(%o)",this._getDescription(),this.condition.select,e.name,e.args),this.offlineQueue.push({command:e,stream:t,select:this.condition.select})}if("select"===e.name&&(0,m.isInt)(e.args[0])){let t=parseInt(e.args[0],10);this.condition.select!==t&&(this.condition.select=t,this.emit("select",t),v("switch to db [%d]",this.condition.select))}return e.promise}setSocketTimeout(){this.socketTimeoutTimer=setTimeout(()=>{this.stream.destroy(Error(`Socket timeout. Expecting data, but didn't receive any in ${this.options.socketTimeout}ms.`)),this.socketTimeoutTimer=void 0},this.options.socketTimeout),this.stream.once("data",()=>{clearTimeout(this.socketTimeoutTimer),this.socketTimeoutTimer=void 0,0!==this.commandQueue.length&&this.setSocketTimeout()})}scanStream(e){return this.createScanStream("scan",{options:e})}scanBufferStream(e){return this.createScanStream("scanBuffer",{options:e})}sscanStream(e,t){return this.createScanStream("sscan",{key:e,options:t})}sscanBufferStream(e,t){return this.createScanStream("sscanBuffer",{key:e,options:t})}hscanStream(e,t){return this.createScanStream("hscan",{key:e,options:t})}hscanBufferStream(e,t){return this.createScanStream("hscanBuffer",{key:e,options:t})}zscanStream(e,t){return this.createScanStream("zscan",{key:e,options:t})}zscanBufferStream(e,t){return this.createScanStream("zscanBuffer",{key:e,options:t})}silentEmit(e,t){let r;if("error"!==e||(r=t,"end"!==this.status&&(!this.manuallyClosing||!(r instanceof Error)||r.message!==m.CONNECTION_CLOSED_ERROR_MSG&&"connect"!==r.syscall&&"read"!==r.syscall)))return this.listeners(e).length>0?this.emit.apply(this,arguments):(r&&r instanceof Error&&console.error("[ioredis] Unhandled error event:",r.stack),!1)}recoverFromFatalError(e,t,r){this.flushQueue(t,r),this.silentEmit("error",t),this.disconnect(!0)}handleReconnection(e,t){var r;let n=!1;switch(this.options.reconnectOnError&&!o.default.checkFlag("IGNORE_RECONNECT_ON_ERROR",t.command.name)&&(n=this.options.reconnectOnError(e)),n){case 1:case!0:"reconnecting"!==this.status&&this.disconnect(!0),t.command.reject(e);break;case 2:"reconnecting"!==this.status&&this.disconnect(!0),(null==(r=this.condition)?void 0:r.select)!==t.select&&"select"!==t.command.name&&this.select(t.select),this.sendCommand(t.command);break;default:t.command.reject(e)}}_getDescription(){let e;return e="path"in this.options&&this.options.path?this.options.path:this.stream&&this.stream.remoteAddress&&this.stream.remotePort?this.stream.remoteAddress+":"+this.stream.remotePort:"host"in this.options&&this.options.host?this.options.host+":"+this.options.port:"",this.options.connectionName&&(e+=` (${this.options.connectionName})`),e}resetCommandQueue(){this.commandQueue=new g}resetOfflineQueue(){this.offlineQueue=new g}parseOptions(...e){let t={},r=!1;for(let n=0;n<e.length;++n){let i=e[n];if(null!=i)if("object"==typeof i)(0,b.defaults)(t,i);else if("string"==typeof i)(0,b.defaults)(t,(0,m.parseURL)(i)),i.startsWith("rediss://")&&(r=!0);else if("number"==typeof i)t.port=i;else throw Error("Invalid argument "+i)}r&&(0,b.defaults)(t,{tls:!0}),(0,b.defaults)(t,E.defaultOptions),"string"==typeof t.port&&(t.port=parseInt(t.port,10)),"string"==typeof t.db&&(t.db=parseInt(t.db,10)),this.options=(0,m.resolveTLSProfile)(t)}setStatus(e,t){v.enabled&&v("status[%s]: %s -> %s",this._getDescription(),this.status||"[empty]",e),this.status=e,process.nextTick(this.emit.bind(this,e,t))}createScanStream(e,{key:t,options:r={}}){return new h.default({objectMode:!0,key:t,redis:this,command:e,...r})}flushQueue(e,t){let r;if((t=(0,b.defaults)({},t,{offlineQueue:!0,commandQueue:!0})).offlineQueue)for(;r=this.offlineQueue.shift();)r.command.reject(e);if(t.commandQueue&&this.commandQueue.length>0)for(this.stream&&this.stream.removeAllListeners("data");r=this.commandQueue.shift();)r.command.reject(e)}_readyCheck(e){let t=this;this.info(function(r,n){if(r)return r.message&&r.message.includes("NOPERM")?(console.warn(`Skipping the ready check because INFO command fails: "${r.message}". You can disable ready check with "enableReadyCheck". More: https://github.com/luin/ioredis/wiki/Disable-ready-check.`),e(null,{})):e(r);if("string"!=typeof n)return e(null,n);let i={},a=n.split("\r\n");for(let e=0;e<a.length;++e){let[t,...r]=a[e].split(":"),n=r.join(":");n&&(i[t]=n)}if(i.loading&&"0"!==i.loading){let r=1e3*(i.loading_eta_seconds||1),n=t.options.maxLoadingRetryTime&&t.options.maxLoadingRetryTime<r?t.options.maxLoadingRetryTime:r;v("Redis server still loading, trying again in "+n+"ms"),setTimeout(function(){t._readyCheck(e)},n)}else e(null,i)}).catch(b.noop)}}E.Cluster=s.default,E.Command=o.default,E.defaultOptions=c.DEFAULT_REDIS_OPTIONS,(0,f.default)(E,i.EventEmitter),(0,p.addTransactionSupport)(E.prototype),r.default=E},906401,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.print=r.ReplyError=r.SentinelIterator=r.SentinelConnector=r.AbstractConnector=r.Pipeline=r.ScanStream=r.Command=r.Cluster=r.Redis=r.default=void 0,r=t.exports=e.r(445375).default;var n=e.r(445375);Object.defineProperty(r,"default",{enumerable:!0,get:function(){return n.default}});var i=e.r(445375);Object.defineProperty(r,"Redis",{enumerable:!0,get:function(){return i.default}});var a=e.r(258063);Object.defineProperty(r,"Cluster",{enumerable:!0,get:function(){return a.default}});var s=e.r(159026);Object.defineProperty(r,"Command",{enumerable:!0,get:function(){return s.default}});var o=e.r(659875);Object.defineProperty(r,"ScanStream",{enumerable:!0,get:function(){return o.default}});var l=e.r(460520);Object.defineProperty(r,"Pipeline",{enumerable:!0,get:function(){return l.default}});var u=e.r(112251);Object.defineProperty(r,"AbstractConnector",{enumerable:!0,get:function(){return u.default}});var d=e.r(403107);Object.defineProperty(r,"SentinelConnector",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(r,"SentinelIterator",{enumerable:!0,get:function(){return d.SentinelIterator}}),r.ReplyError=e.r(287315).ReplyError,Object.defineProperty(r,"Promise",{get:()=>(console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used."),Promise),set(e){console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used.")}}),r.print=function(e,t){e?console.log("Error: "+e):console.log("Reply: "+t)}},250281,(e,t,r)=>{"use strict";t.exports={MAX_LENGTH:256,MAX_SAFE_COMPONENT_LENGTH:16,MAX_SAFE_BUILD_LENGTH:250,MAX_SAFE_INTEGER:Number.MAX_SAFE_INTEGER||0x1fffffffffffff,RELEASE_TYPES:["major","premajor","minor","preminor","patch","prepatch","prerelease"],SEMVER_SPEC_VERSION:"2.0.0",FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2}},26575,(e,t,r)=>{"use strict";t.exports="object"==typeof process&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?(...e)=>console.error("SEMVER",...e):()=>{}},797526,(e,t,r)=>{"use strict";let{MAX_SAFE_COMPONENT_LENGTH:n,MAX_SAFE_BUILD_LENGTH:i,MAX_LENGTH:a}=e.r(250281),s=e.r(26575),o=(r=t.exports={}).re=[],l=r.safeRe=[],u=r.src=[],d=r.safeSrc=[],c=r.t={},h=0,p="[a-zA-Z0-9-]",m=[["\\s",1],["\\d",a],[p,i]],f=(e,t,r)=>{let n=(e=>{for(let[t,r]of m)e=e.split(`${t}*`).join(`${t}{0,${r}}`).split(`${t}+`).join(`${t}{1,${r}}`);return e})(t),i=h++;s(e,i,t),c[e]=i,u[i]=t,d[i]=n,o[i]=new RegExp(t,r?"g":void 0),l[i]=new RegExp(n,r?"g":void 0)};f("NUMERICIDENTIFIER","0|[1-9]\\d*"),f("NUMERICIDENTIFIERLOOSE","\\d+"),f("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${p}*`),f("MAINVERSION",`(${u[c.NUMERICIDENTIFIER]})\\.(${u[c.NUMERICIDENTIFIER]})\\.(${u[c.NUMERICIDENTIFIER]})`),f("MAINVERSIONLOOSE",`(${u[c.NUMERICIDENTIFIERLOOSE]})\\.(${u[c.NUMERICIDENTIFIERLOOSE]})\\.(${u[c.NUMERICIDENTIFIERLOOSE]})`),f("PRERELEASEIDENTIFIER",`(?:${u[c.NONNUMERICIDENTIFIER]}|${u[c.NUMERICIDENTIFIER]})`),f("PRERELEASEIDENTIFIERLOOSE",`(?:${u[c.NONNUMERICIDENTIFIER]}|${u[c.NUMERICIDENTIFIERLOOSE]})`),f("PRERELEASE",`(?:-(${u[c.PRERELEASEIDENTIFIER]}(?:\\.${u[c.PRERELEASEIDENTIFIER]})*))`),f("PRERELEASELOOSE",`(?:-?(${u[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${u[c.PRERELEASEIDENTIFIERLOOSE]})*))`),f("BUILDIDENTIFIER",`${p}+`),f("BUILD",`(?:\\+(${u[c.BUILDIDENTIFIER]}(?:\\.${u[c.BUILDIDENTIFIER]})*))`),f("FULLPLAIN",`v?${u[c.MAINVERSION]}${u[c.PRERELEASE]}?${u[c.BUILD]}?`),f("FULL",`^${u[c.FULLPLAIN]}$`),f("LOOSEPLAIN",`[v=\\s]*${u[c.MAINVERSIONLOOSE]}${u[c.PRERELEASELOOSE]}?${u[c.BUILD]}?`),f("LOOSE",`^${u[c.LOOSEPLAIN]}$`),f("GTLT","((?:<|>)?=?)"),f("XRANGEIDENTIFIERLOOSE",`${u[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),f("XRANGEIDENTIFIER",`${u[c.NUMERICIDENTIFIER]}|x|X|\\*`),f("XRANGEPLAIN",`[v=\\s]*(${u[c.XRANGEIDENTIFIER]})(?:\\.(${u[c.XRANGEIDENTIFIER]})(?:\\.(${u[c.XRANGEIDENTIFIER]})(?:${u[c.PRERELEASE]})?${u[c.BUILD]}?)?)?`),f("XRANGEPLAINLOOSE",`[v=\\s]*(${u[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[c.XRANGEIDENTIFIERLOOSE]})(?:${u[c.PRERELEASELOOSE]})?${u[c.BUILD]}?)?)?`),f("XRANGE",`^${u[c.GTLT]}\\s*${u[c.XRANGEPLAIN]}$`),f("XRANGELOOSE",`^${u[c.GTLT]}\\s*${u[c.XRANGEPLAINLOOSE]}$`),f("COERCEPLAIN",`(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`),f("COERCE",`${u[c.COERCEPLAIN]}(?:$|[^\\d])`),f("COERCEFULL",u[c.COERCEPLAIN]+`(?:${u[c.PRERELEASE]})?`+`(?:${u[c.BUILD]})?`+"(?:$|[^\\d])"),f("COERCERTL",u[c.COERCE],!0),f("COERCERTLFULL",u[c.COERCEFULL],!0),f("LONETILDE","(?:~>?)"),f("TILDETRIM",`(\\s*)${u[c.LONETILDE]}\\s+`,!0),r.tildeTrimReplace="$1~",f("TILDE",`^${u[c.LONETILDE]}${u[c.XRANGEPLAIN]}$`),f("TILDELOOSE",`^${u[c.LONETILDE]}${u[c.XRANGEPLAINLOOSE]}$`),f("LONECARET","(?:\\^)"),f("CARETTRIM",`(\\s*)${u[c.LONECARET]}\\s+`,!0),r.caretTrimReplace="$1^",f("CARET",`^${u[c.LONECARET]}${u[c.XRANGEPLAIN]}$`),f("CARETLOOSE",`^${u[c.LONECARET]}${u[c.XRANGEPLAINLOOSE]}$`),f("COMPARATORLOOSE",`^${u[c.GTLT]}\\s*(${u[c.LOOSEPLAIN]})$|^$`),f("COMPARATOR",`^${u[c.GTLT]}\\s*(${u[c.FULLPLAIN]})$|^$`),f("COMPARATORTRIM",`(\\s*)${u[c.GTLT]}\\s*(${u[c.LOOSEPLAIN]}|${u[c.XRANGEPLAIN]})`,!0),r.comparatorTrimReplace="$1$2$3",f("HYPHENRANGE",`^\\s*(${u[c.XRANGEPLAIN]})\\s+-\\s+(${u[c.XRANGEPLAIN]})\\s*$`),f("HYPHENRANGELOOSE",`^\\s*(${u[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${u[c.XRANGEPLAINLOOSE]})\\s*$`),f("STAR","(<|>)?=?\\s*\\*"),f("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$"),f("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")},465263,(e,t,r)=>{"use strict";let n=Object.freeze({loose:!0}),i=Object.freeze({});t.exports=e=>e?"object"!=typeof e?n:e:i},845505,(e,t,r)=>{"use strict";let n=/^[0-9]+$/,i=(e,t)=>{if("number"==typeof e&&"number"==typeof t)return e===t?0:e<t?-1:1;let r=n.test(e),i=n.test(t);return r&&i&&(e*=1,t*=1),e===t?0:r&&!i?-1:i&&!r?1:e<t?-1:1};t.exports={compareIdentifiers:i,rcompareIdentifiers:(e,t)=>i(t,e)}},975074,(e,t,r)=>{"use strict";let n=e.r(26575),{MAX_LENGTH:i,MAX_SAFE_INTEGER:a}=e.r(250281),{safeRe:s,t:o}=e.r(797526),l=e.r(465263),{compareIdentifiers:u}=e.r(845505);class d{constructor(e,t){if(t=l(t),e instanceof d)if(!!t.loose===e.loose&&!!t.includePrerelease===e.includePrerelease)return e;else e=e.version;else if("string"!=typeof e)throw TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);if(e.length>i)throw TypeError(`version is longer than ${i} characters`);n("SemVer",e,t),this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease;const r=e.trim().match(t.loose?s[o.LOOSE]:s[o.FULL]);if(!r)throw TypeError(`Invalid Version: ${e}`);if(this.raw=e,this.major=+r[1],this.minor=+r[2],this.patch=+r[3],this.major>a||this.major<0)throw TypeError("Invalid major version");if(this.minor>a||this.minor<0)throw TypeError("Invalid minor version");if(this.patch>a||this.patch<0)throw TypeError("Invalid patch version");r[4]?this.prerelease=r[4].split(".").map(e=>{if(/^[0-9]+$/.test(e)){let t=+e;if(t>=0&&t<a)return t}return e}):this.prerelease=[],this.build=r[5]?r[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(e){if(n("SemVer.compare",this.version,this.options,e),!(e instanceof d)){if("string"==typeof e&&e===this.version)return 0;e=new d(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}compareMain(e){return(e instanceof d||(e=new d(e,this.options)),this.major<e.major)?-1:this.major>e.major?1:this.minor<e.minor?-1:this.minor>e.minor?1:this.patch<e.patch?-1:+(this.patch>e.patch)}comparePre(e){if(e instanceof d||(e=new d(e,this.options)),this.prerelease.length&&!e.prerelease.length)return -1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let t=0;do{let r=this.prerelease[t],i=e.prerelease[t];if(n("prerelease compare",t,r,i),void 0===r&&void 0===i)return 0;if(void 0===i)return 1;if(void 0===r)return -1;else if(r===i)continue;else return u(r,i)}while(++t)}compareBuild(e){e instanceof d||(e=new d(e,this.options));let t=0;do{let r=this.build[t],i=e.build[t];if(n("build compare",t,r,i),void 0===r&&void 0===i)return 0;if(void 0===i)return 1;if(void 0===r)return -1;else if(r===i)continue;else return u(r,i)}while(++t)}inc(e,t,r){if(e.startsWith("pre")){if(!t&&!1===r)throw Error("invalid increment argument: identifier is empty");if(t){let e=`-${t}`.match(this.options.loose?s[o.PRERELEASELOOSE]:s[o.PRERELEASE]);if(!e||e[1]!==t)throw Error(`invalid identifier: ${t}`)}}switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",t,r);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",t,r);break;case"prepatch":this.prerelease.length=0,this.inc("patch",t,r),this.inc("pre",t,r);break;case"prerelease":0===this.prerelease.length&&this.inc("patch",t,r),this.inc("pre",t,r);break;case"release":if(0===this.prerelease.length)throw Error(`version ${this.raw} is not a prerelease`);this.prerelease.length=0;break;case"major":(0!==this.minor||0!==this.patch||0===this.prerelease.length)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(0!==this.patch||0===this.prerelease.length)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":0===this.prerelease.length&&this.patch++,this.prerelease=[];break;case"pre":{let e=+!!Number(r);if(0===this.prerelease.length)this.prerelease=[e];else{let n=this.prerelease.length;for(;--n>=0;)"number"==typeof this.prerelease[n]&&(this.prerelease[n]++,n=-2);if(-1===n){if(t===this.prerelease.join(".")&&!1===r)throw Error("invalid increment argument: identifier already exists");this.prerelease.push(e)}}if(t){let n=[t,e];!1===r&&(n=[t]),0===u(this.prerelease[0],t)?isNaN(this.prerelease[1])&&(this.prerelease=n):this.prerelease=n}break}default:throw Error(`invalid increment argument: ${e}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}}t.exports=d},62429,(e,t,r)=>{"use strict";let n=e.r(975074);t.exports=(e,t,r=!1)=>{if(e instanceof n)return e;try{return new n(e,t)}catch(e){if(!r)return null;throw e}}},328152,(e,t,r)=>{"use strict";let n=e.r(62429);t.exports=(e,t)=>{let r=n(e,t);return r?r.version:null}},9209,(e,t,r)=>{"use strict";let n=e.r(62429);t.exports=(e,t)=>{let r=n(e.trim().replace(/^[=v]+/,""),t);return r?r.version:null}},364775,(e,t,r)=>{"use strict";let n=e.r(975074);t.exports=(e,t,r,i,a)=>{"string"==typeof r&&(a=i,i=r,r=void 0);try{return new n(e instanceof n?e.version:e,r).inc(t,i,a).version}catch(e){return null}}},620486,(e,t,r)=>{"use strict";let n=e.r(62429);t.exports=(e,t)=>{let r=n(e,null,!0),i=n(t,null,!0),a=r.compare(i);if(0===a)return null;let s=a>0,o=s?r:i,l=s?i:r,u=!!o.prerelease.length;if(l.prerelease.length&&!u){if(!l.patch&&!l.minor)return"major";if(0===l.compareMain(o))return l.minor&&!l.patch?"minor":"patch"}let d=u?"pre":"";return r.major!==i.major?d+"major":r.minor!==i.minor?d+"minor":r.patch!==i.patch?d+"patch":"prerelease"}},923156,(e,t,r)=>{"use strict";let n=e.r(975074);t.exports=(e,t)=>new n(e,t).major},193356,(e,t,r)=>{"use strict";let n=e.r(975074);t.exports=(e,t)=>new n(e,t).minor},504749,(e,t,r)=>{"use strict";let n=e.r(975074);t.exports=(e,t)=>new n(e,t).patch},417576,(e,t,r)=>{"use strict";let n=e.r(62429);t.exports=(e,t)=>{let r=n(e,t);return r&&r.prerelease.length?r.prerelease:null}},992293,(e,t,r)=>{"use strict";let n=e.r(975074);t.exports=(e,t,r)=>new n(e,r).compare(new n(t,r))},151369,(e,t,r)=>{"use strict";let n=e.r(992293);t.exports=(e,t,r)=>n(t,e,r)},573091,(e,t,r)=>{"use strict";let n=e.r(992293);t.exports=(e,t)=>n(e,t,!0)},743643,(e,t,r)=>{"use strict";let n=e.r(975074);t.exports=(e,t,r)=>{let i=new n(e,r),a=new n(t,r);return i.compare(a)||i.compareBuild(a)}},590165,(e,t,r)=>{"use strict";let n=e.r(743643);t.exports=(e,t)=>e.sort((e,r)=>n(e,r,t))},254780,(e,t,r)=>{"use strict";let n=e.r(743643);t.exports=(e,t)=>e.sort((e,r)=>n(r,e,t))},952184,(e,t,r)=>{"use strict";let n=e.r(992293);t.exports=(e,t,r)=>n(e,t,r)>0},660312,(e,t,r)=>{"use strict";let n=e.r(992293);t.exports=(e,t,r)=>0>n(e,t,r)},977335,(e,t,r)=>{"use strict";let n=e.r(992293);t.exports=(e,t,r)=>0===n(e,t,r)},712792,(e,t,r)=>{"use strict";let n=e.r(992293);t.exports=(e,t,r)=>0!==n(e,t,r)},856172,(e,t,r)=>{"use strict";let n=e.r(992293);t.exports=(e,t,r)=>n(e,t,r)>=0},266368,(e,t,r)=>{"use strict";let n=e.r(992293);t.exports=(e,t,r)=>0>=n(e,t,r)},611870,(e,t,r)=>{"use strict";let n=e.r(977335),i=e.r(712792),a=e.r(952184),s=e.r(856172),o=e.r(660312),l=e.r(266368);t.exports=(e,t,r,u)=>{switch(t){case"===":return"object"==typeof e&&(e=e.version),"object"==typeof r&&(r=r.version),e===r;case"!==":return"object"==typeof e&&(e=e.version),"object"==typeof r&&(r=r.version),e!==r;case"":case"=":case"==":return n(e,r,u);case"!=":return i(e,r,u);case">":return a(e,r,u);case">=":return s(e,r,u);case"<":return o(e,r,u);case"<=":return l(e,r,u);default:throw TypeError(`Invalid operator: ${t}`)}}},283209,(e,t,r)=>{"use strict";let n=e.r(975074),i=e.r(62429),{safeRe:a,t:s}=e.r(797526);t.exports=(e,t)=>{if(e instanceof n)return e;if("number"==typeof e&&(e=String(e)),"string"!=typeof e)return null;let r=null;if((t=t||{}).rtl){let n,i=t.includePrerelease?a[s.COERCERTLFULL]:a[s.COERCERTL];for(;(n=i.exec(e))&&(!r||r.index+r[0].length!==e.length);)r&&n.index+n[0].length===r.index+r[0].length||(r=n),i.lastIndex=n.index+n[1].length+n[2].length;i.lastIndex=-1}else r=e.match(t.includePrerelease?a[s.COERCEFULL]:a[s.COERCE]);if(null===r)return null;let o=r[2],l=r[3]||"0",u=r[4]||"0",d=t.includePrerelease&&r[5]?`-${r[5]}`:"",c=t.includePrerelease&&r[6]?`+${r[6]}`:"";return i(`${o}.${l}.${u}${d}${c}`,t)}},945757,(e,t,r)=>{"use strict";t.exports=class{constructor(){this.max=1e3,this.map=new Map}get(e){let t=this.map.get(e);if(void 0!==t)return this.map.delete(e),this.map.set(e,t),t}delete(e){return this.map.delete(e)}set(e,t){if(!this.delete(e)&&void 0!==t){if(this.map.size>=this.max){let e=this.map.keys().next().value;this.delete(e)}this.map.set(e,t)}return this}}},150353,(e,t,r)=>{"use strict";let n=/\s+/g;class i{constructor(e,t){if(t=s(t),e instanceof i)if(!!t.loose===e.loose&&!!t.includePrerelease===e.includePrerelease)return e;else return new i(e.raw,t);if(e instanceof o)return this.raw=e.value,this.set=[[e]],this.formatted=void 0,this;if(this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease,this.raw=e.trim().replace(n," "),this.set=this.raw.split("||").map(e=>this.parseRange(e.trim())).filter(e=>e.length),!this.set.length)throw TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){const e=this.set[0];if(this.set=this.set.filter(e=>!b(e[0])),0===this.set.length)this.set=[e];else if(this.set.length>1){for(const e of this.set)if(1===e.length&&g(e[0])){this.set=[e];break}}}this.formatted=void 0}get range(){if(void 0===this.formatted){this.formatted="";for(let e=0;e<this.set.length;e++){e>0&&(this.formatted+="||");let t=this.set[e];for(let e=0;e<t.length;e++)e>0&&(this.formatted+=" "),this.formatted+=t[e].toString().trim()}}return this.formatted}format(){return this.range}toString(){return this.range}parseRange(e){let t=((this.options.includePrerelease&&f)|(this.options.loose&&y))+":"+e,r=a.get(t);if(r)return r;let n=this.options.loose,i=n?d[c.HYPHENRANGELOOSE]:d[c.HYPHENRANGE];l("hyphen replace",e=e.replace(i,A(this.options.includePrerelease))),l("comparator trim",e=e.replace(d[c.COMPARATORTRIM],h)),l("tilde trim",e=e.replace(d[c.TILDETRIM],p)),l("caret trim",e=e.replace(d[c.CARETTRIM],m));let s=e.split(" ").map(e=>E(e,this.options)).join(" ").split(/\s+/).map(e=>k(e,this.options));n&&(s=s.filter(e=>(l("loose invalid filter",e,this.options),!!e.match(d[c.COMPARATORLOOSE])))),l("range list",s);let u=new Map;for(let e of s.map(e=>new o(e,this.options))){if(b(e))return[e];u.set(e.value,e)}u.size>1&&u.has("")&&u.delete("");let g=[...u.values()];return a.set(t,g),g}intersects(e,t){if(!(e instanceof i))throw TypeError("a Range is required");return this.set.some(r=>v(r,t)&&e.set.some(e=>v(e,t)&&r.every(r=>e.every(e=>r.intersects(e,t)))))}test(e){if(!e)return!1;if("string"==typeof e)try{e=new u(e,this.options)}catch(e){return!1}for(let t=0;t<this.set.length;t++)if(O(this.set[t],e,this.options))return!0;return!1}}t.exports=i;let a=new(e.r(945757)),s=e.r(465263),o=e.r(966042),l=e.r(26575),u=e.r(975074),{safeRe:d,t:c,comparatorTrimReplace:h,tildeTrimReplace:p,caretTrimReplace:m}=e.r(797526),{FLAG_INCLUDE_PRERELEASE:f,FLAG_LOOSE:y}=e.r(250281),b=e=>"<0.0.0-0"===e.value,g=e=>""===e.value,v=(e,t)=>{let r=!0,n=e.slice(),i=n.pop();for(;r&&n.length;)r=n.every(e=>i.intersects(e,t)),i=n.pop();return r},E=(e,t)=>(l("comp",e=e.replace(d[c.BUILD],""),t),l("caret",e=w(e,t)),l("tildes",e=S(e,t)),l("xrange",e=T(e,t)),l("stars",e=j(e,t)),e),K=e=>!e||"x"===e.toLowerCase()||"*"===e,S=(e,t)=>e.trim().split(/\s+/).map(e=>I(e,t)).join(" "),I=(e,t)=>{let r=t.loose?d[c.TILDELOOSE]:d[c.TILDE];return e.replace(r,(t,r,n,i,a)=>{let s;return l("tilde",e,t,r,n,i,a),K(r)?s="":K(n)?s=`>=${r}.0.0 <${+r+1}.0.0-0`:K(i)?s=`>=${r}.${n}.0 <${r}.${+n+1}.0-0`:a?(l("replaceTilde pr",a),s=`>=${r}.${n}.${i}-${a} <${r}.${+n+1}.0-0`):s=`>=${r}.${n}.${i} <${r}.${+n+1}.0-0`,l("tilde return",s),s})},w=(e,t)=>e.trim().split(/\s+/).map(e=>x(e,t)).join(" "),x=(e,t)=>{l("caret",e,t);let r=t.loose?d[c.CARETLOOSE]:d[c.CARET],n=t.includePrerelease?"-0":"";return e.replace(r,(t,r,i,a,s)=>{let o;return l("caret",e,t,r,i,a,s),K(r)?o="":K(i)?o=`>=${r}.0.0${n} <${+r+1}.0.0-0`:K(a)?o="0"===r?`>=${r}.${i}.0${n} <${r}.${+i+1}.0-0`:`>=${r}.${i}.0${n} <${+r+1}.0.0-0`:s?(l("replaceCaret pr",s),o="0"===r?"0"===i?`>=${r}.${i}.${a}-${s} <${r}.${i}.${+a+1}-0`:`>=${r}.${i}.${a}-${s} <${r}.${+i+1}.0-0`:`>=${r}.${i}.${a}-${s} <${+r+1}.0.0-0`):(l("no pr"),o="0"===r?"0"===i?`>=${r}.${i}.${a}${n} <${r}.${i}.${+a+1}-0`:`>=${r}.${i}.${a}${n} <${r}.${+i+1}.0-0`:`>=${r}.${i}.${a} <${+r+1}.0.0-0`),l("caret return",o),o})},T=(e,t)=>(l("replaceXRanges",e,t),e.split(/\s+/).map(e=>R(e,t)).join(" ")),R=(e,t)=>{e=e.trim();let r=t.loose?d[c.XRANGELOOSE]:d[c.XRANGE];return e.replace(r,(r,n,i,a,s,o)=>{l("xRange",e,r,n,i,a,s,o);let u=K(i),d=u||K(a),c=d||K(s);return"="===n&&c&&(n=""),o=t.includePrerelease?"-0":"",u?r=">"===n||"<"===n?"<0.0.0-0":"*":n&&c?(d&&(a=0),s=0,">"===n?(n=">=",d?(i=+i+1,a=0):a=+a+1,s=0):"<="===n&&(n="<",d?i=+i+1:a=+a+1),"<"===n&&(o="-0"),r=`${n+i}.${a}.${s}${o}`):d?r=`>=${i}.0.0${o} <${+i+1}.0.0-0`:c&&(r=`>=${i}.${a}.0${o} <${i}.${+a+1}.0-0`),l("xRange return",r),r})},j=(e,t)=>(l("replaceStars",e,t),e.trim().replace(d[c.STAR],"")),k=(e,t)=>(l("replaceGTE0",e,t),e.trim().replace(d[t.includePrerelease?c.GTE0PRE:c.GTE0],"")),A=e=>(t,r,n,i,a,s,o,l,u,d,c,h)=>(r=K(n)?"":K(i)?`>=${n}.0.0${e?"-0":""}`:K(a)?`>=${n}.${i}.0${e?"-0":""}`:s?`>=${r}`:`>=${r}${e?"-0":""}`,l=K(u)?"":K(d)?`<${+u+1}.0.0-0`:K(c)?`<${u}.${+d+1}.0-0`:h?`<=${u}.${d}.${c}-${h}`:e?`<${u}.${d}.${+c+1}-0`:`<=${l}`,`${r} ${l}`.trim()),O=(e,t,r)=>{for(let r=0;r<e.length;r++)if(!e[r].test(t))return!1;if(t.prerelease.length&&!r.includePrerelease){for(let r=0;r<e.length;r++)if(l(e[r].semver),e[r].semver!==o.ANY&&e[r].semver.prerelease.length>0){let n=e[r].semver;if(n.major===t.major&&n.minor===t.minor&&n.patch===t.patch)return!0}return!1}return!0}},966042,(e,t,r)=>{"use strict";let n=Symbol("SemVer ANY");class i{static get ANY(){return n}constructor(e,t){if(t=a(t),e instanceof i)if(!!t.loose===e.loose)return e;else e=e.value;u("comparator",e=e.trim().split(/\s+/).join(" "),t),this.options=t,this.loose=!!t.loose,this.parse(e),this.semver===n?this.value="":this.value=this.operator+this.semver.version,u("comp",this)}parse(e){let t=this.options.loose?s[o.COMPARATORLOOSE]:s[o.COMPARATOR],r=e.match(t);if(!r)throw TypeError(`Invalid comparator: ${e}`);this.operator=void 0!==r[1]?r[1]:"","="===this.operator&&(this.operator=""),r[2]?this.semver=new d(r[2],this.options.loose):this.semver=n}toString(){return this.value}test(e){if(u("Comparator.test",e,this.options.loose),this.semver===n||e===n)return!0;if("string"==typeof e)try{e=new d(e,this.options)}catch(e){return!1}return l(e,this.operator,this.semver,this.options)}intersects(e,t){if(!(e instanceof i))throw TypeError("a Comparator is required");return""===this.operator?""===this.value||new c(e.value,t).test(this.value):""===e.operator?""===e.value||new c(this.value,t).test(e.semver):!((t=a(t)).includePrerelease&&("<0.0.0-0"===this.value||"<0.0.0-0"===e.value)||!t.includePrerelease&&(this.value.startsWith("<0.0.0")||e.value.startsWith("<0.0.0")))&&!!(this.operator.startsWith(">")&&e.operator.startsWith(">")||this.operator.startsWith("<")&&e.operator.startsWith("<")||this.semver.version===e.semver.version&&this.operator.includes("=")&&e.operator.includes("=")||l(this.semver,"<",e.semver,t)&&this.operator.startsWith(">")&&e.operator.startsWith("<")||l(this.semver,">",e.semver,t)&&this.operator.startsWith("<")&&e.operator.startsWith(">"))}}t.exports=i;let a=e.r(465263),{safeRe:s,t:o}=e.r(797526),l=e.r(611870),u=e.r(26575),d=e.r(975074),c=e.r(150353)},474477,(e,t,r)=>{"use strict";let n=e.r(150353);t.exports=(e,t,r)=>{try{t=new n(t,r)}catch(e){return!1}return t.test(e)}},762480,(e,t,r)=>{"use strict";let n=e.r(150353);t.exports=(e,t)=>new n(e,t).set.map(e=>e.map(e=>e.value).join(" ").trim().split(" "))},473388,(e,t,r)=>{"use strict";let n=e.r(975074),i=e.r(150353);t.exports=(e,t,r)=>{let a=null,s=null,o=null;try{o=new i(t,r)}catch(e){return null}return e.forEach(e=>{o.test(e)&&(!a||-1===s.compare(e))&&(s=new n(a=e,r))}),a}},337360,(e,t,r)=>{"use strict";let n=e.r(975074),i=e.r(150353);t.exports=(e,t,r)=>{let a=null,s=null,o=null;try{o=new i(t,r)}catch(e){return null}return e.forEach(e=>{o.test(e)&&(!a||1===s.compare(e))&&(s=new n(a=e,r))}),a}},453316,(e,t,r)=>{"use strict";let n=e.r(975074),i=e.r(150353),a=e.r(952184);t.exports=(e,t)=>{e=new i(e,t);let r=new n("0.0.0");if(e.test(r)||(r=new n("0.0.0-0"),e.test(r)))return r;r=null;for(let t=0;t<e.set.length;++t){let i=e.set[t],s=null;i.forEach(e=>{let t=new n(e.semver.version);switch(e.operator){case">":0===t.prerelease.length?t.patch++:t.prerelease.push(0),t.raw=t.format();case"":case">=":(!s||a(t,s))&&(s=t);break;case"<":case"<=":break;default:throw Error(`Unexpected operation: ${e.operator}`)}}),s&&(!r||a(r,s))&&(r=s)}return r&&e.test(r)?r:null}},299879,(e,t,r)=>{"use strict";let n=e.r(150353);t.exports=(e,t)=>{try{return new n(e,t).range||"*"}catch(e){return null}}},130280,(e,t,r)=>{"use strict";let n=e.r(975074),i=e.r(966042),{ANY:a}=i,s=e.r(150353),o=e.r(474477),l=e.r(952184),u=e.r(660312),d=e.r(266368),c=e.r(856172);t.exports=(e,t,r,h)=>{let p,m,f,y,b;switch(e=new n(e,h),t=new s(t,h),r){case">":p=l,m=d,f=u,y=">",b=">=";break;case"<":p=u,m=c,f=l,y="<",b="<=";break;default:throw TypeError('Must provide a hilo val of "<" or ">"')}if(o(e,t,h))return!1;for(let r=0;r<t.set.length;++r){let n=t.set[r],s=null,o=null;if(n.forEach(e=>{e.semver===a&&(e=new i(">=0.0.0")),s=s||e,o=o||e,p(e.semver,s.semver,h)?s=e:f(e.semver,o.semver,h)&&(o=e)}),s.operator===y||s.operator===b||(!o.operator||o.operator===y)&&m(e,o.semver)||o.operator===b&&f(e,o.semver))return!1}return!0}},246450,(e,t,r)=>{"use strict";let n=e.r(130280);t.exports=(e,t,r)=>n(e,t,">",r)},288445,(e,t,r)=>{"use strict";let n=e.r(130280);t.exports=(e,t,r)=>n(e,t,"<",r)},273698,(e,t,r)=>{"use strict";let n=e.r(150353);t.exports=(e,t,r)=>(e=new n(e,r),t=new n(t,r),e.intersects(t,r))},544552,(e,t,r)=>{"use strict";let n=e.r(474477),i=e.r(992293);t.exports=(e,t,r)=>{let a=[],s=null,o=null,l=e.sort((e,t)=>i(e,t,r));for(let e of l)n(e,t,r)?(o=e,s||(s=e)):(o&&a.push([s,o]),o=null,s=null);s&&a.push([s,null]);let u=[];for(let[e,t]of a)e===t?u.push(e):t||e!==l[0]?t?e===l[0]?u.push(`<=${t}`):u.push(`${e} - ${t}`):u.push(`>=${e}`):u.push("*");let d=u.join(" || "),c="string"==typeof t.raw?t.raw:String(t);return d.length<c.length?d:t}},407890,(e,t,r)=>{"use strict";let n=e.r(150353),i=e.r(966042),{ANY:a}=i,s=e.r(474477),o=e.r(992293),l=[new i(">=0.0.0-0")],u=[new i(">=0.0.0")],d=(e,t,r)=>{let n,i,d,p,m,f,y;if(e===t)return!0;if(1===e.length&&e[0].semver===a)if(1===t.length&&t[0].semver===a)return!0;else e=r.includePrerelease?l:u;if(1===t.length&&t[0].semver===a)if(r.includePrerelease)return!0;else t=u;let b=new Set;for(let t of e)">"===t.operator||">="===t.operator?n=c(n,t,r):"<"===t.operator||"<="===t.operator?i=h(i,t,r):b.add(t.semver);if(b.size>1)return null;if(n&&i&&((d=o(n.semver,i.semver,r))>0||0===d&&(">="!==n.operator||"<="!==i.operator)))return null;for(let e of b){if(n&&!s(e,String(n),r)||i&&!s(e,String(i),r))return null;for(let n of t)if(!s(e,String(n),r))return!1;return!0}let g=!!i&&!r.includePrerelease&&!!i.semver.prerelease.length&&i.semver,v=!!n&&!r.includePrerelease&&!!n.semver.prerelease.length&&n.semver;for(let e of(g&&1===g.prerelease.length&&"<"===i.operator&&0===g.prerelease[0]&&(g=!1),t)){if(y=y||">"===e.operator||">="===e.operator,f=f||"<"===e.operator||"<="===e.operator,n){if(v&&e.semver.prerelease&&e.semver.prerelease.length&&e.semver.major===v.major&&e.semver.minor===v.minor&&e.semver.patch===v.patch&&(v=!1),">"===e.operator||">="===e.operator){if((p=c(n,e,r))===e&&p!==n)return!1}else if(">="===n.operator&&!s(n.semver,String(e),r))return!1}if(i){if(g&&e.semver.prerelease&&e.semver.prerelease.length&&e.semver.major===g.major&&e.semver.minor===g.minor&&e.semver.patch===g.patch&&(g=!1),"<"===e.operator||"<="===e.operator){if((m=h(i,e,r))===e&&m!==i)return!1}else if("<="===i.operator&&!s(i.semver,String(e),r))return!1}if(!e.operator&&(i||n)&&0!==d)return!1}return(!n||!f||!!i||0===d)&&(!i||!y||!!n||0===d)&&!v&&!g&&!0},c=(e,t,r)=>{if(!e)return t;let n=o(e.semver,t.semver,r);return n>0?e:n<0||">"===t.operator&&">="===e.operator?t:e},h=(e,t,r)=>{if(!e)return t;let n=o(e.semver,t.semver,r);return n<0?e:n>0||"<"===t.operator&&"<="===e.operator?t:e};t.exports=(e,t,r={})=>{if(e===t)return!0;e=new n(e,r),t=new n(t,r);let i=!1;e:for(let n of e.set){for(let e of t.set){let t=d(n,e,r);if(i=i||null!==t,t)continue e}if(i)return!1}return!0}},28005,(e,t,r)=>{"use strict";let n=e.r(797526),i=e.r(250281),a=e.r(975074),s=e.r(845505),o=e.r(62429),l=e.r(328152),u=e.r(9209),d=e.r(364775),c=e.r(620486),h=e.r(923156),p=e.r(193356),m=e.r(504749),f=e.r(417576),y=e.r(992293),b=e.r(151369),g=e.r(573091),v=e.r(743643),E=e.r(590165),K=e.r(254780),S=e.r(952184),I=e.r(660312),w=e.r(977335),x=e.r(712792),T=e.r(856172),R=e.r(266368),j=e.r(611870),k=e.r(283209),A=e.r(966042),O=e.r(150353),D=e.r(474477),C=e.r(762480),P=e.r(473388),_=e.r(337360),M=e.r(453316),N=e.r(299879),L=e.r(130280),J=e.r(246450),F=e.r(288445),G=e.r(273698);t.exports={parse:o,valid:l,clean:u,inc:d,diff:c,major:h,minor:p,patch:m,prerelease:f,compare:y,rcompare:b,compareLoose:g,compareBuild:v,sort:E,rsort:K,gt:S,lt:I,eq:w,neq:x,gte:T,lte:R,cmp:j,coerce:k,Comparator:A,Range:O,satisfies:D,toComparators:C,maxSatisfying:P,minSatisfying:_,minVersion:M,validRange:N,outside:L,gtr:J,ltr:F,intersects:G,simplifyRange:e.r(544552),subset:e.r(407890),SemVer:a,re:n.re,src:n.src,tokens:n.t,SEMVER_SPEC_VERSION:i.SEMVER_SPEC_VERSION,RELEASE_TYPES:i.RELEASE_TYPES,compareIdentifiers:s.compareIdentifiers,rcompareIdentifiers:s.rcompareIdentifiers}},900040,(e,t,r)=>{"use strict";let n=()=>"linux"===process.platform,i=null;t.exports={isLinux:n,getReport:()=>{if(!i)if(n()&&process.report){let e=process.report.excludeNetwork;process.report.excludeNetwork=!0,i=process.report.getReport(),process.report.excludeNetwork=e}else i={};return i}}},138654,(e,t,r)=>{"use strict";let n=e.r(522734);t.exports={LDD_PATH:"/usr/bin/ldd",SELF_PATH:"/proc/self/exe",readFileSync:e=>{let t=n.openSync(e,"r"),r=Buffer.alloc(2048),i=n.readSync(t,r,0,2048,0);return n.close(t,()=>{}),r.subarray(0,i)},readFile:e=>new Promise((t,r)=>{n.open(e,"r",(e,i)=>{if(e)r(e);else{let e=Buffer.alloc(2048);n.read(i,e,0,2048,0,(r,a)=>{t(e.subarray(0,a)),n.close(i,()=>{})})}})})}},415464,(e,t,r)=>{"use strict";t.exports={interpreterPath:e=>{if(e.length<64||0x7f454c46!==e.readUInt32BE(0)||2!==e.readUInt8(4)||1!==e.readUInt8(5))return null;let t=e.readUInt32LE(32),r=e.readUInt16LE(54),n=e.readUInt16LE(56);for(let i=0;i<n;i++){let n=t+i*r;if(3===e.readUInt32LE(n)){let t=e.readUInt32LE(n+8),r=e.readUInt32LE(n+32);return e.subarray(t,t+r).toString().replace(/\0.*$/g,"")}}return null}}},990266,(e,t,r)=>{"use strict";let n,i,a,s=e.r(233405),{isLinux:o,getReport:l}=e.r(900040),{LDD_PATH:u,SELF_PATH:d,readFile:c,readFileSync:h}=e.r(138654),{interpreterPath:p}=e.r(415464),m="getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true",f="",y=()=>f||new Promise(e=>{s.exec(m,(t,r)=>{e(f=t?" ":r)})}),b=()=>{if(!f)try{f=s.execSync(m,{encoding:"utf8"})}catch(e){f=" "}return f},g="glibc",v=/LIBC[a-z0-9 \-).]*?(\d+\.\d+)/i,E="musl",K=e=>e.includes("libc.musl-")||e.includes("ld-musl-"),S=()=>{let e=l();return e.header&&e.header.glibcVersionRuntime?g:Array.isArray(e.sharedObjects)&&e.sharedObjects.some(K)?E:null},I=e=>{let[t,r]=e.split(/[\r\n]+/);return t&&t.includes(g)?g:r&&r.includes(E)?E:null},w=e=>{if(e){if(e.includes("/ld-musl-"))return E;else if(e.includes("/ld-linux-"))return g}return null},x=e=>(e=e.toString()).includes("musl")?E:e.includes("GNU C Library")?g:null,T=async()=>{if(void 0!==i)return i;i=null;try{let e=await c(u);i=x(e)}catch(e){}return i},R=async()=>{if(void 0!==n)return n;n=null;try{let e=await c(d),t=p(e);n=w(t)}catch(e){}return n},j=async()=>{let e=null;return o()&&((e=await R())||((e=await T())||(e=S()),e||(e=I(await y())))),e},k=()=>{let e=null;return o()&&((e=(()=>{if(void 0!==n)return n;n=null;try{let e=h(d),t=p(e);n=w(t)}catch(e){}return n})())||((e=(()=>{if(void 0!==i)return i;i=null;try{let e=h(u);i=x(e)}catch(e){}return i})())||(e=S()),e||(e=I(b())))),e},A=async()=>o()&&await j()!==g,O=async()=>{if(void 0!==a)return a;a=null;try{let e=(await c(u)).match(v);e&&(a=e[1])}catch(e){}return a},D=()=>{let e=l();return e.header&&e.header.glibcVersionRuntime?e.header.glibcVersionRuntime:null},C=e=>e.trim().split(/\s+/)[1],P=e=>{let[t,r,n]=e.split(/[\r\n]+/);return t&&t.includes(g)?C(t):r&&n&&r.includes(E)?C(n):null};t.exports={GLIBC:g,MUSL:E,family:j,familySync:k,isNonGlibcLinux:A,isNonGlibcLinuxSync:()=>o()&&k()!==g,version:async()=>{let e=null;return o()&&((e=await O())||(e=D()),e||(e=P(await y()))),e},versionSync:()=>{let e=null;return o()&&((e=(()=>{if(void 0!==a)return a;a=null;try{let e=h(u).match(v);e&&(a=e[1])}catch(e){}return a})())||(e=D()),e||(e=P(b()))),e}}},844285,(e,t,r)=>{var n=e.r(522734),i=e.r(814747),a=e.r(792509),s=e.r(446786),o="function"==typeof __webpack_require__?__non_webpack_require__:e.t,l=process.config&&process.config.variables||{},u=!!process.env.PREBUILDS_ONLY,d=process.versions,c=d.modules;(d.deno||process.isBun)&&(c="unsupported");var h=process.versions&&process.versions.electron||process.env.ELECTRON_RUN_AS_NODE?"electron":process.versions&&process.versions.nw?"node-webkit":"node",p=process.env.npm_config_arch||s.arch(),m=process.env.npm_config_platform||s.platform(),f=process.env.LIBC||(!function(t){if("linux"!==t)return!1;let{familySync:r,MUSL:n}=e.r(990266);return r()===n}(m)?"glibc":"musl"),y=process.env.ARM_VERSION||("arm64"===p?"8":l.arm_version)||"",b=(d.uv||"").split(".")[0];function g(e){return o(g.resolve(e))}function v(e){try{return n.readdirSync(e)}catch(e){return[]}}function E(e,t){var r=v(e).filter(t);return r[0]&&i.join(e,r[0])}function K(e){return/\.node$/.test(e)}function S(e){var t=e.split("-");if(2===t.length){var r=t[0],n=t[1].split("+");if(r&&n.length&&n.every(Boolean))return{name:e,platform:r,architectures:n}}}function I(e,t){return function(r){return null!=r&&r.platform===e&&r.architectures.includes(t)}}function w(e,t){return e.architectures.length-t.architectures.length}function x(e){var t=e.split("."),r=t.pop(),n={file:e,specificity:0};if("node"===r){for(var i=0;i<t.length;i++){var a=t[i];if("node"===a||"electron"===a||"node-webkit"===a)n.runtime=a;else if("napi"===a)n.napi=!0;else if("abi"===a.slice(0,3))n.abi=a.slice(3);else if("uv"===a.slice(0,2))n.uv=a.slice(2);else if("armv"===a.slice(0,4))n.armv=a.slice(4);else{if("glibc"!==a&&"musl"!==a)continue;n.libc=a}n.specificity++}return n}}function T(e,t){return function(r){var n;return null!=r&&(r.runtime===e||!!("node"===(n=r).runtime&&n.napi))&&(r.abi===t||!!r.napi)&&(!r.uv||r.uv===b)&&(!r.armv||r.armv===y)&&(!r.libc||r.libc===f)&&!0}}function R(e){return function(t,r){return t.runtime!==r.runtime?t.runtime===e?-1:1:t.abi!==r.abi?t.abi?-1:1:t.specificity!==r.specificity?t.specificity>r.specificity?-1:1:0}}t.exports=g,g.resolve=g.path=function(t){t=i.resolve(t||".");var r,n,s="";try{var l=(s=o(i.join(t,"package.json")).name).toUpperCase().replace(/-/g,"_");process.env[l+"_PREBUILD"]&&(t=process.env[l+"_PREBUILD"])}catch(e){r=e}if(!u){var d=E(i.join(t,"build/Release"),K);if(d)return d;var g=E(i.join(t,"build/Debug"),K);if(g)return g}var j=C(t);if(j)return j;var k=C(i.dirname(process.execPath));if(k)return k;var A=("@"==s[0]?"":"@"+s+"/")+s+"-"+m+"-"+p;try{var O=i.dirname(e.r(362562).createRequire(a.pathToFileURL(i.join(t,"package.json"))).resolve(A));return P(O)}catch(e){n=e}let D="No native build was found for "+["platform="+m,"arch="+p,"runtime="+h,"abi="+c,"uv="+b,y?"armv="+y:"","libc="+f,"node="+process.versions.node,process.versions.electron?"electron="+process.versions.electron:"","function"==typeof __webpack_require__?"webpack=true":""].filter(Boolean).join(" ")+"\n    attempted loading from: "+t+" and package: "+A+"\n";throw r&&(D+="Error finding package.json: "+r.message+"\n"),n&&(D+="Error resolving package: "+n.message+"\n"),Error(D);function C(e){var t=v(i.join(e,"prebuilds")).map(S).filter(I(m,p)).sort(w)[0];if(t)return P(i.join(e,"prebuilds",t.name))}function P(e){var t=v(e).map(x).filter(T(h,c)).sort(R(h))[0];if(t)return i.join(e,t.file)}},g.parseTags=x,g.matchTags=T,g.compareTags=R,g.parseTuple=S,g.matchTuple=I,g.compareTuples=w},183572,(e,t,r)=>{let n="function"==typeof __webpack_require__?__non_webpack_require__:e.t;"function"==typeof n.addon?t.exports=n.addon.bind(n):t.exports=e.r(844285)},139510,(e,t,r)=>{t.exports=e.r(183572)("/ROOT/node_modules/msgpackr-extract")},662470,(e,t,r)=>{"use strict";let n;Object.defineProperty(r,"__esModule",{value:!0});class i extends Error{}class a extends i{constructor(e){super(`Invalid DateTime: ${e.toMessage()}`)}}class s extends i{constructor(e){super(`Invalid Interval: ${e.toMessage()}`)}}class o extends i{constructor(e){super(`Invalid Duration: ${e.toMessage()}`)}}class l extends i{}class u extends i{constructor(e){super(`Invalid unit ${e}`)}}class d extends i{}class c extends i{constructor(){super("Zone is an abstract class")}}let h="numeric",p="short",m="long",f={year:h,month:h,day:h},y={year:h,month:p,day:h},b={year:h,month:p,day:h,weekday:p},g={year:h,month:m,day:h},v={year:h,month:m,day:h,weekday:m},E={hour:h,minute:h},K={hour:h,minute:h,second:h},S={hour:h,minute:h,second:h,timeZoneName:p},I={hour:h,minute:h,second:h,timeZoneName:m},w={hour:h,minute:h,hourCycle:"h23"},x={hour:h,minute:h,second:h,hourCycle:"h23"},T={hour:h,minute:h,second:h,hourCycle:"h23",timeZoneName:p},R={hour:h,minute:h,second:h,hourCycle:"h23",timeZoneName:m},j={year:h,month:h,day:h,hour:h,minute:h},k={year:h,month:h,day:h,hour:h,minute:h,second:h},A={year:h,month:p,day:h,hour:h,minute:h},O={year:h,month:p,day:h,hour:h,minute:h,second:h},D={year:h,month:p,day:h,weekday:p,hour:h,minute:h},C={year:h,month:m,day:h,hour:h,minute:h,timeZoneName:p},P={year:h,month:m,day:h,hour:h,minute:h,second:h,timeZoneName:p},_={year:h,month:m,day:h,weekday:m,hour:h,minute:h,timeZoneName:m},M={year:h,month:m,day:h,weekday:m,hour:h,minute:h,second:h,timeZoneName:m};class N{get type(){throw new c}get name(){throw new c}get ianaName(){return this.name}get isUniversal(){throw new c}offsetName(e,t){throw new c}formatOffset(e,t){throw new c}offset(e){throw new c}equals(e){throw new c}get isValid(){throw new c}}let L=null;class J extends N{static get instance(){return null===L&&(L=new J),L}get type(){return"system"}get name(){return new Intl.DateTimeFormat().resolvedOptions().timeZone}get isUniversal(){return!1}offsetName(e,{format:t,locale:r}){return e4(e,t,r)}formatOffset(e,t){return e8(this.offset(e),t)}offset(e){return-new Date(e).getTimezoneOffset()}equals(e){return"system"===e.type}get isValid(){return!0}}let F=new Map,G={year:0,month:1,day:2,era:3,hour:4,minute:5,second:6},V=new Map;class q extends N{static create(e){let t=V.get(e);return void 0===t&&V.set(e,t=new q(e)),t}static resetCache(){V.clear(),F.clear()}static isValidSpecifier(e){return this.isValidZone(e)}static isValidZone(e){if(!e)return!1;try{return new Intl.DateTimeFormat("en-US",{timeZone:e}).format(),!0}catch(e){return!1}}constructor(e){super(),this.zoneName=e,this.valid=q.isValidZone(e)}get type(){return"iana"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(e,{format:t,locale:r}){return e4(e,t,r,this.name)}formatOffset(e,t){return e8(this.offset(e),t)}offset(e){var t;let r;if(!this.valid)return NaN;let n=new Date(e);if(isNaN(n))return NaN;let i=(t=this.name,void 0===(r=F.get(t))&&(r=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",era:"short"}),F.set(t,r)),r),[a,s,o,l,u,d,c]=i.formatToParts?function(e,t){let r=e.formatToParts(t),n=[];for(let e=0;e<r.length;e++){let{type:t,value:i}=r[e],a=G[t];"era"===t?n[a]=i:eN(a)||(n[a]=parseInt(i,10))}return n}(i,n):function(e,t){let r=e.format(t).replace(/\u200E/g,""),[,n,i,a,s,o,l,u]=/(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(r);return[a,n,i,s,o,l,u]}(i,n);"BC"===l&&(a=-Math.abs(a)+1);let h=e0({year:a,month:s,day:o,hour:24===u?0:u,minute:d,second:c,millisecond:0}),p=+n,m=p%1e3;return(h-(p-=m>=0?m:1e3+m))/6e4}equals(e){return"iana"===e.type&&e.name===this.name}get isValid(){return this.valid}}let Y={},B=new Map;function U(e,t={}){let r=JSON.stringify([e,t]),n=B.get(r);return void 0===n&&(n=new Intl.DateTimeFormat(e,t),B.set(r,n)),n}let $=new Map,W=new Map,H=null,z=new Map;function X(e){let t=z.get(e);return void 0===t&&(t=new Intl.DateTimeFormat(e).resolvedOptions(),z.set(e,t)),t}let Q=new Map;function Z(e,t,r,n){let i=e.listingMode();return"error"===i?null:"en"===i?r(t):n(t)}class ee{constructor(e,t,r){this.padTo=r.padTo||0,this.floor=r.floor||!1;const{padTo:n,floor:i,...a}=r;if(!t||Object.keys(a).length>0){const t={useGrouping:!1,...r};r.padTo>0&&(t.minimumIntegerDigits=r.padTo),this.inf=function(e,t={}){let r=JSON.stringify([e,t]),n=$.get(r);return void 0===n&&(n=new Intl.NumberFormat(e,t),$.set(r,n)),n}(e,t)}}format(e){if(!this.inf)return eU(this.floor?Math.floor(e):ez(e,3),this.padTo);{let t=this.floor?Math.floor(e):e;return this.inf.format(t)}}}class et{constructor(e,t,r){let n;if(this.opts=r,this.originalZone=void 0,this.opts.timeZone)this.dt=e;else if("fixed"===e.zone.type){const t=-1*(e.offset/60),r=t>=0?`Etc/GMT+${t}`:`Etc/GMT${t}`;0!==e.offset&&q.create(r).valid?(n=r,this.dt=e):(n="UTC",this.dt=0===e.offset?e:e.setZone("UTC").plus({minutes:e.offset}),this.originalZone=e.zone)}else"system"===e.zone.type?this.dt=e:"iana"===e.zone.type?(this.dt=e,n=e.zone.name):(n="UTC",this.dt=e.setZone("UTC").plus({minutes:e.offset}),this.originalZone=e.zone);const i={...this.opts};i.timeZone=i.timeZone||n,this.dtf=U(t,i)}format(){return this.originalZone?this.formatToParts().map(({value:e})=>e).join(""):this.dtf.format(this.dt.toJSDate())}formatToParts(){let e=this.dtf.formatToParts(this.dt.toJSDate());return this.originalZone?e.map(e=>{if("timeZoneName"!==e.type)return e;{let t=this.originalZone.offsetName(this.dt.ts,{locale:this.dt.locale,format:this.opts.timeZoneName});return{...e,value:t}}}):e}resolvedOptions(){return this.dtf.resolvedOptions()}}class er{constructor(e,t,r){this.opts={style:"long",...r},!t&&eF()&&(this.rtf=function(e,t={}){let{base:r,...n}=t,i=JSON.stringify([e,n]),a=W.get(i);return void 0===a&&(a=new Intl.RelativeTimeFormat(e,t),W.set(i,a)),a}(e,r))}format(e,t){return this.rtf?this.rtf.format(e,t):function(e,t,r="always",n=!1){let i={years:["year","yr."],quarters:["quarter","qtr."],months:["month","mo."],weeks:["week","wk."],days:["day","day","days"],hours:["hour","hr."],minutes:["minute","min."],seconds:["second","sec."]},a=-1===["hours","minutes","seconds"].indexOf(e);if("auto"===r&&a){let r="days"===e;switch(t){case 1:return r?"tomorrow":`next ${i[e][0]}`;case -1:return r?"yesterday":`last ${i[e][0]}`;case 0:return r?"today":`this ${i[e][0]}`}}let s=Object.is(t,-0)||t<0,o=Math.abs(t),l=1===o,u=i[e],d=n?l?u[1]:u[2]||u[1]:l?i[e][0]:e;return s?`${o} ${d} ago`:`in ${o} ${d}`}(t,e,this.opts.numeric,"long"!==this.opts.style)}formatToParts(e,t){return this.rtf?this.rtf.formatToParts(e,t):[]}}let en={firstDay:1,minimalDays:4,weekend:[6,7]};class ei{static fromOpts(e){return ei.create(e.locale,e.numberingSystem,e.outputCalendar,e.weekSettings,e.defaultToEN)}static create(e,t,r,n,i=!1){let a=e||eS.defaultLocale;return new ei(a||(i?"en-US":H||(H=new Intl.DateTimeFormat().resolvedOptions().locale)),t||eS.defaultNumberingSystem,r||eS.defaultOutputCalendar,eY(n)||eS.defaultWeekSettings,a)}static resetCache(){H=null,B.clear(),$.clear(),W.clear(),z.clear(),Q.clear()}static fromObject({locale:e,numberingSystem:t,outputCalendar:r,weekSettings:n}={}){return ei.create(e,t,r,n)}constructor(e,t,r,n,i){const[a,s,o]=function(e){let t=e.indexOf("-x-");-1!==t&&(e=e.substring(0,t));let r=e.indexOf("-u-");if(-1===r)return[e];{let t,n;try{t=U(e).resolvedOptions(),n=e}catch(a){let i=e.substring(0,r);t=U(i).resolvedOptions(),n=i}let{numberingSystem:i,calendar:a}=t;return[n,i,a]}}(e);this.locale=a,this.numberingSystem=t||s||null,this.outputCalendar=r||o||null,this.weekSettings=n,this.intl=function(e,t,r){return(r||t)&&(e.includes("-u-")||(e+="-u"),r&&(e+=`-ca-${r}`),t&&(e+=`-nu-${t}`)),e}(this.locale,this.numberingSystem,this.outputCalendar),this.weekdaysCache={format:{},standalone:{}},this.monthsCache={format:{},standalone:{}},this.meridiemCache=null,this.eraCache={},this.specifiedLocale=i,this.fastNumbersCached=null}get fastNumbers(){return null==this.fastNumbersCached&&(this.fastNumbersCached=(!this.numberingSystem||"latn"===this.numberingSystem)&&("latn"===this.numberingSystem||!this.locale||this.locale.startsWith("en")||"latn"===X(this.locale).numberingSystem)),this.fastNumbersCached}listingMode(){let e=this.isEnglish(),t=(null===this.numberingSystem||"latn"===this.numberingSystem)&&(null===this.outputCalendar||"gregory"===this.outputCalendar);return e&&t?"en":"intl"}clone(e){return e&&0!==Object.getOwnPropertyNames(e).length?ei.create(e.locale||this.specifiedLocale,e.numberingSystem||this.numberingSystem,e.outputCalendar||this.outputCalendar,eY(e.weekSettings)||this.weekSettings,e.defaultToEN||!1):this}redefaultToEN(e={}){return this.clone({...e,defaultToEN:!0})}redefaultToSystem(e={}){return this.clone({...e,defaultToEN:!1})}months(e,t=!1){return Z(this,e,tn,()=>{let r="ja"===this.intl||this.intl.startsWith("ja-"),n=(t&=!r)?{month:e,day:"numeric"}:{month:e},i=t?"format":"standalone";if(!this.monthsCache[i][e]){let t=r?e=>this.dtFormatter(e,n).format():e=>this.extract(e,n,"month");this.monthsCache[i][e]=function(e){let t=[];for(let r=1;r<=12;r++){let n=rW.utc(2009,r,1);t.push(e(n))}return t}(t)}return this.monthsCache[i][e]})}weekdays(e,t=!1){return Z(this,e,to,()=>{let r=t?{weekday:e,year:"numeric",month:"long",day:"numeric"}:{weekday:e},n=t?"format":"standalone";return this.weekdaysCache[n][e]||(this.weekdaysCache[n][e]=function(e){let t=[];for(let r=1;r<=7;r++){let n=rW.utc(2016,11,13+r);t.push(e(n))}return t}(e=>this.extract(e,r,"weekday"))),this.weekdaysCache[n][e]})}meridiems(){return Z(this,void 0,()=>tl,()=>{if(!this.meridiemCache){let e={hour:"numeric",hourCycle:"h12"};this.meridiemCache=[rW.utc(2016,11,13,9),rW.utc(2016,11,13,19)].map(t=>this.extract(t,e,"dayperiod"))}return this.meridiemCache})}eras(e){return Z(this,e,th,()=>{let t={era:e};return this.eraCache[e]||(this.eraCache[e]=[rW.utc(-40,1,1),rW.utc(2017,1,1)].map(e=>this.extract(e,t,"era"))),this.eraCache[e]})}extract(e,t,r){let n=this.dtFormatter(e,t).formatToParts().find(e=>e.type.toLowerCase()===r);return n?n.value:null}numberFormatter(e={}){return new ee(this.intl,e.forceSimple||this.fastNumbers,e)}dtFormatter(e,t={}){return new et(e,this.intl,t)}relFormatter(e={}){return new er(this.intl,this.isEnglish(),e)}listFormatter(e={}){return function(e,t={}){let r=JSON.stringify([e,t]),n=Y[r];return n||(n=new Intl.ListFormat(e,t),Y[r]=n),n}(this.intl,e)}isEnglish(){return"en"===this.locale||"en-us"===this.locale.toLowerCase()||X(this.intl).locale.startsWith("en-us")}getWeekSettings(){if(this.weekSettings)return this.weekSettings;if(!eG())return en;var e=this.locale;let t=Q.get(e);if(!t){let r=new Intl.Locale(e);"minimalDays"in(t="getWeekInfo"in r?r.getWeekInfo():r.weekInfo)||(t={...en,...t}),Q.set(e,t)}return t}getStartOfWeek(){return this.getWeekSettings().firstDay}getMinDaysInFirstWeek(){return this.getWeekSettings().minimalDays}getWeekendDays(){return this.getWeekSettings().weekend}equals(e){return this.locale===e.locale&&this.numberingSystem===e.numberingSystem&&this.outputCalendar===e.outputCalendar}toString(){return`Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`}}let ea=null;class es extends N{static get utcInstance(){return null===ea&&(ea=new es(0)),ea}static instance(e){return 0===e?es.utcInstance:new es(e)}static parseSpecifier(e){if(e){let t=e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);if(t)return new es(e6(t[1],t[2]))}return null}constructor(e){super(),this.fixed=e}get type(){return"fixed"}get name(){return 0===this.fixed?"UTC":`UTC${e8(this.fixed,"narrow")}`}get ianaName(){return 0===this.fixed?"Etc/UTC":`Etc/GMT${e8(-this.fixed,"narrow")}`}offsetName(){return this.name}formatOffset(e,t){return e8(this.fixed,t)}get isUniversal(){return!0}offset(){return this.fixed}equals(e){return"fixed"===e.type&&e.fixed===this.fixed}get isValid(){return!0}}class eo extends N{constructor(e){super(),this.zoneName=e}get type(){return"invalid"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(){return null}formatOffset(){return""}offset(){return NaN}equals(){return!1}get isValid(){return!1}}function el(e,t){if(eN(e)||null===e)return t;if(e instanceof N)return e;if("string"==typeof e){let r=e.toLowerCase();return"default"===r?t:"local"===r||"system"===r?J.instance:"utc"===r||"gmt"===r?es.utcInstance:es.parseSpecifier(r)||q.create(e)}if(eL(e))return es.instance(e);if("object"==typeof e&&"offset"in e&&"function"==typeof e.offset)return e;else return new eo(e)}let eu={arab:"[٠-٩]",arabext:"[۰-۹]",bali:"[᭐-᭙]",beng:"[০-৯]",deva:"[०-९]",fullwide:"[０-９]",gujr:"[૦-૯]",hanidec:"[〇|一|二|三|四|五|六|七|八|九]",khmr:"[០-៩]",knda:"[೦-೯]",laoo:"[໐-໙]",limb:"[᥆-᥏]",mlym:"[൦-൯]",mong:"[᠐-᠙]",mymr:"[၀-၉]",orya:"[୦-୯]",tamldec:"[௦-௯]",telu:"[౦-౯]",thai:"[๐-๙]",tibt:"[༠-༩]",latn:"\\d"},ed={arab:[1632,1641],arabext:[1776,1785],bali:[6992,7001],beng:[2534,2543],deva:[2406,2415],fullwide:[65296,65303],gujr:[2790,2799],khmr:[6112,6121],knda:[3302,3311],laoo:[3792,3801],limb:[6470,6479],mlym:[3430,3439],mong:[6160,6169],mymr:[4160,4169],orya:[2918,2927],tamldec:[3046,3055],telu:[3174,3183],thai:[3664,3673],tibt:[3872,3881]},ec=eu.hanidec.replace(/[\[|\]]/g,"").split(""),eh=new Map;function ep({numberingSystem:e},t=""){let r=e||"latn",n=eh.get(r);void 0===n&&(n=new Map,eh.set(r,n));let i=n.get(t);return void 0===i&&(i=RegExp(`${eu[r]}${t}`),n.set(t,i)),i}let em=()=>Date.now(),ef="system",ey=null,eb=null,eg=null,ev=60,eE,eK=null;class eS{static get now(){return em}static set now(e){em=e}static set defaultZone(e){ef=e}static get defaultZone(){return el(ef,J.instance)}static get defaultLocale(){return ey}static set defaultLocale(e){ey=e}static get defaultNumberingSystem(){return eb}static set defaultNumberingSystem(e){eb=e}static get defaultOutputCalendar(){return eg}static set defaultOutputCalendar(e){eg=e}static get defaultWeekSettings(){return eK}static set defaultWeekSettings(e){eK=eY(e)}static get twoDigitCutoffYear(){return ev}static set twoDigitCutoffYear(e){ev=e%100}static get throwOnInvalid(){return eE}static set throwOnInvalid(e){eE=e}static resetCaches(){ei.resetCache(),q.resetCache(),rW.resetCache(),eh.clear()}}class eI{constructor(e,t){this.reason=e,this.explanation=t}toMessage(){return this.explanation?`${this.reason}: ${this.explanation}`:this.reason}}let ew=[0,31,59,90,120,151,181,212,243,273,304,334],ex=[0,31,60,91,121,152,182,213,244,274,305,335];function eT(e,t){return new eI("unit out of range",`you specified ${t} (of type ${typeof t}) as a ${e}, which is invalid`)}function eR(e,t,r){let n=new Date(Date.UTC(e,t-1,r));e<100&&e>=0&&n.setUTCFullYear(n.getUTCFullYear()-1900);let i=n.getUTCDay();return 0===i?7:i}function ej(e,t){let r=eX(e)?ex:ew,n=r.findIndex(e=>e<t),i=t-r[n];return{month:n+1,day:i}}function ek(e,t){return(e-t+7)%7+1}function eA(e,t=4,r=1){let{year:n,month:i,day:a}=e,s=a+(eX(n)?ex:ew)[i-1],o=ek(eR(n,i,a),r),l=Math.floor((s-o+14-t)/7),u;return l<1?l=e2(u=n-1,t,r):l>e2(n,t,r)?(u=n+1,l=1):u=n,{weekYear:u,weekNumber:l,weekday:o,...e7(e)}}function eO(e,t=4,r=1){let{weekYear:n,weekNumber:i,weekday:a}=e,s=ek(eR(n,1,t),r),o=eQ(n),l=7*i+a-s-7+t,u;l<1?l+=eQ(u=n-1):l>o?(u=n+1,l-=eQ(n)):u=n;let{month:d,day:c}=ej(u,l);return{year:u,month:d,day:c,...e7(e)}}function eD(e){let{year:t,month:r,day:n}=e,i=n+(eX(t)?ex:ew)[r-1];return{year:t,ordinal:i,...e7(e)}}function eC(e){let{year:t,ordinal:r}=e,{month:n,day:i}=ej(t,r);return{year:t,month:n,day:i,...e7(e)}}function eP(e,t){if(!(!eN(e.localWeekday)||!eN(e.localWeekNumber)||!eN(e.localWeekYear)))return{minDaysInFirstWeek:4,startOfWeek:1};if(!eN(e.weekday)||!eN(e.weekNumber)||!eN(e.weekYear))throw new l("Cannot mix locale-based week fields with ISO-based week fields");return eN(e.localWeekday)||(e.weekday=e.localWeekday),eN(e.localWeekNumber)||(e.weekNumber=e.localWeekNumber),eN(e.localWeekYear)||(e.weekYear=e.localWeekYear),delete e.localWeekday,delete e.localWeekNumber,delete e.localWeekYear,{minDaysInFirstWeek:t.getMinDaysInFirstWeek(),startOfWeek:t.getStartOfWeek()}}function e_(e){let t=eJ(e.year),r=eB(e.month,1,12),n=eB(e.day,1,eZ(e.year,e.month));return t?r?!n&&eT("day",e.day):eT("month",e.month):eT("year",e.year)}function eM(e){let{hour:t,minute:r,second:n,millisecond:i}=e,a=eB(t,0,23)||24===t&&0===r&&0===n&&0===i,s=eB(r,0,59),o=eB(n,0,59),l=eB(i,0,999);return a?s?o?!l&&eT("millisecond",i):eT("second",n):eT("minute",r):eT("hour",t)}function eN(e){return void 0===e}function eL(e){return"number"==typeof e}function eJ(e){return"number"==typeof e&&e%1==0}function eF(){try{return"u">typeof Intl&&!!Intl.RelativeTimeFormat}catch(e){return!1}}function eG(){try{return"u">typeof Intl&&!!Intl.Locale&&("weekInfo"in Intl.Locale.prototype||"getWeekInfo"in Intl.Locale.prototype)}catch(e){return!1}}function eV(e,t,r){if(0!==e.length)return e.reduce((e,n)=>{let i=[t(n),n];return e&&r(e[0],i[0])===e[0]?e:i},null)[1]}function eq(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function eY(e){if(null==e)return null;if("object"!=typeof e)throw new d("Week settings must be an object");if(!eB(e.firstDay,1,7)||!eB(e.minimalDays,1,7)||!Array.isArray(e.weekend)||e.weekend.some(e=>!eB(e,1,7)))throw new d("Invalid week settings");return{firstDay:e.firstDay,minimalDays:e.minimalDays,weekend:Array.from(e.weekend)}}function eB(e,t,r){return eJ(e)&&e>=t&&e<=r}function eU(e,t=2){return e<0?"-"+(""+-e).padStart(t,"0"):(""+e).padStart(t,"0")}function e$(e){if(!eN(e)&&null!==e&&""!==e)return parseInt(e,10)}function eW(e){if(!eN(e)&&null!==e&&""!==e)return parseFloat(e)}function eH(e){if(!eN(e)&&null!==e&&""!==e)return Math.floor(1e3*parseFloat("0."+e))}function ez(e,t,r="round"){let n=10**t;switch(r){case"expand":return e>0?Math.ceil(e*n)/n:Math.floor(e*n)/n;case"trunc":return Math.trunc(e*n)/n;case"round":return Math.round(e*n)/n;case"floor":return Math.floor(e*n)/n;case"ceil":return Math.ceil(e*n)/n;default:throw RangeError(`Value rounding ${r} is out of range`)}}function eX(e){return e%4==0&&(e%100!=0||e%400==0)}function eQ(e){return eX(e)?366:365}function eZ(e,t){var r;let n=(r=t-1)-12*Math.floor(r/12)+1;return 2===n?eX(e+(t-n)/12)?29:28:[31,null,31,30,31,30,31,31,30,31,30,31][n-1]}function e0(e){let t=Date.UTC(e.year,e.month-1,e.day,e.hour,e.minute,e.second,e.millisecond);return e.year<100&&e.year>=0&&(t=new Date(t)).setUTCFullYear(e.year,e.month-1,e.day),+t}function e1(e,t,r){return-ek(eR(e,1,t),r)+t-1}function e2(e,t=4,r=1){let n=e1(e,t,r),i=e1(e+1,t,r);return(eQ(e)-n+i)/7}function e3(e){return e>99?e:e>eS.twoDigitCutoffYear?1900+e:2e3+e}function e4(e,t,r,n=null){let i=new Date(e),a={hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"};n&&(a.timeZone=n);let s={timeZoneName:t,...a},o=new Intl.DateTimeFormat(r,s).formatToParts(i).find(e=>"timezonename"===e.type.toLowerCase());return o?o.value:null}function e6(e,t){let r=parseInt(e,10);Number.isNaN(r)&&(r=0);let n=parseInt(t,10)||0,i=r<0||Object.is(r,-0)?-n:n;return 60*r+i}function e5(e){let t=Number(e);if("boolean"==typeof e||""===e||!Number.isFinite(t))throw new d(`Invalid unit value ${e}`);return t}function e9(e,t){let r={};for(let n in e)if(eq(e,n)){let i=e[n];if(null==i)continue;r[t(n)]=e5(i)}return r}function e8(e,t){let r=Math.trunc(Math.abs(e/60)),n=Math.trunc(Math.abs(e%60)),i=e>=0?"+":"-";switch(t){case"short":return`${i}${eU(r,2)}:${eU(n,2)}`;case"narrow":return`${i}${r}${n>0?`:${n}`:""}`;case"techie":return`${i}${eU(r,2)}${eU(n,2)}`;default:throw RangeError(`Value format ${t} is out of range for property format`)}}function e7(e){return["hour","minute","second","millisecond"].reduce((t,r)=>(t[r]=e[r],t),{})}let te=["January","February","March","April","May","June","July","August","September","October","November","December"],tt=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],tr=["J","F","M","A","M","J","J","A","S","O","N","D"];function tn(e){switch(e){case"narrow":return[...tr];case"short":return[...tt];case"long":return[...te];case"numeric":return["1","2","3","4","5","6","7","8","9","10","11","12"];case"2-digit":return["01","02","03","04","05","06","07","08","09","10","11","12"];default:return null}}let ti=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],ta=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],ts=["M","T","W","T","F","S","S"];function to(e){switch(e){case"narrow":return[...ts];case"short":return[...ta];case"long":return[...ti];case"numeric":return["1","2","3","4","5","6","7"];default:return null}}let tl=["AM","PM"],tu=["Before Christ","Anno Domini"],td=["BC","AD"],tc=["B","A"];function th(e){switch(e){case"narrow":return[...tc];case"short":return[...td];case"long":return[...tu];default:return null}}function tp(e,t){let r="";for(let n of e)n.literal?r+=n.val:r+=t(n.val);return r}let tm={D:f,DD:y,DDD:g,DDDD:v,t:E,tt:K,ttt:S,tttt:I,T:w,TT:x,TTT:T,TTTT:R,f:j,ff:A,fff:C,ffff:_,F:k,FF:O,FFF:P,FFFF:M};class tf{static create(e,t={}){return new tf(e,t)}static parseFormat(e){let t=null,r="",n=!1,i=[];for(let a=0;a<e.length;a++){let s=e.charAt(a);"'"===s?((r.length>0||n)&&i.push({literal:n||/^\s+$/.test(r),val:""===r?"'":r}),t=null,r="",n=!n):n||s===t?r+=s:(r.length>0&&i.push({literal:/^\s+$/.test(r),val:r}),r=s,t=s)}return r.length>0&&i.push({literal:n||/^\s+$/.test(r),val:r}),i}static macroTokenToFormatOpts(e){return tm[e]}constructor(e,t){this.opts=t,this.loc=e,this.systemLoc=null}formatWithSystemDefault(e,t){return null===this.systemLoc&&(this.systemLoc=this.loc.redefaultToSystem()),this.systemLoc.dtFormatter(e,{...this.opts,...t}).format()}dtFormatter(e,t={}){return this.loc.dtFormatter(e,{...this.opts,...t})}formatDateTime(e,t){return this.dtFormatter(e,t).format()}formatDateTimeParts(e,t){return this.dtFormatter(e,t).formatToParts()}formatInterval(e,t){return this.dtFormatter(e.start,t).dtf.formatRange(e.start.toJSDate(),e.end.toJSDate())}resolvedOptions(e,t){return this.dtFormatter(e,t).resolvedOptions()}num(e,t=0,r){if(this.opts.forceSimple)return eU(e,t);let n={...this.opts};return t>0&&(n.padTo=t),r&&(n.signDisplay=r),this.loc.numberFormatter(n).format(e)}formatDateTimeFromString(e,t){let r="en"===this.loc.listingMode(),n=this.loc.outputCalendar&&"gregory"!==this.loc.outputCalendar,i=(t,r)=>this.loc.extract(e,t,r),a=t=>e.isOffsetFixed&&0===e.offset&&t.allowZ?"Z":e.isValid?e.zone.formatOffset(e.ts,t.format):"",s=(t,n)=>r?tn(t)[e.month-1]:i(n?{month:t}:{month:t,day:"numeric"},"month"),o=(t,n)=>r?to(t)[e.weekday-1]:i(n?{weekday:t}:{weekday:t,month:"long",day:"numeric"},"weekday"),l=t=>{let r=tf.macroTokenToFormatOpts(t);return r?this.formatWithSystemDefault(e,r):t},u=t=>r?th(t)[e.year<0?0:1]:i({era:t},"era"),d=t=>{switch(t){case"S":return this.num(e.millisecond);case"u":case"SSS":return this.num(e.millisecond,3);case"s":return this.num(e.second);case"ss":return this.num(e.second,2);case"uu":return this.num(Math.floor(e.millisecond/10),2);case"uuu":return this.num(Math.floor(e.millisecond/100));case"m":return this.num(e.minute);case"mm":return this.num(e.minute,2);case"h":return this.num(e.hour%12==0?12:e.hour%12);case"hh":return this.num(e.hour%12==0?12:e.hour%12,2);case"H":return this.num(e.hour);case"HH":return this.num(e.hour,2);case"Z":return a({format:"narrow",allowZ:this.opts.allowZ});case"ZZ":return a({format:"short",allowZ:this.opts.allowZ});case"ZZZ":return a({format:"techie",allowZ:this.opts.allowZ});case"ZZZZ":return e.zone.offsetName(e.ts,{format:"short",locale:this.loc.locale});case"ZZZZZ":return e.zone.offsetName(e.ts,{format:"long",locale:this.loc.locale});case"z":return e.zoneName;case"a":return r?tl[e.hour<12?0:1]:i({hour:"numeric",hourCycle:"h12"},"dayperiod");case"d":return n?i({day:"numeric"},"day"):this.num(e.day);case"dd":return n?i({day:"2-digit"},"day"):this.num(e.day,2);case"c":case"E":return this.num(e.weekday);case"ccc":return o("short",!0);case"cccc":return o("long",!0);case"ccccc":return o("narrow",!0);case"EEE":return o("short",!1);case"EEEE":return o("long",!1);case"EEEEE":return o("narrow",!1);case"L":return n?i({month:"numeric",day:"numeric"},"month"):this.num(e.month);case"LL":return n?i({month:"2-digit",day:"numeric"},"month"):this.num(e.month,2);case"LLL":return s("short",!0);case"LLLL":return s("long",!0);case"LLLLL":return s("narrow",!0);case"M":return n?i({month:"numeric"},"month"):this.num(e.month);case"MM":return n?i({month:"2-digit"},"month"):this.num(e.month,2);case"MMM":return s("short",!1);case"MMMM":return s("long",!1);case"MMMMM":return s("narrow",!1);case"y":return n?i({year:"numeric"},"year"):this.num(e.year);case"yy":return n?i({year:"2-digit"},"year"):this.num(e.year.toString().slice(-2),2);case"yyyy":return n?i({year:"numeric"},"year"):this.num(e.year,4);case"yyyyyy":return n?i({year:"numeric"},"year"):this.num(e.year,6);case"G":return u("short");case"GG":return u("long");case"GGGGG":return u("narrow");case"kk":return this.num(e.weekYear.toString().slice(-2),2);case"kkkk":return this.num(e.weekYear,4);case"W":return this.num(e.weekNumber);case"WW":return this.num(e.weekNumber,2);case"n":return this.num(e.localWeekNumber);case"nn":return this.num(e.localWeekNumber,2);case"ii":return this.num(e.localWeekYear.toString().slice(-2),2);case"iiii":return this.num(e.localWeekYear,4);case"o":return this.num(e.ordinal);case"ooo":return this.num(e.ordinal,3);case"q":return this.num(e.quarter);case"qq":return this.num(e.quarter,2);case"X":return this.num(Math.floor(e.ts/1e3));case"x":return this.num(e.ts);default:return l(t)}};return tp(tf.parseFormat(t),d)}formatDurationFromString(e,t){let r="negativeLargestOnly"===this.opts.signMode?-1:1,n=e=>{switch(e[0]){case"S":return"milliseconds";case"s":return"seconds";case"m":return"minutes";case"h":return"hours";case"d":return"days";case"w":return"weeks";case"M":return"months";case"y":return"years";default:return null}},i=(e,t)=>i=>{let a=n(i);if(!a)return i;{let n,s=t.isNegativeDuration&&a!==t.largestUnit?r:1;return n="negativeLargestOnly"===this.opts.signMode&&a!==t.largestUnit?"never":"all"===this.opts.signMode?"always":"auto",this.num(e.get(a)*s,i.length,n)}},a=tf.parseFormat(t),s=a.reduce((e,{literal:t,val:r})=>t?e:e.concat(r),[]),o=e.shiftTo(...s.map(n).filter(e=>e)),l={isNegativeDuration:o<0,largestUnit:Object.keys(o.values)[0]};return tp(a,i(o,l))}}let ty=/[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;function tb(...e){let t=e.reduce((e,t)=>e+t.source,"");return RegExp(`^${t}$`)}function tg(...e){return t=>e.reduce(([e,r,n],i)=>{let[a,s,o]=i(t,n);return[{...e,...a},s||r,o]},[{},null,1]).slice(0,2)}function tv(e,...t){if(null==e)return[null,null];for(let[r,n]of t){let t=r.exec(e);if(t)return n(t)}return[null,null]}function tE(...e){return(t,r)=>{let n,i={};for(n=0;n<e.length;n++)i[e[n]]=e$(t[r+n]);return[i,null,r+n]}}let tK=/(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/,tS=`(?:${tK.source}?(?:\\[(${ty.source})\\])?)?`,tI=/(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,tw=RegExp(`${tI.source}${tS}`),tx=RegExp(`(?:[Tt]${tw.source})?`),tT=tE("weekYear","weekNumber","weekDay"),tR=tE("year","ordinal"),tj=RegExp(`${tI.source} ?(?:${tK.source}|(${ty.source}))?`),tk=RegExp(`(?: ${tj.source})?`);function tA(e,t,r){let n=e[t];return eN(n)?r:e$(n)}function tO(e,t){return[{hours:tA(e,t,0),minutes:tA(e,t+1,0),seconds:tA(e,t+2,0),milliseconds:eH(e[t+3])},null,t+4]}function tD(e,t){let r=!e[t]&&!e[t+1],n=e6(e[t+1],e[t+2]);return[{},r?null:es.instance(n),t+3]}function tC(e,t){return[{},e[t]?q.create(e[t]):null,t+1]}let tP=RegExp(`^T?${tI.source}$`),t_=/^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;function tM(e){let[t,r,n,i,a,s,o,l,u]=e,d="-"===t[0],c=l&&"-"===l[0],h=(e,t=!1)=>void 0!==e&&(t||e&&d)?-e:e;return[{years:h(eW(r)),months:h(eW(n)),weeks:h(eW(i)),days:h(eW(a)),hours:h(eW(s)),minutes:h(eW(o)),seconds:h(eW(l),"-0"===l),milliseconds:h(eH(u),c)}]}let tN={GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function tL(e,t,r,n,i,a,s){let o={year:2===t.length?e3(e$(t)):e$(t),month:tt.indexOf(r)+1,day:e$(n),hour:e$(i),minute:e$(a)};return s&&(o.second=e$(s)),e&&(o.weekday=e.length>3?ti.indexOf(e)+1:ta.indexOf(e)+1),o}let tJ=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;function tF(e){let[,t,r,n,i,a,s,o,l,u,d,c]=e;return[tL(t,i,n,r,a,s,o),new es(l?tN[l]:u?0:e6(d,c))]}let tG=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,tV=/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,tq=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;function tY(e){let[,t,r,n,i,a,s,o]=e;return[tL(t,i,n,r,a,s,o),es.utcInstance]}function tB(e){let[,t,r,n,i,a,s,o]=e;return[tL(t,o,r,n,i,a,s),es.utcInstance]}let tU=tb(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,tx),t$=tb(/(\d{4})-?W(\d\d)(?:-?(\d))?/,tx),tW=tb(/(\d{4})-?(\d{3})/,tx),tH=tb(tw),tz=tg(function(e,t){return[{year:tA(e,t),month:tA(e,t+1,1),day:tA(e,t+2,1)},null,t+3]},tO,tD,tC),tX=tg(tT,tO,tD,tC),tQ=tg(tR,tO,tD,tC),tZ=tg(tO,tD,tC),t0=tg(tO),t1=tb(/(\d{4})-(\d\d)-(\d\d)/,tk),t2=tb(tj),t3=tg(tO,tD,tC),t4="Invalid Duration",t6={weeks:{days:7,hours:168,minutes:10080,seconds:604800,milliseconds:6048e5},days:{hours:24,minutes:1440,seconds:86400,milliseconds:864e5},hours:{minutes:60,seconds:3600,milliseconds:36e5},minutes:{seconds:60,milliseconds:6e4},seconds:{milliseconds:1e3}},t5={years:{quarters:4,months:12,weeks:52,days:365,hours:8760,minutes:525600,seconds:31536e3,milliseconds:31536e6},quarters:{months:3,weeks:13,days:91,hours:2184,minutes:131040,seconds:7862400,milliseconds:78624e5},months:{weeks:4,days:30,hours:720,minutes:43200,seconds:2592e3,milliseconds:2592e6},...t6},t9={years:{quarters:4,months:12,weeks:52.1775,days:365.2425,hours:8765.82,minutes:525949.2,seconds:0x1e18558,milliseconds:31556952e3},quarters:{months:3,weeks:13.044375,days:91.310625,hours:2191.455,minutes:131487.3,seconds:7889238,milliseconds:7889238e3},months:{weeks:30.436875/7,days:30.436875,hours:730.485,minutes:43829.1,seconds:2629746,milliseconds:2629746e3},...t6},t8=["years","quarters","months","weeks","days","hours","minutes","seconds","milliseconds"],t7=t8.slice(0).reverse();function re(e,t,r=!1){return new ri({values:r?t.values:{...e.values,...t.values||{}},loc:e.loc.clone(t.loc),conversionAccuracy:t.conversionAccuracy||e.conversionAccuracy,matrix:t.matrix||e.matrix})}function rt(e,t){var r;let n=null!=(r=t.milliseconds)?r:0;for(let r of t7.slice(1))t[r]&&(n+=t[r]*e[r].milliseconds);return n}function rr(e,t){let r=0>rt(e,t)?-1:1;t8.reduceRight((n,i)=>{if(eN(t[i]))return n;if(n){let a=t[n]*r,s=e[i][n],o=Math.floor(a/s);t[i]+=o*r,t[n]-=o*s*r}return i},null),t8.reduce((r,n)=>{if(eN(t[n]))return r;if(r){let i=t[r]%1;t[r]-=i,t[n]+=i*e[r][n]}return n},null)}function rn(e){let t={};for(let[r,n]of Object.entries(e))0!==n&&(t[r]=n);return t}class ri{constructor(e){const t="longterm"===e.conversionAccuracy;let r=t?t9:t5;e.matrix&&(r=e.matrix),this.values=e.values,this.loc=e.loc||ei.create(),this.conversionAccuracy=t?"longterm":"casual",this.invalid=e.invalid||null,this.matrix=r,this.isLuxonDuration=!0}static fromMillis(e,t){return ri.fromObject({milliseconds:e},t)}static fromObject(e,t={}){if(null==e||"object"!=typeof e)throw new d(`Duration.fromObject: argument expected to be an object, got ${null===e?"null":typeof e}`);return new ri({values:e9(e,ri.normalizeUnit),loc:ei.fromObject(t),conversionAccuracy:t.conversionAccuracy,matrix:t.matrix})}static fromDurationLike(e){if(eL(e))return ri.fromMillis(e);if(ri.isDuration(e))return e;if("object"==typeof e)return ri.fromObject(e);throw new d(`Unknown duration argument ${e} of type ${typeof e}`)}static fromISO(e,t){let[r]=tv(e,[t_,tM]);return r?ri.fromObject(r,t):ri.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static fromISOTime(e,t){let[r]=tv(e,[tP,t0]);return r?ri.fromObject(r,t):ri.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static invalid(e,t=null){if(!e)throw new d("need to specify a reason the Duration is invalid");let r=e instanceof eI?e:new eI(e,t);if(!eS.throwOnInvalid)return new ri({invalid:r});throw new o(r)}static normalizeUnit(e){let t={year:"years",years:"years",quarter:"quarters",quarters:"quarters",month:"months",months:"months",week:"weeks",weeks:"weeks",day:"days",days:"days",hour:"hours",hours:"hours",minute:"minutes",minutes:"minutes",second:"seconds",seconds:"seconds",millisecond:"milliseconds",milliseconds:"milliseconds"}[e?e.toLowerCase():e];if(!t)throw new u(e);return t}static isDuration(e){return e&&e.isLuxonDuration||!1}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}toFormat(e,t={}){let r={...t,floor:!1!==t.round&&!1!==t.floor};return this.isValid?tf.create(this.loc,r).formatDurationFromString(this,e):t4}toHuman(e={}){if(!this.isValid)return t4;let t=!1!==e.showZeros,r=t8.map(r=>{let n=this.values[r];return eN(n)||0===n&&!t?null:this.loc.numberFormatter({style:"unit",unitDisplay:"long",...e,unit:r.slice(0,-1)}).format(n)}).filter(e=>e);return this.loc.listFormatter({type:"conjunction",style:e.listStyle||"narrow",...e}).format(r)}toObject(){return this.isValid?{...this.values}:{}}toISO(){if(!this.isValid)return null;let e="P";return 0!==this.years&&(e+=this.years+"Y"),(0!==this.months||0!==this.quarters)&&(e+=this.months+3*this.quarters+"M"),0!==this.weeks&&(e+=this.weeks+"W"),0!==this.days&&(e+=this.days+"D"),(0!==this.hours||0!==this.minutes||0!==this.seconds||0!==this.milliseconds)&&(e+="T"),0!==this.hours&&(e+=this.hours+"H"),0!==this.minutes&&(e+=this.minutes+"M"),(0!==this.seconds||0!==this.milliseconds)&&(e+=ez(this.seconds+this.milliseconds/1e3,3)+"S"),"P"===e&&(e+="T0S"),e}toISOTime(e={}){if(!this.isValid)return null;let t=this.toMillis();return t<0||t>=864e5?null:(e={suppressMilliseconds:!1,suppressSeconds:!1,includePrefix:!1,format:"extended",...e,includeOffset:!1},rW.fromMillis(t,{zone:"UTC"}).toISOTime(e))}toJSON(){return this.toISO()}toString(){return this.toISO()}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Duration { values: ${JSON.stringify(this.values)} }`:`Duration { Invalid, reason: ${this.invalidReason} }`}toMillis(){return this.isValid?rt(this.matrix,this.values):NaN}valueOf(){return this.toMillis()}plus(e){if(!this.isValid)return this;let t=ri.fromDurationLike(e),r={};for(let e of t8)(eq(t.values,e)||eq(this.values,e))&&(r[e]=t.get(e)+this.get(e));return re(this,{values:r},!0)}minus(e){if(!this.isValid)return this;let t=ri.fromDurationLike(e);return this.plus(t.negate())}mapUnits(e){if(!this.isValid)return this;let t={};for(let r of Object.keys(this.values))t[r]=e5(e(this.values[r],r));return re(this,{values:t},!0)}get(e){return this[ri.normalizeUnit(e)]}set(e){return this.isValid?re(this,{values:{...this.values,...e9(e,ri.normalizeUnit)}}):this}reconfigure({locale:e,numberingSystem:t,conversionAccuracy:r,matrix:n}={}){return re(this,{loc:this.loc.clone({locale:e,numberingSystem:t}),matrix:n,conversionAccuracy:r})}as(e){return this.isValid?this.shiftTo(e).get(e):NaN}normalize(){if(!this.isValid)return this;let e=this.toObject();return rr(this.matrix,e),re(this,{values:e},!0)}rescale(){return this.isValid?re(this,{values:rn(this.normalize().shiftToAll().toObject())},!0):this}shiftTo(...e){let t;if(!this.isValid||0===e.length)return this;e=e.map(e=>ri.normalizeUnit(e));let r={},n={},i=this.toObject();for(let a of t8)if(e.indexOf(a)>=0){t=a;let e=0;for(let t in n)e+=this.matrix[t][a]*n[t],n[t]=0;eL(i[a])&&(e+=i[a]);let s=Math.trunc(e);r[a]=s,n[a]=(1e3*e-1e3*s)/1e3}else eL(i[a])&&(n[a]=i[a]);for(let e in n)0!==n[e]&&(r[t]+=e===t?n[e]:n[e]/this.matrix[t][e]);return rr(this.matrix,r),re(this,{values:r},!0)}shiftToAll(){return this.isValid?this.shiftTo("years","months","weeks","days","hours","minutes","seconds","milliseconds"):this}negate(){if(!this.isValid)return this;let e={};for(let t of Object.keys(this.values))e[t]=0===this.values[t]?0:-this.values[t];return re(this,{values:e},!0)}removeZeros(){return this.isValid?re(this,{values:rn(this.values)},!0):this}get years(){return this.isValid?this.values.years||0:NaN}get quarters(){return this.isValid?this.values.quarters||0:NaN}get months(){return this.isValid?this.values.months||0:NaN}get weeks(){return this.isValid?this.values.weeks||0:NaN}get days(){return this.isValid?this.values.days||0:NaN}get hours(){return this.isValid?this.values.hours||0:NaN}get minutes(){return this.isValid?this.values.minutes||0:NaN}get seconds(){return this.isValid?this.values.seconds||0:NaN}get milliseconds(){return this.isValid?this.values.milliseconds||0:NaN}get isValid(){return null===this.invalid}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}equals(e){if(!this.isValid||!e.isValid||!this.loc.equals(e.loc))return!1;for(let n of t8){var t,r;if(t=this.values[n],r=e.values[n],void 0===t||0===t?void 0!==r&&0!==r:t!==r)return!1}return!0}}let ra="Invalid Interval";class rs{constructor(e){this.s=e.start,this.e=e.end,this.invalid=e.invalid||null,this.isLuxonInterval=!0}static invalid(e,t=null){if(!e)throw new d("need to specify a reason the Interval is invalid");let r=e instanceof eI?e:new eI(e,t);if(!eS.throwOnInvalid)return new rs({invalid:r});throw new s(r)}static fromDateTimes(e,t){var r,n;let i=rH(e),a=rH(t),s=(r=i,n=a,r&&r.isValid?n&&n.isValid?n<r?rs.invalid("end before start",`The end of an interval must be after its start, but you had start=${r.toISO()} and end=${n.toISO()}`):null:rs.invalid("missing or invalid end"):rs.invalid("missing or invalid start"));return null==s?new rs({start:i,end:a}):s}static after(e,t){let r=ri.fromDurationLike(t),n=rH(e);return rs.fromDateTimes(n,n.plus(r))}static before(e,t){let r=ri.fromDurationLike(t),n=rH(e);return rs.fromDateTimes(n.minus(r),n)}static fromISO(e,t){let[r,n]=(e||"").split("/",2);if(r&&n){let e,i,a,s;try{i=(e=rW.fromISO(r,t)).isValid}catch(e){i=!1}try{s=(a=rW.fromISO(n,t)).isValid}catch(e){s=!1}if(i&&s)return rs.fromDateTimes(e,a);if(i){let r=ri.fromISO(n,t);if(r.isValid)return rs.after(e,r)}else if(s){let e=ri.fromISO(r,t);if(e.isValid)return rs.before(a,e)}}return rs.invalid("unparsable",`the input "${e}" can't be parsed as ISO 8601`)}static isInterval(e){return e&&e.isLuxonInterval||!1}get start(){return this.isValid?this.s:null}get end(){return this.isValid?this.e:null}get lastDateTime(){return this.isValid&&this.e?this.e.minus(1):null}get isValid(){return null===this.invalidReason}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}length(e="milliseconds"){return this.isValid?this.toDuration(e).get(e):NaN}count(e="milliseconds",t){let r;if(!this.isValid)return NaN;let n=this.start.startOf(e,t);return Math.floor((r=(r=null!=t&&t.useLocaleWeeks?this.end.reconfigure({locale:n.locale}):this.end).startOf(e,t)).diff(n,e).get(e))+(r.valueOf()!==this.end.valueOf())}hasSame(e){return!!this.isValid&&(this.isEmpty()||this.e.minus(1).hasSame(this.s,e))}isEmpty(){return this.s.valueOf()===this.e.valueOf()}isAfter(e){return!!this.isValid&&this.s>e}isBefore(e){return!!this.isValid&&this.e<=e}contains(e){return!!this.isValid&&this.s<=e&&this.e>e}set({start:e,end:t}={}){return this.isValid?rs.fromDateTimes(e||this.s,t||this.e):this}splitAt(...e){if(!this.isValid)return[];let t=e.map(rH).filter(e=>this.contains(e)).sort((e,t)=>e.toMillis()-t.toMillis()),r=[],{s:n}=this,i=0;for(;n<this.e;){let e=t[i]||this.e,a=+e>+this.e?this.e:e;r.push(rs.fromDateTimes(n,a)),n=a,i+=1}return r}splitBy(e){let t=ri.fromDurationLike(e);if(!this.isValid||!t.isValid||0===t.as("milliseconds"))return[];let{s:r}=this,n=1,i,a=[];for(;r<this.e;){let e=this.start.plus(t.mapUnits(e=>e*n));i=+e>+this.e?this.e:e,a.push(rs.fromDateTimes(r,i)),r=i,n+=1}return a}divideEqually(e){return this.isValid?this.splitBy(this.length()/e).slice(0,e):[]}overlaps(e){return this.e>e.s&&this.s<e.e}abutsStart(e){return!!this.isValid&&+this.e==+e.s}abutsEnd(e){return!!this.isValid&&+e.e==+this.s}engulfs(e){return!!this.isValid&&this.s<=e.s&&this.e>=e.e}equals(e){return!!this.isValid&&!!e.isValid&&this.s.equals(e.s)&&this.e.equals(e.e)}intersection(e){if(!this.isValid)return this;let t=this.s>e.s?this.s:e.s,r=this.e<e.e?this.e:e.e;return t>=r?null:rs.fromDateTimes(t,r)}union(e){if(!this.isValid)return this;let t=this.s<e.s?this.s:e.s,r=this.e>e.e?this.e:e.e;return rs.fromDateTimes(t,r)}static merge(e){let[t,r]=e.sort((e,t)=>e.s-t.s).reduce(([e,t],r)=>t?t.overlaps(r)||t.abutsStart(r)?[e,t.union(r)]:[e.concat([t]),r]:[e,r],[[],null]);return r&&t.push(r),t}static xor(e){let t=null,r=0,n=[],i=e.map(e=>[{time:e.s,type:"s"},{time:e.e,type:"e"}]);for(let e of Array.prototype.concat(...i).sort((e,t)=>e.time-t.time))1===(r+="s"===e.type?1:-1)?t=e.time:(t&&+t!=+e.time&&n.push(rs.fromDateTimes(t,e.time)),t=null);return rs.merge(n)}difference(...e){return rs.xor([this].concat(e)).map(e=>this.intersection(e)).filter(e=>e&&!e.isEmpty())}toString(){return this.isValid?`[${this.s.toISO()} – ${this.e.toISO()})`:ra}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`:`Interval { Invalid, reason: ${this.invalidReason} }`}toLocaleString(e=f,t={}){return this.isValid?tf.create(this.s.loc.clone(t),e).formatInterval(this):ra}toISO(e){return this.isValid?`${this.s.toISO(e)}/${this.e.toISO(e)}`:ra}toISODate(){return this.isValid?`${this.s.toISODate()}/${this.e.toISODate()}`:ra}toISOTime(e){return this.isValid?`${this.s.toISOTime(e)}/${this.e.toISOTime(e)}`:ra}toFormat(e,{separator:t=" – "}={}){return this.isValid?`${this.s.toFormat(e)}${t}${this.e.toFormat(e)}`:ra}toDuration(e,t){return this.isValid?this.e.diff(this.s,e,t):ri.invalid(this.invalidReason)}mapEndpoints(e){return rs.fromDateTimes(e(this.s),e(this.e))}}class ro{static hasDST(e=eS.defaultZone){let t=rW.now().setZone(e).set({month:12});return!e.isUniversal&&t.offset!==t.set({month:6}).offset}static isValidIANAZone(e){return q.isValidZone(e)}static normalizeZone(e){return el(e,eS.defaultZone)}static getStartOfWeek({locale:e=null,locObj:t=null}={}){return(t||ei.create(e)).getStartOfWeek()}static getMinimumDaysInFirstWeek({locale:e=null,locObj:t=null}={}){return(t||ei.create(e)).getMinDaysInFirstWeek()}static getWeekendWeekdays({locale:e=null,locObj:t=null}={}){return(t||ei.create(e)).getWeekendDays().slice()}static months(e="long",{locale:t=null,numberingSystem:r=null,locObj:n=null,outputCalendar:i="gregory"}={}){return(n||ei.create(t,r,i)).months(e)}static monthsFormat(e="long",{locale:t=null,numberingSystem:r=null,locObj:n=null,outputCalendar:i="gregory"}={}){return(n||ei.create(t,r,i)).months(e,!0)}static weekdays(e="long",{locale:t=null,numberingSystem:r=null,locObj:n=null}={}){return(n||ei.create(t,r,null)).weekdays(e)}static weekdaysFormat(e="long",{locale:t=null,numberingSystem:r=null,locObj:n=null}={}){return(n||ei.create(t,r,null)).weekdays(e,!0)}static meridiems({locale:e=null}={}){return ei.create(e).meridiems()}static eras(e="short",{locale:t=null}={}){return ei.create(t,null,"gregory").eras(e)}static features(){return{relative:eF(),localeWeek:eG()}}}function rl(e,t){let r=e=>e.toUTC(0,{keepLocalTime:!0}).startOf("day").valueOf(),n=r(t)-r(e);return Math.floor(ri.fromMillis(n).as("days"))}function ru(e,t=e=>e){return{regex:e,deser:([e])=>t(function(e){let t=parseInt(e,10);if(!isNaN(t))return t;t="";for(let r=0;r<e.length;r++){let n=e.charCodeAt(r);if(-1!==e[r].search(eu.hanidec))t+=ec.indexOf(e[r]);else for(let e in ed){let[r,i]=ed[e];n>=r&&n<=i&&(t+=n-r)}}return parseInt(t,10)}(e))}}let rd=String.fromCharCode(160),rc=`[ ${rd}]`,rh=RegExp(rc,"g");function rp(e){return e.replace(/\./g,"\\.?").replace(rh,rc)}function rm(e){return e.replace(/\./g,"").replace(rh," ").toLowerCase()}function rf(e,t){return null===e?null:{regex:RegExp(e.map(rp).join("|")),deser:([r])=>e.findIndex(e=>rm(r)===rm(e))+t}}function ry(e,t){return{regex:e,deser:([,e,t])=>e6(e,t),groups:t}}function rb(e){return{regex:e,deser:([e])=>e}}let rg={year:{"2-digit":"yy",numeric:"yyyyy"},month:{numeric:"M","2-digit":"MM",short:"MMM",long:"MMMM"},day:{numeric:"d","2-digit":"dd"},weekday:{short:"EEE",long:"EEEE"},dayperiod:"a",dayPeriod:"a",hour12:{numeric:"h","2-digit":"hh"},hour24:{numeric:"H","2-digit":"HH"},minute:{numeric:"m","2-digit":"mm"},second:{numeric:"s","2-digit":"ss"},timeZoneName:{long:"ZZZZZ",short:"ZZZ"}},rv=null;function rE(e,t){return Array.prototype.concat(...e.map(e=>(function(e,t){if(e.literal)return e;let r=rI(tf.macroTokenToFormatOpts(e.val),t);return null==r||r.includes(void 0)?e:r})(e,t)))}class rK{constructor(e,t){if(this.locale=e,this.format=t,this.tokens=rE(tf.parseFormat(t),e),this.units=this.tokens.map(t=>{let r,n,i,a,s,o,l,u,d,c,h,p,m;return r=ep(e),n=ep(e,"{2}"),i=ep(e,"{3}"),a=ep(e,"{4}"),s=ep(e,"{6}"),o=ep(e,"{1,2}"),l=ep(e,"{1,3}"),u=ep(e,"{1,6}"),d=ep(e,"{1,9}"),c=ep(e,"{2,4}"),h=ep(e,"{4,6}"),p=e=>({regex:RegExp(e.val.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")),deser:([e])=>e,literal:!0}),(m=(m=>{if(t.literal)return p(m);switch(m.val){case"G":return rf(e.eras("short"),0);case"GG":return rf(e.eras("long"),0);case"y":return ru(u);case"yy":case"kk":return ru(c,e3);case"yyyy":case"kkkk":return ru(a);case"yyyyy":return ru(h);case"yyyyyy":return ru(s);case"M":case"L":case"d":case"H":case"h":case"m":case"q":case"s":case"W":return ru(o);case"MM":case"LL":case"dd":case"HH":case"hh":case"mm":case"qq":case"ss":case"WW":return ru(n);case"MMM":return rf(e.months("short",!0),1);case"MMMM":return rf(e.months("long",!0),1);case"LLL":return rf(e.months("short",!1),1);case"LLLL":return rf(e.months("long",!1),1);case"o":case"S":return ru(l);case"ooo":case"SSS":return ru(i);case"u":return rb(d);case"uu":return rb(o);case"uuu":case"E":case"c":return ru(r);case"a":return rf(e.meridiems(),0);case"EEE":return rf(e.weekdays("short",!1),1);case"EEEE":return rf(e.weekdays("long",!1),1);case"ccc":return rf(e.weekdays("short",!0),1);case"cccc":return rf(e.weekdays("long",!0),1);case"Z":case"ZZ":return ry(RegExp(`([+-]${o.source})(?::(${n.source}))?`),2);case"ZZZ":return ry(RegExp(`([+-]${o.source})(${n.source})?`),2);case"z":return rb(/[a-z_+-/]{1,256}?/i);case" ":return rb(/[^\S\n\r]/);default:return p(m)}})(t)||{invalidReason:"missing Intl.DateTimeFormat.formatToParts support"}).token=t,m}),this.disqualifyingUnit=this.units.find(e=>e.invalidReason),!this.disqualifyingUnit){const[e,t]=function(e){let t=e.map(e=>e.regex).reduce((e,t)=>`${e}(${t.source})`,"");return[`^${t}$`,e]}(this.units);this.regex=RegExp(e,"i"),this.handlers=t}}explainFromTokens(e){if(!this.isValid)return{input:e,tokens:this.tokens,invalidReason:this.invalidReason};{let t,r,[n,i]=function(e,t,r){let n=e.match(t);if(!n)return[n,{}];{let e={},t=1;for(let i in r)if(eq(r,i)){let a=r[i],s=a.groups?a.groups+1:1;!a.literal&&a.token&&(e[a.token.val[0]]=a.deser(n.slice(t,t+s))),t+=s}return[n,e]}}(e,this.regex,this.handlers),[a,s,o]=i?(r=null,eN(i.z)||(r=q.create(i.z)),eN(i.Z)||(r||(r=new es(i.Z)),t=i.Z),eN(i.q)||(i.M=(i.q-1)*3+1),eN(i.h)||(i.h<12&&1===i.a?i.h+=12:12===i.h&&0===i.a&&(i.h=0)),0===i.G&&i.y&&(i.y=-i.y),eN(i.u)||(i.S=eH(i.u)),[Object.keys(i).reduce((e,t)=>{let r=(e=>{switch(e){case"S":return"millisecond";case"s":return"second";case"m":return"minute";case"h":case"H":return"hour";case"d":return"day";case"o":return"ordinal";case"L":case"M":return"month";case"y":return"year";case"E":case"c":return"weekday";case"W":return"weekNumber";case"k":return"weekYear";case"q":return"quarter";default:return null}})(t);return r&&(e[r]=i[t]),e},{}),r,t]):[null,null,void 0];if(eq(i,"a")&&eq(i,"H"))throw new l("Can't include meridiem when specifying 24-hour format");return{input:e,tokens:this.tokens,regex:this.regex,rawMatches:n,matches:i,result:a,zone:s,specificOffset:o}}}get isValid(){return!this.disqualifyingUnit}get invalidReason(){return this.disqualifyingUnit?this.disqualifyingUnit.invalidReason:null}}function rS(e,t,r){return new rK(e,r).explainFromTokens(t)}function rI(e,t){if(!e)return null;let r=tf.create(t,e).dtFormatter((rv||(rv=rW.fromMillis(0x16a2e5618e3)),rv)),n=r.formatToParts(),i=r.resolvedOptions();return n.map(t=>(function(e,t,r){let{type:n,value:i}=e;if("literal"===n){let e=/^\s+$/.test(i);return{literal:!e,val:e?" ":i}}let a=t[n],s=n;"hour"===n&&(s=null!=t.hour12?t.hour12?"hour12":"hour24":null!=t.hourCycle?"h11"===t.hourCycle||"h12"===t.hourCycle?"hour12":"hour24":r.hour12?"hour12":"hour24");let o=rg[s];if("object"==typeof o&&(o=o[a]),o)return{literal:!1,val:o}})(t,e,i))}let rw="Invalid DateTime";function rx(e){return new eI("unsupported zone",`the zone "${e.name}" is not supported`)}function rT(e){return null===e.weekData&&(e.weekData=eA(e.c)),e.weekData}function rR(e){return null===e.localWeekData&&(e.localWeekData=eA(e.c,e.loc.getMinDaysInFirstWeek(),e.loc.getStartOfWeek())),e.localWeekData}function rj(e,t){let r={ts:e.ts,zone:e.zone,c:e.c,o:e.o,loc:e.loc,invalid:e.invalid};return new rW({...r,...t,old:r})}function rk(e,t,r){let n=e-60*t*1e3,i=r.offset(n);if(t===i)return[n,t];n-=(i-t)*6e4;let a=r.offset(n);return i===a?[n,i]:[e-60*Math.min(i,a)*1e3,Math.max(i,a)]}function rA(e,t){let r=new Date(e+=60*t*1e3);return{year:r.getUTCFullYear(),month:r.getUTCMonth()+1,day:r.getUTCDate(),hour:r.getUTCHours(),minute:r.getUTCMinutes(),second:r.getUTCSeconds(),millisecond:r.getUTCMilliseconds()}}function rO(e,t){let r=e.o,n=e.c.year+Math.trunc(t.years),i=e.c.month+Math.trunc(t.months)+3*Math.trunc(t.quarters),a={...e.c,year:n,month:i,day:Math.min(e.c.day,eZ(n,i))+Math.trunc(t.days)+7*Math.trunc(t.weeks)},s=ri.fromObject({years:t.years-Math.trunc(t.years),quarters:t.quarters-Math.trunc(t.quarters),months:t.months-Math.trunc(t.months),weeks:t.weeks-Math.trunc(t.weeks),days:t.days-Math.trunc(t.days),hours:t.hours,minutes:t.minutes,seconds:t.seconds,milliseconds:t.milliseconds}).as("milliseconds"),[o,l]=rk(e0(a),r,e.zone);return 0!==s&&(o+=s,l=e.zone.offset(o)),{ts:o,o:l}}function rD(e,t,r,n,i,a){let{setZone:s,zone:o}=r;if((!e||0===Object.keys(e).length)&&!t)return rW.invalid(new eI("unparsable",`the input "${i}" can't be parsed as ${n}`));{let n=rW.fromObject(e,{...r,zone:t||o,specificOffset:a});return s?n:n.setZone(o)}}function rC(e,t,r=!0){return e.isValid?tf.create(ei.create("en-US"),{allowZ:r,forceSimple:!0}).formatDateTimeFromString(e,t):null}function rP(e,t,r){let n=e.c.year>9999||e.c.year<0,i="";if(n&&e.c.year>=0&&(i+="+"),i+=eU(e.c.year,n?6:4),"year"===r)return i;if(t){if(i+="-",i+=eU(e.c.month),"month"===r)return i;i+="-"}else if(i+=eU(e.c.month),"month"===r)return i;return i+eU(e.c.day)}function r_(e,t,r,n,i,a,s){let o=!r||0!==e.c.millisecond||0!==e.c.second,l="";switch(s){case"day":case"month":case"year":break;default:if(l+=eU(e.c.hour),"hour"===s)break;if(t){if(l+=":",l+=eU(e.c.minute),"minute"===s)break;o&&(l+=":",l+=eU(e.c.second))}else{if(l+=eU(e.c.minute),"minute"===s)break;o&&(l+=eU(e.c.second))}if("second"===s)break;o&&(!n||0!==e.c.millisecond)&&(l+=".",l+=eU(e.c.millisecond,3))}return i&&(e.isOffsetFixed&&0===e.offset&&!a?l+="Z":e.o<0?(l+="-",l+=eU(Math.trunc(-e.o/60)),l+=":",l+=eU(Math.trunc(-e.o%60))):(l+="+",l+=eU(Math.trunc(e.o/60)),l+=":",l+=eU(Math.trunc(e.o%60)))),a&&(l+="["+e.zone.ianaName+"]"),l}let rM={month:1,day:1,hour:0,minute:0,second:0,millisecond:0},rN={weekNumber:1,weekday:1,hour:0,minute:0,second:0,millisecond:0},rL={ordinal:1,hour:0,minute:0,second:0,millisecond:0},rJ=["year","month","day","hour","minute","second","millisecond"],rF=["weekYear","weekNumber","weekday","hour","minute","second","millisecond"],rG=["year","ordinal","hour","minute","second","millisecond"];function rV(e){let t={year:"year",years:"year",month:"month",months:"month",day:"day",days:"day",hour:"hour",hours:"hour",minute:"minute",minutes:"minute",quarter:"quarter",quarters:"quarter",second:"second",seconds:"second",millisecond:"millisecond",milliseconds:"millisecond",weekday:"weekday",weekdays:"weekday",weeknumber:"weekNumber",weeksnumber:"weekNumber",weeknumbers:"weekNumber",weekyear:"weekYear",weekyears:"weekYear",ordinal:"ordinal"}[e.toLowerCase()];if(!t)throw new u(e);return t}function rq(e){switch(e.toLowerCase()){case"localweekday":case"localweekdays":return"localWeekday";case"localweeknumber":case"localweeknumbers":return"localWeekNumber";case"localweekyear":case"localweekyears":return"localWeekYear";default:return rV(e)}}function rY(e,t){let r,i,a=el(t.zone,eS.defaultZone);if(!a.isValid)return rW.invalid(rx(a));let s=ei.fromObject(t);if(eN(e.year))r=eS.now();else{for(let t of rJ)eN(e[t])&&(e[t]=rM[t]);let t=e_(e)||eM(e);if(t)return rW.invalid(t);let s=function(e){if(void 0===n&&(n=eS.now()),"iana"!==e.type)return e.offset(n);let t=e.name,r=r$.get(t);return void 0===r&&(r=e.offset(n),r$.set(t,r)),r}(a);[r,i]=rk(e0(e),s,a)}return new rW({ts:r,zone:a,loc:s,o:i})}function rB(e,t,r){let n=!!eN(r.round)||r.round,i=eN(r.rounding)?"trunc":r.rounding,a=(e,a)=>(e=ez(e,n||r.calendary?0:2,r.calendary?"round":i),t.loc.clone(r).relFormatter(r).format(e,a)),s=n=>r.calendary?t.hasSame(e,n)?0:t.startOf(n).diff(e.startOf(n),n).get(n):t.diff(e,n).get(n);if(r.unit)return a(s(r.unit),r.unit);for(let e of r.units){let t=s(e);if(Math.abs(t)>=1)return a(t,e)}return a(e>t?-0:0,r.units[r.units.length-1])}function rU(e){let t={},r;return e.length>0&&"object"==typeof e[e.length-1]?(t=e[e.length-1],r=Array.from(e).slice(0,e.length-1)):r=Array.from(e),[t,r]}let r$=new Map;class rW{constructor(e){const t=e.zone||eS.defaultZone;let r=e.invalid||(Number.isNaN(e.ts)?new eI("invalid input"):null)||(t.isValid?null:rx(t));this.ts=eN(e.ts)?eS.now():e.ts;let n=null,i=null;if(!r)if(e.old&&e.old.ts===this.ts&&e.old.zone.equals(t))[n,i]=[e.old.c,e.old.o];else{const a=eL(e.o)&&!e.old?e.o:t.offset(this.ts);n=(r=Number.isNaN((n=rA(this.ts,a)).year)?new eI("invalid input"):null)?null:n,i=r?null:a}this._zone=t,this.loc=e.loc||ei.create(),this.invalid=r,this.weekData=null,this.localWeekData=null,this.c=n,this.o=i,this.isLuxonDateTime=!0}static now(){return new rW({})}static local(){let[e,t]=rU(arguments),[r,n,i,a,s,o,l]=t;return rY({year:r,month:n,day:i,hour:a,minute:s,second:o,millisecond:l},e)}static utc(){let[e,t]=rU(arguments),[r,n,i,a,s,o,l]=t;return e.zone=es.utcInstance,rY({year:r,month:n,day:i,hour:a,minute:s,second:o,millisecond:l},e)}static fromJSDate(e,t={}){let r="[object Date]"===Object.prototype.toString.call(e)?e.valueOf():NaN;if(Number.isNaN(r))return rW.invalid("invalid input");let n=el(t.zone,eS.defaultZone);return n.isValid?new rW({ts:r,zone:n,loc:ei.fromObject(t)}):rW.invalid(rx(n))}static fromMillis(e,t={}){if(eL(e))if(e<-864e13||e>864e13)return rW.invalid("Timestamp out of range");else return new rW({ts:e,zone:el(t.zone,eS.defaultZone),loc:ei.fromObject(t)});throw new d(`fromMillis requires a numerical input, but received a ${typeof e} with value ${e}`)}static fromSeconds(e,t={}){if(eL(e))return new rW({ts:1e3*e,zone:el(t.zone,eS.defaultZone),loc:ei.fromObject(t)});throw new d("fromSeconds requires a numerical input")}static fromObject(e,t={}){var r;let n,i;e=e||{};let a=el(t.zone,eS.defaultZone);if(!a.isValid)return rW.invalid(rx(a));let s=ei.fromObject(t),o=e9(e,rq),{minDaysInFirstWeek:u,startOfWeek:d}=eP(o,s),c=eS.now(),h=eN(t.specificOffset)?a.offset(c):t.specificOffset,p=!eN(o.ordinal),m=!eN(o.year),f=!eN(o.month)||!eN(o.day),y=m||f,b=o.weekYear||o.weekNumber;if((y||p)&&b)throw new l("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(f&&p)throw new l("Can't mix ordinal dates with month/day");let g=b||o.weekday&&!y,v,E,K=rA(c,h);g?(v=rF,E=rN,K=eA(K,u,d)):p?(v=rG,E=rL,K=eD(K)):(v=rJ,E=rM);let S=!1;for(let e of v)eN(o[e])?S?o[e]=E[e]:o[e]=K[e]:S=!0;let I=(g?function(e,t=4,r=1){let n=eJ(e.weekYear),i=eB(e.weekNumber,1,e2(e.weekYear,t,r)),a=eB(e.weekday,1,7);return n?i?!a&&eT("weekday",e.weekday):eT("week",e.weekNumber):eT("weekYear",e.weekYear)}(o,u,d):p?(n=eJ(o.year),i=eB(o.ordinal,1,eQ(o.year)),n?!i&&eT("ordinal",o.ordinal):eT("year",o.year)):e_(o))||eM(o);if(I)return rW.invalid(I);let[w,x]=(r=g?eO(o,u,d):p?eC(o):o,rk(e0(r),h,a)),T=new rW({ts:w,zone:a,o:x,loc:s});return o.weekday&&y&&e.weekday!==T.weekday?rW.invalid("mismatched weekday",`you can't specify both a weekday of ${o.weekday} and a date of ${T.toISO()}`):T.isValid?T:rW.invalid(T.invalid)}static fromISO(e,t={}){let[r,n]=tv(e,[tU,tz],[t$,tX],[tW,tQ],[tH,tZ]);return rD(r,n,t,"ISO 8601",e)}static fromRFC2822(e,t={}){let[r,n]=tv(e.replace(/\([^()]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim(),[tJ,tF]);return rD(r,n,t,"RFC 2822",e)}static fromHTTP(e,t={}){let[r,n]=tv(e,[tG,tY],[tV,tY],[tq,tB]);return rD(r,n,t,"HTTP",t)}static fromFormat(e,t,r={}){if(eN(e)||eN(t))throw new d("fromFormat requires an input string and a format");let{locale:n=null,numberingSystem:i=null}=r,[a,s,o,l]=function(e,t,r){let{result:n,zone:i,specificOffset:a,invalidReason:s}=rS(e,t,r);return[n,i,a,s]}(ei.fromOpts({locale:n,numberingSystem:i,defaultToEN:!0}),e,t);return l?rW.invalid(l):rD(a,s,r,`format ${t}`,e,o)}static fromString(e,t,r={}){return rW.fromFormat(e,t,r)}static fromSQL(e,t={}){let[r,n]=tv(e,[t1,tz],[t2,t3]);return rD(r,n,t,"SQL",e)}static invalid(e,t=null){if(!e)throw new d("need to specify a reason the DateTime is invalid");let r=e instanceof eI?e:new eI(e,t);if(!eS.throwOnInvalid)return new rW({invalid:r});throw new a(r)}static isDateTime(e){return e&&e.isLuxonDateTime||!1}static parseFormatForOpts(e,t={}){let r=rI(e,ei.fromObject(t));return r?r.map(e=>e?e.val:null).join(""):null}static expandFormat(e,t={}){return rE(tf.parseFormat(e),ei.fromObject(t)).map(e=>e.val).join("")}static resetCache(){n=void 0,r$.clear()}get(e){return this[e]}get isValid(){return null===this.invalid}get invalidReason(){return this.invalid?this.invalid.reason:null}get invalidExplanation(){return this.invalid?this.invalid.explanation:null}get locale(){return this.isValid?this.loc.locale:null}get numberingSystem(){return this.isValid?this.loc.numberingSystem:null}get outputCalendar(){return this.isValid?this.loc.outputCalendar:null}get zone(){return this._zone}get zoneName(){return this.isValid?this.zone.name:null}get year(){return this.isValid?this.c.year:NaN}get quarter(){return this.isValid?Math.ceil(this.c.month/3):NaN}get month(){return this.isValid?this.c.month:NaN}get day(){return this.isValid?this.c.day:NaN}get hour(){return this.isValid?this.c.hour:NaN}get minute(){return this.isValid?this.c.minute:NaN}get second(){return this.isValid?this.c.second:NaN}get millisecond(){return this.isValid?this.c.millisecond:NaN}get weekYear(){return this.isValid?rT(this).weekYear:NaN}get weekNumber(){return this.isValid?rT(this).weekNumber:NaN}get weekday(){return this.isValid?rT(this).weekday:NaN}get isWeekend(){return this.isValid&&this.loc.getWeekendDays().includes(this.weekday)}get localWeekday(){return this.isValid?rR(this).weekday:NaN}get localWeekNumber(){return this.isValid?rR(this).weekNumber:NaN}get localWeekYear(){return this.isValid?rR(this).weekYear:NaN}get ordinal(){return this.isValid?eD(this.c).ordinal:NaN}get monthShort(){return this.isValid?ro.months("short",{locObj:this.loc})[this.month-1]:null}get monthLong(){return this.isValid?ro.months("long",{locObj:this.loc})[this.month-1]:null}get weekdayShort(){return this.isValid?ro.weekdays("short",{locObj:this.loc})[this.weekday-1]:null}get weekdayLong(){return this.isValid?ro.weekdays("long",{locObj:this.loc})[this.weekday-1]:null}get offset(){return this.isValid?+this.o:NaN}get offsetNameShort(){return this.isValid?this.zone.offsetName(this.ts,{format:"short",locale:this.locale}):null}get offsetNameLong(){return this.isValid?this.zone.offsetName(this.ts,{format:"long",locale:this.locale}):null}get isOffsetFixed(){return this.isValid?this.zone.isUniversal:null}get isInDST(){return!this.isOffsetFixed&&(this.offset>this.set({month:1,day:1}).offset||this.offset>this.set({month:5}).offset)}getPossibleOffsets(){if(!this.isValid||this.isOffsetFixed)return[this];let e=e0(this.c),t=this.zone.offset(e-864e5),r=this.zone.offset(e+864e5),n=this.zone.offset(e-6e4*t),i=this.zone.offset(e-6e4*r);if(n===i)return[this];let a=e-6e4*n,s=e-6e4*i,o=rA(a,n),l=rA(s,i);return o.hour===l.hour&&o.minute===l.minute&&o.second===l.second&&o.millisecond===l.millisecond?[rj(this,{ts:a}),rj(this,{ts:s})]:[this]}get isInLeapYear(){return eX(this.year)}get daysInMonth(){return eZ(this.year,this.month)}get daysInYear(){return this.isValid?eQ(this.year):NaN}get weeksInWeekYear(){return this.isValid?e2(this.weekYear):NaN}get weeksInLocalWeekYear(){return this.isValid?e2(this.localWeekYear,this.loc.getMinDaysInFirstWeek(),this.loc.getStartOfWeek()):NaN}resolvedLocaleOptions(e={}){let{locale:t,numberingSystem:r,calendar:n}=tf.create(this.loc.clone(e),e).resolvedOptions(this);return{locale:t,numberingSystem:r,outputCalendar:n}}toUTC(e=0,t={}){return this.setZone(es.instance(e),t)}toLocal(){return this.setZone(eS.defaultZone)}setZone(e,{keepLocalTime:t=!1,keepCalendarTime:r=!1}={}){if((e=el(e,eS.defaultZone)).equals(this.zone))return this;{if(!e.isValid)return rW.invalid(rx(e));let i=this.ts;if(t||r){var n;let t=e.offset(this.ts),r=this.toObject();[i]=(n=e,rk(e0(r),t,n))}return rj(this,{ts:i,zone:e})}}reconfigure({locale:e,numberingSystem:t,outputCalendar:r}={}){return rj(this,{loc:this.loc.clone({locale:e,numberingSystem:t,outputCalendar:r})})}setLocale(e){return this.reconfigure({locale:e})}set(e){var t,r,n;let i;if(!this.isValid)return this;let a=e9(e,rq),{minDaysInFirstWeek:s,startOfWeek:o}=eP(a,this.loc),u=!eN(a.weekYear)||!eN(a.weekNumber)||!eN(a.weekday),d=!eN(a.ordinal),c=!eN(a.year),h=!eN(a.month)||!eN(a.day),p=a.weekYear||a.weekNumber;if((c||h||d)&&p)throw new l("Can't mix weekYear/weekNumber units with year/month/day or ordinals");if(h&&d)throw new l("Can't mix ordinal dates with month/day");u?i=eO({...eA(this.c,s,o),...a},s,o):eN(a.ordinal)?(i={...this.toObject(),...a},eN(a.day)&&(i.day=Math.min(eZ(i.year,i.month),i.day))):i=eC({...eD(this.c),...a});let[m,f]=(t=i,r=this.o,n=this.zone,rk(e0(t),r,n));return rj(this,{ts:m,o:f})}plus(e){return this.isValid?rj(this,rO(this,ri.fromDurationLike(e))):this}minus(e){return this.isValid?rj(this,rO(this,ri.fromDurationLike(e).negate())):this}startOf(e,{useLocaleWeeks:t=!1}={}){if(!this.isValid)return this;let r={},n=ri.normalizeUnit(e);switch(n){case"years":r.month=1;case"quarters":case"months":r.day=1;case"weeks":case"days":r.hour=0;case"hours":r.minute=0;case"minutes":r.second=0;case"seconds":r.millisecond=0}if("weeks"===n)if(t){let e=this.loc.getStartOfWeek(),{weekday:t}=this;t<e&&(r.weekNumber=this.weekNumber-1),r.weekday=e}else r.weekday=1;return"quarters"===n&&(r.month=(Math.ceil(this.month/3)-1)*3+1),this.set(r)}endOf(e,t){return this.isValid?this.plus({[e]:1}).startOf(e,t).minus(1):this}toFormat(e,t={}){return this.isValid?tf.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this,e):rw}toLocaleString(e=f,t={}){return this.isValid?tf.create(this.loc.clone(t),e).formatDateTime(this):rw}toLocaleParts(e={}){return this.isValid?tf.create(this.loc.clone(e),e).formatDateTimeParts(this):[]}toISO({format:e="extended",suppressSeconds:t=!1,suppressMilliseconds:r=!1,includeOffset:n=!0,extendedZone:i=!1,precision:a="milliseconds"}={}){if(!this.isValid)return null;a=rV(a);let s="extended"===e,o=rP(this,s,a);return rJ.indexOf(a)>=3&&(o+="T"),o+=r_(this,s,t,r,n,i,a)}toISODate({format:e="extended",precision:t="day"}={}){return this.isValid?rP(this,"extended"===e,rV(t)):null}toISOWeekDate(){return rC(this,"kkkk-'W'WW-c")}toISOTime({suppressMilliseconds:e=!1,suppressSeconds:t=!1,includeOffset:r=!0,includePrefix:n=!1,extendedZone:i=!1,format:a="extended",precision:s="milliseconds"}={}){return this.isValid?(s=rV(s),(n&&rJ.indexOf(s)>=3?"T":"")+r_(this,"extended"===a,t,e,r,i,s)):null}toRFC2822(){return rC(this,"EEE, dd LLL yyyy HH:mm:ss ZZZ",!1)}toHTTP(){return rC(this.toUTC(),"EEE, dd LLL yyyy HH:mm:ss 'GMT'")}toSQLDate(){return this.isValid?rP(this,!0):null}toSQLTime({includeOffset:e=!0,includeZone:t=!1,includeOffsetSpace:r=!0}={}){let n="HH:mm:ss.SSS";return(t||e)&&(r&&(n+=" "),t?n+="z":e&&(n+="ZZ")),rC(this,n,!0)}toSQL(e={}){return this.isValid?`${this.toSQLDate()} ${this.toSQLTime(e)}`:null}toString(){return this.isValid?this.toISO():rw}[Symbol.for("nodejs.util.inspect.custom")](){return this.isValid?`DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`:`DateTime { Invalid, reason: ${this.invalidReason} }`}valueOf(){return this.toMillis()}toMillis(){return this.isValid?this.ts:NaN}toSeconds(){return this.isValid?this.ts/1e3:NaN}toUnixInteger(){return this.isValid?Math.floor(this.ts/1e3):NaN}toJSON(){return this.toISO()}toBSON(){return this.toJSDate()}toObject(e={}){if(!this.isValid)return{};let t={...this.c};return e.includeConfig&&(t.outputCalendar=this.outputCalendar,t.numberingSystem=this.loc.numberingSystem,t.locale=this.loc.locale),t}toJSDate(){return new Date(this.isValid?this.ts:NaN)}diff(e,t="milliseconds",r={}){if(!this.isValid||!e.isValid)return ri.invalid("created by diffing an invalid DateTime");let n={locale:this.locale,numberingSystem:this.numberingSystem,...r},i=(Array.isArray(t)?t:[t]).map(ri.normalizeUnit),a=e.valueOf()>this.valueOf(),s=function(e,t,r,n){let[i,a,s,o]=function(e,t,r){let n,i,a={},s=e;for(let[o,l]of[["years",(e,t)=>t.year-e.year],["quarters",(e,t)=>t.quarter-e.quarter+(t.year-e.year)*4],["months",(e,t)=>t.month-e.month+(t.year-e.year)*12],["weeks",(e,t)=>{let r=rl(e,t);return(r-r%7)/7}],["days",rl]])r.indexOf(o)>=0&&(n=o,a[o]=l(e,t),(i=s.plus(a))>t?(a[o]--,(e=s.plus(a))>t&&(i=e,a[o]--,e=s.plus(a))):e=i);return[e,a,i,n]}(e,t,r),l=t-i,u=r.filter(e=>["hours","minutes","seconds","milliseconds"].indexOf(e)>=0);0===u.length&&(s<t&&(s=i.plus({[o]:1})),s!==i&&(a[o]=(a[o]||0)+l/(s-i)));let d=ri.fromObject(a,n);return u.length>0?ri.fromMillis(l,n).shiftTo(...u).plus(d):d}(a?this:e,a?e:this,i,n);return a?s.negate():s}diffNow(e="milliseconds",t={}){return this.diff(rW.now(),e,t)}until(e){return this.isValid?rs.fromDateTimes(this,e):this}hasSame(e,t,r){if(!this.isValid)return!1;let n=e.valueOf(),i=this.setZone(e.zone,{keepLocalTime:!0});return i.startOf(t,r)<=n&&n<=i.endOf(t,r)}equals(e){return this.isValid&&e.isValid&&this.valueOf()===e.valueOf()&&this.zone.equals(e.zone)&&this.loc.equals(e.loc)}toRelative(e={}){if(!this.isValid)return null;let t=e.base||rW.fromObject({},{zone:this.zone}),r=e.padding?this<t?-e.padding:e.padding:0,n=["years","months","days","hours","minutes","seconds"],i=e.unit;return Array.isArray(e.unit)&&(n=e.unit,i=void 0),rB(t,this.plus(r),{...e,numeric:"always",units:n,unit:i})}toRelativeCalendar(e={}){return this.isValid?rB(e.base||rW.fromObject({},{zone:this.zone}),this,{...e,numeric:"auto",units:["years","months","days"],calendary:!0}):null}static min(...e){if(!e.every(rW.isDateTime))throw new d("min requires all arguments be DateTimes");return eV(e,e=>e.valueOf(),Math.min)}static max(...e){if(!e.every(rW.isDateTime))throw new d("max requires all arguments be DateTimes");return eV(e,e=>e.valueOf(),Math.max)}static fromFormatExplain(e,t,r={}){let{locale:n=null,numberingSystem:i=null}=r;return rS(ei.fromOpts({locale:n,numberingSystem:i,defaultToEN:!0}),e,t)}static fromStringExplain(e,t,r={}){return rW.fromFormatExplain(e,t,r)}static buildFormatParser(e,t={}){let{locale:r=null,numberingSystem:n=null}=t;return new rK(ei.fromOpts({locale:r,numberingSystem:n,defaultToEN:!0}),e)}static fromFormatParser(e,t,r={}){if(eN(e)||eN(t))throw new d("fromFormatParser requires an input string and a format parser");let{locale:n=null,numberingSystem:i=null}=r,a=ei.fromOpts({locale:n,numberingSystem:i,defaultToEN:!0});if(!a.equals(t.locale))throw new d(`fromFormatParser called with a locale of ${a}, but the format parser was created for ${t.locale}`);let{result:s,zone:o,specificOffset:l,invalidReason:u}=t.explainFromTokens(e);return u?rW.invalid(u):rD(s,o,r,`format ${t.format}`,e,l)}static get DATE_SHORT(){return f}static get DATE_MED(){return y}static get DATE_MED_WITH_WEEKDAY(){return b}static get DATE_FULL(){return g}static get DATE_HUGE(){return v}static get TIME_SIMPLE(){return E}static get TIME_WITH_SECONDS(){return K}static get TIME_WITH_SHORT_OFFSET(){return S}static get TIME_WITH_LONG_OFFSET(){return I}static get TIME_24_SIMPLE(){return w}static get TIME_24_WITH_SECONDS(){return x}static get TIME_24_WITH_SHORT_OFFSET(){return T}static get TIME_24_WITH_LONG_OFFSET(){return R}static get DATETIME_SHORT(){return j}static get DATETIME_SHORT_WITH_SECONDS(){return k}static get DATETIME_MED(){return A}static get DATETIME_MED_WITH_SECONDS(){return O}static get DATETIME_MED_WITH_WEEKDAY(){return D}static get DATETIME_FULL(){return C}static get DATETIME_FULL_WITH_SECONDS(){return P}static get DATETIME_HUGE(){return _}static get DATETIME_HUGE_WITH_SECONDS(){return M}}function rH(e){if(rW.isDateTime(e))return e;if(e&&e.valueOf&&eL(e.valueOf()))return rW.fromJSDate(e);if(e&&"object"==typeof e)return rW.fromObject(e);throw new d(`Unknown datetime argument: ${e}, of type ${typeof e}`)}r.DateTime=rW,r.Duration=ri,r.FixedOffsetZone=es,r.IANAZone=q,r.Info=ro,r.Interval=rs,r.InvalidZone=eo,r.Settings=eS,r.SystemZone=J,r.VERSION="3.7.2",r.Zone=N},795510,(e,t,r)=>{"use strict";var n=e.r(662470);function i(e,t){var r={zone:t};if(e?e instanceof i?this._date=e._date:e instanceof Date?this._date=n.DateTime.fromJSDate(e,r):"number"==typeof e?this._date=n.DateTime.fromMillis(e,r):"string"==typeof e&&(this._date=n.DateTime.fromISO(e,r),this._date.isValid||(this._date=n.DateTime.fromRFC2822(e,r)),this._date.isValid||(this._date=n.DateTime.fromSQL(e,r)),this._date.isValid||(this._date=n.DateTime.fromFormat(e,"EEE, d MMM yyyy HH:mm:ss",r))):this._date=n.DateTime.local(),!this._date||!this._date.isValid)throw Error("CronDate: unhandled timestamp: "+JSON.stringify(e));t&&t!==this._date.zoneName&&(this._date=this._date.setZone(t))}i.prototype.addYear=function(){this._date=this._date.plus({years:1})},i.prototype.addMonth=function(){this._date=this._date.plus({months:1}).startOf("month")},i.prototype.addDay=function(){this._date=this._date.plus({days:1}).startOf("day")},i.prototype.addHour=function(){var e=this._date;this._date=this._date.plus({hours:1}).startOf("hour"),this._date<=e&&(this._date=this._date.plus({hours:1}))},i.prototype.addMinute=function(){var e=this._date;this._date=this._date.plus({minutes:1}).startOf("minute"),this._date<e&&(this._date=this._date.plus({hours:1}))},i.prototype.addSecond=function(){var e=this._date;this._date=this._date.plus({seconds:1}).startOf("second"),this._date<e&&(this._date=this._date.plus({hours:1}))},i.prototype.subtractYear=function(){this._date=this._date.minus({years:1})},i.prototype.subtractMonth=function(){this._date=this._date.minus({months:1}).endOf("month").startOf("second")},i.prototype.subtractDay=function(){this._date=this._date.minus({days:1}).endOf("day").startOf("second")},i.prototype.subtractHour=function(){var e=this._date;this._date=this._date.minus({hours:1}).endOf("hour").startOf("second"),this._date>=e&&(this._date=this._date.minus({hours:1}))},i.prototype.subtractMinute=function(){var e=this._date;this._date=this._date.minus({minutes:1}).endOf("minute").startOf("second"),this._date>e&&(this._date=this._date.minus({hours:1}))},i.prototype.subtractSecond=function(){var e=this._date;this._date=this._date.minus({seconds:1}).startOf("second"),this._date>e&&(this._date=this._date.minus({hours:1}))},i.prototype.getDate=function(){return this._date.day},i.prototype.getFullYear=function(){return this._date.year},i.prototype.getDay=function(){var e=this._date.weekday;return 7==e?0:e},i.prototype.getMonth=function(){return this._date.month-1},i.prototype.getHours=function(){return this._date.hour},i.prototype.getMinutes=function(){return this._date.minute},i.prototype.getSeconds=function(){return this._date.second},i.prototype.getMilliseconds=function(){return this._date.millisecond},i.prototype.getTime=function(){return this._date.valueOf()},i.prototype.getUTCDate=function(){return this._getUTC().day},i.prototype.getUTCFullYear=function(){return this._getUTC().year},i.prototype.getUTCDay=function(){var e=this._getUTC().weekday;return 7==e?0:e},i.prototype.getUTCMonth=function(){return this._getUTC().month-1},i.prototype.getUTCHours=function(){return this._getUTC().hour},i.prototype.getUTCMinutes=function(){return this._getUTC().minute},i.prototype.getUTCSeconds=function(){return this._getUTC().second},i.prototype.toISOString=function(){return this._date.toUTC().toISO()},i.prototype.toJSON=function(){return this._date.toJSON()},i.prototype.setDate=function(e){this._date=this._date.set({day:e})},i.prototype.setFullYear=function(e){this._date=this._date.set({year:e})},i.prototype.setDay=function(e){this._date=this._date.set({weekday:e})},i.prototype.setMonth=function(e){this._date=this._date.set({month:e+1})},i.prototype.setHours=function(e){this._date=this._date.set({hour:e})},i.prototype.setMinutes=function(e){this._date=this._date.set({minute:e})},i.prototype.setSeconds=function(e){this._date=this._date.set({second:e})},i.prototype.setMilliseconds=function(e){this._date=this._date.set({millisecond:e})},i.prototype._getUTC=function(){return this._date.toUTC()},i.prototype.toString=function(){return this.toDate().toString()},i.prototype.toDate=function(){return this._date.toJSDate()},i.prototype.isLastDayOfMonth=function(){var e=this._date.plus({days:1}).startOf("day");return this._date.month!==e.month},i.prototype.isLastWeekdayOfMonth=function(){var e=this._date.plus({days:7}).startOf("day");return this._date.month!==e.month},t.exports=i},710075,(e,t,r)=>{"use strict";function n(e){return{start:e,count:1}}function i(e,t){e.end=t,e.step=t-e.start,e.count=2}function a(e,t,r){t&&(2===t.count?(e.push(n(t.start)),e.push(n(t.end))):e.push(t)),r&&e.push(r)}t.exports=function(e){for(var t=[],r=void 0,s=0;s<e.length;s++){var o=e[s];"number"!=typeof o?(a(t,r,n(o)),r=void 0):r?1===r.count?i(r,o):r.step===o-r.end?(r.count++,r.end=o):2===r.count?(t.push(n(r.start)),i(r=n(r.end),o)):(a(t,r),r=n(o)):r=n(o)}return a(t,r),t}},466619,(e,t,r)=>{"use strict";var n=e.r(710075);t.exports=function(e,t,r){var i=n(e);if(1===i.length){var a=i[0],s=a.step;if(1===s&&a.start===t&&a.end===r)return"*";if(1!==s&&a.start===t&&a.end===r-s+1)return"*/"+s}for(var o=[],l=0,u=i.length;l<u;++l){var d=i[l];if(1===d.count){o.push(d.start);continue}var s=d.step;if(1===d.step){o.push(d.start+"-"+d.end);continue}var c=0==d.start?d.count-1:d.count;d.step*c>d.end?o=o.concat(Array.from({length:d.end-d.start+1}).map(function(e,t){var r=d.start+t;return(r-d.start)%d.step==0?r:null}).filter(function(e){return null!=e})):d.end===r-d.step+1?o.push(d.start+"/"+d.step):o.push(d.start+"-"+d.end+"/"+d.step)}return o.join(",")}},601925,(e,t,r)=>{"use strict";var n=e.r(795510),i=e.r(466619);function a(e,t){this._options=t,this._utc=t.utc||!1,this._tz=this._utc?"UTC":t.tz,this._currentDate=new n(t.currentDate,this._tz),this._startDate=t.startDate?new n(t.startDate,this._tz):null,this._endDate=t.endDate?new n(t.endDate,this._tz):null,this._isIterator=t.iterator||!1,this._hasIterated=!1,this._nthDayOfWeek=t.nthDayOfWeek||0,this.fields=a._freezeFields(e)}a.map=["second","minute","hour","dayOfMonth","month","dayOfWeek"],a.predefined={"@yearly":"0 0 1 1 *","@monthly":"0 0 1 * *","@weekly":"0 0 * * 0","@daily":"0 0 * * *","@hourly":"0 * * * *"},a.constraints=[{min:0,max:59,chars:[]},{min:0,max:59,chars:[]},{min:0,max:23,chars:[]},{min:1,max:31,chars:["L"]},{min:1,max:12,chars:[]},{min:0,max:7,chars:["L"]}],a.daysInMonth=[31,29,31,30,31,30,31,31,30,31,30,31],a.aliases={month:{jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12},dayOfWeek:{sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6}},a.parseDefaults=["0","*","*","*","*","*"],a.standardValidCharacters=/^[,*\d/-]+$/,a.dayOfWeekValidCharacters=/^[?,*\dL#/-]+$/,a.dayOfMonthValidCharacters=/^[?,*\dL/-]+$/,a.validCharacters={second:a.standardValidCharacters,minute:a.standardValidCharacters,hour:a.standardValidCharacters,dayOfMonth:a.dayOfMonthValidCharacters,month:a.standardValidCharacters,dayOfWeek:a.dayOfWeekValidCharacters},a._isValidConstraintChar=function(e,t){return"string"==typeof t&&e.chars.some(function(e){return t.indexOf(e)>-1})},a._parseField=function(e,t,r){switch(e){case"month":case"dayOfWeek":var n=a.aliases[e];t=t.replace(/[a-z]{3}/gi,function(e){if(void 0!==n[e=e.toLowerCase()])return n[e];throw Error('Validation error, cannot resolve alias "'+e+'"')})}if(!a.validCharacters[e].test(t))throw Error("Invalid characters, got value: "+t);function i(e){var t=e.split("/");if(t.length>2)throw Error("Invalid repeat: "+e);return t.length>1?(t[0]==+t[0]&&(t=[t[0]+"-"+r.max,t[1]]),s(t[0],t[t.length-1])):s(e,1)}function s(t,n){var i=[],a=t.split("-");if(a.length>1){if(a.length<2)return+t;if(!a[0].length){if(!a[1].length)throw Error("Invalid range: "+t);return+t}var s=+a[0],o=+a[1];if(Number.isNaN(s)||Number.isNaN(o)||s<r.min||o>r.max)throw Error("Constraint error, got range "+s+"-"+o+" expected range "+r.min+"-"+r.max);if(s>o)throw Error("Invalid range: "+t);var l=+n;if(Number.isNaN(l)||l<=0)throw Error("Constraint error, cannot repeat at every "+l+" time.");"dayOfWeek"===e&&o%7==0&&i.push(0);for(var u=s;u<=o;u++)-1===i.indexOf(u)&&l>0&&l%n==0?(l=1,i.push(u)):l++;return i}return Number.isNaN(+t)?t:+t}return -1!==t.indexOf("*")?t=t.replace(/\*/g,r.min+"-"+r.max):-1!==t.indexOf("?")&&(t=t.replace(/\?/g,r.min+"-"+r.max)),function(t){var n=[];function s(t){if(t instanceof Array)for(var i=0,s=t.length;i<s;i++){var o=t[i];if(a._isValidConstraintChar(r,o)){n.push(o);continue}if("number"!=typeof o||Number.isNaN(o)||o<r.min||o>r.max)throw Error("Constraint error, got value "+o+" expected range "+r.min+"-"+r.max);n.push(o)}else{if(a._isValidConstraintChar(r,t))return void n.push(t);var l=+t;if(Number.isNaN(l)||l<r.min||l>r.max)throw Error("Constraint error, got value "+t+" expected range "+r.min+"-"+r.max);"dayOfWeek"===e&&(l%=7),n.push(l)}}var o=t.split(",");if(!o.every(function(e){return e.length>0}))throw Error("Invalid list value format");if(o.length>1)for(var l=0,u=o.length;l<u;l++)s(i(o[l]));else s(i(t));return n.sort(a._sortCompareFn),n}(t)},a._sortCompareFn=function(e,t){var r="number"==typeof e,n="number"==typeof t;return r&&n?e-t:!r&&n?1:r&&!n?-1:e.localeCompare(t)},a._handleMaxDaysInMonth=function(e){if(1===e.month.length){var t=a.daysInMonth[e.month[0]-1];if(e.dayOfMonth[0]>t)throw Error("Invalid explicit day of month definition");return e.dayOfMonth.filter(function(e){return"L"===e||e<=t}).sort(a._sortCompareFn)}},a._freezeFields=function(e){for(var t=0,r=a.map.length;t<r;++t){var n=a.map[t],i=e[n];e[n]=Object.freeze(i)}return Object.freeze(e)},a.prototype._applyTimezoneShift=function(e,t,r){if("Month"===r||"Day"===r){var n=e.getTime();e[t+r](),n===e.getTime()&&(0===e.getMinutes()&&0===e.getSeconds()?e.addHour():59===e.getMinutes()&&59===e.getSeconds()&&e.subtractHour())}else{var i=e.getHours();e[t+r]();var a=e.getHours(),s=a-i;2===s?24!==this.fields.hour.length&&(this._dstStart=a):0===s&&0===e.getMinutes()&&0===e.getSeconds()&&24!==this.fields.hour.length&&(this._dstEnd=a)}},a.prototype._findSchedule=function(e){function t(e,t){for(var r=0,n=t.length;r<n;r++)if(t[r]>=e)return t[r]===e;return t[0]===e}function r(e){return e.length>0&&e.some(function(e){return"string"==typeof e&&e.indexOf("L")>=0})}for(var i=(e=e||!1)?"subtract":"add",s=new n(this._currentDate,this._tz),o=this._startDate,l=this._endDate,u=s.getTime(),d=0;d<1e4;){if(d++,e){if(o&&s.getTime()-o.getTime()<0)throw Error("Out of the timespan range")}else if(l&&l.getTime()-s.getTime()<0)throw Error("Out of the timespan range");var c=t(s.getDate(),this.fields.dayOfMonth);r(this.fields.dayOfMonth)&&(c=c||s.isLastDayOfMonth());var h=t(s.getDay(),this.fields.dayOfWeek);r(this.fields.dayOfWeek)&&(h=h||this.fields.dayOfWeek.some(function(e){if(!r([e]))return!1;var t=Number.parseInt(e[0])%7;if(Number.isNaN(t))throw Error("Invalid last weekday of the month expression: "+e);return s.getDay()===t&&s.isLastWeekdayOfMonth()}));var p=this.fields.dayOfMonth.length>=a.daysInMonth[s.getMonth()],m=this.fields.dayOfWeek.length===a.constraints[5].max-a.constraints[5].min+1,f=s.getHours();if(!c&&(!h||m)||!p&&m&&!c||p&&!m&&!h||this._nthDayOfWeek>0&&!function(e,t){if(t<6){if(8>e.getDate()&&1===t)return!0;var r=e.getDate()%7?1:0;return Math.floor((e.getDate()-e.getDate()%7)/7)+r===t}return!1}(s,this._nthDayOfWeek)){this._applyTimezoneShift(s,i,"Day");continue}if(!t(s.getMonth()+1,this.fields.month)){this._applyTimezoneShift(s,i,"Month");continue}if(t(f,this.fields.hour)){if(this._dstEnd===f&&!e){this._dstEnd=null,this._applyTimezoneShift(s,"add","Hour");continue}}else if(this._dstStart!==f){this._dstStart=null,this._applyTimezoneShift(s,i,"Hour");continue}else if(!t(f-1,this.fields.hour)){s[i+"Hour"]();continue}if(!t(s.getMinutes(),this.fields.minute)){this._applyTimezoneShift(s,i,"Minute");continue}if(!t(s.getSeconds(),this.fields.second)){this._applyTimezoneShift(s,i,"Second");continue}if(u===s.getTime()){"add"===i||0===s.getMilliseconds()?this._applyTimezoneShift(s,i,"Second"):s.setMilliseconds(0);continue}break}if(d>=1e4)throw Error("Invalid expression, loop limit exceeded");return this._currentDate=new n(s,this._tz),this._hasIterated=!0,s},a.prototype.next=function(){var e=this._findSchedule();return this._isIterator?{value:e,done:!this.hasNext()}:e},a.prototype.prev=function(){var e=this._findSchedule(!0);return this._isIterator?{value:e,done:!this.hasPrev()}:e},a.prototype.hasNext=function(){var e=this._currentDate,t=this._hasIterated;try{return this._findSchedule(),!0}catch(e){return!1}finally{this._currentDate=e,this._hasIterated=t}},a.prototype.hasPrev=function(){var e=this._currentDate,t=this._hasIterated;try{return this._findSchedule(!0),!0}catch(e){return!1}finally{this._currentDate=e,this._hasIterated=t}},a.prototype.iterate=function(e,t){var r=[];if(e>=0)for(var n=0,i=e;n<i;n++)try{var a=this.next();r.push(a),t&&t(a,n)}catch(e){break}else for(var n=0,i=e;n>i;n--)try{var a=this.prev();r.push(a),t&&t(a,n)}catch(e){break}return r},a.prototype.reset=function(e){this._currentDate=new n(e||this._options.currentDate)},a.prototype.stringify=function(e){for(var t=[],r=+!e,n=a.map.length;r<n;++r){var s=a.map[r],o=this.fields[s],l=a.constraints[r];"dayOfMonth"===s&&1===this.fields.month.length?l={min:1,max:a.daysInMonth[this.fields.month[0]-1]}:"dayOfWeek"===s&&(l={min:0,max:6},o=7===o[o.length-1]?o.slice(0,-1):o),t.push(i(o,l.min,l.max))}return t.join(" ")},a.parse=function(e,t){var r=this;return"function"==typeof t&&(t={}),function(e,t){t||(t={}),void 0===t.currentDate&&(t.currentDate=new n(void 0,r._tz)),a.predefined[e]&&(e=a.predefined[e]);var i=[],s=(e+"").trim().split(/\s+/);if(s.length>6)throw Error("Invalid cron expression");for(var o=a.map.length-s.length,l=0,u=a.map.length;l<u;++l){var d=a.map[l],c=s[s.length>u?l:l-o];if(l<o||!c)i.push(a._parseField(d,a.parseDefaults[l],a.constraints[l]));else{var h="dayOfWeek"===d?function(e){var r=e.split("#");if(r.length>1){var n=+r[r.length-1];if(/,/.test(e))throw Error("Constraint error, invalid dayOfWeek `#` and `,` special characters are incompatible");if(/\//.test(e))throw Error("Constraint error, invalid dayOfWeek `#` and `/` special characters are incompatible");if(/-/.test(e))throw Error("Constraint error, invalid dayOfWeek `#` and `-` special characters are incompatible");if(r.length>2||Number.isNaN(n)||n<1||n>5)throw Error("Constraint error, invalid dayOfWeek occurrence number (#)");return t.nthDayOfWeek=n,r[0]}return e}(c):c;i.push(a._parseField(d,h,a.constraints[l]))}}for(var p={},l=0,u=a.map.length;l<u;l++)p[a.map[l]]=i[l];var m=a._handleMaxDaysInMonth(p);return p.dayOfMonth=m||p.dayOfMonth,new a(p,t)}(e,t)},a.fieldsToExpression=function(e,t){for(var r={},n=0,i=a.map.length;n<i;++n){var s=a.map[n],o=e[s];!function(e,t,r){if(!t)throw Error("Validation error, Field "+e+" is missing");if(0===t.length)throw Error("Validation error, Field "+e+" contains no values");for(var n=0,i=t.length;n<i;n++){var s=t[n];if(!a._isValidConstraintChar(r,s)&&("number"!=typeof s||Number.isNaN(s)||s<r.min||s>r.max))throw Error("Constraint error, got value "+s+" expected range "+r.min+"-"+r.max)}}(s,o,a.constraints[n]);for(var l=[],u=-1;++u<o.length;)l[u]=o[u];if((o=l.sort(a._sortCompareFn).filter(function(e,t,r){return!t||e!==r[t-1]})).length!==l.length)throw Error("Validation error, Field "+s+" contains duplicate values");r[s]=o}var d=a._handleMaxDaysInMonth(r);return r.dayOfMonth=d||r.dayOfMonth,new a(r,t||{})},t.exports=a},612886,(e,t,r)=>{"use strict";var n=e.r(601925);function i(){}i._parseEntry=function(e){var t=e.split(" ");if(6===t.length)return{interval:n.parse(e)};if(t.length>6)return{interval:n.parse(t.slice(0,6).join(" ")),command:t.slice(6,t.length)};throw Error("Invalid entry: "+e)},i.parseExpression=function(e,t){return n.parse(e,t)},i.fieldsToExpression=function(e,t){return n.fieldsToExpression(e,t)},i.parseString=function(e){for(var t=e.split("\n"),r={variables:{},expressions:[],errors:{}},n=0,a=t.length;n<a;n++){var s=t[n],o=null,l=s.trim();if(l.length>0)if(l.match(/^#/))continue;else if(o=l.match(/^(.*)=(.*)$/))r.variables[o[1]]=o[2];else{var u=null;try{u=i._parseEntry("0 "+l),r.expressions.push(u.interval)}catch(e){r.errors[l]=e}}}return r},i.parseFile=function(t,r){e.r(522734).readFile(t,function(e,t){return e?void r(e):r(null,i.parseString(t.toString()))})},t.exports=i},783295,(e,t,r)=>{let{EventEmitter:n}=e.r(427699);class AbortSignal{constructor(){this.eventEmitter=new n,this.onabort=null,this.aborted=!1,this.reason=void 0}toString(){return"[object AbortSignal]"}get[Symbol.toStringTag](){return"AbortSignal"}removeEventListener(e,t){this.eventEmitter.removeListener(e,t)}addEventListener(e,t){this.eventEmitter.on(e,t)}dispatchEvent(e){let t={type:e,target:this},r=`on${e}`;"function"==typeof this[r]&&this[r](t),this.eventEmitter.emit(e,t)}throwIfAborted(){if(this.aborted)throw this.reason}static abort(e){let t=new i;return t.abort(),t.signal}static timeout(e){let t=new i;return setTimeout(()=>t.abort(Error("TimeoutError")),e),t.signal}}class i{constructor(){this.signal=new AbortSignal}abort(e){this.signal.aborted||(this.signal.aborted=!0,e?this.signal.reason=e:this.signal.reason=Error("AbortError"),this.signal.dispatchEvent("abort"))}toString(){return"[object AbortController]"}get[Symbol.toStringTag](){return"AbortController"}}t.exports={AbortController:i,AbortSignal}},419372,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={ACTION_SUFFIX:function(){return y},APP_DIR_ALIAS:function(){return L},CACHE_ONE_YEAR:function(){return j},DOT_NEXT_ALIAS:function(){return M},ESLINT_DEFAULT_DIRS:function(){return ei},GSP_NO_RETURNED_VALUE:function(){return Q},GSSP_COMPONENT_MEMBER_ERROR:function(){return et},GSSP_NO_RETURNED_VALUE:function(){return Z},HTML_CONTENT_TYPE_HEADER:function(){return s},INFINITE_CACHE:function(){return k},INSTRUMENTATION_HOOK_FILENAME:function(){return P},JSON_CONTENT_TYPE_HEADER:function(){return o},MATCHED_PATH_HEADER:function(){return d},MIDDLEWARE_FILENAME:function(){return A},MIDDLEWARE_LOCATION_REGEXP:function(){return O},NEXT_BODY_SUFFIX:function(){return v},NEXT_CACHE_IMPLICIT_TAG_ID:function(){return R},NEXT_CACHE_REVALIDATED_TAGS_HEADER:function(){return K},NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER:function(){return S},NEXT_CACHE_SOFT_TAG_MAX_LENGTH:function(){return T},NEXT_CACHE_TAGS_HEADER:function(){return E},NEXT_CACHE_TAG_MAX_ITEMS:function(){return w},NEXT_CACHE_TAG_MAX_LENGTH:function(){return x},NEXT_DATA_SUFFIX:function(){return b},NEXT_INTERCEPTION_MARKER_PREFIX:function(){return u},NEXT_META_SUFFIX:function(){return g},NEXT_QUERY_PARAM_PREFIX:function(){return l},NEXT_RESUME_HEADER:function(){return I},NON_STANDARD_NODE_ENV:function(){return er},PAGES_DIR_ALIAS:function(){return _},PRERENDER_REVALIDATE_HEADER:function(){return c},PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER:function(){return h},PROXY_FILENAME:function(){return D},PROXY_LOCATION_REGEXP:function(){return C},PUBLIC_DIR_MIDDLEWARE_CONFLICT:function(){return U},ROOT_DIR_ALIAS:function(){return N},RSC_ACTION_CLIENT_WRAPPER_ALIAS:function(){return B},RSC_ACTION_ENCRYPTION_ALIAS:function(){return Y},RSC_ACTION_PROXY_ALIAS:function(){return G},RSC_ACTION_VALIDATE_ALIAS:function(){return F},RSC_CACHE_WRAPPER_ALIAS:function(){return V},RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS:function(){return q},RSC_MOD_REF_PROXY_ALIAS:function(){return J},RSC_SEGMENTS_DIR_SUFFIX:function(){return p},RSC_SEGMENT_SUFFIX:function(){return m},RSC_SUFFIX:function(){return f},SERVER_PROPS_EXPORT_ERROR:function(){return X},SERVER_PROPS_GET_INIT_PROPS_CONFLICT:function(){return W},SERVER_PROPS_SSG_CONFLICT:function(){return H},SERVER_RUNTIME:function(){return ea},SSG_FALLBACK_EXPORT_ERROR:function(){return en},SSG_GET_INITIAL_PROPS_CONFLICT:function(){return $},STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR:function(){return z},TEXT_PLAIN_CONTENT_TYPE_HEADER:function(){return a},UNSTABLE_REVALIDATE_RENAME_ERROR:function(){return ee},WEBPACK_LAYERS:function(){return el},WEBPACK_RESOURCE_QUERIES:function(){return eu},WEB_SOCKET_MAX_RECONNECTIONS:function(){return es}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a="text/plain",s="text/html; charset=utf-8",o="application/json; charset=utf-8",l="nxtP",u="nxtI",d="x-matched-path",c="x-prerender-revalidate",h="x-prerender-revalidate-if-generated",p=".segments",m=".segment.rsc",f=".rsc",y=".action",b=".json",g=".meta",v=".body",E="x-next-cache-tags",K="x-next-revalidated-tags",S="x-next-revalidate-tag-token",I="next-resume",w=128,x=256,T=1024,R="_N_T_",j=31536e3,k=0xfffffffe,A="middleware",O=`(?:src/)?${A}`,D="proxy",C=`(?:src/)?${D}`,P="instrumentation",_="private-next-pages",M="private-dot-next",N="private-next-root-dir",L="private-next-app-dir",J="private-next-rsc-mod-ref-proxy",F="private-next-rsc-action-validate",G="private-next-rsc-server-reference",V="private-next-rsc-cache-wrapper",q="private-next-rsc-track-dynamic-import",Y="private-next-rsc-action-encryption",B="private-next-rsc-action-client-wrapper",U="You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict",$="You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps",W="You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.",H="You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps",z="can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props",X="pages with `getServerSideProps` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export",Q="Your `getStaticProps` function did not return an object. Did you forget to add a `return`?",Z="Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?",ee="The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.",et="can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member",er='You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env',en="Pages with `fallback` enabled in `getStaticPaths` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export",ei=["app","pages","components","lib","src"],ea={edge:"edge",experimentalEdge:"experimental-edge",nodejs:"nodejs"},es=12,eo={shared:"shared",reactServerComponents:"rsc",serverSideRendering:"ssr",actionBrowser:"action-browser",apiNode:"api-node",apiEdge:"api-edge",middleware:"middleware",instrument:"instrument",edgeAsset:"edge-asset",appPagesBrowser:"app-pages-browser",pagesDirBrowser:"pages-dir-browser",pagesDirEdge:"pages-dir-edge",pagesDirNode:"pages-dir-node"},el={...eo,GROUP:{builtinReact:[eo.reactServerComponents,eo.actionBrowser],serverOnly:[eo.reactServerComponents,eo.actionBrowser,eo.instrument,eo.middleware],neutralTarget:[eo.apiNode,eo.apiEdge],clientOnly:[eo.serverSideRendering,eo.appPagesBrowser],bundled:[eo.reactServerComponents,eo.actionBrowser,eo.serverSideRendering,eo.appPagesBrowser,eo.shared,eo.instrument,eo.middleware],appPages:[eo.reactServerComponents,eo.serverSideRendering,eo.appPagesBrowser,eo.actionBrowser]}},eu={edgeSSREntry:"__next_edge_ssr_entry__",metadata:"__next_metadata__",metadataRoute:"__next_metadata_route__",metadataImageMeta:"__next_metadata_image_meta__"}},387064,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n,i,a,s,o,l,u,d,c,h,p,m,f={AppRenderSpan:function(){return I},AppRouteRouteHandlersSpan:function(){return T},BaseServerSpan:function(){return b},LoadComponentsSpan:function(){return g},LogSpanAllowList:function(){return A},MiddlewareSpan:function(){return j},NextNodeServerSpan:function(){return E},NextServerSpan:function(){return v},NextVanillaSpanAllowlist:function(){return k},NodeSpan:function(){return x},RenderSpan:function(){return S},ResolveMetadataSpan:function(){return R},RouterSpan:function(){return w},StartServerSpan:function(){return K}};for(var y in f)Object.defineProperty(r,y,{enumerable:!0,get:f[y]});var b=((n=b||{}).handleRequest="BaseServer.handleRequest",n.run="BaseServer.run",n.pipe="BaseServer.pipe",n.getStaticHTML="BaseServer.getStaticHTML",n.render="BaseServer.render",n.renderToResponseWithComponents="BaseServer.renderToResponseWithComponents",n.renderToResponse="BaseServer.renderToResponse",n.renderToHTML="BaseServer.renderToHTML",n.renderError="BaseServer.renderError",n.renderErrorToResponse="BaseServer.renderErrorToResponse",n.renderErrorToHTML="BaseServer.renderErrorToHTML",n.render404="BaseServer.render404",n),g=((i=g||{}).loadDefaultErrorComponents="LoadComponents.loadDefaultErrorComponents",i.loadComponents="LoadComponents.loadComponents",i),v=((a=v||{}).getRequestHandler="NextServer.getRequestHandler",a.getRequestHandlerWithMetadata="NextServer.getRequestHandlerWithMetadata",a.getServer="NextServer.getServer",a.getServerRequestHandler="NextServer.getServerRequestHandler",a.createServer="createServer.createServer",a),E=((s=E||{}).compression="NextNodeServer.compression",s.getBuildId="NextNodeServer.getBuildId",s.createComponentTree="NextNodeServer.createComponentTree",s.clientComponentLoading="NextNodeServer.clientComponentLoading",s.getLayoutOrPageModule="NextNodeServer.getLayoutOrPageModule",s.generateStaticRoutes="NextNodeServer.generateStaticRoutes",s.generateFsStaticRoutes="NextNodeServer.generateFsStaticRoutes",s.generatePublicRoutes="NextNodeServer.generatePublicRoutes",s.generateImageRoutes="NextNodeServer.generateImageRoutes.route",s.sendRenderResult="NextNodeServer.sendRenderResult",s.proxyRequest="NextNodeServer.proxyRequest",s.runApi="NextNodeServer.runApi",s.render="NextNodeServer.render",s.renderHTML="NextNodeServer.renderHTML",s.imageOptimizer="NextNodeServer.imageOptimizer",s.getPagePath="NextNodeServer.getPagePath",s.getRoutesManifest="NextNodeServer.getRoutesManifest",s.findPageComponents="NextNodeServer.findPageComponents",s.getFontManifest="NextNodeServer.getFontManifest",s.getServerComponentManifest="NextNodeServer.getServerComponentManifest",s.getRequestHandler="NextNodeServer.getRequestHandler",s.renderToHTML="NextNodeServer.renderToHTML",s.renderError="NextNodeServer.renderError",s.renderErrorToHTML="NextNodeServer.renderErrorToHTML",s.render404="NextNodeServer.render404",s.startResponse="NextNodeServer.startResponse",s.route="route",s.onProxyReq="onProxyReq",s.apiResolver="apiResolver",s.internalFetch="internalFetch",s),K=((o=K||{}).startServer="startServer.startServer",o),S=((l=S||{}).getServerSideProps="Render.getServerSideProps",l.getStaticProps="Render.getStaticProps",l.renderToString="Render.renderToString",l.renderDocument="Render.renderDocument",l.createBodyResult="Render.createBodyResult",l),I=((u=I||{}).renderToString="AppRender.renderToString",u.renderToReadableStream="AppRender.renderToReadableStream",u.getBodyResult="AppRender.getBodyResult",u.fetch="AppRender.fetch",u),w=((d=w||{}).executeRoute="Router.executeRoute",d),x=((c=x||{}).runHandler="Node.runHandler",c),T=((h=T||{}).runHandler="AppRouteRouteHandlers.runHandler",h),R=((p=R||{}).generateMetadata="ResolveMetadata.generateMetadata",p.generateViewport="ResolveMetadata.generateViewport",p),j=((m=j||{}).execute="Middleware.execute",m);let k=new Set(["Middleware.execute","BaseServer.handleRequest","Render.getServerSideProps","Render.getStaticProps","AppRender.fetch","AppRender.getBodyResult","Render.renderDocument","Node.runHandler","AppRouteRouteHandlers.runHandler","ResolveMetadata.generateMetadata","ResolveMetadata.generateViewport","NextNodeServer.createComponentTree","NextNodeServer.findPageComponents","NextNodeServer.getLayoutOrPageModule","NextNodeServer.startResponse","NextNodeServer.clientComponentLoading"]),A=new Set(["NextNodeServer.findPageComponents","NextNodeServer.createComponentTree","NextNodeServer.clientComponentLoading"])},983782,(e,t,r)=>{"use strict";function n(e){return null!==e&&"object"==typeof e&&"then"in e&&"function"==typeof e.then}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isThenable",{enumerable:!0,get:function(){return n}})},371039,(e,t,r)=>{(()=>{"use strict";let r,n,i,a,s;var o,l,u,d,c,h,p,m,f,y,b,g,v,E,K,S,I={491:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ContextAPI=void 0;let n=r(223),i=r(172),a=r(930),s="context",o=new n.NoopContextManager;class l{static getInstance(){return this._instance||(this._instance=new l),this._instance}setGlobalContextManager(e){return(0,i.registerGlobal)(s,e,a.DiagAPI.instance())}active(){return this._getContextManager().active()}with(e,t,r,...n){return this._getContextManager().with(e,t,r,...n)}bind(e,t){return this._getContextManager().bind(e,t)}_getContextManager(){return(0,i.getGlobal)(s)||o}disable(){this._getContextManager().disable(),(0,i.unregisterGlobal)(s,a.DiagAPI.instance())}}t.ContextAPI=l},930:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DiagAPI=void 0;let n=r(56),i=r(912),a=r(957),s=r(172);class o{constructor(){function e(e){return function(...t){let r=(0,s.getGlobal)("diag");if(r)return r[e](...t)}}const t=this;t.setLogger=(e,r={logLevel:a.DiagLogLevel.INFO})=>{var n,o,l;if(e===t){let e=Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");return t.error(null!=(n=e.stack)?n:e.message),!1}"number"==typeof r&&(r={logLevel:r});let u=(0,s.getGlobal)("diag"),d=(0,i.createLogLevelDiagLogger)(null!=(o=r.logLevel)?o:a.DiagLogLevel.INFO,e);if(u&&!r.suppressOverrideMessage){let e=null!=(l=Error().stack)?l:"<failed to generate stacktrace>";u.warn(`Current logger will be overwritten from ${e}`),d.warn(`Current logger will overwrite one already registered from ${e}`)}return(0,s.registerGlobal)("diag",d,t,!0)},t.disable=()=>{(0,s.unregisterGlobal)("diag",t)},t.createComponentLogger=e=>new n.DiagComponentLogger(e),t.verbose=e("verbose"),t.debug=e("debug"),t.info=e("info"),t.warn=e("warn"),t.error=e("error")}static instance(){return this._instance||(this._instance=new o),this._instance}}t.DiagAPI=o},653:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MetricsAPI=void 0;let n=r(660),i=r(172),a=r(930),s="metrics";class o{static getInstance(){return this._instance||(this._instance=new o),this._instance}setGlobalMeterProvider(e){return(0,i.registerGlobal)(s,e,a.DiagAPI.instance())}getMeterProvider(){return(0,i.getGlobal)(s)||n.NOOP_METER_PROVIDER}getMeter(e,t,r){return this.getMeterProvider().getMeter(e,t,r)}disable(){(0,i.unregisterGlobal)(s,a.DiagAPI.instance())}}t.MetricsAPI=o},181:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PropagationAPI=void 0;let n=r(172),i=r(874),a=r(194),s=r(277),o=r(369),l=r(930),u="propagation",d=new i.NoopTextMapPropagator;class c{constructor(){this.createBaggage=o.createBaggage,this.getBaggage=s.getBaggage,this.getActiveBaggage=s.getActiveBaggage,this.setBaggage=s.setBaggage,this.deleteBaggage=s.deleteBaggage}static getInstance(){return this._instance||(this._instance=new c),this._instance}setGlobalPropagator(e){return(0,n.registerGlobal)(u,e,l.DiagAPI.instance())}inject(e,t,r=a.defaultTextMapSetter){return this._getGlobalPropagator().inject(e,t,r)}extract(e,t,r=a.defaultTextMapGetter){return this._getGlobalPropagator().extract(e,t,r)}fields(){return this._getGlobalPropagator().fields()}disable(){(0,n.unregisterGlobal)(u,l.DiagAPI.instance())}_getGlobalPropagator(){return(0,n.getGlobal)(u)||d}}t.PropagationAPI=c},997:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TraceAPI=void 0;let n=r(172),i=r(846),a=r(139),s=r(607),o=r(930),l="trace";class u{constructor(){this._proxyTracerProvider=new i.ProxyTracerProvider,this.wrapSpanContext=a.wrapSpanContext,this.isSpanContextValid=a.isSpanContextValid,this.deleteSpan=s.deleteSpan,this.getSpan=s.getSpan,this.getActiveSpan=s.getActiveSpan,this.getSpanContext=s.getSpanContext,this.setSpan=s.setSpan,this.setSpanContext=s.setSpanContext}static getInstance(){return this._instance||(this._instance=new u),this._instance}setGlobalTracerProvider(e){let t=(0,n.registerGlobal)(l,this._proxyTracerProvider,o.DiagAPI.instance());return t&&this._proxyTracerProvider.setDelegate(e),t}getTracerProvider(){return(0,n.getGlobal)(l)||this._proxyTracerProvider}getTracer(e,t){return this.getTracerProvider().getTracer(e,t)}disable(){(0,n.unregisterGlobal)(l,o.DiagAPI.instance()),this._proxyTracerProvider=new i.ProxyTracerProvider}}t.TraceAPI=u},277:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.deleteBaggage=t.setBaggage=t.getActiveBaggage=t.getBaggage=void 0;let n=r(491),i=(0,r(780).createContextKey)("OpenTelemetry Baggage Key");function a(e){return e.getValue(i)||void 0}t.getBaggage=a,t.getActiveBaggage=function(){return a(n.ContextAPI.getInstance().active())},t.setBaggage=function(e,t){return e.setValue(i,t)},t.deleteBaggage=function(e){return e.deleteValue(i)}},993:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BaggageImpl=void 0;class r{constructor(e){this._entries=e?new Map(e):new Map}getEntry(e){let t=this._entries.get(e);if(t)return Object.assign({},t)}getAllEntries(){return Array.from(this._entries.entries()).map(([e,t])=>[e,t])}setEntry(e,t){let n=new r(this._entries);return n._entries.set(e,t),n}removeEntry(e){let t=new r(this._entries);return t._entries.delete(e),t}removeEntries(...e){let t=new r(this._entries);for(let r of e)t._entries.delete(r);return t}clear(){return new r}}t.BaggageImpl=r},830:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.baggageEntryMetadataSymbol=void 0,t.baggageEntryMetadataSymbol=Symbol("BaggageEntryMetadata")},369:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.baggageEntryMetadataFromString=t.createBaggage=void 0;let n=r(930),i=r(993),a=r(830),s=n.DiagAPI.instance();t.createBaggage=function(e={}){return new i.BaggageImpl(new Map(Object.entries(e)))},t.baggageEntryMetadataFromString=function(e){return"string"!=typeof e&&(s.error(`Cannot create baggage metadata from unknown type: ${typeof e}`),e=""),{__TYPE__:a.baggageEntryMetadataSymbol,toString:()=>e}}},67:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.context=void 0,t.context=r(491).ContextAPI.getInstance()},223:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NoopContextManager=void 0;let n=r(780);t.NoopContextManager=class{active(){return n.ROOT_CONTEXT}with(e,t,r,...n){return t.call(r,...n)}bind(e,t){return t}enable(){return this}disable(){return this}}},780:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ROOT_CONTEXT=t.createContextKey=void 0,t.createContextKey=function(e){return Symbol.for(e)};class r{constructor(e){const t=this;t._currentContext=e?new Map(e):new Map,t.getValue=e=>t._currentContext.get(e),t.setValue=(e,n)=>{let i=new r(t._currentContext);return i._currentContext.set(e,n),i},t.deleteValue=e=>{let n=new r(t._currentContext);return n._currentContext.delete(e),n}}}t.ROOT_CONTEXT=new r},506:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.diag=void 0,t.diag=r(930).DiagAPI.instance()},56:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DiagComponentLogger=void 0;let n=r(172);function i(e,t,r){let i=(0,n.getGlobal)("diag");if(i)return r.unshift(t),i[e](...r)}t.DiagComponentLogger=class{constructor(e){this._namespace=e.namespace||"DiagComponentLogger"}debug(...e){return i("debug",this._namespace,e)}error(...e){return i("error",this._namespace,e)}info(...e){return i("info",this._namespace,e)}warn(...e){return i("warn",this._namespace,e)}verbose(...e){return i("verbose",this._namespace,e)}}},972:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DiagConsoleLogger=void 0;let r=[{n:"error",c:"error"},{n:"warn",c:"warn"},{n:"info",c:"info"},{n:"debug",c:"debug"},{n:"verbose",c:"trace"}];t.DiagConsoleLogger=class{constructor(){for(let e=0;e<r.length;e++)this[r[e].n]=function(e){return function(...t){if(console){let r=console[e];if("function"!=typeof r&&(r=console.log),"function"==typeof r)return r.apply(console,t)}}}(r[e].c)}}},912:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createLogLevelDiagLogger=void 0;let n=r(957);t.createLogLevelDiagLogger=function(e,t){function r(r,n){let i=t[r];return"function"==typeof i&&e>=n?i.bind(t):function(){}}return e<n.DiagLogLevel.NONE?e=n.DiagLogLevel.NONE:e>n.DiagLogLevel.ALL&&(e=n.DiagLogLevel.ALL),t=t||{},{error:r("error",n.DiagLogLevel.ERROR),warn:r("warn",n.DiagLogLevel.WARN),info:r("info",n.DiagLogLevel.INFO),debug:r("debug",n.DiagLogLevel.DEBUG),verbose:r("verbose",n.DiagLogLevel.VERBOSE)}}},957:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.DiagLogLevel=void 0,(r=t.DiagLogLevel||(t.DiagLogLevel={}))[r.NONE=0]="NONE",r[r.ERROR=30]="ERROR",r[r.WARN=50]="WARN",r[r.INFO=60]="INFO",r[r.DEBUG=70]="DEBUG",r[r.VERBOSE=80]="VERBOSE",r[r.ALL=9999]="ALL"},172:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.unregisterGlobal=t.getGlobal=t.registerGlobal=void 0;let n=r(200),i=r(521),a=r(130),s=i.VERSION.split(".")[0],o=Symbol.for(`opentelemetry.js.api.${s}`),l=n._globalThis;t.registerGlobal=function(e,t,r,n=!1){var a;let s=l[o]=null!=(a=l[o])?a:{version:i.VERSION};if(!n&&s[e]){let t=Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e}`);return r.error(t.stack||t.message),!1}if(s.version!==i.VERSION){let t=Error(`@opentelemetry/api: Registration of version v${s.version} for ${e} does not match previously registered API v${i.VERSION}`);return r.error(t.stack||t.message),!1}return s[e]=t,r.debug(`@opentelemetry/api: Registered a global for ${e} v${i.VERSION}.`),!0},t.getGlobal=function(e){var t,r;let n=null==(t=l[o])?void 0:t.version;if(n&&(0,a.isCompatible)(n))return null==(r=l[o])?void 0:r[e]},t.unregisterGlobal=function(e,t){t.debug(`@opentelemetry/api: Unregistering a global for ${e} v${i.VERSION}.`);let r=l[o];r&&delete r[e]}},130:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isCompatible=t._makeCompatibilityCheck=void 0;let n=r(521),i=/^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;function a(e){let t=new Set([e]),r=new Set,n=e.match(i);if(!n)return()=>!1;let a={major:+n[1],minor:+n[2],patch:+n[3],prerelease:n[4]};if(null!=a.prerelease)return function(t){return t===e};function s(e){return r.add(e),!1}return function(e){if(t.has(e))return!0;if(r.has(e))return!1;let n=e.match(i);if(!n)return s(e);let o={major:+n[1],minor:+n[2],patch:+n[3],prerelease:n[4]};if(null!=o.prerelease||a.major!==o.major)return s(e);if(0===a.major)return a.minor===o.minor&&a.patch<=o.patch?(t.add(e),!0):s(e);return a.minor<=o.minor?(t.add(e),!0):s(e)}}t._makeCompatibilityCheck=a,t.isCompatible=a(n.VERSION)},886:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.metrics=void 0,t.metrics=r(653).MetricsAPI.getInstance()},901:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.ValueType=void 0,(r=t.ValueType||(t.ValueType={}))[r.INT=0]="INT",r[r.DOUBLE=1]="DOUBLE"},102:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createNoopMeter=t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC=t.NOOP_OBSERVABLE_GAUGE_METRIC=t.NOOP_OBSERVABLE_COUNTER_METRIC=t.NOOP_UP_DOWN_COUNTER_METRIC=t.NOOP_HISTOGRAM_METRIC=t.NOOP_COUNTER_METRIC=t.NOOP_METER=t.NoopObservableUpDownCounterMetric=t.NoopObservableGaugeMetric=t.NoopObservableCounterMetric=t.NoopObservableMetric=t.NoopHistogramMetric=t.NoopUpDownCounterMetric=t.NoopCounterMetric=t.NoopMetric=t.NoopMeter=void 0;class r{createHistogram(e,r){return t.NOOP_HISTOGRAM_METRIC}createCounter(e,r){return t.NOOP_COUNTER_METRIC}createUpDownCounter(e,r){return t.NOOP_UP_DOWN_COUNTER_METRIC}createObservableGauge(e,r){return t.NOOP_OBSERVABLE_GAUGE_METRIC}createObservableCounter(e,r){return t.NOOP_OBSERVABLE_COUNTER_METRIC}createObservableUpDownCounter(e,r){return t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC}addBatchObservableCallback(e,t){}removeBatchObservableCallback(e){}}t.NoopMeter=r;class n{}t.NoopMetric=n;class i extends n{add(e,t){}}t.NoopCounterMetric=i;class a extends n{add(e,t){}}t.NoopUpDownCounterMetric=a;class s extends n{record(e,t){}}t.NoopHistogramMetric=s;class o{addCallback(e){}removeCallback(e){}}t.NoopObservableMetric=o;class l extends o{}t.NoopObservableCounterMetric=l;class u extends o{}t.NoopObservableGaugeMetric=u;class d extends o{}t.NoopObservableUpDownCounterMetric=d,t.NOOP_METER=new r,t.NOOP_COUNTER_METRIC=new i,t.NOOP_HISTOGRAM_METRIC=new s,t.NOOP_UP_DOWN_COUNTER_METRIC=new a,t.NOOP_OBSERVABLE_COUNTER_METRIC=new l,t.NOOP_OBSERVABLE_GAUGE_METRIC=new u,t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC=new d,t.createNoopMeter=function(){return t.NOOP_METER}},660:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NOOP_METER_PROVIDER=t.NoopMeterProvider=void 0;let n=r(102);class i{getMeter(e,t,r){return n.NOOP_METER}}t.NoopMeterProvider=i,t.NOOP_METER_PROVIDER=new i},200:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),i=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),i(r(46),t)},651:(t,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r._globalThis=void 0,r._globalThis="object"==typeof globalThis?globalThis:e.g},46:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),i=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),i(r(651),t)},939:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.propagation=void 0,t.propagation=r(181).PropagationAPI.getInstance()},874:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NoopTextMapPropagator=void 0,t.NoopTextMapPropagator=class{inject(e,t){}extract(e,t){return e}fields(){return[]}}},194:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.defaultTextMapSetter=t.defaultTextMapGetter=void 0,t.defaultTextMapGetter={get(e,t){if(null!=e)return e[t]},keys:e=>null==e?[]:Object.keys(e)},t.defaultTextMapSetter={set(e,t,r){null!=e&&(e[t]=r)}}},845:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.trace=void 0,t.trace=r(997).TraceAPI.getInstance()},403:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NonRecordingSpan=void 0;let n=r(476);t.NonRecordingSpan=class{constructor(e=n.INVALID_SPAN_CONTEXT){this._spanContext=e}spanContext(){return this._spanContext}setAttribute(e,t){return this}setAttributes(e){return this}addEvent(e,t){return this}setStatus(e){return this}updateName(e){return this}end(e){}isRecording(){return!1}recordException(e,t){}}},614:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NoopTracer=void 0;let n=r(491),i=r(607),a=r(403),s=r(139),o=n.ContextAPI.getInstance();t.NoopTracer=class{startSpan(e,t,r=o.active()){var n;if(null==t?void 0:t.root)return new a.NonRecordingSpan;let l=r&&(0,i.getSpanContext)(r);return"object"==typeof(n=l)&&"string"==typeof n.spanId&&"string"==typeof n.traceId&&"number"==typeof n.traceFlags&&(0,s.isSpanContextValid)(l)?new a.NonRecordingSpan(l):new a.NonRecordingSpan}startActiveSpan(e,t,r,n){let a,s,l;if(arguments.length<2)return;2==arguments.length?l=t:3==arguments.length?(a=t,l=r):(a=t,s=r,l=n);let u=null!=s?s:o.active(),d=this.startSpan(e,a,u),c=(0,i.setSpan)(u,d);return o.with(c,l,void 0,d)}}},124:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NoopTracerProvider=void 0;let n=r(614);t.NoopTracerProvider=class{getTracer(e,t,r){return new n.NoopTracer}}},125:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ProxyTracer=void 0;let n=new(r(614)).NoopTracer;t.ProxyTracer=class{constructor(e,t,r,n){this._provider=e,this.name=t,this.version=r,this.options=n}startSpan(e,t,r){return this._getTracer().startSpan(e,t,r)}startActiveSpan(e,t,r,n){let i=this._getTracer();return Reflect.apply(i.startActiveSpan,i,arguments)}_getTracer(){if(this._delegate)return this._delegate;let e=this._provider.getDelegateTracer(this.name,this.version,this.options);return e?(this._delegate=e,this._delegate):n}}},846:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ProxyTracerProvider=void 0;let n=r(125),i=new(r(124)).NoopTracerProvider;t.ProxyTracerProvider=class{getTracer(e,t,r){var i;return null!=(i=this.getDelegateTracer(e,t,r))?i:new n.ProxyTracer(this,e,t,r)}getDelegate(){var e;return null!=(e=this._delegate)?e:i}setDelegate(e){this._delegate=e}getDelegateTracer(e,t,r){var n;return null==(n=this._delegate)?void 0:n.getTracer(e,t,r)}}},996:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.SamplingDecision=void 0,(r=t.SamplingDecision||(t.SamplingDecision={}))[r.NOT_RECORD=0]="NOT_RECORD",r[r.RECORD=1]="RECORD",r[r.RECORD_AND_SAMPLED=2]="RECORD_AND_SAMPLED"},607:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSpanContext=t.setSpanContext=t.deleteSpan=t.setSpan=t.getActiveSpan=t.getSpan=void 0;let n=r(780),i=r(403),a=r(491),s=(0,n.createContextKey)("OpenTelemetry Context Key SPAN");function o(e){return e.getValue(s)||void 0}function l(e,t){return e.setValue(s,t)}t.getSpan=o,t.getActiveSpan=function(){return o(a.ContextAPI.getInstance().active())},t.setSpan=l,t.deleteSpan=function(e){return e.deleteValue(s)},t.setSpanContext=function(e,t){return l(e,new i.NonRecordingSpan(t))},t.getSpanContext=function(e){var t;return null==(t=o(e))?void 0:t.spanContext()}},325:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TraceStateImpl=void 0;let n=r(564);class i{constructor(e){this._internalState=new Map,e&&this._parse(e)}set(e,t){let r=this._clone();return r._internalState.has(e)&&r._internalState.delete(e),r._internalState.set(e,t),r}unset(e){let t=this._clone();return t._internalState.delete(e),t}get(e){return this._internalState.get(e)}serialize(){return this._keys().reduce((e,t)=>(e.push(t+"="+this.get(t)),e),[]).join(",")}_parse(e){!(e.length>512)&&(this._internalState=e.split(",").reverse().reduce((e,t)=>{let r=t.trim(),i=r.indexOf("=");if(-1!==i){let a=r.slice(0,i),s=r.slice(i+1,t.length);(0,n.validateKey)(a)&&(0,n.validateValue)(s)&&e.set(a,s)}return e},new Map),this._internalState.size>32&&(this._internalState=new Map(Array.from(this._internalState.entries()).reverse().slice(0,32))))}_keys(){return Array.from(this._internalState.keys()).reverse()}_clone(){let e=new i;return e._internalState=new Map(this._internalState),e}}t.TraceStateImpl=i},564:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.validateValue=t.validateKey=void 0;let r="[_0-9a-z-*/]",n=`[a-z]${r}{0,255}`,i=`[a-z0-9]${r}{0,240}@[a-z]${r}{0,13}`,a=RegExp(`^(?:${n}|${i})$`),s=/^[ -~]{0,255}[!-~]$/,o=/,|=/;t.validateKey=function(e){return a.test(e)},t.validateValue=function(e){return s.test(e)&&!o.test(e)}},98:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createTraceState=void 0;let n=r(325);t.createTraceState=function(e){return new n.TraceStateImpl(e)}},476:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.INVALID_SPAN_CONTEXT=t.INVALID_TRACEID=t.INVALID_SPANID=void 0;let n=r(475);t.INVALID_SPANID="0000000000000000",t.INVALID_TRACEID="00000000000000000000000000000000",t.INVALID_SPAN_CONTEXT={traceId:t.INVALID_TRACEID,spanId:t.INVALID_SPANID,traceFlags:n.TraceFlags.NONE}},357:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.SpanKind=void 0,(r=t.SpanKind||(t.SpanKind={}))[r.INTERNAL=0]="INTERNAL",r[r.SERVER=1]="SERVER",r[r.CLIENT=2]="CLIENT",r[r.PRODUCER=3]="PRODUCER",r[r.CONSUMER=4]="CONSUMER"},139:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.wrapSpanContext=t.isSpanContextValid=t.isValidSpanId=t.isValidTraceId=void 0;let n=r(476),i=r(403),a=/^([0-9a-f]{32})$/i,s=/^[0-9a-f]{16}$/i;function o(e){return a.test(e)&&e!==n.INVALID_TRACEID}function l(e){return s.test(e)&&e!==n.INVALID_SPANID}t.isValidTraceId=o,t.isValidSpanId=l,t.isSpanContextValid=function(e){return o(e.traceId)&&l(e.spanId)},t.wrapSpanContext=function(e){return new i.NonRecordingSpan(e)}},847:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.SpanStatusCode=void 0,(r=t.SpanStatusCode||(t.SpanStatusCode={}))[r.UNSET=0]="UNSET",r[r.OK=1]="OK",r[r.ERROR=2]="ERROR"},475:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.TraceFlags=void 0,(r=t.TraceFlags||(t.TraceFlags={}))[r.NONE=0]="NONE",r[r.SAMPLED=1]="SAMPLED"},521:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.VERSION=void 0,t.VERSION="1.6.0"}},w={};function x(e){var t=w[e];if(void 0!==t)return t.exports;var r=w[e]={exports:{}},n=!0;try{I[e].call(r.exports,r,r.exports,x),n=!1}finally{n&&delete w[e]}return r.exports}x.ab="/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";var T={};Object.defineProperty(T,"__esModule",{value:!0}),T.trace=T.propagation=T.metrics=T.diag=T.context=T.INVALID_SPAN_CONTEXT=T.INVALID_TRACEID=T.INVALID_SPANID=T.isValidSpanId=T.isValidTraceId=T.isSpanContextValid=T.createTraceState=T.TraceFlags=T.SpanStatusCode=T.SpanKind=T.SamplingDecision=T.ProxyTracerProvider=T.ProxyTracer=T.defaultTextMapSetter=T.defaultTextMapGetter=T.ValueType=T.createNoopMeter=T.DiagLogLevel=T.DiagConsoleLogger=T.ROOT_CONTEXT=T.createContextKey=T.baggageEntryMetadataFromString=void 0,o=x(369),Object.defineProperty(T,"baggageEntryMetadataFromString",{enumerable:!0,get:function(){return o.baggageEntryMetadataFromString}}),l=x(780),Object.defineProperty(T,"createContextKey",{enumerable:!0,get:function(){return l.createContextKey}}),Object.defineProperty(T,"ROOT_CONTEXT",{enumerable:!0,get:function(){return l.ROOT_CONTEXT}}),u=x(972),Object.defineProperty(T,"DiagConsoleLogger",{enumerable:!0,get:function(){return u.DiagConsoleLogger}}),d=x(957),Object.defineProperty(T,"DiagLogLevel",{enumerable:!0,get:function(){return d.DiagLogLevel}}),c=x(102),Object.defineProperty(T,"createNoopMeter",{enumerable:!0,get:function(){return c.createNoopMeter}}),h=x(901),Object.defineProperty(T,"ValueType",{enumerable:!0,get:function(){return h.ValueType}}),p=x(194),Object.defineProperty(T,"defaultTextMapGetter",{enumerable:!0,get:function(){return p.defaultTextMapGetter}}),Object.defineProperty(T,"defaultTextMapSetter",{enumerable:!0,get:function(){return p.defaultTextMapSetter}}),m=x(125),Object.defineProperty(T,"ProxyTracer",{enumerable:!0,get:function(){return m.ProxyTracer}}),f=x(846),Object.defineProperty(T,"ProxyTracerProvider",{enumerable:!0,get:function(){return f.ProxyTracerProvider}}),y=x(996),Object.defineProperty(T,"SamplingDecision",{enumerable:!0,get:function(){return y.SamplingDecision}}),b=x(357),Object.defineProperty(T,"SpanKind",{enumerable:!0,get:function(){return b.SpanKind}}),g=x(847),Object.defineProperty(T,"SpanStatusCode",{enumerable:!0,get:function(){return g.SpanStatusCode}}),v=x(475),Object.defineProperty(T,"TraceFlags",{enumerable:!0,get:function(){return v.TraceFlags}}),E=x(98),Object.defineProperty(T,"createTraceState",{enumerable:!0,get:function(){return E.createTraceState}}),K=x(139),Object.defineProperty(T,"isSpanContextValid",{enumerable:!0,get:function(){return K.isSpanContextValid}}),Object.defineProperty(T,"isValidTraceId",{enumerable:!0,get:function(){return K.isValidTraceId}}),Object.defineProperty(T,"isValidSpanId",{enumerable:!0,get:function(){return K.isValidSpanId}}),S=x(476),Object.defineProperty(T,"INVALID_SPANID",{enumerable:!0,get:function(){return S.INVALID_SPANID}}),Object.defineProperty(T,"INVALID_TRACEID",{enumerable:!0,get:function(){return S.INVALID_TRACEID}}),Object.defineProperty(T,"INVALID_SPAN_CONTEXT",{enumerable:!0,get:function(){return S.INVALID_SPAN_CONTEXT}}),r=x(67),Object.defineProperty(T,"context",{enumerable:!0,get:function(){return r.context}}),n=x(506),Object.defineProperty(T,"diag",{enumerable:!0,get:function(){return n.diag}}),i=x(886),Object.defineProperty(T,"metrics",{enumerable:!0,get:function(){return i.metrics}}),a=x(939),Object.defineProperty(T,"propagation",{enumerable:!0,get:function(){return a.propagation}}),s=x(845),Object.defineProperty(T,"trace",{enumerable:!0,get:function(){return s.trace}}),T.default={context:r.context,diag:n.diag,metrics:i.metrics,propagation:a.propagation,trace:s.trace},t.exports=T})()},166541,(e,t,r)=>{"use strict";let n,i;Object.defineProperty(r,"__esModule",{value:!0});var a={BubbledError:function(){return y},SpanKind:function(){return m},SpanStatusCode:function(){return p},getTracer:function(){return I},isBubbledError:function(){return b}};for(var s in a)Object.defineProperty(r,s,{enumerable:!0,get:a[s]});let o=e.r(387064),l=e.r(983782),u=process.env.NEXT_OTEL_PERFORMANCE_PREFIX;try{n=e.r(270406)}catch(t){n=e.r(371039)}let{context:d,propagation:c,trace:h,SpanStatusCode:p,SpanKind:m,ROOT_CONTEXT:f}=n;class y extends Error{constructor(e,t){super(),this.bubble=e,this.result=t}}function b(e){return"object"==typeof e&&null!==e&&e instanceof y}let g=(e,t)=>{b(t)&&t.bubble?e.setAttribute("next.bubble",!0):(t&&(e.recordException(t),e.setAttribute("error.type",t.name)),e.setStatus({code:p.ERROR,message:null==t?void 0:t.message})),e.end()},v=new Map,E=n.createContextKey("next.rootSpanId"),K=0,S={set(e,t,r){e.push({key:t,value:r})}},I=(i=new class e{getTracerInstance(){return h.getTracer("next.js","0.0.1")}getContext(){return d}getTracePropagationData(){let e=d.active(),t=[];return c.inject(e,t,S),t}getActiveScopeSpan(){return h.getSpan(null==d?void 0:d.active())}withPropagatedContext(e,t,r){let n=d.active();if(h.getSpanContext(n))return t();let i=c.extract(n,e,r);return d.with(i,t)}trace(...e){let[t,r,n]=e,{fn:i,options:a}="function"==typeof r?{fn:r,options:{}}:{fn:n,options:{...r}},s=a.spanName??t;if(!o.NextVanillaSpanAllowlist.has(t)&&"1"!==process.env.NEXT_OTEL_VERBOSE||a.hideSpan)return i();let c=this.getSpanContext((null==a?void 0:a.parentSpan)??this.getActiveScopeSpan());c||(c=(null==d?void 0:d.active())??f);let h=c.getValue(E),p="number"!=typeof h||!v.has(h),m=K++;return a.attributes={"next.span_name":s,"next.span_type":t,...a.attributes},d.with(c.setValue(E,m),()=>this.getTracerInstance().startActiveSpan(s,a,e=>{let r;u&&t&&o.LogSpanAllowList.has(t)&&(r="performance"in globalThis&&"measure"in performance?globalThis.performance.now():void 0);let n=!1,s=()=>{!n&&(n=!0,v.delete(m),r&&performance.measure(`${u}:next-${(t.split(".").pop()||"").replace(/[A-Z]/g,e=>"-"+e.toLowerCase())}`,{start:r,end:performance.now()}))};if(p&&v.set(m,new Map(Object.entries(a.attributes??{}))),i.length>1)try{return i(e,t=>g(e,t))}catch(t){throw g(e,t),t}finally{s()}try{let t=i(e);if((0,l.isThenable)(t))return t.then(t=>(e.end(),t)).catch(t=>{throw g(e,t),t}).finally(s);return e.end(),s(),t}catch(t){throw g(e,t),s(),t}}))}wrap(...e){let t=this,[r,n,i]=3===e.length?e:[e[0],{},e[1]];return o.NextVanillaSpanAllowlist.has(r)||"1"===process.env.NEXT_OTEL_VERBOSE?function(){let e=n;"function"==typeof e&&"function"==typeof i&&(e=e.apply(this,arguments));let a=arguments.length-1,s=arguments[a];if("function"!=typeof s)return t.trace(r,e,()=>i.apply(this,arguments));{let n=t.getContext().bind(d.active(),s);return t.trace(r,e,(e,t)=>(arguments[a]=function(e){return null==t||t(e),n.apply(this,arguments)},i.apply(this,arguments)))}}:i}startSpan(...e){let[t,r]=e,n=this.getSpanContext((null==r?void 0:r.parentSpan)??this.getActiveScopeSpan());return this.getTracerInstance().startSpan(t,r,n)}getSpanContext(e){return e?h.setSpan(d.active(),e):void 0}getRootSpanAttributes(){let e=d.active().getValue(E);return v.get(e)}setRootSpanAttribute(e,t){let r=d.active().getValue(E),n=v.get(r);n&&!n.has(e)&&n.set(e,t)}withSpan(e,t){let r=h.setSpan(d.active(),e);return d.with(r,t)}},()=>i)},307450,(e,t,r)=>{"use strict";t.exports=e.r(918622)},910931,(e,t,r)=>{"use strict";t.exports=e.r(307450).vendored["react-rsc"].React},243727,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={DynamicServerError:function(){return s},isDynamicServerError:function(){return o}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a="DYNAMIC_SERVER_USAGE";class s extends Error{constructor(e){super(`Dynamic server usage: ${e}`),this.description=e,this.digest=a}}function o(e){return"object"==typeof e&&null!==e&&"digest"in e&&"string"==typeof e.digest&&e.digest===a}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},183589,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={StaticGenBailoutError:function(){return s},isStaticGenBailoutError:function(){return o}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a="NEXT_STATIC_GEN_BAILOUT";class s extends Error{constructor(...e){super(...e),this.code=a}}function o(e){return"object"==typeof e&&null!==e&&"code"in e&&e.code===a}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},756725,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={isHangingPromiseRejectionError:function(){return a},makeDevtoolsIOAwarePromise:function(){return c},makeHangingPromise:function(){return u}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});function a(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===s}let s="HANGING_PROMISE_REJECTION";class o extends Error{constructor(e,t){super(`During prerendering, ${t} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${t} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${e}".`),this.route=e,this.expression=t,this.digest=s}}let l=new WeakMap;function u(e,t,r){if(e.aborted)return Promise.reject(new o(t,r));{let n=new Promise((n,i)=>{let a=i.bind(null,new o(t,r)),s=l.get(e);if(s)s.push(a);else{let t=[a];l.set(e,t),e.addEventListener("abort",()=>{for(let e=0;e<t.length;e++)t[e]()},{once:!0})}});return n.catch(d),n}}function d(){}function c(e,t,r){return t.stagedRendering?t.stagedRendering.delayUntilStage(r,void 0,e):new Promise(t=>{setTimeout(()=>{t(e)},0)})}},534103,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={METADATA_BOUNDARY_NAME:function(){return a},OUTLET_BOUNDARY_NAME:function(){return o},ROOT_LAYOUT_BOUNDARY_NAME:function(){return l},VIEWPORT_BOUNDARY_NAME:function(){return s}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a="__next_metadata_boundary__",s="__next_viewport_boundary__",o="__next_outlet_boundary__",l="__next_root_layout_boundary__"},609975,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={atLeastOneTask:function(){return o},scheduleImmediate:function(){return s},scheduleOnNextTick:function(){return a},waitAtLeastOneReactRenderTask:function(){return l}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e=>{Promise.resolve().then(()=>{process.nextTick(e)})},s=e=>{setImmediate(e)};function o(){return new Promise(e=>s(e))}function l(){return new Promise(e=>setImmediate(e))}},107703,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={BailoutToCSRError:function(){return s},isBailoutToCSRError:function(){return o}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a="BAILOUT_TO_CLIENT_SIDE_RENDERING";class s extends Error{constructor(e){super(`Bail out to client-side rendering: ${e}`),this.reason=e,this.digest=a}}function o(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===a}},585346,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"InvariantError",{enumerable:!0,get:function(){return n}});class n extends Error{constructor(e,t){super(`Invariant: ${e.endsWith(".")?e:e+"."} This is a bug in Next.js.`,t),this.name="InvariantError"}}},258200,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n,i,a={Postpone:function(){return R},PreludeState:function(){return Q},abortAndThrowOnSynchronousRequestDataAccess:function(){return T},abortOnSynchronousPlatformIOAccess:function(){return x},accessedDynamicData:function(){return _},annotateDynamicAccess:function(){return F},consumeDynamicAccess:function(){return M},createDynamicTrackingState:function(){return g},createDynamicValidationState:function(){return v},createHangingInputAbortSignal:function(){return J},createRenderInBrowserAbortSignal:function(){return L},delayUntilRuntimeStage:function(){return er},formatDynamicAPIAccesses:function(){return N},getFirstDynamicReason:function(){return E},getStaticShellDisallowedDynamicReasons:function(){return et},isDynamicPostpone:function(){return A},isPrerenderInterruptedError:function(){return P},logDisallowedDynamicError:function(){return Z},markCurrentScopeAsDynamic:function(){return K},postponeWithTracking:function(){return j},throwIfDisallowedDynamic:function(){return ee},throwToInterruptStaticGeneration:function(){return S},trackAllowedDynamicAccess:function(){return W},trackDynamicDataInDynamicRender:function(){return I},trackDynamicHoleInRuntimeShell:function(){return H},trackDynamicHoleInStaticShell:function(){return z},useDynamicRouteParams:function(){return G},useDynamicSearchParams:function(){return V}};for(var s in a)Object.defineProperty(r,s,{enumerable:!0,get:a[s]});let o=(n=e.r(910931))&&n.__esModule?n:{default:n},l=e.r(243727),u=e.r(183589),d=e.r(832319),c=e.r(556704),h=e.r(756725),p=e.r(534103),m=e.r(609975),f=e.r(107703),y=e.r(585346),b="function"==typeof o.default.unstable_postpone;function g(e){return{isDebugDynamicAccesses:e,dynamicAccesses:[],syncDynamicErrorWithStack:null}}function v(){return{hasSuspenseAboveBody:!1,hasDynamicMetadata:!1,dynamicMetadata:null,hasDynamicViewport:!1,hasAllowedDynamic:!1,dynamicErrors:[]}}function E(e){var t;return null==(t=e.dynamicAccesses[0])?void 0:t.expression}function K(e,t,r){if(t)switch(t.type){case"cache":case"unstable-cache":case"private-cache":return}if(!e.forceDynamic&&!e.forceStatic){if(e.dynamicShouldError)throw Object.defineProperty(new u.StaticGenBailoutError(`Route ${e.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${r}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`),"__NEXT_ERROR_CODE",{value:"E553",enumerable:!1,configurable:!0});if(t)switch(t.type){case"prerender-ppr":return j(e.route,r,t.dynamicTracking);case"prerender-legacy":t.revalidate=0;let n=Object.defineProperty(new l.DynamicServerError(`Route ${e.route} couldn't be rendered statically because it used ${r}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`),"__NEXT_ERROR_CODE",{value:"E550",enumerable:!1,configurable:!0});throw e.dynamicUsageDescription=r,e.dynamicUsageStack=n.stack,n}}}function S(e,t,r){let n=Object.defineProperty(new l.DynamicServerError(`Route ${t.route} couldn't be rendered statically because it used \`${e}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`),"__NEXT_ERROR_CODE",{value:"E558",enumerable:!1,configurable:!0});throw r.revalidate=0,t.dynamicUsageDescription=e,t.dynamicUsageStack=n.stack,n}function I(e){switch(e.type){case"cache":case"unstable-cache":case"private-cache":return}}function w(e,t,r){let n=C(`Route ${e} needs to bail out of prerendering at this point because it used ${t}.`);r.controller.abort(n);let i=r.dynamicTracking;i&&i.dynamicAccesses.push({stack:i.isDebugDynamicAccesses?Error().stack:void 0,expression:t})}function x(e,t,r,n){let i=n.dynamicTracking;w(e,t,n),i&&null===i.syncDynamicErrorWithStack&&(i.syncDynamicErrorWithStack=r)}function T(e,t,r,n){if(!1===n.controller.signal.aborted){w(e,t,n);let i=n.dynamicTracking;i&&null===i.syncDynamicErrorWithStack&&(i.syncDynamicErrorWithStack=r)}throw C(`Route ${e} needs to bail out of prerendering at this point because it used ${t}.`)}function R({reason:e,route:t}){let r=d.workUnitAsyncStorage.getStore();j(t,e,r&&"prerender-ppr"===r.type?r.dynamicTracking:null)}function j(e,t,r){(function(){if(!b)throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"),"__NEXT_ERROR_CODE",{value:"E224",enumerable:!1,configurable:!0})})(),r&&r.dynamicAccesses.push({stack:r.isDebugDynamicAccesses?Error().stack:void 0,expression:t}),o.default.unstable_postpone(k(e,t))}function k(e,t){return`Route ${e} needs to bail out of prerendering at this point because it used ${t}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`}function A(e){return"object"==typeof e&&null!==e&&"string"==typeof e.message&&O(e.message)}function O(e){return e.includes("needs to bail out of prerendering at this point because it used")&&e.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error")}if(!1===O(k("%%%","^^^")))throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"),"__NEXT_ERROR_CODE",{value:"E296",enumerable:!1,configurable:!0});let D="NEXT_PRERENDER_INTERRUPTED";function C(e){let t=Object.defineProperty(Error(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return t.digest=D,t}function P(e){return"object"==typeof e&&null!==e&&e.digest===D&&"name"in e&&"message"in e&&e instanceof Error}function _(e){return e.length>0}function M(e,t){return e.dynamicAccesses.push(...t.dynamicAccesses),e.dynamicAccesses}function N(e){return e.filter(e=>"string"==typeof e.stack&&e.stack.length>0).map(({expression:e,stack:t})=>(t=t.split("\n").slice(4).filter(e=>!(e.includes("node_modules/next/")||e.includes(" (<anonymous>)")||e.includes(" (node:"))).join("\n"),`Dynamic API Usage Debug - ${e}:
${t}`))}function L(){let e=new AbortController;return e.abort(Object.defineProperty(new f.BailoutToCSRError("Render in Browser"),"__NEXT_ERROR_CODE",{value:"E721",enumerable:!1,configurable:!0})),e.signal}function J(e){switch(e.type){case"prerender":case"prerender-runtime":let t=new AbortController;if(e.cacheSignal)e.cacheSignal.inputReady().then(()=>{t.abort()});else{let r=(0,d.getRuntimeStagePromise)(e);r?r.then(()=>(0,m.scheduleOnNextTick)(()=>t.abort())):(0,m.scheduleOnNextTick)(()=>t.abort())}return t.signal;case"prerender-client":case"prerender-ppr":case"prerender-legacy":case"request":case"cache":case"private-cache":case"unstable-cache":return}}function F(e,t){let r=t.dynamicTracking;r&&r.dynamicAccesses.push({stack:r.isDebugDynamicAccesses?Error().stack:void 0,expression:e})}function G(e){let t=c.workAsyncStorage.getStore(),r=d.workUnitAsyncStorage.getStore();if(t&&r)switch(r.type){case"prerender-client":case"prerender":{let n=r.fallbackRouteParams;n&&n.size>0&&o.default.use((0,h.makeHangingPromise)(r.renderSignal,t.route,e));break}case"prerender-ppr":{let n=r.fallbackRouteParams;if(n&&n.size>0)return j(t.route,e,r.dynamicTracking);break}case"prerender-runtime":throw Object.defineProperty(new y.InvariantError(`\`${e}\` was called during a runtime prerender. Next.js should be preventing ${e} from being included in server components statically, but did not in this case.`),"__NEXT_ERROR_CODE",{value:"E771",enumerable:!1,configurable:!0});case"cache":case"private-cache":throw Object.defineProperty(new y.InvariantError(`\`${e}\` was called inside a cache scope. Next.js should be preventing ${e} from being included in server components statically, but did not in this case.`),"__NEXT_ERROR_CODE",{value:"E745",enumerable:!1,configurable:!0})}}function V(e){let t=c.workAsyncStorage.getStore(),r=d.workUnitAsyncStorage.getStore();if(t)switch(!r&&(0,d.throwForMissingRequestStore)(e),r.type){case"prerender-client":o.default.use((0,h.makeHangingPromise)(r.renderSignal,t.route,e));break;case"prerender-legacy":case"prerender-ppr":if(t.forceStatic)return;throw Object.defineProperty(new f.BailoutToCSRError(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});case"prerender":case"prerender-runtime":throw Object.defineProperty(new y.InvariantError(`\`${e}\` was called from a Server Component. Next.js should be preventing ${e} from being included in server components statically, but did not in this case.`),"__NEXT_ERROR_CODE",{value:"E795",enumerable:!1,configurable:!0});case"cache":case"unstable-cache":case"private-cache":throw Object.defineProperty(new y.InvariantError(`\`${e}\` was called inside a cache scope. Next.js should be preventing ${e} from being included in server components statically, but did not in this case.`),"__NEXT_ERROR_CODE",{value:"E745",enumerable:!1,configurable:!0});case"request":return}}let q=/\n\s+at Suspense \(<anonymous>\)/,Y=RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at ${p.ROOT_LAYOUT_BOUNDARY_NAME} \\([^\\n]*\\)`),B=RegExp(`\\n\\s+at ${p.METADATA_BOUNDARY_NAME}[\\n\\s]`),U=RegExp(`\\n\\s+at ${p.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`),$=RegExp(`\\n\\s+at ${p.OUTLET_BOUNDARY_NAME}[\\n\\s]`);function W(e,t,r,n){if(!$.test(t)){if(B.test(t)){r.hasDynamicMetadata=!0;return}if(U.test(t)){r.hasDynamicViewport=!0;return}if(Y.test(t)){r.hasAllowedDynamic=!0,r.hasSuspenseAboveBody=!0;return}else if(q.test(t)){r.hasAllowedDynamic=!0;return}else{if(n.syncDynamicErrorWithStack)return void r.dynamicErrors.push(n.syncDynamicErrorWithStack);let i=X(`Route "${e.route}": Uncached data was accessed outside of <Suspense>. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`,t);return void r.dynamicErrors.push(i)}}}function H(e,t,r,n){if(!$.test(t)){if(B.test(t)){r.dynamicMetadata=X(`Route "${e.route}": Uncached data or \`connection()\` was accessed inside \`generateMetadata\`. Except for this instance, the page would have been entirely prerenderable which may have been the intended behavior. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`,t);return}if(U.test(t)){let n=X(`Route "${e.route}": Uncached data or \`connection()\` was accessed inside \`generateViewport\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`,t);r.dynamicErrors.push(n);return}if(Y.test(t)){r.hasAllowedDynamic=!0,r.hasSuspenseAboveBody=!0;return}else if(q.test(t)){r.hasAllowedDynamic=!0;return}else{if(n.syncDynamicErrorWithStack)return void r.dynamicErrors.push(n.syncDynamicErrorWithStack);let i=X(`Route "${e.route}": Uncached data or \`connection()\` was accessed outside of \`<Suspense>\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`,t);return void r.dynamicErrors.push(i)}}}function z(e,t,r,n){if(!$.test(t)){if(B.test(t)){r.dynamicMetadata=X(`Route "${e.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed inside \`generateMetadata\` or you have file-based metadata such as icons that depend on dynamic params segments. Except for this instance, the page would have been entirely prerenderable which may have been the intended behavior. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`,t);return}if(U.test(t)){let n=X(`Route "${e.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed inside \`generateViewport\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`,t);r.dynamicErrors.push(n);return}if(Y.test(t)){r.hasAllowedDynamic=!0,r.hasSuspenseAboveBody=!0;return}else if(q.test(t)){r.hasAllowedDynamic=!0;return}else{if(n.syncDynamicErrorWithStack)return void r.dynamicErrors.push(n.syncDynamicErrorWithStack);let i=X(`Route "${e.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed outside of \`<Suspense>\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`,t);return void r.dynamicErrors.push(i)}}}function X(e,t){let r=Object.defineProperty(Error(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return r.stack=r.name+": "+e+t,r}var Q=((i={})[i.Full=0]="Full",i[i.Empty=1]="Empty",i[i.Errored=2]="Errored",i);function Z(e,t){console.error(t),e.dev||(e.hasReadableErrorStacks?console.error(`To get a more detailed stack trace and pinpoint the issue, start the app in development mode by running \`next dev\`, then open "${e.route}" in your browser to investigate the error.`):console.error(`To get a more detailed stack trace and pinpoint the issue, try one of the following:
  - Start the app in development mode by running \`next dev\`, then open "${e.route}" in your browser to investigate the error.
  - Rerun the production build with \`next build --debug-prerender\` to generate better stack traces.`))}function ee(e,t,r,n){if(n.syncDynamicErrorWithStack)throw Z(e,n.syncDynamicErrorWithStack),new u.StaticGenBailoutError;if(0!==t){if(r.hasSuspenseAboveBody)return;let n=r.dynamicErrors;if(n.length>0){for(let t=0;t<n.length;t++)Z(e,n[t]);throw new u.StaticGenBailoutError}if(r.hasDynamicViewport)throw console.error(`Route "${e.route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) without explicitly allowing fully dynamic rendering. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`),new u.StaticGenBailoutError;if(1===t)throw console.error(`Route "${e.route}" did not produce a static shell and Next.js was unable to determine a reason. This is a bug in Next.js.`),new u.StaticGenBailoutError}else if(!1===r.hasAllowedDynamic&&r.hasDynamicMetadata)throw console.error(`Route "${e.route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) when the rest of the route does not. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`),new u.StaticGenBailoutError}function et(e,t,r){if(r.hasSuspenseAboveBody)return[];if(0!==t){let n=r.dynamicErrors;if(n.length>0)return n;if(1===t)return[Object.defineProperty(new y.InvariantError(`Route "${e.route}" did not produce a static shell and Next.js was unable to determine a reason.`),"__NEXT_ERROR_CODE",{value:"E936",enumerable:!1,configurable:!0})]}else if(!1===r.hasAllowedDynamic&&0===r.dynamicErrors.length&&r.dynamicMetadata)return[r.dynamicMetadata];return[]}function er(e,t){return e.runtimeStagePromise?e.runtimeStagePromise.then(()=>t):t}},696482,(e,t,r)=>{"use strict";let n;Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"cloneResponse",{enumerable:!0,get:function(){return a}});let i=()=>{};function a(e){if(!e.body)return[e,e];let[t,r]=e.body.tee(),i=new Response(t,{status:e.status,statusText:e.statusText,headers:e.headers});Object.defineProperty(i,"url",{value:e.url,configurable:!0,enumerable:!0,writable:!1}),n&&i.body&&n.register(i,new WeakRef(i.body));let a=new Response(r,{status:e.status,statusText:e.statusText,headers:e.headers});return Object.defineProperty(a,"url",{value:e.url,configurable:!0,enumerable:!0,writable:!1}),[i,a]}globalThis.FinalizationRegistry&&(n=new FinalizationRegistry(e=>{let t=e.deref();t&&!t.locked&&t.cancel("Response object has been garbage collected").then(i)}))},840578,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"createDedupeFetch",{enumerable:!0,get:function(){return l}});let n=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=s(void 0);if(r&&r.has(e))return r.get(e);var n={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var o=i?Object.getOwnPropertyDescriptor(e,a):null;o&&(o.get||o.set)?Object.defineProperty(n,a,o):n[a]=e[a]}return n.default=e,r&&r.set(e,n),n}(e.r(910931)),i=e.r(696482),a=e.r(585346);function s(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(s=function(e){return e?r:t})(e)}let o=new Set(["traceparent","tracestate"]);function l(e){let t=n.cache(e=>[]);return function(r,n){let s,l;if(n&&n.signal)return e(r,n);if("string"!=typeof r||n){let t,i="string"==typeof r||r instanceof URL?new Request(r,n):r;if("GET"!==i.method&&"HEAD"!==i.method||i.keepalive)return e(r,n);t=Array.from(i.headers.entries()).filter(([e])=>!o.has(e.toLowerCase())),l=JSON.stringify([i.method,t,i.mode,i.redirect,i.credentials,i.referrer,i.referrerPolicy,i.integrity]),s=i.url}else l='["GET",[],null,"follow",null,null,null,null]',s=r;let u=t(s);for(let e=0,t=u.length;e<t;e+=1){let[t,r]=u[e];if(t===l)return r.then(()=>{let t=u[e][2];if(!t)throw Object.defineProperty(new a.InvariantError("No cached response"),"__NEXT_ERROR_CODE",{value:"E579",enumerable:!1,configurable:!0});let[r,n]=(0,i.cloneResponse)(t);return u[e][2]=n,r})}let d=e(r,n),c=[l,d,null];return u.push(c),d.then(e=>{let[t,r]=(0,i.cloneResponse)(e);return c[2]=r,t})}}},4909,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n,i,a={CachedRouteKind:function(){return o},IncrementalCacheKind:function(){return l}};for(var s in a)Object.defineProperty(r,s,{enumerable:!0,get:a[s]});var o=((n={}).APP_PAGE="APP_PAGE",n.APP_ROUTE="APP_ROUTE",n.PAGES="PAGES",n.FETCH="FETCH",n.REDIRECT="REDIRECT",n.IMAGE="IMAGE",n),l=((i={}).APP_PAGE="APP_PAGE",i.APP_ROUTE="APP_ROUTE",i.PAGES="PAGES",i.FETCH="FETCH",i.IMAGE="IMAGE",i)},884761,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"DetachedPromise",{enumerable:!0,get:function(){return n}});class n{constructor(){let e,t;this.promise=new Promise((r,n)=>{e=r,t=n}),this.resolve=e,this.reject=t}}},165356,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"Batcher",{enumerable:!0,get:function(){return i}});let n=e.r(884761);class i{constructor(e,t=e=>e()){this.cacheKeyFn=e,this.schedulerFn=t,this.pending=new Map}static create(e){return new i(null==e?void 0:e.cacheKeyFn,null==e?void 0:e.schedulerFn)}async batch(e,t){let r=this.cacheKeyFn?await this.cacheKeyFn(e):e;if(null===r)return t({resolve:e=>Promise.resolve(e),key:e});let i=this.pending.get(r);if(i)return i;let{promise:a,resolve:s,reject:o}=new n.DetachedPromise;return this.pending.set(r,a),this.schedulerFn(async()=>{try{let r=await t({resolve:s,key:e});s(r)}catch(e){o(e)}finally{this.pending.delete(r)}}),a}}},899509,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"LRUCache",{enumerable:!0,get:function(){return a}});class n{constructor(e,t,r){this.prev=null,this.next=null,this.key=e,this.data=t,this.size=r}}class i{constructor(){this.prev=null,this.next=null}}class a{constructor(e,t,r){this.cache=new Map,this.totalSize=0,this.maxSize=e,this.calculateSize=t,this.onEvict=r,this.head=new i,this.tail=new i,this.head.next=this.tail,this.tail.prev=this.head}addToHead(e){e.prev=this.head,e.next=this.head.next,this.head.next.prev=e,this.head.next=e}removeNode(e){e.prev.next=e.next,e.next.prev=e.prev}moveToHead(e){this.removeNode(e),this.addToHead(e)}removeTail(){let e=this.tail.prev;return this.removeNode(e),e}set(e,t){let r=(null==this.calculateSize?void 0:this.calculateSize.call(this,t))??1;if(r>this.maxSize)return void console.warn("Single item size exceeds maxSize");let i=this.cache.get(e);if(i)i.data=t,this.totalSize=this.totalSize-i.size+r,i.size=r,this.moveToHead(i);else{let i=new n(e,t,r);this.cache.set(e,i),this.addToHead(i),this.totalSize+=r}for(;this.totalSize>this.maxSize&&this.cache.size>0;){let e=this.removeTail();this.cache.delete(e.key),this.totalSize-=e.size,null==this.onEvict||this.onEvict.call(this,e.key,e.data)}}has(e){return this.cache.has(e)}get(e){let t=this.cache.get(e);if(t)return this.moveToHead(t),t.data}*[Symbol.iterator](){let e=this.head.next;for(;e&&e!==this.tail;){let t=e;yield[t.key,t.data],e=e.next}}remove(e){let t=this.cache.get(e);t&&(this.removeNode(t),this.cache.delete(e),this.totalSize-=t.size)}get size(){return this.cache.size}get currentSize(){return this.totalSize}}},116770,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n,i={bgBlack:function(){return k},bgBlue:function(){return C},bgCyan:function(){return _},bgGreen:function(){return O},bgMagenta:function(){return P},bgRed:function(){return A},bgWhite:function(){return M},bgYellow:function(){return D},black:function(){return v},blue:function(){return I},bold:function(){return h},cyan:function(){return T},dim:function(){return p},gray:function(){return j},green:function(){return K},hidden:function(){return b},inverse:function(){return y},italic:function(){return m},magenta:function(){return w},purple:function(){return x},red:function(){return E},reset:function(){return c},strikethrough:function(){return g},underline:function(){return f},white:function(){return R},yellow:function(){return S}};for(var a in i)Object.defineProperty(r,a,{enumerable:!0,get:i[a]});let{env:s,stdout:o}=(null==(n=globalThis)?void 0:n.process)??{},l=s&&!s.NO_COLOR&&(s.FORCE_COLOR||(null==o?void 0:o.isTTY)&&!s.CI&&"dumb"!==s.TERM),u=(e,t,r,n)=>{let i=e.substring(0,n)+r,a=e.substring(n+t.length),s=a.indexOf(t);return~s?i+u(a,t,r,s):i+a},d=(e,t,r=e)=>l?n=>{let i=""+n,a=i.indexOf(t,e.length);return~a?e+u(i,t,r,a)+t:e+i+t}:String,c=l?e=>`\x1b[0m${e}\x1b[0m`:String,h=d("\x1b[1m","\x1b[22m","\x1b[22m\x1b[1m"),p=d("\x1b[2m","\x1b[22m","\x1b[22m\x1b[2m"),m=d("\x1b[3m","\x1b[23m"),f=d("\x1b[4m","\x1b[24m"),y=d("\x1b[7m","\x1b[27m"),b=d("\x1b[8m","\x1b[28m"),g=d("\x1b[9m","\x1b[29m"),v=d("\x1b[30m","\x1b[39m"),E=d("\x1b[31m","\x1b[39m"),K=d("\x1b[32m","\x1b[39m"),S=d("\x1b[33m","\x1b[39m"),I=d("\x1b[34m","\x1b[39m"),w=d("\x1b[35m","\x1b[39m"),x=d("\x1b[38;2;173;127;168m","\x1b[39m"),T=d("\x1b[36m","\x1b[39m"),R=d("\x1b[37m","\x1b[39m"),j=d("\x1b[90m","\x1b[39m"),k=d("\x1b[40m","\x1b[49m"),A=d("\x1b[41m","\x1b[49m"),O=d("\x1b[42m","\x1b[49m"),D=d("\x1b[43m","\x1b[49m"),C=d("\x1b[44m","\x1b[49m"),P=d("\x1b[45m","\x1b[49m"),_=d("\x1b[46m","\x1b[49m"),M=d("\x1b[47m","\x1b[49m")},889593,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={bootstrap:function(){return d},error:function(){return h},errorOnce:function(){return K},event:function(){return y},info:function(){return f},prefixes:function(){return o},ready:function(){return m},trace:function(){return b},wait:function(){return c},warn:function(){return p},warnOnce:function(){return v}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(116770),s=e.r(899509),o={wait:(0,a.white)((0,a.bold)("○")),error:(0,a.red)((0,a.bold)("⨯")),warn:(0,a.yellow)((0,a.bold)("⚠")),ready:"▲",info:(0,a.white)((0,a.bold)(" ")),event:(0,a.green)((0,a.bold)("✓")),trace:(0,a.magenta)((0,a.bold)("»"))},l={log:"log",warn:"warn",error:"error"};function u(e,...t){(""===t[0]||void 0===t[0])&&1===t.length&&t.shift();let r=e in l?l[e]:"log",n=o[e];0===t.length?console[r](""):1===t.length&&"string"==typeof t[0]?console[r](n+" "+t[0]):console[r](n,...t)}function d(e){console.log(e)}function c(...e){u("wait",...e)}function h(...e){u("error",...e)}function p(...e){u("warn",...e)}function m(...e){u("ready",...e)}function f(...e){u("info",...e)}function y(...e){u("event",...e)}function b(...e){u("trace",...e)}let g=new s.LRUCache(1e4,e=>e.length);function v(...e){let t=e.join(" ");g.has(t)||(g.set(t,t),p(...e))}let E=new s.LRUCache(1e4,e=>e.length);function K(...e){let t=e.join(" ");E.has(t)||(E.set(t,t),h(...e))}},878325,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ENCODED_TAGS",{enumerable:!0,get:function(){return n}});let n={OPENING:{HTML:new Uint8Array([60,104,116,109,108]),BODY:new Uint8Array([60,98,111,100,121])},CLOSED:{HEAD:new Uint8Array([60,47,104,101,97,100,62]),BODY:new Uint8Array([60,47,98,111,100,121,62]),HTML:new Uint8Array([60,47,104,116,109,108,62]),BODY_AND_HTML:new Uint8Array([60,47,98,111,100,121,62,60,47,104,116,109,108,62])},META:{ICON_MARK:new Uint8Array([60,109,101,116,97,32,110,97,109,101,61,34,194,171,110,120,116,45,105,99,111,110,194,187,34])}}},103193,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={indexOfUint8Array:function(){return a},isEquivalentUint8Arrays:function(){return s},removeFromUint8Array:function(){return o}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});function a(e,t){if(0===t.length)return 0;if(0===e.length||t.length>e.length)return -1;for(let r=0;r<=e.length-t.length;r++){let n=!0;for(let i=0;i<t.length;i++)if(e[r+i]!==t[i]){n=!1;break}if(n)return r}return -1}function s(e,t){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}function o(e,t){let r=a(e,t);if(0===r)return e.subarray(t.length);if(!(r>-1))return e;{let n=new Uint8Array(e.length-t.length);return n.set(e.slice(0,r)),n.set(e.slice(r+t.length),r),n}}},452369,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"MISSING_ROOT_TAGS_ERROR",{enumerable:!0,get:function(){return n}});let n="NEXT_MISSING_ROOT_TAGS";("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},261670,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"insertBuildIdComment",{enumerable:!0,get:function(){return i}});let n="<!DOCTYPE html>";function i(e,t){return t.includes("-->")||!e.startsWith(n)?e:e.replace(n,n+"<!--"+t.slice(0,24).replace(/-/g,"_")+"-->")}},973697,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={ACTION_HEADER:function(){return s},FLIGHT_HEADERS:function(){return m},NEXT_ACTION_NOT_FOUND_HEADER:function(){return K},NEXT_ACTION_REVALIDATED_HEADER:function(){return w},NEXT_DID_POSTPONE_HEADER:function(){return b},NEXT_HMR_REFRESH_HASH_COOKIE:function(){return c},NEXT_HMR_REFRESH_HEADER:function(){return d},NEXT_HTML_REQUEST_ID_HEADER:function(){return I},NEXT_IS_PRERENDER_HEADER:function(){return E},NEXT_REQUEST_ID_HEADER:function(){return S},NEXT_REWRITTEN_PATH_HEADER:function(){return g},NEXT_REWRITTEN_QUERY_HEADER:function(){return v},NEXT_ROUTER_PREFETCH_HEADER:function(){return l},NEXT_ROUTER_SEGMENT_PREFETCH_HEADER:function(){return u},NEXT_ROUTER_STALE_TIME_HEADER:function(){return y},NEXT_ROUTER_STATE_TREE_HEADER:function(){return o},NEXT_RSC_UNION_QUERY:function(){return f},NEXT_URL:function(){return h},RSC_CONTENT_TYPE_HEADER:function(){return p},RSC_HEADER:function(){return a}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a="rsc",s="next-action",o="next-router-state-tree",l="next-router-prefetch",u="next-router-segment-prefetch",d="next-hmr-refresh",c="__next_hmr_refresh_hash__",h="next-url",p="text/x-component",m=[a,o,l,d,u],f="_rsc",y="x-nextjs-stale-time",b="x-nextjs-postponed",g="x-nextjs-rewritten-path",v="x-nextjs-rewritten-query",E="x-nextjs-prerender",K="x-nextjs-action-not-found",S="x-nextjs-request-id",I="x-nextjs-html-request-id",w="x-action-revalidated";("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},593249,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={djb2Hash:function(){return a},hexHash:function(){return s}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});function a(e){let t=5381;for(let r=0;r<e.length;r++)t=(t<<5)+t+e.charCodeAt(r)|0;return t>>>0}function s(e){return a(e).toString(36).slice(0,5)}},231679,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"computeCacheBustingSearchParam",{enumerable:!0,get:function(){return i}});let n=e.r(593249);function i(e,t,r,i){return(void 0===e||"0"===e)&&void 0===t&&void 0===r&&void 0===i?"":(0,n.hexHash)([e||"0",t||"0",r||"0",i||"0"].join(","))}},831963,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={chainStreams:function(){return b},continueDynamicHTMLResume:function(){return N},continueDynamicPrerender:function(){return P},continueFizzStream:function(){return C},continueStaticFallbackPrerender:function(){return M},continueStaticPrerender:function(){return _},createBufferedTransformStream:function(){return w},createDocumentClosingStream:function(){return L},createRootLayoutValidatorStream:function(){return D},renderToInitialFizzStream:function(){return T},streamFromBuffer:function(){return v},streamFromString:function(){return g},streamToBuffer:function(){return S},streamToString:function(){return I},streamToUint8Array:function(){return K}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(166541),s=e.r(387064),o=e.r(884761),l=e.r(609975),u=e.r(878325),d=e.r(103193),c=e.r(452369),h=e.r(261670),p=e.r(973697),m=e.r(231679);function f(){}let y=new TextEncoder;function b(...e){if(0===e.length)return new ReadableStream({start(e){e.close()}});if(1===e.length)return e[0];let{readable:t,writable:r}=new TransformStream,n=e[0].pipeTo(r,{preventClose:!0}),i=1;for(;i<e.length-1;i++){let t=e[i];n=n.then(()=>t.pipeTo(r,{preventClose:!0}))}let a=e[i];return(n=n.then(()=>a.pipeTo(r))).catch(f),t}function g(e){return new ReadableStream({start(t){t.enqueue(y.encode(e)),t.close()}})}function v(e){return new ReadableStream({start(t){t.enqueue(e),t.close()}})}async function E(e){let t=e.getReader(),r=[];for(;;){let{done:e,value:n}=await t.read();if(e)break;r.push(n)}return r}async function K(e){var t=await E(e);let r=new Uint8Array(t.reduce((e,t)=>e+t.length,0)),n=0;for(let e of t)r.set(e,n),n+=e.length;return r}async function S(e){return Buffer.concat(await E(e))}async function I(e,t){let r=new TextDecoder("utf-8",{fatal:!0}),n="";for await(let i of e){if(null==t?void 0:t.aborted)return n;n+=r.decode(i,{stream:!0})}return n+r.decode()}function w(e={}){let t,{maxBufferByteLength:r=1/0}=e,n=[],i=0,a=e=>{try{if(0===n.length)return;let t=new Uint8Array(i),r=0;for(let e=0;e<n.length;e++){let i=n[e];t.set(i,r),r+=i.byteLength}n.length=0,i=0,e.enqueue(t)}catch{}};return new TransformStream({transform(e,s){n.push(e),(i+=e.byteLength)>=r?a(s):(e=>{if(t)return;let r=new o.DetachedPromise;t=r,(0,l.scheduleImmediate)(()=>{try{a(e)}finally{t=void 0,r.resolve()}})})(s)},flush:()=>null==t?void 0:t.promise})}function x(e,t){let r=!1;return new TransformStream({transform(n,i){if(e&&!r){r=!0;let e=new TextDecoder("utf-8",{fatal:!0}).decode(n,{stream:!0}),a=(0,h.insertBuildIdComment)(e,t);i.enqueue(y.encode(a));return}i.enqueue(n)}})}function T({ReactDOMServer:e,element:t,streamOptions:r}){return(0,a.getTracer)().trace(s.AppRenderSpan.renderToReadableStream,async()=>e.renderToReadableStream(t,r))}function R(e){let t=-1,r=!1;return new TransformStream({async transform(n,i){let a=-1,s=-1;if(t++,r)return void i.enqueue(n);let o=0;if(-1===a){if(-1===(a=(0,d.indexOfUint8Array)(n,u.ENCODED_TAGS.META.ICON_MARK)))return void i.enqueue(n);47===n[a+(o=u.ENCODED_TAGS.META.ICON_MARK.length)]?o+=2:o++}if(0===t){if(s=(0,d.indexOfUint8Array)(n,u.ENCODED_TAGS.CLOSED.HEAD),-1!==a){if(a<s){let e=new Uint8Array(n.length-o);e.set(n.subarray(0,a)),e.set(n.subarray(a+o),a),n=e}else{let t=await e(),r=y.encode(t),i=r.length,s=new Uint8Array(n.length-o+i);s.set(n.subarray(0,a)),s.set(r,a),s.set(n.subarray(a+o),a+i),n=s}r=!0}}else{let t=await e(),i=y.encode(t),s=i.length,l=new Uint8Array(n.length-o+s);l.set(n.subarray(0,a)),l.set(i,a),l.set(n.subarray(a+o),a+s),n=l,r=!0}i.enqueue(n)}})}function j(e){let t=!1,r=!1;return new TransformStream({async transform(n,i){r=!0;let a=await e();if(t){if(a){let e=y.encode(a);i.enqueue(e)}i.enqueue(n)}else{let e=(0,d.indexOfUint8Array)(n,u.ENCODED_TAGS.CLOSED.HEAD);if(-1!==e){if(a){let t=y.encode(a),r=new Uint8Array(n.length+t.length);r.set(n.slice(0,e)),r.set(t,e),r.set(n.slice(e),e+t.length),i.enqueue(r)}else i.enqueue(n);t=!0}else a&&i.enqueue(y.encode(a)),i.enqueue(n),t=!0}},async flush(t){if(r){let r=await e();r&&t.enqueue(y.encode(r))}}})}function k(e,t){let r=!1,n=null,i=!1;function a(e){return n||(n=s(e)),n}async function s(n){let a=e.getReader();t&&await (0,l.atLeastOneTask)();try{for(;;){let{done:e,value:s}=await a.read();if(e){i=!0;return}t||r||await (0,l.atLeastOneTask)(),n.enqueue(s)}}catch(e){n.error(e)}}return new TransformStream({start(e){t||a(e)},transform(e,r){r.enqueue(e),t&&a(r)},flush(e){if(r=!0,!i)return a(e)}})}let A="</body></html>";function O(){let e=!1;return new TransformStream({transform(t,r){if(e)return r.enqueue(t);let n=(0,d.indexOfUint8Array)(t,u.ENCODED_TAGS.CLOSED.BODY_AND_HTML);if(n>-1){if(e=!0,t.length===u.ENCODED_TAGS.CLOSED.BODY_AND_HTML.length)return;let i=t.slice(0,n);if(r.enqueue(i),t.length>u.ENCODED_TAGS.CLOSED.BODY_AND_HTML.length+n){let e=t.slice(n+u.ENCODED_TAGS.CLOSED.BODY_AND_HTML.length);r.enqueue(e)}}else r.enqueue(t)},flush(e){e.enqueue(u.ENCODED_TAGS.CLOSED.BODY_AND_HTML)}})}function D(){let e=!1,t=!1;return new TransformStream({async transform(r,n){!e&&(0,d.indexOfUint8Array)(r,u.ENCODED_TAGS.OPENING.HTML)>-1&&(e=!0),!t&&(0,d.indexOfUint8Array)(r,u.ENCODED_TAGS.OPENING.BODY)>-1&&(t=!0),n.enqueue(r)},flush(r){let n=[];e||n.push("html"),t||n.push("body"),n.length&&r.enqueue(y.encode(`<html id="__next_error__">
            <template
              data-next-error-message="Missing ${n.map(e=>`<${e}>`).join(n.length>1?" and ":"")} tags in the root layout.
Read more at https://nextjs.org/docs/messages/missing-root-layout-tags"
              data-next-error-digest="${c.MISSING_ROOT_TAGS_ERROR}"
              data-next-error-stack=""
            ></template>
          `))}})}async function C(e,{suffix:t,inlinedDataStream:r,isStaticGeneration:n,isBuildTimePrerendering:i,buildId:a,getServerInsertedHTML:s,getServerInsertedMetadata:u,validateRootLayout:d}){let c,h,p=t?t.split(A,1)[0]:null;n?await e.allReady:await (0,l.waitAtLeastOneReactRenderTask)();var m=[w(),x(i,a),R(u),null!=p&&p.length>0?(h=!1,new TransformStream({transform(e,t){if(t.enqueue(e),!h){let e;h=!0,c=e=new o.DetachedPromise,(0,l.scheduleImmediate)(()=>{try{t.enqueue(y.encode(p))}catch{}finally{c=void 0,e.resolve()}})}},flush(e){if(c)return c.promise;h||e.enqueue(y.encode(p))}})):null,r?k(r,!0):null,d?D():null,O(),j(s)];let f=e;for(let e of m)e&&(f=f.pipeThrough(e));return f}async function P(e,{getServerInsertedHTML:t,getServerInsertedMetadata:r}){return e.pipeThrough(w()).pipeThrough(new TransformStream({transform(e,t){(0,d.isEquivalentUint8Arrays)(e,u.ENCODED_TAGS.CLOSED.BODY_AND_HTML)||(0,d.isEquivalentUint8Arrays)(e,u.ENCODED_TAGS.CLOSED.BODY)||(0,d.isEquivalentUint8Arrays)(e,u.ENCODED_TAGS.CLOSED.HTML)||(e=(0,d.removeFromUint8Array)(e,u.ENCODED_TAGS.CLOSED.BODY),e=(0,d.removeFromUint8Array)(e,u.ENCODED_TAGS.CLOSED.HTML),t.enqueue(e))}})).pipeThrough(j(t)).pipeThrough(R(r))}async function _(e,{inlinedDataStream:t,getServerInsertedHTML:r,getServerInsertedMetadata:n,isBuildTimePrerendering:i,buildId:a}){return e.pipeThrough(w()).pipeThrough(x(i,a)).pipeThrough(j(r)).pipeThrough(R(n)).pipeThrough(k(t,!0)).pipeThrough(O())}async function M(e,{inlinedDataStream:t,getServerInsertedHTML:r,getServerInsertedMetadata:n,isBuildTimePrerendering:i,buildId:a}){let s,o,l,c;return e.pipeThrough(w()).pipeThrough(x(i,a)).pipeThrough(j(r)).pipeThrough((s=(0,m.computeCacheBustingSearchParam)("1","/_full",void 0,void 0),o=`${p.NEXT_RSC_UNION_QUERY}=${s}`,l=`<script>__NEXT_CLIENT_RESUME=fetch(location.pathname+'?${o}',{credentials:'same-origin',headers:{'${p.RSC_HEADER}': '1','${p.NEXT_ROUTER_PREFETCH_HEADER}': '1','${p.NEXT_ROUTER_SEGMENT_PREFETCH_HEADER}': '/_full'}})</script>`,c=!1,new TransformStream({transform(e,t){if(c)return void t.enqueue(e);let r=(0,d.indexOfUint8Array)(e,u.ENCODED_TAGS.CLOSED.HEAD);if(-1===r)return void t.enqueue(e);let n=y.encode(l),i=new Uint8Array(e.length+n.length);i.set(e.slice(0,r)),i.set(n,r),i.set(e.slice(r),r+n.length),t.enqueue(i),c=!0}}))).pipeThrough(R(n)).pipeThrough(k(t,!0)).pipeThrough(O())}async function N(e,{delayDataUntilFirstHtmlChunk:t,inlinedDataStream:r,getServerInsertedHTML:n,getServerInsertedMetadata:i}){return e.pipeThrough(w()).pipeThrough(j(n)).pipeThrough(R(i)).pipeThrough(k(r,t)).pipeThrough(O())}function L(){return g(A)}},255841,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={NEXT_REQUEST_META:function(){return a},addRequestMeta:function(){return l},getRequestMeta:function(){return s},removeRequestMeta:function(){return u},setRequestMeta:function(){return o}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=Symbol.for("NextInternalRequestMeta");function s(e,t){let r=e[a]||{};return"string"==typeof t?r[t]:r}function o(e,t){return e[a]=t,t}function l(e,t,r){let n=s(e);return n[t]=r,o(e,n)}function u(e,t){let r=s(e);return delete r[t],o(e,r)}},287790,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={fromNodeOutgoingHttpHeaders:function(){return s},normalizeNextQueryParam:function(){return d},splitCookiesString:function(){return o},toNodeOutgoingHttpHeaders:function(){return l},validateURL:function(){return u}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(419372);function s(e){let t=new Headers;for(let[r,n]of Object.entries(e))for(let e of Array.isArray(n)?n:[n])void 0!==e&&("number"==typeof e&&(e=e.toString()),t.append(r,e));return t}function o(e){var t,r,n,i,a,s=[],o=0;function l(){for(;o<e.length&&/\s/.test(e.charAt(o));)o+=1;return o<e.length}for(;o<e.length;){for(t=o,a=!1;l();)if(","===(r=e.charAt(o))){for(n=o,o+=1,l(),i=o;o<e.length&&"="!==(r=e.charAt(o))&&";"!==r&&","!==r;)o+=1;o<e.length&&"="===e.charAt(o)?(a=!0,o=i,s.push(e.substring(t,n)),t=o):o=n+1}else o+=1;(!a||o>=e.length)&&s.push(e.substring(t,e.length))}return s}function l(e){let t={},r=[];if(e)for(let[n,i]of e.entries())"set-cookie"===n.toLowerCase()?(r.push(...o(i)),t[n]=1===r.length?r[0]:r):t[n]=i;return t}function u(e){try{return String(new URL(String(e)))}catch(t){throw Object.defineProperty(Error(`URL is malformed "${String(e)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`,{cause:t}),"__NEXT_ERROR_CODE",{value:"E61",enumerable:!1,configurable:!0})}}function d(e){for(let t of[a.NEXT_QUERY_PARAM_PREFIX,a.NEXT_INTERCEPTION_MARKER_PREFIX])if(e!==t&&e.startsWith(t))return e.substring(t.length);return null}},522846,(e,t,r)=>{"use strict";function n(e,t,r){if(e){for(let n of(r&&(r=r.toLowerCase()),e))if(t===n.domain?.split(":",1)[0].toLowerCase()||r===n.defaultLocale.toLowerCase()||n.locales?.some(e=>e.toLowerCase()===r))return n}}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"detectDomainLocale",{enumerable:!0,get:function(){return n}})},341682,(e,t,r)=>{"use strict";function n(e){return e.replace(/\/$/,"")||"/"}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"removeTrailingSlash",{enumerable:!0,get:function(){return n}})},49454,(e,t,r)=>{"use strict";function n(e){let t=e.indexOf("#"),r=e.indexOf("?"),n=r>-1&&(t<0||r<t);return n||t>-1?{pathname:e.substring(0,n?r:t),query:n?e.substring(r,t>-1?t:void 0):"",hash:t>-1?e.slice(t):""}:{pathname:e,query:"",hash:""}}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"parsePath",{enumerable:!0,get:function(){return n}})},455454,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"addPathPrefix",{enumerable:!0,get:function(){return i}});let n=e.r(49454);function i(e,t){if(!e.startsWith("/")||!t)return e;let{pathname:r,query:i,hash:a}=(0,n.parsePath)(e);return`${t}${r}${i}${a}`}},447990,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"addPathSuffix",{enumerable:!0,get:function(){return i}});let n=e.r(49454);function i(e,t){if(!e.startsWith("/")||!t)return e;let{pathname:r,query:i,hash:a}=(0,n.parsePath)(e);return`${r}${t}${i}${a}`}},667138,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"pathHasPrefix",{enumerable:!0,get:function(){return i}});let n=e.r(49454);function i(e,t){if("string"!=typeof e)return!1;let{pathname:r}=(0,n.parsePath)(e);return r===t||r.startsWith(t+"/")}},997602,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"addLocale",{enumerable:!0,get:function(){return a}});let n=e.r(455454),i=e.r(667138);function a(e,t,r,a){if(!t||t===r)return e;let s=e.toLowerCase();return!a&&((0,i.pathHasPrefix)(s,"/api")||(0,i.pathHasPrefix)(s,`/${t.toLowerCase()}`))?e:(0,n.addPathPrefix)(e,`/${t}`)}},202116,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"formatNextPathnameInfo",{enumerable:!0,get:function(){return o}});let n=e.r(341682),i=e.r(455454),a=e.r(447990),s=e.r(997602);function o(e){let t=(0,s.addLocale)(e.pathname,e.locale,e.buildId?void 0:e.defaultLocale,e.ignorePrefix);return(e.buildId||!e.trailingSlash)&&(t=(0,n.removeTrailingSlash)(t)),e.buildId&&(t=(0,a.addPathSuffix)((0,i.addPathPrefix)(t,`/_next/data/${e.buildId}`),"/"===e.pathname?"index.json":".json")),t=(0,i.addPathPrefix)(t,e.basePath),!e.buildId&&e.trailingSlash?t.endsWith("/")?t:(0,a.addPathSuffix)(t,"/"):(0,n.removeTrailingSlash)(t)}},770517,(e,t,r)=>{"use strict";function n(e,t){let r;if(t?.host&&!Array.isArray(t.host))r=t.host.toString().split(":",1)[0];else{if(!e.hostname)return;r=e.hostname}return r.toLowerCase()}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getHostname",{enumerable:!0,get:function(){return n}})},385630,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"normalizeLocalePath",{enumerable:!0,get:function(){return i}});let n=new WeakMap;function i(e,t){let r;if(!t)return{pathname:e};let i=n.get(t);i||(i=t.map(e=>e.toLowerCase()),n.set(t,i));let a=e.split("/",2);if(!a[1])return{pathname:e};let s=a[1].toLowerCase(),o=i.indexOf(s);return o<0?{pathname:e}:(r=t[o],{pathname:e=e.slice(r.length+1)||"/",detectedLocale:r})}},472389,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"removePathPrefix",{enumerable:!0,get:function(){return i}});let n=e.r(667138);function i(e,t){if(!(0,n.pathHasPrefix)(e,t))return e;let r=e.slice(t.length);return r.startsWith("/")?r:`/${r}`}},454122,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getNextPathnameInfo",{enumerable:!0,get:function(){return s}});let n=e.r(385630),i=e.r(472389),a=e.r(667138);function s(e,t){let{basePath:r,i18n:s,trailingSlash:o}=t.nextConfig??{},l={pathname:e,trailingSlash:"/"!==e?e.endsWith("/"):o};r&&(0,a.pathHasPrefix)(l.pathname,r)&&(l.pathname=(0,i.removePathPrefix)(l.pathname,r),l.basePath=r);let u=l.pathname;if(l.pathname.startsWith("/_next/data/")&&l.pathname.endsWith(".json")){let e=l.pathname.replace(/^\/_next\/data\//,"").replace(/\.json$/,"").split("/");l.buildId=e[0],u="index"!==e[1]?`/${e.slice(1).join("/")}`:"/",!0===t.parseData&&(l.pathname=u)}if(s){let e=t.i18nProvider?t.i18nProvider.analyze(l.pathname):(0,n.normalizeLocalePath)(l.pathname,s.locales);l.locale=e.detectedLocale,l.pathname=e.pathname??l.pathname,!e.detectedLocale&&l.buildId&&(e=t.i18nProvider?t.i18nProvider.analyze(u):(0,n.normalizeLocalePath)(u,s.locales)).detectedLocale&&(l.locale=e.detectedLocale)}return l}},723866,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"NextURL",{enumerable:!0,get:function(){return d}});let n=e.r(522846),i=e.r(202116),a=e.r(770517),s=e.r(454122),o=/(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;function l(e,t){return new URL(String(e).replace(o,"localhost"),t&&String(t).replace(o,"localhost"))}let u=Symbol("NextURLInternal");class d{constructor(e,t,r){let n,i;"object"==typeof t&&"pathname"in t||"string"==typeof t?(n=t,i=r||{}):i=r||t||{},this[u]={url:l(e,n??i.base),options:i,basePath:""},this.analyze()}analyze(){var e,t,r,i,o;let l=(0,s.getNextPathnameInfo)(this[u].url.pathname,{nextConfig:this[u].options.nextConfig,parseData:!0,i18nProvider:this[u].options.i18nProvider}),d=(0,a.getHostname)(this[u].url,this[u].options.headers);this[u].domainLocale=this[u].options.i18nProvider?this[u].options.i18nProvider.detectDomainLocale(d):(0,n.detectDomainLocale)(null==(t=this[u].options.nextConfig)||null==(e=t.i18n)?void 0:e.domains,d);let c=(null==(r=this[u].domainLocale)?void 0:r.defaultLocale)||(null==(o=this[u].options.nextConfig)||null==(i=o.i18n)?void 0:i.defaultLocale);this[u].url.pathname=l.pathname,this[u].defaultLocale=c,this[u].basePath=l.basePath??"",this[u].buildId=l.buildId,this[u].locale=l.locale??c,this[u].trailingSlash=l.trailingSlash}formatPathname(){return(0,i.formatNextPathnameInfo)({basePath:this[u].basePath,buildId:this[u].buildId,defaultLocale:this[u].options.forceLocale?void 0:this[u].defaultLocale,locale:this[u].locale,pathname:this[u].url.pathname,trailingSlash:this[u].trailingSlash})}formatSearch(){return this[u].url.search}get buildId(){return this[u].buildId}set buildId(e){this[u].buildId=e}get locale(){return this[u].locale??""}set locale(e){var t,r;if(!this[u].locale||!(null==(r=this[u].options.nextConfig)||null==(t=r.i18n)?void 0:t.locales.includes(e)))throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e}"`),"__NEXT_ERROR_CODE",{value:"E597",enumerable:!1,configurable:!0});this[u].locale=e}get defaultLocale(){return this[u].defaultLocale}get domainLocale(){return this[u].domainLocale}get searchParams(){return this[u].url.searchParams}get host(){return this[u].url.host}set host(e){this[u].url.host=e}get hostname(){return this[u].url.hostname}set hostname(e){this[u].url.hostname=e}get port(){return this[u].url.port}set port(e){this[u].url.port=e}get protocol(){return this[u].url.protocol}set protocol(e){this[u].url.protocol=e}get href(){let e=this.formatPathname(),t=this.formatSearch();return`${this.protocol}//${this.host}${e}${t}${this.hash}`}set href(e){this[u].url=l(e),this.analyze()}get origin(){return this[u].url.origin}get pathname(){return this[u].url.pathname}set pathname(e){this[u].url.pathname=e}get hash(){return this[u].url.hash}set hash(e){this[u].url.hash=e}get search(){return this[u].url.search}set search(e){this[u].url.search=e}get password(){return this[u].url.password}set password(e){this[u].url.password=e}get username(){return this[u].url.username}set username(e){this[u].url.username=e}get basePath(){return this[u].basePath}set basePath(e){this[u].basePath=e.startsWith("/")?e:`/${e}`}toString(){return this.href}toJSON(){return this.href}[Symbol.for("edge-runtime.inspect.custom")](){return{href:this.href,origin:this.origin,protocol:this.protocol,username:this.username,password:this.password,host:this.host,hostname:this.hostname,port:this.port,pathname:this.pathname,search:this.search,searchParams:this.searchParams,hash:this.hash}}clone(){return new d(String(this),this[u].options)}}},560659,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={PageSignatureError:function(){return a},RemovedPageError:function(){return s},RemovedUAError:function(){return o}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});class a extends Error{constructor({page:e}){super(`The middleware "${e}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `)}}class s extends Error{constructor(){super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `)}}class o extends Error{constructor(){super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `)}}},989364,(e,t,r)=>{"use strict";var n=Object.defineProperty,i=Object.getOwnPropertyDescriptor,a=Object.getOwnPropertyNames,s=Object.prototype.hasOwnProperty,o={},l={RequestCookies:()=>f,ResponseCookies:()=>y,parseCookie:()=>c,parseSetCookie:()=>h,stringifyCookie:()=>d};for(var u in l)n(o,u,{get:l[u],enumerable:!0});function d(e){var t;let r=["path"in e&&e.path&&`Path=${e.path}`,"expires"in e&&(e.expires||0===e.expires)&&`Expires=${("number"==typeof e.expires?new Date(e.expires):e.expires).toUTCString()}`,"maxAge"in e&&"number"==typeof e.maxAge&&`Max-Age=${e.maxAge}`,"domain"in e&&e.domain&&`Domain=${e.domain}`,"secure"in e&&e.secure&&"Secure","httpOnly"in e&&e.httpOnly&&"HttpOnly","sameSite"in e&&e.sameSite&&`SameSite=${e.sameSite}`,"partitioned"in e&&e.partitioned&&"Partitioned","priority"in e&&e.priority&&`Priority=${e.priority}`].filter(Boolean),n=`${e.name}=${encodeURIComponent(null!=(t=e.value)?t:"")}`;return 0===r.length?n:`${n}; ${r.join("; ")}`}function c(e){let t=new Map;for(let r of e.split(/; */)){if(!r)continue;let e=r.indexOf("=");if(-1===e){t.set(r,"true");continue}let[n,i]=[r.slice(0,e),r.slice(e+1)];try{t.set(n,decodeURIComponent(null!=i?i:"true"))}catch{}}return t}function h(e){if(!e)return;let[[t,r],...n]=c(e),{domain:i,expires:a,httponly:s,maxage:o,path:l,samesite:u,secure:d,partitioned:h,priority:f}=Object.fromEntries(n.map(([e,t])=>[e.toLowerCase().replace(/-/g,""),t]));{var y,b,g={name:t,value:decodeURIComponent(r),domain:i,...a&&{expires:new Date(a)},...s&&{httpOnly:!0},..."string"==typeof o&&{maxAge:Number(o)},path:l,...u&&{sameSite:p.includes(y=(y=u).toLowerCase())?y:void 0},...d&&{secure:!0},...f&&{priority:m.includes(b=(b=f).toLowerCase())?b:void 0},...h&&{partitioned:!0}};let e={};for(let t in g)g[t]&&(e[t]=g[t]);return e}}t.exports=((e,t,r,o)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let l of a(t))s.call(e,l)||l===r||n(e,l,{get:()=>t[l],enumerable:!(o=i(t,l))||o.enumerable});return e})(n({},"__esModule",{value:!0}),o);var p=["strict","lax","none"],m=["low","medium","high"],f=class{constructor(e){this._parsed=new Map,this._headers=e;const t=e.get("cookie");if(t)for(const[e,r]of c(t))this._parsed.set(e,{name:e,value:r})}[Symbol.iterator](){return this._parsed[Symbol.iterator]()}get size(){return this._parsed.size}get(...e){let t="string"==typeof e[0]?e[0]:e[0].name;return this._parsed.get(t)}getAll(...e){var t;let r=Array.from(this._parsed);if(!e.length)return r.map(([e,t])=>t);let n="string"==typeof e[0]?e[0]:null==(t=e[0])?void 0:t.name;return r.filter(([e])=>e===n).map(([e,t])=>t)}has(e){return this._parsed.has(e)}set(...e){let[t,r]=1===e.length?[e[0].name,e[0].value]:e,n=this._parsed;return n.set(t,{name:t,value:r}),this._headers.set("cookie",Array.from(n).map(([e,t])=>d(t)).join("; ")),this}delete(e){let t=this._parsed,r=Array.isArray(e)?e.map(e=>t.delete(e)):t.delete(e);return this._headers.set("cookie",Array.from(t).map(([e,t])=>d(t)).join("; ")),r}clear(){return this.delete(Array.from(this._parsed.keys())),this}[Symbol.for("edge-runtime.inspect.custom")](){return`RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(e=>`${e.name}=${encodeURIComponent(e.value)}`).join("; ")}},y=class{constructor(e){var t,r,n;this._parsed=new Map,this._headers=e;const i=null!=(n=null!=(r=null==(t=e.getSetCookie)?void 0:t.call(e))?r:e.get("set-cookie"))?n:[];for(const e of Array.isArray(i)?i:function(e){if(!e)return[];var t,r,n,i,a,s=[],o=0;function l(){for(;o<e.length&&/\s/.test(e.charAt(o));)o+=1;return o<e.length}for(;o<e.length;){for(t=o,a=!1;l();)if(","===(r=e.charAt(o))){for(n=o,o+=1,l(),i=o;o<e.length&&"="!==(r=e.charAt(o))&&";"!==r&&","!==r;)o+=1;o<e.length&&"="===e.charAt(o)?(a=!0,o=i,s.push(e.substring(t,n)),t=o):o=n+1}else o+=1;(!a||o>=e.length)&&s.push(e.substring(t,e.length))}return s}(i)){const t=h(e);t&&this._parsed.set(t.name,t)}}get(...e){let t="string"==typeof e[0]?e[0]:e[0].name;return this._parsed.get(t)}getAll(...e){var t;let r=Array.from(this._parsed.values());if(!e.length)return r;let n="string"==typeof e[0]?e[0]:null==(t=e[0])?void 0:t.name;return r.filter(e=>e.name===n)}has(e){return this._parsed.has(e)}set(...e){let[t,r,n]=1===e.length?[e[0].name,e[0].value,e[0]]:e,i=this._parsed;return i.set(t,function(e={name:"",value:""}){return"number"==typeof e.expires&&(e.expires=new Date(e.expires)),e.maxAge&&(e.expires=new Date(Date.now()+1e3*e.maxAge)),(null===e.path||void 0===e.path)&&(e.path="/"),e}({name:t,value:r,...n})),function(e,t){for(let[,r]of(t.delete("set-cookie"),e)){let e=d(r);t.append("set-cookie",e)}}(i,this._headers),this}delete(...e){let[t,r]="string"==typeof e[0]?[e[0]]:[e[0].name,e[0]];return this.set({...r,name:t,value:"",expires:new Date(0)})}[Symbol.for("edge-runtime.inspect.custom")](){return`ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(d).join("; ")}}},86547,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={RequestCookies:function(){return a.RequestCookies},ResponseCookies:function(){return a.ResponseCookies},stringifyCookie:function(){return a.stringifyCookie}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(989364)},641165,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={INTERNALS:function(){return u},NextRequest:function(){return d}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(723866),s=e.r(287790),o=e.r(560659),l=e.r(86547),u=Symbol("internal request");class d extends Request{constructor(e,t={}){const r="string"!=typeof e&&"url"in e?e.url:String(e);(0,s.validateURL)(r),t.body&&"half"!==t.duplex&&(t.duplex="half"),e instanceof Request?super(e,t):super(r,t);const n=new a.NextURL(r,{headers:(0,s.toNodeOutgoingHttpHeaders)(this.headers),nextConfig:t.nextConfig});this[u]={cookies:new l.RequestCookies(this.headers),nextUrl:n,url:n.toString()}}[Symbol.for("edge-runtime.inspect.custom")](){return{cookies:this.cookies,nextUrl:this.nextUrl,url:this.url,bodyUsed:this.bodyUsed,cache:this.cache,credentials:this.credentials,destination:this.destination,headers:Object.fromEntries(this.headers),integrity:this.integrity,keepalive:this.keepalive,method:this.method,mode:this.mode,redirect:this.redirect,referrer:this.referrer,referrerPolicy:this.referrerPolicy,signal:this.signal}}get cookies(){return this[u].cookies}get nextUrl(){return this[u].nextUrl}get page(){throw new o.RemovedPageError}get ua(){throw new o.RemovedUAError}get url(){return this[u].url}}},110118,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={isNodeNextRequest:function(){return o},isNodeNextResponse:function(){return l},isWebNextRequest:function(){return a},isWebNextResponse:function(){return s}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e=>!1,s=e=>!1,o=e=>!0,l=e=>!0},647573,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={NextRequestAdapter:function(){return p},ResponseAborted:function(){return d},ResponseAbortedName:function(){return u},createAbortController:function(){return c},signalFromNodeResponse:function(){return h}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(255841),s=e.r(287790),o=e.r(641165),l=e.r(110118),u="ResponseAborted";class d extends Error{constructor(...e){super(...e),this.name=u}}function c(e){let t=new AbortController;return e.once("close",()=>{e.writableFinished||t.abort(new d)}),t}function h(e){let{errored:t,destroyed:r}=e;if(t||r)return AbortSignal.abort(t??new d);let{signal:n}=c(e);return n}class p{static fromBaseNextRequest(e,t){if((0,l.isNodeNextRequest)(e))return p.fromNodeNextRequest(e,t);throw Object.defineProperty(Error("Invariant: Unsupported NextRequest type"),"__NEXT_ERROR_CODE",{value:"E345",enumerable:!1,configurable:!0})}static fromNodeNextRequest(e,t){let r,n=null;if("GET"!==e.method&&"HEAD"!==e.method&&e.body&&(n=e.body),e.url.startsWith("http"))r=new URL(e.url);else{let t=(0,a.getRequestMeta)(e,"initURL");r=t&&t.startsWith("http")?new URL(e.url,t):new URL(e.url,"http://n")}return new o.NextRequest(r,{method:e.method,headers:(0,s.fromNodeOutgoingHttpHeaders)(e.headers),duplex:"half",signal:t,...t.aborted?{}:{body:n}})}static fromWebNextRequest(e){let t=null;return"GET"!==e.method&&"HEAD"!==e.method&&(t=e.body),new o.NextRequest(e.url,{method:e.method,headers:(0,s.fromNodeOutgoingHttpHeaders)(e.headers),duplex:"half",signal:e.request.signal,...e.request.signal.aborted?{}:{body:t}})}}},490035,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={getClientComponentLoaderMetrics:function(){return u},wrapClientComponentLoader:function(){return l}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=0,s=0,o=0;function l(e){return"performance"in globalThis?{require:(...t)=>{let r=performance.now();0===a&&(a=r);try{return o+=1,e.__next_app__.require(...t)}finally{s+=performance.now()-r}},loadChunk:(...t)=>{let r=performance.now(),n=e.__next_app__.loadChunk(...t);return n.finally(()=>{s+=performance.now()-r}),n}}:e.__next_app__}function u(e={}){let t=0===a?void 0:{clientComponentLoadStart:a,clientComponentLoadTimes:s,clientComponentLoadCount:o};return e.reset&&(a=0,s=0,o=0),t}},74049,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={isAbortError:function(){return d},pipeToNodeResponse:function(){return c}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(647573),s=e.r(884761),o=e.r(166541),l=e.r(387064),u=e.r(490035);function d(e){return(null==e?void 0:e.name)==="AbortError"||(null==e?void 0:e.name)===a.ResponseAbortedName}async function c(e,t,r){try{let{errored:n,destroyed:i}=t;if(n||i)return;let d=(0,a.createAbortController)(t),c=function(e,t){let r=!1,n=new s.DetachedPromise;function i(){n.resolve()}e.on("drain",i),e.once("close",()=>{e.off("drain",i),n.resolve()});let a=new s.DetachedPromise;return e.once("finish",()=>{a.resolve()}),new WritableStream({write:async t=>{if(!r){if(r=!0,"performance"in globalThis&&process.env.NEXT_OTEL_PERFORMANCE_PREFIX){let e=(0,u.getClientComponentLoaderMetrics)();e&&performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`,{start:e.clientComponentLoadStart,end:e.clientComponentLoadStart+e.clientComponentLoadTimes})}e.flushHeaders(),(0,o.getTracer)().trace(l.NextNodeServerSpan.startResponse,{spanName:"start response"},()=>void 0)}try{let r=e.write(t);"flush"in e&&"function"==typeof e.flush&&e.flush(),r||(await n.promise,n=new s.DetachedPromise)}catch(t){throw e.end(),Object.defineProperty(Error("failed to write chunk to response",{cause:t}),"__NEXT_ERROR_CODE",{value:"E321",enumerable:!1,configurable:!0})}},abort:t=>{e.writableFinished||e.destroy(t)},close:async()=>{if(t&&await t,!e.writableFinished)return e.end(),a.promise}})}(t,r);await e.pipeTo(c,{signal:d.signal})}catch(e){if(d(e))return;throw Object.defineProperty(Error("failed to pipe response",{cause:e}),"__NEXT_ERROR_CODE",{value:"E180",enumerable:!1,configurable:!0})}}},374617,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return s}});let n=e.r(831963),i=e.r(74049),a=e.r(585346);class s{static #e=this.EMPTY=new s(null,{metadata:{},contentType:null});static fromStatic(e,t){return new s(e,{metadata:{},contentType:t})}constructor(e,{contentType:t,waitUntil:r,metadata:n}){this.response=e,this.contentType=t,this.metadata=n,this.waitUntil=r}assignMetadata(e){Object.assign(this.metadata,e)}get isNull(){return null===this.response}get isDynamic(){return"string"!=typeof this.response}toUnchunkedString(e=!1){if(null===this.response)return"";if("string"!=typeof this.response){if(!e)throw Object.defineProperty(new a.InvariantError("dynamic responses cannot be unchunked. This is a bug in Next.js"),"__NEXT_ERROR_CODE",{value:"E732",enumerable:!1,configurable:!0});return(0,n.streamToString)(this.readable)}return this.response}get readable(){return null===this.response?new ReadableStream({start(e){e.close()}}):"string"==typeof this.response?(0,n.streamFromString)(this.response):Buffer.isBuffer(this.response)?(0,n.streamFromBuffer)(this.response):Array.isArray(this.response)?(0,n.chainStreams)(...this.response):this.response}coerce(){return null===this.response?[]:"string"==typeof this.response?[(0,n.streamFromString)(this.response)]:Array.isArray(this.response)?this.response:Buffer.isBuffer(this.response)?[(0,n.streamFromBuffer)(this.response)]:[this.response]}unshift(e){this.response=this.coerce(),this.response.unshift(e)}push(e){this.response=this.coerce(),this.response.push(e)}async pipeTo(e){try{await this.readable.pipeTo(e,{preventClose:!0}),this.waitUntil&&await this.waitUntil,await e.close()}catch(t){if((0,i.isAbortError)(t))return void await e.abort(t);throw t}}async pipeToNodeResponse(e){await (0,i.pipeToNodeResponse)(this.readable,e,this.waitUntil)}}},601762,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"RouteKind",{enumerable:!0,get:function(){return i}});var n,i=((n={}).PAGES="PAGES",n.PAGES_API="PAGES_API",n.APP_PAGE="APP_PAGE",n.APP_ROUTE="APP_ROUTE",n.IMAGE="IMAGE",n)},643507,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n,i={fromResponseCacheEntry:function(){return d},routeKindToIncrementalCacheKind:function(){return h},toResponseCacheEntry:function(){return c}};for(var a in i)Object.defineProperty(r,a,{enumerable:!0,get:i[a]});let s=e.r(4909),o=(n=e.r(374617))&&n.__esModule?n:{default:n},l=e.r(601762),u=e.r(419372);async function d(e){var t,r;return{...e,value:(null==(t=e.value)?void 0:t.kind)===s.CachedRouteKind.PAGES?{kind:s.CachedRouteKind.PAGES,html:await e.value.html.toUnchunkedString(!0),pageData:e.value.pageData,headers:e.value.headers,status:e.value.status}:(null==(r=e.value)?void 0:r.kind)===s.CachedRouteKind.APP_PAGE?{kind:s.CachedRouteKind.APP_PAGE,html:await e.value.html.toUnchunkedString(!0),postponed:e.value.postponed,rscData:e.value.rscData,headers:e.value.headers,status:e.value.status,segmentData:e.value.segmentData}:e.value}}async function c(e){var t,r;return e?{isMiss:e.isMiss,isStale:e.isStale,cacheControl:e.cacheControl,value:(null==(t=e.value)?void 0:t.kind)===s.CachedRouteKind.PAGES?{kind:s.CachedRouteKind.PAGES,html:o.default.fromStatic(e.value.html,u.HTML_CONTENT_TYPE_HEADER),pageData:e.value.pageData,headers:e.value.headers,status:e.value.status}:(null==(r=e.value)?void 0:r.kind)===s.CachedRouteKind.APP_PAGE?{kind:s.CachedRouteKind.APP_PAGE,html:o.default.fromStatic(e.value.html,u.HTML_CONTENT_TYPE_HEADER),rscData:e.value.rscData,headers:e.value.headers,status:e.value.status,postponed:e.value.postponed,segmentData:e.value.segmentData}:e.value}:null}function h(e){switch(e){case l.RouteKind.PAGES:return s.IncrementalCacheKind.PAGES;case l.RouteKind.APP_PAGE:return s.IncrementalCacheKind.APP_PAGE;case l.RouteKind.IMAGE:return s.IncrementalCacheKind.IMAGE;case l.RouteKind.APP_ROUTE:return s.IncrementalCacheKind.APP_ROUTE;case l.RouteKind.PAGES_API:throw Object.defineProperty(Error(`Unexpected route kind ${e}`),"__NEXT_ERROR_CODE",{value:"E64",enumerable:!1,configurable:!0});default:return e}}},153960,(e,t,r)=>{"use strict";var n,i;Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return f}});let a=e.r(165356),s=e.r(899509),o=e.r(889593),l=e.r(609975),u=e.r(643507);function d(e,t){if(!e)return t;let r=parseInt(e,10);return Number.isFinite(r)&&r>0?r:t}n=e.r(4909),i=r,Object.keys(n).forEach(function(e){"default"===e||Object.prototype.hasOwnProperty.call(i,e)||Object.defineProperty(i,e,{enumerable:!0,get:function(){return n[e]}})});let c=d(process.env.NEXT_PRIVATE_RESPONSE_CACHE_TTL,1e4),h=d(process.env.NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE,150),p="__ttl_sentinel__";function m(e,t){return`${e}\0${t??p}`}class f{constructor(e,t=h,r=c){this.getBatcher=a.Batcher.create({cacheKeyFn:({key:e,isOnDemandRevalidate:t})=>`${e}-${t?"1":"0"}`,schedulerFn:l.scheduleOnNextTick}),this.revalidateBatcher=a.Batcher.create({schedulerFn:l.scheduleOnNextTick}),this.evictedInvocationIDs=new Set,this.minimal_mode=e,this.maxSize=t,this.ttl=r,this.cache=new s.LRUCache(t,void 0,e=>{let t=function(e){let t=e.lastIndexOf("\0");if(-1===t)return;let r=e.slice(t+1);return r===p?void 0:r}(e);if(t){if(this.evictedInvocationIDs.size>=100){let e=this.evictedInvocationIDs.values().next().value;e&&this.evictedInvocationIDs.delete(e)}this.evictedInvocationIDs.add(t)}})}async get(e,t,r){if(!e)return t({hasResolved:!1,previousCacheEntry:null});if(this.minimal_mode){let t=m(e,r.invocationID),n=this.cache.get(t);if(n){if(void 0!==r.invocationID)return(0,u.toResponseCacheEntry)(n.entry);let e=Date.now();if(n.expiresAt>e)return(0,u.toResponseCacheEntry)(n.entry);this.cache.remove(t)}r.invocationID&&this.evictedInvocationIDs.has(r.invocationID)&&(0,o.warnOnce)(`Response cache entry was evicted for invocation ${r.invocationID}. Consider increasing NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE (current: ${this.maxSize}).`)}let{incrementalCache:n,isOnDemandRevalidate:i=!1,isFallback:a=!1,isRoutePPREnabled:s=!1,isPrefetch:l=!1,waitUntil:d,routeKind:c,invocationID:h}=r,p=await this.getBatcher.batch({key:e,isOnDemandRevalidate:i},({resolve:r})=>{let o=this.handleGet(e,t,{incrementalCache:n,isOnDemandRevalidate:i,isFallback:a,isRoutePPREnabled:s,isPrefetch:l,routeKind:c,invocationID:h},r);return d&&d(o),o});return(0,u.toResponseCacheEntry)(p)}async handleGet(e,t,r,n){let i=null,a=!1;try{if((i=this.minimal_mode?null:await r.incrementalCache.get(e,{kind:(0,u.routeKindToIncrementalCacheKind)(r.routeKind),isRoutePPREnabled:r.isRoutePPREnabled,isFallback:r.isFallback}))&&!r.isOnDemandRevalidate&&(n(i),a=!0,!i.isStale||r.isPrefetch))return i;let s=await this.revalidate(e,r.incrementalCache,r.isRoutePPREnabled,r.isFallback,t,i,null!==i&&!r.isOnDemandRevalidate,void 0,r.invocationID);if(!s){if(this.minimal_mode){let t=m(e,r.invocationID);this.cache.remove(t)}return null}return r.isOnDemandRevalidate,s}catch(e){if(a)return console.error(e),null;throw e}}async revalidate(e,t,r,n,i,a,s,o,l){return this.revalidateBatcher.batch(e,()=>{let u=this.handleRevalidate(e,t,r,n,i,a,s,l);return o&&o(u),u})}async handleRevalidate(e,t,r,n,i,a,s,o){try{let l=await i({hasResolved:s,previousCacheEntry:a,isRevalidating:!0});if(!l)return null;let d=await (0,u.fromResponseCacheEntry)({...l,isMiss:!a});if(d.cacheControl)if(this.minimal_mode){let t=m(e,o);this.cache.set(t,{entry:d,expiresAt:Date.now()+this.ttl})}else await t.set(e,d.value,{cacheControl:d.cacheControl,isRoutePPREnabled:r,isFallback:n});return d}catch(i){if(null==a?void 0:a.cacheControl){let i=Math.min(Math.max(a.cacheControl.revalidate||3,3),30),s=void 0===a.cacheControl.expire?void 0:Math.max(i+3,a.cacheControl.expire);await t.set(e,a.value,{cacheControl:{revalidate:i,expire:s},isRoutePPREnabled:r,isFallback:n})}throw i}}}},900338,(e,t,r)=>{"use strict";function n(){let e,t,r=new Promise((r,n)=>{e=r,t=n});return{resolve:e,reject:t,promise:r}}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"createPromiseWithResolvers",{enumerable:!0,get:function(){return n}})},865832,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n,i={RenderStage:function(){return l},StagedRenderingController:function(){return u}};for(var a in i)Object.defineProperty(r,a,{enumerable:!0,get:i[a]});let s=e.r(585346),o=e.r(900338);var l=((n={})[n.Before=1]="Before",n[n.Static=2]="Static",n[n.Runtime=3]="Runtime",n[n.Dynamic=4]="Dynamic",n[n.Abandoned=5]="Abandoned",n);class u{constructor(e=null,t){this.abortSignal=e,this.hasRuntimePrefetch=t,this.currentStage=1,this.staticInterruptReason=null,this.runtimeInterruptReason=null,this.staticStageEndTime=1/0,this.runtimeStageEndTime=1/0,this.runtimeStageListeners=[],this.dynamicStageListeners=[],this.runtimeStagePromise=(0,o.createPromiseWithResolvers)(),this.dynamicStagePromise=(0,o.createPromiseWithResolvers)(),this.mayAbandon=!1,e&&(e.addEventListener("abort",()=>{let{reason:t}=e;this.currentStage<3&&(this.runtimeStagePromise.promise.catch(d),this.runtimeStagePromise.reject(t)),(this.currentStage<4||5===this.currentStage)&&(this.dynamicStagePromise.promise.catch(d),this.dynamicStagePromise.reject(t))},{once:!0}),this.mayAbandon=!0)}onStage(e,t){if(this.currentStage>=e)t();else if(3===e)this.runtimeStageListeners.push(t);else if(4===e)this.dynamicStageListeners.push(t);else throw Object.defineProperty(new s.InvariantError(`Invalid render stage: ${e}`),"__NEXT_ERROR_CODE",{value:"E881",enumerable:!1,configurable:!0})}canSyncInterrupt(){if(1===this.currentStage)return!1;let e=this.hasRuntimePrefetch?4:3;return this.currentStage<e}syncInterruptCurrentStageWithReason(e){if(1!==this.currentStage){if(this.mayAbandon)return this.abandonRenderImpl();switch(this.currentStage){case 2:this.staticInterruptReason=e,this.advanceStage(4);return;case 3:this.hasRuntimePrefetch&&(this.runtimeInterruptReason=e,this.advanceStage(4));return}}}getStaticInterruptReason(){return this.staticInterruptReason}getRuntimeInterruptReason(){return this.runtimeInterruptReason}getStaticStageEndTime(){return this.staticStageEndTime}getRuntimeStageEndTime(){return this.runtimeStageEndTime}abandonRender(){if(!this.mayAbandon)throw Object.defineProperty(new s.InvariantError("`abandonRender` called on a stage controller that cannot be abandoned."),"__NEXT_ERROR_CODE",{value:"E938",enumerable:!1,configurable:!0});this.abandonRenderImpl()}abandonRenderImpl(){let{currentStage:e}=this;switch(e){case 2:this.currentStage=5,this.resolveRuntimeStage();return;case 3:this.currentStage=5;return}}advanceStage(e){if(e<=this.currentStage)return;let t=this.currentStage;if(this.currentStage=e,t<3&&e>=3&&(this.staticStageEndTime=performance.now()+performance.timeOrigin,this.resolveRuntimeStage()),t<4&&e>=4){this.runtimeStageEndTime=performance.now()+performance.timeOrigin,this.resolveDynamicStage();return}}resolveRuntimeStage(){let e=this.runtimeStageListeners;for(let t=0;t<e.length;t++)e[t]();e.length=0,this.runtimeStagePromise.resolve()}resolveDynamicStage(){let e=this.dynamicStageListeners;for(let t=0;t<e.length;t++)e[t]();e.length=0,this.dynamicStagePromise.resolve()}getStagePromise(e){switch(e){case 3:return this.runtimeStagePromise.promise;case 4:return this.dynamicStagePromise.promise;default:throw Object.defineProperty(new s.InvariantError(`Invalid render stage: ${e}`),"__NEXT_ERROR_CODE",{value:"E881",enumerable:!1,configurable:!0})}}waitForStage(e){return this.getStagePromise(e)}delayUntilStage(e,t,r){var n,i,a;let s,o=(n=this.getStagePromise(e),i=t,a=r,s=new Promise((e,t)=>{n.then(e.bind(null,a),t)}),void 0!==i&&(s.displayName=i),s);return this.abortSignal&&o.catch(d),o}}function d(){}},188232,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={NEXT_PATCH_SYMBOL:function(){return m},createPatchedFetcher:function(){return E},patchFetch:function(){return K},validateRevalidate:function(){return f},validateTags:function(){return y}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(387064),s=e.r(166541),o=e.r(419372),l=e.r(258200),u=e.r(756725),d=e.r(840578),c=e.r(832319),h=e.r(153960),p=e.r(696482);e.r(865832);let m=Symbol.for("next-patch");function f(e,t){try{let r;if(!1===e)r=o.INFINITE_CACHE;else if("number"==typeof e&&!isNaN(e)&&e>-1)r=e;else if(void 0!==e)throw Object.defineProperty(Error(`Invalid revalidate value "${e}" on "${t}", must be a non-negative number or false`),"__NEXT_ERROR_CODE",{value:"E179",enumerable:!1,configurable:!0});return r}catch(e){if(e instanceof Error&&e.message.includes("Invalid revalidate"))throw e;return}}function y(e,t){let r=[],n=[];for(let i=0;i<e.length;i++){let a=e[i];if("string"!=typeof a?n.push({tag:a,reason:"invalid type, must be a string"}):a.length>o.NEXT_CACHE_TAG_MAX_LENGTH?n.push({tag:a,reason:`exceeded max length of ${o.NEXT_CACHE_TAG_MAX_LENGTH}`}):r.push(a),r.length>o.NEXT_CACHE_TAG_MAX_ITEMS){console.warn(`Warning: exceeded max tag count for ${t}, dropped tags:`,e.slice(i).join(", "));break}}if(n.length>0)for(let{tag:e,reason:r}of(console.warn(`Warning: invalid tags passed to ${t}: `),n))console.log(`tag: "${e}" ${r}`);return r}function b(e,t){e.shouldTrackFetchMetrics&&(e.fetchMetrics??=[],e.fetchMetrics.push({...t,end:performance.timeOrigin+performance.now(),idx:e.nextFetchId||0}))}async function g(e,t,r,n,i,a){let s=await e.arrayBuffer(),o={headers:Object.fromEntries(e.headers.entries()),body:Buffer.from(s).toString("base64"),status:e.status,url:e.url};return r&&await n.set(t,{kind:h.CachedRouteKind.FETCH,data:o,revalidate:i},r),await a(),new Response(s,{headers:e.headers,status:e.status,statusText:e.statusText})}async function v(e,t,r,n,i,a,s,o,l){let[u,d]=(0,p.cloneResponse)(t),c=u.arrayBuffer().then(async e=>{let t=Buffer.from(e),o={headers:Object.fromEntries(u.headers.entries()),body:t.toString("base64"),status:u.status,url:u.url};null==a||a.set(r,o),n&&await i.set(r,{kind:h.CachedRouteKind.FETCH,data:o,revalidate:s},n)}).catch(e=>console.warn("Failed to set fetch cache",o,e)).finally(l),m=`cache-set-${r}`,f=e.pendingRevalidates??={},y=Promise.resolve();return m in f&&(y=f[m]),f[m]=y.then(()=>c).finally(()=>{(null==f?void 0:f[m])&&delete f[m]}),d}function E(e,{workAsyncStorage:t,workUnitAsyncStorage:r}){let n=async function(n,i){var d,m;let E;try{(E=new URL(n instanceof Request?n.url:n)).username="",E.password=""}catch{E=void 0}let K=(null==E?void 0:E.href)??"",I=(null==i||null==(d=i.method)?void 0:d.toUpperCase())||"GET",w=(null==i||null==(m=i.next)?void 0:m.internal)===!0,x="1"===process.env.NEXT_OTEL_FETCH_DISABLED,T=w?void 0:performance.timeOrigin+performance.now(),R=t.getStore(),j=r.getStore(),k=j?(0,c.getCacheSignal)(j):null;k&&k.beginRead();let A=(0,s.getTracer)().trace(w?a.NextNodeServerSpan.internalFetch:a.AppRenderSpan.fetch,{hideSpan:x,kind:s.SpanKind.CLIENT,spanName:["fetch",I,K].filter(Boolean).join(" "),attributes:{"http.url":K,"http.method":I,"net.peer.name":null==E?void 0:E.hostname,"net.peer.port":(null==E?void 0:E.port)||void 0}},async()=>{var t;let r,a,s,d,c,m;if(w||!R||R.isDraftMode)return e(n,i);let E=n&&"object"==typeof n&&"string"==typeof n.method,I=e=>(null==i?void 0:i[e])||(E?n[e]:null),x=e=>{var t,r,a;return void 0!==(null==i||null==(t=i.next)?void 0:t[e])?null==i||null==(r=i.next)?void 0:r[e]:E?null==(a=n.next)?void 0:a[e]:void 0},A=x("revalidate"),O=A,D=y(x("tags")||[],`fetch ${n.toString()}`);if(j)switch(j.type){case"prerender":case"prerender-runtime":case"prerender-client":case"prerender-ppr":case"prerender-legacy":case"cache":case"private-cache":r=j}if(r&&Array.isArray(D)){let e=r.tags??(r.tags=[]);for(let t of D)e.includes(t)||e.push(t)}let C=null==j?void 0:j.implicitTags,P=R.fetchCache;j&&"unstable-cache"===j.type&&(P="force-no-store");let _=!!R.isUnstableNoStore,M=I("cache"),N="";"string"==typeof M&&void 0!==O&&("force-cache"===M&&0===O||"no-store"===M&&(O>0||!1===O))&&(a=`Specified "cache: ${M}" and "revalidate: ${O}", only one should be specified.`,M=void 0,O=void 0);let L="no-cache"===M||"no-store"===M||"force-no-store"===P||"only-no-store"===P,J=!P&&!M&&!O&&R.forceDynamic;"force-cache"===M&&void 0===O?O=!1:(L||J)&&(O=0),("no-cache"===M||"no-store"===M)&&(N=`cache: ${M}`),m=f(O,R.route);let F=I("headers"),G="function"==typeof(null==F?void 0:F.get)?F:new Headers(F||{}),V=G.get("authorization")||G.get("cookie"),q=!["get","head"].includes((null==(t=I("method"))?void 0:t.toLowerCase())||"get"),Y=void 0==P&&(void 0==M||"default"===M)&&void 0==O,B=!!((V||q)&&(null==r?void 0:r.revalidate)===0),U=!1;if(!B&&Y&&(R.isBuildTimePrerendering?U=!0:B=!0),Y&&void 0!==j)switch(j.type){case"prerender":case"prerender-runtime":case"prerender-client":return k&&(k.endRead(),k=null),(0,u.makeHangingPromise)(j.renderSignal,R.route,"fetch()")}switch(P){case"force-no-store":N="fetchCache = force-no-store";break;case"only-no-store":if("force-cache"===M||void 0!==m&&m>0)throw Object.defineProperty(Error(`cache: 'force-cache' used on fetch for ${K} with 'export const fetchCache = 'only-no-store'`),"__NEXT_ERROR_CODE",{value:"E448",enumerable:!1,configurable:!0});N="fetchCache = only-no-store";break;case"only-cache":if("no-store"===M)throw Object.defineProperty(Error(`cache: 'no-store' used on fetch for ${K} with 'export const fetchCache = 'only-cache'`),"__NEXT_ERROR_CODE",{value:"E521",enumerable:!1,configurable:!0});break;case"force-cache":(void 0===O||0===O)&&(N="fetchCache = force-cache",m=o.INFINITE_CACHE)}if(void 0===m?"default-cache"!==P||_?"default-no-store"===P?(m=0,N="fetchCache = default-no-store"):_?(m=0,N="noStore call"):B?(m=0,N="auto no cache"):(N="auto cache",m=r?r.revalidate:o.INFINITE_CACHE):(m=o.INFINITE_CACHE,N="fetchCache = default-cache"):N||(N=`revalidate: ${m}`),!(R.forceStatic&&0===m)&&!B&&r&&m<r.revalidate){if(0===m){if(j)switch(j.type){case"prerender":case"prerender-client":case"prerender-runtime":return k&&(k.endRead(),k=null),(0,u.makeHangingPromise)(j.renderSignal,R.route,"fetch()")}(0,l.markCurrentScopeAsDynamic)(R,j,`revalidate: 0 fetch ${n} ${R.route}`)}r&&A===m&&(r.revalidate=m)}let $="number"==typeof m&&m>0,{incrementalCache:W}=R,H=!1;if(j)switch(j.type){case"request":case"cache":case"private-cache":H=j.isHmrRefresh??!1,d=j.serverComponentsHmrCache}if(W&&($||d))try{s=await W.generateCacheKey(K,E?n:i)}catch(e){console.error("Failed to generate cache key for",n)}let z=R.nextFetchId??1;R.nextFetchId=z+1;let X=()=>{},Q=async(t,r)=>{let l=["cache","credentials","headers","integrity","keepalive","method","mode","redirect","referrer","referrerPolicy","window","duplex",...t?[]:["signal"]];if(E){let e=n,t={body:e._ogBody||e.body};for(let r of l)t[r]=e[r];n=new Request(e.url,t)}else if(i){let{_ogBody:e,body:r,signal:n,...a}=i;i={...a,body:e||r,signal:t?void 0:n}}let u={...i,next:{...null==i?void 0:i.next,fetchType:"origin",fetchIdx:z}};return e(n,u).then(async e=>{if(!t&&T&&b(R,{start:T,url:K,cacheReason:r||N,cacheStatus:0===m||r?"skip":"miss",cacheWarning:a,status:e.status,method:u.method||"GET"}),200===e.status&&W&&s&&($||d)){let t=m>=o.INFINITE_CACHE?o.CACHE_ONE_YEAR:m,r=$?{fetchCache:!0,fetchUrl:K,fetchIdx:z,tags:D,isImplicitBuildTimeCache:U}:void 0;switch(null==j?void 0:j.type){case"prerender":case"prerender-client":case"prerender-runtime":return g(e,s,r,W,t,X);case"request":case"prerender-ppr":case"prerender-legacy":case"cache":case"private-cache":case"unstable-cache":case void 0:return v(R,e,s,r,W,d,t,n,X)}}return await X(),e}).catch(e=>{throw X(),e})},Z=!1,ee=!1;if(s&&W){let e;if(H&&d&&(e=d.get(s),ee=!0),$&&!e){X=await W.lock(s);let t=R.isOnDemandRevalidate?null:await W.get(s,{kind:h.IncrementalCacheKind.FETCH,revalidate:m,fetchUrl:K,fetchIdx:z,tags:D,softTags:null==C?void 0:C.tags});if(Y&&j)switch(j.type){case"prerender":case"prerender-client":case"prerender-runtime":await (S||(S=new Promise(e=>{setTimeout(()=>{S=null,e()},0)})),S)}if(t?await X():c="cache-control: no-cache (hard refresh)",(null==t?void 0:t.value)&&t.value.kind===h.CachedRouteKind.FETCH)if(R.isStaticGeneration&&t.isStale)Z=!0;else{if(t.isStale&&(R.pendingRevalidates??={},!R.pendingRevalidates[s])){let e=Q(!0).then(async e=>({body:await e.arrayBuffer(),headers:e.headers,status:e.status,statusText:e.statusText})).finally(()=>{R.pendingRevalidates??={},delete R.pendingRevalidates[s||""]});e.catch(console.error),R.pendingRevalidates[s]=e}e=t.value.data}}if(e){T&&b(R,{start:T,url:K,cacheReason:N,cacheStatus:ee?"hmr":"hit",cacheWarning:a,status:e.status||200,method:(null==i?void 0:i.method)||"GET"});let t=new Response(Buffer.from(e.body,"base64"),{headers:e.headers,status:e.status});return Object.defineProperty(t,"url",{value:e.url}),t}}if(R.isStaticGeneration&&i&&"object"==typeof i){let{cache:e}=i;if("no-store"===e){if(j)switch(j.type){case"prerender":case"prerender-client":case"prerender-runtime":return k&&(k.endRead(),k=null),(0,u.makeHangingPromise)(j.renderSignal,R.route,"fetch()")}(0,l.markCurrentScopeAsDynamic)(R,j,`no-store fetch ${n} ${R.route}`)}let t="next"in i,{next:a={}}=i;if("number"==typeof a.revalidate&&r&&a.revalidate<r.revalidate){if(0===a.revalidate){if(j)switch(j.type){case"prerender":case"prerender-client":case"prerender-runtime":return(0,u.makeHangingPromise)(j.renderSignal,R.route,"fetch()")}(0,l.markCurrentScopeAsDynamic)(R,j,`revalidate: 0 fetch ${n} ${R.route}`)}R.forceStatic&&0===a.revalidate||(r.revalidate=a.revalidate)}t&&delete i.next}if(!s||!Z)return Q(!1,c);{let e=s;R.pendingRevalidates??={};let t=R.pendingRevalidates[e];if(t){let e=await t;return new Response(e.body,{headers:e.headers,status:e.status,statusText:e.statusText})}let r=Q(!0,c).then(p.cloneResponse);return(t=r.then(async e=>{let t=e[0];return{body:await t.arrayBuffer(),headers:t.headers,status:t.status,statusText:t.statusText}}).finally(()=>{var t;(null==(t=R.pendingRevalidates)?void 0:t[e])&&delete R.pendingRevalidates[e]})).catch(()=>{}),R.pendingRevalidates[e]=t,r.then(e=>e[1])}});if(k)try{return await A}finally{k&&k.endRead()}return A};return n.__nextPatched=!0,n.__nextGetStaticStore=()=>t,n._nextOriginalFetch=e,globalThis[m]=!0,Object.defineProperty(n,"name",{value:"fetch",writable:!1}),n}function K(e){if(!0===globalThis[m])return;let t=(0,d.createDedupeFetch)(globalThis.fetch);globalThis.fetch=E(t,e)}let S=null},255706,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"unstable_cache",{enumerable:!0,get:function(){return d}});let n=e.r(419372),i=e.r(188232),a=e.r(556704),s=e.r(832319),o=e.r(153960),l=0;async function u(e,t,r,i,a,s,l){await t.set(r,{kind:o.CachedRouteKind.FETCH,data:{headers:{},body:JSON.stringify(e),status:200,url:""},revalidate:"number"!=typeof a?n.CACHE_ONE_YEAR:a},{fetchCache:!0,tags:i,fetchIdx:s,fetchUrl:l})}function d(e,t,r={}){if(0===r.revalidate)throw Object.defineProperty(Error(`Invariant revalidate: 0 can not be passed to unstable_cache(), must be "false" or "> 0" ${e.toString()}`),"__NEXT_ERROR_CODE",{value:"E57",enumerable:!1,configurable:!0});let n=r.tags?(0,i.validateTags)(r.tags,`unstable_cache ${e.toString()}`):[];(0,i.validateRevalidate)(r.revalidate,`unstable_cache ${e.name||e.toString()}`);let c=`${e.toString()}-${Array.isArray(t)&&t.join(",")}`;return async(...t)=>{let i=a.workAsyncStorage.getStore(),d=s.workUnitAsyncStorage.getStore(),h=(null==i?void 0:i.incrementalCache)||globalThis.__incrementalCache;if(!h)throw Object.defineProperty(Error(`Invariant: incrementalCache missing in unstable_cache ${e.toString()}`),"__NEXT_ERROR_CODE",{value:"E469",enumerable:!1,configurable:!0});let p=d?(0,s.getCacheSignal)(d):null;p&&p.beginRead();try{let a=i&&d?function(e,t){switch(t.type){case"request":let r=t.url.pathname,n=new URLSearchParams(t.url.search),i=[...n.keys()].sort((e,t)=>e.localeCompare(t)).map(e=>`${e}=${n.get(e)}`).join("&");return`${r}${i.length?"?":""}${i}`;case"prerender":case"prerender-client":case"prerender-runtime":case"prerender-ppr":case"prerender-legacy":case"cache":case"private-cache":case"unstable-cache":return e.route;default:return t}}(i,d):"",p=`${c}-${JSON.stringify(t)}`,m=await h.generateCacheKey(p),f=`unstable_cache ${a} ${e.name?` ${e.name}`:m}`,y=(i?i.nextFetchId:l)??1,b=null==d?void 0:d.implicitTags,g={type:"unstable-cache",phase:"render",implicitTags:b,draftMode:d&&i&&(0,s.getDraftModeProviderForCacheScope)(i,d)};if(i){i.nextFetchId=y+1;let a=!1;if(d)switch(d.type){case"cache":case"private-cache":case"prerender":case"prerender-runtime":case"prerender-ppr":case"prerender-legacy":"number"==typeof r.revalidate&&(d.revalidate<r.revalidate||(d.revalidate=r.revalidate));let l=d.tags;if(null===l)d.tags=n.slice();else for(let e of n)l.includes(e)||l.push(e);break;case"unstable-cache":a=!0}if(!a&&"force-no-store"!==i.fetchCache&&!i.isOnDemandRevalidate&&!h.isOnDemandRevalidate&&!i.isDraftMode){let a=await h.get(m,{kind:o.IncrementalCacheKind.FETCH,revalidate:r.revalidate,tags:n,softTags:null==b?void 0:b.tags,fetchIdx:y,fetchUrl:f});if(a&&a.value)if(a.value.kind!==o.CachedRouteKind.FETCH)console.error(`Invariant invalid cacheEntry returned for ${p}`);else{let o=void 0!==a.value.data.body?JSON.parse(a.value.data.body):void 0;if(a.isStale){if(i.pendingRevalidates||(i.pendingRevalidates={}),!i.pendingRevalidates[p]){let a=s.workUnitAsyncStorage.run(g,e,...t).then(async e=>(await u(e,h,m,n,r.revalidate,y,f),e)).catch(e=>(console.error(`revalidating cache with key: ${p}`,e),o));i.isStaticGeneration&&a.catch(()=>{}),i.pendingRevalidates[p]=a}if(i.isStaticGeneration)return i.pendingRevalidates[p]}return o}}let c=await s.workUnitAsyncStorage.run(g,e,...t);return i.isDraftMode||(i.pendingRevalidates||(i.pendingRevalidates={}),i.pendingRevalidates[p]=u(c,h,m,n,r.revalidate,y,f)),c}{if(l+=1,!h.isOnDemandRevalidate){let e=await h.get(m,{kind:o.IncrementalCacheKind.FETCH,revalidate:r.revalidate,tags:n,fetchIdx:y,fetchUrl:f,softTags:null==b?void 0:b.tags});if(e&&e.value){if(e.value.kind!==o.CachedRouteKind.FETCH)console.error(`Invariant invalid cacheEntry returned for ${p}`);else if(!e.isStale)return void 0!==e.value.data.body?JSON.parse(e.value.data.body):void 0}}let i=await s.workUnitAsyncStorage.run(g,e,...t);return await u(i,h,m,n,r.revalidate,y,f),i}}finally{p&&p.endRead()}}}},684109,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={getSortedRouteObjects:function(){return o},getSortedRoutes:function(){return s}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});class a{insert(e){this._insert(e.split("/").filter(Boolean),[],!1)}smoosh(){return this._smoosh()}_smoosh(e="/"){let t=[...this.children.keys()].sort();null!==this.slugName&&t.splice(t.indexOf("[]"),1),null!==this.restSlugName&&t.splice(t.indexOf("[...]"),1),null!==this.optionalRestSlugName&&t.splice(t.indexOf("[[...]]"),1);let r=t.map(t=>this.children.get(t)._smoosh(`${e}${t}/`)).reduce((e,t)=>[...e,...t],[]);if(null!==this.slugName&&r.push(...this.children.get("[]")._smoosh(`${e}[${this.slugName}]/`)),!this.placeholder){let t="/"===e?"/":e.slice(0,-1);if(null!=this.optionalRestSlugName)throw Object.defineProperty(Error(`You cannot define a route with the same specificity as a optional catch-all route ("${t}" and "${t}[[...${this.optionalRestSlugName}]]").`),"__NEXT_ERROR_CODE",{value:"E458",enumerable:!1,configurable:!0});r.unshift(t)}return null!==this.restSlugName&&r.push(...this.children.get("[...]")._smoosh(`${e}[...${this.restSlugName}]/`)),null!==this.optionalRestSlugName&&r.push(...this.children.get("[[...]]")._smoosh(`${e}[[...${this.optionalRestSlugName}]]/`)),r}_insert(e,t,r){if(0===e.length){this.placeholder=!1;return}if(r)throw Object.defineProperty(Error("Catch-all must be the last part of the URL."),"__NEXT_ERROR_CODE",{value:"E392",enumerable:!1,configurable:!0});let n=e[0];if(n.startsWith("[")&&n.endsWith("]")){let a=n.slice(1,-1),s=!1;if(a.startsWith("[")&&a.endsWith("]")&&(a=a.slice(1,-1),s=!0),a.startsWith("…"))throw Object.defineProperty(Error(`Detected a three-dot character ('…') at ('${a}'). Did you mean ('...')?`),"__NEXT_ERROR_CODE",{value:"E147",enumerable:!1,configurable:!0});if(a.startsWith("...")&&(a=a.substring(3),r=!0),a.startsWith("[")||a.endsWith("]"))throw Object.defineProperty(Error(`Segment names may not start or end with extra brackets ('${a}').`),"__NEXT_ERROR_CODE",{value:"E421",enumerable:!1,configurable:!0});if(a.startsWith("."))throw Object.defineProperty(Error(`Segment names may not start with erroneous periods ('${a}').`),"__NEXT_ERROR_CODE",{value:"E288",enumerable:!1,configurable:!0});function i(e,r){if(null!==e&&e!==r)throw Object.defineProperty(Error(`You cannot use different slug names for the same dynamic path ('${e}' !== '${r}').`),"__NEXT_ERROR_CODE",{value:"E337",enumerable:!1,configurable:!0});t.forEach(e=>{if(e===r)throw Object.defineProperty(Error(`You cannot have the same slug name "${r}" repeat within a single dynamic path`),"__NEXT_ERROR_CODE",{value:"E247",enumerable:!1,configurable:!0});if(e.replace(/\W/g,"")===n.replace(/\W/g,""))throw Object.defineProperty(Error(`You cannot have the slug names "${e}" and "${r}" differ only by non-word symbols within a single dynamic path`),"__NEXT_ERROR_CODE",{value:"E499",enumerable:!1,configurable:!0})}),t.push(r)}if(r)if(s){if(null!=this.restSlugName)throw Object.defineProperty(Error(`You cannot use both an required and optional catch-all route at the same level ("[...${this.restSlugName}]" and "${e[0]}" ).`),"__NEXT_ERROR_CODE",{value:"E299",enumerable:!1,configurable:!0});i(this.optionalRestSlugName,a),this.optionalRestSlugName=a,n="[[...]]"}else{if(null!=this.optionalRestSlugName)throw Object.defineProperty(Error(`You cannot use both an optional and required catch-all route at the same level ("[[...${this.optionalRestSlugName}]]" and "${e[0]}").`),"__NEXT_ERROR_CODE",{value:"E300",enumerable:!1,configurable:!0});i(this.restSlugName,a),this.restSlugName=a,n="[...]"}else{if(s)throw Object.defineProperty(Error(`Optional route parameters are not yet supported ("${e[0]}").`),"__NEXT_ERROR_CODE",{value:"E435",enumerable:!1,configurable:!0});i(this.slugName,a),this.slugName=a,n="[]"}}this.children.has(n)||this.children.set(n,new a),this.children.get(n)._insert(e.slice(1),t,r)}constructor(){this.placeholder=!0,this.children=new Map,this.slugName=null,this.restSlugName=null,this.optionalRestSlugName=null}}function s(e){let t=new a;return e.forEach(e=>t.insert(e)),t.smoosh()}function o(e,t){let r={},n=[];for(let i=0;i<e.length;i++){let a=t(e[i]);r[a]=i,n[i]=a}return s(n).map(t=>e[r[t]])}},151417,(e,t,r)=>{"use strict";function n(e){return e.startsWith("/")?e:`/${e}`}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ensureLeadingSlash",{enumerable:!0,get:function(){return n}})},483655,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={DEFAULT_SEGMENT_KEY:function(){return c},NOT_FOUND_SEGMENT_KEY:function(){return h},PAGE_SEGMENT_KEY:function(){return d},addSearchParamsIfPageSegment:function(){return l},computeSelectedLayoutSegment:function(){return u},getSegmentValue:function(){return a},getSelectedLayoutSegmentPath:function(){return function e(t,r,n=!0,i=[]){let s;if(n)s=t[1][r];else{let e=t[1];s=e.children??Object.values(e)[0]}if(!s)return i;let o=a(s[0]);return!o||o.startsWith(d)?i:(i.push(o),e(s,r,!1,i))}},isGroupSegment:function(){return s},isParallelRouteSegment:function(){return o}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});function a(e){return Array.isArray(e)?e[1]:e}function s(e){return"("===e[0]&&e.endsWith(")")}function o(e){return e.startsWith("@")&&"@children"!==e}function l(e,t){if(e.includes(d)){let e=JSON.stringify(t);return"{}"!==e?d+"?"+e:d}return e}function u(e,t){if(!e||0===e.length)return null;let r="children"===t?e[0]:e[e.length-1];return r===c?null:r}let d="__PAGE__",c="__DEFAULT__",h="/_not-found"},537433,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={normalizeAppPath:function(){return o},normalizeRscURL:function(){return l}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(151417),s=e.r(483655);function o(e){return(0,a.ensureLeadingSlash)(e.split("/").reduce((e,t,r,n)=>!t||(0,s.isGroupSegment)(t)||"@"===t[0]||("page"===t||"route"===t)&&r===n.length-1?e:`${e}/${t}`,""))}function l(e){return e.replace(/\.rsc($|\?)/,"$1")}},265710,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={INTERCEPTION_ROUTE_MARKERS:function(){return s},extractInterceptionRouteInformation:function(){return l},isInterceptionRouteAppPath:function(){return o}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(537433),s=["(..)(..)","(.)","(..)","(...)"];function o(e){return void 0!==e.split("/").find(e=>s.find(t=>e.startsWith(t)))}function l(e){let t,r,n;for(let i of e.split("/"))if(r=s.find(e=>i.startsWith(e))){[t,n]=e.split(r,2);break}if(!t||!r||!n)throw Object.defineProperty(Error(`Invalid interception route: ${e}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`),"__NEXT_ERROR_CODE",{value:"E269",enumerable:!1,configurable:!0});switch(t=(0,a.normalizeAppPath)(t),r){case"(.)":n="/"===t?`/${n}`:t+"/"+n;break;case"(..)":if("/"===t)throw Object.defineProperty(Error(`Invalid interception route: ${e}. Cannot use (..) marker at the root level, use (.) instead.`),"__NEXT_ERROR_CODE",{value:"E207",enumerable:!1,configurable:!0});n=t.split("/").slice(0,-1).concat(n).join("/");break;case"(...)":n="/"+n;break;case"(..)(..)":let i=t.split("/");if(i.length<=2)throw Object.defineProperty(Error(`Invalid interception route: ${e}. Cannot use (..)(..) marker at the root level or one level up.`),"__NEXT_ERROR_CODE",{value:"E486",enumerable:!1,configurable:!0});n=i.slice(0,-2).concat(n).join("/");break;default:throw Object.defineProperty(Error("Invariant: unexpected marker"),"__NEXT_ERROR_CODE",{value:"E112",enumerable:!1,configurable:!0})}return{interceptingRoute:t,interceptedRoute:n}}},97764,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isDynamicRoute",{enumerable:!0,get:function(){return s}});let n=e.r(265710),i=/\/[^/]*\[[^/]+\][^/]*(?=\/|$)/,a=/\/\[[^/]+\](?=\/|$)/;function s(e,t=!0){return((0,n.isInterceptionRouteAppPath)(e)&&(e=(0,n.extractInterceptionRouteInformation)(e).interceptedRoute),t)?a.test(e):i.test(e)}},274391,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={getSortedRouteObjects:function(){return a.getSortedRouteObjects},getSortedRoutes:function(){return a.getSortedRoutes},isDynamicRoute:function(){return s.isDynamicRoute}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(684109),s=e.r(97764)},203982,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={ActionDidNotRevalidate:function(){return a},ActionDidRevalidateDynamicOnly:function(){return o},ActionDidRevalidateStaticAndDynamic:function(){return s}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=0,s=1,o=2},199300,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={refresh:function(){return f},revalidatePath:function(){return y},revalidateTag:function(){return p},updateTag:function(){return m}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(258200),s=e.r(274391),o=e.r(419372),l=e.r(556704),u=e.r(832319),d=e.r(243727),c=e.r(585346),h=e.r(203982);function p(e,t){return t||console.warn('"revalidateTag" without the second argument is now deprecated, add second argument of "max" or use "updateTag". See more info here: https://nextjs.org/docs/messages/revalidate-tag-single-arg'),b([e],`revalidateTag ${e}`,t)}function m(e){let t=l.workAsyncStorage.getStore();if(!t||t.page.endsWith("/route"))throw Object.defineProperty(Error("updateTag can only be called from within a Server Action. To invalidate cache tags in Route Handlers or other contexts, use revalidateTag instead. See more info here: https://nextjs.org/docs/app/api-reference/functions/updateTag"),"__NEXT_ERROR_CODE",{value:"E872",enumerable:!1,configurable:!0});return b([e],`updateTag ${e}`,void 0)}function f(){let e=l.workAsyncStorage.getStore(),t=u.workUnitAsyncStorage.getStore();if(!e||e.page.endsWith("/route")||(null==t?void 0:t.phase)!=="action")throw Object.defineProperty(Error("refresh can only be called from within a Server Action. See more info here: https://nextjs.org/docs/app/api-reference/functions/refresh"),"__NEXT_ERROR_CODE",{value:"E870",enumerable:!1,configurable:!0});e&&(e.pathWasRevalidated=h.ActionDidRevalidateDynamicOnly)}function y(e,t){if(e.length>o.NEXT_CACHE_SOFT_TAG_MAX_LENGTH)return void console.warn(`Warning: revalidatePath received "${e}" which exceeded max length of ${o.NEXT_CACHE_SOFT_TAG_MAX_LENGTH}. See more info here https://nextjs.org/docs/app/api-reference/functions/revalidatePath`);let r=`${o.NEXT_CACHE_IMPLICIT_TAG_ID}${e||"/"}`;t?r+=`${r.endsWith("/")?"":"/"}${t}`:(0,s.isDynamicRoute)(e)&&console.warn(`Warning: a dynamic page path "${e}" was passed to "revalidatePath", but the "type" parameter is missing. This has no effect by default, see more info here https://nextjs.org/docs/app/api-reference/functions/revalidatePath`);let n=[r];return r===`${o.NEXT_CACHE_IMPLICIT_TAG_ID}/`?n.push(`${o.NEXT_CACHE_IMPLICIT_TAG_ID}/index`):r===`${o.NEXT_CACHE_IMPLICIT_TAG_ID}/index`&&n.push(`${o.NEXT_CACHE_IMPLICIT_TAG_ID}/`),b(n,`revalidatePath ${e}`)}function b(e,t,r){var n;let i=l.workAsyncStorage.getStore();if(!i||!i.incrementalCache)throw Object.defineProperty(Error(`Invariant: static generation store missing in ${t}`),"__NEXT_ERROR_CODE",{value:"E263",enumerable:!1,configurable:!0});let s=u.workUnitAsyncStorage.getStore();if(s){if("render"===s.phase)throw Object.defineProperty(Error(`Route ${i.route} used "${t}" during render which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`),"__NEXT_ERROR_CODE",{value:"E7",enumerable:!1,configurable:!0});switch(s.type){case"cache":case"private-cache":throw Object.defineProperty(Error(`Route ${i.route} used "${t}" inside a "use cache" which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`),"__NEXT_ERROR_CODE",{value:"E181",enumerable:!1,configurable:!0});case"unstable-cache":throw Object.defineProperty(Error(`Route ${i.route} used "${t}" inside a function cached with "unstable_cache(...)" which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`),"__NEXT_ERROR_CODE",{value:"E306",enumerable:!1,configurable:!0});case"prerender":case"prerender-runtime":let e=Object.defineProperty(Error(`Route ${i.route} used ${t} without first calling \`await connection()\`.`),"__NEXT_ERROR_CODE",{value:"E406",enumerable:!1,configurable:!0});return(0,a.abortAndThrowOnSynchronousRequestDataAccess)(i.route,t,e,s);case"prerender-client":throw Object.defineProperty(new c.InvariantError(`${t} must not be used within a client component. Next.js should be preventing ${t} from being included in client components statically, but did not in this case.`),"__NEXT_ERROR_CODE",{value:"E693",enumerable:!1,configurable:!0});case"prerender-ppr":return(0,a.postponeWithTracking)(i.route,t,s.dynamicTracking);case"prerender-legacy":s.revalidate=0;let r=Object.defineProperty(new d.DynamicServerError(`Route ${i.route} couldn't be rendered statically because it used \`${t}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`),"__NEXT_ERROR_CODE",{value:"E558",enumerable:!1,configurable:!0});throw i.dynamicUsageDescription=t,i.dynamicUsageStack=r.stack,r}}for(let t of(i.pendingRevalidatedTags||(i.pendingRevalidatedTags=[]),e))-1===i.pendingRevalidatedTags.findIndex(e=>e.tag===t&&("string"==typeof e.profile&&"string"==typeof r?e.profile===r:"object"==typeof e.profile&&"object"==typeof r?JSON.stringify(e.profile)===JSON.stringify(r):e.profile===r))&&i.pendingRevalidatedTags.push({tag:t,profile:r});let o=r&&"object"==typeof r?r:r&&"string"==typeof r&&(null==i||null==(n=i.cacheLifeProfiles)?void 0:n[r])?i.cacheLifeProfiles[r]:void 0;r&&(null==o?void 0:o.expire)!==0||(i.pathWasRevalidated=h.ActionDidRevalidateStaticAndDynamic)}},910582,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"unstable_noStore",{enumerable:!0,get:function(){return s}});let n=e.r(556704),i=e.r(832319),a=e.r(258200);function s(){let e=n.workAsyncStorage.getStore(),t=i.workUnitAsyncStorage.getStore();if(e){if(!e.forceStatic){if(e.isUnstableNoStore=!0,t)switch(t.type){case"prerender":case"prerender-client":case"prerender-runtime":return}(0,a.markCurrentScopeAsDynamic)(e,t,"unstable_noStore()")}}}},825183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"cacheLife",{enumerable:!0,get:function(){return s}});let n=e.r(585346),i=e.r(556704),a=e.r(832319);function s(e){let t=a.workUnitAsyncStorage.getStore();switch(null==t?void 0:t.type){case"prerender":case"prerender-client":case"prerender-runtime":case"prerender-ppr":case"prerender-legacy":case"request":case"unstable-cache":case void 0:throw Object.defineProperty(Error('`cacheLife()` can only be called inside a "use cache" function.'),"__NEXT_ERROR_CODE",{value:"E818",enumerable:!1,configurable:!0})}if("string"==typeof e){let t=i.workAsyncStorage.getStore();if(!t)throw Object.defineProperty(Error("`cacheLife()` can only be called during App Router rendering at the moment."),"__NEXT_ERROR_CODE",{value:"E820",enumerable:!1,configurable:!0});if(!t.cacheLifeProfiles)throw Object.defineProperty(new n.InvariantError("`cacheLifeProfiles` should always be provided."),"__NEXT_ERROR_CODE",{value:"E817",enumerable:!1,configurable:!0});let r=t.cacheLifeProfiles[e];if(void 0===r){if(t.cacheLifeProfiles[e.trim()])throw Object.defineProperty(Error(`Unknown \`cacheLife()\` profile "${e}" is not configured in next.config.js
Did you mean "${e.trim()}" without the spaces?`),"__NEXT_ERROR_CODE",{value:"E816",enumerable:!1,configurable:!0});throw Object.defineProperty(Error(`Unknown \`cacheLife()\` profile "${e}" is not configured in next.config.js
module.exports = {
  cacheLife: {
    "${e}": ...
  }
}`),"__NEXT_ERROR_CODE",{value:"E888",enumerable:!1,configurable:!0})}e=r}else if("object"!=typeof e||null===e||Array.isArray(e))throw Object.defineProperty(Error("Invalid `cacheLife()` option. Either pass a profile name or object."),"__NEXT_ERROR_CODE",{value:"E814",enumerable:!1,configurable:!0});else{var r=e;if(void 0!==r.stale){if(!1===r.stale)throw Object.defineProperty(Error("Pass `Infinity` instead of `false` if you want to cache on the client forever without checking with the server."),"__NEXT_ERROR_CODE",{value:"E407",enumerable:!1,configurable:!0});else if("number"!=typeof r.stale)throw Object.defineProperty(Error("The stale option must be a number of seconds."),"__NEXT_ERROR_CODE",{value:"E308",enumerable:!1,configurable:!0})}if(void 0!==r.revalidate){if(!1===r.revalidate)throw Object.defineProperty(Error("Pass `Infinity` instead of `false` if you do not want to revalidate by time."),"__NEXT_ERROR_CODE",{value:"E104",enumerable:!1,configurable:!0});else if("number"!=typeof r.revalidate)throw Object.defineProperty(Error("The revalidate option must be a number of seconds."),"__NEXT_ERROR_CODE",{value:"E233",enumerable:!1,configurable:!0})}if(void 0!==r.expire){if(!1===r.expire)throw Object.defineProperty(Error("Pass `Infinity` instead of `false` if you want to cache on the server forever without checking with the origin."),"__NEXT_ERROR_CODE",{value:"E658",enumerable:!1,configurable:!0});else if("number"!=typeof r.expire)throw Object.defineProperty(Error("The expire option must be a number of seconds."),"__NEXT_ERROR_CODE",{value:"E3",enumerable:!1,configurable:!0})}if(void 0!==r.revalidate&&void 0!==r.expire&&r.revalidate>r.expire)throw Object.defineProperty(Error("If providing both the revalidate and expire options, the expire option must be greater than the revalidate option. The expire option indicates how many seconds from the start until it can no longer be used."),"__NEXT_ERROR_CODE",{value:"E656",enumerable:!1,configurable:!0})}void 0!==e.revalidate&&(void 0===t.explicitRevalidate||t.explicitRevalidate>e.revalidate)&&(t.explicitRevalidate=e.revalidate),void 0!==e.expire&&(void 0===t.explicitExpire||t.explicitExpire>e.expire)&&(t.explicitExpire=e.expire),void 0!==e.stale&&(void 0===t.explicitStale||t.explicitStale>e.stale)&&(t.explicitStale=e.stale)}},246130,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"cacheTag",{enumerable:!0,get:function(){return a}});let n=e.r(832319),i=e.r(188232);function a(...e){let t=n.workUnitAsyncStorage.getStore();switch(null==t?void 0:t.type){case"prerender":case"prerender-client":case"prerender-runtime":case"prerender-ppr":case"prerender-legacy":case"request":case"unstable-cache":case void 0:throw Object.defineProperty(Error('`cacheTag()` can only be called inside a "use cache" function.'),"__NEXT_ERROR_CODE",{value:"E819",enumerable:!1,configurable:!0})}let r=(0,i.validateTags)(e,"`cacheTag()`");t.tags?t.tags.push(...r):t.tags=r}},668304,(e,t,r)=>{let n={unstable_cache:e.r(255706).unstable_cache,updateTag:e.r(199300).updateTag,revalidateTag:e.r(199300).revalidateTag,revalidatePath:e.r(199300).revalidatePath,refresh:e.r(199300).refresh,unstable_noStore:e.r(910582).unstable_noStore,cacheLife:e.r(825183).cacheLife,cacheTag:e.r(246130).cacheTag},i=!1,a=!1;n.unstable_cacheLife=function(){return i||(i=!0,console.error(Error("`unstable_cacheLife` was recently stabilized and should be imported as `cacheLife`. The `unstable` prefixed form will be removed in a future version of Next.js."))),n.cacheLife.apply(this,arguments)},n.unstable_cacheTag=function(){return a||(a=!0,console.error(Error("`unstable_cacheTag` was recently stabilized and should be imported as `cacheTag`. The `unstable` prefixed form will be removed in a future version of Next.js."))),n.cacheTag.apply(this,arguments)},t.exports=n,r.unstable_cache=n.unstable_cache,r.revalidatePath=n.revalidatePath,r.revalidateTag=n.revalidateTag,r.updateTag=n.updateTag,r.unstable_noStore=n.unstable_noStore,r.cacheLife=n.cacheLife,r.unstable_cacheLife=n.unstable_cacheLife,r.cacheTag=n.cacheTag,r.unstable_cacheTag=n.unstable_cacheTag,r.refresh=n.refresh},941367,e=>{"use strict";let t,r,n,i,a,s,o,l,u,d,c,h;class p{constructor(e){this.value=void 0,this.next=null,this.value=e}}class m{constructor(){this.length=0,this.head=null,this.tail=null}push(e){let t=new p(e);return this.length?this.tail.next=t:this.head=t,this.tail=t,this.length+=1,t}shift(){if(!this.length)return null;{let e=this.head;return this.head=this.head.next,this.length-=1,e}}}class f{constructor(e=!1){this.ignoreErrors=e,this.queue=new m,this.pending=new Set,this.newPromise()}add(e){this.pending.add(e),e.then(t=>{this.pending.delete(e),0===this.queue.length&&this.resolvePromise(t),this.queue.push(t)}).catch(t=>{this.ignoreErrors&&this.queue.push(void 0),this.pending.delete(e),this.rejectPromise(t)})}async waitAll(){await Promise.all(this.pending)}numTotal(){return this.pending.size+this.queue.length}numPending(){return this.pending.size}numQueued(){return this.queue.length}resolvePromise(e){this.resolve(e),this.newPromise()}rejectPromise(e){this.reject(e),this.newPromise()}newPromise(){this.nextPromise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}async wait(){return this.nextPromise}async fetch(){var e;if(0!==this.pending.size||0!==this.queue.length){for(;0===this.queue.length;)try{await this.wait()}catch(e){this.ignoreErrors||console.error("Unexpected Error in AsyncFifoQueue",e)}return null==(e=this.queue.shift())?void 0:e.value}}}class y{static normalize(e){return Number.isFinite(e)?{type:"fixed",delay:e}:e||void 0}static calculate(e,t,r,n,i){if(e)return(function(e,t){if(e.type in y.builtinStrategies)return y.builtinStrategies[e.type](e.delay,e.jitter);if(t)return t;throw Error(`Unknown backoff strategy ${e.type}.
      If a custom backoff strategy is used, specify it when the queue is created.`)})(e,i)(t,e.type,r,n)}}y.builtinStrategies={fixed:function(e,t=0){return function(){return t>0?Math.floor(Math.random()*e*t+e*(1-t)):e}},exponential:function(e,t=0){return function(r){if(!(t>0))return Math.round(Math.pow(2,r-1)*e);{let n=Math.round(Math.pow(2,r-1)*e);return Math.floor(Math.random()*n*t+n*(1-t))}}}};var b,g,v,E,K,S,I,w,x,T,R,j,k,A,O,D,C,P,_,M,N,L,J,F,G,V,q,Y=e.i(233405),B=e.i(504446),U=e.i(37702);(b=x||(x={}))[b.Init=0]="Init",b[b.Start=1]="Start",b[b.Stop=2]="Stop",b[b.GetChildrenValuesResponse=3]="GetChildrenValuesResponse",b[b.GetIgnoredChildrenFailuresResponse=4]="GetIgnoredChildrenFailuresResponse",b[b.MoveToWaitingChildrenResponse=5]="MoveToWaitingChildrenResponse",(g=T||(T={}))[g.JobNotExist=-1]="JobNotExist",g[g.JobLockNotExist=-2]="JobLockNotExist",g[g.JobNotInState=-3]="JobNotInState",g[g.JobPendingChildren=-4]="JobPendingChildren",g[g.ParentJobNotExist=-5]="ParentJobNotExist",g[g.JobLockMismatch=-6]="JobLockMismatch",g[g.ParentJobCannotBeReplaced=-7]="ParentJobCannotBeReplaced",g[g.JobBelongsToJobScheduler=-8]="JobBelongsToJobScheduler",g[g.JobHasFailedChildren=-9]="JobHasFailedChildren",g[g.SchedulerJobIdCollision=-10]="SchedulerJobIdCollision",g[g.SchedulerJobSlotsBusy=-11]="SchedulerJobSlotsBusy",(v=R||(R={}))[v.Completed=0]="Completed",v[v.Error=1]="Error",v[v.Failed=2]="Failed",v[v.InitFailed=3]="InitFailed",v[v.InitCompleted=4]="InitCompleted",v[v.Log=5]="Log",v[v.MoveToDelayed=6]="MoveToDelayed",v[v.MoveToWait=7]="MoveToWait",v[v.Progress=8]="Progress",v[v.Update=9]="Update",v[v.GetChildrenValues=10]="GetChildrenValues",v[v.GetIgnoredChildrenFailures=11]="GetIgnoredChildrenFailures",v[v.MoveToWaitingChildren=12]="MoveToWaitingChildren",(E=j||(j={}))[E.ONE_MINUTE=1]="ONE_MINUTE",E[E.FIVE_MINUTES=5]="FIVE_MINUTES",E[E.FIFTEEN_MINUTES=15]="FIFTEEN_MINUTES",E[E.THIRTY_MINUTES=30]="THIRTY_MINUTES",E[E.ONE_HOUR=60]="ONE_HOUR",E[E.ONE_WEEK=10080]="ONE_WEEK",E[E.TWO_WEEKS=20160]="TWO_WEEKS",E[E.ONE_MONTH=80640]="ONE_MONTH",(K=k||(k={})).QueueName="bullmq.queue.name",K.QueueOperation="bullmq.queue.operation",K.BulkCount="bullmq.job.bulk.count",K.BulkNames="bullmq.job.bulk.names",K.JobName="bullmq.job.name",K.JobId="bullmq.job.id",K.JobKey="bullmq.job.key",K.JobIds="bullmq.job.ids",K.JobAttemptsMade="bullmq.job.attempts.made",K.DeduplicationKey="bullmq.job.deduplication.key",K.JobOptions="bullmq.job.options",K.JobProgress="bullmq.job.progress",K.QueueDrainDelay="bullmq.queue.drain.delay",K.QueueGrace="bullmq.queue.grace",K.QueueCleanLimit="bullmq.queue.clean.limit",K.QueueRateLimit="bullmq.queue.rate.limit",K.JobType="bullmq.job.type",K.QueueOptions="bullmq.queue.options",K.QueueEventMaxLength="bullmq.queue.event.max.length",K.WorkerOptions="bullmq.worker.options",K.WorkerName="bullmq.worker.name",K.WorkerId="bullmq.worker.id",K.WorkerRateLimit="bullmq.worker.rate.limit",K.WorkerDoNotWaitActive="bullmq.worker.do.not.wait.active",K.WorkerForceClose="bullmq.worker.force.close",K.WorkerStalledJobs="bullmq.worker.stalled.jobs",K.WorkerFailedJobs="bullmq.worker.failed.jobs",K.WorkerJobsToExtendLocks="bullmq.worker.jobs.to.extend.locks",K.JobFinishedTimestamp="bullmq.job.finished.timestamp",K.JobProcessedTimestamp="bullmq.job.processed.timestamp",K.JobResult="bullmq.job.result",K.JobFailedReason="bullmq.job.failed.reason",K.FlowName="bullmq.flow.name",K.JobSchedulerId="bullmq.job.scheduler.id",(S=A||(A={}))[S.INTERNAL=0]="INTERNAL",S[S.SERVER=1]="SERVER",S[S.CLIENT=2]="CLIENT",S[S.PRODUCER=3]="PRODUCER",S[S.CONSUMER=4]="CONSUMER";var $=e.i(427699);let W={1:"Uncaught Fatal Exception",2:"Unused",3:"Internal JavaScript Parse Error",4:"Internal JavaScript Evaluation Failure",5:"Fatal Error",6:"Non-function Internal Exception Handler",7:"Internal Exception Handler Run-Time Failure",8:"Unused",9:"Invalid Argument",10:"Internal JavaScript Run-Time Failure",12:"Invalid Debug Argument",13:"Unfinished Top-Level Await"};class H extends $.EventEmitter{constructor(e,t,r={useWorkerThreads:!1}){super(),this.mainFile=e,this.processFile=t,this.opts=r,this._exitCode=null,this._signalCode=null,this._killed=!1}get pid(){if(this.childProcess)return this.childProcess.pid;if(this.worker)return Math.abs(this.worker.threadId);throw Error("No child process or worker thread")}get exitCode(){return this._exitCode}get signalCode(){return this._signalCode}get killed(){return this.childProcess?this.childProcess.killed:this._killed}async init(){let e,t=await X(process.execArgv);this.opts.useWorkerThreads?this.worker=e=new U.Worker(this.mainFile,Object.assign({execArgv:t,stdin:!0,stdout:!0,stderr:!0},this.opts.workerThreadsOptions?this.opts.workerThreadsOptions:{})):this.childProcess=e=(0,Y.fork)(this.mainFile,[],Object.assign({execArgv:t,stdio:"pipe"},this.opts.workerForkOptions?this.opts.workerForkOptions:{})),e.on("exit",(t,r)=>{this._exitCode=t,r=void 0===r?null:r,this._signalCode=r,this._killed=!0,this.emit("exit",t,r),e.removeAllListeners(),this.removeAllListeners()}),e.on("error",(...e)=>this.emit("error",...e)),e.on("message",(...e)=>this.emit("message",...e)),e.on("close",(...e)=>this.emit("close",...e)),e.stdout.pipe(process.stdout),e.stderr.pipe(process.stderr),await this.initChild()}async send(e){return new Promise((t,r)=>{this.childProcess?this.childProcess.send(e,e=>{e?r(e):t()}):this.worker?t(this.worker.postMessage(e)):t()})}killProcess(e="SIGKILL"){this.childProcess?this.childProcess.kill(e):this.worker&&this.worker.terminate()}async kill(e="SIGKILL",t){var r;if(this.hasProcessExited())return;let n=(r=this.childProcess||this.worker,new Promise(e=>{r.once("exit",()=>e())}));if(this.killProcess(e),void 0!==t&&(0===t||isFinite(t))){let e=setTimeout(()=>{this.hasProcessExited()||this.killProcess("SIGKILL")},t);await n,clearTimeout(e)}await n}async initChild(){let e=new Promise((e,t)=>{let r=i=>{if(i.cmd===R.InitCompleted)e();else if(i.cmd===R.InitFailed){let e=Error();e.stack=i.err.stack,e.message=i.err.message,t(e)}this.off("message",r),this.off("close",n)},n=(e,i)=>{e>128&&(e-=128);let a=W[e]||`Unknown exit code ${e}`;t(Error(`Error initializing child: ${a} and signal ${i}`)),this.off("message",r),this.off("close",n)};this.on("message",r),this.on("close",n)});await this.send({cmd:x.Init,value:this.processFile}),await e}hasProcessExited(){return!!(null!==this.exitCode||this.signalCode)}}let z=async()=>new Promise(e=>{let t=(0,B.createServer)();t.listen(0,()=>{let{port:r}=t.address();t.close(()=>e(r))})}),X=async e=>{let t=[],r=[];for(let n=0;n<e.length;n++){let i=e[n];if(-1===i.indexOf("--inspect"))t.push(i);else{let e=i.split("=")[0],t=await z();r.push(`${e}=${t}`)}}return t.concat(r)};var Q=e.i(814747);class Z{constructor({mainFile:e=Q.join(process.cwd(),"dist/esm/classes/main.js"),useWorkerThreads:t,workerForkOptions:r,workerThreadsOptions:n}){this.retained={},this.free={},this.opts={mainFile:e,useWorkerThreads:t,workerForkOptions:r,workerThreadsOptions:n}}async retain(e){let t=this.getFree(e).pop();if(t)return this.retained[t.pid]=t,t;(t=new H(this.opts.mainFile,e,{useWorkerThreads:this.opts.useWorkerThreads,workerForkOptions:this.opts.workerForkOptions,workerThreadsOptions:this.opts.workerThreadsOptions})).on("exit",this.remove.bind(this,t));try{if(await t.init(),null!==t.exitCode||null!==t.signalCode)throw Error("Child exited before it could be retained");return this.retained[t.pid]=t,t}catch(e){throw console.error(e),this.release(t),e}}release(e){delete this.retained[e.pid],this.getFree(e.processFile).push(e)}remove(e){delete this.retained[e.pid];let t=this.getFree(e.processFile),r=t.indexOf(e);r>-1&&t.splice(r,1)}async kill(e,t="SIGKILL"){return this.remove(e),e.kill(t,3e4)}async clean(){let e=Object.values(this.retained).concat(this.getAllFree());this.retained={},this.free={},await Promise.all(e.map(e=>this.kill(e,"SIGTERM")))}getFree(e){return this.free[e]=this.free[e]||[]}getAllFree(){return Object.values(this.free).reduce((e,t)=>e.concat(t),[])}}var ee=e.i(906401),et=e.i(213895),er=e.i(28005);let en={value:null};function ei(e,t,r){try{return e.apply(t,r)}catch(e){return en.value=e,en}}function ea(e){let t={};for(let r=0;r<e.length;r+=2)t[e[r]]=e[r+1];return t}function es(e){let t=[];for(let r in e)Object.prototype.hasOwnProperty.call(e,r)&&void 0!==e[r]&&(t[t.length]=r,t[t.length]=e[r]);return t}function eo(e,t){return new Promise(r=>{let n,i=()=>{null==t||t.signal.removeEventListener("abort",i),clearTimeout(n),r()};n=setTimeout(i,e),null==t||t.signal.addEventListener("abort",i)})}function el(e,t){let r=e.getMaxListeners();e.setMaxListeners(r+t)}let eu={de:"deduplication",fpof:"failParentOnFailure",cpof:"continueParentOnFailure",idof:"ignoreDependencyOnFailure",kl:"keepLogs",rdof:"removeDependencyOnFailure"},ed=Object.assign(Object.assign({},Object.entries(eu).reduce((e,[t,r])=>(e[r]=t,e),{})),{debounce:"de"});function ec(e){return!!e&&["connect","disconnect","duplicate"].every(t=>"function"==typeof e[t])}function eh(e){if(e)return`${e.queue}:${e.id}`}let ep=/ERR unknown command ['`]\s*client\s*['`]/;function em(e){let{code:t,message:r}=e;return r!==et.CONNECTION_CLOSED_ERROR_MSG&&!r.includes("ECONNREFUSED")&&"ECONNREFUSED"!==t}let ef=(e,t)=>{let r=er.valid(er.coerce(e));return er.lt(r,t)},ey=e=>{let t={};for(let r of Object.entries(e))t[r[0]]=JSON.parse(r[1]);return t};async function eb(e,t,r,n,i,a,s){if(!e)return a();{let o,{tracer:l,contextManager:u}=e,d=u.active();s&&(o=u.fromMetadata(d,s));let c=i?`${n} ${i}`:n,h=l.startSpan(c,{kind:t},o);try{let e,i;return h.setAttributes({[k.QueueName]:r,[k.QueueOperation]:n}),e=t===A.CONSUMER&&o?h.setSpanOnContext(o):h.setSpanOnContext(d),2==a.length&&(i=u.getMetadata(e)),await u.with(e,()=>a(h,i))}catch(e){throw h.recordException(e),e}finally{h.end()}}}(I=O||(O={}))[I.Idle=0]="Idle",I[I.Started=1]="Started",I[I.Terminating=2]="Terminating",I[I.Errored=3]="Errored";class eg extends Error{constructor(e="bullmq:movedToDelayed"){super(e),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}let ev="bullmq:rateLimitExceeded";class eE extends Error{constructor(e=ev){super(e),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}class eK extends Error{constructor(e="bullmq:unrecoverable"){super(e),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}class eS extends Error{constructor(e="bullmq:movedToWaitingChildren"){super(e),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}class eI extends Error{constructor(e="bullmq:movedToWait"){super(e),this.name=this.constructor.name,Object.setPrototypeOf(this,new.target.prototype)}}var ew=e.i(254799);let ex={randomUUID:ew.randomUUID},eT=new Uint8Array(256),eR=eT.length,ej=[];for(let e=0;e<256;++e)ej.push((e+256).toString(16).slice(1));let ek=function(e,t,r){if(ex.randomUUID&&!t&&!e)return ex.randomUUID();let n=(e=e||{}).random??e.rng?.()??(eR>eT.length-16&&((0,ew.randomFillSync)(eT),eR=0),eT.slice(eR,eR+=16));if(n.length<16)throw Error("Random bytes length must be >= 16");if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){if((r=r||0)<0||r+16>t.length)throw RangeError(`UUID byte range ${r}:${r+15} is out of buffer bounds`);for(let e=0;e<16;++e)t[r+e]=n[e];return t}return function(e,t=0){return(ej[e[t+0]]+ej[e[t+1]]+ej[e[t+2]]+ej[e[t+3]]+"-"+ej[e[t+4]]+ej[e[t+5]]+"-"+ej[e[t+6]]+ej[e[t+7]]+"-"+ej[e[t+8]]+ej[e[t+9]]+"-"+ej[e[t+10]]+ej[e[t+11]]+ej[e[t+12]]+ej[e[t+13]]+ej[e[t+14]]+ej[e[t+15]]).toLowerCase()}(n)};function eA(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,n=Object.getOwnPropertySymbols(e);i<n.length;i++)0>t.indexOf(n[i])&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(r[n[i]]=e[n[i]]);return r}var eO=("function"==typeof SuppressedError&&SuppressedError,e.i(224361));try{D=new TextDecoder}catch(e){}var eD=0;let eC=[];var eP=eC,e_=0,eM={},eN=0,eL=0,eJ=[],eF={useRecords:!1,mapsAsObjects:!0};class eG{}let eV=new eG;eV.name="MessagePack 0xC1";var eq=!1,eY=2;try{Function("")}catch(e){eY=1/0}class eB{constructor(e){e&&(!1===e.useRecords&&void 0===e.mapsAsObjects&&(e.mapsAsObjects=!0),e.sequential&&!1!==e.trusted&&(e.trusted=!0,!e.structures&&!1!=e.useRecords&&(e.structures=[],e.maxSharedStructures||(e.maxSharedStructures=0))),e.structures?e.structures.sharedLength=e.structures.length:e.getStructures&&((e.structures=[]).uninitialized=!0,e.structures.sharedLength=0),e.int64AsNumber&&(e.int64AsType="number")),Object.assign(this,e)}unpack(e,t){if(C)return td(()=>(tc(),this?this.unpack(e,t):eB.prototype.unpack.call(eF,e,t)));e.buffer||e.constructor!==ArrayBuffer||(e="u">typeof Buffer?Buffer.from(e):new Uint8Array(e)),"object"==typeof t?(P=t.end||e.length,eD=t.start||0):(eD=0,P=t>-1?t:e.length),e_=0,eL=0,M=null,eP=eC,N=null,C=e;try{J=e.dataView||(e.dataView=new DataView(e.buffer,e.byteOffset,e.byteLength))}catch(t){if(C=null,e instanceof Uint8Array)throw t;throw Error("Source must be a Uint8Array or Buffer but was a "+(e&&"object"==typeof e?e.constructor.name:typeof e))}return this instanceof eB?(eM=this,this.structures?_=this.structures:(!_||_.length>0)&&(_=[])):(eM=eF,(!_||_.length>0)&&(_=[])),eU(t)}unpackMultiple(e,t){let r,n=0;try{eq=!0;let i=e.length,a=this?this.unpack(e,i):tp.unpack(e,i);if(t){if(!1===t(a,n,eD))return;for(;eD<i;)if(n=eD,!1===t(eU(),n,eD))return}else{for(r=[a];eD<i;)n=eD,r.push(eU());return r}}catch(e){throw e.lastPosition=n,e.values=r,e}finally{eq=!1,tc()}}_mergeStructures(e,t){G&&(e=G.call(this,e)),Object.isFrozen(e=e||[])&&(e=e.map(e=>e.slice(0)));for(let t=0,r=e.length;t<r;t++){let r=e[t];r&&(r.isShared=!0,t>=32&&(r.highByte=t-32>>5))}for(let r in e.sharedLength=e.length,t||[])if(r>=0){let n=e[r],i=t[r];i&&(n&&((e.restoreStructures||(e.restoreStructures=[]))[r]=n),e[r]=i)}return this.structures=e}decode(e,t){return this.unpack(e,t)}}function eU(e){try{let t;if(!eM.trusted&&!eq){let e=_.sharedLength||0;e<_.length&&(_.length=e)}if(eM.randomAccessStructure&&C[eD]<64&&C[eD]>=32&&F?(t=F(C,eD,P,eM),C=null,!(e&&e.lazy)&&t&&(t=t.toJSON()),eD=P):t=eW(),N&&(eD=N.postBundlePosition,N=null),eq&&(_.restoreStructures=null),eD==P)_&&_.restoreStructures&&e$(),_=null,C=null,L&&(L=null);else if(eD>P)throw Error("Unexpected end of MessagePack data");else if(!eq){let e;try{e=JSON.stringify(t,(e,t)=>"bigint"==typeof t?`${t}n`:t).slice(0,100)}catch(t){e="(JSON view not available "+t+")"}throw Error("Data read, but end of buffer not reached "+e)}return t}catch(e){throw _&&_.restoreStructures&&e$(),tc(),(e instanceof RangeError||e.message.startsWith("Unexpected end of buffer")||eD>P)&&(e.incomplete=!0),e}}function e$(){for(let e in _.restoreStructures)_[e]=_.restoreStructures[e];_.restoreStructures=null}function eW(){let e=C[eD++];if(e<160)if(e<128)if(e<64)return e;else{let t=_[63&e]||eM.getStructures&&eQ()[63&e];return t?(t.read||(t.read=ez(t,63&e)),t.read()):e}else if(e<144){if(e-=128,eM.mapsAsObjects){let t={};for(let r=0;r<e;r++){let e=tn();"__proto__"===e&&(e="__proto_"),t[e]=eW()}return t}{let t=new Map;for(let r=0;r<e;r++)t.set(eW(),eW());return t}}else{let t=Array(e-=144);for(let r=0;r<e;r++)t[r]=eW();return eM.freezeData?Object.freeze(t):t}if(e<192){let t=e-160;if(eL>=eD)return M.slice(eD-eN,(eD+=t)-eN);if(0==eL&&P<140){let e=t<16?e8(t):e9(t);if(null!=e)return e}return eZ(t)}{let t;switch(e){case 192:return null;case 193:if(N){if((t=eW())>0)return N[1].slice(N.position1,N.position1+=t);return N[0].slice(N.position0,N.position0-=t)}return eV;case 194:return!1;case 195:return!0;case 196:if(void 0===(t=C[eD++]))throw Error("Unexpected end of buffer");return te(t);case 197:return t=J.getUint16(eD),eD+=2,te(t);case 198:return t=J.getUint32(eD),eD+=4,te(t);case 199:return tt(C[eD++]);case 200:return t=J.getUint16(eD),eD+=2,tt(t);case 201:return t=J.getUint32(eD),eD+=4,tt(t);case 202:if(t=J.getFloat32(eD),eM.useFloat32>2){let e=th[(127&C[eD])<<1|C[eD+1]>>7];return eD+=4,(e*t+(t>0?.5:-.5)|0)/e}return eD+=4,t;case 203:return t=J.getFloat64(eD),eD+=8,t;case 204:return C[eD++];case 205:return t=J.getUint16(eD),eD+=2,t;case 206:return t=J.getUint32(eD),eD+=4,t;case 207:return"number"===eM.int64AsType?t=0x100000000*J.getUint32(eD)+J.getUint32(eD+4):"string"===eM.int64AsType?t=J.getBigUint64(eD).toString():"auto"===eM.int64AsType?(t=J.getBigUint64(eD))<=BigInt(2)<<BigInt(52)&&(t=Number(t)):t=J.getBigUint64(eD),eD+=8,t;case 208:return J.getInt8(eD++);case 209:return t=J.getInt16(eD),eD+=2,t;case 210:return t=J.getInt32(eD),eD+=4,t;case 211:return"number"===eM.int64AsType?t=0x100000000*J.getInt32(eD)+J.getUint32(eD+4):"string"===eM.int64AsType?t=J.getBigInt64(eD).toString():"auto"===eM.int64AsType?(t=J.getBigInt64(eD))>=BigInt(-2)<<BigInt(52)&&t<=BigInt(2)<<BigInt(52)&&(t=Number(t)):t=J.getBigInt64(eD),eD+=8,t;case 212:if(114==(t=C[eD++]))return ta(63&C[eD++]);{let e=eJ[t];if(e)if(e.read)return eD++,e.read(eW());else if(e.noBuffer)return eD++,e();else return e(C.subarray(eD,++eD));throw Error("Unknown extension "+t)}case 213:if(114==(t=C[eD]))return eD++,ta(63&C[eD++],C[eD++]);return tt(2);case 214:return tt(4);case 215:return tt(8);case 216:return tt(16);case 217:if(t=C[eD++],eL>=eD)return M.slice(eD-eN,(eD+=t)-eN);return e0(t);case 218:if(t=J.getUint16(eD),eD+=2,eL>=eD)return M.slice(eD-eN,(eD+=t)-eN);return e1(t);case 219:if(t=J.getUint32(eD),eD+=4,eL>=eD)return M.slice(eD-eN,(eD+=t)-eN);return e2(t);case 220:return t=J.getUint16(eD),eD+=2,e4(t);case 221:return t=J.getUint32(eD),eD+=4,e4(t);case 222:return t=J.getUint16(eD),eD+=2,e6(t);case 223:return t=J.getUint32(eD),eD+=4,e6(t);default:if(e>=224)return e-256;if(void 0===e){let e=Error("Unexpected end of MessagePack data");throw e.incomplete=!0,e}throw Error("Unknown MessagePack token "+e)}}}let eH=/^[a-zA-Z_$][a-zA-Z\d_$]*$/;function ez(e,t){function r(){if(r.count++>eY){let r=e.read=Function("r","return function(){return "+(eM.freezeData?"Object.freeze":"")+"({"+e.map(e=>"__proto__"===e?"__proto_:r()":eH.test(e)?e+":r()":"["+JSON.stringify(e)+"]:r()").join(",")+"})}")(eW);return 0===e.highByte&&(e.read=eX(t,e.read)),r()}let n={};for(let t=0,r=e.length;t<r;t++){let r=e[t];"__proto__"===r&&(r="__proto_"),n[r]=eW()}return eM.freezeData?Object.freeze(n):n}return(r.count=0,0===e.highByte)?eX(t,r):r}let eX=(e,t)=>function(){let r=C[eD++];if(0===r)return t();let n=e<32?-(e+(r<<5)):e+(r<<5),i=_[n]||eQ()[n];if(!i)throw Error("Record id is not defined for "+n);return i.read||(i.read=ez(i,e)),i.read()};function eQ(){let e=td(()=>(C=null,eM.getStructures()));return _=eM._mergeStructures(e,_)}var eZ=e3,e0=e3,e1=e3,e2=e3;function e3(e){let t;if(e<16&&(t=e8(e)))return t;if(e>64&&D)return D.decode(C.subarray(eD,eD+=e));let r=eD+e,n=[];for(t="";eD<r;){let e=C[eD++];if((128&e)==0)n.push(e);else if((224&e)==192){let t=63&C[eD++];n.push((31&e)<<6|t)}else if((240&e)==224){let t=63&C[eD++],r=63&C[eD++];n.push((31&e)<<12|t<<6|r)}else if((248&e)==240){let t=(7&e)<<18|(63&C[eD++])<<12|(63&C[eD++])<<6|63&C[eD++];t>65535&&(t-=65536,n.push(t>>>10&1023|55296),t=56320|1023&t),n.push(t)}else n.push(e);n.length>=4096&&(t+=e5.apply(String,n),n.length=0)}return n.length>0&&(t+=e5.apply(String,n)),t}function e4(e){let t=Array(e);for(let r=0;r<e;r++)t[r]=eW();return eM.freezeData?Object.freeze(t):t}function e6(e){if(eM.mapsAsObjects){let t={};for(let r=0;r<e;r++){let e=tn();"__proto__"===e&&(e="__proto_"),t[e]=eW()}return t}{let t=new Map;for(let r=0;r<e;r++)t.set(eW(),eW());return t}}var e5=String.fromCharCode;function e9(e){let t=eD,r=Array(e);for(let n=0;n<e;n++){let e=C[eD++];if((128&e)>0){eD=t;return}r[n]=e}return e5.apply(String,r)}function e8(e){if(e<4)if(e<2)if(0===e)return"";else{let e=C[eD++];if((128&e)>1){eD-=1;return}return e5(e)}else{let t=C[eD++],r=C[eD++];if((128&t)>0||(128&r)>0){eD-=2;return}if(e<3)return e5(t,r);let n=C[eD++];if((128&n)>0){eD-=3;return}return e5(t,r,n)}{let t=C[eD++],r=C[eD++],n=C[eD++],i=C[eD++];if((128&t)>0||(128&r)>0||(128&n)>0||(128&i)>0){eD-=4;return}if(e<6)if(4===e)return e5(t,r,n,i);else{let e=C[eD++];if((128&e)>0){eD-=5;return}return e5(t,r,n,i,e)}if(e<8){let a=C[eD++],s=C[eD++];if((128&a)>0||(128&s)>0){eD-=6;return}if(e<7)return e5(t,r,n,i,a,s);let o=C[eD++];if((128&o)>0){eD-=7;return}return e5(t,r,n,i,a,s,o)}{let a=C[eD++],s=C[eD++],o=C[eD++],l=C[eD++];if((128&a)>0||(128&s)>0||(128&o)>0||(128&l)>0){eD-=8;return}if(e<10)if(8===e)return e5(t,r,n,i,a,s,o,l);else{let e=C[eD++];if((128&e)>0){eD-=9;return}return e5(t,r,n,i,a,s,o,l,e)}if(e<12){let u=C[eD++],d=C[eD++];if((128&u)>0||(128&d)>0){eD-=10;return}if(e<11)return e5(t,r,n,i,a,s,o,l,u,d);let c=C[eD++];if((128&c)>0){eD-=11;return}return e5(t,r,n,i,a,s,o,l,u,d,c)}{let u=C[eD++],d=C[eD++],c=C[eD++],h=C[eD++];if((128&u)>0||(128&d)>0||(128&c)>0||(128&h)>0){eD-=12;return}if(e<14)if(12===e)return e5(t,r,n,i,a,s,o,l,u,d,c,h);else{let e=C[eD++];if((128&e)>0){eD-=13;return}return e5(t,r,n,i,a,s,o,l,u,d,c,h,e)}{let p=C[eD++],m=C[eD++];if((128&p)>0||(128&m)>0){eD-=14;return}if(e<15)return e5(t,r,n,i,a,s,o,l,u,d,c,h,p,m);let f=C[eD++];if((128&f)>0){eD-=15;return}return e5(t,r,n,i,a,s,o,l,u,d,c,h,p,m,f)}}}}}function e7(){let e,t=C[eD++];if(t<192)e=t-160;else switch(t){case 217:e=C[eD++];break;case 218:e=J.getUint16(eD),eD+=2;break;case 219:e=J.getUint32(eD),eD+=4;break;default:throw Error("Expected string")}return e3(e)}function te(e){return eM.copyBuffers?Uint8Array.prototype.slice.call(C,eD,eD+=e):C.subarray(eD,eD+=e)}function tt(e){let t=C[eD++];if(eJ[t]){let r;return eJ[t](C.subarray(eD,r=eD+=e),e=>{eD=e;try{return eW()}finally{eD=r}})}throw Error("Unknown extension type "+t)}var tr=Array(4096);function tn(){let e,t=C[eD++];if(!(t>=160)||!(t<192))return eD--,ti(eW());if(t-=160,eL>=eD)return M.slice(eD-eN,(eD+=t)-eN);if(!(0==eL&&P<180))return eZ(t);let r=(t<<5^(t>1?J.getUint16(eD):t>0?C[eD]:0))&4095,n=tr[r],i=eD,a=eD+t-3,s=0;if(n&&n.bytes==t){for(;i<a;){if((e=J.getUint32(i))!=n[s++]){i=0x70000000;break}i+=4}for(a+=3;i<a;)if((e=C[i++])!=n[s++]){i=0x70000000;break}if(i===a)return eD=i,n.string;a-=3,i=eD}for(n=[],tr[r]=n,n.bytes=t;i<a;)e=J.getUint32(i),n.push(e),i+=4;for(a+=3;i<a;)e=C[i++],n.push(e);let o=t<16?e8(t):e9(t);return null!=o?n.string=o:n.string=eZ(t)}function ti(e){if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e||"bigint"==typeof e)return e.toString();if(null==e)return e+"";if(eM.allowArraysInMapKeys&&Array.isArray(e)&&e.flat().every(e=>["string","number","boolean","bigint"].includes(typeof e)))return e.flat().toString();throw Error(`Invalid property type for record: ${typeof e}`)}let ta=(e,t)=>{let r=eW().map(ti),n=e;void 0!==t&&(e=e<32?-((t<<5)+e):(t<<5)+e,r.highByte=t);let i=_[e];return i&&(i.isShared||eq)&&((_.restoreStructures||(_.restoreStructures=[]))[e]=i),_[e]=r,r.read=ez(r,n),r.read()};eJ[0]=()=>{},eJ[0].noBuffer=!0,eJ[66]=e=>{let t=e.byteLength%8||8,r=BigInt(128&e[0]?e[0]-256:e[0]);for(let n=1;n<t;n++)r<<=BigInt(8),r+=BigInt(e[n]);if(e.byteLength!==t){let n=new DataView(e.buffer,e.byteOffset,e.byteLength),i=(e,t)=>{let r=t-e;if(r<=40){let r=n.getBigUint64(e);for(let i=e+8;i<t;i+=8)r<<=BigInt(64n),r|=n.getBigUint64(i);return r}let a=e+(r>>4<<3),s=i(e,a),o=i(a,t);return s<<BigInt((t-a)*8)|o};r=r<<BigInt((n.byteLength-t)*8)|i(t,n.byteLength)}return r};let ts={Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError,AggregateError:"function"==typeof AggregateError?AggregateError:null};eJ[101]=()=>{let e=eW();if(!ts[e[0]]){let t=Error(e[1],{cause:e[2]});return t.name=e[0],t}return ts[e[0]](e[1],{cause:e[2]})},eJ[105]=e=>{let t;if(!1===eM.structuredClone)throw Error("Structured clone extension is disabled");let r=J.getUint32(eD-4);L||(L=new Map);let n=C[eD],i={target:t=n>=144&&n<160||220==n||221==n?[]:n>=128&&n<144||222==n||223==n?new Map:(n>=199&&n<=201||n>=212&&n<=216)&&115===C[eD+1]?new Set:{}};L.set(r,i);let a=eW();if(!i.used)return i.target=a;if(Object.assign(t,a),t instanceof Map)for(let[e,r]of a.entries())t.set(e,r);if(t instanceof Set)for(let e of Array.from(a))t.add(e);return t},eJ[112]=e=>{if(!1===eM.structuredClone)throw Error("Structured clone extension is disabled");let t=J.getUint32(eD-4),r=L.get(t);return r.used=!0,r.target},eJ[115]=()=>new Set(eW());let to=["Int8","Uint8","Uint8Clamped","Int16","Uint16","Int32","Uint32","Float32","Float64","BigInt64","BigUint64"].map(e=>e+"Array"),tl="object"==typeof globalThis?globalThis:window;eJ[116]=e=>{let t=e[0],r=Uint8Array.prototype.slice.call(e,1).buffer,n=to[t];if(!n){if(16===t)return r;if(17===t)return new DataView(r);throw Error("Could not find typed array for code "+t)}return new tl[n](r)},eJ[120]=()=>{let e=eW();return new RegExp(e[0],e[1])};let tu=[];function td(e){V&&V();let t=P,r=eD,n=e_,i=eN,a=eL,s=M,o=eP,l=L,u=N,d=new Uint8Array(C.slice(0,P)),c=_,h=_.slice(0,_.length),p=eM,m=eq,f=e();return P=t,eD=r,e_=n,eN=i,eL=a,M=s,eP=o,L=l,N=u,C=d,eq=m,(_=c).splice(0,_.length,...h),eM=p,J=new DataView(C.buffer,C.byteOffset,C.byteLength),f}function tc(){C=null,L=null,_=null}eJ[98]=e=>{let t=(e[0]<<24)+(e[1]<<16)+(e[2]<<8)+e[3],r=eD;return eD+=t-e.length,N=tu,(N=[e7(),e7()]).position0=0,N.position1=0,N.postBundlePosition=eD,eD=r,eW()},eJ[255]=e=>4==e.length?new Date((0x1000000*e[0]+(e[1]<<16)+(e[2]<<8)+e[3])*1e3):8==e.length?new Date(((e[0]<<22)+(e[1]<<14)+(e[2]<<6)+(e[3]>>2))/1e6+((3&e[3])*0x100000000+0x1000000*e[4]+(e[5]<<16)+(e[6]<<8)+e[7])*1e3):12==e.length?new Date(((e[0]<<24)+(e[1]<<16)+(e[2]<<8)+e[3])/1e6+((128&e[4]?-0x1000000000000:0)+0x10000000000*e[6]+0x100000000*e[7]+0x1000000*e[8]+(e[9]<<16)+(e[10]<<8)+e[11])*1e3):new Date("invalid");let th=Array(147);for(let e=0;e<256;e++)th[e]=+("1e"+Math.floor(45.15-.30103*e));var tp=new eB({useRecords:!1});tp.unpack,tp.unpackMultiple,tp.unpack,new Uint8Array(new Float32Array(1).buffer,0,4);try{t=new TextEncoder}catch(e){}let tm="u">typeof Buffer,tf=tm?function(e){return Buffer.allocUnsafeSlow(e)}:Uint8Array,ty=tm?Buffer:Uint8Array,tb=tm?0x100000000:0x7fd00000,tg=0,tv=null,tE=/[\u0080-\uFFFF]/,tK=Symbol("record-id");class tS extends eB{constructor(e){let u,d,c,h;super(e),this.offset=0;let p=ty.prototype.utf8Write?function(e,t){return i.utf8Write(e,t,i.byteLength-t)}:!!t&&!!t.encodeInto&&function(e,r){return t.encodeInto(e,i.subarray(r)).written},m=this;e||(e={});let f=e&&e.sequential,y=e.structures||e.saveStructures,b=e.maxSharedStructures;if(null==b&&(b=32*!!y),b>8160)throw Error("Maximum maxSharedStructure is 8160");e.structuredClone&&void 0==e.moreTypes&&(this.moreTypes=!0);let g=e.maxOwnStructures;null==g&&(g=y?32:64),this.structures||!1==e.useRecords||(this.structures=[]);let v=b>32||g+b>64,E=b+64,K=b+g+64;if(K>8256)throw Error("Maximum maxSharedStructure + maxOwnStructure is 8192");let S=[],I=0,w=0;this.pack=this.encode=function(e,t){let r;if(i||(s=(i=new tf(8192)).dataView||(i.dataView=new DataView(i.buffer,0,8192)),tg=0),(o=i.length-10)-tg<2048?(s=(i=new tf(i.length)).dataView||(i.dataView=new DataView(i.buffer,0,i.length)),o=i.length-10,tg=0):tg=tg+7&0x7ffffff8,u=tg,t&t_&&(tg+=255&t),h=m.structuredClone?new Map:null,m.bundleStrings&&"string"!=typeof e?(tv=[]).size=1/0:tv=null,c=m.structures){c.uninitialized&&(c=m._mergeStructures(m.getStructures()));let e=c.sharedLength||0;if(e>b)throw Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to "+c.sharedLength);if(!c.transitions){c.transitions=Object.create(null);for(let t=0;t<e;t++){let e=c[t];if(!e)continue;let r,n=c.transitions;for(let t=0,i=e.length;t<i;t++){let i=e[t];(r=n[i])||(r=n[i]=Object.create(null)),n=r}n[tK]=t+64}this.lastNamedStructuresLength=e}f||(c.nextId=e+64)}d&&(d=!1);try{m.randomAccessStructure&&e&&e.constructor&&e.constructor===Object?_(e):R(e);let r=tv;if(tv&&tT(u,R,0),h&&h.idsToInsert){let e=h.idsToInsert.sort((e,t)=>e.offset>t.offset?1:-1),t=e.length,n=-1;for(;r&&t>0;){let i=e[--t].offset+u;i<r.stringsPosition+u&&-1===n&&(n=0),i>r.position+u?n>=0&&(n+=6):(n>=0&&(s.setUint32(r.position+u,s.getUint32(r.position+u)+n),n=-1),r=r.previous,t++)}n>=0&&r&&s.setUint32(r.position+u,s.getUint32(r.position+u)+n),(tg+=6*e.length)>o&&D(tg),m.offset=tg;let a=function(e,t){let r,n=6*t.length,i=e.length-n;for(;r=t.pop();){let t=r.offset,a=r.id;e.copyWithin(t+n,t,i);let s=t+(n-=6);e[s++]=214,e[s++]=105,e[s++]=a>>24,e[s++]=a>>16&255,e[s++]=a>>8&255,e[s++]=255&a,i=t}return e}(i.subarray(u,tg),e);return h=null,a}if(m.offset=tg,t&tC)return i.start=u,i.end=tg,i;return i.subarray(u,tg)}catch(e){throw r=e,e}finally{if(c&&(x(),d&&m.saveStructures)){let n=c.sharedLength||0,a=i.subarray(u,tg),s=tR(c,m);if(!r){if(!1===m.saveStructures(s,s.isCompatible))return m.pack(e,t);return m.lastNamedStructuresLength=n,i.length>0x40000000&&(i=null),a}}i.length>0x40000000&&(i=null),t&tP&&(tg=u)}};const x=()=>{w<10&&w++;let e=c.sharedLength||0;if(c.length>e&&!f&&(c.length=e),I>1e4)c.transitions=null,w=0,I=0,S.length>0&&(S=[]);else if(S.length>0&&!f){for(let e=0,t=S.length;e<t;e++)S[e][tK]=0;S=[]}},T=e=>{var t=e.length;t<16?i[tg++]=144|t:t<65536?(i[tg++]=220,i[tg++]=t>>8,i[tg++]=255&t):(i[tg++]=221,s.setUint32(tg,t),tg+=4);for(let r=0;r<t;r++)R(e[r])},R=e=>{tg>o&&(i=D(tg));var t,a=typeof e;if("string"===a){let r,n=e.length;if(tv&&n>=4&&n<4096){if((tv.size+=n)>21760){let e,t,r=(tv[0]?3*tv[0].length+tv[1].length:0)+10;tg+r>o&&(i=D(tg+r)),tv.position?(t=tv,i[tg]=200,tg+=3,i[tg++]=98,e=tg-u,tg+=4,tT(u,R,0),s.setUint16(e+u-3,tg-u-e)):(i[tg++]=214,i[tg++]=98,e=tg-u,tg+=4),(tv=["",""]).previous=t,tv.size=0,tv.position=e}let t=tE.test(e);tv[+!t]+=e,i[tg++]=193,R(t?-n:n);return}r=n<32?1:n<256?2:n<65536?3:5;let a=3*n;if(tg+a>o&&(i=D(tg+a)),n<64||!p){let a,s,o,l=tg+r;for(a=0;a<n;a++)(s=e.charCodeAt(a))<128?i[l++]=s:(s<2048?i[l++]=s>>6|192:((64512&s)==55296&&(64512&(o=e.charCodeAt(a+1)))==56320?(s=65536+((1023&s)<<10)+(1023&o),a++,i[l++]=s>>18|240,i[l++]=s>>12&63|128):i[l++]=s>>12|224,i[l++]=s>>6&63|128),i[l++]=63&s|128);t=l-tg-r}else t=p(e,tg+r);t<32?i[tg++]=160|t:t<256?(r<2&&i.copyWithin(tg+2,tg+1,tg+1+t),i[tg++]=217,i[tg++]=t):t<65536?(r<3&&i.copyWithin(tg+3,tg+2,tg+2+t),i[tg++]=218,i[tg++]=t>>8,i[tg++]=255&t):(r<5&&i.copyWithin(tg+5,tg+3,tg+3+t),i[tg++]=219,s.setUint32(tg,t),tg+=4),tg+=t}else if("number"===a)if(e>>>0===e)e<32||e<128&&!1===this.useRecords||e<64&&!this.randomAccessStructure?i[tg++]=e:e<256?(i[tg++]=204,i[tg++]=e):e<65536?(i[tg++]=205,i[tg++]=e>>8,i[tg++]=255&e):(i[tg++]=206,s.setUint32(tg,e),tg+=4);else if((0|e)===e)e>=-32?i[tg++]=256+e:e>=-128?(i[tg++]=208,i[tg++]=e+256):e>=-32768?(i[tg++]=209,s.setInt16(tg,e),tg+=2):(i[tg++]=210,s.setInt32(tg,e),tg+=4);else{let t;if((t=this.useFloat32)>0&&e<0x100000000&&e>=-0x80000000){let r;if(i[tg++]=202,s.setFloat32(tg,e),t<4||(0|(r=e*th[(127&i[tg])<<1|i[tg+1]>>7]))===r){tg+=4;return}tg--}i[tg++]=203,s.setFloat64(tg,e),tg+=8}else if("object"===a||"function"===a)if(e){if(h){let t=h.get(e);if(t){t.id||(t.id=(h.idsToInsert||(h.idsToInsert=[])).push(t)),i[tg++]=214,i[tg++]=112,s.setUint32(tg,t.id),tg+=4;return}h.set(e,{offset:tg-u})}let l=e.constructor;if(l===Object)O(e);else if(l===Array)T(e);else if(l===Map)if(this.mapAsEmptyObject)i[tg++]=128;else for(let[r,n]of((t=e.size)<16?i[tg++]=128|t:t<65536?(i[tg++]=222,i[tg++]=t>>8,i[tg++]=255&t):(i[tg++]=223,s.setUint32(tg,t),tg+=4),e))R(r),R(n);else{for(let t=0,a=r.length;t<a;t++)if(e instanceof n[t]){let n,a=r[t];if(a.write){a.type&&(i[tg++]=212,i[tg++]=a.type,i[tg++]=0);let t=a.write.call(this,e);t===e?Array.isArray(e)?T(e):O(e):R(t);return}let l=i,u=s,d=tg;i=null;try{n=a.pack.call(this,e,e=>(i=l,l=null,(tg+=e)>o&&D(tg),{target:i,targetView:s,position:tg-e}),R)}finally{l&&(i=l,s=u,tg=d,o=i.length-10)}n&&(n.length+tg>o&&D(n.length+tg),tg=tx(n,i,tg,a.type));return}if(Array.isArray(e))T(e);else{if(e.toJSON){let t=e.toJSON();if(t!==e)return R(t)}if("function"===a)return R(this.writeFunction&&this.writeFunction(e));O(e)}}}else i[tg++]=192;else if("boolean"===a)i[tg++]=e?195:194;else if("bigint"===a){if(e<0x8000000000000000&&e>=-0x8000000000000000)i[tg++]=211,s.setBigInt64(tg,e);else if(e<0xffffffffffffffff&&e>0)i[tg++]=207,s.setBigUint64(tg,e);else if(this.largeBigIntToFloat)i[tg++]=203,s.setFloat64(tg,Number(e));else if(this.largeBigIntToString)return R(e.toString());else if(this.useBigIntExtension||this.moreTypes){let t,r=e<0?BigInt(-1):BigInt(0);if(e>>BigInt(65536)===r){let n=BigInt(0xffffffffffffffff)-BigInt(1),i=[];for(;i.push(e&n),e>>BigInt(63)!==r;)e>>=BigInt(64);(t=new Uint8Array(new BigUint64Array(i).buffer)).reverse()}else{let r=e<0,n=(r?~e:e).toString(16);if(n.length%2?n="0"+n:parseInt(n.charAt(0),16)>=8&&(n="00"+n),tm)t=Buffer.from(n,"hex");else{t=new Uint8Array(n.length/2);for(let e=0;e<t.length;e++)t[e]=parseInt(n.slice(2*e,2*e+2),16)}if(r)for(let e=0;e<t.length;e++)t[e]=~t[e]}t.length+tg>o&&D(t.length+tg),tg=tx(t,i,tg,66);return}else throw RangeError(e+" was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string");tg+=8}else if("undefined"===a)this.encodeUndefinedAsNil?i[tg++]=192:(i[tg++]=212,i[tg++]=0,i[tg++]=0);else throw Error("Unknown type: "+a)},j=this.variableMapSize||this.coercibleKeyAsNumber||this.skipValues?e=>{let t,r;if(this.skipValues)for(let r in t=[],e)("function"!=typeof e.hasOwnProperty||e.hasOwnProperty(r))&&!this.skipValues.includes(e[r])&&t.push(r);else t=Object.keys(e);let n=t.length;if(n<16?i[tg++]=128|n:n<65536?(i[tg++]=222,i[tg++]=n>>8,i[tg++]=255&n):(i[tg++]=223,s.setUint32(tg,n),tg+=4),this.coercibleKeyAsNumber)for(let i=0;i<n;i++){let n=Number(r=t[i]);R(isNaN(n)?r:n),R(e[r])}else for(let i=0;i<n;i++)R(r=t[i]),R(e[r])}:e=>{i[tg++]=222;let t=tg-u;tg+=2;let r=0;for(let t in e)("function"!=typeof e.hasOwnProperty||e.hasOwnProperty(t))&&(R(t),R(e[t]),r++);if(r>65535)throw Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');i[t+++u]=r>>8,i[t+u]=255&r},k=!1===this.useRecords?j:e.progressiveRecords&&!v?e=>{let t,r,n=c.transitions||(c.transitions=Object.create(null)),a=tg++-u;for(let i in e)if("function"!=typeof e.hasOwnProperty||e.hasOwnProperty(i)){if(r=n[i])n=r;else{let s=Object.keys(e),o=n;n=c.transitions;let l=0;for(let e=0,t=s.length;e<t;e++){let t=s[e];!(r=n[t])&&(r=n[t]=Object.create(null),l++),n=r}a+u+1==tg?(tg--,C(n,s,l)):P(n,s,a,l),t=!0,n=o[i]}R(e[i])}if(!t){let t=n[tK];t?i[a+u]=t:P(n,Object.keys(e),a,0)}}:e=>{let t,r=c.transitions||(c.transitions=Object.create(null)),n=0;for(let i in e)("function"!=typeof e.hasOwnProperty||e.hasOwnProperty(i))&&(!(t=r[i])&&(t=r[i]=Object.create(null),n++),r=t);let a=r[tK];for(let t in a?a>=96&&v?(i[tg++]=(31&(a-=96))+96,i[tg++]=a>>5):i[tg++]=a:C(r,r.__keys__||Object.keys(e),n),e)("function"!=typeof e.hasOwnProperty||e.hasOwnProperty(t))&&R(e[t])},A="function"==typeof this.useRecords&&this.useRecords,O=A?e=>{A(e)?k(e):j(e)}:k,D=e=>{let t;if(e>0x1000000){if(e-u>tb)throw Error("Packed buffer would be larger than maximum buffer size");t=Math.min(tb,4096*Math.round(Math.max((e-u)*(e>0x4000000?1.25:2),4194304)/4096))}else t=(Math.max(e-u<<2,i.length-1)>>12)+1<<12;let r=new tf(t);return s=r.dataView||(r.dataView=new DataView(r.buffer,0,t)),e=Math.min(e,i.length),i.copy?i.copy(r,0,u,e):r.set(i.slice(u,e)),tg-=u,u=0,o=r.length-10,i=r},C=(e,t,r)=>{let n=c.nextId;n||(n=64),n<E&&this.shouldShareStructure&&!this.shouldShareStructure(t)?((n=c.nextOwnId)<K||(n=E),c.nextOwnId=n+1):(n>=K&&(n=E),c.nextId=n+1);let a=t.highByte=n>=96&&v?n-96>>5:-1;e[tK]=n,e.__keys__=t,c[n-64]=t,n<E?(t.isShared=!0,c.sharedLength=n-63,d=!0,a>=0?(i[tg++]=(31&n)+96,i[tg++]=a):i[tg++]=n):(a>=0?(i[tg++]=213,i[tg++]=114,i[tg++]=(31&n)+96,i[tg++]=a):(i[tg++]=212,i[tg++]=114,i[tg++]=n),r&&(I+=w*r),S.length>=g&&(S.shift()[tK]=0),S.push(e),R(t))},P=(e,t,r,n)=>{let s=i,l=tg,d=o,c=u;tg=0,u=0,(i=a)||(a=i=new tf(8192)),o=i.length-10,C(e,t,n),a=i;let h=tg;if(i=s,tg=l,o=d,u=c,h>1){let e=tg+h-1;e>o&&D(e);let t=r+u;i.copyWithin(t+h,t+1,tg),i.set(a.slice(0,h),t),tg=e}else i[r+u]=a[0]},_=e=>{let t=l(e,i,u,tg,c,D,(e,t,r)=>{if(r)return d=!0;tg=t;let n=i;return(R(e),x(),n!==i)?{position:tg,targetView:s,target:i}:tg},this);if(0===t)return O(e);tg=t}}useBuffer(e){(i=e).dataView||(i.dataView=new DataView(i.buffer,i.byteOffset,i.byteLength)),s=i.dataView,tg=0}set position(e){tg=e}get position(){return tg}clearSharedData(){this.structures&&(this.structures=[]),this.typedStructs&&(this.typedStructs=[])}}function tI(e,t,r,n){let i=e.byteLength;if(i+1<256){var{target:a,position:s}=r(4+i);a[s++]=199,a[s++]=i+1}else if(i+1<65536){var{target:a,position:s}=r(5+i);a[s++]=200,a[s++]=i+1>>8,a[s++]=i+1&255}else{var{target:a,position:s,targetView:o}=r(7+i);a[s++]=201,o.setUint32(s,i+1),s+=4}a[s++]=116,a[s++]=t,e.buffer||(e=new Uint8Array(e)),a.set(new Uint8Array(e.buffer,e.byteOffset,e.byteLength),s)}function tw(e,t){let r=e.byteLength;if(r<256){var n,i,{target:n,position:i}=t(r+2);n[i++]=196,n[i++]=r}else if(r<65536){var{target:n,position:i}=t(r+3);n[i++]=197,n[i++]=r>>8,n[i++]=255&r}else{var{target:n,position:i,targetView:a}=t(r+5);n[i++]=198,a.setUint32(i,r),i+=4}n.set(e,i)}function tx(e,t,r,n){let i=e.length;switch(i){case 1:t[r++]=212;break;case 2:t[r++]=213;break;case 4:t[r++]=214;break;case 8:t[r++]=215;break;case 16:t[r++]=216;break;default:i<256?(t[r++]=199,t[r++]=i):(i<65536?(t[r++]=200,t[r++]=i>>8):(t[r++]=201,t[r++]=i>>24,t[r++]=i>>16&255,t[r++]=i>>8&255),t[r++]=255&i)}return t[r++]=n,t.set(e,r),r+=i}function tT(e,t,r){if(tv.length>0){s.setUint32(tv.position+e,tg+r-tv.position-e),tv.stringsPosition=tg-e;let n=tv;tv=null,t(n[0]),t(n[1])}}function tR(e,t){return e.isCompatible=e=>{let r=!e||(t.lastNamedStructuresLength||0)===e.length;return r||t._mergeStructures(e),r},e}n=[Date,Set,Error,RegExp,ArrayBuffer,Object.getPrototypeOf(Uint8Array.prototype).constructor,DataView,eG],r=[{pack(e,t,r){let n=e.getTime()/1e3;if((this.useTimestamp32||0===e.getMilliseconds())&&n>=0&&n<0x100000000){let{target:e,targetView:r,position:i}=t(6);e[i++]=214,e[i++]=255,r.setUint32(i,n)}else if(n>0&&n<0x100000000){let{target:r,targetView:i,position:a}=t(10);r[a++]=215,r[a++]=255,i.setUint32(a,4e6*e.getMilliseconds()+(n/1e3/0x100000000|0)),i.setUint32(a+4,n)}else if(isNaN(n)){if(this.onInvalidDate)return t(0),r(this.onInvalidDate());let{target:e,targetView:n,position:i}=t(3);e[i++]=212,e[i++]=255,e[i++]=255}else{let{target:r,targetView:i,position:a}=t(15);r[a++]=199,r[a++]=12,r[a++]=255,i.setUint32(a,1e6*e.getMilliseconds()),i.setBigInt64(a+4,BigInt(Math.floor(n)))}}},{pack(e,t,r){if(this.setAsEmptyObject)return t(0),r({});let n=Array.from(e),{target:i,position:a}=t(3*!!this.moreTypes);this.moreTypes&&(i[a++]=212,i[a++]=115,i[a++]=0),r(n)}},{pack(e,t,r){let{target:n,position:i}=t(3*!!this.moreTypes);this.moreTypes&&(n[i++]=212,n[i++]=101,n[i++]=0),r([e.name,e.message,e.cause])}},{pack(e,t,r){let{target:n,position:i}=t(3*!!this.moreTypes);this.moreTypes&&(n[i++]=212,n[i++]=120,n[i++]=0),r([e.source,e.flags])}},{pack(e,t){this.moreTypes?tI(e,16,t):tw(tm?Buffer.from(e):new Uint8Array(e),t)}},{pack(e,t){let r=e.constructor;r!==ty&&this.moreTypes?tI(e,to.indexOf(r.name),t):tw(e,t)}},{pack(e,t){this.moreTypes?tI(e,17,t):tw(tm?Buffer.from(e):new Uint8Array(e),t)}},{pack(e,t){let{target:r,position:n}=t(1);r[n]=193}}];let tj=new tS({useRecords:!1});tj.pack,tj.pack;let{NEVER:tk,ALWAYS:tA,DECIMAL_ROUND:tO,DECIMAL_FIT:tD}={NEVER:0,ALWAYS:1,DECIMAL_ROUND:3,DECIMAL_FIT:4},tC=512,tP=1024,t_=2048,tM=["num","object","string","ascii"];tM[16]="date";let tN=[!1,!0,!0,!1,!1,!0,!0,!1];try{Function(""),u=!0}catch(e){}let tL="u">typeof Buffer;try{c=new TextEncoder}catch(e){}let tJ=tL?function(e,t,r){return e.utf8Write(t,r,e.byteLength-r)}:!!c&&!!c.encodeInto&&function(e,t,r){return c.encodeInto(t,e.subarray(r)).written};function tF(e,t,r,n){let i;return(i=e.ascii8||e.num8)?(r.setInt8(t,n,!0),d=t+1,i):(i=e.string16||e.object16)?(r.setInt16(t,n,!0),d=t+2,i):(i=e.num32)?(r.setUint32(t,0xe0000100+n,!0),d=t+4,i):(i=e.num64)?(r.setFloat64(t,NaN,!0),r.setInt8(t,n),d=t+8,i):void(d=t)}function tG(e,t,r){let n=tM[t]+(r<<3),i=e[n]||(e[n]=Object.create(null));return i.__type=t,i.__size=r,i.__parent=e,i}Symbol("type"),Symbol("parent"),l=function e(t,r,n,i,a,s,o,l){let u,c=l.typedStructs||(l.typedStructs=[]),h=r.dataView,p=(c.lastStringStart||100)+i,m=r.length-10,f=i;i>m&&(h=(r=s(i)).dataView,i-=n,f-=n,p-=n,n=0,m=r.length-10);let y,b=p,g=c.transitions||(c.transitions=Object.create(null)),v=c.nextId||c.length,E=v<15?1:v<240?2:v<61440?3:4*(v<0xf00000);if(0===E)return 0;i+=E;let K=[],S=0;for(let e in t){let a=t[e],l=g[e];switch(!l&&(g[e]=l={key:e,parent:g,enumerationOffset:0,ascii0:null,ascii8:null,num8:null,string16:null,object16:null,num32:null,float64:null,date64:null}),i>m&&(h=(r=s(i)).dataView,i-=n,f-=n,p-=n,b-=n,n=0,m=r.length-10),typeof a){case"number":if(v<200||!l.num64){if((0|a)===a&&a<0x20000000&&a>-0x1f000000){a<246&&a>=0&&(l.num8&&!(v>200&&l.num32)||a<32&&!l.num32)?(g=l.num8||tG(l,0,1),r[i++]=a):(g=l.num32||tG(l,0,4),h.setUint32(i,a,!0),i+=4);break}else if(a<0x100000000&&a>=-0x80000000&&(h.setFloat32(i,a,!0),tN[r[i+3]>>>5])){let e;if((0|(e=a*th[(127&r[i+3])<<1|r[i+2]>>7]))===e){g=l.num32||tG(l,0,4),i+=4;break}}}g=l.num64||tG(l,0,8),h.setFloat64(i,a,!0),i+=8;break;case"string":let E,I=a.length;if(y=b-p,(I<<2)+b>m&&(h=(r=s((I<<2)+b)).dataView,i-=n,f-=n,p-=n,b-=n,n=0,m=r.length-10),I>65280+y>>2){K.push(e,a,i-f);break}let w=b;if(I<64){let e,t,n;for(e=0;e<I;e++)(t=a.charCodeAt(e))<128?r[b++]=t:(t<2048?(E=!0,r[b++]=t>>6|192):((64512&t)==55296&&(64512&(n=a.charCodeAt(e+1)))==56320?(E=!0,t=65536+((1023&t)<<10)+(1023&n),e++,r[b++]=t>>18|240,r[b++]=t>>12&63|128):(E=!0,r[b++]=t>>12|224),r[b++]=t>>6&63|128),r[b++]=63&t|128)}else b+=tJ(r,a,b),E=b-w>I;if(y<160||y<246&&(l.ascii8||l.string8)){if(E)(g=l.string8)||(c.length>10&&(g=l.ascii8)?(g.__type=2,l.ascii8=null,l.string8=g,o(null,0,!0)):g=tG(l,2,1));else if(0!==y||u)(g=l.ascii8)||c.length>10&&(g=l.string8)||(g=tG(l,3,1));else{u=!0,g=l.ascii0||tG(l,3,0);break}r[i++]=y}else g=l.string16||tG(l,2,2),h.setUint16(i,y,!0),i+=2;break;case"object":a?a.constructor===Date?(g=l.date64||tG(l,16,8),h.setFloat64(i,a.getTime(),!0),i+=8):K.push(e,a,S):(l=tF(l,i,h,-10))?(g=l,i=d):K.push(e,a,S);break;case"boolean":g=l.num8||l.ascii8||tG(l,0,1),r[i++]=a?249:248;break;case"undefined":(l=tF(l,i,h,-9))?(g=l,i=d):K.push(e,a,S);break;default:K.push(e,a,S)}S++}for(let e=0,t=K.length;e<t;){let t,a=K[e++],s=K[e++],l=K[e++],u=g[a];if(u||(g[a]=u={key:a,parent:g,enumerationOffset:l-S,ascii0:null,ascii8:null,num8:null,string16:null,object16:null,num32:null,float64:null}),s){let e;(y=b-p)<65280?(g=u.object16)?e=2:(g=u.object32)?e=4:(g=tG(u,1,2),e=2):(g=u.object32||tG(u,1,4),e=4),"object"==typeof(t=o(s,b))?(b=t.position,h=t.targetView,r=t.target,p-=n,i-=n,f-=n,n=0):b=t,2===e?(h.setUint16(i,y,!0),i+=2):(h.setUint32(i,y,!0),i+=4)}else g=u.object16||tG(u,1,2),h.setInt16(i,null===s?-10:-9,!0),i+=2;S++}let I=g[tK];if(null==I){let e;I=l.typedStructs.length;let t=[],r=g;for(;void 0!==(e=r.__type);){let n=[e,r.__size,(r=r.__parent).key];r.enumerationOffset&&n.push(r.enumerationOffset),t.push(n),r=r.parent}t.reverse(),g[tK]=I,l.typedStructs[I]=t,o(null,0,!0)}switch(E){case 1:if(I>=16)return 0;r[f]=I+32;break;case 2:if(I>=256)return 0;r[f]=56,r[f+1]=I;break;case 3:if(I>=65536)return 0;r[f]=57,h.setUint16(f+1,I,!0);break;case 4:if(I>=0x1000000)return 0;h.setUint32(f,(I<<8)+58,!0)}if(i<p){if(p===b)return i;r.copyWithin(i,p,b),b+=i-p,c.lastStringStart=i-f}else if(i>p)return p===b?i:(c.lastStringStart=i-f,e(t,r,n,f,a,s,o,l));return b},tR=function(e,t){if(t.typedStructs){let r=new Map;r.set("named",e),r.set("typed",t.typedStructs),e=r}let r=t.lastTypedStructuresLength||0;return e.isCompatible=e=>{let n=!0;return e instanceof Map?((e.get("named")||[]).length!==(t.lastNamedStructuresLength||0)&&(n=!1),(e.get("typed")||[]).length!==r&&(n=!1)):(e instanceof Array||Array.isArray(e))&&e.length!==(t.lastNamedStructuresLength||0)&&(n=!1),n||t._mergeStructures(e),n},t.lastTypedStructuresLength=t.typedStructs&&t.typedStructs.length,e};var tV=Symbol.for("source");function tq(e){switch(e){case 246:return null;case 247:return;case 248:return!1;case 249:return!0}throw Error("Unknown constant")}F=function(e,t,r,n){let i=e[t++]-32;if(i>=24)switch(i){case 24:i=e[t++];break;case 25:i=e[t++]+(e[t++]<<8);break;case 26:i=e[t++]+(e[t++]<<8)+(e[t++]<<16);break;case 27:i=e[t++]+(e[t++]<<8)+(e[t++]<<16)+(e[t++]<<24)}let a=n.typedStructs&&n.typedStructs[i];if(!a){if(e=Uint8Array.prototype.slice.call(e,t,r),r-=t,t=0,!n.getStructures)throw Error(`Reference to shared structure ${i} without getStructures method`);if(n._mergeStructures(n.getStructures()),!n.typedStructs)throw Error("Could not find any shared typed structures");if(n.lastTypedStructuresLength=n.typedStructs.length,!(a=n.typedStructs[i]))throw Error("Could not find typed structure "+i)}var s=a.construct,o=a.fullConstruct;if(!s){let e;s=a.construct=function(){},(o=a.fullConstruct=function(){}).prototype=n.structPrototype||{};var l=s.prototype=n.structPrototype?Object.create(n.structPrototype):{};let t=[],r=0;for(let i=0,s=a.length;i<s;i++){let s,o,[l,u,d,c]=a[i];"__proto__"===d&&(d="__proto_");let p={key:d,offset:r};switch(c?t.splice(i+c,0,p):t.push(p),u){case 0:s=()=>0;break;case 1:s=(e,t)=>{let r=e.bytes[t+p.offset];return r>=246?tq(r):r};break;case 2:s=(e,t)=>{let r=e.bytes,n=(r.dataView||(r.dataView=new DataView(r.buffer,r.byteOffset,r.byteLength))).getUint16(t+p.offset,!0);return n>=65280?tq(255&n):n};break;case 4:s=(e,t)=>{let r=e.bytes,n=(r.dataView||(r.dataView=new DataView(r.buffer,r.byteOffset,r.byteLength))).getUint32(t+p.offset,!0);return n>=0xffffff00?tq(255&n):n}}switch(p.getRef=s,r+=u,l){case 3:e&&!e.next&&(e.next=p),e=p,p.multiGetCount=0,o=function(e){let t=e.bytes,n=e.position,i=r+n,a=s(e,n);if("number"!=typeof a)return a;let o,l=p.next;for(;l&&"number"!=typeof(o=l.getRef(e,n));)o=null,l=l.next;return(null==o&&(o=e.bytesEnd-i),e.srcString)?e.srcString.slice(a,o):function(e,t,r){let n=C;C=e,eD=t;try{return e3(r)}finally{C=n}}(t,a+i,o-a)};break;case 2:case 1:e&&!e.next&&(e.next=p),e=p,o=function(e){let t=e.position,i=r+t,a=s(e,t);if("number"!=typeof a)return a;let o=e.bytes,u,d=p.next;for(;d&&"number"!=typeof(u=d.getRef(e,t));)u=null,d=d.next;if(null==u&&(u=e.bytesEnd-i),2===l)return o.toString("utf8",a+i,u+i);h=e;try{return n.unpack(o,{start:a+i,end:u+i})}finally{h=null}};break;case 0:switch(u){case 4:o=function(e){let t=e.bytes,r=t.dataView||(t.dataView=new DataView(t.buffer,t.byteOffset,t.byteLength)),n=e.position+p.offset,i=r.getInt32(n,!0);if(i<0x20000000){if(i>-0x1f000000)return i;if(i>-0x20000000)return tq(255&i)}let a=r.getFloat32(n,!0),s=th[(127&t[n+3])<<1|t[n+2]>>7];return(s*a+(a>0?.5:-.5)|0)/s};break;case 8:o=function(e){let t=e.bytes,r=(t.dataView||(t.dataView=new DataView(t.buffer,t.byteOffset,t.byteLength))).getFloat64(e.position+p.offset,!0);if(isNaN(r)){let r=t[e.position+p.offset];if(r>=246)return tq(r)}return r};break;case 1:o=function(e){let t=e.bytes[e.position+p.offset];return t<246?t:tq(t)}}break;case 16:o=function(e){let t=e.bytes;return new Date((t.dataView||(t.dataView=new DataView(t.buffer,t.byteOffset,t.byteLength))).getFloat64(e.position+p.offset,!0))}}p.get=o}if(u){let e,r=[],i=[],a=0;for(let s of t){if(n.alwaysLazyProperty&&n.alwaysLazyProperty(s.key)){e=!0;continue}Object.defineProperty(l,s.key,{get:function(e){return function(){return e(this[tV])}}(s.get),enumerable:!0});let t="v"+a++;i.push(t),r.push("o["+JSON.stringify(s.key)+"]="+t+"(s)")}e&&r.push("__proto__:this");let s=Function(...i,"var c=this;return function(s){var o=new c();"+r.join(";")+";return o;}").apply(o,t.map(e=>e.get));Object.defineProperty(l,"toJSON",{value(e){return s.call(this,this[tV])}})}else Object.defineProperty(l,"toJSON",{value(e){let r={};for(let e=0,n=t.length;e<n;e++){let n=t[e].key;r[n]=this[n]}return r}})}var d=new s;return d[tV]={bytes:e,position:t,srcString:"",bytesEnd:r},d},G=function(e){if(!(e instanceof Map))return e;let t=e.get("typed")||[];Object.isFrozen(t)&&(t=t.map(e=>e.slice(0)));let r=e.get("named"),n=Object.create(null);for(let e=0,r=t.length;e<r;e++){let r=t[e],i=n;for(let[e,t,n]of r){let r=i[n];r||(i[n]=r={key:n,parent:i,enumerationOffset:0,ascii0:null,ascii8:null,num8:null,string16:null,object16:null,num32:null,float64:null,date64:null}),i=tG(r,e,t)}i[tK]=e}return t.transitions=n,this.typedStructs=t,this.lastTypedStructuresLength=t.length,r},V=function(){h&&(h.bytes=Uint8Array.prototype.slice.call(h.bytes,h.position,h.bytesEnd),h.position=0,h.bytesEnd=h.bytes.length)};var tY=e.i(688947);if(tY.Transform,tY.Transform,e.i(362562),void 0===process.env.MSGPACKR_NATIVE_ACCELERATION_DISABLED||"true"!==process.env.MSGPACKR_NATIVE_ACCELERATION_DISABLED.toLowerCase()){let t;try{(t=e.r(139510))&&function(e){function t(t){return function(r){let n=eP[e_++];if(null==n){if(N)return e3(r);let i=C.byteOffset,a=e(eD-t+i,P+i,C.buffer);if("string"==typeof a)n=a,eP=eC;else if(e_=1,eL=1,void 0===(n=(eP=a)[0]))throw Error("Unexpected end of buffer")}let i=n.length;return i<=r?(eD+=r,n):(M=n,eN=eD,eL=eD+i,eD+=r,n.slice(0,r))}}eZ=t(1),e0=t(2),e1=t(3),e2=t(5)}(t.extractStrings)}catch(e){}}let tB="5.66.4",tU=new tS({useRecords:!1,encodeUndefinedAsNil:!0}).pack;class t${constructor(e){this.queue=e,this.version=tB;const t=this.queue.keys;this.moveToFinishedKeys=[t.wait,t.active,t.prioritized,t.events,t.stalled,t.limiter,t.delayed,t.paused,t.meta,t.pc,void 0,void 0,void 0,void 0]}execCommand(e,t,r){return e[`${t}:${this.version}`](r)}async isJobInList(e,t){let r=await this.queue.client;return Number.isInteger(ef(this.queue.redisVersion,"6.0.6")?await this.execCommand(r,"isJobInList",[e,t]):await r.lpos(e,t))}addDelayedJobArgs(e,t,r){let n=this.queue.keys,i=[n.marker,n.meta,n.id,n.delayed,n.completed,n.events];return i.push(tU(r),e.data,t),i}addDelayedJob(e,t,r,n){let i=this.addDelayedJobArgs(t,r,n);return this.execCommand(e,"addDelayedJob",i)}addPrioritizedJobArgs(e,t,r){let n=this.queue.keys,i=[n.marker,n.meta,n.id,n.prioritized,n.delayed,n.completed,n.active,n.events,n.pc];return i.push(tU(r),e.data,t),i}addPrioritizedJob(e,t,r,n){let i=this.addPrioritizedJobArgs(t,r,n);return this.execCommand(e,"addPrioritizedJob",i)}addParentJobArgs(e,t,r){let n=this.queue.keys,i=[n.meta,n.id,n.delayed,n["waiting-children"],n.completed,n.events];return i.push(tU(r),e.data,t),i}addParentJob(e,t,r,n){let i=this.addParentJobArgs(t,r,n);return this.execCommand(e,"addParentJob",i)}addStandardJobArgs(e,t,r){let n=this.queue.keys,i=[n.wait,n.paused,n.meta,n.id,n.completed,n.delayed,n.active,n.events,n.marker];return i.push(tU(r),e.data,t),i}addStandardJob(e,t,r,n){let i=this.addStandardJobArgs(t,r,n);return this.execCommand(e,"addStandardJob",i)}async addJob(e,t,r,n,i={}){let a,s,o=this.queue.keys,l=t.parent,u=[o[""],void 0!==n?n:"",t.name,t.timestamp,t.parentKey||null,i.parentDependenciesKey||null,l,t.repeatJobKey,t.deduplicationId?`${o.de}:${t.deduplicationId}`:null];if(r.repeat){let e=Object.assign({},r.repeat);e.startDate&&(e.startDate=+new Date(e.startDate)),e.endDate&&(e.endDate=+new Date(e.endDate)),a=tU(Object.assign(Object.assign({},r),{repeat:e}))}else a=tU(r);if((s=i.addToWaitingChildren?await this.addParentJob(e,t,a,u):"number"==typeof r.delay&&r.delay>0?await this.addDelayedJob(e,t,a,u):r.priority?await this.addPrioritizedJob(e,t,a,u):await this.addStandardJob(e,t,a,u))<0)throw this.finishedErrors({code:s,parentKey:i.parentKey,command:"addJob"});return s}pauseArgs(e){let t="wait",r="paused";e||(t="paused",r="wait");let n=[t,r,"meta","prioritized"].map(e=>this.queue.toKey(e));return n.push(this.queue.keys.events,this.queue.keys.delayed,this.queue.keys.marker),n.concat([e?"paused":"resumed"])}async pause(e){let t=await this.queue.client,r=this.pauseArgs(e);return this.execCommand(t,"pause",r)}addRepeatableJobArgs(e,t,r,n){let i=this.queue.keys;return[i.repeat,i.delayed].concat([t,tU(r),n,e,i[""]])}async addRepeatableJob(e,t,r,n){let i=await this.queue.client,a=this.addRepeatableJobArgs(e,t,r,n);return this.execCommand(i,"addRepeatableJob",a)}async removeDeduplicationKey(e,t){let r=await this.queue.client,n=this.queue.keys,i=[`${n.de}:${e}`];return this.execCommand(r,"removeDeduplicationKey",i.concat([t]))}async addJobScheduler(e,t,r,n,i,a,s){let o=await this.queue.client,l=this.queue.keys,u=[l.repeat,l.delayed,l.wait,l.paused,l.meta,l.prioritized,l.marker,l.id,l.events,l.pc,l.active],d=[t,tU(i),e,r,tU(n),tU(a),Date.now(),l[""],s?this.queue.toKey(s):""],c=await this.execCommand(o,"addJobScheduler",u.concat(d));if("number"==typeof c&&c<0)throw this.finishedErrors({code:c,command:"addJobScheduler"});return c}async updateRepeatableJobMillis(e,t,r,n){let i=[this.queue.keys.repeat,r,t,n];return this.execCommand(e,"updateRepeatableJobMillis",i)}async updateJobSchedulerNextMillis(e,t,r,n,i){let a=await this.queue.client,s=this.queue.keys,o=[s.repeat,s.delayed,s.wait,s.paused,s.meta,s.prioritized,s.marker,s.id,s.events,s.pc,i?this.queue.toKey(i):"",s.active],l=[t,e,r,tU(n),Date.now(),s[""],i];return this.execCommand(a,"updateJobScheduler",o.concat(l))}removeRepeatableArgs(e,t,r){let n=this.queue.keys;return[n.repeat,n.delayed,n.events].concat([e,this.getRepeatConcatOptions(t,r),r,n[""]])}getRepeatConcatOptions(e,t){return t&&t.split(":").length>2?t:e}async removeRepeatable(e,t,r){let n=await this.queue.client,i=this.removeRepeatableArgs(e,t,r);return this.execCommand(n,"removeRepeatable",i)}async removeJobScheduler(e){let t=await this.queue.client,r=this.queue.keys,n=[r.repeat,r.delayed,r.events],i=[e,r[""]];return this.execCommand(t,"removeJobScheduler",n.concat(i))}removeArgs(e,t){let r=[e,"repeat"].map(e=>this.queue.toKey(e)),n=[e,+!!t,this.queue.toKey("")];return r.concat(n)}async remove(e,t){let r=await this.queue.client,n=this.removeArgs(e,t),i=await this.execCommand(r,"removeJob",n);if(i<0)throw this.finishedErrors({code:i,jobId:e,command:"removeJob"});return i}async removeUnprocessedChildren(e){let t=await this.queue.client,r=[this.queue.toKey(e),this.queue.keys.meta,this.queue.toKey(""),e];await this.execCommand(t,"removeUnprocessedChildren",r)}async extendLock(e,t,r,n){n=n||await this.queue.client;let i=[this.queue.toKey(e)+":lock",this.queue.keys.stalled,t,r,e];return this.execCommand(n,"extendLock",i)}async extendLocks(e,t,r){let n=await this.queue.client,i=[this.queue.keys.stalled,this.queue.toKey(""),tU(t),tU(e),r];return this.execCommand(n,"extendLocks",i)}async updateData(e,t){let r=await this.queue.client,n=[this.queue.toKey(e.id)],i=JSON.stringify(t),a=await this.execCommand(r,"updateData",n.concat([i]));if(a<0)throw this.finishedErrors({code:a,jobId:e.id,command:"updateData"})}async updateProgress(e,t){let r=await this.queue.client,n=[this.queue.toKey(e),this.queue.keys.events,this.queue.keys.meta],i=JSON.stringify(t),a=await this.execCommand(r,"updateProgress",n.concat([e,i]));if(a<0)throw this.finishedErrors({code:a,jobId:e,command:"updateProgress"})}async addLog(e,t,r){let n=await this.queue.client,i=[this.queue.toKey(e),this.queue.toKey(e)+":logs"],a=await this.execCommand(n,"addLog",i.concat([e,t,r||""]));if(a<0)throw this.finishedErrors({code:a,jobId:e,command:"addLog"});return a}moveToFinishedArgs(e,t,r,n,i,a,s,o=!0,l){var u,d,c,h,p,m,f;let y=this.queue.keys,b=this.queue.opts,g="completed"===i?b.removeOnComplete:b.removeOnFail,v=this.queue.toKey(`metrics:${i}`),E=this.moveToFinishedKeys;E[10]=y[i],E[11]=this.queue.toKey(null!=(u=e.id)?u:""),E[12]=v,E[13]=this.queue.keys.marker;let K=this.getKeepJobs(n,g),S=[e.id,s,r,void 0===t?"null":t,i,!o||this.queue.closing?0:1,y[""],tU({token:a,name:b.name,keepJobs:K,limiter:b.limiter,lockDuration:b.lockDuration,attempts:e.opts.attempts,maxMetricsSize:(null==(d=b.metrics)?void 0:d.maxDataPoints)?null==(c=b.metrics)?void 0:c.maxDataPoints:"",fpof:!!(null==(h=e.opts)?void 0:h.failParentOnFailure),cpof:!!(null==(p=e.opts)?void 0:p.continueParentOnFailure),idof:!!(null==(m=e.opts)?void 0:m.ignoreDependencyOnFailure),rdof:!!(null==(f=e.opts)?void 0:f.removeDependencyOnFailure)}),l?tU(es(l)):void 0];return E.concat(S)}getKeepJobs(e,t){return void 0===e?t||{count:e?0:-1}:"object"==typeof e?e:"number"==typeof e?{count:e}:{count:e?0:-1}}async moveToFinished(e,t){let r=await this.queue.client,n=await this.execCommand(r,"moveToFinished",t);if(n<0)throw this.finishedErrors({code:n,jobId:e,command:"moveToFinished",state:"active"});if(void 0!==n)return tW(n)}drainArgs(e){let t=this.queue.keys;return[t.wait,t.paused,t.delayed,t.prioritized,t.repeat].concat([t[""],e?"1":"0"])}async drain(e){let t=await this.queue.client,r=this.drainArgs(e);return this.execCommand(t,"drain",r)}removeChildDependencyArgs(e,t){return[this.queue.keys[""]].concat([this.queue.toKey(e),t])}async removeChildDependency(e,t){let r=await this.queue.client,n=this.removeChildDependencyArgs(e,t),i=await this.execCommand(r,"removeChildDependency",n);switch(i){case 0:return!0;case 1:return!1;default:throw this.finishedErrors({code:i,jobId:e,parentKey:t,command:"removeChildDependency"})}}getRangesArgs(e,t,r,n){let i=this.queue.keys,a=e.map(e=>"waiting"===e?"wait":e);return[i[""]].concat([t,r,n?"1":"0",...a])}async getRanges(e,t=0,r=1,n=!1){let i=await this.queue.client,a=this.getRangesArgs(e,t,r,n);return await this.execCommand(i,"getRanges",a)}getCountsArgs(e){let t=this.queue.keys,r=e.map(e=>"waiting"===e?"wait":e);return[t[""]].concat([...r])}async getCounts(e){let t=await this.queue.client,r=this.getCountsArgs(e);return await this.execCommand(t,"getCounts",r)}getCountsPerPriorityArgs(e){return[this.queue.keys.wait,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.prioritized].concat(e)}async getCountsPerPriority(e){let t=await this.queue.client,r=this.getCountsPerPriorityArgs(e);return await this.execCommand(t,"getCountsPerPriority",r)}getDependencyCountsArgs(e,t){return[`${e}:processed`,`${e}:dependencies`,`${e}:failed`,`${e}:unsuccessful`].map(e=>this.queue.toKey(e)).concat(t)}async getDependencyCounts(e,t){let r=await this.queue.client,n=this.getDependencyCountsArgs(e,t);return await this.execCommand(r,"getDependencyCounts",n)}moveToCompletedArgs(e,t,r,n,i=!1){let a=Date.now();return this.moveToFinishedArgs(e,t,"returnvalue",r,"completed",n,a,i)}moveToFailedArgs(e,t,r,n,i=!1,a){let s=Date.now();return this.moveToFinishedArgs(e,t,"failedReason",r,"failed",n,s,i,a)}async isFinished(e,t=!1){let r=await this.queue.client,n=["completed","failed",e].map(e=>this.queue.toKey(e));return this.execCommand(r,"isFinished",n.concat([e,t?"1":""]))}async getState(e){let t=await this.queue.client,r=["completed","failed","delayed","active","wait","paused","waiting-children","prioritized"].map(e=>this.queue.toKey(e));return ef(this.queue.redisVersion,"6.0.6")?this.execCommand(t,"getState",r.concat([e])):this.execCommand(t,"getStateV2",r.concat([e]))}async changeDelay(e,t){let r=await this.queue.client,n=this.changeDelayArgs(e,t),i=await this.execCommand(r,"changeDelay",n);if(i<0)throw this.finishedErrors({code:i,jobId:e,command:"changeDelay",state:"delayed"})}changeDelayArgs(e,t){let r=Date.now();return[this.queue.keys.delayed,this.queue.keys.meta,this.queue.keys.marker,this.queue.keys.events].concat([t,JSON.stringify(r),e,this.queue.toKey(e)])}async changePriority(e,t=0,r=!1){let n=await this.queue.client,i=this.changePriorityArgs(e,t,r),a=await this.execCommand(n,"changePriority",i);if(a<0)throw this.finishedErrors({code:a,jobId:e,command:"changePriority"})}changePriorityArgs(e,t=0,r=!1){return[this.queue.keys.wait,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.prioritized,this.queue.keys.active,this.queue.keys.pc,this.queue.keys.marker].concat([t,this.queue.toKey(""),e,+!!r])}moveToDelayedArgs(e,t,r,n,i={}){let a=this.queue.keys;return[a.marker,a.active,a.prioritized,a.delayed,this.queue.toKey(e),a.events,a.meta,a.stalled].concat([this.queue.keys[""],t,e,r,n,i.skipAttempt?"1":"0",i.fieldsToUpdate?tU(es(i.fieldsToUpdate)):void 0])}moveToWaitingChildrenArgs(e,t,r){let n=Date.now(),i=eh(r.child);return["active","waiting-children",e,`${e}:dependencies`,`${e}:unsuccessful`,"stalled","events"].map(e=>this.queue.toKey(e)).concat([t,null!=i?i:"",JSON.stringify(n),e,this.queue.toKey("")])}isMaxedArgs(){let e=this.queue.keys;return[e.meta,e.active]}async isMaxed(){let e=await this.queue.client,t=this.isMaxedArgs();return!!await this.execCommand(e,"isMaxed",t)}async moveToDelayed(e,t,r,n="0",i={}){let a=await this.queue.client,s=this.moveToDelayedArgs(e,t,n,r,i),o=await this.execCommand(a,"moveToDelayed",s);if(o<0)throw this.finishedErrors({code:o,jobId:e,command:"moveToDelayed",state:"active"})}async moveToWaitingChildren(e,t,r={}){let n=await this.queue.client,i=this.moveToWaitingChildrenArgs(e,t,r),a=await this.execCommand(n,"moveToWaitingChildren",i);switch(a){case 0:return!0;case 1:return!1;default:throw this.finishedErrors({code:a,jobId:e,command:"moveToWaitingChildren",state:"active"})}}getRateLimitTtlArgs(e){return[this.queue.keys.limiter,this.queue.keys.meta].concat([null!=e?e:"0"])}async getRateLimitTtl(e){let t=await this.queue.client,r=this.getRateLimitTtlArgs(e);return this.execCommand(t,"getRateLimitTtl",r)}async cleanJobsInSet(e,t,r=0){let n=await this.queue.client;return this.execCommand(n,"cleanJobsInSet",[this.queue.toKey(e),this.queue.toKey("events"),this.queue.toKey("repeat"),this.queue.toKey(""),t,r,e])}getJobSchedulerArgs(e){return[this.queue.keys.repeat].concat([e])}async getJobScheduler(e){let t=await this.queue.client,r=this.getJobSchedulerArgs(e);return this.execCommand(t,"getJobScheduler",r)}retryJobArgs(e,t,r,n={}){return[this.queue.keys.active,this.queue.keys.wait,this.queue.keys.paused,this.queue.toKey(e),this.queue.keys.meta,this.queue.keys.events,this.queue.keys.delayed,this.queue.keys.prioritized,this.queue.keys.pc,this.queue.keys.marker,this.queue.keys.stalled].concat([this.queue.toKey(""),Date.now(),(t?"R":"L")+"PUSH",e,r,n.fieldsToUpdate?tU(es(n.fieldsToUpdate)):void 0])}async retryJob(e,t,r="0",n={}){let i=await this.queue.client,a=this.retryJobArgs(e,t,r,n),s=await this.execCommand(i,"retryJob",a);if(s<0)throw this.finishedErrors({code:s,jobId:e,command:"retryJob",state:"active"})}moveJobsToWaitArgs(e,t,r){return[this.queue.toKey(""),this.queue.keys.events,this.queue.toKey(e),this.queue.toKey("wait"),this.queue.toKey("paused"),this.queue.keys.meta,this.queue.keys.active,this.queue.keys.marker].concat([t,r,e])}async retryJobs(e="failed",t=1e3,r=new Date().getTime()){let n=await this.queue.client,i=this.moveJobsToWaitArgs(e,t,r);return this.execCommand(n,"moveJobsToWait",i)}async promoteJobs(e=1e3){let t=await this.queue.client,r=this.moveJobsToWaitArgs("delayed",e,Number.MAX_VALUE);return this.execCommand(t,"moveJobsToWait",r)}async reprocessJob(e,t,r={}){let n=await this.queue.client,i=[this.queue.toKey(e.id),this.queue.keys.events,this.queue.toKey(t),this.queue.keys.wait,this.queue.keys.meta,this.queue.keys.paused,this.queue.keys.active,this.queue.keys.marker],a=[e.id,(e.opts.lifo?"R":"L")+"PUSH","failed"===t?"failedReason":"returnvalue",t,r.resetAttemptsMade?"1":"0",r.resetAttemptsStarted?"1":"0"],s=await this.execCommand(n,"reprocessJob",i.concat(a));if(1!==s)throw this.finishedErrors({code:s,jobId:e.id,command:"reprocessJob",state:t})}async getMetrics(e,t=0,r=-1){let n=await this.queue.client,i=[this.queue.toKey(`metrics:${e}`),this.queue.toKey(`metrics:${e}:data`)];return await this.execCommand(n,"getMetrics",i.concat([t,r]))}async moveToActive(e,t,r){let n=this.queue.opts,i=this.queue.keys,a=[i.wait,i.active,i.prioritized,i.events,i.stalled,i.limiter,i.delayed,i.paused,i.meta,i.pc,i.marker],s=[i[""],Date.now(),tU({token:t,lockDuration:n.lockDuration,limiter:n.limiter,name:r})];return tW(await this.execCommand(e,"moveToActive",a.concat(s)))}async promote(e){let t=await this.queue.client,r=[this.queue.keys.delayed,this.queue.keys.wait,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.prioritized,this.queue.keys.active,this.queue.keys.pc,this.queue.keys.events,this.queue.keys.marker],n=[this.queue.toKey(""),e],i=await this.execCommand(t,"promote",r.concat(n));if(i<0)throw this.finishedErrors({code:i,jobId:e,command:"promote",state:"delayed"})}moveStalledJobsToWaitArgs(){let e=this.queue.opts;return[this.queue.keys.stalled,this.queue.keys.wait,this.queue.keys.active,this.queue.keys["stalled-check"],this.queue.keys.meta,this.queue.keys.paused,this.queue.keys.marker,this.queue.keys.events].concat([e.maxStalledCount,this.queue.toKey(""),Date.now(),e.stalledInterval])}async moveStalledJobsToWait(){let e=await this.queue.client,t=this.moveStalledJobsToWaitArgs();return this.execCommand(e,"moveStalledJobsToWait",t)}async moveJobFromActiveToWait(e,t="0"){let r=await this.queue.client,n=[this.queue.keys.active,this.queue.keys.wait,this.queue.keys.stalled,this.queue.keys.paused,this.queue.keys.meta,this.queue.keys.limiter,this.queue.keys.prioritized,this.queue.keys.marker,this.queue.keys.events],i=[e,t,this.queue.toKey(e)],a=await this.execCommand(r,"moveJobFromActiveToWait",n.concat(i));if(a<0)throw this.finishedErrors({code:a,jobId:e,command:"moveJobFromActiveToWait",state:"active"});return a}async obliterate(e){let t=await this.queue.client,r=[this.queue.keys.meta,this.queue.toKey("")],n=[e.count,e.force?"force":null],i=await this.execCommand(t,"obliterate",r.concat(n));if(i<0)switch(i){case -1:throw Error("Cannot obliterate non-paused queue");case -2:throw Error("Cannot obliterate queue with active jobs")}return i}async paginate(e,t){let r=await this.queue.client,n=[e],i=t.end>=0?t.end-t.start+1:1/0,a="0",s=0,o,l,u,d=[],c=[];do{let e=[t.start+d.length,t.end,a,s,5];t.fetchJobs&&e.push(1),[a,s,o,l,u]=await this.execCommand(r,"paginate",n.concat(e)),d=d.concat(o),u&&u.length&&(c=c.concat(u.map(ea)))}while("0"!=a&&d.length<i)if(!(d.length&&Array.isArray(d[0])))return{cursor:a,items:d.map(e=>({id:e})),total:l,jobs:c};{let e=[];for(let t=0;t<d.length;t++){let[r,n]=d[t];try{e.push({id:r,v:JSON.parse(n)})}catch(t){e.push({id:r,err:t.message})}}return{cursor:a,items:e,total:l,jobs:c}}}finishedErrors({code:e,jobId:t,parentKey:r,command:n,state:i}){let a;switch(e){case T.JobNotExist:a=Error(`Missing key for job ${t}. ${n}`);break;case T.JobLockNotExist:a=Error(`Missing lock for job ${t}. ${n}`);break;case T.JobNotInState:a=Error(`Job ${t} is not in the ${i} state. ${n}`);break;case T.JobPendingChildren:a=Error(`Job ${t} has pending dependencies. ${n}`);break;case T.ParentJobNotExist:a=Error(`Missing key for parent job ${r}. ${n}`);break;case T.JobLockMismatch:a=Error(`Lock mismatch for job ${t}. Cmd ${n} from ${i}`);break;case T.ParentJobCannotBeReplaced:a=Error(`The parent job ${r} cannot be replaced. ${n}`);break;case T.JobBelongsToJobScheduler:a=Error(`Job ${t} belongs to a job scheduler and cannot be removed directly. ${n}`);break;case T.JobHasFailedChildren:a=new eK(`Cannot complete job ${t} because it has at least one failed child. ${n}`);break;case T.SchedulerJobIdCollision:a=Error(`Cannot create job scheduler iteration - job ID already exists. ${n}`);break;case T.SchedulerJobSlotsBusy:a=Error(`Cannot create job scheduler iteration - current and next time slots already have jobs. ${n}`);break;default:a=Error(`Unknown code ${e} error for ${t}. ${n}`)}return a.code=e,a}}function tW(e){if(e){let t=[null,e[1],e[2],e[3]];return e[0]&&(t[0]=ea(e[0])),t}return[]}let tH=e=>new t$({keys:e.keys,client:e.client,get redisVersion(){return e.redisVersion},toKey:e.toKey,opts:e.opts,closing:e.closing}),tz=(0,eO.debuglog)("bull");class tX{constructor(e,t,r,n={},i){this.queue=e,this.name=t,this.data=r,this.opts=n,this.id=i,this.progress=0,this.returnvalue=null,this.stacktrace=null,this.delay=0,this.priority=0,this.attemptsStarted=0,this.attemptsMade=0,this.stalledCounter=0;const a=this.opts,{repeatJobKey:s}=a,o=eA(a,["repeatJobKey"]);this.opts=Object.assign({attempts:0},o),this.delay=this.opts.delay,this.priority=this.opts.priority||0,this.repeatJobKey=s,this.timestamp=n.timestamp?n.timestamp:Date.now(),this.opts.backoff=y.normalize(n.backoff),this.parentKey=eh(n.parent),n.parent&&(this.parent={id:n.parent.id,queueKey:n.parent.queue},n.failParentOnFailure&&(this.parent.fpof=!0),n.removeDependencyOnFailure&&(this.parent.rdof=!0),n.ignoreDependencyOnFailure&&(this.parent.idof=!0),n.continueParentOnFailure&&(this.parent.cpof=!0)),this.debounceId=n.debounce?n.debounce.id:void 0,this.deduplicationId=n.deduplication?n.deduplication.id:this.debounceId,this.toKey=e.toKey.bind(e),this.createScripts(),this.queueQualifiedName=e.qualifiedName}static async create(e,t,r,n){let i=await e.client,a=new this(e,t,r,n,n&&n.jobId);return a.id=await a.addJob(i,{parentKey:a.parentKey,parentDependenciesKey:a.parentKey?`${a.parentKey}:dependencies`:""}),a}static async createBulk(e,t){let r=await e.client,n=t.map(t=>{var r;return new this(e,t.name,t.data,t.opts,null==(r=t.opts)?void 0:r.jobId)}),i=r.pipeline();for(let e of n)e.addJob(i,{parentKey:e.parentKey,parentDependenciesKey:e.parentKey?`${e.parentKey}:dependencies`:""});let a=await i.exec();for(let e=0;e<a.length;++e){let[t,r]=a[e];if(t)throw t;n[e].id=r}return n}static fromJSON(e,t,r){let n=JSON.parse(t.data||"{}"),i=tX.optsFromJSON(t.opts),a=new this(e,t.name,n,i,t.id||r);return a.progress=JSON.parse(t.progress||"0"),a.delay=parseInt(t.delay),a.priority=parseInt(t.priority),a.timestamp=parseInt(t.timestamp),t.finishedOn&&(a.finishedOn=parseInt(t.finishedOn)),t.processedOn&&(a.processedOn=parseInt(t.processedOn)),t.rjk&&(a.repeatJobKey=t.rjk),t.deid&&(a.debounceId=t.deid,a.deduplicationId=t.deid),t.failedReason&&(a.failedReason=t.failedReason),a.attemptsStarted=parseInt(t.ats||"0"),a.attemptsMade=parseInt(t.attemptsMade||t.atm||"0"),a.stalledCounter=parseInt(t.stc||"0"),t.defa&&(a.deferredFailure=t.defa),a.stacktrace=function(e){if(!e)return[];let t=ei(JSON.parse,JSON,[e]);return t!==en&&t instanceof Array?t:[]}(t.stacktrace),"string"==typeof t.returnvalue&&(a.returnvalue=tQ(t.returnvalue)),t.parentKey&&(a.parentKey=t.parentKey),t.parent&&(a.parent=JSON.parse(t.parent)),t.pb&&(a.processedBy=t.pb),t.nrjid&&(a.nextRepeatableJobId=t.nrjid),a}createScripts(){this.scripts=tH(this.queue)}static optsFromJSON(e,t=eu){let r=Object.entries(JSON.parse(e||"{}")),n={};for(let e of r){let[r,i]=e;t[r]?n[t[r]]=i:"tm"===r?n.telemetry=Object.assign(Object.assign({},n.telemetry),{metadata:i}):"omc"===r?n.telemetry=Object.assign(Object.assign({},n.telemetry),{omitContext:i}):n[r]=i}return n}static async fromId(e,t){if(t){let r=await e.client,n=await r.hgetall(e.toKey(t));return!function(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(n)?this.fromJSON(e,n,t):void 0}}static addJobLog(e,t,r,n){return e.scripts.addLog(t,r,n)}toJSON(){let{queue:e,scripts:t}=this;return eA(this,["queue","scripts"])}asJSON(){var e={id:this.id,name:this.name,data:JSON.stringify(void 0===this.data?{}:this.data),opts:tX.optsAsJSON(this.opts),parent:this.parent?Object.assign({},this.parent):void 0,parentKey:this.parentKey,progress:this.progress,attemptsMade:this.attemptsMade,attemptsStarted:this.attemptsStarted,stalledCounter:this.stalledCounter,finishedOn:this.finishedOn,processedOn:this.processedOn,timestamp:this.timestamp,failedReason:JSON.stringify(this.failedReason),stacktrace:JSON.stringify(this.stacktrace),debounceId:this.debounceId,deduplicationId:this.deduplicationId,repeatJobKey:this.repeatJobKey,returnvalue:JSON.stringify(this.returnvalue),nrjid:this.nextRepeatableJobId};let t={};for(let r in e)void 0!==e[r]&&(t[r]=e[r]);return t}static optsAsJSON(e={},t=ed){let r=Object.entries(e),n={};for(let[e,i]of r)void 0!==i&&(e in t?n[t[e]]=i:"telemetry"===e?(void 0!==i.metadata&&(n.tm=i.metadata),void 0!==i.omitContext&&(n.omc=i.omitContext)):n[e]=i);return n}asJSONSandbox(){return Object.assign(Object.assign({},this.asJSON()),{queueName:this.queueName,queueQualifiedName:this.queueQualifiedName,prefix:this.prefix})}updateData(e){return this.data=e,this.scripts.updateData(this,e)}async updateProgress(e){this.progress=e,await this.scripts.updateProgress(this.id,e),this.queue.emit("progress",this,e)}async log(e){return tX.addJobLog(this.queue,this.id,e,this.opts.keepLogs)}async removeChildDependency(){return!!await this.scripts.removeChildDependency(this.id,this.parentKey)&&(this.parent=void 0,this.parentKey=void 0,!0)}async clearLogs(e){let t=await this.queue.client,r=this.toKey(this.id)+":logs";e?await t.ltrim(r,-e,-1):await t.del(r)}async remove({removeChildren:e=!0}={}){await this.queue.waitUntilReady();let t=this.queue;if(await this.scripts.remove(this.id,e))t.emit("removed",this);else throw Error(`Job ${this.id} could not be removed because it is locked by another worker`)}async removeUnprocessedChildren(){let e=this.id;await this.scripts.removeUnprocessedChildren(e)}extendLock(e,t){return this.scripts.extendLock(this.id,e,t)}async moveToCompleted(e,t,r=!0){return this.queue.trace(A.INTERNAL,"complete",this.queue.name,async(n,i)=>{var a,s;null==(s=null==(a=this.opts)?void 0:a.telemetry)||s.omitContext,await this.queue.waitUntilReady(),this.returnvalue=e||void 0;let o=ei(JSON.stringify,JSON,[e]);if(o===en)throw en.value;let l=this.scripts.moveToCompletedArgs(this,o,this.opts.removeOnComplete,t,r),u=await this.scripts.moveToFinished(this.id,l);return this.finishedOn=l[this.scripts.moveToFinishedKeys.length+1],this.attemptsMade+=1,u})}moveToWait(e){return this.scripts.moveJobFromActiveToWait(this.id,e)}async shouldRetryJob(e){if(!(this.attemptsMade+1<this.opts.attempts)||this.discarded||e instanceof eK||"UnrecoverableError"==e.name)return[!1,0];{let t=this.queue.opts,r=await y.calculate(this.opts.backoff,this.attemptsMade+1,e,this,t.settings&&t.settings.backoffStrategy);return[-1!=r,-1==r?0:r]}}async moveToFailed(e,t,r=!1){this.failedReason=null==e?void 0:e.message;let[n,i]=await this.shouldRetryJob(e);return this.queue.trace(A.INTERNAL,this.getSpanOperation(n,i),this.queue.name,async(a,s)=>{var o,l;let u,d,c;(null==(l=null==(o=this.opts)?void 0:o.telemetry)?void 0:l.omitContext)||!s||(u=s),this.updateStacktrace(e);let h={failedReason:this.failedReason,stacktrace:JSON.stringify(this.stacktrace),tm:u};if(n)d=i?await this.scripts.moveToDelayed(this.id,Date.now(),i,t,{fieldsToUpdate:h}):await this.scripts.retryJob(this.id,this.opts.lifo,t,{fieldsToUpdate:h});else{let e=this.scripts.moveToFailedArgs(this,this.failedReason,this.opts.removeOnFail,t,r,h);d=await this.scripts.moveToFinished(this.id,e),c=e[this.scripts.moveToFinishedKeys.length+1]}return c&&"number"==typeof c&&(this.finishedOn=c),i&&"number"==typeof i&&(this.delay=i),this.attemptsMade+=1,d})}getSpanOperation(e,t){return e?t?"delay":"retry":"fail"}isCompleted(){return this.isInZSet("completed")}isFailed(){return this.isInZSet("failed")}isDelayed(){return this.isInZSet("delayed")}isWaitingChildren(){return this.isInZSet("waiting-children")}isActive(){return this.isInList("active")}async isWaiting(){return await this.isInList("wait")||await this.isInList("paused")}get queueName(){return this.queue.name}get prefix(){return this.queue.opts.prefix}getState(){return this.scripts.getState(this.id)}async changeDelay(e){await this.scripts.changeDelay(this.id,e),this.delay=e}async changePriority(e){await this.scripts.changePriority(this.id,e.priority,e.lifo),this.priority=e.priority||0}async getChildrenValues(){let e=await this.queue.client,t=await e.hgetall(this.toKey(`${this.id}:processed`));if(t)return ey(t)}async getIgnoredChildrenFailures(){return(await this.queue.client).hgetall(this.toKey(`${this.id}:failed`))}async getFailedChildrenValues(){return(await this.queue.client).hgetall(this.toKey(`${this.id}:failed`))}async getDependencies(e={}){let t=(await this.queue.client).multi();if(e.processed||e.unprocessed||e.ignored||e.failed){let r,n,i,a,s,o,l,u,d={cursor:0,count:20},c=[];if(e.processed){c.push("processed");let r=Object.assign(Object.assign({},d),e.processed);t.hscan(this.toKey(`${this.id}:processed`),r.cursor,"COUNT",r.count)}if(e.unprocessed){c.push("unprocessed");let r=Object.assign(Object.assign({},d),e.unprocessed);t.sscan(this.toKey(`${this.id}:dependencies`),r.cursor,"COUNT",r.count)}if(e.ignored){c.push("ignored");let r=Object.assign(Object.assign({},d),e.ignored);t.hscan(this.toKey(`${this.id}:failed`),r.cursor,"COUNT",r.count)}if(e.failed){c.push("failed");let n=Object.assign(Object.assign({},d),e.failed);r=n.cursor+n.count,t.zrange(this.toKey(`${this.id}:unsuccessful`),n.cursor,n.count-1)}let h=await t.exec();return c.forEach((e,t)=>{switch(e){case"processed":{n=h[t][1][0];let e=h[t][1][1],r={};for(let t=0;t<e.length;++t)t%2&&(r[e[t-1]]=JSON.parse(e[t]));i=r;break}case"failed":o=h[t][1];break;case"ignored":{l=h[t][1][0];let e=h[t][1][1],r={};for(let t=0;t<e.length;++t)t%2&&(r[e[t-1]]=e[t]);u=r;break}case"unprocessed":a=h[t][1][0],s=h[t][1][1]}}),Object.assign(Object.assign(Object.assign(Object.assign({},n?{processed:i,nextProcessedCursor:Number(n)}:{}),l?{ignored:u,nextIgnoredCursor:Number(l)}:{}),r?{failed:o,nextFailedCursor:r}:{}),a?{unprocessed:s,nextUnprocessedCursor:Number(a)}:{})}{t.hgetall(this.toKey(`${this.id}:processed`)),t.smembers(this.toKey(`${this.id}:dependencies`)),t.hgetall(this.toKey(`${this.id}:failed`)),t.zrange(this.toKey(`${this.id}:unsuccessful`),0,-1);let[[e,r],[n,i],[a,s],[o,l]]=await t.exec();return{processed:ey(r),unprocessed:i,failed:l,ignored:s}}}async getDependenciesCount(e={}){let t=[];Object.entries(e).forEach(([e,r])=>{r&&t.push(e)});let r=t.length?t:["processed","unprocessed","ignored","failed"],n=await this.scripts.getDependencyCounts(this.id,r),i={};return n.forEach((e,t)=>{i[`${r[t]}`]=e||0}),i}async waitUntilFinished(e,t){await this.queue.waitUntilReady();let r=this.id;return new Promise(async(n,i)=>{let a;function s(e){d(),n(e.returnvalue)}function o(e){d(),i(Error(e.failedReason||e))}t&&(a=setTimeout(()=>o(`Job wait ${this.name} timed out before finishing, no finish notification arrived after ${t}ms (id=${r})`),t));let l=`completed:${r}`,u=`failed:${r}`;e.on(l,s),e.on(u,o),this.queue.on("closing",o);let d=()=>{clearInterval(a),e.removeListener(l,s),e.removeListener(u,o),this.queue.removeListener("closing",o)};await e.waitUntilReady();let[c,h]=await this.scripts.isFinished(r,!0);0!=c&&(-1==c||2==c?o({failedReason:h}):s({returnvalue:tQ(h)}))})}async moveToDelayed(e,t){let r=Date.now(),n=e-r,i=n>0?n:0,a=await this.scripts.moveToDelayed(this.id,r,i,t,{skipAttempt:!0});return this.delay=i,a}async moveToWaitingChildren(e,t={}){return await this.scripts.moveToWaitingChildren(this.id,e,t)}async promote(){let e=this.id;await this.scripts.promote(e),this.delay=0}async retry(e="failed",t={}){await this.scripts.reprocessJob(this,e,t),this.failedReason=null,this.finishedOn=null,this.processedOn=null,this.returnvalue=null,t.resetAttemptsMade&&(this.attemptsMade=0),t.resetAttemptsStarted&&(this.attemptsStarted=0)}discard(){this.discarded=!0}async isInZSet(e){let t=await this.queue.client;return null!==await t.zscore(this.queue.toKey(e),this.id)}async isInList(e){return this.scripts.isJobInList(this.queue.toKey(e),this.id)}addJob(e,t){let r=this.asJSON();return this.validateOptions(r),this.scripts.addJob(e,r,r.opts,this.id,t)}async removeDeduplicationKey(){return!!this.deduplicationId&&await this.scripts.removeDeduplicationKey(this.deduplicationId,this.id)>0}validateOptions(e){var t,r,n,i,a,s,o,l,u;if(this.opts.sizeLimit&&(u=e.data,Buffer.byteLength(u,"utf8")>this.opts.sizeLimit))throw Error(`The size of job ${this.name} exceeds the limit ${this.opts.sizeLimit} bytes`);if(this.opts.delay&&this.opts.repeat&&!(null==(t=this.opts.repeat)?void 0:t.count))throw Error("Delay and repeat options could not be used together");let d=["removeDependencyOnFailure","failParentOnFailure","continueParentOnFailure","ignoreDependencyOnFailure"].filter(e=>this.opts[e]);if(d.length>1){let e=d.join(", ");throw Error(`The following options cannot be used together: ${e}`)}if(null==(r=this.opts)?void 0:r.jobId){if(`${parseInt(this.opts.jobId,10)}`===(null==(n=this.opts)?void 0:n.jobId))throw Error("Custom Id cannot be integers");if((null==(i=this.opts)?void 0:i.jobId.includes(":"))&&(null==(s=null==(a=this.opts)?void 0:a.jobId)?void 0:s.split(":").length)!==3)throw Error("Custom Id cannot contain :")}if(this.opts.priority){if(Math.trunc(this.opts.priority)!==this.opts.priority)throw Error("Priority should not be float");if(this.opts.priority>2097152)throw Error("Priority should be between 0 and 2097152")}if(this.opts.deduplication&&!(null==(o=this.opts.deduplication)?void 0:o.id))throw Error("Deduplication id must be provided");if(this.opts.debounce&&!(null==(l=this.opts.debounce)?void 0:l.id))throw Error("Debounce id must be provided");if("object"==typeof this.opts.backoff&&"number"==typeof this.opts.backoff.jitter&&(this.opts.backoff.jitter<0||this.opts.backoff.jitter>1))throw Error("Jitter should be between 0 and 1")}updateStacktrace(e){this.stacktrace=this.stacktrace||[],(null==e?void 0:e.stack)&&(this.stacktrace.push(e.stack),0===this.opts.stackTraceLimit?this.stacktrace=[]:this.opts.stackTraceLimit&&(this.stacktrace=this.stacktrace.slice(-this.opts.stackTraceLimit)))}}function tQ(e){let t=ei(JSON.parse,JSON,[e]);if(t!==en)return t;tz("corrupted returnvalue: "+e,t)}class tZ{constructor(e="bull"){this.prefix=e}getKeys(e){let t={};return["","active","wait","waiting-children","paused","id","delayed","prioritized","stalled-check","completed","failed","stalled","repeat","limiter","meta","events","pc","marker","de"].forEach(r=>{t[r]=this.toKey(e,r)}),t}toKey(e,t){return`${this.getQueueQualifiedName(e)}:${t}`}getQueueQualifiedName(e){return`${this.prefix}:${e}`}}var t0=$;let t1={name:"addDelayedJob",content:`--[[
  Adds a delayed job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - computes timestamp.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
    Input:
      KEYS[1] 'marker',
      KEYS[2] 'meta'
      KEYS[3] 'id'
      KEYS[4] 'delayed'
      KEYS[5] 'completed'
      KEYS[6] events stream key
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (use custom instead of one generated automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  parent dependencies key.
            [7]  parent? {id, queueKey}
            [8]  repeat job key
            [9] deduplication key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]]
local metaKey = KEYS[2]
local idKey = KEYS[3]
local delayedKey = KEYS[4]
local completedKey = KEYS[5]
local eventsKey = KEYS[6]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local parentKey = args[5]
local parent = args[7]
local repeatJobKey = args[8]
local deduplicationKey = args[9]
local parentData
-- Includes
--[[
  Adds a delayed job to the queue by doing the following:
    - Creates a new job key with the job data.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
local function addDelayedJob(jobId, delayedKey, eventsKey, timestamp,
  maxEvents, markerKey, delay)
  local score, delayedTimestamp = getDelayedScore(delayedKey, timestamp, tonumber(delay))
  rcall("ZADD", delayedKey, score, jobId)
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  addDelayMarkerIfNeeded(markerKey, delayedKey)
end
--[[
  Function to debounce a job.
]]
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local function removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents, currentDeduplicatedJobId,
    jobId, deduplicationId, prefix)
    if rcall("ZREM", delayedKey, currentDeduplicatedJobId) > 0 then
        removeJobKeys(prefix .. currentDeduplicatedJobId)
        rcall("XADD", eventsKey, "*", "event", "removed", "jobId", currentDeduplicatedJobId,
            "prev", "delayed")
        -- TODO remove debounced event in next breaking change
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
            jobId, "debounceId", deduplicationId)
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
            jobId, "deduplicationId", deduplicationId, "deduplicatedJobId", currentDeduplicatedJobId)
        return true
    end
    return false
end
local function deduplicateJob(deduplicationOpts, jobId, delayedKey, deduplicationKey, eventsKey, maxEvents,
    prefix)
    local deduplicationId = deduplicationOpts and deduplicationOpts['id']
    if deduplicationId then
        local ttl = deduplicationOpts['ttl']
        if deduplicationOpts['replace'] then
            if ttl and ttl > 0 then
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        if deduplicationOpts['extend'] then
                            rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                        else
                            rcall('SET', deduplicationKey, jobId, 'KEEPTTL')
                        end
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                    return
                end
            else
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        rcall('SET', deduplicationKey, jobId)
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId)
                    return
                end
            end
        else
            local deduplicationKeyExists
            if ttl and ttl > 0 then
                if deduplicationOpts['extend'] then
                    local currentDebounceJobId = rcall('GET', deduplicationKey)
                    if currentDebounceJobId then
                        rcall('SET', deduplicationKey, currentDebounceJobId, 'PX', ttl)
                        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced",
                            "jobId", currentDebounceJobId, "debounceId", deduplicationId)
                        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
                            currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
                        return currentDebounceJobId
                    else
                        rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                        return
                    end
                else
                    deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'PX', ttl, 'NX')
                end
            else
                deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'NX')
            end
            if deduplicationKeyExists then
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                -- TODO remove debounced event in next breaking change
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
                    currentDebounceJobId, "debounceId", deduplicationId)
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
                    currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
                return currentDebounceJobId
            end
        end
    end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey or existedParentKey == currentParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", idKey)
local maxEvents = getOrSetMaxEvents(metaKey)
local opts = cmsgpack.unpack(ARGV[3])
local parentDependenciesKey = args[6]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, completedKey, eventsKey,
            maxEvents, timestamp)
    end
end
local deduplicationJobId = deduplicateJob(opts['de'], jobId, delayedKey, deduplicationKey,
  eventsKey, maxEvents, args[1])
if deduplicationJobId then
  return deduplicationJobId
end
local delay, priority = storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2],
    opts, timestamp, parentKey, parentData, repeatJobKey)
addDelayedJob(jobId, delayedKey, eventsKey, timestamp, maxEvents, KEYS[1], delay)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,keys:6};e.s(["addDelayedJob",0,t1],113441);let t2={name:"addJobScheduler",content:`--[[
  Adds a job scheduler, i.e. a job factory that creates jobs based on a given schedule (repeat options).
    Input:
      KEYS[1]  'repeat' key
      KEYS[2]  'delayed' key
      KEYS[3]  'wait' key
      KEYS[4]  'paused' key
      KEYS[5]  'meta' key
      KEYS[6]  'prioritized' key
      KEYS[7]  'marker' key
      KEYS[8]  'id' key
      KEYS[9]  'events' key
      KEYS[10] 'pc' priority counter
      KEYS[11] 'active' key
      ARGV[1] next milliseconds
      ARGV[2] msgpacked options
            [1]  name
            [2]  tz?
            [3]  pattern?
            [4]  endDate?
            [5]  every?
      ARGV[3] jobs scheduler id
      ARGV[4] Json stringified template data
      ARGV[5] mspacked template opts
      ARGV[6] msgpacked delayed opts
      ARGV[7] timestamp
      ARGV[8] prefix key
      ARGV[9] producer key
      Output:
        repeatableKey  - OK
]] local rcall = redis.call
local repeatKey = KEYS[1]
local delayedKey = KEYS[2]
local waitKey = KEYS[3]
local pausedKey = KEYS[4]
local metaKey = KEYS[5]
local prioritizedKey = KEYS[6]
local eventsKey = KEYS[9]
local nextMillis = ARGV[1]
local jobSchedulerId = ARGV[3]
local templateOpts = cmsgpack.unpack(ARGV[5])
local now = tonumber(ARGV[7])
local prefixKey = ARGV[8]
local jobOpts = cmsgpack.unpack(ARGV[6])
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Adds a delayed job to the queue by doing the following:
    - Creates a new job key with the job data.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
local function addDelayedJob(jobId, delayedKey, eventsKey, timestamp,
  maxEvents, markerKey, delay)
  local score, delayedTimestamp = getDelayedScore(delayedKey, timestamp, tonumber(delay))
  rcall("ZADD", delayedKey, score, jobId)
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  addDelayMarkerIfNeeded(markerKey, delayedKey)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
  return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
local function addJobFromScheduler(jobKey, jobId, opts, waitKey, pausedKey, activeKey, metaKey, 
  prioritizedKey, priorityCounter, delayedKey, markerKey, eventsKey, name, maxEvents, timestamp,
  data, jobSchedulerId, repeatDelay)
  opts['delay'] = repeatDelay
  opts['jobId'] = jobId
  local delay, priority = storeJob(eventsKey, jobKey, jobId, name, data,
    opts, timestamp, nil, nil, jobSchedulerId)
  if delay ~= 0 then
    addDelayedJob(jobId, delayedKey, eventsKey, timestamp, maxEvents, markerKey, delay)
  else
    local target, isPausedOrMaxed = getTargetQueueList(metaKey, activeKey, waitKey, pausedKey)
    -- Standard or priority add
    if priority == 0 then
      local pushCmd = opts['lifo'] and 'RPUSH' or 'LPUSH'
      addJobInTargetList(target, markerKey, pushCmd, isPausedOrMaxed, jobId)
    else
      -- Priority add
      addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounter, isPausedOrMaxed)
    end
    -- Emit waiting event
    rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents,  "*", "event", "waiting", "jobId", jobId)
  end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
--[[
  Function to store a job scheduler
]]
local function storeJobScheduler(schedulerId, schedulerKey, repeatKey, nextMillis, opts,
  templateData, templateOpts)
  rcall("ZADD", repeatKey, nextMillis, schedulerId)
  local optionalValues = {}
  if opts['tz'] then
    table.insert(optionalValues, "tz")
    table.insert(optionalValues, opts['tz'])
  end
  if opts['limit'] then
    table.insert(optionalValues, "limit")
    table.insert(optionalValues, opts['limit'])
  end
  if opts['pattern'] then
    table.insert(optionalValues, "pattern")
    table.insert(optionalValues, opts['pattern'])
  end
  if opts['startDate'] then
    table.insert(optionalValues, "startDate")
    table.insert(optionalValues, opts['startDate'])
  end
  if opts['endDate'] then
    table.insert(optionalValues, "endDate")
    table.insert(optionalValues, opts['endDate'])
  end
  if opts['every'] then
    table.insert(optionalValues, "every")
    table.insert(optionalValues, opts['every'])
  end
  if opts['offset'] then
    table.insert(optionalValues, "offset")
    table.insert(optionalValues, opts['offset'])
  else
    local offset = rcall("HGET", schedulerKey, "offset")
    if offset then
      table.insert(optionalValues, "offset")
      table.insert(optionalValues, tonumber(offset))
    end
  end
  local jsonTemplateOpts = cjson.encode(templateOpts)
  if jsonTemplateOpts and jsonTemplateOpts ~= '{}' then
    table.insert(optionalValues, "opts")
    table.insert(optionalValues, jsonTemplateOpts)
  end
  if templateData and templateData ~= '{}' then
    table.insert(optionalValues, "data")
    table.insert(optionalValues, templateData)
  end
  table.insert(optionalValues, "ic")
  table.insert(optionalValues, rcall("HGET", schedulerKey, "ic") or 1)
  rcall("DEL", schedulerKey) -- remove all attributes and then re-insert new ones
  rcall("HMSET", schedulerKey, "name", opts['name'], unpack(optionalValues))
end
local function getJobSchedulerEveryNextMillis(prevMillis, every, now, offset, startDate)
    local nextMillis
    if not prevMillis then
        if startDate then
            -- Assuming startDate is passed as milliseconds from JavaScript
            nextMillis = tonumber(startDate)
            nextMillis = nextMillis > now and nextMillis or now
        else
            nextMillis = now
        end
    else
        nextMillis = prevMillis + every
        -- check if we may have missed some iterations
        if nextMillis < now then
            nextMillis = math.floor(now / every) * every + every + (offset or 0)
        end
    end
    if not offset or offset == 0 then
        local timeSlot = math.floor(nextMillis / every) * every;
        offset = nextMillis - timeSlot;
    end
    -- Return a tuple nextMillis, offset
    return math.floor(nextMillis), math.floor(offset)
end
-- If we are overriding a repeatable job we must delete the delayed job for
-- the next iteration.
local schedulerKey = repeatKey .. ":" .. jobSchedulerId
local maxEvents = getOrSetMaxEvents(metaKey)
local templateData = ARGV[4]
local prevMillis = rcall("ZSCORE", repeatKey, jobSchedulerId)
if prevMillis then
    prevMillis = tonumber(prevMillis)
end
local schedulerOpts = cmsgpack.unpack(ARGV[2])
local every = schedulerOpts['every']
-- For backwards compatibility we also check the offset from the job itself.
-- could be removed in future major versions.
local jobOffset = jobOpts['repeat'] and jobOpts['repeat']['offset'] or 0
local offset = schedulerOpts['offset'] or jobOffset or 0
local newOffset = offset
local updatedEvery = false
if every then
    -- if we changed the 'every' value we need to reset millis to nil
    local millis = prevMillis
    if prevMillis then
        local prevEvery = tonumber(rcall("HGET", schedulerKey, "every"))
        if prevEvery ~= every then
            millis = nil
            updatedEvery = true
        end
    end
    local startDate = schedulerOpts['startDate']
    nextMillis, newOffset = getJobSchedulerEveryNextMillis(millis, every, now, offset, startDate)
end
local function removeJobFromScheduler(prefixKey, delayedKey, prioritizedKey, waitKey, pausedKey, jobId, metaKey,
    eventsKey)
    if rcall("ZSCORE", delayedKey, jobId) then
        removeJob(jobId, true, prefixKey, true --[[remove debounce key]] )
        rcall("ZREM", delayedKey, jobId)
        return true
    elseif rcall("ZSCORE", prioritizedKey, jobId) then
        removeJob(jobId, true, prefixKey, true --[[remove debounce key]] )
        rcall("ZREM", prioritizedKey, jobId)
        return true
    else
        local pausedOrWaitKey = waitKey
        if isQueuePaused(metaKey) then
            pausedOrWaitKey = pausedKey
        end
        if rcall("LREM", pausedOrWaitKey, 1, jobId) > 0 then
            removeJob(jobId, true, prefixKey, true --[[remove debounce key]] )
            return true
        end
    end
    return false
end
local removedPrevJob = false
if prevMillis then
    local currentJobId = "repeat:" .. jobSchedulerId .. ":" .. prevMillis
    local currentJobKey = schedulerKey .. ":" .. prevMillis
    -- In theory it should always exist the currentJobKey if there is a prevMillis unless something has
    -- gone really wrong.
    if rcall("EXISTS", currentJobKey) == 1 then
        removedPrevJob = removeJobFromScheduler(prefixKey, delayedKey, prioritizedKey, waitKey, pausedKey, currentJobId,
            metaKey, eventsKey)
    end
end
if removedPrevJob then
    -- The jobs has been removed and we want to replace it, so lets use the same millis.
    if every and not updatedEvery then
        nextMillis = prevMillis
    end
else
    -- Special case where no job was removed, and we need to add the next iteration.
    schedulerOpts['offset'] = newOffset
end
-- Check for job ID collision with existing jobs (in any state)
local jobId = "repeat:" .. jobSchedulerId .. ":" .. nextMillis
local jobKey = prefixKey .. jobId
-- If there's already a job with this ID, in a state 
-- that is not updatable (active, completed, failed) we must 
-- handle the collision
local hasCollision = false
if rcall("EXISTS", jobKey) == 1 then
    if every then
        -- For 'every' case: try next time slot to avoid collision
        local nextSlotMillis = nextMillis + every
        local nextSlotJobId = "repeat:" .. jobSchedulerId .. ":" .. nextSlotMillis
        local nextSlotJobKey = prefixKey .. nextSlotJobId
        if rcall("EXISTS", nextSlotJobKey) == 0 then
            -- Next slot is free, use it
            nextMillis = nextSlotMillis
            jobId = nextSlotJobId
        else
            -- Next slot also has a job, return error code
            return -11 -- SchedulerJobSlotsBusy
        end
    else
        hasCollision = true
    end
end
local delay = nextMillis - now
-- Fast Clamp delay to minimum of 0
if delay < 0 then
    delay = 0
end
local nextJobKey = schedulerKey .. ":" .. nextMillis
if not hasCollision or removedPrevJob then
    -- jobId already calculated above during collision check
    storeJobScheduler(jobSchedulerId, schedulerKey, repeatKey, nextMillis, schedulerOpts, templateData, templateOpts)
    rcall("INCR", KEYS[8])
    addJobFromScheduler(nextJobKey, jobId, jobOpts, waitKey, pausedKey, KEYS[11], metaKey, prioritizedKey, KEYS[10],
        delayedKey, KEYS[7], eventsKey, schedulerOpts['name'], maxEvents, now, templateData, jobSchedulerId, delay)
elseif hasCollision then
    -- For 'pattern' case: return error code
    return -10 -- SchedulerJobIdCollision
end
if ARGV[9] ~= "" then
    rcall("HSET", ARGV[9], "nrjid", jobId)
end
return {jobId .. "", delay}
`,keys:11};e.s(["addJobScheduler",0,t2],112429);let t3={name:"addLog",content:`--[[
  Add job log
  Input:
    KEYS[1] job id key
    KEYS[2] job logs key
    ARGV[1] id
    ARGV[2] log
    ARGV[3] keepLogs
  Output:
    -1 - Missing job.
]]
local rcall = redis.call
if rcall("EXISTS", KEYS[1]) == 1 then -- // Make sure job exists
  local logCount = rcall("RPUSH", KEYS[2], ARGV[2])
  if ARGV[3] ~= '' then
    local keepLogs = tonumber(ARGV[3])
    rcall("LTRIM", KEYS[2], -keepLogs, -1)
    return math.min(keepLogs, logCount)
  end
  return logCount
else
  return -1
end
`,keys:2};e.s(["addLog",0,t3],29456);let t4={name:"addParentJob",content:`--[[
  Adds a parent job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - adds the job to the waiting-children zset
    Input:
      KEYS[1] 'meta'
      KEYS[2] 'id'
      KEYS[3] 'delayed'
      KEYS[4] 'waiting-children'
      KEYS[5] 'completed'
      KEYS[6] events stream key
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (will not generate one automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  parent dependencies key.
            [7]  parent? {id, queueKey}
            [8]  repeat job key
            [9] deduplication key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]]
local metaKey = KEYS[1]
local idKey = KEYS[2]
local completedKey = KEYS[5]
local eventsKey = KEYS[6]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local opts = cmsgpack.unpack(ARGV[3])
local parentKey = args[5]
local parent = args[7]
local repeatJobKey = args[8]
local deduplicationKey = args[9]
local parentData
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey or existedParentKey == currentParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", idKey)
local maxEvents = getOrSetMaxEvents(metaKey)
local parentDependenciesKey = args[6]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, completedKey, eventsKey,
            maxEvents, timestamp)
    end
end
-- Store the job.
storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2], opts, timestamp,
         parentKey, parentData, repeatJobKey)
local waitChildrenKey = KEYS[4]
rcall("ZADD", waitChildrenKey, timestamp, jobId)
rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
      "waiting-children", "jobId", jobId)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,keys:6};e.s(["addParentJob",0,t4],495007);let t6={name:"addPrioritizedJob",content:`--[[
  Adds a priotitized job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - Adds the job to the "added" list so that workers gets notified.
    Input:
      KEYS[1] 'marker',
      KEYS[2] 'meta'
      KEYS[3] 'id'
      KEYS[4] 'prioritized'
      KEYS[5] 'delayed'
      KEYS[6] 'completed'
      KEYS[7] 'active'
      KEYS[8] events stream key
      KEYS[9] 'pc' priority counter
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (will not generate one automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  parent dependencies key.
            [7]  parent? {id, queueKey}
            [8]  repeat job key
            [9] deduplication key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]] 
local metaKey = KEYS[2]
local idKey = KEYS[3]
local priorityKey = KEYS[4]
local completedKey = KEYS[6]
local activeKey = KEYS[7]
local eventsKey = KEYS[8]
local priorityCounterKey = KEYS[9]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local opts = cmsgpack.unpack(ARGV[3])
local parentKey = args[5]
local parent = args[7]
local repeatJobKey = args[8]
local deduplicationKey = args[9]
local parentData
-- Includes
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to debounce a job.
]]
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local function removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents, currentDeduplicatedJobId,
    jobId, deduplicationId, prefix)
    if rcall("ZREM", delayedKey, currentDeduplicatedJobId) > 0 then
        removeJobKeys(prefix .. currentDeduplicatedJobId)
        rcall("XADD", eventsKey, "*", "event", "removed", "jobId", currentDeduplicatedJobId,
            "prev", "delayed")
        -- TODO remove debounced event in next breaking change
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
            jobId, "debounceId", deduplicationId)
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
            jobId, "deduplicationId", deduplicationId, "deduplicatedJobId", currentDeduplicatedJobId)
        return true
    end
    return false
end
local function deduplicateJob(deduplicationOpts, jobId, delayedKey, deduplicationKey, eventsKey, maxEvents,
    prefix)
    local deduplicationId = deduplicationOpts and deduplicationOpts['id']
    if deduplicationId then
        local ttl = deduplicationOpts['ttl']
        if deduplicationOpts['replace'] then
            if ttl and ttl > 0 then
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        if deduplicationOpts['extend'] then
                            rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                        else
                            rcall('SET', deduplicationKey, jobId, 'KEEPTTL')
                        end
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                    return
                end
            else
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        rcall('SET', deduplicationKey, jobId)
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId)
                    return
                end
            end
        else
            local deduplicationKeyExists
            if ttl and ttl > 0 then
                if deduplicationOpts['extend'] then
                    local currentDebounceJobId = rcall('GET', deduplicationKey)
                    if currentDebounceJobId then
                        rcall('SET', deduplicationKey, currentDebounceJobId, 'PX', ttl)
                        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced",
                            "jobId", currentDebounceJobId, "debounceId", deduplicationId)
                        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
                            currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
                        return currentDebounceJobId
                    else
                        rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                        return
                    end
                else
                    deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'PX', ttl, 'NX')
                end
            else
                deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'NX')
            end
            if deduplicationKeyExists then
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                -- TODO remove debounced event in next breaking change
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
                    currentDebounceJobId, "debounceId", deduplicationId)
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
                    currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
                return currentDebounceJobId
            end
        end
    end
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey or existedParentKey == currentParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", idKey)
local maxEvents = getOrSetMaxEvents(metaKey)
local parentDependenciesKey = args[6]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, completedKey, eventsKey,
            maxEvents, timestamp)
    end
end
local deduplicationJobId = deduplicateJob(opts['de'], jobId, KEYS[5],
  deduplicationKey, eventsKey, maxEvents, args[1])
if deduplicationJobId then
  return deduplicationJobId
end
-- Store the job.
local delay, priority = storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2],
                                 opts, timestamp, parentKey, parentData,
                                 repeatJobKey)
-- Add the job to the prioritized set
local isPausedOrMaxed = isQueuePausedOrMaxed(metaKey, activeKey)
addJobWithPriority( KEYS[1], priorityKey, priority, jobId, priorityCounterKey, isPausedOrMaxed)
-- Emit waiting event
rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "waiting",
      "jobId", jobId)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,keys:9};e.s(["addPrioritizedJob",0,t6],975418);let t5={name:"addRepeatableJob",content:`--[[
  Adds a repeatable job
    Input:
      KEYS[1] 'repeat' key
      KEYS[2] 'delayed' key
      ARGV[1] next milliseconds
      ARGV[2] msgpacked options
            [1]  name
            [2]  tz?
            [3]  pattern?
            [4]  endDate?
            [5]  every?
      ARGV[3] legacy custom key TODO: remove this logic in next breaking change
      ARGV[4] custom key
      ARGV[5] prefix key
      Output:
        repeatableKey  - OK
]]
local rcall = redis.call
local repeatKey = KEYS[1]
local delayedKey = KEYS[2]
local nextMillis = ARGV[1]
local legacyCustomKey = ARGV[3]
local customKey = ARGV[4]
local prefixKey = ARGV[5]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
local function storeRepeatableJob(repeatKey, customKey, nextMillis, rawOpts)
  rcall("ZADD", repeatKey, nextMillis, customKey)
  local opts = cmsgpack.unpack(rawOpts)
  local optionalValues = {}
  if opts['tz'] then
    table.insert(optionalValues, "tz")
    table.insert(optionalValues, opts['tz'])
  end
  if opts['pattern'] then
    table.insert(optionalValues, "pattern")
    table.insert(optionalValues, opts['pattern'])
  end
  if opts['endDate'] then
    table.insert(optionalValues, "endDate")
    table.insert(optionalValues, opts['endDate'])
  end
  if opts['every'] then
    table.insert(optionalValues, "every")
    table.insert(optionalValues, opts['every'])
  end
  rcall("HMSET", repeatKey .. ":" .. customKey, "name", opts['name'],
    unpack(optionalValues))
  return customKey
end
-- If we are overriding a repeatable job we must delete the delayed job for
-- the next iteration.
local prevMillis = rcall("ZSCORE", repeatKey, customKey)
if prevMillis then
  local delayedJobId =  "repeat:" .. customKey .. ":" .. prevMillis
  local nextDelayedJobId =  repeatKey .. ":" .. customKey .. ":" .. nextMillis
  if rcall("ZSCORE", delayedKey, delayedJobId)
   and rcall("EXISTS", nextDelayedJobId) ~= 1 then
    removeJob(delayedJobId, true, prefixKey, true --[[remove debounce key]])
    rcall("ZREM", delayedKey, delayedJobId)
  end
end
-- Keep backwards compatibility with old repeatable jobs (<= 3.0.0)
if rcall("ZSCORE", repeatKey, legacyCustomKey) ~= false then
  return storeRepeatableJob(repeatKey, legacyCustomKey, nextMillis, ARGV[2])
end
return storeRepeatableJob(repeatKey, customKey, nextMillis, ARGV[2])
`,keys:2};e.s(["addRepeatableJob",0,t5],963190);let t9={name:"addStandardJob",content:`--[[
  Adds a job to the queue by doing the following:
    - Increases the job counter if needed.
    - Creates a new job key with the job data.
    - if delayed:
      - computes timestamp.
      - adds to delayed zset.
      - Emits a global event 'delayed' if the job is delayed.
    - if not delayed
      - Adds the jobId to the wait/paused list in one of three ways:
         - LIFO
         - FIFO
         - prioritized.
      - Adds the job to the "added" list so that workers gets notified.
    Input:
      KEYS[1] 'wait',
      KEYS[2] 'paused'
      KEYS[3] 'meta'
      KEYS[4] 'id'
      KEYS[5] 'completed'
      KEYS[6] 'delayed'
      KEYS[7] 'active'
      KEYS[8] events stream key
      KEYS[9] marker key
      ARGV[1] msgpacked arguments array
            [1]  key prefix,
            [2]  custom id (will not generate one automatically)
            [3]  name
            [4]  timestamp
            [5]  parentKey?
            [6]  parent dependencies key.
            [7]  parent? {id, queueKey}
            [8]  repeat job key
            [9] deduplication key
      ARGV[2] Json stringified job data
      ARGV[3] msgpacked options
      Output:
        jobId  - OK
        -5     - Missing parent key
]]
local eventsKey = KEYS[8]
local jobId
local jobIdKey
local rcall = redis.call
local args = cmsgpack.unpack(ARGV[1])
local data = ARGV[2]
local opts = cmsgpack.unpack(ARGV[3])
local parentKey = args[5]
local parent = args[7]
local repeatJobKey = args[8]
local deduplicationKey = args[9]
local parentData
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to debounce a job.
]]
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local function removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents, currentDeduplicatedJobId,
    jobId, deduplicationId, prefix)
    if rcall("ZREM", delayedKey, currentDeduplicatedJobId) > 0 then
        removeJobKeys(prefix .. currentDeduplicatedJobId)
        rcall("XADD", eventsKey, "*", "event", "removed", "jobId", currentDeduplicatedJobId,
            "prev", "delayed")
        -- TODO remove debounced event in next breaking change
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
            jobId, "debounceId", deduplicationId)
        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
            jobId, "deduplicationId", deduplicationId, "deduplicatedJobId", currentDeduplicatedJobId)
        return true
    end
    return false
end
local function deduplicateJob(deduplicationOpts, jobId, delayedKey, deduplicationKey, eventsKey, maxEvents,
    prefix)
    local deduplicationId = deduplicationOpts and deduplicationOpts['id']
    if deduplicationId then
        local ttl = deduplicationOpts['ttl']
        if deduplicationOpts['replace'] then
            if ttl and ttl > 0 then
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        if deduplicationOpts['extend'] then
                            rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                        else
                            rcall('SET', deduplicationKey, jobId, 'KEEPTTL')
                        end
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                    return
                end
            else
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                if currentDebounceJobId then
                    local isRemoved = removeDelayedJob(delayedKey, deduplicationKey, eventsKey, maxEvents,
                        currentDebounceJobId, jobId, deduplicationId, prefix)
                    if isRemoved then
                        rcall('SET', deduplicationKey, jobId)
                        return
                    else
                        return currentDebounceJobId
                    end
                else
                    rcall('SET', deduplicationKey, jobId)
                    return
                end
            end
        else
            local deduplicationKeyExists
            if ttl and ttl > 0 then
                if deduplicationOpts['extend'] then
                    local currentDebounceJobId = rcall('GET', deduplicationKey)
                    if currentDebounceJobId then
                        rcall('SET', deduplicationKey, currentDebounceJobId, 'PX', ttl)
                        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced",
                            "jobId", currentDebounceJobId, "debounceId", deduplicationId)
                        rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
                            currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
                        return currentDebounceJobId
                    else
                        rcall('SET', deduplicationKey, jobId, 'PX', ttl)
                        return
                    end
                else
                    deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'PX', ttl, 'NX')
                end
            else
                deduplicationKeyExists = not rcall('SET', deduplicationKey, jobId, 'NX')
            end
            if deduplicationKeyExists then
                local currentDebounceJobId = rcall('GET', deduplicationKey)
                -- TODO remove debounced event in next breaking change
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "debounced", "jobId",
                    currentDebounceJobId, "debounceId", deduplicationId)
                rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "deduplicated", "jobId",
                    currentDebounceJobId, "deduplicationId", deduplicationId, "deduplicatedJobId", jobId)
                return currentDebounceJobId
            end
        end
    end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to handle the case when job is duplicated.
]]
-- Includes
--[[
    This function is used to update the parent's dependencies if the job
    is already completed and about to be ignored. The parent must get its
    dependencies updated to avoid the parent job being stuck forever in 
    the waiting-children state.
]]
-- Includes
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
local function updateExistingJobsParent(parentKey, parent, parentData,
                                        parentDependenciesKey, completedKey,
                                        jobIdKey, jobId, timestamp)
    if parentKey ~= nil then
        if rcall("ZSCORE", completedKey, jobId) then
            local returnvalue = rcall("HGET", jobIdKey, "returnvalue")
            updateParentDepsIfNeeded(parentKey, parent['queueKey'],
                                     parentDependenciesKey, parent['id'],
                                     jobIdKey, returnvalue, timestamp)
        else
            if parentDependenciesKey ~= nil then
                rcall("SADD", parentDependenciesKey, jobIdKey)
            end
        end
        rcall("HMSET", jobIdKey, "parentKey", parentKey, "parent", parentData)
    end
end
local function handleDuplicatedJob(jobKey, jobId, currentParentKey, currentParent,
  parentData, parentDependenciesKey, completedKey, eventsKey, maxEvents, timestamp)
  local existedParentKey = rcall("HGET", jobKey, "parentKey")
  if not existedParentKey or existedParentKey == currentParentKey then
    updateExistingJobsParent(currentParentKey, currentParent, parentData,
      parentDependenciesKey, completedKey, jobKey,
      jobId, timestamp)
  else
    if currentParentKey ~= nil and currentParentKey ~= existedParentKey
      and (rcall("EXISTS", existedParentKey) == 1) then
      return -7
    end
  end
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event",
    "duplicated", "jobId", jobId)
  return jobId .. "" -- convert to string
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
if parentKey ~= nil then
    if rcall("EXISTS", parentKey) ~= 1 then return -5 end
    parentData = cjson.encode(parent)
end
local jobCounter = rcall("INCR", KEYS[4])
local metaKey = KEYS[3]
local maxEvents = getOrSetMaxEvents(metaKey)
local parentDependenciesKey = args[6]
local timestamp = args[4]
if args[2] == "" then
    jobId = jobCounter
    jobIdKey = args[1] .. jobId
else
    jobId = args[2]
    jobIdKey = args[1] .. jobId
    if rcall("EXISTS", jobIdKey) == 1 then
        return handleDuplicatedJob(jobIdKey, jobId, parentKey, parent,
            parentData, parentDependenciesKey, KEYS[5], eventsKey,
            maxEvents, timestamp)
    end
end
local deduplicationJobId = deduplicateJob(opts['de'], jobId, KEYS[6],
  deduplicationKey, eventsKey, maxEvents, args[1])
if deduplicationJobId then
  return deduplicationJobId
end
-- Store the job.
storeJob(eventsKey, jobIdKey, jobId, args[3], ARGV[2], opts, timestamp,
         parentKey, parentData, repeatJobKey)
local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[7], KEYS[1], KEYS[2])
-- LIFO or FIFO
local pushCmd = opts['lifo'] and 'RPUSH' or 'LPUSH'
addJobInTargetList(target, KEYS[9], pushCmd, isPausedOrMaxed, jobId)
-- Emit waiting event
rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "waiting",
      "jobId", jobId)
-- Check if this job is a child of another job, if so add it to the parents dependencies
if parentDependenciesKey ~= nil then
    rcall("SADD", parentDependenciesKey, jobIdKey)
end
return jobId .. "" -- convert to string
`,keys:9};e.s(["addStandardJob",0,t9],397379);let t8={name:"changeDelay",content:`--[[
  Change job delay when it is in delayed set.
  Input:
    KEYS[1] delayed key
    KEYS[2] meta key
    KEYS[3] marker key
    KEYS[4] events stream
    ARGV[1] delay
    ARGV[2] timestamp
    ARGV[3] the id of the job
    ARGV[4] job key
  Output:
    0 - OK
   -1 - Missing job.
   -3 - Job not in delayed set.
  Events:
    - delayed key.
]]
local rcall = redis.call
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
if rcall("EXISTS", ARGV[4]) == 1 then
  local jobId = ARGV[3]
  local delay = tonumber(ARGV[1])
  local score, delayedTimestamp = getDelayedScore(KEYS[1], ARGV[2], delay)
  local numRemovedElements = rcall("ZREM", KEYS[1], jobId)
  if numRemovedElements < 1 then
    return -3
  end
  rcall("HSET", ARGV[4], "delay", delay)
  rcall("ZADD", KEYS[1], score, jobId)
  local maxEvents = getOrSetMaxEvents(KEYS[2])
  rcall("XADD", KEYS[4], "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  addDelayMarkerIfNeeded(KEYS[3], KEYS[1])
  return 0
else
  return -1
end`,keys:4};e.s(["changeDelay",0,t8],761759);let t7={name:"changePriority",content:`--[[
  Change job priority
  Input:
    KEYS[1] 'wait',
    KEYS[2] 'paused'
    KEYS[3] 'meta'
    KEYS[4] 'prioritized'
    KEYS[5] 'active'
    KEYS[6] 'pc' priority counter
    KEYS[7] 'marker'
    ARGV[1] priority value
    ARGV[2] prefix key
    ARGV[3] job id
    ARGV[4] lifo
    Output:
       0  - OK
      -1  - Missing job
]]
local jobId = ARGV[3]
local jobKey = ARGV[2] .. jobId
local priority = tonumber(ARGV[1])
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to push back job considering priority in front of same prioritized jobs.
]]
local function pushBackJobWithPriority(prioritizedKey, priority, jobId)
  -- in order to put it at front of same prioritized jobs
  -- we consider prioritized counter as 0
  local score = priority * 0x100000000
  rcall("ZADD", prioritizedKey, score, jobId)
end
local function reAddJobWithNewPriority( prioritizedKey, markerKey, targetKey,
    priorityCounter, lifo, priority, jobId, isPausedOrMaxed)
    if priority == 0 then
        local pushCmd = lifo and 'RPUSH' or 'LPUSH'
        addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
    else
        if lifo then
            pushBackJobWithPriority(prioritizedKey, priority, jobId)
        else
            addJobWithPriority(markerKey, prioritizedKey, priority, jobId,
                priorityCounter, isPausedOrMaxed)
        end
    end
end
if rcall("EXISTS", jobKey) == 1 then
    local metaKey = KEYS[3]
    local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[5], KEYS[1], KEYS[2])
    local prioritizedKey = KEYS[4]
    local priorityCounterKey = KEYS[6]
    local markerKey = KEYS[7]
    -- Re-add with the new priority
    if rcall("ZREM", prioritizedKey, jobId) > 0 then
        reAddJobWithNewPriority( prioritizedKey, markerKey, target,
            priorityCounterKey, ARGV[4] == '1', priority, jobId, isPausedOrMaxed)
    elseif rcall("LREM", target, -1, jobId) > 0 then
        reAddJobWithNewPriority( prioritizedKey, markerKey, target,
            priorityCounterKey, ARGV[4] == '1', priority, jobId, isPausedOrMaxed)
    end
    rcall("HSET", jobKey, "priority", priority)
    return 0
else
    return -1
end
`,keys:7};e.s(["changePriority",0,t7],518407);let re={name:"cleanJobsInSet",content:`--[[
  Remove jobs from the specific set.
  Input:
    KEYS[1]  set key,
    KEYS[2]  events stream key
    KEYS[3]  repeat key
    ARGV[1]  jobKey prefix
    ARGV[2]  timestamp
    ARGV[3]  limit the number of jobs to be removed. 0 is unlimited
    ARGV[4]  set name, can be any of 'wait', 'active', 'paused', 'delayed', 'completed', or 'failed'
]]
local rcall = redis.call
local repeatKey = KEYS[3]
local rangeStart = 0
local rangeEnd = -1
local limit = tonumber(ARGV[3])
-- If we're only deleting _n_ items, avoid retrieving all items
-- for faster performance
--
-- Start from the tail of the list, since that's where oldest elements
-- are generally added for FIFO lists
if limit > 0 then
  rangeStart = -1 - limit + 1
  rangeEnd = -1
end
-- Includes
--[[
  Function to clean job list.
  Returns jobIds and deleted count number.
]]
-- Includes
--[[
  Function to get the latest saved timestamp.
]]
local function getTimestamp(jobKey, attributes)
  if #attributes == 1 then
    return rcall("HGET", jobKey, attributes[1])
  end
  local jobTs
  for _, ts in ipairs(rcall("HMGET", jobKey, unpack(attributes))) do
    if (ts) then
      jobTs = ts
      break
    end
  end
  return jobTs
end
--[[
  Function to check if the job belongs to a job scheduler and
  current delayed job matches with jobId
]]
local function isJobSchedulerJob(jobId, jobKey, jobSchedulersKey)
  local repeatJobKey = rcall("HGET", jobKey, "rjk")
  if repeatJobKey  then
    local prevMillis = rcall("ZSCORE", jobSchedulersKey, repeatJobKey)
    if prevMillis then
      local currentDelayedJobId = "repeat:" .. repeatJobKey .. ":" .. prevMillis
      return jobId == currentDelayedJobId
    end
  end
  return false
end
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
local function cleanList(listKey, jobKeyPrefix, rangeStart, rangeEnd,
  timestamp, isWaiting, jobSchedulersKey)
  local jobs = rcall("LRANGE", listKey, rangeStart, rangeEnd)
  local deleted = {}
  local deletedCount = 0
  local jobTS
  local deletionMarker = ''
  local jobIdsLen = #jobs
  for i, job in ipairs(jobs) do
    if limit > 0 and deletedCount >= limit then
      break
    end
    local jobKey = jobKeyPrefix .. job
    if (isWaiting or rcall("EXISTS", jobKey .. ":lock") == 0) and
      not isJobSchedulerJob(job, jobKey, jobSchedulersKey) then
      -- Find the right timestamp of the job to compare to maxTimestamp:
      -- * finishedOn says when the job was completed, but it isn't set unless the job has actually completed
      -- * processedOn represents when the job was last attempted, but it doesn't get populated until
      --   the job is first tried
      -- * timestamp is the original job submission time
      -- Fetch all three of these (in that order) and use the first one that is set so that we'll leave jobs
      -- that have been active within the grace period:
      jobTS = getTimestamp(jobKey, {"finishedOn", "processedOn", "timestamp"})
      if (not jobTS or jobTS <= timestamp) then
        -- replace the entry with a deletion marker; the actual deletion will
        -- occur at the end of the script
        rcall("LSET", listKey, rangeEnd - jobIdsLen + i, deletionMarker)
        removeJob(job, true, jobKeyPrefix, true --[[remove debounce key]])
        deletedCount = deletedCount + 1
        table.insert(deleted, job)
      end
    end
  end
  rcall("LREM", listKey, 0, deletionMarker)
  return {deleted, deletedCount}
end
--[[
  Function to clean job set.
  Returns jobIds and deleted count number.
]] 
-- Includes
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  We use ZRANGEBYSCORE to make the case where we're deleting a limited number
  of items in a sorted set only run a single iteration. If we simply used
  ZRANGE, we may take a long time traversing through jobs that are within the
  grace period.
]]
local function getJobsInZset(zsetKey, rangeEnd, limit)
  if limit > 0 then
    return rcall("ZRANGEBYSCORE", zsetKey, 0, rangeEnd, "LIMIT", 0, limit)
  else
    return rcall("ZRANGEBYSCORE", zsetKey, 0, rangeEnd)
  end
end
local function cleanSet(
    setKey,
    jobKeyPrefix,
    rangeEnd,
    timestamp,
    limit,
    attributes,
    isFinished,
    jobSchedulersKey)
    local jobs = getJobsInZset(setKey, rangeEnd, limit)
    local deleted = {}
    local deletedCount = 0
    local jobTS
    for i, job in ipairs(jobs) do
        if limit > 0 and deletedCount >= limit then
            break
        end
        local jobKey = jobKeyPrefix .. job
        -- Extract a Job Scheduler Id from jobId ("repeat:job-scheduler-id:millis") 
        -- and check if it is in the scheduled jobs
        if not (jobSchedulersKey and isJobSchedulerJob(job, jobKey, jobSchedulersKey)) then
            if isFinished then
                removeJob(job, true, jobKeyPrefix, true --[[remove debounce key]] )
                deletedCount = deletedCount + 1
                table.insert(deleted, job)
            else
                -- * finishedOn says when the job was completed, but it isn't set unless the job has actually completed
                jobTS = getTimestamp(jobKey, attributes)
                if (not jobTS or jobTS <= timestamp) then
                    removeJob(job, true, jobKeyPrefix, true --[[remove debounce key]] )
                    deletedCount = deletedCount + 1
                    table.insert(deleted, job)
                end
            end
        end
    end
    if (#deleted > 0) then
        for from, to in batches(#deleted, 7000) do
            rcall("ZREM", setKey, unpack(deleted, from, to))
        end
    end
    return {deleted, deletedCount}
end
local result
if ARGV[4] == "active" then
  result = cleanList(KEYS[1], ARGV[1], rangeStart, rangeEnd, ARGV[2], false --[[ hasFinished ]],
                      repeatKey)
elseif ARGV[4] == "delayed" then
  rangeEnd = "+inf"
  result = cleanSet(KEYS[1], ARGV[1], rangeEnd, ARGV[2], limit,
                    {"processedOn", "timestamp"}, false  --[[ hasFinished ]], repeatKey)
elseif ARGV[4] == "prioritized" then
  rangeEnd = "+inf"
  result = cleanSet(KEYS[1], ARGV[1], rangeEnd, ARGV[2], limit,
                    {"timestamp"}, false  --[[ hasFinished ]], repeatKey)
elseif ARGV[4] == "wait" or ARGV[4] == "paused" then
  result = cleanList(KEYS[1], ARGV[1], rangeStart, rangeEnd, ARGV[2], true --[[ hasFinished ]],
                      repeatKey)
else
  rangeEnd = ARGV[2]
  -- No need to pass repeat key as in that moment job won't be related to a job scheduler
  result = cleanSet(KEYS[1], ARGV[1], rangeEnd, ARGV[2], limit,
                    {"finishedOn"}, true  --[[ hasFinished ]])
end
rcall("XADD", KEYS[2], "*", "event", "cleaned", "count", result[2])
return result[1]
`,keys:3};e.s(["cleanJobsInSet",0,re],38662);let rt={name:"drain",content:`--[[
  Drains the queue, removes all jobs that are waiting
  or delayed, but not active, completed or failed
  Input:
    KEYS[1] 'wait',
    KEYS[2] 'paused'
    KEYS[3] 'delayed'
    KEYS[4] 'prioritized'
    KEYS[5] 'jobschedulers' (repeat)
    ARGV[1]  queue key prefix
    ARGV[2]  should clean delayed jobs
]]
local rcall = redis.call
local queueBaseKey = ARGV[1]
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to filter out jobs to ignore from a table.
]]
local function filterOutJobsToIgnore(jobs, jobsToIgnore)
  local filteredJobs = {}
  for i = 1, #jobs do
    if not jobsToIgnore[jobs[i]] then
      table.insert(filteredJobs, jobs[i])
    end
  end
  return filteredJobs
end
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
local function removeJobs(keys, hard, baseKey, max)
  for i, key in ipairs(keys) do
    removeJob(key, hard, baseKey, true --[[remove debounce key]])
  end
  return max - #keys
end
local function getListItems(keyName, max)
  return rcall('LRANGE', keyName, 0, max - 1)
end
local function removeListJobs(keyName, hard, baseKey, max, jobsToIgnore)
  local jobs = getListItems(keyName, max)
  if jobsToIgnore then
    jobs = filterOutJobsToIgnore(jobs, jobsToIgnore)
  end
  local count = removeJobs(jobs, hard, baseKey, max)
  rcall("LTRIM", keyName, #jobs, -1)
  return count
end
-- Includes
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to get ZSet items.
]]
local function getZSetItems(keyName, max)
  return rcall('ZRANGE', keyName, 0, max - 1)
end
local function removeZSetJobs(keyName, hard, baseKey, max, jobsToIgnore)
  local jobs = getZSetItems(keyName, max)
  if jobsToIgnore then
    jobs = filterOutJobsToIgnore(jobs, jobsToIgnore)
  end
  local count = removeJobs(jobs, hard, baseKey, max)
  if(#jobs > 0) then
    for from, to in batches(#jobs, 7000) do
      rcall("ZREM", keyName, unpack(jobs, from, to))
    end
  end
  return count
end
-- We must not remove delayed jobs if they are associated to a job scheduler.
local scheduledJobs = {}
local jobSchedulers = rcall("ZRANGE", KEYS[5], 0, -1, "WITHSCORES")
-- For every job scheduler, get the current delayed job id.
for i = 1, #jobSchedulers, 2 do
    local jobSchedulerId = jobSchedulers[i]
    local jobSchedulerMillis = jobSchedulers[i + 1]
    local delayedJobId = "repeat:" .. jobSchedulerId .. ":" .. jobSchedulerMillis
    scheduledJobs[delayedJobId] = true
end
removeListJobs(KEYS[1], true, queueBaseKey, 0, scheduledJobs) -- wait
removeListJobs(KEYS[2], true, queueBaseKey, 0, scheduledJobs) -- paused
if ARGV[2] == "1" then
  removeZSetJobs(KEYS[3], true, queueBaseKey, 0, scheduledJobs) -- delayed
end
removeZSetJobs(KEYS[4], true, queueBaseKey, 0, scheduledJobs) -- prioritized
`,keys:5};e.s(["drain",0,rt],720308);let rr={name:"extendLock",content:`--[[
  Extend lock and removes the job from the stalled set.
  Input:
    KEYS[1] 'lock',
    KEYS[2] 'stalled'
    ARGV[1]  token
    ARGV[2]  lock duration in milliseconds
    ARGV[3]  jobid
  Output:
    "1" if lock extented succesfully.
]]
local rcall = redis.call
if rcall("GET", KEYS[1]) == ARGV[1] then
  --   if rcall("SET", KEYS[1], ARGV[1], "PX", ARGV[2], "XX") then
  if rcall("SET", KEYS[1], ARGV[1], "PX", ARGV[2]) then
    rcall("SREM", KEYS[2], ARGV[3])
    return 1
  end
end
return 0
`,keys:2};e.s(["extendLock",0,rr],163161);let rn={name:"extendLocks",content:`--[[
  Extend locks for multiple jobs and remove them from the stalled set if successful.
  Return the list of job IDs for which the operation failed.
  KEYS[1] = stalled key
  ARGV[1] = baseKey
  ARGV[2] = tokens
  ARGV[3] = jobIds
  ARGV[4] = lockDuration (ms)
  Output:
    An array of failed job IDs. If empty, all succeeded.
]]
local rcall = redis.call
local stalledKey = KEYS[1]
local baseKey = ARGV[1]
local tokens = cmsgpack.unpack(ARGV[2])
local jobIds = cmsgpack.unpack(ARGV[3])
local lockDuration = ARGV[4]
local jobCount = #jobIds
local failedJobs = {}
for i = 1, jobCount, 1 do
    local lockKey = baseKey .. jobIds[i] .. ':lock'
    local jobId = jobIds[i]
    local token = tokens[i]
    local currentToken = rcall("GET", lockKey)
    if currentToken then
        if currentToken == token then
            local setResult = rcall("SET", lockKey, token, "PX", lockDuration)
            if setResult then
                rcall("SREM", stalledKey, jobId)
            else
                table.insert(failedJobs, jobId)
            end
        else
            table.insert(failedJobs, jobId)
        end
    else
        table.insert(failedJobs, jobId)
    end
end
return failedJobs
`,keys:1};e.s(["extendLocks",0,rn],955194);let ri={name:"getCounts",content:`--[[
  Get counts per provided states
    Input:
      KEYS[1]    'prefix'
      ARGV[1...] types
]]
local rcall = redis.call;
local prefix = KEYS[1]
local results = {}
for i = 1, #ARGV do
  local stateKey = prefix .. ARGV[i]
  if ARGV[i] == "wait" or ARGV[i] == "paused" then
    -- Markers in waitlist DEPRECATED in v5: Remove in v6.
    local marker = rcall("LINDEX", stateKey, -1)
    if marker and string.sub(marker, 1, 2) == "0:" then
      local count = rcall("LLEN", stateKey)
      if count > 1 then
        rcall("RPOP", stateKey)
        results[#results+1] = count-1
      else
        results[#results+1] = 0
      end
    else
      results[#results+1] = rcall("LLEN", stateKey)
    end
  elseif ARGV[i] == "active" then
    results[#results+1] = rcall("LLEN", stateKey)
  else
    results[#results+1] = rcall("ZCARD", stateKey)
  end
end
return results
`,keys:1};e.s(["getCounts",0,ri],215608);let ra={name:"getCountsPerPriority",content:`--[[
  Get counts per provided states
    Input:
      KEYS[1] wait key
      KEYS[2] paused key
      KEYS[3] meta key
      KEYS[4] prioritized key
      ARGV[1...] priorities
]]
local rcall = redis.call
local results = {}
local waitKey = KEYS[1]
local pausedKey = KEYS[2]
local prioritizedKey = KEYS[4]
-- Includes
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
  return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
for i = 1, #ARGV do
  local priority = tonumber(ARGV[i])
  if priority == 0 then
    if isQueuePaused(KEYS[3]) then
      results[#results+1] = rcall("LLEN", pausedKey)
    else
      results[#results+1] = rcall("LLEN", waitKey)
    end
  else
    results[#results+1] = rcall("ZCOUNT", prioritizedKey,
      priority * 0x100000000, (priority + 1)  * 0x100000000 - 1)
  end
end
return results
`,keys:4};e.s(["getCountsPerPriority",0,ra],456069);let rs={name:"getDependencyCounts",content:`--[[
  Get counts per child states
    Input:
      KEYS[1]    processed key
      KEYS[2]    unprocessed key
      KEYS[3]    ignored key
      KEYS[4]    failed key
      ARGV[1...] types
]]
local rcall = redis.call;
local processedKey = KEYS[1]
local unprocessedKey = KEYS[2]
local ignoredKey = KEYS[3]
local failedKey = KEYS[4]
local results = {}
for i = 1, #ARGV do
  if ARGV[i] == "processed" then
    results[#results+1] = rcall("HLEN", processedKey)
  elseif ARGV[i] == "unprocessed" then
    results[#results+1] = rcall("SCARD", unprocessedKey)
  elseif ARGV[i] == "ignored" then
    results[#results+1] = rcall("HLEN", ignoredKey)
  else
    results[#results+1] = rcall("ZCARD", failedKey)
  end
end
return results
`,keys:4};e.s(["getDependencyCounts",0,rs],821467);let ro={name:"getJobScheduler",content:`--[[
  Get job scheduler record.
  Input:
    KEYS[1] 'repeat' key
    ARGV[1] id
]]
local rcall = redis.call
local jobSchedulerKey = KEYS[1] .. ":" .. ARGV[1]
local score = rcall("ZSCORE", KEYS[1], ARGV[1])
if score then
  return {rcall("HGETALL", jobSchedulerKey), score} -- get job data
end
return {nil, nil}
`,keys:1};e.s(["getJobScheduler",0,ro],292181);let rl={name:"getMetrics",content:`--[[
  Get metrics
  Input:
    KEYS[1] 'metrics' key
    KEYS[2] 'metrics data' key
    ARGV[1] start index
    ARGV[2] end index
]]
local rcall = redis.call;
local metricsKey = KEYS[1]
local dataKey = KEYS[2]
local metrics = rcall("HMGET", metricsKey, "count", "prevTS", "prevCount")
local data = rcall("LRANGE", dataKey, tonumber(ARGV[1]), tonumber(ARGV[2]))
local numPoints = rcall("LLEN", dataKey)
return {metrics, data, numPoints}
`,keys:2};e.s(["getMetrics",0,rl],64765);let ru={name:"getRanges",content:`--[[
  Get job ids per provided states
    Input:
      KEYS[1]    'prefix'
      ARGV[1]    start
      ARGV[2]    end
      ARGV[3]    asc
      ARGV[4...] types
]]
local rcall = redis.call
local prefix = KEYS[1]
local rangeStart = tonumber(ARGV[1])
local rangeEnd = tonumber(ARGV[2])
local asc = ARGV[3]
local results = {}
local function getRangeInList(listKey, asc, rangeStart, rangeEnd, results)
  if asc == "1" then
    local modifiedRangeStart
    local modifiedRangeEnd
    if rangeStart == -1 then
      modifiedRangeStart = 0
    else
      modifiedRangeStart = -(rangeStart + 1)
    end
    if rangeEnd == -1 then
      modifiedRangeEnd = 0
    else
      modifiedRangeEnd = -(rangeEnd + 1)
    end
    results[#results+1] = rcall("LRANGE", listKey,
      modifiedRangeEnd,
      modifiedRangeStart)
  else
    results[#results+1] = rcall("LRANGE", listKey, rangeStart, rangeEnd)
  end
end
for i = 4, #ARGV do
  local stateKey = prefix .. ARGV[i]
  if ARGV[i] == "wait" or ARGV[i] == "paused" then
    -- Markers in waitlist DEPRECATED in v5: Remove in v6.
    local marker = rcall("LINDEX", stateKey, -1)
    if marker and string.sub(marker, 1, 2) == "0:" then
      local count = rcall("LLEN", stateKey)
      if count > 1 then
        rcall("RPOP", stateKey)
        getRangeInList(stateKey, asc, rangeStart, rangeEnd, results)
      else
        results[#results+1] = {}
      end
    else
      getRangeInList(stateKey, asc, rangeStart, rangeEnd, results)
    end
  elseif ARGV[i] == "active" then
    getRangeInList(stateKey, asc, rangeStart, rangeEnd, results)
  else
    if asc == "1" then
      results[#results+1] = rcall("ZRANGE", stateKey, rangeStart, rangeEnd)
    else
      results[#results+1] = rcall("ZREVRANGE", stateKey, rangeStart, rangeEnd)
    end
  end
end
return results
`,keys:1};e.s(["getRanges",0,ru],54208);let rd={name:"getRateLimitTtl",content:`--[[
  Get rate limit ttl
    Input:
      KEYS[1] 'limiter'
      KEYS[2] 'meta'
      ARGV[1] maxJobs
]]
local rcall = redis.call
-- Includes
--[[
  Function to get current rate limit ttl.
]]
local function getRateLimitTTL(maxJobs, rateLimiterKey)
  if maxJobs and maxJobs <= tonumber(rcall("GET", rateLimiterKey) or 0) then
    local pttl = rcall("PTTL", rateLimiterKey)
    if pttl == 0 then
      rcall("DEL", rateLimiterKey)
    end
    if pttl > 0 then
      return pttl
    end
  end
  return 0
end
local rateLimiterKey = KEYS[1]
if ARGV[1] ~= "0" then
  return getRateLimitTTL(tonumber(ARGV[1]), rateLimiterKey)
else
  local rateLimitMax = rcall("HGET", KEYS[2], "max")
  if rateLimitMax then
    return getRateLimitTTL(tonumber(rateLimitMax), rateLimiterKey)
  end
  return rcall("PTTL", rateLimiterKey)
end
`,keys:2};e.s(["getRateLimitTtl",0,rd],420059);let rc={name:"getState",content:`--[[
  Get a job state
  Input: 
    KEYS[1] 'completed' key,
    KEYS[2] 'failed' key
    KEYS[3] 'delayed' key
    KEYS[4] 'active' key
    KEYS[5] 'wait' key
    KEYS[6] 'paused' key
    KEYS[7] 'waiting-children' key
    KEYS[8] 'prioritized' key
    ARGV[1] job id
  Output:
    'completed'
    'failed'
    'delayed'
    'active'
    'prioritized'
    'waiting'
    'waiting-children'
    'unknown'
]]
local rcall = redis.call
if rcall("ZSCORE", KEYS[1], ARGV[1]) then
  return "completed"
end
if rcall("ZSCORE", KEYS[2], ARGV[1]) then
  return "failed"
end
if rcall("ZSCORE", KEYS[3], ARGV[1]) then
  return "delayed"
end
if rcall("ZSCORE", KEYS[8], ARGV[1]) then
  return "prioritized"
end
-- Includes
--[[
  Functions to check if a item belongs to a list.
]]
local function checkItemInList(list, item)
  for _, v in pairs(list) do
    if v == item then
      return 1
    end
  end
  return nil
end
local active_items = rcall("LRANGE", KEYS[4] , 0, -1)
if checkItemInList(active_items, ARGV[1]) ~= nil then
  return "active"
end
local wait_items = rcall("LRANGE", KEYS[5] , 0, -1)
if checkItemInList(wait_items, ARGV[1]) ~= nil then
  return "waiting"
end
local paused_items = rcall("LRANGE", KEYS[6] , 0, -1)
if checkItemInList(paused_items, ARGV[1]) ~= nil then
  return "waiting"
end
if rcall("ZSCORE", KEYS[7], ARGV[1]) then
  return "waiting-children"
end
return "unknown"
`,keys:8};e.s(["getState",0,rc],258113);let rh={name:"getStateV2",content:`--[[
  Get a job state
  Input: 
    KEYS[1] 'completed' key,
    KEYS[2] 'failed' key
    KEYS[3] 'delayed' key
    KEYS[4] 'active' key
    KEYS[5] 'wait' key
    KEYS[6] 'paused' key
    KEYS[7] 'waiting-children' key
    KEYS[8] 'prioritized' key
    ARGV[1] job id
  Output:
    'completed'
    'failed'
    'delayed'
    'active'
    'waiting'
    'waiting-children'
    'unknown'
]]
local rcall = redis.call
if rcall("ZSCORE", KEYS[1], ARGV[1]) then
  return "completed"
end
if rcall("ZSCORE", KEYS[2], ARGV[1]) then
  return "failed"
end
if rcall("ZSCORE", KEYS[3], ARGV[1]) then
  return "delayed"
end
if rcall("ZSCORE", KEYS[8], ARGV[1]) then
  return "prioritized"
end
if rcall("LPOS", KEYS[4] , ARGV[1]) then
  return "active"
end
if rcall("LPOS", KEYS[5] , ARGV[1]) then
  return "waiting"
end
if rcall("LPOS", KEYS[6] , ARGV[1]) then
  return "waiting"
end
if rcall("ZSCORE", KEYS[7] , ARGV[1]) then
  return "waiting-children"
end
return "unknown"
`,keys:8};e.s(["getStateV2",0,rh],77231);let rp={name:"isFinished",content:`--[[
  Checks if a job is finished (.i.e. is in the completed or failed set)
  Input: 
    KEYS[1] completed key
    KEYS[2] failed key
    KEYS[3] job key
    ARGV[1] job id
    ARGV[2] return value?
  Output:
    0 - Not finished.
    1 - Completed.
    2 - Failed.
   -1 - Missing job. 
]]
local rcall = redis.call
if rcall("EXISTS", KEYS[3]) ~= 1 then
  if ARGV[2] == "1" then
    return {-1,"Missing key for job " .. KEYS[3] .. ". isFinished"}
  end  
  return -1
end
if rcall("ZSCORE", KEYS[1], ARGV[1]) then
  if ARGV[2] == "1" then
    local returnValue = rcall("HGET", KEYS[3], "returnvalue")
    return {1,returnValue}
  end
  return 1
end
if rcall("ZSCORE", KEYS[2], ARGV[1]) then
  if ARGV[2] == "1" then
    local failedReason = rcall("HGET", KEYS[3], "failedReason")
    return {2,failedReason}
  end
  return 2
end
if ARGV[2] == "1" then
  return {0}
end
return 0
`,keys:3};e.s(["isFinished",0,rp],324599);let rm={name:"isJobInList",content:`--[[
  Checks if job is in a given list.
  Input:
    KEYS[1]
    ARGV[1]
  Output:
    1 if element found in the list.
]]
-- Includes
--[[
  Functions to check if a item belongs to a list.
]]
local function checkItemInList(list, item)
  for _, v in pairs(list) do
    if v == item then
      return 1
    end
  end
  return nil
end
local items = redis.call("LRANGE", KEYS[1] , 0, -1)
return checkItemInList(items, ARGV[1])
`,keys:1};e.s(["isJobInList",0,rm],827958);let rf={name:"isMaxed",content:`--[[
  Checks if queue is maxed.
  Input:
    KEYS[1] meta key
    KEYS[2] active key
  Output:
    1 if element found in the list.
]]
local rcall = redis.call
-- Includes
--[[
  Function to check if queue is maxed or not.
]]
local function isQueueMaxed(queueMetaKey, activeKey)
  local maxConcurrency = rcall("HGET", queueMetaKey, "concurrency")
  if maxConcurrency then
    local activeCount = rcall("LLEN", activeKey)
    if activeCount >= tonumber(maxConcurrency) then
      return true
    end
  end
  return false
end
return isQueueMaxed(KEYS[1], KEYS[2])
`,keys:2};e.s(["isMaxed",0,rf],744397);let ry={name:"moveJobFromActiveToWait",content:`--[[
  Function to move job from active state to wait.
  Input:
    KEYS[1]  active key
    KEYS[2]  wait key
    KEYS[3]  stalled key
    KEYS[4]  paused key
    KEYS[5]  meta key
    KEYS[6]  limiter key
    KEYS[7]  prioritized key
    KEYS[8]  marker key
    KEYS[9]  event key
    ARGV[1] job id
    ARGV[2] lock token
    ARGV[3] job id key
]]
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to push back job considering priority in front of same prioritized jobs.
]]
local function pushBackJobWithPriority(prioritizedKey, priority, jobId)
  -- in order to put it at front of same prioritized jobs
  -- we consider prioritized counter as 0
  local score = priority * 0x100000000
  rcall("ZADD", prioritizedKey, score, jobId)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
local jobId = ARGV[1]
local token = ARGV[2]
local jobKey = ARGV[3]
if rcall("EXISTS", jobKey) == 0 then
  return -1
end
local errorCode = removeLock(jobKey, KEYS[3], token, jobId)
if errorCode < 0 then
  return errorCode
end
local metaKey = KEYS[5]
local removed = rcall("LREM", KEYS[1], 1, jobId)
if removed > 0 then
  local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[1], KEYS[2], KEYS[4])
  local priority = tonumber(rcall("HGET", ARGV[3], "priority")) or 0
  if priority > 0 then
    pushBackJobWithPriority(KEYS[7], priority, jobId)
  else
    addJobInTargetList(target, KEYS[8], "RPUSH", isPausedOrMaxed, jobId)
  end
  local maxEvents = getOrSetMaxEvents(metaKey)
  -- Emit waiting event
  rcall("XADD", KEYS[9], "MAXLEN", "~", maxEvents, "*", "event", "waiting",
    "jobId", jobId, "prev", "active")
end
local pttl = rcall("PTTL", KEYS[6])
if pttl > 0 then
  return pttl
else
  return 0
end
`,keys:9};e.s(["moveJobFromActiveToWait",0,ry],993952);let rb={name:"moveJobsToWait",content:`--[[
  Move completed, failed or delayed jobs to wait.
  Note: Does not support jobs with priorities.
  Input:
    KEYS[1] base key
    KEYS[2] events stream
    KEYS[3] state key (failed, completed, delayed)
    KEYS[4] 'wait'
    KEYS[5] 'paused'
    KEYS[6] 'meta'
    KEYS[7] 'active'
    KEYS[8] 'marker'
    ARGV[1] count
    ARGV[2] timestamp
    ARGV[3] prev state
  Output:
    1  means the operation is not completed
    0  means the operation is completed
]]
local maxCount = tonumber(ARGV[1])
local timestamp = tonumber(ARGV[2])
local rcall = redis.call;
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local metaKey = KEYS[6]
local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[7], KEYS[4], KEYS[5])
local jobs = rcall('ZRANGEBYSCORE', KEYS[3], 0, timestamp, 'LIMIT', 0, maxCount)
if (#jobs > 0) then
    if ARGV[3] == "failed" then
        for i, key in ipairs(jobs) do
            local jobKey = KEYS[1] .. key
            rcall("HDEL", jobKey, "finishedOn", "processedOn", "failedReason")
        end
    elseif ARGV[3] == "completed" then
        for i, key in ipairs(jobs) do
            local jobKey = KEYS[1] .. key
            rcall("HDEL", jobKey, "finishedOn", "processedOn", "returnvalue")
        end
    end
    local maxEvents = getOrSetMaxEvents(metaKey)
    for i, key in ipairs(jobs) do
        -- Emit waiting event
        rcall("XADD", KEYS[2], "MAXLEN", "~", maxEvents, "*", "event",
              "waiting", "jobId", key, "prev", ARGV[3]);
    end
    for from, to in batches(#jobs, 7000) do
        rcall("ZREM", KEYS[3], unpack(jobs, from, to))
        rcall("LPUSH", target, unpack(jobs, from, to))
    end
    addBaseMarkerIfNeeded(KEYS[8], isPausedOrMaxed)
end
maxCount = maxCount - #jobs
if (maxCount <= 0) then return 1 end
return 0
`,keys:8};e.s(["moveJobsToWait",0,rb],803171);let rg={name:"moveStalledJobsToWait",content:`--[[
  Move stalled jobs to wait.
    Input:
      KEYS[1] 'stalled' (SET)
      KEYS[2] 'wait',   (LIST)
      KEYS[3] 'active', (LIST)
      KEYS[4] 'stalled-check', (KEY)
      KEYS[5] 'meta', (KEY)
      KEYS[6] 'paused', (LIST)
      KEYS[7] 'marker'
      KEYS[8] 'event stream' (STREAM)
      ARGV[1]  Max stalled job count
      ARGV[2]  queue.toKey('')
      ARGV[3]  timestamp
      ARGV[4]  max check time
    Events:
      'stalled' with stalled job id.
]]
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to move job to wait to be picked up by a waiting worker.
]]
-- Includes
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function moveJobToWait(metaKey, activeKey, waitKey, pausedKey, markerKey, eventStreamKey,
  jobId, pushCmd)
  local target, isPausedOrMaxed = getTargetQueueList(metaKey, activeKey, waitKey, pausedKey)
  addJobInTargetList(target, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId", jobId, 'prev', 'active')
end
--[[
  Function to trim events, default 10000.
]]
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
local function trimEvents(metaKey, eventStreamKey)
  local maxEvents = getOrSetMaxEvents(metaKey)
  if maxEvents then
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", maxEvents)
  else
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", 10000)
  end
end
local stalledKey = KEYS[1]
local waitKey = KEYS[2]
local activeKey = KEYS[3]
local stalledCheckKey = KEYS[4]
local metaKey = KEYS[5]
local pausedKey = KEYS[6]
local markerKey = KEYS[7]
local eventStreamKey = KEYS[8]
local maxStalledJobCount = tonumber(ARGV[1])
local queueKeyPrefix = ARGV[2]
local timestamp = ARGV[3]
local maxCheckTime = ARGV[4]
if rcall("EXISTS", stalledCheckKey) == 1 then
    return {}
end
rcall("SET", stalledCheckKey, timestamp, "PX", maxCheckTime)
-- Trim events before emiting them to avoid trimming events emitted in this script
trimEvents(metaKey, eventStreamKey)
-- Move all stalled jobs to wait
local stalling = rcall('SMEMBERS', stalledKey)
local stalled = {}
if (#stalling > 0) then
    rcall('DEL', stalledKey)
    -- Remove from active list
    for i, jobId in ipairs(stalling) do
        -- Markers in waitlist DEPRECATED in v5: Remove in v6.
        if string.sub(jobId, 1, 2) == "0:" then
            -- If the jobId is a delay marker ID we just remove it.
            rcall("LREM", activeKey, 1, jobId)
        else
            local jobKey = queueKeyPrefix .. jobId
            -- Check that the lock is also missing, then we can handle this job as really stalled.
            if (rcall("EXISTS", jobKey .. ":lock") == 0) then
                --  Remove from the active queue.
                local removed = rcall("LREM", activeKey, 1, jobId)
                if (removed > 0) then
                    -- If this job has been stalled too many times, such as if it crashes the worker, then fail it.
                    local stalledCount = rcall("HINCRBY", jobKey, "stc", 1)
                    -- Check if this is a repeatable job by looking at job options
                    local jobOpts = rcall("HGET", jobKey, "opts")
                    local isRepeatableJob = false
                    if jobOpts then
                        local opts = cjson.decode(jobOpts)
                        if opts and opts["repeat"] then
                            isRepeatableJob = true
                        end
                    end
                    -- Only fail job if it exceeds stall limit AND is not a repeatable job
                    if stalledCount > maxStalledJobCount and not isRepeatableJob then
                        local failedReason = "job stalled more than allowable limit"
                        rcall("HSET", jobKey, "defa", failedReason)
                    end
                    moveJobToWait(metaKey, activeKey, waitKey, pausedKey, markerKey, eventStreamKey, jobId,
                        "RPUSH")
                    -- Emit the stalled event
                    rcall("XADD", eventStreamKey, "*", "event", "stalled", "jobId", jobId)
                    table.insert(stalled, jobId)
                end
            end
        end
    end
end
-- Mark potentially stalled jobs
local active = rcall('LRANGE', activeKey, 0, -1)
if (#active > 0) then
    for from, to in batches(#active, 7000) do
        rcall('SADD', stalledKey, unpack(active, from, to))
    end
end
return stalled
`,keys:8};e.s(["moveStalledJobsToWait",0,rg],754095);let rv={name:"moveToActive",content:`--[[
  Move next job to be processed to active, lock it and fetch its data. The job
  may be delayed, in that case we need to move it to the delayed set instead.
  This operation guarantees that the worker owns the job during the lock
  expiration time. The worker is responsible of keeping the lock fresh
  so that no other worker picks this job again.
  Input:
    KEYS[1] wait key
    KEYS[2] active key
    KEYS[3] prioritized key
    KEYS[4] stream events key
    KEYS[5] stalled key
    -- Rate limiting
    KEYS[6] rate limiter key
    KEYS[7] delayed key
    -- Delayed jobs
    KEYS[8] paused key
    KEYS[9] meta key
    KEYS[10] pc priority counter
    -- Marker
    KEYS[11] marker key
    -- Arguments
    ARGV[1] key prefix
    ARGV[2] timestamp
    ARGV[3] opts
    opts - token - lock token
    opts - lockDuration
    opts - limiter
    opts - name - worker name
]]
local rcall = redis.call
local waitKey = KEYS[1]
local activeKey = KEYS[2]
local eventStreamKey = KEYS[4]
local rateLimiterKey = KEYS[6]
local delayedKey = KEYS[7]
local opts = cmsgpack.unpack(ARGV[3])
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
--[[
  Function to get current rate limit ttl.
]]
local function getRateLimitTTL(maxJobs, rateLimiterKey)
  if maxJobs and maxJobs <= tonumber(rcall("GET", rateLimiterKey) or 0) then
    local pttl = rcall("PTTL", rateLimiterKey)
    if pttl == 0 then
      rcall("DEL", rateLimiterKey)
    end
    if pttl > 0 then
      return pttl
    end
  end
  return 0
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to move job from prioritized state to active.
]]
local function moveJobFromPrioritizedToActive(priorityKey, activeKey, priorityCounterKey)
  local prioritizedJob = rcall("ZPOPMIN", priorityKey)
  if #prioritizedJob > 0 then
    rcall("LPUSH", activeKey, prioritizedJob[1])
    return prioritizedJob[1]
  else
    rcall("DEL", priorityCounterKey)
  end
end
--[[
  Function to move job from wait state to active.
  Input:
    opts - token - lock token
    opts - lockDuration
    opts - limiter
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function prepareJobForProcessing(keyPrefix, rateLimiterKey, eventStreamKey,
    jobId, processedOn, maxJobs, limiterDuration, markerKey, opts)
  local jobKey = keyPrefix .. jobId
  -- Check if we need to perform rate limiting.
  if maxJobs then
    local jobCounter = tonumber(rcall("INCR", rateLimiterKey))
    if jobCounter == 1 then
      local integerDuration = math.floor(math.abs(limiterDuration))
      rcall("PEXPIRE", rateLimiterKey, integerDuration)
    end
  end
  -- get a lock
  if opts['token'] ~= "0" then
    local lockKey = jobKey .. ':lock'
    rcall("SET", lockKey, opts['token'], "PX", opts['lockDuration'])
  end
  local optionalValues = {}
  if opts['name'] then
    -- Set "processedBy" field to the worker name
    table.insert(optionalValues, "pb")
    table.insert(optionalValues, opts['name'])
  end
  rcall("XADD", eventStreamKey, "*", "event", "active", "jobId", jobId, "prev", "waiting")
  rcall("HMSET", jobKey, "processedOn", processedOn, unpack(optionalValues))
  rcall("HINCRBY", jobKey, "ats", 1)
  addBaseMarkerIfNeeded(markerKey, false)
  -- rate limit delay must be 0 in this case to prevent adding more delay
  -- when job that is moved to active needs to be processed
  return {rcall("HGETALL", jobKey), jobId, 0, 0} -- get job data
end
--[[
  Updates the delay set, by moving delayed jobs that should
  be processed now to "wait".
     Events:
      'waiting'
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
-- Try to get as much as 1000 jobs at once
local function promoteDelayedJobs(delayedKey, markerKey, targetKey, prioritizedKey,
                                  eventStreamKey, prefix, timestamp, priorityCounterKey, isPaused)
    local jobs = rcall("ZRANGEBYSCORE", delayedKey, 0, (timestamp + 1) * 0x1000 - 1, "LIMIT", 0, 1000)
    if (#jobs > 0) then
        rcall("ZREM", delayedKey, unpack(jobs))
        for _, jobId in ipairs(jobs) do
            local jobKey = prefix .. jobId
            local priority =
                tonumber(rcall("HGET", jobKey, "priority")) or 0
            if priority == 0 then
                -- LIFO or FIFO
                rcall("LPUSH", targetKey, jobId)
            else
                local score = getPriorityScore(priority, priorityCounterKey)
                rcall("ZADD", prioritizedKey, score, jobId)
            end
            -- Emit waiting event
            rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId",
                  jobId, "prev", "delayed")
            rcall("HSET", jobKey, "delay", 0)
        end
        addBaseMarkerIfNeeded(markerKey, isPaused)
    end
end
local target, isPausedOrMaxed, rateLimitMax, rateLimitDuration = getTargetQueueList(KEYS[9],
    activeKey, waitKey, KEYS[8])
-- Check if there are delayed jobs that we can move to wait.
local markerKey = KEYS[11]
promoteDelayedJobs(delayedKey, markerKey, target, KEYS[3], eventStreamKey, ARGV[1],
                   ARGV[2], KEYS[10], isPausedOrMaxed)
local maxJobs = tonumber(rateLimitMax or (opts['limiter'] and opts['limiter']['max']))
local expireTime = getRateLimitTTL(maxJobs, rateLimiterKey)
-- Check if we are rate limited first.
if expireTime > 0 then return {0, 0, expireTime, 0} end
-- paused or maxed queue
if isPausedOrMaxed then return {0, 0, 0, 0} end
local limiterDuration = (opts['limiter'] and opts['limiter']['duration']) or rateLimitDuration
-- no job ID, try non-blocking move from wait to active
local jobId = rcall("RPOPLPUSH", waitKey, activeKey)
-- Markers in waitlist DEPRECATED in v5: Will be completely removed in v6.
if jobId and string.sub(jobId, 1, 2) == "0:" then
    rcall("LREM", activeKey, 1, jobId)
    jobId = rcall("RPOPLPUSH", waitKey, activeKey)
end
if jobId then
    return prepareJobForProcessing(ARGV[1], rateLimiterKey, eventStreamKey, jobId, ARGV[2],
                                   maxJobs, limiterDuration, markerKey, opts)
else
    jobId = moveJobFromPrioritizedToActive(KEYS[3], activeKey, KEYS[10])
    if jobId then
        return prepareJobForProcessing(ARGV[1], rateLimiterKey, eventStreamKey, jobId, ARGV[2],
                                       maxJobs, limiterDuration, markerKey, opts)
    end
end
-- Return the timestamp for the next delayed job if any.
local nextTimestamp = getNextDelayedTimestamp(delayedKey)
if nextTimestamp ~= nil then return {0, 0, 0, nextTimestamp} end
return {0, 0, 0, 0}
`,keys:11};e.s(["moveToActive",0,rv],438500);let rE={name:"moveToDelayed",content:`--[[
  Moves job from active to delayed set.
  Input:
    KEYS[1] marker key
    KEYS[2] active key
    KEYS[3] prioritized key
    KEYS[4] delayed key
    KEYS[5] job key
    KEYS[6] events stream
    KEYS[7] meta key
    KEYS[8] stalled key
    ARGV[1] key prefix
    ARGV[2] timestamp
    ARGV[3] the id of the job
    ARGV[4] queue token
    ARGV[5] delay value
    ARGV[6] skip attempt
    ARGV[7] optional job fields to update
  Output:
    0 - OK
   -1 - Missing job.
   -3 - Job not in active set.
  Events:
    - delayed key.
]]
local rcall = redis.call
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
--[[
  Function to update a bunch of fields in a job.
]]
local function updateJobFields(jobKey, msgpackedFields)
  if msgpackedFields and #msgpackedFields > 0 then
    local fieldsToUpdate = cmsgpack.unpack(msgpackedFields)
    if fieldsToUpdate then
      rcall("HMSET", jobKey, unpack(fieldsToUpdate))
    end
  end
end
local jobKey = KEYS[5]
local metaKey = KEYS[7]
local token = ARGV[4] 
if rcall("EXISTS", jobKey) == 1 then
    local errorCode = removeLock(jobKey, KEYS[8], token, ARGV[3])
    if errorCode < 0 then
        return errorCode
    end
    updateJobFields(jobKey, ARGV[7])
    local delayedKey = KEYS[4]
    local jobId = ARGV[3]
    local delay = tonumber(ARGV[5])
    local numRemovedElements = rcall("LREM", KEYS[2], -1, jobId)
    if numRemovedElements < 1 then return -3 end
    local score, delayedTimestamp = getDelayedScore(delayedKey, ARGV[2], delay)
    if ARGV[6] == "0" then
        rcall("HINCRBY", jobKey, "atm", 1)
    end
    rcall("HSET", jobKey, "delay", ARGV[5])
    local maxEvents = getOrSetMaxEvents(metaKey)
    rcall("ZADD", delayedKey, score, jobId)
    rcall("XADD", KEYS[6], "MAXLEN", "~", maxEvents, "*", "event", "delayed",
          "jobId", jobId, "delay", delayedTimestamp)
    -- Check if we need to push a marker job to wake up sleeping workers.
    local markerKey = KEYS[1]
    addDelayMarkerIfNeeded(markerKey, delayedKey)
    return 0
else
    return -1
end
`,keys:8};e.s(["moveToDelayed",0,rE],180219);let rK={name:"moveToFinished",content:`--[[
  Move job from active to a finished status (completed o failed)
  A job can only be moved to completed if it was active.
  The job must be locked before it can be moved to a finished status,
  and the lock must be released in this script.
    Input:
      KEYS[1] wait key
      KEYS[2] active key
      KEYS[3] prioritized key
      KEYS[4] event stream key
      KEYS[5] stalled key
      -- Rate limiting
      KEYS[6] rate limiter key
      KEYS[7] delayed key
      KEYS[8] paused key
      KEYS[9] meta key
      KEYS[10] pc priority counter
      KEYS[11] completed/failed key
      KEYS[12] jobId key
      KEYS[13] metrics key
      KEYS[14] marker key
      ARGV[1]  jobId
      ARGV[2]  timestamp
      ARGV[3]  msg property returnvalue / failedReason
      ARGV[4]  return value / failed reason
      ARGV[5]  target (completed/failed)
      ARGV[6]  fetch next?
      ARGV[7]  keys prefix
      ARGV[8]  opts
      ARGV[9]  job fields to update
      opts - token - lock token
      opts - keepJobs
      opts - lockDuration - lock duration in milliseconds
      opts - attempts max attempts
      opts - maxMetricsSize
      opts - fpof - fail parent on fail
      opts - cpof - continue parent on fail
      opts - idof - ignore dependency on fail
      opts - rdof - remove dependency on fail
      opts - name - worker name
    Output:
      0 OK
      -1 Missing key.
      -2 Missing lock.
      -3 Job not in active set
      -4 Job has pending children
      -6 Lock is not owned by this client
      -9 Job has failed children
    Events:
      'completed/failed'
]]
local rcall = redis.call
--- Includes
--[[
  Functions to collect metrics based on a current and previous count of jobs.
  Granualarity is fixed at 1 minute.
]]
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
local function collectMetrics(metaKey, dataPointsList, maxDataPoints,
                                 timestamp)
    -- Increment current count
    local count = rcall("HINCRBY", metaKey, "count", 1) - 1
    -- Compute how many data points we need to add to the list, N.
    local prevTS = rcall("HGET", metaKey, "prevTS")
    if not prevTS then
        -- If prevTS is nil, set it to the current timestamp
        rcall("HSET", metaKey, "prevTS", timestamp, "prevCount", 0)
        return
    end
    local N = math.min(math.floor(timestamp / 60000) - math.floor(prevTS / 60000), tonumber(maxDataPoints))
    if N > 0 then
        local delta = count - rcall("HGET", metaKey, "prevCount")
        -- If N > 1, add N-1 zeros to the list
        if N > 1 then
            local points = {}
            points[1] = delta
            for i = 2, N do
                points[i] = 0
            end
            for from, to in batches(#points, 7000) do
                rcall("LPUSH", dataPointsList, unpack(points, from, to))
            end
        else
            -- LPUSH delta to the list
            rcall("LPUSH", dataPointsList, delta)
        end
        -- LTRIM to keep list to its max size
        rcall("LTRIM", dataPointsList, 0, maxDataPoints - 1)
        -- update prev count with current count
        rcall("HSET", metaKey, "prevCount", count, "prevTS", timestamp)
    end
end
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
--[[
  Function to get current rate limit ttl.
]]
local function getRateLimitTTL(maxJobs, rateLimiterKey)
  if maxJobs and maxJobs <= tonumber(rcall("GET", rateLimiterKey) or 0) then
    local pttl = rcall("PTTL", rateLimiterKey)
    if pttl == 0 then
      rcall("DEL", rateLimiterKey)
    end
    if pttl > 0 then
      return pttl
    end
  end
  return 0
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to move job from prioritized state to active.
]]
local function moveJobFromPrioritizedToActive(priorityKey, activeKey, priorityCounterKey)
  local prioritizedJob = rcall("ZPOPMIN", priorityKey)
  if #prioritizedJob > 0 then
    rcall("LPUSH", activeKey, prioritizedJob[1])
    return prioritizedJob[1]
  else
    rcall("DEL", priorityCounterKey)
  end
end
--[[
  Function to recursively move from waitingChildren to failed.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized)
  if no pending dependencies.
]]
-- Includes
--[[
  Validate and move parent to a wait status (waiting, delayed or prioritized) if needed.
]]
-- Includes
--[[
  Move parent to a wait status (wait, prioritized or delayed)
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
local function moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    local parentWaitKey = parentQueueKey .. ":wait"
    local parentPausedKey = parentQueueKey .. ":paused"
    local parentActiveKey = parentQueueKey .. ":active"
    local parentMetaKey = parentQueueKey .. ":meta"
    local parentMarkerKey = parentQueueKey .. ":marker"
    local jobAttributes = rcall("HMGET", parentKey, "priority", "delay")
    local priority = tonumber(jobAttributes[1]) or 0
    local delay = tonumber(jobAttributes[2]) or 0
    if delay > 0 then
        local delayedTimestamp = tonumber(timestamp) + delay
        local score = delayedTimestamp * 0x1000
        local parentDelayedKey = parentQueueKey .. ":delayed"
        rcall("ZADD", parentDelayedKey, score, parentId)
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "delayed", "jobId", parentId, "delay",
            delayedTimestamp)
        addDelayMarkerIfNeeded(parentMarkerKey, parentDelayedKey)
    else
        if priority == 0 then
            local parentTarget, isParentPausedOrMaxed = getTargetQueueList(parentMetaKey, parentActiveKey,
                parentWaitKey, parentPausedKey)
            addJobInTargetList(parentTarget, parentMarkerKey, "RPUSH", isParentPausedOrMaxed, parentId)
        else
            local isPausedOrMaxed = isQueuePausedOrMaxed(parentMetaKey, parentActiveKey)
            addJobWithPriority(parentMarkerKey, parentQueueKey .. ":prioritized", priority, parentId,
                parentQueueKey .. ":pc", isPausedOrMaxed)
        end
        rcall("XADD", parentQueueKey .. ":events", "*", "event", "waiting", "jobId", parentId, "prev",
            "waiting-children")
    end
end
local function moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then    
      rcall("ZREM", parentWaitingChildrenKey, parentId)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    end
  end
end
local function moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey,
  parentId, timestamp)
  local doNotHavePendingDependencies = rcall("SCARD", parentDependenciesKey) == 0
  if doNotHavePendingDependencies then
    moveParentToWaitIfNeeded(parentQueueKey, parentKey, parentId, timestamp)
  end
end
--[[
  Functions to remove jobs when removeOnFail option is provided.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
--[[
  Functions to remove jobs by max age.
]]
-- Includes
local function removeJobsByMaxAge(timestamp, maxAge, targetSet, prefix,
  shouldRemoveDebounceKey)
  local start = timestamp - maxAge * 1000
  local jobIds = rcall("ZREVRANGEBYSCORE", targetSet, start, "-inf")
  for i, jobId in ipairs(jobIds) do
    removeJob(jobId, false, prefix, false --[[remove debounce key]])
  end
  rcall("ZREMRANGEBYSCORE", targetSet, "-inf", start)
end
--[[
  Functions to remove jobs by max count.
]]
-- Includes
local function removeJobsByMaxCount(maxCount, targetSet, prefix)
  local start = maxCount
  local jobIds = rcall("ZREVRANGE", targetSet, start, -1)
  for i, jobId in ipairs(jobIds) do
    removeJob(jobId, false, prefix, false --[[remove debounce key]])
  end
  rcall("ZREMRANGEBYRANK", targetSet, 0, -(maxCount + 1))
end
local function removeJobsOnFail(queueKeyPrefix, failedKey, jobId, opts, timestamp)
  local removeOnFailType = type(opts["removeOnFail"])
  if removeOnFailType == "number" then
    removeJobsByMaxCount(opts["removeOnFail"],
                        failedKey, queueKeyPrefix)
  elseif removeOnFailType == "boolean" then
    if opts["removeOnFail"] then
      removeJob(jobId, false, queueKeyPrefix,
                false --[[remove debounce key]])
      rcall("ZREM", failedKey, jobId)
    end
  elseif removeOnFailType ~= "nil" then
    local maxAge = opts["removeOnFail"]["age"]
    local maxCount = opts["removeOnFail"]["count"]
    if maxAge ~= nil then
      removeJobsByMaxAge(timestamp, maxAge,
                        failedKey, queueKeyPrefix)
    end
    if maxCount ~= nil and maxCount > 0 then
      removeJobsByMaxCount(maxCount, failedKey,
                            queueKeyPrefix)
    end
  end 
end
local moveParentToFailedIfNeeded = function (parentQueueKey, parentKey, parentId, jobIdKey, timestamp)
  if rcall("EXISTS", parentKey) == 1 then
    local parentWaitingChildrenKey = parentQueueKey .. ":waiting-children"
    local parentDelayedKey = parentQueueKey .. ":delayed"
    local parentPrioritizedKey = parentQueueKey .. ":prioritized"
    local parentWaitingChildrenOrDelayedKey
    local prevState
    if rcall("ZSCORE", parentWaitingChildrenKey, parentId) then
      parentWaitingChildrenOrDelayedKey = parentWaitingChildrenKey
      prevState = "waiting-children"
    elseif rcall("ZSCORE", parentDelayedKey, parentId) then
      parentWaitingChildrenOrDelayedKey = parentDelayedKey
      prevState = "delayed"
      rcall("HSET", parentKey, "delay", 0)
    end
    if parentWaitingChildrenOrDelayedKey then
      rcall("ZREM", parentWaitingChildrenOrDelayedKey, parentId)
      local parentQueuePrefix = parentQueueKey .. ":"
      local parentFailedKey = parentQueueKey .. ":failed"
      local deferredFailure = "child " .. jobIdKey .. " failed"
      rcall("HSET", parentKey, "defa", deferredFailure)
      moveParentToWait(parentQueueKey, parentKey, parentId, timestamp)
    else
      if not rcall("ZSCORE", parentQueueKey .. ":failed", parentId) then
        local deferredFailure = "child " .. jobIdKey .. " failed"
        rcall("HSET", parentKey, "defa", deferredFailure)
      end
    end
  end
end
local moveChildFromDependenciesIfNeeded = function (rawParentData, childKey, failedReason, timestamp)
  if rawParentData then
    local parentData = cjson.decode(rawParentData)
    local parentKey = parentData['queueKey'] .. ':' .. parentData['id']
    local parentDependenciesChildrenKey = parentKey .. ":dependencies"
    if parentData['fpof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        local parentUnsuccesssfulChildrenKey = parentKey .. ":unsuccessful"
        rcall("ZADD", parentUnsuccesssfulChildrenKey, timestamp, childKey)
        moveParentToFailedIfNeeded(
          parentData['queueKey'],
          parentKey,
          parentData['id'],
          childKey,
          timestamp
        )
      end
    elseif parentData['cpof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        local parentFailedChildrenKey = parentKey .. ":failed"
        rcall("HSET", parentFailedChildrenKey, childKey, failedReason)
        moveParentToWaitIfNeeded(parentData['queueKey'], parentKey, parentData['id'], timestamp)
      end
    elseif parentData['idof'] or parentData['rdof'] then
      if rcall("SREM", parentDependenciesChildrenKey, childKey) == 1 then
        moveParentToWaitIfNoPendingDependencies(parentData['queueKey'], parentDependenciesChildrenKey,
          parentKey, parentData['id'], timestamp)
        if parentData['idof'] then
          local parentFailedChildrenKey = parentKey .. ":failed"
          rcall("HSET", parentFailedChildrenKey, childKey, failedReason)
        end
      end
    end
  end
end
--[[
  Function to move job from wait state to active.
  Input:
    opts - token - lock token
    opts - lockDuration
    opts - limiter
]]
-- Includes
local function prepareJobForProcessing(keyPrefix, rateLimiterKey, eventStreamKey,
    jobId, processedOn, maxJobs, limiterDuration, markerKey, opts)
  local jobKey = keyPrefix .. jobId
  -- Check if we need to perform rate limiting.
  if maxJobs then
    local jobCounter = tonumber(rcall("INCR", rateLimiterKey))
    if jobCounter == 1 then
      local integerDuration = math.floor(math.abs(limiterDuration))
      rcall("PEXPIRE", rateLimiterKey, integerDuration)
    end
  end
  -- get a lock
  if opts['token'] ~= "0" then
    local lockKey = jobKey .. ':lock'
    rcall("SET", lockKey, opts['token'], "PX", opts['lockDuration'])
  end
  local optionalValues = {}
  if opts['name'] then
    -- Set "processedBy" field to the worker name
    table.insert(optionalValues, "pb")
    table.insert(optionalValues, opts['name'])
  end
  rcall("XADD", eventStreamKey, "*", "event", "active", "jobId", jobId, "prev", "waiting")
  rcall("HMSET", jobKey, "processedOn", processedOn, unpack(optionalValues))
  rcall("HINCRBY", jobKey, "ats", 1)
  addBaseMarkerIfNeeded(markerKey, false)
  -- rate limit delay must be 0 in this case to prevent adding more delay
  -- when job that is moved to active needs to be processed
  return {rcall("HGETALL", jobKey), jobId, 0, 0} -- get job data
end
--[[
  Updates the delay set, by moving delayed jobs that should
  be processed now to "wait".
     Events:
      'waiting'
]]
-- Includes
-- Try to get as much as 1000 jobs at once
local function promoteDelayedJobs(delayedKey, markerKey, targetKey, prioritizedKey,
                                  eventStreamKey, prefix, timestamp, priorityCounterKey, isPaused)
    local jobs = rcall("ZRANGEBYSCORE", delayedKey, 0, (timestamp + 1) * 0x1000 - 1, "LIMIT", 0, 1000)
    if (#jobs > 0) then
        rcall("ZREM", delayedKey, unpack(jobs))
        for _, jobId in ipairs(jobs) do
            local jobKey = prefix .. jobId
            local priority =
                tonumber(rcall("HGET", jobKey, "priority")) or 0
            if priority == 0 then
                -- LIFO or FIFO
                rcall("LPUSH", targetKey, jobId)
            else
                local score = getPriorityScore(priority, priorityCounterKey)
                rcall("ZADD", prioritizedKey, score, jobId)
            end
            -- Emit waiting event
            rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId",
                  jobId, "prev", "delayed")
            rcall("HSET", jobKey, "delay", 0)
        end
        addBaseMarkerIfNeeded(markerKey, isPaused)
    end
end
--[[
  Function to remove deduplication key if needed
  when a job is moved to completed or failed states.
]]
local function removeDeduplicationKeyIfNeededOnFinalization(prefixKey,
  deduplicationId, jobId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local pttl = rcall("PTTL", deduplicationKey)
    if pttl == 0 then
      return rcall("DEL", deduplicationKey)
    end
    if pttl == -1 then
      local currentJobId = rcall('GET', deduplicationKey)
      if currentJobId and currentJobId == jobId then
        return rcall("DEL", deduplicationKey)
      end
    end
  end
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
--[[
  Function to trim events, default 10000.
]]
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
local function trimEvents(metaKey, eventStreamKey)
  local maxEvents = getOrSetMaxEvents(metaKey)
  if maxEvents then
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", maxEvents)
  else
    rcall("XTRIM", eventStreamKey, "MAXLEN", "~", 10000)
  end
end
--[[
  Validate and move or add dependencies to parent.
]]
-- Includes
local function updateParentDepsIfNeeded(parentKey, parentQueueKey, parentDependenciesKey,
  parentId, jobIdKey, returnvalue, timestamp )
  local processedSet = parentKey .. ":processed"
  rcall("HSET", processedSet, jobIdKey, returnvalue)
  moveParentToWaitIfNoPendingDependencies(parentQueueKey, parentDependenciesKey, parentKey, parentId, timestamp)
end
--[[
  Function to update a bunch of fields in a job.
]]
local function updateJobFields(jobKey, msgpackedFields)
  if msgpackedFields and #msgpackedFields > 0 then
    local fieldsToUpdate = cmsgpack.unpack(msgpackedFields)
    if fieldsToUpdate then
      rcall("HMSET", jobKey, unpack(fieldsToUpdate))
    end
  end
end
local jobIdKey = KEYS[12]
if rcall("EXISTS", jobIdKey) == 1 then -- Make sure job exists
    -- Make sure it does not have pending dependencies
    -- It must happen before removing lock
    if ARGV[5] == "completed" then
        if rcall("SCARD", jobIdKey .. ":dependencies") ~= 0 then
            return -4
        end
        if rcall("ZCARD", jobIdKey .. ":unsuccessful") ~= 0 then
            return -9
        end
    end
    local opts = cmsgpack.unpack(ARGV[8])
    local token = opts['token']
    local errorCode = removeLock(jobIdKey, KEYS[5], token, ARGV[1])
    if errorCode < 0 then
        return errorCode
    end
    updateJobFields(jobIdKey, ARGV[9]);
    local attempts = opts['attempts']
    local maxMetricsSize = opts['maxMetricsSize']
    local maxCount = opts['keepJobs']['count']
    local maxAge = opts['keepJobs']['age']
    local jobAttributes = rcall("HMGET", jobIdKey, "parentKey", "parent", "deid")
    local parentKey = jobAttributes[1] or ""
    local parentId = ""
    local parentQueueKey = ""
    if jobAttributes[2] then -- TODO: need to revisit this logic if it's still needed
        local jsonDecodedParent = cjson.decode(jobAttributes[2])
        parentId = jsonDecodedParent['id']
        parentQueueKey = jsonDecodedParent['queueKey']
    end
    local jobId = ARGV[1]
    local timestamp = ARGV[2]
    -- Remove from active list (if not active we shall return error)
    local numRemovedElements = rcall("LREM", KEYS[2], -1, jobId)
    if (numRemovedElements < 1) then
        return -3
    end
    local eventStreamKey = KEYS[4]
    local metaKey = KEYS[9]
    -- Trim events before emiting them to avoid trimming events emitted in this script
    trimEvents(metaKey, eventStreamKey)
    local prefix = ARGV[7]
    removeDeduplicationKeyIfNeededOnFinalization(prefix, jobAttributes[3], jobId)
    -- If job has a parent we need to
    -- 1) remove this job id from parents dependencies
    -- 2) move the job Id to parent "processed" set
    -- 3) push the results into parent "results" list
    -- 4) if parent's dependencies is empty, then move parent to "wait/paused". Note it may be a different queue!.
    if parentId == "" and parentKey ~= "" then
        parentId = getJobIdFromKey(parentKey)
        parentQueueKey = getJobKeyPrefix(parentKey, ":" .. parentId)
    end
    if parentId ~= "" then
        if ARGV[5] == "completed" then
            local dependenciesSet = parentKey .. ":dependencies"
            if rcall("SREM", dependenciesSet, jobIdKey) == 1 then
                updateParentDepsIfNeeded(parentKey, parentQueueKey, dependenciesSet, parentId, jobIdKey, ARGV[4],
                    timestamp)
            end
        else
            moveChildFromDependenciesIfNeeded(jobAttributes[2], jobIdKey, ARGV[4], timestamp)
        end
    end
    local attemptsMade = rcall("HINCRBY", jobIdKey, "atm", 1)
    -- Remove job?
    if maxCount ~= 0 then
        local targetSet = KEYS[11]
        -- Add to complete/failed set
        rcall("ZADD", targetSet, timestamp, jobId)
        rcall("HSET", jobIdKey, ARGV[3], ARGV[4], "finishedOn", timestamp)
        -- "returnvalue" / "failedReason" and "finishedOn"
        if ARGV[5] == "failed" then
            rcall("HDEL", jobIdKey, "defa")
        end
        -- Remove old jobs?
        if maxAge ~= nil then
            removeJobsByMaxAge(timestamp, maxAge, targetSet, prefix)
        end
        if maxCount ~= nil and maxCount > 0 then
            removeJobsByMaxCount(maxCount, targetSet, prefix)
        end
    else
        removeJobKeys(jobIdKey)
        if parentKey ~= "" then
            -- TODO: when a child is removed when finished, result or failure in parent
            -- must not be deleted, those value references should be deleted when the parent
            -- is deleted
            removeParentDependencyKey(jobIdKey, false, parentKey, jobAttributes[3])
        end
    end
    rcall("XADD", eventStreamKey, "*", "event", ARGV[5], "jobId", jobId, ARGV[3], ARGV[4], "prev", "active")
    if ARGV[5] == "failed" then
        if tonumber(attemptsMade) >= tonumber(attempts) then
            rcall("XADD", eventStreamKey, "*", "event", "retries-exhausted", "jobId", jobId, "attemptsMade",
                attemptsMade)
        end
    end
    -- Collect metrics
    if maxMetricsSize ~= "" then
        collectMetrics(KEYS[13], KEYS[13] .. ':data', maxMetricsSize, timestamp)
    end
    -- Try to get next job to avoid an extra roundtrip if the queue is not closing,
    -- and not rate limited.
    if (ARGV[6] == "1") then
        local target, isPausedOrMaxed, rateLimitMax, rateLimitDuration = getTargetQueueList(metaKey, KEYS[2],
            KEYS[1], KEYS[8])
        local markerKey = KEYS[14]
        -- Check if there are delayed jobs that can be promoted
        promoteDelayedJobs(KEYS[7], markerKey, target, KEYS[3], eventStreamKey, prefix, timestamp, KEYS[10],
            isPausedOrMaxed)
        local maxJobs = tonumber(rateLimitMax or (opts['limiter'] and opts['limiter']['max']))
        -- Check if we are rate limited first.
        local expireTime = getRateLimitTTL(maxJobs, KEYS[6])
        if expireTime > 0 then
            return {0, 0, expireTime, 0}
        end
        -- paused or maxed queue
        if isPausedOrMaxed then
            return {0, 0, 0, 0}
        end
        local limiterDuration = (opts['limiter'] and opts['limiter']['duration']) or rateLimitDuration
        jobId = rcall("RPOPLPUSH", KEYS[1], KEYS[2])
        if jobId then
            -- Markers in waitlist DEPRECATED in v5: Remove in v6.
            if string.sub(jobId, 1, 2) == "0:" then
                rcall("LREM", KEYS[2], 1, jobId)
                -- If jobId is special ID 0:delay (delay greater than 0), then there is no job to process
                -- but if ID is 0:0, then there is at least 1 prioritized job to process
                if jobId == "0:0" then
                    jobId = moveJobFromPrioritizedToActive(KEYS[3], KEYS[2], KEYS[10])
                    return prepareJobForProcessing(prefix, KEYS[6], eventStreamKey, jobId, timestamp, maxJobs,
                        limiterDuration, markerKey, opts)
                end
            else
                return prepareJobForProcessing(prefix, KEYS[6], eventStreamKey, jobId, timestamp, maxJobs,
                    limiterDuration, markerKey, opts)
            end
        else
            jobId = moveJobFromPrioritizedToActive(KEYS[3], KEYS[2], KEYS[10])
            if jobId then
                return prepareJobForProcessing(prefix, KEYS[6], eventStreamKey, jobId, timestamp, maxJobs,
                    limiterDuration, markerKey, opts)
            end
        end
        -- Return the timestamp for the next delayed job if any.
        local nextTimestamp = getNextDelayedTimestamp(KEYS[7])
        if nextTimestamp ~= nil then
            -- The result is guaranteed to be positive, since the
            -- ZRANGEBYSCORE command would have return a job otherwise.
            return {0, 0, 0, nextTimestamp}
        end
    end
    local waitLen = rcall("LLEN", KEYS[1])
    if waitLen == 0 then
        local activeLen = rcall("LLEN", KEYS[2])
        if activeLen == 0 then
            local prioritizedLen = rcall("ZCARD", KEYS[3])
            if prioritizedLen == 0 then
                rcall("XADD", eventStreamKey, "*", "event", "drained")
            end
        end
    end
    return 0
else
    return -1
end
`,keys:14};e.s(["moveToFinished",0,rK],670379);let rS={name:"moveToWaitingChildren",content:`--[[
  Moves job from active to waiting children set.
  Input:
    KEYS[1] active key
    KEYS[2] wait-children key
    KEYS[3] job key
    KEYS[4] job dependencies key
    KEYS[5] job unsuccessful key
    KEYS[6] stalled key
    KEYS[7] events key
    ARGV[1] token
    ARGV[2] child key
    ARGV[3] timestamp
    ARGV[4] jobId
    ARGV[5] prefix
  Output:
    0 - OK
    1 - There are not pending dependencies.
   -1 - Missing job.
   -2 - Missing lock
   -3 - Job not in active set
   -9 - Job has failed children
]]
local rcall = redis.call
local activeKey = KEYS[1]
local waitingChildrenKey = KEYS[2]
local jobKey = KEYS[3]
local jobDependenciesKey = KEYS[4]
local jobUnsuccessfulKey = KEYS[5]
local stalledKey = KEYS[6]
local eventStreamKey = KEYS[7]
local token = ARGV[1]
local timestamp = ARGV[3]
local jobId = ARGV[4]
--- Includes
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
local function removeJobFromActive(activeKey, stalledKey, jobKey, jobId,
    token)
  local errorCode = removeLock(jobKey, stalledKey, token, jobId)
  if errorCode < 0 then
    return errorCode
  end
  local numRemovedElements = rcall("LREM", activeKey, -1, jobId)
  if numRemovedElements < 1 then
    return -3
  end
  return 0
end
local function moveToWaitingChildren(activeKey, waitingChildrenKey, stalledKey, eventStreamKey,
    jobKey, jobId, timestamp, token)
  local errorCode = removeJobFromActive(activeKey, stalledKey, jobKey, jobId, token)
  if errorCode < 0 then
    return errorCode
  end
  local score = tonumber(timestamp)
  rcall("ZADD", waitingChildrenKey, score, jobId)
  rcall("XADD", eventStreamKey, "*", "event", "waiting-children", "jobId", jobId, 'prev', 'active')
  return 0
end
if rcall("EXISTS", jobKey) == 1 then
  if rcall("ZCARD", jobUnsuccessfulKey) ~= 0 then
    return -9
  else
    if ARGV[2] ~= "" then
      if rcall("SISMEMBER", jobDependenciesKey, ARGV[2]) ~= 0 then
        return moveToWaitingChildren(activeKey, waitingChildrenKey, stalledKey, eventStreamKey,
          jobKey, jobId, timestamp, token)
      end
      return 1
    else
      if rcall("SCARD", jobDependenciesKey) ~= 0 then 
        return moveToWaitingChildren(activeKey, waitingChildrenKey, stalledKey, eventStreamKey,
          jobKey, jobId, timestamp, token)
      end
      return 1
    end    
  end
end
return -1
`,keys:7};e.s(["moveToWaitingChildren",0,rS],588850);let rI={name:"obliterate",content:`--[[
  Completely obliterates a queue and all of its contents
  This command completely destroys a queue including all of its jobs, current or past 
  leaving no trace of its existence. Since this script needs to iterate to find all the job
  keys, consider that this call may be slow for very large queues.
  The queue needs to be "paused" or it will return an error
  If the queue has currently active jobs then the script by default will return error,
  however this behaviour can be overrided using the 'force' option.
  Input:
    KEYS[1] meta
    KEYS[2] base
    ARGV[1] count
    ARGV[2] force
]]
local maxCount = tonumber(ARGV[1])
local baseKey = KEYS[2]
local rcall = redis.call
-- Includes
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to remove job.
]]
-- Includes
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local function removeJob(jobId, hard, baseKey, shouldRemoveDeduplicationKey)
  local jobKey = baseKey .. jobId
  removeParentDependencyKey(jobKey, hard, nil, baseKey)
  if shouldRemoveDeduplicationKey then
    local deduplicationId = rcall("HGET", jobKey, "deid")
    removeDeduplicationKeyIfNeededOnRemoval(baseKey, jobId, deduplicationId)
  end
  removeJobKeys(jobKey)
end
local function removeJobs(keys, hard, baseKey, max)
  for i, key in ipairs(keys) do
    removeJob(key, hard, baseKey, true --[[remove debounce key]])
  end
  return max - #keys
end
--[[
  Functions to remove jobs.
]]
-- Includes
--[[
  Function to filter out jobs to ignore from a table.
]]
local function filterOutJobsToIgnore(jobs, jobsToIgnore)
  local filteredJobs = {}
  for i = 1, #jobs do
    if not jobsToIgnore[jobs[i]] then
      table.insert(filteredJobs, jobs[i])
    end
  end
  return filteredJobs
end
local function getListItems(keyName, max)
  return rcall('LRANGE', keyName, 0, max - 1)
end
local function removeListJobs(keyName, hard, baseKey, max, jobsToIgnore)
  local jobs = getListItems(keyName, max)
  if jobsToIgnore then
    jobs = filterOutJobsToIgnore(jobs, jobsToIgnore)
  end
  local count = removeJobs(jobs, hard, baseKey, max)
  rcall("LTRIM", keyName, #jobs, -1)
  return count
end
-- Includes
--[[
  Function to loop in batches.
  Just a bit of warning, some commands as ZREM
  could receive a maximum of 7000 parameters per call.
]]
local function batches(n, batchSize)
  local i = 0
  return function()
    local from = i * batchSize + 1
    i = i + 1
    if (from <= n) then
      local to = math.min(from + batchSize - 1, n)
      return from, to
    end
  end
end
--[[
  Function to get ZSet items.
]]
local function getZSetItems(keyName, max)
  return rcall('ZRANGE', keyName, 0, max - 1)
end
local function removeZSetJobs(keyName, hard, baseKey, max, jobsToIgnore)
  local jobs = getZSetItems(keyName, max)
  if jobsToIgnore then
    jobs = filterOutJobsToIgnore(jobs, jobsToIgnore)
  end
  local count = removeJobs(jobs, hard, baseKey, max)
  if(#jobs > 0) then
    for from, to in batches(#jobs, 7000) do
      rcall("ZREM", keyName, unpack(jobs, from, to))
    end
  end
  return count
end
local function removeLockKeys(keys)
  for i, key in ipairs(keys) do
    rcall("DEL", baseKey .. key .. ':lock')
  end
end
-- 1) Check if paused, if not return with error.
if rcall("HEXISTS", KEYS[1], "paused") ~= 1 then
  return -1 -- Error, NotPaused
end
-- 2) Check if there are active jobs, if there are and not "force" return error.
local activeKey = baseKey .. 'active'
local activeJobs = getListItems(activeKey, maxCount)
if (#activeJobs > 0) then
  if(ARGV[2] == "") then 
    return -2 -- Error, ExistActiveJobs
  end
end
removeLockKeys(activeJobs)
maxCount = removeJobs(activeJobs, true, baseKey, maxCount)
rcall("LTRIM", activeKey, #activeJobs, -1)
if(maxCount <= 0) then
  return 1
end
local delayedKey = baseKey .. 'delayed'
maxCount = removeZSetJobs(delayedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local repeatKey = baseKey .. 'repeat'
local repeatJobsIds = getZSetItems(repeatKey, maxCount)
for i, key in ipairs(repeatJobsIds) do
  local jobKey = repeatKey .. ":" .. key
  rcall("DEL", jobKey)
end
if(#repeatJobsIds > 0) then
  for from, to in batches(#repeatJobsIds, 7000) do
    rcall("ZREM", repeatKey, unpack(repeatJobsIds, from, to))
  end
end
maxCount = maxCount - #repeatJobsIds
if(maxCount <= 0) then
  return 1
end
local completedKey = baseKey .. 'completed'
maxCount = removeZSetJobs(completedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local waitKey = baseKey .. 'paused'
maxCount = removeListJobs(waitKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local prioritizedKey = baseKey .. 'prioritized'
maxCount = removeZSetJobs(prioritizedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
local failedKey = baseKey .. 'failed'
maxCount = removeZSetJobs(failedKey, true, baseKey, maxCount)
if(maxCount <= 0) then
  return 1
end
if(maxCount > 0) then
  rcall("DEL",
    baseKey .. 'events',
    baseKey .. 'delay', 
    baseKey .. 'stalled-check',
    baseKey .. 'stalled',
    baseKey .. 'id',
    baseKey .. 'pc',
    baseKey .. 'meta',
    baseKey .. 'metrics:completed',
    baseKey .. 'metrics:completed:data',
    baseKey .. 'metrics:failed',
    baseKey .. 'metrics:failed:data')
  return 0
else
  return 1
end
`,keys:2};e.s(["obliterate",0,rI],448946);let rw={name:"paginate",content:`--[[
    Paginate a set or hash
    Input:
      KEYS[1] key pointing to the set or hash to be paginated.
      ARGV[1]  page start offset
      ARGV[2]  page end offset (-1 for all the elements)
      ARGV[3]  cursor
      ARGV[4]  offset
      ARGV[5]  max iterations
      ARGV[6]  fetch jobs?
    Output:
      [cursor, offset, items, numItems]
]]
local rcall = redis.call
-- Includes
--[[
  Function to achieve pagination for a set or hash.
  This function simulates pagination in the most efficient way possible
  for a set using sscan or hscan.
  The main limitation is that sets are not order preserving, so the
  pagination is not stable. This means that if the set is modified
  between pages, the same element may appear in different pages.
]] -- Maximum number of elements to be returned by sscan per iteration.
local maxCount = 100
-- Finds the cursor, and returns the first elements available for the requested page.
local function findPage(key, command, pageStart, pageSize, cursor, offset,
                        maxIterations, fetchJobs)
    local items = {}
    local jobs = {}
    local iterations = 0
    repeat
        -- Iterate over the set using sscan/hscan.
        local result = rcall(command, key, cursor, "COUNT", maxCount)
        cursor = result[1]
        local members = result[2]
        local step = 1
        if command == "HSCAN" then
            step = 2
        end
        if #members == 0 then
            -- If the result is empty, we can return the result.
            return cursor, offset, items, jobs
        end
        local chunkStart = offset
        local chunkEnd = offset + #members / step
        local pageEnd = pageStart + pageSize
        if chunkEnd < pageStart then
            -- If the chunk is before the page, we can skip it.
            offset = chunkEnd
        elseif chunkStart > pageEnd then
            -- If the chunk is after the page, we can return the result.
            return cursor, offset, items, jobs
        else
            -- If the chunk is overlapping the page, we need to add the elements to the result.
            for i = 1, #members, step do
                if offset >= pageEnd then
                    return cursor, offset, items, jobs
                end
                if offset >= pageStart then
                    local index = #items + 1
                    if fetchJobs ~= nil then
                        jobs[#jobs+1] = rcall("HGETALL", members[i])
                    end
                    if step == 2 then
                        items[index] = {members[i], members[i + 1]}
                    else
                        items[index] = members[i]
                    end
                end
                offset = offset + 1
            end
        end
        iterations = iterations + 1
    until cursor == "0" or iterations >= maxIterations
    return cursor, offset, items, jobs
end
local key = KEYS[1]
local scanCommand = "SSCAN"
local countCommand = "SCARD"
local type = rcall("TYPE", key)["ok"]
if type == "none" then
    return {0, 0, {}, 0}
elseif type == "hash" then
    scanCommand = "HSCAN"
    countCommand = "HLEN"
elseif type ~= "set" then
    return
        redis.error_reply("Pagination is only supported for sets and hashes.")
end
local numItems = rcall(countCommand, key)
local startOffset = tonumber(ARGV[1])
local endOffset = tonumber(ARGV[2])
if endOffset == -1 then 
  endOffset = numItems
end
local pageSize = (endOffset - startOffset) + 1
local cursor, offset, items, jobs = findPage(key, scanCommand, startOffset,
                                       pageSize, ARGV[3], tonumber(ARGV[4]),
                                       tonumber(ARGV[5]), ARGV[6])
return {cursor, offset, items, numItems, jobs}
`,keys:1};e.s(["paginate",0,rw],80299);let rx={name:"pause",content:`--[[
  Pauses or resumes a queue globably.
  Input:
    KEYS[1] 'wait' or 'paused''
    KEYS[2] 'paused' or 'wait'
    KEYS[3] 'meta'
    KEYS[4] 'prioritized'
    KEYS[5] events stream key
    KEYS[6] 'delayed'
    KEYS|7] 'marker'
    ARGV[1] 'paused' or 'resumed'
  Event:
    publish paused or resumed event.
]]
local rcall = redis.call
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
local markerKey = KEYS[7]
local hasJobs = rcall("EXISTS", KEYS[1]) == 1
--TODO: check this logic to be reused when changing a delay
if hasJobs then rcall("RENAME", KEYS[1], KEYS[2]) end
if ARGV[1] == "paused" then
    rcall("HSET", KEYS[3], "paused", 1)
    rcall("DEL", markerKey)
else
    rcall("HDEL", KEYS[3], "paused")
    if hasJobs or rcall("ZCARD", KEYS[4]) > 0 then
        -- Add marker if there are waiting or priority jobs
        rcall("ZADD", markerKey, 0, "0")
    else
        addDelayMarkerIfNeeded(markerKey, KEYS[6])
    end
end
rcall("XADD", KEYS[5], "*", "event", ARGV[1]);
`,keys:7};e.s(["pause",0,rx],250679);let rT={name:"promote",content:`--[[
  Promotes a job that is currently "delayed" to the "waiting" state
    Input:
      KEYS[1] 'delayed'
      KEYS[2] 'wait'
      KEYS[3] 'paused'
      KEYS[4] 'meta'
      KEYS[5] 'prioritized'
      KEYS[6] 'active'
      KEYS[7] 'pc' priority counter
      KEYS[8] 'event stream'
      KEYS[9] 'marker'
      ARGV[1]  queue.toKey('')
      ARGV[2]  jobId
    Output:
       0 - OK
      -3 - Job not in delayed zset.
    Events:
      'waiting'
]]
local rcall = redis.call
local jobId = ARGV[2]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
if rcall("ZREM", KEYS[1], jobId) == 1 then
    local jobKey = ARGV[1] .. jobId
    local priority = tonumber(rcall("HGET", jobKey, "priority")) or 0
    local metaKey = KEYS[4]
    local markerKey = KEYS[9]
    -- Remove delayed "marker" from the wait list if there is any.
    -- Since we are adding a job we do not need the marker anymore.
    -- Markers in waitlist DEPRECATED in v5: Remove in v6.
    local target, isPausedOrMaxed = getTargetQueueList(metaKey, KEYS[6], KEYS[2], KEYS[3])
    local marker = rcall("LINDEX", target, 0)
    if marker and string.sub(marker, 1, 2) == "0:" then rcall("LPOP", target) end
    if priority == 0 then
        -- LIFO or FIFO
        addJobInTargetList(target, markerKey, "LPUSH", isPausedOrMaxed, jobId)
    else
        addJobWithPriority(markerKey, KEYS[5], priority, jobId, KEYS[7], isPausedOrMaxed)
    end
    rcall("XADD", KEYS[8], "*", "event", "waiting", "jobId", jobId, "prev",
          "delayed");
    rcall("HSET", jobKey, "delay", 0)
    return 0
else
    return -3
end
`,keys:9};e.s(["promote",0,rT],267353);let rR={name:"releaseLock",content:`--[[
  Release lock
    Input:
      KEYS[1] 'lock',
      ARGV[1]  token
      ARGV[2]  lock duration in milliseconds
    Output:
      "OK" if lock extented succesfully.
]]
local rcall = redis.call
if rcall("GET", KEYS[1]) == ARGV[1] then
  return rcall("DEL", KEYS[1])
else
  return 0
end
`,keys:1};e.s(["releaseLock",0,rR],268879);let rj={name:"removeChildDependency",content:`--[[
  Break parent-child dependency by removing
  child reference from parent
  Input:
    KEYS[1] 'key' prefix,
    ARGV[1] job key
    ARGV[2] parent key
    Output:
       0  - OK
       1  - There is not relationship.
      -1  - Missing job key
      -5  - Missing parent key
]]
local rcall = redis.call
local jobKey = ARGV[1]
local parentKey = ARGV[2]
-- Includes
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
if rcall("EXISTS", jobKey) ~= 1 then return -1 end
if rcall("EXISTS", parentKey) ~= 1 then return -5 end
if removeParentDependencyKey(jobKey, false, parentKey, KEYS[1], nil) then
  rcall("HDEL", jobKey, "parentKey", "parent")
  return 0
else
  return 1
end`,keys:1};e.s(["removeChildDependency",0,rj],767432);let rk={name:"removeDeduplicationKey",content:`--[[
  Remove deduplication key if it matches the job id.
  Input:
    KEYS[1] deduplication key
    ARGV[1] job id
  Output:
    0 - false
    1 - true
]]
local rcall = redis.call
local deduplicationKey = KEYS[1]
local jobId = ARGV[1]
local currentJobId = rcall('GET', deduplicationKey)
if currentJobId and currentJobId == jobId then
  return rcall("DEL", deduplicationKey)
end
return 0
`,keys:1};e.s(["removeDeduplicationKey",0,rk],973369);let rA={name:"removeJob",content:`--[[
    Remove a job from all the statuses it may be in as well as all its data.
    In order to be able to remove a job, it cannot be active.
    Input:
      KEYS[1] jobKey
      KEYS[2] repeat key
      ARGV[1] jobId
      ARGV[2] remove children
      ARGV[3] queue prefix
    Events:
      'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Function to check if the job belongs to a job scheduler and
  current delayed job matches with jobId
]]
local function isJobSchedulerJob(jobId, jobKey, jobSchedulersKey)
  local repeatJobKey = rcall("HGET", jobKey, "rjk")
  if repeatJobKey  then
    local prevMillis = rcall("ZSCORE", jobSchedulersKey, repeatJobKey)
    if prevMillis then
      local currentDelayedJobId = "repeat:" .. repeatJobKey .. ":" .. prevMillis
      return jobId == currentDelayedJobId
    end
  end
  return false
end
--[[
  Function to recursively check if there are no locks
  on the jobs to be removed.
  returns:
    boolean
]]
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
local function isLocked( prefix, jobId, removeChildren)
  local jobKey = prefix .. jobId;
  -- Check if this job is locked
  local lockKey = jobKey .. ':lock'
  local lock = rcall("GET", lockKey)
  if not lock then
    if removeChildren == "1" then
      local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
      if (#dependencies > 0) then
        for i, childJobKey in ipairs(dependencies) do
          -- We need to get the jobId for this job.
          local childJobId = getJobIdFromKey(childJobKey)
          local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
          local result = isLocked( childJobPrefix, childJobId, removeChildren )
          if result then
            return true
          end
        end
      end
    end
    return false
  end
  return true
end
--[[
    Remove a job from all the statuses it may be in as well as all its data,
    including its children. Active children can be ignored.
    Events:
      'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove from any state.
  returns:
    prev state
]]
local function removeJobFromAnyState( prefix, jobId)
  -- We start with the ZSCORE checks, since they have O(1) complexity
  if rcall("ZSCORE", prefix .. "completed", jobId) then
    rcall("ZREM", prefix .. "completed", jobId)
    return "completed"
  elseif rcall("ZSCORE", prefix .. "waiting-children", jobId) then
    rcall("ZREM", prefix .. "waiting-children", jobId)
    return "waiting-children"
  elseif rcall("ZSCORE", prefix .. "delayed", jobId) then
    rcall("ZREM", prefix .. "delayed", jobId)
    return "delayed"
  elseif rcall("ZSCORE", prefix .. "failed", jobId) then
    rcall("ZREM", prefix .. "failed", jobId)
    return "failed"
  elseif rcall("ZSCORE", prefix .. "prioritized", jobId) then
    rcall("ZREM", prefix .. "prioritized", jobId)
    return "prioritized"
  -- We remove only 1 element from the list, since we assume they are not added multiple times
  elseif rcall("LREM", prefix .. "wait", 1, jobId) == 1 then
    return "wait"
  elseif rcall("LREM", prefix .. "paused", 1, jobId) == 1 then
    return "paused"
  elseif rcall("LREM", prefix .. "active", 1, jobId) == 1 then
    return "active"
  end
  return "unknown"
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
local removeJobChildren
local removeJobWithChildren
removeJobChildren = function(prefix, jobKey, options)
    -- Check if this job has children
    -- If so, we are going to try to remove the children recursively in a depth-first way
    -- because if some job is locked, we must exit with an error.
    if not options.ignoreProcessed then
        local processed = rcall("HGETALL", jobKey .. ":processed")
        if #processed > 0 then
            for i = 1, #processed, 2 do
                local childJobId = getJobIdFromKey(processed[i])
                local childJobPrefix = getJobKeyPrefix(processed[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
        local failed = rcall("HGETALL", jobKey .. ":failed")
        if #failed > 0 then
            for i = 1, #failed, 2 do
                local childJobId = getJobIdFromKey(failed[i])
                local childJobPrefix = getJobKeyPrefix(failed[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
        local unsuccessful = rcall("ZRANGE", jobKey .. ":unsuccessful", 0, -1)
        if #unsuccessful > 0 then
            for i = 1, #unsuccessful, 1 do
                local childJobId = getJobIdFromKey(unsuccessful[i])
                local childJobPrefix = getJobKeyPrefix(unsuccessful[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
    end
    local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
    if #dependencies > 0 then
        for i, childJobKey in ipairs(dependencies) do
            local childJobId = getJobIdFromKey(childJobKey)
            local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
            removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
        end
    end
end
removeJobWithChildren = function(prefix, jobId, parentKey, options)
    local jobKey = prefix .. jobId
    if options.ignoreLocked then
        if isLocked(prefix, jobId) then
            return
        end
    end
    -- Check if job is in the failed zset
    local failedSet = prefix .. "failed"
    if not (options.ignoreProcessed and rcall("ZSCORE", failedSet, jobId)) then
        removeParentDependencyKey(jobKey, false, parentKey, nil)
        if options.removeChildren then
            removeJobChildren(prefix, jobKey, options)
        end
        local prev = removeJobFromAnyState(prefix, jobId)
        local deduplicationId = rcall("HGET", jobKey, "deid")
        removeDeduplicationKeyIfNeededOnRemoval(prefix, jobId, deduplicationId)
        if removeJobKeys(jobKey) > 0 then
            local metaKey = prefix .. "meta"
            local maxEvents = getOrSetMaxEvents(metaKey)
            rcall("XADD", prefix .. "events", "MAXLEN", "~", maxEvents, "*", "event", "removed",
                "jobId", jobId, "prev", prev)
        end
    end
end
local jobId = ARGV[1]
local shouldRemoveChildren = ARGV[2]
local prefix = ARGV[3]
local jobKey = KEYS[1]
local repeatKey = KEYS[2]
if isJobSchedulerJob(jobId, jobKey, repeatKey) then
    return -8
end
if not isLocked(prefix, jobId, shouldRemoveChildren) then
    local options = {
        removeChildren = shouldRemoveChildren == "1",
        ignoreProcessed = false,
        ignoreLocked = false
    }
    removeJobWithChildren(prefix, jobId, nil, options)
    return 1
end
return 0
`,keys:2};e.s(["removeJob",0,rA],961929);let rO={name:"removeJobScheduler",content:`--[[
  Removes a job scheduler and its next scheduled job.
  Input:
    KEYS[1] job schedulers key
    KEYS[2] delayed jobs key
    KEYS[3] events key
    ARGV[1] job scheduler id
    ARGV[2] prefix key
  Output:
    0 - OK
    1 - Missing repeat job
  Events:
    'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
local jobSchedulerId = ARGV[1]
local prefix = ARGV[2]
local millis = rcall("ZSCORE", KEYS[1], jobSchedulerId)
if millis then
  -- Delete next programmed job.
  local delayedJobId = "repeat:" .. jobSchedulerId .. ":" .. millis
  if(rcall("ZREM", KEYS[2], delayedJobId) == 1) then
    removeJobKeys(prefix .. delayedJobId)
    rcall("XADD", KEYS[3], "*", "event", "removed", "jobId", delayedJobId, "prev", "delayed")
  end
end
if(rcall("ZREM", KEYS[1], jobSchedulerId) == 1) then
  rcall("DEL", KEYS[1] .. ":" .. jobSchedulerId)
  return 0
end
return 1
`,keys:3};e.s(["removeJobScheduler",0,rO],650913);let rD={name:"removeRepeatable",content:`--[[
  Removes a repeatable job
  Input:
    KEYS[1] repeat jobs key
    KEYS[2] delayed jobs key
    KEYS[3] events key
    ARGV[1] old repeat job id
    ARGV[2] options concat
    ARGV[3] repeat job key
    ARGV[4] prefix key
  Output:
    0 - OK
    1 - Missing repeat job
  Events:
    'removed'
]]
local rcall = redis.call
local millis = rcall("ZSCORE", KEYS[1], ARGV[2])
-- Includes
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
-- legacy removal TODO: remove in next breaking change
if millis then
  -- Delete next programmed job.
  local repeatJobId = ARGV[1] .. millis
  if(rcall("ZREM", KEYS[2], repeatJobId) == 1) then
    removeJobKeys(ARGV[4] .. repeatJobId)
    rcall("XADD", KEYS[3], "*", "event", "removed", "jobId", repeatJobId, "prev", "delayed");
  end
end
if(rcall("ZREM", KEYS[1], ARGV[2]) == 1) then
  return 0
end
-- new removal
millis = rcall("ZSCORE", KEYS[1], ARGV[3])
if millis then
  -- Delete next programmed job.
  local repeatJobId = "repeat:" .. ARGV[3] .. ":" .. millis
  if(rcall("ZREM", KEYS[2], repeatJobId) == 1) then
    removeJobKeys(ARGV[4] .. repeatJobId)
    rcall("XADD", KEYS[3], "*", "event", "removed", "jobId", repeatJobId, "prev", "delayed")
  end
end
if(rcall("ZREM", KEYS[1], ARGV[3]) == 1) then
  rcall("DEL", KEYS[1] .. ":" .. ARGV[3])
  return 0
end
return 1
`,keys:3};e.s(["removeRepeatable",0,rD],831351);let rC={name:"removeUnprocessedChildren",content:`--[[
    Remove a job from all the statuses it may be in as well as all its data.
    In order to be able to remove a job, it cannot be active.
    Input:
      KEYS[1] jobKey
      KEYS[2] meta key
      ARGV[1] prefix
      ARGV[2] jobId
    Events:
      'removed' for every children removed
]]
-- Includes
--[[
    Remove a job from all the statuses it may be in as well as all its data,
    including its children. Active children can be ignored.
    Events:
      'removed'
]]
local rcall = redis.call
-- Includes
--[[
  Functions to destructure job key.
  Just a bit of warning, these functions may be a bit slow and affect performance significantly.
]]
local getJobIdFromKey = function (jobKey)
  return string.match(jobKey, ".*:(.*)")
end
local getJobKeyPrefix = function (jobKey, jobId)
  return string.sub(jobKey, 0, #jobKey - #jobId)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check if the job belongs to a job scheduler and
  current delayed job matches with jobId
]]
local function isJobSchedulerJob(jobId, jobKey, jobSchedulersKey)
  local repeatJobKey = rcall("HGET", jobKey, "rjk")
  if repeatJobKey  then
    local prevMillis = rcall("ZSCORE", jobSchedulersKey, repeatJobKey)
    if prevMillis then
      local currentDelayedJobId = "repeat:" .. repeatJobKey .. ":" .. prevMillis
      return jobId == currentDelayedJobId
    end
  end
  return false
end
--[[
  Function to remove deduplication key if needed
  when a job is being removed.
]]
local function removeDeduplicationKeyIfNeededOnRemoval(prefixKey,
  jobId, deduplicationId)
  if deduplicationId then
    local deduplicationKey = prefixKey .. "de:" .. deduplicationId
    local currentJobId = rcall('GET', deduplicationKey)
    if currentJobId and currentJobId == jobId then
      return rcall("DEL", deduplicationKey)
    end
  end
end
--[[
  Function to remove from any state.
  returns:
    prev state
]]
local function removeJobFromAnyState( prefix, jobId)
  -- We start with the ZSCORE checks, since they have O(1) complexity
  if rcall("ZSCORE", prefix .. "completed", jobId) then
    rcall("ZREM", prefix .. "completed", jobId)
    return "completed"
  elseif rcall("ZSCORE", prefix .. "waiting-children", jobId) then
    rcall("ZREM", prefix .. "waiting-children", jobId)
    return "waiting-children"
  elseif rcall("ZSCORE", prefix .. "delayed", jobId) then
    rcall("ZREM", prefix .. "delayed", jobId)
    return "delayed"
  elseif rcall("ZSCORE", prefix .. "failed", jobId) then
    rcall("ZREM", prefix .. "failed", jobId)
    return "failed"
  elseif rcall("ZSCORE", prefix .. "prioritized", jobId) then
    rcall("ZREM", prefix .. "prioritized", jobId)
    return "prioritized"
  -- We remove only 1 element from the list, since we assume they are not added multiple times
  elseif rcall("LREM", prefix .. "wait", 1, jobId) == 1 then
    return "wait"
  elseif rcall("LREM", prefix .. "paused", 1, jobId) == 1 then
    return "paused"
  elseif rcall("LREM", prefix .. "active", 1, jobId) == 1 then
    return "active"
  end
  return "unknown"
end
--[[
  Function to remove job keys.
]]
local function removeJobKeys(jobKey)
  return rcall("DEL", jobKey, jobKey .. ':logs', jobKey .. ':dependencies',
    jobKey .. ':processed', jobKey .. ':failed', jobKey .. ':unsuccessful')
end
--[[
  Check if this job has a parent. If so we will just remove it from
  the parent child list, but if it is the last child we should move the parent to "wait/paused"
  which requires code from "moveToFinished"
]]
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local function _moveParentToWait(parentPrefix, parentId, emitEvent)
  local parentTarget, isPausedOrMaxed = getTargetQueueList(parentPrefix .. "meta", parentPrefix .. "active",
    parentPrefix .. "wait", parentPrefix .. "paused")
  addJobInTargetList(parentTarget, parentPrefix .. "marker", "RPUSH", isPausedOrMaxed, parentId)
  if emitEvent then
    local parentEventStream = parentPrefix .. "events"
    rcall("XADD", parentEventStream, "*", "event", "waiting", "jobId", parentId, "prev", "waiting-children")
  end
end
local function removeParentDependencyKey(jobKey, hard, parentKey, baseKey, debounceId)
  if parentKey then
    local parentDependenciesKey = parentKey .. ":dependencies"
    local result = rcall("SREM", parentDependenciesKey, jobKey)
    if result > 0 then
      local pendingDependencies = rcall("SCARD", parentDependenciesKey)
      if pendingDependencies == 0 then
        local parentId = getJobIdFromKey(parentKey)
        local parentPrefix = getJobKeyPrefix(parentKey, parentId)
        local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
        if numRemovedElements == 1 then
          if hard then -- remove parent in same queue
            if parentPrefix == baseKey then
              removeParentDependencyKey(parentKey, hard, nil, baseKey, nil)
              removeJobKeys(parentKey)
              if debounceId then
                rcall("DEL", parentPrefix .. "de:" .. debounceId)
              end
            else
              _moveParentToWait(parentPrefix, parentId)
            end
          else
            _moveParentToWait(parentPrefix, parentId, true)
          end
        end
      end
      return true
    end
  else
    local parentAttributes = rcall("HMGET", jobKey, "parentKey", "deid")
    local missedParentKey = parentAttributes[1]
    if( (type(missedParentKey) == "string") and missedParentKey ~= ""
      and (rcall("EXISTS", missedParentKey) == 1)) then
      local parentDependenciesKey = missedParentKey .. ":dependencies"
      local result = rcall("SREM", parentDependenciesKey, jobKey)
      if result > 0 then
        local pendingDependencies = rcall("SCARD", parentDependenciesKey)
        if pendingDependencies == 0 then
          local parentId = getJobIdFromKey(missedParentKey)
          local parentPrefix = getJobKeyPrefix(missedParentKey, parentId)
          local numRemovedElements = rcall("ZREM", parentPrefix .. "waiting-children", parentId)
          if numRemovedElements == 1 then
            if hard then
              if parentPrefix == baseKey then
                removeParentDependencyKey(missedParentKey, hard, nil, baseKey, nil)
                removeJobKeys(missedParentKey)
                if parentAttributes[2] then
                  rcall("DEL", parentPrefix .. "de:" .. parentAttributes[2])
                end
              else
                _moveParentToWait(parentPrefix, parentId)
              end
            else
              _moveParentToWait(parentPrefix, parentId, true)
            end
          end
        end
        return true
      end
    end
  end
  return false
end
--[[
  Function to recursively check if there are no locks
  on the jobs to be removed.
  returns:
    boolean
]]
local function isLocked( prefix, jobId, removeChildren)
  local jobKey = prefix .. jobId;
  -- Check if this job is locked
  local lockKey = jobKey .. ':lock'
  local lock = rcall("GET", lockKey)
  if not lock then
    if removeChildren == "1" then
      local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
      if (#dependencies > 0) then
        for i, childJobKey in ipairs(dependencies) do
          -- We need to get the jobId for this job.
          local childJobId = getJobIdFromKey(childJobKey)
          local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
          local result = isLocked( childJobPrefix, childJobId, removeChildren )
          if result then
            return true
          end
        end
      end
    end
    return false
  end
  return true
end
local removeJobChildren
local removeJobWithChildren
removeJobChildren = function(prefix, jobKey, options)
    -- Check if this job has children
    -- If so, we are going to try to remove the children recursively in a depth-first way
    -- because if some job is locked, we must exit with an error.
    if not options.ignoreProcessed then
        local processed = rcall("HGETALL", jobKey .. ":processed")
        if #processed > 0 then
            for i = 1, #processed, 2 do
                local childJobId = getJobIdFromKey(processed[i])
                local childJobPrefix = getJobKeyPrefix(processed[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
        local failed = rcall("HGETALL", jobKey .. ":failed")
        if #failed > 0 then
            for i = 1, #failed, 2 do
                local childJobId = getJobIdFromKey(failed[i])
                local childJobPrefix = getJobKeyPrefix(failed[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
        local unsuccessful = rcall("ZRANGE", jobKey .. ":unsuccessful", 0, -1)
        if #unsuccessful > 0 then
            for i = 1, #unsuccessful, 1 do
                local childJobId = getJobIdFromKey(unsuccessful[i])
                local childJobPrefix = getJobKeyPrefix(unsuccessful[i], childJobId)
                removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
            end
        end
    end
    local dependencies = rcall("SMEMBERS", jobKey .. ":dependencies")
    if #dependencies > 0 then
        for i, childJobKey in ipairs(dependencies) do
            local childJobId = getJobIdFromKey(childJobKey)
            local childJobPrefix = getJobKeyPrefix(childJobKey, childJobId)
            removeJobWithChildren(childJobPrefix, childJobId, jobKey, options)
        end
    end
end
removeJobWithChildren = function(prefix, jobId, parentKey, options)
    local jobKey = prefix .. jobId
    if options.ignoreLocked then
        if isLocked(prefix, jobId) then
            return
        end
    end
    -- Check if job is in the failed zset
    local failedSet = prefix .. "failed"
    if not (options.ignoreProcessed and rcall("ZSCORE", failedSet, jobId)) then
        removeParentDependencyKey(jobKey, false, parentKey, nil)
        if options.removeChildren then
            removeJobChildren(prefix, jobKey, options)
        end
        local prev = removeJobFromAnyState(prefix, jobId)
        local deduplicationId = rcall("HGET", jobKey, "deid")
        removeDeduplicationKeyIfNeededOnRemoval(prefix, jobId, deduplicationId)
        if removeJobKeys(jobKey) > 0 then
            local metaKey = prefix .. "meta"
            local maxEvents = getOrSetMaxEvents(metaKey)
            rcall("XADD", prefix .. "events", "MAXLEN", "~", maxEvents, "*", "event", "removed",
                "jobId", jobId, "prev", prev)
        end
    end
end
local prefix = ARGV[1]
local jobId = ARGV[2]
local jobKey = KEYS[1]
local metaKey = KEYS[2]
local options = {
  removeChildren = "1",
  ignoreProcessed = true,
  ignoreLocked = true
}
removeJobChildren(prefix, jobKey, options) 
`,keys:2};e.s(["removeUnprocessedChildren",0,rC],842664);let rP={name:"reprocessJob",content:`--[[
  Attempts to reprocess a job
  Input:
    KEYS[1] job key
    KEYS[2] events stream
    KEYS[3] job state
    KEYS[4] wait key
    KEYS[5] meta
    KEYS[6] paused key
    KEYS[7] active key
    KEYS[8] marker key
    ARGV[1] job.id
    ARGV[2] (job.opts.lifo ? 'R' : 'L') + 'PUSH'
    ARGV[3] propVal - failedReason/returnvalue
    ARGV[4] prev state - failed/completed
    ARGV[5] reset attemptsMade - "1" or "0"
    ARGV[6] reset attemptsStarted - "1" or "0"
  Output:
     1 means the operation was a success
    -1 means the job does not exist
    -3 means the job was not found in the expected set.
]]
local rcall = redis.call;
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
local jobKey = KEYS[1]
if rcall("EXISTS", jobKey) == 1 then
  local jobId = ARGV[1]
  if (rcall("ZREM", KEYS[3], jobId) == 1) then
    local attributesToRemove = {}
    if ARGV[5] == "1" then
      table.insert(attributesToRemove, "atm")
    end
    if ARGV[6] == "1" then
      table.insert(attributesToRemove, "ats")
    end
    rcall("HDEL", jobKey, "finishedOn", "processedOn", ARGV[3], unpack(attributesToRemove))
    local target, isPausedOrMaxed = getTargetQueueList(KEYS[5], KEYS[7], KEYS[4], KEYS[6])
    addJobInTargetList(target, KEYS[8], ARGV[2], isPausedOrMaxed, jobId)
    local parentKey = rcall("HGET", jobKey, "parentKey")
    if parentKey and rcall("EXISTS", parentKey) == 1 then
      if ARGV[4] == "failed" then
        if rcall("ZREM", parentKey .. ":unsuccessful", jobKey) == 1 or
          rcall("ZREM", parentKey .. ":failed", jobKey) == 1 then
          rcall("SADD", parentKey .. ":dependencies", jobKey)
        end
      else
        if rcall("HDEL", parentKey .. ":processed", jobKey) == 1 then
          rcall("SADD", parentKey .. ":dependencies", jobKey)
        end
      end
    end
    local maxEvents = getOrSetMaxEvents(KEYS[5])
    -- Emit waiting event
    rcall("XADD", KEYS[2], "MAXLEN", "~", maxEvents, "*", "event", "waiting",
      "jobId", jobId, "prev", ARGV[4]);
    return 1
  else
    return -3
  end
else
  return -1
end
`,keys:8};e.s(["reprocessJob",0,rP],402927);let r_={name:"retryJob",content:`--[[
  Retries a failed job by moving it back to the wait queue.
    Input:
      KEYS[1]  'active',
      KEYS[2]  'wait'
      KEYS[3]  'paused'
      KEYS[4]  job key
      KEYS[5]  'meta'
      KEYS[6]  events stream
      KEYS[7]  delayed key
      KEYS[8]  prioritized key
      KEYS[9]  'pc' priority counter
      KEYS[10] 'marker'
      KEYS[11] 'stalled'
      ARGV[1]  key prefix
      ARGV[2]  timestamp
      ARGV[3]  pushCmd
      ARGV[4]  jobId
      ARGV[5]  token
      ARGV[6]  optional job fields to update
    Events:
      'waiting'
    Output:
     0  - OK
     -1 - Missing key
     -2 - Missing lock
     -3 - Job not in active set
]]
local rcall = redis.call
-- Includes
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to check if queue is paused or maxed
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePausedOrMaxed(queueMetaKey, activeKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency")
  if queueAttributes[1] then
    return true
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      return activeCount >= tonumber(queueAttributes[2])
    end
  end
  return false
end
--[[
  Updates the delay set, by moving delayed jobs that should
  be processed now to "wait".
     Events:
      'waiting'
]]
-- Includes
-- Try to get as much as 1000 jobs at once
local function promoteDelayedJobs(delayedKey, markerKey, targetKey, prioritizedKey,
                                  eventStreamKey, prefix, timestamp, priorityCounterKey, isPaused)
    local jobs = rcall("ZRANGEBYSCORE", delayedKey, 0, (timestamp + 1) * 0x1000 - 1, "LIMIT", 0, 1000)
    if (#jobs > 0) then
        rcall("ZREM", delayedKey, unpack(jobs))
        for _, jobId in ipairs(jobs) do
            local jobKey = prefix .. jobId
            local priority =
                tonumber(rcall("HGET", jobKey, "priority")) or 0
            if priority == 0 then
                -- LIFO or FIFO
                rcall("LPUSH", targetKey, jobId)
            else
                local score = getPriorityScore(priority, priorityCounterKey)
                rcall("ZADD", prioritizedKey, score, jobId)
            end
            -- Emit waiting event
            rcall("XADD", eventStreamKey, "*", "event", "waiting", "jobId",
                  jobId, "prev", "delayed")
            rcall("HSET", jobKey, "delay", 0)
        end
        addBaseMarkerIfNeeded(markerKey, isPaused)
    end
end
local function removeLock(jobKey, stalledKey, token, jobId)
  if token ~= "0" then
    local lockKey = jobKey .. ':lock'
    local lockToken = rcall("GET", lockKey)
    if lockToken == token then
      rcall("DEL", lockKey)
      rcall("SREM", stalledKey, jobId)
    else
      if lockToken then
        -- Lock exists but token does not match
        return -6
      else
        -- Lock is missing completely
        return -2
      end
    end
  end
  return 0
end
--[[
  Function to update a bunch of fields in a job.
]]
local function updateJobFields(jobKey, msgpackedFields)
  if msgpackedFields and #msgpackedFields > 0 then
    local fieldsToUpdate = cmsgpack.unpack(msgpackedFields)
    if fieldsToUpdate then
      rcall("HMSET", jobKey, unpack(fieldsToUpdate))
    end
  end
end
local target, isPausedOrMaxed = getTargetQueueList(KEYS[5], KEYS[1], KEYS[2], KEYS[3])
local markerKey = KEYS[10]
-- Check if there are delayed jobs that we can move to wait.
-- test example: when there are delayed jobs between retries
promoteDelayedJobs(KEYS[7], markerKey, target, KEYS[8], KEYS[6], ARGV[1], ARGV[2], KEYS[9], isPausedOrMaxed)
local jobKey = KEYS[4]
if rcall("EXISTS", jobKey) == 1 then
  local errorCode = removeLock(jobKey, KEYS[11], ARGV[5], ARGV[4]) 
  if errorCode < 0 then
    return errorCode
  end
  updateJobFields(jobKey, ARGV[6])
  local numRemovedElements = rcall("LREM", KEYS[1], -1, ARGV[4])
  if (numRemovedElements < 1) then return -3 end
  local priority = tonumber(rcall("HGET", jobKey, "priority")) or 0
  --need to re-evaluate after removing job from active
  isPausedOrMaxed = isQueuePausedOrMaxed(KEYS[5], KEYS[1])
  -- Standard or priority add
  if priority == 0 then
    addJobInTargetList(target, markerKey, ARGV[3], isPausedOrMaxed, ARGV[4])
  else
    addJobWithPriority(markerKey, KEYS[8], priority, ARGV[4], KEYS[9], isPausedOrMaxed)
  end
  rcall("HINCRBY", jobKey, "atm", 1)
  local maxEvents = getOrSetMaxEvents(KEYS[5])
  -- Emit waiting event
  rcall("XADD", KEYS[6], "MAXLEN", "~", maxEvents, "*", "event", "waiting",
    "jobId", ARGV[4], "prev", "active")
  return 0
else
  return -1
end
`,keys:11};e.s(["retryJob",0,r_],473683);let rM={name:"saveStacktrace",content:`--[[
  Save stacktrace and failedReason.
  Input:
    KEYS[1] job key
    ARGV[1]  stacktrace
    ARGV[2]  failedReason
  Output:
     0 - OK
    -1 - Missing key
]]
local rcall = redis.call
if rcall("EXISTS", KEYS[1]) == 1 then
  rcall("HMSET", KEYS[1], "stacktrace", ARGV[1], "failedReason", ARGV[2])
  return 0
else
  return -1
end
`,keys:1};e.s(["saveStacktrace",0,rM],760148);let rN={name:"updateData",content:`--[[
  Update job data
  Input:
    KEYS[1] Job id key
    ARGV[1] data
  Output:
    0 - OK
   -1 - Missing job.
]]
local rcall = redis.call
if rcall("EXISTS",KEYS[1]) == 1 then -- // Make sure job exists
  rcall("HSET", KEYS[1], "data", ARGV[1])
  return 0
else
  return -1
end
`,keys:1};e.s(["updateData",0,rN],505231);let rL={name:"updateJobScheduler",content:`--[[
  Updates a job scheduler and adds next delayed job
  Input:
    KEYS[1]  'repeat' key
    KEYS[2]  'delayed'
    KEYS[3]  'wait' key
    KEYS[4]  'paused' key
    KEYS[5]  'meta'
    KEYS[6]  'prioritized' key
    KEYS[7]  'marker',
    KEYS[8]  'id'
    KEYS[9]  events stream key
    KEYS[10] 'pc' priority counter
    KEYS[11] producer key
    KEYS[12] 'active' key
    ARGV[1] next milliseconds
    ARGV[2] jobs scheduler id
    ARGV[3] Json stringified delayed data
    ARGV[4] msgpacked delayed opts
    ARGV[5] timestamp
    ARGV[6] prefix key
    ARGV[7] producer id
    Output:
      next delayed job id  - OK
]] local rcall = redis.call
local repeatKey = KEYS[1]
local delayedKey = KEYS[2]
local waitKey = KEYS[3]
local pausedKey = KEYS[4]
local metaKey = KEYS[5]
local prioritizedKey = KEYS[6]
local nextMillis = tonumber(ARGV[1])
local jobSchedulerId = ARGV[2]
local timestamp = tonumber(ARGV[5])
local prefixKey = ARGV[6]
local producerId = ARGV[7]
local jobOpts = cmsgpack.unpack(ARGV[4])
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Adds a delayed job to the queue by doing the following:
    - Creates a new job key with the job data.
    - adds to delayed zset.
    - Emits a global event 'delayed' if the job is delayed.
]]
-- Includes
--[[
  Add delay marker if needed.
]]
-- Includes
--[[
  Function to return the next delayed job timestamp.
]]
local function getNextDelayedTimestamp(delayedKey)
  local result = rcall("ZRANGE", delayedKey, 0, 0, "WITHSCORES")
  if #result then
    local nextTimestamp = tonumber(result[2])
    if nextTimestamp ~= nil then
      return nextTimestamp / 0x1000
    end
  end
end
local function addDelayMarkerIfNeeded(markerKey, delayedKey)
  local nextTimestamp = getNextDelayedTimestamp(delayedKey)
  if nextTimestamp ~= nil then
    -- Replace the score of the marker with the newest known
    -- next timestamp.
    rcall("ZADD", markerKey, nextTimestamp, "1")
  end
end
--[[
  Bake in the job id first 12 bits into the timestamp
  to guarantee correct execution order of delayed jobs
  (up to 4096 jobs per given timestamp or 4096 jobs apart per timestamp)
  WARNING: Jobs that are so far apart that they wrap around will cause FIFO to fail
]]
local function getDelayedScore(delayedKey, timestamp, delay)
  local delayedTimestamp = (delay > 0 and (tonumber(timestamp) + delay)) or tonumber(timestamp)
  local minScore = delayedTimestamp * 0x1000
  local maxScore = (delayedTimestamp + 1 ) * 0x1000 - 1
  local result = rcall("ZREVRANGEBYSCORE", delayedKey, maxScore,
    minScore, "WITHSCORES","LIMIT", 0, 1)
  if #result then
    local currentMaxScore = tonumber(result[2])
    if currentMaxScore ~= nil then
      if currentMaxScore >= maxScore then
        return maxScore, delayedTimestamp
      else
        return currentMaxScore + 1, delayedTimestamp
      end
    end
  end
  return minScore, delayedTimestamp
end
local function addDelayedJob(jobId, delayedKey, eventsKey, timestamp,
  maxEvents, markerKey, delay)
  local score, delayedTimestamp = getDelayedScore(delayedKey, timestamp, tonumber(delay))
  rcall("ZADD", delayedKey, score, jobId)
  rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "delayed",
    "jobId", jobId, "delay", delayedTimestamp)
  -- mark that a delayed job is available
  addDelayMarkerIfNeeded(markerKey, delayedKey)
end
--[[
  Function to add job considering priority.
]]
-- Includes
--[[
  Add marker if needed when a job is available.
]]
local function addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
  if not isPausedOrMaxed then
    rcall("ZADD", markerKey, 0, "0")
  end  
end
--[[
  Function to get priority score.
]]
local function getPriorityScore(priority, priorityCounterKey)
  local prioCounter = rcall("INCR", priorityCounterKey)
  return priority * 0x100000000 + prioCounter % 0x100000000
end
local function addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounterKey,
  isPausedOrMaxed)
  local score = getPriorityScore(priority, priorityCounterKey)
  rcall("ZADD", prioritizedKey, score, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function isQueuePaused(queueMetaKey)
  return rcall("HEXISTS", queueMetaKey, "paused") == 1
end
--[[
  Function to store a job
]]
local function storeJob(eventsKey, jobIdKey, jobId, name, data, opts, timestamp,
                        parentKey, parentData, repeatJobKey)
    local jsonOpts = cjson.encode(opts)
    local delay = opts['delay'] or 0
    local priority = opts['priority'] or 0
    local debounceId = opts['de'] and opts['de']['id']
    local optionalValues = {}
    if parentKey ~= nil then
        table.insert(optionalValues, "parentKey")
        table.insert(optionalValues, parentKey)
        table.insert(optionalValues, "parent")
        table.insert(optionalValues, parentData)
    end
    if repeatJobKey then
        table.insert(optionalValues, "rjk")
        table.insert(optionalValues, repeatJobKey)
    end
    if debounceId then
        table.insert(optionalValues, "deid")
        table.insert(optionalValues, debounceId)
    end
    rcall("HMSET", jobIdKey, "name", name, "data", data, "opts", jsonOpts,
          "timestamp", timestamp, "delay", delay, "priority", priority,
          unpack(optionalValues))
    rcall("XADD", eventsKey, "*", "event", "added", "jobId", jobId, "name", name)
    return delay, priority
end
--[[
  Function to check for the meta.paused key to decide if we are paused or not
  (since an empty list and !EXISTS are not really the same).
]]
local function getTargetQueueList(queueMetaKey, activeKey, waitKey, pausedKey)
  local queueAttributes = rcall("HMGET", queueMetaKey, "paused", "concurrency", "max", "duration")
  if queueAttributes[1] then
    return pausedKey, true, queueAttributes[3], queueAttributes[4]
  else
    if queueAttributes[2] then
      local activeCount = rcall("LLEN", activeKey)
      if activeCount >= tonumber(queueAttributes[2]) then
        return waitKey, true, queueAttributes[3], queueAttributes[4]
      else
        return waitKey, false, queueAttributes[3], queueAttributes[4]
      end
    end
  end
  return waitKey, false, queueAttributes[3], queueAttributes[4]
end
--[[
  Function to add job in target list and add marker if needed.
]]
-- Includes
local function addJobInTargetList(targetKey, markerKey, pushCmd, isPausedOrMaxed, jobId)
  rcall(pushCmd, targetKey, jobId)
  addBaseMarkerIfNeeded(markerKey, isPausedOrMaxed)
end
local function addJobFromScheduler(jobKey, jobId, opts, waitKey, pausedKey, activeKey, metaKey, 
  prioritizedKey, priorityCounter, delayedKey, markerKey, eventsKey, name, maxEvents, timestamp,
  data, jobSchedulerId, repeatDelay)
  opts['delay'] = repeatDelay
  opts['jobId'] = jobId
  local delay, priority = storeJob(eventsKey, jobKey, jobId, name, data,
    opts, timestamp, nil, nil, jobSchedulerId)
  if delay ~= 0 then
    addDelayedJob(jobId, delayedKey, eventsKey, timestamp, maxEvents, markerKey, delay)
  else
    local target, isPausedOrMaxed = getTargetQueueList(metaKey, activeKey, waitKey, pausedKey)
    -- Standard or priority add
    if priority == 0 then
      local pushCmd = opts['lifo'] and 'RPUSH' or 'LPUSH'
      addJobInTargetList(target, markerKey, pushCmd, isPausedOrMaxed, jobId)
    else
      -- Priority add
      addJobWithPriority(markerKey, prioritizedKey, priority, jobId, priorityCounter, isPausedOrMaxed)
    end
    -- Emit waiting event
    rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents,  "*", "event", "waiting", "jobId", jobId)
  end
end
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
local function getJobSchedulerEveryNextMillis(prevMillis, every, now, offset, startDate)
    local nextMillis
    if not prevMillis then
        if startDate then
            -- Assuming startDate is passed as milliseconds from JavaScript
            nextMillis = tonumber(startDate)
            nextMillis = nextMillis > now and nextMillis or now
        else
            nextMillis = now
        end
    else
        nextMillis = prevMillis + every
        -- check if we may have missed some iterations
        if nextMillis < now then
            nextMillis = math.floor(now / every) * every + every + (offset or 0)
        end
    end
    if not offset or offset == 0 then
        local timeSlot = math.floor(nextMillis / every) * every;
        offset = nextMillis - timeSlot;
    end
    -- Return a tuple nextMillis, offset
    return math.floor(nextMillis), math.floor(offset)
end
local prevMillis = rcall("ZSCORE", repeatKey, jobSchedulerId)
-- Validate that scheduler exists.
-- If it does not exist we should not iterate anymore.
if prevMillis then
    prevMillis = tonumber(prevMillis)
    local schedulerKey = repeatKey .. ":" .. jobSchedulerId
    local schedulerAttributes = rcall("HMGET", schedulerKey, "name", "data", "every", "startDate", "offset")
    local every = tonumber(schedulerAttributes[3])
    local now = tonumber(timestamp)
    -- If every is not found in scheduler attributes, try to get it from job options
    if not every and jobOpts['repeat'] and jobOpts['repeat']['every'] then
        every = tonumber(jobOpts['repeat']['every'])
    end
    if every then
        local startDate = schedulerAttributes[4]
        local jobOptsOffset = jobOpts['repeat'] and jobOpts['repeat']['offset'] or 0
        local offset = schedulerAttributes[5] or jobOptsOffset or 0
        local newOffset
        nextMillis, newOffset = getJobSchedulerEveryNextMillis(prevMillis, every, now, offset, startDate)
        if not offset then
            rcall("HSET", schedulerKey, "offset", newOffset)
            jobOpts['repeat']['offset'] = newOffset
        end
    end
    local nextDelayedJobId = "repeat:" .. jobSchedulerId .. ":" .. nextMillis
    local nextDelayedJobKey = schedulerKey .. ":" .. nextMillis
    local currentDelayedJobId = "repeat:" .. jobSchedulerId .. ":" .. prevMillis
    if producerId == currentDelayedJobId then
        local eventsKey = KEYS[9]
        local maxEvents = getOrSetMaxEvents(metaKey)
        if rcall("EXISTS", nextDelayedJobKey) ~= 1 then
            rcall("ZADD", repeatKey, nextMillis, jobSchedulerId)
            rcall("HINCRBY", schedulerKey, "ic", 1)
            rcall("INCR", KEYS[8])
            -- TODO: remove this workaround in next breaking change,
            -- all job-schedulers must save job data
            local templateData = schedulerAttributes[2] or ARGV[3]
            if templateData and templateData ~= '{}' then
                rcall("HSET", schedulerKey, "data", templateData)
            end
            local delay = nextMillis - now
            -- Fast Clamp delay to minimum of 0
            if delay < 0 then
                delay = 0
            end
            jobOpts["delay"] = delay
            addJobFromScheduler(nextDelayedJobKey, nextDelayedJobId, jobOpts, waitKey, pausedKey, KEYS[12], metaKey,
                prioritizedKey, KEYS[10], delayedKey, KEYS[7], eventsKey, schedulerAttributes[1], maxEvents, ARGV[5],
                templateData or '{}', jobSchedulerId, delay)
            -- TODO: remove this workaround in next breaking change
            if KEYS[11] ~= "" then
                rcall("HSET", KEYS[11], "nrjid", nextDelayedJobId)
            end
            return nextDelayedJobId .. "" -- convert to string
        else
            rcall("XADD", eventsKey, "MAXLEN", "~", maxEvents, "*", "event", "duplicated", "jobId", nextDelayedJobId)
        end
    end
end
`,keys:12};e.s(["updateJobScheduler",0,rL],885029);let rJ={name:"updateProgress",content:`--[[
  Update job progress
  Input:
    KEYS[1] Job id key
    KEYS[2] event stream key
    KEYS[3] meta key
    ARGV[1] id
    ARGV[2] progress
  Output:
     0 - OK
    -1 - Missing job.
  Event:
    progress(jobId, progress)
]]
local rcall = redis.call
-- Includes
--[[
  Function to get max events value or set by default 10000.
]]
local function getOrSetMaxEvents(metaKey)
  local maxEvents = rcall("HGET", metaKey, "opts.maxLenEvents")
  if not maxEvents then
    maxEvents = 10000
    rcall("HSET", metaKey, "opts.maxLenEvents", maxEvents)
  end
  return maxEvents
end
if rcall("EXISTS", KEYS[1]) == 1 then -- // Make sure job exists
    local maxEvents = getOrSetMaxEvents(KEYS[3])
    rcall("HSET", KEYS[1], "progress", ARGV[2])
    rcall("XADD", KEYS[2], "MAXLEN", "~", maxEvents, "*", "event", "progress",
          "jobId", ARGV[1], "data", ARGV[2]);
    return 0
else
    return -1
end
`,keys:3};e.s(["updateProgress",0,rJ],351296);let rF={name:"updateRepeatableJobMillis",content:`--[[
  Adds a repeatable job
    Input:
      KEYS[1] 'repeat' key
      ARGV[1] next milliseconds
      ARGV[2] custom key
      ARGV[3] legacy custom key TODO: remove this logic in next breaking change
      Output:
        repeatableKey  - OK
]]
local rcall = redis.call
local repeatKey = KEYS[1]
local nextMillis = ARGV[1]
local customKey = ARGV[2]
local legacyCustomKey = ARGV[3]
if rcall("ZSCORE", repeatKey, customKey) then
    rcall("ZADD", repeatKey, nextMillis, customKey)
    return customKey
elseif rcall("ZSCORE", repeatKey, legacyCustomKey) ~= false then
    rcall("ZADD", repeatKey, nextMillis, legacyCustomKey)
    return legacyCustomKey
end
return ''
`,keys:1};e.s(["updateRepeatableJobMillis",0,rF],515409),e.s([],168390),e.i(168390),e.i(113441),e.i(112429),e.i(29456),e.i(495007),e.i(975418),e.i(963190),e.i(397379),e.i(761759),e.i(518407),e.i(38662),e.i(720308),e.i(163161),e.i(955194),e.i(215608),e.i(456069),e.i(821467),e.i(292181),e.i(64765),e.i(54208),e.i(420059),e.i(258113),e.i(77231),e.i(324599),e.i(827958),e.i(744397),e.i(993952),e.i(803171),e.i(754095),e.i(438500),e.i(180219),e.i(670379),e.i(588850),e.i(448946),e.i(80299),e.i(250679),e.i(267353),e.i(268879),e.i(767432),e.i(973369),e.i(961929),e.i(650913),e.i(831351),e.i(842664),e.i(402927),e.i(473683),e.i(760148),e.i(505231),e.i(885029),e.i(351296),e.i(515409),e.s(["addDelayedJob",0,t1,"addJobScheduler",0,t2,"addLog",0,t3,"addParentJob",0,t4,"addPrioritizedJob",0,t6,"addRepeatableJob",0,t5,"addStandardJob",0,t9,"changeDelay",0,t8,"changePriority",0,t7,"cleanJobsInSet",0,re,"drain",0,rt,"extendLock",0,rr,"extendLocks",0,rn,"getCounts",0,ri,"getCountsPerPriority",0,ra,"getDependencyCounts",0,rs,"getJobScheduler",0,ro,"getMetrics",0,rl,"getRanges",0,ru,"getRateLimitTtl",0,rd,"getState",0,rc,"getStateV2",0,rh,"isFinished",0,rp,"isJobInList",0,rm,"isMaxed",0,rf,"moveJobFromActiveToWait",0,ry,"moveJobsToWait",0,rb,"moveStalledJobsToWait",0,rg,"moveToActive",0,rv,"moveToDelayed",0,rE,"moveToFinished",0,rK,"moveToWaitingChildren",0,rS,"obliterate",0,rI,"paginate",0,rw,"pause",0,rx,"promote",0,rT,"releaseLock",0,rR,"removeChildDependency",0,rj,"removeDeduplicationKey",0,rk,"removeJob",0,rA,"removeJobScheduler",0,rO,"removeRepeatable",0,rD,"removeUnprocessedChildren",0,rC,"reprocessJob",0,rP,"retryJob",0,r_,"saveStacktrace",0,rM,"updateData",0,rN,"updateJobScheduler",0,rL,"updateProgress",0,rJ,"updateRepeatableJobMillis",0,rF],40879);var rG=e.i(40879);class rV extends t0.EventEmitter{constructor(e,t){if(super(),this.extraOptions=t,this.capabilities={canDoubleTimeout:!1,canBlockFor1Ms:!0},this.status="initializing",this.packageVersion=tB,this.extraOptions=Object.assign({shared:!1,blocking:!0,skipVersionCheck:!1,skipWaitingForReady:!1},t),ec(e)){if(this._client=e,this._client.options.keyPrefix)throw Error("BullMQ: ioredis does not support ioredis prefixes, use the prefix option instead.");!function(e){return ec(e)&&e.isCluster}(this._client)?this.opts=this._client.options:this.opts=this._client.options.redisOptions,this.checkBlockingOptions("BullMQ: Your redis options maxRetriesPerRequest must be null.",this.opts,!0)}else this.checkBlockingOptions("BullMQ: WARNING! Your redis options maxRetriesPerRequest must be null and will be overridden by BullMQ.",e),this.opts=Object.assign({port:6379,host:"127.0.0.1",retryStrategy:function(e){return Math.max(Math.min(Math.exp(e),2e4),1e3)}},e),this.extraOptions.blocking&&(this.opts.maxRetriesPerRequest=null);this.skipVersionCheck=(null==t?void 0:t.skipVersionCheck)||!!(this.opts&&this.opts.skipVersionCheck),this.handleClientError=e=>{this.emit("error",e)},this.handleClientClose=()=>{this.emit("close")},this.handleClientReady=()=>{this.emit("ready")},this.initializing=this.init(),this.initializing.catch(e=>this.emit("error",e))}checkBlockingOptions(e,t,r=!1){if(this.extraOptions.blocking&&t&&t.maxRetriesPerRequest)if(r)throw Error(e);else console.error(e)}static async waitUntilReady(e){let t,r,n;if("ready"!==e.status){if("wait"===e.status)return e.connect();if("end"===e.status)throw Error(et.CONNECTION_CLOSED_ERROR_MSG);try{await new Promise((i,a)=>{let s;n=e=>{s=e},t=()=>{i()},r=()=>{"end"!==e.status?a(s||Error(et.CONNECTION_CLOSED_ERROR_MSG)):s?a(s):i()},el(e,3),e.once("ready",t),e.on("end",r),e.once("error",n)})}finally{e.removeListener("end",r),e.removeListener("error",n),e.removeListener("ready",t),el(e,-3)}}}get client(){return this.initializing}loadCommands(e,t){let r=t||rG;for(let t in r){let n=`${r[t].name}:${e}`;this._client[n]||this._client.defineCommand(n,{numberOfKeys:r[t].keys,lua:r[t].content})}}async init(){if(!this._client){let e=this.opts,{url:t}=e,r=eA(e,["url"]);this._client=t?new ee.default(t,r):new ee.default(r)}if(el(this._client,3),this._client.on("error",this.handleClientError),this._client.on("close",this.handleClientClose),this._client.on("ready",this.handleClientReady),this.extraOptions.skipWaitingForReady||await rV.waitUntilReady(this._client),this.loadCommands(this.packageVersion),"end"!==this._client.status){if(this.version=await this.getRedisVersion(),!0!==this.skipVersionCheck&&!this.closing){if(ef(this.version,rV.minimumVersion))throw Error(`Redis version needs to be greater or equal than ${rV.minimumVersion} Current: ${this.version}`);ef(this.version,rV.recommendedMinimumVersion)&&console.warn(`It is highly recommended to use a minimum Redis version of ${rV.recommendedMinimumVersion}
             Current: ${this.version}`)}this.capabilities={canDoubleTimeout:!ef(this.version,"6.0.0"),canBlockFor1Ms:!ef(this.version,"7.0.8")},this.status="ready"}return this._client}async disconnect(e=!0){let t=await this.client;if("end"!==t.status){let r,n;if(!e)return t.disconnect();let i=new Promise((e,i)=>{el(t,2),t.once("end",e),t.once("error",i),r=e,n=i});t.disconnect();try{await i}finally{el(t,-2),t.removeListener("end",r),t.removeListener("error",n)}}}async reconnect(){return(await this.client).connect()}async close(e=!1){if(!this.closing){let t=this.status;this.status="closing",this.closing=!0;try{"ready"===t&&await this.initializing,this.extraOptions.shared||("initializing"==t||e?this._client.disconnect():await this._client.quit(),this._client.status="end")}catch(e){if(em(e))throw e}finally{this._client.off("error",this.handleClientError),this._client.off("close",this.handleClientClose),this._client.off("ready",this.handleClientReady),el(this._client,-3),this.removeAllListeners(),this.status="closed"}}}async getRedisVersion(){let e;if(this.skipVersionCheck)return rV.minimumVersion;let t=await this._client.info(),r="redis_version:",n="maxmemory_policy:",i=t.split(/\r?\n/);for(let t=0;t<i.length;t++){if(0===i[t].indexOf(n)){let e=i[t].substr(n.length);"noeviction"!==e&&console.warn(`IMPORTANT! Eviction policy is ${e}. It should be "noeviction"`)}0===i[t].indexOf(r)&&(e=i[t].substr(r.length))}return e}get redisVersion(){return this.version}}rV.minimumVersion="5.0.0",rV.recommendedMinimumVersion="6.2.0",$.EventEmitter;var rq=e.i(612886),rY=$;class rB extends rY.EventEmitter{constructor(e,t={connection:{}},r=rV,n=!1){if(super(),this.name=e,this.opts=t,this.closed=!1,this.hasBlockingConnection=!1,this.hasBlockingConnection=n,this.opts=Object.assign({prefix:"bull"},t),!e)throw Error("Queue name must be provided");if(e.includes(":"))throw Error("Queue name cannot contain :");this.connection=new r(t.connection,{shared:ec(t.connection),blocking:n,skipVersionCheck:t.skipVersionCheck,skipWaitingForReady:t.skipWaitingForReady}),this.connection.on("error",e=>this.emit("error",e)),this.connection.on("close",()=>{this.closing||this.emit("ioredis:close")});const i=new tZ(t.prefix);this.qualifiedName=i.getQueueQualifiedName(e),this.keys=i.getKeys(e),this.toKey=t=>i.toKey(e,t),this.createScripts()}get client(){return this.connection.client}createScripts(){this.scripts=tH(this)}get redisVersion(){return this.connection.redisVersion}get Job(){return tX}emit(e,...t){try{return super.emit(e,...t)}catch(e){try{return super.emit("error",e)}catch(e){return console.error(e),!1}}}waitUntilReady(){return this.client}base64Name(){return Buffer.from(this.name).toString("base64")}clientName(e=""){let t=this.base64Name();return`${this.opts.prefix}:${t}${e}`}async close(){this.closing||(this.closing=this.connection.close()),await this.closing,this.closed=!0}disconnect(){return this.connection.disconnect()}async checkConnectionError(e,t=5e3){try{return await e()}catch(e){if(em(e)&&this.emit("error",e),this.closing||!t)return;await eo(t)}}trace(e,t,r,n,i){return eb(this.opts.telemetry,e,this.name,t,r,n,i)}}class rU extends rB{constructor(e,t,r){super(e,t,r),this.repeatStrategy=t.settings&&t.settings.repeatStrategy||r$}async upsertJobScheduler(e,t,r,n,i,{override:a,producerId:s}){let o,{every:l,limit:u,pattern:d,offset:c}=t;if(d&&l)throw Error("Both .pattern and .every options are defined for this repeatable job");if(!d&&!l)throw Error("Either .pattern or .every options must be defined for this repeatable job");if(t.immediately&&t.startDate)throw Error("Both .immediately and .startDate options are defined for this repeatable job");t.immediately&&t.every&&console.warn("Using option immediately with every does not affect the job's schedule. Job will run immediately anyway.");let h=t.count?t.count+1:1;if(void 0!==t.limit&&h>t.limit)return;let p=Date.now(),{endDate:m}=t;if(m&&p>new Date(m).getTime())return;let f=i.prevMillis||0;p=f<p?p:f;let{immediately:y}=t,b=eA(t,["immediately"]);if(d&&(o=await this.repeatStrategy(p,t,r))<p&&(o=p),o||l)return this.trace(A.PRODUCER,"add",`${this.name}.${r}`,async(c,f)=>{var y,g;let v=i.telemetry;if(f){let e=null==(y=i.telemetry)?void 0:y.omitContext,t=(null==(g=i.telemetry)?void 0:g.metadata)||!e&&f;(t||e)&&(v={metadata:t,omitContext:e})}let E=this.getNextJobOpts(o,e,Object.assign(Object.assign({},i),{repeat:b,telemetry:v}),h,null);if(a){o<p&&(o=p);let[a,h]=await this.scripts.addJobScheduler(e,o,JSON.stringify(void 0===n?{}:n),tX.optsAsJSON(i),{name:r,startDate:t.startDate?new Date(t.startDate).getTime():void 0,endDate:m?new Date(m).getTime():void 0,tz:t.tz,pattern:d,every:l,limit:u,offset:null},tX.optsAsJSON(E),s),f="string"==typeof h?parseInt(h,10):h,y=new this.Job(this,r,n,Object.assign(Object.assign({},E),{delay:f}),a);return y.id=a,null==c||c.setAttributes({[k.JobSchedulerId]:e,[k.JobId]:y.id}),y}{let t=await this.scripts.updateJobSchedulerNextMillis(e,o,JSON.stringify(void 0===n?{}:n),tX.optsAsJSON(E),s);if(t){let i=new this.Job(this,r,n,E,t);return i.id=t,null==c||c.setAttributes({[k.JobSchedulerId]:e,[k.JobId]:i.id}),i}}})}getNextJobOpts(e,t,r,n,i){var a,s;let o=this.getSchedulerNextJobId({jobSchedulerId:t,nextMillis:e}),l=Date.now(),u=e+i-l,d=Object.assign(Object.assign({},r),{jobId:o,delay:u<0?0:u,timestamp:l,prevMillis:e,repeatJobKey:t});return d.repeat=Object.assign(Object.assign({},r.repeat),{offset:i,count:n,startDate:(null==(a=r.repeat)?void 0:a.startDate)?new Date(r.repeat.startDate).getTime():void 0,endDate:(null==(s=r.repeat)?void 0:s.endDate)?new Date(r.repeat.endDate).getTime():void 0}),d}async removeJobScheduler(e){return this.scripts.removeJobScheduler(e)}async getSchedulerData(e,t,r){let n=await e.hgetall(this.toKey("repeat:"+t));return this.transformSchedulerData(t,n,r)}transformSchedulerData(e,t,r){if(t){let n={key:e,name:t.name,next:r};return t.ic&&(n.iterationCount=parseInt(t.ic)),t.limit&&(n.limit=parseInt(t.limit)),t.startDate&&(n.startDate=parseInt(t.startDate)),t.endDate&&(n.endDate=parseInt(t.endDate)),t.tz&&(n.tz=t.tz),t.pattern&&(n.pattern=t.pattern),t.every&&(n.every=parseInt(t.every)),t.offset&&(n.offset=parseInt(t.offset)),(t.data||t.opts)&&(n.template=this.getTemplateFromJSON(t.data,t.opts)),n}if(e.includes(":"))return this.keyToData(e,r)}keyToData(e,t){let r=e.split(":"),n=r.slice(4).join(":")||null;return{key:e,name:r[0],id:r[1]||null,endDate:parseInt(r[2])||null,tz:r[3]||null,pattern:n,next:t}}async getScheduler(e){let[t,r]=await this.scripts.getJobScheduler(e);return this.transformSchedulerData(e,t?ea(t):null,r?parseInt(r):null)}getTemplateFromJSON(e,t){let r={};return e&&(r.data=JSON.parse(e)),t&&(r.opts=tX.optsFromJSON(t)),r}async getJobSchedulers(e=0,t=-1,r=!1){let n=await this.client,i=this.keys.repeat,a=r?await n.zrange(i,e,t,"WITHSCORES"):await n.zrevrange(i,e,t,"WITHSCORES"),s=[];for(let e=0;e<a.length;e+=2)s.push(this.getSchedulerData(n,a[e],parseInt(a[e+1])));return Promise.all(s)}async getSchedulersCount(){let e=this.keys.repeat;return(await this.client).zcard(e)}getSchedulerNextJobId({nextMillis:e,jobSchedulerId:t}){return`repeat:${t}:${e}`}}let r$=(e,t)=>{let{pattern:r}=t,n=new Date(e),i=t.startDate&&new Date(t.startDate),a=(0,rq.parseExpression)(r,Object.assign(Object.assign({},t),{currentDate:i>n?i:n}));try{if(t.immediately)return new Date().getTime();return a.next().getTime()}catch(e){}};var rW=e.i(783295);class rH{constructor(e,t){this.worker=e,this.opts=t,this.trackedJobs=new Map,this.closed=!1}start(){!this.closed&&this.opts.lockRenewTime>0&&this.startLockExtenderTimer()}async extendLocks(e){await this.worker.trace(A.INTERNAL,"extendLocks",this.worker.name,async t=>{null==t||t.setAttributes({[k.WorkerId]:this.opts.workerId,[k.WorkerName]:this.opts.workerName,[k.WorkerJobsToExtendLocks]:e});try{let t=e.map(e=>{var t;return(null==(t=this.trackedJobs.get(e))?void 0:t.token)||""}),r=await this.worker.extendJobLocks(e,t,this.opts.lockDuration);if(r.length>0)for(let e of(this.worker.emit("lockRenewalFailed",r),r))this.worker.emit("error",Error(`could not renew lock for job ${e}`));let n=e.filter(e=>!r.includes(e));n.length>0&&this.worker.emit("locksRenewed",{count:n.length,jobIds:n})}catch(e){this.worker.emit("error",e)}})}startLockExtenderTimer(){clearTimeout(this.lockRenewalTimer),this.closed||(this.lockRenewalTimer=setTimeout(async()=>{let e=Date.now(),t=[];for(let r of this.trackedJobs.keys()){let{ts:n,token:i,abortController:a}=this.trackedJobs.get(r);if(!n){this.trackedJobs.set(r,{token:i,ts:e,abortController:a});continue}n+this.opts.lockRenewTime/2<e&&(this.trackedJobs.set(r,{token:i,ts:e,abortController:a}),t.push(r))}t.length&&await this.extendLocks(t),this.startLockExtenderTimer()},this.opts.lockRenewTime/2))}async close(){this.closed||(this.closed=!0,this.lockRenewalTimer&&(clearTimeout(this.lockRenewalTimer),this.lockRenewalTimer=void 0),this.trackedJobs.clear())}trackJob(e,t,r,n=!1){let i=n?new rW.AbortController:void 0;return!this.closed&&e&&this.trackedJobs.set(e,{token:t,ts:r,abortController:i}),i}untrackJob(e){this.trackedJobs.delete(e)}getActiveJobCount(){return this.trackedJobs.size}isRunning(){return!this.closed&&void 0!==this.lockRenewalTimer}cancelJob(e,t){let r=this.trackedJobs.get(e);return null!=r&&!!r.abortController&&(r.abortController.abort(t),!0)}cancelAllJobs(e){for(let t of this.trackedJobs.values())t.abortController&&t.abortController.abort(e)}getTrackedJobIds(){return Array.from(this.trackedJobs.keys())}}class rz extends rB{getJob(e){return this.Job.fromId(this,e)}commandByType(e,t,r){return e.map(e=>{e="waiting"===e?"wait":e;let n=this.toKey(e);switch(e){case"completed":case"failed":case"delayed":case"prioritized":case"repeat":case"waiting-children":return r(n,t?"zcard":"zrange");case"active":case"wait":case"paused":return r(n,t?"llen":"lrange")}})}sanitizeJobTypes(e){let t="string"==typeof e?[e]:e;if(Array.isArray(t)&&t.length>0){let e=[...t];return -1!==e.indexOf("waiting")&&e.push("paused"),[...new Set(e)]}return["active","completed","delayed","failed","paused","prioritized","waiting","waiting-children"]}async count(){return await this.getJobCountByTypes("waiting","paused","delayed","prioritized","waiting-children")}async getRateLimitTtl(e){return this.scripts.getRateLimitTtl(e)}async getDebounceJobId(e){return(await this.client).get(`${this.keys.de}:${e}`)}async getDeduplicationJobId(e){return(await this.client).get(`${this.keys.de}:${e}`)}async getGlobalConcurrency(){let e=await this.client,t=await e.hget(this.keys.meta,"concurrency");return t?Number(t):null}async getGlobalRateLimit(){let e=await this.client,[t,r]=await e.hmget(this.keys.meta,"max","duration");return t&&r?{max:Number(t),duration:Number(r)}:null}async getJobCountByTypes(...e){return Object.values(await this.getJobCounts(...e)).reduce((e,t)=>e+t,0)}async getJobCounts(...e){let t=this.sanitizeJobTypes(e),r=await this.scripts.getCounts(t),n={};return r.forEach((e,r)=>{n[t[r]]=e||0}),n}getJobState(e){return this.scripts.getState(e)}async getMeta(){let e=await this.client,t=await e.hgetall(this.keys.meta),{concurrency:r,max:n,duration:i,paused:a,"opts.maxLenEvents":s}=t,o=eA(t,["concurrency","max","duration","paused","opts.maxLenEvents"]);return r&&(o.concurrency=Number(r)),s&&(o.maxLenEvents=Number(s)),n&&(o.max=Number(n)),i&&(o.duration=Number(i)),o.paused="1"===a,o}getCompletedCount(){return this.getJobCountByTypes("completed")}getFailedCount(){return this.getJobCountByTypes("failed")}getDelayedCount(){return this.getJobCountByTypes("delayed")}getActiveCount(){return this.getJobCountByTypes("active")}getPrioritizedCount(){return this.getJobCountByTypes("prioritized")}async getCountsPerPriority(e){let t=[...new Set(e)],r=await this.scripts.getCountsPerPriority(t),n={};return r.forEach((e,r)=>{n[`${t[r]}`]=e||0}),n}getWaitingCount(){return this.getJobCountByTypes("waiting")}getWaitingChildrenCount(){return this.getJobCountByTypes("waiting-children")}getWaiting(e=0,t=-1){return this.getJobs(["waiting"],e,t,!0)}getWaitingChildren(e=0,t=-1){return this.getJobs(["waiting-children"],e,t,!0)}getActive(e=0,t=-1){return this.getJobs(["active"],e,t,!0)}getDelayed(e=0,t=-1){return this.getJobs(["delayed"],e,t,!0)}getPrioritized(e=0,t=-1){return this.getJobs(["prioritized"],e,t,!0)}getCompleted(e=0,t=-1){return this.getJobs(["completed"],e,t,!1)}getFailed(e=0,t=-1){return this.getJobs(["failed"],e,t,!1)}async getDependencies(e,t,r,n){let i=this.toKey("processed"==t?`${e}:processed`:`${e}:dependencies`),{items:a,total:s,jobs:o}=await this.scripts.paginate(i,{start:r,end:n,fetchJobs:!0});return{items:a,jobs:o,total:s}}async getRanges(e,t=0,r=1,n=!1){let i=[];this.commandByType(e,!1,(e,t)=>{switch(t){case"lrange":i.push("lrange");break;case"zrange":i.push("zrange")}});let a=await this.scripts.getRanges(e,t,r,n),s=[];return a.forEach((e,t)=>{let r=e||[];s=n&&"lrange"===i[t]?s.concat(r.reverse()):s.concat(r)}),[...new Set(s)]}async getJobs(e,t=0,r=-1,n=!1){let i=this.sanitizeJobTypes(e);return Promise.all((await this.getRanges(i,t,r,n)).map(e=>this.Job.fromId(this,e)))}async getJobLogs(e,t=0,r=-1,n=!0){let i=(await this.client).multi(),a=this.toKey(e+":logs");n?i.lrange(a,t,r):i.lrange(a,-(r+1),-(t+1)),i.llen(a);let s=await i.exec();return n||s[0][1].reverse(),{logs:s[0][1],count:s[1][1]}}async baseGetClients(e){let t=await this.client;try{let r=await t.client("LIST");return this.parseClientList(r,e)}catch(e){if(!ep.test(e.message))throw e;return[{name:"GCP does not support client list"}]}}getWorkers(){let e=`${this.clientName()}`,t=`${this.clientName()}:w:`;return this.baseGetClients(r=>r&&(r===e||r.startsWith(t)))}async getWorkersCount(){return(await this.getWorkers()).length}async getQueueEvents(){let e=`${this.clientName()}:qe`;return this.baseGetClients(t=>t===e)}async getMetrics(e,t=0,r=-1){let[n,i,a]=await this.scripts.getMetrics(e,t,r);return{meta:{count:parseInt(n[0]||"0",10),prevTS:parseInt(n[1]||"0",10),prevCount:parseInt(n[2]||"0",10)},data:i.map(e=>+e||0),count:a}}parseClientList(e,t){let r=e.split(/\r?\n/),n=[];return r.forEach(e=>{let r={};e.split(" ").forEach(function(e){let t=e.indexOf("="),n=e.substring(0,t),i=e.substring(t+1);r[n]=i});let i=r.name;t(i)&&(r.name=this.name,r.rawname=i,n.push(r))}),n}async exportPrometheusMetrics(e){let t=await this.getJobCounts(),r=[];r.push("# HELP bullmq_job_count Number of jobs in the queue by state"),r.push("# TYPE bullmq_job_count gauge");let n=e?Object.keys(e).reduce((t,r)=>`${t}, ${r}="${e[r]}"`,""):"";for(let[e,i]of Object.entries(t))r.push(`bullmq_job_count{queue="${this.name}", state="${e}"${n}} ${i}`);return r.join("\n")}}class rX extends rB{constructor(e,t,r){super(e,t,r),this.repeatStrategy=t.settings&&t.settings.repeatStrategy||rZ,this.repeatKeyHashAlgorithm=t.settings&&t.settings.repeatKeyHashAlgorithm||"md5"}async updateRepeatableJob(e,t,r,{override:n}){var i;let a=Object.assign({},r.repeat);null!=a.pattern||(a.pattern=a.cron),delete a.cron;let s=a.count?a.count+1:1;if(void 0!==a.limit&&s>a.limit)return;let o=Date.now(),{endDate:l}=a;if(l&&o>new Date(l).getTime())return;let u=r.prevMillis||0;o=u<o?o:u;let d=await this.repeatStrategy(o,a,e),{every:c,pattern:h}=a,p=!!((c||h)&&a.immediately),m=p&&c?o-d:void 0;if(d){let o;!u&&r.jobId&&(a.jobId=r.jobId);let f=rQ(e,a),y=null!=(i=r.repeat.key)?i:this.hash(f);if(n)o=await this.scripts.addRepeatableJob(y,d,{name:e,endDate:l?new Date(l).getTime():void 0,tz:a.tz,pattern:h,every:c},f);else{let e=await this.client;o=await this.scripts.updateRepeatableJobMillis(e,y,d,f)}let{immediately:b}=a,g=eA(a,["immediately"]);return this.createNextJob(e,d,o,Object.assign(Object.assign({},r),{repeat:Object.assign({offset:m},g)}),t,s,p)}}async createNextJob(e,t,r,n,i,a,s){let o=this.getRepeatJobKey(e,t,r,i),l=Date.now(),u=t+(n.repeat.offset?n.repeat.offset:0)-l,d=Object.assign(Object.assign({},n),{jobId:o,delay:u<0||s?0:u,timestamp:l,prevMillis:t,repeatJobKey:r});return d.repeat=Object.assign(Object.assign({},n.repeat),{count:a}),this.Job.create(this,e,i,d)}getRepeatJobKey(e,t,r,n){return r.split(":").length>2?this.getRepeatJobId({name:e,nextMillis:t,namespace:this.hash(r),jobId:null==n?void 0:n.id}):this.getRepeatDelayedJobId({customKey:r,nextMillis:t})}async removeRepeatable(e,t,r){var n;let i=rQ(e,Object.assign(Object.assign({},t),{jobId:r})),a=null!=(n=t.key)?n:this.hash(i),s=this.getRepeatJobId({name:e,nextMillis:"",namespace:this.hash(i),jobId:null!=r?r:t.jobId,key:t.key});return this.scripts.removeRepeatable(s,i,a)}async removeRepeatableByKey(e){let t=this.keyToData(e),r=this.getRepeatJobId({name:t.name,nextMillis:"",namespace:this.hash(e),jobId:t.id});return this.scripts.removeRepeatable(r,"",e)}async getRepeatableData(e,t,r){let n=await e.hgetall(this.toKey("repeat:"+t));return n?{key:t,name:n.name,endDate:parseInt(n.endDate)||null,tz:n.tz||null,pattern:n.pattern||null,every:n.every||null,next:r}:this.keyToData(t,r)}keyToData(e,t){let r=e.split(":"),n=r.slice(4).join(":")||null;return{key:e,name:r[0],id:r[1]||null,endDate:parseInt(r[2])||null,tz:r[3]||null,pattern:n,next:t}}async getRepeatableJobs(e=0,t=-1,r=!1){let n=await this.client,i=this.keys.repeat,a=r?await n.zrange(i,e,t,"WITHSCORES"):await n.zrevrange(i,e,t,"WITHSCORES"),s=[];for(let e=0;e<a.length;e+=2)s.push(this.getRepeatableData(n,a[e],parseInt(a[e+1])));return Promise.all(s)}async getRepeatableCount(){return(await this.client).zcard(this.toKey("repeat"))}hash(e){return(0,ew.createHash)(this.repeatKeyHashAlgorithm).update(e).digest("hex")}getRepeatDelayedJobId({nextMillis:e,customKey:t}){return`repeat:${t}:${e}`}getRepeatJobId({name:e,nextMillis:t,namespace:r,jobId:n,key:i}){let a=null!=i?i:this.hash(`${e}${n||""}${r}`);return`repeat:${a}:${t}`}}function rQ(e,t){let r=t.endDate?new Date(t.endDate).getTime():"",n=t.tz||"",i=t.pattern||String(t.every)||"",a=t.jobId?t.jobId:"";return`${e}:${a}:${r}:${n}:${i}`}let rZ=(e,t)=>{let r=t.pattern;if(r&&t.every)throw Error("Both .pattern and .every options are defined for this repeatable job");if(t.every)return Math.floor(e/t.every)*t.every+(t.immediately?0:t.every);let n=new Date(t.startDate&&new Date(t.startDate)>new Date(e)?t.startDate:e),i=(0,rq.parseExpression)(r,Object.assign(Object.assign({},t),{currentDate:n}));try{if(t.immediately)return new Date().getTime();return i.next().getTime()}catch(e){}};var r0=e.i(522734),r1=e.i(792509);(w=q||(q={})).blocking="blocking",w.normal="normal";let r2=new ee.default({host:process.env.REDIS_HOST||"127.0.0.1",port:parseInt(process.env.REDIS_PORT||"6379"),maxRetriesPerRequest:null,enableReadyCheck:!1});r2.on("error",e=>{});var r3=e.i(258809);let r4=[{id:63,name:"JavaScript",monacoLanguage:"javascript",boilerplate:`const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split(/\\s+/);

// write your code here

console.log();`},{id:62,name:"Java",monacoLanguage:"java",boilerplate:`import java.util.*;

public class Main {
    public static void main(String[] args) {

        // write your code here

        
    }
}`},{id:71,name:"Python",monacoLanguage:"python",boilerplate:`import sys

data = sys.stdin.read().split()

# write your code here

print()`},{id:50,name:"C",monacoLanguage:"c",boilerplate:`#include <stdio.h>

int main() {

    // write your code here

    return 0;
}`},{id:54,name:"C++",monacoLanguage:"cpp",boilerplate:`#include <bits/stdc++.h>
using namespace std;

int main() {

    // write your code here

    return 0;
}`},{id:73,name:"Rust",monacoLanguage:"rust",boilerplate:`use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();

    // write your code here
}`},{id:60,name:"Go",monacoLanguage:"go",boilerplate:`package main

import (
    "bufio"
    "os"
)

func main() {
    in := bufio.NewReader(os.Stdin)

    // write your code here

}`},{id:82,name:"SQL",monacoLanguage:"sql",boilerplate:""}];var r6=e.i(668304);let r5=process.env.JUDGE0_URL||"http://localhost:2358";class r9{static languageCache=new Map;static async createSubmission(e,t,r,n,i="SUBMIT",a){let s=r4.find(e=>e.id===r),o=s?.name||`Language_${r}`,l=this.languageCache.get(r);if(!l){let e=await r3.prisma.language.findUnique({where:{judge0Id:r}});if(e)l=e;else try{l=await r3.prisma.language.create({data:{name:o,judge0Id:r}})}catch(e){if("P2002"===e.code){let e=await r3.prisma.language.findUnique({where:{name:o}});if(e)l=e;else{let e=await r3.prisma.language.findUnique({where:{judge0Id:r}});if(!e)throw Error(`Could not create or find language with judge0Id ${r}`);l=e}}else throw e}l&&this.languageCache.set(r,l)}return r3.prisma.submission.create({data:{userId:e,problemId:t,languageId:l.id,code:n,status:"PENDING",mode:i,contestId:a},include:{problem:{include:{testCases:!0}},language:!0}})}static async updateSubmissionStatus(e,t,r,n){await r3.prisma.submission.update({where:{id:e},data:{status:t,time:r,memory:n}});try{(0,r6.revalidateTag)(`submission-${e}`,"max")}catch(e){}}static async createTestCases(e,t){await r3.prisma.$transaction(t.map(t=>r3.prisma.testCase.create({data:{submissionId:e,index:t.index,judge0TrackingId:t.judge0TrackingId,status:"PENDING"}})))}static async updateTestCaseResult(e,t,r,n,i,a){await r3.prisma.testCase.update({where:{judge0TrackingId:e},data:{status:t,time:r,memory:n,errorMessage:i||null,stdout:a||null}})}static async updateTestCasesBatch(e){0!==e.length&&await r3.prisma.$transaction(e.map(e=>r3.prisma.testCase.update({where:{judge0TrackingId:e.judge0TrackingId},data:{status:e.status,time:e.time,memory:e.memory,errorMessage:e.errorMessage||null,stdout:e.stdout||null}})))}static async sendToJudge0(e,t,r){let n=Buffer.from(t).toString("base64"),i=r.map(t=>({language_id:e,source_code:n,stdin:Buffer.from(t.input).toString("base64"),expected_output:Buffer.from(t.output).toString("base64")})),a=new AbortController,s=setTimeout(()=>a.abort(),5e3);try{let e=await fetch(`${r5}/submissions/batch?base64_encoded=true`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({submissions:i}),signal:a.signal});if(clearTimeout(s),!e.ok)throw Error(`Judge0 Error: ${e.statusText}`);return await e.json()}catch(e){throw console.error("Failed to send to Judge0",e),e}finally{clearTimeout(s)}}static async getBatchResults(e){if(0===e.length)return[];let t=e.join(","),r=new AbortController,n=setTimeout(()=>r.abort(),5e3);try{let e=await fetch(`${r5}/submissions/batch?tokens=${t}&base64_encoded=true&fields=token,status,time,memory,compile_output,stderr,stdout`,{method:"GET",signal:r.signal});if(clearTimeout(n),!e.ok){let t=await e.text();throw console.error(`Judge0 Batch Fetch Failed: Status ${e.status}`,t),Error(`Failed to fetch batch results: ${e.status} - ${t}`)}return(await e.json()).submissions.map(e=>({...e,stdout:e.stdout?Buffer.from(e.stdout,"base64").toString("utf-8"):null,stderr:e.stderr?Buffer.from(e.stderr,"base64").toString("utf-8"):null,compile_output:e.compile_output?Buffer.from(e.compile_output,"base64").toString("utf-8"):null}))}catch(e){throw e}finally{clearTimeout(n)}}static async incrementProblemSolved(e,t){await r3.prisma.$transaction(async r=>{if(1===await r.submission.count({where:{problemId:e,userId:t,status:"ACCEPTED",mode:"SUBMIT"}})){let n=await r.problem.findUnique({where:{id:e},select:{difficulty:!0}});if(!n)throw Error("Problem not found");let i=function(e){switch(e){case"EASY":return 5;case"MEDIUM":return 10;case"HARD":return 15;default:return 0}}(n.difficulty);await r.problem.update({where:{id:e},data:{solved:{increment:1}}}),"CONCEPT"!==n.difficulty&&await r.user.update({where:{id:t},data:{problemsSolved:{increment:1},totalScore:{increment:i}}});try{await r2.del(`user-score-${t}`),await r2.del("leaderboard:global");try{(0,r6.updateTag)("categories-list"),(0,r6.updateTag)(`categories-DSA-user-${t}`),(0,r6.updateTag)(`categories-SQL-user-${t}`),(0,r6.updateTag)(`user-submissions-${t}`),(0,r6.updateTag)("problems-list"),(0,r6.updateTag)("problems-search")}catch(e){}}catch(e){console.error("Failed to invalidate cache:",e)}}})}static async getSubmissionById(e){return r3.prisma.submission.findUnique({where:{id:e},include:{problem:{select:{id:!0,title:!0,slug:!0,difficulty:!0}},language:{select:{id:!0,name:!0}},testCases:{orderBy:{index:"asc"}}}})}static async getProblemSubmissions(e,t,r=20,n){let i={where:{problemId:e,userId:t,mode:"SUBMIT"},include:{language:{select:{name:!0}}},take:r,orderBy:{createdAt:"desc"}};return n&&(i.cursor={id:n},i.skip=1),r3.prisma.submission.findMany(i)}static async invalidateClassroomTracking(e){try{let t=await r3.prisma.classroom.findMany({where:{students:{some:{id:e}},isTrackingActive:!0},select:{id:!0}});if(t.length>0){let e=t.map(e=>`algofox:live-tracking:${e.id}`);await r2.del(...e),t.forEach(e=>{try{(0,r6.revalidateTag)(`classroom-${e.id}`,"max")}catch(e){}})}}catch(e){console.error("Failed to invalidate classroom tracking cache:",e)}}}let r8="submission-queue",r7=new class extends rz{constructor(e,t,r){var n;super(e,Object.assign({},t),r),this.token=ek(),this.libName="bullmq",this.jobsOpts=null!=(n=null==t?void 0:t.defaultJobOptions)?n:{},this.waitUntilReady().then(e=>{if(!this.closing&&!(null==t?void 0:t.skipMetasUpdate))return e.hmset(this.keys.meta,this.metaValues)}).catch(e=>{})}emit(e,...t){return super.emit(e,...t)}off(e,t){return super.off(e,t),this}on(e,t){return super.on(e,t),this}once(e,t){return super.once(e,t),this}get defaultJobOptions(){return Object.assign({},this.jobsOpts)}get metaValues(){var e,t,r,n;return{"opts.maxLenEvents":null!=(n=null==(r=null==(t=null==(e=this.opts)?void 0:e.streams)?void 0:t.events)?void 0:r.maxLen)?n:1e4,version:`${this.libName}:${tB}`}}async getVersion(){let e=await this.client;return await e.hget(this.keys.meta,"version")}get repeat(){return new Promise(async e=>{this._repeat||(this._repeat=new rX(this.name,Object.assign(Object.assign({},this.opts),{connection:await this.client})),this._repeat.on("error",e=>this.emit.bind(this,e))),e(this._repeat)})}get jobScheduler(){return new Promise(async e=>{this._jobScheduler||(this._jobScheduler=new rU(this.name,Object.assign(Object.assign({},this.opts),{connection:await this.client})),this._jobScheduler.on("error",e=>this.emit.bind(this,e))),e(this._jobScheduler)})}async setGlobalConcurrency(e){return(await this.client).hset(this.keys.meta,"concurrency",e)}async setGlobalRateLimit(e,t){return(await this.client).hset(this.keys.meta,"max",e,"duration",t)}async removeGlobalConcurrency(){return(await this.client).hdel(this.keys.meta,"concurrency")}async removeGlobalRateLimit(){return(await this.client).hdel(this.keys.meta,"max","duration")}async add(e,t,r){return this.trace(A.PRODUCER,"add",`${this.name}.${e}`,async(n,i)=>{var a;!i||(null==(a=null==r?void 0:r.telemetry)?void 0:a.omitContext)||(r=Object.assign(Object.assign({},r),{telemetry:{metadata:i}}));let s=await this.addJob(e,t,r);return null==n||n.setAttributes({[k.JobName]:e,[k.JobId]:s.id}),s})}async addJob(e,t,r){if(r&&r.repeat){if(r.repeat.endDate&&+new Date(r.repeat.endDate)<Date.now())throw Error("End date must be greater than current timestamp");return(await this.repeat).updateRepeatableJob(e,t,Object.assign(Object.assign({},this.jobsOpts),r),{override:!0})}{let n=null==r?void 0:r.jobId;if("0"==n||(null==n?void 0:n.startsWith("0:")))throw Error("JobId cannot be '0' or start with 0:");let i=await this.Job.create(this,e,t,Object.assign(Object.assign(Object.assign({},this.jobsOpts),r),{jobId:n}));return this.emit("waiting",i),i}}async addBulk(e){return this.trace(A.PRODUCER,"addBulk",this.name,async(t,r)=>(t&&t.setAttributes({[k.BulkNames]:e.map(e=>e.name),[k.BulkCount]:e.length}),await this.Job.createBulk(this,e.map(e=>{var t,n,i,a,s,o;let l=null==(t=e.opts)?void 0:t.telemetry;if(r){let t=null==(i=null==(n=e.opts)?void 0:n.telemetry)?void 0:i.omitContext,o=(null==(s=null==(a=e.opts)?void 0:a.telemetry)?void 0:s.metadata)||!t&&r;(o||t)&&(l={metadata:o,omitContext:t})}return{name:e.name,data:e.data,opts:Object.assign(Object.assign(Object.assign({},this.jobsOpts),e.opts),{jobId:null==(o=e.opts)?void 0:o.jobId,telemetry:l})}}))))}async upsertJobScheduler(e,t,r){var n,i;if(t.endDate&&+new Date(t.endDate)<Date.now())throw Error("End date must be greater than current timestamp");return(await this.jobScheduler).upsertJobScheduler(e,t,null!=(n=null==r?void 0:r.name)?n:e,null!=(i=null==r?void 0:r.data)?i:{},Object.assign(Object.assign({},this.jobsOpts),null==r?void 0:r.opts),{override:!0})}async pause(){await this.trace(A.INTERNAL,"pause",this.name,async()=>{await this.scripts.pause(!0),this.emit("paused")})}async close(){await this.trace(A.INTERNAL,"close",this.name,async()=>{!this.closing&&this._repeat&&await this._repeat.close(),await super.close()})}async rateLimit(e){await this.trace(A.INTERNAL,"rateLimit",this.name,async t=>{null==t||t.setAttributes({[k.QueueRateLimit]:e}),await this.client.then(t=>t.set(this.keys.limiter,Number.MAX_SAFE_INTEGER,"PX",e))})}async resume(){await this.trace(A.INTERNAL,"resume",this.name,async()=>{await this.scripts.pause(!1),this.emit("resumed")})}async isPaused(){let e=await this.client;return 1===await e.hexists(this.keys.meta,"paused")}isMaxed(){return this.scripts.isMaxed()}async getRepeatableJobs(e,t,r){return(await this.repeat).getRepeatableJobs(e,t,r)}async getJobScheduler(e){return(await this.jobScheduler).getScheduler(e)}async getJobSchedulers(e,t,r){return(await this.jobScheduler).getJobSchedulers(e,t,r)}async getJobSchedulersCount(){return(await this.jobScheduler).getSchedulersCount()}async removeRepeatable(e,t,r){return this.trace(A.INTERNAL,"removeRepeatable",`${this.name}.${e}`,async n=>{null==n||n.setAttributes({[k.JobName]:e,[k.JobId]:r});let i=await this.repeat;return!await i.removeRepeatable(e,t,r)})}async removeJobScheduler(e){let t=await this.jobScheduler;return!await t.removeJobScheduler(e)}async removeDebounceKey(e){return this.trace(A.INTERNAL,"removeDebounceKey",`${this.name}`,async t=>{null==t||t.setAttributes({[k.JobKey]:e});let r=await this.client;return await r.del(`${this.keys.de}:${e}`)})}async removeDeduplicationKey(e){return this.trace(A.INTERNAL,"removeDeduplicationKey",`${this.name}`,async t=>(null==t||t.setAttributes({[k.DeduplicationKey]:e}),(await this.client).del(`${this.keys.de}:${e}`)))}async removeRateLimitKey(){return(await this.client).del(this.keys.limiter)}async removeRepeatableByKey(e){return this.trace(A.INTERNAL,"removeRepeatableByKey",`${this.name}`,async t=>{null==t||t.setAttributes({[k.JobKey]:e});let r=await this.repeat;return!await r.removeRepeatableByKey(e)})}async remove(e,{removeChildren:t=!0}={}){return this.trace(A.INTERNAL,"remove",this.name,async r=>{null==r||r.setAttributes({[k.JobId]:e,[k.JobOptions]:JSON.stringify({removeChildren:t})});let n=await this.scripts.remove(e,t);return 1===n&&this.emit("removed",e),n})}async updateJobProgress(e,t){await this.trace(A.INTERNAL,"updateJobProgress",this.name,async r=>{null==r||r.setAttributes({[k.JobId]:e,[k.JobProgress]:JSON.stringify(t)}),await this.scripts.updateProgress(e,t),this.emit("progress",e,t)})}async addJobLog(e,t,r){return tX.addJobLog(this,e,t,r)}async drain(e=!1){await this.trace(A.INTERNAL,"drain",this.name,async t=>{null==t||t.setAttributes({[k.QueueDrainDelay]:e}),await this.scripts.drain(e)})}async clean(e,t,r="completed"){return this.trace(A.INTERNAL,"clean",this.name,async n=>{let i=t||1/0,a=Math.min(1e4,i),s=Date.now()-e,o=0,l=[],u="waiting"===r?"wait":r;for(;o<i;){let e=await this.scripts.cleanJobsInSet(u,s,a);if(this.emit("cleaned",e,u),o+=e.length,l.push(...e),e.length<a)break}return null==n||n.setAttributes({[k.QueueGrace]:e,[k.JobType]:r,[k.QueueCleanLimit]:i,[k.JobIds]:l}),l})}async obliterate(e){await this.trace(A.INTERNAL,"obliterate",this.name,async()=>{await this.pause();let t=0;do t=await this.scripts.obliterate(Object.assign({force:!1,count:1e3},e));while(t)})}async retryJobs(e={}){await this.trace(A.PRODUCER,"retryJobs",this.name,async t=>{null==t||t.setAttributes({[k.QueueOptions]:JSON.stringify(e)});let r=0;do r=await this.scripts.retryJobs(e.state,e.count,e.timestamp);while(r)})}async promoteJobs(e={}){await this.trace(A.INTERNAL,"promoteJobs",this.name,async t=>{null==t||t.setAttributes({[k.QueueOptions]:JSON.stringify(e)});let r=0;do r=await this.scripts.promoteJobs(e.count);while(r)})}async trimEvents(e){return this.trace(A.INTERNAL,"trimEvents",this.name,async t=>{null==t||t.setAttributes({[k.QueueEventMaxLength]:e});let r=await this.client;return await r.xtrim(this.keys.events,"MAXLEN","~",e)})}async removeDeprecatedPriorityKey(){return(await this.client).del(this.toKey("priority"))}}(r8,{connection:r2}),ne=async e=>{await r7.add("process-submission",{submissionId:e})},nt=e=>3===e?"ACCEPTED":4===e?"WRONG_ANSWER":5===e?"TIME_LIMIT_EXCEEDED":6===e?"COMPILE_ERROR":e>=7&&e<=12?"RUNTIME_ERROR":null;new class extends rB{static RateLimitError(){return new eE}constructor(e,t,r,n){if(super(e,Object.assign(Object.assign({drainDelay:5,concurrency:1,lockDuration:3e4,maximumRateLimitDelay:3e4,maxStalledCount:1,stalledInterval:3e4,autorun:!0,runRetryDelay:15e3},r),{blockingConnection:!0}),n),this.abortDelayController=null,this.blockUntil=0,this.drained=!1,this.limitUntil=0,this.processorAcceptsSignal=!1,this.waiting=null,this.running=!1,this.mainLoopRunning=null,!r||!r.connection)throw Error("Worker requires a connection");if("number"!=typeof this.opts.maxStalledCount||this.opts.maxStalledCount<0)throw Error("maxStalledCount must be greater or equal than 0");if("number"==typeof this.opts.maxStartedAttempts&&this.opts.maxStartedAttempts<0)throw Error("maxStartedAttempts must be greater or equal than 0");if("number"!=typeof this.opts.stalledInterval||this.opts.stalledInterval<=0)throw Error("stalledInterval must be greater than 0");if("number"!=typeof this.opts.drainDelay||this.opts.drainDelay<=0)throw Error("drainDelay must be greater than 0");if(this.concurrency=this.opts.concurrency,this.opts.lockRenewTime=this.opts.lockRenewTime||this.opts.lockDuration/2,this.id=ek(),this.createLockManager(),t){if("function"==typeof t)this.processFn=t,this.processorAcceptsSignal=t.length>=3;else{if(t instanceof r1.URL){if(!r0.existsSync(t))throw Error(`URL ${t} does not exist in the local file system`);t=t.href}else{const e=t+([".js",".ts",".flow",".cjs",".mjs"].includes(Q.extname(t))?"":".js");if(!r0.existsSync(e))throw Error(`File ${e} does not exist`)}const e=Q.dirname(module.filename||"/ROOT/node_modules/bullmq/dist/esm/classes/worker.js"),r=Q.join(e,"main-worker.js"),n=Q.join(e,"main.js");let i=this.opts.useWorkerThreads?r:n;try{r0.statSync(i)}catch(t){const e=this.opts.useWorkerThreads?"main-worker.js":"main.js";i=Q.join(process.cwd(),`dist/cjs/classes/${e}`),r0.statSync(i)}this.childPool=new Z({mainFile:i,useWorkerThreads:this.opts.useWorkerThreads,workerForkOptions:this.opts.workerForkOptions,workerThreadsOptions:this.opts.workerThreadsOptions}),this.createSandbox(t)}this.opts.autorun&&this.run().catch(e=>this.emit("error",e))}const i=this.clientName()+(this.opts.name?`:w:${this.opts.name}`:"");this.blockingConnection=new rV(ec(r.connection)?r.connection.duplicate({connectionName:i}):Object.assign(Object.assign({},r.connection),{connectionName:i}),{shared:!1,blocking:!0,skipVersionCheck:r.skipVersionCheck}),this.blockingConnection.on("error",e=>this.emit("error",e)),this.blockingConnection.on("ready",()=>setTimeout(()=>this.emit("ready"),0))}createLockManager(){this.lockManager=new rH(this,{lockRenewTime:this.opts.lockRenewTime,lockDuration:this.opts.lockDuration,workerId:this.id,workerName:this.opts.name})}createSandbox(e){let t;this.processFn=(t=this.childPool,async function(r,n){let i,a,s;try{let o=new Promise((o,l)=>{(async()=>{try{s=(e,t)=>{l(Error("Unexpected exit code: "+e+" signal: "+t))},(i=await t.retain(e)).on("exit",s),a=async e=>{var t,n,a,s,u;try{switch(e.cmd){case R.Completed:o(e.value);break;case R.Failed:case R.Error:{let t=Error();Object.assign(t,e.value),l(t);break}case R.Progress:await r.updateProgress(e.value);break;case R.Log:await r.log(e.value);break;case R.MoveToDelayed:await r.moveToDelayed(null==(t=e.value)?void 0:t.timestamp,null==(n=e.value)?void 0:n.token);break;case R.MoveToWait:await r.moveToWait(null==(a=e.value)?void 0:a.token);break;case R.MoveToWaitingChildren:{let t=await r.moveToWaitingChildren(null==(s=e.value)?void 0:s.token,null==(u=e.value)?void 0:u.opts);i.send({requestId:e.requestId,cmd:x.MoveToWaitingChildrenResponse,value:t})}break;case R.Update:await r.updateData(e.value);break;case R.GetChildrenValues:{let t=await r.getChildrenValues();i.send({requestId:e.requestId,cmd:x.GetChildrenValuesResponse,value:t})}break;case R.GetIgnoredChildrenFailures:{let t=await r.getIgnoredChildrenFailures();i.send({requestId:e.requestId,cmd:x.GetIgnoredChildrenFailuresResponse,value:t})}}}catch(e){l(e)}},i.on("message",a),i.send({cmd:x.Start,job:r.asJSONSandbox(),token:n})}catch(e){l(e)}})()});return await o,o}finally{i&&(i.off("message",a),i.off("exit",s),null===i.exitCode&&null===i.signalCode&&t.release(i))}}).bind(this)}async extendJobLocks(e,t,r){return this.scripts.extendLocks(e,t,r)}emit(e,...t){return super.emit(e,...t)}off(e,t){return super.off(e,t),this}on(e,t){return super.on(e,t),this}once(e,t){return super.once(e,t),this}callProcessJob(e,t,r){return this.processFn(e,t,r)}createJob(e,t){return this.Job.fromJSON(this,e,t)}async waitUntilReady(){return await super.waitUntilReady(),this.blockingConnection.client}cancelJob(e,t){return this.lockManager.cancelJob(e,t)}cancelAllJobs(e){this.lockManager.cancelAllJobs(e)}set concurrency(e){if("number"!=typeof e||e<1||!isFinite(e))throw Error("concurrency must be a finite number greater than 0");this._concurrency=e}get concurrency(){return this._concurrency}get repeat(){return new Promise(async e=>{if(!this._repeat){let e=await this.client;this._repeat=new rX(this.name,Object.assign(Object.assign({},this.opts),{connection:e})),this._repeat.on("error",e=>this.emit.bind(this,e))}e(this._repeat)})}get jobScheduler(){return new Promise(async e=>{if(!this._jobScheduler){let e=await this.client;this._jobScheduler=new rU(this.name,Object.assign(Object.assign({},this.opts),{connection:e})),this._jobScheduler.on("error",e=>this.emit.bind(this,e))}e(this._jobScheduler)})}async run(){if(!this.processFn)throw Error("No process function is defined.");if(this.running)throw Error("Worker is already running.");try{if(this.running=!0,this.closing||this.paused)return;await this.startStalledCheckTimer(),this.opts.skipLockRenewal||this.lockManager.start();let e=await this.client,t=await this.blockingConnection.client;this.mainLoopRunning=this.mainLoop(e,t),await this.mainLoopRunning}finally{this.running=!1}}async waitForRateLimit(){var e;let t=this.limitUntil;if(t>Date.now()){null==(e=this.abortDelayController)||e.abort(),this.abortDelayController=new rW.AbortController;let r=this.getRateLimitDelay(t-Date.now());await this.delay(r,this.abortDelayController),this.drained=!1,this.limitUntil=0}}async mainLoop(e,t){let r=new f,n=0;for(;!this.closing&&!this.paused||r.numTotal()>0;){let i;for(;!this.closing&&!this.paused&&!this.waiting&&r.numTotal()<this._concurrency&&!this.isRateLimited();){let i=`${this.id}:${n++}`,a=this.retryIfFailed(()=>this._getNextJob(e,t,i,{block:!0}),{delayInMs:this.opts.runRetryDelay,onlyEmitError:!0});if(r.add(a),this.waiting&&r.numTotal()>1||!await a&&r.numTotal()>1||this.blockUntil)break}do i=await r.fetch();while(!i&&r.numQueued()>0)if(i){let e=i.token;r.add(this.processJob(i,e,()=>r.numTotal()<=this._concurrency))}else 0===r.numQueued()&&await this.waitForRateLimit()}}async getNextJob(e,{block:t=!0}={}){var r,n;let i=await this._getNextJob(await this.client,await this.blockingConnection.client,e,{block:t});return this.trace(A.INTERNAL,"getNextJob",this.name,async e=>(null==e||e.setAttributes({[k.WorkerId]:this.id,[k.QueueName]:this.name,[k.WorkerName]:this.opts.name,[k.WorkerOptions]:JSON.stringify({block:t}),[k.JobId]:null==i?void 0:i.id}),i),null==(n=null==(r=null==i?void 0:i.opts)?void 0:r.telemetry)?void 0:n.metadata)}async _getNextJob(e,t,r,{block:n=!0}={}){if(!this.paused&&!this.closing){if(this.drained&&n&&!this.limitUntil&&!this.waiting){this.waiting=this.waitForJob(t,this.blockUntil);try{if(this.blockUntil=await this.waiting,this.blockUntil<=0||this.blockUntil-Date.now()<1)return await this.moveToActive(e,r,this.opts.name)}finally{this.waiting=null}}else if(!this.isRateLimited())return this.moveToActive(e,r,this.opts.name)}}async rateLimit(e){await this.trace(A.INTERNAL,"rateLimit",this.name,async t=>{null==t||t.setAttributes({[k.WorkerId]:this.id,[k.WorkerRateLimit]:e}),await this.client.then(t=>t.set(this.keys.limiter,Number.MAX_SAFE_INTEGER,"PX",e))})}get minimumBlockTimeout(){return this.blockingConnection.capabilities.canBlockFor1Ms?.001:.002}isRateLimited(){return this.limitUntil>Date.now()}async moveToActive(e,t,r){let[n,i,a,s]=await this.scripts.moveToActive(e,t,r);return this.updateDelays(a,s),this.nextJobFromJobData(n,i,t)}async waitForJob(e,t){let r;if(this.paused)return 1/0;try{if(!this.closing&&!this.isRateLimited()){let n=this.getBlockTimeout(t);if(n>0){n=this.blockingConnection.capabilities.canDoubleTimeout?n:Math.ceil(n),r=setTimeout(async()=>{e.disconnect(!this.closing)},1e3*n+1e3),this.updateDelays();let i=await e.bzpopmin(this.keys.marker,n);if(i){let[e,r,n]=i;if(r){let e=parseInt(n);if(t&&e>t)return t;return e}}}return 0}}catch(e){em(e)&&this.emit("error",e),this.closing||await this.delay()}finally{clearTimeout(r)}return 1/0}getBlockTimeout(e){let t=this.opts;if(!e)return Math.max(t.drainDelay,this.minimumBlockTimeout);{let t=e-Date.now();return t<=0?t:t<1e3*this.minimumBlockTimeout?this.minimumBlockTimeout:Math.min(t/1e3,10)}}getRateLimitDelay(e){return Math.min(e,this.opts.maximumRateLimitDelay)}async delay(e,t){await eo(e||100,t)}updateDelays(e=0,t=0){let r=Math.max(e,0);r>0?this.limitUntil=Date.now()+r:this.limitUntil=0,this.blockUntil=Math.max(t,0)||0}async nextJobFromJobData(e,t,r){if(e){this.drained=!1;let n=this.createJob(e,t);n.token=r;try{await this.retryIfFailed(async()=>{if(n.repeatJobKey&&n.repeatJobKey.split(":").length<5){let e=await this.jobScheduler;await e.upsertJobScheduler(n.repeatJobKey,n.opts.repeat,n.name,n.data,n.opts,{override:!1,producerId:n.id})}else if(n.opts.repeat){let e=await this.repeat;await e.updateRepeatableJob(n.name,n.data,n.opts,{override:!1})}},{delayInMs:this.opts.runRetryDelay})}catch(r){let e=r instanceof Error?r.message:String(r),t=Error(`Failed to add repeatable job for next iteration: ${e}`);this.emit("error",t);return}return n}this.drained||(this.emit("drained"),this.drained=!0)}async processJob(e,t,r=()=>!0){var n,i;let a=null==(i=null==(n=e.opts)?void 0:n.telemetry)?void 0:i.metadata;return this.trace(A.CONSUMER,"process",this.name,async n=>{null==n||n.setAttributes({[k.WorkerId]:this.id,[k.WorkerName]:this.opts.name,[k.JobId]:e.id,[k.JobName]:e.name}),this.emit("active",e,"waiting");let i=Date.now(),a=this.lockManager.trackJob(e.id,t,i,this.processorAcceptsSignal);try{let i=this.getUnrecoverableErrorMessage(e);if(i)return await this.retryIfFailed(()=>(this.lockManager.untrackJob(e.id),this.handleFailed(new eK(i),e,t,r,n)),{delayInMs:this.opts.runRetryDelay,span:n});let s=await this.callProcessJob(e,t,a?a.signal:void 0);return await this.retryIfFailed(()=>(this.lockManager.untrackJob(e.id),this.handleCompleted(s,e,t,r,n)),{delayInMs:this.opts.runRetryDelay,span:n})}catch(i){return await this.retryIfFailed(()=>(this.lockManager.untrackJob(e.id),this.handleFailed(i,e,t,r,n)),{delayInMs:this.opts.runRetryDelay,span:n,onlyEmitError:!0})}finally{this.lockManager.untrackJob(e.id),null==n||n.setAttributes({[k.JobFinishedTimestamp]:Date.now(),[k.JobProcessedTimestamp]:i})}},a)}getUnrecoverableErrorMessage(e){return e.deferredFailure?e.deferredFailure:this.opts.maxStartedAttempts&&this.opts.maxStartedAttempts<e.attemptsStarted?"job started more than allowable limit":void 0}async handleCompleted(e,t,r,n=()=>!0,i){if(!this.connection.closing){let a=await t.moveToCompleted(e,r,n()&&!(this.closing||this.paused));if(this.emit("completed",t,e,"active"),null==i||i.addEvent("job completed",{[k.JobResult]:JSON.stringify(e)}),null==i||i.setAttributes({[k.JobAttemptsMade]:t.attemptsMade}),Array.isArray(a)){let[e,t,n,i]=a;return this.updateDelays(n,i),this.nextJobFromJobData(e,t,r)}}}async handleFailed(e,t,r,n=()=>!0,i){if(!this.connection.closing){if(e.message===ev){let e=await this.moveLimitedBackToWait(t,r);this.limitUntil=e>0?Date.now()+e:0;return}if(e instanceof eg||"DelayedError"==e.name||e instanceof eI||"WaitingError"==e.name||e instanceof eS||"WaitingChildrenError"==e.name){let e=await this.client;return this.moveToActive(e,r,this.opts.name)}let a=await t.moveToFailed(e,r,n()&&!(this.closing||this.paused));if(this.emit("failed",t,e,"active"),null==i||i.addEvent("job failed",{[k.JobFailedReason]:e.message}),null==i||i.setAttributes({[k.JobAttemptsMade]:t.attemptsMade}),Array.isArray(a)){let[e,t,n,i]=a;return this.updateDelays(n,i),this.nextJobFromJobData(e,t,r)}}}async pause(e){await this.trace(A.INTERNAL,"pause",this.name,async t=>{var r;null==t||t.setAttributes({[k.WorkerId]:this.id,[k.WorkerName]:this.opts.name,[k.WorkerDoNotWaitActive]:e}),this.paused||(this.paused=!0,e||await this.whenCurrentJobsFinished(),null==(r=this.stalledCheckStopper)||r.call(this),this.emit("paused"))})}resume(){this.running||this.trace(A.INTERNAL,"resume",this.name,e=>{null==e||e.setAttributes({[k.WorkerId]:this.id,[k.WorkerName]:this.opts.name}),this.paused=!1,this.processFn&&this.run(),this.emit("resumed")})}isPaused(){return!!this.paused}isRunning(){return this.running}async close(e=!1){return this.closing?this.closing:(this.closing=(async()=>{await this.trace(A.INTERNAL,"close",this.name,async t=>{var r,n;for(let n of(null==t||t.setAttributes({[k.WorkerId]:this.id,[k.WorkerName]:this.opts.name,[k.WorkerForceClose]:e}),this.emit("closing","closing queue"),null==(r=this.abortDelayController)||r.abort(),[()=>e||this.whenCurrentJobsFinished(!1),()=>this.lockManager.close(),()=>{var e;return null==(e=this.childPool)?void 0:e.clean()},()=>this.blockingConnection.close(e),()=>this.connection.close(e)]))try{await n()}catch(e){this.emit("error",e)}null==(n=this.stalledCheckStopper)||n.call(this),this.closed=!0,this.emit("closed")})})(),await this.closing)}async startStalledCheckTimer(){this.opts.skipStalledCheck||this.closing||await this.trace(A.INTERNAL,"startStalledCheckTimer",this.name,async e=>{null==e||e.setAttributes({[k.WorkerId]:this.id,[k.WorkerName]:this.opts.name}),this.stalledChecker().catch(e=>{this.emit("error",e)})})}async stalledChecker(){for(;!(this.closing||this.paused);)await this.checkConnectionError(()=>this.moveStalledJobsToWait()),await new Promise(e=>{let t=setTimeout(e,this.opts.stalledInterval);this.stalledCheckStopper=()=>{clearTimeout(t),e()}})}async whenCurrentJobsFinished(e=!0){this.waiting?await this.blockingConnection.disconnect(e):e=!1,this.mainLoopRunning&&await this.mainLoopRunning,e&&await this.blockingConnection.reconnect()}async retryIfFailed(e,t){var r;let n=0,i=t.maxRetries||1/0;do try{return await e()}catch(e){if(null==(r=t.span)||r.recordException(e.message),em(e)){if(this.paused||this.closing||this.emit("error",e),t.onlyEmitError)return;throw e}if(!t.delayInMs||this.closing||this.closed||await this.delay(t.delayInMs,this.abortDelayController),n+1>=i)throw e}while(++n<i)}async moveStalledJobsToWait(){await this.trace(A.INTERNAL,"moveStalledJobsToWait",this.name,async e=>{let t=await this.scripts.moveStalledJobsToWait();null==e||e.setAttributes({[k.WorkerId]:this.id,[k.WorkerName]:this.opts.name,[k.WorkerStalledJobs]:t}),t.forEach(t=>{null==e||e.addEvent("job stalled",{[k.JobId]:t}),this.emit("stalled",t,"active")})})}moveLimitedBackToWait(e,t){return e.moveToWait(t)}}(r8,async t=>{let{submissionId:r}=t.data;try{let t,{prisma:n}=await e.A(674342),i=await n.submission.findUnique({where:{id:r},include:{problem:{include:{testCases:!0,functionTemplates:!0}},language:!0}});if(!i)throw Error("Submission not found");if(!i.problem)throw Error("Problem not found");let{code:a,language:s,problem:o,mode:l}=i,u=o.testCases;if(t="RUN"===l?u.filter(e=>!e.hidden):u,0===t.length)return void await r9.updateSubmissionStatus(r,"ACCEPTED",0,0);let d=a;if("SQL"===o.domain){o.hiddenQuery&&(d=o.hiddenQuery.trim()+"\n"+a);let{convertBatchToSQLite:t}=await e.A(352591);d=t(d)}else if("DSA"===o.domain&&o.useFunctionTemplate&&o.functionTemplates?.length){let e=o.functionTemplates.find(e=>e.languageId===s.judge0Id);if(e?.driverCode){let t=s.judge0Id;d=e.driverCode.includes("{{USER_CODE}}")?e.driverCode.replace("{{USER_CODE}}",a):60===t||73===t?e.driverCode+"\n\n"+a:63===t||71===t?a+"\n\n"+e.driverCode:62===t||50===t||54===t?e.driverCode.replace(/}\s*$/,a+"\n}"):a+"\n\n"+e.driverCode}}let c=await r9.sendToJudge0(s.judge0Id,d,t.map(e=>({input:e.input,output:e.output}))),h=t.map((e,t)=>({index:u.findIndex(t=>t.id===e.id),judge0TrackingId:c[t].token,processed:!1,processingUpdateSent:!1}));await r9.createTestCases(r,h);let p=!1,m=Date.now(),f=0,y=0,b="ACCEPTED",g=null,v=!1;for(;!p&&Date.now()-m<6e4;){let e=Date.now()-m,t=1e3;e<5e3?t=150:e<3e4&&(t=500),await new Promise(e=>setTimeout(e,t));let n=h.filter(e=>!e.processed);if(0===n.length){p=!0;break}let i=n.map(e=>e.judge0TrackingId),a=await r9.getBatchResults(i);if(!v&&a.length>0){let e=a[0],t=nt(e.status.id);"COMPILE_ERROR"===t&&(v=!0,b="COMPILE_ERROR",g=e.compile_output||e.stderr||"Compilation Error")}let s=0,o=[],l=[];for(let e=0;e<a.length;e++){let t=a[e],r=n.find(e=>e.judge0TrackingId===t.token);if(r){if(1===t.status.id||2===t.status.id){2!==t.status.id||r.processingUpdateSent||(r.processingUpdateSent=!0,l.push({index:r.index,status:"PROCESSING",judge0TrackingId:t.token})),s++;continue}if(!r.processed){r.processed=!0;let e=parseFloat(t.time||"0"),n=t.memory||0,i=nt(t.status.id),a=null;if(v)a=g;else if("COMPILE_ERROR"===i)a=t.compile_output||t.stderr||"Compilation Error";else if("RUNTIME_ERROR"===i){let e=t.status.description||"Runtime Error",r=t.stderr?.trim();a=r?`${e}

${r}`:e,e.includes("SIGSEGV")&&(a+="\n\nPossible causes:\n- Accessing array out of bounds\n- Null pointer"),e.includes("SIGFPE")&&(a+="\n\nPossible causes:\n- Division by zero")}else"TIME_LIMIT_EXCEEDED"===i?a="Time Limit Exceeded":"MEMORY_LIMIT_EXCEEDED"===i?a="Memory Limit Exceeded":t.stderr&&"ACCEPTED"!==i&&(a=t.stderr);!a&&t.compile_output&&"ACCEPTED"!==i&&(a=t.compile_output),"RUNTIME_ERROR"!==i&&"COMPILE_ERROR"!==i||a||(a="Unknown Error Occurred");let s=v?"COMPILE_ERROR":i||"RUNTIME_ERROR",u={judge0TrackingId:t.token,status:s,time:e,memory:n,errorMessage:a,stdout:t.stdout};o.push(u),l.push({...u,index:r.index}),f+=e,y=Math.max(y,n),v||"ACCEPTED"===i||"ACCEPTED"!==b||(b="WRONG_ANSWER"===i?"WRONG_ANSWER":"TIME_LIMIT_EXCEEDED"===i?"TIME_LIMIT_EXCEEDED":"RUNTIME_ERROR")}}}o.length>0&&(await r9.updateTestCasesBatch(o),l.length>0&&await r2.publish(`submission:${r}`,JSON.stringify({type:"CASE_UPDATE",data:l}))),0===s&&(p=!0)}if(p){let e=f/h.length;await r9.updateSubmissionStatus(r,b,e,y),await r2.publish(`submission:${r}`,JSON.stringify({type:"COMPLETE",data:{status:b,time:e,memory:y}})),"ACCEPTED"===b&&"SUBMIT"===i.mode&&await r9.incrementProblemSolved(o.id,i.userId),await r9.invalidateClassroomTracking(i.userId)}else await r9.updateSubmissionStatus(r,"TIME_LIMIT_EXCEEDED"),await r2.publish(`submission:${r}`,JSON.stringify({type:"COMPLETE",data:{status:"TIME_LIMIT_EXCEEDED",time:0,memory:0}})),await r9.invalidateClassroomTracking(i.userId)}catch(e){console.error(`Error processing submission ${r}`,e),await r9.updateSubmissionStatus(r,"RUNTIME_ERROR"),await r2.publish(`submission:${r}`,JSON.stringify({type:"COMPLETE",data:{status:"RUNTIME_ERROR",time:0,memory:0}}))}},{connection:r2,concurrency:10,limiter:{max:50,duration:1e3}}),e.s(["addSubmissionJob",0,ne,"submissionQueue",0,r7],941367)}];

//# sourceMappingURL=_54a304ba._.js.map