import {random, shuffled, copy} from '../../shared/random.js';
export const kinds=['leaf','bell','car','star'];export const names=['나뭇잎','작은 종','나무 자동차','별 장식'];
export function createState(seed){const r=random(seed),target=Math.floor(r()*4);return {target,items:shuffled([target,...Array.from({length:11},()=> (target+1+Math.floor(r()*3))%4)],r),opened:[],found:false,done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||a.id<0||a.id>=12)return s;if(!s.opened.includes(a.id))return {...s,opened:[...s.opened,a.id]};return s.items[a.id]===s.target?{...s,found:true,done:true}:s;}
export const hint=s=>({type:'tap',id:s.items.indexOf(s.target)});
