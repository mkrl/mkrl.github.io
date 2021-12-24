import{i as s}from"./vendor.5d72a16d.js";const l=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}};l();const c=s({host:document.querySelector("#terminal"),welcomeMessage:"Hi. Make yourself at home. Don't hesitate to ask for help if you need it.",prompt:"guest@mkrl.xyz:~$ ",commands:{about:{name:"about",description:"about me and this place",func:({type:r})=>{r("Hi. I'm Mikhail. I'm a software engineer. This is my home page. By default you won't be greeted with a logotype, fancy design or a catchy title. If you need something, you can directly ask for the information you need, the good ol CLI way. This entire website is (probably) under 8 kb (under 4 gzipped). Whoa!",16)}},norris:{name:"norris",description:"fetch a Chuck Norris joke",func:({stop:r,start:n,print:a})=>{n(),fetch("https://api.icndb.com/jokes/random?limitTo=[nerdy]").then(o=>o.json()).then(o=>a(o.value.joke)).catch(o=>a(o)).finally(()=>r())}},contact:{name:"contact",description:"find ways to contact me",func:({print:r})=>{r('<a href="mailto:self@mkrl.xyz">self@mkrl.xyz</a><br><a href="https://t.me/mkrlk" target="blank">Telegram</a><br><a href="https://github.com/mkrl/" target="blank">GitHub</a><br><a href="https://stackoverflow.com/users/7753036/mkrl" target="blank">Stack Overflow</a><br><a href="https://dev.to/mkrl" target="blank">dev.to</a>')}},keys:{name:"keys",description:"public ssh keys",func:({print:r})=>{r('<a href="/keys/work.pub" target="blank">work.pub</a><br><a href="/keys/server.pub" target="blank">server.pub</a>')}},repo:{name:"repo",description:"source code",func:({print:r})=>{r('<a href="https://github.com/mkrl/mkrl.github.io" target="blank">Click</a>')}}}});c.input.focus();