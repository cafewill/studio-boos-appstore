import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createSession, current, choose, advance, rounds, SHAPES, TOTAL } from '../apps/shape-garden/src/activity.js';
import { createStorage, KEYS } from '../apps/shape-garden/src/storage.js';
let checks=0;
const check=(value,message)=>{assert.ok(value,message);checks++;};
for(let seed=0;seed<1000;seed++) for(const count of [2,3]) {
  const qs=rounds(seed,count);check(qs.length===TOTAL,'five rounds');
  check(new Set(qs.slice(0,3).map(q=>q.target)).size===3,'all shapes in first three');
  for(const q of qs){check(q.options.length===count,'choice count');check(new Set(q.options.map(o=>o.shape)).size===count,'unique choices');check(q.options.filter(o=>o.shape===q.target).length===1,'unique answer');check(q.options.find(o=>o.shape===q.target).color!==q.targetColor,'matching independent of color');check(q.options.every(o=>SHAPES.includes(o.shape)),'valid shapes');}
}
for(const count of [2,3]) {
 const s=createSession(42,[],count);check(!advance(s),'cannot skip without hint');
 const wrong=current(s).options.find(o=>o.shape!==current(s).target).shape;
 check(choose(s,'invalid')==='ignored','invalid choice ignored');check(choose(s,wrong)==='retry','retry');check(!s.hint,'one retry no automatic hint');choose(s,wrong);check(s.hint,'second retry shows hint');check(advance(s,true),'hint permits skip');check(s.results[0]==='skipped','skip preserved');
 while(current(s)){const answer=current(s).target;check(choose(s,answer)==='matched','answer');check(choose(s,answer)==='ignored','duplicate answer ignored');check(advance(s),'advance');check(!advance(s),'duplicate next cannot jump');}
 check(s.results.length===5,'completion capped');check(!advance(s,true),'complete cannot advance');
}
const data=new Map([['other:v1:key','keep']]);
const storage=createStorage(()=>({getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)}));
check(storage.preferences().sound===false,'sound off by default');storage.savePreferences({sound:true,choices:2});check(storage.preferences().choices===2,'preferences persist');storage.saveProgress({seed:42,results:['matched','skipped']});check(storage.progress().results.length===2,'progress persist');
for(const bad of ['{','null',JSON.stringify({seed:-1,results:[]}),JSON.stringify({seed:1,results:['bad']}),JSON.stringify({seed:1,results:Array(6).fill('matched')})]){data.set(KEYS.progress,bad);const fresh=createStorage(()=>({getItem:k=>data.get(k)}));check(fresh.progress()===null,'corrupt progress fallback');}
storage.clear();check(data.get('other:v1:key')==='keep','reset preserves unrelated keys');check(!data.has(KEYS.preferences)&&!data.has(KEYS.progress),'reset only content keys');
const blocked=createStorage(()=>{throw new Error('blocked');});blocked.savePreferences({sound:true,choices:2});blocked.saveProgress({seed:1,results:['matched']});check(blocked.preferences().sound,'blocked memory preferences');check(blocked.progress().results.length===1,'blocked memory progress');blocked.clear();check(blocked.progress()===null,'blocked reset');
const readOnlyData = new Map([[KEYS.preferences,JSON.stringify({sound:false,choices:3})],[KEYS.progress,JSON.stringify({seed:2,results:['matched']})]]);
const readOnly=createStorage(()=>({getItem:k=>readOnlyData.get(k)??null,setItem:()=>{throw new Error('quota');},removeItem:()=>{throw new Error('readonly');}}));
readOnly.savePreferences({sound:true,choices:2});check(readOnly.preferences().sound&&readOnly.preferences().choices===2,'write failure uses latest memory value over stale disk');readOnly.clear();check(!readOnly.preferences().sound&&readOnly.preferences().choices===3,'failed remove resets memory settings');check(readOnly.progress()===null,'failed remove resets memory progress');
function luminance(hex){const a=hex.match(/\w\w/g).map(x=>parseInt(x,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return a[0]*.2126+a[1]*.7152+a[2]*.0722;}
function contrast(a,b){const v=[luminance(a),luminance(b)].sort((a,b)=>b-a);return(v[0]+.05)/(v[1]+.05);}
const pairs=[['body','#253e34','#f5f7ef',4.5],['secondary','#52675b','#f5f7ef',4.5],['button','#ffffff','#365d46',4.5],['boundary','#718474','#ffffff',3],['boundary on background','#718474','#f5f7ef',3],...['#efad85','#97bdaf','#b7ade0','#e3c46b'].map(c=>['shape outline','#365d46',c,3])];
for(const [label,a,b,min]of pairs){const ratio=contrast(a,b);check(ratio>=min,`${label} contrast ${ratio}`);console.log(`${label}: ${ratio.toFixed(2)}:1 (min ${min})`);}
const code=readFileSync(new URL('../apps/shape-garden/src/main.js',import.meta.url),'utf8');check(!/fetch\(|XMLHttpRequest|sendBeacon|https?:\/\//.test(code),'no external data requests in main');
console.log(`PASS: ${checks} assertions; 2,000 generated sessions, state transitions, storage failures, contrast.`);
