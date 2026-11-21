import {random, shuffled, copy} from '../../shared/random.js';
export function createState(seed){const r=random(seed),target=1+Math.floor(r()*3);return {target,items:shuffled([0,0,0,1,1,2,2,2,2],r),found:[],done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||!Number.isInteger(a.id)||s.items[a.id]!==s.target-1||s.found.includes(a.id))return s;const found=[...s.found,a.id];return {...s,found,done:found.length===s.items.filter(x=>x===s.target-1).length};}
export const hint=s=>({type:'tap',id:s.items.findIndex((v,i)=>v===s.target-1&&!s.found.includes(i))});
