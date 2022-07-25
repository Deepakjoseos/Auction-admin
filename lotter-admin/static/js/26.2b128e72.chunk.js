(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[26,39],{1309:function(e,t,a){"use strict";a.r(t);a(0);var n=a(80),c=a(580),r=a(3392),o=a(615),l=a(554),i=a(2),s=function(){return Object(i.jsx)(n.a,{})};t.default=function(){return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Loading"}),Object(i.jsxs)("div",{className:"mt-4",children:[Object(i.jsx)(c.default,{name:"Location",desc:"src/components/shared-components/Loading.js"}),Object(i.jsx)(c.default,{name:"Description",desc:"Loading component"}),Object(i.jsx)("div",{className:"mt-4",children:Object(i.jsxs)(l.a,{title:"Example",children:[Object(i.jsx)(s,{}),Object(i.jsx)("div",{className:"mt-4",children:Object(i.jsx)(r.a,{className:"hl-code",language:"jsx",style:o.a,children:"import React, { useState } from 'react'\nimport Loading from 'components/shared-components/Loading'\n\nexport default const Demo = () =>  {\n\treturn (\n\t\t<Loading />\n\t)\n}\n"})})]})}),Object(i.jsx)("h4",{className:"mt-4",children:"Props"}),Object(i.jsx)("div",{className:"api-container border-0 p-0",children:Object(i.jsxs)("table",{children:[Object(i.jsx)("thead",{children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("th",{children:"Property"}),Object(i.jsx)("th",{children:"Description"}),Object(i.jsx)("th",{children:"Type"}),Object(i.jsx)("th",{children:"Default"})]})}),Object(i.jsxs)("tbody",{children:[Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"align"}),Object(i.jsx)("td",{children:"position indicator"}),Object(i.jsx)("td",{children:"center | left | right"}),Object(i.jsx)("td",{children:"center"})]}),Object(i.jsxs)("tr",{children:[Object(i.jsx)("td",{children:"cover"}),Object(i.jsx)("td",{children:"Loading display coverage"}),Object(i.jsx)("td",{children:"inline | content | page"}),Object(i.jsx)("td",{children:"inline"})]})]})]})})]})]})}},554:function(e,t,a){"use strict";var n=a(4),c=a(3),r=a(0),o=a(5),l=a.n(o),i=a(33),s=a(41),d=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(n=Object.getOwnPropertySymbols(e);c<n.length;c++)t.indexOf(n[c])<0&&Object.prototype.propertyIsEnumerable.call(e,n[c])&&(a[n[c]]=e[n[c]])}return a},b=function(e){var t=e.prefixCls,a=e.className,o=e.hoverable,i=void 0===o||o,b=d(e,["prefixCls","className","hoverable"]);return r.createElement(s.a,null,(function(e){var o=(0,e.getPrefixCls)("card",t),s=l()("".concat(o,"-grid"),a,Object(n.a)({},"".concat(o,"-grid-hoverable"),i));return r.createElement("div",Object(c.a)({},b,{className:s}))}))},m=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(n=Object.getOwnPropertySymbols(e);c<n.length;c++)t.indexOf(n[c])<0&&Object.prototype.propertyIsEnumerable.call(e,n[c])&&(a[n[c]]=e[n[c]])}return a},p=function(e){return r.createElement(s.a,null,(function(t){var a=t.getPrefixCls,n=e.prefixCls,o=e.className,i=e.avatar,s=e.title,d=e.description,b=m(e,["prefixCls","className","avatar","title","description"]),p=a("card",n),u=l()("".concat(p,"-meta"),o),j=i?r.createElement("div",{className:"".concat(p,"-meta-avatar")},i):null,h=s?r.createElement("div",{className:"".concat(p,"-meta-title")},s):null,O=d?r.createElement("div",{className:"".concat(p,"-meta-description")},d):null,g=h||O?r.createElement("div",{className:"".concat(p,"-meta-detail")},h,O):null;return r.createElement("div",Object(c.a)({},b,{className:u}),j,g)}))},u=a(551),j=a(547),h=a(548),O=a(54),g=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(n=Object.getOwnPropertySymbols(e);c<n.length;c++)t.indexOf(n[c])<0&&Object.prototype.propertyIsEnumerable.call(e,n[c])&&(a[n[c]]=e[n[c]])}return a};var f=function(e){var t,a,o,d=r.useContext(s.b),m=d.getPrefixCls,p=d.direction,f=r.useContext(O.b),y=e.prefixCls,v=e.className,x=e.extra,E=e.headStyle,C=void 0===E?{}:E,N=e.bodyStyle,F=void 0===N?{}:N,w=e.title,S=e.loading,P=e.bordered,k=void 0===P||P,A=e.size,z=e.type,T=e.cover,B=e.actions,D=e.tabList,L=e.children,H=e.activeTabKey,M=e.defaultActiveTabKey,K=e.tabBarExtraContent,I=e.hoverable,W=e.tabProps,R=void 0===W?{}:W,J=g(e,["prefixCls","className","extra","headStyle","bodyStyle","title","loading","bordered","size","type","cover","actions","tabList","children","activeTabKey","defaultActiveTabKey","tabBarExtraContent","hoverable","tabProps"]),G=m("card",y),q=0===F.padding||"0px"===F.padding?{padding:24}:void 0,Q=r.createElement("div",{className:"".concat(G,"-loading-block")}),U=r.createElement("div",{className:"".concat(G,"-loading-content"),style:q},r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:22},Q)),r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:8},Q),r.createElement(h.a,{span:15},Q)),r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:6},Q),r.createElement(h.a,{span:18},Q)),r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:13},Q),r.createElement(h.a,{span:9},Q)),r.createElement(j.a,{gutter:8},r.createElement(h.a,{span:4},Q),r.createElement(h.a,{span:3},Q),r.createElement(h.a,{span:16},Q))),V=void 0!==H,X=Object(c.a)(Object(c.a)({},R),(t={},Object(n.a)(t,V?"activeKey":"defaultActiveKey",V?H:M),Object(n.a)(t,"tabBarExtraContent",K),t)),Y=D&&D.length?r.createElement(u.a,Object(c.a)({size:"large"},X,{className:"".concat(G,"-head-tabs"),onChange:function(t){var a;null===(a=e.onTabChange)||void 0===a||a.call(e,t)}}),D.map((function(e){return r.createElement(u.a.TabPane,{tab:e.tab,disabled:e.disabled,key:e.key})}))):null;(w||x||Y)&&(o=r.createElement("div",{className:"".concat(G,"-head"),style:C},r.createElement("div",{className:"".concat(G,"-head-wrapper")},w&&r.createElement("div",{className:"".concat(G,"-head-title")},w),x&&r.createElement("div",{className:"".concat(G,"-extra")},x)),Y));var Z=T?r.createElement("div",{className:"".concat(G,"-cover")},T):null,$=r.createElement("div",{className:"".concat(G,"-body"),style:F},S?U:L),_=B&&B.length?r.createElement("ul",{className:"".concat(G,"-actions")},function(e){return e.map((function(t,a){return r.createElement("li",{style:{width:"".concat(100/e.length,"%")},key:"action-".concat(a)},r.createElement("span",null,t))}))}(B)):null,ee=Object(i.a)(J,["onTabChange"]),te=A||f,ae=l()(G,(a={},Object(n.a)(a,"".concat(G,"-loading"),S),Object(n.a)(a,"".concat(G,"-bordered"),k),Object(n.a)(a,"".concat(G,"-hoverable"),I),Object(n.a)(a,"".concat(G,"-contain-grid"),function(){var t;return r.Children.forEach(e.children,(function(e){e&&e.type&&e.type===b&&(t=!0)})),t}()),Object(n.a)(a,"".concat(G,"-contain-tabs"),D&&D.length),Object(n.a)(a,"".concat(G,"-").concat(te),te),Object(n.a)(a,"".concat(G,"-type-").concat(z),!!z),Object(n.a)(a,"".concat(G,"-rtl"),"rtl"===p),a),v);return r.createElement("div",Object(c.a)({},ee,{className:ae}),o,Z,$,_)};f.Grid=b,f.Meta=p;t.a=f},580:function(e,t,a){"use strict";a.r(t);a(0);var n=a(2);t.default=function(e){var t=e.name,a=e.desc;return Object(n.jsxs)("div",{className:"mb-3",children:[Object(n.jsxs)("span",{className:"font-weight-bold text-dark",children:[t,":"]}),Object(n.jsxs)("span",{className:"text-gray-light",children:[" ",a]})]})}},615:function(e,t,a){"use strict";t.a={'code[class*="language-"]':{color:"#c5c8c6",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#c5c8c6",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",borderRadius:"0.3em",background:"#1d1f21"},':not(pre) > code[class*="language-"]':{background:"#1d1f21",padding:".1em",borderRadius:".3em"},comment:{color:"#7C7C7C"},prolog:{color:"#7C7C7C"},doctype:{color:"#7C7C7C"},cdata:{color:"#7C7C7C"},punctuation:{color:"#c5c8c6"},".namespace":{Opacity:".7"},property:{color:"#96CBFE"},keyword:{color:"#96CBFE"},tag:{color:"#96CBFE"},"class-name":{color:"#FFFFB6",textDecoration:"underline"},boolean:{color:"#99CC99"},constant:{color:"#99CC99"},symbol:{color:"#f92672"},deleted:{color:"#f92672"},number:{color:"#FF73FD"},selector:{color:"#A8FF60"},"attr-name":{color:"#A8FF60"},string:{color:"#A8FF60"},char:{color:"#A8FF60"},builtin:{color:"#A8FF60"},inserted:{color:"#A8FF60"},variable:{color:"#C6C5FE"},operator:{color:"#EDEDED"},entity:{color:"#FFFFB6",cursor:"help"},url:{color:"#96CBFE"},".language-css .token.string":{color:"#87C38A"},".style .token.string":{color:"#87C38A"},atrule:{color:"#F9EE98"},"attr-value":{color:"#F9EE98"},function:{color:"#DAD085"},regex:{color:"#E9C062"},important:{color:"#fd971f",fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}}}}]);
//# sourceMappingURL=26.2b128e72.chunk.js.map