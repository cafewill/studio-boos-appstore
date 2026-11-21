import {random, shuffled, copy} from '../../shared/random.js';
export const kinds=['leaf','bell','car','star'];export const names=['나뭇잎','종','자동차','별'];
export function createState(seed){const r=random(seed);return {sequence:shuffled([0,1,2,3],r).slice(0,3),answer:[],revealed:true,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='start'&&a.id===0&&s.revealed)return {...s,revealed:false,answer:[]};if(a.type==='reveal'&&a.id===0)return {...s,revealed:true,answer:[]};if(a.type==='tap'&&!s.revealed&&a.id===s.sequence[s.answer.length]){const answer=[...s.answer,a.id];return {...s,answer,done:answer.length===s.sequence.length};}return s;}
export const hint=s=>s.revealed?{type:'start',id:0}:{type:'tap',id:s.sequence[s.answer.length]};
