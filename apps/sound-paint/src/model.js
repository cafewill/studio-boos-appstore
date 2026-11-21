import {random, shuffled, copy} from '../../shared/random.js';
export function createState(){return {beats:Array(16).fill(false),done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='tap'&&a.id>=0&&a.id<16){const n=copy(s);n.beats[a.id]=!n.beats[a.id];return n;}if(a.type==='clear'&&a.id===0)return createState();if(a.type==='finish'&&a.id===0&&s.beats.some(Boolean))return {...s,done:true};return s;}
export const hint=s=>s.beats.some(Boolean)?{type:'finish',id:0}:{type:'tap',id:0};
export const notes=s=>s.beats.flatMap((on,i)=>on?[{pitch:Math.floor(i/4),step:i%4}]:[]);
