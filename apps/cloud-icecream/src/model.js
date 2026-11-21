import {random, shuffled, copy} from '../../shared/random.js';
export const names=['살구 맛','잎빛 맛','보라 맛'];
export function createState(seed){const r=random(seed);return {order:Array.from({length:2+Math.floor(r()*2)},()=>Math.floor(r()*3)),scoops:[],done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||a.id!==s.order[s.scoops.length])return s;const scoops=[...s.scoops,a.id];return {...s,scoops,done:scoops.length===s.order.length};}
export const hint=s=>({type:'tap',id:s.order[s.scoops.length]});
