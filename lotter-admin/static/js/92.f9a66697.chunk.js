(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[92],{1129:function(e,t,a){"use strict";var c=a(69),n=a(0),r=a(31),s=a(513),l=a(1049),i=a(692),o=a(616),d=a(494),m=a(113),b=a(59),u=a(40),p=a(1113),j=a(2),g={email:[{required:!0,message:"Please input your email address"},{type:"email",message:"Please enter a validate email!"}],password:[{required:!0,message:"Please input your password"}],confirm:[{required:!0,message:"Please confirm your password!"},function(e){var t=e.getFieldValue;return{validator:function(e,a){return a&&t("password")!==a?Promise.reject("Passwords do not match!"):Promise.resolve()}}}]},f={signUp:b.j,showAuthMessage:b.c,hideAuthMessage:b.b,showLoading:b.d};t.a=Object(r.b)((function(e){var t=e.auth;return{loading:t.loading,message:t.message,showMessage:t.showMessage,token:t.token,redirect:t.redirect}}),f)((function(e){var t=e.signUp,a=e.showLoading,r=e.token,b=e.loading,f=e.redirect,h=e.message,O=e.showMessage,v=e.hideAuthMessage,y=e.allowRedirect,x=i.a.useForm(),E=Object(c.a)(x,1)[0],w=Object(u.g)();return Object(n.useEffect)((function(){null!==r&&y&&w.push(f),O&&setTimeout((function(){v()}),3e3)})),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(p.a.div,{initial:{opacity:0,marginBottom:0},animate:{opacity:O?1:0,marginBottom:O?20:0},children:Object(j.jsx)(o.a,{type:"error",showIcon:!0,message:h})}),Object(j.jsxs)(i.a,{form:E,layout:"vertical",name:"register-form",onFinish:function(){E.validateFields().then((function(e){a(),t(e)})).catch((function(e){console.log("Validate Failed:",e)}))},children:[Object(j.jsx)(i.a.Item,{name:"email",label:"Email",rules:g.email,hasFeedback:!0,children:Object(j.jsx)(d.a,{prefix:Object(j.jsx)(s.a,{className:"text-primary"})})}),Object(j.jsx)(i.a.Item,{name:"password",label:"Password",rules:g.password,hasFeedback:!0,children:Object(j.jsx)(d.a.Password,{prefix:Object(j.jsx)(l.a,{className:"text-primary"})})}),Object(j.jsx)(i.a.Item,{name:"confirm",label:"ConfirmPassword",rules:g.confirm,hasFeedback:!0,children:Object(j.jsx)(d.a.Password,{prefix:Object(j.jsx)(l.a,{className:"text-primary"})})}),Object(j.jsx)(i.a.Item,{children:Object(j.jsx)(m.a,{type:"primary",htmlType:"submit",block:!0,loading:b,children:"Sign Up"})})]})]})}))},3385:function(e,t,a){"use strict";a.r(t);var c=a(15),n=(a(0),a(1129)),r=a(547),s=a(548),l=a(554),i=a(31),o=a(2),d={backgroundImage:"url(/img/others/img-17.jpg)",backgroundRepeat:"no-repeat",backgroundSize:"cover"};t.default=function(e){var t=Object(i.d)((function(e){return e.theme.currentTheme}));return Object(o.jsx)("div",{className:"h-100",style:d,children:Object(o.jsx)("div",{className:"container d-flex flex-column justify-content-center h-100",children:Object(o.jsx)(r.a,{justify:"center",children:Object(o.jsx)(s.a,{xs:20,sm:20,md:20,lg:7,children:Object(o.jsx)(l.a,{children:Object(o.jsxs)("div",{className:"my-2",children:[Object(o.jsxs)("div",{className:"text-center",children:[Object(o.jsx)("img",{className:"img-fluid",src:"/img/".concat("light"===t?"logo.png":"logo-white.png"),alt:""}),Object(o.jsx)("p",{className:"text-muted",children:"Create a new account:"})]}),Object(o.jsx)(r.a,{justify:"center",children:Object(o.jsx)(s.a,{xs:24,sm:24,md:20,lg:20,children:Object(o.jsx)(n.a,Object(c.a)({},e))})})]})})})})})})}},554:function(e,t,a){"use strict";var c=a(4),n=a(3),r=a(0),s=a(5),l=a.n(s),i=a(33),o=a(41),d=function(e,t){var a={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(a[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(c=Object.getOwnPropertySymbols(e);n<c.length;n++)t.indexOf(c[n])<0&&Object.prototype.propertyIsEnumerable.call(e,c[n])&&(a[c[n]]=e[c[n]])}return a},m=function(e){var t=e.prefixCls,a=e.className,s=e.hoverable,i=void 0===s||s,m=d(e,["prefixCls","className","hoverable"]);return r.createElement(o.a,null,(function(e){var s=(0,e.getPrefixCls)("card",t),o=l()("".concat(s,"-grid"),a,Object(c.a)({},"".concat(s,"-grid-hoverable"),i));return r.createElement("div",Object(n.a)({},m,{className:o}))}))},b=function(e,t){var a={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(a[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(c=Object.getOwnPropertySymbols(e);n<c.length;n++)t.indexOf(c[n])<0&&Object.prototype.propertyIsEnumerable.call(e,c[n])&&(a[c[n]]=e[c[n]])}return a},u=function(e){return r.createElement(o.a,null,(function(t){var a=t.getPrefixCls,c=e.prefixCls,s=e.className,i=e.avatar,o=e.title,d=e.description,m=b(e,["prefixCls","className","avatar","title","description"]),u=a("card",c),p=l()("".concat(u,"-meta"),s),j=i?r.createElement("div",{className:"".concat(u,"-meta-avatar")},i):null,g=o?r.createElement("div",{className:"".concat(u,"-meta-title")},o):null,f=d?r.createElement("div",{className:"".concat(u,"-meta-description")},d):null,h=g||f?r.createElement("div",{className:"".concat(u,"-meta-detail")},g,f):null;return r.createElement("div",Object(n.a)({},m,{className:p}),j,h)}))},p=a(551),j=a(547),g=a(548),f=a(54),h=function(e,t){var a={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(a[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(c=Object.getOwnPropertySymbols(e);n<c.length;n++)t.indexOf(c[n])<0&&Object.prototype.propertyIsEnumerable.call(e,c[n])&&(a[c[n]]=e[c[n]])}return a};var O=function(e){var t,a,s,d=r.useContext(o.b),b=d.getPrefixCls,u=d.direction,O=r.useContext(f.b),v=e.prefixCls,y=e.className,x=e.extra,E=e.headStyle,w=void 0===E?{}:E,N=e.bodyStyle,P=void 0===N?{}:N,C=e.title,k=e.loading,S=e.bordered,T=void 0===S||S,F=e.size,I=e.type,M=e.cover,A=e.actions,K=e.tabList,B=e.children,z=e.activeTabKey,L=e.defaultActiveTabKey,q=e.tabBarExtraContent,U=e.hoverable,J=e.tabProps,R=void 0===J?{}:J,V=h(e,["prefixCls","className","extra","headStyle","bodyStyle","title","loading","bordered","size","type","cover","actions","tabList","children","activeTabKey","defaultActiveTabKey","tabBarExtraContent","hoverable","tabProps"]),G=b("card",v),D=0===P.padding||"0px"===P.padding?{padding:24}:void 0,H=r.createElement("div",{className:"".concat(G,"-loading-block")}),Q=r.createElement("div",{className:"".concat(G,"-loading-content"),style:D},r.createElement(j.a,{gutter:8},r.createElement(g.a,{span:22},H)),r.createElement(j.a,{gutter:8},r.createElement(g.a,{span:8},H),r.createElement(g.a,{span:15},H)),r.createElement(j.a,{gutter:8},r.createElement(g.a,{span:6},H),r.createElement(g.a,{span:18},H)),r.createElement(j.a,{gutter:8},r.createElement(g.a,{span:13},H),r.createElement(g.a,{span:9},H)),r.createElement(j.a,{gutter:8},r.createElement(g.a,{span:4},H),r.createElement(g.a,{span:3},H),r.createElement(g.a,{span:16},H))),W=void 0!==z,X=Object(n.a)(Object(n.a)({},R),(t={},Object(c.a)(t,W?"activeKey":"defaultActiveKey",W?z:L),Object(c.a)(t,"tabBarExtraContent",q),t)),Y=K&&K.length?r.createElement(p.a,Object(n.a)({size:"large"},X,{className:"".concat(G,"-head-tabs"),onChange:function(t){var a;null===(a=e.onTabChange)||void 0===a||a.call(e,t)}}),K.map((function(e){return r.createElement(p.a.TabPane,{tab:e.tab,disabled:e.disabled,key:e.key})}))):null;(C||x||Y)&&(s=r.createElement("div",{className:"".concat(G,"-head"),style:w},r.createElement("div",{className:"".concat(G,"-head-wrapper")},C&&r.createElement("div",{className:"".concat(G,"-head-title")},C),x&&r.createElement("div",{className:"".concat(G,"-extra")},x)),Y));var Z=M?r.createElement("div",{className:"".concat(G,"-cover")},M):null,$=r.createElement("div",{className:"".concat(G,"-body"),style:P},k?Q:B),_=A&&A.length?r.createElement("ul",{className:"".concat(G,"-actions")},function(e){return e.map((function(t,a){return r.createElement("li",{style:{width:"".concat(100/e.length,"%")},key:"action-".concat(a)},r.createElement("span",null,t))}))}(A)):null,ee=Object(i.a)(V,["onTabChange"]),te=F||O,ae=l()(G,(a={},Object(c.a)(a,"".concat(G,"-loading"),k),Object(c.a)(a,"".concat(G,"-bordered"),T),Object(c.a)(a,"".concat(G,"-hoverable"),U),Object(c.a)(a,"".concat(G,"-contain-grid"),function(){var t;return r.Children.forEach(e.children,(function(e){e&&e.type&&e.type===m&&(t=!0)})),t}()),Object(c.a)(a,"".concat(G,"-contain-tabs"),K&&K.length),Object(c.a)(a,"".concat(G,"-").concat(te),te),Object(c.a)(a,"".concat(G,"-type-").concat(I),!!I),Object(c.a)(a,"".concat(G,"-rtl"),"rtl"===u),a),y);return r.createElement("div",Object(n.a)({},ee,{className:ae}),s,Z,$,_)};O.Grid=m,O.Meta=u;t.a=O}}]);
//# sourceMappingURL=92.f9a66697.chunk.js.map