import {bfs} from '../../shared/search.js';
export function createState(seed){return {path:[0],stars:(seed>>>0)%2?[4,14,19]:[9,15,19],holes:[6,13],done:false};}
export function neighbors(s,id){return [id-5,id+5,id-1,id+1].filter(n=>n>=0&&n<20&&!s.holes.includes(n)&&Math.abs(n%5-id%5)+Math.abs(Math.floor(n/5)-Math.floor(id/5))===1);}
export function reduce(s,a){if(s.done)return s;if(a.type==='clear'&&a.id===0&&s.path.length>1)return {...s,path:[0]};if(a.type!=='tap'||!neighbors(s,s.path.at(-1)).includes(a.id)||s.path.length>=120)return s;const path=[...s.path,a.id];return {...s,path,done:s.stars.every(v=>path.includes(v))};}
export function hint(s){if(s.done)return null;if(s.path.length>=120)return {type:'clear',id:0};const goal=s.stars.find(v=>!s.path.includes(v));const p=bfs(s.path.at(-1),n=>neighbors(s,n),n=>n===goal);return {type:'tap',id:p[1]};}
