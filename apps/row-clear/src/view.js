import {action,note,chip,escape} from '../../shared/board-ui.js';
import {scene,tools,summary} from '../../shared/exploration-ui.js';
export function render(s){return note('빈칸을 채우면 그 줄이 사라져요. 두 줄의 변화를 살펴봐요.')+`<div class="clear-board">${s.rows.map((row,r)=>row?row.map((v,c)=>action(v?'놓인 블록':'빈칸 채우기',r*3+c,{disabled:v,className:v?'filled-block':'open-block'})).join(''):'<p class="cleared-row">한 줄이 열렸어요.</p>').join('')}</div>`+chip(`비운 줄 ${s.cleared}/2`)+summary(s,'블록을 더했더니 오히려 빈 공간이 생겼어요.','낙하 속도·무작위 조각·게임오버 없이 줄 완성만 살펴봐요.');}
