import {action,note,chip,escape} from '../../shared/board-ui.js';
import {scene,tools,summary} from '../../shared/exploration-ui.js';
export function render(s){return note('타일 두 개를 차례로 눌러 바꿔요. 윗줄 1·2·3, 아랫줄 4·5·6을 만들어 봐요.')+`<div class="number-workbench">${s.tiles.map((n,i)=>action(`<span class="engraved-number">${n}</span><small>${i<3?'윗줄':'아랫줄'}</small>`,i,{name:`${i+1}번 자리 숫자 ${n}`,pressed:s.selected===i})).join('')}</div>`+summary(s,'두 줄의 숫자가 순서대로 나란해졌어요.','조커·승점·온라인 대결 없이 여섯 타일 순서만 살펴봐요.');}
