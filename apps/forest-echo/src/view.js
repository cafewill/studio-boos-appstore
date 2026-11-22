import {action,note,chip,escape} from '../../shared/board-ui.js';
import {scene,tools,summary} from '../../shared/exploration-ui.js';
import {neighbors} from './model.js';
const points=[[250,45],[140,130],[360,130],[65,250],[200,250],[310,250],[445,250]];
export function render(s){return note('갈림길은 지나온 길로 돌아갈 수 있어요. 잎 세 장을 본 뒤 출발 나무로 돌아와요.')+scene(`${points.slice(1).map(([x,y],i)=>`<path d="M${points[Math.floor(i/2)].join(' ')}L${x} ${y}" stroke="#a0af9d" stroke-width="6"/>`).join('')}${points.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="23" fill="${i===s.node?'#efad85':s.seen.includes(i)?'#e3c46b':'#d7e4c9'}"/><text x="${x}" y="${y+6}" text-anchor="middle">${i===0?'출발':s.leaves.includes(i)?'잎':i}</text>`).join('')}`,'나무 모양 갈림길 지도')+tools(neighbors(s.node).map(n=>action(n===Math.floor((s.node-1)/2)?'지나온 길로':`${n%2?'왼쪽':'오른쪽'} 갈림길`,n)))+chip(`만난 잎 ${s.seen.length}/3`)+summary(s,'잎을 만나고 출발 나무로 안전하게 돌아왔어요.','원작 가족·상실·죽음의 서사나 여우·유물은 사용하지 않아요.');}
