import {random, shuffled, copy} from '../../shared/random.js';
export const groups=['탈것','악기','자연 모양'];export const toys=[{name:'작은 자동차',kind:'car',group:0},{name:'종',kind:'bell',group:1},{name:'나뭇잎 모양',kind:'leaf',group:2}];
export function createState(seed){const r=random(seed);return {items:shuffled([0,1,2,0,1],r),index:0,placed:[0,0,0],done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||a.id!==toys[s.items[s.index]].group)return s;const n=copy(s);n.placed[a.id]++;n.index++;n.done=n.index===n.items.length;return n;}
export const hint=s=>({type:'tap',id:toys[s.items[s.index]]?.group??0});
