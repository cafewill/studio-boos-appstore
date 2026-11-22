import {bfs} from '../../shared/search.js';
export function tilted(cells,dir){const vertical=dir%2===0,groups=[[],[],[]];for(const cell of cells)groups[vertical?cell%3:Math.floor(cell/3)].push(cell);const out=[];groups.forEach((g,k)=>{for(let i=0;i<g.length;i++){const n=(dir===0||dir===3)?i:2-i;out.push(vertical?n*3+k:k*3+n);}});return out.sort((a,b)=>a-b);}
export function solved(cells){return cells.join(',')==='0,1,2';}
export function createState(seed){const initial=(seed>>>0)%2?[0,4,8]:[2,4,6];return {initial,cells:initial,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='clear'&&a.id===0&&s.cells.join(',')!==s.initial.join(','))return {...s,cells:[...s.initial]};if(a.type==='tool'&&[0,1,2,3].includes(a.id)){const cells=tilted(s.cells,a.id);return cells.join(',')===s.cells.join(',')?s:{...s,cells,done:solved(cells)};}return s;}
export function hint(s){if(s.done)return null;const p=bfs(s.cells,v=>[0,1,2,3].map(i=>tilted(v,i)),solved,JSON.stringify);if(!p.length)return {type:'clear',id:0};return {type:'tool',id:[0,1,2,3].find(i=>tilted(s.cells,i).join(',')===p[1].join(','))};}
