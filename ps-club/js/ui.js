import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';
import { doc, onSnapshot } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';
import { auth, db, isFirebaseConfigured } from './firebase.js';

export const demoZones = [
  { id:'zone-1', name:'Arena #1', category:'ps5', console:'PlayStation 5', capacity:2, price:800, description:'PS5 с 4K TV, DualSense и подборкой спортивных игр.', tags:['PS5','2 игрока','4K'], status:'available' },
  { id:'zone-2', name:'Arena #2', category:'ps5', console:'PlayStation 5', capacity:4, price:1100, description:'Большой экран и 4 контроллера для компании друзей.', tags:['PS5','4 игрока','120Hz'], status:'available' },
  { id:'zone-3', name:'VIP Room', category:'vip', console:'PlayStation 5', capacity:6, price:1800, description:'Приватная комната, большой экран и максимум комфорта.', tags:['VIP','6 игроков','Private'], status:'available' },
  { id:'zone-4', name:'Classic #1', category:'ps4', console:'PlayStation 4 Pro', capacity:2, price:550, description:'Комфортная зона для FIFA, Mortal Kombat и сюжетных хитов.', tags:['PS4','2 игрока','Full HD'], status:'available' },
  { id:'zone-5', name:'Classic #2', category:'ps4', console:'PlayStation 4 Pro', capacity:4, price:700, description:'Четыре контроллера и большая библиотека игр.', tags:['PS4','4 игрока','Multiplayer'], status:'available' },
  { id:'zone-6', name:'Arena #3', category:'ps5', console:'PlayStation 5', capacity:2, price:850, description:'Тихая зона для рейтинговых матчей и турниров.', tags:['PS5','2 игрока','Tournament'], status:'busy' }
];

export function money(v){return new Intl.NumberFormat('ru-RU').format(v)+' ₸/час'}
export function esc(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]))}
export function showToast(msg){const el=document.querySelector('#toast');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>el.classList.remove('show'),3000)}
export function renderHeader(active='home'){
 const h=document.querySelector('#appHeader'); if(!h)return;
 h.innerHTML=`<header class="site-header"><div class="shell header-inner"><a class="brand" href="index.html"><span class="brand-mark">PS</span><span class="brand-name">PLAYSTATION CLUB</span></a><nav class="nav"><a class="${active==='home'?'active':''}" href="index.html">Игровые зоны</a><a class="${active==='bookings'?'active':''}" href="bookings.html">Бронирования</a><a class="${active==='profile'?'active':''}" href="profile.html">Профиль</a><a class="${active==='admin'?'active':''}" href="admin.html">Админ</a></nav><div class="header-user" id="headerUser"><a class="btn btn-secondary" href="login.html">Войти</a></div></div></header>`;
 if(auth){onAuthStateChanged(auth, async user=>{const hu=document.querySelector('#headerUser');if(!hu)return;if(!user){hu.innerHTML='<a class="btn btn-secondary" href="login.html">Войти</a>';return;}let name=user.email?.split('@')[0]||'Игрок';if(db){onSnapshot(doc(db,'users',user.uid),snap=>{name=snap.exists()?(snap.data().name||name):name;hu.innerHTML=`<a class="avatar" href="profile.html">${esc(name.slice(0,2).toUpperCase())}</a><span class="user-name">${esc(name)}</span><button class="btn btn-secondary" id="logoutBtn">Выйти</button>`;document.querySelector('#logoutBtn')?.addEventListener('click',()=>signOut(auth));});}else{hu.innerHTML=`<a class="avatar" href="profile.html">${esc(name.slice(0,2).toUpperCase())}</a><button class="btn btn-secondary" id="logoutBtn">Выйти</button>`;document.querySelector('#logoutBtn')?.addEventListener('click',()=>signOut(auth));}})}
}
export function renderFooter(){const f=document.querySelector('#appFooter');if(f)f.innerHTML=`<footer class="site-footer"><div class="shell footer-inner"><span>© 2026 PlayStation Club</span><span>Firebase Firestore · Authentication · Real-time</span></div></footer>`}
export function requireAuth(redirect='login.html'){return new Promise(resolve=>{if(!auth){resolve(null);return;}onAuthStateChanged(auth,user=>{if(!user)location.href=redirect;else resolve(user)},{once:true})})}
export function firebaseNotice(){if(isFirebaseConfigured)return;return `<div class="notice" style="margin:0 0 18px">Демо-режим: добавьте Firebase Web config в <code>js/firebase.js</code>, чтобы включить Auth и Firestore.</div>`}
