import {random, shuffled, copy} from '../../shared/random.js';
export const names=['당근','토마토','오이'];
export function createState(seed){const r=random(seed);return {target:Math.floor(r()*3),order:shuffled([0,1,2],r),done:false};}
export function reduce(s,a){return !s.done&&a.type==='tap'&&s.order[a.id]===s.target?{...s,done:true}:s;}
export const hint=s=>({type:'tap',id:s.order.indexOf(s.target)});
