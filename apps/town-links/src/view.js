import {action,note,chip,escape} from '../../shared/board-ui.js';
import {scene,tools,summary} from '../../shared/exploration-ui.js';
import {edges,cost} from './model.js';
const points=[[70,80],[230,65],[410,120],[300,250]];
export function render(s){return note('길 재료는 네 칸이에요. 먼 길이 언제나 필요한 것은 아니에요.')+scene(`${edges.map(([a,b],i)=>`<path d="M${points[a].join(' ')}L${points[b].join(' ')}" stroke="${s.on[i]?'#365d46':'#a0af9d'}" stroke-width="${s.on[i]?9:3}" stroke-dasharray="${s.on[i]?'none':'5 6'}"/>`).join('')}${points.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="26" fill="#e3c46b"/><text x="${x}" y="${y+6}" text-anchor="middle">${i+1}</text>`).join('')}`,'네 마을과 다섯 후보 길')+tools(edges.map(([a,b,n],i)=>action(`${a+1}↔${b+1} 마을 · 재료 ${n}`,i,{pressed:s.on[i]})))+tools([action('길 모두 걷기',0,{type:'clear',disabled:!s.on.some(Boolean)})])+chip(`쓴 재료 ${cost(s)}/4`)+summary(s,'적은 재료로도 네 마을이 한 연결망이 되었어요.','실제 지도·철도·원작 티켓·승점을 사용하지 않아요.');}
