import {bfs} from '../../shared/search.js';
export function swap(values,id){const out=[...values];[out[id],out[id+1]]=[out[id+1],out[id]];return out;}
export function solved(v){return v.every((n,i)=>n===i);}
export function createState(seed){return {ends:(seed>>>0)%2?[2,0,1]:[1,2,0],history:[],done:false};}
export function reduce(s,a){if(s.done||a.type!=='tool'||![0,1].includes(a.id))return s;const ends=swap(s.ends,a.id);return {...s,ends,history:[...s.history.slice(-9),a.id],done:solved(ends)};}
export function hint(s){if(s.done)return null;const p=bfs(s.ends,v=>[0,1].map(i=>swap(v,i)),solved,JSON.stringify);return {type:'tool',id:[0,1].find(i=>JSON.stringify(swap(s.ends,i))===JSON.stringify(p[1]))};}
