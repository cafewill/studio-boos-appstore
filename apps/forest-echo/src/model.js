import {bfs} from '../../shared/search.js';
export function neighbors(n){return [n>0?Math.floor((n-1)/2):-1,n*2+1,n*2+2].filter(v=>v>=0&&v<7);}
export function createState(seed){return {node:0,leaves:(seed>>>0)%2?[3,4,6]:[3,5,6],seen:[],trail:[0],done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||!neighbors(s.node).includes(a.id))return s;const seen=s.leaves.includes(a.id)&&!s.seen.includes(a.id)?[...s.seen,a.id]:s.seen;return {...s,node:a.id,seen,trail:[...s.trail.slice(-59),a.id],done:a.id===0&&seen.length===3};}
export function hint(s){if(s.done)return null;const target=s.leaves.find(n=>!s.seen.includes(n))??0,p=bfs(s.node,neighbors,n=>n===target);return {type:'tap',id:p[1]};}
