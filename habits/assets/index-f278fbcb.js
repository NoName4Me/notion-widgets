(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();function _(e,r="YYYY-MM-DD"){let n=r;const a=e?new Date(e):new Date,t=a.getFullYear(),o=a.getMonth()+1,s=a.getDate(),d=a.getHours(),c=a.getMinutes(),l=a.getSeconds(),h={"Y+":String(t),"M+":String(o),"D+":String(s),"h+":String(d),"m+":String(c),"s+":String(l)};return n=Object.entries(h).reduce((u,[p,g])=>u.replace(new RegExp(p),m=>(m.length>1?"00"+g:g).slice(m.length===1?0:-m.length)),n),n}const E=e=>document.querySelector(e);function y(e,r={}){const n=document.createElement("div");return e&&(Array.isArray(e)?n.classList.add(...e):n.classList.add(e)),Object.keys(r).forEach(a=>{n.setAttribute(a,r[a])}),n}const w=()=>{const{container:e}=f;e.querySelector(".habits-header").innerHTML='<div class="habits-header__months"></div>';const r=E(".habits-header__months");new Array(12).fill(0).forEach((n,a)=>{const t=y();t.innerText=String(a+1),r.appendChild(t)})},D=3600*1e3*24,$=()=>{const{year:e,container:r}=f,n=r.querySelector(".habits-main");n.innerHTML='<aside class="habits-header__weeks"></aside>',w();const a=E(".habits-header__weeks");["Mon","Wed","Fri"].forEach(l=>{const h=y();h.innerText=l,a.appendChild(h)});const t=new Date(`${e}-01-01`),o=new Date(`${e}-12-31`),s=(6+t.getDay())%7,d=(+o-+t)/D+1,c=y("habits-days",{"data-start-of-week":s});new Array(d).fill(0).forEach((l,h)=>{c.appendChild(y(["day"],{"date-day":h+1,title:_(h*D+t.getTime())}))}),n.appendChild(c)},A=e=>{$();let r=0,n=0;const{container:a,project:t,dataType:o,levels:s,colors:d,year:c}=f;e.collection.data.forEach(u=>{if(u.Date){const p=a.querySelector(`.day[title="${u.Date[0][0]}"]`);if(!p)return;if(u[t]){const g=u[t]?.[0][0];if(o==="check"&&g)p.classList.add("is-check"),n++;else if(o==="number"&&/\d+/.test(g)){const m=parseFloat(g);n++,r+=m;let b;for(b=s.length-1;b>=0&&!(m>=s[b]);b--);const L=d.length?Math.min(d.length-1,F):F;p.classList.add("level-"+Math.min(b+1,L)),p.setAttribute("title",p.getAttribute("title")+`
${g}`)}}return}});const l=Date.now()>new Date(`${+c+1}/01/01`).getTime(),h=(Date.now()-new Date(`${c}/01/01`).getTime())/D;C({total:o==="check"?n:r,average:(r/(l?365:h)).toFixed(1)})},S=()=>{w(),E(".habits-main").innerHTML='<div class="habits-main__months"></div>'},O=e=>{S();let r=new Array(12).fill(0);const{project:n,dataType:a,container:t}=f;e.collection.data.forEach(c=>{const l=c.Date[0][0];if(c[n]&&l){const h=new Date(l).getMonth(),u=c[n]?.[0][0];if(a==="check"&&u)r[h]++;else if(a==="number"&&/\d+/.test(u)){const p=parseFloat(u);r[h]+=p}}});const o=Math.max(...r),s=o?100/o:0;r.forEach(c=>{const l=y(void 0,{"data-value":c.toFixed(0)});Object.assign(l.style,{height:`${c*s}px`}),t.querySelector(".habits-main__months").appendChild(l)});const d=r.reduce((c,l)=>c+l,0);C({total:d,average:(d/12).toFixed(1)})},C=({total:e,average:r})=>{const{overview:n,unit:a,type:t}=f,o=E(".habits-footer");if(n.includes("total")){const s=y("habits-total");s.innerHTML=`<strong>Toal: </strong>${e} ${a}`,o.appendChild(s)}if(n.includes("total")){const s=y("habits-average");s.innerHTML=`<strong>Average: </strong>${r} ${a}/${t===M.Bar?"月":"天"}`,o.appendChild(s)}},T=(e="")=>{console.warn(e)};var M=(e=>(e.Heatmap="heatmap",e.Bar="bar",e))(M||{});const x=e=>{const{type:r,container:n}=f;return n.classList.add(`is-${r}`),r==="bar"?O(e):A(e)},i=new URL(location.href).searchParams,f={type:i.get("type")||"heatmap",levels:i.get("levels")?i.get("levels").split(",").map(e=>parseFloat(e)):[],project:i.get("project")||"",databaseId:i.get("db-id")||"",year:i.get("year")||new Date().getFullYear(),colors:i.get("colors")?.split(",")||[],container:document.querySelector(".habits"),dataType:i.get("data-type")||"check",unit:i.get("unit")||"",overview:i.get("overview")?i.get("overview").split(","):[]},P=()=>{if(!f.databaseId){T();return}H({shape:i.get("shape")||"4px",colorActive:i.get("color-active")||i.get("color")||"",colorDefault:i.get("color-default")||"#f1f1ef",colors:f.colors,theme:i.get("theme")||"green"})},F=3,v=e=>`--habit-${e}`,k={red:["#FFC0CB","#FF647F","#FF0833","#AC001E"],blue:["#89CFF0","#38AEE6","#167CAC","#0B415A"],green:["#77DD77","#32C732","#1F7D1F","#0D340D"],purple:["#E0B0FF","#BC54FF","#9600F7","#5F009C"],black:["#C0C2C9","#8F929F","#616471","#36383F"]};function H({shape:e,colorActive:r,colorDefault:n,colors:a,theme:t}){const o=document.documentElement;e==="circle"&&(e="50%"),o.style.setProperty(v("item-border-radius"),e),o.style.setProperty(v("color-check"),r),o.style.setProperty(v("color-uncheck"),n),a.forEach((s,d)=>{o.style.setProperty(v(`color-${d}`),`#${s}`)}),k[t]?.forEach((s,d)=>{o.style.setProperty(v(`theme-color-${d}`),s)})}P();const Y=await fetch(`https://notion-api.splitbee.io/v1/page/${f.databaseId}`).then(e=>e.json()).then(e=>e[Object.keys(e).find(r=>e[r].collection)]);x(Y);