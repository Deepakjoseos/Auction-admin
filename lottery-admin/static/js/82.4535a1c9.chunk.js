(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[82],{1130:function(e,t,a){"use strict";var n=a(37),r=a.n(n),c=a(126),o=a(187),l={};l.getBookedLotteries=function(){var e=Object(c.a)(r.a.mark((function e(t){var a,n,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a="".concat("/booked_lottery","/all/admin"),(n=null===t||void 0===t?void 0:t.bookingNumber)&&(a="".concat(a,"?bookingNumber=").concat(n)),e.next=6,Object(o.a)({url:a,method:"get"});case 6:return c=e.sent,e.abrupt("return",c.data);case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0,"show-err");case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),t.a=l},3353:function(e,t,a){"use strict";a.r(t);var n=a(40),r=a(37),c=a.n(r),o=a(126),l=a(69),i=a(0),s=a(188),u=a(493),d=a(537),b=a(688),m=a(237),p=a(152),v=a(565),j=a(127),f=a(45),O=a(1130),g=a(1),y=function(){var e=Object(n.g)(),t=Object(i.useState)([]),a=Object(l.a)(t,2),r=a[0],y=a[1],x=Object(i.useState)([]),h=Object(l.a)(x,2),E=h[0],N=h[1];Object(i.useEffect)((function(){var e=function(){var e=Object(o.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.getBookedLotteries();case 2:(t=e.sent)&&(y(t),N(t));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]);var k=function(t){e.push("/app/dashboards/booking/".concat(t.id))},C=[{title:"Booking",dataIndex:"booking",render:function(e){return Object(g.jsx)(j.a,{alignItems:"center",children:null===e||void 0===e?void 0:e.bookingNumber})},sorter:function(e,t){return e.booking.bookingNumber.localeCompare(t.booking.bookingNumber)}},{title:"Number",dataIndex:"lotteryNumber",sorter:function(e,t){return f.a.antdTableSorter(e,t,"bookingNumber")}},{title:"Count",dataIndex:"count",sorter:function(e,t){return e.count-t.count}},{title:"Date",dataIndex:"drawDate",sorter:function(e,t){return f.a.antdTableSorter(e,t,"drawDate")}},{title:"Paid Amount",dataIndex:"paidAmount",sorter:function(e,t){return e.paidAmount-t.paidAmount}},{title:"Agent",dataIndex:"booking",render:function(e){var t;return Object(g.jsx)(j.a,{alignItems:"center",children:null===e||void 0===e||null===(t=e.agent)||void 0===t?void 0:t.name})},sorter:function(e,t){return e.agent.name.localeCompare(t.booking.agent.name)}},{title:"Lottery",dataIndex:"lottery",render:function(e){return Object(g.jsx)(j.a,{alignItems:"center",children:null===e||void 0===e?void 0:e.name})},sorter:function(e,t){return e.lottery.name.localeCompare(t.lottery.name)}},{title:"Group",dataIndex:"lotteryGroup",render:function(e){return Object(g.jsx)(j.a,{alignItems:"center",children:null===e||void 0===e?void 0:e.group})},sorter:function(e,t){var a,n;return(null===(a=e.lotteryGroup)||void 0===a?void 0:a.group)-(null===(n=t.lotteryGroup)||void 0===n?void 0:n.group)}},{title:"Type",dataIndex:"lotteryType",render:function(e){return Object(g.jsx)(j.a,{alignItems:"center",children:null===e||void 0===e?void 0:e.name})},sorter:function(e,t){return e.lotteryType.name.localeCompare(t.lotteryType.name)}},{title:"",dataIndex:"actions",render:function(e,t){return Object(g.jsx)("div",{className:"text-right",children:Object(g.jsx)(v.a,{menu:(a=t,Object(g.jsx)(s.a,{children:Object(g.jsx)(s.a.Item,{onClick:function(){return k(a)},children:Object(g.jsxs)(j.a,{alignItems:"center",children:[Object(g.jsx)(m.a,{}),Object(g.jsx)("span",{className:"ml-2",children:"View Booking Commissions"})]})})}))})});var a}}];return Object(g.jsxs)(d.a,{children:[Object(g.jsx)(j.a,{alignItems:"center",justifyContent:"between",mobileFlex:!1,children:Object(g.jsx)(j.a,{className:"mb-1",mobileFlex:!1,children:Object(g.jsx)("div",{className:"mr-md-3 mb-3",children:Object(g.jsx)(u.a,{placeholder:"Search",prefix:Object(g.jsx)(p.a,{}),onChange:function(e){return function(e){var t=e.currentTarget.value,a=e.currentTarget.value?r:E,n=f.a.wildCardSearch(a,t);y(n)}(e)}})})})}),Object(g.jsx)("div",{className:"table-responsive",children:Object(g.jsx)(b.a,{columns:C,dataSource:r,rowKey:"id"})})]})};t.default=function(e){var t=e.match;return Object(g.jsxs)(n.d,{children:[Object(g.jsx)(n.a,{exact:!0,from:"".concat(t.url),to:"".concat(t.url,"/list")}),Object(g.jsx)(n.b,{path:"".concat(t.url,"/list"),component:y})]})}},537:function(e,t,a){"use strict";var n=a(4),r=a(2),c=a(0),o=a(5),l=a.n(o),i=a(33),s=a(41),u=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]])}return a},d=function(e){var t=e.prefixCls,a=e.className,o=e.hoverable,i=void 0===o||o,d=u(e,["prefixCls","className","hoverable"]);return c.createElement(s.a,null,(function(e){var o=(0,e.getPrefixCls)("card",t),s=l()("".concat(o,"-grid"),a,Object(n.a)({},"".concat(o,"-grid-hoverable"),i));return c.createElement("div",Object(r.a)({},d,{className:s}))}))},b=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]])}return a},m=function(e){return c.createElement(s.a,null,(function(t){var a=t.getPrefixCls,n=e.prefixCls,o=e.className,i=e.avatar,s=e.title,u=e.description,d=b(e,["prefixCls","className","avatar","title","description"]),m=a("card",n),p=l()("".concat(m,"-meta"),o),v=i?c.createElement("div",{className:"".concat(m,"-meta-avatar")},i):null,j=s?c.createElement("div",{className:"".concat(m,"-meta-title")},s):null,f=u?c.createElement("div",{className:"".concat(m,"-meta-description")},u):null,O=j||f?c.createElement("div",{className:"".concat(m,"-meta-detail")},j,f):null;return c.createElement("div",Object(r.a)({},d,{className:p}),v,O)}))},p=a(535),v=a(531),j=a(532),f=a(53),O=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]])}return a};var g=function(e){var t,a,o,u=c.useContext(s.b),b=u.getPrefixCls,m=u.direction,g=c.useContext(f.b),y=e.prefixCls,x=e.className,h=e.extra,E=e.headStyle,N=void 0===E?{}:E,k=e.bodyStyle,C=void 0===k?{}:k,w=e.title,I=e.loading,P=e.bordered,S=void 0===P||P,T=e.size,A=e.type,B=e.cover,K=e.actions,G=e.tabList,L=e.children,z=e.activeTabKey,D=e.defaultActiveTabKey,F=e.tabBarExtraContent,J=e.hoverable,M=e.tabProps,R=void 0===M?{}:M,V=O(e,["prefixCls","className","extra","headStyle","bodyStyle","title","loading","bordered","size","type","cover","actions","tabList","children","activeTabKey","defaultActiveTabKey","tabBarExtraContent","hoverable","tabProps"]),_=b("card",y),q=0===C.padding||"0px"===C.padding?{padding:24}:void 0,H=c.createElement("div",{className:"".concat(_,"-loading-block")}),Q=c.createElement("div",{className:"".concat(_,"-loading-content"),style:q},c.createElement(v.a,{gutter:8},c.createElement(j.a,{span:22},H)),c.createElement(v.a,{gutter:8},c.createElement(j.a,{span:8},H),c.createElement(j.a,{span:15},H)),c.createElement(v.a,{gutter:8},c.createElement(j.a,{span:6},H),c.createElement(j.a,{span:18},H)),c.createElement(v.a,{gutter:8},c.createElement(j.a,{span:13},H),c.createElement(j.a,{span:9},H)),c.createElement(v.a,{gutter:8},c.createElement(j.a,{span:4},H),c.createElement(j.a,{span:3},H),c.createElement(j.a,{span:16},H))),U=void 0!==z,W=Object(r.a)(Object(r.a)({},R),(t={},Object(n.a)(t,U?"activeKey":"defaultActiveKey",U?z:D),Object(n.a)(t,"tabBarExtraContent",F),t)),X=G&&G.length?c.createElement(p.a,Object(r.a)({size:"large"},W,{className:"".concat(_,"-head-tabs"),onChange:function(t){var a;null===(a=e.onTabChange)||void 0===a||a.call(e,t)}}),G.map((function(e){return c.createElement(p.a.TabPane,{tab:e.tab,disabled:e.disabled,key:e.key})}))):null;(w||h||X)&&(o=c.createElement("div",{className:"".concat(_,"-head"),style:N},c.createElement("div",{className:"".concat(_,"-head-wrapper")},w&&c.createElement("div",{className:"".concat(_,"-head-title")},w),h&&c.createElement("div",{className:"".concat(_,"-extra")},h)),X));var Y=B?c.createElement("div",{className:"".concat(_,"-cover")},B):null,Z=c.createElement("div",{className:"".concat(_,"-body"),style:C},I?Q:L),$=K&&K.length?c.createElement("ul",{className:"".concat(_,"-actions")},function(e){return e.map((function(t,a){return c.createElement("li",{style:{width:"".concat(100/e.length,"%")},key:"action-".concat(a)},c.createElement("span",null,t))}))}(K)):null,ee=Object(i.a)(V,["onTabChange"]),te=T||g,ae=l()(_,(a={},Object(n.a)(a,"".concat(_,"-loading"),I),Object(n.a)(a,"".concat(_,"-bordered"),S),Object(n.a)(a,"".concat(_,"-hoverable"),J),Object(n.a)(a,"".concat(_,"-contain-grid"),function(){var t;return c.Children.forEach(e.children,(function(e){e&&e.type&&e.type===d&&(t=!0)})),t}()),Object(n.a)(a,"".concat(_,"-contain-tabs"),G&&G.length),Object(n.a)(a,"".concat(_,"-").concat(te),te),Object(n.a)(a,"".concat(_,"-type-").concat(A),!!A),Object(n.a)(a,"".concat(_,"-rtl"),"rtl"===m),a),x);return c.createElement("div",Object(r.a)({},ee,{className:ae}),o,Y,Z,$)};g.Grid=d,g.Meta=m;t.a=g},565:function(e,t,a){"use strict";a(0);var n=a(491),r=a(188),c=a(157),o=a(1),l=function(e){return Object(o.jsx)(n.a,{overlay:e.menu,placement:e.placement,trigger:["click"],children:Object(o.jsx)("div",{className:"ellipsis-dropdown",children:Object(o.jsx)(c.a,{})})})};l.defaultProps={trigger:"click",placement:"bottomRight",menu:Object(o.jsx)(r.a,{})},t.a=l}}]);
//# sourceMappingURL=82.4535a1c9.chunk.js.map