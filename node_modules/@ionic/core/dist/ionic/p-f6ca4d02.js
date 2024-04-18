/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{e as o,w as s}from"./p-c1c77386.js";import{f as e,s as t}from"./p-06e58c4e.js";import{c as r}from"./p-b51e4004.js";import"./p-06fee233.js";const a=()=>{const a=window;a.addEventListener("statusTap",(()=>{o((()=>{const o=document.elementFromPoint(a.innerWidth/2,a.innerHeight/2);if(!o)return;const c=e(o);c&&new Promise((o=>r(c,o))).then((()=>{s((async()=>{c.style.setProperty("--overflow","hidden"),await t(c,300),c.style.removeProperty("--overflow")}))}))}))}))};export{a as startStatusTap}