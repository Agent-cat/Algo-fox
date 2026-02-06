module.exports=[434270,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/module-loading/track-module-loading.external.js",()=>require("next/dist/server/app-render/module-loading/track-module-loading.external.js"))},68063,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={getDeploymentId:function(){return f},getDeploymentIdQueryOrEmptyString:function(){return g}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});function f(){return!1}function g(){return""}},808591,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"useMergedRef",{enumerable:!0,get:function(){return e}});let d=a.r(572131);function e(a,b){let c=(0,d.useRef)(null),e=(0,d.useRef)(null);return(0,d.useCallback)(d=>{if(null===d){let a=c.current;a&&(c.current=null,a());let b=e.current;b&&(e.current=null,b())}else a&&(c.current=f(a,d)),b&&(e.current=f(b,d))},[a,b])}function f(a,b){if("function"!=typeof a)return a.current=b,()=>{a.current=null};{let c=a(b);return"function"==typeof c?c:()=>a(null)}}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},192434,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"warnOnce",{enumerable:!0,get:function(){return d}});let d=a=>{}},596221,a=>{"use strict";let b=(0,a.i(170106).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);a.s(["Loader2",()=>b],596221)},340291,a=>{"use strict";let b=[{id:63,name:"JavaScript",monacoLanguage:"javascript",boilerplate:`const fs = require("fs");

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

}`},{id:82,name:"SQL",monacoLanguage:"sql",boilerplate:""}];function c(a){return b.find(b=>b.id===a)}a.s(["DEFAULT_LANGUAGE_ID",0,63,"LANGUAGES",0,b,"getLanguageById",()=>c])},405784,a=>{"use strict";let b=(0,a.i(170106).default)("chevron-down",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);a.s(["ChevronDown",()=>b],405784)},533441,a=>{"use strict";let b=(0,a.i(170106).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);a.s(["Check",()=>b],533441)},633508,a=>{"use strict";let b=(0,a.i(170106).default)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);a.s(["X",()=>b],633508)},705151,a=>{"use strict";let b=(0,a.i(170106).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);a.s(["Copy",()=>b],705151)},321161,a=>{"use strict";let b=(0,a.i(170106).default)("settings",[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);a.s(["Settings",()=>b],321161)},833354,(a,b,c)=>{"use strict";c._=function(a){return a&&a.__esModule?a:{default:a}}},852690,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"trackDynamicImport",{enumerable:!0,get:function(){return g}});let d=a.r(588644),e=a.r(467009),f=a.r(434270);function g(a){if(!(0,e.isThenable)(a))throw Object.defineProperty(new d.InvariantError("`trackDynamicImport` should always receive a promise. Something went wrong in the dynamic imports transform."),"__NEXT_ERROR_CODE",{value:"E677",enumerable:!1,configurable:!0});return(0,f.trackPendingImport)(a),a}},766281,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"trackDynamicImport",{enumerable:!0,get:function(){return d.trackDynamicImport}});let d=a.r(852690)},132245,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"BailoutToCSR",{enumerable:!0,get:function(){return e}});let d=a.r(441997);function e({reason:a,children:b}){throw Object.defineProperty(new d.BailoutToCSRError(a),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0})}},307773,(a,b,c)=>{"use strict";function d(a){return a.split("/").map(a=>encodeURIComponent(a)).join("/")}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"encodeURIPath",{enumerable:!0,get:function(){return d}})},297458,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"PreloadChunks",{enumerable:!0,get:function(){return i}});let d=a.r(187924),e=a.r(935112),f=a.r(556704),g=a.r(307773),h=a.r(68063);function i({moduleIds:a}){let b=f.workAsyncStorage.getStore();if(void 0===b)return null;let c=[];if(b.reactLoadableManifest&&a){let d=b.reactLoadableManifest;for(let b of a){if(!d[b])continue;let a=d[b].files;c.push(...a)}}if(0===c.length)return null;let i=(0,h.getDeploymentIdQueryOrEmptyString)();return(0,d.jsx)(d.Fragment,{children:c.map(a=>{let c=`${b.assetPrefix}/_next/${(0,g.encodeURIPath)(a)}${i}`;return a.endsWith(".css")?(0,d.jsx)("link",{precedence:"dynamic",href:c,rel:"stylesheet",as:"style",nonce:b.nonce},a):((0,e.preload)(c,{as:"script",fetchPriority:"low",nonce:b.nonce}),null)})})}},969853,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"default",{enumerable:!0,get:function(){return j}});let d=a.r(187924),e=a.r(572131),f=a.r(132245),g=a.r(297458);function h(a){return{default:a&&"default"in a?a.default:a}}let i={loader:()=>Promise.resolve(h(()=>null)),loading:null,ssr:!0},j=function(a){let b={...i,...a},c=(0,e.lazy)(()=>b.loader().then(h)),j=b.loading;function k(a){let h=j?(0,d.jsx)(j,{isLoading:!0,pastDelay:!0,error:null}):null,i=!b.ssr||!!b.loading,k=i?e.Suspense:e.Fragment,l=b.ssr?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(g.PreloadChunks,{moduleIds:b.modules}),(0,d.jsx)(c,{...a})]}):(0,d.jsx)(f.BailoutToCSR,{reason:"next/dynamic",children:(0,d.jsx)(c,{...a})});return(0,d.jsx)(k,{...i?{fallback:h}:{},children:l})}return k.displayName="LoadableComponent",k}},819721,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"default",{enumerable:!0,get:function(){return e}});let d=a.r(833354)._(a.r(969853));function e(a,b){let c={};"function"==typeof a&&(c.loader=a);let e={...c,...b};return(0,d.default)({...e,modules:e.loadableGenerated?.modules})}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},334044,a=>{"use strict";let b=(0,a.i(170106).default)("maximize-2",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]]);a.s(["Maximize2",()=>b],334044)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0bea242b._.js.map