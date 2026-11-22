import {action,note,chip,escape} from '../../shared/board-ui.js';
import {scene,tools,summary} from '../../shared/exploration-ui.js';
export function render(s){return note('띠를 돌리면 두 칸의 자리가 바뀌어요. 목표는 위쪽 동그라미·세모, 아래쪽 네모·별이에요.')+`<div class="turn-box">${s.values.map(n=>`<div class="turn-cell">${['●','▲','■','★'][n]}</div>`).join('')}</div>`+tools(['윗띠 돌리기','아랫띠 돌리기','왼쪽 띠 돌리기','오른쪽 띠 돌리기'].map((n,i)=>action(n,i,{type:'tool'})))+summary(s,'서로 연결된 띠를 움직여 무늬의 자리를 되찾았어요.','자체 2×2 순열 상자예요. 실제 큐브 해법과는 달라요.');}
