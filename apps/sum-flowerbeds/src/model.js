import {random, shuffled, copy} from '../../shared/random.js';
export function createState(seed){const r=random(seed),target=Array.from({length:9},()=>1+Math.floor(r()*3));return {target,values:Array(9).fill(0),rows:[0,1,2].map(row=>target.slice(row*3,row*3+3).reduce((a,b)=>a+b,0)),cols:[0,1,2].map(col=>target[col]+target[col+3]+target[col+6]),done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||a.id<0||a.id>=9)return s;const n=copy(s);n.values[a.id]=(n.values[a.id]+1)%4;n.done=n.values.every(v=>v>=1&&v<=3)&&n.rows.every((v,row)=>n.values.slice(row*3,row*3+3).reduce((a,b)=>a+b,0)===v)&&n.cols.every((v,c)=>n.values[c]+n.values[c+3]+n.values[c+6]===v);return n;}
export const hint=s=>({type:'tap',id:s.values.findIndex((v,i)=>v!==s.target[i])});
