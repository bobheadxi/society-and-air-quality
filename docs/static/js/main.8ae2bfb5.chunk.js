(this.webpackJsonpvis=this.webpackJsonpvis||[]).push([[0],{184:function(e,t){},267:function(e,t,a){e.exports=a(402)},272:function(e,t,a){},281:function(e,t,a){},284:function(e,t){},402:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(29),c=a.n(i),o=(a(272),a(136),a(55)),l=(a(137),a(37)),s=(a(190),a(185)),u=(a(191),a(97)),m=(a(276),a(246)),p=a(70),d=a(128),f=(a(92),a(40)),v=a(420),E=a(421),h=(a(281),a(44)),g=a.n(h),y=a(65),b=a(219),w=a.n(b),x=function(e){return O.apply(this,arguments)};function O(){return(O=Object(y.a)(g.a.mark((function e(t){var a,n=arguments;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.length>1&&void 0!==n[1]?n[1]:{onStep:void 0},e.abrupt("return",new Promise((function(e,n){w.a.parse(t,{worker:!0,header:!0,step:a.onStep,error:function(e){console.error("fetchCsv: error on ".concat(t),{err:e}),n(e.message)},complete:function(t){e(t.data)}})})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var S=function(e){return j.apply(this,arguments)};function j(){return(j=Object(y.a)(g.a.mark((function e(t){var a;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(t,{method:"GET",mode:"no-cors"});case 3:return a=e.sent,e.abrupt("return",a.json());case 7:throw e.prev=7,e.t0=e.catch(0),console.error("fetchJSON: error on ".concat(t),e.t0),e.t0;case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function k(e){var t=e.children,a=e.context,i=Object(n.useState)({loading:!0}),c=Object(d.a)(i,2),o=c[0],l=c[1];return Object(n.useEffect)((function(){var e=!1;function t(){return(t=Object(y.a)(g.a.mark((function t(){var n;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("".concat(a.displayName,": loading...")),t.prev=1,t.next=4,a.loadValue();case 4:if(n=t.sent,!e){t.next=7;break}return t.abrupt("return");case 7:l(Object(p.a)({loading:!1},n)),console.log("".concat(a.displayName,": ok, updated")),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(1),console.log("".concat(a.displayName,": err, updated")),l({loading:!1,err:t.t0});case 15:case"end":return t.stop()}}),t,null,[[1,11]])})))).apply(this,arguments)}return function(){t.apply(this,arguments)}(),function(){e=!0}}),[a]),r.a.createElement(a.Provider,{value:o,children:t})}k.defaultValue={loading:!0,err:void 0};var C=k,T=r.a.createContext(Object(p.a)({timeseriesFlat:null,timeseriesVert:null},C.defaultValue));T.displayName="context.acs",T.loadValue=Object(y.a)(g.a.mark((function e(){var t,a;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=["/_data/acs/timeseries_flat.csv","/_data/acs/timeseries_vert.csv"].map((function(e){return x(e)})),e.next=3,Promise.all(t);case 3:return a=e.sent,e.abrupt("return",{timeseriesFlat:a[0],timeseriesVert:a[1]});case 5:case"end":return e.stop()}}),e)})));var I=T,D=["2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"];function V(e){var t=e.properties.acs_geoid,a="".concat(t);return[parseInt(a.substring(0,1)+a.substring(4,5)),parseInt(a.substring(2,4)),parseInt(a.substring(4,5)+a.substring(0,1)),255]}var P=r.a.createContext(Object(p.a)({timeseriesFlat:null,timeseriesVert:null,stations:null},C.defaultValue));P.displayName="context.epa",P.loadValue=Object(y.a)(g.a.mark((function e(){var t,a,n,r;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=["/_data/epa/timeseries_flat.csv","/_data/epa/timeseries_vert.csv"].map((function(e){return x(e)})),e.next=3,Promise.all(t);case 3:return a=e.sent,n=D.map((function(e){return S("/_data/epa/stations/".concat(e,"_geojson.json"))})),e.next=7,Promise.all(n);case 7:return r=e.sent,e.abrupt("return",{timeseriesFlat:a[0],timeseriesVert:a[1],stations:r});case 9:case"end":return e.stop()}}),e)})));var _=P,M=a(415),F=a(414),z=a(249),A={longitude:-122.41669,latitude:37.7853,zoom:5,pitch:0,bearing:0},N="mapbox://styles/bobhead/ck8pf7npv0cda1iobxo3txanr";function U(e){var t=e.children,a=e.layers,n=void 0===a?[]:a,i=e.viewState,c=void 0===i?A:i;return r.a.createElement(M.a,{initialViewState:A,viewState:Object(p.a)({},c,{transitionDuration:3e3,transitionInterpolator:new F.a}),layers:n},r.a.createElement(z.a,Object.assign({},c,{reuseMaps:!0,preventStyleDiffing:!0,mapStyle:N,mapboxApiAccessToken:"pk.eyJ1IjoiYm9iaGVhZCIsImEiOiJjazhwOHI5a2sxZDF3M25renUybDZ4bnZ3In0.GWSMr4L-ae8iPuD9WbkUCQ"})),r.a.createElement("div",{style:{zIndex:1},children:t}))}U.initialViewState=A;var J=U,L=(a(288),a(133)),R=(a(290),a(242)),H=(a(198),a(154)),W=(a(293),a(232)),Z=a(419),B=a(416);var G=function(e){var t=e.children;return r.a.createElement(u.a,{style:{minHeight:"100%",background:"transparent"}},r.a.createElement(u.a.Content,{style:{padding:"48px"}},t))},Q=f.a.Text,q=f.a.Title,K=r.a.createElement(H.a,{direction:"vertical",size:"large",style:{padding:"48px"}},r.a.createElement(W.a,{size:"large",icon:r.a.createElement(Z.a,null)}),r.a.createElement(f.a,null,r.a.createElement(q,null,"Society and Air Quality"),r.a.createElement(Q,null,"EOSC 410 Final Project")," | ",r.a.createElement(Q,{type:"secondary"},"University of British Columbia, April 2020")));function Y(e){var t=e.updateMapState,a=e.isSlideSelected;return r.a.createElement(_.Consumer,null,(function(e){return r.a.createElement(I.Consumer,null,(function(n){var i=n.loading||e.loading,c=!i&&!n.err&&!e.err;return c&&a&&t({layers:[new B.a({id:"intro-epa-layer",data:e.stations[e.stations.length-1],pointRadiusMinPixels:3,getFillColor:V})]}),r.a.createElement(G,null,r.a.createElement(o.a,null,r.a.createElement(l.a,{span:4,offset:20},i?r.a.createElement(L.a,{message:"Loading data...",type:"info",icon:r.a.createElement("div",null,r.a.createElement(R.a,null))}):void 0,c?r.a.createElement(L.a,{message:"Presentation data is ready!",type:"success",showIcon:!0}):void 0,!i&&n.err?r.a.createElement(L.a,{message:"Error occured when loading ACS data: ".concat(n.err.message),type:"error",showIcon:!0}):void 0,!i&&e.err?r.a.createElement(L.a,{message:"Error occured when loading ACS data: ".concat(e.err.message),type:"error",showIcon:!0}):void 0)),K)}))}))}Y.footerText="by Robert Lin and Angelene Leow";var $=Y,X=(a(403),a(250)),ee=(f.a.Title,f.a.Text);var te=function(e){var t=e.updateMapState,a=e.isSlideSelected;return r.a.createElement(_.Consumer,null,(function(e){return a&&t({viewState:{longitude:-98.5795,latitude:41.8283,zoom:3,pitch:0,bearing:0},layers:[new B.a({id:"intro-epa-layer",data:e.stations[e.stations.length-1],pointRadiusMinPixels:3,getFillColor:V})]}),r.a.createElement(G,null,r.a.createElement(o.a,{gutter:16},r.a.createElement(l.a,{span:8,offset:16},r.a.createElement(H.a,{direction:"vertical"},r.a.createElement(X.a,{title:"Questions",bordered:!1},r.a.createElement(ee,null,"research questions, few sentences on the relevance of this study"))))))}))},ae=f.a.Title;var ne=function(){return r.a.createElement(G,null,r.a.createElement(ae,null,"TODO"))},re=f.a.Title;var ie=function(){return r.a.createElement(G,null,r.a.createElement(re,null,"TODO"))},ce=f.a.Title;var oe=function(){return r.a.createElement(G,null,r.a.createElement(ce,null,"TODO"))},le=f.a.Title;function se(){return r.a.createElement(G,null,r.a.createElement(le,null,"TODO"))}se.footerText="TODO link to github";var ue=se,me=f.a.Text;var pe=function(){var e=Object(n.useState)({prevUpdateID:-1,viewState:J.initialViewState,layers:[],mapStyle:"DARK",hideMapLayer:!1}),t=Object(d.a)(e,2),a=t[0],i=t[1],c=Object(n.useState)(0),f=Object(d.a)(c,2),h=f[0],g=f[1],y=Object(n.useRef)(),b=[$,te,ne,ie,oe,ue],w=b.map((function(e,t){return r.a.createElement(e,{slideID:t,isSlideSelected:t===h,updateMapState:function(e,n){var r=n|t;r!==a.prevUpdateID&&i(Object(p.a)({prevUpdateID:r},e))}})})),x=r.a.createElement(u.a,{style:{minHeight:"100vh"}},r.a.createElement(u.a.Content,null,r.a.createElement(J,a,r.a.createElement(m.a,{ref:function(e){y.current=e},style:{minHeight:"100vh"},dotPosition:"top",beforeChange:function(e,t){g(t)},children:w}))),r.a.createElement(u.a.Footer,null,r.a.createElement(o.a,{justify:"space-between"},r.a.createElement(l.a,{span:8},h>0?r.a.createElement(s.a,{type:"primary",shape:"round",icon:r.a.createElement(v.a,null),size:"large",onClick:function(){y.current.prev()}}):void 0),r.a.createElement(l.a,null,r.a.createElement(me,{type:"secondary"},b[h].footerText)),r.a.createElement(l.a,{span:8},h<b.length?r.a.createElement(s.a,{type:"primary",shape:"round",icon:r.a.createElement(E.a,null),size:"large",style:{float:"right"},onClick:function(){y.current.next()}}):void 0))));return r.a.createElement(C,{context:I},r.a.createElement(C,{context:_},x))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(pe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[267,1,2]]]);
//# sourceMappingURL=main.8ae2bfb5.chunk.js.map