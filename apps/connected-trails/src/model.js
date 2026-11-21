import {random, shuffled, copy} from '../../shared/random.js';
export const directions=[[3,1],[3,1],[3,2],[1,2],[3,1],[0,3]];
export function isSolved(order){let position=0,entry=3;const seen=new Set();for(let k=0;k<6;k++){if(seen.has(position))return false;seen.add(position);const ds=directions[order[position]];if(!ds?.includes(entry))return false;const exit=ds.find(d=>d!==entry),row=Math.floor(position/3),col=position%3;const nr=row+[-1,0,1,0][exit],nc=col+[0,1,0,-1][exit];if(nr<0||nr>=2||nc<0||nc>=3)return k===5&&position===3&&exit===2;position=nr*3+nc;entry=(exit+2)%4;}return false;}
export function createState(seed){let order=shuffled([0,1,2,3,4,5],random(seed));if(isSolved(order))[order[0],order[2]]=[order[2],order[0]];return {order,selected:null,done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||a.id<0||a.id>=6)return s;if(s.selected===null)return {...s,selected:a.id};const n=copy(s);[n.order[n.selected],n.order[a.id]]=[n.order[a.id],n.order[n.selected]];n.selected=null;n.done=isSolved(n.order);return n;}
export const hint=s=>s.selected===null?{type:'tap',id:s.order.findIndex((v,i)=>v!==i)}:{type:'tap',id:s.order[s.selected]};
