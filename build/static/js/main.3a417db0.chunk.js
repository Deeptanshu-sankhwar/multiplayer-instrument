(this["webpackJsonpreact-sockets-example"]=this["webpackJsonpreact-sockets-example"]||[]).push([[0],{24:function(e,t,a){},39:function(e,t,a){},44:function(e,t,a){e.exports=a(99)},78:function(e,t){},98:function(e,t,a){},99:function(e,t,a){"use strict";a.r(t),a.d(t,"socket",(function(){return R}));var n=a(3),r=a(4),l=a(5),c=a(6),i=a(0),o=a.n(i),s=a(9),u=a.n(s);a(24),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var m=a(43),d=a.n(m),h=a(1),y=a.n(h),E=a(7),f=a(2),p=(a(39),a(13)),v=a.n(p),b=a(10),k=a.n(b);function g(){window.location.reload()}var w=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),c=0;c<r;c++)l[c]=arguments[c];return(e=t.call.apply(t,[this].concat(l))).shiftKey=0,e.colorOn="x",e.playtime=.5,e.chords=0,e.state={recordStatus:!1,recordTune:{beatPlayed:[],lengthPlayed:[],timePlayed:[]}},e}return Object(r.a)(a,[{key:"changeColor",value:function(e){this.colorOn=e}},{key:"sendKeysFromPiano",value:function(e){R.emit("sendFromPiano",e)}},{key:"playPiano4",value:function(e,t){"space"===e&&(this.playtime=this.playtime%2+.5),"shift"===e&&(this.shiftKey=(this.shiftKey+1)%3),"m"===e&&(this.chords=(this.chords+1)%3);var a=this.playtime;this.setState({});var n=[["a",57],["w",58],["s",59],["d",60],["r",61],["f",62],["t",63],["g",64],["h",65],["u",66],["j",67],["i",68],["k",69],["o",70],["l",71],[";",72]],r=null;if(0===this.shiftKey)if(0===this.chords){var l,c=Object(f.a)(n);try{for(c.s();!(l=c.n()).done;){var i=l.value;e===i[0]&&(r={note:[i[1]],length:a})}}catch(x){c.e(x)}finally{c.f()}}else if(1===this.chords){var o,s=Object(f.a)(n);try{for(s.s();!(o=s.n()).done;){var u=o.value;e===u[0]&&(r={note:[u[1],u[1]+4,u[1]+7],length:a})}}catch(x){s.e(x)}finally{s.f()}}else{var m,d=Object(f.a)(n);try{for(d.s();!(m=d.n()).done;){var h=m.value;e===h[0]&&(r={note:[h[1],h[1]+3,h[1]+7],length:a})}}catch(x){d.e(x)}finally{d.f()}}else if(1===this.shiftKey)if(0===this.chords){var y,E=Object(f.a)(n);try{for(E.s();!(y=E.n()).done;){var p=y.value;e===p[0]&&(r={note:[p[1]+12],length:a})}}catch(x){E.e(x)}finally{E.f()}}else if(1===this.chords){var v,b=Object(f.a)(n);try{for(b.s();!(v=b.n()).done;){var k=v.value;e===k[0]&&(r={note:[k[1]+12,k[1]+16,k[1]+19],length:a})}}catch(x){b.e(x)}finally{b.f()}}else{var g,w=Object(f.a)(n);try{for(w.s();!(g=w.n()).done;){var N=g.value;e===N[0]&&(r={note:[N[1]+12,N[1]+15,N[1]+19],length:a})}}catch(x){w.e(x)}finally{w.f()}}else if(2===this.shiftKey)if(0===this.chords){var P,O=Object(f.a)(n);try{for(O.s();!(P=O.n()).done;){var S=P.value;e===S[0]&&(r={note:[S[1]-12],length:a})}}catch(x){O.e(x)}finally{O.f()}}else if(1===this.chords){var C,T=Object(f.a)(n);try{for(T.s();!(C=T.n()).done;){var j=C.value;e===j[0]&&(r={note:[j[1]-12,j[1]-8,j[1]-5],length:a})}}catch(x){T.e(x)}finally{T.f()}}else{var B,K=Object(f.a)(n);try{for(K.s();!(B=K.n()).done;){var R=B.value;e===R[0]&&(r={note:[R[1]-12,R[1]-9,R[1]-5],length:a})}}catch(x){K.e(x)}finally{K.f()}}null!=r&&(this.midiSounds.playChordNow(3,r.note,r.length),this.sendKeysFromPiano(r),this.state.recordStatus&&(this.state.recordTune.beatPlayed.push(r.note),this.state.recordTune.lengthPlayed.push(r.length),this.state.recordTune.timePlayed.push(new Date),console.log(this.state.recordTune)))}},{key:"toggleRecordStatus",value:function(){this.state.recordStatus=!this.state.recordStatus,this.state.recordStatus?document.getElementById("record-btn").innerHTML="Stop":(document.getElementById("record-btn").innerHTML="Record",document.getElementById("play-btn").disabled=!1)}},{key:"wait",value:function(){var e=Object(E.a)(y.a.mark((function e(t){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){setTimeout(e,t)})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"playRecord",value:function(){var e=Object(E.a)(y.a.mark((function e(){var t;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("playing"),t=0;case 2:if(!(t<this.state.recordTune.beatPlayed.length)){e.next=11;break}return e.next=5,this.midiSounds.playChordNow(3,this.state.recordTune.beatPlayed[t],this.state.recordTune.lengthPlayed[t]);case 5:return console.log(t),e.next=8,this.wait(this.state.recordTune.timePlayed[t+1]-this.state.recordTune.timePlayed[t]);case 8:t++,e.next=2;break;case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"resetRecord",value:function(){this.setState({recordTune:{beatPlayed:[],lengthPlayed:[],timePlayed:[]}})}},{key:"render",value:function(){var e=this;return R.on("receiveFromGuitar",(function(t){e.midiSounds.playChordNow(258,t,1.5)})),R.on("receiveFromDrums",(function(t){e.midiSounds.playDrumsNow(t)})),R.on("receiveFromPiano",(function(t){e.midiSounds.playChordNow(3,t.note,t.length)})),o.a.createElement("div",{className:"App"},o.a.createElement("header",{id:"main-header"},o.a.createElement("div",{className:"container"},o.a.createElement("h1",{contentEditable:!0},"Travel Ban",o.a.createElement("span",{style:{color:"#9a0415"}},"d")))),o.a.createElement("nav",{id:"navbar"},o.a.createElement("div",{className:"container"},o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement("a",{onClick:g},"Home")),o.a.createElement("li",null,o.a.createElement("a",{id:"record-btn",onClick:this.toggleRecordStatus.bind(this)},"Record")),o.a.createElement("li",null,o.a.createElement("a",{id:"play-btn",onClick:this.playRecord.bind(this)},"Play")),o.a.createElement("li",null,o.a.createElement("a",{onClick:this.resetRecord.bind(this)},"Reset"))))),o.a.createElement("body",null,o.a.createElement("p",{className:"App-intro"},"Press buttons to play piano chords."),o.a.createElement("h1",{className:"Instructions"},"Play keyboard like a piano: d = middle C."),o.a.createElement("p",null,o.a.createElement(k.a,{handleKeys:["all"],onKeyEvent:function(t){return e.changeColor(t)}}),o.a.createElement(k.a,{handleKeys:["all"],onKeyEvent:function(t,a){return e.playPiano4(t,a)}})),o.a.createElement("p",null,o.a.createElement("div",{className:"piano-visual"},o.a.createElement("div",{className:"a"===this.colorOn?"blue-key":"white-key",style:{left:50}},o.a.createElement("h3",null,"A"),o.a.createElement("h4",null,"a")),o.a.createElement("div",{className:"s"===this.colorOn?"blue-key":"white-key",style:{left:100}},o.a.createElement("h3",null,"B"),o.a.createElement("h4",null,"s")),o.a.createElement("div",{className:"d"===this.colorOn?"blue-key":"white-key",style:{left:150}},o.a.createElement("h3",null,"C"),o.a.createElement("h4",null,"d")),o.a.createElement("div",{className:"f"===this.colorOn?"blue-key":"white-key",style:{left:200}},o.a.createElement("h3",null,"D"),o.a.createElement("h4",null,"f")),o.a.createElement("div",{className:"g"===this.colorOn?"blue-key":"white-key",style:{left:250}},o.a.createElement("h3",null,"E"),o.a.createElement("h4",null,"g")),o.a.createElement("div",{className:"h"===this.colorOn?"blue-key":"white-key",style:{left:300}},o.a.createElement("h3",null,"F"),o.a.createElement("h4",null,"h")),o.a.createElement("div",{className:"j"===this.colorOn?"blue-key":"white-key",style:{left:350}},o.a.createElement("h3",null,"G"),o.a.createElement("h4",null,"j")),o.a.createElement("div",{className:"k"===this.colorOn?"blue-key":"white-key",style:{left:400}},o.a.createElement("h3",null,"A"),o.a.createElement("h4",null,"k")),o.a.createElement("div",{className:"l"===this.colorOn?"blue-key":"white-key",style:{left:450}},o.a.createElement("h3",null,"B"),o.a.createElement("h4",null,"l")),o.a.createElement("div",{className:";"===this.colorOn?"blue-key":"white-key",style:{left:500}},o.a.createElement("h3",null,"C"),o.a.createElement("h4",null,";")),o.a.createElement("div",{className:"w"===this.colorOn?"black-blue-key":"black-key",style:{left:85}},o.a.createElement("h4",null,"A#"),o.a.createElement("h5",null,"w")),o.a.createElement("div",{className:"r"===this.colorOn?"black-blue-key":"black-key",style:{left:185}},o.a.createElement("h4",null,"C#"),o.a.createElement("h5",null,"r")),o.a.createElement("div",{className:"t"===this.colorOn?"black-blue-key":"black-key",style:{left:235}},o.a.createElement("h4",null,"D#"),o.a.createElement("h5",null,"t")),o.a.createElement("div",{className:"u"===this.colorOn?"black-blue-key":"black-key",style:{left:335}},o.a.createElement("h4",null,"F#"),o.a.createElement("h5",null,"u")),o.a.createElement("div",{className:"i"===this.colorOn?"black-blue-key":"black-key",style:{left:385}},o.a.createElement("h4",null,"G#"),o.a.createElement("h5",null,"i")),o.a.createElement("div",{className:"o"===this.colorOn?"black-blue-key":"black-key",style:{left:435}},o.a.createElement("h4",null,"A#"),o.a.createElement("h5",null,"o")))),o.a.createElement("p",null,o.a.createElement("h3",null,"Press shift to change octave")),o.a.createElement("p",null,"Current Octave: ",0===this.shiftKey?"Medium":1===this.shiftKey?"High":"Low"),o.a.createElement("p",null,o.a.createElement("h3",null,"Hit Space to change length of the note.")),o.a.createElement("p",null,"Current note length: ",.5===this.playtime?"Short":1===this.playtime?"Medium":1.5===this.playtime?"Long":"Longest"),o.a.createElement("p",null,o.a.createElement("h3",null,"Press m for chords.")),o.a.createElement("p",null,"Current chord setting: ",0===this.chords?"Off":1===this.chords?"Major":"Minor"),o.a.createElement("p",null,o.a.createElement("h3",null,"Hit Refresh to change instrument")),o.a.createElement(v.a,{ref:function(t){return e.midiSounds=t},appElementName:"root",instruments:[3,258]})))}}]),a}(i.Component);a(98);function N(){window.location.reload()}var P=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),c=0;c<r;c++)l[c]=arguments[c];return(e=t.call.apply(t,[this].concat(l))).state={recordStatus:!1,recordTune:{beatPlayed:[],timePlayed:[]}},e.selectedDrum=[],e}return Object(r.a)(a,[{key:"playBeat",value:function(e){this.midiSounds.playDrumsNow([e]),this.state.recordStatus&&(this.state.recordTune.beatPlayed.push(e),this.state.recordTune.timePlayed.push(new Date),console.log(this.state.recordTune))}},{key:"sendKeysFromDrums",value:function(e){R.emit("sendFromDrums",e)}},{key:"playDrum",value:function(e){switch(e){case"f":this.playBeat(110),this.sendKeysFromDrums([110]);break;case"g":this.playBeat(40),this.sendKeysFromDrums([40]);break;case"t":this.playBeat(60),this.sendKeysFromDrums([60]);break;case"b":this.playBeat(5),this.sendKeysFromDrums([5]);break;case"y":this.playBeat(75),this.sendKeysFromDrums([75]);break;case"h":this.playBeat(15),this.sendKeysFromDrums([15]);break;case"j":this.playBeat(35),this.sendKeysFromDrums([35])}}},{key:"toggleRecordStatus",value:function(){this.state.recordStatus=!this.state.recordStatus,this.state.recordStatus?document.getElementById("record-btn").innerHTML="Stop":(document.getElementById("record-btn").innerHTML="Record",document.getElementById("play-btn").disabled=!1)}},{key:"wait",value:function(){var e=Object(E.a)(y.a.mark((function e(t){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){setTimeout(e,t)})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"playRecord",value:function(){var e=Object(E.a)(y.a.mark((function e(){var t;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("playing"),t=0;case 2:if(!(t<this.state.recordTune.beatPlayed.length)){e.next=11;break}return e.next=5,this.playBeat(this.state.recordTune.beatPlayed[t]);case 5:return console.log(t),e.next=8,this.wait(this.state.recordTune.timePlayed[t+1]-this.state.recordTune.timePlayed[t]);case 8:t++,e.next=2;break;case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"resetRecord",value:function(){this.setState({recordTune:{beatPlayed:[],timePlayed:[]}})}},{key:"render",value:function(){var e=this;return R.on("receiveFromGuitar",(function(t){e.midiSounds.playChordNow(258,t,1.5)})),R.on("receiveFromPiano",(function(t){e.midiSounds.playChordNow(3,t.note,t.length)})),R.on("receiveFromDrums",(function(t){e.midiSounds.playDrumsNow(t)})),o.a.createElement("div",{className:"Drum"},o.a.createElement(k.a,{handleKeys:["all"],onKeyEvent:function(t,a){return e.playDrum(t)}}),o.a.createElement("header",{id:"main-header"},o.a.createElement("div",{className:"container"},o.a.createElement("h1",{contentEditable:!0},"Travel Ban",o.a.createElement("span",{style:{color:"#9a0415"}},"d")))),o.a.createElement("nav",{id:"navbar"},o.a.createElement("div",{className:"container"},o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement("a",{onClick:N},"Home")),o.a.createElement("li",null,o.a.createElement("a",{id:"record-btn",onClick:this.toggleRecordStatus.bind(this)},"Record")),o.a.createElement("li",null,o.a.createElement("a",{id:"play-btn",onClick:this.playRecord.bind(this)},"Play")),o.a.createElement("li",null,o.a.createElement("a",{onClick:this.resetRecord.bind(this)},"Reset"))))),o.a.createElement("p",null,"Click play only after you stop recording!#issue needs to be fixed--\x3edisable playbutton while in recording mode"),o.a.createElement("div",{className:"relative"},o.a.createElement("img",{src:"assets/images/drum_kit.png"})),o.a.createElement("p",null,"Hit Refresh to change instrument"),o.a.createElement(v.a,{ref:function(t){return e.midiSounds=t},appElementName:"root",instruments:[258,3]}))}}]),a}(i.Component);function O(){window.location.reload()}var S=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),c=0;c<r;c++)l[c]=arguments[c];return(e=t.call.apply(t,[this].concat(l))).shiftKey=0,e.chords=0,e.base=60,e.strum=!1,e.state={recordStatus:!1,recordTune:{beatPlayed:[],timePlayed:[]}},e.mapping=[["a",45],["b",47],["c",48],["d",50],["e",52],["f",53],["g",55]],e}return Object(r.a)(a,[{key:"playTune",value:function(e){this.midiSounds.playChordNow(258,e,1.5)}},{key:"playNote",value:function(e,t,a){var n,r=[],l=Object(f.a)(this.mapping);try{for(l.s();!(n=l.n()).done;){var c=n.value;if(0===t){if(0===a&&e===c[0])return r=this.strum?[c[1],c[1]+7,c[1]+12,c[1]+16,c[1]+19]:[c[1],c[1]+7,c[1]+12];if(1===a&&e===c[0])return r=this.strum?[c[1],c[1]+7,c[1]+12,c[1]+15,c[1]+19]:[c[1],c[1]+7,c[1]+12]}if(1===t){if(this.base=c[1]+1,0===a&&e===c[0])return r=this.strum?[this.base,this.base+7,this.base+12,this.base+16,this.base+19]:[this.base,this.base+7,this.base+12];if(1===a&&e===c[0])return r=this.strum?[this.base,this.base+7,this.base+12,this.base+16,this.base+19]:[this.base,this.base+7,this.base+12]}}}catch(i){l.e(i)}finally{l.f()}return this.state.recordStatus&&(this.state.recordTune.beatPlayed.push(r),this.state.recordTune.timePlayed.push(new Date),console.log(this.state.recordTune)),[]}},{key:"sendKeysFromGuitar",value:function(e){R.emit("sendFromGuitar",e)}},{key:"playGuitar",value:function(e){"shift"===e&&(this.shiftKey=(this.shiftKey+1)%2),"m"===e&&(this.chords=(this.chords+1)%2),this.strum=!this.strum,this.setState({});var t=this.playNote(e,this.shiftKey,this.chords);0!=t.length&&(this.sendKeysFromGuitar(t),this.playTune(t))}},{key:"toggleRecordStatus",value:function(){this.state.recordStatus=!this.state.recordStatus,this.state.recordStatus?(document.getElementById("record-btn").innerHTML="Stop",console.log(this.state.recordStatus)):(document.getElementById("record-btn").innerHTML="Record",document.getElementById("play-btn").disabled=!1)}},{key:"wait",value:function(){var e=Object(E.a)(y.a.mark((function e(t){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){setTimeout(e,t)})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"playRecord",value:function(){var e=Object(E.a)(y.a.mark((function e(){var t;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("playing"),t=0;case 2:if(!(t<this.state.recordTune.beatPlayed.length)){e.next=11;break}return e.next=5,this.midiSounds.playChordNow(258,this.state.recordTune.beatPlayed[t],1.5);case 5:return console.log(t),e.next=8,this.wait(this.state.recordTune.timePlayed[t+1]-this.state.recordTune.timePlayed[t]);case 8:t++,e.next=2;break;case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"resetRecord",value:function(){this.setState({recordTune:{beatPlayed:[],timePlayed:[]}})}},{key:"render",value:function(){var e=this;return R.on("receiveFromDrums",(function(t){e.midiSounds.playDrumsNow(t)})),R.on("receiveFromPiano",(function(t){e.midiSounds.playChordNow(3,t.note,t.length)})),R.on("receiveFromGuitar",(function(t){e.midiSounds.playChordNow(258,t,1.5)})),o.a.createElement("div",{className:"App"},o.a.createElement("header",{id:"main-header"},o.a.createElement("div",{className:"container"},o.a.createElement("h1",{contentEditable:!0},"Travel Ban",o.a.createElement("span",{style:{color:"#9a0415"}},"d")))),o.a.createElement("nav",{id:"navbar"},o.a.createElement("div",{className:"container"},o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement("a",{onClick:O},"Home")),o.a.createElement("li",null,o.a.createElement("a",{id:"record-btn",onClick:this.toggleRecordStatus.bind(this)},"Record")),o.a.createElement("li",null,o.a.createElement("a",{id:"play-btn",onClick:this.playRecord.bind(this)},"Play")),o.a.createElement("li",null,o.a.createElement("a",{onClick:this.resetRecord.bind(this)},"Reset"))))),o.a.createElement("p",{className:"App-intro"},"Press the letter of the chord you want to play ('a' = A major)."),o.a.createElement(k.a,{handleKeys:["all"],onKeyEvent:function(t,a){return e.playGuitar(t)}}),o.a.createElement("p",null,"Click play only after you stop recording!#issue needs to be fixed--\x3edisable playbutton while in recording mode"),o.a.createElement("div",{className:"image"}),o.a.createElement("p",null,o.a.createElement("h3",null,"Press shift to change between natural chords and sharp/flats.")),o.a.createElement("p",null,"Current chord type: ",0===this.shiftKey?"Natural":"Sharp/Flat"),o.a.createElement("p",null,o.a.createElement("h3",null,"Press m to toggle between major and minor chords.")),o.a.createElement("p",null,"Current chord setting: ",0===this.chords?"Major":"Minor"),o.a.createElement("p",null,o.a.createElement("h3",null,"Hit Refresh to change instrument")),o.a.createElement(v.a,{ref:function(t){return e.midiSounds=t},appElementName:"root",instruments:[258,3]}))}}]),a}(i.Component);function C(e){R.emit("selected instrument",e)}function T(){C("Piano"),u.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(w,null)),document.getElementById("root"))}function j(){C("Guitar"),u.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(S,null)),document.getElementById("root"))}function B(){C("Drums"),u.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(P,null)),document.getElementById("root"))}var K=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("body",null,o.a.createElement("header",{id:"main-header"},o.a.createElement("div",{className:"container"},o.a.createElement("h1",{contentEditable:!0},"Travel Ban",o.a.createElement("span",{style:{color:"#9a0415"}},"d")))),o.a.createElement("nav",{id:"navbar"},o.a.createElement("div",{className:"container"},o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement("a",{onClick:"window.location.reload();"},"Home")),o.a.createElement("li",null,o.a.createElement("a",{onClick:B},"Drums")),o.a.createElement("li",null,o.a.createElement("a",{onClick:j},"Guitar")),o.a.createElement("li",null,o.a.createElement("a",{onClick:T},"Piano"))))),o.a.createElement("section",{id:"showcase"},o.a.createElement("div",{className:"container"},o.a.createElement("h1",null,"Miss jamming out with your friends? Connect from anywhere and play together in real-time."),o.a.createElement("h2",null,"Choose an instrument from the navbar to get started."))),o.a.createElement("section",{id:"image"},o.a.createElement("div",{className:"container"}))),o.a.createElement("footer",{id:"main-footer"},o.a.createElement("h3",null,"Copyright 2020 Travel Band -- Image by HaoMin SiMa")))}}]),a}(i.Component),R=d()();function x(){!function(){var e=document.getElementById("myRoomJoin").value;R.emit("roomToJoin",e)}(),u.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(K,null)),document.getElementById("root"))}"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}));var D=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("body",null,o.a.createElement("header",{id:"main-header"},o.a.createElement("div",{className:"container"},o.a.createElement("h1",{contentEditable:!0},"Travel Ban",o.a.createElement("span",{style:{color:"#9a0415"}},"d")))),o.a.createElement("nav",{id:"navbar"},o.a.createElement("div",{className:"container"},o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement("a",{onClick:"window.location.reload();"},"Home")),o.a.createElement("input",{type:"text",placeholder:"enter room id to join/create",id:"myRoomJoin"}),o.a.createElement("button",{type:"button",onClick:x},"Join")))),o.a.createElement("section",{id:"showcase"},o.a.createElement("div",{className:"container"},o.a.createElement("h1",null,"Miss jamming out with your friends? Connect from anywhere and play together in real-time."),o.a.createElement("h2",null,"Choose an instrument from the navbar to get started."))),o.a.createElement("section",{id:"image"},o.a.createElement("div",{className:"container"}))),o.a.createElement("footer",{id:"main-footer"},o.a.createElement("h3",null,"Copyright 2020 Travel Band -- Image by HaoMin SiMa")))}}]),a}(i.Component);u.a.render(o.a.createElement(D,null),document.getElementById("root"));t.default=D}},[[44,1,2]]]);
//# sourceMappingURL=main.3a417db0.chunk.js.map