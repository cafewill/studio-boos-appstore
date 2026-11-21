import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {CONTENTS} from '../apps/catalog.js';
import {random} from '../apps/shared/random.js';
const slugs=['sprout-lab','weather-studio','orbit-playground','body-trail','gear-workshop','water-workshop','robot-instructions','fossil-field','fraction-bakery','balance-playground'];
let checks=0;
const check=(value,label)=>{assert.ok(value,label);checks++;};
const models=Object.fromEntries(await Promise.all(slugs.map(async slug=>[slug,await import(`../apps/${slug}/src/model.js`)])));
function invariant(slug,s){
 check(typeof s.done==='boolean',slug+' completion type');
 if(slug==='sprout-lab'){check(s.stage>=0&&s.stage<=3,'growth stages');check(s.done===(s.stage===3),'growth completion');}
 if(slug==='weather-studio'){check(s.pool+s.vapor+s.cloud===6,'water cycle conservation');check([s.pool,s.vapor,s.cloud].every(n=>Number.isInteger(n)&&n>=0),'nonnegative cycle');}
 if(slug==='orbit-playground')check(!s.done||(s.placed.every(Boolean)&&s.ticks===4),'orbit must place all before completion');
 if(slug==='body-trail')check(s.step>=0&&s.step<=5&&s.done===(s.step===5),'ordered digestion');
 if(slug==='gear-workshop'){check(s.turns.every((n,i)=>i%2?n<=0:n>=0),'meshing directions');check(!s.done||s.linkedTurns>=3,'transmission completion');}
 if(slug==='water-workshop'){check(s.tank+s.cups.reduce((a,b)=>a+b,0)===6,'distribution conservation');check(s.cups.every((n,i)=>n>=0&&n<=s.needs[i]),'no overflow');check(!s.done||s.cups.every((n,i)=>n===s.needs[i]),'all plants watered');}
 if(slug==='robot-instructions'){check(s.x>=0&&s.x<4&&s.y>=0&&s.y<4,'robot bounds');check(!s.walls.some(([x,y])=>x===s.x&&y===s.y),'robot cannot enter obstacle');check(s.pc<=s.program.length&&s.program.length<=24,'program bounds');check(!s.done||(s.x===3&&s.y===0),'robot goal');}
 if(slug==='fossil-field'){check(s.dust.every(n=>Number.isInteger(n)&&n>=0&&n<=2),'dust layers');check(!s.done||(s.dust.every(n=>n===0)&&s.stand>=0),'dig before display');}
 if(slug==='fraction-bakery'){check(new Set(s.selected).size===s.selected.length&&s.selected.every(n=>n>=0&&n<s.slices),'unique bread slices');check(!s.done||s.selected.length*s.targetD===s.targetN*s.slices,'equivalent fractions');}
 if(slug==='balance-playground')check(!s.done||models[slug].moment(s)===0,'equal moments');
}
for(const slug of slugs){
 const model=models[slug],view=await import(`../apps/${slug}/src/view.js`);
 const config=CONTENTS.find(c=>c.slug===slug);
 check(config?.thumbnail===slug+'/cover.svg',slug+' original thumbnail');
 const css=await readFile(new URL(`../apps/${slug}/style.css`,import.meta.url),'utf8');
 check(!/\]\s+@media/.test(css),slug+' valid responsive at-rule');
 check(css.includes(`[data-app="${slug}"]`),slug+' scoped styles');
 for(let seed=0;seed<64;seed++){
  let s=model.createState(seed);const rng=random(seed);
  for(let step=0;step<80&&!s.done;step++){
   invariant(slug,s);
   const h=model.hint(s),markup=view.render(s);
   const buttons=[...markup.matchAll(/<button\b[^>]*>/g)].map(m=>m[0]);
   check(buttons.some(b=>b.includes(`data-action="${h.type}"`)&&b.includes(`data-id="${h.id}"`)&&!/\sdisabled(?:\s|>)/.test(b)),slug+' hint targets enabled DOM button');
   // Mix exploratory moves with guided recovery; persistent invalid commands must not corrupt state.
   const a=step%3===0?{type:['tap','select','tool','start','clear','finish'][Math.floor(rng()*6)],id:Math.floor(rng()*16)}:h;
   s=model.reduce(s,a);
  }
  for(let step=0;step<200&&!s.done;step++){invariant(slug,s);const next=model.reduce(s,model.hint(s));check(next!==s,slug+' recovery progresses');s=next;}
  invariant(slug,s);check(s.done,slug+' recovers from exploration');
 }
 console.log('PASS expansion domain',slug);
}
// Independent counterexamples, beyond the hint path.
const weather=models['weather-studio'];let w=weather.createState();check(weather.reduce(w,{type:'tool',id:1})===w,'cannot condense without vapor');check(weather.reduce(w,{type:'tool',id:2})===w,'cannot rain without cloud');
const gears=models['gear-workshop'];let g=gears.createState(0);g=gears.reduce(g,{type:'start',id:0});check(g.turns.join(',')==='1,0,0,0','gap stops downstream rotation');g=gears.reduce(g,{type:'tap',id:1});g=gears.reduce(g,{type:'start',id:0});check(g.turns.join(',')==='2,-1,0,0','connected neighbor reverses');
const fraction=models['fraction-bakery'];let f=fraction.createState(0);f=fraction.reduce(f,{type:'tool',id:4});f=fraction.reduce(f,{type:'tap',id:0});check(fraction.reduce(f,{type:'finish',id:0})===f,'one quarter is not one half');f=fraction.reduce(f,{type:'tap',id:1});check(fraction.reduce(f,{type:'finish',id:0}).done,'two quarters equals one half');
let robot=models['robot-instructions'].createState(0);robot=models['robot-instructions'].reduce(robot,{type:'tap',id:1});robot=models['robot-instructions'].reduce(robot,{type:'start',id:0});robot=models['robot-instructions'].reduce(robot,{type:'tap',id:0});robot=models['robot-instructions'].reduce(robot,{type:'start',id:0});check(robot.x===0&&robot.y===3&&robot.blocked,'robot stops at map edge');
console.log(`PASS: ${slugs.length} new domains, ${checks} invariant / exploration / enabled-hint checks.`);
