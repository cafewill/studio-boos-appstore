import {random, shuffled, copy} from '../../shared/random.js';
export const kinds=['circle','triangle','square','leaf','star'];
export function createState(seed){const r=random(seed),target=Math.floor(r()*5);return {target,items:shuffled([...Array(3).fill(target),...Array.from({length:22},()=> (target+1+Math.floor(r()*4))%5)],r),found:[],done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||s.items[a.id]!==s.target||s.found.includes(a.id))return s;const found=[...s.found,a.id];return {...s,found,done:found.length===3};}
export const hint=s=>({type:'tap',id:s.items.findIndex((v,i)=>v===s.target&&!s.found.includes(i))});
