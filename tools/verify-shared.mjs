import assert from 'node:assert/strict';
import {createScopedStorage} from '../apps/shared/storage.js';
import {createLifecycle} from '../apps/shared/lifecycle.js';
import {validAction} from '../apps/shared/random.js';
let n=0;const check=(v,message)=>{assert.ok(v,message);n++;};
const data=new Map([['other:v1:progress','keep']]),backend={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
const a=createScopedStorage('alpha',1,()=>backend),b=createScopedStorage('beta',1,()=>backend);
a.write('progress',{seed:1});b.write('progress',{seed:2});check(a.read('progress',v=>v?.seed===1).seed===1,'own data');check(b.read('progress',v=>v?.seed===2).seed===2,'isolated');a.clear(['progress']);check(a.read('progress',Boolean)===null,'clear');check(b.read('progress',Boolean).seed===2,'other content retained');check(data.get('other:v1:progress')==='keep','unrelated key');
for(const value of ['{','null','1','[]']){data.set('damaged:v1:progress',value);const s=createScopedStorage('damaged',1,()=>backend);check(s.read('progress',v=>!!v&&Number.isInteger(v.seed),null)===null,'invalid data');}
const bad=createScopedStorage('blocked',1,()=>{throw Error('blocked');});bad.write('progress',{ok:true});check(bad.read('progress',v=>v?.ok).ok,'blocked memory');bad.clear(['progress']);check(bad.read('progress',Boolean)===null,'blocked clear');
const readonly=createScopedStorage('old',1,()=>({getItem:()=>JSON.stringify({old:true}),setItem:()=>{throw Error();},removeItem:()=>{throw Error();}}));readonly.write('progress',{new:true});check(readonly.read('progress',v=>v?.new).new,'memory supersedes disk');readonly.clear(['progress']);check(readonly.read('progress',Boolean)===null,'read-only clear for current session');
let count=0,cleaned=0;const life=createLifecycle(),target=new EventTarget();life.on(target,'sample',()=>count++);target.dispatchEvent(new Event('sample'));check(count===1,'listener');life.pause();check(life.paused,'pause');life.resume();check(!life.paused,'resume');life.cleanup(()=>cleaned++);life.destroy();life.destroy();target.dispatchEvent(new Event('sample'));check(count===1&&cleaned===1,'idempotent cleanup');life.resume();check(life.paused,'cannot resume destroyed instance');life.cleanup(()=>cleaned++);check(cleaned===2,'late cleanup');
for(const value of [null,{}, {type:'tap',id:-1},{type:'tap',id:NaN},{type:'tap',id:'0'},{type:'unexpected',id:0}])check(!validAction(value),'invalid action');check(validAction({type:'tap',id:0}),'valid action');
console.log(`PASS: ${n} shared storage, lifecycle and action validation checks.`);
