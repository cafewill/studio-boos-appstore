import {bfs} from '../../shared/search.js';
export function createState(seed){return {cell:12,rocks:(seed>>>0)%2?[5,10]:[6,9],trail:[12],done:false};}
export function moved(s,id){const row=Math.floor(s.cell/4),col=s.cell%4;const [dx,dy]=[[0,-1],[1,0],[0,1],[-1,0]][id]||[99,99];let x=col+dx,y=row+dy;if(x<0||x>3||y<0||y>3||s.rocks.includes(y*4+x))return s.cell;if(y===1&&x<3&&!s.rocks.includes(y*4+x+1))x++;return y*4+x;}
export function reduce(s,a){if(s.done||a.type!=='tool'||![0,1,2,3].includes(a.id))return s;const cell=moved(s,a.id);return cell===s.cell?s:{...s,cell,trail:[...s.trail,cell],done:cell===3};}
export function hint(s){if(s.done)return null;const path=bfs(s.cell,cell=>[0,1,2,3].map(id=>moved({...s,cell},id)).filter(n=>n!==cell),cell=>cell===3);return {type:'tool',id:[0,1,2,3].find(id=>moved(s,id)===path[1])};}
