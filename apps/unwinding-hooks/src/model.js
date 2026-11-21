import {random, shuffled, copy} from '../../shared/random.js';
export function createState(seed){const r=random(seed),order=shuffled([0,1,2,3,4,5],r),deps=[[],[0],[0],[1],[2],[3,4]];return {order,deps,removed:[],done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||a.id<0||a.id>=6||s.removed.includes(a.id)||!s.deps[a.id].every(id=>s.removed.includes(id)))return s;const removed=[...s.removed,a.id];return {...s,removed,done:removed.length===6};}
export const hint=s=>({type:'tap',id:s.order.find(id=>!s.removed.includes(id)&&s.deps[id].every(d=>s.removed.includes(d)))});
