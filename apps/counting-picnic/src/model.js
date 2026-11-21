import {random, shuffled, copy} from '../../shared/random.js';
export function createState(seed){const r=random(seed);const count=1+Math.floor(r()*10);return {count,options:shuffled([count,...shuffled(Array.from({length:10},(_,i)=>i+1).filter(n=>n!==count),r).slice(0,2)],r),done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||s.options[a.id]!==s.count)return s;return {...s,done:true};}
export const hint=s=>({type:'tap',id:s.options.indexOf(s.count)});
