import {random, shuffled, copy} from '../../shared/random.js';
export function mask(rotation){const masks=[3,10,12,5];return masks[rotation%4];}
export const combined=(a,b)=>mask(a)^mask((b+1)%4);
export function createState(seed){const r=random(seed);let goalA=Math.floor(r()*4),goalB=Math.floor(r()*4);if(combined(goalA,goalB)===combined(0,0))goalA=(goalA+1)%4;return {a:0,b:0,goalA,goalB,target:combined(goalA,goalB),done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||![0,1].includes(a.id))return s;const n=copy(s);if(a.id===0)n.a=(n.a+1)%4;else n.b=(n.b+1)%4;n.done=combined(n.a,n.b)===n.target;return n;}
export const hint=s=>({type:'tap',id:s.a!==s.goalA?0:1});
