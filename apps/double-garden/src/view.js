import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return note('같은 수 두 개는 한 번에 한 쌍씩 합쳐져요. 16을 만나면 마무리해요. 숫자 방향 버튼으로 움직여요.')+grid(s.board.map(v=>`<div class="number-block ${v?'filled':''}">${v||'·'}</div>`),4,'number-board')+grid(['왼쪽으로 모으기','오른쪽으로 모으기','위로 모으기','아래로 모으기'].map((v,i)=>action(v,i)),2);
}
