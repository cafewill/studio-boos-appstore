import {random, shuffled, copy} from '../../shared/random.js';
export function createState(seed){const r=random(seed);return {order:shuffled([0,1,2,3,4,5],r),placed:Array(6).fill(null),selected:null,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='select'&&s.order.includes(a.id)&&!s.placed.includes(a.id))return {...s,selected:a.id};if(a.type==='tap'&&a.id>=0&&a.id<6&&s.placed[a.id]===null&&s.selected===a.id){const n=copy(s);n.placed[a.id]=a.id;n.selected=null;n.done=n.placed.every(v=>v!==null);return n;}return s;}
export const hint=s=>s.selected!==null?{type:'tap',id:s.selected}:{type:'select',id:s.order.find(id=>!s.placed.includes(id))};
