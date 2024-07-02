const U=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}};U();const u=(e,t,n)=>{const o=document.createElement(e);return t&&(o.className=t),n&&(o.innerHTML=n),o},M=(e,t=!1)=>{e.input.readOnly=!t,e.inputContainer.style.opacity=t?"":"0"},q=(e,t)=>{e.className="terminal";const n=u("div","terminal-container"),o=u("div","terminal-type"),r=u("span",void 0,t),s=u("input");return s.setAttribute("type","text"),o.append(r),o.append(s),e.append(n),e.append(o),e.addEventListener("click",()=>s.focus()),{commandContainer:n,input:s,inputContainer:o}};var z=q;const G=(e,t,n,o,r)=>{const s=u("p",void 0,t?r.prompt:e);if(t){const a=u("span","terminal-command",e);s.append(a)}n.append(s),o.scrollIntoView()};var Y=G;const d=(e,t,n)=>{const o=new CustomEvent(e,{detail:n});t.dispatchEvent(o)},V=(e,t)=>{const{print:n}=t,[o,...r]=e.split(" "),s=r.join(" ").match(/('[^']+'|"[^"]+"|[^\s'"]+)/g),a=s===null?[]:s.map(c=>c.replace(/(^['"]|['"]$)/g,"")),i=t.settings.commands[o];i?i.argDescriptions&&i.argDescriptions.length>0&&a.length===0?n(`Usage: ${o} ${i.argDescriptions.map(c=>`[${c}]`).join(" ")}`):(i.func(t,...a),d("onCommand",t.settings.host,e)):(n(`<span class="terminal-error">command not found: ${o}</span>`),d("onCommand404",t.settings.host,e))};var S=V;const L=e=>{const{settings:{host:t}}=e;M(e),e.isProcessRunning=!0,d("onProcessStart",t)},A=e=>{const{input:t,settings:{host:n}}=e;M(e,!0),e.isProcessRunning=!1,t.focus(),d("onProcessStop",n)},J=(e,t,n,o)=>new Promise(r=>{L(n);const s=u("p",void 0,o?n.settings.prompt:""),a=u("span","terminal-command","");o&&s.append(a),n.commandContainer.append(s);let i=0;const c=o?a:s,_=()=>{i<e.length&&n.isProcessRunning?(c.innerHTML+=e.charAt(i),i++,setTimeout(_,t)):(A(n),r(i===e.length))};setTimeout(_,t)});var K=J;const Q=e=>{const{input:{value:t},history:n,settings:{historyLength:o}}=e;if(t!==n[0]){if(n.length>=o){e.history=[t,...n.slice(0,-1)];return}e.history=[t,...n],e.lastHistoryIndex=0}},T=(e,t)=>{const{history:n,lastHistoryIndex:o}=e,r=n.length-1;let s;t&&o===0||!t&&o===n.length||r<0||(t?(s=o-1,e.input.value=s-1>=0?n[s-1]:""):(s=o+1,e.input.value=n[o]),e.lastHistoryIndex=s)},X=(e,t)=>{const{input:n,print:o}=t;e.addEventListener("keyup",({key:r,ctrlKey:s})=>{if(s&&r==="c"&&t.isProcessRunning)o("^C"),A(t),d("onProcessInterrupt",e);else{if(t.isProcessRunning)return;if(r==="Enter"){t.lastHistoryIndex=0,n.value.length>0?(o(n.value,!0),Q(t),S(n.value,t)):o(" ",!0),n.value="";return}if(r==="ArrowUp"){T(t);return}r==="ArrowDown"&&T(t,!0)}})},B=e=>({name:"help",description:"shows a full list of all available commands",func:({print:t})=>{for(const n in e.settings.commands)Object.hasOwnProperty.call(e.settings.commands,n)&&t(e.settings.commands[n].name+" - "+e.settings.commands[n].description)}});var Z=B;const ee='.terminal{overflow-y:auto;overflow-x:hidden;background-color:var(--terminal-bg-color, black);padding:15px;box-sizing:border-box}.terminal *{color:var(--terminal-fg-color, white);font-family:var(--terminal-font, "Courier New", monospace)}.terminal-type{width:100%;display:flex}.terminal-type>span{padding-right:7pt}.terminal-type>input{flex-grow:2;background:transparent;border:0;font-size:inherit;padding:0}.terminal-type>input:focus{border:none;outline:none}.terminal-container>p{margin:0}span.terminal-command{color:var(--terminal-accent-color, #ffff7d)}span.terminal-error{color:var(--terminal-error-color, #cc1010)}';var te=ee;const ne=()=>{if(document.head.querySelectorAll('link[data-type="terminal"]').length===0){const e=u("style",void 0,te);e.setAttribute("data-type","terminal"),e.setAttribute("type","text/css"),document.head.append(e)}};var oe=ne;const re=(e,t,n)=>{n.prompt=e;const o=t.querySelector("span");o.innerHTML=e};var se=re;const ie=({host:e,welcomeMessage:t,prompt:n="$: ",historyLength:o=50,history:r=[],enableHelp:s=!0,commands:a})=>{const i={host:e,welcomeMessage:t,prompt:n,historyLength:o,enableHelp:s,commands:a};oe();const{commandContainer:c,input:_,inputContainer:C}=z(e,n),m={history:r,lastHistoryIndex:0,isProcessRunning:!1,settings:i,commandContainer:c,inputContainer:C,input:_,print:(p,w=!1)=>Y(p,w,c,_,i),run:p=>S(p,m),start:()=>L(m),stop:()=>A(m),type:(p,w=60,N)=>K(p,w,m,N),setPrompt:p=>se(p,C,i)};return s&&(m.settings.commands.help=Z(m)),X(e,m),d("onInit",e),t&&m.print(t),m};var ae=ie,l={"/about.txt":{name:"about.txt",type:"txt",data:"Hi.<br/>My name is Mikhail. I'm a software engineer mostly focused on developer experience and advocacy. This is my home page.<br>If you need something, feel free to browse around.<br>My entire career is here, condensed in ~30 kilobytes of this website code."},"/contact/README.txt":{name:"README.txt",type:"txt",data:"Find ways to contact me"},"/contact/blog":{name:"blog",type:"url",url:"https://dev.to/mkrl",description:"I sometimes write but there's not much to see. More stuff anytime soon? Who knows."},"/contact/email":{name:"email",type:"url",url:"mailto:self@mkrl.xyz",description:"My personal email. Please do not share it with anyone else. I will not share it with anyone else (this text was generated by Github Copilot and I love it)"},"/contact/github":{name:"github",type:"url",url:"https://github.com/mkrl",description:"A Github page of mine. Some of my actual paid work is open-source, so you can take a peek at that too."},"/contact/linkedin":{name:"linkedin",type:"url",url:"https://www.linkedin.com/in/mkrl/",description:"Let's connect!"},"/contact/twitter":{name:"twitter",type:"url",url:"https://twitter.com/mkrl__",description:"Short messages on the popular platform"},"/experiments/README.txt":{name:"README.txt",type:"txt",data:"A compilation of my hobby projects in software, hardware and other (sometimes silly) things"},"/experiments/favicon-player":{name:"favicon-player",type:"url",url:"https://mkrl.xyz/faviconayer/",description:"Utilizing WebCodecs API to convert & play video stream in a website favicon. I think WebCodecs API is a great addition to the web platform."},"/experiments/fibonacci-indent":{name:"fibonacci-indent",type:"url",url:"https://github.com/mkrl/fibonacci-indent",description:"Atom (you will never be forgotten) package that adjusts your indentation according to the Fibonacci sequence. Tabs or spaces, it doesn't matter. It's all about the numbers."},"/experiments/misbrands":{name:"misbrands",type:"url",url:"https://github.com/mkrl/misbrands",description:"A collection of slightly cursed programming stickers. Print and hand them out on the next conference! Check out the pull requests for more stickers."},"/experiments/nodecg-layouts":{name:"nodecg-layouts",type:"url",url:"https://github.com/mkrl/nodecg-react-layouts",description:"A NodeCG (broadcast graphics software) starter bundle for an easy state-to-replicant management. Words probably don't make sense, unless you come from the NodeCG world."},"/experiments/pgrant":{name:"pgrant",type:"url",url:"https://github.com/mkrl/pgrant",description:"A GUI wrapper for distributing promotional items in Valve Software games."},"/experiments/rack-timeout":{name:"rack-timeout",type:"url",url:"https://github.com/mkrl/rack-timeout",description:"A fork of Rack::Timeout that can be configured to ignore certain Rails request routes. Made for a Stack Overflow question with a bounty :)"},"/experiments/screamforpapers":{name:"screamforpapers",type:"url",url:"https://chromewebstore.google.com/detail/scream-for-papers/dggogdpgelafkkaekbbggifhbfljlldb",description:"All-in-one Chromium extension to submit, track and wishlist conference CFPs"},"/experiments/table-debugger":{name:"table-debugger",type:"url",url:"https://twitter.com/mkrl__/status/1365774927018807297",description:"My first Arduino project is connecting Chrome Developer tools to a table. Smash it for the next breakpoint and instant stress relief."},"/experiments/trow":{name:"trow",type:"url",url:"https://trow.app/",description:"An extremely basic (just the way I like it) version of the scrum poker. Works over WebRTC."},"/experiments/ttty":{name:"ttty",type:"url",url:"https://mkrl.xyz/ttty/",description:`A very simple pure JS lightweight terminal "emulator" that's powering this very website. I managed to squeeze the basic functionality into ~5kb (non-minified).`},"/contact":{name:"contact",type:"dir",description:"Find ways to contact me",entries:[{name:"README.txt",type:"txt",data:"Find ways to contact me"},{name:"blog",type:"url",url:"https://dev.to/mkrl",description:"I sometimes write but there's not much to see. More stuff anytime soon? Who knows."},{name:"email",type:"url",url:"mailto:self@mkrl.xyz",description:"My personal email. Please do not share it with anyone else. I will not share it with anyone else (this text was generated by Github Copilot and I love it)"},{name:"github",type:"url",url:"https://github.com/mkrl",description:"A Github page of mine. Some of my actual paid work is open-source, so you can take a peek at that too."},{name:"linkedin",type:"url",url:"https://www.linkedin.com/in/mkrl/",description:"Let's connect!"},{name:"twitter",type:"url",url:"https://twitter.com/mkrl__",description:"Short messages on the popular platform"}]},"/experiments":{name:"experiments",type:"dir",description:"A compilation of my hobby projects in software, hardware and other (sometimes silly) things",entries:[{name:"README.txt",type:"txt",data:"A compilation of my hobby projects in software, hardware and other (sometimes silly) things"},{name:"favicon-player",type:"url",url:"https://mkrl.xyz/faviconayer/",description:"Utilizing WebCodecs API to convert & play video stream in a website favicon. I think WebCodecs API is a great addition to the web platform."},{name:"fibonacci-indent",type:"url",url:"https://github.com/mkrl/fibonacci-indent",description:"Atom (you will never be forgotten) package that adjusts your indentation according to the Fibonacci sequence. Tabs or spaces, it doesn't matter. It's all about the numbers."},{name:"misbrands",type:"url",url:"https://github.com/mkrl/misbrands",description:"A collection of slightly cursed programming stickers. Print and hand them out on the next conference! Check out the pull requests for more stickers."},{name:"nodecg-layouts",type:"url",url:"https://github.com/mkrl/nodecg-react-layouts",description:"A NodeCG (broadcast graphics software) starter bundle for an easy state-to-replicant management. Words probably don't make sense, unless you come from the NodeCG world."},{name:"pgrant",type:"url",url:"https://github.com/mkrl/pgrant",description:"A GUI wrapper for distributing promotional items in Valve Software games."},{name:"rack-timeout",type:"url",url:"https://github.com/mkrl/rack-timeout",description:"A fork of Rack::Timeout that can be configured to ignore certain Rails request routes. Made for a Stack Overflow question with a bounty :)"},{name:"screamforpapers",type:"url",url:"https://chromewebstore.google.com/detail/scream-for-papers/dggogdpgelafkkaekbbggifhbfljlldb",description:"All-in-one Chromium extension to submit, track and wishlist conference CFPs"},{name:"table-debugger",type:"url",url:"https://twitter.com/mkrl__/status/1365774927018807297",description:"My first Arduino project is connecting Chrome Developer tools to a table. Smash it for the next breakpoint and instant stress relief."},{name:"trow",type:"url",url:"https://trow.app/",description:"An extremely basic (just the way I like it) version of the scrum poker. Works over WebRTC."},{name:"ttty",type:"url",url:"https://mkrl.xyz/ttty/",description:`A very simple pure JS lightweight terminal "emulator" that's powering this very website. I managed to squeeze the basic functionality into ~5kb (non-minified).`}]},"/":{name:"fs",type:"dir",description:!1,entries:[{name:"about.txt",type:"txt",data:"Hi.<br/>My name is Mikhail. I'm a software engineer mostly focused on developer experience and advocacy. This is my home page.<br>If you need something, feel free to browse around.<br>My entire career is here, condensed in ~30 kilobytes of this website code."},{name:"contact",type:"dir",description:"Find ways to contact me",path:"/contact"},{name:"experiments",type:"dir",description:"A compilation of my hobby projects in software, hardware and other (sometimes silly) things",path:"/experiments"}]}};const R='<span class="user">guest@mkrl.xyz</span>',O="vfs://.";let f="/";const F=e=>e.endsWith("/")&&e.length>1?e.slice(0,-1):e,ce=e=>f=e,le=()=>f,me=e=>e.startsWith("~")?`/${e.slice(1)}`:e,ue=e=>{const n=new URL(e,`${O}${f==="/"?"":f}/`).href.slice(O.length);return n==="/"?n:F(n)},g=e=>{const t=F(e);return t.startsWith("/")||t.startsWith("~")?me(t):ue(t)},P=(e,t,n,o="")=>{if(t.length>0){const r=t.reduce((s,a)=>s.length<=a.length?s:a);e.value=e.value.replace(`${o}${n}`,`${o}${r}`)}},pe=e=>{const{input:t}=e;if(!t.value)return;const n=t.value.trim().split(" ");if(n.length===1){const o=Object.keys(e.settings.commands).filter(r=>r.startsWith(n[0]));P(t,o,n[0])}if(n.length>1){const o=n.pop(),r=g(o),a=Object.keys(l).filter(i=>i.startsWith(r));P(t,a,o," ")}},de=e=>{const{input:t}=e;t.addEventListener("keydown",n=>{n.key==="Tab"&&(pe(e),n.preventDefault())})},_e=6,he=[["               (  ) (@@) ( )  (@)  ()    @@    O     @     O     @      ","          (@@@)","      (    )","","   (@@@@)","","(    )"],["               (@@) (  ) (@)  ( ) @()     @ @   O      @     O     @    ","          (   )","      (    )","     @@@@","   (   )","","(@@@@)"],["               ( @)@ (  ) ( ) @( )  ()@        @ @   O      @     O    @","          (   )","      (@@@@)","     ","   (   )","   @@@@","(    )"]].map(e=>e.map(t=>`${" ".repeat(_e)}${t}`)),fe=["      ====        ________                ___________ ","  _D _|  |_______/        \\__I_I_____===__|_________| ","   |(_)---  |   H\\________/ |   |        =|___ ___|   ","   /     |  |   H  |  |     |   |         ||_| |_||   ","  |      |  |   H  |__--------------------| [___] |   ","  | ________|___H__/__|_____/[][]~\\_______|       |   ","  |/ |   |-----------I_____I [][] []  D   |=======|__ "],ye=[["__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|_| "," |/-=|___|=    ||    ||    ||    |_____/~\\___/        ","  \\_/      \\_O=====O=====O=====O/      \\_/            "],["__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|_| "," |/-=|___|=   O=====O=====O=====O|_____/~\\___/        ","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            "],["__/ =| o |=-~O=====O=====O=====O\\ ____Y___________|_| "," |/-=|___|=    ||    ||    ||    |_____/~\\___/        ","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            "],["__/ =| o |=-O=====O=====O=====O \\ ____Y___________|_| "," |/-=|___|=    ||    ||    ||    |_____/~\\___/        ","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            "],["__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|_| "," |/-=|___|=O=====O=====O=====O   |_____/~\\___/        ","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            "],["__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|_| "," |/-=|___|=    ||    ||    ||    |_____/~\\___/        ","  \\_/      \\O=====O=====O=====O_/      \\_/            "]];let v=null,k=!0,y=[];const x=(e,t,n,o)=>{const r=document.createElement("div");r.textContent=n[t].join(`
`),e.innerHTML="",e.appendChild(r);const s=a=>{if(!v||a-v>=80&&o===k){k=!k,v=a;const i=(t+1)%n.length;r.textContent=n[i].join(`
`),x(e,i,n,o)}else y.push(requestAnimationFrame(s))};y.push(requestAnimationFrame(s))},ge=()=>new Promise(e=>{const t=document.createElement("div");t.id="sl",document.body.appendChild(t),document.body.classList.add("sl");const n=document.createElement("pre");t.appendChild(n);const o=document.createElement("div");n.appendChild(o),fe.map(s=>{const a=document.createElement("div");a.textContent=s,n.appendChild(a)});const r=document.createElement("div");n.appendChild(r),x(r,0,ye,!0),x(o,0,he,!1),t.addEventListener("animationend",()=>{n.remove(),t.remove(),y.forEach(s=>cancelAnimationFrame(s)),y=[],document.body.classList.remove("sl"),e()})}),be=`${R}:/$ `,we=new Date,ve={url:" ls-url",dir:" ls-dir"},ke=e=>{const t=e.type==="url"?"a":"span",n=e.type==="url"?` href="${e.url}" target="_blank"`:"";return[`<${t}${n}`,`</${t}>`]},E=e=>l[e].type==="dir",I=(e,t,n)=>`<span class="terminal-error">${e}: ${n} ${t}</span>`,$=(e,t)=>I(e,t,"no such file or directory:"),xe=e=>I("cd",e,"not a directory:"),b=e=>{var o;const[t,n]=ke(e);return`${t} class="ls-item${(o=ve[e.type])!=null?o:""}">${e.name}${n}`},Ae=e=>{const t=document.createElement("table");return e.forEach(n=>{var a;const o=document.createElement("tr"),r=document.createElement("td"),s=document.createElement("td");r.innerHTML=b(n),s.innerText=(a=n.description)!=null?a:"",o.append(r,s),t.append(o)}),t.outerHTML},D=e=>{const t=new Set;return[e.filter(o=>o.startsWith("-")?(o.replace("-","").split("").forEach(r=>t.add(r)),!1):!0),Array.from(t)]},Ee=({setPrompt:e,print:t},...n)=>{var s;const o=(s=n[0])!=null?s:"/",r=g(o);r in l?(E(r)||t(xe(r)),ce(r),e(`${R}:<b>${r}$ </b>`)):t($("cd",r))},Ie=({print:e},...t)=>{const[n,o]=D(t),r=o.includes("l"),s=o.includes("a"),a=n.length===0?le():n[0],i=g(a);if(!(i in l)){e($("ls",i));return}if(!E(i)){e(l[i].name);return}const c=s?[{name:"."},{name:".."},...l[i].entries]:l[i].entries;if(r){e(`${c.length} total`),e(Ae(c));return}e(c.map(b).join(""))},$e=({print:e,start:t,stop:n},...o)=>{const[r]=D(o),s=g(r[0]);if(!(s in l)){e($("cat",s));return}if(E(s)){e(I("cat",s,"is a directory"));return}if(l[s].type==="url"){const{description:i,url:c}=l[s];e(i),e(`<a href="${c}" class="ls-url" target="_blank">${c}</a>`);return}e(l[s].data)},H="\u2514\u2500\u2500",W=(e,t,n)=>{l[e].entries.map(r=>{const a=`${H.repeat(t+1)} ${b(r)}`;n(a),r.type==="dir"&&W(r.path,t+1,n)})},Ce=({print:e})=>{const t=l["/"];e("/"),t.entries.forEach((n,o)=>{e(`${H} ${b(n)}`),n.type==="dir"&&W(n.path,1,e)})},Te=({start:e,stop:t})=>{e(),ge().finally(t)},Oe=e=>{const t=e-we,n=Math.floor(t/1e3),o=Math.floor(n/60),r=Math.floor(o/60),s=Math.floor(r/24);return[{unit:"day",value:s},{unit:"hour",value:r%24},{unit:"minute",value:o%60},{unit:"second",value:n%60}].filter(i=>i.value>0).map(i=>`${i.value} ${i.unit}${i.value>1?"s":""}`).join(", ")},Pe=({print:e})=>{const t=new Intl.DateTimeFormat("en-en",{hour:"numeric",minute:"numeric",second:"numeric",hour12:!1}),n=new Date;e(`${t.format(new Date)} up ${Oe(n)}, 1 user, load average: 0.00, 0.00, 0.00`)},Me=async(e,{type:t,run:n},o=60)=>{for(const r of e)if(await t(r,o,!0))n(r);else break},Se=e=>{const t="background-color: black; color: white; font-style: monospace; font-size: 1.5em;";let n=!1;e.enqueue=o=>{n||console.log('%cImpressive! Now try changing the prompt to something ridiculous with "terminal.setPrompt("\u{1F916}: ")"',t),e.print(o,!0),e.run(o),n=!0},window.terminal=e,console.log("%cWow, you have accessed console in a console website! How deep does that go?",t),console.log('%cYou can directly communicate with the terminal here by using "terminal.enqueue("sl")"',t)},Le=window.location.hash,j=["cat /about.txt","help","ls -la /experiments"],Re=["ls -la /contact"],h=ae({host:document.querySelector("#terminal"),prompt:be,history:[...j].reverse(),commands:{cd:{name:"cd",description:"navigate to a directory",func:Ee},ls:{name:"ls",description:"list directory contents",func:Ie},sl:{name:"sl",description:"run a steam locomotive",func:Te},cat:{name:"cat",description:"view a file",argDescriptions:["file path"],func:$e},tree:{name:"tree",description:"list all files and directories in a tree-like format",func:Ce},clear:{name:"clear",description:"wipe the terminal screen",func:({commandContainer:e})=>e.innerHTML=""},uptime:{name:"uptime",description:"how long have you been here?",func:Pe}}}),Fe=async()=>{de(h),Se(h),await Me(Le==="#contact"?Re:j,h),h.input.focus()};Fe();