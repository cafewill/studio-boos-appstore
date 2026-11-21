import assert from 'node:assert/strict';
import {NEW_CONTENTS} from '../apps/content-registry.js';
let checks=0;
function check(v,m){assert.ok(v,m);checks++;}
const reports=[];
for(const c of NEW_CONTENTS){
 const model=await import(`../apps/${c.slug}/src/model.js`),view=await import(`../apps/${c.slug}/src/view.js`);
 let longest=0;
 for(const seed of [0,1,2,3,4,5,17,42,997,0xffffffff]){
  let state=model.createState(seed),actions=[];
  check(state.done===false,c.slug+' starts unfinished');check(JSON.stringify(state)===JSON.stringify(model.createState(seed)),c.slug+' deterministic');
  for(let step=0;step<200&&!state.done;step++){
   const before=JSON.stringify(state);let a=model.hint(state);
   check(a&&Number.isInteger(a.id)&&a.id>=0,c.slug+' missing hint '+JSON.stringify(state));
   const next=model.reduce(state,a);check(JSON.stringify(state)===before,c.slug+' mutates input');check(JSON.stringify(next)!==before,c.slug+' hint makes no progress '+JSON.stringify(a));
   actions.push(a);state=next;
   const markup=view.render(state);check(!/undefined|NaN|https?:\/\//.test(markup),c.slug+' invalid view');
  }
  check(state.done,c.slug+' did not finish '+JSON.stringify(state));longest=Math.max(longest,actions.length);
  let restored=model.createState(seed);for(const action of actions)restored=model.reduce(restored,action);check(JSON.stringify(restored)===JSON.stringify(state),c.slug+' replay');
  const before=JSON.stringify(state);check(JSON.stringify(model.reduce(state,{type:'tap',id:999}))===before,c.slug+' finished state invariant');
 }
 reports.push({slug:c.slug,seeds:10,longest});console.log('PASS',c.slug,'longest',longest);
}
console.log(JSON.stringify({contents:reports.length,checks,reports},null,2));
