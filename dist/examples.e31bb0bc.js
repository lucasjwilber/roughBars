// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/roughjs/dist/rough.js":[function(require,module,exports) {
var rough=function(){"use strict";const t="undefined"!=typeof self;class e{constructor(t,e){this.defaultOptions={maxRandomnessOffset:2,roughness:1,bowing:1,stroke:"#000",strokeWidth:1,curveTightness:0,curveStepCount:9,fillStyle:"hachure",fillWeight:-1,hachureAngle:-41,hachureGap:-1,dashOffset:-1,dashGap:-1,zigzagOffset:-1},this.config=t||{},this.surface=e,this.config.options&&(this.defaultOptions=this._options(this.config.options))}_options(t){return t?Object.assign({},this.defaultOptions,t):this.defaultOptions}_drawable(t,e,s){return{shape:t,sets:e||[],options:s||this.defaultOptions}}getCanvasSize(){const t=t=>t&&"object"==typeof t&&t.baseVal&&t.baseVal.value?t.baseVal.value:t||100;return this.surface?[t(this.surface.width),t(this.surface.height)]:[100,100]}computePolygonSize(t){if(t.length){let e=t[0][0],s=t[0][0],i=t[0][1],h=t[0][1];for(let n=1;n<t.length;n++)e=Math.min(e,t[n][0]),s=Math.max(s,t[n][0]),i=Math.min(i,t[n][1]),h=Math.max(h,t[n][1]);return[s-e,h-i]}return[0,0]}polygonPath(t){let e="";if(t.length){e=`M${t[0][0]},${t[0][1]}`;for(let s=1;s<t.length;s++)e=`${e} L${t[s][0]},${t[s][1]}`}return e}computePathSize(e){let s=[0,0];if(t&&self.document)try{const t="http://www.w3.org/2000/svg",i=self.document.createElementNS(t,"svg");i.setAttribute("width","0"),i.setAttribute("height","0");const h=self.document.createElementNS(t,"path");h.setAttribute("d",e),i.appendChild(h),self.document.body.appendChild(i);const n=h.getBBox();n&&(s[0]=n.width||0,s[1]=n.height||0),self.document.body.removeChild(i)}catch(t){}const i=this.getCanvasSize();return s[0]*s[1]||(s=i),s}toPaths(t){const e=t.sets||[],s=t.options||this.defaultOptions,i=[];for(const t of e){let e=null;switch(t.type){case"path":e={d:this.opsToPath(t),stroke:s.stroke,strokeWidth:s.strokeWidth,fill:"none"};break;case"fillPath":e={d:this.opsToPath(t),stroke:"none",strokeWidth:0,fill:s.fill||"none"};break;case"fillSketch":e=this.fillSketch(t,s);break;case"path2Dfill":e={d:t.path||"",stroke:"none",strokeWidth:0,fill:s.fill||"none"};break;case"path2Dpattern":{const i=t.size,h={x:0,y:0,width:1,height:1,viewBox:`0 0 ${Math.round(i[0])} ${Math.round(i[1])}`,patternUnits:"objectBoundingBox",path:this.fillSketch(t,s)};e={d:t.path,stroke:"none",strokeWidth:0,pattern:h};break}}e&&i.push(e)}return i}fillSketch(t,e){let s=e.fillWeight;return s<0&&(s=e.strokeWidth/2),{d:this.opsToPath(t),stroke:e.fill||"none",strokeWidth:s,fill:"none"}}opsToPath(t){let e="";for(const s of t.ops){const t=s.data;switch(s.op){case"move":e+=`M${t[0]} ${t[1]} `;break;case"bcurveTo":e+=`C${t[0]} ${t[1]}, ${t[2]} ${t[3]}, ${t[4]} ${t[5]} `;break;case"qcurveTo":e+=`Q${t[0]} ${t[1]}, ${t[2]} ${t[3]} `;break;case"lineTo":e+=`L${t[0]} ${t[1]} `}}return e.trim()}}function s(t,e){return t.type===e}const i={A:7,a:7,C:6,c:6,H:1,h:1,L:2,l:2,M:2,m:2,Q:4,q:4,S:4,s:4,T:4,t:2,V:1,v:1,Z:0,z:0};class h{constructor(t){this.COMMAND=0,this.NUMBER=1,this.EOD=2,this.segments=[],this.parseData(t),this.processPoints()}tokenize(t){const e=new Array;for(;""!==t;)if(t.match(/^([ \t\r\n,]+)/))t=t.substr(RegExp.$1.length);else if(t.match(/^([aAcChHlLmMqQsStTvVzZ])/))e[e.length]={type:this.COMMAND,text:RegExp.$1},t=t.substr(RegExp.$1.length);else{if(!t.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/))return console.error("Unrecognized segment command: "+t),[];e[e.length]={type:this.NUMBER,text:`${parseFloat(RegExp.$1)}`},t=t.substr(RegExp.$1.length)}return e[e.length]={type:this.EOD,text:""},e}parseData(t){const e=this.tokenize(t);let h=0,n=e[h],a="BOD";for(this.segments=new Array;!s(n,this.EOD);){let o;const r=new Array;if("BOD"===a){if("M"!==n.text&&"m"!==n.text)return void this.parseData("M0,0"+t);h++,o=i[n.text],a=n.text}else s(n,this.NUMBER)?o=i[a]:(h++,o=i[n.text],a=n.text);if(h+o<e.length){for(let t=h;t<h+o;t++){const i=e[t];if(!s(i,this.NUMBER))return void console.error("Parameter type is not a number: "+a+","+i.text);r[r.length]=+i.text}if("number"!=typeof i[a])return void console.error("Unsupported segment type: "+a);{const t={key:a,data:r};this.segments.push(t),n=e[h+=o],"M"===a&&(a="L"),"m"===a&&(a="l")}}else console.error("Path data ended before all parameters were found")}}get closed(){if(void 0===this._closed){this._closed=!1;for(const t of this.segments)"z"===t.key.toLowerCase()&&(this._closed=!0)}return this._closed}processPoints(){let t=null,e=[0,0];for(let s=0;s<this.segments.length;s++){const i=this.segments[s];switch(i.key){case"M":case"L":case"T":i.point=[i.data[0],i.data[1]];break;case"m":case"l":case"t":i.point=[i.data[0]+e[0],i.data[1]+e[1]];break;case"H":i.point=[i.data[0],e[1]];break;case"h":i.point=[i.data[0]+e[0],e[1]];break;case"V":i.point=[e[0],i.data[0]];break;case"v":i.point=[e[0],i.data[0]+e[1]];break;case"z":case"Z":t&&(i.point=[t[0],t[1]]);break;case"C":i.point=[i.data[4],i.data[5]];break;case"c":i.point=[i.data[4]+e[0],i.data[5]+e[1]];break;case"S":i.point=[i.data[2],i.data[3]];break;case"s":i.point=[i.data[2]+e[0],i.data[3]+e[1]];break;case"Q":i.point=[i.data[2],i.data[3]];break;case"q":i.point=[i.data[2]+e[0],i.data[3]+e[1]];break;case"A":i.point=[i.data[5],i.data[6]];break;case"a":i.point=[i.data[5]+e[0],i.data[6]+e[1]]}"m"!==i.key&&"M"!==i.key||(t=null),i.point&&(e=i.point,t||(t=i.point)),"z"!==i.key&&"Z"!==i.key||(t=null)}}}class n{constructor(t){this._position=[0,0],this._first=null,this.bezierReflectionPoint=null,this.quadReflectionPoint=null,this.parsed=new h(t)}get segments(){return this.parsed.segments}get closed(){return this.parsed.closed}get linearPoints(){if(!this._linearPoints){const t=[];let e=[];for(const s of this.parsed.segments){const i=s.key.toLowerCase();("m"!==i&&"z"!==i||(e.length&&(t.push(e),e=[]),"z"!==i))&&(s.point&&e.push(s.point))}e.length&&(t.push(e),e=[]),this._linearPoints=t}return this._linearPoints}get first(){return this._first}set first(t){this._first=t}setPosition(t,e){this._position=[t,e],this._first||(this._first=[t,e])}get position(){return this._position}get x(){return this._position[0]}get y(){return this._position[1]}}class a{constructor(t,e,s,i,h,n){if(this._segIndex=0,this._numSegs=0,this._rx=0,this._ry=0,this._sinPhi=0,this._cosPhi=0,this._C=[0,0],this._theta=0,this._delta=0,this._T=0,this._from=t,t[0]===e[0]&&t[1]===e[1])return;const a=Math.PI/180;this._rx=Math.abs(s[0]),this._ry=Math.abs(s[1]),this._sinPhi=Math.sin(i*a),this._cosPhi=Math.cos(i*a);const o=this._cosPhi*(t[0]-e[0])/2+this._sinPhi*(t[1]-e[1])/2,r=-this._sinPhi*(t[0]-e[0])/2+this._cosPhi*(t[1]-e[1])/2;let l=0;const c=this._rx*this._rx*this._ry*this._ry-this._rx*this._rx*r*r-this._ry*this._ry*o*o;if(c<0){const t=Math.sqrt(1-c/(this._rx*this._rx*this._ry*this._ry));this._rx=this._rx*t,this._ry=this._ry*t,l=0}else l=(h===n?-1:1)*Math.sqrt(c/(this._rx*this._rx*r*r+this._ry*this._ry*o*o));const p=l*this._rx*r/this._ry,u=-l*this._ry*o/this._rx;this._C=[0,0],this._C[0]=this._cosPhi*p-this._sinPhi*u+(t[0]+e[0])/2,this._C[1]=this._sinPhi*p+this._cosPhi*u+(t[1]+e[1])/2,this._theta=this.calculateVectorAngle(1,0,(o-p)/this._rx,(r-u)/this._ry);let f=this.calculateVectorAngle((o-p)/this._rx,(r-u)/this._ry,(-o-p)/this._rx,(-r-u)/this._ry);!n&&f>0?f-=2*Math.PI:n&&f<0&&(f+=2*Math.PI),this._numSegs=Math.ceil(Math.abs(f/(Math.PI/2))),this._delta=f/this._numSegs,this._T=8/3*Math.sin(this._delta/4)*Math.sin(this._delta/4)/Math.sin(this._delta/2)}getNextSegment(){if(this._segIndex===this._numSegs)return null;const t=Math.cos(this._theta),e=Math.sin(this._theta),s=this._theta+this._delta,i=Math.cos(s),h=Math.sin(s),n=[this._cosPhi*this._rx*i-this._sinPhi*this._ry*h+this._C[0],this._sinPhi*this._rx*i+this._cosPhi*this._ry*h+this._C[1]],a=[this._from[0]+this._T*(-this._cosPhi*this._rx*e-this._sinPhi*this._ry*t),this._from[1]+this._T*(-this._sinPhi*this._rx*e+this._cosPhi*this._ry*t)],o=[n[0]+this._T*(this._cosPhi*this._rx*h+this._sinPhi*this._ry*i),n[1]+this._T*(this._sinPhi*this._rx*h-this._cosPhi*this._ry*i)];return this._theta=s,this._from=[n[0],n[1]],this._segIndex++,{cp1:a,cp2:o,to:n}}calculateVectorAngle(t,e,s,i){const h=Math.atan2(e,t),n=Math.atan2(i,s);return n>=h?n-h:2*Math.PI-(h-n)}}class o{constructor(t,e){this.sets=t,this.closed=e}fit(t){const e=[];for(const s of this.sets){const i=s.length;let h=Math.floor(t*i);if(h<5){if(i<=5)continue;h=5}e.push(this.reduce(s,h))}let s="";for(const t of e){for(let e=0;e<t.length;e++){const i=t[e];s+=0===e?"M"+i[0]+","+i[1]:"L"+i[0]+","+i[1]}this.closed&&(s+="z ")}return s}distance(t,e){return Math.sqrt(Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2))}reduce(t,e){if(t.length<=e)return t;const s=t.slice(0);for(;s.length>e;){let t=-1,e=-1;for(let i=1;i<s.length-1;i++){const h=this.distance(s[i-1],s[i]),n=this.distance(s[i],s[i+1]),a=this.distance(s[i-1],s[i+1]),o=(h+n+a)/2,r=Math.sqrt(o*(o-h)*(o-n)*(o-a));(t<0||r<t)&&(t=r,e=i)}if(!(e>0))break;s.splice(e,1)}return s}}class r{constructor(t,e){this.xi=Number.MAX_VALUE,this.yi=Number.MAX_VALUE,this.px1=t[0],this.py1=t[1],this.px2=e[0],this.py2=e[1],this.a=this.py2-this.py1,this.b=this.px1-this.px2,this.c=this.px2*this.py1-this.px1*this.py2,this._undefined=0===this.a&&0===this.b&&0===this.c}isUndefined(){return this._undefined}intersects(t){if(this.isUndefined()||t.isUndefined())return!1;let e=Number.MAX_VALUE,s=Number.MAX_VALUE,i=0,h=0;const n=this.a,a=this.b,o=this.c;return Math.abs(a)>1e-5&&(e=-n/a,i=-o/a),Math.abs(t.b)>1e-5&&(s=-t.a/t.b,h=-t.c/t.b),e===Number.MAX_VALUE?s===Number.MAX_VALUE?-o/n==-t.c/t.a&&(this.py1>=Math.min(t.py1,t.py2)&&this.py1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.py2>=Math.min(t.py1,t.py2)&&this.py2<=Math.max(t.py1,t.py2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=this.px1,this.yi=s*this.xi+h,!((this.py1-this.yi)*(this.yi-this.py2)<-1e-5||(t.py1-this.yi)*(this.yi-t.py2)<-1e-5)&&(!(Math.abs(t.a)<1e-5)||!((t.px1-this.xi)*(this.xi-t.px2)<-1e-5))):s===Number.MAX_VALUE?(this.xi=t.px1,this.yi=e*this.xi+i,!((t.py1-this.yi)*(this.yi-t.py2)<-1e-5||(this.py1-this.yi)*(this.yi-this.py2)<-1e-5)&&(!(Math.abs(n)<1e-5)||!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5))):e===s?i===h&&(this.px1>=Math.min(t.px1,t.px2)&&this.px1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.px2>=Math.min(t.px1,t.px2)&&this.px2<=Math.max(t.px1,t.px2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=(h-i)/(e-s),this.yi=e*this.xi+i,!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5||(t.px1-this.xi)*(this.xi-t.px2)<-1e-5))}}function l(t,e){const s=t[1][1]-t[0][1],i=t[0][0]-t[1][0],h=s*t[0][0]+i*t[0][1],n=e[1][1]-e[0][1],a=e[0][0]-e[1][0],o=n*e[0][0]+a*e[0][1],r=s*a-n*i;return r?[Math.round((a*h-i*o)/r),Math.round((s*o-n*h)/r)]:null}class c{constructor(t,e,s,i,h,n,a,o){this.deltaX=0,this.hGap=0,this.top=t,this.bottom=e,this.left=s,this.right=i,this.gap=h,this.sinAngle=n,this.tanAngle=o,Math.abs(n)<1e-4?this.pos=s+h:Math.abs(n)>.9999?this.pos=t+h:(this.deltaX=(e-t)*Math.abs(o),this.pos=s-Math.abs(this.deltaX),this.hGap=Math.abs(h/a),this.sLeft=new r([s,e],[s,t]),this.sRight=new r([i,e],[i,t]))}nextLine(){if(Math.abs(this.sinAngle)<1e-4){if(this.pos<this.right){const t=[this.pos,this.top,this.pos,this.bottom];return this.pos+=this.gap,t}}else if(Math.abs(this.sinAngle)>.9999){if(this.pos<this.bottom){const t=[this.left,this.pos,this.right,this.pos];return this.pos+=this.gap,t}}else{let t=this.pos-this.deltaX/2,e=this.pos+this.deltaX/2,s=this.bottom,i=this.top;if(this.pos<this.right+this.deltaX){for(;t<this.left&&e<this.left||t>this.right&&e>this.right;)if(this.pos+=this.hGap,t=this.pos-this.deltaX/2,e=this.pos+this.deltaX/2,this.pos>this.right+this.deltaX)return null;const h=new r([t,s],[e,i]);this.sLeft&&h.intersects(this.sLeft)&&(t=h.xi,s=h.yi),this.sRight&&h.intersects(this.sRight)&&(e=h.xi,i=h.yi),this.tanAngle>0&&(t=this.right-(t-this.left),e=this.right-(e-this.left));const n=[t,s,e,i];return this.pos+=this.hGap,n}}return null}}function p(t){const e=t[0],s=t[1];return Math.sqrt(Math.pow(e[0]-s[0],2)+Math.pow(e[1]-s[1],2))}function u(t,e){const s=[],i=new r([t[0],t[1]],[t[2],t[3]]);for(let t=0;t<e.length;t++){const h=new r(e[t],e[(t+1)%e.length]);i.intersects(h)&&s.push([i.xi,i.yi])}return s}function f(t,e,s,i,h,n,a){return[-s*n-i*h+s+n*t+h*e,a*(s*h-i*n)+i+-a*h*t+a*n*e]}function d(t,e){const s=[];if(t&&t.length){let i=t[0][0],h=t[0][0],n=t[0][1],a=t[0][1];for(let e=1;e<t.length;e++)i=Math.min(i,t[e][0]),h=Math.max(h,t[e][0]),n=Math.min(n,t[e][1]),a=Math.max(a,t[e][1]);const o=e.hachureAngle;let r=e.hachureGap;r<0&&(r=4*e.strokeWidth),r=Math.max(r,.1);const l=o%180*(Math.PI/180),p=Math.cos(l),f=Math.sin(l),d=Math.tan(l),g=new c(n-1,a+1,i-1,h+1,r,f,p,d);let y;for(;null!=(y=g.nextLine());){const e=u(y,t);for(let t=0;t<e.length;t++)if(t<e.length-1){const i=e[t],h=e[t+1];s.push([i,h])}}}return s}function g(t,e,s,i,h,n){const a=[];let o=Math.abs(i/2),r=Math.abs(h/2);o+=t.randOffset(.05*o,n),r+=t.randOffset(.05*r,n);const l=n.hachureAngle;let c=n.hachureGap;c<=0&&(c=4*n.strokeWidth);let p=n.fillWeight;p<0&&(p=n.strokeWidth/2);const u=l%180*(Math.PI/180),d=Math.tan(u),g=r/o,y=Math.sqrt(g*d*g*d+1),M=g*d/y,x=1/y,_=c/(o*r/Math.sqrt(r*x*(r*x)+o*M*(o*M))/o);let b=Math.sqrt(o*o-(e-o+_)*(e-o+_));for(let t=e-o+_;t<e+o;t+=_){const i=f(t,s-(b=Math.sqrt(o*o-(e-t)*(e-t))),e,s,M,x,g),h=f(t,s+b,e,s,M,x,g);a.push([i,h])}return a}class y{constructor(t){this.helper=t}fillPolygon(t,e){return this._fillPolygon(t,e)}fillEllipse(t,e,s,i,h){return this._fillEllipse(t,e,s,i,h)}fillArc(t,e,s,i,h,n,a){return null}_fillPolygon(t,e,s=!1){const i=d(t,e);return{type:"fillSketch",ops:this.renderLines(i,e,s)}}_fillEllipse(t,e,s,i,h,n=!1){const a=g(this.helper,t,e,s,i,h);return{type:"fillSketch",ops:this.renderLines(a,h,n)}}renderLines(t,e,s){let i=[],h=null;for(const n of t)i=i.concat(this.helper.doubleLineOps(n[0][0],n[0][1],n[1][0],n[1][1],e)),s&&h&&(i=i.concat(this.helper.doubleLineOps(h[0],h[1],n[0][0],n[0][1],e))),h=n[1];return i}}class M extends y{fillPolygon(t,e){return this._fillPolygon(t,e,!0)}fillEllipse(t,e,s,i,h){return this._fillEllipse(t,e,s,i,h,!0)}}class x extends y{fillPolygon(t,e){const s=this._fillPolygon(t,e),i=Object.assign({},e,{hachureAngle:e.hachureAngle+90}),h=this._fillPolygon(t,i);return s.ops=s.ops.concat(h.ops),s}fillEllipse(t,e,s,i,h){const n=this._fillEllipse(t,e,s,i,h),a=Object.assign({},h,{hachureAngle:h.hachureAngle+90}),o=this._fillEllipse(t,e,s,i,a);return n.ops=n.ops.concat(o.ops),n}}class _{constructor(t){this.helper=t}fillPolygon(t,e){const s=d(t,e=Object.assign({},e,{curveStepCount:4,hachureAngle:0}));return this.dotsOnLines(s,e)}fillEllipse(t,e,s,i,h){h=Object.assign({},h,{curveStepCount:4,hachureAngle:0});const n=g(this.helper,t,e,s,i,h);return this.dotsOnLines(n,h)}fillArc(t,e,s,i,h,n,a){return null}dotsOnLines(t,e){let s=[],i=e.hachureGap;i<0&&(i=4*e.strokeWidth),i=Math.max(i,.1);let h=e.fillWeight;h<0&&(h=e.strokeWidth/2);for(const n of t){const t=p(n)/i,a=Math.ceil(t)-1,o=Math.atan((n[1][1]-n[0][1])/(n[1][0]-n[0][0]));for(let t=0;t<a;t++){const a=i*(t+1),r=a*Math.sin(o),l=a*Math.cos(o),c=[n[0][0]-l,n[0][1]+r],p=this.helper.randOffsetWithRange(c[0]-i/4,c[0]+i/4,e),u=this.helper.randOffsetWithRange(c[1]-i/4,c[1]+i/4,e),f=this.helper.ellipse(p,u,h,h,e);s=s.concat(f.ops)}}return{type:"fillSketch",ops:s}}}class b{constructor(t){this.helper=t}fillPolygon(t,e){const s=[Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER],i=[Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER];t.forEach(t=>{s[0]=Math.min(s[0],t[0]),s[1]=Math.max(s[1],t[0]),i[0]=Math.min(i[0],t[1]),i[1]=Math.max(i[1],t[1])});const h=function(t){let e=0,s=0,i=0;for(let s=0;s<t.length;s++){const i=t[s],h=s===t.length-1?t[0]:t[s+1];e+=i[0]*h[1]-h[0]*i[1]}e/=2;for(let e=0;e<t.length;e++){const h=t[e],n=e===t.length-1?t[0]:t[e+1];s+=(h[0]+n[0])*(h[0]*n[1]-n[0]*h[1]),i+=(h[1]+n[1])*(h[0]*n[1]-n[0]*h[1])}return[s/(6*e),i/(6*e)]}(t),n=Math.max(Math.sqrt(Math.pow(h[0]-s[0],2)+Math.pow(h[1]-i[0],2)),Math.sqrt(Math.pow(h[0]-s[1],2)+Math.pow(h[1]-i[1],2))),a=e.hachureGap>0?e.hachureGap:4*e.strokeWidth,o=[];if(t.length>2)for(let e=0;e<t.length;e++)e===t.length-1?o.push([t[e],t[0]]):o.push([t[e],t[e+1]]);let r=[];const c=Math.max(1,Math.PI*n/a);for(let t=0;t<c;t++){const e=t*Math.PI/c,a=[h,[h[0]+n*Math.cos(e),h[1]+n*Math.sin(e)]];o.forEach(t=>{const e=l(t,a);e&&e[0]>=s[0]&&e[0]<=s[1]&&e[1]>=i[0]&&e[1]<=i[1]&&r.push(e)})}r=this.removeDuplocatePoints(r);const p=this.createLinesFromCenter(h,r);return{type:"fillSketch",ops:this.drawLines(p,e)}}fillEllipse(t,e,s,i,h){return this.fillArcSegment(t,e,s,i,0,2*Math.PI,h)}fillArc(t,e,s,i,h,n,a){return this.fillArcSegment(t,e,s,i,h,n,a)}fillArcSegment(t,e,s,i,h,n,a){const o=[t,e],r=s/2,l=i/2,c=Math.max(s/2,i/2);let p=a.hachureGap;p<0&&(p=4*a.strokeWidth);const u=Math.max(1,Math.abs(n-h)*c/p);let f=[];for(let t=0;t<u;t++){const e=t*((n-h)/u)+h,s=c*Math.cos(e),i=c*Math.sin(e),a=Math.sqrt(r*r*i*i+l*l*s*s),p=r*l*s/a,d=r*l*i/a;f.push([o[0]+p,o[1]+d])}f=this.removeDuplocatePoints(f);const d=this.createLinesFromCenter(o,f);return{type:"fillSketch",ops:this.drawLines(d,a)}}drawLines(t,e){let s=[];return t.forEach(t=>{const i=t[0],h=t[1];s=s.concat(this.helper.doubleLineOps(i[0],i[1],h[0],h[1],e))}),s}createLinesFromCenter(t,e){return e.map(e=>[t,e])}removeDuplocatePoints(t){const e=new Set;return t.filter(t=>{const s=t.join(",");return!e.has(s)&&(e.add(s),!0)})}}class m{constructor(t){this.helper=t}fillPolygon(t,e){const s=d(t,e);return{type:"fillSketch",ops:this.dashedLine(s,e)}}fillEllipse(t,e,s,i,h){const n=g(this.helper,t,e,s,i,h);return{type:"fillSketch",ops:this.dashedLine(n,h)}}fillArc(t,e,s,i,h,n,a){return null}dashedLine(t,e){const s=e.dashOffset<0?e.hachureGap<0?4*e.strokeWidth:e.hachureGap:e.dashOffset,i=e.dashGap<0?e.hachureGap<0?4*e.strokeWidth:e.hachureGap:e.dashGap;let h=[];return t.forEach(t=>{const n=p(t),a=Math.floor(n/(s+i)),o=(n+i-a*(s+i))/2;let r=t[0],l=t[1];r[0]>l[0]&&(r=t[1],l=t[0]);const c=Math.atan((l[1]-r[1])/(l[0]-r[0]));for(let t=0;t<a;t++){const n=t*(s+i),a=n+s,l=[r[0]+n*Math.cos(c)+o*Math.cos(c),r[1]+n*Math.sin(c)+o*Math.sin(c)],p=[r[0]+a*Math.cos(c)+o*Math.cos(c),r[1]+a*Math.sin(c)+o*Math.sin(c)];h=h.concat(this.helper.doubleLineOps(l[0],l[1],p[0],p[1],e))}}),h}}class w{constructor(t){this.helper=t}fillPolygon(t,e){const s=e.hachureGap<0?4*e.strokeWidth:e.hachureGap,i=e.zigzagOffset<0?s:e.zigzagOffset,h=d(t,e=Object.assign({},e,{hachureGap:s+i}));return{type:"fillSketch",ops:this.zigzagLines(h,i,e)}}fillEllipse(t,e,s,i,h){const n=h.hachureGap<0?4*h.strokeWidth:h.hachureGap,a=h.zigzagOffset<0?n:h.zigzagOffset;h=Object.assign({},h,{hachureGap:n+a});const o=g(this.helper,t,e,s,i,h);return{type:"fillSketch",ops:this.zigzagLines(o,a,h)}}fillArc(t,e,s,i,h,n,a){return null}zigzagLines(t,e,s){let i=[];return t.forEach(t=>{const h=p(t),n=Math.round(h/(2*e));let a=t[0],o=t[1];a[0]>o[0]&&(a=t[1],o=t[0]);const r=Math.atan((o[1]-a[1])/(o[0]-a[0]));for(let t=0;t<n;t++){const h=2*t*e,n=2*(t+1)*e,o=Math.sqrt(2*Math.pow(e,2)),l=[a[0]+h*Math.cos(r),a[1]+h*Math.sin(r)],c=[a[0]+n*Math.cos(r),a[1]+n*Math.sin(r)],p=[l[0]+o*Math.cos(r+Math.PI/4),l[1]+o*Math.sin(r+Math.PI/4)];i=(i=i.concat(this.helper.doubleLineOps(l[0],l[1],p[0],p[1],s))).concat(this.helper.doubleLineOps(p[0],p[1],c[0],c[1],s))}}),i}}const k={};function P(t,e){let s=t.fillStyle||"hachure";if(!k[s])switch(s){case"zigzag":k[s]||(k[s]=new M(e));break;case"cross-hatch":k[s]||(k[s]=new x(e));break;case"dots":k[s]||(k[s]=new _(e));break;case"starburst":k[s]||(k[s]=new b(e));break;case"dashed":k[s]||(k[s]=new m(e));break;case"zigzag-line":k[s]||(k[s]=new w(e));break;case"hachure":default:k[s="hachure"]||(k[s]=new y(e))}return k[s]}const v={randOffset:function(t,e){return W(t,e)},randOffsetWithRange:function(t,e,s){return N(t,e,s)},ellipse:T,doubleLineOps:function(t,e,s,i,h){return R(t,e,s,i,h)}};function S(t,e,s,i,h){return{type:"path",ops:R(t,e,s,i,h)}}function A(t,e,s){const i=(t||[]).length;if(i>2){let h=[];for(let e=0;e<i-1;e++)h=h.concat(R(t[e][0],t[e][1],t[e+1][0],t[e+1][1],s));return e&&(h=h.concat(R(t[i-1][0],t[i-1][1],t[0][0],t[0][1],s))),{type:"path",ops:h}}return 2===i?S(t[0][0],t[0][1],t[1][0],t[1][1],s):{type:"path",ops:[]}}function E(t,e,s,i,h){return function(t,e){return A(t,!0,e)}([[t,e],[t+s,e],[t+s,e+i],[t,e+i]],h)}function O(t,e){const s=D(t,1*(1+.2*e.roughness),e),i=D(t,1.5*(1+.22*e.roughness),e);return{type:"path",ops:s.concat(i)}}function T(t,e,s,i,h){const n=2*Math.PI/h.curveStepCount;let a=Math.abs(s/2),o=Math.abs(i/2);const r=$(n,t,e,a+=W(.05*a,h),o+=W(.05*o,h),1,n*N(.1,N(.4,1,h),h),h),l=$(n,t,e,a,o,1.5,0,h);return{type:"path",ops:r.concat(l)}}function C(t,e,s,i,h,n,a,o,r){const l=t,c=e;let p=Math.abs(s/2),u=Math.abs(i/2);p+=W(.01*p,r),u+=W(.01*u,r);let f=h,d=n;for(;f<0;)f+=2*Math.PI,d+=2*Math.PI;d-f>2*Math.PI&&(f=0,d=2*Math.PI);const g=2*Math.PI/r.curveStepCount,y=Math.min(g/2,(d-f)/2),M=G(y,l,c,p,u,f,d,1,r),x=G(y,l,c,p,u,f,d,1.5,r);let _=M.concat(x);return a&&(o?_=(_=_.concat(R(l,c,l+p*Math.cos(f),c+u*Math.sin(f),r))).concat(R(l,c,l+p*Math.cos(d),c+u*Math.sin(d),r)):(_.push({op:"lineTo",data:[l,c]}),_.push({op:"lineTo",data:[l+p*Math.cos(f),c+u*Math.sin(f)]}))),{type:"path",ops:_}}function z(t,e){const s=[];if(t.length){const i=e.maxRandomnessOffset||0,h=t.length;if(h>2){s.push({op:"move",data:[t[0][0]+W(i,e),t[0][1]+W(i,e)]});for(let n=1;n<h;n++)s.push({op:"lineTo",data:[t[n][0]+W(i,e),t[n][1]+W(i,e)]})}}return{type:"fillPath",ops:s}}function L(t,e){return P(e,v).fillPolygon(t,e)}function N(t,e,s){return s.roughness*(Math.random()*(e-t)+t)}function W(t,e){return N(-t,t,e)}function R(t,e,s,i,h){const n=I(t,e,s,i,h,!0,!1),a=I(t,e,s,i,h,!0,!0);return n.concat(a)}function I(t,e,s,i,h,n,a){const o=Math.pow(t-s,2)+Math.pow(e-i,2);let r=h.maxRandomnessOffset||0;r*r*100>o&&(r=Math.sqrt(o)/10);const l=r/2,c=.2+.2*Math.random();let p=h.bowing*h.maxRandomnessOffset*(i-e)/200,u=h.bowing*h.maxRandomnessOffset*(t-s)/200;p=W(p,h),u=W(u,h);const f=[],d=()=>W(l,h),g=()=>W(r,h);return n&&(a?f.push({op:"move",data:[t+d(),e+d()]}):f.push({op:"move",data:[t+W(r,h),e+W(r,h)]})),a?f.push({op:"bcurveTo",data:[p+t+(s-t)*c+d(),u+e+(i-e)*c+d(),p+t+2*(s-t)*c+d(),u+e+2*(i-e)*c+d(),s+d(),i+d()]}):f.push({op:"bcurveTo",data:[p+t+(s-t)*c+g(),u+e+(i-e)*c+g(),p+t+2*(s-t)*c+g(),u+e+2*(i-e)*c+g(),s+g(),i+g()]}),f}function D(t,e,s){const i=[];i.push([t[0][0]+W(e,s),t[0][1]+W(e,s)]),i.push([t[0][0]+W(e,s),t[0][1]+W(e,s)]);for(let h=1;h<t.length;h++)i.push([t[h][0]+W(e,s),t[h][1]+W(e,s)]),h===t.length-1&&i.push([t[h][0]+W(e,s),t[h][1]+W(e,s)]);return q(i,null,s)}function q(t,e,s){const i=t.length;let h=[];if(i>3){const n=[],a=1-s.curveTightness;h.push({op:"move",data:[t[1][0],t[1][1]]});for(let e=1;e+2<i;e++){const s=t[e];n[0]=[s[0],s[1]],n[1]=[s[0]+(a*t[e+1][0]-a*t[e-1][0])/6,s[1]+(a*t[e+1][1]-a*t[e-1][1])/6],n[2]=[t[e+1][0]+(a*t[e][0]-a*t[e+2][0])/6,t[e+1][1]+(a*t[e][1]-a*t[e+2][1])/6],n[3]=[t[e+1][0],t[e+1][1]],h.push({op:"bcurveTo",data:[n[1][0],n[1][1],n[2][0],n[2][1],n[3][0],n[3][1]]})}if(e&&2===e.length){const t=s.maxRandomnessOffset;h.push({op:"lineTo",data:[e[0]+W(t,s),e[1]+W(t,s)]})}}else 3===i?(h.push({op:"move",data:[t[1][0],t[1][1]]}),h.push({op:"bcurveTo",data:[t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1]]})):2===i&&(h=h.concat(R(t[0][0],t[0][1],t[1][0],t[1][1],s)));return h}function $(t,e,s,i,h,n,a,o){const r=W(.5,o)-Math.PI/2,l=[];l.push([W(n,o)+e+.9*i*Math.cos(r-t),W(n,o)+s+.9*h*Math.sin(r-t)]);for(let a=r;a<2*Math.PI+r-.01;a+=t)l.push([W(n,o)+e+i*Math.cos(a),W(n,o)+s+h*Math.sin(a)]);return l.push([W(n,o)+e+i*Math.cos(r+2*Math.PI+.5*a),W(n,o)+s+h*Math.sin(r+2*Math.PI+.5*a)]),l.push([W(n,o)+e+.98*i*Math.cos(r+a),W(n,o)+s+.98*h*Math.sin(r+a)]),l.push([W(n,o)+e+.9*i*Math.cos(r+.5*a),W(n,o)+s+.9*h*Math.sin(r+.5*a)]),q(l,null,o)}function G(t,e,s,i,h,n,a,o,r){const l=n+W(.1,r),c=[];c.push([W(o,r)+e+.9*i*Math.cos(l-t),W(o,r)+s+.9*h*Math.sin(l-t)]);for(let n=l;n<=a;n+=t)c.push([W(o,r)+e+i*Math.cos(n),W(o,r)+s+h*Math.sin(n)]);return c.push([e+i*Math.cos(a),s+h*Math.sin(a)]),c.push([e+i*Math.cos(a),s+h*Math.sin(a)]),q(c,null,r)}function B(t,e,s,i,h,n,a,o){const r=[],l=[o.maxRandomnessOffset||1,(o.maxRandomnessOffset||1)+.5];let c=[0,0];for(let p=0;p<2;p++)0===p?r.push({op:"move",data:[a.x,a.y]}):r.push({op:"move",data:[a.x+W(l[0],o),a.y+W(l[0],o)]}),c=[h+W(l[p],o),n+W(l[p],o)],r.push({op:"bcurveTo",data:[t+W(l[p],o),e+W(l[p],o),s+W(l[p],o),i+W(l[p],o),c[0],c[1]]});return a.setPosition(c[0],c[1]),r}function X(t,e,s,i){let h=[];switch(e.key){case"M":case"m":{const s="m"===e.key;if(e.data.length>=2){let n=+e.data[0],a=+e.data[1];s&&(n+=t.x,a+=t.y);const o=1*(i.maxRandomnessOffset||0);n+=W(o,i),a+=W(o,i),t.setPosition(n,a),h.push({op:"move",data:[n,a]})}break}case"L":case"l":{const s="l"===e.key;if(e.data.length>=2){let n=+e.data[0],a=+e.data[1];s&&(n+=t.x,a+=t.y),h=h.concat(R(t.x,t.y,n,a,i)),t.setPosition(n,a)}break}case"H":case"h":{const s="h"===e.key;if(e.data.length){let n=+e.data[0];s&&(n+=t.x),h=h.concat(R(t.x,t.y,n,t.y,i)),t.setPosition(n,t.y)}break}case"V":case"v":{const s="v"===e.key;if(e.data.length){let n=+e.data[0];s&&(n+=t.y),h=h.concat(R(t.x,t.y,t.x,n,i)),t.setPosition(t.x,n)}break}case"Z":case"z":t.first&&(h=h.concat(R(t.x,t.y,t.first[0],t.first[1],i)),t.setPosition(t.first[0],t.first[1]),t.first=null);break;case"C":case"c":{const s="c"===e.key;if(e.data.length>=6){let n=+e.data[0],a=+e.data[1],o=+e.data[2],r=+e.data[3],l=+e.data[4],c=+e.data[5];s&&(n+=t.x,o+=t.x,l+=t.x,a+=t.y,r+=t.y,c+=t.y);const p=B(n,a,o,r,l,c,t,i);h=h.concat(p),t.bezierReflectionPoint=[l+(l-o),c+(c-r)]}break}case"S":case"s":{const n="s"===e.key;if(e.data.length>=4){let a=+e.data[0],o=+e.data[1],r=+e.data[2],l=+e.data[3];n&&(a+=t.x,r+=t.x,o+=t.y,l+=t.y);let c=a,p=o;const u=s?s.key:"";let f=null;"c"!==u&&"C"!==u&&"s"!==u&&"S"!==u||(f=t.bezierReflectionPoint),f&&(c=f[0],p=f[1]);const d=B(c,p,a,o,r,l,t,i);h=h.concat(d),t.bezierReflectionPoint=[r+(r-a),l+(l-o)]}break}case"Q":case"q":{const s="q"===e.key;if(e.data.length>=4){let n=+e.data[0],a=+e.data[1],o=+e.data[2],r=+e.data[3];s&&(n+=t.x,o+=t.x,a+=t.y,r+=t.y);const l=1*(1+.2*i.roughness),c=1.5*(1+.22*i.roughness);h.push({op:"move",data:[t.x+W(l,i),t.y+W(l,i)]});let p=[o+W(l,i),r+W(l,i)];h.push({op:"qcurveTo",data:[n+W(l,i),a+W(l,i),p[0],p[1]]}),h.push({op:"move",data:[t.x+W(c,i),t.y+W(c,i)]}),p=[o+W(c,i),r+W(c,i)],h.push({op:"qcurveTo",data:[n+W(c,i),a+W(c,i),p[0],p[1]]}),t.setPosition(p[0],p[1]),t.quadReflectionPoint=[o+(o-n),r+(r-a)]}break}case"T":case"t":{const n="t"===e.key;if(e.data.length>=2){let a=+e.data[0],o=+e.data[1];n&&(a+=t.x,o+=t.y);let r=a,l=o;const c=s?s.key:"";let p=null;"q"!==c&&"Q"!==c&&"t"!==c&&"T"!==c||(p=t.quadReflectionPoint),p&&(r=p[0],l=p[1]);const u=1*(1+.2*i.roughness),f=1.5*(1+.22*i.roughness);h.push({op:"move",data:[t.x+W(u,i),t.y+W(u,i)]});let d=[a+W(u,i),o+W(u,i)];h.push({op:"qcurveTo",data:[r+W(u,i),l+W(u,i),d[0],d[1]]}),h.push({op:"move",data:[t.x+W(f,i),t.y+W(f,i)]}),d=[a+W(f,i),o+W(f,i)],h.push({op:"qcurveTo",data:[r+W(f,i),l+W(f,i),d[0],d[1]]}),t.setPosition(d[0],d[1]),t.quadReflectionPoint=[a+(a-r),o+(o-l)]}break}case"A":case"a":{const s="a"===e.key;if(e.data.length>=7){const n=+e.data[0],o=+e.data[1],r=+e.data[2],l=+e.data[3],c=+e.data[4];let p=+e.data[5],u=+e.data[6];if(s&&(p+=t.x,u+=t.y),p===t.x&&u===t.y)break;if(0===n||0===o)h=h.concat(R(t.x,t.y,p,u,i)),t.setPosition(p,u);else for(let e=0;e<1;e++){const e=new a([t.x,t.y],[p,u],[n,o],r,!!l,!!c);let s=e.getNextSegment();for(;s;){const n=B(s.cp1[0],s.cp1[1],s.cp2[0],s.cp2[1],s.to[0],s.to[1],t,i);h=h.concat(n),s=e.getNextSegment()}}}break}}return h}class U extends e{line(t,e,s,i,h){const n=this._options(h);return this._drawable("line",[S(t,e,s,i,n)],n)}rectangle(t,e,s,i,h){const n=this._options(h),a=[];if(n.fill){const h=[[t,e],[t+s,e],[t+s,e+i],[t,e+i]];"solid"===n.fillStyle?a.push(z(h,n)):a.push(L(h,n))}return a.push(E(t,e,s,i,n)),this._drawable("rectangle",a,n)}ellipse(t,e,s,i,h){const n=this._options(h),a=[];if(n.fill)if("solid"===n.fillStyle){const h=T(t,e,s,i,n);h.type="fillPath",a.push(h)}else a.push(function(t,e,s,i,h){return P(h,v).fillEllipse(t,e,s,i,h)}(t,e,s,i,n));return a.push(T(t,e,s,i,n)),this._drawable("ellipse",a,n)}circle(t,e,s,i){const h=this.ellipse(t,e,s,s,i);return h.shape="circle",h}linearPath(t,e){const s=this._options(e);return this._drawable("linearPath",[A(t,!1,s)],s)}arc(t,e,s,i,h,n,a=!1,o){const r=this._options(o),l=[];if(a&&r.fill)if("solid"===r.fillStyle){const a=C(t,e,s,i,h,n,!0,!1,r);a.type="fillPath",l.push(a)}else l.push(function(t,e,s,i,h,n,a){const o=P(a,v).fillArc(t,e,s,i,h,n,a);if(o)return o;const r=t,l=e;let c=Math.abs(s/2),p=Math.abs(i/2);c+=W(.01*c,a),p+=W(.01*p,a);let u=h,f=n;for(;u<0;)u+=2*Math.PI,f+=2*Math.PI;f-u>2*Math.PI&&(u=0,f=2*Math.PI);const d=(f-u)/a.curveStepCount,g=[];for(let t=u;t<=f;t+=d)g.push([r+c*Math.cos(t),l+p*Math.sin(t)]);return g.push([r+c*Math.cos(f),l+p*Math.sin(f)]),g.push([r,l]),L(g,a)}(t,e,s,i,h,n,r));return l.push(C(t,e,s,i,h,n,a,!0,r)),this._drawable("arc",l,r)}curve(t,e){const s=this._options(e);return this._drawable("curve",[O(t,s)],s)}polygon(t,e){const s=this._options(e),i=[];if(s.fill)if("solid"===s.fillStyle)i.push(z(t,s));else{const e=this.computePolygonSize(t),h=L([[0,0],[e[0],0],[e[0],e[1]],[0,e[1]]],s);h.type="path2Dpattern",h.size=e,h.path=this.polygonPath(t),i.push(h)}return i.push(A(t,!0,s)),this._drawable("polygon",i,s)}path(t,e){const s=this._options(e),i=[];if(!t)return this._drawable("path",i,s);if(s.fill)if("solid"===s.fillStyle){const e={type:"path2Dfill",path:t,ops:[]};i.push(e)}else{const e=this.computePathSize(t),h=L([[0,0],[e[0],0],[e[0],e[1]],[0,e[1]]],s);h.type="path2Dpattern",h.size=e,h.path=t,i.push(h)}return i.push(function(t,e){t=(t||"").replace(/\n/g," ").replace(/(-\s)/g,"-").replace("/(ss)/g"," ");let s=new n(t);if(e.simplification){const t=new o(s.linearPoints,s.closed).fit(e.simplification);s=new n(t)}let i=[];const h=s.segments||[];for(let t=0;t<h.length;t++){const n=X(s,h[t],t>0?h[t-1]:null,e);n&&n.length&&(i=i.concat(n))}return{type:"path",ops:i}}(t,s)),this._drawable("path",i,s)}}const V="undefined"!=typeof document;class j{constructor(t){this.canvas=t,this.ctx=this.canvas.getContext("2d")}draw(t){const e=t.sets||[],s=t.options||this.getDefaultOptions(),i=this.ctx;for(const t of e)switch(t.type){case"path":i.save(),i.strokeStyle=s.stroke,i.lineWidth=s.strokeWidth,this._drawToContext(i,t),i.restore();break;case"fillPath":i.save(),i.fillStyle=s.fill||"",this._drawToContext(i,t),i.restore();break;case"fillSketch":this.fillSketch(i,t,s);break;case"path2Dfill":{this.ctx.save(),this.ctx.fillStyle=s.fill||"";const e=new Path2D(t.path);this.ctx.fill(e),this.ctx.restore();break}case"path2Dpattern":{const e=this.canvas.ownerDocument||V&&document;if(e){const i=t.size,h=e.createElement("canvas"),n=h.getContext("2d"),a=this.computeBBox(t.path);a&&(a.width||a.height)?(h.width=this.canvas.width,h.height=this.canvas.height,n.translate(a.x||0,a.y||0)):(h.width=i[0],h.height=i[1]),this.fillSketch(n,t,s),this.ctx.save(),this.ctx.fillStyle=this.ctx.createPattern(h,"repeat");const o=new Path2D(t.path);this.ctx.fill(o),this.ctx.restore()}else console.error("Cannot render path2Dpattern. No defs/document defined.");break}}}computeBBox(t){if(V)try{const e="http://www.w3.org/2000/svg",s=document.createElementNS(e,"svg");s.setAttribute("width","0"),s.setAttribute("height","0");const i=self.document.createElementNS(e,"path");i.setAttribute("d",t),s.appendChild(i),document.body.appendChild(s);const h=i.getBBox();return document.body.removeChild(s),h}catch(t){}return null}fillSketch(t,e,s){let i=s.fillWeight;i<0&&(i=s.strokeWidth/2),t.save(),t.strokeStyle=s.fill||"",t.lineWidth=i,this._drawToContext(t,e),t.restore()}_drawToContext(t,e){t.beginPath();for(const s of e.ops){const e=s.data;switch(s.op){case"move":t.moveTo(e[0],e[1]);break;case"bcurveTo":t.bezierCurveTo(e[0],e[1],e[2],e[3],e[4],e[5]);break;case"qcurveTo":t.quadraticCurveTo(e[0],e[1],e[2],e[3]);break;case"lineTo":t.lineTo(e[0],e[1])}}"fillPath"===e.type?t.fill():t.stroke()}}class F extends j{constructor(t,e){super(t),this.gen=new U(e||null,this.canvas)}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}line(t,e,s,i,h){const n=this.gen.line(t,e,s,i,h);return this.draw(n),n}rectangle(t,e,s,i,h){const n=this.gen.rectangle(t,e,s,i,h);return this.draw(n),n}ellipse(t,e,s,i,h){const n=this.gen.ellipse(t,e,s,i,h);return this.draw(n),n}circle(t,e,s,i){const h=this.gen.circle(t,e,s,i);return this.draw(h),h}linearPath(t,e){const s=this.gen.linearPath(t,e);return this.draw(s),s}polygon(t,e){const s=this.gen.polygon(t,e);return this.draw(s),s}arc(t,e,s,i,h,n,a=!1,o){const r=this.gen.arc(t,e,s,i,h,n,a,o);return this.draw(r),r}curve(t,e){const s=this.gen.curve(t,e);return this.draw(s),s}path(t,e){const s=this.gen.path(t,e);return this.draw(s),s}}const Q="undefined"!=typeof document;class Z{constructor(t){this.svg=t}get defs(){const t=this.svg.ownerDocument||Q&&document;if(t&&!this._defs){const e=t.createElementNS("http://www.w3.org/2000/svg","defs");this.svg.firstChild?this.svg.insertBefore(e,this.svg.firstChild):this.svg.appendChild(e),this._defs=e}return this._defs||null}draw(t){const e=t.sets||[],s=t.options||this.getDefaultOptions(),i=this.svg.ownerDocument||window.document,h=i.createElementNS("http://www.w3.org/2000/svg","g");for(const t of e){let e=null;switch(t.type){case"path":(e=i.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",this.opsToPath(t)),e.style.stroke=s.stroke,e.style.strokeWidth=s.strokeWidth+"",e.style.fill="none";break;case"fillPath":(e=i.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",this.opsToPath(t)),e.style.stroke="none",e.style.strokeWidth="0",e.style.fill=s.fill||null;break;case"fillSketch":e=this.fillSketch(i,t,s);break;case"path2Dfill":(e=i.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",t.path||""),e.style.stroke="none",e.style.strokeWidth="0",e.style.fill=s.fill||null;break;case"path2Dpattern":if(this.defs){const h=t.size,n=i.createElementNS("http://www.w3.org/2000/svg","pattern"),a=`rough-${Math.floor(Math.random()*(Number.MAX_SAFE_INTEGER||999999))}`;n.setAttribute("id",a),n.setAttribute("x","0"),n.setAttribute("y","0"),n.setAttribute("width","1"),n.setAttribute("height","1"),n.setAttribute("height","1"),n.setAttribute("viewBox",`0 0 ${Math.round(h[0])} ${Math.round(h[1])}`),n.setAttribute("patternUnits","objectBoundingBox");const o=this.fillSketch(i,t,s);n.appendChild(o),this.defs.appendChild(n),(e=i.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",t.path||""),e.style.stroke="none",e.style.strokeWidth="0",e.style.fill=`url(#${a})`}else console.error("Cannot render path2Dpattern. No defs/document defined.")}e&&h.appendChild(e)}return h}fillSketch(t,e,s){let i=s.fillWeight;i<0&&(i=s.strokeWidth/2);const h=t.createElementNS("http://www.w3.org/2000/svg","path");return h.setAttribute("d",this.opsToPath(e)),h.style.stroke=s.fill||null,h.style.strokeWidth=i+"",h.style.fill="none",h}}class H extends Z{constructor(t,e){super(t),this.gen=new U(e||null,this.svg)}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}opsToPath(t){return this.gen.opsToPath(t)}line(t,e,s,i,h){const n=this.gen.line(t,e,s,i,h);return this.draw(n)}rectangle(t,e,s,i,h){const n=this.gen.rectangle(t,e,s,i,h);return this.draw(n)}ellipse(t,e,s,i,h){const n=this.gen.ellipse(t,e,s,i,h);return this.draw(n)}circle(t,e,s,i){const h=this.gen.circle(t,e,s,i);return this.draw(h)}linearPath(t,e){const s=this.gen.linearPath(t,e);return this.draw(s)}polygon(t,e){const s=this.gen.polygon(t,e);return this.draw(s)}arc(t,e,s,i,h,n,a=!1,o){const r=this.gen.arc(t,e,s,i,h,n,a,o);return this.draw(r)}curve(t,e){const s=this.gen.curve(t,e);return this.draw(s)}path(t,e){const s=this.gen.path(t,e);return this.draw(s)}}return{canvas:(t,e)=>new F(t,e),svg:(t,e)=>new H(t,e),generator:(t,e)=>new U(t,e)}}();

},{}],"../src/bool.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var bool = function bool(max, min) {
  return Boolean(Math.round(Math.random()));
};

var _default = bool;
exports.default = _default;
},{}],"../node_modules/d3-array/src/ascending.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
},{}],"../node_modules/d3-array/src/bisector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _ascending = _interopRequireDefault(require("./ascending.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function (a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;

      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
      }

      return lo;
    },
    right: function (a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;

      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
      }

      return lo;
    }
  };
}

function ascendingComparator(f) {
  return function (d, x) {
    return (0, _ascending.default)(f(d), x);
  };
}
},{"./ascending.js":"../node_modules/d3-array/src/ascending.js"}],"../node_modules/d3-array/src/bisect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.bisectLeft = exports.bisectRight = void 0;

var _ascending = _interopRequireDefault(require("./ascending.js"));

var _bisector = _interopRequireDefault(require("./bisector.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ascendingBisect = (0, _bisector.default)(_ascending.default);
var bisectRight = ascendingBisect.right;
exports.bisectRight = bisectRight;
var bisectLeft = ascendingBisect.left;
exports.bisectLeft = bisectLeft;
var _default = bisectRight;
exports.default = _default;
},{"./ascending.js":"../node_modules/d3-array/src/ascending.js","./bisector.js":"../node_modules/d3-array/src/bisector.js"}],"../node_modules/d3-array/src/count.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = count;

function count(values, valueof) {
  let count = 0;

  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        ++count;
      }
    }
  } else {
    let index = -1;

    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        ++count;
      }
    }
  }

  return count;
}
},{}],"../node_modules/d3-array/src/cross.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cross;

function length(array) {
  return array.length | 0;
}

function empty(length) {
  return !(length > 0);
}

function arrayify(values) {
  return typeof values !== "object" || "length" in values ? values : Array.from(values);
}

function reducer(reduce) {
  return values => reduce(...values);
}

function cross(...values) {
  const reduce = typeof values[values.length - 1] === "function" && reducer(values.pop());
  values = values.map(arrayify);
  const lengths = values.map(length);
  const j = values.length - 1;
  const index = new Array(j + 1).fill(0);
  const product = [];
  if (j < 0 || lengths.some(empty)) return product;

  while (true) {
    product.push(index.map((j, i) => values[i][j]));
    let i = j;

    while (++index[i] === lengths[i]) {
      if (i === 0) return reduce ? product.map(reduce) : product;
      index[i--] = 0;
    }
  }
}
},{}],"../node_modules/d3-array/src/descending.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}
},{}],"../node_modules/d3-array/src/variance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = variance;

function variance(values, valueof) {
  let count = 0;
  let delta;
  let mean = 0;
  let sum = 0;

  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        delta = value - mean;
        mean += delta / ++count;
        sum += delta * (value - mean);
      }
    }
  } else {
    let index = -1;

    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        delta = value - mean;
        mean += delta / ++count;
        sum += delta * (value - mean);
      }
    }
  }

  if (count > 1) return sum / (count - 1);
}
},{}],"../node_modules/d3-array/src/deviation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deviation;

var _variance = _interopRequireDefault(require("./variance.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deviation(values, valueof) {
  const v = (0, _variance.default)(values, valueof);
  return v ? Math.sqrt(v) : v;
}
},{"./variance.js":"../node_modules/d3-array/src/variance.js"}],"../node_modules/d3-array/src/extent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(values, valueof) {
  let min;
  let max;

  if (valueof === undefined) {
    for (const value of values) {
      if (value != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  } else {
    let index = -1;

    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  }

  return [min, max];
}
},{}],"../node_modules/d3-array/src/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return x;
}
},{}],"../node_modules/d3-array/src/group.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = group;
exports.groups = groups;
exports.rollup = rollup;
exports.rollups = rollups;

var _identity = _interopRequireDefault(require("./identity.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function group(values, ...keys) {
  return nest(values, _identity.default, _identity.default, keys);
}

function groups(values, ...keys) {
  return nest(values, Array.from, _identity.default, keys);
}

function rollup(values, reduce, ...keys) {
  return nest(values, _identity.default, reduce, keys);
}

function rollups(values, reduce, ...keys) {
  return nest(values, Array.from, reduce, keys);
}

function nest(values, map, reduce, keys) {
  return function regroup(values, i) {
    if (i >= keys.length) return reduce(values);
    const groups = new Map();
    const keyof = keys[i++];
    let index = -1;

    for (const value of values) {
      const key = keyof(value, ++index, values);
      const group = groups.get(key);
      if (group) group.push(value);else groups.set(key, [value]);
    }

    for (const [key, values] of groups) {
      groups.set(key, regroup(values, i));
    }

    return map(groups);
  }(values, 0);
}
},{"./identity.js":"../node_modules/d3-array/src/identity.js"}],"../node_modules/d3-array/src/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = exports.slice = void 0;
var array = Array.prototype;
var slice = array.slice;
exports.slice = slice;
var map = array.map;
exports.map = map;
},{}],"../node_modules/d3-array/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return function () {
    return x;
  };
}
},{}],"../node_modules/d3-array/src/range.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}
},{}],"../node_modules/d3-array/src/ticks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.tickIncrement = tickIncrement;
exports.tickStep = tickStep;
var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function _default(start, stop, count) {
  var reverse,
      i = -1,
      n,
      ticks,
      step;
  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) n = start, start = stop, stop = n;
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array(n = Math.ceil(stop - start + 1));

    while (++i < n) ticks[i] = (start + i) * step;
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start - stop + 1));

    while (++i < n) ticks[i] = (start - i) / step;
  }

  if (reverse) ticks.reverse();
  return ticks;
}

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;else if (error >= e5) step1 *= 5;else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}
},{}],"../node_modules/d3-array/src/threshold/sturges.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(values) {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
}
},{}],"../node_modules/d3-array/src/bin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _array = require("./array.js");

var _bisect = _interopRequireDefault(require("./bisect.js"));

var _constant = _interopRequireDefault(require("./constant.js"));

var _extent = _interopRequireDefault(require("./extent.js"));

var _identity = _interopRequireDefault(require("./identity.js"));

var _range = _interopRequireDefault(require("./range.js"));

var _ticks = require("./ticks.js");

var _sturges = _interopRequireDefault(require("./threshold/sturges.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  var value = _identity.default,
      domain = _extent.default,
      threshold = _sturges.default;

  function histogram(data) {
    if (!Array.isArray(data)) data = Array.from(data);
    var i,
        n = data.length,
        x,
        values = new Array(n);

    for (i = 0; i < n; ++i) {
      values[i] = value(data[i], i, data);
    }

    var xz = domain(values),
        x0 = xz[0],
        x1 = xz[1],
        tz = threshold(values, x0, x1); // Convert number of thresholds into uniform thresholds.

    if (!Array.isArray(tz)) {
      tz = (0, _ticks.tickStep)(x0, x1, tz);
      tz = (0, _range.default)(Math.ceil(x0 / tz) * tz, x1, tz); // exclusive
    } // Remove any thresholds outside the domain.


    var m = tz.length;

    while (tz[0] <= x0) tz.shift(), --m;

    while (tz[m - 1] > x1) tz.pop(), --m;

    var bins = new Array(m + 1),
        bin; // Initialize bins.

    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x0;
      bin.x1 = i < m ? tz[i] : x1;
    } // Assign data to bins by value, ignoring any outside the domain.


    for (i = 0; i < n; ++i) {
      x = values[i];

      if (x0 <= x && x <= x1) {
        bins[(0, _bisect.default)(tz, x, 0, m)].push(data[i]);
      }
    }

    return bins;
  }

  histogram.value = function (_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : (0, _constant.default)(_), histogram) : value;
  };

  histogram.domain = function (_) {
    return arguments.length ? (domain = typeof _ === "function" ? _ : (0, _constant.default)([_[0], _[1]]), histogram) : domain;
  };

  histogram.thresholds = function (_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? (0, _constant.default)(_array.slice.call(_)) : (0, _constant.default)(_), histogram) : threshold;
  };

  return histogram;
}
},{"./array.js":"../node_modules/d3-array/src/array.js","./bisect.js":"../node_modules/d3-array/src/bisect.js","./constant.js":"../node_modules/d3-array/src/constant.js","./extent.js":"../node_modules/d3-array/src/extent.js","./identity.js":"../node_modules/d3-array/src/identity.js","./range.js":"../node_modules/d3-array/src/range.js","./ticks.js":"../node_modules/d3-array/src/ticks.js","./threshold/sturges.js":"../node_modules/d3-array/src/threshold/sturges.js"}],"../node_modules/d3-array/src/number.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.numbers = numbers;

function _default(x) {
  return x === null ? NaN : +x;
}

function* numbers(values, valueof) {
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        yield value;
      }
    }
  } else {
    let index = -1;

    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        yield value;
      }
    }
  }
}
},{}],"../node_modules/d3-array/src/quantile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quantile;
exports.quantileSorted = quantileSorted;

var _ascending = _interopRequireDefault(require("./ascending.js"));

var _number = _interopRequireWildcard(require("./number.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function quantile(values, p, valueof) {
  return quantileSorted(Float64Array.from((0, _number.numbers)(values, valueof)).sort(_ascending.default), p);
}

function quantileSorted(values, p, valueof = _number.default) {
  if (!(n = values.length)) return;
  if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}
},{"./ascending.js":"../node_modules/d3-array/src/ascending.js","./number.js":"../node_modules/d3-array/src/number.js"}],"../node_modules/d3-array/src/threshold/freedmanDiaconis.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _array = require("../array.js");

var _ascending = _interopRequireDefault(require("../ascending.js"));

var _number = _interopRequireDefault(require("../number.js"));

var _quantile = _interopRequireDefault(require("../quantile.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(values, min, max) {
  values = _array.map.call(values, _number.default).sort(_ascending.default);
  return Math.ceil((max - min) / (2 * ((0, _quantile.default)(values, 0.75) - (0, _quantile.default)(values, 0.25)) * Math.pow(values.length, -1 / 3)));
}
},{"../array.js":"../node_modules/d3-array/src/array.js","../ascending.js":"../node_modules/d3-array/src/ascending.js","../number.js":"../node_modules/d3-array/src/number.js","../quantile.js":"../node_modules/d3-array/src/quantile.js"}],"../node_modules/d3-array/src/threshold/scott.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _deviation = _interopRequireDefault(require("../deviation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(values, min, max) {
  return Math.ceil((max - min) / (3.5 * (0, _deviation.default)(values) * Math.pow(values.length, -1 / 3)));
}
},{"../deviation.js":"../node_modules/d3-array/src/deviation.js"}],"../node_modules/d3-array/src/max.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = max;

function max(values, valueof) {
  let max;

  if (valueof === undefined) {
    for (const value of values) {
      if (value != null && (max < value || max === undefined && value >= value)) {
        max = value;
      }
    }
  } else {
    let index = -1;

    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (max < value || max === undefined && value >= value)) {
        max = value;
      }
    }
  }

  return max;
}
},{}],"../node_modules/d3-array/src/maxIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = maxIndex;

function maxIndex(values, valueof) {
  let max;
  let maxIndex = -1;
  let index = -1;

  if (valueof === undefined) {
    for (const value of values) {
      ++index;

      if (value != null && (max < value || max === undefined && value >= value)) {
        max = value, maxIndex = index;
      }
    }
  } else {
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (max < value || max === undefined && value >= value)) {
        max = value, maxIndex = index;
      }
    }
  }

  return maxIndex;
}
},{}],"../node_modules/d3-array/src/mean.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mean;

function mean(values, valueof) {
  let count = 0;
  let sum = 0;

  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        ++count, sum += value;
      }
    }
  } else {
    let index = -1;

    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        ++count, sum += value;
      }
    }
  }

  if (count) return sum / count;
}
},{}],"../node_modules/d3-array/src/quickselect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quickselect;

var _ascending = _interopRequireDefault(require("./ascending.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Based on https://github.com/mourner/quickselect
// ISC license, Copyright 2018 Vladimir Agafonkin.
function quickselect(array, k, left = 0, right = array.length - 1, compare = _ascending.default) {
  while (right > left) {
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp(2 * z / 3);
      const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
      const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
      quickselect(array, k, newLeft, newRight, compare);
    }

    const t = array[k];
    let i = left;
    let j = right;
    swap(array, left, k);
    if (compare(array[right], t) > 0) swap(array, left, right);

    while (i < j) {
      swap(array, i, j), ++i, --j;

      while (compare(array[i], t) < 0) ++i;

      while (compare(array[j], t) > 0) --j;
    }

    if (compare(array[left], t) === 0) swap(array, left, j);else ++j, swap(array, j, right);
    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }

  return array;
}

function swap(array, i, j) {
  const t = array[i];
  array[i] = array[j];
  array[j] = t;
}
},{"./ascending.js":"../node_modules/d3-array/src/ascending.js"}],"../node_modules/d3-array/src/median.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _number = require("./number.js");

var _quantile = _interopRequireDefault(require("./quantile.js"));

var _quickselect = _interopRequireDefault(require("./quickselect.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(values, valueof) {
  values = Float64Array.from((0, _number.numbers)(values, valueof));
  if (!values.length) return;
  const n = values.length;
  const i = n >> 1;
  (0, _quickselect.default)(values, i - 1, 0);
  if ((n & 1) === 0) (0, _quickselect.default)(values, i, i);
  return (0, _quantile.default)(values, 0.5);
}
},{"./number.js":"../node_modules/d3-array/src/number.js","./quantile.js":"../node_modules/d3-array/src/quantile.js","./quickselect.js":"../node_modules/d3-array/src/quickselect.js"}],"../node_modules/d3-array/src/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;

function* flatten(arrays) {
  for (const array of arrays) {
    yield* array;
  }
}

function merge(arrays) {
  return Array.from(flatten(arrays));
}
},{}],"../node_modules/d3-array/src/min.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = min;

function min(values, valueof) {
  let min;

  if (valueof === undefined) {
    for (const value of values) {
      if (value != null && (min > value || min === undefined && value >= value)) {
        min = value;
      }
    }
  } else {
    let index = -1;

    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (min > value || min === undefined && value >= value)) {
        min = value;
      }
    }
  }

  return min;
}
},{}],"../node_modules/d3-array/src/minIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = minIndex;

function minIndex(values, valueof) {
  let min;
  let minIndex = -1;
  let index = -1;

  if (valueof === undefined) {
    for (const value of values) {
      ++index;

      if (value != null && (min > value || min === undefined && value >= value)) {
        min = value, minIndex = index;
      }
    }
  } else {
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (min > value || min === undefined && value >= value)) {
        min = value, minIndex = index;
      }
    }
  }

  return minIndex;
}
},{}],"../node_modules/d3-array/src/pairs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pairs;
exports.pair = pair;

function pairs(values, pairof = pair) {
  const pairs = [];
  let previous;
  let first = false;

  for (const value of values) {
    if (first) pairs.push(pairof(previous, value));
    previous = value;
    first = true;
  }

  return pairs;
}

function pair(a, b) {
  return [a, b];
}
},{}],"../node_modules/d3-array/src/permute.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(source, keys) {
  return Array.from(keys, key => source[key]);
}
},{}],"../node_modules/d3-array/src/least.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = least;

var _ascending = _interopRequireDefault(require("./ascending.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function least(values, compare = _ascending.default) {
  let min;
  let defined = false;

  if (compare.length === 1) {
    let minValue;

    for (const element of values) {
      const value = compare(element);

      if (defined ? (0, _ascending.default)(value, minValue) < 0 : (0, _ascending.default)(value, value) === 0) {
        min = element;
        minValue = value;
        defined = true;
      }
    }
  } else {
    for (const value of values) {
      if (defined ? compare(value, min) < 0 : compare(value, value) === 0) {
        min = value;
        defined = true;
      }
    }
  }

  return min;
}
},{"./ascending.js":"../node_modules/d3-array/src/ascending.js"}],"../node_modules/d3-array/src/leastIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = leastIndex;

var _ascending = _interopRequireDefault(require("./ascending.js"));

var _minIndex = _interopRequireDefault(require("./minIndex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function leastIndex(values, compare = _ascending.default) {
  if (compare.length === 1) return (0, _minIndex.default)(values, compare);
  let minValue;
  let min = -1;
  let index = -1;

  for (const value of values) {
    ++index;

    if (min < 0 ? compare(value, value) === 0 : compare(value, minValue) < 0) {
      minValue = value;
      min = index;
    }
  }

  return min;
}
},{"./ascending.js":"../node_modules/d3-array/src/ascending.js","./minIndex.js":"../node_modules/d3-array/src/minIndex.js"}],"../node_modules/d3-array/src/greatest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = greatest;

var _ascending = _interopRequireDefault(require("./ascending.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function greatest(values, compare = _ascending.default) {
  let max;
  let defined = false;

  if (compare.length === 1) {
    let maxValue;

    for (const element of values) {
      const value = compare(element);

      if (defined ? (0, _ascending.default)(value, maxValue) > 0 : (0, _ascending.default)(value, value) === 0) {
        max = element;
        maxValue = value;
        defined = true;
      }
    }
  } else {
    for (const value of values) {
      if (defined ? compare(value, max) > 0 : compare(value, value) === 0) {
        max = value;
        defined = true;
      }
    }
  }

  return max;
}
},{"./ascending.js":"../node_modules/d3-array/src/ascending.js"}],"../node_modules/d3-array/src/greatestIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = greatestIndex;

var _ascending = _interopRequireDefault(require("./ascending.js"));

var _maxIndex = _interopRequireDefault(require("./maxIndex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function greatestIndex(values, compare = _ascending.default) {
  if (compare.length === 1) return (0, _maxIndex.default)(values, compare);
  let maxValue;
  let max = -1;
  let index = -1;

  for (const value of values) {
    ++index;

    if (max < 0 ? compare(value, value) === 0 : compare(value, maxValue) > 0) {
      maxValue = value;
      max = index;
    }
  }

  return max;
}
},{"./ascending.js":"../node_modules/d3-array/src/ascending.js","./maxIndex.js":"../node_modules/d3-array/src/maxIndex.js"}],"../node_modules/d3-array/src/scan.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scan;

var _leastIndex = _interopRequireDefault(require("./leastIndex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scan(values, compare) {
  const index = (0, _leastIndex.default)(values, compare);
  return index < 0 ? undefined : index;
}
},{"./leastIndex.js":"../node_modules/d3-array/src/leastIndex.js"}],"../node_modules/d3-array/src/shuffle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shuffle;

function shuffle(array, i0 = 0, i1 = array.length) {
  var m = i1 - (i0 = +i0),
      t,
      i;

  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m + i0];
    array[m + i0] = array[i + i0];
    array[i + i0] = t;
  }

  return array;
}
},{}],"../node_modules/d3-array/src/sum.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sum;

function sum(values, valueof) {
  let sum = 0;

  if (valueof === undefined) {
    for (let value of values) {
      if (value = +value) {
        sum += value;
      }
    }
  } else {
    let index = -1;

    for (let value of values) {
      if (value = +valueof(value, ++index, values)) {
        sum += value;
      }
    }
  }

  return sum;
}
},{}],"../node_modules/d3-array/src/transpose.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _min = _interopRequireDefault(require("./min.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(matrix) {
  if (!(n = matrix.length)) return [];

  for (var i = -1, m = (0, _min.default)(matrix, length), transpose = new Array(m); ++i < m;) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }

  return transpose;
}

function length(d) {
  return d.length;
}
},{"./min.js":"../node_modules/d3-array/src/min.js"}],"../node_modules/d3-array/src/zip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _transpose = _interopRequireDefault(require("./transpose.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  return (0, _transpose.default)(arguments);
}
},{"./transpose.js":"../node_modules/d3-array/src/transpose.js"}],"../node_modules/d3-array/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "bisect", {
  enumerable: true,
  get: function () {
    return _bisect.default;
  }
});
Object.defineProperty(exports, "bisectRight", {
  enumerable: true,
  get: function () {
    return _bisect.bisectRight;
  }
});
Object.defineProperty(exports, "bisectLeft", {
  enumerable: true,
  get: function () {
    return _bisect.bisectLeft;
  }
});
Object.defineProperty(exports, "ascending", {
  enumerable: true,
  get: function () {
    return _ascending.default;
  }
});
Object.defineProperty(exports, "bisector", {
  enumerable: true,
  get: function () {
    return _bisector.default;
  }
});
Object.defineProperty(exports, "count", {
  enumerable: true,
  get: function () {
    return _count.default;
  }
});
Object.defineProperty(exports, "cross", {
  enumerable: true,
  get: function () {
    return _cross.default;
  }
});
Object.defineProperty(exports, "descending", {
  enumerable: true,
  get: function () {
    return _descending.default;
  }
});
Object.defineProperty(exports, "deviation", {
  enumerable: true,
  get: function () {
    return _deviation.default;
  }
});
Object.defineProperty(exports, "extent", {
  enumerable: true,
  get: function () {
    return _extent.default;
  }
});
Object.defineProperty(exports, "group", {
  enumerable: true,
  get: function () {
    return _group.default;
  }
});
Object.defineProperty(exports, "groups", {
  enumerable: true,
  get: function () {
    return _group.groups;
  }
});
Object.defineProperty(exports, "rollup", {
  enumerable: true,
  get: function () {
    return _group.rollup;
  }
});
Object.defineProperty(exports, "rollups", {
  enumerable: true,
  get: function () {
    return _group.rollups;
  }
});
Object.defineProperty(exports, "bin", {
  enumerable: true,
  get: function () {
    return _bin.default;
  }
});
Object.defineProperty(exports, "histogram", {
  enumerable: true,
  get: function () {
    return _bin.default;
  }
});
Object.defineProperty(exports, "thresholdFreedmanDiaconis", {
  enumerable: true,
  get: function () {
    return _freedmanDiaconis.default;
  }
});
Object.defineProperty(exports, "thresholdScott", {
  enumerable: true,
  get: function () {
    return _scott.default;
  }
});
Object.defineProperty(exports, "thresholdSturges", {
  enumerable: true,
  get: function () {
    return _sturges.default;
  }
});
Object.defineProperty(exports, "max", {
  enumerable: true,
  get: function () {
    return _max.default;
  }
});
Object.defineProperty(exports, "maxIndex", {
  enumerable: true,
  get: function () {
    return _maxIndex.default;
  }
});
Object.defineProperty(exports, "mean", {
  enumerable: true,
  get: function () {
    return _mean.default;
  }
});
Object.defineProperty(exports, "median", {
  enumerable: true,
  get: function () {
    return _median.default;
  }
});
Object.defineProperty(exports, "merge", {
  enumerable: true,
  get: function () {
    return _merge.default;
  }
});
Object.defineProperty(exports, "min", {
  enumerable: true,
  get: function () {
    return _min.default;
  }
});
Object.defineProperty(exports, "minIndex", {
  enumerable: true,
  get: function () {
    return _minIndex.default;
  }
});
Object.defineProperty(exports, "pairs", {
  enumerable: true,
  get: function () {
    return _pairs.default;
  }
});
Object.defineProperty(exports, "permute", {
  enumerable: true,
  get: function () {
    return _permute.default;
  }
});
Object.defineProperty(exports, "quantile", {
  enumerable: true,
  get: function () {
    return _quantile.default;
  }
});
Object.defineProperty(exports, "quantileSorted", {
  enumerable: true,
  get: function () {
    return _quantile.quantileSorted;
  }
});
Object.defineProperty(exports, "quickselect", {
  enumerable: true,
  get: function () {
    return _quickselect.default;
  }
});
Object.defineProperty(exports, "range", {
  enumerable: true,
  get: function () {
    return _range.default;
  }
});
Object.defineProperty(exports, "least", {
  enumerable: true,
  get: function () {
    return _least.default;
  }
});
Object.defineProperty(exports, "leastIndex", {
  enumerable: true,
  get: function () {
    return _leastIndex.default;
  }
});
Object.defineProperty(exports, "greatest", {
  enumerable: true,
  get: function () {
    return _greatest.default;
  }
});
Object.defineProperty(exports, "greatestIndex", {
  enumerable: true,
  get: function () {
    return _greatestIndex.default;
  }
});
Object.defineProperty(exports, "scan", {
  enumerable: true,
  get: function () {
    return _scan.default;
  }
});
Object.defineProperty(exports, "shuffle", {
  enumerable: true,
  get: function () {
    return _shuffle.default;
  }
});
Object.defineProperty(exports, "sum", {
  enumerable: true,
  get: function () {
    return _sum.default;
  }
});
Object.defineProperty(exports, "ticks", {
  enumerable: true,
  get: function () {
    return _ticks.default;
  }
});
Object.defineProperty(exports, "tickIncrement", {
  enumerable: true,
  get: function () {
    return _ticks.tickIncrement;
  }
});
Object.defineProperty(exports, "tickStep", {
  enumerable: true,
  get: function () {
    return _ticks.tickStep;
  }
});
Object.defineProperty(exports, "transpose", {
  enumerable: true,
  get: function () {
    return _transpose.default;
  }
});
Object.defineProperty(exports, "variance", {
  enumerable: true,
  get: function () {
    return _variance.default;
  }
});
Object.defineProperty(exports, "zip", {
  enumerable: true,
  get: function () {
    return _zip.default;
  }
});

var _bisect = _interopRequireWildcard(require("./bisect.js"));

var _ascending = _interopRequireDefault(require("./ascending.js"));

var _bisector = _interopRequireDefault(require("./bisector.js"));

var _count = _interopRequireDefault(require("./count.js"));

var _cross = _interopRequireDefault(require("./cross.js"));

var _descending = _interopRequireDefault(require("./descending.js"));

var _deviation = _interopRequireDefault(require("./deviation.js"));

var _extent = _interopRequireDefault(require("./extent.js"));

var _group = _interopRequireWildcard(require("./group.js"));

var _bin = _interopRequireDefault(require("./bin.js"));

var _freedmanDiaconis = _interopRequireDefault(require("./threshold/freedmanDiaconis.js"));

var _scott = _interopRequireDefault(require("./threshold/scott.js"));

var _sturges = _interopRequireDefault(require("./threshold/sturges.js"));

var _max = _interopRequireDefault(require("./max.js"));

var _maxIndex = _interopRequireDefault(require("./maxIndex.js"));

var _mean = _interopRequireDefault(require("./mean.js"));

var _median = _interopRequireDefault(require("./median.js"));

var _merge = _interopRequireDefault(require("./merge.js"));

var _min = _interopRequireDefault(require("./min.js"));

var _minIndex = _interopRequireDefault(require("./minIndex.js"));

var _pairs = _interopRequireDefault(require("./pairs.js"));

var _permute = _interopRequireDefault(require("./permute.js"));

var _quantile = _interopRequireWildcard(require("./quantile.js"));

var _quickselect = _interopRequireDefault(require("./quickselect.js"));

var _range = _interopRequireDefault(require("./range.js"));

var _least = _interopRequireDefault(require("./least.js"));

var _leastIndex = _interopRequireDefault(require("./leastIndex.js"));

var _greatest = _interopRequireDefault(require("./greatest.js"));

var _greatestIndex = _interopRequireDefault(require("./greatestIndex.js"));

var _scan = _interopRequireDefault(require("./scan.js"));

var _shuffle = _interopRequireDefault(require("./shuffle.js"));

var _sum = _interopRequireDefault(require("./sum.js"));

var _ticks = _interopRequireWildcard(require("./ticks.js"));

var _transpose = _interopRequireDefault(require("./transpose.js"));

var _variance = _interopRequireDefault(require("./variance.js"));

var _zip = _interopRequireDefault(require("./zip.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }
},{"./bisect.js":"../node_modules/d3-array/src/bisect.js","./ascending.js":"../node_modules/d3-array/src/ascending.js","./bisector.js":"../node_modules/d3-array/src/bisector.js","./count.js":"../node_modules/d3-array/src/count.js","./cross.js":"../node_modules/d3-array/src/cross.js","./descending.js":"../node_modules/d3-array/src/descending.js","./deviation.js":"../node_modules/d3-array/src/deviation.js","./extent.js":"../node_modules/d3-array/src/extent.js","./group.js":"../node_modules/d3-array/src/group.js","./bin.js":"../node_modules/d3-array/src/bin.js","./threshold/freedmanDiaconis.js":"../node_modules/d3-array/src/threshold/freedmanDiaconis.js","./threshold/scott.js":"../node_modules/d3-array/src/threshold/scott.js","./threshold/sturges.js":"../node_modules/d3-array/src/threshold/sturges.js","./max.js":"../node_modules/d3-array/src/max.js","./maxIndex.js":"../node_modules/d3-array/src/maxIndex.js","./mean.js":"../node_modules/d3-array/src/mean.js","./median.js":"../node_modules/d3-array/src/median.js","./merge.js":"../node_modules/d3-array/src/merge.js","./min.js":"../node_modules/d3-array/src/min.js","./minIndex.js":"../node_modules/d3-array/src/minIndex.js","./pairs.js":"../node_modules/d3-array/src/pairs.js","./permute.js":"../node_modules/d3-array/src/permute.js","./quantile.js":"../node_modules/d3-array/src/quantile.js","./quickselect.js":"../node_modules/d3-array/src/quickselect.js","./range.js":"../node_modules/d3-array/src/range.js","./least.js":"../node_modules/d3-array/src/least.js","./leastIndex.js":"../node_modules/d3-array/src/leastIndex.js","./greatest.js":"../node_modules/d3-array/src/greatest.js","./greatestIndex.js":"../node_modules/d3-array/src/greatestIndex.js","./scan.js":"../node_modules/d3-array/src/scan.js","./shuffle.js":"../node_modules/d3-array/src/shuffle.js","./sum.js":"../node_modules/d3-array/src/sum.js","./ticks.js":"../node_modules/d3-array/src/ticks.js","./transpose.js":"../node_modules/d3-array/src/transpose.js","./variance.js":"../node_modules/d3-array/src/variance.js","./zip.js":"../node_modules/d3-array/src/zip.js"}],"../node_modules/d3-axis/src/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slice = void 0;
var slice = Array.prototype.slice;
exports.slice = slice;
},{}],"../node_modules/d3-axis/src/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return x;
}
},{}],"../node_modules/d3-axis/src/axis.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.axisTop = axisTop;
exports.axisRight = axisRight;
exports.axisBottom = axisBottom;
exports.axisLeft = axisLeft;

var _array = require("./array");

var _identity = _interopRequireDefault(require("./identity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var top = 1,
    right = 2,
    bottom = 3,
    left = 4,
    epsilon = 1e-6;

function translateX(x) {
  return "translate(" + (x + 0.5) + ",0)";
}

function translateY(y) {
  return "translate(0," + (y + 0.5) + ")";
}

function number(scale) {
  return function (d) {
    return +scale(d);
  };
}

function center(scale) {
  var offset = Math.max(0, scale.bandwidth() - 1) / 2; // Adjust for 0.5px offset.

  if (scale.round()) offset = Math.round(offset);
  return function (d) {
    return +scale(d) + offset;
  };
}

function entering() {
  return !this.__axis;
}

function axis(orient, scale) {
  var tickArguments = [],
      tickValues = null,
      tickFormat = null,
      tickSizeInner = 6,
      tickSizeOuter = 6,
      tickPadding = 3,
      k = orient === top || orient === left ? -1 : 1,
      x = orient === left || orient === right ? "x" : "y",
      transform = orient === top || orient === bottom ? translateX : translateY;

  function axis(context) {
    var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues,
        format = tickFormat == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : _identity.default : tickFormat,
        spacing = Math.max(tickSizeInner, 0) + tickPadding,
        range = scale.range(),
        range0 = +range[0] + 0.5,
        range1 = +range[range.length - 1] + 0.5,
        position = (scale.bandwidth ? center : number)(scale.copy()),
        selection = context.selection ? context.selection() : context,
        path = selection.selectAll(".domain").data([null]),
        tick = selection.selectAll(".tick").data(values, scale).order(),
        tickExit = tick.exit(),
        tickEnter = tick.enter().append("g").attr("class", "tick"),
        line = tick.select("line"),
        text = tick.select("text");
    path = path.merge(path.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor"));
    tick = tick.merge(tickEnter);
    line = line.merge(tickEnter.append("line").attr("stroke", "currentColor").attr(x + "2", k * tickSizeInner));
    text = text.merge(tickEnter.append("text").attr("fill", "currentColor").attr(x, k * spacing).attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));

    if (context !== selection) {
      path = path.transition(context);
      tick = tick.transition(context);
      line = line.transition(context);
      text = text.transition(context);
      tickExit = tickExit.transition(context).attr("opacity", epsilon).attr("transform", function (d) {
        return isFinite(d = position(d)) ? transform(d) : this.getAttribute("transform");
      });
      tickEnter.attr("opacity", epsilon).attr("transform", function (d) {
        var p = this.parentNode.__axis;
        return transform(p && isFinite(p = p(d)) ? p : position(d));
      });
    }

    tickExit.remove();
    path.attr("d", orient === left || orient == right ? tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H0.5V" + range1 + "H" + k * tickSizeOuter : "M0.5," + range0 + "V" + range1 : tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + ",0.5H" + range1);
    tick.attr("opacity", 1).attr("transform", function (d) {
      return transform(position(d));
    });
    line.attr(x + "2", k * tickSizeInner);
    text.attr(x, k * spacing).text(format);
    selection.filter(entering).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");
    selection.each(function () {
      this.__axis = position;
    });
  }

  axis.scale = function (_) {
    return arguments.length ? (scale = _, axis) : scale;
  };

  axis.ticks = function () {
    return tickArguments = _array.slice.call(arguments), axis;
  };

  axis.tickArguments = function (_) {
    return arguments.length ? (tickArguments = _ == null ? [] : _array.slice.call(_), axis) : tickArguments.slice();
  };

  axis.tickValues = function (_) {
    return arguments.length ? (tickValues = _ == null ? null : _array.slice.call(_), axis) : tickValues && tickValues.slice();
  };

  axis.tickFormat = function (_) {
    return arguments.length ? (tickFormat = _, axis) : tickFormat;
  };

  axis.tickSize = function (_) {
    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
  };

  axis.tickSizeInner = function (_) {
    return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
  };

  axis.tickSizeOuter = function (_) {
    return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
  };

  axis.tickPadding = function (_) {
    return arguments.length ? (tickPadding = +_, axis) : tickPadding;
  };

  return axis;
}

function axisTop(scale) {
  return axis(top, scale);
}

function axisRight(scale) {
  return axis(right, scale);
}

function axisBottom(scale) {
  return axis(bottom, scale);
}

function axisLeft(scale) {
  return axis(left, scale);
}
},{"./array":"../node_modules/d3-axis/src/array.js","./identity":"../node_modules/d3-axis/src/identity.js"}],"../node_modules/d3-axis/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "axisTop", {
  enumerable: true,
  get: function () {
    return _axis.axisTop;
  }
});
Object.defineProperty(exports, "axisRight", {
  enumerable: true,
  get: function () {
    return _axis.axisRight;
  }
});
Object.defineProperty(exports, "axisBottom", {
  enumerable: true,
  get: function () {
    return _axis.axisBottom;
  }
});
Object.defineProperty(exports, "axisLeft", {
  enumerable: true,
  get: function () {
    return _axis.axisLeft;
  }
});

var _axis = require("./axis");
},{"./axis":"../node_modules/d3-axis/src/axis.js"}],"../node_modules/d3-fetch/src/blob.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function responseBlob(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.blob();
}

function _default(input, init) {
  return fetch(input, init).then(responseBlob);
}
},{}],"../node_modules/d3-fetch/src/buffer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function responseArrayBuffer(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.arrayBuffer();
}

function _default(input, init) {
  return fetch(input, init).then(responseArrayBuffer);
}
},{}],"../node_modules/d3-dsv/src/dsv.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var EOL = {},
    EOF = {},
    QUOTE = 34,
    NEWLINE = 10,
    RETURN = 13;

function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function (name, i) {
    return JSON.stringify(name) + ": d[" + i + "]";
  }).join(",") + "}");
}

function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function (row, i) {
    return f(object(row), i, columns);
  };
} // Compute unique columns in order of discovery.


function inferColumns(rows) {
  var columnSet = Object.create(null),
      columns = [];
  rows.forEach(function (row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });
  return columns;
}

function pad(value, width) {
  var s = value + "",
      length = s.length;
  return length < width ? new Array(width - length + 1).join(0) + s : s;
}

function formatYear(year) {
  return year < 0 ? "-" + pad(-year, 6) : year > 9999 ? "+" + pad(year, 6) : pad(year, 4);
}

function formatDate(date) {
  var hours = date.getUTCHours(),
      minutes = date.getUTCMinutes(),
      seconds = date.getUTCSeconds(),
      milliseconds = date.getUTCMilliseconds();
  return isNaN(date) ? "Invalid Date" : formatYear(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2) + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z" : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z" : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z" : "");
}

function _default(delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
      DELIMITER = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert,
        columns,
        rows = parseRows(text, function (row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns || [];
    return rows;
  }

  function parseRows(text, f) {
    var rows = [],
        // output rows
    N = text.length,
        I = 0,
        // current character index
    n = 0,
        // current line number
    t,
        // current token
    eof = N <= 0,
        // current token followed by EOF?
    eol = false; // current token followed by EOL?
    // Strip the trailing newline.

    if (text.charCodeAt(N - 1) === NEWLINE) --N;
    if (text.charCodeAt(N - 1) === RETURN) --N;

    function token() {
      if (eof) return EOF;
      if (eol) return eol = false, EOL; // Unescape quotes.

      var i,
          j = I,
          c;

      if (text.charCodeAt(j) === QUOTE) {
        while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);

        if ((i = I) >= N) eof = true;else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;else if (c === RETURN) {
          eol = true;
          if (text.charCodeAt(I) === NEWLINE) ++I;
        }
        return text.slice(j + 1, i - 1).replace(/""/g, "\"");
      } // Find next delimiter or newline.


      while (I < N) {
        if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;else if (c === RETURN) {
          eol = true;
          if (text.charCodeAt(I) === NEWLINE) ++I;
        } else if (c !== DELIMITER) continue;
        return text.slice(j, i);
      } // Return last token before EOF.


      return eof = true, text.slice(j, N);
    }

    while ((t = token()) !== EOF) {
      var row = [];

      while (t !== EOL && t !== EOF) row.push(t), t = token();

      if (f && (row = f(row, n++)) == null) continue;
      rows.push(row);
    }

    return rows;
  }

  function preformatBody(rows, columns) {
    return rows.map(function (row) {
      return columns.map(function (column) {
        return formatValue(row[column]);
      }).join(delimiter);
    });
  }

  function format(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
  }

  function formatBody(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return preformatBody(rows, columns).join("\n");
  }

  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(value) {
    return value == null ? "" : value instanceof Date ? formatDate(value) : reFormat.test(value += "") ? "\"" + value.replace(/"/g, "\"\"") + "\"" : value;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatBody: formatBody,
    formatRows: formatRows
  };
}
},{}],"../node_modules/d3-dsv/src/csv.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.csvFormatRows = exports.csvFormatBody = exports.csvFormat = exports.csvParseRows = exports.csvParse = void 0;

var _dsv = _interopRequireDefault(require("./dsv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var csv = (0, _dsv.default)(",");
var csvParse = csv.parse;
exports.csvParse = csvParse;
var csvParseRows = csv.parseRows;
exports.csvParseRows = csvParseRows;
var csvFormat = csv.format;
exports.csvFormat = csvFormat;
var csvFormatBody = csv.formatBody;
exports.csvFormatBody = csvFormatBody;
var csvFormatRows = csv.formatRows;
exports.csvFormatRows = csvFormatRows;
},{"./dsv":"../node_modules/d3-dsv/src/dsv.js"}],"../node_modules/d3-dsv/src/tsv.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tsvFormatRows = exports.tsvFormatBody = exports.tsvFormat = exports.tsvParseRows = exports.tsvParse = void 0;

var _dsv = _interopRequireDefault(require("./dsv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tsv = (0, _dsv.default)("\t");
var tsvParse = tsv.parse;
exports.tsvParse = tsvParse;
var tsvParseRows = tsv.parseRows;
exports.tsvParseRows = tsvParseRows;
var tsvFormat = tsv.format;
exports.tsvFormat = tsvFormat;
var tsvFormatBody = tsv.formatBody;
exports.tsvFormatBody = tsvFormatBody;
var tsvFormatRows = tsv.formatRows;
exports.tsvFormatRows = tsvFormatRows;
},{"./dsv":"../node_modules/d3-dsv/src/dsv.js"}],"../node_modules/d3-dsv/src/autoType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autoType;

function autoType(object) {
  for (var key in object) {
    var value = object[key].trim(),
        number;
    if (!value) value = null;else if (value === "true") value = true;else if (value === "false") value = false;else if (value === "NaN") value = NaN;else if (!isNaN(number = +value)) value = number;else if (/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/.test(value)) value = new Date(value);else continue;
    object[key] = value;
  }

  return object;
}
},{}],"../node_modules/d3-dsv/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "dsvFormat", {
  enumerable: true,
  get: function () {
    return _dsv.default;
  }
});
Object.defineProperty(exports, "csvParse", {
  enumerable: true,
  get: function () {
    return _csv.csvParse;
  }
});
Object.defineProperty(exports, "csvParseRows", {
  enumerable: true,
  get: function () {
    return _csv.csvParseRows;
  }
});
Object.defineProperty(exports, "csvFormat", {
  enumerable: true,
  get: function () {
    return _csv.csvFormat;
  }
});
Object.defineProperty(exports, "csvFormatBody", {
  enumerable: true,
  get: function () {
    return _csv.csvFormatBody;
  }
});
Object.defineProperty(exports, "csvFormatRows", {
  enumerable: true,
  get: function () {
    return _csv.csvFormatRows;
  }
});
Object.defineProperty(exports, "tsvParse", {
  enumerable: true,
  get: function () {
    return _tsv.tsvParse;
  }
});
Object.defineProperty(exports, "tsvParseRows", {
  enumerable: true,
  get: function () {
    return _tsv.tsvParseRows;
  }
});
Object.defineProperty(exports, "tsvFormat", {
  enumerable: true,
  get: function () {
    return _tsv.tsvFormat;
  }
});
Object.defineProperty(exports, "tsvFormatBody", {
  enumerable: true,
  get: function () {
    return _tsv.tsvFormatBody;
  }
});
Object.defineProperty(exports, "tsvFormatRows", {
  enumerable: true,
  get: function () {
    return _tsv.tsvFormatRows;
  }
});
Object.defineProperty(exports, "autoType", {
  enumerable: true,
  get: function () {
    return _autoType.default;
  }
});

var _dsv = _interopRequireDefault(require("./dsv"));

var _csv = require("./csv");

var _tsv = require("./tsv");

var _autoType = _interopRequireDefault(require("./autoType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./dsv":"../node_modules/d3-dsv/src/dsv.js","./csv":"../node_modules/d3-dsv/src/csv.js","./tsv":"../node_modules/d3-dsv/src/tsv.js","./autoType":"../node_modules/d3-dsv/src/autoType.js"}],"../node_modules/d3-fetch/src/text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function responseText(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.text();
}

function _default(input, init) {
  return fetch(input, init).then(responseText);
}
},{}],"../node_modules/d3-fetch/src/dsv.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dsv;
exports.tsv = exports.csv = void 0;

var _d3Dsv = require("d3-dsv");

var _text = _interopRequireDefault(require("./text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dsvParse(parse) {
  return function (input, init, row) {
    if (arguments.length === 2 && typeof init === "function") row = init, init = undefined;
    return (0, _text.default)(input, init).then(function (response) {
      return parse(response, row);
    });
  };
}

function dsv(delimiter, input, init, row) {
  if (arguments.length === 3 && typeof init === "function") row = init, init = undefined;
  var format = (0, _d3Dsv.dsvFormat)(delimiter);
  return (0, _text.default)(input, init).then(function (response) {
    return format.parse(response, row);
  });
}

var csv = dsvParse(_d3Dsv.csvParse);
exports.csv = csv;
var tsv = dsvParse(_d3Dsv.tsvParse);
exports.tsv = tsv;
},{"d3-dsv":"../node_modules/d3-dsv/src/index.js","./text":"../node_modules/d3-fetch/src/text.js"}],"../node_modules/d3-fetch/src/image.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(input, init) {
  return new Promise(function (resolve, reject) {
    var image = new Image();

    for (var key in init) image[key] = init[key];

    image.onerror = reject;

    image.onload = function () {
      resolve(image);
    };

    image.src = input;
  });
}
},{}],"../node_modules/d3-fetch/src/json.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function responseJson(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.json();
}

function _default(input, init) {
  return fetch(input, init).then(responseJson);
}
},{}],"../node_modules/d3-fetch/src/xml.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.svg = exports.html = exports.default = void 0;

var _text = _interopRequireDefault(require("./text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parser(type) {
  return function (input, init) {
    return (0, _text.default)(input, init).then(function (text) {
      return new DOMParser().parseFromString(text, type);
    });
  };
}

var _default = parser("application/xml");

exports.default = _default;
var html = parser("text/html");
exports.html = html;
var svg = parser("image/svg+xml");
exports.svg = svg;
},{"./text":"../node_modules/d3-fetch/src/text.js"}],"../node_modules/d3-fetch/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "blob", {
  enumerable: true,
  get: function () {
    return _blob.default;
  }
});
Object.defineProperty(exports, "buffer", {
  enumerable: true,
  get: function () {
    return _buffer.default;
  }
});
Object.defineProperty(exports, "dsv", {
  enumerable: true,
  get: function () {
    return _dsv.default;
  }
});
Object.defineProperty(exports, "csv", {
  enumerable: true,
  get: function () {
    return _dsv.csv;
  }
});
Object.defineProperty(exports, "tsv", {
  enumerable: true,
  get: function () {
    return _dsv.tsv;
  }
});
Object.defineProperty(exports, "image", {
  enumerable: true,
  get: function () {
    return _image.default;
  }
});
Object.defineProperty(exports, "json", {
  enumerable: true,
  get: function () {
    return _json.default;
  }
});
Object.defineProperty(exports, "text", {
  enumerable: true,
  get: function () {
    return _text.default;
  }
});
Object.defineProperty(exports, "xml", {
  enumerable: true,
  get: function () {
    return _xml.default;
  }
});
Object.defineProperty(exports, "html", {
  enumerable: true,
  get: function () {
    return _xml.html;
  }
});
Object.defineProperty(exports, "svg", {
  enumerable: true,
  get: function () {
    return _xml.svg;
  }
});

var _blob = _interopRequireDefault(require("./blob"));

var _buffer = _interopRequireDefault(require("./buffer"));

var _dsv = _interopRequireWildcard(require("./dsv"));

var _image = _interopRequireDefault(require("./image"));

var _json = _interopRequireDefault(require("./json"));

var _text = _interopRequireDefault(require("./text"));

var _xml = _interopRequireWildcard(require("./xml"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./blob":"../node_modules/d3-fetch/src/blob.js","./buffer":"../node_modules/d3-fetch/src/buffer.js","./dsv":"../node_modules/d3-fetch/src/dsv.js","./image":"../node_modules/d3-fetch/src/image.js","./json":"../node_modules/d3-fetch/src/json.js","./text":"../node_modules/d3-fetch/src/text.js","./xml":"../node_modules/d3-fetch/src/xml.js"}],"../node_modules/d3-scale/src/init.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initRange = initRange;
exports.initInterpolator = initInterpolator;

function initRange(domain, range) {
  switch (arguments.length) {
    case 0:
      break;

    case 1:
      this.range(domain);
      break;

    default:
      this.range(range).domain(domain);
      break;
  }

  return this;
}

function initInterpolator(domain, interpolator) {
  switch (arguments.length) {
    case 0:
      break;

    case 1:
      this.interpolator(domain);
      break;

    default:
      this.interpolator(interpolator).domain(domain);
      break;
  }

  return this;
}
},{}],"../node_modules/d3-scale/src/ordinal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ordinal;
exports.implicit = void 0;

var _init = require("./init");

const implicit = Symbol("implicit");
exports.implicit = implicit;

function ordinal() {
  var index = new Map(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    var key = d + "",
        i = index.get(key);

    if (!i) {
      if (unknown !== implicit) return unknown;
      index.set(key, i = domain.push(d));
    }

    return range[(i - 1) % range.length];
  }

  scale.domain = function (_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new Map();

    for (const value of _) {
      const key = value + "";
      if (index.has(key)) continue;
      index.set(key, domain.push(value));
    }

    return scale;
  };

  scale.range = function (_) {
    return arguments.length ? (range = Array.from(_), scale) : range.slice();
  };

  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function () {
    return ordinal(domain, range).unknown(unknown);
  };

  _init.initRange.apply(scale, arguments);

  return scale;
}
},{"./init":"../node_modules/d3-scale/src/init.js"}],"../node_modules/d3-scale/src/band.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = band;
exports.point = point;

var _d3Array = require("d3-array");

var _init = require("./init");

var _ordinal = _interopRequireDefault(require("./ordinal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function band() {
  var scale = (0, _ordinal.default)().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      r0 = 0,
      r1 = 1,
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;
  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = r1 < r0,
        start = reverse ? r1 : r0,
        stop = reverse ? r0 : r1;
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = (0, _d3Array.range)(n).map(function (i) {
      return start + step * i;
    });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function (_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function (_) {
    return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };

  scale.rangeRound = function (_) {
    return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
  };

  scale.bandwidth = function () {
    return bandwidth;
  };

  scale.step = function () {
    return step;
  };

  scale.round = function (_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function (_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };

  scale.paddingInner = function (_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };

  scale.paddingOuter = function (_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };

  scale.align = function (_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function () {
    return band(domain(), [r0, r1]).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
  };

  return _init.initRange.apply(rescale(), arguments);
}

function pointish(scale) {
  var copy = scale.copy;
  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;

  scale.copy = function () {
    return pointish(copy());
  };

  return scale;
}

function point() {
  return pointish(band.apply(null, arguments).paddingInner(1));
}
},{"d3-array":"../node_modules/d3-array/src/index.js","./init":"../node_modules/d3-scale/src/init.js","./ordinal":"../node_modules/d3-scale/src/ordinal.js"}],"../node_modules/d3-color/src/define.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.extend = extend;

function _default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);

  for (var key in definition) prototype[key] = definition[key];

  return prototype;
}
},{}],"../node_modules/d3-color/src/color.js":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Color = Color;
exports.default = color;
exports.rgbConvert = rgbConvert;
exports.rgb = rgb;
exports.Rgb = Rgb;
exports.hslConvert = hslConvert;
exports.hsl = hsl;
exports.brighter = exports.darker = void 0;

var _define = _interopRequireWildcard(require("./define"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function Color() {}

var darker = 0.7;
exports.darker = darker;
var brighter = 1 / darker;
exports.brighter = brighter;
var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex3 = /^#([0-9a-f]{3})$/,
    reHex6 = /^#([0-9a-f]{6})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};
(0, _define.default)(Color, color, {
  copy: function (channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function () {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m;
  format = (format + "").trim().toLowerCase();
  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb(m >> 8 & 0xf | m >> 4 & 0x0f0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
  ) : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
  : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
  : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
  : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
  : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
  : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
  : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
  : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
  : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

(0, _define.default)(Rgb, rgb, (0, _define.extend)(Color, {
  brighter: function (k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function () {
    return this;
  },
  displayable: function () {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}

function rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;

  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }

  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

(0, _define.default)(Hsl, hsl, (0, _define.extend)(Color, {
  brighter: function (k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function () {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function () {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
/* From FvD 13.37, CSS Color Module Level 3 */

function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
},{"./define":"../node_modules/d3-color/src/define.js"}],"../node_modules/d3-color/src/math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rad2deg = exports.deg2rad = void 0;
var deg2rad = Math.PI / 180;
exports.deg2rad = deg2rad;
var rad2deg = 180 / Math.PI;
exports.rad2deg = rad2deg;
},{}],"../node_modules/d3-color/src/lab.js":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gray = gray;
exports.default = lab;
exports.Lab = Lab;
exports.lch = lch;
exports.hcl = hcl;
exports.Hcl = Hcl;

var _define = _interopRequireWildcard(require("./define"));

var _color = require("./color");

var _math = require("./math");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// https://observablehq.com/@mbostock/lab-and-rgb
var K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof _color.Rgb)) o = (0, _color.rgbConvert)(o);
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn),
      x,
      z;
  if (r === g && g === b) x = z = y;else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

(0, _define.default)(Lab, lab, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function (k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function () {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new _color.Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);

  var h = Math.atan2(o.b, o.a) * _math.rad2deg;

  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function lch(l, c, h, opacity) {
  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * _math.deg2rad;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}

(0, _define.default)(Hcl, hcl, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function (k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function () {
    return hcl2lab(this).rgb();
  }
}));
},{"./define":"../node_modules/d3-color/src/define.js","./color":"../node_modules/d3-color/src/color.js","./math":"../node_modules/d3-color/src/math.js"}],"../node_modules/d3-color/src/cubehelix.js":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cubehelix;
exports.Cubehelix = Cubehelix;

var _define = _interopRequireWildcard(require("./define"));

var _color = require("./color");

var _math = require("./math");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof _color.Rgb)) o = (0, _color.rgbConvert)(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)),
      // NaN if l=0 or l=1
  h = s ? Math.atan2(k, bl) * _math.rad2deg - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

(0, _define.default)(Cubehelix, cubehelix, (0, _define.extend)(_color.Color, {
  brighter: function (k) {
    k = k == null ? _color.brighter : Math.pow(_color.brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? _color.darker : Math.pow(_color.darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * _math.deg2rad,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new _color.Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
  }
}));
},{"./define":"../node_modules/d3-color/src/define.js","./color":"../node_modules/d3-color/src/color.js","./math":"../node_modules/d3-color/src/math.js"}],"../node_modules/d3-color/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "color", {
  enumerable: true,
  get: function () {
    return _color.default;
  }
});
Object.defineProperty(exports, "rgb", {
  enumerable: true,
  get: function () {
    return _color.rgb;
  }
});
Object.defineProperty(exports, "hsl", {
  enumerable: true,
  get: function () {
    return _color.hsl;
  }
});
Object.defineProperty(exports, "lab", {
  enumerable: true,
  get: function () {
    return _lab.default;
  }
});
Object.defineProperty(exports, "hcl", {
  enumerable: true,
  get: function () {
    return _lab.hcl;
  }
});
Object.defineProperty(exports, "lch", {
  enumerable: true,
  get: function () {
    return _lab.lch;
  }
});
Object.defineProperty(exports, "gray", {
  enumerable: true,
  get: function () {
    return _lab.gray;
  }
});
Object.defineProperty(exports, "cubehelix", {
  enumerable: true,
  get: function () {
    return _cubehelix.default;
  }
});

var _color = _interopRequireWildcard(require("./color"));

var _lab = _interopRequireWildcard(require("./lab"));

var _cubehelix = _interopRequireDefault(require("./cubehelix"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }
},{"./color":"../node_modules/d3-color/src/color.js","./lab":"../node_modules/d3-color/src/lab.js","./cubehelix":"../node_modules/d3-color/src/cubehelix.js"}],"../node_modules/d3-interpolate/src/basis.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basis = basis;
exports.default = _default;

function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1,
      t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}

function _default(values) {
  var n = values.length - 1;
  return function (t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}
},{}],"../node_modules/d3-interpolate/src/basisClosed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _basis = require("./basis");

function _default(values) {
  var n = values.length;
  return function (t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return (0, _basis.basis)((t - i / n) * n, v0, v1, v2, v3);
  };
}
},{"./basis":"../node_modules/d3-interpolate/src/basis.js"}],"../node_modules/d3-interpolate/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return function () {
    return x;
  };
}
},{}],"../node_modules/d3-interpolate/src/color.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hue = hue;
exports.gamma = gamma;
exports.default = nogamma;

var _constant = _interopRequireDefault(require("./constant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function linear(a, d) {
  return function (t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : (0, _constant.default)(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function (a, b) {
    return b - a ? exponential(a, b, y) : (0, _constant.default)(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : (0, _constant.default)(isNaN(a) ? b : a);
}
},{"./constant":"../node_modules/d3-interpolate/src/constant.js"}],"../node_modules/d3-interpolate/src/rgb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rgbBasisClosed = exports.rgbBasis = exports.default = void 0;

var _d3Color = require("d3-color");

var _basis = _interopRequireDefault(require("./basis"));

var _basisClosed = _interopRequireDefault(require("./basisClosed"));

var _color = _interopRequireWildcard(require("./color"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function rgbGamma(y) {
  var color = (0, _color.gamma)(y);

  function rgb(start, end) {
    var r = color((start = (0, _d3Color.rgb)(start)).r, (end = (0, _d3Color.rgb)(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = (0, _color.default)(start.opacity, end.opacity);
    return function (t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;
  return rgb;
}(1);

exports.default = _default;

function rgbSpline(spline) {
  return function (colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i,
        color;

    for (i = 0; i < n; ++i) {
      color = (0, _d3Color.rgb)(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }

    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function (t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(_basis.default);
exports.rgbBasis = rgbBasis;
var rgbBasisClosed = rgbSpline(_basisClosed.default);
exports.rgbBasisClosed = rgbBasisClosed;
},{"d3-color":"../node_modules/d3-color/src/index.js","./basis":"../node_modules/d3-interpolate/src/basis.js","./basisClosed":"../node_modules/d3-interpolate/src/basisClosed.js","./color":"../node_modules/d3-interpolate/src/color.js"}],"../node_modules/d3-interpolate/src/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _value = _interopRequireDefault(require("./value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = (0, _value.default)(a[i], b[i]);

  for (; i < nb; ++i) c[i] = b[i];

  return function (t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);

    return c;
  };
}
},{"./value":"../node_modules/d3-interpolate/src/value.js"}],"../node_modules/d3-interpolate/src/date.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(a, b) {
  var d = new Date();
  return a = +a, b -= a, function (t) {
    return d.setTime(a + b * t), d;
  };
}
},{}],"../node_modules/d3-interpolate/src/number.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(a, b) {
  return a = +a, b -= a, function (t) {
    return a + b * t;
  };
}
},{}],"../node_modules/d3-interpolate/src/object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _value = _interopRequireDefault(require("./value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(a, b) {
  var i = {},
      c = {},
      k;
  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = (0, _value.default)(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function (t) {
    for (k in i) c[k] = i[k](t);

    return c;
  };
}
},{"./value":"../node_modules/d3-interpolate/src/value.js"}],"../node_modules/d3-interpolate/src/string.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _number = _interopRequireDefault(require("./number"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function () {
    return b;
  };
}

function one(b) {
  return function (t) {
    return b(t) + "";
  };
}

function _default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0,
      // scan index for next number in b
  am,
      // current match in a
  bm,
      // current match in b
  bs,
      // string preceding current number in b, if any
  i = -1,
      // index in s
  s = [],
      // string constants and placeholders
  q = []; // number interpolators
  // Coerce inputs to strings.

  a = a + "", b = b + ""; // Interpolate pairs of numbers in a & b.

  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    if ((am = am[0]) === (bm = bm[0])) {
      // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else {
      // interpolate non-matching numbers
      s[++i] = null;
      q.push({
        i: i,
        x: (0, _number.default)(am, bm)
      });
    }

    bi = reB.lastIndex;
  } // Add remains of b.


  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  } // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.


  return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
    for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);

    return s.join("");
  });
}
},{"./number":"../node_modules/d3-interpolate/src/number.js"}],"../node_modules/d3-interpolate/src/value.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _d3Color = require("d3-color");

var _rgb = _interopRequireDefault(require("./rgb"));

var _array = _interopRequireDefault(require("./array"));

var _date = _interopRequireDefault(require("./date"));

var _number = _interopRequireDefault(require("./number"));

var _object = _interopRequireDefault(require("./object"));

var _string = _interopRequireDefault(require("./string"));

var _constant = _interopRequireDefault(require("./constant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(a, b) {
  var t = typeof b,
      c;
  return b == null || t === "boolean" ? (0, _constant.default)(b) : (t === "number" ? _number.default : t === "string" ? (c = (0, _d3Color.color)(b)) ? (b = c, _rgb.default) : _string.default : b instanceof _d3Color.color ? _rgb.default : b instanceof Date ? _date.default : Array.isArray(b) ? _array.default : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? _object.default : _number.default)(a, b);
}
},{"d3-color":"../node_modules/d3-color/src/index.js","./rgb":"../node_modules/d3-interpolate/src/rgb.js","./array":"../node_modules/d3-interpolate/src/array.js","./date":"../node_modules/d3-interpolate/src/date.js","./number":"../node_modules/d3-interpolate/src/number.js","./object":"../node_modules/d3-interpolate/src/object.js","./string":"../node_modules/d3-interpolate/src/string.js","./constant":"../node_modules/d3-interpolate/src/constant.js"}],"../node_modules/d3-interpolate/src/discrete.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(range) {
  var n = range.length;
  return function (t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}
},{}],"../node_modules/d3-interpolate/src/hue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _color = require("./color");

function _default(a, b) {
  var i = (0, _color.hue)(+a, +b);
  return function (t) {
    var x = i(t);
    return x - 360 * Math.floor(x / 360);
  };
}
},{"./color":"../node_modules/d3-interpolate/src/color.js"}],"../node_modules/d3-interpolate/src/round.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(a, b) {
  return a = +a, b -= a, function (t) {
    return Math.round(a + b * t);
  };
}
},{}],"../node_modules/d3-interpolate/src/transform/decompose.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.identity = void 0;
var degrees = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
exports.identity = identity;

function _default(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}
},{}],"../node_modules/d3-interpolate/src/transform/parse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCss = parseCss;
exports.parseSvg = parseSvg;

var _decompose = _interopRequireWildcard(require("./decompose"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var cssNode, cssRoot, cssView, svgNode;

function parseCss(value) {
  if (value === "none") return _decompose.identity;
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return (0, _decompose.default)(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}

function parseSvg(value) {
  if (value == null) return _decompose.identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return _decompose.identity;
  value = value.matrix;
  return (0, _decompose.default)(value.a, value.b, value.c, value.d, value.e, value.f);
}
},{"./decompose":"../node_modules/d3-interpolate/src/transform/decompose.js"}],"../node_modules/d3-interpolate/src/transform/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpolateTransformSvg = exports.interpolateTransformCss = void 0;

var _number = _interopRequireDefault(require("../number"));

var _parse = require("./parse");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({
        i: i - 4,
        x: (0, _number.default)(xa, xb)
      }, {
        i: i - 2,
        x: (0, _number.default)(ya, yb)
      });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;else if (b - a > 180) a += 360; // shortest path

      q.push({
        i: s.push(pop(s) + "rotate(", null, degParen) - 2,
        x: (0, _number.default)(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({
        i: s.push(pop(s) + "skewX(", null, degParen) - 2,
        x: (0, _number.default)(a, b)
      });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: (0, _number.default)(xa, xb)
      }, {
        i: i - 2,
        x: (0, _number.default)(ya, yb)
      });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function (a, b) {
    var s = [],
        // string constants and placeholders
    q = []; // number interpolators

    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc

    return function (t) {
      var i = -1,
          n = q.length,
          o;

      while (++i < n) s[(o = q[i]).i] = o.x(t);

      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(_parse.parseCss, "px, ", "px)", "deg)");
exports.interpolateTransformCss = interpolateTransformCss;
var interpolateTransformSvg = interpolateTransform(_parse.parseSvg, ", ", ")", ")");
exports.interpolateTransformSvg = interpolateTransformSvg;
},{"../number":"../node_modules/d3-interpolate/src/number.js","./parse":"../node_modules/d3-interpolate/src/transform/parse.js"}],"../node_modules/d3-interpolate/src/zoom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var rho = Math.SQRT2,
    rho2 = 2,
    rho4 = 4,
    epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
} // p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]


function _default(p0, p1) {
  var ux0 = p0[0],
      uy0 = p0[1],
      w0 = p0[2],
      ux1 = p1[0],
      uy1 = p1[1],
      w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S; // Special case for u0 ≅ u1.

  if (d2 < epsilon2) {
    S = Math.log(w1 / w0) / rho;

    i = function (t) {
      return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
    };
  } // General case.
  else {
      var d1 = Math.sqrt(d2),
          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;

      i = function (t) {
        var s = t * S,
            coshr0 = cosh(r0),
            u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / cosh(rho * s + r0)];
      };
    }

  i.duration = S * 1000;
  return i;
}
},{}],"../node_modules/d3-interpolate/src/hsl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hslLong = exports.default = void 0;

var _d3Color = require("d3-color");

var _color = _interopRequireWildcard(require("./color"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function hsl(hue) {
  return function (start, end) {
    var h = hue((start = (0, _d3Color.hsl)(start)).h, (end = (0, _d3Color.hsl)(end)).h),
        s = (0, _color.default)(start.s, end.s),
        l = (0, _color.default)(start.l, end.l),
        opacity = (0, _color.default)(start.opacity, end.opacity);
    return function (t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  };
}

var _default = hsl(_color.hue);

exports.default = _default;
var hslLong = hsl(_color.default);
exports.hslLong = hslLong;
},{"d3-color":"../node_modules/d3-color/src/index.js","./color":"../node_modules/d3-interpolate/src/color.js"}],"../node_modules/d3-interpolate/src/lab.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lab;

var _d3Color = require("d3-color");

var _color = _interopRequireDefault(require("./color"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function lab(start, end) {
  var l = (0, _color.default)((start = (0, _d3Color.lab)(start)).l, (end = (0, _d3Color.lab)(end)).l),
      a = (0, _color.default)(start.a, end.a),
      b = (0, _color.default)(start.b, end.b),
      opacity = (0, _color.default)(start.opacity, end.opacity);
  return function (t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}
},{"d3-color":"../node_modules/d3-color/src/index.js","./color":"../node_modules/d3-interpolate/src/color.js"}],"../node_modules/d3-interpolate/src/hcl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hclLong = exports.default = void 0;

var _d3Color = require("d3-color");

var _color = _interopRequireWildcard(require("./color"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function hcl(hue) {
  return function (start, end) {
    var h = hue((start = (0, _d3Color.hcl)(start)).h, (end = (0, _d3Color.hcl)(end)).h),
        c = (0, _color.default)(start.c, end.c),
        l = (0, _color.default)(start.l, end.l),
        opacity = (0, _color.default)(start.opacity, end.opacity);
    return function (t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  };
}

var _default = hcl(_color.hue);

exports.default = _default;
var hclLong = hcl(_color.default);
exports.hclLong = hclLong;
},{"d3-color":"../node_modules/d3-color/src/index.js","./color":"../node_modules/d3-interpolate/src/color.js"}],"../node_modules/d3-interpolate/src/cubehelix.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cubehelixLong = exports.default = void 0;

var _d3Color = require("d3-color");

var _color = _interopRequireWildcard(require("./color"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function cubehelix(hue) {
  return function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      var h = hue((start = (0, _d3Color.cubehelix)(start)).h, (end = (0, _d3Color.cubehelix)(end)).h),
          s = (0, _color.default)(start.s, end.s),
          l = (0, _color.default)(start.l, end.l),
          opacity = (0, _color.default)(start.opacity, end.opacity);
      return function (t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix.gamma = cubehelixGamma;
    return cubehelix;
  }(1);
}

var _default = cubehelix(_color.hue);

exports.default = _default;
var cubehelixLong = cubehelix(_color.default);
exports.cubehelixLong = cubehelixLong;
},{"d3-color":"../node_modules/d3-color/src/index.js","./color":"../node_modules/d3-interpolate/src/color.js"}],"../node_modules/d3-interpolate/src/piecewise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = piecewise;

function piecewise(interpolate, values) {
  var i = 0,
      n = values.length - 1,
      v = values[0],
      I = new Array(n < 0 ? 0 : n);

  while (i < n) I[i] = interpolate(v, v = values[++i]);

  return function (t) {
    var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i](t - i);
  };
}
},{}],"../node_modules/d3-interpolate/src/quantize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(interpolator, n) {
  var samples = new Array(n);

  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));

  return samples;
}
},{}],"../node_modules/d3-interpolate/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "interpolate", {
  enumerable: true,
  get: function () {
    return _value.default;
  }
});
Object.defineProperty(exports, "interpolateArray", {
  enumerable: true,
  get: function () {
    return _array.default;
  }
});
Object.defineProperty(exports, "interpolateBasis", {
  enumerable: true,
  get: function () {
    return _basis.default;
  }
});
Object.defineProperty(exports, "interpolateBasisClosed", {
  enumerable: true,
  get: function () {
    return _basisClosed.default;
  }
});
Object.defineProperty(exports, "interpolateDate", {
  enumerable: true,
  get: function () {
    return _date.default;
  }
});
Object.defineProperty(exports, "interpolateDiscrete", {
  enumerable: true,
  get: function () {
    return _discrete.default;
  }
});
Object.defineProperty(exports, "interpolateHue", {
  enumerable: true,
  get: function () {
    return _hue.default;
  }
});
Object.defineProperty(exports, "interpolateNumber", {
  enumerable: true,
  get: function () {
    return _number.default;
  }
});
Object.defineProperty(exports, "interpolateObject", {
  enumerable: true,
  get: function () {
    return _object.default;
  }
});
Object.defineProperty(exports, "interpolateRound", {
  enumerable: true,
  get: function () {
    return _round.default;
  }
});
Object.defineProperty(exports, "interpolateString", {
  enumerable: true,
  get: function () {
    return _string.default;
  }
});
Object.defineProperty(exports, "interpolateTransformCss", {
  enumerable: true,
  get: function () {
    return _index.interpolateTransformCss;
  }
});
Object.defineProperty(exports, "interpolateTransformSvg", {
  enumerable: true,
  get: function () {
    return _index.interpolateTransformSvg;
  }
});
Object.defineProperty(exports, "interpolateZoom", {
  enumerable: true,
  get: function () {
    return _zoom.default;
  }
});
Object.defineProperty(exports, "interpolateRgb", {
  enumerable: true,
  get: function () {
    return _rgb.default;
  }
});
Object.defineProperty(exports, "interpolateRgbBasis", {
  enumerable: true,
  get: function () {
    return _rgb.rgbBasis;
  }
});
Object.defineProperty(exports, "interpolateRgbBasisClosed", {
  enumerable: true,
  get: function () {
    return _rgb.rgbBasisClosed;
  }
});
Object.defineProperty(exports, "interpolateHsl", {
  enumerable: true,
  get: function () {
    return _hsl.default;
  }
});
Object.defineProperty(exports, "interpolateHslLong", {
  enumerable: true,
  get: function () {
    return _hsl.hslLong;
  }
});
Object.defineProperty(exports, "interpolateLab", {
  enumerable: true,
  get: function () {
    return _lab.default;
  }
});
Object.defineProperty(exports, "interpolateHcl", {
  enumerable: true,
  get: function () {
    return _hcl.default;
  }
});
Object.defineProperty(exports, "interpolateHclLong", {
  enumerable: true,
  get: function () {
    return _hcl.hclLong;
  }
});
Object.defineProperty(exports, "interpolateCubehelix", {
  enumerable: true,
  get: function () {
    return _cubehelix.default;
  }
});
Object.defineProperty(exports, "interpolateCubehelixLong", {
  enumerable: true,
  get: function () {
    return _cubehelix.cubehelixLong;
  }
});
Object.defineProperty(exports, "piecewise", {
  enumerable: true,
  get: function () {
    return _piecewise.default;
  }
});
Object.defineProperty(exports, "quantize", {
  enumerable: true,
  get: function () {
    return _quantize.default;
  }
});

var _value = _interopRequireDefault(require("./value"));

var _array = _interopRequireDefault(require("./array"));

var _basis = _interopRequireDefault(require("./basis"));

var _basisClosed = _interopRequireDefault(require("./basisClosed"));

var _date = _interopRequireDefault(require("./date"));

var _discrete = _interopRequireDefault(require("./discrete"));

var _hue = _interopRequireDefault(require("./hue"));

var _number = _interopRequireDefault(require("./number"));

var _object = _interopRequireDefault(require("./object"));

var _round = _interopRequireDefault(require("./round"));

var _string = _interopRequireDefault(require("./string"));

var _index = require("./transform/index");

var _zoom = _interopRequireDefault(require("./zoom"));

var _rgb = _interopRequireWildcard(require("./rgb"));

var _hsl = _interopRequireWildcard(require("./hsl"));

var _lab = _interopRequireDefault(require("./lab"));

var _hcl = _interopRequireWildcard(require("./hcl"));

var _cubehelix = _interopRequireWildcard(require("./cubehelix"));

var _piecewise = _interopRequireDefault(require("./piecewise"));

var _quantize = _interopRequireDefault(require("./quantize"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./value":"../node_modules/d3-interpolate/src/value.js","./array":"../node_modules/d3-interpolate/src/array.js","./basis":"../node_modules/d3-interpolate/src/basis.js","./basisClosed":"../node_modules/d3-interpolate/src/basisClosed.js","./date":"../node_modules/d3-interpolate/src/date.js","./discrete":"../node_modules/d3-interpolate/src/discrete.js","./hue":"../node_modules/d3-interpolate/src/hue.js","./number":"../node_modules/d3-interpolate/src/number.js","./object":"../node_modules/d3-interpolate/src/object.js","./round":"../node_modules/d3-interpolate/src/round.js","./string":"../node_modules/d3-interpolate/src/string.js","./transform/index":"../node_modules/d3-interpolate/src/transform/index.js","./zoom":"../node_modules/d3-interpolate/src/zoom.js","./rgb":"../node_modules/d3-interpolate/src/rgb.js","./hsl":"../node_modules/d3-interpolate/src/hsl.js","./lab":"../node_modules/d3-interpolate/src/lab.js","./hcl":"../node_modules/d3-interpolate/src/hcl.js","./cubehelix":"../node_modules/d3-interpolate/src/cubehelix.js","./piecewise":"../node_modules/d3-interpolate/src/piecewise.js","./quantize":"../node_modules/d3-interpolate/src/quantize.js"}],"../node_modules/d3-scale/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return function () {
    return x;
  };
}
},{}],"../node_modules/d3-scale/src/number.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return +x;
}
},{}],"../node_modules/d3-scale/src/continuous.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identity = identity;
exports.copy = copy;
exports.transformer = transformer;
exports.default = continuous;

var _d3Array = require("d3-array");

var _d3Interpolate = require("d3-interpolate");

var _constant = _interopRequireDefault(require("./constant"));

var _number = _interopRequireDefault(require("./number"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unit = [0, 1];

function identity(x) {
  return x;
}

function normalize(a, b) {
  return (b -= a = +a) ? function (x) {
    return (x - a) / b;
  } : (0, _constant.default)(isNaN(b) ? NaN : 0.5);
}

function clamper(domain) {
  var a = domain[0],
      b = domain[domain.length - 1],
      t;
  if (a > b) t = a, a = b, b = t;
  return function (x) {
    return Math.max(a, Math.min(b, x));
  };
} // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].


function bimap(domain, range, interpolate) {
  var d0 = domain[0],
      d1 = domain[1],
      r0 = range[0],
      r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function (x) {
    return r0(d0(x));
  };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1; // Reverse descending domains.

  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function (x) {
    var i = (0, _d3Array.bisect)(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}

function transformer() {
  var domain = unit,
      range = unit,
      interpolate = _d3Interpolate.interpolate,
      transform,
      untransform,
      unknown,
      clamp = identity,
      piecewise,
      output,
      input;

  function rescale() {
    piecewise = Math.min(domain.length, range.length) > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }

  scale.invert = function (y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), _d3Interpolate.interpolateNumber)))(y)));
  };

  scale.domain = function (_) {
    return arguments.length ? (domain = Array.from(_, _number.default), clamp === identity || (clamp = clamper(domain)), rescale()) : domain.slice();
  };

  scale.range = function (_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.rangeRound = function (_) {
    return range = Array.from(_), interpolate = _d3Interpolate.interpolateRound, rescale();
  };

  scale.clamp = function (_) {
    return arguments.length ? (clamp = _ ? clamper(domain) : identity, scale) : clamp !== identity;
  };

  scale.interpolate = function (_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };

  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function (t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}

function continuous(transform, untransform) {
  return transformer()(transform, untransform);
}
},{"d3-array":"../node_modules/d3-array/src/index.js","d3-interpolate":"../node_modules/d3-interpolate/src/index.js","./constant":"../node_modules/d3-scale/src/constant.js","./number":"../node_modules/d3-scale/src/number.js"}],"../node_modules/d3-format/src/formatDecimal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimal(1.23) returns ["123", 0].
function _default(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity

  var i,
      coefficient = x.slice(0, i); // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).

  return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
}
},{}],"../node_modules/d3-format/src/exponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _formatDecimal = _interopRequireDefault(require("./formatDecimal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(x) {
  return x = (0, _formatDecimal.default)(Math.abs(x)), x ? x[1] : NaN;
}
},{"./formatDecimal":"../node_modules/d3-format/src/formatDecimal.js"}],"../node_modules/d3-format/src/formatGroup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(grouping, thousands) {
  return function (value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}
},{}],"../node_modules/d3-format/src/formatNumerals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(numerals) {
  return function (value) {
    return value.replace(/[0-9]/g, function (i) {
      return numerals[+i];
    });
  };
}
},{}],"../node_modules/d3-format/src/formatSpecifier.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatSpecifier;
// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  return new FormatSpecifier(specifier);
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  this.fill = match[1] || " ";
  this.align = match[2] || ">";
  this.sign = match[3] || "-";
  this.symbol = match[4] || "";
  this.zero = !!match[5];
  this.width = match[6] && +match[6];
  this.comma = !!match[7];
  this.precision = match[8] && +match[8].slice(1);
  this.trim = !!match[9];
  this.type = match[10] || "";
}

FormatSpecifier.prototype.toString = function () {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width == null ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
},{}],"../node_modules/d3-format/src/formatTrim.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function _default(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;

      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;

      default:
        if (i0 > 0) {
          if (!+s[i]) break out;
          i0 = 0;
        }

        break;
    }
  }

  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}
},{}],"../node_modules/d3-format/src/formatPrefixAuto.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.prefixExponent = void 0;

var _formatDecimal = _interopRequireDefault(require("./formatDecimal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixExponent;
exports.prefixExponent = prefixExponent;

function _default(x, p) {
  var d = (0, _formatDecimal.default)(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (exports.prefixExponent = prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + (0, _formatDecimal.default)(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}
},{"./formatDecimal":"../node_modules/d3-format/src/formatDecimal.js"}],"../node_modules/d3-format/src/formatRounded.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _formatDecimal = _interopRequireDefault(require("./formatDecimal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(x, p) {
  var d = (0, _formatDecimal.default)(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}
},{"./formatDecimal":"../node_modules/d3-format/src/formatDecimal.js"}],"../node_modules/d3-format/src/formatTypes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _formatPrefixAuto = _interopRequireDefault(require("./formatPrefixAuto"));

var _formatRounded = _interopRequireDefault(require("./formatRounded"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  "%": function (x, p) {
    return (x * 100).toFixed(p);
  },
  "b": function (x) {
    return Math.round(x).toString(2);
  },
  "c": function (x) {
    return x + "";
  },
  "d": function (x) {
    return Math.round(x).toString(10);
  },
  "e": function (x, p) {
    return x.toExponential(p);
  },
  "f": function (x, p) {
    return x.toFixed(p);
  },
  "g": function (x, p) {
    return x.toPrecision(p);
  },
  "o": function (x) {
    return Math.round(x).toString(8);
  },
  "p": function (x, p) {
    return (0, _formatRounded.default)(x * 100, p);
  },
  "r": _formatRounded.default,
  "s": _formatPrefixAuto.default,
  "X": function (x) {
    return Math.round(x).toString(16).toUpperCase();
  },
  "x": function (x) {
    return Math.round(x).toString(16);
  }
};
exports.default = _default;
},{"./formatPrefixAuto":"../node_modules/d3-format/src/formatPrefixAuto.js","./formatRounded":"../node_modules/d3-format/src/formatRounded.js"}],"../node_modules/d3-format/src/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return x;
}
},{}],"../node_modules/d3-format/src/locale.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _exponent = _interopRequireDefault(require("./exponent"));

var _formatGroup = _interopRequireDefault(require("./formatGroup"));

var _formatNumerals = _interopRequireDefault(require("./formatNumerals"));

var _formatSpecifier = _interopRequireDefault(require("./formatSpecifier"));

var _formatTrim = _interopRequireDefault(require("./formatTrim"));

var _formatTypes = _interopRequireDefault(require("./formatTypes"));

var _formatPrefixAuto = require("./formatPrefixAuto");

var _identity = _interopRequireDefault(require("./identity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

function _default(locale) {
  var group = locale.grouping && locale.thousands ? (0, _formatGroup.default)(locale.grouping, locale.thousands) : _identity.default,
      currency = locale.currency,
      decimal = locale.decimal,
      numerals = locale.numerals ? (0, _formatNumerals.default)(locale.numerals) : _identity.default,
      percent = locale.percent || "%";

  function newFormat(specifier) {
    specifier = (0, _formatSpecifier.default)(specifier);
    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type; // The "n" type is an alias for ",g".

    if (type === "n") comma = true, type = "g"; // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!_formatTypes.default[type]) precision == null && (precision = 12), trim = true, type = "g"; // If zero fill is specified, padding goes after sign and before digits.

    if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "="; // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.

    var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? percent : ""; // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?

    var formatType = _formatTypes.default[type],
        maybeSuffix = /[defgprs%]/.test(type); // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].

    precision = precision == null ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i,
          n,
          c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value; // Perform the initial formatting.

        var valueNegative = value < 0;
        value = formatType(Math.abs(value), precision); // Trim insignificant zeros.

        if (trim) value = (0, _formatTrim.default)(value); // If a negative value rounds to zero during formatting, treat as positive.

        if (valueNegative && +value === 0) valueNegative = false; // Compute the prefix and suffix.

        valuePrefix = (valueNegative ? sign === "(" ? sign : "-" : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + _formatPrefixAuto.prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : ""); // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.

        if (maybeSuffix) {
          i = -1, n = value.length;

          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      } // If the fill character is not "0", grouping is applied before padding.


      if (comma && !zero) value = group(value, Infinity); // Compute the padding.

      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : ""; // If the fill character is "0", grouping is applied after padding.

      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = ""; // Reconstruct the final output based on the desired alignment.

      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;

        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;

        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;

        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }

      return numerals(value);
    }

    format.toString = function () {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = (0, _formatSpecifier.default)(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor((0, _exponent.default)(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function (value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}
},{"./exponent":"../node_modules/d3-format/src/exponent.js","./formatGroup":"../node_modules/d3-format/src/formatGroup.js","./formatNumerals":"../node_modules/d3-format/src/formatNumerals.js","./formatSpecifier":"../node_modules/d3-format/src/formatSpecifier.js","./formatTrim":"../node_modules/d3-format/src/formatTrim.js","./formatTypes":"../node_modules/d3-format/src/formatTypes.js","./formatPrefixAuto":"../node_modules/d3-format/src/formatPrefixAuto.js","./identity":"../node_modules/d3-format/src/identity.js"}],"../node_modules/d3-format/src/defaultLocale.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultLocale;
exports.formatPrefix = exports.format = void 0;

var _locale = _interopRequireDefault(require("./locale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locale;
var format;
exports.format = format;
var formatPrefix;
exports.formatPrefix = formatPrefix;
defaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale(definition) {
  locale = (0, _locale.default)(definition);
  exports.format = format = locale.format;
  exports.formatPrefix = formatPrefix = locale.formatPrefix;
  return locale;
}
},{"./locale":"../node_modules/d3-format/src/locale.js"}],"../node_modules/d3-format/src/precisionFixed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _exponent = _interopRequireDefault(require("./exponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(step) {
  return Math.max(0, -(0, _exponent.default)(Math.abs(step)));
}
},{"./exponent":"../node_modules/d3-format/src/exponent.js"}],"../node_modules/d3-format/src/precisionPrefix.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _exponent = _interopRequireDefault(require("./exponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor((0, _exponent.default)(value) / 3))) * 3 - (0, _exponent.default)(Math.abs(step)));
}
},{"./exponent":"../node_modules/d3-format/src/exponent.js"}],"../node_modules/d3-format/src/precisionRound.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _exponent = _interopRequireDefault(require("./exponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, (0, _exponent.default)(max) - (0, _exponent.default)(step)) + 1;
}
},{"./exponent":"../node_modules/d3-format/src/exponent.js"}],"../node_modules/d3-format/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "formatDefaultLocale", {
  enumerable: true,
  get: function () {
    return _defaultLocale.default;
  }
});
Object.defineProperty(exports, "format", {
  enumerable: true,
  get: function () {
    return _defaultLocale.format;
  }
});
Object.defineProperty(exports, "formatPrefix", {
  enumerable: true,
  get: function () {
    return _defaultLocale.formatPrefix;
  }
});
Object.defineProperty(exports, "formatLocale", {
  enumerable: true,
  get: function () {
    return _locale.default;
  }
});
Object.defineProperty(exports, "formatSpecifier", {
  enumerable: true,
  get: function () {
    return _formatSpecifier.default;
  }
});
Object.defineProperty(exports, "precisionFixed", {
  enumerable: true,
  get: function () {
    return _precisionFixed.default;
  }
});
Object.defineProperty(exports, "precisionPrefix", {
  enumerable: true,
  get: function () {
    return _precisionPrefix.default;
  }
});
Object.defineProperty(exports, "precisionRound", {
  enumerable: true,
  get: function () {
    return _precisionRound.default;
  }
});

var _defaultLocale = _interopRequireWildcard(require("./defaultLocale"));

var _locale = _interopRequireDefault(require("./locale"));

var _formatSpecifier = _interopRequireDefault(require("./formatSpecifier"));

var _precisionFixed = _interopRequireDefault(require("./precisionFixed"));

var _precisionPrefix = _interopRequireDefault(require("./precisionPrefix"));

var _precisionRound = _interopRequireDefault(require("./precisionRound"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }
},{"./defaultLocale":"../node_modules/d3-format/src/defaultLocale.js","./locale":"../node_modules/d3-format/src/locale.js","./formatSpecifier":"../node_modules/d3-format/src/formatSpecifier.js","./precisionFixed":"../node_modules/d3-format/src/precisionFixed.js","./precisionPrefix":"../node_modules/d3-format/src/precisionPrefix.js","./precisionRound":"../node_modules/d3-format/src/precisionRound.js"}],"../node_modules/d3-scale/src/tickFormat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _d3Array = require("d3-array");

var _d3Format = require("d3-format");

function _default(start, stop, count, specifier) {
  var step = (0, _d3Array.tickStep)(start, stop, count),
      precision;
  specifier = (0, _d3Format.formatSpecifier)(specifier == null ? ",f" : specifier);

  switch (specifier.type) {
    case "s":
      {
        var value = Math.max(Math.abs(start), Math.abs(stop));
        if (specifier.precision == null && !isNaN(precision = (0, _d3Format.precisionPrefix)(step, value))) specifier.precision = precision;
        return (0, _d3Format.formatPrefix)(specifier, value);
      }

    case "":
    case "e":
    case "g":
    case "p":
    case "r":
      {
        if (specifier.precision == null && !isNaN(precision = (0, _d3Format.precisionRound)(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
        break;
      }

    case "f":
    case "%":
      {
        if (specifier.precision == null && !isNaN(precision = (0, _d3Format.precisionFixed)(step))) specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
  }

  return (0, _d3Format.format)(specifier);
}
},{"d3-array":"../node_modules/d3-array/src/index.js","d3-format":"../node_modules/d3-format/src/index.js"}],"../node_modules/d3-scale/src/linear.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linearish = linearish;
exports.default = linear;

var _d3Array = require("d3-array");

var _continuous = _interopRequireWildcard(require("./continuous"));

var _init = require("./init");

var _tickFormat = _interopRequireDefault(require("./tickFormat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function (count) {
    var d = domain();
    return (0, _d3Array.ticks)(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function (count, specifier) {
    var d = domain();
    return (0, _tickFormat.default)(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function (count) {
    if (count == null) count = 10;
    var d = domain(),
        i0 = 0,
        i1 = d.length - 1,
        start = d[i0],
        stop = d[i1],
        step;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }

    step = (0, _d3Array.tickIncrement)(start, stop, count);

    if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
      step = (0, _d3Array.tickIncrement)(start, stop, count);
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
      step = (0, _d3Array.tickIncrement)(start, stop, count);
    }

    if (step > 0) {
      d[i0] = Math.floor(start / step) * step;
      d[i1] = Math.ceil(stop / step) * step;
      domain(d);
    } else if (step < 0) {
      d[i0] = Math.ceil(start * step) / step;
      d[i1] = Math.floor(stop * step) / step;
      domain(d);
    }

    return scale;
  };

  return scale;
}

function linear() {
  var scale = (0, _continuous.default)(_continuous.identity, _continuous.identity);

  scale.copy = function () {
    return (0, _continuous.copy)(scale, linear());
  };

  _init.initRange.apply(scale, arguments);

  return linearish(scale);
}
},{"d3-array":"../node_modules/d3-array/src/index.js","./continuous":"../node_modules/d3-scale/src/continuous.js","./init":"../node_modules/d3-scale/src/init.js","./tickFormat":"../node_modules/d3-scale/src/tickFormat.js"}],"../node_modules/d3-scale/src/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = identity;

var _linear = require("./linear");

var _number = _interopRequireDefault(require("./number"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function identity(domain) {
  var unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : x;
  }

  scale.invert = scale;

  scale.domain = scale.range = function (_) {
    return arguments.length ? (domain = Array.from(_, _number.default), scale) : domain.slice();
  };

  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function () {
    return identity(domain).unknown(unknown);
  };

  domain = arguments.length ? Array.from(domain, _number.default) : [0, 1];
  return (0, _linear.linearish)(scale);
}
},{"./linear":"../node_modules/d3-scale/src/linear.js","./number":"../node_modules/d3-scale/src/number.js"}],"../node_modules/d3-scale/src/nice.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(domain, interval) {
  domain = domain.slice();
  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      t;

  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }

  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}
},{}],"../node_modules/d3-scale/src/log.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loggish = loggish;
exports.default = log;

var _d3Array = require("d3-array");

var _d3Format = require("d3-format");

var _nice = _interopRequireDefault(require("./nice"));

var _continuous = require("./continuous");

var _init = require("./init");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transformLog(x) {
  return Math.log(x);
}

function transformExp(x) {
  return Math.exp(x);
}

function transformLogn(x) {
  return -Math.log(-x);
}

function transformExpn(x) {
  return -Math.exp(-x);
}

function pow10(x) {
  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}

function powp(base) {
  return base === 10 ? pow10 : base === Math.E ? Math.exp : function (x) {
    return Math.pow(base, x);
  };
}

function logp(base) {
  return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), function (x) {
    return Math.log(x) / base;
  });
}

function reflect(f) {
  return function (x) {
    return -f(-x);
  };
}

function loggish(transform) {
  var scale = transform(transformLog, transformExp),
      domain = scale.domain,
      base = 10,
      logs,
      pows;

  function rescale() {
    logs = logp(base), pows = powp(base);

    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }

    return scale;
  }

  scale.base = function (_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };

  scale.domain = function (_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.ticks = function (count) {
    var d = domain(),
        u = d[0],
        v = d[d.length - 1],
        r;
    if (r = v < u) i = u, u = v, v = i;
    var i = logs(u),
        j = logs(v),
        p,
        k,
        t,
        n = count == null ? 10 : +count,
        z = [];

    if (!(base % 1) && j - i < n) {
      i = Math.round(i) - 1, j = Math.round(j) + 1;
      if (u > 0) for (; i < j; ++i) {
        for (k = 1, p = pows(i); k < base; ++k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      } else for (; i < j; ++i) {
        for (k = base - 1, p = pows(i); k >= 1; --k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
    } else {
      z = (0, _d3Array.ticks)(i, j, Math.min(j - i, n)).map(pows);
    }

    return r ? z.reverse() : z;
  };

  scale.tickFormat = function (count, specifier) {
    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function") specifier = (0, _d3Format.format)(specifier);
    if (count === Infinity) return specifier;
    if (count == null) count = 10;
    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?

    return function (d) {
      var i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };

  scale.nice = function () {
    return domain((0, _nice.default)(domain(), {
      floor: function (x) {
        return pows(Math.floor(logs(x)));
      },
      ceil: function (x) {
        return pows(Math.ceil(logs(x)));
      }
    }));
  };

  return scale;
}

function log() {
  var scale = loggish((0, _continuous.transformer)()).domain([1, 10]);

  scale.copy = function () {
    return (0, _continuous.copy)(scale, log()).base(scale.base());
  };

  _init.initRange.apply(scale, arguments);

  return scale;
}
},{"d3-array":"../node_modules/d3-array/src/index.js","d3-format":"../node_modules/d3-format/src/index.js","./nice":"../node_modules/d3-scale/src/nice.js","./continuous":"../node_modules/d3-scale/src/continuous.js","./init":"../node_modules/d3-scale/src/init.js"}],"../node_modules/d3-scale/src/symlog.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.symlogish = symlogish;
exports.default = symlog;

var _linear = require("./linear");

var _continuous = require("./continuous");

var _init = require("./init");

function transformSymlog(c) {
  return function (x) {
    return Math.sign(x) * Math.log1p(Math.abs(x / c));
  };
}

function transformSymexp(c) {
  return function (x) {
    return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
  };
}

function symlogish(transform) {
  var c = 1,
      scale = transform(transformSymlog(c), transformSymexp(c));

  scale.constant = function (_) {
    return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
  };

  return (0, _linear.linearish)(scale);
}

function symlog() {
  var scale = symlogish((0, _continuous.transformer)());

  scale.copy = function () {
    return (0, _continuous.copy)(scale, symlog()).constant(scale.constant());
  };

  return _init.initRange.apply(scale, arguments);
}
},{"./linear":"../node_modules/d3-scale/src/linear.js","./continuous":"../node_modules/d3-scale/src/continuous.js","./init":"../node_modules/d3-scale/src/init.js"}],"../node_modules/d3-scale/src/pow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.powish = powish;
exports.default = pow;
exports.sqrt = sqrt;

var _linear = require("./linear");

var _continuous = require("./continuous");

var _init = require("./init");

function transformPow(exponent) {
  return function (x) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  };
}

function transformSqrt(x) {
  return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
}

function transformSquare(x) {
  return x < 0 ? -x * x : x * x;
}

function powish(transform) {
  var scale = transform(_continuous.identity, _continuous.identity),
      exponent = 1;

  function rescale() {
    return exponent === 1 ? transform(_continuous.identity, _continuous.identity) : exponent === 0.5 ? transform(transformSqrt, transformSquare) : transform(transformPow(exponent), transformPow(1 / exponent));
  }

  scale.exponent = function (_) {
    return arguments.length ? (exponent = +_, rescale()) : exponent;
  };

  return (0, _linear.linearish)(scale);
}

function pow() {
  var scale = powish((0, _continuous.transformer)());

  scale.copy = function () {
    return (0, _continuous.copy)(scale, pow()).exponent(scale.exponent());
  };

  _init.initRange.apply(scale, arguments);

  return scale;
}

function sqrt() {
  return pow.apply(null, arguments).exponent(0.5);
}
},{"./linear":"../node_modules/d3-scale/src/linear.js","./continuous":"../node_modules/d3-scale/src/continuous.js","./init":"../node_modules/d3-scale/src/init.js"}],"../node_modules/d3-scale/src/quantile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quantile;

var _d3Array = require("d3-array");

var _init = require("./init");

function quantile() {
  var domain = [],
      range = [],
      thresholds = [],
      unknown;

  function rescale() {
    var i = 0,
        n = Math.max(1, range.length);
    thresholds = new Array(n - 1);

    while (++i < n) thresholds[i - 1] = (0, _d3Array.quantile)(domain, i / n);

    return scale;
  }

  function scale(x) {
    return isNaN(x = +x) ? unknown : range[(0, _d3Array.bisect)(thresholds, x)];
  }

  scale.invertExtent = function (y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN] : [i > 0 ? thresholds[i - 1] : domain[0], i < thresholds.length ? thresholds[i] : domain[domain.length - 1]];
  };

  scale.domain = function (_) {
    if (!arguments.length) return domain.slice();
    domain = [];

    for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);

    domain.sort(_d3Array.ascending);
    return rescale();
  };

  scale.range = function (_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.quantiles = function () {
    return thresholds.slice();
  };

  scale.copy = function () {
    return quantile().domain(domain).range(range).unknown(unknown);
  };

  return _init.initRange.apply(scale, arguments);
}
},{"d3-array":"../node_modules/d3-array/src/index.js","./init":"../node_modules/d3-scale/src/init.js"}],"../node_modules/d3-scale/src/quantize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quantize;

var _d3Array = require("d3-array");

var _linear = require("./linear");

var _init = require("./init");

function quantize() {
  var x0 = 0,
      x1 = 1,
      n = 1,
      domain = [0.5],
      range = [0, 1],
      unknown;

  function scale(x) {
    return x <= x ? range[(0, _d3Array.bisect)(domain, x, 0, n)] : unknown;
  }

  function rescale() {
    var i = -1;
    domain = new Array(n);

    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);

    return scale;
  }

  scale.domain = function (_) {
    return arguments.length ? ([x0, x1] = _, x0 = +x0, x1 = +x1, rescale()) : [x0, x1];
  };

  scale.range = function (_) {
    return arguments.length ? (n = (range = Array.from(_)).length - 1, rescale()) : range.slice();
  };

  scale.invertExtent = function (y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN] : i < 1 ? [x0, domain[0]] : i >= n ? [domain[n - 1], x1] : [domain[i - 1], domain[i]];
  };

  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : scale;
  };

  scale.thresholds = function () {
    return domain.slice();
  };

  scale.copy = function () {
    return quantize().domain([x0, x1]).range(range).unknown(unknown);
  };

  return _init.initRange.apply((0, _linear.linearish)(scale), arguments);
}
},{"d3-array":"../node_modules/d3-array/src/index.js","./linear":"../node_modules/d3-scale/src/linear.js","./init":"../node_modules/d3-scale/src/init.js"}],"../node_modules/d3-scale/src/threshold.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = threshold;

var _d3Array = require("d3-array");

var _init = require("./init");

function threshold() {
  var domain = [0.5],
      range = [0, 1],
      unknown,
      n = 1;

  function scale(x) {
    return x <= x ? range[(0, _d3Array.bisect)(domain, x, 0, n)] : unknown;
  }

  scale.domain = function (_) {
    return arguments.length ? (domain = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
  };

  scale.range = function (_) {
    return arguments.length ? (range = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
  };

  scale.invertExtent = function (y) {
    var i = range.indexOf(y);
    return [domain[i - 1], domain[i]];
  };

  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function () {
    return threshold().domain(domain).range(range).unknown(unknown);
  };

  return _init.initRange.apply(scale, arguments);
}
},{"d3-array":"../node_modules/d3-array/src/index.js","./init":"../node_modules/d3-scale/src/init.js"}],"../node_modules/d3-time/src/interval.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = newInterval;
var t0 = new Date(),
    t1 = new Date();

function newInterval(floori, offseti, count, field) {
  function interval(date) {
    return floori(date = new Date(+date)), date;
  }

  interval.floor = interval;

  interval.ceil = function (date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = function (date) {
    var d0 = interval(date),
        d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = function (date, step) {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = function (start, stop, step) {
    var range = [],
        previous;
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date

    do range.push(previous = new Date(+start)), offseti(start, step), floori(start); while (previous < start && start < stop);

    return range;
  };

  interval.filter = function (test) {
    return newInterval(function (date) {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, function (date, step) {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty

        } else while (--step >= 0) {
          while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty

        }
      }
    });
  };

  if (count) {
    interval.count = function (start, end) {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };

    interval.every = function (step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function (d) {
        return field(d) % step === 0;
      } : function (d) {
        return interval.count(0, d) % step === 0;
      });
    };
  }

  return interval;
}
},{}],"../node_modules/d3-time/src/millisecond.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.milliseconds = exports.default = void 0;

var _interval = _interopRequireDefault(require("./interval"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var millisecond = (0, _interval.default)(function () {// noop
}, function (date, step) {
  date.setTime(+date + step);
}, function (start, end) {
  return end - start;
}); // An optimized implementation for this simple case.

millisecond.every = function (k) {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return (0, _interval.default)(function (date) {
    date.setTime(Math.floor(date / k) * k);
  }, function (date, step) {
    date.setTime(+date + step * k);
  }, function (start, end) {
    return (end - start) / k;
  });
};

var _default = millisecond;
exports.default = _default;
var milliseconds = millisecond.range;
exports.milliseconds = milliseconds;
},{"./interval":"../node_modules/d3-time/src/interval.js"}],"../node_modules/d3-time/src/duration.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.durationWeek = exports.durationDay = exports.durationHour = exports.durationMinute = exports.durationSecond = void 0;
var durationSecond = 1e3;
exports.durationSecond = durationSecond;
var durationMinute = 6e4;
exports.durationMinute = durationMinute;
var durationHour = 36e5;
exports.durationHour = durationHour;
var durationDay = 864e5;
exports.durationDay = durationDay;
var durationWeek = 6048e5;
exports.durationWeek = durationWeek;
},{}],"../node_modules/d3-time/src/second.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seconds = exports.default = void 0;

var _interval = _interopRequireDefault(require("./interval"));

var _duration = require("./duration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var second = (0, _interval.default)(function (date) {
  date.setTime(date - date.getMilliseconds());
}, function (date, step) {
  date.setTime(+date + step * _duration.durationSecond);
}, function (start, end) {
  return (end - start) / _duration.durationSecond;
}, function (date) {
  return date.getUTCSeconds();
});
var _default = second;
exports.default = _default;
var seconds = second.range;
exports.seconds = seconds;
},{"./interval":"../node_modules/d3-time/src/interval.js","./duration":"../node_modules/d3-time/src/duration.js"}],"../node_modules/d3-time/src/minute.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minutes = exports.default = void 0;

var _interval = _interopRequireDefault(require("./interval"));

var _duration = require("./duration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var minute = (0, _interval.default)(function (date) {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * _duration.durationSecond);
}, function (date, step) {
  date.setTime(+date + step * _duration.durationMinute);
}, function (start, end) {
  return (end - start) / _duration.durationMinute;
}, function (date) {
  return date.getMinutes();
});
var _default = minute;
exports.default = _default;
var minutes = minute.range;
exports.minutes = minutes;
},{"./interval":"../node_modules/d3-time/src/interval.js","./duration":"../node_modules/d3-time/src/duration.js"}],"../node_modules/d3-time/src/hour.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hours = exports.default = void 0;

var _interval = _interopRequireDefault(require("./interval"));

var _duration = require("./duration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hour = (0, _interval.default)(function (date) {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * _duration.durationSecond - date.getMinutes() * _duration.durationMinute);
}, function (date, step) {
  date.setTime(+date + step * _duration.durationHour);
}, function (start, end) {
  return (end - start) / _duration.durationHour;
}, function (date) {
  return date.getHours();
});
var _default = hour;
exports.default = _default;
var hours = hour.range;
exports.hours = hours;
},{"./interval":"../node_modules/d3-time/src/interval.js","./duration":"../node_modules/d3-time/src/duration.js"}],"../node_modules/d3-time/src/day.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.days = exports.default = void 0;

var _interval = _interopRequireDefault(require("./interval"));

var _duration = require("./duration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var day = (0, _interval.default)(function (date) {
  date.setHours(0, 0, 0, 0);
}, function (date, step) {
  date.setDate(date.getDate() + step);
}, function (start, end) {
  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * _duration.durationMinute) / _duration.durationDay;
}, function (date) {
  return date.getDate() - 1;
});
var _default = day;
exports.default = _default;
var days = day.range;
exports.days = days;
},{"./interval":"../node_modules/d3-time/src/interval.js","./duration":"../node_modules/d3-time/src/duration.js"}],"../node_modules/d3-time/src/week.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saturdays = exports.fridays = exports.thursdays = exports.wednesdays = exports.tuesdays = exports.mondays = exports.sundays = exports.saturday = exports.friday = exports.thursday = exports.wednesday = exports.tuesday = exports.monday = exports.sunday = void 0;

var _interval = _interopRequireDefault(require("./interval"));

var _duration = require("./duration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function weekday(i) {
  return (0, _interval.default)(function (date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setDate(date.getDate() + step * 7);
  }, function (start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * _duration.durationMinute) / _duration.durationWeek;
  });
}

var sunday = weekday(0);
exports.sunday = sunday;
var monday = weekday(1);
exports.monday = monday;
var tuesday = weekday(2);
exports.tuesday = tuesday;
var wednesday = weekday(3);
exports.wednesday = wednesday;
var thursday = weekday(4);
exports.thursday = thursday;
var friday = weekday(5);
exports.friday = friday;
var saturday = weekday(6);
exports.saturday = saturday;
var sundays = sunday.range;
exports.sundays = sundays;
var mondays = monday.range;
exports.mondays = mondays;
var tuesdays = tuesday.range;
exports.tuesdays = tuesdays;
var wednesdays = wednesday.range;
exports.wednesdays = wednesdays;
var thursdays = thursday.range;
exports.thursdays = thursdays;
var fridays = friday.range;
exports.fridays = fridays;
var saturdays = saturday.range;
exports.saturdays = saturdays;
},{"./interval":"../node_modules/d3-time/src/interval.js","./duration":"../node_modules/d3-time/src/duration.js"}],"../node_modules/d3-time/src/month.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.months = exports.default = void 0;

var _interval = _interopRequireDefault(require("./interval"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var month = (0, _interval.default)(function (date) {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, function (date, step) {
  date.setMonth(date.getMonth() + step);
}, function (start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function (date) {
  return date.getMonth();
});
var _default = month;
exports.default = _default;
var months = month.range;
exports.months = months;
},{"./interval":"../node_modules/d3-time/src/interval.js"}],"../node_modules/d3-time/src/year.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.years = exports.default = void 0;

var _interval = _interopRequireDefault(require("./interval"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var year = (0, _interval.default)(function (date) {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, function (date, step) {
  date.setFullYear(date.getFullYear() + step);
}, function (start, end) {
  return end.getFullYear() - start.getFullYear();
}, function (date) {
  return date.getFullYear();
}); // An optimized implementation for this simple case.

year.every = function (k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : (0, _interval.default)(function (date) {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setFullYear(date.getFullYear() + step * k);
  });
};

var _default = year;
exports.default = _default;
var years = year.range;
exports.years = years;
},{"./interval":"../node_modules/d3-time/src/interval.js"}],"../node_modules/d3-time/src/utcMinute.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcMinutes = exports.default = void 0;

var _interval = _interopRequireDefault(require("./interval"));

var _duration = require("./duration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utcMinute = (0, _interval.default)(function (date) {
  date.setUTCSeconds(0, 0);
}, function (date, step) {
  date.setTime(+date + step * _duration.durationMinute);
}, function (start, end) {
  return (end - start) / _duration.durationMinute;
}, function (date) {
  return date.getUTCMinutes();
});
var _default = utcMinute;
exports.default = _default;
var utcMinutes = utcMinute.range;
exports.utcMinutes = utcMinutes;
},{"./interval":"../node_modules/d3-time/src/interval.js","./duration":"../node_modules/d3-time/src/duration.js"}],"../node_modules/d3-time/src/utcHour.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcHours = exports.default = void 0;

var _interval = _interopRequireDefault(require("./interval"));

var _duration = require("./duration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utcHour = (0, _interval.default)(function (date) {
  date.setUTCMinutes(0, 0, 0);
}, function (date, step) {
  date.setTime(+date + step * _duration.durationHour);
}, function (start, end) {
  return (end - start) / _duration.durationHour;
}, function (date) {
  return date.getUTCHours();
});
var _default = utcHour;
exports.default = _default;
var utcHours = utcHour.range;
exports.utcHours = utcHours;
},{"./interval":"../node_modules/d3-time/src/interval.js","./duration":"../node_modules/d3-time/src/duration.js"}],"../node_modules/d3-time/src/utcDay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcDays = exports.default = void 0;

var _interval = _interopRequireDefault(require("./interval"));

var _duration = require("./duration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utcDay = (0, _interval.default)(function (date) {
  date.setUTCHours(0, 0, 0, 0);
}, function (date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function (start, end) {
  return (end - start) / _duration.durationDay;
}, function (date) {
  return date.getUTCDate() - 1;
});
var _default = utcDay;
exports.default = _default;
var utcDays = utcDay.range;
exports.utcDays = utcDays;
},{"./interval":"../node_modules/d3-time/src/interval.js","./duration":"../node_modules/d3-time/src/duration.js"}],"../node_modules/d3-time/src/utcWeek.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcSaturdays = exports.utcFridays = exports.utcThursdays = exports.utcWednesdays = exports.utcTuesdays = exports.utcMondays = exports.utcSundays = exports.utcSaturday = exports.utcFriday = exports.utcThursday = exports.utcWednesday = exports.utcTuesday = exports.utcMonday = exports.utcSunday = void 0;

var _interval = _interopRequireDefault(require("./interval"));

var _duration = require("./duration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function utcWeekday(i) {
  return (0, _interval.default)(function (date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, function (start, end) {
    return (end - start) / _duration.durationWeek;
  });
}

var utcSunday = utcWeekday(0);
exports.utcSunday = utcSunday;
var utcMonday = utcWeekday(1);
exports.utcMonday = utcMonday;
var utcTuesday = utcWeekday(2);
exports.utcTuesday = utcTuesday;
var utcWednesday = utcWeekday(3);
exports.utcWednesday = utcWednesday;
var utcThursday = utcWeekday(4);
exports.utcThursday = utcThursday;
var utcFriday = utcWeekday(5);
exports.utcFriday = utcFriday;
var utcSaturday = utcWeekday(6);
exports.utcSaturday = utcSaturday;
var utcSundays = utcSunday.range;
exports.utcSundays = utcSundays;
var utcMondays = utcMonday.range;
exports.utcMondays = utcMondays;
var utcTuesdays = utcTuesday.range;
exports.utcTuesdays = utcTuesdays;
var utcWednesdays = utcWednesday.range;
exports.utcWednesdays = utcWednesdays;
var utcThursdays = utcThursday.range;
exports.utcThursdays = utcThursdays;
var utcFridays = utcFriday.range;
exports.utcFridays = utcFridays;
var utcSaturdays = utcSaturday.range;
exports.utcSaturdays = utcSaturdays;
},{"./interval":"../node_modules/d3-time/src/interval.js","./duration":"../node_modules/d3-time/src/duration.js"}],"../node_modules/d3-time/src/utcMonth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcMonths = exports.default = void 0;

var _interval = _interopRequireDefault(require("./interval"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utcMonth = (0, _interval.default)(function (date) {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, function (date, step) {
  date.setUTCMonth(date.getUTCMonth() + step);
}, function (start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function (date) {
  return date.getUTCMonth();
});
var _default = utcMonth;
exports.default = _default;
var utcMonths = utcMonth.range;
exports.utcMonths = utcMonths;
},{"./interval":"../node_modules/d3-time/src/interval.js"}],"../node_modules/d3-time/src/utcYear.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utcYears = exports.default = void 0;

var _interval = _interopRequireDefault(require("./interval"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utcYear = (0, _interval.default)(function (date) {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, function (date, step) {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, function (start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function (date) {
  return date.getUTCFullYear();
}); // An optimized implementation for this simple case.

utcYear.every = function (k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : (0, _interval.default)(function (date) {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};

var _default = utcYear;
exports.default = _default;
var utcYears = utcYear.range;
exports.utcYears = utcYears;
},{"./interval":"../node_modules/d3-time/src/interval.js"}],"../node_modules/d3-time/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "timeInterval", {
  enumerable: true,
  get: function () {
    return _interval.default;
  }
});
Object.defineProperty(exports, "timeMillisecond", {
  enumerable: true,
  get: function () {
    return _millisecond.default;
  }
});
Object.defineProperty(exports, "timeMilliseconds", {
  enumerable: true,
  get: function () {
    return _millisecond.milliseconds;
  }
});
Object.defineProperty(exports, "utcMillisecond", {
  enumerable: true,
  get: function () {
    return _millisecond.default;
  }
});
Object.defineProperty(exports, "utcMilliseconds", {
  enumerable: true,
  get: function () {
    return _millisecond.milliseconds;
  }
});
Object.defineProperty(exports, "timeSecond", {
  enumerable: true,
  get: function () {
    return _second.default;
  }
});
Object.defineProperty(exports, "timeSeconds", {
  enumerable: true,
  get: function () {
    return _second.seconds;
  }
});
Object.defineProperty(exports, "utcSecond", {
  enumerable: true,
  get: function () {
    return _second.default;
  }
});
Object.defineProperty(exports, "utcSeconds", {
  enumerable: true,
  get: function () {
    return _second.seconds;
  }
});
Object.defineProperty(exports, "timeMinute", {
  enumerable: true,
  get: function () {
    return _minute.default;
  }
});
Object.defineProperty(exports, "timeMinutes", {
  enumerable: true,
  get: function () {
    return _minute.minutes;
  }
});
Object.defineProperty(exports, "timeHour", {
  enumerable: true,
  get: function () {
    return _hour.default;
  }
});
Object.defineProperty(exports, "timeHours", {
  enumerable: true,
  get: function () {
    return _hour.hours;
  }
});
Object.defineProperty(exports, "timeDay", {
  enumerable: true,
  get: function () {
    return _day.default;
  }
});
Object.defineProperty(exports, "timeDays", {
  enumerable: true,
  get: function () {
    return _day.days;
  }
});
Object.defineProperty(exports, "timeWeek", {
  enumerable: true,
  get: function () {
    return _week.sunday;
  }
});
Object.defineProperty(exports, "timeWeeks", {
  enumerable: true,
  get: function () {
    return _week.sundays;
  }
});
Object.defineProperty(exports, "timeSunday", {
  enumerable: true,
  get: function () {
    return _week.sunday;
  }
});
Object.defineProperty(exports, "timeSundays", {
  enumerable: true,
  get: function () {
    return _week.sundays;
  }
});
Object.defineProperty(exports, "timeMonday", {
  enumerable: true,
  get: function () {
    return _week.monday;
  }
});
Object.defineProperty(exports, "timeMondays", {
  enumerable: true,
  get: function () {
    return _week.mondays;
  }
});
Object.defineProperty(exports, "timeTuesday", {
  enumerable: true,
  get: function () {
    return _week.tuesday;
  }
});
Object.defineProperty(exports, "timeTuesdays", {
  enumerable: true,
  get: function () {
    return _week.tuesdays;
  }
});
Object.defineProperty(exports, "timeWednesday", {
  enumerable: true,
  get: function () {
    return _week.wednesday;
  }
});
Object.defineProperty(exports, "timeWednesdays", {
  enumerable: true,
  get: function () {
    return _week.wednesdays;
  }
});
Object.defineProperty(exports, "timeThursday", {
  enumerable: true,
  get: function () {
    return _week.thursday;
  }
});
Object.defineProperty(exports, "timeThursdays", {
  enumerable: true,
  get: function () {
    return _week.thursdays;
  }
});
Object.defineProperty(exports, "timeFriday", {
  enumerable: true,
  get: function () {
    return _week.friday;
  }
});
Object.defineProperty(exports, "timeFridays", {
  enumerable: true,
  get: function () {
    return _week.fridays;
  }
});
Object.defineProperty(exports, "timeSaturday", {
  enumerable: true,
  get: function () {
    return _week.saturday;
  }
});
Object.defineProperty(exports, "timeSaturdays", {
  enumerable: true,
  get: function () {
    return _week.saturdays;
  }
});
Object.defineProperty(exports, "timeMonth", {
  enumerable: true,
  get: function () {
    return _month.default;
  }
});
Object.defineProperty(exports, "timeMonths", {
  enumerable: true,
  get: function () {
    return _month.months;
  }
});
Object.defineProperty(exports, "timeYear", {
  enumerable: true,
  get: function () {
    return _year.default;
  }
});
Object.defineProperty(exports, "timeYears", {
  enumerable: true,
  get: function () {
    return _year.years;
  }
});
Object.defineProperty(exports, "utcMinute", {
  enumerable: true,
  get: function () {
    return _utcMinute.default;
  }
});
Object.defineProperty(exports, "utcMinutes", {
  enumerable: true,
  get: function () {
    return _utcMinute.utcMinutes;
  }
});
Object.defineProperty(exports, "utcHour", {
  enumerable: true,
  get: function () {
    return _utcHour.default;
  }
});
Object.defineProperty(exports, "utcHours", {
  enumerable: true,
  get: function () {
    return _utcHour.utcHours;
  }
});
Object.defineProperty(exports, "utcDay", {
  enumerable: true,
  get: function () {
    return _utcDay.default;
  }
});
Object.defineProperty(exports, "utcDays", {
  enumerable: true,
  get: function () {
    return _utcDay.utcDays;
  }
});
Object.defineProperty(exports, "utcWeek", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcSunday;
  }
});
Object.defineProperty(exports, "utcWeeks", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcSundays;
  }
});
Object.defineProperty(exports, "utcSunday", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcSunday;
  }
});
Object.defineProperty(exports, "utcSundays", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcSundays;
  }
});
Object.defineProperty(exports, "utcMonday", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcMonday;
  }
});
Object.defineProperty(exports, "utcMondays", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcMondays;
  }
});
Object.defineProperty(exports, "utcTuesday", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcTuesday;
  }
});
Object.defineProperty(exports, "utcTuesdays", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcTuesdays;
  }
});
Object.defineProperty(exports, "utcWednesday", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcWednesday;
  }
});
Object.defineProperty(exports, "utcWednesdays", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcWednesdays;
  }
});
Object.defineProperty(exports, "utcThursday", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcThursday;
  }
});
Object.defineProperty(exports, "utcThursdays", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcThursdays;
  }
});
Object.defineProperty(exports, "utcFriday", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcFriday;
  }
});
Object.defineProperty(exports, "utcFridays", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcFridays;
  }
});
Object.defineProperty(exports, "utcSaturday", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcSaturday;
  }
});
Object.defineProperty(exports, "utcSaturdays", {
  enumerable: true,
  get: function () {
    return _utcWeek.utcSaturdays;
  }
});
Object.defineProperty(exports, "utcMonth", {
  enumerable: true,
  get: function () {
    return _utcMonth.default;
  }
});
Object.defineProperty(exports, "utcMonths", {
  enumerable: true,
  get: function () {
    return _utcMonth.utcMonths;
  }
});
Object.defineProperty(exports, "utcYear", {
  enumerable: true,
  get: function () {
    return _utcYear.default;
  }
});
Object.defineProperty(exports, "utcYears", {
  enumerable: true,
  get: function () {
    return _utcYear.utcYears;
  }
});

var _interval = _interopRequireDefault(require("./interval"));

var _millisecond = _interopRequireWildcard(require("./millisecond"));

var _second = _interopRequireWildcard(require("./second"));

var _minute = _interopRequireWildcard(require("./minute"));

var _hour = _interopRequireWildcard(require("./hour"));

var _day = _interopRequireWildcard(require("./day"));

var _week = require("./week");

var _month = _interopRequireWildcard(require("./month"));

var _year = _interopRequireWildcard(require("./year"));

var _utcMinute = _interopRequireWildcard(require("./utcMinute"));

var _utcHour = _interopRequireWildcard(require("./utcHour"));

var _utcDay = _interopRequireWildcard(require("./utcDay"));

var _utcWeek = require("./utcWeek");

var _utcMonth = _interopRequireWildcard(require("./utcMonth"));

var _utcYear = _interopRequireWildcard(require("./utcYear"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./interval":"../node_modules/d3-time/src/interval.js","./millisecond":"../node_modules/d3-time/src/millisecond.js","./second":"../node_modules/d3-time/src/second.js","./minute":"../node_modules/d3-time/src/minute.js","./hour":"../node_modules/d3-time/src/hour.js","./day":"../node_modules/d3-time/src/day.js","./week":"../node_modules/d3-time/src/week.js","./month":"../node_modules/d3-time/src/month.js","./year":"../node_modules/d3-time/src/year.js","./utcMinute":"../node_modules/d3-time/src/utcMinute.js","./utcHour":"../node_modules/d3-time/src/utcHour.js","./utcDay":"../node_modules/d3-time/src/utcDay.js","./utcWeek":"../node_modules/d3-time/src/utcWeek.js","./utcMonth":"../node_modules/d3-time/src/utcMonth.js","./utcYear":"../node_modules/d3-time/src/utcYear.js"}],"../node_modules/d3-time-format/src/locale.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatLocale;

var _d3Time = require("d3-time");

function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }

  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}

function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }

  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}

function newYear(y) {
  return {
    y: y,
    m: 0,
    d: 1,
    H: 0,
    M: 0,
    S: 0,
    L: 0
  };
}

function formatLocale(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;
  var periodRe = formatRe(locale_periods),
      periodLookup = formatLookup(locale_periods),
      weekdayRe = formatRe(locale_weekdays),
      weekdayLookup = formatLookup(locale_weekdays),
      shortWeekdayRe = formatRe(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      shortMonthRe = formatRe(locale_shortMonths),
      shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  }; // These recursive directive definitions must be deferred.

  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function (date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;
      if (!(date instanceof Date)) date = new Date(+date);

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);else pad = c === "e" ? " " : "0";
          if (format = formats[c]) c = format(date, pad);
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, newDate) {
    return function (string) {
      var d = newYear(1900),
          i = parseSpecifier(d, specifier, string += "", 0),
          week,
          day;
      if (i != string.length) return null; // If a UNIX timestamp is specified, return it.

      if ("Q" in d) return new Date(d.Q); // The am-pm flag is 0 for AM, and 1 for PM.

      if ("p" in d) d.H = d.H % 12 + d.p * 12; // Convert day-of-week and week-of-year to day-of-year.

      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;

        if ("Z" in d) {
          week = utcDate(newYear(d.y)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? _d3Time.utcMonday.ceil(week) : (0, _d3Time.utcMonday)(week);
          week = _d3Time.utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = newDate(newYear(d.y)), day = week.getDay();
          week = day > 4 || day === 0 ? _d3Time.timeMonday.ceil(week) : (0, _d3Time.timeMonday)(week);
          week = _d3Time.timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      } // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.


      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      } // Otherwise, all fields are in local time.


      return newDate(d);
    };
  }

  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);

      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || (j = parse(d, string, j)) < 0) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }

  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }

  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }

  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }

  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }

  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }

  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }

  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }

  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }

  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }

  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }

  return {
    format: function (specifier) {
      var f = newFormat(specifier += "", formats);

      f.toString = function () {
        return specifier;
      };

      return f;
    },
    parse: function (specifier) {
      var p = newParse(specifier += "", localDate);

      p.toString = function () {
        return specifier;
      };

      return p;
    },
    utcFormat: function (specifier) {
      var f = newFormat(specifier += "", utcFormats);

      f.toString = function () {
        return specifier;
      };

      return f;
    },
    utcParse: function (specifier) {
      var p = newParse(specifier, utcDate);

      p.toString = function () {
        return specifier;
      };

      return p;
    }
  };
}

var pads = {
  "-": "",
  "_": " ",
  "0": "0"
},
    numberRe = /^\s*\d+/,
    // note: ignores next directive
percentRe = /^%/,
    requoteRe = /[\\^$*+?|[\]().{}]/g;

function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote(s) {
  return s.replace(requoteRe, "\\$&");
}

function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}

function formatLookup(names) {
  var map = {},
      i = -1,
      n = names.length;

  while (++i < n) map[names[i].toLowerCase()] = i;

  return map;
}

function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}

function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}

function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}

function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0] * 1000, i + n[0].length) : -1;
}

function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}

function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}

function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}

function formatDayOfYear(d, p) {
  return pad(1 + _d3Time.timeDay.count((0, _d3Time.timeYear)(d), d), p, 3);
}

function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}

function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}

function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}

function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}

function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}

function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}

function formatWeekNumberSunday(d, p) {
  return pad(_d3Time.timeSunday.count((0, _d3Time.timeYear)(d), d), p, 2);
}

function formatWeekNumberISO(d, p) {
  var day = d.getDay();
  d = day >= 4 || day === 0 ? (0, _d3Time.timeThursday)(d) : _d3Time.timeThursday.ceil(d);
  return pad(_d3Time.timeThursday.count((0, _d3Time.timeYear)(d), d) + ((0, _d3Time.timeYear)(d).getDay() === 4), p, 2);
}

function formatWeekdayNumberSunday(d) {
  return d.getDay();
}

function formatWeekNumberMonday(d, p) {
  return pad(_d3Time.timeMonday.count((0, _d3Time.timeYear)(d), d), p, 2);
}

function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}

function formatFullYear(d, p) {
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
}

function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}

function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}

function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}

function formatUTCDayOfYear(d, p) {
  return pad(1 + _d3Time.utcDay.count((0, _d3Time.utcYear)(d), d), p, 3);
}

function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}

function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}

function formatUTCWeekNumberSunday(d, p) {
  return pad(_d3Time.utcSunday.count((0, _d3Time.utcYear)(d), d), p, 2);
}

function formatUTCWeekNumberISO(d, p) {
  var day = d.getUTCDay();
  d = day >= 4 || day === 0 ? (0, _d3Time.utcThursday)(d) : _d3Time.utcThursday.ceil(d);
  return pad(_d3Time.utcThursday.count((0, _d3Time.utcYear)(d), d) + ((0, _d3Time.utcYear)(d).getUTCDay() === 4), p, 2);
}

function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday(d, p) {
  return pad(_d3Time.utcMonday.count((0, _d3Time.utcYear)(d), d), p, 2);
}

function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCZone() {
  return "+0000";
}

function formatLiteralPercent() {
  return "%";
}

function formatUnixTimestamp(d) {
  return +d;
}

function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1000);
}
},{"d3-time":"../node_modules/d3-time/src/index.js"}],"../node_modules/d3-time-format/src/defaultLocale.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defaultLocale;
exports.utcParse = exports.utcFormat = exports.timeParse = exports.timeFormat = void 0;

var _locale = _interopRequireDefault(require("./locale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locale;
var timeFormat;
exports.timeFormat = timeFormat;
var timeParse;
exports.timeParse = timeParse;
var utcFormat;
exports.utcFormat = utcFormat;
var utcParse;
exports.utcParse = utcParse;
defaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale(definition) {
  locale = (0, _locale.default)(definition);
  exports.timeFormat = timeFormat = locale.format;
  exports.timeParse = timeParse = locale.parse;
  exports.utcFormat = utcFormat = locale.utcFormat;
  exports.utcParse = utcParse = locale.utcParse;
  return locale;
}
},{"./locale":"../node_modules/d3-time-format/src/locale.js"}],"../node_modules/d3-time-format/src/isoFormat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.isoSpecifier = void 0;

var _defaultLocale = require("./defaultLocale");

var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
exports.isoSpecifier = isoSpecifier;

function formatIsoNative(date) {
  return date.toISOString();
}

var formatIso = Date.prototype.toISOString ? formatIsoNative : (0, _defaultLocale.utcFormat)(isoSpecifier);
var _default = formatIso;
exports.default = _default;
},{"./defaultLocale":"../node_modules/d3-time-format/src/defaultLocale.js"}],"../node_modules/d3-time-format/src/isoParse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isoFormat = require("./isoFormat");

var _defaultLocale = require("./defaultLocale");

function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}

var parseIso = +new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : (0, _defaultLocale.utcParse)(_isoFormat.isoSpecifier);
var _default = parseIso;
exports.default = _default;
},{"./isoFormat":"../node_modules/d3-time-format/src/isoFormat.js","./defaultLocale":"../node_modules/d3-time-format/src/defaultLocale.js"}],"../node_modules/d3-time-format/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "timeFormatDefaultLocale", {
  enumerable: true,
  get: function () {
    return _defaultLocale.default;
  }
});
Object.defineProperty(exports, "timeFormat", {
  enumerable: true,
  get: function () {
    return _defaultLocale.timeFormat;
  }
});
Object.defineProperty(exports, "timeParse", {
  enumerable: true,
  get: function () {
    return _defaultLocale.timeParse;
  }
});
Object.defineProperty(exports, "utcFormat", {
  enumerable: true,
  get: function () {
    return _defaultLocale.utcFormat;
  }
});
Object.defineProperty(exports, "utcParse", {
  enumerable: true,
  get: function () {
    return _defaultLocale.utcParse;
  }
});
Object.defineProperty(exports, "timeFormatLocale", {
  enumerable: true,
  get: function () {
    return _locale.default;
  }
});
Object.defineProperty(exports, "isoFormat", {
  enumerable: true,
  get: function () {
    return _isoFormat.default;
  }
});
Object.defineProperty(exports, "isoParse", {
  enumerable: true,
  get: function () {
    return _isoParse.default;
  }
});

var _defaultLocale = _interopRequireWildcard(require("./defaultLocale"));

var _locale = _interopRequireDefault(require("./locale"));

var _isoFormat = _interopRequireDefault(require("./isoFormat"));

var _isoParse = _interopRequireDefault(require("./isoParse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }
},{"./defaultLocale":"../node_modules/d3-time-format/src/defaultLocale.js","./locale":"../node_modules/d3-time-format/src/locale.js","./isoFormat":"../node_modules/d3-time-format/src/isoFormat.js","./isoParse":"../node_modules/d3-time-format/src/isoParse.js"}],"../node_modules/d3-scale/src/time.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calendar = calendar;
exports.default = _default;

var _d3Array = require("d3-array");

var _d3Time = require("d3-time");

var _d3TimeFormat = require("d3-time-format");

var _continuous = _interopRequireWildcard(require("./continuous"));

var _init = require("./init");

var _nice = _interopRequireDefault(require("./nice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var durationSecond = 1000,
    durationMinute = durationSecond * 60,
    durationHour = durationMinute * 60,
    durationDay = durationHour * 24,
    durationWeek = durationDay * 7,
    durationMonth = durationDay * 30,
    durationYear = durationDay * 365;

function date(t) {
  return new Date(t);
}

function number(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function calendar(year, month, week, day, hour, minute, second, millisecond, format) {
  var scale = (0, _continuous.default)(_continuous.identity, _continuous.identity),
      invert = scale.invert,
      domain = scale.domain;
  var formatMillisecond = format(".%L"),
      formatSecond = format(":%S"),
      formatMinute = format("%I:%M"),
      formatHour = format("%I %p"),
      formatDay = format("%a %d"),
      formatWeek = format("%b %d"),
      formatMonth = format("%B"),
      formatYear = format("%Y");
  var tickIntervals = [[second, 1, durationSecond], [second, 5, 5 * durationSecond], [second, 15, 15 * durationSecond], [second, 30, 30 * durationSecond], [minute, 1, durationMinute], [minute, 5, 5 * durationMinute], [minute, 15, 15 * durationMinute], [minute, 30, 30 * durationMinute], [hour, 1, durationHour], [hour, 3, 3 * durationHour], [hour, 6, 6 * durationHour], [hour, 12, 12 * durationHour], [day, 1, durationDay], [day, 2, 2 * durationDay], [week, 1, durationWeek], [month, 1, durationMonth], [month, 3, 3 * durationMonth], [year, 1, durationYear]];

  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond : minute(date) < date ? formatSecond : hour(date) < date ? formatMinute : day(date) < date ? formatHour : month(date) < date ? week(date) < date ? formatDay : formatWeek : year(date) < date ? formatMonth : formatYear)(date);
  }

  function tickInterval(interval, start, stop) {
    if (interval == null) interval = 10; // If a desired tick count is specified, pick a reasonable tick interval
    // based on the extent of the domain and a rough estimate of tick size.
    // Otherwise, assume interval is already a time interval and use it.

    if (typeof interval === "number") {
      var target = Math.abs(stop - start) / interval,
          i = (0, _d3Array.bisector)(function (i) {
        return i[2];
      }).right(tickIntervals, target),
          step;

      if (i === tickIntervals.length) {
        step = (0, _d3Array.tickStep)(start / durationYear, stop / durationYear, interval);
        interval = year;
      } else if (i) {
        i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
        step = i[1];
        interval = i[0];
      } else {
        step = Math.max((0, _d3Array.tickStep)(start, stop, interval), 1);
        interval = millisecond;
      }

      return interval.every(step);
    }

    return interval;
  }

  scale.invert = function (y) {
    return new Date(invert(y));
  };

  scale.domain = function (_) {
    return arguments.length ? domain(Array.from(_, number)) : domain().map(date);
  };

  scale.ticks = function (interval) {
    var d = domain(),
        t0 = d[0],
        t1 = d[d.length - 1],
        r = t1 < t0,
        t;
    if (r) t = t0, t0 = t1, t1 = t;
    t = tickInterval(interval, t0, t1);
    t = t ? t.range(t0, t1 + 1) : []; // inclusive stop

    return r ? t.reverse() : t;
  };

  scale.tickFormat = function (count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };

  scale.nice = function (interval) {
    var d = domain();
    return (interval = tickInterval(interval, d[0], d[d.length - 1])) ? domain((0, _nice.default)(d, interval)) : scale;
  };

  scale.copy = function () {
    return (0, _continuous.copy)(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format));
  };

  return scale;
}

function _default() {
  return _init.initRange.apply(calendar(_d3Time.timeYear, _d3Time.timeMonth, _d3Time.timeWeek, _d3Time.timeDay, _d3Time.timeHour, _d3Time.timeMinute, _d3Time.timeSecond, _d3Time.timeMillisecond, _d3TimeFormat.timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
}
},{"d3-array":"../node_modules/d3-array/src/index.js","d3-time":"../node_modules/d3-time/src/index.js","d3-time-format":"../node_modules/d3-time-format/src/index.js","./continuous":"../node_modules/d3-scale/src/continuous.js","./init":"../node_modules/d3-scale/src/init.js","./nice":"../node_modules/d3-scale/src/nice.js"}],"../node_modules/d3-scale/src/utcTime.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _time = require("./time");

var _d3TimeFormat = require("d3-time-format");

var _d3Time = require("d3-time");

var _init = require("./init");

function _default() {
  return _init.initRange.apply((0, _time.calendar)(_d3Time.utcYear, _d3Time.utcMonth, _d3Time.utcWeek, _d3Time.utcDay, _d3Time.utcHour, _d3Time.utcMinute, _d3Time.utcSecond, _d3Time.utcMillisecond, _d3TimeFormat.utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]), arguments);
}
},{"./time":"../node_modules/d3-scale/src/time.js","d3-time-format":"../node_modules/d3-time-format/src/index.js","d3-time":"../node_modules/d3-time/src/index.js","./init":"../node_modules/d3-scale/src/init.js"}],"../node_modules/d3-scale/src/sequential.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = copy;
exports.default = sequential;
exports.sequentialLog = sequentialLog;
exports.sequentialSymlog = sequentialSymlog;
exports.sequentialPow = sequentialPow;
exports.sequentialSqrt = sequentialSqrt;

var _continuous = require("./continuous");

var _init = require("./init");

var _linear = require("./linear");

var _log = require("./log");

var _symlog = require("./symlog");

var _pow = require("./pow");

function transformer() {
  var x0 = 0,
      x1 = 1,
      t0,
      t1,
      k10,
      transform,
      interpolator = _continuous.identity,
      clamp = false,
      unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? 0.5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function (_) {
    return arguments.length ? ([x0, x1] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [x0, x1];
  };

  scale.clamp = function (_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function (_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function (t) {
    transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
    return scale;
  };
}

function copy(source, target) {
  return target.domain(source.domain()).interpolator(source.interpolator()).clamp(source.clamp()).unknown(source.unknown());
}

function sequential() {
  var scale = (0, _linear.linearish)(transformer()(_continuous.identity));

  scale.copy = function () {
    return copy(scale, sequential());
  };

  return _init.initInterpolator.apply(scale, arguments);
}

function sequentialLog() {
  var scale = (0, _log.loggish)(transformer()).domain([1, 10]);

  scale.copy = function () {
    return copy(scale, sequentialLog()).base(scale.base());
  };

  return _init.initInterpolator.apply(scale, arguments);
}

function sequentialSymlog() {
  var scale = (0, _symlog.symlogish)(transformer());

  scale.copy = function () {
    return copy(scale, sequentialSymlog()).constant(scale.constant());
  };

  return _init.initInterpolator.apply(scale, arguments);
}

function sequentialPow() {
  var scale = (0, _pow.powish)(transformer());

  scale.copy = function () {
    return copy(scale, sequentialPow()).exponent(scale.exponent());
  };

  return _init.initInterpolator.apply(scale, arguments);
}

function sequentialSqrt() {
  return sequentialPow.apply(null, arguments).exponent(0.5);
}
},{"./continuous":"../node_modules/d3-scale/src/continuous.js","./init":"../node_modules/d3-scale/src/init.js","./linear":"../node_modules/d3-scale/src/linear.js","./log":"../node_modules/d3-scale/src/log.js","./symlog":"../node_modules/d3-scale/src/symlog.js","./pow":"../node_modules/d3-scale/src/pow.js"}],"../node_modules/d3-scale/src/sequentialQuantile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sequentialQuantile;

var _d3Array = require("d3-array");

var _continuous = require("./continuous");

var _init = require("./init");

function sequentialQuantile() {
  var domain = [],
      interpolator = _continuous.identity;

  function scale(x) {
    if (!isNaN(x = +x)) return interpolator(((0, _d3Array.bisect)(domain, x) - 1) / (domain.length - 1));
  }

  scale.domain = function (_) {
    if (!arguments.length) return domain.slice();
    domain = [];

    for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);

    domain.sort(_d3Array.ascending);
    return scale;
  };

  scale.interpolator = function (_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.copy = function () {
    return sequentialQuantile(interpolator).domain(domain);
  };

  return _init.initInterpolator.apply(scale, arguments);
}
},{"d3-array":"../node_modules/d3-array/src/index.js","./continuous":"../node_modules/d3-scale/src/continuous.js","./init":"../node_modules/d3-scale/src/init.js"}],"../node_modules/d3-scale/src/diverging.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = diverging;
exports.divergingLog = divergingLog;
exports.divergingSymlog = divergingSymlog;
exports.divergingPow = divergingPow;
exports.divergingSqrt = divergingSqrt;

var _continuous = require("./continuous");

var _init = require("./init");

var _linear = require("./linear");

var _log = require("./log");

var _sequential = require("./sequential");

var _symlog = require("./symlog");

var _pow = require("./pow");

function transformer() {
  var x0 = 0,
      x1 = 0.5,
      x2 = 1,
      t0,
      t1,
      t2,
      k10,
      k21,
      interpolator = _continuous.identity,
      transform,
      clamp = false,
      unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : (x = 0.5 + ((x = +transform(x)) - t1) * (x < t1 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function (_) {
    return arguments.length ? ([x0, x1, x2] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), t2 = transform(x2 = +x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), scale) : [x0, x1, x2];
  };

  scale.clamp = function (_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function (_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.unknown = function (_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function (t) {
    transform = t, t0 = t(x0), t1 = t(x1), t2 = t(x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1);
    return scale;
  };
}

function diverging() {
  var scale = (0, _linear.linearish)(transformer()(_continuous.identity));

  scale.copy = function () {
    return (0, _sequential.copy)(scale, diverging());
  };

  return _init.initInterpolator.apply(scale, arguments);
}

function divergingLog() {
  var scale = (0, _log.loggish)(transformer()).domain([0.1, 1, 10]);

  scale.copy = function () {
    return (0, _sequential.copy)(scale, divergingLog()).base(scale.base());
  };

  return _init.initInterpolator.apply(scale, arguments);
}

function divergingSymlog() {
  var scale = (0, _symlog.symlogish)(transformer());

  scale.copy = function () {
    return (0, _sequential.copy)(scale, divergingSymlog()).constant(scale.constant());
  };

  return _init.initInterpolator.apply(scale, arguments);
}

function divergingPow() {
  var scale = (0, _pow.powish)(transformer());

  scale.copy = function () {
    return (0, _sequential.copy)(scale, divergingPow()).exponent(scale.exponent());
  };

  return _init.initInterpolator.apply(scale, arguments);
}

function divergingSqrt() {
  return divergingPow.apply(null, arguments).exponent(0.5);
}
},{"./continuous":"../node_modules/d3-scale/src/continuous.js","./init":"../node_modules/d3-scale/src/init.js","./linear":"../node_modules/d3-scale/src/linear.js","./log":"../node_modules/d3-scale/src/log.js","./sequential":"../node_modules/d3-scale/src/sequential.js","./symlog":"../node_modules/d3-scale/src/symlog.js","./pow":"../node_modules/d3-scale/src/pow.js"}],"../node_modules/d3-scale/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "scaleBand", {
  enumerable: true,
  get: function () {
    return _band.default;
  }
});
Object.defineProperty(exports, "scalePoint", {
  enumerable: true,
  get: function () {
    return _band.point;
  }
});
Object.defineProperty(exports, "scaleIdentity", {
  enumerable: true,
  get: function () {
    return _identity.default;
  }
});
Object.defineProperty(exports, "scaleLinear", {
  enumerable: true,
  get: function () {
    return _linear.default;
  }
});
Object.defineProperty(exports, "scaleLog", {
  enumerable: true,
  get: function () {
    return _log.default;
  }
});
Object.defineProperty(exports, "scaleSymlog", {
  enumerable: true,
  get: function () {
    return _symlog.default;
  }
});
Object.defineProperty(exports, "scaleOrdinal", {
  enumerable: true,
  get: function () {
    return _ordinal.default;
  }
});
Object.defineProperty(exports, "scaleImplicit", {
  enumerable: true,
  get: function () {
    return _ordinal.implicit;
  }
});
Object.defineProperty(exports, "scalePow", {
  enumerable: true,
  get: function () {
    return _pow.default;
  }
});
Object.defineProperty(exports, "scaleSqrt", {
  enumerable: true,
  get: function () {
    return _pow.sqrt;
  }
});
Object.defineProperty(exports, "scaleQuantile", {
  enumerable: true,
  get: function () {
    return _quantile.default;
  }
});
Object.defineProperty(exports, "scaleQuantize", {
  enumerable: true,
  get: function () {
    return _quantize.default;
  }
});
Object.defineProperty(exports, "scaleThreshold", {
  enumerable: true,
  get: function () {
    return _threshold.default;
  }
});
Object.defineProperty(exports, "scaleTime", {
  enumerable: true,
  get: function () {
    return _time.default;
  }
});
Object.defineProperty(exports, "scaleUtc", {
  enumerable: true,
  get: function () {
    return _utcTime.default;
  }
});
Object.defineProperty(exports, "scaleSequential", {
  enumerable: true,
  get: function () {
    return _sequential.default;
  }
});
Object.defineProperty(exports, "scaleSequentialLog", {
  enumerable: true,
  get: function () {
    return _sequential.sequentialLog;
  }
});
Object.defineProperty(exports, "scaleSequentialPow", {
  enumerable: true,
  get: function () {
    return _sequential.sequentialPow;
  }
});
Object.defineProperty(exports, "scaleSequentialSqrt", {
  enumerable: true,
  get: function () {
    return _sequential.sequentialSqrt;
  }
});
Object.defineProperty(exports, "scaleSequentialSymlog", {
  enumerable: true,
  get: function () {
    return _sequential.sequentialSymlog;
  }
});
Object.defineProperty(exports, "scaleSequentialQuantile", {
  enumerable: true,
  get: function () {
    return _sequentialQuantile.default;
  }
});
Object.defineProperty(exports, "scaleDiverging", {
  enumerable: true,
  get: function () {
    return _diverging.default;
  }
});
Object.defineProperty(exports, "scaleDivergingLog", {
  enumerable: true,
  get: function () {
    return _diverging.divergingLog;
  }
});
Object.defineProperty(exports, "scaleDivergingPow", {
  enumerable: true,
  get: function () {
    return _diverging.divergingPow;
  }
});
Object.defineProperty(exports, "scaleDivergingSqrt", {
  enumerable: true,
  get: function () {
    return _diverging.divergingSqrt;
  }
});
Object.defineProperty(exports, "scaleDivergingSymlog", {
  enumerable: true,
  get: function () {
    return _diverging.divergingSymlog;
  }
});
Object.defineProperty(exports, "tickFormat", {
  enumerable: true,
  get: function () {
    return _tickFormat.default;
  }
});

var _band = _interopRequireWildcard(require("./band"));

var _identity = _interopRequireDefault(require("./identity"));

var _linear = _interopRequireDefault(require("./linear"));

var _log = _interopRequireDefault(require("./log"));

var _symlog = _interopRequireDefault(require("./symlog"));

var _ordinal = _interopRequireWildcard(require("./ordinal"));

var _pow = _interopRequireWildcard(require("./pow"));

var _quantile = _interopRequireDefault(require("./quantile"));

var _quantize = _interopRequireDefault(require("./quantize"));

var _threshold = _interopRequireDefault(require("./threshold"));

var _time = _interopRequireDefault(require("./time"));

var _utcTime = _interopRequireDefault(require("./utcTime"));

var _sequential = _interopRequireWildcard(require("./sequential"));

var _sequentialQuantile = _interopRequireDefault(require("./sequentialQuantile"));

var _diverging = _interopRequireWildcard(require("./diverging"));

var _tickFormat = _interopRequireDefault(require("./tickFormat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }
},{"./band":"../node_modules/d3-scale/src/band.js","./identity":"../node_modules/d3-scale/src/identity.js","./linear":"../node_modules/d3-scale/src/linear.js","./log":"../node_modules/d3-scale/src/log.js","./symlog":"../node_modules/d3-scale/src/symlog.js","./ordinal":"../node_modules/d3-scale/src/ordinal.js","./pow":"../node_modules/d3-scale/src/pow.js","./quantile":"../node_modules/d3-scale/src/quantile.js","./quantize":"../node_modules/d3-scale/src/quantize.js","./threshold":"../node_modules/d3-scale/src/threshold.js","./time":"../node_modules/d3-scale/src/time.js","./utcTime":"../node_modules/d3-scale/src/utcTime.js","./sequential":"../node_modules/d3-scale/src/sequential.js","./sequentialQuantile":"../node_modules/d3-scale/src/sequentialQuantile.js","./diverging":"../node_modules/d3-scale/src/diverging.js","./tickFormat":"../node_modules/d3-scale/src/tickFormat.js"}],"../node_modules/d3-selection/src/namespaces.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.xhtml = void 0;
var xhtml = "http://www.w3.org/1999/xhtml";
exports.xhtml = xhtml;
var _default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
exports.default = _default;
},{}],"../node_modules/d3-selection/src/namespace.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _namespaces = _interopRequireDefault(require("./namespaces"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(name) {
  var prefix = name += "",
      i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return _namespaces.default.hasOwnProperty(prefix) ? {
    space: _namespaces.default[prefix],
    local: name
  } : name;
}
},{"./namespaces":"../node_modules/d3-selection/src/namespaces.js"}],"../node_modules/d3-selection/src/creator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _namespace = _interopRequireDefault(require("./namespace"));

var _namespaces = require("./namespaces");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function creatorInherit(name) {
  return function () {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === _namespaces.xhtml && document.documentElement.namespaceURI === _namespaces.xhtml ? document.createElement(name) : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function () {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

function _default(name) {
  var fullname = (0, _namespace.default)(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
},{"./namespace":"../node_modules/d3-selection/src/namespace.js","./namespaces":"../node_modules/d3-selection/src/namespaces.js"}],"../node_modules/d3-selection/src/selector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function none() {}

function _default(selector) {
  return selector == null ? none : function () {
    return this.querySelector(selector);
  };
}
},{}],"../node_modules/d3-selection/src/selection/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

var _selector = _interopRequireDefault(require("../selector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(select) {
  if (typeof select !== "function") select = (0, _selector.default)(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new _index.Selection(subgroups, this._parents);
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js","../selector":"../node_modules/d3-selection/src/selector.js"}],"../node_modules/d3-selection/src/selectorAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function empty() {
  return [];
}

function _default(selector) {
  return selector == null ? empty : function () {
    return this.querySelectorAll(selector);
  };
}
},{}],"../node_modules/d3-selection/src/selection/selectAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

var _selectorAll = _interopRequireDefault(require("../selectorAll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(select) {
  if (typeof select !== "function") select = (0, _selectorAll.default)(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new _index.Selection(subgroups, parents);
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js","../selectorAll":"../node_modules/d3-selection/src/selectorAll.js"}],"../node_modules/d3-selection/src/matcher.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(selector) {
  return function () {
    return this.matches(selector);
  };
}
},{}],"../node_modules/d3-selection/src/selection/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

var _matcher = _interopRequireDefault(require("../matcher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(match) {
  if (typeof match !== "function") match = (0, _matcher.default)(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new _index.Selection(subgroups, this._parents);
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js","../matcher":"../node_modules/d3-selection/src/matcher.js"}],"../node_modules/d3-selection/src/selection/sparse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(update) {
  return new Array(update.length);
}
},{}],"../node_modules/d3-selection/src/selection/enter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.EnterNode = EnterNode;

var _sparse = _interopRequireDefault(require("./sparse"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  return new _index.Selection(this._enter || this._groups.map(_sparse.default), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function (child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function (child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function (selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function (selector) {
    return this._parent.querySelectorAll(selector);
  }
};
},{"./sparse":"../node_modules/d3-selection/src/selection/sparse.js","./index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(x) {
  return function () {
    return x;
  };
}
},{}],"../node_modules/d3-selection/src/selection/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

var _enter = require("./enter");

var _constant = _interopRequireDefault(require("../constant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyPrefix = "$"; // Protect against keys like “__proto__”.

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length; // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.

  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new _enter.EnterNode(parent, data[i]);
    }
  } // Put any non-null nodes that don’t fit into exit.


  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = {},
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue; // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.

  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);

      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  } // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.


  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);

    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new _enter.EnterNode(parent, data[i]);
    }
  } // Add any remaining nodes that were not bound to data to exit.


  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue[keyValues[i]] === node) {
      exit[i] = node;
    }
  }
}

function _default(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function (d) {
      data[++j] = d;
    });
    return data;
  }

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;
  if (typeof value !== "function") value = (0, _constant.default)(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = value.call(parent, parent && parent.__data__, j, parents),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key); // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.

    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;

        while (!(next = updateGroup[i1]) && ++i1 < dataLength);

        previous._next = next || null;
      }
    }
  }

  update = new _index.Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js","./enter":"../node_modules/d3-selection/src/selection/enter.js","../constant":"../node_modules/d3-selection/src/constant.js"}],"../node_modules/d3-selection/src/selection/exit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _sparse = _interopRequireDefault(require("./sparse"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  return new _index.Selection(this._exit || this._groups.map(_sparse.default), this._parents);
}
},{"./sparse":"../node_modules/d3-selection/src/selection/sparse.js","./index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/selection/join.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(onenter, onupdate, onexit) {
  var enter = this.enter(),
      update = this,
      exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null) update = onupdate(update);
  if (onexit == null) exit.remove();else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
},{}],"../node_modules/d3-selection/src/selection/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

function _default(selection) {
  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new _index.Selection(merges, this._parents);
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/selection/order.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}
},{}],"../node_modules/d3-selection/src/selection/sort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./index");

function _default(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }

    sortgroup.sort(compareNode);
  }

  return new _index.Selection(sortgroups, this._parents).order();
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/selection/call.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
},{}],"../node_modules/d3-selection/src/selection/nodes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  var nodes = new Array(this.size()),
      i = -1;
  this.each(function () {
    nodes[++i] = this;
  });
  return nodes;
}
},{}],"../node_modules/d3-selection/src/selection/node.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}
},{}],"../node_modules/d3-selection/src/selection/size.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  var size = 0;
  this.each(function () {
    ++size;
  });
  return size;
}
},{}],"../node_modules/d3-selection/src/selection/empty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  return !this.node();
}
},{}],"../node_modules/d3-selection/src/selection/each.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}
},{}],"../node_modules/d3-selection/src/selection/attr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _namespace = _interopRequireDefault(require("../namespace"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function attrRemove(name) {
  return function () {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function () {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function () {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function () {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

function _default(name, value) {
  var fullname = (0, _namespace.default)(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }

  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}
},{"../namespace":"../node_modules/d3-selection/src/namespace.js"}],"../node_modules/d3-selection/src/window.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || // node is a Node
  node.document && node // node is a Window
  || node.defaultView; // node is a Document
}
},{}],"../node_modules/d3-selection/src/selection/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.styleValue = styleValue;

var _window = _interopRequireDefault(require("../window"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function styleRemove(name) {
  return function () {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function () {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);else this.style.setProperty(name, v, priority);
  };
}

function _default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name) || (0, _window.default)(node).getComputedStyle(node, null).getPropertyValue(name);
}
},{"../window":"../node_modules/d3-selection/src/window.js"}],"../node_modules/d3-selection/src/selection/property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function propertyRemove(name) {
  return function () {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function () {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];else this[name] = v;
  };
}

function _default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
},{}],"../node_modules/d3-selection/src/selection/classed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function (name) {
    var i = this._names.indexOf(name);

    if (i < 0) {
      this._names.push(name);

      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function (name) {
    var i = this._names.indexOf(name);

    if (i >= 0) {
      this._names.splice(i, 1);

      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function (name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node),
      i = -1,
      n = names.length;

  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node),
      i = -1,
      n = names.length;

  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function () {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function () {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function () {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

function _default(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()),
        i = -1,
        n = names.length;

    while (++i < n) if (!list.contains(names[i])) return false;

    return true;
  }

  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
},{}],"../node_modules/d3-selection/src/selection/text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function () {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

function _default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}
},{}],"../node_modules/d3-selection/src/selection/html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function () {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

function _default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
},{}],"../node_modules/d3-selection/src/selection/raise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

function _default() {
  return this.each(raise);
}
},{}],"../node_modules/d3-selection/src/selection/lower.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

function _default() {
  return this.each(lower);
}
},{}],"../node_modules/d3-selection/src/selection/append.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _creator = _interopRequireDefault(require("../creator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(name) {
  var create = typeof name === "function" ? name : (0, _creator.default)(name);
  return this.select(function () {
    return this.appendChild(create.apply(this, arguments));
  });
}
},{"../creator":"../node_modules/d3-selection/src/creator.js"}],"../node_modules/d3-selection/src/selection/insert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _creator = _interopRequireDefault(require("../creator"));

var _selector = _interopRequireDefault(require("../selector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function constantNull() {
  return null;
}

function _default(name, before) {
  var create = typeof name === "function" ? name : (0, _creator.default)(name),
      select = before == null ? constantNull : typeof before === "function" ? before : (0, _selector.default)(before);
  return this.select(function () {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}
},{"../creator":"../node_modules/d3-selection/src/creator.js","../selector":"../node_modules/d3-selection/src/selector.js"}],"../node_modules/d3-selection/src/selection/remove.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

function _default() {
  return this.each(remove);
}
},{}],"../node_modules/d3-selection/src/selection/clone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function selection_cloneShallow() {
  return this.parentNode.insertBefore(this.cloneNode(false), this.nextSibling);
}

function selection_cloneDeep() {
  return this.parentNode.insertBefore(this.cloneNode(true), this.nextSibling);
}

function _default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
},{}],"../node_modules/d3-selection/src/selection/datum.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
},{}],"../node_modules/d3-selection/src/selection/on.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.customEvent = customEvent;
exports.event = void 0;
var filterEvents = {};
var event = null;
exports.event = event;

if (typeof document !== "undefined") {
  var element = document.documentElement;

  if (!("onmouseenter" in element)) {
    filterEvents = {
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    };
  }
}

function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function (event) {
    var related = event.relatedTarget;

    if (!related || related !== this && !(related.compareDocumentPosition(this) & 8)) {
      listener.call(this, event);
    }
  };
}

function contextListener(listener, index, group) {
  return function (event1) {
    var event0 = event; // Events can be reentrant (e.g., focus).

    exports.event = event = event1;

    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      exports.event = event = event0;
    }
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function (t) {
    var name = "",
        i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {
      type: t,
      name: name
    };
  });
}

function onRemove(typename) {
  return function () {
    var on = this.__on;
    if (!on) return;

    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }

    if (++i) on.length = i;else delete this.__on;
  };
}

function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function (d, i, group) {
    var on = this.__on,
        o,
        listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = {
      type: typename.type,
      name: typename.name,
      value: value,
      listener: listener,
      capture: capture
    };
    if (!on) this.__on = [o];else on.push(o);
  };
}

function _default(typename, value, capture) {
  var typenames = parseTypenames(typename + ""),
      i,
      n = typenames.length,
      t;

  if (arguments.length < 2) {
    var on = this.node().__on;

    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  if (capture == null) capture = false;

  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));

  return this;
}

function customEvent(event1, listener, that, args) {
  var event0 = event;
  event1.sourceEvent = event;
  exports.event = event = event1;

  try {
    return listener.apply(that, args);
  } finally {
    exports.event = event = event0;
  }
}
},{}],"../node_modules/d3-selection/src/selection/dispatch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _window = _interopRequireDefault(require("../window"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dispatchEvent(node, type, params) {
  var window = (0, _window.default)(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function () {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function () {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

function _default(type, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}
},{"../window":"../node_modules/d3-selection/src/window.js"}],"../node_modules/d3-selection/src/selection/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selection = Selection;
exports.default = exports.root = void 0;

var _select = _interopRequireDefault(require("./select"));

var _selectAll = _interopRequireDefault(require("./selectAll"));

var _filter = _interopRequireDefault(require("./filter"));

var _data = _interopRequireDefault(require("./data"));

var _enter = _interopRequireDefault(require("./enter"));

var _exit = _interopRequireDefault(require("./exit"));

var _join = _interopRequireDefault(require("./join"));

var _merge = _interopRequireDefault(require("./merge"));

var _order = _interopRequireDefault(require("./order"));

var _sort = _interopRequireDefault(require("./sort"));

var _call = _interopRequireDefault(require("./call"));

var _nodes = _interopRequireDefault(require("./nodes"));

var _node = _interopRequireDefault(require("./node"));

var _size = _interopRequireDefault(require("./size"));

var _empty = _interopRequireDefault(require("./empty"));

var _each = _interopRequireDefault(require("./each"));

var _attr = _interopRequireDefault(require("./attr"));

var _style = _interopRequireDefault(require("./style"));

var _property = _interopRequireDefault(require("./property"));

var _classed = _interopRequireDefault(require("./classed"));

var _text = _interopRequireDefault(require("./text"));

var _html = _interopRequireDefault(require("./html"));

var _raise = _interopRequireDefault(require("./raise"));

var _lower = _interopRequireDefault(require("./lower"));

var _append = _interopRequireDefault(require("./append"));

var _insert = _interopRequireDefault(require("./insert"));

var _remove = _interopRequireDefault(require("./remove"));

var _clone = _interopRequireDefault(require("./clone"));

var _datum = _interopRequireDefault(require("./datum"));

var _on = _interopRequireDefault(require("./on"));

var _dispatch = _interopRequireDefault(require("./dispatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = [null];
exports.root = root;

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: _select.default,
  selectAll: _selectAll.default,
  filter: _filter.default,
  data: _data.default,
  enter: _enter.default,
  exit: _exit.default,
  join: _join.default,
  merge: _merge.default,
  order: _order.default,
  sort: _sort.default,
  call: _call.default,
  nodes: _nodes.default,
  node: _node.default,
  size: _size.default,
  empty: _empty.default,
  each: _each.default,
  attr: _attr.default,
  style: _style.default,
  property: _property.default,
  classed: _classed.default,
  text: _text.default,
  html: _html.default,
  raise: _raise.default,
  lower: _lower.default,
  append: _append.default,
  insert: _insert.default,
  remove: _remove.default,
  clone: _clone.default,
  datum: _datum.default,
  on: _on.default,
  dispatch: _dispatch.default
};
var _default = selection;
exports.default = _default;
},{"./select":"../node_modules/d3-selection/src/selection/select.js","./selectAll":"../node_modules/d3-selection/src/selection/selectAll.js","./filter":"../node_modules/d3-selection/src/selection/filter.js","./data":"../node_modules/d3-selection/src/selection/data.js","./enter":"../node_modules/d3-selection/src/selection/enter.js","./exit":"../node_modules/d3-selection/src/selection/exit.js","./join":"../node_modules/d3-selection/src/selection/join.js","./merge":"../node_modules/d3-selection/src/selection/merge.js","./order":"../node_modules/d3-selection/src/selection/order.js","./sort":"../node_modules/d3-selection/src/selection/sort.js","./call":"../node_modules/d3-selection/src/selection/call.js","./nodes":"../node_modules/d3-selection/src/selection/nodes.js","./node":"../node_modules/d3-selection/src/selection/node.js","./size":"../node_modules/d3-selection/src/selection/size.js","./empty":"../node_modules/d3-selection/src/selection/empty.js","./each":"../node_modules/d3-selection/src/selection/each.js","./attr":"../node_modules/d3-selection/src/selection/attr.js","./style":"../node_modules/d3-selection/src/selection/style.js","./property":"../node_modules/d3-selection/src/selection/property.js","./classed":"../node_modules/d3-selection/src/selection/classed.js","./text":"../node_modules/d3-selection/src/selection/text.js","./html":"../node_modules/d3-selection/src/selection/html.js","./raise":"../node_modules/d3-selection/src/selection/raise.js","./lower":"../node_modules/d3-selection/src/selection/lower.js","./append":"../node_modules/d3-selection/src/selection/append.js","./insert":"../node_modules/d3-selection/src/selection/insert.js","./remove":"../node_modules/d3-selection/src/selection/remove.js","./clone":"../node_modules/d3-selection/src/selection/clone.js","./datum":"../node_modules/d3-selection/src/selection/datum.js","./on":"../node_modules/d3-selection/src/selection/on.js","./dispatch":"../node_modules/d3-selection/src/selection/dispatch.js"}],"../node_modules/d3-selection/src/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./selection/index");

function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([[document.querySelector(selector)]], [document.documentElement]) : new _index.Selection([[selector]], _index.root);
}
},{"./selection/index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/create.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _creator = _interopRequireDefault(require("./creator"));

var _select = _interopRequireDefault(require("./select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(name) {
  return (0, _select.default)((0, _creator.default)(name).call(document.documentElement));
}
},{"./creator":"../node_modules/d3-selection/src/creator.js","./select":"../node_modules/d3-selection/src/select.js"}],"../node_modules/d3-selection/src/local.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = local;
var nextId = 0;

function local() {
  return new Local();
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = local.prototype = {
  constructor: Local,
  get: function (node) {
    var id = this._;

    while (!(id in node)) if (!(node = node.parentNode)) return;

    return node[id];
  },
  set: function (node, value) {
    return node[this._] = value;
  },
  remove: function (node) {
    return this._ in node && delete node[this._];
  },
  toString: function () {
    return this._;
  }
};
},{}],"../node_modules/d3-selection/src/sourceEvent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _on = require("./selection/on");

function _default() {
  var current = _on.event,
      source;

  while (source = current.sourceEvent) current = source;

  return current;
}
},{"./selection/on":"../node_modules/d3-selection/src/selection/on.js"}],"../node_modules/d3-selection/src/point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(node, event) {
  var svg = node.ownerSVGElement || node;

  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    point.x = event.clientX, point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }

  var rect = node.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
}
},{}],"../node_modules/d3-selection/src/mouse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));

var _point = _interopRequireDefault(require("./point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(node) {
  var event = (0, _sourceEvent.default)();
  if (event.changedTouches) event = event.changedTouches[0];
  return (0, _point.default)(node, event);
}
},{"./sourceEvent":"../node_modules/d3-selection/src/sourceEvent.js","./point":"../node_modules/d3-selection/src/point.js"}],"../node_modules/d3-selection/src/selectAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _index = require("./selection/index");

function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([document.querySelectorAll(selector)], [document.documentElement]) : new _index.Selection([selector == null ? [] : selector], _index.root);
}
},{"./selection/index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/touch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));

var _point = _interopRequireDefault(require("./point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = (0, _sourceEvent.default)().changedTouches;

  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return (0, _point.default)(node, touch);
    }
  }

  return null;
}
},{"./sourceEvent":"../node_modules/d3-selection/src/sourceEvent.js","./point":"../node_modules/d3-selection/src/point.js"}],"../node_modules/d3-selection/src/touches.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));

var _point = _interopRequireDefault(require("./point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(node, touches) {
  if (touches == null) touches = (0, _sourceEvent.default)().touches;

  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = (0, _point.default)(node, touches[i]);
  }

  return points;
}
},{"./sourceEvent":"../node_modules/d3-selection/src/sourceEvent.js","./point":"../node_modules/d3-selection/src/point.js"}],"../node_modules/d3-selection/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "create", {
  enumerable: true,
  get: function () {
    return _create.default;
  }
});
Object.defineProperty(exports, "creator", {
  enumerable: true,
  get: function () {
    return _creator.default;
  }
});
Object.defineProperty(exports, "local", {
  enumerable: true,
  get: function () {
    return _local.default;
  }
});
Object.defineProperty(exports, "matcher", {
  enumerable: true,
  get: function () {
    return _matcher.default;
  }
});
Object.defineProperty(exports, "mouse", {
  enumerable: true,
  get: function () {
    return _mouse.default;
  }
});
Object.defineProperty(exports, "namespace", {
  enumerable: true,
  get: function () {
    return _namespace.default;
  }
});
Object.defineProperty(exports, "namespaces", {
  enumerable: true,
  get: function () {
    return _namespaces.default;
  }
});
Object.defineProperty(exports, "clientPoint", {
  enumerable: true,
  get: function () {
    return _point.default;
  }
});
Object.defineProperty(exports, "select", {
  enumerable: true,
  get: function () {
    return _select.default;
  }
});
Object.defineProperty(exports, "selectAll", {
  enumerable: true,
  get: function () {
    return _selectAll.default;
  }
});
Object.defineProperty(exports, "selection", {
  enumerable: true,
  get: function () {
    return _index.default;
  }
});
Object.defineProperty(exports, "selector", {
  enumerable: true,
  get: function () {
    return _selector.default;
  }
});
Object.defineProperty(exports, "selectorAll", {
  enumerable: true,
  get: function () {
    return _selectorAll.default;
  }
});
Object.defineProperty(exports, "style", {
  enumerable: true,
  get: function () {
    return _style.styleValue;
  }
});
Object.defineProperty(exports, "touch", {
  enumerable: true,
  get: function () {
    return _touch.default;
  }
});
Object.defineProperty(exports, "touches", {
  enumerable: true,
  get: function () {
    return _touches.default;
  }
});
Object.defineProperty(exports, "window", {
  enumerable: true,
  get: function () {
    return _window.default;
  }
});
Object.defineProperty(exports, "event", {
  enumerable: true,
  get: function () {
    return _on.event;
  }
});
Object.defineProperty(exports, "customEvent", {
  enumerable: true,
  get: function () {
    return _on.customEvent;
  }
});

var _create = _interopRequireDefault(require("./create"));

var _creator = _interopRequireDefault(require("./creator"));

var _local = _interopRequireDefault(require("./local"));

var _matcher = _interopRequireDefault(require("./matcher"));

var _mouse = _interopRequireDefault(require("./mouse"));

var _namespace = _interopRequireDefault(require("./namespace"));

var _namespaces = _interopRequireDefault(require("./namespaces"));

var _point = _interopRequireDefault(require("./point"));

var _select = _interopRequireDefault(require("./select"));

var _selectAll = _interopRequireDefault(require("./selectAll"));

var _index = _interopRequireDefault(require("./selection/index"));

var _selector = _interopRequireDefault(require("./selector"));

var _selectorAll = _interopRequireDefault(require("./selectorAll"));

var _style = require("./selection/style");

var _touch = _interopRequireDefault(require("./touch"));

var _touches = _interopRequireDefault(require("./touches"));

var _window = _interopRequireDefault(require("./window"));

var _on = require("./selection/on");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./create":"../node_modules/d3-selection/src/create.js","./creator":"../node_modules/d3-selection/src/creator.js","./local":"../node_modules/d3-selection/src/local.js","./matcher":"../node_modules/d3-selection/src/matcher.js","./mouse":"../node_modules/d3-selection/src/mouse.js","./namespace":"../node_modules/d3-selection/src/namespace.js","./namespaces":"../node_modules/d3-selection/src/namespaces.js","./point":"../node_modules/d3-selection/src/point.js","./select":"../node_modules/d3-selection/src/select.js","./selectAll":"../node_modules/d3-selection/src/selectAll.js","./selection/index":"../node_modules/d3-selection/src/selection/index.js","./selector":"../node_modules/d3-selection/src/selector.js","./selectorAll":"../node_modules/d3-selection/src/selectorAll.js","./selection/style":"../node_modules/d3-selection/src/selection/style.js","./touch":"../node_modules/d3-selection/src/touch.js","./touches":"../node_modules/d3-selection/src/touches.js","./window":"../node_modules/d3-selection/src/window.js","./selection/on":"../node_modules/d3-selection/src/selection/on.js"}],"../node_modules/roughjs/dist/rough.umd.js":[function(require,module,exports) {
var define;
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).rough=e()}(this,function(){"use strict";const t="undefined"!=typeof self;class e{constructor(t,e){this.defaultOptions={maxRandomnessOffset:2,roughness:1,bowing:1,stroke:"#000",strokeWidth:1,curveTightness:0,curveStepCount:9,fillStyle:"hachure",fillWeight:-1,hachureAngle:-41,hachureGap:-1,dashOffset:-1,dashGap:-1,zigzagOffset:-1},this.config=t||{},this.surface=e,this.config.options&&(this.defaultOptions=this._options(this.config.options))}_options(t){return t?Object.assign({},this.defaultOptions,t):this.defaultOptions}_drawable(t,e,s){return{shape:t,sets:e||[],options:s||this.defaultOptions}}getCanvasSize(){const t=t=>t&&"object"==typeof t&&t.baseVal&&t.baseVal.value?t.baseVal.value:t||100;return this.surface?[t(this.surface.width),t(this.surface.height)]:[100,100]}computePolygonSize(t){if(t.length){let e=t[0][0],s=t[0][0],i=t[0][1],h=t[0][1];for(let n=1;n<t.length;n++)e=Math.min(e,t[n][0]),s=Math.max(s,t[n][0]),i=Math.min(i,t[n][1]),h=Math.max(h,t[n][1]);return[s-e,h-i]}return[0,0]}polygonPath(t){let e="";if(t.length){e=`M${t[0][0]},${t[0][1]}`;for(let s=1;s<t.length;s++)e=`${e} L${t[s][0]},${t[s][1]}`}return e}computePathSize(e){let s=[0,0];if(t&&self.document)try{const t="http://www.w3.org/2000/svg",i=self.document.createElementNS(t,"svg");i.setAttribute("width","0"),i.setAttribute("height","0");const h=self.document.createElementNS(t,"path");h.setAttribute("d",e),i.appendChild(h),self.document.body.appendChild(i);const n=h.getBBox();n&&(s[0]=n.width||0,s[1]=n.height||0),self.document.body.removeChild(i)}catch(t){}const i=this.getCanvasSize();return s[0]*s[1]||(s=i),s}toPaths(t){const e=t.sets||[],s=t.options||this.defaultOptions,i=[];for(const t of e){let e=null;switch(t.type){case"path":e={d:this.opsToPath(t),stroke:s.stroke,strokeWidth:s.strokeWidth,fill:"none"};break;case"fillPath":e={d:this.opsToPath(t),stroke:"none",strokeWidth:0,fill:s.fill||"none"};break;case"fillSketch":e=this.fillSketch(t,s);break;case"path2Dfill":e={d:t.path||"",stroke:"none",strokeWidth:0,fill:s.fill||"none"};break;case"path2Dpattern":{const i=t.size,h={x:0,y:0,width:1,height:1,viewBox:`0 0 ${Math.round(i[0])} ${Math.round(i[1])}`,patternUnits:"objectBoundingBox",path:this.fillSketch(t,s)};e={d:t.path,stroke:"none",strokeWidth:0,pattern:h};break}}e&&i.push(e)}return i}fillSketch(t,e){let s=e.fillWeight;return s<0&&(s=e.strokeWidth/2),{d:this.opsToPath(t),stroke:e.fill||"none",strokeWidth:s,fill:"none"}}opsToPath(t){let e="";for(const s of t.ops){const t=s.data;switch(s.op){case"move":e+=`M${t[0]} ${t[1]} `;break;case"bcurveTo":e+=`C${t[0]} ${t[1]}, ${t[2]} ${t[3]}, ${t[4]} ${t[5]} `;break;case"qcurveTo":e+=`Q${t[0]} ${t[1]}, ${t[2]} ${t[3]} `;break;case"lineTo":e+=`L${t[0]} ${t[1]} `}}return e.trim()}}function s(t,e){return t.type===e}const i={A:7,a:7,C:6,c:6,H:1,h:1,L:2,l:2,M:2,m:2,Q:4,q:4,S:4,s:4,T:4,t:2,V:1,v:1,Z:0,z:0};class h{constructor(t){this.COMMAND=0,this.NUMBER=1,this.EOD=2,this.segments=[],this.parseData(t),this.processPoints()}tokenize(t){const e=new Array;for(;""!==t;)if(t.match(/^([ \t\r\n,]+)/))t=t.substr(RegExp.$1.length);else if(t.match(/^([aAcChHlLmMqQsStTvVzZ])/))e[e.length]={type:this.COMMAND,text:RegExp.$1},t=t.substr(RegExp.$1.length);else{if(!t.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/))return console.error("Unrecognized segment command: "+t),[];e[e.length]={type:this.NUMBER,text:`${parseFloat(RegExp.$1)}`},t=t.substr(RegExp.$1.length)}return e[e.length]={type:this.EOD,text:""},e}parseData(t){const e=this.tokenize(t);let h=0,n=e[h],a="BOD";for(this.segments=new Array;!s(n,this.EOD);){let o;const r=new Array;if("BOD"===a){if("M"!==n.text&&"m"!==n.text)return void this.parseData("M0,0"+t);h++,o=i[n.text],a=n.text}else s(n,this.NUMBER)?o=i[a]:(h++,o=i[n.text],a=n.text);if(h+o<e.length){for(let t=h;t<h+o;t++){const i=e[t];if(!s(i,this.NUMBER))return void console.error("Parameter type is not a number: "+a+","+i.text);r[r.length]=+i.text}if("number"!=typeof i[a])return void console.error("Unsupported segment type: "+a);{const t={key:a,data:r};this.segments.push(t),n=e[h+=o],"M"===a&&(a="L"),"m"===a&&(a="l")}}else console.error("Path data ended before all parameters were found")}}get closed(){if(void 0===this._closed){this._closed=!1;for(const t of this.segments)"z"===t.key.toLowerCase()&&(this._closed=!0)}return this._closed}processPoints(){let t=null,e=[0,0];for(let s=0;s<this.segments.length;s++){const i=this.segments[s];switch(i.key){case"M":case"L":case"T":i.point=[i.data[0],i.data[1]];break;case"m":case"l":case"t":i.point=[i.data[0]+e[0],i.data[1]+e[1]];break;case"H":i.point=[i.data[0],e[1]];break;case"h":i.point=[i.data[0]+e[0],e[1]];break;case"V":i.point=[e[0],i.data[0]];break;case"v":i.point=[e[0],i.data[0]+e[1]];break;case"z":case"Z":t&&(i.point=[t[0],t[1]]);break;case"C":i.point=[i.data[4],i.data[5]];break;case"c":i.point=[i.data[4]+e[0],i.data[5]+e[1]];break;case"S":i.point=[i.data[2],i.data[3]];break;case"s":i.point=[i.data[2]+e[0],i.data[3]+e[1]];break;case"Q":i.point=[i.data[2],i.data[3]];break;case"q":i.point=[i.data[2]+e[0],i.data[3]+e[1]];break;case"A":i.point=[i.data[5],i.data[6]];break;case"a":i.point=[i.data[5]+e[0],i.data[6]+e[1]]}"m"!==i.key&&"M"!==i.key||(t=null),i.point&&(e=i.point,t||(t=i.point)),"z"!==i.key&&"Z"!==i.key||(t=null)}}}class n{constructor(t){this._position=[0,0],this._first=null,this.bezierReflectionPoint=null,this.quadReflectionPoint=null,this.parsed=new h(t)}get segments(){return this.parsed.segments}get closed(){return this.parsed.closed}get linearPoints(){if(!this._linearPoints){const t=[];let e=[];for(const s of this.parsed.segments){const i=s.key.toLowerCase();("m"!==i&&"z"!==i||(e.length&&(t.push(e),e=[]),"z"!==i))&&(s.point&&e.push(s.point))}e.length&&(t.push(e),e=[]),this._linearPoints=t}return this._linearPoints}get first(){return this._first}set first(t){this._first=t}setPosition(t,e){this._position=[t,e],this._first||(this._first=[t,e])}get position(){return this._position}get x(){return this._position[0]}get y(){return this._position[1]}}class a{constructor(t,e,s,i,h,n){if(this._segIndex=0,this._numSegs=0,this._rx=0,this._ry=0,this._sinPhi=0,this._cosPhi=0,this._C=[0,0],this._theta=0,this._delta=0,this._T=0,this._from=t,t[0]===e[0]&&t[1]===e[1])return;const a=Math.PI/180;this._rx=Math.abs(s[0]),this._ry=Math.abs(s[1]),this._sinPhi=Math.sin(i*a),this._cosPhi=Math.cos(i*a);const o=this._cosPhi*(t[0]-e[0])/2+this._sinPhi*(t[1]-e[1])/2,r=-this._sinPhi*(t[0]-e[0])/2+this._cosPhi*(t[1]-e[1])/2;let l=0;const c=this._rx*this._rx*this._ry*this._ry-this._rx*this._rx*r*r-this._ry*this._ry*o*o;if(c<0){const t=Math.sqrt(1-c/(this._rx*this._rx*this._ry*this._ry));this._rx=this._rx*t,this._ry=this._ry*t,l=0}else l=(h===n?-1:1)*Math.sqrt(c/(this._rx*this._rx*r*r+this._ry*this._ry*o*o));const p=l*this._rx*r/this._ry,u=-l*this._ry*o/this._rx;this._C=[0,0],this._C[0]=this._cosPhi*p-this._sinPhi*u+(t[0]+e[0])/2,this._C[1]=this._sinPhi*p+this._cosPhi*u+(t[1]+e[1])/2,this._theta=this.calculateVectorAngle(1,0,(o-p)/this._rx,(r-u)/this._ry);let f=this.calculateVectorAngle((o-p)/this._rx,(r-u)/this._ry,(-o-p)/this._rx,(-r-u)/this._ry);!n&&f>0?f-=2*Math.PI:n&&f<0&&(f+=2*Math.PI),this._numSegs=Math.ceil(Math.abs(f/(Math.PI/2))),this._delta=f/this._numSegs,this._T=8/3*Math.sin(this._delta/4)*Math.sin(this._delta/4)/Math.sin(this._delta/2)}getNextSegment(){if(this._segIndex===this._numSegs)return null;const t=Math.cos(this._theta),e=Math.sin(this._theta),s=this._theta+this._delta,i=Math.cos(s),h=Math.sin(s),n=[this._cosPhi*this._rx*i-this._sinPhi*this._ry*h+this._C[0],this._sinPhi*this._rx*i+this._cosPhi*this._ry*h+this._C[1]],a=[this._from[0]+this._T*(-this._cosPhi*this._rx*e-this._sinPhi*this._ry*t),this._from[1]+this._T*(-this._sinPhi*this._rx*e+this._cosPhi*this._ry*t)],o=[n[0]+this._T*(this._cosPhi*this._rx*h+this._sinPhi*this._ry*i),n[1]+this._T*(this._sinPhi*this._rx*h-this._cosPhi*this._ry*i)];return this._theta=s,this._from=[n[0],n[1]],this._segIndex++,{cp1:a,cp2:o,to:n}}calculateVectorAngle(t,e,s,i){const h=Math.atan2(e,t),n=Math.atan2(i,s);return n>=h?n-h:2*Math.PI-(h-n)}}class o{constructor(t,e){this.sets=t,this.closed=e}fit(t){const e=[];for(const s of this.sets){const i=s.length;let h=Math.floor(t*i);if(h<5){if(i<=5)continue;h=5}e.push(this.reduce(s,h))}let s="";for(const t of e){for(let e=0;e<t.length;e++){const i=t[e];s+=0===e?"M"+i[0]+","+i[1]:"L"+i[0]+","+i[1]}this.closed&&(s+="z ")}return s}distance(t,e){return Math.sqrt(Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2))}reduce(t,e){if(t.length<=e)return t;const s=t.slice(0);for(;s.length>e;){let t=-1,e=-1;for(let i=1;i<s.length-1;i++){const h=this.distance(s[i-1],s[i]),n=this.distance(s[i],s[i+1]),a=this.distance(s[i-1],s[i+1]),o=(h+n+a)/2,r=Math.sqrt(o*(o-h)*(o-n)*(o-a));(t<0||r<t)&&(t=r,e=i)}if(!(e>0))break;s.splice(e,1)}return s}}class r{constructor(t,e){this.xi=Number.MAX_VALUE,this.yi=Number.MAX_VALUE,this.px1=t[0],this.py1=t[1],this.px2=e[0],this.py2=e[1],this.a=this.py2-this.py1,this.b=this.px1-this.px2,this.c=this.px2*this.py1-this.px1*this.py2,this._undefined=0===this.a&&0===this.b&&0===this.c}isUndefined(){return this._undefined}intersects(t){if(this.isUndefined()||t.isUndefined())return!1;let e=Number.MAX_VALUE,s=Number.MAX_VALUE,i=0,h=0;const n=this.a,a=this.b,o=this.c;return Math.abs(a)>1e-5&&(e=-n/a,i=-o/a),Math.abs(t.b)>1e-5&&(s=-t.a/t.b,h=-t.c/t.b),e===Number.MAX_VALUE?s===Number.MAX_VALUE?-o/n==-t.c/t.a&&(this.py1>=Math.min(t.py1,t.py2)&&this.py1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.py2>=Math.min(t.py1,t.py2)&&this.py2<=Math.max(t.py1,t.py2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=this.px1,this.yi=s*this.xi+h,!((this.py1-this.yi)*(this.yi-this.py2)<-1e-5||(t.py1-this.yi)*(this.yi-t.py2)<-1e-5)&&(!(Math.abs(t.a)<1e-5)||!((t.px1-this.xi)*(this.xi-t.px2)<-1e-5))):s===Number.MAX_VALUE?(this.xi=t.px1,this.yi=e*this.xi+i,!((t.py1-this.yi)*(this.yi-t.py2)<-1e-5||(this.py1-this.yi)*(this.yi-this.py2)<-1e-5)&&(!(Math.abs(n)<1e-5)||!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5))):e===s?i===h&&(this.px1>=Math.min(t.px1,t.px2)&&this.px1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.px2>=Math.min(t.px1,t.px2)&&this.px2<=Math.max(t.px1,t.px2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=(h-i)/(e-s),this.yi=e*this.xi+i,!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5||(t.px1-this.xi)*(this.xi-t.px2)<-1e-5))}}function l(t,e){const s=t[1][1]-t[0][1],i=t[0][0]-t[1][0],h=s*t[0][0]+i*t[0][1],n=e[1][1]-e[0][1],a=e[0][0]-e[1][0],o=n*e[0][0]+a*e[0][1],r=s*a-n*i;return r?[Math.round((a*h-i*o)/r),Math.round((s*o-n*h)/r)]:null}class c{constructor(t,e,s,i,h,n,a,o){this.deltaX=0,this.hGap=0,this.top=t,this.bottom=e,this.left=s,this.right=i,this.gap=h,this.sinAngle=n,this.tanAngle=o,Math.abs(n)<1e-4?this.pos=s+h:Math.abs(n)>.9999?this.pos=t+h:(this.deltaX=(e-t)*Math.abs(o),this.pos=s-Math.abs(this.deltaX),this.hGap=Math.abs(h/a),this.sLeft=new r([s,e],[s,t]),this.sRight=new r([i,e],[i,t]))}nextLine(){if(Math.abs(this.sinAngle)<1e-4){if(this.pos<this.right){const t=[this.pos,this.top,this.pos,this.bottom];return this.pos+=this.gap,t}}else if(Math.abs(this.sinAngle)>.9999){if(this.pos<this.bottom){const t=[this.left,this.pos,this.right,this.pos];return this.pos+=this.gap,t}}else{let t=this.pos-this.deltaX/2,e=this.pos+this.deltaX/2,s=this.bottom,i=this.top;if(this.pos<this.right+this.deltaX){for(;t<this.left&&e<this.left||t>this.right&&e>this.right;)if(this.pos+=this.hGap,t=this.pos-this.deltaX/2,e=this.pos+this.deltaX/2,this.pos>this.right+this.deltaX)return null;const h=new r([t,s],[e,i]);this.sLeft&&h.intersects(this.sLeft)&&(t=h.xi,s=h.yi),this.sRight&&h.intersects(this.sRight)&&(e=h.xi,i=h.yi),this.tanAngle>0&&(t=this.right-(t-this.left),e=this.right-(e-this.left));const n=[t,s,e,i];return this.pos+=this.hGap,n}}return null}}function p(t){const e=t[0],s=t[1];return Math.sqrt(Math.pow(e[0]-s[0],2)+Math.pow(e[1]-s[1],2))}function u(t,e){const s=[],i=new r([t[0],t[1]],[t[2],t[3]]);for(let t=0;t<e.length;t++){const h=new r(e[t],e[(t+1)%e.length]);i.intersects(h)&&s.push([i.xi,i.yi])}return s}function f(t,e,s,i,h,n,a){return[-s*n-i*h+s+n*t+h*e,a*(s*h-i*n)+i+-a*h*t+a*n*e]}function d(t,e){const s=[];if(t&&t.length){let i=t[0][0],h=t[0][0],n=t[0][1],a=t[0][1];for(let e=1;e<t.length;e++)i=Math.min(i,t[e][0]),h=Math.max(h,t[e][0]),n=Math.min(n,t[e][1]),a=Math.max(a,t[e][1]);const o=e.hachureAngle;let r=e.hachureGap;r<0&&(r=4*e.strokeWidth),r=Math.max(r,.1);const l=o%180*(Math.PI/180),p=Math.cos(l),f=Math.sin(l),d=Math.tan(l),g=new c(n-1,a+1,i-1,h+1,r,f,p,d);let y;for(;null!=(y=g.nextLine());){const e=u(y,t);for(let t=0;t<e.length;t++)if(t<e.length-1){const i=e[t],h=e[t+1];s.push([i,h])}}}return s}function g(t,e,s,i,h,n){const a=[];let o=Math.abs(i/2),r=Math.abs(h/2);o+=t.randOffset(.05*o,n),r+=t.randOffset(.05*r,n);const l=n.hachureAngle;let c=n.hachureGap;c<=0&&(c=4*n.strokeWidth);let p=n.fillWeight;p<0&&(p=n.strokeWidth/2);const u=l%180*(Math.PI/180),d=Math.tan(u),g=r/o,y=Math.sqrt(g*d*g*d+1),M=g*d/y,x=1/y,_=c/(o*r/Math.sqrt(r*x*(r*x)+o*M*(o*M))/o);let m=Math.sqrt(o*o-(e-o+_)*(e-o+_));for(let t=e-o+_;t<e+o;t+=_){const i=f(t,s-(m=Math.sqrt(o*o-(e-t)*(e-t))),e,s,M,x,g),h=f(t,s+m,e,s,M,x,g);a.push([i,h])}return a}class y{constructor(t){this.helper=t}fillPolygon(t,e){return this._fillPolygon(t,e)}fillEllipse(t,e,s,i,h){return this._fillEllipse(t,e,s,i,h)}fillArc(t,e,s,i,h,n,a){return null}_fillPolygon(t,e,s=!1){const i=d(t,e);return{type:"fillSketch",ops:this.renderLines(i,e,s)}}_fillEllipse(t,e,s,i,h,n=!1){const a=g(this.helper,t,e,s,i,h);return{type:"fillSketch",ops:this.renderLines(a,h,n)}}renderLines(t,e,s){let i=[],h=null;for(const n of t)i=i.concat(this.helper.doubleLineOps(n[0][0],n[0][1],n[1][0],n[1][1],e)),s&&h&&(i=i.concat(this.helper.doubleLineOps(h[0],h[1],n[0][0],n[0][1],e))),h=n[1];return i}}class M extends y{fillPolygon(t,e){return this._fillPolygon(t,e,!0)}fillEllipse(t,e,s,i,h){return this._fillEllipse(t,e,s,i,h,!0)}}class x extends y{fillPolygon(t,e){const s=this._fillPolygon(t,e),i=Object.assign({},e,{hachureAngle:e.hachureAngle+90}),h=this._fillPolygon(t,i);return s.ops=s.ops.concat(h.ops),s}fillEllipse(t,e,s,i,h){const n=this._fillEllipse(t,e,s,i,h),a=Object.assign({},h,{hachureAngle:h.hachureAngle+90}),o=this._fillEllipse(t,e,s,i,a);return n.ops=n.ops.concat(o.ops),n}}class _{constructor(t){this.helper=t}fillPolygon(t,e){const s=d(t,e=Object.assign({},e,{curveStepCount:4,hachureAngle:0}));return this.dotsOnLines(s,e)}fillEllipse(t,e,s,i,h){h=Object.assign({},h,{curveStepCount:4,hachureAngle:0});const n=g(this.helper,t,e,s,i,h);return this.dotsOnLines(n,h)}fillArc(t,e,s,i,h,n,a){return null}dotsOnLines(t,e){let s=[],i=e.hachureGap;i<0&&(i=4*e.strokeWidth),i=Math.max(i,.1);let h=e.fillWeight;h<0&&(h=e.strokeWidth/2);for(const n of t){const t=p(n)/i,a=Math.ceil(t)-1,o=Math.atan((n[1][1]-n[0][1])/(n[1][0]-n[0][0]));for(let t=0;t<a;t++){const a=i*(t+1),r=a*Math.sin(o),l=a*Math.cos(o),c=[n[0][0]-l,n[0][1]+r],p=this.helper.randOffsetWithRange(c[0]-i/4,c[0]+i/4,e),u=this.helper.randOffsetWithRange(c[1]-i/4,c[1]+i/4,e),f=this.helper.ellipse(p,u,h,h,e);s=s.concat(f.ops)}}return{type:"fillSketch",ops:s}}}class m{constructor(t){this.helper=t}fillPolygon(t,e){const s=[Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER],i=[Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER];t.forEach(t=>{s[0]=Math.min(s[0],t[0]),s[1]=Math.max(s[1],t[0]),i[0]=Math.min(i[0],t[1]),i[1]=Math.max(i[1],t[1])});const h=function(t){let e=0,s=0,i=0;for(let s=0;s<t.length;s++){const i=t[s],h=s===t.length-1?t[0]:t[s+1];e+=i[0]*h[1]-h[0]*i[1]}e/=2;for(let e=0;e<t.length;e++){const h=t[e],n=e===t.length-1?t[0]:t[e+1];s+=(h[0]+n[0])*(h[0]*n[1]-n[0]*h[1]),i+=(h[1]+n[1])*(h[0]*n[1]-n[0]*h[1])}return[s/(6*e),i/(6*e)]}(t),n=Math.max(Math.sqrt(Math.pow(h[0]-s[0],2)+Math.pow(h[1]-i[0],2)),Math.sqrt(Math.pow(h[0]-s[1],2)+Math.pow(h[1]-i[1],2))),a=e.hachureGap>0?e.hachureGap:4*e.strokeWidth,o=[];if(t.length>2)for(let e=0;e<t.length;e++)e===t.length-1?o.push([t[e],t[0]]):o.push([t[e],t[e+1]]);let r=[];const c=Math.max(1,Math.PI*n/a);for(let t=0;t<c;t++){const e=t*Math.PI/c,a=[h,[h[0]+n*Math.cos(e),h[1]+n*Math.sin(e)]];o.forEach(t=>{const e=l(t,a);e&&e[0]>=s[0]&&e[0]<=s[1]&&e[1]>=i[0]&&e[1]<=i[1]&&r.push(e)})}r=this.removeDuplocatePoints(r);const p=this.createLinesFromCenter(h,r);return{type:"fillSketch",ops:this.drawLines(p,e)}}fillEllipse(t,e,s,i,h){return this.fillArcSegment(t,e,s,i,0,2*Math.PI,h)}fillArc(t,e,s,i,h,n,a){return this.fillArcSegment(t,e,s,i,h,n,a)}fillArcSegment(t,e,s,i,h,n,a){const o=[t,e],r=s/2,l=i/2,c=Math.max(s/2,i/2);let p=a.hachureGap;p<0&&(p=4*a.strokeWidth);const u=Math.max(1,Math.abs(n-h)*c/p);let f=[];for(let t=0;t<u;t++){const e=t*((n-h)/u)+h,s=c*Math.cos(e),i=c*Math.sin(e),a=Math.sqrt(r*r*i*i+l*l*s*s),p=r*l*s/a,d=r*l*i/a;f.push([o[0]+p,o[1]+d])}f=this.removeDuplocatePoints(f);const d=this.createLinesFromCenter(o,f);return{type:"fillSketch",ops:this.drawLines(d,a)}}drawLines(t,e){let s=[];return t.forEach(t=>{const i=t[0],h=t[1];s=s.concat(this.helper.doubleLineOps(i[0],i[1],h[0],h[1],e))}),s}createLinesFromCenter(t,e){return e.map(e=>[t,e])}removeDuplocatePoints(t){const e=new Set;return t.filter(t=>{const s=t.join(",");return!e.has(s)&&(e.add(s),!0)})}}class b{constructor(t){this.helper=t}fillPolygon(t,e){const s=d(t,e);return{type:"fillSketch",ops:this.dashedLine(s,e)}}fillEllipse(t,e,s,i,h){const n=g(this.helper,t,e,s,i,h);return{type:"fillSketch",ops:this.dashedLine(n,h)}}fillArc(t,e,s,i,h,n,a){return null}dashedLine(t,e){const s=e.dashOffset<0?e.hachureGap<0?4*e.strokeWidth:e.hachureGap:e.dashOffset,i=e.dashGap<0?e.hachureGap<0?4*e.strokeWidth:e.hachureGap:e.dashGap;let h=[];return t.forEach(t=>{const n=p(t),a=Math.floor(n/(s+i)),o=(n+i-a*(s+i))/2;let r=t[0],l=t[1];r[0]>l[0]&&(r=t[1],l=t[0]);const c=Math.atan((l[1]-r[1])/(l[0]-r[0]));for(let t=0;t<a;t++){const n=t*(s+i),a=n+s,l=[r[0]+n*Math.cos(c)+o*Math.cos(c),r[1]+n*Math.sin(c)+o*Math.sin(c)],p=[r[0]+a*Math.cos(c)+o*Math.cos(c),r[1]+a*Math.sin(c)+o*Math.sin(c)];h=h.concat(this.helper.doubleLineOps(l[0],l[1],p[0],p[1],e))}}),h}}class w{constructor(t){this.helper=t}fillPolygon(t,e){const s=e.hachureGap<0?4*e.strokeWidth:e.hachureGap,i=e.zigzagOffset<0?s:e.zigzagOffset,h=d(t,e=Object.assign({},e,{hachureGap:s+i}));return{type:"fillSketch",ops:this.zigzagLines(h,i,e)}}fillEllipse(t,e,s,i,h){const n=h.hachureGap<0?4*h.strokeWidth:h.hachureGap,a=h.zigzagOffset<0?n:h.zigzagOffset;h=Object.assign({},h,{hachureGap:n+a});const o=g(this.helper,t,e,s,i,h);return{type:"fillSketch",ops:this.zigzagLines(o,a,h)}}fillArc(t,e,s,i,h,n,a){return null}zigzagLines(t,e,s){let i=[];return t.forEach(t=>{const h=p(t),n=Math.round(h/(2*e));let a=t[0],o=t[1];a[0]>o[0]&&(a=t[1],o=t[0]);const r=Math.atan((o[1]-a[1])/(o[0]-a[0]));for(let t=0;t<n;t++){const h=2*t*e,n=2*(t+1)*e,o=Math.sqrt(2*Math.pow(e,2)),l=[a[0]+h*Math.cos(r),a[1]+h*Math.sin(r)],c=[a[0]+n*Math.cos(r),a[1]+n*Math.sin(r)],p=[l[0]+o*Math.cos(r+Math.PI/4),l[1]+o*Math.sin(r+Math.PI/4)];i=(i=i.concat(this.helper.doubleLineOps(l[0],l[1],p[0],p[1],s))).concat(this.helper.doubleLineOps(p[0],p[1],c[0],c[1],s))}}),i}}const k={};function P(t,e){let s=t.fillStyle||"hachure";if(!k[s])switch(s){case"zigzag":k[s]||(k[s]=new M(e));break;case"cross-hatch":k[s]||(k[s]=new x(e));break;case"dots":k[s]||(k[s]=new _(e));break;case"starburst":k[s]||(k[s]=new m(e));break;case"dashed":k[s]||(k[s]=new b(e));break;case"zigzag-line":k[s]||(k[s]=new w(e));break;case"hachure":default:k[s="hachure"]||(k[s]=new y(e))}return k[s]}const v={randOffset:function(t,e){return W(t,e)},randOffsetWithRange:function(t,e,s){return N(t,e,s)},ellipse:T,doubleLineOps:function(t,e,s,i,h){return R(t,e,s,i,h)}};function S(t,e,s,i,h){return{type:"path",ops:R(t,e,s,i,h)}}function A(t,e,s){const i=(t||[]).length;if(i>2){let h=[];for(let e=0;e<i-1;e++)h=h.concat(R(t[e][0],t[e][1],t[e+1][0],t[e+1][1],s));return e&&(h=h.concat(R(t[i-1][0],t[i-1][1],t[0][0],t[0][1],s))),{type:"path",ops:h}}return 2===i?S(t[0][0],t[0][1],t[1][0],t[1][1],s):{type:"path",ops:[]}}function E(t,e,s,i,h){return function(t,e){return A(t,!0,e)}([[t,e],[t+s,e],[t+s,e+i],[t,e+i]],h)}function O(t,e){const s=D(t,1*(1+.2*e.roughness),e),i=D(t,1.5*(1+.22*e.roughness),e);return{type:"path",ops:s.concat(i)}}function T(t,e,s,i,h){const n=2*Math.PI/h.curveStepCount;let a=Math.abs(s/2),o=Math.abs(i/2);const r=$(n,t,e,a+=W(.05*a,h),o+=W(.05*o,h),1,n*N(.1,N(.4,1,h),h),h),l=$(n,t,e,a,o,1.5,0,h);return{type:"path",ops:r.concat(l)}}function C(t,e,s,i,h,n,a,o,r){const l=t,c=e;let p=Math.abs(s/2),u=Math.abs(i/2);p+=W(.01*p,r),u+=W(.01*u,r);let f=h,d=n;for(;f<0;)f+=2*Math.PI,d+=2*Math.PI;d-f>2*Math.PI&&(f=0,d=2*Math.PI);const g=2*Math.PI/r.curveStepCount,y=Math.min(g/2,(d-f)/2),M=G(y,l,c,p,u,f,d,1,r),x=G(y,l,c,p,u,f,d,1.5,r);let _=M.concat(x);return a&&(o?_=(_=_.concat(R(l,c,l+p*Math.cos(f),c+u*Math.sin(f),r))).concat(R(l,c,l+p*Math.cos(d),c+u*Math.sin(d),r)):(_.push({op:"lineTo",data:[l,c]}),_.push({op:"lineTo",data:[l+p*Math.cos(f),c+u*Math.sin(f)]}))),{type:"path",ops:_}}function z(t,e){const s=[];if(t.length){const i=e.maxRandomnessOffset||0,h=t.length;if(h>2){s.push({op:"move",data:[t[0][0]+W(i,e),t[0][1]+W(i,e)]});for(let n=1;n<h;n++)s.push({op:"lineTo",data:[t[n][0]+W(i,e),t[n][1]+W(i,e)]})}}return{type:"fillPath",ops:s}}function L(t,e){return P(e,v).fillPolygon(t,e)}function N(t,e,s){return s.roughness*(Math.random()*(e-t)+t)}function W(t,e){return N(-t,t,e)}function R(t,e,s,i,h){const n=I(t,e,s,i,h,!0,!1),a=I(t,e,s,i,h,!0,!0);return n.concat(a)}function I(t,e,s,i,h,n,a){const o=Math.pow(t-s,2)+Math.pow(e-i,2);let r=h.maxRandomnessOffset||0;r*r*100>o&&(r=Math.sqrt(o)/10);const l=r/2,c=.2+.2*Math.random();let p=h.bowing*h.maxRandomnessOffset*(i-e)/200,u=h.bowing*h.maxRandomnessOffset*(t-s)/200;p=W(p,h),u=W(u,h);const f=[],d=()=>W(l,h),g=()=>W(r,h);return n&&(a?f.push({op:"move",data:[t+d(),e+d()]}):f.push({op:"move",data:[t+W(r,h),e+W(r,h)]})),a?f.push({op:"bcurveTo",data:[p+t+(s-t)*c+d(),u+e+(i-e)*c+d(),p+t+2*(s-t)*c+d(),u+e+2*(i-e)*c+d(),s+d(),i+d()]}):f.push({op:"bcurveTo",data:[p+t+(s-t)*c+g(),u+e+(i-e)*c+g(),p+t+2*(s-t)*c+g(),u+e+2*(i-e)*c+g(),s+g(),i+g()]}),f}function D(t,e,s){const i=[];i.push([t[0][0]+W(e,s),t[0][1]+W(e,s)]),i.push([t[0][0]+W(e,s),t[0][1]+W(e,s)]);for(let h=1;h<t.length;h++)i.push([t[h][0]+W(e,s),t[h][1]+W(e,s)]),h===t.length-1&&i.push([t[h][0]+W(e,s),t[h][1]+W(e,s)]);return q(i,null,s)}function q(t,e,s){const i=t.length;let h=[];if(i>3){const n=[],a=1-s.curveTightness;h.push({op:"move",data:[t[1][0],t[1][1]]});for(let e=1;e+2<i;e++){const s=t[e];n[0]=[s[0],s[1]],n[1]=[s[0]+(a*t[e+1][0]-a*t[e-1][0])/6,s[1]+(a*t[e+1][1]-a*t[e-1][1])/6],n[2]=[t[e+1][0]+(a*t[e][0]-a*t[e+2][0])/6,t[e+1][1]+(a*t[e][1]-a*t[e+2][1])/6],n[3]=[t[e+1][0],t[e+1][1]],h.push({op:"bcurveTo",data:[n[1][0],n[1][1],n[2][0],n[2][1],n[3][0],n[3][1]]})}if(e&&2===e.length){const t=s.maxRandomnessOffset;h.push({op:"lineTo",data:[e[0]+W(t,s),e[1]+W(t,s)]})}}else 3===i?(h.push({op:"move",data:[t[1][0],t[1][1]]}),h.push({op:"bcurveTo",data:[t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1]]})):2===i&&(h=h.concat(R(t[0][0],t[0][1],t[1][0],t[1][1],s)));return h}function $(t,e,s,i,h,n,a,o){const r=W(.5,o)-Math.PI/2,l=[];l.push([W(n,o)+e+.9*i*Math.cos(r-t),W(n,o)+s+.9*h*Math.sin(r-t)]);for(let a=r;a<2*Math.PI+r-.01;a+=t)l.push([W(n,o)+e+i*Math.cos(a),W(n,o)+s+h*Math.sin(a)]);return l.push([W(n,o)+e+i*Math.cos(r+2*Math.PI+.5*a),W(n,o)+s+h*Math.sin(r+2*Math.PI+.5*a)]),l.push([W(n,o)+e+.98*i*Math.cos(r+a),W(n,o)+s+.98*h*Math.sin(r+a)]),l.push([W(n,o)+e+.9*i*Math.cos(r+.5*a),W(n,o)+s+.9*h*Math.sin(r+.5*a)]),q(l,null,o)}function G(t,e,s,i,h,n,a,o,r){const l=n+W(.1,r),c=[];c.push([W(o,r)+e+.9*i*Math.cos(l-t),W(o,r)+s+.9*h*Math.sin(l-t)]);for(let n=l;n<=a;n+=t)c.push([W(o,r)+e+i*Math.cos(n),W(o,r)+s+h*Math.sin(n)]);return c.push([e+i*Math.cos(a),s+h*Math.sin(a)]),c.push([e+i*Math.cos(a),s+h*Math.sin(a)]),q(c,null,r)}function B(t,e,s,i,h,n,a,o){const r=[],l=[o.maxRandomnessOffset||1,(o.maxRandomnessOffset||1)+.5];let c=[0,0];for(let p=0;p<2;p++)0===p?r.push({op:"move",data:[a.x,a.y]}):r.push({op:"move",data:[a.x+W(l[0],o),a.y+W(l[0],o)]}),c=[h+W(l[p],o),n+W(l[p],o)],r.push({op:"bcurveTo",data:[t+W(l[p],o),e+W(l[p],o),s+W(l[p],o),i+W(l[p],o),c[0],c[1]]});return a.setPosition(c[0],c[1]),r}function X(t,e,s,i){let h=[];switch(e.key){case"M":case"m":{const s="m"===e.key;if(e.data.length>=2){let n=+e.data[0],a=+e.data[1];s&&(n+=t.x,a+=t.y);const o=1*(i.maxRandomnessOffset||0);n+=W(o,i),a+=W(o,i),t.setPosition(n,a),h.push({op:"move",data:[n,a]})}break}case"L":case"l":{const s="l"===e.key;if(e.data.length>=2){let n=+e.data[0],a=+e.data[1];s&&(n+=t.x,a+=t.y),h=h.concat(R(t.x,t.y,n,a,i)),t.setPosition(n,a)}break}case"H":case"h":{const s="h"===e.key;if(e.data.length){let n=+e.data[0];s&&(n+=t.x),h=h.concat(R(t.x,t.y,n,t.y,i)),t.setPosition(n,t.y)}break}case"V":case"v":{const s="v"===e.key;if(e.data.length){let n=+e.data[0];s&&(n+=t.y),h=h.concat(R(t.x,t.y,t.x,n,i)),t.setPosition(t.x,n)}break}case"Z":case"z":t.first&&(h=h.concat(R(t.x,t.y,t.first[0],t.first[1],i)),t.setPosition(t.first[0],t.first[1]),t.first=null);break;case"C":case"c":{const s="c"===e.key;if(e.data.length>=6){let n=+e.data[0],a=+e.data[1],o=+e.data[2],r=+e.data[3],l=+e.data[4],c=+e.data[5];s&&(n+=t.x,o+=t.x,l+=t.x,a+=t.y,r+=t.y,c+=t.y);const p=B(n,a,o,r,l,c,t,i);h=h.concat(p),t.bezierReflectionPoint=[l+(l-o),c+(c-r)]}break}case"S":case"s":{const n="s"===e.key;if(e.data.length>=4){let a=+e.data[0],o=+e.data[1],r=+e.data[2],l=+e.data[3];n&&(a+=t.x,r+=t.x,o+=t.y,l+=t.y);let c=a,p=o;const u=s?s.key:"";let f=null;"c"!==u&&"C"!==u&&"s"!==u&&"S"!==u||(f=t.bezierReflectionPoint),f&&(c=f[0],p=f[1]);const d=B(c,p,a,o,r,l,t,i);h=h.concat(d),t.bezierReflectionPoint=[r+(r-a),l+(l-o)]}break}case"Q":case"q":{const s="q"===e.key;if(e.data.length>=4){let n=+e.data[0],a=+e.data[1],o=+e.data[2],r=+e.data[3];s&&(n+=t.x,o+=t.x,a+=t.y,r+=t.y);const l=1*(1+.2*i.roughness),c=1.5*(1+.22*i.roughness);h.push({op:"move",data:[t.x+W(l,i),t.y+W(l,i)]});let p=[o+W(l,i),r+W(l,i)];h.push({op:"qcurveTo",data:[n+W(l,i),a+W(l,i),p[0],p[1]]}),h.push({op:"move",data:[t.x+W(c,i),t.y+W(c,i)]}),p=[o+W(c,i),r+W(c,i)],h.push({op:"qcurveTo",data:[n+W(c,i),a+W(c,i),p[0],p[1]]}),t.setPosition(p[0],p[1]),t.quadReflectionPoint=[o+(o-n),r+(r-a)]}break}case"T":case"t":{const n="t"===e.key;if(e.data.length>=2){let a=+e.data[0],o=+e.data[1];n&&(a+=t.x,o+=t.y);let r=a,l=o;const c=s?s.key:"";let p=null;"q"!==c&&"Q"!==c&&"t"!==c&&"T"!==c||(p=t.quadReflectionPoint),p&&(r=p[0],l=p[1]);const u=1*(1+.2*i.roughness),f=1.5*(1+.22*i.roughness);h.push({op:"move",data:[t.x+W(u,i),t.y+W(u,i)]});let d=[a+W(u,i),o+W(u,i)];h.push({op:"qcurveTo",data:[r+W(u,i),l+W(u,i),d[0],d[1]]}),h.push({op:"move",data:[t.x+W(f,i),t.y+W(f,i)]}),d=[a+W(f,i),o+W(f,i)],h.push({op:"qcurveTo",data:[r+W(f,i),l+W(f,i),d[0],d[1]]}),t.setPosition(d[0],d[1]),t.quadReflectionPoint=[a+(a-r),o+(o-l)]}break}case"A":case"a":{const s="a"===e.key;if(e.data.length>=7){const n=+e.data[0],o=+e.data[1],r=+e.data[2],l=+e.data[3],c=+e.data[4];let p=+e.data[5],u=+e.data[6];if(s&&(p+=t.x,u+=t.y),p===t.x&&u===t.y)break;if(0===n||0===o)h=h.concat(R(t.x,t.y,p,u,i)),t.setPosition(p,u);else for(let e=0;e<1;e++){const e=new a([t.x,t.y],[p,u],[n,o],r,!!l,!!c);let s=e.getNextSegment();for(;s;){const n=B(s.cp1[0],s.cp1[1],s.cp2[0],s.cp2[1],s.to[0],s.to[1],t,i);h=h.concat(n),s=e.getNextSegment()}}}break}}return h}class U extends e{line(t,e,s,i,h){const n=this._options(h);return this._drawable("line",[S(t,e,s,i,n)],n)}rectangle(t,e,s,i,h){const n=this._options(h),a=[];if(n.fill){const h=[[t,e],[t+s,e],[t+s,e+i],[t,e+i]];"solid"===n.fillStyle?a.push(z(h,n)):a.push(L(h,n))}return a.push(E(t,e,s,i,n)),this._drawable("rectangle",a,n)}ellipse(t,e,s,i,h){const n=this._options(h),a=[];if(n.fill)if("solid"===n.fillStyle){const h=T(t,e,s,i,n);h.type="fillPath",a.push(h)}else a.push(function(t,e,s,i,h){return P(h,v).fillEllipse(t,e,s,i,h)}(t,e,s,i,n));return a.push(T(t,e,s,i,n)),this._drawable("ellipse",a,n)}circle(t,e,s,i){const h=this.ellipse(t,e,s,s,i);return h.shape="circle",h}linearPath(t,e){const s=this._options(e);return this._drawable("linearPath",[A(t,!1,s)],s)}arc(t,e,s,i,h,n,a=!1,o){const r=this._options(o),l=[];if(a&&r.fill)if("solid"===r.fillStyle){const a=C(t,e,s,i,h,n,!0,!1,r);a.type="fillPath",l.push(a)}else l.push(function(t,e,s,i,h,n,a){const o=P(a,v).fillArc(t,e,s,i,h,n,a);if(o)return o;const r=t,l=e;let c=Math.abs(s/2),p=Math.abs(i/2);c+=W(.01*c,a),p+=W(.01*p,a);let u=h,f=n;for(;u<0;)u+=2*Math.PI,f+=2*Math.PI;f-u>2*Math.PI&&(u=0,f=2*Math.PI);const d=(f-u)/a.curveStepCount,g=[];for(let t=u;t<=f;t+=d)g.push([r+c*Math.cos(t),l+p*Math.sin(t)]);return g.push([r+c*Math.cos(f),l+p*Math.sin(f)]),g.push([r,l]),L(g,a)}(t,e,s,i,h,n,r));return l.push(C(t,e,s,i,h,n,a,!0,r)),this._drawable("arc",l,r)}curve(t,e){const s=this._options(e);return this._drawable("curve",[O(t,s)],s)}polygon(t,e){const s=this._options(e),i=[];if(s.fill)if("solid"===s.fillStyle)i.push(z(t,s));else{const e=this.computePolygonSize(t),h=L([[0,0],[e[0],0],[e[0],e[1]],[0,e[1]]],s);h.type="path2Dpattern",h.size=e,h.path=this.polygonPath(t),i.push(h)}return i.push(A(t,!0,s)),this._drawable("polygon",i,s)}path(t,e){const s=this._options(e),i=[];if(!t)return this._drawable("path",i,s);if(s.fill)if("solid"===s.fillStyle){const e={type:"path2Dfill",path:t,ops:[]};i.push(e)}else{const e=this.computePathSize(t),h=L([[0,0],[e[0],0],[e[0],e[1]],[0,e[1]]],s);h.type="path2Dpattern",h.size=e,h.path=t,i.push(h)}return i.push(function(t,e){t=(t||"").replace(/\n/g," ").replace(/(-\s)/g,"-").replace("/(ss)/g"," ");let s=new n(t);if(e.simplification){const t=new o(s.linearPoints,s.closed).fit(e.simplification);s=new n(t)}let i=[];const h=s.segments||[];for(let t=0;t<h.length;t++){const n=X(s,h[t],t>0?h[t-1]:null,e);n&&n.length&&(i=i.concat(n))}return{type:"path",ops:i}}(t,s)),this._drawable("path",i,s)}}const V="undefined"!=typeof document;class j{constructor(t){this.canvas=t,this.ctx=this.canvas.getContext("2d")}draw(t){const e=t.sets||[],s=t.options||this.getDefaultOptions(),i=this.ctx;for(const t of e)switch(t.type){case"path":i.save(),i.strokeStyle=s.stroke,i.lineWidth=s.strokeWidth,this._drawToContext(i,t),i.restore();break;case"fillPath":i.save(),i.fillStyle=s.fill||"",this._drawToContext(i,t),i.restore();break;case"fillSketch":this.fillSketch(i,t,s);break;case"path2Dfill":{this.ctx.save(),this.ctx.fillStyle=s.fill||"";const e=new Path2D(t.path);this.ctx.fill(e),this.ctx.restore();break}case"path2Dpattern":{const e=this.canvas.ownerDocument||V&&document;if(e){const i=t.size,h=e.createElement("canvas"),n=h.getContext("2d"),a=this.computeBBox(t.path);a&&(a.width||a.height)?(h.width=this.canvas.width,h.height=this.canvas.height,n.translate(a.x||0,a.y||0)):(h.width=i[0],h.height=i[1]),this.fillSketch(n,t,s),this.ctx.save(),this.ctx.fillStyle=this.ctx.createPattern(h,"repeat");const o=new Path2D(t.path);this.ctx.fill(o),this.ctx.restore()}else console.error("Cannot render path2Dpattern. No defs/document defined.");break}}}computeBBox(t){if(V)try{const e="http://www.w3.org/2000/svg",s=document.createElementNS(e,"svg");s.setAttribute("width","0"),s.setAttribute("height","0");const i=self.document.createElementNS(e,"path");i.setAttribute("d",t),s.appendChild(i),document.body.appendChild(s);const h=i.getBBox();return document.body.removeChild(s),h}catch(t){}return null}fillSketch(t,e,s){let i=s.fillWeight;i<0&&(i=s.strokeWidth/2),t.save(),t.strokeStyle=s.fill||"",t.lineWidth=i,this._drawToContext(t,e),t.restore()}_drawToContext(t,e){t.beginPath();for(const s of e.ops){const e=s.data;switch(s.op){case"move":t.moveTo(e[0],e[1]);break;case"bcurveTo":t.bezierCurveTo(e[0],e[1],e[2],e[3],e[4],e[5]);break;case"qcurveTo":t.quadraticCurveTo(e[0],e[1],e[2],e[3]);break;case"lineTo":t.lineTo(e[0],e[1])}}"fillPath"===e.type?t.fill():t.stroke()}}class F extends j{constructor(t,e){super(t),this.gen=new U(e||null,this.canvas)}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}line(t,e,s,i,h){const n=this.gen.line(t,e,s,i,h);return this.draw(n),n}rectangle(t,e,s,i,h){const n=this.gen.rectangle(t,e,s,i,h);return this.draw(n),n}ellipse(t,e,s,i,h){const n=this.gen.ellipse(t,e,s,i,h);return this.draw(n),n}circle(t,e,s,i){const h=this.gen.circle(t,e,s,i);return this.draw(h),h}linearPath(t,e){const s=this.gen.linearPath(t,e);return this.draw(s),s}polygon(t,e){const s=this.gen.polygon(t,e);return this.draw(s),s}arc(t,e,s,i,h,n,a=!1,o){const r=this.gen.arc(t,e,s,i,h,n,a,o);return this.draw(r),r}curve(t,e){const s=this.gen.curve(t,e);return this.draw(s),s}path(t,e){const s=this.gen.path(t,e);return this.draw(s),s}}const Q="undefined"!=typeof document;class Z{constructor(t){this.svg=t}get defs(){const t=this.svg.ownerDocument||Q&&document;if(t&&!this._defs){const e=t.createElementNS("http://www.w3.org/2000/svg","defs");this.svg.firstChild?this.svg.insertBefore(e,this.svg.firstChild):this.svg.appendChild(e),this._defs=e}return this._defs||null}draw(t){const e=t.sets||[],s=t.options||this.getDefaultOptions(),i=this.svg.ownerDocument||window.document,h=i.createElementNS("http://www.w3.org/2000/svg","g");for(const t of e){let e=null;switch(t.type){case"path":(e=i.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",this.opsToPath(t)),e.style.stroke=s.stroke,e.style.strokeWidth=s.strokeWidth+"",e.style.fill="none";break;case"fillPath":(e=i.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",this.opsToPath(t)),e.style.stroke="none",e.style.strokeWidth="0",e.style.fill=s.fill||null;break;case"fillSketch":e=this.fillSketch(i,t,s);break;case"path2Dfill":(e=i.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",t.path||""),e.style.stroke="none",e.style.strokeWidth="0",e.style.fill=s.fill||null;break;case"path2Dpattern":if(this.defs){const h=t.size,n=i.createElementNS("http://www.w3.org/2000/svg","pattern"),a=`rough-${Math.floor(Math.random()*(Number.MAX_SAFE_INTEGER||999999))}`;n.setAttribute("id",a),n.setAttribute("x","0"),n.setAttribute("y","0"),n.setAttribute("width","1"),n.setAttribute("height","1"),n.setAttribute("height","1"),n.setAttribute("viewBox",`0 0 ${Math.round(h[0])} ${Math.round(h[1])}`),n.setAttribute("patternUnits","objectBoundingBox");const o=this.fillSketch(i,t,s);n.appendChild(o),this.defs.appendChild(n),(e=i.createElementNS("http://www.w3.org/2000/svg","path")).setAttribute("d",t.path||""),e.style.stroke="none",e.style.strokeWidth="0",e.style.fill=`url(#${a})`}else console.error("Cannot render path2Dpattern. No defs/document defined.")}e&&h.appendChild(e)}return h}fillSketch(t,e,s){let i=s.fillWeight;i<0&&(i=s.strokeWidth/2);const h=t.createElementNS("http://www.w3.org/2000/svg","path");return h.setAttribute("d",this.opsToPath(e)),h.style.stroke=s.fill||null,h.style.strokeWidth=i+"",h.style.fill="none",h}}class H extends Z{constructor(t,e){super(t),this.gen=new U(e||null,this.svg)}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}opsToPath(t){return this.gen.opsToPath(t)}line(t,e,s,i,h){const n=this.gen.line(t,e,s,i,h);return this.draw(n)}rectangle(t,e,s,i,h){const n=this.gen.rectangle(t,e,s,i,h);return this.draw(n)}ellipse(t,e,s,i,h){const n=this.gen.ellipse(t,e,s,i,h);return this.draw(n)}circle(t,e,s,i){const h=this.gen.circle(t,e,s,i);return this.draw(h)}linearPath(t,e){const s=this.gen.linearPath(t,e);return this.draw(s)}polygon(t,e){const s=this.gen.polygon(t,e);return this.draw(s)}arc(t,e,s,i,h,n,a=!1,o){const r=this.gen.arc(t,e,s,i,h,n,a,o);return this.draw(r)}curve(t,e){const s=this.gen.curve(t,e);return this.draw(s)}path(t,e){const s=this.gen.path(t,e);return this.draw(s)}}return{canvas:(t,e)=>new F(t,e),svg:(t,e)=>new H(t,e),generator:(t,e)=>new U(t,e)}});

},{}],"../src/Bar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _d3Array = require("d3-array");

var _d3Axis = require("d3-axis");

var _d3Fetch = require("d3-fetch");

var _d3Scale = require("d3-scale");

var _d3Selection = require("d3-selection");

var _rough = _interopRequireDefault(require("roughjs/dist/rough.umd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var roughCeiling = function roughCeiling(roughness) {
  var roughVal = roughness > 20 ? 20 : roughness;
  return roughVal;
};

var Bar =
/*#__PURE__*/
function () {
  function Bar(opts) {
    _classCallCheck(this, Bar);

    // load in arguments from config object
    this.el = opts.element;
    this.data = opts.data;
    this.element = opts.element;
    this.margin = opts.margin ? opts.margin : {
      top: 50,
      right: 20,
      bottom: 50,
      left: 100
    };
    this.title = opts.title;
    this.color = opts.color ? opts.color : 'skyblue';
    this.highlight = opts.highlight ? opts.highlight : 'coral';
    this.roughness = opts.roughness ? roughCeiling(opts.roughness) : 1;
    this.stroke = opts.stroke ? opts.stroke : 'black';
    this.strokeWidth = opts.strokeWidth ? opts.strokeWidth : 0.6;
    this.labels = opts.labels; //label

    this.values = opts.values; //column

    this.fillStyle = opts.fillStyle;
    this.bowing = opts.bowing ? opts.bowing : 0;
    this.interactive = typeof opts.interactive === 'undefined' ? true : opts.interactive; // new width

    this.initChartValues(opts); // create the chart

    this.drawChart = this.resolveData(opts.data);
    this.drawChart();
    if (opts.title !== 'undefined') this.setTitle(opts.title);
  }

  _createClass(Bar, [{
    key: "initChartValues",
    value: function initChartValues(opts) {
      var width = opts.width ? opts.width : 350;
      var height = opts.height ? opts.height : 450;
      this.width = width - this.margin.left - this.margin.right;
      this.height = height - this.margin.top - this.margin.bottom;
      this.roughId = this.el + "_svg";
      this.graphClass = this.el.substring(1, this.el.length);
      this.interactionG = "g." + this.graphClass;
      this.setSvg();
    }
  }, {
    key: "setSvg",
    value: function setSvg() {
      this.svg = (0, _d3Selection.select)(this.el).append('svg').attr('width', this.width + this.margin.left + this.margin.right).attr('height', this.height + this.margin.top + this.margin.bottom).append("g").attr('id', this.roughId).attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
      console.log(this.graphClass, this.height);
    } // add this to abstract base

  }, {
    key: "resolveData",
    value: function resolveData(data) {
      var _this = this;

      if (typeof data === 'string') {
        if (data.includes('.csv')) {
          return function () {
            (0, _d3Fetch.csv)(data).then(function (d) {
              console.log(d);
              _this.data = d;

              _this.draw();
            });
          };
        } else if (data.includes('.tsv')) {
          return function () {
            (0, _d3Fetch.tsv)(data).then(function (d) {
              _this.data = d;

              _this.draw();
            });
          };
        }
      } else {
        return function () {
          _this.data = data.map(function (elem) {
            return {
              'x': elem[0],
              'y': elem[1]
            };
          });
          _this.x = "x";
          _this.y = "y";

          _this.draw();
        };
      }
    }
  }, {
    key: "addScales",
    value: function addScales() {
      var that = this;
      this.xScale = (0, _d3Scale.scaleBand)().rangeRound([0, this.width]).padding(0.1).domain(this.data.map(function (d) {
        return d[that.labels];
      }));
      this.yScale = (0, _d3Scale.scaleLinear)().rangeRound([this.height, 0]).domain([0, (0, _d3Array.max)(this.data, function (d) {
        return +d[that.values];
      })]);
    }
  }, {
    key: "addAxes",
    value: function addAxes() {
      // AXES
      var xAxis = (0, _d3Axis.axisBottom)().scale(this.xScale);
      var yAxis = (0, _d3Axis.axisLeft)().scale(this.yScale); // x-axis

      this.svg.append("g").attr("transform", "translate(0," + this.height + ")").call((0, _d3Axis.axisBottom)(this.xScale)).attr('class', "xAxis".concat(this.graphClass)).selectAll("text").attr("transform", "translate(-10,0)rotate(-45)").style("text-anchor", "end").style('font-family', 'Gaegu').style('font-size', '.95rem').style('opacity', .85); // y-axis

      this.svg.append("g").call((0, _d3Axis.axisLeft)(this.yScale)).attr('class', "yAxis".concat(this.graphClass)).selectAll('text').style('font-family', 'Gaegu').style('font-size', '.95  rem').style('opacity', .85); // hide original axes

      (0, _d3Selection.selectAll)('path.domain').attr('stroke', 'transparent');
    }
  }, {
    key: "makeAxesRough",
    value: function makeAxesRough(roughSvg, rcAxis) {
      var xAxisClass = "xAxis".concat(this.graphClass);
      var yAxisClass = "yAxis".concat(this.graphClass);
      var roughXAxisClass = "rough-".concat(xAxisClass);
      var roughYAxisClass = "rough-".concat(yAxisClass);
      (0, _d3Selection.select)(".".concat(xAxisClass)).selectAll('path.domain').each(function (d, i) {
        var pathD = (0, _d3Selection.select)(this).node().getAttribute('d');
        var roughXAxis = rcAxis.path(pathD, {
          stroke: 'black',
          fillStyle: 'hachure',
          roughness: 1.
        });
        roughXAxis.setAttribute('class', roughXAxisClass);
        roughSvg.appendChild(roughXAxis);
      });
      (0, _d3Selection.selectAll)(".".concat(roughXAxisClass)).attr('transform', "translate(0, ".concat(this.height, ")"));
      (0, _d3Selection.select)(".".concat(yAxisClass)).selectAll('path.domain').each(function (d, i) {
        var pathD = (0, _d3Selection.select)(this).node().getAttribute('d');
        var roughYAxis = rcAxis.path(pathD, {
          stroke: 'black',
          fillStyle: 'hachure',
          roughness: 2
        });
        roughYAxis.setAttribute('class', roughYAxisClass);
        roughSvg.appendChild(roughYAxis);
      });
    }
  }, {
    key: "setTitle",
    value: function setTitle(title) {
      this.svg.append("text").attr("x", this.width / 2).attr("y", 0 - this.margin.top / 2).attr('class', 'title').attr("text-anchor", "middle").style("font-size", "2rem").style('font-family', 'Gaegu').style('opacity', .8).text(title);
    }
  }, {
    key: "addInteraction",
    value: function addInteraction() {
      var _this2 = this;

      // add highlight helper dom nodes
      (0, _d3Selection.selectAll)(this.interactionG).data(this.data).append('rect').attr('x', function (d) {
        return _this2.xScale(d[_this2.labels]);
      }).attr('y', function (d) {
        return _this2.yScale(+d[_this2.values]);
      }).attr('width', this.xScale.bandwidth()).attr('height', function (d) {
        return _this2.height - _this2.yScale(+d[_this2.values]);
      }).attr('fill', 'transparent'); // create tooltip

      var Tooltip = (0, _d3Selection.select)(this.el).append("div").style("opacity", 0).attr("class", "tooltip").style('position', 'absolute').style("background-color", 'white').style("border", "solid").style("border-width", "1px").style("border-radius", "5px").style("padding", "3px").style('font-family', 'Gaegu').style('font-size', '.9rem').style('pointer-events', 'none'); // event functions

      var mouseover = function mouseover(d) {
        Tooltip.style("opacity", 1);
      };

      var that = this;

      var mousemove = function mousemove(d) {
        var attrX = (0, _d3Selection.select)(this).attr('attrX');
        var attrY = (0, _d3Selection.select)(this).attr('attrY');
        var mousePos = (0, _d3Selection.mouse)(this); // get size of enclosing div

        Tooltip.html("".concat(attrX, ": ").concat(attrY)).style('opacity', .95).attr('class', function (d) {}).style('transform', "translate(".concat(mousePos[0] + that.margin.left, "px, \n                            ").concat(mousePos[1] - (that.height + that.margin.top + that.margin.bottom), "px)"));
      };

      var mouseleave = function mouseleave(d) {
        Tooltip.style("opacity", 0);
      }; // d3 event handlers


      (0, _d3Selection.selectAll)(this.interactionG).on('mouseover', function () {
        mouseover();
        (0, _d3Selection.select)(this).select('path').style('stroke', that.highlight);
      });
      (0, _d3Selection.selectAll)(this.interactionG).on('mouseout', function () {
        mouseleave();
        (0, _d3Selection.select)(this).select('path').style('stroke', that.color);
      });
      (0, _d3Selection.selectAll)(this.interactionG).on('mousemove', mousemove);
    }
  }, {
    key: "initRoughObjects",
    value: function initRoughObjects() {
      this.roughSvg = document.getElementById(this.roughId);
      this.rcAxis = _rough.default.svg(this.roughSvg, {
        options: {
          strokeWidth: this.strokeWidth >= 3 ? 3 : this.strokeWidth
        }
      });
      this.rc = _rough.default.svg(this.roughSvg, {
        options: {
          fill: this.color,
          stroke: this.stroke,
          strokeWidth: this.strokeWidth,
          roughness: this.roughness,
          bowing: this.bowing,
          fillStyle: this.fillStyle
        }
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this3 = this;

      this.initRoughObjects();
      this.addScales();
      this.addAxes();
      this.makeAxesRough(this.roughSvg, this.rcAxis); // Add barplot

      this.data.forEach(function (d) {
        var node = _this3.rc.rectangle(_this3.xScale(d[_this3.labels]), _this3.yScale(+d[_this3.values]), _this3.xScale.bandwidth(), _this3.height - _this3.yScale(+d[_this3.values]));

        var roughNode = _this3.roughSvg.appendChild(node);

        roughNode.setAttribute('class', _this3.graphClass);
        roughNode.setAttribute('attrX', d[_this3.labels]);
        roughNode.setAttribute('attrY', +d[_this3.values]);
      }); // If desired, add interactivity

      if (this.interactive === true) {
        this.addInteraction();
      }
    } // draw 

  }]);

  return Bar;
}();

var _default = Bar;
exports.default = _default;
},{"d3-array":"../node_modules/d3-array/src/index.js","d3-axis":"../node_modules/d3-axis/src/index.js","d3-fetch":"../node_modules/d3-fetch/src/index.js","d3-scale":"../node_modules/d3-scale/src/index.js","d3-selection":"../node_modules/d3-selection/src/index.js","roughjs/dist/rough.umd":"../node_modules/roughjs/dist/rough.umd.js"}],"../src/BarH.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _d3Array = require("d3-array");

var _d3Axis = require("d3-axis");

var _d3Fetch = require("d3-fetch");

var _d3Scale = require("d3-scale");

var _d3Selection = require("d3-selection");

var _rough = _interopRequireDefault(require("roughjs/dist/rough.umd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var roughCeiling = function roughCeiling(roughness) {
  var roughVal = roughness > 20 ? 20 : roughness;
  return roughVal;
};

var BarH =
/*#__PURE__*/
function () {
  // same methods
  // roughCeiling
  // initChartValues
  // setSvg
  // resolveData
  // setTitle
  // initRoughObjects
  function BarH(opts) {
    _classCallCheck(this, BarH);

    // load in arguments from config object
    this.el = opts.element; // this.data = opts.data;

    this.element = opts.element;
    this.margin = opts.margin ? opts.margin : {
      top: 50,
      right: 20,
      bottom: 50,
      left: 100
    };
    this.title = opts.title;
    this.color = opts.color ? opts.color : 'skyblue';
    this.highlight = opts.highlight ? opts.highlight : 'coral';
    this.roughness = opts.roughness ? roughCeiling(opts.roughness) : 1;
    this.stroke = opts.stroke ? opts.stroke : 'black';
    this.strokeWidth = opts.strokeWidth ? opts.strokeWidth : 0.6;
    this.labels = opts.labels; //label

    this.values = opts.values; //column

    this.fillStyle = opts.fillStyle;
    this.bowing = opts.bowing ? opts.bowing : 0;
    this.interactive = typeof opts.interactive === 'undefined' ? true : opts.interactive; // new width

    this.initChartValues(opts); // create the chart

    this.drawChart = this.resolveData(opts.data);
    this.drawChart();
    if (opts.title !== 'undefined') this.setTitle(opts.title);
  }

  _createClass(BarH, [{
    key: "initChartValues",
    value: function initChartValues(opts) {
      var width = opts.width ? opts.width : 350;
      var height = opts.height ? opts.height : 450;
      this.width = width - this.margin.left - this.margin.right;
      this.height = height - this.margin.top - this.margin.bottom;
      this.roughId = this.el + "_svg";
      this.graphClass = this.el.substring(1, this.el.length);
      this.interactionG = "g." + this.graphClass;
      this.setSvg();
    }
  }, {
    key: "setSvg",
    value: function setSvg() {
      this.svg = (0, _d3Selection.select)(this.el).append('svg').attr('width', this.width + this.margin.left + this.margin.right).attr('height', this.height + this.margin.top + this.margin.bottom).append("g").attr('id', this.roughId).attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
      console.log(this.graphClass, this.height);
    } // add this to abstract base

  }, {
    key: "resolveData",
    value: function resolveData(data) {
      var _this = this;

      if (typeof data === 'string') {
        if (data.includes('.csv')) {
          return function () {
            (0, _d3Fetch.csv)(data).then(function (d) {
              console.log(d);
              _this.data = d;

              _this.draw();
            });
          };
        } else if (data.includes('.tsv')) {
          return function () {
            (0, _d3Fetch.tsv)(data).then(function (d) {
              _this.data = d;

              _this.draw();
            });
          };
        }
      } else {
        return function () {
          _this.data = data.map(function (elem) {
            return {
              'x': elem[0],
              'y': elem[1]
            };
          });
          _this.x = "x";
          _this.y = "y";

          _this.draw();
        };
      }
    }
  }, {
    key: "addScales",
    value: function addScales() {
      var that = this;
      this.yScale = (0, _d3Scale.scaleBand)().rangeRound([0, this.height]).padding(0.1).domain(this.data.map(function (d) {
        return d[that.labels];
      }));
      this.xScale = (0, _d3Scale.scaleLinear)().rangeRound([0, this.width]).domain([0, (0, _d3Array.max)(this.data, function (d) {
        return +d[that.values];
      })]);
    }
  }, {
    key: "addAxes",
    value: function addAxes() {
      // AXES
      var xAxis = (0, _d3Axis.axisBottom)().scale(this.xScale);
      var yAxis = (0, _d3Axis.axisLeft)().scale(this.yScale); // x-axis

      this.svg.append("g").attr("transform", "translate(0, ".concat(this.height, ")")).call((0, _d3Axis.axisBottom)(this.xScale)).attr('class', "xAxis".concat(this.graphClass)).selectAll("text").attr("transform", "translate(-10,0)rotate(-45)").style("text-anchor", "end").style('font-family', 'Gaegu').style('font-size', '.95rem').style('opacity', .85); // y-axis

      this.svg.append("g").call((0, _d3Axis.axisLeft)(this.yScale)).attr('class', "yAxis".concat(this.graphClass)).selectAll('text').style('font-family', 'Gaegu').style('font-size', '.95rem').style('opacity', .85); // hide original axes

      (0, _d3Selection.selectAll)('path.domain').attr('stroke', 'transparent');
    }
  }, {
    key: "makeAxesRough",
    value: function makeAxesRough(roughSvg, rcAxis) {
      var xAxisClass = "xAxis".concat(this.graphClass);
      var yAxisClass = "yAxis".concat(this.graphClass);
      var roughXAxisClass = "rough-".concat(xAxisClass);
      var roughYAxisClass = "rough-".concat(yAxisClass);
      (0, _d3Selection.select)(".".concat(xAxisClass)).selectAll('path.domain').each(function (d, i) {
        var pathD = (0, _d3Selection.select)(this).node().getAttribute('d');
        var roughXAxis = rcAxis.path(pathD, {
          stroke: 'black',
          fillStyle: 'hachure',
          roughness: 1.
        });
        roughXAxis.setAttribute('class', roughXAxisClass);
        roughSvg.appendChild(roughXAxis);
      });
      (0, _d3Selection.selectAll)(".".concat(roughXAxisClass)).attr('transform', "translate(0, ".concat(this.height, ")"));
      (0, _d3Selection.select)(".".concat(yAxisClass)).selectAll('path.domain').each(function (d, i) {
        var pathD = (0, _d3Selection.select)(this).node().getAttribute('d');
        var roughYAxis = rcAxis.path(pathD, {
          stroke: 'black',
          fillStyle: 'hachure',
          roughness: 2
        });
        roughYAxis.setAttribute('class', roughYAxisClass);
        roughSvg.appendChild(roughYAxis);
      });
    }
  }, {
    key: "setTitle",
    value: function setTitle(title) {
      this.svg.append("text").attr("x", this.width / 2).attr("y", 0 - this.margin.top / 2).attr('class', 'title').attr("text-anchor", "middle").style("font-size", "2rem").style('font-family', 'Gaegu').style('opacity', .8).text(title);
    }
  }, {
    key: "addInteraction",
    value: function addInteraction() {
      var _this2 = this;

      // add highlight helper dom nodes
      (0, _d3Selection.selectAll)(this.interactionG).data(this.data).append('rect').attr('x', 0).attr('y', function (d) {
        return _this2.yScale(d[_this2.labels]);
      }).attr('width', function (d) {
        return _this2.xScale(+d[_this2.values]);
      }).attr('height', this.yScale.bandwidth()).attr('fill', 'transparent'); // create tooltip

      var Tooltip = (0, _d3Selection.select)(this.el).append("div").style("opacity", 0).attr("class", "tooltip").style('position', 'absolute').style("background-color", 'white').style("border", "solid").style("border-width", "1px").style("border-radius", "5px").style("padding", "3px").style('font-family', 'Gaegu').style('font-size', '.9rem').style('pointer-events', 'none'); // event functions

      var mouseover = function mouseover(d) {
        Tooltip.style("opacity", 1);
      };

      var that = this;

      var mousemove = function mousemove(d) {
        var attrX = (0, _d3Selection.select)(this).attr('attrX');
        var attrY = (0, _d3Selection.select)(this).attr('attrY');
        var mousePos = (0, _d3Selection.mouse)(this); // get size of enclosing div

        Tooltip.html("".concat(attrX, ": ").concat(attrY)).style('opacity', .95).attr('class', function (d) {}).style('transform', "translate(".concat(mousePos[0] + that.margin.left, "px, \n                            ").concat(mousePos[1] - (that.height + that.margin.top + that.margin.bottom), "px)"));
      };

      var mouseleave = function mouseleave(d) {
        Tooltip.style("opacity", 0);
      }; // d3 event handlers


      (0, _d3Selection.selectAll)(this.interactionG).on('mouseover', function () {
        mouseover();
        (0, _d3Selection.select)(this).select('path').style('stroke', that.highlight);
      });
      (0, _d3Selection.selectAll)(this.interactionG).on('mouseout', function () {
        mouseleave();
        (0, _d3Selection.select)(this).select('path').style('stroke', that.color);
      });
      (0, _d3Selection.selectAll)(this.interactionG).on('mousemove', mousemove);
    }
  }, {
    key: "initRoughObjects",
    value: function initRoughObjects() {
      this.roughSvg = document.getElementById(this.roughId);
      this.rcAxis = _rough.default.svg(this.roughSvg, {
        options: {
          strokeWidth: this.strokeWidth >= 3 ? 3 : this.strokeWidth
        }
      });
      this.rc = _rough.default.svg(this.roughSvg, {
        options: {
          fill: this.color,
          stroke: this.stroke,
          strokeWidth: this.strokeWidth,
          roughness: this.roughness,
          bowing: this.bowing,
          fillStyle: this.fillStyle
        }
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this3 = this;

      this.initRoughObjects();
      this.addScales();
      this.addAxes();
      this.makeAxesRough(this.roughSvg, this.rcAxis); // Add barplot

      this.data.forEach(function (d) {
        var node = _this3.rc.rectangle(0, _this3.yScale(d[_this3.labels]), _this3.xScale(+d[_this3.values]), _this3.yScale.bandwidth());

        var roughNode = _this3.roughSvg.appendChild(node);

        roughNode.setAttribute('class', _this3.graphClass);
        roughNode.setAttribute('attrX', d[_this3.labels]);
        roughNode.setAttribute('attrY', +d[_this3.values]);
      }); // If desired, add interactivity

      if (this.interactive === true) {
        this.addInteraction();
      }
    } // draw 

  }]);

  return BarH;
}();

var _default = BarH;
exports.default = _default;
},{"d3-array":"../node_modules/d3-array/src/index.js","d3-axis":"../node_modules/d3-axis/src/index.js","d3-fetch":"../node_modules/d3-fetch/src/index.js","d3-scale":"../node_modules/d3-scale/src/index.js","d3-selection":"../node_modules/d3-selection/src/index.js","roughjs/dist/rough.umd":"../node_modules/roughjs/dist/rough.umd.js"}],"../src/index.js":[function(require,module,exports) {
"use strict";

var _roughjs = _interopRequireDefault(require("roughjs"));

var _bool = _interopRequireDefault(require("./bool"));

var _Bar = _interopRequireDefault(require("./Bar"));

var _BarH = _interopRequireDefault(require("./BarH"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  Bar: _Bar.default,
  BarH: _BarH.default
};
},{"roughjs":"../node_modules/roughjs/dist/rough.js","./bool":"../src/bool.js","./Bar":"../src/Bar.js","./BarH":"../src/BarH.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _src = _interopRequireDefault(require("../src"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_src.default);
new _src.default.BarH({
  element: '#vis0',
  // data: [[1,2], [5, 6], [8,8], [5, 100], [200, 10], [50, 50]],
  data: "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv",
  title: "Country Count",
  labels: 'Country',
  values: 'Value',
  width: 400,
  height: 500,
  margin: {
    left: 150,
    top: 50,
    right: 10,
    bottom: 90
  },
  roughness: 1.75
});
new _src.default.Bar({
  element: '#vis1',
  data: "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv",
  title: "Olympic Medals by Country",
  labels: 'Country',
  values: 'Value',
  width: 700,
  roughness: 4.5,
  color: 'red',
  strokeWidth: 2.5,
  // bowing: 1,
  fillStyle: '',
  height: 500,
  margin: {
    bottom: 90,
    top: 50,
    right: 40,
    left: 90
  },
  highlight: 'yellow' // interactive

});
new _src.default.Bar({
  element: '#vis2',
  data: "https://gist.githubusercontent.com/mbostock/3310560/raw/98311dc46685ed02588afdcb69e5fa296febc1eb/letter-frequency.tsv",
  title: "Letter Frequency",
  labels: 'letter',
  values: 'frequency',
  width: 700,
  roughness: 2.5,
  color: 'tan',
  strokeWidth: 1.5,
  // bowing: 1,
  fillStyle: 'solid',
  height: 500,
  margin: {
    bottom: 90,
    top: 50,
    right: 40,
    left: 90 // interactive

  }
});
new _src.default.BarH({
  element: '#vis3',
  // data: [[1,2], [5, 6], [8,8], [5, 100], [200, 10], [50, 50]],
  data: "https://gist.githubusercontent.com/mbostock/3310560/raw/98311dc46685ed02588afdcb69e5fa296febc1eb/letter-frequency.tsv",
  title: "Letters",
  labels: 'letter',
  values: 'frequency',
  width: 400,
  height: 500,
  color: 'black',
  margin: {
    left: 150,
    top: 50,
    right: 10,
    bottom: 90
  },
  roughness: 0.5
});
new _src.default.BarH({
  element: '#vis4',
  data: "https://raw.githubusercontent.com/plotly/datasets/master/2010_alcohol_consumption_by_country.csv",
  title: "Alcohol Rate by Country",
  values: 'alcohol',
  labels: 'location',
  width: screen.width * .8,
  roughness: 0,
  color: 'green',
  strokeWidth: 1.,
  // bowing: 1,
  fillStyle: 'cross-hatch',
  highlight: 'blue',
  height: 3800,
  margin: {
    bottom: 90,
    top: 50,
    right: 40,
    left: 140 // interactive

  }
}); // new roughBars.BarH (
// {
//   element: '#vis5',
//     // data: [[1,2], [5, 6], [8,8], [5, 100], [200, 10], [50, 50]],
//     data: "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv",
//     title: `Country Count`,
//     labels: 'Country',
//     values: 'Value',
//     width: 400,
//     height: 500,
//     margin: {left: 150, top: 50, right: 10, bottom: 90},
//     roughness: 2.5,
// }
// );
},{"../src":"../src/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50071" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/examples.e31bb0bc.js.map