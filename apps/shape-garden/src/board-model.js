import {rounds,NAMES} from './model.js';
export {NAMES};
export function createState(seed,choices=3){return {...rounds(seed,choices)[0],done:false};}
export function reduce(s,a){return !s.done&&a.type==='tap'&&s.options[a.id]?.shape===s.target?{...s,done:true}:s;}
export const hint=s=>({type:'tap',id:s.options.findIndex(v=>v.shape===s.target)});
