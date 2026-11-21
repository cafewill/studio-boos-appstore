import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return note('이웃한 두 칸을 차례로 누르면 자리가 바뀌어요. 같은 무늬가 세 개 이상 이어지면 쉬러 가요. 빈칸과도 바꿀 수 있어요.')+grid(s.cells.map((v,i)=>action(v===null?'<span>빈 자리</span>':shape(['circle','triangle','star'][v],palette[v])+`<span>${['동그라미','삼각형','별'][v]}</span>`,i,{pressed:s.selected===i,name:(i+1)+'번 '+(v===null?'빈 자리':['동그라미','삼각형','별'][v])})),3,'pattern-board');
}
