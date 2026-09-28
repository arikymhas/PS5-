import { collection, getDocs, limit, onSnapshot, orderBy, query, startAfter, where } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';
import { db, isFirebaseConfigured } from './firebase.js';
import { demoZones, esc, money, renderFooter, renderHeader, showToast } from './ui.js';

renderHeader('home'); renderFooter();
const grid=document.querySelector('#zonesGrid');
const empty=document.querySelector('#emptyState');
const more=document.querySelector('#loadMoreBtn');
const search=document.querySelector('#searchInput');
const category=document.querySelector('#categoryFilter');
const sort=document.querySelector('#sortSelect');
let zones=[]; let lastDoc=null; let unsubscribe=null; const pageSize=6;

function card(z){const busy=z.status==='busy'; return `<article class="zone-card"><div class="zone-visual"><span class="zone-tag">${esc((z.category||'ps5').toUpperCase())}</span><span class="status ${busy?'busy':'available'}">${busy?'Занято':'Свободно'}</span><div class="console-label">${esc(z.console||'PlayStation 5')}</div></div><div class="zone-body"><h3>${esc(z.name)}</h3><p>${esc(z.description||'Игровая зона PlayStation для комфортной сессии.')}</p><div class="zone-meta"><div class="meta-box"><span>Вместимость</span><b>${z.capacity||2} игрока</b></div><div class="meta-box"><span>Скорость</span><b>120 FPS</b></div></div><div class="zone-footer"><div class="price">${money(z.price||0)}</div><a class="btn btn-primary" href="zone.html?id=${encodeURIComponent(z.id)}">${busy?'Подробнее':'Забронировать'}</a></div></div></article>`}
function apply(){let out=[...zones];const q=search.value.trim().toLowerCase();if(q)out=out.filter(z=>[z.name,z.description,z.console,...(z.tags||[])].join(' ').toLowerCase().includes(q));if(category.value!=='all')out=out.filter(z=>z.category===category.value);if(sort.value==='priceAsc')out.sort((a,b)=>(a.price||0)-(b.price||0));if(sort.value==='priceDesc')out.sort((a,b)=>(b.price||0)-(a.price||0));if(sort.value==='capacityDesc')out.sort((a,b)=>(b.capacity||0)-(a.capacity||0));if(sort.value==='nameAsc')out.sort((a,b)=>String(a.name).localeCompare(String(b.name),'ru'));grid.innerHTML=out.map(card).join('');empty.classList.toggle('hidden',out.length>0);document.querySelector('#heroAvailable').textContent=zones.filter(z=>z.status!=='busy').length;}
function loadDemo(){zones=demoZones;apply();more.classList.add('hidden');document.querySelector('#heroUsers').textContent='—';}
async function loadInitial(){if(!isFirebaseConfigured||!db){loadDemo();showToast('Демо-режим: Firebase ещё не подключён.');return;}unsubscribe=onSnapshot(query(collection(db,'zones'),orderBy('createdAt','desc'),limit(pageSize)),snap=>{zones=snap.docs.map(d=>({id:d.id,...d.data()}));lastDoc=snap.docs.at(-1)||null;apply();more.classList.toggle('hidden',snap.docs.length<pageSize);},()=>loadDemo());}
async function loadMore(){if(!db||!lastDoc)return;const q=query(collection(db,'zones'),orderBy('createdAt','desc'),startAfter(lastDoc),limit(pageSize));const snap=await getDocs(q);zones=[...zones,...snap.docs.map(d=>({id:d.id,...d.data()}))];lastDoc=snap.docs.at(-1)||null;apply();more.classList.toggle('hidden',snap.docs.length<pageSize)}
[search,category,sort].forEach(x=>x.addEventListener('input',apply));sort.addEventListener('change',apply);more.addEventListener('click',loadMore);window.addEventListener('beforeunload',()=>unsubscribe?.());loadInitial();
