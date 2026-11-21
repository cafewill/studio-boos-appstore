import {action,note,chip,escape} from '../../shared/board-ui.js';
import {scene,tools,summary} from '../../shared/exploration-ui.js';
export function render(s){return note('두 번째 줄에서는 오른쪽 물살이 한 칸 더 밀어요.')+`<div class="water-map">${Array.from({length:16},(_,i)=>`<div class="water-cell ${s.rocks.includes(i)?'rock-water':''}">${i===s.cell?'⛵':i===3?'나루':s.rocks.includes(i)?'바위':Math.floor(i/4)===1?'물살':''}</div>`).join('')}</div>`+tools(['위로 젓기','오른쪽 젓기','아래로 젓기','왼쪽 젓기'].map((n,i)=>action(n,i,{type:'tool'})))+summary(s,'물살을 살펴보며 나루에 도착했어요.','격자 물살 모형이며 실제 수영·보트 안전 지침이 아니에요.');}
