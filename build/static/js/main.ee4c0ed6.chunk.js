(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{27:function(e,t,a){e.exports=a.p+"static/media/mouseclick.cb264995.mp3"},33:function(e,t,a){e.exports=a(47)},38:function(e,t,a){},39:function(e,t,a){},47:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(25),c=a.n(l),s=(a(38),a(12)),o=a(13),i=a(17),m=a(16),u=(a(39),a(40),a(20)),d=a.n(u),h=a(26),E=a(7),g=a(27),f=a.n(g),w=a(11),v=a(49),b=a(50),p=a(51),N=a(52),y=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={level:1,score:0,wrongWordCount:0,wordList:[],correctWordList:[],wrongWordList:[],levelStarted:!1,memorizingEnded:!1,final:!1,errors:!1},n.handleCorrectAnswers=n.handleCorrectAnswers.bind(Object(E.a)(n)),n.fetchWords=n.fetchWords.bind(Object(E.a)(n)),n.handleLists=n.handleLists.bind(Object(E.a)(n)),n.handleNextLevel=n.handleNextLevel.bind(Object(E.a)(n)),n}return Object(o.a)(a,[{key:"Countdown",value:function(e){var t=document.getElementById("countdown"),a=document.getElementById("plural");if(null==t)return-1;var n=setInterval((function(){--e<=0?clearInterval(n):a.innerHTML=e<=1?" second":" seconds",t.innerHTML=e}),1e3)}},{key:"handleNextLevel",value:function(){var e=this.state.level;if(6==e)return this.setState({levelStarted:!1,final:!0}),-1;this.setState((function(e){return{level:e.level+1,levelStarted:!0,final:!1}})),this.fetchWords(e)}},{key:"fetchWords",value:function(){var e=Object(h.a)(d.a.mark((function e(t){var a,n,r,l;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=(a=3*t)/3,e.next=5,fetch(this.props.websiteUrl+"api/get-random-words/total=".concat(a,"/wrong=").concat(n));case 5:return r=e.sent,e.next=8,r.json();case 8:l=e.sent,this.handleStrings(l),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),this.setState({errors:!0});case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));return function(t){return e.apply(this,arguments)}}()},{key:"handleStrings",value:function(e){var t=[],a=[];e.map((function(e){if(":C"==e.slice(-2)){var n=e.slice(0,e.length-2);t.push(n)}else a.push(e)})),this.setState({correctWordList:t,wrongWordList:a}),this.handleLists()}},{key:"handleLists",value:function(){var e=this,t=this.state,a=t.wrongWordList,n=t.correctWordList,r=t.level;this.setState({wordList:n});var l=3e3*r,c=n.concat(a);c=c.sort((function(){return Math.random()-.5})),setTimeout((function(){e.setState({wordList:c,memorizingEnded:!0})}),l),this.Countdown(l/1e3)}},{key:"handleCorrectAnswers",value:function(e){var t=this,a=this.state,n=a.wrongWordList,r=a.wrongWordCount;a.score;if("used"==e.target.id)return-1;for(var l=!1,c=0;c<n.length;c++)e.target.innerHTML==n[c]&&(l=!0);var s=document.getElementById("clickEffect");l?(e.target.className="btn btn-lg btn-success text-white mr-2 mt-3 ",e.target.id="used",this.setState((function(e){return{score:e.score+10,wrongWordCount:e.wrongWordCount-1}}),(function(){t.isLevelEnded()}))):(e.target.className="btn btn-lg btn-danger text-white mr-2 mt-3",e.target.id="used",this.setState((function(e){return{score:e.score-10}}))),n.length+r==0&&this.setState({levelStarted:!1,memorizingEnded:!0,wrongWordCount:0}),s.play()}},{key:"isLevelEnded",value:function(){var e=this,t=this.state,a=t.wrongWordList,n=t.wrongWordCount;a.length+n==0&&setTimeout((function(){e.setState({levelStarted:!1,memorizingEnded:!1,wrongWordCount:0,wordList:[]})}),500)}},{key:"render",value:function(){var e=this,t=this.state,a=t.errors,n=t.wordList,l=t.level,c=t.score,s=t.levelStarted,o=t.memorizingEnded,i=t.final;this.props.nickname;if(s){d=r.a.createElement(r.a.Fragment,null);var m=r.a.createElement("div",{className:"mt-5"},r.a.createElement("h3",{className:"text-white"},"Try to memorize!"),r.a.createElement("hr",{className:"separator"}),r.a.createElement("div",{className:"wordsToMemorize"},n.map((function(e,t){return r.a.createElement("strong",{key:t},r.a.createElement("h3",{className:"text-white d-inline"},e,t!=n.length-1?r.a.createElement(r.a.Fragment,null,", "):r.a.createElement(r.a.Fragment,null)))})))),u=r.a.createElement("div",{className:"mt-5"},r.a.createElement("h3",{className:"text-white"},"What word didn't shown?"),r.a.createElement("div",null,n.map((function(t,a){return r.a.createElement("button",{className:"btn btn-lg btn-info text-white mr-2 mt-3",key:a,onClick:function(t){return e.handleCorrectAnswers(t)}},t)}))))}else if(!s&&!i)if(1==l)var d=r.a.createElement(r.a.Fragment,null,r.a.createElement("h3",{className:"text-white"},"Click the button if you want to start."),r.a.createElement("button",{style:{width:"200px"},className:"btn btn-lg btn-danger text-white mt-3",onClick:function(){return e.handleNextLevel()}},r.a.createElement(w.b,null)," START"));else d=r.a.createElement("button",{style:{width:"200px"},className:"btn btn-lg btn-success text-white mt-5",onClick:function(){return e.handleNextLevel()}},r.a.createElement(w.b,null)," NEXT LEVEL");if(!a){var h=3*l;return i?r.a.createElement("div",null,r.a.createElement("h3",{className:"text-white mt-5"},"Congratulations, you have finished the challange!"),r.a.createElement("h1",{className:"text-white mt-3 mb-3"},"Your Score: ",c),r.a.createElement("div",{className:"mt-4 mb-4"},r.a.createElement(v.a,{className:"mr-3",url:"".concat(this.props.websiteUrl),quote:"I got ".concat(c," score in Memory Challange!"),hashtag:"#memorychallange"},r.a.createElement(b.a,{size:50})),r.a.createElement(p.a,{url:"".concat(this.props.websiteUrl),quote:"I got ".concat(c," score in Memory Challange!"),hashtag:"#memorychallange"},r.a.createElement(N.a,{size:50}))),r.a.createElement("button",{onClick:function(){return window.location.reload(!1)},style:{width:"200px"},className:"btn btn-lg btn-success text-white"},r.a.createElement(w.a,null)," PLAY AGAIN")):r.a.createElement("div",{className:"mt-2"},r.a.createElement("audio",{type:"audio/mpeg",id:"clickEffect",src:f.a}),r.a.createElement("div",{className:"row mt-5"},r.a.createElement("div",{className:"col"},r.a.createElement("h3",{className:"text-white"},l-1!=0?r.a.createElement("strong",null," Level: ",l-1," "):r.a.createElement(r.a.Fragment,null))),r.a.createElement("div",{className:"col"},r.a.createElement("h3",{className:"text-white"},l-1!=0?r.a.createElement("strong",null,"Time: ",r.a.createElement("span",{id:"countdown"},h),r.a.createElement("span",{id:"plural"}," seconds")):r.a.createElement(r.a.Fragment,null))),r.a.createElement("div",{className:"col"},r.a.createElement("h3",{className:"text-white"},l-1!=0?r.a.createElement("strong",null," Score: ",c," "):r.a.createElement(r.a.Fragment,null)))),r.a.createElement("div",{className:"container"},o?u:m,r.a.createElement("div",null,d)))}if(a)return r.a.createElement("div",{className:"mt-5"},r.a.createElement("div",{className:"mt-5"},r.a.createElement("h3",{className:"text-white text-center mt-5"},"Something is wrong. Please try again."),r.a.createElement("button",{onClick:function(){return window.location.reload(!1)},style:{width:"200px"},className:"btn btn-lg btn-success text-white mt-3"},r.a.createElement(w.a,null)," TRY AGAIN")))}}]),a}(n.Component),x=a(30),k=a(2),L=a(32),C=a(29),S=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",null,r.a.createElement("strong",null,r.a.createElement("h1",{className:"gameHeader mt-4 mb-4 text-white"},"MEMORY CHALLANGE",r.a.createElement("span",null,r.a.createElement("h5",{className:"text-white"},"Created by ",r.a.createElement("a",{className:"text-warning",href:"http://berkgaffaroglu.com/",target:"_blank"},r.a.createElement(C.a,null),"Berk Gaffaroglu")))))),r.a.createElement("div",{className:"container wrapper"},r.a.createElement(x.a,null,r.a.createElement(k.c,null,r.a.createElement(k.a,{path:"/",component:function(e){return r.a.createElement(y,{websiteUrl:"http://localhost:8000/"})}})))),r.a.createElement("button",{onClick:function(){return window.open("https://github.com/berkgaffaroglu/memorychallange","_blank")},style:{fontFamily:"ConcertOne",minWidth:"250px"},className:"btn btn-lg bg-dark text-white mb-4 mt-4"},r.a.createElement("b",null,r.a.createElement(L.a,null)," THE CODE")),r.a.createElement("footer",{className:"footer sticky-bottom text-white text-center"},r.a.createElement("div",null,r.a.createElement("span",{style:{fontFamily:"Oswald"}},"Powered by ",r.a.createElement("a",{style:{color:"#c2f2cf"},href:"https://www.django-rest-framework.org/",target:"_blank"},"Django Rest API")," & ",r.a.createElement("a",{style:{color:"#c2f2cf"},href:"https://reactjs.org/",target:"_blank"},"React.js")))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[33,1,2]]]);
//# sourceMappingURL=main.ee4c0ed6.chunk.js.map