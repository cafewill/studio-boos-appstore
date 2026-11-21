import {random, shuffled, copy} from '../../shared/random.js';
export const steps=['재료 씻기','그림으로 썰기','그릇에서 섞기','함께 대접하기'];
export function createState(seed){return {step:0,ingredient:seed%3,done:false};}
export function reduce(s,a){return !s.done&&a.type==='tap'&&a.id===s.step?{...s,step:s.step+1,done:s.step===3}:s;}
export const hint=s=>({type:'tap',id:s.step});
