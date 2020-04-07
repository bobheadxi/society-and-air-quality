(this.webpackJsonpvis=this.webpackJsonpvis||[]).push([[0],{184:function(e,t){},266:function(e,t,a){e.exports=a(399)},271:function(e,t,a){},280:function(e,t,a){},283:function(e,t){},399:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(29),o=a.n(i),c=(a(271),a(137),a(54)),l=(a(138),a(37)),s=(a(190),a(185)),u=(a(191),a(96)),d=(a(275),a(245)),p=a(69),m=a(129),f=(a(92),a(39)),v=a(417),g=a(418),h=(a(280),a(43)),E=a.n(h),y=a(64),b=["2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"];function x(e){var t="".concat(e);return[parseInt("".concat(t.substring(0,1)).concat(t.substring(4,5))),parseInt(t.substring(2,4)),parseInt("".concat(t.substring(1,2)).concat(t.substring(4,5))),255]}var w=a(219),O=a.n(w),S=function(e){return"/".concat("esoc410-project","/").concat(e)},j=function(e){return k.apply(this,arguments)};function k(){return(k=Object(y.a)(E.a.mark((function e(t){var a,n=arguments;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.length>1&&void 0!==n[1]?n[1]:{onStep:void 0,notResource:!1},e.abrupt("return",new Promise((function(e,n){O.a.parse(a.notResource?t:S(t),{header:!0,quotes:!1,delimiter:",",download:!0,error:function(e){console.error("fetchCsv: error on ".concat(t),{err:e}),n(e.message)},complete:function(t){if(t.errors.length>0)return n(t.errors[0]);console.log(t),e(t.data)}})})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var C=function(e){return I.apply(this,arguments)};function I(){return(I=Object(y.a)(E.a.mark((function e(t){var a,n,r=arguments;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.length>1&&void 0!==r[1]?r[1]:{notResource:!1},e.prev=1,e.next=4,fetch(a.notResource?t:S(t),{method:"GET",mode:"no-cors"});case 4:return n=e.sent,e.abrupt("return",n.json());case 8:throw e.prev=8,e.t0=e.catch(1),console.error("fetchJSON: error on ".concat(t),e.t0),e.t0;case 12:case"end":return e.stop()}}),e,null,[[1,8]])})))).apply(this,arguments)}function T(e){var t=e.children,a=e.context,i=Object(n.useState)({loading:!0}),o=Object(m.a)(i,2),c=o[0],l=o[1];return Object(n.useEffect)((function(){var e=!1;function t(){return(t=Object(y.a)(E.a.mark((function t(){var n;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("".concat(a.displayName,": loading...")),t.prev=1,t.next=4,a.loadValue();case 4:if(n=t.sent,!e){t.next=7;break}return t.abrupt("return");case 7:l(Object(p.a)({loading:!1},n)),console.log("".concat(a.displayName,": ok, updated")),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(1),console.log("".concat(a.displayName,": err, updated")),l({loading:!1,err:t.t0});case 15:case"end":return t.stop()}}),t,null,[[1,11]])})))).apply(this,arguments)}return function(){t.apply(this,arguments)}(),function(){e=!0}}),[a]),r.a.createElement(a.Provider,{value:c,children:t})}T.defaultValue={loading:!0,err:void 0};var D=T,A=r.a.createContext(Object(p.a)({timeseriesFlat:null,timeseriesVert:null,regions:null},D.defaultValue));A.displayName="context.acs",A.loadValue=Object(y.a)(E.a.mark((function e(){var t,a,n,r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=["/_data/acs/timeseries_flat.csv","/_data/acs/timeseries_vert.csv"].map((function(e){return j(e)})),a=b.map((function(e){return C("/_data/acs/regions/".concat(e,"_geojson.json"))})),e.next=4,Promise.all(a);case 4:return n=e.sent,e.next=7,Promise.all(t);case 7:return r=e.sent,e.abrupt("return",{timeseriesFlat:r[0],timeseriesVert:r[1],regions:n});case 9:case"end":return e.stop()}}),e)})));var V=A,_=r.a.createContext(Object(p.a)({timeseriesFlat:null,timeseriesVert:null,stations:null},D.defaultValue));_.displayName="context.epa",_.loadValue=Object(y.a)(E.a.mark((function e(){var t,a,n,r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=["/_data/epa/timeseries_flat.csv","/_data/epa/timeseries_vert.csv"].map((function(e){return j(e)})),e.next=3,Promise.all(t);case 3:return a=e.sent,n=b.map((function(e){return C("/_data/epa/stations/".concat(e,"_geojson.json"))})),e.next=7,Promise.all(n);case 7:return r=e.sent,e.abrupt("return",{timeseriesFlat:a[0],timeseriesVert:a[1],stations:r});case 9:case"end":return e.stop()}}),e)})));var P=_,M=a(412),F=a(411),R=a(248),z={longitude:-122.41669,latitude:37.7853,zoom:5,pitch:0,bearing:0},L="mapbox://styles/bobhead/ck8pf7npv0cda1iobxo3txanr";function N(e){var t=e.children,a=e.layers,n=void 0===a?[]:a,i=e.viewState,o=void 0===i?z:i;return r.a.createElement(M.a,{initialViewState:z,viewState:Object(p.a)({},o,{transitionDuration:3e3,transitionInterpolator:new F.a}),layers:n},r.a.createElement(R.a,Object.assign({},o,{reuseMaps:!0,preventStyleDiffing:!0,mapStyle:L,mapboxApiAccessToken:"pk.eyJ1IjoiYm9iaGVhZCIsImEiOiJjazhwOHI5a2sxZDF3M25renUybDZ4bnZ3In0.GWSMr4L-ae8iPuD9WbkUCQ"})),r.a.createElement("div",{style:{zIndex:1},children:t}))}N.initialViewState=z;var U=N,J=(a(287),a(134)),q=(a(198),a(128)),B=(a(290),a(232)),H=a(416),W=a(413);var Z=function(e){var t=e.children;return r.a.createElement(u.a,{style:{minHeight:"100%",background:"transparent"}},r.a.createElement(u.a.Content,{style:{padding:"48px"}},t))},G=f.a.Text,Q=f.a.Title,K=r.a.createElement(q.a,{direction:"vertical",size:"large",style:{padding:"48px"}},r.a.createElement(B.a,{size:"large",icon:r.a.createElement(H.a,null)}),r.a.createElement(f.a,null,r.a.createElement(Q,null,"Society and Air Quality"),r.a.createElement(G,null,"EOSC 410 Final Project")," | ",r.a.createElement(G,{type:"secondary"},"University of British Columbia, April 2020")));function Y(e){var t=e.updateMapState,a=e.isSlideSelected;return r.a.createElement(P.Consumer,null,(function(e){return r.a.createElement(V.Consumer,null,(function(n){var i=n.loading||e.loading,o=!i&&!n.err&&!e.err;return o&&a&&t({layers:[new W.a({id:"intro-epa-layer",data:e.stations[e.stations.length-1],pointRadiusMinPixels:3,getFillColor:function(e){return x(e.properties.acs_geoid)}})]}),r.a.createElement(Z,null,r.a.createElement(c.a,null,r.a.createElement(l.a,{span:4,offset:20},r.a.createElement(q.a,{direction:"vertical"},i?r.a.createElement(J.a,{message:"Loading data...",type:"info"}):void 0,o?r.a.createElement(J.a,{message:"Presentation data is ready!",type:"success",showIcon:!0}):void 0,!i&&n.err?r.a.createElement(J.a,{message:"Error occured when loading ACS data",description:n.err.message,type:"error",showIcon:!0}):void 0,!i&&e.err?r.a.createElement(J.a,{message:"Error occured when loading EPA data",description:e.err.message,type:"error",showIcon:!0}):void 0))),K)}))}))}Y.footerText="by Robert Lin and Angelene Leow";var $=Y,X=(a(400),a(249)),ee=(f.a.Title,f.a.Text);function te(e){var t=e.updateMapState,a=e.isSlideSelected;return r.a.createElement(V.Consumer,null,(function(e){if(!e.loading&&!e.err&&a){var n=e.timeseriesFlat,i=e.regions;t({viewState:{longitude:-98.5795,latitude:41.8283,zoom:3.5,pitch:45,bearing:15},layers:[new W.a({id:"questions-acs-layer",data:i[i.length-1],pointRadiusMinPixels:3,getFillColor:function(e){return x(e.properties.geoid)},getLineColor:[255,255,255],getElevation:function(e){var t=e.properties.geoid;return 100*Math.sqrt(n[n.length-1]["".concat(t,".acs.total_pop")])},opacity:.8,stroked:!1,filled:!0,extruded:!0,wireframe:!0})]})}return r.a.createElement(Z,null,r.a.createElement(c.a,{gutter:16},r.a.createElement(l.a,{span:8,offset:16},r.a.createElement(q.a,{direction:"vertical"},r.a.createElement(X.a,{title:"Questions",bordered:!1},r.a.createElement(ee,null,"research questions, few sentences on the relevance of this study"))))))}))}te.footerText="Simplified ACS CBSA regional boundaries, with heights representing total population";var ae=te,ne=f.a.Title;var re=function(){return r.a.createElement(Z,null,r.a.createElement(ne,null,"TODO"))},ie=f.a.Title;var oe=function(){return r.a.createElement(Z,null,r.a.createElement(ie,null,"TODO"))},ce=f.a.Title;var le=function(){return r.a.createElement(Z,null,r.a.createElement(ce,null,"TODO"))},se=f.a.Title;function ue(){return r.a.createElement(Z,null,r.a.createElement(se,null,"TODO"))}ue.footerText="TODO link to github";var de=ue,pe=f.a.Text;var me=function(){var e=Object(n.useState)({prevUpdateID:-1,viewState:U.initialViewState,layers:[],mapStyle:"DARK",hideMapLayer:!1}),t=Object(m.a)(e,2),a=t[0],i=t[1],o=Object(n.useState)(0),f=Object(m.a)(o,2),h=f[0],E=f[1],y=Object(n.useRef)(),b=[$,ae,re,oe,le,de],x=b.map((function(e,t){return r.a.createElement(e,{slideID:t,isSlideSelected:t===h,updateMapState:function(e,n){var r=n|t;r!==a.prevUpdateID&&i(Object(p.a)({prevUpdateID:r},e))}})})),w=r.a.createElement(u.a,{style:{minHeight:"100vh"}},r.a.createElement(u.a.Content,null,r.a.createElement(U,a,r.a.createElement(d.a,{ref:function(e){y.current=e},style:{minHeight:"100vh"},dotPosition:"top",beforeChange:function(e,t){E(t)},children:x}))),r.a.createElement(u.a.Footer,null,r.a.createElement(c.a,{justify:"space-between",type:"flex",align:"middle"},r.a.createElement(l.a,{span:4},h>0?r.a.createElement(s.a,{type:"primary",shape:"round",icon:r.a.createElement(v.a,null),size:"large",onClick:function(){y.current.prev()}}):void 0),r.a.createElement(l.a,{span:8,style:{display:"flex",alignItems:"center",verticalAlign:"middle",textAlign:"center"},offset:h>0?0:4},r.a.createElement(pe,{type:"secondary",style:{verticalAlign:"middle",alignItems:"center",textAlign:"center"}},b[h].footerText)),r.a.createElement(l.a,{span:4},r.a.createElement(s.a,{type:"primary",shape:"round",icon:r.a.createElement(g.a,null),size:"large",style:{float:"right"},onClick:function(){y.current.next()}})))));return r.a.createElement(D,{context:V},r.a.createElement(D,{context:P},w))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(me,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[266,1,2]]]);
//# sourceMappingURL=main.71344146.chunk.js.map