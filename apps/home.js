import {brandMarkup} from './shared/brand.js';
import {CONTENTS} from './catalog.js';
import {CATEGORIES,isPlayable,summarizeContents,filterContents} from './catalog-summary.js';
import {icon,garden} from './shared/garden-art.js';
import {shape,palette,escape} from './shared/board-ui.js';
document.querySelector('#home-brand').innerHTML=brandMarkup();
document.querySelector('#hero-play').insertAdjacentHTML('afterbegin',icon('leaf'));
document.querySelector('#hero-art').innerHTML=`<div class="hero-canvas">${garden([],0,true)}</div><figcaption class="art-note">${icon('sparkle')}<span>나의 속도로 발견하는 작은 세계</span></figcaption>`;
document.querySelector('#footer-note').insertAdjacentHTML('afterbegin',icon('leaf'));
let category='all',age='all',query='';
const counts=summarizeContents(CONTENTS);
const overview=document.querySelector('#catalog-overview');
overview.innerHTML=CATEGORIES.map(c=>`<button type="button" class="overview-card overview-${c.tone}" data-category="${c.id}" aria-pressed="${c.id==='all'}" aria-controls="catalog" aria-label="${c.label} ${counts[c.id]}개 모두 보기"><span class="overview-icon" aria-hidden="true">${shape(c.kind,{all:'#e3c46b',learn:'#97bdaf',think:'#efad85',create:'#b7ade0'}[c.tone])}</span><span class="overview-label">${c.label}</span><span class="overview-value"><strong>${counts[c.id]}</strong><span>개</span></span></button>`).join('');
const filters=document.createElement('div');filters.className='catalog-controls';filters.innerHTML=`<div class="filter-group" aria-label="놀이 분야">${CATEGORIES.map(({id:v,label:t})=>`<button type="button" class="filter-chip" data-category="${v}" aria-pressed="${v==='all'}">${t}<span class="filter-count">${counts[v]}</span></button>`).join('')}</div><div class="filter-group" aria-label="주 대상 연령">${[['all','모든 나이'],['3-5','만 3~5세'],['6-8','만 6~8세'],['9-12','만 9~12세']].map(([v,t])=>`<button type="button" class="filter-chip" data-age="${v}" aria-pressed="${v==='all'}">${t}</button>`).join('')}</div><label class="catalog-search">${icon('help')}<span class="sr-only">놀이 이름과 주제로 찾기</span><input type="search" placeholder="어떤 놀이가 궁금해요?" autocomplete="off" maxlength="60"></label><p class="catalog-count" role="status" aria-live="polite"></p>`;
document.querySelector('#catalog').before(filters);
function render(){const rows=filterContents(CONTENTS,{category,age,query});
 document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===category)));
 filters.querySelectorAll('[data-age]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.age===age)));
 document.querySelector('.catalog-count').textContent=`전체 ${counts.all}개 중 ${rows.length}개의 놀이를 만나요`;
 document.querySelector('#catalog').innerHTML=rows.length?rows.map(c=>{const index=CONTENTS.indexOf(c),kinds=['leaf','circle','triangle','square','star','bell','drop','car'];return `<article class="content-card"><div class="card-art" style="background:${['#e8eddd','#f3e7dc','#e9e7f0'][index%3]}"><span class="card-type">${{education:'살펴보며 배우기',game:'생각하며 놀이',creative:'자유롭게 상상'}[c.category]}</span>${c.thumbnail?`<img class="content-cover" src="${escape(c.thumbnail)}" alt="" loading="lazy" width="600" height="360">`:index===0?garden([],0,true):`<div class="preview-shapes">${shape(kinds[index%8],palette[index%4])}${shape(kinds[(index+3)%8],palette[(index+1)%4])}</div>`}</div><div class="card-info"><div class="card-meta"><span>만 ${c.ageBand.replace('-','~')}세</span><span>·</span><span>${escape(c.skills.join(' · '))}</span></div><h3>${escape(c.title)}</h3><p>${escape(c.description)}</p>${isPlayable(c)?`<a class="button secondary" href="${c.slug}/">${icon('play')}함께 놀기</a>`:'<span class="coming-label">다음 놀이를 준비하고 있어요</span>'}</div></article>`;}).join(''):'<p class="empty-catalog">다른 이름이나 나이로 찾아볼까요?</p>';
}
filters.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.category)category=b.dataset.category;if(b.dataset.age)age=b.dataset.age;render();});
overview.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;category=b.dataset.category;age='all';query='';filters.querySelector('input').value='';render();document.querySelector('#list-title').focus({preventScroll:true});document.querySelector('#content-list').scrollIntoView({block:'start',behavior:'instant'});});
filters.querySelector('input').addEventListener('input',e=>{query=e.target.value.trim();render();});render();

// 좁은 화면은 축소된 소개가 아니라, 직접 고르는 발견 경험을 제공한다.
const discoveries=[
 {slug:'shape-garden',label:'살펴봐요',kind:'leaf',color:'#efad85',message:'같은 모양을 만나면, 꽃이 피어요.',tag:'모양과 관찰'},
 {slug:'little-delivery',label:'생각해요',kind:'car',color:'#97bdaf',message:'내가 이은 길로 작은 선물이 도착해요.',tag:'경로와 계획'},
 {slug:'sound-paint',label:'표현해요',kind:'bell',color:'#b7ade0',message:'톡톡 켠 소리가 나만의 리듬이 돼요.',tag:'소리와 창작'}
];
const discoveryTabs=document.querySelector('#discovery-tabs'),discoveryCard=document.querySelector('#discovery-card');
function chooseDiscovery(index){
 const d=discoveries[index],c=CONTENTS.find(v=>v.slug===d.slug);
 discoveryTabs.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
 discoveryCard.innerHTML=`<a class="discovery-feature" href="${d.slug}/" style="--discovery-color:${d.color}"><div class="discovery-visual" aria-hidden="true">${shape(d.kind,d.color)}<span class="discovery-spark">${icon('sparkle')}</span></div><div class="discovery-copy"><span class="discovery-tag">${d.tag} · 만 ${c.ageBand.replace('-','~')}세</span><h2>${escape(c.title)}</h2><p>${d.message}</p><span class="discovery-go">${icon('play')}이 놀이 시작하기</span></div></a>`;
}
discoveryTabs.innerHTML=discoveries.map((d,i)=>`<button type="button" data-discovery="${i}" aria-pressed="${i===0}">${shape(d.kind,d.color)}<span>${d.label}</span></button>`).join('');
discoveryTabs.addEventListener('click',e=>{const b=e.target.closest('[data-discovery]');if(b)chooseDiscovery(Number(b.dataset.discovery));});chooseDiscovery(0);
