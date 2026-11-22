import assert from 'node:assert/strict';
import {CONTENTS} from '../apps/catalog.js';
import {random} from '../apps/shared/random.js';
const slugs=['harmony-steps','doodle-parade','memory-postcards','density-bottles','number-elevator','word-atlas','pose-puppet','word-weave','clue-cabin','face-turn','crossing-stones','window-twins','row-clear','pebble-merge','festival-table','gallery-curator','stage-spotlight','arc-garden','route-weaver','cushion-slide','town-links','mirror-duet','field-camera','tilt-corners','number-harbor','ripple-pond','gentle-domino','hill-rescue','forest-echo','shared-island'];
const modules=Object.fromEntries(await Promise.all(slugs.map(async slug=>[slug,await import(`../apps/${slug}/src/model.js`)])));
let checks=0;const check=(v,m)=>{assert.ok(v,m);checks++;};
function invariant(slug,s,initial){
 check(typeof s.done==='boolean',slug+' completion boolean');
 switch(slug){
 case 'harmony-steps':check(new Set(s.selected).size===s.selected.length,'unique keys');check(!s.done||s.selected.length===3&&s.target.every(n=>s.selected.includes(n)),'chord target');break;
 case 'doodle-parade':check(s.frame>=0&&s.frame<=3,'manual frame bounds');check(!s.done||s.frame===3&&s.pixels.some(Boolean),'drawing before walk');break;
 case 'memory-postcards':check([...s.queue,...s.kept].sort().join(',')==='0,1,2','cards conserved');break;
 case 'density-bottles':check(s.drops.every(n=>Number.isInteger(n)&&n>=0&&n<=2),'bottle capacity');break;
 case 'number-elevator':check(s.tens*10+s.ones===initial.ones,'place value conservation');check(s.ones>=0&&s.tens>=0,'place value nonnegative');break;
 case 'word-atlas':check(s.opened.every(n=>n>=0&&n<=2)&&new Set(s.opened).size===s.opened.length,'atlas entries');break;
 case 'pose-puppet':check(s.angles.every(n=>n>=0&&n<=3),'joint range');break;
 case 'word-weave':check([...s.tiles].sort().join(',')==='0,1,2','words conserved');break;
 case 'clue-cabin':check(!s.done||s.revealed.length===2&&s.picked===s.target,'two clues before answer');break;
 case 'face-turn':check([...s.values].sort().join(',')==='0,1,2,3','turn permutation');break;
 case 'crossing-stones':check(s.col>=0&&s.col<3&&s.row>=0&&s.row<=3,'river bounds');check(s.row===0||s.row===3||s.col===modules[slug].stone(s.row,s.phase),'stay on river stone');break;
 case 'window-twins':check(s.found.every(n=>s.changed.includes(n))&&new Set(s.found).size===s.found.length,'only changed places count');break;
 case 'row-clear':check(s.cleared===s.rows.filter(r=>r===null).length,'cleared rows removed');break;
 case 'pebble-merge':check(s.pieces.reduce((n,v)=>n+(v===null?0:3**v),0)===9,'merge seed units conserved');break;
 case 'festival-table':check(s.stock.every(n=>n>=0&&n<=5),'craft resource bounds');break;
 case 'gallery-curator':check(s.marks.length<=12&&s.marks.every(m=>m.slot>=0&&m.slot<6),'canvas slots');break;
 case 'stage-spotlight':check(!s.done||modules[slug].lit(s).every(Boolean),'light shared among all');break;
 case 'arc-garden':check(s.power>=1&&s.power<=5,'launch power');check(!s.done||s.last===s.target,'basket exact target');break;
 case 'route-weaver':check([...s.ends].sort().join(',')==='0,1,2','ribbon endpoints conserved');break;
 case 'cushion-slide':check(s.blue<=s.yellow&&s.blue>=0&&s.yellow<=12,'balls cannot pass each other');check(!s.done||s.yellow===s.target,'ball at target');break;
 case 'town-links':check(modules[slug].cost(s)<=4,'link material budget');check(!s.done||modules[slug].connected(s),'all towns connected');break;
 case 'mirror-duet':check(s.positions.every(n=>n>=0&&n<9)&&s.stage<=3,'mirror field bounds');check(!s.done||s.stage===3,'three mirror poses');break;
 case 'field-camera':check(s.pan>=0&&s.pan<5&&[1,2].includes(s.zoom),'camera bounds');check(new Set(s.album).size===s.album.length,'no duplicate photo collection');break;
 case 'tilt-corners':check(s.cells.length===3&&new Set(s.cells).size===3&&s.cells.every(n=>n>=0&&n<9),'tilt blocks conserved without overlap');break;
 case 'number-harbor':check(s.rows.flat().length===3+s.index,'one boat per arrival');check(s.rows.every(r=>r.every((n,i)=>i===0||n>r[i-1])),'harbor increasing');break;
 case 'ripple-pond':check(s.bearing>=0&&s.bearing<4&&s.range>=1&&s.range<=3,'ripple bounds');break;
 case 'gentle-domino':check(s.heights.every(n=>n>=0&&n<3),'domino reach bounds');check(!s.done||s.last===4,'all four reached');break;
 case 'hill-rescue':check(s.car>=0&&s.car<=4&&s.heights.every(n=>n>=0&&n<=3),'terrain/car bounds');break;
 case 'forest-echo':check(s.seen.every(n=>s.leaves.includes(n))&&new Set(s.seen).size===s.seen.length,'forest observations');check(!s.done||s.node===0&&s.seen.length===3,'return to root');break;
 case 'shared-island':check(s.stock.every(n=>n>=0&&n<=2),'allocation resources bounded');check(s.roles.every(n=>n>=0&&n<=2),'valid assignments');break;
 }
}
for(const slug of slugs){
 const m=modules[slug],v=await import(`../apps/${slug}/src/view.js`);const c=CONTENTS.find(c=>c.slug===slug);check(c?.thumbnail===slug+'/cover.svg',slug+' original cover');
 for(let seed=0;seed<32;seed++){
  const initial=m.createState(seed),rng=random(seed);let s=initial,history=[];
  function apply(a){const old=s,before=JSON.stringify(s);s=m.reduce(s,a);check(JSON.stringify(old)===before,slug+' no mutation');if(JSON.stringify(s)!==before)history.push(a);invariant(slug,s,initial);}
  function hint(){const h=m.hint(s),buttons=[...v.render(s).matchAll(/<button\b[^>]*>/g)].map(m=>m[0]);check(h&&Number.isInteger(h.id),slug+' integer hint');check(buttons.some(b=>b.includes(`data-action="${h.type}"`)&&b.includes(`data-id="${h.id}"`)&&!/\sdisabled(?:\s|>)/.test(b)),slug+' hint points to enabled button '+JSON.stringify(h));return h;}
  for(let i=0;i<60&&!s.done;i++)apply(i%3===0?{type:['tap','select','tool','finish','start','clear','reveal'][Math.floor(rng()*7)],id:Math.floor(rng()*20)}:hint());
  for(let i=0;i<200&&!s.done;i++){const before=JSON.stringify(s);apply(hint());check(before!==JSON.stringify(s),slug+' recovery progresses');}
  check(s.done,slug+' recover after exploratory moves');let restored=m.createState(seed);for(const a of history)restored=m.reduce(restored,a);check(JSON.stringify(restored)===JSON.stringify(s),slug+' exploration replay');
 }
 console.log('PASS discover30 domain',slug);
}
const bridge=modules['town-links'];check(!bridge.connected({...bridge.createState(0),on:[true,false,true,false,false]}),'disconnected towns rejected');check(bridge.connected({...bridge.createState(0),on:[true,true,true,false,false]}),'four-material tree connects towns');
const merge=modules['pebble-merge'];let s=merge.createState();for(const id of [0,1,2])s=merge.reduce(s,{type:'tap',id});check(s.pieces[0]===1&&s.pieces[1]===null&&s.pieces[2]===null,'three seeds become one sprout');
const row=modules['row-clear'];s=row.createState(0);check(row.reduce(s,{type:'tap',id:1})===s,'filled row block cannot be overwritten');
const turn=modules['face-turn'];for(let i=0;i<4;i++)check(turn.moved(turn.moved([0,1,2,3],i),i).join(',')==='0,1,2,3','strip turn inverse');
const tilt=modules['tilt-corners'];check(tilt.tilted([0,4,8],0).join(',')==='0,1,2','gravity gathers columns upward');check(tilt.tilted([0,4,8],3).join(',')==='0,3,6','gravity gathers rows leftward');
const value=modules['number-elevator'];s=value.createState(7);const bundled=value.reduce(s,{type:'tool',id:0});check(value.reduce(bundled,{type:'tool',id:1}).ones===s.ones,'unbundling restores total');
const arc=modules['arc-garden'];check(arc.landing(2,1)>arc.landing(2,0),'toy high arc reaches farther');
console.log(`PASS: ${slugs.length} new domains, ${checks} independent invariants, exploration, recovery, replay and enabled-hint checks.`);
