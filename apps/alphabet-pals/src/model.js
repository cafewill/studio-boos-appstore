import {random, shuffled, copy} from '../../shared/random.js';
export const pairs=[['A','a'],['B','b'],['D','d'],['E','e'],['G','g']];
export function createState(seed){const r=random(seed),target=Math.floor(r()*pairs.length);return {target,options:shuffled([target,...shuffled([0,1,2,3,4].filter(x=>x!==target),r).slice(0,2)],r),done:false};}
export function reduce(s,a){return !s.done&&a.type==='tap'&&s.options[a.id]===s.target?{...s,done:true}:s;}
export const hint=s=>({type:'tap',id:s.options.indexOf(s.target)});
