import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {CONTENTS} from '../apps/catalog.js';
import {random} from '../apps/shared/random.js';
import {bfs} from '../apps/shared/search.js';
const slugs=['star-stitch','earth-river','skyline-build','invention-chain','robot-atelier','gentle-vet','bedtime-lantern','animal-greetings','shadow-stage','folded-view','ink-ribbon','bloom-prune','meadow-breeze','island-sculpt','paper-panels','swim-turn','track-switch','seed-trade','mosaic-tiles','duet-rhythm','story-studio','stage-directions','pigment-lab','cozy-habitat','orchard-season','bakery-pattern','prism-window','poly-room','knot-cloud','bridge-pals'];
let checks=0;const check=(v,m)=>{assert.ok(v,m);checks++;};
function invariant(slug,s,initial){
 check(typeof s.done==='boolean',slug+' boolean completion');
 switch(slug){
 case 'star-stitch':check(s.path.every((v,i)=>v===s.order[i]),'star order');break;
 case 'earth-river':check(s.hill+s.sediment+s.delta===initial.hill,'sediment conservation');check(Math.min(s.hill,s.sediment,s.delta)>=0,'nonnegative sediment');break;
 case 'skyline-build':check(s.columns.every(v=>v>=0&&v<=s.target),'floor limits');check(s.columns[1]<=Math.min(s.columns[0],s.columns[2])+1,'side support');break;
 case 'invention-chain':check(s.observed.length===new Set(s.observed).size,'unique observations');check(!s.done||s.observed.length===2,'both output states observed');break;
 case 'robot-atelier':check(s.parts.every(n=>n>=-1&&n<=2),'valid robot parts');break;
 case 'gentle-vet':check(s.dust>=0&&s.dust<=3,'dust bounds');check(!s.blanket||s.brushed,'clean before blanket');break;
 case 'bedtime-lantern':check(s.lights.every(v=>v>=0&&v<=2),'lantern bounds');break;
 case 'animal-greetings':check(new Set(s.seen).size===s.seen.length,'unique gestures');break;
 case 'shadow-stage':check(s.angle%90===0&&s.angle>=0&&s.angle<360,'quarter rotations');break;
 case 'folded-view':check([s.yaw,s.pitch].every(n=>n>=0&&n<4),'view orientation');break;
 case 'ink-ribbon':check(s.path.every((n,i)=>!s.holes.includes(n)&&(i===0||Math.abs(n%5-s.path[i-1]%5)+Math.abs(Math.floor(n/5)-Math.floor(s.path[i-1]/5))===1)),'continuous ink avoids holes');break;
 case 'bloom-prune':check(!s.done||(s.shade.every(i=>!s.branches[i])&&s.branches.some(Boolean)),'open light and preserve branch');break;
 case 'meadow-breeze':check(s.x>=0&&s.x<5&&s.y>=0&&s.y<3,'breeze bounds');break;
 case 'island-sculpt':check(s.heights.every(n=>n>=0&&n<=3),'terrain bounds');check(!s.done||(s.heights.includes(0)&&s.heights.some(n=>n>=2)),'water and hill');break;
 case 'paper-panels':check([...s.panels].sort().join(',')==='0,1,2','panels conserved');break;
 case 'swim-turn':check(s.cell>=0&&s.cell<16&&!s.rocks.includes(s.cell),'boat avoids rock and edge');break;
 case 'track-switch':check(s.station>=0&&s.station<=2,'valid station');check(!s.done||(s.station===0&&s.visited.length===2),'round trip both stations');break;
 case 'seed-trade':check(s.left[0]+s.right[0]===initial.left[0]&&s.left[1]+s.right[1]===initial.right[1],'seed types conserved');check([...s.left,...s.right].every(n=>n>=0),'seed nonnegative');break;
 case 'mosaic-tiles':check([...s.tiles].sort((a,b)=>a-b).join(',')==='1,2,3,4,5,6','number tiles conserved');break;
 case 'duet-rhythm':check(s.beats.length<=8&&s.beats.every(n=>n===0||n===1),'duet score bounds');break;
 case 'story-studio':check(s.choices.length<=3&&s.choices.every(n=>n>=0&&n<3),'story branch bounds');break;
 case 'stage-directions':check(s.index>=0&&s.index<=3,'gesture cards count');break;
 case 'pigment-lab':check(s.drops.every(n=>n>=0)&&s.drops.reduce((a,b)=>a+b,0)<=9,'pigment bounds');break;
 case 'cozy-habitat':check(new Set(s.placed.filter(n=>n>=0)).size===s.placed.filter(n=>n>=0).length,'habitat decorations do not overlap');check(s.placed.every(n=>[-1,0,2,3,5].includes(n)),'preserve animal spaces');break;
 case 'orchard-season':check(s.plots.every(n=>n>=-1&&n<=s.grow),'crop stage bounds');check(s.harvest>=0&&s.harvest<=3,'harvest bounds');break;
 case 'bakery-pattern':check(s.plates.flat().sort().join(',')==='0,0,1,1','cake pieces conserved');check(s.plates.every(p=>p.length<=2),'plate capacity');break;
 case 'prism-window':check(s.on.length===3&&s.on.every(n=>typeof n==='boolean'),'logical films');break;
 case 'poly-room':{const cells=s.placed.filter(Boolean).flat();check(cells.length===new Set(cells).size&&cells.every(n=>n>=0&&n<6),'poly no overlap');check(!s.done||cells.length===6,'cover whole board');break;}
 case 'knot-cloud':check(s.removed.length===new Set(s.removed).size,'unique removal');break;
 case 'bridge-pals':check(s.positions.every(p=>p>=0&&p<=6),'friends bounds');check(!s.positions.some(p=>p>=3)||s.latched,'cannot cross closed bridge');break;
 }
}
for(const slug of slugs){
 const m=await import(`../apps/${slug}/src/model.js`),v=await import(`../apps/${slug}/src/view.js`);const c=CONTENTS.find(c=>c.slug===slug);check(c?.status==='implemented'&&c.thumbnail===slug+'/cover.svg',slug+' registration');
 const css=await readFile(new URL(`../apps/${slug}/style.css`,import.meta.url),'utf8');check(css.includes(`[data-app="${slug}"]`),slug+' scoped style');
 for(let seed=0;seed<32;seed++){
  const initial=m.createState(seed),rng=random(seed);let s=initial,history=[];
  function apply(a){const before=JSON.stringify(s),old=s;s=m.reduce(s,a);check(JSON.stringify(old)===before,slug+' no input mutation');if(JSON.stringify(s)!==before)history.push(a);invariant(slug,s,initial);}
  function enabledHint(){const h=m.hint(s),markup=v.render(s);check(h&&Number.isInteger(h.id),slug+' integer hint');const buttons=[...markup.matchAll(/<button\b[^>]*>/g)].map(m=>m[0]);check(buttons.some(b=>b.includes(`data-action="${h.type}"`)&&b.includes(`data-id="${h.id}"`)&&!/\sdisabled(?:\s|>)/.test(b)),slug+' hint has enabled button '+JSON.stringify(h));return h;}
  for(let i=0;i<60&&!s.done;i++)apply(i%3===0?{type:['tap','tool','select','start','finish','clear','reveal'][Math.floor(rng()*7)],id:Math.floor(rng()*20)}:enabledHint());
  for(let i=0;i<200&&!s.done;i++){const before=JSON.stringify(s);apply(enabledHint());check(before!==JSON.stringify(s),slug+' recovery makes progress');}
  check(s.done,slug+' recover from exploratory actions');let restored=m.createState(seed);for(const a of history)restored=m.reduce(restored,a);check(JSON.stringify(restored)===JSON.stringify(s),slug+' replay exploration');
 }
 console.log('PASS next30 domain',slug);
}
check(bfs(0,n=>n<3?[n+1]:[],n=>n===3).join(',')==='0,1,2,3','BFS shortest path');check(bfs(0,()=>[],n=>n===3).length===0,'BFS unreachable');
const machine=await import('../apps/invention-chain/src/model.js');for(const a of [false,true])for(const b of [false,true]){check(machine.output({inputs:[a,b],gate:0})===(a&&b),'AND truth table');check(machine.output({inputs:[a,b],gate:1})===(a||b),'OR truth table');}
const prism=await import('../apps/prism-window/src/model.js');check(prism.visible({on:[true,true,false]})===5,'overlap cancels common cell');check(prism.visible({on:[false,false,false]})===0,'empty films');
const swim=await import('../apps/swim-turn/src/model.js');const water=swim.createState(1);check(swim.moved({...water,cell:4},1)===4,'rock blocks direct entry');check(swim.moved({...water,cell:0},2)===4,'current stops before rock');check(swim.moved({...water,rocks:[],cell:1},2)===6,'current drifts after entering row');
const bridge=await import('../apps/bridge-pals/src/model.js');let b={...bridge.createState(0),positions:[2,0]};check(bridge.reduce(b,{type:'tap',id:0})===b,'a friend cannot hold their own crossing plate');b={...b,active:1,positions:[2,2]};check(bridge.reduce(b,{type:'tap',id:0}).latched,'other friend opens crossing');
const blocks=await import('../apps/poly-room/src/model.js');check(blocks.cells(2,0)===null,'domino cannot wrap row');check(blocks.cells(4,1)===null,'domino cannot exceed floor');
const pigment=await import('../apps/pigment-lab/src/model.js');check(pigment.blend([2,1,0]).join(',')===pigment.blend([4,2,0]).join(','),'proportional pigment equal color');
console.log(`PASS: ${slugs.length} next contents, ${checks} independent invariant, exploration, replay and enabled-hint checks.`);
