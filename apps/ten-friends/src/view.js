import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return note('두 숫자를 차례로 눌러요. 둘을 더해 10이 되면 함께 쉬러 가요.')+`<div class="equation">${s.selected===null?'?':s.numbers[s.selected]} + ? = 10</div>`+grid(s.numbers.map((n,i)=>action(s.removed.includes(i)?'만났어요':String(n),i,{disabled:s.removed.includes(i),pressed:s.selected===i,className:'number-tile',name:(i+1)+'번 숫자 '+n})),4);
}
