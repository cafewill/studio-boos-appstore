import {random, shuffled, copy} from '../../shared/random.js';
export function createState(seed){const r=random(seed),hour=1+Math.floor(r()*12);return {hour,options:shuffled([hour,hour%12+1,(hour+5)%12+1],r),done:false};}
export function reduce(s,a){return !s.done&&a.type==='tap'&&s.options[a.id]===s.hour?{...s,done:true}:s;}
export const hint=s=>({type:'tap',id:s.options.indexOf(s.hour)});
